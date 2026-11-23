/* Timer: the page for shared/timer.js. Pomodoro, timer and stopwatch; whatever is timed goes into
   the Practice Log with the activity it was for. The timing itself, the chime and the logging live
   in shared/timer.js so they carry on in every other tool. */
(function () {
  "use strict";
  var T = window.MusicTimer, L = window.MusicLog;
  var $ = function (id) { return document.getElementById(id); };
  var body = document.body;
  var C = 2 * Math.PI * 46;
  var PRESETS = [5, 10, 15, 20, 30, 45, 60, 90];
  var LONG = 3 * 3600e3;          // a stopwatch past this asks before logging (left running by mistake?)
  var ui = { editing: false, adding: false, sheet: null, toastT: 0, frame: 0, wl: null };
  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.3v13.4a1 1 0 0 0 1.5.86l11-6.7a1 1 0 0 0 0-1.72l-11-6.7A1 1 0 0 0 8 5.3z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>',
    plus: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>',
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>'
  };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dur(secs) {
    secs = Math.round(secs || 0);
    if (secs < 60) return secs ? "<1m" : "0m";
    var m = Math.round(secs / 60), h = Math.floor(m / 60);
    return h ? h + "h" + (m % 60 ? " " + (m % 60) + "m" : "") : m + "m";
  }
  function clock(t) { return new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function state(r) { return !r ? "idle" : r.waiting ? "waiting" : r.resumedAt ? "running" : "paused"; }
  function mmss(min) { return T.fmt(min * 60000); }

  /* ---------- the dial ---------- */
  // Above the time: the pomodoro's phase; for a timer or stopwatch, what it is timing.
  function label(r, p) {
    if (!r) return p.mode === "pomodoro" ? "Focus" : "";
    if (r.waiting) return "Next: " + T.phaseName(r);
    if (!r.resumedAt) return "Paused";
    return r.mode === "pomodoro" ? T.phaseName(r) : r.tag || T.phaseName(r);
  }
  function idleTime(p) { return p.mode === "pomodoro" ? mmss(p.focus) : p.mode === "countdown" ? mmss(p.minutes) : "0:00"; }
  function paint() {
    var r = T.run(), p = T.prefs(), t = Date.now(), frac;
    var txt = r ? T.shown(r, t) : idleTime(p);
    if (!ui.editing && $("time").textContent !== txt) $("time").textContent = txt;
    if (!r) frac = p.mode === "stopwatch" ? 0 : 1;
    else if (r.waiting) frac = 1;
    else if (r.target) frac = Math.max(0, T.remaining(r, t) / (r.target * 1000));
    else frac = (T.elapsed(r, t) % 60000) / 60000;
    $("prog").style.strokeDashoffset = (C * (1 - frac)).toFixed(2);
    document.title = r ? txt + " · " + (label(r, p) || "Timer") : "Timer";
    if (r && r.target && r.resumedAt && !r.waiting && T.remaining(r, t) <= 0) T.tick();
  }
  function loop() {
    ui.frame = 0;
    paint();
    var r = T.run();
    if (r && r.resumedAt && document.visibilityState === "visible") ui.frame = requestAnimationFrame(loop);
  }
  function animate() { if (!ui.frame) ui.frame = requestAnimationFrame(loop); }

  function render() {
    var p = T.prefs(), r = T.run(), st = state(r), mode = r ? r.mode : p.mode;
    ["idle", "live", "paused", "waiting"].forEach(function (c) { body.classList.toggle(c, c === "live" ? !!r : c === st); });
    body.setAttribute("data-ph", r && r.phase !== "focus" ? "break" : "focus");

    Array.prototype.forEach.call(document.querySelectorAll(".mode"), function (b) { b.setAttribute("aria-pressed", String(b.dataset.mode === mode)); });
    $("phase").textContent = label(r, p);
    var tagged = !!(r && r.mode !== "pomodoro" && r.resumedAt);
    $("phase").classList.toggle("tagged", tagged);
    $("phase").style.setProperty("--tc", tagged ? T.color(r.tag) : "");
    var tb = $("time");
    tb.disabled = !!r || mode === "stopwatch";
    tb.setAttribute("aria-label", r ? label(r, p) + " " + T.shown(r) : mode === "stopwatch" ? "Stopwatch" : "Minutes, " + (mode === "pomodoro" ? p.focus : p.minutes) + ". Change");

    // Pomodoro rounds: one dot per focus block before the long break.
    var dots = "";
    if (mode === "pomodoro") {
      var every = p.every, round = r ? r.round : 1, inCycle = ((round - 1) % every);
      var done = !r ? 0 : r.phase === "focus" ? inCycle : inCycle + 1;
      for (var i = 0; i < every; i++) dots += '<i class="' + (i < done ? "on" : r && r.phase === "focus" && i === inCycle ? "now" : "") + '"></i>';
    }
    $("dots").innerHTML = dots;

    var pre = $("presets");
    pre.hidden = !!r || mode !== "countdown";
    if (!pre.hidden) pre.innerHTML = PRESETS.map(function (m) {
      return '<button class="chip" type="button" data-min="' + m + '" aria-pressed="' + (p.minutes === m) + '">' + m + "</button>";
    }).join("");

    var go = $("go");
    go.innerHTML = st === "running" ? ICON.pause : ICON.play;
    go.setAttribute("aria-label", st === "idle" ? "Start" : st === "running" ? "Pause" : st === "paused" ? "Resume" : "Start " + T.phaseName(r).toLowerCase());
    $("stop").classList.toggle("ghost", !r);
    $("stop").setAttribute("aria-label", r && r.phase === "focus" && !r.waiting ? "Stop and log" : "Stop");
    $("skip").classList.toggle("ghost", !(r && r.mode === "pomodoro" && !(r.waiting && r.phase === "focus")));

    if (!ui.adding) renderTags(p, r);
    renderToday();
    wake(!!(p.awake && r && r.target && (st === "running" || st === "waiting")));
    paint();
    animate();
  }

  /* ---------- activities ---------- */
  function renderTags(p, r) {
    var cur = r ? r.tag : p.tag, list = p.tags.slice();
    if (cur && list.indexOf(cur) < 0) list.push(cur);
    var html = list.map(function (t) {
      return '<button class="tag" type="button" data-tag="' + esc(t) + '" aria-pressed="' + (t === cur) + '" style="--c:' + T.color(t) + '"><span class="dot"></span>' + esc(t) + "</button>";
    }).join("");
    html += ui.adding ? '<input class="tag-in" id="tag-in" type="text" maxlength="40" placeholder="Activity" aria-label="New activity" enterkeyhint="done">'
      : '<button class="tag add" type="button" id="tag-add" aria-label="Add an activity">' + ICON.plus + "</button>";
    $("tags").innerHTML = html;
    if (ui.adding) { var inp = $("tag-in"); inp.focus(); inp.addEventListener("keydown", function (e) { if (e.key === "Enter") inp.blur(); if (e.key === "Escape") { inp.value = ""; inp.blur(); } }); inp.addEventListener("blur", function () { addTag(inp.value); ui.adding = false; render(); }); }
  }
  function addTag(v) {
    v = String(v || "").trim().slice(0, 40);
    if (!v) return;
    var p = T.prefs(), tags = p.tags.slice();
    var same = tags.filter(function (t) { return t.toLowerCase() === v.toLowerCase(); })[0];
    if (!same) { tags.push(v); T.setPrefs({ tags: tags }); }
    T.setTag(same || v);
  }
  $("tags").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.id === "tag-add") { ui.adding = true; renderTags(T.prefs(), T.run()); return; }
    if (b.dataset.tag) { T.setTag(b.dataset.tag); render(); }
  });

  /* ---------- today ---------- */
  function entries(from) {
    var d = L && L.read ? L.read() : { sessions: [] }, out = [];
    d.sessions.forEach(function (s) { (s.events || []).forEach(function (e) { if (e.app === "timer" && e.rid && e.end >= from) out.push(e); }); });
    return out.sort(function (a, b) { return b.end - a.end; });
  }
  function find(rid) { return entries(0).filter(function (e) { return e.rid === rid; })[0] || null; }
  function renderToday() {
    var list = entries(today()), box = $("today");
    box.hidden = !list.length;
    if (!list.length) { box.innerHTML = ""; return; }
    var tot = list.reduce(function (n, e) { return n + (e.secs || 0); }, 0);
    box.innerHTML = '<div class="row"><h2>Today</h2><span class="tot">' + dur(tot) + '</span></div><div class="ents">' + list.map(function (e) {
      var name = [e.tag, e.note || ({ pomodoro: "Pomodoro", countdown: "Timer", stopwatch: "Stopwatch" })[e.kind]].filter(Boolean).join(" · ");
      return '<button class="ent" type="button" data-rid="' + esc(e.rid) + '" style="--c:' + T.color(e.tag) + '"><span class="dot"></span><span class="x">' + esc(name) + '</span><span class="d">' + dur(e.secs) + '</span><span class="w">' + clock(e.end) + "</span></button>";
    }).join("") + "</div>";
  }
  $("today").addEventListener("click", function (e) {
    var b = e.target.closest("[data-rid]");
    if (b) openEdit(b.dataset.rid);
  });

  /* ---------- controls ---------- */
  $("go").addEventListener("click", function () {
    T.prime();
    var r = T.run(), st = state(r);
    if (st === "idle") T.start(T.prefs().mode);
    else if (st === "running") T.pause();
    else if (st === "paused") T.resume();
    else T.next();
    render();
  });
  $("stop").addEventListener("click", function () {
    var r = T.run();
    if (!r) return;
    var ms = T.elapsed(r);
    if (r.mode === "stopwatch" && ms > LONG) { openSave(r); return; }
    var logged = T.stop();
    if (!logged && r.phase === "focus" && !r.waiting) toast("Under a minute · not logged");
    render();
  });
  $("skip").addEventListener("click", function () { T.skip(); render(); });
  $("modes").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]");
    if (!b || T.run()) return;
    T.setPrefs({ mode: b.dataset.mode });
    ui.editing = false;
    render();
  });
  $("presets").addEventListener("click", function (e) {
    var b = e.target.closest("[data-min]");
    if (!b) return;
    T.setMinutes(+b.dataset.min);
    render();
  });

  // Tap the time to type the minutes (Timer: its length; Pomodoro: the focus block).
  $("time").addEventListener("click", function () {
    var p = T.prefs();
    if (T.run() || p.mode === "stopwatch") return;
    ui.editing = true;
    var inp = $("time-in");
    inp.value = p.mode === "pomodoro" ? p.focus : p.minutes;
    $("time").hidden = true; inp.hidden = false;
    inp.focus(); inp.select();
  });
  function endEdit(keep) {
    if (!ui.editing) return;
    var inp = $("time-in"), v = Math.round(+inp.value);
    ui.editing = false;
    inp.hidden = true; $("time").hidden = false;
    if (keep && v > 0) {
      if (T.prefs().mode === "pomodoro") T.setPrefs({ focus: v }); else T.setMinutes(v);
    }
    render();
  }
  $("time-in").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); endEdit(true); }
    if (e.key === "Escape") endEdit(false);
  });
  $("time-in").addEventListener("blur", function () { endEdit(true); });

  /* ---------- toast ---------- */
  function toast(msg, acts) {
    var el = $("toast");
    clearTimeout(ui.toastT);
    el.innerHTML = '<span class="m">' + esc(msg) + "</span>" + (acts || []).map(function (a, i) { return '<button type="button" data-i="' + i + '">' + esc(a.label) + "</button>"; }).join("");
    el.hidden = false;
    el.onclick = function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      el.hidden = true;
      acts[+b.dataset.i].fn();
    };
    ui.toastT = setTimeout(function () { el.hidden = true; }, acts && acts.length ? 7000 : 3000);
  }
  function loggedToast(en) {
    var late = Date.now() - en.end > 60e3;
    toast("Logged " + dur(en.secs) + (en.tag ? " · " + en.tag : "") + (late ? " · ended " + clock(en.end) : ""), [
      { label: "Undo", fn: function () { L.unrecord(en.rid); toast("Removed from the log"); render(); } },
      { label: "Edit", fn: function () { openEdit(en.rid); } }
    ]);
  }

  /* ---------- sheets ---------- */
  function openSheet(html, bind) {
    var sh = $("sheet");
    sh.innerHTML = html;
    $("scrim").hidden = false;
    body.classList.add("locked");
    ui.sheet = true;
    sh.focus();
    bind(sh);
  }
  function closeSheet() {
    $("scrim").hidden = true;
    body.classList.remove("locked");
    $("sheet").innerHTML = "";
    ui.sheet = null;
    if (ui.back) goBack();
  }
  /* Practice Log links here to add time (#add) or change a block (#edit=<id>), with back=log so
     closing the sheet goes straight back there. */
  function route() {
    var h = location.hash.slice(1);
    if (!h) return;
    var q = {};
    h.split("&").forEach(function (kv) { var i = kv.indexOf("="); q[i < 0 ? kv : kv.slice(0, i)] = i < 0 ? "1" : decodeURIComponent(kv.slice(i + 1)); });
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    ui.back = q.back === "log" ? "log" : null;
    if (q.add) openEntry(null);
    else if (q.edit && find(q.edit)) openEntry(find(q.edit));
    else if (ui.back) goBack();
  }
  function goBack() {
    ui.back = null;
    var ref = "";
    try { ref = new URL(document.referrer).pathname; } catch (e) {}
    if (/\/log\/(index\.html)?$/.test(ref) && history.length > 1) history.back();
    else location.replace("../log/");
  }
  $("scrim").addEventListener("click", function (e) { if (e.target === $("scrim")) closeSheet(); });
  function closeBtn() { return '<button class="icon-btn" type="button" data-close aria-label="Close">' + ICON.x + "</button>"; }
  function tagSeg(cur) {
    var list = T.prefs().tags.slice();
    if (cur && list.indexOf(cur) < 0) list.push(cur);
    return '<div class="seg" role="group" aria-label="Activity">' + list.map(function (t) {
      return '<button class="tag" type="button" data-pick="' + esc(t) + '" aria-pressed="' + (t === cur) + '" style="--c:' + T.color(t) + '"><span class="dot"></span>' + esc(t) + "</button>";
    }).join("") + "</div>";
  }
  function bindPick(sh, onPick) {
    sh.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pick]");
      if (!b) return;
      Array.prototype.forEach.call(sh.querySelectorAll("[data-pick]"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      onPick(b.dataset.pick);
    });
  }
  function entryForm(min, tag, note) {
    return '<div class="sec"><div class="fields"><label class="field"><span>Minutes</span><input id="f-min" type="number" inputmode="numeric" min="1" max="1440" value="' + min + '"></label></div></div>' +
      '<div class="sec"><h3>Activity</h3>' + tagSeg(tag) + "</div>" +
      '<div class="sec"><h3>Note</h3><input class="in" id="f-note" type="text" maxlength="120" value="' + esc(note || "") + '" placeholder="What you worked on" enterkeyhint="done"></div>';
  }

  /* ---------- add time by hand, or change a logged block ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(t) { var d = new Date(t); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function hm(t) { var d = new Date(t); return pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function parseAt(day, at) {
    var a = String(day || "").split("-"), b = String(at || "").split(":");
    if (a.length < 3 || b.length < 2) return NaN;
    return new Date(+a[0], +a[1] - 1, +a[2], +b[0], +b[1], 0, 0).getTime();
  }
  function dayWord(t) {
    var d = new Date(t); d.setHours(0, 0, 0, 0);
    var diff = Math.round((today() - d.getTime()) / 864e5);
    return diff === 0 ? "" : diff === 1 ? "yesterday" : new Date(t).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  var QUICK = [15, 30, 45, 60, 90, 120];
  function qlabel(m) { return m < 60 ? m + "m" : Math.floor(m / 60) + "h" + (m % 60 ? " " + (m % 60) + "m" : ""); }

  // e: a logged block to change, or null to add time.
  function openEntry(e) {
    var isNew = !e, p = T.prefs(), r = T.run();
    var tag = e ? e.tag || p.tag : r ? r.tag : p.tag;
    var secs0 = e ? e.secs : 1800, end = e ? e.end : Date.now();
    var timeSet = false, durSet = false;
    // Changing the length of time added by hand keeps when it started; a timer block keeps when it ended.
    var keepStart = !isNew && e.kind === "manual";
    var m0 = Math.round(secs0 / 60);
    openSheet('<div class="sheet-head"><h2>' + (isNew ? "Add time" : "Edit") + "</h2>" + closeBtn() + "</div>" +
      '<div class="sec"><div class="fields two">' +
        '<label class="field"><span>Hours</span><input id="f-h" type="number" inputmode="numeric" min="0" max="24" value="' + Math.floor(m0 / 60) + '"></label>' +
        '<label class="field"><span>Minutes</span><input id="f-m" type="number" inputmode="numeric" min="0" max="600" value="' + (m0 % 60) + '"></label></div>' +
        '<div class="seg" id="f-quick">' + QUICK.map(function (m) { return '<button class="chip" type="button" data-q="' + m + '" aria-pressed="' + (m === m0) + '">' + qlabel(m) + "</button>"; }).join("") + "</div></div>" +
      '<div class="sec"><div class="fields two">' +
        '<label class="field"><span>Day</span><input id="f-day" type="date" max="' + ymd(Date.now()) + '"></label>' +
        '<label class="field"><span>Started</span><input id="f-at" type="time"></label></div></div>' +
      '<div class="sec"><h3>Activity</h3>' + tagSeg(tag) + "</div>" +
      '<div class="sec"><h3>Note</h3><input class="in" id="f-note" type="text" maxlength="120" value="' + esc((e && e.note) || "") + '" placeholder="What you worked on" enterkeyhint="done"></div>' +
      '<p class="err" id="f-err" role="alert" hidden></p>' +
      '<div class="acts">' + (isNew ? "" : '<button class="btn warn" type="button" id="f-del">Delete</button>') + '<span class="sp"></span><button class="btn solid" type="button" id="f-save">' + (isNew ? "Add" : "Save") + "</button></div>", function (sh) {
      var total = function () { return Math.round((Math.max(0, +$("f-h").value || 0) * 60 + Math.max(0, +$("f-m").value || 0)) * 60); };
      // Until the start is changed by hand, it follows the length: the block ends now (or where it ended).
      var follow = function () {
        if (timeSet) return;
        var st = keepStart ? e.t : end - (durSet ? total() : secs0) * 1000;
        $("f-day").value = ymd(st); $("f-at").value = hm(st);
      };
      var marks = function () {
        var m = Math.round(total() / 60);
        Array.prototype.forEach.call(sh.querySelectorAll("[data-q]"), function (b) { b.setAttribute("aria-pressed", String(+b.dataset.q === m)); });
      };
      follow();
      bindPick(sh, function (t) { tag = t; });
      sh.querySelector("[data-close]").onclick = closeSheet;
      ["f-h", "f-m"].forEach(function (id) { $(id).addEventListener("input", function () { durSet = true; follow(); marks(); }); });
      ["f-day", "f-at"].forEach(function (id) { $(id).addEventListener("input", function () { timeSet = true; }); });
      $("f-quick").addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-q]");
        if (!b) return;
        var m = +b.dataset.q;
        $("f-h").value = Math.floor(m / 60); $("f-m").value = m % 60;
        durSet = true; follow(); marks();
      });
      var fail = function (msg) { $("f-err").textContent = msg; $("f-err").hidden = false; };
      if (!isNew) $("f-del").onclick = function () { L.unrecord(e.rid); closeSheet(); toast("Removed from the log"); render(); };
      $("f-save").onclick = function () {
        var secs = durSet ? total() : secs0;
        if (secs < 60) return fail("Add at least a minute.");
        var start = timeSet ? parseAt($("f-day").value, $("f-at").value) : keepStart ? e.t : end - secs * 1000;
        if (!isFinite(start)) return fail("Pick a day and a start time.");
        if (start + secs * 1000 > Date.now() + 60e3) return fail("That would end after now.");
        var note = $("f-note").value.trim();
        if (isNew) {
          var added = T.add({ secs: secs, start: start, tag: tag, note: note });
          closeSheet(); render();
          if (added) { var w = dayWord(start); toast("Added " + dur(secs) + " · " + tag + (w ? " · " + w : ""), [{ label: "Undo", fn: function () { L.unrecord(added.rid); toast("Removed from the log"); render(); } }]); }
        } else {
          var patch = { secs: secs, tag: tag, note: note, text: T.text(tag, e.kind, note) };
          if (timeSet || keepStart) patch.start = start;
          L.amend(e.rid, patch);
          closeSheet(); render();
        }
      };
    });
  }
  function openEdit(rid) { var e = find(rid); if (e) openEntry(e); }
  $("add-btn").addEventListener("click", function () { openEntry(null); });

  // A stopwatch that ran for hours: probably left on. Ask how much of it to log.
  function openSave(r) {
    var tag = r.tag;
    openSheet('<div class="sheet-head"><h2>Log ' + esc(dur(T.elapsed(r) / 1000)) + "?</h2>" + closeBtn() + "</div>" + entryForm(Math.round(T.elapsed(r) / 60000), tag, "") +
      '<div class="acts"><button class="btn warn" type="button" id="f-del">Don\'t log</button><span class="sp"></span><button class="btn solid" type="button" id="f-save">Log</button></div>', function (sh) {
      bindPick(sh, function (t) { tag = t; });
      sh.querySelector("[data-close]").onclick = closeSheet;
      $("f-del").onclick = function () { T.stop({ discard: true }); closeSheet(); render(); };
      $("f-save").onclick = function () {
        var min = Math.max(1, Math.round(+$("f-min").value || 0));
        if (tag !== T.run().tag) T.setTag(tag);
        T.stop({ secs: min * 60, note: $("f-note").value.trim() });
        closeSheet(); render();
      };
    });
  }

  function sw(id, on, text) { return '<div class="sw-row"><span>' + text + '</span><button class="sw" type="button" role="switch" id="' + id + '" aria-checked="' + !!on + '" aria-label="' + esc(text) + '"></button></div>'; }
  function openSettings() {
    var p = T.prefs();
    var canNotify = "Notification" in window;
    var field = function (id, lab, v, max) { return '<label class="field"><span>' + lab + '</span><input id="' + id + '" type="number" inputmode="numeric" min="1" max="' + max + '" value="' + v + '"></label>'; };
    var tags = function () {
      var list = T.prefs().tags;
      return list.map(function (t) {
        return '<span class="tag" style="--c:' + T.color(t) + '"><span class="dot"></span>' + esc(t) + (list.length > 1 ? '<button class="x" type="button" data-del="' + esc(t) + '" aria-label="Remove ' + esc(t) + '">' + ICON.x + "</button>" : "") + "</span>";
      }).join("");
    };
    openSheet('<div class="sheet-head"><h2>Settings</h2>' + closeBtn() + "</div>" +
      '<div class="sec"><h3>Pomodoro</h3><div class="fields four">' + field("s-focus", "Focus", p.focus, 180) + field("s-short", "Break", p.short, 60) + field("s-long", "Long break", p.long, 90) + field("s-every", "Rounds", p.every, 12) + "</div></div>" +
      '<div class="sec">' + sw("s-ab", p.autoBreak, "Start breaks on their own") + sw("s-af", p.autoFocus, "Start focus on its own") + sw("s-sound", p.sound, "Sound") + sw("s-awake", p.awake, "Keep screen on") +
        (canNotify ? sw("s-notify", p.notify && Notification.permission === "granted", "Notifications") + '<p class="note" id="s-nmsg" hidden></p>' : "") + "</div>" +
      '<div class="sec"><h3>Activities</h3><div class="taglist" id="s-tags">' + tags() + '</div><div class="add-row"><input class="in" id="s-tag" type="text" maxlength="40" placeholder="New activity" enterkeyhint="done"><button class="btn" type="button" id="s-add">Add</button></div></div>', function (sh) {
      sh.querySelector("[data-close]").onclick = closeSheet;
      [["s-focus", "focus"], ["s-short", "short"], ["s-long", "long"], ["s-every", "every"]].forEach(function (f) {
        $(f[0]).addEventListener("change", function () { var o = {}; o[f[1]] = $(f[0]).value; var q = T.setPrefs(o); $(f[0]).value = q[f[1]]; render(); });
      });
      var flip = function (id, key, fn) {
        $(id).onclick = function () {
          var on = $(id).getAttribute("aria-checked") !== "true";
          if (fn) return fn(on);
          $(id).setAttribute("aria-checked", String(on));
          var o = {}; o[key] = on; T.setPrefs(o); render();
        };
      };
      flip("s-ab", "autoBreak"); flip("s-af", "autoFocus"); flip("s-awake", "awake");
      flip("s-sound", "sound", function (on) { $("s-sound").setAttribute("aria-checked", String(on)); T.setPrefs({ sound: on }); if (on) { T.prime(); T.chime("break"); } });
      if (canNotify) flip("s-notify", "notify", function (on) {
        if (!on) { $("s-notify").setAttribute("aria-checked", "false"); T.setPrefs({ notify: false }); return; }
        T.askNotify().then(function (perm) {
          var ok = perm === "granted";
          $("s-notify").setAttribute("aria-checked", String(ok));
          T.setPrefs({ notify: ok });
          var m = $("s-nmsg");
          if (m) { m.hidden = ok; m.textContent = ok ? "" : "Notifications are blocked for Music in this browser's settings."; }
        });
      });
      var add = function () { var v = $("s-tag").value; $("s-tag").value = ""; if (v.trim()) { addTag(v); $("s-tags").innerHTML = tags(); render(); } };
      $("s-add").onclick = add;
      $("s-tag").addEventListener("keydown", function (e) { if (e.key === "Enter") add(); });
      $("s-tags").addEventListener("click", function (e) {
        var b = e.target.closest("[data-del]");
        if (!b) return;
        var q = T.prefs(), list = q.tags.filter(function (t) { return t !== b.dataset.del; });
        if (!list.length) return;
        T.setPrefs({ tags: list, tag: q.tag === b.dataset.del ? list[0] : q.tag });
        $("s-tags").innerHTML = tags();
        render();
      });
    });
  }
  $("set-btn").addEventListener("click", openSettings);

  /* ---------- screen on while a block counts down ---------- */
  function wake(on) {
    if (on && !ui.wl && navigator.wakeLock && navigator.wakeLock.request && document.visibilityState === "visible") {
      ui.wl = "pending";
      navigator.wakeLock.request("screen").then(function (w) {
        ui.wl = w;
        w.addEventListener("release", function () { if (ui.wl === w) ui.wl = null; });
        if (!want()) { try { w.release(); } catch (e) {} }
      }).catch(function () { ui.wl = null; });
    } else if (!on && ui.wl && ui.wl !== "pending") {
      try { ui.wl.release(); } catch (e) {}
      ui.wl = null;
    }
  }
  function want() { var p = T.prefs(), r = T.run(); return !!(p.awake && r && r.target && (r.resumedAt || r.waiting)); }

  /* ---------- wiring ---------- */
  T.on(function (ev) {
    if (ev.type === "logged") loggedToast(ev.entry);
    if (ev.type === "change" || ev.type === "phase") render();
  });
  if (L && L.onChange) L.onChange(function () { if (!ui.sheet) renderToday(); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") { T.tick(); render(); } });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && ui.sheet) { closeSheet(); return; }
    var tag = e.target && e.target.tagName;
    if (e.key === " " && !ui.sheet && tag !== "INPUT" && tag !== "BUTTON" && tag !== "TEXTAREA") { e.preventDefault(); $("go").click(); }
  });

  window.__timerContext = function () {
    var r = T.run(), p = T.prefs();
    var tot = entries(today()).reduce(function (n, e) { return n + (e.secs || 0); }, 0);
    var out = "In Timer (pomodoro, timer and stopwatch; focus time goes to the Practice Log with an activity).";
    if (r) out += " " + ({ pomodoro: "Pomodoro", countdown: "Timer", stopwatch: "Stopwatch" })[r.mode] + " " + state(r) + ": " + T.phaseName(r) + ", " + T.shown(r) + (r.target ? " left" : "") + ", activity " + r.tag + ".";
    else out += " Not running. Mode " + p.mode + ", activity " + p.tag + ".";
    return out + " Timed today: " + dur(tot) + ".";
  };

  render();
  route();
  window.addEventListener("hashchange", route);
})();
