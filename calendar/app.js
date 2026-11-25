/* Calendar: the home screen's second tab (index.html loads this file and calls MusicCalendar.mount).

   A month at a time, Sunday first, in one of two views (Schedule | Activity, remembered):

   Schedule: the School term tinted with its school week numbers down the side and the current week
   in bold, as School's own Overview calendar drew it (that calendar lives here now). Each day
   carries a dot for what School has scheduled on it; tapping a day lists those below the month,
   and each one opens in School.

   Activity: the Practice Log (it used to be a page of its own, log/, which now just forwards
   here). Each day is shaded by how long was practiced and shows its time. Under the month, what
   to add up: Day (the one tapped), Week, Month (the one on screen), All, or a Range (two taps).
   For that span: the total, daily average and streak, a chart that fits it (a day's timeline, a
   bar per day, a bar per week over long ranges, a half-year of squares for All), time by tool,
   the Timer's blocks by activity, and the sessions themselves, newest first: each opens to show
   everything that was done and to delete it, and a Timer block opens in the Timer to change.
   With an account, other devices' practice is fetched (MusicLog.sync) at most every 5 minutes.

   Where School's schedule comes from
     School keeps its scheduling to itself: lesson days, homework and tests, first quizzes and
     course starts are all worked out by its app.js (school-src/Machine/Scripts/school-artifact/).
     So this tab asks School rather than working it out a second time. It opens school/index.html out of
     sight with ?bridge=1 (School's own mode for being opened by another tool: it never touches the
     address, the history or the route School reopens on, and the Practice Log never counts it), and
     reads the Overview School draws, the same way School's Google Calendar sync reads it:
       - Schedule: one row per day, `.tl > .tl-d[data-date]`, holding that day's chips; the
         Overdue band `.tl > .tl-late`; the Completed lessons under it (`.tl-drow`, "Nov 20").
       - The term: the month grids of School's Overview calendar section (`.cal .cmo`, in-term
         days marked `.in`), which School draws only in this bridge copy now that its calendar
         lives here.
     What was read is kept under calendar:school, so the tab opens at once. School is read again
     when its saved progress changed, on a new day, after a few hours, or with the refresh in the
     day's list. Signed in, School may pull newer progress from the account after it first draws,
     so the frame is watched for a few more seconds and read again whenever it redraws.

   Saved on this device: calendar:prefs {mode, scope}, calendar:school (the last read of School).
   The practice itself is shared/log.js's (log:v1). */
(function () {
  "use strict";
  var PREFS = "calendar:prefs", SNAP = "calendar:school", V = 1;
  var STALE = 3 * 3600e3;            // read School again after this long even if nothing changed here
  var LOAD_LIMIT = 30000;            // give up on School's frame after this long
  var SETTLE = 8000;                 // signed in: keep reading School's redraws for this long
  var LOG_SYNC = 5 * 60e3;           // fetch other devices' practice at most this often
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var KIND = { lesson: "Lesson", homework: "Homework", quiz: "Quiz", test: "Test", start: "Starts", retake: "Retake", teacher: "Lesson", done: "Completed", other: "" };

  /* ---------- small helpers ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsJson(k) { try { return JSON.parse(lsGet(k) || "null"); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function txt(n) { return n ? n.textContent.replace(/\s+/g, " ").trim() : ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  // Dates are local calendar days, written YYYY-MM-DD, the same as School writes them.
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s) { var p = String(s).split("-").map(Number); return new Date(p[0], (p[1] || 1) - 1, p[2] || 1); }
  function add(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diff(a, b) { var x = parse(a), y = parse(b); return Math.round((Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()) - Date.UTC(y.getFullYear(), y.getMonth(), y.getDate())) / 864e5); }
  function today() { return iso(new Date()); }
  function monthOf(s) { var d = parse(s); return new Date(d.getFullYear(), d.getMonth(), 1); }
  function dur(secs) {
    secs = Math.round(secs || 0);
    if (secs < 60) return secs ? "<1m" : "0m";
    var m = Math.round(secs / 60), h = Math.floor(m / 60);
    return h ? h + "h" + (m % 60 ? " " + (m % 60) + "m" : "") : m + "m";
  }
  // Short enough for a day cell: 45m, 1h5, 2h.
  function durShort(secs) {
    var m = Math.round((secs || 0) / 60), h = Math.floor(m / 60);
    if (m < 1) return "<1m";
    return h ? h + "h" + (m % 60 ? m % 60 : "") : m + "m";
  }
  function clock(t) { return new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }
  function longDay(s) { return parse(s).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" }); }
  function shortDay(s) { return parse(s).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }); }

  var APPS = {};
  ((self.MUSIC && self.MUSIC.apps) || []).forEach(function (a) { APPS[a.id] = a; });
  function appName(id) { return (APPS[id] && APPS[id].name) || (id ? id.charAt(0).toUpperCase() + id.slice(1) : "Other"); }
  function appColor(id) { return (APPS[id] && APPS[id].color) || "#8A90A0"; }

  /* ---------- state ---------- */
  var S = {
    root: null, shown: false,
    month: monthOf(today()), sel: today(),
    mode: "schedule", scope: "week", range: null, picking: null,   // Activity: what to add up
    open: {}, confirm: null, days: 10,                              // Activity: sessions opened, delete asked, days listed
    snap: null, loading: false, failed: false,
    logSyncAt: 0, openedDay: today()
  };
  (function () {
    var p = lsJson(PREFS) || {};
    S.mode = p.mode === "activity" || (!p.mode && p.activity) ? "activity" : "schedule";
    if (/^(day|week|month|all)$/.test(p.scope)) S.scope = p.scope;
  })();
  (function () { var s = lsJson(SNAP); if (s && s.v === V) S.snap = s; })();

  /* ---------- School ---------- */
  // A cheap fingerprint of School's saved progress: when it changes, School's schedule may have too.
  function progressSig() {
    var t = lsGet("school:progress") || "", h = 5381;
    for (var i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
    return t.length + ":" + (h >>> 0).toString(36);
  }
  function stale(s) {
    return !s || s.v !== V || s.day !== today() || s.sig !== progressSig() || Date.now() - (s.at || 0) > STALE;
  }

  // One chip from School's Schedule, as plain data.
  function chip(b) {
    var d = b.dataset, cl = b.classList, k = txt(b.querySelector(".tl-k")), tip = b.getAttribute("title") || "";
    var kind = cl.contains("tl-xl") ? "teacher"
      : cl.contains("tl-l") ? "lesson"
      : d.courseStart ? "start"
      : d.drillMiss ? "retake"
      : d.hwOpen != null || /homework/i.test(k) ? "homework"
      : d.drillQuiz != null || /quiz/i.test(k) ? "quiz"
      : /test/i.test(k) ? "test" : "other";
    var name = txt(b.querySelector(".tl-n")) || txt(b.querySelector(".tl-t")) || k;
    var sub = txt(b.querySelector(".tl-s"));
    var parts = tip.split(" · ");
    var cls = d.classShort || (kind === "lesson" ? k : kind === "teacher" || parts.length < 2 ? "" : parts[parts.length - 1]);
    var route = d.hwOpen ? "homework:" + d.hwOpen
      : d.courseLesson ? "course:" + d.courseLesson.split(":")[0]
      : d.course ? "course:" + d.course
      : (d.drillQuiz != null || d.drillMiss) ? "drill"
      : d.nav || "overview";
    var it = { kind: kind, name: name, dom: d.domain || "" , route: route };
    if (kind === "start") it.name = d.courseShort || name.replace(/^Course \S+ · /, "");
    if (sub) it.sub = sub;
    if (cls) it.cls = cls;
    if (/↻/.test(k)) it.label = k.replace(/↻\s*/, "");
    var until = /open through (\d{4}-\d\d-\d\d)/.exec(tip);
    if (until) it.until = until[1];
    var st = cl.contains("late") ? "late" : cl.contains("done") ? "done" : cl.contains("pend") ? "pending" : "";
    if (st) it.state = st;
    return it;
  }
  // "Nov 20" from School's Completed list, which leaves the year off: the latest such day not after today.
  function pastDay(s, now) {
    var m = /([A-Za-z]{3})\s+(\d{1,2})/.exec(s || "");
    if (!m || MON.indexOf(m[1]) < 0) return "";
    var y = parse(now).getFullYear(), d = iso(new Date(y, MON.indexOf(m[1]), +m[2]));
    return d > now ? iso(new Date(y - 1, MON.indexOf(m[1]), +m[2])) : d;
  }
  // The term, from the month grids School draws: every in-term day of the months it shows.
  function readTerm(doc, now) {
    var days = [], year = parse(now).getFullYear();
    Array.prototype.forEach.call(doc.querySelectorAll(".cal .cmo"), function (mo) {
      var m = /([A-Za-z]+)\s*(\d{4})?/.exec(txt(mo.querySelector(".cmo-h")));
      var mi = m ? MONTHS.indexOf(m[1]) : -1;
      if (mi < 0) return;
      var y = m[2] ? +m[2] : year, n = 0;   // School names the year only when it isn't this one
      Array.prototype.forEach.call(mo.querySelectorAll(".cd:not(.out)"), function (c) {
        n++;
        if (c.classList.contains("in")) days.push(iso(new Date(y, mi, n)));
      });
    });
    if (!days.length) return null;
    days.sort();
    var start = days[0], end = days[days.length - 1];
    return { start: start, end: end, weeks: Math.max(1, Math.round((diff(end, start) + 1) / 7)) };
  }
  function readSchool(doc) {
    var now = today(), items = [], overdue = [], more = 0;
    Array.prototype.forEach.call(doc.querySelectorAll(".tl > .tl-d[data-date]"), function (row) {
      var date = row.getAttribute("data-date");
      Array.prototype.forEach.call(row.querySelectorAll("button.tl-lnh, button.tl-i"), function (b) {
        if (b.classList.contains("tl-more")) { more += +((/\+(\d+)/.exec(txt(b)) || [])[1] || 0); return; }
        var it = chip(b); it.date = date; items.push(it);
      });
    });
    Array.prototype.forEach.call(doc.querySelectorAll(".tl > .tl-late button.tl-i"), function (b) {
      if (b.classList.contains("tl-more")) { more += +((/\+(\d+)/.exec(txt(b)) || [])[1] || 0); return; }
      overdue.push(chip(b));
    });
    // Lessons already finished, on the day they were finished: School's Completed list.
    Array.prototype.forEach.call(doc.querySelectorAll(".tl-done .tl-drow"), function (row) {
      var date = pastDay(txt(row.querySelector(".tl-dh em")), now), les = row.querySelector("button.tl-l");
      if (!date) return;
      items.push({ kind: "done", date: date, name: txt(row.querySelector(".tl-dh b")), sub: txt(row.querySelector(".tl-dh span")) || undefined,
        dom: row.getAttribute("data-domain") || "", route: les && les.dataset.course ? "course:" + les.dataset.course : "overview", state: "done" });
    });
    return { term: readTerm(doc, now), items: items, overdue: overdue, more: more };
  }

  var job = null;
  function refresh(force) {
    if (job || !S.root) return;
    if (!force && !stale(S.snap)) return;
    S.loading = true; S.failed = false; render();
    var frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1; frame.title = "School schedule";
    frame.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
    var started = Date.now(), poll = 0, quiet = 0, end = 0, obs = null, ok = false;
    job = { frame: frame };
    function take(doc) {
      var r;
      try { r = readSchool(doc); } catch (e) { return; }
      ok = true;
      S.snap = { v: V, at: Date.now(), day: today(), sig: progressSig(), term: r.term, items: r.items, overdue: r.overdue, more: r.more };
      lsSet(SNAP, JSON.stringify(S.snap));
      render();
    }
    function finish() {
      clearInterval(poll); clearTimeout(quiet); clearTimeout(end);
      if (obs) obs.disconnect();
      setTimeout(function () { frame.remove(); }, 300);
      job = null; S.loading = false; S.failed = !ok; render();
    }
    poll = setInterval(function () {
      var doc = null;
      try { doc = frame.contentDocument; } catch (e) {}
      // The Overview is drawn once its Schedule section is there (it always is, empty or not).
      var app = doc && doc.getElementById("app");
      if (app && doc.querySelector('.ovsec[data-sec="term"]')) {
        clearInterval(poll);
        take(doc);
        var cloud = self.MusicCloud, signedIn = !!(cloud && cloud.configured && cloud.user && cloud.user());
        if (!signedIn || !self.MutationObserver) { finish(); return; }
        obs = new MutationObserver(function () { clearTimeout(quiet); quiet = setTimeout(function () { take(doc); }, 400); });
        obs.observe(app, { childList: true, subtree: true });
        end = setTimeout(function () { take(doc); finish(); }, SETTLE);
      } else if (Date.now() - started > LOAD_LIMIT) finish();
    }, 200);
    frame.src = "school/index.html?bridge=1#overview";
    document.body.appendChild(frame);
  }

  /* ---------- Practice Log (Activity) ----------
     Everything shared/log.js recorded in every tool: sessions with time per tool and what was
     done. This used to be the Practice Log page; it is the Calendar's Activity view now. */
  var PRACTICE_DAY = 5 * 60;          // seconds in a day for it to count toward the streak
  var TIMELINE = { 0: "12 AM", 6: "6 AM", 12: "Noon", 18: "6 PM" };
  function sessTotal(s) { var n = 0; for (var k in s.apps || {}) n += s.apps[k] || 0; return n; }
  function sessShown(s) { return sessTotal(s) >= 60 || (s.events || []).length; }   // what's worth listing
  function logData() {
    var list = [], by = {};
    if (self.MusicLog && MusicLog.read) { try { list = (MusicLog.read().sessions || []).filter(sessShown); } catch (e) {} }
    list.sort(function (a, b) { return b.start - a.start; });
    list.forEach(function (s) {
      var k = iso(new Date(s.start)), d = by[k] || (by[k] = { secs: 0, apps: {}, sessions: [] });
      d.secs += sessTotal(s); d.sessions.push(s);
      for (var a in s.apps) d.apps[a] = (d.apps[a] || 0) + s.apps[a];
    });
    return { sessions: list, byDay: by, first: list.length ? iso(new Date(list[list.length - 1].start)) : null };
  }
  function secsOn(L, s) { return L.byDay[s] ? L.byDay[s].secs : 0; }
  function streak(L) {
    var t = today(), n = 0;
    if (secsOn(L, t) < PRACTICE_DAY) t = add(t, -1);   // today isn't over yet
    while (secsOn(L, t) >= PRACTICE_DAY) { n++; t = add(t, -1); }
    return n;
  }
  function heat(secs) { var m = secs / 60; return m <= 0 ? 0 : m < 15 ? 1 : m < 30 ? 2 : m < 60 ? 3 : 4; }
  function weekOf(s) { return add(s, -parse(s).getDay()); }   // the Sunday a day's week starts on
  function dayLabel(s) {
    var t = today();
    return s === t ? "Today" : s === add(t, -1) ? "Yesterday" : parse(s).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  function spanLabel(a, b) {
    var x = parse(a), y = parse(b), yr = new Date().getFullYear();
    var right = x.getMonth() === y.getMonth() && x.getFullYear() === y.getFullYear() ? String(y.getDate()) : MON[y.getMonth()] + " " + y.getDate();
    return MON[x.getMonth()] + " " + x.getDate() + (x.getFullYear() !== y.getFullYear() ? ", " + x.getFullYear() : "") + " – " + right +
      (y.getFullYear() !== yr || x.getFullYear() !== y.getFullYear() ? ", " + y.getFullYear() : "");
  }
  // The days the Activity view is adding up: from–to (null for all time) and what to call them.
  function span() {
    var s = S.sel;
    if (S.scope === "day") return { from: s, to: s, label: dayLabel(s) };
    if (S.scope === "week") { var w = weekOf(s); return { from: w, to: add(w, 6), label: w === weekOf(today()) ? "This week" : spanLabel(w, add(w, 6)) }; }
    if (S.scope === "month") {
      var y = S.month.getFullYear(), m = S.month.getMonth();
      return { from: iso(S.month), to: iso(new Date(y, m + 1, 0)), label: MONTHS[m] + (y !== new Date().getFullYear() ? " " + y : "") };
    }
    if (S.scope === "range" && S.range) return { from: S.range.from, to: S.range.to, label: S.range.from === S.range.to ? dayLabel(S.range.from) : spanLabel(S.range.from, S.range.to) };
    return { from: null, to: null, label: "All time" };
  }
  function inSpan(sp, s) { return (!sp.from || s >= sp.from) && (!sp.to || s <= sp.to); }
  function syncLog() {
    if (S.mode !== "activity" || !self.MusicLog || !MusicLog.sync || !MusicLog.read || Date.now() - S.logSyncAt < LOG_SYNC) return;
    S.logSyncAt = Date.now();
    MusicLog.sync().then(function () { if (S.shown) render(); }, function () {});
  }
  function tagColor(t) { return self.MusicTimer && MusicTimer.color ? MusicTimer.color(t) : "#5B7F12"; }

  /* ---------- drawing: shared ---------- */
  function byDate(items) {
    var m = {};
    (items || []).forEach(function (it) { (m[it.date] || (m[it.date] = [])).push(it); });
    return m;
  }
  function termWeek(term, s) {
    if (!term || s < term.start || s > term.end) return 0;
    return Math.floor(diff(s, term.start) / 7) + 1;
  }
  function domCls(it) { return /^(theory|instrument|production|teacher)$/.test(it.dom) ? " d-" + it.dom : ""; }
  var ICON = {
    prev: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 4.5-5.5 5.5 5.5 5.5"/></svg>',
    next: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 4.5 5.5 5.5L8 15.5"/></svg>',
    plus: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4.5v11M4.5 10h11"/></svg>'
  };

  function head() {
    var y = S.month.getFullYear(), m = S.month.getMonth(), t = today();
    var onToday = S.sel === t && y === parse(t).getFullYear() && m === parse(t).getMonth();
    var act = S.mode === "activity";
    return '<div class="cal-top">' +
      '<h2 class="cal-m">' + MONTHS[m] + (y !== new Date().getFullYear() ? ' <span>' + y + "</span>" : "") + "</h2>" +
      (onToday ? "" : '<button class="cal-pill" type="button" data-go="today">Today</button>') +
      '<div class="cal-arrows"><button class="cal-arr" type="button" data-go="prev" aria-label="Previous month">' + ICON.prev + "</button>" +
      '<button class="cal-arr" type="button" data-go="next" aria-label="Next month">' + ICON.next + "</button></div>" +
      "</div>" +
      // Two views of the month, one at a time: what School has scheduled, or what was practiced.
      '<div class="cal-opts"><div class="cal-seg" role="group" aria-label="Show">' +
        '<button type="button" data-go="mode" data-mode="schedule" aria-pressed="' + !act + '">Schedule</button>' +
        '<button type="button" data-go="mode" data-mode="activity" aria-pressed="' + act + '">Activity</button></div>' +
        (act ? '<a class="cal-arr cal-add" href="timer/#add&amp;back=calendar" aria-label="Add time">' + ICON.plus + "</a>" : "") +
      "</div>";
  }

  // The month grid. Schedule: the term tinted, school weeks down the side, a dot per School item.
  // Activity: each day shaded by how long was practiced, with its time; days outside the chosen
  // week or range fade back.
  function grid(L, items) {
    var act = S.mode === "activity", term = !act && S.snap && S.snap.term, t = today(), wkNow = termWeek(term, t);
    var sp = act ? span() : null, fade = act && (S.scope === "week" || S.scope === "range") && !S.picking;
    var first = iso(S.month), start = add(first, -S.month.getDay());
    var last = new Date(S.month.getFullYear(), S.month.getMonth() + 1, 0);
    var rows = Math.ceil((S.month.getDay() + last.getDate()) / 7);
    var out = '<div class="cal-grid' + (term ? " has-gut" : "") + (act ? " is-act" : "") + '" role="grid" aria-label="' + MONTHS[S.month.getMonth()] + " " + S.month.getFullYear() + '">';
    out += '<div class="cal-row cal-dow" role="row">' + (term ? '<span class="cw" aria-hidden="true"></span>' : "") +
      ["S", "M", "T", "W", "T", "F", "S"].map(function (d, i) { return '<span class="dh" role="columnheader" aria-label="' + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i] + '">' + d + "</span>"; }).join("") + "</div>";
    for (var r = 0; r < rows; r++) {
      var sun = add(start, r * 7), wn = termWeek(term, sun);
      out += '<div class="cal-row" role="row">' + (term ? '<span class="cw' + (wn && wn === wkNow ? " now" : "") + '" aria-hidden="true">' + (wn || "") + "</span>" : "");
      for (var i = 0; i < 7; i++) {
        var s = add(sun, i), d = parse(s), cls = "cd" + (d.getMonth() !== S.month.getMonth() ? " out" : "") + (s === t ? " today" : ""), label = longDay(s), inner = "";
        var picked = act ? (S.picking ? S.picking === "to" && S.range && s === S.range.from : S.scope === "day" && s === S.sel) : s === S.sel;
        if (picked) cls += " sel";
        if (act) {
          var secs = secsOn(L, s), h = heat(secs);
          if (h) cls += " h" + h;
          if (fade && !inSpan(sp, s)) cls += " dim";
          if (secs) label += ", " + dur(secs) + " practiced";
          inner = '<span class="am">' + (secs ? durShort(secs) : "") + "</span>";
        } else {
          var its = items[s] || [], inT = !!termWeek(term, s);
          if (inT) cls += " in" + (wkNow && termWeek(term, s) === wkNow ? " now" : "");
          if (its.length) label += ", " + its.length + (its.length === 1 ? " thing" : " things") + " from School";
          inner = '<span class="dots">' + its.slice(0, 3).map(function (it) { return '<i class="' + (it.kind === "done" ? "done" : "") + domCls(it) + '"></i>'; }).join("") + (its.length > 3 ? "<b>+</b>" : "") + "</span>";
        }
        out += '<button class="' + cls + '" type="button" role="gridcell" data-day="' + s + '" aria-label="' + esc(label) + '"' + (picked ? ' aria-selected="true"' : "") + (s === t ? ' aria-current="date"' : "") + ">" +
          '<span class="n">' + d.getDate() + "</span>" + inner + "</button>";
      }
      out += "</div>";
    }
    return out + "</div>";
  }

  /* ---------- drawing: Schedule ---------- */
  function row(it, note) {
    var label = it.label || KIND[it.kind] || "";
    var meta = [label, it.cls].filter(Boolean).join(" · ");
    var right = it.state === "late" ? "Late" : it.state === "done" && it.kind !== "done" ? "Done" : it.state === "pending" ? "Not yet" : "";
    return '<li><a class="ag-it' + domCls(it) + (it.state ? " " + it.state : "") + '" href="school/#' + encodeURIComponent(it.route || "overview") + '">' +
      '<span class="ag-bar" aria-hidden="true"></span><span class="ag-tx">' +
        (meta ? '<span class="ag-k">' + esc(meta) + "</span>" : "") +
        '<span class="ag-t">' + esc(it.name) + "</span>" +
        (it.sub || note ? '<span class="ag-s">' + esc(note || it.sub) + "</span>" : "") +
      "</span>" + (right ? '<span class="ag-r">' + right + "</span>" : "") + "</a></li>";
  }
  function agenda(items) {
    var s = S.sel, t = today(), term = S.snap && S.snap.term, wn = termWeek(term, s);
    var its = (items[s] || []).filter(function (it) { return it.kind !== "done"; });
    var done = (items[s] || []).filter(function (it) { return it.kind === "done"; });
    // A lesson is open until its window closes (School draws instrument lessons as a bar across the week).
    var open = ((S.snap && S.snap.items) || []).filter(function (it) { return it.until && it.date < s && s <= it.until; });
    var over = s === t && S.snap ? S.snap.overdue || [] : [];
    var out = '<div class="ag-head"><h3>' + (s === t ? "Today" : s === add(t, 1) ? "Tomorrow" : s === add(t, -1) ? "Yesterday" : esc(parse(s).toLocaleDateString([], { weekday: "long" }))) + "</h3>" +
      '<span class="ag-date">' + esc(parse(s).toLocaleDateString([], { month: "short", day: "numeric" }) + (wn ? " · Week " + wn : "")) + "</span></div>";
    var body = "";
    // Overdue folds to one line until opened, so it doesn't push today's own work off the screen.
    if (over.length) body += '<details class="ag-over"' + (S.overOpen ? " open" : "") + '><summary class="ag-h late">Overdue<span>' + over.length + "</span></summary>" +
      '<ul class="ag-list">' + over.map(function (it) { return row(it); }).join("") + "</ul></details>";
    if (its.length) body += (over.length ? '<h4 class="ag-h">Scheduled</h4>' : "") + '<ul class="ag-list">' + its.map(function (it) { return row(it); }).join("") + "</ul>";
    if (open.length) body += '<h4 class="ag-h">Still open</h4><ul class="ag-list">' + open.map(function (it) { return row(it, "Open through " + shortDay(it.until)); }).join("") + "</ul>";
    if (done.length) body += '<h4 class="ag-h">Finished</h4><ul class="ag-list">' + done.map(function (it) { return row(it); }).join("") + "</ul>";
    if (s === t && S.snap && S.snap.more) body += '<p class="ag-more"><a href="school/#overview">+' + S.snap.more + " more in School</a></p>";
    if (!body) body = '<p class="ag-empty">' + (S.loading && !S.snap ? "Reading School…" : "Nothing scheduled") + "</p>";
    if (S.failed && !S.snap) body += '<p class="ag-empty">Couldn’t read School. <button type="button" class="ag-retry" data-go="reload">Try again</button></p>';
    return out + body;
  }

  /* ---------- drawing: Activity ---------- */
  var SCOPES = [["day", "Day"], ["week", "Week"], ["month", "Month"], ["all", "All"], ["range", "Range"]];
  function scopeBar() {
    if (S.picking) return '<div class="act-pick"><span>' + (S.picking === "from" ? "Tap the first day" : "Tap the last day") + "</span>" +
      '<button class="cal-pill" type="button" data-go="pick-cancel">Cancel</button></div>';
    return '<div class="act-scope" role="group" aria-label="Add up">' + SCOPES.map(function (x) {
      return '<button type="button" data-go="scope" data-scope="' + x[0] + '" aria-pressed="' + (S.scope === x[0]) + '">' + x[1] + "</button>";
    }).join("") + "</div>";
  }
  function stack(apps, secs) {
    return Object.keys(apps).sort(function (a, b) { return apps[b] - apps[a]; }).map(function (a) {
      return '<i style="height:' + (100 * apps[a] / secs).toFixed(1) + "%;background:" + esc(appColor(a)) + '"></i>';
    }).join("");
  }
  // Bars, one per day (or per week over a long range), stacked by tool; tapping one opens it.
  function bars(cols, max, labelOf) {
    max = Math.max(max, 30 * 60);
    return '<div class="act-bars' + (cols.length > 14 ? " thin" : "") + '" style="--n:' + cols.length + '">' + cols.map(function (c, i) {
      var h = c.secs ? Math.max(4, 100 * c.secs / max) : 3;
      return '<button class="bar' + (c.now ? " now" : "") + (c.on ? " on" : "") + '" type="button" data-' + c.kind + '="' + c.key + '" aria-label="' + esc(c.name + ", " + dur(c.secs)) + '">' +
        '<span class="col" style="height:' + h.toFixed(1) + '%">' + (c.secs ? stack(c.apps, c.secs) : "") + "</span>" +
        '<span class="d">' + esc(labelOf(c, i)) + "</span></button>";
    }).join("") + "</div>";
  }
  function dayCols(L, from, to) {
    var cols = [], t = today();
    for (var s = from; s <= to; s = add(s, 1)) {
      var d = L.byDay[s];
      cols.push({ kind: "day", key: s, name: longDay(s), secs: d ? d.secs : 0, apps: d ? d.apps : {}, now: s === t, on: S.scope === "day" && s === S.sel });
    }
    return cols;
  }
  function weekCols(L, from, to) {
    var cols = [], t = weekOf(today());
    for (var w = weekOf(from); w <= to; w = add(w, 7)) {
      var c = { kind: "week", key: w, name: "Week of " + shortDay(w), secs: 0, apps: {}, now: w === t };
      for (var i = 0; i < 7; i++) { var d = L.byDay[add(w, i)]; if (d) { c.secs += d.secs; for (var a in d.apps) c.apps[a] = (c.apps[a] || 0) + d.apps[a]; } }
      cols.push(c);
    }
    return cols;
  }
  // Practice over the last half year, a square per day (the shape GitHub uses), Sunday at the top.
  function heatmap(L) {
    var t = today(), lastWk = weekOf(t), weeks = 26;
    if (L.first) weeks = Math.min(52, Math.max(18, Math.floor(diff(lastWk, weekOf(L.first)) / 7) + 1));
    var from = add(lastWk, -7 * (weeks - 1)), cells = "";
    for (var s = from; s <= add(lastWk, 6); s = add(s, 1)) {
      if (s > t) { cells += '<i class="fut"></i>'; continue; }
      var secs = secsOn(L, s);
      cells += '<button type="button" class="l' + heat(secs) + (s === t ? " now" : "") + '" data-day="' + s + '" aria-label="' + esc(longDay(s) + ", " + dur(secs)) + '"></button>';
    }
    return '<div class="act-heat" style="--w:' + weeks + '">' + cells + "</div>";
  }
  // One day, midnight to midnight, with each session where it happened.
  function timeline(L, s) {
    var day = L.byDay[s], base = parse(s).getTime(), blocks = "";
    (day ? day.sessions : []).forEach(function (x) {
      var a = Math.max(0, (x.start - base) / 864e5), b = Math.min(1, (x.end - base) / 864e5), top = Object.keys(x.apps || {}).sort(function (p, q) { return x.apps[q] - x.apps[p]; })[0];
      blocks += '<i style="left:' + (100 * a).toFixed(2) + "%;width:" + Math.max(0.8, 100 * (b - a)).toFixed(2) + "%;background:" + esc(top ? appColor(top) : "var(--cal-act)") + '" title="' + esc(clock(x.start) + " – " + clock(x.end)) + '"></i>';
    });
    return '<div class="act-tl" aria-hidden="true"><div class="act-tl-track">' + blocks + '</div><div class="act-tl-ax">' +
      Object.keys(TIMELINE).map(function (h) { return '<span style="left:' + (100 * h / 24) + '%">' + TIMELINE[h] + "</span>"; }).join("") + "</div></div>";
  }
  function chart(L, sp) {
    if (S.scope === "day") return timeline(L, sp.from);
    if (S.scope === "all") return heatmap(L);
    var n = diff(sp.to, sp.from) + 1;
    if (n <= 62) {
      var cols = dayCols(L, sp.from, sp.to), max = 0;
      cols.forEach(function (c) { max = Math.max(max, c.secs); });
      return bars(cols, max, n <= 7
        ? function (c) { return parse(c.key).toLocaleDateString([], { weekday: "narrow" }); }
        : function (c, i) {
          // A date every week; the month's name too where it changes (a range across months).
          if (i % 7 || i > n - 3) return "";
          var d = parse(c.key), prev = i ? parse(cols[i - 7].key) : null;
          return (S.scope === "range" && (!prev || prev.getMonth() !== d.getMonth()) ? MON[d.getMonth()] + " " : "") + d.getDate();
        });
    }
    var w = weekCols(L, sp.from, sp.to), mx = 0;
    w.forEach(function (c) { mx = Math.max(mx, c.secs); });
    return bars(w, mx, function (c, i) { return i % 4 === 0 ? MON[parse(c.key).getMonth()] + " " + parse(c.key).getDate() : ""; });
  }
  function summary(L, sp) {
    var t = today(), total = 0, ndays = 0, sessions = 0;
    Object.keys(L.byDay).forEach(function (k) { if (inSpan(sp, k)) { total += L.byDay[k].secs; sessions += L.byDay[k].sessions.length; } });
    // Average over the days of the span that have happened (all time: since the first one logged).
    var from = sp.from || L.first, to = sp.to && sp.to < t ? sp.to : t;
    if (from && from <= to) ndays = diff(to, from) + 1;
    var st = streak(L), second = S.scope === "day"
      ? ["Sessions", String(sessions)]
      : ["Daily avg", ndays ? dur(total / ndays) : "–"];
    return '<section class="act-card"><div class="act-stats">' +
      '<div class="st big"><span class="lbl">' + esc(sp.label) + '</span><span class="num">' + dur(total) + "</span></div>" +
      '<div class="st-pair"><div class="st"><span class="lbl">' + second[0] + '</span><span class="num">' + second[1] + "</span></div>" +
      '<div class="st"><span class="lbl">Streak</span><span class="num">' + st + (st === 1 ? " day" : " days") + "</span></div></div>" +
      "</div>" + chart(L, sp) + "</section>";
  }
  function meter(title, rows) {
    if (!rows.length) return "";
    var max = 0;
    rows.forEach(function (r) { max = Math.max(max, r.secs); });
    return '<section class="act-card"><span class="lbl">' + title + '</span><div class="act-tools">' + rows.map(function (r) {
      return '<div class="tool"><span class="n">' + esc(r.name) + '</span><span class="b"><i style="width:' + (100 * r.secs / max).toFixed(1) + "%;background:" + esc(r.color) + '"></i></span><span class="t">' + dur(r.secs) + "</span></div>";
    }).join("") + "</div></section>";
  }
  function byTool(L, sp) {
    var by = {};
    Object.keys(L.byDay).forEach(function (k) { if (inSpan(sp, k)) { var a = L.byDay[k].apps; for (var id in a) by[id] = (by[id] || 0) + a[id]; } });
    return meter("By tool", Object.keys(by).filter(function (a) { return by[a] >= 30; }).sort(function (a, b) { return by[b] - by[a]; })
      .map(function (a) { return { name: appName(a), secs: by[a], color: appColor(a) }; }));
  }
  // The Timer's blocks by what they were for (Production, Guitar...): whole blocks, including time
  // other tools counted while they ran, so this is a view of its own rather than a share of By tool.
  function timed(L, sp) {
    var by = {};
    L.sessions.forEach(function (s) {
      (s.events || []).forEach(function (e) {
        if (e.app === "timer" && e.secs && inSpan(sp, iso(new Date(e.end || s.start)))) { var k = e.tag || "Timer"; by[k] = (by[k] || 0) + e.secs; }
      });
    });
    return meter("Timed", Object.keys(by).sort(function (a, b) { return by[b] - by[a]; }).map(function (k) { return { name: k, secs: by[k], color: tagColor(k) }; }));
  }
  function evRight(e) {
    var bits = [];
    if (e.n != null) bits.push(e.n + " " + (e.unit || ""));
    if (e.tried) bits.push(Math.round(100 * e.ok / e.tried) + "%");
    if (e.secs != null) bits.push(dur(e.secs));
    return bits.join(" · ").replace(/\s+·/g, " ·").trim();
  }
  function sessionCard(s) {
    var open = !!S.open[s.id], evs = s.events || [];
    var chips = Object.keys(s.apps || {}).filter(function (a) { return s.apps[a] >= 30; }).sort(function (a, b) { return s.apps[b] - s.apps[a]; }).map(function (a) {
      return '<span class="chip"><i style="--c:' + esc(appColor(a)) + '"></i>' + esc(appName(a)) + ' <span class="m">' + dur(s.apps[a]) + "</span></span>";
    }).join("");
    var list = open ? evs : evs.slice(-5), hidden = evs.length - list.length;
    var lines = list.slice().reverse().map(function (e) {
      var inner = '<i style="--c:' + esc(e.app === "timer" && e.tag ? tagColor(e.tag) : appColor(e.app)) + '"></i><span class="x">' + esc(e.text) + '</span><span class="r">' + esc(evRight(e)) + "</span>";
      // Timer blocks (and time added by hand) open in the Timer to be changed or deleted.
      if (e.app === "timer" && e.rid) return '<li><a class="ev link" href="timer/#edit=' + encodeURIComponent(e.rid) + '&amp;back=calendar">' + inner + "</a></li>";
      return '<li class="ev">' + inner + "</li>";
    }).join("") + (hidden ? '<li class="ev more"><span></span><span>+' + hidden + " more</span><span></span></li>" : "");
    return '<article class="act-sess">' +
      '<button class="act-top" type="button" data-toggle="' + esc(s.id) + '" aria-expanded="' + open + '"><span class="when">' + esc(clock(s.start) + " – " + clock(s.end)) + '</span><span class="len">' + dur(sessTotal(s)) + "</span></button>" +
      (chips ? '<div class="chips">' + chips + "</div>" : "") +
      (lines ? '<ul class="evs">' + lines + "</ul>" : "") +
      (open ? '<div class="acts"><button class="del" type="button" data-del="' + esc(s.id) + '">' + (S.confirm === s.id ? "Tap again to delete" : "Delete session") + "</button></div>" : "") +
      "</article>";
  }
  function sessions(L, sp) {
    var keys = Object.keys(L.byDay).filter(function (k) { return inSpan(sp, k); }).sort().reverse();
    if (!keys.length) return '<p class="ag-empty">' + (L.sessions.length ? "Nothing logged" : "Open any tool and play, or add time with +.") + "</p>";
    var more = keys.length > S.days;
    return keys.slice(0, S.days).map(function (k) {
      var d = L.byDay[k];
      return '<div class="act-dh"><h4>' + esc(dayLabel(k)) + "</h4><span>" + dur(d.secs) + "</span></div>" + d.sessions.map(sessionCard).join("");
    }).join("") + (more ? '<button class="cal-pill act-more" type="button" data-go="more">Show more</button>' : "");
  }
  function activity(L) {
    var sp = span();
    return scopeBar() + summary(L, sp) + byTool(L, sp) + timed(L, sp) + '<div class="act-list">' + sessions(L, sp) + "</div>";
  }

  function render() {
    if (!S.root || !S.shown) return;
    var act = S.mode === "activity", L = act ? logData() : null, items = act ? {} : byDate(S.snap && S.snap.items);
    S.root.innerHTML = head() + '<section class="cal-card">' + grid(L, items) + "</section>" +
      (act ? '<div class="act">' + activity(L) + "</div>" : '<section class="cal-day" aria-live="polite">' + agenda(items) + "</section>");
  }

  /* ---------- moving around ---------- */
  function savePrefs() { lsSet(PREFS, JSON.stringify({ mode: S.mode, scope: S.scope === "range" ? "week" : S.scope })); }
  function setHash() {
    if (!S.shown) return;
    try { history.replaceState(history.state, "", S.mode === "activity" ? "#activity" : "#calendar"); } catch (e) {}
  }
  function setMonth(d) { S.month = new Date(d.getFullYear(), d.getMonth(), 1); }
  function step(n) {
    setMonth(new Date(S.month.getFullYear(), S.month.getMonth() + n, 1));
    // Keep the selected day in view: today if this is today's month, otherwise the 1st.
    var t = today(), tm = monthOf(t);
    S.sel = tm.getTime() === S.month.getTime() ? t : iso(S.month);
    S.days = 10;
    render();
  }
  function pick(s) {
    var m = monthOf(s);
    if (m.getTime() !== S.month.getTime()) setMonth(m);
    if (S.mode === "activity") {
      if (S.picking === "from") { S.range = { from: s, to: s }; S.picking = "to"; render(); return; }
      if (S.picking === "to") {
        var a = S.range.from;
        S.range = a <= s ? { from: a, to: s } : { from: s, to: a };
        S.picking = null; S.scope = "range"; S.sel = S.range.to; S.days = 10;
        render(); return;
      }
      S.scope = "day"; S.days = 10;
    }
    S.sel = s;
    render();
  }
  function onClick(e) {
    var b = e.target.closest("[data-day],[data-week],[data-go],[data-toggle],[data-del]");
    if (!b || !S.root.contains(b)) return;
    if (b.dataset.day) { pick(b.dataset.day); return; }
    if (b.dataset.week) { S.sel = b.dataset.week; setMonth(monthOf(S.sel)); S.scope = "week"; S.days = 10; render(); return; }
    if (b.dataset.toggle) { var id = b.dataset.toggle; S.open[id] = !S.open[id]; S.confirm = null; render(); return; }
    if (b.dataset.del) {
      if (S.confirm === b.dataset.del) {
        if (self.MusicLog) { MusicLog.remove(b.dataset.del); MusicLog.sync().catch(function () {}); }
        S.confirm = null; render();
      } else { S.confirm = b.dataset.del; render(); }
      return;
    }
    switch (b.dataset.go) {
      case "prev": step(-1); break;
      case "next": step(1); break;
      case "today": S.picking = null; pick(today()); break;
      case "mode":
        if (S.mode === b.dataset.mode) return;
        S.mode = b.dataset.mode; S.picking = null; savePrefs(); setHash();
        render();
        if (S.mode === "activity") syncLog(); else refresh();
        break;
      case "scope":
        if (b.dataset.scope === "range") { S.picking = "from"; render(); break; }
        // Day, Week and Month go from the day picked (or today) and the month on screen.
        if (b.dataset.scope === "day" || b.dataset.scope === "week") {
          if (monthOf(S.sel).getTime() !== S.month.getTime()) S.sel = monthOf(today()).getTime() === S.month.getTime() ? today() : iso(S.month);
        }
        S.scope = b.dataset.scope; S.days = 10; savePrefs(); render(); break;
      case "pick-cancel": S.picking = null; render(); break;
      case "more": S.days += 14; render(); break;
      case "reload": refresh(true); break;
    }
  }
  // Swipe the month sideways to change it; vertical scrolling is left alone.
  function swipe(root) {
    var x0 = null, y0 = 0, id = null;
    root.addEventListener("pointerdown", function (e) {
      if (!e.target.closest(".cal-grid") || e.pointerType === "mouse") return;
      x0 = e.clientX; y0 = e.clientY; id = e.pointerId;
    });
    root.addEventListener("pointerup", function (e) {
      if (x0 == null || e.pointerId !== id) return;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) step(dx < 0 ? 1 : -1);
    });
    root.addEventListener("pointercancel", function () { x0 = null; });
  }

  /* ---------- the tab ---------- */
  function mount(root) {
    S.root = root;
    root.addEventListener("click", onClick);
    root.addEventListener("toggle", function (e) { if (e.target.classList && e.target.classList.contains("ag-over")) S.overOpen = e.target.open; }, true);
    swipe(root);
    // shared/log.js arrives a moment after this page (settings.js loads it; until then MusicLog
    // only queues): once it is here, follow its changes and draw what it has.
    (function waitLog(n) {
      if (self.MusicLog && MusicLog.read && MusicLog.onChange) {
        MusicLog.onChange(function () { if (S.shown && S.mode === "activity") render(); });
        if (S.shown && S.mode === "activity") { render(); syncLog(); }
      } else if (n < 200) setTimeout(function () { waitLog(n + 1); }, 50);
    })(0);
    window.addEventListener("storage", function (e) {
      if (!S.shown || S.mode !== "schedule") return;
      if (e.key === "school:progress") refresh();
      else if (e.key === SNAP && !job) { var s = lsJson(SNAP); if (s && s.v === V) { S.snap = s; render(); } }
    });
  }
  function show() {
    if (!S.root) return;
    S.shown = true;
    // A new day since the tab was last looked at: start from it.
    var t = today();
    if (S.openedDay !== t) { S.openedDay = t; S.sel = t; setMonth(monthOf(t)); }
    setHash();
    render();
    if (S.mode === "schedule") refresh(); else syncLog();
  }
  function hide() { S.shown = false; }
  // Links into the tab: #calendar (Schedule), #activity, #activity=2026-11-21 (that day's practice).
  function route(h) {
    var m = /^#activity(?:=(\d{4}-\d\d-\d\d))?$/.exec(h || "");
    if (m) {
      S.mode = "activity"; S.picking = null;
      if (m[1]) { S.sel = m[1]; S.scope = "day"; setMonth(monthOf(m[1])); S.openedDay = today(); }
    } else if (h === "#calendar") S.mode = "schedule";
    savePrefs();
  }

  // For the assistant: what the Calendar is showing.
  function context() {
    if (S.mode === "activity") {
      var L = logData(), sp = span(), total = 0, by = {};
      Object.keys(L.byDay).forEach(function (k) { if (inSpan(sp, k)) { total += L.byDay[k].secs; for (var a in L.byDay[k].apps) by[a] = (by[a] || 0) + L.byDay[k].apps[a]; } });
      var top = Object.keys(by).sort(function (a, b) { return by[b] - by[a]; }).slice(0, 4).map(function (a) { return appName(a) + " " + dur(by[a]); });
      return "On the Music Calendar's Activity view (the Practice Log), showing " + sp.label + ": " + dur(total) + " practiced" +
        (top.length ? " (" + top.join(", ") + ")" : "") + ". Streak " + streak(L) + " days.";
    }
    var s = S.sel, items = byDate(S.snap && S.snap.items)[s] || [], out = "On the Music Calendar, looking at " + longDay(s) + ".";
    if (items.length) out += " School that day: " + items.map(function (it) { return (it.label || KIND[it.kind]) + " " + it.name + (it.state ? " (" + it.state + ")" : ""); }).join("; ") + ".";
    if (s === today() && S.snap && S.snap.overdue && S.snap.overdue.length) out += " Overdue in School: " + S.snap.overdue.length + ".";
    return out;
  }

  self.MusicCalendar = { mount: mount, show: show, hide: hide, route: route, context: context, refresh: function () { refresh(true); } };
})();
