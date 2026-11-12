/* Music assistant: one AI assistant for the whole of Music.

   Barline had an assistant that could build and edit charts. This is that assistant lifted out so
   every tool opens the same one (a round button in each tool's top bar and on the home screen),
   and so it can work across tools: charts, the Originals idea board, theory lookups, practice
   stats, settings and Ear Training's feelings.

   - It talks to Anthropic through MusicAI (shared/ai.js): the musician's own key, straight from
     this device. The conversation is kept in sessionStorage so it follows you from tool to tool;
     "New chat" clears it.
   - It works through tools. Some belong to a tool's page (Barline owns the chart tools, School
     the Originals tools, Ear Training the feelings). When the assistant is open in the owning
     page it calls that page's handlers directly, so the screen updates live. From any other page
     it opens the owning tool in a hidden same-origin frame (?bridge=1) and talks to it with
     postMessage. A page loaded with ?bridge=1 shows no assistant, it only answers.
   - Every change comes back as an action row with Undo. Undo payloads are plain data, so Undo
     still works after you have moved to another tool.

   API
     MusicAssistant.mount({ app, button, context, tools, dark, onOpen })
        app      the tool id: home, library, barline, note-cards, school, ear
        button   an element (or list of them) that opens the assistant; any element with a
                 data-assistant attribute does too
        context  () => short text on where the musician is and what is on screen
        tools    { name: async (input) => result } for tools this page implements (the owner's
                 handlers). A result is a string, an object, or
                 { content, is_error, action: { text, undo }, link: { href, label } }
                 where undo is plain data handed back to tools.__undo, and href is relative to
                 the Music root.
        dark     force the dark look (Ear Training)
     MusicAssistant.open() / close() / icon (the sparkle glyph) */
(function () {
  "use strict";
  if (self.MusicAssistant) return;

  var SRC = (document.currentScript && document.currentScript.src) || "";
  var ROOT = SRC ? new URL("../", SRC).href : new URL("./", location.href).href;
  var BRIDGE = /[?&]bridge=1(&|$)/.test(location.search) && self.parent !== self;
  var STORE = "music:assistant:v1";
  var MAX_STEPS = 14, MAX_SAVED = 350000, BRIDGE_WAIT = 30000, CALL_WAIT = 30000;
  var ICON = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M9 2.5l1.7 4.8 4.8 1.7-4.8 1.7L9 15.5l-1.7-4.8L2.5 9l4.8-1.7z"/><path d="M15.5 12.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/></svg>';

  var ai = function () { return self.MusicAI; };
  var mounted = { app: "", tools: null, context: null, onOpen: null, dark: false };

  /* ===================================================================
     The system prompt
     =================================================================== */
  var SYSTEM = [
    "You are the assistant inside Music, a set of tools for working musicians: Barline (chord charts with a click track), Library (songs, drills, an Originals idea board, and a theory reference of modes, chords and arpeggios), Note Cards (flashcards), School (classes and lessons) and Ear Training (scale degrees over a drone). The musician talks to you on their phone, often by dictation, so read speech-to-text slips as a musician would (\"see major\" is C major, \"be flat\" is B flat, \"for four\" is 4/4).",
    "You can see and change their things with tools: list_charts, get_chart, create_chart, update_chart and move_chart (Barline's charts); list_originals and add_original_idea (the Originals idea board); theory_lookup and list_theory (notes of a mode, chord or arpeggio); practice_stats (Note Cards, Ear Training and School progress); get_settings and change_settings (theme, Barline look, Ear Training preferences); get_feelings and set_feeling (the musician's own words for each scale degree in Ear Training). Do what they ask without asking for confirmation first; every change you make is shown to them with an Undo button. Keep your replies short.",
    "",
    "Creating a song from its name: search the web for its key, tempo (BPM), time signature, chord progression and structure (intro, verse, chorus, bridge and so on, with bar counts and repeats), and use web_fetch to read the most useful pages. Then call create_chart once with what you found. Fill in the artist. If sources disagree, go with the most reliable ones. If you can't find something, make a sensible musical choice and say which details are guesses.",
    "Editing: call get_chart first, then update_chart with the complete chart. Keep everything they didn't ask to change exactly as it is. Each message starts with a note in square brackets saying where the musician is and what's on their screen; in Barline, \"this song\" means the open chart.",
    "",
    "Chart fields:",
    "- key: like \"C\", \"F#m\", \"Bb\", or \"\" if unknown. bpm: 20 to 320. Time signature: top (beats per bar, 1 to 12) over bot (2, 4 or 8).",
    "- sections: in playing order, each with a name (Intro, Verse, Pre-Chorus, Chorus, Bridge, Solo, Outro and so on) and repeat, the number of times it plays in a row (1 if once).",
    "- bars: one entry per bar. chords lists the chords in that bar in order: one chord fills the bar, two split it in half. For exact placement give exactly one entry per beat, using \"\" where the previous chord keeps sounding. An empty list means the chord from before carries on.",
    "- Chord symbols use standard spelling: C, Am, F#m7b5, Bbmaj7, G/B, Dsus4, E7#9, C6/9, N.C.",
    "- lyric: words sung in that bar, only when the musician gives you the words. Never write out the lyrics of published songs, even if you find them online; leave lyric empty.",
    "- instrumental: true for songs with no vocals.",
    "- folder (create_chart): a folder name to file the chart in, or \"\" for none. If the note says they're looking at a folder, use it unless they say otherwise.",
    "",
    "Originals: an original song with chords is a chart filed in the folder \"Originals\" (create_chart or move_chart with that folder name); it then shows in Library under Originals. A song idea without chords (a spark, a title, a feel, a loop) goes on the idea board with add_original_idea. list_originals shows what is already there.",
    "Theory: use theory_lookup for the notes and degrees of a mode, chord or arpeggio rather than working them out; list_theory shows the names available, so map loose names (\"dominant seventh\", \"half diminished\", \"minor pentatonic\" is not available) onto them. The result includes a link button to the Library page for it, so don't write out addresses.",
    "Practice: practice_stats reads Note Cards ratings, Ear Training accuracy and School enrolment. Say what stands out (weakest degrees, decks with many Rusty cards, streaks) in a sentence or two, with the numbers.",
    "Settings: change_settings changes the theme, Barline's accent and title font, and Ear Training's preferences; values outside a setting's range are clamped and the result says what was actually set. get_settings shows the current values.",
    "Feelings: set_feeling saves the musician's own words for a scale degree in Ear Training (200 characters at most; empty text resets it to the starting words); get_feelings lists them.",
    "",
    "Reply in one to three short, plain sentences: what you did and anything worth double-checking. No headings, lists or markdown."
  ].join("\n");

  /* ===================================================================
     The tools
     =================================================================== */
  var CHART_PROPS = {
    title: { type: "string" },
    artist: { type: "string" },
    key: { type: "string" },
    bpm: { type: "integer" },
    top: { type: "integer" },
    bot: { type: "integer", enum: [2, 4, 8] },
    instrumental: { type: "boolean" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          repeat: { type: "integer" },
          bars: {
            type: "array",
            items: {
              type: "object",
              properties: { chords: { type: "array", items: { type: "string" } }, lyric: { type: "string" } },
              required: ["chords", "lyric"],
              additionalProperties: false
            }
          }
        },
        required: ["name", "repeat", "bars"],
        additionalProperties: false
      }
    }
  };
  var CHART_REQ = Object.keys(CHART_PROPS);
  function objSchema(props, req) { return { type: "object", properties: props, required: req, additionalProperties: false }; }
  function assign(a) { for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) a[k] = s[k]; } return a; }
  var num = function (d, lo, hi, step) { return { type: "number", description: d + ": " + lo + " to " + hi + (step ? ", steps of " + step : "") }; };

  // [owner, definition]. Owners: barline, school, ear (their pages implement them) and self (this file).
  var TOOL_LIST = [
    ["barline", { name: "list_charts", description: "List every chart in the musician's library: id, title, artist, key, tempo, time signature and folder.", input_schema: objSchema({}, []), strict: true }],
    ["barline", { name: "get_chart", description: "Read one chart in full: settings, sections, bars, chords and lyrics.", input_schema: objSchema({ chart_id: { type: "string" } }, ["chart_id"]), strict: true }],
    ["barline", { name: "create_chart", description: "Create a new chart in the library from complete contents. Returns the new chart's id.", input_schema: objSchema(assign({}, CHART_PROPS, { folder: { type: "string" } }), CHART_REQ.concat(["folder"])), strict: true }],
    ["barline", { name: "update_chart", description: "Replace an existing chart's contents with the complete chart given. Read it with get_chart first and keep what wasn't asked to change.", input_schema: objSchema(assign({ chart_id: { type: "string" } }, CHART_PROPS), ["chart_id"].concat(CHART_REQ)), strict: true }],
    ["barline", { name: "move_chart", description: "File a chart in a folder by name (the folder is created if it doesn't exist), or pass an empty folder to take it out of its folder.", input_schema: objSchema({ chart_id: { type: "string" }, folder: { type: "string" } }, ["chart_id", "folder"]), strict: true }],
    ["school", { name: "list_originals", description: "List the song ideas on the Originals idea board: id, title, status, key, tempo, feel and the start of the idea. Songs with chords are charts in Barline's Originals folder (see list_charts).", input_schema: { type: "object", properties: {}, additionalProperties: false } }],
    ["school", { name: "add_original_idea", description: "Add a song idea to the Originals idea board.", input_schema: {
      type: "object", additionalProperties: false, required: ["title"],
      properties: {
        title: { type: "string" },
        idea: { type: "string", description: "The idea itself: what it is, what it chases, what made them start it." },
        status: { type: "string", enum: ["spark", "working", "parked", "done"] },
        key: { type: "string", description: "Like B minor" },
        bpm: { type: "string", description: "Tempo, like 114" },
        feel: { type: "string", description: "Like half-time, dragging" }
      } } }],
    ["self", { name: "list_theory", description: "List the modes, chord qualities and arpeggio qualities theory_lookup knows, with their ids.", input_schema: { type: "object", properties: {}, additionalProperties: false } }],
    ["self", { name: "theory_lookup", description: "Look up a mode, chord or arpeggio in a key: its notes (correctly spelled), degrees and step pattern, with a link to its Library page.", input_schema: {
      type: "object", additionalProperties: false, required: ["kind", "root", "name"],
      properties: {
        kind: { type: "string", enum: ["mode", "chord", "arpeggio"] },
        root: { type: "string", description: "The key or root note, like D, F#, Bb" },
        name: { type: "string", description: "A mode (Dorian), or a chord or arpeggio quality (maj7, m7b5, minor, dominant 7). Use list_theory for the names." }
      } } }],
    ["self", { name: "practice_stats", description: "Read-only practice numbers: Note Cards (cards by rating for each deck), Ear Training (accuracy for each scale degree all-time and over the last 7 days, most-confused pairs, rounds, streak, highest levels) and School (enrolled classes and simple progress).", input_schema: { type: "object", properties: {}, additionalProperties: false } }],
    ["self", { name: "get_settings", description: "Read the current settings: theme, Barline's accent and title font, and Ear Training's preferences.", input_schema: { type: "object", properties: {}, additionalProperties: false } }],
    ["self", { name: "change_settings", description: "Change settings. Give only what changes. Out-of-range values are clamped to the setting's real range; the result says what was set.", input_schema: {
      type: "object", additionalProperties: false,
      properties: {
        theme: { type: "string", enum: ["system", "light", "dark"] },
        barline: { type: "object", additionalProperties: false, properties: {
          accent: { type: "string", enum: ["teal", "blue", "violet", "graphite"] },
          titleFont: { type: "string", enum: ["sans", "serif"] } } },
        ear: { type: "object", additionalProperties: false, properties: {
          tempo: num("Tempo", 20, 120, 5), pause: num("Pause in seconds", 0.5, 6, 0.5),
          droneVol: num("Drone volume", 0, 100, 1), noteVol: num("Note volume", 0, 100, 1),
          instrument: { type: "string", enum: ["piano", "flute", "pluck"] },
          labels: { type: "string", enum: ["num", "sol"], description: "num is 1 b2 2, sol is do ra re" },
          cadence: { type: "boolean" },
          keyEvery: num("Questions between key changes", 1, 50, 1), count: num("Questions per round", 5, 100, 5),
          hfRepeat: num("Hands-free repeat", 1, 5, 1), hfWait: num("Hands-free wait in seconds", 0, 10, 0.5),
          hfReplay: num("Hands-free replay", 0, 4, 1), hfGap: num("Hands-free gap in seconds", 1, 10, 0.5),
          vSpeed: num("Voice speed", 0.5, 1.2, 0.05), vPitch: num("Voice pitch", 0.6, 1.4, 0.05), vVol: num("Voice volume", 0, 100, 1),
          vStyle: { type: "string", enum: ["gentle", "plain"] },
          showFeel: { type: "boolean", description: "Show the feeling words in Ear Training" } } }
      } } }],
    ["ear", { name: "get_feelings", description: "List the words for each scale degree in Ear Training (the starting words, or the musician's own).", input_schema: { type: "object", properties: {}, additionalProperties: false } }],
    ["ear", { name: "set_feeling", description: "Save the musician's own words for a scale degree in Ear Training. Empty text resets it to the starting words.", input_schema: {
      type: "object", additionalProperties: false, required: ["degree", "text"],
      properties: {
        degree: { type: "string", description: "The scale degree: 1, b2, 2, b3, 3, 4, #4, 5, b6, 6, b7 or 7" },
        text: { type: "string", description: "At most 200 characters" } } } }]
  ];
  var OWNER = {}, CLIENT_DEFS = [];
  TOOL_LIST.forEach(function (t) { OWNER[t[1].name] = t[0]; CLIENT_DEFS.push(t[1]); });
  var TOOL_DEFS = CLIENT_DEFS.concat([
    { type: "web_search_20260209", name: "web_search", max_uses: 8 },
    { type: "web_fetch_20260209", name: "web_fetch", max_uses: 6 }
  ]);
  var OWNER_PAGE = { barline: "barline/index.html", school: "school/library.html", ear: "ear/index.html" };
  var OWNER_NAME = { barline: "Barline", school: "School", ear: "Ear Training" };

  /* ===================================================================
     Small helpers
     =================================================================== */
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsJson(k) { try { var v = JSON.parse(lsGet(k) || "null"); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function AiError(message) { this.name = "AiError"; this.message = message; }
  AiError.prototype = Object.create(Error.prototype);
  function abortError() { var e = new Error("Stopped"); e.name = "AbortError"; return e; }
  function resolveHref(href) { try { return new URL(href, ROOT).href; } catch (e) { return href; } }

  /* A tool's return value, in one shape: { content: string, is_error, action: { text, undo }, link }. */
  function norm(ret) {
    var out;
    if (ret == null) out = { content: "ok" };
    else if (typeof ret === "object" && ("content" in ret || "action" in ret || "link" in ret || "is_error" in ret)) out = ret;
    else out = { content: ret };
    var c = out.content;
    var res = { content: typeof c === "string" ? c : JSON.stringify(c == null ? "ok" : c) };
    if (out.is_error) res.is_error = true;
    if (out.action && out.action.text) res.action = { text: String(out.action.text), undo: out.action.undo || null };
    if (out.link && out.link.href) res.link = { href: String(out.link.href), label: String(out.link.label || "Open") };
    return JSON.parse(JSON.stringify(res));
  }

  /* ===================================================================
     The bridge: tools that belong to a page that is not the current one
     =================================================================== */
  var bridges = {}, seq = 0;
  function bridgeFor(owner) {
    var b = bridges[owner];
    if (b) return b;
    b = bridges[owner] = { pending: {}, frame: null, ok: false };
    b.ready = new Promise(function (resolve, reject) {
      var f = document.createElement("iframe");
      f.setAttribute("aria-hidden", "true"); f.tabIndex = -1; f.title = (OWNER_NAME[owner] || owner) + " (assistant)";
      f.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden;pointer-events:none";
      var t = setTimeout(function () { reject(new Error("timeout")); }, BRIDGE_WAIT);
      b.frame = f;
      b.onready = function () { clearTimeout(t); b.ok = true; resolve(); };
      f.src = ROOT + OWNER_PAGE[owner] + "?bridge=1";
      (document.body || document.documentElement).appendChild(f);
    });
    b.ready.catch(function () { if (b.frame) b.frame.remove(); delete bridges[owner]; });
    return b;
  }
  function onParentMessage(e) {
    if (e.origin !== location.origin) return;
    var d = e.data;
    if (!d || d.ma !== 1) return;
    var owner = null;
    for (var k in bridges) if (bridges[k].frame && bridges[k].frame.contentWindow === e.source) owner = k;
    if (!owner) return;
    var b = bridges[owner];
    if (d.type === "ready") { if (b.onready) b.onready(); return; }
    if (d.type === "result" && b.pending[d.id]) {
      var p = b.pending[d.id]; delete b.pending[d.id];
      clearTimeout(p.timer);
      if (d.ok) p.resolve(d.result); else p.reject(new Error(d.error || "failed"));
    }
  }
  async function callBridge(owner, name, input, signal) {
    if (BRIDGE) throw new Error("No bridge from a bridge page");
    var b = bridgeFor(owner);
    try { await b.ready; } catch (e) { throw new Error("Couldn't reach " + (OWNER_NAME[owner] || owner) + "."); }
    return new Promise(function (resolve, reject) {
      var id = ++seq;
      var done = function () { delete b.pending[id]; };
      var timer = setTimeout(function () { done(); reject(new Error((OWNER_NAME[owner] || owner) + " didn't answer.")); }, CALL_WAIT);
      b.pending[id] = { resolve: resolve, reject: reject, timer: timer };
      if (signal) {
        if (signal.aborted) { clearTimeout(timer); done(); reject(abortError()); return; }
        signal.addEventListener("abort", function () { clearTimeout(timer); done(); reject(abortError()); }, { once: true });
      }
      b.frame.contentWindow.postMessage({ ma: 1, type: "call", id: id, name: name, input: input == null ? {} : input }, location.origin);
    });
  }
  // The other side: a page opened with ?bridge=1 answers calls from its parent, and only from it.
  function serveBridge() {
    window.addEventListener("message", function (e) {
      if (e.origin !== location.origin || e.source !== window.parent) return;
      var d = e.data;
      if (!d || d.ma !== 1 || d.type !== "call" || typeof d.name !== "string") return;
      var reply = function (ok, payload) {
        var msg = { ma: 1, type: "result", id: d.id, ok: ok };
        if (ok) msg.result = payload; else msg.error = payload;
        try { window.parent.postMessage(msg, location.origin); } catch (err) {}
      };
      runLocal(d.name, d.input).then(function (r) { reply(true, r); }, function (err) { reply(false, (err && err.message) || "failed"); });
    });
    try { window.parent.postMessage({ ma: 1, type: "ready", app: mounted.app }, location.origin); } catch (e) {}
  }
  async function runLocal(name, input) {
    var fn = mounted.tools && mounted.tools[name];
    if (typeof fn !== "function") return { content: "That isn't available here.", is_error: true };
    return norm(await fn(input == null ? {} : input));
  }
  if (!BRIDGE) window.addEventListener("message", onParentMessage);

  /* Run a tool wherever it lives. */
  async function runTool(name, input, signal) {
    var owner = OWNER[name];
    if (!owner) return { content: "Unknown tool " + name, is_error: true };
    var r;
    if (owner === "self") r = norm(await SELF[name](input || {}));
    else if (mounted.tools && typeof mounted.tools[name] === "function") r = norm(await mounted.tools[name](input || {}));
    else r = await callBridge(owner, name, input, signal);
    if (r.action) r.action.owner = owner;
    return r;
  }
  async function runUndo(a) {
    var owner = a.owner, payload = a.undo;
    if (owner === "self") return SELF.__undo(payload);
    if (mounted.app === owner && mounted.tools && typeof mounted.tools.__undo === "function") return norm(await mounted.tools.__undo(payload));
    return callBridge(owner, "__undo", payload, null);
  }

  /* ===================================================================
     Theory (shared/theory.js, read without touching the page's globals)
     =================================================================== */
  var theoryP = null, theoryCards = null;
  function getTheory() {
    if (theoryP) return theoryP;
    if (typeof buildCards === "function" && typeof MODES !== "undefined" && typeof TRIADS !== "undefined" && typeof SEVENTHS !== "undefined" && typeof ARP_QUALITIES !== "undefined") {
      theoryP = Promise.resolve({ MODES: MODES, TRIADS: TRIADS, SEVENTHS: SEVENTHS, ARP_QUALITIES: ARP_QUALITIES, KEY_LABELS: KEY_LABELS, buildCards: buildCards });
      return theoryP;
    }
    theoryP = fetch(ROOT + "shared/theory.js").then(function (r) {
      if (!r.ok) throw new Error("theory.js " + r.status);
      return r.text();
    }).then(function (src) {
      return new Function(src + "\n;return { MODES: MODES, TRIADS: TRIADS, SEVENTHS: SEVENTHS, ARP_QUALITIES: ARP_QUALITIES, KEY_LABELS: KEY_LABELS, buildCards: buildCards };")();
    });
    theoryP.catch(function () { theoryP = null; });
    return theoryP;
  }
  async function getCards() {
    var th = await getTheory();
    if (!theoryCards) {
      theoryCards = {};
      th.buildCards().forEach(function (c) { theoryCards[c.key] = c; });
    }
    return { th: th, cards: theoryCards };
  }
  var LETTER_PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  function parseRoot(s) {
    s = String(s || "").trim().replace(/\s*sharp/i, "#").replace(/\s*flat/i, "b").replace(/♯/g, "#").replace(/♭/g, "b");
    var m = /^([A-Ga-g])([#bx]*)$/.exec(s);
    if (!m) return null;
    var pc = LETTER_PC[m[1].toLowerCase()];
    m[2].split("").forEach(function (ch) { pc += ch === "#" ? 1 : ch === "x" ? 2 : -1; });
    return ((pc % 12) + 12) % 12;
  }
  var squash = function (s) { return String(s || "").toLowerCase().replace(/♭/g, "b").replace(/♯/g, "#").replace(/[\s_\-.]+/g, ""); };
  var QUALITY_ALIAS = {
    major: "maj", maj: "maj", m: "min", min: "min", minor: "min", mi: "min", "-": "min", aug: "aug", augmented: "aug", "+": "aug", dim: "dim", diminished: "dim", "°": "dim",
    sus2: "sus2", sus4: "sus4", sus: "sus4", maj7: "maj7", major7: "maj7", majorseventh: "maj7", "m7": "m7", min7: "m7", minor7: "m7", minorseventh: "m7", "-7": "m7",
    dom7: "dom7", "7": "dom7", dominant7: "dom7", dominant: "dom7", dominantseventh: "dom7", m7b5: "m7b5", halfdiminished: "m7b5", halfdim: "m7b5", "ø": "m7b5", "ø7": "m7b5", min7b5: "m7b5",
    dim7: "dim7", diminished7: "dim7", fullydiminished: "dim7", mmaj7: "mmaj7", "m(maj7)": "mmaj7", minmaj7: "mmaj7", minormajor7: "mmaj7", "mmaj7": "mmaj7",
    "maj7#5": "maj7s5", augmaj7: "maj7s5", augmentedmajor7: "maj7s5", "maj7s5": "maj7s5", majorseventhsharp5: "maj7s5"
  };
  var MODE_ALIAS = { major: "ionian", minor: "aeolian", naturalminor: "aeolian" };
  function findMode(th, name) {
    var n = squash(name).replace(/mode$/, "");
    n = MODE_ALIAS[n] || n;
    return th.MODES.filter(function (m) { return m.id === n || squash(m.name) === n; })[0] || null;
  }
  function findQuality(list, name) {
    var n = squash(name);
    var hit = list.filter(function (q) { return squash(q.id) === n || squash(q.label) === n || (q.sym && squash(q.sym) === n) || (q.word && squash(q.word) === n); })[0];
    if (hit) return hit;
    var id = QUALITY_ALIAS[n] || QUALITY_ALIAS[n.replace(/\(|\)/g, "")];
    return id ? list.filter(function (q) { return q.id === id; })[0] || null : null;
  }
  function trimNotes(card, dropOctave) {
    var notes = card.notes.filter(function (n) { return !(dropOctave && n.octave); });
    return { names: notes.map(function (n) { return n.name; }), degrees: notes.map(function (n) { return n.deg; }) };
  }
  // Library spells each key the simplest way (G♭ rather than F♯ for six flats): say so when that differs from what was asked.
  function spellNote(out, card, asked) {
    var want = String(asked || "").trim().replace(/♯/g, "#").replace(/♭/g, "b").replace(/^./, function (c) { return c.toUpperCase(); }).replace(/\s*sharp/i, "#").replace(/\s*flat/i, "b");
    var got = (card.notes[0] && card.notes[0].name || "").replace(/♯/g, "#").replace(/♭/g, "b");
    if (want && got && want !== got && parseRoot(want) != null) out.spelling_note = "Library spells " + want + " as " + got + " (the same pitch, fewer accidentals).";
    return out;
  }
  async function theoryLookup(inp) {
    var kind = String(inp.kind || "").toLowerCase().replace(/s$/, ""), rootText = String(inp.root || ""), nameText = String(inp.name || "");
    var pc = parseRoot(rootText);
    if (pc == null) {
      // "Cmaj7" given as the name with no usable root
      var m = /^\s*([A-Ga-g][#♯b♭]?)\s*(.*)$/.exec(nameText);
      if (m && parseRoot(m[1]) != null) { pc = parseRoot(m[1]); nameText = m[2] || nameText; }
    }
    if (pc == null) return { content: "I need a root note like D, F# or Bb.", is_error: true };
    var C;
    try { C = await getCards(); } catch (e) { return { content: "Couldn't load the theory tables.", is_error: true }; }
    var th = C.th, cards = C.cards, card, q, link, title;
    var stripRoot = function (find) {
      var q0 = find(nameText);
      if (!q0) { var mm = /^\s*[A-Ga-g][#♯b♭]?\s*(.+)$/.exec(nameText); if (mm) q0 = find(mm[1]); }
      return q0;
    };
    if (kind === "mode") {
      var md = findMode(th, nameText);
      if (!md) return { content: "Unknown mode. Use list_theory for the names.", is_error: true };
      card = cards["modes-" + pc + "-" + md.id];
      var t = trimNotes(card, true);
      link = "library/#/mode/" + pc + "/" + md.id;
      return { content: spellNote({ kind: "mode", title: card.title, notes: t.names, degrees: t.degrees, steps: card.gaps.join(" "), parent: card.parent, color_tone: card.colorTone ? card.colorTone.name : null }, card, rootText),
        action: { text: card.title + " mode" }, link: { href: link, label: "Open in Library" } };
    }
    if (kind === "chord") {
      q = stripRoot(function (n) { return findQuality(th.TRIADS.concat(th.SEVENTHS), n); });
      if (!q) return { content: "Unknown chord quality. Use list_theory for the names.", is_error: true };
      card = cards[(q.tones.length === 4 ? "sevenths" : "triads") + "-" + pc + "-" + q.id + "-root-close"];
      var tc = trimNotes(card, false);
      return { content: spellNote({ kind: "chord", title: card.title + (card.sub ? " (" + card.sub + ")" : ""), notes: tc.names, degrees: tc.degrees, quality: q.word || q.label }, card, rootText),
        action: { text: card.title }, link: { href: "library/#/chord/" + pc + "/" + q.id, label: "Open in Library" } };
    }
    if (kind === "arpeggio" || kind === "arp") {
      q = stripRoot(function (n) { return findQuality(th.ARP_QUALITIES, n); });
      if (!q) return { content: "Unknown arpeggio quality. Use list_theory for the names.", is_error: true };
      card = cards["arps-" + pc + "-" + q.id + "-s1"];
      var ta = trimNotes(card, true);
      title = card.title + " arpeggio";
      return { content: spellNote({ kind: "arpeggio", title: title, notes: ta.names, degrees: ta.degrees, intervals: card.gaps.join(" ") }, card, rootText),
        action: { text: title }, link: { href: "library/#/arp/" + pc + "/" + q.id, label: "Open in Library" } };
    }
    return { content: "kind must be mode, chord or arpeggio.", is_error: true };
  }
  async function listTheory() {
    var th = await getTheory();
    return {
      content: {
        roots: "Any note, like C, F#, Db or Bb",
        modes: th.MODES.map(function (m) { return m.id; }),
        chords: th.TRIADS.concat(th.SEVENTHS).map(function (q) { return { id: q.id, name: q.word || q.label }; }),
        arpeggios: th.ARP_QUALITIES.map(function (q) { return { id: q.id, name: q.word || q.label }; })
      }
    };
  }

  /* ===================================================================
     Practice stats (read-only)
     =================================================================== */
  var EAR_DEG = ["1", "♭2", "2", "♭3", "3", "4", "♯4", "5", "♭6", "6", "♭7", "7"];
  var EAR_LEVELS = { major: 7, minor: 7, chromatic: 6 };
  var dayStr = function (t) { var d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  var pctOf = function (r, w) { return r + w ? Math.round(r / (r + w) * 100) : null; };
  function earStats() {
    var p = lsJson("ear:progress:v1");
    if (!p) return { started: false };
    var tot = p.tot && typeof p.tot === "object" ? p.tot : {}, log = Array.isArray(p.log) ? p.log : [];
    var wk = Date.now() - 7 * 864e5, week = {};
    log.forEach(function (e) {
      if (Array.isArray(e) && e[0] >= wk) { var t = week[e[1]] || (week[e[1]] = [0, 0]); t[e[1] === e[2] ? 0 : 1]++; }
    });
    var degrees = [], idle = [];
    EAR_DEG.forEach(function (label, d) {
      var t = Array.isArray(tot[d]) ? tot[d] : null, w = week[d] || null;
      if (!t || !(t[0] + t[1])) { idle.push(label); return; }
      degrees.push({
        degree: label,
        all_time: { right: t[0], wrong: t[1], accuracy_pct: pctOf(t[0], t[1]) },
        last_7_days: w ? { right: w[0], wrong: w[1], accuracy_pct: pctOf(w[0], w[1]) } : { right: 0, wrong: 0, accuracy_pct: null }
      });
    });
    var conf = Object.keys(p.conf || {}).map(function (k) { var s = k.split(">"); return { asked: EAR_DEG[+s[0]], answered: EAR_DEG[+s[1]], times: p.conf[k] | 0 }; })
      .filter(function (c) { return c.asked && c.answered; }).sort(function (a, b) { return b.times - a.times; }).slice(0, 5);
    var set = {}; (Array.isArray(p.days) ? p.days : []).forEach(function (d) { set[d] = 1; });
    var t = Date.now(), streak = 0;
    if (!set[dayStr(t)]) t -= 864e5;
    while (set[dayStr(t)]) { streak++; t -= 864e5; }
    var un = p.unlocked || {}, prefs = lsJson("ear:prefs:v1") || {}, levels = {};
    Object.keys(EAR_LEVELS).forEach(function (k) { levels[k] = { highest: prefs.unlockAll === true ? EAR_LEVELS[k] : clamp(Math.round(Number(un[k]) || 1), 1, EAR_LEVELS[k]), of: EAR_LEVELS[k] }; });
    return {
      started: true, rounds: p.rounds | 0, streak_days: streak, days_practised: Array.isArray(p.days) ? p.days.length : 0,
      degrees: degrees, not_practised_yet: idle, most_confused: conf, highest_levels: levels
    };
  }
  async function cardsStats() {
    var prog = lsJson("shed-deck:progress:v1");
    var decks = { modes: "modes", arps: "arps", triads: "triads", sevenths: "sevenths", feel: "feelings" };
    var out = {}, wk = Date.now() - 7 * 864e5, totals = {};
    try {
      var C = await getCards();
      Object.keys(C.cards).forEach(function (k) { var d = decks[k.split("-")[0]]; if (d) totals[d] = (totals[d] || 0) + 1; });
      totals.feelings = (totals.feelings || 0) + 12;
    } catch (e) { totals = null; }
    Object.keys(decks).forEach(function (pre) {
      var d = decks[pre];
      out[d] = { nailed: 0, solid: 0, rusty: 0, rated_last_7_days: 0 };
    });
    var rated = 0;
    if (prog) Object.keys(prog).forEach(function (k) {
      var e = prog[k], d = decks[k.split("-")[0]];
      if (!d || !e || ["nailed", "solid", "rusty"].indexOf(e.s) < 0) return;
      out[d][e.s]++; rated++;
      if (Number(e.t) >= wk) out[d].rated_last_7_days++;
    });
    Object.keys(out).forEach(function (d) {
      var o = out[d];
      if (totals && totals[d] != null) { o.cards = totals[d]; o.new = Math.max(0, totals[d] - o.nailed - o.solid - o.rusty); }
    });
    return { started: rated > 0, cards_rated: rated, decks: out };
  }
  function schoolStats() {
    var p = lsJson("school:progress");
    if (!p) return { started: false };
    var classes = p.classes || {}, enrolled = Object.keys(classes).filter(function (k) { return classes[k] && classes[k].status === "enrolled"; });
    var concepts = {}, n = 0;
    Object.keys(p.concepts || {}).forEach(function (k) { var s = (p.concepts[k] || {}).status || "queued"; concepts[s] = (concepts[s] || 0) + 1; n++; });
    var courses = Object.keys(p.courses || {}).map(function (k) { var c = p.courses[k] || {}; return { course: k, status: c.status, lessons_complete: c.lessons_complete | 0 }; })
      .filter(function (c) { return c.status && c.status !== "available"; });
    return { started: true, enrolled_class_numbers: enrolled, concepts_by_status: concepts, concepts_tracked: n, courses_started: courses, tests_recorded: Object.keys(p.tests || {}).length };
  }
  async function practiceStats() {
    return { content: { note_cards: await cardsStats(), ear_training: earStats(), school: schoolStats() } };
  }

  /* ===================================================================
     Settings
     =================================================================== */
  var THEMES = ["system", "light", "dark"], ACCENTS = ["teal", "blue", "violet", "graphite"], FONTS = ["sans", "serif"];
  var EAR_NUM = {
    droneVol: [0, 100, 1], noteVol: [0, 100, 1], tempo: [20, 120, 5], pause: [0.5, 6, 0.5], keyEvery: [1, 50, 1], count: [5, 100, 5],
    hfRepeat: [1, 5, 1], hfWait: [0, 10, 0.5], hfReplay: [0, 4, 1], hfGap: [1, 10, 0.5], vSpeed: [0.5, 1.2, 0.05], vPitch: [0.6, 1.4, 0.05], vVol: [0, 100, 1]
  };
  var EAR_ENUM = { instrument: ["piano", "flute", "pluck"], labels: ["num", "sol"], vStyle: ["gentle", "plain"] };
  var EAR_BOOL = ["cadence", "showFeel"];
  var EAR_DEFAULTS = { droneVol: 60, noteVol: 80, instrument: "piano", cadence: true, keyEvery: 5, count: 20, labels: "num", unlockAll: false,
    tempo: 45, pause: 2, hfRepeat: 2, hfWait: 3, hfReplay: 1, hfGap: 3, showFeel: true, voice: "", voiceName: "", vSpeed: 0.8, vPitch: 0.9, vVol: 55, vStyle: "gentle" };
  function snap(k, v) {
    var s = EAR_NUM[k], n = Number(v);
    if (!isFinite(n)) return null;
    n = clamp(Math.round(n / s[2]) * s[2], s[0], s[1]);
    return Number(n.toFixed(2));
  }
  // The same tidying Ear Training gives its own preferences, so what is written here reads back unchanged there.
  function earClean(p) {
    p = p && typeof p === "object" ? p : {};
    var out = {};
    Object.keys(EAR_NUM).forEach(function (k) { var v = snap(k, p[k]); out[k] = v == null ? EAR_DEFAULTS[k] : v; });
    Object.keys(EAR_ENUM).forEach(function (k) { out[k] = EAR_ENUM[k].indexOf(p[k]) >= 0 ? p[k] : EAR_DEFAULTS[k]; });
    out.cadence = p.cadence !== false; out.showFeel = p.showFeel !== false; out.unlockAll = p.unlockAll === true;
    out.voice = typeof p.voice === "string" ? p.voice.slice(0, 300) : ""; out.voiceName = typeof p.voiceName === "string" ? p.voiceName.slice(0, 200) : "";
    return out;
  }
  function theme() {
    if (self.MusicSettings) return self.MusicSettings.get().theme;
    var s = lsJson("music:settings");
    return s && THEMES.indexOf(s.theme) >= 0 ? s.theme : "system";
  }
  function setTheme(v) {
    if (self.MusicSettings) { self.MusicSettings.set({ theme: v }); return; }
    lsSet("music:settings", JSON.stringify({ theme: v }));
  }
  function barlinePrefs() { var p = lsJson("barline:prefs") || {}; return { accent: ACCENTS.indexOf(p.accent) >= 0 ? p.accent : "teal", titleFont: p.titleFont === "serif" && p.lookV >= 2 ? "serif" : "sans" }; }
  function earPrefs() { return earClean(lsJson("ear:prefs:v1")); }
  function getSettings() {
    var e = earPrefs(); delete e.voice; delete e.voiceName;
    return { theme: theme(), barline: barlinePrefs(), ear: e };
  }
  // Apply validated values. `want` is { theme, barline: {...}, ear: {...} }; returns { prev, now, notes }.
  function applySettings(want) {
    var prev = {}, now = {}, notes = [], any = false;
    if (want.theme != null) {
      if (THEMES.indexOf(want.theme) < 0) notes.push("theme must be system, light or dark");
      else { prev.theme = theme(); if (prev.theme !== want.theme) setTheme(want.theme); now.theme = want.theme; any = true; }
    }
    if (want.barline && typeof want.barline === "object") {
      var cur = barlinePrefs(), patch = {}, pv = {}, nw = {};
      if (want.barline.accent != null) {
        if (ACCENTS.indexOf(want.barline.accent) < 0) notes.push("accent must be one of " + ACCENTS.join(", "));
        else { pv.accent = cur.accent; patch.accent = nw.accent = want.barline.accent; }
      }
      if (want.barline.titleFont != null) {
        if (FONTS.indexOf(want.barline.titleFont) < 0) notes.push("titleFont must be sans or serif");
        else { pv.titleFont = cur.titleFont; patch.titleFont = nw.titleFont = want.barline.titleFont; }
      }
      if (Object.keys(patch).length) {
        // Exactly what the home Settings sheet writes.
        lsSet("barline:prefs", JSON.stringify(assign(lsJson("barline:prefs") || {}, patch, { lookV: 2 })));
        prev.barline = pv; now.barline = nw; any = true;
      }
    }
    if (want.ear && typeof want.ear === "object") {
      var raw = lsJson("ear:prefs:v1") || {}, base = earClean(raw), merged = assign({}, raw, base), pe = {}, ne = {};
      Object.keys(want.ear).forEach(function (k) {
        var v = want.ear[k];
        if (EAR_NUM[k]) {
          var s = snap(k, v);
          if (s == null) { notes.push(k + " needs a number"); return; }
          if (s !== Number(v)) notes.push(k + " " + v + " became " + s + " (range " + EAR_NUM[k][0] + " to " + EAR_NUM[k][1] + ")");
          pe[k] = base[k]; ne[k] = s; merged[k] = s;
        } else if (EAR_ENUM[k]) {
          if (EAR_ENUM[k].indexOf(v) < 0) { notes.push(k + " must be one of " + EAR_ENUM[k].join(", ")); return; }
          pe[k] = base[k]; ne[k] = v; merged[k] = v;
        } else if (EAR_BOOL.indexOf(k) >= 0) {
          if (typeof v !== "boolean") { notes.push(k + " must be true or false"); return; }
          pe[k] = base[k]; ne[k] = v; merged[k] = v;
        } else notes.push("unknown Ear Training setting " + k);
      });
      if (Object.keys(ne).length) {
        lsSet("ear:prefs:v1", JSON.stringify(earClean(merged)));
        // Ear Training's account sync goes by the progress document's save time.
        var prog = lsJson("ear:progress:v1");
        if (prog) { prog.savedAt = Date.now(); lsSet("ear:progress:v1", JSON.stringify(prog)); }
        prev.ear = pe; now.ear = ne; any = true;
      }
    }
    if (any) { try { window.dispatchEvent(new Event("music:prefs-changed")); } catch (e) {} }
    return { prev: prev, now: now, notes: notes, any: any };
  }

  var SELF = {
    list_theory: listTheory,
    theory_lookup: theoryLookup,
    practice_stats: practiceStats,
    get_settings: async function () { return { content: getSettings() }; },
    change_settings: async function (inp) {
      var r = applySettings(inp || {});
      if (!r.any) return { content: { changed: {}, notes: r.notes.length ? r.notes : ["nothing to change"] }, is_error: !!r.notes.length };
      var bits = [];
      if (r.now.theme) bits.push("theme " + r.now.theme);
      if (r.now.barline) bits.push("Barline " + Object.keys(r.now.barline).map(function (k) { return k === "titleFont" ? "title font" : k; }).join(", "));
      if (r.now.ear) bits.push("Ear Training " + Object.keys(r.now.ear).join(", "));
      return { content: { changed: r.now, notes: r.notes }, action: { text: "Changed " + bits.join("; "), undo: { op: "settings", prev: r.prev } } };
    },
    __undo: async function (p) {
      if (p && p.op === "settings") { applySettings(p.prev || {}); return { content: "ok" }; }
      return { content: "Nothing to undo.", is_error: true };
    }
  };

  /* ===================================================================
     The conversation
     =================================================================== */
  var chat = { messages: [], items: [], turns: [], turnSeq: 0, busy: null, live: null, noWeb: false, webNote: false };

  function persist() {
    if (BRIDGE) return;
    if (!chat.messages.length && !chat.items.length) { try { sessionStorage.removeItem(STORE); } catch (e) {} return; }
    for (var guard = 0; guard < 200; guard++) {
      var json = JSON.stringify({ v: 1, messages: chat.messages, items: chat.items.slice(-200), turns: chat.turns, turnSeq: chat.turnSeq, noWeb: chat.noWeb });
      if (json.length > MAX_SAVED && dropOldestTurn()) continue;
      try { sessionStorage.setItem(STORE, json); return; } catch (e) { if (!dropOldestTurn()) return; }
    }
  }
  // Drop the oldest whole turn (a user message through its last reply), so a tool_result is never left without its tool_use.
  function dropOldestTurn() {
    var starts = [];
    chat.messages.forEach(function (m, i) { if (m.role === "user" && typeof m.content === "string") starts.push(i); });
    if (starts.length <= 1) {
      // One turn alone is too big to keep: start the saved chat over.
      var had = chat.messages.length || chat.items.length;
      chat.messages = []; chat.items = []; chat.turns = [];
      return !!had;
    }
    chat.messages.splice(0, starts[1]);
    var tid = chat.turns.shift();
    chat.items = chat.items.filter(function (it) { return it.t !== tid; });
    return true;
  }
  var restored = false;
  function restore() {
    if (BRIDGE || restored) return;
    restored = true;
    try {
      var s = JSON.parse(sessionStorage.getItem(STORE) || "null");
      if (!s || s.v !== 1 || !Array.isArray(s.messages) || !Array.isArray(s.items)) return;
      chat.messages = s.messages; chat.items = s.items; chat.turns = Array.isArray(s.turns) ? s.turns : []; chat.turnSeq = s.turnSeq | 0; chat.noWeb = !!s.noWeb;
    } catch (e) {}
  }
  function newChat() {
    if (chat.busy) chat.busy.abort();
    chat.messages = []; chat.items = []; chat.turns = []; chat.live = null;
    try { sessionStorage.removeItem(STORE); } catch (e) {}
    render();
  }

  async function callClaude(messages, signal) {
    var A = ai();
    if (!A) throw new AiError("The assistant isn't available here.");
    var build = function () {
      return { system: SYSTEM, messages: messages, tools: chat.noWeb ? CLIENT_DEFS : TOOL_DEFS, signal: signal, max_tokens: 16000, effort: "medium" };
    };
    try {
      return await A.call(build());
    } catch (e) {
      // The account hasn't turned on web search: carry on without it and say so.
      if (!chat.noWeb && e && e.name !== "AbortError" && /web_search|web_fetch|web search|web fetch/i.test(e.message || "")) {
        chat.noWeb = true; chat.webNote = true;
        return await A.call(build());
      }
      throw e;
    }
  }
  function contextNote() {
    var s = "";
    try { s = mounted.context ? String(mounted.context() || "") : ""; } catch (e) {}
    return s ? "[" + s.replace(/^\[|\]$/g, "") + "]\n\n" : "";
  }
  async function runAgent(text, signal) {
    var start = chat.messages.length;
    var turn = { actions: [], sources: [] };
    chat.live = turn;
    chat.messages.push({ role: "user", content: contextNote() + text });
    try {
      for (var step = 0; step < MAX_STEPS; step++) {
        var data = await callClaude(chat.messages, signal);
        var content = data.content;
        if (data.stop_reason !== "tool_use") {
          // A reply cut off mid-tool call must not leave a tool_use without its result in the history.
          var kept = content.filter(function (b) { return !(b && b.type === "tool_use"); });
          content = kept.length ? kept : [{ type: "text", text: "…" }];
        }
        chat.messages.push({ role: "assistant", content: content });
        data.content.forEach(function (b) {
          if (b && b.type === "text" && Array.isArray(b.citations)) b.citations.forEach(function (ci) {
            if (ci && ci.url && !turn.sources.some(function (s) { return s.url === ci.url; })) turn.sources.push({ url: ci.url, title: ci.title || "" });
          });
        });
        if (data.stop_reason === "pause_turn") continue;
        var uses = data.stop_reason === "tool_use" ? data.content.filter(function (b) { return b && b.type === "tool_use"; }) : [];
        if (uses.length) {
          var results = [];
          for (var i = 0; i < uses.length; i++) {
            var b = uses[i], r;
            try { r = await runTool(b.name, b.input, signal); }
            catch (e) {
              if (e && e.name === "AbortError") throw e;
              r = { content: "That didn't work: " + ((e && e.message) || e), is_error: true };
            }
            if (r.action || r.link) {
              turn.actions.push({ text: (r.action && r.action.text) || r.link.label, undo: r.action ? r.action.undo : null, owner: r.action ? r.action.owner : null, link: r.link || null });
              renderLive();
            }
            var tr = { type: "tool_result", tool_use_id: b.id, content: r.content };
            if (r.is_error) tr.is_error = true;
            results.push(tr);
          }
          chat.messages.push({ role: "user", content: results });
          continue;
        }
        var reply = data.content.filter(function (b) { return b && b.type === "text"; }).map(function (b) { return b.text; }).join("").trim();
        if (data.stop_reason === "max_tokens") reply += (reply ? " " : "") + "(The answer was cut off.)";
        return { text: reply || (turn.actions.length ? "Done." : "I'm not sure what to do with that. Try saying it another way."), actions: turn.actions, sources: turn.sources };
      }
      throw new AiError("That took too many steps. Try a smaller request.");
    } catch (e) {
      // Drop this unfinished exchange so the next message starts from a clean history.
      chat.messages.length = start;
      e.actions = turn.actions;
      throw e;
    }
  }

  async function send(text, retryTurn) {
    if (chat.busy) { chat.busy.abort(); return; }
    text = String(text || "").trim();
    if (!text) { if (ui.ta) ui.ta.focus(); return; }
    var A = ai();
    if (!A || !A.has()) { renderFoot(); return; }
    var tid = retryTurn || ++chat.turnSeq;
    if (!retryTurn) chat.items.push({ role: "user", text: text, t: tid });
    chat.busy = new AbortController();
    var wasOpen = isOpen();
    setBusy(true); render();
    try {
      if (self.navigator && navigator.onLine === false) throw new AiError("You're offline. Check your connection and try again.");
      var out = await runAgent(text, chat.busy.signal);
      chat.turns.push(tid);
      chat.items.push({ role: "assistant", text: out.text, actions: out.actions, sources: out.sources, t: tid });
      if (chat.webNote) { chat.webNote = false; chat.items.push({ role: "assistant", err: true, text: "Web search is turned off for this Anthropic account, so I worked from what I know.", t: tid }); }
      if (!isOpen() && out.actions.length) toast(out.actions[out.actions.length - 1].text);
    } catch (e) {
      var stopped = e && e.name === "AbortError";
      var msg = stopped ? "Stopped." : (e instanceof AiError || (A && e instanceof A.Error)) ? e.message : "Something went wrong. Try again.";
      var it = { role: "assistant", err: !stopped, text: msg, actions: (e && e.actions) || [], t: tid };
      if (!stopped) it.retry = text;
      chat.items.push(it);
    } finally {
      chat.busy = null; chat.live = null;
      setBusy(false); persist(); render();
    }
  }
  function retry(it) {
    if (chat.busy) return;
    var i = chat.items.indexOf(it);
    if (i >= 0) chat.items.splice(i, 1);
    send(it.retry, it.t);
  }

  /* ===================================================================
     The sheet
     =================================================================== */
  var ui = {};
  var SR = self.SpeechRecognition || self.webkitSpeechRecognition;
  var EXAMPLES = {
    barline: ["Create Wonderwall by Oasis", "Make a 12-bar blues in A at 120", "Add a bridge to this song", "Put this song in Originals"],
    library: ["Notes in D Dorian", "Spell Cmaj7", "Add an Originals idea"],
    "note-cards": ["How are my cards doing?", "Spell F#m7b5"],
    school: ["Add an Originals idea", "How is my practice going?"],
    ear: ["Which degrees are weakest?", "Set the tempo to 60", "Feeling for ♭3"],
    home: ["Create Autumn Leaves", "Notes in D Dorian", "How is my practice going?", "Dark theme"]
  };
  var CSS = [
    ".ma-root{--ma-bg:#FFFFFF;--ma-ink:#121419;--ma-muted:#5C6370;--ma-rule:#E1E4E9;--ma-soft:#F1F2F5;--ma-user:#121419;--ma-user-ink:#FFFFFF;--ma-bad:#B3261E;--ma-focus:#B76A00;--ma-shadow:0 -10px 40px -12px rgb(0 0 0 / .35);",
    "position:fixed;left:0;right:0;top:var(--ma-top,0px);height:var(--ma-vh,100%);z-index:900;font:15px/1.45 -apple-system,BlinkMacSystemFont,'SF Pro Text',system-ui,Roboto,'Segoe UI',sans-serif;color:var(--ma-ink);-webkit-font-smoothing:antialiased}",
    "@media (prefers-color-scheme: dark){:root:not([data-theme='light']) .ma-root{--ma-bg:#17191D;--ma-ink:#ECEEF2;--ma-muted:#A0A6B1;--ma-rule:#2A2E36;--ma-soft:#22252B;--ma-user:#ECEEF2;--ma-user-ink:#121419;--ma-bad:#FF8A7A;--ma-focus:#F5A93B}}",
    ":root[data-theme='dark'] .ma-root,.ma-root.ma-dark{--ma-bg:#17191D;--ma-ink:#ECEEF2;--ma-muted:#A0A6B1;--ma-rule:#2A2E36;--ma-soft:#22252B;--ma-user:#ECEEF2;--ma-user-ink:#121419;--ma-bad:#FF8A7A;--ma-focus:#F5A93B}",
    ".ma-root[hidden]{display:none}",
    ".ma-root *{box-sizing:border-box}",
    ".ma-scrim{position:absolute;inset:0;background:rgb(10 12 15 / .42)}",
    ".ma-panel{position:absolute;left:0;right:0;bottom:0;height:min(86%,41rem);display:flex;flex-direction:column;background:var(--ma-bg);color:var(--ma-ink);border-radius:1.25rem 1.25rem 0 0;box-shadow:var(--ma-shadow);padding-bottom:env(safe-area-inset-bottom,0px);overflow:hidden}",
    "@media (min-width:700px){.ma-panel{left:auto;top:0;height:auto;width:26rem;max-width:100%;border-radius:1.25rem 0 0 1.25rem;box-shadow:-10px 0 40px -12px rgb(0 0 0 / .35)}}",
    "@media (prefers-reduced-motion:no-preference){.ma-panel{animation:ma-up .2s ease-out}@media (min-width:700px){.ma-panel{animation-name:ma-in}}}",
    "@keyframes ma-up{from{transform:translateY(2rem);opacity:0}}@keyframes ma-in{from{transform:translateX(2rem);opacity:0}}",
    ".ma-head{display:flex;align-items:center;gap:.5rem;padding:.75rem .9rem .5rem 1.1rem;flex:none}",
    ".ma-title{margin:0;flex:1;min-width:0;font-size:1.0625rem;font-weight:800;letter-spacing:-.01em}",
    ".ma-btn{height:2.25rem;padding:0 1rem;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;flex:none;font:inherit;font-size:.9375rem;font-weight:600;color:var(--ma-ink);background:var(--ma-soft);border:0;cursor:pointer;text-decoration:none;touch-action:manipulation}",
    ".ma-btn.pri{background:var(--ma-user);color:var(--ma-user-ink)}",
    ".ma-btn.stop{background:var(--ma-soft);color:var(--ma-ink);box-shadow:inset 0 0 0 1.5px var(--ma-ink)}",
    ".ma-btn:disabled{opacity:.5}",
    ".ma-x{width:2.25rem;padding:0}.ma-x svg{width:1rem;height:1rem}",
    ".ma-root :focus-visible{outline:3px solid var(--ma-focus);outline-offset:2px}",
    ".ma-log{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:.5rem;padding:.25rem 1.1rem .75rem;-webkit-overflow-scrolling:touch}",
    ".ma-msg{max-width:92%;min-width:0;padding:.55rem .8rem;border-radius:1rem;font-size:.9375rem;line-height:1.45}",
    ".ma-msg.user{align-self:flex-end;background:var(--ma-user);color:var(--ma-user-ink);border-bottom-right-radius:.3rem}",
    ".ma-msg.assistant{align-self:flex-start;background:var(--ma-soft);color:var(--ma-ink);border-bottom-left-radius:.3rem}",
    ".ma-msg.err{color:var(--ma-bad)}",
    ".ma-msg.ma-pending{color:var(--ma-muted)}",
    ".ma-text{white-space:pre-wrap;overflow-wrap:anywhere}",
    ".ma-act{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem .5rem;margin-top:.45rem;padding-top:.45rem;border-top:1px solid var(--ma-rule);font-size:.8125rem;font-weight:600;color:var(--ma-ink)}",
    ".ma-act>span{flex:1 1 6rem;min-width:0;overflow-wrap:anywhere}",
    ".ma-act .ma-btn{height:2rem;padding:0 .8rem;font-size:.8125rem;background:var(--ma-bg);box-shadow:inset 0 0 0 1px var(--ma-rule)}",
    ".ma-act.undone>span{color:var(--ma-muted)}",
    ".ma-src{margin-top:.4rem;font-size:.75rem;color:var(--ma-muted);overflow-wrap:anywhere}.ma-src a{color:inherit;font-weight:600}",
    ".ma-retry{margin-top:.45rem}",
    ".ma-ex{display:flex;flex-wrap:wrap;gap:.4rem;padding:0 1.1rem .5rem;flex:none}.ma-ex[hidden]{display:none}",
    ".ma-ex .ma-btn{height:2rem;padding:0 .75rem;font-size:.8125rem;max-width:100%;white-space:normal;text-align:left}",
    ".ma-foot{flex:none;padding:.5rem 1.1rem .9rem;border-top:1px solid var(--ma-rule)}",
    ".ma-foot[hidden],.ma-keyf[hidden],.ma-comp[hidden]{display:none}",
    ".ma-in{display:block;width:100%;min-height:2.75rem;max-height:7.5rem;padding:.65rem .85rem;border:0;border-radius:.9rem;background:var(--ma-soft);color:var(--ma-ink);font:inherit;font-size:1rem;line-height:1.35;resize:none;box-shadow:inset 0 0 0 1px var(--ma-rule)}",
    ".ma-in::placeholder{color:var(--ma-muted)}",
    ".ma-in:focus{outline:2px solid var(--ma-ink);outline-offset:1px}",
    ".ma-row{display:flex;align-items:center;gap:.5rem;margin-top:.5rem}",
    ".ma-row .ma-grow{flex:1}",
    ".ma-mic.on{background:var(--ma-user);color:var(--ma-user-ink)}",
    ".ma-keyf{display:flex;gap:.5rem;align-items:center}.ma-keyf .ma-in{flex:1;min-width:0;min-height:2.75rem;padding:0 .85rem}",
    ".ma-keyerr{margin:.5rem 0 0;font-size:.8125rem;font-weight:600;color:var(--ma-bad)}",
    ".ma-toast{position:fixed;left:50%;bottom:calc(1.25rem + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:901;max-width:calc(100vw - 2rem);padding:.6rem 1.1rem;border-radius:999px;background:#121419;color:#fff;font:600 .9375rem/1.3 -apple-system,system-ui,sans-serif;box-shadow:0 12px 30px rgb(0 0 0 / .25);overflow-wrap:anywhere}",
    ".ma-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}"
  ].join("\n");

  function injectCss() {
    if (document.getElementById("ma-style")) return;
    var s = document.createElement("style");
    s.id = "ma-style"; s.textContent = CSS;
    document.head.appendChild(s);
  }
  var isOpen = function () { return !!(ui.root && !ui.root.hidden); };

  function build() {
    if (ui.root) return;
    injectCss();
    var root = h("div", "ma-root");
    root.hidden = true;
    if (mounted.dark) root.classList.add("ma-dark");
    root.innerHTML =
      '<div class="ma-scrim"></div>' +
      '<section class="ma-panel" role="dialog" aria-label="Assistant">' +
        '<header class="ma-head"><h2 class="ma-title">Assistant</h2>' +
          '<button type="button" class="ma-btn ma-new">New chat</button>' +
          '<button type="button" class="ma-btn ma-x" aria-label="Close"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></header>' +
        '<div class="ma-log" role="log" aria-live="polite" aria-label="Conversation"></div>' +
        '<div class="ma-ex"></div>' +
        '<div class="ma-foot">' +
          '<form class="ma-keyf" novalidate><input class="ma-in ma-key" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="sk-ant-…" aria-label="Anthropic API key"><button type="submit" class="ma-btn pri">Save</button></form>' +
          '<p class="ma-keyerr" hidden></p>' +
          '<form class="ma-comp"><textarea class="ma-in ma-msgin" rows="1" placeholder="Message" aria-label="Message to the assistant"></textarea>' +
            '<div class="ma-row"><span class="ma-micslot"></span><span class="ma-grow"></span><button type="submit" class="ma-btn pri ma-send">Send</button></div></form>' +
        '</div>' +
      '</section>';
    document.body.appendChild(root);
    ui.root = root;
    ui.panel = root.querySelector(".ma-panel");
    ui.log = root.querySelector(".ma-log");
    ui.ex = root.querySelector(".ma-ex");
    ui.fresh = root.querySelector(".ma-new");
    ui.keyForm = root.querySelector(".ma-keyf");
    ui.keyIn = root.querySelector(".ma-key");
    ui.keyErr = root.querySelector(".ma-keyerr");
    ui.comp = root.querySelector(".ma-comp");
    ui.ta = root.querySelector(".ma-msgin");
    ui.send = root.querySelector(".ma-send");
    if (SR) {
      var mic = h("button", "ma-btn ma-mic");
      mic.type = "button"; mic.setAttribute("aria-label", "Talk instead of typing");
      mic.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.500" width="6" height="10" rx="3"/><path d="M4.500 9.500a5.500 5.500 0 0011 0M10 15v2.500"/></svg><span>Talk</span>';
      mic.addEventListener("click", function () { dictate(mic); });
      root.querySelector(".ma-micslot").appendChild(mic);
    }
    root.querySelector(".ma-scrim").addEventListener("click", close);
    root.querySelector(".ma-x").addEventListener("click", close);
    ui.fresh.addEventListener("click", newChat);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) { e.stopPropagation(); close(); } }, true);
    ui.comp.addEventListener("submit", function (e) {
      e.preventDefault();
      if (chat.busy) { chat.busy.abort(); return; }
      var v = ui.ta.value;
      if (!v.trim()) { ui.ta.focus(); return; }
      ui.ta.value = ""; autosize();
      send(v);
    });
    ui.ta.addEventListener("input", autosize);
    ui.ta.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || e.isComposing || e.shiftKey) return;
      var fine = !(self.matchMedia && matchMedia("(pointer: coarse)").matches);
      if (e.metaKey || e.ctrlKey || fine) { e.preventDefault(); ui.comp.requestSubmit ? ui.comp.requestSubmit() : ui.send.click(); }
    });
    ui.keyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var A = ai(), v = ui.keyIn.value.trim();
      if (!A || !A.looksRight(v)) { ui.keyErr.hidden = false; ui.keyErr.textContent = "Not a valid key"; ui.keyIn.focus(); return; }
      if (!A.setKey(v)) { ui.keyErr.hidden = false; ui.keyErr.textContent = "Couldn't save"; return; }
      ui.keyIn.value = ""; ui.keyErr.hidden = true;
      renderFoot(); ui.ta.focus();
    });
    ui.keyIn.addEventListener("input", function () { ui.keyErr.hidden = true; });
    // On a phone the keyboard covers the bottom of the page: keep the sheet in the part still visible.
    if (self.visualViewport) {
      var fit = function () {
        var vv = visualViewport;
        root.style.setProperty("--ma-vh", vv.height + "px");
        root.style.setProperty("--ma-top", vv.offsetTop + "px");
      };
      visualViewport.addEventListener("resize", fit);
      visualViewport.addEventListener("scroll", fit);
    }
  }
  function autosize() {
    ui.ta.style.height = "auto";
    ui.ta.style.height = Math.min(ui.ta.scrollHeight + 2, 120) + "px";
  }
  function setBusy(on) {
    if (!ui.send) return;
    ui.send.textContent = on ? "Stop" : "Send";
    ui.send.classList.toggle("stop", on);
    ui.send.classList.toggle("pri", !on);
  }
  function renderFoot() {
    if (!ui.root) return;
    var A = ai(), has = !!(A && A.has());
    ui.keyForm.hidden = has; ui.comp.hidden = !has;
    if (has) ui.keyErr.hidden = true;
    if (!has && isOpen()) ui.keyIn.focus();
  }
  function actEl(it, a) {
    var r = h("div", "ma-act" + (a.undone ? " undone" : ""));
    r.appendChild(h("span", "", a.undone ? a.text + " (undone)" : a.text));
    if (!a.undone && a.link) {
      var l = h("a", "ma-btn", a.link.label);
      l.href = resolveHref(a.link.href);
      l.addEventListener("click", function () { close(); });
      r.appendChild(l);
    }
    if (!a.undone && a.undo) {
      var u = h("button", "ma-btn", "Undo");
      u.type = "button";
      u.addEventListener("click", async function () {
        u.disabled = true;
        try {
          var res = await runUndo(a);
          if (res && res.is_error) throw new Error(res.content);
          a.undone = true; persist(); replaceItem(it);
        } catch (e) {
          u.disabled = false;
          r.appendChild(h("span", "", "Couldn't undo"));
        }
      });
      r.appendChild(u);
    }
    return r;
  }
  function itemEl(it) {
    var b = h("div", "ma-msg " + it.role + (it.err ? " err" : ""));
    b._it = it;
    b.appendChild(h("div", "ma-text", it.text));
    (it.actions || []).forEach(function (a) { b.appendChild(actEl(it, a)); });
    if (it.sources && it.sources.length) {
      var s = h("div", "ma-src");
      s.appendChild(h("span", "", "Sources: "));
      it.sources.slice(0, 4).forEach(function (src, i) {
        var host = src.url;
        try { host = new URL(src.url).hostname.replace(/^www\./, ""); } catch (e) {}
        var a = h("a", "", host);
        a.href = src.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.title = src.title;
        if (i) s.appendChild(document.createTextNode(", "));
        s.appendChild(a);
      });
      b.appendChild(s);
    }
    if (it.retry != null) {
      var rb = h("button", "ma-btn ma-retry", "Retry");
      rb.type = "button";
      rb.addEventListener("click", function () { retry(it); });
      b.appendChild(rb);
    }
    return b;
  }
  function replaceItem(it) {
    if (!ui.log) return;
    for (var i = 0; i < ui.log.children.length; i++) {
      var c = ui.log.children[i];
      if (c._it === it) { c.replaceWith(itemEl(it)); return; }
    }
  }
  function pendingEl() {
    var b = h("div", "ma-msg assistant ma-pending");
    b.appendChild(h("div", "ma-text", "Working…"));
    if (chat.live) chat.live.actions.forEach(function (a) { b.appendChild(actEl({}, a)); });
    return b;
  }
  function render() {
    if (!ui.root) return;
    var log = ui.log;
    var old = log.querySelector(".ma-pending");
    if (old) old.remove();
    var kids = log.children, i = 0;
    while (i < chat.items.length && kids[i] && kids[i]._it === chat.items[i]) i++;
    while (log.children.length > i) log.lastChild.remove();
    for (; i < chat.items.length; i++) log.appendChild(itemEl(chat.items[i]));
    if (chat.busy) log.appendChild(pendingEl());
    var empty = !chat.items.length && !chat.busy;
    ui.ex.hidden = !empty;
    ui.fresh.hidden = empty;
    if (empty && !ui.ex.children.length) {
      (EXAMPLES[mounted.app] || EXAMPLES.home).forEach(function (t) {
        var b = h("button", "ma-btn", t); b.type = "button";
        b.addEventListener("click", function () { ui.ta.value = t; autosize(); ui.ta.focus(); });
        ui.ex.appendChild(b);
      });
    }
    log.scrollTop = log.scrollHeight;
  }
  function renderLive() {
    if (!ui.root || !chat.busy) return;
    var old = ui.log.querySelector(".ma-pending");
    if (old) old.replaceWith(pendingEl());
    ui.log.scrollTop = ui.log.scrollHeight;
  }
  var toastTimer = null;
  function toast(msg) {
    var old = document.querySelector(".ma-toast");
    if (old) old.remove();
    injectCss();
    var t = h("div", "ma-toast", msg);
    t.setAttribute("role", "status");
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 3000);
  }

  // Speech to text where the browser has it (Safari on iPhone does); the keyboard mic always works too.
  var listening = null;
  function dictate(btn) {
    if (listening) { listening.stop(); return; }
    var rec;
    try { rec = new SR(); } catch (e) { return; }
    rec.lang = navigator.language || "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    var base = ui.ta.value ? ui.ta.value.replace(/\s*$/, " ") : "";
    rec.onresult = function (e) {
      var s = "";
      for (var i = 0; i < e.results.length; i++) s += e.results[i][0].transcript;
      ui.ta.value = base + s; autosize();
    };
    rec.onend = function () { listening = null; btn.classList.remove("on"); btn.lastChild.textContent = "Talk"; };
    listening = rec;
    btn.classList.add("on"); btn.lastChild.textContent = "Listening…";
    try { rec.start(); } catch (e) { listening = null; btn.classList.remove("on"); btn.lastChild.textContent = "Talk"; }
  }

  var opener = null;
  function open() {
    if (BRIDGE || !mounted.app) return;
    build();
    if (typeof mounted.onOpen === "function") { try { mounted.onOpen(); } catch (e) {} }
    opener = document.activeElement;
    ui.root.classList.toggle("ma-dark", !!mounted.dark);
    ui.root.hidden = false;
    ui.log.textContent = "";
    render(); renderFoot(); setBusy(!!chat.busy);
    if (!(ai() && ai().has())) ui.keyIn.focus();
    else if (!(self.matchMedia && matchMedia("(pointer: coarse)").matches)) ui.ta.focus();
  }
  function close() {
    if (!ui.root || ui.root.hidden) return;
    ui.root.hidden = true;
    if (listening) { try { listening.stop(); } catch (e) {} }
    if (opener && opener.focus && document.contains(opener)) { try { opener.focus(); } catch (e) {} }
  }

  var wired = false;
  function wire(btn) {
    if (!btn || btn._ma) return;
    btn._ma = true;
    btn.addEventListener("click", function (e) { e.preventDefault(); open(); });
  }
  function mount(opts) {
    opts = opts || {};
    mounted.app = String(opts.app || mounted.app || "");
    if (opts.context) mounted.context = opts.context;
    if (opts.tools) mounted.tools = opts.tools;
    if (opts.onOpen) mounted.onOpen = opts.onOpen;
    if ("dark" in opts) mounted.dark = !!opts.dark;
    if (BRIDGE) { serveBridge(); return; }
    restore();
    var b = opts.button;
    if (typeof b === "string") b = document.querySelectorAll(b);
    if (b && b.nodeType === 1) b = [b];
    if (b) Array.prototype.forEach.call(b, wire);
    // Buttons that a page draws later (School redraws its header) are found by their attribute.
    if (!wired) {
      wired = true;
      document.addEventListener("click", function (e) {
        var t = e.target.closest && e.target.closest("[data-assistant]");
        if (t && !t._ma) { e.preventDefault(); open(); }
      });
      window.addEventListener("pagehide", function () { if (!chat.busy) persist(); });
    }
    if (ui.root) ui.root.classList.toggle("ma-dark", !!mounted.dark);
  }

  self.MusicAssistant = { mount: mount, open: open, close: close, icon: ICON };
})();
