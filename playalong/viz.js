/* PA.viz: the visual fretboard and keyboard (window.PA.viz). Crisp SVG, drawn from the shared state PA.S (sc, tl, prefs.viz).
   PA.viz.mount(box)    build the panel in the element (call again after the score, transpose or main part changes)
   PA.viz.update(loc)   light the notes at a timeline location (loc as PA.engine.locate gives it)
   PA.viz.kind()        "fret" | "keys" (what is showing)    PA.viz.snapshot() -> { kind, on:[{s,f}|{midi}], next:[...] } for tests
   prefs.viz = { on, kind: null (auto) | "fret" | "keys", left: bool (left-handed fretboard), all: bool (show other parts too) } */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score, EN = PA.engine, V = PA.views;
  var S = PA.S = PA.S || {};
  var sv = V.sv, el = V.el;
  var NS = PA.viz = {};
  var box = null, cur = null, last = { on: [], next: [] };

  function VP() { var p = S.prefs.viz; if (!p) p = S.prefs.viz = { on: false, kind: null, left: false, all: false }; return p; }
  function mainPart() { return SC.parts(S.sc)[0]; }
  function defaultKind() { var m = mainPart(); return (m.instrument === "bass" || m.instrument === "guitar") ? "fret" : "keys"; }
  function kind() { return VP().kind || defaultKind(); }
  NS.kind = kind; NS.defaultKind = defaultKind;

  function tuningOf() {
    var m = mainPart();
    if (m.tuning && m.tuning.length) return m.tuning;
    return (SC.STD[m.instrument] || SC.STD.guitar).slice();
  }
  /* sounding midi -> the lowest-fret place on the tuning (low string first) */
  function place(midi, T) {
    var N = T.length, best = null;
    for (var s = 1; s <= N; s++) {
      var f = midi - T[N - s];
      if (f < 0 || f > 24) continue;
      if (!best || f < best.f) best = { s: s, f: f };
    }
    return best;
  }
  function evNotes(bar, ev, partIdx) {
    var sc = S.sc, evs = partIdx == null ? sc.measures[bar].events : (SC.parts(sc)[partIdx].events(bar) || []);
    return evs[ev] ? evs[ev].notes : [];
  }
  /* what a set of notes lights, for the main part */
  function mainPositions(notes, T, octave) {
    var out = [];
    notes.forEach(function (n) {
      if (n.drum != null) return;
      if (n.s != null && n.f != null && n.s <= T.length) { out.push({ s: n.s, f: n.f, midi: SC.noteMidi(n) + octave, dead: !!n.dead, name: V.pitchLetters(n) }); return; }
      var m = SC.noteMidi(n) + octave, pl = place(m, T);
      if (pl) out.push({ s: pl.s, f: pl.f, midi: m, dead: !!n.dead, name: V.pitchLetters(n) });
    });
    return out;
  }

  /* ---------------------------------------------------------------- fretboard */
  function buildFret(host) {
    var T = tuningOf(), N = T.length, vp = VP(), W = Math.max(280, host.clientWidth || 340);
    var nut = 30, fw = Math.max(30, (W - nut - 8) / 12.4), FR = 24, sg = N > 5 ? 15 : 17, top = 12, H = top * 2 + (N - 1) * sg + 14;
    var totalW = nut + FR * fw + 10;
    var wrap = el("div", "viz-scroll");
    var svg = sv("svg", { width: totalW, height: H, viewBox: "0 0 " + totalW + " " + H, "class": "fretsvg", role: "img", "aria-label": "Fretboard" }, wrap);
    function X(x) { return vp.left ? totalW - x : x; }
    var bx0 = nut, bx1 = nut + FR * fw;
    sv("rect", { x: Math.min(X(bx0), X(bx1)), y: top - 5, width: FR * fw, height: (N - 1) * sg + 10, rx: 3, "class": "fb-board" }, svg);
    // inlays
    [3, 5, 7, 9, 15, 17, 19, 21].forEach(function (f) { sv("circle", { cx: X(nut + (f - 0.5) * fw), cy: top + (N - 1) * sg / 2, r: 3, "class": "fb-inlay" }, svg); });
    [12, 24].forEach(function (f) {
      var cx = X(nut + (f - 0.5) * fw);
      sv("circle", { cx: cx, cy: top + (N - 1) * sg * 0.28, r: 3, "class": "fb-inlay" }, svg); sv("circle", { cx: cx, cy: top + (N - 1) * sg * 0.72, r: 3, "class": "fb-inlay" }, svg);
    });
    for (var f = 0; f <= FR; f++) sv("line", { x1: X(nut + f * fw), x2: X(nut + f * fw), y1: top - 5, y2: top + (N - 1) * sg + 5, "class": f === 0 ? "fb-nut" : "fb-fret" }, svg);
    for (var s = 0; s < N; s++) sv("line", { x1: X(nut - 2), x2: X(nut + FR * fw), y1: top + s * sg, y2: top + s * sg, "class": "fb-string", "stroke-width": 0.8 + (N - 1 - s) * 0.22 / (N > 4 ? 1.3 : 1) }, svg);
    [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].forEach(function (f) { sv("text", { x: X(nut + (f - 0.5) * fw), y: H - 1, "class": "fb-num" }, svg, String(f)); });
    var dots = sv("g", { "class": "fb-dots" }, svg);
    return { wrap: wrap, svg: svg, dots: dots, X: X, nut: nut, fw: fw, sg: sg, top: top, totalW: totalW, T: T, N: N };
  }
  function drawFret(fb, on, next, other) {
    var g = fb.dots; g.innerHTML = "";
    var showName = !!V.D().pitch;
    function pos(p) { return { x: p.f === 0 ? fb.X(fb.nut - 13) : fb.X(fb.nut + (p.f - 0.5) * fb.fw), y: fb.top + (p.s - 1) * fb.sg }; }
    next.forEach(function (p) { var c = pos(p); sv("circle", { cx: c.x, cy: c.y, r: 6.5, "class": "fb-next" }, g); });
    other.forEach(function (p) { var c = pos(p); sv("circle", { cx: c.x, cy: c.y, r: 6, "class": "fb-other" }, g); });
    on.forEach(function (p) {
      var c = pos(p);
      sv("circle", { cx: c.x, cy: c.y, r: 8, "class": "fb-on" + (p.dead ? " dead" : "") }, g);
      sv("text", { x: c.x, y: c.y + 0.5, "class": "fb-t" }, g, p.dead ? "x" : showName ? (p.name || "") : String(p.f));
    });
    var vis = on.length ? on : [];
    if (vis.length) {
      var xs = vis.map(function (p) { return pos(p).x; }), mid = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2, sc = fb.wrap;
      if (mid < sc.scrollLeft + 24 || mid > sc.scrollLeft + sc.clientWidth - 24) {
        var tgt = Math.max(0, mid - sc.clientWidth / 2);
        try { sc.scrollTo({ left: tgt, behavior: "smooth" }); } catch (e) { sc.scrollLeft = tgt; }
      }
    }
  }

  /* ---------------------------------------------------------------- keyboard */
  var BLACK = { 1: 1, 3: 1, 6: 1, 8: 1, 10: 1 };
  function buildKeys(host) {
    var kw = 22, lo = 21, hi = 108, H = 92, nw = 0, i;
    var pos = {};
    for (i = lo; i <= hi; i++) if (!BLACK[i % 12]) { pos[i] = nw * kw; nw++; }
    var totalW = nw * kw + 2;
    var wrap = el("div", "viz-scroll");
    var svg = sv("svg", { width: totalW, height: H + 14, viewBox: "0 0 " + totalW + " " + (H + 14), "class": "keysvg", role: "img", "aria-label": "Keyboard" }, wrap);
    var keys = {}, labels = sv("g", {}, svg);
    for (i = lo; i <= hi; i++) if (!BLACK[i % 12]) keys[i] = sv("rect", { x: pos[i], y: 0, width: kw - 1, height: H, rx: 2, "class": "kb-w", "data-m": i }, svg);
    for (i = lo; i <= hi; i++) if (BLACK[i % 12]) {
      var x = pos[i - 1] + kw - 6.5;
      keys[i] = sv("rect", { x: x, y: 0, width: 13, height: H * 0.6, rx: 2, "class": "kb-b", "data-m": i }, svg);
    }
    for (i = lo; i <= hi; i++) if (i % 12 === 0) sv("text", { x: pos[i] + kw / 2 - 0.5, y: H + 11, "class": "fb-num" }, svg, "C" + (Math.floor(i / 12) - 1));
    function xOf(m) { return BLACK[m % 12] ? pos[m - 1] + kw : pos[m] + kw / 2; }
    return { wrap: wrap, svg: svg, keys: keys, labels: labels, xOf: xOf, kw: kw, totalW: totalW };
  }
  function usedRange() {
    var sc = S.sc, p = SC.parts(sc)[0], lo = 127, hi = 0;
    sc.measures.forEach(function (b) { b.events.forEach(function (e) { e.notes.forEach(function (n) { if (n.drum != null) return; var m = SC.noteMidi(n) + p.octave; if (m < lo) lo = m; if (m > hi) hi = m; }); }); });
    return hi >= lo ? { lo: lo, hi: hi } : { lo: 48, hi: 72 };
  }
  var held = [];
  function drawKeys(kb, on, next, other) {
    held.forEach(function (k) { if (k) k.setAttribute("class", k.getAttribute("class").replace(/ (on|onl|nx|oth)\b/g, "")); });
    held = [];
    kb.labels.innerHTML = "";
    function mark(list, cls) {
      list.forEach(function (p) {
        var k = kb.keys[p.midi]; if (!k) return;
        var c = cls === "on" ? (p.left ? "onl" : "on") : cls;
        k.setAttribute("class", k.getAttribute("class") + " " + c); held.push(k);
      });
    }
    mark(next, "nx"); mark(other, "oth"); mark(on, "on");
    if (V.D().pitch) on.forEach(function (p) { if (kb.keys[p.midi]) sv("text", { x: kb.xOf(p.midi), y: 80, "class": "kb-l" }, kb.labels, SC.midiName(p.midi).replace(/\d+$/, "")); });
    if (on.length) {
      var xs = on.map(function (p) { return kb.xOf(p.midi); }), mid = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2, sc = kb.wrap;
      if (mid < sc.scrollLeft + 30 || mid > sc.scrollLeft + sc.clientWidth - 30) {
        var tgt = Math.max(0, mid - sc.clientWidth / 2);
        try { sc.scrollTo({ left: tgt, behavior: "smooth" }); } catch (e) { sc.scrollLeft = tgt; }
      }
    }
  }

  /* ---------------------------------------------------------------- panel */
  function mount(b) {
    if (b) box = b;
    if (!box) return;
    box.innerHTML = "";
    cur = null;
    var vp = VP();
    box.hidden = !vp.on;
    if (!vp.on || !S.sc) return;
    var k = kind(), head = el("div", "viz-h");
    head.innerHTML = '<div class="seg sm" role="group" aria-label="Instrument view"><button type="button" data-k="fret" aria-pressed="' + (k === "fret") + '">Fretboard</button><button type="button" data-k="keys" aria-pressed="' + (k === "keys") + '">Keyboard</button></div>' +
      '<div class="chips">' + (k === "fret" ? '<button class="chip sm" type="button" data-o="left" aria-pressed="' + !!vp.left + '">Left</button>' : '') + '<button class="chip sm" type="button" data-o="all" aria-pressed="' + !!vp.all + '">All parts</button></div>' +
      '<button class="icon-btn sm" type="button" data-o="close" aria-label="Close"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg></button>';
    box.appendChild(head);
    Array.prototype.forEach.call(head.querySelectorAll("[data-k]"), function (bt) { bt.onclick = function () { vp.kind = bt.getAttribute("data-k"); if (PA.app) PA.app.save(); mount(); NS.update(S.loc); }; });
    Array.prototype.forEach.call(head.querySelectorAll("[data-o]"), function (bt) {
      bt.onclick = function () {
        var o = bt.getAttribute("data-o");
        if (o === "close") { vp.on = false; if (PA.app) PA.app.save(); mount(); if (PA.app) PA.app.layout(); return; }
        vp[o] = !vp[o]; if (PA.app) PA.app.save(); mount(); NS.update(S.loc);
      };
    });
    var body = el("div", "viz-body"); box.appendChild(body);
    if (k === "fret") { var fb = buildFret(body); body.appendChild(fb.wrap); cur = { kind: "fret", fb: fb }; }
    else {
      var kb = buildKeys(body); body.appendChild(kb.wrap); cur = { kind: "keys", kb: kb };
      var r = usedRange(), c = (kb.xOf(r.lo) + kb.xOf(r.hi)) / 2;
      kb.wrap.scrollLeft = Math.max(0, c - (kb.wrap.clientWidth || 340) / 2);
    }
    if (PA.app) PA.app.layout();
  }

  NS.update = function (loc) {
    if (!box || !cur || !S.sc || !S.tl || !VP().on || !loc) return;
    var sc = S.sc, tl = S.tl, pl = SC.parts(sc), mp = pl[0], octave = mp.octave, vp = VP();
    var pos0 = tl.passes[loc.pass].start + tl.offs[loc.bar][loc.ev], idx = EN.eventIndexAt(tl.events, pos0), nxt = tl.events[idx + 1];
    var onN = evNotes(loc.bar, loc.ev), nextN = nxt ? evNotes(nxt.bar, nxt.ev) : [];
    var other = [];
    if (vp.all) {
      var pe = EN.locateParts(tl, loc);
      pl.slice(1).forEach(function (p, i) {
        if (p.drum) return;
        var evs = p.events(loc.bar), e = evs && evs[pe[p.key]];
        if (e) e.notes.forEach(function (n) { if (n.drum == null && !n.dead) other.push({ midi: SC.noteMidi(n) + p.octave, left: /LH|left/i.test(p.name || "") }); });
      });
    }
    var on, nx;
    if (cur.kind === "fret") {
      var T = cur.fb.T;
      on = mainPositions(onN, T, octave); nx = mainPositions(nextN, T, octave);
      var oth = other.map(function (o) { return place(o.midi, T); }).filter(Boolean);
      drawFret(cur.fb, on, nx, oth);
      last = { kind: "fret", on: on.map(function (p) { return { s: p.s, f: p.f }; }), next: nx.map(function (p) { return { s: p.s, f: p.f }; }), other: oth.length };
    } else {
      var mk = function (list) { return list.filter(function (n) { return n.drum == null && !n.dead; }).map(function (n) { var m = SC.noteMidi(n) + octave; return { midi: m, left: m < 60 }; }); };
      on = mk(onN); nx = mk(nextN);
      drawKeys(cur.kb, on, nx, other);
      last = { kind: "keys", on: on.map(function (p) { return { midi: p.midi }; }), next: nx.map(function (p) { return { midi: p.midi }; }), other: other.length };
    }
  };
  NS.mount = mount;
  NS.snapshot = function () { return last; };
})();
