/* Calendar: the home screen's second tab (index.html loads this file and calls MusicCalendar.mount).

   A month at a time, Sunday first. The School term is tinted with its school week numbers down the
   side and the current week in bold, as School's own Overview calendar drew it (that calendar lives
   here now). Each day carries a dot for what School has scheduled on it; tapping a day lists those
   below the month, and each one opens in School. Activity (off by default, remembered) adds the
   time the Practice Log recorded on each day, and the sessions themselves under the day.

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

   Saved on this device: calendar:prefs {activity}, calendar:school (the last read). */
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
    activity: !!((lsJson(PREFS) || {}).activity),
    snap: null, loading: false, failed: false,
    logSyncAt: 0, openedDay: today()
  };
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

  /* ---------- Practice Log ---------- */
  function sessTotal(s) { var n = 0; for (var k in s.apps || {}) n += s.apps[k] || 0; return n; }
  function activityByDay() {
    var by = {};
    if (!self.MusicLog || !MusicLog.read) return by;
    var d;
    try { d = MusicLog.read(); } catch (e) { return by; }
    (d.sessions || []).forEach(function (s) {
      var secs = sessTotal(s);
      if (secs < 60 && !(s.events || []).length) return;   // the same sessions Practice Log shows
      var k = iso(new Date(s.start)), day = by[k] || (by[k] = { secs: 0, sessions: [] });
      day.secs += secs; day.sessions.push(s);
    });
    Object.keys(by).forEach(function (k) { by[k].sessions.sort(function (a, b) { return a.start - b.start; }); });
    return by;
  }
  function syncLog() {
    if (!S.activity || !self.MusicLog || !MusicLog.sync || Date.now() - S.logSyncAt < LOG_SYNC) return;
    S.logSyncAt = Date.now();
    MusicLog.sync().then(function () { if (S.shown) render(); }, function () {});
  }

  /* ---------- drawing ---------- */
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

  function head(act) {
    var y = S.month.getFullYear(), m = S.month.getMonth(), t = today();
    var onToday = S.sel === t && y === parse(t).getFullYear() && m === parse(t).getMonth();
    var total = 0;
    if (S.activity) Object.keys(act).forEach(function (k) { var d = parse(k); if (d.getFullYear() === y && d.getMonth() === m) total += act[k].secs; });
    return '<div class="cal-top">' +
      '<h2 class="cal-m">' + MONTHS[m] + (y !== new Date().getFullYear() ? ' <span>' + y + "</span>" : "") + "</h2>" +
      (onToday ? "" : '<button class="cal-pill" type="button" data-go="today">Today</button>') +
      '<div class="cal-arrows"><button class="cal-arr" type="button" data-go="prev" aria-label="Previous month"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12 4.5-5.5 5.5 5.5 5.5"/></svg></button>' +
      '<button class="cal-arr" type="button" data-go="next" aria-label="Next month"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 4.5 5.5 5.5L8 15.5"/></svg></button></div>' +
      "</div>" +
      // Practice Log's time on the calendar: off by default so School's schedule reads on its own.
      '<div class="cal-opts"><button class="cal-tog" type="button" role="switch" data-go="activity" aria-checked="' + S.activity + '">' +
        '<span class="sw" aria-hidden="true"><i></i></span>Activity</button>' +
        (S.activity && iso(S.month) <= t ? '<span class="cal-sum">' + (total ? dur(total) + " this month" : "Nothing logged this month") + "</span>" : "") +
      "</div>";
  }

  function grid(act, items) {
    var term = S.snap && S.snap.term, t = today(), wkNow = termWeek(term, t);
    var first = iso(S.month), start = add(first, -S.month.getDay());
    var last = new Date(S.month.getFullYear(), S.month.getMonth() + 1, 0);
    var rows = Math.ceil((S.month.getDay() + last.getDate()) / 7);
    var gut = term ? " has-gut" : "";
    var out = '<div class="cal-grid' + gut + '" role="grid" aria-label="' + MONTHS[S.month.getMonth()] + " " + S.month.getFullYear() + '">';
    out += '<div class="cal-row cal-dow" role="row">' + (term ? '<span class="cw" aria-hidden="true"></span>' : "") +
      ["S", "M", "T", "W", "T", "F", "S"].map(function (d, i) { return '<span class="dh" role="columnheader" aria-label="' + ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i] + '">' + d + "</span>"; }).join("") + "</div>";
    for (var r = 0; r < rows; r++) {
      var sun = add(start, r * 7), wn = termWeek(term, sun);
      out += '<div class="cal-row" role="row">' + (term ? '<span class="cw' + (wn && wn === wkNow ? " now" : "") + '" aria-hidden="true">' + (wn || "") + "</span>" : "");
      for (var i = 0; i < 7; i++) {
        var s = add(sun, i), d = parse(s), its = items[s] || [], a = S.activity && act[s];
        var inT = !!termWeek(term, s), cls = "cd" + (d.getMonth() !== S.month.getMonth() ? " out" : "") + (inT ? " in" : "") +
          (inT && wkNow && termWeek(term, s) === wkNow ? " now" : "") + (s === t ? " today" : "") + (s === S.sel ? " sel" : "");
        var label = longDay(s) + (its.length ? ", " + its.length + (its.length === 1 ? " thing" : " things") + " from School" : "") + (a ? ", " + dur(a.secs) + " practiced" : "");
        var dots = its.slice(0, 3).map(function (it) { return '<i class="' + (it.kind === "done" ? "done" : "") + domCls(it) + '"></i>'; }).join("");
        out += '<button class="' + cls + '" type="button" role="gridcell" data-day="' + s + '" aria-label="' + esc(label) + '"' + (s === S.sel ? ' aria-selected="true"' : "") + (s === t ? ' aria-current="date"' : "") + ">" +
          '<span class="n">' + d.getDate() + "</span>" +
          '<span class="dots">' + dots + (its.length > 3 ? '<b>+</b>' : "") + "</span>" +
          (S.activity ? '<span class="am">' + (a ? durShort(a.secs) : "") + "</span>" : "") +
          "</button>";
      }
      out += "</div>";
    }
    return out + "</div>";
  }

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
  function sessRow(s) {
    var apps = Object.keys(s.apps || {}).filter(function (a) { return s.apps[a] >= 30; }).sort(function (a, b) { return s.apps[b] - s.apps[a]; });
    var evs = (s.events || []).map(function (e) { return e.text; }).filter(Boolean);
    var seen = {}, lines = evs.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; }).slice(0, 3);
    return '<li><a class="ag-ses" href="log/#day=' + iso(new Date(s.start)) + '">' +
      '<span class="ag-when">' + esc(clock(s.start) + " – " + clock(s.end)) + '</span><span class="ag-len">' + dur(sessTotal(s)) + "</span>" +
      (apps.length ? '<span class="ag-apps">' + apps.map(function (a) { return '<span class="ag-app"><i style="--c:' + esc(appColor(a)) + '"></i>' + esc(appName(a)) + "</span>"; }).join("") + "</span>" : "") +
      (lines.length ? '<span class="ag-ev">' + esc(lines.join(" · ")) + "</span>" : "") +
      "</a></li>";
  }
  function agenda(act, items) {
    var s = S.sel, t = today(), term = S.snap && S.snap.term, wn = termWeek(term, s);
    var its = (items[s] || []).filter(function (it) { return it.kind !== "done"; });
    var done = (items[s] || []).filter(function (it) { return it.kind === "done"; });
    // A lesson is open until its window closes (School draws instrument lessons as a bar across the week).
    var open = ((S.snap && S.snap.items) || []).filter(function (it) { return it.until && it.date < s && s <= it.until; });
    var over = s === t && S.snap ? S.snap.overdue || [] : [];
    var a = S.activity && act[s];
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
    if (a) body += '<h4 class="ag-h act">Practice<span>' + dur(a.secs) + '</span></h4><ul class="ag-list">' + a.sessions.map(sessRow).join("") + "</ul>";
    if (!body) body = '<p class="ag-empty">' + (S.loading && !S.snap ? "Reading School…" : "Nothing scheduled") + "</p>";
    if (S.failed && !S.snap) body += '<p class="ag-empty">Couldn’t read School. <button type="button" class="ag-retry" data-go="reload">Try again</button></p>';
    return out + body;
  }

  function render() {
    if (!S.root || !S.shown) return;
    var act = S.activity ? activityByDay() : {}, items = byDate(S.snap && S.snap.items);
    S.root.innerHTML = head(act) + '<section class="cal-card">' + grid(act, items) + "</section>" +
      '<section class="cal-day" aria-live="polite">' + agenda(act, items) + "</section>";
  }

  /* ---------- moving around ---------- */
  function setMonth(d) { S.month = new Date(d.getFullYear(), d.getMonth(), 1); }
  function step(n) {
    setMonth(new Date(S.month.getFullYear(), S.month.getMonth() + n, 1));
    // Keep the selected day in view: today if this is today's month, otherwise the 1st.
    var t = today(), tm = monthOf(t);
    S.sel = tm.getTime() === S.month.getTime() ? t : iso(S.month);
    render();
  }
  function pick(s) {
    S.sel = s;
    var m = monthOf(s);
    if (m.getTime() !== S.month.getTime()) setMonth(m);
    render();
  }
  function onClick(e) {
    var b = e.target.closest("[data-day],[data-go]");
    if (!b || !S.root.contains(b)) return;
    if (b.dataset.day) { pick(b.dataset.day); return; }
    switch (b.dataset.go) {
      case "prev": step(-1); break;
      case "next": step(1); break;
      case "today": pick(today()); break;
      case "activity":
        S.activity = !S.activity;
        lsSet(PREFS, JSON.stringify(Object.assign(lsJson(PREFS) || {}, { activity: S.activity })));
        render(); syncLog(); break;
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
    if (self.MusicLog && MusicLog.onChange) MusicLog.onChange(function () { if (S.shown && S.activity) render(); });
    window.addEventListener("storage", function (e) {
      if (!S.shown) return;
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
    render();
    refresh();
    syncLog();
  }
  function hide() { S.shown = false; }

  // For the assistant: what the Calendar is showing.
  function context() {
    var s = S.sel, items = byDate(S.snap && S.snap.items)[s] || [], out = "On the Music Calendar, looking at " + longDay(s) + ".";
    if (items.length) out += " School that day: " + items.map(function (it) { return (it.label || KIND[it.kind]) + " " + it.name + (it.state ? " (" + it.state + ")" : ""); }).join("; ") + ".";
    if (s === today() && S.snap && S.snap.overdue && S.snap.overdue.length) out += " Overdue in School: " + S.snap.overdue.length + ".";
    if (S.activity) { var a = activityByDay()[s]; out += " Practice that day: " + (a ? dur(a.secs) : "none") + "."; }
    return out;
  }

  self.MusicCalendar = { mount: mount, show: show, hide: hide, context: context, refresh: function () { refresh(true); } };
})();
