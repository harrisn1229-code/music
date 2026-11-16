/* Scratchpad: a daily brain dump for song ideas, lyrics and anything else, and the piles the
   assistant sorts it into.

   - A note is whatever was typed or dictated in one go. It stays exactly as written.
   - Sorting splits a note into pieces, each filed in a pile (Song ideas, Lyrics, Chords & riffs,
     Practice, Production, Gear, To do, Other). The assistant does it ("Sort"), sending what
     belongs elsewhere in Music on its way (a song idea to the Originals board, a progression to a
     Barline chart in Originals) and noting where each piece went. A note can also be filed by hand.
   - Saved on the device under scratchpad:v1. Signed in to a Music account, notes follow the
     account; two devices are merged note by note (newest change wins, deletions are kept as
     tombstones so they don't come back).
   - The assistant's tools live here (list_scratch, add_scratch, sort_scratch). From any other
     page the assistant opens this page as ?bridge=1, which draws nothing and only answers.
   Every write reads the stored copy first, so a hidden copy and a visible one never undo each other. */
(function () {
  "use strict";
  var KEY = "scratchpad:v1", DRAFT = "scratchpad:draft", SYNCED = "scratchpad:syncedAt", CLOUD_USER = "scratchpad:cloudUser";
  var BRIDGE = /[?&]bridge=1(&|$)/.test(location.search) && self.parent !== self;
  var TOMBSTONE_DAYS = 120;

  var PILES = [
    { id: "song", name: "Song ideas", c: "#C2410C" },
    { id: "lyrics", name: "Lyrics", c: "#7C3AED" },
    { id: "chords", name: "Chords & riffs", c: "#0F766E" },
    { id: "practice", name: "Practice", c: "#4D45E3" },
    { id: "production", name: "Production", c: "#BE185D" },
    { id: "gear", name: "Gear", c: "#475569" },
    { id: "todo", name: "To do", c: "#2F8F4E" },
    { id: "other", name: "Other", c: "#8A8F99" }
  ];
  var PILE = {};
  PILES.forEach(function (p) { PILE[p.id] = p; });

  var SPARK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M9 2.5l1.7 4.8 4.8 1.7-4.8 1.7L9 15.5l-1.7-4.8L2.5 9l4.8-1.7z"/><path d="M15.5 12.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/></svg>';
  var MIC = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="6" height="10" rx="3"/><path d="M4.5 9.5a5.5 5.5 0 0011 0M10 15v2.5"/></svg>';
  var BACK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6"/></svg>';
  var CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';

  /* ===================================================================
     Storage
     =================================================================== */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function uid(p) { return p + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  var str = function (v, max) { return String(v == null ? "" : v).slice(0, max || 20000); };

  function cleanPiece(p) {
    if (!p || typeof p !== "object") return null;
    var text = str(p.text).trim();
    if (!text) return null;
    return { id: str(p.id, 60) || uid("p"), text: text, pile: PILE[p.pile] ? p.pile : "other", sent: str(p.sent, 200).trim(), done: p.done === true };
  }
  function cleanNote(n) {
    if (!n || typeof n !== "object" || !n.id) return null;
    var t = Number(n.t) || Number(n.at) || 0;
    if (n.del) return { id: str(n.id, 60), del: true, t: t };
    var text = str(n.text);
    if (!text.trim()) return null;
    var pieces = Array.isArray(n.pieces) ? n.pieces.map(cleanPiece).filter(Boolean) : [];
    return { id: str(n.id, 60), text: text, at: Number(n.at) || t || Date.now(), t: t, sorted: n.sorted === true && pieces.length > 0, pieces: pieces };
  }
  function clean(d) {
    d = d && typeof d === "object" ? d : {};
    var seen = {}, notes = [];
    (Array.isArray(d.notes) ? d.notes : []).forEach(function (n) {
      var c = cleanNote(n);
      if (c && !seen[c.id]) { seen[c.id] = 1; notes.push(c); }
    });
    return { v: 1, savedAt: Number(d.savedAt) || 0, notes: notes };
  }
  function load() {
    var d = null;
    try { d = JSON.parse(lsGet(KEY) || "null"); } catch (e) {}
    return clean(d);
  }
  function store(d, quiet) {
    d.savedAt = Date.now();
    lsSet(KEY, JSON.stringify(d));
    if (!quiet) queueSync();
  }
  // Read, change, save, redraw. fn gets the stored document and returns anything.
  function mutate(fn) {
    var d = load();
    var r = fn(d);
    store(d);
    render();
    return r;
  }
  var liveNotes = function (d) { return d.notes.filter(function (n) { return !n.del; }).sort(function (a, b) { return b.at - a.at; }); };
  var findNote = function (d, id) { return d.notes.filter(function (n) { return n.id === id && !n.del; })[0] || null; };

  /* ---------- the writes ---------- */
  function addNote(text, when) {
    text = str(text).replace(/\s+$/, "");
    if (!text.trim()) return null;
    return mutate(function (d) {
      var now = Date.now(), n = { id: uid("n"), text: text, at: when || now, t: now, sorted: false, pieces: [] };
      d.notes.push(n);
      return n.id;
    });
  }
  function editNote(id, patch) {
    return mutate(function (d) {
      var n = findNote(d, id);
      if (!n) return null;
      var prev = JSON.parse(JSON.stringify(n));
      if ("text" in patch) n.text = str(patch.text);
      if ("pieces" in patch) { n.pieces = (patch.pieces || []).map(cleanPiece).filter(Boolean); n.sorted = n.pieces.length > 0; }
      if ("sorted" in patch && !patch.sorted) { n.sorted = false; n.pieces = []; }
      n.t = Date.now();
      return prev;
    });
  }
  function deleteNote(id) {
    return mutate(function (d) {
      var n = findNote(d, id);
      if (!n) return null;
      var prev = JSON.parse(JSON.stringify(n));
      d.notes = d.notes.filter(function (x) { return x.id !== id; });
      d.notes.push({ id: id, del: true, t: Date.now() });
      return prev;
    });
  }
  function restoreNote(copy) {
    return mutate(function (d) {
      d.notes = d.notes.filter(function (x) { return x.id !== copy.id; });
      var c = cleanNote(copy);
      if (c) { c.t = Date.now(); d.notes.push(c); }
    });
  }
  function editPiece(noteId, pieceId, patch) {
    return mutate(function (d) {
      var n = findNote(d, noteId);
      if (!n) return null;
      var p = n.pieces.filter(function (x) { return x.id === pieceId; })[0];
      if (!p) return null;
      var prev = JSON.parse(JSON.stringify(n.pieces));
      if (patch.remove) n.pieces = n.pieces.filter(function (x) { return x.id !== pieceId; });
      if ("done" in patch) p.done = !!patch.done;
      if (patch.pile && PILE[patch.pile]) p.pile = patch.pile;
      n.sorted = n.pieces.length > 0;
      n.t = Date.now();
      return prev;
    });
  }

  /* ===================================================================
     Account sync: merged note by note
     =================================================================== */
  var syncBusy = false, syncTimer = null;
  var cloud = function () { return (self.MusicCloud && self.MusicCloud.configured && self.MusicCloud.user()) ? self.MusicCloud : null; };
  function queueSync(ms) {
    if (!cloud()) return;
    clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, ms == null ? 2000 : ms);
  }
  function merge(a, b) {
    var by = {}, cut = Date.now() - TOMBSTONE_DAYS * 864e5;
    a.notes.concat(b ? b.notes : []).forEach(function (n) {
      var o = by[n.id];
      if (!o || (n.t || 0) > (o.t || 0)) by[n.id] = n;
    });
    var notes = Object.keys(by).map(function (k) { return by[k]; }).filter(function (n) { return !(n.del && n.t < cut); });
    notes.sort(function (x, y) { return (x.at || x.t || 0) - (y.at || y.t || 0) || (x.id < y.id ? -1 : 1); });
    return { v: 1, savedAt: Math.max(a.savedAt || 0, (b && b.savedAt) || 0), notes: notes };
  }
  var sig = function (d) { return JSON.stringify(d.notes.slice().sort(function (x, y) { return x.id < y.id ? -1 : 1; })); };
  async function syncNow() {
    var c = cloud();
    if (!c) return;
    if (syncBusy) { queueSync(1500); return; }
    syncBusy = true;
    try {
      var me = c.user(), last = lsGet(CLOUD_USER);
      if (last && last !== me.id) return;                      // someone else's notes on this device: leave both alone
      var remote = await c.load("scratchpad");
      var rDoc = remote && Array.isArray(remote.notes) ? clean(remote) : null;
      var local = load(), merged = merge(local, rDoc);
      if (sig(merged) !== sig(local)) { store(merged, true); render(); }
      if (!rDoc || sig(merged) !== sig(rDoc)) await c.save("scratchpad", { app: "scratchpad", version: 1, savedAt: Date.now(), notes: merged.notes });
      lsSet(CLOUD_USER, me.id);
      lsSet(SYNCED, String(Date.now()));
    } catch (e) { /* offline or not set up: tried again at the next save */ }
    finally { syncBusy = false; }
  }
  if (self.MusicCloud && self.MusicCloud.configured) {
    self.MusicCloud.ready.then(function () { if (cloud()) syncNow(); });
    self.MusicCloud.onChange(function () { if (cloud()) syncNow(); });
  }

  /* ===================================================================
     Words
     =================================================================== */
  var DAY = 864e5;
  function startOfDay(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function dayLabel(t) {
    var s = startOfDay(t), today = startOfDay(Date.now());
    if (s === today) return "Today";
    if (s === today - DAY) return "Yesterday";
    var d = new Date(t), opt = { weekday: "short", month: "short", day: "numeric" };
    if (d.getFullYear() !== new Date().getFullYear()) opt.year = "numeric";
    return d.toLocaleDateString(undefined, opt);
  }
  function timeLabel(t) { return new Date(t).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }); }
  function whenLabel(t) { return dayLabel(t) + ", " + timeLabel(t); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function tag(pile, sent) {
    var p = PILE[pile] || PILE.other;
    return '<span class="tag" style="--c:' + p.c + '"><i></i>' + esc(p.name) + (sent ? '<em>→ ' + esc(sent) + '</em>' : "") + "</span>";
  }
  function noteTags(n) {
    if (!n.sorted) return '<span class="tag new">Unsorted</span>';
    var seen = {}, out = [];
    n.pieces.forEach(function (p) {
      var k = p.pile + "|" + p.sent;
      if (!seen[k]) { seen[k] = 1; out.push(tag(p.pile, p.sent)); }
    });
    return out.join("");
  }

  /* ===================================================================
     The assistant's tools
     =================================================================== */
  function brief(n) {
    var o = { id: n.id, when: whenLabel(n.at), text: n.text };
    if (n.sorted) o.pieces = n.pieces.map(function (p) { return { pile: p.pile, text: p.text, sent_to: p.sent || "", done: p.done }; });
    return o;
  }
  var TOOLS = {
    list_scratch: async function (inp) {
      inp = inp || {};
      var d = load(), notes = liveNotes(d), status = inp.status || (inp.pile ? "all" : "unsorted");
      var limit = Math.max(1, Math.min(200, Number(inp.limit) || 50));
      if (inp.pile) {
        if (!PILE[inp.pile]) return { content: "pile must be one of " + PILES.map(function (p) { return p.id; }).join(", "), is_error: true };
        var out = [];
        notes.forEach(function (n) {
          n.pieces.forEach(function (p) {
            if (p.pile === inp.pile && (inp.include_done || !p.done)) out.push({ note_id: n.id, when: whenLabel(n.at), text: p.text, sent_to: p.sent || "", done: p.done });
          });
        });
        return { content: { pile: PILE[inp.pile].name, pieces: out.slice(0, limit), total: out.length } };
      }
      var pick = notes.filter(function (n) { return status === "all" || (status === "sorted" ? n.sorted : !n.sorted); });
      return { content: { status: status, notes: pick.slice(0, limit).map(brief), total: pick.length, unsorted_total: notes.filter(function (n) { return !n.sorted; }).length } };
    },
    add_scratch: async function (inp) {
      var text = str(inp && inp.text).trim();
      if (!text) return { content: "Give the text to jot down.", is_error: true };
      var id = addNote(text);
      var short = text.replace(/\s+/g, " ");
      if (short.length > 48) short = short.slice(0, 46).replace(/\s\S*$/, "") + "…";
      return { content: { id: id }, action: { text: "Jotted in Scratchpad: " + short, undo: { op: "remove", id: id } }, link: { href: "scratchpad/", label: "Open" } };
    },
    sort_scratch: async function (inp) {
      inp = inp || {};
      var pieces = Array.isArray(inp.pieces) ? inp.pieces : [];
      var bad = pieces.filter(function (p) { return !p || !PILE[p.pile]; });
      if (bad.length) return { content: "Each piece needs a pile: " + PILES.map(function (p) { return p.id; }).join(", "), is_error: true };
      var parts = pieces.map(function (p) { return { text: p.text, pile: p.pile, sent: p.sent_to || "" }; }).map(cleanPiece).filter(Boolean);
      if (!parts.length) return { content: "Give at least one piece with text.", is_error: true };
      var prev = editNote(str(inp.note_id), { pieces: parts });
      if (!prev) return { content: "No note with that id. Use list_scratch.", is_error: true };
      var names = [];
      parts.forEach(function (p) { var nm = PILE[p.pile].name; if (names.indexOf(nm) < 0) names.push(nm); });
      return { content: "ok", action: { text: "Sorted a note into " + names.join(", "), undo: { op: "pieces", id: prev.id, sorted: prev.sorted, pieces: prev.pieces } } };
    },
    __undo: async function (p) {
      if (p && p.op === "remove" && p.id) {
        mutate(function (d) { d.notes = d.notes.filter(function (x) { return x.id !== p.id; }); d.notes.push({ id: p.id, del: true, t: Date.now() }); });
        return { content: "ok" };
      }
      if (p && p.op === "pieces" && p.id) {
        var r = p.sorted ? editNote(p.id, { pieces: p.pieces || [] }) : editNote(p.id, { sorted: false });
        return r ? { content: "ok" } : { content: "That note is gone.", is_error: true };
      }
      return { content: "Nothing to undo.", is_error: true };
    }
  };

  function context() {
    var d = load(), un = liveNotes(d).filter(function (n) { return !n.sorted; }).length;
    var where = route.view === "pile" ? "the " + PILE[route.pile].name + " pile" : route.view === "piles" ? "the piles" : "the dump page";
    return "In Scratchpad, on " + where + "; " + un + " unsorted note" + (un === 1 ? "" : "s");
  }
  if (self.MusicAssistant) self.MusicAssistant.mount({ app: "scratchpad", button: document.getElementById("ai-btn"), context: context, tools: TOOLS });
  if (BRIDGE) return;

  /* ===================================================================
     The page
     =================================================================== */
  var $ = function (id) { return document.getElementById(id); };
  var view = $("view");
  var route = { view: "dump" };
  var showDone = false;

  function readRoute() {
    var h = location.hash.replace(/^#\/?/, "");
    var m = /^pile\/([a-z]+)/.exec(h);
    if (m && PILE[m[1]]) route = { view: "pile", pile: m[1] };
    else if (/^piles/.test(h)) route = { view: "piles" };
    else route = { view: "dump" };
  }

  var composer = null;   // kept across redraws so typing is never interrupted
  function buildComposer() {
    var card = document.createElement("form");
    card.className = "card composer";
    card.innerHTML = '<textarea id="dump" rows="3" placeholder="What’s on your mind?" aria-label="New note" enterkeyhint="enter"></textarea>' +
      '<div class="row">' + (SR ? '<button type="button" class="btn" id="mic" aria-label="Dictate">' + MIC + '<span>Talk</span></button>' : "") +
      '<span class="grow"></span><button type="submit" class="btn pri" id="save">Save</button></div>';
    var ta = card.querySelector("textarea");
    ta.value = lsGet(DRAFT) || "";
    ta.addEventListener("input", function () { lsSet(DRAFT, ta.value || null); autosize(ta); });
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); save(); }
    });
    card.addEventListener("submit", function (e) { e.preventDefault(); save(); });
    var mic = card.querySelector("#mic");
    if (mic) mic.addEventListener("click", function () { dictate(mic, ta); });
    function save() {
      if (listening) listening.stop();
      var v = ta.value;
      if (!v.trim()) { ta.focus(); return; }
      addNote(v);
      ta.value = ""; lsSet(DRAFT, null); autosize(ta);
      toast("Saved");
    }
    composer = card;
    setTimeout(function () { autosize(ta); }, 0);
    return card;
  }
  function autosize(ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight + 2, window.innerHeight * 0.5) + "px"; }

  // Speech to text where the browser has it; the keyboard's own mic always works too.
  var SR = self.SpeechRecognition || self.webkitSpeechRecognition, listening = null;
  function dictate(btn, ta) {
    if (listening) { listening.stop(); return; }
    var rec;
    try { rec = new SR(); } catch (e) { return; }
    rec.lang = navigator.language || "en-US";
    rec.interimResults = true;
    rec.continuous = true;
    var base = ta.value ? ta.value.replace(/\s*$/, " ") : "";
    rec.onresult = function (e) {
      var s = "";
      for (var i = 0; i < e.results.length; i++) s += e.results[i][0].transcript;
      ta.value = base + s; lsSet(DRAFT, ta.value); autosize(ta);
    };
    rec.onend = function () { listening = null; btn.classList.remove("on"); btn.lastChild.textContent = "Talk"; };
    listening = rec;
    btn.classList.add("on"); btn.lastChild.textContent = "Listening…";
    try { rec.start(); } catch (e) { listening = null; btn.classList.remove("on"); btn.lastChild.textContent = "Talk"; }
  }

  function sortWithAI() {
    var A = self.MusicAssistant;
    if (A && A.ask) A.ask("Sort my unsorted Scratchpad notes.");
    else if (A) A.open();
  }

  function renderDump(d) {
    var notes = liveNotes(d), un = notes.filter(function (n) { return !n.sorted; }).length;
    var frag = document.createDocumentFragment();
    if (un) {
      var bar = document.createElement("div");
      bar.className = "card sortbar";
      bar.innerHTML = '<span class="grow"><b>' + un + '</b> <span>unsorted</span></span><button type="button" class="btn acc" id="sort">' + SPARK + '<span>Sort</span></button>';
      bar.querySelector("#sort").addEventListener("click", sortWithAI);
      frag.appendChild(bar);
    }
    var lastDay = null;
    notes.forEach(function (n) {
      var day = dayLabel(n.at);
      if (day !== lastDay) {
        var h = document.createElement("h2");
        h.className = "day"; h.textContent = day;
        frag.appendChild(h);
        lastDay = day;
      }
      var b = document.createElement("button");
      b.type = "button"; b.className = "note"; b.dataset.id = n.id;
      b.innerHTML = '<div class="txt">' + esc(n.text) + '</div><div class="meta"><time>' + esc(timeLabel(n.at)) + "</time>" + noteTags(n) + "</div>";
      b.addEventListener("click", function () { openNote(n.id); });
      frag.appendChild(b);
    });
    return frag;
  }

  function pileCounts(d) {
    var c = {};
    PILES.forEach(function (p) { c[p.id] = 0; });
    liveNotes(d).forEach(function (n) { n.pieces.forEach(function (p) { if (!p.done) c[p.pile]++; }); });
    return c;
  }
  function renderPiles(d) {
    var c = pileCounts(d), grid = document.createElement("div");
    grid.className = "tiles";
    PILES.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "tile" + (c[p.id] ? "" : " zero");
      a.href = "#/pile/" + p.id;
      a.style.setProperty("--c", p.c);
      a.innerHTML = "<i></i><b>" + esc(p.name) + "</b><span>" + c[p.id] + "</span>";
      grid.appendChild(a);
    });
    return grid;
  }
  function renderPile(d, id) {
    var pile = PILE[id], frag = document.createDocumentFragment();
    var head = document.createElement("div");
    head.className = "pile-head";
    head.innerHTML = '<a class="icon-btn" href="#/piles" aria-label="All piles">' + BACK + '</a><h2 style="--c:' + pile.c + '"><i></i>' + esc(pile.name) + "</h2>";
    frag.appendChild(head);
    var open = [], done = [];
    liveNotes(d).forEach(function (n) {
      n.pieces.forEach(function (p) { if (p.pile === id) (p.done ? done : open).push({ n: n, p: p }); });
    });
    var list = document.createElement("div");
    list.className = "pieces";
    var draw = function (x) {
      var row = document.createElement("div");
      row.className = "piece" + (x.p.done ? " done" : "");
      row.style.setProperty("--c", pile.c);
      row.innerHTML = '<button type="button" class="chk" aria-pressed="' + x.p.done + '" aria-label="Done">' + CHECK + '</button>' +
        '<button type="button" class="body"><div class="txt">' + esc(x.p.text) + '</div><div class="meta"><time>' + esc(dayLabel(x.n.at)) + "</time>" +
        (x.p.sent ? '<span class="tag"><em>→ ' + esc(x.p.sent) + "</em></span>" : "") + "</div></button>";
      row.querySelector(".chk").addEventListener("click", function () { editPiece(x.n.id, x.p.id, { done: !x.p.done }); });
      row.querySelector(".body").addEventListener("click", function () { openPiece(x.n.id, x.p.id); });
      list.appendChild(row);
    };
    open.forEach(draw);
    if (showDone) done.forEach(draw);
    if (!open.length && !(showDone && done.length)) {
      var e = document.createElement("p");
      e.className = "empty"; e.textContent = "Empty";
      list.appendChild(e);
    }
    frag.appendChild(list);
    if (done.length) {
      var t = document.createElement("button");
      t.type = "button"; t.className = "btn show-done";
      t.textContent = (showDone ? "Hide done" : "Show done") + " (" + done.length + ")";
      t.addEventListener("click", function () { showDone = !showDone; render(); });
      frag.appendChild(t);
    }
    return frag;
  }

  function render() {
    if (BRIDGE || !view) return;
    var d = load();
    $("tab-dump").setAttribute("aria-selected", String(route.view === "dump"));
    $("tab-piles").setAttribute("aria-selected", String(route.view !== "dump"));
    var y = window.scrollY;
    var node = route.view === "dump" ? renderDump(d) : route.view === "piles" ? renderPiles(d) : renderPile(d, route.pile);
    // The composer stays put across redraws, so typing never loses the caret or the keyboard.
    Array.prototype.slice.call(view.childNodes).forEach(function (c) { if (c !== composer) view.removeChild(c); });
    if (route.view === "dump") {
      if (!composer) buildComposer();
      if (composer.parentNode !== view) view.insertBefore(composer, view.firstChild);
    } else if (composer && composer.parentNode) composer.parentNode.removeChild(composer);
    view.appendChild(node);
    window.scrollTo(0, y);
  }

  /* ---------- sheets ---------- */
  var sheet = null;
  function closeSheet() {
    if (!sheet) return;
    sheet.remove(); sheet = null;
    document.removeEventListener("keydown", onSheetKey, true);
  }
  function onSheetKey(e) { if (e.key === "Escape") { e.stopPropagation(); closeSheet(); } }
  function openSheet(html) {
    closeSheet();
    var s = document.createElement("div");
    s.className = "scrim";
    s.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + html + "</div>";
    s.addEventListener("click", function (e) { if (e.target === s) closeSheet(); });
    document.body.appendChild(s);
    document.addEventListener("keydown", onSheetKey, true);
    sheet = s;
    return s.querySelector(".sheet");
  }
  function pickRow(sel) {
    return '<div class="picks">' + PILES.map(function (p) {
      return '<button type="button" class="pick" data-pile="' + p.id + '" aria-pressed="' + (p.id === sel) + '" style="--c:' + p.c + '"><i></i>' + esc(p.name) + "</button>";
    }).join("") + "</div>";
  }

  function openNote(id) {
    var n = findNote(load(), id);
    if (!n) return;
    var html = '<p class="when">' + esc(whenLabel(n.at)) + '</p><textarea aria-label="Note">' + esc(n.text) + "</textarea>";
    if (n.sorted) {
      html += "<h3>Sorted</h3><div class=\"pieces\">" + n.pieces.map(function (p) {
        return '<div class="piece"><div class="body"><div class="txt">' + esc(p.text) + '</div><div class="meta">' + tag(p.pile, p.sent) + "</div></div></div>";
      }).join("") + "</div>";
    } else {
      html += "<h3>File in</h3>" + pickRow("");
    }
    html += '<div class="actions"><button type="button" class="btn bad" data-act="del">Delete</button>' +
      (n.sorted ? '<button type="button" class="btn" data-act="resort">Unsort</button>' : "") +
      '<button type="button" class="btn pri" data-act="done">Done</button></div>';
    var s = openSheet(html), ta = s.querySelector("textarea");
    var keepText = function () { if (ta.value.trim() && ta.value !== n.text) editNote(id, { text: ta.value }); };
    s.querySelectorAll(".pick").forEach(function (b) {
      b.addEventListener("click", function () {
        keepText();
        var cur = findNote(load(), id);
        if (cur) editNote(id, { pieces: [{ text: cur.text, pile: b.dataset.pile, sent: "" }] });
        closeSheet(); toast("Filed in " + PILE[b.dataset.pile].name);
      });
    });
    s.querySelector('[data-act="done"]').addEventListener("click", function () { keepText(); closeSheet(); });
    s.querySelector('[data-act="del"]').addEventListener("click", function () {
      var prev = deleteNote(id);
      closeSheet();
      if (prev) toast("Deleted", function () { restoreNote(prev); });
    });
    var rs = s.querySelector('[data-act="resort"]');
    if (rs) rs.addEventListener("click", function () {
      keepText();
      var prev = editNote(id, { sorted: false });
      closeSheet();
      if (prev) toast("Back in the dump", function () { editNote(id, { pieces: prev.pieces }); });
    });
  }

  function openPiece(noteId, pieceId) {
    var n = findNote(load(), noteId);
    var p = n && n.pieces.filter(function (x) { return x.id === pieceId; })[0];
    if (!p) return;
    var html = '<p class="when">' + esc(whenLabel(n.at)) + (p.sent ? " · → " + esc(p.sent) : "") + '</p>' +
      '<div class="piece"><div class="body"><div class="txt">' + esc(p.text) + "</div></div></div>" +
      "<h3>Move to</h3>" + pickRow(p.pile) +
      '<div class="actions"><button type="button" class="btn bad" data-act="del">Remove</button>' +
      '<button type="button" class="btn" data-act="copy">Copy</button>' +
      '<button type="button" class="btn" data-act="note">Whole note</button>' +
      '<button type="button" class="btn pri" data-act="close">Done</button></div>';
    var s = openSheet(html);
    s.querySelectorAll(".pick").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.dataset.pile === p.pile) return;
        editPiece(noteId, pieceId, { pile: b.dataset.pile });
        closeSheet(); toast("Moved to " + PILE[b.dataset.pile].name);
      });
    });
    s.querySelector('[data-act="close"]').addEventListener("click", closeSheet);
    s.querySelector('[data-act="note"]').addEventListener("click", function () { closeSheet(); openNote(noteId); });
    s.querySelector('[data-act="copy"]').addEventListener("click", function () {
      var done = function () { closeSheet(); toast("Copied"); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.text).then(done, done); else done();
    });
    s.querySelector('[data-act="del"]').addEventListener("click", function () {
      var prev = editPiece(noteId, pieceId, { remove: true });
      closeSheet();
      if (prev) toast("Removed", function () { editNote(noteId, { pieces: prev }); });
    });
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

  /* ---------- start ---------- */
  window.addEventListener("hashchange", function () { readRoute(); closeSheet(); render(); window.scrollTo(0, 0); });
  // The assistant (or another tab) changed the notes: draw them.
  window.addEventListener("storage", function (e) { if (e.key === KEY) render(); });
  window.addEventListener("pageshow", function (e) { if (e.persisted) render(); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") { render(); queueSync(300); } });
  readRoute();
  render();
  window.__scratchpad = { load: load, tools: TOOLS, PILES: PILES };
})();
