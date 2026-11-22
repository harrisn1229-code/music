/* Metronome's drills: the technique drills and practice routines from Library's Drills shelf, to
   practise with the click. Each run is logged into Library's practice history.

   The list
     Read from School's curriculum (school/data/curriculum.json), the same file the Drills shelf
     draws from, so a drill added there shows up here with nothing else to do. That file is the
     whole curriculum (megabytes), so only the drills are kept, on this device under
     "metronome:drills:v1", and the file is read again only when School's copy of it changes.
     School's own worker keeps the file offline; it is read from there first, else from the network.

   The practice history
     "library:practice" is the record Library's drill pages show and the assistant reads. A run is
     written in the shape School writes (newest first: {date, tempo, mins, note}), and every run of
     the same drill on the same day adds to one entry (`by: "metronome"`, with `secs` so short runs
     add up exactly). The drill's `t` is stamped so Library's merge (newest write wins, drill by
     drill) keeps it. With a Music account the record is merged into the account's "practice"
     document exactly as School does it. */
(function () {
  "use strict";
  var CAT = "metronome:drills:v1", PR_KEY = "library:practice", PR_USER = "library:practiceUser";
  var CURR = new URL("../school/data/curriculum.json", location.href);
  var SCHOOL_CACHE = "school-app";

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function parse(s) { try { return JSON.parse(s || "null"); } catch (e) { return null; } }
  var listeners = [];
  function emit() { listeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  /* ---------- the list of drills ---------- */
  function readCat() { var v = parse(lsGet(CAT)); return v && Array.isArray(v.drills) ? v : null; }
  var cat = readCat();
  function source(s) { return String(s || "").replace(/\s*\((music_enrich|video_enrich)[^)]*\)/i, "").trim(); }
  function extract(C) {
    var DR = (C && C.drills) || {}, R = (C && C.reading) || {}, out = [];
    function add(d, kind) {
      if (!d || !d.id) return;
      var r = R[d.read];
      out.push({
        id: String(d.id), kind: kind, title: String(d.title || d.id), inst: String(d.instrument || "guitar"),
        start: +d.tempo_start || 0, target: +d.tempo_target || 0, mins: +d.minutes || 0,
        src: source(d.source), how: r && r.html ? String(r.html) : ""
      });
    }
    Object.keys(DR.technique || {}).forEach(function (k) { (DR.technique[k] || []).forEach(function (d) { add(d, "technique"); }); });
    (DR.routines || []).forEach(function (d) { add(d, "routine"); });
    out.sort(function (a, b) { return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }); });
    return out;
  }
  function keep(src, drills) {
    cat = { v: 1, src: src, at: Date.now(), drills: drills };
    lsSet(CAT, JSON.stringify(cat));
    return cat;
  }
  // School's saved copy of the curriculum, if School has been opened on this device.
  async function schoolCopy() {
    if (!self.caches) return null;
    try {
      if (!(await caches.has(SCHOOL_CACHE))) return null;
      var c = await caches.open(SCHOOL_CACHE), keys = await c.keys();
      var hit = keys.filter(function (r) { return new URL(r.url).pathname === CURR.pathname; }).pop();
      return hit ? { src: "school" + new URL(hit.url).search, cache: c, req: hit } : null;
    } catch (e) { return null; }
  }
  var loading = null;
  function refresh() {
    if (loading) return loading;
    loading = (async function () {
      var have = readCat(), sc = await schoolCopy();
      if (sc) {
        if (have && have.src === sc.src) return have;
        try { var res = await sc.cache.match(sc.req); if (res) return keep(sc.src, extract(await res.json())); } catch (e) {}
      }
      if (have && (Date.now() - have.at < 864e5 || navigator.onLine === false)) return have;
      try {
        var r = await fetch(CURR.href, { cache: "no-cache" });
        if (!r.ok) throw new Error("status " + r.status);
        var tag = "net:" + (r.headers.get("etag") || r.headers.get("last-modified") || Date.now());
        if (have && have.src === tag) { have.at = Date.now(); lsSet(CAT, JSON.stringify(have)); cat = have; return have; }
        return keep(tag, extract(await r.json()));
      } catch (e) {
        if (have) return have;
        throw e;
      }
    })().finally(function () { loading = null; });
    return loading;
  }
  function find(id) { return cat ? cat.drills.filter(function (d) { return d.id === id; })[0] || null : null; }

  /* ---------- the drill's note, as plain markup (no links, no scripts, no attributes) ---------- */
  var DROP = /^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|IMG|PICTURE|SVG|VIDEO|AUDIO|CANVAS|TEMPLATE|NOSCRIPT|LINK|META|FORM|INPUT|SELECT|TEXTAREA)$/;
  var KEEP = /^(P|UL|OL|LI|STRONG|B|EM|I|CODE|BR|TABLE|THEAD|TBODY|TR|TH|TD|H3|H4|H5|H6|BLOCKQUOTE|HR|SUP|SUB|PRE)$/;
  function clean(html) {
    var box = new DOMParser().parseFromString("<div>" + String(html || "") + "</div>", "text/html").body.firstChild;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) return;
        if (c.nodeType !== 1 || DROP.test(c.tagName)) { c.remove(); return; }
        walk(c);
        if (!KEEP.test(c.tagName)) { while (c.firstChild) n.insertBefore(c.firstChild, c); c.remove(); return; }
        Array.prototype.slice.call(c.attributes).forEach(function (a) {
          if (!(/^(colspan|rowspan)$/.test(a.name) && /^\d+$/.test(a.value))) c.removeAttribute(a.name);
        });
      });
    })(box);
    return box.innerHTML;
  }

  /* ---------- the practice history ---------- */
  function prRead() { var v = parse(lsGet(PR_KEY)); return v && v.drills && typeof v.drills === "object" ? v : { drills: {} }; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function state(id) {
    var e = prRead().drills[id] || {}, log = Array.isArray(e.log) ? e.log : [], day = today(), mins = 0;
    log.forEach(function (x) { if (x && x.date === day) mins += +x.mins || 0; });
    return { status: e.status || "available", tempo: +e.tempo_current || 0, sessions: log.length, todayMins: mins, last: log[0] || null };
  }
  // One run: {tempo (the fastest bar played through, or 0), secs}. Adds to today's metronome entry.
  function logRun(d, run) {
    var secs = Math.round(+run.secs || 0), tempo = Math.round(+run.tempo || 0);
    if (!d || !d.id || secs < 1) return null;
    var pr = prRead(), cur = pr.drills[d.id] || { status: "available", tempo_current: null };
    var log = Array.isArray(cur.log) ? cur.log.slice() : [], day = today(), top = log[0];
    if (top && top.date === day && top.by === "metronome") {
      var e = Object.assign({}, top);
      e.secs = (+e.secs || 0) + secs;
      e.mins = Math.max(1, Math.round(e.secs / 60));
      e.tempo = Math.max(+e.tempo || 0, tempo) || null;
      log[0] = e;
    } else {
      log.unshift({ date: day, tempo: tempo || null, mins: Math.max(1, Math.round(secs / 60)), note: "", by: "metronome", secs: secs });
    }
    var best = +log[0].tempo || 0, target = +d.target || 0;
    // Same ladder as School: learning once logged, maintenance once the printed mark is reached; never demoted.
    var reached = cur.status === "maintenance" || (target > 0 && best >= target);
    pr.drills[d.id] = Object.assign({}, cur, {
      t: Date.now(), status: reached ? "maintenance" : "learning",
      tempo_current: best || cur.tempo_current || null, log: log.slice(0, 40)
    });
    pr.savedAt = Date.now();
    lsSet(PR_KEY, JSON.stringify(pr));
    emit(); queueSync();
    return state(d.id);
  }

  /* ---------- the account (loaded only once there is something to send or fetch) ---------- */
  function stamp(e) { return (e && +e.t) || (e && Array.isArray(e.log) && e.log[0] && Date.parse(e.log[0].date)) || 0; }
  function mergeInto(into, from) {
    var changed = false;
    Object.keys(from || {}).forEach(function (k) {
      var a = into[k], b = from[k];
      if (!b || typeof b !== "object") return;
      var sa = stamp(a), sb = stamp(b);
      var la = a && Array.isArray(a.log) ? a.log.length : 0, lb = Array.isArray(b.log) ? b.log.length : 0;
      if (!a || sb > sa || (sb === sa && lb > la)) { into[k] = b; changed = true; }
    });
    return changed;
  }
  function script(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  async function account() {
    if (!self.MUSIC_CLOUD) await script("../shared/cloud-config.js");
    var cfg = self.MUSIC_CLOUD || {};
    if (!(cfg.url && cfg.anonKey)) return null;
    if (!self.MusicCloud) await script("../shared/cloud.js");
    var C = self.MusicCloud;
    if (!C || !C.configured) return null;
    await C.ready;
    return C.user() ? C : null;
  }
  var syncT = 0, syncing = null;
  function queueSync() { clearTimeout(syncT); syncT = setTimeout(function () { sync().catch(function () {}); }, 3000); }
  function sync() {
    if (syncing) return syncing;
    syncing = (async function () {
      if (navigator.onLine === false) return false;
      var C = await account();
      if (!C) return false;
      var me = C.user(), last = lsGet(PR_USER);
      if (last && last !== me.id) return false;          // someone else's practice on this device
      var remote = await C.load("practice");
      var theirs = remote && remote.drills && typeof remote.drills === "object" ? remote.drills : {};
      var pr = prRead();                                  // read after the wait: a run may have been logged meanwhile
      var got = mergeInto(pr.drills, theirs), send = mergeInto(Object.assign({}, theirs), pr.drills);
      if (got) { pr.savedAt = Date.now(); lsSet(PR_KEY, JSON.stringify(pr)); emit(); }
      if (send || !remote) await C.save("practice", { app: "practice", version: 1, savedAt: Date.now(), drills: pr.drills });
      lsSet(PR_USER, me.id);
      return true;
    })().finally(function () { syncing = null; });
    return syncing;
  }

  window.addEventListener("storage", function (e) { if (e.key === PR_KEY) emit(); });

  self.MetroDrills = {
    cached: function () { return cat; },
    refresh: refresh,
    find: find,
    clean: clean,
    state: state,
    logRun: logRun,
    sync: sync,
    onChange: function (f) { listeners.push(f); },
    // Where the drill's own page is in Library.
    href: function (d) { return "../school/library.html#" + encodeURIComponent((d.kind === "routine" ? "routine:" : "technique:") + d.id); }
  };
})();
