/* Ear Training: scale degrees over a tonic drone.
   Everything is synthesized in the browser (Web Audio); nothing is downloaded.
   Addresses:
     #/                         front page
     #/degrees                  levels      #/degrees/play/<path>/<n>    #/degrees/practice/<path>/<n>
     #/melodies                 setup       #/melodies/play/<difficulty>/<set>
     #/sing  #/hands-free  #/free
     #/custom                   builder     #/custom/play
     #/stats  #/settings
   Every exercise answers on the degree clock (12 degrees in circle-of-fifths order). The clock's
   animation is driven from the same calls that schedule the audio (see show()).
   Test hook: window.__earTest records what was scheduled (written only, never read here).
   self.__earTimeScale (a number, set before load) shortens the waits so a headless test is quick. */

/* ---------- pitch detection (YIN) ----------
   Pure: a buffer of samples and its sample rate in, a frequency in Hz (or null) out. */
function detectPitch(buf, sampleRate) {
  var n = buf ? buf.length : 0;
  if (!n || !sampleRate) return null;
  var sum = 0, i;
  for (i = 0; i < n; i++) sum += buf[i] * buf[i];
  if (Math.sqrt(sum / n) < 0.01) return null;               // too quiet to be a voice
  var minTau = Math.max(2, Math.floor(sampleRate / 1100));
  var maxTau = Math.min(Math.floor(sampleRate / 65), n >> 1);
  var W = Math.min(n - maxTau, 1536);
  if (W < 200 || maxTau <= minTau + 2) return null;
  var d = new Float32Array(maxTau + 2), c = new Float32Array(maxTau + 2), tau, j, s, diff;
  for (tau = 1; tau <= maxTau; tau++) {
    s = 0;
    for (j = 0; j < W; j++) { diff = buf[j] - buf[j + tau]; s += diff * diff; }
    d[tau] = s;
  }
  c[0] = 1;
  var run = 0;
  for (tau = 1; tau <= maxTau; tau++) { run += d[tau]; c[tau] = run > 0 ? d[tau] * tau / run : 1; }
  var found = -1;
  for (tau = minTau; tau < maxTau; tau++) {
    if (c[tau] < 0.15) {
      while (tau + 1 < maxTau && c[tau + 1] < c[tau]) tau++;
      found = tau; break;
    }
  }
  if (found < 0) return null;
  var a = c[found - 1], b = c[found], g = c[found + 1], den = a - 2 * b + g, shift = den ? (a - g) / (2 * den) : 0;
  if (!isFinite(shift) || Math.abs(shift) > 1) shift = 0;
  return sampleRate / (found + shift);
}

(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); };
  var view = $("view");
  var TS = (typeof self.__earTimeScale === "number" && self.__earTimeScale > 0) ? self.__earTimeScale : 1;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms * TS); }); };
  var rnd = function (n) { return Math.floor(Math.random() * n); };
  var pick = function (a) { return a[rnd(a.length)]; };

  /* ---------- test hook (written only) ---------- */
  var T = window.__earTest = { key: null, keyName: "", drone: false, notes: [], last: [], expected: [], cadences: 0, played: 0, spoken: [], screen: "", phase: "", sing: null, wake: false, vis: [], events: [], sched: [] };

  /* ---------- the material ---------- */
  var DEG = [["1", "do", "one"], ["♭2", "ra", "flat two"], ["2", "re", "two"], ["♭3", "me", "flat three"], ["3", "mi", "three"], ["4", "fa", "four"],
    ["♯4", "fi", "sharp four"], ["5", "sol", "five"], ["♭6", "le", "flat six"], ["6", "la", "six"], ["♭7", "te", "flat seven"], ["7", "ti", "seven"]];
  var KEYNAMES = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  var MAJ = [0, 2, 4, 5, 7, 9, 11], MIN = [0, 2, 3, 5, 7, 8, 10], ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var sorted = function (a) { return a.slice().sort(function (x, y) { return x - y; }); };
  var plus = function (a, n) { return sorted(a.concat([n])); };
  var CHROM1 = plus(MAJ, 3), CHROM2 = plus(CHROM1, 10), CHROM3 = plus(CHROM2, 8), CHROM4 = plus(CHROM3, 6);
  var PATHS = {
    major: [{ set: [0, 7] }, { set: [0, 4, 7] }, { set: [0, 2, 4, 7] }, { set: [0, 2, 4, 5, 7] }, { set: [0, 2, 4, 5, 7, 9] }, { set: MAJ }, { set: MAJ, oct: 2 }],
    minor: [{ set: [0, 7] }, { set: [0, 3, 7] }, { set: [0, 3, 7, 10] }, { set: [0, 3, 5, 7, 10] }, { set: [0, 2, 3, 5, 7, 10] }, { set: MIN }, { set: MIN, oct: 2 }],
    chromatic: [{ set: CHROM1 }, { set: CHROM2 }, { set: CHROM3 }, { set: CHROM4 }, { set: ALL }, { set: ALL, oct: 2 }]
  };
  var PATH_NAMES = { major: "Major", minor: "Minor", chromatic: "Chromatic" };
  var SETS = { major: MAJ, minor: MIN, chromatic: ALL };
  /* Degree colours: 1 / 3 / 5 / 7 are Library's root orange, blue, green and red (its dark set).
     The altered degrees are a ring of the hue they alter. Order is by semitone, 0..11. */
  var DCOL = ["#FF9F4A", "#C98A2B", "#F2CB4B", "#6E7FF5", "#71A5FF", "#3FC8D0", "#E24DB8", "#52CC88", "#B35FC4", "#B58CFF", "#E8455F", "#FF7070"];
  var DRING = [false, true, false, true, false, false, true, false, true, false, true, false];
  var CLOCK_ORDER = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];     // 1 5 2 6 3 7 #4 b2 b6 b3 b7 4, clockwise from the top
  var DIFF = {
    novice: { min: 2, max: 3, step: [0.8, 0.2, 0] },
    adept: { min: 3, max: 4, step: [0.5, 0.3, 0.2] },
    master: { min: 4, max: 6, step: [0.4, 0.2, 0.4] }
  };
  var MEL_N = 10, SING_N = 10;

  /* ---------- storage ---------- */
  var lsGet = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  var lsSet = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var PREFS_KEY = "ear:prefs:v1", PROG_KEY = "ear:progress:v1";
  var DEFAULTS = { droneVol: 60, noteVol: 80, instrument: "piano", cadence: true, keyEvery: 5, count: 20, labels: "num", unlockAll: false,
    tempo: 45, pause: 2, hfRepeat: 2, hfWait: 3, hfReplay: 1, hfGap: 3 };
  var num = function (v, lo, hi, d) { v = Number(v); return isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; };
  function cleanPrefs(p) {
    p = p && typeof p === "object" ? p : {};
    return {
      droneVol: num(p.droneVol, 0, 100, DEFAULTS.droneVol), noteVol: num(p.noteVol, 0, 100, DEFAULTS.noteVol),
      instrument: ["piano", "flute", "pluck"].indexOf(p.instrument) >= 0 ? p.instrument : "piano",
      cadence: p.cadence !== false, keyEvery: Math.round(num(p.keyEvery, 1, 50, 5)), count: Math.round(num(p.count, 5, 100, 20)),
      labels: p.labels === "sol" ? "sol" : "num", unlockAll: p.unlockAll === true,
      tempo: Math.round(num(p.tempo, 20, 120, DEFAULTS.tempo) / 5) * 5, pause: Math.round(num(p.pause, 0.5, 6, DEFAULTS.pause) * 2) / 2,
      hfRepeat: Math.round(num(p.hfRepeat, 1, 5, DEFAULTS.hfRepeat)), hfWait: Math.round(num(p.hfWait, 0, 10, DEFAULTS.hfWait) * 2) / 2,
      hfReplay: Math.round(num(p.hfReplay, 0, 4, DEFAULTS.hfReplay)), hfGap: Math.round(num(p.hfGap, 1, 10, DEFAULTS.hfGap) * 2) / 2
    };
  }
  function cleanProg(p) {
    p = p && typeof p === "object" ? p : {};
    var out = { savedAt: Number(p.savedAt) || 0, unlocked: { major: 1, minor: 1, chromatic: 1 }, best: {}, tot: {}, conf: {}, log: [], rounds: 0, days: [], presets: [], lastPath: "major", sel: {} };
    Object.keys(PATHS).forEach(function (k) { out.unlocked[k] = Math.round(num(p.unlocked && p.unlocked[k], 1, PATHS[k].length, 1)); });
    if (p.best && typeof p.best === "object") Object.keys(p.best).forEach(function (k) { out.best[k] = num(p.best[k], 0, 100, 0); });
    if (p.tot && typeof p.tot === "object") Object.keys(p.tot).forEach(function (k) { var v = p.tot[k]; if (Array.isArray(v) && DEG[k]) out.tot[k] = [Math.max(0, v[0] | 0), Math.max(0, v[1] | 0)]; });
    if (p.conf && typeof p.conf === "object") Object.keys(p.conf).forEach(function (k) { if (/^\d+>\d+$/.test(k)) out.conf[k] = Math.max(0, p.conf[k] | 0); });
    if (Array.isArray(p.log)) out.log = p.log.filter(function (e) { return Array.isArray(e) && e.length === 3; }).slice(-3000);
    out.rounds = Math.max(0, p.rounds | 0);
    if (Array.isArray(p.days)) out.days = p.days.filter(function (d) { return /^\d{4}-\d\d-\d\d$/.test(d); }).slice(-400);
    if (Array.isArray(p.presets)) out.presets = p.presets.filter(function (x) { return x && x.id && x.name && x.cfg; }).slice(0, 50);
    out.lastPath = PATHS[p.lastPath] ? p.lastPath : "major";
    out.sel = p.sel && typeof p.sel === "object" ? p.sel : {};
    return out;
  }
  var prefs = cleanPrefs(lsGet(PREFS_KEY));
  var prog = cleanProg(lsGet(PROG_KEY));
  function persist() {
    prog.savedAt = Date.now();
    lsSet(PREFS_KEY, prefs); lsSet(PROG_KEY, prog);
    queueSync();
  }
  var dayStr = function (t) { var d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  function record(asked, answered) {
    var right = asked === answered, t = prog.tot[asked] || (prog.tot[asked] = [0, 0]);
    t[right ? 0 : 1]++;
    if (!right && answered >= 0) { var k = asked + ">" + answered; prog.conf[k] = (prog.conf[k] || 0) + 1; }
    prog.log.push([Date.now(), asked, answered]);
    if (prog.log.length > 3000) prog.log.splice(0, prog.log.length - 3000);
    var today = dayStr(Date.now());
    if (prog.days[prog.days.length - 1] !== today) { prog.days.push(today); if (prog.days.length > 400) prog.days.shift(); }
    persist();
  }
  function streak() {
    var set = {}; prog.days.forEach(function (d) { set[d] = 1; });
    var t = Date.now(), n = 0;
    if (!set[dayStr(t)]) t -= 864e5;
    while (set[dayStr(t)]) { n++; t -= 864e5; }
    return n;
  }
  var lab = function (i) { return prefs.labels === "sol" ? DEG[i][1] : DEG[i][0]; };
  var unlockedCount = function (path) { return prefs.unlockAll ? PATHS[path].length : prog.unlocked[path]; };

  /* ---------- sound ---------- */
  var Snd = (function () {
    var ctx = null, master, droneBus, noteBus, comp, drone = null, want = null, gen = 0, armed = false;
    var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
    var curve = function (v) { return Math.pow(v / 100, 1.7); };
    function ensure() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!ctx) {
        // Plays through an iPhone's silent switch.
        try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
        ctx = new AC();
        comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
        master = ctx.createGain(); master.gain.value = 0.9;
        droneBus = ctx.createGain(); noteBus = ctx.createGain();
        droneBus.connect(master); noteBus.connect(master); master.connect(comp); comp.connect(ctx.destination);
        applyVol();
        // A silent sound started inside the tap is what makes iOS hand the page its audio.
        try { var s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate); s.connect(ctx.destination); s.start(0); } catch (e) {}
      }
      if (ctx.state !== "running") { try { var p = ctx.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
      if (want !== null && !drone) startDrone(want);
      return ctx;
    }
    function applyVol() {
      if (!ctx) return;
      droneBus.gain.value = curve(prefs.droneVol) * 0.38;
      noteBus.gain.value = curve(prefs.noteVol) * 1.0;
      if (want !== null && !drone && prefs.droneVol > 0) startDrone(want);
      if (drone && prefs.droneVol <= 0) killDrone(0.2);
    }
    function startDrone(pc) {
      want = pc;
      if (!ctx) return;
      if (drone) killDrone(0.1);
      if (prefs.droneVol <= 0) { T.drone = false; glow(false); return; }
      var t = ctx.currentTime, b = 36 + pc;
      var env = ctx.createGain(); env.gain.setValueAtTime(0.0001, t); env.gain.linearRampToValueAtTime(1, t + 0.8);
      var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520; lp.Q.value = 0.4;
      lp.connect(env); env.connect(droneBus);
      var oscs = [];
      [[b, 0.5], [b + 12, 0.36], [b + 19, 0.1]].forEach(function (p) {
        [-6, 6].forEach(function (cents) {
          var o = ctx.createOscillator(), g = ctx.createGain();
          o.type = "sawtooth"; o.frequency.value = hz(p[0]); o.detune.value = cents;
          g.gain.value = p[1] * 0.45; o.connect(g); g.connect(lp); o.start(t); oscs.push(o);
        });
      });
      var so = ctx.createOscillator(), sg = ctx.createGain();
      so.type = "sine"; so.frequency.value = hz(b); sg.gain.value = 0.5; so.connect(sg); sg.connect(env); so.start(t); oscs.push(so);
      drone = { env: env, lp: lp, oscs: oscs, pc: pc };
      T.drone = true; glow(true);
    }
    function killDrone(rel) {
      if (!drone) return;
      var d = drone; drone = null; T.drone = false; glow(false);
      try {
        var t = ctx.currentTime;
        d.env.gain.cancelScheduledValues(t); d.env.gain.setValueAtTime(Math.max(d.env.gain.value, 0.0001), t);
        d.env.gain.linearRampToValueAtTime(0.0001, t + rel);
        d.oscs.forEach(function (o) { try { o.stop(t + rel + 0.05); } catch (e) {} });
      } catch (e) {}
      setTimeout(function () { try { d.env.disconnect(); d.lp.disconnect(); } catch (e) {} }, (rel + 0.3) * 1000);
    }
    function stopNotes() {
      if (!ctx) return;
      var old = noteBus, t = ctx.currentTime;
      try { old.gain.cancelScheduledValues(t); old.gain.setTargetAtTime(0, t, 0.01); } catch (e) {}
      setTimeout(function () { try { old.disconnect(); } catch (e) {} }, 300);
      noteBus = ctx.createGain(); noteBus.gain.value = curve(prefs.noteVol); noteBus.connect(master);
    }
    function stopAll() { gen++; want = null; killDrone(0.25); stopNotes(); T.drone = false; glow(false); }
    function hush() {                                  // page hidden
      gen++; killDrone(0.05); stopNotes();
      if (ctx && ctx.state === "running") { try { ctx.suspend(); } catch (e) {} }
    }
    /* One note. inst: piano | flute | pluck. */
    function note(midi, at, dur, vel, inst) {
      if (!ensure()) return;
      var t = Math.max(at || 0, ctx.currentTime), f = hz(midi), out = ctx.createGain(), end;
      T.sched.push({ m: midi, at: t }); if (T.sched.length > 120) T.sched.shift();
      inst = inst || prefs.instrument; vel = vel || 0.5; out.connect(noteBus);
      var osc = function (type, freq, gain, to) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.value = freq; g.gain.value = gain; o.connect(g); g.connect(to || out); o.start(t); o.stop(end); return o;
      };
      if (inst === "flute") {
        end = t + dur + 0.3;
        out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(vel * 0.7, t + 0.07);
        out.gain.setValueAtTime(vel * 0.7, t + Math.max(dur, 0.1)); out.gain.linearRampToValueAtTime(0.0001, t + dur + 0.25);
        var a = osc("sine", f, 1), lfo = ctx.createOscillator(), lg = ctx.createGain();
        lfo.frequency.value = 5; lg.gain.value = 5; lfo.connect(lg); lg.connect(a.detune); lfo.start(t); lfo.stop(end);
        osc("sine", f * 2, 0.12); osc("triangle", f * 3, 0.03);
      } else if (inst === "pluck") {
        end = t + Math.min(dur + 0.2, 2.2) + 0.2;
        var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 2; lp.frequency.setValueAtTime(Math.min(f * 9, 9000), t);
        lp.frequency.exponentialRampToValueAtTime(Math.max(f * 1.3, 200), t + 0.35); lp.connect(out);
        out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(vel * 0.6, t + 0.004);
        out.gain.exponentialRampToValueAtTime(0.0006, end - 0.05);
        osc("sawtooth", f, 0.7, lp); osc("square", f * 1.003, 0.2, lp);
      } else {
        end = t + Math.max(dur, 0.9) + 0.6;
        out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(vel * 0.8, t + 0.006);
        out.gain.exponentialRampToValueAtTime(vel * 0.25, t + 0.35);
        out.gain.exponentialRampToValueAtTime(0.0006, end - 0.05);
        osc("sine", f, 1); osc("sine", f * 2, 0.32); osc("sine", f * 3, 0.12); osc("triangle", f * 4, 0.04);
        osc("sine", f * 1.002, 0.25);
      }
      setTimeout(function () { try { out.disconnect(); } catch (e) {} }, (end - ctx.currentTime + 0.5) * 1000);
    }
    function chord(midis, at, dur, vel) { midis.forEach(function (m) { note(m, at, dur, vel, "piano"); }); }
    /* I-IV-V-I (or i-iv-V-i) as block chords, one beat each (the last held for two);
       returns its length in seconds. The beat is the note tempo doubled, but never above 90 BPM. */
    function cadence(pc, minor) {
      if (!ensure()) return 0;
      var T0 = 60 + pc, t = ctx.currentTime + 0.08, step = 60 / Math.min(2 * prefs.tempo, 90);
      var ch = minor
        ? [[0, [0, 3, 7]], [5, [0, 5, 8]], [7, [-1, 2, 7]], [0, [0, 3, 7]]]
        : [[0, [0, 4, 7]], [5, [0, 5, 9]], [7, [-1, 2, 7]], [0, [0, 4, 7]]];
      ch.forEach(function (c, i) {
        var len = i === 3 ? 2 * step : step, at = t + i * step;
        chord([24 + pc + 12 + c[0]].concat(c[1].map(function (x) { return T0 + x; })), at, len, 0.3);
        var degs = [c[0]].concat(c[1]).map(function (x) { return ((x % 12) + 12) % 12; });
        show(degs.filter(function (d, k) { return degs.indexOf(d) === k; }), at, "reveal", len * 1000);
      });
      return 5 * step;
    }
    /* New key: drone off, cadence (if on), drone on, then one more beat before anything is asked.
       Resolves when that beat is over. */
    async function keyChange(pc, withCadence, minor) {
      if (!ensure()) return;
      var mine = ++gen;
      want = pc; killDrone(0.15); stopNotes();
      T.key = pc; T.keyName = KEYNAMES[pc]; T.drone = false;
      if (withCadence) { var secs = cadence(pc, !!minor); T.cadences++; await sleep(secs * 1000 + 150); if (gen !== mine) return; }
      startDrone(pc);
      await sleep(60000 / prefs.tempo); if (gen !== mine) return;
    }
    return {
      ensure: ensure, applyVol: applyVol, startDrone: startDrone, stopAll: stopAll, hush: hush, note: note, keyChange: keyChange, stopNotes: stopNotes,
      arm: function () { armed = true; }, armedNow: function () { return armed; },
      setWant: function (pc) { want = pc; },
      now: function () { return ctx ? ctx.currentTime : 0; },
      context: function () { return ctx; },
      droneOn: function () { return !!drone; }
    };
  })();

  /* A note in key `pc`: octave 0 sits just above the drone, octave 1 an octave higher. */
  var midiOf = function (pc, deg, oct) { return 48 + pc + 12 * oct + deg; };
  var beatSec = function () { return 60 / prefs.tempo; };
  var noteDur = function () { return Math.min(3, beatSec()); };
  /* vis: { deg, kind } where kind is "reveal" (a note whose degree is known) or "question" (not yet
     answered: the clock only ripples at its centre and is never told which degree it is). */
  function playMidi(m, inst, dur, vis) {
    Snd.ensure();
    var at = Snd.now() + 0.04, len = dur || noteDur();
    T.notes.push(m); if (T.notes.length > 40) T.notes.shift();
    T.last = [m]; T.played++;
    Snd.note(m, at, len, 0.5, inst);
    if (vis) show(vis.kind === "question" ? [] : [vis.deg], at, vis.kind, len * 1000);
  }
  function say(text) {
    T.spoken.push(text);
    return new Promise(function (res) {
      try {
        var s = window.speechSynthesis;
        if (!s || typeof SpeechSynthesisUtterance === "undefined") return res(false);
        var u = new SpeechSynthesisUtterance(text), done = false;
        var fin = function () { if (!done) { done = true; res(true); } };
        u.rate = 0.85; u.onend = fin; u.onerror = fin;
        setTimeout(fin, 2500 * TS);
        s.speak(u);
      } catch (e) { res(false); }
    });
  }

  /* ---------- the degree clock ----------
     Twelve degrees round a circle in circle-of-fifths order. clockHTML() is the markup; Clk drives it.
     show() is the one door for animation: it is called with the audio time of the note it belongs to,
     so what you see lines up with what you hear. */
  var SVGNS = "http://www.w3.org/2000/svg";
  var POS = function (d, r) { var a = CLOCK_ORDER.indexOf(d) * Math.PI / 6; return [200 + r * Math.sin(a), 200 - r * Math.cos(a)]; };
  var f1 = function (n) { return Math.round(n * 10) / 10; };
  var reduced = function () { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  function clockHTML(o) {
    o = o || {};
    var on = {}; (o.on || ALL).forEach(function (d) { on[d] = 1; });
    var svg = '<svg class="cl-svg" viewBox="0 0 400 400" aria-hidden="true" focusable="false"><circle class="cl-ring" cx="200" cy="200" r="150"/>' +
      (o.hold ? '<circle class="cl-hold" id="cl-hold" cx="200" cy="200" r="83" pathLength="100" transform="rotate(-90 200 200)"/>' : "") +
      '<polyline class="cl-line" id="cl-line" points=""/>';
    svg += ALL.map(function (d) { var a = POS(d, 86), b = POS(d, 136); return '<line class="cl-spoke" data-d="' + d + '" x1="' + f1(a[0]) + '" y1="' + f1(a[1]) + '" x2="' + f1(b[0]) + '" y2="' + f1(b[1]) + '" stroke="' + DCOL[d] + '"/>'; }).join("");
    svg += '<g id="cl-fx"></g>';
    svg += CLOCK_ORDER.map(function (d) {
      var p = POS(d, 150), q = POS(d, 119), b = POS(d, 173), ring = DRING[d];
      return '<g class="cl-d' + (on[d] ? "" : " off") + '" data-d="' + d + '" style="--dc:' + DCOL[d] + '">' +
        '<circle class="cl-tg" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="18"/>' +
        '<circle class="cl-mk' + (ring ? " ring" : "") + '" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + (ring ? 8.5 : 10) + '"/>' +
        '<text class="cl-lab" x="' + f1(q[0]) + '" y="' + f1(q[1]) + '">' + esc(lab(d)) + "</text>" +
        '<g class="cl-bd yes" transform="translate(' + f1(b[0]) + " " + f1(b[1]) + ')"><circle r="8.5"/><path d="M-3.600 .4l2.600 2.700 4.600-5.600"/></g>' +
        '<g class="cl-bd no" transform="translate(' + f1(b[0]) + " " + f1(b[1]) + ')"><circle r="8.5"/><path d="M-3.200-3.200l6.400 6.400M3.200-3.200l-6.400 6.400"/></g></g>';
    }).join("");
    svg += '<g id="cl-needle" class="cl-needle" hidden><path class="arc" d=""/><line class="tick" x1="0" y1="-13" x2="0" y2="-27"/></g></svg>';
    var hits = o.tap === false ? "" : CLOCK_ORDER.map(function (d) {
      var c = POS(d, 135);
      return '<button type="button" class="cl-hit" data-d="' + d + '" aria-label="' + DEG[d][2] + '" style="left:' + f1(c[0] / 4) + "%;top:" + f1(c[1] / 4) + '%"' + (on[d] ? "" : " disabled") + "></button>";
    }).join("");
    return '<div class="clock' + (Snd.droneOn() ? " droning" : "") + '" id="clock">' + svg + hits + (o.centre || "") + "</div>";
  }
  var centreBtn = function (a, inner, label, cls) { return '<button type="button" class="cl-centre' + (cls ? " " + cls : "") + '" data-a="' + a + '" aria-label="' + label + '">' + inner + "</button>"; };
  var bigDeg = function (d) { return '<span class="cl-big" style="--dc:' + DCOL[d] + '">' + esc(lab(d)) + "</span>"; };
  var Clk = (function () {
    var q = function (sel) { return view.querySelector(sel); };
    var grp = function (d) { return q('.cl-d[data-d="' + d + '"]'); };
    var anim = function (el, frames, opt) { if (el && el.animate && !reduced()) { try { return el.animate(frames, opt); } catch (e) {} } return null; };
    function hold(el, cls, ms) { el.classList.add(cls); clearTimeout(el["_t" + cls]); el["_t" + cls] = setTimeout(function () { el.classList.remove(cls); }, ms); }
    function fx(attrs) {
      var layer = q("#cl-fx"); if (!layer || reduced()) return null;
      var c = document.createElementNS(SVGNS, "circle"); c.setAttribute("class", "cl-rp");
      Object.keys(attrs).forEach(function (k) { c.setAttribute(k, attrs[k]); });
      layer.appendChild(c); setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 1100);
      return c;
    }
    function pulse(d, ms) {
      var g = grp(d); if (!g) return;
      hold(g, "rv", Math.min(2200, Math.max(700, ms || 0)));
      var sp = q('.cl-spoke[data-d="' + d + '"]'); if (sp) { hold(sp, "on", 700); anim(sp, [{ opacity: 0.95 }, { opacity: 0 }], { duration: 700, easing: "ease-out" }); }
      var p = POS(d, 150), c = fx({ cx: f1(p[0]), cy: f1(p[1]), r: 10, stroke: DCOL[d] });
      anim(c, [{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(3.8)", opacity: 0 }], { duration: 1000, easing: "cubic-bezier(.2,.7,.3,1)" });
      anim(g.querySelector(".cl-mk"), [{ transform: "scale(1)" }, { transform: "scale(1.6)" }, { transform: "scale(1.15)" }], { duration: 520, easing: "ease-out" });
    }
    return {
      reveal: pulse,
      ripple: function () {                                  // a question note: the centre only, nothing about which degree
        var c = q(".cl-centre"); if (c) hold(c, "q", 600);
        anim(fx({ cx: 200, cy: 200, r: 76, stroke: "rgb(255 255 255 / .55)" }), [{ transform: "scale(1)", opacity: 0.8 }, { transform: "scale(1.32)", opacity: 0 }], { duration: 1000, easing: "ease-out" });
      },
      clear: function () {
        view.querySelectorAll(".cl-d").forEach(function (g) { g.classList.remove("ok", "bad", "hint", "near", "target"); });
        var l = q("#cl-line"); if (l) l.setAttribute("points", "");
      },
      ok: function (d) {
        var g = grp(d); if (!g) return;
        g.classList.add("ok"); pulse(d, 900);
      },
      bad: function (d) {
        var g = grp(d); if (!g) return;
        g.classList.add("bad");
        anim(g, [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(-4px)" }, { transform: "translateX(3px)" }, { transform: "translateX(0)" }], { duration: 380, easing: "ease-out" });
      },
      hint: function (d) { var g = grp(d); if (g) g.classList.add("hint"); },
      target: function (d) {
        view.querySelectorAll(".cl-d.target").forEach(function (g) { g.classList.remove("target"); });
        var g = d === null ? null : grp(d); if (g) g.classList.add("target");
      },
      near: function (d) {
        view.querySelectorAll(".cl-d.near").forEach(function (g) { if (+g.dataset.d !== d) g.classList.remove("near"); });
        var g = d === null ? null : grp(d); if (g) g.classList.add("near");
      },
      needle: function (d, cents) {
        var n = q("#cl-needle"); if (!n) return;
        if (d === null) { n.setAttribute("hidden", ""); return; }
        var p = POS(d, 150), th = CLOCK_ORDER.indexOf(d) * 30, a = 62, arc = function (deg) { var r = deg * Math.PI / 180; return f1(21 * Math.sin(r)) + " " + f1(-21 * Math.cos(r)); };
        n.removeAttribute("hidden");
        n.setAttribute("transform", "translate(" + f1(p[0]) + " " + f1(p[1]) + ") rotate(" + th + ")");
        n.querySelector(".arc").setAttribute("d", "M" + arc(-a) + " A21 21 0 0 1 " + arc(a));
        n.querySelector(".tick").setAttribute("transform", "rotate(" + (Math.max(-50, Math.min(50, cents)) / 50 * a) + ")");
        n.classList.toggle("tune", Math.abs(cents) <= 15);
      },
      hold: function (pct) { var h = q("#cl-hold"); if (h) h.style.strokeDashoffset = String(100 - Math.max(0, Math.min(100, pct))); },
      line: function (degs) {
        var l = q("#cl-line"); if (!l) return;
        l.setAttribute("points", degs.length < 2 ? "" : degs.map(function (d) { var p = POS(d, 150); return f1(p[0]) + "," + f1(p[1]); }).join(" "));
      },
      centre: function (html) { var c = q(".cl-centre"); if (c) c.innerHTML = html; },
      glow: function (on) { var c = $("clock"); if (c) c.classList.toggle("droning", on); }
    };
  })();
  function glow(on) { Clk.glow(on); }
  /* Animate degrees (or, for a question, only the centre) at audio time `at`. */
  function show(degs, at, kind, ms) {
    T.vis.push({ kind: kind, d: degs.slice(), at: at }); if (T.vis.length > 80) T.vis.shift();
    var el = $("clock"), delay = Math.max(0, (at - Snd.now()) * 1000);
    setTimeout(function () {
      if (!el || $("clock") !== el) return;
      if (kind === "question") Clk.ripple(); else degs.forEach(function (d) { Clk.reveal(d, ms); });
    }, delay);
  }

  /* ---------- small pieces ---------- */
  var ICON = {
    home: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.500 9.200 10 3.600l6.500 5.600"/><path d="M5.200 8.200v7.300h9.600V8.200"/></svg>',
    back: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.500 4 6.500 10l6 6"/></svg>',
    snd: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.500 6h2.500L8.500 3v10L5 10H2.500z" fill="currentColor"/><path d="M11 5.200a4 4 0 0 1 0 5.600M12.900 3.400a6.500 6.500 0 0 1 0 9.200" fill="none" stroke="currentColor" stroke-width="1.400" stroke-linecap="round"/></svg>',
    lock: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2"/><path d="M5.500 7V5a2.500 2.500 0 0 1 5 0v2"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.500 5.600v12.800c0 .6.700 1 1.200.6l9.600-6.400c.5-.3.5-1 0-1.300L9.700 5c-.5-.4-1.200 0-1.200.6z" fill="currentColor"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.500" y="6.500" width="11" height="11" rx="2.600" fill="currentColor"/></svg>',
    stats: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 16V10M10 16V4.500M15 16v-3.800"/></svg>',
    gear: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h8M15 6h2M3 14h2M9 14h8"/><circle cx="13" cy="6" r="2"/><circle cx="7" cy="14" r="2"/></svg>',
    chev: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.500 4.500 13 10l-5.500 5.500"/></svg>'
  };
  /* A degree as a small marker: filled in its colour, or a ring when the degree is altered. */
  var dm = function (d, extra) { return '<span class="dm' + (DRING[d] ? " ring" : "") + (extra ? " " + extra : "") + '" style="--dc:' + DCOL[d] + '">' + esc(lab(d)) + "</span>"; };
  var dchip = dm;
  var inClockOrder = function (set) { return CLOCK_ORDER.filter(function (d) { return set.indexOf(d) >= 0; }); };
  var seg = function (items, attr, cur, name) { return '<div class="seg" role="group" aria-label="' + name + '">' + items.map(function (x) { return '<button type="button" class="sg" ' + attr + ' data-v="' + x[0] + '" aria-pressed="' + (cur === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>"; };
  var chip = function (text, attrs, on) { return '<button type="button" class="chip" ' + attrs + ' aria-pressed="' + (on ? "true" : "false") + '">' + text + "</button>"; };
  var keyChips = function (cur, attr) { return '<div class="keys" role="radiogroup" aria-label="Key">' + KEYNAMES.map(function (k, i) { return '<button type="button" class="chip" role="radio" ' + attr + '="' + i + '" aria-checked="' + (i === cur) + '">' + k + "</button>"; }).join("") + "</div>"; };
  var dtogs = function (set) {
    return '<div class="dtogs" role="group" aria-label="Degrees">' + CLOCK_ORDER.map(function (d) {
      var on = set.indexOf(d) >= 0;
      return '<button type="button" class="dtog' + (DRING[d] ? " ring" : "") + '" style="--dc:' + DCOL[d] + '" data-sel="deg" data-v="' + d + '" aria-pressed="' + on + '" aria-label="' + DEG[d][2] + '">' + esc(lab(d)) + "</button>";
    }).join("") + "</div>";
  };
  var fmt = function (v) { return String(Math.round(v * 10) / 10); };
  var slider = function (id, label, v, lo, hi, step, unit) {
    return '<div class="field"><label class="lbl" for="' + id + '">' + label + ' <b id="' + id + '-v">' + fmt(v) + (unit ? " " + unit : "") + '</b></label>' +
      '<input type="range" id="' + id + '" data-k="' + id + '" data-u="' + (unit || "") + '" min="' + lo + '" max="' + hi + '" step="' + step + '" value="' + v + '"></div>';
  };
  var isMinorSet = function (set) { return set.indexOf(3) >= 0 && set.indexOf(4) < 0; };
  var setOfName = function (name) {
    if (name === "level") { var pa = prog.lastPath, lv = PATHS[pa][unlockedCount(pa) - 1]; return { set: lv.set, oct: lv.oct || 1, minor: pa === "minor" }; }
    return { set: SETS[name] || MAJ, oct: 1, minor: name === "minor" };
  };
  var pillRow = function (html) { return '<div class="pillrow">' + html + "</div>"; };
  var qbtn = function (a, label, icon) { return '<button type="button" class="btn quiet" data-a="' + a + '">' + (icon || "") + label + "</button>"; };

  /* ---------- the key of a run ---------- */
  function keyFor(cfg, cur) {
    if (cfg.keyMode === "fixed") return cfg.fixedPc;
    if (cfg.keyMode === "random" && cur !== null) return cur;
    var pc; do { pc = rnd(12); } while (pc === cur && cur !== null);
    return pc;
  }
  var needsKey = function (cfg, i) { return i === 0 || (cfg.keyMode === "every" && i % cfg.keyEvery === 0); };

  /* ---------- routing ---------- */
  var cur = { stop: function () {}, click: null, input: null };
  var runId = 0;
  function setNav(href, icon, label) { var n = $("nav"); n.href = href; n.innerHTML = icon; n.setAttribute("aria-label", label); }
  var customDraft = null;
  function route() {
    try { cur.stop(); } catch (e) {}
    cur = { stop: function () {}, click: null, input: null };
    runId++; Snd.stopAll();
    T.phase = ""; T.expected = [];
    var p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean), page = p[0] || "";
    T.screen = p.join("/") || "front";
    var parent = "#/";
    if (page === "degrees" && p[1]) parent = "#/degrees";
    if (page === "melodies" && p[1]) parent = "#/melodies";
    if (page === "custom" && p[1]) parent = "#/custom";
    if (!page) setNav("../", ICON.home, "Music home, all apps"); else setNav(parent, ICON.back, "Back");
    ["stats", "settings"].forEach(function (k) { var a = $("b-" + k); if (a) { if (page === k) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); } });
    document.title = (page ? ({ degrees: "Degrees", melodies: "Melodies", sing: "Sing", "hands-free": "Hands-free", free: "Free play", custom: "Custom", stats: "Stats", settings: "Settings" }[page] || "") + " – " : "") + "Ear Training";
    if (page === "degrees" && p[1] === "play" && PATHS[p[2]] && PATHS[p[2]][+p[3]]) return degreesPlay(p[2], +p[3], false);
    if (page === "degrees" && p[1] === "practice" && PATHS[p[2]] && PATHS[p[2]][+p[3]]) return degreesPlay(p[2], +p[3], true);
    if (page === "degrees") return levelsView();
    if (page === "melodies" && p[1] === "play" && DIFF[p[2]]) return melodiesPlay(p[2], p[3] || "major");
    if (page === "melodies") return melodiesSetup();
    if (page === "sing") return singView();
    if (page === "hands-free") return handsFree();
    if (page === "free") return freePlay();
    if (page === "custom" && p[1] === "play") return customPlay();
    if (page === "custom") return customView();
    if (page === "stats") return statsView();
    if (page === "settings") return settingsView();
    frontView(); window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  var G = function (inner) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>"; };
  var GLYPH = {
    degrees: G('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="4" r="1.700" fill="currentColor" stroke="none"/><circle cx="19" cy="16" r="1.700" fill="currentColor" stroke="none"/><circle cx="5" cy="16" r="1.700" fill="currentColor" stroke="none"/>'),
    melodies: G('<path d="M3.500 17.500 9 10l5 3.500L20.500 5.500"/><circle cx="3.500" cy="17.500" r="1.400" fill="currentColor"/><circle cx="9" cy="10" r="1.400" fill="currentColor"/><circle cx="14" cy="13.500" r="1.400" fill="currentColor"/><circle cx="20.500" cy="5.500" r="1.400" fill="currentColor"/>'),
    sing: G('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3"/>'),
    "hands-free": G('<path d="M4 16v-3.500a8 8 0 0 1 16 0V16"/><rect x="3" y="14" width="4" height="6" rx="1.800"/><rect x="17" y="14" width="4" height="6" rx="1.800"/>'),
    free: G('<path d="M6 17.500v-6M12 17.500v-12M18 17.500v-8"/>'),
    custom: G('<rect x="4" y="4" width="16" height="16" rx="4.500"/><path d="M12 8.500v7M8.500 12h7"/>')
  };
  var TILES = [["degrees", "Degrees", 0], ["melodies", "Melodies", 4], ["sing", "Sing", 7], ["hands-free", "Hands-free", 11], ["free", "Free play", 5], ["custom", "Custom", 9]];
  function frontView() {
    var hint = {
      degrees: '<span class="figs">' + [["major", 4, false], ["minor", 3, true], ["chromatic", 6, true]].map(function (x) {
        return '<span class="fig' + (x[2] ? " ring" : "") + '" style="--dc:' + DCOL[x[1]] + '" aria-label="' + PATH_NAMES[x[0]] + " level " + unlockedCount(x[0]) + '">' + unlockedCount(x[0]) + "</span>";
      }).join("") + "</span>"
    };
    view.innerHTML = '<nav class="rows" aria-label="Exercises">' + TILES.map(function (t) {
      return '<a class="rowlink" href="#/' + t[0] + '" style="--dc:' + DCOL[t[2]] + '"><span class="gl">' + GLYPH[t[0]] + '</span><span class="nm">' + t[1] + "</span>" + (hint[t[0]] || "") + '<span class="chev">' + ICON.chev + "</span></a>";
    }).join("") + "</nav>";
  }
  // Every tap makes sure the audio context exists and is running: it has to start inside a gesture.
  document.addEventListener("click", function () { Snd.arm(); Snd.ensure(); }, true);
  document.addEventListener("touchend", function () { Snd.arm(); Snd.ensure(); }, { capture: true, passive: true });
  view.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a],[data-d],[data-sel],[data-key]");
    if (!b || b.disabled) return;
    if (cur.click) cur.click(b, e);
  });
  view.addEventListener("input", function (e) { if (cur.input && e.target.matches("input[type=range]")) cur.input(e.target, false); });
  view.addEventListener("change", function (e) { if (cur.input && e.target.matches("input[type=range]")) cur.input(e.target, true); });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (cur.hidden) cur.hidden(); Snd.hush(); }
  });
  window.addEventListener("pagehide", function () { Snd.hush(); });

  var startStage = function () { return '<div class="stage">' + clockHTML({ on: [], tap: false, centre: centreBtn("begin", ICON.play, "Start") }) + "</div>"; };
  var statusRow = function (ids) { return '<div class="status">' + ids.map(function (x) { return x === "-" ? '<span class="grow"></span>' : '<span class="pill" id="' + x + '"></span>'; }).join("") + "</div>"; };

  /* ---------- Degrees: levels ---------- */
  function levelsView() {
    var h = '<h2 class="title">Degrees</h2>';
    Object.keys(PATHS).forEach(function (pa) {
      var open = unlockedCount(pa);
      h += '<h3 class="sec">' + PATH_NAMES[pa] + '</h3><div class="lv">' + PATHS[pa].map(function (lv, i) {
        var locked = i >= open, best = prog.best[pa + ":" + i];
        return '<div class="lvl' + (locked ? " locked" : "") + '" data-path="' + pa + '" data-idx="' + i + '"><div class="lvh"><span class="num">' + (i + 1) + "</span>" +
          '<span class="set">' + inClockOrder(lv.set).map(function (d) { return dm(d); }).join("") + "</span>" +
          '<span class="meta">' + (locked ? ICON.lock : (best !== undefined ? '<span class="pill">' + Math.round(best) + "%</span>" : "")) + (lv.oct === 2 ? '<span class="pill">2×</span>' : "") + "</span></div>" +
          (locked ? "" : '<div class="seg two"><button type="button" class="sg" data-a="play" data-path="' + pa + '" data-idx="' + i + '">Play</button><button type="button" class="sg" data-a="practice" data-path="' + pa + '" data-idx="' + i + '">Practice</button></div>') + "</div>";
      }).join("") + "</div>";
    });
    view.innerHTML = h;
    cur.click = function (b) {
      if (b.dataset.a === "play") location.hash = "#/degrees/play/" + b.dataset.path + "/" + b.dataset.idx;
      else if (b.dataset.a === "practice") location.hash = "#/degrees/practice/" + b.dataset.path + "/" + b.dataset.idx;
    };
    window.scrollTo(0, 0);
  }

  /* ---------- Degrees: a round ---------- */
  function degreesPlay(path, idx, practice) {
    var lv = PATHS[path][idx];
    if (idx >= unlockedCount(path)) { location.replace("#/degrees"); return; }
    prog.lastPath = path;
    var cfg = { set: lv.set, oct: lv.oct || 1, count: prefs.count, keyMode: "every", keyEvery: prefs.keyEvery, instrument: prefs.instrument, minor: path === "minor", practice: practice, path: path, idx: idx };
    runDegrees(cfg, function () { return { again: "#/degrees/play/" + path + "/" + idx, back: "#/degrees" }; }, function (pct) {
      var key = path + ":" + idx;
      if (prog.best[key] === undefined || pct > prog.best[key]) prog.best[key] = pct;
      var unlocked = false;
      if (pct >= 90 && idx + 1 < PATHS[path].length && prog.unlocked[path] < idx + 2) { prog.unlocked[path] = idx + 2; unlocked = true; }
      return { unlocked: unlocked, next: (pct >= 90 || idx + 1 < unlockedCount(path)) && idx + 1 < PATHS[path].length ? "#/degrees/play/" + path + "/" + (idx + 1) : null };
    });
  }

  function summaryHTML(score, total, pct, info, per) {
    return '<div class="card sum"><div class="score" id="score">' + score + "/" + total + '</div><div class="row"><span class="pill">' + pct + "%</span>" + (info && info.unlocked ? '<span class="pill hot">Unlocked</span>' : "") + "</div></div>" +
      '<ul class="per">' + inClockOrder(Object.keys(per).map(Number)).map(function (d) { return "<li>" + dm(d) + '<span class="y">✓ ' + per[d][0] + '</span><span class="n">✕ ' + per[d][1] + "</span></li>"; }).join("") + "</ul>";
  }

  function runDegrees(cfg, links, onScore) {
    var id = ++runId, live = function () { return id === runId; };
    if (!Snd.armedNow()) {
      // Opened by address, with no tap yet: sound can only start from a tap.
      view.innerHTML = startStage();
      cur.click = function (b) { if (b.dataset.a === "begin") { Snd.arm(); Snd.ensure(); runId++; runDegrees(cfg, links, onScore); } };
      cur.stop = function () { runId++; };
      return;
    }
    var pc = null, i = 0, asked = -1, answered = true, busy = true, score = 0, midi = 0, results = [], mode = "quiz", lastDeg = -1, started = false;
    function shell() {
      view.innerHTML =
        statusRow(cfg.practice ? ["s-k"] : ["s-n", "s-k", "-", "s-sc"]) +
        (cfg.practice ? "" : '<div class="prog"><i id="s-bar"></i></div>') +
        clockHTML({ on: cfg.set, centre: centreBtn("centre", ICON.play, "Play") }) +
        pillRow(qbtn("note", "Note", ICON.snd) + qbtn("cad", "Key") + (cfg.practice ? qbtn("one", "One") : ""));
      status();
    }
    function status() {
      if ($("s-n")) $("s-n").textContent = Math.min(i + 1, cfg.count) + " / " + cfg.count;
      if ($("s-sc")) $("s-sc").textContent = score + " ✓";
      if ($("s-k")) $("s-k").textContent = pc === null ? "Key" : "Key " + KEYNAMES[pc];
      if ($("s-bar")) $("s-bar").style.width = (i / cfg.count * 100) + "%";
    }
    async function changeKey() {
      busy = true; pc = keyFor(cfg, pc); status();
      await Snd.keyChange(pc, prefs.cadence, cfg.minor);
    }
    function pickDeg() {
      var d; do { d = pick(cfg.set); } while (cfg.set.length > 1 && d === lastDeg);
      lastDeg = d; return d;
    }
    // Before the answer the clock is never told which degree it is; after, the same note is revealed.
    function sound() { playMidi(midi, cfg.instrument, noteDur(), answered ? { deg: asked, kind: "reveal" } : { kind: "question" }); }
    function newQuestion() {
      Clk.clear(); Clk.centre(ICON.play); answered = false; asked = pickDeg();
      midi = midiOf(pc, asked, cfg.oct === 2 ? rnd(2) : 1);
      T.expected = [asked]; T.phase = "ask";
    }
    async function ask() {
      if (!live()) return;
      newQuestion(); busy = false;
      await sleep(120); if (!live()) return; sound();
    }
    async function begin() {
      if (started) return; started = true;
      Snd.ensure(); shell();
      if (cfg.practice) { await changeKey(); busy = false; mode = "explore"; T.phase = "practice"; return; }
      await changeKey(); if (!live()) return;
      await ask();
    }
    function answer(d) {
      if (busy || answered) return;
      answered = true;
      if (!cfg.practice) record(asked, d);
      var right = d === asked;
      T.vis.push({ kind: right ? "ok" : "bad", d: [d], at: Snd.now() });
      if (right) { Clk.ok(d); score++; } else { Clk.bad(d); }
      Clk.centre(bigDeg(asked)); status(); T.phase = right ? "right" : "wrong";
      if (!right) setTimeout(function () { if (live()) { Clk.hint(asked); sound(); } }, 450 * TS);
      if (cfg.practice) { setTimeout(function () { if (live()) { mode = "explore"; Clk.clear(); Clk.centre(ICON.play); T.phase = "practice"; } }, ((right ? 0 : 0.45 + noteDur()) + prefs.pause) * 1000 * TS); return; }
      results.push([asked, d]);
      setTimeout(next, ((right ? 0 : 0.45 + noteDur()) + prefs.pause) * 1000 * TS);
    }
    async function next() {
      if (!live()) return;
      i++; status();
      if (i >= cfg.count) return finish();
      if (needsKey(cfg, i)) { await changeKey(); if (!live()) return; }
      await ask();
    }
    function finish() {
      Snd.stopAll(); T.phase = "summary"; busy = true;
      var pct = Math.round(score / cfg.count * 100);
      prog.rounds++;
      var info = onScore ? onScore(pct) : {};
      persist();
      var per = {}; results.forEach(function (r) { var o = per[r[0]] || (per[r[0]] = [0, 0]); o[r[0] === r[1] ? 0 : 1]++; });
      var L = links();
      view.innerHTML = summaryHTML(score, cfg.count, pct, info, per) +
        '<div class="btns"><a class="btn" id="again" href="' + L.again + '" data-reload="1">Again</a>' + (info.next ? '<a class="btn" id="nextlv" href="' + info.next + '">Next level</a>' : "") + '<a class="btn quiet" href="' + L.back + '">Done</a></div>';
      var ag = $("again"); if (ag) ag.addEventListener("click", function (e) { if (location.hash === L.again) { e.preventDefault(); route(); } });
      window.scrollTo(0, 0);
    }
    function askOne() {
      if (busy) return;
      mode = "quiz"; newQuestion(); T.phase = "ask"; sound();
    }
    cur.stop = function () { runId++; };
    cur.hidden = function () { /* sound stops; the round stays where it is */ };
    cur.click = function (b) {
      var a = b.dataset.a;
      if (!started) return;
      if (b.dataset.d !== undefined) {
        var d = +b.dataset.d;
        if (cfg.practice && mode === "explore") { playMidi(midiOf(pc, d, cfg.oct === 2 ? rnd(2) : 1), cfg.instrument, noteDur(), { deg: d, kind: "reveal" }); T.expected = [d]; Clk.centre(bigDeg(d)); return; }
        return answer(d);
      }
      if (a === "centre") { if (cfg.practice && mode === "explore") return askOne(); a = "note"; }
      if (a === "note" && midi) { sound(); return; }
      if (a === "cad") { if (pc === null) return; var was = busy; busy = true; Snd.keyChange(pc, true, cfg.minor).then(function () { if (live()) busy = was; }); return; }
      if (a === "one" && cfg.practice) askOne();
    };
    begin();
  }

  /* ---------- Melodies ---------- */
  function melodiesSetup() {
    var s = prog.sel;
    var diff = DIFF[s.melDiff] ? s.melDiff : "novice", set = ["major", "minor", "chromatic", "level"].indexOf(s.melSet) >= 0 ? s.melSet : "major";
    function render() {
      view.innerHTML = '<h2 class="title">Melodies</h2><div class="card">' +
        seg([["novice", "Novice"], ["adept", "Adept"], ["master", "Master"]], 'data-sel="diff"', diff, "Difficulty") +
        seg([["major", "Major"], ["minor", "Minor"], ["chromatic", "Chromatic"], ["level", "My level"]], 'data-sel="set"', set, "Degrees") +
        '<div class="btns"><button type="button" class="btn big" data-a="start">Start</button></div></div>';
    }
    render();
    cur.click = function (b) {
      if (b.dataset.sel === "diff") diff = b.dataset.v;
      else if (b.dataset.sel === "set") set = b.dataset.v;
      else if (b.dataset.a === "start") { prog.sel.melDiff = diff; prog.sel.melSet = set; persist(); location.hash = "#/melodies/play/" + diff + "/" + set; return; }
      render();
    };
  }
  function melodiesPlay(diff, setName) {
    var o = setOfName(setName);
    runMelodies({ set: o.set, oct: o.oct, minor: o.minor, diff: diff, count: MEL_N, keyMode: "every", keyEvery: prefs.keyEvery, instrument: prefs.instrument },
      function () { return { again: "#/melodies/play/" + diff + "/" + setName, back: "#/melodies" }; });
  }
  function genPhrase(set, oct, diff) {
    var d = DIFF[diff], ladder = [];
    (oct === 2 ? [0, 1] : [1]).forEach(function (o) { sorted(set).forEach(function (x) { ladder.push({ d: x, off: 12 * o + x }); }); });
    var n = d.min + rnd(d.max - d.min + 1), idx = rnd(ladder.length), out = [idx];
    for (var k = 1; k < n; k++) {
      var r = Math.random(), size = r < d.step[0] ? 1 : r < d.step[0] + d.step[1] ? 2 : 3 + rnd(3);
      var dir = Math.random() < 0.5 ? -1 : 1, nx = idx + dir * size;
      if (nx < 0 || nx >= ladder.length) nx = idx - dir * size;
      nx = Math.max(0, Math.min(ladder.length - 1, nx));
      if (nx === idx) nx = idx > 0 ? idx - 1 : idx + 1;
      if (ladder.length === 1) nx = 0;
      idx = nx; out.push(idx);
    }
    return out.map(function (j) { return ladder[j]; });
  }
  function runMelodies(cfg, links) {
    var id = ++runId, live = function () { return id === runId; };
    if (!Snd.armedNow()) {
      view.innerHTML = startStage();
      cur.click = function (b) { if (b.dataset.a === "begin") { Snd.arm(); Snd.ensure(); runId++; runMelodies(cfg, links); } };
      cur.stop = function () { runId++; };
      return;
    }
    var pc = null, i = 0, phrase = [], pos = 0, busy = true, okPhrases = 0, okNotes = 0, totNotes = 0, wrongSome = false, states = [];
    view.innerHTML = statusRow(["s-n", "s-k", "-", "s-sc"]) + '<div class="prog"><i id="s-bar"></i></div>' +
      clockHTML({ on: cfg.set, centre: centreBtn("note", "", "Play phrase") }) + pillRow(qbtn("note", "Phrase", ICON.snd) + qbtn("cad", "Key"));
    function status() {
      $("s-n").textContent = Math.min(i + 1, cfg.count) + " / " + cfg.count;
      $("s-sc").textContent = okPhrases + " ✓";
      $("s-k").textContent = pc === null ? "Key" : "Key " + KEYNAMES[pc];
      $("s-bar").style.width = (i / cfg.count * 100) + "%";
    }
    function progress() {                                   // the centre: one dot per note of the phrase
      Clk.centre('<span class="pds">' + phrase.map(function (n, k) {
        var st = states[k];
        if (!st) return '<i class="pd' + (k === pos ? " cur" : "") + '"></i>';
        return '<i class="pd ' + st.cls + '" style="--dc:' + DCOL[st.typed] + '"></i>';
      }).join("") + "</span>");
      var c = view.querySelector(".cl-centre"); if (c) c.setAttribute("data-pos", pos + "/" + phrase.length);
      Clk.line(states.map(function (st) { return st.typed; }));
    }
    /* Plays the phrase one note per beat. kind "question" keeps the degrees hidden; "reveal" shows them. */
    function playPhrase(kind, delay) {
      var beat = beatSec(), base = Snd.now() + 0.1 + (delay || 0), mids = phrase.map(function (n) { return midiOf(pc, n.d, 0) + (n.off - n.d); });
      Snd.ensure(); base = Snd.now() + 0.1 + (delay || 0);
      mids.forEach(function (m, k) {
        T.notes.push(m); Snd.note(m, base + k * beat, Math.min(3, beat * 0.95), 0.5, cfg.instrument);
        show(kind === "question" ? [] : [phrase[k].d], base + k * beat, kind, beat * 1000);
      });
      if (T.notes.length > 40) T.notes.splice(0, T.notes.length - 40);
      T.last = mids; T.played++;
      return mids.length * beat;
    }
    async function ask() {
      if (!live()) return;
      Clk.clear(); phrase = genPhrase(cfg.set, cfg.oct, cfg.diff); pos = 0; states = []; wrongSome = false;
      T.expected = phrase.map(function (n) { return n.d; }); T.phase = "ask"; progress(); status(); busy = false;
      await sleep(150); if (!live()) return; playPhrase("question");
    }
    async function changeKey() { busy = true; pc = keyFor(cfg, pc); status(); await Snd.keyChange(pc, prefs.cadence, cfg.minor); }
    async function next() {
      if (!live()) return;
      i++; status();
      if (i >= cfg.count) return finish();
      if (needsKey(cfg, i)) { await changeKey(); if (!live()) return; }
      await ask();
    }
    function answer(d) {
      if (busy || pos >= phrase.length) return;
      var exp = phrase[pos].d, right = d === exp;
      record(exp, d); totNotes++; if (right) okNotes++; else wrongSome = true;
      states[pos] = { typed: d, cls: right ? "ok" : "bad" }; pos++;
      view.querySelectorAll(".cl-d").forEach(function (g) { g.classList.remove("ok", "bad"); });
      T.vis.push({ kind: right ? "ok" : "bad", d: [d], at: Snd.now() });
      if (right) Clk.ok(d); else Clk.bad(d);
      progress();
      if (pos < phrase.length) return;
      busy = true; T.phase = wrongSome ? "wrong" : "right";
      if (!wrongSome) okPhrases++;
      status();
      var wait = prefs.pause;
      if (wrongSome) { setTimeout(function () { if (live()) { Snd.stopNotes(); playPhrase("reveal"); } }, 450 * TS); wait = 0.45 + phrase.length * beatSec() + prefs.pause; }
      setTimeout(next, wait * 1000 * TS);
    }
    function finish() {
      Snd.stopAll(); T.phase = "summary"; prog.rounds++; persist();
      var L = links();
      view.innerHTML = '<div class="card sum"><div class="score" id="score">' + okPhrases + "/" + cfg.count + '</div><div class="row"><span class="pill">' + okNotes + " / " + totNotes + '</span></div></div>' +
        '<div class="btns"><a class="btn" id="again" href="' + L.again + '">Again</a><a class="btn quiet" href="' + L.back + '">Done</a></div>';
      var ag = $("again"); if (ag) ag.addEventListener("click", function (e) { if (location.hash === L.again) { e.preventDefault(); route(); } });
      window.scrollTo(0, 0);
    }
    cur.stop = function () { runId++; };
    cur.click = function (b) {
      if (b.dataset.d !== undefined) return answer(+b.dataset.d);
      if (b.dataset.a === "note" && phrase.length) { Snd.stopNotes(); playPhrase(pos >= phrase.length ? "reveal" : "question"); }
      if (b.dataset.a === "cad" && pc !== null) { var was = busy; busy = true; Snd.keyChange(pc, true, cfg.minor).then(function () { if (live()) busy = was; }); }
    };
    (async function () { await changeKey(); if (live()) await ask(); })();
  }

  /* ---------- Custom ---------- */
  function newDraft() { return { name: "", kind: "degrees", diff: "adept", set: MAJ.slice(), keyMode: "every", fixedPc: 0, keyEvery: prefs.keyEvery, oct: 1, count: 20, instrument: prefs.instrument }; }
  var INSTR = [["piano", "Piano"], ["flute", "Soft"], ["pluck", "Pluck"]];
  function customView() {
    if (!customDraft) customDraft = newDraft();
    var D = customDraft;
    function form() {
      var h = seg([["degrees", "Degrees"], ["melodies", "Melodies"]], 'data-sel="kind"', D.kind, "Exercise");
      if (D.kind === "melodies") h += seg([["novice", "Novice"], ["adept", "Adept"], ["master", "Master"]], 'data-sel="diff"', D.diff, "Difficulty");
      h += dtogs(D.set);
      h += seg([["fixed", "Fixed key"], ["random", "Random key"], ["every", "Every"]], 'data-sel="km"', D.keyMode, "Key");
      if (D.keyMode === "fixed") h += keyChips(D.fixedPc, "data-key");
      if (D.keyMode === "every") h += slider("c-every", "Every", D.keyEvery, 1, 50, 1, "");
      h += '<div class="field"><span class="lbl">Octaves</span>' + seg([["1", "1"], ["2", "2"]], 'data-sel="oct"', String(D.oct), "Octaves") + "</div>";
      h += slider("c-count", D.kind === "melodies" ? "Phrases" : "Questions", D.count, 5, 100, 5, "");
      h += seg(INSTR, 'data-sel="inst"', D.instrument, "Instrument");
      h += '<div class="btns"><button type="button" class="btn big" data-a="start"' + (D.set.length < 2 ? " disabled" : "") + ">Start</button></div>";
      return h;
    }
    function presets() {
      return '<div class="row nowrap"><input class="name" id="pname" type="text" maxlength="30" placeholder="Name" aria-label="Preset name" value="' + esc(D.name) + '"><button type="button" class="btn quiet" data-a="save">Save</button></div>' +
        '<ul class="presets" id="plist">' + prog.presets.map(function (p) { return '<li><button type="button" class="chip wide" data-a="load" data-id="' + esc(p.id) + '">' + esc(p.name) + '</button><button type="button" class="chip" data-a="del" data-id="' + esc(p.id) + '" aria-label="Delete ' + esc(p.name) + '">✕</button></li>'; }).join("") + "</ul>";
    }
    view.innerHTML = '<h2 class="title">Custom</h2><div class="card" id="cform">' + form() + '</div><div class="card" id="cpre">' + presets() + "</div>";
    var redraw = function () { $("cform").innerHTML = form(); };
    cur.input = function (el) {
      var v = +el.value;
      if (el.id === "c-every") D.keyEvery = v; else if (el.id === "c-count") D.count = v;
      $(el.id + "-v").textContent = fmt(v);
    };
    cur.click = function (b) {
      var s = b.dataset.sel, v = b.dataset.v, a = b.dataset.a;
      if (s === "kind") D.kind = v;
      else if (s === "diff") D.diff = v;
      else if (s === "deg") { var i = +v, at = D.set.indexOf(i); if (at >= 0) D.set.splice(at, 1); else D.set = sorted(D.set.concat([i])); }
      else if (s === "km") D.keyMode = v;
      else if (s === "oct") D.oct = +v;
      else if (s === "inst") { D.instrument = v; Snd.ensure(); playMidi(midiOf(0, 7, 1), v, 0.8); }
      else if (b.dataset.key !== undefined) D.fixedPc = +b.dataset.key;
      else if (a === "start") { if (D.set.length >= 2) location.hash = "#/custom/play"; return; }
      else if (a === "save") {
        var name = ($("pname").value || "").trim(); D.name = name; if (!name) { $("pname").focus(); return; }
        var cfg = JSON.parse(JSON.stringify(D)); delete cfg.name;
        var ex = prog.presets.filter(function (p) { return p.name === name; })[0];
        if (ex) ex.cfg = cfg; else prog.presets.push({ id: String(Date.now()) + rnd(1000), name: name, cfg: cfg });
        persist(); $("cpre").innerHTML = presets(); return;
      }
      else if (a === "load") {
        var p = prog.presets.filter(function (x) { return x.id === b.dataset.id; })[0]; if (!p) return;
        customDraft = Object.assign(newDraft(), JSON.parse(JSON.stringify(p.cfg)), { name: p.name }); D = customDraft;
        $("cform").innerHTML = form(); $("pname").value = D.name; return;
      }
      else if (a === "del") {
        prog.presets = prog.presets.filter(function (x) { return x.id !== b.dataset.id; }); persist();
        $("cpre").innerHTML = presets(); return;
      }
      else return;
      redraw();
    };
    $("cpre").addEventListener("input", function (e) { if (e.target.id === "pname") D.name = e.target.value; });
  }
  function customPlay() {
    var D = customDraft;
    if (!D) { location.replace("#/custom"); return; }
    var cfg = { set: D.set.slice(), oct: D.oct, count: D.count, keyMode: D.keyMode, fixedPc: D.fixedPc, keyEvery: D.keyEvery, instrument: D.instrument, minor: isMinorSet(D.set), diff: D.diff };
    if (D.kind === "melodies") runMelodies(cfg, function () { return { again: "#/custom/play", back: "#/custom" }; });
    else runDegrees(cfg, function () { return { again: "#/custom/play", back: "#/custom" }; }, null);
  }

  /* ---------- Free play ---------- */
  function freePlay() {
    var pc = prog.sel.freeKey >= 0 && prog.sel.freeKey < 12 ? prog.sel.freeKey : 0, droneOn = true, started = false;
    view.innerHTML = clockHTML({ centre: centreBtn("root", "·", "Play one") }) +
      '<div class="card">' + keyChips(pc, "data-key") + '<div class="row"><button type="button" class="chip" data-a="drone" aria-pressed="true" id="dr">Drone</button></div></div>';
    function startDrone() { if (!droneOn) return; Snd.ensure(); Snd.startDrone(pc); T.key = pc; T.keyName = KEYNAMES[pc]; started = true; }
    cur.click = function (b) {
      if (b.dataset.key !== undefined) {
        pc = +b.dataset.key; prog.sel.freeKey = pc; persist();
        view.querySelectorAll("[data-key]").forEach(function (k) { k.setAttribute("aria-checked", String(+k.dataset.key === pc)); });
        T.key = pc; T.keyName = KEYNAMES[pc];
        if (droneOn) startDrone(); return;
      }
      if (b.dataset.a === "drone") {
        droneOn = !droneOn; b.setAttribute("aria-pressed", String(droneOn));
        if (droneOn) startDrone(); else { Snd.stopAll(); T.drone = false; }
        return;
      }
      var d = b.dataset.d !== undefined ? +b.dataset.d : (b.dataset.a === "root" ? 0 : -1);
      if (d >= 0) {
        Snd.ensure();
        if (droneOn && !Snd.droneOn()) startDrone();
        T.expected = [d]; playMidi(midiOf(pc, d, 1), prefs.instrument, noteDur() + 0.4, { deg: d, kind: "reveal" });
        Clk.centre(bigDeg(d));
      }
    };
    cur.stop = function () { Snd.stopAll(); };
  }

  /* ---------- Hands-free ---------- */
  function handsFree() {
    var s = prog.sel, setName = ["major", "minor", "chromatic", "custom"].indexOf(s.hfSet) >= 0 ? s.hfSet : "major", mins = [2, 5, 10].indexOf(s.hfMin) >= 0 ? s.hfMin : 5;
    var custom = Array.isArray(s.hfCustom) && s.hfCustom.length > 1 ? s.hfCustom.slice() : MAJ.slice();
    var wake = null, running = false;
    var setOf = function () { return setName === "custom" ? custom : SETS[setName]; };
    function setup() {
      view.innerHTML = '<h2 class="title">Hands-free</h2><div class="card">' +
        seg([["major", "Major"], ["minor", "Minor"], ["chromatic", "Chromatic"], ["custom", "Custom"]], 'data-sel="set"', setName, "Degrees") +
        (setName === "custom" ? dtogs(custom) : "") +
        '<div class="field"><span class="lbl">Key every</span>' + seg([["2", "2 min"], ["5", "5 min"], ["10", "10 min"]], 'data-sel="min"', String(mins), "Key change") + "</div></div>" +
        clockHTML({ on: setOf(), tap: false, centre: centreBtn("start", ICON.play, "Start", setName === "custom" && custom.length < 2 ? "off" : "") });
      var c = view.querySelector(".cl-centre"); if (c && setName === "custom" && custom.length < 2) c.disabled = true;
    }
    setup();
    async function run() {
      var id = ++runId, live = function () { return id === runId; };
      var set = setOf().slice(), minor = setName === "minor" || (setName === "custom" && isMinorSet(set));
      var pc = null, keyAt = 0, count = 0, last = -1;
      running = true; Snd.ensure(); Snd.arm();
      try { var sp = window.speechSynthesis; if (sp && typeof SpeechSynthesisUtterance !== "undefined") { var u = new SpeechSynthesisUtterance(" "); u.volume = 0; sp.speak(u); } } catch (e) {}
      try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (w) { wake = w; T.wake = true; if (!running) { try { w.release(); } catch (e) {} } }, function () {}); } catch (e) {}
      view.innerHTML = statusRow(["h-k", "h-d", "-", "h-n"]) +
        clockHTML({ on: set, tap: false, centre: centreBtn("stop", ICON.stop, "Stop") });
      $("h-d").textContent = "?"; $("h-n").textContent = "0"; $("h-k").textContent = "Key";
      var beat = function () { return beatSec() * 1000; };
      T.events = [];
      while (live()) {
        if (pc === null || (Date.now() - keyAt) / TS >= mins * 60000) {
          var np; do { np = rnd(12); } while (np === pc);
          pc = np; if ($("h-k")) $("h-k").textContent = "Key " + KEYNAMES[pc];
          await Snd.keyChange(pc, prefs.cadence, minor); if (!live()) return; keyAt = Date.now();
        }
        var d; do { d = pick(set); } while (set.length > 1 && d === last); last = d;
        var m = midiOf(pc, d, rnd(2)); T.expected = [d]; T.phase = "listen"; Clk.clear();
        if ($("h-d")) $("h-d").textContent = "?";
        for (var r = 0; r < prefs.hfRepeat; r++) {                    // the question, as many times as asked
          playMidi(m, prefs.instrument, noteDur(), { kind: "question" }); T.events.push("ask");
          if (r < prefs.hfRepeat - 1) { await sleep(2 * beat()); if (!live()) return; }
        }
        await sleep(beat() + prefs.hfWait * 1000); if (!live()) return;   // the last note's beat, then time to answer
        T.phase = "answer";
        if ($("h-d")) $("h-d").innerHTML = dm(d);
        T.events.push("speak"); show([d], Snd.now(), "reveal", 1400);
        await say(DEG[d][2]); if (!live()) return;
        for (var q = 0; q < prefs.hfReplay; q++) {                    // then the note again, now with its name
          await sleep(q === 0 ? 0.5 * beat() : 2 * beat()); if (!live()) return;
          playMidi(m, prefs.instrument, noteDur(), { deg: d, kind: "reveal" }); T.events.push("replay");
        }
        if (prefs.hfReplay > 0) { await sleep(beat()); if (!live()) return; }
        count++; if ($("h-n")) $("h-n").textContent = String(count);
        T.phase = "gap";
        await sleep(prefs.hfGap * 1000);
      }
    }
    function stopRun() {
      running = false; runId++; Snd.stopAll(); T.phase = "stopped";
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
      if (wake) { try { wake.release(); } catch (e) {} wake = null; } T.wake = false;
    }
    cur.stop = function () { if (running) stopRun(); };
    cur.hidden = function () { if (running) { stopRun(); setup(); } };
    cur.click = function (b) {
      var sel = b.dataset.sel, v = b.dataset.v, a = b.dataset.a;
      if (a === "start") { run(); return; }
      if (a === "stop") { stopRun(); setup(); return; }
      if (sel === "set") setName = v;
      else if (sel === "min") mins = +v;
      else if (sel === "deg") { var i = +v, at = custom.indexOf(i); if (at >= 0) custom.splice(at, 1); else custom = sorted(custom.concat([i])); }
      else return;
      prog.sel.hfSet = setName; prog.sel.hfMin = mins; prog.sel.hfCustom = custom; persist();
      setup();
    };
  }

  /* ---------- Sing ---------- */
  function singView() {
    var s = prog.sel, setName = ["major", "minor", "chromatic", "level"].indexOf(s.singSet) >= 0 ? s.singSet : "major";
    var stream = null, an = null, src = null, timer = null, active = false;
    function setup(msg) {
      view.innerHTML = '<h2 class="title">Sing</h2><div class="card">' +
        seg([["major", "Major"], ["minor", "Minor"], ["chromatic", "Chromatic"], ["level", "My level"]], 'data-sel="set"', setName, "Degrees") +
        '<div class="btns"><button type="button" class="btn big" data-a="start">Start</button></div>' + (msg ? '<p class="line err" id="miclost">' + esc(msg) + "</p>" : "") + "</div>";
    }
    setup();
    function micOff() {
      active = false; if (timer) { clearInterval(timer); timer = null; }
      try { if (src) src.disconnect(); } catch (e) {} src = null; an = null;
      if (stream) { try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {} stream = null; }
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
    }
    async function start() {
      var ctx = Snd.ensure(); Snd.arm();
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("none");
        try { if (navigator.audioSession) navigator.audioSession.type = "play-and-record"; } catch (e) {}
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      } catch (e) {
        micOff();
        setup(e && /denied|NotAllowed|Permission/i.test(String(e.name || e.message)) ? "Microphone blocked." : "Microphone unavailable.");
        return;
      }
      if (!ctx) { micOff(); setup("Microphone unavailable."); return; }
      try { await ctx.resume(); } catch (e) {}
      src = ctx.createMediaStreamSource(stream); an = ctx.createAnalyser(); an.fftSize = 4096; src.connect(an);
      round(ctx);
    }
    async function round(ctx) {
      var id = ++runId, live = function () { return id === runId; };
      var o = setOfName(setName), pc = null, i = 0, ok = 0, results = [], target = 0, hold = 0, histo = {}, quiet = true, tStart = 0, busy = true, lastTick = 0, lastGood = 0;
      var buf = new Float32Array(an.fftSize);
      active = true;
      view.innerHTML = statusRow(["s-n", "s-k", "-", "s-sc"]) + '<div class="prog"><i id="s-bar"></i></div>' +
        clockHTML({ on: o.set, tap: false, hold: true, centre: centreBtn("hear", "", "Hear it") }) +
        pillRow('<span class="pill wide" id="heard">·</span>' + qbtn("hear", "Hear it", ICON.snd) + qbtn("skip", "Skip"));
      function status() {
        $("s-n").textContent = Math.min(i + 1, SING_N) + " / " + SING_N; $("s-sc").textContent = ok + " ✓";
        $("s-k").textContent = pc === null ? "Key" : "Key " + KEYNAMES[pc]; $("s-bar").style.width = (i / SING_N * 100) + "%";
      }
      function hear() { busy = true; quiet = true; playMidi(midiOf(pc, target, 1), prefs.instrument, noteDur(), { deg: target, kind: "reveal" }); setTimeout(function () { if (live()) { busy = false; hold = 0; } }, (noteDur() + 0.4) * 1000 * TS); }
      function newTarget() {
        var d; do { d = pick(o.set); } while (o.set.length > 1 && d === target && i > 0); target = d;
        hold = 0; histo = {}; tStart = Date.now(); T.expected = [d]; T.phase = "sing";
        Clk.clear(); Clk.target(d); Clk.centre(bigDeg(d)); Clk.hold(0);
        status(); hear();
      }
      async function keyChange() { busy = true; pc = keyFor({ keyMode: "every" }, pc); status(); await Snd.keyChange(pc, prefs.cadence, o.minor); }
      function resolve(right) {
        var best = -1, n = 0; Object.keys(histo).forEach(function (k) { if (histo[k] > n) { n = histo[k]; best = +k; } });
        var answered = right ? target : (n >= 4 ? best : -1);
        record(target, answered); if (right) ok++; results.push([target, answered]);
        busy = true; T.phase = right ? "right" : "wrong";
        Clk.needle(null); Clk.near(null);
        if (right) { Clk.ok(target); Clk.hold(100); } else { Clk.hint(target); Clk.hold(0); if (answered >= 0 && answered !== target) Clk.bad(answered); }
        setTimeout(async function () {
          if (!live()) return;
          i++; status();
          if (i >= SING_N) return finish();
          if (needsKey({ keyMode: "every", keyEvery: prefs.keyEvery }, i)) { await keyChange(); if (!live()) return; }
          newTarget();
        }, (right ? 0.7 : 0.9) * 1000 * TS);
      }
      function finish() {
        micOff(); Snd.stopAll(); T.phase = "summary"; prog.rounds++; persist();
        var per = {}; results.forEach(function (r) { var q = per[r[0]] || (per[r[0]] = [0, 0]); q[r[0] === r[1] ? 0 : 1]++; });
        view.innerHTML = summaryHTML(ok, SING_N, Math.round(ok / SING_N * 100), null, per) +
          '<div class="btns"><button type="button" class="btn" data-a="again">Again</button><a class="btn quiet" href="#/">Done</a></div>';
        cur.click = function (b) { if (b.dataset.a === "again") { runId++; start(); } };
        window.scrollTo(0, 0);
      }
      function tick() {
        if (!live() || !an) return;
        var now = Date.now(), dt = lastTick ? now - lastTick : 50; lastTick = now;
        an.getFloatTimeDomainData(buf);
        var hz = busy ? null : detectPitch(buf, ctx.sampleRate), heard = $("heard");
        if (!hz) {
          if (now - lastGood > 200) hold = 0;
          heard.textContent = "·"; Clk.needle(null); Clk.near(null);
          T.sing = { target: target, hz: null };
        } else {
          var mf = 69 + 12 * Math.log2(hz / 440), pcf = (((mf - pc) % 12) + 12) % 12, near = Math.round(pcf) % 12, off = Math.round((pcf - Math.round(pcf)) * 100);
          var dist = ((((pcf - target + 6) % 12) + 12) % 12 - 6) * 100;
          histo[near] = (histo[near] || 0) + 1;
          heard.textContent = lab(near) + "  " + (off > 0 ? "+" : "") + off + "¢";
          Clk.near(near); Clk.needle(near, off);
          T.sing = { target: target, hz: hz, deg: near, cents: off, dist: Math.round(dist) };
          if (Math.abs(dist) <= 35) { hold += dt; lastGood = now; } else if (now - lastGood > 200) hold = 0;
          if (hold >= 400 && !busy) { Clk.hold(100); return resolve(true); }
        }
        Clk.hold(hold / 4);
        if (!busy && now - tStart > 15000 * TS) resolve(false);
      }
      cur.click = function (b) {
        var a = b.dataset.a;
        if (a === "hear" && !busy) hear();
        else if (a === "hear") { Snd.stopNotes(); hear(); }
        else if (a === "skip" && !busy) resolve(false);
      };
      cur.stop = function () { runId++; micOff(); Snd.stopAll(); };
      timer = setInterval(tick, 50);
      await keyChange(); if (!live()) return;
      newTarget();
    }
    cur.stop = function () { runId++; micOff(); };
    cur.hidden = function () { micOff(); runId++; Snd.stopAll(); setup(); };
    cur.click = function (b) {
      var sel = b.dataset.sel, v = b.dataset.v, a = b.dataset.a;
      if (a === "start") { prog.sel.singSet = setName; persist(); start(); return; }
      if (sel === "set") { setName = v; prog.sel.singSet = v; persist(); setup(); }
    };
  }

  /* ---------- Stats ---------- */
  function statsView() {
    var wk = Date.now() - 7 * 864e5, wkTot = {};
    prog.log.forEach(function (e) { if (e[0] >= wk) { var t = wkTot[e[1]] || (wkTot[e[1]] = [0, 0]); t[e[1] === e[2] ? 0 : 1]++; } });
    var pct = function (t) { return t && t[0] + t[1] ? Math.round(t[0] / (t[0] + t[1]) * 100) : null; };
    var conf = Object.keys(prog.conf).map(function (k) { var p = k.split(">"); return [+p[0], +p[1], prog.conf[k]]; }).sort(function (a, b) { return b[2] - a[2]; }).slice(0, 5);
    var bar = function (t, thin) {
      var p = pct(t); if (p === null) return '<div class="track' + (thin ? " thin" : "") + '"></div>';
      return '<div class="track' + (thin ? " thin" : "") + '"><i style="width:' + p + '%"></i></div>';
    };
    function render(confirmReset) {
      view.innerHTML = '<h2 class="title">Stats</h2><div class="card"><div class="big-nums"><div><b id="st-rounds">' + prog.rounds + "</b><span>Rounds</span></div><div><b id=\"st-streak\">" + streak() + "</b><span>Days</span></div></div></div>" +
        '<h3 class="sec">Degrees</h3><div class="card"><ul class="bars">' + CLOCK_ORDER.map(function (d) {
          var t = prog.tot[d], w = wkTot[d], p = pct(t), pw = pct(w);
          return '<li data-deg="' + d + '" style="--dc:' + DCOL[d] + '">' + dm(d) + '<div class="bar2">' + bar(t) + bar(w, true) + '<div class="nums"><span>All <b class="all">' + (t ? (p + "% " + t[0] + "/" + (t[0] + t[1])) : "–") + '</b></span><span>7d <b class="wk">' + (w ? (pw + "% " + w[0] + "/" + (w[0] + w[1])) : "–") + "</b></span></div></div></li>";
        }).join("") + "</ul></div>" +
        '<h3 class="sec">Mixed up</h3><div class="card"><ul class="conf" id="conf">' + (conf.length ? conf.map(function (c) { return "<li>" + dm(c[0]) + "<span>→</span>" + dm(c[1]) + '<span class="x">×' + c[2] + "</span></li>"; }).join("") : '<li class="line">–</li>') + "</ul></div>" +
        '<div class="btns" style="margin-top:1rem">' + (confirmReset ? '<span class="line">Reset all stats?</span><button type="button" class="btn danger" data-a="reset-yes">Reset</button><button type="button" class="btn quiet" data-a="reset-no">Cancel</button>' : '<button type="button" class="btn quiet" data-a="reset">Reset stats</button>') + "</div>";
    }
    render(false);
    cur.click = function (b) {
      var a = b.dataset.a;
      if (a === "reset") render(true);
      else if (a === "reset-no") render(false);
      else if (a === "reset-yes") {
        prog.tot = {}; prog.conf = {}; prog.log = []; prog.rounds = 0; prog.days = []; wkTot = {}; conf = []; persist(); render(false);
      }
    };
  }

  /* ---------- Settings ---------- */
  function settingsView() {
    var onoff = function (key, v) { return seg([["1", "On"], ["0", "Off"]], 'data-sel="' + key + '"', v ? "1" : "0", key); };
    var field = function (label, body) { return '<div class="field"><span class="lbl">' + label + "</span>" + body + "</div>"; };
    function render() {
      view.innerHTML = '<h2 class="title">Settings</h2>' +
        '<h3 class="sec">Sound</h3><div class="card">' +
        slider("p-droneVol", "Drone", prefs.droneVol, 0, 100, 1, "") + slider("p-noteVol", "Notes", prefs.noteVol, 0, 100, 1, "") +
        field("Instrument", seg(INSTR, 'data-sel="inst"', prefs.instrument, "Instrument")) + field("Cadence", onoff("cadence", prefs.cadence)) + "</div>" +
        '<h3 class="sec">Pace</h3><div class="card">' +
        slider("p-tempo", "Tempo", prefs.tempo, 20, 120, 5, "") + slider("p-pause", "Pause", prefs.pause, 0.5, 6, 0.5, "s") + "</div>" +
        '<h3 class="sec">Round</h3><div class="card">' +
        slider("p-keyEvery", "Key changes every", prefs.keyEvery, 1, 50, 1, "") + slider("p-count", "Questions", prefs.count, 5, 100, 5, "") +
        field("Labels", seg([["num", "1 ♭2 2"], ["sol", "do ra re"]], 'data-sel="labels"', prefs.labels, "Labels")) + field("Unlock all levels", onoff("unlockAll", prefs.unlockAll)) + "</div>" +
        '<h3 class="sec">Hands-free</h3><div class="card">' +
        slider("p-hfRepeat", "Repeat", prefs.hfRepeat, 1, 5, 1, "") + slider("p-hfWait", "Wait", prefs.hfWait, 0, 10, 0.5, "s") +
        slider("p-hfReplay", "Replay", prefs.hfReplay, 0, 4, 1, "") + slider("p-hfGap", "Gap", prefs.hfGap, 1, 10, 0.5, "s") + "</div>";
    }
    render();
    cur.input = function (el, done) {
      var k = el.dataset.k.replace(/^p-/, ""), v = +el.value;
      prefs[k] = v;
      $(el.id + "-v").textContent = fmt(v) + (el.dataset.u ? " " + el.dataset.u : "");
      if (k === "droneVol" || k === "noteVol") Snd.applyVol();
      if (done) { prefs = cleanPrefs(prefs); persist(); if (k === "noteVol" || k === "tempo") { Snd.ensure(); playMidi(midiOf(0, 7, 1), prefs.instrument, 0.8); } }
    };
    cur.click = function (b) {
      var s = b.dataset.sel, v = b.dataset.v;
      if (s === "inst") { prefs.instrument = v; Snd.ensure(); playMidi(midiOf(0, 7, 1), v, 0.8); }
      else if (s === "cadence") prefs.cadence = v === "1";
      else if (s === "unlockAll") prefs.unlockAll = v === "1";
      else if (s === "labels") prefs.labels = v;
      else return;
      persist(); render();
    };
    cur.stop = function () { Snd.stopAll(); };
  }

  /* ---------- account sync (whole document, newest save wins) ---------- */
  var syncBusy = false, syncTimer = null;
  var cloud = function () { return (self.MusicCloud && self.MusicCloud.configured && self.MusicCloud.user()) ? self.MusicCloud : null; };
  function queueSync(ms) {
    if (!cloud()) return;
    clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, ms == null ? 3000 : ms);
  }
  async function syncNow() {
    var c = cloud();
    if (!c) return;
    if (syncBusy) { queueSync(1500); return; }
    syncBusy = true;
    try {
      var me = c.user(), last = lsGet("ear:cloudUser");
      if (last && last !== me.id) return;                       // someone else's data on this device: leave both alone
      var remote = await c.load("ear");
      var rAt = (remote && Number(remote.savedAt)) || 0, lAt = prog.savedAt || 0;
      if (remote && rAt > lAt) {
        prefs = cleanPrefs(remote.prefs); prog = cleanProg(remote.progress); prog.savedAt = rAt;
        lsSet(PREFS_KEY, prefs); lsSet(PROG_KEY, prog);
        var scr = T.screen.split("/")[0];
        if (["front", "stats", "settings", "degrees", "custom", "melodies"].indexOf(scr) >= 0 && T.screen.indexOf("play") < 0) route();
      } else if (!remote || lAt > rAt) {
        await c.save("ear", { app: "ear", version: 1, savedAt: lAt, prefs: prefs, progress: prog });
      }
      lsSet("ear:cloudUser", me.id);
      try { localStorage.setItem("ear:syncedAt", String(Date.now())); } catch (e) {}
    } catch (e) { /* offline or not set up: it will try again at the next save */ }
    finally { syncBusy = false; }
  }
  if (self.MusicCloud && self.MusicCloud.configured) {
    self.MusicCloud.ready.then(function () { if (cloud()) syncNow(); });
    self.MusicCloud.onChange(function () { if (cloud()) syncNow(); });
  }

  route();

  /* ---------- offline: Music's shared service worker, one folder up ---------- */
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("../sw.js").catch(function () {}); });
  }
})();
