/* Music School — the published page's app.
   State model mirrors Machine/School/progress-<user>.json exactly, so what this page
   saves is what /school sync writes back into the vault. */
(() => {
/* THE APP BUILD (2026-11). The same app.js runs in two places, and `LOCAL` is the only thing that
   tells them apart:

     * the single-file page published as a Claude artifact — saves by republishing itself through
       the `artifact` capability, carries its data in <script type="application/json"> islands;
     * the installable app on GitHub Pages — `LOCAL`. index.html sets `window.MS_APP`, boot.js
       fetches the data files and injects the same islands, and progress is saved in THIS
       browser's localStorage (`LS_KEY`), and in the reader's Music account when they are signed in.

   The app also has `FILES` (app-shell/files.js): the reader's own copies of anything the school
   expects but does not ship — an in-copyright book, chord-chart PDFs, album art, a handout.
   Every use of either is guarded, so the artifact page behaves exactly as it did before. */
const LOCAL = !!window.MS_APP;
/* LIBRARY MODE. In the Music app the shelves that are not coursework — songs, drills, the idea
   board, tools, the reader's own files — belong to the Library tool, not to School. They are the
   same views over the same data and the same saved progress (a drill's tempo log and a song's
   status are progress), so they are not a second program: `library.html` is this same app opened
   with `mode: 'library'`, which changes the menu, the name on it and where it starts. School's
   own menu keeps only what depends on what you are enrolled in, plus Classes. */
const LIBMODE = LOCAL && window.MS_APP.mode === 'library';
const ROUTE_KEY = LIBMODE ? 'hms.route.lib' : 'hms.route';
/* In the Music app pages say less: `lite(full, short)` is the artifact page's sentence there and the
   short form (often nothing) here. */
function lite(full, short) { return LOCAL ? short : full; }
const LIB_ROUTES = ['songs', 'drills', 'originals', 'tools', 'files'];
const FILES = LOCAL ? (window.MSFiles || null) : null;
const LS_KEY = 'school:progress', LS_AT = 'school:savedAt';
const C = JSON.parse(document.getElementById('curriculum').textContent);
let P = JSON.parse(document.getElementById('progress').textContent);
/* spec-173 — `assignments` (the per-lesson turn-in) and `drills` (spec-160's tempo track,
   which the homework page now logs practice into) join the sections this page owns. They are
   initialised HERE, unconditionally, and that is deliberate: sync.py leaves a section alone
   when the page carries no such key at all, so a page that only grew the key once something
   had been written to it would look, on a first sync, exactly like a page built before this
   shipped. An empty object is the page saying "I own this and it is empty"; an absent one is
   the page saying "I am too old to know about this". */
for (const k of ['concepts','courses','classes','tests','homework','assignments','drills','misses'])
  P[k] = P[k] || {};
/* PATCH-121 — `undo` joins `notes` on the array side of that loop, not the keyed-map side: it is
   a stack of snapshots in the order they were taken, and it was briefly initialised as `{}` by
   the loop above, which made `undoAll().filter` throw on every class page. Same shape rule as
   `notes` — an empty ARRAY is the page saying it owns the section and it is empty. */
if (!Array.isArray(P.undo)) P.undo = [];
/* PATCH-102 — `notes` is initialised separately, and as an ARRAY, because it is the one
   section of this file that is a LOG rather than a keyed map. Same reason as the loop above:
   an empty array is the page saying "I own this and it is empty", and sync.py only reads the
   section when the page carries it (`isinstance(page_notes, list)`), so a page that grew the
   key only once something had been written to it would look, on a first sync, exactly like a
   page built before this shipped.

   THE PAGE NEVER WRITES `filed`. That flag belongs to the vault and is set there, after
   someone acts on a note; sync unions page notes with vault notes on `at` and keeps the
   VAULT's copy of any note it already has. A page that set the flag itself would erase the
   record of what had been handled and re-surface every note forever. It is read here (filed
   notes are folded away, below) and never written. */
if (!Array.isArray(P.notes)) P.notes = [];

const CFG = C.config, SR = CFG.sr;
/* spec-172 Phase 3b — the instrument lane's own allowance. Defaulted here rather than assumed
   present: a school.html built before Phase 3b has no instrument_limit in its config block,
   and a page that reads `undefined` as a limit lets you enroll every Hanon course at once. */
if (!(+CFG.instrument_limit > 0)) CFG.instrument_limit = 2;
const COURSES = C.courses, CLASSES = C.classes, CONCEPTS = C.concepts;
const app = document.getElementById('app');
/* spec-172 — two side bundles that build.py deliberately keeps OUT of the curriculum block:
   the ear-training clips (6 KB of pitch data) and the book scans (megabytes of base64, and
   the curriculum block is the one a person greps when a render looks wrong). Both are
   OPTIONAL — a school.html built before spec-172 carries neither block, and the page has to
   boot without them rather than throwing on a missing element. */
const sideJSON = (id, dflt) => {
  const el = document.getElementById(id);
  if (!el) return dflt;
  try { return JSON.parse(el.textContent) || dflt; } catch { return dflt; }
};
const EAR = sideJSON('eartrain', []);
const BOOKPAGES = sideJSON('bookpages', {});
/* spec-176 — the album sleeves, on the same optional contract as the two above and for the same
   reason they are separate: base64 by the megabyte does not belong in the block you grep when a
   render looks wrong. It is ALSO the island `lite` may drop to stay under Obsidian Sync's cap, so
   an empty one is a normal, shipped state and not a broken build — songTile() renders letters. */
const COVERS = sideJSON('covers', {});
/* spec-176b — the chord charts, as TEXT. Same optional contract, and droppable from lite one rung
   above the sleeves. See build.py: page images were measured at ~10.8 MB for this folder against a
   16 MB ceiling, so text is not a compromise here, it is the only version that exists. */
const CHARTS = sideJSON('charts', {});
/* `|| {}` for the same reason: a school.html built before spec-176 has no `songs` key, and the
   rail counts it before anything has a chance to guard. */
const SONGS = C.songs || {};
/* spec-177 — the outside-tools shelf: the sites, apps, textbooks, articles and playlists the
   school points AT but does not own. `|| []` for exactly the reason SONGS carries `|| {}` one
   line up — a school.html built before this spec has no `tools` key, and toolsForConcept() runs
   from the concept card and the homework page before anything gets a chance to guard it. */
const TOOLS = C.tools || [];
/* spec-178 — the Soundslice shelf: one entry per slice, each carrying every lesson that
   assigned it. Flattened in build.py so the page never has to walk lessons to find a slice. */
const SLICES = C.slices || [];
/* spec-179 — the shared idea board, from `School & Content/Originals/`. `|| []` on the same
   contract as the four shelves above: a school.html built before this spec has no `originals`
   key, and the board still has to boot on one, because unlike those shelves this tab can be
   WRITTEN to and its captures live in progress, not in the bundle. */
const ORIG_NOTES = C.originals || [];
/* The board's log — every input across all the ideas, newest first, from `Originals/_Log.md`.
   Its own key, not a field on an idea, because the view it exists to give is the one ACROSS
   them. `|| []` on the same contract as everything else here: a bundle built before it has no
   key and the board still has to draw. */
const ORIG_LOG = C.orig_log || [];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* esc's inverse, and only over the four entities esc itself writes. PATCH-144 reads a note
   name back OUT of rendered markup to look it up — "Time Signatures &amp; Note Values" has to
   match the key "time signatures & note values" — and a general HTML unescape (innerHTML on a
   scratch element) would be both heavier and a wider surface than the job needs. */
const unesc = s => String(s).replace(/&(amp|lt|gt|quot);/g,
  (m, e) => ({amp:'&', lt:'<', gt:'>', quot:'"'}[e]));
/* PATCH-070 — the reader's LOCAL calendar date, not the UTC one. `toISOString()` rolls over
   mid-evening for anyone west of Greenwich: at 6pm PDT it already reads tomorrow, so the
   timeline marked TODAY on the wrong row, dueList() served tomorrow's quizzes early and
   treated today's as late, and rating a quiz in the evening stamped `last_practiced` with
   tomorrow's date — which every interval derived from it then inherited, in a file that syncs
   home. Only the "what day is it" conversion changes; all the calendar maths below still runs
   on whole day numbers via dayOf(), which is DST-safe because it parses date STRINGS. */
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${
                  String(d.getDate()).padStart(2,'0')}`;
/* PATCH-138 (I-3) — `TODAY` is a snapshot, and a pinned tab outlives the day it was opened. Left
   alone it serves yesterday's school all morning and — worse — stamps `last_practiced` with
   yesterday, which is the PATCH-070 bug class arriving by tab lifetime instead of by code. `let`
   plus a wake check: when the tab becomes visible and the date has moved, adopt the new date and
   re-render so every due test, badge and stamp is computed against the day you are actually in. */
let TODAY = iso(new Date());
/* The app's term starts the day a device first opens it, not on the date School Config gave the
   vault's own term — a reader arriving in November should not be told they are thirteen weeks
   behind. Not marked dirty: it is a default, and it is saved with the first real change. An
   imported backup or a synced copy carries its own start and this never fires for it. */
if (LOCAL && !P.semester_start) P.semester_start = TODAY;
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate()+n); return iso(d); };
/* Calendar maths is done in whole days since the epoch, in UTC. Local midnights drift by an
   hour across a DST boundary — this semester crosses one — and (a - b) / 6048e5 on two local
   Dates can land a week number one short because of it. Day numbers can't. */
const dayOf = s => { const [y,m,d] = String(s).split('-').map(Number);
                     return Math.round(Date.UTC(y, (m||1)-1, d||1) / 864e5); };
const dayIso = n => new Date(n * 864e5).toISOString().slice(0,10);
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH = ['January','February','March','April','May','June','July','August','September',
               'October','November','December'];
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
/* PATCH-137 (C4) — a falsy date is '' , not "undefined undefined". A retired concept with no
   `last_practiced` rendered "nailed undefined undefined" in the Retired list. */
const shortDate = s => { if (!s) return ''; const p = String(s).split('-').map(Number);
  return Number.isFinite(p[1]) && Number.isFinite(p[2]) ? `${MON[p[1]-1]} ${p[2]}` : ''; };
/* Weekday of a day number. 1970-01-01 (day 0) was a Thursday, so +4 lands Sunday on 0. */
const dowOf = n => ((n + 4) % 7 + 7) % 7;

/* ---------------------------------------------------------------- state */
const D_CONCEPT = {status:'queued', sr_interval:0, sr_ease:SR.default_ease, sr_due:null,
                   last_practiced:null, sr_last_rating:null};
const D_COURSE  = {status:'available', lessons_complete:0, started:null, completed:null};
const D_CLASS   = {status:'available'};
const cs = id => Object.assign({}, D_CONCEPT, P.concepts[id] || {});
const os = id => Object.assign({}, D_COURSE,  P.courses[id]  || {});
const ks = id => Object.assign({}, D_CLASS,   P.classes[id]  || {});
const setC = (id, v) => { P.concepts[id] = Object.assign(cs(id), v); invalidateSchedule(); dirty(); };
const setO = (id, v) => { P.courses[id]  = Object.assign(os(id), v); invalidateSchedule(); dirty(); };
const setK = (id, v) => { P.classes[id]  = Object.assign(ks(id), v); invalidateSchedule(); dirty(); };

/* spec-173 — Phase 0's frozen contract, in the page's own vocabulary.

   `assignments` is the TURN-IN, one entry per lesson, keyed "<courseId>:<lessonN>". It is
   deliberately NOT folded into the `homework` map: that one is keyed "19:1:ho0" and holds the
   per-ITEM ticks, and a bare "19:1" sitting beside them would be two meanings in one
   namespace — the exact ambiguity the contract calls out.

   `drills` is spec-160's tempo track, keyed by drill basename ("hanon-32"), REUSED rather
   than reinvented. The plugin's Technique track reads `tempo_current` off this section today;
   a second store would have started disagreeing with it the first time either was written. */
const D_ASSIGN = {status:'open', turned_in:null};
const D_DRILL  = {status:'available', tempo_current:null};
/* PATCH-138 (I-8) — `pruned()` was deleted here. It shaped a delta-only preview for the old Sync
   page's JSON block; PATCH-115 replaced that page with the activity log and the function lost its
   last caller, but stayed — 30 lines of prune rules that read as authoritative and were reachable
   from nothing. sync.py has its own `prune()` and is the only thing that needs one. */
const homeworkOn = () => Object.fromEntries(Object.entries(P.homework).filter(([,v]) => v));

/* ------------------------------------------------ spec-173: the turn-in */
const akey = (cid, n) => `${cid}:${n}`;
const as = (cid, n) => Object.assign({}, D_ASSIGN, P.assignments[akey(cid, n)] || {});
const turnedIn = (cid, n) => as(cid, n).status === 'turned_in';
function turnIn(cid, n)   { P.assignments[akey(cid, n)] = {status:'turned_in', turned_in: TODAY}; dirty(); }
/* Undo DELETES the entry rather than writing `{status:"open"}`. Delta-only is the whole file's
   rule, and an entry holding nothing but defaults is omitted entirely — writing the default
   back would leave a row in the vault that means the same as no row at all. */
function unTurnIn(cid, n) { delete P.assignments[akey(cid, n)]; dirty(); }

/* ------------------------------------------------ spec-173: the practice log
   One session logged against one drill. `tempo_current` is the number the plugin's Technique
   track reads, so it is written exactly the way spec-160 defined it and nothing else is
   invented to sit beside it — the per-session rows EXTEND the existing entry (a `log` array)
   rather than replacing its shape, which is what the contract asks for and what keeps
   `tempo_current` working for the reader who never opens this page. */
const ds = key => Object.assign({}, D_DRILL, P.drills[key] || {});
const drillLog = key => { const l = ds(key).log; return Array.isArray(l) ? l : []; };
function logPractice(key, target, entry) {
  const cur = ds(key), tempo = +entry.tempo || 0;
  /* available → learning on the first session logged; learning → maintenance once the logged
     tempo reaches the exercise's PRINTED mark. Never demoted: a slow day after a fast one is
     a session, not a regression, and spec-160's ladder only climbs. A drill whose scan prints
     no mark at all (Hanon 36–38, `tempo_target` null by build.py's deliberate choice) can
     never reach maintenance — which is the honest answer, not a bug to paper over with a
     guessed target. */
  const reached = cur.status === 'maintenance' || (target > 0 && tempo >= target);
  P.drills[key] = Object.assign({}, cur, {
    status: reached ? 'maintenance' : 'learning',
    tempo_current: tempo || cur.tempo_current,
    // Newest first, the way every log in this vault reads. Capped because this state travels
    // inside the page's own payload and a practice diary has no natural end.
    // PATCH-160 — `mins` (actual time spent) rides beside `tempo`, `|| null` the same way, and
    // is never called `minutes` — that name is already the drill's PLANNED length off
    // frontmatter (build.py, PATCH-159). Plan vs actual; sharing a name would merge them.
    log: [{date: entry.date || TODAY, tempo: tempo || null, mins: entry.mins || null, note: entry.note || ''}]
           .concat(drillLog(key)).slice(0, 40),
  });
  dirty();
}

/* PATCH-160 — a row's undo IS its delete: no confirm, no toast-undo. Delta-only is the file's
   rule everywhere else in this section, so the same rule applies here — a drill with nothing
   left logged loses the key entirely rather than keeping a `{status:'available'}` husk. */
function deletePractice(key, idx) {
  const cur = ds(key), log = drillLog(key).slice();
  log.splice(idx, 1);
  if (!log.length) { delete P.drills[key]; dirty(); return; }
  const newest = log.find(e => e.tempo);
  P.drills[key] = Object.assign({}, cur, {log, tempo_current: newest ? newest.tempo : null});
  dirty();
}

/* ------------------------------------------------ PATCH-102: the patch notes log
   Nate writes a note ON the page while using it; `/school sync` carries it home and a later
   session acts on it. The vault half already exists — sync.py owns `notes`, reports the new
   entries with their text, and tells the reader to file them.

   THE CONTRACT, and every line below exists to hold it:
     · `notes` is a LOG — an ARRAY, newest first — not a keyed map.
     · an entry is `{at, text}`. `at` is a local ISO-ish minute stamp and is the IDENTITY:
       sync unions page notes with vault notes on it.
     · `filed` is the VAULT's flag, set there once someone has acted on a note. This file
       READS it (filed notes fold away) and never, anywhere, writes it. */
const notesAll = () => (Array.isArray(P.notes) ? P.notes : []);
const noteFiled = n => !!(n && n.filed);
/** Newest first, by the identity itself — the stamps sort lexically because they are ISO. */
const notesSorted = () => notesAll().filter(n => n && n.at)
  .slice().sort((a, b) => String(b.at).localeCompare(String(a.at)));
const notesUnfiled = () => notesSorted().filter(n => !noteFiled(n));
const notesFiled = () => notesSorted().filter(noteFiled);
/** "2026-08-21T11:52" — the reader's LOCAL clock, for the same reason TODAY is local
 *  (PATCH-070): a UTC stamp reads as tomorrow from a west-coast evening, and this one is
 *  shown back to the person who typed it. Minute precision is the contract's, so two notes
 *  written inside one minute would COLLIDE on the identity sync merges on and the second
 *  would be silently dropped there. The stamp walks forward a minute at a time until it is
 *  unique in this log rather than growing a seconds field the vault half does not expect. */
function noteStamp() {
  const fmt = x => `${iso(x)}T${String(x.getHours()).padStart(2, '0')}:${
                     String(x.getMinutes()).padStart(2, '0')}`;
  const taken = new Set(notesAll().map(n => n && n.at));
  const d = new Date();
  let s = fmt(d), guard = 0;
  while (taken.has(s) && guard++ < 2000) { d.setMinutes(d.getMinutes() + 1); s = fmt(d); }
  return s;
}
/** Adds `{at, text}` and nothing else. Empty or whitespace-only text adds no entry at all —
 *  sync.py drops such a note on the floor anyway, so writing one would only be a row in this
 *  page's state that can never reach the vault. Returns the entry, or null if nothing added. */
function addNote(text) {
  const t = String(text == null ? '' : text).trim();
  if (!t) return null;
  const n = {at: noteStamp(), text: t};
  P.notes = [n].concat(notesAll());
  dirty();
  return n;
}
/** Takes a note off THIS PAGE. Deliberately refuses a filed one: filed means the vault has
 *  it and has acted on it, the union keeps the vault's copy regardless, and a control that
 *  looked like it removed such a note would be lying about what it did. */
function delNote(at) {
  const before = notesAll().length;
  P.notes = notesAll().filter(n => !(n && n.at === at && !noteFiled(n)));
  if (P.notes.length !== before) dirty();
}

/* ---------------------------------------------------------------- derived */
/* PATCH-012 gave the page a three-valued VISUAL domain, dom(), while a separate domainOf()
   collapsed `instrument` into `theory` for everything that actually DECIDED anything —
   enrolment, syllabus ranking, the taught-slot count and the schedule. That collapse existed
   because there were only two track arrays to deal from, so an instrument course had to ride
   somebody's queue and theory's was the one it fitted.

   spec-172 Phase 3b ended it. Nate: "give instrument its own lane and lessons per week." There
   is a third track array now (syllabus.json's `instrument`, via build.py's `order`), a third
   pace (PACE.instrument) and a third allowance (CFG.instrument_limit), so nothing is left that
   needs instrument to pretend to be theory — and domainOf() is gone rather than kept as a
   synonym, so there is exactly ONE classifier again and no way for the two to disagree.

   Everything that used domainOf() now uses dom(). Two call sites moved: trackLessons()'s
   filter, which is what puts a course in a queue, and the per-lesson `data-domain`, which now
   paints a Hanon lesson garnet instead of indigo. */
const dom = x => x.domain === 'production' ? 'production'
              : x.domain === 'instrument' ? 'instrument' : 'theory';
const DOMS = ['theory', 'production', 'instrument'];
const DOM_LABEL = {theory:'Theory', production:'Production', instrument:'Instrument'};
const DOM_PILL = {theory:'pill-theory', production:'pill-prod', instrument:'pill-instr'};
const domPill = d => `<span class="pill ${DOM_PILL[d]}">${DOM_LABEL[d]}</span>`;

/* PATCH-012 — the strand taxonomy, given visual form.
   17 strands carry 147 quizzes between them and the page showed the 3-letter code in grey
   and nothing else. Each strand now gets a HUE, spread along its domain's own arc in the
   order School Config declares them, so the family reads at a glance and the strand reads
   as a shade of it. The code stays printed on every plate: at 17 members hue groups, it
   cannot identify, and the code is the school's own call number.
   `CFG.strands` is School Config's taxonomy via build.py. If that parse ever fails the
   strand list is rebuilt from the concepts themselves, labelled by key — nothing here
   hard-depends on the config being readable. */
const STRAND_META = CFG.strands || {};
const STRAND_ARC = {theory:[210, 272], production:[124, 186], instrument:[338, 350]};
const STRANDS = (() => {
  const m = {};
  for (const c of Object.values(CONCEPTS)) {
    const k = c.strand;
    if (!k) continue;
    const meta = STRAND_META[k] || {};
    if (!m[k]) m[k] = {key:k, label: meta.label || k, domain: meta.domain || dom(c),
                       i: meta.i === undefined ? 99 : meta.i, ids: []};
    m[k].ids.push(c.id);
  }
  for (const d of DOMS) {
    const arc = STRAND_ARC[d], list = Object.values(m).filter(s => s.domain === d)
      .sort((a, b) => a.i - b.i || a.key.localeCompare(b.key));
    list.forEach((s, n) => { s.hue = Math.round(list.length < 2 ? (arc[0] + arc[1]) / 2
      : arc[0] + (arc[1] - arc[0]) * n / (list.length - 1)); });
  }
  return m;
})();
const hueOf = k => (STRANDS[k] && STRANDS[k].hue !== undefined) ? STRANDS[k].hue : 231;
const strandLabel = k => (STRANDS[k] && STRANDS[k].label) || k || '';
/** A strand's call number. */
const plate = k => k ? `<span class="sp" style="--h:${hueOf(k)}" title="${esc(strandLabel(k))}">${esc(k)}</span>` : '';
/** A course's lessons as a measure of ticks — filled ones are completed. */
const meter = (done, total, sm) => total > 0
  ? `<span class="meter${sm ? ' sm' : ''}" title="${done}/${total} lessons completed">${
      Array.from({length: Math.min(total, 12)}, (_, i) =>
        `<i class="${i < done ? 'on' : ''}"></i>`).join('')}</span>`
  : '';
/* Two budgets, not one (spec-172 Phase 3b). A taught slot is a reading-and-quizzing
   commitment; an instrument lesson is ten minutes at the keys with a metronome. Counting
   them together would mean opening Hanon closes a theory course, which is the outcome
   Nate's "give instrument its own lane" decision exists to prevent. Standing courses are
   excluded from BOTH, same as they always were. */
const enrolledIn = pred => Object.values(COURSES)
  .filter(c => !c.standing && os(c.id).status === 'enrolled' && pred(c)).length;
const taughtEnrolled = () => enrolledIn(c => dom(c) !== 'instrument');
const instrEnrolled = () => enrolledIn(c => dom(c) === 'instrument');
/** Which budget a course draws on, and what that budget is. */
const slotOf = c => dom(c) === 'instrument'
  ? {kind: 'instrument', used: instrEnrolled(), limit: CFG.instrument_limit,
     label: 'instrument course'}
  : {kind: 'taught', used: taughtEnrolled(), limit: CFG.taught_limit, label: 'taught course'};
const courseConcepts = id => COURSES[id].concept_ids;
const lessonConcepts = (id, n) => courseConcepts(id).filter(k => CONCEPTS[k].lesson === n);
const lessonOf = (id, n) => (COURSES[id] ? COURSES[id].lessons.find(l => l.n === +n) : null) || null;

/* ---------------------------------------------------------------- spec-173 C: the Test,
   promoted out of the Homework block.

   It is authored as a `**Test**` item INSIDE Homework, and it stays there in the data —
   build.py reads course notes that are shared with Britt, and those notes are not being
   rewritten for this. The page is what stops treating it as homework: everything that asks
   "is the homework done" asks hwTasksOf(), which is the Homework block minus that one item,
   and testSection() draws the item itself under its own heading after the quizzes.

   This is load-bearing rather than cosmetic. PATCH-058 gates a lesson's QUIZZES on its
   homework; spec-173 gates the TEST on those quizzes. Leave the Test inside the homework set
   and the ring closes — the test waits on quizzes that are waiting on the test — and every
   lesson with a test deadlocks the first time anyone uses the third gate. Splitting the set
   is what makes three gates compose instead of collide.

   The tick keeps its existing `homework` key ("01:1:ho2"), so the store, the sync and the
   course note's own `- [x]` are all untouched: only where it is drawn, and what counts it.
   Defined up here rather than beside runTest() because hwLocked() below is the first caller. */
const TEST_TASK = /^\s*<strong>\s*Test\s*<\/strong>/i;
/* PATCH-136 (B7) — "The routine" IS homework. Course 09 labels its block that way and says so in
   the line itself ("this is the homework"), but only the exact label "Homework" was recognised — so
   its tasks parsed and then reached none of the machinery that makes homework mean anything: no
   turn-in, no hand-in gate, no test gate, and `hwLeftOf` always zero. Matching on a small set of
   labels rather than one string keeps a course free to name the block for what it actually is. */
const HW_LABELS = ['Homework', 'The routine'];
const hwBlockOf = u => (u ? u.blocks.find(b => b.kind === 'tasks' && HW_LABELS.includes(b.label)) : null) || null;
/** The Homework block's items, minus the Test. This IS "the homework" everywhere now. */
const hwTasksOf = u => { const b = hwBlockOf(u); return b ? b.tasks.filter(t => !TEST_TASK.test(t.html)) : []; };
/** The authored `**Test**` item, or null on a lesson that sets none (courses 19–26 set none). */
const testTaskOf = u => { const b = hwBlockOf(u); return (b && b.tasks.find(t => TEST_TASK.test(t.html))) || null; };
/** Every task block the lesson carries — Read and Homework both — with the Test taken out.
 *  This is "everything the lesson asks you to do", which is what the homework page lists. */
const doBlocksOf = u => (u ? u.blocks.filter(b => b.kind === 'tasks') : [])
  .map(b => ({label: b.label, html: b.html, tasks: b.tasks.filter(t => !TEST_TASK.test(t.html))}))
  .filter(b => b.tasks.length);
const doTasksOf = u => doBlocksOf(u).reduce((a, b) => a.concat(b.tasks), []);
const hwLeftOf = u => hwTasksOf(u).filter(t => !P.homework[t.id]).length;
/* PATCH-058 — a quiz is gated behind its lesson's homework. Resolved from the QUIZ, not from
   the lesson that happens to be on screen, so the same answer holds wherever the quiz turns
   up: in its lesson, on the Quizzes page, in a session and on its own card.
   This STACKS on the existing gate rather than replacing it — turning the lesson in is still
   what ASSIGNS a quiz; finishing the homework is what makes an assigned one takeable. A
   lesson with no homework block has nothing holding it up. */
function hwLocked(id) {
  const c = CONCEPTS[id], course = c && COURSES[c.course];
  if (!course) return false;
  /* PATCH-058 is a gate on STARTING a quiz — "only available to start once all the homework
     is done". A quiz already taken is not being started, so it stays in rotation whatever the
     homework says. Without this, ticking a lesson in and rating its quizzes, then leaving one
     homework box unticked, silently pulls those quizzes out of dueList() forever: spaced
     repetition stalls behind a checkbox, which is the one thing it must never do. */
  const st = cs(id);
  if (st.sr_last_rating || st.last_practiced) return false;
  /* spec-173 C — "the homework" is now the Homework block MINUS its `**Test**` item (see
     hwTasksOf). PATCH-058's rule is unchanged in substance — a quiz is takeable once the
     lesson's homework is done — but the test is no longer part of that set, because the test
     is now gated on these very quizzes and a set containing it could never be finished. */
  const tasks = hwTasksOf(course.lessons.find(l => l.n === c.lesson));
  if (!tasks.length) return false;
  return tasks.some(t => !P.homework[t.id]);
}
/** Every quiz the school has handed out, locked or not. */
const openQuizzes = () => Object.keys(CONCEPTS).filter(k => cs(k).status !== 'queued');
/* PATCH-071 — a paused course stops handing out quizzes. The test is deliberately
   "enrolled OR completed", never just "enrolled": a FINISHED course's quizzes are exactly the
   ones that should keep coming back, because retention is the entire point of the maintenance
   interval — sweeping them up with the paused ones would quietly end review for everything
   already learned. A course you put down goes quiet; a course you finished does not.
   Found live: Course 04 sat at `{"started":"..."}` — started, then paused, so its status had
   pruned back to `available` — with five NOT quizzes still in the daily rotation. */
const coursePaused = (id) => {
  const c = CONCEPTS[id], course = c && COURSES[c.course];
  if (!course) return false;
  const st = os(c.course).status;
  return st !== 'enrolled' && st !== 'completed';
};
/** Handed out by a course that has since been paused — listed, never served. */
const pausedList = () => openQuizzes().filter(coursePaused).sort();
/** Handed out, and its homework is done — the pool anything takeable comes from. */
const lockedList = () => openQuizzes().filter(k => !coursePaused(k)).filter(hwLocked).sort();
/* PATCH-103 — the due predicate WITHOUT the homework gate, split out so the two readings of
   "due" can both exist. A quiz whose homework is unfinished is still a quiz that is due
   today: it belongs in the Due-today LIST, flagged, rather than vanishing out of the one
   place you would look for it. It must still never be SERVED, so dueList() keeps the gate
   and remains what the rail numeral, the Overview band, every count and every drill queue
   are built from. Nothing that starts a session reads dueCore(). */
const dueCore = () => Object.keys(CONCEPTS)
  .filter(k => { const s = cs(k); return (s.status === 'learning' || s.status === 'maintenance')
                 && s.sr_due && s.sr_due <= TODAY && s.last_practiced !== TODAY
                 && !coursePaused(k); })                   // PATCH-071
  .sort((a,b) => (cs(a).sr_due || '').localeCompare(cs(b).sr_due || ''));
const dueList = () => dueCore().filter(k => !hwLocked(k)); // PATCH-058 — never served
/** Due today, and held by its lesson's homework. Listed with the due ones; never served. */
const dueHeld = () => dueCore().filter(hwLocked);
/* School vocabulary (PATCH-004). The data model keeps the name `concepts` everywhere — on the
   page a concept is a QUIZ, and its SR status reads as a school state rather than an SR one.
   `queued` is a quiz the school hasn't handed out yet; `learning` is one you owe; `maintenance`
   is one you've passed and are only being re-checked on. */
/* PATCH-129 — `maintenance` read as "passed", which broke the school's own rule that **passed is
   for tests only** (spec-156: a course or class is *completed*, never passed). "Learned" is what
   the state actually means — you have sat it, it is right, and it comes back on a widening
   interval — and it leaves "passed" to the thing that can be failed. */
const QUIZ_STATE = {queued:'not assigned', learning:'assigned', maintenance:'learned', retired:'retired'};
const qLabel = s => QUIZ_STATE[s] || s;
/* `quizzesAssigned` / `lessonsDone` / `totalLessons` lived here to feed the four stat tiles
   and the rail's Quizzes counter. PATCH-038 deleted the tiles and PATCH-068 the counter, and
   nothing else called them. */

/* Semester geometry (PATCH-013). start + weeks come from School Config via build.py;
   `end` is syllabus.json's, which /school replan owns and may float past start+weeks. */
/* PATCH-017 — the semester's LENGTH is derived from what you enrolled in, not declared.
   School Config's `weeks:` was a fixed 17 whatever you were taking; one class is a shorter
   term than six. Pacing comes from the plan (theory 2 lessons/week, production 1), the two
   tracks run in parallel, and the term is as long as the slower track needs. */
/* spec-172 Phase 3b — three paces, because there are three tracks. An instrument lesson is
   one exercise at its printed mark, ten minutes at the keys, not a note to read and quizzes to
   sit, so it gets a pace of its own rather than riding theory's. School Config owns all three
   numbers; build.py mirrors them into syllabus.json's semester{} so /school replan reads the
   same ones. TRACKS is the deal order and the order the page lists them in.
   The numbers are NOT written down here on purpose. This comment used to say "instrument runs
   at 3/week" and School Config was lowered to 2 the day after it was written (2026-08-20),
   which left the file asserting a pace the code had never read. Anything that needs the
   figures reads PACE, and the page prints them through paceLine()/paceSum().
   The `|| n` fallbacks below are NOT the current pacing either — they are what to do when the
   key is absent entirely, which only happens on a school.html built before Phase 3b shipped
   the key. A current build never reaches them. */
const TRACKS = ['theory', 'production', 'instrument'];
const PACE = {theory: +C.semester.theory_lessons_per_week || 2,
              production: +C.semester.production_lessons_per_week || 1,
              instrument: +C.semester.instrument_lessons_per_week || 2};
/* The pacing, said once. Three places printed it as a hand-written "2 theory and 1
   production", which is how the page would have gone on claiming two tracks after this
   build. Written from TRACKS so a fourth lane cannot be forgotten in the copy. */
const paceSum = () => TRACKS.map(t => PACE[t]).join('+');
const paceLine = () => {
  const parts = TRACKS.map(t =>
    `${PACE[t]} ${DOM_LABEL[t].toLowerCase()} ${PACE[t] === 1 ? 'lesson' : 'lessons'}`);
  return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
};
/* PATCH-015 — the start date is PER PERSON. School Config's `semester.start` is the shared
   default for the curriculum, but two people do not start school on the same day: changing
   yours must never move Britt's. So the override lives in this page's own state, travels to
   `progress-<user>.json` on sync, and leaves the shared config alone. Same split as spec-155.
   `end` shifts with it — the semester keeps its length, it just begins later. */
const SEM_START0 = dayOf(C.semester.start);

const semStart = () => P.semester_start ? dayOf(P.semester_start) : SEM_START0;
const semEnd = () => semStart() + Math.max(1, scheduleWeeks()) * 7 - 1;

/* The schedule itself. Lessons still owed on enrolled TAUGHT courses, in syllabus order,
   dealt into weeks at the pacing above. Standing courses are excluded on purpose: they run
   daily and never finish, so they cannot set an end date. Recomputed per render — 64 lessons
   is nothing to walk, and a cached plan would go stale the moment you turn a lesson in. */
function trackLessons(domain) {
  /* All three arrays, concatenated, because this only supplies a RANKING — a course is
     already filtered to its own track by dom() below, so the arrays cannot interleave.
     An id in none of them sorts last (99) rather than being dropped. */
  const order = [...(C.order.theory || []), ...(C.order.prod || []),
                 ...(C.order.instrument || [])].map(String);
  const courses = Object.values(COURSES)
    // A course with chosen days (Nate's day-picker) opts OUT of lane pacing, same as a
    // standing one — it is scheduled directly onto its own weekdays by daysLessons() instead,
    // and dealing it here too would double-book it.
    .filter(c => !c.standing && !os(c.id).days && os(c.id).status === 'enrolled' && dom(c) === domain)
    .sort((a, b) => {
      const ia = order.indexOf(a.id), ib = order.indexOf(b.id);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.id.localeCompare(b.id);
    });
  /* spec-172 follow-up — courses in a lane are dealt ROUND-ROBIN, not one drained before the
     next begins. Enrolling Hanon I and Reading I together used to mean ten Hanon lessons
     before the first Reading one; they are different instruments and should run alongside
     each other, which is the whole reason both are enrolled.

     But a chain must still hold: Hanon II follows Hanon I, and interleaving those would teach
     the book out of order. So a course is skipped for as long as anything it `depends_on` —
     and that is itself enrolled in this lane — still owes a lesson. Independent chains
     interleave, a chain stays in sequence. This is the same rule the plugin already applies in
     `dependenciesClear()`; the page simply never had it. */
  const pend = new Map(courses.map(c => [c.id, c.lessons
    .filter(l => l.n > os(c.id).lessons_complete)
    .map(l => ({c, n: l.n, title: l.title}))]));
  const here = new Set(courses.map(c => c.id));
  const waiting = c => (c.depends_on || []).some(d => here.has(d) && (pend.get(d) || []).length);
  const out = [];
  let guard = 0;
  while (courses.some(c => pend.get(c.id).length) && guard++ < 4000) {
    let dealt = false;
    for (const c of courses) {
      const q = pend.get(c.id);
      if (!q.length || waiting(c)) continue;
      out.push(q.shift());
      dealt = true;
    }
    /* Nothing eligible but work remaining means a dependency cycle in the data. Deal the
       first course anyway rather than spin: a wrong order beats an empty schedule, and the
       lesson count still comes out right. */
    if (!dealt) for (const c of courses) {
      const q = pend.get(c.id);
      if (q.length) { out.push(q.shift()); break; }
    }
  }
  return out;
}
/* PATCH-046 — every lesson gets a DAY it is due by, not just a week. A track carrying `n`
   lessons in a week spreads them evenly across the seven days with the last one landing on
   the final day; production is pulled one day earlier than theory (`phase`) so the two
   tracks don't both fall due on the same evening. At the shipped pacing (2 theory, 1
   production) that reads: theory due day 4 and day 7 of the week, production due day 6.
   Nothing is stored — change what you're enrolled in and the dates move with the plan. */
const dueOffset = (i, n, phase) =>
  Math.max(0, Math.min(6, Math.round((i + 1) * 7 / Math.max(1, n)) - 1 - phase));
/* spec-172 Phase 3b — three tracks dealt in parallel, not two. Each keeps its own queue and
   its own pace, the term is as long as the SLOWEST track needs, and each gets its own `phase`
   so the three don't all fall due on the same evening — the offsets are derived from the pace
   and the phase, so they move when School Config's numbers do rather than being fixed here.
   `rows[].instrument` is a new key — anything that walks a row must concat all three. */
const TRACK_KEY = {theory: 'theory', production: 'prod', instrument: 'instrument'};
const TRACK_PHASE = {theory: 0, production: 1, instrument: 2};
/* spec-174 — a course may cap what IT contributes to one week, under the lane's own pace.
   `lessons_per_week` on the course note, via build.py. Absent, zero or unreadable means no
   cap, which is also what a school.html built before spec-174 gives (`undefined` -> NaN ->
   not > 0), so an old bundle and an unmarked course both take the Infinity branch and pace
   exactly as they always did. Clamped to a whole number >= 1 because a cap of 0 would be a
   course that can never be dealt — the deal loop below would spin looking for a week with
   room, and there is no such week. */
const capOf = c => {
  const n = Math.floor(+c.lessons_per_week);
  return n >= 1 ? n : Infinity;
};
/* PATCH-149 — the same ceiling, one level up. A per-COURSE cap bounds a course and nothing
   else, so Class 8's four courses at `lessons_per_week: 1` still put TWO reading lessons in a
   week the moment two of them were enrolled — one each, both legal, and twice what Nate asked
   for ("for guitar sight reading i just want one lesson a week since its alot of content").
   The cap has to be able to name the thing the reader actually experiences, which is the class.
   Read off the class note's own `lessons_per_week`; absent means no ceiling, exactly as for a
   course. Both caps apply — whichever bites first closes the week. */
const classCapOf = c => {
  const k = CLASSES[c.class_id];
  const n = k ? Math.floor(+k.lessons_per_week) : NaN;
  return n >= 1 ? n : Infinity;
};
/* PATCH-150 — how many lessons a week this course may take, from the caps alone. Two callers,
   and the second is the bug this exists for.

   Nate, 2026-08-26: *"when enrolling it still says pick two days to schedule on."* The day
   picker asked for exactly two weekdays whatever the course was, which for a course capped at
   one lesson a week is not just wrong wording — a course started on chosen days is scheduled
   DIRECTLY onto those weekdays by daysLessons(), which trackLessons() excludes from the lane
   entirely. So the chosen-days path never went past _schedule()'s cap checks at all: picking
   two days for a Guitar Sight Reading course would have dealt two a week and silently defeated
   both the per-course and the per-class ceiling.

   Uncapped courses keep asking for two, which is what the picker has always done. */
const weeklyAllowance = c => {
  const n = Math.min(capOf(c), classCapOf(c));
  return Number.isFinite(n) ? Math.max(1, n) : 2;
};
/* The deal, spec-174. It used to be a positional slice — week w took lessons
   [(w-1)*pace, w*pace) out of the lane's flat queue — which cannot express a per-course
   ceiling because it never looks at WHICH course a lesson came from. So the week boundary is
   walked instead of computed: take lessons off the lane queue in order, and close the week
   when either the LANE is full (pace) or the lesson at the head would be this course's
   (cap+1)th of the week.

   Order is trackLessons()'s and is never re-sorted here. That matters: the week closes rather
   than reaching past a capped lesson for a later one that would fit. A week under-filling IS
   the cap working — a course capped at 1 with nothing else enrolled in its lane deals one
   lesson a week and the other slot stays empty, which is the whole point of asking for the
   cap. Backfilling would quietly undo it.

   It also composes with round-robin for free rather than fighting it. trackLessons() already
   interleaves independent chains one lesson per course per pass, so two capped courses in a
   lane arrive alternating and fill the lane to its pace at one each; consecutive lessons from
   a single course only appear when nothing else in the lane is eligible, which is exactly
   when under-filling is correct.

   With no caps in play this reproduces the old slice exactly: groups of `pace` in queue
   order, ceil(len/pace) of them. */
/* PATCH-138 (I-5) — memoised for the duration of one render. `schedule()` is pure with respect to
   `P` and the curriculum, and it was being recomputed from scratch by every caller that needed a
   date: an instrumented Overview paint called it ~300 times, mostly from the calendar's per-day
   `dIn` test. The cache is cleared at the top of every `render()` and by every state write, so it
   can never serve a stale plan — the correctness argument is that nothing between those two points
   can change what `schedule()` would return.

   This is the cheap half of the improvement. The full version (one tagged workbook every surface
   filters) is a bigger rewrite; this removes the pathological cost without moving any logic. */
let _schedCache = null;
const invalidateSchedule = () => { _schedCache = null; };
function schedule() {
  if (_schedCache) return _schedCache;
  return (_schedCache = _schedule());
}
function _schedule() {
  const q = {}, out = {};
  for (const t of TRACKS) q[t] = trackLessons(t);
  const lanes = {};
  let weeks = 0;
  for (const t of TRACKS) {
    const per = Math.max(1, PACE[t]);
    const wk = [];                       // wk[w-1] — what this lane deals into week w
    let cur = [], byCourse = new Map(), byClass = new Map();
    const close = () => { wk.push(cur); cur = []; byCourse = new Map(); byClass = new Map(); };
    for (const x of q[t]) {
      // PATCH-149 — three ways a week closes now: the lane is full, the course has had its
      // allowance, or the CLASS has. The class check is last only because it is the newest;
      // they are peers, and the tightest one wins.
      const kid = x.c.class_id;
      if (cur.length >= per || (byCourse.get(x.c.id) || 0) >= capOf(x.c)
          || (byClass.get(kid) || 0) >= classCapOf(x.c)) close();
      cur.push(x);
      byCourse.set(x.c.id, (byCourse.get(x.c.id) || 0) + 1);
      byClass.set(kid, (byClass.get(kid) || 0) + 1);
    }
    if (cur.length) close();
    lanes[t] = wk;
    weeks = Math.max(weeks, wk.length);
  }
  const rows = [];
  for (let w = 1; w <= weeks; w++) {
    const row = {week: w, start: weekStartDay(w)};
    /* Day offsets stay keyed to the lane's PACE, not to how many the week actually got, so a
       lane's lessons keep landing on the same weekdays whether or not a cap thinned the week.
       A schedule whose due days shuffled as courses finished would not be one you could learn. */
    for (const t of TRACKS) row[TRACK_KEY[t]] = (lanes[t][w - 1] || []).map((x, i) =>
      Object.assign({}, x, {week: w, due: weekStartDay(w) + dueOffset(i, PACE[t], TRACK_PHASE[t])}));
    rows.push(row);
  }
  for (const t of TRACKS) out[TRACK_KEY[t]] = q[t].length;
  return Object.assign({weeks, rows}, out);
}
/** Every still-owed lesson in the plan, each carrying the day it is SCHEDULED — the day you
 *  sit down and take it. A lesson is information, not a task, so it has a day, never a due
 *  date; `.due` is the field name schedule() already hands back (PATCH-046) and is kept
 *  as-is rather than threading a rename through the scheduler, but nothing downstream may
 *  read it as a deadline. What IS due is the WORK a lesson sets — see workDueMap() below. */
const rowLessons = r => TRACKS.flatMap(t => r[TRACK_KEY[t]] || []);

/* A course with chosen days (Nate's day-picker at Start) is scheduled directly onto those two
   weekdays rather than through the lane's shared pace — trackLessons() already excludes it, so
   this is the only place its lessons come from. Walked from the course's own `started` date in
   strict CALENDAR order, alternating the two days as they actually fall (lesson 1 on the first
   occurrence of either on or after `started`, lesson 2 on the next occurrence of a chosen day,
   and so on) rather than by array position — so the mapping from lesson number to date is
   stable no matter when it is read back, the same guarantee dueOffset gives the lane-paced
   courses. Filtered to still-owed lessons at the end, matching what trackLessons() itself
   drops for everything else. */
/* PATCH-136 (B6) — `days` is HAND-EDITED STATE and was trusted completely. `school.md` tells chat
   sessions to write this file by hand, and the natural mistakes are all fatal:
     · `["0","3"]` — strings. `Set.has` is strict-typed, so no weekday ever matches and the walk
       below spins forever. It runs at BOOT (reconcile → plannedLessons), so the page never paints:
       a permanently blank tab on every route, with no error to see. Reproduced at a 60s timeout.
     · `[3,7]` — the ISO-weekday habit, where 7 means Sunday. 7 is never a `dowOf` value, so only
       the 3 matches and every lesson lands on the same weekday.
     · a wrong-length array silently drops the course off the schedule entirely.
   Sanitising here rather than at the writer is deliberate: there are several writers (the page's
   day-picker, chat, a hand edit) and exactly one reader. Anything unusable degrades to the lane
   deal — the course still schedules, just not on chosen days — which is the failure the reader
   can actually recover from. The walk is bounded regardless: with a valid set a match is at most
   7 steps away, so more than that means the set is unusable and looping cannot fix it. */
/* The course's chosen weekdays, cleaned and capped — factored out of daysLessons() so workDueMap()
   can close a course's LAST lesson on the same cadence that opened every other one. Two readers of
   one rule; the trimming below is the rule, and it must not be reimplemented anywhere. */
function courseDays(c) {
  const s = os(c.id);
  const clean = [...new Set((Array.isArray(s.days) ? s.days : [])
    .map(d => Number(d))
    .filter(d => Number.isInteger(d) && d >= 0 && d <= 6))].sort((a, b) => a - b);
  return clean.slice(0, Math.max(1, weeklyAllowance(c)));
}
/* The next day at or after `from`+1 that falls on the course's own pattern. Undefined for a
   lane-paced course, which has no pattern to step. */
function nextDayStep(c, from) {
  const days = courseDays(c);
  if (!days.length) return undefined;
  const chosen = new Set(days);
  let day = from + 1, guard = 0;
  while (!chosen.has(dowOf(day))) { day++; if (++guard > 7) return undefined; }
  return day;
}
function daysLessons(c) {
  const s = os(c.id);
  const clean = [...new Set((Array.isArray(s.days) ? s.days : [])
    .map(d => Number(d))
    .filter(d => Number.isInteger(d) && d >= 0 && d <= 6))].sort((a, b) => a - b);
  /* PATCH-150 — TRIMMED TO THE COURSE'S WEEKLY ALLOWANCE, and this is the load-bearing half of
     that patch. This path never touches _schedule(), so neither the per-course nor the per-class
     cap is applied anywhere downstream of here — a `days` array of two on a course capped at one
     would deal two a week and there would be nothing to catch it. The picker no longer offers a
     second day for such a course, but `days` is also HAND-EDITED STATE (see the note above), and
     a cap that only holds when the UI cooperates is not a cap.
     The old guard demanded EXACTLY two, so allowing one had to be widened here too: below one is
     still unusable and degrades to the lane deal, exactly as before. */
  const days = clean.slice(0, Math.max(1, weeklyAllowance(c)));
  if (!days.length) return [];
  const chosen = new Set(days);
  let day = dayOf(s.started || TODAY);
  const out = [];
  for (let n = 1; n <= c.lessons.length; n++) {
    let guard = 0;
    while (!chosen.has(dowOf(day))) { day++; if (++guard > 7) return []; }
    /* `title` was missing here originally — every lane-dealt item carries it
       (trackLessons()'s own `.map(l => ({c, n: l.n, title: l.title}))`), and this is the ONLY
       other place that builds a plannedLessons() item, so leaving it out meant a custom-days
       lesson's homework/quiz/test rows all rendered the literal string "undefined" where the
       lesson title belongs. Found by actually looking at a screenshot, not by a DOM assertion —
       nothing here throws or fails a test, it just prints the wrong word. */
    const u = c.lessons.find(l => l.n === n);
    out.push({c, n, title: u ? u.title : '', due: day, week: null});
    day++;
  }
  return out.filter(x => x.n > s.lessons_complete);
}
const plannedLessons = () => schedule().rows.flatMap(rowLessons)
  .concat(Object.values(COURSES).filter(c => os(c.id).days).flatMap(daysLessons));

/* `schedule().weeks` only counts LANE-paced courses — a course on custom days (daysLessons())
   lives outside the lane entirely (trackLessons() excludes it) and contributes nothing to it.
   A term running purely on chosen weekdays therefore read as ZERO weeks everywhere that used
   `schedule().weeks` directly: no week header on the timeline, no term highlighting on the
   calendar, no current-week number in the band, no term-length day count. This is the number
   every one of those reads instead — the lane's own count, or the week the furthest-out
   scheduled item (any course, any source) actually falls in, whichever is larger.

   Nate: "if i enroll in a class i also want the term to extend out to when the class courses
   are... determined by the class instead of starting a course" (2026-08-23) — an enrolled
   class's not-yet-started courses used to contribute nothing here at all (courseStarts() draws
   their timeline marker, but nothing read it back into the term length), so the band/calendar
   only ever stretched out as far as a course you had actually started. Its own projected END
   (start + the same estimated-duration math it stacks courses with) now counts as a candidate
   week too, so enrolling in a class reaches the term out to cover it before lesson 1 of
   anything in it has been scheduled. */
function scheduleWeeks() {
  const lane = schedule().weeks;
  const lessons = plannedLessons();
  const cands = [lane];
  if (lessons.length) cands.push(Math.max(...lessons.map(x => weekNo(x.due))));
  const starts = courseStarts();
  if (starts.length) cands.push(...starts.map(x =>
    weekNo(x.due + Math.max(1, Math.ceil(x.c.lessons.length / (PACE[dom(x.c)] || 1))) * 7 - 1)));
  /* PATCH-137 (F14b) — floor at 1 whenever anything is actually planned. `weekNo` of a lesson
     dated before `semester_start` is 0 or negative, so a term whose work all lands before its
     recorded start returned 0 weeks — and the week band then said "Not started" directly above a
     timeline busily scheduling this week. A schedule with lessons in it is, by definition, a term
     that has started. */
  const n = Math.max(...cands);
  return (n < 1 && (lessons.length || starts.length)) ? 1 : n;
}

/* Nate: "lessons to be scheduled on the day im supposed to take the lesson. and then homework
   and quizzes scheduled for when they're due - which would be the day before the next lesson
   ... lessons cant be 'due' since theyre just info. the homework and quizzes are the things
   that are due from the lessons."

   One map, shared by homework (below), quiz release (releaseLesson) and tests (testDueFor) —
   the three things a lesson actually SETS, all due on the same day for the same reason: that
   is the last day before the next lesson opens and starts asking for its own. Built off
   plannedLessons() so it can never disagree with the timeline lessons are drawn from, and
   nothing new is stored to get it — exactly the reasoning spec-173 B used to give homework's
   due date, now corrected to look at the NEXT lesson rather than the lesson's own day.

   A course's last remaining lesson has no next LESSON to precede, but Nate: "the homework
   quizzes and tests would be due the day before the next course" (2026-08-23) — so it now
   looks one course further, to whatever nextCourseStartFor() projects (or actually schedules)
   after this one in the same class. Only a course with nothing queued after it at all — the
   last course in its class, or one outside a class entirely — still falls back to due on the
   lesson's own day; there is nothing after it to protect the schedule of. A lesson outside the
   plan entirely (standing, or the schedule has no slot for it) has no entry at all — its
   callers fall back to TODAY, same as before this map existed. */
/* PATCH-150 (2026-08-26) — the lesson you just COMPLETED keeps its anchor. Nate: "ive completed
   lesson two but havent taken the test which is due the day before lesson 3. i dont want lesson 2
   to show overdue since i have a couple days to finish the test."

   The map was built from `plannedLessons()` alone, and trackLessons()/daysLessons() both drop
   everything at or below `lessons_complete` — correct for "what is still to be TAUGHT", and the
   wrong basis for "when is this lesson's work DUE", because completing a lesson does not finish
   its work. The moment lesson 2 was ticked, its entry left this map and took three things with it:
   `datedTests()` filters on `due !== undefined`, so the untaken test stopped being drawn anywhere
   on the term view; the same for its homework; and `releaseLesson()`'s "no slot in the plan"
   fallback re-stamped its quizzes' `sr_due` to TODAY — a WRITE, so each completion was quietly
   overwriting real spaced-repetition dates with the day the button was pressed.

   So the completed lesson is put back, dated the way it always was: the day before the next lesson
   opens (or, with no lesson left, the day before the next course starts). Only the MOST RECENT
   completion gets this. An older completed lesson's work really is late — its boundary passed when
   the lesson after it opened — and dating it to the current boundary would hide a genuine debt
   behind a fresh deadline. Those stay with hwLeftBehind() and the Overdue band, which is where a
   debt belongs. */
function workDueMap() {
  const byCourse = {};
  for (const x of plannedLessons()) (byCourse[x.c.id] ||= []).push(x);
  /* Iterated over COURSES, not just the keys of `byCourse` — a course whose last lesson is complete
     has no planned rows at all, so keying off the plan alone would skip the very case where the
     anchor is the only thing keeping its final test on the calendar. */
  const ids = new Set(Object.keys(byCourse));
  for (const c of Object.values(COURSES))
    if (!c.standing && os(c.id).status === 'enrolled' && os(c.id).lessons_complete) ids.add(c.id);
  const out = {};
  for (const id of ids) {
    const rows = (byCourse[id] || []).sort((a, b) => a.n - b.n);
    const m = new Map();
    const c0 = COURSES[id];
    const nextStart = nextCourseStartFor(id);
    /* THE LAST LESSON OF A DAY-PACED COURSE CLOSES ON ITS OWN CADENCE, not on whatever the lane
       projects for the next course. Nate, 2026-09-03: *"im not seeing guitar sight reading span over
       days instead of just one day. i thought we had fixed that in the schedule view."* PATCH-151 did
       fix it — for every lesson except the final one. Course 25 runs one lesson a Thursday, and its
       lesson 2 was being closed the day before Course 26's PROJECTED start (a Sunday three days
       later), which is under PATCH-151's five-day SPAN_MIN, so the last lesson of a weekly course
       drew as a single day while lesson 1 beside it spanned a week. The projection is the wrong
       ruler: Course 26 has not been started, its start is a lane guess, and it says nothing about
       when the sight-reading week closes.
       The honest close is the day before this course would open its NEXT lesson if it had one —
       exactly the rule every earlier lesson already uses, continued one step. Nate's original ask
       for this feature was "it wont be overdue until lesson 2 starts"; for the final lesson the
       analogue is "until lesson 3 would have started". Lane-paced courses have no pattern to step
       and are untouched — nextDayStep returns undefined and the old next-course boundary stands. */
    rows.forEach((x, i) => m.set(x.n, i + 1 < rows.length ? rows[i + 1].due - 1
      : (() => { const step = nextDayStep(c0, x.due);
                 return step !== undefined ? step - 1
                      : nextStart !== undefined ? nextStart - 1 : x.due; })()));
    const done = os(id).lessons_complete;
    if (done && !m.has(done)) {
      const boundary = rows.length ? rows[0].due : nextStart;
      if (boundary !== undefined) m.set(done, boundary - 1);
    }
    out[id] = m;
  }
  return out;
}
const workDueFor = (courseId, n) => { const m = workDueMap()[courseId]; return m ? m.get(n) : undefined; };

/* ---------------------------------------------------------------- spec-173 B: what is due
   A lesson only reaches this list while it is still OWED: trackLessons() drops anything at or
   below `lessons_complete`, and it only deals from courses that are enrolled and not standing.
   That is the right shape for "what is due" and it is also why the turned-in list below is
   built from `assignments` instead — a lesson can be turned in, and then completed, and its
   turn-in still has to be visible somewhere. */
const hwPlan = () => { const map = workDueMap();
  return plannedLessons().map(x => ({c: x.c, n: x.n, title: x.title,
    due: (map[x.c.id] && map[x.c.id].get(x.n)) ?? x.due,
    done: turnedIn(x.c.id, x.n)})); };
const hwDueList  = () => hwPlan().filter(x => !x.done && x.due <= dayOf(TODAY));
const hwSoonList = () => hwPlan().filter(x => !x.done && x.due >  dayOf(TODAY));
/* Lessons the course has already moved PAST whose homework was never handed in.
   plannedLessons() cannot see these — trackLessons() drops everything at or below
   `lessons_complete`, which is exactly right for "what is due" and exactly wrong for "what is
   still owed". Turning a LESSON in and handing its HOMEWORK in are separate acts; that
   separation is the whole point of `assignments`, and doing the first without the second
   leaves real work with no surface anywhere on the page. Found on Nate's own state the first
   time this was rendered against it: lessons 1 and 2 of Course 01 sat complete with their
   homework un-handed-in, which locked both their tests and left no route to the one control
   that unlocks them. Paused courses are excluded — PATCH-071's line, one section over. */
const hwLeftBehind = () => Object.values(COURSES)
  .filter(c => { const st = os(c.id).status; return st === 'enrolled' || st === 'completed'; })
  .flatMap(c => c.lessons
    .filter(u => u.n <= os(c.id).lessons_complete && !turnedIn(c.id, u.n))
    .map(u => ({c, n: u.n, title: u.title, past: true})))
  .sort((a, b) => a.c.id.localeCompare(b.c.id) || a.n - b.n);
/** Every turn-in on record, newest first — including lessons long since completed. */
const hwTurnedInList = () => Object.keys(P.assignments)
  .filter(k => (P.assignments[k] || {}).status === 'turned_in')
  .map(k => {
    const [cid, n] = k.split(':'), c = COURSES[cid], u = lessonOf(cid, +n);
    /* `done` is carried explicitly rather than left to hwRow to infer. It read it off a key
       that only hwPlan() sets, so every row in the Turned in section rendered with the open
       dot, an empty due cell and an "N left" button — a list headed "Turned in" saying
       nothing had been. Invisible in the source and obvious the moment the section had a row
       in it, which is the whole argument for driving the flow instead of reading it. */
    return (c && u) ? {c, n: +n, title: u.title, at: as(cid, +n).turned_in, done: true} : null;
  })
  .filter(Boolean)
  .sort((a, b) => String(b.at || '').localeCompare(String(a.at || ''))
                  || a.c.id.localeCompare(b.c.id) || a.n - b.n);
/* PATCH-019 — lessons with a real teacher. Two sources, merged newest-first: notes under
   Users/<Name>/Lessons/ (via build.py), and lessons captured here that `/school sync` has not
   written out yet. A captured entry disappears from the page's own list once a note carries its
   capture_id — that is how the two halves avoid showing the same lesson twice. */
const EXT_NOTES = C.lessons_external || [];
const extCaptured = () => {
  const synced = new Set(EXT_NOTES.map(l => l.capture_id).filter(Boolean));
  return (P.ext_lessons || []).filter(l => !synced.has(l.id));
};
const extAll = () => [
  ...EXT_NOTES.map(l => ({...l, source: 'note'})),
  ...extCaptured().map(l => ({...l, source: 'page'})),
].sort((a, b) => String(b.date).localeCompare(String(a.date)));
const extHomeworkDue = () => extAll().reduce((n, l) =>
  n + (l.homework || []).filter(h => !P.homework[h.id]).length, 0);

/* ------------------------------------------------- PATCH-148: outside lessons on the schedule
   Nate, 2026-08-26: *"i want homework from outside lessons to appear in the schedule. they
   should be due on the next lesson. i also want the lessons to appear in the schedule."*

   An outside lesson is the only work in this school with a due date the SCHEDULER does not
   own. A course lesson's homework is due the day before the next lesson because schedule()
   dealt both; a teacher's homework is due when you next see the teacher, and that date is a
   fact from the frontmatter (`next_date`) rather than anything derivable. So these two feeds
   are keyed straight off it and never consult the lane machinery.

   ONE next-lesson chip, not one per lesson. Every lesson carries a `next_date` pointing at the
   one after it, so drawing them all would put a stale appointment on the timeline for every
   lesson you have ever had. `extAll()` is newest-first, so the first entry that names a next
   date IS the next appointment — and once that lesson is itself captured, its own date matches
   and the chip is suppressed rather than doubling up with the real one. */
/* THE DAY BEFORE the next lesson, not the day of it — Nate, 2026-08-26. Which is also the rule
   a course lesson's homework already follows (workDueMap), and for the same reason: work due at
   the moment you walk in is work you have no evening left to do. The lesson chip still sits on
   `next_date` itself; only the homework moves back a day. */
const datedExtHomework = () => extAll()
  .filter(l => (l.homework || []).length && l.next_date)
  .map(l => ({
    l, due: dayOf(l.next_date) - 1,
    done: (l.homework || []).filter(h => !!P.homework[h.id]).length,
    total: (l.homework || []).length,
  }));
const datedExtLessons = () => {
  const all = extAll();
  const held = new Set(all.map(l => String(l.date)));
  const next = all.find(l => l.next_date && !held.has(String(l.next_date)));
  return next ? [{l: next, due: dayOf(next.next_date)}] : [];
};

const standingCourses = () => Object.values(COURSES)
  .filter(c => c.standing && os(c.id).status === 'enrolled');
const weekStartDay = n => semStart() + (n - 1) * 7;
/* PATCH-137 (F14c) — the clamp told the same lie at both ends: a term starting next month read
   "Week 1 of 7" and one that finished in June read "Week 7 of 7", both with the current-week shading
   drawn on a week nobody is in. Clamping is right INSIDE the term and wrong outside it, so the
   band's own callers get a signal they can render honestly (`weekBand` shows "starts <date>" when
   this is 0). Returning 0 before the start restores exactly that path; past the end it reports the
   real, out-of-range week so nothing pretends the term is still running. */
function week() {
  const w = scheduleWeeks();
  if (!w) return 0;
  const n = Math.floor((dayOf(TODAY) - semStart()) / 7) + 1;
  if (n < 1) return 0;                 // term has not started — the band says so
  return Math.min(w, n);
}
/* PATCH-037 — school weeks run from the day the semester starts, whatever weekday that is;
   the TIMELINE walks day by day and uses this to notice when one ends (`weekNo(d) !== cur`).
   The CALENDAR used to align its own rows to that same boundary — one row, one school week —
   until Nate's "I want the first date listed to be Sun always" retired that (see
   calendarBlock(): rows are a plain Sunday week now, and a row can span two school weeks if
   the term doesn't start on a Sunday, so in-term shading there is a per-DAY test against
   this, not a per-row one). */
const weekNo = n => Math.floor((n - semStart()) / 7) + 1;

/* PATCH-008 — a quiz's due date, said in words. `queued` quizzes have no date because the
   school hasn't handed them out yet; everything else carries one, and it is shown in the
   lesson that teaches it rather than only in the quiz session. */
/* PATCH-138 (I-7) — where a due date CAME FROM, answered at render time. Four things write dates
   (the lane deal, a day-picker course, the retake ladder, and the boot reconcile) against three
   different anchors, and no surface could answer "why is this due today" — a question I could not
   answer about my own page. Derived rather than stored on purpose: a `sr_why` field would be a
   fifth thing to keep true, and this is display-only. It reads the same inputs the writers use, so
   it cannot drift from them without the writers changing too. */
function dueReason(id) {
  const s = cs(id), c = CONCEPTS[id];
  if (!s.sr_due) return '';
  if (s.sr_last_rating) {
    return `you rated it ${rLabel(s.sr_last_rating)}${
      s.last_practiced ? ` on ${shortDate(s.last_practiced)}` : ''}, so it comes back after ${
      s.sr_interval || 0} day${s.sr_interval === 1 ? '' : 's'}`;
  }
  const day = c ? workDueFor(c.course, c.lesson) : undefined;
  if (day !== undefined && dayIso(day) === s.sr_due) {
    return `it is dated with lesson ${c.lesson}'s homework — the day before the next lesson`;
  }
  if (s.sr_due === TODAY) {
    return 'its lesson is already open and the plan has no later slot for it, so it is owed now';
  }
  return 'set when the lesson was released';
}
const dueDays = s => dayOf(s.sr_due) - dayOf(TODAY);
function dueState(s) {
  if (s.status === 'queued' || !s.sr_due) return '';
  const n = dueDays(s);
  return n < 0 ? 'late' : n === 0 ? 'today' : n <= 3 ? 'soon' : 'later';
}
function dueText(s) {
  if (s.status === 'queued' || !s.sr_due) return '';
  const n = dueDays(s);
  return n < 0 ? `${-n}d late` : n === 0 ? 'due today' : n === 1 ? 'due tomorrow'
       : `due ${shortDate(s.sr_due)}`;
}
/* Every assigned quiz, soonest-due first — the pool for taking quizzes ahead of schedule.
   A `queued` quiz is deliberately NOT in here: it has no due date and no schedule to move,
   and rating one would strand it (dueList only ever re-surfaces learning/maintenance).
   Turning its lesson in is what assigns it. */
const retiredList = () => Object.keys(CONCEPTS).filter(k => cs(k).status === 'retired').sort();
const assignedList = () => openQuizzes()
  .filter(k => cs(k).status !== 'retired')         // PATCH-114 — automatic means done with it
  .filter(k => !hwLocked(k))                       // PATCH-058 — never serve a locked quiz
  .filter(k => !coursePaused(k))                   // PATCH-071 — nor one from a paused course
  .sort((a,b) => (cs(a).sr_due || '9999-99-99').localeCompare(cs(b).sr_due || '9999-99-99')
                 || a.localeCompare(b));

/* PATCH-057/069 — "taken" and "how it went", with NO new state invented. The school already
   holds one verdict per quiz: `sr_last_rating`, one of automatic / solid / rusty / forgot. A
   quiz that carries one has been sat; a quiz that doesn't, hasn't. That is the whole
   pass/fail store, and there is deliberately no score field behind it. */
const quizTaken = s => !!s.sr_last_rating;
/* PATCH-157 — `nailed` is now `automatic`. Nate: "i want to rename nailed to 'automatic' or
   something where the answers recal is automatic without much thinking. solid is still the right
   answer but required more thinking." The old word named the OUTCOME (you got it right); the top
   rating is not about correctness at all — `solid` is also correct — it is about whether recall
   was effortless. Naming it for the outcome is what let `nailed` drift into meaning four different
   things across four surfaces (see _Shakedown 2026-08-24 §"`nailed` means four different things").
   The emoji moved with it: 🎯 is "hit the target", which is the OLD meaning; ⚡ is the speed the
   rating actually records. `solid` is deliberately unchanged — its meaning was never wrong. */
const LEGACY_RATING = {nailed: 'automatic'};
/** Data written before PATCH-157 says `nailed`. Read it as `automatic` rather than migrating on
    every surface at once — song notes, activity logs and any published build still carry it. */
const normRating = r => LEGACY_RATING[r] || r || '';
const RATING = {automatic:'Automatic', solid:'Solid', rusty:'Rusty', forgot:'Forgot'};
const RATING_EMOJI = {automatic:'⚡', solid:'🙂', rusty:'😬', forgot:'💀'};
/* One source for the rate buttons. There were two hardcoded copies of this row (concept drill and
   retake drill) and the rename would have had to land in both, which is how the labels drift. */
const RATE_ROW = Object.keys(RATING)
  .map(r => `<button data-rate="${r}"><em>${RATING_EMOJI[r]}</em>${RATING[r]}</button>`).join('\n          ');
const rLabel = r => RATING[normRating(r)] || r || '';
/** Passed = the rating says you knew it. Rusty and forgot are sat, but not passed. */
const rPassed = r => normRating(r) === 'automatic' || r === 'solid';
const takenList = () => Object.keys(CONCEPTS).filter(k => quizTaken(cs(k)))
  .sort((a,b) => (cs(b).last_practiced || '').localeCompare(cs(a).last_practiced || '')
                 || a.localeCompare(b));
/** Assigned but never sat — the quizzes actually waiting for you. */
const untakenList = () => assignedList().filter(k => !quizTaken(cs(k)));
/** Every handed-out quiz that carries a date, as day numbers — the timeline's quiz half.
 *  Locked ones are IN here on purpose: a due date is still a due date, and hiding it would
 *  make the timeline lie about what the fortnight holds. */
/* PATCH-071 covered dueList() and assignedList() but missed THIS, which is what the timeline
   reads — so a paused course's quizzes vanished from the rotation and went on being drawn on
   the schedule anyway. Same gate, same reason. */
const datedQuizzes = () => openQuizzes().filter(k => cs(k).status !== 'retired')   // PATCH-137 (F1)
  .filter(k => !coursePaused(k)).filter(k => cs(k).sr_due)
  .map(k => ({id: k, due: dayOf(cs(k).sr_due), s: cs(k)}));

/* PATCH-110 — the quizzes a started course is GOING to ask for, drawn before it asks.
   Nate: "id like the quizzes to be populated on the schedule when a course is started so i can
   see everything that needs to be done."

   These are still `queued` — the school has not handed them out, and nothing here hands them
   out. That distinction is the whole engine: a quiz is assigned when its lesson opens, and
   assigning all of them at once would put a course's entire concept set into the daily rotation
   on day one and collapse the drip into a pile. So this is a SCHEDULE projection and nothing
   else: no state is written, no quiz becomes takeable, and none of these reach dueList(),
   assignedList() or the review surface. They are drawn on the day their lesson's work is due —
   the same workDueMap() date they will actually carry once released — so the row a quiz is
   projected onto is the row it lands on.

   Excluded, each for the reason it is excluded everywhere else: standing courses (no plan),
   paused and unstarted courses (nothing is scheduled), and any lesson the plan has no slot
   for. A completed course has no `queued` concepts left, so it drops out on its own. */
const pendingQuizzes = () => {
  const map = workDueMap();
  return Object.values(COURSES)
    .filter(c => !c.standing && os(c.id).status === 'enrolled')
    .flatMap(c => courseConcepts(c.id)
      .filter(k => cs(k).status === 'queued')
      .map(k => ({id: k, due: map[c.id] && map[c.id].get(CONCEPTS[k].lesson), s: cs(k), pending: true})))
    .filter(x => x.due !== undefined);
};

/* ---------------------------------------------------------------- PATCH-112: missed questions
   Nate: "if questions are marked wrong or partially wrong for a test i want those questions to
   be generated as pop quizzes at a later time."

   A quiz on this page is a CONCEPT, and a lesson test asks eight or ten questions about one or
   two of them — so "you missed Q3" and "you owe the enharmonics quiz" are different grains, and
   seeding the concept back (which is all grading did before) loses the question. Course 01's
   Lesson 1 test is the case that proves it: all ten questions are FND-C01, so one missed
   question and a perfect paper re-seed exactly the same thing.

   `P.misses` is that missing grain, keyed `"<test basename>#<n>"` — one entry per question
   marked wrong or partially right, carrying the question, the canonical answer and the
   explanation, because the page has no other copy of them: test papers live in the vault as
   markdown and never reach the curriculum island. `/school test` writes them at grade time
   (Machine/Workflows/school.md), the page serves and re-schedules them, and sync.py OWNS the
   section so the page's ratings come home rather than being reverted by the vault's older copy.

   They are deliberately NOT concepts and never enter the SM-2 tables: a question is a specific
   thing you got wrong once, not a unit of the syllabus, and giving it an ease factor would
   invent a second rotation competing with the real one. The schedule is a plain ladder —
   automatic clears it, solid pushes it a week, rusty two days, forgot tomorrow. */
const MISS_STEP = {automatic: null, solid: 7, rusty: 2, forgot: 1};
/* PATCH-137 (F5) — a retake belongs to a course, and must follow that course's lifecycle. Nothing
   filtered them, so a PAUSED course's retakes kept leading every session and counting in the badge
   while all its concept quizzes correctly went quiet — the same `coursePaused` gate, applied to the
   other queue. A miss whose concept no longer exists (renamed) is dropped for the same reason a
   stale concept route no longer crashes: unreachable state should disappear, not accumulate. */
const missAll  = () => Object.keys(P.misses || {}).filter(k => {
  const m = P.misses[k] || {};
  if (m.cleared) return false;
  const c = CONCEPTS[m.concept];
  return c ? !coursePaused(m.concept) : true;
});
/** Every retake ever generated, cleared ones included — the Tests page's record. */
const missEver = () => Object.keys(P.misses || {});
const missOf   = k => (P.misses || {})[k] || null;
/* PATCH-137 (F6) — a miss with NO due date is owed NOW, not never. `'9999-99-99'` meant a retake
   whose `due` chat forgot to write was silently unreachable forever, while the Tests page defaulted
   the same absent field to TODAY and displayed it as "retake due <today>" — two surfaces, opposite
   readings of the same missing value. Owed-now is the safe direction: a retake exists because
   something was wrong, so surfacing it early costs a question and hiding it costs the point of the
   feature. */
const missDue  = () => missAll().filter(k => (missOf(k).due || TODAY) <= TODAY).sort();
const missCard = k => 'miss:' + k;
/* PATCH-113 — ONE definition of "pop quizzes owed today", used by the rail numeral, the
   Overview's session button and the Quizzes page's headline. Nate: "make sure the quiz
   terminology is the same on the quizzes page as it is on the overview page" — the wording was
   only half of that; the three surfaces were also counting different sets, which is the version
   of inconsistency you cannot fix by renaming things. Blocked quizzes are IN the count for the
   same reason PATCH-103 lists them under Due today: they are owed, they just cannot be served
   yet, and a headline that quietly drops them disagrees with the list printed underneath it. */
const quizzesOwed = () => dueList().length + dueHeld().filter(k => !quizTaken(cs(k))).length
                          + missDue().length;
const isMiss   = id => typeof id === 'string' && id.startsWith('miss:');
const missKey  = id => id.slice(5);
/** The timeline's half of it — every open miss that carries a date, drawn like a pop quiz. */
const datedMisses = () => missAll().filter(k => missOf(k).due)
  .map(k => ({key: k, due: dayOf(missOf(k).due), m: missOf(k)}));
/* Rating a miss. No ease, no interval — see above. `automatic` deletes the entry outright, which
   is the same delta-only rule the rest of the file runs on: the absence of a row IS "no longer
   owed", and writing `{cleared:true}` would leave a growing list of dead weight in the vault
   that every later reader has to filter. */
/* PATCH-124 — `automatic` CLEARS a retake rather than deleting it. The entry was deleted outright
   when it was only a retake queue (an absent row is "no longer owed", the file's own delta rule).
   The Tests page changed what it is: the question, the right answer and the grader's reason are
   the review material behind a past result, and deleting them meant a test's record emptied out
   as you got better at it — losing exactly the notes you would want before the re-sit. `cleared`
   takes it out of every queue and leaves the record standing. */
function rateMiss(k, r) {
  const step = MISS_STEP[r];
  const before = P.misses[k] ? JSON.parse(JSON.stringify(P.misses[k])) : undefined;   // PATCH-138 (I-1)
  const undo = () => {
    if (before === undefined) delete P.misses[k]; else P.misses[k] = before;
    dirty(); render(); toast('Put back — that retake is as it was.');
  };
  const patch = {last_sat: TODAY, last_rating: r};
  if (step === null || step === undefined) { patch.cleared = TODAY; patch.due = null; }
  else { patch.due = addDays(step); patch.cleared = null; }
  P.misses[k] = Object.assign({}, P.misses[k], patch);
  dirty();
  toast(patch.cleared ? 'Retake cleared.' : `Retake back ${shortDate(patch.due)}.`, undo);
}

/* Nate: "tests should be scheduled like quizzes where a test is due and needs to be passed
   before the next course or gate starts." Same due date as the lesson's homework and quizzes
   (workDueMap — the day before the next lesson), since that IS the gate: the test waits on
   both of those already (testGate), so its own deadline can only be the same day or later, and
   later would let it slip past the lesson it belongs to. Every RELEASED lesson is in scope,
   not just the current one — same "listed, never hidden" argument hwLeftBehind makes for
   stale homework. Filtered to `os(c.id).status === 'enrolled'` rather than a separate paused
   check: a paused course reads `available`, so this excludes it the same way it excludes a
   never-started one. Courses that set no lesson test (19–26) contribute nothing. */
/** Every still-owed lesson's homework, for the timeline's own homework chip — same due date
 *  the Homework tab already gives it (hwPlan(), workDueMap()). It was missing from the
 *  term-ahead view entirely until Nate caught it: quizzes and (now) tests were scheduled
 *  there and homework, the third thing a lesson sets, was not. Lessons with no Homework
 *  block at all (some reps courses set none) are excluded rather than drawing a chip for
 *  work that was never assigned.
 *  Turned-in ones are NOT filtered out — Nate: "when homework is completed i want it to
 *  remain on the timeline but show that its turned in - make like how quizzes are handled."
 *  homeworkItem() draws the done state; the `.done` flag rides straight through from
 *  hwPlan(), which already carries it. */
const datedHomework = () => hwPlan()
  .filter(x => hwTasksOf(lessonOf(x.c.id, x.n)).length > 0);

/* Nate: "when i enroll in a class i want its courses to populate on the timeline so i know
   when each course is scheduled to start... a courses lessons + lesson resources... wont show
   up until I start the course." So this draws ONE coarse marker per not-yet-started course in
   an enrolled class — never its lessons, which plannedLessons() already withholds on its own
   (trackLessons() only deals from courses actually `enrolled`, so a merely-available course in
   an enrolled class contributes nothing there today, and that stays true).

   The date is a ROUGH PROJECTION, not a scheduler guarantee — it never runs the real lane
   machinery for a course that is not enrolled yet, which would mean simulating every other
   course that might end up competing for the same lane. Instead it walks the class's own
   courses in their authored order (`k.courses`, the order the syllabus actually lists them
   in) and stacks estimated durations end to end: the first not-started course is anchored on
   today, or on the day after the class's own furthest-out currently-scheduled lesson if
   something in the class is already running; each course after that is anchored on the
   estimated end of the one before it (its lesson count over its lane's pace, in weeks). Good
   enough to answer "roughly when" — full lesson-by-lesson detail only ever appears once a
   course IS started. Standing courses never appear here; they have no "start" to project. */
/* Nate: "I want the next course in line to start at least 3 days after" (2026-08-23) — the
   day-after handoff (a course's projected start pinned to the very next day after the last
   lesson before it) read as no breathing room at all between courses. COURSE_GAP_DAYS is the
   one place that number lives; workDueMap()'s own "due the day before the next course" reads
   the SAME projected start back out of this function, so the two can never disagree. */
const COURSE_GAP_DAYS = 3;
/* Nate, 2026-09-27: "there are two things for reading 1 - first position, part 2. theres the one
   that goes from today to saturday and i see one that starts wednesday." The projection ignored a
   class running on chosen weekdays: Part One's last lesson (a Sunday) + 3 days put Part Two's start
   on a Wednesday, inside the very week Part One's lesson 2 still owns (workDueMap() closes a
   day-paced last lesson on its own cadence, the Saturday). So when a course in the class has a
   `days` pattern, every projected start is snapped FORWARD to the next day on that pattern — the
   3-day gap still holds as a floor — and a course's estimated end is walked lesson by lesson on the
   same pattern rather than taken from the lane pace. A class with no pattern is untouched. */
function classDays(ids) {
  // the running course's pattern first — a completed course's old days are history, not a plan
  const order = [...ids.filter(id => os(id).status === 'enrolled'), ...ids.slice().reverse()];
  for (const id of order) { const d = courseDays(COURSES[id]); if (d.length) return new Set(d); }
  return null;
}
function snapToDays(day, days) {
  let guard = 0;
  while (!days.has(dowOf(day)) && ++guard <= 7) day++;
  return day;
}
function courseStarts() {
  const out = [];
  for (const k of Object.values(CLASSES)) {
    if (ks(k.id).status !== 'enrolled') continue;
    const ids = (k.courses || []).filter(id => COURSES[id]);
    const notStarted = ids.filter(id => !os(id).started && !COURSES[id].standing);
    if (!notStarted.length) continue;
    const days = classDays(ids);
    let cursor = dayOf(TODAY);
    const ownLessons = plannedLessons().filter(x => ids.includes(x.c.id));
    if (ownLessons.length) cursor = Math.max(cursor, Math.max(...ownLessons.map(x => x.due)) + COURSE_GAP_DAYS);
    for (const id of notStarted) {
      const c = COURSES[id];
      if (days) {
        cursor = snapToDays(cursor, days);
        out.push({c, due: cursor});
        // walk the course's lessons on the pattern; the next start is 3 days past the last one
        let last = cursor;
        for (let n = 2; n <= c.lessons.length; n++) last = snapToDays(last + 1, days);
        cursor = last + COURSE_GAP_DAYS;
        continue;
      }
      out.push({c, due: cursor});
      // + (COURSE_GAP_DAYS - 1): the span below lands cursor the day AFTER the course's own
      // estimated last lesson; the gap adds the rest of the 3 days on top of that one, same as
      // the anchor above.
      cursor += Math.max(1, Math.ceil(c.lessons.length / (PACE[dom(c)] || 1))) * 7 + (COURSE_GAP_DAYS - 1);
    }
  }
  return out;
}
/* The projected start of whatever comes after `courseId` in its own class's authored order —
   courseStarts()'s own projection, looked up rather than recomputed, so this and the timeline
   marker can never drift apart. Only ever consulted for a course that still has something
   queued after it; the class not being enrolled, courseId not belonging to one, or courseId
   being the last course in it all read as "nothing after this" (undefined). */
function nextCourseStartFor(courseId) {
  const c = COURSES[courseId];
  const k = c && c.class_id && CLASSES[c.class_id];
  if (!k) return undefined;
  const ids = (k.courses || []).filter(id => COURSES[id]);
  const i = ids.indexOf(courseId);
  if (i < 0) return undefined;
  const starts = new Map(courseStarts().map(x => [x.c.id, x.due]));
  for (let j = i + 1; j < ids.length; j++) {
    if (starts.has(ids[j])) return starts.get(ids[j]);
    // A later course that is ALREADY running (taught_limit allows two courses open at once,
    // so this is reachable) has real lessons of its own — use its actual first lesson rather
    // than a projection, which only ever covers not-yet-started courses.
    if (os(ids[j]).started) {
      /* PATCH-136 (B5) — the FIRST REMAINING lesson, not lesson 1. `plannedLessons()` drops every
         lesson at or below `lessons_complete`, so asking for `n === 1` finds nothing the moment the
         next course has completed its own first lesson — and the loop fell through to the course
         AFTER it. The previous course's last-lesson homework, quizzes and test were then dated off
         a course two places along: measured at Sep 18 while course 02's remaining lessons ran
         Sep 9–16 beside it. Those dates are written into concepts and synced home, so it is wrong
         data at rest, not just a wrong drawing — ~10 days out here, 5–6 weeks on the long piano
         courses. Sorting is required: `plannedLessons()` concatenates the lane deal with
         `daysLessons()`, so it is not globally ordered by date. */
      const remaining = plannedLessons().filter(x => x.c.id === ids[j]).sort((a, b) => a.due - b.due);
      if (remaining.length) return remaining[0].due;
    }
  }
  return undefined;
}
const datedTests = () => {
  const map = workDueMap();
  return Object.values(COURSES)
    .filter(c => !c.standing && os(c.id).status === 'enrolled')
    .flatMap(c => c.lessons
      .filter(u => u.n <= os(c.id).lessons_complete + 1)
      .map(u => ({c, n: u.n, t: testTaskOf(u), due: map[c.id] && map[c.id].get(u.n)})))
    .filter(x => x.t && x.due !== undefined && !P.homework[x.t.id]);
};

/* ---------------------------------------------------------------- mutations */
/* Quizzes are assigned the moment their lesson opens, due the day workDueMap() gives their
   lesson — the day before the NEXT lesson, not the lesson's own day and not today. A lesson
   outside the plan (standing, or the schedule genuinely has no slot for it) falls back to
   TODAY, which is what every quiz got before workDueMap() existed and is still right when
   there is no due date to match. */
function releaseLesson(courseId, n) {
  const day = workDueFor(courseId, n);
  const sr_due = day !== undefined ? dayIso(day) : TODAY;
  lessonConcepts(courseId, n).forEach(k => {
    if (cs(k).status === 'queued') setC(k, {status:'learning', sr_interval:0, sr_due});
  });
}

/* PATCH-110 — release is DERIVED from `lessons_complete`, not a side effect of whoever bumped it.
   Nate: "the test triggered instant release of the quizzes... they should be scheduled for the
   same day as the lessons homework and test."

   The page has always dated a release correctly — releaseLesson() reads workDueMap(). The
   breakage came from the other end: `/school test` grades a lesson test IN CHAT, and the
   workflow told it to write `sr_due: today` by hand, because nothing outside this file can run
   schedule(). So a lesson passed in chat handed its next lesson's quizzes over dated today,
   while the same pass clicked on the page dated them the day before the next lesson.

   Rather than teach the workflow to re-derive a scheduler it cannot see, the invariant is
   restored here, where the schedule actually lives: lessons up to `lessons_complete + 1` are
   open, so their quizzes are assigned, on the day workDueMap() gives them. Chat now only has to
   bump `lessons_complete` — a number it can get right — and the dates follow on next load.

   Two rules keep it from being a rewrite of history:
     · it only ever moves a quiz FORWARD out of `queued`, never back — same as releaseLesson();
     · it re-dates only a quiz that has never been sat AND is still at interval 0, i.e. one
       nothing has scheduled yet. The moment a quiz is rated, spaced repetition owns its date
       and this must not touch it. PATCH-071's resume-rebase is safe for the same reason it is
       correct: on a resume the plan is re-dealt from today, so the date this lands on is the
       newly planned one, never the old overdue one it was rescuing you from.
   Idempotent by construction, so it runs on every load and writes on almost none. */
function reconcileReleases() {
  let changed = false;
  const map = workDueMap();
  Object.values(COURSES).filter(c => !c.standing && os(c.id).status === 'enrolled').forEach(c => {
    const open = Math.min(os(c.id).lessons_complete + 1, c.lessons.length);
    for (let n = 1; n <= open; n++) {
      const day = map[c.id] && map[c.id].get(n);
      /* PATCH-136 (B1) — a lesson with NO plan slot still gets its quizzes. `plannedLessons()`
         drops everything at or below `lessons_complete`, so `workDueMap()` has no entry for a
         lesson already passed — and `continue` meant its `queued` concepts were never assigned at
         all. Pass two lesson tests in chat, open the page, and those quizzes sit `queued` with no
         date: invisible to every surface, unreachable by any control, repairable only by resetting
         the course. This function's own contract says lessons up to `lessons_complete + 1` are
         open and assigned; `continue` quietly made that false. TODAY is the right fallback and is
         exactly what `releaseLesson()` already uses when the plan has no slot — the work is owed
         now, because the lesson is already behind you. */
      /* PATCH-136 (B2) — and NEVER write a date in the past. The plan's anchors legitimately sit
         behind today (a course enrolled mid-term deals from `semStart()`; a slipped last lesson
         takes its date from the next course's projected start), so applying the plan date verbatim
         stamped brand-new quizzes `18d late`, undid PATCH-071's resume rebase on the very next
         boot, and re-dated a trailing lesson to yesterday on every open — which dirtied the doc and
         autosaved, republishing the artifact daily from a page nobody had touched. A due date in
         the past for work just handed to you is never the honest answer. */
      const iso = (day === undefined || dayIso(day) < TODAY) ? TODAY : dayIso(day);
      lessonConcepts(c.id, n).forEach(k => {
        const s = cs(k);
        if (s.status === 'queued') { setC(k, {status:'learning', sr_interval:0, sr_due:iso}); changed = true; }
        /* PATCH-137 (C1) — only a `learning` quiz gets re-dated. Without the status guard a
           `retired` entry written by hand with no rating matched the same test and had a plan date
           stamped on it, which is all `datedQuizzes()` needs to draw a chip nothing can serve. */
        else if (s.status === 'learning' && !s.sr_last_rating && !s.sr_interval && s.sr_due !== iso) { setC(k, {sr_due:iso}); changed = true; }
      });
    }
  });
  return changed;
}
/** `days`, Nate's day-picker: two weekday numbers (dowOf() convention), asked once at a TRUE
 *  first start (the "Start" flow in courseView() gates the picker on `!os(id).started`) and
 *  kept as-is on every later resume — passing nothing here just carries the stored value
 *  through, so a resume can never accidentally clear it. */
function enrollCourse(id, days) {
  const c = COURSES[id];
  /* spec-172 Phase 3b — the guard picks the course's OWN budget. Instrument courses count
     against instrument_limit, everything else against taught_limit, and standing courses
     against neither. The message says which budget is full, because "two at a time is the
     limit" is baffling when you are looking at two theory courses and a Hanon book. */
  if (!c.standing) {
    const slot = slotOf(c);
    if (slot.used >= slot.limit)
      return toast(`${slot.limit} ${slot.label}${slot.limit === 1 ? '' : 's'} at a time is the limit. Pause one first.`);
  }
  /* `started`, not lessons_complete: Course 04 was started and paused before a single lesson
     was turned in, so a lessons_complete test called it a fresh start and skipped the rebase
     below — on the exact course that prompted PATCH-071. Having a start date is what makes it
     a resume. */
  const resuming = !!os(id).started;
  setO(id, Object.assign({status:'enrolled', started: os(id).started || TODAY},
    /* PATCH-150 — `days.length` >= 1, not `=== 2`. THE THIRD GATE, and the one that made the
       first two look like they worked. Nate picked Thursday on a course capped at one lesson a
       week and got today and next Friday: the picker offered one day and daysLessons() accepted
       one, but this line silently DROPPED a one-day array, so `days` was never stored, and a
       course with no `days` is dealt by the lane — which is where those two arbitrary weekdays
       came from. Nothing errored; the choice just evaporated between the click and the store.
       Bounded upstream by weeklyAllowance() in the picker and again in daysLessons(), so this
       only has to stop an EMPTY array from writing a `days` key that would strand the course
       outside the lane with no day to land on. */
    (days && days.length) ? {days} : {}));
  /* PATCH-071 — `sr_due` keeps ticking while a course is paused, so resuming after three
     weeks would hand back every quiz weeks overdue and stamped late, which is a punishment
     for having paused rather than a schedule. Anything already past due is rebased to today:
     you come back to a clean queue. Costs no new stored field — it is a one-time write of the
     dates the engine already owns. Untouched if it was not overdue. */
  courseConcepts(id).forEach(k => {
    const s = cs(k);
    if (s.sr_due && s.sr_due < TODAY) setC(k, {sr_due: TODAY});
  });
  /* PATCH-138 (I-4) — one releaser. `releaseLesson()` (event-time) and `reconcileReleases()`
     (boot-time) both decided what was open and when it was due, and they DISAGREED on the no-slot
     case — TODAY versus skip — which is precisely what B1 was. The reconcile is idempotent, derives
     everything from `lessons_complete`, and is the one the page already trusts on every load; so
     it is now the only path, called from the events too. `releaseLesson` remains for the one thing
     reconcile cannot express: releasing a lesson the counter does not yet consider open. */
  reconcileReleases();
  const k = c.class_id;
  if (k && ks(k).status === 'available') setK(k, {status:'enrolled'});
  // PATCH-048 — a course is started, paused and resumed; only a CLASS is enrolled.
  toast(resuming ? `Resumed — back in progress.` : `Started — lesson 1's quizzes are assigned.`);
}
const unenrollCourse = id => { setO(id, {status:'available'}); toast('Paused. Progress kept.'); };
/* PATCH-081 — STOP is not PAUSE, and the difference is the whole point of having both.
   Pausing keeps everything and takes the course out of rotation (PATCH-071); stopping puts it
   back to never-started. That means THREE things go, not one: the course's own row, every one
   of its concepts' SR state, and its homework ticks. Leave any of them and a "reset" course
   comes back with homework already ticked and quizzes still carrying ratings, which is not a
   reset — it is a pause wearing a different label. Deleting the keys outright is what restores
   the documented defaults: an absent entry IS "not started" in this file's shape. */
function resetCourse(id) {
  delete P.courses[id];
  courseConcepts(id).forEach(k => { delete P.concepts[k]; });
  /* PATCH-137 (F5) — and its retakes. A reset wipes the course row, its concepts' SR state and its
     homework ticks precisely so the course is "never started" again; leaving the misses behind
     meant questions from a test on a course you had reset kept leading the daily session, with no
     course and no concept state behind them. */
  Object.keys(P.misses || {}).forEach(k => {
    const c = CONCEPTS[(P.misses[k] || {}).concept];
    if (c && c.course === id) delete P.misses[k];
  });
  const pre = id + ':';
  Object.keys(P.homework).forEach(k => { if (k.startsWith(pre)) delete P.homework[k]; });
  /* spec-173 — a FOURTH thing goes: the per-lesson turn-ins. Same reason as the homework
     ticks. Leave them and a "reset" course comes back with its homework already handed in,
     which is a pause wearing a reset's label — PATCH-081's exact finding, one section later.
     `drills` deliberately does NOT go with it. A tempo you actually played at the keys is
     instrument-track history (spec-160), not this course's progress: the Hanon index and the
     plugin's Technique track both read it, neither of them knows or cares that a school
     course happened to be the surface you logged it from, and stopping a course is not a
     claim that the practice never happened. */
  Object.keys(P.assignments).forEach(k => { if (k.startsWith(pre)) delete P.assignments[k]; });
  dirty();
}
/* PATCH-082 — un-enrolling a class takes its courses with it, and RESETS them rather than
   pausing them. Nate's call: leaving them paused made un-enrolling a class a half-action that
   left five paused courses behind it. */
/* ---------------------------------------------------------------- PATCH-121: un-enroll is undoable
   Nate: "when resetting a class from unenrolling create a backup that can be recalled if user
   wants to undo."

   Un-enrolling a class runs resetCourse() over every course in it, and resetCourse is a genuine
   delete — the course row, every one of its concepts' SR state, and its homework ticks (PATCH-081
   made it so on purpose: a "reset" that left ratings behind was a pause wearing a different
   label). Correct, and irreversible, on a control sitting one click from Enroll. A term's work
   could go on a misclick with nothing to fall back to.

   The snapshot is taken BEFORE the delete and holds exactly what the delete touches — the four
   keyed sections, filtered to this class's courses — so a recall is a plain re-merge of what was
   removed rather than a reconstruction from anything derived. Nothing else in the file writes
   `undo`, and it is capped at 20 entries: this is a safety net, not a version history. */
function snapshotClass(id) {
  const k = CLASSES[id];
  const ids = (k.courses || []).filter(c => COURSES[c]);
  const conceptKeys = ids.flatMap(courseConcepts);
  const pick = (src, keep) => Object.fromEntries(
    Object.entries(src || {}).filter(([key]) => keep(key)).map(([key, v]) => [key, JSON.parse(JSON.stringify(v))]));
  return {
    at: new Date().toISOString().slice(0, 19),
    class_id: id, class_short: k.short || k.title || id,
    courses:     pick(P.courses,     key => ids.includes(key)),
    concepts:    pick(P.concepts,    key => conceptKeys.includes(key)),
    assignments: pick(P.assignments, key => ids.includes(String(key).split(':')[0])),
    homework:    pick(P.homework,    key => ids.includes(String(key).split(':')[0])),
    classes:     pick(P.classes,     key => key === id),
    /* PATCH-137 (F5) — misses are deleted by the reset this snapshot precedes, so they must be in
       it or Recall silently restores a course without the retakes it owed. */
    misses:      pick(P.misses,      key => {
      const c = CONCEPTS[(P.misses[key] || {}).concept];
      return !!c && ids.includes(c.course);
    }),
  };
}
const undoAll = () => (P.undo || []);
const undoSize = u => Object.keys(u.courses).length + Object.keys(u.concepts).length
                    + Object.keys(u.assignments).length + Object.keys(u.homework).length
                    + Object.keys(u.misses || {}).length;
function unenrollClass(id) {
  const k = CLASSES[id];
  const ids = (k.courses || []).filter(c => COURSES[c]);
  const hit = ids.filter(c => P.courses[c] || courseConcepts(c).some(x => P.concepts[x]));
  const snap = snapshotClass(id);
  if (undoSize(snap)) { P.undo = [snap].concat(undoAll()).slice(0, 20); }
  ids.forEach(resetCourse);
  setK(id, {status: 'available'});
  return hit.length;
}
/* Recall MERGES rather than replaces: the school may have moved on since — another class
   enrolled, a quiz rated elsewhere — and stamping the whole section back would undo that too.
   Only the keys the snapshot actually holds are written, and the entry is consumed on success so
   a stale backup cannot be applied twice over newer work. */
function recallUndo(at) {
  const i = undoAll().findIndex(u => u.at === at);
  if (i < 0) return toast('That backup is no longer here.');
  const u = undoAll()[i];
  Object.entries(u.courses).forEach(([k2, v]) => { P.courses[k2] = v; });
  Object.entries(u.concepts).forEach(([k2, v]) => { P.concepts[k2] = v; });
  Object.entries(u.assignments).forEach(([k2, v]) => { P.assignments[k2] = v; });
  Object.entries(u.homework).forEach(([k2, v]) => { P.homework[k2] = v; });
  Object.entries(u.classes).forEach(([k2, v]) => { P.classes[k2] = v; });
  Object.entries(u.misses || {}).forEach(([k2, v]) => { P.misses[k2] = v; });   // PATCH-137 (F5)
  P.undo = undoAll().filter((_, n) => n !== i);
  dirty();
  toast(`Recalled ${u.class_short} — ${undoSize(u)} entries restored.`);
}
function completeLesson(id, n) {
  const c = COURSES[id];
  setO(id, {lessons_complete: Math.max(os(id).lessons_complete, n)});
  if (n + 1 <= c.lessons.length) reconcileReleases();   // PATCH-138 (I-4) — see enrollCourse
  // spec-172 — "Course final next" is the wrong close on a reps course (19–26): its final is
  // a performance check the reader sits at the instrument, not an exam the school hands out.
  toast(n + 1 <= c.lessons.length ? `Lesson ${n} completed — lesson ${n+1} is open.`
        : c.reps ? `Lesson ${n} completed — that was the last one.`
                 : `Lesson ${n} completed. Course final next.`);
}
/* PATCH-114 — Nate: "if a pop quiz is nailed, retire it from the pop quiz pipeline."
   `automatic` is now terminal. It used to graduate a quiz to `maintenance` and grow the interval,
   so the thing you had just proved you knew came back on a ladder — twice in one morning, in the
   case that prompted this. Retiring writes `status: 'retired'` and clears the date, which is all
   it takes: dueCore() only ever serves `learning` and `maintenance`, and datedQuizzes() needs an
   `sr_due` to draw a chip, so one status change removes it from the rotation, the counts, the
   timeline and the session at once. The SR fields are LEFT ON THE ENTRY rather than deleted —
   they are the record of how it got there, and putting a quiz back in rotation should not have
   to invent an ease from nothing.

   Worth saying plainly: this trades away what spaced repetition is for. The re-checks are the
   mechanism, and `automatic` on a fresh quiz now means "never ask again" rather than "ask again in
   a week." `solid` still graduates and still comes back, so the ladder is intact for anything
   short of certain — use it where you want the drip to keep working. Retired quizzes are listed
   on the Quizzes page with a control that puts one back. */
function rate(id, r) {
  const s = cs(id), out = {sr_last_rating:r, last_practiced:TODAY};
  /* PATCH-138 (I-1) — the exact entry as it stood, so Undo restores state rather than trying to
     compute an inverse. `undefined` is stored when there was no entry at all, which is a real and
     different thing from an empty one: putting `{}` back would create a row that means "queued
     with defaults" where the file's rule is that no row at all means that. */
  const before = P.concepts[id] ? JSON.parse(JSON.stringify(P.concepts[id])) : undefined;
  const undo = () => {
    if (before === undefined) delete P.concepts[id]; else P.concepts[id] = before;
    dirty(); render();
    toast(`Put back — ${(CONCEPTS[id] || {}).short || 'that quiz'} is as it was.`);
  };
  if (r === 'automatic') {
    setC(id, Object.assign(out, {status:'retired', sr_due:null}));
    /* PATCH-129 — `automatic` is one-way and nothing said so. Nate: "give the option, like, un retire
       it too... and just put a pop that says this is retiring if you wanna, like, revive later."
       The Un-retire control already exists (PATCH-114, on the Quizzes page under Retired); what was
       missing was any notice at the moment it happens. */
    toast(`Retired — ${(CONCEPTS[id] || {}).short || 'that quiz'} is out of rotation.`, undo);
    return;
  }
  if (r === 'forgot') {
    Object.assign(out, {status:'learning', sr_interval:0, sr_due: addDays(1),
      sr_ease: Math.max(1.3, +(s.sr_ease - SR.ease_step).toFixed(2))});   // PATCH-137 (C2)
  } else {
    let ease = s.sr_ease, iv = s.sr_interval;
    /* PATCH-137 (C2) — the ratchet only ever turned DOWN. `rusty` lowered ease, `forgot` left it
       untouched, and nothing raised it — so repeated forgetting cost less than occasional rustiness,
       and any ease you lost was permanent for the life of the quiz. `automatic` (then called `nailed`) used to raise it, but
       PATCH-114 made nailing terminal and the raise went with it. SM-2's convention is that the
       worst rating is the one that costs ease, so `forgot` takes the penalty too, and `solid` —
       now the best rating a quiz in rotation can get — earns it back. Bounded both ways. */
    if (r === 'rusty')  ease = Math.max(1.3, +(ease - SR.ease_step).toFixed(2));
    if (r === 'solid')  ease = Math.min(3.0, +(ease + SR.ease_step).toFixed(2));
    /* PATCH-137 (F2) — the multiply needs a FLOOR, not just a cap. A quiz rated `automatic` on its first
       sitting never gets an interval (the retire path above returns before one is written), so
       un-retiring it left `sr_interval: 0` — and `round(0 × ease)` is 0. `solid`, the one rating
       that should widen the gap, computed "due again today", every day, forever, eating a slot in
       the capped daily card each time. The only reason FND-C01 escaped is that chat hand-wrote an
       interval of 6 before any of this existed. */
    iv = r === 'rusty' ? Math.max(SR.min_interval, Math.round(iv / 2))
                       : Math.max(SR.min_interval, Math.min(SR.max_interval, Math.round(iv * ease)));
    /* PATCH-137 (F1) — a RETIRED quiz rated anything but `automatic` has to leave `retired`. Two live
       controls reach one — "Take it again" on the concept card, and the Completed section's chip —
       and neither touched `status`. So solid/rusty wrote a due date onto a still-`retired` entry:
       `datedQuizzes()` drew a chip for it on Today that aged forever, while `dueCore()` (which only
       serves learning/maintenance) could never serve it and every count read 0. An un-servable card
       crowding out real ones, unfixable from any surface. `forgot` un-retired silently, which is at
       least the right direction but said nothing. */
    if (s.status === 'retired') out.status = 'maintenance';
    if (s.status === 'learning') {           // graduating: start_interval is the floor
      if (r === 'rusty') { iv = 0; out.sr_due = addDays(1); }
      else { out.status = 'maintenance'; iv = Math.max(SR.start_interval, iv); }
    }
    out.sr_ease = ease; out.sr_interval = iv;
    if (!out.sr_due) out.sr_due = addDays(iv);
  }
  setC(id, out);
  toast(`Rated ${rLabel(r)}${out.sr_due ? ` — back ${shortDate(out.sr_due)}` : ''}.`, undo);
}

/* ---------------------------------------------------------------- saving */
let cap = null, readonly = false, saveTimer = null, saving = false, pending = false;
function chip(state, text) {
  const c = document.querySelector('.savechip');
  if (c) { c.dataset.s = state; c.lastChild.textContent = ' ' + text; }
}
/* PATCH-138 (I-6) — do not republish in the middle of a quiz session. Every rating dirties the
   doc, and a 2.5s debounce fires BETWEEN cards — each save republishes ~9.5 MB and reloads the
   view, so a six-card session could mean six reloads and six artifact versions of a page you never
   left. Saving is suspended while a session is live and flushed the moment it ends, so nothing is
   at risk for longer than the session itself; and the idle debounce moves to 20s, which is still
   far inside the "close the tab and lose it" window while being far outside "between two taps".
   `beforeunload` already guards an unsaved close, so a session abandoned by closing the tab warns
   rather than vanishing. */
const sessionLive = () => drill.queue.length > 0 && drill.i < drill.queue.length;
function dirty() {
  pending = true; chip('dirty', 'unsaved'); clearTimeout(saveTimer);
  /* The app saves to this device, which costs nothing and reloads nothing — so it does it at once,
     mid-session included. The quarter-second only folds a burst of ticks into one write. */
  if (LOCAL) { saveTimer = setTimeout(save, 250); return; }
  if (sessionLive()) return;                      // flushed by flushSave() when the session ends
  saveTimer = setTimeout(save, 20000);
}
/* Called wherever a session can end: the last card rated, or leaving the drill route. */
function flushSave() { if (pending && !readonly) { clearTimeout(saveTimer); save(); } }
/* PATCH-111 — a save must hand back EVERY data island the build put in, not the three this
   function happened to name. It listed `app-css`, `app-js` and `curriculum`, so `eartrain` and
   `bookpages` — the 20 ear-training clips and the 234 Hanon/Leavitt page scans, together about
   7 of the page's 9 MB — were silently dropped on the first save after any build. The page came
   back with Ear training and every book drill blank, and the only repair was a full
   `/school artifact` rebuild, which is exactly the thing a self-save is supposed to make
   unnecessary. Caught 2026-08-24, on a save that PATCH-110's boot reconcile fired by itself.

   Written as a LIST rather than five named consts on purpose: the next island added to build.py
   joins it by name and cannot be forgotten here, and one missing from the DOM is skipped rather
   than emitted as the string "null". */
/* spec-179 — `covers` and `charts` were MISSING from this list, and it cost exactly what
   PATCH-111 above says it costs. spec-176/176b added both islands on 2026-08-31 and did not join
   them here, so the first save after any rebuild rebuilt the document without them: 64 album
   sleeves fell back to lettered plates and all 69 chord charts went empty, on a page whose own
   comment two lines up promises "the next island added to build.py joins it by name and cannot be
   forgotten here". It can, and it was. The repair was the same full `/school artifact` rebuild
   PATCH-111 describes — which the self-save exists to make unnecessary. */
/* PATCH-162 (2026-09-20) — THE LIST IS GONE, because the list is what kept failing. Twice the
   comments above promised an island "cannot be forgotten here", and twice it was forgotten:
   PATCH-111 lost `eartrain` + `bookpages`, spec-179 lost `covers` + `charts`. Then on 2026-09-20 a
   view still running the pre-179 bundle self-saved and took `covers`, `charts` AND `resources` out
   in one go — 3.2 MB of the page: every album sleeve, all 69 chord charts, every lesson resource.
   Nate, on the second morning in a row of finding the page gutted: "do whatever is needed to fix".

   So stop restating what the document already knows. Every `script[type="application/json"][id]`
   in the DOM goes back out, in document order, whatever build.py chose to emit. Adding an island
   to build.py is now a ONE-file change, and no bundle — including one built before the island
   existed — can drop a section whose name it never learned.

   The head is carried the same way and for the same reason: build.py stamps `school-build` and
   `school-books`, buildDoc was dropping both on every save, and that is precisely why the gutted
   2026-09-20 page could not say which build it came from. The stamp tracks the BUNDLE's
   provenance, so a self-save preserves it rather than restamping it. */
function islandIds() {
  const ids = [].map.call(document.querySelectorAll('script[type="application/json"][id]'),
                          s => s.id);
  // `progress` is synthesised even if the DOM somehow lacks it: a save whose entire purpose is the
  // progress block must never produce a document without one.
  return ids.indexOf('progress') === -1 ? ids.concat('progress') : ids;
}
function buildDoc(progress) {
  const css = document.getElementById('app-css').textContent;
  const js  = document.getElementById('app-js').textContent;
  const S = '<' + 'script', E = '<' + '/script>';
  const fonts = document.querySelector('link[rel="stylesheet"]');
  const island = id => {
    // `progress` is the one island the save REPLACES; the rest are carried through verbatim.
    const body = id === 'progress' ? JSON.stringify(progress).replace(/</g, '\\u003c')
                                   : (document.getElementById(id) || {}).textContent;
    return body === undefined || body === null ? ''
      : `${S} type="application/json" id="${id}">${body}${E}`;
  };
  // build.py's own metas, carried verbatim — see PATCH-162 above.
  const metas = [].map.call(document.querySelectorAll('meta[name^="school-"]'),
    m => `<meta name="${esc(m.getAttribute('name'))}" content="${esc(m.getAttribute('content') || '')}">`
  ).join('');
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    // PATCH-030 — Hyperion is the vault, not the school. PATCH-161 — and build.py now appends
    // whose page it is, so READ the live title instead of restating it: a hardcoded name here
    // renames the page back to the shared one on the first save after a rebuild, and the only
    // symptom is two identically-named cards in the gallery again. Nothing assigns
    // `document.title`, so this is exactly what build.py emitted.
    `<title>${esc(document.title || 'Music School')}</title>` + metas +
    (fonts ? `<link rel="stylesheet" href="${esc(fonts.getAttribute('href'))}">` : '') +
    `<style id="app-css">${css}</style></head><body><div id="app"></div>` +
    islandIds().map(island).join('') +
    `${S} id="app-js">${js}${E}</body></html>`;
}
/* The app's save: one synchronous write of the whole progress block to this browser's storage.
   `LS_AT` is when — account sync compares it against the saved copy to decide who is newer. */
function saveLocal() {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(P));
    localStorage.setItem(LS_AT, new Date().toISOString());
    pending = false; chip('saved', 'saved on this device');
    if (navigator.storage && navigator.storage.persist && !saveLocal.asked) {
      saveLocal.asked = true; navigator.storage.persist().catch(() => {});
    }
    syncSoon();
  } catch (e) {
    chip('dirty', 'could not save — storage is full');
    toast("Couldn't save — this browser's storage is full or switched off.");
  }
}
async function save() {
  if (LOCAL) { if (pending) saveLocal(); return; }
  if (readonly || saving || !pending) return;
  if (!cap) { chip('ro', 'not saved'); return; }
  saving = true; chip('saving', 'saving');
  // clear `pending` BEFORE publishing: a successful publish reloads this view, and the
  // beforeunload guard must not fire an unsaved-changes dialog on our own reload.
  pending = false;
  try {
    sessionStorage.setItem(ROUTE_KEY, route);
    sessionStorage.setItem('hms.scroll', String(window.scrollY));
    if (drill.queue.length) sessionStorage.setItem('hms.drill', JSON.stringify(drill));
    await cap.publish(buildDoc(P));       // view reloads on success
    saving = false; chip('saved', 'saved');
  } catch (e) {
    saving = false; pending = true;
    const code = e && e.code;
    if (code === 'conflict') return;      // the shell is already reloading to the winner
    if (code === 'not_writer' || code === 'not_granted' || code === 'not_declared' ||
        code === 'capability_disabled' || code === 'capability_removed') {
      readonly = true; chip('ro', 'read-only'); render(); return;
    }
    if (code === 'rate_limited') { chip('dirty', 'retrying'); saveTimer = setTimeout(save, 15000); return; }
    chip('dirty', 'not saved — retrying'); saveTimer = setTimeout(save, 8000);
  }
}
window.addEventListener('beforeunload', e => {
  if (LOCAL) { if (pending) saveLocal(); return; }      // nothing to warn about: it is written now
  if (pending && !readonly) { e.preventDefault(); e.returnValue = ''; }
});
if (LOCAL) {
  // iOS does not reliably fire beforeunload when an installed app is swiped away; these two do.
  window.addEventListener('pagehide', () => { if (pending) saveLocal(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && pending) saveLocal();
  });
  /* Two windows of the app on one device share one saved copy. When the OTHER one writes, this
     one takes it rather than later saving its own older state over the top — the same stale-tab
     overwrite PATCH-165 describes, closed the cheap way. Skipped mid-quiz and with unsaved work. */
  window.addEventListener('storage', e => {
    if (e.key !== LS_KEY || e.newValue === null || pending || sessionLive()) return;
    sessionStorage.setItem(ROUTE_KEY, route);
    location.reload();
  });
}

let toastT = null;
/* PATCH-138 (I-1) — a toast can carry ONE action. The most-clicked control in the school (a
   rating) was one tap and permanent, while rarer and far safer actions got a two-click latch: a
   thumb landing on Forgot zeroed a 30-day interval with no recovery on any surface. `undo` is a
   thunk; the toast holds a little longer when it has one, because a message you must react to
   needs more than the time it takes to read a message you don't. */
function toast(msg, undo) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t);
    t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:9;' +
      'background:var(--ink);color:var(--ground);padding:9px 16px;border-radius:8px;font-size:13px;' +
      'font-weight:600;box-shadow:var(--shadow);max-width:min(90vw,420px);text-align:center;' +
      'display:flex;align-items:center;gap:12px;justify-content:center';
  }
  t.textContent = '';
  t.appendChild(document.createTextNode(msg));
  if (undo) {
    const b = document.createElement('button');
    b.textContent = 'Undo';
    b.style.cssText = 'font:inherit;font-weight:700;color:var(--ground);background:transparent;' +
      'border:1px solid var(--ground);border-radius:6px;padding:2px 9px;cursor:pointer;flex:0 0 auto';
    b.onclick = () => { t.style.opacity = '0'; clearTimeout(toastT); undo(); };
    t.appendChild(b);
  }
  t.style.opacity = '1';
  clearTimeout(toastT); toastT = setTimeout(() => { t.style.opacity = '0'; }, undo ? 6000 : 2600);
}

/* ---------------------------------------------------------------- ear training (spec-172)
   Twenty clips carried as PITCH DATA — {id, answer, events:[{notes:[midi], start, dur}]} —
   and synthesised here. Nate chose browser synthesis over mp3, so there is no audio file
   anywhere in the bundle and no encoder was needed to build one: 6 KB of JSON stands in for
   5 MB of WAV, on a page that already has a 16 MB ceiling and 5 MB of book scans in it.

   These clips are NOT quizzes and are deliberately not wired into the spaced-repetition
   engine. Nothing in the curriculum references an `ear-NN` id — Course 09's fourteen EAR
   concepts are their own thing — and there is no clip→concept mapping to invent: the clip's
   question IS the sound and its `answer` field is the answer. So they get their own surface,
   play / guess / reveal, and nothing they do reaches progress-<user>.json. */
const MIDI_HZ = n => 440 * Math.pow(2, (n - 69) / 12);
/* Feature-tested WITHOUT constructing anything — see audioCtx() for why that matters. */
const AUDIO_OK = typeof (window.AudioContext || window.webkitAudioContext) === 'function';
let AC = null, voices = [];
/* Verification hook. A headless browser cannot be listened to, so the player records what it
   scheduled — whether a context was ever built, and the voice count of the last clip — and
   the test asserts on that instead. Written only; nothing on the page reads it back. */
window.__ear = {ctx:false, plays:0, last:null};
/** The AudioContext is built on the CLICK and never at load: every current browser hands a
 *  page-load context back suspended under its autoplay policy, and the first Play is silent.
 *  Returns null rather than throwing where Web Audio is missing — the caller hides the
 *  affordance in that case (see AUDIO_OK in earView and rail). */
function audioCtx() {
  if (!AUDIO_OK) return null;
  try {
    if (!AC) {
      /* Lets sound play with an iPhone's silent switch on. */
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
      AC = new (window.AudioContext || window.webkitAudioContext)();
      window.__ear.ctx = true;
    }
    if (AC.state !== 'running') { try { const p = AC.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) {} }
    return AC;
  } catch { return null; }
}
/** One note. A triangle fundamental with a quiet sine an octave over it, through its own
 *  attack/decay envelope: plain enough to be honest about pitch, rounded enough that a
 *  four-note chord does not buzz. These are recognition drills, not a synth demo. */
function voice(ctx, out, midi, at, dur, peak) {
  const hz = MIDI_HZ(midi);
  const o = ctx.createOscillator(), o2 = ctx.createOscillator();
  const g = ctx.createGain(), g2 = ctx.createGain();
  o.type = 'triangle'; o.frequency.value = hz;
  o2.type = 'sine'; o2.frequency.value = hz * 2; g2.gain.value = 0.16;
  o.connect(g); o2.connect(g2); g2.connect(g); g.connect(out);
  /* Ramp times are clamped into order. A 0.42s scale note and a 1.8s chord run through the
     same envelope, and a decay point computed past the release would put two automation
     events out of sequence — which throws in Web Audio rather than degrading. */
  const a = at + 0.012;
  const d = Math.min(a + 0.18, at + dur * 0.55);
  const end = at + dur;
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(peak, a);
  g.gain.linearRampToValueAtTime(peak * 0.6, Math.max(d, a + 0.005));
  g.gain.linearRampToValueAtTime(0.0001, Math.max(end, d + 0.02));
  o.start(at); o2.start(at);
  o.stop(end + 0.03); o2.stop(end + 0.03);
  voices.push(o, o2);
}
/** Cut whatever is sounding. Hammering Play stacks clips on top of each other otherwise. */
function stopClip() {
  voices.forEach(o => { try { o.stop(); } catch {} });
  voices = [];
}
/** Schedule one clip. Returns the number of NOTES scheduled — a chord event carries several,
 *  so this is the sum over `events`, not the event count. */
function playClip(clip) {
  const ctx = audioCtx();
  if (!ctx || !clip) return 0;
  stopClip();
  const lp = ctx.createBiquadFilter(), master = ctx.createGain();
  lp.type = 'lowpass'; lp.frequency.value = 4200; lp.Q.value = 0.5;
  master.gain.value = 0.85;
  lp.connect(master); master.connect(ctx.destination);
  const t0 = ctx.currentTime + 0.06;      // headroom, so the first attack is not clipped
  const evs = clip.events || [];
  let n = 0;
  for (const ev of evs) {
    const notes = ev.notes || [];
    // Level scales with the square root of the voice count: a four-note chord and a single
    // note then read as the same loudness rather than the chord being four times as loud.
    const peak = 0.3 / Math.sqrt(Math.max(1, notes.length));
    const dur = Math.max(0.08, +ev.dur || 0.5);
    for (const m of notes) { voice(ctx, lp, m, t0 + (+ev.start || 0), dur, peak); n++; }
  }
  window.__ear.plays++;
  window.__ear.last = {id: clip.id, events: evs.length, notes: n};
  return n;
}
/* Which clip you are on and which answers you have revealed is per-viewer chrome, exactly
   like the Overview's folds (PATCH-084): it lives in sessionStorage and never in
   progress-<user>.json, which is the durable record and syncs home to the vault. */
let ear = {i:0, seen:[]};
try { const raw = sessionStorage.getItem('hms.ear');
      if (raw) { const v = JSON.parse(raw);
                 ear = {i: +v.i || 0, seen: Array.isArray(v.seen) ? v.seen : []}; } } catch {}
const earSave = () => { try { sessionStorage.setItem('hms.ear', JSON.stringify(ear)); } catch {} };
const earAt = () => EAR.length ? Math.max(0, Math.min(EAR.length - 1, ear.i | 0)) : 0;
const earSeen = id => ear.seen.indexOf(id) >= 0;
const earGo = n => { ear.i = ((n % EAR.length) + EAR.length) % EAR.length; earSave(); };

/* ---------------------------------------------------------------- render */
let route = sessionStorage.getItem(ROUTE_KEY) || (LIBMODE ? 'songs' : 'overview');
// The Library tool links straight to a shelf (library.html#drills); that beats whatever was open last.
if (LIBMODE && LIB_ROUTES.includes(location.hash.slice(1))) {
  route = location.hash.slice(1);
  // Used once: left in the address it would drag every later reload back to that shelf.
  try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
}
let filters = {strand:'', status:'', q:'', sq:'', genre:'', key:'', bpm:''};
let editStart = false;
/* Nate's day-picker: "when starting a course... prompted with a question of what days do you
   want to take the lessons... pick two days a week." A native prompt()/confirm() is blocked
   inside the artifact frame (see confirmAct below), so this is in-page chrome exactly like
   editStart — `pickingDays` holds the course id mid-pick (or null), `pickedDays` the weekdays
   checked so far, capped at 2 by the change handler. Reset on cancel or on commit; never
   persisted itself, only what enrollCourse() writes once "Start" is pressed. */
let pickingDays = null, pickedDays = [];
/* PATCH-081/082 — Stop and class un-enrol both destroy progress, and the page autosaves and
   republishes the moment they run, so a misclick is not recoverable from the page. One latch
   holds "you clicked it once"; the second click on the SAME control commits, and any other
   click clears it. Cheaper than a dialog, and a modal cannot be used here anyway — a native
   confirm() inside the artifact frame is blocked. */
let confirmAct = null;
let addingLesson = false;
let drill = {queue:[], i:0, shown:false, all:false};
try { const d = sessionStorage.getItem('hms.drill');
      if (d) { drill = JSON.parse(d); sessionStorage.removeItem('hms.drill'); } } catch {}

const go = r => {
  // PATCH-138 (I-6) — leaving a live session is the other way one ends; flush rather than wait out
  // the idle debounce with work sitting unsaved.
  if (route === 'drill' && r !== 'drill') flushSave();
  route = r; window.scrollTo(0,0); render();
};
/** PATCH-008 — open a quiz session over an explicit set, whatever its due dates say.
 *  `from` is where you came in from, so the session can hand you back to that course. */
function startDrill(ids) {
  if (ids.every(isMiss)) {                 // PATCH-112 — a retake-only session needs no gate
    drill = {queue: ids.slice(), i: 0, shown: false, all: true, from: route};
    return go('drill');
  }
  const real = ids.filter(id => CONCEPTS[id]);
  // PATCH-058 — the gate is enforced here too, not only on the button's disabled state.
  const q = real.filter(id => !hwLocked(id));
  if (!q.length) return toast(real.length
    ? `Finish the lesson's homework first — its quizzes unlock then.`
    : 'Nothing assigned here yet — turn the lesson in to get its quizzes.');
  drill = {queue: q, i: 0, shown: false, all: true, from: route};
  go('drill');
}
const pill = (c) => domPill(dom(c));
/* PATCH-042 — DISPLAY ONLY. The stored vocabulary is still spec-156's `available` →
   `enrolled` → `completed`, shared by progress-<user>.json, sync.py, the plugin's state
   merge and every workflow doc; none of that moved. What changed is what the page CALLS it:
   a class is still enrolled, a course now reads Not Started / In Progress / Completed /
   Paused. Paused needs no stored status either — `available` with lessons turned in is
   exactly "started, then stopped", which is what pausing already produces, so it is derived
   rather than recorded. Pass the course's state as the second argument to get the course
   vocabulary; pass nothing and you get the class one. */
const statusPill = (st, cst) => {
  if (cst) return st === 'completed' ? '<span class="pill pill-ok">Completed</span>'
    : st === 'enrolled' ? '<span class="pill pill-due">In Progress</span>'
    /* `started`, not lessons_complete. Paused means "you began this and stopped", and you can
       begin a course and stop before turning in a single lesson — which is exactly what
       happened to Course 04. Testing lessons_complete called that Not Started and hid the
       fact that five of its quizzes were already assigned. Third site with this flaw:
       courseAction() and enrollCourse()'s rebase had it too. */
    : cst.started ? '<span class="pill">Paused</span>'
    : '<span class="pill">Not Started</span>';
  return st === 'enrolled' ? '<span class="pill pill-due">Enrolled</span>'
    : st === 'completed' ? '<span class="pill pill-ok">Completed</span>'
    : '<span class="pill">Available</span>';
};
/** PATCH-048 — the course button says what it does in that vocabulary. */
const courseAction = (s) => s.status === 'enrolled' ? 'Pause'
  : s.status === 'completed' ? 'Start again'
  /* `started`, not lessons_complete — a course begun and paused before its first lesson was
     turned in is still a resume, and read "Start" here. Same flaw enrollCourse's rebase had. */
  : s.started ? 'Resume' : 'Start';

/* ---------------------------------------------------------------- PATCH-007: unlocks fold
   "What this unlocks" is a forward-looking aside — what this course buys you later — and it
   sat between the intro and the first lesson on all 18 course pages, pushing the material
   down. It folds into a collapsed <details>, the same collapsible shape Obsidian's `[!x]-`
   callouts already build in build.py, so it reuses .callout's styling.

   It arrives in TWO shapes and both fold:
     · a `**What this unlocks**` bold-label paragraph at the tail of the intro (16 courses),
       which markdown renders as <p><strong>…</strong></p> followed by its list — so the fold
       is done on the intro's HTML, by walking siblings until the next bold label or the end;
     · a `## What this unlocks` H2 section (courses 17 and 18), which build.py hands over as
       its own entry in c.sections — matched by name in courseView().
   Open/closed is remembered for the session: render() rebuilds the whole view on every state
   change, and an <details> that slammed shut when you turned a lesson in would read as a bug. */
const UNLOCKS = /^\s*what this unlocks\s*$/i;
let unlocksOpen = false;
const foldWrap = (title, bodyHTML) =>
  `<details class="callout co-unlocks" data-unlocks="1"${unlocksOpen ? ' open' : ''}>` +
  `<summary>${esc(title)}</summary><div class="co-body">${bodyHTML}</div></details>`;
/** A markdown bold-label line — <p><strong>Label</strong></p> and nothing else. */
const isLabelP = el => !!el && el.tagName === 'P' && el.children.length === 1 &&
  el.firstElementChild.tagName === 'STRONG' &&
  el.textContent.trim() === el.firstElementChild.textContent.trim();
const introCache = {};
function foldUnlocks(html) {
  const box = document.createElement('div');
  box.innerHTML = html;
  const lab = Array.from(box.querySelectorAll('p > strong'))
    .find(s => UNLOCKS.test(s.textContent) && isLabelP(s.parentElement));
  if (!lab) return html;                       // no such label — the intro renders untouched
  const head = lab.parentElement, body = [];
  for (let n = head.nextElementSibling; n && !isLabelP(n); ) {
    const next = n.nextElementSibling; body.push(n); n = next;
  }
  const holder = document.createElement('div');
  holder.innerHTML = foldWrap(lab.textContent.trim(), '');
  const det = holder.firstElementChild;
  body.forEach(el => det.querySelector('.co-body').appendChild(el));
  head.replaceWith(det);
  return box.innerHTML;
}
function introHTML(c) {                        // folding walks the DOM; cache per open-state
  const k = c.id + (unlocksOpen ? ':o' : ':c');
  if (!introCache[k]) introCache[k] = foldUnlocks(c.intro);
  return introCache[k];
}

function rail() {
  const due = quizzesOwed();   // PATCH-112/113 — retakes and blocked quizzes are owed too
  const item = (id, label, n) => `<button data-nav="${id}"${route === id || route.startsWith(id+':') ?
    ' aria-current="page"' : ''}>${label}${n !== undefined ? `<span class="n">${n}</span>` : ''}</button>`;
  // PATCH-031 — the band under the masthead counts what you are ENROLLED IN. It used to
  // name a term and a week out of 17; the term is a fiction the school does not need, and
  // the week now has a band of its own at the top of the Overview (PATCH-036).
  const kn = Object.values(CLASSES).filter(k => ks(k.id).status === 'enrolled').length;
  // Nate: "make the lefthand menu collapsible" (2026-08-23) — reuses the ovsec fold's own
  // storage key (secOpen/setSec are keyed by an arbitrary id string, "rail" is just another
  // one) so the toggle needs no new click handler: [data-sec-toggle] is already wired at the
  // delegated listener. render() reads the same key to size #app's --rail column.
  const open = railOpen();
  /* PATCH-129 — the chip must not say "saved" before anything has been saved, and must not say it
     at all on a page that cannot save. `readonly` stays false until the artifact capability
     resolves, so the old ternary painted "saved" on first render for EVERY reader — including one
     on a shared link, who cannot publish and whose work dies with the tab. She would tick homework
     all evening against a green dot. Three honest states: unknown until the capability answers,
     then read-only, then idle/unsaved. */
  const chipState = (cap === null && !readonly) ? ['wait', 'checking\u2026']
                  : readonly ? ['ro', 'read-only \u2014 nothing is saved']
                  : pending ? ['dirty', 'unsaved'] : ['saved', LOCAL ? 'saved on this device' : 'saved'];
  /* The header every Music tool opens with: a round button (home; in the Library shelves, back to
     Library's front page), the tool's icon and its name. The second round button opens and closes
     the menu. Styled by app-shell/music-skin.css. */
  const ICO = {
    home: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9.2 10 3.6l6.5 5.6"/><path d="M5.2 8.2v7.6h9.6V8.2"/></svg>',
    back: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5 6.5 10l5.5 5.5"/></svg>',
    menu: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6.5h12M4 10h12M4 13.5h12"/></svg>',
    shut: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5.5 5.5l9 9M14.5 5.5l-9 9"/></svg>'
  };
  const bar = (name, logo, href, label, icon) => `<div class="mbar">
      <a class="icon-btn" href="${href}" aria-label="${label}">${icon}</a>
      <img class="logo" src="${logo}" alt=""><span class="brand">${name}</span>
      <button class="icon-btn rail-toggle" data-sec-toggle="rail" aria-expanded="${open}"
        aria-label="${open ? 'Close menu' : 'Open menu'}">${open ? ICO.shut : ICO.menu}</button></div>`;
  const foot = `<div class="rail-foot">
      <div class="savechip" data-s="${chipState[0]}"><b></b><span> ${esc(chipState[1])}</span></div>
    </div>`;
  /* The Library tool's shelves (LIBMODE): the same views, their own menu. */
  if (LIBMODE) return `<aside class="rail${open ? '' : ' shut'}">
    ${bar('Library', '../library/icon-192.png', '../library/', 'Back to Library', ICO.back)}
    <nav>
      ${Object.keys(SONGS).length ? item('songs','Covers') : ''}
      ${item('drills','Drills')}
      ${item('originals','Originals')}
      ${TOOLS.length ? item('tools','Tools') : ''}
      ${item('files','My files')}
      <a class="navlink" href="../library/#/modes">Modes</a>
      <a class="navlink" href="../library/#/chords">Chords</a>
      <a class="navlink" href="../library/#/arps">Arpeggios</a>
    </nav>${foot}</aside>`;
  /* School inside Music: only what is yours as a student, plus the catalogue of classes. The
     shelves moved to the Library tool; the links at the bottom are the way to them. */
  if (LOCAL) return `<aside class="rail${open ? '' : ' shut'}">
    ${bar('School', 'icon-192.png', '../', 'Music home, all apps', ICO.home)}
    <div class="sem">${kn ? `${kn} ${kn === 1 ? 'class' : 'classes'} enrolled` : 'No classes enrolled'}</div>
    <nav>
      ${item('overview','Overview')}
      ${item('myclasses','My classes', kn || '')}
      ${item('classes','Classes', Object.keys(CLASSES).length)}
      ${item('homework','Homework',
          (hwDueList().length + extHwPlan().filter(x => !x.allDone && x.due <= dayOf(TODAY)).length) || '')}
      ${item('drill','Quizzes', due || '')}
      ${item('tests','Tests', datedTests().length || '')}
      ${item('ext','Outside lessons', extHomeworkDue() || '')}
      ${SLICES.length ? item('slices','Soundslice') : ''}
      ${item('sync','Activity & backup')}
      <div class="navgrp navgrp-2">In Library</div>
      <a class="navlink" href="library.html#songs">Covers</a>
      <a class="navlink" href="library.html#drills">Drills</a>
      <a class="navlink" href="library.html#files">My files</a>
    </nav>${foot}</aside>`;
  return `<aside class="rail${open ? '' : ' shut'}">
    <button class="rail-toggle" data-sec-toggle="rail" aria-expanded="${open}"
      aria-label="${open ? 'Collapse menu' : 'Expand menu'}"><span class="car"></span></button>
    ${/* School is one of the tools inside the Music app; this is the way back to its home screen. */
      LOCAL ? `<a class="rail-home" href="../" aria-label="Music home, all apps">
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9.2 10 3.6l6.5 5.6"/><path d="M5.2 8.2v7.6h9.6V8.2"/></svg>
        <span>Music</span></a>` : ''}
    <div class="mast"><h1>${LOCAL ? 'School' : 'Music School'}</h1>
      <div class="sem">${kn ? `${kn} ${kn === 1 ? 'class' : 'classes'} enrolled`
                            : 'No classes enrolled'}</div></div>
    ${/* PATCH-111 — Nate: "i just want to segment between what my stuff is verse whats in
          the system in general." Two groups, and that sentence is the rule for which is which:
          a tab belongs to MY SCHOOL if what it shows depends on what he has enrolled in, done
          or owes; it belongs to the library below if it would look identical on a vault that
          had never started a course. Ear training sits below on that test — the clips are
          assigned to nobody and are the same 20 for everyone. Sync and Patch notes sit below
          too: they are the machinery, not the coursework. */''}
    <nav>
      <div class="navgrp">My school</div>
      ${item('overview','Overview')}
      ${item('myclasses','My classes', Object.values(CLASSES).filter(k => ks(k.id).status === 'enrolled').length || '')}
      ${/* spec-173 B — beside Quizzes, and counted the same way: what is DUE, not what
            exists. A lesson whose homework is turned in leaves this count immediately, so
            the numeral is always "work owed today", never a total.
            PATCH-148 — outside-lesson homework counts here too, or the badge would disagree
            with the "N owed" the tab prints one click away. Same source as the tab's own
            Due-now section, so the two cannot drift. */
        item('homework','Homework',
          (hwDueList().length + extHwPlan().filter(x => !x.allDone && x.due <= dayOf(TODAY)).length) || '')}
      ${item('drill','Quizzes', due || '')}
      ${/* PATCH-124 — Tests gets a tab of its own. Its numeral counts what is SCHEDULED, not what
            has been sat: the page's other half is a record, and a badge on a record never clears. */
        item('tests','Tests', datedTests().length || '')}
      ${/* spec-172 — the listening surface. No count: the clips are assigned to nobody and
            due never, and a numeral beside them would read as work owed. The tab is dropped
            entirely where Web Audio is missing or the build shipped no clips — hiding the
            affordance rather than offering one that cannot do anything. */
        ''}
      ${item('ext','Outside lessons', extHomeworkDue() || '')}
      ${/* spec-178 — MY SCHOOL, not the library, on this rail's own test: what it shows depends
            entirely on what Nate's teacher has sent him, and would be empty on a vault that had
            never had a lesson. Countless for the reason drills, songs and tools each give in
            turn — a numeral here means WORK OWED TODAY, and a slice is a door, never a debt; the
            homework that assigns one is already counted on the Homework tab one line up. Hidden
            entirely on a build carrying no slices, same as Songs and Tools: a tab that opens on
            an empty shelf is worse than no tab. */
        SLICES.length ? item('slices','Soundslice') : ''}
      <div class="navgrp navgrp-2">Library</div>
      ${item('classes','Classes', Object.keys(CLASSES).length)}
      ${/* spec-174 — no count numeral, deliberately: every other numeral on this rail means
            WORK OWED TODAY (quizzes due, homework due), and a drill is never "due" — it is an
            always-available shelf. A numeral here would read as a debt nothing on the page can
            clear, same reasoning that already left Ear training countless. */
        item('drills','Drills')}
      ${/* spec-176 — the song library, and countless for the reason spec-174 gives one line up:
            a numeral on this rail means work owed today, and a shelf of 119 reference notes owes
            nothing. The shelf's size belongs on the page, where it is a fact about the library
            rather than a debt. Hidden entirely on a build that carries no songs — a school.html
            from before this spec has no `songs` key, and an empty tab is worse than no tab. */
        Object.keys(SONGS).length ? item('songs','Songs') : ''}
      ${/* spec-179 — the shared idea board, beside Songs because it is its sibling: their songs
            and the world's. Countless, like every shelf here, and for a sharper reason than
            "nothing is due" — the one count worth having would be captures not yet synced, and
            PATCH-126 already settled that a badge nothing on this page can clear does not go on
            this rail. The banner on the board itself carries that, where the sync it asks for is
            one line away. NOT hidden on an empty board, unlike Songs and Tools: those are shelves
            and an empty shelf is a dead end, while this one is where you go to write the first
            one. It is deliberately in the LIBRARY group and not MY SCHOOL — PATCH-111's own test
            is whether it would look different on a vault that never started a course, and this
            board would look exactly the same. */
        item('originals','Originals')}
      ${/* spec-177 — the tools shelf, and countless for the reason spec-174 and spec-176 each
            give in turn: a numeral on this rail means WORK OWED TODAY, and musictheory.net is
            never owed. Hidden entirely on a build carrying no tools, same as Songs — a tab that
            opens on an empty shelf is worse than no tab. */
        TOOLS.length ? item('tools','Tools') : ''}
      ${/* PATCH-119 — Ear training's tab moved into the Drill library (drillsView). The `ear`
            route is unchanged and still reachable from there. */''}
      ${/* App build — the reader's own copies of what the school cannot ship. Countless, like
            every shelf here: nothing on it is ever owed. */
        LOCAL ? item('files','My files') : ''}
      ${item('sync', LOCAL ? 'Activity & backup' : 'Activity & Sync')}
      ${/* PATCH-118 removed this tab; PATCH-126 puts it back, now BELOW Activity & Sync rather
            than above it. The numeral counts UNFILED notes only — a filed one has been acted on in
            the vault, and counting it would leave a badge nothing you can do here will clear.
            PATCH-163 (2026-09-22, Nate's call) ARCHIVES the tab again — noise reduction, same run
            that dropped the published-page box and the dated changelog callouts. Archived, not
            deleted: `notesView()` and the `notes` route are untouched, every note already written
            is still in progress-<user>.json, and `/school sync` still carries new ones home. Put
            the tab back by restoring this one call — do not rebuild the view. */''}
    </nav>
    <div class="rail-foot">
      <div class="savechip" data-s="${chipState[0]}"><b></b><span> ${esc(chipState[1])}</span></div>
    </div></aside>`;
}

/* ---------------------------------------------------------------- PATCH-037: the calendar
   The term used to be a ribbon of 17 abstract blocks — a shape you had to decode to learn
   "week 2 of 17". It is a calendar now, in the units the work is actually planned in: at
   least two full months, in-term days tinted and today marked.

   The grid's first column used to be the WEEKDAY THE SEMESTER STARTS ON, not Sunday — every
   row was exactly one school week, which let the left gutter carry a clean week number and
   let a whole row take the in-term tint. Nate: "i want the first date listed to be sun
   always... right now it changes based on start date." Rows are a plain Sunday week now, like
   every other calendar, which means a row CAN straddle two school weeks when the term doesn't
   start on a Sunday — so in-term shading moved from a per-ROW test to a per-DAY one (`dIn`
   below), which is exactly right regardless of row alignment and, as a side effect, shows a
   mid-week term start more precisely than the old whole-row tint did. The gutter still shows
   one number per row — the school week the row's SUNDAY falls in — since a row needs exactly
   one number and that is the least surprising choice; it can read a beat off from a day late
   in a straddling row, which is the one thing given up for a familiar grid.

   Nothing here declares a colour: the tint is --accent-soft, the marker --accent, both
   already repointed by [data-domain] and both resolving in either theme. */
function calendarBlock() {
  const weeks = scheduleWeeks(), wkNow = week(), t = dayOf(TODAY);
  // Cover the term if there is one, always cover today, and never fewer than two months.
  const lo = weeks ? Math.min(semStart(), t) : t;
  const hi = weeks ? Math.max(semEnd(), t) : t + 45;
  const d0 = new Date(lo * 864e5), d1 = new Date(hi * 864e5);
  const y0 = d0.getUTCFullYear(), m0 = d0.getUTCMonth();
  /* PATCH-137 (F14a) — the 4-month cap contradicted the "always cover today" line right above it.
     Anchored at `min(semStart, today)`, a term starting more than three months out spent the whole
     window on empty months and rendered ZERO term months; a 33-week class lost its tail; and a term
     that ended long ago showed no today cell at all. Covering both ends is the stated intent, so
     the window follows the span rather than truncating it — 8 is enough for the longest class here
     and still bounds a nonsense date range. */
  const span = Math.max(2, Math.min(8,
    (d1.getUTCFullYear() - y0) * 12 + (d1.getUTCMonth() - m0) + 1));
  const head = Array.from({length: 7}, (_, i) => `<span class="cdh">${DOW[i]}</span>`).join('');
  const thisYear = new Date(t * 864e5).getUTCFullYear();
  const months = [];
  for (let k = 0; k < span; k++) {
    const yy = y0 + Math.floor((m0 + k) / 12), mm = (m0 + k) % 12;
    const a = Math.round(Date.UTC(yy, mm, 1) / 864e5);
    const b = Math.round(Date.UTC(yy, mm + 1, 0) / 864e5);
    let cells = '';
    for (let s = a - dowOf(a); s <= b; s += 7) {
      const wn = weekNo(s), rowIn = weeks > 0 && wn >= 1 && wn <= weeks;
      const rowNow = rowIn && wn === wkNow;
      cells += `<span class="cw${rowIn ? ' in' : ''}${rowNow ? ' now' : ''}">${rowIn ? wn : ''}</span>`;
      for (let i = 0; i < 7; i++) {
        const n = s + i, dd = new Date(n * 864e5);
        const dIn = weeks > 0 && n >= semStart() && n <= semEnd();
        const dNow = dIn && weekNo(n) === wkNow;
        cells += `<span class="cd${dIn ? ' in' : ''}${dNow ? ' now' : ''}${
          dd.getUTCMonth() === mm ? '' : ' out'}${n === t ? ' today' : ''}"${
          n === t ? ' aria-current="date"' : ''}>${dd.getUTCDate()}</span>`;
      }
    }
    months.push(`<div class="cmo"><div class="cmo-h">${MONTH[mm]}${
      yy === thisYear ? '' : ` ${yy}`}</div>
      <div class="cgrid"><span class="cw cwh"></span>${head}${cells}</div></div>`);
  }
  /* PATCH-136 (B10) — the calendar is the widest fixed thing on the page (three month grids) and
     was pushing the whole body sideways on a phone. It scrolls inside its own box instead, the same
     rule the book scans and the practice log already follow: the page body never moves sideways. */
  return `<div class="calwrap"><div class="cal">${months.join('')}</div></div>`;
}

/* PATCH-036 — the current week, its dates, and the control that moves them, at the top of
   the page. The start-date editor (PATCH-015) used to live inside the Week stat tile, and
   PATCH-038 deleted every stat tile — this band is its new home, and the reason it had to
   land first. */
/* PATCH-105 — the "moved from <syllabus start>" note is gone. It existed to explain why week 1
   does not begin on the syllabus's own semester.start once PATCH-015's per-person start has
   moved it; Nate does not want it on screen, and the date range beside it already says when
   the week actually runs. The rule that dressed it (.wb-m) is kept, retired, in app.css.
   PATCH-106 — the term's total DAYS take that slot instead. Derived from the same two
   functions the calendar and the timeline are drawn from (semStart/semEnd), never from a
   number written down here, so it cannot drift from the term it is describing. */
function weekBand() {
  const weeks = scheduleWeeks(), w = week();
  const a = weeks ? weekStartDay(w) : semStart();
  const ctl = readonly ? ''
    : editStart ? `<div class="startedit">
        <input type="date" data-startdate value="${esc(dayIso(semStart()))}">
        <div class="row" style="gap:6px">
          ${P.semester_start ? `<button class="btn btn-quiet" data-startreset="1">Reset to ${
            esc(C.semester.start)}</button>` : ''}
          <button class="btn btn-quiet" data-startdone="1">Done</button></div></div>`
    : `<button class="lnkedit" data-editstart="1">change start</button>`;
  // Nate: "under weeks add total days with start and end date. remove term length from week
  // like" (2026-08-23) — the day count moves off the current week's own date range (it was
  // never that week's length, it was the whole term's) and down into its own line naming the
  // term's actual start and end.
  return `<div class="weekband">
    <div class="wb-n">${weeks
      ? `<span class="wb-k">Week</span><b>${w}</b><small>of ${weeks}</small>`
      : `<span class="wb-k">Not started</span>`}</div>
    <div class="wb-d">${weeks
      ? `${esc(shortDate(dayIso(a)))} – ${esc(shortDate(dayIso(a + 6)))}`
      : `starts ${esc(shortDate(dayIso(semStart())))}`}</div>
    <div class="wb-a">${ctl}</div></div>`;
}
/* PATCH-111 — the term's length, start and end. It used to sit under the week band at the very
   top (PATCH-106/the 2026-08-23 ask); Nate moved it to the calendar, which is the thing it
   actually describes — three months of tinted rows, and this is the caption saying how long
   that stretch runs. Kept as its own function so both callers can never drift. */
function termTotalLine() {
  const weeks = scheduleWeeks();
  if (!weeks) return '';
  const days = semEnd() - semStart() + 1;
  return `<div class="wb-total wb-total-cal">${days} days · ${
    esc(shortDate(dayIso(semStart())))} – ${esc(shortDate(dayIso(semEnd())))}</div>`;
}

/* PATCH-046 — the next fortnight, not a 17-week projection.
   A lesson reads as a class you have on a day — "Music Fundamentals, Thursday, Derivation
   Rules lesson 3" — because every lesson now carries a target completion date (see
   dueOffset above). PATCH-059 puts the quizzes on the same surface off their existing
   `sr_due`; no quiz date is invented here, it is the SR date the school already keeps.
   Anything whose day has already passed collects in one Overdue band at the top rather than
   silently falling off the back of the window. */
/* PATCH-085 — an emoji per CLASS, on the term-ahead chips and nowhere else.
   Nate: "put emojis on each thing so they're easy discernable. so i can immediatly see piano
   technique and guitar sight reading are different — this is just on the term ahead view. so
   each type has an emoji to differentiate since they're in the same color family."

   The colour on a chip carries the DOMAIN, not the class, so classes 8 and 9 both paint
   garnet and always will — they are both instrument work and that is the true thing the tint
   is saying. What separates them is the class name, set in 9.5px uppercase at the quiet end
   of the chip, which is not something you see, it is something you read. The emoji is the only
   mark here that resolves before reading.

   ONE meaning, one slot: this emoji always says WHICH CLASS. It never says lesson-vs-quiz.
   PATCH-077 made that distinction structural — a solid block with an accent rule down its
   edge against a dashed pill — which survives greyscale, a colourblind reader and a glance,
   and an emoji swap would have replaced a good separation with a worse one. So a quiz carries
   its own class's emoji too and keeps the word "Quiz" beside it.

   Keyed by class id, because that is stable and cannot be re-matched by an edit to a title,
   with the same title-regex fallback classCut() uses so a tenth class gets something
   reasonable instead of nothing. Scoped to the timeline by being read from lessonItem() and
   quizItem() only — deliberate, per the ask: the class tiles already carry an engraved cut
   (PATCH-020) doing this job at a size where a drawing beats a 12px glyph. */
/* PICKED AT RENDER SIZE, and two of them were repicked there. The first pass used
   \u{1F3BC} MUSICAL SCORE for Music Fundamentals and \u{1F39B} CONTROL KNOBS for Sound Design
   because they are the obvious objects, and at 34px they are lovely. At the 14px this actually
   renders they were a grey smudge of staff lines and a grey box of dots — indistinguishable
   from each other and from a missing-glyph tofu, which is exactly what the first screenshot
   showed. Replaced with the boldest silhouette that still means the class: a single note, and
   a speaker. Same lesson as PATCH-020's cuts — judge the drawing at the size it renders, not
   zoomed in, and take the readable object over the clever one.

   So the rule for editing this table: render the candidate at 14px against --raised, look at
   it, and only then commit. Detail loses; silhouette and one strong colour win. */
const CLASS_EMOJI = {
  '1': '\u{1F3B5}',            // Music Fundamentals — one note, the simplest musical mark
  '2': '\u{1F4D6}',            // Reading & Rhythm — an open book
  '3': '\u{270D}\u{FE0F}',     // Songwriting: Harmony & Melody — the writing hand
  '4': '\u{1F442}',            // Ear Training
  '5': '\u{1F941}',            // Beat & Arrangement
  '6': '\u{1F50A}',            // Sound Design — a speaker; the knobs went grey and muddy
  '7': '\u{1F3A4}',            // Vocals & Release
  '8': '\u{1F3B8}',            // Guitar Sight Reading  ─┐ the pair Nate named: one garnet
  '9': '\u{1F3B9}',            // Piano Technique       ─┘ between them, now unmistakable
};
const EMOJI_FOR = [
  [/guitar|fretboard/i,                   '\u{1F3B8}'],
  [/piano|keyboard|\bkeys\b/i,            '\u{1F3B9}'],
  [/vocal|voice|singing|release/i,        '\u{1F3A4}'],
  [/sound design|synth|timbre|patch/i,    '\u{1F50A}'],
  [/beat|arrang|drum|groove|sequen/i,     '\u{1F941}'],
  [/songwrit|melody|harmon|writing/i,     '\u{270D}\u{FE0F}'],
  [/\bear\b|listen|aural|interval train/i, '\u{1F442}'],
  [/rhythm|reading|notation|sight|tempo/i, '\u{1F4D6}'],
];
function classEmoji(k) {
  if (!k) return '\u{1F3B5}';
  if (CLASS_EMOJI[k.id]) return CLASS_EMOJI[k.id];
  const t = `${k.short || ''} ${k.title || ''}`;
  const hit = EMOJI_FOR.find(([re]) => re.test(t));
  return hit ? hit[1] : '\u{1F3B5}';
}
/** The class's emoji, hidden from assistive tech — every chip that carries one either names
 *  its class in text beside it or names it in the chip's title, so nothing is only in a glyph. */
/* PATCH-156 (2026-08-26) — Nate: "remove emojis too". Emptied at the single definition rather than
   deleted from eleven call sites: every caller is a timeline chip, the argument is still the class it
   was always given, and putting the mark back is one line rather than eleven. The class is still named
   in text right beside where the emoji was, so nothing that was only carried by the glyph is lost —
   which is also why the colour work of PATCH-153 had to land first: colour, not emoji, is what ties a
   chip to its lesson now. */
const emoTag = k => '';
/** The class a quiz belongs to, by way of the course its concept sits in. */
const quizClass = c => CLASSES[(COURSES[c.course] || {}).class_id];

/* PATCH-085 — the chip's IDENTITY leads. "Hanon I · lesson 2" is the thing you are looking
   for when you scan a term; the lesson's own title is what you read once you have found it.
   They used to be one 12.5px string joined by an em dash, at one weight, so neither led.
   Hoisted out of timelineBlock() (was a closure there) so the Overview's Today/Next up card
   can draw the same chips without a second copy of the markup. */
/* Nate: "lesson # underlined in the today and schedule views. helps to see what lesson"
   (2026-08-23) — one span, shared by every chip that names a lesson number, so the underline
   reads identically on Today and on the Schedule timeline (the same renderers draw both). */
const lnum = n => `<span class="lnum">lesson ${n}</span>`;
function lessonItem(x, late) {
  const k = CLASSES[x.c.class_id];
  /* data-lesson-N, for the same reason as data-date above: the chip's text is prose
     ("Derivation Rules · lesson 2 — Intervals as a System") and pulling a lesson number back
     out of prose is the mistake build.py already avoided once by reading the Pages column
     instead of the lesson title. The number is right here; hand it over.

     And it is `data-lesson-n`, NOT `data-lesson`, which is what this was written as first.
     `data-lesson` is not a free name — it is already a CLICK CONTRACT: the delegated handler
     matches `[data-lesson]` and runs `completeLesson(...d.lesson.split(':'))`, the Complete
     button's contract, whose value is "courseId:lessonNumber". A bare number on this chip
     matched that selector, so clicking a lesson on the term-ahead timeline stopped opening
     its course and instead tried to complete lesson NaN of a course called "2". Attribute
     selectors are exact, so the suffixed name cannot match `[data-lesson]` and reads out of
     the DOM just as well. Anything adding a data-* attribute here should grep the handler's
     selector list at `app.addEventListener('click', ...)` first.

     `data-course-lesson` rides alongside `data-course`/`data-lesson-n` rather than replacing
     them — calendar-plan.py scrapes the rendered page for the bare pair (see its `data-course`/
     `data-lesson-n` read at the top of this file's block comment), so removing them would
     silently break the calendar reconcile. `data-course-lesson` is the click contract that
     already opens a course ON its lesson (the homework page's "Open lesson N →"); the click
     handler checks it before the bare `data-course`, so having both on one element lands on
     the anchor instead of just the course's top. */
  return `<button class="tl-i tl-l${late ? ' late' : ''}" data-course="${esc(x.c.id)}"
    data-lesson-n="${x.n}" data-course-lesson="${esc(x.c.id)}:${x.n}"
    data-domain="${dom(x.c)}" title="Course ${esc(x.c.id)} — ${esc(x.c.short)}, lesson ${x.n}${
      k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}${esc(k ? k.short : `Course ${x.c.id}`)}</span>
    <span class="tl-t tl-lt"><b class="tl-n">${esc(x.c.short)} · ${lnum(x.n)}</b>${
      x.title ? `<span class="tl-s">${esc(x.title)}</span>` : ''}</span></button>`;
}
/* PATCH-154 (2026-08-26) — a multi-day lesson as a LANE, not a rail. Nate: "remove the line on the
   left and make it like a normal calendar app like google calendar would be. so a week spanning
   event would have its own lane so to speak."

   The rail PATCH-151 drew said "something spans these days" without saying what, which is the half
   of a calendar bar that carries no information. This is the whole bar: a block the width of a real
   chip, running the length of the window, titled once at the top the way Google Calendar titles an
   all-day event on its first day.

   It is built as one SEGMENT PER DAY ROW rather than a single row-spanning element. Spanning would
   mean dissolving `.tl-d` into a single page-wide grid, and `.tl-d` is what carries the row
   background, the `.now` highlight and the row padding — three things that would have to be rebuilt
   cell by cell to buy a purity nothing here needs. Segments butt together with the same negative
   block margin the rail used, so the seams close and the column reads as one object.

   THE START SEGMENT IS A REAL LESSON CHIP. It keeps `tl-l`, `data-course`, `data-lesson-n`,
   `data-course-lesson` and the `.tl-n`/`.tl-s` innards, because calendar-plan.py scrapes exactly
   that pair out of the rendered page to reconcile Google Calendar. A lane block that dropped them
   would make every spanning lesson invisible to the scrape — which does not fail loudly, it puts
   the lesson in the reconcile's `delete` list and removes its calendar event. Continuation segments
   deliberately carry NEITHER, so one lesson is scraped once, on its opening day. */
function laneSegment(sp, d, inner) {
  const x = sp.x, k = CLASSES[x.c.class_id];
  const edge = (d === sp.from ? ' start' : '') + (d === sp.to ? ' end' : '');
  /* PATCH-155 — the wrapper is a DIV and the lesson is a BUTTON INSIDE it, which is what lets the
     lesson's own work nest in the lane. Nate: "wrap the test in the event so it stays within the
     lane." A button cannot contain buttons, so the first shape here — segment-as-button — had no
     room for the chips; the contract simply moved inward one element. calendar-plan.py queries
     `.tl-l` and walks UP to `.tl-d`, so it finds the header exactly as before.

     ONE LINE, always. Nate: "i dont want the first day row to be big cus of the text." The header
     truncates like every other lesson chip instead of wrapping, and the closing date that used to
     print on the block is gone — it lives in the title attribute, and the block's own extent already
     says where the window ends, which is the entire point of drawing it as a bar. */
  const head = d === sp.from
    ? `<button class="tl-l tl-lnh" data-course="${esc(x.c.id)}"
        data-lesson-n="${x.n}" data-course-lesson="${esc(x.c.id)}:${x.n}"
        data-domain="${dom(x.c)}" title="Course ${esc(x.c.id)} — ${esc(x.c.short)}, lesson ${x.n}${
          k ? ` · ${esc(k.short)}` : ''} · open through ${esc(dayIso(sp.to))}">
        <span class="tl-k">${emoTag(k)}${esc(k ? k.short : `Course ${x.c.id}`)}</span>
        <span class="tl-t tl-lt"><b class="tl-n">${esc(x.c.short)} · ${lnum(x.n)}</b>${
          x.title ? `<span class="tl-s">${esc(x.title)}</span>` : ''}</span></button>`
    : '';
  /* `has` marks a segment that carries work of its own. The phone hides continuation segments — they
     are pure column, and there is no column in a single-file stack — but hiding one that had a test
     nested in it would delete the test from the small screen entirely. This is the flag that tells
     the breakpoint which continuations still have to be drawn. */
  return `<div class="tl-ln${edge}${inner ? ' has' : ''}" data-domain="${dom(x.c)}">${head}${
    inner ? `<div class="tl-lnw">${inner}</div>` : ''}</div>`;
}

/* PATCH-110 — a pending quiz (pendingQuizzes()) is drawn here too, and has to read as a
   different KIND of thing rather than a fainter copy of the same one: it is not yet yours to
   take, so it gets no `late` state (nothing unassigned can be overdue), no rating slot, and a
   title that says which lesson opens it instead of a due date it does not own yet. The date it
   is placed on comes off the projection (`q.due`), since a `queued` quiz has no `sr_due` at
   all — that absence IS what `queued` means, and inventing one here would be inventing state.

   PATCH-111 — and a quiz you have ALREADY SAT, come back around, says so. Nate: "i want to
   signify that it is a repeated pop quiz from before to avoid confusion... its confusing to see
   that it says the enharmonic equivalents was nailed and completed but its still scheduled to
   take again today."

   That confusion was the page's fault, not his. A sat quiz drew a green pill with its rating —
   "Nailed" — and then turned up on a later day still saying "Nailed", so the chip read as a
   finished thing that would not go away. Nothing on it said the second appearance was a
   REPEAT, which is the entire mechanism: spaced repetition brings a passed quiz back on
   purpose, and the rating shown is the LAST one, not a verdict on the sitting being asked for.

   So a repeat is now named — "Pop quiz" with a ↻ — and its rating is demoted to what it always
   was, the previous result. `quizTaken` is the test, the same one PATCH-057/069 settled on:
   carrying `sr_last_rating` is what "has been sat" means, and there is no second store. */
const quizRepeat = s => quizTaken(s);
function quizItem(q, late) {
  const c = CONCEPTS[q.id];
  const k = quizClass(c);               // the emoji's one job is the class, quizzes included
  const done = quizTaken(q.s);          // PATCH-077 — sat quizzes read differently
  if (q.pending) return `<button class="tl-i tl-q tl-w pend" data-course="${esc(c.course)}"
    data-domain="${dom(c)}" title="Quiz · not assigned yet — opens with lesson ${
      c.lesson}, then due ${esc(dayIso(q.due))}${k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}Quiz</span><span class="tl-t">${esc(c.short)}</span></button>`;
  const rep = quizRepeat(q.s);
  /* PATCH-138 (I-2) — the quiz chip is a BUTTON that does something. Every sibling chip on the
     Today card navigates somewhere; this one has carried no data-attribute since PATCH-123, so the
     first screen of the morning loop offered controls that silently did nothing when tapped.
     `data-drill-quiz` opens a one-card blind session on that quiz — the same handler the Quizzes
     page's Take button already uses. */
  return `<button class="tl-i tl-q tl-w${done ? ' done' : ''}${rep ? ' rep' : ''}${
    late && !done ? ' late' : ''}" data-drill-quiz="${esc(q.id)}"
    data-domain="${dom(c)}" title="${rep
      ? `Pop quiz — you have sat this before${q.s.last_practiced
          ? `, ${esc(shortDate(q.s.last_practiced))}` : ''}${q.s.sr_last_rating
          ? ` and rated it ${esc(rLabel(q.s.sr_last_rating))}` : ''}. It is back for spaced review, not unfinished.`
      : esc(qLabel(q.s.status))} · due ${esc(q.s.sr_due)}${
      k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}${rep ? '↻ Pop quiz' : 'Quiz'}</span>
    <span class="tl-t">${esc(c.short)}${rep
      ? ` <em class="wasr" data-pass="${rPassed(q.s.sr_last_rating) ? 'y' : 'n'}">was ${
          esc(rLabel(q.s.sr_last_rating))}</em>` : ''}</span></button>`;
}
/* Same dashed-pill shape as a quiz — "scheduled like quizzes" was the ask — landing on the
   lesson (testSection() draws the actual control there) rather than the drill flow, since a
   test isn't taken through startDrill. Only ever undone tests reach here (datedTests()
   filters), so there is no `.done` state to draw. */
function testItem(x, late) {
  const k = CLASSES[x.c.class_id];
  return `<button class="tl-i tl-q tl-w${late ? ' late' : ''}" data-course-lesson="${esc(x.c.id)}:${x.n}"
    data-domain="${dom(x.c)}" title="Lesson ${x.n} test · due ${esc(dayIso(x.due))}${
      k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}Test</span><span class="tl-t">${esc(x.c.short)} · ${lnum(x.n)}</span></button>`;
}
/* Nate: homework "completed... i want it to remain on the timeline but show that its turned
   in - make like how quizzes are handled." Same shape as quizItem() above: a `.done` class
   instead of vanishing, and `late` only paints the alarm colour when it is NOT done — a
   homework item turned in after its due day is still done, not late. datedHomework() no
   longer filters these out, so both states reach here now (it used to draw only the open
   ones, landing on the homework page either way since that's where it gets checked off). */
function homeworkItem(x, late) {
  const k = CLASSES[x.c.class_id];
  return `<button class="tl-i tl-q tl-w${x.done ? ' done' : ''}${late && !x.done ? ' late' : ''}" data-hw-open="${esc(x.c.id)}:${x.n}"
    data-domain="${dom(x.c)}" title="Lesson ${x.n} homework · ${
      x.done ? 'turned in' : `due ${esc(dayIso(x.due))}`}${
      k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}Homework</span><span class="tl-t">${esc(x.c.short)} · ${lnum(x.n)}${
      x.done ? ' <em data-pass="y">Turned in</em>' : ''}</span></button>`;
}
/* A coarse marker, not a lesson — opens straight to the course rather than an anchor that
   does not exist yet (nothing in it has been scheduled). Never late (courseStarts() anchors
   every projection on or after today), so there is no `late` param to draw. Nate: the chip
   "doesnt signify its a course besides the emoji" — `tl-t` now spells out "Course NN" the
   same way a lesson chip's title attribute does, not just the class's engraved cut. */
function startItem(x) {
  const k = CLASSES[x.c.class_id];
  /* `data-course-start`, `data-course-short` and `data-class-short`: calendar-plan.py (Google
     Calendar sync) needs to tell a course-start chip apart from a lesson chip and name both
     the course and its class in the event it creates — Nate: "include class in event for when
     courses arent started yet." Clean data rather than parsing `.tl-t`'s prose, same reasoning
     `data-lesson-n` was added for lessons (see lessonItem's own comment on this). */
  return `<button class="tl-i tl-q" data-course="${esc(x.c.id)}" data-course-start="1"
    data-course-short="${esc(x.c.short)}" data-class-short="${k ? esc(k.short) : ''}"
    data-domain="${dom(x.c)}" title="Course ${esc(x.c.id)} — ${esc(x.c.short)} · projected start ${
      esc(dayIso(x.due))}, roughly${k ? ` · ${esc(k.short)}` : ''}">
    <span class="tl-k">${emoTag(k)}Starts</span><span class="tl-t">Course ${esc(x.c.id)} · ${esc(x.c.short)}</span></button>`;
}

/* PATCH-148 — the next lesson with a real teacher, as an appointment. Drawn with the lesson
   shape (`.tl-l`) rather than the work shape, because that is what it is: a thing in the diary,
   not a task to tick. It carries no class, so `emoTag` has nothing to give it and it names the
   instrument instead. Clicking opens Outside lessons. */
const capWord = s => String(s || 'lesson').charAt(0).toUpperCase() + String(s || 'lesson').slice(1);
function extLessonItem(x, late) {
  /* `.tl-xl`, not `.tl-l` — see app.css. `.tl-l` is a scraper contract (cap-assert.py,
     calendar-plan.py) that reads `data-course` off every chip wearing it, and an outside
     lesson has no course to give. Drawn identically; named differently. */
  return `<button class="tl-i tl-xl${late ? ' late' : ''}" data-nav="ext" data-domain="teacher"
    title="Next ${esc(x.l.instrument || 'lesson')} lesson${
      x.l.teacher ? ` with ${esc(x.l.teacher)}` : ''} — ${esc(dayIso(x.due))}">
    <span class="tl-k">Lesson</span>
    <span class="tl-t tl-lt"><b class="tl-n">${esc(capWord(x.l.instrument))} lesson</b>${
      x.l.teacher ? `<span class="tl-s">${esc(x.l.teacher)}</span>`
                  : '<span class="tl-s">with your teacher</span>'}</span></button>`;
}
/* PATCH-148 — its homework, due the evening before that lesson. Same `.done` / `late` grammar as
   homeworkItem(): done survives on the timeline rather than vanishing (Nate's rule for course
   homework, and there is no reason an outside lesson should behave differently), and `late`
   only paints the alarm when it is NOT finished. */
function extHomeworkItem(x, late) {
  const done = x.done >= x.total;
  return `<button class="tl-i tl-q tl-w${done ? ' done' : ''}${late && !done ? ' late' : ''}"
    data-hw-open="ext:${esc(x.l.id)}" data-domain="teacher"
    title="${esc(capWord(x.l.instrument))} lesson homework from ${esc(x.l.date)} · ${
      done ? 'all done' : `${x.total - x.done} still open`} · due ${esc(dayIso(x.due))}">
    <span class="tl-k">Homework</span><span class="tl-t">${esc(capWord(x.l.instrument))} · ${
      esc(x.l.date)}${done ? ' <em data-pass="y">Done</em>'
        : ` <em>${x.done}/${x.total}</em>`}</span></button>`;
}

/* PATCH-112 — a retake on the term view. Drawn as a pop quiz because that is what it is, with
   the paper it came off named in the chip so a day carrying three of them does not read as
   three copies of the same thing. Clicking one opens a session over just that card. */
function missItem(x, late) {
  const c = CONCEPTS[x.m.concept], k = c ? quizClass(c) : null;
  return `<button class="tl-i tl-q tl-w rep miss${late ? ' late' : ''}" data-drill-miss="${esc(x.key)}"
    data-domain="${c ? dom(c) : 'theory'}" title="Retake — Q${esc(String(x.m.n))} of ${
      esc(x.m.test || 'a test')}, marked ${x.m.kind === 'partial' ? 'partly right' : 'wrong'}. Due ${
      esc(x.m.due)}.">
    <span class="tl-k">${emoTag(k)}↻ Retake</span>
    <span class="tl-t">${esc(x.m.test || '')} · Q${esc(String(x.m.n))}</span></button>`;
}

function timelineBlock() {
  const weeks = scheduleWeeks(), today = dayOf(TODAY);
  // If the term begins more than a fortnight out, show ITS first two weeks rather than
  // fourteen empty days.
  const t0 = (weeks && semStart() > today + 13) ? semStart() : today;
  const lessons = plannedLessons(), assigned = datedQuizzes(), tests = datedTests(),
        homework = datedHomework(), starts = courseStarts();
  // PATCH-148 — outside lessons. Their own arrays rather than folded into `lessons`/`homework`:
  // those carry a course and a lesson number and every renderer downstream reads them.
  const extLes = datedExtLessons(), extHw = datedExtHomework();
  /* PATCH-110 — projected quizzes join the assigned ones for DRAWING only. Two things are
     deliberately not shared with them: the Overdue block below, which reads `assigned` and not
     this list (an unassigned quiz cannot be late for anything), and the day floor — a pending
     quiz whose lesson day has already slipped is clamped onto the first drawn row rather than
     dropped off the top of the term, because the entire point of the projection is that no
     coming work is invisible. Clamped, not marked late: it is still work you have not been
     handed. */
  /* PATCH-123 — the schedule draws NO quizzes and NO retakes. Nate: "dont show retake test pop
     quizzes on the schedule in the overview page. same with pop quizzes in general. i want those
     to be a suprise under the today section when the day comes."

     This reverses PATCH-110's projection deliberately, and the reasoning it replaces is worth
     keeping visible: that patch put every coming quiz on the term view so no work would be
     invisible. The cost, which only shows once you live with it, is that a pop quiz you can see
     coming three weeks out is not a pop quiz — reading the date is a form of studying for it, and
     the whole point of a blind check is that you do not prepare for the specific card. Lessons,
     homework, tests and course starts still draw: those you SHOULD prepare for, which is exactly
     the line between them.

     Nothing is hidden, only deferred — todayBlock() serves quizzes and retakes on the day, the
     rail numeral counts them, and the Quizzes page lists every one with its date. */
  /* PATCH-149 (2026-08-26) — the FIRST sitting comes back. Nate: "i initially want the quiz
     when it first gets released since i havent taken it before - this first instance is what i
     want on the schedule. then after that it stays off the schedule."

     That splits PATCH-123's rule along the line its own argument was really drawn on. The case
     against drawing quizzes is that reading a date is a form of studying for the specific card,
     which is exactly what a blind check must not allow — but that only bites on a REPEAT, where
     the card is already known and the sitting is a spaced re-test. A quiz you have never taken
     is not a surprise being spoiled; it is assigned work with a due date, the same kind of thing
     as the homework and test drawn beside it, and it should be visible for the same reason.

     `quizTaken` is the split, the same test PATCH-111 uses to name a repeat: carrying
     `sr_last_rating` is what "has been sat" means. So a quiz draws exactly once — on its first
     due date — and every spaced return after that is silent, surfacing under Today on the day.

     Still excluded, and deliberately: `misses` (a retake exists only because a sitting already
     happened, so it is a repeat by definition — PATCH-123's line on retakes is untouched) and
     `pendingQuizzes()` (unreleased; "when it first gets RELEASED" is the ask, and a `queued`
     quiz has not been). */
  const quizzes = assigned.filter(x => !quizTaken(x.s)), misses = [];
  /* PATCH-078 — to the end of the TERM, not fourteen days. The fortnight was PATCH-046's
     answer to a 17-week wall of rows; the wall is the point now — Nate wants to see how much
     term is left. Floor of a week so a term that has already ended still renders something
     rather than an empty box.
     Extended to whatever actually landed furthest out — a custom-days course (daysLessons())
     or a class's projected course start (courseStarts()) can both fall well past the
     lane-computed term, and either one going dark past t1 would be a chip nobody ever sees. */
  /* PATCH-137 (C7) — the walk's end has to cover quiz dues too. It took only lessons and course
     starts, so a maintenance quiz scheduled past the final lesson fell beyond `t1` and was drawn
     nowhere at all — the one kind of work that outlives a course's lessons was the one kind the
     term view could not show. */
  /* PATCH-148 — the walk's end has to cover the next lesson too, for exactly the reason
     PATCH-137 (C7) added quizzes here: a teacher's date is set by the teacher, not by the lane
     machinery, so it routinely falls past the term the courses computed — and a day past `t1`
     is a day nothing is drawn on. */
  const lastItem = Math.max(0, ...lessons.map(x => x.due), ...starts.map(x => x.due),
    ...datedQuizzes().map(x => x.due), ...datedMisses().map(x => x.due),
    ...extLes.map(x => x.due), ...extHw.map(x => x.due));
  const t1 = Math.max(weeks ? Math.max(t0 + 6, weekStartDay(weeks) + 6) : t0 + 13, lastItem);

  /* Overdue collects everything whose day has passed, capped so a bad month cannot bury the
     fortnight underneath it — the counts still say how far behind you actually are. */
  const CAP = 6;
  /* PATCH-123 emptied lateQ for the same reason it emptied the day rows. PATCH-149 refills it from
     the same first-sitting set: a never-taken quiz whose day has passed is owed work, and dropping
     it here while drawing it one row down would make it vanish off the schedule the moment it went
     late — the one point at which you most need to see it. A REPEAT still never reaches this band,
     because it never reaches `quizzes` at all. Either way nothing is lost: Today serves everything
     at or before today, and the Quizzes page lists every one with its date. */
  /* PATCH-151 (2026-08-26) — a lesson is a WINDOW, not a point. Nate, on the weekly sight-reading
     course: "can we visually show somehow that the event spans a week and i dont have to have it
     done the day it starts. so it wont be overdue until lesson 2 starts."

     The chip was drawn on the day a lesson OPENS and went red the moment that day passed, which is
     only correct for a course whose lessons land back to back. Course 25 runs one lesson a Thursday:
     lesson 1 opens Thu and nothing is owed until the Wednesday before lesson 2, so from Friday
     onward the term view called a lesson late that was not merely fine but a week from due.

     `workDueMap()` already computes that closing day for every lesson — the day before the next one
     opens — and it is the same date the lesson's homework, quizzes and test already carry. So the
     window is not new state: it is the anchor those three were always sharing, now given to the
     lesson itself. Overdue reads the CLOSE, the chip still draws on the OPEN, and a lesson whose
     open day has slipped while its window is still running sits on today rather than falling off
     the top of the term. */
  const wdm = workDueMap();
  const lessonEnd = x => (wdm[x.c.id] && wdm[x.c.id].get(x.n)) ?? x.due;
  const lessonRow = x => Math.max(x.due, t0);
  const openL = lessons.filter(x => lessonEnd(x) >= t0);
  /* Only a genuinely multi-day window earns a lane — Nate's call between banding everything and
     banding only week-paced work: "multi-day gaps only". Five days is where that line sits: long
     enough that the window is the point (a week-paced course, where the whole question is "do I have
     to do this today?") and short enough to exclude Course 01's Sun/Wed pacing, whose longer window
     still closes in four days and would put a lane on nearly every row for no information.

     2026-09-14 — THE LENGTH GATE IS NOT THE RULE, AND NEVER WAS. Nate: "in the schedule view the
     blue lessons are showing like the red guitar sight reading bubbles where it spans over multiple
     days. i want the blue lessons to just display on the day they're scheduled."

     SPAN_MIN was picked to exclude theory by proxy — the comment above says so outright, naming
     Course 01's Sun/Wed pacing as the thing four days was chosen to miss. That proxy held only
     while every theory course ran twice a week. Course 02 enrolled 2026-09-13 with `days: [0]`,
     Sundays only, so its window closes seven days out, clears five, and earns a lane exactly as
     Course 25 does. Nothing regressed; the gate was measuring the wrong property from the start
     and a one-day-a-week theory course is the first case that told them apart.

     So the gate is DOMAIN now, which is what the feature was always for. The lane was built for the
     weekly sight-reading course (PATCH-151/154, Nate 2026-09-03: "im not seeing guitar sight reading
     span over") — instrument work is a week's practice you chip at, and the bar answers "do I have
     to do this today?". A theory lesson is reading you do on its day; its window exists so the chip
     does not go red early, and that is `lessonEnd`'s job, not the lane's.

     SPAN_MIN stays and still applies UNDER the domain gate: an instrument course dealt back-to-back
     lessons has no window worth drawing either. Production is out with theory — no production course
     is enrolled today, so this is a choice rather than an observation: lanes are instrument-only
     until Nate says otherwise.

     A lesson excluded here is not dropped. It falls to `dl` below and draws as an ordinary chip on
     its opening day — the same path a span already took when all three lanes were full — and that
     chip carries `.tl-l`, `data-course` and `data-lesson-n` exactly as the lane's start segment
     does, so calendar-plan.py's scrape is unaffected either way. */
  const SPAN_MIN = 5;
  const spans = openL.map(x => ({x, from: lessonRow(x), to: lessonEnd(x)}))
                     .filter(sp => dom(sp.x.c) === 'instrument'
                                && sp.to - sp.from + 1 >= SPAN_MIN)
                     .sort((a, b) => a.from - b.from || b.to - a.to);
  /* Lowest free lane wins, the standard interval-packing rule, so a lane is reused the moment its
     occupant closes instead of being held for the whole term. Capped at three (Nate's pick): past
     that the term view is more gutter than content, and the overflow is not dropped — a span with no
     lane free falls back to an ordinary chip on its opening day, which is what every lesson did
     before lanes existed. */
  const LANE_MAX = 3, laneUntil = [], laned = new Map();
  for (const sp of spans) {
    let i = 0;
    while (i < LANE_MAX && laneUntil[i] !== undefined && laneUntil[i] >= sp.from) i++;
    if (i >= LANE_MAX) continue;
    laneUntil[i] = sp.to; laned.set(sp.x, i); sp.lane = i;
  }
  const lanes = laneUntil.length;
  const byLane = Array.from({length: lanes}, (_, i) => spans.filter(sp => sp.lane === i));
  /* PATCH-155 — "<course>:<lesson>" of every laned lesson, so its homework, test and quizzes can be
     recognised on their due row and drawn inside the block instead of beside it. A quiz reaches this
     through its CONCEPT (which carries the course and the lesson that teaches it); homework and tests
     already carry both. Retakes deliberately do not: a pop quiz is not the lesson's assigned work,
     and `misses` is empty on this view anyway since PATCH-123. */
  const lanedKey = new Map();
  for (const sp of spans) if (sp.lane !== undefined) lanedKey.set(sp.x.c.id + ':' + sp.x.n, sp);
  const laneKeyOfQuiz = q => { const c = CONCEPTS[q.id]; return c ? c.course + ':' + c.lesson : null; };
  const lateL = lessons.filter(x => lessonEnd(x) < t0), lateQ = quizzes.filter(x => x.due < t0),
        lateT = tests.filter(x => x.due < t0), lateH = homework.filter(x => x.due < t0);
  /* PATCH-148 — an outside lesson's homework goes overdue the same way anything else does, and
     it is the one kind most worth surfacing: the deadline is a person you are about to sit in
     front of. FINISHED ones are not dragged into Overdue — a course's homework chip stays on
     its own day showing "Turned in", and a completed one appearing under a red heading would
     read as a debt you do not owe. A missed appointment is dropped rather than shown late: the
     lesson either happened (and gets captured) or it did not, and neither is a task. */
  const lateX = extHw.filter(x => x.due < t0 && x.done < x.total);
  const lateN = lateL.length + lateH.length + lateX.length;
  let out = '';
  if (lateN || lateQ.length || lateT.length)
    out += `<div class="tl-late"><div class="tl-lh">Overdue · ${lateL.length} lesson${
      lateL.length === 1 ? '' : 's'} · ${lateH.length + lateX.length} homework · ${
      lateQ.length} quiz${lateQ.length === 1 ? '' : 'zes'} · ${
      lateT.length} test${lateT.length === 1 ? '' : 's'}</div>
      <div class="tl-items">${lateX.map(x => extHomeworkItem(x, true)).join('')}${
      lateL.slice(0, CAP).map(x => lessonItem(x, true)).join('')}${
      lateL.length > CAP ? `<span class="tl-i tl-more">+${lateL.length - CAP} more lessons</span>` : ''}${
      lateH.slice(0, CAP).map(x => homeworkItem(x, true)).join('')}${
      lateH.length > CAP ? `<button class="tl-i tl-more" data-nav="homework">+${
        lateH.length - CAP} more homework</button>` : ''}${
      lateQ.slice(0, CAP).map(q => quizItem(q, true)).join('')}${
      lateQ.length > CAP ? `<button class="tl-i tl-more" data-nav="drill">+${
        lateQ.length - CAP} more quizzes</button>` : ''}${
      lateT.slice(0, CAP).map(x => testItem(x, true)).join('')}${
      lateT.length > CAP ? `<span class="tl-i tl-more">+${lateT.length - CAP} more tests</span>` : ''}</div></div>`;

  let cur = null;
  for (let d = t0; d <= t1; d++) {
    if (weeks) {
      const wn = weekNo(d);
      if (wn !== cur) {
        cur = wn;
        const a = weekStartDay(wn);
        out += `<div class="tl-wh"><span>${wn >= 1 && wn <= weeks ? `Week ${wn}`
          : 'Outside the term'}</span><span class="rule"></span><span class="tl-wr">${
          esc(shortDate(dayIso(a)))} – ${esc(shortDate(dayIso(a + 6)))}</span></div>`;
      }
    }
    /* A lesson that got a lane is drawn AS the lane and must not also appear as a chip. */
    const dl = openL.filter(x => lessonRow(x) === d && !laned.has(x));
    /* Every lane emits something on every row — a segment or an empty holder. A row that skipped one
       would shift the lanes beside it and the column would stagger. */
    /* Assigned first, pending after — the row caps at five and the cap must never spend a slot
       on a quiz you cannot take while hiding one you owe today. */
    const dqAll = quizzes.filter(q => q.due === d).sort((a, b) => (a.pending ? 1 : 0) - (b.pending ? 1 : 0));
    const inLane = k => k && lanedKey.has(k) && d >= lanedKey.get(k).from && d <= lanedKey.get(k).to;
    const dq = dqAll.filter(q => !inLane(laneKeyOfQuiz(q)));
    const dm = misses.filter(x => x.due === d);
    const dtAll = tests.filter(x => x.due === d), dhAll = homework.filter(x => x.due === d);
    const dt = dtAll.filter(x => !inLane(x.c.id + ':' + x.n));
    const dh = dhAll.filter(x => !inLane(x.c.id + ':' + x.n));
    const ds = starts.filter(x => x.due === d);
    let laneActive = false;
    const dsp = byLane.map(col => {
      const sp = col.find(s => d >= s.from && d <= s.to);
      if (!sp) return '<div class="tl-ln off" aria-hidden="true"></div>';
      laneActive = true;
      const key = sp.x.c.id + ':' + sp.x.n;
      const inner = dhAll.filter(x => x.c.id + ':' + x.n === key).map(x => homeworkItem(x)).join('')
        + dqAll.filter(q => laneKeyOfQuiz(q) === key).map(q => quizItem(q)).join('')
        + dtAll.filter(x => x.c.id + ':' + x.n === key).map(x => testItem(x)).join('');
      return laneSegment(sp, d, inner);
    });
    // PATCH-148 — the finished ones still draw here (Nate's rule for homework), which is also
    // why they were withheld from Overdue above: done work belongs on its day, not in a debt list.
    const dx = extHw.filter(x => x.due === d && !(x.due < t0 && x.done < x.total));
    const dxl = extLes.filter(x => x.due === d);
    const shown = dq.slice(0, 5), more = dq.length - shown.length;
    const empty = !dl.length && !dq.length && !dt.length && !dh.length && !ds.length
                  && !dm.length && !dx.length && !dxl.length && !laneActive;
    /* data-date is for READERS OF THE DOM, not for the screen — /school sync reconciles the
       term against a Google Calendar and has to know which day a row is. The row prints
       "Aug 20" and nothing else, and reconstructing a real date from that guesses at the year
       across a term that crosses one. The alternative was a second scheduler in Python, which
       could silently disagree with schedule(); one ISO string on the row it already knows the
       day number for costs nothing and keeps schedule() the only thing that deals a plan. */
    out += `<div class="tl-d${d === today ? ' now' : ''}${empty ? ' empty' : ''}"
      data-date="${dayIso(d)}">
      <div class="tl-dt"><b>${DOW[dowOf(d)]}</b><span>${esc(shortDate(dayIso(d)))}</span>${
        d === today ? '<span class="tl-td">today</span>' : ''}</div>
      <div class="tl-sp">${dsp.join('')}</div>
      <div class="tl-items">${dxl.map(x => extLessonItem(x)).join('')}${
        dl.map(x => lessonItem(x)).join('')}${
        dx.map(x => extHomeworkItem(x)).join('')}${
        dh.map(x => homeworkItem(x)).join('')}${
        dm.map(x => missItem(x)).join('')}${
        shown.map(q => quizItem(q)).join('')}${more > 0
        ? `<button class="tl-i tl-more" data-nav="drill">+${more} more quiz${
            more === 1 ? '' : 'zes'}</button>` : ''}${dt.map(x => testItem(x)).join('')}${
        ds.map(x => startItem(x)).join('')}${
        empty ? '<span class="tl-e">—</span>' : ''}</div>
    </div>`;
  }

  const st = standingCourses();
  return `${st.length ? `<p class="calnote" style="margin:0 0 10px">Daily alongside all of it:
      ${st.map(c => esc(c.short)).join(' · ')} — standing courses, which never close and so never
      set the end date.</p>` : ''}
    <div class="tl" data-lanes="${lanes}">${out}</div>${completedBlock()}`;
}

/* ---------------------------------------------------------------- PATCH-110: what is behind you
   Nate: "after a test is passed i want the schedule section to have a 'completed' section that
   puts in all the passed lessons completed things: the lesson itself, quizzes, homework, tests."

   The timeline above only ever draws forward — plannedLessons() deals what is still owed and
   trackLessons() drops everything at or below `lessons_complete`, which is right for a schedule
   and leaves a term with no record of itself. This is that record, and it is the same four
   objects a lesson is made of, drawn as the same chips, so a finished week reads like the week
   it was.

   Settled, not "test ticked", because two kinds of lesson end differently:
     · a lesson that sets a test is settled when that test is sat — the test is the last gate
       and it cannot open until the homework is in and every quiz is taken (testGate), so one
       tick genuinely stands for all four;
     · courses 19–26 set no lesson test at all (spec-172's reps courses). Waiting for a tick
       that is never authored would leave every instrument course permanently absent from here,
       so those settle on their own terms: homework turned in and every quiz sat. Same bar,
       minus the gate that does not exist.

   Newest first. The date is the latest real mark the lesson carries — the turn-in, or the last
   quiz sat — since nothing stores "when the test was ticked" and inventing a field to sort by
   would put new state in the file for a heading. A lesson with neither still sorts, by course
   and lesson number, rather than falling out of the list. */
const lessonSettled = (c, u) => {
  const t = testTaskOf(u);
  if (t) return !!P.homework[t.id];
  return turnedIn(c.id, u.n) && lessonConcepts(c.id, u.n).every(k => quizTaken(cs(k)));
};
function completedLessons() {
  return Object.values(COURSES)
    .filter(c => { const s = os(c.id).status; return s === 'enrolled' || s === 'completed'; })
    .flatMap(c => c.lessons.filter(u => lessonSettled(c, u)).map(u => {
      const qs = lessonConcepts(c.id, u.n);
      const marks = [as(c.id, u.n).turned_in, ...qs.map(k => cs(k).last_practiced)].filter(Boolean);
      return {c, u, qs, when: marks.sort().pop() || ''};
    }))
    .sort((a, b) => b.when.localeCompare(a.when)
                    || b.c.id.localeCompare(a.c.id) || b.u.n - a.u.n);
}
function completedBlock() {
  const rows = completedLessons();
  if (!rows.length) return '';
  return `<details class="tl-done">
    <summary><span>Completed</span><span class="tl-dn">${rows.length} lesson${
      rows.length === 1 ? '' : 's'}</span></summary>
    <div class="tl-dbody">${rows.map(({c, u, qs, when}) => {
      const k = CLASSES[c.class_id], t = testTaskOf(u);
      return `<div class="tl-drow" data-domain="${dom(c)}">
        <div class="tl-dh"><b>${esc(c.short)} · ${lnum(u.n)}</b><span>${esc(u.title || '')}</span>${
          when ? `<em>${esc(shortDate(when))}</em>` : ''}</div>
        <div class="tl-items">
          <button class="tl-i tl-l" data-course="${esc(c.id)}" data-domain="${dom(c)}"
            title="Lesson ${u.n} — ${esc(u.title || '')}">
            <span class="tl-k">${emoTag(k)}Lesson</span><span class="tl-t">${esc(u.title || c.short)}</span></button>
          ${turnedIn(c.id, u.n) ? `<button class="tl-i tl-q tl-w done" data-hw-open="${esc(c.id)}:${u.n}"
            data-domain="${dom(c)}" title="Lesson ${u.n} homework · turned in">
            <span class="tl-k">${emoTag(k)}Homework</span>
            <span class="tl-t">Turned in</span></button>` : ''}
          ${qs.map(id => { const s = cs(id), cc = CONCEPTS[id];
            return `<button class="tl-i tl-q tl-w${quizTaken(s) ? ' done' : ''}" data-domain="${dom(cc)}"
              title="Quiz · ${esc(cc.short)}${quizTaken(s) ? ` · ${esc(rLabel(s.sr_last_rating))}` : ''}">
              <span class="tl-k">${emoTag(k)}Quiz</span><span class="tl-t">${esc(cc.short)}${
                quizTaken(s) ? ` <em data-pass="${rPassed(s.sr_last_rating) ? 'y' : 'n'}">${
                  esc(rLabel(s.sr_last_rating))}</em>` : ''}</span></button>`; }).join('')}
          ${t && P.homework[t.id] ? `<button class="tl-i tl-q tl-w done" data-course-lesson="${esc(c.id)}:${u.n}"
            data-domain="${dom(c)}" title="Lesson ${u.n} test · sat">
            <span class="tl-k">${emoTag(k)}Test</span>
            <span class="tl-t">Sat <em data-pass="y">Passed</em></span></button>` : ''}
        </div></div>`;
    }).join('')}</div></details>`;
}

/* PATCH-039/040 — Enrolled lists CLASSES, and each one names the course actually in
   progress inside it. A class on its own says nothing about what you are working on, which
   is the one thing this section was good for. */
/* PATCH-072 — Overview and Classes now render the SAME card. The Enrolled section used to
   have a card of its own (`enrolledClassRow`, a header strip over a course list) that carried
   the same information in a different shape, so the two pages disagreed about what a class
   looks like. `classTile` is hoisted out of classesView() and used by both; Overview just
   feeds it the enrolled classes. The `.erow*` rules that dressed the old card are gone. */
function classTile(k) {
  const d = dom(k), st = ks(k.id).status;
  const ids = k.courses.filter(id => COURSES[id]);
  /* PATCH-122 — Nate: "instead of images for classes just make a thin top colored banner with a
     simple icon. want it to feel less ai looking." The engraved cut (PATCH-020's `classCut`) is
     gone from every surface: nine generated illustrations is exactly the texture he means, and a
     tile carrying one was 250px tall before it said anything. What replaces it is a 4px rule in
     the class's own domain colour plus the class's emoji — both already in the data, neither
     generated. The class NUMBER goes with it: "i dont want to feel the need to do them in order",
     and a 37px numeral atop every tile was the loudest thing arguing that you should.
     `classCut` and the CUT set stay defined but unused — restoring the artwork is putting the call
     back, and deleting a hundred lines of vector paths to re-derive later is a bad trade. */
  return `<div class="tile" data-domain="${esc(d)}">
    <div class="tile-bar"></div>
    <div class="tile-b">
      <div class="row" style="gap:6px"><span class="tile-ic" aria-hidden="true">${classEmoji(k)}</span>${domPill(d)}${
        k.standing ? '<span class="pill">Standing</span>' : ''}${statusPill(st)}</div>
      <h3>${esc(k.short)}</h3>
      <div class="tile-courses">${ids.length ? ids.map(id => {
        const c = COURSES[id], s = os(id);
        return `<button class="crow" data-course="${esc(id)}" data-s="${esc(s.status)}"
          title="Course ${esc(id)} — ${esc(c.short)} · ${s.lessons_complete}/${c.lessons.length} lessons">
          <span class="n">${esc(id)}</span><span class="cn">${esc(c.short)}</span>${
          meter(s.lessons_complete, c.lessons.length, true)}</button>`;
      }).join('') : '<div class="tile-empty">No courses listed for this class yet.</div>'}</div>
    </div>
    <div class="tile-foot">
      <button class="btn btn-quiet" data-class="${esc(k.id)}">Open class →</button>
      <button class="btn ${st === 'enrolled' ? '' : 'btn-go'}${
        confirmAct === 'class:' + k.id ? ' danger' : ''}" data-class-toggle="${esc(k.id)}"${
        readonly ? ' disabled' : ''}>${confirmAct === 'class:' + k.id
          ? 'Confirm — reset its courses' : st === 'enrolled' ? 'Un-enroll' : 'Enroll'}</button></div>
  </div>`;
}

/* PATCH-084 — every Overview section folds. Which ones are shut is per-viewer chrome, not
   school state, so it lives in sessionStorage and never touches progress-<user>.json — the
   file syncs home to the vault and a UI preference has no business travelling with it.
   Open is the default, so a section that has never been touched is open. */
/* PATCH-104 — the default is a PARAMETER now, not the constant `open`. Every Overview
   section still defaults open and passes nothing; the Quizzes page's Completed block ships
   FOLDED, and it needs to be able to say so without a written-off '0' in sessionStorage that
   the reader never chose. A section the reader HAS touched is honoured either way — only the
   untouched case reads this. */
const secOpen = (id, dflt = true) => {
  try { const v = sessionStorage.getItem('hms.sec.' + id);
        return v === null ? dflt : v !== '0'; }
  catch { return dflt; }
};
const setSec = (id, on) => { try { sessionStorage.setItem('hms.sec.' + id, on ? '1' : '0'); } catch {} };
/* PATCH-136 (B10) — the rail defaults SHUT on a narrow screen. Every careful 640px rule was firing
   inside a ~150px column, because nothing ever collapsed the 236px rail: one word per line, clipped
   headings, and Enroll buttons cut off invisibly under `.tile`'s overflow. 31 overflowing elements
   on Overview at 390x844; zero with the rail collapsed. The page is THE study surface and gets
   opened on phones and a Boox, so this is not an edge case.

   `secOpen` is consulted, not overridden — an explicit toggle is stored and still wins in both
   directions. This only changes what "never touched it" means, and only under 700px. Read through a
   helper because two callers (rail() and render()'s --rail column) must agree; when they disagreed
   the rail drew shut over a 236px gutter. matchMedia is wrapped because it throws in some embedded
   webviews, and a thrown matchMedia must not take the whole page with it. */
const narrowScreen = () => { try { return window.matchMedia('(max-width:700px)').matches; } catch { return false; } };
const railOpen = () => secOpen('rail', !narrowScreen());
function ovsec(id, title, body, action) {
  const open = secOpen(id);
  return `<section class="ovsec${open ? '' : ' shut'}" data-sec="${esc(id)}">
    <div class="ovsec-h"><button class="ovsec-t" data-sec-toggle="${esc(id)}"
        aria-expanded="${open}"><span class="car"></span>${esc(title)}</button>
      ${action || ''}</div>
    <div class="ovsec-b">${body}</div></section>`;
}

/* Nate: "add in stuff from the schedule for today (if any) and then upcoming things in the
   schedule - want a quick way to see current status and the next thing that needs to be
   done." One flat pool across every kind the Schedule section draws (lessons, homework,
   quizzes, tests, course starts), reusing its exact chip renderers so a chip means the same
   thing here as it does there — split into today's row and the next few DAYS that carry
   anything (not the next few ITEMS: a light day showing one thing while three land two days
   out would undersell "what's coming"). Returns null when there is nothing at all to show,
   same convention the "N quizzes due" section already uses. */
function todayBlock() {
  const today = dayOf(TODAY);
  const pool = [
    ...plannedLessons().map(x => ({due: x.due, html: lessonItem(x, x.due < today)})),
    ...datedHomework().map(x => ({due: x.due, html: homeworkItem(x, x.due < today)})),
    /* PATCH-148 — the outside lesson and its homework, on the day. Adding them to the schedule
       and not here would have left the one deadline set by a PERSON missing from the surface
       that answers "what is today" — and unlike a course lesson, a teacher's appointment cannot
       be pushed. No overdue catch-up here: `pool` is filtered to the exact day below, and an
       outside lesson's late homework is drawn in the Overdue band exactly like a course's. */
    ...datedExtLessons().map(x => ({due: x.due, html: extLessonItem(x)})),
    ...datedExtHomework().map(x => ({due: x.due, html: extHomeworkItem(x)})),
    ...datedTests().map(x => ({due: x.due, html: testItem(x, x.due < today)})),
    ...courseStarts().map(x => ({due: x.due, html: startItem(x)})),
  ];
  /* PATCH-137 (F3) — the guard used to count only lessons/homework/tests/starts, all of which are
     empty once a class is finished and its concepts are just cycling in maintenance. That is the
     system's STEADY STATE, and it made the Overview — the daily landing page — go dark exactly
     there: rail badge 8, Quizzes page "8 due", and Today showing nothing at all. Owed quizzes are
     computed below, so they have to be counted here too. */
  if (!pool.length && !datedQuizzes().some(x => x.due <= today)
      && !datedMisses().some(x => x.due <= today)) return null;
  // Nate: "change today & next up to just today" (2026-08-23) — dropped the upcoming-days
  // list entirely. Today still always gets a row once anything is dated anywhere (its own
  // "Nothing" if today specifically is quiet — that's the current-status check this card
  // exists for); the card itself only disappears when the school has nothing dated at all,
  // same guard as before.
  /* PATCH-123 — Today is where a pop quiz first appears, so it has to catch the overdue ones too:
     the schedule no longer draws them, and a quiz whose day slipped would otherwise have no place
     on this page at all. Lessons, homework, tests and starts keep the exact-day test — those are
     drawn on the term view and the Overdue band above it. */
  /* PATCH-129 — "skipped days need no catch-up" is the phase board's single most important
     property, and the DISPLAY was breaking it while the engine held. Miss five days and Today
     served eight cards stamped `5d late` `4d late` `3d late`, with the rail counting all of them.
     The three-a-day cap was working the whole time; nothing was capping what was SHOWN.

     Two changes, both display-only — no date is rewritten, nothing is dropped from the queue:
       · the day's serving is capped to `daily_drip`, oldest first, so a week away costs you one
         normal day's work rather than a wall;
       · `late` is not passed, so nothing is stamped with how many days you missed. The engine
         knows; telling you is just editorialising about days you did not practise.
     Retakes lead, as they do in the session. The overflow is named plainly and links to the
     Quizzes page, which is the honest place to see the whole queue. */
  const owedQ = datedQuizzes().filter(x => x.due <= today).sort((a, b) => a.due - b.due);
  const owedM = datedMisses().filter(x => x.due <= today).sort((a, b) => a.due - b.due);
  const perDay = Math.max(1, CFG.daily_drip || 3);
  const shownM = owedM.slice(0, perDay);
  const shownQ = owedQ.slice(0, Math.max(0, perDay - shownM.length));
  /* The overflow count comes from quizzesOwed(), NOT from the two lists above — they are what this
     card can DRAW (a quiz needs an `sr_due` to be dated, a retake needs to be uncleared), while
     quizzesOwed() is what the school actually considers owed, blocked ones included. Summing the
     drawable lists made the badge disagree with the rail numeral beside it: a five-day fixture
     owed seven and the card offered "+1 more waiting". One source, so the two can never drift —
     the same fix PATCH-113 made for the three headline counts. Floored at zero because the shown
     set is a subset of owed and a negative would mean a bug, not a number worth printing. */
  const hidden = Math.max(0, quizzesOwed() - (shownQ.length + shownM.length));
  const dueNow = [
    ...shownM.map(x => ({html: missItem(x)})),
    ...shownQ.map(x => ({html: quizItem(x)})),
    /* Nate: "maybe if it keeps saying later, just like goes like a backlog or something... it's
       not done or open things." Named as OPEN rather than late or overdue — it is work that is
       waiting, and how many days it waited is not information this card owes you. */
    ...(hidden > 0 ? [{html: `<button class="tl-i tl-more" data-nav="drill">+${hidden} open \u2192</button>`}] : []),
  ];
  const items = pool.filter(x => x.due === today).concat(dueNow);
  return `<div class="card tncard"><div class="tnd">
    <div class="tl-items">${items.length ? items.map(x => x.html).join('')
      : '<span class="tl-e">Nothing</span>'}</div></div></div>`;
}

/* PATCH-085 — the running order, and Nate set it: week band, calendar, due, term ahead,
   Enrolled. The band leads because it is the one line that says where in the term you are
   standing right now; PATCH-036 built it to land at the top of the page and the Enrolled tiles
   had since been pushed above it. Enrolled goes last for the mirror reason — a wall of class
   tiles is something you consult, not something you check, and it was sitting between the top
   of the page and everything that carries a date.
   Today slots in right after the band, ahead of the calendar (Nate's placement: "above the
   calendar section") — it is the one card that answers "what do I actually do right now", and
   the calendar answers "where am I", which is a slower question. */
function overview() {
  const due = dueList();
  const today = todayBlock();
  const plan = schedule();
  const enrolled = Object.keys(CLASSES).sort((a, b) => +a - +b)
    .filter(i => ks(i).status === 'enrolled').map(i => CLASSES[i]);
  return `<div class="view">
    <h2 class="vh">Overview</h2>
    ${weekBand()}
    ${/* PATCH-113 — Nate: "today section and pop quiz section both show the same thing. can we
          consolidate? i lean towards not havin the pop quiz section on the overview since i
          could go to the quizzes page." Right: everything due today is ALREADY drawn as a chip
          in Today, so the band under the calendar was the same set counted a second time with a
          button attached. The band goes and the button moves here, onto the section whose chips
          it acts on. The count lives on the rail's Quizzes tab and on the Quizzes page, which
          is where you go to work through them. */''}
    ${/* PATCH-137 (F4) — gate on what the SESSION can actually serve, not on what is owed.
          `quizzesOwed()` counts homework-blocked quizzes (rightly — they are owed), but the queue
          is built from `missDue() + dueList()`, which excludes them. With everything owed blocked,
          the button rendered and the click built an empty queue and dumped you back on the Quizzes
          landing with no explanation. */''}
    ${today ? ovsec('today', 'Today', today, (dueList().length || missDue().length)
        ? `<button class="btn btn-go" data-drill-start="${Math.min(CFG.daily_drip, dueList().length)
            || missDue().length}">Start quiz session</button>` : '') : ''}
    ${ovsec('calendar', 'Calendar', calendarBlock() + termTotalLine())}
    ${/* `plan.weeks` alone used to gate this, but that counts only the lane-paced courses \u2014
          a course scheduled entirely on its own chosen days (daysLessons()) contributes zero
          to it, so a term with nothing BUT a custom-days course rendered "Nothing scheduled"
          over real, dated work. Anything landing on the timeline at all keeps it open. */''}
    ${ovsec('term', 'Schedule', (plan.weeks || plannedLessons().length || courseStarts().length) ? timelineBlock()
      : `<div class="card" style="color:var(--muted);font-size:14px">
      <b style="color:var(--ink)">Nothing scheduled.</b>${lite(` Start a course and the term fills
      in here \u2014 ${paceLine()} a week, each on the day you take it.`, '')}</div>`)}
  </div>`;
}

/* PATCH-111 — My classes as its own page, the "mine" half of the rail's split. It is the
   same row the Overview draws, with the class's full course list under it: the Overview answers
   "what am I taking" in one line each, this answers "and where am I in each of its courses"
   without sending you to the library view, which lists all nine whether you enrolled or not. */
function myClassesView() {
  const mine = Object.keys(CLASSES).sort((a, b) => +a - +b)
    .filter(i => ks(i).status === 'enrolled').map(i => CLASSES[i]);
  return `<div class="view">
    <div class="spread"><div class="cv-head">
      <p class="eyebrow">Mine</p><h2 class="vh">My classes</h2>
      <p class="lede">The classes you are enrolled in, and the course in progress inside each.</p>
    </div><button class="btn btn-quiet" data-nav="classes">Class library \u2192</button></div>
    ${/* PATCH-122 — "make the my classes page formatted the same as the class library page." One
          tile component, two filters over it: the library shows all nine, this shows the enrolled
          ones. The compact `myClassRow` this replaced is gone with its rules — it existed for the
          Overview section removed a patch ago, and a second way to draw a class was the thing
          making these two pages disagree. */''}
    ${mine.length ? `<div class="tiles">${mine.map(classTile).join('')}</div>`
      : `<div class="card" style="color:var(--muted);font-size:14px">Nothing enrolled yet.${lite(`
         Classes and courses are opt-in \u2014 enroll a class from the
         <button class="xlink xlink-read" data-nav="classes">class library</button>, and start its
         courses one at a time.`, '')}</div>`}
  </div>`;
}


/* PATCH-012 — the row keeps its display numeral and gains two things that carry the system:
   its strand's call number, and a MEASURE in place of the percentage bar. One tick per
   lesson, filled when the lesson is completed — so "two left" is countable rather than
   inferred from a bar's length. "released" also went: wave 1 settled on `assigned`. */
/* PATCH-041 — the quiz counts came off the meta line: the row's job is the lessons, and the
   measure beside it already says how many are left.
   PATCH-121 — `full` puts some of it back, on the class page only. Nate: "include some info
   about the courses in the course rows." A class page is where you decide which course to start,
   and "4 lessons" alone does not support that decision — what it is about, how many quizzes it
   carries and what it waits on do. The Overview and My classes keep the terse row: there the
   question is progress, not choice. The blurb is the course note's own first sentence, stripped
   of markup rather than re-authored, so it can never drift from the note. */
const firstSentence = html => {
  const t = String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const m = /^(.{20,160}?[.!?])(\s|$)/.exec(t);
  return m ? m[1] : t.slice(0, 150);
};
function courseRow(c, full) {
  const s = os(c.id);
  const dep = (c.depends_on || []).filter(x => COURSES[x]);
  return `<button class="rowcard${full ? ' rowcard-full' : ''}" data-course="${c.id}" data-domain="${dom(c)}">
    <span class="num">${esc(c.id)}</span>
    <span><h3>${esc(c.short)}</h3><span class="meta">${s.lessons_complete}/${c.lessons.length} lessons${
      full ? ` · ${c.n_concepts} quizzes` : ''}${
      c.reps ? ' · played, not quizzed' : ''}${c.standing ? ' · standing' : ''}${
      full && dep.length ? ` · after ${dep.map(x => esc(COURSES[x].short)).join(', ')}` : ''}</span>${
      full && c.intro ? `<span class="rc-blurb">${esc(firstSentence(c.intro))}</span>` : ''}</span>
    <span class="row">${(c.strands || []).filter(Boolean).map(plate).join('')}${statusPill(s.status, s)}
      ${meter(s.lessons_complete, c.lessons.length)}</span>
  </button>`;
}

/* ---------------------------------------------------------------- PATCH-020: the cuts
   Each class tile is headed by a small engraved cut — one object out of that class's own
   world. It replaces PATCH-012's stave, which encoded course count, lesson count and status
   as pitch and notehead fill: real information, but in a picture the reader had to be told
   how to decode, printed in the one place on the tile nobody reads a legend for.

   Nothing was lost with it. Every number the stave carried is still on the tile, where it
   reads without a key: each course row is a measure of one tick per lesson, filled as the
   lesson is completed, and its call number takes the accent once the course is started; the
   meta line says in words how many courses are completed, how many are in progress, how many
   lessons are in, and whether the class closes with an exam or runs all semester. The one
   state the stave drew that the tile did not — enrolled but nothing completed yet — is now
   counted in that line; see `state` in the tile below.

   One hand across all nine. A 240×50 cut; everything stands on the same ground rule at
   y=45.5; structure is a 1.7px hairline and detail 1.05px, both non-scaling so a cut is drawn
   at the same weight whether the tile is 273px wide on the board or 320px on a phone;
   var(--surface) fills anything that would be white in life — keys, paper, a mic body — so
   an object stays an object on either ground. One solid accent mass per cut carries the
   focal weight. No literal colour anywhere: only --accent and --surface, so [data-domain]
   gives theory indigo, production teal and instrument garnet, and both themes resolve off
   the same rules. No type inside a cut — at this size a label is a smudge, and the tile
   body is already carrying the words. */

/* polar helper: degrees measured clockwise from twelve o'clock, the way a dial is read. */
function pol(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)];
}
const GROUND = '<line class="gl" x1="4" y1="45.5" x2="236" y2="45.5"/>';

const CUT = {};

/* 1 — Music Fundamentals · the circle of fifths. The one diagram that holds keys, intervals
   and their relative minors at once, and the first thing a theory room puts on the wall.
   Drawn big and segmented on purpose: the first pass was a plain ring of dots, which at tile
   size was indistinguishable from the knobs on classes 5 and 6. Twelve segments across two
   rings — majors outside, relative minors inside — cannot be mistaken for a knob. */
CUT.wheel = () => {
  const cx = 120, cy = 23.5, R = 22, M = 14.5, I = 7.5;
  let g = `<circle class="k" cx="${cx}" cy="${cy}" r="${R}"/>`
        + `<circle class="h" cx="${cx}" cy="${cy}" r="${M}"/>`
        + `<circle class="h" cx="${cx}" cy="${cy}" r="${I}"/>`;
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pol(cx, cy, I, i * 30), [x2, y2] = pol(cx, cy, R, i * 30);
    g += `<line class="h" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }
  const [ax, ay] = pol(cx, cy, I, -15), [bx, by] = pol(cx, cy, R, -15);
  const [px, py] = pol(cx, cy, R,  15), [qx, qy] = pol(cx, cy, I,  15);
  g += `<path class="q" d="M${ax},${ay} L${bx},${by} A${R},${R} 0 0 1 ${px},${py}
        L${qx},${qy} A${I},${I} 0 0 0 ${ax},${ay} Z"/>`
     + `<circle class="f" cx="${cx}" cy="${cy - 18.2}" r="2.4"/>`;
  return g;
};

/* 2 — Reading & Rhythm · a wind-up metronome. The rod pokes through the slot in the case,
   the weight sits partway up it, and the dashed arc is the swing. Nothing in the class is
   more literally its subject, and a metronome reads at any size. */
CUT.metronome = () => {
  const rod = pol(120, 37, 32, 15), lft = pol(120, 37, 32, -15);
  const wt = [120 + (rod[0] - 120) * 0.52, 37 + (rod[1] - 37) * 0.52];
  let g = `<path class="o" d="M97,41 L110,10 L130,10 L143,41 Z"/>
    <rect class="o" x="92" y="41" width="56" height="4.5" rx="1.5"/>
    <rect class="f" x="108" y="7.2" width="24" height="3" rx="1.3"/>`;
  for (const y of [18, 25, 32]) g += `<line class="h" x1="110" y1="${y}" x2="115.5" y2="${y}"/>`;
  g += `<path class="h" style="stroke-dasharray:1.8 2.8" d="M${lft[0]},${lft[1]} A32,32 0 0 1 ${rod[0]},${rod[1]}"/>
    <line class="k" x1="120" y1="37" x2="${rod[0]}" y2="${rod[1]}"/>
    <rect class="f" x="${(wt[0] - 6.5).toFixed(2)}" y="${(wt[1] - 2.5).toFixed(2)}" width="13" height="5"
      rx="1.2" transform="rotate(15 ${wt[0].toFixed(2)} ${wt[1].toFixed(2)})"/>
    <circle class="f" cx="120" cy="37" r="2"/>`;
  return g;
};

/* 3 — Songwriting: Harmony & Melody · a pencil across a sheet of manuscript. The dots on the
   page rise and fall (melody); the strokes above the top rule are chord slashes (harmony).
   The class is the act of writing, so the cut shows the writing, not the result. */
CUT.page = () => {
  const notes = [[62, 30.5], [80, 24], [98, 27.5], [116, 20.5], [134, 25.5]];
  let g = `<g transform="rotate(-4 118 26)">
    <rect class="o" x="46" y="7" width="120" height="37" rx="2"/>`;
  for (const y of [14, 20.5, 27, 33.5]) g += `<line class="h" x1="53" y1="${y}" x2="159" y2="${y}"/>`;
  for (const x of [60, 80, 100]) g += `<line class="h" x1="${x}" y1="12.6" x2="${x + 5}" y2="8.6"/>`;
  g += `<polyline class="h" points="${notes.map(p => p.join(',')).join(' ')}"/>`;
  for (const [x, y] of notes)
    g += `<ellipse class="f" cx="${x}" cy="${y}" rx="3.1" ry="2.3" transform="rotate(-20 ${x} ${y})"/>`;
  g += `</g><g transform="rotate(-31 150 42)">
    <rect class="f" x="145" y="38.5" width="5.5" height="7" rx="2"/>
    <rect class="o" x="150" y="38" width="44" height="8" rx="1"/>
    <rect class="q" x="150" y="38" width="6" height="8"/>
    <line class="h" x1="158" y1="42" x2="192" y2="42"/>
    <path class="o" d="M194,38 L204,42 L194,46 Z"/>
    <path class="f" d="M200.4,40.6 L204,42 L200.4,43.4 Z"/></g>`;
  return g;
};

/* 4 — Ear Training · a struck tuning fork. The fork is the reference pitch the whole class
   is built on; the rings say the work is listening, not reading. */
CUT.fork = () => {
  const cx = 94, cy = 23.5;
  let g = `<path class="k" style="stroke-width:2.2" d="M85,4 L85,25 Q85,34 94,34 Q103,34 103,25 L103,4"/>
    <line class="k" style="stroke-width:2.2" x1="94" y1="34" x2="94" y2="42.5"/>
    <circle class="f" cx="94" cy="44" r="3"/>`;
  /* four rings, each opened just wide enough to stay inside the plate: the further out it
     travels the flatter the arc, which is also how it looks. */
  [[30, .62], [42, .44], [54, .3], [66, .2]].forEach(([R, op]) => {
    const th = Math.asin(20.5 / R) * 180 / Math.PI;
    const a1 = pol(cx, cy, R, 90 - th), a2 = pol(cx, cy, R, 90 + th);
    g += `<path class="h" style="stroke-opacity:${op}" d="M${a1[0]},${a1[1]} A${R},${R} 0 0 1 ${a2[0]},${a2[1]}"/>`;
  });
  return g;
};

/* 5 — Beat & Arrangement · a step sequencer. Sixteen steps across three lanes with a real
   pattern in them — kick, snare, hats — a tempo knob and a playhead between steps 5 and 6.
   The one object in the school that IS both a beat and its arrangement, and the only shape
   in this set that wants the full width of the banner. */
CUT.sequencer = () => {
  const x0 = 44, pitch = 11.625, w = 8.6, lanes = [12.5, 22, 31.5], h = 7.5;
  const hits = [[0, 6, 10], [4, 12], [0, 2, 4, 6, 8, 10, 12, 14]];
  const kn = pol(22, 25, 5, -40), t0 = pol(22, 25, 9.5, -140), t1 = pol(22, 25, 9.5, 140);
  let g = `<rect class="o" x="5.5" y="6.5" width="229" height="37" rx="4.5"/>
    <path class="h" d="M${t0[0]},${t0[1]} A9.5,9.5 0 1 1 ${t1[0]},${t1[1]}"/>
    <circle class="k" cx="22" cy="25" r="6.5"/>
    <line class="k" x1="22" y1="25" x2="${kn[0]}" y2="${kn[1]}"/>
    <line class="h" x1="37.5" y1="11" x2="37.5" y2="39"/>`;
  lanes.forEach((y, l) => {
    for (let i = 0; i < 16; i++) {
      const on = hits[l].includes(i);
      g += `<rect class="${on ? 'f' : 'qq'}" x="${(x0 + i * pitch).toFixed(2)}" y="${y}"
        width="${w}" height="${h}" rx="1.5"/>`;
    }
  });
  g += `<line class="k" x1="112.2" y1="9" x2="112.2" y2="41.5"/>
    <path class="f" d="M108.7,7.6 L115.7,7.6 L112.2,11.6 Z"/>`;
  return g;
};

/* 6 — Sound Design · an oscillator on a scope, sine bending into saw, and the filter knob
   next to it. Sound design is watching a waveform change while you turn something; this is
   that, and it separates cleanly from class 5's grid at a glance. */
CUT.osc = () => {
  const kn = pol(200, 25, 9.5, 55), t0 = pol(200, 25, 17.5, -145), t1 = pol(200, 25, 17.5, 145);
  return `<rect class="o" x="13" y="7.5" width="152" height="35" rx="3.5"/>
    <line class="h" style="stroke-dasharray:1 3" x1="19" y1="25" x2="159" y2="25"/>
    <path class="k" d="M21,25 C25.5,14 30,14 34.5,25 C39,36 43.5,36 48,25
      C52.5,14 57,14 61.5,25 C66,36 70.5,36 75,25 L81,36 L105,14 L105,36
      L129,14 L129,36 L151,14 L151,36 L157,22"/>
    <path class="h" d="M${t0[0]},${t0[1]} A17.5,17.5 0 1 1 ${t1[0]},${t1[1]}"/>
    <circle class="o" cx="200" cy="25" r="13.5"/>
    <line class="k" x1="200" y1="25" x2="${kn[0]}" y2="${kn[1]}"/>
    <circle class="f" cx="200" cy="25" r="2"/>`;
};

/* 7 — Vocals & Release · a large-diaphragm condenser in its shockmount, pop filter in front.
   The vocal booth in one object. Release is a date, not a shape — the tile's meta line says
   what closes the class, so the cut stays with the part that has a picture. */
CUT.mic = () => {
  let g = `<g transform="translate(16 0)">
    <circle class="qq" cx="74" cy="22" r="16"/>
    <circle class="k" cx="74" cy="22" r="16"/>
    <circle class="h" cx="74" cy="22" r="11.5"/>`;
  for (const x of [68, 74, 80]) g += `<line class="h" x1="${x}" y1="12.4" x2="${x}" y2="31.6"/>`;
  g += `<path class="k" d="M74,38 C76,45 96,47 118,44.6"/>
    <path class="k" d="M104,22 L104,32 Q104,40 126,40 Q148,40 148,32 L148,22"/>
    <line class="k" x1="126" y1="40" x2="126" y2="43"/>
    <rect class="o" x="112" y="6" width="28" height="32" rx="11"/>
    <path class="q" d="M114,17 A12,12 0 0 1 138,17 L138,27 L114,27 Z"/>`;
  for (const y of [12, 15.5, 19, 22.5, 26]) g += `<line class="h" x1="115.5" y1="${y}" x2="136.5" y2="${y}"/>`;
  g += `<line class="h" x1="113" y1="29.5" x2="139" y2="29.5"/>
    <rect class="f" x="119" y="32" width="14" height="3" rx="1.5"/>
    <circle class="f" cx="104" cy="22" r="2.1"/><circle class="f" cx="148" cy="22" r="2.1"/>
    <rect class="f" x="114" y="42.9" width="24" height="2.6" rx="1.3"/></g>`;
  return g;
};

/* 8 — Guitar Sight Reading · the neck itself, headstock to the fifteenth fret, drawn on the
   real fret spacing (d = L(1 − 2^−n/12)) so it compresses toward the body the way a neck
   does. Six strings, gauged: the low E is drawn heavier than the high E. Reading on guitar
   is a position problem, and the position markers are what you read against. */
CUT.neck = () => {
  const NUT = 42, END = 234, L = (END - NUT) / (1 - Math.pow(2, -15 / 12));
  const fret = n => NUT + L * (1 - Math.pow(2, -n / 12));
  let g = `<path class="o" d="M14,10 L38,10 L38,40 L14,40 Q9,40 9,35 L9,15 Q9,10 14,10 Z"/>`;
  for (const x of [16, 24, 32]) {
    g += `<line class="h" x1="${x}" y1="10" x2="${x}" y2="15"/><circle class="f" cx="${x}" cy="10" r="2.6"/>`
       + `<line class="h" x1="${x}" y1="40" x2="${x}" y2="35"/><circle class="f" cx="${x}" cy="40" r="2.6"/>`;
  }
  g += `<rect class="qz" x="${NUT}" y="11" width="${END - NUT}" height="28"/>
    <line class="k" x1="${NUT}" y1="11" x2="${END}" y2="11"/>
    <line class="k" x1="${NUT}" y1="39" x2="${END}" y2="39"/>
    <rect class="f" x="38.5" y="9" width="3.5" height="32" rx="1"/>`;
  for (let n = 1; n <= 15; n++)
    g += `<line class="h" x1="${fret(n).toFixed(2)}" y1="11" x2="${fret(n).toFixed(2)}" y2="39"/>`;
  for (const n of [3, 5, 7, 9])
    g += `<circle class="q" cx="${((fret(n - 1) + fret(n)) / 2).toFixed(2)}" cy="25" r="2.6"/>`;
  const d12 = ((fret(11) + fret(12)) / 2).toFixed(2);
  g += `<circle class="q" cx="${d12}" cy="18.5" r="2.4"/><circle class="q" cx="${d12}" cy="31.5" r="2.4"/>`;
  [1.5, 1.3, 1.15, 1, .9, .8].forEach((sw, i) =>
    g += `<line class="h" style="stroke-width:${sw};stroke-opacity:.8" x1="38.5"
      y1="${(14 + i * 4.4).toFixed(1)}" x2="${END}" y2="${(14 + i * 4.4).toFixed(1)}"/>`);
  return g;
};

/* 9 — Piano Technique · two octaves in elevation, the felt strip along the fallboard. It pairs with class 8's neck on purpose —
   the two instrument classes get the surface you actually play on, in the same garnet. */
CUT.keys = () => {
  const X = 6, W = 228, n = 14, w = W / n;
  const blacks = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13];  // no black key at E|F or B|C
  let g = `<rect class="q" x="${X}" y="4.5" width="${W}" height="3.5" rx="1.2"/>
    <rect class="o" x="${X}" y="10" width="${W}" height="32" rx="2"/>`;
  for (let i = 1; i < n; i++)
    g += `<line class="h" x1="${(X + i * w).toFixed(2)}" y1="10" x2="${(X + i * w).toFixed(2)}" y2="42"/>`;
  for (const i of blacks)
    g += `<rect class="f" x="${(X + i * w - 4.6).toFixed(2)}" y="10" width="8.6" height="18.5" rx="1.2"/>`;
  return g;
};

/* The cut is chosen off the class TITLE, not its number, so a renumbered curriculum keeps
   its pictures. Order matters: "Guitar Sight Reading" must be claimed by guitar before
   /reading/ claims it for the metronome. */
const CUT_FOR = [
  [/guitar|fretboard/i,                  'neck',      'a guitar neck, headstock to the fifteenth fret'],
  [/piano|keyboard|\bkeys\b/i,           'keys',      'two octaves of a piano keyboard'],
  [/vocal|voice|singing|release/i,       'mic',       'a condenser microphone and pop filter'],
  [/sound design|synth|timbre|patch/i,   'osc',       'a waveform on a scope beside a filter knob'],
  [/beat|arrang|drum|groove|sequen/i,    'sequencer', 'a sixteen-step sequencer holding a beat'],
  [/songwrit|melody|harmon|writing/i,    'page',      'a pencil lying across a sheet of manuscript'],
  [/\bear\b|listen|aural|interval train/i,'fork',     'a struck tuning fork'],
  [/rhythm|reading|notation|sight|tempo/i,'metronome','a wind-up metronome mid-swing'],
  [/fundament|theory|scale|key/i,        'wheel',     'the circle of fifths'],
];

function classCut(k) {
  const t = `${k.short || ''} ${k.title || ''}`;
  const hit = CUT_FOR.find(([re]) => re.test(t)) || CUT_FOR[CUT_FOR.length - 1];
  return `<svg class="art" viewBox="0 0 240 50" role="img" aria-label="${esc(hit[2])}">${GROUND}${CUT[hit[1]]()}</svg>`;
}

/* PATCH-011 — the nine classes as a board of tiles, 3 up on a desktop page and 1 on a
   phone, so the shape of the school is one screen instead of one long scroll. The full
   course rows that used to sit inside each card were the reason a card was 250px tall;
   inside a tile a course is one line — number, name, and its own small measure. */
/* `id` is either a page-side `cap-YYYYMMDD-N` or a synced note's own filename stem — neither
   ever carries a colon, so `homework:ext:<id>` splits cleanly into exactly the three parts
   render()'s `route.split(':')` expects, the same shape a real course's `homework:<c>:<n>`
   already uses. */
function extHomeworkPage(id) {
  const l = extAll().find(x => x.id === id);
  if (!l) return extView();
  const hw = l.homework || [];
  const done = hw.filter(h => !!P.homework[h.id]).length;
  const late = l.next_date && l.next_date < TODAY && done < hw.length;
  return `<div class="view">
    <div class="row" style="gap:8px">
      <button class="btn btn-quiet" data-nav="ext">← Outside lessons</button>
      ${l.enriched ? '<span class="pill pill-ok">Linked</span>' : '<span class="pill">Not linked yet</span>'}
      ${l.next_date ? `<span class="pill${late ? ' pill-due' : ''}">due ${esc(shortDate(l.next_date))}</span>` : ''}
    </div>
    <div><p class="eyebrow">${esc(l.instrument || 'lesson')}${l.teacher ? ` · ${esc(l.teacher)}` : ''}</p>
      <h2 class="vh">${esc(l.date || 'undated')}</h2></div>
    ${l.covered ? `<div class="prose">${
      l.source === 'page' ? `<p>${esc(l.covered).replace(/\n/g, '<br>')}</p>` : l.covered}</div>` : ''}
    ${/* PATCH-147 — Nate, 2026-08-26: "put homework, resources and soundslice above the in the
          school section." `## Links` used to open this page, which put a paragraph of vault
          synthesis between you and the checkboxes you came here to tick. The card had the right
          order already; this is the page catching up to it. What you DO first, what you read
          second. */''}
    <div class="blk" style="margin-top:0"><div class="lbl">Homework<span class="done${
      hw.length && done === hw.length ? ' is-all' : ''}">${done}/${hw.length} done</span></div>
      <ul class="tasks">${hw.length ? hw.map(h => {
        const on = !!P.homework[h.id];
        return `<li class="${on ? 'on' : ''}"><input type="checkbox" id="x-${esc(h.id)}"
          data-task="${esc(h.id)}"${on ? ' checked' : ''}${readonly ? ' disabled' : ''}>
          <label for="x-${esc(h.id)}">${l.source === 'page' ? esc(h.html) : h.html}</label></li>`;
      }).join('') : '<li class="tl-e">Nothing set.</li>'}</ul></div>
    ${/* PATCH-145 — the handouts, on the page the homework is actually done from. Same block
          as the card's, same lazy fill, so the two can never disagree about what was attached. */
      resBlock(l.id)}
    ${/* spec-178 — the buttons now lead with the slice's OWN title where build.py could read it
          (`s.title`), falling back to Nate's typed label. The slice knows it is in D; the label
          did not say so. The shelf link is the way to the full page, briefs and all. */
      (l.soundslice || []).length ? `<div class="blk"><div class="lbl">Soundslice
      <span class="done">${l.soundslice.length}</span>
      <button class="lnkedit hw-go" data-nav="slices">all slices →</button></div>
      <div class="sslist">${l.soundslice.map(s =>
        `<a class="btn btn-go ssbtn" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"
           >&#9835; ${esc(s.title || s.label)}</a>`).join('')}</div></div>` : ''}
    ${l.links ? `<div><p class="eyebrow">In the school</p><div class="prose">${l.links}</div></div>` : ''}
  </div>`;
}

function extView() {
  const list = extAll(), open = extHomeworkDue();
  const card = (l) => {
    const hw = (l.homework || []);
    const done = hw.filter(h => !!P.homework[h.id]).length;
    const late = l.next_date && l.next_date < TODAY && done < hw.length;
    return `<div class="card extl">
      <div class="spread" style="align-items:flex-start">
        <div><div class="eyebrow" style="margin:0 0 3px">${esc(l.instrument || 'lesson')}${
          l.teacher ? ` · ${esc(l.teacher)}` : ''}</div>
          <h3 style="margin:0;font-family:var(--read);font-size:19px;font-weight:600">${
            esc(l.date || 'undated')}</h3></div>
        <div class="row" style="gap:7px">
          ${l.source === 'page' ? (LOCAL ? '' : '<span class="pill pill-due">Not synced</span>')
            : l.enriched ? '<span class="pill pill-ok">Linked</span>'
            : '<span class="pill">Not linked yet</span>'}
          ${l.next_date ? `<span class="pill${late ? ' pill-due' : ''}">due ${esc(shortDate(l.next_date))}</span>` : ''}
          ${l.source === 'page' && !readonly
            ? `<button class="btn btn-quiet" data-ext-del="${esc(l.id)}">Remove</button>` : ''}</div>
      </div>
      ${l.covered ? `<div class="prose" style="margin-top:12px;font-size:15.5px">${
        l.source === 'page' ? `<p>${esc(l.covered).replace(/\n/g, '<br>')}</p>` : l.covered}</div>` : ''}
      ${/* Nate's rule for a real course lesson applies here too: homework is checked off on
            its own page, not in place — this reads as a bullet list, same tick/dash markup
            taskBlock() uses in its locked mode, and the label opens the homework page. */
        hw.length ? `<div class="blk"><div class="lbl">Homework
        <span class="done${done === hw.length ? ' is-all' : ''}">${done}/${hw.length} done</span>
        <button class="lnkedit hw-go" data-hw-open="ext:${esc(l.id)}">open the homework page →</button></div>
        <ul class="tasks">${hw.map(h => {
          const on = !!P.homework[h.id];
          return `<li class="${on ? 'on' : ''} ro"><span class="tick" aria-hidden="true">${
            on ? '✓' : '–'}</span><span class="tlabel">${l.source === 'page' ? esc(h.html) : h.html}</span></li>`;
        }).join('')}</ul></div>` : ''}
      ${/* PATCH-145 — beneath the homework, because that is what these are for: Nate,
            2026-08-26, "resources - usually related to homework". */ resBlock(l.id)}
      ${/* Soundslice (2026-08-23) — the teacher sends material here and Nate works in Soundslice's
            own player, so this block is a set of doors and nothing else. Real <a href> for the
            same reason watchCard uses one: the frame runtime hands external anchors to the parent
            via __frame_nav, and window.open is swallowed by the sandbox. An <iframe> is not an
            option either way — the CSP blocks the host. */
        (l.soundslice || []).length ? `<div class="blk"><div class="lbl">Soundslice
        <span class="done">${l.soundslice.length}</span>
        <button class="lnkedit hw-go" data-nav="slices">all slices →</button></div>
        <div class="sslist">${l.soundslice.map(s =>
          `<a class="btn btn-go ssbtn" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"
             >&#9835; ${esc(s.title || s.label)}</a>`).join('')}</div>
        <p class="calnote" style="margin:8px 0 0">Opens in Soundslice — play, loop and slow it down
          there. Nothing is mirrored into this page on purpose.</p></div>` : ''}
      ${l.links ? `<div class="blk"><div class="lbl">In the school</div>
        <div class="prose" style="font-size:15px">${l.links}</div></div>` : ''}
      ${l.source === 'page' && !LOCAL ? `<p class="calnote" style="margin:12px 0 0">Captured here. Run
        <code class="cmd">/school sync</code> and it becomes a note in your vault, ready to be linked
        to what the school already teaches.</p>` : ''}
    </div>`;
  };
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="classes">← Classes</button>
      <span class="pill">Standing</span>
      ${open ? `<span class="pill pill-due">${open} homework open</span>` : ''}</div>
    <div class="spread"><h2 class="vh">Outside lessons</h2>
      ${readonly ? '' : `<button class="btn btn-go" data-ext-add="1">Add a lesson</button>`}</div>
    ${addingLesson && !readonly ? `<div class="card extform">
      <div class="eyebrow">New lesson</div>
      <div class="ef-grid">
        <label>Date<input type="date" id="ef-date" value="${esc(TODAY)}"></label>
        <label>Instrument<input type="text" id="ef-inst" value="guitar"></label>
        ${/* Nate: "the homework that is due by next lesson" — outside lessons carry no pace
              of their own to derive a due date from, so this is the one date the reader has
              to give it. Optional: leave it blank and the homework page just reads as owed,
              open-ended, same as before this field existed. */''}
        <label>Next lesson <span style="font-weight:400;color:var(--faint)">(optional)</span>
          <input type="date" id="ef-next"></label>
      </div>
      <label class="ef-l">What was covered
        <textarea id="ef-cov" rows="3" placeholder="barre chords, the CAGED shapes…"></textarea></label>
      <label class="ef-l">Homework — one per line
        <textarea id="ef-hw" rows="3" placeholder="F barre, 10 min a day&#10;intro to Blackbird"></textarea></label>
      <div class="row" style="gap:8px">
        <button class="btn btn-go" data-ext-save="1">Save lesson</button>
        <button class="btn btn-quiet" data-ext-cancel="1">Cancel</button></div></div>` : ''}
    ${list.length ? list.map(card).join('')
      : `<div class="card" style="color:var(--muted);font-size:14px">No lessons yet.${lite(` Add one after your
         next lesson — what was covered and what you were told to practise.`, '')}</div>`}
  </div>`;
}

function classesView() {
  const tile = classTile;
  /* PATCH-018 — standing classes are a SEPARATE TRACK, not three tiles mixed into the term.
     They run daily, never close, take no course slot and never set the end date, so they get
     their own heading rather than leaving that distinction to a pill on a tile. */
  const all = Object.keys(CLASSES).sort((a, b) => +a - +b);
  const term = all.filter(i => !CLASSES[i].standing);
  const along = all.filter(i => CLASSES[i].standing);
  /* PATCH-107 + PATCH-108 — the heading was "THE SCHOOL / Nine classes" and both halves were
     asked about at once: rename "the school" to match the tab, and stop naming a total. Doing
     each literally would have left "CLASSES / Classes", so the eyebrow goes and the h2 becomes
     the tab's own word. The Overview does exactly this already — a bare `h2.vh` with no
     eyebrow over it — so it is the shape this page already had for a view that needs no
     category label above its name.
     PATCH-108's other half: removing the count also removes the class of drift that produced
     it. This line spelled "Nine" as a word and would have gone on saying nine forever; the
     same bug shipped on the Courses page as "Eighteen courses" against a catalogue of 24.
     PATCH-109 — `.classesv` widens the lede FOR THIS VIEW. `.lede` is capped at 64ch globally
     as a deliberate reading measure and that cap stays; see app.css. */
  return `<div class="view classesv">
    <div class="spread" style="align-items:flex-start">
      <div class="cv-head"><h2 class="vh">Classes</h2>
        <p class="lede" style="margin-top:8px">A class is a block of related courses, closed by an exam —
        except the standing ones, which run alongside everything else and never close.</p></div>
      ${/* PATCH-067 — Courses lost its rail tab, and this is the syllabus's remaining door.
            Without it coursesView() would be a view nothing links to. */''}
      <button class="btn btn-quiet" data-nav="courses">All ${
        Object.keys(COURSES).length} courses →</button></div>
    <div>
      <div class="dhead"><p class="eyebrow">Structured classes</p><span class="rule"></span>
        <span class="cnt">${term.length} classes</span></div>
      <div class="tiles">${term.map(i => tile(CLASSES[i])).join('')}</div></div>
    <div class="alongside">
      <div class="dhead"><p class="eyebrow">Runs alongside</p><span class="rule"></span>
        <span class="cnt">${along.length} standing${lite(' · daily, no exam, no end', '')}</span></div>
      ${/* PATCH-111 — the pace token is wrapped so it cannot break at its own hyphens
            ("2+1+2-a-week" was splitting across two lines); the rest of the wrapping fix is
            in app.css, on .alongside. */''}
      ${lite(`<p class="calnote" style="margin:-4px 0 12px">Not part of the term. These take no course slot,
        sit outside the <span class="pace">${paceSum()}-a-week</span> pacing, and never set the end
        date — the skills they build decay, so they just keep running.</p>`, '')}
      <div class="tiles">${along.map(i => tile(CLASSES[i])).join('')}
        ${(() => { const n = extAll().length, open = extHomeworkDue();
          return `<div class="tile" data-domain="instrument">
            ${/* PATCH-137 (C5) — this tile still wore `tile-head`, a class PATCH-122 deleted along
                  with the engraved cuts. With no rule behind it the tile lost its accent bar and its
                  padding and sat visibly out of line beside its nine siblings. It takes the same
                  `tile-bar` + icon every class tile now uses. */''}
            <div class="tile-bar"></div>
            <div class="tile-b">
              <div class="row" style="gap:6px"><span class="tile-ic" aria-hidden="true">🎓</span>
                <span class="pill pill-instr">With a teacher</span></div>
              <h3>Outside lessons</h3>
              <div class="tile-meta">${n ? `${n} lesson${n>1?'s':''} logged` : 'Nothing logged yet'}${
                open ? ` · ${open} homework open` : ''}${lite('<br>Not scheduled, not examined.', '')}</div>
              <div class="tile-courses">${lite('<div class="tile-empty">Whatever your teacher actually set.</div>', '')}</div></div>
            <div class="tile-foot"><button class="btn btn-quiet" data-nav="ext">Open →</button>
              ${readonly ? '' : `<button class="btn btn-go" data-ext-add="1">Add a lesson</button>`}</div>
          </div>`; })()}</div></div></div>`;
}

/* PATCH-012 — three sections, not two. The instrument courses were being listed under Theory,
   which is where the old two-way domainOf() put everything that was not production. Since
   spec-172 Phase 3b the whole page agrees with this view: dom() is the only classifier and
   instrument is a track in its own right, not a theory course wearing a garnet pill. */
function coursesView() {
  const sec = d => {
    const list = Object.values(COURSES).filter(c => dom(c) === d && !c.standing).sort((a, b) => +a.id - +b.id);
    if (!list.length) return '';
    const done = list.filter(c => os(c.id).status === 'completed').length;
    return `<div data-domain="${d}"><div class="dhead"><p class="eyebrow">${DOM_LABEL[d]}</p>
      <span class="rule"></span><span class="cnt">${list.length} course${list.length === 1 ? '' : 's'}${
        done ? ` · ${done} completed` : ''}</span></div>
      <div class="grid">${list.map(courseRow).join('')}</div></div>`;
  };
  // PATCH-067 — Courses lost its rail tab; the view is still the full syllabus and is
  // reached from a class, from a course breadcrumb and from the Quizzes page, so it keeps a
  // way back rather than becoming a room with no door.
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="classes">← Classes</button></div>
    ${/* Counted, not spelled out. This read "Eighteen courses" against a catalogue of 24 —
         spec-172 retired two courses and added eight, and the heading was not part of anyone's
         file partition, so it went on being wrong. A count that derives itself cannot. */''}
    <div><p class="eyebrow">Syllabus</p><h2 class="vh">${
      Object.keys(COURSES).length} courses</h2>
      <p class="lede" style="margin-top:8px">${taughtEnrolled()} of ${CFG.taught_limit} taught slots
      and ${instrEnrolled()} of ${CFG.instrument_limit} instrument slots in use.
      Standing courses (${CFG.standing_courses.join(', ')}) run alongside and never take a slot.</p>
      ${/* spec-172 Phase 3b — the two budgets are separate on purpose: a taught slot is a
           reading-and-quizzing commitment, an instrument lesson is ten minutes at the keys.
           Saying so here is the only place a reader can find out why enrolling Hanon did not
           close a theory course. */''}
      <p class="calnote">Instrument courses have their own allowance and their own pace
      (${PACE.instrument} a week) — starting one never closes a taught course.</p>
      <p class="calnote">Each row's measure is its lessons — one tick each, filled once the lesson is
      completed. The call number beside it is the strand the course's quizzes belong to.</p></div>
    ${DOMS.map(sec).join('')}
    ${(() => {
      const st = Object.values(COURSES).filter(c => c.standing).sort((a, b) => +a.id - +b.id);
      if (!st.length) return '';
      return `<div class="alongside">
        <div class="dhead"><p class="eyebrow">Runs alongside</p><span class="rule"></span>
          <span class="cnt">${st.length} standing · never take a slot</span></div>
        <div class="grid">${st.map(courseRow).join('')}</div></div>`;
    })()}</div>`;
}

/* ---------------------------------------------------------------- PATCH-010: the reading
   A **Read** line used to be a bare pointer at a vault note — and vault notes are not in this
   page, so on the published artifact it was dead text you could not act on. build.py now pulls
   the named section (or the note) into C.reading, deduped across all 18 courses, and each Read
   task carries the ids of what it points at.

   It renders as a fold under its own task line, CLOSED by default but showing its first
   sentence, its source note and its length in the summary. Closed is not a hedge: a course
   page runs to 18 lessons and this material is 400 KB of prose — expanded by default, the
   reading would bury the lesson it belongs to and the quizzes under it. So the fold shows
   enough to know what is behind it, opens in one click with no navigation, and the note's
   own wikilink is still sitting in the task line above for anyone who wants the full note.

   Open/closed is remembered for the session in `readOpen`, for the same reason PATCH-007
   remembers the unlocks fold: turning a lesson in re-renders the view, and reading that
   slammed shut mid-paragraph would read as a bug. */
const READING = C.reading || {};
const readOpen = new Set();
const readMins = w => Math.max(1, Math.round(w / 220));
function readFold(rid) {
  const r = READING[rid];
  if (!r) return '';                          // stale id — the task line's link still stands
  // For a section the source note is the useful half of the meta; for a whole-note or opening
  // pull the title already IS the note, so saying "from Scales" under "Scales" is noise.
  const src = r.kind === 'section' ? `from ${esc(r.note)}` : r.kind === 'opening' ? 'the opening'
            : 'the full note';
  const meta = `${src} · ${r.words} word${r.words === 1 ? '' : 's'} · ${readMins(r.words)} min`;
  const foot = LOCAL ? '' : r.kind === 'section'
    ? `One section of <b>${esc(r.note)}</b> — the full note lives in the vault.`
    : r.kind === 'opening'
    ? `The opening of <b>${esc(r.note)}</b> — the rest of the note lives in the vault.`
    : r.more ? `${r.more} more section${r.more === 1 ? '' : 's'} of <b>${esc(r.note)}</b> in the vault.`
    : `<b>${esc(r.note)}</b>, in full.`;
  return `<details class="rd" data-read="${esc(rid)}"${readOpen.has(rid) ? ' open' : ''}>
    <summary><span class="rd-t">${esc(r.title)}</span><span class="rd-m">${meta}</span>${
      r.lede ? `<span class="rd-l">${esc(r.lede)}</span>` : ''}</summary>
    <div class="rd-b"><div class="prose">${r.html}</div>${foot ? `<p class="rd-f">${foot}</p>` : ''}</div></details>`;
}

/* PATCH-053 → PATCH-144 — the note name on a Read line.

   PATCH-053 found it as an inert <span class="xlink-vault"> whose only styling was
   `cursor:help`, so the pointer turned into a question mark over the one thing on the line
   that looks clickable. It cannot navigate to Obsidian — a custom scheme never leaves the
   artifact's sandboxed frame, which is the same finding PATCH-064 settled — so PATCH-053
   pointed it at the only material this page held: the assigned slice, opened in place.

   Nate, 2026-08-26: *"i want those links to go to the actual page instead of just expanding
   the section below. i like how it is now but want the link to go to the actual page so i
   can get more info if i want."* Which is the right shape — a fold is the assigned reading
   and a link is a link. build.py now carries the whole note (PATCH-144's `sources`), so the
   name goes to the note's page and the fold below it is untouched.

   This runs over the WHOLE rendered body rather than over a Read line's html, and that is
   deliberate: the same dead span appears in `**The material**` bullets, inside pulled
   reading, and on a source page pointing at another source page. One pass at the end of
   render() makes every one of them live, and there is exactly one place to reason about it.
   A span whose label names no note the school assigns is left exactly as it is — inert, and
   honestly so, because there is nothing behind it in this page. */
const SOURCES = C.sources || {};
const SRC_INDEX = C.srcindex || {};
/* PATCH-159 — the span now carries `data-note`, the note's REAL basename, and that is what the
   lookup runs on. Matching on the visible label was wrong in two ways that no amount of extra
   pages could fix: an aliased link ([[Guitar Positions|the position maps]]) showed a string the
   vault keys nothing by, and a link written in another case ([[INTERVALS]]) missed a
   case-sensitive map. The label is still the fallback so a span from an older cached render
   keeps working. */
const VAULT_SPAN = /<span class="xlink xlink-vault"([^>]*)>([\s\S]*?)<\/span>/g;
const NOTE_ATTR = /data-note="([^"]*)"/;
const ROUTES = C.routes || {};
const srcOf = label => SRC_INDEX[unesc(label).trim().toLowerCase()];
/* A note can have somewhere BETTER to go than a read-only copy of itself. [[Interval Ladder]] is
   a routine with a stat strip and a practice log; [[Teoria]] is a card on the tools shelf. The
   source page is the fallback, not the first answer — which is the whole of Nate's
   "make sure all links work": a link that opens the wrong page is only half-alive. */
const ATTACHMENT = /\.(pdf|png|jpe?g|gif|webp|svg|mp3|wav|m4a|mp4|mov|txt|csv)$/;
function noteRoute(name) {
  let k = unesc(name || '').trim().toLowerCase();
  if (!k) return '';
  if (ROUTES[k]) return ROUTES[k];
  if (SRC_INDEX[k]) return 'source:' + SRC_INDEX[k];
  /* An Obsidian link to an ATTACHMENT, not to a note — `[[The Virtuoso Pianist - Hanon.pdf]]`,
     132 of them, all inside Hanon and Leavitt lesson text. The file itself can never be in this
     bundle (a PDF is not a page, and the Leavitt scans are withheld by the copyright gate
     besides), but the note of the same name is the thing the sentence is actually pointing at —
     for Hanon that is the drill page, with its stat strip and its practice log. Stripping the
     extension is the whole fix; nothing is invented if there is no such note. */
  k = k.replace(ATTACHMENT, '');
  return ROUTES[k] || (SRC_INDEX[k] ? 'source:' + SRC_INDEX[k] : '');
}
function sourceLinks(html) {
  if (!html || html.indexOf('xlink-vault') < 0) return html;
  return html.replace(VAULT_SPAN, (m, attrs, label) => {
    const na = NOTE_ATTR.exec(attrs || '');
    const route = noteRoute(na ? na[1] : label) || noteRoute(label);
    if (!route) return m;
    const kind = route.split(':')[0];
    const tip = kind === 'technique' || kind === 'routine' ? 'Open this drill'
              : kind === 'tool' ? 'Find this on the tools shelf' : 'Open this note';
    return `<button type="button" class="xlink xlink-read" data-goto="${
      esc(route)}" title="${tip}">${label}</button>`;
  });
}

/* PATCH-064 — a test is not a page you can open from here, and after the trace it is not
   going to be: the artifact runs in a sandboxed frame that never lets an `obsidian://` URI
   reach the OS. So where a test or a final is named, the page says how to sit it instead —
   which is where tests have always actually lived, blind and one question at a time in
   Claude Code. Matched on the authored `**Test**` label, so the instruction lands on the
   test task and nowhere else.
   spec-173 C — `TEST_TASK` itself moved up beside hwTasksOf(), which is its first caller: the
   homework gate has to know which item is the test before the render layer does. The hint is
   still printed on the test and nowhere else — it is just printed by testSection() now, under
   the test's own heading rather than inside the homework list. */
/* In the app a test is sat and marked on the page (paperView), so the hint is a button. The
   single-file page keeps the command: there the test is still sat in Claude Code. */
const takeBtn = (name, label) => {
  const last = ((P.tests[name] || {}).attempts || [])[0];
  return `<div class="runhint"><button class="btn" data-paper="${esc(name)}">${label}</button>${
    last ? `<span class="calnote" style="margin:0 0 0 10px">last sat ${esc(shortDate(last.date))} — ${esc(String(last.score_pct))}%</span>` : ''}</div>`;
};
const runTest = (cid, n) => LOCAL && paperOfLesson(cid, n) ? takeBtn(paperOfLesson(cid, n),
    ((P.tests[paperOfLesson(cid, n)] || {}).attempts || []).length ? 'Open the test' : 'Take the test')
  : `<div class="runhint">Run <code class="cmd">/school test ${
  esc(cid)} ${n}</code> in Claude Code — tests are sat there, blind, one question at a time.</div>`;
const runFinal = (cid) => LOCAL && paperOfFinal(cid) ? takeBtn(paperOfFinal(cid),
    ((P.tests[paperOfFinal(cid)] || {}).attempts || []).length ? 'Open the final' : 'Take the final')
  : `<p class="runhint">Run <code class="cmd">/school final ${
  esc(cid)}</code> in Claude Code — finals are sat in chat, blind, one question at a time.</p>`;

/* PATCH-057 — one quiz, one row: what it is, when it is due, and either a Take button or
   the verdict it is already carrying. The verdict is `sr_last_rating` and nothing else —
   automatic / solid / rusty / forgot, the same four the session rates on. There is no score
   field and no pass/fail store behind this; a rated quiz reads as done, an unrated one
   reads as waiting, and that is the whole model (PATCH-057's decision).
   The same row is used in the lesson that teaches the quiz and on the Quizzes page, so the
   two can never say different things about the same quiz.
   `lock` is PATCH-058's homework gate. */
/* PATCH-113 — a retake's row on the Quizzes page. Same .qz shape as a concept quiz so the two
   sit in one list without a second layout, and the same three columns doing the same jobs: what
   it is, when it is due, and the control that takes it. What differs is the middle — a retake
   has no SR state to report, so the slot names the paper instead, which is the thing that makes
   it identifiable when three of them come off one test. */
function missChip(k) {
  const m = missOf(k); if (!m) return '';
  const c = CONCEPTS[m.concept];
  const late = (m.due || '') < TODAY;
  return `<div class="qz qz-miss" data-taken="1">
    <button class="qz-t" data-drill-miss="${esc(k)}" title="Retake — Q${esc(String(m.n))} of ${
      esc(m.test || 'a test')}, marked ${m.kind === 'partial' ? 'partly right' : 'wrong'}"><span
      class="st"></span>${esc(m.test || '')} · Q${esc(String(m.n))}${
      c ? ` <span class="qz-sub">${esc(c.short)}</span>` : ''}</button>
    <span class="qz-d" data-d="${late ? 'late' : 'today'}">${
      m.kind === 'partial' ? 'partly right' : 'missed'}</span>
    <button class="qz-b btn btn-quiet" data-drill-miss="${esc(k)}"${
      readonly ? ' disabled' : ''} title="Rating it Automatic clears the retake">Retake</button></div>`;
}

function quizChip(id, lock) {
  const c = CONCEPTS[id], q = cs(id), taken = quizTaken(q);
  /* PATCH-071 — a quiz from a paused course shows no due date and no Take. Both would
     contradict what the rest of the screen says: the row would read "due today" directly
     under a "Nothing due today" header, and an active Take would invite you into a quiz the
     section above just said was out of rotation. Unlike the homework lock this one can be a
     plain <span> — resuming a course re-renders the view, so nothing has to flip in place. */
  const paused = coursePaused(id);
  const st = paused ? '' : dueState(q);
  const held = lock === undefined ? hwLocked(id) : lock;
  const off = readonly || held || paused;
  /* The control stays a BUTTON when it is only homework-locked, rather than becoming a
     "Homework first" label: ticking the last homework box unlocks quizzes in place, without
     a re-render (see the change handler), and that can only flip a `disabled` attribute — it
     cannot turn a <span> into a <button>. The reason is carried by the title and by
     .qz-lock, which sits above the list. */
  const why = held ? ' title="Finish this lesson\'s homework first"' : '';
  const act = q.status === 'queued'
    ? '<span class="qz-b qz-off">Not assigned</span>'   // never released — that, not "Paused"
    : paused
    ? '<span class="qz-b qz-off">Paused</span>'
    : taken
    ? `<button class="qz-b qz-r" data-pass="${rPassed(q.sr_last_rating) ? 'y' : 'n'}"
        data-drill-quiz="${esc(id)}"${off ? ' disabled' : ''}${
        held ? why : ' title="Take it again"'}>${esc(rLabel(q.sr_last_rating))}</button>`
    : `<button class="qz-b btn btn-quiet" data-drill-quiz="${esc(id)}"${
        off ? ' disabled' : ''}${why}>Take</button>`;
  return `<div class="qz" data-st="${esc(q.status)}"${taken ? ' data-taken="1"' : ''}${
    held ? ' data-held="1"' : ''}>
    <button class="qz-t" data-concept="${esc(id)}" title="${esc(qLabel(q.status))}${
      q.sr_due ? ` · due ${esc(q.sr_due)}` : ''}"><span class="st"></span>${esc(c.short)}</button>
    <span class="qz-d"${st ? ` data-d="${st}"` : ''}>${st ? dueText(q) : ''}</span>
    ${act}</div>`;
}

/* ---------------------------------------------------------------- spec-172: the book pages
   Six of the eight new courses are one exercise of a scanned book per lesson, and a page
   number is not a lesson — so the page itself is IN the page, folded shut under the homework
   that assigns it.

   TWO BOOKS, TWO NUMBERINGS. Only a course whose `book` is in the BOOKPAGES bundle gets
   images, and build.py now ships two: Hanon's *The Virtuoso Pianist* (1873, public domain,
   cited by the SCAN's page numbers) and Leavitt's *A Modern Method for Guitar* (courses
   25/26, Nate's own copy on a private page, cited by the BOOK's printed folios). Nothing
   here converts between them — build.py keys each bundle by the number the lessons cite, so
   `bk.pages[n]` is always looked up with the number printed in the homework. `bk.cap` is
   what that number is called, and the caption says so rather than guessing.

   A page the scan does not contain (Leavitt pp. 15 and 34) is simply not in the bundle: the
   filter in lessonBlock drops it, so the lesson keeps the citation and no NEIGHBOURING page
   is ever shown in its place. Do not "fix" that filter into a fallback.

   Shut by default. A scan is ~26 KB and lesson 8 of Course 22 cites twelve of them; the
   reader wants the exercise's own words first, and twelve pages unrolled ahead of them is
   not "cheap" the way one is. */
const PAGE_MIME = {webp:'image/webp', png:'image/png', jpeg:'image/jpeg', jpg:'image/jpeg'};
const bookOpen = new Set();          // which folds are open, for the session — same as readOpen
/* Folds the reader deliberately closed. Without it the current lesson's fold would spring
   back open on the next render, which is worse than never opening it. */
const bookShut = new Set();
/** "p. 47" · "pp. 49–60" · "pp. 95, 97–99" — a run is printed as a range, a gap is not. */
function pageRange(ns) {
  if (!ns.length) return '';
  const out = [];
  let a = ns[0], b = ns[0];
  for (let i = 1; i <= ns.length; i++) {
    if (i < ns.length && ns[i] === b + 1) { b = ns[i]; continue; }
    out.push(a === b ? `${a}` : `${a}–${b}`);
    a = b = ns[i];
  }
  return `${ns.length === 1 ? 'p.' : 'pp.'} ${out.join(', ')}`;
}
/* The scans are injected ON OPEN and are never in the view's HTML. Each page is ~35 KB of
   base64; a Hanon course view holds a dozen lessons, so building those data URIs into the
   markup would cost megabytes of string on EVERY render — and render() runs on every state
   change, for folds nobody has opened. The fold therefore ships empty carrying only its page
   numbers, and this fills it: once when it is opened, and again after a re-render for the
   folds that were open (fillOpenBooks, called from render). */
function fillBook(det) {
  if (!det || det.dataset.filled) return;
  const bk = BOOKPAGES[det.dataset.bid];
  const body = det.classList.contains('bk-b') ? det : det.querySelector('.bk-b');
  if (!bk || !body) return;
  if (bk.byo) return fillByoBook(det, body, bk);    // app build: the reader's own PDF of the book
  const mime = PAGE_MIME[bk.fmt] || 'image/png';
  // No esc() on the base64 — it has no character esc() touches, and running a regex over
  // several hundred KB per page for nothing is the kind of cost this whole scheme avoids.
  body.innerHTML = (det.dataset.pgs || '').split(',').filter(Boolean).map(n => {
    const b64 = bk.pages[n];
    return b64 ? `<figure class="bkpg"><img data-bkzoom="1" decoding="async" loading="lazy"
      alt="Page ${esc(n)} of the scan" title="Click to open it at full size"
      src="${bk.base ? `${esc(bk.base)}p${String(n).padStart(3, '0')}.${esc(bk.fmt)}`
                     : `data:${mime};base64,${b64}`}"><figcaption>${esc(bk.cap || 'PDF page')} ${esc(n)
      }</figcaption></figure>` : '';
  }).join('') + `<p class="bk-f"><b>${esc(bk.label)}</b><br>${esc(bk.note)}</p>`;
  det.dataset.filled = '1';
}
/* ------------------------------------------------- PATCH-145: an outside lesson's resources
   The teacher's handouts, charts and scans. build.py renders each one to compressed webp page
   images and parks them in the `resources` island — a separate island from `curriculum` for
   the same reason the book scans are: this is the megabytes, and the curriculum block is the
   one a person greps when the page renders something odd.

   Filled on render rather than built into the view HTML, exactly like fillBook() and for the
   same measured reason: render() runs on every state change, and a handful of data URIs in the
   markup would be re-serialised into a string every time a checkbox moved. The block ships
   carrying only its lesson id.

   Why the vault and not an upload control on this page: the runtime serves this account no
   file-storage capability, and the one workaround (embed it in the document and publish) would
   be erased by the next build.py run, dropped by the Obsidian plugin's stubbed publish(), and
   billed against a bundle already at 10.4 MB of 16. The vault route also works OFFLINE, which
   is where a lesson handout actually gets read. See build.py's own note. */
const RESOURCES = sideJSON('resources', {});
function fillRes(box) {
  if (!box || box.dataset.filled) return;
  const items = RESOURCES[box.dataset.res] || [];
  box.innerHTML = items.map(r => {
    if (r.kind === 'pages' && (r.pages || []).length) {
      return `<figure class="respg"><figcaption>${esc(r.name)}${r.pages.length > 1
        ? ` · ${r.pages.length} pages` : ''}</figcaption>${r.pages.map((b64, i) =>
        `<img data-bkzoom="1" decoding="async" loading="lazy" alt="${esc(r.name)}${
          r.pages.length > 1 ? `, page ${i + 1}` : ''}" title="Click to open it at full size"
          src="data:image/webp;base64,${b64}">`).join('')}</figure>`;
    }
    /* Two ways a file has no pictures here, and they are not the same thing, so they do not
       read the same. `over` means it exists and is too big for the bundle; anything else means
       the format is not one this page can render (an audio file, a .gp5, a .zip). Either way
       the file IS in the vault — the line says so rather than looking like a broken image. */
    return `<p class="resfile"><span class="resfile-n">${esc(r.name)}</span>
      <span class="resfile-m">${r.kb} KB · ${r.kind === 'over'
        ? 'too large for this page — open it in the vault'
        : 'not a format this page can show — open it in the vault'}</span></p>`;
  }).join('');
  box.dataset.filled = '1';
}
/* ---------------------------------------------------------- PATCH-146: the upload button
   Nate, 2026-08-26: *"give me an upload button to upload homework resources. this shit is getting
   annoying. just make it simple."* Fair — PATCH-145 shipped the rendering and left the getting-it-
   there as a filing job, and a file you have to go and file is not attached, it is homework.

   THE THING I SAID WAS IMPOSSIBLE IS THE STORAGE, NOT THE BUTTON, and those are separable. There
   is no file-storage capability on this account, so an upload cannot live in the page forever —
   but it does not have to. The page already persists one thing across saves, syncs and rebuilds:
   the PROGRESS ISLAND. That is how every tick in this school survives, and a file can ride the
   same channel:

     upload  ->  P.ext_files (in the page, saved by the normal autosave)
             ->  /school sync or the Obsidian plugin writes it into Lessons/Resources/ AS A FILE
                 and strips it from progress
             ->  the next build renders it from disk like any other resource (PATCH-145)

   So the page holds it for hours, not forever, and the vault holds it after that. Which also
   answers the three objections that killed the naive version: a rebuild cannot erase it (it is on
   disk by then), the plugin does not drop it (the plugin is one of the two things that writes it
   out), and it is not billed against the bundle forever (UP_BUDGET bounds what is in flight).

   IMAGES ARE RE-ENCODED IN THE BROWSER BEFORE THEY ARE STORED — canvas to 1600px JPEG — because
   that is the difference between a 4 MB phone photo and a ~250 KB one, and the page has 16 MB
   total to live in. PDFs cannot be compressed here, so they go in whole and the budget catches
   the big ones. */
const UP_MAX_PX = 1600;             // longest edge an uploaded image is kept at
const UP_JPEG_Q = 0.82;             // measured: legible for a chart or a scanned page
const UP_BUDGET = 2 * 1024 * 1024;  // base64 chars that may be waiting in the page at once
const upFiles = () => P.ext_files || [];
const upFor = lid => upFiles().filter(f => f.lesson === lid);
const upBytes = () => upFiles().reduce((n, f) => n + (f.b64 || '').length, 0);
const upKB = n => n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`;

function fileB64(f) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1] || '');
    r.onerror = () => rej(new Error('read'));
    r.readAsDataURL(f);
  });
}
/* Returns base64 JPEG, or null if the browser cannot decode this image (HEIC is the usual one).
   White is painted under it first: a PNG scan with a transparent ground becomes black on JPEG
   otherwise, which looks exactly like a corrupted upload. */
function shrinkImage(f) {
  return new Promise(res => {
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      try {
        const s = Math.min(1, UP_MAX_PX / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * s));
        c.height = Math.max(1, Math.round(img.height * s));
        const x = c.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
        x.drawImage(img, 0, 0, c.width, c.height);
        res((c.toDataURL('image/jpeg', UP_JPEG_Q).split(',')[1]) || null);
      } catch (e) { res(null); }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => { URL.revokeObjectURL(url); res(null); };
    img.src = url;
  });
}
async function encodeUpload(f) {
  if (/^image\//i.test(f.type)) {
    const b64 = await shrinkImage(f);
    // Re-encoded: the name follows the bytes, or the vault ends up with a .png holding a JPEG.
    if (b64) return {name: f.name.replace(/\.[^.]+$/, '') + '.jpg', mime: 'image/jpeg', b64};
  }
  // Everything else goes in byte-for-byte — a PDF, and also whatever else he drags in. The page
  // may not be able to RENDER it (PATCH-145 lists those by name), but getting it into the vault
  // is the job, and refusing a file because we cannot draw it would be the annoying answer again.
  return {name: f.name, mime: f.type || 'application/octet-stream', b64: await fileB64(f)};
}

async function handleUpload(inp) {
  const lid = inp.dataset.upload;
  const files = Array.from(inp.files || []);
  inp.value = '';                                  // so re-picking the same file fires again
  if (!files.length) return;
  if (readonly) return toast('Read-only view — nothing can be saved from this copy.');
  const skipped = [];
  let added = 0;
  toast(`Reading ${files.length} file${files.length === 1 ? '' : 's'}…`);
  for (const f of files) {
    try {
      const enc = await encodeUpload(f);
      if (!enc.b64) { skipped.push(`${f.name} (empty)`); continue; }
      if (upBytes() + enc.b64.length > UP_BUDGET) {
        skipped.push(LOCAL ? `${f.name} (no room — remove an earlier file from this lesson first)`
                           : `${f.name} (no room — run /school sync to clear what is waiting)`);
        continue;
      }
      P.ext_files = upFiles().concat([{
        lesson: lid, name: enc.name, mime: enc.mime, b64: enc.b64, at: iso(new Date()),
      }]);
      added++;
    } catch (e) { skipped.push(`${f.name} (could not be read)`); }
  }
  if (added) dirty();
  render();
  if (skipped.length) toast(`${added} added · not added: ${skipped.join(' · ')}`);
  else if (LOCAL) toast(`${added} file${added === 1 ? '' : 's'} added.`);
  else toast(`${added} file${added === 1 ? '' : 's'} added — run /school sync to file ${
    added === 1 ? 'it' : 'them'} in the vault.`);
}

/** A file waiting in the page: shown, removable, and honest that it is not in the vault yet. */
function upRow(f, i) {
  const img = /^image\//.test(f.mime);
  return `<figure class="respg respg-up">
    <figcaption>${esc(f.name)}${LOCAL ? '' : ' · waiting for <code class="cmd">/school sync</code>'}</figcaption>
    ${img ? `<img data-bkzoom="1" decoding="async" alt="${esc(f.name)}"
        title="Click to open it at full size" src="data:${esc(f.mime)};base64,${f.b64}">`
      : `<span class="resfile-m">${upKB(f.b64.length * 3 / 4)} · ${esc(f.mime)} — it lands in
         <code class="cmd">Lessons/Resources/</code> on the next sync</span>`.replace(LOCAL ? / — it lands in[\s\S]*$/ : /$^/, '</span>')}
    ${readonly ? '' : `<button type="button" class="btn btn-quiet upx" data-upx="${
      esc(String(i))}">Remove</button>`}</figure>`;
}

/** The block itself — the built resources ship empty and are filled on render (fillRes);
    anything still waiting in the page is drawn inline, because it is already in memory. */
function resBlock(lid) {
  const items = RESOURCES[lid] || [];
  const waiting = upFor(lid);
  const pages = items.reduce((n, r) => n + ((r.pages || []).length), 0);
  const add = readonly ? '' : `<label class="lnkedit upbtn">+ add files<input type="file" multiple
    accept="image/*,application/pdf" data-upload="${esc(lid)}" hidden></label>`;
  if (!items.length && !waiting.length) {
    // The button has to exist BEFORE there is anything to show, or the first upload has no door.
    return readonly ? '' : `<div class="blk"><div class="lbl">Resources${add}</div>
      <p class="calnote" style="margin:6px 0 0">Handouts, charts, a photo of the whiteboard — they
      show up here and on the homework page.</p></div>`;
  }
  return `<div class="blk"><div class="lbl">Resources<span class="done">${
    items.length + waiting.length} file${items.length + waiting.length === 1 ? '' : 's'}</span>${
    pages ? `<span class="done">${pages} page${pages === 1 ? '' : 's'}</span>` : ''}${
    waiting.length && !LOCAL ? `<span class="done" style="color:var(--due)">${waiting.length} not filed yet</span>` : ''}${add}</div>
    ${waiting.length ? `<div class="res-b">${waiting.map(f =>
      upRow(f, upFiles().indexOf(f))).join('')}</div>` : ''}
    <div class="res-b" data-res="${esc(lid)}"></div></div>`;
}

/* Both shapes: the inline block on a lesson, and any fold left over elsewhere. */
function fillOpenBooks() {
  app.querySelectorAll('.bk-b[data-bid]:not([data-filled])').forEach(fillBook);
  app.querySelectorAll('details.bk[open]').forEach(fillBook);
  app.querySelectorAll('.res-b[data-res]:not([data-filled])').forEach(fillRes);   // PATCH-145
}
/** The fold itself — empty, and carrying the join (`bid` + the page numbers) that fills it. */
function pagesBlock(c, u, bk, pgs, state) {
  const n = pgs.length;
  /* NOT a fold any more. It shipped collapsed, and then collapsed-unless-this-is-your-current-
     lesson, and Nate still could not see it — because he has no Hanon course ENROLLED, so no
     lesson is ever "current" and the auto-open never fired. Gating a picture on enrolment was
     the mistake: he asked to see the page in the lesson, full stop.
     So the scan is rendered inline, always. What makes that affordable is `loading="lazy"` on
     each image — a Leavitt lesson runs to 20 pages and a course to ~60, but the browser only
     decodes the ones you actually scroll to, so the cost is paid per page seen rather than per
     page present. The bytes were already in the payload either way. */
  return `<div class="blk"><div class="lbl">Sheet music<span class="done">${n} page${
    n === 1 ? '' : 's'}</span><span class="done">${esc(pageRange(pgs))}</span></div>
    <div class="bk-b" data-bid="${esc(c.book)}" data-pgs="${pgs.join(',')}"></div></div>`;
}

/* One task block, drawn identically on the lesson and on the homework page (spec-173 A):
   same markup, the same `data-task` ids, the same store. A tick made on either surface is the
   same tick, and the two can never end up disagreeing about what is done — the same reason
   quizChip is shared between the lesson and the Quizzes page. `tasks` is passed in rather than
   read off the block because the callers differ on one thing: the Test is filtered out of it.

   `lock`, Nate's call: Homework only gets checked off on the homework page now — the lesson
   page still lists it (and still counts it) so you can see what a lesson sets without leaving
   it, but it draws as a plain bullet list there, not checkboxes — a disabled checkbox still
   reads as "this should be clickable" and Nate found that confusing, so the locked state gets
   its own markup (a tick/dash mark, no `<input>` at all) rather than a disabled variant of the
   editable one. Only `lessonBlock()`'s Homework block passes `lock`; the Read block on the
   same page and both blocks on the homework page itself pass nothing, so they keep ticking
   exactly as before. */
function taskBlock(b, tasks, extra, lock) {
  // PATCH-060: individual homework tasks are COMPLETED — the lesson itself is also COMPLETED,
  // its own separate action on the course page, and the homework as a WHOLE is what stays
  // TURNED IN (the hand-in button, spec-173's `assignments`). Reading stays "done".
  const on = tasks.filter(t => !!P.homework[t.id]).length;
  const verb = b.label === 'Homework' ? 'completed' : 'done';
  // PATCH-052 — the "Open all N" toggle beside the Read label is gone. The individual folds
  // stay, and they are the control.
  return `<div class="blk"><div class="lbl">${esc(b.label)}<span class="done${
    on === tasks.length ? ' is-all' : ''}" data-verb="${verb}">${on}/${tasks.length} ${verb}</span>${
    extra || ''}</div>
    <ul class="tasks">${tasks.map(t => {
      const done = !!P.homework[t.id];
      const reading = (t.read || []).length ? `<div class="reading">${t.read.map(readFold).join('')}</div>` : '';
      // PATCH-160 — Nate ticks a Technique item and has to hunt for the drill's own page to
      // log the session; this is a shortcut, not a second way to log. Only the two route kinds
      // practiceLog() actually serves — ticking homework and logging a session stay separate acts.
      const na = NOTE_ATTR.exec(t.html || '');
      const route = na ? noteRoute(na[1]) : '';
      const logLink = (route.indexOf('technique:') === 0 || route.indexOf('routine:') === 0)
        ? `<button class="btn btn-quiet" data-goto="${esc(route)}">Log a session &rarr;</button>` : '';
      return lock
        ? `<li class="${done?'on':''} ro"><span class="tick" aria-hidden="true">${
            done?'✓':'–'}</span><span class="tlabel">${t.html}</span>${reading}${logLink}</li>`
        : `<li class="${done?'on':''}"><input type="checkbox" id="t-${esc(t.id)}" data-task="${esc(t.id)}"
        ${done?'checked':''}${readonly?' disabled':''}><label for="t-${esc(t.id)}">${t.html}</label>${reading}${logLink}</li>`;
    }).join('')}</ul>${b.html ? `<div class="prose" style="margin-top:8px">${b.html}</div>` : ''}</div>`;
}

/* ---------------------------------------------------------------- spec-173 C: the third gate
   Two gates already sit on a lesson and neither may break:
     · PATCH-058 — a lesson's QUIZZES are held until its homework is done (hwLocked/.qz-lock);
     · PATCH-071 — a PAUSED course's quizzes leave rotation entirely (coursePaused).
   The test is the third, and it composes on top of both rather than beside them: it waits on
   the homework being TURNED IN (spec-173's `assignments`, not the per-item ticks PATCH-058
   reads) and on every quiz in the lesson having been taken — and a quiz can only be taken
   once PATCH-058 has released it and PATCH-071 has not withdrawn it. So a paused course fails
   the third gate through the second, which is why "paused" is named in the reasons rather
   than left to read as an unexplained quiz shortfall.

   Every locked state SAYS WHY, in the same voice .qz-lock uses. A disabled control with no
   explanation is the defect PATCH-095 was filed for, and this one has three separate ways to
   be shut — guessing which is not something to ask of the reader.

   One exception to the lock: a test already ticked is never re-locked. Pausing the course
   afterwards, or a quiz falling back to `learning`, must not reach back and strand a piece of
   work that is finished. */
function testGate(c, u) {
  const t = testTaskOf(u);
  if (!t) return null;                       // courses 19–26 set no lesson test
  const done = !!P.homework[t.id];
  const st = os(c.id).status;
  const started = st === 'enrolled' || st === 'completed';   // PATCH-071's own test, verbatim
  const qIds = lessonConcepts(c.id, u.n);
  const qLeft = qIds.filter(id => !quizTaken(cs(id))).length;
  const handed = turnedIn(c.id, u.n);
  const why = [];
  if (!started) why.push(os(c.id).started
    ? `This course is paused, so its quizzes are out of rotation and none of them can be taken. Resume it and the test opens on the same terms.`
    : `The course has not been started, so this lesson's quizzes have not been handed out yet.`);
  const left = hwLeftOf(u);
  if (!handed) why.push(`Lesson ${u.n}'s homework has not been turned in${
    left ? ` — ${left} item${left === 1 ? '' : 's'} still open` : ''}.`);
  if (started && qLeft) why.push(qIds.length === 1
    ? `This lesson's concept quiz has not been taken.`
    : `${qLeft} of ${qIds.length} concept quizzes still to take.`);
  return {task: t, done, qIds, qLeft, handed, locked: !done && why.length > 0, why};
}
/** The section itself — after Homework and after the Concept quizzes, never inside either. */
function testSection(c, u) {
  const g = testGate(c, u);
  if (!g) return '';
  const label = g.done ? '<span class="pill pill-ok">Sat</span>'
    : g.locked ? '<span class="pill">Locked</span>' : '<span class="pill pill-due">Open</span>';
  // Nate: tests are scheduled like quizzes now — same day as the lesson's homework and
  // quizzes (workDueMap), since passing it is what the next lesson's gate is waiting on.
  const day = workDueFor(c.id, u.n);
  const due = !g.done && day !== undefined
    ? `<span class="pill${day < dayOf(TODAY) ? ' pill-due' : ''}">due ${esc(shortDate(dayIso(day)))}</span>` : '';
  return `<div class="blk tsec" data-tst="${g.done ? 'done' : g.locked ? 'locked' : 'open'}">
    <div class="lbl">Lesson test${label}${due}</div>
    ${g.locked ? `<div class="tsec-lock"><b>Not open yet.</b><ul>${
        g.why.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
      ${/* Nate: once homework IS handed in, staying locked means quizzes are what's left —
            the homework page has nothing further to offer, so the link stops appearing. */''}
      ${!g.handed ? `<div class="row" style="gap:8px;margin-top:9px">
        <button class="btn btn-quiet" data-hw-open="${esc(c.id)}:${u.n}">Open the homework page →</button>
      </div>` : ''}</div>`
      : `<p class="tsec-open">${g.done
        ? 'Sat and signed off. Untick it if you mean to sit it again.'
        : `Open — ${g.handed ? `homework turned in ${esc(shortDate(as(c.id, u.n).turned_in || TODAY))}` : 'homework done'}${
            !g.qIds.length ? ''
            : g.qIds.length === 1 ? ' and its quiz taken'
            : ` and all ${g.qIds.length} quizzes taken`}.`}</p>`}
    <ul class="tasks"><li class="${g.done ? 'on' : ''}">
      <input type="checkbox" id="t-${esc(g.task.id)}" data-task="${esc(g.task.id)}"${
        g.done ? ' checked' : ''}${readonly || g.locked ? ' disabled' : ''}>
      <label for="t-${esc(g.task.id)}">${g.task.html}</label>
      ${g.locked ? '' : runTest(c.id, u.n)}</li></ul></div>`;
}

function lessonBlock(c, u) {
  const s = os(c.id), state = s.lessons_complete >= u.n ? 'done'
    : (s.status === 'enrolled' && s.lessons_complete + 1 === u.n) ? 'current' : 'ahead';
  /* PATCH-058 — quizzes unlock only once the lesson's homework is done. This STACKS on the
     existing gate rather than replacing it: completing the lesson is still what ASSIGNS a
     quiz, and finishing the homework is what makes an assigned one takeable. A lesson with
     no homework block has nothing to hold it up.
     spec-173 C — `hwTasksOf` rather than the block's raw `tasks`: the `**Test**` item is no
     longer part of the homework it would otherwise be gating itself behind. */
  const hwTasks = hwTasksOf(u);
  const hwLeft = hwTasks.filter(t => !P.homework[t.id]).length;
  const hwState = !hwTasks.length ? 'none' : hwLeft ? 'locked' : 'open';
  const locked = hwState === 'locked';

  /* PATCH-054 — the quizzes render AFTER the homework, whatever order the course note put
     them in. Homework first, then what it earns you. */
  const ordered = u.blocks.filter(b => b.kind !== 'concepts')
    .concat(u.blocks.filter(b => b.kind === 'concepts'));

  /* spec-172 — the scan goes directly under the homework that assigns it: the homework says
     "play Exercise 32, p. 43" and the page it names is the next thing on screen. The gate is
     an entry in the bundle, not the presence of `pages` — see pagesBlock's copyright note. */
  const bk = BOOKPAGES[c.book];
  const pgs = bk ? (u.pages || []).filter(n => bk.pages[n] !== undefined) : [];
  if (pgs.length) {
    const at = ordered.findIndex(b => b.kind === 'tasks' && b.label === 'Homework');
    ordered.splice(at < 0 ? ordered.length : at + 1, 0, {kind: 'pages'});
  }

  const blocks = ordered.map(b => {
    if (b.kind === 'pages') return pagesBlock(c, u, bk, pgs, state);
    if (b.kind === 'concepts') {
      if (!b.ids.length) return '';
      /* PATCH-057 — every quiz carries its OWN button, and that button becomes the verdict
         once the quiz has been sat. The block-level "Take these N now" and its paragraph of
         explanation are gone: they read as an invitation long after the work was done, so a
         finished lesson looked unfinished. The verdict is `sr_last_rating` and nothing else
         — no score, no separate pass/fail store (PATCH-057's decision). */
      const ids = b.ids.filter(id => CONCEPTS[id]);
      // PATCH-055 — the counter counts what is DONE, not what has been handed out.
      const done = ids.filter(id => quizTaken(cs(id))).length;
      /* The lock line is driven by how many quizzes are ACTUALLY held, not by the lesson's
         homework state. It used to render unconditionally, which put "finish your homework
         and its quiz unlocks" directly above a quiz already sat and stamped NAILED — and
         would have shown it on a lesson whose homework was fully done. A quiz already taken
         is never held (see hwLocked), so counting them here is what keeps the two agreeing. */
      const held = ids.filter(hwLocked).length;
      return `<div class="blk"><div class="lbl">Concept quizzes<span class="done${
        done === ids.length ? ' is-all' : ''}" data-verb="completed">${done}/${ids.length} completed</span></div>
        ${held ? `<p class="qz-lock">Finish this lesson's homework and ${
          held === ids.length ? (ids.length === 1 ? 'its quiz unlocks' : `its ${ids.length} quizzes unlock`)
          : held === 1 ? 'the remaining quiz unlocks' : `the remaining ${held} unlock`}.</p>` : ''}
        <div class="quizlist">${ids.map(id => quizChip(id, locked)).join('')}</div></div>`;
    }
    if (b.kind === 'tasks') {
      /* spec-173 C — the Test is drawn by testSection() at the foot of the lesson, so it is
         taken out of whatever block authored it. Everywhere else this is the same block it
         always was; `runTest` went with the item. */
      const tasks = b.tasks.filter(t => !TEST_TASK.test(t.html));
      if (!tasks.length) return '';
      /* spec-173 A — the door to the homework page, on the block it belongs to. The page is
         also reachable from the Homework tab; this is the one a reader mid-lesson finds. */
      const link = b.label === 'Homework'
        ? `<button class="lnkedit hw-go" data-hw-open="${esc(c.id)}:${u.n}">${
            turnedIn(c.id, u.n) ? 'turned in — open the page' : 'open the homework page'} →</button>`
        : '';
      // Nate: homework is only checked off on its own page now — the lesson page still lists
      // and counts it, but the boxes here are inert. The Read block keeps ticking in place.
      return taskBlock(b, tasks, link, b.label === 'Homework');
    }
    return b.html ? `<div class="blk"><div class="lbl">${esc(b.label)}</div><div class="prose">${b.html}</div></div>` : '';
  }).join('');
  /* PATCH-063 — the done chip used to announce "its quizzes are assigned", which said
     nothing a reader could act on and read as a status about the quizzes rather than about
     the lesson. Now the lesson says it is completed, and — since PATCH-057 puts a real
     verdict on every quiz — the only thing worth adding is how many of them are still
     unsat. When they are all sat it says nothing at all. */
  const qIds = u.blocks.filter(b => b.kind === 'concepts')
    .reduce((a, b) => a.concat(b.ids.filter(id => CONCEPTS[id])), []);
  const qLeft = qIds.filter(id => cs(id).status !== 'queued' && !quizTaken(cs(id))).length;
  const foot = state === 'done'
    ? `<div class="lessonfoot"><span class="pill pill-ok">Completed</span>${
       qLeft ? `<span class="hint">${qLeft} quiz${qLeft === 1 ? '' : 'zes'} still to take.</span>`
             : qIds.length ? '<span class="hint">Every quiz taken.</span>' : ''}</div>`
    : state === 'current'
    ? `<div class="lessonfoot"><button class="btn btn-go" data-lesson="${c.id}:${u.n}"${readonly?' disabled':''}>Complete lesson ${u.n}</button>
       <span class="hint">${c.reps
         /* spec-172 — `reps` now flags courses 19–26, and the old line said the wrong thing
            twice on them. "Reps" is Hanon's word and not the reading courses' — nobody does
            repetitions of a sight-reading solo — and "signed off on a performance check"
            named a check without saying who performs it or where. On these courses nothing
            in the school can hear the piano, which is what the course notes' own "Course
            final" sections say: the check is playing it, and the pass is your own honest
            read. So the line says that, and then says what completing it actually does —
            which on a course with no quizzes is only ever "opens the next one". */
         ? `Played, not quizzed — nothing here can hear you, so you sign this one off yourself.
            Completing it ${u.n + 1 <= c.lessons.length ? `opens lesson ${u.n + 1}`
                                                        : 'finishes the course'}.`
         : `Assigns lesson ${u.n+1 <= c.lessons.length ? u.n+1 : '—'}'s quizzes. Passing the lesson test does
            the same thing on its own: <code class="cmd">/school test ${esc(c.id)} ${u.n}</code> in Claude Code.`}</span></div>`
    : s.status !== 'enrolled'
    ? `<div class="lessonfoot"><span class="hint">Start the course to open this lesson.</span></div>`
    : `<div class="lessonfoot"><span class="hint">Opens once lesson ${s.lessons_complete + 1} is completed.</span></div>`;
  /* spec-173 C — the test goes AFTER everything the lesson's blocks carry, which PATCH-054
     already guarantees ends with the Concept quizzes. "After homework and after quizzes" is
     therefore a position as well as a rule, and the two agree on screen. */
  return `<section class="lesson" id="u${u.n}" data-domain="${dom(c)}" data-hw="${hwState}">
    <div class="lesson-h"><span class="u">Lesson ${u.n}</span><h3>${esc(u.title)}</h3></div>
    ${u.lead ? `<div class="prose">${u.lead}</div>` : ''}${blocks}${testSection(c, u)}${foot}</section>`;
}

/* The course note's H2 sections must keep their position RELATIVE TO THE LESSONS. Rendering every
   non-lesson section first put "Course final" above Lesson 1 — the exam instructions before any
   material had been read. Split on where the lessons actually sit in the document.
   (Found in final review of School & Music Patch 001.) */
function secSplit(c) {
  const i = c.sections.findIndex(x => x.lessons_here);
  if (i < 0) return {before: c.sections, intro: [], after: []};
  return {before: c.sections.slice(0, i), intro: [c.sections[i]], after: c.sections.slice(i + 1)};
}
/* PATCH-064 — a "Course final" section names an exam the page cannot open. It says how to
   sit it instead. Same answer as the lesson tests: in Claude Code, blind, in chat. */
const FINAL_SEC = /final|midterm|\bexam\b/i;
const secBlock = (x, c) => UNLOCKS.test(x.name)
  ? `<div class="prose" style="margin-top:26px">${foldWrap(x.name, x.html)}</div>`
  : `<div style="margin-top:26px"><p class="eyebrow">${esc(x.name)}</p><div class="prose">${x.html}</div>${
      /* spec-172 — not on a reps course. All eight of the new courses head their last section
         "Course final", so FINAL_SEC matched, and `/school final 19 … blind, one question at
         a time` printed directly under a paragraph that reads "A performance check, not a
         test page … nothing in the system can hear the piano." Two lines contradicting each
         other, and the command is not one the school can answer for a course with no
         concepts. The course note already says how the check is sat; nothing is added. */
      c && !c.reps && FINAL_SEC.test(x.name) ? runFinal(c.id) : ''}</div>`;

/* Nate's day-picker, shown in place of the Start button on a TRUE first start (the click
   handler's guard keeps it off a resume — see there) for any non-standing course. Capped at
   exactly 2 by the change handler below; Start stays disabled until both are picked, same
   language `.btn[disabled]` already uses everywhere else on the page. */
function dayPickerBlock(id) {
  // PATCH-150 — asks for as many days as the course is ALLOWED, not always two.
  const c = COURSES[id], n = c ? weeklyAllowance(c) : 2;
  const k = CLASSES[c && c.class_id];
  const word = n === 1 ? 'day' : n === 2 ? 'two days' : `${n} days`;
  return `<div class="daypick">
    <span class="daypick-k">Which ${n === 1 ? 'day' : word} do you want this course's lessons on?</span>
    <div class="daypick-days">${DOW.map((d, i) => `<label class="daypick-d${
      pickedDays.includes(i) ? ' on' : ''}"><input type="checkbox" data-day="${i}"${
      pickedDays.includes(i) ? ' checked' : ''}>${d}</label>`).join('')}</div>
    ${n < 2 ? `<p class="calnote" style="margin:0">One ${word} a week — ${
      k ? `${esc(k.short)} is` : 'this course is'} capped at ${n} lesson${
      n === 1 ? '' : 's'} a week, so there is one day to choose.</p>` : ''}
    <div class="row" style="gap:8px">
      <button class="btn btn-quiet" data-daypick-cancel="1">Cancel</button>
      <button class="btn btn-go" data-daypick-start="${esc(id)}"${
        pickedDays.length !== n ? ' disabled' : ''}>Start</button>
    </div></div>`;
}

function courseView(id) {
  const c = COURSES[id]; if (!c) return overview();
  const s = os(id), k = CLASSES[c.class_id];
  const idx = c.lessons.map(u => `<button data-jump="u${u.n}" class="${s.lessons_complete >= u.n ? 'done' : ''}">
    <b style="font-variant-numeric:tabular-nums">${u.n}.</b> ${esc(u.title)}</button>`).join('');
  /* PATCH-047 — the class button follows the back button, ahead of the pills: the two
     navigations sit together and the labels stop being separated by two coloured pills.
     PATCH-067 — the back button goes to Classes, which is where courses are reached from
     now that Courses has no rail tab. */
  return `<div class="view" data-domain="${dom(c)}">
    <div class="coursehead">
      <div class="row" style="gap:8px">
        <button class="btn btn-quiet" data-nav="classes">← Classes</button>
        ${k ? `<button class="btn btn-quiet" data-class="${k.id}">Class ${esc(k.id)} · ${esc(k.short)}</button>` : ''}
        ${pill(c)}${statusPill(s.status, s)}
        ${c.standing ? '<span class="pill">Standing</span>' : ''}
      </div>
      <div class="spread">
        <h2 class="vh">${esc(c.title)}</h2>
        ${pickingDays === id ? dayPickerBlock(id) : `<div class="row" style="gap:8px">
          <button class="btn ${s.status === 'enrolled' ? '' : 'btn-go'}" data-course-toggle="${id}"${readonly?' disabled':''}>
            ${courseAction(s)}</button>
          ${/* PATCH-081 — only offered once there is something to throw away. */
            s.started && !readonly ? `<button class="btn btn-quiet${
              confirmAct === 'course:' + id ? ' danger' : ''}" data-course-stop="${esc(id)}">${
              confirmAct === 'course:' + id ? 'Confirm — erase progress' : 'Stop'}</button>` : ''}
        </div>`}
      </div>
      <div class="row" style="color:var(--muted);font-size:13px;gap:14px">
        <span>${s.lessons_complete}/${c.lessons.length} lessons</span>
        ${c.depends_on.length ? `<span>Follows course ${c.depends_on.join(', ')}</span>` : ''}
      </div>
    </div>
    <div class="readwrap"><div>
      <div class="prose">${introHTML(c)}</div>
      ${secSplit(c).before.map(x => secBlock(x, c)).join('')}
      ${secSplit(c).intro.map(x => `<div class="prose" style="margin-top:26px">${x.html}</div>`).join('')}
      ${c.lessons.map(u => lessonBlock(c, u)).join('')}
      ${secSplit(c).after.map(x => secBlock(x, c)).join('')}
    </div>
    <div class="uindex"><div class="lbl">Lessons</div>${idx}</div></div></div>`;
}

/* PATCH-121 — the class page, given a shape. Three changes, all Nate's:
   the engraved cut becomes a BANNER rather than a thumbnail on a tile elsewhere; "What it
   assumes" and "What closes it" sit SIDE BY SIDE, because they are the two ends of the same
   question (what you need before, what you need after) and stacking them buried the second one
   under a list; and the un-enroll backups get a section of their own at the foot of the page.

   The split is done on the class note's own `<h2>` headings rather than on anything new in
   build.py: the notes are shared with Britt and are not being reshaped for one page's layout.
   A class whose note lacks either heading simply renders its prose whole — `splitClassHtml`
   falls through to `intro` and both columns come back empty, which is why the grid is only
   drawn when there is something to put in it. */
/* PATCH-126 — a class note's CHANGE RECORDS do not belong on the class page. Nate, on Guitar
   Sight Reading: "remove the blue sections with those updates. dont care."

   Both of that class's blue callouts are decisions about the school's own bookkeeping — a class
   that stopped being standing, a pair of courses re-partitioned into four — written for whoever
   next edits the curriculum. The vault note is the right home for them and keeps them; a page you
   open to study is not. Stripped by TITLE rather than by callout type, because the same `[!info]`
   style also carries live configuration ("Standing class — load: intensive" on classes 4 and 9),
   which is not a changelog and stays. A record announces itself with a date or a spec number in
   its title, and that is the whole test. */
const CHANGELOG_TITLE = /\b(spec-\d+|\d{4}-\d{2}-\d{2})\b/;
function stripChangelog(html) {
  return String(html || '').replace(
    /<div class="callout co-info"><p class="co-title">([\s\S]*?)<\/p>[\s\S]*?<\/div><\/div>/g,
    (whole, title) => CHANGELOG_TITLE.test(title.replace(/<[^>]+>/g, '')) ? '' : whole);
}
function splitClassHtml(html) {
  const cut = (h, label) => {
    const re = new RegExp(`<h2>\\s*${label}\\s*</h2>`, 'i');
    const m = re.exec(h);
    if (!m) return null;
    const rest = h.slice(m.index + m[0].length);
    const nxt = /<h2>/i.exec(rest);
    return {before: h.slice(0, m.index), body: nxt ? rest.slice(0, nxt.index) : rest,
            after: nxt ? rest.slice(nxt.index) : ''};
  };
  const a = cut(html, 'What it assumes');
  const c = cut(html, 'What closes it');
  if (!a && !c) return {intro: html, assumes: '', closes: '', tail: ''};
  const intro = (a || c).before;
  const tail = c ? c.after : (a ? a.after : '');
  return {intro, assumes: a ? a.body : '', closes: c ? c.body : '', tail};
}
function classView(id) {
  const k = CLASSES[id]; if (!k) return classesView();
  const parts = splitClassHtml(stripChangelog(k.html || ''));
  const backups = undoAll().filter(u => u.class_id === id);
  return `<div class="view classv" data-domain="${k.domain}">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="classes">← Classes</button>
      ${domPill(dom(k))}${statusPill(ks(id).status)}</div>
    <div class="clsbar"><span class="clsbar-ic" aria-hidden="true">${classEmoji(k)}</span></div>
    <div class="spread"><h2 class="vh">${esc(k.short || k.title)}</h2>
      <button class="btn ${ks(id).status === 'enrolled' ? '' : 'btn-go'}" data-class-toggle="${id}"${readonly?' disabled':''}>
        ${ks(id).status === 'enrolled' ? 'Un-enroll' : 'Enroll'}</button></div>
    ${parts.intro ? `<div class="prose">${parts.intro}</div>` : ''}
    ${(parts.assumes || parts.closes) ? `<div class="clscols">
      <div class="clscol"><p class="eyebrow">What it assumes</p><div class="prose">${
        parts.assumes || '<p class="calnote">Nothing recorded.</p>'}</div></div>
      <div class="clscol"><p class="eyebrow">What closes it</p><div class="prose">${
        parts.closes || '<p class="calnote">Nothing recorded.</p>'}</div></div></div>` : ''}
    ${parts.tail ? `<div class="prose">${parts.tail}</div>` : ''}
    <div><div class="dhead"><p class="eyebrow">Courses</p><span class="rule"></span>
      <span class="cnt">${k.n_lessons} lessons · ${k.n_concepts} quizzes</span></div>
      <div class="grid">${k.courses.filter(x => COURSES[x]).map(x => courseRow(COURSES[x], true)).join('')}</div></div>
    ${backups.length ? `<div>
      <div class="dhead"><p class="eyebrow">Backups</p><span class="rule"></span>
        <span class="cnt">${backups.length} un-enroll${backups.length === 1 ? '' : 's'} kept</span></div>
      <div class="quizlist wide">${backups.map(undoRow).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Un-enrolling resets every course in the class —
        lessons, quiz ratings and homework ticks all go. Each reset is kept here first; recalling
        one puts it back and consumes the backup.</p></div>` : ''}</div>`;
}
/* One backup, wherever it is listed — the class page and Activity &amp; Sync draw the same row. */
function undoRow(u) {
  return `<div class="qz qz-undo">
    <span class="qz-t" style="cursor:default"><span class="st"></span>${esc(u.class_short)}
      <span class="qz-sub">${esc(u.at.replace('T', ' '))}</span></span>
    <span class="qz-d" data-d="later">${undoSize(u)} entries</span>
    <button class="qz-b btn btn-quiet" data-undo="${esc(u.at)}"${readonly ? ' disabled' : ''}
      title="Put this class's courses, quiz ratings and homework back">Recall</button></div>`;
}

function conceptCard(id) {
  /* PATCH-136 (B9) — the guard every sibling view already had. Concepts get renamed (spec-159 did
     it), and the route is persisted in sessionStorage — so a stale `concept:<id>` threw before
     anything rendered, leaving a blank tab with no rail and no error, unrecoverable except by
     opening a new one. Falling back to the list is what `classView` and `courseView` already do. */
  if (!CONCEPTS[id]) return conceptsView();
  const c = CONCEPTS[id], s = cs(id), st = dueState(s), taken = quizTaken(s);
  // PATCH-068/069 — "Quizzes" is the drill route now; the old quiz-bank tab is gone, so the
  // back link points at the tab that exists.
  /* The blind test has one door: drillView's Reveal button. This card is the OTHER door to
     the same concept — reached from a quiz row's title, the quiz bank, or a strand plate —
     and until now it showed the question and answer unconditionally, so clicking a due quiz's
     own name spoiled the thing you were about to be tested on. Gated on `taken` (has a rating
     ever been recorded), not on `status`: a released-but-unsat quiz is exactly the case that
     must stay hidden, and status alone (`learning`) cannot tell that apart from one already
     sat and due again. Once sat, the card stays open for review on every later visit — the
     blind test is only for the first time through. */
  const gate = taken ? '' : s.status === 'queued'
    ? 'Not assigned yet — it opens once the lesson that teaches it does.'
    : "Take the quiz first — the question and answer stay hidden until you've sat it once, blind.";
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="drill">← Quizzes</button>
      <button class="btn btn-quiet" data-strand="${esc(c.strand)}" style="gap:8px">${plate(c.strand)}${
        esc(strandLabel(c.strand))}</button>
      <span class="pill ${s.status==='maintenance'?'pill-ok':s.status==='learning'?'pill-due':''}">${qLabel(s.status)}</span>
      ${st ? `<span class="pill ${st === 'late' || st === 'today' ? 'pill-due' : ''}">${dueText(s)}</span>` : ''}
      ${quizTaken(s) ? `<span class="pill ${rPassed(s.sr_last_rating) ? 'pill-ok' : 'pill-due'}">${
        esc(rLabel(s.sr_last_rating))}</span>` : ''}
      ${COURSES[c.course] ? `<button class="btn btn-quiet" data-course="${c.course}">Course ${esc(c.course)} · lesson ${c.lesson}</button>` : ''}</div>
    <div class="spread"><h2 class="vh">${esc(c.short)}</h2>
      ${s.status !== 'queued'
        ? `<button class="btn btn-go" data-drill-quiz="${esc(id)}"${
            readonly || hwLocked(id) ? ' disabled' : ''}${hwLocked(id)
            ? ' title="Finish lesson ' + c.lesson + '\'s homework first"' : ''}>${
            quizTaken(s) ? 'Take it again' : 'Take this quiz'}</button>`
        : ''}</div>
    ${hwLocked(id) ? `<p class="calnote" style="margin:0;color:var(--due)">Locked until lesson ${
      c.lesson}'s homework is done.</p>` : ''}
    ${s.sr_due ? `<p class="calnote" style="margin:0">Due ${esc(shortDate(s.sr_due))} — ${
      esc(dueReason(id))}.</p>` : ''}
    ${gate ? `<div class="card"><p class="calnote" style="margin:0">${esc(gate)}</p></div>` : `
    <div class="card"><div class="eyebrow">Question</div><div class="prose">${c.q}</div>
      <div class="answer" style="margin-top:14px"><div class="eyebrow">Answer</div><div class="prose">${c.a}</div></div></div>
    ${c.why ? `<div><p class="eyebrow">Why it matters</p><div class="prose">${c.why}</div></div>` : ''}
    ${/* PATCH-061 — DISPLAY ONLY. The `## Drill` heading in all 147 concept notes and
          build.py's `section("Drill")` key are unchanged: renaming those is a coupled
          change across the curriculum and the builder, deliberately not made in this pass. */
      c.drill ? `<div><p class="eyebrow">Review</p><div class="prose">${c.drill}</div></div>` : ''}`}
    ${/* spec-177 — the shelf, reached from the concept it serves rather than only from the
          rail. This is the whole point of wiring the tools to `reinforces:` instead of leaving
          them as a bookmark list: the moment you want a drill is the moment you are looking at
          the card, not the moment you are browsing a library. */
      toolStrip(toolsForConcept(id), 'Practice this at')}
    <div class="card" style="font-size:13px;color:var(--muted)">
      Interval ${s.sr_interval}d · ease ${s.sr_ease} · due ${s.sr_due || '—'} ·
      last practised ${s.last_practiced || 'never'}${s.sr_last_rating ? ` (${s.sr_last_rating})` : ''}<br>
      Reads from ${esc(c.source)}</div></div>`;
}

/* PATCH-012 — the quiz bank, given its taxonomy back.
   147 cards sorted by id is already grouped by strand; nothing on the page said so, because
   the strand was a grey three-letter code and the only way to see one strand at a time was a
   <select> that showed one name and no sizes. The board replaces it: all 17 strands at once,
   each with its call number, its share of the 147, and how much of it is passed — and it is
   the filter, so what you can see is what you can click. Grouped by domain, because two hue
   families meeting at cyan should be stated rather than inferred. */
function conceptsView() {
  const q = filters.q.toLowerCase();
  const list = Object.values(CONCEPTS).filter(c =>
      (!filters.strand || c.strand === filters.strand) &&
      (!filters.status || cs(c.id).status === filters.status) &&
      (!q || c.title.toLowerCase().includes(q)))
    .sort((a,b) => a.id.localeCompare(b.id));
  const board = d => {
    const ss = Object.values(STRANDS).filter(s => s.domain === d)
      .sort((a, b) => a.i - b.i || a.key.localeCompare(b.key));
    if (!ss.length) return '';
    return `<div data-domain="${d}"><div class="dhead"><p class="eyebrow">${DOM_LABEL[d]}</p>
      <span class="rule"></span><span class="cnt">${ss.length} strands ·
        ${ss.reduce((n, s) => n + s.ids.length, 0)} quizzes</span></div>
      <div class="sboard">${ss.map(s => {
        const passed = s.ids.filter(id => cs(id).status === 'maintenance').length;
        const open = s.ids.filter(id => cs(id).status !== 'queued').length;
        return `<button class="sb" data-strand="${esc(s.key)}" style="--h:${s.hue}"
          aria-pressed="${filters.strand === s.key}"
          title="${esc(s.label)} — ${s.ids.length} quizzes · ${open} assigned · ${passed} passed">
          <span class="sp">${esc(s.key)}</span><span class="sbl">${esc(s.label)}</span>
          <span class="sbn">${s.ids.length}<b><em style="width:${
            Math.round(100 * passed / s.ids.length)}%"></em></b></span></button>`;
      }).join('')}</div></div>`;
  };
  // PATCH-068 — the bank lost its rail tab; it is reached from a strand plate and from the
  // Quizzes page, so it keeps a way back.
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="drill">← Quizzes</button></div>
    <div><p class="eyebrow">Quiz bank</p><h2 class="vh">${Object.keys(CONCEPTS).length} concept quizzes</h2>
      <p class="lede" style="margin-top:8px">One testable idea each. A quiz is assigned the moment the lesson that
      teaches it opens, due the same day as the lesson itself, and you keep being re-checked on it after you pass.</p></div>
    ${DOMS.map(board).join('')}
    <div class="filters">
      ${filters.strand ? `<button class="btn" data-strand="${esc(filters.strand)}" style="gap:8px">${
        plate(filters.strand)}${esc(strandLabel(filters.strand))} ✕</button>` : ''}
      <select data-f="status"><option value="">Any status</option>${
        ['queued','learning','maintenance'].map(s =>
          `<option value="${s}"${filters.status===s?' selected':''}>${qLabel(s)}</option>`).join('')}</select>
      <input data-f="q" placeholder="Search titles" value="${esc(filters.q)}">
      <span style="color:var(--muted);font-size:13px">${list.length} shown</span></div>
    <div class="clist">${list.map(c => { const s = cs(c.id), st = dueState(s);
      return `<button class="ccard" data-concept="${esc(c.id)}" style="--h:${hueOf(c.strand)}">
        <span class="sp">${esc(c.strand)}</span><span class="t">${esc(c.short)}</span>
        <span class="m"><span class="qst" data-st="${esc(s.status)}">${qLabel(s.status)}</span>${
          st ? `<span${st === 'late' || st === 'today' ? ' style="color:var(--due)"' : ''}>${dueText(s)}</span>`
             : ''}</span></button>`; }).join('')}</div></div>`;
}

/* PATCH-008: the session is no longer the only door to a quiz, and the daily drip is no
   longer a gate on one. `due` is what the schedule asks for today; `ahead` is every assigned
   quiz, takeable whenever. Taking one early runs the same rate() path with the same SM-2
   numbers — nothing about the maths knows or cares whether the quiz was due.

   PATCH-069: this tab is called **Quizzes** now (it took the name PATCH-068 freed up) and it
   is a LIST first, a session second. It says what is waiting and what has been done, with
   the verdict beside each done one. "Scores" are the ratings the school already keeps —
   automatic / solid / rusty / forgot — because nothing stores a numeric score and PATCH-057's
   decision was not to invent one. */
function quizzesLanding() {
  const due = dueList(), ahead = assignedList();
  const taken = takenList();
  /* PATCH-103 — a quiz that is due today and held by homework now lives in Due today, called
     out as blocked, instead of being moved out of the list into its own section. Same failure
     shape as the sheet music: a thing that is due AND blocked vanishing from the one place
     you would look for it.

     Nothing is DUPLICATED to achieve it — a row lives in exactly one section:
       · `blocked` — due today, homework unfinished. Shown in Due today, with a dead Take.
       · `held`    — homework unfinished and NOT due today. What is left of the old section.
       · `open`    — assigned, takeable, not due yet. Work-ahead, in Available.
     The due-today rows used to sit in Available (untakenList includes them); moving them up
     is the whole patch, so Available loses them rather than showing them twice. */
  const blocked = dueHeld().filter(k => !quizTaken(cs(k)));
  const heldSet = new Set(blocked);
  const held = lockedList().filter(k => !quizTaken(cs(k))).filter(k => !heldSet.has(k));
  const dueSet = new Set(due.concat(blocked));
  const open = untakenList().filter(k => !dueSet.has(k));
  const retakes = missDue();                       // PATCH-113 — listed here, not only in the session
  const dueAll = quizzesOwed();
  const paused = pausedList();
  const pausedCourses = [...new Set(paused.map(k => CONCEPTS[k].course))].sort();
  const back = drill.from && drill.from.indexOf('course:') === 0
    ? `<button class="btn btn-quiet" data-nav="${esc(drill.from)}">Back to course ${
        esc(drill.from.split(':')[1])}</button>` : '';
  const justFinished = drill.queue.length && drill.i >= drill.queue.length;
  const n = Math.min(CFG.daily_drip, due.length);
  /* PATCH-104 — a section may FOLD. Passing a fold id makes the eyebrow the control and ships
     the section shut (secOpen's default is overridden to false), which is what Completed
     wants: it grows without bound and is the least-read block on the page. The count stays on
     the header line whether it is open or not, so a shut section still says how much is in it
     — folding is not hiding. Which sections are shut is per-viewer chrome and lives in
     sessionStorage with the Overview's, never on P: it is a preference, and P syncs home. */
  const sec = (label, ids, cnt, empty, fold) => {
    const on = !fold || secOpen(fold, false);
    return `<div>
    <div class="dhead">${fold
      ? `<button class="dfold${on ? '' : ' shut'}" data-sec-toggle="${esc(fold)}"
          aria-expanded="${on}"><span class="car"></span>${esc(label)}</button>`
      : `<p class="eyebrow">${label}</p>`}<span class="rule"></span>
      <span class="cnt">${cnt}</span></div>
    ${!on ? '' : ids.length
      ? `<div class="quizlist wide">${ids.map(id => quizChip(id)).join('')}</div>`
      : `<p class="calnote" style="margin:0">${empty}</p>`}</div>`;
  };
  return `<div class="view">
    <div class="spread"><div><p class="eyebrow">Quiz bank</p><h2 class="vh">Quizzes</h2></div>
      <div class="row">${back}${
        /* spec-172 — the one pointer between the two. The clips are not quizzes and are not
           listed anywhere on this page; this is so a reader who lives on the Quizzes tab
           finds them at all. Same guard as the rail item. */
        AUDIO_OK && EAR.length ? '<button class="btn btn-quiet" data-nav="ear">Ear training →</button>' : ''
      }<button class="btn btn-quiet" data-nav="concepts">Browse all ${
        Object.keys(CONCEPTS).length} →</button></div></div>
    ${justFinished ? `<div class="card"><div class="spread"><div>
        <h3 style="margin:0;font-size:17px">Session done — ${drill.queue.length} taken</h3>
        <div style="color:var(--muted);font-size:13px;margin-top:3px">${due.length
          ? `${due.length} still due today.` : 'Nothing left due today.'}</div></div>
        ${due.length ? `<button class="btn btn-go" data-drill-start="${due.length}">Keep going</button>`
          : ''}</div></div>` : ''}
    ${/* PATCH-103 — the block that says how many are due now LISTS them. The headline counts
          every quiz due today, blocked or not, because that is what "due today" means; the
          buttons count only the takeable ones, because that is what a session can serve. */''}
    <div class="card"><div class="spread"><div>
      <h3 style="margin:0;font-size:17px">${dueAll
        ? `${dueAll} pop quiz${dueAll === 1 ? '' : 'zes'} due today` : 'No pop quizzes due today'}</h3>
      <div style="color:var(--muted);font-size:13px;margin-top:3px">${due.length || retakes.length
        ? `${lite(`The school recommends ${CFG.daily_drip} a day — pacing, not a gate. Blind question,
           then reveal, then rate.`, '')}${retakes.length
             ? ` ${retakes.length} ${retakes.length === 1 ? 'is a retake' : 'are retakes'} of
                question${retakes.length === 1 ? '' : 's'} you missed on a test — ${
                retakes.length === 1 ? 'it leads' : 'they lead'} the session.`
             : ''}${blocked.length
             ? ` ${blocked.length} of the ${dueAll} ${blocked.length === 1 ? 'is' : 'are'} waiting
                on homework.`
             : ''}`
        : blocked.length
          ? `${blocked.length === 1 ? 'It is' : 'All of them are'} waiting on homework — none can
             be taken until the lesson that sets it is finished.`
        : ahead.length ? lite('A due date is the pace, not a lock — take any assigned quiz early.', '')
        : lite('Quizzes are assigned the moment the lesson that teaches them opens.', '')}</div></div>
      <div class="row">
        ${(due.length || retakes.length)
          ? `<button class="btn btn-go" data-drill-start="${n}">Take ${
              n + retakes.length}</button>` : ''}
        ${due.length > CFG.daily_drip
          ? `<button class="btn" data-drill-start="${due.length}">Take all ${due.length}</button>` : ''}
        ${ahead.length && ahead.length > due.length
          ? `<button class="btn" data-drill-scope="assigned">Work ahead — all ${ahead.length}</button>` : ''}
      </div></div>
      ${dueAll ? `<div class="quizlist wide" style="margin-top:14px">${
        /* PATCH-113 — retakes lead the list for the same reason they lead the session. */
        retakes.map(k => missChip(k)).join('')}${
        due.map(id => quizChip(id, false)).join('')}${
        /* `lock` is passed EXPLICITLY on both halves rather than letting quizChip resolve it:
           these two lists were built from the gate, and re-deriving it per row would be the
           same question asked twice with a chance of two answers. */
        blocked.map(id => quizChip(id, true)).join('')}</div>` : ''}
      ${blocked.length ? `<p class="calnote" style="margin:9px 0 0">Greyed rows are waiting on
        homework — open the lesson that teaches one and tick it off.</p>` : ''}</div>
    ${sec('Available', open, `${open.length} assigned, not due yet`,
       dueAll ? 'Nothing to work ahead on right now.'
       : ahead.length ? 'Every assigned quiz has been taken at least once.'
                    : lite('Nothing assigned yet — turn a lesson in and its quizzes appear here.', 'Nothing assigned yet.'))}
    ${/* PATCH-058 — locked quizzes are LISTED, not hidden. A quiz that simply vanished
          because a homework box was unticked would read as a bug; this says what is holding
          it up, and the row's own control says the same on hover.
          PATCH-103 narrowed it rather than deleting it: the due-today ones moved up into Due
          today, and this keeps the ones that are held but NOT due yet — rare, but real (a
          quiz whose SR date has been pushed forward while its homework sits unfinished). It
          renders only when it has rows, so on a normal day it simply is not there. */
      held.length ? `<div>
      <div class="dhead"><p class="eyebrow">Waiting on homework</p><span class="rule"></span>
        <span class="cnt">${held.length} assigned, homework not finished</span></div>
      <div class="quizlist wide">${held.map(id => quizChip(id)).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Open the lesson that teaches one and tick its
        homework off; the quiz unlocks there and then.</p></div>` : ''}
    ${/* PATCH-114 — retired quizzes are LISTED, for the same reason locked and paused ones are:
          a quiz that simply vanished when you rated it Automatic would read as data loss. This says what
          happened and carries the one control that undoes it. */
      retiredList().length ? `<div>
      <div class="dhead"><p class="eyebrow">Retired</p><span class="rule"></span>
        <span class="cnt">${retiredList().length} automatic and out of rotation</span></div>
      <div class="quizlist wide">${retiredList().map(id => {
        const c = CONCEPTS[id];
        return `<div class="qz qz-ret" data-taken="1">
          <button class="qz-t" data-concept="${esc(id)}" title="Retired — automatic ${
            esc(cs(id).last_practiced || '')}"><span class="st"></span>${esc(c.short)}</button>
          <span class="qz-d" data-d="later">automatic ${esc(shortDate(cs(id).last_practiced || ''))}</span>
          <button class="qz-b btn btn-quiet" data-unretire="${esc(id)}"${readonly ? ' disabled' : ''}
            title="Put it back on the spaced-review schedule">Un-retire</button></div>`;
      }).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Rating a pop quiz Automatic retires it — it stops being
        served, counted or drawn on the schedule. Un-retire one to put it back in rotation.</p></div>` : ''}
    ${/* PATCH-071 — paused quizzes are LISTED for the same reason locked ones are: a quiz
          that simply disappeared would read as data loss. This says what happened and how to
          get it back. */
      paused.length ? `<div>
      <div class="dhead"><p class="eyebrow">Paused</p><span class="rule"></span>
        <span class="cnt">${paused.length} from ${pausedCourses.length} paused course${
          pausedCourses.length === 1 ? '' : 's'}</span></div>
      <div class="quizlist wide">${paused.map(id => quizChip(id)).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Out of rotation while their course is paused —
        ${esc(pausedCourses.map(id => COURSES[id].short).join(', '))}. Resume the course and they
        come back, re-dated to today rather than weeks late.</p></div>` : ''}
    ${/* PATCH-104 — shipped folded. It is the only unbounded list on the page (every quiz
          ever sat stays in it) and the least-read block, so it costs a click to open and the
          count on its header line answers the question most visits are actually asking. */
      sec('Completed', taken, `${taken.length} taken · ${
       taken.filter(id => rPassed(cs(id).sr_last_rating)).length} passed`,
       'Nothing taken yet.', 'qz-done')}
  </div>`;
}

function drillView() {
  if (!drill.queue.length || drill.i >= drill.queue.length) return quizzesLanding();
  const id = drill.queue[drill.i];
  if (isMiss(id)) return missDrillView(id);
  const c = CONCEPTS[id], s = cs(id);
  const pct = Math.round(100 * drill.i / drill.queue.length);
  return `<div class="view drill">
    <div class="progressline"><span>${drill.i + 1} / ${drill.queue.length}</span>
      <span class="bar"><i style="width:${pct}%"></i></span>${plate(c.strand)}</div>
    <div class="qcard"><div class="q">${c.q}</div>
      ${drill.shown ? `<div class="answer"><div class="a">${c.a}</div>
        <div class="rate">
          ${RATE_ROW}</div></div>`
        : `<div style="margin-top:auto"><button class="btn btn-go" data-reveal="1">Reveal answer</button></div>`}</div>
    <div class="row" style="justify-content:space-between;font-size:12px;color:var(--muted)">
      <span>${esc(c.strand)}-${esc(c.id.split('—')[0].trim().split('-')[1] || '')} · interval ${s.sr_interval}d ·
        ease ${s.sr_ease}${s.sr_due ? ` · scheduled ${esc(s.sr_due)}` : ''}</span>
      <button class="btn btn-quiet" data-concept="${esc(id)}">Open the card</button></div></div>`;
}

/* PATCH-112 — a missed question's card. Same shape as the concept card above on purpose —
   blind prompt, reveal, rate — because it is the same act; what differs is what it is ABOUT and
   so what the footer says. A concept card footer reports SM-2 internals (interval, ease); this
   one names the paper and question it came from and whether it was marked wrong or partial,
   which is the only context that makes "why am I being asked this again" answerable.

   The explanation is shown WITH the answer rather than held back: the point of a retake is to
   close the specific gap the grader already described, and hiding the description of that gap
   behind a second click serves nothing. */
function missDrillView(id) {
  const k = missKey(id), m = missOf(k);
  if (!m) { drill.i += 1; return drillView(); }   // cleared underneath us — skip, never crash
  const pct = Math.round(100 * drill.i / drill.queue.length);
  const c = CONCEPTS[m.concept];
  return `<div class="view drill">
    <div class="progressline"><span>${drill.i + 1} / ${drill.queue.length}</span>
      <span class="bar"><i style="width:${pct}%"></i></span>
      <span class="misstag">${m.kind === 'partial' ? 'Partly right' : 'Missed'} first time</span></div>
    <div class="qcard"><div class="q">${esc(m.q || '')}</div>
      ${drill.shown ? `<div class="answer"><div class="a">${esc(m.a || '')}</div>
        ${m.why ? `<div class="misswhy">${esc(m.why)}</div>` : ''}
        <div class="rate">
          ${RATE_ROW}</div></div>`
        : `<div style="margin-top:auto"><button class="btn btn-go" data-reveal="1">Reveal answer</button></div>`}</div>
    <div class="row" style="justify-content:space-between;font-size:12px;color:var(--muted)">
      <span>${esc(m.test || '')} · Q${esc(String(m.n))}${
        c ? ` · ${esc(c.short)}` : ''} · rating it Automatic clears the retake</span>
      ${c ? `<button class="btn btn-quiet" data-concept="${esc(m.concept)}">Open the card</button>` : ''}</div></div>`;
}

/* spec-172 — the listening surface. Its own route rather than a block on the Quizzes page:
   everything on that page is driven by SR state out of progress-<user>.json, and twenty clips
   that are assigned to nobody, due never and scored not at all would have read as quizzes
   that had lost their dates. Separating them also means the quiz flow is untouched.
   Read-only viewers keep every control here. `readonly` means "your progress will not be
   saved back to this page" and this surface saves nothing — disabling Play would take the
   whole surface away from the one reader who cannot get it back by other means. */
function earView() {
  if (!EAR.length) return `<div class="view">
    <div><p class="eyebrow">Listening</p><h2 class="vh">Ear training</h2></div>
    <div class="card" style="color:var(--muted);font-size:14px"><b style="color:var(--ink)">No clips
      in this build.</b> The page carries the ear-training set as pitch data
      (<code class="cmd">Machine/School/eartrain.json</code>); this copy was built without it.</div></div>`;
  const i = earAt(), clip = EAR[i], shown = earSeen(clip.id);
  const seen = ear.seen.filter(id => EAR.some(c => c.id === id)).length;
  const pct = Math.round(100 * seen / EAR.length);
  const num = n => String(n + 1).padStart(2, '0');
  const play = (id, label, cls) => AUDIO_OK
    ? `<button class="${cls}" data-ear-play="${esc(id)}">${label}</button>` : '';
  return `<div class="view" data-domain="theory">
    <div class="spread" style="align-items:flex-start">
      <div><p class="eyebrow">Listening</p><h2 class="vh">Ear training</h2>
        <p class="lede" style="margin-top:8px">Twenty clips, played by the page itself — there is no
        audio file in here, only the pitches and a synthesiser.${AUDIO_OK
          /* Don't promise the loop where it cannot run: without Web Audio the next line on
             screen is a banner saying nothing can be played, and "hear it, name it" directly
             above it reads as a page arguing with itself. */
          ? ' Hear it, name it, then reveal.' : ''}
        Nothing is scored and nothing is saved: these sit outside the quiz rotation on purpose.</p></div>
      <div class="row"><button class="btn btn-quiet" data-nav="drill">Quizzes →</button>
        ${seen ? `<button class="btn btn-quiet" data-ear-reset="1">Hide all answers</button>` : ''}</div></div>
    ${AUDIO_OK ? '' : `<div class="banner"><span>This browser has no Web Audio, so nothing here can be
      played. The set is listed below with its answers open.</span></div>`}
    <div class="drill" style="margin:0">
      <div class="progressline"><span>Clip ${num(i)} / ${EAR.length}</span>
        <span class="bar"><i style="width:${pct}%"></i></span>
        <span>${seen} of ${EAR.length} revealed</span></div>
      <div class="qcard earcard">
        <div class="earq">${AUDIO_OK ? 'What is this?' : clip.answer ? esc(clip.answer) : ''}</div>
        <div class="row">
          ${play(clip.id, '<em>▶</em> Play the clip', 'btn btn-go earplay')}
          ${shown || !AUDIO_OK ? '' : `<button class="btn" data-ear-show="${esc(clip.id)}">Reveal</button>`}
        </div>
        ${shown && AUDIO_OK ? `<div class="answer"><div class="a earans">${esc(clip.answer)}</div></div>` : ''}
        <div class="row earnav">
          <button class="btn btn-quiet" data-ear-prev="1">← Previous</button>
          <span class="hint">${AUDIO_OK
            ? 'Play as many times as you like — replaying costs nothing and is how the interval sticks.'
            : 'Answers are open because there is no sound to guess against.'}</span>
          <button class="btn btn-quiet" data-ear-next="1">Next →</button></div>
      </div>
    </div>
    <div>
      <div class="dhead"><p class="eyebrow">The set</p><span class="rule"></span>
        <span class="cnt">${EAR.length} clips · intervals, chords, scales, progressions</span></div>
      <div class="quizlist wide earlist">${EAR.map((c, n) => {
        const open = !AUDIO_OK || earSeen(c.id);
        return `<div class="qz"${open ? ' data-seen="1"' : ''}${n === i ? ' data-now="1"' : ''}>
          <button class="qz-t" data-ear-go="${n}" title="Make this the current clip"><span class="st"></span>Clip ${
            num(n)}</button>
          <span class="qz-d">${open ? esc(c.answer) : 'hidden'}</span>
          ${play(c.id, 'Play', 'qz-b btn btn-quiet')}</div>`;
      }).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Synthesised from MIDI note numbers at play time —
        a plain tone, deliberately, so what you are identifying is the interval and not a timbre.</p>
    </div>
  </div>`;
}

/* ================================================================ spec-173: homework
   Nate: "i want to make homework its own page so i can turn it in like how i can complete
   quizzes … so each lesson has 1 homework page that lists everything to do and that can be
   turned in."

   One page per lesson. It lists everything the lesson asks for — the Read block and the
   Homework block, every item, the Test excluded because the Test is its own section on the
   lesson now — carries the sheet music the homework cites, takes a practice log where the
   lesson is a tempo drill, and has one Turn in button at the top of it.

   TURNING HOMEWORK IN IS NOT COMPLETING THE LESSON, and the page says so in as many words.
   They are separate stores doing separate jobs: `lessons_complete` is what ASSIGNS the next
   lesson's quizzes (and PATCH-058 then holds them until its homework is done), while
   `assignments` is a hand-in you can make without moving the course on at all. Conflating
   them would silently change the quiz-release rule for every course in the school. */

/** "Derivation Rules · LESSON 3 · Intervals as a System" — the identity line, said once. */
const hwWho = (c, n, title) => `<span class="hw-c">${esc(c.short)}</span>
  <span class="hw-n">Lesson ${n}</span><span class="hw-t">${esc(title)}</span>`;

/* One row on the Homework tab. Same three-column .qz shape the Quizzes page uses — what it
   is, when it is due, its state — because a reader who has learned one of these lists has
   learned both. The state dot gets its own attribute rather than borrowing the quiz's
   `data-st`: homework has no `learning`/`maintenance` and pretending otherwise would put SR
   vocabulary on something that is not spaced repetition. */
function hwRow(x) {
  const day = x.due, has = typeof day === 'number';
  const late = !x.done && has && day < dayOf(TODAY);
  const today = !x.done && has && day === dayOf(TODAY);
  const when = x.done ? (x.at ? `in ${esc(shortDate(x.at))}` : 'turned in')
    /* A left-behind row has no due date to print — its lesson left the plan when it was
       turned in. Saying so beats an empty cell, which reads as a date that failed to load. */
    : x.past ? 'lesson already in'
    : !has ? ''
    : late ? `${dayOf(TODAY) - day}d late`
    : today ? 'due today'
    : day === dayOf(TODAY) + 1 ? 'due tomorrow' : `due ${esc(shortDate(dayIso(day)))}`;
  const key = `${x.c.id}:${x.n}`;
  const left = hwLeftOf(lessonOf(x.c.id, x.n));
  /* The button HANDS IT IN from here — that is the parity Nate asked for, "turn it in like how
     I can complete quizzes", and on the Quizzes page the row's own button is what does the
     thing. The title opens the page for anyone who wants to read the lesson first, and the
     hand-in is undoable there, so a stray click costs one click back. The count of unticked
     items rides on the title rather than replacing the button's verb: a button labelled
     "3 left" says nothing about what pressing it does. */
  return `<div class="qz" data-hwst="${x.done ? 'in' : 'open'}" data-domain="${dom(x.c)}">
    <button class="qz-t" data-hw-open="${esc(key)}"
      title="Open the homework page — Course ${esc(x.c.id)}, lesson ${x.n}"><span class="st"></span>${
      hwWho(x.c, x.n, x.title)}${!x.done && left
        ? `<span class="hw-left">${left} left</span>` : ''}</button>
    <span class="qz-d"${late || today ? ' data-d="today"' : ''}>${when}</span>
    ${x.done ? `<button class="qz-b qz-r" data-pass="y" data-hw-open="${esc(key)}"
        title="Turned in${x.at ? ` ${esc(x.at)}` : ''} — open the page">Turned in</button>`
      : `<button class="qz-b btn btn-quiet" data-hw-turnin="${esc(key)}"${
          readonly ? ' disabled' : ''} title="${left
            ? `Hand it in — ${left} item${left === 1 ? '' : 's'} still unticked, which does not stop you`
            : 'Hand it in'}">Turn in</button>`}</div>`;
}

/* PATCH-148 — an outside lesson's homework, as a row on the Homework tab. Nate: "i want it to
   show up in the homework tab too."

   It cannot reuse hwRow(): that row is built on a course and a lesson number — `dom(x.c)` for
   its colour, `hwWho(c, n, title)` for its name, and a `data-hw-turnin="<course>:<lesson>"`
   button. An outside lesson has none of those. It has no TURN-IN at all, which is the real
   difference and not an oversight: spec-173's `assignments` are keyed per course-and-lesson,
   and there is no teacher-facing hand-in here — you tick the items and that is the whole
   record. So the third column reports what is left instead of offering a button that would
   have nothing to write. Same `.qz` three-column shape either way, so a reader who has learned
   the course rows has learned these. */
const extHwPlan = () => datedExtHomework().map(x => ({...x, allDone: x.done >= x.total}));
function extHwRow(x) {
  const day = x.due, today = dayOf(TODAY);
  const late = !x.allDone && day < today;
  const when = x.allDone ? 'all ticked'
    : late ? `${today - day}d late`
    : day === today ? 'due today'
    : day === today + 1 ? 'due tomorrow'
    : `due ${esc(shortDate(dayIso(day)))}`;
  const left = x.total - x.done;
  return `<div class="qz" data-hwst="${x.allDone ? 'in' : 'open'}" data-domain="teacher">
    <button class="qz-t" data-hw-open="ext:${esc(x.l.id)}"
      title="Open the homework page — ${esc(x.l.instrument || 'lesson')} lesson of ${esc(x.l.date)}${
        x.l.teacher ? `, ${esc(x.l.teacher)}` : ''}"><span class="st"></span>
      <span class="hw-c">${esc(capWord(x.l.instrument))} lesson</span>
      <span class="hw-n">${esc(shortDate(x.l.date))}</span>
      <span class="hw-t">${esc(x.l.teacher || 'with your teacher')}</span>${
      left ? `<span class="hw-left">${left} left</span>` : ''}</button>
    <span class="qz-d"${late || day === today ? ' data-d="today"' : ''}>${when}</span>
    ${x.allDone
      ? `<button class="qz-b qz-r" data-pass="y" data-hw-open="ext:${esc(x.l.id)}"
          title="Every item ticked — open the page">Done</button>`
      : `<button class="qz-b btn btn-quiet" data-hw-open="ext:${esc(x.l.id)}"
          title="Open the page and tick the items — an outside lesson has no hand-in">${
          x.done}/${x.total}</button>`}</div>`;
}

function homeworkLanding() {
  const due = hwDueList(), soon = hwSoonList(), done = hwTurnedInList();
  const behind = hwLeftBehind();
  /* Interleaved into the SAME three sections rather than given a fourth, because the sections
     answer "what is owed / what is coming / what is finished" and an outside lesson's homework
     is all three of those things in turn. The row carries the instrument colour and names no
     course, so it never reads as coursework. */
  const xToday = dayOf(TODAY), xPlan = extHwPlan();
  const xDue  = xPlan.filter(x => !x.allDone && x.due <= xToday);
  const xSoon = xPlan.filter(x => !x.allDone && x.due >  xToday);
  const xDone = xPlan.filter(x => x.allDone);
  /* Takes RENDERED rows rather than plan objects now, because a section can hold two shapes of
     row (hwRow and extHwRow) and the caller is the only thing that knows which is which. */
  const sec = (label, rows, cnt, empty) => `<div>
    <div class="dhead"><p class="eyebrow">${label}</p><span class="rule"></span>
      <span class="cnt">${cnt}</span></div>
    ${rows.length ? `<div class="quizlist wide">${rows.join('')}</div>`
      : `<p class="calnote" style="margin:0">${empty}</p>`}</div>`;
  return `<div class="view">
    <div class="spread"><div><p class="eyebrow">What is set</p><h2 class="vh">Homework</h2></div>
      <div class="row"><button class="btn btn-quiet" data-nav="drill">Quizzes →</button>
        <button class="btn btn-quiet" data-nav="ext">Outside lessons →</button></div></div>
    ${/* PATCH-118 — Nate: "remove all the unneeded text in the homework tab. too busy right now."
          Two paragraphs went: a lede explaining where due dates come from, and a note drawing the
          turn-in / lesson-complete distinction. Both were true and both were written for a first
          reading; neither survives the hundredth, and this is a tab you open to see what is owed.
          The distinction is still made where it can actually be acted on — on each lesson's own
          homework page, beside the turn-in control (hwPage's own copy), which is the version that
          was always doing the work. Nothing was deleted from that page. */''}
    ${/* A teacher's homework leads the owed list: it is the one deadline in this school that
          cannot be re-planned, because the deadline is a person. */''}
    ${sec('Due now', [...xDue.map(extHwRow), ...due.map(hwRow)], `${due.length + xDue.length} owed`,
      (hwPlan().length || xPlan.length) ? 'Nothing owed today — everything due so far is in.'
        : lite('Nothing scheduled. Start a course and its lessons turn up here with the day each is due by.', 'Nothing scheduled.'))}
    ${/* Listed, never hidden — the same argument PATCH-058 made for locked quizzes. Work that
          quietly has no surface is work that reads as lost. */
      behind.length ? `<div>
      <div class="dhead"><p class="eyebrow">Still outstanding</p><span class="rule"></span>
        <span class="cnt">${behind.length} lesson${behind.length === 1 ? '' : 's'} moved on without it</span></div>
      <div class="quizlist wide">${behind.map(hwRow).join('')}</div>

      ${lite(`<p class="calnote" style="margin:8px 0 0">The <b>lesson</b> was completed and its
        <b>homework</b> never was — they are separate acts, and where the lesson sets a test it
        is the hand-in that opens it. Hand these in whenever; nothing is re-scheduled by it.</p>`, '')}</div>` : ''}
    ${sec('Coming up', [...xSoon.map(extHwRow), ...soon.slice(0, 12).map(hwRow)],
      `${soon.length + xSoon.length} scheduled${soon.length > 12 ? ' · next 12' : ''}`,
      'Nothing further out on the plan.')}
    ${/* An outside lesson's homework is never "handed in" — there is nothing to hand it to —
          so a fully-ticked one sits here saying so rather than borrowing the turn-in verb. */''}
    ${sec('Turned in', [...xDone.map(extHwRow), ...done.slice(0, 24).map(hwRow)],
      `${done.length + xDone.length} handed in${done.length > 24 ? ' · last 24' : ''}`,
      'Nothing turned in yet.')}
  </div>`;
}

/* The practice log. spec-160 built this store and never gave it a page — `drills` is keyed by
   drill basename, holds `{status, tempo_current}`, and the plugin's Technique track reads
   `tempo_current` today. build.py emits the join per lesson (`drill` + `tempo_target`, derived
   from the course note's index table, never from a regex over a prose title), so the page does
   not have to guess which exercise a lesson is. Nothing here is a second tempo store. */
function practiceLog(u) {
  if (!u.drill) return '';
  const key = u.drill, d = ds(key), log = drillLog(key);
  const target = +u.tempo_target || 0;
  // PATCH-160 — planned length, for the Time placeholder only. drillPage() passes the drill's
  // own `minutes` (build.py, PATCH-159); homeworkPage() passes a lesson object that never
  // carries one, so this is 0 there — same shape as `target` above.
  const planned = +u.minutes || 0;
  const mark = n => `<span class="bpm">&#9833;=${n}</span>`;
  const rows = log.slice(0, 8).map((e, i) => `<tr>
    <td class="pl-d">${esc(shortDate(e.date || TODAY))}</td>
    <td class="pl-b">${e.tempo ? mark(e.tempo) : '<span class="pl-none">—</span>'}</td>
    <td class="pl-m">${e.mins ? esc(e.mins) + ' min' : '<span class="pl-none">—</span>'}</td>
    <td class="pl-n">${esc(e.note || '')}</td>
    <td>${readonly ? '' : `<button class="pl-x" data-plogdel="${esc(key)}:${i}"
      title="Delete this entry">&times;</button>`}</td></tr>`).join('');
  return `<div class="blk plog">
    <div class="lbl">Practice log<span class="done">${esc(key)}</span>${
      target ? `<span class="done">target ${mark(target)}</span>` : ''}</div>
    <div class="pl-now">
      <span class="pl-cur">${d.tempo_current ? mark(d.tempo_current)
        : '<span class="pl-none">no session logged</span>'}</span>
      <span class="pl-st" data-s="${esc(d.status)}">${esc(d.status)}</span>
      <span class="pl-c">${log.length} session${log.length === 1 ? '' : 's'} logged here</span></div>
    ${target ? '' : `<p class="calnote" style="margin:0 0 9px">The scan prints no metronome mark for
      this exercise, so there is no target to reach — log the tempo you actually played and it stays
      in <code class="cmd">learning</code>. A guessed target would be worse than none.</p>`}
    ${readonly ? `<p class="calnote" style="margin:0 0 9px">Read-only view — a session logged here
      would not be saved back.</p>` : `<div class="pl-form">
      <label>Date<input type="date" id="pl-date" value="${esc(TODAY)}"></label>
      ${/* The placeholder is the exercise's PRINTED mark, or the last tempo logged, or
            nothing. Never a made-up number: the whole reason `tempo_target` is null on Hanon
            36–38 is that the scan prints no mark there, and a plausible-looking 80 sitting in
            the field is exactly the guess build.py refused to make. PATCH-160 — read as a hint,
            never prefilled: `value` stays empty on both inputs, same rule, same reason. */''}
      <label>Tempo (optional)<input type="number" id="pl-tempo" min="20" max="260" step="1"
        placeholder="${target ? `target ${target}` : d.tempo_current ? `last ${d.tempo_current}` : 'bpm'}" value=""></label>
      <label>Time (optional)<input type="number" id="pl-mins" min="1" max="600" step="1"
        placeholder="${planned ? `${planned} min` : 'min'}" value=""></label>
      <label class="pl-wide">Note<input type="text" id="pl-note" maxlength="140"
        placeholder="clean at 68, left hand dragging on the turn"></label>
      <button class="btn btn-go" data-plog="${esc(key)}:${target}">Log a session</button></div>`}
    ${log.length ? `<div class="pl-tw"><table class="pl-t"><thead><tr>
        <th>Date</th><th>Tempo</th><th>Time</th><th>Note</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>${
      log.length > 8 ? `<p class="calnote" style="margin:7px 0 0">${
        log.length - 8} earlier session${log.length - 8 === 1 ? '' : 's'} kept in your progress file.</p>` : ''}`
      : `<p class="calnote" style="margin:0">${lite(`Nothing logged against this exercise yet.
         The tempo you save is <code class="cmd">tempo_current</code> — the same number the dashboard's
         Technique track reads, not a copy of it.`, 'Nothing logged yet.')}</p>`}</div>`;
}

function homeworkPage(cid, nRaw) {
  const c = COURSES[cid], n = +nRaw, u = lessonOf(cid, n);
  if (!c || !u) return homeworkLanding();
  const s = os(cid);
  const blocks = doBlocksOf(u), all = doTasksOf(u);
  const donen = all.filter(t => !!P.homework[t.id]).length;
  const handed = turnedIn(cid, n), at = as(cid, n).turned_in;
  const plan = hwPlan().find(x => x.c.id === cid && x.n === n);
  const g = testGate(c, u);
  /* The sheet music, from the SAME source the lesson reads — BOOKPAGES, keyed by the number
     the homework cites, filtered to pages the bundle actually contains. Not a second copy:
     pagesBlock ships the fold empty and fillOpenBooks() injects the scans after render, so
     being on two routes costs two <div>s, not two sets of megabytes. */
  const bk = BOOKPAGES[c.book];
  const pgs = bk ? (u.pages || []).filter(x => bk.pages[x] !== undefined) : [];
  /* Written to read inside the sentence below, not as a label on its own — "lesson 3 is
     currently <this>" has to be a sentence in all four cases. */
  const lessonState = s.lessons_complete >= n ? 'completed'
    : (s.status === 'enrolled' && s.lessons_complete + 1 === n) ? 'open, and not completed yet'
    : s.status !== 'enrolled' ? 'not started — the course is not running'
    : `not open yet — lesson ${s.lessons_complete + 1} is next`;
  return `<div class="view hwpage" data-domain="${dom(c)}">
    <div class="row" style="gap:8px">
      <button class="btn btn-quiet" data-nav="homework">← Homework</button>
      <button class="btn btn-quiet" data-course="${esc(cid)}">Course ${esc(cid)} · ${esc(c.short)}</button>
      ${pill(c)}${handed ? '<span class="pill pill-ok">Turned in</span>'
                         : '<span class="pill pill-due">Open</span>'}
      ${plan ? `<span class="pill">due ${esc(shortDate(dayIso(plan.due)))}</span>` : ''}</div>
    <div><p class="eyebrow path">Lesson ${n} homework</p><h2 class="vh">${esc(u.title)}</h2></div>

    <div class="card hw-turn">
      <div class="spread">
        <div><div class="hw-tally" data-total="${all.length}">${donen}/${all.length} items ticked</div>
          <div class="hw-sub">${handed
            ? `Handed in ${esc(shortDate(at || TODAY))}. Ticking items still works — the hand-in is a
               separate thing from the checklist.`
            : `Tick what you did, then hand the lesson's homework in. You can hand it in with items
               still open; the ticks are yours, the hand-in is the school's.`}</div></div>
        <div class="row" style="gap:8px">
          ${handed
            ? `<button class="btn btn-quiet" data-hw-undo="${esc(cid)}:${n}"${
                readonly ? ' disabled' : ''}>Undo turn-in</button>`
            : `<button class="btn btn-go" data-hw-turnin="${esc(cid)}:${n}"${
                readonly ? ' disabled' : ''}>Turn in</button>`}</div></div>
      ${/* The one sentence this whole page exists to keep true. */''}
      <p class="hw-not"><b>This is not the lesson.</b> Completing the <b>lesson</b> is what assigns
        lesson ${n + 1 <= c.lessons.length ? n + 1 : '—'}'s quizzes, and it is done on the course page —
        lesson ${n} is currently <b>${esc(lessonState)}</b>. Turning the <b>homework</b> in is this
        button${g ? ', and it is one of the two things that open the lesson test' : ''}.</p>
    </div>

    ${blocks.map(b => taskBlock(b, b.tasks)).join('')}
    ${/* Log before scan, deliberately. Everything above this line is a CONTROL and everything
          below it is material: Course 24's lesson 4 cites six pages and a Leavitt lesson
          twenty, so a practice log placed underneath them is a control you have to scroll
          past a book to reach — every day, since logging a session is the daily act. The
          scan is the last thing on the page because it is the thing you sit and read. */''}
    ${practiceLog(u)}
    ${/* spec-177 — below the log and above the scan, which is where the page's own ordering
          rule puts it: everything above practiceLog is a CONTROL, everything below is MATERIAL,
          and an outside drill is material. Deduped across the lesson's concepts, so a lesson
          releasing four concepts that all point at musictheory.net lists it once. */
      toolStrip(toolsForConcepts(lessonConcepts(cid, n)), 'Practice this lesson at')}
    ${pgs.length ? pagesBlock(c, u, bk, pgs, '') : ''}

    ${g ? `<div class="card hw-next">
      <div class="eyebrow">After this</div>
      <p style="margin:0">The lesson test is not homework and is not on this page. It opens on the
        lesson once this homework is turned in <b>and</b> every one of lesson ${n}'s quizzes has been
        taken.</p>
      ${/* The reasons get their own lines rather than being run into the sentence above.
            Three of them joined by spaces produced a paragraph with three dashes in it and no
            way to tell where one reason ended and the next began. */''}
      ${g.locked ? `<ul class="hw-why">${g.why.map(w => `<li>${esc(w)}</li>`).join('')}</ul>`
        : `<p class="hw-ok">Both are done — it is open on the lesson now.</p>`}
      <div class="row" style="gap:8px;margin-top:10px">
        <button class="btn btn-quiet" data-course-lesson="${esc(cid)}:${n}">Open lesson ${n} →</button></div></div>` : ''}
  </div>`;
}

/* ---------------------------------------------------------------- PATCH-102: patch notes
   The page talking back. Nate writes a note here while studying — "week rows still too light"
   — `/school sync` carries it into progress-<user>.json, and sync.py prints it out with an
   instruction to file it. The vault half shipped first and was round-tripped; this is the
   surface that feeds it, written against that frozen contract (see the log helpers above).

   UNFILED IS THE PAGE'S JOB. Those are shown first, in full, at reading size, because they
   are the ones still owed an answer. Filed notes are the vault saying "handled" — they are
   folded away behind a count, kept rather than dropped so the page can still show what has
   already been said, and they carry no Remove control because removing one here would not
   remove anything anywhere (the union keeps the vault's copy). */
function notesView() {
  const un = notesUnfiled(), done = notesFiled();
  const openDone = secOpen('notes-filed', false);
  const stamp = at => {
    const [d, t] = String(at).split('T');
    return `${esc(shortDate(d))}${t ? ` · ${esc(t)}` : ''}`;
  };
  const row = (nt, filed) => `<li class="pn${filed ? ' filed' : ''}">
    <div class="pn-at">${stamp(nt.at)}${filed ? '<span class="pn-f">Filed</span>' : ''}</div>
    <div class="pn-t">${esc(nt.text).replace(/\n/g, '<br>')}</div>
    ${filed || readonly ? '' : `<button class="btn btn-quiet pn-x" data-note-del="${
      esc(nt.at)}">${confirmAct === 'note:' + nt.at ? 'Remove?' : 'Remove'}</button>`}</li>`;
  return `<div class="view">
    <div><h2 class="vh">Patch notes</h2>
      <p class="lede" style="margin-top:8px">Anything you want changed about this page, said here.
      <code class="cmd">/school sync</code> carries these home with your progress and a later session
      picks them up — you do not have to be at the desk to file one.</p></div>
    ${readonly ? `<div class="card" style="color:var(--muted);font-size:14px">
      <b style="color:var(--ink)">Read-only view.</b> Notes are written into this page's own state,
      so they can only be added from the copy that saves.</div>`
      : `<div class="card extform pnform">
      <label class="ef-l">New note
        <textarea id="pn-text" rows="3"
          placeholder="week rows still too light"></textarea></label>
      <div class="row" style="gap:8px">
        <button class="btn btn-go" data-note-add="1">Add note</button></div>
      ${/* Why there is no edit control: the stamp IS the identity sync merges on, so editing
            one after a sync would make the vault's copy and the page's two different notes. */''}
      <p class="calnote" style="margin:0">Stamped with the minute you write it. That stamp is how
        the vault tells one note from another, so it is never changed here.</p></div>`}
    <div>
      <div class="dhead"><p class="eyebrow">Waiting to be picked up</p><span class="rule"></span>
        <span class="cnt">${un.length} note${un.length === 1 ? '' : 's'}</span></div>
      ${un.length ? `<ul class="pnlist">${un.map(nt => row(nt, false)).join('')}</ul>`
        : `<p class="calnote" style="margin:0">Nothing waiting. Write one above and it goes home on
           the next sync.</p>`}</div>
    ${done.length ? `<div>
      <div class="dhead"><button class="dfold${openDone ? '' : ' shut'}"
          data-sec-toggle="notes-filed" aria-expanded="${openDone}"><span class="car"></span>Filed</button>
        <span class="rule"></span>
        <span class="cnt">${done.length} acted on</span></div>
      ${openDone ? `<ul class="pnlist">${done.map(nt => row(nt, true)).join('')}</ul>
        <p class="calnote" style="margin:8px 0 0">Marked filed in the vault after someone acted on
          them. This page only ever reads that mark.</p>` : ''}</div>` : ''}
  </div>`;
}

/* ---------------------------------------------------------------- PATCH-115: the Sync page
   Nate: "theres alot of info on sync to vault. can we simplify and just say to do the school sync
   function? and then instead of all the extra info just include an activty log that includes all
   school activity and sync history."

   What was here was a manual: two JSON previews, the clipboard route, the systemd importer, what
   the page does not own, how to rebuild. All true, none of it what you open this page to find out.
   The instruction is one line now, and the space goes to the thing the school never had — a record
   of what has actually happened in it.

   The log is DERIVED, not stored. Every line below is read off state the school already keeps for
   its own reasons — a turn-in date, a quiz's `last_practiced`, a test attempt, a course's
   `started` — so nothing new is written to produce it and it can never disagree with the state it
   describes. `sync_log` is the one exception and it comes from the vault (sync.py writes it, the
   page only displays it), which is why syncs appear here a rebuild later than they happen.

   `Copy everything` survives the simplification on purpose: `/school sync` in Claude Code fetches
   this page directly, but the headless path cannot — it gets the unauthenticated shell — so the
   clipboard is what feeds ~/Downloads/school-<user>.json and the systemd importer. Cutting the
   button would quietly break that route. It is one control with one line of explanation now
   rather than three cards. */
const ACT_KIND = {quiz:'Quiz', test:'Test', lesson:'Lesson', course:'Course',
                  retake:'Retake', sync:'Sync', note:'Note', reset:'Reset'};
function schoolActivity() {
  const out = [];
  const add = (at, kind, text) => { if (at) out.push({at: String(at), kind, text}); };
  Object.entries(P.assignments || {}).forEach(([k, v]) => {
    const [cid, n] = k.split(':'); const c = COURSES[cid];
    if (v.turned_in) add(v.turned_in, 'lesson', `Turned in ${c ? c.short : 'course ' + cid} · lesson ${n}`);
  });
  Object.entries(P.concepts || {}).forEach(([k, v]) => {
    const c = CONCEPTS[k];
    if (v.last_practiced) add(v.last_practiced, 'quiz', `${c ? c.short : k}${
      v.sr_last_rating ? ` — ${rLabel(v.sr_last_rating)}` : ''}${
      v.status === 'retired' ? ' · retired' : ''}`);
  });
  Object.entries(P.tests || {}).forEach(([k, v]) => (v.attempts || []).forEach(a =>
    add(a.date, 'test', `${k} — ${a.result === 'passed' ? 'passed' : 'failed'} ${a.score_pct}%`)));
  Object.entries(P.courses || {}).forEach(([k, v]) => {
    const c = COURSES[k];
    if (v.started)   add(v.started,   'course', `Started ${c ? c.short : 'course ' + k}`);
    if (v.completed) add(v.completed, 'course', `Completed ${c ? c.short : 'course ' + k}`);
  });
  Object.entries(P.misses || {}).forEach(([k, v]) => {
    if (v.last_sat) add(v.last_sat, 'retake', `${v.test} · Q${v.n}${
      v.last_rating ? ` — ${rLabel(v.last_rating)}` : ''}`);
  });
  (P.notes || []).forEach(n => add(n.at, 'note', n.text));
  /* PATCH-121 — an un-enroll is the most destructive thing on the page and was the only one that
     left no trace anywhere. A live backup reads as what it is: something that happened, and can
     still be taken back. */
  undoAll().forEach(u => add(u.at, 'reset', `Un-enrolled ${u.class_short} — ${
    undoSize(u)} entries reset, backup recallable`));
  (P.sync_log || []).forEach(l => add(l.at, 'sync', `Synced to the vault — ${l.concepts} quizzes, ${
    l.tests} test${l.tests === 1 ? '' : 's'}, ${l.misses} retake${l.misses === 1 ? '' : 's'}, ${
    l.homework} homework tick${l.homework === 1 ? '' : 's'}${l.notes_new ? `, ${l.notes_new} new note` : ''}`));
  // Newest first, and a bare date sorts against a timestamp's date half correctly because both
  // start yyyy-mm-dd — no parsing, no timezone, no Date object that could disagree with TODAY.
  return out.sort((a, b) => b.at.localeCompare(a.at));
}
function syncView() {
  const acts = schoolActivity();
  const byDay = [];
  acts.forEach(a => {
    const d = a.at.slice(0, 10);
    if (!byDay.length || byDay[byDay.length - 1].day !== d) byDay.push({day: d, rows: []});
    byDay[byDay.length - 1].rows.push(a);
  });
  return `<div class="view">
    ${LOCAL ? localSyncTop() : `<div class="spread"><div><p class="eyebrow">Hand-off</p><h2 class="vh">Activity &amp; Sync</h2>
      <p class="lede" style="margin-top:8px">This page is the study surface; the vault stays the
      system of record. Run <code class="cmd">/school sync</code> in Claude Code — it reads this
      page directly and writes your progress home.</p></div></div>
    <div class="card"><div class="spread">
      <div style="font-size:12.5px;color:var(--muted)">Away from Claude Code? <b>Copy everything</b>
        puts the page's whole state on the clipboard — paste it into
        <code class="cmd">~/Downloads/school-${esc(C.user)}.json</code> and the vault imports it
        within a second.</div>
      <button class="btn" data-copy="state">Copy everything</button></div></div>`}
    ${undoAll().length ? `<div>
      <div class="dhead"><p class="eyebrow">Backups</p><span class="rule"></span>
        <span class="cnt">${undoAll().length} un-enroll${undoAll().length === 1 ? '' : 's'} kept</span></div>
      <div class="quizlist wide">${undoAll().map(undoRow).join('')}</div>
      <p class="calnote" style="margin:8px 0 0">Un-enrolling a class resets its courses. Each reset
        is kept here and on the class's own page; recalling one puts it back and consumes it.</p></div>` : ''}
    <div>
      <div class="dhead"><p class="eyebrow">Activity log</p><span class="rule"></span>
        <span class="cnt">${acts.length} event${acts.length === 1 ? '' : 's'}</span></div>
      ${byDay.length ? `<div class="alog">${byDay.map(g => `<div class="alog-d">
        <div class="alog-day">${esc(shortDate(g.day))}</div>
        <div class="alog-rows">${g.rows.map(r => `<div class="alog-r" data-k="${esc(r.kind)}">
          <span class="alog-k">${esc(ACT_KIND[r.kind] || r.kind)}</span>
          <span class="alog-t">${esc(r.text)}</span>
          ${r.at.length > 10 ? `<span class="alog-at">${esc(r.at.slice(11, 16))}</span>` : ''}
        </div>`).join('')}</div></div>`).join('')}</div>`
        : `<p class="calnote" style="margin:0">Nothing yet.${lite(` Turn a lesson in, take a pop quiz or sit
           a test and it lands here.`, '')}</p>`}
    </div></div>`;
}

/* ---------------------------------------------------------------- spec-174: Drills Library
   Surfaces four already-built piles onto one page: technique drills (tempo-tracked, grouped by
   instrument), practice routines (the concept-carrying half of Practice Method/), watch-only
   videos (a click-to-play façade, see below) and practice methodology (read-only — no tempo
   control, no Start button, a category error either would be).

   NOTHING here reinvents state. Technique drills reuse `practiceLog()` — the exact function the
   Hanon homework page already logs sessions through (spec-173), keyed by note basename in
   `P.drills`, spec-160 shape. Every body of text reuses `readFold()` over an id build.py parked
   in C.reading by calling reading_for() itself (the same pool a lesson's **Read** line fills) —
   there is no second markdown path anywhere on this page.

   DRILLS ARE NOT SPACED REPETITION. Nothing below reads or writes sr_interval, sr_ease, sr_due
   or a rating — tempo is the only axis a drill progresses on. */
/* PATCH-119 — a technique drill's own page. Nothing here is new: it is the card's old contents,
   moved off the library and given room. The log form is the same practiceLog() the lesson's
   homework page uses, so a session logged here and one logged there are the same write. */
/* ---------------------------------------------------------------- spec-176: the song library
   Nate: "start with just creating a visual page that has song titles with their photos where the
   user can click into the song to see details."

   A SHELF, exactly like the Drills library and for the same reasons: nothing on it is assigned,
   due or scored, nothing writes to P, and none of it is gated on `readonly` because there is no
   progress to fail to save. The practice/learning wiring is a later spec and its absence here is
   deliberate — a tile that showed a due date nothing computes would be a lie the page told itself.

   THE DETAIL PAGE IS NOT WRITTEN HERE. A tile links to `source:<id>`, which is PATCH-144's note
   page, because build.py parked every song note through the same `_source()` a **Read** line uses
   — so the song's body arrives already rendered, already sectioned, already carrying its contents
   strip, and a `[[🎵 ARTIST - Title]]` written anywhere else in the school lands on the same page.
   All this file adds is the header that makes it read as a song rather than as a note: the sleeve,
   and the facts that live in frontmatter and therefore never reached the body. See songHead(). */
const SONG_SORT = (a, b) =>
  (a.artist || '￿').localeCompare(b.artist || '￿') || a.title.localeCompare(b.title);

/* The fallback when a song has no sleeve — 14 of them, and it is a finished state rather than a
   gap to apologise for. Initials off the artist, on a plate whose hue is derived from the name, so
   the shelf still reads as a shelf: every tile the same size, no holes, no broken-image icon. */
const songInitials = s => {
  const w = (s.artist || s.title).split(/\s+/).filter(x => /[a-z0-9]/i.test(x));
  if (!w.length) return '?';
  // Two letters either way: one initial on its own ("Brockhampton" -> "B") reads as a typo on a
  // plate that size, and every other tile on the row is showing a whole sleeve.
  return (w.length === 1 ? w[0].slice(0, 2) : w[0][0] + w[1][0]).toUpperCase();
};
const songHue = s => {
  let h = 0; const k = (s.artist || s.title);
  for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) % 360;
  return h;
};
/* `key:` is a key on most notes and a PARAGRAPH on a few — "E minor (main riff/verse), modulating
   up before the final chorus (source video says…)" is what Livin' on a Prayer carries, and it
   covered the entire sleeve when the badge printed it whole. The badge takes the first clause and
   only if it is short enough to be a key; anything longer has no badge, and the full sentence is
   on the detail page where there is room to read it. Trimming the note is not an option — the
   qualification is the point of writing it that way. */
const songKey = s => {
  const head = (s.key || '').split(/[(,;]/)[0].split(' — ')[0].trim();
  return head.length <= 16 ? head : '';
};

/* spec-176b — the key filter groups by TONIC, not by the key string, and that is the whole design.
   The 119 notes spell the same key six ways — "B♭", "Bb major", "B♭ major", "B flat major" — so a
   menu built from the raw values offers four entries for one key and splits its five songs across
   them. Normalising to the tonic collapses all of that, folds the enharmonics (A♯ and B♭ are one
   option), and keeps "D Dorian" and a bare "F" in the menu instead of stranding them.

   It deliberately does NOT infer major/minor. A bare "B♭" conventionally means major, but inventing
   that on someone else's notes is exactly the kind of quiet assumption this codebase keeps catching;
   the full key stays visible on the tile badge and the detail strip, where the note speaks for
   itself. "Everything in A" is the question a shelf gets asked anyway. */
const TONICS = ['A', 'B♭', 'B', 'C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭'];
const ENHARM = {'A#': 'B♭', 'BB': 'B♭', 'DB': 'C♯', 'C#': 'C♯', 'D#': 'E♭', 'EB': 'E♭',
                'GB': 'F♯', 'F#': 'F♯', 'AB': 'A♭', 'G#': 'A♭'};
const songTonic = s => {
  const m = /^\s*([A-Ga-g])\s*(?:([#♯b♭])|\s+(flat|sharp)\b)?/.exec(s.key || '');
  if (!m) return '';
  const acc = m[2] ? m[2] : m[3] ? (m[3].toLowerCase() === 'flat' ? 'b' : '#') : '';
  const raw = m[1].toUpperCase() + acc.replace('♯', '#').replace('♭', 'b').toUpperCase();
  return ENHARM[raw] || (TONICS.includes(m[1].toUpperCase()) && !acc ? m[1].toUpperCase() : '');
};

/* `bpm:` is a number on most notes, a range on 26 ("120-140"), and prose on three ("73 (sheet
   music \"slowly\" marking…)"). The first plausible integer is the tempo in every one of those
   shapes; the 30-300 guard is what stops a mistyped `bpm: year: 1954` from filtering as a tempo. */
const songBpm = s => {
  for (const n of String(s.bpm || '').match(/\d+/g) || []) {
    const v = +n;
    if (v >= 30 && v <= 300) return v;
  }
  return 0;
};
const BPM_BANDS = [['u80', 'Under 80', 0, 79], ['80', '80–100', 80, 99], ['100', '100–120', 100, 119],
                   ['120', '120–140', 120, 139], ['140', '140 and up', 140, 999]];

function songArt(s, cls) {
  const b64 = COVERS[s.cover];
  if (b64) return `<span class="${cls} has-art"><img src="data:image/webp;base64,${b64}" alt="" loading="lazy"></span>`;
  // The app carries no album art. If the reader has added their own copy of this song's sleeve
  // it is drawn from their device (fillLocal sets the src); otherwise the lettered tile stands.
  const mine = LOCAL ? coverKey(s) : '';
  if (mine) return `<span class="${cls} has-art"><img data-fthumb="${esc(mine)}" alt="" loading="lazy"></span>`;
  if (LOCAL && cloudHas(s.cover_file)) ensureFile(s.cover_file);            // arrives, then redraws
  // Otherwise the sleeve is looked up by album (see "album covers, looked up" below). The tile
  // carries what it needs to turn into the picture when the answer comes, and back into letters
  // if the picture will not load.
  const ck = LOCAL && !cloudHas(s.cover_file) ? coverAlbumKey(s) : '';
  const tag = `${ck ? ` data-cover-k="${esc(ck)}"` : ''} data-init="${esc(songInitials(s))}" style="--h:${songHue(s)}"`;
  const u = ck ? fetchedCover(ck, s) : '';
  return u
    ? `<span class="${cls} has-art"${tag}><img src="${esc(u)}" data-cover-u="1" alt="" loading="lazy" referrerpolicy="no-referrer"></span>`
    : `<span class="${cls} no-art"${tag}><span>${esc(songInitials(s))}</span></span>`;
}

/* ------------------------------------------------------------------ album covers, looked up
   The app ships no album art. A song whose reader has not added a sleeve of their own gets one
   looked up by artist and album, in the reader's browser, from open catalogues:

     1. MusicBrainz finds the album, and the Cover Art Archive (the Internet Archive's cover
        collection for MusicBrainz) serves its front cover;
     2. if that has none, the iTunes Search API's artwork for the album.

   Only the picture's ADDRESS is remembered (localStorage `school:covers`, per album, so sixty
   Beatles songs cost a handful of lookups); the picture itself is shown from where it lives and
   kept for offline use by the service worker. Nothing is copied into this repo or the account.
   Lookups run one at a time, a second apart (MusicBrainz asks for that), and a miss is retried
   after a month. A sleeve the reader adds themselves always wins. */
const COVER_STORE = 'school:covers', COVER_RETRY = 30 * 864e5, COVER_GAP = 1100;
let coverMap = null, coverBusy = false, coverStop = 0;
const coverQ = [], coverSeen = new Set();
const cnormw = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
/** "Saturday Night Fever (Original Movie Soundtrack)" is searched as "Saturday Night Fever". */
const albumCore = a => String(a || '').replace(/\s*[\(\[][^\)\]]*[\)\]]/g, ' ').replace(/\s+/g, ' ').trim() || String(a || '');
function coverAlbumKey(s) {
  if (!s || !s.album || !s.artist) return '';
  return cnormw(s.artist).join(' ') + '|' + cnormw(albumCore(s.album)).join(' ');
}
function coverLoad() {
  if (!coverMap) { try { coverMap = JSON.parse(localStorage.getItem(COVER_STORE)) || {}; } catch (e) { coverMap = {}; } }
  return coverMap;
}
function fetchedCover(k, s) {
  const e = coverLoad()[k];
  if (e && e.u) return e.u;
  if ((!e || Date.now() - (e.x || 0) > COVER_RETRY) && !coverSeen.has(k)) {
    coverSeen.add(k);
    coverQ.push([k, s.artist, albumCore(s.album)]);
    setTimeout(coverRun, 0);
  }
  return '';
}
const overlap = (want, got) => { const g = new Set(got); return want.length ? want.filter(w => g.has(w)).length / want.length : 0; };
function imgOK(url) {
  return new Promise(res => {
    const i = new Image();
    const t = setTimeout(() => res(false), 12000);
    i.referrerPolicy = 'no-referrer';
    i.onload = () => { clearTimeout(t); res(i.naturalWidth > 1); };
    i.onerror = () => { clearTimeout(t); res(false); };
    i.src = url;
  });
}
async function jget(url) {
  const ac = new AbortController(), t = setTimeout(() => ac.abort(), 10000);
  try {
    const r = await fetch(url, {signal: ac.signal, headers: {Accept: 'application/json'}});
    if (!r.ok) throw new Error('http ' + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}
/** The iTunes Search API answers a script tag (its `callback` parameter), which needs no CORS. */
function jsonp(url) {
  return new Promise((res, rej) => {
    const fn = '__mscov' + Math.random().toString(36).slice(2), el = document.createElement('script');
    const done = (f, v) => { clearTimeout(t); try { delete window[fn]; } catch (e) {} el.remove(); f(v); };
    const t = setTimeout(() => done(rej, new Error('timeout')), 10000);
    window[fn] = v => done(res, v);
    el.onerror = () => done(rej, new Error('network'));
    el.src = url + '&callback=' + fn;
    document.head.appendChild(el);
  });
}
/** A cover address for one album: a URL, '' when no catalogue has one, null when neither could be reached. */
async function coverFind(artist, album) {
  const wa = cnormw(artist), wb = cnormw(album);
  let reached = false;
  /* A jazz standard's note names the COMPOSER as its artist (Jobim) and the record it is learned
     from as its album ("Getz/Gilberto", credited to Stan Getz and João Gilberto), so the artist
     will not match. A title of two or more words that matches exactly, and is not one of the
     names every act has used, is taken on its title alone. */
  const same = t => overlap(wb, cnormw(t)) === 1 && overlap(cnormw(t), wb) === 1;
  const loose = new Set(wb).size >= 2 && !/^(the )?(greatest hits|best of|the best|live|unplugged|anthology|collection|the collection|essential|the essential|gold|volume \d+|vol \d+|\d+ \d+)( .*)?$/.test(wb.join(' '));
  const art = async groups => {
    for (const g of groups.slice(0, 3)) {
      const u = `https://coverartarchive.org/release-group/${g.id}/front-500`;
      if (await imgOK(u)) return u;
    }
    return '';
  };
  const mb = q => jget('https://musicbrainz.org/ws/2/release-group?fmt=json&limit=8&query=' + encodeURIComponent(q))
    .then(r => r['release-groups'] || []);
  try {
    const got = await mb(`releasegroup:(${wb.join(' ')}) AND artist:(${wa.join(' ')})`);
    reached = true;
    const hits = got.filter(g => overlap(wb, cnormw(g.title)) >= 0.75
      && overlap(cnormw(g.title), wb) >= 0.5
      && (g['artist-credit'] || []).some(c => overlap(wa, cnormw((c.artist && c.artist.name) || c.name)) >= 0.5
                                           || overlap(cnormw((c.artist && c.artist.name) || c.name), wa) >= 0.75));
    let u = await art(hits);
    if (u) return u;
    if (!hits.length && loose) {
      await new Promise(r => setTimeout(r, COVER_GAP));
      u = await art((await mb(`releasegroup:"${wb.join(' ')}"`)).filter(g => same(g.title)));
      if (u) return u;
    }
  } catch (e) {}
  try {
    const r = await jsonp('https://itunes.apple.com/search?media=music&entity=album&limit=8&term='
      + encodeURIComponent(artist + ' ' + album));
    reached = true;
    for (const a of (r && r.results) || []) {
      const byArtist = overlap(wb, cnormw(albumCore(a.collectionName))) >= 0.75 && overlap(wa, cnormw(a.artistName)) >= 0.5;
      if (!byArtist && !(loose && same(albumCore(a.collectionName)))) continue;
      const u = String(a.artworkUrl100 || '').replace(/\/\d+x\d+bb\./, '/600x600bb.');
      if (u && await imgOK(u)) return u;
    }
  } catch (e) {}
  return reached ? '' : null;
}
async function coverRun() {
  if (coverBusy || !coverQ.length || Date.now() < coverStop) return;
  if (navigator.onLine === false) return;
  coverBusy = true;
  try {
    while (coverQ.length) {
      const [k, artist, album] = coverQ[0];
      const u = await coverFind(artist, album);
      if (u === null) {                         // offline, or both catalogues unreachable: try later
        coverStop = Date.now() + 5 * 60e3;
        coverQ.forEach(q => coverSeen.delete(q[0])); coverQ.length = 0;
        break;
      }
      coverQ.shift();
      coverLoad()[k] = u ? {u} : {x: Date.now()};
      try { localStorage.setItem(COVER_STORE, JSON.stringify(coverMap)); } catch (e) {}
      if (u) coverPaint(k, u);
      if (coverQ.length) await new Promise(r => setTimeout(r, COVER_GAP));
    }
  } finally { coverBusy = false; }
}
/** Turn every lettered tile of this album on the page into its sleeve, without a redraw. */
function coverPaint(k, u) {
  document.querySelectorAll('.no-art[data-cover-k]').forEach(el => {
    if (el.dataset.coverK !== k) return;
    el.classList.remove('no-art'); el.classList.add('has-art');
    el.innerHTML = `<img src="${esc(u)}" data-cover-u="1" alt="" loading="lazy" referrerpolicy="no-referrer">`;
  });
}
if (LOCAL) {
  // A looked-up sleeve that will not load (offline before it was ever seen, or the address died)
  // goes back to the lettered tile rather than showing a broken picture.
  document.addEventListener('error', e => {
    const img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.dataset.coverU) return;
    const el = img.parentElement;
    if (!el) return;
    el.classList.remove('has-art'); el.classList.add('no-art');
    el.innerHTML = `<span>${esc(el.dataset.init || '')}</span>`;
  }, true);
  // The Originals shelf lists Barline's charts: redraw when Barline changes them in another tab,
  // or when the reader comes back from Barline with the Back button.
  window.addEventListener('storage', e => {
    if ((e.key === 'barline:charts:v1' || e.key === 'barline:folders:v1') && route === 'originals') render();
  });
  window.addEventListener('pageshow', e => { if (e.persisted && route === 'originals') render(); });
  window.addEventListener('online', () => { coverStop = 0; if (route === 'songs' || route.startsWith('song:')) render(); });
}

function songsView() {
  const all = Object.values(SONGS).sort(SONG_SORT);
  const q = filters.sq.trim().toLowerCase();
  /* One search box over four fields, not four boxes. "satie", "abbey road", "b♭" and "donna lee"
     are all things you would type to find a song and none of them is reliably the title. */
  const hit = s => !q || [s.title, s.artist, s.album, s.key].some(v => (v || '').toLowerCase().includes(q));
  const band = BPM_BANDS.find(b => b[0] === filters.bpm);
  /* `v &&` is not redundant: songBpm returns 0 for the eight notes with no tempo written, and 0
     falls inside "Under 80" — so an unmarked song would file itself under a tempo nobody gave it.
     No tempo means no band, which is why the counts below sum to 111 rather than 119. */
  const inBand = s => { if (!band) return true; const v = songBpm(s); return !!v && v >= band[2] && v <= band[3]; };
  const bandCount = b => all.filter(s => { const v = songBpm(s); return !!v && v >= b[2] && v <= b[3]; }).length;
  const list = all.filter(s => (!filters.genre || s.genre === filters.genre)
    && (!filters.key || songTonic(s) === filters.key) && inBand(s) && hit(s));
  /* Genres are hand-typed on 119 notes, so the list is what is actually IN them (26 values,
     "acid jazz / funk" among them) rather than a curated set the data does not match. Sorted by
     population: the one-offs sink and the shelf's real shape shows at the top of the menu. */
  const genres = [...new Set(all.map(s => s.genre).filter(Boolean))]
    .sort((a, b) => all.filter(s => s.genre === b).length - all.filter(s => s.genre === a).length
                    || a.localeCompare(b));
  const tile = s => { const k = s.collection ? 'set' : songKey(s);
    return `<button class="stile" data-goto="source:${esc(s.id)}"
      title="${esc(s.title)}${s.artist ? ' — ' + esc(s.artist) : ''}">
    ${songArt(s, 'stile-art')}
    ${k ? `<span class="stile-k">${esc(k)}</span>` : ''}
    <span class="stile-t">${esc(s.title)}</span>
    <span class="stile-a">${esc(s.artist || '—')}</span></button>`; };
  return `<div class="view songsview">
    <div><p class="eyebrow">Library</p><h2 class="vh">${LOCAL ? 'Covers' : `${all.length} songs`}</h2>
      <p class="calnote" style="margin:4px 0 14px;max-width:74ch">Every song note in the vault,
      with what is written on it — key, tempo, form, the chords and whatever has been learned about
      playing it. A reference shelf: nothing here is assigned or due. Click a sleeve for the note.</p></div>
    ${/* Every menu is built from what the shelf ACTUALLY holds and carries its own count, so an
          empty result is never a surprise: a tonic nothing is written in, or a tempo band nothing
          falls in, is simply not offered. Same rule the genre menu already followed. */''}
    <div class="filters">
      <select data-f="key"><option value="">Any key</option>${TONICS
        .map(t => [t, all.filter(s => songTonic(s) === t).length])
        .filter(([, n]) => n).map(([t, n]) =>
          `<option value="${esc(t)}"${filters.key === t ? ' selected' : ''}>${esc(t)} (${n})</option>`).join('')}</select>
      <select data-f="bpm"><option value="">Any tempo</option>${BPM_BANDS
        .map(b => [b, bandCount(b)])
        .filter(([, n]) => n).map(([b, n]) =>
          `<option value="${esc(b[0])}"${filters.bpm === b[0] ? ' selected' : ''}>${esc(b[1])} (${n})</option>`).join('')}</select>
      <select data-f="genre"><option value="">Any genre</option>${genres.map(g =>
        `<option value="${esc(g)}"${filters.genre === g ? ' selected' : ''}>${esc(g)}</option>`).join('')}</select>
      <input data-f="sq" placeholder="Search title, artist, album, key" value="${esc(filters.sq)}">
      ${filters.genre || filters.key || filters.bpm || q
        ? `<button class="btn btn-quiet" data-songclear>Clear</button>` : ''}
      <span style="color:var(--muted);font-size:13px">${list.length} shown</span></div>
    ${list.length ? `<div class="stiles">${list.map(tile).join('')}</div>`
      : `<p class="calnote">No song matches that. ${esc(all.length)} in the library.</p>`}</div>`;
}

/* The header that turns PATCH-144's note page into a song page. Everything on it comes from
   frontmatter, which is exactly why it has to be added here: `_teaching_body` renders the note's
   PROSE, and the key, tempo, year and form were never in the prose to render. */
function songHead(s) {
  /* `form:` and `feel:` are a word on most notes and a paragraph on some ("verse (pedal-point
     riff), pre-chorus (Em–C–D–Em), chorus…"). A paragraph set at figure size makes one cell three
     times the height of its row and reads as a headline it is not, so a long value drops to note
     size. The threshold is the length at which a value stops being a label — measured, not
     principled: "driving arena rock" fits a cell, "tension-and-release via pedal point" does not. */
  const stat = (k, v, sub) => !v ? '' :
    `<div class="dstat${String(v).length > 26 ? ' ds-long' : ''}"><span class="ds-k">${k}</span>${
      ''}<span class="ds-v">${esc(v)}</span>${sub ? `<span class="ds-s">${esc(sub)}</span>` : ''}</div>`;
  const line = [s.album, s.year].filter(Boolean).join(' · ');
  // The figure is the key; the qualifier under it is whatever else the note said about the key,
  // in full. See songKey() — the long form is information, not noise, it just is not a figure.
  const kFig = songKey(s) || (s.key ? s.key.split(/[(,;]/)[0].trim().slice(0, 16) + '…' : '');
  return `<div class="songhead">
    ${songArt(s, 'songhead-art')}
    <div class="songhead-b">
      <p class="eyebrow">${esc(s.artist || 'Unknown artist')}</p>
      <h2 class="vh">${esc(s.title)}</h2>
      ${line ? `<p class="songhead-m">${esc(line)}</p>` : ''}
      <div class="dstats songhead-s">
        ${stat('Key', kFig, s.key !== kFig ? s.key : '')}${stat('Tempo', s.bpm)}
        ${stat('Form', s.structure)}${stat('Feel', s.feel)}${stat('Genre', s.genre)}
      </div>
      ${s.instruments.length ? `<div class="dchips">${s.instruments.map(i =>
        `<span class="pill">${esc(i)}</span>`).join('')}</div>` : ''}
      ${coverControl(s)}
    </div></div>
    ${s.about ? `<p class="lede">${esc(s.about)}</p>` : ''}
    ${chartBlock(s.id)}`;
}

/* spec-176b — Nate: "i want the chord charts linked to the song page in its own section at the top."
   So: its own section, above the note, before the contents strip.

   FOLDED SHUT BY DEFAULT and that is the one judgement call here. A chart is three pages of
   monospace; open, it puts the entire note below the fold on every song that has one, and the note
   is what the rest of this page was built for. Shut, the chart is one tap and its heading is the
   first thing under the sleeve. The open state is remembered per chart for the session, so a chart
   you are playing from stays open while you click around.

   `white-space:pre` and a mono face are load-bearing, not styling: `pdftotext -layout` encodes the
   chart's meaning as COLUMN POSITION — a chord name sits above the syllable it changes on, and a
   tab stave is a grid. Reflow it and it stops being a chart. */
let chartOpen = new Set();
function chartBlock(sid) {
  if (LOCAL) return chartBlockLocal(sid);      // the reader's own charts, from their device
  const list = CHARTS[sid] || [];
  if (!list.length) return '';
  return `<div class="ovsec chartsec">
    <div class="dhead"><p class="eyebrow">Chord chart${list.length > 1 ? 's' : ''}</p>
      <span class="rule"></span><span class="cnt">${list.length === 1
        ? `${list[0].lines} lines` : `${list.length} charts`}</span></div>
    ${list.map((c, i) => {
      const k = sid + ':' + i;
      return `<details class="rd chart" data-chart="${esc(k)}"${chartOpen.has(k) ? ' open' : ''}>
        <summary><span class="rd-t">${esc(c.name)}</span>
          <span class="rd-m">${c.lines} lines · from the PDF in the vault</span></summary>
        <pre class="chartbody">${esc(c.text)}</pre></details>`;
    }).join('')}</div>`;
}

/* ---------------------------------------------------------------- PATCH-144: the note page
   The other end of the Read line's link. What is on it is the note MINUS its enrichment tail
   — build.py's `_teaching_body`, the same cut a whole-note reading pull makes — because
   `## From videos` is 72% of this corpus and is /music-enrich's digest, not the note. The
   page says how many sections it is not showing rather than quietly deciding for you.

   `srcBack` is where the reader came from, so "← Back" returns to the lesson they were
   reading rather than to a fixed tab. It is a plain route string and it survives a
   source → source hop unchanged, which is the behaviour you want: the way out is the way in,
   not one step back per note you followed. */
let srcBack = '';
function sourceView(sid) {
  const s = SOURCES[sid];
  if (!s) return `<div class="view"><h2 class="vh">Note not found</h2>
    <p class="calnote">Nothing in this page has the id <code class="cmd">${esc(sid)}</code>.</p>
    <div><button class="btn btn-quiet" data-nav="courses">← Courses</button></div></div>`;
  // spec-176 — a song note is a source page with a sleeve on top. The fallback way out follows
  // the note: off a song you came from the shelf, off anything else from the courses.
  const song = SONGS[sid];
  const back = srcBack && srcBack !== route ? srcBack : song ? 'songs' : 'courses';
  const used = (s.used || []).map(k => {
    const [cid, n] = k.split(':');
    return COURSES[cid]
      ? `<button type="button" class="xlink xlink-course" data-goto="course:${esc(cid)}">${
          esc(COURSES[cid].title)} · lesson ${esc(n)}</button>` : '';
  }).filter(Boolean);
  const withheld = [s.extra ? `${s.extra} enrichment section${s.extra === 1 ? '' : 's'}` : '',
                    s.more ? `${s.more} section${s.more === 1 ? '' : 's'} past this page's length cap` : '']
                   .filter(Boolean);
  /* PATCH-159 — a note the LINK CLOSURE added, rather than one a Read line assigns. It has to
     say so: it is capped far shorter than an assigned page, so a reader who is not told would
     read "3 sections in the vault" as this note being long rather than as this page being a
     reference copy. And if the note is a drill or a routine, its own page is the better door —
     that is where the stat strip and the practice log are. */
  const home = ROUTES[(s.title || '').toLowerCase()] || '';
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="${esc(back)}">← Back</button>
      <span class="pill">${s.words} word${s.words === 1 ? '' : 's'}</span>
      <span class="pill">${readMins(s.words)} min</span>
      ${used.length ? `<span class="pill">assigned in ${used.length} lesson${
        used.length === 1 ? '' : 's'}</span>` : s.ref ? `<span class="pill">reference</span>` : ''}
      ${home ? `<button class="btn btn-quiet" data-goto="${esc(home)}">${
        home.startsWith('tool') ? 'On the tools shelf' : 'Open the drill page'} &rarr;</button>` : ''}</div>
    ${song ? songHead(song) : `<h2 class="vh">${esc(s.title)}</h2>`}
    ${s.secs.length > 1 ? `<div class="srctoc">${s.secs.map((t, i) =>
      `<button type="button" class="srcsec" data-srcsec="${i}">${esc(t)}</button>`).join('')}</div>` : ''}
    <div class="card srccard"><div class="prose srcbody">${s.html}</div></div>
    ${used.length ? `<div><p class="eyebrow">Assigned in</p><p class="calnote" style="margin:0">${
      used.join(' · ')}</p></div>` : ''}
    ${LOCAL && !withheld.length ? '' : `<p class="calnote" style="margin:0">${withheld.length
      ? `Not shown here: ${withheld.join(' and ')}${lite(' — the full note lives in the vault.', '.')}`
      : `This is the whole note.`}${s.ref && !LOCAL ? ` Nothing in the school assigns this note — it has a
      page because something on the page links to it, and a reference page is held to a shorter
      length than assigned reading.` : ''}</p>`}</div>`;
}

/* PATCH-159 — where a drill page came FROM. A **Technique** line on a lesson's homework now
   opens the drill's own page, so "← Back" has to mean the lesson when that is where you were
   and the shelf when it is not. Same shape and the same reasoning as `srcBack`. */
let drillBack = '';
const DRILL_PAGE = /^(technique|routine|watch|method):/;
const drillOut = () => drillBack && !DRILL_PAGE.test(drillBack) ? drillBack : 'drills';

/* One page body for a technique drill and for a practice routine. They were never really two
   things — a routine is a drill that also reinforces concepts — and splitting them is what left
   Interval Ladder with a card on a shelf and nowhere to log a session.

   ORDER IS THE POINT OF THIS PATCH. Nate, 2026-09-07: *"i dont see a way to log progress / put
   the progress tracker and input at the top of the page instead of the bottom."* The log used to
   sit under the instructions, and the instructions are the longest thing on the page — on
   Interval Ladder the ladder table alone is twelve rows — so the one control the page exists for
   was below the fold on every screen. Numbers, then the input, then the reading: you come here to
   log, and reading how to run it is the thing you do BEFORE you come here, not after you arrive. */
function drillPage(d, kind) {
  const st = ds(d.id), log = drillLog(d.id);
  const cur = st.tempo_current, start = d.tempo_start;
  const pct = (cur && start) ? Math.round(((cur - start) / start) * 100) : null;
  const chips = kind === 'routine' ? (d.reinforces || []).map(id => CONCEPTS[id]
    ? `<button type="button" class="xlink xlink-concept" data-goto="concept:${esc(id)}">${
        esc(CONCEPTS[id].short)}</button>` : '').filter(Boolean) : [];
  /* PATCH-126 — Nate: "the drill pages look very html like. formate it better."
     Fair: the page was a heading, then whatever markup the drill note happened to carry, then a
     form — three unrelated blocks stacked, with the numbers that matter buried in a meta line as
     prose. The facts are a STAT STRIP now (each figure with its own label, tabular, scannable),
     the note's prose sits in a card of its own so it reads as the instructions rather than as page
     chrome, and the log keeps the last card. Nothing about the data changed. */
  const stat = (k, v, sub) => v === '' || v === null || v === undefined ? ''
    : `<div class="dstat"><span class="ds-k">${k}</span><span class="ds-v">${v}</span>${
        sub ? `<span class="ds-s">${sub}</span>` : ''}</div>`;
  const back = drillOut();
  return `<div class="view" data-domain="instrument">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="${esc(back)}">${
      back === 'drills' ? '← Drills' : '← Back'}</button>
      ${d.instrument ? `<span class="pill">${esc(d.instrument)}</span>` : ''}
      ${d.source ? `<span class="pill">${esc(String(d.source).replace(/\s*\((music_enrich|video_enrich)[^)]*\)/i, ''))}</span>` : ''}
      ${d.minutes ? `<span class="pill">${d.minutes} min</span>` : ''}</div>
    <h2 class="vh">${esc(d.title)}</h2>

    <div class="dstats">
      ${stat('Current', cur ? `&#9833;=${cur}` : '—', cur ? '' : 'not logged yet')}
      ${stat('Target', d.tempo_target ? `&#9833;=${d.tempo_target}` : '—',
             d.tempo_target ? '' : 'no printed mark')}
      ${stat('Change', pct === null ? '—' : `${pct >= 0 ? '+' : ''}${pct}%`,
             start ? `from &#9833;=${start}` : '')}
      ${/* PATCH-160 — total minutes, summed across the WHOLE stored log (up to 40 sessions),
            not the 8 practiceLog() shows in its table. Omitted when nothing logged carries
            `mins` — a bare "0 min" would read as a fact rather than as missing data. */''}
      ${stat('Last run', log.length ? esc(shortDate(log[0].date)) : '—',
             log.length ? `${log.length} session${log.length === 1 ? '' : 's'}${
               log.reduce((s, e) => s + (+e.mins || 0), 0)
                 ? ` · ${log.reduce((s, e) => s + (+e.mins || 0), 0)} min` : ''}` : 'never')}
    </div>

    ${practiceLog({drill: d.id, tempo_target: d.tempo_target || 0, minutes: d.minutes || 0})}

    ${chips.length ? `<div><p class="eyebrow">Reinforces</p><div class="dchips">${
      chips.join('')}</div></div>` : ''}
    ${d.read ? `<div class="card dread"><div class="lbl">How to run it</div>${readFold(d.read)}</div>` : ''}
    ${SRC_INDEX[(d.title || '').toLowerCase()]
      ? `<p class="calnote" style="margin:0">The whole note, including everything this page does
          not show: <button type="button" class="xlink xlink-read" data-goto="source:${
          esc(SRC_INDEX[d.title.toLowerCase()])}">${esc(d.title)}</button></p>` : ''}</div>`;
}

const drillNotFound = (id, what) => `<div class="view"><h2 class="vh">${what} not found</h2>
  <p class="calnote">Nothing in the library has the id <code class="cmd">${esc(id)}</code>.</p>
  <div><button class="btn btn-quiet" data-nav="drills">← Drills</button></div></div>`;

function techniqueView(id) {
  const DR = C.drills || {technique: {}};
  const d = Object.values(DR.technique || {}).flat().find(x => x.id === id);
  return d ? drillPage(d, 'technique') : drillNotFound(id, 'Drill');
}

function routineView(id) {
  const DR = C.drills || {routines: []};
  const r = (DR.routines || []).find(x => x.id === id);
  return r ? drillPage(r, 'routine') : drillNotFound(id, 'Routine');
}

/* ---------------------------------------------------------------- PATCH-124: the Tests page
   Nate: "the tests page should show past results with the tests answers and reasons for things
   being wrong with linked pages within the school as references to review. also show upcoming
   tests."

   Everything on it already existed and had nowhere to be read. `tests[<page>].attempts` held the
   scores and nothing rendered them. `misses` held the question, the canonical answer and the
   grader's reason for every one marked wrong — written at grade time so the page would have them,
   since test papers live in the vault as markdown and never reach the curriculum island — and
   they were only ever surfaced as retake CARDS, one at a time, blind. Read together they are the
   thing you actually want after a test: what you got wrong, what the answer was, why, and where
   to go and read about it.

   The references resolve from the miss's own `concept`, so they are the school's real pages (the
   concept card, and the lesson that teaches it) rather than a bag of search links. */
function testsView() {
  const upcoming = datedTests().sort((a, b) => a.due - b.due);
  const byTest = {};
  missEver().forEach(k => { const m = P.misses[k]; (byTest[m.test] ||= []).push({key: k, m}); });
  const sat = Object.entries(P.tests || {})
    .filter(([, v]) => (v.attempts || []).length)
    .map(([name, v]) => ({name, v, last: v.attempts[0]}))
    .sort((a, b) => String(b.last.date).localeCompare(String(a.last.date)));

  const refs = m => {
    const c = CONCEPTS[m.concept];
    if (!c) return '';
    const co = COURSES[c.course];
    return `<div class="tq-refs"><span class="tq-rl">Review</span>
      <button class="xlink xlink-concept" data-concept="${esc(m.concept)}">${esc(c.short)}</button>${
      co ? `<button class="xlink xlink-course" data-course-lesson="${esc(c.course)}:${esc(String(c.lesson))}">${
        esc(co.short)} · lesson ${esc(String(c.lesson))}</button>` : ''}</div>`;
  };
  const qBlock = ({key, m}) => `<div class="tq" data-kind="${esc(m.kind || 'wrong')}">
    <div class="tq-h"><span class="tq-n">Q${esc(String(m.n))}</span>
      <span class="tq-k">${m.kind === 'partial' ? 'Partly right' : 'Missed'}</span>
      ${m.cleared ? `<span class="tq-c">retaken ${esc(shortDate(m.cleared))}</span>`
        : `<span class="tq-d">retake due ${esc(shortDate(m.due || TODAY))}</span>`}</div>
    <div class="tq-q">${esc(m.q || '')}</div>
    <div class="tq-a"><b>Answer</b> ${esc(m.a || '')}</div>
    ${m.why ? `<div class="tq-w">${esc(m.why)}</div>` : ''}
    ${refs(m)}</div>`;

  return `<div class="view">
    <div><p class="eyebrow">Checkpoints</p><h2 class="vh">Tests</h2></div>

    <div><div class="dhead"><p class="eyebrow">Upcoming</p><span class="rule"></span>
      <span class="cnt">${upcoming.length} scheduled</span></div>
      ${upcoming.length ? `<div class="quizlist wide">${upcoming.map(x => {
        const late = x.due < dayOf(TODAY);
        return `<div class="qz">
          <button class="qz-t" data-course-lesson="${esc(x.c.id)}:${x.n}"><span class="st"></span>${
            esc(x.c.short)} · lesson ${x.n}</button>
          <span class="qz-d" data-d="${late ? 'late' : 'later'}">due ${esc(shortDate(dayIso(x.due)))}</span>
          <button class="qz-b btn btn-quiet" data-course-lesson="${esc(x.c.id)}:${x.n}">Open</button></div>`;
      }).join('')}</div>
      ${LOCAL ? '' : `<p class="calnote" style="margin:8px 0 0">Tests are sat in chat, blind, one question at a
        time — <code class="cmd">/school test ${esc(upcoming[0].c.id)} ${upcoming[0].n}</code>.</p>`}`
      : `<p class="calnote" style="margin:0">${lite('Nothing scheduled. A lesson test appears here once its lesson is open.', 'Nothing scheduled.')}</p>`}</div>

    ${/* App build — the papers that belong to no single lesson: course finals reach the reader
          from their course page, but the cross-course midterms and exams have no other door. */
      LOCAL ? (() => {
        const exams = Object.values(PAPERS).filter(p => !p.course);
        return exams.length ? `<div><div class="dhead"><p class="eyebrow">Exams</p><span class="rule"></span>
          <span class="cnt">${exams.length}</span></div>
          <div class="quizlist wide">${exams.map(p => { const a = ((P.tests[p.name] || {}).attempts || [])[0];
            return `<div class="qz"><span class="qz-t"><span class="st"></span>${esc(p.name)}</span>
              <span class="qz-d" data-d="later">${a ? `${esc(shortDate(a.date))} — ${esc(String(a.score_pct))}%` : `${p.qs.length} questions`}</span>
              <button class="qz-b btn btn-quiet" data-paper="${esc(p.name)}">${a ? 'Open' : 'Take'}</button></div>`; }).join('')}</div></div>` : '';
      })() : ''}

    <div><div class="dhead"><p class="eyebrow">Results</p><span class="rule"></span>
      <span class="cnt">${sat.length} sat</span></div>
      ${sat.length ? sat.map(({name, v, last}) => {
        const qs = (byTest[name] || []).sort((a, b) => a.m.n - b.m.n);
        const passed = last.result === 'passed';
        return `<div class="card tcard">
          <div class="spread" style="align-items:flex-start">
            <div><h3 style="margin:0;font-family:var(--read);font-size:18px;font-weight:600">${esc(name)}</h3>
              <div class="dmeta" style="margin-top:4px">${esc(shortDate(last.date))}${
                last.objective ? ` · objective ${esc(last.objective)}` : ''}${
                last.free_text ? ` · free-text ${esc(last.free_text)}` : ''}${
                (v.attempts || []).length > 1 ? ` · ${v.attempts.length} attempts` : ''}</div></div>
            <span class="pill ${passed ? 'pill-ok' : 'pill-due'}">${passed ? 'Passed' : 'Failed'} ${
              esc(String(last.score_pct))}%</span></div>
          ${qs.length ? `<div class="tqs">${qs.map(qBlock).join('')}</div>`
            : '<p class="calnote" style="margin:10px 0 0">Nothing marked wrong on this one.</p>'}
        </div>`;
      }).join('')
      : '<p class="calnote" style="margin:0">No test sat yet.</p>'}</div>
  </div>`;
}

/* ---------------------------------------------------------------- spec-177: the tools shelf
   Nate, 2026-09-01, a link drop of ~30 outside sites, apps, textbooks, articles and playlists:
   *"integrate these resources into music school"*.

   IT IS A SHELF, NOT COURSEWORK. Nothing here is ever due, nothing is graded, and no view below
   writes a byte of state — the same contract the drill library (spec-174) and the song library
   (spec-176) hold to, and the reason all three are countless on the rail.

   EVERY WAY OUT IS A REAL <a href target="_blank">, never window.open. The frame runtime
   intercepts click/auxclick on `a[href]`, preventDefaults an external origin and posts
   `{__frame_nav, url, newTab}` to the parent; that is the only sanctioned way out of the frame,
   and a scripted popup is swallowed in silence. drillsView's watchCard learned this the hard way
   (corrected 2026-08-23) — a shelf of thirty links is thirty chances to relearn it.

   ORDER IS DELIBERATE. Drill sites first because they are the ones you OPEN AND DO; reading sits
   below them; community sits last because it is the tier that has to be verified before it is
   trusted. `superseded` and `unverified` entries never appear as cards at all — see toolRow(). */
const TOOL_KINDS = [
  ['drill-site',   'Drill sites',    'exercises you configure and run'],
  ['app',          'Apps',           'phone and desktop — most of these work offline'],
  ['video-course', 'Video courses',  'sequences, not clips — watch them in order'],
  ['textbook',     'Textbooks',      'free and open-access, the reference layer'],
  ['article',      'Articles',       'one argument each, worth reading whole'],
  ['example-db',   'Example banks',  'real music, indexed by the concept it demonstrates'],
  ['channel',      'Channels',       'back catalogues to search, not sequences to work through'],
  ['community',    'Community',      'forums and cheat sheets — check before trusting'],
];
const toolOpen = new Set();            // which tool folds are open, for the session (cf. readOpen)

/* Live tools only, and that exclusion is load-bearing rather than tidy: a `superseded` entry is a
   dead link kept so the dead NAME gets answered, and an `unverified` one is a page nobody has
   read yet. Neither belongs in a "practise this here" line inside a lesson — recommending an
   unread page from inside coursework is exactly the dishonest wiring the shelf exists to avoid.
   They still show on the shelf itself, as pointers. */
const toolsForConcept = id => TOOLS.filter(t => t.status === 'live' && (t.reinforces || []).includes(id));
/* Union over several concepts, first-seen order, deduped — a lesson that releases four concepts
   all pointing at musictheory.net names it once. A linear scan of thirty is nothing; a prebuilt
   reverse index would only be a second thing to keep true. */
const toolsForConcepts = ids => {
  const seen = new Set(), out = [];
  (ids || []).forEach(id => toolsForConcept(id).forEach(t => {
    if (!seen.has(t.id)) { seen.add(t.id); out.push(t); }
  }));
  return out;
};

/* The strip that puts the shelf INSIDE the coursework — on a concept card and on a homework
   page. Links out, not routes in: the entire value of a tool is that it is somewhere else, so a
   chip that opened an internal description page would put a click between the concept and the
   drill. The one internal control is the way to the whole shelf. */
function toolStrip(tools, label) {
  if (!tools.length) return '';
  return `<div class="ovsec">
    <div class="dhead"><p class="eyebrow">${esc(label)}</p><span class="rule"></span>
      <span class="cnt">${tools.length}</span></div>
    <div class="dchips">${tools.map(t =>
      `<a class="xlink xlink-tool" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer"
        >${esc(t.title)}</a>`).join('')}<button type="button" class="xlink xlink-read"
        data-nav="tools">all ${TOOLS.length} tools &rarr;</button></div></div>`;
}

const TOOL_COST = {free: 'free', freemium: 'free tier', paid: 'paid', subscription: 'subscription'};
const PLATFORM = {web: 'web', ios: 'iOS', android: 'Android', macos: 'macOS', windows: 'Windows'};

function toolCard(t) {
  const meta = [
    TOOL_COST[t.cost] || t.cost,
    (t.platforms || []).map(x => PLATFORM[x] || x).join(', '),
    t.offline ? 'offline' : '',
    t.count ? `${t.count} videos` : '',
    t.channel,
  ].filter(Boolean).join(' · ');
  const chips = (t.reinforces || []).filter(id => CONCEPTS[id]).map(id =>
    `<button type="button" class="xlink xlink-concept" data-goto="concept:${esc(id)}"
      >${esc(CONCEPTS[id].short)}</button>`).join('');
  return `<div class="card drillcard toolcard">
    <div class="spread"><div>
      <h3 class="dt">${esc(t.title)}</h3>
      <div class="dmeta">${esc(meta)}</div></div>
      <div class="row" style="gap:6px">${(t.strands || []).map(k =>
        `<button type="button" class="btn btn-quiet" data-strand="${esc(k)}"
          style="gap:6px">${plate(k)}${esc(k)}</button>`).join('')}</div></div>
    ${chips ? `<div class="dchips">${chips}</div>` : ''}
    ${t.html ? `<details class="rd" data-tool="${esc(t.id)}"${toolOpen.has(t.id) ? ' open' : ''}>
      <summary><span class="rd-t">How to use it here</span></summary>
      <div class="rd-b"><div class="prose">${t.html}</div></div></details>` : ''}
    <a class="btn btn-go" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer"
      >Open ${esc(t.title)} (new tab)</a></div>`;
}

/* A pointer, not a recommendation. `superseded` means the link is dead and the note says where
   the thing went; `unverified` means nobody has opened it yet. Both are real information and
   neither should wear the same card as a tool that has been used — so they get one muted row
   with the reason on it, below everything else. */
function toolRow(t) {
  const why = t.status === 'superseded'
    ? 'link is dead — the note says where it went'
    : 'not checked yet — nothing here is wired to a concept';
  return `<div class="card drillcard toolcard toolcard-off">
    <div class="spread"><div><h3 class="dt">${esc(t.title)}</h3>
      <div class="dmeta">${esc(t.status)} · ${why}</div></div></div>
    ${t.html ? `<details class="rd" data-tool="${esc(t.id)}"${toolOpen.has(t.id) ? ' open' : ''}>
      <summary><span class="rd-t">What to do with it</span></summary>
      <div class="rd-b"><div class="prose">${t.html}</div></div></details>` : ''}
    <a class="btn btn-quiet" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer"
      >Open anyway (new tab)</a></div>`;
}

function toolsView() {
  const live = TOOLS.filter(t => t.status === 'live');
  const off  = TOOLS.filter(t => t.status !== 'live');
  const section = ([key, label, sub], explicit) => {
    const list = explicit || live.filter(t => t.kind === key);
    if (!list.length) return '';
    return `<div class="ovsec">
      <div class="dhead"><p class="eyebrow">${esc(label)}</p><span class="rule"></span>
        <span class="cnt">${list.length}</span></div>
      <p class="calnote" style="margin:-6px 0 12px">${esc(sub)}</p>
      <div class="grid">${list.map(toolCard).join('')}</div></div>`;
  };
  return `<div class="view toolsview">
    <div><p class="eyebrow">Library</p><h2 class="vh">Tools</h2>
      <p class="calnote" style="margin:4px 0 14px;max-width:74ch">The outside world, wired in.
      ${live.length} sites, apps, texts and playlists the school points at but does not own —
      each one carrying the concepts it drills, so it can be reached from the card that needs it
      rather than only from here. <b>Nothing on this page is ever due.</b> Every link opens in a
      new tab.</p></div>
    ${/* `.map(k => section(k))`, NEVER `.map(section)`. Array.map passes (element, index,
          array), so a bare reference hands the INDEX to section's second parameter — which is
          `explicit`, the catch-all's list override. Index 0 is falsy so drill-sites rendered and
          every section after it silently drew nothing: 14 cards out of 32, no error anywhere.
          Caught by tools-assert.py comparing the DOM's card count to the bundle's, which is the
          whole reason that assertion counts instead of just looking for the view. */
      TOOL_KINDS.map(k => section(k)).join('')}
    ${/* A tool whose `kind:` is not in TOOL_KINDS would otherwise render NOWHERE — the note
          would exist, build.py would carry it, the count in the lede would include it, and the
          shelf would simply not draw it. Silent omission is the worst failure a catalogue can
          have, so anything unrecognised lands here under its own raw kind, which is both a
          usable card and a visible prompt to add the kind to TOOL_KINDS properly. */
      section(['', 'Other', 'kinds not yet given a section of their own'], 
        live.filter(t => !TOOL_KINDS.some(k => k[0] === t.kind)))}
    ${off.length ? `<div class="ovsec">
      <div class="dhead"><p class="eyebrow">Unverified and superseded</p><span class="rule"></span>
        <span class="cnt">${off.length}</span></div>
      <p class="calnote" style="margin:-6px 0 12px">Held here rather than deleted, and deliberately
        not wired to any concept. A dead name still deserves an answer, and an unread page should
        say so out loud instead of sitting on the shelf looking checked.</p>
      <div class="grid">${off.map(toolRow).join('')}</div></div>` : ''}
  </div>`;
}

/* ---------------------------------------------------------------- spec-178: the slice shelf
   Nate, 2026-09-02: *"make soundlice links have their own page in the artifact. they're very
   useful as tools. can you embed them in the page directly?"*

   NO, AND THAT IS NOW OBSERVED RATHER THAN ASSUMED. spec-174 recorded the CSP verdict as an
   inference from the Artifact tool's documented contract and explicitly asked the next person to
   run a live test. It was run 2026-09-02 against a published throwaway artifact whose own
   `securitypolicyviolation` listener reported:

       directive=frame-src   blocked=https://www.soundslice.com
       ... form-action 'self'; frame-src 'self' blob: data:; object-src 'none'; ...

   `frame-src 'self' blob: data:` — the policy admits the artifact's own origin, blobs and data
   URIs, and nothing else. A Soundslice iframe here is dead, permanently, and so is any other
   embed. So this page does the only useful thing left: it carries everything ABOUT each slice —
   the slice's own title, the teacher's own brief, and the homework that assigns it — so the shelf
   is worth reading before you leave it, and the leaving is one unmissable link.

   THE CARDS ARE SORTED BY WHAT IS OPEN, not by date alone. A slice with unticked homework is the
   one Nate is meant to be working in this week; a slice whose homework is done is reference. The
   date ordering (newest first, house rule) holds inside each group. */
function slicesView() {
  const byId = {};
  extAll().forEach(l => (l.homework || []).forEach(h => { byId[h.id] = {...h, lesson: l.id}; }));
  const openCount = sl => sl.uses.reduce((n, u) =>
    n + u.hw.filter(id => byId[id] && !P.homework[id]).length, 0);

  /* The homework line as written carries the slice URL inline — "Drop Voicing Worksheet -
     soundslice: https://www.soundslice.com/slices/VNb7c/" — because in the lesson note that link
     IS the only way to the material. Here it is redundant twice over: the card is titled with the
     slice and ends in a button that opens it, and the raw URL wrapping across three lines was the
     longest thing on the card. Strip the trailing link and the "soundslice:" label that introduces
     it, then any connector left dangling. BOTH SHAPES, because md_inline() does NOT autolink a
     bare URL — checked against the bundle, where these arrive as plain text — and a pattern that
     only knew the <a> form silently stripped nothing at all. `soun?dslice` on purpose: the note that
     prompted this spec types it "soudslice", and a strip that only handled the correct spelling
     would work on one of the two cards. Falls back to the untouched line if stripping empties it —
     a homework item that was ONLY a link still has to say something. */
  const SS_TAIL = /\s*[-–—+]?\s*(?:soun?dslice)?\s*:?\s*(?:<a\b[^>]*href="[^"]*soundslice\.com[^"]*"[^>]*>.*?<\/a>|https?:\/\/\S*soundslice\.com\S*)\s*$/i;
  const hwLabel = (html) => {
    const cut = html.replace(SS_TAIL, '').replace(/[\s\-–—+:]+$/, '');
    return cut.trim() ? cut : html;
  };
  const hwRow = (id) => {
    const h = byId[id];
    if (!h) return '';
    const on = !!P.homework[id];
    return `<li class="${on ? 'on' : ''} ro"><span class="tick" aria-hidden="true">${
      on ? '✓' : '–'}</span><span class="tlabel">${hwLabel(h.html)}</span></li>`;
  };

  const card = sl => {
    const u = sl.uses[0];                     // most recent assignment — build.py sorted these
    const open = openCount(sl);
    const hwIds = sl.uses.flatMap(x => x.hw).filter(id => byId[id]);
    /* The slice's OWN title leads when Soundslice gave us one, and Nate's label drops to a
       second line only when it actually says something different. His "Harmonic minor chord
       scale" against the slice's "D Harmonic minor worksheet" is worth both lines; a label that
       merely repeats the title is noise. */
    /* "Open in Soundslice" is build.py's fallback LABEL for an entry written as a bare URL with
       no text in front of it — fine on a button, useless as a card's title, which is what the
       2026-09-02 capture produced. Name it by its hash instead: that is the one thing a bare URL
       actually tells you, and it is what you would search the teacher's message for. */
    const title = sl.title || (sl.label && sl.label !== 'Open in Soundslice' ? sl.label
                               : sl.hash ? `Slice ${sl.hash}` : 'Untitled slice');
    const alt = sl.title && sl.label && sl.label !== sl.title ? sl.label : '';
    return `<div class="card slicecard">
      <div class="spread" style="align-items:flex-start;gap:10px">
        <div style="min-width:0">
          <div class="eyebrow" style="margin:0 0 3px">${esc(u.instrument || 'lesson')}${
            u.teacher ? ` · ${esc(u.teacher)}` : ''} · ${esc(shortDate(u.date))}</div>
          <h3 class="dt">${esc(title)}</h3>
          ${alt ? `<div class="dmeta">filed as “${esc(alt)}”</div>` : ''}</div>
        ${sl.status === 'missing' ? '<span class="pill pill-due">link broken</span>'
          : open ? `<span class="pill pill-due">${open} open</span>`
          : hwIds.length ? '<span class="pill pill-ok">done</span>' : ''}
      </div>
      ${/* Soundslice answered 404 for this URL at build time. Say so ON the card: the homework
            below still assigns it, so the entry must stay, but the button under it goes nowhere
            and a shelf that hides that is lying about its own contents. */
        sl.status === 'missing' ? `<p class="calnote slicedead">This link returns “not found” on
          Soundslice — it looks like the URL was cut short when it was captured. Check it against
          the message your teacher sent and fix the <code class="cmd">soundslice:</code> line in
          the lesson note.</p>` : ''}
      ${/* The teacher's own brief, typed into Soundslice and fetched at build time. It is the
            single most useful thing on the card — "4th position … particular attention to
            triplets (25bpm)" is nowhere in the vault note — and it is NOT the score, so the
            do-not-mirror rule in Lessons/_README.md is untouched. */
        sl.desc ? `<div class="slicebrief"><p class="lbl">From the teacher, on Soundslice</p>
          <p>${esc(sl.desc).replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>')}</p></div>` : ''}
      ${hwIds.length ? `<div class="blk"><div class="lbl">Assigned by
        <button class="lnkedit hw-go" data-hw-open="ext:${esc(u.lesson)}">open the lesson →</button></div>
        <ul class="tasks">${hwIds.map(hwRow).join('')}</ul></div>` : ''}
      ${sl.uses.length > 1 ? `<p class="calnote" style="margin:8px 0 0">Also sent
        ${sl.uses.slice(1).map(x => esc(shortDate(x.date))).join(', ')}.</p>` : ''}
      <a class="btn ${sl.status === 'missing' ? 'ssbtn ssbtn-dead' : 'btn-go ssbtn'}"
        href="${esc(sl.url)}" target="_blank" rel="noopener noreferrer"
        >&#9835; ${sl.status === 'missing' ? 'Try the link anyway' : 'Open in Soundslice (new tab)'}</a>
    </div>`;
  };

  const live = SLICES.filter(sl => openCount(sl) > 0);
  const rest = SLICES.filter(sl => openCount(sl) === 0);
  const section = (label, sub, list) => list.length ? `<div class="ovsec">
    <div class="dhead"><p class="eyebrow">${esc(label)}</p><span class="rule"></span>
      <span class="cnt">${list.length}</span></div>
    <p class="calnote" style="margin:-6px 0 12px">${esc(sub)}</p>
    <div class="grid">${list.map(card).join('')}</div></div>` : '';

  return `<div class="view slicesview">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="ext">← Outside lessons</button>
      ${live.length ? `<span class="pill pill-due">${live.length} with open homework</span>` : ''}</div>
    <div><p class="eyebrow">My school</p><h2 class="vh">Soundslice</h2>
      <p class="calnote" style="margin:4px 0 14px;max-width:74ch">Every slice your teacher has sent,
      ${SLICES.length} in all, with the brief they wrote on it and the homework it was set for.
      <b>The player itself has to open in a new tab.</b> This page is served under
      <code class="cmd">frame-src 'self' blob: data:</code> — tested against the live artifact on
      2 Sep 2026, which refused both a Soundslice and a YouTube frame — so no embed can ever run
      here. Work in Soundslice; nothing is mirrored back.</p></div>
    ${SLICES.length ? '' : `<div class="card"><p class="calnote" style="margin:0">No slices yet.
      Add them to a lesson note's <code class="cmd">soundslice:</code> frontmatter as
      <code class="cmd">Label — URL</code>, one per line, and run <code class="cmd">/school sync</code>.</p></div>`}
    ${section('Open now', 'homework on these is still unticked — this is the week’s work', live)}
    ${section('Reference', 'nothing owed on these; kept because a worksheet is worth returning to', rest)}
  </div>`;
}

/* ---------------------------------------------------------------- spec-179: the idea board
   Nate, 2026-09-10: *"i want to create an 'originals' tab within the music school artifact so
   myself and my sister can put song ideas there and ideate on them."*

   THE ONE WRITABLE SHELF. Songs, Drills, Tools and Soundslice are all read-only projections of
   the vault; this one takes input. It could not use the obvious mechanism for that. The page
   saves by REPUBLISHING ITSELF and only the owner may publish, so a reader on a shared link is
   `readonly` (PATCH-129) and could never write a word here. And the `db` capability, which does
   give every viewer a shared store, is ONE STORE PER ARTIFACT — Nate's page and Britt's page are
   two artifacts, so it would not have joined them either, while declaring it would have made the
   page organization-internal and taken her access to the school away entirely.

   So the board is VAULT-BACKED and the two pages meet in the repo, not in the browser. An idea
   typed here lands in `P.originals`, `sync.py` writes it into `School & Content/Originals/`,
   and `sync-shared.sh` mirrors that folder into the clone the other person builds from. Nate's
   call, 2026-09-10, told plainly: the round trip is a sync and a rebuild each way. That is the
   same lag `Handoff.md` has always had, and it is why this is a board rather than a chat.

   Everything below follows PATCH-019's lesson capture, which solved this exact problem already:
   two sources merged into one list, and a capture that disappears from the page's own half once
   a note comes back carrying its id. */
const ORIG_STATUS = {spark: 'Spark', working: 'Working', parked: 'Parked', done: 'Done'};
/* Whose page this is. build.py stamps `user` into the curriculum, so a capture is attributed
   without asking and without a picker — there is no `user` capability on this account to ask
   the runtime who is reading, and a page can only ever be published by the person it was built
   for. `NAME` is what gets written into the vault note's `### <by> — <date>` heading. */
const ME = String(C.user || 'me');
const NAME = ME.charAt(0).toUpperCase() + ME.slice(1);
let addingIdea = false;
/* PATCH-007's contract: a <details> owns its own open/close and we only RECORD it, so the next
   render draws it the way the reader left it. Not `secOpen`, whose toggle reads `aria-expanded`
   and re-renders — a <details> has neither, and pairing the two double-toggles the fold. */
let origLogOpen = false;

/* The two dedupe sets, and the whole reason the format carries ids at all. A capture stays in
   `P.originals` until a REBUILD replaces the page — a save in between hands sync.py the same
   capture a second time — so both halves match on id rather than on content. */
const origSyncedIdeas = () => new Set(ORIG_NOTES.map(o => o.capture_id).filter(Boolean));
const origSyncedNotes = () => {
  const s = new Set();
  ORIG_NOTES.forEach(o => (o.notes || []).forEach(n => { if (n.id) s.add(n.id); }));
  return s;
};
const origCaptured = () => {
  const done = origSyncedIdeas();
  return ((P.originals || {}).ideas || []).filter(i => !done.has(i.id));
};
const origPending = () => {
  const done = origSyncedNotes();
  return ((P.originals || {}).notes || []).filter(n => !done.has(n.id));
};
const origUnsynced = () => origCaptured().length + origPending().length;
const origLast = o => [o.started || '', ...(o.notes || []).map(n => n.at || '')].sort().pop() || '';

function origAll() {
  const pend = origPending();
  /* A pending comment is merged into its target's thread rather than listed apart, because the
     thread IS the ideation and splitting it by transport would make it unreadable. Sorted, not
     prepended: a comment written on a phone yesterday and synced today can legitimately be older
     than one already in the note. */
  const thread = (id, base) => [
    ...pend.filter(n => n.target === id).map(n => Object.assign({}, n, {pending: true})),
    ...(base || [])].sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));
  return [
    ...ORIG_NOTES.map(o => Object.assign({}, o, {source: 'note', notes: thread(o.id, o.notes)})),
    ...origCaptured().map(o => Object.assign({}, o, {source: 'page', notes: thread(o.id, [])})),
  ].sort((a, b) => origLast(b).localeCompare(origLast(a))
                || String(b.started || '').localeCompare(String(a.started || '')));
}
const origOne = id => origAll().filter(o => o.id === id)[0];

/* A capture is PLAIN TEXT — it has never been near build.py's markdown pass — so it is escaped
   and given paragraphs here. Deliberately not a second markdown renderer: the note it becomes
   will be rendered properly by the next build, and shipping a half-implementation of markdown
   that disagrees with the real one is worse than showing the text as typed. */
const origText = t => String(t || '').trim().split(/\n{2,}/)
  .map(p => `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');

const origLede = o => {
  const raw = o.source === 'page' ? (o.idea || '') : unesc(String(o.html || '').replace(/<[^>]+>/g, ' '));
  const s = raw.replace(/\s+/g, ' ').trim();
  return s.length > 190 ? esc(s.slice(0, 190).replace(/\s\S*$/, '')) + '&hellip;' : esc(s);
};

const origFacts = o => [o.key, o.bpm ? `${o.bpm} bpm` : '', o.genre, o.feel]
  .filter(Boolean).map(f => `<span class="origfact">${esc(f)}</span>`).join('');

function origCard(o) {
  const n = (o.notes || []).length;
  /* A real <button> with `data-goto`, exactly like a song tile (`stile`) — not a div with
     role="button". It inherits the delegated handler, focus and Enter/Space for free, and this
     page has no keydown listener of its own to give a faked button any of that. */
  return `<button type="button" class="card origcard" data-goto="original:${esc(o.id)}">
    <div class="spread"><h3 class="origt">${esc(o.title)}</h3>
      ${n ? `<span class="origcount">${n} note${n === 1 ? '' : 's'}</span>` : ''}</div>
    <div class="origmeta">
      ${o.by ? `<span class="pill">${esc(o.by)}</span>` : ''}
      <span class="pill origst" data-st="${esc(o.status || 'spark')}"
        >${esc(ORIG_STATUS[o.status] || o.status || 'Spark')}</span>
      ${origFacts(o)}
      ${o.source === 'page' ? '<span class="pill pill-due">not synced</span>' : ''}</div>
    ${origLede(o) ? `<p class="origlede">${origLede(o)}</p>` : ''}</button>`;
}

/* Originals made in Barline. Nate, 2026-11-11: "if I make a song via Barline that's added to the
   originals folder, I want that put in the library as my original, and that's just one way to
   make an original."

   Barline is the next tool over in the same app, so its charts are in this browser's storage
   too. Any chart in a Barline folder called "Originals" is listed here, read live — nothing is
   copied, so there is one copy to edit and it is Barline's. The card opens the chart in Barline. */
function barlineOriginals() {
  if (!LOCAL) return [];
  try {
    const folders = JSON.parse(localStorage.getItem('barline:folders:v1') || '[]') || [];
    const ids = new Set(folders.filter(f => f && /^(my )?originals?$/i.test(String(f.name || '').trim())).map(f => f.id));
    if (!ids.size) return [];
    const charts = JSON.parse(localStorage.getItem('barline:charts:v1') || '{}') || {};
    return Object.values(charts).filter(c => c && c.id && ids.has(c.folderId))
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch (e) { return []; }
}
function barlineCard(c) {
  const secs = (c.sections || []).map(x => x && x.name).filter(Boolean);
  const names = secs.filter((n, i) => secs.indexOf(n) === i);
  const chords = [];
  (c.sections || []).some(x => (x.bars || []).some(b => { (b.chords || []).forEach(ch => {
    const t = typeof ch === 'string' ? ch : (ch && (ch.name || ch.text || ch.chord)) || '';
    if (t && chords.length < 8) chords.push(String(t)); }); return chords.length >= 8; }));
  const sig = c.top && c.bot && !(+c.top === 4 && +c.bot === 4) ? `${c.top}/${c.bot}` : '';
  return `<a class="card origcard blcard" href="../barline/#c-${esc(c.id)}">
    <div class="spread"><h3 class="origt">${esc(String(c.title || '').trim() || 'Untitled chart')}</h3>
      <span class="origcount">Barline &rarr;</span></div>
    <div class="origmeta"><span class="pill">Chart</span>
      ${c.key ? `<span class="pill">${esc(c.key)}</span>` : ''}
      ${c.bpm ? `<span class="pill">&#9833;=${esc(String(c.bpm))}</span>` : ''}
      ${sig ? `<span class="pill">${esc(sig)}</span>` : ''}</div>
    ${chords.length ? `<p class="origlede blchords">${chords.map(esc).join('&ensp;')}</p>`
      : names.length ? `<p class="origlede">${names.map(esc).join(' · ')}</p>` : ''}</a>`;
}
function originalsView() {
  const all = origAll(), un = origUnsynced(), bl = barlineOriginals();
  return `<div class="view">
    <div><p class="eyebrow">Library</p><h2 class="vh">Originals</h2>
      ${LOCAL ? `<p class="calnote" style="margin:4px 0 14px;max-width:74ch">Your idea board — song
      ideas, one card each, newest first. <b>Nothing here is ever due.</b> What you write is saved
      on this device with the rest of your progress.</p></div>`
      : `<p class="calnote" style="margin:4px 0 14px;max-width:74ch">The shared idea board — song
      ideas the two of you are writing together, one card each, newest first. <b>Nothing here is
      ever due.</b> Ideas written on this page become notes in
      <code class="cmd">School &amp; Content/Originals/</code> on the next
      <code class="cmd">/school sync</code>, and reach the other person's page when they rebuild —
      so expect a lag, and say the whole thought rather than half of it.
      Your own song projects are not here and are not shared.</p></div>`}
    <div class="spread" style="margin-bottom:14px">
      <span class="pill">${LOCAL ? `${all.length + bl.length} original${all.length + bl.length === 1 ? '' : 's'}`
        : `${all.length} idea${all.length === 1 ? '' : 's'}`}</span>
      <span class="row" style="gap:8px">${LOCAL ? '<a class="btn btn-quiet" href="../barline/#new-original">+ New chart</a>' : ''}
      ${readonly ? '' : '<button class="btn btn-go" data-orig-add="1">+ New idea</button>'}</span></div>
    ${addingIdea && !readonly ? `<div class="card extform origform">
      <div class="eyebrow">New idea</div>
      <div class="ef-grid">
        <label>Title<input type="text" id="oi-title" placeholder="untitled loop idea"></label>
        <label>Status<select id="oi-status">${Object.keys(ORIG_STATUS).map(k =>
          `<option value="${k}">${ORIG_STATUS[k]}</option>`).join('')}</select></label>
        <label>Key <span style="font-weight:400;color:var(--faint)">(optional)</span>
          <input type="text" id="oi-key" placeholder="B minor"></label>
        <label>BPM <span style="font-weight:400;color:var(--faint)">(optional)</span>
          <input type="text" id="oi-bpm" placeholder="114"></label>
        <label>Feel <span style="font-weight:400;color:var(--faint)">(optional)</span>
          <input type="text" id="oi-feel" placeholder="half-time, dragging"></label>
      </div>
      <label class="ef-l">The idea
        <textarea id="oi-idea" rows="4"
          placeholder="the spark — what it is, what it chases, what made you start it"></textarea></label>
      <div class="row" style="gap:8px">
        <button class="btn btn-go" data-orig-save="1">Save idea</button>
        <button class="btn btn-quiet" data-orig-cancel="1">Cancel</button></div></div>` : ''}
    ${un && !LOCAL ? `<div class="banner" style="margin-bottom:16px"><span>${un} thing${un === 1 ? '' : 's'}
      on this page ${un === 1 ? 'is' : 'are'} not in the vault yet. Run
      <code class="cmd">/school sync</code> to write ${un === 1 ? 'it' : 'them'} out — until then
      this page is the only copy, and nobody else can see ${un === 1 ? 'it' : 'them'}.</span></div>` : ''}
    ${bl.map(barlineCard).join('')}
    ${all.length ? all.map(origCard).join('')
      : bl.length ? '' : `<div class="card origempty">${lite('Nothing on the board yet.', 'Nothing here yet.')}
         ${readonly ? 'Ideas added here show up once the page is rebuilt.'
                    : lite('Start one — a chord loop, a title, a feeling, half a line. It does not have to be finished to be worth writing down.', '')}</div>`}
    ${/* The log, folded, under the cards. Deliberately NOT a rail tab: a log is what you consult
          after something changed, never the reason you opened the board, and a tab would advertise
          it as the latter. Shut by default for the same reason — the ideas are the board. */
      ORIG_LOG.length ? `<details class="origlog"${origLogOpen ? ' open' : ''} data-origlog="1">
        <summary>Log <span class="origcount">${ORIG_LOG.length}</span></summary>
        <div class="origlogb">${ORIG_LOG.map(e => `<div class="origlogr">
          <span class="origlogd">${esc(e.at)}</span>
          <span class="origlogw">${esc(e.by)}</span>
          <span class="origlogt">${e.what || ''}</span></div>`).join('')}</div></details>` : ''}
  </div>`;
}

function originalView(id) {
  const o = origOne(id);
  /* An idea can genuinely vanish from under a route: a capture removed on this page, or a note
     deleted in the vault before a rebuild. Say so rather than rendering an empty shell. */
  if (!o) return `<div class="view">
    <button class="btn btn-quiet" data-nav="originals">&larr; Originals</button>
    <div class="card origempty" style="margin-top:16px">That idea is not on this page any more.
      It may have been removed here, or deleted in the vault before the last rebuild.</div></div>`;
  const body = o.source === 'page' ? origText(o.idea) : (o.html || '');
  const noteRow = n => `<div class="orignote${n.pending ? ' pend' : ''}">
    <div class="orignh"><b>${esc(n.by || '')}</b><span class="orignd">${esc(n.at || '')}</span>
      ${n.pending ? '<span class="pill pill-due">not synced</span>' : ''}
      ${n.pending && !readonly ? `<button class="lnkedit"
        data-orig-notedel="${esc(n.id)}">remove</button>` : ''}</div>
    <div class="prose">${n.pending ? origText(n.text) : (n.html || '')}</div></div>`;
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="originals">&larr; Originals</button>
      ${o.source === 'page' ? '<span class="pill pill-due">not synced</span>' : ''}</div>
    <div class="spread" style="margin-top:12px"><h2 class="vh">${esc(o.title)}</h2></div>
    <div class="origmeta" style="margin-bottom:14px">
      ${o.by ? `<span class="pill">${esc(o.by)}</span>` : ''}
      <span class="pill origst" data-st="${esc(o.status || 'spark')}"
        >${esc(ORIG_STATUS[o.status] || o.status || 'Spark')}</span>
      ${origFacts(o)}
      ${o.started ? `<span class="origfact">started ${esc(o.started)}</span>` : ''}</div>
    ${body ? `<div class="card">${o.simple !== false
      ? `<div class="blk"><div class="lbl">The idea</div><div class="prose">${body}</div></div>`
      : `<div class="prose origfull">${body}</div>`}</div>` : ''}
    ${/* The status, the key and the tempo are edited in the NOTE, not here, and that is a scope
          line rather than an oversight: every one of them would need a third kind of capture and
          a frontmatter rewrite in sync.py, for a field that changes a handful of times in an
          idea's life. Comments are the ideation; those are bookkeeping. */''}
    <div class="spread" style="margin:22px 0 10px"><p class="eyebrow">Notes</p>
      <span class="origcount">${(o.notes || []).length}</span></div>
    ${readonly ? `<div class="card origempty">Read-only view — you can read the thread, but a note
      added here would not be saved.</div>` : `<div class="card origform">
      <label class="ef-l">Add a note
        <textarea id="on-text" rows="3"
          placeholder="what it needs, what it reminds you of, what you'd try next"></textarea></label>
      <div class="row" style="gap:8px">
        <button class="btn btn-go" data-orig-note="${esc(o.id)}">Add note</button>
        ${o.source === 'page' ? `<button class="btn btn-quiet"
          data-orig-del="${esc(o.id)}">Remove this idea</button>` : ''}</div></div>`}
    ${(o.notes || []).length ? `<div class="origthread">${o.notes.map(noteRow).join('')}</div>`
      : `<div class="card origempty">No notes yet.</div>`}
  </div>`;
}

/* The Drills shelf. Nate, 2026-11-11: "make drills a simple tile. Same with practice routine —
   too busy currently. Integrate watch and play YouTube videos to categories instead of in its own
   video section. Maybe be able to click into by instrument. Make practice routine and drills the
   same thing."

   So: the page opens on one tile per instrument (plus ear training), and inside an instrument
   everything to practise is the same simple tile — a technique drill, a practice routine (both
   are just "drills" now), a video to play along with, a note on practice method. Each opens its
   own page; the tile carries the name and at most one small fact. */
const DRILL_SHELVES = [['guitar', 'Guitar'], ['bass', 'Bass'], ['piano', 'Piano'], ['theory', 'Theory'],
                       ['production', 'Production'], ['ear', 'Ear training']];
let drillKind = 'all';
const ytId = u => (String(u || '').match(/[?&]v=([\w-]{11})/)
  || String(u || '').match(/youtu\.be\/([\w-]{11})/) || [])[1] || '';
const durShort = d => {
  const m = String(d || '').match(/^(?:(\d+):)?(\d+):(\d+)$/);
  if (!m) return '';
  const mins = (+m[1] || 0) * 60 + (+m[2]) + (+m[3] >= 30 ? 1 : 0);
  return mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60 ? (mins % 60) + ' min' : ''}`.trim() : `${Math.max(1, mins)} min`;
};
function drillItems(shelf) {
  const DR = C.drills || {};
  const out = [];
  const tempo = d => { const cur = ds(d.id).tempo_current;
    return cur ? `&#9833;=${cur}${d.tempo_target ? ` of ${d.tempo_target}` : ''}` : ''; };
  ((DR.technique || {})[shelf] || []).forEach(d => out.push({kind: 'drill', title: d.title, go: 'technique:' + d.id, meta: tempo(d)}));
  (DR.routines || []).filter(r => r.instrument === shelf)
    .forEach(r => out.push({kind: 'drill', title: r.title, go: 'routine:' + r.id, meta: tempo(r)}));
  (DR.watch || []).filter(w => (w.instrument || 'theory') === shelf)
    .forEach(w => out.push({kind: 'video', title: w.title, go: 'watch:' + w.id, meta: durShort(w.duration),
      pic: w.thumb ? 'data:image/webp;base64,' + w.thumb
         : (LOCAL && ytId(w.url)) ? `https://i.ytimg.com/vi/${ytId(w.url)}/mqdefault.jpg` : ''}));
  (DR.methodology || []).filter(m => (m.instrument || 'theory') === shelf)
    .forEach(m => out.push({kind: 'read', title: m.title, go: 'method:' + m.id, meta: ''}));
  const rank = {drill: 0, video: 1, read: 2};
  return out.sort((a, b) => rank[a.kind] - rank[b.kind]
    || a.title.localeCompare(b.title, undefined, {numeric: true, sensitivity: 'base'}));
}
const KIND_MARK = {drill: '', video: '&#9654; Video', read: 'Read'};
function drillsView(shelf) {
  const earSet = AUDIO_OK && EAR.length;
  if (!shelf) {
    const tiles = DRILL_SHELVES.map(([k, label]) => {
      const n = drillItems(k).length + (k === 'ear' && earSet ? 1 : 0);
      return n ? `<button class="shelf-tile" data-goto="drills:${k}"><span class="shelf-n">${label}</span>
        <span class="shelf-c">${n}</span></button>` : '';
    }).join('');
    return `<div class="view drillsview"><h2 class="vh">Drills</h2>
      <div class="shelf-tiles">${tiles}</div></div>`;
  }
  const label = (DRILL_SHELVES.find(x => x[0] === shelf) || [])[1] || shelf;
  const all = drillItems(shelf);
  const kinds = ['drill', 'video', 'read'].filter(k => all.some(i => i.kind === k));
  if (drillKind !== 'all' && !kinds.includes(drillKind)) drillKind = 'all';
  const shown = drillKind === 'all' ? all : all.filter(i => i.kind === drillKind);
  const KL = {all: 'All', drill: 'Drills', video: 'Videos', read: 'Reading'};
  const chips = kinds.length > 1 ? `<div class="chips">${['all', ...kinds].map(k =>
    `<button type="button" class="chip" data-drillkind="${k}" aria-pressed="${drillKind === k}">${KL[k]}</button>`).join('')}</div>` : '';
  const tile = i => `<button class="dtile" data-goto="${esc(i.go)}">
      <span class="dtile-t">${esc(i.title)}</span>${
      (KIND_MARK[i.kind] || i.meta) ? `<span class="dtile-b">${[KIND_MARK[i.kind], i.meta].filter(Boolean).join(' · ')}</span>` : ''}</button>`;
  /* A video keeps its thumbnail (Nate: "I want video thumbnails to still show"). A picture tile and
     a text tile do not sit well in one grid, so the page runs drills, then the videos as a grid of
     thumbnails, then the reading — one flow, no headings; the chips still narrow it. The picture
     comes straight from YouTube; if it cannot load (offline) the tile falls back to its name. */
  const vtile = i => `<button class="vtile" data-goto="${esc(i.go)}">
      <span class="vthumb"><img data-ytt="1" alt="" width="320" height="180" decoding="async" src="${esc(i.pic)}"><span class="vplay" aria-hidden="true">&#9654;</span>${
        i.meta ? `<span class="vdur">${i.meta}</span>` : ''}</span>
      <span class="vtile-t">${esc(i.title)}</span></button>`;
  const vids = shown.filter(i => i.kind === 'video' && i.pic);
  const plain = shown.filter(i => !(i.kind === 'video' && i.pic));
  const reads = plain.filter(i => i.kind === 'read');
  const earTile = shelf === 'ear' && earSet && drillKind === 'all' ? (LOCAL ? `<a class="dtile" href="../ear/">
      <span class="dtile-t">Ear Training app</span></a>` : `<button class="dtile" data-nav="ear">
      <span class="dtile-t">Ear training set</span><span class="dtile-b">${EAR.length} clips</span></button>`) : '';
  return `<div class="view drillsview">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="drills">&larr; Drills</button></div>
    <h2 class="vh">${esc(label)}</h2>
    ${chips}
    ${earTile || plain.length ? `<div class="dtiles">${earTile}${plain.filter(i => i.kind !== 'read').map(tile).join('')}</div>` : ''}
    ${vids.length ? `<div class="vtiles">${vids.map(vtile).join('')}</div>` : ''}
    ${reads.length ? `<div class="dtiles">${reads.map(tile).join('')}</div>` : ''}</div>`;
}

/* A video to watch and play along with, on a page of its own. In the app the player is on the
   page; the single-file artifact cannot frame YouTube (its CSP forbids it), so there it is a
   plain link out — and it must be a real <a href>, which is the only way out of that frame. */
function watchView(id) {
  const w = ((C.drills || {}).watch || []).find(x => x.id === id);
  if (!w) return drillNotFound(id, 'Video');
  const back = drillOut(), vid = ytId(w.url);
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="${esc(back)}">&larr; Back</button>
      ${w.channel ? `<span class="pill">${esc(w.channel)}</span>` : ''}
      ${durShort(w.duration) ? `<span class="pill">${durShort(w.duration)}</span>` : ''}</div>
    <h2 class="vh">${esc(w.title)}</h2>
    ${LOCAL && vid ? `<div class="ytbox"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="${esc(w.title)}"
        loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div>` : ''}
    ${w.url ? `<div><a class="btn ${LOCAL && vid ? 'btn-quiet' : 'btn-go'}" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">&#9654; ${
        LOCAL && vid ? 'Open in YouTube' : 'Watch on YouTube (opens new tab)'}</a></div>` : ''}
    ${READING[w.read] ? `<div class="card dread"><div class="prose">${READING[w.read].html}</div></div>` : ''}</div>`;
}
/* A note on practice method: something to read, not to log. */
function methodView(id) {
  const m = ((C.drills || {}).methodology || []).find(x => x.id === id);
  if (!m) return drillNotFound(id, 'Note');
  const back = drillOut(), r = READING[m.read];
  return `<div class="view">
    <div class="row" style="gap:8px"><button class="btn btn-quiet" data-nav="${esc(back)}">&larr; Back</button></div>
    <h2 class="vh">${esc(m.title)}</h2>
    ${r ? `<div class="card dread"><div class="prose">${r.html}</div></div>`
        : m.lede ? `<div class="card dread"><div class="prose"><p>${esc(m.lede)}</p></div></div>` : ''}
    ${SRC_INDEX[(m.title || '').toLowerCase()] ? `<p class="calnote" style="margin:0">The whole note:
      <button type="button" class="xlink xlink-read" data-goto="source:${esc(SRC_INDEX[m.title.toLowerCase()])}">${esc(m.title)}</button></p>` : ''}</div>`;
}

/* ================================================================== THE APP BUILD: your own files
   Everything from here to render() exists only in the installable app (`LOCAL`). The single-file
   artifact page never calls into it.

   WHAT IT IS FOR. The app is public, so it ships nothing it has no right to hand out: no pages of
   a book still in copyright, no chord-chart PDFs, no album art, no vendor screenshots. Wherever
   the school expects one of those, build.py leaves a NAMED SLOT instead, and the reader fills it
   with their own copy:

     * a book        BOOKPAGES[bid].byo — the lesson's page fold asks for the PDF, then draws the
                     cited pages from it (pdf.js, on the device);
     * a chart       SONGS[sid].chart_files names the PDFs a song had; any file can be added too;
     * a sleeve      SONGS[sid].cover_file names the image; without one the lettered tile stands;
     * anything a note embeds (`![[File.pdf]]`) that is not in the repo — a `.byo` block in the
       note's HTML carrying the file name.

   The join is the FILE NAME, everywhere. That is what makes "add a folder" work: point it at a
   folder of your own files and each one lands in the slot that names it; the rest are ignored.

   WHERE THE FILES GO: IndexedDB in this browser (app-shell/files.js). They are not part of a
   backup or of the progress an account carries. A member's device fetches them from the account's
   private bucket; an owner's additions are sent up to it. Clearing the browser's site data
   removes the copies on this device. */
const fhas = n => !!(FILES && n && FILES.has(n));
const fkey = n => FILES ? FILES.norm(n) : '';
const fext = n => (String(n || '').match(/\.([A-Za-z0-9]+)$/) || [0, ''])[1].toLowerCase();
const fkind = n => { const e = fext(n);
  return /^(png|jpe?g|webp|gif|bmp)$/.test(e) ? 'img' : e === 'pdf' ? 'pdf'
    : /^(mp4|mov|m4v|webm)$/.test(e) ? 'video' : /^(mp3|m4a|wav|ogg)$/.test(e) ? 'audio'
    : /^(txt|md|cho|crd|chordpro|tab)$/.test(e) ? 'text' : 'file'; };
const fsize = n => n < 1048576 ? `${Math.max(1, Math.round(n / 1024))} KB`
  : `${(n / 1048576).toFixed(n < 10485760 ? 1 : 0)} MB`;
const ACCEPT = {img: 'image/*', pdf: 'application/pdf,.pdf', video: 'video/*', audio: 'audio/*',
                text: 'text/plain,.txt', file: ''};
const CHART_ACCEPT = 'application/pdf,.pdf,image/*,text/plain,.txt';
/* A <label> wrapping a hidden file input — the same construction PATCH-146's upload button uses,
   for the same reason: it is a real control, so the keyboard and a screen reader get it free. */
const addBtn = (spec, label, accept, multi) => `<label class="lnkedit upbtn">${label}<input type="file"${
  multi ? ' multiple' : ''}${accept ? ` accept="${accept}"` : ''} data-fadd="${esc(spec)}" hidden></label>`;
const bookOffset = bid => { try { return +localStorage.getItem('school:offset:' + bid) || 0; }
                            catch (e) { return 0; } };

/** The sleeve this device has for a song: the file its note names, else one attached by hand. */
function coverKey(s) {
  if (!FILES) return '';
  if (fhas(s.cover_file)) return fkey(s.cover_file);
  const l = FILES.linked('cover:' + s.id)[0];
  return l ? l.key : '';
}
/** The charts this device has for a song — the named ones first, then anything attached by hand. */
/** Where a file that came with the app is served from. */
function shippedURL(name) { return 'files/' + encodeURIComponent(name); }
function songCharts(sid) {
  const s = SONGS[sid] || {}, out = [], seen = new Set();
  const take = m => { if (m && !seen.has(m.key)) { seen.add(m.key); out.push(m); } };
  (s.chart_files || []).forEach(n => take(FILES.get(n)));
  FILES.linked('chart:' + sid).forEach(take);
  return out;
}
function chartBlockLocal(sid) {
  if (!FILES) return '';
  const s = SONGS[sid] || {}, have = songCharts(sid), shipped = s.chart_shipped || [];
  const missing = (s.chart_files || []).filter(n => !fhas(n));
  return `<div class="ovsec chartsec">
    <div class="dhead"><p class="eyebrow">Chord chart${have.length === 1 ? '' : 's'}</p>
      <span class="rule"></span><span class="cnt">${shipped.length ? `${shipped.length} included` : ''}${
        shipped.length && have.length ? ' · ' : ''}${have.length ? `${have.length} on this device`
        : shipped.length ? '' : 'none added yet'}</span></div>
    ${shipped.map(n => {
      const k = sid + ':ship:' + n;
      return `<details class="rd chart" data-chart="${esc(k)}"${chartOpen.has(k) ? ' open' : ''}>
        <summary><span class="rd-t">${esc(n.replace(/\.[^.]+$/, ''))}</span>
          <span class="rd-m">included</span></summary>
        <div class="rd-b"><div class="fview" data-fship="${esc(n)}"></div></div></details>`;
    }).join('')}
    ${have.map(m => {
      const k = sid + ':' + m.key;
      return `<details class="rd chart" data-chart="${esc(k)}"${chartOpen.has(k) ? ' open' : ''}>
        <summary><span class="rd-t">${esc(m.name.replace(/\.[^.]+$/, ''))}</span>
          <span class="rd-m">${fsize(m.size)} · your copy</span></summary>
        <div class="rd-b"><div class="fview" data-fview="${esc(m.key)}"></div>
        <p class="byo-act"><button type="button" class="lnkedit" data-frm="${esc(m.key)}"
          data-frm-link="chart:${esc(sid)}">Remove</button></p></div></details>`;
    }).join('')}
    ${missing.map(n => waiting(n) || `<div class="byo-miss"><span class="byo-n">${esc(n)}</span>
      <span class="byo-m">A chart this song's note uses. It is not included with the app.</span>
      ${addBtn('file:' + n, '+ add your copy', CHART_ACCEPT)}</div>`).join('')}
    <p class="byo-act">${addBtn('chart:' + sid, '+ add a chart', CHART_ACCEPT, true)}
      ${lite('<span class="byo-m">A PDF, a photo or a text file. It stays on this device.</span>', '')}</p></div>`;
}
/** A slot whose file the account has: start fetching it and say so. '' when the account does not
    have it (or the download failed), which is the caller's cue to offer "add your copy". */
function waiting(name) {
  if (!cloudHas(name) || fetchFailed(name)) return '';
  ensureFile(name);
  return `<div class="byo-miss byo-wait"><span class="byo-n">${esc(name)}</span>
    <span class="byo-m">Downloading from your account…</span></div>`;
}
/** The small line under a song's title that adds, changes or removes its sleeve. */
function coverControl(s) {
  if (!LOCAL || !FILES || !FILES.ok()) return '';
  const k = coverKey(s);
  return `<p class="byo-act songhead-c">${addBtn('cover:' + s.id, k ? 'Change cover' : '+ add cover art', 'image/*')}${
    k ? `<button type="button" class="lnkedit" data-frm="${esc(k)}" data-frm-link="cover:${esc(s.id)}">Remove</button>` : ''}</p>`;
}

/* One rendered PDF page. The figure reserves its height while the page is drawn so the lesson does
   not jump as pages arrive, and the image is only drawn once it is near the screen: a Leavitt
   lesson cites up to twenty pages and a phone should render the two you are looking at. */
const PAGE_PX = Math.min(1600, Math.round(1100 * Math.min(2, window.devicePixelRatio || 1)));
const pageFig = (id, n, cap) => `<figure class="bkpg fpg loading"><img data-bkzoom="1" data-fid="${
  esc(id)}" data-fpage="${n}" alt="${esc(cap || 'Page ' + n)}" title="Click to open it at full size">${
  cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
function drawPage(img) {
  const fig = img.closest('figure');
  FILES.pageURL(img.dataset.fid, +img.dataset.fpage, PAGE_PX).then(u => {
    img.src = u; if (fig) fig.classList.remove('loading');
  }).catch(() => { if (fig) { fig.classList.remove('loading'); fig.classList.add('fail'); } });
}
const pageIO = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  pageIO.unobserve(e.target);
  const img = e.target.querySelector('img[data-fpage]'); if (img) drawPage(img);
}), {rootMargin: '900px 0px'}) : null;
function lazyPage(img) {
  img.dataset.on = '1';
  if (pageIO && img.parentElement) pageIO.observe(img.parentElement); else drawPage(img);
}

/** Draw one file into `box`. `ref` is {key,name,file} for the reader's own copy, or {url,name}
    for one that ships with the app (docs/files/). `file` is the name actually picked, which is
    what decides how to show it — a photo added to a slot named "…pdf" is still a photo. */
function mountView(box, ref) {
  box.dataset.filled = '1';
  const kind = fkind(ref.file || ref.name), id = ref.key ? 'k:' + ref.key : 'u:' + ref.url;
  const src = () => ref.key ? FILES.url(ref.key) : Promise.resolve(ref.url);
  const rm = ref.rm ? `<p class="byo-act"><span class="byo-m">${esc(ref.name)} · your copy</span>
    <button type="button" class="lnkedit" data-frm="${esc(ref.key)}">Remove</button></p>` : '';
  if (kind === 'img') {
    box.innerHTML = `<figure class="bkpg fimg"><img data-bkzoom="1" decoding="async" loading="lazy"
      alt="${esc(ref.name)}" title="Click to open it at full size"></figure>${rm}`;
    src().then(u => { const i = box.querySelector('img'); if (i && u) i.src = u; });
  } else if (kind === 'pdf') {
    box.innerHTML = `<p class="byo-m">Opening ${esc(ref.name)}…</p>`;
    FILES.pageCount(id).then(n => {
      box.innerHTML = Array.from({length: n}, (_, i) =>
        pageFig(id, i + 1, n > 1 ? `Page ${i + 1} of ${n}` : '')).join('') + rm;
      box.querySelectorAll('img[data-fpage]').forEach(lazyPage);
    }).catch(() => { box.innerHTML = `<p class="byo-m">${esc(ref.name)} could not be opened as a PDF.</p>${rm}`; });
  } else if (kind === 'video' || kind === 'audio') {
    box.innerHTML = `<${kind} class="byo-media" controls preload="metadata"></${kind}>${rm}`;
    src().then(u => { const m = box.querySelector(kind); if (m && u) m.src = u; });
  } else if (kind === 'text' && ref.key) {
    box.innerHTML = `<pre class="chartbody"></pre>${rm}`;
    FILES.text(ref.key).then(t => { const pre = box.querySelector('pre'); if (pre) pre.textContent = t; });
  } else {
    box.innerHTML = `<p class="resfile"><span class="resfile-n">${esc(ref.name)}</span>
      <span class="resfile-m">On this device — not a format this page can show.</span></p>${rm}`;
  }
}
/** A slot in a note: the file if it shipped, your copy if you added one, the ask if neither. */
function fillSlot(el) {
  if (el.closest('details:not([open])')) return;        // filled when its fold is opened
  const name = el.dataset.file;
  if (el.dataset.have) return mountView(el, {url: shippedURL((C.slots[name] || {}).src || name), name});
  if (!FILES || !FILES.ok()) { el.dataset.filled = '1'; return; }
  const m = FILES.get(name);
  if (m) return mountView(el, {key: m.key, name: m.name, file: m.file, rm: true});
  el.dataset.filled = '1';
  el.innerHTML = waiting(name) || `<div class="byo-miss"><span class="byo-n">${esc(name)}</span>
    <span class="byo-m">This note shows a file that is not included with the app.</span>
    ${addBtn('file:' + name, '+ add your copy', ACCEPT[fkind(name)])}</div>`;
}
/** A lesson's pages from the reader's own PDF of the book — or the ask, if there is none yet. */
function fillByoBook(det, body, bk) {
  const bid = det.dataset.bid, pgs = (det.dataset.pgs || '').split(',').filter(Boolean);
  if (!FILES || !FILES.ok()) {
    body.innerHTML = `<p class="bk-f"><b>${esc(bk.label)}</b><br>This browser will not store files,
      so the book cannot be added here.</p>`;
  } else if (!fhas(bk.file) && waiting(bk.file)) {
    body.innerHTML = `<div class="byo-miss byo-book byo-wait"><span class="byo-n">${esc(bk.label.split(' · ')[0])}</span>
      <span class="byo-m">Downloading the book from your account. It is a large file and only has to
      come down once; after that it is kept on this device.</span></div>`;
  } else if (!fhas(bk.file)) {
    body.innerHTML = `<div class="byo-miss byo-book"><span class="byo-n">${esc(bk.label.split(' · ')[0])}</span>
      <span class="byo-m">This course works from a book that is still in copyright, so its pages are
      not included with the app. Add your own PDF of it and ${pgs.length === 1 ? 'the page' : `the ${pgs.length} pages`}
      for this lesson appear here. The file stays on this device.</span>
      ${addBtn('book:' + bid, '+ add your PDF', ACCEPT.pdf)}</div>`;
  } else {
    const id = 'k:' + fkey(bk.file), off = bookOffset(bid);
    body.innerHTML = pgs.map(n => pageFig(id, bk.pages[n] + off, `${bk.cap || 'Page'} ${n}`)).join('')
      + `<p class="bk-f"><b>${esc(bk.label)}</b><br>${esc(bk.note)}</p>`;
    body.querySelectorAll('img[data-fpage]').forEach(lazyPage);
  }
  det.dataset.filled = '1';
}
/** Called at the end of every render(), and whenever a fold opens. Idempotent. */
function fillLocal() {
  if (!LOCAL) return;
  if (FILES) app.querySelectorAll('img[data-fthumb]:not([data-on])').forEach(img => {
    img.dataset.on = '1';
    FILES.thumbUrl(img.dataset.fthumb).then(u => { if (u) img.src = u; });
  });
  app.querySelectorAll('.byo[data-file]:not([data-filled])').forEach(fillSlot);
  app.querySelectorAll('.fview[data-fship]:not([data-filled])').forEach(v => {
    if (v.closest('details:not([open])')) return;
    mountView(v, {url: shippedURL(v.dataset.fship), name: v.dataset.fship});
  });
  if (FILES) app.querySelectorAll('.fview[data-fview]:not([data-filled])').forEach(v => {
    if (v.closest('details:not([open])')) return;
    const m = FILES.get(v.dataset.fview);
    if (m) mountView(v, {key: m.key, name: m.name, file: m.file});
  });
}

/* ------------------------------------------------------------------ every name the school expects
   key -> {name, kind, where[]}. Built once: it is a fact about the build, not about this device. */
let _slotReg = null;
function slotReg() {
  if (_slotReg) return _slotReg;
  const reg = new Map();
  const put = (name, kind, where) => {
    const k = fkey(name); if (!k) return;
    const e = reg.get(k) || {name, kind, where: []};
    if (where && e.where.indexOf(where) < 0) e.where.push(where);
    reg.set(k, e);
  };
  Object.values(BOOKPAGES).forEach(b => { if (b.byo) put(b.file, 'book', b.label.split(' · ')[0]); });
  Object.values(SONGS).forEach(s => {
    (s.chart_files || []).forEach(n => put(n, 'chart', s.title));
    if (s.cover_file) put(s.cover_file, 'cover', s.title);
  });
  Object.entries(C.slots || {}).forEach(([n, e]) => { if (!e.have && !reg.has(fkey(n))) put(n, 'note', ''); });
  return (_slotReg = reg);
}

/** One or many files picked through any of the add buttons. `spec` says what they are for:
    book:<id> · file:<slot name> · cover:<song> · chart:<song> · any · folder. */
async function handleAdd(inp) {
  const spec = inp.dataset.fadd, picked = Array.from(inp.files || []);
  inp.value = '';                                  // so re-picking the same file fires again
  if (!picked.length) return;
  if (!FILES || !FILES.ok()) return toast('This browser will not store files (private browsing?).');
  const i = spec.indexOf(':'), kind = i < 0 ? spec : spec.slice(0, i), arg = i < 0 ? '' : spec.slice(i + 1);
  const reg = slotReg(), todo = [], failed = [];
  let passed = 0;
  for (const f of picked) {
    if (kind === 'book') {
      if (fkind(f.name) !== 'pdf') { failed.push(`${f.name} (a book has to be a PDF)`); continue; }
      todo.push([f, {as: (BOOKPAGES[arg] || {}).file || f.name}]);
    } else if (kind === 'file') todo.push([f, {as: arg}]);
    else if (kind === 'cover') {
      const s = SONGS[arg] || {};
      if (fkind(f.name) !== 'img' && !/^image\//.test(f.type)) { failed.push(`${f.name} (not a picture)`); continue; }
      todo.push([f, s.cover_file ? {as: s.cover_file} : {link: 'cover:' + arg}]);
    } else if (kind === 'chart') todo.push([f, {link: 'chart:' + arg}]);
    else if (reg.has(fkey(f.name))) todo.push([f, {}]);
    else passed++;                                 // a bulk add only takes names the school knows
  }
  if (kind === 'cover' && todo.length && !(SONGS[arg] || {}).cover_file) {
    for (const m of FILES.linked('cover:' + arg)) {      // one sleeve per song: the new one replaces
      try { m.links.length > 1 ? await FILES.unlink(m.key, 'cover:' + arg) : await FILES.remove(m.key); }
      catch (e) { /* the new one is still added below */ }
    }
  }
  let added = 0;
  if (todo.length > 3) toast(`Adding ${todo.length} files…`);
  for (const [f, opt] of todo) {
    try { await FILES.add(f, opt); added++; }
    catch (e) { failed.push(`${f.name} (${e && e.name === 'QuotaExceededError' ? 'no room left on this device' : 'could not be stored'})`); }
    if (added && added % 25 === 0 && todo.length > 25) toast(`Added ${added} of ${todo.length}…`);
  }
  render();
  const bits = [`${added} file${added === 1 ? '' : 's'} added`];
  if (passed) bits.push(`${passed} skipped — the name matches nothing the school uses`);
  if (failed.length) bits.push(`not added: ${failed.slice(0, 3).join(' · ')}${failed.length > 3 ? ` and ${failed.length - 3} more` : ''}`);
  toast(bits.join(' · ') + '.');
  // An owner adding a file to a named slot is also how the account gets it, for every other
  // device and every other member.
  if (added && cloudFiles.owner) { await cloudRefresh(); pushFilesToCloud(); }
}
/** Remove needs two taps: a book is tens of megabytes and one stray tap should not cost a re-add. */
async function handleRemove(t) {
  if (!t.dataset.armed) {
    const was = t.textContent;
    t.dataset.armed = '1'; t.textContent = 'Tap again to remove';
    setTimeout(() => { if (t.isConnected) { delete t.dataset.armed; t.textContent = was; } }, 4000);
    return;
  }
  const key = t.dataset.frm, link = t.dataset.frmLink || '', m = FILES.get(key);
  if (!m) return render();
  try {
    // A file attached to one song but ALSO filling a named slot (or another song) only loses the
    // link; it is deleted when nothing else has a use for it.
    const others = m.links.filter(l => l !== link).length + (slotReg().has(key) && link && m.links.includes(link) ? 1 : 0);
    if (link && m.links.includes(link) && others) await FILES.unlink(key, link);
    else await FILES.remove(key);
    toast('Removed from this device.');
  } catch (e) { toast('Could not remove it.'); }
  render();
}

/* ------------------------------------------------------------------ the "My files" page */
const filesOpen = new Set(['book']);
let storageNote = '';
function filesView() {
  if (!FILES || !FILES.ok()) return `<div class="view"><div><p class="eyebrow">On this device</p>
    <h2 class="vh">My files</h2><p class="lede" style="margin-top:8px">This browser will not let the
    app store files — usually private browsing, or storage switched off for this site — so nothing
    can be added here. Everything else in the school works as normal.</p></div></div>`;
  const reg = slotReg(), all = FILES.all();
  if (navigator.storage && navigator.storage.estimate && !filesView.asked) {
    filesView.asked = true;
    FILES.usage().then(u => {
      if (u && u.quota) storageNote = ` · this browser allows about ${fsize(u.quota)}`;
      if (route === 'files') render();
    });
  }
  const row = (k, e) => {
    const m = FILES.get(k);
    const off = e.kind === 'book' && m ? Object.keys(BOOKPAGES).find(b => BOOKPAGES[b].byo && fkey(BOOKPAGES[b].file) === k) : '';
    return `<div class="frow${m ? ' on' : ''}">
      <span class="fr-s" aria-hidden="true">${m ? '✓' : ''}</span>
      <span class="fr-n">${esc(e.name)}${e.where.length ? `<span class="fr-w">${esc(e.where.slice(0, 3).join(' · '))}${
        e.where.length > 3 ? ` +${e.where.length - 3}` : ''}</span>` : ''}</span>
      ${m ? `<span class="fr-m">${fsize(m.size)}</span>
             <button type="button" class="lnkedit" data-frm="${esc(k)}">Remove</button>`
          : cloudHas(e.name) ? `<span class="fr-m fr-c">in your account</span>`
          : addBtn('file:' + e.name, '+ add', e.kind === 'chart' ? CHART_ACCEPT : ACCEPT[fkind(e.name)])}
      ${off ? `<label class="fr-off">Page offset <input type="number" step="1" min="-20" max="20"
        value="${bookOffset(off)}" data-foff="${esc(off)}" aria-label="Page offset for this book">
        <span>If lessons show the wrong page, nudge this: +1 shows the next page of your PDF, −1 the one before.</span></label>` : ''}
    </div>`;
  };
  const group = ([kind, title, blurb]) => {
    const items = [...reg.entries()].filter(([, e]) => e.kind === kind)
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
    if (!items.length) return '';
    const got = items.filter(([k]) => FILES.has(k)).length;
    const acct = items.filter(([k, e]) => !FILES.has(k) && cloudHas(e.name)).length;
    return `<details class="rd fgrp" data-fgrp="${kind}"${filesOpen.has(kind) ? ' open' : ''}>
      <summary><span class="rd-t">${title}</span><span class="rd-m">${got} of ${items.length} on this device${
        acct ? ` · ${acct} more in your account` : ''}</span>
        ${lite(`<span class="rd-l">${blurb}</span>`, '')}</summary>
      <div class="rd-b flist">${items.map(([k, e]) => row(k, e)).join('')}</div></details>`;
  };
  // Files attached by hand to one song (no named slot) — listed so they can be found and removed.
  const loose = all.filter(m => !reg.has(m.key));
  const looseWhere = m => m.links.map(l => {
    const [what, sid] = [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1)];
    const s = SONGS[sid];
    return s ? `${what === 'cover' ? 'cover for' : 'chart for'} ${s.title}` : '';
  }).filter(Boolean).join(' · ');
  let dir = 'webkitdirectory' in document.createElement('input');
  try { if (!window.matchMedia('(pointer:fine)').matches) dir = false; } catch (e) { dir = false; }
  return `<div class="view filesv">
    <div><p class="eyebrow">On this device</p><h2 class="vh">My files</h2>
      <p class="lede" style="margin-top:8px">Some things the school uses can't be given away with
      it: a book that is still in copyright, chord charts, album art, a few screenshots and
      handouts. ${who() && cloudFiles.member ? 'Your account carries them, so they arrive on their own.'
        : 'Add your own copies here and they show up where they belong. They are kept in this browser, on this device.'}</p></div>
    <div class="card"><div class="spread fadd">
      <div style="font-size:12.5px;color:var(--muted);max-width:60ch">${lite(`<b>Add many at once.</b> Files
        are matched by name, so you can pick a whole pile${dir ? ' or a whole folder' : ''} — the ones
        the school has a place for are kept and the rest are left alone.`, '')}</div>
      <div class="row">${addBtn('any', '+ add files', '', true)}${dir
        ? `<label class="lnkedit upbtn">+ add a folder<input type="file" webkitdirectory multiple data-fadd="folder" hidden></label>` : ''}</div></div>
      <p class="calnote" style="margin:10px 0 0">${all.length ? `${all.length} file${all.length === 1 ? '' : 's'} on this
        device, ${fsize(FILES.bytes())}` : 'Nothing added on this device yet'}${esc(storageNote)}.${lite(` Backups and sync carry your progress only —
        files stay on the device they were added on.`, '')}</p>
      ${who() && cloudFiles.member ? `<p class="calnote" style="margin:8px 0 0">${lite(`<b>Your account has the school's files.</b>
        Each one downloads the first time it is needed and is then kept on this device.`, '')}${
        cloudFiles.owner ? (pushing ? ` Sending to your account: ${pushing.done} of ${pushing.total}…`
          : cloudMissing().length ? ` ${cloudMissing().length} file${cloudMissing().length === 1 ? '' : 's'} here ${cloudMissing().length === 1 ? 'is' : 'are'} not in your account yet.
            <button type="button" class="lnkedit" data-fpush="1">Send to my account</button>`
          : lite(' Files you add here are sent to your account for your other devices and anyone you have added.', '')) : ''}</p>` : ''}</div>
    <div class="fgrps">${[
      ['book', 'Books', 'A PDF of your own copy. Lessons show the pages they cite.'],
      ['chart', 'Chord charts', 'The charts the song notes were written from, by file name.'],
      ['cover', 'Album art', 'Sleeves are looked up online by album. A copy of your own here is used instead.'],
      ['note', 'Pictures and handouts in notes', 'Screenshots, scans and PDFs that notes show in place.'],
    ].map(group).join('')}
    ${loose.length ? `<details class="rd fgrp" data-fgrp="loose"${filesOpen.has('loose') ? ' open' : ''}>
      <summary><span class="rd-t">Added to one song</span><span class="rd-m">${loose.length} file${loose.length === 1 ? '' : 's'}</span>
        <span class="rd-l">Charts and covers you attached from a song's own page.</span></summary>
      <div class="rd-b flist">${loose.map(m => `<div class="frow on"><span class="fr-s" aria-hidden="true">✓</span>
        <span class="fr-n">${esc(m.name)}<span class="fr-w">${esc(looseWhere(m))}</span></span>
        <span class="fr-m">${fsize(m.size)}</span>
        <button type="button" class="lnkedit" data-frm="${esc(m.key)}">Remove</button></div>`).join('')}</div></details>` : ''}
    </div></div>`;
}

/* ------------------------------------------------------------------ backup, and the account
   BACKUP is the whole progress block as one JSON file — the same shape as the vault's
   progress-<user>.json, so a file exported here is also what build.py --artifact seeds from.

   THE ACCOUNT is Music's (../shared/cloud.js): one email sign-in for every tool, on a Supabase
   project. School uses it for two things.

     PROGRESS. One document per person (`app_data`, app = 'school'), readable and writable by
     that person alone. Progress is ONE document and it syncs as one: whichever side saved last
     wins, and it only counts as a conflict when BOTH sides changed since they last agreed
     (`SYNC_BASE`). The losing copy of a conflict is kept on the device (`LS_OTHER`) so nothing
     is ever silently dropped. Signed out, or with no account service configured, the school
     simply keeps saving on the device.

     FILES. What the app cannot publish (chord charts, album art, a book in copyright, the
     screenshots notes embed) lives in a PRIVATE bucket, `school-files`. People on the members
     list get those files without doing anything: a slot that names a file the bucket has
     fetches it, keeps it on the device (so it is there offline), and shows it. An OWNER fills
     the bucket just by adding files here — anything they add to a named slot is also sent up.
     Objects are named by a hash of the file name: storage keys cannot hold every character a
     file name can, and the name is the only join there is. */
const CLOUD = LOCAL && window.MusicCloud && window.MusicCloud.configured ? window.MusicCloud : null;
const CLOUD_APP = 'school', BUCKET = 'school-files';
const SYNC_AT = 'school:syncedAt', SYNC_BASE = 'school:syncBase', SYNC_USER = 'school:syncUser';
const LS_OTHER = 'school:progress:other', LS_CLOUD_FILES = 'school:cloudFiles';
const lsGet = k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } };
const lsSet = (k, v) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} };
const syncState = {busy: false, err: '', note: '', form: ''};
const who = () => CLOUD ? CLOUD.user() : null;
let syncTimer = null;
function syncSoon(ms) {
  if (!CLOUD || !who()) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncNow(false), ms === undefined ? 4000 : ms);
}
/** Replace this device's progress with `prog` and start again from it. */
function adoptProgress(prog, at) {
  lsSet(LS_KEY, JSON.stringify(prog)); lsSet(LS_AT, at);
  pending = false;
  try { sessionStorage.setItem(ROUTE_KEY, route); } catch (e) {}
  location.reload();
}
async function syncNow(manual) {
  if (!CLOUD || !who() || syncState.busy) return;
  if (pending) saveLocal();
  if (sessionLive() && !manual) return syncSoon(30000);       // never reload out from under a quiz
  syncState.busy = true; syncState.err = ''; paintSync();
  try {
    const me = who();
    // A different person signing in on this device starts from THEIR account, never from the
    // progress the last person left here — that copy is set aside, not uploaded as theirs.
    const lastUser = lsGet(SYNC_USER), stranger = !!lastUser && lastUser !== me.id;
    const remote = await CLOUD.load(CLOUD_APP);
    const mine = stranger ? '' : lsGet(LS_KEY), localAt = stranger ? '' : lsGet(LS_AT);
    const base = stranger ? '' : lsGet(SYNC_BASE);
    const push = async () => {
      const at = lsGet(LS_AT) || new Date().toISOString();
      if (!lsGet(LS_AT)) lsSet(LS_AT, at);
      await CLOUD.save(CLOUD_APP, {savedAt: at, progress: JSON.parse(lsGet(LS_KEY) || JSON.stringify(P))});
      lsSet(SYNC_BASE, at);
    };
    let took = false;
    if (stranger && lsGet(LS_KEY)) lsSet(LS_OTHER, lsGet(LS_KEY));
    if (!remote || !remote.progress) {
      if (stranger) { lsSet(SYNC_USER, me.id); syncState.busy = false; return adoptProgress({user: 'me'}, new Date().toISOString()); }
      await push(); syncState.note = 'This device’s progress is now saved to your account.';
    }
    else if (!mine) took = true;                                // a device that has saved nothing yet
    else if (remote.savedAt === localAt) lsSet(SYNC_BASE, localAt);
    else if (localAt === base) took = true;                     // only the other side moved
    else if (remote.savedAt === base) await push();             // only this side moved
    else if (remote.savedAt > localAt) { lsSet(LS_OTHER, mine); took = true;
      syncState.note = 'Another device had newer progress, so that is what is here now. What this device had is kept below.'; }
    else { lsSet(LS_OTHER, JSON.stringify(remote.progress)); await push();
      syncState.note = 'This device had the newer progress and it was kept. The other copy is kept below.'; }
    // Milliseconds, as a string: the Music home screen reads this key (apps.js `sync.at`) to show
    // when School last synced, and to know its "sync everything" pass has finished here.
    lsSet(SYNC_AT, String(Date.now())); lsSet(SYNC_USER, me.id);
    if (took) { lsSet(SYNC_BASE, remote.savedAt); syncState.busy = false; return adoptProgress(remote.progress, remote.savedAt); }
  } catch (e) {
    syncState.err = (e && e.message) || 'Sync failed.';
    if (manual) toast(syncState.err);
  }
  syncState.busy = false; paintSync();
  if (manual && !syncState.err) toast('Synced.');
}
function paintSync() { if (route === 'sync') render(); }

/* ---- the account's private files ---- */
const cloudFiles = {keys: new Set(), names: new Map(), member: false, owner: false, loaded: false};
try { JSON.parse(lsGet(LS_CLOUD_FILES) || '[]').forEach(k => cloudFiles.keys.add(k)); } catch (e) {}
async function cloudKeyOf(name) {
  const k = fkey(name);
  if (cloudFiles.names.has(k)) return cloudFiles.names.get(k);
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(k));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 40);
  const key = hex + (fext(name) ? '.' + fext(name) : '');
  cloudFiles.names.set(k, key);
  return key;
}
/** Synchronous once the names are hashed (cloudRefresh does that for every slot at start-up). */
const cloudHas = name => !!(CLOUD && who() && name && cloudFiles.keys.has(cloudFiles.names.get(fkey(name))));
async function cloudRefresh() {
  if (!CLOUD || !FILES) return;
  await CLOUD.ready;
  if (!who()) { cloudFiles.member = cloudFiles.owner = false; cloudFiles.loaded = true; return; }
  if (window.crypto && crypto.subtle) await Promise.all([...slotReg().values()].map(e => cloudKeyOf(e.name)));
  try {
    const m = await CLOUD.member();
    cloudFiles.member = m.member; cloudFiles.owner = m.owner;
    if (m.member) {
      const list = await CLOUD.listFiles(BUCKET);
      cloudFiles.keys = new Set(list.map(f => f.name));
      lsSet(LS_CLOUD_FILES, JSON.stringify([...cloudFiles.keys]));
    } else { cloudFiles.keys = new Set(); lsSet(LS_CLOUD_FILES, null); }
  } catch (e) { /* offline: the saved list stands */ }
  cloudFiles.loaded = true;
  render();
}
/* Fetch one named file from the account onto this device. At most three at a time, each name
   once; when a batch lands the page is redrawn so every slot that was waiting fills. */
const fetching = new Map(), fetchQueue = [];
let fetchActive = 0, fetchPaint = null;
function ensureFile(name) {
  const k = fkey(name);
  if (!cloudHas(name) || fhas(name)) return;
  if (fetching.has(k)) return;
  fetching.set(k, 'wait'); fetchQueue.push(name); pumpFetch();
}
function pumpFetch() {
  while (fetchActive < 3 && fetchQueue.length) {
    const name = fetchQueue.shift(), k = fkey(name);
    fetchActive++;
    (async () => {
      try {
        const blob = await CLOUD.download(BUCKET, cloudFiles.names.get(k));
        await FILES.add(new File([blob], name, {type: blob.type || ''}), {as: name});
        fetching.delete(k);
      } catch (e) { fetching.set(k, 'fail'); }
      fetchActive--;
      clearTimeout(fetchPaint); fetchPaint = setTimeout(render, fetchQueue.length ? 1200 : 150);
      pumpFetch();
    })();
  }
}
const fetchFailed = name => fetching.get(fkey(name)) === 'fail';
/** An owner's local copies of named-slot files that the account does not have yet. */
const cloudMissing = () => !FILES ? [] : FILES.all().filter(m =>
  slotReg().has(m.key) && cloudFiles.names.has(m.key) && !cloudFiles.keys.has(cloudFiles.names.get(m.key)));
let pushing = null;
async function pushFilesToCloud() {
  if (!CLOUD || !cloudFiles.owner || pushing) return;
  const todo = cloudMissing();
  if (!todo.length) return toast('Your account already has every file on this device.');
  pushing = {done: 0, total: todo.length, failed: []}; render();
  for (const m of todo) {
    try {
      const u = await FILES.url(m.key), blob = await (await fetch(u)).blob();
      await CLOUD.upload(BUCKET, cloudFiles.names.get(m.key), blob, m.type);
      cloudFiles.keys.add(cloudFiles.names.get(m.key));
    } catch (e) { pushing.failed.push(`${m.name}${e && e.tooBig ? ' (over the account’s size limit for one file)' : ''}`); }
    pushing.done++;
    if (route === 'files' || route === 'sync') render();
  }
  lsSet(LS_CLOUD_FILES, JSON.stringify([...cloudFiles.keys]));
  const f = pushing.failed; pushing = null; render();
  toast(f.length ? `Sent ${todo.length - f.length} of ${todo.length}. Not sent: ${f.slice(0, 3).join(' · ')}${f.length > 3 ? ` and ${f.length - 3} more` : ''}.`
                 : `Sent ${todo.length} file${todo.length === 1 ? '' : 's'} to your account.`);
}
async function accountSubmit(kind) {
  const email = (app.querySelector('[data-acct-email]') || {}).value || '';
  const pw = (app.querySelector('[data-acct-pw]') || {}).value || '';
  syncState.email = email.trim();          // the form is redrawn on every change of state; keep what was typed
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) return toast('Enter your email address.');
  if (kind !== 'reset' && pw.length < 8) return toast('Use a password of at least 8 characters.');
  syncState.busy = true; syncState.err = ''; paintSync();
  try {
    if (kind === 'reset') { await CLOUD.resetPassword(email); syncState.note = `A link to set a new password is on its way to ${email.trim()}.`; }
    else if (kind === 'up') {
      const r = await CLOUD.signUp(email, pw);
      syncState.note = r.confirm ? `Almost there. Open the link in the email sent to ${email.trim()}, then sign in here.` : '';
      syncState.form = '';
    } else { await CLOUD.signIn(email, pw); syncState.note = ''; }
  } catch (e) { syncState.err = (e && e.message) || 'That did not work.'; }
  syncState.busy = false;
  if (who()) { paintSync(); await cloudRefresh(); return syncNow(true); }
  paintSync();
}
function exportBackup() {
  if (pending) saveLocal();
  const blob = new Blob([JSON.stringify(P, null, 1)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `music-school-backup-${TODAY}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('Backup saved to your downloads.');
}
async function importBackup(inp) {
  const f = (inp.files || [])[0]; inp.value = '';
  if (!f) return;
  let o;
  try { o = JSON.parse(await f.text()); } catch (e) { return toast('That file is not a Music School backup.'); }
  if (o && o.savedAt && o.progress) o = o.progress;                       // a copy taken from the account
  const known = ['concepts', 'courses', 'classes', 'homework', 'tests', 'drills', 'assignments'];
  if (!o || typeof o !== 'object' || Array.isArray(o) || !known.some(k => o[k] && typeof o[k] === 'object'))
    return toast('That file is not a Music School backup.');
  if (pending) saveLocal();
  if (lsGet(LS_KEY)) lsSet(LS_OTHER, lsGet(LS_KEY));           // what was here can be put back
  adoptProgress(o, new Date().toISOString());
}
function restoreOther() {
  const other = lsGet(LS_OTHER);
  if (!other) return;
  if (pending) saveLocal();
  const cur = lsGet(LS_KEY);
  let o; try { o = JSON.parse(other); } catch (e) { return; }
  cur ? lsSet(LS_OTHER, cur) : lsSet(LS_OTHER, null);         // swapping, so it can be swapped back
  adoptProgress(o, new Date().toISOString());
}
/** The top of Activity & backup in the app: where your progress is, and how to carry it. */
function localSyncTop() {
  const me = who(), at = lsGet(SYNC_AT), saved = lsGet(LS_AT);
  const when = t => t ? `${shortDate(t.slice(0, 10))}, ${new Date(t).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}` : '';
  const AI = window.MusicAI || null;
  const note = syncState.err ? `<p class="calnote" style="margin:10px 0 0;color:var(--due)">${esc(syncState.err)}</p>`
    : syncState.note ? `<p class="calnote" style="margin:10px 0 0">${esc(syncState.note)}</p>` : '';
  const account = !CLOUD ? '' : me ? `<div class="card"><div class="spread fadd">
        <div style="font-size:12.5px;color:var(--muted);max-width:60ch"><b>Signed in</b> as ${esc(me.email)}.
          ${syncState.busy ? 'Syncing…' : +at ? `Last synced ${esc(when(new Date(+at).toISOString()))}.` : 'Not synced yet.'}
          ${lite('Your progress follows this account onto every device you sign in on.', '')}
          ${cloudFiles.loaded ? (cloudFiles.member
            ? ` This account includes the school's files${cloudFiles.owner ? ', and you can add to them' : ''}.`
            : ' This account is not on the list for the school’s files, so books, charts and album art are added by hand under My files.') : ''}</div>
        <div class="row"><button class="btn" data-sync-now="1"${syncState.busy ? ' disabled' : ''}>Sync now</button>
          <button class="btn btn-quiet" data-acct-out="1">Sign out</button></div></div>${note}</div>`
    : `<div class="card"><div style="font-size:12.5px;color:var(--muted);max-width:68ch;margin-bottom:10px">
        <b>${syncState.form === 'up' ? 'Create your Music account' : 'Sign in to Music'}.</b> ${lite(` One account for the whole Music app: sign in here or on the home screen, it is the same thing.
        Your progress is saved to it and follows you to every device${syncState.form === 'up' ? '' : ', and it brings the school’s files with it'}.`, '')}</div>
      <form class="row acct" data-acct-form="${syncState.form === 'up' ? 'up' : 'in'}">
        <input class="syncin" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false"
          placeholder="Email" aria-label="Email" data-acct-email="1" value="${esc(syncState.email || '')}">
        <input class="syncin" type="password" autocomplete="${syncState.form === 'up' ? 'new-password' : 'current-password'}"
          placeholder="Password" aria-label="Password" data-acct-pw="1">
        <button class="btn" type="submit"${syncState.busy ? ' disabled' : ''}>${syncState.busy ? 'One moment…' : syncState.form === 'up' ? 'Create account' : 'Sign in'}</button></form>
      <p class="byo-act">${syncState.form === 'up'
        ? `<button type="button" class="lnkedit" data-acct-mode="">I already have an account</button>`
        : `<button type="button" class="lnkedit" data-acct-mode="up">Create an account</button>
           <button type="button" class="lnkedit" data-acct-reset="1">Forgot password</button>`}</p>${note}</div>`;
  const claude = !AI ? '' : `<div class="card"><div class="spread fadd">
      <div style="font-size:12.5px;color:var(--muted);max-width:60ch"><b>Claude.</b> ${AI.has()
        ? 'API key saved on this device.'
        : 'Add your Anthropic API key to have tests marked.'}</div>
      <div class="row">${AI.has() ? `<button class="btn btn-quiet" data-ai-forget="1">Remove key</button>`
        : `<input class="syncin" type="password" autocomplete="off" spellcheck="false" placeholder="sk-ant-…"
             aria-label="Anthropic API key" data-ai-key="1"><button class="btn" data-ai-save="1">Save key</button>`}</div></div></div>`;
  return `<div class="spread"><div><p class="eyebrow">On this device</p><h2 class="vh">Activity &amp; backup</h2>
      <p class="lede" style="margin-top:8px">Everything you do in the school is saved in this browser
      as you go${saved ? ` — last saved ${esc(when(saved))}` : ''}.${CLOUD ? ' Signed in, it is saved to your account too.' : ''}</p></div></div>
    ${account}
    <div class="card"><div class="spread fadd">
      <div style="font-size:12.5px;color:var(--muted);max-width:60ch"><b>Backup.</b> Import replaces what is on this device.</div>
      <div class="row"><button class="btn" data-fexport="1">Export a backup</button>
        <label class="btn upbtn">Import a backup<input type="file" accept="application/json,.json" data-fimport="1" hidden></label></div></div>
      ${lsGet(LS_OTHER) ? `<p class="calnote" style="margin:10px 0 0">A previous copy of your progress is
        being kept on this device. <button type="button" class="lnkedit" data-frestore="1">Switch back to it</button></p>` : ''}</div>
    ${claude}`;
}
if (LOCAL) {
  app.addEventListener('submit', e => {
    const f = e.target.closest('[data-acct-form]');
    if (!f) return;
    e.preventDefault(); accountSubmit(f.dataset.acctForm);
  });
  app.addEventListener('change', e => {
    const t = e.target;
    if (!t || !t.dataset) return;
    if (t.dataset.fadd !== undefined) return handleAdd(t);
    if (t.dataset.fimport !== undefined) return importBackup(t);
    if (t.dataset.foff !== undefined) {
      lsSet('school:offset:' + t.dataset.foff, String(Math.max(-20, Math.min(20, Math.round(+t.value) || 0))));
      return toast('Page offset saved for this book.');
    }
  });
  app.addEventListener('click', e => {
    const t = e.target.closest('[data-frm],[data-fexport],[data-frestore],[data-sync-now],[data-acct-out],[data-acct-mode],[data-acct-reset],[data-ai-save],[data-ai-forget],[data-fpush],[data-fgrp]');
    if (!t) return;
    const d = t.dataset;
    if (d.fgrp) { if (e.target.closest('summary')) { t.open ? filesOpen.delete(d.fgrp) : filesOpen.add(d.fgrp); } return; }
    if (d.frm) return handleRemove(t);
    if (d.fexport) return exportBackup();
    if (d.frestore) return restoreOther();
    if (d.fpush) return pushFilesToCloud();
    if (d.syncNow) return syncNow(true);
    if (d.acctMode !== undefined) {
      syncState.email = ((app.querySelector('[data-acct-email]') || {}).value || '').trim();
      syncState.form = d.acctMode; syncState.err = syncState.note = ''; return render();
    }
    if (d.acctReset) return accountSubmit('reset');
    if (d.acctOut) {
      if (pending) saveLocal();
      return CLOUD.signOut().then(() => { syncState.err = syncState.note = ''; cloudFiles.member = cloudFiles.owner = false;
        toast('Signed out. Your progress stays on this device.'); render(); });
    }
    if (d.aiSave) {
      const v = ((app.querySelector('[data-ai-key]') || {}).value || '').trim();
      if (!window.MusicAI.looksRight(v)) return toast("That doesn't look like an Anthropic API key (they start with sk-ant-).");
      if (!window.MusicAI.setKey(v)) return toast("Couldn't save the key on this device.");
      toast('Key saved on this device.'); return render();
    }
    if (d.aiForget) { window.MusicAI.clearKey(); toast('Key removed from this device.'); return render(); }
  });
  // <details> opening does not bubble, but it can be caught on the way down: a fold that has
  // just opened may hold slots or a chart that were left empty while it was shut.
  app.addEventListener('toggle', e => { if (e.target.open) fillLocal(); }, true);
  // A video thumbnail is linked from YouTube, so offline it fails — take the dead frame away and
  // leave the card with its "Watch on YouTube" button.
  app.addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && t.dataset.yt) { const a = t.closest('.wthumb'); if (a) a.remove(); }
    if (t && t.tagName === 'IMG' && t.dataset.ytt) { const a = t.closest('.vthumb'); if (a) a.classList.add('nopic'); }
  }, true);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') syncSoon(800); });
  window.addEventListener('popstate', e => {
    if (!e.state || !e.state.r) return;
    route = histRoute = e.state.r; render(); window.scrollTo(0, 0);
  });
}
/* ================================================================== tests, sat and marked here
   In the vault a test was a markdown page: answers typed under each question, then `/school
   grade` in Claude Code marked the page and wrote the result into progress-<user>.json. The app
   has no vault and no terminal, so it does the whole thing itself:

     * build.py ships each paper (`C.papers`) — the questions, and the key the marker reads;
     * the reader answers on the page (a draft is kept on the device as they type);
     * "Grade test" sends questions, key and answers to Claude through the reader's own API key
       (../shared/ai.js — the same connection the rest of Music uses), and Claude returns a
       verdict per question through a tool call, so the reply is data and not prose to parse;
     * the result is written into progress EXACTLY as Machine/Workflows/school.md says a grade
       is: the attempt (newest first), each missed question as a retake card, missed concepts
       back to `learning`, and — on a pass — the same release a pass has always meant.

   Scoring is the workflow's: every question is worth 1; a short-answer question scores 1 or 0, a
   written one scores its rubric fraction (4/5 = 0.8); a blank scores zero and is never sent. */
const PAPERS = C.papers || {};
const paperOfLesson = (cid, n) => { const k = `Course ${cid} — Lesson ${n} Test`; return PAPERS[k] ? k : ''; };
const paperOfFinal = cid => { const k = `Course ${cid} — Final Exam`; return PAPERS[k] ? k : ''; };
const conceptOfCode = code => !code ? '' : (CONCEPTS[code] ? code
  : Object.keys(CONCEPTS).find(k => k.startsWith(code + ' ')) || '');
const paperPass = p => p.pass || (p.kind === 'lesson' ? CFG.lesson_pass : CFG.final_pass) || 80;
const draftKey = name => 'school:paper:' + name;
const draftOf = name => { try { return JSON.parse(lsGet(draftKey(name)) || '{}') || {}; } catch (e) { return {}; } };
const paperMode = {};            // name -> 'take' | 'result'  (this visit only)
let grading = null;              // {name, ctl} while Claude is marking

const GRADER_SYSTEM = [
  'You are marking a music school test. Be fair and generous: grade the knowledge, not the notation habit.',
  '',
  'Each question is "objective" or "free-text". You are given the question, the terse canonical answer ("key"), other accepted answers, an explanation, a rubric for free-text questions, and the student\'s answer.',
  '',
  'Objective questions: verdict "correct" or "incorrect", points 1 or 0. Match on meaning, not on string. Ignore case, spacing and trailing punctuation. "#" and the sharp sign are the same. "b" means flat only when it directly follows a note letter A-G or a Roman numeral; a lone "b" is the note B. Lists of notes are right in any order and with any separators. Accept the usual synonyms (maj7 / M7 / major 7th; m / min / minor; dim / °; aug / +; P5 / perfect 5th; ø7 / half-diminished; and so on). An answer that says more than the key is still correct if the extra is not wrong. An answer that gives only part of what the key requires is incorrect. When in doubt, credit it.',
  '',
  'Free-text questions: score against the rubric out of 5 and put that number in points (0 to 5, whole or half points). Verdict "correct" for 5, "incorrect" for 0, "partial" otherwise. Award partial credit.',
  '',
  'For every answer that is not fully correct, "why" says specifically what was wrong or missing, in one or two plain sentences addressed to the student ("You named the key but not the letter-sequence rule."). For a correct answer leave "why" empty. Do not restate the question.',
  '',
  'Mark every question you are given, once each, by its number. Reply only by calling record_grades.'
].join('\n');
const GRADER_TOOL = {
  name: 'record_grades',
  description: 'Record the mark for every question on the test.',
  input_schema: {type: 'object', required: ['grades'], properties: {grades: {type: 'array', items: {
    type: 'object', required: ['n', 'verdict', 'points', 'why'], properties: {
      n: {type: 'integer', description: 'The question number.'},
      verdict: {type: 'string', enum: ['correct', 'incorrect', 'partial']},
      points: {type: 'number', description: 'Objective: 1 or 0. Free-text: 0 to 5 against the rubric.'},
      why: {type: 'string', description: 'What was wrong or missing; empty when fully correct.'}}}}}}
};

async function gradePaper(name) {
  const paper = PAPERS[name], AI = window.MusicAI;
  if (!paper || grading) return;
  if (!AI || !AI.has()) return toast('Add your Anthropic API key below, then grade the test.');
  const answers = draftOf(name);
  const given = q => String(answers[q.n] || '').replace(/(\s*\n---\s*)+$/, '').trim();
  const asked = paper.qs.filter(q => given(q));
  if (!asked.length) return toast('Answer at least one question first.');
  grading = {name, ctl: new AbortController()}; render();
  let rows;
  try {
    const data = await AI.call({
      system: GRADER_SYSTEM, max_tokens: 12000, effort: 'medium', signal: grading.ctl.signal,
      tools: [GRADER_TOOL], tool_choice: {type: 'tool', name: 'record_grades'},
      messages: [{role: 'user', content: JSON.stringify({test: paper.title, questions: asked.map(q => ({
        n: q.n, type: q.type === 'free-text' ? 'free-text' : 'objective', question: q.qt, key: q.a,
        also_accepted: q.also, explanation: q.why, rubric: q.rubric, student_answer: given(q)}))})}]
    });
    const use = data.content.find(b => b.type === 'tool_use' && b.name === 'record_grades');
    rows = use && use.input && Array.isArray(use.input.grades) ? use.input.grades : null;
    if (!rows) throw new AI.Error('The marking came back in a form this page could not read. Try again.');
    const seen = new Set(rows.map(r => +r.n));
    if (asked.some(q => !seen.has(q.n))) throw new AI.Error('The marking came back incomplete. Try again.');
  } catch (e) {
    grading = null; render();
    if (e && e.name === 'AbortError') return toast('Stopped. Nothing was recorded.');
    return toast((e && e.message) || 'The test could not be marked. Try again.');
  }
  // Claude's verdicts become scores HERE, by the workflow's arithmetic, so a stray number in the
  // reply can never produce a mark the rules do not allow.
  const byN = {}; rows.forEach(r => { byN[+r.n] = r; });
  const grades = paper.qs.map(q => {
    const free = q.type === 'free-text', a = given(q), r = byN[q.n];
    if (!a) return {n: q.n, verdict: 'blank', score: 0, pts: free ? 0 : null, why: ''};
    if (free) {
      const pts = Math.max(0, Math.min(5, Math.round((+r.points || 0) * 2) / 2));
      return {n: q.n, verdict: pts >= 5 ? 'correct' : pts <= 0 ? 'incorrect' : 'partial', score: pts / 5, pts, why: String(r.why || '')};
    }
    const ok = r.verdict === 'correct';
    return {n: q.n, verdict: ok ? 'correct' : 'incorrect', score: ok ? 1 : 0, pts: null, why: ok ? '' : String(r.why || '')};
  });
  grading = null;
  applyPaperResult(name, grades, answers);
}

/** Write one graded attempt into progress — the rules are Machine/Workflows/school.md's. */
function applyPaperResult(name, grades, answers) {
  const paper = PAPERS[name], N = paper.qs.length, qOf = {};
  paper.qs.forEach(q => { qOf[q.n] = q; });
  const obj = grades.filter(g => qOf[g.n].type !== 'free-text'), ft = grades.filter(g => qOf[g.n].type === 'free-text');
  const pct = Math.round(grades.reduce((s, g) => s + g.score, 0) / N * 100);
  const pass = pct >= paperPass(paper);
  const attempt = {date: TODAY, score_pct: pct, result: pass ? 'passed' : 'failed',
    objective: `${obj.filter(g => g.score === 1).length}/${obj.length}`,
    free_text: `${ft.reduce((s, g) => s + (g.pts || 0), 0)}/${ft.length * 5}`,
    answered: `${grades.filter(g => g.verdict !== 'blank').length}/${N}`};
  const t = P.tests[name] = Object.assign({attempts: []}, P.tests[name] || {});
  t.attempts = [attempt].concat(t.attempts || []);
  t.status = attempt.result;
  // The latest paper as marked, so it can be read back later and on another device.
  t.paper = {date: TODAY, answers: Object.assign({}, answers), grades};

  const course = COURSES[paper.course];
  // A final pass first puts every concept of the course on the maintenance ladder (retired ones
  // stay retired — that was the reader's call); what was missed is then pulled back below.
  if (paper.kind === 'final' && course && pass) {
    Object.values(CONCEPTS).filter(c => c.course === course.id).forEach(c => {
      if (cs(c.id).status !== 'retired') setC(c.id, {status: 'maintenance', sr_interval: SR.start_interval,
        sr_due: dayIso(dayOf(TODAY) + SR.start_interval)});
    });
    setO(course.id, {status: 'completed', completed: TODAY, lessons_complete: course.lessons.length});
    const k = Object.keys(CLASSES).find(id => (CLASSES[id].courses || []).includes(course.id));
    if (k && CLASSES[k].courses.every(id => os(id).status === 'completed')) setK(k, {status: 'completed'});
  }
  // Every question short of full marks becomes a retake card, and its concept goes back to learning.
  const missed = new Set();
  grades.filter(g => g.score < 1).forEach(g => {
    const q = qOf[g.n], concept = conceptOfCode(q.concept);
    P.misses[`${name}#${g.n}`] = {concept, test: name, n: g.n, kind: g.score > 0 ? 'partial' : 'wrong',
      due: dayIso(dayOf(TODAY) + 7), q: q.qt, a: q.a,
      why: g.verdict === 'blank' ? 'Left blank.' : (g.why || q.why || '')};
    if (concept) missed.add(concept);
  });
  missed.forEach(id => { if (cs(id).status !== 'queued') setC(id, {status: 'learning', sr_interval: 0, sr_due: TODAY}); });
  // A lesson test passed is what releases the next lesson: tick the test task (that tick is what
  // the page means by "sat"), then run the same completion the Complete button runs.
  let released = '';
  if (paper.kind === 'lesson' && course && pass) {
    const u = course.lessons.find(x => x.n === paper.lesson), task = u && testTaskOf(u);
    if (task) P.homework[task.id] = true;
    const st = os(course.id).status;
    if (u && (st === 'enrolled' || st === 'completed') && os(course.id).lessons_complete < u.n) {
      setO(course.id, {lessons_complete: u.n});
      if (u.n + 1 <= course.lessons.length) { reconcileReleases(); released = ` Lesson ${u.n + 1} is open.`; }
    }
  }
  lsSet(draftKey(name), null);
  paperMode[name] = 'result';
  invalidateSchedule(); dirty(); render(); window.scrollTo(0, 0);
  toast(pass ? `Passed — ${pct}%.${released}` : `${pct}% — the pass mark is ${paperPass(paper)}%. What you missed is now in your quizzes.`);
}

function paperView(name) {
  const paper = PAPERS[name];
  if (!paper) return `<div class="view"><h2 class="vh">Test</h2><p class="lede">That test is not part of this build.</p></div>`;
  const rec = P.tests[name] || {}, last = rec.paper || null, attempts = rec.attempts || [];
  const mode = paperMode[name] || (last && !Object.keys(draftOf(name)).length ? 'result' : 'take');
  const course = COURSES[paper.course];
  const where = course ? `${esc(course.short)}${paper.kind === 'lesson' && paper.lesson ? ` · lesson ${paper.lesson}` : ''}` : 'Exam';
  const back = course ? `<button class="btn btn-quiet" data-course${paper.kind === 'lesson' && paper.lesson
    ? `-lesson="${esc(course.id)}:${paper.lesson}"` : `="${esc(course.id)}"`}>Back to the ${paper.kind === 'lesson' ? 'lesson' : 'course'}</button>`
    : `<button class="btn btn-quiet" data-nav="tests">Back to Tests</button>`;
  const audio = q => q.audio ? `<audio class="byo-media" controls preload="none" src="audio/${esc(encodeURIComponent(q.audio))}"></audio>` : '';
  const head = `<div><p class="eyebrow">${paper.kind === 'lesson' ? 'Lesson test' : paper.kind === 'final' ? 'Final exam' : 'Exam'} · ${where}</p>
    <h2 class="vh">${esc(paper.title)}</h2></div>`;
  const AI = window.MusicAI;

  if (mode === 'result' && last) {
    const gOf = {}; last.grades.forEach(g => { gOf[g.n] = g; });
    const a0 = attempts[0] || {}, pass = a0.result === 'passed';
    return `<div class="view paperv" data-domain="${esc((course && course.domain) || 'theory')}">${head}
      <div class="pr-ban" data-r="${pass ? 'pass' : 'fail'}"><b>${pass ? 'Passed' : 'Not passed'} — ${esc(String(a0.score_pct))}%</b>
        <span>Pass mark ${paperPass(paper)}% · short answer ${esc(a0.objective || '')} · written ${esc(a0.free_text || '')} · answered ${esc(a0.answered || '')} · marked ${esc(shortDate(a0.date || TODAY))}</span>
        ${pass ? '' : '<span>Review the answers marked below, then sit it again. What you missed is in your quizzes as retake cards.</span>'}</div>
      ${paper.qs.map(q => {
        const g = gOf[q.n] || {verdict: 'blank', score: 0};
        const free = q.type === 'free-text';
        const tag = g.verdict === 'blank' ? 'Blank' : free ? `${g.pts}/5` : g.verdict === 'correct' ? 'Correct' : 'Incorrect';
        const full = g.score === 1;
        return `<div class="card pq" data-v="${full ? 'ok' : g.score > 0 ? 'part' : 'no'}">
          <div class="pq-h"><span class="pq-n">Q${q.n}</span><span class="pq-v">${tag}</span></div>
          <div class="prose pq-q">${q.q}</div>${audio(q)}
          <div class="pq-mine"><b>Your answer</b>${last.answers[q.n] ? esc(last.answers[q.n]) : '<i>left blank</i>'}</div>
          ${full ? '' : `<div class="pq-key"><b>Answer</b>${esc(q.a)}</div>
            ${g.why ? `<div class="pq-why">${esc(g.why)}</div>` : ''}
            ${q.why && q.why !== g.why ? `<div class="pq-why">${esc(q.why)}</div>` : ''}`}</div>`;
      }).join('')}
      <div class="row" style="gap:8px"><button class="btn" data-paper-again="${esc(name)}">Sit it again</button>${back}</div>
      ${attempts.length > 1 ? `<p class="calnote">Earlier attempts: ${attempts.slice(1, 6).map(a =>
        `${esc(shortDate(a.date))} — ${esc(String(a.score_pct))}%`).join(' · ')}</p>` : ''}</div>`;
  }

  const d = draftOf(name), done = paper.qs.filter(q => String(d[q.n] || '').trim()).length;
  const busy = grading && grading.name === name;
  return `<div class="view paperv" data-domain="${esc((course && course.domain) || 'theory')}">${head}
    <p class="lede">${paper.qs.length} questions · pass at ${paperPass(paper)}%. Answer in your own words, from
      memory, then have it marked. A blank scores zero. Your answers are kept on this device as you type.</p>
    ${attempts.length ? `<p class="calnote">Last sat ${esc(shortDate(attempts[0].date))} — ${esc(String(attempts[0].score_pct))}%.
      ${last ? `<button type="button" class="lnkedit" data-paper-result="${esc(name)}">See that paper as marked</button>` : ''}</p>` : ''}
    ${paper.qs.map(q => `<div class="card pq">
      <div class="pq-h"><span class="pq-n">Q${q.n}</span><span class="pq-t">${q.type === 'free-text' ? 'Written answer · marked out of 5' : 'Short answer'}</span></div>
      <div class="prose pq-q">${q.q}</div>${audio(q)}
      <textarea class="pq-a" data-pq="${q.n}" data-pq-paper="${esc(name)}" rows="${q.type === 'free-text' ? 4 : 2}"
        placeholder="Your answer" aria-label="Your answer to question ${q.n}"${busy ? ' disabled' : ''}>${esc(d[q.n] || '')}</textarea></div>`).join('')}
    ${AI && !AI.has() ? `<div class="card"><div style="font-size:12.5px;color:var(--muted);max-width:68ch;margin-bottom:10px">
        <b>Marking needs Claude.</b> Add your Anthropic API key.</div>
      <div class="row"><input class="syncin" type="password" autocomplete="off" spellcheck="false" placeholder="sk-ant-…"
        aria-label="Anthropic API key" data-ai-key="1"><button class="btn" data-ai-save="1">Save key</button></div></div>` : ''}
    <div class="row" style="gap:10px;align-items:center">
      <button class="btn" data-paper-grade="${esc(name)}"${busy ? ' disabled' : ''}>${busy ? 'Marking…' : 'Grade test'}</button>
      ${busy ? `<button class="btn btn-quiet" data-paper-stop="1">Stop</button>` : back}
      <span class="calnote" data-pq-count="1" style="margin:0">${done} of ${paper.qs.length} answered</span></div>
    ${busy ? '<p class="calnote">Claude is reading your answers against the key. This usually takes under a minute.</p>' : ''}</div>`;
}
if (LOCAL) {
  let draftTimer = null;
  app.addEventListener('input', e => {
    const t = e.target;
    if (!t || !t.dataset || t.dataset.pq === undefined) return;
    const name = t.dataset.pqPaper;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      const d = {};
      app.querySelectorAll('textarea[data-pq]').forEach(x => { if (x.value.trim()) d[x.dataset.pq] = x.value; });
      lsSet(draftKey(name), Object.keys(d).length ? JSON.stringify(d) : null);
      const c = app.querySelector('[data-pq-count]');
      if (c) c.textContent = `${Object.keys(d).length} of ${PAPERS[name].qs.length} answered`;
    }, 250);
  });
  app.addEventListener('click', e => {
    const t = e.target.closest('[data-paper],[data-paper-grade],[data-paper-again],[data-paper-result],[data-paper-stop]');
    if (!t) return;
    const d = t.dataset;
    if (d.paper) { delete paperMode[d.paper]; return go('paper:' + d.paper); }
    if (d.paperStop) { if (grading) grading.ctl.abort(); return; }
    if (d.paperGrade) {
      // flush what is on screen first: the last keystroke may be inside the debounce
      const dd = {};
      app.querySelectorAll('textarea[data-pq]').forEach(x => { if (x.value.trim()) dd[x.dataset.pq] = x.value; });
      lsSet(draftKey(d.paperGrade), Object.keys(dd).length ? JSON.stringify(dd) : null);
      return gradePaper(d.paperGrade);
    }
    if (d.paperAgain) { lsSet(draftKey(d.paperAgain), null); paperMode[d.paperAgain] = 'take'; render(); return window.scrollTo(0, 0); }
    if (d.paperResult) { paperMode[d.paperResult] = 'result'; render(); return window.scrollTo(0, 0); }
  });
}

/* Back and forward. The single-file page lives in a frame with no history of its own; the app is
   a real page, and on a phone the system Back gesture would otherwise close it outright. Each
   change of route is one history entry, pushed by render(). */
let histRoute = null;
function trackRoute() {
  try { sessionStorage.setItem(ROUTE_KEY, route); } catch (e) {}
  if (histRoute === route) return;
  try { histRoute === null ? history.replaceState({r: route}, '') : history.pushState({r: route}, ''); } catch (e) {}
  histRoute = route;
}

function render() {
  invalidateSchedule();   // PATCH-138 (I-5) — one plan per paint
  /* spec-173 — three parts, not two: a homework page is `homework:<course>:<lesson>`, or now
     `homework:ext:<id>` for an outside lesson's own homework page — same shape, `arg` just
     names which kind. Nothing else in the routing table carries a second argument, and neither
     a concept id nor an ext-lesson id (a page-side `cap-YYYYMMDD-N` or a synced note's filename
     stem) ever contains a colon, so the extra slot is simply undefined everywhere it is not
     used. */
  const [head, arg, arg2] = route.split(':');
  const body = head === 'classes' ? classesView() : head === 'class' ? classView(arg)
    : head === 'courses' ? coursesView() : head === 'course' ? courseView(arg)
    : head === 'concepts' ? conceptsView() : head === 'concept' ? conceptCard(arg)
    : head === 'source' ? sourceView(arg)     // PATCH-144 — a vault note, as its own page
    : head === 'drill' ? drillView() : head === 'drills' ? drillsView(arg) : head === 'sync' ? syncView()
    : head === 'notes' ? notesView()          // PATCH-102
    : head === 'ear' ? earView()
    : head === 'homework' ? (arg === 'ext' ? extHomeworkPage(arg2) : arg ? homeworkPage(arg, arg2) : homeworkLanding())
    : head === 'ext' ? extView() : head === 'myclasses' ? myClassesView()
    : head === 'technique' ? techniqueView(arg)
    : head === 'routine' ? routineView(arg)   // PATCH-159 — a routine is a drill page too
    : head === 'watch' ? watchView(arg)       // a play-along video, on its own page
    : head === 'method' ? methodView(arg)     // a practice-method note
    : head === 'songs' ? songsView()          // spec-176 — the song library shelf
    : head === 'originals' ? originalsView()  // spec-179 — the shared idea board
    : head === 'original' ? originalView(arg) //           …and one idea's thread
    : head === 'tools' ? toolsView()          // spec-177 — the outside-tools shelf
    : head === 'slices' ? slicesView()        // spec-178 — the Soundslice shelf
    : head === 'files' && LOCAL ? filesView()  // app build — the reader's own books, charts, art
    : head === 'paper' && LOCAL ? paperView(arg) // app build — a test, sat and marked on the page
    : head === 'tests' ? testsView() : overview();
  app.style.setProperty('--rail', railOpen() ? (LOCAL ? '15rem' : '236px') : (LOCAL ? '3.5rem' : '56px'));
  // PATCH-144 — the one pass that makes every [[vault note]] the school assigns a live link,
  // wherever it appears. Deliberately here and not in the view functions: a dead span turns up
  // on Read lines, in **The material** bullets, inside pulled reading and on a source page
  // pointing at another one, and one pass at the end covers all four with one rule.
  app.innerHTML = rail() + `<main>${readonly ? `<div class="banner" style="margin-bottom:20px">
    <span>Read-only view — you can read everything, but progress won't be saved back to this page.</span></div>` : ''}${sourceLinks(body)}</main>`;
  // spec-172 — the book folds ship empty and are filled on open; a re-render has to refill
  // the ones that were open. See fillBook() for why the scans are never in the view's HTML.
  fillOpenBooks();
  if (LOCAL) { fillLocal(); trackRoute(); }
  if (pending) chip('dirty', 'unsaved');
}

/* ---------------------------------------------------------------- events */
app.addEventListener('click', e => {
  const t = e.target.closest('[data-nav],[data-course],[data-class],[data-concept],[data-jump],[data-drillkind],' +
    '[data-course-toggle],[data-course-stop],[data-class-toggle],[data-sec-toggle],[data-lesson],[data-reveal],[data-rate],' +
    '[data-drill-start],[data-drill-lesson],[data-drill-quiz],[data-drill-scope],[data-drill-miss],[data-unretire],[data-undo],' +
    '[data-copy],[data-download],[data-goto],[data-unlocks],[data-strand],[data-read],[data-tool],[data-srcsec],[data-upx],'
    + '[data-editstart],[data-startdone],[data-startreset],'
    + '[data-daypick-start],[data-daypick-cancel],'
    + '[data-ext-add],[data-ext-save],[data-ext-cancel],[data-ext-del],'
    + '[data-orig-add],[data-orig-save],[data-orig-cancel],[data-orig-del],'
    + '[data-orig-note],[data-orig-notedel],[data-origlog],'
    + '[data-book],[data-bkzoom],'
    + '[data-hw-open],[data-hw-turnin],[data-hw-undo],[data-plog],[data-plogdel],[data-course-lesson],'
    + '[data-note-add],[data-note-del],[data-songclear],[data-chart],'
    + '[data-ear-play],[data-ear-show],[data-ear-next],[data-ear-prev],[data-ear-go],[data-ear-reset]');
  if (!t) return;
  const d = t.dataset;
  // PATCH-007: <details> owns its own open/close — we only record it, so the next render()
  // reopens it. Clicks that land in the body (not the summary) fall through untouched;
  // a cross-link inside it matches [data-goto] on itself first and never reaches here.
  if (d.unlocks) { if (e.target.closest('summary')) unlocksOpen = !t.open; return; }
  // PATCH-010 — same contract for a reading fold. `t.open` is still the PRE-click state here,
  // so this records what the browser is about to do rather than fighting it.
  if (d.tool) { if (e.target.closest('summary')) { t.open ? toolOpen.delete(d.tool) : toolOpen.add(d.tool); }
    return; }
  if (d.read) { if (e.target.closest('summary')) { t.open ? readOpen.delete(d.read) : readOpen.add(d.read); }
    return; }
  // spec-176b — a chord chart fold, on exactly the reading fold's contract above: <details> owns
  // its open/close and we only record it so the next render reopens it. `t.open` is pre-click.
  if (d.chart) { if (e.target.closest('summary')) { t.open ? chartOpen.delete(d.chart) : chartOpen.add(d.chart); }
    return; }
  /* spec-172 — the book fold, on the same contract as the reading fold above: <details> owns
     its open/close and we only record it. The difference is that this one ships EMPTY and is
     filled here, on the way open — see fillBook(). `t.open` is still the pre-click state. */
  if (d.book) { if (e.target.closest('summary')) {
      /* bookShut records a DELIBERATE close, so the current lesson's auto-open (pagesBlock)
         does not spring it back open on the next render. */
      if (t.open) { bookOpen.delete(d.book); bookShut.add(d.book); }
      else { bookOpen.add(d.book); bookShut.delete(d.book); fillBook(t); } }
    return; }
  /* A scan is fitted to the column by default and can be opened to the width it was rendered
     at, which is what Part III's densest pages need. The figure scrolls inside itself; the
     page body never moves sideways. No render() — the DOM is the truth for a zoom, and
     re-rendering would cost the reader the scroll position they are reading from. */
  if (d.bkzoom) { const fig = t.closest('figure'); if (fig) fig.classList.toggle('zoom'); return; }
  /* PATCH-144 — the contents strip on a note page. Indexed into the rendered <h3>s, which is
     why build.py reads `secs` back out of the html it emitted rather than off the note's own
     heading list: the two can disagree and an index into the wrong list scrolls to the wrong
     section. No render() — the DOM is the truth for a scroll. */
  /* PATCH-146 — take a waiting upload back off the page. Only ever a file that has NOT been
     filed yet: once /school sync has written it into the vault it is not in `ext_files` any
     more, and a Remove that silently left the vault's copy behind would be lying the same way
     delNote() refuses to lie about a filed note. */
  if (d.upx !== undefined) {
    if (readonly) return;
    const i = +d.upx, f = upFiles()[i];
    if (!f) return render();
    P.ext_files = upFiles().filter((_, n) => n !== i);
    dirty(); render();
    return toast(`Removed ${f.name}.`);
  }
  if (d.srcsec !== undefined) {
    const h = app.querySelectorAll('.srcbody h3')[+d.srcsec];
    if (h) h.scrollIntoView({behavior: 'smooth', block: 'start'});
    return;
  }
  if (d.extAdd) { addingLesson = true; if (route !== 'ext') { route = 'ext'; window.scrollTo(0,0); } return render(); }
  if (d.extCancel) { addingLesson = false; return render(); }
  if (d.extDel) {
    P.ext_lessons = (P.ext_lessons || []).filter(l => l.id !== d.extDel);
    dirty(); return render();
  }
  if (d.extSave) {
    const g = (id) => (document.getElementById(id) || {}).value || '';
    const date = g('ef-date') || TODAY, inst = g('ef-inst').trim() || 'lesson';
    const covered = g('ef-cov').trim(), nextDate = g('ef-next');
    const hwLines = g('ef-hw').split('\n').map(x => x.trim()).filter(Boolean);
    if (!covered && !hwLines.length) return toast('Add what was covered, or some homework.');
    /* PATCH-136 (B4) — the id must not be derived from POSITION. `length + 1` reuses an id the
       moment anything is removed: capture a lesson, sync it (the id is now stamped on a vault
       note), delete the capture, capture again the same day — the new one is born with the old id,
       sync.py's dedup skips it as already-seen, and it is lost. It reports "N on the page, 0 new
       note(s)" and the page's own Remove copy promises "anything already synced stays in the
       vault", so every surface agrees nothing is wrong. After the next rebuild `extCaptured()`
       hides it too and the content is unreachable everywhere. Reproduced end to end.
       The date prefix is kept because it is human-readable in the vault; the suffix is now
       time-derived, so it is unique per capture rather than per list length. */
    const id = `cap-${date.replace(/-/g,'')}-${Date.now().toString(36)}`;
    P.ext_lessons = [...(P.ext_lessons || []), Object.assign({id, date, instrument: inst, covered,
      homework: hwLines.map((t, i) => ({id: `ext:${id}:${i}`, html: t}))},
      nextDate ? {next_date: nextDate} : {})];
    addingLesson = false; dirty(); render();
    return toast(LOCAL ? 'Lesson saved.' : 'Lesson saved to this page. /school sync writes it to the vault.');
  }
  /* ---- spec-179: the idea board. Every mutating branch carries its own `readonly` check
     rather than trusting the view to have hidden the control. The view DOES hide them, but a
     read-only reader who writes into `P` still gets a dirty page that can never be saved and a
     "not synced" badge that will never clear — PATCH-129's whole point, one level down. */
  if (d.origlog) { if (e.target.closest('summary')) origLogOpen = !t.open; return; }
  if (d.origAdd) {
    addingIdea = true;
    if (route !== 'originals') { route = 'originals'; window.scrollTo(0, 0); }
    return render();
  }
  if (d.origCancel) { addingIdea = false; return render(); }
  if (d.origSave) {
    if (readonly) return;
    const g = id => (document.getElementById(id) || {}).value || '';
    const title = g('oi-title').trim(), idea = g('oi-idea').trim();
    if (!title && !idea) return toast('Give it a title, or write the idea.');
    /* Time-derived, never position-derived — PATCH-136 (B4) states the failure in full for the
       lesson capture and it is identical here: `length + 1` reuses an id the moment anything is
       removed, and a reused id is silently skipped by sync.py's dedupe as already-filed. */
    const id = `idea-${TODAY.replace(/-/g, '')}-${Date.now().toString(36)}`;
    P.originals = P.originals || {};
    P.originals.ideas = [...(P.originals.ideas || []), {
      id, title: title || 'Untitled idea', by: NAME, status: g('oi-status') || 'spark',
      key: g('oi-key').trim(), bpm: g('oi-bpm').trim(), feel: g('oi-feel').trim(),
      idea, started: TODAY, at: TODAY}];
    addingIdea = false; dirty(); render();
    return toast(LOCAL ? 'Idea saved.' : 'Idea saved to this page. /school sync writes it to the vault.');
  }
  if (d.origNote) {
    if (readonly) return;
    const text = ((document.getElementById('on-text') || {}).value || '').trim();
    if (!text) return toast('Write the note first.');
    P.originals = P.originals || {};
    P.originals.notes = [...(P.originals.notes || []), {
      id: `n-${Date.now().toString(36)}`, target: d.origNote, by: NAME, text, at: TODAY}];
    dirty(); render();
    return toast(LOCAL ? 'Note added.' : 'Note added. /school sync writes it to the vault.');
  }
  /* Both removals only ever reach a PENDING item — the view offers them nowhere else. A synced
     idea or note lives in the vault, and deleting it is a vault edit, not a page one; a page
     that deleted the note would be writing a third kind of capture nothing reads. */
  if (d.origDel) {
    if (readonly) return;
    P.originals = P.originals || {};
    P.originals.ideas = (P.originals.ideas || []).filter(i => i.id !== d.origDel);
    P.originals.notes = (P.originals.notes || []).filter(n => n.target !== d.origDel);
    route = 'originals'; dirty(); render();
    return toast('Removed. Nothing already synced is touched.');
  }
  if (d.origNotedel) {
    if (readonly) return;
    P.originals = P.originals || {};
    P.originals.notes = (P.originals.notes || []).filter(n => n.id !== d.origNotedel);
    dirty(); return render();
  }
  if (d.editstart) { editStart = true; return render(); }
  if (d.startdone) { editStart = false; return render(); }
  if (d.startreset) { delete P.semester_start; dirty(); return render(); }
  if (d.daypickCancel) { pickingDays = null; pickedDays = []; return render(); }
  if (d.daypickStart) {
    // Unreachable for a read-only viewer today — d.courseToggle's own readonly gate (below)
    // stops `pickingDays` from ever being set — but this mutates progress via enrollCourse(),
    // so it gets the same explicit check rather than relying on that alone.
    if (readonly) return;
    enrollCourse(d.daypickStart, pickedDays);
    pickingDays = null; pickedDays = [];
    return render();
  }
  /* spec-174 — the Phase 0 answer: the CSP blocks an <iframe> to an external host (YouTube
     included) the same as any other external request, so there is no in-page player to hand off
     to. This opens the real video in a new tab instead — a labelled external link, not a play
     button pretending to embed a player it cannot host. No render(): nothing on the page changed. */
  /* In the app on a phone the menu is a drawer over the page, so choosing something closes it —
     otherwise every tap on the menu leaves it covering what was just asked for. */
  if (d.nav && LOCAL && narrowScreen() && t.closest('.rail')) setSec('rail', false);
  if (d.nav) return go(d.nav);
  // spec-173 — navigation, so it is deliberately NOT gated on `readonly`: a read-only viewer
  // reads the homework page like any other, they just cannot hand it in.
  if (d.hwOpen) return go('homework:' + d.hwOpen);
  /* spec-173 — a course link that lands ON its lesson. "Open lesson 3" that drops you at the
     top of an 18-lesson course is a broken promise, and there was no deep link before this
     because nothing off-view had ever needed one. go() renders synchronously (innerHTML), so
     the anchor exists by the time this looks for it.
     Checked BEFORE the bare `d.course` below: the term-ahead lesson chip carries both
     `data-course` (calendar-plan.py's contract, unrelated to navigation) and
     `data-course-lesson` (this one) on the same element, and the more specific contract has
     to win or the anchor jump never fires. */
  if (d.courseLesson) {
    const [cid, n] = d.courseLesson.split(':');
    go('course:' + cid);
    const el = document.getElementById('u' + n);
    if (el) el.scrollIntoView({block: 'start'});
    return;
  }
  if (d.course) return go('course:' + d.course);
  if (d.class) return go('class:' + d.class);
  if (d.concept) return go('concept:' + d.concept);
  if (d.drillkind) { drillKind = d.drillkind; return render(); }
  if (d.goto) { const i0 = d.goto.indexOf(':');
    const k = i0 < 0 ? d.goto : d.goto.slice(0, i0), v = i0 < 0 ? '' : d.goto.slice(i0 + 1);
    /* PATCH-144 — remember the way out BEFORE the route changes, and only on the way IN. A
       source → source hop keeps the original, so "← Back" is still the lesson that sent you
       reading rather than one step per note you followed. */
    if (k === 'source' && !route.startsWith('source:')) srcBack = route;
    // PATCH-159 — a drill page reached from a lesson should come back to the lesson, the same
    // contract PATCH-144 gave a note page. `drillBack` is separate from `srcBack` so a
    // note → drill → note walk cannot cross the two wires.
    if (DRILL_PAGE.test(k + ':') && !DRILL_PAGE.test(route)) drillBack = route;
    if (k === 'tool') { toolOpen.add(v); return go('tools'); }
    return go(k + ':' + v); }
  // spec-176 — clears BOTH song filters at once. Two controls to undo one "why is the shelf
  // empty?" is one too many, and the button only exists while something is filtering.
  if (d.songclear !== undefined) { filters.sq = ''; filters.genre = ''; filters.key = '';
    filters.bpm = ''; return render(); }
  if (d.jump) { const el = document.getElementById(d.jump);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'}); return; }
  /* spec-172 — the ear-training controls. Play deliberately does NOT render: the click is the
     user gesture the AudioContext is built on, and rebuilding the view under it would throw
     the button away mid-click. Nothing here touches P, which is why none of it is gated on
     `readonly` — there is no progress to fail to save. */
  if (d.earPlay) { const c = EAR.find(x => x.id === d.earPlay);
    if (!playClip(c)) toast('This browser will not play audio here.'); return; }
  if (d.earShow) { if (!earSeen(d.earShow)) { ear.seen = ear.seen.concat([d.earShow]); earSave(); }
    return render(); }
  if (d.earNext) { earGo(earAt() + 1); return render(); }
  if (d.earPrev) { earGo(earAt() - 1); return render(); }
  if (d.earGo) { earGo(+d.earGo); return render(); }
  if (d.earReset) { ear.seen = []; earSave(); toast('Answers hidden again.'); return render(); }
  // PATCH-012 — a strand chip toggles the strand filter. No scroll: render() rebuilds in
  // place, so the board you clicked stays where your eye left it.
  if (d.strand) { const on = filters.strand === d.strand;
    filters.strand = on ? '' : d.strand;
    if (route !== 'concepts') return go('concepts');
    return render(); }
  // PATCH-029 — `[data-enroll]` went with the "Next in the syllabus" card; it was that
  // card's button and nothing else's. Enrolment still has two doors: a course's own
  // Start/Pause button and a class tile's Enroll.
  if (readonly && (d.courseToggle || d.courseStop || d.classToggle || d.lesson || d.rate
                   || d.hwTurnin || d.hwUndo || d.plog || d.plogdel
                   || d.noteAdd || d.noteDel)) return;   // PATCH-102
  /* PATCH-081/082 — the latch. Anything that is not the pending control cancels it, so the
     confirm state can never outlive the click that armed it. */
  const armed = confirmAct;
  if (!d.courseStop && !d.classToggle && !d.noteDel) confirmAct = null;
  /* spec-173 A — the hand-in. It writes `assignments` and NOTHING else: not
     `lessons_complete`, not a quiz's SR state. The toast says so, because the one way this
     feature could do damage is by being mistaken for the button next to it on the lesson.
     Placed BELOW the latch on purpose: PATCH-081's rule is that any click which is not the
     armed control disarms it, and a state-writing control that slipped in above this line
     would be the one exception nobody had written down. */
  if (d.hwTurnin) { const [cid, n] = d.hwTurnin.split(':'); turnIn(cid, +n);
    toast(`Homework turned in. The lesson itself is still yours to complete on the course page.`);
    return render(); }
  if (d.hwUndo) { const [cid, n] = d.hwUndo.split(':'); unTurnIn(cid, +n);
    toast('Turn-in undone — back to open.'); return render(); }
  /* spec-173 A — one practice session, into spec-160's `drills`. `tempo_target` rides on the
     control rather than being looked up again here, because it is the lesson's join key and
     the lesson is what drew the button. The key itself can contain no colon (build.py emits
     "hanon-<n>"), but the split is done from the RIGHT anyway so a future key that does
     cannot silently take the target with it. */
  if (d.plog) {
    const i = d.plog.lastIndexOf(':');
    const key = d.plog.slice(0, i), target = +d.plog.slice(i + 1) || 0;
    const g = id => (document.getElementById(id) || {}).value || '';
    const tempo = +g('pl-tempo') || 0;
    // PATCH-160 — Nate: "i logged one but dont see where the log went... make tempo optional."
    // The refusal that lived here threw a whole session away because ONE field was blank —
    // silently, since a placeholder that looks like a value (the target rendered bare) makes
    // an empty box look filled. No field replaces it as required: a submit with nothing in it
    // still logs a row dated today, which is itself the fact ("I did this").
    const mins = +g('pl-mins') || 0;
    logPractice(key, target, {date: g('pl-date') || TODAY, tempo, mins, note: g('pl-note').trim()});
    render();
    return toast(target && tempo >= target
      ? `Logged at ♩=${tempo} — that is the printed mark. ${key} moves to maintenance.`
      : tempo ? `Logged at ♩=${tempo}.` : 'Logged.');
  }
  // PATCH-160 — one click, no confirm: deletion IS the undo, so a second undo-the-undo would
  // only be state for state's sake. `data-plogdel` splits from the right the same way
  // `data-plog` does — the index is always numeric, the key is the thing that could (in
  // principle) carry a colon.
  if (d.plogdel) {
    const i = d.plogdel.lastIndexOf(':');
    const key = d.plogdel.slice(0, i), idx = +d.plogdel.slice(i + 1);
    deletePractice(key, idx);
    render();
    return toast('Entry deleted.');
  }
  /* PATCH-102 — the note goes onto P.notes as `{at, text}` and NOTHING else. No `filed`: that
     flag is the vault's, set there once someone has acted on the note, and a page that wrote
     it would erase the record of what had already been handled and re-surface every note
     forever. Empty or whitespace-only text adds no entry (addNote returns null) — sync.py
     drops such a note anyway, so writing one would only be state that can never travel. */
  if (d.noteAdd) {
    const box = document.getElementById('pn-text');
    const nt = addNote(box ? box.value : '');
    if (!nt) { if (box) box.focus(); return toast('Write something first — an empty note is not saved.'); }
    if (box) box.value = '';
    render();
    return toast(LOCAL ? 'Noted.' : 'Noted. /school sync carries it home with your progress.');
  }
  /* Removing takes it off THIS PAGE only, and the latch is here because a typed note is not
     recoverable. Once a note has synced, the vault has its own copy and the union keeps it —
     so this is honest only before a sync, which is why the confirm says the word. */
  if (d.noteDel) {
    const key = 'note:' + d.noteDel;
    if (armed !== key) { confirmAct = key; return render(); }
    confirmAct = null; delNote(d.noteDel); render();
    return toast('Removed from this page. Anything already synced stays in the vault.');
  }
  if (d.courseStop) {
    const key = 'course:' + d.courseStop;
    if (armed !== key) { confirmAct = key; return render(); }
    confirmAct = null; resetCourse(d.courseStop);
    toast('Stopped — progress erased, back to not started.');
    return render();
  }
  if (d.courseToggle) {
    const id = d.courseToggle, st = os(id), c = COURSES[id];
    if (st.status === 'enrolled') { unenrollCourse(id); return render(); }
    /* A TRUE first start (never a resume — `started` is what tells the two apart, same test
       courseAction() and enrollCourse()'s own rebase use) on a non-standing course asks which
       days first, in place of enrolling immediately. Standing courses have no weekday
       schedule to ask about. */
    if (!st.started && c && !c.standing) { pickingDays = id; pickedDays = []; return render(); }
    enrollCourse(id); return render();
  }
  if (d.classToggle) {
    const on = ks(d.classToggle).status === 'enrolled';
    if (!on) { confirmAct = null; setK(d.classToggle, {status: 'enrolled'});
      /* PATCH-129 — enrolling a class now STARTS ITS FIRST COURSE. This is the defect that created
         spec-157: on 2026-08-12 Nate enrolled a class, nothing observable happened, and it was
         correct per spec every time it was checked. Nate, 2026-08-24: "enrolling in a class should
         populate that schedule thing on the overview page... maybe if you're on a class that
         triggers the first course, maybe that's a good way to action it."
         First AVAILABLE course in the class's own order, and only if the budget allows — enrollCourse
         owns that guard and toasts its own refusal, so a full lane is declined loudly rather than
         silently skipped. A class whose courses are all started or completed just enrolls. */
      const first = (CLASSES[d.classToggle].courses || [])
        .filter(x => COURSES[x]).find(x => os(x).status === 'available');
      /* PATCH-137 (F8) — route a never-started course through the day picker instead of starting it
         outright. `enrollCourse` is the only writer of `days`, and the picker is gated on
         `!started` — so a course auto-started from its class tile could never be put on chosen
         weekdays afterwards, on any surface. Enrolling the class still does something observable
         (that is B-the-original-defect); it just asks the same question starting the course
         directly would have. A course that has been started before skips straight through, exactly
         as a resume does. */
      if (first && !os(first).started && !COURSES[first].standing) {
        pickingDays = first; pickedDays = [];
        go('course:' + first);
        return;
      }
      if (first) { enrollCourse(first); return render(); }
      toast('Class enrolled.'); return render(); }
    const key = 'class:' + d.classToggle;
    if (armed !== key) { confirmAct = key; return render(); }
    confirmAct = null;
    const n = unenrollClass(d.classToggle);
    toast(n ? `Un-enrolled — ${n} course${n === 1 ? '' : 's'} reset.` : 'Un-enrolled.');
    return render();
  }
  /* PATCH-104 — the current state is read off the BUTTON, not recomputed from secOpen(). A
     section that ships folded has a default of `false`, and `!secOpen(id)` would have used
     secOpen's own default of `true` — so the first click on Completed would have written '0'
     for a section that was already shut and appeared to do nothing. Every fold control on the
     page carries aria-expanded, which is the state the reader can actually see. */
  if (d.secToggle) { setSec(d.secToggle, t.getAttribute('aria-expanded') !== 'true');
    return render(); }
  if (d.lesson) { const [cid, n] = d.lesson.split(':'); completeLesson(cid, +n); return render(); }
  if (d.reveal) { drill.shown = true; return render(); }
  if (d.drillStart) {
    /* PATCH-112 — retakes lead the session. A missed question is the most specific thing the
       school knows you got wrong, and burying it behind a slice of concept quizzes means the
       one card that was generated FOR you is the one most likely to fall off the end of a
       capped session. They are not counted against `daily_drip` for the same reason: the cap
       exists to keep the routine rotation from becoming a wall, and a retake is not routine. */
    /* PATCH-113 — `go('drill')`, not `render()`. This handler built the queue and re-rendered
       WHEREVER YOU STOOD, which worked for the whole life of the button because it only ever
       existed on the Quizzes page — and that page's route IS `drill`, so the re-render happened
       to land on the session. Moving the button onto the Overview's Today section broke it in
       the most confusing way available: the queue was built correctly and the click looked
       completely dead, because the Overview re-rendered as the Overview. Every other way into a
       session already routes (startDrill ends in `go`); this one was the exception. */
    drill = {queue: missDue().map(missCard).concat(dueList().slice(0, +d.drillStart)),
      i:0, shown:false, all: +d.drillStart > CFG.daily_drip, from: route}; return go('drill'); }
  // PATCH-008 — three ways into a session that the daily drip does not gate: one quiz from
  // its card, one lesson's set from the lesson itself, or every assigned quiz in the school.
  if (d.drillQuiz) return startDrill([d.drillQuiz]);
  if (d.drillMiss) return startDrill([missCard(d.drillMiss)]);   // PATCH-112
  /* PATCH-114 — back into rotation at today, not at the interval it had when it was retired:
     that interval was earned before a gap of unknown length, and re-checking once is how you
     find out whether it survived. */
  if (d.unretire) { setC(d.unretire, {status:'maintenance', sr_due: TODAY}); return render(); }
  if (d.undo) { recallUndo(d.undo); return render(); }   // PATCH-121
  if (d.drillLesson) { const [cid, n] = d.drillLesson.split(':');
    return startDrill(lessonConcepts(cid, +n).filter(k => cs(k).status !== 'queued')); }
  if (d.drillScope === 'assigned') return startDrill(assignedList());
  if (d.rate) { const cur = drill.queue[drill.i];
    // PATCH-112 — two card kinds share one rate control, and only the store differs.
    if (isMiss(cur)) rateMiss(missKey(cur), d.rate); else rate(cur, d.rate);
    drill.i++; drill.shown = false;
    if (!sessionLive()) flushSave();              // PATCH-138 (I-6) — last card: save now
    return render(); }
  if (d.copy) {
    /* `state` copies the WHOLE page state — homework, logged lessons, semester start — because the
       Download button is gone: a page declaring the `downloads` capability cannot be shared publicly,
       and being reachable from another device mattered more than one-click export (2026-08-20).
       Copy needs no capability, so this is the export path now. */
    /* PATCH-138 (I-8) — only `state` is reachable. The 'p' and 'h' variants read `json-progress` /
       `json-homework`, elements the Sync page stopped emitting at PATCH-115; the branch survived
       pointing at ids that no longer exist. */
    const txt = JSON.stringify(P, null, 2);
    navigator.clipboard.writeText(txt).then(
      () => toast(`Whole state copied — paste it into ~/Downloads/school-${C.user}.json`),
      () => toast('Copy blocked — select the text and copy manually.'));
    return;
  }
  /* PATCH-138 (I-8) — the `downloads` branch was deleted. Nothing emits `data-download` any more,
     and it could not have worked if it did: declaring the `downloads` capability makes an artifact
     un-shareable, which is why the page carries `{artifact}` alone and why the workflow forbids
     re-adding it. A handler for a capability the page is deliberately never granted is a trap for
     whoever reads it next and concludes downloads are supported. Copy-everything is the export. */
});
app.addEventListener('change', e => {
  /* PATCH-146 — the upload. A file input reports through `change`, not `click`, which is why it
     is wired here and not in the delegated click listener with every other control. */
  if (e.target.dataset.upload !== undefined) return handleUpload(e.target);
  if (e.target.dataset.startdate !== undefined) {
    if (readonly) return;
    const v = e.target.value;
    if (v) P.semester_start = v; else delete P.semester_start;
    dirty(); return render();
  }
  if (e.target.dataset.day !== undefined) {
    const day = +e.target.dataset.day;
    if (e.target.checked) {
      // PATCH-150 — the ceiling is the course's weekly allowance, not a flat 2.
      const _pc = COURSES[pickingDays], _pn = _pc ? weeklyAllowance(_pc) : 2;
      if (pickedDays.length >= _pn) { e.target.checked = false;
        return toast(_pn === 1
          ? 'One lesson a week on this course — untick the other day first.'
          : `Pick exactly ${_pn} days — untick one first.`); }
      pickedDays.push(day);
    } else pickedDays = pickedDays.filter(d => d !== day);
    return render();
  }
  const f = e.target.dataset.f, task = e.target.dataset.task;
  if (f) { filters[f] = e.target.value; return render(); }
  if (task) {
    if (readonly) { e.target.checked = !e.target.checked; return; }
    P.homework[task] = e.target.checked; dirty();
    e.target.closest('li').classList.toggle('on', e.target.checked);
    /* The block's "N/M done" counter was added with the label but never updated on a tick —
       it sat stale until something else forced a render. Recount in place rather than
       re-rendering the view, which would cost the reader their scroll position mid-lesson.
       PATCH-060 — the verb is the block's own (`completed` on homework, `done` on reading),
       carried on the tag as data-verb. It used to be hardcoded to "done" here, which quietly
       overwrote the homework wording on the first tick. */
    const blk = e.target.closest('.blk');
    if (blk) {
      const boxes = [...blk.querySelectorAll('input[data-task]')];
      const done = boxes.filter(b => b.checked).length;
      const tag = blk.querySelector('.lbl .done');
      if (tag) { tag.textContent = `${done}/${boxes.length} ${tag.dataset.verb || 'done'}`;
                 tag.classList.toggle('is-all', done === boxes.length); }
    }
    /* spec-173 A — the homework page's own tally sits in the turn-in card, outside the block
       that was ticked, so the in-place recount above cannot reach it. Same contract as
       everything else in this handler: recount, never re-render — a Leavitt lesson carries
       twenty scans and a re-render would throw away the scroll position mid-checklist. */
    const tally = document.querySelector('.hwpage .hw-tally');
    if (tally) {
      const boxes = [...app.querySelectorAll('.hwpage .blk input[data-task]')];
      const n = boxes.filter(b => b.checked).length;
      tally.textContent = `${n}/${boxes.length} items ticked`;
      tally.classList.toggle('is-all', boxes.length > 0 && n === boxes.length);
    }
    /* PATCH-058 — ticking the last homework box unlocks that lesson's quizzes, and it has to
       happen HERE: this handler deliberately does not re-render, so nothing else would flip
       the gate until the next full render. The lock hint is shown/hidden by CSS off
       `data-hw`, and the Take buttons are enabled directly. */
    const lesson = e.target.closest('.lesson');
    if (lesson && blk && blk.querySelector('.lbl') &&
        /Homework/i.test(blk.querySelector('.lbl').textContent)) {
      const hw = [...blk.querySelectorAll('input[data-task]')];
      const open = hw.length > 0 && hw.every(b => b.checked);
      lesson.dataset.hw = hw.length ? (open ? 'open' : 'locked') : 'none';
      lesson.querySelectorAll('.qz-b[data-drill-quiz]').forEach(b => { b.disabled = !open; });
    }
  }
});
app.addEventListener('input', e => {
  /* spec-176 — `sq` is the song shelf's own box and is deliberately NOT `q`, the quiz bank's. A
     query typed on one page that silently empties the other reads as a broken page, not as a
     remembered search. Named explicitly rather than accepting any `data-f`, because a <select>
     fires `input` too and would re-render twice and steal the caret restore below. */
  const f = e.target.dataset.f;
  if (f !== 'q' && f !== 'sq') return;
  filters[f] = e.target.value;
  const pos = e.target.selectionStart; render();
  const n = app.querySelector(`[data-f="${f}"]`); if (n) { n.focus(); n.setSelectionRange(pos, pos); }
});

/* ---------------------------------------------------------------- boot */
/* PATCH-110 — before the first render, not after: reconcileReleases() can change what a quiz's
   due date is, and the timeline is drawn off those dates. It marks the doc dirty ONLY when it
   actually moved something, so a page that is already consistent — which is every page that has
   only ever been driven from here — neither saves nor republishes on open. */
/* PATCH-165 (2026-09-23) — the boot reconcile no longer dirties either, for the reason spelled out
   on the visibilitychange handler below. This was the OTHER passive republish path: open the page,
   the reconcile moves a due date, dirty() sets pending, and the capability block at the bottom of
   this file fires `if (pending && !readonly) save()` — so merely OPENING a stale tab republished it,
   without waiting for a date rollover. The reconcile still runs and still feeds the first render;
   its writes are derived and are recomputed next boot, so leaving them unsaved loses nothing and
   they ride along with the next real edit. */
reconcileReleases();
render();
const s = sessionStorage.getItem('hms.scroll');
if (s) { sessionStorage.removeItem('hms.scroll'); window.scrollTo(0, +s); }
(async () => {
  /* The app has no capability to wait for: it saves to the device, always can, and is never the
     read-only copy. `cap` only has to be non-null so the save chip leaves "checking…". */
  if (LOCAL) {
    cap = {local: true}; render();
    if (CLOUD) {
      // Signing in or out anywhere in Music changes what this page may fetch and where it saves.
      CLOUD.onChange(() => { cloudRefresh(); if (who()) syncSoon(600); else render(); });
      CLOUD.ready.then(() => { cloudRefresh(); syncSoon(1200); });
    }
    return;
  }
  cap = await (window.claude && claude.use ? claude.use('artifact') : Promise.resolve(null));
  /* PATCH-131 — re-render on EITHER outcome, not just failure. PATCH-129 gave the save chip a
     third state ("checking…") for the window before the capability answers, but this line only
     re-rendered when the answer was "no" — so a page that CAN save resolved successfully and then
     sat on "checking…" forever, because nothing redrew the rail. It corrected itself on the next
     click, which is exactly why it survived a route sweep: every check I ran had already clicked
     something. Caught by the offline pane, where the shimmed capability resolves instantly and the
     chip stayed wrong on a page that was fully writable. */
  if (!cap) readonly = true;
  render();
  /* PATCH-137 (F7) — kick a save that was queued before the capability existed. `save()` returns
     early when `cap` is null and does NOT reschedule, so anything dirtied in the first seconds —
     the boot reconcile's own writes, or a fast first tick — sat unsaved until some later change
     happened to trigger another save. Reproduced with a 4s-delayed capability stub. */
  if (pending && !readonly) save();
})();

/* PATCH-138 (I-3) — see the note on TODAY. Only acts when the date actually changed, so a tab
   switched to a hundred times a day re-renders zero times. */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  const now = iso(new Date());
  if (now === TODAY) return;
  TODAY = now;
  /* PATCH-165 (2026-09-23) — RE-RENDER, NEVER DIRTY. This read `if (reconcileReleases()) dirty()`,
     and dirty() schedules save(), and save() publishes buildDoc(P) — the WHOLE document rebuilt
     from THIS tab's in-memory state. So a tab left open on an old bundle, merely brought to the
     foreground on a later calendar day, silently republished its entire old self over the live
     page twenty seconds later, with nobody touching the school.

     That is how Nate's page reverted on 2026-09-19, 2026-09-20, and twice more on 2026-09-22 and
     09-23 — every time to the same 2026-08-25 build AND progress, which is one client's coherent
     snapshot rather than anything the build could produce. The publish API flagged both of the
     last two as "saved from inside the page", which is what ruled OUT a tool publish and ruled IN
     a stale client; the 09-20 post-mortem had concluded the opposite ("an open tab is not the
     culprit") and that is why PATCH-162 did not stop it. PATCH-136 (B2) had already named the
     symptom — "republishing the artifact daily from a page nobody had touched" — and removed one
     cause of the dirtying without closing the path itself.

     Nothing is lost by not saving here. reconcileReleases() is DERIVED and idempotent: it runs
     again on the next boot from the same inputs, and any real edit saves the reconciled state
     along with itself. The render still happens, so the timeline is correct for this session.

     This does NOT rescue a tab already open on an older bundle — that one runs the old code and
     has to be closed. It stops every bundle from here on from being able to do this. */
  reconcileReleases();
  render();
});
})();
