/* Circle of Fifths: the circle, and under it everything that belongs to the selected key.
   Reads shared/theory.js (spelling, modes, chord tones) so it spells notes the way Library does.

   Positions run clockwise from the top: 0 = C ... 11 = F. Position p holds the major key
   whose tonic is 7p semitones above C and, inside it, that key's relative minor.
   Addresses:  #/<pc>/<major|minor>   pc = 0-11 of the key's tonic (C = 0). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); };
  var mod = function (n, m) { return ((n % m) + m) % m; };

  /* ---------- keys ---------- */
  var PREF = "circle:prefs:v1";
  var MAJ_ROOTS = [{ l: 0, a: 0 }, { l: 4, a: 0 }, { l: 1, a: 0 }, { l: 5, a: 0 }, { l: 2, a: 0 }, { l: 6, a: 0 }, null, { l: 1, a: -1 }, { l: 5, a: -1 }, { l: 2, a: -1 }, { l: 6, a: -1 }, { l: 3, a: 0 }];
  var MIN_ROOTS = [{ l: 5, a: 0 }, { l: 2, a: 0 }, { l: 6, a: 0 }, { l: 3, a: 1 }, { l: 0, a: 1 }, { l: 4, a: 1 }, null, { l: 6, a: -1 }, { l: 3, a: 0 }, { l: 0, a: 0 }, { l: 4, a: 0 }, { l: 1, a: 0 }];
  var SIX = { maj: [{ l: 3, a: 1 }, { l: 4, a: -1 }], min: [{ l: 1, a: 1 }, { l: 2, a: -1 }] };   // [sharp, flat] spelling at 6 o'clock
  var majRoot = function (pos, flat) { return pos === 6 ? SIX.maj[flat ? 1 : 0] : MAJ_ROOTS[pos]; };
  var minRoot = function (pos, flat) { return pos === 6 ? SIX.min[flat ? 1 : 0] : MIN_ROOTS[pos]; };
  var pcOf = function (r) { return mod(NAT[r.l] + r.a, 12); };
  var SHARPS = ["F", "C", "G", "D", "A", "E", "B"], FLATS = ["B", "E", "A", "D", "G", "C", "F"];
  // Key signature at a position: count and kind. Position 6 is 6 sharps or 6 flats.
  function sigAt(pos, flat) {
    if (pos === 6) return { n: 6, kind: flat ? "♭" : "♯" };
    if (pos === 0) return { n: 0, kind: "" };
    return pos < 6 ? { n: pos, kind: "♯" } : { n: 12 - pos, kind: "♭" };
  }
  var sigWords = function (sg) { return sg.n === 0 ? "no sharps or flats" : sg.n + (sg.kind === "♯" ? (sg.n === 1 ? " sharp" : " sharps") : (sg.n === 1 ? " flat" : " flats")); };
  var spoken = function (s) { return s.replace(/♯/g, " sharp").replace(/♭/g, " flat"); };
  var posFromHash = function (pc, mode) { return mode === "major" ? mod(pc * 7, 12) : mod((pc + 3) * 7, 12); };

  /* ---------- state ---------- */
  var st = { pos: 0, mode: "major", sev: false, rotate: false, flat: false };
  var ui = { active: null, prog: null, noteOn: -1 };
  var T = window.__circleTest = { selected: "", pos: 0, mode: "major", pc: 0, highlighted: [], active: null, activeLog: [], lastScale: null, lastChord: null, lastSeq: null, rotation: 0, top: 0 };

  function load() {
    try {
      var p = JSON.parse(localStorage.getItem(PREF) || "null");
      if (p && typeof p === "object") {
        if (Number.isInteger(p.pos) && p.pos >= 0 && p.pos < 12) st.pos = p.pos;
        if (p.mode === "major" || p.mode === "minor") st.mode = p.mode;
        st.sev = p.sev === true; st.rotate = p.rotate === true; st.flat = p.flat === true;
      }
    } catch (e) {}
  }
  function save() { try { localStorage.setItem(PREF, JSON.stringify(st)); } catch (e) {} }
  function parseHash() {
    var p = location.hash.replace(/^#\/?/, "").split("/");
    var pc = parseInt(p[0], 10);
    if (String(pc) !== p[0] || pc < 0 || pc > 11 || (p[1] !== "major" && p[1] !== "minor")) return null;
    return { pos: posFromHash(pc, p[1]), mode: p[1] };
  }

  /* ---------- theory for the selected key ---------- */
  function keyOf(s) {
    var major = s.mode === "major";
    var root = major ? majRoot(s.pos, s.flat) : minRoot(s.pos, s.flat);
    var rel = major ? minRoot(s.pos, s.flat) : majRoot(s.pos, s.flat);
    var semis = MODES[major ? 0 : 5].semis;
    var pc = pcOf(root);
    return {
      pos: s.pos, mode: s.mode, major: major, root: root, pc: pc, S: semis, sig: sigAt(s.pos, s.flat),
      name: rootName(root) + (major ? "" : "m"), full: rootName(root) + (major ? " major" : " minor"),
      relName: rootName(rel) + (major ? " minor" : " major"),
      base: (pc <= 5 ? 60 : 48) + pc,
      mode_id: major ? "ionian" : "aeolian"
    };
  }
  var K = keyOf(st);
  var S = function (i) { return K.S[mod(i, 7)] + 12 * Math.floor(i / 7); };
  var scaleNotes = function () { return K.S.map(function (sm, i) { return { name: spell(K.root, i, sm), deg: degLabel(i, sm), midi: K.base + sm }; }); };
  var degRoot = function (i) { return { l: (K.root.l + i) % 7, a: accOf(K.root, i, K.S[i]) }; };
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];
  var SUFFIX = { maj: "", min: "m", dim: "dim", maj7: "maj7", dom7: "7", m7: "m7", m7b5: "m7♭5" };
  var QSIG = { "4,7": "maj", "3,7": "min", "3,6": "dim", "4,7,11": "maj7", "4,7,10": "dom7", "3,7,10": "m7", "3,6,10": "m7b5" };
  var LOWER = { min: 1, dim: 1, m7: 1, m7b5: 1 };
  var NUM_SUFFIX = { maj: "", min: "", dim: "°", maj7: "maj7", dom7: "7", m7: "7", m7b5: "ø7" };

  // A chord on scale degree i (0-6) from a list of [letter steps, semitones] above its root.
  function mkChord(i, tones) {
    var root = degRoot(i), rpc = pcOf(root);
    var rootMidi = 55 + mod(rpc - 55, 12);
    var qid = QSIG[tones.slice(1).map(function (t) { return t[1]; }).join(",")] || "maj";
    var rn = ROMAN[i];
    return {
      deg: i, qid: qid, rpc: rpc,
      name: rootName(root) + SUFFIX[qid],
      notes: tones.map(function (t) { return spell(root, t[0], t[1]); }),
      ncls: tones.map(function (t) { return ["d-r", "d-n", "d-3", "d-n", "d-5", "d-n", "d-7"][t[0]] || "d-n"; }),
      midis: tones.map(function (t) { return rootMidi + t[1]; }),
      numeral: (LOWER[qid] ? rn.toLowerCase() : rn) + NUM_SUFFIX[qid]
    };
  }
  function diatonic(i, sev) {
    var steps = sev ? [0, 2, 4, 6] : [0, 2, 4];
    return mkChord(i, steps.map(function (s) { return [s, S(i + s) - S(i)]; }));
  }
  function withQuality(i, qid) {
    var q = TRIADS.concat(SEVENTHS).filter(function (x) { return x.id === qid; })[0];
    return mkChord(i, q.tones);
  }
  var chordsOf = function (sev) { return [0, 1, 2, 3, 4, 5, 6].map(function (i) { return diatonic(i, sev); }); };

  // Where each scale degree sits on the circle: [ring, position].
  function degMap() {
    var p = K.pos, P = function (x) { return mod(x, 12); };
    return K.major
      ? [["maj", p], ["min", P(p - 1)], ["min", P(p + 1)], ["maj", P(p - 1)], ["maj", P(p + 1)], ["min", p], ["min", P(p + 2)]]
      : [["min", p], ["min", P(p + 2)], ["maj", p], ["min", P(p - 1)], ["min", P(p + 1)], ["maj", P(p - 1)], ["maj", P(p + 1)]];
  }
  var DEGCLS = ["d-r", "d-n", "d-3", "d-4", "d-5", "d-6", "d-7"];   // colour of the degree the chord's root is on

  var PROGS = {
    major: [
      { id: "I-IV-V-I", label: "I–IV–V–I", s: [0, 3, 4, 0] },
      { id: "I-V-vi-IV", label: "I–V–vi–IV", s: [0, 4, 5, 3] },
      { id: "ii-V-I", label: "ii–V–I", s: [1, 4, 0] },
      { id: "vi-IV-I-V", label: "vi–IV–I–V", s: [5, 3, 0, 4] },
      { id: "I-vi-IV-V", label: "I–vi–IV–V", s: [0, 5, 3, 4] },
      { id: "blues", label: "12-bar blues", s: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], q: "dom7" }
    ],
    minor: [
      { id: "i-iv-v-i", label: "i–iv–v–i", s: [0, 3, 4, 0] },
      { id: "i-VI-III-VII", label: "i–VI–III–VII", s: [0, 5, 2, 6] },
      { id: "i-iv-VII-III", label: "i–iv–VII–III", s: [0, 3, 6, 2] },
      { id: "ii-V-i", label: "ii°–V–i", s: [1, { d: 4, q: "maj" }, 0] }
    ]
  };
  function progChords(p) {
    return p.s.map(function (x) {
      var d = typeof x === "number" ? x : x.d;
      var q = p.q || (typeof x === "object" ? (st.sev ? "dom7" : x.q) : null);
      return q ? withQuality(d, q) : diatonic(d, st.sev);
    });
  }

  /* ---------- the circle ---------- */
  var CX = 180, R_BAND = 154, R_MAJ = 108, R_MIN = 60, R_OUT = 180;
  var pt = function (r, a) { return [CX + r * Math.sin(a), CX - r * Math.cos(a)]; };
  var f1 = function (n) { return n.toFixed(2); };
  function wedge(rO, rI, pos) {
    var a1 = (pos * 30 - 15) * Math.PI / 180, a2 = (pos * 30 + 15) * Math.PI / 180;
    var p1 = pt(rO, a1), p2 = pt(rO, a2), p3 = pt(rI, a2), p4 = pt(rI, a1);
    return "M" + f1(p1[0]) + " " + f1(p1[1]) + "A" + rO + " " + rO + " 0 0 1 " + f1(p2[0]) + " " + f1(p2[1]) +
      "L" + f1(p3[0]) + " " + f1(p3[1]) + "A" + rI + " " + rI + " 0 0 0 " + f1(p4[0]) + " " + f1(p4[1]) + "Z";
  }
  var centre = function (r, pos) { var p = pt(r, pos * 30 * Math.PI / 180); return "translate(" + f1(p[0]) + " " + f1(p[1]) + ")"; };
  var ring = $("circle");

  function buildCircle() {
    var h = '<g class="rot">';
    for (var pos = 0; pos < 12; pos++) {
      var sg = sigAt(pos, st.flat), six = pos === 6;
      var mj = six ? "F♯/G♭" : rootName(MAJ_ROOTS[pos]);
      var mnA = six ? "D♯m" : rootName(MIN_ROOTS[pos]) + "m", mnB = "E♭m";
      var bandTxt = six ? "6♯/6♭" : String(sg.n) + sg.kind;
      var maj = (six ? "F sharp or G flat" : spoken(rootName(MAJ_ROOTS[pos]))) + " major, " + (six ? "6 sharps or 6 flats" : sigWords(sg));
      var min = (six ? "D sharp or E flat" : spoken(rootName(MIN_ROOTS[pos]))) + " minor, " + (six ? "6 sharps or 6 flats" : sigWords(sg));
      h += '<g class="seg maj" data-ring="maj" data-pos="' + pos + '" role="button" tabindex="0" aria-pressed="false" aria-label="' + maj + '">' +
        '<path class="wb" d="' + wedge(R_OUT, R_BAND, pos) + '"/><path class="w" d="' + wedge(R_BAND, R_MAJ, pos) + '"/>' +
        '<g transform="' + centre(167, pos) + '"><g class="lab">' + (six ? '<text class="bt" y="-6.500">6♯</text><text class="bt" y="6.500">6♭</text>' : '<text class="bt">' + bandTxt + '</text>') + '</g></g>' +
        '<g transform="' + centre(133, pos) + '"><g class="lab" data-h="' + (six ? 18 : 20) + '"><text class="nm' + (six ? " s" : "") + '" data-h="' + (six ? 18 : 20) + '">' + mj + '</text>' + pillSvg() + '</g></g></g>';
      h += '<g class="seg min" data-ring="min" data-pos="' + pos + '" role="button" tabindex="0" aria-pressed="false" aria-label="' + min + '">' +
        '<path class="w" d="' + wedge(R_MAJ, R_MIN, pos) + '"/>' +
        '<g transform="' + centre(84, pos) + '"><g class="lab">' +
        (six ? '<text class="nm s" data-h="14">' + mnA + '</text><text class="nm s" data-h="14">' + mnB + '</text>'
             : '<text class="nm" data-h="16">' + mnA + '</text>') + pillSvg() + '</g></g></g>';
    }
    h += '</g><circle class="hub" cx="180" cy="180" r="56"/><text class="hub-n" id="hub-n" x="180" y="171"></text><text class="hub-m" id="hub-m" x="180" y="196"></text>';
    ring.innerHTML = h;
    var segs = ring.querySelectorAll(".seg");
    for (var i = 0; i < segs.length; i++) layout(segs[i], false);
  }
  function pillSvg() { return '<g class="pill d-n" hidden><rect y="-9" height="18" rx="9"/><text y="1"></text></g>'; }
  // Stack a label's name line(s) and numeral pill around the centre of its segment.
  function layout(seg, withPill) {
    var names = seg.querySelectorAll(".nm"), pill = seg.querySelector(".pill");
    var hs = [].map.call(names, function (n) { return +n.getAttribute("data-h"); });
    if (withPill) hs.push(18);
    var total = hs.reduce(function (a, b) { return a + b; }, 0) + 2 * (hs.length - 1), y = -total / 2;
    for (var j = 0; j < hs.length; j++) {
      var c = y + hs[j] / 2;
      if (j < names.length) names[j].setAttribute("y", f1(c)); else pill.setAttribute("transform", "translate(0 " + f1(c) + ")");
      y += hs[j] + 2;
    }
  }
  function setPill(seg, text, cls) {
    var pill = seg.querySelector(".pill");
    if (!text) { pill.setAttribute("hidden", ""); layout(seg, false); return; }
    pill.removeAttribute("hidden");
    pill.setAttribute("class", "pill " + cls);
    var w = Math.max(24, text.length * 8.4 + 12);
    var r = pill.querySelector("rect"); r.setAttribute("x", f1(-w / 2)); r.setAttribute("width", f1(w));
    pill.querySelector("text").textContent = text;
    layout(seg, true);
  }
  var segEl = function (rg, pos) { return ring.querySelector('.seg[data-ring="' + rg + '"][data-pos="' + pos + '"]'); };

  var rotCur = 0;
  function setRot(instant) {
    var target = st.rotate ? -st.pos * 30 : 0;
    var d = mod(target - rotCur + 180, 360) - 180;
    if (instant) ring.classList.add("still");
    rotCur += d;
    ring.style.setProperty("--rot", rotCur + "deg");
    if (instant) requestAnimationFrame(function () { requestAnimationFrame(function () { ring.classList.remove("still"); }); });
    T.rotation = rotCur;
  }

  function paintCircle() {
    var dm = degMap(), tri = chordsOf(false), hl = [];
    var segs = ring.querySelectorAll(".seg");
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i];
      s.setAttribute("class", "seg " + s.getAttribute("data-ring"));
      s.setAttribute("aria-pressed", "false");
      setPill(s, "", "");
    }
    for (var d = 0; d < 7; d++) {
      var el = segEl(dm[d][0], dm[d][1]), c = tri[d];
      var cls = "seg " + dm[d][0] + (c.qid === "dim" ? " vii" : " dia");
      var tonic = d === 0;
      if (tonic) cls += " sel";
      if (ui.active === d) cls += " on";
      el.setAttribute("class", cls);
      if (tonic) el.setAttribute("aria-pressed", "true");
      setPill(el, c.numeral, DEGCLS[d]);
      hl.push({ ring: dm[d][0], pos: dm[d][1], deg: d, numeral: c.numeral, dim: c.qid === "dim", rootPc: c.rpc });
    }
    var cur = segEl("maj", K.pos); cur.classList.add("cursig");
    $("hub-n").textContent = K.name;
    $("hub-m").textContent = K.major ? "major" : "minor";
    T.highlighted = hl;
  }

  /* ---------- sound (one AudioContext, started from a tap) ---------- */
  var actx = null;
  function audio() {
    try {
      if (!actx) {
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
        try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
        actx = new AC();
      }
      if (actx.state !== "running") { try { var p = actx.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
      return actx;
    } catch (e) { return null; }
  }
  var cur = null;   // what is sounding: { out, timers }
  function voice(a, out, midi, t, len, vol) {
    var f = 440 * Math.pow(2, (midi - 69) / 12), stop = t + len;
    var o1 = a.createOscillator(), o2 = a.createOscillator(), g2 = a.createGain(), lp = a.createBiquadFilter(), g = a.createGain();
    o1.type = "triangle"; o1.frequency.value = f;
    o2.type = "sine"; o2.frequency.value = f * 2; g2.gain.value = .14;
    lp.type = "lowpass"; lp.frequency.value = Math.min(5200, f * 5);
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + .012);
    g.gain.exponentialRampToValueAtTime(vol * .4, t + Math.min(.3, len * .5));
    g.gain.exponentialRampToValueAtTime(.0001, stop);
    o1.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(g); g.connect(out);
    o1.start(t); o2.start(t); o1.stop(stop + .05); o2.stop(stop + .05);
  }
  function stopAll() {
    if (cur) {
      cur.timers.forEach(clearTimeout);
      var c = cur; cur = null;
      try { if (actx) c.out.gain.setTargetAtTime(0, actx.currentTime, .03); } catch (e) {}
      setTimeout(function () { try { c.out.disconnect(); } catch (e) {} }, 400);
    }
    ui.prog = null; ui.noteOn = -1;
    setActive(null); paintNotes(); paintProgState();
  }
  // events: [{ at, notes: [midi], roll, len, vol }]; timers: [{ at, fn }] fire in step with the sound.
  function playEvents(evs, timers) {
    stopAll();
    cur = { out: null, timers: [] };
    var a = audio();
    if (a) {
      var out = a.createGain(); out.gain.value = 1; out.connect(a.destination); cur.out = out;
      var t0 = a.currentTime + .05;
      evs.forEach(function (ev) { ev.notes.forEach(function (m, i) { voice(a, out, m, t0 + ev.at + i * ev.roll, ev.len, ev.vol); }); });
    } else cur.out = { gain: { setTargetAtTime: function () {} }, disconnect: function () {} };
    (timers || []).forEach(function (t) { cur.timers.push(setTimeout(t.fn, t.at * 1000)); });
  }
  function setActive(d) {
    ui.active = d;
    if (d == null) T.active = null;
    else {
      var dm = degMap();
      T.active = { deg: d, ring: dm[d][0], pos: dm[d][1] };
      T.activeLog.push({ deg: d, ring: dm[d][0], pos: dm[d][1] });
    }
    var segs = ring.querySelectorAll(".seg.on"); for (var i = 0; i < segs.length; i++) segs[i].classList.remove("on");
    if (d != null) { var dm2 = degMap(); segEl(dm2[d][0], dm2[d][1]).classList.add("on"); }
    var tiles = document.querySelectorAll(".ct"); for (var j = 0; j < tiles.length; j++) tiles[j].classList.toggle("on", d != null && +tiles[j].getAttribute("data-deg") === d);
    var stp = document.querySelectorAll(".step"); for (var k = 0; k < stp.length; k++) stp[k].classList.toggle("on", ui.prog != null && ui.prog.i === k && d != null);
  }

  function playScale() {
    var n = scaleNotes().map(function (x) { return x.midi; });
    var seq = n.concat([K.base + 12]); var all = seq.concat(seq.slice(0, -1).reverse());
    T.lastScale = all.slice();
    var step = .24;
    var evs = all.map(function (m, i) { return { at: i * step, notes: [m], roll: 0, len: .5, vol: .3 }; });
    var timers = all.map(function (m, i) { var idx = i < 8 ? i : 14 - i; return { at: .05 + i * step, fn: function () { ui.noteOn = idx; paintNotes(); } }; });
    timers.push({ at: .05 + all.length * step + .3, fn: function () { ui.noteOn = -1; paintNotes(); } });
    playEvents(evs, timers);
  }
  function playChord(d) {
    var c = diatonic(d, st.sev);
    T.lastChord = { name: c.name, numeral: c.numeral, notes: c.notes, midis: c.midis.slice(), deg: d };
    playEvents([{ at: 0, notes: c.midis, roll: .11, len: 1.9, vol: .45 / Math.sqrt(c.midis.length) }],
      [{ at: 1.9, fn: function () { setActive(null); } }]);
    setActive(d);
  }
  var BEATS = 2, BPM = 70, SEC = BEATS * 60 / BPM;
  function playProg(i) {
    var p = PROGS[K.mode][i], chords = progChords(p);
    ui.prog = { i: -1, pi: i, chords: chords };
    T.lastSeq = { id: p.id, key: K.full, chords: chords.map(function (c) { return { name: c.name, numeral: c.numeral, notes: c.notes, midis: c.midis.slice(), deg: c.deg }; }) };
    T.activeLog = [];
    var evs = chords.map(function (c, n) { return { at: n * SEC, notes: c.midis, roll: .03, len: SEC * .98, vol: .4 / Math.sqrt(c.midis.length) }; });
    var timers = chords.map(function (c, n) { return { at: .05 + n * SEC, fn: function () { ui.prog.i = n; setActive(c.deg); } }; });
    timers.push({ at: .05 + chords.length * SEC, fn: function () { ui.prog.i = -1; ui.prog.done = true; setActive(null); paintProgState(); renderNow(); } });
    playEvents(evs, timers);
    ui.prog = { i: -1, pi: i, chords: chords };
    renderNow(); paintProgState();
  }

  /* ---------- cards ---------- */
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 5.500 10.500" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SPEAKER = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.500 6h2.500L8.500 3v10L5 10H2.500z" fill="currentColor"/><path d="M11 5.200a4 4 0 0 1 0 5.600M12.900 3.400a6.500 6.500 0 0 1 0 9.200" fill="none" stroke="currentColor" stroke-width="1.400" stroke-linecap="round"/></svg>';
  var STOPI = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.500" y="3.500" width="9" height="9" rx="1.500" fill="currentColor"/></svg>';
  var degBadge = function (deg) { return '<span class="deg ' + degClass(deg) + '">' + esc(deg) + "</span>"; };
  var lib = function (path) { return "../library/#/" + path; };

  // The key signature on a treble staff: sharps and flats in the standard places.
  function staffSvg() {
    var sg = K.sig, W = 172, y0 = 20, g = 10;
    var SH_Y = [20, 35, 15, 30, 45, 25, 40], FL_Y = [40, 25, 45, 30, 50, 35, 55];
    var h = '<svg class="staff" viewBox="0 0 ' + W + ' 84" role="img" aria-label="Key signature: ' + sigWords(sg) + '">';
    for (var i = 0; i < 5; i++) h += '<line class="ln" x1="3" x2="' + (W - 3) + '" y1="' + (y0 + i * g) + '" y2="' + (y0 + i * g) + '"/>';
    h += '<path d="M21 70c0 7-9 7-9 1 0-4 5-4 6-1M20 66 25 22c1.600-9 7-14 8-6 .8 7-6 15-13 22-8 8-6 20 5 20 9 0 11-12 3-13-6-1-9 5-5 8" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/>';
    for (var n = 0; n < sg.n; n++) {
      var x = 44 + n * 14, y = (sg.kind === "♯" ? SH_Y : FL_Y)[n];
      if (sg.kind === "♯") h += '<path d="M' + (x - 2.500) + " " + (y - 9) + "v18M" + (x + 2.500) + " " + (y - 10) + 'v18" stroke="currentColor" stroke-width="1.300" fill="none"/><path d="M' + (x - 5.500) + " " + (y - 2) + "L" + (x + 5.500) + " " + (y - 5) + "M" + (x - 5.500) + " " + (y + 4.500) + "L" + (x + 5.500) + " " + (y + 1.500) + '" stroke="currentColor" stroke-width="2.600" fill="none"/>';
      else h += '<path d="M' + (x - 3) + " " + (y - 14) + "V" + (y + 4) + "M" + (x - 3) + " " + (y + 4) + "C" + (x + 7) + " " + (y - 1) + " " + (x + 6) + " " + (y - 9) + " " + (x - 3) + " " + (y - 3.500) + '" stroke="currentColor" stroke-width="1.700" fill="none" stroke-linecap="round"/>';
    }
    return h + "</svg>";
  }
  var accList = function () { var o = K.sig.kind === "♯" ? SHARPS : FLATS; return o.slice(0, K.sig.n).map(function (l) { return l + K.sig.kind; }).join(" "); };

  function keyCard() {
    var t = K.major;
    var title = '<span class="' + (t ? "" : "alt") + '">' + esc(t ? K.full : K.relName) + '</span> <span class="alt">/</span> <span class="' + (t ? "alt" : "") + '">' + esc(t ? K.relName : K.full) + "</span>";
    return '<section class="card" aria-label="Key">' +
      '<h2 class="title" id="key-title">' + title + "</h2>" +
      '<div class="keyrow"><div class="seg-c" role="radiogroup" aria-label="Major or minor">' +
      '<button type="button" role="radio" data-mode="major" aria-checked="' + t + '">Major</button>' +
      '<button type="button" role="radio" data-mode="minor" aria-checked="' + !t + '">Minor</button></div>' +
      (K.pos === 6 ? '<div class="seg-c" role="radiogroup" aria-label="Spelling"><button type="button" role="radio" data-flat="0" aria-checked="' + !st.flat + '">♯</button><button type="button" role="radio" data-flat="1" aria-checked="' + st.flat + '">♭</button></div>' : "") + "</div>" +
      '<div class="sigrow">' + staffSvg() + '<div class="sig-n"><b id="sig-n">' + K.sig.n + K.sig.kind + '</b><span id="sig-l">' + (K.sig.n ? accList() : "–") + "</span></div></div></section>";
  }
  function scaleCard() {
    var ns = scaleNotes();
    return '<section class="card" aria-label="Scale"><div class="card-head"><h2>Scale</h2>' +
      '<button class="play" type="button" data-act="scale">' + SPEAKER + "<span>Play</span></button></div>" +
      '<div class="notes" id="scale-notes">' + ns.map(function (n, i) { return '<div class="note" data-i="' + i + '"><b>' + esc(n.name) + "</b>" + degBadge(n.deg) + "</div>"; }).join("") + "</div>" +
      '<div><a class="lnk" id="scale-lib" href="' + lib("mode/" + K.pc + "/" + K.mode_id) + '">Open in Library ' + ARROW + "</a></div></section>";
  }
  function chordsCard() {
    var cs = chordsOf(st.sev);
    return '<section class="card" aria-label="Chords"><div class="card-head"><h2>Chords</h2>' +
      '<div class="seg-c" role="radiogroup" aria-label="Triads or sevenths"><button type="button" role="radio" data-sev="0" aria-checked="' + !st.sev + '">Triads</button><button type="button" role="radio" data-sev="1" aria-checked="' + st.sev + '">7ths</button></div></div>' +
      '<div class="tiles" id="tiles">' + cs.map(function (c, i) {
        return '<div class="ct ' + DEGCLS[c.deg] + '" data-deg="' + i + '"><button class="ct-main" type="button" data-chord="' + i + '" aria-label="Play ' + esc(c.name) + '"><span class="ct-n">' + esc(c.numeral) + '</span><span class="ct-c">' + esc(c.name) + '</span><span class="ct-s">' + c.notes.map(function (n, k) { return '<span class="nt ' + c.ncls[k] + '">' + esc(n) + "</span>"; }).join(" ") + "</span></button>" +
          '<a class="ct-lib" href="' + lib("chord/" + c.rpc + "/" + c.qid) + '" aria-label="' + esc(c.name) + ' in Library">' + ARROW + "</a></div>";
      }).join("") + "</div></section>";
  }
  function progCard() {
    return '<section class="card" aria-label="Progressions"><div class="card-head"><h2>Progressions</h2></div>' +
      '<div class="chips" id="progs">' + PROGS[K.mode].map(function (p, i) { return '<button class="chip" type="button" data-prog="' + i + '" aria-pressed="false">' + esc(p.label) + "</button>"; }).join("") + "</div>" +
      '<div class="now" id="now" hidden></div></section>';
  }
  function relatedKeys() {
    var P = function (x) { return mod(x, 12); };
    var items = [];
    var mk = function (label, pos, mode, flat) {
      var s2 = { pos: pos, mode: mode, flat: flat == null ? st.flat : flat }; var k = keyOf(s2);
      items.push({ label: label, pos: pos, mode: mode, name: k.full, flat: s2.flat });
    };
    mk("Dominant", P(K.pos + 1), K.mode); mk("Subdominant", P(K.pos - 1), K.mode);
    mk("Relative", K.pos, K.major ? "minor" : "major");
    mk("Parallel", K.major ? P(K.pos + 9) : P(K.pos + 3), K.major ? "minor" : "major", K.root.a < 0 ? true : K.root.a > 0 ? false : st.flat);
    return items;
  }
  function relCard() {
    return '<section class="card" aria-label="Related keys"><div class="card-head"><h2>Related keys</h2></div><div class="chips">' +
      relatedKeys().map(function (r) { return '<button class="chip" type="button" data-pos="' + r.pos + '" data-mode="' + r.mode + '" data-flat="' + (r.flat ? 1 : 0) + '" data-rel="' + r.label.toLowerCase() + '"><small>' + r.label + "</small> " + esc(r.name) + "</button>"; }).join("") + "</div></section>";
  }
  function modeList() {
    var off = K.major ? 0 : 5;
    return [0, 1, 2, 3, 4, 5, 6].map(function (i) {
      var m = MODES[(off + i) % 7], root = degRoot(i);
      return { name: rootName(root) + " " + m.name, pc: pcOf(root), id: m.id, tonic: rootName(root) };
    });
  }
  function modesCard() {
    return '<section class="card" aria-label="Modes"><div class="card-head"><h2>Modes</h2></div><div class="chips" id="modes">' +
      modeList().map(function (m) { return '<a class="chip" href="' + lib("mode/" + m.pc + "/" + m.id) + '">' + esc(m.name) + "</a>"; }).join("") + "</div></section>";
  }

  function renderCards() {
    $("cards").innerHTML = keyCard() + scaleCard() + chordsCard() + progCard() + relCard() + modesCard();
  }
  function paintNotes() {
    var ns = document.querySelectorAll("#scale-notes .note");
    for (var i = 0; i < ns.length; i++) ns[i].classList.toggle("on", ui.noteOn === i);
  }
  function paintProgState() {
    var b = document.querySelectorAll("[data-prog]");
    for (var i = 0; i < b.length; i++) b[i].setAttribute("aria-pressed", ui.prog && ui.prog.pi === +b[i].getAttribute("data-prog") ? "true" : "false");
  }
  function renderNow() {
    var el = $("now"); if (!el) return;
    if (!ui.prog) { el.hidden = true; el.innerHTML = ""; return; }
    var playing = !ui.prog.done;
    el.hidden = false;
    el.innerHTML = '<div class="steps" id="steps">' + ui.prog.chords.map(function (c, i) {
      return '<div class="step" data-i="' + i + '"><b>' + esc(c.name) + "</b><small>" + esc(c.numeral) + "</small></div>";
    }).join("") + "</div>" +
      (playing ? '<div><button class="play stop" type="button" data-act="stop">' + STOPI + "<span>Stop</span></button></div>" : "");
  }

  /* ---------- paint everything ---------- */
  function paint(opts) {
    opts = opts || {};
    K = keyOf(st);
    paintCircle();
    setRot(opts.instant);
    $("rot").setAttribute("aria-pressed", String(st.rotate));
    renderCards();
    T.selected = K.full; T.pos = K.pos; T.mode = K.mode; T.pc = K.pc;
    T.top = st.rotate ? K.pos : 0;
    T.sig = { n: K.sig.n, kind: K.sig.kind, list: accList() };
    T.scale = scaleNotes().map(function (n) { return n.name; });
    T.chords = chordsOf(st.sev).map(function (c) { return { name: c.name, numeral: c.numeral, notes: c.notes }; });
    T.related = relatedKeys();
    T.modes = modeList();
    T.sev = st.sev; T.rotate = st.rotate;
    document.title = "Circle of Fifths";
  }
  function writeHash(first) {
    var h = "#/" + K.pc + "/" + K.mode;
    if (location.hash === h) return;
    // The first write only fills in the address; replaceState does that without a navigation.
    try { if (first) history.replaceState(null, "", location.pathname + location.search + h); else location.replace(location.pathname + location.search + h); } catch (e) {}
  }
  function select(pos, mode, opts) {
    stopAll();
    st.pos = pos; st.mode = mode;
    paint(opts); save(); writeHash();
  }
  window.__circleContext = function () { return "Circle of Fifths: " + rootName(K.root) + ", " + K.mode; };

  /* ---------- events ---------- */
  function onSeg(el) {
    var rg = el.getAttribute("data-ring"), pos = +el.getAttribute("data-pos");
    var mode = rg === "maj" ? "major" : "minor";
    if (pos === st.pos && mode === st.mode) return;
    select(pos, mode);
  }
  ring.addEventListener("click", function (e) { var s = e.target.closest(".seg"); if (s) onSeg(s); });
  ring.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var s = e.target.closest && e.target.closest(".seg"); if (s) { e.preventDefault(); onSeg(s); }
  });
  $("rot").addEventListener("click", function () { st.rotate = !st.rotate; $("rot").setAttribute("aria-pressed", String(st.rotate)); setRot(); T.top = st.rotate ? K.pos : 0; T.rotate = st.rotate; save(); });
  $("cards").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-mode") && b.closest(".seg-c")) { var m = b.getAttribute("data-mode"); if (m !== st.mode) select(st.pos, m); return; }
    if (b.hasAttribute("data-rel")) { st.flat = b.getAttribute("data-flat") === "1"; select(+b.getAttribute("data-pos"), b.getAttribute("data-mode")); return; }
    if (b.hasAttribute("data-flat")) { st.flat = b.getAttribute("data-flat") === "1"; stopAll(); paint(); save(); writeHash(); return; }
    if (b.hasAttribute("data-sev")) { st.sev = b.getAttribute("data-sev") === "1"; stopAll(); paint(); save(); return; }
    if (b.hasAttribute("data-chord")) { playChord(+b.getAttribute("data-chord")); return; }
    if (b.hasAttribute("data-prog")) { playProg(+b.getAttribute("data-prog")); return; }
    var act = b.getAttribute("data-act");
    if (act === "scale") playScale();
    else if (act === "stop") { stopAll(); renderNow(); }
  });
  window.addEventListener("hashchange", function () {
    var h = parseHash();
    if (h && (h.pos !== st.pos || h.mode !== st.mode)) select(h.pos, h.mode);
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) stopAll(); });

  /* ---------- start ---------- */
  load();
  var h0 = parseHash();
  if (h0) { st.pos = h0.pos; st.mode = h0.mode; }
  buildCircle();
  paint({ instant: true });
  save();
  writeHash(true);
})();
