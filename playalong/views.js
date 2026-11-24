/* PA.views: what the player draws (window.PA.views). Needs PA.score, PA.engine and the shared state PA.S (sc, tl, prefs, R, piece, startPos, loopSel, loopPick).
   This file: the list of bars to draw (R), the loop overlay and drag-to-select, and the Tab, Chords and Page views.
   abc.js adds the Notation and Score views (abcjs), viz.js the fretboard and keyboard.

   A view is { kind, host, surf, ov, render(), cursor(loc, jump), barRect(r) -> {x,y,w,h} in surf pixels | null, destroy(), horizontal }.
   R is the list of drawn bars: [{ bi: bar index, pass: pass index or -1, plain: true when repeats/endings are not drawn }]. In "Expand repeats"
   mode there is one R entry per pass of the timeline, otherwise one per bar; Focus mode keeps only the looped bars.
   Hooks the app sets: V.onSeek(pos), V.onBarTap(r), V.onLoopDrag(r1, r2 | null), V.onHandle(which, r), V.onZoom(delta), V.holdScroll() (true while the user scrolls). */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var SC = PA.score, EN = PA.engine;
  var S = PA.S = PA.S || {};
  var V = PA.views = PA.views || {};
  var clamp = SC.clamp;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var SVGNS = "http://www.w3.org/2000/svg";
  function sv(tag, attrs, parent, text) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  V.el = el; V.sv = sv;
  function D() { return (S.prefs && S.prefs.display) || {}; }
  V.D = D;
  V.hooks = { onSeek: null, onBarTap: null, onLoopDrag: null, onHandle: null, onZoom: null, holdScroll: function () { return false; } };

  /* ================================================================ the bars to draw */
  V.computeR = function () {
    var sc = S.sc, tl = S.tl, d = D(), list = [], byBar = {}, byPass = {};
    if (d.expand) tl.passes.forEach(function (p, pi) { list.push({ bi: p.bar, pass: pi, plain: true }); });
    else sc.measures.forEach(function (b, i) { list.push({ bi: i, pass: -1, plain: false }); });
    var L = S.prefs.loop;
    if (d.focus && L) {
      var lr = EN.loopRange();
      list = list.filter(function (r) {
        if (d.expand) return lr ? (r.pass >= lr.a && r.pass <= lr.b) : true;
        return r.bi >= L.a && r.bi <= L.b;
      });
    }
    list.forEach(function (r, i) { if (r.pass >= 0) byPass[r.pass] = i; else byBar[r.bi] = i; });
    S.R = { list: list, byBar: byBar, byPass: byPass, expand: !!d.expand };
    return S.R;
  };
  /* The R index a timeline location is drawn at (undefined when focus hides it). */
  V.rOf = function (loc) { var R = S.R; return R.expand ? R.byPass[loc.pass] : R.byBar[loc.bar]; };
  V.rSeekPos = function (r) {
    var e = S.R.list[r], tl = S.tl;
    if (!e) return 0;
    if (e.pass >= 0) return tl.passes[e.pass].start;
    var pi = EN.firstPassOf(tl, e.bi);
    return pi >= 0 ? tl.passes[pi].start : 0;
  };
  /* Is R entry r inside the current loop? */
  V.inLoop = function (r) {
    var L = S.prefs.loop, e = S.R.list[r];
    if (!L || !e) return false;
    if (S.R.expand) { var lr = EN.loopRange(); return !!lr && e.pass >= lr.a && e.pass <= lr.b; }
    return e.bi >= L.a && e.bi <= L.b;
  };
  /* The bar range (bar indices) a drag from R entry r1 to r2 selects. */
  V.rangeBars = function (r1, r2) {
    var a = Math.min(r1, r2), b = Math.max(r1, r2), lo = Infinity, hi = -1;
    for (var i = a; i <= b; i++) { var e = S.R.list[i]; if (!e) continue; lo = Math.min(lo, e.bi); hi = Math.max(hi, e.bi); }
    return hi < 0 ? null : { a: lo, b: hi };
  };

  /* ================================================================ common view frame, loop overlay, selecting */
  V.frame = function (host, kind, horizontal) {
    host.innerHTML = "";
    var scroll = el("div", "vscroll" + (horizontal ? " h" : "")), surf = el("div", "vsurf"), ov = el("div", "vov");
    scroll.appendChild(surf); surf.appendChild(ov); host.appendChild(scroll);
    var v = { kind: kind, host: host, scroll: scroll, surf: surf, ov: ov, horizontal: !!horizontal, rects: null };
    v.content = function (node) { surf.insertBefore(node, ov); return node; };
    v.rAt = function (cx, cy) {
      var sr = surf.getBoundingClientRect(), x = cx - sr.left, y = cy - sr.top, best = -1, bd = 1e9;
      for (var r = 0; r < S.R.list.length; r++) {
        var b = v.barRect(r);
        if (!b) continue;
        var inY = y >= b.y - 4 && y <= b.y + b.h + 4;
        if (!inY) continue;
        if (x >= b.x && x <= b.x + b.w) return r;
        var d = Math.min(Math.abs(x - b.x), Math.abs(x - b.x - b.w));
        if (d < bd) { bd = d; best = r; }
      }
      return bd < 24 ? best : -1;
    };
    v.paintLoop = function () { V.paintOverlay(v); };
    bindSelect(v);
    return v;
  };

  V.paintOverlay = function (v) {
    var ov = v.ov;
    ov.innerHTML = "";
    if (!S.R) return;
    var L = S.prefs.loop, n = S.R.list.length, first = -1, last = -1, r;
    var drag = S.drag;
    for (r = 0; r < n; r++) {
      var on = false, kind = "";
      if (drag) { on = r >= Math.min(drag.a, drag.b) && r <= Math.max(drag.a, drag.b); kind = " drag"; }
      else if (S.loopSel === 2 && S.loopPick != null && S.R.list[r].bi === S.loopPick) { on = true; kind = " pick"; }
      else if (V.inLoop(r)) { on = true; if (first < 0) first = r; last = r; }
      if (!on) continue;
      var b = v.barRect(r);
      if (!b) continue;
      var d = el("div", "lp-box" + kind);
      d.style.cssText = "left:" + b.x.toFixed(1) + "px;top:" + b.y.toFixed(1) + "px;width:" + b.w.toFixed(1) + "px;height:" + b.h.toFixed(1) + "px";
      ov.appendChild(d);
    }
    if (L && !drag && first >= 0) {
      var ba = v.barRect(first), bb = v.barRect(last);
      if (ba && bb) {
        var ha = el("div", "lp-h a"), hb = el("div", "lp-h b");
        ha.style.cssText = "left:" + (ba.x).toFixed(1) + "px;top:" + (ba.y).toFixed(1) + "px";
        hb.style.cssText = "left:" + (bb.x + bb.w).toFixed(1) + "px;top:" + (bb.y + bb.h).toFixed(1) + "px";
        ha.setAttribute("data-h", "a"); hb.setAttribute("data-h", "b");
        ha.setAttribute("aria-label", "Loop start"); hb.setAttribute("aria-label", "Loop end");
        ov.appendChild(ha); ov.appendChild(hb);
      }
    }
  };

  function bindSelect(v) {
    var surf = v.surf, st = null, tt = null, armed = false, touchStart = null;
    function begin(r0, handle) { st = { r0: r0, handle: handle || null, moved: false }; }
    function update(cx, cy) {
      var r = v.rAt(cx, cy);
      if (r < 0 || !st) return;
      var a, b;
      if (st.handle) {
        var cur = S.prefs.loop, lr = null;
        // the other end stays; ends are R entries
        var ra = -1, rb = -1;
        for (var i = 0; i < S.R.list.length; i++) if (V.inLoop(i)) { if (ra < 0) ra = i; rb = i; }
        if (ra < 0) return;
        if (st.handle === "a") { a = Math.min(r, rb); b = rb; } else { a = ra; b = Math.max(r, ra); }
      } else { a = st.r0; b = r; }
      if (!st.moved && a === b && !st.handle) { st.r1 = r; return; }
      if (!st.moved && st.pid != null) { try { surf.setPointerCapture(st.pid); } catch (x) {} }   /* capture only once it is a drag, so a plain click still lands on the bar */
      st.moved = true; st.r1 = r;
      S.drag = { a: a, b: b };
      V.paintOverlay(v);
    }
    function finish() {
      var res = st;
      st = null;
      if (!res || !res.moved) { S.drag = null; return false; }
      var d = S.drag; S.drag = null;
      V.hooks.dragAt = Date.now();
      if (V.hooks.onLoopDrag && d) V.hooks.onLoopDrag(d.a, d.b);
      v.paintLoop();
      return true;
    }
    // mouse (and pen)
    surf.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch" || e.button !== 0) return;
      var h = e.target.closest && e.target.closest(".lp-h");
      var r = v.rAt(e.clientX, e.clientY);
      if (!h && r < 0) return;
      begin(r, h ? h.getAttribute("data-h") : null);
      st.pid = e.pointerId;
      if (h) { try { surf.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); }
    });
    surf.addEventListener("pointermove", function (e) {
      if (!st || e.pointerType === "touch") return;
      update(e.clientX, e.clientY);
    });
    function up(e) { if (e.pointerType === "touch") return; try { surf.releasePointerCapture(e.pointerId); } catch (x) {} finish(); }
    surf.addEventListener("pointerup", up);
    surf.addEventListener("pointercancel", function () { st = null; S.drag = null; v.paintLoop(); });
    // a drag is not a tap
    surf.addEventListener("click", function (e) {
      if (V.hooks.dragAt && Date.now() - V.hooks.dragAt < 350) { e.stopPropagation(); e.preventDefault(); }
    }, true);
    // touch: press and hold, then drag; a normal swipe still scrolls
    surf.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { clearTimeout(tt); armed = false; return; }
      var t = e.touches[0], h = e.target.closest && e.target.closest(".lp-h");
      touchStart = { x: t.clientX, y: t.clientY };
      armed = false; clearTimeout(tt);
      if (h) { begin(-1, h.getAttribute("data-h")); armed = true; return; }
      tt = setTimeout(function () {
        var r = v.rAt(touchStart.x, touchStart.y);
        if (r < 0) return;
        armed = true; begin(r);
        S.drag = { a: r, b: r }; st.moved = true; V.paintOverlay(v);
        try { if (navigator.vibrate) navigator.vibrate(12); } catch (x) {}
      }, 380);
    }, { passive: true });
    surf.addEventListener("touchmove", function (e) {
      var t = e.touches[0];
      if (!armed) {
        if (touchStart && (Math.abs(t.clientX - touchStart.x) > 10 || Math.abs(t.clientY - touchStart.y) > 10)) clearTimeout(tt);
        return;
      }
      if (e.cancelable) e.preventDefault();
      update(t.clientX, t.clientY);
    }, { passive: false });
    function tend() { clearTimeout(tt); if (armed) { armed = false; finish(); } }
    surf.addEventListener("touchend", tend, { passive: true });
    surf.addEventListener("touchcancel", function () { clearTimeout(tt); armed = false; st = null; S.drag = null; v.paintLoop(); }, { passive: true });
    // two fingers: pinch to zoom
    var pinch = null;
    surf.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) pinch = { d: dist(e.touches), z: 1 };
    }, { passive: true });
    surf.addEventListener("touchmove", function (e) {
      if (pinch && e.touches.length === 2) { pinch.z = dist(e.touches) / pinch.d; if (e.cancelable) e.preventDefault(); }
    }, { passive: false });
    surf.addEventListener("touchend", function (e) {
      if (pinch && e.touches.length < 2) {
        var z = pinch.z; pinch = null;
        if ((z > 1.15 || z < 0.87) && V.hooks.onZoom) V.hooks.onZoom(z);
      }
    }, { passive: true });
    function dist(t) { var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy) || 1; }
  }

  /* ---- scrolling ---- */
  V.scrollIntoPlace = function (absTop, force) {
    if (!force && V.hooks.holdScroll()) return;
    var y = Math.max(0, absTop - window.innerHeight * 0.33);
    var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    try { window.scrollTo({ top: y, behavior: rm ? "auto" : "smooth" }); } catch (e) { window.scrollTo(0, y); }
  };
  /* Horizontal layouts keep the cursor about a third of the way across. */
  V.followX = function (v, x, smooth) {
    var sc = v.scroll, target = Math.max(0, x - sc.clientWidth / 3);
    if (V.hooks.holdScroll()) return;
    if (Math.abs(sc.scrollLeft - target) < 2) return;
    if (smooth) { try { sc.scrollTo({ left: target, behavior: "smooth" }); } catch (e) { sc.scrollLeft = target; } }
    else sc.scrollLeft = target;
  };

  /* ================================================================ Tab view */
  var SP = 13;
  function slotW(d) { return 8 + 20 * Math.pow(d, 0.7); }
  function nominal(d) {
    function pw(x) { var l = Math.log2(x); return Math.abs(l - Math.round(l)) < 1e-3; }
    if (pw(d)) return { base: d, dot: false, trip: false };
    if (pw(d * 2 / 3)) return { base: d * 2 / 3, dot: true, trip: false };
    if (pw(d * 3 / 2)) return { base: d * 3 / 2, dot: false, trip: true };
    return { base: d, dot: false, trip: false };
  }
  function isTrip(d) { var x = d * 12; return Math.abs(x - Math.round(x)) < 0.02 && Math.round(x) % 3 !== 0; }
  function prettyChord(n) {
    return String(n).replace(/#/g, "♯").replace(/^([A-G])b/, "$1♭").replace(/\/([A-G])b/, "/$1♭").replace(/([0-9a-zA-Z])b(?=\d)/g, "$1♭");
  }
  V.prettyChord = prettyChord;
  function pitchLetters(note) {
    var p = SC.parsePitch(note.pitch);
    if (!p) return "";
    return p.letter + (p.acc === 1 ? "♯" : p.acc === -1 ? "♭" : p.acc === 2 ? "𝄪" : p.acc === -2 ? "♭♭" : "");
  }
  V.pitchLetters = pitchLetters;
  function evPitchText(ev) {
    var ns = ev.notes.filter(function (n) { return n.drum == null && !n.dead; }).sort(function (a, b) { return SC.noteMidi(a) - SC.noteMidi(b); });
    return ns.map(pitchLetters).join("/");
  }
  V.evPitchText = evPitchText;

  V.tab = function (host) {
    var sc = S.sc, tl = S.tl, R = S.R, d = D(), list = R.list, Z = (d.zoom || 100) / 100, horiz = d.layout === "horizontal";
    var v = V.frame(host, "tab", horiz);
    var surf = v.surf;
    var hostW = Math.floor(host.clientWidth) || (Math.min(window.innerWidth, 1088) - 32);
    var W = Math.floor(hostW / Z);
    var N = sc.strings || 4, bars = sc.measures, mt = tl.meta;
    var showCh = d.chords !== false, showNum = d.barNums !== false, showLy = !!d.lyrics, showCt = !!d.counts, showPn = !!d.pitch;
    var hasChords = showCh && bars.some(function (b) { return b.chords.length; }), hasEnd = !d.expand && bars.some(function (b) { return b.ending; });
    var hasSec = bars.some(function (b) { return b.section; });
    var hasLy = showLy && bars.some(function (b) { return b.events.some(function (e) { return e.lyric; }); });
    var staffTop = (hasChords ? 42 : (hasEnd || hasSec ? 28 : 22)) + (showPn ? 6 : 0), staffBot = staffTop + (N - 1) * SP, yR = staffBot + 10, stemLen = 17, yEnd = yR + stemLen;
    var yCount = yEnd + 25, yLyric = yEnd + 25 + (showCt ? 13 : 0);
    var rowH = yEnd + 22 + (showCt ? 13 : 0) + (hasLy ? 15 : 0);
    var beatLen = tl.unit === 1.5 ? 1.5 : 1;
    var maxPer = horiz ? 1e9 : (W < 600 ? 2 : W < 1000 ? 3 : 4);
    var nat = list.map(function (rr) {
      var b = bars[rr.bi], ws = b.events.map(function (e) { return slotW(e.d); }), sum = ws.reduce(function (a, c) { return a + c; }, 0);
      var chg = (!rr.plain || true) && b.time && rr.bi > 0 || (rr.bi === 0 && false);
      return { ws: ws, sum: sum, padL: 10 + (!rr.plain && b.repeatStart ? 12 : 0) + (chg ? 16 : 0), padR: 8 + (!rr.plain && b.repeatEnd ? 12 : 0), chg: chg };
    });
    var rows = [], cur = [], curW = 0;
    list.forEach(function (rr, i) {
      var w = nat[i].padL + nat[i].padR + nat[i].sum;
      if (cur.length && (cur.length >= maxPer || curW + w > W)) { rows.push(cur); cur = []; curW = 0; }
      cur.push(i); curW += w;
    });
    if (cur.length) rows.push(cur);
    var TV = { rows: [], geom: [], ev: [], curEls: [], curKey: null, curR: -1, rowH: rowH, staffTop: staffTop, yEnd: yEnd, W: W, Z: Z, horiz: horiz };
    v.TV = TV;
    var wrap = el("div", "tabhost"); v.content(wrap); TV.wrap = wrap;
    var cursor = el("div", "tabcur"); cursor.style.height = ((yEnd - staffTop + 16) * Z) + "px";
    wrap.appendChild(cursor); TV.cursor = cursor;
    rows.forEach(function (rb, ri) {
      var fixed = 0, sum = 0;
      rb.forEach(function (i) { fixed += nat[i].padL + nat[i].padR; sum += nat[i].sum; });
      var k = horiz ? 1.15 : (W - fixed) / sum;
      if (!horiz && ri === rows.length - 1 && rb.length < maxPer) k = Math.min(k, 1.45);
      k = Math.max(k, 0.5);
      var totalW = horiz ? fixed + k * sum : W;
      var div = el("div", "tabrow"), svg = sv("svg", { width: totalW * Z, height: rowH * Z, viewBox: "0 0 " + totalW + " " + rowH, role: "img", "aria-label": "Tab, row " + (ri + 1) }, div);
      TV.rows.push({ div: div, bars: rb });
      var x = 0;
      rb.forEach(function (r) {
        var rr = list[r], bi = rr.bi, b = bars[bi], n = nat[r], w = n.padL + n.padR + k * n.sum, x0 = x, x1 = x + w;
        x = x1;
        var g = sv("g", { "data-r": r, "class": "bar-g" }, svg);
        sv("rect", { x: x0, y: 0, width: w, height: rowH, "class": "t-bg" }, g);
        for (var s = 0; s < N; s++) sv("line", { x1: x0, x2: x1, y1: staffTop + s * SP, y2: staffTop + s * SP, "class": "t-line" }, g);
        sv("line", { x1: x0 + 0.5, x2: x0 + 0.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
        sv("line", { x1: x1 - 0.5, x2: x1 - 0.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
        var mid = staffTop + (N - 1) * SP / 2, rs = !rr.plain && b.repeatStart, re = !rr.plain && b.repeatEnd;
        if (rs) {
          sv("line", { x1: x0 + 2, x2: x0 + 2, y1: staffTop, y2: staffBot, "class": "t-bar thick" }, g);
          sv("line", { x1: x0 + 6.5, x2: x0 + 6.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
          sv("circle", { cx: x0 + 11, cy: mid - SP / 2, r: 1.8, "class": "t-dot" }, g); sv("circle", { cx: x0 + 11, cy: mid + SP / 2, r: 1.8, "class": "t-dot" }, g);
        }
        if (re) {
          sv("line", { x1: x1 - 2, x2: x1 - 2, y1: staffTop, y2: staffBot, "class": "t-bar thick" }, g);
          sv("line", { x1: x1 - 6.5, x2: x1 - 6.5, y1: staffTop, y2: staffBot, "class": "t-bar" }, g);
          sv("circle", { cx: x1 - 11, cy: mid - SP / 2, r: 1.8, "class": "t-dot" }, g); sv("circle", { cx: x1 - 11, cy: mid + SP / 2, r: 1.8, "class": "t-dot" }, g);
          if (b.repeatEnd > 2) sv("text", { x: x1 - 4, y: 10, "class": "t-bn", "text-anchor": "end" }, g, "×" + b.repeatEnd);
        }
        var tx = x0 + (rs ? 14 : 4);
        if (showNum) { sv("text", { x: tx, y: 10, "class": "t-bn" }, g, String(b.n)); tx += 7 + String(b.n).length * 5.6; }
        if (b.section && !rr.plain || (b.section && rr.plain)) {
          var sec = sv("text", { x: tx + 2, y: 11, "class": "t-sec" }, g, b.section);
          tx += 8 + b.section.length * 6.4;
        }
        if (b.tempo != null && bi > 0 || (b.tempo != null && bi === 0 && false)) sv("text", { x: tx + 2, y: 11, "class": "t-tempo" }, g, "♩=" + b.tempo);
        if (n.chg) {
          var tm = mt[bi].time, tx2 = x0 + (rs ? 14 : 5) + 3;
          sv("text", { x: tx2, y: mid - 2, "class": "t-ts" }, g, String(tm[0]));
          sv("text", { x: tx2, y: mid + 11, "class": "t-ts" }, g, String(tm[1]));
        }
        var offs = tl.offs[bi], ex = [], cum = 0;
        b.events.forEach(function (e, j) { ex.push(x0 + n.padL + k * cum + 7); cum += n.ws[j]; });
        ex.push(x0 + n.padL + k * n.sum + 7);
        TV.geom[r] = { row: ri, x0: x0, x1: x1, ex: ex, offs: offs, bi: bi };
        function xAt(beat) {
          var j = 0; for (var q = 0; q < b.events.length; q++) if (offs[q] <= beat + 1e-6) j = q;
          var dd = b.events[j].d;
          return ex[j] + clamp((beat - offs[j]) / dd, 0, 1) * (ex[j + 1] - ex[j]);
        }
        if (showCh) b.chords.forEach(function (c) { sv("text", { x: xAt(c.at) - 3, y: staffTop - (showPn ? 18 : 12), "class": "t-chord" }, g, prettyChord(c.name)); });
        if (b.bad && !rr.plain) {
          var fl = sv("circle", { cx: x1 - 8, cy: 6, r: 3.5, "class": "t-flag" }, g);
          sv("title", null, fl, "This bar may not be read right");
        }
        TV.ev[r] = [];
        b.events.forEach(function (e, j) {
          var els = [];
          e.notes.forEach(function (nt) {
            if (nt.s == null || nt.f == null) return;
            var y = staffTop + (nt.s - 1) * SP, txt = nt.dead ? "x" : (nt.cont ? "(" + nt.f + ")" : String(nt.f)), wd = txt.length * 7.6 + 3;
            sv("rect", { x: ex[j] - wd / 2, y: y - 6.5, width: wd, height: 13, rx: 2, "class": "t-ko" }, g);
            els.push(sv("text", { x: ex[j], y: y + 0.5, "class": "t-fret" + (nt.cont ? " tie" : "") + (nt.dead ? " dead" : "") }, g, txt));
          });
          if (showPn) { var pt = evPitchText(e); if (pt) sv("text", { x: ex[j], y: staffTop - 2, "class": "t-pn" }, g, pt); }
          if (showCt && e.notes.length) sv("text", { x: ex[j], y: yCount, "class": "t-ct" }, g, SC.countLabel(offs[j], mt[bi].time));
          if (hasLy && e.lyric) sv("text", { x: ex[j] - 3, y: yLyric, "class": "t-ly" }, g, e.lyric);
          TV.ev[r][j] = els;
        });
        drawRhythm(g, b, ex, offs, yR, yEnd, beatLen, TV.ev[r]);
      });
      var gi = 0;
      while (gi < rb.length) {
        var en = list[rb[gi]].plain ? 0 : bars[list[rb[gi]].bi].ending;
        if (!en) { gi++; continue; }
        var gj = gi; while (gj + 1 < rb.length && !list[rb[gj + 1]].plain && bars[list[rb[gj + 1]].bi].ending === en) gj++;
        var bx0 = TV.geom[rb[gi]].x0 + 2, bx1 = TV.geom[rb[gj]].x1 - 2;
        sv("path", { d: "M" + bx0 + " 14V3H" + bx1, "class": "t-end" }, svg);
        sv("text", { x: bx0 + 17, y: 12, "class": "t-endl" }, svg, en + ".");
        gi = gj + 1;
      }
      wrap.appendChild(div);
      svg.addEventListener("click", function (e) {
        var gEl = e.target.closest ? e.target.closest("[data-r]") : null;
        if (gEl && V.hooks.onBarTap) V.hooks.onBarTap(+gEl.getAttribute("data-r"), "tab");
      });
    });
    function layoutRows() { for (var r = 0; r < TV.rows.length; r++) TV.rows[r].top = TV.rows[r].div.offsetTop; }
    layoutRows();
    v.barRect = function (r) {
      var g = TV.geom[r]; if (!g) return null;
      var row = TV.rows[g.row]; if (row.top == null) layoutRows();
      return { x: g.x0 * Z, y: (row.top + 2) * Z / Z, w: (g.x1 - g.x0) * Z, h: rowH * Z - 2 };
    };
    v.cursor = function (loc, jump) {
      var r = V.rOf(loc);
      if (r == null || !TV.geom[r]) return;
      var g = TV.geom[r], row = TV.rows[g.row], b = S.sc.measures[loc.bar], dd = b.events[loc.ev].d;
      if (row.top == null) layoutRows();
      var x = g.ex[loc.ev] + clamp((loc.off - g.offs[loc.ev]) / dd, 0, 1) * (g.ex[loc.ev + 1] - g.ex[loc.ev]);
      TV.cursor.style.transform = "translate(" + (x * Z - 8).toFixed(1) + "px," + ((row.top + staffTop * Z - 8)).toFixed(1) + "px)";
      var key = r + ":" + loc.ev;
      if (TV.curKey !== key) {
        TV.curEls.forEach(function (n) { n.classList.remove("cur"); });
        TV.curEls = (TV.ev[r] && TV.ev[r][loc.ev]) || [];
        TV.curEls.forEach(function (n) { n.classList.add("cur"); });
        TV.curKey = key;
      }
      if (horiz) { V.followX(v, x * Z, false); return; }
      if (TV.curR !== g.row) {
        TV.curR = g.row;
        var vTop = surf.getBoundingClientRect().top + row.top * 1;
        if (S.playing || vTop < 110 || vTop + rowH * Z > window.innerHeight - (S.dockH || 150)) V.scrollIntoPlace(vTop + window.scrollY, false);
      }
    };
    // tab cursor's top: rows are blocks, offsetTop is in CSS px (already scaled by Z through svg height)
    v.barRect = function (r) {
      var g = TV.geom[r]; if (!g) return null;
      var row = TV.rows[g.row]; if (row.top == null) layoutRows();
      return { x: g.x0 * Z, y: row.top, w: (g.x1 - g.x0) * Z, h: rowH * Z };
    };
    v.destroy = function () {};
    return v;
  };
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
            if (k > j && q === k) { xa = ex[q] - 6; xb = ex[q]; } else { xa = ex[q]; xb = ex[q] + 6; }
          }
          elsList[q].push(sv("line", { x1: xa, x2: xb, y1: y, y2: y, "class": "t-beam" }, g));
          q = r + 1;
        }
      }
      j = k + 1;
    }
    for (j = 0; j < evs.length; j++) {
      if (!isTrip(evs[j].d)) continue;
      var sum = 0, kk = j;
      while (kk < evs.length && isTrip(evs[kk].d)) { sum += evs[kk].d; kk++; if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) break; }
      if (Math.abs(sum * 2 - Math.round(sum * 2)) < 0.02) {
        sv("text", { x: (ex[j] + ex[kk - 1]) / 2, y: yEnd + 14, "class": "t-trip" }, g, "3");
        j = kk - 1;
      } else j = kk - 1;
    }
  }

  /* ================================================================ Chords view: a lead-sheet grid */
  V.chords = function (host) {
    var sc = S.sc, tl = S.tl, R = S.R, d = D(), list = R.list, Z = (d.zoom || 100) / 100, horiz = d.layout === "horizontal", mt = tl.meta;
    var v = V.frame(host, "chords", horiz);
    var W = Math.floor(host.clientWidth) || 340, cols = horiz ? 0 : (W / Z < 520 ? 2 : 4);
    var grid = el("div", "cgrid" + (horiz ? " h" : ""));
    grid.style.setProperty("--z", Z);
    if (!horiz) grid.style.gridTemplateColumns = "repeat(" + cols + ", minmax(0, 1fr))";
    v.content(grid);
    var cells = [], prevSec = null;
    list.forEach(function (rr, r) {
      var b = sc.measures[rr.bi], len = mt[rr.bi].len, ce = el("div", "cb"), plain = rr.plain;
      ce.setAttribute("data-r", r);
      if (!plain && b.repeatStart) ce.classList.add("rs");
      if (!plain && b.repeatEnd) ce.classList.add("re");
      var top = el("div", "cb-top");
      if (d.barNums !== false) top.appendChild(el("span", "cb-n", String(b.n)));
      if (b.section) top.appendChild(el("span", "cb-sec", V.esc(b.section)));
      if (!plain && b.ending) top.appendChild(el("span", "cb-end", b.ending + "."));
      if (b.tempo != null && rr.bi > 0) top.appendChild(el("span", "cb-tp", "♩=" + b.tempo));
      if (rr.bi > 0 && b.time) top.appendChild(el("span", "cb-ts", mt[rr.bi].time[0] + "/" + mt[rr.bi].time[1]));
      ce.appendChild(top);
      var body = el("div", "cb-body");
      if (b.chords.length && d.chords !== false) {
        b.chords.forEach(function (c) {
          var cs = el("span", "cb-c", V.esc(prettyChord(c.name)));
          cs.style.left = (Math.min(c.at, len - 0.5) / len * 100) + "%";
          body.appendChild(cs);
        });
      } else body.appendChild(el("span", "cb-none", "·"));
      if (!plain && b.repeatEnd > 2) body.appendChild(el("span", "cb-x", "×" + b.repeatEnd));
      ce.appendChild(body);
      var pr = el("div", "cb-prog"); ce.appendChild(pr); ce._prog = pr; ce._len = len;
      if (b.bad && !plain) ce.appendChild(el("i", "cb-flag"));
      grid.appendChild(ce); cells[r] = ce;
    });
    grid.addEventListener("click", function (e) {
      var c = e.target.closest ? e.target.closest(".cb") : null;
      if (c && V.hooks.onBarTap) V.hooks.onBarTap(+c.getAttribute("data-r"), "chords");
    });
    var curCell = null;
    v.barRect = function (r) {
      var c = cells[r]; if (!c) return null;
      return { x: c.offsetLeft, y: c.offsetTop, w: c.offsetWidth, h: c.offsetHeight };
    };
    v.cursor = function (loc, jump) {
      var r = V.rOf(loc); if (r == null || !cells[r]) return;
      var c = cells[r];
      if (curCell !== c) {
        if (curCell) { curCell.classList.remove("cur"); curCell._prog.style.opacity = "0"; }
        c.classList.add("cur"); curCell = c;
        if (horiz) V.followX(v, c.offsetLeft, true);
        else { var top = c.getBoundingClientRect().top; if (jump || top < 130 || top > window.innerHeight - (S.dockH || 150) - 60 || (S.playing && top > window.innerHeight * 0.55)) V.scrollIntoPlace(top + window.scrollY, !!jump && false); }
      }
      c._prog.style.opacity = "1";
      c._prog.style.left = (clamp(loc.off / c._len, 0, 1) * 100) + "%";
    };
    v.destroy = function () {};
    return v;
  };
  V.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ================================================================ Page view: the photos, with the bar highlighted */
  V.page = function (host) {
    var piece = S.piece, sc = S.sc, v = { kind: "page", host: host };
    host.innerHTML = "";
    var wrap = el("div", "pages"); host.appendChild(wrap);
    v.surf = wrap; v.ov = null;
    var ids = piece.pages || [];
    if (!ids.length) { host.appendChild(el("p", "msg", "No pages")); v.cursor = function () {}; v.paintLoop = function () {}; v.barRect = function () { return null; }; v.destroy = function () {}; return v; }
    var pagesEl = [];
    S.pageUrls = S.pageUrls || [];
    S.pageUrls.forEach(function (u) { URL.revokeObjectURL(u); }); S.pageUrls = [];
    ids.forEach(function (id, i) {
      var box = el("div", "pg"), img = el("img"), ov = el("div", "pg-ov");
      img.alt = "Page " + (i + 1); img.decoding = "async";
      box.appendChild(img); box.appendChild(ov); wrap.appendChild(box);
      var line = el("div", "pg-line"), hi = el("div", "pg-hi");
      ov.appendChild(hi); ov.appendChild(line);
      pagesEl[i] = { box: box, img: img, ov: ov, hi: hi, line: line, loops: [] };
      PA.store.pgGet(id).then(function (r) {
        if (!r || S.piece !== piece) return;
        var u = URL.createObjectURL(r.blob); S.pageUrls.push(u); img.src = u;
        if (r.w && r.h) { img.width = r.w; img.height = r.h; }
      }).catch(function () {});
      box.addEventListener("click", function (e) {
        // tap a bar region to seek there
        var rc = box.getBoundingClientRect(), fx = (e.clientX - rc.left) / rc.width, fy = (e.clientY - rc.top) / rc.height;
        var best = -1;
        for (var bi = 0; bi < sc.measures.length; bi++) {
          var bx = sc.measures[bi].box;
          if (!bx || (bx.pg || 0) !== i) continue;
          if (fx >= bx.x && fx <= bx.x + bx.w && fy >= bx.y && fy <= bx.y + bx.h) { best = bi; break; }
        }
        if (best >= 0 && V.hooks.onSeek) {
          var pi = EN.firstPassOf(S.tl, best);
          if (pi >= 0) V.hooks.onSeek(S.tl.passes[pi].start);
        }
      });
    });
    var curBar = -1, curPg = -1;
    function place(elm, bx) {
      elm.style.cssText = "left:" + (bx.x * 100) + "%;top:" + (bx.y * 100) + "%;width:" + (bx.w * 100) + "%;height:" + (bx.h * 100) + "%";
    }
    v.paintLoop = function () {
      pagesEl.forEach(function (p) { p.loops.forEach(function (l) { l.remove(); }); p.loops = []; });
      var L = S.prefs.loop;
      if (!L) return;
      for (var bi = L.a; bi <= L.b; bi++) {
        var bx = sc.measures[bi] && sc.measures[bi].box;
        if (!bx || !pagesEl[bx.pg || 0]) continue;
        var l = el("div", "pg-loop"); place(l, bx); pagesEl[bx.pg || 0].ov.appendChild(l); pagesEl[bx.pg || 0].loops.push(l);
      }
    };
    v.barRect = function () { return null; };
    v.cursor = function (loc, jump) {
      var bx = sc.measures[loc.bar] && sc.measures[loc.bar].box;
      pagesEl.forEach(function (p) { p.hi.style.display = "none"; p.line.style.display = "none"; });
      if (!bx || !pagesEl[bx.pg || 0]) return;
      var p = pagesEl[bx.pg || 0], len = S.tl.passes[loc.pass].len || 1;
      place(p.hi, bx); p.hi.style.display = "block";
      var fx = bx.x + bx.w * clamp(loc.off / len, 0, 1);
      p.line.style.cssText = "display:block;left:" + (fx * 100) + "%;top:" + (bx.y * 100) + "%;height:" + (bx.h * 100) + "%";
      if (curBar !== loc.bar || jump) {
        curBar = loc.bar;
        var rc = p.hi.getBoundingClientRect();
        if (jump || rc.top < 130 || rc.bottom > window.innerHeight - (S.dockH || 150) || (S.playing && rc.top > window.innerHeight * 0.6)) V.scrollIntoPlace(rc.top + window.scrollY, !!jump && false);
      }
    };
    v.destroy = function () { S.pageUrls.forEach(function (u) { URL.revokeObjectURL(u); }); S.pageUrls = []; };
    v.paintLoop();
    return v;
  };
})();
