/* PA.fix: Fix mode (the pencil next to Display and Mixer). Not a notation editor: a few quick fixes and an AI re-read. Needs app.js (PA.app), score.js, views.js.

   In Fix mode a tap on a note (Score, Tab, Notation) selects it and opens a compact panel above the transport:
     - tab parts: fret - / +, string up / down (same pitch); other parts: semitone and octave - / +
     - duration (sixteenth ... whole, dotted, triplet), rest <-> note, delete note, add a note to make a chord (pitch picker), tie
     - the bar: chord symbols, clear to a whole rest, "Read again" (photo pieces; the AI re-reads this bar, or the looped bars)
   A tap on the bar itself (or in Chords) selects the bar. Edits change the stored score (piece.score), re-check the bar's length (amber dot), rebuild the
   timeline and views without losing the position, and save. Undo / redo (this session, per piece; Ctrl/Cmd+Z, Shift+Ctrl/Cmd+Z).
   "Read again": PA.transcribe.rereadBars -> a before / after preview: the bars are looped, Before | After switches the score, Keep makes it an
   edit (undoable), Discard puts the old bars back. A preview is never saved: the store's save is wrapped to write the old bars.
   API: PA.fix.toggle(on), PA.fix.on, PA.fix.sel, PA.fix.undo(), PA.fix.redo(), PA.fix.busy(), PA.fix.preview, PA.fix.ops (the edit functions, for tests). */
(function () {
  "use strict";
  var PA = window.PA, SC = PA.score, ST = PA.store, A = PA.app, S = PA.S, V = PA.views, EN = PA.engine;
  if (!A) return;
  var $ = function (id) { return document.getElementById(id); };
  var el = A.el, esc = A.esc, clamp = SC.clamp;
  var F = PA.fix = { on: false, sel: null, undoStack: [], redoStack: [], preview: null, reading: null, picker: null };

  function svgi(inner, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>"; }
  var IC = {
    pencil: svgi('<path d="M4 20l1-4.500L16.500 4a2.100 2.100 0 0 1 3 3L8 18.500z"/><path d="M14.500 6l3.500 3.500"/>', 1.8),
    undo: svgi('<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', 1.9),
    redo: svgi('<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>', 1.9),
    trash: svgi('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', 1.8),
    plus: svgi('<path d="M12 5v14M5 12h14"/>', 2.200), minus: svgi('<path d="M5 12h14"/>', 2.200),
    up: svgi('<path d="m6 15 6-6 6 6"/>', 2.200), down: svgi('<path d="m6 9 6 6 6-6"/>', 2.200),
    tie: svgi('<path d="M4 9c2 7 14 7 16 0"/>', 2),
    rest: svgi('<path d="M9 4l5 5-5 5 4 4"/>', 1.9),
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    reread: svgi('<path d="M20 11a8 8 0 0 0-14.500-4"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.500 4"/><path d="M20 20v-4h-4"/>', 1.8),
    chord: svgi('<path d="M5 18V6l7 8 7-8v12"/>', 1.8),
    clear: svgi('<rect x="4" y="9" width="16" height="6" rx="1" fill="currentColor"/>', 1.6)
  };
  /* a note value drawn small: head, stem, flags, dot */
  function noteIcon(base, dot) {
    var filled = base < 2 - 1e-6, stem = base < 4 - 1e-6, flags = base <= 0.25 + 1e-6 ? 2 : base <= 0.5 + 1e-6 ? 1 : 0;
    var s = '<svg viewBox="0 0 20 20" aria-hidden="true">';
    s += '<ellipse cx="7" cy="14.500" rx="3.600" ry="2.600" transform="rotate(-20 7 14.500)" ' + (filled ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.600"') + "/>";
    if (stem) s += '<path d="M10.300 13.600V3" stroke="currentColor" stroke-width="1.600" stroke-linecap="round" fill="none"/>';
    for (var i = 0; i < flags; i++) s += '<path d="M10.300 ' + (3 + i * 3.400) + 'q4.500 1.800 3.500 6" stroke="currentColor" stroke-width="1.500" stroke-linecap="round" fill="none"/>';
    if (dot) s += '<circle cx="14.600" cy="15.200" r="1.300" fill="currentColor"/>';
    return s + "</svg>";
  }
  var DURS = [[0.25, 0, "Sixteenth"], [0.5, 0, "Eighth"], [0.5, 1, "Dotted eighth"], [1, 0, "Quarter"], [1, 1, "Dotted quarter"], [2, 0, "Half"], [2, 1, "Dotted half"], [4, 0, "Whole"]];
  function durValue(x) { return x[0] * (x[1] ? 1.5 : 1); }
  function isTrip(d) { var x = d * 12; return Math.abs(x - Math.round(x)) < 0.02 && Math.round(x) % 3 !== 0; }

  /* ================================================================ data helpers */
  function score() { return S.score; }
  function meas(bi) { return S.score.measures[bi]; }
  function barKey(bi) { return SC.meta(S.score)[bi].key; }
  function isTabNote(nt) { var sc = S.score; return sc.strings > 0 && sc.tuning && nt && nt.s != null && nt.f != null && nt.drum == null; }
  function openMidi(s) { var sc = S.score; return sc.tuning[sc.strings - s]; }
  function soundOf(nt) { return SC.noteMidi(nt) + SC.transOf(S.score); }
  function spellFor(bi, writtenMidi) { return SC.spell(writtenMidi, SC.flatKey(barKey(bi))); }
  function selEv() { var s = F.sel; return s && s.j != null && meas(s.bi) ? meas(s.bi).events[s.j] : null; }
  function selNote() { var e = selEv(), s = F.sel; return e && s.k != null && s.k >= 0 ? e.notes[s.k] : null; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ================================================================ edit, undo, redo */
  function recheck(bi) {
    var sc = S.score, b = sc.measures[bi], mt = SC.meta(sc);
    b.sum = SC.barSum(b);
    var ok = SC.expectedLens(sc, bi, mt).some(function (L) { return Math.abs(b.sum - L) < 0.02; });
    if (ok) delete b.bad; else b.bad = true;
  }
  function refreshFlags() {
    var p = S.piece; if (!p) return;
    p.flags = p.flags || {};
    p.flags.off = S.score.measures.filter(function (b) { return b.bad; }).map(function (b) { return b.n; });
  }
  function keepRender(then) {
    var y = window.scrollY, host = $("vPlayer"), h = host.offsetHeight;
    host.style.minHeight = h + "px";
    A.rebuild(false);
    A.renderView();
    var v = S.vobj, done = function () { host.style.minHeight = ""; window.scrollTo(0, y); paintSel(); if (then) then(); };
    window.scrollTo(0, y);
    (v && v.ready ? v.ready : Promise.resolve()).then(done, done);
  }
  function commit(bis, noSave) {
    var sc = S.score;
    SC.markTies(sc);
    bis.forEach(recheck);
    refreshFlags();
    S.piece.updated = Date.now();
    if (!noSave) ST.save();
    if (S.startPos > S.tl.total) S.startPos = 0;
    keepRender();
    render();
  }
  function edit(bis, fn) {
    if (F.preview || F.reading) return false;
    if (S.playing) A.pausePlay(true);
    var before = bis.map(function (i) { return JSON.stringify(meas(i)); }), sb = F.sel ? { bi: F.sel.bi, r: F.sel.r, j: F.sel.j, k: F.sel.k } : null;
    fn();
    bis.forEach(function (i) { var b = meas(i); b.sum = SC.barSum(b); });
    var after = bis.map(function (i) { return JSON.stringify(meas(i)); });
    if (before.join("|") === after.join("|")) { render(); return false; }
    F.undoStack.push({ bis: bis, before: before, after: after, sel: sb });
    if (F.undoStack.length > 100) F.undoStack.shift();
    F.redoStack = [];
    commit(bis);
    return true;
  }
  function applyState(entry, which) {
    var sc = S.score;
    entry.bis.forEach(function (i, n) { sc.measures[i] = JSON.parse(entry[which][n]); });
    commit(entry.bis);
  }
  F.undo = function () {
    if (F.preview || F.reading || !F.undoStack.length) return;
    var e = F.undoStack.pop(); F.redoStack.push(e);
    if (e.sel) F.sel = { bi: e.sel.bi, r: e.sel.r, j: e.sel.j, k: e.sel.k };
    applyState(e, "before");
  };
  F.redo = function () {
    if (F.preview || F.reading || !F.redoStack.length) return;
    var e = F.redoStack.pop(); F.undoStack.push(e);
    if (e.sel) F.sel = { bi: e.sel.bi, r: e.sel.r, j: e.sel.j, k: e.sel.k };
    applyState(e, "after");
  };

  /* ================================================================ the quick fixes */
  var ops = F.ops = {};
  ops.fret = function (d) {
    var nt = selNote(), s = F.sel;
    if (!isTabNote(nt)) return;
    var f = nt.f + d;
    if (f < 0 || f > 24) return;
    edit([s.bi], function () { nt = selNote(); nt.f = f; nt.pitch = spellFor(s.bi, openMidi(nt.s) + f - SC.transOf(S.score)); });
  };
  ops.string = function (d) {
    var nt = selNote(), s = F.sel, ev = selEv();
    if (!isTabNote(nt)) return;
    var s2 = nt.s + d, snd = soundOf(nt), f2;
    if (s2 < 1 || s2 > S.score.strings) return;
    f2 = snd - openMidi(s2);
    if (f2 < 0 || f2 > 24) return;
    if (ev.notes.some(function (n, i) { return i !== s.k && n.s === s2; })) return;
    edit([s.bi], function () { nt = selNote(); nt.s = s2; nt.f = f2; });
  };
  ops.pitch = function (semis) {
    var nt = selNote(), s = F.sel;
    if (!nt || nt.drum != null || isTabNote(nt)) return;
    var m = SC.noteMidi(nt) + semis;
    if (m < 12 || m > 120) return;
    edit([s.bi], function () { nt = selNote(); nt.pitch = spellFor(s.bi, m); delete nt.s; delete nt.f; });
  };
  ops.duration = function (d) {
    var ev = selEv(), s = F.sel;
    if (!ev) return;
    var trip = isTrip(ev.d);
    edit([s.bi], function () { selEv().d = trip ? d * 2 / 3 : d; });
  };
  ops.triplet = function () {
    var ev = selEv(), s = F.sel;
    if (!ev) return;
    var trip = isTrip(ev.d);
    edit([s.bi], function () { var e = selEv(); e.d = trip ? e.d * 1.5 : e.d * 2 / 3; });
  };
  function defaultNote(bi, j) {
    var sc = S.score, b, e, k, i;
    for (i = bi; i >= Math.max(0, bi - 8); i--) {
      b = sc.measures[i];
      for (e = (i === bi ? j - 1 : b.events.length - 1); e >= 0; e--) {
        var ns = b.events[e].notes.filter(function (n) { return n.drum == null; });
        if (ns.length) { var n0 = ns[0], o = { pitch: n0.pitch }; if (n0.s != null) o.s = n0.s; if (n0.f != null) o.f = n0.f; return o; }
      }
    }
    if (SC.isDrumMain(sc)) return { pitch: "C4", drum: 38 };
    if (sc.strings > 0 && sc.tuning) return { pitch: spellFor(bi, sc.tuning[0] - SC.transOf(sc)), s: sc.strings, f: 0 };
    return { pitch: sc.clef === "bass" ? "C3" : "C4" };
  }
  ops.restToggle = function () {
    var ev = selEv(), s = F.sel;
    if (!ev) return;
    var had = ev.notes.length > 0;
    edit([s.bi], function () {
      var e = selEv();
      if (had) { e.notes = []; s.k = -1; }
      else { e.notes = [defaultNote(s.bi, s.j)]; s.k = 0; }
    });
  };
  ops.del = function () {
    var ev = selEv(), s = F.sel;
    if (!ev || !selNote()) return;
    edit([s.bi], function () {
      var e = selEv(); e.notes.splice(s.k, 1);
      s.k = e.notes.length ? Math.min(s.k, e.notes.length - 1) : -1;
    });
  };
  ops.tie = function () {
    var nt = selNote(), s = F.sel;
    if (!nt || nt.drum != null) return;
    edit([s.bi], function () { var n = selNote(); if (n.tie) delete n.tie; else n.tie = true; });
  };
  /* add a note (written pitch, midi) to the selected event: a chord. Tab parts: the best free string. */
  ops.addNote = function (midi) {
    var ev = selEv(), s = F.sel, sc = S.score;
    if (!ev) return false;
    if (ev.notes.some(function (n) { return n.drum == null && SC.noteMidi(n) === midi; })) return false;
    var nn = { pitch: spellFor(s.bi, midi) };
    if (sc.strings > 0 && sc.tuning) {
      var snd = midi + SC.transOf(sc), best = null, used = {};
      ev.notes.forEach(function (n) { if (n.s != null) used[n.s] = 1; });
      for (var st = 1; st <= sc.strings; st++) {
        if (used[st]) continue;
        var f = snd - openMidi(st);
        if (f < 0 || f > 24) continue;
        if (!best || f < best.f) best = { s: st, f: f };
      }
      if (!best) { A.showErr("That note isn't playable on a free string."); return false; }
      nn.s = best.s; nn.f = best.f;
    }
    return edit([s.bi], function () {
      var e = selEv();
      e.notes.push(nn);
      e.notes.sort(function (a, b) { return SC.noteMidi(a) - SC.noteMidi(b); });
      s.k = e.notes.indexOf(nn);
    });
  };
  ops.clearBar = function () {
    var s = F.sel; if (!s) return;
    edit([s.bi], function () {
      var b = meas(s.bi), sc = S.score, lens = SC.expectedLens(sc, s.bi), sum = SC.barSum(b);
      var L = lens.filter(function (x) { return Math.abs(x - sum) < 0.02; })[0] || lens[0];
      b.events = [{ d: L, notes: [] }];
      delete b.bad;
      s.j = 0; s.k = -1;
    });
  };
  ops.setChords = function (list) {
    var s = F.sel; if (!s) return;
    edit([s.bi], function () { meas(s.bi).chords = list; });
  };

  /* ================================================================ selecting */
  function select(r, j, strK) {
    if (F.preview || F.reading) return;
    var e = S.R.list[r]; if (!e) return;
    var bi = e.bi, b = meas(bi);
    if (j == null || !b.events[j]) F.sel = { bi: bi, r: r, j: null, k: null };
    else {
      var ev = b.events[j], k = ev.notes.length ? 0 : -1;
      if (strK != null) { for (var i = 0; i < ev.notes.length; i++) if (ev.notes[i].s === strK) { k = i; break; } }
      F.sel = { bi: bi, r: r, j: j, k: k };
    }
    F.picker = null;
    render(); paintSel();
  }
  F.select = select;

  function tabHit(e) {
    var v = S.vobj, TV = v && v.TV, g = e.target.closest && e.target.closest("[data-r]");
    if (!TV || !g) return null;
    var r = +g.getAttribute("data-r"), geo = TV.geom[r], svg = g.ownerSVGElement;
    if (!geo || !svg) return null;
    var rc = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal, k = rc.width / (vb.width || rc.width);
    var lx = (e.clientX - rc.left) / k, ly = (e.clientY - rc.top) / k;
    var n = S.sc.measures[geo.bi].events.length, best = -1, bd = 1e9;
    for (var j = 0; j < n; j++) {
      var dx = Math.abs(lx - geo.ex[j]), half = Math.max(11, (geo.ex[j + 1] - geo.ex[j]) / 2);
      if (dx <= half && dx < bd) { bd = dx; best = j; }
    }
    if (best < 0 || ly < TV.staffTop - 10 || ly > TV.yEnd + 16) return { r: r };
    var N = S.sc.strings || 4, str = clamp(Math.round((ly - TV.staffTop) / 13) + 1, 1, N);
    return { r: r, j: best, s: str };
  }
  function onClick(e) {
    if (!F.on || S.view === "page") return;
    if (V.hooks.dragAt && Date.now() - V.hooks.dragAt < 350) return;
    if (e.target.closest && (e.target.closest(".lp-h") || e.target.closest("#fixP"))) return;
    var v = S.vobj, hit = null, kind = v && v.viewKind;
    if (!v) return;
    if (kind === "tab") hit = tabHit(e);
    else if (kind === "chords") { var c = e.target.closest && e.target.closest(".cb"); if (c) hit = { r: +c.getAttribute("data-r") }; }
    else if (kind === "score" || kind === "notation") {
      var pe = e.target.closest && e.target.closest("[data-pe]");
      if (pe) {
        var p = pe.getAttribute("data-pe").split(":");
        if (p[0] === "main") hit = { r: +p[1], j: +p[2], s: pe.getAttribute("data-s") != null ? +pe.getAttribute("data-s") : null };
        else { e.stopPropagation(); e.preventDefault(); return; }
      } else { var r2 = v.rAt(e.clientX, e.clientY); if (r2 >= 0) hit = { r: r2 }; }
    }
    if (!hit) return;
    e.stopPropagation(); e.preventDefault();
    select(hit.r, hit.j, hit.s);
  }

  /* the selected note or bar drawn in the view */
  function paintSel() {
    var v = S.vobj;
    Array.prototype.forEach.call(document.querySelectorAll(".fx-box"), function (n) { n.remove(); });
    if (!F.on || !F.sel || !v || !v.surf || S.view === "page") return;
    var s = F.sel, r = s.r, box = null, Z = ((S.prefs.display && S.prefs.display.zoom) || 100) / 100, sr = v.surf.getBoundingClientRect();
    if (S.R.list[r] == null || S.R.list[r].bi !== s.bi) { for (var q = 0; q < S.R.list.length; q++) if (S.R.list[q].bi === s.bi) { r = s.r = q; break; } }
    var br = v.barRect && v.barRect(r);
    if (s.j == null) { if (br) box = { x: br.x, y: br.y, w: br.w, h: br.h }; }
    else if (v.viewKind === "tab" && v.TV && v.TV.geom[r]) {
      var geo = v.TV.geom[r], row = v.TV.rows[geo.row], N = S.sc.strings || 4;
      box = { x: (geo.ex[s.j] - 10) * Z, y: row.top + (v.TV.staffTop - 9) * Z, w: 20 * Z, h: ((N - 1) * 13 + 18) * Z };
    } else if (v.NV && v.NV.els && v.NV.els.main) {
      var els = ((v.NV.els.main[r] || [])[s.j] || []).concat((v.NV.tabEls && v.NV.tabEls[r] && v.NV.tabEls[r][s.j]) || []), u = null;
      els.forEach(function (n) { var b = n.getBoundingClientRect(); if (!b.width && !b.height) return; u = u ? { l: Math.min(u.l, b.left), t: Math.min(u.t, b.top), r: Math.max(u.r, b.right), b: Math.max(u.b, b.bottom) } : { l: b.left, t: b.top, r: b.right, b: b.bottom }; });
      if (u) box = { x: u.l - sr.left - 4, y: u.t - sr.top - 4, w: u.r - u.l + 8, h: u.b - u.t + 8 };
      else if (br) box = { x: br.x, y: br.y, w: br.w, h: br.h };
    }
    if (!box) return;
    var d = el("div", "fx-box" + (s.j == null ? " bar" : ""));
    d.style.cssText = "left:" + box.x.toFixed(1) + "px;top:" + box.y.toFixed(1) + "px;width:" + box.w.toFixed(1) + "px;height:" + box.h.toFixed(1) + "px";
    v.surf.appendChild(d);
  }

  /* ================================================================ the panel */
  var panel = null;
  function ensurePanel() {
    if (panel) return panel;
    panel = el("div", "fixp"); panel.id = "fixP"; panel.hidden = true;
    var dp = $("dockPlay"); dp.insertBefore(panel, $("dockSlot"));
    return panel;
  }
  function chip(label, attrs, pressed, cls, aria) {
    return '<button class="chip ' + (cls || "") + '" type="button" ' + attrs + (pressed != null ? ' aria-pressed="' + !!pressed + '"' : "") + (aria ? ' aria-label="' + esc(aria) + '"' : "") + ">" + label + "</button>";
  }
  function noteLabel(bi, j, k) {
    var nt = S.sc.measures[bi].events[j].notes[k];
    if (!nt) return "";
    if (nt.drum != null) return "Drum " + nt.drum;
    return nt.pitch.replace(/#/g, "♯").replace(/([A-G])b/, "$1♭");
  }
  var NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"], NAMES_F = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  function pickerHtml() {
    var p = F.picker, flat = SC.flatKey(barKey(F.sel.bi)), nm = flat ? NAMES_F : NAMES;
    var h = '<div class="fxr"><span class="fxl">Add note</span><span class="fxv" id="fxOct">' + (p.oct) + '</span>' + chip(IC.minus, 'data-poct="-1"', null, "ic", "Octave down") + chip(IC.plus, 'data-poct="1"', null, "ic", "Octave up") + "</div>";
    h += '<div class="fxr pk">' + nm.map(function (n, i) { return chip(n, 'data-pp="' + i + '"', p.pc === i, "sm"); }).join("") + "</div>";
    h += '<div class="fxr">' + chip("Cancel", 'id="fxPkNo"', null, "") + chip("Add", 'id="fxPkOk"', true, "pri") + "</div>";
    return h;
  }
  function headHtml(label) {
    return '<div class="fxh"><b id="fxLbl">' + esc(label) + "</b><span>" +
      chip(IC.undo, 'id="fxUndo"' + (F.undoStack.length ? "" : " disabled"), null, "ic", "Undo") + chip(IC.redo, 'id="fxRedo"' + (F.redoStack.length ? "" : " disabled"), null, "ic", "Redo") +
      chip(IC.x, 'id="fxClose"', null, "ic", "Close fix") + "</span></div>";
  }
  function canReread() {
    var p = S.piece;
    return !!(p && p.pages && p.pages.length && S.score.source !== "musicxml" && S.score.source !== "guitarpro" && S.score.source !== "midi" && window.PA.transcribe && PA.transcribe.rereadBars);
  }
  function loopRange() {
    var L = S.prefs.loop;
    return L && L.b > L.a ? { a: L.a, b: L.b } : null;
  }
  function render() {
    var p = ensurePanel();
    if (!F.on) { p.hidden = true; p.innerHTML = ""; A.layout(); return; }
    p.hidden = false;
    var h = "", s = F.sel;
    if (F.reading) {
      p.innerHTML = '<div class="fxh"><span class="busy"><span class="spin"></span><span id="fxStatus">' + esc(F.reading.status) + '</span></span>' + chip("Cancel", 'id="fxCancel"', null, "") + "</div>";
      p.querySelector("#fxCancel").onclick = function () { if (F.reading && F.reading.ctl) F.reading.ctl.abort(); };
      A.layout(); return;
    }
    if (F.preview) {
      var pv = F.preview;
      p.innerHTML = '<div class="fxh"><b>' + (pv.idxs.length > 1 ? "Bars " + meas(pv.idxs[0]).n + "–" + meas(pv.idxs[pv.idxs.length - 1]).n : "Bar " + meas(pv.idxs[0]).n) + "</b>" +
        '<span class="seg" id="fxBA" role="group" aria-label="Before or after">' +
        '<button type="button" data-w="before" aria-pressed="' + (pv.showing === "before") + '">Before</button><button type="button" data-w="after" aria-pressed="' + (pv.showing === "after") + '">After</button></span></div>' +
        '<div class="fxr">' + chip("Discard", 'id="fxDiscard"', null, "") + chip("Keep", 'id="fxKeep"', true, "pri") + "</div>";
      Array.prototype.forEach.call(p.querySelectorAll("[data-w]"), function (b) { b.onclick = function () { showVersion(b.getAttribute("data-w")); }; });
      p.querySelector("#fxKeep").onclick = keepPreview; p.querySelector("#fxDiscard").onclick = discardPreview;
      A.layout(); return;
    }
    if (!s || !meas(s.bi)) {
      p.innerHTML = headHtml("Tap a note or bar");
      bindHead(p); A.layout(); return;
    }
    var b = meas(s.bi), ev = s.j != null ? b.events[s.j] : null, nt = ev && s.k >= 0 ? ev.notes[s.k] : null;
    h += headHtml("Bar " + b.n + (ev ? " · " + (nt ? noteLabel(s.bi, s.j, s.k) : "rest") : ""));
    if (F.picker) { p.innerHTML = h + pickerHtml(); bindHead(p); bindPicker(p); A.layout(); return; }
    if (ev) {
      if (ev.notes.length > 1) h += '<div class="fxr" id="fxNotes">' + ev.notes.map(function (n, i) { return chip(noteLabel(s.bi, s.j, i), 'data-k="' + i + '"', i === s.k, "sm"); }).join("") + "</div>";
      if (nt && nt.drum == null) {
        if (isTabNote(nt)) {
          h += '<div class="fxr"><span class="fxl">Fret</span>' + chip(IC.minus, 'id="fxFm"', null, "ic", "Fret down") + '<span class="fxv" id="fxFret">' + nt.f + "</span>" + chip(IC.plus, 'id="fxFp"', null, "ic", "Fret up") +
            '<span class="fxl">String</span>' + chip(IC.up, 'id="fxSu"', null, "ic", "String up") + '<span class="fxv" id="fxStr">' + nt.s + "</span>" + chip(IC.down, 'id="fxSd"', null, "ic", "String down") + "</div>";
        } else {
          h += '<div class="fxr"><span class="fxl">Pitch</span>' + chip(IC.minus, 'id="fxPm"', null, "ic", "Semitone down") + '<span class="fxv" id="fxPitch">' + noteLabel(s.bi, s.j, s.k) + "</span>" + chip(IC.plus, 'id="fxPp"', null, "ic", "Semitone up") +
            chip("8vb", 'id="fxOm"', null, "sm", "Octave down") + chip("8va", 'id="fxOp"', null, "sm", "Octave up") + "</div>";
        }
      }
      var trip = isTrip(ev.d), base = trip ? ev.d * 1.5 : ev.d;
      h += '<div class="fxr dur" id="fxDur">' + DURS.map(function (x, i) { return chip(noteIcon(x[0], x[1]), 'data-d="' + i + '"', Math.abs(durValue(x) - base) < 0.01, "ic", x[2]); }).join("") + chip("3", 'id="fxTrip"', trip, "ic", "Triplet") + "</div>";
      h += '<div class="fxr">' + chip(IC.rest + (ev.notes.length ? "" : ""), 'id="fxRest"', !ev.notes.length, "ic", ev.notes.length ? "Make a rest" : "Make a note") +
        (nt ? chip(IC.trash, 'id="fxDel"', null, "ic", "Delete note") : "") + (ev.notes.length || true ? chip(IC.plus + "<small>Note</small>", 'id="fxAdd"', null, "", "Add a note") : "") +
        (nt && nt.drum == null ? chip(IC.tie, 'id="fxTie"', !!nt.tie, "ic", "Tie") : "") + "</div>";
    }
    h += '<div class="fxr fb">' + chip(IC.chord + "<small>Chords</small>", 'id="fxChords"', null, "", "Chord symbols") + chip(IC.clear + "<small>Clear</small>", 'id="fxClear"', null, "", "Clear bar to a rest");
    if (canReread()) {
      h += chip(IC.reread + "<small>Read again</small>", 'id="fxRead"', null, "", "Read this bar again");
      var lr = loopRange();
      if (lr) h += chip(IC.reread + "<small>Bars " + meas(lr.a).n + "–" + meas(lr.b).n + "</small>", 'id="fxReadR"', null, "", "Read the looped bars again");
    }
    h += "</div>";
    p.innerHTML = h;
    bindHead(p);
    var q = function (x) { return p.querySelector(x); };
    Array.prototype.forEach.call(p.querySelectorAll("[data-k]"), function (bt) { bt.onclick = function () { F.sel.k = +bt.getAttribute("data-k"); render(); paintSel(); }; });
    if (q("#fxFm")) { q("#fxFm").onclick = function () { ops.fret(-1); }; q("#fxFp").onclick = function () { ops.fret(1); }; q("#fxSu").onclick = function () { ops.string(-1); }; q("#fxSd").onclick = function () { ops.string(1); }; }
    if (q("#fxPm")) { q("#fxPm").onclick = function () { ops.pitch(-1); }; q("#fxPp").onclick = function () { ops.pitch(1); }; q("#fxOm").onclick = function () { ops.pitch(-12); }; q("#fxOp").onclick = function () { ops.pitch(12); }; }
    Array.prototype.forEach.call(p.querySelectorAll("[data-d]"), function (bt) { bt.onclick = function () { ops.duration(durValue(DURS[+bt.getAttribute("data-d")])); }; });
    if (q("#fxTrip")) q("#fxTrip").onclick = ops.triplet;
    if (q("#fxRest")) q("#fxRest").onclick = ops.restToggle;
    if (q("#fxDel")) q("#fxDel").onclick = ops.del;
    if (q("#fxTie")) q("#fxTie").onclick = ops.tie;
    if (q("#fxAdd")) q("#fxAdd").onclick = function () {
      var base = nt && nt.drum == null ? SC.noteMidi(nt) : 60;
      F.picker = { pc: ((base % 12) + 12) % 12, oct: Math.floor(base / 12) - 1 };
      render();
    };
    q("#fxChords").onclick = chordsDialog;
    q("#fxClear").onclick = ops.clearBar;
    if (q("#fxRead")) q("#fxRead").onclick = function () { reread([F.sel.bi]); };
    if (q("#fxReadR")) q("#fxReadR").onclick = function () { var lr = loopRange(), a = []; for (var i = lr.a; i <= lr.b; i++) a.push(i); reread(a); };
    A.layout();
  }
  function bindHead(p) {
    var u = p.querySelector("#fxUndo"), r = p.querySelector("#fxRedo"), c = p.querySelector("#fxClose");
    if (u) u.onclick = F.undo; if (r) r.onclick = F.redo;
    if (c) c.onclick = function () { F.toggle(false); };
  }
  function bindPicker(p) {
    Array.prototype.forEach.call(p.querySelectorAll("[data-pp]"), function (b) { b.onclick = function () { F.picker.pc = +b.getAttribute("data-pp"); Array.prototype.forEach.call(p.querySelectorAll("[data-pp]"), function (x) { x.setAttribute("aria-pressed", String(x === b)); }); }; });
    Array.prototype.forEach.call(p.querySelectorAll("[data-poct]"), function (b) { b.onclick = function () { F.picker.oct = clamp(F.picker.oct + (+b.getAttribute("data-poct")), 0, 8); p.querySelector("#fxOct").textContent = F.picker.oct; }; });
    p.querySelector("#fxPkNo").onclick = function () { F.picker = null; render(); };
    p.querySelector("#fxPkOk").onclick = function () { var m = 12 * (F.picker.oct + 1) + F.picker.pc; F.picker = null; if (!ops.addNote(m)) render(); };
  }

  function chordsDialog() {
    var s = F.sel; if (!s) return;
    var b = meas(s.bi), len = SC.barLen(S.score, s.bi);
    var rows = b.chords.map(function (c) { return { name: c.name, at: c.at }; });
    if (!rows.length) rows.push({ name: "", at: 0 });
    function draw() {
      var h = '<div class="sh-h"><h2>Bar ' + b.n + '</h2></div><div class="crows">';
      rows.forEach(function (c, i) {
        h += '<div class="crow"><input class="field" data-cn="' + i + '" maxlength="24" value="' + esc(c.name) + '" aria-label="Chord" placeholder="Chord"><input class="field num" data-ca="' + i + '" type="number" step="0.5" min="1" value="' + (Math.round((c.at + 1) * 100) / 100) + '" aria-label="Beat"><button class="chip ic" type="button" data-cx="' + i + '" aria-label="Remove chord">' + IC.x + "</button></div>";
      });
      h += '</div><div class="btns"><button class="btn" id="chAdd" type="button">Add</button></div><div class="btns"><button class="btn" id="chNo" type="button">Cancel</button><button class="btn pri" id="chOk" type="button">Save</button></div>';
      var d = A.dialog(h);
      function read() {
        Array.prototype.forEach.call(d.querySelectorAll("[data-cn]"), function (n) { rows[+n.getAttribute("data-cn")].name = n.value; });
        Array.prototype.forEach.call(d.querySelectorAll("[data-ca]"), function (n) { var v = parseFloat(n.value); rows[+n.getAttribute("data-ca")].at = isFinite(v) ? Math.max(0, v - 1) : 0; });
      }
      Array.prototype.forEach.call(d.querySelectorAll("[data-cx]"), function (n) { n.onclick = function () { read(); rows.splice(+n.getAttribute("data-cx"), 1); if (!rows.length) rows.push({ name: "", at: 0 }); draw(); }; });
      d.querySelector("#chAdd").onclick = function () { read(); rows.push({ name: "", at: Math.min(len - 0.5, rows.length ? rows[rows.length - 1].at + 1 : 0) }); draw(); };
      d.querySelector("#chNo").onclick = A.closeDlg;
      d.querySelector("#chOk").onclick = function () {
        read();
        var list = rows.filter(function (c) { return c.name.trim(); }).map(function (c) { return { at: clamp(c.at, 0, Math.max(0, len - 0.25)), name: c.name.trim() }; }).sort(function (a, b2) { return a.at - b2.at; });
        A.closeDlg();
        ops.setChords(list);
      };
    }
    draw();
  }

  /* ================================================================ Read again, before / after */
  function reread(idxs) {
    if (F.reading || F.preview) return;
    if (!(window.MusicAI && MusicAI.has && MusicAI.has())) { A.showErr("Add your Anthropic key first (Add music)."); return; }
    var sc = S.score, piece = S.piece, ctl = new AbortController();
    if (S.playing) A.pausePlay(true);
    var first = sc.measures[idxs[0]].n, label = idxs.length > 1 ? "bars " + first + "–" + sc.measures[idxs[idxs.length - 1]].n : "bar " + first;
    F.reading = { ctl: ctl, status: "Reading " + label + "…", idxs: idxs };
    render();
    var shown = function (m) { var n = $("fxStatus"); if (n && F.reading) n.textContent = m; };
    PA.transcribe.rereadBars(sc, idxs, function (pg) {
      var id = (piece.pages || [])[pg];
      return id ? ST.pgGet(id).then(function (r) { return r && r.blob; }) : Promise.resolve(null);
    }, { signal: ctl.signal }).then(function (res) {
      if (S.piece !== piece || S.score !== sc) { F.reading = null; return; }
      F.reading = null;
      var bis = res.map(function (x) { return x.index; }), before = bis.map(function (i) { return JSON.stringify(sc.measures[i]); }), after = res.map(function (x) { return JSON.stringify(x.bar); });
      var lr = S.prefs.loop ? { a: S.prefs.loop.a, b: S.prefs.loop.b } : null;
      F.preview = { idxs: bis, before: before, after: after, showing: "after", prevLoop: lr };
      swapIn("after");
      var a = Math.min.apply(null, bis), z = Math.max.apply(null, bis);
      F.sel = null;
      keepRender(function () { A.setLoop(a, z, true); });
      render();
    }).catch(function (e) {
      F.reading = null;
      if (!(e && e.name === "AbortError")) A.showErr((e && e.message) || "Couldn't read that again.");
      render();
    });
    shown(F.reading.status);
  }
  function swapIn(which) {
    var pv = F.preview, sc = S.score;
    pv.idxs.forEach(function (i, n) { sc.measures[i] = JSON.parse(pv[which][n]); });
    SC.markTies(sc);
  }
  function showVersion(which) {
    var pv = F.preview; if (!pv || pv.showing === which) return;
    pv.showing = which; swapIn(which);
    keepRender(); render();
  }
  function endPreview() {
    var pv = F.preview;
    F.preview = null;
    var L = pv && pv.prevLoop;
    if (L) A.setLoop(L.a, L.b, false); else A.clearLoop();
  }
  function keepPreview() {
    var pv = F.preview; if (!pv) return;
    if (pv.showing !== "after") { pv.showing = "after"; swapIn("after"); }
    var entry = { bis: pv.idxs, before: pv.before, after: pv.after, sel: null };
    endPreview();
    F.undoStack.push(entry); F.redoStack = [];
    commit(entry.bis);
  }
  function discardPreview() {
    var pv = F.preview; if (!pv) return;
    swapIn("before");
    endPreview();
    commit(pv.idxs, true);
  }
  /* the store never saves an unresolved preview: the old bars are written */
  var os = ST.save;
  ST.save = function () {
    var pv = F.preview;
    if (!pv || pv.showing !== "after" || !S.score) return os.call(ST);
    var sc = S.score, cur = pv.idxs.map(function (i) { return sc.measures[i]; });
    pv.idxs.forEach(function (i, n) { sc.measures[i] = JSON.parse(pv.before[n]); });
    try { return os.call(ST); } finally { pv.idxs.forEach(function (i, n) { sc.measures[i] = cur[n]; }); }
  };
  F.busy = function () { return !!(F.preview || F.reading); };

  /* ================================================================ on / off */
  F.toggle = function (on) {
    on = on == null ? !F.on : !!on;
    if (on === F.on) return;
    if (!on && F.preview) discardPreview();
    if (!on && F.reading && F.reading.ctl) F.reading.ctl.abort();
    F.on = on;
    var b = $("tool-fix");
    if (b) { b.setAttribute("aria-pressed", String(on)); b.classList.toggle("sel", on); }
    document.body.classList.toggle("fixing", on);
    if (on) {
      if (S.playing) A.pausePlay(true);
      A.closePanels();
      if (S.view === "page") A.setView(S.sc && SC.hasTab(S.sc) ? "tab" : "notation");
    } else F.sel = null;
    F.picker = null;
    render(); paintSel();
  };

  function reset() { F.undoStack = []; F.redoStack = []; F.sel = null; F.picker = null; F.reading = null; F.preview = null; if (F.on) { F.on = false; document.body.classList.remove("fixing"); var b = $("tool-fix"); if (b) { b.setAttribute("aria-pressed", "false"); b.classList.remove("sel"); } } render(); }
  PA.on("open", reset);
  PA.on("leave", function () { if (F.preview) { swapIn("before"); F.preview = null; } if (F.reading && F.reading.ctl) F.reading.ctl.abort(); reset(); });
  PA.on("view", function () { setTimeout(paintSel, 30); });

  var btn = A.tools.add("fix", IC.pencil, "Fix", function () { F.toggle(); });
  btn.setAttribute("aria-pressed", "false");
  $("vPlayer").addEventListener("click", onClick, true);
  window.addEventListener("keydown", function (e) {
    if (!F.on || !(e.ctrlKey || e.metaKey) || (e.key !== "z" && e.key !== "Z")) return;
    var t = e.target, tag = (t && t.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    e.preventDefault();
    if (e.shiftKey) F.redo(); else F.undo();
  });
})();
