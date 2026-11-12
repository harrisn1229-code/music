/* Metronome. Timing is the standard Web Audio look-ahead scheduler: a timer wakes every
   25 ms and schedules every click that falls in the next 120 ms against the audio clock.
   Visuals are driven from the scheduled times (a queue drained in requestAnimationFrame),
   never from timeouts. Everything the scheduler does is also written to window.__metroTest
   (write-only, for tests; nothing here reads it back). */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const toInt = (v, d, a, b) => { v = Math.round(Number(v)); return isFinite(v) ? clamp(v, a, b) : d; };
  const lsGet = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const fast = () => !!self.__metroFast;               // UI waits only, never audio maths

  const KEY = "metronome:prefs:v1";
  const LOOK_AHEAD = 0.12, TICK_MS = 25;
  const BPM_MIN = 20, BPM_MAX = 300;
  const SUBS = ["none", "eighth", "triplet", "sixteenth"];
  const SOUNDS = ["click", "wood", "beep", "rim"];
  const CHIPS = [[2, 4], [3, 4], [4, 4], [5, 4], [6, 8], [7, 8], [12, 8]];
  const DENS = [2, 4, 8, 16];
  const NAMES = [[60, "Largo"], [66, "Larghetto"], [76, "Adagio"], [108, "Andante"], [120, "Moderato"], [156, "Allegro"], [176, "Vivace"], [200, "Presto"], [1e9, "Prestissimo"]];
  const tempoName = (b) => { for (const n of NAMES) if (b < n[0]) return n[1]; return "Prestissimo"; };

  /* ---------- state ---------- */
  const DEF = {
    bpm: 92, num: 4, den: 4, dotted: false, levels: null, sub: "none", swing: 50, sound: "click", vol: 80,
    flash: false, vibrate: false,
    trainer: { on: false, start: 80, target: 120, step: 4, bars: 4 },
    gap: { on: false, play: 3, mute: 1 },
    timer: { on: false, mode: "min", value: 5 },
    countIn: 0, open: false, presets: []
  };
  const S = normalize(lsGet(KEY) || {});

  function normalize(p) {
    p = p && typeof p === "object" ? p : {};
    const o = JSON.parse(JSON.stringify(DEF));
    o.bpm = toInt(p.bpm, o.bpm, BPM_MIN, BPM_MAX);
    o.num = toInt(p.num, o.num, 1, 12);
    o.den = DENS.indexOf(p.den) >= 0 ? p.den : o.den;
    o.dotted = !!p.dotted;
    o.sub = SUBS.indexOf(p.sub) >= 0 ? p.sub : "none";
    o.swing = toInt(p.swing, 50, 50, 75);
    o.sound = SOUNDS.indexOf(p.sound) >= 0 ? p.sound : "click";
    o.vol = toInt(p.vol, 80, 0, 100);
    o.flash = !!p.flash; o.vibrate = !!p.vibrate; o.open = !!p.open;
    const t = p.trainer || {}, g = p.gap || {}, m = p.timer || {};
    o.trainer = { on: !!t.on, start: toInt(t.start, 80, BPM_MIN, BPM_MAX), target: toInt(t.target, 120, BPM_MIN, BPM_MAX), step: toInt(t.step, 4, 1, 100), bars: toInt(t.bars, 4, 1, 99) };
    o.gap = { on: !!g.on, play: toInt(g.play, 3, 1, 99), mute: toInt(g.mute, 1, 1, 99) };
    o.timer = { on: !!m.on, mode: m.mode === "bars" ? "bars" : "min", value: toInt(m.value, 5, 1, m.mode === "bars" ? 9999 : 999) };
    o.countIn = toInt(p.countIn, 0, 0, 2);
    const nb = o.dotted && o.den === 8 && o.num % 3 === 0 ? o.num / 3 : o.num;
    o.levels = Array.isArray(p.levels) && p.levels.length === nb ? p.levels.map((x) => toInt(x, 1, 0, 2)) : defaultLevels(o.num, o.den, o.dotted);
    o.presets = Array.isArray(p.presets) ? p.presets.filter((x) => x && typeof x.name === "string" && x.setup).slice(0, 60) : [];
    return o;
  }
  function dottedOk(num, den) { return den === 8 && num % 3 === 0; }
  const isDotted = () => S.dotted && dottedOk(S.num, S.den);
  const beatsPerBar = () => (isDotted() ? S.num / 3 : S.num);
  function defaultLevels(num, den, dotted) {
    const ok = dottedOk(num, den), dot = dotted && ok;
    const nb = dot ? num / 3 : num, lv = new Array(nb).fill(1);
    lv[0] = 2;
    if (ok && !dot) for (let i = 3; i < nb; i += 3) lv[i] = 2;   // eighth beats in 6/8, 9/8, 12/8: accent each group of three
    return lv;
  }
  const save = () => lsSet(KEY, S);
  const sigText = () => S.num + "/" + S.den + (isDotted() ? " ♩." : "");
  const SETUP_KEYS = ["bpm", "num", "den", "dotted", "levels", "sub", "swing", "sound", "flash", "vibrate", "trainer", "gap", "timer", "countIn"];

  /* ---------- test hook (written only) ---------- */
  const T = window.__metroTest = { ticks: [], bpm: S.bpm, running: false, timers: 0, clock: () => (ctx ? ctx.currentTime : 0) };

  /* ---------- audio ---------- */
  let ctx = null, master = null, noiseBuf = null;
  function ensureCtx() {
    try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC({ latencyHint: "interactive" });
      master = ctx.createGain();
      master.gain.value = volGain();
      master.connect(ctx.destination);
    }
    return ctx;
  }
  const volGain = () => (S.vol / 100) * (S.vol / 100);
  function getNoise() {
    if (!noiseBuf) {
      const len = Math.floor(ctx.sampleRate * 0.12);
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }
  function env(g, t, peak, att, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(Math.max(peak, 0.0002), t + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function tone(dest, type, f, t, dur, peak, att, f2) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur * 0.6);
    env(g, t, peak, att, dur);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function hiss(dest, t, dur, peak, type, freq, q) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = getNoise(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    env(g, t, peak, 0.0008, dur);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t, Math.random() * 0.02, dur + 0.02);
  }
  // lvl: 0 accent, 1 normal, 2 subdivision
  function voice(dest, t, lvl) {
    const a = [1, 0.72, 0.4][lvl];
    switch (S.sound) {
      case "wood": {
        const f = [1250, 900, 720][lvl];
        tone(dest, "sine", f, t, 0.09, a, 0.001, f * 0.85);
        tone(dest, "sine", f * 2.4, t, 0.035, 0.35 * a, 0.001);
        hiss(dest, t, 0.008, 0.25 * a, "bandpass", 2800, 2);
        break;
      }
      case "beep": tone(dest, "sine", [1568, 1046, 784][lvl], t, 0.075, 0.8 * a, 0.003); break;
      case "rim":
        hiss(dest, t, 0.03, 0.9 * a, "highpass", [5500, 4600, 3800][lvl], 0.7);
        tone(dest, "sine", [3000, 2400, 1900][lvl], t, 0.014, 0.4 * a, 0.0008);
        break;
      default:
        tone(dest, "sine", [2400, 1700, 1200][lvl], t, 0.03, 0.9 * a, 0.001);
        hiss(dest, t, 0.012, 0.6 * a, "bandpass", [4200, 3200, 2600][lvl], 1.2);
    }
  }

  /* ---------- scheduler ---------- */
  let running = false, run = null, worker = null, ivl = null, queue = [], runGain = null, starting = false;
  const subCount = () => {
    const d = isDotted();
    return S.sub === "eighth" ? (d ? 3 : 2) : S.sub === "triplet" ? 3 : S.sub === "sixteenth" ? (d ? 6 : 4) : 1;
  };
  const subOff = (i) => (run.subN === 2 && !isDotted() ? (i ? run.swing / 100 : 0) : i / run.subN);

  function trainerSteps() {
    const t = S.trainer, d = Math.abs(t.target - t.start);
    return Math.ceil(d / t.step) + 1;
  }
  // Decide what the bar that starts at run.beatStart is. Runs before the bar's first beat length is fixed.
  function startBar() {
    const info = { cin: 0, mb: -1, muted: false, bpmChange: false, step: -1 };
    if (run.bar < run.cinBars) {
      info.cin = run.bar + 1;
    } else {
      const k = run.bar - run.cinBars;
      info.mb = k;
      if (k === 0) { run.musicT0 = run.beatStart; }
      if (S.timer.on) {
        const over = S.timer.mode === "bars" ? k >= S.timer.value : run.beatStart - run.musicT0 >= S.timer.value * 60 - 1e-6;
        if (over) { run.ended = true; queue.push({ end: true, time: run.beatStart }); return; }
      }
      if (S.trainer.on) {
        const tr = S.trainer;
        if (k === 0) { S.bpm = tr.start; info.bpmChange = true; }
        else if (k % tr.bars === 0) {
          const dir = tr.target >= S.bpm ? 1 : -1, nxt = S.bpm + dir * tr.step;
          const capped = dir > 0 ? Math.min(tr.target, nxt) : Math.max(tr.target, nxt);
          if (capped !== S.bpm) { S.bpm = capped; info.bpmChange = true; }
        }
        info.step = Math.min(Math.floor(k / tr.bars), trainerSteps() - 1);
        T.bpm = S.bpm;
      }
      if (S.gap.on) info.muted = k % (S.gap.play + S.gap.mute) >= S.gap.play;
    }
    run.info = info;
  }
  function beginBeat() {
    run.beatDur = 60 / S.bpm;
    run.subN = subCount();
    run.swing = S.swing;
  }
  function advance() {
    run.sub++;
    if (run.sub < run.subN) { run.nextT = run.beatStart + subOff(run.sub) * run.beatDur; return; }
    run.sub = 0; run.beat++;
    run.beatStart += run.beatDur;
    if (run.beat >= beatsPerBar()) { run.beat = 0; run.bar++; startBar(); }
    if (run.ended) return;
    beginBeat();
    run.nextT = run.beatStart;
  }
  function emit(t, now) {
    const lv = S.levels[run.beat] == null ? 1 : S.levels[run.beat], info = run.info;
    let kind;
    if (info.muted) kind = "gap";
    else if (lv === 0) kind = "mute";
    else kind = run.sub === 0 ? (lv === 2 ? "accent" : "normal") : "sub";
    const late = t < now - 0.03;                         // page was away: keep counting, do not play stale clicks
    if (!late && (kind === "accent" || kind === "normal" || kind === "sub")) voice(runGain, t, kind === "accent" ? 0 : kind === "normal" ? 1 : 2);
    const rec = { t: t, bar: run.bar, beat: run.beat, sub: run.sub, kind: kind, mb: info.mb, cin: info.cin, bpm: S.bpm };
    if (late) rec.late = true;
    T.ticks.push(rec);
    if (T.ticks.length > 20000) T.ticks.splice(0, 5000);
    queue.push({ time: t, beat: run.beat, sub: run.sub, kind: kind, bar: run.bar, info: info, bpm: S.bpm, level: lv });
  }
  function schedule() {
    if (!running || !run || run.ended) { drain(); return; }
    const now = ctx.currentTime;
    while (run.nextT < now + LOOK_AHEAD && !run.ended) { emit(run.nextT, now); advance(); }
    drain();
  }
  function timerStart() {
    timerStop();
    try {
      const src = "var i=setInterval(function(){postMessage(0)}," + TICK_MS + ");onmessage=function(e){if(e.data==='stop'){clearInterval(i);}}";
      const url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      worker = new Worker(url);
      URL.revokeObjectURL(url);
      worker.onmessage = schedule;
      worker.onerror = () => { if (worker) { try { worker.terminate(); } catch (e) {} worker = null; ivl = setInterval(schedule, TICK_MS); T.timers = 1; } };
    } catch (e) { worker = null; ivl = setInterval(schedule, TICK_MS); }
    T.timers = 1;
  }
  function timerStop() {
    if (worker) { try { worker.postMessage("stop"); worker.terminate(); } catch (e) {} worker = null; }
    if (ivl) { clearInterval(ivl); ivl = null; }
    T.timers = 0;
  }

  async function start() {
    if (running || starting) return;
    starting = true;
    ensureCtx();
    try {
      if (ctx.state !== "running") await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 600))]);
    } catch (e) {}
    starting = false;
    master.gain.value = volGain();
    runGain = ctx.createGain();
    runGain.connect(master);
    running = true; T.running = true;
    queue = []; T.ticks.length = 0;
    const t0 = ctx.currentTime + 0.1;
    run = { nextT: t0, beatStart: t0, beatDur: 0, bar: 0, beat: 0, sub: 0, subN: 1, swing: 50, cinBars: S.countIn, musicT0: t0, ended: false, info: null, t0: t0 };
    startBar();
    if (!run.ended) { beginBeat(); }
    showRunning();
    lockScreen();
    timerStart();
    schedule();
    raf();
  }
  function stop() {
    if (!running && !starting) return;
    running = false; T.running = false; starting = false;
    timerStop();
    if (runGain) {
      const g = runGain; runGain = null;
      try { g.gain.cancelScheduledValues(ctx.currentTime); g.gain.setTargetAtTime(0, ctx.currentTime, 0.008); } catch (e) {}
      setTimeout(() => { try { g.disconnect(); } catch (e) {} }, 150);
    }
    queue = []; run = null; curBeat = -1;
    releaseScreen();
    showIdle();
  }

  /* ---------- visuals: drain the queue of scheduled events ---------- */
  let curBeat = -1, rafId = 0, lastInfo = null, flashT = 0;
  function drain() {
    if (!ctx || !run) return;
    const lat = Math.min(0.2, ctx.outputLatency || 0);
    const now = ctx.currentTime - lat;
    let last = null;
    while (queue.length && queue[0].time <= now) {
      const q = queue.shift();
      if (q.end) { stop(); return; }
      if (q.info.bpmChange && q.sub === 0 && q.beat === 0) setBpm(q.bpm, { engine: true });
      if (q.sub === 0 && now - q.time < 0.15 && q.kind !== "mute" && q.kind !== "gap") {
        if (S.vibrate && navigator.vibrate && !document.hidden) { try { navigator.vibrate(q.beat === 0 ? 30 : 15); } catch (e) {} }
        if (S.flash && q.beat === 0 && !document.hidden) pulseFlash();
      }
      last = q;
    }
    if (last) render(last);
  }
  function pulseFlash() {
    const f = $("flash"); f.classList.add("on");
    clearTimeout(flashT); flashT = setTimeout(() => f.classList.remove("on"), 90);
  }
  const beatsEl = $("beats"), statusEl = $("status");
  function render(q) {
    lastInfo = q.info;
    if (q.beat !== curBeat) {
      const prev = beatsEl.children[curBeat]; if (prev) prev.classList.remove("on");
      const el = beatsEl.children[q.beat];
      if (el) { el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); }
      curBeat = q.beat;
    } else if (q.sub === 0 && q.beat === 0 && beatsEl.children.length === 1) {
      const el = beatsEl.children[0]; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on");
    }
    beatsEl.classList.toggle("gap", !!q.info.muted);
    beatsEl.dataset.cur = q.beat;
    updateStatus();
  }
  const mmss = (s) => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  function updateStatus() {
    if (!running || !lastInfo || !run) { return; }
    const i = lastInfo, parts = [];
    if (i.cin) parts.push("Count-in " + i.cin + "/" + run.cinBars);
    else {
      parts.push("Bar " + (i.mb + 1) + (S.timer.on && S.timer.mode === "bars" ? " / " + S.timer.value : ""));
      const el = ctx.currentTime - run.musicT0;
      parts.push(mmss(el) + (S.timer.on && S.timer.mode === "min" ? " / " + S.timer.value + ":00" : ""));
      if (S.trainer.on && i.step >= 0) parts.push("Step " + (i.step + 1) + "/" + trainerSteps());
      if (i.muted) parts.push("Silent");
    }
    const txt = parts.join(" · ");
    if (statusEl.textContent !== txt) statusEl.textContent = txt;
  }
  function raf() {
    cancelAnimationFrame(rafId);
    const loop = () => { if (!running) return; drain(); updateStatus(); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- wake lock ---------- */
  let wl = null;
  async function lockScreen() {
    try {
      if ("wakeLock" in navigator && !wl && !document.hidden) {
        wl = await navigator.wakeLock.request("screen");
        wl.addEventListener("release", () => { wl = null; });
      }
    } catch (e) { wl = null; }
  }
  function releaseScreen() { try { if (wl) wl.release(); } catch (e) {} wl = null; }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && running) {
      lockScreen();
      try { if (ctx && ctx.state !== "running") ctx.resume(); } catch (e) {}
      drain(); updateStatus(); raf();
    }
  });

  /* ---------- tempo ---------- */
  const numEl = $("bpm-num"), inEl = $("bpm-in"), rangeEl = $("bpm-range");
  function setBpm(v, opt) {
    v = clamp(Math.round(Number(v) || S.bpm), BPM_MIN, BPM_MAX);
    S.bpm = v; T.bpm = v;
    numEl.textContent = v; rangeEl.value = v; $("bpm-name").textContent = tempoName(v);
    if (!(opt && opt.engine)) save();
    if (window.MusicAssistant && MusicAssistant.refresh) { /* context is read on demand */ }
  }
  function nudge(d) { setBpm(S.bpm + d); }

  function holdRepeat(btn, dir) {
    let t1 = 0, t2 = 0, held = false;
    const stopH = () => { clearTimeout(t1); clearInterval(t2); t1 = t2 = 0; };
    btn.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      held = true; nudge(dir); stopH();
      t1 = setTimeout(() => { t2 = setInterval(() => nudge(dir), fast() ? 8 : 70); }, fast() ? 40 : 420);
    });
    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((n) => btn.addEventListener(n, stopH));
    btn.addEventListener("click", (e) => { if (e.detail === 0) nudge(dir); });   // keyboard
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  holdRepeat($("bpm-dec"), -1); holdRepeat($("bpm-inc"), 1);
  rangeEl.addEventListener("input", () => setBpm(rangeEl.value));
  $("bpm-half").addEventListener("click", () => setBpm(S.bpm / 2));
  $("bpm-dbl").addEventListener("click", () => setBpm(S.bpm * 2));

  numEl.addEventListener("click", () => {
    numEl.hidden = true; inEl.hidden = false; inEl.value = S.bpm; inEl.focus(); inEl.select();
  });
  function commitIn() {
    if (inEl.hidden) return;
    const raw = inEl.value.trim();
    inEl.hidden = true; numEl.hidden = false;
    if (raw !== "" && isFinite(Number(raw))) setBpm(Number(raw));
  }
  inEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitIn(); numEl.focus(); }
    else if (e.key === "Escape") { inEl.value = ""; commitIn(); numEl.focus(); }
  });
  inEl.addEventListener("input", () => { inEl.value = inEl.value.replace(/\D/g, ""); });
  inEl.addEventListener("blur", commitIn);

  let taps = [];
  $("tap").addEventListener("click", () => {
    const now = performance.now();
    if (taps.length && now - taps[taps.length - 1] > 2000) taps = [];
    taps.push(now); taps = taps.slice(-6);
    if (taps.length >= 2) setBpm(60000 / ((taps[taps.length - 1] - taps[0]) / (taps.length - 1)));
  });

  /* ---------- start / stop, keyboard ---------- */
  const goBtn = $("go");
  function toggle() { running || starting ? stop() : start(); }
  goBtn.addEventListener("click", (e) => { if (e.detail === 0 && kbSpace) return; toggle(); });
  let kbSpace = false;
  function showRunning() {
    goBtn.setAttribute("aria-pressed", "true"); $("go-t").textContent = "Stop";
    $("go-ic").setAttribute("d", "M5 5h10v10H5z");
    statusEl.textContent = " ";
  }
  function showIdle() {
    goBtn.setAttribute("aria-pressed", "false"); $("go-t").textContent = "Start";
    $("go-ic").setAttribute("d", "M6 3.500v13l11-6.500z");
    Array.prototype.forEach.call(beatsEl.children, (c) => c.classList.remove("on"));
    beatsEl.classList.remove("gap"); delete beatsEl.dataset.cur;
    statusEl.textContent = " "; $("flash").classList.remove("on");
  }
  const isTyping = (t) => t && (t.tagName === "TEXTAREA" || t.tagName === "SELECT" || (t.tagName === "INPUT" && t.type !== "range" && t.type !== "checkbox"));
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (isTyping(t)) return;
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      if (!e.repeat) { kbSpace = true; toggle(); }
      return;
    }
    const arrows = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 };
    if (arrows[e.key]) {
      if (t && t.tagName === "INPUT" && t.type === "range" && t !== rangeEl) return;
      e.preventDefault();
      nudge(arrows[e.key] * (e.shiftKey ? 5 : 1));
    }
  });
  document.addEventListener("keyup", (e) => {
    if ((e.key === " " || e.code === "Space") && !isTyping(e.target)) { e.preventDefault(); setTimeout(() => { kbSpace = false; }, 0); }
  });

  /* ---------- time signature ---------- */
  function setSig(num, den, dotted) {
    S.num = clamp(num, 1, 12); S.den = den;
    S.dotted = dottedOk(S.num, S.den) ? !!dotted : false;
    S.levels = defaultLevels(S.num, S.den, S.dotted);
    save(); renderSig(); renderBeats();
  }
  function renderSig() {
    $("num-out").textContent = S.num; $("sig-out").textContent = sigText();
    Array.prototype.forEach.call($("sig-chips").children, (c) => c.setAttribute("aria-pressed", String(+c.dataset.n === S.num && +c.dataset.d === S.den && !isDotted())));
    Array.prototype.forEach.call($("den-seg").children, (c) => c.setAttribute("aria-checked", String(+c.dataset.d === S.den)));
    const ok = dottedOk(S.num, S.den);
    $("dotted-pick").hidden = !ok;
    Array.prototype.forEach.call($("dotted-seg").children, (c) => c.setAttribute("aria-checked", String((c.dataset.dotted === "1") === isDotted())));
    renderSub();
  }
  $("sig-chips").innerHTML = CHIPS.map((c) => '<button class="chip" type="button" data-n="' + c[0] + '" data-d="' + c[1] + '" aria-pressed="false">' + c[0] + "/" + c[1] + "</button>").join("");
  $("sig-chips").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) setSig(+b.dataset.n, +b.dataset.d, false); });
  $("den-seg").innerHTML = DENS.map((d) => '<button class="chip" type="button" role="radio" data-d="' + d + '">' + d + "</button>").join("");
  $("den-seg").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) setSig(S.num, +b.dataset.d, S.dotted); });
  $("num-dec").addEventListener("click", () => setSig(S.num - 1, S.den, S.dotted));
  $("num-inc").addEventListener("click", () => setSig(S.num + 1, S.den, S.dotted));
  $("dotted-seg").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) setSig(S.num, S.den, b.dataset.dotted === "1"); });

  /* ---------- beat row ---------- */
  const LV = ["Muted", "Normal", "Accent"];
  function renderBeats() {
    const nb = beatsPerBar();
    beatsEl.style.setProperty("--cols", nb <= 6 ? nb : Math.ceil(nb / 2));
    beatsEl.innerHTML = "";
    for (let i = 0; i < nb; i++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "dot"; b.dataset.i = i;
      b.innerHTML = '<span class="dot-i">' + (i + 1) + "</span>";
      beatsEl.appendChild(b); paintDot(i);
    }
    if (running && curBeat >= 0 && beatsEl.children[curBeat]) beatsEl.children[curBeat].classList.add("on");
  }
  function paintDot(i) {
    const b = beatsEl.children[i]; if (!b) return;
    const lv = S.levels[i] == null ? 1 : S.levels[i];
    b.className = "dot l" + lv + (b.classList.contains("on") ? " on" : "");
    b.setAttribute("aria-label", "Beat " + (i + 1) + ", " + LV[lv].toLowerCase());
  }
  beatsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".dot"); if (!b) return;
    const i = +b.dataset.i, lv = S.levels[i] == null ? 1 : S.levels[i];
    S.levels[i] = lv === 2 ? 1 : lv === 1 ? 0 : 2;      // accent -> normal -> muted -> accent
    paintDot(i); save();
  });

  /* ---------- subdivision, sound, switches ---------- */
  function radios(seg, attr, val) {
    Array.prototype.forEach.call(seg.children, (c) => c.setAttribute("aria-checked", String(c.dataset[attr] === String(val))));
  }
  function renderSub() {
    radios($("sub-seg"), "sub", S.sub);
    $("sub-triplet").hidden = isDotted();
    if (isDotted() && S.sub === "triplet") { S.sub = "eighth"; radios($("sub-seg"), "sub", S.sub); }
    $("swing-pick").hidden = !(S.sub === "eighth" && !isDotted());
    $("swing").value = S.swing; $("swing-out").textContent = S.swing + "%";
    const sw = S.swing; if (sw === 50) $("swing-out").textContent = "50% straight";
  }
  $("sub-seg").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { S.sub = b.dataset.sub; save(); renderSub(); } });
  $("swing").addEventListener("input", () => { S.swing = toInt($("swing").value, 50, 50, 75); save(); renderSub(); });

  $("sound-seg").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    S.sound = b.dataset.sound; save(); radios($("sound-seg"), "sound", S.sound);
    // audition the sound (only once the audio context exists, i.e. after a tap)
    if (ctx && ctx.state === "running" && !running) { const g = ctx.createGain(); g.connect(master); voice(g, ctx.currentTime + 0.02, 0); setTimeout(() => g.disconnect(), 400); }
  });
  $("vol").addEventListener("input", () => {
    S.vol = toInt($("vol").value, 80, 0, 100); $("vol-out").textContent = S.vol + "%";
    if (master) master.gain.value = volGain();
    save();
  });
  function setSwitch(id, on) { $(id).setAttribute("aria-checked", String(!!on)); }
  function bindSwitch(id, get, set) {
    $(id).addEventListener("click", () => { const v = !get(); set(v); setSwitch(id, v); save(); renderPractice(); });
  }
  bindSwitch("sw-flash", () => S.flash, (v) => { S.flash = v; });
  bindSwitch("sw-vib", () => S.vibrate, (v) => { S.vibrate = v; });
  bindSwitch("sw-trainer", () => S.trainer.on, (v) => { S.trainer.on = v; });
  bindSwitch("sw-gap", () => S.gap.on, (v) => { S.gap.on = v; });
  bindSwitch("sw-timer", () => S.timer.on, (v) => { S.timer.on = v; });
  if (!navigator.vibrate) $("vib-row").hidden = true;

  /* ---------- practice ---------- */
  const NUM_FIELDS = [
    ["tr-start", () => S.trainer.start, (v) => { S.trainer.start = v; }, BPM_MIN, BPM_MAX],
    ["tr-target", () => S.trainer.target, (v) => { S.trainer.target = v; }, BPM_MIN, BPM_MAX],
    ["tr-step", () => S.trainer.step, (v) => { S.trainer.step = v; }, 1, 100],
    ["tr-bars", () => S.trainer.bars, (v) => { S.trainer.bars = v; }, 1, 99],
    ["gap-play", () => S.gap.play, (v) => { S.gap.play = v; }, 1, 99],
    ["gap-mute", () => S.gap.mute, (v) => { S.gap.mute = v; }, 1, 99]
  ];
  NUM_FIELDS.forEach((f) => $(f[0]).addEventListener("change", () => { f[2](toInt($(f[0]).value, f[1](), f[3], f[4])); $(f[0]).value = f[1](); save(); }));
  $("tm-value").addEventListener("change", () => { S.timer.value = toInt($("tm-value").value, S.timer.value, 1, S.timer.mode === "bars" ? 9999 : 999); $("tm-value").value = S.timer.value; save(); });
  $("tm-mode").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    S.timer.mode = b.dataset.mode; S.timer.value = clamp(S.timer.value, 1, S.timer.mode === "bars" ? 9999 : 999); save(); renderPractice();
  });
  $("cin-seg").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (b) { S.countIn = +b.dataset.cin; save(); renderPractice(); } });
  const toggleEl = $("prac-toggle");
  toggleEl.addEventListener("click", () => { S.open = !S.open; save(); renderPractice(); });
  function renderPractice() {
    toggleEl.setAttribute("aria-expanded", String(S.open)); $("prac-body").hidden = !S.open;
    ["trainer", "gap", "timer"].forEach((k) => { setSwitch("sw-" + k, S[k].on); $("f-" + k).hidden = !S[k].on; });
    NUM_FIELDS.forEach((f) => { $(f[0]).value = f[1](); });
    radios($("tm-mode"), "mode", S.timer.mode);
    $("tm-label").textContent = S.timer.mode === "bars" ? "Bars" : "Minutes";
    $("tm-value").value = S.timer.value; $("tm-value").max = S.timer.mode === "bars" ? 9999 : 999;
    radios($("cin-seg"), "cin", S.countIn);
  }

  /* ---------- presets ---------- */
  const listEl = $("preset-list");
  let armed = -1, armT = 0;
  function summary(s) {
    const d = s.dotted && dottedOk(s.num, s.den);
    return s.bpm + " · " + s.num + "/" + s.den + (d ? " ♩." : "") + (s.sub !== "none" ? " · " + s.sub : "") + (s.trainer.on ? " · trainer" : "") + (s.gap.on ? " · gap" : "");
  }
  function renderPresets() {
    listEl.innerHTML = "";
    S.presets.forEach((p, i) => {
      const li = document.createElement("li");
      const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      li.innerHTML = '<div class="p-name"><b>' + esc(p.name) + "</b><small>" + esc(summary(p.setup)) + '</small></div>' +
        '<button class="btn" type="button" data-act="load" data-i="' + i + '">Load</button>' +
        '<button class="btn' + (armed === i ? " danger" : "") + '" type="button" data-act="del" data-i="' + i + '" aria-label="Delete ' + esc(p.name) + '">' + (armed === i ? "Delete?" : "Delete") + "</button>";
      listEl.appendChild(li);
    });
  }
  function snapshot() { const o = {}; SETUP_KEYS.forEach((k) => { o[k] = JSON.parse(JSON.stringify(S[k])); }); return o; }
  $("preset-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = $("preset-name");
    const name = inp.value.trim() || (S.bpm + " BPM " + S.num + "/" + S.den);
    const setup = snapshot(), i = S.presets.findIndex((p) => p.name === name);
    if (i >= 0) S.presets[i] = { name: name, setup: setup }; else S.presets.push({ name: name, setup: setup });
    inp.value = ""; save(); renderPresets();
  });
  listEl.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const i = +b.dataset.i;
    if (b.dataset.act === "load") { loadPreset(S.presets[i]); armed = -1; renderPresets(); return; }
    if (armed === i) { clearTimeout(armT); armed = -1; S.presets.splice(i, 1); save(); renderPresets(); return; }
    armed = i; renderPresets(); clearTimeout(armT);
    armT = setTimeout(() => { armed = -1; renderPresets(); }, fast() ? 300 : 3000);
  });
  function loadPreset(p) {
    if (!p) return;
    const n = normalize(Object.assign({}, p.setup, { vol: S.vol, open: S.open, presets: [] }));
    SETUP_KEYS.forEach((k) => { S[k] = n[k]; });
    save(); renderAll();
  }

  /* ---------- assistant ---------- */
  if (window.MusicAssistant) MusicAssistant.mount({
    app: "metronome", button: $("ai-btn"),
    context: () => {
      const bits = ["Metronome: " + S.bpm + " BPM (" + tempoName(S.bpm) + "), " + sigText(), running ? "playing" : "stopped", "sound " + S.sound];
      if (S.sub !== "none") bits.push("subdivision " + S.sub + (S.sub === "eighth" && S.swing > 50 ? " swing " + S.swing + "%" : ""));
      if (S.trainer.on) bits.push("speed trainer " + S.trainer.start + " to " + S.trainer.target + " by " + S.trainer.step + " every " + S.trainer.bars + " bars");
      if (S.gap.on) bits.push("gap click " + S.gap.play + " bars on, " + S.gap.mute + " off");
      if (S.timer.on) bits.push("timer " + S.timer.value + (S.timer.mode === "bars" ? " bars" : " min"));
      return bits.join(", ") + ".";
    }
  });

  /* ---------- init ---------- */
  function renderAll() {
    setBpm(S.bpm, { engine: true });
    radios($("sound-seg"), "sound", S.sound);
    $("vol").value = S.vol; $("vol-out").textContent = S.vol + "%";
    setSwitch("sw-flash", S.flash); setSwitch("sw-vib", S.vibrate);
    renderSig(); renderBeats(); renderPractice(); renderPresets();
  }
  renderAll();
})();
