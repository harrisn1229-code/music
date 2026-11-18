/* Voice Memos: record yourself playing, listen back. Everything stays on this device (IndexedDB). */
(function () {
  "use strict";

  var DB_NAME = "music-memos", STORE = "memos", DRAFT = "draft", PEAKS = 120;
  var $ = function (id) { return document.getElementById(id); };
  var listEl = $("list"), emptyEl = $("empty"), errEl = $("err");
  var idleEl = $("idle"), liveEl = $("live"), clockEl = $("clock"), meterEl = $("meter");
  var recBtn = $("rec"), pauseBtn = $("pause"), stopBtn = $("stop");

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.500v13a1 1 0 0 0 1.500.860l11-6.500a1 1 0 0 0 0-1.720l-11-6.500A1 1 0 0 0 8 5.500z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.400"/><rect x="14" y="5" width="4" height="14" rx="1.400"/></svg>',
    loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.500 6.500l4 4"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M7.500 7.500L12 3l4.500 4.500"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>'
  };
  pauseBtn.innerHTML = ICON.pause;

  /* ---------- helpers ---------- */
  function log() { try { var L = window.MusicLog; return L; } catch (e) { return null; } }
  function playing(key, on, o) { var L = log(); if (L && L.playing) try { L.playing(key, on, o); } catch (e) {} }
  function logEvent(k, t) { var L = log(); if (L && L.event) try { L.event(k, t); } catch (e) {} }
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function showErr(msg) {
    errEl.textContent = msg || ""; errEl.hidden = !msg;
    clearTimeout(showErr.t);
    if (msg) showErr.t = setTimeout(function () { errEl.hidden = true; }, 6000);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function nextName() {
    var n = (parseInt(lsGet("memos:counter"), 10) || 0) + 1;
    lsSet("memos:counter", String(n));
    return "Memo " + n;
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  /* ---------- IndexedDB ---------- */
  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = function () {
        var d = r.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: "id" });
        if (!d.objectStoreNames.contains(DRAFT)) d.createObjectStore(DRAFT, { keyPath: "id" });
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    return dbp;
  }
  function tx(store, mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction(store, mode), out = fn(t.objectStore(store));
        t.oncomplete = function () { res(out && out.result); };
        t.onerror = t.onabort = function () { rej(t.error); };
      });
    });
  }
  function dbAll() { return tx(STORE, "readonly", function (s) { return s.getAll(); }); }
  function dbPut(store, v) { return tx(store, "readwrite", function (s) { return s.put(v); }); }
  function dbDel(store, id) { return tx(store, "readwrite", function (s) { return s.delete(id); }); }
  function dbGet(store, id) { return tx(store, "readonly", function (s) { return s.get(id); }); }

  /* ---------- state ---------- */
  var memos = [];
  var openId = null;      // expanded memo
  var cur = null;         // {id, audio, url, memo}
  var speed = 1, loop = false;
  var ui = null;          // elements of the expanded player
  var renaming = false;
  var raf = 0;
  var S = null;           // recording session

  /* ---------- waveform drawing ---------- */
  function fit(c) {
    var d = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return null;
    if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) { c.width = Math.round(w * d); c.height = Math.round(h * d); }
    var g = c.getContext("2d"); g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, w, h);
    return { g: g, w: w, h: h };
  }
  function drawPeaks(c, peaks, progress, big) {
    var f = fit(c); if (!f) return;
    var g = f.g, w = f.w, h = f.h, on = big ? css("--rec") : css("--text"), off = css("--muted");
    if (!peaks || !peaks.length) {
      var bh = big ? 6 : 4, y = (h - bh) / 2;
      g.globalAlpha = .35; g.fillStyle = off; g.beginPath(); g.roundRect(0, y, w, bh, bh / 2); g.fill();
      if (progress > 0) { g.globalAlpha = 1; g.fillStyle = on; g.beginPath(); g.roundRect(0, y, Math.max(bh, w * progress), bh, bh / 2); g.fill(); }
      return;
    }
    var gap = big ? 2 : 1.5, n = Math.max(1, Math.min(peaks.length, Math.floor((w + gap) / (gap + (big ? 2 : 2))))), mid = h / 2, pad = big ? 8 : 2;
    if (n < peaks.length) {
      var q = [], per = peaks.length / n;
      for (var a = 0; a < n; a++) { var mx = 0; for (var z = Math.floor(a * per); z < Math.floor((a + 1) * per); z++) if (peaks[z] > mx) mx = peaks[z]; q.push(mx); }
      peaks = q;
    }
    var bw = (w - gap * (n - 1)) / n;
    for (var i = 0; i < n; i++) {
      var bh2 = Math.max(big ? 3 : 2, peaks[i] * (h - pad * 2)), x = i * (bw + gap);
      var played = progress > 0 && (i + .5) / n <= progress;
      g.globalAlpha = played ? 1 : (big ? .5 : .75); g.fillStyle = played ? on : off;
      g.beginPath(); g.roundRect(x, mid - bh2 / 2, Math.max(1, bw), bh2, Math.min(bw / 2, 2)); g.fill();
    }
    g.globalAlpha = 1;
  }
  window.addEventListener("resize", function () {
    var cs = document.querySelectorAll("canvas");
    for (var i = 0; i < cs.length; i++) if (cs[i]._draw) cs[i]._draw();
  });

  /* ---------- list ---------- */
  function when(ms) {
    var d = new Date(ms);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }
  function ext(type) {
    type = (type || "").toLowerCase();
    if (type.indexOf("mp4") >= 0 || type.indexOf("m4a") >= 0 || type.indexOf("aac") >= 0) return ".m4a";
    if (type.indexOf("webm") >= 0) return ".webm";
    if (type.indexOf("ogg") >= 0) return ".ogg";
    if (type.indexOf("mpeg") >= 0) return ".mp3";
    return ".m4a";
  }

  function render() {
    listEl.innerHTML = ""; ui = null;
    emptyEl.hidden = memos.length > 0;
    memos.forEach(function (m) {
      var open = m.id === openId;
      var li = el("li", { class: "item" + (open ? " open" : "") });
      var head = el("button", { class: "head", type: "button", "aria-expanded": open ? "true" : "false", "aria-label": m.name + ", " + fmt(m.duration) });
      head.innerHTML = '<span class="t"><span class="n">' + esc(m.name) + '</span><span class="m">' + when(m.created) + " · " + fmt(m.duration) + '</span></span>';
      var c = el("canvas", { "aria-hidden": "true" });
      head.appendChild(c);
      head.addEventListener("click", function () { toggle(m.id); });
      li.appendChild(head);
      c._draw = function () { drawPeaks(c, m.peaks, 0, false); };
      if (open) li.appendChild(buildPlayer(m));
      listEl.appendChild(li);
      requestAnimationFrame(c._draw);
    });
    syncPlayerUI();
  }

  function toggle(id) {
    if (openId === id) { openId = null; stopPlayback(); }
    else { stopPlayback(); openId = id; }
    renaming = false;
    render();
  }

  function buildPlayer(m) {
    var p = el("div", { class: "player" });
    var u = ui = { memo: m };
    if (renaming) {
      var inp = el("input", { class: "name-in", type: "text", value: m.name, "aria-label": "Name", maxlength: "80", enterkeyhint: "done" });
      inp.value = m.name;
      var done = false;
      var commit = function (save) {
        if (done) return; done = true;
        var v = inp.value.trim();
        renaming = false;
        if (save && v && v !== m.name) { m.name = v; dbPut(STORE, m).catch(function () {}); }
        render();
      };
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); commit(true); } else if (e.key === "Escape") commit(false); });
      inp.addEventListener("blur", function () { commit(true); });
      p.appendChild(inp);
      setTimeout(function () { inp.focus(); inp.select(); }, 0);
    }
    var sc = u.scrub = el("div", { class: "scrub", role: "slider", tabindex: "0", "aria-label": "Position", "aria-valuemin": "0", "aria-valuemax": String(Math.round(m.duration)), "aria-valuenow": "0" });
    var cv = u.canvas = el("canvas", { "aria-hidden": "true" });
    sc.appendChild(cv); p.appendChild(sc);
    cv._draw = function () { drawPeaks(cv, m.peaks, progress(), true); };
    requestAnimationFrame(cv._draw);
    bindScrub(sc, m);

    var times = el("div", { class: "times" });
    u.cur = el("span", null, "0:00"); u.tot = el("span", null, fmt(m.duration));
    times.appendChild(u.cur); times.appendChild(u.tot); p.appendChild(times);

    var ctl = el("div", { class: "ctl" });
    u.play = el("button", { class: "play", type: "button", "aria-label": "Play" }, ICON.play);
    u.play.addEventListener("click", function () { togglePlay(m); });
    ctl.appendChild(u.play);
    var sp = el("div", { class: "speeds", role: "group", "aria-label": "Speed" });
    u.speeds = [0.5, 0.75, 1].map(function (s) {
      var b = el("button", { class: "chip", type: "button", "aria-label": "Speed " + s + "x", "aria-pressed": String(s === speed) }, (s === 1 ? "1" : String(s).replace("0.", ".")) + "×");
      b.addEventListener("click", function () { speed = s; if (cur && cur.audio) cur.audio.playbackRate = s; u.speeds.forEach(function (x) { x.b.setAttribute("aria-pressed", String(x.s === s)); }); });
      sp.appendChild(b); return { b: b, s: s };
    });
    ctl.appendChild(sp);
    u.loop = el("button", { class: "chip", type: "button", "aria-label": "Loop", "aria-pressed": String(loop) }, ICON.loop);
    u.loop.addEventListener("click", function () { loop = !loop; u.loop.setAttribute("aria-pressed", String(loop)); if (cur && cur.audio) cur.audio.loop = loop; });
    ctl.appendChild(u.loop);
    p.appendChild(ctl);

    var acts = el("div", { class: "acts" });
    var ren = el("button", { class: "chip", type: "button", "aria-label": "Rename" }, ICON.edit);
    ren.addEventListener("click", function () { renaming = true; render(); });
    var sh = el("button", { class: "chip", type: "button", "aria-label": "Share" }, ICON.share);
    sh.addEventListener("click", function () { share(m); });
    acts.appendChild(ren); acts.appendChild(sh); acts.appendChild(el("span", { class: "sp" }));
    var del = el("button", { class: "chip", type: "button", "aria-label": "Delete" }, ICON.trash), armT = 0;
    del.addEventListener("click", function () {
      if (!del.classList.contains("arm")) {
        del.classList.add("arm"); del.textContent = "Tap again to delete"; del.setAttribute("aria-label", "Tap again to delete");
        armT = setTimeout(function () { del.classList.remove("arm"); del.innerHTML = ICON.trash; del.setAttribute("aria-label", "Delete"); }, 3500);
      } else { clearTimeout(armT); remove(m); }
    });
    acts.appendChild(del); p.appendChild(acts);
    return p;
  }

  function progress() {
    if (!ui || !cur || cur.id !== ui.memo.id || !ui.memo.duration) return 0;
    return Math.min(1, cur.audio.currentTime / ui.memo.duration);
  }
  function syncPlayerUI() {
    if (!ui) return;
    var m = ui.memo, isCur = cur && cur.id === m.id, on = isCur && !cur.audio.paused;
    var t = isCur ? Math.min(cur.audio.currentTime, m.duration) : 0;
    ui.cur.textContent = fmt(t);
    ui.scrub.setAttribute("aria-valuenow", String(Math.round(t)));
    ui.play.innerHTML = on ? ICON.pause : ICON.play;
    ui.play.setAttribute("aria-label", on ? "Pause" : "Play");
    if (ui.canvas._draw) ui.canvas._draw();
  }
  function tick() {
    raf = 0;
    syncPlayerUI();
    if (cur && !cur.audio.paused) raf = requestAnimationFrame(tick);
  }

  /* ---------- playback ---------- */
  function stopPlayback() {
    if (!cur) return;
    var c = cur; cur = null;
    try { c.audio.pause(); } catch (e) {}
    c.audio.removeAttribute("src"); try { c.audio.load(); } catch (e) {}
    URL.revokeObjectURL(c.url);
    if (c.logged) playing("listen", false);
  }
  function togglePlay(m) {
    if (S) return;
    if (cur && cur.id === m.id) {
      if (cur.audio.paused) cur.audio.play().catch(function () {}); else cur.audio.pause();
      return;
    }
    stopPlayback();
    var a = new Audio(), url = URL.createObjectURL(m.blob);
    a.preload = "auto"; a.src = url;
    a.preservesPitch = true; a.webkitPreservesPitch = true; a.mozPreservesPitch = true;
    a.playbackRate = speed; a.loop = loop;
    var c = cur = { id: m.id, audio: a, url: url, logged: false };
    a.addEventListener("play", function () {
      if (cur !== c) return;
      a.playbackRate = speed;
      if (!c.logged) { c.logged = true; playing("listen", true, { text: "Listening · " + m.name }); }
      if (!raf) raf = requestAnimationFrame(tick);
      syncPlayerUI();
    });
    var off = function () { if (cur !== c) return; if (c.logged) { c.logged = false; playing("listen", false); } syncPlayerUI(); };
    a.addEventListener("pause", off);
    a.addEventListener("ended", function () { try { a.currentTime = 0; } catch (e) {} off(); });
    a.addEventListener("error", function () { if (cur === c) { showErr("Can't play this one"); off(); } });
    a.play().catch(function () { off(); });
  }
  function seekTo(m, f) {
    f = Math.max(0, Math.min(1, f));
    if (!cur || cur.id !== m.id) {
      // load without playing, then set position
      togglePlay(m); if (cur) cur.audio.pause();
    }
    if (cur) { try { cur.audio.currentTime = f * m.duration; } catch (e) {} }
    syncPlayerUI();
  }
  function bindScrub(sc, m) {
    var drag = false;
    function fx(e) { var r = sc.getBoundingClientRect(); return (e.clientX - r.left) / r.width; }
    sc.addEventListener("pointerdown", function (e) { drag = true; try { sc.setPointerCapture(e.pointerId); } catch (x) {} seekTo(m, fx(e)); });
    sc.addEventListener("pointermove", function (e) { if (drag) seekTo(m, fx(e)); });
    var end = function () { drag = false; };
    sc.addEventListener("pointerup", end); sc.addEventListener("pointercancel", end);
    sc.addEventListener("keydown", function (e) {
      var t = cur && cur.id === m.id ? cur.audio.currentTime : 0, d = e.key === "ArrowRight" ? 5 : e.key === "ArrowLeft" ? -5 : 0;
      if (d) { e.preventDefault(); seekTo(m, (t + d) / m.duration); }
    });
  }

  /* ---------- share / delete ---------- */
  function share(m) {
    var name = m.name.replace(/[\\/:*?"<>|]+/g, "-") + ext(m.type);
    var type = (m.type || "audio/mp4").split(";")[0];
    var file = null;
    try { file = new File([m.blob], name, { type: type }); } catch (e) {}
    if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: m.name }).catch(function () {});
      return;
    }
    var url = URL.createObjectURL(m.blob), a = el("a", { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  }
  function remove(m) {
    if (cur && cur.id === m.id) stopPlayback();
    dbDel(STORE, m.id).catch(function () {});
    memos = memos.filter(function (x) { return x.id !== m.id; });
    if (openId === m.id) openId = null;
    render();
  }

  /* ---------- analysis ---------- */
  function analyze(blob) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return Promise.reject(new Error("no audio"));
    return blob.arrayBuffer().then(function (buf) {
      var ctx = new AC();
      return new Promise(function (res, rej) {
        var p = ctx.decodeAudioData(buf, res, rej);
        if (p && p.catch) p.catch(rej);
      }).then(function (ab) {
        try { ctx.close(); } catch (e) {}
        var len = ab.length, ch = ab.numberOfChannels, peaks = [], max = 0, size = len / PEAKS;
        var data = []; for (var c = 0; c < ch; c++) data.push(ab.getChannelData(c));
        for (var i = 0; i < PEAKS; i++) {
          var a = Math.floor(i * size), b = Math.min(len, Math.floor((i + 1) * size)), pk = 0, step = Math.max(1, Math.floor((b - a) / 400));
          for (var k = 0; k < ch; k++) for (var j = a; j < b; j += step) { var v = Math.abs(data[k][j]); if (v > pk) pk = v; }
          peaks.push(pk); if (pk > max) max = pk;
        }
        if (max > 0) peaks = peaks.map(function (v) { return Math.round(v / max * 1000) / 1000; });
        return { peaks: max > 0 ? peaks : null, duration: ab.duration };
      }, function (e) { try { ctx.close(); } catch (x) {} throw e; });
    });
  }
  function saveMemo(blob, type, secs, created) {
    return analyze(blob).catch(function () { return {}; }).then(function (r) {
      var dur = r.duration && isFinite(r.duration) ? r.duration : secs;
      var m = { id: uid(), name: nextName(), created: created, duration: Math.round(dur * 100) / 100, type: type || blob.type || "", size: blob.size, peaks: r.peaks || null, blob: blob };
      return dbPut(STORE, m).then(function () {
        memos.unshift(m); memos.sort(function (a, b) { return b.created - a.created; });
        render(); return m;
      });
    });
  }

  /* ---------- recording ---------- */
  function pickType() {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return "";
    var t = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"];
    for (var i = 0; i < t.length; i++) if (MediaRecorder.isTypeSupported(t[i])) return t[i];
    return "";
  }
  function elapsed() { return S ? (S.acc + (S.since ? Date.now() - S.since : 0)) / 1000 : 0; }

  var wake = null;
  function getWake() {
    if (!navigator.wakeLock || !S) return;
    navigator.wakeLock.request("screen").then(function (w) { wake = w; w.addEventListener("release", function () { if (wake === w) wake = null; }); }).catch(function () {});
  }
  function dropWake() { if (wake) { try { wake.release(); } catch (e) {} wake = null; } }

  function setRecUI(on) {
    document.body.classList.toggle("recording", on);
    if (!on) document.body.classList.remove("paused");
    idleEl.hidden = on; liveEl.hidden = !on;
  }

  function startRecording() {
    if (S) return;
    showErr("");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) { showErr("Recording isn't supported here"); return; }
    stopPlayback(); syncPlayerUI();
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }).then(function (stream) {
      var type = pickType(), rec;
      try { rec = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream); }
      catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); showErr("Recording isn't supported here"); return; }
      var s = S = { stream: stream, rec: rec, type: rec.mimeType || type, chunks: [], acc: 0, since: Date.now(), created: Date.now(), paused: false, levels: [], finishing: false };
      rec.ondataavailable = function (e) { if (e.data && e.data.size) s.chunks.push(e.data); };
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        s.ctx = new AC(); s.an = s.ctx.createAnalyser(); s.an.fftSize = 1024;
        s.ctx.createMediaStreamSource(stream).connect(s.an);
        s.buf = new Uint8Array(s.an.fftSize);
      } catch (e) { s.an = null; }
      rec.start(1000);
      setRecUI(true); renderPause();
      s.clockT = setInterval(function () { clockEl.textContent = fmt(elapsed()); }, 250);
      clockEl.textContent = "0:00";
      s.draftT = setInterval(saveDraft, 5000);
      s.lastPush = 0; s.peak = 0;
      meterLoop();
      getWake();
      playing("record", true, { text: "Recording" });
    }, function (e) {
      var n = e && e.name;
      showErr(n === "NotAllowedError" || n === "SecurityError" ? "Mic blocked" : n === "NotFoundError" || n === "OverconstrainedError" ? "No mic found" : "Recording isn't supported here");
    });
  }

  function saveDraft() {
    if (!S || !S.chunks.length) return Promise.resolve();
    return dbPut(DRAFT, { id: "draft", chunks: S.chunks.slice(), type: S.type, created: S.created, duration: elapsed() }).catch(function () {});
  }

  function renderPause() {
    var p = S && S.paused;
    pauseBtn.innerHTML = p ? ICON.play : ICON.pause;
    pauseBtn.setAttribute("aria-label", p ? "Resume" : "Pause");
    document.body.classList.toggle("paused", !!p);
  }
  function togglePause() {
    if (!S || S.finishing) return;
    if (!S.paused) {
      try { S.rec.pause(); } catch (e) { return; }
      S.acc += Date.now() - S.since; S.since = 0; S.paused = true;
      playing("record", false);
    } else {
      try { S.rec.resume(); } catch (e) { return; }
      S.since = Date.now(); S.paused = false;
      playing("record", true, { text: "Recording" });
    }
    renderPause(); clockEl.textContent = fmt(elapsed());
  }

  function meterLoop() {
    var s = S; if (!s) return;
    var f = fit(meterEl);
    if (s.an && !s.paused) {
      s.an.getByteTimeDomainData(s.buf);
      var pk = 0; for (var i = 0; i < s.buf.length; i++) { var v = Math.abs(s.buf[i] - 128) / 128; if (v > pk) pk = v; }
      s.peak = Math.max(s.peak, pk);
      var now = performance.now();
      if (now - s.lastPush > 50) { s.levels.push(Math.min(1, Math.sqrt(s.peak) * 1.1)); s.peak = 0; s.lastPush = now; if (s.levels.length > 400) s.levels.shift(); }
    }
    if (f) {
      var g = f.g, bw = 3, gap = 2, n = Math.floor(f.w / (bw + gap)), L = s.levels, st = Math.max(0, L.length - n);
      g.fillStyle = css("--rec");
      for (var k = st; k < L.length; k++) {
        var x = f.w - (L.length - k) * (bw + gap) + gap, h = Math.max(3, L[k] * (f.h - 8));
        g.globalAlpha = s.paused ? .4 : 1;
        g.beginPath(); g.roundRect(x, (f.h - h) / 2, bw, h, 1.5); g.fill();
      }
      g.globalAlpha = 1;
    }
    s.raf = requestAnimationFrame(meterLoop);
  }

  function stopRecording() {
    var s = S;
    if (!s || s.finishing) return Promise.resolve();
    s.finishing = true;
    var secs = elapsed();
    return new Promise(function (res) {
      var done = false, fin = function () { if (done) return; done = true; res(); };
      s.rec.onstop = fin;
      try { if (s.rec.state !== "inactive") s.rec.stop(); else fin(); } catch (e) { fin(); }
      setTimeout(fin, 3000);
    }).then(function () {
      clearInterval(s.clockT); clearInterval(s.draftT); cancelAnimationFrame(s.raf);
      s.stream.getTracks().forEach(function (t) { t.stop(); });
      try { s.ctx && s.ctx.close(); } catch (e) {}
      dropWake();
      var wasOn = !s.paused;
      S = null; setRecUI(false);
      var blob = new Blob(s.chunks, { type: s.type || (s.chunks[0] && s.chunks[0].type) || "audio/webm" });
      if (!blob.size) { dbDel(DRAFT, "draft").catch(function () {}); playing("record", false); return; }
      return saveMemo(blob, s.type, secs, s.created).then(function (m) {
        playing("record", false);
        logEvent("memo", "Recorded " + m.name + " · " + fmt(m.duration));
        return dbDel(DRAFT, "draft");
      }).catch(function () { showErr("Couldn't save"); });
    });
  }

  /* a take is never lost: hidden or closed mid-recording saves it; a leftover draft becomes a memo on load */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (S) stopRecording(); }
    else if (S) getWake();
  });
  window.addEventListener("pagehide", function () { if (S) { saveDraft(); } });

  function recoverDraft() {
    return dbGet(DRAFT, "draft").then(function (d) {
      if (!d || !d.chunks || !d.chunks.length) { if (d) dbDel(DRAFT, "draft"); return; }
      var blob = new Blob(d.chunks, { type: d.type || d.chunks[0].type || "audio/webm" });
      return saveMemo(blob, d.type, d.duration || 0, d.created || Date.now()).then(function () { return dbDel(DRAFT, "draft"); });
    }).catch(function () {});
  }

  /* ---------- wire up ---------- */
  recBtn.addEventListener("click", startRecording);
  pauseBtn.addEventListener("click", togglePause);
  stopBtn.addEventListener("click", function () { stopRecording(); });

  window.__memosContext = function () {
    var n = memos.length;
    return "In Voice Memos: " + n + " recording" + (n === 1 ? "" : "s") + (S ? ", recording now" : "");
  };

  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) {}
  if (!window.indexedDB) { showErr("Can't save on this device"); render(); }
  else {
    dbAll().then(function (all) {
      memos = (all || []).sort(function (a, b) { return b.created - a.created; });
      render();
    }).catch(function () { render(); showErr("Can't open saved recordings"); })
      .then(recoverDraft);
  }
  render();
})();
