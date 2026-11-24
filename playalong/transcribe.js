/* PA.transcribe: reading photographed music with Claude (window.PA.transcribe, window.PA.img). Needs PA.score and MusicAI (shared/ai.js).
   transcribe(blobs, { hint, signal, onProgress(label) }) -> Promise<{ score, flags }>
     One streamed request per page (whole page + close-ups of its halves, save_transcription forced), then one fix_bars request per page
     that has bars which don't add up. Answers go through PA.score.normalizePage / mergePages / finishScore.
   Request schema (v2): per bar box [x,y,w,h] (fractions of IMAGE 1), section, tempo, time, key, per event lyric, per note dead, and
   optional parts (extra staves, bar-aligned by bar number).
   PA.img: decodeBlob, srcSize, drawRegion, canvasBlob, prepImage, makeThumb (the photo helpers the add sheet uses). */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score;

  /* ================================================================ images */
  function AbortErr() { var e = new Error("Cancelled"); e.name = "AbortError"; return e; }
  function decodeImg(blob) {
    return new Promise(function (res, rej) {
      var u = URL.createObjectURL(blob), im = new Image();
      im.onload = function () { URL.revokeObjectURL(u); res(im); };
      im.onerror = function () { URL.revokeObjectURL(u); rej(new Error("That image could not be opened.")); };
      im.src = u;
    });
  }
  function decodeBlob(blob) {
    if (window.createImageBitmap) {
      return createImageBitmap(blob, { imageOrientation: "from-image" }).catch(function () { return decodeImg(blob); });
    }
    return decodeImg(blob);
  }
  function srcSize(im) { return { w: im.naturalWidth || im.videoWidth || im.width, h: im.naturalHeight || im.videoHeight || im.height }; }
  function drawRegion(im, sx, sy, sw, sh, max) {
    var k = Math.min(1, max / Math.max(sw, sh));
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(sw * k)); c.height = Math.max(1, Math.round(sh * k));
    var g = c.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(im, sx, sy, sw, sh, 0, 0, c.width, c.height);
    return c;
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
  function makeThumb(blob) {
    return decodeBlob(blob).then(function (im) {
      var s = srcSize(im), c = drawRegion(im, 0, 0, s.w, s.h, 200);
      if (im.close) try { im.close(); } catch (e) {}
      return canvasBlob(c, 0.7);
    });
  }
  PA.img = { decodeBlob: decodeBlob, srcSize: srcSize, drawRegion: drawRegion, canvasBlob: canvasBlob, prepImage: prepImage, makeThumb: makeThumb };

  function canvasB64(c) { return c.toDataURL("image/jpeg", 0.85).split(",")[1]; }
  function imgBlock(c) { return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: canvasB64(c) } }; }
  /* The full page, then close-ups of its top and bottom (overlapping) halves. */
  function imageBlocks(blob) {
    return decodeBlob(blob).then(function (im) {
      var s = srcSize(im), w = s.w, h = s.h, long = h >= w;
      var blocks = [imgBlock(drawRegion(im, 0, 0, w, h, 1568))];
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

  /* ================================================================ the request */
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
    "- Dead / muted notes (an x on the tab or an x notehead): set dead: true on the note.",
    "- Chord symbols: give them where they appear, with their beat position in the bar.",
    "- Repeats, endings, D.S., D.C., codas: mark them on the bars and also give \"order\", the bar numbers in the order they are played. Leave order null if the music is simply played straight through.",
    "- Changes: when a bar starts a new time signature, key or tempo, give it on that bar as \"time\", \"key\", \"tempo\" (quarter-note bpm). Only on the bar where it changes.",
    "- Sections: rehearsal marks and section labels (A, B, Verse, Chorus, Bridge, Intro) go in \"section\" on the bar where they appear.",
    "- Lyrics: if words are printed under the staff, give the syllable under each note as \"lyric\" on that event (use a trailing \"-\" for a syllable that continues into the next).",
    "- Bar boxes: for every bar give \"box\" = [x, y, w, h], the bar's outline (its staff and tab staff, with the chord symbols above it) as fractions 0 to 1 of the width and height of IMAGE 1, the whole page. The coordinates refer to image 1 only, never to the close-ups. x and y are the top-left corner.",
    "- More than one staff: if the page has staves for more than one instrument (for example a melody over a bass line, or piano and vocal), put the staff of the instrument the musician named in \"measures\" (if none was named, the staff the most notes sit on for bass or guitar, otherwise the lowest-numbered staff). Put every other staff in \"parts\" with the same bar numbers. Drum staves are a part with instrument \"drums\", and each drum note gives \"drum\" as the General MIDI percussion note number (kick 36, snare 38, closed hat 42, open hat 46, crash 49, ride 51, toms 41 43 45 47 48 50) instead of a pitch.",
    "- If something truly can't be read, make your best reading and say which bar in \"uncertain\"."
  ].join("\n");

  var NOTE_SCHEMA = { type: "object", required: [], properties: {
    pitch: { type: "string" }, string: { type: ["integer", "null"] }, fret: { type: "integer" }, tie: { type: "boolean" }, dead: { type: "boolean" },
    drum: { type: "integer", description: "General MIDI percussion note, drum staves only" } } };
  var EVENT_SCHEMA = { type: "object", required: ["d", "notes"], properties: { d: { type: "string" }, notes: { type: "array", items: NOTE_SCHEMA }, lyric: { type: "string" } } };
  var CORE_PROPS = {
    n: { type: "integer" },
    chords: { type: "array", items: { type: "object", required: ["at", "name"], properties: { at: { type: "string", description: "beat offset in quarter beats from bar start, fraction string" }, name: { type: "string" } } } },
    repeatStart: { type: "boolean" }, repeatEnd: { type: "integer", description: "times played in total, e.g. 2" }, ending: { type: "integer" },
    events: { type: "array", items: EVENT_SCHEMA }
  };
  function extend(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }
  var CORE_MEASURE = { type: "object", required: ["n", "events"], properties: CORE_PROPS };
  var MEASURE_SCHEMA = { type: "object", required: ["n", "events", "box"], properties: extend(CORE_PROPS, {
    box: { type: "array", items: { type: "number" }, minItems: 4, maxItems: 4, description: "[x, y, w, h] of this bar on IMAGE 1 (the whole page), fractions 0..1" },
    section: { type: "string" }, tempo: { type: "number" }, time: { type: "string" }, key: { type: "string" }
  }) };
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
        parts: { type: "array", description: "Other staves on the page, bar-aligned with measures by bar number", items: { type: "object", required: ["name", "instrument", "measures"], properties: {
          name: { type: "string" }, instrument: { type: "string", enum: ["bass", "guitar", "piano", "drums", "other"] },
          clef: { type: "string", enum: ["treble", "bass", "treble8vb", "grand"] }, tuning: { type: ["array", "null"], items: { type: "string" } },
          measures: { type: "array", items: { type: "object", required: ["n", "events"], properties: { n: { type: "integer" }, events: { type: "array", items: EVENT_SCHEMA } } } }
        } } },
        order: { type: ["array", "null"], items: { type: "integer" } },
        uncertain: { type: "string" }
      }
    }
  };
  var FIX_TOOL = {
    name: "fix_bars",
    description: "Save the corrected bars.",
    input_schema: { type: "object", required: ["measures"], properties: { measures: { type: "array", items: CORE_MEASURE } } }
  };

  function abortable(promise, signal) {
    if (!signal) return promise;
    return new Promise(function (res, rej) {
      if (signal.aborted) return rej(AbortErr());
      var on = function () { rej(AbortErr()); };
      signal.addEventListener("abort", on);
      promise.then(function (v) { signal.removeEventListener("abort", on); res(v); }, function (e) { signal.removeEventListener("abort", on); rej(e); });
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
    var t = "Image 1 is the whole page; images 2 and 3 are close-ups of its top and bottom halves (they overlap in the middle, so do not count the overlap twice). Bar boxes are fractions of image 1 only. Transcribe every bar on this page and call save_transcription.";
    if (hint && hint !== "auto") t += " The instrument is " + hint + ".";
    if (k > 0 && sofar) {
      t += " This page continues the same piece. So far: instrument " + sofar.instrument + ", tuning " + (sofar.tuning ? sofar.tuning.map(SC.midiName).join(" ") : "none given") + ", key " + sofar.key + ", time " + sofar.time[0] + "/" + sofar.time[1] + ", last bar number " + sofar.last + ". Continue numbering from " + (sofar.last + 1) + " and don't repeat bars already read.";
      if (sofar.parts && sofar.parts.length) t += " Other staves so far: " + sofar.parts.join(", ") + " (use the same names).";
    }
    if (n > 1) t += " (Page " + (k + 1) + " of " + n + ".)";
    return t;
  }
  function clonePage(p) { return JSON.parse(JSON.stringify(p)); }

  /* Reads every page in order. Returns { score, flags }. Throws on the first page that cannot be read. */
  function transcribe(blobs, opt) {
    opt = opt || {};
    var pages = [], imgCache = [];
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
            var merged = SC.mergePages(pages.map(clonePage));
            sofar = { instrument: merged.instrument, tuning: merged.tuning, key: merged.key, time: merged.time, last: merged.measures.length ? merged.measures[merged.measures.length - 1].n : 0, parts: (merged.parts || []).map(function (p) { return p.name; }) };
          }
          return abortable(window.MusicAI.call({
            system: SYSTEM,
            messages: [{ role: "user", content: blocks.concat([{ type: "text", text: pageText(k, n, opt.hint, sofar) }]) }],
            tools: [TOOL], tool_choice: { type: "tool", name: "save_transcription" },
            max_tokens: 48000, effort: "high", signal: opt.signal, stream: true,
            onDelta: function (part) {
              var m, last = 0, re = /"n"\s*:\s*(\d+)/g;
              while ((m = re.exec(part))) last = +m[1];
              if (last && opt.onProgress) opt.onProgress("Reading " + (n > 1 ? "page " + (k + 1) + " of " + n + " · " : "") + "bar " + last + "…");
            }
          }), opt.signal);
        }).then(function (res) {
          check();
          var inp = toolInput(res, "save_transcription", n > 1 ? "page " + (k + 1) : "that page");
          var pg = SC.normalizePage(inp, { hint: opt.hint });
          if (!pg.measures.length || (pg.measures.length === 1 && pg.measures[0].empty)) throw new Error("No music found on " + (n > 1 ? "page " + (k + 1) : "that page") + ".");
          pages.push(pg);
        });
      });
    });
    return chain.then(function () {
      var score = SC.mergePages(pages);
      var flags = SC.finishScore(score);
      return fixPass(score, flags, imgCache, opt).then(function () { return { score: score, flags: flags }; });
    });
  }

  function fracOf(x) {
    for (var den = 1; den <= 12; den++) { var nn = Math.round(x * den); if (Math.abs(nn / den - x) < 0.002) return den === 1 ? String(nn) : nn + "/" + den; }
    return String(Math.round(x * 1000) / 1000);
  }
  function rawBar(b) {
    var o = { n: b.n, events: b.events.map(function (e) {
      return { d: fracOf(e.d), notes: e.notes.map(function (n) {
        if (n.drum != null) return { drum: n.drum };
        var r = { pitch: n.pitch }; if (n.s != null) r.string = n.s; if (n.f != null) r.fret = n.f; if (n.tie) r.tie = true; if (n.dead) r.dead = true; return r;
      }) };
    }) };
    if (b.chords.length) o.chords = b.chords.map(function (c) { return { at: fracOf(c.at), name: c.name }; });
    if (b.repeatStart) o.repeatStart = true;
    if (b.repeatEnd) o.repeatEnd = b.repeatEnd;
    if (b.ending) o.ending = b.ending;
    return o;
  }

  /* One more request per page that has bars whose durations don't add up. The bars keep their boxes, sections and changes. */
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
        var mt = SC.meta(score);
        var lines = idxs.map(function (i) {
          var b = score.measures[i], want = SC.expectedLens(score, i, mt)[0];
          return "bar " + b.n + " adds to " + String(Math.round(b.sum * 1000) / 1000) + " beats, should be " + String(Math.round(want * 1000) / 1000);
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
            var at = -1, nn = Math.round(+(m && m.n));
            idxs.forEach(function (i) { if (score.measures[i].n === nn) at = i; });
            if (at < 0) return;
            var nb = SC.normalizeBar(m, 0, mt[at].len).bar, old = score.measures[at];
            var f2 = { tabFixed: 0, tabGuessed: 0, tabNone: 0 };
            if (!SC.isDrumMain(score)) SC.fixTabLists([nb.events], score.instrument, score.tuning, SC.transOf(score), f2);
            var ok = SC.expectedLens(score, at, mt).some(function (L) { return Math.abs(SC.barSum(nb) - L) < 0.02; });
            if (ok && !nb.empty) {
              nb.pg = old.pg;
              ["box", "section", "time", "key", "tempo"].forEach(function (f) { if (old[f] != null) nb[f] = old[f]; });
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
      SC.markTies(score);
      var bad = SC.checkBars(score);
      flags.off = bad.map(function (i) { return score.measures[i].n; });
    });
  }

  PA.transcribe = transcribe;
  PA.transcribeInfo = { SYSTEM: SYSTEM, TOOL: TOOL, FIX_TOOL: FIX_TOOL, pageText: pageText };
})();
