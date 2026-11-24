/* Looper engine: the microphone, the loop, its layers and the clock, with no UI.

   Time. Everything is on the audio context's clock. The input is captured continuously
   (worklet.js) with each sample stamped with its context time, so any stretch of it can be cut by
   time. A loop is N samples long and "phase 0" falls at S.t0 + k·N; every layer is a looping
   buffer started so that its phase follows that clock, so layers can't drift apart.

   Latency. What you hear left the speaker a little after it was scheduled, and what you play
   reaches the capture a little after you played it. Their sum (round trip, P.latency, measured by
   the latency test) is taken off every overdub, so a part played in time with the loop lands in
   time with it.

   Layers. A layer is a stretch of its take (the raw input around the recording, kept so it can be
   trimmed and nudged later) laid into the loop: start s in the take, length len, phase R where its
   first sample sits, nudge, and a crossfade at the seam. See LoopDSP.renderLayer.

   Recording.
   - First loop, Free: tap to start, tap to close. The loop is trimmed to the notes you played
     (LoopDSP.autoTrim) and plays on in time with you.
   - First loop, Tempo: a count-in, then a set number of bars (or until tapped, to the bar line).
   - Overdubs: from the next loop start (default) or right away, for 1, 2 or 4 loops, or until
     tapped. The new layer starts playing the moment its recording ends.

   Saved on this device in IndexedDB "music-looper": sessions (the loop and its layers) and takes
   (each layer's audio, 16-bit). Prefs in localStorage "looper:prefs:v1". */
(function () {
  "use strict";
  var D = window.LoopDSP;
  var subs = [];
  function emit(what) { for (var i = 0; i < subs.length; i++) { try { subs[i](what); } catch (e) {} } }

  /* ---------- prefs ---------- */
  var PKEY = "looper:prefs:v1";
  var DEF = {
    latency: null, calibrated: false,        // round trip, seconds (null: the browser's own guess)
    autoTrim: true, fade: 10,                // first loop: trim to the notes; seam crossfade (ms)
    odStart: "next", odLen: 1,               // overdubs: "next" loop start or "now"; loops (0 = until tapped)
    countIn: 1, click: false, clickVol: 70,  // count-in bars; click while looping
    mode: "free", bpm: 90, beats: 4, bars: 4, // first loop: "free" or "tempo" (bars 0 = until tapped)
    inGain: 100, monitor: false, cleanup: false, device: "", chan: "mix"
  };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function parse(s) { try { var v = JSON.parse(s); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  var P = (function () {
    var p = Object.assign({}, DEF), saved = parse(lsGet(PKEY));
    if (saved) Object.keys(DEF).forEach(function (k) { if (saved[k] !== undefined) p[k] = saved[k]; });
    else { var m = parse(lsGet("metronome:prefs:v1")); if (m && m.bpm >= 40 && m.bpm <= 240) p.bpm = m.bpm; }
    return p;
  })();
  function savePrefs() { lsSet(PKEY, JSON.stringify(P)); }

  /* ---------- audio ---------- */
  var ctx = null, sr = 48000, master = null, clickOut = null;
  function ensureCtx() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC({ latencyHint: "interactive" }); } catch (e) { ctx = new AC(); }
    sr = ctx.sampleRate;
    master = ctx.createGain(); master.connect(ctx.destination);
    clickOut = ctx.createGain(); clickOut.gain.value = clickGain(); clickOut.connect(ctx.destination);
    return ctx;
  }
  function resume() { if (ctx && ctx.state !== "running") { try { ctx.resume(); } catch (e) {} } }
  function setSession(type) { try { if (navigator.audioSession) navigator.audioSession.type = type; } catch (e) {} }
  var clickGain = function () { var v = P.clickVol / 100; return v * v; };
  function mod(a, b) { return ((a % b) + b) % b; }

  var noiseBuf = null;
  function clickAt(t, acc) {
    if (!noiseBuf) {
      var len = Math.floor(sr * 0.05); noiseBuf = ctx.createBuffer(1, len, sr);
      var d = noiseBuf.getChannelData(0); for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    var a = acc ? 1 : 0.7;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(acc ? 2400 : 1700, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.9 * a, t + 0.001); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    o.connect(g); g.connect(clickOut); o.start(t); o.stop(t + 0.05);
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), h = ctx.createGain();
    s.buffer = noiseBuf; f.type = "bandpass"; f.frequency.value = acc ? 4200 : 3200; f.Q.value = 1.2;
    h.gain.setValueAtTime(0.0001, t); h.gain.linearRampToValueAtTime(0.6 * a, t + 0.0008); h.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    s.connect(f); f.connect(h); h.connect(clickOut); s.start(t, 0, 0.03);
  }

  /* ---------- microphone and capture ---------- */
  var mic = null, micP = null, workletP = null;
  var cap = { chunks: [], end: 0, lvl: 0, clipAt: 0 };
  function err(msg) { var e = new Error(msg); e.user = true; return e; }

  function openMic() {
    if (micP) return micP;
    micP = (async function () {
      if (!ensureCtx()) throw err("No audio here");
      resume();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw err("Recording isn't supported here");
      if (!ctx.audioWorklet || !window.AudioWorkletNode) throw err("Recording needs a newer browser");
      setSession("play-and-record");
      var c = { echoCancellation: !!P.cleanup, noiseSuppression: false, autoGainControl: false };
      if (P.device) c.deviceId = { exact: P.device };
      var stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: c }); }
      catch (e) {
        if (P.device && e && (e.name === "OverconstrainedError" || e.name === "NotFoundError")) {
          P.device = ""; savePrefs(); delete c.deviceId;
          stream = await navigator.mediaDevices.getUserMedia({ audio: c });
        } else throw e;
      }
      if (!workletP) workletP = ctx.audioWorklet.addModule("worklet.js");
      try { await workletP; } catch (e) { workletP = null; stream.getTracks().forEach(function (t) { t.stop(); }); throw err("Recording needs a newer browser"); }
      var m = { stream: stream };
      m.src = ctx.createMediaStreamSource(stream);
      m.gain = ctx.createGain(); m.gain.gain.value = inGain();
      m.node = new AudioWorkletNode(ctx, "looper-capture", { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1] });
      m.node.port.onmessage = onChunk;
      m.node.port.postMessage({ ch: P.chan === "1" ? 0 : P.chan === "2" ? 1 : "mix" });
      m.sink = ctx.createGain(); m.sink.gain.value = 0;
      m.mon = ctx.createGain(); m.mon.gain.value = P.monitor ? 1 : 0;
      m.src.connect(m.gain); m.gain.connect(m.node); m.node.connect(m.sink); m.sink.connect(ctx.destination);
      m.gain.connect(m.mon); m.mon.connect(ctx.destination);
      try {
        var tr = stream.getAudioTracks()[0], st = tr && tr.getSettings ? tr.getSettings() : {};
        m.inLat = st.latency > 0 ? Math.min(0.2, st.latency) : 0;
        m.chans = st.channelCount || 1;
        m.label = tr ? tr.label : "";
        m.deviceId = st.deviceId || "";
        tr.addEventListener("ended", function () { if (mic === m) { closeMic(); emit("mic"); } });
      } catch (e) { m.inLat = 0; m.chans = 1; }
      cap.chunks = []; cap.end = 0;
      mic = m;
      resume();
      emit("mic");
      return m;
    })();
    micP.catch(function () { micP = null; });
    return micP;
  }
  function closeMic() {
    var m = mic; mic = null; micP = null;
    if (m) {
      try { m.node.port.onmessage = null; } catch (e) {}
      ["src", "gain", "node", "sink", "mon"].forEach(function (k) { try { m[k].disconnect(); } catch (e) {} });
      try { m.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    }
    cap.chunks = []; cap.end = 0; cap.lvl = 0;
    setSession("playback");
  }
  function inGain() { var v = P.inGain / 100; return v * v; }

  function onChunk(e) {
    var f = e.data.f, d = e.data.d, pk = 0;
    cap.chunks.push({ f: f, d: d }); cap.end = f + d.length;
    for (var i = 0; i < d.length; i += 2) { var v = d[i] < 0 ? -d[i] : d[i]; if (v > pk) pk = v; }
    cap.lvl = Math.max(pk, cap.lvl * 0.85);
    if (pk > 0.98) cap.clipAt = performance.now();
    var keep = cap.end - 3 * sr;
    if (S.rec && S.rec.keepF != null) keep = Math.min(keep, S.rec.keepF);
    if (S.ext) keep = Math.min(keep, S.ext.f0);
    if (cal) keep = Math.min(keep, cal.f0);
    while (cap.chunks.length && cap.chunks[0].f + cap.chunks[0].d.length < keep) cap.chunks.shift();
    tick();
  }
  function capGet(f0, f1) {
    var out = new Float32Array(Math.max(0, f1 - f0));
    for (var i = 0; i < cap.chunks.length; i++) {
      var c = cap.chunks[i], a = Math.max(f0, c.f), b = Math.min(f1, c.f + c.d.length);
      if (b > a) out.set(c.d.subarray(a - c.f, b - c.f), a - f0);
    }
    return out;
  }
  function rtl() {
    if (P.latency != null) return P.latency;
    var o = ctx ? (ctx.outputLatency || ctx.baseLatency || 0) : 0;
    return Math.min(0.25, o + (mic && mic.inLat || 0));
  }

  /* ---------- state ---------- */
  var S = {
    sid: null, name: "", created: 0,
    N: 0, bpm: 0, beats: 4, bars: 0, guessed: false,
    layers: [], t0: 0, playing: false,
    rec: null, ext: null, cq: [], nb: null,
    undo: [], redo: []
  };
  var COLORS = ["#E0782B", "#2E7FD6", "#2F9E5B", "#B547C9", "#D23F57", "#C9A21A", "#1BA3A3", "#6E6BE0"];
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function lenSec() { return S.N / sr; }
  function beatLen() {
    if (S.N && S.bars && S.beats) return lenSec() / (S.bars * S.beats);
    if (S.rec && S.rec.bd) return S.rec.bd;
    return 0;
  }

  /* ---------- layers ---------- */
  function newLayer(o) {
    var l = {
      id: o.id || uid(), name: o.name || "", color: o.color || null, mult: o.mult || 1,
      vol: o.vol != null ? o.vol : 1, muted: !!o.muted,
      raw: o.raw, s: o.s, len: o.len, R: o.R || 0, nudge: o.nudge || 0, fade: o.fade != null ? o.fade : Math.round(P.fade / 1000 * sr),
      saved: !!o.saved, prov: !!o.prov, base: !!o.base, src: null, out: null, buf: null, peaks: null
    };
    if (!l.color) {
      var used = S.layers.map(function (x) { return x.color; });
      l.color = COLORS.filter(function (c) { return used.indexOf(c) < 0; })[0] || COLORS[S.layers.length % COLORS.length];
    }
    if (!l.name) l.name = "Layer " + (S.layers.length + 1);
    l.gain = ctx.createGain(); l.gain.gain.value = volOf(l); l.gain.connect(master);
    render(l);
    return l;
  }
  function volOf(l) { return l.muted ? 0 : l.vol * l.vol; }
  function render(l) {
    l.out = D.renderLayer(l.raw, l.s, l.len, l.R, l.nudge, l.fade);
    var b = ctx.createBuffer(1, l.len, sr);
    if (b.copyToChannel) b.copyToChannel(l.out, 0); else b.getChannelData(0).set(l.out);
    l.buf = b;
    l.peaks = D.peaks(l.out, 160).p;
  }
  function startSrc(l, when, xf) {
    if (!S.playing || !l.buf) return;
    when = Math.max(when, ctx.currentTime + 0.015);
    var src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = l.buf; src.loop = true;
    src.connect(g); g.connect(l.gain);
    if (xf) { g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(1, when + xf); }
    src.start(when, mod(when - S.t0, l.len / sr));
    var old = l.src; l.src = { src: src, g: g };
    if (old) stopSrc(old, when, xf);
  }
  function stopSrc(o, when, xf) {
    try {
      if (xf) { o.g.gain.setValueAtTime(1, when); o.g.gain.linearRampToValueAtTime(0, when + xf); o.src.stop(when + xf + 0.005); }
      else o.src.stop(when);
      o.src.onended = function () { try { o.g.disconnect(); } catch (e) {} };
    } catch (e) {}
  }
  function swap(l, xf) {
    // a new render of a playing layer: start it at the same phase as the old one stops
    if (!S.playing || !l.src) return;
    startSrc(l, ctx.currentTime + 0.03, xf);
  }

  /* ---------- transport ---------- */
  function play(at) {
    if (!S.N || !ensureCtx()) return;
    resume();
    var when = Math.max(at || 0, ctx.currentTime + 0.06);
    S.t0 = when; S.nb = null;
    S.playing = true;
    S.layers.forEach(function (l) { startSrc(l, when); });
    driver(); changed("transport");
  }
  function stop() {
    if (S.rec) cancelRec();
    S.cq = [];
    if (!S.playing) return;
    var t = ctx.currentTime;
    S.layers.forEach(function (l) { if (l.src) { stopSrc(l.src, t, 0.012); l.src = null; } });
    S.playing = false; S.nb = null;
    changed("transport");
  }

  /* clicks (count-ins, and the beat while looping when Click is on) are scheduled a little ahead */
  var drv = 0;
  function driver() {
    if (drv) return;
    drv = setInterval(function () {
      if (!ctx) return;
      schedClicks(); tick();
      if (!S.playing && !S.rec && !S.cq.length && !cal) { clearInterval(drv); drv = 0; }
    }, 25);
  }
  function schedClicks() {
    var now = ctx.currentTime, hz = now + 0.15;
    while (S.cq.length && S.cq[0].t < hz) { var c = S.cq.shift(); if (c.t >= now - 0.005) clickAt(c.t, c.acc); }
    var firstTempo = S.rec && S.rec.kind === "first" && S.rec.mode === "tempo";
    var bl = beatLen(), beats = S.N ? S.beats : S.rec && S.rec.beats;
    if (!bl || !beats || !((S.playing && P.click) || firstTempo)) { S.nb = null; return; }
    if (S.nb == null) S.nb = Math.ceil((now - S.t0) / bl - 1e-6);
    if (firstTempo && S.nb < 0) S.nb = 0;
    while (S.t0 + S.nb * bl < hz) {
      var t = S.t0 + S.nb * bl;
      if (t >= now - 0.005) clickAt(t, mod(S.nb, beats) === 0);
      S.nb++;
    }
  }
  function countIn(ts, bl, beats, bars) {
    // clicks for the `bars` bars before ts, as far as there is time for them
    var now = ctx.currentTime, n = bars * beats;
    for (var j = n; j >= 1; j--) { var t = ts - j * bl; if (t > now + 0.02) S.cq.push({ t: t, acc: j % beats === 0 }); }
    S.cq.sort(function (a, b) { return a.t - b.t; });
  }

  /* ---------- recording ---------- */
  var PRE = 0.2, POST = 0.3;                 // seconds of take kept either side of a timed recording
  async function main() {
    // the one big button: record, close the loop, overdub, or stop/cancel what's under way
    if (S.rec) return recPress();
    if (busy) return;
    busy = true;
    try {
      ensureCtx(); resume();
      await openMic();
      if (!S.N) startFirst(); else startOver();
    } catch (e) {
      emitErr(e && e.user ? e.message : micMsg(e));
    } finally { busy = false; }
  }
  var busy = false;
  function micMsg(e) {
    var n = e && e.name;
    return n === "NotAllowedError" || n === "SecurityError" ? "Mic blocked" : n === "NotFoundError" || n === "OverconstrainedError" ? "No mic found" : "Recording isn't supported here";
  }
  function emitErr(m) { S.err = { msg: m, at: Date.now() }; emit("error"); }

  function startFirst() {
    var now = ctx.currentTime;
    S.redo = [];
    if (P.mode === "tempo") {
      var bd = 60 / P.bpm, bar = bd * P.beats, ci = P.countIn | 0;
      var ts = now + 0.15 + ci * bar;
      S.cq = [];
      if (ci) countIn(ts, bd, P.beats, ci);
      S.t0 = ts; S.nb = 0;
      var r = S.rec = { kind: "first", mode: "tempo", phase: "countin", ts: ts, bd: bd, beats: P.beats, bpm: P.bpm, bars: P.bars | 0, R: 0 };
      r.cf = Math.round((ts + rtl()) * sr);
      r.keepF = r.cf - Math.round(PRE * sr) - sr;
      if (r.bars) r.len = Math.round(r.bars * bar * sr);
    } else {
      var cs = now;
      S.rec = { kind: "first", mode: "free", phase: "rec", ts: now, cs: cs, keepF: Math.round((cs - 1.2) * sr) };
    }
    driver(); changed("rec");
  }

  function startOver() {
    var now = ctx.currentTime, Ls = lenSec(), bl = beatLen(), ts;
    S.redo = [];
    if (!S.playing) {
      var ci = bl && P.countIn ? P.countIn : 0;
      ts = now + 0.12 + ci * bl * S.beats;
      S.cq = [];
      if (ci) countIn(ts, bl, S.beats, ci);
      play(ts);
    } else if (P.odStart === "now") {
      ts = now;
    } else {
      ts = S.t0 + Math.ceil((now + 0.05 - S.t0) / Ls) * Ls;
      if (bl && P.countIn && !P.click) countIn(ts, bl, S.beats, P.countIn);
    }
    var r = S.rec = { kind: "over", phase: ts > now + 0.02 ? "countin" : "rec", ts: ts, mult: P.odLen | 0 };
    r.cf = Math.round((ts + rtl()) * sr);
    r.keepF = r.cf - Math.round(PRE * sr) - sr;
    if (r.mult) setOverLen(r, r.mult);
    driver(); changed("rec");
  }
  function setOverLen(r, mult) {
    r.mult = mult; r.len = S.N * mult;
    r.R = Math.round(mod(r.ts - S.t0, r.len / sr) * sr) % r.len;
  }

  function recPress() {
    var r = S.rec, now = ctx.currentTime;
    if (r.phase === "closing") return;                 // already finishing
    if (r.phase === "countin") { cancelRec(); return; }
    if (r.kind === "first" && r.mode === "free") {
      r.te = now; r.post = P.autoTrim ? 0.47 : 0.06 + P.fade / 1000; r.phase = "closing";
      changed("rec"); return;
    }
    // A press while recording stops at the nearest bar line (first loop) or loop end (overdub),
    // never later than the length set for it. Undo cancels instead.
    if (r.kind === "first") {
      var bar = r.bd * r.beats, k = Math.max(0, now - r.ts) / bar, nb = Math.max(1, (k - Math.floor(k) < 0.35 ? Math.floor(k) : Math.ceil(k)));
      if (r.len) nb = Math.min(nb, r.bars);
      r.bars = nb; r.len = Math.round(nb * bar * sr);
      changed("rec"); tick(); return;
    }
    var Ls = lenSec(), m = Math.max(0, now - r.ts) / Ls, mm = Math.max(1, m - Math.floor(m) < 0.25 ? Math.floor(m) : Math.ceil(m));
    if (r.len) mm = Math.min(mm, r.mult);
    if (r.layer && mm !== r.mult) return;              // its layer is already starting: let it finish
    setOverLen(r, Math.min(8, mm));
    changed("rec"); tick();
  }

  function cancelRec() {
    var r = S.rec; if (!r) return;
    S.rec = null; S.cq = [];
    if (r.layer) {
      var l = r.layer;
      if (l.src) { stopSrc(l.src, ctx.currentTime, 0.012); l.src = null; }
      S.layers = S.layers.filter(function (x) { return x !== l; });
      try { l.gain.disconnect(); } catch (e) {}
    }
    if (r.kind === "first") { S.N = 0; S.playing = false; S.nb = null; }
    changed("rec");
  }

  // runs on every captured block and every 25 ms: moves a recording along
  function tick() {
    var r = S.rec;
    if (S.ext && cap.end >= S.ext.f1) extendTake();
    if (!r || !ctx) return;
    var now = ctx.currentTime;
    if (r.phase === "countin" && now >= r.ts) { r.phase = "rec"; changed("rec"); }
    if (r.kind === "first" && r.mode === "free") {
      if (r.phase === "rec" && now - r.ts > 300) recPress();          // five minutes at most
      if (r.phase === "closing" && cap.end >= Math.round((r.te + r.post) * sr)) finishFree();
      return;
    }
    if (r.kind === "over" && !r.len && now - r.ts > 8 * lenSec()) setOverLen(r, 8);
    if (r.kind === "first" && !r.len && now - r.ts > 300) recPress();
    if (!r.len) return;
    var end = r.ts + r.len / sr;
    if (!r.layer && r.phase === "rec" && now >= end - 0.15) provisional(r);
    if (r.phase === "rec" && now >= end) { r.phase = "closing"; changed("rec"); }
    if (r.phase === "closing" && cap.end >= r.cf + r.len + Math.round(POST * sr)) finalize(r);
  }

  /* A timed recording's layer starts playing exactly when the recording ends, from audio already
     captured (its last moments aren't in yet: they are silence for now). Once they arrive the full
     render takes over at the same phase, long before the loop comes back round to them. */
  function provisional(r) {
    var pre = Math.round(PRE * sr), raw = capGet(r.cf - pre, r.cf + r.len + Math.round(POST * sr));
    if (r.kind === "first") {
      S.N = r.len; S.beats = r.beats; S.bars = r.bars; S.bpm = r.bars * r.beats * 60 / (r.len / sr); S.guessed = false;
      S.layers = [];
    }
    var l = newLayer({ raw: raw, s: pre, len: r.len, R: r.R, mult: r.kind === "first" ? 1 : r.mult, prov: true, base: r.kind === "first" });
    S.layers.push(l); r.layer = l;
    if (r.kind === "first") S.playing = true;
    startSrc(l, r.ts + r.len / sr);
    changed("layers");
  }
  function finalize(r) {
    var l = r.layer, pre = Math.round(PRE * sr);
    if (!l) { provisional(r); l = r.layer; }
    l.raw = capGet(r.cf - pre, r.cf + r.len + Math.round(POST * sr));
    render(l); swap(l, 0);
    l.prov = false;
    S.rec = null; S.cq = [];
    added(l);
  }

  function finishFree() {
    var r = S.rec, pre = 1.0;
    var f0 = Math.round((r.cs - pre) * sr), f1 = Math.round((r.te + r.post) * sr);
    var raw = capGet(f0, f1);
    var sH = Math.round(pre * sr), eH = Math.round((r.te - r.cs + pre) * sr);
    var t = P.autoTrim ? D.autoTrim(raw, sr, sH, eH, P.beats) : null;
    var s = t ? t.s : sH, e = t ? t.e : eH;
    if (e - s < 0.3 * sr) { S.rec = null; changed("rec"); emitErr("Too short"); return; }
    S.N = e - s; S.beats = P.beats;
    S.bars = t ? t.bars : D.guessBars(S.N / sr, P.beats).bars;
    S.bpm = S.bars * S.beats * 60 / (S.N / sr); S.guessed = true;
    var l = newLayer({ raw: raw, s: s, len: S.N, R: 0, mult: 1, base: true });
    S.layers = [l];
    S.t0 = (f0 + s) / sr - rtl();
    S.playing = true; S.nb = null;
    S.rec = null;
    startSrc(l, ctx.currentTime + 0.02);
    // keep listening a moment longer so the editor can move the end later than the tap
    S.ext = { l: l, f0: f0, f1: Math.round((r.te + 2) * sr) };
    added(l);
  }
  function extendTake() {
    var x = S.ext; S.ext = null;
    if (S.layers.indexOf(x.l) < 0) return;
    var raw = capGet(x.f0, x.f1);
    if (raw.length > x.l.raw.length) { x.l.raw = raw; x.l.saved = false; dirty(); }
  }

  function added(l) {
    if (!S.sid) newSid();
    S.undo.push({ t: "add", l: l, meta: meta() });
    if (S.undo.length > 50) S.undo.shift();
    changed("layers"); dirty();
  }
  function meta() { return { N: S.N, bpm: S.bpm, bars: S.bars, beats: S.beats, guessed: S.guessed }; }
  function setMeta(m) { S.N = m.N; S.bpm = m.bpm; S.bars = m.bars; S.beats = m.beats; S.guessed = m.guessed; }

  /* ---------- undo ---------- */
  function detach(l) {
    if (l.src) { stopSrc(l.src, ctx.currentTime, 0.012); l.src = null; }
    S.layers = S.layers.filter(function (x) { return x !== l; });
    if (!S.layers.length) { stop(); S.N = 0; }
  }
  function attach(l, i, m) {
    if (!S.N && m) { setMeta(m); }
    S.layers.splice(Math.min(i, S.layers.length), 0, l);
    if (S.playing) startSrc(l, ctx.currentTime + 0.02, 0.01);
  }
  function undo() {
    if (S.rec) { cancelRec(); return; }
    var a = S.undo.pop(); if (!a) return;
    if (a.t === "add") detach(a.l); else attach(a.l, a.i, a.meta);
    S.redo.push(a);
    changed("layers"); dirty();
  }
  function redo() {
    if (S.rec) return;
    var a = S.redo.pop(); if (!a) return;
    if (a.t === "add") attach(a.l, S.layers.length, a.meta); else detach(a.l);
    S.undo.push(a);
    changed("layers"); dirty();
  }
  function remove(id) {
    var l = find(id); if (!l || l.prov) return;
    var i = S.layers.indexOf(l), m = meta();
    detach(l);
    S.undo.push({ t: "del", l: l, i: i, meta: m }); S.redo = [];
    changed("layers"); dirty();
  }

  /* ---------- layer edits ---------- */
  function find(id) { for (var i = 0; i < S.layers.length; i++) if (S.layers[i].id === id) return S.layers[i]; return null; }
  function setVol(id, v) { var l = find(id); if (!l) return; l.vol = Math.max(0, Math.min(1.25, v)); ramp(l); dirty(); }
  function toggleMute(id) { var l = find(id); if (!l) return; l.muted = !l.muted; ramp(l); changed("layers"); dirty(); }
  function ramp(l) { var t = ctx.currentTime; l.gain.gain.cancelScheduledValues(t); l.gain.gain.setTargetAtTime(volOf(l), t, 0.01); }
  function rename(id, name) { var l = find(id); if (!l) return; l.name = String(name || "").slice(0, 40) || l.name; changed("layers"); dirty(); }
  function setNudge(id, ms) {
    var l = find(id); if (!l || l.prov) return;
    l.nudge = Math.round(Math.max(-150, Math.min(150, ms)) / 1000 * sr);
    rerender(l);
  }
  function setFade(id, ms) {
    var l = find(id); if (!l || l.prov) return;
    l.fade = Math.round(Math.max(0, Math.min(80, ms)) / 1000 * sr);
    rerender(l);
  }
  var rrT = {};
  function rerender(l) {
    clearTimeout(rrT[l.id]);
    rrT[l.id] = setTimeout(function () { render(l); swap(l, 0.008); changed("layers"); dirty(); }, 60);
  }

  /* The first layer, alone, can be trimmed: its start and end in the take, and so the loop's
     length. Playback carries on at the same point of the loop. */
  function setRegion(s, e, bars, beats) {
    if (S.layers.length !== 1 || S.rec || !S.layers[0].base) return false;
    var l = S.layers[0];
    s = Math.max(0, Math.min(l.raw.length - 1, Math.round(s))); e = Math.max(s + Math.round(0.2 * sr), Math.min(l.raw.length, Math.round(e)));
    var oldL = lenSec(), frac = S.playing ? mod(ctx.currentTime + 0.03 - S.t0, oldL) / oldL : 0;
    l.s = s; l.len = e - s; S.N = l.len; l.nudge = 0;
    if (bars) S.bars = bars; if (beats) S.beats = beats;
    S.bpm = S.bars * S.beats * 60 / lenSec(); S.guessed = false;
    render(l);
    if (S.playing) {
      var when = ctx.currentTime + 0.03;
      S.t0 = when - frac * lenSec();
      startSrc(l, when, 0.008);
      S.nb = null;
    }
    changed("layers"); dirty();
    return true;
  }
  function seek(sec) {
    if (!S.playing || !S.N) return;
    var when = ctx.currentTime + 0.03;
    S.t0 = when - mod(sec, lenSec()); S.nb = null;
    S.layers.forEach(function (l) { startSrc(l, when, 0.006); });
  }
  function setTempo(bars, beats) {
    if (!S.N) return;
    S.bars = Math.max(1, bars | 0); S.beats = Math.max(1, beats | 0);
    S.bpm = S.bars * S.beats * 60 / lenSec(); S.guessed = false; S.nb = null;
    changed("layers"); dirty();
  }

  /* ---------- latency test ----------
     Eight loud clicks through the speaker, heard back through the mic: the time between sending
     each and hearing it is the round trip. Needs the speaker (or headphones held to the mic). */
  var cal = null;
  async function calibrate() {
    await openMic();
    stop();
    var now = ctx.currentTime, t = now + 0.4, n = 8, gap = 0.4, at = [];
    cal = { f0: Math.round((t - 0.15) * sr) };
    driver();
    for (var k = 0; k < n; k++) {
      var tt = t + k * gap; at.push(tt);
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "square"; o.frequency.value = 1500;
      g.gain.setValueAtTime(0.5, tt); g.gain.setValueAtTime(0, tt + 0.006);
      o.connect(g); g.connect(ctx.destination); o.start(tt); o.stop(tt + 0.01);
    }
    var endF = Math.round((t + n * gap + 0.4) * sr), started = Date.now();
    await new Promise(function (res) {
      (function wait() { if (cap.end >= endF || Date.now() - started > 8000) res(); else setTimeout(wait, 50); })();
    });
    var raw = capGet(cal.f0, endF), f0 = cal.f0;
    cal = null;
    var ds = D.clickDelays(raw, at.map(function (x) { return Math.round(x * sr) - f0; }), Math.round(0.35 * sr)).filter(function (d) { return d != null; });
    if (ds.length < 5) return { ok: false, why: "quiet" };
    var med = D.median(ds), spread = D.median(ds.map(function (d) { return Math.abs(d - med); }));
    if (spread > 0.004 * sr) return { ok: false, why: "spread" };
    P.latency = Math.round(med / sr * 1000) / 1000; P.calibrated = true; savePrefs(); emit("prefs");
    return { ok: true, ms: Math.round(med / sr * 1000) };
  }

  /* ---------- saving ---------- */
  var DB = "music-looper", dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      if (!window.indexedDB) return rej(new Error("no db"));
      var r = indexedDB.open(DB, 1);
      r.onupgradeneeded = function () {
        var d = r.result;
        if (!d.objectStoreNames.contains("sessions")) d.createObjectStore("sessions", { keyPath: "id" });
        if (!d.objectStoreNames.contains("takes")) d.createObjectStore("takes", { keyPath: "id" }).createIndex("sid", "sid");
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    dbp.catch(function () { dbp = null; });
    return dbp;
  }
  function tx(stores, mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction(stores, mode), out = fn(t);
        t.oncomplete = function () { res(out && out.result !== undefined ? out.result : out); };
        t.onerror = t.onabort = function () { rej(t.error); };
      });
    });
  }
  function newSid() {
    var n = (parseInt(lsGet("looper:counter"), 10) || 0) + 1;
    lsSet("looper:counter", String(n));
    S.sid = uid(); S.name = "Loop " + n; S.created = Date.now();
    lsSet("looper:current", S.sid);
  }
  var saveT = 0, saving = null;
  function dirty() { clearTimeout(saveT); saveT = setTimeout(save, 500); }
  function save() {
    clearTimeout(saveT);
    if (!S.sid || S.rec) { if (S.rec) saveT = setTimeout(save, 800); return Promise.resolve(); }
    var layers = S.layers.filter(function (l) { return !l.prov; });
    var doc = {
      id: S.sid, name: S.name, created: S.created || Date.now(), updated: Date.now(), sr: sr,
      N: S.N, bpm: S.bpm, bars: S.bars, beats: S.beats, guessed: S.guessed,
      layers: layers.map(function (l) { return { id: l.id, name: l.name, color: l.color, mult: l.mult, vol: l.vol, muted: l.muted, s: l.s, len: l.len, R: l.R, nudge: l.nudge, fade: l.fade, base: l.base }; }),
      peaks: mixPeaks(layers)
    };
    var fresh = layers.filter(function (l) { return !l.saved; });
    var p = tx(["sessions", "takes"], "readwrite", function (t) {
      t.objectStore("sessions").put(doc);
      fresh.forEach(function (l) { t.objectStore("takes").put({ id: l.id, sid: S.sid, sr: sr, raw: D.toI16(l.raw).buffer }); });
    }).then(function () { fresh.forEach(function (l) { l.saved = true; }); emit("saved"); })
      .catch(function () { emitErr("Couldn't save"); });
    saving = p;
    return p;
  }
  function mixPeaks(layers) {
    if (!layers.length || !S.N) return null;
    var bins = 48, out = new Array(bins).fill(0), mx = 0;
    layers.forEach(function (l) { if (l.muted) return; var p = D.peaks(l.out.subarray(0, S.N), bins).p; for (var i = 0; i < bins; i++) out[i] = Math.max(out[i], p[i] * l.vol); });
    out.forEach(function (v) { if (v > mx) mx = v; });
    return out.map(function (v) { return mx ? Math.round(v / mx * 100) / 100 : 0; });
  }

  function list() {
    return tx(["sessions"], "readonly", function (t) { return t.objectStore("sessions").getAll(); })
      .then(function (all) { return (all || []).sort(function (a, b) { return b.updated - a.updated; }); });
  }
  function clearState() {
    stop();
    S.layers.forEach(function (l) { try { l.gain.disconnect(); } catch (e) {} });
    S.layers = []; S.N = 0; S.bpm = 0; S.bars = 0; S.guessed = false; S.undo = []; S.redo = []; S.ext = null;
    S.sid = null; S.name = ""; S.created = 0;
  }
  function newSession() {
    return (saving || Promise.resolve()).then(function () {
      clearState(); lsSet("looper:current", ""); changed("layers");
    });
  }
  function open(id) {
    ensureCtx();
    return (saving || Promise.resolve()).then(function () {
      return tx(["sessions"], "readonly", function (t) { return t.objectStore("sessions").get(id); });
    }).then(function (doc) {
      if (!doc) throw new Error("gone");
      return tx(["takes"], "readonly", function (t) { return t.objectStore("takes").index("sid").getAll(id); }).then(function (takes) {
        clearState();
        var by = {}; (takes || []).forEach(function (x) { by[x.id] = x; });
        var ratio = sr / (doc.sr || sr), conv = Math.abs(ratio - 1) > 1e-9;
        S.sid = doc.id; S.name = doc.name; S.created = doc.created;
        S.N = conv ? Math.round(doc.N * ratio) : doc.N;
        S.bpm = doc.bpm; S.bars = doc.bars; S.beats = doc.beats; S.guessed = !!doc.guessed;
        doc.layers.forEach(function (m) {
          var tk = by[m.id]; if (!tk) return;
          var raw = D.fromI16(new Int16Array(tk.raw)), len = m.len, s = m.s, R = m.R, nudge = m.nudge, fade = m.fade;
          if (conv) {
            raw = D.resample(raw, Math.round(raw.length * ratio));
            len = S.N * (m.mult || 1); s = Math.round(s * ratio); R = Math.round(R * ratio) % len; nudge = Math.round(nudge * ratio); fade = Math.round(fade * ratio);
          }
          S.layers.push(newLayer({ id: m.id, name: m.name, color: m.color, mult: m.mult, vol: m.vol, muted: m.muted, raw: raw, s: s, len: len, R: R, nudge: nudge, fade: fade, base: m.base, saved: !conv }));
        });
        if (!S.layers.length) S.N = 0;
        lsSet("looper:current", S.sid);
        // takes no longer used by this loop (deleted layers) go now
        var keep = S.layers.map(function (l) { return l.id; });
        var gone = (takes || []).filter(function (x) { return keep.indexOf(x.id) < 0; });
        if (gone.length) tx(["takes"], "readwrite", function (t) { gone.forEach(function (x) { t.objectStore("takes").delete(x.id); }); }).catch(function () {});
        if (conv) dirty();
        changed("layers");
        return true;
      });
    });
  }
  function renameSession(name) {
    name = String(name || "").trim().slice(0, 60);
    if (!name) return;
    if (!S.sid) newSid();
    S.name = name; changed("layers"); dirty();
  }
  function deleteSession(id) {
    var cur = id === S.sid;
    return tx(["sessions", "takes"], "readwrite", function (t) {
      t.objectStore("sessions").delete(id);
      var idx = t.objectStore("takes").index("sid").openCursor(IDBKeyRange.only(id));
      idx.onsuccess = function () { var c = idx.result; if (c) { c.delete(); c.continue(); } };
    }).then(function () { if (cur) { clearState(); lsSet("looper:current", ""); changed("layers"); } });
  }

  /* ---------- export ---------- */
  function maxMult() { return S.layers.reduce(function (m, l) { return Math.max(m, l.mult || 1); }, 1); }
  function mixdown(times) {
    var cyc = S.N * maxMult(), total = cyc * Math.max(1, times | 0), out = new Float32Array(total), pk = 0, i;
    S.layers.forEach(function (l) {
      if (l.muted || l.prov) return;
      var g = l.vol * l.vol, d = l.out, n = d.length;
      for (i = 0; i < total; i++) out[i] += d[i % n] * g;
    });
    for (i = 0; i < total; i++) { var v = out[i] < 0 ? -out[i] : out[i]; if (v > pk) pk = v; }
    if (pk > 0.98) { var k = 0.98 / pk; for (i = 0; i < total; i++) out[i] *= k; }
    return out;
  }
  function exportWav(times) {
    var mix = mixdown(times);
    return { blob: new Blob([D.wav(mix, sr)], { type: "audio/wav" }), secs: mix.length / sr, mix: mix };
  }
  function toMemos(times) {
    var x = exportWav(times);
    return new Promise(function (res, rej) {
      var r = indexedDB.open("music-memos", 1);
      r.onupgradeneeded = function () {
        var d = r.result;
        if (!d.objectStoreNames.contains("memos")) d.createObjectStore("memos", { keyPath: "id" });
        if (!d.objectStoreNames.contains("draft")) d.createObjectStore("draft", { keyPath: "id" });
      };
      r.onerror = function () { rej(r.error); };
      r.onsuccess = function () {
        var d = r.result, t = d.transaction("memos", "readwrite");
        t.objectStore("memos").put({ id: uid(), name: S.name || "Loop", created: Date.now(), duration: Math.round(x.secs * 100) / 100, type: "audio/wav", size: x.blob.size, peaks: D.peaks(x.mix, 120).p, blob: x.blob });
        t.oncomplete = function () { d.close(); res(); };
        t.onerror = t.onabort = function () { d.close(); rej(t.error); };
      };
    });
  }

  /* ---------- the practice log, wake lock, leaving the page ---------- */
  var logged = "";
  function logState() {
    var L = window.MusicLog;
    var on = S.playing || !!S.rec, text = "";
    if (on) {
      var n = S.layers.filter(function (l) { return !l.prov; }).length;
      text = S.rec ? "Looper · recording" : "Looper · " + n + " layer" + (n === 1 ? "" : "s") + (S.bpm ? " · " + Math.round(S.bpm) + " bpm" : "");
    }
    if (text === logged) return;
    logged = text;
    if (L && L.playing) try { L.playing("loop", on, on ? { text: text } : undefined); } catch (e) {}
  }
  var wake = null;
  function keepAwake() {
    var want = S.playing || !!S.rec;
    if (want && !wake && navigator.wakeLock && !document.hidden) {
      wake = 1;
      navigator.wakeLock.request("screen").then(function (w) { wake = w; w.addEventListener("release", function () { if (wake === w) wake = null; }); }).catch(function () { wake = null; });
    } else if (!want && wake && wake !== 1) { try { wake.release(); } catch (e) {} wake = null; }
  }
  function changed(what) { logState(); keepAwake(); emit(what); }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (S.rec) cancelRec();
      if (mic) { closeMic(); emit("mic"); }
      if (S.sid) save();
    } else keepAwake();
  });
  window.addEventListener("pagehide", function () { if (S.sid) save(); });

  /* ---------- inputs ---------- */
  function devices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return Promise.resolve([]);
    return navigator.mediaDevices.enumerateDevices().then(function (ds) {
      return ds.filter(function (d) { return d.kind === "audioinput" && d.deviceId !== "default" && d.deviceId !== "communications"; })
        .map(function (d, i) { return { id: d.deviceId, label: d.label || "Input " + (i + 1) }; });
    }).catch(function () { return []; });
  }
  function setPref(k, v) {
    if (!(k in DEF)) return;
    P[k] = v; savePrefs();
    if (k === "clickVol" && clickOut) clickOut.gain.setTargetAtTime(clickGain(), ctx.currentTime, 0.01);
    if (k === "inGain" && mic) mic.gain.gain.setTargetAtTime(inGain(), ctx.currentTime, 0.01);
    if (k === "monitor" && mic) mic.mon.gain.setTargetAtTime(v ? 1 : 0, ctx.currentTime, 0.01);
    if (k === "chan" && mic) mic.node.port.postMessage({ ch: v === "1" ? 0 : v === "2" ? 1 : "mix" });
    if ((k === "device" || k === "cleanup") && mic) { closeMic(); openMic().catch(function () {}); }
    if (k === "click") S.nb = null;
    emit("prefs");
  }

  /* ---------- what the UI reads ---------- */
  function view() {
    var now = ctx ? ctx.currentTime : 0, r = S.rec, Ls = lenSec(), v = {
      N: S.N, len: Ls, bpm: S.bpm, bars: S.bars, beats: S.beats, guessed: S.guessed,
      playing: S.playing, mic: !!mic, level: cap.lvl, clip: performance.now() - cap.clipAt < 800,
      phase: 0, rec: null, latency: rtl(), sr: sr
    };
    if (S.playing && Ls) v.phase = mod(now - S.t0, Ls) / Ls;
    if (r) {
      var o = v.rec = { kind: r.kind, mode: r.mode, phase: r.phase, mult: r.mult || 0, bars: r.bars || 0 };
      if (r.phase === "countin") {
        o.wait = Math.max(0, r.ts - now);
        var bl = r.bd || beatLen();
        o.count = bl ? Math.ceil(o.wait / bl - 1e-6) : 0;
      } else {
        o.elapsed = Math.max(0, now - (r.mode === "free" ? r.cs : r.ts));
        if (r.len) o.progress = Math.min(1, o.elapsed / (r.len / sr));
        if (r.kind === "over") { o.start = Ls ? mod(r.ts - S.t0, Ls) / Ls : 0; o.loops = Ls ? o.elapsed / Ls : 0; }
        if (r.kind === "first" && r.mode === "tempo") { o.bd = r.bd; o.barsDone = o.elapsed / (r.bd * r.beats); }
      }
    }
    return v;
  }
  function layerPhase(l) {
    if (!S.playing || !l.len) return -1;
    return mod(ctx.currentTime - S.t0, l.len / sr) / (l.len / sr);
  }

  /* ---------- start up ---------- */
  function boot() {
    var id = lsGet("looper:current");
    if (!id) return Promise.resolve(false);
    return open(id).catch(function () { lsSet("looper:current", ""); return false; });
  }

  window.Looper = {
    P: P, S: S, DEF: DEF, on: function (f) { subs.push(f); },
    ctx: function () { return ensureCtx(); }, sr: function () { return sr; },
    main: main, play: function () { if (S.rec) return; resume(); play(); }, stop: stop,
    toggle: function () { if (S.playing || S.rec) stop(); else { resume(); play(); } },
    undo: undo, redo: redo, canUndo: function () { return !!S.rec || S.undo.length > 0; }, canRedo: function () { return !S.rec && S.redo.length > 0; },
    remove: remove, setVol: setVol, toggleMute: toggleMute, rename: rename, setNudge: setNudge, setFade: setFade,
    find: find, layerPhase: layerPhase, setRegion: setRegion, seek: seek, setTempo: setTempo,
    calibrate: calibrate, openMic: openMic, devices: devices, mic: function () { return mic; },
    setPref: setPref, view: view, rtl: rtl,
    list: list, open: open, newSession: newSession, renameSession: renameSession, deleteSession: deleteSession, save: save,
    exportWav: exportWav, toMemos: toMemos, boot: boot,
    _cap: cap, _tick: tick, _rec: function () { return S.rec; }
  };
})();
