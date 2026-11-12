/* Tuner: listens through the microphone and shows how far the note is from a target, in cents.
   Everything runs in the browser (Web Audio); nothing is downloaded.
   Pipeline: detectPitch() reads a frame -> feed() smooths and picks the target -> paint() draws.
   feed(frame, sampleRate, t) is the same path the microphone uses, so tests can drive it with
   synthesized audio. Test hook: window.__tunerTest is written only, never read here. */

/* ---------- pitch detection (YIN, coarse on a decimated copy then refined at full rate) ----------
   Pure: a Float32Array and its sample rate in, a frequency in Hz (or null) out. Range 27 to 1450 Hz. */
function detectPitch(buf, sampleRate) {
  var n = buf ? buf.length : 0;
  if (n < 2048 || !sampleRate) return null;
  var i, k, sum = 0, mean = 0;
  for (i = 0; i < n; i++) { sum += buf[i] * buf[i]; mean += buf[i]; }
  mean /= n;
  if (Math.sqrt(sum / n - mean * mean) < 0.006) return null;       // too quiet
  var D = Math.max(1, Math.round(sampleRate / 12000));
  var m = Math.floor(n / D), x = new Float32Array(m), s;
  for (i = 0; i < m; i++) { s = 0; for (k = 0; k < D; k++) s += buf[i * D + k] - mean; x[i] = s / D; }
  var fs = sampleRate / D;
  var minTau = Math.max(2, Math.floor(fs / 1500));
  var maxTau = Math.min(Math.ceil(fs / 26), (m >> 1) - 2);
  var W = Math.min(m - maxTau - 1, 1700);
  if (W < 256 || maxTau <= minTau + 2) return null;
  var d = new Float32Array(maxTau + 2), c = new Float32Array(maxTau + 2), tau, j, diff;
  for (tau = 1; tau <= maxTau; tau++) {
    s = 0;
    for (j = 0; j < W; j++) { diff = x[j] - x[j + tau]; s += diff * diff; }
    d[tau] = s;
  }
  var run = 0;
  c[0] = 1;
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
  var coarse = (found + shift) * D;
  if (D === 1) return sampleRate / coarse;
  // refine at the full rate around the coarse period with a level-independent difference
  var lo = Math.max(2, Math.floor(coarse) - D - 1), hi = Math.ceil(coarse) + D + 1;
  var Wf = Math.min(n - hi - 2, Math.max(2048, Math.round(coarse * 2.5)));
  if (Wf < 512) return sampleRate / coarse;
  var r = new Float64Array(hi + 2), t, e0 = 0, e1, num;
  for (j = 0; j < Wf; j++) e0 += (buf[j] - mean) * (buf[j] - mean);
  for (t = lo - 1; t <= hi + 1; t++) {
    num = 0; e1 = 0;
    for (j = 0; j < Wf; j++) { var u = buf[j] - mean, v = buf[j + t] - mean; diff = u - v; num += diff * diff; e1 += v * v; }
    r[t] = num / (e0 + e1 + 1e-12);
  }
  var best = lo;
  for (t = lo; t <= hi; t++) if (r[t] < r[best]) best = t;
  var pa = r[best - 1], pb = r[best], pc = r[best + 1], pd = pa - 2 * pb + pc, ps = pd > 0 ? (pa - pc) / (2 * pd) : 0;
  if (!isFinite(ps) || Math.abs(ps) > 1) ps = 0;
  return sampleRate / (best + ps);
}

(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); };

  /* ---------- storage ---------- */
  var PREFS_KEY = "tuner:prefs:v1";
  var lsGet = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  var lsSet = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  /* ---------- the material ---------- */
  var NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  var LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function parseNote(s) {                       // "E♭2" -> { midi, letter, acc, oct }
    var mm = /^([A-G])([♭♯]?)(-?\d)$/.exec(s);
    var acc = mm[2] === "♭" ? -1 : mm[2] === "♯" ? 1 : 0;
    return { midi: (+mm[3] + 1) * 12 + LETTER[mm[1]] + acc, letter: mm[1], acc: mm[2], oct: +mm[3] };
  }
  var TUNINGS = [
    { group: "Guitar", id: "gtr-std", name: "Standard", s: "E2 A2 D3 G3 B3 E4" },
    { group: "Guitar", id: "gtr-dropd", name: "Drop D", s: "D2 A2 D3 G3 B3 E4" },
    { group: "Guitar", id: "gtr-eb", name: "Half step down", s: "E♭2 A♭2 D♭3 G♭3 B♭3 E♭4" },
    { group: "Guitar", id: "gtr-d", name: "Whole step down", s: "D2 G2 C3 F3 A3 D4" },
    { group: "Guitar", id: "gtr-dadgad", name: "DADGAD", s: "D2 A2 D3 G3 A3 D4" },
    { group: "Guitar", id: "gtr-og", name: "Open G", s: "D2 G2 D3 G3 B3 D4" },
    { group: "Guitar", id: "gtr-od", name: "Open D", s: "D2 A2 D3 F♯3 A3 D4" },
    { group: "Guitar", id: "gtr-oe", name: "Open E", s: "E2 B2 E3 G♯3 B3 E4" },
    { group: "Bass", id: "bas-4", name: "4 string", s: "E1 A1 D2 G2" },
    { group: "Bass", id: "bas-5", name: "5 string", s: "B0 E1 A1 D2 G2" },
    { group: "Bass", id: "bas-dropd", name: "Drop D", s: "D1 A1 D2 G2" },
    { group: "Ukulele", id: "uke", name: "Standard", s: "G4 C4 E4 A4" }
  ];
  TUNINGS.forEach(function (t) { t.strings = t.s.split(" ").map(parseNote); });
  var tuningOf = function (id) { for (var i = 0; i < TUNINGS.length; i++) if (TUNINGS[i].id === id) return TUNINGS[i]; return TUNINGS[0]; };
  var MODES = [["auto", "Auto"], ["string", "String"], ["chromatic", "Chromatic"]];
  var A4_MIN = 430, A4_MAX = 450;

  var P = { tuning: "gtr-std", mode: "auto", a4: 440, ref: false };
  (function () {
    var p = lsGet(PREFS_KEY);
    if (!p || typeof p !== "object") return;
    if (TUNINGS.some(function (t) { return t.id === p.tuning; })) P.tuning = p.tuning;
    if (MODES.some(function (m) { return m[0] === p.mode; })) P.mode = p.mode;
    if (typeof p.a4 === "number" && p.a4 >= A4_MIN && p.a4 <= A4_MAX) P.a4 = Math.round(p.a4);
    P.ref = p.ref === true;
  })();
  var savePrefs = function () { lsSet(PREFS_KEY, P); };

  var freqOf = function (midi) { return P.a4 * Math.pow(2, (midi - 69) / 12); };
  var centsBetween = function (hz, ref) { return 1200 * Math.log(hz / ref) / Math.LN2; };
  var cur = function () { return tuningOf(P.tuning); };

  /* ---------- test hook (written only) ---------- */
  var T = window.__tunerTest = { hz: null, note: "", cents: null, string: null, stringName: "", state: "idle", inTune: false, checks: [], listening: false, wake: false,
    toneHz: null, tones: 0, mic: "", frames: 0, feed: null, detect: detectPitch, a4: 440, mode: "auto", tuning: "" };

  /* ---------- state ---------- */
  var HOLD_MS = 600, DWELL_MS = 350, HIST_N = 5, TONE_MS = 2700;
  var hist = [], pend = null, pendT = 0, lastGood = -1e9, seen = false;
  var curStr = null, dispN = null, lockStr = 0, inTune = false, tuneSince = null;
  var checks = {};                                  // string index -> true, for the current tuning
  var D = { state: "idle", note: null, cents: 0, hz: null, str: null };
  var listening = false, errMsg = "", toneUntil = 0, toneStr = null, toneTimer = 0;

  function median(a) { var b = a.slice().sort(function (x, y) { return x - y; }); return b[b.length >> 1]; }
  function noteOfMidi(n) { return { letter: NAMES[((n % 12) + 12) % 12][0], acc: NAMES[((n % 12) + 12) % 12].slice(1), oct: Math.floor(n / 12) - 1 }; }
  function resetTracking() { hist = []; pend = null; curStr = null; dispN = null; inTune = false; tuneSince = null; }

  function accept(hz, t) {                          // returns true when the reading joins the history
    if (pend !== null && t - pendT > 500) pend = null;
    if (hist.length) {
      if (Math.abs(centsBetween(hz, median(hist))) <= 100) { push(hz); lastGood = t; pend = null; return true; }
    }
    if (pend !== null && Math.abs(centsBetween(hz, pend)) <= 60) { hist = [pend, hz]; pend = null; lastGood = t; return true; }
    pend = hz; pendT = t;                           // a jump needs a second matching reading
    return false;
  }
  function push(hz) { hist.push(hz); if (hist.length > HIST_N) hist.shift(); }

  function aim(hz, t) {                             // choose the target and the cents from it
    var tu = cur(), str = null, note, cents, i;
    if (P.mode === "chromatic") {
      var mf = 69 + 12 * Math.log(hz / P.a4) / Math.LN2;
      if (dispN === null || Math.abs(mf - dispN) >= 0.6) dispN = Math.round(mf);
      cents = (mf - dispN) * 100; note = noteOfMidi(dispN);
    } else {
      if (P.mode === "string") str = Math.min(lockStr, tu.strings.length - 1);
      else {
        var bi = 0, bd = 1e9, dc = 1e9;
        for (i = 0; i < tu.strings.length; i++) {
          var dd = Math.abs(centsBetween(hz, freqOf(tu.strings[i].midi)));
          if (dd < bd) { bd = dd; bi = i; }
          if (i === curStr) dc = dd;
        }
        if (curStr === null || bd < dc - 15) curStr = bi;
        str = curStr;
      }
      note = tu.strings[str]; cents = centsBetween(hz, freqOf(note.midi));
    }
    var was = inTune;
    inTune = Math.abs(cents) <= (was ? 7 : 5);
    if (inTune) {
      if (tuneSince === null) tuneSince = t;
      if (str !== null && t - tuneSince >= DWELL_MS && !checks[str]) checks[str] = true;
    } else tuneSince = null;
    D.note = note; D.cents = cents; D.hz = hz; D.str = str;
  }

  /* One frame in (or null for none), the display state out. t is a clock in ms (default: now). */
  function feed(frame, sampleRate, t) {
    var now = performance.now();
    if (t == null) t = now;
    T.frames++;
    if (now < toneUntil) return D;                  // a reference tone is sounding: do not hear it
    seen = true;
    var hz = frame ? detectPitch(frame, sampleRate) : null, fresh = false;
    if (hz !== null && hz >= 26 && hz <= 1450) fresh = accept(hz, t);
    if (fresh) { aim(median(hist), t); D.state = "reading"; }
    else if (hist.length && t - lastGood <= HOLD_MS) D.state = "hold";
    else {
      if (D.state === "reading" || D.state === "hold") { resetTracking(); D.hz = null; D.cents = 0; }
      D.state = "rest";
    }
    paint();
    return D;
  }
  T.feed = feed;

  /* ---------- drawing ---------- */
  var ICON = {
    check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.500 6.500 12 13 4.500"/></svg>',
    up: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tune up" role="img"><path d="M8 13.500V2.800M3.500 7 8 2.500 12.500 7"/></svg>',
    down: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tune down" role="img"><path d="M8 2.500v10.700M3.500 9 8 13.500 12.500 9"/></svg>',
    spk: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.500 6h2.500L8.500 3v10L5 10H2.500z" fill="currentColor"/><path d="M11 5.200a4 4 0 0 1 0 5.600M12.900 3.400a6.500 6.500 0 0 1 0 9.200" fill="none" stroke="currentColor" stroke-width="1.400" stroke-linecap="round"/></svg>',
    minus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" aria-hidden="true"><path d="M3.500 8h9"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" aria-hidden="true"><path d="M3.500 8h9M8 3.500v9"/></svg>'
  };
  var CX = 160, CY = 180, SWEEP = 62;
  var polar = function (r, deg) { var a = deg * Math.PI / 180; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; };
  var f1 = function (v) { return v.toFixed(1); };
  function arcPath(r, c0, c1) {
    var p0 = polar(r, c0 / 50 * SWEEP), p1 = polar(r, c1 / 50 * SWEEP);
    return "M" + f1(p0[0]) + " " + f1(p0[1]) + "A" + r + " " + r + " 0 0 1 " + f1(p1[0]) + " " + f1(p1[1]);
  }
  function buildDial() {
    var h = '<path class="g-track" d="' + arcPath(124, -50, 50) + '"/><path class="g-band" d="' + arcPath(124, -5, 5) + '"/>';
    for (var c = -50; c <= 50; c += 5) {
      var big = c % 50 === 0 || c === 0, mid = c % 10 === 0, len = big ? 16 : mid ? 11 : 7;
      var a = polar(137, c / 50 * SWEEP), b = polar(137 + len, c / 50 * SWEEP);
      h += '<line class="g-tick' + (c === 0 ? " zero" : "") + '" x1="' + f1(a[0]) + '" y1="' + f1(a[1]) + '" x2="' + f1(b[0]) + '" y2="' + f1(b[1]) + '" stroke-width="' + (big ? 3.5 : mid ? 2.5 : 1.8) + '"/>';
    }
    h += '<text class="g-flat" id="g-flat" x="' + (CX - 116) + '" y="162">♭</text><text class="g-sharp" id="g-sharp" x="' + (CX + 116) + '" y="162">♯</text>';
    h += '<g class="needle" id="needle"><line x1="' + CX + '" y1="' + (CY - 100) + '" x2="' + CX + '" y2="' + (CY - 140) + '"/></g>';
    $("dial").innerHTML = h;
  }
  var needle, noteEl;
  function setNote(n) {
    var q = noteEl.children;
    q[0].textContent = n ? n.letter : "–"; q[1].textContent = n ? n.acc : ""; q[2].textContent = n ? String(n.oct) : "";
  }
  var fmt = function (c) { var r = Math.round(c); return (r > 0 ? "+" : r < 0 ? "−" : "") + Math.abs(r); };

  function paint() {
    var tu = cur(), live = D.state === "reading" || D.state === "hold", toning = toneStr !== null && performance.now() < toneUntil;
    var note = D.note, cents = D.cents, str = D.str, state = D.state;
    if (toning) { note = tu.strings[toneStr]; str = toneStr; live = false; state = "tone"; cents = 0; }
    else if (P.mode === "string" && !live) { note = tu.strings[Math.min(lockStr, tu.strings.length - 1)]; str = Math.min(lockStr, tu.strings.length - 1); }
    else if (state === "idle") note = null;
    if (state === "idle" && listening) state = "rest";
    var tuned = live && inTune;
    $("gauge").dataset.live = live ? "1" : "0"; $("gauge").dataset.tune = tuned ? "1" : "0";
    setNote(note);
    var shown = live ? Math.max(-50, Math.min(50, cents)) : 0;
    needle.style.transform = "rotate(" + (shown / 50 * SWEEP).toFixed(2) + "deg)";
    $("dial").setAttribute("aria-valuenow", String(Math.round(shown)));
    $("g-flat").classList.toggle("on", live && cents < -5); $("g-sharp").classList.toggle("on", live && cents > 5);
    $("cents").textContent = live ? fmt(Math.max(-999, Math.min(999, cents))) : "–";
    $("hz").textContent = live && D.hz ? (D.hz < 100 ? D.hz.toFixed(2) : D.hz.toFixed(1)) + " Hz" : "";
    var st = $("status");
    if (tuned) { st.innerHTML = ICON.check; st.className = "status ok"; }
    else if (live && cents < -5) { st.innerHTML = ICON.up; st.className = "status"; }
    else if (live && cents > 5) { st.innerHTML = ICON.down; st.className = "status"; }
    else { st.innerHTML = ""; st.className = "status"; }

    // strings
    var btns = $("strs").children, i;
    for (i = 0; i < btns.length; i++) {
      var b = btns[i], isCur = (P.mode === "string" && i === Math.min(lockStr, tu.strings.length - 1)) || (P.mode === "auto" && live && i === str);
      b.classList.toggle("on", isCur && !tuned); b.classList.toggle("tuned", isCur && tuned);
      b.classList.toggle("done", !!checks[i]); b.classList.toggle("playing", toning && i === toneStr);
      b.setAttribute("aria-pressed", isCur ? "true" : "false");
    }
    $("go").textContent = listening ? "Stop" : errMsg ? "Retry" : "Start";
    $("go").classList.toggle("stop", listening);
    $("err").hidden = !errMsg; $("err").textContent = errMsg;

    // hook
    T.state = toning ? "tone" : errMsg && !listening ? (errMsg === "Microphone blocked." ? "denied" : "unavailable") : (state === "idle" && !listening ? "idle" : state);
    T.hz = live && D.hz ? D.hz : null; T.cents = live ? cents : null;
    T.note = live && note ? note.letter + note.acc + note.oct : ""; T.string = live && str !== null ? str : null;
    T.stringName = live && str !== null ? tu.strings[str].letter + tu.strings[str].acc + tu.strings[str].oct : "";
    T.inTune = tuned; T.listening = listening; T.checks = tu.strings.map(function (_, k) { return !!checks[k]; });
    T.a4 = P.a4; T.mode = P.mode; T.tuning = P.tuning;
  }
  window.__tunerContext = function () {
    var tu = cur(), s = "Tuner: " + P.mode + " mode, " + tu.group + " " + tu.name + " (" + tu.s + "), A4 " + P.a4 + " Hz, " + (listening ? "listening" : "stopped") + ".";
    if (D.state === "reading" || D.state === "hold") s += " Hearing " + (D.hz ? D.hz.toFixed(1) : "?") + " Hz, " + fmt(D.cents) + " cents.";
    return s;
  };

  function buildStatic() {
    $("mode").innerHTML = MODES.map(function (m) { return '<button type="button" role="radio" data-mode="' + m[0] + '" aria-checked="' + (P.mode === m[0]) + '">' + m[1] + "</button>"; }).join("");
    $("ref-btn").innerHTML = ICON.spk; $("a4-dn").innerHTML = ICON.minus; $("a4-up").innerHTML = ICON.plus;
  }
  function buildTuning() {
    var tu = cur();
    $("tuning-name").textContent = tu.group + " · " + tu.name;
    $("strs").innerHTML = tu.strings.map(function (n, i) {
      return '<button type="button" class="str" data-str="' + i + '" aria-label="String ' + (i + 1) + ', ' + n.letter + n.acc + n.oct + '">' + esc(n.letter + n.acc) + "<small>" + n.oct + '</small><span class="done" aria-hidden="true">' + ICON.check + "</span></button>";
    }).join("");
  }
  function buildPrefs() {
    $("a4-val").textContent = String(P.a4);
    $("a4-dn").disabled = P.a4 <= A4_MIN; $("a4-up").disabled = P.a4 >= A4_MAX;
    $("ref-btn").setAttribute("aria-pressed", String(P.ref));
    $("strings-card").hidden = P.mode === "chromatic";
    var rs = $("mode").children;
    for (var i = 0; i < rs.length; i++) rs[i].setAttribute("aria-checked", String(rs[i].dataset.mode === P.mode));
  }

  /* ---------- reference tone ---------- */
  var ctx = null;
  function audio() {
    if (!ctx) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; try { ctx = new AC(); } catch (e) { return null; } }
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function playTone(idx) {
    var c = audio(); if (!c) return;
    var hz = freqOf(cur().strings[idx].midi), t0 = c.currentTime + 0.02, dur = 2.5;
    var master = c.createGain(); master.gain.value = 0.32; master.connect(c.destination);
    var boost = hz < 120 ? 1.6 : 1;
    [1, 2, 3, 4, 5, 6].forEach(function (h, k) {
      if (hz * h > c.sampleRate / 2.2) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = hz * h;
      var amp = [1, .55, .38, .22, .14, .09][k] * (k > 0 ? boost : 1) / (k === 0 ? 1.4 : 2.2);
      var life = dur / Math.pow(h, .55);
      g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(amp, t0 + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0002, t0 + life);
      o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + life + 0.05);
      o.onended = function () { try { g.disconnect(); } catch (e) {} };
    });
    setTimeout(function () { try { master.disconnect(); } catch (e) {} }, (dur + 0.3) * 1000);
    T.toneHz = hz; T.tones++;
    toneStr = idx; toneUntil = performance.now() + TONE_MS;
    resetTracking(); D.state = "rest"; D.hz = null; D.cents = 0;
    clearTimeout(toneTimer);
    toneTimer = setTimeout(function () { toneStr = null; toneUntil = 0; paint(); }, TONE_MS);
    paint();
  }

  /* ---------- microphone ---------- */
  var stream = null, src = null, an = null, buf = null, raf = 0, lastRun = 0, wl = null;
  async function lockScreen() {
    try {
      if (navigator.wakeLock && navigator.wakeLock.request) {
        wl = await navigator.wakeLock.request("screen"); T.wake = true;
        wl.addEventListener("release", function () { T.wake = false; });
      }
    } catch (e) {}
  }
  function unlockScreen() { try { if (wl) wl.release(); } catch (e) {} wl = null; T.wake = false; }
  function setSession(type) { try { if (navigator.audioSession) navigator.audioSession.type = type; } catch (e) {} }

  async function startMic() {
    if (listening) return;
    errMsg = ""; paint();
    var c = audio();
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !c) throw new Error("none");
      setSession("play-and-record");
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) {
      releaseMic();
      errMsg = e && /denied|NotAllowed|Permission|Security/i.test(String(e.name || e.message)) ? "Microphone blocked." : "Microphone unavailable.";
      T.mic = errMsg; paint(); return;
    }
    try { await c.resume(); } catch (e) {}
    src = c.createMediaStreamSource(stream);
    an = c.createAnalyser(); an.fftSize = 8192; an.smoothingTimeConstant = 0;
    src.connect(an); buf = new Float32Array(an.fftSize);
    listening = true; T.mic = "on"; resetTracking(); D.state = "rest"; D.hz = null; D.cents = 0;
    lockScreen(); paint();
    raf = requestAnimationFrame(loop);
  }
  function loop(ts) {
    if (!listening) return;
    raf = requestAnimationFrame(loop);
    if (ts - lastRun < 45) return;
    lastRun = ts;
    an.getFloatTimeDomainData(buf);
    feed(buf, ctx.sampleRate, performance.now());
  }
  function releaseMic() {
    if (raf) cancelAnimationFrame(raf); raf = 0;
    try { if (src) src.disconnect(); } catch (e) {} src = null; an = null;
    if (stream) { try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {} stream = null; }
    setSession("playback"); unlockScreen();
  }
  function stopMic() {
    listening = false; releaseMic(); T.mic = "off";
    resetTracking(); D.state = "idle"; D.note = null; D.hz = null; D.cents = 0; seen = false;
    paint();
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden && listening) stopMic(); });
  window.addEventListener("pagehide", function () { if (listening) stopMic(); });

  /* ---------- tuning sheet ---------- */
  var sheetOpener = null;
  function openSheet() {
    closeSheet(true);
    var groups = [], h = "";
    TUNINGS.forEach(function (t) { if (groups.indexOf(t.group) < 0) groups.push(t.group); });
    groups.forEach(function (g) {
      h += "<h2>" + g + "</h2>";
      TUNINGS.filter(function (t) { return t.group === g; }).forEach(function (t) {
        h += '<button type="button" class="opt" role="radio" data-tuning="' + t.id + '" aria-checked="' + (t.id === P.tuning) + '"><span class="t"><span class="n">' + esc(t.name) + '</span><span class="s">' + esc(t.s) + "</span></span>" + ICON.check + "</button>";
      });
    });
    var el = document.createElement("div");
    el.className = "scrim"; el.id = "scrim";
    el.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" aria-label="Tuning"><div role="radiogroup" aria-label="Tuning">' + h + "</div></div>";
    document.body.appendChild(el);
    sheetOpener = document.activeElement;
    var on = el.querySelector('[aria-checked="true"]'); if (on) { on.focus({ preventScroll: true }); on.scrollIntoView({ block: "center" }); }
  }
  function closeSheet(quiet) {
    var el = $("scrim"); if (!el) return;
    el.remove();
    if (!quiet && sheetOpener && sheetOpener.focus) sheetOpener.focus({ preventScroll: true });
  }

  /* ---------- actions ---------- */
  function setMode(m) { P.mode = m; resetTracking(); D.note = null; D.state = listening ? "rest" : "idle"; D.hz = null; D.cents = 0; savePrefs(); buildPrefs(); paint(); }
  function setTuning(id) {
    P.tuning = id; checks = {}; lockStr = 0; resetTracking(); D.note = null; D.state = listening ? "rest" : "idle"; D.hz = null; D.cents = 0;
    savePrefs(); buildTuning(); buildPrefs(); paint();
  }
  function setA4(v) {
    v = Math.max(A4_MIN, Math.min(A4_MAX, v)); if (v === P.a4) return;
    P.a4 = v; savePrefs(); buildPrefs();
    var keep = hist.slice(); resetTracking();
    if (keep.length && (D.state === "reading" || D.state === "hold")) { hist = keep; aim(median(hist), lastGood); }
    paint();
  }

  var press = null;
  function onStrDown(e) {
    var b = e.target.closest(".str"); if (!b) return;
    var idx = +b.dataset.str;
    press = { idx: idx, long: false, timer: setTimeout(function () { press.long = true; playTone(idx); }, 550) };
  }
  function onStrUp() { if (press) clearTimeout(press.timer); }
  $("strs").addEventListener("pointerdown", onStrDown);
  $("strs").addEventListener("pointerup", onStrUp);
  $("strs").addEventListener("pointercancel", function () { if (press) { clearTimeout(press.timer); press.long = true; } });
  $("strs").addEventListener("contextmenu", function (e) { e.preventDefault(); });
  $("strs").addEventListener("click", function (e) {
    var b = e.target.closest(".str"); if (!b) return;
    if (press && press.long) { press = null; return; }
    press = null;
    var idx = +b.dataset.str;
    if (P.mode === "string") { lockStr = idx; resetTracking(); if (D.state === "reading" || D.state === "hold") D.state = "rest"; D.hz = null; D.cents = 0; }
    if (P.ref) playTone(idx); else paint();
  });
  $("mode").addEventListener("click", function (e) { var b = e.target.closest("[data-mode]"); if (b) setMode(b.dataset.mode); });
  $("go").addEventListener("click", function () { if (listening) stopMic(); else startMic(); });
  $("tuning-btn").addEventListener("click", openSheet);
  $("reset-btn").addEventListener("click", function () { checks = {}; tuneSince = null; paint(); });
  $("ref-btn").addEventListener("click", function () { P.ref = !P.ref; savePrefs(); buildPrefs(); });
  $("a4-dn").addEventListener("click", function () { setA4(P.a4 - 1); });
  $("a4-up").addEventListener("click", function () { setA4(P.a4 + 1); });
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-tuning]");
    if (o) { closeSheet(); if (o.dataset.tuning !== P.tuning) setTuning(o.dataset.tuning); return; }
    if (e.target.id === "scrim") closeSheet();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });

  /* ---------- go ---------- */
  buildDial(); needle = $("needle"); noteEl = $("note");
  buildStatic(); buildTuning(); buildPrefs(); paint();
})();
