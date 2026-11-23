/* Music Timer: a pomodoro, a countdown timer and a stopwatch that log their time to the Practice Log.

   One timer for the whole app. Its state lives on the device under "timer:run" as timestamps,
   not a running count, so it keeps time while the phone is locked, the tab is in the background
   or the page is closed. settings.js loads this file on every page, so:
   - a running timer shows as a small pill in each tool's top bar (on the home screen, on the
     Timer tile), and tapping it opens the Timer;
   - whichever page is open when a block runs out finishes it: a chime, a notification if
     allowed, the block logged, the pomodoro moved on to its break.

   What is logged: focus time only (a pomodoro's focus blocks, a timer, a stopwatch session),
   with the activity it was for ("Production", "Guitar"). Breaks are not practice. Time other
   tools already counted during a block is left out of the timer's share (shared/log.js keeps
   track of it in "covered"), so the day's total never counts the same minute twice.

   A block that ends while nobody is looking (phone locked) is logged with the time it really
   ended; the chime is skipped when it would come late, and a pomodoro never starts its next
   focus block on its own unless the musician is there to see it.

   MusicTimer.start(mode)      "pomodoro" | "countdown" | "stopwatch", with the saved settings
   MusicTimer.pause() / resume() / skip() / next()
   MusicTimer.stop(opts)       end the run; logs what was timed. opts: {secs, note, discard}
   MusicTimer.run()            the current run or null; elapsed(run) / remaining(run) in ms
   MusicTimer.prefs() / setPrefs(patch)
   MusicTimer.on(fn)           fn({type: "change" | "logged" | "phase", ...}) */
(function () {
  "use strict";
  if (self.MusicTimer && self.MusicTimer.version) return;

  var KEY = "timer:run", PREFS = "timer:prefs:v1";
  var MIN_LOG = 60;                 // seconds: shorter stretches are not logged
  var LATE = 8e3;                   // a block noticed later than this ended while nobody was looking

  /* ---- where we are ---- */
  var here = (document.currentScript && document.currentScript.src) || "";
  var ROOT = here ? new URL("../", here) : new URL("./", location.href);
  var path = location.pathname.indexOf(ROOT.pathname) === 0 ? location.pathname.slice(ROOT.pathname.length) : location.pathname;
  var page = (path.split("/")[0] || "").toLowerCase();
  if (/\.html$/.test(page)) page = "";          // index.html at the root is the home screen
  var embedded = false;
  try { embedded = self !== self.top; } catch (e) { embedded = true; }
  if (/[?&]bridge=1/.test(location.search)) embedded = true;
  var onTimer = page === "timer", onHome = page === "";

  function now() { return Date.now(); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function num(v, d, lo, hi) { v = Math.round(+v); return isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d; }

  /* ---- settings ---- */
  var TAGS = ["Production", "Mixing", "Songwriting", "Guitar", "Bass", "Piano"];
  var TAG_COLORS = { Production: "#5B7F12", Mixing: "#0D9488", Songwriting: "#B3245B", Guitar: "#C26A06", Bass: "#2C7BD6", Piano: "#7C4DCC" };
  var MORE_COLORS = ["#9F2D3F", "#0B7FA6", "#A8740F", "#4B5563", "#C2570C", "#5B3FA8", "#1E8A5A", "#C2417A"];
  function color(tag) {
    if (!tag) return "#8A90A0";
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
    var h = 0;
    for (var i = 0; i < tag.length; i++) h = (h * 31 + tag.toLowerCase().charCodeAt(i)) >>> 0;
    return MORE_COLORS[h % MORE_COLORS.length];
  }
  function cleanPrefs(p) {
    p = p && typeof p === "object" ? p : {};
    var tags = Array.isArray(p.tags) ? p.tags.map(function (t) { return String(t || "").trim().slice(0, 40); }).filter(Boolean) : TAGS.slice();
    tags = tags.filter(function (t, i) { return tags.indexOf(t) === i; });
    if (!tags.length) tags = TAGS.slice();
    return {
      mode: ["pomodoro", "countdown", "stopwatch"].indexOf(p.mode) >= 0 ? p.mode : "pomodoro",
      minutes: num(p.minutes, 30, 1, 600),
      tag: tags.indexOf(p.tag) >= 0 ? p.tag : tags[0],
      tags: tags,
      focus: num(p.focus, 25, 1, 180),
      short: num(p.short, 5, 1, 60),
      long: num(p.long, 15, 1, 90),
      every: num(p.every, 4, 1, 12),
      autoBreak: p.autoBreak !== false,
      autoFocus: p.autoFocus === true,
      sound: p.sound !== false,
      awake: p.awake !== false,
      notify: p.notify === true
    };
  }
  function prefs() { try { return cleanPrefs(JSON.parse(lsGet(PREFS) || "null")); } catch (e) { return cleanPrefs(null); } }
  function setPrefs(patch) {
    var p = cleanPrefs(Object.assign(prefs(), patch || {}));
    lsSet(PREFS, JSON.stringify(p));
    emit({ type: "change" });
    return p;
  }

  /* ---- the run ---- */
  function load() {
    var r;
    try { r = JSON.parse(lsGet(KEY) || "null"); } catch (e) { r = null; }
    return r && typeof r === "object" && r.id && r.mode ? r : null;
  }
  function save(r) { if (r) lsSet(KEY, JSON.stringify(r)); else lsDel(KEY); }
  function elapsed(r, t) { if (!r) return 0; t = t || now(); return Math.max(0, (r.acc || 0) + (r.resumedAt ? Math.max(0, t - r.resumedAt) : 0)); }
  function remaining(r, t) { return r && r.target ? r.target * 1000 - elapsed(r, t) : null; }
  function uid() { return now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function phaseSecs(p, phase) { return 60 * (phase === "focus" ? p.focus : phase === "long" ? p.long : p.short); }
  function phaseName(r) {
    if (!r) return "";
    if (r.mode !== "pomodoro") return r.mode === "countdown" ? "Timer" : "Stopwatch";
    return r.phase === "focus" ? "Focus" : r.phase === "long" ? "Long break" : "Break";
  }
  function newPhase(r, phase, at, run) {
    r.n = (r.n || 0) + 1;
    r.pid = r.id + "-" + r.n;
    r.phase = phase;
    r.acc = 0; r.covered = 0;
    r.startedAt = at;
    r.resumedAt = run ? at : null;
    r.waiting = !run;
    r.target = r.mode === "stopwatch" ? null : r.mode === "countdown" ? r.target : phaseSecs(prefs(), phase);
    return r;
  }

  /* ---- logging ---- */
  var KIND = { pomodoro: "Pomodoro", countdown: "Timer", stopwatch: "Stopwatch" };
  function text(tag, mode, note) { return [tag || "Timer", note || KIND[mode] || "Timer"].join(" · "); }
  function logBlock(r, secs, end, note) {
    secs = Math.round(secs);
    if (!(secs >= MIN_LOG) || !self.MusicLog || !self.MusicLog.record) return null;
    var covered = Math.min(secs, Math.round((r.covered || 0) / 1000));
    var e = MusicLog.record("timer", { secs: secs, end: end, covered: covered, rid: r.pid, kind: r.mode, tag: r.tag, note: note || "", text: text(r.tag, r.mode, note) });
    var out = { rid: r.pid, secs: secs, tag: r.tag, mode: r.mode, end: end };
    emit({ type: "logged", entry: out });
    return out;
  }
  // Time other tools counted shows up in "covered" when they flush (every 15 s); catch the last bit first.
  function settle() { try { if (self.MusicLog && self.MusicLog.read && !self.MusicLog._q) MusicLog.read(); } catch (e) {} }

  /* ---- actions ---- */
  function start(mode) {
    var p = prefs();
    mode = mode || p.mode;
    var t = now();
    var r = { id: uid(), mode: mode, tag: p.tag, round: 1, n: 0, target: mode === "countdown" ? p.minutes * 60 : null };
    newPhase(r, "focus", t, true);
    save(r);
    prime();
    sync();
    emit({ type: "change" });
    return r;
  }
  function pause() {
    var r = load();
    if (!r || !r.resumedAt) return r;
    r.acc = elapsed(r);
    r.resumedAt = null;
    save(r); sync(); emit({ type: "change" });
    return r;
  }
  function resume() {
    var r = load();
    if (!r || r.resumedAt) return r;
    if (r.waiting) return next();
    r.resumedAt = now();
    save(r); prime(); sync(); emit({ type: "change" });
    return r;
  }
  // Start the phase a pomodoro is waiting on (its break, or its next focus block).
  function next() {
    var r = load();
    if (!r || !r.waiting) return r;
    r.waiting = false; r.resumedAt = now(); r.startedAt = r.resumedAt;
    save(r); prime(); sync(); emit({ type: "change" });
    return r;
  }
  function stop(opts) {
    opts = opts || {};
    settle();
    var r = load();
    if (!r) return null;
    save(null);
    var out = null;
    if (r.phase === "focus" && !r.waiting && !opts.discard) {
      var secs = opts.secs != null ? +opts.secs : elapsed(r) / 1000;
      if (r.target) secs = Math.min(secs, opts.secs != null ? Infinity : r.target);
      out = logBlock(r, secs, now(), opts.note);
    }
    sync(); emit({ type: "change", stopped: true });
    return out;
  }
  // Pomodoro: end this phase now and move to the next one, running. A focus block cut short is
  // logged for as long as it ran.
  function skip() {
    settle();
    var r = load();
    if (!r || r.mode !== "pomodoro") return r;
    var t = now(), logged = null;
    if (r.phase === "focus" && !r.waiting) logged = logBlock(r, elapsed(r, t) / 1000, t);
    var to = following(r);
    newPhase(r, to.phase, t, true);
    r.round = to.round;
    save(r); prime(); sync();
    emit({ type: "change" });
    return logged;
  }
  function following(r) {
    if (r.phase === "focus") return { phase: r.round % prefs().every === 0 ? "long" : "short", round: r.round };
    return { phase: "focus", round: r.round + 1 };
  }
  function setTag(tag) {
    var p = setPrefs({ tag: tag });
    var r = load();
    if (r) { r.tag = p.tag; save(r); emit({ type: "change" }); }
    return p.tag;
  }
  function setMinutes(min) {
    var p = setPrefs({ minutes: min });
    return p.minutes;
  }

  /* ---- a block running out ---- */
  function due(r, t) { return r && r.target && r.resumedAt && !r.waiting && remaining(r, t) <= 0; }
  function tick() {
    if (embedded) return;
    if (!due(load(), now())) return;
    // Two open pages could both notice; the lock makes sure only one finishes it.
    if (navigator.locks && navigator.locks.request) {
      navigator.locks.request("music-timer", { ifAvailable: true }, function (lock) { if (lock) finish(); }).catch(function () { finish(); });
    } else finish();
  }
  function finish() {
    settle();
    var t = now(), r = load(), events = [];
    var guard = 0;
    while (due(r, t) && guard++ < 6) {
      var end = r.resumedAt + (r.target * 1000 - (r.acc || 0));
      var late = t - end;
      var from = { phase: r.phase, mode: r.mode, round: r.round };
      var logged = r.phase === "focus" ? logBlock(r, r.target, end) : null;
      if (r.mode !== "pomodoro") {
        save(null);
        events.push({ type: "phase", from: from, to: null, end: end, late: late, logged: logged });
        r = null;
        break;
      }
      var to = following(r), p = prefs();
      // Never start a focus block on its own while nobody is there; a break may.
      var auto = to.phase === "focus" ? p.autoFocus && late < LATE : p.autoBreak;
      newPhase(r, to.phase, end, auto);
      r.round = to.round;
      save(r);
      events.push({ type: "phase", from: from, to: { phase: r.phase, round: r.round, running: auto }, end: end, late: late, logged: logged });
    }
    if (!events.length) return;
    sync();
    var last = events[events.length - 1];
    if (last.late < LATE) ring(last);
    events.forEach(function (ev) { emit(ev); });
    emit({ type: "change" });
  }
  function ring(ev) {
    var p = prefs();
    var kind = !ev.to ? "done" : ev.to.phase === "focus" ? "focus" : "break";
    if (p.sound) chime(kind);
    try { if (navigator.vibrate) navigator.vibrate(kind === "done" ? [250, 120, 250, 120, 250] : [220, 120, 220]); } catch (e) {}
    if (p.notify && document.visibilityState !== "visible") {
      var title = kind === "done" ? "Timer done" : kind === "break" ? "Focus done" : "Break over";
      var tag = ev.logged ? ev.logged.tag : "";
      var body = ev.logged ? (tag ? tag + " · " : "") + Math.round(ev.logged.secs / 60) + "m logged" : kind === "focus" ? "Time for the next focus block" : "";
      notify(title, body);
    }
  }

  /* ---- sound and notifications ---- */
  var ctx = null;
  function audio() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { ctx = null; }
    return ctx;
  }
  // Called from a tap, so the chime is allowed to play later even with the page in the background.
  function prime() {
    var c = audio();
    if (c && c.state === "suspended") { try { c.resume(); } catch (e) {} }
  }
  function bell(c, f, t, vol) {
    var out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    out.connect(c.destination);
    [[1, 1], [2.756, 0.22], [5.404, 0.07]].forEach(function (h) {
      var o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = f * h[0];
      g.gain.value = h[1];
      o.connect(g); g.connect(out);
      o.start(t); o.stop(t + 1.9);
    });
  }
  function chime(kind) {
    var c = audio();
    if (!c) return;
    try { if (c.state === "suspended") c.resume(); } catch (e) {}
    var t = c.currentTime + 0.05;
    var notes = kind === "break" ? [659.25, 830.61, 987.77] : kind === "focus" ? [987.77, 830.61, 659.25] : [783.99, 987.77, 1174.66, 1567.98];
    var rounds = kind === "done" ? 2 : 1;
    for (var k = 0; k < rounds; k++) notes.forEach(function (f, i) { bell(c, f, t + k * 1.4 + i * 0.2, 0.28); });
  }
  function notify(title, body) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    var opts = { body: body || "", tag: "music-timer", icon: new URL("timer/icon-192.png", ROOT).href, renotify: true };
    var plain = function () { try { new Notification(title, opts); } catch (e) {} };
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg && reg.showNotification) return reg.showNotification(title, opts);
        plain();
      }).catch(plain);
    } else plain();
  }
  function askNotify() {
    if (!("Notification" in window)) return Promise.resolve("unsupported");
    if (Notification.permission !== "default") return Promise.resolve(Notification.permission);
    try { return Promise.resolve(Notification.requestPermission()).then(function (p) { return p || Notification.permission; }); }
    catch (e) { return Promise.resolve("denied"); }
  }

  /* ---- listeners ---- */
  var listeners = [];
  function emit(ev) { listeners.forEach(function (f) { try { f(ev); } catch (e) {} }); }
  window.addEventListener("storage", function (e) {
    if (e.key === KEY || e.key === PREFS || e.key === null) { sync(); emit({ type: "change" }); }
  });

  /* ---- clock: a worker ticks once a second while a block can run out (it is not slowed down
     in a background tab the way page timers are) ---- */
  var worker = null, ivl = 0;
  function sync() {
    if (embedded) return;
    var r = load(), need = !!(r && r.target && r.resumedAt && !r.waiting);
    if (need && !worker && !ivl) {
      try {
        var src = "var i=setInterval(function(){postMessage(0)},1000);onmessage=function(){clearInterval(i)}";
        var url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
        worker = new Worker(url);
        URL.revokeObjectURL(url);
        worker.onmessage = tick;
        worker.onerror = function () { stopClock(); ivl = setInterval(tick, 1000); };
      } catch (e) { worker = null; ivl = setInterval(tick, 1000); }
    } else if (!need) stopClock();
    pill();
  }
  function stopClock() {
    if (worker) { try { worker.postMessage(0); worker.terminate(); } catch (e) {} worker = null; }
    if (ivl) { clearInterval(ivl); ivl = 0; }
  }

  /* ---- format ---- */
  function fmt(ms, up) {
    var s = up ? Math.floor(ms / 1000) : Math.ceil(ms / 1000);
    s = Math.max(0, s);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    return (h ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (x < 10 ? "0" : "") + x;
  }
  function shown(r, t) {
    if (!r) return "";
    if (r.waiting) return fmt(r.target * 1000);
    return r.target ? fmt(remaining(r, t)) : fmt(elapsed(r, t), true);
  }

  /* ---- the pill: a running timer in every other tool's top bar ---- */
  var pillEl = null, pillIvl = 0, styled = false;
  function style() {
    if (styled) return;
    styled = true;
    var css =
      ".mt-pill{display:inline-flex;align-items:center;gap:.4rem;height:2.25rem;padding:0 .75rem 0 .7rem;border-radius:999px;flex:none;" +
      "background:#fff;color:#14171F;box-shadow:0 0 0 1px rgb(20 24 44/.08),0 1px 2px rgb(22 26 52/.06);text-decoration:none;" +
      "font:700 .9375rem/1 -apple-system,BlinkMacSystemFont,'SF Pro Text',system-ui,Roboto,'Segoe UI',sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap;-webkit-tap-highlight-color:transparent}" +
      ".mt-pill:active{transform:scale(.95)}" +
      ".mt-dot{width:.55rem;height:.55rem;border-radius:50%;background:#5B7F12;flex:none}" +
      ".mt-pill[data-phase=break] .mt-dot{background:#2C7BD6}" +
      ".mt-pill[data-state=paused] .mt-dot,.mt-pill[data-state=waiting] .mt-dot{background:#8A90A0}" +
      ".mt-pill[data-state=paused] .mt-t{opacity:.55}" +
      ".mt-pill.mt-float{position:fixed;z-index:2147483000;left:calc(env(safe-area-inset-left,0px) + .75rem);bottom:calc(env(safe-area-inset-bottom,0px) + .75rem)}" +
      "html.mt-has-pill .brand{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      "@media (max-width:26rem){html.mt-has-pill .bar-in > .logo,html.mt-has-pill .brand > .logo{display:none}}" +
      "@media (prefers-color-scheme:dark){:root:not([data-theme=light]) .mt-pill{background:#21242C;color:#ECEEF4;box-shadow:0 0 0 1px rgb(255 255 255/.08)}" +
      ":root:not([data-theme=light]) .mt-dot{background:#9BC25A}:root:not([data-theme=light]) .mt-pill[data-phase=break] .mt-dot{background:#6AA6EA}}" +
      ":root[data-theme=dark] .mt-pill{background:#21242C;color:#ECEEF4;box-shadow:0 0 0 1px rgb(255 255 255/.08)}" +
      ":root[data-theme=dark] .mt-dot{background:#9BC25A}:root[data-theme=dark] .mt-pill[data-phase=break] .mt-dot{background:#6AA6EA}" +
      "@media (prefers-reduced-motion:no-preference){.mt-pill[data-state=waiting] .mt-dot{animation:mt-blink 1.1s ease-in-out infinite}@keyframes mt-blink{50%{opacity:.2}}}";
    var s = document.createElement("style");
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  function visible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }
  function placePill() {
    var btns = document.querySelectorAll("[data-assistant]"), btn = null;
    for (var i = 0; i < btns.length; i++) if (visible(btns[i])) { btn = btns[i]; break; }
    if (btn) {
      if (pillEl.nextSibling !== btn || pillEl.parentNode !== btn.parentNode) {
        unplace();
        btn.parentNode.insertBefore(pillEl, btn);
        // The assistant button is often pushed right with margin-left:auto; the pill takes that over.
        if (btn.style.marginLeft === "auto") { btn.setAttribute("data-mt-ml", "auto"); btn.style.marginLeft = "0"; pillEl.style.marginLeft = "auto"; }
      }
      pillEl.classList.remove("mt-float");
    } else if (!pillEl.classList.contains("mt-float")) {
      unplace();
      pillEl.classList.add("mt-float");
      document.body.appendChild(pillEl);
    }
  }
  function unplace() {
    var moved = document.querySelector("[data-mt-ml]");
    if (moved) { moved.style.marginLeft = moved.getAttribute("data-mt-ml"); moved.removeAttribute("data-mt-ml"); }
    if (pillEl) { pillEl.style.marginLeft = ""; if (pillEl.parentNode) pillEl.parentNode.removeChild(pillEl); }
  }
  function homeTile(r) {
    var a = document.querySelector('a.tile-open[href="timer/"]');
    if (!a) return;
    var n = a.querySelector(".tile-name");
    if (!n) return;
    if (!n.hasAttribute("data-name")) n.setAttribute("data-name", n.textContent);
    n.textContent = r ? shown(r) : n.getAttribute("data-name");
    n.style.fontVariantNumeric = r ? "tabular-nums" : "";
    n.style.fontWeight = r ? "700" : "";
  }
  function pill() {
    if (embedded || onTimer || !document.body) return;
    var r = load();
    if (onHome) { homeTile(r); }
    else if (!r) {
      if (pillEl) { unplace(); pillEl = null; document.documentElement.classList.remove("mt-has-pill"); }
    } else {
      style();
      if (!pillEl) {
        pillEl = document.createElement("a");
        pillEl.className = "mt-pill";
        pillEl.href = new URL("timer/", ROOT).href;
        pillEl.innerHTML = '<span class="mt-dot" aria-hidden="true"></span><span class="mt-t"></span>';
        document.documentElement.classList.add("mt-has-pill");
      }
      placePill();
      pillEl.setAttribute("data-phase", r.phase === "focus" ? "focus" : "break");
      pillEl.setAttribute("data-state", r.waiting ? "waiting" : r.resumedAt ? "running" : "paused");
      pillEl.querySelector(".mt-t").textContent = shown(r);
      pillEl.setAttribute("aria-label", "Timer: " + phaseName(r) + (r.tag ? ", " + r.tag : "") + ", " + shown(r) + (r.waiting ? ", waiting" : r.resumedAt ? "" : ", paused"));
    }
    if (r && !pillIvl) pillIvl = setInterval(pill, 1000);
    else if (!r && pillIvl) { clearInterval(pillIvl); pillIvl = 0; if (onHome) homeTile(null); }
  }

  /* ---- start up ---- */
  if (!embedded) {
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") { tick(); pill(); } });
    window.addEventListener("pageshow", function () { tick(); sync(); });
    // A chime needs an audio context that was started by a tap; any tap on any page will do.
    window.addEventListener("pointerdown", function () { var r = load(); if (r && r.target) prime(); }, { passive: true, capture: true });
    var boot = function () { sync(); tick(); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  }

  self.MusicTimer = {
    version: 1,
    KEY: KEY, PREFS: PREFS, MIN_LOG: MIN_LOG, TAGS: TAGS,
    run: load,
    elapsed: elapsed,
    remaining: remaining,
    phaseName: phaseName,
    prefs: prefs,
    setPrefs: setPrefs,
    setTag: setTag,
    setMinutes: setMinutes,
    start: start, pause: pause, resume: resume, next: next, stop: stop, skip: skip,
    tick: tick,
    prime: prime,
    chime: chime,
    notify: notify,
    askNotify: askNotify,
    color: color,
    text: text,
    fmt: fmt,
    shown: shown,
    on: function (f) { listeners.push(f); }
  };
})();
