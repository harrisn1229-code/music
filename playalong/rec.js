/* PA.rec: real recordings for Play Along. Needs media.js (PAMedia), score/store/engine and app.js (PA.app).

   piece.recordings = [ { id, kind: "file"|"youtube"|"take", name, mediaId, mime, video, youtube, sync: [{pos, t}], offset, created, bpm } ]
     pos = timeline position in quarter beats of the PLAYED order, t = seconds in the recording. offset (seconds) is added to every t.
   prefs (per piece): rec (selected recording id, null = Synth), recVol, overlay (synth parts with the recording), overlayVol, vid { h, hide, mirror }

   What it does
     - the Recording pill under the toolbar (Synth + recordings), add file / YouTube, rename, delete
     - a driver for playback (PA.app.setDriver): the recording is the clock, the cursor = syncMap.posAt(player.time()),
       loops seek the recording, speed = player rate, count-in and click follow the sync map, optional synth overlay (engine ext clock)
     - the video panel (video files and YouTube): resize by the bottom edge, hide, mirror, above the music on phones / left of it on wide screens
     - the sync editor (tap the downbeats; waveform; drag, nudge, delete, clear from here; every bar or every beat)
     - Record (a take): the mic while playback runs, saved as a recording with sync from what was playing
   Other modules: PA.rec.drivers { rec, sync, wait } (wait.js adds its driver there), PA.rec.refreshDriver(), PA.rec.current() -> loaded recording or null.
   For sync (phase 3b): recordings live in piece.recordings (plain JSON) and their audio/video in PA.store media (mediaGet/mediaPut by mediaId). */
(function () {
  "use strict";
  var PA = window.PA, PM = window.PAMedia, SC = PA.score, EN = PA.engine, ST = PA.store, A = PA.app, S = PA.S, E = EN.E;
  if (!PM || !A) return;
  var clamp = SC.clamp;
  var $ = function (id) { return document.getElementById(id); };
  var el = A.el, esc = A.esc, uid = A.uid;
  var now = function () { return performance.now(); };
  var R = PA.rec = { drivers: { rec: null, sync: null, wait: null } };

  function svgi(inner, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>"; }
  var IC = {
    note: svgi('<path d="M9 18V5l11-2v13"/><circle cx="6.500" cy="18" r="2.500"/><circle cx="17.500" cy="16" r="2.500"/>', 1.8),
    video: svgi('<rect x="3" y="6" width="13" height="12" rx="2.500"/><path d="M16 10.500 21 8v8l-5-2.500"/>', 1.8),
    yt: svgi('<rect x="3" y="5.500" width="18" height="13" rx="4"/><path d="M10.500 9.500v5l4.200-2.500z" fill="currentColor"/>', 1.7),
    mic: svgi('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/>', 1.8),
    synth: svgi('<path d="M3 12h2.500l2-6 3 12 3-9 2 5 1.500-2H21"/>', 1.8),
    chev: svgi('<path d="m7 10 5 5 5-5"/>', 2.200),
    rec: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.500" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.800" fill="currentColor"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.500" y="6.500" width="11" height="11" rx="2.200" fill="currentColor"/></svg>',
    sync: svgi('<path d="M3 12h2l2-5 3 10 3-8 2 3h6"/><path d="M12 3v3M12 18v3" opacity=".5"/>', 1.8),
    eye: svgi('<path d="M2 12s3.500-6.500 10-6.500S22 12 22 12s-3.500 6.500-10 6.500S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 1.8),
    eyeoff: svgi('<path d="M3 3l18 18"/><path d="M10.500 6c.5-.1 1-.1 1.500-.1 6.500 0 10 6 10 6a17 17 0 0 1-3 3.600M6.500 7.500A17 17 0 0 0 2 12s3.500 6.500 10 6.500c1.400 0 2.700-.3 3.800-.7"/>', 1.8),
    flip: svgi('<path d="M12 3v18" stroke-dasharray="2 3"/><path d="M8.500 7 3.500 17h5zM15.500 7l5 10h-5z"/>', 1.6),
    dots: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5.500" r="1.800"/><circle cx="12" cy="12" r="1.800"/><circle cx="12" cy="18.500" r="1.800"/></svg>',
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    left: svgi('<path d="m14 6-6 6 6 6"/>', 2.200), right: svgi('<path d="m10 6 6 6-6 6"/>', 2.200),
    trash: svgi('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', 1.8),
    plus: svgi('<path d="M12 5v14M5 12h14"/>', 2.200), minus: svgi('<path d="M5 12h14"/>', 2.200)
  };
  R.IC = IC;

  /* ================================================================ data */
  function piece() { return S.piece; }
  function recs() { var p = S.piece; if (!p) return []; return p.recordings || (p.recordings = []); }
  function recById(id) { var a = recs(); for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; }
  function saveData() { if (S.piece) S.piece.updated = Date.now(); ST.save(); }
  function isSynced(r) { return !!(r && r.sync && r.sync.length >= 2); }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function takeName(d) {
    var h = d.getHours() % 12 || 12, m = d.getMinutes();
    return "Take — " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + h + ":" + (m < 10 ? "0" : "") + m;
  }
  function fmtTime(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }

  /* The default map: the written tempo from the top, per bar (tempo changes included). */
  function defaultPoints(off) {
    var tl = S.tl, pts = [], t = off || 0;
    tl.passes.forEach(function (p) {
      pts.push({ pos: p.start, t: t });
      t += p.len * 60 / (p.tempo || S.written || 100);
    });
    pts.push({ pos: tl.total, t: t });
    return pts;
  }
  function buildMap(rec) {
    var off = +rec.offset || 0, spb = 60 / (S.tl.writtenAt(0) || S.written || 100);
    if (rec.sync && rec.sync.length) return PM.SyncMap(rec.sync.map(function (q) { return { pos: q.pos, t: q.t + off }; }), spb);
    return PM.SyncMap(defaultPoints(off), spb);
  }

  /* ================================================================ the loaded recording (player + map) */
  var cur = null, loadTok = 0;
  R.current = function () { return cur; };
  var vbox = null, vpanel = null;

  function unload() {
    loadTok++;
    if (cur) {
      var c = cur; cur = null;
      try { if (c.drv && c.drv.dispose) c.drv.dispose(); } catch (e) {}
      try { if (c.player) c.player.destroy(); } catch (e) {}
    }
    R.drivers.rec = null;
    if (vbox) vbox.innerHTML = "";
  }
  function load(rec) {
    unload();
    var tok = loadTok, c = cur = { rec: rec, player: null, map: null, blob: null, err: null, drv: null };
    c.map = buildMap(rec);
    c.ready = (rec.kind === "youtube" ? Promise.resolve(null) : ST.mediaGet(rec.mediaId).then(function (m) {
      if (!m || !m.blob) throw new Error("That recording is missing from this device.");
      return m.blob;
    })).then(function (blob) {
      if (tok !== loadTok) throw new Error("cancelled");
      c.blob = blob;
      var pl = rec.kind === "youtube" ? PM.youtube(rec.youtube, vbox) : PM.file(blob, { video: !!rec.video, container: rec.video ? vbox : null });
      c.player = pl;
      pl.on("ended", function () { if (c.drv && c.drv.playerEnded) c.drv.playerEnded(); });
      pl.on("error", function () { c.err = "Couldn't play that recording."; });
      try { pl.setVolume(S.prefs.recVol == null ? 1 : S.prefs.recVol); } catch (e) {}
      return pl.ready.then(function () { return pl; });
    });
    c.ready.catch(function (e) { if (tok === loadTok && e && e.message !== "cancelled") c.err = e.message || "Couldn't open that recording."; });
    c.drv = makeDriver(c);
    R.drivers.rec = c.drv;
    return c;
  }

  /* ================================================================ driver: the recording is the clock */
  function makeDriver(c) {
    var d = { kind: "rec", finished: false, onEnd: null, alwaysSeek: false, c: c };
    var st = "idle", a = { c: 0, r: 0, chk: 0 }, rate = 1, ci = null, ciTimer = 0, unmute = 0, wrapUntil = 0, wrapPos = 0, seg = { speed: 1, auto: false, next: Infinity };
    var ext = null;
    function ctx() { return E.ctx; }
    function anchor(t) { a = { c: ctx().currentTime, r: t == null ? c.player.time() : t, chk: ctx().currentTime }; }
    function ctxAt(pos) { return a.c + (c.map.timeAt(pos) - a.r) / rate; }
    function posAtCtx(tc) { return c.map.posAt(a.r + (tc - a.c) * rate); }
    d.rate = function () { return rate; };
    d.state = function () { return st; };
    d.anchor = function () { return { c: a.c, r: a.r }; };
    d.ctxAt = function (pos) { return a.c ? ctxAt(pos) : 0; };

    function setRate(v) { rate = c.player.setRate(v) || v; if (!(rate > 0)) rate = v; return rate; }
    function fail(e) {
      st = "idle";
      A.showErr((e && e.message) || "Couldn't play the recording.");
      if (S.playing) A.pausePlay(true), A.updateTransport();
    }
    function clearTimers() { clearTimeout(ciTimer); ciTimer = 0; clearTimeout(unmute); unmute = 0; }

    var floor = null, afterCount = false;
    /* Start from sp. The recording is started a little early (pre-roll) and the clock is anchored once it really moves, so the first click and
       the cursor line up with the recording rather than with the moment play() answered. */
    function begin(sp) {
      st = "starting";
      var t = Math.max(0, c.map.timeAt(sp)), pre = Math.min(0.3, t), thr = pre >= 0.2 ? 0.18 : Math.max(0.02, pre * 0.6);
      c.player.seek(t - pre);
      return c.player.play().then(function () {
        if (st !== "starting") return;
        var t0 = now(), startT = t - pre;
        (function poll() {
          if (st !== "starting") return;
          var tt = c.player.time();
          if (tt - startT >= thr || now() - t0 > 900) {
            anchor();
            var p0 = c.map.posAt(c.player.time()), tn = ctx().currentTime;
            seg = { speed: S.prefs.speed, auto: false, next: Infinity };
            floor = sp; afterCount = false;
            st = "run";
            ext = {
              ctxAt: ctxAt, posAt: posAtCtx, parts: !!S.prefs.overlay,
              spb: function (pos) { return c.map.spbAt(pos) / rate; },
              watch: watch
            };
            d.ext = ext;
            EN.extStart(ext, ctxAt(sp) >= tn - 0.01 ? sp : Math.max(sp, p0));
            return;
          }
          setTimeout(poll, 8);
        })();
      }, function (e) { fail(new Error("Couldn't play the recording. Tap play again.")); });
    }

    d.start = function (opts) {
      return c.ready.then(function () {
        var cx = EN.ensureCtx();
        if (!cx) throw new Error("This browser can't play sound.");
        var P = S.prefs, tl = S.tl, L = EN.loopRange(), sp = S.startPos;
        if (L && (sp < L.start - 1e-6 || sp >= L.end - 1e-6)) sp = L.start;
        if (sp >= tl.total - 1e-6) sp = 0;
        S.startPos = sp;
        d.finished = false; clearTimers();
        setRate(clamp(P.speed || 1, 0.25, 2));
        try { c.player.setVolume(P.recVol == null ? 1 : P.recVol); } catch (e) {}
        var pass = tl.passes[EN.locate(tl, sp).pass];
        var n = P.countIn && !(opts && opts.noCountIn) ? SC.timeLen(pass.time) : 0;
        if (n > 0) {
          var spb = c.map.spbAt(sp) / rate, t0 = cx.currentTime + 0.12, unit = pass.unit;
          ci = { t0: t0, unit: unit, spb: spb, n: n };
          for (var k = 0; k * unit < n - 1e-6; k++) EN.clickAt(k === 0, t0 + k * unit * spb);
          st = "count";
          var lead = Math.min(0.3, Math.max(0, c.map.timeAt(sp))) / rate + 0.1, wait = (t0 + n * spb - cx.currentTime - lead) * 1000;
          ciTimer = setTimeout(function () { ciTimer = 0; if (st === "count") { afterCount = true; begin(sp); } }, Math.max(0, wait));
          return;
        }
        return begin(sp);
      });
    };
    function endRun() {
      clearTimers();
      try { c.player.pause(); } catch (e) {}
      EN.extStop();
      st = "idle";
    }
    d.stop = function () { endRun(); };
    d.dispose = function () { endRun(); };
    d.playerEnded = function () { if (st === "run") finish(); };
    function finish() {
      if (d.finished) return;
      d.finished = true; endRun();
      if (d.onEnd) d.onEnd();
    }
    d.seek = function (pos) {
      if (st === "run") {
        var t = Math.max(0, c.map.timeAt(pos));
        c.player.seek(t); anchor(t); wrapUntil = 0; floor = pos;
        EN.extSeek(pos);
      } else if (st === "count" || st === "starting") {
        clearTimers(); afterCount = false; begin(pos);
      }
    };
    d.setSpeed = function (f) {
      var p = st === "run" ? d.pos() : null;
      setRate(f);
      seg = { speed: f, auto: false, next: Infinity };
      if (st === "run") { anchor(); if (p) EN.extSeek(Math.min(p.pos + 0.0001, S.tl.total)); }
    };
    d.bpm = function (pos) { var spb = c.map.spbAt(pos); return spb > 0 ? 60 / spb * (S.prefs.speed || 1) : 0; };
    d.pos = function () {
      if (st === "count") {
        var cx = ctx(), k = Math.floor((cx.currentTime - ci.t0) / (ci.unit * ci.spb) + 1e-6) + 1;
        return { pos: S.startPos, counting: true, ci: clamp(k, 1, 16), speed: seg.speed, seg: seg };
      }
      if (st === "starting") return { pos: S.startPos, counting: afterCount, ci: afterCount ? ci.n / ci.unit : undefined, speed: seg.speed, seg: seg };
      if (st !== "run") return null;
      var t = c.player.time(), pos = c.map.posAt(t);
      if (floor != null) { if (pos < floor) pos = floor; else floor = null; }
      if (wrapUntil && now() < wrapUntil) pos = Math.max(pos, wrapPos);
      return { pos: clamp(pos, 0, S.tl.total), counting: false, speed: seg.speed, seg: seg };
    };
    /* every engine tick (25 ms): drift check, loop wrap, end */
    function watch() {
      if (st !== "run") return;
      var cx = ctx(), tn = cx.currentTime, t = c.player.time();
      if (tn - a.chk > 0.25) {
        a.chk = tn;
        var pred = a.r + (tn - a.c) * rate;
        if (Math.abs(t - pred) > 0.02 * Math.max(1, rate)) { a = { c: tn, r: t, chk: tn }; }
      }
      if (ext) ext.parts = !!S.prefs.overlay;
      var L = EN.loopRange(), pos = c.map.posAt(t);
      if (L) {
        var tEnd = c.map.timeAt(L.end), wrapAt = tEnd - 0.03 * rate;
        if (t >= wrapAt && t < tEnd + 0.6 * rate && pos < L.end + 0.5) { wrap(L); return; }
      }
      if (pos >= S.tl.total - 1e-3) finish();
    }
    function wrap(L) {
      var P = S.prefs, tS = Math.max(0, c.map.timeAt(L.start)), pre = Math.min(tS, 0.05 * rate);
      try { c.player.setVolume(0); } catch (e) {}
      c.player.seek(tS - pre);
      clearTimeout(unmute);
      var vol = P.recVol == null ? 1 : P.recVol;
      unmute = setTimeout(function () { unmute = 0; try { c.player.setVolume(vol); } catch (e) {} }, (pre / rate) * 1000 + 15);
      var stepP = (P.speedUp || 0) / 100, target = (P.speedTarget || 100) / 100, sp = seg.speed;
      if (stepP > 0 && sp < target - 1e-9) {
        sp = Math.min(target, Math.round((sp + stepP) * 1000) / 1000);
        seg = { speed: sp, auto: true, next: Infinity };
        setRate(sp);
      }
      anchor(tS - pre);
      wrapPos = L.start; wrapUntil = now() + (pre / rate) * 1000 + 120;
      EN.extSeek(L.start);
    }
    return d;
  }

  /* ================================================================ driver choice */
  R.pick = function () { return R.drivers.sync || R.drivers.wait || R.drivers.rec || null; };
  R.refreshDriver = function () {
    var d = R.pick();
    if (d === S.drv) return;
    var was = S.playing;
    if (was) A.pausePlay(true);
    A.setDriver(d);
    if (S.piece) { A.updateTransport(); A.updateCursor(A.curPos(), true); }
  };

  /* ================================================================ the Recording pill + buttons */
  var rrow = null, pill = null, bVid = null, bSync = null, bRec = null, slot = null;
  function buildBar() {
    if (rrow) return;
    rrow = el("div", "sub-in wrap rrow"); rrow.id = "rrow";
    pill = el("button", "rpill", ""); pill.type = "button"; pill.id = "rPill"; pill.setAttribute("aria-label", "Recording");
    bVid = el("button", "icon-btn sm", IC.eye); bVid.type = "button"; bVid.id = "rVid"; bVid.setAttribute("aria-label", "Video");
    bSync = el("button", "icon-btn sm", IC.sync); bSync.type = "button"; bSync.id = "rSync"; bSync.setAttribute("aria-label", "Sync");
    bRec = el("button", "icon-btn sm rbtn", IC.rec); bRec.type = "button"; bRec.id = "rRec"; bRec.setAttribute("aria-label", "Record");
    rrow.appendChild(pill); rrow.appendChild(bVid); rrow.appendChild(bSync); rrow.appendChild(bRec);
    $("sub").appendChild(rrow);
    pill.onclick = openSwitcher;
    bVid.onclick = function () { S.prefs.vid.hide = !S.prefs.vid.hide; A.save(); updatePanel(); updateBar(); };
    bSync.onclick = function () { SY.open ? closeSync() : openSync(); };
    bRec.onclick = toggleRecord;
    vpanel = el("div", "vidp"); vpanel.id = "vidPanel"; vpanel.hidden = true;
    vbox = el("div", "vid-box"); vbox.id = "vidBox";
    var tools = el("div", "vid-tools");
    var bHide = el("button", "icon-btn sm", IC.eyeoff); bHide.type = "button"; bHide.setAttribute("aria-label", "Hide video"); bHide.id = "vidHide";
    var bFlip = el("button", "icon-btn sm", IC.flip); bFlip.type = "button"; bFlip.setAttribute("aria-label", "Mirror"); bFlip.id = "vidFlip";
    tools.appendChild(bFlip); tools.appendChild(bHide);
    var grip = el("button", "vid-grip", "<i></i>"); grip.type = "button"; grip.id = "vidGrip"; grip.setAttribute("aria-label", "Resize video");
    vpanel.appendChild(vbox); vpanel.appendChild(tools); vpanel.appendChild(grip);
    var vp = $("vPlayer"); vp.insertBefore(vpanel, vp.firstChild);
    bHide.onclick = function () { S.prefs.vid.hide = true; A.save(); updatePanel(); updateBar(); };
    bFlip.onclick = function () { S.prefs.vid.mirror = !S.prefs.vid.mirror; A.save(); updatePanel(); };
    gripDrag(grip);
    slot = el("div", "rslot"); slot.id = "rSlot"; slot.hidden = true;
    A.slot().appendChild(slot);
  }
  function hasVideo() { return !!(cur && cur.rec && (cur.rec.video || cur.rec.kind === "youtube")); }
  function updateBar() {
    if (!rrow) return;
    var r = cur && cur.rec;
    var icon = !r ? IC.synth : r.kind === "youtube" ? IC.yt : r.kind === "take" ? IC.mic : r.video ? IC.video : IC.note;
    pill.innerHTML = icon + '<span class="rname" id="rName">' + esc(r ? r.name : "Synth") + "</span>" + IC.chev;
    pill.classList.toggle("on", !!r);
    bVid.hidden = !hasVideo();
    bVid.innerHTML = S.prefs.vid.hide ? IC.eyeoff : IC.eye;
    bVid.setAttribute("aria-label", S.prefs.vid.hide ? "Show video" : "Hide video");
    bSync.hidden = !r;
    bSync.setAttribute("aria-pressed", String(SY.open));
    bSync.classList.toggle("sel", SY.open);
    bSync.classList.toggle("todo", !!r && !isSynced(r) && !SY.open);
    bRec.hidden = !PM.supportsRecording();
    bRec.setAttribute("aria-pressed", String(!!T));
    bRec.innerHTML = T ? IC.stop : IC.rec;
    bRec.setAttribute("aria-label", T ? "Stop recording" : "Record");
    bRec.classList.toggle("live", !!T);
    updateSlot();
    A.layout();
  }

  /* ---- the video panel ---- */
  function wide() { return window.innerWidth >= 900; }
  function updatePanel() {
    if (!vpanel) return;
    var show = hasVideo() && !S.prefs.vid.hide, side = show && wide();
    vpanel.hidden = !hasVideo();
    vpanel.classList.toggle("off", !show);
    vpanel.classList.toggle("mirror", !!S.prefs.vid.mirror);
    $("vPlayer").classList.toggle("vside", !!side);
    var h = S.prefs.vid.h;
    if (!h) h = side ? Math.round(Math.min(window.innerHeight * 0.55, Math.max(180, vpanel.clientWidth * 9 / 16))) : Math.round(Math.min(window.innerHeight * 0.27, 230));
    h = clamp(h, 80, Math.round(window.innerHeight * 0.6));
    vpanel.style.setProperty("--vidh", h + "px");
    S.vidInset = show && !side ? h + 8 : 0;
    A.layout();
  }
  function gripDrag(grip) {
    var y0 = 0, h0 = 0, drag = false;
    grip.addEventListener("pointerdown", function (e) {
      drag = true; y0 = e.clientY; h0 = vpanel.offsetHeight;
      try { grip.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
    });
    grip.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var h = clamp(Math.round(h0 + e.clientY - y0), 80, Math.round(window.innerHeight * 0.6));
      S.prefs.vid.h = h; updatePanel();
    });
    function end() { if (!drag) return; drag = false; A.save(); }
    grip.addEventListener("pointerup", end); grip.addEventListener("pointercancel", end);
  }
  window.addEventListener("resize", function () { if (S.route === "player") updatePanel(); });

  /* ================================================================ switcher, add, rename, delete */
  var fileIn = null;
  function ensureFileIn() {
    if (fileIn) return fileIn;
    fileIn = el("input"); fileIn.type = "file"; fileIn.accept = "audio/*,video/*"; fileIn.hidden = true; fileIn.id = "recFile";
    fileIn.onchange = function () { var f = fileIn.files && fileIn.files[0]; setTimeout(function () { fileIn.value = ""; }, 0); if (f) addFile(f); };
    document.body.appendChild(fileIn);
    return fileIn;
  }
  function recIcon(r) { return r.kind === "youtube" ? IC.yt : r.kind === "take" ? IC.mic : r.video ? IC.video : IC.note; }
  function openSwitcher(msg, ytOpen) {
    if (!S.piece) return;
    var rs = recs(), sel = cur && cur.rec.id, h = '<div class="sh-h"><h2>Recording</h2><button class="icon-btn" id="rwClose" type="button" aria-label="Close">' + IC.x + "</button></div>";
    h += '<div class="rlist" role="listbox" aria-label="Recordings">';
    h += '<div class="ri' + (!sel ? " sel" : "") + '"><button class="rsel" type="button" data-id="" role="option" aria-selected="' + !sel + '">' + IC.synth + "<span>Synth</span></button></div>";
    rs.forEach(function (r) {
      var on = r.id === sel;
      h += '<div class="ri' + (on ? " sel" : "") + '"><button class="rsel" type="button" data-id="' + esc(r.id) + '" role="option" aria-selected="' + on + '">' + recIcon(r) + "<span>" + esc(r.name) + "</span>" + (isSynced(r) ? "" : "<small>not synced</small>") + '</button><button class="rmore" type="button" data-more="' + esc(r.id) + '" aria-label="More for ' + esc(r.name) + '">' + IC.dots + "</button></div>";
    });
    h += "</div>";
    if (msg) h += '<p class="errbox" role="alert">' + esc(msg) + "</p>";
    if (ytOpen) h += '<div class="yt-row"><input class="field" id="ytIn" type="text" inputmode="url" autocomplete="off" placeholder="youtube.com/…" aria-label="YouTube link"><button class="btn pri" id="ytGo" type="button">Add</button></div>';
    h += '<div class="btns"><button class="btn" id="rAddFile" type="button">' + IC.plus + 'File</button><button class="btn" id="rAddYt" type="button">' + IC.yt + "YouTube</button></div>";
    var d = A.dialog(h);
    d.querySelector("#rwClose").onclick = A.closeDlg;
    Array.prototype.forEach.call(d.querySelectorAll("[data-id]"), function (b) {
      b.onclick = function () { var id = b.getAttribute("data-id"); A.closeDlg(); select(id || null); };
    });
    Array.prototype.forEach.call(d.querySelectorAll("[data-more]"), function (b) { b.onclick = function () { recMenu(recById(b.getAttribute("data-more"))); }; });
    d.querySelector("#rAddFile").onclick = function () { ensureFileIn().click(); };
    d.querySelector("#rAddYt").onclick = function () { openSwitcher(null, true); };
    if (ytOpen) {
      var inp = d.querySelector("#ytIn");
      setTimeout(function () { inp.focus(); }, 30);
      var go = function () { addYoutube(inp.value); };
      d.querySelector("#ytGo").onclick = go;
      inp.onkeydown = function (e) { if (e.key === "Enter") go(); };
    }
  }
  function recMenu(r) {
    if (!r) return;
    var d = A.dialog('<div class="sh-h"><h2>' + esc(r.name) + '</h2></div><div class="menu"><button class="btn" id="rmRen" type="button">Rename</button>' + '<button class="btn" id="rmSync" type="button">Sync</button><button class="btn" id="rmDel" type="button" style="color:var(--danger)">Delete</button></div>');
    d.querySelector("#rmRen").onclick = function () { A.askText("Rename", r.name, function (v) { r.name = v; saveData(); updateBar(); PA.emit("recordings", {}); }); };
    d.querySelector("#rmSync").onclick = function () { A.closeDlg(); select(r.id, function () { openSync(); }); };
    d.querySelector("#rmDel").onclick = function () { A.confirmBox("Delete “" + r.name + "”?", "Delete", function () { deleteRecording(r); }); };
  }
  function deleteRecording(r) {
    var p = S.piece; if (!p) return;
    if (cur && cur.rec === r) select(null);
    p.recordings = recs().filter(function (x) { return x !== r; });
    if (r.mediaId) ST.mediaDel(r.mediaId).catch(function () {});
    delete peaksCache[r.id];
    saveData(); updateBar(); injectMixer(); PA.emit("recordings", {});
  }
  function probeVideo(file) {
    return new Promise(function (res) {
      var guess = /^video\//.test(file.type) || /\.(mp4|m4v|mov|webm|mkv)$/i.test(file.name || "") && !/^audio\//.test(file.type);
      var v = document.createElement("video"), url = URL.createObjectURL(file), done = false;
      function fin(x) { if (done) return; done = true; try { URL.revokeObjectURL(url); } catch (e) {} v.removeAttribute("src"); res(x); }
      v.preload = "metadata"; v.muted = true;
      v.onloadedmetadata = function () { fin(v.videoWidth > 0); };
      v.onerror = function () { fin(guess); };
      setTimeout(function () { fin(guess); }, 3000);
      v.src = url;
    });
  }
  function addFile(file) {
    if (!S.piece) return;
    probeVideo(file).then(function (video) {
      var id = uid(), mid = "m" + id;
      return ST.mediaPut({ id: mid, blob: file, mime: file.type || "" }).then(function () {
        var name = (file.name || "Recording").replace(/\.[A-Za-z0-9]{2,5}$/, "") || "Recording";
        var r = { id: id, kind: "file", name: name, mediaId: mid, mime: file.type || "", video: !!video, sync: [], offset: 0, created: Date.now() };
        recs().push(r); saveData();
        A.closeDlg();
        select(r.id);
        PA.emit("recordings", {});
      });
    }).catch(function () { openSwitcher("Couldn't save that file."); });
  }
  function addYoutube(text) {
    var id = PM.youtubeId(text || "");
    if (!id) { openSwitcher("That isn't a YouTube link.", true); return; }
    var r = { id: uid(), kind: "youtube", name: "YouTube", youtube: id, video: true, sync: [], offset: 0, created: Date.now() };
    recs().push(r); saveData();
    A.closeDlg();
    select(r.id);
    PA.emit("recordings", {});
  }
  R.addFile = addFile; R.addYoutube = addYoutube;

  /* Switch recording (null = Synth). The position stays: it is a timeline position, the new map turns it into a time. */
  function select(id, then) {
    if (!S.piece) return;
    if (SY.open) closeSync(true);
    var was = S.playing;
    if (was) A.pausePlay(true);
    var r = id ? recById(id) : null;
    if (id && !r) r = null;
    S.prefs.rec = r ? r.id : null; A.save();
    if (r) load(r); else unload();
    R.refreshDriver();
    updatePanel(); updateBar(); injectMixer();
    A.updateTransport(); A.updateCursor(A.curPos(), true);
    PA.emit("recording", { id: r ? r.id : null });
    if (then) { var c = cur; if (c) c.ready.then(function () { then(); }, function () { then(); }); else then(); }
    else if (was) setTimeout(function () { A.startPlay({ noCountIn: true, keepPanels: true }); }, 30);
  }
  R.select = select;

  /* ================================================================ mixer: recording volume, synth overlay */
  function injectMixer() {
    var m = $("pMixer");
    if (!m || !S.piece) return;
    var box = m.querySelector("#mxRec");
    if (box) box.remove();
    if (!recs().length) return;
    var P = S.prefs;
    box = el("div", "mx"); box.id = "mxRec";
    box.innerHTML = '<div class="mx-h"><b>Recording</b><div class="chips"><button class="chip sm" type="button" id="mxOver" aria-pressed="' + !!P.overlay + '">Synth</button></div></div>' +
      '<div class="mx-b"><input type="range" min="0" max="100" id="mxRecVol" aria-label="Recording volume"></div>' +
      '<div class="mx-b" id="mxOverRow"><input type="range" min="0" max="100" id="mxOverVol" aria-label="Synth volume"></div>';
    var ref = m.querySelector("#mxClick"), anchor = ref ? ref.closest(".mx") : null;
    if (anchor) m.insertBefore(box, anchor); else m.appendChild(box);
    var rv = box.querySelector("#mxRecVol"), ov = box.querySelector("#mxOverVol");
    rv.value = Math.round((P.recVol == null ? 1 : P.recVol) * 100); ov.value = Math.round((P.overlayVol == null ? 0.6 : P.overlayVol) * 100);
    box.querySelector("#mxOverRow").hidden = !P.overlay;
    rv.oninput = function () { P.recVol = (+rv.value) / 100; if (cur && cur.player) try { cur.player.setVolume(P.recVol); } catch (e) {} A.save(); };
    ov.oninput = function () { P.overlayVol = (+ov.value) / 100; EN.applyVolumes(); A.save(); };
    box.querySelector("#mxOver").onclick = function () {
      P.overlay = !P.overlay; A.save();
      this.setAttribute("aria-pressed", String(P.overlay)); box.querySelector("#mxOverRow").hidden = !P.overlay;
      var dd = R.drivers.rec; if (dd && dd.ext) dd.ext.parts = P.overlay;
      EN.applyVolumes();
    };
  }

  /* ================================================================ sync editor */
  var SY = { open: false };
  var peaksCache = {};
  function passList() { return S.tl.passes.map(function (p) { return p.start; }); }
  function beatList() { return S.tl.clicks.map(function (c) { return c.pos; }); }
  function tapList() { return SY.beat ? beatList() : passList(); }
  function passIndexAt(pos) {
    var P = S.tl.passes, lo = 0, hi = P.length - 1;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (P[mid].start <= pos + 1e-6) lo = mid; else hi = mid - 1; }
    return lo;
  }
  function barLabel(pos) {
    var i = passIndexAt(pos), p = S.tl.passes[i], n = S.sc.measures[p.bar].n, occ = 0;
    for (var j = 0; j <= i; j++) if (S.tl.passes[j].bar === p.bar) occ++;
    return n + (occ > 1 ? "·" + occ : "");
  }
  function nearestIndex(list, pos) {
    var lo = 0, hi = list.length - 1;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (list[mid] <= pos + 1e-6) lo = mid; else hi = mid - 1; }
    return lo;
  }

  function makeSyncDriver() {
    var d = { kind: "sync", finished: false, onEnd: null, alwaysSeek: true };
    var running = false, seg = { speed: 1, auto: false, next: Infinity };
    d.start = function () {
      var c = cur;
      return c.ready.then(function () {
        var pl = c.player;
        d.finished = false;
        pl.setRate(clamp(S.prefs.speed || 1, 0.25, 2));
        try { pl.setVolume(S.prefs.recVol == null ? 1 : S.prefs.recVol); } catch (e) {}
        if (SY.dur() && pl.time() >= SY.dur() - 0.05) pl.seek(0);
        return pl.play().then(function () { running = true; });
      }, function (e) { throw e; });
    };
    d.stop = function () { running = false; if (cur && cur.player) try { cur.player.pause(); } catch (e) {} };
    d.dispose = d.stop;
    d.seek = function (pos) {
      var list = tapList(), k = nearestIndex(list, pos);
      setK(k, true);
    };
    d.setSpeed = function (f) { if (cur && cur.player) cur.player.setRate(f); };
    d.pos = function () {
      var list = tapList();
      return { pos: list[clamp(SY.k, 0, list.length - 1)], counting: false, speed: S.prefs.speed, seg: seg };
    };
    d.bpm = function () { return 0; };
    d.playerEnded = function () { if (running) { running = false; d.finished = true; if (d.onEnd) d.onEnd(); } };
    return d;
  }

  function setK(k, fromSeek) {
    var list = tapList();
    SY.k = clamp(k, 0, list.length);
    var pos = list[clamp(SY.k, 0, list.length - 1)];
    S.startPos = pos; S.lastPos = pos;
    A.updateCursor(pos, true);
    updateSyncUi();
    if (fromSeek && !S.playing && cur && cur.player) {
      // jump the recording to just before the bar when a point is there already
      var pts = cur.rec.sync || [], i;
      for (i = 0; i < pts.length; i++) if (Math.abs(pts[i].pos - pos) < 1e-6) { var t = Math.max(0, pts[i].t + (+cur.rec.offset || 0) - 1); cur.player.seek(t); SY.center = t + 1; break; }
    }
  }
  SY.dur = function () { return cur && cur.player ? (cur.player.duration() || 0) : 0; };

  function openSync() {
    if (SY.open || !cur || !S.piece) return;
    if (T) return;
    if (window.PA.wait && PA.wait.on && PA.wait.on()) PA.wait.setOn(false);
    var c = cur;
    if (S.playing) A.pausePlay(true);
    A.closePanels();
    SY.open = true; SY.beat = false; SY.sel = -1; SY.win = 8; SY.center = 0; SY.k = 0; SY.rec = c.rec; SY.msg = "";
    SY.k = nearestIndex(tapList(), S.startPos);
    R.drivers.sync = makeSyncDriver();
    R.refreshDriver();
    buildSyncPanel();
    ensurePeaks(c);
    updateBar();
    setK(SY.k, true);
    c.ready.then(function () { if (SY.open && cur === c) { SY.center = c.player.time(); } }, function () { if (SY.open) { SY.msg = c.err || "Couldn't open that recording."; updateSyncUi(); } });
    SY.raf = requestAnimationFrame(syncFrame);
    document.body.classList.add("syncing");
    A.layout();
    PA.emit("syncopen", {});
  }
  function closeSync(quiet) {
    if (!SY.open) return;
    if (S.playing) A.pausePlay(true);
    SY.open = false;
    cancelAnimationFrame(SY.raf);
    R.drivers.sync = null;
    if (cur) cur.map = buildMap(cur.rec);
    var p = $("pSync"); if (p) p.hidden = true;
    document.body.classList.remove("syncing");
    R.refreshDriver();
    if (!quiet) { updateBar(); A.layout(); }
    PA.emit("syncclose", {});
  }
  R.openSync = openSync; R.closeSync = closeSync; R.sync = SY;

  function ensurePeaks(c) {
    var id = c.rec.id;
    if (peaksCache[id] || c.rec.kind === "youtube") return;
    c.ready.then(function () {
      if (!c.blob || peaksCache[id]) return;
      var dur = c.player.duration() || 60, buckets = clamp(Math.ceil(dur * 100), 400, 60000);
      return PM.peaks(c.blob, buckets).then(function (pk) {
        var mx = 0.001, i;
        for (i = 0; i < pk.length; i++) if (pk[i] > mx) mx = pk[i];
        var out = new Float32Array(pk.length);
        for (i = 0; i < pk.length; i++) out[i] = pk[i] / mx;
        peaksCache[id] = { pk: out, dur: dur };
      });
    }).catch(function () { peaksCache[id] = { pk: null, dur: 0 }; });
  }

  function buildSyncPanel() {
    var p = $("pSync");
    if (!p) {
      p = el("div", "more sync"); p.id = "pSync";
      var dp = $("dockPlay"); dp.insertBefore(p, $("dockSlot"));
    }
    p.hidden = false;
    p.innerHTML = '<div class="sy-top"><span class="sy-h">Sync</span><div class="chips"><button class="chip sm" type="button" id="syBar" aria-pressed="true">Bar</button><button class="chip sm" type="button" id="syBeat" aria-pressed="false">Beat</button></div>' +
      '<div class="sy-zoom"><button class="chip sm ico" type="button" id="syZm" aria-label="Zoom out">' + IC.minus + '</button><button class="chip sm ico" type="button" id="syZp" aria-label="Zoom in">' + IC.plus + '</button></div>' +
      '<button class="icon-btn sm" type="button" id="syClose" aria-label="Close sync">' + IC.x + "</button></div>" +
      '<canvas class="sy-wave" id="syWave" aria-label="Waveform"></canvas>' +
      '<div class="sy-mid"><div class="sy-step"><button class="chip sm ico" type="button" id="syPrev" aria-label="Previous bar">' + IC.left + '</button><b id="syBarN">Bar 1</b><button class="chip sm ico" type="button" id="syNext" aria-label="Next bar">' + IC.right + "</button></div>" +
      '<div class="sy-edit"><button class="chip sm" type="button" id="syM" aria-label="Earlier 10 ms">−10</button><button class="chip sm" type="button" id="syP" aria-label="Later 10 ms">+10</button>' +
      '<button class="chip sm ico" type="button" id="syDel" aria-label="Delete point">' + IC.trash + '</button><button class="chip sm" type="button" id="syClr">Clear from here</button></div></div>' +
      '<button class="tap" type="button" id="syTap" aria-label="Tap on the downbeat">Tap</button><p class="sy-msg" id="syMsg" hidden></p>';
    var q = function (s) { return p.querySelector(s); };
    SY.cv = q("#syWave");
    q("#syClose").onclick = function () { closeSync(); };
    q("#syBar").onclick = function () { setMode(false); };
    q("#syBeat").onclick = function () { setMode(true); };
    q("#syZm").onclick = function () { SY.win = clamp(SY.win * 1.6, 2, 120); };
    q("#syZp").onclick = function () { SY.win = clamp(SY.win / 1.6, 2, 120); };
    q("#syPrev").onclick = function () { setK(SY.k - 1, true); };
    q("#syNext").onclick = function () { setK(SY.k + 1, true); };
    q("#syM").onclick = function () { nudge(-0.01); };
    q("#syP").onclick = function () { nudge(0.01); };
    q("#syDel").onclick = delPoint;
    q("#syClr").onclick = clearFromHere;
    var tap = q("#syTap");
    tap.addEventListener("pointerdown", function (e) { e.preventDefault(); doTap(); });
    tap.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") e.preventDefault(); });
    waveInput(SY.cv);
    updateSyncUi();
  }
  function setMode(beat) {
    var pos = tapList()[clamp(SY.k, 0, tapList().length - 1)];
    SY.beat = !!beat;
    SY.k = nearestIndex(tapList(), pos);
    setK(SY.k, false);
  }
  function updateSyncUi() {
    var p = $("pSync");
    if (!p || p.hidden) return;
    var list = tapList(), k = clamp(SY.k, 0, list.length - 1), pos = list[k];
    p.querySelector("#syBarN").textContent = SY.k >= list.length ? "Done" : "Bar " + barLabel(pos) + (SY.beat ? " · " + (Math.round((pos - S.tl.passes[passIndexAt(pos)].start) * 100) / 100 + 1) : "");
    p.querySelector("#syBar").setAttribute("aria-pressed", String(!SY.beat));
    p.querySelector("#syBeat").setAttribute("aria-pressed", String(!!SY.beat));
    var sel = SY.sel >= 0 && cur && cur.rec.sync[SY.sel];
    ["#syM", "#syP", "#syDel"].forEach(function (s) { p.querySelector(s).disabled = !sel; });
    p.querySelector("#syClr").disabled = !(cur && cur.rec.sync && cur.rec.sync.length);
    var m = p.querySelector("#syMsg"); m.hidden = !SY.msg; m.textContent = SY.msg || "";
  }
  function pointsRef() { var r = cur.rec; if (!r.sync) r.sync = []; return r.sync; }
  function commit() {
    if (!cur) return;
    cur.rec.sync.sort(function (x, y) { return x.pos - y.pos; });
    cur.map = buildMap(cur.rec);
    ST.saveSoon(); if (S.piece) S.piece.updated = Date.now();
    updateSyncUi(); updateBar();
    PA.emit("sync", { id: cur.rec.id });
  }
  function doTap() {
    if (!SY.open || !cur || !cur.player || !S.playing) return;
    var list = tapList();
    if (SY.k >= list.length) return;
    var off = +cur.rec.offset || 0, t = cur.player.time() - off, pos = list[SY.k], pts = pointsRef(), i;
    var out = [];
    for (i = 0; i < pts.length; i++) {
      var q = pts[i];
      if (Math.abs(q.pos - pos) < 1e-6) continue;                    // replaced
      if (q.pos > pos && q.t <= t + 1e-3) continue;                  // later points the new one overtakes
      out.push(q);
    }
    out.push({ pos: pos, t: Math.round(t * 1000) / 1000 });
    cur.rec.sync = out;
    SY.sel = -1;
    commit();
    SY.k = SY.k + 1;
    if (SY.k >= list.length) {
      SY.msg = ""; updateSyncUi();
      A.pausePlay(true); A.updateTransport();
      S.startPos = list[list.length - 1];
      return;
    }
    setK(SY.k, false);
  }
  R.tap = doTap;
  function selIdx() { return SY.sel >= 0 && cur && cur.rec.sync[SY.sel] ? SY.sel : -1; }
  function nudge(dt) {
    var i = selIdx(); if (i < 0) return;
    var pts = cur.rec.sync, lo = i > 0 ? pts[i - 1].t + 0.005 : -Infinity, hi = i + 1 < pts.length ? pts[i + 1].t - 0.005 : Infinity;
    pts[i].t = Math.round(clamp(pts[i].t + dt, lo, hi) * 1000) / 1000;
    commit();
  }
  function delPoint() {
    var i = selIdx(); if (i < 0) return;
    cur.rec.sync.splice(i, 1); SY.sel = -1; commit();
  }
  function clearFromHere() {
    if (!cur) return;
    var list = tapList(), i = selIdx(), pos = i >= 0 ? cur.rec.sync[i].pos : list[clamp(SY.k, 0, list.length - 1)];
    cur.rec.sync = cur.rec.sync.filter(function (q) { return q.pos < pos - 1e-6; });
    SY.sel = -1; commit();
  }

  /* ---- waveform drawing and touch ---- */
  var colors = { at: 0 };
  function readColors() {
    if (now() - colors.at < 1500) return colors;
    var cs = getComputedStyle(document.documentElement);
    colors = { at: now(), bg: cs.getPropertyValue("--surface-2").trim() || "#eee", wave: cs.getPropertyValue("--muted").trim() || "#888", acc: cs.getPropertyValue("--acc").trim() || "#a3b", txt: cs.getPropertyValue("--text").trim() || "#000", line: cs.getPropertyValue("--line-2").trim() || "#ccc", warn: cs.getPropertyValue("--warn").trim() || "#c60" };
    return colors;
  }
  function timeToX(t, W) { return (t - (SY.center - SY.win / 2)) / SY.win * W; }
  function xToTime(x, W) { return SY.center - SY.win / 2 + x / W * SY.win; }
  function syncFrame() {
    if (!SY.open) return;
    SY.raf = requestAnimationFrame(syncFrame);
    var c = cur, cv = SY.cv;
    if (!c || !cv || !$("pSync") || $("pSync").hidden) return;
    var ph = c.player ? c.player.time() : 0;
    if (S.playing && !SY.dragging) SY.center = ph;
    drawWave(cv, ph);
  }
  function drawWave(cv, ph) {
    var dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    var g = cv.getContext("2d"), col = readColors();
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = col.bg; g.fillRect(0, 0, W, H);
    var c = cur, dur = SY.dur() || (peaksCache[c.rec.id] && peaksCache[c.rec.id].dur) || 0, t0 = SY.center - SY.win / 2, mid = H / 2 + 6, amp = (H - 16) / 2;
    var pk = peaksCache[c.rec.id] && peaksCache[c.rec.id].pk;
    // seconds ticks
    g.strokeStyle = col.line; g.fillStyle = col.wave; g.lineWidth = 1; g.font = "600 9px system-ui, sans-serif";
    var stepT = SY.win > 40 ? 10 : SY.win > 14 ? 5 : SY.win > 5 ? 1 : 0.5, ts = Math.ceil(t0 / stepT) * stepT;
    g.globalAlpha = 0.5;
    for (; ts < t0 + SY.win; ts += stepT) { if (ts < 0 || (dur && ts > dur)) continue; var tx = Math.round(timeToX(ts, W)) + 0.5; g.beginPath(); g.moveTo(tx, H - 6); g.lineTo(tx, H); g.stroke(); if (Math.abs(ts % (stepT * 2)) < 1e-6 || stepT >= 5) g.fillText(fmtTime(ts), tx + 2, H - 1); }
    g.globalAlpha = 1;
    if (pk) {
      var pps = pk.length / (dur || peaksCache[c.rec.id].dur || 1);
      g.strokeStyle = col.wave; g.globalAlpha = 0.85;
      g.beginPath();
      for (var x = 0; x < W; x++) {
        var ta = t0 + x / W * SY.win, tb = t0 + (x + 1) / W * SY.win;
        if (tb < 0 || (dur && ta > dur)) continue;
        var i0 = Math.max(0, Math.floor(ta * pps)), i1 = Math.min(pk.length - 1, Math.max(i0, Math.floor(tb * pps))), m = 0;
        for (var i = i0; i <= i1; i++) if (pk[i] > m) m = pk[i];
        var hh = Math.max(0.5, m * amp);
        g.moveTo(x + 0.5, mid - hh); g.lineTo(x + 0.5, mid + hh);
      }
      g.stroke(); g.globalAlpha = 1;
    } else {
      g.strokeStyle = col.wave; g.globalAlpha = 0.5; g.beginPath(); g.moveTo(0, mid); g.lineTo(W, mid); g.stroke(); g.globalAlpha = 1;
    }
    // points
    var pts = c.rec.sync || [];
    g.font = "800 10px system-ui, sans-serif"; g.textAlign = "left";
    for (var j = 0; j < pts.length; j++) {
      var q = pts[j], px = timeToX(q.t + (+c.rec.offset || 0), W);
      if (px < -30 || px > W + 30) continue;
      var barStart = false, pi = passIndexAt(q.pos);
      if (Math.abs(S.tl.passes[pi].start - q.pos) < 1e-6) barStart = true;
      var selp = j === SY.sel;
      g.strokeStyle = selp ? col.txt : col.acc; g.lineWidth = selp ? 3 : barStart ? 2 : 1;
      g.beginPath(); g.moveTo(Math.round(px) + 0.5, barStart ? 0 : 12); g.lineTo(Math.round(px) + 0.5, H - 8); g.stroke();
      if (barStart) { g.fillStyle = selp ? col.txt : col.acc; g.fillText(barLabel(q.pos), px + 3, 10); }
    }
    // playhead
    var hx = timeToX(ph, W);
    g.strokeStyle = col.warn; g.lineWidth = 2; g.beginPath(); g.moveTo(hx, 0); g.lineTo(hx, H); g.stroke(); g.lineWidth = 1;
    if (!pk && c.rec.kind !== "youtube" && peaksCache[c.rec.id] == null && !c.err) { g.fillStyle = col.wave; g.font = "700 11px system-ui"; g.fillText("…", 6, H / 2); }
  }
  function waveInput(cv) {
    var mode = "", x0 = 0, c0 = 0, moved = false, pid = -1;
    function pt(e) { var r = cv.getBoundingClientRect(); return e.clientX - r.left; }
    cv.addEventListener("pointerdown", function (e) {
      if (!cur) return;
      var W = cv.clientWidth, x = pt(e), pts = cur.rec.sync || [], best = -1, bd = 16, off = +cur.rec.offset || 0;
      for (var i = 0; i < pts.length; i++) { var d = Math.abs(timeToX(pts[i].t + off, W) - x); if (d < bd) { bd = d; best = i; } }
      x0 = x; c0 = SY.center; moved = false; pid = e.pointerId; SY.dragging = true;
      try { cv.setPointerCapture(e.pointerId); } catch (z) {}
      if (best >= 0) { SY.sel = best; mode = "marker"; updateSyncUi(); } else mode = "pan";
      e.preventDefault();
    });
    cv.addEventListener("pointermove", function (e) {
      if (!SY.dragging || e.pointerId !== pid) return;
      var W = cv.clientWidth, x = pt(e);
      if (Math.abs(x - x0) > 3) moved = true;
      if (mode === "marker" && moved && SY.sel >= 0) {
        var pts = cur.rec.sync, i = SY.sel, off = +cur.rec.offset || 0, t = xToTime(x, W) - off;
        var lo = i > 0 ? pts[i - 1].t + 0.005 : 0, hi = i + 1 < pts.length ? pts[i + 1].t - 0.005 : Infinity;
        pts[i].t = Math.round(clamp(t, lo, hi) * 1000) / 1000;
        cur.map = buildMap(cur.rec);
      } else if (mode === "pan" && moved && !S.playing) {
        SY.center = c0 - (x - x0) / W * SY.win;
      }
    });
    function up(e) {
      if (!SY.dragging || e.pointerId !== pid) return;
      SY.dragging = false;
      var W = cv.clientWidth, x = pt(e);
      if (mode === "marker" && moved) commit();
      else if (!moved && mode === "pan") {
        SY.sel = -1; updateSyncUi();
        var t = clamp(xToTime(x, W), 0, SY.dur() || 1e6);
        if (cur && cur.player) { cur.player.seek(t); SY.center = t; }
      }
      mode = "";
    }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  }
  window.addEventListener("keydown", function (e) {
    if (!SY.open || e.ctrlKey || e.metaKey || e.altKey) return;
    if ($("dlg").open) return;
    if (!S.playing) return;
    var k = e.key;
    if (k === "Escape" || k === "Tab" || k === "Shift" || k === "Control" || k === "Alt" || k === "Meta" || k === "F5") return;
    var t = e.target, tag = (t && t.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag) && !(tag === "INPUT" && t.type === "range")) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (!e.repeat) doTap();
  }, true);

  /* ================================================================ takes: record yourself */
  var T = null;
  R.take = function () { return T; };
  function updateSlot() {
    if (!slot) return;
    if (T) {
      slot.hidden = false;
      slot.className = "rslot live";
      slot.innerHTML = '<span class="rdot"></span><b id="rTime">0:00</b><span class="rlvl"><i id="rLvl"></i></span><em>Headphones</em>';
    } else if (cur && !isSynced(cur.rec) && !SY.open && !(window.PA.wait && PA.wait.on && PA.wait.on())) {
      slot.hidden = false; slot.className = "rslot todo";
      slot.innerHTML = '<button class="chip rc" id="rPrompt" type="button">' + IC.sync + "Sync this recording</button>";
      slot.querySelector("#rPrompt").onclick = openSync;
    } else { slot.hidden = true; slot.innerHTML = ""; }
    A.layout();
  }
  function toggleRecord() {
    if (T) { stopTake(); return; }
    if (SY.open) return;
    if (window.PA.wait && PA.wait.on && PA.wait.on()) { A.showErr("Turn Wait off to record"); return; }
    if (!PM.supportsRecording()) { A.showErr("Recording isn't supported here"); return; }
    EN.ensureCtx();                       // inside the tap, for iOS
    var rc = PM.recorder();
    T = { rc: rc, firstAt: 0, lat: 0, runs: [], run: null, timer: 0, t0: now(), bpm: A.bpmNow(), state: "arming" };
    A.closePanels();
    updateBar();
    rc.start().then(function (first) {
      if (!T || T.rc !== rc) { rc.cancel(); return; }
      T.firstAt = first; T.lat = rc.latency || 0; T.state = "live"; T.t0 = now();
      T.timer = setInterval(sampleTake, 40);
      if (!S.playing) A.startPlay();
      updateBar();
    }).catch(function (e) {
      var denied = e && (e.name === "NotAllowedError" || e.name === "SecurityError" || /denied|permission/i.test(e.message || ""));
      T = null; try { rc.cancel(); } catch (x) {}
      A.showErr(denied ? "Microphone is blocked" : ((e && e.message) || "Couldn't record"));
      updateBar();
    });
  }
  function sampleTake() {
    if (!T || T.state !== "live") return;
    var lv = $("rLvl"); if (lv) lv.style.width = Math.round(T.rc.level() * 100) + "%";
    var tm = $("rTime"); if (tm) tm.textContent = fmtTime((now() - T.t0) / 1000);
    if (!S.playing) return;
    var ep = A.eng().pos();
    if (!ep || ep.counting) { return; }
    var s = { pos: ep.pos, perf: now() }, run = T.run, last = run && run[run.length - 1];
    if (!run || (last && (s.pos < last.pos - 0.02 || s.pos - last.pos > 12 * (s.perf - last.perf) / 1000 + 0.5))) { T.run = run = []; T.runs.push(run); }
    run.push(s);
  }
  PA.on("seek", function () { if (T && T.state === "live") T.run = null; });
  function stopTake() {
    if (!T) return;
    if (T.state === "arming") { var rc0 = T.rc; T = null; try { rc0.cancel(); } catch (e) {} updateBar(); return; }
    if (S.playing) A.pausePlay(); else finishTake();
  }
  function finishTake() {
    var t = T;
    if (!t || t.state !== "live") return;
    t.state = "saving"; clearInterval(t.timer);
    t.rc.stop().then(function (blob) {
      T = null; updateBar();
      var run = t.runs.filter(function (r) { return r.length > 1; }).pop();
      if (!blob || blob.size < 800 || !run || (run[run.length - 1].perf - run[0].perf) < 1200) { A.showErr("Too short to keep"); return; }
      var pts = takePoints(run, t.firstAt, t.lat);
      var id = uid(), mid = "m" + id, d = new Date(t.t0 ? Date.now() - (now() - t.t0) : Date.now());
      return ST.mediaPut({ id: mid, blob: blob, mime: blob.type || t.rc.mime || "" }).then(function () {
        var r = { id: id, kind: "take", name: takeName(d), mediaId: mid, mime: blob.type || "", video: false, sync: pts, offset: 0, created: Date.now(), bpm: t.bpm };
        recs().push(r); saveData();
        injectMixer(); updateBar();
        A.showErr("Take saved");
        PA.emit("recordings", { take: r });
        R.lastTake = r;
      });
    }).catch(function () { T = null; updateBar(); A.showErr("Couldn't save the take"); });
  }
  /* Timeline position -> seconds in the take, from the positions heard while it was recorded: at every bar start inside the run, plus the run's ends. */
  function takePoints(run, firstAt, lat) {
    function tOf(perf) { return (perf - firstAt) / 1000 + lat; }
    var pts = [], P = S.tl.passes, i, j = 0;
    run = run.slice();
    while (run.length > 2 && run[1].pos - run[0].pos < 1e-4) run.shift();       // the cursor waiting for the recording to start
    pts.push({ pos: run[0].pos, t: tOf(run[0].perf) });
    for (i = 0; i < P.length; i++) {
      var ps = P[i].start;
      if (ps <= run[0].pos + 1e-6 || ps >= run[run.length - 1].pos - 1e-6) continue;
      while (j < run.length - 2 && run[j + 1].pos < ps) j++;
      var s0 = run[j], s1 = run[j + 1], f = s1.pos > s0.pos ? (ps - s0.pos) / (s1.pos - s0.pos) : 0;
      pts.push({ pos: ps, t: tOf(s0.perf + clamp(f, 0, 1) * (s1.perf - s0.perf)) });
    }
    var l = run[run.length - 1];
    pts.push({ pos: l.pos, t: tOf(l.perf) });
    var out = [];
    pts.forEach(function (q) {
      q.t = Math.round(q.t * 1000) / 1000;
      var prev = out[out.length - 1];
      if (prev && (q.pos - prev.pos < 1e-6 || q.t <= prev.t)) return;
      out.push(q);
    });
    return out;
  }
  PA.on("session", function (e) { if (T && T.state === "live") e.entry.take = true; });
  PA.on("pause", function () { if (T && T.state === "live") finishTake(); });

  /* ================================================================ lifecycle */
  PA.on("open", function () {
    buildBar();
    SY.open = false;
    unload();
    var id = S.prefs.rec, r = id ? recById(id) : null;
    if (r) load(r); else S.prefs.rec = null;
    R.refreshDriver();
    updatePanel(); updateBar(); injectMixer();
  });
  PA.on("main", function () { injectMixer(); });
  PA.on("rebuild", function (e) {
    if (cur && S.tl) cur.map = buildMap(cur.rec);
  });
  PA.on("leave", function () {
    if (T) { var t = T; T = null; clearInterval(t.timer); try { t.rc.cancel(); } catch (e) {} }
    if (SY.open) closeSync(true);
    SY.open = false;
    unload();
    R.drivers.rec = R.drivers.sync = null;
    A.setDriver(null);
    S.vidInset = 0;
    $("vPlayer").classList.remove("vside");
    if (vpanel) vpanel.hidden = true;
    if (slot) { slot.hidden = true; slot.innerHTML = ""; }
    var sp = $("pSync"); if (sp) sp.hidden = true;
    document.body.classList.remove("syncing");
    A.layout();
  });
  PA.on("layout", function () { /* the sticky video follows --subb, set by layout() */ });

  /* keys: R records, Y opens the sync editor */
  A.KEYS.splice(A.KEYS.length - 1, 0, ["R", "Record a take"], ["Any key", "Tap while syncing"]);
  window.addEventListener("keydown", function (e) {
    if (S.route !== "player" || e.ctrlKey || e.metaKey || e.altKey || SY.open) return;
    var t = e.target, tag = (t && t.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if ($("dlg").open || $("addSheet").open) return;
    if (e.key === "r" || e.key === "R") { e.preventDefault(); toggleRecord(); }
  });
  R.toggleRecord = toggleRecord; R.openSwitcher = openSwitcher; R.updateBar = updateBar; R.takePoints = takePoints; R.buildMap = buildMap; R.injectMixer = injectMixer;
})();
