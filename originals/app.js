/* Originals: your own songs, in their own tool.

   It used to be a shelf inside School (the idea board). School is now just the curriculum and
   your progress; Originals lives here, on its own.

   - An idea is a song in the making: a title, a status (spark, working, parked, done), key, tempo
     and feel, the idea itself, its lyrics, and a thread of notes added over time.
   - Any Barline chart in a folder called "Originals" is an original too. It is read live from
     Barline's storage, never copied, and opens in Barline.
   - Saved on the device under originals:v1. Signed in to a Music account, ideas follow the
     account, merged idea by idea (newest change wins; deletions kept as tombstones).
   - The first time it opens it brings over the ideas from School's board (school:progress, on
     this device and in the account), keeping their ids so nothing comes over twice.
   - The assistant's Originals tools live here (list_originals, get_original, add_original_idea,
     update_original). From any other page the assistant opens this page as ?bridge=1, which draws
     nothing and only answers. Every write reads the stored copy first. */
(function () {
  "use strict";
  var KEY = "originals:v1", SYNCED = "originals:syncedAt", CLOUD_USER = "originals:cloudUser", IMPORTED = "originals:importedSchool";
  var BRIDGE = /[?&]bridge=1(&|$)/.test(location.search) && self.parent !== self;
  var TOMBSTONE_DAYS = 120;
  var STATUS = [["spark", "Spark"], ["working", "Working"], ["parked", "Parked"], ["done", "Done"]];
  var ST = {};
  STATUS.forEach(function (s) { ST[s[0]] = s[1]; });

  var BACK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6"/></svg>';
  var PLUS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>';

  /* ===================================================================
     Storage
     =================================================================== */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsJson(k) { try { var v = JSON.parse(lsGet(k) || "null"); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  function uid(p) { return p + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  var str = function (v, max) { return String(v == null ? "" : v).slice(0, max || 40000); };
  // School wrote dates as "2026-11-16"; read them as that day at noon.
  function toTime(v) {
    if (typeof v === "number" && isFinite(v)) return v;
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v || ""));
    return m ? new Date(+m[1], +m[2] - 1, +m[3], 12).getTime() : 0;
  }

  function cleanNote(n) {
    if (!n || typeof n !== "object") return null;
    var text = str(n.text, 8000).trim();
    if (!text) return null;
    return { id: str(n.id, 60) || uid("n"), text: text, at: toTime(n.at) || Date.now() };
  }
  function cleanIdea(o) {
    if (!o || typeof o !== "object" || !o.id) return null;
    var t = Number(o.t) || toTime(o.at) || 0;
    if (o.del) return { id: str(o.id, 60), del: true, t: t };
    var notes = Array.isArray(o.notes) ? o.notes.map(cleanNote).filter(Boolean) : [];
    return {
      id: str(o.id, 60), title: str(o.title, 200).trim() || "Untitled idea",
      status: ST[o.status] ? o.status : "spark",
      key: str(o.key, 40).trim(), bpm: str(o.bpm, 20).trim(), feel: str(o.feel, 120).trim(),
      idea: str(o.idea), lyrics: str(o.lyrics), notes: notes,
      at: toTime(o.at) || toTime(o.started) || t || Date.now(), t: t
    };
  }
  function clean(d) {
    d = d && typeof d === "object" ? d : {};
    var seen = {}, ideas = [];
    (Array.isArray(d.ideas) ? d.ideas : []).forEach(function (o) {
      var c = cleanIdea(o);
      if (c && !seen[c.id]) { seen[c.id] = 1; ideas.push(c); }
    });
    return { v: 1, savedAt: Number(d.savedAt) || 0, ideas: ideas };
  }
  function load() { return clean(lsJson(KEY)); }
  function store(d, quiet) {
    d.savedAt = Date.now();
    lsSet(KEY, JSON.stringify(d));
    if (!quiet) queueSync();
  }
  function mutate(fn, noRender) {
    var d = load();
    var r = fn(d);
    store(d);
    if (!noRender) render();
    return r;
  }
  var live = function (d) { return d.ideas.filter(function (o) { return !o.del; }).sort(function (a, b) { return (b.t || b.at) - (a.t || a.at); }); };
  var find = function (d, id) { return d.ideas.filter(function (o) { return o.id === id && !o.del; })[0] || null; };
  var copy = function (o) { return JSON.parse(JSON.stringify(o)); };

  /* ---------- the writes ---------- */
  function createIdea(f) {
    f = f || {};
    return mutate(function (d) {
      var now = Date.now();
      var o = cleanIdea({ id: uid("idea"), title: f.title, status: f.status, key: f.key, bpm: f.bpm, feel: f.feel, idea: f.idea, lyrics: f.lyrics, at: now, t: now });
      d.ideas.push(o);
      return o;
    });
  }
  // patch: any field; add_lyrics appends to the lyrics; add_note adds to the thread. Returns the idea as it was.
  function updateIdea(id, patch, noRender) {
    return mutate(function (d) {
      var o = find(d, id);
      if (!o) return null;
      var prev = copy(o);
      ["title", "key", "bpm", "feel", "idea", "lyrics"].forEach(function (k) { if (patch[k] != null) o[k] = str(patch[k]); });
      if (patch.title != null) o.title = o.title.trim() || "Untitled idea";
      if (patch.status && ST[patch.status]) o.status = patch.status;
      if (patch.add_lyrics) o.lyrics = o.lyrics.replace(/\s+$/, "") + (o.lyrics.trim() ? "\n\n" : "") + str(patch.add_lyrics).trim();
      if (patch.add_note) { var n = cleanNote({ text: patch.add_note }); if (n) o.notes.push(n); }
      if (patch.remove_note) o.notes = o.notes.filter(function (n) { return n.id !== patch.remove_note; });
      o.t = Date.now();
      return prev;
    }, noRender);
  }
  function deleteIdea(id) {
    return mutate(function (d) {
      var o = find(d, id);
      if (!o) return null;
      d.ideas = d.ideas.filter(function (x) { return x.id !== id; });
      d.ideas.push({ id: id, del: true, t: Date.now() });
      return copy(o);
    });
  }
  function restoreIdea(o) {
    return mutate(function (d) {
      d.ideas = d.ideas.filter(function (x) { return x.id !== o.id; });
      var c = cleanIdea(o);
      if (c) { c.t = Date.now(); d.ideas.push(c); }
    });
  }

  /* ---------- bringing over School's board ---------- */
  function fromSchool(orig) {
    if (!orig || typeof orig !== "object") return [];
    var notes = Array.isArray(orig.notes) ? orig.notes : [];
    return (Array.isArray(orig.ideas) ? orig.ideas : []).map(function (i) {
      return cleanIdea({
        id: i.id, title: i.title, status: i.status, key: i.key, bpm: i.bpm, feel: i.feel, idea: i.idea,
        at: i.started || i.at, t: toTime(i.at) || toTime(i.started),
        notes: notes.filter(function (n) { return n && n.target === i.id; }).map(function (n) { return { id: n.id, text: n.text, at: n.at }; })
      });
    }).filter(Boolean);
  }
  // Add what isn't here yet, by id (so a deleted idea never comes back). Returns how many came over.
  function absorb(list) {
    if (!list.length) return 0;
    var d = load(), have = {}, n = 0;
    d.ideas.forEach(function (o) { have[o.id] = 1; });
    list.forEach(function (o) { if (!have[o.id]) { o.t = o.t || Date.now(); d.ideas.push(o); have[o.id] = 1; n++; } });
    if (n) store(d);
    return n;
  }
  function importLocal() {
    if (lsGet(IMPORTED)) return 0;
    var p = lsJson("school:progress");
    var n = absorb(fromSchool(p && p.originals));
    lsSet(IMPORTED, "1");
    return n;
  }

  /* ===================================================================
     Account sync: merged idea by idea
     =================================================================== */
  var syncBusy = false, syncTimer = null;
  var cloud = function () { return (self.MusicCloud && self.MusicCloud.configured && self.MusicCloud.user()) ? self.MusicCloud : null; };
  function queueSync(ms) {
    if (!cloud()) return;
    clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, ms == null ? 2000 : ms);
  }
  function merge(a, b) {
    var by = {}, cut = Date.now() - TOMBSTONE_DAYS * 864e5;
    a.ideas.concat(b ? b.ideas : []).forEach(function (o) {
      var x = by[o.id];
      if (!x || (o.t || 0) > (x.t || 0)) by[o.id] = o;
    });
    var ideas = Object.keys(by).map(function (k) { return by[k]; }).filter(function (o) { return !(o.del && o.t < cut); });
    ideas.sort(function (x, y) { return x.id < y.id ? -1 : 1; });
    return { v: 1, savedAt: Math.max(a.savedAt || 0, (b && b.savedAt) || 0), ideas: ideas };
  }
  var sig = function (d) { return JSON.stringify(d.ideas.slice().sort(function (x, y) { return x.id < y.id ? -1 : 1; })); };
  async function syncNow() {
    var c = cloud();
    if (!c) return;
    if (syncBusy) { queueSync(1500); return; }
    syncBusy = true;
    try {
      var me = c.user(), last = lsGet(CLOUD_USER);
      if (last && last !== me.id) return;                       // someone else's songs on this device: leave both alone
      // School's board in the account (ideas written on another device) comes over once per device.
      if (!lsGet(IMPORTED + ":cloud")) {
        var sch = await c.load("school").catch(function () { return null; });
        var prog = sch && (sch.progress || sch);
        absorb(fromSchool(prog && prog.originals));
        lsSet(IMPORTED + ":cloud", "1");
      }
      var remote = await c.load("originals");
      var rDoc = remote && Array.isArray(remote.ideas) ? clean(remote) : null;
      var local = load(), merged = merge(local, rDoc);
      if (sig(merged) !== sig(local)) { store(merged, true); render(); }
      if (!rDoc || sig(merged) !== sig(rDoc)) await c.save("originals", { app: "originals", version: 1, savedAt: Date.now(), ideas: merged.ideas });
      lsSet(CLOUD_USER, me.id);
      lsSet(SYNCED, String(Date.now()));
    } catch (e) { /* offline or not set up: tried again at the next save */ }
    finally { syncBusy = false; }
  }

  /* ===================================================================
     Barline's originals (read live, never copied)
     =================================================================== */
  function barlineCharts() {
    try {
      var folders = lsJson("barline:folders:v1");
      folders = Array.isArray(folders) ? folders : [];
      var ids = {};
      folders.forEach(function (f) { if (f && /^(my )?originals?$/i.test(String(f.name || "").trim())) ids[f.id] = 1; });
      var charts = lsJson("barline:charts:v1") || {};
      return Object.keys(charts).map(function (k) { return charts[k]; })
        .filter(function (c) { return c && c.id && ids[c.folderId]; })
        .sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    } catch (e) { return []; }
  }

  /* ===================================================================
     The assistant's tools
     =================================================================== */
  function brief(o) {
    var lede = (o.idea || o.lyrics || "").replace(/\s+/g, " ").trim();
    return { id: o.id, title: o.title, status: o.status, key: o.key, bpm: o.bpm, feel: o.feel, idea: lede.slice(0, 240), has_lyrics: !!o.lyrics.trim(), notes: o.notes.length };
  }
  function full(o) {
    return { id: o.id, title: o.title, status: o.status, key: o.key, bpm: o.bpm, feel: o.feel, idea: o.idea, lyrics: o.lyrics,
      notes: o.notes.map(function (n) { return { when: new Date(n.at).toDateString(), text: n.text }; }) };
  }
  var openLink = function (id) { return { href: "originals/#/i/" + id, label: "Open" }; };
  var TOOLS = {
    list_originals: async function () {
      var d = load();
      return { content: { ideas: live(d).map(brief), barline_charts_in_originals: barlineCharts().map(function (c) { return { chart_id: c.id, title: c.title || "Untitled chart", key: c.key || "" }; }) } };
    },
    get_original: async function (inp) {
      var o = find(load(), str(inp && inp.id));
      return o ? { content: full(o) } : { content: "No idea with that id. Use list_originals.", is_error: true };
    },
    add_original_idea: async function (inp) {
      inp = inp || {};
      if (!str(inp.title).trim() && !str(inp.idea).trim() && !str(inp.lyrics).trim()) return { content: "Give it a title, or write the idea.", is_error: true };
      var o = createIdea(inp);
      return { content: { id: o.id, title: o.title }, action: { text: "Added idea: " + o.title, undo: { op: "remove", id: o.id } }, link: openLink(o.id) };
    },
    update_original: async function (inp) {
      inp = inp || {};
      var patch = {};
      ["title", "status", "key", "bpm", "feel", "idea", "lyrics", "add_lyrics", "add_note"].forEach(function (k) { if (inp[k] != null && inp[k] !== "") patch[k] = inp[k]; });
      if (inp.status && !ST[inp.status]) return { content: "status must be spark, working, parked or done", is_error: true };
      if (!Object.keys(patch).length) return { content: "Nothing to change.", is_error: true };
      var prev = updateIdea(str(inp.id), patch);
      if (!prev) return { content: "No idea with that id. Use list_originals.", is_error: true };
      var what = patch.add_lyrics ? "Added lyrics to " : patch.add_note ? "Added a note to " : "Updated ";
      return { content: "ok", action: { text: what + prev.title, undo: { op: "restore", idea: prev } }, link: openLink(prev.id) };
    },
    __undo: async function (p) {
      if (p && p.op === "remove" && p.id) {
        mutate(function (d) { d.ideas = d.ideas.filter(function (x) { return x.id !== p.id; }); d.ideas.push({ id: p.id, del: true, t: Date.now() }); });
        return { content: "ok" };
      }
      if (p && p.op === "restore" && p.idea) { restoreIdea(p.idea); return { content: "ok" }; }
      return { content: "Nothing to undo.", is_error: true };
    }
  };

  var route = { view: "list" };
  function context() {
    if (route.view === "idea") {
      var o = find(load(), route.id);
      if (o) return "In Originals, looking at the idea \"" + o.title + "\" (id " + o.id + "); \"this song\" means it";
    }
    return "In Originals, on the board";
  }
  importLocal();
  if (self.MusicAssistant) self.MusicAssistant.mount({ app: "originals", button: document.getElementById("ai-btn"), context: context, tools: TOOLS });
  if (self.MusicCloud && self.MusicCloud.configured) {
    self.MusicCloud.ready.then(function () { if (cloud()) syncNow(); });
    self.MusicCloud.onChange(function () { if (cloud()) syncNow(); });
  }
  if (BRIDGE) return;

  /* ===================================================================
     The page
     =================================================================== */
  var view = document.getElementById("view");
  var filter = "all";
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function when(t) {
    var d = new Date(t), opt = { month: "short", day: "numeric" };
    if (d.getFullYear() !== new Date().getFullYear()) opt.year = "numeric";
    return d.toLocaleDateString(undefined, opt);
  }
  function readRoute() {
    var m = /^#\/i\/([\w-]+)/.exec(location.hash);
    route = m ? { view: "idea", id: m[1] } : { view: "list" };
  }
  function facts(o) {
    return [o.key, o.bpm ? o.bpm + " bpm" : "", o.feel].filter(Boolean).map(function (f) { return '<span class="fact">' + esc(f) + "</span>"; }).join("");
  }

  function renderList() {
    var d = load(), ideas = live(d), charts = barlineCharts();
    var shown = ideas.filter(function (o) { return filter === "all" || o.status === filter; });
    var h = '<div class="toolbar"><div class="picks st-picks" role="group" aria-label="Status">' +
      [["all", "All"]].concat(STATUS).map(function (s) { return '<button type="button" class="pick" data-f="' + s[0] + '" aria-pressed="' + (filter === s[0]) + '">' + s[1] + "</button>"; }).join("") +
      '</div><button type="button" class="btn pri" id="new">' + PLUS + "<span>New</span></button></div>";
    shown.forEach(function (o) {
      var lede = (o.idea || o.lyrics || "").trim();
      h += '<button type="button" class="idea" data-id="' + esc(o.id) + '"><h3>' + esc(o.title) + "</h3>" +
        (lede ? '<p class="lede">' + esc(lede) + "</p>" : "") +
        '<div class="meta"><span class="st" data-st="' + o.status + '">' + ST[o.status] + "</span>" + facts(o) + "<time>" + esc(when(o.t || o.at)) + "</time></div></button>";
    });
    if (filter === "all" || !shown.length) {
      if (charts.length && filter === "all") {
        h += '<h2 class="day">Charts</h2>';
        charts.forEach(function (c) {
          h += '<a class="idea" href="../barline/#c-' + esc(c.id) + '"><h3>' + esc(String(c.title || "").trim() || "Untitled chart") + "</h3>" +
            '<div class="meta"><span class="fact chart-tag">Barline →</span>' + (c.key ? '<span class="fact">' + esc(c.key) + "</span>" : "") +
            (c.bpm ? '<span class="fact">' + esc(String(c.bpm)) + " bpm</span>" : "") + "</div></a>";
        });
      }
    }
    if (!shown.length && !(filter === "all" && charts.length)) h += '<p class="empty">' + (ideas.length ? "None" : "No originals yet") + "</p>";
    if (filter === "all") h += '<a class="btn" href="../barline/#new-original" style="justify-self:center">' + PLUS + "<span>New chart</span></a>";
    view.innerHTML = h;
    view.querySelectorAll(".st-picks .pick").forEach(function (b) { b.addEventListener("click", function () { filter = b.dataset.f; render(); }); });
    view.querySelector("#new").addEventListener("click", function () {
      var o = createIdea({ title: "" });
      location.hash = "#/i/" + o.id + "/new";
    });
    view.querySelectorAll("button.idea").forEach(function (b) { b.addEventListener("click", function () { location.hash = "#/i/" + b.dataset.id; }); });
  }

  /* ---------- one idea ---------- */
  var editing = null;   // id of the idea whose page is drawn, so redraws from saves don't disturb typing
  function renderIdea(id, fresh) {
    var o = find(load(), id);
    if (!o) { view.innerHTML = '<p class="empty">Not found</p>'; editing = null; return; }
    if (editing === id && view.querySelector(".ed")) { drawThread(o); syncFields(o); return; }
    editing = id;
    view.innerHTML =
      '<div class="pile-head"><a class="icon-btn" href="#/" aria-label="All originals">' + BACK + '</a><span class="grow"></span></div>' +
      '<div class="ed">' +
        '<input class="ed-title" id="f-title" placeholder="Title" autocomplete="off" aria-label="Title">' +
        '<div class="picks st-picks" role="radiogroup" aria-label="Status">' + STATUS.map(function (s) { return '<button type="button" class="pick" data-st="' + s[0] + '" aria-pressed="false">' + s[1] + "</button>"; }).join("") + "</div>" +
        '<div class="fields"><label>Key<input id="f-key" autocomplete="off" placeholder="–"></label><label>BPM<input id="f-bpm" inputmode="numeric" autocomplete="off" placeholder="–"></label><label>Feel<input id="f-feel" autocomplete="off" placeholder="–"></label></div>' +
        '<div class="box"><h3>Idea</h3><textarea id="f-idea" rows="3" aria-label="Idea"></textarea></div>' +
        '<div class="box"><h3>Lyrics</h3><textarea id="f-lyrics" class="lyr" rows="5" aria-label="Lyrics"></textarea></div>' +
        '<div class="thread"><h3>Notes</h3><div id="notes" class="thread"></div>' +
          '<form class="add-note" id="note-form"><textarea id="f-note" rows="1" placeholder="Add a note" aria-label="Add a note"></textarea><button type="submit" class="btn">Add</button></form></div>' +
        '<div class="ed-foot"><button type="button" class="btn bad" id="del">Delete</button></div>' +
      "</div>";
    syncFields(o, true);
    drawThread(o);
    var fields = { title: "f-title", key: "f-key", bpm: "f-bpm", feel: "f-feel", idea: "f-idea", lyrics: "f-lyrics" };
    var timer = null;
    var save = function () {
      clearTimeout(timer);
      var patch = {};
      Object.keys(fields).forEach(function (k) { patch[k] = document.getElementById(fields[k]).value; });
      var cur = find(load(), id);
      if (!cur) return;
      var changed = Object.keys(patch).some(function (k) { return (k === "title" ? (patch[k].trim() || "Untitled idea") : patch[k]) !== cur[k]; });
      if (changed) updateIdea(id, patch, true);
    };
    Object.keys(fields).forEach(function (k) {
      var el = document.getElementById(fields[k]);
      el.addEventListener("input", function () { if (el.tagName === "TEXTAREA") grow(el); clearTimeout(timer); timer = setTimeout(save, 600); });
      el.addEventListener("blur", save);
    });
    window.addEventListener("pagehide", save, { once: true });
    view.querySelectorAll(".st-picks .pick").forEach(function (b) {
      b.addEventListener("click", function () { save(); updateIdea(id, { status: b.dataset.st }, true); syncFields(find(load(), id)); });
    });
    var nt = document.getElementById("f-note");
    nt.addEventListener("input", function () { grow(nt); });
    nt.addEventListener("keydown", function (e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); addNote(); } });
    document.getElementById("note-form").addEventListener("submit", function (e) { e.preventDefault(); addNote(); });
    function addNote() {
      if (!nt.value.trim()) { nt.focus(); return; }
      updateIdea(id, { add_note: nt.value }, true);
      nt.value = ""; grow(nt);
      drawThread(find(load(), id));
    }
    document.getElementById("del").addEventListener("click", function () {
      save();
      var prev = deleteIdea(id);
      location.hash = "#/";
      if (prev) toast("Deleted", function () { restoreIdea(prev); });
    });
    if (fresh) document.getElementById("f-title").focus();
  }
  // Put stored values into the fields that aren't being typed in.
  function syncFields(o, all) {
    var map = { "f-title": o.title === "Untitled idea" && all ? "" : o.title, "f-key": o.key, "f-bpm": o.bpm, "f-feel": o.feel, "f-idea": o.idea, "f-lyrics": o.lyrics };
    Object.keys(map).forEach(function (fid) {
      var el = document.getElementById(fid);
      if (!el || (!all && document.activeElement === el)) return;
      if (fid === "f-title" && !all && el.value === "" && o.title === "Untitled idea") return;
      if (el.value !== map[fid]) el.value = map[fid];
      if (el.tagName === "TEXTAREA") grow(el);
    });
    view.querySelectorAll(".st-picks .pick").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.st === o.status)); });
  }
  function drawThread(o) {
    var box = document.getElementById("notes");
    if (!box) return;
    box.innerHTML = o.notes.slice().sort(function (a, b) { return b.at - a.at; }).map(function (n) {
      return '<div class="tnote"><p>' + esc(n.text) + '</p><div class="meta"><time>' + esc(when(n.at)) + '</time><button type="button" class="x" data-n="' + esc(n.id) + '">Remove</button></div></div>';
    }).join("");
    box.querySelectorAll(".x").forEach(function (b) {
      b.addEventListener("click", function () {
        var prev = updateIdea(o.id, { remove_note: b.dataset.n }, true);
        drawThread(find(load(), o.id));
        if (prev) toast("Removed", function () { restoreIdea(prev); editing = null; render(); });
      });
    });
  }
  function grow(el) { el.style.height = "auto"; el.style.height = (el.scrollHeight + 2) + "px"; }

  function render() {
    if (BRIDGE || !view) return;
    if (route.view === "idea") renderIdea(route.id, /\/new$/.test(location.hash));
    else { editing = null; var y = window.scrollY; renderList(); window.scrollTo(0, y); }
  }

  /* ---------- toast ---------- */
  var toastTimer = null;
  function toast(msg, undo) {
    var old = document.querySelector(".toast");
    if (old) old.remove();
    var t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status");
    t.appendChild(document.createTextNode(msg));
    if (undo) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = "Undo";
      b.addEventListener("click", function () { t.remove(); undo(); });
      t.appendChild(b);
    }
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, undo ? 5000 : 2200);
  }

  window.addEventListener("hashchange", function () {
    var was = route;
    readRoute();
    // A brand-new idea left without a word in it is dropped.
    if (was.view === "idea" && (route.view !== "idea" || route.id !== was.id)) {
      var o = find(load(), was.id);
      if (o && o.title === "Untitled idea" && !o.idea.trim() && !o.lyrics.trim() && !o.key && !o.bpm && !o.feel && !o.notes.length)
        mutate(function (d) { d.ideas = d.ideas.filter(function (x) { return x.id !== o.id; }); d.ideas.push({ id: o.id, del: true, t: Date.now() }); }, true);
    }
    editing = null; render(); window.scrollTo(0, 0);
  });
  window.addEventListener("storage", function (e) { if (e.key === KEY || e.key === "barline:charts:v1" || e.key === "barline:folders:v1") render(); });
  window.addEventListener("pageshow", function (e) { if (e.persisted) render(); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") { render(); queueSync(300); } });
  readRoute();
  render();
  window.__originals = { load: load, tools: TOOLS };
})();
