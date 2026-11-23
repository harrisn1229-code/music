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

   Timed blocks (the Timer tool: pomodoros, timers, a stopwatch for production sessions)
     MusicLog.record(app, {secs, end, covered, text, tag, kind, note, rid})
                                           a stretch of time that ended at end, logged as it is
                                           rather than by the clock (the phone may have been locked
                                           the whole time). covered is how much of it other tools
                                           already counted, so the day's total never counts a minute
                                           twice. rid makes it safe to call twice. Returns the event.
     MusicLog.unrecord(rid)                take a timed block back out (Undo).
     MusicLog.amend(rid, {secs, text, tag, note})   change one afterwards.
   The Timer's own page never runs the clock: its time is what it records. While a timer is
   running (timer:run), every other tool's counted time is added to its "covered".

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
  // The Timer logs exactly what is on its clock (MusicLog.record), so its page never counts on its own.
  var clockless = app === "timer";
  var RUN = "timer:run";

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
    if (!tracked || clockless) return false;
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
    cover(secs);
  }
  // A timer is running while this tool counted: that time is already in the log, so the timer
  // will leave it out when it records its block.
  function cover(secs) {
    var r;
    try { r = JSON.parse(lsGet(RUN) || "null"); } catch (e) { return; }
    if (!r || !r.resumedAt || r.waiting || r.phase !== "focus") return;
    r.covered = (r.covered || 0) + secs * 1000;
    lsSet(RUN, JSON.stringify(r));
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

  /* ---- timed blocks (the Timer) ---- */
  function findRid(d, rid) {
    for (var i = d.sessions.length - 1; i >= 0; i--) {
      var ev = d.sessions[i].events || [];
      for (var j = ev.length - 1; j >= 0; j--) if (ev[j].rid === rid) return { s: d.sessions[i], e: ev[j], i: j };
    }
    return null;
  }
  function setText(e, p) {
    if (p.text != null) e.text = String(p.text).slice(0, 160);
    if (p.tag != null) { if (p.tag) e.tag = String(p.tag).slice(0, 40); else delete e.tag; }
    if (p.note != null) { if (p.note) e.note = String(p.note).slice(0, 120); else delete e.note; }
  }
  function record(appId, o) {
    if (embedded) return null;
    o = o || {};
    var secs = Math.round(+o.secs || 0);
    if (!(secs > 0)) return null;
    var end = +o.end || now(), start = end - secs * 1000;
    var add = secs - Math.max(0, Math.min(secs, Math.round(+o.covered || 0)));
    appId = String(appId || app || "timer");
    return write(function (d) {
      if (o.rid && findRid(d, String(o.rid))) return null;
      var s = current(d, start, start);
      if (add) s.apps[appId] = (s.apps[appId] || 0) + add;
      var e = { t: start, end: end, app: appId, key: String(o.key || appId), text: "", secs: secs, add: add };
      if (o.rid) e.rid = String(o.rid);
      if (o.kind) e.kind = String(o.kind);
      setText(e, o);
      addEvent(s, e);
      s.end = Math.max(s.end, end);
      return JSON.parse(JSON.stringify(e));
    });
  }
  function unrecord(rid) {
    if (!rid) return false;
    return write(function (d) {
      var f = findRid(d, String(rid));
      if (!f) return false;
      var s = f.s, e = f.e;
      s.events.splice(f.i, 1);
      if (e.add) { s.apps[e.app] = Math.max(0, (s.apps[e.app] || 0) - e.add); if (!s.apps[e.app]) delete s.apps[e.app]; }
      var left = 0;
      for (var k in s.apps) left += s.apps[k] || 0;
      if (!s.events.length && !left) { d.gone[s.id] = now(); d.sessions = d.sessions.filter(function (x) { return x !== s; }); }
      else s.end += 1;   // the copy with the later end wins when the account merges, so this sticks
      return true;
    });
  }
  function amend(rid, p) {
    if (!rid) return null;
    p = p || {};
    return write(function (d) {
      var f = findRid(d, String(rid));
      if (!f) return null;
      var s = f.s, e = f.e;
      if (p.secs != null && +p.secs > 0) {
        var secs = Math.round(+p.secs);
        var cov = Math.min(secs, Math.max(0, (e.secs || 0) - (e.add || 0))), add = secs - cov;
        s.apps[e.app] = Math.max(0, (s.apps[e.app] || 0) - (e.add || 0) + add);
        if (!s.apps[e.app]) delete s.apps[e.app];
        e.secs = secs; e.add = add; e.t = e.end - secs * 1000;
        if (e.t < s.start) s.start = e.t;
      }
      setText(e, p);
      s.end += 1;
      return JSON.parse(JSON.stringify(e));
    });
  }

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
    record: record,
    unrecord: unrecord,
    amend: amend,
    read: function () { flush(); return read(); },
    remove: remove,
    sync: sync,
    merge: merge,
    onChange: function (f) { listeners.push(f); }
  };
  if (stub) stub._q.forEach(function (c) { try { self.MusicLog[c[0]].apply(null, c[1]); } catch (e) {} });
})();
