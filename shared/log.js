/* Music Log: practice time and what was done, recorded without being asked.

   Every tool already loads shared/settings.js, and settings.js loads this file, so every page in
   Music (School included, which is built elsewhere) is tracked with no setup of its own.

   Time
     A tool's clock runs while its page is on screen and has been touched in the last few
     minutes (IDLE), or while it is making sound (MusicLog.playing). So a chord chart open on the
     stand keeps counting while you play from it, and a phone that locks itself stops the clock.
     Pages opened out of sight (the assistant's bridge frames, the home screen's sync frames) are
     never counted.

   Sessions
     Time and events go into a session. Moving from tool to tool stays in one session; a gap of
     more than GAP starts a new one. A session's id starts with this device's id, so sessions
     from two devices never collide and merge by simple union.

   What a tool can say (all optional; every call is safe before this file has loaded, because
   settings.js puts a queue in place first):
     MusicLog.playing(key, true, {text})   sound started; the text says what ("92 bpm · 4/4").
                                           Calling again with new text while on closes the first
                                           stretch and opens another (a tempo change).
     MusicLog.playing(key, false)          sound stopped. Each stretch becomes an event with its
                                           length; stretches under MIN_PLAY are dropped.
     MusicLog.count(key, text, {unit, ok}) one more of something: a card rated, a question
                                           answered (ok: true/false keeps a score). Same key and
                                           text in one session add up into one line.
     MusicLog.event(key, text)             one thing that happened ("Opened Autumn Leaves").
                                           The same line twice in a row is kept once.

   Saved on the device under "log:v1"; with a Music account the Practice Log tool merges it with
   the account's "log" document. */
(function () {
  "use strict";
  if (self.MusicLog && !self.MusicLog._q) return;   // already running on this page
  var KEY = "log:v1", DEV = "log:device", SYNCED = "log:syncedAt";
  var IDLE = 8 * 60e3, GAP = 15 * 60e3, TICK = 5e3, FLUSH = 15e3, MIN_PLAY = 10e3;
  var KEEP_DAYS = 400, MAX_EVENTS = 300;

  var stub = self.MusicLog && self.MusicLog._q ? self.MusicLog : null;

  function now() { return Date.now(); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function clean(d) {
    d = d && typeof d === "object" ? d : {};
    return { v: 1, sessions: Array.isArray(d.sessions) ? d.sessions : [], gone: d.gone && typeof d.gone === "object" ? d.gone : {} };
  }
  function read() { try { return clean(JSON.parse(lsGet(KEY) || "null")); } catch (e) { return clean(null); } }

  var device = lsGet(DEV);
  if (!device) { device = Math.random().toString(36).slice(2, 8); lsSet(DEV, device); }

  // Which tool this page is: the folder under Music's root. School's Library page is Library's.
  var root = (function () {
    var here = (document.currentScript && document.currentScript.src) || "";
    return here ? new URL("../", here).pathname : "/";
  })();
  var path = location.pathname.indexOf(root) === 0 ? location.pathname.slice(root.length) : location.pathname;
  var app = (path.split("/")[0] || "").toLowerCase();
  if (app === "school" && /library\.html$/.test(location.pathname)) app = "library";
  var embedded = false;
  try { embedded = self !== self.top; } catch (e) { embedded = true; }
  if (/[?&]bridge=1/.test(location.search)) embedded = true;
  var tracked = !!app && app !== "log" && !embedded;

  /* ---- writing: every change reads the saved copy fresh, so two pages never undo each other ---- */
  var listeners = [];
  function emit() { listeners.forEach(function (f) { try { f(); } catch (e) {} }); }
  function prune(d) {
    var cut = now() - KEEP_DAYS * 864e5;
    d.sessions = d.sessions.filter(function (s) { return s && s.end > cut; });
    Object.keys(d.gone).forEach(function (id) { if (d.gone[id] < cut) delete d.gone[id]; });
  }
  function write(fn) {
    var d = read();
    var out = fn(d);
    prune(d);
    lsSet(KEY, JSON.stringify(d));
    emit();
    return out;
  }
  // The session this moment belongs to: the latest one if it ended less than GAP ago.
  function current(d, t, from) {
    var s = null;
    for (var i = 0; i < d.sessions.length; i++) {
      var x = d.sessions[i];
      if (x.id.indexOf(device + "-") === 0 && (!s || x.end > s.end)) s = x;
    }
    if (s && t - s.end <= GAP && !d.gone[s.id]) return s;
    from = Math.min(from || t, t);
    s = { id: device + "-" + from.toString(36), start: from, end: t, apps: {}, events: [] };
    d.sessions.push(s);
    return s;
  }
  function addEvent(s, e) {
    s.events.push(e);
    if (e.t < s.start) s.start = e.t;
    if (s.events.length > MAX_EVENTS) s.events.splice(0, s.events.length - MAX_EVENTS);
  }

  /* ---- the clock ---- */
  var lastInput = now(), lastTick = now(), pending = 0, lastFlush = now();
  var playing = {};   // key -> {text, start, app}
  function anyPlaying() { for (var k in playing) return true; return false; }
  function counting() {
    if (!tracked) return false;
    if (anyPlaying()) return true;
    return document.visibilityState === "visible" && now() - lastInput < IDLE;
  }
  function tick() {
    var t = now(), dt = t - lastTick;
    lastTick = t;
    // A long gap means the page was frozen (phone locked, laptop asleep): that time isn't practice.
    if (counting() && dt > 0) pending += Math.min(dt, TICK * 3);
    if (pending && t - lastFlush >= FLUSH) flush();
  }
  function flush() {
    lastFlush = now();
    if (!tracked || pending < 1000) return;
    var secs = Math.round(pending / 1000);
    pending -= secs * 1000;
    write(function (d) {
      var s = current(d, now(), now() - secs * 1000);
      s.apps[app] = (s.apps[app] || 0) + secs;
      s.end = Math.max(s.end, now());
    });
  }
  function input() {
    var t = now();
    // Coming back after being idle: the clock restarts from here, not from the last touch.
    if (t - lastInput >= IDLE) lastTick = t;
    lastInput = t;
  }
  ["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, input, { passive: true, capture: true });
  });
  document.addEventListener("visibilitychange", function () {
    tick();
    // Off screen: stretches of sound end here (most tools stop their sound when hidden anyway).
    if (document.visibilityState === "hidden") { Object.keys(playing).forEach(function (k) { stopPlaying(k); }); flush(); pending = 0; }
    else { lastTick = now(); input(); }
  });
  window.addEventListener("pagehide", function () {
    tick();
    Object.keys(playing).forEach(function (k) { stopPlaying(k); });
    flush(); pending = 0;
  });
  if (tracked) setInterval(tick, TICK);

  /* ---- what was done ---- */
  function stopPlaying(key) {
    var p = playing[key];
    if (!p) return;
    delete playing[key];
    var t = now(), dur = t - p.start;
    if (dur < MIN_PLAY) return;
    write(function (d) {
      var s = current(d, p.start);
      var last = s.events[s.events.length - 1];
      // Stopping and starting again at the same setting within a minute is one stretch.
      if (last && last.app === p.app && last.key === key && last.text === p.text && last.secs != null && p.start - last.end < 60e3) {
        last.secs += Math.round(dur / 1000); last.end = t;
      } else {
        addEvent(s, { t: p.start, end: t, app: p.app, key: key, text: p.text, secs: Math.round(dur / 1000) });
      }
      s.end = Math.max(s.end, t);
    });
  }
  function setPlaying(key, on, info) {
    if (!tracked) return;
    key = String(key || "sound");
    var text = String((info && info.text) || "").slice(0, 120);
    if (!on) { stopPlaying(key); return; }
    input();
    var p = playing[key];
    if (p && p.text === text) return;
    if (p) stopPlaying(key);
    playing[key] = { text: text, start: now(), app: app };
  }
  function count(key, text, opts) {
    if (!tracked) return;
    opts = opts || {};
    key = String(key || "count"); text = String(text || "").slice(0, 120);
    input();
    write(function (d) {
      var t = now(), s = current(d, t), e = null;
      for (var i = s.events.length - 1; i >= 0; i--) {
        var x = s.events[i];
        if (x.app === app && x.key === key && x.text === text && x.n != null) { e = x; break; }
      }
      if (!e) { e = { t: t, end: t, app: app, key: key, text: text, n: 0 }; if (opts.unit) e.unit = String(opts.unit); addEvent(s, e); }
      e.n += opts.n > 0 ? +opts.n : 1;
      if (opts.ok === true || opts.ok === false) { e.ok = (e.ok || 0) + (opts.ok ? 1 : 0); e.tried = (e.tried || 0) + 1; }
      e.end = t; s.end = Math.max(s.end, t);
    });
  }
  function event(key, text) {
    if (!tracked) return;
    key = String(key || "event"); text = String(text || "").slice(0, 160);
    if (!text) return;
    input();
    write(function (d) {
      var t = now(), s = current(d, t), last = null;
      for (var i = s.events.length - 1; i >= 0; i--) if (s.events[i].app === app) { last = s.events[i]; break; }
      if (last && last.key === key && last.text === text && last.n == null && last.secs == null) { last.end = t; return; }
      addEvent(s, { t: t, end: t, app: app, key: key, text: text });
      s.end = Math.max(s.end, t);
    });
  }

  /* ---- things noticed without the tool saying anything ---- */
  // Drill tempos logged in Library or School's Hanon lessons (library:practice, written by School).
  (function watchPractice() {
    if (!tracked) return;
    var PK = "library:practice";
    function heads() {
      var out = {};
      try {
        var v = JSON.parse(lsGet(PK) || "null"), dr = (v && v.drills) || {};
        Object.keys(dr).forEach(function (k) { var l = dr[k] && dr[k].log; out[k] = Array.isArray(l) && l[0] ? JSON.stringify(l[0]) + "|" + l.length : ""; });
      } catch (e) {}
      return out;
    }
    var before = heads();
    var proto = Storage.prototype, orig = proto.setItem;
    proto.setItem = function (k, v) {
      var r = orig.apply(this, arguments);
      if (k === PK && this === localStorage) {
        try {
          var after = heads(), drills = (JSON.parse(v) || {}).drills || {};
          Object.keys(after).forEach(function (id) {
            if (after[id] && after[id] !== before[id]) {
              var top = drills[id].log[0] || {};
              var name = String(drills[id].title || id).replace(/^.*\//, "").replace(/[-_]+/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
              var bits = [name]; if (top.tempo) bits.push(top.tempo + " bpm"); if (top.mins) bits.push(top.mins + " min");
              event("drill", bits.join(" · "));
            }
          });
          before = after;
        } catch (e) {}
      }
      return r;
    };
  })();
  // School: the lesson, quiz or homework on screen, once it has been open for half a minute.
  (function watchSchool() {
    if (!tracked || location.pathname.indexOf(root + "school/") !== 0) return;
    var timer = null, SKIP = /^(overview|school|music school|my classes|classes)$/i;
    function look() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var h = document.querySelector("#app h2.vh, #app h1");
        if (!h) return;
        var title = (h.textContent || "").trim(), eye = h.parentNode && h.parentNode.querySelector(".eyebrow");
        var lead = eye && eye !== h ? (eye.textContent || "").trim() : "";
        if (!title || SKIP.test(title)) return;
        event("view", lead && !SKIP.test(lead) ? lead + ": " + title : title);
      }, 30e3);
    }
    window.addEventListener("hashchange", look);
    window.addEventListener("load", look);
  })();

  /* ---- account sync (used by the Practice Log tool) ---- */
  function merge(a, b) {
    a = clean(a); b = clean(b);
    var gone = Object.assign({}, a.gone);
    Object.keys(b.gone).forEach(function (id) { gone[id] = Math.max(gone[id] || 0, b.gone[id]); });
    var by = {};
    a.sessions.concat(b.sessions).forEach(function (s) {
      if (!s || !s.id || gone[s.id]) return;
      var o = by[s.id];
      // The copy that was written to later holds everything the other has, and more.
      if (!o || s.end > o.end || (s.end === o.end && (s.events || []).length > (o.events || []).length)) by[s.id] = s;
    });
    var out = { v: 1, sessions: Object.keys(by).map(function (k) { return by[k]; }).sort(function (x, y) { return x.start - y.start; }), gone: gone };
    prune(out);
    return out;
  }
  var syncing = null;
  function sync() {
    if (syncing) return syncing;
    var cloud = self.MusicCloud;
    syncing = (async function () {
      try {
        flush();
        if (!cloud || !cloud.configured) { lsSet(SYNCED, String(now())); return false; }
        await cloud.ready;
        if (!cloud.user()) { lsSet(SYNCED, String(now())); return false; }
        var remote = await cloud.load("log");
        var mine = read(), both = merge(mine, remote);
        lsSet(KEY, JSON.stringify(both));
        await cloud.save("log", both);
        lsSet(SYNCED, String(now()));
        emit();
        return true;
      } finally { syncing = null; }
    })();
    return syncing;
  }
  function remove(id) {
    write(function (d) {
      d.gone[id] = now();
      d.sessions = d.sessions.filter(function (s) { return s.id !== id; });
    });
  }

  window.addEventListener("storage", function (e) { if (e.key === KEY || e.key === null) emit(); });

  self.MusicLog = {
    app: app,
    tracked: tracked,
    playing: setPlaying,
    count: count,
    event: event,
    read: function () { flush(); return read(); },
    remove: remove,
    sync: sync,
    merge: merge,
    onChange: function (f) { listeners.push(f); }
  };
  if (stub) stub._q.forEach(function (c) { try { self.MusicLog[c[0]].apply(null, c[1]); } catch (e) {} });
})();
