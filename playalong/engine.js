/* PA.engine: the timeline and the audio engine of Play Along (window.PA.engine). Needs PA.score; uses PASamples when it is there.
   Reads the shared state object PA.S (tl, prefs, startPos) that app.js owns.

   Timeline  buildTimeline(sc, o) -> tl
     sc: the score to play (already transposed). o.swing optional.
     tl = { passes:[{bar,start,len,time,tempo,unit}], events:[main events], partEvents:{key:[events]}, offs:[per bar offsets of main events],
            poffs:{key:[per bar offsets]}, clicks:[{pos,accent}], tempos:[{pos,bpm}] (written bpm), total, unit, barBeats, seq, meta, parts }
     event = { bar, ev, pass, start, dur, notes:[{midi, skip, dur, dead?, drum?}], shift, mul }   midi is SOUNDING pitch (drums: GM note)
     tl.writtenAt(pos) -> written bpm there.   locate(tl,pos) -> {pass, bar, ev, off}.   locateParts(tl, loc) -> {key: eventIndex}
   Engine
     configure({ parts:{ key:{ sound, vol, on } } })   sound: bass|guitar|acoustic|piano|synth|drums|off; vol 0..1; on false = muted
     prefetch()    start loading sample packs for the configured sounds (no gesture needed)
     start() / stop(soft) / seek(pos) / pos() / setSpeed(f) / applyVolumes()
     E.counts[key]  notes scheduled per part (for tests), E.loading (packs still decoding), E.onLoad callback
     E.segs: tempo anchors { t, pos, spb, speed, bpm, next, auto } */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score;
  var S = PA.S = PA.S || {};
  var clamp = SC.clamp;
  var NS = {};
  PA.engine = NS;

  /* ================================================================ timeline */
  function clickUnit(time) {
    var n = time[0], d = time[1];
    if (d === 8 && n % 3 === 0 && n >= 6) return 1.5;
    return Math.max(0.5, 4 / d);
  }
  function offsOf(evs) { var o = 0, a = []; evs.forEach(function (e) { a.push(o); o += e.d; }); a.push(o); return a; }

  function buildPartEvents(getEvs, mt, seq, passStart, octave, swing, isDrum) {
    var events = [], offsByBar = {}, open = {};
    seq.forEach(function (bi, pi) {
      var evs = getEvs(bi) || [{ d: mt[bi].len, notes: [] }];
      var offs = offsByBar[bi] || (offsByBar[bi] = offsOf(evs)), swungPrev = false;
      evs.forEach(function (e, j) {
        var swungNow = false;
        var ev = { bar: bi, ev: j, pass: pi, start: passStart[pi] + offs[j], dur: e.d, notes: [], shift: 0, mul: 1 };
        if (swing && !isDrum && Math.abs(e.d - 0.5) < 0.001 && j + 1 < evs.length && Math.abs(evs[j + 1].d - 0.5) < 0.001) {
          var o = offs[j];
          if (Math.abs(o - Math.round(o)) < 0.001) { ev.mul = 4 / 3; swungNow = true; }
        }
        if (swungPrev) { ev.shift = 1 / 6; ev.mul = 2 / 3; }
        swungPrev = swungNow;
        var nextOpen = {};
        e.notes.forEach(function (n) {
          if (n.drum != null) { ev.notes.push({ midi: n.drum, drum: true, dur: 0.25, skip: false }); return; }
          var midi = SC.noteMidi(n) + octave, cur = open[midi];
          if (cur && !n.dead) { cur.dur += e.d; if (n.tie) nextOpen[midi] = cur; ev.notes.push({ midi: midi, skip: true, dur: 0 }); }
          else {
            var o2 = { midi: midi, dur: n.dead ? 0.1 : e.d * ev.mul, skip: false, own: e.d * ev.mul };
            if (n.dead) o2.dead = true;
            ev.notes.push(o2);
            if (n.tie && !n.dead) nextOpen[midi] = o2;
          }
        });
        open = nextOpen;
        events.push(ev);
      });
    });
    return { events: events, offs: offsByBar };
  }

  function buildTimeline(sc) {
    var bars = sc.measures, byN = SC.barIndexByN(sc), seq = [], mt = SC.meta(sc);
    if (sc.order && sc.order.length) seq = sc.order.map(function (n) { return byN[n]; }).filter(function (i) { return i != null; });
    if (!seq.length) seq = bars.map(function (_, i) { return i; });
    var passes = [], clicks = [], tempos = [], pos = 0, passStart = [], lastTempo = null;
    var plist = SC.parts(sc);
    var barOffs = bars.map(function (b) { return offsOf(b.events); });
    seq.forEach(function (bi, pi) {
      var len = barOffs[bi][bars[bi].events.length], m = mt[bi], unit = clickUnit(m.time);
      passes.push({ bar: bi, start: pos, len: len, time: m.time, tempo: m.tempo, unit: unit });
      passStart.push(pos);
      if (m.tempo !== lastTempo) { tempos.push({ pos: pos, bpm: m.tempo }); lastTempo = m.tempo; }
      var pick = (pi === 0 && sc.pickup > 0 && bi === 0);
      if (pick) {
        for (var q = Math.floor(len / unit + 1e-6); q >= 1; q--) { var cp = pos + len - q * unit; if (cp >= pos - 1e-6) clicks.push({ pos: cp, accent: false }); }
      } else {
        for (var k = 0; k * unit < len - 1e-6; k++) clicks.push({ pos: pos + k * unit, accent: k === 0 });
      }
      pos += len;
    });
    var main = buildPartEvents(function (bi) { return bars[bi].events; }, mt, seq, passStart, plist[0].drum ? 0 : plist[0].octave, !!sc.swing, plist[0].drum);
    var partEvents = {}, poffs = {};
    partEvents.main = main.events; poffs.main = main.offs;
    plist.slice(1).forEach(function (p) {
      var r = buildPartEvents(p.events, mt, seq, passStart, p.drum ? 0 : p.octave, !!sc.swing, p.drum);
      partEvents[p.key] = r.events; poffs[p.key] = r.offs;
    });
    var tl = {
      passes: passes, events: main.events, partEvents: partEvents, poffs: poffs, offs: barOffs, clicks: clicks, tempos: tempos, total: pos,
      unit: clickUnit(mt[seq[0]].time), barBeats: mt[seq[0]].len, seq: seq, meta: mt, parts: plist
    };
    tl.writtenAt = function (p) {
      var T = tl.tempos, lo = 0, hi = T.length - 1;
      while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (T[mid].pos <= p + 1e-9) lo = mid; else hi = mid - 1; }
      return T[lo].bpm;
    };
    tl.nextTempoPos = function (p) {
      var T = tl.tempos;
      for (var i = 0; i < T.length; i++) if (T[i].pos > p + 1e-9) return T[i].pos;
      return Infinity;
    };
    return tl;
  }
  function firstPassOf(tl, bi) { for (var i = 0; i < tl.passes.length; i++) if (tl.passes[i].bar === bi) return i; return -1; }
  function locate(tl, pos) {
    var P = tl.passes, lo = 0, hi = P.length - 1;
    if (!P.length) return null;
    if (pos < 0) pos = 0;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (P[mid].start <= pos + 1e-9) lo = mid; else hi = mid - 1; }
    var p = P[lo], off = clamp(pos - p.start, 0, p.len), o = tl.offs[p.bar], j = 0;
    for (var i = 0; i < o.length - 1; i++) if (o[i] <= off + 1e-9) j = i;
    return { pass: lo, bar: p.bar, ev: j, off: off };
  }
  function locateParts(tl, loc) {
    var out = {};
    Object.keys(tl.poffs).forEach(function (k) {
      var o = tl.poffs[k][loc.bar];
      if (!o) { out[k] = 0; return; }
      var j = 0;
      for (var i = 0; i < o.length - 1; i++) if (o[i] <= loc.off + 1e-9) j = i;
      out[k] = j;
    });
    return out;
  }
  function eventIndexAt(list, pos) {
    var lo = 0, hi = list.length;
    while (lo < hi) { var mid = (lo + hi) >> 1; if (list[mid].start < pos - 1e-7) lo = mid + 1; else hi = mid; }
    return lo;
  }
  function loopRange() {
    var L = S.prefs && S.prefs.loop, tl = S.tl;
    if (!L || !tl) return null;
    var a = firstPassOf(tl, L.a);
    if (a < 0) return null;
    var b = -1;
    for (var i = a; i < tl.passes.length; i++) if (tl.passes[i].bar === L.b) { b = i; break; }
    if (b < 0) { for (var j = tl.passes.length - 1; j >= a; j--) if (tl.passes[j].bar >= L.a && tl.passes[j].bar <= L.b) { b = j; break; } }
    if (b < 0) b = a;
    var s = tl.passes[a].start, e = tl.passes[b].start + tl.passes[b].len;
    return e > s + 1e-6 ? { start: s, end: e, a: a, b: b } : null;
  }

  /* ================================================================ audio graph */
  var TICK_MS = 25, HORIZON = 0.15;
  var E = {
    ctx: null, master: null, instBus: null, clickBus: null, chains: null, piano: null, bufs: {}, voices: [], wake: null, ctxStuck: false,
    running: false, starting: false, segs: [], schedPos: 0, gate: 0, ciActive: false, ciClicks: [], finished: false, endAt: 0,
    worker: null, ivl: null, ciStart: 0, ciBeats: 0, ticks: 0,
    buses: {}, thud: {}, cfg: { parts: {} }, counts: {}, loading: 0, failed: {}, onLoad: null, onEnd: null, speed: 1
  };
  NS.E = E;

  function ensureCtx(noResume) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    var ctx = E.ctx;
    if (ctx && (ctx.state === "closed" || E.ctxStuck)) {
      try { var p = ctx.close(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
      E.ctx = ctx = null; E.chains = null; E.piano = {}; E.bufs = {}; E.voices = []; E.buses = {}; E.thud = {};
    }
    if (!noResume) E.ctxStuck = false;
    if (!ctx) {
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
      ctx = E.ctx = new AC();
    }
    if (!noResume) {
      if (ctx.state !== "running") { try { var r = ctx.resume(); if (r && r.catch) r.catch(function () {}); } catch (e) {} }
      try { var s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate); s.connect(ctx.destination); s.start(0); } catch (e) {}
    }
    if (!E.master || E.master.context !== ctx) buildGraph();
    return ctx;
  }
  function buildGraph() {
    var ctx = E.ctx;
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -10; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.005; comp.release.value = 0.2;
    comp.connect(ctx.destination);
    E.master = ctx.createGain(); E.master.gain.value = 1; E.master.connect(comp);
    E.instBus = ctx.createGain(); E.instBus.connect(E.master);
    E.clickBus = ctx.createGain(); E.clickBus.connect(E.master);
    E.chains = {}; E.piano = {}; E.buses = {}; E.thud = {};
    applyVolumes();
  }
  function applyVolumes() {
    if (!E.ctx || !E.instBus) return;
    var P = S.prefs || {}, t = E.ctx.currentTime;
    E.instBus.gain.setTargetAtTime(clamp(P.instVol == null ? 0.8 : P.instVol, 0, 1) * 1.25, t, 0.02);
    E.clickBus.gain.setTargetAtTime(clamp(P.clickVol == null ? 0.7 : P.clickVol, 0, 1) * 1.1, t, 0.02);
    Object.keys(E.buses).forEach(function (k) { E.buses[k].gain.setTargetAtTime(busGain(k), t, 0.02); });
  }
  function busGain(key) { var c = E.cfg.parts[key]; return c && c.on !== false ? clamp(c.vol == null ? 1 : c.vol, 0, 1.5) : 0; }
  function busFor(key) {
    var b = E.buses[key];
    if (b && b.context === E.ctx) return b;
    b = E.ctx.createGain(); b.gain.value = busGain(key); b.connect(E.instBus);
    return (E.buses[key] = b);
  }
  function holdWake(on) {
    try {
      if (on && "wakeLock" in navigator && !E.wake) { navigator.wakeLock.request("screen").then(function (w) { E.wake = w; w.addEventListener("release", function () { E.wake = null; }); if (!E.running) holdWake(false); }).catch(function () {}); }
      else if (!on && E.wake) { var w = E.wake; E.wake = null; w.release().catch(function () {}); }
    } catch (e) {}
  }

  /* ---- sample packs ---- */
  function wantedPacks() {
    var out = {};
    Object.keys(E.cfg.parts).forEach(function (k) {
      var c = E.cfg.parts[k];
      if (c.on === false || !c.sound || c.sound === "off" || c.sound === "synth") return;
      out[c.sound] = true;
    });
    return Object.keys(out);
  }
  function prefetch() {
    var PS = window.PASamples;
    if (!PS || !E.ctx) return Promise.resolve();
    var ctx = E.ctx, names = wantedPacks();
    var jobs = names.filter(function (n) { return !E.failed[n]; }).map(function (n) {
      if (E["ld_" + n] === ctx) return null;
      E["ld_" + n] = ctx;
      E.loading++;
      return PS.load(ctx, n).then(function () {}, function () { E.failed[n] = true; }).then(function () {
        E.loading = Math.max(0, E.loading - 1);
        if (E.onLoad) E.onLoad();
      });
    }).filter(Boolean);
    if (jobs.length && E.onLoad) E.onLoad();
    return Promise.all(jobs);
  }
  function configure(cfg) {
    E.cfg = cfg || { parts: {} };
    if (E.ctx) { applyVolumes(); prefetch(); }
  }

  /* ---- Karplus-Strong: the synth voices ---- */
  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; }; }
  function ksSamples(freq, sr, len, kind) {
    var bass = kind === "bass";
    var a = bass ? 0.5 : 0.34;
    var t60 = bass ? 2.2 : 2.8;
    var P = sr / freq, D = P - a, N = Math.max(2, Math.floor(D - 0.1)), frac = D - N, C = (1 - frac) / (1 + frac);
    var g = Math.pow(10, -3 * P / (sr * t60));
    var line = new Float32Array(N), rnd = seeded(Math.round(freq * 100) + (bass ? 7 : 31)), mean = 0, i;
    for (i = 0; i < N; i++) line[i] = rnd();
    if (bass) { var pv = 0; for (i = 0; i < N; i++) { pv = 0.6 * line[i] + 0.4 * pv; line[i] = pv; } }
    for (i = 0; i < N; i++) mean += line[i];
    mean /= N; for (i = 0; i < N; i++) line[i] -= mean;
    var out = new Float32Array(len), idx = 0, xp = 0, apx = 0, apy = 0, peak = 0;
    for (var n = 0; n < len; n++) {
      var x = line[idx];
      var lp = (1 - a) * x + a * xp; xp = x;
      var ap = C * lp + apx - C * apy; apx = lp; apy = ap;
      line[idx] = ap * g;
      if (++idx >= N) idx = 0;
      out[n] = x;
      var ax = x < 0 ? -x : x; if (ax > peak) peak = ax;
    }
    var k = peak > 0 ? 0.9 / peak : 1;
    for (n = 0; n < len; n++) out[n] *= k;
    return out;
  }
  function ksBuffer(kind, midi) {
    var key = kind + midi;
    if (E.bufs[key]) return E.bufs[key];
    var ctx = E.ctx, f = 440 * Math.pow(2, (midi - 69) / 12);
    var smp = ksSamples(f, ctx.sampleRate, Math.floor(ctx.sampleRate * 2.5), kind);
    var buf = ctx.createBuffer(1, smp.length, ctx.sampleRate);
    buf.copyToChannel(smp, 0);
    E.bufs[key] = buf;
    return buf;
  }
  function chainFor(kind, key, dead) {
    var ck = kind + "|" + key + (dead ? "|d" : "");
    if (E.chains[ck]) return E.chains[ck];
    var ctx = E.ctx, inp = ctx.createGain(), lp = ctx.createBiquadFilter(), comp = ctx.createDynamicsCompressor();
    lp.type = "lowpass"; lp.frequency.value = dead ? 420 : kind === "bass" ? 1800 : 5000; lp.Q.value = kind === "bass" ? 0.7 : 0.5;
    comp.threshold.value = -16; comp.knee.value = 14; comp.ratio.value = 2.5; comp.attack.value = 0.006; comp.release.value = 0.15;
    inp.connect(lp); lp.connect(comp); comp.connect(busFor(key));
    return (E.chains[ck] = { input: inp, lp: lp });
  }
  function killVoice(v, now) {
    try {
      if (v.g) { v.g.gain.cancelScheduledValues(now); v.g.gain.setTargetAtTime(0, now, 0.008); }
      var stopAt = v.t0 > now ? now : now + 0.06;
      if (v.src) v.src.stop(stopAt);
      if (v.oscs) v.oscs.forEach(function (o) { try { o.stop(stopAt); } catch (e) {} });
      if (v.sv) v.sv.stop(now);
    } catch (e) {}
  }
  function playString(kind, key, midi, t, dur, vel, dead) {
    var ctx = E.ctx, rel = kind === "bass" ? 0.04 : 0.12, buf = ksBuffer(kind, clamp(midi, 24, 96));
    var src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf;
    dur = Math.max(dur, 0.05);
    var end = t + dur;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.003);
    g.gain.setValueAtTime(vel, end);
    g.gain.setTargetAtTime(0, end, rel / 3);
    src.connect(g); g.connect(chainFor(kind, key, dead).input);
    src.start(t); src.stop(end + rel * 3 + 0.05);
    E.voices.push({ t0: t, end: end + rel * 3 + 0.05, src: src, g: g });
  }
  function setupPiano(key) {
    E.piano = E.piano || {};
    var pn = E.piano[key];
    if (pn && pn.bus.context === E.ctx) return pn;
    var ctx = E.ctx, bus = ctx.createGain(), comp = ctx.createDynamicsCompressor(), verb = ctx.createConvolver();
    comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
    var len = Math.floor(ctx.sampleRate * 1.8), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch), r = seeded(99 + ch); for (var i = 0; i < len; i++) d[i] = r() * Math.pow(1 - i / len, 3.2); }
    verb.buffer = ir;
    var wet = ctx.createGain(); wet.gain.value = 0.16;
    bus.connect(comp); bus.connect(verb); verb.connect(wet); wet.connect(comp);
    comp.connect(busFor(key));
    var harm = [0, 1, 0.42, 0.22, 0.14, 0.08, 0.05, 0.03, 0.02];
    var wave = ctx.createPeriodicWave(new Float32Array(harm.length), new Float32Array(harm));
    return (E.piano[key] = { bus: bus, comp: comp, wave: wave });
  }
  function playPiano(key, midi, t, dur, vel) {
    var ctx = E.ctx, pn = setupPiano(key), f = 440 * Math.pow(2, (midi - 69) / 12);
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.Q.value = 0.4;
    lp.frequency.setValueAtTime(Math.min(f * 10, 10000), t);
    lp.frequency.setTargetAtTime(Math.min(Math.max(f * 2.5, 600), 10000), t + 0.01, 0.4);
    var g = ctx.createGain(), tau = clamp(1.9 - (midi - 40) * 0.03, 0.5, 1.9);
    g.gain.value = 0;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.005);
    g.gain.setTargetAtTime(vel * 0.38, t + 0.005, 0.09);
    g.gain.setTargetAtTime(0.0001, t + 0.3, tau);
    var end = t + Math.max(dur, 0.08);
    g.gain.cancelScheduledValues(end);
    g.gain.setTargetAtTime(0.0001, end, 0.07);
    lp.connect(g); g.connect(pn.bus);
    var oscs = [-3, 4].map(function (c) {
      var o = ctx.createOscillator();
      o.setPeriodicWave(pn.wave); o.frequency.value = f; o.detune.value = c;
      o.connect(lp); o.start(t); o.stop(end + 0.7);
      return o;
    });
    E.voices.push({ t0: t, end: end + 0.7, oscs: oscs, g: g });
  }
  /* a tiny drum voice for when PASamples is missing */
  function synthDrum(key, note, t, vel) {
    var ctx = E.ctx, g = ctx.createGain(), dest = busFor(key), o, src;
    g.connect(dest);
    var kick = note === 35 || note === 36, hat = note >= 42 && note <= 46 || note === 51 || note === 59 || note >= 49 && note <= 57;
    if (kick) {
      o = ctx.createOscillator(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
      g.gain.setValueAtTime(vel, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g); o.start(t); o.stop(t + 0.3);
      E.voices.push({ t0: t, end: t + 0.3, src: o, g: g });
    } else {
      var len = Math.floor(ctx.sampleRate * (hat ? 0.08 : 0.18)), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), r = seeded(note);
      for (var i = 0; i < len; i++) d[i] = r() * (1 - i / len);
      src = ctx.createBufferSource(); src.buffer = buf;
      var hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = hat ? 6000 : 1200;
      g.gain.setValueAtTime(vel * 0.6, t); src.connect(hp); hp.connect(g); src.start(t);
      E.voices.push({ t0: t, end: t + 0.2, src: src, g: g });
    }
  }
  function playClick(accent, t) {
    var ctx = E.ctx, osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = "square"; osc.frequency.value = accent ? 1760 : 1100;
    var peak = accent ? 0.5 : 0.3;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (accent ? 0.06 : 0.04));
    osc.connect(g); g.connect(E.clickBus);
    osc.start(t); osc.stop(t + 0.09);
    E.voices.push({ t0: t, end: t + 0.09, src: osc, g: g });
  }

  /* One note. cfgp: { sound, inst } where inst is the part's instrument kind for the synth voice. */
  function playNote(key, cfgp, n, t, dur, nn) {
    var PS = window.PASamples, ctx = E.ctx, sound = cfgp.sound, kind = cfgp.kind;
    E.counts[key] = (E.counts[key] || 0) + 1;
    if (n.drum) {
      var vd = 0.8, ok = false;
      if (PS && sound !== "synth") { try { var h = PS.play(ctx, busFor(key), "drums", n.midi, t, 0, vd); ok = !!h; if (h) E.voices.push({ t0: t, end: t + 1.5, sv: h }); } catch (e) {} }
      if (!ok) synthDrum(key, n.midi, t, vd);
      return;
    }
    var vel = clamp(0.8 / Math.sqrt(Math.max(1, nn)) + 0.12, 0.2, 0.92);
    if (n.dead) {
      // a muted thud: a very short note through a dark filter
      var dv = 0.5, okd = false;
      if (PS && sound !== "synth" && sound !== "drums") {
        try {
          var td = E.thud[key];
          if (!td || td.context !== ctx) { td = E.thud[key] = ctx.createBiquadFilter(); td.type = "lowpass"; td.frequency.value = 480; td.connect(busFor(key)); }
          var hd = PS.play(ctx, td, sound, n.midi, t, 0.03, dv); okd = !!hd; if (hd) E.voices.push({ t0: t, end: t + 0.6, sv: hd });
        } catch (e) {}
      }
      if (!okd) playString(kind === "bass" ? "bass" : "guitar", key, n.midi, t, 0.04, dv, true);
      return;
    }
    if (PS && sound !== "synth" && sound !== "drums") {
      var h2 = null;
      try { h2 = PS.play(ctx, busFor(key), sound, n.midi, t, dur, vel); } catch (e) {}
      if (h2) { E.voices.push({ t0: t, end: t + dur + 0.6, sv: h2 }); return; }
    }
    // synth: the string models for bass and guitar, the piano for the rest
    if (kind === "bass") playString("bass", key, n.midi, t, dur - 0.01, clamp(vel + 0.05, 0.2, 0.95));
    else if (kind === "guitar") playString("guitar", key, n.midi, t, dur, vel);
    else playPiano(key, n.midi, t, dur, 0.26 / Math.sqrt(Math.max(1, nn)));
  }
  function playEventNotes(key, cfgp, ev, t, spb, limit) {
    var maxB = limit - ev.start - ev.shift, list = [];
    ev.notes.forEach(function (n) { if (!n.skip) list.push(n); });
    list.sort(function (a, b) { return a.midi - b.midi; });
    var nn = list.length;
    list.forEach(function (n, i) {
      var durB = Math.min(n.dur, maxB);
      if (durB <= 0.001) return;
      var tt = t + (cfgp.kind === "guitar" && nn >= 3 ? i * 0.012 : 0), dur = durB * spb - (cfgp.kind === "bass" ? 0.01 : 0);
      playNote(key, cfgp, n, tt, Math.max(0.03, dur), nn);
    });
  }

  /* ================================================================ scheduler */
  function lowerBound(arr, pos) {
    var lo = 0, hi = arr.length;
    while (lo < hi) { var m = (lo + hi) >> 1; if (arr[m].pos < pos - 1e-7) lo = m + 1; else hi = m; }
    return lo;
  }
  function limitFor(pos) {
    var L = loopRange();
    if (L && pos < L.end - 1e-6) return L.end;
    return S.tl.total;
  }
  function mkSeg(t, pos, speed, refPos, auto) {
    var rp = refPos == null ? pos : refPos, bpm = S.tl.writtenAt(rp) * speed;
    return { t: t, pos: pos, spb: 60 / bpm, bpm: bpm, speed: speed, next: S.tl.nextTempoPos(rp), auto: !!auto };
  }
  function timeOf(seg, pos) { return seg.t + (pos - seg.pos) * seg.spb; }
  function posAtTime(t) {
    var segs = E.segs, s = segs[0];
    for (var i = segs.length - 1; i >= 0; i--) if (segs[i].t <= t) { s = segs[i]; break; }
    return { pos: s.pos + (t - s.t) / s.spb, seg: s };
  }
  function scheduleRange(a, b, seg, limit) {
    var tl = S.tl, P = S.prefs, spb = seg.spb, i;
    if (E.ciActive) {
      var g = E.gate, hi = Math.min(b, g);
      for (i = 0; i < E.ciClicks.length; i++) { var c = E.ciClicks[i]; if (c.pos >= a - 1e-7 && c.pos < hi - 1e-7) playClick(c.accent, timeOf(seg, c.pos)); }
      if (b > g - 1e-9) { E.ciActive = false; a = Math.max(a, g); } else return;
    }
    if (P.click) {
      for (i = lowerBound(tl.clicks, a); i < tl.clicks.length && tl.clicks[i].pos < b - 1e-7; i++) playClick(tl.clicks[i].accent, timeOf(seg, tl.clicks[i].pos));
    }
    var parts = tl.parts;
    for (var pi = 0; pi < parts.length; pi++) {
      var p = parts[pi], c2 = E.cfg.parts[p.key];
      if (!c2 || c2.on === false || !c2.sound || c2.sound === "off") continue;
      var cfgp = { sound: c2.sound, kind: c2.kind || p.instrument }, list = tl.partEvents[p.key];
      for (i = eventIndexAt(list, a); i < list.length && list[i].start < b - 1e-7; i++) {
        var ev = list[i];
        playEventNotes(p.key, cfgp, ev, timeOf(seg, ev.start) + ev.shift * spb, spb, limit);
      }
    }
  }
  function tick() {
    if (!E.running || !E.ctx) return;
    var ctx = E.ctx, now = ctx.currentTime, hz = now + HORIZON, tl = S.tl;
    E.ticks++;
    if (E.voices.length > 60) E.voices = E.voices.filter(function (v) { return v.end > now - 0.2; });
    while (E.segs.length > 2 && E.segs[1].t < now - 3) E.segs.shift();
    if (E.finished) { if (now > E.endAt + 0.05) { if (E.onEnd) E.onEnd(); } return; }
    if (ctx.state === "interrupted" || ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    for (var guard = 0; guard < 12; guard++) {
      var seg = E.segs[E.segs.length - 1];
      var endPos = seg.pos + (hz - seg.t) / seg.spb;
      var limit = limitFor(E.schedPos), upTo = Math.min(endPos, limit, seg.next);
      if (upTo > E.schedPos + 1e-9) { scheduleRange(E.schedPos, upTo, seg, limit); E.schedPos = upTo; }
      if (E.schedPos >= seg.next - 1e-9 && seg.next < limit - 1e-9) {
        // a written tempo change: continue on a new anchor at the same speed
        E.segs.push(mkSeg(timeOf(seg, seg.next), seg.next, seg.speed, seg.next));
        continue;
      }
      if (endPos < limit - 1e-9) break;
      var tw = timeOf(seg, limit), L = loopRange();
      if (L && Math.abs(limit - L.end) < 1e-6) {
        var sp = seg.speed, step = (S.prefs.speedUp || 0) / 100, target = (S.prefs.speedTarget || 100) / 100;
        if (step > 0 && sp < target - 1e-9) sp = Math.min(target, Math.round((sp + step) * 1000) / 1000);
        E.segs.push(mkSeg(tw, L.start, sp, L.start, step > 0));
        E.schedPos = L.start;
      } else { E.finished = true; E.endAt = tw; break; }
    }
  }
  function timerStart() {
    timerStop();
    try {
      var src = "var i=setInterval(function(){postMessage(0)}," + TICK_MS + ");onmessage=function(e){if(e.data==='stop'){clearInterval(i);}}";
      var url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      E.worker = new Worker(url);
      URL.revokeObjectURL(url);
      E.worker.onmessage = tick;
      E.worker.onerror = function () { if (E.worker) { try { E.worker.terminate(); } catch (e) {} E.worker = null; E.ivl = setInterval(tick, TICK_MS); } };
    } catch (e) { E.worker = null; E.ivl = setInterval(tick, TICK_MS); }
  }
  function timerStop() {
    if (E.worker) { try { E.worker.postMessage("stop"); E.worker.terminate(); } catch (e) {} E.worker = null; }
    if (E.ivl) { clearInterval(E.ivl); E.ivl = null; }
  }

  /* Starts playing from S.startPos (a count-in first if it is on). */
  function start() {
    if (E.running || E.starting) return Promise.resolve();
    E.starting = true;
    var ctx = ensureCtx();
    if (!ctx) { E.starting = false; return Promise.reject(new Error("This browser can't play sound.")); }
    prefetch();
    var ready = ctx.state === "running" ? Promise.resolve() : Promise.race([ctx.resume().catch(function () {}), new Promise(function (r) { setTimeout(r, 600); })]);
    return ready.then(function () {
      E.starting = false;
      var tl = S.tl, L = loopRange();
      var startPos = S.startPos;
      if (L && (startPos < L.start - 1e-6 || startPos >= L.end - 1e-6)) startPos = L.start;
      if (startPos >= tl.total - 1e-6) startPos = 0;
      S.startPos = startPos;
      var P = S.prefs, loc = PA.engine.locate(tl, startPos), pass = tl.passes[loc.pass];
      var ci = P.countIn ? SC.timeLen(pass.time) : 0, unit = pass.unit, speed = clamp(P.speed || 1, 0.1, 3), t0 = ctx.currentTime + 0.12;
      applyVolumes();
      E.voices = []; E.counts = {};
      E.ciBeats = ci; E.ciStart = startPos - ci; E.speed = speed;
      E.segs = [mkSeg(t0, startPos - ci, speed, startPos)];
      E.schedPos = startPos - ci; E.gate = startPos; E.ciActive = ci > 0; E.ciClicks = []; E.ciUnit = unit;
      for (var k = 0; k * unit < ci - 1e-6; k++) E.ciClicks.push({ pos: startPos - ci + k * unit, accent: k === 0 });
      E.finished = false; E.endAt = 0; E.running = true;
      timerStart(); holdWake(true);
      tick();
    });
  }
  /* Moves the playing position without a count-in. */
  function seek(pos) {
    if (!E.running || !E.ctx) return;
    var now = E.ctx.currentTime;
    E.voices.forEach(function (v) { killVoice(v, now); }); E.voices = [];
    var sp = E.segs[E.segs.length - 1].speed, t0 = now + 0.06;
    E.segs = [mkSeg(t0, pos, sp, pos)];
    E.schedPos = pos; E.ciActive = false; E.finished = false;
    tick();
  }
  function curPos() {
    if (!E.running || !E.ctx) return null;
    var lat = Math.min(0.2, (E.ctx.outputLatency || E.ctx.baseLatency || 0));
    var r = posAtTime(E.ctx.currentTime - lat);
    return { pos: r.pos, bpm: r.seg.bpm, speed: r.seg.speed, seg: r.seg, counting: r.pos < E.gate - 1e-6 && E.ciBeats > 0 && !E.finished };
  }
  function setSpeed(f) {
    if (!E.running) return;
    var seg = E.segs[E.segs.length - 1], tS = timeOf(seg, E.schedPos);
    E.speed = f;
    E.segs.push(mkSeg(tS, E.schedPos, f, E.schedPos));
  }
  function stop(soft) {
    if (!E.running) return;
    E.running = false;
    timerStop(); holdWake(false);
    if (E.ctx) {
      var now = E.ctx.currentTime;
      if (!soft) E.voices.forEach(function (v) { killVoice(v, now); });
    }
    E.voices = [];
  }

  NS.buildTimeline = buildTimeline; NS.locate = locate; NS.locateParts = locateParts; NS.firstPassOf = firstPassOf; NS.eventIndexAt = eventIndexAt;
  NS.loopRange = loopRange; NS.ensureCtx = ensureCtx; NS.configure = configure; NS.prefetch = prefetch; NS.start = start; NS.stop = stop; NS.seek = seek;
  NS.pos = curPos; NS.setSpeed = setSpeed; NS.applyVolumes = applyVolumes; NS.posAtTime = posAtTime; NS.ksSamples = ksSamples; NS.clickUnit = clickUnit;
  NS.killVoices = function () { if (E.ctx) { var now = E.ctx.currentTime; E.voices.forEach(function (v) { killVoice(v, now); }); } E.voices = []; };
})();
