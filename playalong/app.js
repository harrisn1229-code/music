/* Play Along: photograph sheet music or tab, have Claude read it once, then play along with it.
   Pieces live on this device only (localStorage "playalong:v1" for the scores, IndexedDB "music-playalong" for the photos).
   Sections: storage, music model (reading Claude's answer), transcription, timeline, audio engine,
   abc conversion, views (list, add sheet, player, tab, notes, page). */
(function () {
  "use strict";

  var LS_KEY = "playalong:v1", DB_NAME = "music-playalong", STORE = "pages";
  var ACCENT_FALLBACK = "#A63DB8";
  var $ = function (id) { return document.getElementById(id); };

  /* ================================================================ helpers */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function logCall(fn) { try { var L = window.MusicLog; if (L && L[fn]) L[fn].apply(L, Array.prototype.slice.call(arguments, 1)); } catch (e) {} }
  var SVGNS = "http://www.w3.org/2000/svg";
  function sv(tag, attrs, parent, text) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/></svg>',
    loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></svg>',
    start: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 5v14"/><path d="M19 5.5v13L9 12z" fill="currentColor"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/></svg>',
    dots: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5.5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="18.5" r="1.8"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/></svg>'
  };

  /* ================================================================ storage */
  var data = { pieces: [] };
  function loadData() {
    try { var d = JSON.parse(lsGet(LS_KEY) || "null"); if (d && Array.isArray(d.pieces)) data = d; } catch (e) {}
  }
  function saveData() { lsSet(LS_KEY, JSON.stringify(data)); }
  var saveTimer = 0;
  function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(saveData, 400); }
  function pieceById(id) { for (var i = 0; i < data.pieces.length; i++) if (data.pieces[i].id === id) return data.pieces[i]; return null; }

  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = function () { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: "id" }); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    dbp.catch(function () { dbp = null; });
    return dbp;
  }
  function tx(mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction(STORE, mode), out = fn(t.objectStore(STORE));
        t.oncomplete = function () { res(out && out.result); };
        t.onerror = t.onabort = function () { rej(t.error); };
      });
    });
  }
  function pgPut(rec) { return tx("readwrite", function (s) { return s.put(rec); }); }
  function pgGet(id) { return tx("readonly", function (s) { return s.get(id); }); }
  function pgDel(id) { return tx("readwrite", function (s) { return s.delete(id); }); }

  /* ================================================================ music model */
  var PITCH_RE = /^([A-G])(bb|b|#|x|##)?(-?\d)$/;
  var STEP = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var ACC = { "": 0, b: -1, bb: -2, "#": 1, x: 2, "##": 2 };
  var NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  var STD = { bass: [28, 33, 38, 43], guitar: [40, 45, 50, 55, 59, 64] };
  var INST_NAME = { bass: "Bass", guitar: "Guitar", piano: "Piano", other: "Music" };

  function parsePitch(s) {
    var m = PITCH_RE.exec(String(s == null ? "" : s).trim().replace(/♯/g, "#").replace(/♭/g, "b"));
    if (!m) return null;
    var acc = ACC[m[2] || ""], oct = +m[3];
    return { letter: m[1], acc: acc, oct: oct, midi: 12 * (oct + 1) + STEP[m[1]] + acc };
  }
  function midiName(m) { return NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1); }
  function parseFrac(v) {
    if (typeof v === "number") return isFinite(v) ? v : NaN;
    var s = String(v == null ? "" : v).trim(), m;
    if ((m = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(s))) return +m[2] ? +m[1] / +m[2] : NaN;
    if ((m = /^(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(s))) return +m[3] ? +m[1] + +m[2] / +m[3] : NaN;
    if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
    return NaN;
  }
  function parseTime(s) {
    var m = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(String(s || ""));
    if (!m || !+m[1] || !+m[2]) return [4, 4];
    return [+m[1], +m[2]];
  }
  function barLen(score) { return score.time[0] * 4 / score.time[1]; }
  function transOf(score) { return (score.instrument === "bass" || score.instrument === "guitar" || score.clef === "treble8vb") ? -12 : 0; }
  function evLen(ev) { return ev.d; }
  function barSum(bar) { var s = 0; for (var i = 0; i < bar.events.length; i++) s += bar.events[i].d; return s; }
  function fracStr(x) {
    // short readable form of a beat count for messages: 3.5
    return String(Math.round(x * 1000) / 1000);
  }

  /* Turns the tool input from one page into a clean page object: numbers instead of fraction strings,
     only pitches that parse, no zero-length events. Counts what it had to drop. */
  function normalizePage(inp, o) {
    o = o || {};
    inp = inp && typeof inp === "object" ? inp : {};
    var junk = 0;
    var inst = ["bass", "guitar", "piano", "other"].indexOf(inp.instrument) >= 0 ? inp.instrument : "other";
    if (o.hint && o.hint !== "auto") inst = o.hint;
    var tuning = null;
    if (Array.isArray(inp.tuning) && inp.tuning.length >= 2) {
      var tm = inp.tuning.map(function (p) { var q = parsePitch(p); return q ? q.midi : null; });
      if (tm.every(function (x) { return x != null; })) {
        // lowest string first; a list that came in the other way round is turned over
        if (tm[0] > tm[tm.length - 1]) tm.reverse();
        tuning = tm;
      }
    }
    var clef = ["treble", "bass", "treble8vb", "grand"].indexOf(inp.clef) >= 0 ? inp.clef : (inst === "bass" ? "bass" : inst === "guitar" ? "treble8vb" : "treble");
    var tempo = typeof inp.tempo === "number" && isFinite(inp.tempo) && inp.tempo >= 20 && inp.tempo <= 400 ? Math.round(inp.tempo) : null;
    var time = parseTime(inp.time);
    var pk = parseFrac(inp.pickup);
    var page = {
      title: typeof inp.title === "string" ? inp.title.trim().slice(0, 120) : "",
      instrument: inst, tuning: tuning, clef: clef, key: typeof inp.key === "string" && inp.key.trim() ? inp.key.trim() : "C",
      time: time, tempo: tempo, swing: !!inp.swing, pickup: pk > 0 ? pk : 0,
      measures: [], order: null, uncertain: typeof inp.uncertain === "string" ? inp.uncertain.trim() : "", junk: 0
    };
    var bl = time[0] * 4 / time[1];
    if (page.pickup >= bl - 0.01) page.pickup = 0;
    var ms = Array.isArray(inp.measures) ? inp.measures : [];
    for (var i = 0; i < ms.length; i++) {
      var b = normalizeBar(ms[i], i + 1, bl);
      junk += b.junk;
      page.measures.push(b.bar);
    }
    if (Array.isArray(inp.order)) {
      var ord = inp.order.map(function (x) { return Math.round(+x); }).filter(function (x) { return isFinite(x) && x > 0; });
      if (ord.length) page.order = ord;
    }
    page.junk = junk;
    return page;
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
    var evs = Array.isArray(m.events) ? m.events : [];
    evs.forEach(function (e) {
      var d = parseFrac(e && e.d);
      if (!(d > 0.0001) || d > 32) { junk++; return; }
      var notes = [], seen = {}, dropped = 0, raw = e && Array.isArray(e.notes) ? e.notes : [];
      raw.forEach(function (n) {
        var p = parsePitch(n && n.pitch);
        if (!p) { dropped++; return; }
        if (seen[p.midi]) return;
        seen[p.midi] = 1;
        var note = { pitch: p.letter + (p.acc === 0 ? "" : p.acc === 1 ? "#" : p.acc === 2 ? "x" : p.acc === -1 ? "b" : "bb") + p.oct };
        var s = Math.round(+n.string), f = Math.round(+n.fret);
        if (s >= 1 && s <= 12 && n.string != null) note.s = s;
        if (f >= 0 && f <= 30 && n.fret != null && isFinite(+n.fret)) note.f = f;
        if (n.tie) note.tie = true;
        notes.push(note);
      });
      junk += dropped;
      bar.events.push({ d: d, notes: notes });
    });
    if (!bar.events.length) { bar.events.push({ d: bl, notes: [] }); bar.empty = true; junk++; }
    return { bar: bar, junk: junk };
  }

  /* Joins the page objects of a multi-page piece into one score. Header fields come from the first page. */
  function mergePages(pages) {
    var first = pages[0];
    var score = {
      title: first.title, instrument: first.instrument, tuning: first.tuning, clef: first.clef, key: first.key,
      time: first.time, tempo: first.tempo, swing: first.swing, pickup: first.pickup, measures: [], order: null, uncertain: []
    };
    var orders = [], anyOrder = false, junk = 0, lastN = 0;
    pages.forEach(function (pg, k) {
      if (k > 0) {
        if (score.tempo == null && pg.tempo != null) score.tempo = pg.tempo;
        if (!score.tuning && pg.tuning) score.tuning = pg.tuning;
        if (!score.title && pg.title) score.title = pg.title;
      }
      var off = 0;
      if (pg.measures.length && pg.measures[0].n <= lastN) off = lastN - pg.measures[0].n + 1;
      var ns = [];
      pg.measures.forEach(function (b) { b.n += off; b.pg = k; ns.push(b.n); score.measures.push(b); lastN = Math.max(lastN, b.n); });
      if (pg.order) { anyOrder = true; orders.push(pg.order.map(function (x) { return x + off; })); }
      else orders.push(ns);
      if (pg.uncertain) score.uncertain.push((pages.length > 1 ? "Page " + (k + 1) + ": " : "") + pg.uncertain);
      junk += pg.junk;
    });
    if (anyOrder) score.order = [].concat.apply([], orders);
    score.uncertain = score.uncertain.join("\n");
    score.junk = junk;
    return score;
  }

  /* Final checks that need the whole score: order, tab agreement, bar lengths, ties. Returns flags. */
  function finishScore(score) {
    var flags = { off: [], tabFixed: 0, tabGuessed: 0, tabNone: 0, junk: score.junk || 0 };
    // an order that points at bars that are not there is dropped; one that is just 1..n is no order at all
    if (score.order) {
      var byN = barIndexByN(score);
      var ord = score.order.filter(function (n) { return byN[n] != null; });
      var straight = ord.length === score.measures.length && ord.every(function (n, i) { return byN[n] === i; });
      score.order = ord.length && !straight ? ord : null;
    }
    // bars with several bars sharing a number: keep the first when something points at it
    var bl = barLen(score);
    // a pickup that was not announced but is there: a short first bar that the last bar completes
    if (!score.pickup && score.measures.length > 1) {
      var s0 = barSum(score.measures[0]), sl = barSum(score.measures[score.measures.length - 1]);
      if (s0 < bl - 0.02 && Math.abs(s0 + sl - bl) < 0.02) score.pickup = s0;
    }
    fixTab(score, flags);
    markTies(score);
    var bad = checkBars(score);
    flags.off = bad.map(function (i) { return score.measures[i].n; });
    return flags;
  }
  function barIndexByN(score) {
    var by = {};
    score.measures.forEach(function (b, i) { if (by[b.n] == null) by[b.n] = i; });
    return by;
  }
  function expectedLens(score, i) {
    var bl = barLen(score), ok = [bl];
    if (score.pickup > 0) {
      if (i === 0) ok.push(score.pickup);
      if (i === score.measures.length - 1 && i > 0) ok.push(bl - score.pickup);
    }
    return ok;
  }
  /* Sets bar.bad (and bar.sum) on every bar whose events don't add up; returns the indices. */
  function checkBars(score) {
    var out = [];
    score.measures.forEach(function (b, i) {
      b.sum = barSum(b);
      var ok = expectedLens(score, i).some(function (L) { return Math.abs(b.sum - L) < 0.02; });
      if (ok) delete b.bad; else { b.bad = true; out.push(i); }
    });
    return out;
  }
  function markTies(score) {
    var prev = null;
    score.measures.forEach(function (b) {
      b.events.forEach(function (ev) {
        ev.notes.forEach(function (n) {
          n.cont = !!(prev && prev.notes.some(function (p) { return p.tie && p.pitch === n.pitch; }));
        });
        prev = ev;
      });
    });
  }
  function noteMidi(n) { var p = parsePitch(n.pitch); return p ? p.midi : 60; }

  /* Tab and staff have to agree. The staff pitch is what sounds; the fret is only recomputed for display. */
  function fixTab(score, flags) {
    var inst = score.instrument;
    var hasTab = score.measures.some(function (b) { return b.events.some(function (e) { return e.notes.some(function (n) { return n.s != null && n.f != null; }); }); });
    if (inst !== "bass" && inst !== "guitar" && !(hasTab && score.tuning)) { score.strings = 0; return; }
    if (!score.tuning) score.tuning = (STD[inst] || STD.guitar).slice();
    var T = score.tuning, N = T.length, tr = transOf(score), lastS = null;
    score.strings = N;
    score.measures.forEach(function (b) {
      b.events.forEach(function (ev) {
        ev.notes.forEach(function (n) {
          var snd = noteMidi(n) + tr;
          var ok = n.s != null && n.f != null && n.s <= N && T[N - n.s] + n.f === snd;
          if (ok) { lastS = n.s; return; }
          var had = n.s != null && n.f != null;
          if (n.s != null && n.s <= N) {
            var fr = snd - T[N - n.s];
            if (fr >= 0 && fr <= 24) { n.f = fr; flags.tabFixed++; lastS = n.s; return; }
          }
          // lowest fret that works; ties go to the string nearest the last one used
          var best = null;
          for (var s = 1; s <= N; s++) {
            var f = snd - T[N - s];
            if (f < 0 || f > 24) continue;
            var cost = f * 10 + (lastS != null ? Math.abs(s - lastS) : 0);
            if (!best || cost < best.cost) best = { s: s, f: f, cost: cost };
          }
          if (best) { n.s = best.s; n.f = best.f; lastS = best.s; if (had) flags.tabFixed++; else flags.tabGuessed++; }
          else { delete n.s; delete n.f; flags.tabNone++; }
        });
      });
    });
  }

  /* ================================================================ transcription */
  var SYSTEM = [
    "You transcribe sheet music and tablature from photos so a practice app can play it back. The musician photographed music they own, for their own practice.",
    "",
    "Read every bar exactly as written. Do not simplify, correct, or \"improve\" anything. Ignore prose, exercise text, headers, page numbers, and the edges of neighbouring pages.",
    "",
    "Rules",
    "- Pitches: scientific pitch names with middle C = C4 (e.g. G2, Bb3, F#4). Give the WRITTEN pitch on the staff, with the key signature and any accidentals in the bar already applied (in G major a note on the F line is F#). Do not transpose for the instrument; the app does that.",
    "- Durations: \"d\" is the length in quarter-note beats, as a fraction string: whole \"4\", half \"2\", dotted quarter \"3/2\", quarter \"1\", dotted eighth \"3/4\", eighth \"1/2\", sixteenth \"1/4\", triplet eighth \"1/3\", triplet quarter \"2/3\". Every bar's durations must add up to the time signature (4/4 = 4, 3/4 = 3, 6/8 = 3, 12/8 = 6), except a pickup bar.",
    "- Rests are events with an empty notes array.",
    "- Ties: set tie: true on a note that is tied to the same pitch in the next event.",
    "- Tab: if there is a tab staff, give string and fret for every note. Strings are numbered from the highest-pitched string = 1 (on 4-string bass, string 4 is the low E). The tab and the staff must agree: written pitch minus one octave (bass and guitar sound an octave below written) must equal the open string's pitch plus the fret. Where they seem to disagree, look again at both before answering.",
    "- Chord symbols: give them where they appear, with their beat position in the bar.",
    "- Repeats, endings, D.S., D.C., codas: mark them on the bars and also give \"order\", the bar numbers in the order they are played. Leave order null if the music is simply played straight through.",
    "- If something truly can't be read, make your best reading and say which bar in \"uncertain\"."
  ].join("\n");

  var MEASURE_SCHEMA = {
    type: "object", required: ["n", "events"], properties: {
      n: { type: "integer" },
      chords: { type: "array", items: { type: "object", required: ["at", "name"], properties: { at: { type: "string", description: "beat offset in quarter beats from bar start, fraction string" }, name: { type: "string" } } } },
      repeatStart: { type: "boolean" }, repeatEnd: { type: "integer", description: "times played in total, e.g. 2" }, ending: { type: "integer" },
      events: { type: "array", items: { type: "object", required: ["d", "notes"], properties: {
        d: { type: "string" },
        notes: { type: "array", items: { type: "object", required: ["pitch"], properties: {
          pitch: { type: "string" }, string: { type: ["integer", "null"] }, fret: { type: "integer" }, tie: { type: "boolean" } } } }
      } } }
    }
  };
  var TOOL = {
    name: "save_transcription",
    description: "Save the transcription of this page of music.",
    input_schema: {
      type: "object", required: ["title", "instrument", "clef", "key", "time", "measures"],
      properties: {
        title: { type: "string", description: "Title as printed, or a short description like 'Exercise 1' " },
        instrument: { type: "string", enum: ["bass", "guitar", "piano", "other"] },
        tuning: { type: ["array", "null"], items: { type: "string" }, description: "Sounding open-string pitches from LOWEST string to highest, if tab or a tuning is given. Standard bass: E1 A1 D2 G2. Standard guitar: E2 A2 D3 G3 B3 E4." },
        clef: { type: "string", enum: ["treble", "bass", "treble8vb", "grand"] },
        key: { type: "string", description: "e.g. G, Bb, F#m, C" },
        time: { type: "string", description: "e.g. 4/4" },
        tempo: { type: ["number", "null"], description: "Quarter-note bpm if marked, else null" },
        swing: { type: "boolean" },
        pickup: { type: "string", description: "Length of a pickup bar in quarter beats as a fraction string, '0' if none" },
        measures: { type: "array", items: MEASURE_SCHEMA },
        order: { type: ["array", "null"], items: { type: "integer" } },
        uncertain: { type: "string" }
      }
    }
  };
  var FIX_TOOL = {
    name: "fix_bars",
    description: "Save the corrected bars.",
    input_schema: { type: "object", required: ["measures"], properties: { measures: { type: "array", items: MEASURE_SCHEMA } } }
  };

  function AbortErr() { var e = new Error("Cancelled"); e.name = "AbortError"; return e; }
  function decodeBlob(blob) {
    if (window.createImageBitmap) {
      return createImageBitmap(blob, { imageOrientation: "from-image" }).catch(function () { return decodeImg(blob); });
    }
    return decodeImg(blob);
  }
  function decodeImg(blob) {
    return new Promise(function (res, rej) {
      var u = URL.createObjectURL(blob), im = new Image();
      im.onload = function () { URL.revokeObjectURL(u); res(im); };
      im.onerror = function () { URL.revokeObjectURL(u); rej(new Error("That image could not be opened.")); };
      im.src = u;
    });
  }
  function srcSize(im) { return { w: im.naturalWidth || im.videoWidth || im.width, h: im.naturalHeight || im.videoHeight || im.height }; }
  /* Draws a region of an image (sx, sy, sw, sh) scaled so its long edge is at most `max`. */
  function drawRegion(im, sx, sy, sw, sh, max) {
    var k = Math.min(1, max / Math.max(sw, sh));
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(sw * k)); c.height = Math.max(1, Math.round(sh * k));
    var g = c.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(im, sx, sy, sw, sh, 0, 0, c.width, c.height);
    return c;
  }
  function canvasB64(c) { return c.toDataURL("image/jpeg", 0.85).split(",")[1]; }
  function imgBlock(c) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: canvasB64(c) } }; }

  /* The full page, then close-ups of its top and bottom (overlapping) halves. */
  function imageBlocks(blob) {
    return decodeBlob(blob).then(function (im) {
      var s = srcSize(im), w = s.w, h = s.h, long = h >= w;
      var blocks = [imgBlock(drawRegion(im, 0, 0, w, h, 1568))];
      // close-ups split the long edge; a landscape page is split left and right
      if (long) {
        blocks.push(imgBlock(drawRegion(im, 0, 0, w, Math.round(h * 0.55), 1568)));
        blocks.push(imgBlock(drawRegion(im, 0, Math.round(h * 0.45), w, h - Math.round(h * 0.45), 1568)));
      } else {
        blocks.push(imgBlock(drawRegion(im, 0, 0, Math.round(w * 0.55), h, 1568)));
        blocks.push(imgBlock(drawRegion(im, Math.round(w * 0.45), 0, w - Math.round(w * 0.45), h, 1568)));
      }
      if (im.close) try { im.close(); } catch (e) {}
      return blocks;
    });
  }

  function toolInput(res, name, what) {
    var tu = (res.content || []).filter(function (b) { return b.type === "tool_use" && b.name === name; })[0] || (res.content || []).filter(function (b) { return b.type === "tool_use"; })[0];
    if (!tu || !tu.input || typeof tu.input !== "object") {
      throw new Error(res.stop_reason === "max_tokens" ? what + " is too much to read in one go." : "Couldn't read " + what + ". Try again.");
    }
    return tu.input;
  }
  function pageText(k, n, hint, sofar) {
    var t = "Image 1 is the whole page; images 2 and 3 are close-ups of its top and bottom halves (they overlap in the middle, so do not count the overlap twice). Transcribe every bar on this page and call save_transcription.";
    if (hint && hint !== "auto") t += " The instrument is " + hint + ".";
    if (k > 0 && sofar) {
      t += " This page continues the same piece. So far: instrument " + sofar.instrument + ", tuning " + (sofar.tuning ? sofar.tuning.map(midiName).join(" ") : "none given") + ", key " + sofar.key + ", time " + sofar.time[0] + "/" + sofar.time[1] + ", last bar number " + sofar.last + ". Continue numbering from " + (sofar.last + 1) + " and don't repeat bars already read.";
    }
    if (n > 1) t += " (Page " + (k + 1) + " of " + n + ".)";
    return t;
  }

  /* Reads every page in order. blobs: JPEG blobs. opt: hint, signal, onProgress(k, n, label).
     Returns { score, flags }. Throws on the first page that cannot be read. */
  function transcribe(blobs, opt) {
    opt = opt || {};
    var pages = [], raws = [], imgCache = [];
    var n = blobs.length;
    function check() { if (opt.signal && opt.signal.aborted) throw AbortErr(); }
    var chain = Promise.resolve();
    blobs.forEach(function (blob, k) {
      chain = chain.then(function () {
        check();
        if (opt.onProgress) opt.onProgress("Reading page " + (k + 1) + " of " + n + "…");
        return imageBlocks(blob).then(function (blocks) {
          imgCache[k] = blocks;
          var sofar = null;
          if (pages.length) {
            var merged = mergePages(pages.map(clonePage));
            sofar = { instrument: merged.instrument, tuning: merged.tuning, key: merged.key, time: merged.time, last: merged.measures.length ? merged.measures[merged.measures.length - 1].n : 0 };
          }
          return abortable(window.MusicAI.call({
            system: SYSTEM,
            messages: [{ role: "user", content: blocks.concat([{ type: "text", text: pageText(k, n, opt.hint, sofar) }]) }],
            tools: [TOOL], tool_choice: { type: "tool", name: "save_transcription" },
            max_tokens: 48000, effort: "high", signal: opt.signal, stream: true,
            onDelta: function (part) {
              // show the bar being read as the reply streams in
              var m, last = 0, re = /"n"\s*:\s*(\d+)/g;
              while ((m = re.exec(part))) last = +m[1];
              if (last && opt.onProgress) opt.onProgress("Reading " + (n > 1 ? "page " + (k + 1) + " of " + n + " · " : "") + "bar " + last + "…");
            }
          }), opt.signal);
        }).then(function (res) {
          check();
          var inp = toolInput(res, "save_transcription", n > 1 ? "page " + (k + 1) : "that page");
          var pg = normalizePage(inp, { hint: opt.hint });
          if (!pg.measures.length || (pg.measures.length === 1 && pg.measures[0].empty)) throw new Error("No music found on " + (n > 1 ? "page " + (k + 1) : "that page") + ".");
          raws[k] = inp.measures;
          pages.push(pg);
        });
      });
    });
    return chain.then(function () {
      var score = mergePages(pages);
      var flags = finishScore(score);
      return fixPass(score, flags, imgCache, opt).then(function () { return { score: score, flags: flags }; });
    });
  }
  function clonePage(p) { return JSON.parse(JSON.stringify(p)); }
  /* A request that stops waiting the moment the signal fires, whatever the connection layer does. */
  function abortable(promise, signal) {
    if (!signal) return promise;
    return new Promise(function (res, rej) {
      if (signal.aborted) return rej(AbortErr());
      var on = function () { rej(AbortErr()); };
      signal.addEventListener("abort", on);
      promise.then(function (v) { signal.removeEventListener("abort", on); res(v); }, function (e) { signal.removeEventListener("abort", on); rej(e); });
    });
  }

  /* One more request per page that has bars whose durations don't add up. */
  function fixPass(score, flags, imgCache, opt) {
    var badIdx = score.measures.map(function (b, i) { return b.bad ? i : -1; }).filter(function (i) { return i >= 0; });
    if (!badIdx.length) return Promise.resolve();
    var byPage = {};
    badIdx.forEach(function (i) { var p = score.measures[i].pg || 0; (byPage[p] = byPage[p] || []).push(i); });
    var chain = Promise.resolve();
    Object.keys(byPage).forEach(function (pk) {
      chain = chain.then(function () {
        if (opt.signal && opt.signal.aborted) throw AbortErr();
        var idxs = byPage[pk], blocks = imgCache[+pk];
        if (!blocks) return;
        if (opt.onProgress) opt.onProgress("Checking " + idxs.length + (idxs.length === 1 ? " bar" : " bars") + "…");
        var bl = barLen(score);
        var lines = idxs.map(function (i) {
          var b = score.measures[i], want = expectedLens(score, i)[0];
          return "bar " + b.n + " adds to " + fracStr(b.sum) + " beats, should be " + fracStr(want);
        });
        var send = idxs.map(function (i) { return rawBar(score.measures[i]); });
        var text = "These bars don't add up to the time signature (" + score.time[0] + "/" + score.time[1] + "): " + lines.join("; ") + ". Look at them again in the images and return them corrected.\n\n" + JSON.stringify(send);
        return abortable(window.MusicAI.call({
          system: SYSTEM,
          messages: [{ role: "user", content: blocks.concat([{ type: "text", text: text }]) }],
          tools: [FIX_TOOL], tool_choice: { type: "tool", name: "fix_bars" },
          max_tokens: 24000, effort: "high", signal: opt.signal, stream: true
        }), opt.signal).then(function (res) {
          var inp = toolInput(res, "fix_bars", "the corrected bars");
          var list = Array.isArray(inp.measures) ? inp.measures : [];
          list.forEach(function (m) {
            var nb = normalizeBar(m, 0, bl).bar;
            var at = -1;
            idxs.forEach(function (i) { if (score.measures[i].n === nb.n) at = i; });
            if (at < 0) return;
            var old = score.measures[at];
            var tmp = { time: score.time, pickup: score.pickup, measures: score.measures.slice(), instrument: score.instrument, tuning: score.tuning, clef: score.clef };
            tmp.measures[at] = nb;
            var f2 = { tabFixed: 0, tabGuessed: 0, tabNone: 0 };
            var keep = { measures: [nb], instrument: score.instrument, tuning: score.tuning, clef: score.clef };
            fixTab(keep, f2);
            var ok = expectedLens(score, at).some(function (L) { return Math.abs(barSum(nb) - L) < 0.02; });
            if (ok && !nb.empty) {
              nb.pg = old.pg;
              if (!nb.chords.length && old.chords.length) nb.chords = old.chords;
              score.measures[at] = nb;
              flags.fixed = (flags.fixed || 0) + 1;
              flags.tabFixed += f2.tabFixed; flags.tabGuessed += f2.tabGuessed;
            }
          });
        }).catch(function (e) {
          if (e && e.name === "AbortError") throw e;
          // the first reading stands; the bars stay flagged
        });
      });
    });
    return chain.then(function () {
      markTies(score);
      var bad = checkBars(score);
      flags.off = bad.map(function (i) { return score.measures[i].n; });
    });
  }
  function rawBar(b) {
    var o = { n: b.n, events: b.events.map(function (e) {
      return { d: fracOf(e.d), notes: e.notes.map(function (n) { var r = { pitch: n.pitch }; if (n.s != null) r.string = n.s; if (n.f != null) r.fret = n.f; if (n.tie) r.tie = true; return r; }) };
    }) };
    if (b.chords.length) o.chords = b.chords.map(function (c) { return { at: fracOf(c.at), name: c.name }; });
    if (b.repeatStart) o.repeatStart = true;
    if (b.repeatEnd) o.repeatEnd = b.repeatEnd;
    if (b.ending) o.ending = b.ending;
    return o;
  }
  function fracOf(x) {
    for (var den = 1; den <= 12; den++) { var nn = Math.round(x * den); if (Math.abs(nn / den - x) < 0.002) return den === 1 ? String(nn) : nn + "/" + den; }
    return String(Math.round(x * 1000) / 1000);
  }

  /* ================================================================ timeline */
  /* From a score: passes (bars in play order), events with absolute start in quarter beats, the click grid.
     Tied notes are not struck again: the earlier note is lengthened instead. */
  function clickUnit(score) {
    var n = score.time[0], d = score.time[1];
    if (d === 8 && n % 3 === 0 && n >= 6) return 1.5;
    return Math.max(0.5, 4 / d);
  }
  function buildTimeline(score) {
    var bars = score.measures, byN = barIndexByN(score), seq = [];
    if (score.order && score.order.length) seq = score.order.map(function (n) { return byN[n]; }).filter(function (i) { return i != null; });
    if (!seq.length) seq = bars.map(function (_, i) { return i; });
    var tr = transOf(score), unit = clickUnit(score), bl = barLen(score);
    var passes = [], events = [], clicks = [], pos = 0, open = {}, swing = !!score.swing;
    // offsets of each event inside its bar
    var offs = bars.map(function (b) { var o = 0, a = []; b.events.forEach(function (e) { a.push(o); o += e.d; }); a.push(o); return a; });
    seq.forEach(function (bi, pi) {
      var b = bars[bi], len = offs[bi][b.events.length], swungPrev = false;
      passes.push({ bar: bi, start: pos, len: len });
      b.events.forEach(function (e, j) {
        var swungNow = false;
        var ev = { bar: bi, ev: j, pass: pi, start: pos + offs[bi][j], dur: e.d, notes: [], shift: 0, mul: 1 };
        if (swing && Math.abs(e.d - 0.5) < 0.001 && j + 1 < b.events.length && Math.abs(b.events[j + 1].d - 0.5) < 0.001) {
          var o = offs[bi][j];
          if (Math.abs(o - Math.round(o)) < 0.001) { ev.mul = 4 / 3; swungNow = true; }
        }
        if (swungPrev) { ev.shift = 1 / 6; ev.mul = 2 / 3; }
        swungPrev = swungNow;
        var nextOpen = {};
        e.notes.forEach(function (n) {
          var midi = noteMidi(n) + tr, cur = open[midi];
          if (cur) { cur.dur += e.d; if (n.tie) nextOpen[midi] = cur; ev.notes.push({ midi: midi, skip: true, dur: 0 }); }
          else {
            var o2 = { midi: midi, dur: e.d * ev.mul, skip: false, own: e.d * ev.mul };
            ev.notes.push(o2);
            if (n.tie) nextOpen[midi] = o2;
          }
        });
        open = nextOpen;
        events.push(ev);
      });
      // clicks
      var pick = (pi === 0 && score.pickup > 0 && bi === 0);
      if (pick) {
        for (var q = Math.floor(len / unit + 1e-6); q >= 1; q--) { var cp = pos + len - q * unit; if (cp >= pos - 1e-6) clicks.push({ pos: cp, accent: false }); }
      } else {
        for (var k = 0; k * unit < len - 1e-6; k++) clicks.push({ pos: pos + k * unit, accent: k === 0 });
      }
      pos += len;
    });
    return { passes: passes, events: events, clicks: clicks, total: pos, unit: unit, barBeats: bl, offs: offs, seq: seq };
  }
  function firstPassOf(tl, bi) { for (var i = 0; i < tl.passes.length; i++) if (tl.passes[i].bar === bi) return i; return -1; }
  /* Where a position sits: the pass, the bar, the event and the beat inside the bar. */
  function locate(tl, pos) {
    var P = tl.passes, lo = 0, hi = P.length - 1;
    if (!P.length) return null;
    if (pos < 0) pos = 0;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (P[mid].start <= pos + 1e-9) lo = mid; else hi = mid - 1; }
    var p = P[lo], off = clamp(pos - p.start, 0, p.len), o = tl.offs[p.bar], j = 0;
    for (var i = 0; i < o.length - 1; i++) if (o[i] <= off + 1e-9) j = i;
    return { pass: lo, bar: p.bar, ev: j, off: off };
  }
  function eventIndexAt(tl, pos) {
    // index into tl.events of the first event starting at or after pos
    var E = tl.events, lo = 0, hi = E.length;
    while (lo < hi) { var mid = (lo + hi) >> 1; if (E[mid].start < pos - 1e-7) lo = mid + 1; else hi = mid; }
    return lo;
  }

  /* ================================================================ audio engine */
  var TICK_MS = 25, HORIZON = 0.15;
  var E = {
    ctx: null, master: null, instBus: null, clickBus: null, chains: null, piano: null, bufs: {}, voices: [], wake: null, ctxStuck: false,
    running: false, starting: false, segs: [], schedPos: 0, gate: 0, ciActive: false, ciClicks: [], finished: false, endAt: 0,
    worker: null, ivl: null, ciStart: 0, ciBeats: 0, ticks: 0
  };

  // Called from a tap. iOS can leave the audio suspended or interrupted; this wakes it, and rebuilds it if it froze.
  function ensureCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    var ctx = E.ctx;
    if (ctx && (ctx.state === "closed" || E.ctxStuck)) {
      try { var p = ctx.close(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
      E.ctx = ctx = null; E.chains = null; E.piano = null; E.bufs = {}; E.voices = [];
    }
    E.ctxStuck = false;
    if (!ctx) {
      // lets the sound play even when an iPhone's silent switch is on
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
      ctx = E.ctx = new AC();
    }
    if (ctx.state !== "running") { try { var r = ctx.resume(); if (r && r.catch) r.catch(function () {}); } catch (e) {} }
    // a silent sound started inside the tap is what makes iOS hand the page its audio
    try { var s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate); s.connect(ctx.destination); s.start(0); } catch (e) {}
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
    E.chains = {};
    E.piano = null;
    applyVolumes();
  }
  function applyVolumes() {
    if (!E.ctx || !E.instBus) return;
    var P = S.prefs || {}, t = E.ctx.currentTime;
    E.instBus.gain.setTargetAtTime(clamp(P.instVol == null ? 0.8 : P.instVol, 0, 1) * 1.25, t, 0.02);
    E.clickBus.gain.setTargetAtTime(clamp(P.clickVol == null ? 0.7 : P.clickVol, 0, 1) * 1.1, t, 0.02);
  }
  function holdWake(on) {
    try {
      if (on && "wakeLock" in navigator && !E.wake) { navigator.wakeLock.request("screen").then(function (w) { E.wake = w; w.addEventListener("release", function () { E.wake = null; }); if (!E.running) holdWake(false); }).catch(function () {}); }
      else if (!on && E.wake) { var w = E.wake; E.wake = null; w.release().catch(function () {}); }
    } catch (e) {}
  }

  /* ---- Karplus-Strong: a noise burst around a delay line that is the string ---- */
  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; }; }
  function ksSamples(freq, sr, len, kind) {
    var bass = kind === "bass";
    var a = bass ? 0.5 : 0.34;                       // loop filter: 0.5 averages (mellow), lower keeps more brightness
    var t60 = bass ? 2.2 : 2.8;
    var P = sr / freq, D = P - a, N = Math.max(2, Math.floor(D - 0.1)), frac = D - N, C = (1 - frac) / (1 + frac);
    var g = Math.pow(10, -3 * P / (sr * t60));
    var line = new Float32Array(N), rnd = seeded(Math.round(freq * 100) + (bass ? 7 : 31)), mean = 0, i;
    for (i = 0; i < N; i++) line[i] = rnd();
    if (bass) { var pv = 0; for (i = 0; i < N; i++) { pv = 0.6 * line[i] + 0.4 * pv; line[i] = pv; } }   // a softer pluck
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
  function chainFor(kind) {
    if (E.chains[kind]) return E.chains[kind];
    var ctx = E.ctx, inp = ctx.createGain(), lp = ctx.createBiquadFilter(), comp = ctx.createDynamicsCompressor();
    lp.type = "lowpass"; lp.frequency.value = kind === "bass" ? 1800 : 5000; lp.Q.value = kind === "bass" ? 0.7 : 0.5;
    comp.threshold.value = -16; comp.knee.value = 14; comp.ratio.value = 2.5; comp.attack.value = 0.006; comp.release.value = 0.15;
    inp.connect(lp); lp.connect(comp); comp.connect(E.instBus);
    return (E.chains[kind] = { input: inp, lp: lp });
  }
  function killVoice(v, now) {
    try {
      if (v.g) { v.g.gain.cancelScheduledValues(now); v.g.gain.setTargetAtTime(0, now, 0.008); }
      var stopAt = v.t0 > now ? now : now + 0.06;
      if (v.src) v.src.stop(stopAt);
      if (v.oscs) v.oscs.forEach(function (o) { try { o.stop(stopAt); } catch (e) {} });
    } catch (e) {}
  }
  function playString(kind, midi, t, dur, vel) {
    var ctx = E.ctx, rel = kind === "bass" ? 0.04 : 0.12, buf = ksBuffer(kind, clamp(midi, 24, 96));
    var src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf;
    dur = Math.max(dur, 0.05);
    var end = t + dur;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.003);
    g.gain.setValueAtTime(vel, end);
    g.gain.setTargetAtTime(0, end, rel / 3);
    src.connect(g); g.connect(chainFor(kind).input);
    src.start(t); src.stop(end + rel * 3 + 0.05);
    E.voices.push({ t0: t, end: end + rel * 3 + 0.05, src: src, g: g });
  }

  /* ---- piano: Barline's harmonic approach, two slightly detuned strings per note, a closing low-pass, a little room ---- */
  function setupPiano() {
    if (E.piano && E.piano.bus.context === E.ctx) return E.piano;
    var ctx = E.ctx, bus = ctx.createGain(), comp = ctx.createDynamicsCompressor(), verb = ctx.createConvolver();
    comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
    var len = Math.floor(ctx.sampleRate * 1.8), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch), r = seeded(99 + ch); for (var i = 0; i < len; i++) d[i] = r() * Math.pow(1 - i / len, 3.2); }
    verb.buffer = ir;
    var wet = ctx.createGain(); wet.gain.value = 0.16;
    bus.connect(comp); bus.connect(verb); verb.connect(wet); wet.connect(comp);
    comp.connect(E.instBus);
    var harm = [0, 1, 0.42, 0.22, 0.14, 0.08, 0.05, 0.03, 0.02];
    var wave = ctx.createPeriodicWave(new Float32Array(harm.length), new Float32Array(harm));
    return (E.piano = { bus: bus, wave: wave });
  }
  function playPiano(midi, t, dur, vel) {
    var ctx = E.ctx, pn = setupPiano(), f = 440 * Math.pow(2, (midi - 69) / 12);
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
  function playEventNotes(ev, t, spb, limit) {
    var P = S.prefs, snd = P.sound;
    if (snd === "off") return;
    var maxB = limit - ev.start - ev.shift, list = [];
    ev.notes.forEach(function (n) { if (!n.skip) list.push(n); });
    list.sort(function (a, b) { return a.midi - b.midi; });
    var nn = list.length;
    list.forEach(function (n, i) {
      var durB = Math.min(n.dur, maxB);
      if (durB <= 0.001) return;
      var tt = t + (snd === "guitar" && nn >= 3 ? i * 0.012 : 0), dur = durB * spb - (snd === "bass" ? 0.01 : 0);
      if (snd === "bass") playString("bass", n.midi, tt, dur, 0.9);
      else if (snd === "guitar") playString("guitar", n.midi, tt, dur, 0.8 / Math.sqrt(Math.max(1, nn)) + 0.1);
      else playPiano(n.midi, tt, dur, 0.22 / Math.sqrt(Math.max(1, nn)));
    });
  }

  /* ---- the scheduler: a look-ahead loop ticked from a worker, so a busy page does not make it late ---- */
  function lowerBound(arr, pos) {
    var lo = 0, hi = arr.length;
    while (lo < hi) { var m = (lo + hi) >> 1; if (arr[m].pos < pos - 1e-7) lo = m + 1; else hi = m; }
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
  function limitFor(pos) {
    var L = loopRange();
    if (L && pos < L.end - 1e-6) return L.end;
    return S.tl.total;
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
    for (i = eventIndexAt(tl, a); i < tl.events.length && tl.events[i].start < b - 1e-7; i++) {
      var ev = tl.events[i];
      playEventNotes(ev, timeOf(seg, ev.start) + ev.shift * spb, spb, limit);
    }
  }
  function tick() {
    if (!E.running || !E.ctx) return;
    var ctx = E.ctx, now = ctx.currentTime, hz = now + HORIZON, tl = S.tl;
    E.ticks++;
    // drop voices that are over and tempo segments that are behind us
    if (E.voices.length > 40) E.voices = E.voices.filter(function (v) { return v.end > now - 0.2; });
    while (E.segs.length > 2 && E.segs[1].t < now - 3) E.segs.shift();
    if (E.finished) { if (now > E.endAt + 0.05) naturalEnd(); return; }
    if (ctx.state === "interrupted" || ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    for (var guard = 0; guard < 8; guard++) {
      var seg = E.segs[E.segs.length - 1];
      var endPos = seg.pos + (hz - seg.t) / seg.spb;
      var limit = limitFor(E.schedPos), upTo = Math.min(endPos, limit);
      if (upTo > E.schedPos + 1e-9) { scheduleRange(E.schedPos, upTo, seg, limit); E.schedPos = upTo; }
      if (endPos < limit - 1e-9) break;
      // reached the end of the loop or of the piece
      var tw = timeOf(seg, limit), L = loopRange();
      if (L && Math.abs(limit - L.end) < 1e-6) {
        var bpm = seg.bpm, step = S.prefs.speedUp || 0;
        if (step > 0) {
          var base = S.written, cap = bpm < base ? base : base * 1.6;
          bpm = Math.min(cap, bpm + step);
          if (bpm < seg.bpm) bpm = seg.bpm;
        }
        E.segs.push({ t: tw, pos: L.start, spb: 60 / bpm, bpm: bpm, auto: step > 0 });
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
  function engineStart(opt) {
    opt = opt || {};
    if (E.running || E.starting) return Promise.resolve();
    E.starting = true;
    var ctx = ensureCtx();
    if (!ctx) { E.starting = false; return Promise.reject(new Error("This browser can't play sound.")); }
    var ready = ctx.state === "running" ? Promise.resolve() : Promise.race([ctx.resume().catch(function () {}), new Promise(function (r) { setTimeout(r, 600); })]);
    return ready.then(function () {
      E.starting = false;
      var tl = S.tl, L = loopRange();
      var start = S.startPos;
      if (L && (start < L.start - 1e-6 || start >= L.end - 1e-6)) start = L.start;
      if (start >= tl.total - 1e-6) start = 0;
      S.startPos = start;
      var P = S.prefs, ci = P.countIn ? tl.barBeats : 0, spb = 60 / P.bpm, t0 = ctx.currentTime + 0.12;
      applyVolumes();
      E.voices = [];
      E.ciBeats = ci; E.ciStart = start - ci;
      E.segs = [{ t: t0, pos: start - ci, spb: spb, bpm: P.bpm }];
      E.schedPos = start - ci; E.gate = start; E.ciActive = ci > 0; E.ciClicks = [];
      for (var k = 0; k * tl.unit < ci - 1e-6; k++) E.ciClicks.push({ pos: start - ci + k * tl.unit, accent: k === 0 });
      E.finished = false; E.endAt = 0; E.running = true;
      timerStart(); holdWake(true);
      tick();
    });
  }
  /* Moves the playing position without a count-in. */
  function engineSeek(pos) {
    if (!E.running || !E.ctx) return;
    var now = E.ctx.currentTime;
    E.voices.forEach(function (v) { killVoice(v, now); }); E.voices = [];
    var bpm = E.segs[E.segs.length - 1].bpm, t0 = now + 0.06;
    E.segs = [{ t: t0, pos: pos, spb: 60 / bpm, bpm: bpm }];
    E.schedPos = pos; E.ciActive = false; E.finished = false;
    tick();
  }
  /* Where the playhead is right now, in beats from the top. */
  function enginePos() {
    if (!E.running || !E.ctx) return null;
    var lat = Math.min(0.2, (E.ctx.outputLatency || E.ctx.baseLatency || 0));
    var r = posAtTime(E.ctx.currentTime - lat);
    return { pos: r.pos, bpm: r.seg.bpm, seg: r.seg, counting: r.pos < E.gate - 1e-6 && E.ciBeats > 0 && !E.finished };
  }
  function engineBpm(v) {
    if (!E.running) return;
    var seg = E.segs[E.segs.length - 1], tS = timeOf(seg, E.schedPos);
    E.segs.push({ t: tS, pos: E.schedPos, spb: 60 / v, bpm: v });
  }
  function engineStop(soft) {
    if (!E.running) return;
    E.running = false;
    timerStop(); holdWake(false);
    if (E.ctx) {
      var now = E.ctx.currentTime;
      if (!soft) E.voices.forEach(function (v) { killVoice(v, now); });
    }
    E.voices = [];
  }

  /* ================================================================ abc notation (for the Notes view) */
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
  function isTrip(d) { var x = d * 12; return Math.abs(x - Math.round(x)) < 0.02 && Math.round(x) % 3 !== 0; }

  /* Returns { abc, seq } or null when the piece can't be written out. seq lists [bar, event] in the order the notes
     appear on the page, so the player can find each note's shape. */
  function toAbc(score, bpm, per) {
    var key = parseKey(score.key), ks = keyAccs(key.n), bars = score.measures, seq = [];
    var bl = barLen(score), beatLen = (score.time[1] === 8 && score.time[0] % 3 === 0 && score.time[0] >= 6) ? 1.5 : 1;
    var clef = score.clef, grand = clef === "grand";
    var ABCCLEF = { treble: "treble", bass: "bass", treble8vb: "treble-8" };
    function barVoice(bar, bi, filter, withChords) {
      var acc = {}, i, out = "", ev, j;
      for (var l in ks) acc[l] = ks[l];
      var cur = {};                       // accidental in force by letter+octave
      function accOf(letter, oct) { var k = letter + oct; return cur[k] != null ? cur[k] : (ks[letter] || 0); }
      var chordAt = bar.chords.slice(), events = bar.events, off = 0, res = [];
      var trip = null;                    // {left sum, count, started}
      for (j = 0; j < events.length; j++) {
        ev = events[j];
        var notes = ev.notes.filter(filter), units, tok = "";
        var inTrip = isTrip(ev.d);
        units = inTrip ? Math.round(ev.d * 6) : Math.max(1, Math.round(ev.d * 4));
        // chord symbols that fall on or before this event's start
        var pre = "";
        if (withChords) while (chordAt.length && chordAt[0].at <= off + 0.02) { pre += '"' + chordAt.shift().name.replace(/"/g, "") + '"'; }
        if (notes.length === 0) tok = "z" + units;
        else {
          var parts = notes.map(function (n) {
            var p = parsePitch(n.pitch), s = "";
            if (!p) return "";
            var want = p.acc, have = accOf(p.letter, p.oct);
            if (want !== have) { s += want === 2 ? "^^" : want === 1 ? "^" : want === 0 ? "=" : want === -1 ? "_" : "__"; cur[p.letter + p.oct] = want; }
            s += p.oct >= 5 ? p.letter.toLowerCase() + new Array(p.oct - 5 + 1).join("'") : p.letter + new Array(4 - p.oct + 1).join(",");
            return { s: s, tie: !!n.tie };
          }).filter(Boolean);
          if (parts.length === 1) tok = parts[0].s + units + (parts[0].tie ? "-" : "");
          else tok = "[" + parts.map(function (q) { return q.s + (q.tie ? "-" : ""); }).join("") + "]" + units;
        }
        res.push({ pre: pre, tok: tok, inTrip: inTrip, d: ev.d, off: off, rest: notes.length === 0, j: j });
        off += ev.d;
      }
      // leftover chord symbols go on the last event
      if (withChords && chordAt.length && res.length) res[res.length - 1].pre += chordAt.map(function (c) { return '"' + c.name.replace(/"/g, "") + '"'; }).join("");
      // triplet groups: closed when their length is a multiple of half a beat
      for (i = 0; i < res.length; i++) {
        if (!res[i].inTrip) continue;
        var sum = 0, k = i;
        while (k < res.length && res[k].inTrip) { sum += res[k].d; k++; if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) break; }
        if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) { res[i].open = "(3:2:" + (k - i); i = k - 1; }
        else { for (; i < k; i++) res[i].approx = true; i = k - 1; }
      }
      for (i = 0; i < res.length; i++) {
        var r = res[i];
        out += r.pre + (r.open || "") + r.tok;
        var nx = res[i + 1];
        var beamable = nx && !r.rest && !nx.rest && r.d < 1 - 0.01 && nx.d < 1 - 0.01 && Math.floor((r.off + 1e-6) / beatLen) === Math.floor((nx.off + 1e-6) / beatLen);
        if (nx && !beamable) out += " ";
        seq.push([bi, r.j]);
      }
      return out.trim();
    }
    function line(filter, withChords) {
      var s = "";
      var seqBefore = seq.length;
      bars.forEach(function (b, i) {
        var prev = bars[i - 1];
        var sep;
        if (i === 0) sep = b.repeatStart ? "|: " : "";
        else if (prev.repeatEnd && b.repeatStart) sep = " :|: ";
        else if (prev.repeatEnd) sep = " :| ";
        else if (b.repeatStart) sep = " |: ";
        else if (prev.ending && !b.ending) sep = " || ";   // closes the ending's bracket
        else sep = " | ";
        var endTxt = "";
        if (b.ending && (!prev || prev.ending !== b.ending)) endTxt = "[" + b.ending + " ";
        if (i > 0 && endTxt) sep = sep.replace(/\s+$/, "") + " ";
        // Lines broken here rather than by abcjs, so a start repeat opens the next line with its dots.
        if (per && i > 0 && i % per === 0) sep = sep.replace(/^\s*(:?\|\|?)(:?)\s*$/, function (all, end, start) { return " " + end + "\n" + (start ? "|: " : ""); });
        s += sep + endTxt + barVoice(b, i, filter, withChords);
      });
      var last = bars[bars.length - 1];
      s += last.repeatEnd ? " :|" : " |]";
      return { s: s, n: seq.length - seqBefore };
    }
    var head = "X:1\nT:" + String(score.title || "Untitled").replace(/[\n\r]/g, " ") + "\nM:" + score.time[0] + "/" + score.time[1] + "\nL:1/16\nQ:1/4=" + Math.round(bpm || score.tempo || 100) + "\n";
    var abc;
    try {
      if (grand) {
        var v1 = line(function (n) { return noteMidi(n) >= 60; }, true);
        seq = seq.slice(0, v1.n);
        var v2 = line(function (n) { return noteMidi(n) < 60; }, false);
        seq = seq.slice(0, v1.n);
        abc = head + "%%score {1 | 2}\nK:" + key.name + "\nV:1 clef=treble\n" + v1.s + "\nV:2 clef=bass\n" + v2.s + "\n";
      } else {
        var v = line(function () { return true; }, true);
        abc = head + "K:" + key.name + " clef=" + (ABCCLEF[clef] || "treble") + "\n" + v.s + "\n";
      }
    } catch (e) { return null; }
    return { abc: abc, seq: seq, grand: grand };
  }

  /* ================================================================ state */
  var S = {
    route: "list", piece: null, score: null, tl: null, prefs: null, view: "tab", startPos: 0, written: 100,
    loopSel: 0, loopPick: null, playing: false, loc: null, curRow: -1, pageUrls: [], raf: 0, lastPos: 0
  };
  function defaultPrefs(score) {
    var inst = score.instrument;
    return {
      bpm: score.tempo || 100, sound: inst === "bass" ? "bass" : inst === "guitar" ? "guitar" : "piano",
      view: score.strings ? "tab" : "notes", loop: null, click: true, countIn: true, speedUp: 0, instVol: 0.8, clickVol: 0.7
    };
  }
  function savePrefs() { if (S.piece) { S.piece.prefs = S.prefs; saveSoon(); } }
  function showErr(msg) {
    var e = $("err"); e.textContent = msg || ""; e.hidden = !msg;
    clearTimeout(showErr.t);
    if (msg) showErr.t = setTimeout(function () { e.hidden = true; }, 6000);
  }
  function instLabel(score) { return INST_NAME[score.instrument] || "Music"; }
  function summary(p) {
    var s = p.score;
    return instLabel(s) + " · " + s.measures.length + (s.measures.length === 1 ? " bar" : " bars") + " · " + (s.tempo || 100) + " bpm";
  }

  /* ================================================================ dialogs */
  function dialog(html, opt) {
    var d = $("dlg");
    d.innerHTML = '<div class="sh-in">' + html + "</div>";
    if (!d.open) d.showModal();
    return d;
  }
  function closeDlg() { var d = $("dlg"); if (d.open) d.close(); }
  function askText(title, value, ok) {
    var d = dialog('<div class="sh-h"><h2>' + esc(title) + '</h2></div><input class="field" id="dlgIn" maxlength="120" value="' + esc(value) + '" aria-label="' + esc(title) + '"><div class="btns"><button class="btn" id="dlgNo" type="button">Cancel</button><button class="btn pri" id="dlgOk" type="button">Save</button></div>');
    var inp = d.querySelector("#dlgIn");
    setTimeout(function () { inp.focus(); inp.select(); }, 30);
    function go() { var v = inp.value.trim(); if (!v) return; closeDlg(); ok(v); }
    d.querySelector("#dlgOk").onclick = go;
    d.querySelector("#dlgNo").onclick = closeDlg;
    inp.onkeydown = function (e) { if (e.key === "Enter") go(); };
  }
  function confirmBox(msg, label, ok) {
    var d = dialog('<div class="sh-h"><h2>' + esc(msg) + '</h2></div><div class="btns"><button class="btn" id="dlgNo" type="button">Cancel</button><button class="btn dng" id="dlgOk" type="button">' + esc(label) + "</button></div>");
    d.querySelector("#dlgOk").onclick = function () { closeDlg(); ok(); };
    d.querySelector("#dlgNo").onclick = closeDlg;
  }

  /* ================================================================ list */
  var thumbUrls = {};
  function thumbFor(pageId, node) {
    if (thumbUrls[pageId]) { node.style.backgroundImage = "url(" + thumbUrls[pageId] + ")"; return; }
    pgGet(pageId).then(function (r) {
      if (!r) return;
      var u = URL.createObjectURL(r.thumb || r.blob);
      thumbUrls[pageId] = u;
      node.style.backgroundImage = "url(" + u + ")";
    }).catch(function () {});
  }
  function renderList() {
    var ul = $("list"); ul.innerHTML = "";
    var list = data.pieces.slice().sort(function (a, b) { return (b.updated || 0) - (a.updated || 0); });
    $("empty").hidden = list.length > 0;
    list.forEach(function (p) {
      var li = el("li", "item");
      var open = el("button", "open");
      open.type = "button";
      var th = el("span", "thumb"); open.appendChild(th);
      var t = el("span", "t"); t.appendChild(el("span", "n", esc(p.title))); t.appendChild(el("span", "m", esc(summary(p))));
      open.appendChild(t);
      open.setAttribute("aria-label", "Open " + p.title);
      open.onclick = function () { location.hash = "#/p/" + p.id; };
      var dots = el("button", "dots", ICON.dots); dots.type = "button"; dots.setAttribute("aria-label", "More for " + p.title);
      dots.onclick = function () { cardMenu(p); };
      li.appendChild(open); li.appendChild(dots); ul.appendChild(li);
      if (p.pages && p.pages[0]) thumbFor(p.pages[0], th);
    });
  }
  function cardMenu(p) {
    var d = dialog('<div class="sh-h"><h2>' + esc(p.title) + '</h2></div><div class="menu"><button class="btn" id="mRen" type="button">Rename</button><button class="btn" id="mAgain" type="button">Transcribe again</button><button class="btn" id="mDel" type="button" style="color:var(--danger)">Delete</button></div>');
    d.querySelector("#mRen").onclick = function () { askText("Rename", p.title, function (v) { p.title = v; p.updated = Date.now(); saveData(); renderList(); }); };
    d.querySelector("#mAgain").onclick = function () { closeDlg(); openAdd(p); };
    d.querySelector("#mDel").onclick = function () {
      confirmBox("Delete “" + p.title + "”?", "Delete", function () { deletePiece(p); });
    };
  }
  function deletePiece(p) {
    data.pieces = data.pieces.filter(function (x) { return x !== p; });
    saveData();
    (p.pages || []).forEach(function (id) { pgDel(id).catch(function () {}); if (thumbUrls[id]) { URL.revokeObjectURL(thumbUrls[id]); delete thumbUrls[id]; } });
    renderList();
  }

  /* ================================================================ adding music */
  var A = null, fileIn = null, pdfjsP = null;
  function loadPdfjs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfjsP) return pdfjsP;
    pdfjsP = new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = "../school/vendor/pdfjs/pdf.min.js";
      s.onload = function () {
        var L = window.pdfjsLib;
        if (!L) return rej(new Error("The PDF reader didn't load."));
        L.GlobalWorkerOptions.workerSrc = "../school/vendor/pdfjs/pdf.worker.min.js";
        res(L);
      };
      s.onerror = function () { pdfjsP = null; rej(new Error("The PDF reader didn't load.")); };
      document.head.appendChild(s);
    });
    return pdfjsP;
  }
  function canvasBlob(c, q) {
    return new Promise(function (res, rej) { c.toBlob(function (b) { b ? res(b) : rej(new Error("Couldn't save that image.")); }, "image/jpeg", q || 0.85); });
  }
  function prepImage(file) {
    return decodeBlob(file).then(function (im) {
      var s = srcSize(im), c = drawRegion(im, 0, 0, s.w, s.h, 2400);
      if (im.close) try { im.close(); } catch (e) {}
      return canvasBlob(c, 0.85).then(function (b) { return { blob: b, w: c.width, h: c.height }; });
    });
  }
  function pdfPages(file, onPage) {
    return loadPdfjs().then(function (L) {
      return file.arrayBuffer().then(function (buf) { return L.getDocument({ data: new Uint8Array(buf) }).promise; }).then(function (pdf) {
        var out = [], chain = Promise.resolve();
        for (var p = 1; p <= pdf.numPages; p++) (function (p) {
          chain = chain.then(function () {
            return pdf.getPage(p).then(function (page) {
              var v1 = page.getViewport({ scale: 1 }), k = 2000 / Math.max(v1.width, v1.height), vp = page.getViewport({ scale: k });
              var c = document.createElement("canvas"); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
              var g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
              return page.render({ canvasContext: g, viewport: vp }).promise.then(function () {
                page.cleanup();
                return canvasBlob(c, 0.85);
              }).then(function (b) { var r = { blob: b, w: c.width, h: c.height }; out.push(r); if (onPage) onPage(r); });
            });
          });
        })(p);
        return chain.then(function () { try { pdf.destroy(); } catch (e) {} return out; });
      });
    });
  }
  function makeThumb(blob) {
    return decodeBlob(blob).then(function (im) {
      var s = srcSize(im), c = drawRegion(im, 0, 0, s.w, s.h, 200);
      if (im.close) try { im.close(); } catch (e) {}
      return canvasBlob(c, 0.7);
    });
  }
  var MAX_PAGES = 20;
  function addFiles(files) {
    if (!A) return;
    var list = Array.prototype.slice.call(files || []);
    if (!list.length) return;
    A.prep = true; A.err = ""; renderAdd();
    var chain = Promise.resolve();
    list.forEach(function (f) {
      chain = chain.then(function () {
        if (A.pages.length >= MAX_PAGES) { A.err = "That's enough pages for one piece (" + MAX_PAGES + ")."; return; }
        var isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name || "");
        var add = function (r) {
          if (A.pages.length >= MAX_PAGES) return;
          r.url = URL.createObjectURL(r.blob); A.pages.push(r); renderAdd();
        };
        return (isPdf ? pdfPages(f, add) : prepImage(f).then(add)).catch(function (e) { A.err = (e && e.message) || "Couldn't open that file."; });
      });
    });
    chain.then(function () { if (A) { A.prep = false; renderAdd(); } });
  }
  function openAdd(piece) {
    A = { pages: [], hint: "auto", busy: false, prep: false, err: "", status: "", piece: piece || null, ctl: null, removed: [], keyErr: "" };
    var d = $("addSheet");
    renderAdd();
    if (!d.open) d.showModal();
    if (piece) {
      A.hint = ["bass", "guitar", "piano", "other"].indexOf(piece.score.instrument) >= 0 ? piece.score.instrument : "auto";
      A.prep = true; renderAdd();
      var cur = A;
      Promise.all((piece.pages || []).map(function (id) { return pgGet(id).then(function (r) { return r && { id: id, blob: r.blob, w: r.w, h: r.h, thumb: r.thumb, url: URL.createObjectURL(r.thumb || r.blob), stored: true }; }); })).then(function (rs) {
        if (A !== cur) return;
        A.pages = rs.filter(Boolean); A.prep = false; renderAdd();
      });
    }
  }
  function closeAdd() {
    if (A && A.ctl) A.ctl.abort();
    if (A) A.pages.forEach(function (p) { try { URL.revokeObjectURL(p.url); } catch (e) {} });
    A = null;
    var d = $("addSheet"); if (d.open) d.close();
  }
  function renderAdd() {
    var d = $("addSheet");
    if (!A) return;
    if (!fileIn) {
      fileIn = el("input"); fileIn.type = "file"; fileIn.accept = "image/*,application/pdf"; fileIn.multiple = true; fileIn.hidden = true; fileIn.id = "fileIn";
      fileIn.onchange = function () { var f = fileIn.files; addFiles(f); setTimeout(function () { fileIn.value = ""; }, 0); };
    }
    var again = !!A.piece, busy = A.busy, needKey = !(window.MusicAI && MusicAI.has());
    var h = '<div class="sh-in">';
    h += '<div class="sh-h"><h2>' + (again ? "Transcribe again" : "Add music") + '</h2><button class="icon-btn" id="aClose" type="button" aria-label="Close"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg></button></div>';
    if (A.pages.length) {
      h += '<div class="thumbs">';
      A.pages.forEach(function (p, i) {
        h += '<div class="th" style="background-image:url(' + p.url + ')"><i>' + (i + 1) + "</i>" + (busy ? "" : '<button type="button" data-rm="' + i + '" aria-label="Remove page ' + (i + 1) + '">&times;</button>') + "</div>";
      });
      h += "</div>";
    }
    if (!busy) h += '<div class="pick"><button class="btn" id="aPick" type="button">' + ICON.image + (A.pages.length ? "Add page" : "Photo or PDF") + "</button></div>";
    if (!busy) {
      h += '<div class="chips" role="group" aria-label="Instrument">';
      [["auto", "Auto"], ["bass", "Bass"], ["guitar", "Guitar"], ["piano", "Piano"], ["other", "Other"]].forEach(function (c) {
        h += '<button class="chip" type="button" data-hint="' + c[0] + '" aria-pressed="' + (A.hint === c[0]) + '">' + c[1] + "</button>";
      });
      h += "</div>";
    }
    if (needKey && !busy) {
      h += '<div class="row"><p class="fine">' + esc(MusicAI.about) + '</p><input class="field" id="aKey" type="password" autocomplete="off" placeholder="sk-ant-…" aria-label="Anthropic API key"><button class="btn" id="aKeySave" type="button">Save key</button></div>';
      if (A.keyErr) h += '<p class="errbox">' + esc(A.keyErr) + "</p>";
    }
    if (A.err) h += '<p class="errbox" role="alert">' + esc(A.err) + "</p>";
    if (A.prep && !busy) h += '<div class="busy"><span class="spin"></span><span>Preparing…</span></div>';
    if (busy) {
      h += '<div class="busy"><span class="spin"></span><span id="aStatus">' + esc(A.status) + '</span></div><div class="btns"><button class="btn" id="aCancel" type="button">Cancel</button></div>';
    } else {
      h += '<div class="btns"><button class="btn pri" id="aGo" type="button"' + ((!A.pages.length || A.prep || needKey) ? " disabled" : "") + ">" + (A.err && A.pages.length ? "Try again" : "Transcribe") + "</button></div>";
    }
    h += "</div>";
    d.innerHTML = h;
    d.querySelector(".sh-in").appendChild(fileIn);
    var q = function (s) { return d.querySelector(s); };
    q("#aClose").onclick = closeAdd;
    if (q("#aPick")) q("#aPick").onclick = function () { fileIn.click(); };
    Array.prototype.forEach.call(d.querySelectorAll("[data-rm]"), function (b) {
      b.onclick = function () {
        var i = +b.getAttribute("data-rm"), p = A.pages.splice(i, 1)[0];
        if (p && p.stored) A.removed.push(p.id);
        if (p) try { URL.revokeObjectURL(p.url); } catch (e) {}
        renderAdd();
      };
    });
    Array.prototype.forEach.call(d.querySelectorAll("[data-hint]"), function (b) { b.onclick = function () { A.hint = b.getAttribute("data-hint"); renderAdd(); }; });
    if (q("#aKeySave")) q("#aKeySave").onclick = function () {
      var v = (q("#aKey").value || "").trim();
      if (!MusicAI.looksRight(v)) { A.keyErr = "That doesn't look like an Anthropic API key (they start with sk-ant-)."; renderAdd(); return; }
      if (!MusicAI.setKey(v)) { A.keyErr = "Couldn't save the key on this device."; renderAdd(); return; }
      A.keyErr = ""; renderAdd();
    };
    if (q("#aGo")) q("#aGo").onclick = runTranscribe;
    if (q("#aCancel")) q("#aCancel").onclick = function () { if (A && A.ctl) A.ctl.abort(); };
  }
  function runTranscribe() {
    var cur = A;
    if (!cur || cur.busy || !cur.pages.length) return;
    cur.busy = true; cur.err = ""; cur.status = "Reading page 1 of " + cur.pages.length + "…"; cur.ctl = new AbortController();
    renderAdd();
    transcribe(cur.pages.map(function (p) { return p.blob; }), {
      hint: cur.hint, signal: cur.ctl.signal,
      onProgress: function (s) { cur.status = s; var n = $("aStatus"); if (n && A === cur) n.textContent = s; }
    }).then(function (res) {
      return savePiece(cur, res).then(function (piece) {
        logCall("event", "playalong", "Added " + piece.title);
        var id = piece.id;
        closeAdd();
        location.hash = "#/p/" + id;
        if (S.route === "player" && S.piece && S.piece.id === id) openPiece(id);   // transcribed again while open
      });
    }).catch(function (e) {
      if (A !== cur) return;
      cur.busy = false; cur.ctl = null;
      if (e && e.name === "AbortError") cur.err = "";
      else cur.err = (e && e.message) || "Couldn't read that. Try again.";
      renderAdd();
    });
  }
  function savePiece(sess, res) {
    var score = res.score, now = Date.now();
    var piece = sess.piece, again = !!piece;
    var ids = [];
    return Promise.all(sess.pages.map(function (p) {
      if (p.stored) { ids.push(p.id); return Promise.resolve(); }
      return makeThumb(p.blob).then(function (th) {
        var id = uid(); ids.push(id);
        return pgPut({ id: id, blob: p.blob, w: p.w, h: p.h, thumb: th });
      });
    })).then(function () {
      if (again) {
        sess.removed.forEach(function (id) { pgDel(id).catch(function () {}); delete thumbUrls[id]; });
        piece.pages = ids; piece.score = score; piece.flags = res.flags; piece.updated = now;
        var keep = piece.prefs || {}, dp = defaultPrefs(score);
        piece.prefs = { bpm: dp.bpm, sound: keep.sound || dp.sound, view: dp.view, loop: null, click: keep.click !== false, countIn: keep.countIn !== false, speedUp: keep.speedUp || 0, instVol: keep.instVol == null ? dp.instVol : keep.instVol, clickVol: keep.clickVol == null ? dp.clickVol : keep.clickVol };
      } else {
        piece = { id: uid(), title: (score.title || "").trim() || "Untitled", created: now, updated: now, pages: ids, score: score, flags: res.flags, prefs: defaultPrefs(score) };
        data.pieces.push(piece);
      }
      saveData();
      return piece;
    });
  }

  /* ================================================================ player */
  var TV = null, NV = null;          // tab view and notes view state
  var scrollHold = 0, touching = false;
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showScreen(name) {
    S.route = name;
    var pl = name === "player";
    $("vList").hidden = pl; $("vPlayer").hidden = !pl; $("sub").hidden = !pl;
    $("dockList").hidden = pl; $("dockPlay").hidden = !pl;
    document.body.classList.toggle("player", pl);
    if (!pl) { $("more").hidden = true; $("bMore").setAttribute("aria-expanded", "false"); }
  }
  function leavePlayer() {
    if (S.playing) pausePlay(true);
    cancelAnimationFrame(S.raf);
    S.piece = null; S.score = null; S.tl = null; TV = null; NV = null;
    S.pageUrls.forEach(function (u) { URL.revokeObjectURL(u); }); S.pageUrls = [];
    $("vTab").innerHTML = ""; $("vNotes").innerHTML = ""; $("vPage").innerHTML = "";
    $("badge").hidden = true;
  }
  function openPiece(id) {
    var p = pieceById(id);
    if (!p || !p.score || !p.score.measures || !p.score.measures.length) { location.hash = ""; return; }
    if (S.playing) pausePlay(true);
    S.piece = p; S.score = p.score;
    S.tl = buildTimeline(S.score);
    S.written = S.score.tempo || 100;
    var dp = defaultPrefs(S.score), pr = p.prefs || {};
    S.prefs = {};
    for (var k in dp) S.prefs[k] = pr[k] !== undefined && pr[k] !== null ? pr[k] : dp[k];
    if (["bass", "guitar", "piano", "off"].indexOf(S.prefs.sound) < 0) S.prefs.sound = dp.sound;
    S.prefs.bpm = clamp(Math.round(S.prefs.bpm) || dp.bpm, 30, 300);
    if (S.prefs.loop && (S.prefs.loop.a >= S.score.measures.length || S.prefs.loop.b >= S.score.measures.length)) S.prefs.loop = null;
    p.prefs = S.prefs;
    S.view = S.prefs.view;
    if (S.view === "tab" && !S.score.strings) S.view = "notes";
    S.startPos = 0; S.loopSel = 0; S.loopPick = null; S.curRow = -1; S.loc = null;
    var L = loopRange(); if (L) S.startPos = L.start;
    showScreen("player");
    $("ptitle").textContent = p.title;
    $("views").querySelector('[data-v="tab"]').hidden = !S.score.strings;
    buildMore(); updateTransport();
    setView(S.view, true);
    window.scrollTo(0, 0);
  }
  function setView(v, init) {
    if (v === "tab" && !S.score.strings) v = "notes";
    S.view = v; S.prefs.view = v; if (!init) savePrefs();
    Array.prototype.forEach.call($("views").querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-v") === v)); });
    $("vTab").hidden = v !== "tab"; $("vNotes").hidden = v !== "notes"; $("vPage").hidden = v !== "page";
    S.curRow = -1;
    if (v === "tab") renderTab(); else if (v === "notes") renderNotes(); else renderPages();
  }
  function curPos() { return S.playing ? S.lastPos : S.startPos; }

  /* ---------------- transport ---------------- */
  function updateTransport() {
    $("bPlay").innerHTML = S.playing ? ICON.pause : ICON.play;
    $("bPlay").setAttribute("aria-label", S.playing ? "Pause" : "Play");
    $("bLoop").innerHTML = ICON.loop; $("bStart").innerHTML = ICON.start; $("bMore").innerHTML = ICON.more;
    var has = !!S.prefs.loop;
    $("bLoop").setAttribute("aria-pressed", String(has));
    $("bLoop").classList.toggle("sel", !has && S.loopSel > 0);
    var n = $("bpmN"); if (n) n.textContent = String(S.prefs.bpm);
    var inp = $("bBpm").querySelector("input"); if (inp) inp.value = S.prefs.bpm;
    syncMore();
    showHint();
  }
  function showHint(text) {
    var b = $("badge");
    var t = text || (S.loopSel === 1 ? "Tap the first bar" : S.loopSel === 2 ? "Tap the last bar" : "");
    b.textContent = t; b.hidden = !t;
  }
  function playLogText() { return S.piece.title + " · " + S.prefs.bpm + " bpm"; }
  function startPlay() {
    if (S.playing || E.starting || !S.tl) return;
    S.loopSel = 0; S.loopPick = null;
    $("more").hidden = true; $("bMore").setAttribute("aria-expanded", "false");
    E.startBpm = S.prefs.bpm;
    engineStart().then(function () {
      S.playing = true; S.curRow = -1; S.lastSeg = null;
      logCall("playing", "playalong", true, { text: playLogText() });
      updateTransport(); frame();
    }).catch(function (e) { showErr((e && e.message) || "Couldn't start the sound."); });
  }
  function pausePlay(quiet) {
    if (!S.playing) return;
    var ep = enginePos();
    engineStop();
    S.playing = false;
    cancelAnimationFrame(S.raf);
    if (ep && !ep.counting && !E.finished) {
      var loc = locate(S.tl, clamp(ep.pos, 0, S.tl.total - 1e-6));
      if (loc) S.startPos = S.tl.passes[loc.pass].start + S.tl.offs[loc.bar][loc.ev];
    }
    if (S.prefs.speedUp > 0 && E.startBpm && S.prefs.bpm !== E.startBpm) S.prefs.bpm = E.startBpm;
    logCall("playing", "playalong", false);
    if (!quiet) { updateTransport(); updateCursor(S.startPos, true); showHint(); }
  }
  function naturalEnd() {
    engineStop(true);
    S.playing = false; cancelAnimationFrame(S.raf);
    if (S.prefs.speedUp > 0 && E.startBpm) S.prefs.bpm = E.startBpm;
    logCall("playing", "playalong", false);
    updateTransport(); updateCursor(S.startPos, true); showHint();
  }
  function frame() {
    if (!S.playing) return;
    var ep = enginePos();
    if (ep) {
      var pos;
      if (ep.counting) {
        pos = S.startPos;
        var k = Math.floor((ep.pos - E.ciStart) / S.tl.unit + 1e-6) + 1;
        showHint(String(clamp(k, 1, 16)));
      } else { pos = clamp(ep.pos, 0, S.tl.total - 1e-6); showHint(); }
      S.lastPos = pos;
      if (ep.seg !== S.lastSeg) {          // a loop wrap that sped the tempo up
        S.lastSeg = ep.seg;
        if (ep.seg.auto && ep.bpm !== S.prefs.bpm) {
          S.prefs.bpm = ep.bpm; updateTransport(); savePrefs();
          logCall("playing", "playalong", true, { text: playLogText() });
        }
      }
      updateCursor(pos);
    }
    S.raf = requestAnimationFrame(frame);
  }
  function seekTo(pos) {
    pos = clamp(pos, 0, Math.max(0, S.tl.total - 1e-6));
    S.startPos = pos; S.lastPos = pos;
    if (S.playing) engineSeek(pos);
    S.curRow = -1;
    updateCursor(pos, true);
  }
  function changeBpm(v) {
    v = clamp(Math.round(v), 30, 300);
    if (v === S.prefs.bpm) return;
    S.prefs.bpm = v; engineBpm(v); savePrefs(); updateTransport();
    if (S.playing) logCall("playing", "playalong", true, { text: playLogText() });
  }
  function toggleLoop() {
    if (S.prefs.loop || S.loopSel) { S.prefs.loop = null; S.loopSel = 0; S.loopPick = null; }
    else { S.loopSel = 1; S.loopPick = null; }
    savePrefs(); paintLoop(); updateTransport();
  }
  function onBarTap(bi) {
    scrollHold = 0;
    if (S.loopSel === 1) { S.loopPick = bi; S.loopSel = 2; paintLoop(); updateTransport(); return; }
    if (S.loopSel === 2) {
      var a = Math.min(S.loopPick, bi), b = Math.max(S.loopPick, bi);
      S.prefs.loop = { a: a, b: b }; S.loopSel = 0; S.loopPick = null; savePrefs();
      paintLoop(); updateTransport();
      var L = loopRange();
      if (L && !S.playing) seekTo(L.start);
      return;
    }
    var pi = firstPassOf(S.tl, bi);
    if (pi >= 0) seekTo(S.tl.passes[pi].start);
  }
  function onEventTap(bi, j) {
    if (S.loopSel) return onBarTap(bi);
    var pi = firstPassOf(S.tl, bi);
    if (pi >= 0) seekTo(S.tl.passes[pi].start + S.tl.offs[bi][j]);
  }
  function paintLoop() {
    var L = S.prefs.loop;
    if (TV) TV.bgs.forEach(function (r, bi) {
      var on = (L && bi >= L.a && bi <= L.b) || (S.loopSel === 2 && S.loopPick === bi);
      r.classList.toggle("loop", !!on); r.parentNode.classList.toggle("loop", !!on);
    });
    if (NV && NV.loopEls) paintNotesLoop();
  }

  /* ---------------- hold-to-repeat tempo buttons ---------------- */
  function holdButton(btn, fn) {
    var t = 0, iv = 0, fired = false;
    function stop() { clearTimeout(t); clearInterval(iv); t = iv = 0; }
    btn.addEventListener("pointerdown", function (e) {
      e.preventDefault(); fired = true; fn();
      t = setTimeout(function () { iv = setInterval(fn, 90); }, 450);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (n) { btn.addEventListener(n, stop); });
    btn.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
    btn.addEventListener("click", function (e) { if (e.detail === 0) fn(); });   // keyboard / assistive tech only
  }
  function typeTempo() {
    var b = $("bBpm");
    if (b.querySelector("input")) return;
    var old = b.innerHTML, inp = el("input"); inp.type = "number"; inp.inputMode = "numeric"; inp.min = 30; inp.max = 300; inp.value = S.prefs.bpm; inp.setAttribute("aria-label", "Tempo in bpm");
    b.innerHTML = ""; b.appendChild(inp); inp.focus(); inp.select();
    var done = false;
    function end(ok) {
      if (done) return; done = true;
      var v = parseFloat(inp.value);
      b.innerHTML = '<b id="bpmN">' + S.prefs.bpm + "</b><small>bpm</small>";
      if (ok && isFinite(v)) changeBpm(v);
    }
    inp.onkeydown = function (e) { if (e.key === "Enter") end(true); else if (e.key === "Escape") end(false); };
    inp.onblur = function () { end(true); };
    inp.onclick = function (e) { e.stopPropagation(); };
  }

  /* ---------------- more panel ---------------- */
  var NAMES_SOUND = [["bass", "Bass"], ["guitar", "Guitar"], ["piano", "Piano"], ["off", "Off"]];
  function buildMore() {
    var m = $("more"), P = S.prefs, f = S.piece.flags || {};
    var h = "";
    h += '<div class="row"><label for="rSpeed">Speed <b id="rSpeedV"></b></label><input id="rSpeed" type="range" min="40" max="160" step="1"></div>';
    h += '<div class="row"><span class="lb">Click</span><div class="chips"><button class="chip" id="cClick" type="button" aria-pressed="false">Click</button><button class="chip" id="cCount" type="button" aria-pressed="false">Count-in</button></div></div>';
    h += '<div class="row"><span class="lb">Sound</span><div class="chips grow" id="cSound">' + NAMES_SOUND.map(function (s) { return '<button class="chip" type="button" data-s="' + s[0] + '" aria-pressed="false">' + s[1] + "</button>"; }).join("") + "</div></div>";
    h += '<div class="row two"><div class="row"><label for="rInst">Sound level</label><input id="rInst" type="range" min="0" max="100"></div><div class="row"><label for="rClick">Click level</label><input id="rClick" type="range" min="0" max="100"></div></div>';
    h += '<div class="row"><span class="lb">Speed up each loop</span><div class="chips grow" id="cUp">' + [[0, "Off"], [2, "+2"], [5, "+5"]].map(function (s) { return '<button class="chip" type="button" data-u="' + s[0] + '" aria-pressed="false">' + s[1] + "</button>"; }).join("") + "</div></div>";
    var notes = [];
    if (S.score.uncertain) notes.push(S.score.uncertain);
    if (f.off && f.off.length) notes.push("Bars that may be off: " + f.off.join(", ") + ".");
    if (f.tabFixed) notes.push("Tab numbers changed to match the staff: " + f.tabFixed + ".");
    if (f.tabGuessed) notes.push("Tab positions chosen by the app: " + f.tabGuessed + ".");
    if (f.junk) notes.push("Unreadable items skipped: " + f.junk + ".");
    if (notes.length) h += '<details><summary>Notes from the transcription</summary><p>' + esc(notes.join("\n")) + "</p></details>";
    m.innerHTML = h;
    var q = function (s) { return m.querySelector(s); };
    q("#rSpeed").oninput = function () { changeBpm(S.written * (+this.value) / 100); };
    q("#cClick").onclick = function () { P.click = !P.click; savePrefs(); syncMore(); };
    q("#cCount").onclick = function () { P.countIn = !P.countIn; savePrefs(); syncMore(); };
    Array.prototype.forEach.call(m.querySelectorAll("[data-s]"), function (b) { b.onclick = function () { P.sound = b.getAttribute("data-s"); savePrefs(); syncMore(); }; });
    Array.prototype.forEach.call(m.querySelectorAll("[data-u]"), function (b) { b.onclick = function () { P.speedUp = +b.getAttribute("data-u"); savePrefs(); syncMore(); }; });
    q("#rInst").oninput = function () { P.instVol = (+this.value) / 100; applyVolumes(); savePrefs(); };
    q("#rClick").oninput = function () { P.clickVol = (+this.value) / 100; applyVolumes(); savePrefs(); };
  }
  function syncMore() {
    var m = $("more"), P = S.prefs;
    if (!P || !m.firstChild) return;
    var sp = m.querySelector("#rSpeed"), pct = Math.round(P.bpm / S.written * 100);
    if (sp && document.activeElement !== sp) sp.value = clamp(pct, 40, 160);
    var sv2 = m.querySelector("#rSpeedV"); if (sv2) sv2.textContent = P.bpm + " bpm · " + pct + "%";
    m.querySelector("#cClick").setAttribute("aria-pressed", String(!!P.click));
    m.querySelector("#cCount").setAttribute("aria-pressed", String(!!P.countIn));
    Array.prototype.forEach.call(m.querySelectorAll("[data-s]"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-s") === P.sound)); });
    Array.prototype.forEach.call(m.querySelectorAll("[data-u]"), function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-u") === (P.speedUp || 0))); });
    var iv = m.querySelector("#rInst"), cv = m.querySelector("#rClick");
    if (iv && document.activeElement !== iv) iv.value = Math.round((P.instVol == null ? 0.8 : P.instVol) * 100);
    if (cv && document.activeElement !== cv) cv.value = Math.round((P.clickVol == null ? 0.7 : P.clickVol) * 100);
  }

  /* ================================================================ cursor */
  function updateCursor(pos, jump) {
    if (!S.tl) return;
    var loc = locate(S.tl, pos);
    if (!loc) return;
    S.loc = loc;
    if (S.view === "tab") tabCursor(loc, jump); else if (S.view === "notes") notesCursor(loc, jump);
  }
  function scrollRowIntoPlace(absTop, force) {
    if (!force && (touching || Date.now() < scrollHold)) return;
    var y = Math.max(0, absTop - window.innerHeight * 0.33);
    try { window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" }); } catch (e) { window.scrollTo(0, y); }
  }
  ["touchstart", "wheel", "keydown"].forEach(function (n) {
    window.addEventListener(n, function (e) {
      if (n === "touchstart") { if ($("view").contains(e.target)) touching = true; return; }
      if (n === "keydown" && !/^(Arrow|Page|Home|End| )/.test(e.key)) return;
      scrollHold = Date.now() + 2000;
    }, { passive: true });
  });
  ["touchend", "touchcancel"].forEach(function (n) { window.addEventListener(n, function () { if (touching) { touching = false; scrollHold = Date.now() + 2000; } }, { passive: true }); });

  /* ================================================================ tab view */
  var SP = 13;               // gap between strings
  function slotW(d) { return 8 + 20 * Math.pow(d, 0.7); }
  function nominal(d) {
    function pw(v) { var l = Math.log2(v); return Math.abs(l - Math.round(l)) < 1e-3; }
    if (pw(d)) return { base: d, dot: false, trip: false };
    if (pw(d * 2 / 3)) return { base: d * 2 / 3, dot: true, trip: false };
    if (pw(d * 3 / 2)) return { base: d * 3 / 2, dot: false, trip: true };
    return { base: d, dot: false, trip: false };
  }
  function prettyChord(n) {
    return String(n).replace(/#/g, "♯").replace(/^([A-G])b/, "$1♭").replace(/\/([A-G])b/, "/$1♭").replace(/([0-9a-zA-Z])b(?=\d)/g, "$1♭");
  }
  function renderTab() {
    var host = $("vTab"), score = S.score, tl = S.tl;
    host.innerHTML = "";
    var W = Math.floor(host.clientWidth);
    if (!W) { W = Math.min(window.innerWidth, 1088) - 32; }
    var N = score.strings || 4, bars = score.measures;
    var hasChords = bars.some(function (b) { return b.chords.length; }), hasEnd = bars.some(function (b) { return b.ending; });
    var staffTop = hasChords ? 42 : (hasEnd ? 26 : 22), staffBot = staffTop + (N - 1) * SP, yR = staffBot + 10, stemLen = 17, yEnd = yR + stemLen, rowH = yEnd + 22;
    var beatLen = tl.unit === 1.5 ? 1.5 : 1;
    var maxPer = W < 600 ? 2 : W < 1000 ? 3 : 4;
    var nat = bars.map(function (b) {
      var ws = b.events.map(function (e) { return slotW(e.d); }), sum = ws.reduce(function (a, c) { return a + c; }, 0);
      return { ws: ws, sum: sum, padL: 10 + (b.repeatStart ? 12 : 0), padR: 8 + (b.repeatEnd ? 12 : 0) };
    });
    // rows
    var rows = [], cur = [], curW = 0;
    bars.forEach(function (b, i) {
      var w = nat[i].padL + nat[i].padR + nat[i].sum;
      if (cur.length && (cur.length >= maxPer || curW + w > W)) { rows.push(cur); cur = []; curW = 0; }
      cur.push(i); curW += w;
    });
    if (cur.length) rows.push(cur);
    TV = { host: host, rows: [], geom: [], bgs: [], ev: [], cur: null, curEls: [], rowH: rowH, staffTop: staffTop, yEnd: yEnd, W: W };
    var wrap = el("div", "tabhost"); host.appendChild(wrap);
    var cursor = el("div", "tabcur"); cursor.style.height = (yEnd - staffTop + 16) + "px";
    wrap.appendChild(cursor); TV.cursor = cursor; TV.wrap = wrap;
    rows.forEach(function (rb, ri) {
      var fixed = 0, sum = 0;
      rb.forEach(function (i) { fixed += nat[i].padL + nat[i].padR; sum += nat[i].sum; });
      var k = (W - fixed) / sum;
      if (ri === rows.length - 1 && rb.length < maxPer) k = Math.min(k, 1.45);
      k = Math.max(k, 0.5);
      var div = el("div", "tabrow"), svg = sv("svg", { width: W, height: rowH, viewBox: "0 0 " + W + " " + rowH, role: "img", "aria-label": "Tab, row " + (ri + 1) }, div);
      var rowInfo = { div: div, bars: rb };
      TV.rows.push(rowInfo);
      var x = 0;
      rb.forEach(function (bi) {
        var b = bars[bi], n = nat[bi], w = n.padL + n.padR + k * n.sum, x0 = x, x1 = x + w;
        x = x1;
        var g = sv("g", { "data-bar": bi, "class": "bar-g" }, svg);
        TV.bgs[bi] = sv("rect", { x: x0, y: 0, width: w, height: rowH, "class": "t-bg" }, g);
        for (var s = 0; s < N; s++) sv("line", { x1: x0, x2: x1, y1: staffTop + s * SP, y2: staffTop + s * SP, "class": "t-line" }, g);
        // bar lines and repeat signs
        sv("line", { x1: x0 + 0.5, x2: x0 + 0.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
        sv("line", { x1: x1 - 0.5, x2: x1 - 0.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
        var mid = staffTop + (N - 1) * SP / 2;
        if (b.repeatStart) {
          sv("line", { x1: x0 + 2, x2: x0 + 2, y1: staffTop, y2: staffBot, "class": "t-bar thick" }, g);
          sv("line", { x1: x0 + 6.5, x2: x0 + 6.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
          sv("circle", { cx: x0 + 11, cy: mid - SP / 2, r: 1.8, "class": "t-dot" }, g); sv("circle", { cx: x0 + 11, cy: mid + SP / 2, r: 1.8, "class": "t-dot" }, g);
        }
        if (b.repeatEnd) {
          sv("line", { x1: x1 - 2, x2: x1 - 2, y1: staffTop, y2: staffBot, "class": "t-bar thick" }, g);
          sv("line", { x1: x1 - 6.5, x2: x1 - 6.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
          sv("circle", { cx: x1 - 11, cy: mid - SP / 2, r: 1.8, "class": "t-dot" }, g); sv("circle", { cx: x1 - 11, cy: mid + SP / 2, r: 1.8, "class": "t-dot" }, g);
          if (b.repeatEnd > 2) sv("text", { x: x1 - 4, y: 10, "class": "t-bn", "text-anchor": "end" }, g, "×" + b.repeatEnd);
        }
        sv("text", { x: x0 + (b.repeatStart ? 14 : 4), y: 10, "class": "t-bn" }, g, String(b.n));
        // event positions
        var offs = tl.offs[bi], ex = [], cum = 0;
        b.events.forEach(function (e, j) { ex.push(x0 + n.padL + k * cum + 7); cum += n.ws[j]; });
        var endX = x0 + n.padL + k * n.sum + 7;
        ex.push(endX);
        TV.geom[bi] = { row: ri, x0: x0, x1: x1, ex: ex, offs: offs };
        function xAt(beat) {
          var j = 0; for (var q = 0; q < b.events.length; q++) if (offs[q] <= beat + 1e-6) j = q;
          var d = b.events[j].d;
          return ex[j] + clamp((beat - offs[j]) / d, 0, 1) * (ex[j + 1] - ex[j]);
        }
        b.chords.forEach(function (c) { sv("text", { x: xAt(c.at) - 3, y: staffTop - 12, "class": "t-chord" }, g, prettyChord(c.name)); });
        if (b.bad) {
          var fl = sv("circle", { cx: x1 - 8, cy: 6, r: 3.5, "class": "t-flag" }, g);
          sv("title", null, fl, "This bar may not be read right");
        }
        // fret numbers
        TV.ev[bi] = [];
        b.events.forEach(function (e, j) {
          var els = [];
          e.notes.forEach(function (nt) {
            if (nt.s == null || nt.f == null) return;
            var y = staffTop + (nt.s - 1) * SP, txt = nt.cont ? "(" + nt.f + ")" : String(nt.f), wd = txt.length * 7.6 + 3;
            sv("rect", { x: ex[j] - wd / 2, y: y - 6.5, width: wd, height: 13, rx: 2, "class": "t-ko" }, g);
            els.push(sv("text", { x: ex[j], y: y + 0.5, "class": "t-fret" + (nt.cont ? " tie" : "") }, g, txt));
          });
          TV.ev[bi][j] = els;
        });
        drawRhythm(g, b, ex, offs, yR, yEnd, beatLen, TV.ev[bi]);
      });
      // ending brackets
      var gi = 0;
      while (gi < rb.length) {
        var en = bars[rb[gi]].ending;
        if (!en) { gi++; continue; }
        var gj = gi; while (gj + 1 < rb.length && bars[rb[gj + 1]].ending === en) gj++;
        var bx0 = TV.geom[rb[gi]].x0 + 2, bx1 = TV.geom[rb[gj]].x1 - 2, startsHere = !(gi === 0 && ri > 0 && bars[rb[0] - 1] && bars[rb[0] - 1].ending === en);
        sv("path", { d: "M" + bx0 + " 14V3H" + bx1, "class": "t-end" }, svg);
        sv("text", { x: bx0 + 17, y: 12, "class": "t-endl" }, svg, en + ".");
        gi = gj + 1;
      }
      wrap.appendChild(div);
      svg.addEventListener("click", function (e) {
        var gEl = e.target.closest ? e.target.closest("[data-bar]") : null;
        if (gEl) onBarTap(+gEl.getAttribute("data-bar"));
      });
    });
    for (var r = 0; r < TV.rows.length; r++) TV.rows[r].top = TV.rows[r].div.offsetTop;
    paintLoop();
    updateCursor(curPos(), true);
  }
  function drawRhythm(g, b, ex, offs, yR, yEnd, beatLen, elsList) {
    var evs = b.events, info = evs.map(function (e) {
      var nom = nominal(e.d), rest = !e.notes.length;
      return { nom: nom, rest: rest, beams: rest || nom.base >= 1 ? 0 : nom.base >= 0.5 - 1e-6 ? 1 : nom.base >= 0.25 - 1e-6 ? 2 : 3, stem: !rest && nom.base < 4 - 1e-6 };
    });
    evs.forEach(function (e, j) {
      var x = ex[j], inf = info[j];
      if (inf.rest) {
        if (inf.nom.base >= 2 - 1e-6) sv("rect", { x: x - 4, y: yR + (inf.nom.base >= 4 - 1e-6 ? 3 : 7), width: 8, height: 3, rx: 0.5, "class": "t-restf" }, g);
        else sv("path", { d: "M" + (x - 2) + " " + (yR + 1) + "l4 4l-4 4l4 4", "class": "t-rest" }, g);
        if (inf.nom.dot) sv("circle", { cx: x + 6, cy: yR + 8, r: 1.4, "class": "t-dot" }, g);
        return;
      }
      if (inf.stem) { var st = sv("line", { x1: x, x2: x, y1: yR, y2: yEnd, "class": "t-stem" }, g); elsList[j].push(st); }
      if (inf.nom.dot) sv("circle", { cx: x + 4.5, cy: yEnd - 2.5, r: 1.5, "class": "t-dot" }, g);
    });
    // beams: runs of beamable events inside one beat
    var j = 0;
    while (j < evs.length) {
      if (!info[j].beams) { j++; continue; }
      var bi0 = Math.floor((offs[j] + 1e-6) / beatLen), k = j;
      while (k + 1 < evs.length && info[k + 1].beams && Math.floor((offs[k + 1] + 1e-6) / beatLen) === bi0) k++;
      for (var L = 1; L <= 3; L++) {
        var y = yEnd - (L - 1) * 4, q = j;
        while (q <= k) {
          if (info[q].beams < L) { q++; continue; }
          var r = q; while (r + 1 <= k && info[r + 1].beams >= L) r++;
          var xa = ex[q], xb = ex[r];
          if (r === q) {
            // a lone short note: a stub toward its neighbour, or to the right
            if (k > j && q === k) { xa = ex[q] - 6; xb = ex[q]; } else { xa = ex[q]; xb = ex[q] + 6; }
          }
          elsList[q].push(sv("line", { x1: xa, x2: xb, y1: y, y2: y, "class": "t-beam" }, g));
          q = r + 1;
        }
      }
      j = k + 1;
    }
    // triplets: a "3" under each closed group
    for (j = 0; j < evs.length; j++) {
      if (!isTrip(evs[j].d) || !evs[j].notes.length && false) continue;
      var sum = 0, kk = j;
      while (kk < evs.length && isTrip(evs[kk].d)) { sum += evs[kk].d; kk++; if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) break; }
      if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) {
        sv("text", { x: (ex[j] + ex[kk - 1]) / 2, y: yEnd + 14, "class": "t-trip" }, g, "3");
        j = kk - 1;
      } else j = kk - 1;
    }
  }
  function tabCursor(loc, jump) {
    if (!TV || !TV.geom[loc.bar]) return;
    var g = TV.geom[loc.bar], row = TV.rows[g.row], b = S.score.measures[loc.bar], d = b.events[loc.ev].d;
    var x = g.ex[loc.ev] + clamp((loc.off - g.offs[loc.ev]) / d, 0, 1) * (g.ex[loc.ev + 1] - g.ex[loc.ev]);
    TV.cursor.style.transform = "translate(" + (x - 8).toFixed(1) + "px," + (row.top + TV.staffTop - 8).toFixed(1) + "px)";
    // current notes
    var key = loc.bar + ":" + loc.ev;
    if (TV.curKey !== key) {
      TV.curEls.forEach(function (n) { n.classList.remove("cur"); });
      TV.curEls = (TV.ev[loc.bar] && TV.ev[loc.bar][loc.ev]) || [];
      TV.curEls.forEach(function (n) { n.classList.add("cur"); });
      TV.curKey = key;
    }
    if (S.curRow !== g.row) {
      S.curRow = g.row;
      var vTop = TV.wrap.getBoundingClientRect().top + row.top;
      if (S.playing || vTop < 110 || vTop + TV.rowH > window.innerHeight - 150) scrollRowIntoPlace(vTop + window.scrollY, false);
    }
  }

  /* ================================================================ notes view */
  var abcjsP = null;
  function loadAbcjs() {
    if (window.ABCJS) return Promise.resolve(window.ABCJS);
    if (abcjsP) return abcjsP;
    abcjsP = new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = "../barline/vendor/abcjs-basic-min.js";
      s.onload = function () { window.ABCJS ? res(window.ABCJS) : rej(new Error("no ABCJS")); };
      s.onerror = function () { abcjsP = null; rej(new Error("load failed")); };
      document.head.appendChild(s);
    });
    return abcjsP;
  }
  function renderNotes() {
    var host = $("vNotes"), score = S.score;
    host.innerHTML = "";
    NV = { els: [], loopEls: null, curKey: null, curEls: [], host: null };
    var out = el("div", "notehost"); host.appendChild(out); NV.host = out;
    var W = Math.floor(out.clientWidth) - 16 || 340;
    var per = W < 560 ? 2 : W < 1000 ? 3 : 4;
    var grandStaff = score.clef === "grand";
    var built = toAbc(score, S.written, grandStaff ? 0 : per);
    if (!built) { out.remove(); host.appendChild(el("p", "msg", "Notation isn't available for this one")); return; }
    var mine = NV;
    loadAbcjs().then(function (A) {
      if (NV !== mine || S.view !== "notes") return;
      var vis;
      try {
        vis = A.renderAbc(out, built.abc, {
          add_classes: true, responsive: "resize", staffwidth: Math.max(240, W - 16), scale: 1, paddingleft: 0, paddingright: 0, paddingtop: 6, paddingbottom: 6,
          foregroundColor: "currentColor", selectionColor: "currentColor",
          wrap: built.grand ? { minSpacing: 1.6, maxSpacing: 2.7, preferredMeasuresPerLine: per } : undefined,
          clickListener: function (abcelem, tuneNumber, classes) {
            var m = /abcjs-mm(\d+)/.exec(classes || ""), v = /abcjs-v(\d+)/.exec(classes || ""), nn = /abcjs-n(\d+)/.exec(classes || "");
            if (!m || !nn || !NV.byKey) return;
            var hit = NV.byKey[(v ? v[1] : "0") + ":" + m[1] + ":" + nn[1]];
            if (hit) onEventTap(hit[0], hit[1]);
          }
        });
      } catch (e) { out.innerHTML = ""; out.appendChild(el("p", "msg", "Notation isn't available for this one")); return; }
      mapNotes(out, built, mine);
      mine.rendered = true;
      updateCursor(curPos(), true);
    }).catch(function () {
      if (NV === mine) { out.innerHTML = ""; out.appendChild(el("p", "msg", "Notation needs to load once while online")); }
    });
  }
  /* Matches the shapes abcjs drew to the events they came from. Notes and rests come out in the order they were written,
     one shape per event (per voice), so the nth shape is the nth event. */
  function mapNotes(out, built, nv) {
    var num = function (re, c) { var m = re.exec(c); return m ? +m[1] : -1; };
    var all = Array.prototype.slice.call(out.querySelectorAll(".abcjs-note, .abcjs-rest")).map(function (e) {
      var c = e.getAttribute("class") || "";
      return { e: e, v: num(/abcjs-v(\d+)/, c), m: num(/abcjs-mm(\d+)/, c), n: num(/abcjs-n(\d+)/, c) };
    });
    var voices = built.grand ? 2 : 1;
    nv.byKey = {}; nv.els = [];
    for (var v = 0; v < voices; v++) {
      var list = all.filter(function (x) { return x.v === v; }).sort(function (a, b) { return a.m - b.m || a.n - b.n; });
      if (list.length !== built.seq.length) { nv.mismatch = true; if (window.console) console.warn("Play Along: notation has " + list.length + " shapes for " + built.seq.length + " events"); }
      for (var i = 0; i < list.length && i < built.seq.length; i++) {
        var bi = built.seq[i][0], j = built.seq[i][1];
        (nv.els[bi] = nv.els[bi] || [])[j] = (nv.els[bi][j] || []).concat([list[i].e]);
        nv.byKey[v + ":" + list[i].m + ":" + list[i].n] = [bi, j];
        list[i].e.classList.add("pa-ev");
      }
    }
    // a small amber dot at the first note of any bar that may be wrong
    S.score.measures.forEach(function (b, bi) {
      if (!b.bad || !nv.els[bi] || !nv.els[bi][0]) return;
      try {
        var e0 = nv.els[bi][0][0], bb = e0.getBBox(), svg = e0.ownerSVGElement;
        var dot = sv("circle", { cx: bb.x + bb.width / 2, cy: bb.y - 14, r: 3.5, "class": "t-flag" }, svg);
        sv("title", null, dot, "This bar may not be read right");
        (nv.flags = nv.flags || []).push(dot);
      } catch (e) {}
    });
    // loop tint: a rectangle behind each bar's notes, found from their boxes
    nv.loopEls = [];
  }
  function paintNotesLoop() {
    if (!NV || !NV.els || !NV.host) return;
    (NV.loopEls || []).forEach(function (r) { if (r.parentNode) r.parentNode.removeChild(r); });
    NV.loopEls = [];
    var L = S.prefs.loop, picks = S.loopSel === 2 ? [S.loopPick, S.loopPick] : null;
    var lo = L ? L.a : picks ? picks[0] : -1, hi = L ? L.b : picks ? picks[1] : -2;
    for (var bi = lo; bi <= hi; bi++) {
      var els = NV.els[bi]; if (!els) continue;
      var svg = null, x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      els.forEach(function (list) { list.forEach(function (e) {
        try { var bb = e.getBBox(); svg = e.ownerSVGElement; x0 = Math.min(x0, bb.x); x1 = Math.max(x1, bb.x + bb.width); y0 = Math.min(y0, bb.y); y1 = Math.max(y1, bb.y + bb.height); } catch (er) {}
      }); });
      if (!svg || x0 === Infinity) continue;
      var r = sv("rect", { x: x0 - 6, y: y0 - 8, width: x1 - x0 + 12, height: y1 - y0 + 16, rx: 4, fill: css("--acc"), opacity: ".16", "pointer-events": "none" });
      svg.insertBefore(r, svg.firstChild); NV.loopEls.push(r);
    }
  }
  function notesCursor(loc, jump) {
    if (!NV || !NV.rendered || !NV.els) return;
    var key = loc.bar + ":" + loc.ev;
    if (NV.curKey !== key) {
      NV.curEls.forEach(function (n) { n.classList.remove("pa-cur"); });
      var list = (NV.els[loc.bar] && NV.els[loc.bar][loc.ev]) || [];
      NV.curEls = list; list.forEach(function (n) { n.classList.add("pa-cur"); });
      NV.curKey = key;
      if (list[0]) {
        var r = list[0].getBoundingClientRect(), top = 130, bottom = window.innerHeight - 150;
        if (r.top < top || r.bottom > bottom || (S.playing && NV.curRowTop !== Math.round(r.top / 40) && r.top > window.innerHeight * 0.5)) {
          // keep the line being played about a third of the way down
          scrollRowIntoPlace(r.top + window.scrollY, false);
        }
      }
    }
  }

  /* ================================================================ page view */
  function renderPages() {
    var host = $("vPage"); host.innerHTML = "";
    var wrap = el("div", "pages"); host.appendChild(wrap);
    S.pageUrls.forEach(function (u) { URL.revokeObjectURL(u); }); S.pageUrls = [];
    var ids = S.piece.pages || [], piece = S.piece;
    if (!ids.length) { host.appendChild(el("p", "msg", "No pages")); return; }
    ids.forEach(function (id, i) {
      var img = el("img"); img.alt = "Page " + (i + 1); img.decoding = "async";
      wrap.appendChild(img);
      pgGet(id).then(function (r) {
        if (!r || S.piece !== piece) return;
        var u = URL.createObjectURL(r.blob); S.pageUrls.push(u); img.src = u;
        if (r.w && r.h) { img.width = r.w; img.height = r.h; }
      }).catch(function () {});
    });
  }

  /* ================================================================ wiring */
  function route() {
    var m = /^#\/p\/([^/?]+)/.exec(location.hash || "");
    if (m) {
      if (S.piece && S.piece.id === m[1] && S.route === "player") return;
      openPiece(m[1]);
    } else {
      if (S.route === "player") leavePlayer();
      showScreen("list"); renderList();
      window.scrollTo(0, 0);
    }
  }
  var resizeT = 0, lastW = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (S.route !== "player") return;
      var w = $("vPlayer").clientWidth;
      if (w === lastW) return;
      lastW = w;
      if (S.view === "tab") renderTab(); else if (S.view === "notes") renderNotes();
    }, 150);
  });

  function boot() {
    loadData();
    $("add").onclick = function () { openAdd(null); };
    $("back").onclick = function () { location.hash = ""; };
    $("bPlay").onclick = function () { S.playing ? pausePlay() : startPlay(); };
    $("bStart").onclick = function () { var L = loopRange(); seekTo(L ? L.start : 0); };
    $("bLoop").onclick = toggleLoop;
    $("bMore").onclick = function () {
      var m = $("more"), open = m.hidden;
      m.hidden = !open; $("bMore").setAttribute("aria-expanded", String(open));
      $("bMore").classList.toggle("sel", open);
    };
    holdButton($("bSlow"), function () { changeBpm(S.prefs.bpm - 1); });
    holdButton($("bFast"), function () { changeBpm(S.prefs.bpm + 1); });
    $("bBpm").onclick = typeTempo;
    Array.prototype.forEach.call($("views").querySelectorAll("button"), function (b) { b.onclick = function () { setView(b.getAttribute("data-v")); }; });
    $("addSheet").addEventListener("cancel", function (e) { e.preventDefault(); closeAdd(); });
    window.addEventListener("hashchange", route);
    window.addEventListener("pagehide", function () { if (S.playing) pausePlay(true); saveData(); });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") saveData(); });
    window.addEventListener("keydown", function (e) {
      if (S.route !== "player" || /INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ""))) return;
      if (e.key === " " && e.target === document.body) { e.preventDefault(); S.playing ? pausePlay() : startPlay(); }
    });
    window.__playalongContext = function () {
      if (S.route === "player" && S.piece && S.loc) {
        var b = S.score.measures[S.loc.bar];
        return "In Play Along: " + S.piece.title + ", bar " + b.n + " of " + S.score.measures.length + ", " + S.prefs.bpm + " bpm.";
      }
      return S.route === "player" && S.piece ? "In Play Along: " + S.piece.title + "." : "In Play Along, list of pieces.";
    };
    route();
  }

  // for tests and tinkering in the console
  window.PlayAlong = {
    S: S, E: E, data: function () { return data; }, normalizePage: normalizePage, mergePages: mergePages, finishScore: finishScore,
    buildTimeline: buildTimeline, locate: locate, toAbc: toAbc, transcribe: transcribe, ksSamples: ksSamples, parsePitch: parsePitch,
    loopRange: loopRange, posAtTime: posAtTime, saveData: saveData, reload: function () { loadData(); route(); }, openPiece: openPiece, pgPut: pgPut
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
