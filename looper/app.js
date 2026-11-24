/* Looper UI: the ring, the layers, the pedal in the dock, and three sheets (settings, loops, trim).
   All sound and saving is engine.js (window.Looper); this file only shows it and passes taps on. */
(function () {
  "use strict";
  var L = window.Looper, D = window.LoopDSP, P = L.P, S = L.S;
  var $ = function (id) { return document.getElementById(id); };

  var I = function (d, o) { return '<svg viewBox="0 0 24 24" fill="' + (o === "f" ? "currentColor" : "none") + '" stroke="' + (o === "f" ? "none" : "currentColor") + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"; };
  var ICON = {
    play: I('<path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/>', "f"),
    stop: I('<rect x="6" y="6" width="12" height="12" rx="2"/>', "f"),
    square: I('<rect x="7" y="7" width="10" height="10" rx="2"/>', "f"),
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 7.5A7 7 0 1 0 19 13"/><path d="M19 4v4h-4"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>',
    xs: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
    spk: I('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
    spkOff: I('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>'),
    trash: I('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>'),
    share: I('<path d="M12 15V3"/><path d="M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>'),
    trim: I('<path d="M6 3v18M18 3v18"/><path d="M6 8h3M6 16h3M18 8h-3M18 16h-3"/><path d="M10 12h4"/>'),
    left: I('<path d="m14 6-6 6 6 6"/>'), right: I('<path d="m10 6 6 6-6 6"/>'),
    memo: I('<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4"/>'),
    plusS: I('<path d="M12 5v14M5 12h14"/>')
  };
  $("play").innerHTML = ICON.play;

  /* ---------- helpers ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function fmt(s) { s = Math.max(0, s || 0); var m = Math.floor(s / 60), x = s - m * 60; return m + ":" + (x < 10 ? "0" : "") + Math.floor(x); }
  function fmt1(s) { s = Math.max(0, s || 0); var m = Math.floor(s / 60), x = s - m * 60; return (m ? m + ":" + (x < 10 ? "0" : "") : "") + x.toFixed(1); }
  function setText(e, t) { if (e._t !== t) { e._t = t; e.textContent = t; } }
  function tempoText(v) { return v.bpm ? (v.guessed ? "≈ " : "") + v.bars + (v.bars === 1 ? " bar · " : " bars · ") + Math.round(v.bpm) + " bpm" : ""; }
  function fit(c) {
    var d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return null;
    if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) { c.width = Math.round(w * d); c.height = Math.round(h * d); }
    var g = c.getContext("2d"); g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, w, h);
    return { g: g, w: w, h: h };
  }
  function dark() { var t = document.documentElement.getAttribute("data-theme"); return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
  function holdRepeat(btn, fn) {
    var t1 = 0, t2 = 0;
    function end() { clearTimeout(t1); clearInterval(t2); }
    btn.addEventListener("pointerdown", function (e) { e.preventDefault(); fn(); t1 = setTimeout(function () { t2 = setInterval(fn, 60); }, 380); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { btn.addEventListener(n, end); });
    btn.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
  }
  var errEl = $("err");
  function showErr(msg) {
    errEl.textContent = msg || ""; errEl.hidden = !msg;
    clearTimeout(showErr.t);
    if (msg) showErr.t = setTimeout(function () { errEl.hidden = true; }, 5000);
  }

  /* ---------- first-loop setup ---------- */
  var setupEl = $("setup"), tempoSet = $("tempo-set");
  function chips(box, items, cur, onPick, attr) {
    box.innerHTML = "";
    items.forEach(function (it) {
      var b = el("button", { class: "chip", type: "button", role: "radio", "aria-checked": String(it[0] === cur) }, it[1]);
      if (it[2]) b.setAttribute("aria-label", it[2]);
      b.addEventListener("click", function () { onPick(it[0]); });
      box.appendChild(b);
    });
  }
  function renderSetup() {
    Array.prototype.forEach.call(setupEl.querySelectorAll("[data-mode]"), function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-mode") === P.mode)); });
    tempoSet.hidden = P.mode !== "tempo";
    $("bpm").textContent = P.bpm;
    chips($("beats-seg"), [[3, "3/4"], [4, "4/4"], [5, "5/4"], [6, "6/8"], [7, "7/8"]], P.beats, function (v) { L.setPref("beats", v); renderSetup(); });
    chips($("bars-seg"), [[1, "1", "1 bar"], [2, "2", "2 bars"], [4, "4", "4 bars"], [8, "8", "8 bars"], [0, "Tap", "Until tapped"]], P.bars, function (v) { L.setPref("bars", v); renderSetup(); });
  }
  Array.prototype.forEach.call(setupEl.querySelectorAll("[data-mode]"), function (b) {
    b.addEventListener("click", function () { L.setPref("mode", b.getAttribute("data-mode")); renderSetup(); });
  });
  function setBpm(v) { v = Math.max(40, Math.min(240, Math.round(v) || P.bpm)); L.setPref("bpm", v); $("bpm").textContent = v; }
  holdRepeat($("bpm-dec"), function () { setBpm(P.bpm - 1); });
  holdRepeat($("bpm-inc"), function () { setBpm(P.bpm + 1); });
  $("bpm").addEventListener("click", function () {
    var b = $("bpm"), inp = $("bpm-in");
    b.hidden = true; inp.hidden = false; inp.value = P.bpm; inp.focus(); inp.select();
  });
  function bpmDone() { var b = $("bpm"), inp = $("bpm-in"); if (inp.hidden) return; setBpm(parseInt(inp.value, 10)); inp.hidden = true; b.hidden = false; }
  $("bpm-in").addEventListener("blur", bpmDone);
  $("bpm-in").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); bpmDone(); } else if (e.key === "Escape") { $("bpm-in").value = P.bpm; bpmDone(); } });

  /* ---------- overdub length ---------- */
  function renderLen() {
    chips($("len-seg"), [[1, "1×", "One loop"], [2, "2×", "Two loops"], [4, "4×", "Four loops"], [0, "Tap", "Until tapped"]], P.odLen, function (v) { L.setPref("odLen", v); renderLen(); });
  }
  $("redo").addEventListener("click", function () { L.redo(); });

  /* ---------- layers ---------- */
  var listEl = $("layers"), openId = null, rows = {};
  var NAMES = ["Guitar", "Bass", "Keys", "Piano", "Vocals", "Drums", "Synth"];
  function renderLayers() {
    listEl.innerHTML = ""; rows = {};
    S.layers.forEach(function (l) {
      var open = l.id === openId && !l.prov;
      var li = el("li", { class: "layer" + (l.muted ? " muted" : "") + (l.prov ? " prov" : "") });
      li.style.setProperty("--c", l.color);
      var head = el("div", { class: "lhead" });
      var mainB = el("button", { class: "lmain", type: "button", "aria-expanded": String(open), "aria-label": l.name });
      var meta = [];
      if (l.mult > 1) meta.push(l.mult + " loops");
      var later = -Math.round(l.nudge / L.sr() * 1000);
      if (later) meta.push((later > 0 ? "+" : "−") + Math.abs(later) + " ms");
      mainB.innerHTML = '<span class="lsw"></span><span class="lt"><span class="ln">' + esc(l.name) + "</span>" + (meta.length ? '<span class="lm">' + esc(meta.join(" · ")) + "</span>" : "") + "</span>";
      var cv = el("canvas", { class: "lwave", "aria-hidden": "true" });
      mainB.appendChild(cv);
      mainB.addEventListener("click", function () { if (l.prov) return; openId = openId === l.id ? null : l.id; renderLayers(); });
      var mute = el("button", { class: "mute", type: "button", "aria-pressed": String(l.muted), "aria-label": l.muted ? "Unmute " + l.name : "Mute " + l.name }, l.muted ? ICON.spkOff : ICON.spk);
      mute.addEventListener("click", function () { L.toggleMute(l.id); });
      head.appendChild(mainB); head.appendChild(mute);
      li.appendChild(head);
      if (open) li.appendChild(layerBody(l));
      listEl.appendChild(li);
      rows[l.id] = { cv: cv, l: l };
    });
    requestAnimationFrame(drawWaves);
  }
  function rangeRow(label, min, max, val, outFn, onIn, extra) {
    var wrap = el("div", { class: "grp-in" });
    var id = "r" + Math.random().toString(36).slice(2, 7);
    var lb = el("div", { class: "lbl" }, '<label for="' + id + '">' + label + "</label><output>" + outFn(val) + "</output>");
    var row = el("div", { class: "lrow" });
    var r = el("input", { class: "range", id: id, type: "range", min: String(min), max: String(max), step: "1", value: String(val) });
    r.addEventListener("input", function () { lb.querySelector("output").textContent = outFn(+r.value); onIn(+r.value); });
    if (extra) { var a = el("button", { class: "mini", type: "button", "aria-label": extra[0] }, "−"), b = el("button", { class: "mini", type: "button", "aria-label": extra[1] }, "+");
      var step = function (d) { r.value = String(Math.max(min, Math.min(max, +r.value + d))); r.dispatchEvent(new Event("input")); };
      holdRepeat(a, function () { step(-1); }); holdRepeat(b, function () { step(1); });
      row.appendChild(a); row.appendChild(r); row.appendChild(b);
    } else row.appendChild(r);
    wrap.appendChild(lb); wrap.appendChild(row);
    return wrap;
  }
  function layerBody(l) {
    var b = el("div", { class: "lbody" }), sr = L.sr();
    b.appendChild(rangeRow("Volume", 0, 125, Math.round(l.vol * 100), function (v) { return v + "%"; }, function (v) { L.setVol(l.id, v / 100); }));
    var later = -Math.round(l.nudge / sr * 1000);
    b.appendChild(rangeRow("Timing", -150, 150, later, function (v) { return v === 0 ? "0 ms" : (v > 0 ? "+" : "−") + Math.abs(v) + " ms"; }, function (v) { L.setNudge(l.id, -v); }, ["Earlier", "Later"]));
    b.appendChild(rangeRow("Seam fade", 0, 80, Math.round(l.fade / sr * 1000), function (v) { return v + " ms"; }, function (v) { L.setFade(l.id, v); }));
    var nm = el("input", { class: "field", type: "text", maxlength: "40", "aria-label": "Name", enterkeyhint: "done" });
    nm.value = l.name;
    nm.addEventListener("change", function () { L.rename(l.id, nm.value.trim()); });
    nm.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); nm.blur(); } });
    b.appendChild(nm);
    var names = el("div", { class: "names" });
    NAMES.forEach(function (n) {
      var c = el("button", { class: "chip sm", type: "button", "aria-pressed": String(l.name === n) }, n);
      c.addEventListener("click", function () { L.rename(l.id, n); });
      names.appendChild(c);
    });
    b.appendChild(names);
    var acts = el("div", { class: "lrow" });
    if (l.base && S.layers.length === 1) {
      var tr = el("button", { class: "btn", type: "button" }, ICON.trim + "Trim");
      tr.addEventListener("click", openEditor);
      acts.appendChild(tr);
    }
    acts.appendChild(el("span", { class: "sp" }));
    var del = el("button", { class: "chip", type: "button", "aria-label": "Delete layer" }, ICON.trash), armT = 0;
    del.addEventListener("click", function () {
      if (!del.classList.contains("arm")) {
        del.classList.add("arm"); del.textContent = "Delete"; armT = setTimeout(function () { del.classList.remove("arm"); del.innerHTML = ICON.trash; }, 3000);
      } else { clearTimeout(armT); openId = null; L.remove(l.id); }
    });
    acts.appendChild(del);
    b.appendChild(acts);
    return b;
  }
  function tint(c) {
    if (!dark()) return c;
    var n = parseInt(c.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return "rgb(" + Math.round(r + (255 - r) * 0.25) + " " + Math.round(g + (255 - g) * 0.25) + " " + Math.round(b + (255 - b) * 0.25) + ")";
  }
  function drawWaves() {
    var muted = css("--muted");
    for (var id in rows) {
      var o = rows[id], l = o.l, f = fit(o.cv); if (!f || !l.peaks) continue;
      var g = f.g, w = f.w, h = f.h, pk = l.peaks, n = Math.min(pk.length, Math.floor(w / 3)), per = pk.length / n, bw = Math.max(1, w / n - 1);
      var ph = L.layerPhase(l), col = tint(l.color);
      for (var i = 0; i < n; i++) {
        var mx = 0; for (var z = Math.floor(i * per); z < Math.floor((i + 1) * per); z++) if (pk[z] > mx) mx = pk[z];
        var bh = Math.max(2, mx * (h - 4)), x = i * (w / n);
        var on = ph >= 0 && (i + 0.5) / n <= ph;
        g.globalAlpha = on ? 1 : 0.55; g.fillStyle = on ? col : muted;
        g.fillRect(x, (h - bh) / 2, bw, bh);
      }
      if (ph >= 0) { g.globalAlpha = 1; g.fillStyle = css("--text"); g.fillRect(Math.round(ph * w) - 1, 0, 2, h); }
      g.globalAlpha = 1;
    }
  }

  /* ---------- the ring ---------- */
  var C = 2 * Math.PI * 88, arc = $("arc"), recArc = $("rec-arc"), head = $("head"), ticksEl = $("ticks");
  arc.style.strokeDasharray = C; recArc.style.strokeDasharray = C + " " + C;
  var tickKey = "";
  function ticks(bars, beats) {
    var key = bars + "x" + beats;
    if (key === tickKey) return; tickKey = key;
    var n = bars * beats, h = "";
    if (n && n <= 96) for (var k = 0; k < n; k++) {
      var a = k / n * 2 * Math.PI - Math.PI / 2, bar = k % beats === 0, r1 = bar ? 74 : 78, r2 = 82;
      if (n > 48 && !bar) continue;
      h += '<line class="tick' + (bar ? " bar" : "") + '" x1="' + (100 + r1 * Math.cos(a)).toFixed(2) + '" y1="' + (100 + r1 * Math.sin(a)).toFixed(2) + '" x2="' + (100 + r2 * Math.cos(a)).toFixed(2) + '" y2="' + (100 + r2 * Math.sin(a)).toFixed(2) + '"/>';
    }
    ticksEl.innerHTML = h;
  }
  var big = $("big"), sub = $("sub"), mainBtn = $("main"), mainIn = $("main-in"), playBtn = $("play"), undoBtn = $("undo");
  var meter = $("meter"), meterI = $("meter-i");
  var lastMain = "", lastPlay = null;
  function barBeat(v) { var b = Math.floor(v.phase * v.bars * v.beats + 1e-6); return (Math.floor(b / v.beats) + 1) + "." + (b % v.beats + 1); }
  function setArc(p) { arc.style.strokeDashoffset = String(C * (1 - Math.max(0, Math.min(1, p)))); }
  function setRec(start, p) {
    recArc.style.transform = "rotate(" + (-90 + start * 360) + "deg)";
    recArc.style.strokeDasharray = (C * Math.max(0, Math.min(1, p))).toFixed(2) + " " + C;
  }
  function frame() {
    var v = L.view(), r = v.rec, bigT = "", subT = "", recOn = false;
    document.body.classList.toggle("recording", !!r && r.phase !== "countin");
    if (r) {
      if (r.kind === "first" && r.mode === "tempo") ticks(r.bars || 1, P.beats);
      else if (r.kind === "first") ticks(0, 0);
      else ticks(v.bars, v.beats);
      if (r.phase === "countin") {
        var beatsNow = r.kind === "first" ? P.beats : v.beats;
        if (r.count && r.count <= beatsNow) bigT = String(r.count);
        else if (r.kind === "over" && v.playing && v.bpm) bigT = barBeat(v);
        else bigT = r.count ? String(r.count) : fmt1(r.wait);
        subT = r.kind === "over" ? "Next loop" : "Count-in";
        setArc(r.kind === "over" ? v.phase : 0);
      } else if (r.kind === "first" && r.mode === "free") {
        bigT = fmt1(r.elapsed); subT = r.phase === "closing" ? "" : "Recording";
        setArc(0); setRec(0, 1); recOn = true;
      } else if (r.kind === "first") {
        var bd = r.barsDone || 0;
        bigT = "Bar " + (Math.floor(bd) + 1); subT = r.bars ? "of " + r.bars : "Recording";
        setArc(0); setRec(0, r.bars ? bd / r.bars : bd - Math.floor(bd)); recOn = true;
      } else {
        var lp = r.loops || 0;
        bigT = r.mult === 1 ? "Rec" : "Loop " + (Math.floor(lp) + 1);
        subT = r.mult > 1 ? "of " + r.mult : r.mult === 1 ? "" : "Recording";
        setArc(v.phase);
        var p = r.mult === 1 ? r.progress : lp - Math.floor(lp);
        setRec(r.mult === 1 ? r.start : v.phase - p, p || 0); recOn = true;
      }
    } else if (v.N) {
      ticks(v.bars, v.beats);
      if (v.playing) {
        bigT = v.bpm ? barBeat(v) : fmt1(v.phase * v.len);
      } else bigT = fmt(v.len) === "0:00" ? fmt1(v.len) : fmt(v.len);
      setArc(v.playing ? v.phase : 0);
    } else {
      ticks(P.mode === "tempo" && P.bars ? P.bars : 0, P.beats);
      setArc(0);
    }
    recArc.style.opacity = recOn ? "1" : "0";
    var ph = v.playing && !(r && r.phase === "countin" && r.kind === "first") ? v.phase : -1;
    if (ph >= 0 && v.N) { var a = ph * 2 * Math.PI - Math.PI / 2; head.setAttribute("cx", (100 + 88 * Math.cos(a)).toFixed(2)); head.setAttribute("cy", (100 + 88 * Math.sin(a)).toFixed(2)); head.style.opacity = "1"; }
    else head.style.opacity = "0";
    setText(big, bigT); setText(sub, subT);
    big.classList.toggle("rec", !!r && r.phase !== "countin");

    // the pedal
    var st = !r ? (v.N ? "over" : "rec") : r.phase === "countin" ? "wait" : r.phase === "closing" ? "busy" : r.kind === "first" && r.mode === "free" ? "close" : "live";
    if (st !== lastMain) {
      lastMain = st;
      mainBtn.className = "main " + st;
      mainIn.innerHTML = st === "over" ? ICON.plus : st === "close" ? ICON.close : st === "live" ? ICON.square : st === "wait" ? ICON.x : "";
      mainBtn.setAttribute("aria-label", { rec: "Record", over: "Overdub", wait: "Cancel", busy: "Finishing", close: "Close the loop", live: "Stop at the end" }[st]);
    }
    var on = v.playing || !!r;
    if (on !== lastPlay) { lastPlay = on; playBtn.innerHTML = on ? ICON.stop : ICON.play; playBtn.setAttribute("aria-label", on ? "Stop" : "Play"); }
    playBtn.disabled = !v.N && !r;
    undoBtn.disabled = !L.canUndo();
    $("redo").hidden = !L.canRedo();

    meter.hidden = !v.mic;
    if (v.mic) {
      var lv = Math.min(1, Math.sqrt(v.level));
      meterI.style.width = (lv * 100).toFixed(1) + "%";
      meter.classList.toggle("hot", lv > 0.8); meter.classList.toggle("clip", v.clip);
    }
    drawWaves();
    requestAnimationFrame(frame);
  }

  /* ---------- page state ---------- */
  function renderAll() {
    var has = S.layers.length > 0 || !!S.rec;
    setupEl.hidden = has;
    $("od").hidden = !S.layers.length;
    var v = L.view();
    var tc = $("tempo-chip");
    tc.hidden = !v.N; tc.textContent = tempoText(v);
    $("click-chip").hidden = !v.N || !v.bpm; $("click-chip").setAttribute("aria-pressed", String(!!P.click));
    $("edit-chip").hidden = !(S.layers.length === 1 && S.layers[0].base && !S.layers[0].prov && !S.rec);
    $("edit-chip").innerHTML = ICON.trim + "Trim";
    $("set-dot").hidden = !!P.calibrated || !S.layers.length;
    renderSetup(); renderLen(); renderLayers();
  }
  L.on(function (what) {
    if (what === "error") { showErr(S.err && S.err.msg); return; }
    if (what === "mic" || what === "saved") return;
    if (what === "prefs") { $("click-chip").setAttribute("aria-pressed", String(!!P.click)); $("set-dot").hidden = !!P.calibrated || !S.layers.length; return; }
    renderAll();
  });

  $("click-chip").addEventListener("click", function () { L.setPref("click", !P.click); });
  $("edit-chip").addEventListener("click", openEditor);
  $("tempo-chip").addEventListener("click", openTempo);

  /* ---------- the pedal ---------- */
  mainBtn.addEventListener("click", function () { showErr(""); L.main(); });
  playBtn.addEventListener("click", function () { L.toggle(); });
  (function () {
    var t = 0, held = false;
    undoBtn.addEventListener("pointerdown", function () { held = false; t = setTimeout(function () { held = true; L.redo(); }, 600); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { undoBtn.addEventListener(n, function () { clearTimeout(t); }); });
    undoBtn.addEventListener("click", function () { if (held) { held = false; return; } L.undo(); });
  })();

  /* A Bluetooth page-turner pedal sends arrow or page keys: right/down/page down (or space)
     records, left/up/page up plays and stops, held left undoes. */
  var leftDown = 0, leftT = 0;
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tg = e.target, typing = tg && (tg.tagName === "INPUT" || tg.tagName === "SELECT" || tg.tagName === "TEXTAREA" || tg.isContentEditable);
    if (typing || !$("scrim").hidden) return;
    var k = e.key;
    if (k === " " || k === "Enter" || k === "ArrowRight" || k === "ArrowDown" || k === "PageDown") {
      if (tg && tg.tagName === "BUTTON" && (k === " " || k === "Enter") && tg !== mainBtn) return;
      e.preventDefault(); if (!e.repeat) { showErr(""); L.main(); }
    } else if (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") {
      e.preventDefault();
      if (e.repeat) return;
      leftDown = Date.now(); clearTimeout(leftT);
      leftT = setTimeout(function () { if (leftDown) { leftDown = 0; L.undo(); } }, 700);
    } else if (k === "z" || k === "Z" || k === "Backspace") {
      e.preventDefault(); if (e.shiftKey) L.redo(); else L.undo();
    }
  });
  document.addEventListener("keyup", function (e) {
    var k = e.key;
    if ((k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") && leftDown) { clearTimeout(leftT); leftDown = 0; L.toggle(); }
  });

  /* ---------- sheets ---------- */
  var scrim = $("scrim"), opener = null, onClose = null;
  function sheet(title, build, label, close) {
    closeSheet(true);
    opener = document.activeElement; onClose = close || null;
    scrim.innerHTML = "";
    var sh = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": label || title, tabindex: "-1" });
    var hd = el("div", { class: "sheet-head" }, "<h2>" + esc(title) + "</h2>");
    var x = el("button", { class: "x-btn", type: "button", "aria-label": "Close" }, ICON.xs);
    x.addEventListener("click", function () { closeSheet(); });
    hd.appendChild(x); sh.appendChild(hd);
    build(sh);
    scrim.appendChild(sh); scrim.hidden = false;
    sh.focus({ preventScroll: true });
    return sh;
  }
  function closeSheet(quiet) {
    if (scrim.hidden) return;
    var f = onClose; onClose = null;
    scrim.hidden = true; scrim.innerHTML = "";
    if (f) f();
    if (!quiet && opener && opener.focus) opener.focus({ preventScroll: true });
  }
  scrim.addEventListener("click", function (e) { if (e.target === scrim) closeSheet(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !scrim.hidden) closeSheet(); });
  function grp(sh, title) { var g = el("div", { class: "grp" }); if (title) g.appendChild(el("h3", null, esc(title))); sh.appendChild(g); return g; }
  function swRow(label, on, fn) {
    var row = el("div", { class: "sw-row" }), id = "s" + Math.random().toString(36).slice(2, 7);
    row.innerHTML = '<span id="' + id + '">' + esc(label) + "</span>";
    var b = el("button", { class: "sw", type: "button", role: "switch", "aria-checked": String(!!on), "aria-labelledby": id });
    b.addEventListener("click", function () { var v = b.getAttribute("aria-checked") !== "true"; b.setAttribute("aria-checked", String(v)); fn(v); });
    row.appendChild(b); return row;
  }
  function seg(items, cur, fn, label) {
    var box = el("div", { class: "seg", role: "radiogroup", "aria-label": label || "" });
    var pick = function (v) { fn(v); chips(box, items, v, pick); };
    chips(box, items, cur, pick);
    return box;
  }

  /* settings */
  $("set-btn").addEventListener("click", openSettings);
  function openSettings() {
    sheet("Settings", function (sh) {
      var g = grp(sh, "Latency");
      var lat = el("div", { class: "lat" });
      var dec = el("button", { class: "mini", type: "button", "aria-label": "Less" }, "−"), out = el("output"), inc = el("button", { class: "mini", type: "button", "aria-label": "More" }, "+");
      var test = el("button", { class: "btn solid", type: "button" }, "Test");
      var note = el("p", { class: "note" });
      function show() { out.textContent = Math.round(L.rtl() * 1000) + " ms"; }
      function nudge(d) { L.setPref("latency", Math.max(0, Math.min(0.4, Math.round((L.rtl() + d / 1000) * 1000) / 1000))); show(); }
      holdRepeat(dec, function () { nudge(-1); }); holdRepeat(inc, function () { nudge(1); });
      test.addEventListener("click", function () {
        test.disabled = true; note.textContent = "Listening…";
        L.calibrate().then(function (r) {
          test.disabled = false; show();
          note.textContent = r.ok ? "Measured " + r.ms + " ms" : "Couldn't hear the clicks. Turn the volume up and unplug headphones (or hold them to the mic).";
        }, function (e) { test.disabled = false; note.textContent = e && e.user ? e.message : "Mic unavailable"; });
      });
      lat.appendChild(dec); lat.appendChild(out); lat.appendChild(inc); lat.appendChild(test);
      g.appendChild(lat); g.appendChild(note); show();
      if (!P.calibrated) note.textContent = "Not tested";

      g = grp(sh, "Overdubs");
      g.appendChild(seg([["next", "Next loop"], ["now", "Right away"]], P.odStart, function (v) { L.setPref("odStart", v); }, "Overdubs start"));
      g.appendChild(el("div", { class: "lbl" }, "<span>Count-in</span>"));
      g.appendChild(seg([[0, "Off"], [1, "1 bar"], [2, "2 bars"]], P.countIn, function (v) { L.setPref("countIn", v); }, "Count-in"));

      g = grp(sh, "First loop");
      g.appendChild(swRow("Trim to the notes", P.autoTrim, function (v) { L.setPref("autoTrim", v); }));
      g.appendChild(rangeRow("Seam fade", 0, 80, P.fade, function (v) { return v + " ms"; }, function (v) { L.setPref("fade", v); }));

      g = grp(sh, "Click");
      g.appendChild(rangeRow("Volume", 0, 100, P.clickVol, function (v) { return v + "%"; }, function (v) { L.setPref("clickVol", v); }));

      g = grp(sh, "Input");
      g.appendChild(rangeRow("Gain", 0, 200, P.inGain, function (v) { return v + "%"; }, function (v) { L.setPref("inGain", v); }));
      g.appendChild(swRow("Hear the input", P.monitor, function (v) { L.setPref("monitor", v); }));
      g.appendChild(swRow("Reduce speaker bleed", P.cleanup, function (v) { L.setPref("cleanup", v); }));
      var devBox = el("div"); g.appendChild(devBox);
      L.devices().then(function (ds) {
        if (ds.length < 2) return;
        var s = el("select", { class: "field", "aria-label": "Input" });
        s.innerHTML = '<option value="">Default input</option>' + ds.map(function (d) { return '<option value="' + esc(d.id) + '"' + (d.id === P.device ? " selected" : "") + ">" + esc(d.label) + "</option>"; }).join("");
        s.addEventListener("change", function () { L.setPref("device", s.value); });
        devBox.appendChild(s);
      });
      var m = L.mic();
      if (m && m.chans > 1) g.appendChild(seg([["mix", "Both"], ["1", "Input 1"], ["2", "Input 2"]], P.chan, function (v) { L.setPref("chan", v); }, "Channel"));

      g = grp(sh, "Foot pedal");
      g.appendChild(el("div", { class: "keys" }, "<kbd>→</kbd><span>Record</span><kbd>←</kbd><span>Play / stop</span><kbd>Hold ←</kbd><span>Undo</span>"));
    });
  }

  /* tempo: bars and beats in the loop (sets the click and the ring's ticks) */
  function stepper(label, val, min, max, fn) {
    var w = el("div", { class: "stp" }, "<span>" + esc(label) + "</span>");
    var row = el("div", { class: "in" }), a = el("button", { class: "mini", type: "button", "aria-label": "Fewer " + label.toLowerCase() }, "−"), o = el("output", null, String(val)), b = el("button", { class: "mini", type: "button", "aria-label": "More " + label.toLowerCase() }, "+");
    var set = function (v) { v = Math.max(min, Math.min(max, v)); val = v; o.textContent = v; fn(v); };
    a.addEventListener("click", function () { set(val - 1); }); b.addEventListener("click", function () { set(val + 1); });
    row.appendChild(a); row.appendChild(o); row.appendChild(b); w.appendChild(row);
    w.set = function (v) { val = v; o.textContent = v; };
    return w;
  }
  function openTempo() {
    if (!S.N) return;
    sheet("Tempo", function (sh) {
      var t = el("div", { class: "ed-t" }), bpmOut = el("div", { class: "stp" }, "<span>BPM</span><span class='val'></span>");
      function show() { bpmOut.querySelector(".val").textContent = Math.round(S.bpm * 10) / 10; }
      t.appendChild(stepper("Bars", S.bars || 4, 1, 64, function (v) { L.setTempo(v, S.beats); show(); }));
      t.appendChild(stepper("Beats", S.beats || 4, 2, 9, function (v) { L.setTempo(S.bars, v); show(); }));
      t.appendChild(bpmOut); show();
      sh.appendChild(t);
      if (S.layers.length === 1 && S.layers[0].base) {
        var tr = el("button", { class: "btn", type: "button" }, ICON.trim + "Trim");
        tr.addEventListener("click", openEditor);
        sh.appendChild(tr);
      }
    });
  }

  /* loops: this one (name, export) and the saved ones */
  $("list-btn").addEventListener("click", openLoops);
  var expTimes = 4;
  function openLoops() {
    sheet("Loops", function (sh) {
      if (S.layers.length) {
        var cur = el("div", { class: "cur" });
        var nm = el("input", { class: "field", type: "text", maxlength: "60", "aria-label": "Name", enterkeyhint: "done" });
        nm.value = S.name || "";
        nm.addEventListener("change", function () { L.renameSession(nm.value); });
        nm.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); nm.blur(); } });
        cur.appendChild(nm);
        var row = el("div", { class: "row" });
        row.appendChild(seg([[1, "1×"], [2, "2×"], [4, "4×"], [8, "8×"]], expTimes, function (v) { expTimes = v; }, "Times round"));
        cur.appendChild(row);
        var row2 = el("div", { class: "row" });
        var shr = el("button", { class: "btn", type: "button" }, ICON.share + "Share");
        var mem = el("button", { class: "btn", type: "button" }, ICON.memo + "To Voice Memos");
        shr.addEventListener("click", function () { shareMix(); });
        mem.addEventListener("click", function () {
          mem.disabled = true;
          L.toMemos(expTimes).then(function () { mem.innerHTML = ICON.memo + "Saved"; logEvent("Sent " + (S.name || "a loop") + " to Voice Memos"); }, function () { mem.disabled = false; showErr("Couldn't save"); });
        });
        row2.appendChild(shr); row2.appendChild(mem);
        cur.appendChild(row2);
        sh.appendChild(cur);
      }
      var nb = el("button", { class: "btn solid", type: "button" }, ICON.plusS + "New loop");
      nb.addEventListener("click", function () { L.newSession().then(function () { closeSheet(); }); });
      sh.appendChild(nb);
      var ul = el("ul", { class: "loops", "aria-label": "Saved loops" });
      sh.appendChild(ul);
      L.list().then(function (all) {
        all.forEach(function (d) {
          var li = el("li", { class: "lp", "aria-current": String(d.id === S.sid) });
          var ob = el("button", { class: "lp-open", type: "button" });
          var secs = d.N / (d.sr || 48000), n = (d.layers || []).length;
          ob.innerHTML = '<span class="lp-t"><span class="lp-n">' + esc(d.name || "Loop") + '</span><span class="lp-m">' + esc(new Date(d.updated).toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " + n + (n === 1 ? " layer" : " layers") + (d.bpm ? " · " + Math.round(d.bpm) + " bpm" : " · " + fmt1(secs) + "s")) + "</span></span>";
          var cv = el("canvas", { "aria-hidden": "true" }); ob.appendChild(cv);
          ob.addEventListener("click", function () {
            if (d.id === S.sid) { closeSheet(); return; }
            L.open(d.id).then(function () { closeSheet(); }, function () { showErr("Couldn't open"); });
          });
          var del = el("button", { class: "x-btn", type: "button", "aria-label": "Delete " + (d.name || "loop") }, ICON.trash), armT = 0;
          del.addEventListener("click", function () {
            if (!del.classList.contains("arm")) { del.classList.add("arm"); del.style.background = css("--rec"); del.style.color = "#fff"; armT = setTimeout(function () { del.classList.remove("arm"); del.style.background = ""; del.style.color = ""; }, 3000); return; }
            clearTimeout(armT);
            L.deleteSession(d.id).then(function () { li.remove(); });
          });
          li.appendChild(ob); li.appendChild(del); ul.appendChild(li);
          requestAnimationFrame(function () {
            var f = fit(cv); if (!f || !d.peaks) return;
            var p = d.peaks, bw = f.w / p.length; f.g.fillStyle = css("--muted");
            for (var i = 0; i < p.length; i++) { var bh = Math.max(1.5, p[i] * (f.h - 2)); f.g.fillRect(i * bw, (f.h - bh) / 2, Math.max(1, bw - 1), bh); }
          });
        });
      }).catch(function () {});
    });
  }
  function logEvent(t) { try { if (window.MusicLog && MusicLog.event) MusicLog.event("loop", t); } catch (e) {} }
  function shareMix() {
    var x = L.exportWav(expTimes), name = (S.name || "Loop").replace(/[\\/:*?"<>|]+/g, "-") + ".wav", file = null;
    try { file = new File([x.blob], name, { type: "audio/wav" }); } catch (e) {}
    logEvent("Exported " + (S.name || "a loop"));
    if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: S.name || "Loop" }).catch(function () {}); return; }
    var url = URL.createObjectURL(x.blob), a = el("a", { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  }

  /* ---------- trim: the first loop's start and end in its take ----------
     The whole take on top (drag either handle; it snaps to the notes), close-ups of the start and
     end under it (drag, or step a millisecond at a time), and the bars and tempo the length makes.
     The loop plays all the while, changing as you go. */
  function openEditor() {
    var l = S.layers[0];
    if (!l || !l.base || S.layers.length !== 1 || S.rec) return;
    if (!S.playing) L.play();
    var sr = L.sr(), raw = l.raw, n = raw.length;
    var orig = { s: l.s, e: l.s + l.len, bars: S.bars || 4, beats: S.beats || 4 };
    var ed = { s: orig.s, e: orig.e, bars: orig.bars, beats: orig.beats };
    var BLK = 64, mm = D.minmax(raw, BLK), margin = Math.round(0.003 * sr);
    var ons = D.onsets(raw, sr).map(function (o) { return o.i - margin; });
    var applyT = 0, raf = 0, sh;
    function apply(now) {
      clearTimeout(applyT);
      var go = function () { L.setRegion(ed.s, ed.e, ed.bars, ed.beats); };
      if (now) go(); else applyT = setTimeout(go, 90);
      paintNums();
    }
    sh = sheet("Trim", function (s) {
      s.classList.add("ed");
      var main = el("div", { class: "ed-main", role: "group", "aria-label": "Take" }), mc = el("canvas", { "aria-hidden": "true" });
      main.appendChild(mc); s.appendChild(main);
      var zs = el("div", { class: "ed-zs" });
      ["s", "e"].forEach(function (which) {
        var b = el("div", { class: "ed-zb" });
        var nav = el("div", { class: "ed-zn" });
        var l1 = el("button", { class: "mini", type: "button", "aria-label": (which === "s" ? "Start" : "End") + " earlier" }, ICON.left);
        var l2 = el("button", { class: "mini", type: "button", "aria-label": (which === "s" ? "Start" : "End") + " later" }, ICON.right);
        nav.appendChild(l1); nav.appendChild(el("b", null, which === "s" ? "Start" : "End")); nav.appendChild(l2);
        var z = el("div", { class: "ed-z" }), zc = el("canvas", { "aria-hidden": "true" });
        z.appendChild(zc);
        b.appendChild(z); b.appendChild(nav); zs.appendChild(b);
        holdRepeat(l1, function () { move(which, -Math.round(sr / 1000)); });
        holdRepeat(l2, function () { move(which, Math.round(sr / 1000)); });
        bindZoom(z, which);
        if (which === "s") s._zs = zc; else s._ze = zc;
      });
      s.appendChild(zs);
      var t = el("div", { class: "ed-t" });
      s._bars = stepper("Bars", ed.bars, 1, 64, function (v) { ed.bars = v; apply(); });
      s._beats = stepper("Beats", ed.beats, 2, 9, function (v) { ed.beats = v; apply(); });
      var bp = el("label", { class: "stp" }, "<span>BPM</span>");
      var bpIn = el("input", { type: "text", inputmode: "decimal", "aria-label": "Tempo: sets the end from the start" });
      bpIn.addEventListener("change", function () {
        var v = parseFloat(bpIn.value);
        if (v >= 30 && v <= 300) { ed.e = Math.min(n, ed.s + Math.round(ed.bars * ed.beats * 60 / v * sr)); apply(true); }
        paintNums();
      });
      bpIn.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); bpIn.blur(); } });
      bp.appendChild(bpIn); s._bpm = bpIn;
      t.appendChild(s._bars); t.appendChild(s._beats); t.appendChild(bp);
      s.appendChild(t);
      var row = el("div", { class: "row" });
      var auto = el("button", { class: "btn", type: "button" }, "Auto");
      auto.addEventListener("click", function () {
        var r = D.autoTrim(raw, sr, ed.s, ed.e, ed.beats);
        ed.s = r.s; ed.e = r.e; ed.bars = r.bars; s._bars.set(ed.bars); apply(true);
      });
      var seam = el("button", { class: "btn", type: "button" }, "Seam");
      seam.setAttribute("aria-label", "Play across the seam");
      seam.addEventListener("click", function () { L.seek((ed.e - ed.s) / sr - 1.5); });
      var reset = el("button", { class: "btn", type: "button" }, "Reset");
      reset.addEventListener("click", function () { ed.s = orig.s; ed.e = orig.e; ed.bars = orig.bars; ed.beats = orig.beats; s._bars.set(ed.bars); s._beats.set(ed.beats); apply(true); });
      row.appendChild(auto); row.appendChild(seam); row.appendChild(el("span", { class: "sp" })); row.appendChild(reset);
      s.appendChild(row);
      s._main = mc;
      bindMain(main);
    }, "Trim the loop", function () { clearTimeout(applyT); L.setRegion(ed.s, ed.e, ed.bars, ed.beats); cancelAnimationFrame(raf); });
    function paintNums() {
      if (document.activeElement !== sh._bpm) sh._bpm.value = (Math.round(ed.bars * ed.beats * 60 / ((ed.e - ed.s) / sr) * 100) / 100).toString();
    }
    function clampE() {
      ed.s = Math.max(0, Math.min(n - Math.round(0.2 * sr), ed.s));
      ed.e = Math.max(ed.s + Math.round(0.2 * sr), Math.min(n, ed.e));
    }
    function move(which, d) { ed[which] += d; clampE(); apply(); }
    function snap(i, pxPerSample) {
      var best = null, bd = 12 / pxPerSample;
      for (var k = 0; k < ons.length; k++) { var d = Math.abs(ons[k] - i); if (d < bd) { bd = d; best = ons[k]; } }
      return best != null ? best : i;
    }
    function bindMain(box) {
      var drag = null;
      function sx(e) { var r = box.getBoundingClientRect(); return { x: e.clientX - r.left, w: r.width }; }
      box.addEventListener("pointerdown", function (e) {
        var p = sx(e), i = p.x / p.w * n;
        drag = Math.abs(i - ed.s) <= Math.abs(i - ed.e) ? "s" : "e";
        try { box.setPointerCapture(e.pointerId); } catch (x) {}
        upd(e);
      });
      function upd(e) { var p = sx(e), i = Math.round(p.x / p.w * n); ed[drag] = snap(i, p.w / n); clampE(); apply(); }
      box.addEventListener("pointermove", function (e) { if (drag) upd(e); });
      var end = function () { drag = null; };
      box.addEventListener("pointerup", end); box.addEventListener("pointercancel", end);
    }
    function bindZoom(box, which) {
      var x0 = null, v0 = 0;
      box.addEventListener("pointerdown", function (e) { x0 = e.clientX; v0 = ed[which]; try { box.setPointerCapture(e.pointerId); } catch (x) {} });
      box.addEventListener("pointermove", function (e) {
        if (x0 == null) return;
        var w = box.getBoundingClientRect().width, span = 0.24 * sr;
        ed[which] = Math.round(v0 + (e.clientX - x0) / w * span); clampE(); apply();
      });
      var end = function () { x0 = null; };
      box.addEventListener("pointerup", end); box.addEventListener("pointercancel", end);
    }
    function paint() {
      raf = requestAnimationFrame(paint);
      if (!sh.isConnected) { cancelAnimationFrame(raf); return; }
      var muted = css("--muted"), text = css("--text"), col = tint(l.color);
      // whole take
      var f = fit(sh._main);
      if (f) {
        var g = f.g, w = f.w, h = f.h, cols = Math.floor(w), per = mm.length / 2 / cols, mid = h / 2;
        var xs = ed.s / n * w, xe = ed.e / n * w;
        for (var c = 0; c < cols; c++) {
          var a = Math.floor(c * per), b = Math.max(a + 1, Math.floor((c + 1) * per)), lo = 0, hi = 0;
          for (var k = a; k < b && k * 2 + 1 < mm.length; k++) { if (mm[k * 2] < lo) lo = mm[k * 2]; if (mm[k * 2 + 1] > hi) hi = mm[k * 2 + 1]; }
          var inside = c >= xs && c <= xe;
          g.fillStyle = inside ? col : muted; g.globalAlpha = inside ? 1 : 0.35;
          g.fillRect(c, mid - hi * (mid - 6), 1, Math.max(1, (hi - lo) * (mid - 6)));
        }
        g.globalAlpha = 1;
        // beat grid
        var nb = ed.bars * ed.beats, bl = (xe - xs) / nb;
        if (nb <= 128) for (var j = 1; j < nb; j++) { g.fillStyle = text; g.globalAlpha = j % ed.beats === 0 ? 0.35 : 0.12; g.fillRect(Math.round(xs + j * bl), 0, 1, h); }
        g.globalAlpha = 1;
        // handles
        [xs, xe].forEach(function (x, i) {
          g.fillStyle = text; g.fillRect(Math.round(x) - 1, 0, 2, h);
          g.beginPath(); g.roundRect(Math.round(x) - (i ? 12 : 0), 0, 12, 18, i ? [6, 0, 0, 6] : [0, 6, 6, 0]); g.fill();
        });
        // playhead
        var ph = L.layerPhase(l);
        if (ph >= 0) { g.fillStyle = css("--rec"); g.fillRect(Math.round(xs + ph * (xe - xs)), 0, 2, h); }
      }
      zoom(sh._zs, ed.s, "s"); zoom(sh._ze, ed.e, "e");
      function zoom(cv, at, which) {
        var f2 = fit(cv); if (!f2) return;
        var g2 = f2.g, w2 = f2.w, h2 = f2.h, span = 0.24 * sr, a0 = at - span / 2, mid2 = h2 / 2, spp = span / w2;
        for (var c2 = 0; c2 < w2; c2++) {
          var i0 = Math.floor(a0 + c2 * spp), i1 = Math.floor(a0 + (c2 + 1) * spp), lo2 = 0, hi2 = 0;
          for (var q = Math.max(0, i0); q < Math.min(n, Math.max(i0 + 1, i1)); q++) { var vv = raw[q]; if (vv < lo2) lo2 = vv; if (vv > hi2) hi2 = vv; }
          var keep = which === "s" ? c2 >= w2 / 2 : c2 <= w2 / 2;
          g2.fillStyle = keep ? col : muted; g2.globalAlpha = keep ? 1 : 0.35;
          g2.fillRect(c2, mid2 - hi2 * (mid2 - 3), 1, Math.max(1, (hi2 - lo2) * (mid2 - 3)));
        }
        g2.globalAlpha = 1; g2.fillStyle = text; g2.fillRect(Math.floor(w2 / 2) - 1, 0, 2, h2);
      }
    }
    paintNums();
    raf = requestAnimationFrame(paint);
  }

  /* ---------- the assistant and start up ---------- */
  window.__looperContext = function () {
    var v = L.view(), n = S.layers.length;
    if (!n) return "In Looper: no loop yet (first loop mode: " + P.mode + (P.mode === "tempo" ? ", " + P.bpm + " bpm" : "") + ")";
    return "In Looper: " + (S.name || "a loop") + ", " + n + " layer" + (n === 1 ? "" : "s") + " (" + S.layers.map(function (l) { return l.name + (l.muted ? " muted" : ""); }).join(", ") + "), " +
      (v.bpm ? v.bars + " bars at " + Math.round(v.bpm) + " bpm" : fmt1(v.len) + "s") + (v.playing ? ", playing" : ", stopped") + (S.rec ? ", recording" : "");
  };
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { renderLayers(); });
  if (window.MusicSettings) MusicSettings.onChange(function () { renderLayers(); });

  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) {}
  renderAll();
  requestAnimationFrame(frame);
  L.ctx();
  L.boot().then(function () { renderAll(); });
})();
