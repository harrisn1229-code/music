/* PA.score: the score model for Play Along (window.PA.score). No DOM, no audio.
   Score v2 (see the contract in the README): per-bar time / key / tempo / section / box, lyrics, dead notes, drum notes, parts.
   Everything that reads a score for display or sound works from SC.transposed(score, semis), a copy; the stored score is never
   changed by transposing.

   API
     parsePitch, midiName, parseFrac, parseTime, noteMidi(note)  pitch helpers (written pitch)
     spell(midi, flat) -> "Bb3"     meta(score) -> [{time, key, tempo, len}] per bar, carried forward
     barLen(score, i)               bar length in quarter beats, honouring per-bar time (i omitted: the score's opening time)
     parts(score) -> [{key, id, name, instrument, program, drum, clef, tuning, strings, octave, isMain, events(bi)}]   main first
     defaultProgram(inst), partName(part), transOf(score)
     normalizePage / mergePages / finishScore / finishImported / fixTabLists / markTies / checkBars / expectedLens
     transposed(score, semis) -> score copy      transposeKey, transposeChord
     countLabel(off, time) -> "1" "e" "&" "a" "trip" "let" ...
     parseKey(k) -> {name, n, ok}   keyAccs(n)   hasTab(score)   hasChords(score)   sections(score) */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score = {};

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  /* ================================================================ pitch helpers */
  var PITCH_RE = /^([A-G])(bb|b|#|x|##)?(-?\d)$/;
  var STEP = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var ACC = { "": 0, b: -1, bb: -2, "#": 1, x: 2, "##": 2 };
  var NAMES_S = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var NAMES_F = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  var STD = { bass: [28, 33, 38, 43], guitar: [40, 45, 50, 55, 59, 64] };
  var INST_NAME = { bass: "Bass", guitar: "Guitar", piano: "Piano", drums: "Drums", other: "Music" };

  function parsePitch(s) {
    var m = PITCH_RE.exec(String(s == null ? "" : s).trim().replace(/♯/g, "#").replace(/♭/g, "b"));
    if (!m) return null;
    var acc = ACC[m[2] || ""], oct = +m[3];
    return { letter: m[1], acc: acc, oct: oct, midi: 12 * (oct + 1) + STEP[m[1]] + acc };
  }
  function midiName(m) { return NAMES_S[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1); }
  function spell(m, flat) { return (flat ? NAMES_F : NAMES_S)[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1); }
  function parseFrac(v) {
    if (typeof v === "number") return isFinite(v) ? v : NaN;
    var s = String(v == null ? "" : v).trim(), m;
    if ((m = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(s))) return +m[2] ? +m[1] / +m[2] : NaN;
    if ((m = /^(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(s))) return +m[3] ? +m[1] + +m[2] / +m[3] : NaN;
    if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
    return NaN;
  }
  function parseTime(s) {
    if (Array.isArray(s) && s.length === 2 && +s[0] > 0 && +s[1] > 0) return [+s[0], +s[1]];
    var m = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(String(s || ""));
    if (!m || !+m[1] || !+m[2]) return [4, 4];
    return [+m[1], +m[2]];
  }
  function validTime(s) { return Array.isArray(s) ? (+s[0] > 0 && +s[1] > 0) : /^\s*\d+\s*\/\s*\d+\s*$/.test(String(s || "")) && parseTime(s)[0] > 0; }
  function noteMidi(n) { var p = parsePitch(n.pitch); return p ? p.midi : 60; }
  function barSum(bar) { var s = 0; for (var i = 0; i < bar.events.length; i++) s += bar.events[i].d; return s; }
  function timeLen(t) { return t[0] * 4 / t[1]; }
  function transOf(score) { return (score.instrument === "bass" || score.instrument === "guitar" || score.clef === "treble8vb") ? -12 : 0; }

  /* ---- keys ---- */
  var KEYSIG = {
    C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, "F#": 6, "C#": 7, F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7,
    Am: 0, Em: 1, Bm: 2, "F#m": 3, "C#m": 4, "G#m": 5, "D#m": 6, "A#m": 7, Dm: -1, Gm: -2, Cm: -3, Fm: -4, Bbm: -5, Ebm: -6, Abm: -7
  };
  function parseKey(k) {
    var m = /^\s*([A-Ga-g])\s*(#|b|♯|♭)?\s*(m|min|minor|mi|maj|major|M)?(?![a-z])/.exec(String(k || ""));
    if (!m) return { name: "C", n: 0, ok: false };
    var tonic = m[1].toUpperCase() + (m[2] === "♯" ? "#" : m[2] === "♭" ? "b" : (m[2] || ""));
    var minor = /^(m|min|minor|mi)$/.test(m[3] || "");
    var name = tonic + (minor ? "m" : "");
    if (KEYSIG[name] == null) return { name: "C", n: 0, ok: false };
    return { name: name, n: KEYSIG[name], ok: true };
  }
  function keyAccs(n) {
    var out = {}, sh = ["F", "C", "G", "D", "A", "E", "B"], fl = ["B", "E", "A", "D", "G", "C", "F"], i;
    for (i = 0; i < Math.abs(n); i++) out[(n > 0 ? sh : fl)[i]] = n > 0 ? 1 : -1;
    return out;
  }
  var MAJ_PC = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  var MIN_PC = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];
  function pcOf(tonic) { var m = /^([A-G])(#|b)?$/.exec(tonic); return m ? (STEP[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + 12) % 12 : 0; }
  function transposeKey(key, semis) {
    var k = parseKey(key);
    if (!semis) return k.ok ? k.name : String(key || "C");
    var minor = /m$/.test(k.name), tonic = k.name.replace(/m$/, "");
    var pc = (pcOf(tonic) + semis + 120) % 12;
    return (minor ? MIN_PC : MAJ_PC)[pc] + (minor ? "m" : "");
  }
  function flatKey(keyName) { return parseKey(keyName).n < 0; }
  function transposeChord(name, semis, flat) {
    if (!semis) return name;
    return String(name).replace(/^([A-G])(#|b|♯|♭)?/, function (all, l, a) {
      var pc = (STEP[l] + (a === "#" || a === "♯" ? 1 : a === "b" || a === "♭" ? -1 : 0) + 120) % 12;
      return ((flat ? NAMES_F : NAMES_S)[(pc + semis + 120) % 12]);
    }).replace(/\/([A-G])(#|b|♯|♭)?/, function (all, l, a) {
      var pc = (STEP[l] + (a === "#" || a === "♯" ? 1 : a === "b" || a === "♭" ? -1 : 0) + 120) % 12;
      return "/" + ((flat ? NAMES_F : NAMES_S)[(pc + semis + 120) % 12]);
    });
  }

  /* ================================================================ parts and per-bar meta */
  function defaultProgram(inst) { return inst === "bass" ? 33 : inst === "guitar" ? 27 : inst === "drums" ? -1 : 0; }
  function isDrumMain(score) { return score.instrument === "other" && score.program === -1; }
  function partName(p) { return p.name || INST_NAME[p.instrument] || "Music"; }
  function hasTab(score) { return !!(score && score.strings > 0); }
  function hasChords(score) { return score.measures.some(function (b) { return b.chords && b.chords.length; }); }
  function sections(score) {
    var out = [];
    score.measures.forEach(function (b, i) { if (b.section) out.push({ bar: i, name: b.section }); });
    return out;
  }

  /* One entry per bar: the time signature, key and written tempo in force there. */
  function meta(score) {
    var t = score.time || [4, 4], k = score.key || "C", tp = score.tempo || 100, out = [];
    score.measures.forEach(function (b, i) {
      if (b.time && validTime(b.time)) t = parseTime(b.time);
      if (b.key) k = b.key;
      if (typeof b.tempo === "number" && b.tempo >= 20) tp = b.tempo;
      out.push({ time: t, key: k, tempo: tp, len: timeLen(t) });
    });
    return out;
  }
  function barLen(score, i) {
    if (i == null) return timeLen(score.time || [4, 4]);
    var t = score.time || [4, 4];
    for (var k = 0; k <= i && k < score.measures.length; k++) if (score.measures[k].time && validTime(score.measures[k].time)) t = parseTime(score.measures[k].time);
    return timeLen(t);
  }

  /* The main part first, then score.parts. events(bi) gives the events of bar bi. */
  function parts(score) {
    var drum = isDrumMain(score), inst = drum ? "drums" : (score.instrument || "other");
    var list = [{
      key: "main", id: "main", isMain: true, name: score.mainName || (drum ? "Drums" : INST_NAME[inst] || "Music"), instrument: inst,
      program: drum ? -1 : (typeof score.program === "number" ? score.program : defaultProgram(inst)), drum: drum,
      clef: score.clef, tuning: score.tuning || null, strings: score.strings || 0, octave: transOf(score),
      events: function (bi) { return score.measures[bi].events; }
    }];
    (score.parts || []).forEach(function (p, i) {
      var d = p.instrument === "drums" || p.program === -1;
      list.push({
        key: p.id || ("part" + i), id: p.id || ("part" + i), isMain: false, name: p.name || INST_NAME[p.instrument] || "Part " + (i + 2), instrument: d ? "drums" : p.instrument || "other",
        program: d ? -1 : (typeof p.program === "number" ? p.program : defaultProgram(p.instrument)), drum: d,
        clef: p.clef || "treble", tuning: p.tuning || null, strings: p.strings || 0, octave: typeof p.octave === "number" ? p.octave : 0, index: i, src: p,
        events: function (bi) { var m = p.measures && p.measures[bi]; return m && m.events && m.events.length ? m.events : null; }
      });
    });
    return list;
  }

  /* ================================================================ reading the AI's answer */
  function pitchStr(p) { return p.letter + (p.acc === 0 ? "" : p.acc === 1 ? "#" : p.acc === 2 ? "x" : p.acc === -1 ? "b" : "bb") + p.oct; }
  function parseTuning(arr) {
    if (!Array.isArray(arr) || arr.length < 2) return null;
    var tm = arr.map(function (p) { var q = parsePitch(p); return q ? q.midi : null; });
    if (!tm.every(function (x) { return x != null; })) return null;
    if (tm[0] > tm[tm.length - 1]) tm.reverse();
    return tm;
  }
  function normBox(b) {
    var x, y, w, h;
    if (Array.isArray(b) && b.length >= 4) { x = +b[0]; y = +b[1]; w = +b[2]; h = +b[3]; }
    else if (b && typeof b === "object") { x = +b.x; y = +b.y; w = +b.w; h = +b.h; }
    else return null;
    if (![x, y, w, h].every(isFinite)) return null;
    x = clamp(x, 0, 1); y = clamp(y, 0, 1); w = clamp(w, 0, 1 - x); h = clamp(h, 0, 1 - y);
    if (w < 0.01 || h < 0.005) return null;
    return { x: Math.round(x * 10000) / 10000, y: Math.round(y * 10000) / 10000, w: Math.round(w * 10000) / 10000, h: Math.round(h * 10000) / 10000 };
  }

  /* Turns the tool input from one page into a clean page object: numbers instead of fraction strings,
     only pitches that parse, no zero-length events, optional v2 fields checked. */
  function normalizePage(inp, o) {
    o = o || {};
    inp = inp && typeof inp === "object" ? inp : {};
    var junk = 0;
    var inst = ["bass", "guitar", "piano", "other"].indexOf(inp.instrument) >= 0 ? inp.instrument : "other";
    if (o.hint && o.hint !== "auto") inst = o.hint;
    var tuning = parseTuning(inp.tuning);
    var clef = ["treble", "bass", "treble8vb", "grand"].indexOf(inp.clef) >= 0 ? inp.clef : (inst === "bass" ? "bass" : inst === "guitar" ? "treble8vb" : "treble");
    var tempo = typeof inp.tempo === "number" && isFinite(inp.tempo) && inp.tempo >= 20 && inp.tempo <= 400 ? Math.round(inp.tempo) : null;
    var time = parseTime(inp.time);
    var pk = parseFrac(inp.pickup);
    var page = {
      title: typeof inp.title === "string" ? inp.title.trim().slice(0, 120) : "",
      instrument: inst, tuning: tuning, clef: clef, key: typeof inp.key === "string" && inp.key.trim() ? inp.key.trim() : "C",
      time: time, tempo: tempo, swing: !!inp.swing, pickup: pk > 0 ? pk : 0,
      measures: [], order: null, uncertain: typeof inp.uncertain === "string" ? inp.uncertain.trim() : "", junk: 0, parts: []
    };
    var run = time, runKey = page.key, bl = timeLen(time);
    if (page.pickup >= bl - 0.01) page.pickup = 0;
    var ms = Array.isArray(inp.measures) ? inp.measures : [];
    var bls = [];
    for (var i = 0; i < ms.length; i++) {
      var raw = ms[i] && typeof ms[i] === "object" ? ms[i] : {};
      if (raw.time != null && validTime(raw.time)) { var nt = parseTime(raw.time); if (nt[0] !== run[0] || nt[1] !== run[1]) { run = nt; } }
      var b = normalizeBar(raw, i + 1, timeLen(run));
      if (raw.time != null && validTime(raw.time)) {
        var tt = parseTime(raw.time), prevT = i ? bls[i - 1].t : time;
        if (tt[0] !== prevT[0] || tt[1] !== prevT[1]) b.bar.time = tt;
      }
      bls.push({ t: run, bl: timeLen(run) });
      if (typeof raw.key === "string" && raw.key.trim()) { var kk = parseKey(raw.key); if (kk.ok && kk.name !== parseKey(runKey).name) { b.bar.key = kk.name; runKey = kk.name; } }
      junk += b.junk;
      page.measures.push(b.bar);
    }
    if (Array.isArray(inp.order)) {
      var ord = inp.order.map(function (x) { return Math.round(+x); }).filter(function (x) { return isFinite(x) && x > 0; });
      if (ord.length) page.order = ord;
    }
    // extra staves: parts, matched to the main part's bars by number (else by position)
    if (Array.isArray(inp.parts)) inp.parts.slice(0, 6).forEach(function (pp, pi) {
      var np = normalizePart(pp, pi, page.measures, bls);
      if (np) { page.parts.push(np.part); junk += np.junk; }
    });
    page.junk = junk;
    return page;
  }
  function normalizePart(pp, idx, mainBars, bls) {
    if (!pp || typeof pp !== "object") return null;
    var inst = ["bass", "guitar", "piano", "drums", "other"].indexOf(pp.instrument) >= 0 ? pp.instrument : "other";
    var part = {
      id: "p" + (idx + 1), name: typeof pp.name === "string" && pp.name.trim() ? pp.name.trim().slice(0, 40) : (INST_NAME[inst] || "Part " + (idx + 2)),
      instrument: inst, program: defaultProgram(inst),
      clef: ["treble", "bass", "treble8vb", "grand"].indexOf(pp.clef) >= 0 ? pp.clef : (inst === "bass" ? "bass" : inst === "guitar" ? "treble8vb" : "treble"),
      tuning: parseTuning(pp.tuning), strings: 0,
      octave: (inst === "bass" || inst === "guitar" || pp.clef === "treble8vb") ? -12 : 0, measures: []
    };
    var src = Array.isArray(pp.measures) ? pp.measures : [], by = {}, junk = 0;
    src.forEach(function (m, i) { var n = Math.round(+(m && m.n)); if (n > 0 && by[n] == null) by[n] = m; });
    var useIdx = !Object.keys(by).length;
    mainBars.forEach(function (mb, i) {
      var m = useIdx ? src[i] : by[mb.n], bl = bls[i].bl;
      if (!m) { part.measures.push({ events: [{ d: bl, notes: [] }] }); return; }
      var nb = normalizeBar(m, mb.n, bl);
      junk += nb.junk;
      part.measures.push({ events: nb.bar.events });
    });
    return { part: part, junk: junk };
  }
  function normalizeBar(m, fallbackN, bl) {
    var junk = 0;
    m = m && typeof m === "object" ? m : {};
    var bar = { n: Math.round(+m.n) > 0 ? Math.round(+m.n) : fallbackN, chords: [], events: [] };
    if (Array.isArray(m.chords)) m.chords.forEach(function (c) {
      var at = parseFrac(c && c.at), name = c && typeof c.name === "string" ? c.name.trim() : "";
      if (name && at >= 0) bar.chords.push({ at: at, name: name.slice(0, 24) }); else junk++;
    });
    bar.chords.sort(function (a, b) { return a.at - b.at; });
    if (m.repeatStart) bar.repeatStart = true;
    var re = m.repeatEnd === true ? 2 : Math.round(+m.repeatEnd);
    if (re >= 2) bar.repeatEnd = Math.min(re, 9); else if (re === 1 || m.repeatEnd === true) bar.repeatEnd = 2;
    var en = Math.round(+m.ending);
    if (en > 0) bar.ending = en;
    if (typeof m.section === "string" && m.section.trim()) bar.section = m.section.trim().slice(0, 40);
    if (typeof m.tempo === "number" && isFinite(m.tempo) && m.tempo >= 20 && m.tempo <= 400) bar.tempo = Math.round(m.tempo);
    var bx = m.box != null ? normBox(m.box) : null;
    if (bx) bar.box = bx;
    var evs = Array.isArray(m.events) ? m.events : [];
    evs.forEach(function (e) {
      var d = parseFrac(e && e.d);
      if (!(d > 0.0001) || d > 32) { junk++; return; }
      var notes = [], seen = {}, dropped = 0, raw = e && Array.isArray(e.notes) ? e.notes : [];
      raw.forEach(function (n) {
        if (n && n.drum != null && isFinite(+n.drum) && +n.drum >= 27 && +n.drum <= 87) {
          var dk = "d" + Math.round(+n.drum);
          if (seen[dk]) return;
          seen[dk] = 1; notes.push({ pitch: "C4", drum: Math.round(+n.drum) });
          return;
        }
        var p = parsePitch(n && n.pitch);
        if (!p) { dropped++; return; }
        if (seen[p.midi]) return;
        seen[p.midi] = 1;
        var note = { pitch: pitchStr(p) };
        var s = Math.round(+n.string), f = Math.round(+n.fret);
        if (s >= 1 && s <= 12 && n.string != null) note.s = s;
        if (f >= 0 && f <= 30 && n.fret != null && isFinite(+n.fret)) note.f = f;
        if (n.tie) note.tie = true;
        if (n.dead) note.dead = true;
        notes.push(note);
      });
      junk += dropped;
      var ev = { d: d, notes: notes };
      if (e && typeof e.lyric === "string" && e.lyric.trim()) ev.lyric = e.lyric.trim().slice(0, 40);
      bar.events.push(ev);
    });
    if (!bar.events.length) { bar.events.push({ d: bl, notes: [] }); bar.empty = true; junk++; }
    return { bar: bar, junk: junk };
  }

  function restBar(bl) { return { events: [{ d: bl, notes: [] }] }; }

  /* Joins the page objects of a multi-page piece into one score. Header fields come from the first page. */
  function mergePages(pages) {
    var first = pages[0];
    var score = {
      title: first.title, instrument: first.instrument, tuning: first.tuning, clef: first.clef, key: first.key,
      time: first.time, tempo: first.tempo, swing: first.swing, pickup: first.pickup, measures: [], order: null, uncertain: [],
      source: "photo"
    };
    var orders = [], anyOrder = false, junk = 0, lastN = 0;
    var runT = first.time, runK = first.key, plist = [], pmap = {};
    pages.forEach(function (pg, k) {
      if (k > 0) {
        if (score.tempo == null && pg.tempo != null) score.tempo = pg.tempo;
        if (!score.tuning && pg.tuning) score.tuning = pg.tuning;
        if (!score.title && pg.title) score.title = pg.title;
        if (pg.measures.length) {
          var b0 = pg.measures[0];
          if ((pg.time[0] !== runT[0] || pg.time[1] !== runT[1]) && !b0.time) b0.time = pg.time;
          if (parseKey(pg.key).name !== parseKey(runK).name && !b0.key) b0.key = pg.key;
        }
      }
      var off = 0, start = score.measures.length;
      if (pg.measures.length && pg.measures[0].n <= lastN) off = lastN - pg.measures[0].n + 1;
      var ns = [];
      pg.measures.forEach(function (b, i) {
        b.n += off; b.pg = k; ns.push(b.n);
        if (b.box) b.box.pg = k;
        if (b.time) runT = b.time;
        if (b.key) runK = b.key;
        score.measures.push(b); lastN = Math.max(lastN, b.n);
      });
      // parts: matched by name; bars of a page that lacks a part are rests
      var seenHere = {};
      (pg.parts || []).forEach(function (pp, pi) {
        var key = (pp.name || "").toLowerCase() + "|" + pp.instrument;
        var tgt = pmap[key];
        if (!tgt) {
          tgt = pmap[key] = { id: "p" + (plist.length + 1), name: pp.name, instrument: pp.instrument, program: pp.program, clef: pp.clef, tuning: pp.tuning, strings: 0, octave: pp.octave, measures: [] };
          plist.push(tgt);
          for (var q = 0; q < start; q++) tgt.measures.push(restBar(barLen(score, q)));
        }
        if (!tgt.tuning && pp.tuning) tgt.tuning = pp.tuning;
        seenHere[key] = 1;
        pp.measures.forEach(function (m) { tgt.measures.push(m); });
      });
      plist.forEach(function (tp) {
        var key = (tp.name || "").toLowerCase() + "|" + tp.instrument;
        if (seenHere[key]) return;
        for (var q = start; q < score.measures.length; q++) tp.measures.push(restBar(barLen(score, q)));
      });
      if (pg.order) { anyOrder = true; orders.push(pg.order.map(function (x) { return x + off; })); }
      else orders.push(ns);
      if (pg.uncertain) score.uncertain.push((pages.length > 1 ? "Page " + (k + 1) + ": " : "") + pg.uncertain);
      junk += pg.junk;
    });
    if (anyOrder) score.order = [].concat.apply([], orders);
    score.uncertain = score.uncertain.join("\n");
    score.junk = junk;
    if (plist.length) score.parts = plist;
    return score;
  }

  /* ================================================================ checks that need the whole score */
  function barIndexByN(score) {
    var by = {};
    score.measures.forEach(function (b, i) { if (by[b.n] == null) by[b.n] = i; });
    return by;
  }
  function expectedLens(score, i, mt) {
    mt = mt || meta(score);
    var bl = mt[i].len, ok = [bl];
    if (score.pickup > 0) {
      if (i === 0) ok.push(score.pickup);
      if (i === score.measures.length - 1 && i > 0) ok.push(bl - score.pickup);
    }
    return ok;
  }
  /* Sets bar.bad (and bar.sum) on every bar whose events don't add up; returns the indices. keep: leave flags an importer set. */
  function checkBars(score, keep) {
    var out = [], mt = meta(score);
    score.measures.forEach(function (b, i) {
      b.sum = barSum(b);
      var ok = expectedLens(score, i, mt).some(function (L) { return Math.abs(b.sum - L) < 0.02; });
      if (ok) { if (!keep) delete b.bad; else if (b.bad) out.push(i); }
      else { b.bad = true; out.push(i); }
    });
    return out;
  }
  function markTiesLists(lists) {
    var prev = null;
    lists.forEach(function (evs) {
      evs.forEach(function (ev) {
        ev.notes.forEach(function (n) {
          if (n.drum != null) return;
          n.cont = !!(prev && prev.notes.some(function (p) { return p.tie && p.pitch === n.pitch; }));
        });
        prev = ev;
      });
    });
  }
  function markTies(score) {
    markTiesLists(score.measures.map(function (b) { return b.events; }));
    (score.parts || []).forEach(function (p) { markTiesLists((p.measures || []).map(function (m) { return m.events; })); });
  }

  /* Tab and staff have to agree. The staff pitch is what sounds; the fret is only recomputed for display.
     lists: arrays of events; tr: written -> sounding offset (-12 for bass and guitar). Returns true when it made a tab. */
  function fixTabLists(lists, inst, tuning, tr, flags) {
    var hasT = lists.some(function (evs) { return evs.some(function (e) { return e.notes.some(function (n) { return n.s != null && n.f != null; }); }); });
    if (inst !== "bass" && inst !== "guitar" && !(hasT && tuning)) return 0;
    var T = tuning || (STD[inst] || STD.guitar).slice(), N = T.length, lastS = null;
    lists.forEach(function (evs) {
      evs.forEach(function (ev) {
        ev.notes.forEach(function (n) {
          if (n.drum != null) return;
          var snd = noteMidi(n) + tr;
          var ok = n.s != null && n.f != null && n.s <= N && T[N - n.s] + n.f === snd;
          if (ok) { lastS = n.s; return; }
          var had = n.s != null && n.f != null;
          if (n.s != null && n.s <= N) {
            var fr = snd - T[N - n.s];
            if (fr >= 0 && fr <= 24) { n.f = fr; if (flags) flags.tabFixed++; lastS = n.s; return; }
          }
          var best = null;
          for (var s = 1; s <= N; s++) {
            var f = snd - T[N - s];
            if (f < 0 || f > 24) continue;
            var cost = f * 10 + (lastS != null ? Math.abs(s - lastS) : 0);
            if (!best || cost < best.cost) best = { s: s, f: f, cost: cost };
          }
          if (best) { n.s = best.s; n.f = best.f; lastS = best.s; if (flags) { if (had) flags.tabFixed++; else flags.tabGuessed++; } }
          else { delete n.s; delete n.f; if (flags) flags.tabNone++; }
        });
      });
    });
    return N;
  }
  function fixTab(score, flags) {
    flags = flags || { tabFixed: 0, tabGuessed: 0, tabNone: 0 };
    if (isDrumMain(score)) { score.strings = 0; }
    else {
      var N = fixTabLists(score.measures.map(function (b) { return b.events; }), score.instrument, score.tuning, transOf(score), flags);
      if (N) { if (!score.tuning) score.tuning = (STD[score.instrument] || STD.guitar).slice(); score.strings = score.tuning.length; }
      else score.strings = 0;
    }
    (score.parts || []).forEach(function (p) {
      if (p.instrument === "drums" || p.program === -1) { p.strings = 0; return; }
      var N2 = fixTabLists((p.measures || []).map(function (m) { return m.events; }), p.instrument, p.tuning, p.octave || 0, flags);
      if (N2) { if (!p.tuning) p.tuning = (STD[p.instrument] || STD.guitar).slice(); p.strings = p.tuning.length; }
      else p.strings = 0;
    });
  }

  /* Final checks: order, tab agreement, bar lengths, ties. Returns flags. */
  function finishScore(score) {
    var flags = { off: [], tabFixed: 0, tabGuessed: 0, tabNone: 0, junk: score.junk || 0 };
    if (score.order) {
      var byN = barIndexByN(score);
      var ord = score.order.filter(function (n) { return byN[n] != null; });
      var straight = ord.length === score.measures.length && ord.every(function (n, i) { return byN[n] === i; });
      score.order = ord.length && !straight ? ord : null;
    }
    var bl = barLen(score, 0), mt = meta(score);
    if (!score.pickup && score.measures.length > 1) {
      var s0 = barSum(score.measures[0]), sl = barSum(score.measures[score.measures.length - 1]);
      if (s0 < mt[0].len - 0.02 && Math.abs(s0 + sl - mt[score.measures.length - 1].len) < 0.02) score.pickup = s0;
    }
    fixTab(score, flags);
    markTies(score);
    var bad = checkBars(score);
    flags.off = bad.map(function (i) { return score.measures[i].n; });
    return flags;
  }
  /* For scores PAImport made: it already padded the bars and marked ties; this only keeps the app's fields in step. */
  function finishImported(score) {
    var flags = { off: [], tabFixed: 0, tabGuessed: 0, tabNone: 0, junk: 0 };
    var bad = checkBars(score, true);
    flags.off = bad.map(function (i) { return score.measures[i].n; });
    return flags;
  }

  /* ================================================================ transposing (a copy) */
  function transposed(score, semis) {
    semis = Math.round(+semis || 0);
    if (!semis) return score;
    var sc = JSON.parse(JSON.stringify(score));
    var newKey = transposeKey(score.key, semis), flat = flatKey(newKey);
    sc.key = newKey;
    function shiftEvents(evs) {
      evs.forEach(function (e) {
        e.notes.forEach(function (n) {
          if (n.drum != null) return;
          var p = parsePitch(n.pitch);
          if (!p) return;
          n.pitch = spell(p.midi + semis, flat);
          delete n.f;      // re-fretted below, on the same string where it fits
        });
      });
    }
    var kflat = flat;
    sc.measures.forEach(function (b) {
      if (b.key) { b.key = transposeKey(b.key, semis); kflat = flatKey(b.key); }
      (b.chords || []).forEach(function (c) { c.name = transposeChord(c.name, semis, kflat); });
      shiftEvents(b.events);
    });
    (sc.parts || []).forEach(function (p) {
      if (p.instrument === "drums" || p.program === -1) return;
      (p.measures || []).forEach(function (m) { shiftEvents(m.events); });
    });
    var drumMain = isDrumMain(sc);
    if (!drumMain && sc.strings) fixTabLists(sc.measures.map(function (b) { return b.events; }), sc.instrument, sc.tuning, transOf(sc), null);
    (sc.parts || []).forEach(function (p) {
      if (p.strings && p.instrument !== "drums") fixTabLists(p.measures.map(function (m) { return m.events; }), p.instrument, p.tuning, p.octave || 0, null);
    });
    markTies(sc);
    return sc;
  }

  /* ================================================================ counting labels */
  /* off: beat offset inside the bar (quarter beats). Returns the label for an event starting there: "1", "e", "&", "a", "trip", "let". */
  function countLabel(off, time) {
    var d = time[1], n = time[0];
    var compound = d === 8 && n % 3 === 0 && n >= 6, beat = compound ? 1.5 : 4 / d;
    if (beat < 1 && !compound) beat = 1;     // x/8 simple meters count in quarters
    var bi = Math.floor((off + 1e-6) / beat), r = off - bi * beat;
    if (r < 1e-3) return String(bi + 1);
    if (compound) { var u = r / 0.5; return Math.abs(u - 1) < 0.03 ? "la" : Math.abs(u - 2) < 0.03 ? "li" : "·"; }
    var q = r / beat;
    if (Math.abs(q - 0.5) < 0.02) return "&";
    if (Math.abs(q - 0.25) < 0.02) return "e";
    if (Math.abs(q - 0.75) < 0.02) return "a";
    if (Math.abs(q - 1 / 3) < 0.02) return "trip";
    if (Math.abs(q - 2 / 3) < 0.02) return "let";
    return "·";
  }

  SC.clamp = clamp; SC.parsePitch = parsePitch; SC.midiName = midiName; SC.spell = spell; SC.parseFrac = parseFrac; SC.parseTime = parseTime; SC.validTime = validTime;
  SC.noteMidi = noteMidi; SC.barSum = barSum; SC.timeLen = timeLen; SC.transOf = transOf; SC.STD = STD; SC.INST_NAME = INST_NAME;
  SC.parseKey = parseKey; SC.keyAccs = keyAccs; SC.transposeKey = transposeKey; SC.transposeChord = transposeChord; SC.flatKey = flatKey;
  SC.defaultProgram = defaultProgram; SC.isDrumMain = isDrumMain; SC.partName = partName; SC.hasTab = hasTab; SC.hasChords = hasChords; SC.sections = sections;
  SC.meta = meta; SC.barLen = barLen; SC.parts = parts; SC.barIndexByN = barIndexByN; SC.expectedLens = expectedLens; SC.checkBars = checkBars;
  SC.markTies = markTies; SC.fixTab = fixTab; SC.fixTabLists = fixTabLists;
  SC.normalizePage = normalizePage; SC.normalizeBar = normalizeBar; SC.mergePages = mergePages; SC.finishScore = finishScore; SC.finishImported = finishImported;
  SC.transposed = transposed; SC.countLabel = countLabel; SC.pitchStr = pitchStr;
})();
