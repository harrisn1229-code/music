/* PAImport: Guitar Pro (.gp3 .gp4 .gp5 .gpx .gp), MusicXML (.xml .musicxml .mxl) and MIDI (.mid .midi) -> Play Along score v2.
   Standalone: no dependency on app.js. Guitar Pro and MusicXML are parsed by alphaTab (MPL-2.0, parsing only, vendored in
   vendor/alphatab/ and loaded on the first import); MIDI is parsed here.

   API (window.PAImport)
     accepts(file) -> bool                      by extension or MIME; file is a File, or a name string
     read(file | ArrayBuffer | Uint8Array, name) -> Promise<{ score, parts: [{ index, name, instrument }], warnings: [string] }>
         Rejects with an Error whose message is short and fit to show. parts[].index is the index in score.parts.
         score is the contract's score v2 (source "guitarpro" | "musicxml" | "midi"). The main part is the first bass track,
         else the first non-drum track; the other tracks are in score.parts (bar-aligned with score.measures).
         A piano track with two staves is one "grand" part when both hands have the same rhythm, otherwise two parts
         ("Piano" and "Piano LH"). Drum parts have instrument "drums", program -1, notes { drum: GM note, pitch: "C4" }.
         If drums end up as the MAIN part, score.instrument is "other" and score.program is -1 (setMain keeps that
         round trip exact: a part whose program is -1 is a drum part).
         score.order is computed from repeats, 1st/2nd endings and D.C./D.S./Coda/Fine; null when straight through.
     setMain(score, partIndex) -> score         swaps score.parts[partIndex] with the main part in place (same slot).
         Swaps events, instrument, tuning, strings, clef, program, mainName. Bar-level data (chords, repeats, ...) stays.
   Notes
     - Written pitches: bass and guitar are written an octave above sounding and the part has octave -12.
     - Tab strings are converted to the contract's numbering (1 = highest string); tuning is MIDI low -> high.
       A capo is folded into the tuning so fret numbers stay as printed.
     - Bars whose events do not add up are padded/trimmed to the time signature, get bad: true and a warning.
*/
(function () {
  "use strict";

  /* ---------------------------------------------------------------- location of the vendored alphaTab */
  var SELF_SRC = (function () {
    try {
      if (document.currentScript && document.currentScript.src) return document.currentScript.src;
      var ss = document.getElementsByTagName("script");
      for (var i = ss.length - 1; i >= 0; i--) if (/import\.js(\?|#|$)/.test(ss[i].src || "")) return ss[i].src;
    } catch (e) {}
    return "";
  })();
  var LIB_REL = "vendor/alphatab/alphaTab.min.js";
  var libPromise = null;

  function libUrl() {
    try { return new URL(LIB_REL, SELF_SRC || document.baseURI).href; } catch (e) { return LIB_REL; }
  }
  function loadLib() {
    if (libPromise) return libPromise;
    if (window.alphaTab && window.alphaTab.importer) { libPromise = Promise.resolve(window.alphaTab); return libPromise; }
    libPromise = new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = libUrl();
      s.async = true;
      s.charset = "utf-8";   // the build holds a few non-ASCII characters
      s.onload = function () {
        if (window.alphaTab && window.alphaTab.importer) res(window.alphaTab);
        else { libPromise = null; rej(new Error("Could not start the file reader")); }
      };
      s.onerror = function () { libPromise = null; rej(new Error("Could not load the file reader")); };
      document.head.appendChild(s);
    });
    return libPromise;
  }

  /* ---------------------------------------------------------------- helpers */
  var EXT = ["gp", "gp3", "gp4", "gp5", "gpx", "xml", "musicxml", "mxl", "mid", "midi"];
  var MIME_RE = /(midi|musicxml|guitar-?pro|x-gtp|vnd\.recordare)/i;
  function extOf(name) { var m = /\.([a-z0-9]+)$/i.exec(String(name || "")); return m ? m[1].toLowerCase() : ""; }
  function baseName(name) { return String(name || "").replace(/^.*[\\/]/, "").replace(/\.[a-z0-9]+$/i, "").trim(); }
  function accepts(file) {
    if (!file) return false;
    if (typeof file === "string") return EXT.indexOf(extOf(file)) >= 0;
    if (EXT.indexOf(extOf(file.name)) >= 0) return true;
    return !!(file.type && MIME_RE.test(file.type));
  }
  function round6(x) { return Math.round(x * 1e6) / 1e6; }
  function nz(x, d) { return typeof x === "number" && isFinite(x) ? x : d; }
  function clean(s) { return String(s == null ? "" : s).replace(/[\u00a0\u2007\u202f]/g, " ").replace(/\s+/g, " ").trim(); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function fail(msg) { var e = new Error(msg); e.paImport = true; return e; }

  /* ---------------------------------------------------------------- pitch spelling */
  var STEP = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  var MAJOR_BY_FIFTHS = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];
  var MINOR_BY_FIFTHS = ["Abm", "Ebm", "Bbm", "Fm", "Cm", "Gm", "Dm", "Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m"];
  var SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
  var LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
  var CHROM_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  var CHROM_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var CHROM_ZERO = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  var scaleCache = {};

  function keyName(fifths, minor) {
    var f = Math.max(-7, Math.min(7, Math.round(fifths) || 0));
    return (minor ? MINOR_BY_FIFTHS : MAJOR_BY_FIFTHS)[f + 7];
  }
  /* pitch class -> {letter, acc} for the 7 notes of the key signature */
  function scaleFor(fifths) {
    if (scaleCache[fifths]) return scaleCache[fifths];
    var accOf = {}, i;
    for (i = 0; i < 7; i++) accOf[LETTERS[i]] = 0;
    if (fifths > 0) for (i = 0; i < fifths && i < 7; i++) accOf[SHARP_ORDER[i]] = 1;
    if (fifths < 0) for (i = 0; i < -fifths && i < 7; i++) accOf[SHARP_ORDER[6 - i]] = -1;
    var map = {};
    for (i = 0; i < 7; i++) {
      var L = LETTERS[i], pc = ((STEP[L] + accOf[L]) % 12 + 12) % 12;
      map[pc] = { letter: L, acc: accOf[L] };
    }
    scaleCache[fifths] = map;
    return map;
  }
  /* MIDI number -> written pitch string like "Bb2" / "F#4", spelled for the key */
  function spell(midi, fifths) {
    midi = Math.round(midi);
    fifths = Math.max(-7, Math.min(7, fifths | 0));
    var pc = ((midi % 12) + 12) % 12, letter, acc, hit = scaleFor(fifths)[pc];
    if (hit) { letter = hit.letter; acc = hit.acc; }
    else {
      var nm = (fifths < 0 ? CHROM_FLAT : fifths > 0 ? CHROM_SHARP : CHROM_ZERO)[pc];
      letter = nm.charAt(0); acc = nm.length > 1 ? (nm.charAt(1) === "#" ? 1 : -1) : 0;
    }
    var oct = Math.round((midi - acc - STEP[letter]) / 12) - 1;
    return letter + (acc === 1 ? "#" : acc === -1 ? "b" : "") + oct;
  }

  /* ---------------------------------------------------------------- score model helpers (shared by all sources) */
  function barLenOf(t) { return t[0] * 4 / t[1]; }
  function sumOf(events) { var s = 0; for (var i = 0; i < events.length; i++) s += events[i].d; return s; }
  function isRestOnly(events) { for (var i = 0; i < events.length; i++) if (events[i].notes.length) return false; return true; }
  function sameRhythm(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (Math.abs(a[i].d - b[i].d) > 1e-4) return false;
    return true;
  }
  function GM_INST(program) {
    if (program >= 32 && program <= 39) return "bass";
    if (program >= 24 && program <= 31) return "guitar";
    if (program >= 0 && program <= 7) return "piano";
    if (program >= 16 && program <= 23) return "piano";
    return "other";
  }
  var GM_FAMILY = ["Piano", "Chromatic", "Organ", "Guitar", "Bass", "Strings", "Ensemble", "Brass", "Reed", "Pipe", "Lead", "Pad", "Effects", "Ethnic", "Percussive", "Sound FX"];
  function gmName(program) {
    if (program >= 32 && program <= 39) return "Bass";
    if (program >= 24 && program <= 31) return "Guitar";
    return GM_FAMILY[Math.max(0, Math.min(15, Math.floor(program / 8)))] || "Part";
  }
  function stdTuning(inst, lowest) {
    if (inst === "bass") return lowest != null && lowest < 28 ? [23, 28, 33, 38, 43] : [28, 33, 38, 43];
    return lowest != null && lowest < 40 ? [35, 40, 45, 50, 55, 59, 64] : [40, 45, 50, 55, 59, 64];
  }
  function clefFor(inst, lo, hi, grandOk) {
    if (inst === "bass") return "bass";
    if (inst === "guitar") return "treble8vb";
    if (lo == null) return "treble";
    if (grandOk && lo < 55 && hi > 67) return "grand";
    var mid = (lo + hi) / 2;
    return mid < 54 ? "bass" : "treble";
  }
  function rangeOf(events) {
    var lo = null, hi = null;
    events.forEach(function (ev) {
      ev.notes.forEach(function (n) {
        if (n.drum != null) return;
        var m = pitchToMidi(n.pitch);
        if (m == null) return;
        if (lo == null || m < lo) lo = m;
        if (hi == null || m > hi) hi = m;
      });
    });
    return { lo: lo, hi: hi };
  }
  function pitchToMidi(p) {
    var m = /^([A-G])(bb|b|#|x)?(-?\d)$/.exec(p || "");
    if (!m) return null;
    var acc = m[2] === "#" ? 1 : m[2] === "b" ? -1 : m[2] === "bb" ? -2 : m[2] === "x" ? 2 : 0;
    return 12 * (+m[3] + 1) + STEP[m[1]] + acc;
  }

  /* Same rule as the photo path's fixTab, for tab-less sources (MIDI): lowest fret that works, near the last string used. */
  function assignTab(part) {
    var T = part.tuning, N = T.length, lastS = null, oct = part.octave || 0;
    part.bars.forEach(function (evs) {
      evs.forEach(function (ev) {
        var used = {};
        ev.notes.slice().sort(function (a, b) { return pitchToMidi(b.pitch) - pitchToMidi(a.pitch); }).forEach(function (n) {
          var snd = pitchToMidi(n.pitch) + oct, best = null;
          for (var s = 1; s <= N; s++) {
            if (used[s]) continue;
            var f = snd - T[N - s];
            if (f < 0 || f > 24) continue;
            var cost = f * 10 + (lastS != null ? Math.abs(s - lastS) : 0);
            if (!best || cost < best.cost) best = { s: s, f: f, cost: cost };
          }
          if (best) { n.s = best.s; n.f = best.f; used[best.s] = 1; lastS = best.s; }
        });
      });
    });
  }

  /* markTies of the photo path: cont = a note of the previous event with the same pitch is tied. */
  function markTies(barsEvents) {
    var prev = null;
    barsEvents.forEach(function (evs) {
      evs.forEach(function (ev) {
        ev.notes.forEach(function (n) {
          n.cont = !!(prev && prev.notes.some(function (p) { return p.tie && p.pitch === n.pitch; }));
        });
        prev = ev;
      });
    });
  }

  /* Pads or trims a bar's events to len. Returns { events, fixed } */
  function fitBar(events, len) {
    var sum = sumOf(events);
    if (Math.abs(sum - len) < 0.02) return { events: events, fixed: false, sum: sum };
    var out = [];
    if (sum < len) {
      out = events.slice();
      out.push({ d: round6(len - sum), notes: [] });
    } else {
      var acc = 0;
      for (var i = 0; i < events.length; i++) {
        var ev = events[i], room = len - acc;
        if (room < 0.005) break;
        if (ev.d > room + 0.005) {
          var cut = { d: round6(room), notes: ev.notes.map(function (n) { var c = {}; for (var k in n) c[k] = n[k]; delete c.tie; return c; }) };
          if (ev.lyric) cut.lyric = ev.lyric;
          out.push(cut); acc = len; break;
        }
        out.push(ev); acc += ev.d;
      }
      if (acc < len - 0.02) out.push({ d: round6(len - acc), notes: [] });
    }
    return { events: out, fixed: true, sum: sum };
  }

  /* ---------------------------------------------------------------- playback order from repeats, endings, directions */
  /* bars: [{ repeatStart, repeatEnd (times, 0 = none), alt (bitmask of endings, 0 = none), dir: [direction names] }] */
  function computeOrder(bars, warnings) {
    var n = bars.length, order = [], i = 0, pass = 1, start = 0, steps = 0, LIMIT = 20000;
    var jumped = false, lastPass = 1, stopAtFine = false;
    function find(name) { for (var k = 0; k < n; k++) if (bars[k].dir && bars[k].dir.indexOf(name) >= 0) return k; return -1; }
    var any = false;
    for (var q = 0; q < n; q++) if (bars[q].repeatStart || bars[q].repeatEnd > 1 || bars[q].alt || (bars[q].dir && bars[q].dir.length)) { any = true; break; }
    if (!any) return null;
    while (i < n && steps++ < LIMIT) {
      var b = bars[i];
      if (b.repeatStart && !jumped && start !== i) { start = i; pass = 1; }
      var ep = jumped ? lastPass : pass;
      if (b.alt && !(b.alt & (1 << Math.min(ep - 1, 30)))) {
        // not part of this pass; skip the bar (and any repeat sign on it)
        i++; continue;
      }
      order.push(i + 1);
      var dirs = b.dir || [], next = i + 1, d;
      // repeat sign at the end of the bar
      if (b.repeatEnd > 1 && !jumped) {
        if (pass < b.repeatEnd) { pass++; i = start; continue; }
        lastPass = pass; pass = 1; start = i + 1;
      } else if (b.alt && !jumped) {
        var nxt = bars[i + 1];
        if (!nxt || !nxt.alt) { lastPass = pass; pass = 1; start = i + 1; }
      }
      // directions at the end of the bar
      if (jumped) {
        if (stopAtFine && dirs.indexOf("fine") >= 0) break;
        if (dirs.indexOf("dacoda") >= 0) { d = find("coda"); if (d >= 0) { next = d; } }
        else if (dirs.indexOf("dadoublecoda") >= 0) { d = find("doublecoda"); if (d >= 0) next = d; }
      } else {
        var jump = null;
        for (var k = 0; k < dirs.length; k++) if (/^(dc|ds|dss)/.test(dirs[k])) jump = dirs[k];
        if (jump) {
          var target = jump.indexOf("dss") === 0 ? find("segnosegno") : jump.indexOf("ds") === 0 ? find("segno") : 0;
          if (target < 0) warnings.push("Jump to a sign that is not in the file was ignored");
          else {
            jumped = true; next = target; lastPass = Math.max(lastPass, 1);
            stopAtFine = /fine$/.test(jump) || find("fine") >= 0;
          }
        }
      }
      i = next;
    }
    if (steps >= LIMIT) { warnings.push("Repeat structure too complicated; playing straight through"); return null; }
    var straight = order.length === n;
    for (var z = 0; straight && z < n; z++) if (order[z] !== z + 1) straight = false;
    return straight ? null : order;
  }

  /* ---------------------------------------------------------------- assemble score v2 from a neutral description */
  /* desc: { title, source, time0:[n,d], tempo, key0, swing, pickup, order,
             bars: [{ time, key, tempo, section, repeatStart, repeatEnd, ending, chords }] (time/key/tempo only where they change),
             barLens: [quarter beats per bar],
             parts: [{ name, instrument, program, clef, tuning, strings, octave, bars: [events[]], chords: [[{at,name}]] }] } */
  function assemble(desc, warnings) {
    var parts = desc.parts, nb = desc.bars.length, k, i;
    if (!parts.length) throw fail("No notes found in this file");
    // main: first bass, else first non-drum, else first
    var mainIx = -1;
    for (k = 0; k < parts.length && mainIx < 0; k++) if (parts[k].instrument === "bass") mainIx = k;
    for (k = 0; k < parts.length && mainIx < 0; k++) if (parts[k].instrument !== "drums") mainIx = k;
    if (mainIx < 0) mainIx = 0;
    var main = parts[mainIx];
    var pickup = desc.pickup > 0 ? desc.pickup : 0;

    function expected(idx) {
      var bl = desc.barLens[idx], ok = [bl];
      if (pickup > 0) { if (idx === 0) ok.push(pickup); if (idx === nb - 1 && idx > 0) ok.push(bl - pickup); }
      return ok;
    }
    function fixPart(p, isMain) {
      var fixedBars = [];
      for (i = 0; i < nb; i++) {
        var evs = p.bars[i];
        if (!evs || !evs.length) evs = [{ d: desc.barLens[i], notes: [] }];
        var s = sumOf(evs), oks = expected(i), good = false;
        for (var z = 0; z < oks.length; z++) if (Math.abs(s - oks[z]) < 0.02) good = true;
        if (!good) {
          var f = fitBar(evs, desc.barLens[i]);
          p.bars[i] = f.events;
          fixedBars.push({ i: i, sum: f.sum });
        } else p.bars[i] = evs;
      }
      return fixedBars;
    }
    var mainFixed = fixPart(main, true);
    var fixedByIdx = {};
    mainFixed.forEach(function (f) { fixedByIdx[f.i] = f.sum; });
    if (mainFixed.length) warnings.push("Bar" + (mainFixed.length > 1 ? "s " : " ") + mainFixed.slice(0, 8).map(function (f) { return f.i + 1; }).join(", ") + (mainFixed.length > 8 ? "..." : "") + " did not add up and " + (mainFixed.length > 1 ? "were" : "was") + " padded or trimmed");
    parts.forEach(function (p, ix) {
      if (ix === mainIx) return;
      var f = fixPart(p, false);
      if (f.length) warnings.push(p.name + ": " + f.length + " bar" + (f.length > 1 ? "s" : "") + " padded or trimmed");
    });

    var score = {
      title: desc.title || "", instrument: main.instrument === "drums" ? "other" : main.instrument,
      tuning: main.tuning || null, strings: main.strings || 0, clef: main.clef,
      key: desc.key0 || "C", time: desc.time0.slice(), tempo: desc.tempo != null ? desc.tempo : null,
      swing: !!desc.swing, pickup: pickup, order: desc.order || null, uncertain: "",
      measures: [], mainName: main.name, program: main.instrument === "drums" ? -1 : nz(main.program, 0),
      parts: [], source: desc.source
    };
    if (score.instrument === "bass" || score.instrument === "guitar") { if (!score.tuning) { score.tuning = stdTuning(score.instrument); } if (!score.strings && main.tab) score.strings = score.tuning.length; }
    for (i = 0; i < nb; i++) {
      var bm = desc.bars[i], m = { n: i + 1, chords: [], events: main.bars[i] };
      var chs = (main.chords && main.chords[i]) || [];
      if (!chs.length) for (k = 0; k < parts.length && !chs.length; k++) if (k !== mainIx && parts[k].chordsFromAny && parts[k].chords && parts[k].chords[i]) chs = parts[k].chords[i];
      m.chords = chs.map(function (c) { return { at: round6(c.at), name: c.name }; });
      if (bm.repeatStart) m.repeatStart = true;
      if (bm.repeatEnd > 1) m.repeatEnd = bm.repeatEnd;
      if (bm.ending) m.ending = bm.ending;
      if (bm.time) m.time = bm.time.slice();
      if (bm.key) m.key = bm.key;
      if (bm.tempo) m.tempo = bm.tempo;
      if (bm.section) m.section = bm.section;
      m.sum = round6(fixedByIdx[i] != null ? fixedByIdx[i] : sumOf(m.events));
      if (fixedByIdx[i] != null) m.bad = true;
      score.measures.push(m);
    }
    markTies(main.bars);
    parts.forEach(function (p, ix) {
      if (ix === mainIx) return;
      markTies(p.bars);
      score.parts.push({
        id: "pt" + (score.parts.length + 1), name: p.name, instrument: p.instrument, program: p.instrument === "drums" ? -1 : nz(p.program, 0),
        clef: p.clef, tuning: p.tuning || null, strings: p.strings || 0, octave: p.octave || 0,
        measures: p.bars.map(function (evs) { return { events: evs }; })
      });
    });
    return score;
  }

  function partList(score) {
    return (score.parts || []).map(function (p, i) { return { index: i, name: p.name, instrument: p.instrument }; });
  }

  /* ---------------------------------------------------------------- setMain */
  function setMain(score, idx) {
    if (!score || !Array.isArray(score.parts) || idx < 0 || idx >= score.parts.length) return score;
    var p = score.parts[idx];
    var oldInst = score.instrument === "other" && score.program === -1 ? "drums" : score.instrument;
    var oldHad8vb = oldInst === "bass" || oldInst === "guitar" || score.clef === "treble8vb";
    var old = {
      name: score.mainName || (oldInst === "bass" ? "Bass" : oldInst === "guitar" ? "Guitar" : oldInst === "piano" ? "Piano" : "Main"),
      instrument: oldInst, program: oldInst === "drums" ? -1 : nz(score.program, 0), clef: score.clef,
      tuning: score.tuning || null, strings: score.strings || 0, octave: oldHad8vb ? -12 : 0,
      events: score.measures.map(function (m) { return m.events; })
    };
    // new main from the part
    score.measures.forEach(function (m, i) {
      var pm = p.measures[i];
      m.events = pm ? pm.events : [{ d: barLenOf(timeAt(score, i)), notes: [] }];
      var s = 0; m.events.forEach(function (e) { s += e.d; });
      m.sum = round6(s);
      delete m.bad;
    });
    score.instrument = p.instrument === "drums" ? "other" : p.instrument;
    score.program = p.instrument === "drums" ? -1 : nz(p.program, 0);
    score.clef = p.clef;
    score.tuning = p.tuning || null;
    score.strings = p.strings || 0;
    score.mainName = p.name;
    // old main goes into the slot
    p.name = old.name; p.instrument = old.instrument; p.program = old.program; p.clef = old.clef;
    p.tuning = old.tuning; p.strings = old.strings; p.octave = old.octave;
    p.measures = old.events.map(function (evs) { return { events: evs }; });
    // keep the ties right in both
    markTies(score.measures.map(function (m) { return m.events; }));
    markTies(p.measures.map(function (m) { return m.events; }));
    return score;
  }
  function timeAt(score, i) {
    var t = score.time;
    for (var k = 0; k <= i && k < score.measures.length; k++) if (score.measures[k].time) t = score.measures[k].time;
    return t;
  }

  /* ================================================================ Guitar Pro / MusicXML via alphaTab */
  var DIR_NAMES = {
    0: "fine", 1: "segno", 2: "segnosegno", 3: "coda", 4: "doublecoda",
    5: "dc", 6: "dcalcoda", 7: "dcaldoublecoda", 8: "dcalfine",
    9: "ds", 10: "dsalcoda", 11: "dsaldoublecoda", 12: "dsalfine",
    13: "dss", 14: "dssalcoda", 15: "dssaldoublecoda", 16: "dssalfine",
    17: "dacoda", 18: "dadoublecoda"
  };

  function beatQuarters(beat, barLen) {
    var du = beat.duration, base = du > 0 ? 4 / du : -du * 4;
    var dots = beat.dots | 0;
    base *= 2 - Math.pow(0.5, dots);
    var num = beat.tupletNumerator, den = beat.tupletDenominator;
    if (num > 0 && den > 0 && !(num === 1 && den === 1)) base *= den / num;
    if (beat.isRest && beat.isFullBarRest && barLen) base = barLen;
    return base;
  }

  function classify(track, staff, tabbed) {
    var perc = !!(track.isPercussion || (staff && staff.isPercussion));
    if (perc) return { instrument: "drums", program: -1 };
    var prog = track.playbackInfo ? track.playbackInfo.program : 0, name = String(track.name || "");
    var inst = null;
    if (prog >= 32 && prog <= 39) inst = "bass";
    else if (prog >= 24 && prog <= 31) inst = "guitar";
    else if (tabbed) {
      var T = staff.tuning, N = T.length, lo = Math.min.apply(null, T);
      if (/bass/i.test(name) && !/guitar/i.test(name)) inst = "bass";
      else if (N === 4 || N === 5 || (N === 6 && lo <= 35 && !/guitar/i.test(name))) inst = lo < 40 ? "bass" : "guitar";
      else inst = "guitar";
    } else if (prog === 0) {
      if (/bass/i.test(name)) inst = "bass";
      else if (/guitar|gtr/i.test(name)) inst = "guitar";
      else if (/drum|perc/i.test(name)) inst = "drums";
      else inst = "piano";
    } else inst = GM_INST(prog);
    if (inst === "drums") return { instrument: "drums", program: -1 };
    if (inst === "bass" && !(prog >= 32 && prog <= 39)) prog = 33;
    if (inst === "guitar" && !(prog >= 24 && prog <= 31)) prog = 25;
    return { instrument: inst, program: prog };
  }

  function convertAlphaTab(sc, fileName, warnings) {
    var MB = sc.masterBars, nb = MB.length, i, k;
    if (!nb || !sc.tracks.length) throw fail("No music found in this file");
    var timeOf = [], barLens = [], keyFifths = [], keyNames = [], tempoAt = [], bars = [], dirBars = [];
    var curTime = null, curKey = null, curTempo = null, firstTempo = null;
    for (i = 0; i < nb; i++) {
      var mb = MB[i];
      var tn = mb.timeSignatureNumerator > 0 ? mb.timeSignatureNumerator : 4, td = mb.timeSignatureDenominator > 0 ? mb.timeSignatureDenominator : 4;
      timeOf.push([tn, td]); barLens.push(tn * 4 / td);
      var minor = mb.keySignatureType === 1, fifths = mb.keySignature | 0;
      keyFifths.push(fifths); keyNames.push(keyName(fifths, minor));
      var tmp = null;
      var autos = mb.tempoAutomations || [];
      for (k = 0; k < autos.length; k++) {
        if (autos[k].value > 0 && autos[k].ratioPosition === 0 && tmp == null) tmp = Math.round(autos[k].value);
        else if (autos[k].value > 0 && autos[k].ratioPosition > 0 && i + 1 < nb && tmp == null) tempoAt[i + 1] = Math.round(autos[k].value);
      }
      if (tmp != null) tempoAt[i] = tmp;
      var bm = {};
      if (i === 0) { curTime = timeOf[0]; curKey = keyNames[0]; }
      else {
        if (timeOf[i][0] !== curTime[0] || timeOf[i][1] !== curTime[1]) { bm.time = timeOf[i].slice(); curTime = timeOf[i]; }
        if (keyNames[i] !== curKey) { bm.key = keyNames[i]; curKey = keyNames[i]; }
      }
      if (mb.isRepeatStart) bm.repeatStart = true;
      var rc = mb.isRepeatEnd ? Math.max(2, mb.repeatCount | 0) : 0;
      if (rc) bm.repeatEnd = Math.min(rc, 9);
      var alt = mb.alternateEndings | 0;
      if (alt) { for (k = 0; k < 8; k++) if (alt & (1 << k)) { bm.ending = k + 1; break; } }
      if (mb.section) {
        var sname = clean(mb.section.text) || clean(mb.section.marker);
        if (sname) bm.section = sname.slice(0, 40);
      }
      var dirs = [];
      if (mb.directions) mb.directions.forEach(function (d) { if (DIR_NAMES[d]) dirs.push(DIR_NAMES[d]); });
      dirBars.push({ repeatStart: !!mb.isRepeatStart, repeatEnd: rc, alt: alt, dir: dirs });
      bars.push(bm);
    }
    // tempo: first value, then changes
    firstTempo = tempoAt[0] != null ? tempoAt[0] : null;
    if (firstTempo == null) { try { var st = Math.round(sc.tempo); if (st > 0) firstTempo = st; } catch (e) {} }
    curTempo = firstTempo;
    for (i = 1; i < nb; i++) if (tempoAt[i] != null && tempoAt[i] !== curTempo) { bars[i].tempo = tempoAt[i]; curTempo = tempoAt[i]; }
    if (firstTempo != null && tempoAt[0] != null && firstTempo === tempoAt[0]) { /* score.tempo */ }

    var voice2Dropped = false;
    var parts = [];

    function noteList(beat, ctx) {
      var out = [];
      for (var q = 0; q < beat.notes.length; q++) {
        var nt = beat.notes[q], n;
        if (ctx.drum) {
          var dn = Math.round(nt.realValue);
          if (!(dn >= 0 && dn < 128)) continue;
          n = { drum: dn, pitch: "C4" };
        } else {
          var snd = Math.round(nt.realValueWithoutHarmonic != null ? nt.realValueWithoutHarmonic : nt.realValue);
          var wr = snd + (ctx.octave === -12 ? 12 : 0);
          n = { pitch: spell(wr, ctx.fifths) };
          if (ctx.tab && nt.isStringed) {
            n.s = ctx.N - nt.string + 1;
            n.f = nt.fret;
            if (n.s < 1 || n.s > ctx.N) { delete n.s; delete n.f; }
          }
          if (nt.isDead) n.dead = true;
          if (nt.isTieDestination && ctx.prev) {
            for (var z = 0; z < ctx.prev.notes.length; z++) if (ctx.prev.notes[z].pitch === n.pitch) { ctx.prev.notes[z].tie = true; break; }
          }
        }
        var dup = false;
        for (var y = 0; y < out.length; y++) if (out[y].pitch === n.pitch && out[y].drum === n.drum) dup = true;
        if (!dup) out.push(n);
      }
      return out;
    }

    /* events of one voice in one bar */
    function voiceBar(voice, bi, ctx) {
      var evs = [], chs = [], pos = 0, bl = barLens[bi];
      if (!voice) return { events: evs, chords: chs };
      ctx.fifths = keyFifths[bi];
      var beats = voice.beats || [];
      for (var q = 0; q < beats.length; q++) {
        var b = beats[q];
        if (b.graceType) continue;
        var d = beatQuarters(b, bl);
        if (!(d > 0)) continue;
        var ev = { d: d, notes: [] };
        if (!b.isEmpty && b.notes.length) ev.notes = noteList(b, ctx);
        ctx.prev = ev;
        if (b.lyrics && b.lyrics.length) {
          var ly = clean(b.lyrics.join(" "));
          if (ly) ev.lyric = ly;
        }
        try {
          var ch = b.chord;
          if (ch && clean(ch.name)) chs.push({ at: pos, name: clean(ch.name).slice(0, 24) });
        } catch (e) {}
        evs.push(ev); pos += d;
      }
      return { events: evs, chords: chs };
    }

    /* drums: all voices, merged by onset, hits last until the next hit */
    function drumBar(staff, bi, ctx) {
      var hits = [], bl = barLens[bi], bar = staff.bars[bi];
      if (bar) for (var v = 0; v < bar.voices.length; v++) {
        var pos = 0, beats = bar.voices[v].beats || [];
        for (var q = 0; q < beats.length; q++) {
          var b = beats[q];
          if (b.graceType) continue;
          var d = beatQuarters(b, bl);
          if (!b.isEmpty && b.notes.length) {
            var ns = noteList(b, ctx);
            if (ns.length) hits.push({ at: pos, notes: ns });
          }
          pos += d;
        }
      }
      hits.sort(function (a, c) { return a.at - c.at; });
      var merged = [];
      hits.forEach(function (h) {
        var last = merged[merged.length - 1];
        if (last && Math.abs(last.at - h.at) < 1e-4) {
          h.notes.forEach(function (n) { if (!last.notes.some(function (x) { return x.drum === n.drum; })) last.notes.push(n); });
        } else merged.push({ at: h.at, notes: h.notes.slice() });
      });
      var evs = [], t = 0;
      merged.forEach(function (h, idx) {
        if (h.at >= bl - 1e-4) return;
        if (h.at - t > 1e-4) evs.push({ d: round6(h.at - t), notes: [] });
        var end = idx + 1 < merged.length ? Math.min(merged[idx + 1].at, bl) : bl;
        if (end - h.at < 1e-4) return;
        evs.push({ d: round6(end - h.at), notes: h.notes });
        t = end;
      });
      if (!evs.length) evs.push({ d: bl, notes: [] });
      return { events: evs, chords: [] };
    }

    /* one staff of a track -> per-bar events (voice 1; voice 2 where it helps) */
    function staffBars(staff, ctxBase) {
      var res = [], ctx = ctxBase;
      for (var bi = 0; bi < nb; bi++) {
        var bar = staff.bars[bi];
        if (ctx.drum) { res.push(drumBar(staff, bi, ctx)); continue; }
        var v1 = bar && bar.voices[0] ? voiceBar(bar.voices[0], bi, ctx) : { events: [], chords: [] };
        var v2 = bar && bar.voices[1] && !bar.voices[1].isEmpty ? bar.voices[1] : null;
        if (v2) {
          var hasNotes = false;
          for (var q = 0; q < v2.beats.length; q++) if (v2.beats[q].notes.length && !v2.beats[q].isEmpty) hasNotes = true;
          if (hasNotes) {
            if (!v1.events.length || isRestOnly(v1.events)) {
              var r2 = voiceBar(v2, bi, ctx);
              v1 = { events: r2.events, chords: v1.chords.length ? v1.chords : r2.chords };
            } else {
              var tmpCtx = { drum: false, octave: ctx.octave, tab: ctx.tab, N: ctx.N, fifths: ctx.fifths, prev: null };
              var r3 = voiceBar(v2, bi, tmpCtx);
              if (sameRhythm(v1.events, r3.events)) {
                for (var e = 0; e < v1.events.length; e++) {
                  r3.events[e].notes.forEach(function (n) {
                    if (!v1.events[e].notes.some(function (x) { return x.pitch === n.pitch; })) v1.events[e].notes.push(n);
                  });
                }
              } else if (!voice2Dropped) { voice2Dropped = true; warnings.push("Second voice dropped where it plays a different rhythm"); }
            }
          }
        }
        if (!v1.events.length) v1.events = [{ d: barLens[bi], notes: [] }];
        ctx.prev = v1.events[v1.events.length - 1];
        res.push(v1);
      }
      return res;
    }

    sc.tracks.forEach(function (track, ti) {
      var staves = track.staves || [];
      if (!staves.length) return;
      var st0 = staves[0];
      var tabbed = !!(st0.isStringed && st0.tuning && st0.tuning.length > 0 && st0.showTablature);
      var cls = classify(track, st0, tabbed);
      var inst = cls.instrument;
      var name = clean(track.name) || (inst === "drums" ? "Drums" : gmName(cls.program));
      var drum = inst === "drums";
      var fretted = (inst === "bass" || inst === "guitar");
      var hasTab = fretted && st0.isStringed && st0.tuning.length > 0 && (st0.showTablature || tabbed);
      var tuning = null, N = 0;
      if (hasTab) {
        tuning = st0.tuning.slice().reverse().map(function (t) { return t + (st0.capo || 0); });
        N = tuning.length;
      }
      var ctx = { drum: drum, octave: fretted ? -12 : 0, tab: hasTab, N: N, fifths: 0, prev: null };
      var multi = !drum && !st0.isStringed && staves.length > 1;
      // a piano-like track may be written as stringed by exporters; treat it as piano when it is not tabbed and has 2 staves
      if (!drum && !fretted && staves.length > 1) multi = true;
      var main = staffBars(st0, ctx);
      var perBar = main.map(function (b) { return b.events; });
      var chords = main.map(function (b) { return b.chords; });
      var lowParts = null;

      if (multi) {
        var ctx2 = { drum: false, octave: 0, tab: false, N: 0, fifths: 0, prev: null };
        var lh = staffBars(staves[1], ctx2);
        var mergedBars = [], ok = true;
        for (i = 0; i < nb && ok; i++) {
          var a = perBar[i], b2 = lh[i].events;
          if (isRestOnly(b2)) mergedBars.push(a);
          else if (isRestOnly(a)) mergedBars.push(b2);
          else if (sameRhythm(a, b2)) {
            var evs = a.map(function (ev, ei) {
              var notes = b2[ei].notes.concat(ev.notes);
              var out = { d: ev.d, notes: notes };
              if (ev.lyric) out.lyric = ev.lyric;
              return out;
            });
            mergedBars.push(evs);
          } else ok = false;
        }
        if (ok) {
          perBar = mergedBars;
          if (!chords.some(function (c) { return c.length; })) chords = lh.map(function (b) { return b.chords; });
        } else {
          lowParts = lh.map(function (b) { return b.events; });
        }
      }

      var all = [];
      perBar.forEach(function (e) { all = all.concat(e); });
      var any = all.some(function (ev) { return ev.notes.length; });
      var lowAny = false;
      if (lowParts) lowParts.forEach(function (e) { if (!isRestOnly(e)) lowAny = true; });
      if (!any && !lowAny) return;   // empty track
      var rg = rangeOf(all);
      var clef;
      if (drum) clef = "treble";
      else if (multi && !lowParts) clef = "grand";
      else if (multi && lowParts) clef = "treble";
      else clef = clefFor(inst, rg.lo, rg.hi, inst === "piano");
      if (inst === "piano" && multi && !lowParts) clef = "grand";
      var part = {
        name: name, instrument: inst, program: cls.program, clef: clef, tuning: tuning, strings: N, octave: fretted ? -12 : 0,
        tab: hasTab, bars: perBar, chords: chords, trackIndex: ti
      };
      if (any || !lowAny) parts.push(part);
      if (lowParts && lowAny) {
        parts.push({
          name: name + " LH", instrument: inst === "drums" ? "other" : inst, program: cls.program, clef: "bass", tuning: null, strings: 0, octave: 0,
          tab: false, bars: lowParts, chords: [], trackIndex: ti
        });
      }
    });

    // pickup
    var pickup = 0;
    if (MB[0].isAnacrusis && parts.length) {
      var p0 = parts.filter(function (p) { return p.instrument !== "drums"; })[0] || parts[0];
      var s0 = sumOf(p0.bars[0]);
      if (s0 > 0.01 && s0 < barLens[0] - 0.02) pickup = round6(s0);
    }
    var order = computeOrder(dirBars, warnings);
    var swing = false;
    try { swing = MB[0].tripletFeel === 2; } catch (e) {}
    var desc = {
      title: clean(sc.title) || clean(baseName(fileName)) || "Untitled",
      source: "", time0: timeOf[0], tempo: firstTempo, key0: keyNames[0], swing: swing, pickup: pickup, order: order,
      bars: bars, barLens: barLens, parts: parts
    };
    return desc;
  }

  function readAlphaTab(bytes, name, kind, warnings) {
    return loadLib().then(function (at) {
      var settings;
      try {
        settings = new at.Settings();
        if (settings.core) { settings.core.useWorkers = false; settings.core.enableLazyLoading = false; settings.core.fontDirectory = null; }
      } catch (e) { settings = undefined; }
      try { if (at.Logger && at.LogLevel) at.Logger.logLevel = at.LogLevel.None; } catch (e) {}
      var sc;
      try {
        sc = at.importer.ScoreLoader.loadScoreFromBytes(bytes, settings);
      } catch (e) {
        var msg = String((e && e.message) || e || "");
        if ((at.importer.UnsupportedFormatError && e instanceof at.importer.UnsupportedFormatError) || /No compatible importer/i.test(msg))
          throw fail("Not a readable Guitar Pro, MusicXML or MIDI file");
        throw fail("Could not read this file" + (msg ? ": " + msg.replace(/\s+/g, " ").slice(0, 120) : ""));
      }
      var desc;
      try { desc = convertAlphaTab(sc, name, warnings); }
      catch (e) { if (e && e.paImport) throw e; throw fail("Could not read this file: " + String((e && e.message) || e).slice(0, 120)); }
      return desc;
    });
  }

  /* ================================================================ MIDI */
  function parseSMF(u8) {
    var p = 0, len = u8.length;
    function need(n) { if (p + n > len) throw fail("MIDI file is cut off"); }
    function u32() { need(4); var v = (u8[p] * 16777216) + (u8[p + 1] << 16) + (u8[p + 2] << 8) + u8[p + 3]; p += 4; return v; }
    function u16() { need(2); var v = (u8[p] << 8) | u8[p + 1]; p += 2; return v; }
    function tag() { need(4); var s = String.fromCharCode(u8[p], u8[p + 1], u8[p + 2], u8[p + 3]); p += 4; return s; }
    if (len < 14 || tag() !== "MThd") throw fail("Not a MIDI file");
    var hl = u32(), format = u16(), ntrk = u16(), div = u16();
    p = 8 + hl;
    if (div & 0x8000) throw fail("MIDI files with SMPTE timing are not supported");
    if (!div) throw fail("MIDI file has no time base");
    var out = { ppq: div, format: format, tracks: [], tempos: [], times: [], keys: [], markers: [] };
    var guard = 0;
    while (p + 8 <= len && out.tracks.length < Math.max(ntrk, 1) + 64 && guard++ < 4096) {
      var id = tag(), cl = u32(), end = Math.min(len, p + cl);
      if (id !== "MTrk") { p = end; continue; }
      var t = { name: "", notes: [], programs: [], channels: {}, endTick: 0 };
      var tick = 0, status = 0, active = {};
      var tIdx = out.tracks.length;
      while (p < end) {
        // delta
        var delta = 0, c, cnt = 0;
        do { if (p >= end) break; c = u8[p++]; delta = delta * 128 + (c & 0x7f); cnt++; } while ((c & 0x80) && cnt < 5);
        tick += delta;
        if (p >= end) break;
        var b = u8[p];
        if (b === 0xff) {
          p++; if (p >= end) break;
          var type = u8[p++], ml = 0; cnt = 0;
          do { if (p >= end) break; c = u8[p++]; ml = ml * 128 + (c & 0x7f); cnt++; } while ((c & 0x80) && cnt < 5);
          var dataEnd = Math.min(end, p + ml), text = "";
          if ((type >= 1 && type <= 7) || type === 3) {
            for (var q = p; q < dataEnd; q++) text += String.fromCharCode(u8[q]);
            try { text = decodeURIComponent(escape(text)); } catch (e) {}
            text = text.replace(/\0/g, "").trim();
          }
          if (type === 0x03 && !t.name) t.name = text;
          else if (type === 0x51 && ml >= 3) out.tempos.push({ tick: tick, us: (u8[p] << 16) | (u8[p + 1] << 8) | u8[p + 2] });
          else if (type === 0x58 && ml >= 2) out.times.push({ tick: tick, num: u8[p], den: Math.pow(2, u8[p + 1]) });
          else if (type === 0x59 && ml >= 2) out.keys.push({ tick: tick, sf: (u8[p] << 24) >> 24, mi: u8[p + 1] });
          else if (type === 0x06 && text) out.markers.push({ tick: tick, text: text });
          else if (type === 0x2f) { t.endTick = tick; p = dataEnd; break; }
          p = dataEnd;
          continue;
        }
        if (b === 0xf0 || b === 0xf7) {
          p++; var sl = 0; cnt = 0;
          do { if (p >= end) break; c = u8[p++]; sl = sl * 128 + (c & 0x7f); cnt++; } while ((c & 0x80) && cnt < 5);
          p = Math.min(end, p + sl);
          continue;
        }
        if (b & 0x80) { status = b; p++; }
        else if (!status) { p++; continue; }
        var hi = status & 0xf0, ch = status & 0x0f;
        if (hi === 0xc0 || hi === 0xd0) {
          var d1 = u8[p++];
          if (hi === 0xc0) { t.programs.push({ tick: tick, ch: ch, prog: d1 & 0x7f }); }
        } else if (hi >= 0x80 && hi <= 0xe0) {
          var n1 = u8[p++], n2 = u8[p++];
          if (hi === 0x90 && n2 > 0) {
            var key = ch * 128 + n1;
            (active[key] = active[key] || []).push({ ch: ch, note: n1, start: tick, vel: n2 });
          } else if (hi === 0x80 || hi === 0x90) {
            var k2 = ch * 128 + n1, st = active[k2];
            if (st && st.length) { var on = st.shift(); on.end = tick; t.notes.push(on); }
          }
        } else if (status >= 0xf1 && status <= 0xf6) {
          // system common: skip data bytes
          p += (status === 0xf2 ? 2 : status === 0xf3 || status === 0xf1 ? 1 : 0);
        } else { p++; }
        if (p > end) break;
      }
      for (var kk in active) active[kk].forEach(function (on) { on.end = Math.max(tick, on.start + 1); t.notes.push(on); });
      t.notes.forEach(function (n) { if (!(n.end > n.start)) n.end = n.start + 1; });
      t.endTick = Math.max(t.endTick, tick);
      out.tracks.push(t);
      p = end;
    }
    if (!out.tracks.length) throw fail("MIDI file has no tracks");
    return out;
  }

  function splitUnits(n, allowed) {
    var out = [];
    while (n > 0) {
      var took = 0;
      for (var i = 0; i < allowed.length; i++) if (allowed[i] <= n) { took = allowed[i]; break; }
      if (!took) took = 1;
      out.push(took); n -= took;
    }
    return out;
  }
  var ALLOW16 = [16, 12, 8, 6, 4, 3, 2, 1];
  var ALLOW3 = [12, 9, 6, 3, 2, 1];

  /* segs: [{ s, e, note, tieIn, tieOut }] in ticks from the bar start. Returns events for the bar. */
  function quantBar(segs, barTicks, ppq, drum, spellFn, octAdd) {
    var g16 = ppq / 4, g3 = ppq / 3;
    var gi = g16;
    if (!segs.length) return [{ d: round6(barTicks / ppq), notes: [] }];
    var u3 = barTicks / g3;
    if (Math.abs(u3 - Math.round(u3)) < 1e-6) {
      var e16 = 0, e3 = 0;
      segs.forEach(function (sg) {
        e16 += Math.abs(sg.s - Math.round(sg.s / g16) * g16);
        e3 += Math.abs(sg.s - Math.round(sg.s / g3) * g3);
        if (!drum) {
          e16 += 0.5 * Math.abs(sg.e - Math.round(sg.e / g16) * g16);
          e3 += 0.5 * Math.abs(sg.e - Math.round(sg.e / g3) * g3);
        }
      });
      if (e3 < e16 * 0.85 && e3 + 1e-9 < e16) gi = g3;
    }
    var allowed = gi === g3 ? ALLOW3 : ALLOW16;
    var U = Math.max(1, Math.round(barTicks / gi));
    var onsets = {}, keys = [];
    segs.forEach(function (sg) {
      var sq = Math.max(0, Math.min(U - 1, Math.round(sg.s / gi)));
      var eq = Math.max(sq + 1, Math.min(U, Math.round(sg.e / gi)));
      var o = onsets[sq];
      if (!o) { o = onsets[sq] = { s: sq, e: eq, segs: [] }; keys.push(sq); }
      o.e = Math.max(o.e, eq);
      o.segs.push(sg);
    });
    keys.sort(function (a, b) { return a - b; });
    var evs = [], t = 0, unitQ = gi / ppq;
    function pushRest(n) { splitUnits(n, allowed).forEach(function (u) { evs.push({ d: u * unitQ, notes: [] }); }); }
    for (var ki = 0; ki < keys.length; ki++) {
      var o = onsets[keys[ki]], nxt = ki + 1 < keys.length ? keys[ki + 1] : U;
      if (o.s > t) pushRest(o.s - t);
      var end;
      if (drum) end = nxt;
      else {
        end = Math.min(o.e, nxt);
        if (nxt - end > 0 && (nxt - end) * gi <= ppq / 4 + 1e-6) end = nxt;      // a gap of a 16th or less is not worth a rest
      }
      if (end <= o.s) end = o.s + 1;
      var total = end - o.s;
      var pieces = splitUnits(total, allowed);
      var tieOutAny = {};
      o.segs.forEach(function (sg) { if (sg.tieOut && !drum) tieOutAny[sg.note.note] = true; });
      var seen = {}, noteDefs = [];
      o.segs.sort(function (a, b) { return a.note.note - b.note.note; });
      o.segs.forEach(function (sg) {
        if (seen[sg.note.note]) return;
        seen[sg.note.note] = true;
        noteDefs.push(sg);
      });
      if (drum) {
        evs.push({ d: pieces[0] * unitQ, notes: noteDefs.map(function (sg) { return { drum: sg.note.note, pitch: "C4" }; }) });
        for (var pi = 1; pi < pieces.length; pi++) evs.push({ d: pieces[pi] * unitQ, notes: [] });
      } else {
        for (var pj = 0; pj < pieces.length; pj++) {
          var last = pj === pieces.length - 1;
          evs.push({
            d: pieces[pj] * unitQ,
            notes: noteDefs.map(function (sg) {
              var n = { pitch: spellFn(sg.note.note + octAdd) };
              if (!last || tieOutAny[sg.note.note]) n.tie = true;
              return n;
            })
          });
        }
      }
      t = end;
    }
    if (t < U) pushRest(U - t);
    return evs;
  }

  function convertMidi(u8, fileName, warnings) {
    var smf = parseSMF(u8), ppq = smf.ppq, k, i;
    // time signatures -> bars
    var times = smf.times.slice().sort(function (a, b) { return a.tick - b.tick; });
    function validTS(t) { return t && t.num > 0 && t.den > 0 && t.num <= 32 && t.den <= 64; }
    times = times.filter(validTS);
    var firstTS = times.length && times[0].tick <= ppq / 8 ? [times[0].num, times[0].den] : [4, 4];
    // note parts
    var cand = [];
    smf.tracks.forEach(function (t, ti) {
      var byCh = {};
      t.notes.forEach(function (n) { (byCh[n.ch] = byCh[n.ch] || []).push(n); });
      var chs = Object.keys(byCh).map(Number).sort(function (a, b) { return a - b; });
      chs.forEach(function (ch) {
        var notes = byCh[ch].filter(function (n) { return n.note >= 0 && n.note < 128; });
        if (!notes.length) return;
        var prog = 0, firstOn = Math.min.apply(null, notes.map(function (n) { return n.start; })), have = false;
        t.programs.forEach(function (pc) { if (pc.ch === ch && (!have || pc.tick <= firstOn)) { prog = pc.prog; have = true; } });
        var drum = ch === 9;
        var inst = drum ? "drums" : GM_INST(prog);
        var nm = t.name || (drum ? "Drums" : gmName(prog));
        var multiCh = chs.length > 1 && t.name;
        if (multiCh) nm = t.name + (drum ? " Drums" : " " + (ch + 1));
        cand.push({ track: ti, ch: ch, notes: notes, program: prog, instrument: inst, name: nm });
      });
    });
    if (!cand.length) throw fail("No notes found in this MIDI file");
    var endTick = 0;
    cand.forEach(function (c) { c.notes.forEach(function (n) { if (n.end > endTick) endTick = n.end; }); });

    // bars
    var barsInfo = [], t = 0, tsList = times.length ? times : [], cur = firstTS, ti2 = 0, MAXB = 3000;
    while (t < endTick && barsInfo.length < MAXB) {
      while (ti2 < tsList.length && tsList[ti2].tick <= t + ppq / 8) { cur = [tsList[ti2].num, tsList[ti2].den]; ti2++; }
      var bt = cur[0] * 4 / cur[1] * ppq;
      barsInfo.push({ start: t, len: bt, ts: cur });
      t += bt;
    }
    if (!barsInfo.length) barsInfo.push({ start: 0, len: firstTS[0] * 4 / firstTS[1] * ppq, ts: firstTS });
    if (t < endTick) warnings.push("File truncated after " + MAXB + " bars");
    var nb = barsInfo.length;
    var barLens = barsInfo.map(function (b) { return round6(b.len / ppq); });
    function barAt(tick) {
      for (var z = 0; z < nb; z++) if (tick < barsInfo[z].start + barsInfo[z].len - 1e-6) return z;
      return nb - 1;
    }
    function nearestBar(tick) {
      var z = barAt(tick);
      if (tick - barsInfo[z].start > barsInfo[z].len / 2 && z + 1 < nb) return z + 1;
      return z;
    }
    // keys
    var keys = smf.keys.slice().sort(function (a, b) { return a.tick - b.tick; });
    var key0 = "C", f0 = 0, fAt = [], bars = [];
    for (i = 0; i < nb; i++) {
      var bm = {};
      if (i > 0) {
        var pt = barsInfo[i - 1].ts, ct = barsInfo[i].ts;
        if (pt[0] !== ct[0] || pt[1] !== ct[1]) bm.time = ct.slice();
      }
      bars.push(bm);
      fAt.push(0);
    }
    if (keys.length) {
      f0 = Math.max(-7, Math.min(7, keys[0].sf)); key0 = keyName(f0, keys[0].mi === 1);
      var perBarKey = [];
      for (i = 0; i < nb; i++) perBarKey.push({ f: f0, name: key0 });
      for (k = 1; k < keys.length; k++) {
        var kb = nearestBar(keys[k].tick), kf = Math.max(-7, Math.min(7, keys[k].sf)), kn = keyName(kf, keys[k].mi === 1);
        for (i = kb; i < nb; i++) perBarKey[i] = { f: kf, name: kn };
      }
      for (i = 0; i < nb; i++) {
        fAt[i] = perBarKey[i].f;
        if (i > 0 && perBarKey[i].name !== perBarKey[i - 1].name) bars[i].key = perBarKey[i].name;
      }
    }
    // tempo
    var tempos = smf.tempos.slice().sort(function (a, b) { return a.tick - b.tick; }).filter(function (x) { return x.us > 0; });
    var tempo0 = tempos.length ? Math.round(60000000 / tempos[0].us) : null, curT = tempo0;
    for (k = 1; k < tempos.length; k++) {
      var bpm = Math.round(60000000 / tempos[k].us);
      var bi2 = nearestBar(tempos[k].tick);
      if (bi2 === 0) { tempo0 = bpm; curT = bpm; continue; }
      bars[bi2].tempo = bpm;
    }
    // drop tempo marks that repeat the previous value
    curT = tempo0;
    for (i = 1; i < nb; i++) { if (bars[i].tempo != null) { if (bars[i].tempo === curT) delete bars[i].tempo; else curT = bars[i].tempo; } }
    smf.markers.forEach(function (m) {
      var bi3 = nearestBar(m.tick);
      if (!bars[bi3].section) bars[bi3].section = m.text.slice(0, 40);
    });

    // parts
    var parts = [];
    cand.forEach(function (c) {
      var drum = c.instrument === "drums", fretted = c.instrument === "bass" || c.instrument === "guitar";
      var segsByBar = [];
      for (i = 0; i < nb; i++) segsByBar.push([]);
      c.notes.sort(function (a, b) { return a.start - b.start || a.note - b.note; });
      c.notes.forEach(function (n) {
        var s = n.start, e = Math.max(n.end, n.start + 1), bi = barAt(s), first = true, guard = 0;
        var snap = ppq / 8;
        if (bi + 1 < nb && barsInfo[bi + 1].start - s < snap && barsInfo[bi + 1].start - s > 0) { bi++; s = barsInfo[bi].start; }
        while (bi < nb && guard++ < 200) {
          var bs = barsInfo[bi].start, be = bs + barsInfo[bi].len;
          var over = e - be, tieOut = over > snap;
          var se = tieOut ? be : Math.min(e, be);
          if (se - s < 1) { if (!first) break; se = Math.min(be, s + 1); }
          segsByBar[bi].push({ s: s - bs, e: se - bs, note: n, tieIn: !first, tieOut: tieOut });
          if (!tieOut || drum) break;
          s = be; bi++; first = false;
        }
      });
      var bars2 = [], chordsNone = [];
      for (i = 0; i < nb; i++) {
        var fifths = fAt[i];
        bars2.push(quantBar(segsByBar[i], barsInfo[i].len, ppq, drum, function (m) { return spell(m, fifths); }, fretted ? 12 : 0));
      }
      var all = []; bars2.forEach(function (e) { all = all.concat(e); });
      var rg = rangeOf(all), part;
      if (drum) part = { name: c.name, instrument: "drums", program: -1, clef: "treble", tuning: null, strings: 0, octave: 0, bars: bars2, chords: [] };
      else {
        var lowest = rg.lo != null ? rg.lo - (fretted ? 12 : 0) : null;
        part = {
          name: c.name, instrument: c.instrument, program: c.program,
          clef: clefFor(c.instrument, rg.lo, rg.hi, c.instrument === "piano"),
          tuning: fretted ? stdTuning(c.instrument, lowest) : null, strings: 0, octave: fretted ? -12 : 0, bars: bars2, chords: [], tab: fretted
        };
        if (fretted) { part.strings = part.tuning.length; assignTab(part); }
      }
      parts.push(part);
    });
    var title = "";
    var t0 = smf.tracks[0];
    if (t0 && t0.name && !t0.notes.length) title = t0.name;
    if (!title) title = baseName(fileName);
    return {
      title: title || "Untitled", source: "", time0: firstTS, tempo: tempo0, key0: key0, swing: false, pickup: 0, order: null,
      bars: bars, barLens: barLens, parts: parts
    };
  }

  /* ================================================================ read */
  function toBytes(input) {
    if (input instanceof Uint8Array) return Promise.resolve(input);
    if (input instanceof ArrayBuffer) return Promise.resolve(new Uint8Array(input));
    if (input && input.buffer instanceof ArrayBuffer && typeof input.byteLength === "number") return Promise.resolve(new Uint8Array(input.buffer, input.byteOffset, input.byteLength));
    if (input && typeof input.arrayBuffer === "function") return input.arrayBuffer().then(function (b) { return new Uint8Array(b); });
    if (input && typeof FileReader !== "undefined" && typeof input.size === "number") {
      return new Promise(function (res, rej) {
        var fr = new FileReader();
        fr.onload = function () { res(new Uint8Array(fr.result)); };
        fr.onerror = function () { rej(fail("Could not read the file")); };
        fr.readAsArrayBuffer(input);
      });
    }
    return Promise.reject(fail("Nothing to import"));
  }

  function read(input, name) {
    var nm = name || (input && input.name) || "";
    var warnings = [];
    return toBytes(input).then(function (bytes) {
      if (!bytes || bytes.length < 8) throw fail("The file is empty");
      if (bytes.length > 40 * 1024 * 1024) throw fail("The file is too large");
      var isMidi = bytes[0] === 0x4d && bytes[1] === 0x54 && bytes[2] === 0x68 && bytes[3] === 0x64;
      var ext = extOf(nm);
      if (isMidi || ext === "mid" || ext === "midi") {
        if (!isMidi) throw fail("Not a MIDI file");
        var d;
        try { d = convertMidi(bytes, nm, warnings); }
        catch (e) { if (e && e.paImport) throw e; throw fail("Could not read this MIDI file"); }
        d.source = "midi";
        return d;
      }
      return readAlphaTab(bytes, nm, ext, warnings).then(function (d) {
        d.source = ext === "xml" || ext === "musicxml" || ext === "mxl" ? "musicxml" : "guitarpro";
        // sniff: a zip with container.xml or an xml text is musicxml whatever the extension says
        if (bytes[0] === 0x3c) d.source = "musicxml";
        return d;
      });
    }).then(function (desc) {
      var score;
      try { score = assemble(desc, warnings); }
      catch (e) { if (e && e.paImport) throw e; throw fail("Could not read this file: " + String((e && e.message) || e).slice(0, 120)); }
      return { score: score, parts: partList(score), warnings: warnings };
    });
  }

  window.PAImport = { accepts: accepts, read: read, setMain: setMain };
})();
