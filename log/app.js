/* Practice Log: reads what shared/log.js recorded in every tool and shows it.
   Nothing here records time; this page is the one place in Music that isn't counted. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var main = $("main");
  var APPS = {};
  ((self.MUSIC && self.MUSIC.apps) || []).forEach(function (a) { APPS[a.id] = a; });
  var PRACTICE_DAY = 5 * 60;          // seconds in a day for it to count toward the streak
  var view = { range: "week", days: 10, open: {}, pick: null };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function name(id) { return (APPS[id] && APPS[id].name) || (id ? id.charAt(0).toUpperCase() + id.slice(1) : "Other"); }
  function color(id) { return (APPS[id] && APPS[id].color) || "#8A90A0"; }
  function dur(secs) {
    secs = Math.round(secs || 0);
    if (secs < 60) return secs ? "<1m" : "0m";
    var m = Math.round(secs / 60), h = Math.floor(m / 60);
    return h ? h + "h " + (m % 60 ? (m % 60) + "m" : "").trim() : m + "m";
  }
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function startOfDay(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function addDays(t, n) { var d = new Date(t); d.setDate(d.getDate() + n); return d.getTime(); }
  function clock(t) { return new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }
  function dayName(t) {
    var today = startOfDay(Date.now()), d = startOfDay(t);
    if (d === today) return "Today";
    if (d === addDays(today, -1)) return "Yesterday";
    return new Date(t).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  function total(s) { var n = 0; for (var k in s.apps) n += s.apps[k] || 0; return n; }
  function shown(s) { return total(s) >= 60 || (s.events || []).length; }

  function data() {
    var d = window.MusicLog ? MusicLog.read() : { sessions: [] };
    var sessions = d.sessions.filter(shown).sort(function (a, b) { return b.start - a.start; });
    var byDay = {};
    sessions.forEach(function (s) {
      var k = dayKey(s.start), day = byDay[k] || (byDay[k] = { t: startOfDay(s.start), secs: 0, apps: {}, sessions: [] });
      day.sessions.push(s); day.secs += total(s);
      for (var a in s.apps) day.apps[a] = (day.apps[a] || 0) + s.apps[a];
    });
    return { sessions: sessions, byDay: byDay };
  }
  function secsOn(byDay, t) { var d = byDay[dayKey(t)]; return d ? d.secs : 0; }

  function streak(byDay) {
    var t = startOfDay(Date.now()), n = 0;
    if (secsOn(byDay, t) < PRACTICE_DAY) t = addDays(t, -1);   // today isn't over yet
    while (secsOn(byDay, t) >= PRACTICE_DAY) { n++; t = addDays(t, -1); }
    return n;
  }
  function weekStart(t) { var d = new Date(startOfDay(t)), wd = (d.getDay() + 6) % 7; return addDays(d.getTime(), -wd); }

  function statsCard(D) {
    var today = startOfDay(Date.now()), wk = 0;
    for (var t = weekStart(today); t <= today; t = addDays(t, 1)) wk += secsOn(D.byDay, t);
    var st = streak(D.byDay);
    return '<section class="card"><div class="stats">' +
      '<div class="stat big"><span class="lbl">Today</span><span class="num">' + dur(secsOn(D.byDay, today)) + "</span></div>" +
      '<div class="stat"><span class="lbl">This week</span><span class="num">' + dur(wk) + "</span></div>" +
      '<div class="stat"><span class="lbl">Streak</span><span class="num">' + st + (st === 1 ? " day" : " days") + "</span></div>" +
      "</div>" + weekBars(D) + "</section>";
  }
  function weekBars(D) {
    var today = startOfDay(Date.now()), days = [], max = 0;
    for (var i = 6; i >= 0; i--) { var t = addDays(today, -i); days.push(t); max = Math.max(max, secsOn(D.byDay, t)); }
    max = Math.max(max, 30 * 60);
    return '<div class="week" role="group" aria-label="Last 7 days">' + days.map(function (t) {
      var day = D.byDay[dayKey(t)], secs = day ? day.secs : 0;
      var stack = day ? Object.keys(day.apps).sort(function (a, b) { return day.apps[b] - day.apps[a]; }).map(function (a) {
        return '<i style="height:' + (100 * day.apps[a] / secs).toFixed(1) + '%;background:' + color(a) + '"></i>';
      }).join("") : "";
      var h = secs ? Math.max(4, 100 * secs / max) : 4;
      var lab = new Date(t).toLocaleDateString([], { weekday: "narrow" });
      return '<button class="day' + (t === today ? " today" : "") + '" type="button" data-day="' + t + '" aria-pressed="' + (view.pick === t) + '" aria-label="' + esc(dayName(t) + ", " + dur(secs)) + '">' +
        '<span class="col" style="height:' + h.toFixed(1) + '%">' + stack + '</span><span class="d">' + lab + "</span></button>";
    }).join("") + "</div>";
  }
  function heatCard(D) {
    var today = startOfDay(Date.now()), weeks = 18, from = addDays(weekStart(today), -7 * (weeks - 1)), cells = "";
    for (var t = from; t <= addDays(weekStart(today), 6); t = addDays(t, 1)) {
      if (t > today) { cells += '<b style="visibility:hidden"></b>'; continue; }
      var m = secsOn(D.byDay, t) / 60, l = m <= 0 ? 0 : m < 15 ? 1 : m < 30 ? 2 : m < 60 ? 3 : 4;
      cells += '<b class="l' + l + (t === today ? " now" : "") + '" title="' + esc(dayName(t) + " · " + dur(m * 60)) + '"></b>';
    }
    return '<section class="card" style="--accent:#0B7FA6"><div class="heat" aria-hidden="true">' + cells + "</div></section>";
  }
  function toolsCard(D) {
    var today = startOfDay(Date.now()), from = view.range === "week" ? weekStart(today) : view.range === "month" ? addDays(today, -29) : 0;
    var by = {}, max = 0;
    D.sessions.forEach(function (s) { if (s.start >= from) for (var a in s.apps) by[a] = (by[a] || 0) + s.apps[a]; });
    var ids = Object.keys(by).filter(function (a) { return by[a] >= 30; }).sort(function (a, b) { return by[b] - by[a]; });
    ids.forEach(function (a) { max = Math.max(max, by[a]); });
    var tabs = [["week", "Week"], ["month", "30 days"], ["all", "All"]].map(function (r) {
      return '<button class="tab" type="button" data-range="' + r[0] + '" aria-pressed="' + (view.range === r[0]) + '">' + r[1] + "</button>";
    }).join("");
    var rows = ids.length ? ids.map(function (a) {
      return '<div class="tool"><span class="n">' + esc(name(a)) + '</span><span class="bar2"><i style="width:' + (100 * by[a] / max).toFixed(1) + "%;background:" + color(a) + '"></i></span><span class="t">' + dur(by[a]) + "</span></div>";
    }).join("") : '<p class="lbl" style="text-transform:none;letter-spacing:0">Nothing yet</p>';
    return '<section class="card"><div class="row"><span class="lbl">By tool</span><div class="seg-tabs">' + tabs + '</div></div><div class="tools">' + rows + "</div></section>";
  }

  function evRight(e) {
    var bits = [];
    if (e.n != null) bits.push(e.n + " " + (e.unit || ""));
    if (e.tried) bits.push(Math.round(100 * e.ok / e.tried) + "%");
    if (e.secs != null) bits.push(dur(e.secs));
    return bits.join(" · ").replace(/\s+·/g, " ·").trim();
  }
  function sessionCard(s) {
    var open = !!view.open[s.id], secs = total(s), evs = s.events || [];
    var chips = Object.keys(s.apps).filter(function (a) { return s.apps[a] >= 30; }).sort(function (a, b) { return s.apps[b] - s.apps[a]; }).map(function (a) {
      return '<span class="chip"><span class="dot" style="--c:' + color(a) + '"></span>' + esc(name(a)) + ' <span class="m">' + dur(s.apps[a]) + "</span></span>";
    }).join("");
    var list = open ? evs : evs.slice(-5), hidden = evs.length - list.length;
    var lines = list.slice().reverse().map(function (e) {
      return '<li class="ev"><span class="dot" style="--c:' + color(e.app) + '"></span><span class="x">' + esc(e.text) + '</span><span class="r">' + esc(evRight(e)) + "</span></li>";
    }).join("") + (hidden ? '<li class="ev more"><span></span><span>+' + hidden + " more</span><span></span></li>" : "");
    return '<article class="card sess" data-sess="' + esc(s.id) + '">' +
      '<button class="sess-top" type="button" data-toggle="' + esc(s.id) + '" aria-expanded="' + open + '"><span class="when">' + clock(s.start) + "–" + clock(s.end) + '</span><span class="len">' + dur(secs) + "</span></button>" +
      (chips ? '<div class="chips">' + chips + "</div>" : "") +
      (lines ? '<ul class="evs">' + lines + "</ul>" : "") +
      (open ? '<div class="sess-acts"><button class="del" type="button" data-del="' + esc(s.id) + '">' + (view.confirm === s.id ? "Tap again to delete" : "Delete session") + "</button></div>" : "") +
      "</article>";
  }
  function daysList(D) {
    var keys = Object.keys(D.byDay).sort(function (a, b) { return D.byDay[b].t - D.byDay[a].t; });
    if (view.pick != null) keys = keys.filter(function (k) { return D.byDay[k].t === view.pick; });
    if (!keys.length) return view.pick != null ? '<p class="empty">Nothing that day</p>' : '<p class="empty">Open any tool and play. Time and what you did show up here.</p>';
    var more = keys.length > view.days;
    return keys.slice(0, view.days).map(function (k) {
      var day = D.byDay[k];
      return '<div class="dhead"><h2>' + esc(dayName(day.t)) + "</h2><span>" + dur(day.secs) + "</span></div>" + day.sessions.map(sessionCard).join("");
    }).join("") + (more ? '<button class="more-btn" type="button" id="more">Show more</button>' : "");
  }

  function render() {
    var D = data(), y = window.scrollY;
    main.innerHTML = statsCard(D) + heatCard(D) + toolsCard(D) + daysList(D);
    window.scrollTo(0, y);
  }

  main.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.day) { var t = +b.dataset.day; view.pick = view.pick === t ? null : t; render(); return; }
    if (b.dataset.range) { view.range = b.dataset.range; render(); return; }
    if (b.dataset.toggle) { var id = b.dataset.toggle; view.open[id] = !view.open[id]; view.confirm = null; render(); return; }
    if (b.dataset.del) {
      if (view.confirm === b.dataset.del) { MusicLog.remove(b.dataset.del); view.confirm = null; render(); if (window.MusicLog) MusicLog.sync().catch(function () {}); }
      else { view.confirm = b.dataset.del; render(); }
      return;
    }
    if (b.id === "more") { view.days += 14; render(); }
  });

  window.__logContext = function () {
    var D = data(), today = startOfDay(Date.now()), s = D.sessions[0];
    var out = "In Practice Log. Today: " + dur(secsOn(D.byDay, today)) + ", streak " + streak(D.byDay) + " days.";
    if (s) out += " Last session " + dayName(s.start) + " " + clock(s.start) + ", " + dur(total(s)) + ".";
    return out;
  };

  render();
  if (window.MusicLog) {
    MusicLog.onChange(function () { render(); });
    MusicLog.sync().then(render, function () {});
  }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") render(); });
})();
