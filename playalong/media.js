/* PAMedia: recordings for Play Along. Players (file / YouTube) share one interface, plus waveform peaks, sync maps and a mic recorder.

   player = { kind:"file"|"youtube", el, ready:Promise, play():Promise, pause(), seek(s), time() (smooth), duration(),
              setRate(r)->actual, playing(), setVolume(0..1), on(evt,fn), off(evt,fn), destroy() }
   events: "play" "pause" "ended" "error" "ready"
   PAMedia.file(blob, {video, container}) -> player      object URL, <audio>/<video playsinline>, appended to container if given
   PAMedia.youtube(urlOrId, container) -> player         IFrame API loaded once; controls=0 playsinline=1 rel=0 modestbranding=1
   PAMedia.youtubeId(text) -> id|null                    watch / shorts / embed / live / youtu.be URLs or a bare 11-char id
   PAMedia.peaks(blob, buckets) -> Promise<Float32Array> 0..1 per bucket (max abs); decoded at a low sample rate so long files fit a phone
   PAMedia.SyncMap(points, fallbackSpb) -> map           points [{pos (beats), t (seconds)}]
        map.timeAt(pos), map.posAt(t), map.points, map.add({pos,t}), map.remove(i), map.nearest(pos), map.spbAt(pos)
   PAMedia.recorder() -> { start()->Promise<performance.now() of first audio frame>, stop()->Promise<Blob>, level()->0..1, mime, latency (s, from the track's settings, 0 if unknown), cancel() }
   PAMedia.supportsRecording() -> bool
   Call player.play() / recorder.start() inside a tap on iOS. */
(function () {
  "use strict";

  var now = function () { return (window.performance && performance.now) ? performance.now() : Date.now(); };

  /* ---------- tiny emitter ---------- */
  function emitter(o) {
    var h = {};
    o.on = function (e, fn) { (h[e] = h[e] || []).push(fn); return o; };
    o.off = function (e, fn) { var a = h[e]; if (!a) return o; var i = a.indexOf(fn); if (i >= 0) a.splice(i, 1); return o; };
    o._emit = function (e, a) { var l = (h[e] || []).slice(); for (var i = 0; i < l.length; i++) { try { l[i](a); } catch (x) {} } };
    return o;
  }

  /* ---------- smooth clock: anchor (reported time, wall time, rate), extrapolated between reports, never backwards while playing ---------- */
  function Clock() {
    var c = { rep: 0, wall: 0, rate: 1, playing: false, last: 0, maxExtra: 0.6 };
    c.report = function (t, playing, rate) {
      var w = now();
      if (rate) c.rate = rate;
      if (!playing || !c.playing || Math.abs(t - c.est(w)) > 0.5 + 0.25 * c.rate) { c.snap(t, playing, w); return; }   // pause, start, seek
      if (t !== c.rep) { c.rep = t; c.wall = w; }
    };
    c.snap = function (t, playing, w) { c.rep = t; c.wall = w == null ? now() : w; c.last = t; c.playing = !!playing; };
    c.est = function (w) {
      if (!c.playing) return c.rep;
      var dt = Math.min(c.maxExtra, Math.max(0, (w - c.wall) / 1000));
      return c.rep + dt * c.rate;
    };
    c.time = function () {
      var v = c.est(now());
      if (c.playing) { if (v < c.last) v = c.last; c.last = v; } else c.last = v;
      return v;
    };
    return c;
  }

  /* ---------- file player ---------- */
  function file(blob, opt) {
    opt = opt || {};
    var video = !!opt.video, container = opt.container || null;
    var el = document.createElement(video ? "video" : "audio");
    el.preload = "auto"; el.setAttribute("playsinline", ""); el.setAttribute("webkit-playsinline", ""); el.playsInline = true;
    if (video) el.muted = false;
    var url = URL.createObjectURL(blob), destroyed = false, rate = 1;
    el.src = url;
    if (container) container.appendChild(el);
    var clk = Clock(), p = emitter({ kind: "file", el: el });
    function pp(v) { try { el.preservesPitch = v; } catch (e) {} try { el.webkitPreservesPitch = v; } catch (e) {} try { el.mozPreservesPitch = v; } catch (e) {} }
    pp(true);
    var tick = 0;
    function poll() { clk.report(el.currentTime, !el.paused && !el.ended, rate); }
    p.ready = new Promise(function (res, rej) {
      var done = false;
      function ok() {
        if (done) return;
        if (!isFinite(el.duration) || el.duration <= 0) {
          if (el.duration === Infinity) {      // some webm recordings: force the real duration
            var f = function () { el.removeEventListener("timeupdate", f); el.currentTime = 0; ok2(); };
            el.addEventListener("timeupdate", f); el.currentTime = 1e7; return;
          }
          return;
        }
        ok2();
      }
      function ok2() { if (done || !isFinite(el.duration)) return; done = true; clk.snap(el.currentTime, false); p._emit("ready"); res(p); }
      el.addEventListener("loadedmetadata", ok); el.addEventListener("durationchange", ok); el.addEventListener("canplay", ok);
      el.addEventListener("error", function () { if (!done) { done = true; rej(new Error("media error")); } });
    });
    p.ready.catch(function () {});
    el.addEventListener("play", function () { poll(); p._emit("play"); });
    el.addEventListener("playing", poll);
    el.addEventListener("pause", function () { clk.snap(el.currentTime, false); p._emit("pause"); });
    el.addEventListener("ended", function () { clk.snap(el.currentTime, false); p._emit("ended"); });
    el.addEventListener("seeked", function () { clk.snap(el.currentTime, !el.paused); });
    el.addEventListener("timeupdate", poll);
    el.addEventListener("error", function () { p._emit("error", el.error); });
    tick = setInterval(poll, 50);
    p.play = function () {
      if (el.ended) el.currentTime = 0;
      var r = el.play();
      return r && r.then ? r : Promise.resolve();
    };
    p.pause = function () { el.pause(); };
    p.seek = function (s) {
      var d = el.duration; s = Math.max(0, s || 0); if (isFinite(d)) s = Math.min(s, d);
      el.currentTime = s; clk.snap(s, !el.paused);
    };
    p.time = function () { return clk.time(); };
    p.duration = function () { return isFinite(el.duration) ? el.duration : 0; };
    p.setRate = function (r) {
      r = Math.max(0.25, Math.min(2, Math.round((+r || 1) * 100) / 100));
      pp(true); el.playbackRate = r; rate = el.playbackRate || r;
      clk.report(el.currentTime, false, rate); clk.snap(el.currentTime, !el.paused); clk.rate = rate;
      return rate;
    };
    p.playing = function () { return !el.paused && !el.ended; };
    p.setVolume = function (v) { el.volume = Math.max(0, Math.min(1, v)); };
    p.destroy = function () {
      if (destroyed) return; destroyed = true; clearInterval(tick);
      try { el.pause(); } catch (e) {}
      el.removeAttribute("src"); try { el.load(); } catch (e) {}
      if (el.parentNode) el.parentNode.removeChild(el);
      URL.revokeObjectURL(url);
    };
    return p;
  }

  /* ---------- YouTube ---------- */
  function youtubeId(text) {
    if (text == null) return null;
    var s = String(text).trim(), m;
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    m = s.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:shorts\/|embed\/|live\/|v\/|watch\?(?:[^#\s]*&)?v=|[^#\s]*[?&]v=))([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/i);
    return m ? m[1] : null;
  }
  var ytLoading = null;
  function loadYT() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (ytLoading) return ytLoading;
    ytLoading = new Promise(function (res, rej) {
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { try { if (prev) prev(); } catch (e) {} res(window.YT); };
      var s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api"; s.async = true;
      s.onerror = function () { ytLoading = null; rej(new Error("YouTube unavailable")); };
      document.head.appendChild(s);
    });
    return ytLoading;
  }
  function nearest(list, r) {
    var best = list[0], bd = Infinity;
    for (var i = 0; i < list.length; i++) { var d = Math.abs(list[i] - r); if (d < bd) { bd = d; best = list[i]; } }
    return best;
  }
  function youtube(urlOrId, container) {
    var id = youtubeId(urlOrId), clk = Clock(), p = emitter({ kind: "youtube", el: null });
    var yt = null, isPlaying = false, rate = 1, poller = 0, destroyed = false, dur = 0, pendingPlay = null, hostEl = null, volume = null;
    var rejectReady;
    p.ready = new Promise(function (res, rej) {
      rejectReady = rej;
      if (!id) { rej(new Error("bad YouTube link")); return; }
      loadYT().then(function (YT) {
        if (destroyed) return;
        hostEl = document.createElement("div");
        hostEl.className = "pa-yt";
        (container || document.body).appendChild(hostEl);
        p.el = hostEl;
        var inner = document.createElement("div"); hostEl.appendChild(inner);
        yt = new YT.Player(inner, {
          videoId: id, width: "100%", height: "100%",
          playerVars: { playsinline: 1, controls: 0, rel: 0, modestbranding: 1, fs: 0, disablekb: 1, iv_load_policy: 3, origin: location.origin },
          events: {
            onReady: function () {
              if (destroyed) return;
              try { dur = yt.getDuration() || 0; } catch (e) {}
              try { var f = hostEl.querySelector("iframe") || (yt.getIframe && yt.getIframe()); if (f) p.el = hostEl; } catch (e) {}
              if (volume != null) try { yt.setVolume(volume * 100); } catch (e) {}
              poller = setInterval(poll, 100);
              clk.snap(0, false); p._emit("ready"); res(p);
            },
            onStateChange: function (e) {
              var st = e && e.data;
              if (!dur) try { dur = yt.getDuration() || 0; } catch (x) {}
              if (st === 1) { isPlaying = true; clk.report(cur(), true, rate); p._emit("play"); if (pendingPlay) { pendingPlay(); pendingPlay = null; } }
              else if (st === 2) { isPlaying = false; clk.snap(cur(), false); p._emit("pause"); }
              else if (st === 0) { isPlaying = false; clk.snap(cur(), false); p._emit("ended"); }
              else if (st === 3) { clk.snap(cur(), false); }          // buffering: hold the clock
            },
            onPlaybackRateChange: function () { try { rate = yt.getPlaybackRate() || rate; clk.rate = rate; } catch (x) {} },
            onError: function (e) { p._emit("error", e); }
          }
        });
      }, function (e) { rej(e); });
    });
    p.ready.catch(function () {});
    function cur() { try { return yt.getCurrentTime() || 0; } catch (e) { return clk.rep; } }
    function poll() { if (yt) clk.report(cur(), isPlaying, rate); }
    p.play = function () {
      return p.ready.then(function () {
        if (isPlaying) return;
        return new Promise(function (res) { pendingPlay = res; yt.playVideo(); setTimeout(res, 1500); });
      });
    };
    p.pause = function () { if (yt && yt.pauseVideo) yt.pauseVideo(); };
    p.seek = function (s) {
      s = Math.max(0, s || 0); if (dur) s = Math.min(s, dur);
      if (yt && yt.seekTo) yt.seekTo(s, true);
      clk.snap(s, isPlaying);
    };
    p.time = function () { return clk.time(); };
    p.duration = function () { if (!dur && yt) try { dur = yt.getDuration() || 0; } catch (e) {} return dur; };
    p.setRate = function (r) {
      var list = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
      try { var a = yt.getAvailablePlaybackRates(); if (a && a.length) list = a; } catch (e) {}
      var v = nearest(list, +r || 1);
      try { yt.setPlaybackRate(v); } catch (e) {}
      rate = v; clk.snap(cur(), isPlaying); clk.rate = v;
      return v;
    };
    p.playing = function () { return isPlaying; };
    p.setVolume = function (v) { volume = Math.max(0, Math.min(1, v)); if (yt && yt.setVolume) try { yt.setVolume(volume * 100); } catch (e) {} };
    p.destroy = function () {
      destroyed = true; clearInterval(poller);
      try { if (yt && yt.destroy) yt.destroy(); } catch (e) {}
      if (hostEl && hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
    };
    return p;
  }

  /* ---------- peaks ---------- */
  function decodeWith(ctx, buf) {
    return new Promise(function (res, rej) {
      var r = ctx.decodeAudioData(buf, res, rej);
      if (r && r.then) r.then(res, rej);
    });
  }
  function peaks(blob, buckets) {
    buckets = Math.max(1, buckets | 0 || 200);
    var AC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AC) return Promise.reject(new Error("no audio decoding"));
    var rates = blob.size > 4e6 ? [8000, 22050, 44100] : [22050, 44100];
    return blob.arrayBuffer().then(function (data) {
      var i = 0;
      function attempt() {
        var ctx;
        try { ctx = new AC(1, 1, rates[i]); } catch (e) { if (++i < rates.length) return attempt(); return Promise.reject(e); }
        return decodeWith(ctx, data.slice(0)).catch(function (e) { if (++i < rates.length) return attempt(); throw e; });
      }
      return attempt();
    }).then(function (ab) {
      var n = ab.length, out = new Float32Array(buckets), ch = ab.numberOfChannels, c, i, b;
      for (c = 0; c < ch; c++) {
        var d = ab.getChannelData(c);
        for (b = 0; b < buckets; b++) {
          var lo = Math.floor(b * n / buckets), hi = Math.max(lo + 1, Math.floor((b + 1) * n / buckets)), m = out[b];
          for (i = lo; i < hi && i < n; i++) { var v = d[i] < 0 ? -d[i] : d[i]; if (v > m) m = v; }
          out[b] = m > 1 ? 1 : m;
        }
      }
      return out;
    });
  }

  /* ---------- sync map ---------- */
  function SyncMap(points, fallbackSpb) {
    var m = { points: [], fallback: fallbackSpb > 0 ? fallbackSpb : 0.5 };
    function sort() { m.points.sort(function (a, b) { return a.pos - b.pos; }); }
    function clean() {                      // keep t strictly increasing with pos so the map stays invertible
      var p = m.points, i, out = [];
      for (i = 0; i < p.length; i++) {
        if (!isFinite(p[i].pos) || !isFinite(p[i].t)) continue;
        if (out.length && out[out.length - 1].pos === p[i].pos) { out[out.length - 1] = p[i]; continue; }
        out.push(p[i]);
      }
      m.points = out;
    }
    function seg(i) { // slope seconds per beat between points i and i+1, forced positive
      var a = m.points[i], b = m.points[i + 1], s = (b.t - a.t) / (b.pos - a.pos);
      return s > 1e-6 ? s : 1e-6;
    }
    m.points = (points || []).map(function (q) { return { pos: +q.pos, t: +q.t }; });
    sort(); clean();
    // monotonic: where t goes backwards, the later point is pushed to be a hair later (slope 1e-6 spb)
    function mono() {
      var p = m.points, i;
      for (i = 1; i < p.length; i++) if (p[i].t <= p[i - 1].t) p[i] = { pos: p[i].pos, t: p[i - 1].t + 1e-6 * (p[i].pos - p[i - 1].pos) };
    }
    mono();
    m.timeAt = function (pos) {
      var p = m.points, n = p.length, i;
      if (n === 0) return pos * m.fallback;
      if (n === 1) return p[0].t + (pos - p[0].pos) * m.fallback;
      if (pos <= p[0].pos) return p[0].t + (pos - p[0].pos) * seg(0);
      if (pos >= p[n - 1].pos) return p[n - 1].t + (pos - p[n - 1].pos) * seg(n - 2);
      var lo = 0, hi = n - 1;
      while (hi - lo > 1) { i = (lo + hi) >> 1; if (p[i].pos <= pos) lo = i; else hi = i; }
      return p[lo].t + (pos - p[lo].pos) * seg(lo);
    };
    m.posAt = function (t) {
      var p = m.points, n = p.length, i;
      if (n === 0) return t / m.fallback;
      if (n === 1) return p[0].pos + (t - p[0].t) / m.fallback;
      if (t <= p[0].t) return p[0].pos + (t - p[0].t) / seg(0);
      if (t >= p[n - 1].t) return p[n - 1].pos + (t - p[n - 1].t) / seg(n - 2);
      var lo = 0, hi = n - 1;
      while (hi - lo > 1) { i = (lo + hi) >> 1; if (p[i].t <= t) lo = i; else hi = i; }
      return p[lo].pos + (t - p[lo].t) / seg(lo);
    };
    m.spbAt = function (pos) {
      var p = m.points, n = p.length, i;
      if (n < 2) return m.fallback;
      if (pos <= p[0].pos) return seg(0);
      if (pos >= p[n - 1].pos) return seg(n - 2);
      for (i = 0; i < n - 2; i++) if (pos < p[i + 1].pos) break;
      return seg(i);
    };
    m.add = function (pt) {
      var q = { pos: +pt.pos, t: +pt.t }, p = m.points, i;
      for (i = 0; i < p.length; i++) if (p[i].pos === q.pos) { p[i] = q; mono(); return m; }
      p.push(q); sort(); mono(); return m;
    };
    m.remove = function (i) { if (i >= 0 && i < m.points.length) m.points.splice(i, 1); return m; };
    m.nearest = function (pos) {
      var p = m.points, best = -1, bd = Infinity, i;
      for (i = 0; i < p.length; i++) { var d = Math.abs(p[i].pos - pos); if (d < bd) { bd = d; best = i; } }
      return best;
    };
    return m;
  }

  /* ---------- recorder (same MIME order and constraints as memos/app.js) ---------- */
  function pickType() {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return "";
    var t = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"];
    for (var i = 0; i < t.length; i++) if (MediaRecorder.isTypeSupported(t[i])) return t[i];
    return "";
  }
  function supportsRecording() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }
  function recorder() {
    var r = { mime: pickType() }, stream = null, rec = null, ctx = null, proc = null, src = null, chunks = [], lvl = 0, started = false, cancelled = false;
    function cleanup() {
      try { if (proc) { proc.onaudioprocess = null; proc.disconnect(); } } catch (e) {}
      try { if (src) src.disconnect(); } catch (e) {}
      try { if (ctx && ctx.close) ctx.close(); } catch (e) {}
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      proc = src = ctx = stream = null; lvl = 0;
    }
    r.level = function () { return lvl; };
    r.start = function () {
      if (!supportsRecording()) return Promise.reject(new Error("Recording isn't supported here"));
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { ctx = new AC(); if (ctx.resume) ctx.resume(); } catch (e) { ctx = null; } }   // created inside the tap for iOS
      return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }).then(function (s) {
        if (cancelled) { s.getTracks().forEach(function (t) { t.stop(); }); cleanup(); throw new Error("cancelled"); }
        stream = s;
        try { var tr = s.getAudioTracks()[0], gs = tr && tr.getSettings && tr.getSettings(); r.latency = gs && gs.latency > 0 ? gs.latency : 0; } catch (e) { r.latency = 0; }
        try { rec = r.mime ? new MediaRecorder(s, { mimeType: r.mime }) : new MediaRecorder(s); } catch (e) { rec = new MediaRecorder(s); }
        r.mime = rec.mimeType || r.mime;
        return new Promise(function (res, rej) {
          var first = 0, recStarted = false, gotFrame = false, firstAt = 0;
          function maybe() { if (recStarted && gotFrame && !started) { started = true; res(firstAt); } }
          rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          rec.onerror = function (e) { rej(e.error || new Error("recording failed")); };
          rec.onstart = function () { recStarted = true; maybe(); };
          if (ctx) {
            src = ctx.createMediaStreamSource(s);
            proc = ctx.createScriptProcessor(1024, 1, 1);
            var mute = ctx.createGain(); mute.gain.value = 0;
            proc.onaudioprocess = function (e) {
              var d = e.inputBuffer.getChannelData(0), sum = 0, i;
              for (i = 0; i < d.length; i++) sum += d[i] * d[i];
              var v = Math.sqrt(sum / d.length) * 3; lvl = v > 1 ? 1 : v;
              if (!gotFrame) { gotFrame = true; firstAt = now() - d.length / ctx.sampleRate * 1000; maybe(); }
            };
            src.connect(proc); proc.connect(mute); mute.connect(ctx.destination);
          } else { gotFrame = true; firstAt = now(); }
          rec.start(250);
          if (!first) setTimeout(function () { if (!started) { recStarted = true; gotFrame = true; if (!firstAt) firstAt = now(); maybe(); } }, 2500);
        });
      }, function (e) { cleanup(); throw e; });
    };
    r.stop = function () {
      return new Promise(function (res, rej) {
        if (!rec || rec.state === "inactive") { cleanup(); return rej(new Error("not recording")); }
        rec.onstop = function () {
          var b = new Blob(chunks, { type: r.mime || (chunks[0] && chunks[0].type) || "audio/webm" });
          chunks = []; cleanup(); res(b);
        };
        try { rec.requestData(); } catch (e) {}
        rec.stop();
      });
    };
    r.cancel = function () {
      cancelled = true;
      try { if (rec && rec.state !== "inactive") { rec.onstop = null; rec.ondataavailable = null; rec.stop(); } } catch (e) {}
      chunks = []; cleanup();
    };
    return r;
  }

  window.PAMedia = {
    file: file, youtube: youtube, youtubeId: youtubeId, peaks: peaks, SyncMap: SyncMap,
    recorder: recorder, supportsRecording: supportsRecording, _Clock: Clock
  };
})();
