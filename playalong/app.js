/* Play Along: photograph sheet music or tab, have Claude read it once, then play along with it.
   This file is the screens and the wiring. The pieces it ties together share one namespace, window.PA:
     score.js       the score model: reading Claude's answer, checks, per-bar meter/key/tempo, transposing
     store.js       localStorage "playalong:v1" (pieces) and IndexedDB "music-playalong" (page photos, recordings' media)
     engine.js      timeline (all parts) and the audio engine (samples with a synth fallback)
     transcribe.js  the photo -> score request
     views.js       Tab, Chords, Page views, loop overlay and drag-to-select
     abc.js         Notation and Score views (abcjs, with our own tab staff)
     viz.js         fretboard and keyboard
     samples.js, import.js   phase 1 modules (sounds, file import)
     media.js, listen.js   phase 1 modules, wired in by rec.js (recordings, sync editor, takes) and wait.js (wait mode)
     lists.js, notebook.js, sync.js, fix.js   phase 3b: lists (setlists), the Notebook sheet, sync through the Music account, Fix mode (quick fixes, re-read a bar)
   Hooks for later phases: PA.on / PA.emit events (open, leave, play, pause, seek, speed, frame, view, loop, rebuild, session), PA.app (see the end of this file),
   a "driver" (PA.app.setDriver) that replaces the synth engine as the playback clock: { start(opts)->Promise, stop(soft), seek(pos), pos()->{pos,counting,ci?,speed,seg}, setSpeed(f), finished, onEnd, bpm?(pos) },
   the #dockSlot element above the transport, and PA.app.tools.add() for more icon buttons next to Display / Mixer. */
(function () {
  "use strict";
  var PA = window.PA, SC = PA.score, EN = PA.engine, V = PA.views, ST = PA.store;
  var S = PA.S, E = EN.E;
  var clamp = SC.clamp;
  var $ = function (id) { return document.getElementById(id); };

  /* ================================================================ helpers */
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function logCall(fn) { try { var L = window.MusicLog; if (L && L[fn]) L[fn].apply(L, Array.prototype.slice.call(arguments, 1)); } catch (e) {} }
  var data = ST.data;

  var bus = {};
  PA.on = function (n, f) { (bus[n] = bus[n] || []).push(f); };
  PA.off = function (n, f) { bus[n] = (bus[n] || []).filter(function (x) { return x !== f; }); };
  PA.emit = function (n, d) { (bus[n] || []).slice().forEach(function (f) { try { f(d); } catch (e) { if (window.console) console.error(e); } }); };

  function svgi(inner, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>"; }
  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/></svg>',
    loop: svgi('<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>'),
    start: svgi('<path d="M6 5v14"/><path d="M19 5.5v13L9 12z" fill="currentColor"/>', 2.2),
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/></svg>',
    dots: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5.5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="18.5" r="1.8"/></svg>',
    image: svgi('<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/>'),
    sections: svgi('<path d="M4 6h16M4 12h10M4 18h13"/>'),
    display: svgi('<path d="M4 18 9 6l5 12"/><path d="M5.8 14h6.4"/><path d="M16 18v-7"/><path d="M16 11h4"/>'),
    mixer: svgi('<path d="M6 4v16M12 4v16M18 4v16"/><circle cx="6" cy="9" r="2" fill="currentColor"/><circle cx="12" cy="15" r="2" fill="currentColor"/><circle cx="18" cy="8" r="2" fill="currentColor"/>'),
    fret: svgi('<rect x="3" y="7" width="18" height="10" rx="1.5"/><path d="M8 7v10M13 7v10M18 7v10M3 12h18"/>', 1.7),
    keys: svgi('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M8 5v14M12 5v14M16 5v14"/><path d="M7 5v7h2V5M11 5v7h2V5M15 5v7h2V5" fill="currentColor"/>', 1.6),
    full: svgi('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    exit: svgi('<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>'),
    clip: svgi('<path d="M6 4h12v17l-6-4-6 4z"/>'),
    help: svgi('<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.300-1 .8-1 1.500"/><path d="M12 17h.01"/>'),
    eye: svgi('<path d="M2 12s3.500-6.500 10-6.500S22 12 22 12s-3.500 6.500-10 6.500S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 1.8),
    up: svgi('<path d="m6 15 6-6 6 6"/>', 2.2), down: svgi('<path d="m6 9 6 6 6-6"/>', 2.2),
    book: svgi('<path d="M5 4.500A1.500 1.500 0 0 1 6.500 3H19v15H6.500A1.500 1.500 0 0 0 5 19.500z"/><path d="M5 19.500A1.500 1.500 0 0 0 6.500 21H19v-3"/><path d="M9 8h6"/>', 1.8),
    score: svgi('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17.500h4"/>', 1.8),
    eyeoff: svgi('<path d="M3 3l18 18"/><path d="M10.500 6c.5-.1 1-.1 1.500-.1 6.500 0 10 6 10 6a17 17 0 0 1-3 3.600M6.500 7.500A17 17 0 0 0 2 12s3.500 6.500 10 6.500c1.400 0 2.700-.3 3.800-.7"/>', 1.8)
  };
  var BTN_X = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg>';

  /* ================================================================ state, prefs */
  S.route = "list"; S.piece = null; S.score = null; S.sc = null; S.tl = null; S.prefs = null; S.view = "tab"; S.startPos = 0; S.written = 100;
  S.drv = null; S.vidInset = 0; S.loopSel = 0; S.loopPick = null; S.playing = false; S.loc = null; S.vobj = null; S.pageUrls = []; S.raf = 0; S.lastPos = 0; S.dockH = 150; S.drag = null;

  function defaultDisplay() { return { notation: true, tab: true, chords: true, pitch: false, counts: false, barNums: true, lyrics: true, expand: false, layout: "wrap", zoom: 100, focus: false }; }
  function defaultPrefs(score) {
    return {
      speed: 1, view: SC.hasTab(score) ? "score" : "notation", loop: null, click: true, countIn: true, speedUp: 0, speedTarget: 100,
      instVol: 0.8, clickVol: 0.7, transpose: 0, mix: {}, display: defaultDisplay(), viz: { on: false, kind: null, left: false, all: false },
      rec: null, recVol: 1, overlay: false, overlayVol: 0.6, vid: { h: 0, hide: false, mirror: false },
      wait: { on: false, src: "auto", octave: null, backing: false }
    };
  }
  function merge(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; if (b && typeof b === "object") for (k in b) if (b[k] !== undefined && b[k] !== null) o[k] = b[k]; return o; }
  /* Prefs of a piece, upgraded: v1 stored an absolute bpm and one sound for the main part. */
  function loadPrefs(piece) {
    var score = piece.score, dp = defaultPrefs(score), pr = piece.prefs || {}, P = {}, k;
    for (k in dp) P[k] = pr[k] !== undefined && pr[k] !== null ? pr[k] : dp[k];
    P.display = merge(dp.display, pr.display); P.viz = merge(dp.viz, pr.viz); P.mix = pr.mix && typeof pr.mix === "object" ? pr.mix : {};
    P.vid = merge(dp.vid, pr.vid); P.wait = merge(dp.wait, pr.wait); P.wait.on = !!P.wait.on;
    P.recVol = clamp(+P.recVol >= 0 ? +P.recVol : 1, 0, 1); P.overlayVol = clamp(+P.overlayVol >= 0 ? +P.overlayVol : 0.6, 0, 1); P.overlay = !!P.overlay;
    var written = score.tempo || 100;
    if (pr.speed == null && pr.bpm) P.speed = pr.bpm / written;
    P.speed = clamp(Math.round(+P.speed * 100) / 100 || 1, 0.25, 2);
    if (!pr.mix && pr.sound && ["bass", "guitar", "piano", "off"].indexOf(pr.sound) >= 0) P.mix.main = { sound: pr.sound };
    delete P.bpm; delete P.sound;
    if (pr.view === "notes") P.view = "notation";
    if (P.loop && (!(P.loop.a >= 0) || P.loop.a >= score.measures.length || P.loop.b >= score.measures.length || P.loop.b < P.loop.a)) P.loop = null;
    P.transpose = clamp(Math.round(+P.transpose || 0), -12, 12);
    if ([0, 2, 5, 10].indexOf(P.speedUp) < 0) P.speedUp = 0;
    P.display.zoom = clamp(Math.round(+P.display.zoom || 100), 60, 200);
    return P;
  }
  function savePrefs() { if (S.piece) { S.piece.prefs = S.prefs; ST.saveSoon(); } }
  function showErr(msg) {
    var e = $("err"); e.textContent = msg || ""; e.hidden = !msg;
    clearTimeout(showErr.t);
    if (msg) showErr.t = setTimeout(function () { e.hidden = true; layout(); }, 6000);
    layout();
  }
  function summary(p) {
    var s = p.score, inst = s.instrument === "other" && s.program === -1 ? "Drums" : (SC.INST_NAME[s.instrument] || "Music");
    return inst + " · " + s.measures.length + (s.measures.length === 1 ? " bar" : " bars") + " · " + (s.tempo || 100) + " bpm";
  }

  /* ================================================================ sound per part (the mixer's answer to the engine) */
  var SOUNDS = [["bass", "Bass"], ["guitar", "Guitar"], ["acoustic", "Acoustic"], ["piano", "Piano"], ["synth", "Synth"], ["off", "Off"]];
  var DRUM_SOUNDS = [["drums", "Drums"], ["off", "Off"]];
  function autoSound(p) {
    if (p.drum) return "drums";
    if (window.PASamples && PASamples.forProgram) return PASamples.forProgram(p.program, false);
    return p.instrument === "bass" ? "bass" : p.instrument === "guitar" ? "guitar" : "piano";
  }
  function synthKind(sound, p) {
    if (sound === "bass") return "bass";
    if (sound === "guitar" || sound === "acoustic") return "guitar";
    if (sound === "piano") return "piano";
    return p.instrument === "bass" ? "bass" : p.instrument === "guitar" ? "guitar" : "piano";
  }
  function mixOf(key) { return (S.prefs.mix[key] = S.prefs.mix[key] || {}); }
  function resolveMix() {
    var parts = SC.parts(S.sc), mix = S.prefs.mix || {}, solo = parts.some(function (p) { return mix[p.key] && mix[p.key].solo; }), out = { parts: {} };
    parts.forEach(function (p) {
      var m = mix[p.key] || {}, sound = m.sound || autoSound(p);
      out.parts[p.key] = { sound: sound, vol: m.vol == null ? 1 : m.vol, on: !m.mute && (!solo || !!m.solo), kind: synthKind(sound, p) };
    });
    return out;
  }
  function applyMix() { EN.configure(resolveMix()); }

  /* The clock that is playing: the synth engine, or a driver (a recording, wait mode, the sync editor) set with PA.app.setDriver. */
  function eng() { return S.drv || EN; }
  function engFinished() { return S.drv ? !!S.drv.finished : E.finished; }
  function setDriver(d) { S.drv = d || null; }

  /* The display score is the stored score, transposed. The timeline, drawn bars and sound all come from it. */
  function rebuild(first) {
    S.sc = SC.transposed(S.score, S.prefs.transpose);
    S.tl = EN.buildTimeline(S.sc);
    S.written = S.score.tempo || 100;
    V.computeR();
    applyMix();
    PA.emit("rebuild", { first: !!first });
    if (!first && S.playing) { var ep = eng().pos(); if (ep && !ep.counting) eng().seek(clamp(ep.pos, 0, S.tl.total - 1e-6)); }
  }

  /* ================================================================ dialogs */
  function dialog(html) {
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

  /* what the transcription (or the importer) wasn't sure of, as lines of text */
  function transNotes() {
    var notes = [], f = (S.piece && S.piece.flags) || {}, sc = S.score || {};
    if (sc.uncertain) notes.push(sc.uncertain);
    if (f.off && f.off.length) notes.push("Bars that may be off: " + f.off.join(", ") + ".");
    if (f.tabFixed) notes.push("Tab numbers changed to match the staff: " + f.tabFixed + ".");
    if (f.tabGuessed) notes.push("Tab positions chosen by the app: " + f.tabGuessed + ".");
    if (f.junk) notes.push("Unreadable items skipped: " + f.junk + ".");
    return notes;
  }
  function toast(msg) {
    var t = $("toast"); if (!t) return;
    t.textContent = msg; t.hidden = !msg;
    clearTimeout(toast.t);
    if (msg) toast.t = setTimeout(function () { t.hidden = true; }, 5000);
  }

  /* ================================================================ list */
  var thumbUrls = {};
  function thumbFor(pageId, node) {
    if (thumbUrls[pageId]) { node.style.backgroundImage = "url(" + thumbUrls[pageId] + ")"; return; }
    ST.pgGet(pageId).then(function (r) {
      if (!r) return;
      var u = URL.createObjectURL(r.thumb || r.blob);
      thumbUrls[pageId] = u;
      node.style.backgroundImage = "url(" + u + ")";
    }).catch(function () {});
  }
  function renderList() {
    var ul = $("list"); ul.innerHTML = "";
    if (PA.lists) PA.lists.top();
    var all = data.pieces.filter(function (p) { return !p.deleted; });
    var list = PA.lists ? PA.lists.items() : all.sort(function (a, b) { return (b.updated || 0) - (a.updated || 0); });
    $("empty").hidden = list.length > 0;
    $("empty").textContent = all.length ? "Nothing here" : "No music yet";
    list.forEach(function (p, i) {
      var li = el("li", "item");
      var open = el("button", "open");
      open.type = "button";
      var th = el("span", "thumb"); open.appendChild(th);
      var t = el("span", "t"); t.appendChild(el("span", "n", esc(p.title))); t.appendChild(el("span", "m", esc(summary(p))));
      open.appendChild(t);
      open.setAttribute("aria-label", "Open " + p.title);
      open.onclick = function () { if (PA.lists) PA.lists.opening(); location.hash = "#/p/" + p.id; };
      var dots = el("button", "dots", ICON.dots); dots.type = "button"; dots.setAttribute("aria-label", "More for " + p.title);
      dots.onclick = function () { cardMenu(p); };
      li.appendChild(open); li.appendChild(dots); ul.appendChild(li);
      if (PA.lists) PA.lists.decorate(li, p, i, list.length);
      if (p.pages && p.pages[0]) thumbFor(p.pages[0], th);
    });
  }
  function cardMenu(p) {
    var d = dialog('<div class="sh-h"><h2>' + esc(p.title) + '</h2></div><div class="menu"><button class="btn" id="mRen" type="button">Rename</button>' + (PA.lists ? '<button class="btn" id="mList" type="button">Add to list…</button>' : '') + (p.pages && p.pages.length ? '<button class="btn" id="mAgain" type="button">Transcribe again</button>' : '') + '<button class="btn" id="mDel" type="button" style="color:var(--danger)">Delete</button></div>');
    d.querySelector("#mRen").onclick = function () { askText("Rename", p.title, function (v) { p.title = v; p.updated = Date.now(); ST.save(); renderList(); }); };
    if (d.querySelector("#mList")) d.querySelector("#mList").onclick = function () { PA.lists.addTo(p); };
    if (d.querySelector("#mAgain")) d.querySelector("#mAgain").onclick = function () { closeDlg(); openAdd(p); };
    d.querySelector("#mDel").onclick = function () {
      confirmBox("Delete “" + p.title + "”?", "Delete", function () { deletePiece(p); });
    };
  }
  function deletePiece(p) {
    (p.pages || []).forEach(function (id) { ST.pgDel(id).catch(function () {}); if (thumbUrls[id]) { URL.revokeObjectURL(thumbUrls[id]); delete thumbUrls[id]; } });
    (p.recordings || []).forEach(function (r) { if (r.mediaId) ST.mediaDel(r.mediaId).catch(function () {}); });
    // what is left is a tombstone, so the deletion can sync to the other devices (kept 60 days)
    var keep = { id: p.id, deleted: true, updated: Date.now(), title: p.title };
    Object.keys(p).forEach(function (k) { delete p[k]; });
    for (var k in keep) p[k] = keep[k];
    ST.save();
    renderList();
  }

  /* ================================================================ adding music */
  var A = null, fileIn = null, pdfjsP = null, IMG = PA.img;
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
                return IMG.canvasBlob(c, 0.85);
              }).then(function (b) { var r = { blob: b, w: c.width, h: c.height }; out.push(r); if (onPage) onPage(r); });
            });
          });
        })(p);
        return chain.then(function () { try { pdf.destroy(); } catch (e) {} return out; });
      });
    });
  }
  var MAX_PAGES = 20;
  function addFiles(files) {
    if (!A) return;
    var list = Array.prototype.slice.call(files || []);
    if (!list.length) return;
    var sf = !A.piece && window.PAImport ? list.filter(function (f) { return !/^image\//.test(f.type) && !(f.type === "application/pdf" || /\.pdf$/i.test(f.name || "")) && PAImport.accepts(f); })[0] : null;
    if (sf) { importFile(sf); return; }
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
        return (isPdf ? pdfPages(f, add) : IMG.prepImage(f).then(add)).catch(function (e) { A.err = (e && e.message) || "Couldn't open that file."; });
      });
    });
    chain.then(function () { if (A) { A.prep = false; renderAdd(); } });
  }
  function openAdd(piece) {
    A = { pages: [], hint: "auto", busy: false, prep: false, err: "", status: "", piece: piece || null, ctl: null, removed: [], keyErr: "", imp: null };
    var d = $("addSheet");
    renderAdd();
    if (!d.open) d.showModal();
    if (piece) {
      A.hint = ["bass", "guitar", "piano", "other"].indexOf(piece.score.instrument) >= 0 ? piece.score.instrument : "auto";
      A.prep = true; renderAdd();
      var cur = A;
      Promise.all((piece.pages || []).map(function (id) { return ST.pgGet(id).then(function (r) { return r && { id: id, blob: r.blob, w: r.w, h: r.h, thumb: r.thumb, url: URL.createObjectURL(r.thumb || r.blob), stored: true }; }); })).then(function (rs) {
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
  /* Score files: Guitar Pro, MusicXML, MIDI. A second picker with its own accept list (extensions and MIME types, as iOS wants both); holding the button
     lists every file instead, in case iOS greys the score files out (remembered in localStorage "playalong:anyfile"). */
  var SCORE_ACCEPT = ".gp,.gp3,.gp4,.gp5,.gpx,.xml,.musicxml,.mxl,.mid,.midi,audio/midi,audio/x-midi,audio/mid,application/x-midi,application/vnd.recordare.musicxml,application/vnd.recordare.musicxml+xml,application/xml,text/xml,application/x-guitar-pro,application/x-gtp,application/gp";
  var scoreIn = null;
  function anyFile() { try { return localStorage.getItem("playalong:anyfile") === "1"; } catch (e) { return false; } }
  function scoreAcceptNow() { return anyFile() ? "" : SCORE_ACCEPT; }
  function instName(inst, prog) { return inst === "drums" || (inst === "other" && prog === -1) ? "Drums" : (SC.INST_NAME[inst] || "Music"); }
  function importFile(f) {
    var cur = A;
    if (!cur || cur.busy || !window.PAImport) return;
    cur.busy = true; cur.err = ""; cur.status = "Reading " + (f.name || "the file") + "…"; cur.imp = null;
    cur.ctl = { abort: function () { cur.cancelled = true; cur.busy = false; cur.ctl = null; if (A === cur) renderAdd(); } };
    cur.cancelled = false;
    renderAdd();
    PAImport.read(f, f.name).then(function (res) {
      if (A !== cur || cur.cancelled) return;
      cur.busy = false; cur.ctl = null;
      var sc = res.score, list = [{ index: -1, name: sc.mainName || instName(sc.instrument, sc.program), instrument: instName(sc.instrument, sc.program) }];
      (res.parts || []).forEach(function (q) { list.push({ index: q.index, name: q.name || instName(q.instrument), instrument: instName(q.instrument) }); });
      cur.imp = { res: res, list: list, choice: -1, title: (sc.title || "").trim() || String(f.name || "Score").replace(/\.[A-Za-z0-9]+$/, "") };
      if (list.length < 2) { finishImport(cur); return; }
      renderAdd();
    }).catch(function (e) {
      if (A !== cur || cur.cancelled) return;
      cur.busy = false; cur.ctl = null; cur.err = (e && e.message) || "Couldn't read that file."; renderAdd();
    });
  }
  function finishImport(sess) {
    var im = sess.imp, res = im.res, score = res.score;
    if (im.choice >= 0 && window.PAImport) PAImport.setMain(score, im.choice);
    var flags = SC.finishImported(score); SC.markTies(score);
    if (res.warnings && res.warnings.length) score.uncertain = (score.uncertain ? score.uncertain + "\n" : "") + res.warnings.join("\n");
    var now = Date.now();
    var piece = { id: uid(), title: im.title, created: now, updated: now, pages: [], score: score, flags: flags, prefs: defaultPrefs(score) };
    data.pieces.push(piece); ST.save();
    logCall("event", "playalong", "Added " + piece.title);
    closeAdd();
    location.hash = "#/p/" + piece.id;
    if (S.route === "player" && S.piece && S.piece.id === piece.id) openPiece(piece.id);
  }
  function renderPick(d) {
    var im = A.imp, h = '<div class="sh-in"><div class="sh-h"><h2>' + esc(im.title) + '</h2><button class="icon-btn" id="aClose" type="button" aria-label="Close">' + BTN_X + "</button></div>";
    h += '<div class="row"><span class="lb">Your part</span></div><div class="menu" id="aParts" role="radiogroup" aria-label="Your part">';
    im.list.forEach(function (q) {
      h += '<button class="btn pickrow" type="button" role="radio" data-p="' + q.index + '" aria-checked="' + (im.choice === q.index) + '" aria-pressed="' + (im.choice === q.index) + '">' + esc(q.name) + "<small>" + esc(q.instrument) + '</small><i class="tick" aria-hidden="true"></i></button>';
    });
    h += '</div><div class="btns"><button class="btn" id="aImpNo" type="button">Cancel</button><button class="btn pri" id="aImpGo" type="button">Open</button></div></div>';
    d.innerHTML = h;
    d.querySelector("#aClose").onclick = closeAdd; d.querySelector("#aImpNo").onclick = closeAdd;
    Array.prototype.forEach.call(d.querySelectorAll("[data-p]"), function (b) {
      b.onclick = function () {
        im.choice = +b.getAttribute("data-p");
        Array.prototype.forEach.call(d.querySelectorAll("[data-p]"), function (x) { var on = x === b; x.setAttribute("aria-pressed", String(on)); x.setAttribute("aria-checked", String(on)); });
      };
    });
    d.querySelector("#aImpGo").onclick = function () { finishImport(A); };
  }
  function renderAdd() {
    var d = $("addSheet");
    if (!A) return;
    if (!fileIn) {
      fileIn = el("input"); fileIn.type = "file"; fileIn.accept = "image/*,application/pdf"; fileIn.multiple = true; fileIn.hidden = true; fileIn.id = "fileIn";
      fileIn.onchange = function () { var f = fileIn.files; addFiles(f); setTimeout(function () { fileIn.value = ""; }, 0); };
    }
    if (!scoreIn) {
      scoreIn = el("input"); scoreIn.type = "file"; scoreIn.hidden = true; scoreIn.id = "scoreIn";
      scoreIn.onchange = function () {
        var f = scoreIn.files && scoreIn.files[0];
        setTimeout(function () { scoreIn.value = ""; }, 0);
        if (!f) return;
        if (window.PAImport && PAImport.accepts(f)) importFile(f);
        else if (A) { A.err = "That isn't a Guitar Pro, MusicXML or MIDI file."; renderAdd(); }
      };
    }
    scoreIn.accept = scoreAcceptNow();
    if (A.imp && A.imp.res && !A.busy) { renderPick(d); return; }
    var again = !!A.piece, busy = A.busy, needKey = !(window.MusicAI && MusicAI.has());
    var h = '<div class="sh-in">';
    h += '<div class="sh-h"><h2>' + (again ? "Transcribe again" : "Add music") + '</h2><button class="icon-btn" id="aClose" type="button" aria-label="Close">' + BTN_X + "</button></div>";
    if (A.pages.length) {
      h += '<div class="thumbs">';
      A.pages.forEach(function (p, i) {
        h += '<div class="th" style="background-image:url(' + p.url + ')"><i>' + (i + 1) + "</i>" + (busy ? "" : '<button type="button" data-rm="' + i + '" aria-label="Remove page ' + (i + 1) + '">&times;</button>') + "</div>";
      });
      h += "</div>";
    }
    if (!busy) h += '<div class="pick"><button class="btn" id="aPick" type="button">' + ICON.image + (A.pages.length ? "Add page" : "Photo or PDF") + "</button>" +
      (!again && !A.pages.length && window.PAImport ? '<button class="btn" id="aScore" type="button">' + ICON.score + "Score file</button>" : "") + "</div>";
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
    d.querySelector(".sh-in").appendChild(scoreIn);
    var q = function (s) { return d.querySelector(s); };
    q("#aClose").onclick = closeAdd;
    if (q("#aPick")) q("#aPick").onclick = function () { fileIn.click(); };
    if (q("#aScore")) {
      var sb = q("#aScore"), held = 0, long = false;
      sb.onclick = function () { if (long) { long = false; return; } scoreIn.accept = scoreAcceptNow(); scoreIn.click(); };
      sb.addEventListener("pointerdown", function () { long = false; held = setTimeout(function () { long = true; try { localStorage.setItem("playalong:anyfile", anyFile() ? "0" : "1"); } catch (e) {} toast(anyFile() ? "Showing every file" : "Showing score files"); }, 700); });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function (n) { sb.addEventListener(n, function () { clearTimeout(held); }); });
    }
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
    PA.transcribe(cur.pages.map(function (p) { return p.blob; }), {
      hint: cur.hint, signal: cur.ctl.signal,
      onProgress: function (s) { cur.status = s; var n = $("aStatus"); if (n && A === cur) n.textContent = s; }
    }).then(function (res) {
      return savePiece(cur, res).then(function (piece) {
        logCall("event", "playalong", "Added " + piece.title);
        var id = piece.id;
        closeAdd();
        location.hash = "#/p/" + id;
        if (S.route === "player" && S.piece && S.piece.id === id) openPiece(id);
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
      return IMG.makeThumb(p.blob).then(function (th) {
        var id = uid(); ids.push(id);
        return ST.pgPut({ id: id, blob: p.blob, w: p.w, h: p.h, thumb: th });
      });
    })).then(function () {
      if (again) {
        sess.removed.forEach(function (id) { ST.pgDel(id).catch(function () {}); delete thumbUrls[id]; });
        var keep = piece.prefs || {}, dp = defaultPrefs(score);
        piece.pages = ids; piece.score = score; piece.flags = res.flags; piece.updated = now;
        piece.prefs = { speed: 1, view: dp.view, loop: null, click: keep.click !== false, countIn: keep.countIn !== false, speedUp: keep.speedUp || 0, speedTarget: keep.speedTarget || 100,
          instVol: keep.instVol == null ? dp.instVol : keep.instVol, clickVol: keep.clickVol == null ? dp.clickVol : keep.clickVol, transpose: 0, mix: {}, display: merge(dp.display, keep.display), viz: merge(dp.viz, keep.viz),
          rec: keep.rec || null, recVol: keep.recVol == null ? 1 : keep.recVol, overlay: !!keep.overlay, overlayVol: keep.overlayVol == null ? 0.6 : keep.overlayVol, vid: merge(dp.vid, keep.vid), wait: merge(dp.wait, keep.wait) };
        piece.clips = [];
      } else {
        piece = { id: uid(), title: (score.title || "").trim() || "Untitled", created: now, updated: now, pages: ids, score: score, flags: res.flags, prefs: defaultPrefs(score) };
        data.pieces.push(piece);
      }
      ST.save();
      return piece;
    });
  }

  /* ================================================================ the player */
  var scrollHold = 0, touching = false;
  V.hooks.holdScroll = function () { return touching || Date.now() < scrollHold; };
  V.hooks.onSeek = function (pos) { seekTo(pos); };
  V.hooks.onBarTap = function (r) { onBarTap(r); };
  V.hooks.onEventTap = function (r, pos) { if (S.loopSel) onBarTap(r); else { scrollHold = 0; seekTo(pos); } };
  V.hooks.onLoopDrag = function (r1, r2) { var rg = V.rangeBars(r1, r2); if (rg) setLoop(rg.a, rg.b, true); };
  V.hooks.onReady = function () { updateCursor(curPos(), true); };
  V.hooks.onZoom = function (z) { setZoom(S.prefs.display.zoom * z); };

  var HOSTS = { score: "vScore", notation: "vNotation", tab: "vTab", chords: "vChords", page: "vPage" };
  var VIEW_ORDER = ["score", "notation", "tab", "chords", "page"];
  function availableViews() {
    var out = [];
    if (SC.hasTab(S.sc)) out.push("score");
    out.push("notation");
    if (SC.hasTab(S.sc)) out.push("tab");
    if (SC.hasChords(S.sc)) out.push("chords");
    if (S.piece && S.piece.pages && S.piece.pages.length) out.push("page");
    return out;
  }
  function pickView(v) { var av = availableViews(); return av.indexOf(v) >= 0 ? v : av[0]; }

  function showScreen(name) {
    S.route = name;
    var pl = name === "player";
    $("vList").hidden = pl; $("vPlayer").hidden = !pl; $("sub").hidden = !pl;
    $("dockList").hidden = pl; $("dockPlay").hidden = !pl;
    document.body.classList.toggle("player", pl);
    if (!pl) { closePanels(); document.body.classList.remove("fs"); $("fsBar").hidden = true; document.documentElement.style.removeProperty("--dockh"); }
    layout();
  }
  function leavePlayer() {
    if (S.playing) pausePlay(true);
    cancelAnimationFrame(S.raf);
    if (S.vobj && S.vobj.destroy) S.vobj.destroy();
    PA.emit("leave", { piece: S.piece });
    S.piece = null; S.score = null; S.sc = null; S.tl = null; S.vobj = null;
    S.pageUrls.forEach(function (u) { URL.revokeObjectURL(u); }); S.pageUrls = [];
    Object.keys(HOSTS).forEach(function (k) { $(HOSTS[k]).innerHTML = ""; });
    $("badge").hidden = true;
    $("viz").innerHTML = ""; $("viz").hidden = true; $("clips").hidden = true;
  }
  function openPiece(id) {
    var p = ST.pieceById(id);
    if (!p || p.deleted || !p.score || !p.score.measures || !p.score.measures.length) { location.hash = ""; return; }
    if (S.playing) pausePlay(true);
    S.piece = p; S.score = p.score;
    S.prefs = loadPrefs(p); p.prefs = S.prefs;
    rebuild(true);
    S.view = pickView(S.prefs.view);
    S.startPos = 0; S.loopSel = 0; S.loopPick = null; S.loc = null; S.drag = null;
    var L = EN.loopRange(); if (L) S.startPos = L.start;
    showScreen("player");
    $("ptitle").textContent = p.title;
    buildPanels(); syncViewButtons(); updateTransport(); renderClips();
    PA.viz.mount($("viz"));
    renderView();
    window.scrollTo(0, 0);
    PA.emit("open", { piece: p });
  }
  function syncViewButtons() {
    var av = availableViews();
    Array.prototype.forEach.call($("views").querySelectorAll("button"), function (b) {
      var v = b.getAttribute("data-v");
      b.hidden = av.indexOf(v) < 0;
      b.setAttribute("aria-pressed", String(v === S.view));
    });
    $("tSec").hidden = !SC.sections(S.sc).length;
    $("tViz").innerHTML = S.vizKindIcon();
    $("tViz").setAttribute("aria-label", PA.viz.kind() === "fret" ? "Fretboard" : "Keyboard");
    $("tViz").setAttribute("aria-pressed", String(!!S.prefs.viz.on));
  }
  S.vizKindIcon = function () { return PA.viz.kind() === "fret" ? ICON.fret : ICON.keys; };

  function setView(v, init) {
    v = pickView(v);
    S.view = v; S.prefs.view = v; if (!init) savePrefs();
    syncViewButtons();
    renderView();
    PA.emit("view", { view: v });
  }
  function renderView() {
    if (S.vobj && S.vobj.destroy) S.vobj.destroy();
    S.vobj = null;
    var d = S.prefs.display;
    Object.keys(HOSTS).forEach(function (k) { var h = $(HOSTS[k]); h.hidden = k !== S.view; if (k !== S.view) h.innerHTML = ""; });
    V.computeR();
    var host = $(HOSTS[S.view]), kind = S.view;
    if (kind === "score" && d.notation === false && d.tab !== false) kind = "tab";
    if (kind === "tab" && !SC.hasTab(S.sc)) kind = "notation";
    host.classList.toggle("horiz", d.layout === "horizontal" && kind !== "page");
    S.vobj = V[kind](host);
    S.vobj.viewKind = kind;
    updateCursor(curPos(), true);
    if (S.vobj.paintLoop) S.vobj.paintLoop();
  }
  function curPos() { return S.playing ? S.lastPos : S.startPos; }
  function updateCursor(pos, jump) {
    if (!S.tl) return;
    var loc = EN.locate(S.tl, pos);
    if (!loc) return;
    S.loc = loc;
    if (S.vobj && S.vobj.cursor) S.vobj.cursor(loc, jump);
    PA.viz.update(loc);
  }
  function paintLoop() { if (S.vobj && S.vobj.paintLoop) S.vobj.paintLoop(); }

  /* ---------------- dock height ---------------- */
  function layout() {
    var dk = $("dock");
    S.dockH = dk.offsetHeight || 150;
    document.documentElement.style.setProperty("--dockh", S.dockH + "px");
    var sb = $("sub");
    if (sb && !sb.hidden) document.documentElement.style.setProperty("--subb", Math.round((parseFloat(getComputedStyle(sb).top) || 0) + sb.offsetHeight) + "px");
    PA.emit("layout", {});
  }

  /* ---------------- transport ---------------- */
  function bpmNow() {
    if (S.drv && S.drv.bpm && S.tl) { var b = S.drv.bpm(curPos()); if (b > 0) return Math.round(b); }
    return Math.round((S.tl ? S.tl.writtenAt(curPos()) : S.written) * S.prefs.speed);
  }
  function speedPct() { return Math.round(S.prefs.speed * 100); }
  function updateTransport() {
    $("bPlay").innerHTML = S.playing ? ICON.pause : ICON.play;
    $("bPlay").setAttribute("aria-label", S.playing ? "Pause" : "Play");
    $("bLoop").innerHTML = ICON.loop; $("bStart").innerHTML = ICON.start; $("bMore").innerHTML = ICON.more;
    $("tSec").innerHTML = ICON.sections; $("tDisp").innerHTML = ICON.display; $("tMix").innerHTML = ICON.mixer;
    $("fsPlay").innerHTML = S.playing ? ICON.pause : ICON.play; $("fsExit").innerHTML = ICON.exit;
    var has = !!S.prefs.loop;
    $("bLoop").setAttribute("aria-pressed", String(has));
    $("bLoop").classList.toggle("sel", !has && S.loopSel > 0);
    var n = $("bpmN"); if (n) n.textContent = speedPct() + "%";
    var sm = $("bpmS"); if (sm) sm.textContent = bpmNow() + " bpm";
    var inp = $("bBpm").querySelector("input"); if (inp) inp.value = speedPct();
    syncPanels();
    showHint();
  }
  function showHint(text) {
    var b = $("badge");
    var t = text || (S.playing && E.loading > 0 ? "Loading sounds…" : S.loopSel === 1 ? "Tap the first bar" : S.loopSel === 2 ? "Tap the last bar" : "");
    b.textContent = t; b.hidden = !t;
  }
  E.onLoad = function () { if (S.route === "player") showHint(); };
  function playLogText() { return S.piece.title + " · " + speedPct() + "% · " + bpmNow() + " bpm"; }
  function startPlay(opts) {
    if (S.playing || E.starting || S.starting || !S.tl) return;
    S.loopSel = 0; S.loopPick = null;
    if (!(opts && opts.keepPanels)) closePanels();
    E.startSpeed = S.prefs.speed;
    E.onEnd = naturalEnd;
    if (S.drv) S.drv.onEnd = naturalEnd;
    S.starting = true;
    eng().start(opts).then(function () {
      S.starting = false;
      S.playing = true; S.lastSeg = null; S.sessionAt = Date.now(); S.sessionStartPos = S.startPos;
      logCall("playing", "playalong", true, { text: playLogText() });
      updateTransport(); frame();
      PA.emit("play", { pos: S.startPos, speed: S.prefs.speed });
    }).catch(function (e) { S.starting = false; showErr((e && e.message) || "Couldn't start the sound."); });
  }
  function recordSession() {
    if (!S.sessionAt || !S.piece) return;
    var secs = Math.round((Date.now() - S.sessionAt) / 1000), bpm = bpmNow();
    S.sessionAt = 0;
    if (secs < 5) return;
    var h = S.piece.history = S.piece.history || [], entry = { at: Date.now(), secs: secs, bpm: bpm };
    PA.emit("session", { entry: entry, piece: S.piece });
    h.push(entry);
    if (h.length > 300) h.splice(0, h.length - 300);
    ST.saveSoon();
  }
  function pausePlay(quiet) {
    if (!S.playing) return;
    var ep = eng().pos();
    eng().stop();
    S.playing = false;
    cancelAnimationFrame(S.raf);
    if (ep && !ep.counting && !engFinished()) {
      var loc = EN.locate(S.tl, clamp(ep.pos, 0, S.tl.total - 1e-6));
      if (loc) S.startPos = S.tl.passes[loc.pass].start + S.tl.offs[loc.bar][loc.ev];
    }
    if (S.prefs.speedUp > 0 && E.startSpeed && S.prefs.speed !== E.startSpeed) S.prefs.speed = E.startSpeed;
    recordSession();
    logCall("playing", "playalong", false);
    if (!quiet) { updateTransport(); updateCursor(S.startPos, true); showHint(); }
    PA.emit("pause", { pos: S.startPos, ended: false });
  }
  function naturalEnd() {
    eng().stop(true);
    S.playing = false; cancelAnimationFrame(S.raf);
    if (S.prefs.speedUp > 0 && E.startSpeed) S.prefs.speed = E.startSpeed;
    recordSession();
    logCall("playing", "playalong", false);
    updateTransport(); updateCursor(S.startPos, true); showHint();
    PA.emit("pause", { pos: S.startPos, ended: true });
  }
  function frame() {
    if (!S.playing) return;
    var ep = eng().pos();
    if (ep) {
      var pos;
      if (ep.counting) {
        pos = S.startPos;
        var k = ep.ci != null ? ep.ci : Math.floor((ep.pos - E.ciStart) / (E.ciUnit || S.tl.unit) + 1e-6) + 1;
        showHint(String(clamp(k, 1, 16)));
      } else { pos = clamp(ep.pos, 0, S.tl.total - 1e-6); showHint(); }
      S.lastPos = pos;
      if (ep.seg !== S.lastSeg) {
        S.lastSeg = ep.seg;
        if (ep.seg.auto && ep.speed !== S.prefs.speed) {
          S.prefs.speed = ep.speed; updateTransport(); savePrefs();
          logCall("playing", "playalong", true, { text: playLogText() });
          PA.emit("speed", { speed: ep.speed, auto: true });
        } else if (ep.seg.next !== undefined) updateBpmReadout();
      }
      updateCursor(pos);
      PA.emit("frame", { pos: pos, loc: S.loc, counting: ep.counting });
    }
    S.raf = requestAnimationFrame(frame);
  }
  function updateBpmReadout() { var sm = $("bpmS"); if (sm) sm.textContent = bpmNow() + " bpm"; }
  function seekTo(pos) {
    pos = clamp(pos, 0, Math.max(0, S.tl.total - 1e-6));
    S.startPos = pos; S.lastPos = pos;
    if (S.playing || (S.drv && S.drv.alwaysSeek)) eng().seek(pos);
    updateCursor(pos, true);
    updateBpmReadout();
    PA.emit("seek", { pos: pos });
  }
  function changeSpeed(v, quiet) {
    v = clamp(Math.round(v * 100) / 100, 0.25, 2);
    if (v === S.prefs.speed) return;
    S.prefs.speed = v; eng().setSpeed(v); savePrefs(); updateTransport();
    if (S.playing) logCall("playing", "playalong", true, { text: playLogText() });
    PA.emit("speed", { speed: v, auto: false });
  }
  function setLoop(a, b, seek) {
    S.prefs.loop = { a: a, b: b }; S.loopSel = 0; S.loopPick = null; savePrefs();
    if (S.prefs.display.focus) { renderView(); } else paintLoop();
    updateTransport(); renderClips();
    var L = EN.loopRange();
    if (seek && L && !S.playing) seekTo(L.start);
    PA.emit("loop", { loop: S.prefs.loop });
  }
  function clearLoop() {
    if (!S.prefs.loop && !S.loopSel) return;
    var had = !!S.prefs.loop;
    S.prefs.loop = null; S.loopSel = 0; S.loopPick = null; savePrefs();
    if (S.prefs.display.focus && had) renderView(); else paintLoop();
    updateTransport(); renderClips();
    PA.emit("loop", { loop: null });
  }
  function toggleLoop() {
    if (S.prefs.loop || S.loopSel) clearLoop();
    else { S.loopSel = 1; S.loopPick = null; paintLoop(); updateTransport(); }
  }
  function onBarTap(r) {
    scrollHold = 0;
    var e = S.R.list[r]; if (!e) return;
    var bi = e.bi;
    if (S.loopSel === 1) { S.loopPick = bi; S.loopSel = 2; paintLoop(); updateTransport(); return; }
    if (S.loopSel === 2) { setLoop(Math.min(S.loopPick, bi), Math.max(S.loopPick, bi), true); return; }
    seekTo(V.rSeekPos(r));
  }

  /* ---------------- hold-to-repeat buttons, typing the speed ---------------- */
  function holdButton(btn, fn) {
    var t = 0, iv = 0;
    function stop() { clearTimeout(t); clearInterval(iv); t = iv = 0; }
    btn.addEventListener("pointerdown", function (e) { e.preventDefault(); fn(); t = setTimeout(function () { iv = setInterval(fn, 140); }, 450); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (n) { btn.addEventListener(n, stop); });
    btn.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
    btn.addEventListener("click", function (e) { if (e.detail === 0) fn(); });
  }
  function typeSpeed() {
    var b = $("bBpm");
    if (b.querySelector("input")) return;
    var inp = el("input"); inp.type = "number"; inp.inputMode = "numeric"; inp.min = 25; inp.max = 200; inp.value = speedPct(); inp.setAttribute("aria-label", "Speed in percent");
    b.innerHTML = ""; b.appendChild(inp); inp.focus(); inp.select();
    var done = false;
    function end(ok) {
      if (done) return; done = true;
      var v = parseFloat(inp.value);
      b.innerHTML = '<b id="bpmN">' + speedPct() + '%</b><small id="bpmS">' + bpmNow() + " bpm</small>";
      if (ok && isFinite(v)) changeSpeed(v / 100);
    }
    inp.onkeydown = function (e) { if (e.key === "Enter") end(true); else if (e.key === "Escape") end(false); };
    inp.onblur = function () { end(true); };
    inp.onclick = function (e) { e.stopPropagation(); };
  }

  /* ================================================================ panels: More, Mixer, Display */
  var PANELS = { more: ["more", "bMore"], mixer: ["pMixer", "tMix"], display: ["pDisplay", "tDisp"] };
  function openPanel(name) {
    Object.keys(PANELS).forEach(function (k) {
      var on = k === name && $(PANELS[k][0]).hidden;
      $(PANELS[k][0]).hidden = !on;
      var b = $(PANELS[k][1]); b.setAttribute(k === "more" ? "aria-expanded" : "aria-pressed", String(on)); b.classList.toggle("sel", on);
    });
    if (name) syncPanels();
    layout();
  }
  function closePanels() { openPanel(null); }
  function anyPanelOpen() { return Object.keys(PANELS).some(function (k) { return !$(PANELS[k][0]).hidden; }); }

  function chipBtn(label, attrs, pressed, cls) { return '<button class="chip ' + (cls || "") + '" type="button" ' + attrs + ' aria-pressed="' + !!pressed + '">' + label + "</button>"; }

  function buildPanels() { buildMore(); buildMixer(); buildDisplay(); }
  function syncPanels() { syncMore(); syncMixer(); syncDisplay(); }

  /* ---- More ---- */
  function buildMore() {
    var m = $("more"), P = S.prefs, f = S.piece.flags || {};
    var h = "";
    h += '<div class="row"><label for="rSpeed">Speed <b id="rSpeedV"></b></label><div class="chips grow" id="cPre">' + [50, 60, 70, 80, 90, 100].map(function (x) { return chipBtn(x, 'data-sp="' + x + '"', false); }).join("") + '</div><input id="rSpeed" type="range" min="25" max="200" step="1"></div>';
    h += '<div class="row"><span class="lb">Click</span><div class="chips"><button class="chip" id="cClick" type="button" aria-pressed="false">Click</button><button class="chip" id="cCount" type="button" aria-pressed="false">Count-in</button></div></div>';
    h += '<div class="row"><span class="lb">Speed up each loop</span><div class="chips grow" id="cUp">' + [[0, "Off"], [2, "+2"], [5, "+5"], [10, "+10"]].map(function (s) { return chipBtn(s[1], 'data-u="' + s[0] + '"', false); }).join("") + '</div></div>';
    h += '<div class="row" id="rTarget"><span class="lb">Up to</span><div class="chips grow" id="cTarget">' + [80, 90, 100, 120, 150].map(function (s) { return chipBtn(s + "%", 'data-t="' + s + '"', false); }).join("") + "</div></div>";
    h += '<div class="row"><span class="lb">Tools</span><div class="chips"><button class="chip ic" id="cClip" type="button">' + ICON.clip + 'Save loop</button><button class="chip ic" id="cFull" type="button">' + ICON.full + 'Full screen</button><button class="chip ic" id="cKeys" type="button">' + ICON.help + "Keys</button>" + (PA.notebook ? '<button class="chip ic" id="cBook" type="button">' + ICON.book + "Notebook</button>" : "") + "</div></div>";
    var notes = transNotes();
    if (notes.length) h += '<details><summary>Notes from the transcription</summary><p>' + esc(notes.join("\n")) + "</p></details>";
    m.innerHTML = h;
    var q = function (s) { return m.querySelector(s); };
    q("#rSpeed").oninput = function () { changeSpeed((+this.value) / 100); };
    Array.prototype.forEach.call(m.querySelectorAll("[data-sp]"), function (b) { b.onclick = function () { changeSpeed(+b.getAttribute("data-sp") / 100); }; });
    q("#cClick").onclick = function () { P.click = !P.click; savePrefs(); syncPanels(); };
    q("#cCount").onclick = function () { P.countIn = !P.countIn; savePrefs(); syncPanels(); };
    Array.prototype.forEach.call(m.querySelectorAll("[data-u]"), function (b) { b.onclick = function () { P.speedUp = +b.getAttribute("data-u"); savePrefs(); syncPanels(); }; });
    Array.prototype.forEach.call(m.querySelectorAll("[data-t]"), function (b) { b.onclick = function () { P.speedTarget = +b.getAttribute("data-t"); savePrefs(); syncPanels(); }; });
    q("#cClip").onclick = saveClip;
    q("#cFull").onclick = toggleFullscreen;
    q("#cKeys").onclick = function () { closePanels(); showShortcuts(); };
    if (q("#cBook")) q("#cBook").onclick = function () { closePanels(); PA.notebook.open(); };
  }
  function syncMore() {
    var m = $("more"), P = S.prefs;
    if (!P || !m.firstChild) return;
    var sp = m.querySelector("#rSpeed"), pct = speedPct();
    if (sp && document.activeElement !== sp) sp.value = clamp(pct, 25, 200);
    var sv2 = m.querySelector("#rSpeedV"); if (sv2) sv2.textContent = pct + "% · " + bpmNow() + " bpm";
    Array.prototype.forEach.call(m.querySelectorAll("[data-sp]"), function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-sp") === pct)); });
    m.querySelector("#cClick").setAttribute("aria-pressed", String(!!P.click));
    m.querySelector("#cCount").setAttribute("aria-pressed", String(!!P.countIn));
    Array.prototype.forEach.call(m.querySelectorAll("[data-u]"), function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-u") === (P.speedUp || 0))); });
    Array.prototype.forEach.call(m.querySelectorAll("[data-t]"), function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-t") === (P.speedTarget || 100))); });
    m.querySelector("#rTarget").hidden = !(P.speedUp > 0);
    m.querySelector("#cClip").hidden = !P.loop;
  }

  /* ---- Mixer ---- */
  function buildMixer() {
    var m = $("pMixer"), parts = SC.parts(S.sc), P = S.prefs, mix = P.mix, h = "";
    if (parts.length > 1) {
      h += '<div class="row"><label for="mMain">Your part</label><select class="field sel" id="mMain" aria-label="Your part">' + parts.map(function (p, i) { return '<option value="' + i + '"' + (i === 0 ? " selected" : "") + ">" + esc(SC.partName(p)) + "</option>"; }).join("") + "</select></div>";
    }
    parts.forEach(function (p) {
      var opts = (p.drum ? DRUM_SOUNDS : SOUNDS).map(function (s) { return '<option value="' + s[0] + '">' + s[1] + "</option>"; }).join("");
      h += '<div class="mx" data-key="' + esc(p.key) + '"><div class="mx-h"><b>' + esc(SC.partName(p)) + "</b>" + (p.isMain ? "<small>main</small>" : "") +
        '<div class="chips"><button class="chip sm" type="button" data-mute="' + esc(p.key) + '" aria-pressed="false" aria-label="Mute ' + esc(SC.partName(p)) + '">M</button>' +
        '<button class="chip sm" type="button" data-solo="' + esc(p.key) + '" aria-pressed="false" aria-label="Solo ' + esc(SC.partName(p)) + '">S</button>' +
        '<button class="chip sm ico" type="button" data-hide="' + esc(p.key) + '" aria-pressed="false" aria-label="Show ' + esc(SC.partName(p)) + '"></button></div></div>' +
        '<div class="mx-b"><input type="range" min="0" max="100" data-vol="' + esc(p.key) + '" aria-label="Volume ' + esc(SC.partName(p)) + '"><select class="field sel sm" data-snd="' + esc(p.key) + '" aria-label="Sound ' + esc(SC.partName(p)) + '">' + opts + "</select></div></div>";
    });
    h += '<div class="mx"><div class="mx-h"><b>Click</b><div class="chips"><button class="chip sm" type="button" id="mxClick" aria-pressed="false">On</button><button class="chip sm" type="button" id="mxCount" aria-pressed="false">Count-in</button></div></div><div class="mx-b"><input type="range" min="0" max="100" id="mxClickVol" aria-label="Click volume"></div></div>';
    h += '<div class="mx"><div class="mx-h"><b>Master</b></div><div class="mx-b"><input type="range" min="0" max="100" id="mxMaster" aria-label="Master volume"></div></div>';
    m.innerHTML = h;
    var q = function (s) { return m.querySelector(s); };
    function each(sel, fn) { Array.prototype.forEach.call(m.querySelectorAll(sel), fn); }
    each("[data-mute]", function (b) { b.onclick = function () { var x = mixOf(b.getAttribute("data-mute")); x.mute = !x.mute; mixChanged(); }; });
    each("[data-solo]", function (b) { b.onclick = function () { var x = mixOf(b.getAttribute("data-solo")); x.solo = !x.solo; mixChanged(); }; });
    each("[data-hide]", function (b) { b.onclick = function () { var x = mixOf(b.getAttribute("data-hide")); x.hide = !x.hide; mixChanged(true); }; });
    each("[data-vol]", function (b) { b.oninput = function () { mixOf(b.getAttribute("data-vol")).vol = (+b.value) / 100; mixChanged(); }; });
    each("[data-snd]", function (b) { b.onchange = function () { mixOf(b.getAttribute("data-snd")).sound = b.value; mixChanged(); }; });
    q("#mxClick").onclick = function () { P.click = !P.click; savePrefs(); syncPanels(); };
    q("#mxCount").onclick = function () { P.countIn = !P.countIn; savePrefs(); syncPanels(); };
    q("#mxClickVol").oninput = function () { P.clickVol = (+this.value) / 100; EN.applyVolumes(); savePrefs(); };
    q("#mxMaster").oninput = function () { P.instVol = (+this.value) / 100; EN.applyVolumes(); savePrefs(); };
    if (q("#mMain")) q("#mMain").onchange = function () { setMainPart(+this.value); };
  }
  function mixChanged(redraw) { applyMix(); savePrefs(); syncMixer(); if (redraw) renderView(); }
  function syncMixer() {
    var m = $("pMixer"), P = S.prefs;
    if (!P || !m.firstChild) return;
    var parts = SC.parts(S.sc);
    parts.forEach(function (p) {
      var x = P.mix[p.key] || {}, q = function (s) { return m.querySelector("[" + s + '="' + p.key + '"]'); };
      q("data-mute").setAttribute("aria-pressed", String(!!x.mute));
      q("data-solo").setAttribute("aria-pressed", String(!!x.solo));
      var hb = q("data-hide"); hb.setAttribute("aria-pressed", String(!x.hide)); hb.innerHTML = x.hide ? ICON.eyeoff : ICON.eye; hb.setAttribute("aria-label", (x.hide ? "Show " : "Hide ") + SC.partName(p));
      var vol = q("data-vol"); if (document.activeElement !== vol) vol.value = Math.round((x.vol == null ? 1 : x.vol) * 100);
      var sn = q("data-snd"); if (document.activeElement !== sn) sn.value = x.sound || autoSound(p);
      m.querySelector('.mx[data-key="' + p.key + '"]').classList.toggle("off", !!x.mute);
    });
    m.querySelector("#mxClick").setAttribute("aria-pressed", String(!!P.click));
    m.querySelector("#mxCount").setAttribute("aria-pressed", String(!!P.countIn));
    var cv = m.querySelector("#mxClickVol"); if (document.activeElement !== cv) cv.value = Math.round((P.clickVol == null ? 0.7 : P.clickVol) * 100);
    var mv = m.querySelector("#mxMaster"); if (document.activeElement !== mv) mv.value = Math.round((P.instVol == null ? 0.8 : P.instVol) * 100);
  }
  /* "Your part": the chosen part becomes the main one (PAImport.setMain swaps it with the main part in place). */
  function setMainPart(idx) {
    if (!idx || !window.PAImport || !S.score.parts || !S.score.parts[idx - 1]) return;
    var slot = S.score.parts[idx - 1], pk = slot.id || ("part" + (idx - 1)), mix = S.prefs.mix, t = mix.main; mix.main = mix[pk]; mix[pk] = t;
    if (!mix.main) delete mix.main; if (!mix[pk]) delete mix[pk];
    var was = S.playing; if (was) pausePlay(true);
    PAImport.setMain(S.score, idx - 1);
    SC.markTies(S.score);
    var bad = SC.checkBars(S.score, true);
    S.piece.flags = S.piece.flags || {}; S.piece.flags.off = bad.map(function (i) { return S.score.measures[i].n; });
    S.piece.updated = Date.now();
    S.prefs.viz.kind = null;
    S.piece.prefs = S.prefs; ST.save();
    rebuild(true);
    S.view = pickView(S.prefs.view);   // prefs.view is the view he chose, so Score comes back when a part with tab is main again
    buildPanels(); syncViewButtons(); updateTransport();
    PA.viz.mount($("viz")); renderView();
    PA.emit("main", { index: idx });
  }

  /* ---- Display ---- */
  function buildDisplay() {
    var m = $("pDisplay"), hasTab = SC.hasTab(S.sc), h = "";
    var toggles = [];
    if (hasTab) toggles.push(["notation", "Notation"], ["tab", "Tab"]);
    if (SC.hasChords(S.sc)) toggles.push(["chords", "Chord names"]);
    toggles.push(["pitch", "Pitch names"], ["counts", "Counts"], ["barNums", "Bar numbers"]);
    if (S.sc.measures.some(function (b) { return b.events.some(function (e) { return e.lyric; }); })) toggles.push(["lyrics", "Lyrics"]);
    toggles.push(["expand", "Expand repeats"], ["focus", "Focus loop"]);
    h += '<div class="row"><span class="lb">Show</span><div class="chips">' + toggles.map(function (t) { return chipBtn(t[1], 'data-d="' + t[0] + '"', false); }).join("") + "</div></div>";
    h += '<div class="row"><span class="lb">Layout</span><div class="chips grow" id="dLay">' + chipBtn("Wrapped", 'data-l="wrap"', false) + chipBtn("Horizontal", 'data-l="horizontal"', false) + "</div></div>";
    h += '<div class="row two"><div class="row"><span class="lb">Zoom <b id="dZoomV"></b></span><div class="chips grow"><button class="chip" id="dZm" type="button" aria-label="Zoom out">&minus;</button><button class="chip" id="dZp" type="button" aria-label="Zoom in">+</button></div></div>' +
      '<div class="row"><span class="lb">Transpose <b id="dTrV"></b></span><div class="chips grow"><button class="chip" id="dTm" type="button" aria-label="Down a semitone">&minus;</button><button class="chip" id="dTp" type="button" aria-label="Up a semitone">+</button></div></div></div>';
    m.innerHTML = h;
    Array.prototype.forEach.call(m.querySelectorAll("[data-d]"), function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-d"), d = S.prefs.display;
        d[k] = !d[k];
        if (k === "notation" && !d.notation && !d.tab) d.tab = true;
        if (k === "tab" && !d.tab && !d.notation) d.notation = true;
        savePrefs(); syncDisplay(); renderView();
      };
    });
    Array.prototype.forEach.call(m.querySelectorAll("[data-l]"), function (b) { b.onclick = function () { S.prefs.display.layout = b.getAttribute("data-l"); savePrefs(); syncDisplay(); renderView(); }; });
    m.querySelector("#dZm").onclick = function () { setZoom(S.prefs.display.zoom - 10); };
    m.querySelector("#dZp").onclick = function () { setZoom(S.prefs.display.zoom + 10); };
    m.querySelector("#dTm").onclick = function () { setTranspose(S.prefs.transpose - 1); };
    m.querySelector("#dTp").onclick = function () { setTranspose(S.prefs.transpose + 1); };
  }
  function syncDisplay() {
    var m = $("pDisplay"), d = S.prefs && S.prefs.display;
    if (!d || !m.firstChild) return;
    Array.prototype.forEach.call(m.querySelectorAll("[data-d]"), function (b) { b.setAttribute("aria-pressed", String(!!d[b.getAttribute("data-d")])); });
    Array.prototype.forEach.call(m.querySelectorAll("[data-l]"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-l") === d.layout)); });
    m.querySelector("#dZoomV").textContent = d.zoom + "%";
    var t = S.prefs.transpose;
    m.querySelector("#dTrV").textContent = (t > 0 ? "+" : "") + t + " · " + SC.parseKey(S.sc.key).name;
  }
  function setZoom(z) {
    z = clamp(Math.round(z / 10) * 10, 60, 200);
    if (z === S.prefs.display.zoom) return;
    S.prefs.display.zoom = z; savePrefs(); syncDisplay(); renderView();
  }
  function setTranspose(t) {
    t = clamp(Math.round(t), -12, 12);
    if (t === S.prefs.transpose) return;
    S.prefs.transpose = t; savePrefs();
    rebuild(false);
    buildDisplay(); syncDisplay();
    PA.viz.mount($("viz"));
    renderView();
  }

  /* ================================================================ clips, sections, shortcuts, full screen */
  function sameLoop(c) {
    var L = S.prefs.loop, lr = EN.loopRange();
    return !!(L && lr && c.a === lr.a && c.b === lr.b);
  }
  function renderClips() {
    var box = $("clips"), p = S.piece, clips = (p && p.clips) || [];
    var show = clips.length > 0 || !!S.prefs.loop;
    box.hidden = !show; box.innerHTML = "";
    clips.forEach(function (c) {
      var b = el("button", "chip clip", esc(c.name)); b.type = "button"; b.setAttribute("data-clip", c.id); b.setAttribute("aria-pressed", String(sameLoop(c)));
      var timer = 0, long = false;
      b.addEventListener("pointerdown", function () { long = false; timer = setTimeout(function () { long = true; clipMenu(c); }, 520); });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function (n) { b.addEventListener(n, function () { clearTimeout(timer); }); });
      b.addEventListener("contextmenu", function (e) { e.preventDefault(); long = true; clipMenu(c); });
      b.addEventListener("click", function () { if (long) { long = false; return; } applyClip(c); });
      box.appendChild(b);
    });
    if (S.prefs.loop && !clips.some(sameLoop)) {
      var add = el("button", "chip clip add", "+ Clip"); add.type = "button"; add.id = "clipAdd"; add.onclick = saveClip; box.appendChild(add);
    }
    layout();
  }
  function saveClip() {
    var lr = EN.loopRange();
    if (!lr) return;
    var p = S.piece; p.clips = p.clips || [];
    askText("Clip name", "Clip " + (p.clips.length + 1), function (name) {
      p.clips.push({ id: uid(), name: name, a: lr.a, b: lr.b }); p.updated = Date.now(); ST.save();
      renderClips(); PA.emit("clips", {});
    });
  }
  function applyClip(c) {
    var P = S.tl.passes, pa = P[c.a], pb = P[c.b];
    if (!pa || !pb) return;
    var a = Math.min(pa.bar, pb.bar), b = Math.max(pa.bar, pb.bar);
    S.prefs.loop = { a: a, b: b }; S.loopSel = 0; S.loopPick = null; savePrefs();
    if (S.prefs.display.focus) renderView(); else paintLoop();
    updateTransport(); renderClips();
    var lr = EN.loopRange();
    seekTo(lr ? lr.start : pa.start);
    PA.emit("loop", { loop: S.prefs.loop, clip: c });
  }
  function clipMenu(c) {
    var d = dialog('<div class="sh-h"><h2>' + esc(c.name) + '</h2></div><div class="menu"><button class="btn" id="cmRen" type="button">Rename</button><button class="btn" id="cmDel" type="button" style="color:var(--danger)">Delete</button></div>');
    d.querySelector("#cmRen").onclick = function () { askText("Rename", c.name, function (v) { c.name = v; ST.save(); renderClips(); }); };
    d.querySelector("#cmDel").onclick = function () { closeDlg(); S.piece.clips = S.piece.clips.filter(function (x) { return x !== c; }); ST.save(); renderClips(); };
  }
  function showSections() {
    var secs = SC.sections(S.sc);
    var d = dialog('<div class="sh-h"><h2>Sections</h2></div><div class="menu">' + secs.map(function (s, i) { return '<button class="btn" type="button" data-s="' + i + '">' + esc(s.name) + '<small>bar ' + S.sc.measures[s.bar].n + "</small></button>"; }).join("") + "</div>");
    Array.prototype.forEach.call(d.querySelectorAll("[data-s]"), function (b) {
      b.onclick = function () {
        var s = secs[+b.getAttribute("data-s")], pi = EN.firstPassOf(S.tl, s.bar);
        closeDlg();
        if (pi >= 0) { scrollHold = 0; seekTo(S.tl.passes[pi].start); }
      };
    });
  }
  var KEYS = [["Space", "Play / pause"], ["← →", "Previous / next bar"], ["Shift ← →", "Extend the loop"], ["L", "Loop this bar on / off"], ["[ ]", "Speed −5% / +5%"], ["− =", "Zoom out / in"],
    ["M", "Click on / off"], ["C", "Count-in on / off"], ["F", "Fretboard / keyboard"], ["N", "Notebook"], ["Esc", "Clear the loop"], ["Home", "Back to start"], ["?", "This list"]];
  function showShortcuts() {
    dialog('<div class="sh-h"><h2>Keys</h2></div><dl class="keys">' + KEYS.map(function (k) { return "<dt>" + esc(k[0]) + "</dt><dd>" + esc(k[1]) + "</dd>"; }).join("") + '</dl><div class="btns"><button class="btn" id="dlgNo" type="button">Close</button></div>').querySelector("#dlgNo").onclick = closeDlg;
  }
  function toggleFullscreen() {
    var on = !document.body.classList.contains("fs");
    document.body.classList.toggle("fs", on);
    $("fsBar").hidden = !on;
    closePanels();
    try {
      if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
      else if (!on && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    } catch (e) {}
    setTimeout(function () { layout(); if (S.route === "player") renderView(); }, 120);
  }
  function stepBar(dir) {
    if (!S.tl) return;
    var loc = EN.locate(S.tl, curPos()), r = V.rOf(loc), list = S.R.list;
    if (r == null) r = 0;
    var target;
    if (dir < 0 && loc.off > 0.3) target = r; else target = clamp(r + dir, 0, list.length - 1);
    scrollHold = 0;
    seekTo(V.rSeekPos(target));
  }
  function extendLoop(dir) {
    var L = S.prefs.loop, n = S.sc.measures.length;
    if (!L) { var loc = S.loc || EN.locate(S.tl, curPos()); L = { a: loc.bar, b: loc.bar }; }
    var a = L.a, b = L.b;
    if (dir < 0) a = Math.max(0, a - 1); else b = Math.min(n - 1, b + 1);
    setLoop(a, b, false);
  }
  function onKey(e) {
    if (S.route !== "player" || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, tag = (t && t.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag) && !(tag === "INPUT" && t.type === "range")) return;
    if ($("dlg").open || $("addSheet").open) return;
    var k = e.key;
    if (k === " ") { if (t === document.body || t.type === "range") { e.preventDefault(); S.playing ? pausePlay() : startPlay(); } return; }
    var used = true;
    if (k === "ArrowLeft") { if (e.shiftKey) extendLoop(-1); else stepBar(-1); }
    else if (k === "ArrowRight") { if (e.shiftKey) extendLoop(1); else stepBar(1); }
    else if (k === "l" || k === "L") { if (S.prefs.loop) clearLoop(); else { var loc = S.loc || EN.locate(S.tl, curPos()); setLoop(loc.bar, loc.bar, false); } }
    else if (k === "[") changeSpeed(S.prefs.speed - 0.05);
    else if (k === "]") changeSpeed(S.prefs.speed + 0.05);
    else if (k === "-" || k === "_") setZoom(S.prefs.display.zoom - 10);
    else if (k === "=" || k === "+") setZoom(S.prefs.display.zoom + 10);
    else if (k === "m" || k === "M") { S.prefs.click = !S.prefs.click; savePrefs(); syncPanels(); }
    else if (k === "c" || k === "C") { S.prefs.countIn = !S.prefs.countIn; savePrefs(); syncPanels(); }
    else if (k === "f" || k === "F") { S.prefs.viz.on = !S.prefs.viz.on; savePrefs(); PA.viz.mount($("viz")); PA.viz.update(S.loc); syncViewButtons(); layout(); }
    else if (k === "n" || k === "N") { if (PA.notebook) PA.notebook.open(); }
    else if (k === "Escape") { if (anyPanelOpen()) closePanels(); else if (document.body.classList.contains("fs")) toggleFullscreen(); else clearLoop(); }
    else if (k === "Home") { var L = EN.loopRange(); scrollHold = 0; seekTo(L ? L.start : 0); }
    else if (k === "?") showShortcuts();
    else used = false;
    if (used) e.preventDefault();
  }

  /* ---- scrolling bookkeeping: do not fight the user's finger ---- */
  ["touchstart", "wheel", "keydown"].forEach(function (n) {
    window.addEventListener(n, function (e) {
      if (n === "touchstart") { if ($("view").contains(e.target)) touching = true; return; }
      if (n === "keydown" && !/^(Arrow|Page|Home|End| )/.test(e.key)) return;
      scrollHold = Date.now() + 2000;
    }, { passive: true });
  });
  ["touchend", "touchcancel"].forEach(function (n) { window.addEventListener(n, function () { if (touching) { touching = false; scrollHold = Date.now() + 2000; } }, { passive: true }); });

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
      layout();
      if (S.route !== "player") return;
      var w = $("vPlayer").clientWidth;
      if (w === lastW) return;
      lastW = w;
      if (S.view !== "page") renderView();
      PA.viz.mount($("viz"));
    }, 150);
  });

  function boot() {
    ST.load(); data = ST.data;
    $("add").onclick = function () { openAdd(null); };
    $("back").onclick = function () { location.hash = ""; };
    $("bPlay").onclick = function () { S.playing ? pausePlay() : startPlay(); };
    $("fsPlay").onclick = function () { S.playing ? pausePlay() : startPlay(); };
    $("fsExit").onclick = toggleFullscreen;
    $("bStart").onclick = function () { var L = EN.loopRange(); scrollHold = 0; seekTo(L ? L.start : 0); };
    $("bLoop").onclick = toggleLoop;
    $("bMore").onclick = function () { openPanel("more"); };
    $("tMix").onclick = function () { openPanel("mixer"); };
    $("tDisp").onclick = function () { openPanel("display"); };
    $("tSec").onclick = showSections;
    $("tViz").onclick = function () { S.prefs.viz.on = !S.prefs.viz.on; savePrefs(); PA.viz.mount($("viz")); PA.viz.update(S.loc); syncViewButtons(); layout(); };
    holdButton($("bSlow"), function () { changeSpeed(S.prefs.speed - 0.05); });
    holdButton($("bFast"), function () { changeSpeed(S.prefs.speed + 0.05); });
    $("bBpm").onclick = typeSpeed;
    Array.prototype.forEach.call($("views").querySelectorAll("button"), function (b) { b.onclick = function () { setView(b.getAttribute("data-v")); }; });
    $("addSheet").addEventListener("cancel", function (e) { e.preventDefault(); closeAdd(); });
    window.addEventListener("hashchange", route);
    window.addEventListener("pagehide", function () { if (S.playing) pausePlay(true); ST.save(); });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") ST.save(); });
    document.addEventListener("fullscreenchange", function () {
      if (!document.fullscreenElement && document.body.classList.contains("fs")) { document.body.classList.remove("fs"); $("fsBar").hidden = true; layout(); if (S.route === "player") renderView(); }
    });
    window.addEventListener("keydown", onKey);
    if (window.ResizeObserver) new ResizeObserver(function () { layout(); }).observe($("dock"));
    window.__playalongContext = function () {
      if (S.route === "player" && S.piece && S.loc) {
        var b = S.sc.measures[S.loc.bar];
        return "In Play Along: " + S.piece.title + ", bar " + b.n + " of " + S.sc.measures.length + ", " + speedPct() + "% (" + bpmNow() + " bpm).";
      }
      return S.route === "player" && S.piece ? "In Play Along: " + S.piece.title + "." : "In Play Along, list of pieces.";
    };
    layout();
    route();
  }

  /* ---- tools row: phase 3 can add buttons next to Display / Mixer ---- */
  var tools = {
    add: function (id, iconHtml, label, fn) {
      var b = el("button", "icon-btn sm", iconHtml); b.type = "button"; b.id = "tool-" + id; b.setAttribute("aria-label", label); b.onclick = fn;
      $("tools").insertBefore(b, $("tDisp")); return b;
    }
  };

  /* PA.app: what other phases call. */
  PA.app = {
    S: S, E: E, tools: tools, ICON: ICON,
    openPiece: openPiece, rebuild: rebuild, renderView: renderView, setView: setView, startPlay: startPlay, pausePlay: pausePlay, seekTo: seekTo,
    changeSpeed: changeSpeed, setLoop: setLoop, clearLoop: clearLoop, setTranspose: setTranspose, setMainPart: setMainPart, applyMix: applyMix, resolveMix: resolveMix,
    save: savePrefs, saveData: function () { ST.save(); }, layout: layout, dialog: dialog, closeDlg: closeDlg, askText: askText, confirmBox: confirmBox,
    openPanel: openPanel, closePanels: closePanels, showErr: showErr, renderClips: renderClips, bpmNow: bpmNow,
    slot: function () { return $("dockSlot"); }, curPos: curPos, updateCursor: updateCursor, renderList: renderList, openAdd: openAdd,
    defaultPrefs: defaultPrefs, loadPrefs: loadPrefs,
    setDriver: setDriver, eng: eng, showHint: showHint, updateTransport: updateTransport, logCall: logCall, uid: uid, esc: esc, el: el, KEYS: KEYS, syncPanels: syncPanels,
    refreshViews: syncViewButtons, toast: toast, transNotes: transNotes
  };

  // for tests and tinkering in the console
  window.PlayAlong = {
    S: S, E: E, data: function () { return ST.data; }, normalizePage: SC.normalizePage, mergePages: SC.mergePages, finishScore: SC.finishScore,
    buildTimeline: EN.buildTimeline, locate: EN.locate, transcribe: PA.transcribe, ksSamples: EN.ksSamples, parsePitch: SC.parsePitch,
    loopRange: EN.loopRange, posAtTime: EN.posAtTime, saveData: function () { ST.save(); }, reload: function () { ST.load(); data = ST.data; route(); },
    openPiece: openPiece, pgPut: ST.pgPut, abc: PA.abc, SC: SC, EN: EN, viz: PA.viz, app: PA.app
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
