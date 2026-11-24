/* PA.abc / PA.views.notation / PA.views.score: standard notation with abcjs (the copy Barline ships), every visible part as its own staff,
   and the Score view: the same notation with a tab staff under the main part, drawn from the piece's own fingering (s/f of each note).
   Needs views.js, PA.score, PA.engine and the shared state PA.S.

   How the tab lines up: abcjs's `tablature` option reserves a staff under the main part's notation and lays its numbers out at the right
   x. We keep that space, take away abcjs's six lines and numbers, and draw our own N string lines and our own fret numbers
   (from each note's s and f) at the noteheads' x positions, so a 4 or 5 string bass is right too.

   PA.abc.build(sc, o) -> { abc, staves:[{part, clef, ...}], seqs:[[ [r, j] ...] per staff] }   abc text only, no DOM */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score, EN = PA.engine, V = PA.views;
  var S = PA.S = PA.S || {};
  var el = V.el, sv = V.sv;

  var ABCCLEF = { treble: "treble", bass: "bass", treble8vb: "treble-8" };
  /* GM percussion -> a place on a percussion staff, and whether it is drawn as an x */
  var DRUM_Y = { 35: "F", 36: "F", 37: "c", 38: "c", 39: "c", 40: "c", 41: "A", 43: "A", 45: "G", 47: "d", 48: "e", 50: "e", 42: "g", 44: "D", 46: "g", 49: "a", 57: "a", 55: "a", 52: "a", 51: "f", 59: "f", 53: "f", 54: "g", 56: "f" };
  var DRUM_X = { 37: 1, 39: 1, 42: 1, 44: 1, 46: 1, 49: 1, 52: 1, 53: 1, 54: 1, 55: 1, 56: 1, 57: 1, 51: 1, 59: 1 };
  function isTrip(d) { var x = d * 12; return Math.abs(x - Math.round(x)) < 0.02 && Math.round(x) % 3 !== 0; }

  /* ================================================================ abc text */
  function build(sc, o) {
    var R = o.R, mt = SC.meta(sc), plist = o.parts, per = o.per || 0, showCh = o.chords !== false, showSec = o.sections !== false;
    var staves = [];
    plist.forEach(function (p) {
      if (p.drum) staves.push({ part: p, clef: "perc", drum: true });
      else if (p.clef === "grand") {
        staves.push({ part: p, clef: "treble", filter: function (n) { return SC.noteMidi(n) >= 60; }, grand: 1 });
        staves.push({ part: p, clef: "bass", filter: function (n) { return SC.noteMidi(n) < 60; }, grand: 2 });
      } else staves.push({ part: p, clef: ABCCLEF[p.clef] || "treble" });
    });
    var single = staves.length === 1;
    var m0 = mt[R[0].bi];
    var key0 = SC.parseKey(m0.key);

    /* one staff's bars as items { sep, pre }: sep is the barline before the bar, pre the rest (ending bracket, inline changes, notes) */
    function staffItems(st, si) {
      var seq = [], items = [], first = si === 0, prevM = null;
      var filter = st.filter || function () { return true; };
      R.forEach(function (rr, r) {
        var bi = rr.bi, b = sc.measures[bi], m = mt[bi], plain = rr.plain;
        var prevR = R[r - 1], prevB = prevR && sc.measures[prevR.bi];
        var rs = !plain && b.repeatStart, prevRe = prevR && !prevR.plain && prevB.repeatEnd;
        var sep;
        if (r === 0) sep = rs ? "|: " : "";
        else if (prevRe && rs) sep = " :|: ";
        else if (prevRe) sep = " :| ";
        else if (rs) sep = " |: ";
        else if (prevR && !prevR.plain && prevB.ending && !(!plain && b.ending)) sep = " || ";
        else sep = " | ";
        var endTxt = "";
        if (!plain && b.ending && (!prevR || prevR.plain || prevB.ending !== b.ending)) endTxt = "[" + b.ending + " ";
        if (r > 0 && endTxt) sep = sep.replace(/\s+$/, "") + " ";
        var inline = "";
        if (prevM) {
          if (m.time[0] !== prevM.time[0] || m.time[1] !== prevM.time[1]) inline += "[M:" + m.time[0] + "/" + m.time[1] + "]";
          if (!st.drum && m.key !== prevM.key) inline += "[K:" + SC.parseKey(m.key).name + "]";
          if (first && !st.grand && m.tempo !== prevM.tempo) inline += "[Q:1/4=" + Math.round(m.tempo) + "]";
        }
        prevM = m;
        var evs = st.part.events(bi) || [{ d: m.len, notes: [] }];
        items.push({ sep: sep, pre: endTxt + inline + barTokens(st, evs, b, m, r, seq, filter, first && (!st.grand || st.grand === 1), plain) });
      });
      return { items: items, seq: seq };
    }
    /* bars r0..r1 as one line. At a line break the barline moves to the end of the previous line and a start repeat opens the new one. */
    function lineText(items, r0, r1) {
      var out = "";
      for (var r = r0; r <= r1; r++) {
        var sep = items[r].sep;
        if (r === r0 && r > 0) { var m = /^\s*(:?\|\|?)(:?)\s*$/.exec(sep); sep = m && m[2] ? "|: " : ""; }
        out += sep + items[r].pre;
      }
      if (r1 + 1 < items.length) { var m2 = /^\s*(:?\|\|?)(:?)\s*$/.exec(items[r1 + 1].sep); out += " " + (m2 ? m2[1] : "|"); }
      return out;
    }
    function endText() { var lastR = R[R.length - 1], lastB = sc.measures[lastR.bi]; return (!lastR.plain && lastB.repeatEnd) ? " :|" : " |]"; }

    function barTokens(st, evs, bar, m, r, seq, filter, withChords, plain) {
      var ks = SC.keyAccs(SC.parseKey(m.key).n), cur = {};
      var beatLen = (m.time[1] === 8 && m.time[0] % 3 === 0 && m.time[0] >= 6) ? 1.5 : 1;
      function accOf(letter, oct) { var k = letter + oct; return cur[k] != null ? cur[k] : (ks[letter] || 0); }
      var chordAt = (withChords && showCh) ? bar.chords.slice() : [], off = 0, res = [], j, i;
      for (j = 0; j < evs.length; j++) {
        var ev = evs[j], inTrip = isTrip(ev.d), tok = "";
        var notes = ev.notes.filter(function (n) { return st.drum ? n.drum != null : (n.drum == null && filter(n)); });
        var units = inTrip ? Math.round(ev.d * 6) : Math.max(1, Math.round(ev.d * 4));
        var pre = "";
        if (withChords && showSec && bar.section && j === 0) pre += '"^' + bar.section.replace(/"/g, "") + '"';
        while (chordAt.length && chordAt[0].at <= off + 0.02) pre += '"' + chordAt.shift().name.replace(/"/g, "") + '"';
        if (notes.length === 0) tok = "z" + units;
        else if (st.drum) {
          var ys = notes.map(function (n) { return DRUM_Y[n.drum] || "c"; });
          if (ys.length === 1) tok = (DRUM_X[notes[0].drum] ? "!style=x!" : "") + ys[0] + units;
          else tok = "[" + ys.join("") + "]" + units;
        } else {
          var parts = notes.map(function (n) {
            var p = SC.parsePitch(n.pitch), s = "";
            if (!p) return "";
            var want = p.acc, have = accOf(p.letter, p.oct);
            if (want !== have) { s += want === 2 ? "^^" : want === 1 ? "^" : want === 0 ? "=" : want === -1 ? "_" : "__"; cur[p.letter + p.oct] = want; }
            s += p.oct >= 5 ? p.letter.toLowerCase() + new Array(p.oct - 5 + 1).join("'") : p.letter + new Array(4 - p.oct + 1).join(",");
            return { s: s, tie: !!n.tie, dead: !!n.dead };
          }).filter(Boolean);
          if (parts.length === 1) tok = (parts[0].dead ? "!style=x!" : "") + parts[0].s + units + (parts[0].tie ? "-" : "");
          else tok = "[" + parts.map(function (q) { return q.s + (q.tie ? "-" : ""); }).join("") + "]" + units;
        }
        res.push({ pre: pre, tok: tok, inTrip: inTrip, d: ev.d, off: off, rest: notes.length === 0, j: j });
        off += ev.d;
      }
      if (chordAt.length && res.length) res[res.length - 1].pre += chordAt.map(function (c) { return '"' + c.name.replace(/"/g, "") + '"'; }).join("");
      for (i = 0; i < res.length; i++) {
        if (!res[i].inTrip) continue;
        var sum = 0, k = i;
        while (k < res.length && res[k].inTrip) { sum += res[k].d; k++; if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) break; }
        if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) { res[i].open = "(3:2:" + (k - i); i = k - 1; }
        else { for (; i < k; i++) res[i].approx = true; i = k - 1; }
      }
      var out = "";
      for (i = 0; i < res.length; i++) {
        var rr = res[i];
        out += rr.pre + (rr.open || "") + rr.tok;
        var nx = res[i + 1];
        var beamable = nx && !rr.rest && !nx.rest && rr.d < 1 - 0.01 && nx.d < 1 - 0.01 && Math.floor((rr.off + 1e-6) / beatLen) === Math.floor((nx.off + 1e-6) / beatLen);
        if (nx && !beamable) out += " ";
        seq.push([r, rr.j]);
      }
      return out.trim();
    }

    var head = "X:1\nT:" + String(sc.title || "Untitled").replace(/[\n\r]/g, " ") + "\nM:" + m0.time[0] + "/" + m0.time[1] + "\nL:1/16\nQ:1/4=" + Math.round(o.bpm || m0.tempo || 100) + "\n";
    var abc, seqs = [];
    try {
      var all = staves.map(function (st, i) { return staffItems(st, i); });
      all.forEach(function (x) { seqs.push(x.seq); });
      var n = R.length, systems = [];
      if (per > 0) for (var r0 = 0; r0 < n; r0 += per) systems.push([r0, Math.min(n, r0 + per) - 1]); else systems.push([0, n - 1]);
      if (single) {
        abc = head + "K:" + key0.name + " clef=" + staves[0].clef + "\n" + systems.map(function (sy, k) { return lineText(all[0].items, sy[0], sy[1]) + (k === systems.length - 1 ? endText() : ""); }).join("\n") + "\n";
      } else {
        var score = [];
        staves.forEach(function (st, i) {
          if (st.grand === 1) score.push("{" + (i + 1) + " | " + (i + 2) + "}");
          else if (st.grand === 2) return;
          else score.push(String(i + 1));
        });
        abc = head + "%%score " + score.join(" ") + "\nK:" + key0.name + "\n";
        systems.forEach(function (sy, k) {
          staves.forEach(function (st, i) {
            var def = "";
            if (k === 0) {
              var nm = st.grand === 2 ? "" : ' nm="' + SC.partName(st.part).replace(/"/g, "") + '" snm=" "';
              def = " clef=" + st.clef + nm;
            }
            abc += "V:" + (i + 1) + def + "\n" + (k === 0 && st.drum ? "[K:C]" : "") + lineText(all[i].items, sy[0], sy[1]) + (k === systems.length - 1 ? endText() : "") + "\n";
          });
        });
      }
    } catch (e) { return null; }
    return { abc: abc, staves: staves, seqs: seqs, single: single };
  }

  /* ================================================================ abcjs */
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
  function num(re, c) { var m = re.exec(c); return m ? +m[1] : -1; }
  function bb(e) { try { return e.getBBox(); } catch (x) { return null; } }
  function union(a, b) {
    if (!a) return b; if (!b) return a;
    var x0 = Math.min(a.left, b.left), y0 = Math.min(a.top, b.top), x1 = Math.max(a.right, b.right), y1 = Math.max(a.bottom, b.bottom);
    return { left: x0, top: y0, right: x1, bottom: y1 };
  }

  function visibleParts(sc) {
    var mix = (S.prefs.mix) || {}, all = SC.parts(sc), vis = all.filter(function (p) { return !(mix[p.key] && mix[p.key].hide); });
    if (!vis.length) vis = [all[0]];
    // the main part first, the rest in order
    return vis;
  }
  V.visibleParts = visibleParts;

  function makeView(host, kind) {
    var sc = S.sc, tl = S.tl, R = S.R, d = V.D(), Z = (d.zoom || 100) / 100, horiz = d.layout === "horizontal";
    var v = V.frame(host, kind, horiz);
    var out = el("div", "notehost"); v.content(out);
    var hostW = Math.floor(host.clientWidth) || 340, W = hostW - 16;
    var per = (W / Z) < 560 ? 2 : (W / Z) < 1000 ? 3 : 4;
    var parts = visibleParts(sc), main = parts[0].isMain ? parts[0] : null;
    var wantTab = kind === "score" && main && main.strings > 0 && d.tab !== false;
    var NV = { els: {}, tabEls: {}, rects: [], curKey: "", curEls: [], rendered: false, notes: kind };
    v.NV = NV; v.rendered = false;
    var built = build(sc, { R: R.list, parts: parts, per: horiz ? 0 : per, chords: d.chords !== false, bpm: tl.meta[R.list[0].bi].tempo });
    if (!built) { out.remove(); host.appendChild(el("p", "msg", "Notation isn't available for this one")); v.cursor = function () {}; v.barRect = function () { return null; }; return v; }
    v.ready = loadAbcjs().then(function (A) {
      if (S.view !== kind || S.vobj !== v) return;
      var estW = Math.max(300, R.list.reduce(function (a, rr) { return a + 46 + 27 * sc.measures[rr.bi].events.length; }, 110));
      var extra = (d.counts ? 1 : 0) + (d.lyrics ? 1 : 0);
      var opts = {
        add_classes: true, paddingleft: 0, paddingright: 0, paddingtop: 6, paddingbottom: 6 + extra * 12,
        foregroundColor: "currentColor", selectionColor: "currentColor", staffsep: 50 + extra * 14
      };
      // (abcjs's responsive:"resize" mode drops the tablature staff, so the size is set here: svg width = staffwidth * scale)
      opts.scale = Z;
      opts.staffwidth = horiz ? estW : Math.max(200, W / Z);
      if (wantTab) opts.tablature = [{ instrument: "guitar", label: "" }];
      try { A.renderAbc(out, built.abc, opts); }
      catch (e) {
        if (window.console) console.info("Play Along: abcjs without tab: " + e);
        if (wantTab) { try { out.innerHTML = ""; delete opts.tablature; wantTab = false; A.renderAbc(out, built.abc, opts); } catch (e2) { out.innerHTML = ""; out.appendChild(el("p", "msg", "Notation isn't available for this one")); return; } }
        else { out.innerHTML = ""; out.appendChild(el("p", "msg", "Notation isn't available for this one")); return; }
      }
      mapNotes(v, out, built, parts);
      if (wantTab) drawTab(v, out, sc, main);
      overlays(v, out, built, parts, wantTab);
      measure(v, out, built);
      NV.rendered = true; v.rendered = true;
      v.paintLoop();
      if (V.hooks.onReady) V.hooks.onReady(v);
    }).catch(function () {
      out.innerHTML = ""; out.appendChild(el("p", "msg", "Notation needs to load once while online"));
    });

    function mapNotes(v, out) {
      var all = Array.prototype.slice.call(out.querySelectorAll(".abcjs-note:not(.abcjs-tabNumber), .abcjs-rest")).map(function (e) {
        var c = e.getAttribute("class") || "";
        return { e: e, v: num(/abcjs-v(\d+)/, c), m: num(/abcjs-mm(\d+)/, c), n: num(/abcjs-n(\d+)/, c), l: num(/abcjs-l(\d+)/, c) };
      });
      var vs = [];
      all.forEach(function (x) { if (vs.indexOf(x.v) < 0) vs.push(x.v); });
      vs.sort(function (a, b) { return a - b; });
      v.NV.mismatch = false;
      built.staves.forEach(function (st, si) {
        var vi = vs[si];
        var list = all.filter(function (x) { return x.v === vi; }).sort(function (a, b) { return a.m - b.m || a.n - b.n; });
        var seq = built.seqs[si];
        if (list.length !== seq.length) { v.NV.mismatch = true; if (window.console) console.warn("Play Along: notation has " + list.length + " shapes for " + seq.length + " events"); }
        var key = st.part.key, els = v.NV.els[key] = v.NV.els[key] || [];
        for (var i = 0; i < list.length && i < seq.length; i++) {
          var r = seq[i][0], j = seq[i][1];
          (els[r] = els[r] || [])[j] = ((els[r][j]) || []).concat([list[i].e]);
          list[i].e.classList.add("pa-ev");
          list[i].e.setAttribute("data-pe", key + ":" + r + ":" + j);
          list[i].line = list[i].l;
        }
        if (st.part.isMain && !st.grand || st.grand === 1) v.NV.mainStaffIdx = si;
      });
    }

    /* our own tab staff in the room abcjs reserved */
    function drawTab(v, out, sc, main) {
      var svg = out.querySelector("svg"), N = main.strings, T = main.tuning;
      var tabStaffs = [];
      Array.prototype.forEach.call(out.querySelectorAll(".abcjs-staff"), function (g) {
        var ps = g.querySelectorAll("path");
        if (ps.length === 6 && g.getAttribute("class").indexOf("abcjs-top-line") < 0) tabStaffs.push(g);
      });
      var byLine = {};
      tabStaffs.forEach(function (g) {
        var ps = Array.prototype.slice.call(g.querySelectorAll("path")), ys = ps.map(function (p) { var m = /M\s*[\d.]+\s+([\d.]+)/.exec(p.getAttribute("d") || ""); return m ? +m[1] : 0; });
        var xs = /M\s*([\d.]+)\s+[\d.]+\s+L\s*([\d.]+)/.exec(ps[0].getAttribute("d") || "");
        var top = ys[0], bot = ys[ys.length - 1], gap = Math.min(14.5, (bot - top) / (N - 1)), span = gap * (N - 1), y0 = top + ((bot - top) - span) / 2;
        var line = num(/abcjs-l(\d+)/, g.getAttribute("class") || "");
        ps.forEach(function (p) { p.remove(); });
        for (var s = 0; s < N; s++) sv("path", { d: "M " + xs[1] + " " + (y0 + s * gap) + " L " + xs[2] + " " + (y0 + s * gap), "class": "pa-tabline" }, g);
        byLine[line] = { y0: y0, gap: gap, top: top, bot: bot };
      });
      // hide abcjs's own numbers
      Array.prototype.forEach.call(out.querySelectorAll(".abcjs-tabNumber"), function (g) { g.style.display = "none"; });
      v.NV.tabLines = byLine;
      var els = v.NV.els.main || [];
      sc.measures.forEach(function () {});
      built.seqs.forEach(function () {});
      R.list.forEach(function (rr, r) {
        var evs = sc.measures[rr.bi].events;
        evs.forEach(function (ev, j) {
          var group = els[r] && els[r][j];
          if (!group || !group.length) return;
          var line = num(/abcjs-l(\d+)/, group[0].getAttribute("class") || ""), tb = byLine[line];
          if (!tb) return;
          var head = group[0].querySelector(".abcjs-notehead") || group[0], box = bb(head);
          if (!box) return;
          var x = box.x + box.width / 2, tels = [];
          ev.notes.forEach(function (nt) {
            if (nt.s == null || nt.f == null || nt.s > N) return;
            var y = tb.y0 + (nt.s - 1) * tb.gap, txt = nt.dead ? "x" : (nt.cont ? "(" + nt.f + ")" : String(nt.f)), wd = txt.length * 5.4 + 3;
            sv("rect", { x: x - wd / 2, y: y - 5.2, width: wd, height: 10.4, "class": "pa-tko" }, svg);
            tels.push(sv("text", { x: x, y: y + 0.4, "class": "pa-tn" + (nt.cont ? " tie" : "") }, svg, txt));
          });
          (v.NV.tabEls[r] = v.NV.tabEls[r] || [])[j] = tels;
        });
      });
    }

    /* pitch names, counts, lyrics, bar numbers: small texts in the same SVG, so they scale with it */
    function overlays(v, out, built, parts, tabbed) {
      var svg = out.querySelector("svg"); if (!svg) return;
      var els = v.NV.els.main || [], mt = tl.meta;
      var lines = {}, mainLine = {};
      Array.prototype.forEach.call(out.querySelectorAll(".abcjs-staff"), function (g) {
        var l = num(/abcjs-l(\d+)/, g.getAttribute("class") || ""), x = bb(g);
        if (!x) return;
        var L = lines[l] = lines[l] || { top: 1e9, bot: -1e9 };
        L.top = Math.min(L.top, x.y); L.bot = Math.max(L.bot, x.y + x.height);
        if (mainLine[l] == null) mainLine[l] = { top: x.y, bot: x.y + x.height };
      });
      v.NV.lines = lines;
      var bottoms = {}, any = false;
      R.list.forEach(function (rr, r) {
        var b = sc.measures[rr.bi], evs = b.events, first = true;
        evs.forEach(function (ev, j) {
          var group = els[r] && els[r][j];
          if (!group || !group.length) return;
          var line = num(/abcjs-l(\d+)/, group[0].getAttribute("class") || ""), ml = mainLine[line], sl = lines[line];
          if (!ml) return;
          var head = group[0].querySelector(".abcjs-notehead") || group[0], box = bb(head) || bb(group[0]);
          if (!box) return;
          var x = box.x + box.width / 2;
          if (first && d.barNums !== false) { sv("text", { x: x - 15, y: ml.top - 1.5, "class": "pa-bn" }, svg, String(b.n)); }
          first = false;
          if (d.pitch && ev.notes.length) { var pt = V.evPitchText(ev); if (pt) sv("text", { x: x, y: ml.bot + 8.5, "class": "pa-pn" }, svg, pt); }
          var below = (tabbed && v.NV.tabLines && v.NV.tabLines[line]) ? v.NV.tabLines[line].bot : ml.bot;
          if (d.counts && ev.notes.length) sv("text", { x: x, y: below + 10, "class": "pa-ct" }, svg, SC.countLabel(tl.offs[rr.bi][j], mt[rr.bi].time));
          if (d.lyrics && ev.lyric) sv("text", { x: x - 2, y: below + 10 + (d.counts ? 10 : 0), "class": "pa-ly" }, svg, ev.lyric);
        });
        if (b.bad && !rr.plain && els[r] && els[r][0]) {
          try {
            var e0 = els[r][0][0], b0 = bb(e0);
            var dot = sv("circle", { cx: b0.x + b0.width / 2, cy: b0.y - 14, r: 3.5, "class": "t-flag" }, svg);
            sv("title", null, dot, "This bar may not be read right");
          } catch (e) {}
        }
      });
    }

    /* each bar's box in surf pixels, for the loop tint, handles and drag */
    function measure(v, out) {
      var sr = v.surf.getBoundingClientRect(), svg = out.querySelector("svg");
      if (!svg) return;
      var bands = {};
      Array.prototype.forEach.call(out.querySelectorAll(".abcjs-staff"), function (g) {
        var l = num(/abcjs-l(\d+)/, g.getAttribute("class") || ""), rc = g.getBoundingClientRect();
        bands[l] = union(bands[l], rc);
      });
      var per = [], ks = Object.keys(v.NV.els);
      R.list.forEach(function (rr, r) {
        var rc = null, line = -1;
        ks.forEach(function (k) {
          var rows = v.NV.els[k][r]; if (!rows) return;
          rows.forEach(function (list) { (list || []).forEach(function (e) {
            if (line < 0) line = num(/abcjs-l(\d+)/, e.getAttribute("class") || "");
            rc = union(rc, e.getBoundingClientRect());
          }); });
        });
        per[r] = rc ? { rc: rc, line: line } : null;
      });
      var kScale = Z;
      v.NV.rects = per.map(function (p, r) {
        if (!p) return null;
        var band = bands[p.line], prev = per[r - 1], next = per[r + 1];
        var x0 = prev && prev.line === p.line ? (prev.rc.right + p.rc.left) / 2 : p.rc.left - 10 * kScale;
        var x1 = next && next.line === p.line ? (p.rc.right + next.rc.left) / 2 : p.rc.right + 10 * kScale;
        return { x: x0 - sr.left, y: (band ? band.top : p.rc.top) - sr.top - 22 * kScale, w: x1 - x0, h: (band ? band.bottom - band.top : p.rc.height) + 28 * kScale };
      });
    }

    v.barRect = function (r) { return v.NV.rects[r] || null; };

    function curSets(loc) {
      var r = V.rOf(loc); if (r == null) return null;
      var pe = EN.locateParts(tl, loc), sets = [], tabs = [], key = r + "";
      Object.keys(NV.els).forEach(function (k) {
        var j = k === "main" ? loc.ev : (pe[k] || 0), row = NV.els[k][r];
        key += "|" + k + j;
        if (row && row[j]) sets = sets.concat(row[j]);
        if (k === "main" && NV.tabEls[r] && NV.tabEls[r][j]) tabs = NV.tabEls[r][j];
      });
      return { r: r, key: key, sets: sets, tabs: tabs };
    }
    var curTabs = [], curR = -1;
    v.cursor = function (loc, jump) {
      if (!NV.rendered) return;
      var c = curSets(loc);
      if (!c) return;
      if (NV.curKey !== c.key) {
        NV.curEls.forEach(function (n) { n.classList.remove("pa-cur"); });
        curTabs.forEach(function (n) { n.classList.remove("pa-curt"); });
        NV.curEls = c.sets; curTabs = c.tabs;
        c.sets.forEach(function (n) { n.classList.add("pa-cur"); });
        c.tabs.forEach(function (n) { n.classList.add("pa-curt"); });
        NV.curKey = c.key;
        var first = c.sets[0];
        if (first) {
          var rc = first.getBoundingClientRect();
          if (horiz) V.followX(v, rc.left - v.surf.getBoundingClientRect().left, true);
          else {
            var top = 130 + (S.vidInset || 0), bottom = window.innerHeight - (S.dockH || 150);
            if (jump || rc.top < top || rc.bottom > bottom || (S.playing && curR !== c.r && rc.top > window.innerHeight * 0.5)) V.scrollIntoPlace(rc.top + window.scrollY, false);
          }
        }
        curR = c.r;
      }
    };
    // taps: a note seeks to it, a bar seeks to the bar
    v.surf.addEventListener("click", function (e) {
      var pe = e.target.closest ? e.target.closest("[data-pe]") : null;
      if (pe && V.hooks.onEventTap) {
        var p = pe.getAttribute("data-pe").split(":"), key = p[0], r = +p[1], j = +p[2], rr = R.list[r];
        var base = V.rSeekPos(r), offs = tl.poffs[key] && tl.poffs[key][rr.bi];
        V.hooks.onEventTap(r, base + (offs ? offs[j] : 0), kind);
        return;
      }
      var r2 = v.rAt(e.clientX, e.clientY);
      if (r2 >= 0 && V.hooks.onBarTap) V.hooks.onBarTap(r2, kind);
    });
    v.destroy = function () {};
    return v;
  }

  V.notation = function (host) { return makeView(host, "notation"); };
  V.score = function (host) { return makeView(host, "score"); };
  PA.abc = { build: build, loadAbcjs: loadAbcjs };
})();
