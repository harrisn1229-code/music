#!/usr/bin/env python3
"""Pull progress out of the published Music School artifact and write it into the vault.

    python3 Machine/Scripts/school-artifact/sync.py <artifact.html | progress.json> [--dry-run]

The page keeps its state in a `<script type="application/json" id="progress">` block, so
WebFetch'ing the artifact URL (which saves the full HTML locally) is enough to recover it.
Writes Machine/School/progress-<user>.json — deltas only, the shape /school and the plugin merge.
Homework lands in that file's `homework` section, NOT in the course notes' `- [x]` boxes: those
notes are shared with Britt, and per-person state does not belong in a shared note (spec-155).

MERGES, never replaces. The artifact owns concepts/courses/classes/tests/homework, plus
assignments/drills (spec-173) and notes; technique/books and anything unknown are carried through.

OWNED vs CARRIED is the whole safety story of this file. A carried section is read from the
VAULT and written back unchanged — so anything the page writes into a carried section is
silently replaced by the vault's older copy on the next sync, with no error and no warning.
spec-173 moved `assignments` (the per-lesson turn-in) and `drills` (spec-160's tempo log, which
the homework page now writes `tempo_current` into) across that line. If a future feature stores
state on the page, it belongs in OWNED the day it ships, not the week the practice log reverts.

The one asymmetry, deliberately: a section the page does not carry AT ALL is left alone rather
than emptied. A page built before this change has no `assignments`/`drills` key, and owning a
section that is not there would delete the vault's copy — the same data loss, in reverse.
"""
import base64, copy, datetime, json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
VAULT = HERE.parent.parent.parent
CUR = VAULT / "00 Human/20 Music/School & Content/Curriculum"
SCHOOL = VAULT / "Machine/School"

args = [a for a in sys.argv[1:] if not a.startswith("--")]
DRY = "--dry-run" in sys.argv
if not args:
    sys.exit(__doc__)
src = pathlib.Path(args[0]).expanduser()
raw = src.read_text(encoding="utf-8")

if src.suffix.lower() == ".json":
    state = json.loads(raw)
else:
    m = re.search(r'<script type="application/json" id="progress">(.*?)</script>', raw, re.S)
    if not m:
        sys.exit("No progress block in that file — is it the published artifact's HTML?")
    state = json.loads(m.group(1))

USER = state.get("user") or "nate"

# PATCH-157 — the top rating was renamed `nailed` -> `automatic`. A published build older than the
# rename still serves `nailed` in its progress block, and so does any tab left open on one, so this
# normalises on the way IN rather than trusting every surface to be current. Without it a single
# sync from a stale page silently reverts the rename across concepts and misses, on a file whose
# whole safety story is "a carried section reverts to the older copy with no error and no warning."
_RATING_RENAMES = {"nailed": "automatic"}

def _norm_ratings(st):
    n = 0
    for entry in (st.get("concepts") or {}).values():
        if isinstance(entry, dict) and entry.get("sr_last_rating") in _RATING_RENAMES:
            entry["sr_last_rating"] = _RATING_RENAMES[entry["sr_last_rating"]]; n += 1
    for entry in (st.get("misses") or {}).values():
        if isinstance(entry, dict) and entry.get("last_rating") in _RATING_RENAMES:
            entry["last_rating"] = _RATING_RENAMES[entry["last_rating"]]; n += 1
    return n

_renamed = _norm_ratings(state)
if _renamed:
    print(f"  ~ normalised {_renamed} legacy `nailed` rating(s) -> `automatic` (PATCH-157)")
# PATCH-137 (F10) — record PRESENCE before popping. `pop` collapses "the page has no homework key
# at all" and "the page says homework is empty" into the same falsy value, and the block below then
# emptied the vault's ticks for both. Every other section is careful about exactly this distinction
# (see `not_on_page`), and this file's own docstring calls destroying it "the same data loss, in
# reverse" — a page too old to know about a section must never be read as that section being empty.
had_homework = "homework" in state
homework = state.pop("homework", {}) or {}
sem_start = state.pop("semester_start", None)   # PATCH-015, per-person semester start
captured = state.pop("ext_lessons", None) or []  # PATCH-019, lessons captured on the page
uploads  = state.pop("ext_files", None) or []     # PATCH-146, files uploaded on the page
# spec-179 — the shared idea board's captures: {"ideas": [...], "notes": [...]}. Popped for the
# same reason `ext_lessons` is: it is not per-person progress to be merged, it is content on its
# way to becoming a note, and once it IS a note the page must stop carrying it. Anything this
# file cannot write is handed straight back below, exactly like a failed upload.
board    = state.pop("originals", None) or {}

# ---- 1. progress file: strip defaults, exactly as the vault stores them -------------
D_CONCEPT = {"status": "queued", "sr_interval": 0, "sr_ease": 2.5, "sr_due": None,
             "last_practiced": None, "sr_last_rating": None}
D_COURSE = {"status": "available", "lessons_complete": 0, "started": None, "completed": None}
D_CLASS = {"status": "available"}
D_TEST = {"status": "unsat", "attempts": []}
# spec-173. `assignments` is keyed "<courseId>:<lessonN>" — the turn-in for a whole lesson's
# homework, NOT the per-item ticks in `homework` (keyed "19:1:ho0") and NOT lesson completion.
D_ASSIGNMENT = {"status": "open", "turned_in": None}
# spec-160's tempo track, keyed by drill basename ("hanon-32"). `status` has a real default;
# `tempo_current` has none — it is unset until a session logs one, so prune() keeps any value
# that is not None. Identical semantics to the plugin's own trimDrills(), on purpose.
D_DRILL = {"status": "available", "tempo_current": None}

def prune(section, defaults):
    out = {}
    for ident, entry in (state.get(section) or {}).items():
        kept = {k: v for k, v in entry.items() if k in defaults and v != defaults[k]}
        kept.update({k: v for k, v in entry.items() if k not in defaults})
        if kept:
            out[ident] = kept
    return out

existing = json.loads(target.read_text(encoding="utf-8")) if (
    target := SCHOOL / f"progress-{USER}.json").exists() else {}

# PATCH-112 — `misses` (retakes of test questions marked wrong or partly right) is OWNED
# from the day it ships, per the rule stated above: the page re-schedules and clears these
# entries, so a carried copy would revert every rating on the next sync.
# PATCH-121 — `undo` (un-enroll backups) is OWNED: the page both writes them and CONSUMES them on
# recall, so a carried copy would resurrect a backup the reader had already spent.
OWNED = ("concepts", "courses", "classes", "tests", "assignments", "drills", "notes", "misses", "undo")
# `calendar` is owned by the VAULT alone, never read from the page: it maps "<course>:<lesson>"
# to the Google Calendar event id the reconcile created. The page has no idea calendars exist,
# and if this were read from the page it would come back empty and every event would be
# orphaned — created again next run, with the old ones left behind forever.
progress = dict(existing)                      # carry technique/books and anything unknown
progress["user"] = USER
progress["concepts"] = prune("concepts", D_CONCEPT)
progress["courses"] = prune("courses", D_COURSE)
progress["classes"] = prune("classes", D_CLASS)
progress["tests"] = prune("tests", D_TEST)
# spec-173 — the page writes these two, so the page is what they are read from. Skipped (and
# so left exactly as the vault has them) only when the page carries no such section at all,
# which is an artifact built before this shipped, not an empty one.
# --- notes: the page talking back --------------------------------------------------------
# Nate writes patch notes ON the page while using it; sync is what carries them home so a
# later session can act on them. This section is a LOG, not a keyed map, so prune() does not
# apply: entries are `{at, text}` plus a `filed` flag the VAULT owns.
#
# Merge rule, and it matters: the page's notes are UNIONED with the vault's on `at`, never
# replaced. The page cannot know which notes have already been filed — that flag is set here,
# in the vault, after someone acts on them — so taking the page as authoritative would erase
# the record of what was already handled and re-surface every note forever.
page_notes = state.get("notes")
if isinstance(page_notes, list):
    # PATCH-137 (C3) — a vault note the union cannot key must be CARRIED, not dropped. Entries are
    # matched on `at`; anything without one never entered `by_at` and so silently vanished on the
    # next sync — in the one section whose vault copy owns `filed`, i.e. the record of what has
    # already been acted on. Malformed is a reason to keep and complain, not to delete.
    by_at, unkeyed = {}, []
    for n in (existing.get("notes") or []):
        if isinstance(n, dict) and n.get("at"):
            by_at[n["at"]] = n
        else:
            unkeyed.append(n)
    if unkeyed:
        print(f"  ! {len(unkeyed)} vault note(s) have no `at` — carried through unmatched")
    fresh = []
    for n in page_notes:
        if not isinstance(n, dict) or not n.get("at") or not str(n.get("text") or "").strip():
            continue
        if n["at"] in by_at:
            # keep the vault's copy — it carries `filed`, which the page has no business setting
            continue
        by_at[n["at"]] = {"at": n["at"], "text": str(n["text"]).strip()}
        fresh.append(by_at[n["at"]])
    # newest first, house rule
    progress["notes"] = sorted(by_at.values(), key=lambda n: n["at"], reverse=True) + unkeyed
    NEW_NOTES = fresh
else:
    NEW_NOTES = []

not_on_page = []
for _sec, _defaults in (("assignments", D_ASSIGNMENT), ("drills", D_DRILL)):
    if _sec in state:
        progress[_sec] = prune(_sec, _defaults)
    else:
        not_on_page.append(_sec)

# PATCH-128 — `misses` and `undo` are OWNED and were never being WRITTEN. Naming a section in
# OWNED only reaches the reporting loop below and the `carried` line; the actual hand-over is the
# explicit assignments above, and these two were added to the tuple (PATCH-112, PATCH-121) without
# an assignment to match. `progress = dict(existing)` had already seeded them from the vault, so
# every retake rating and every un-enroll backup made on the page was discarded on the next sync —
# and because both copies were the vault's, the report printed `misses 3 -> 3` and looked correct.
# Found by the spec-157 shakedown, 2026-08-24.
#
# Neither goes through prune(): a miss is a question, an answer and a reason, and an undo entry is
# a snapshot — every field is content, not a delta off a default, so there is nothing to strip and
# stripping would gut the record. Same treatment `notes` gets, for the same reason.
for _sec in ("misses", "undo"):
    if _sec in state:
        progress[_sec] = copy.deepcopy(state[_sec])
    else:
        not_on_page.append(_sec)
if had_homework:
    progress["homework"] = {k: True for k, v in homework.items() if v}
else:
    not_on_page.append("homework")   # carried from the vault, untouched
if sem_start:
    progress["semester_start"] = sem_start
else:
    progress.pop("semester_start", None)

# ---- outside lessons: page captures become real notes -------------------------------
LESSON_DIR = VAULT / "00 Human/20 Music/Users" / USER.capitalize() / "Lessons"
# PATCH-136 (B4) — a MAP, not a set: the body is kept so a reused id can be told apart from a
# genuinely-already-synced one. Ids used to be position-derived and are still stamped on notes
# written before that was fixed, so this stays useful for as long as those notes exist.
existing_caps = {}
if LESSON_DIR.exists():
    for lp in LESSON_DIR.glob("*.md"):
        _body = lp.read_text(encoding="utf-8")
        m = re.search(r"^capture_id:\s*(\S+)", _body, re.M)
        if m:
            existing_caps[m.group(1).strip('"\'')] = _body

written = []
for lesson in captured:
    cid = lesson.get("id")
    if not cid:
        continue
    if cid in existing_caps:
        # PATCH-136 (B4) — a seen id is normally just an already-synced capture, which is exactly
        # what this skip is for. But ids used to be position-derived and could be REUSED for
        # different content, in which case skipping silently discards a real lesson. Old ids are
        # still out there on synced notes, so say something rather than assume: the reader can then
        # tell "already synced" from "this is new content wearing an old id".
        _cov = (lesson.get("covered") or "").strip()
        if _cov and _cov[:60] not in (existing_caps.get(cid) or ""):
            print(f"  ! capture {cid} is already in the vault but the page's copy differs —"
                  f" not overwritten. Re-capture it on the page to get a fresh id.")
        continue
    date = lesson.get("date") or "undated"
    inst = (lesson.get("instrument") or "lesson").strip()
    # PATCH-136 (B3) — these two go straight into a FILENAME and both are free text typed on the
    # page. An instrument of "piano/vocals" made the path a directory that does not exist, so the
    # write raised FileNotFoundError and the whole sync died BEFORE the progress write below — the
    # session's ratings, homework ticks and retakes never reached the vault, and every retry failed
    # the same way until the capture was deleted on the page. `--dry-run` exited 0 and predicted
    # success, so the failure only ever appeared on the real run.
    safe = lambda t: re.sub(r'[\\/\x00:*?"<>|]', "-", t).strip() or "lesson"
    date, inst = safe(date), safe(inst)
    stem = f"{date} {inst.title()} Lesson"
    path = LESSON_DIR / f"{stem}.md"
    n = 2
    while path.exists():
        path = LESSON_DIR / f"{stem} ({n}).md"; n += 1
    hw = "\n".join(f"- [ ] {h.get('html','').strip()}"
                   for h in (lesson.get("homework") or []) if h.get("html"))
    next_date = (lesson.get("next_date") or "").strip()
    # spec-178 -- LIFT ANY SOUNDSLICE URL INTO `soundslice:` FRONTMATTER.
    #
    # Captured homework is free text and Nate pastes the slice straight into it, which is the
    # natural thing to do on a phone after a lesson. But the Soundslice shelf (and the buttons on
    # the lesson card) read the FRONTMATTER list, not the homework body -- so a captured lesson
    # used to land with its slice visible only as a bare URL in a checkbox, absent from the shelf
    # built to collect exactly these. Found the day the shelf shipped, on Nate's own 2026-09-02
    # capture. The homework line is left exactly as typed: it is what he wrote, build.py matches
    # the slice to it by hash, and the two are meant to agree rather than one replacing the other.
    _seen, _ss = set(), []
    for _h in (lesson.get("homework") or []):
        for _u in re.findall(r"https?://(?:www\.)?soundslice\.com/slices/[A-Za-z0-9_-]+/?",
                             _h.get("html", "") or ""):
            if _u not in _seen:
                _seen.add(_u)
                _ss.append(_u)
    # Bare URLs, no label: the label is Nate's to write and build.py already falls back to
    # "Open in Soundslice", then overwrites the button with the slice's real fetched title.
    ss_block = ("soundslice:\n" + "\n".join(f"  - {u}" for u in _ss)) if _ss else "soundslice: []"
    body = f"""---
type: outside-lesson
instrument: {inst}
date: {date}
next_date: {next_date}
teacher:
{ss_block}
capture_id: {cid}
enriched: false
---

# {inst.title()} lesson — {date}

## Covered

{(lesson.get('covered') or '').strip() or '_Not recorded._'}

## Homework

{hw or '_None set._'}

## Links

_Not linked yet. Read what was covered, find the concepts and notes that actually teach it, put real
wikilinks here, then set `enriched: true`. Link only — do not assign quizzes._
"""
    if not DRY:
        # PATCH-136 (B3) — and never let one unwritable note cost the sync. Sanitising above fixes
        # the known cause; this makes the class of failure non-fatal, because the progress write is
        # the valuable half and it happens after this loop. A note that cannot be written is
        # reported and skipped, not raised.
        try:
            LESSON_DIR.mkdir(parents=True, exist_ok=True)
            path.write_text(body, encoding="utf-8")
        except OSError as exc:
            print(f"  ! could not write {path.name}: {exc} — skipped, progress still synced")
            continue
    written.append(path.name)

if captured:
    print(f"  outside lessons: {len(captured)} on the page, {len(written)} new note(s)"
          + (" [dry run]" if DRY else ""))
    for w in written:
        print(f"    + Users/{USER.capitalize()}/Lessons/{w}")

# ---- PATCH-146: uploads become real files -------------------------------------------
# The other half of the page's upload button. A file picked on the page is held in the progress
# island — the one thing this system persists reliably — and this is where it stops being held
# and starts being a file. It is `pop`ped above, so once written it is GONE from the page's state
# on the next build: the page carries an upload for hours, the vault carries it after that.
#
# Names are date-prefixed rather than dropped in a per-lesson folder, and that is deliberate:
# build.py claims a loose `Resources/<YYYY-MM-DD> …` file by DATE (PATCH-145), so a file written
# here attaches even when its lesson note does not exist yet — an upload made before the lesson
# was synced is not lost, it just waits for the note. A folder would have to be named after a
# note that is not there.
#
# Nothing here may take the sync down. The progress write below is the valuable half, and it
# happens after this loop — same rule the lesson-note writer above follows.
RES_DIR = LESSON_DIR / "Resources"
_saved, _failed, _kept = [], [], []
for _u in uploads:
    try:
        _name = re.sub(r'[\\/\x00:*?"<>|]', "-", str(_u.get("name") or "file")).strip() or "file"
        _lid = str(_u.get("lesson") or "")
        # The lesson id IS the note's filename stem, which starts with the date. Fall back to the
        # upload's own stamp so a file can never end up with no date to be claimed by.
        _m = re.match(r"(\d{4}-\d{2}-\d{2})", _lid) or re.match(r"(\d{4}-\d{2}-\d{2})",
                                                                str(_u.get("at") or ""))
        _date = _m.group(1) if _m else datetime.date.today().isoformat()
        _out = RES_DIR / (_name if _name.startswith(_date) else f"{_date} {_name}")
        _n = 2
        while _out.exists():                     # never overwrite; a second photo is a second file
            _out = _out.with_name(f"{_out.stem} ({_n}){_out.suffix}"); _n += 1
        if not DRY:
            RES_DIR.mkdir(parents=True, exist_ok=True)
            _out.write_bytes(base64.b64decode(_u.get("b64") or "", validate=False))
        _saved.append((_out.name, len(_u.get("b64") or "") * 3 // 4))
    except Exception as exc:                                  # noqa: BLE001
        # It was popped off the page's state at the top of this file, so if it is not written
        # here and not handed back, it is GONE — the one outcome an upload button must never
        # have. Kept in `ext_files` so the next build hands it back to the page still waiting.
        _failed.append(f"{_u.get('name', '?')}: {type(exc).__name__} — kept on the page")
        _kept.append(_u)
if _kept:
    progress["ext_files"] = _kept
if uploads:
    print(f"  uploads: {len(uploads)} from the page, {len(_saved)} written to Lessons/Resources/"
          + (" [dry run]" if DRY else ""))
    for _n2, _sz in _saved:
        print(f"    + {_n2}  ({_sz // 1024} KB)")
    for _f2 in _failed:
        print(f"    ! not written: {_f2}", file=sys.stderr)
    if _saved and not DRY:
        print("    run /school artifact to rebuild — they render on the lesson from the vault now")

# ---- spec-179: the idea board's captures become notes ---------------------------------
# The other half of the Originals tab. An idea typed on the page lives in the progress island —
# the only thing this system persists reliably — and this is where it stops being page state and
# becomes a note in a folder `sync-shared.sh` mirrors, which is the whole reason the board works
# across two people who can never write to the same artifact.
#
# IDEMPOTENCE IS THE WHOLE JOB HERE, and it is not optional. A capture stays on the page until a
# REBUILD replaces the page, so between this sync and the next `/school artifact` any save hands
# these same captures over again. Both halves therefore match on a stable id — `capture_id:` in
# the note's frontmatter, `<!-- nid:… -->` above each comment — and a second pass writes nothing.
# Content is never the key: two people can legitimately write the same sentence on the same day.
#
# Ideas are written BEFORE comments, and that ordering is load-bearing: a comment can target an
# idea captured in this very run, which has no note until the loop above makes one.
ORIG_DIR = VAULT / "00 Human/20 Music/School & Content/Originals"
_o_new, _o_notes, _o_failed, _o_keep_i, _o_keep_n = [], [], [], [], []


def _o_slug(title):
    """A filename from a title. The capture_id is the real join, so this only has to be legible
    and legal — a collision is resolved with a suffix rather than by hashing the name."""
    out = re.sub(r'[\\/\x00:*?"<>|#^\[\]]', "-", str(title or "").strip())
    out = re.sub(r"\s+", " ", out).strip(" .-")
    return (out[:80] or "Untitled idea")


def _o_index():
    """capture_id -> path, over every `type: song-idea` note in the shared folder."""
    idx = {}
    for q in sorted(ORIG_DIR.glob("*.md")) if ORIG_DIR.exists() else []:
        if q.stem.startswith("_"):
            continue
        try:
            head = q.read_text(encoding="utf-8")[:2000]
        except OSError:
            continue
        m = re.search(r"^capture_id:\s*(\S+)\s*$", head, re.M)
        if m:
            idx[m.group(1)] = q
    return idx


# CAPTURES ALSO ARRIVE BY A SECOND ROUTE, and missing it would have stranded them for good.
# The offline Obsidian pane writes the page's whole progress object straight into
# `progress-<user>.json` (it has no draining step of its own beyond `ext_files`), so an idea typed
# there is already in the VAULT's copy and never appears in the page state this script was handed.
# `progress = dict(existing)` would then carry it forward untouched, sync after sync, and it would
# never become a note. So both sources are drained, deduped by id — the page's copy wins on a
# collision, being the one the reader last saw.
_from_vault = (existing.get("originals") or {}) if isinstance(existing.get("originals"), dict) else {}
progress.pop("originals", None)          # re-set below only if something fails to write


def _o_merge(key):
    seen, out = set(), []
    for _e in list(board.get(key) or []) + list(_from_vault.get(key) or []):
        _k = str((_e or {}).get("id") or "")
        if _k and _k in seen:
            continue
        seen.add(_k)
        out.append(_e)
    return out


board = {"ideas": _o_merge("ideas"), "notes": _o_merge("notes")}

_o_have = _o_index()
for _i in (board.get("ideas") or []):
    _cid = str(_i.get("id") or "").strip()
    try:
        if not _cid:
            raise ValueError("capture has no id")
        if _cid in _o_have:
            continue                      # already filed by an earlier sync — the dedupe working
        _title = str(_i.get("title") or "").strip() or "Untitled idea"
        _path = ORIG_DIR / f"{_o_slug(_title)}.md"
        _n = 2
        while _path.exists():             # a second idea may honestly share a title
            _path = ORIG_DIR / f"{_o_slug(_title)} ({_n}).md"; _n += 1
        _started = str(_i.get("started") or _i.get("at") or datetime.date.today().isoformat())
        # `## Notes` is emitted EMPTY and always present. The comment writer below inserts at the
        # top of it, and a note missing the heading would send every reply to the bottom of the
        # file instead — newest-first is the house rule and this is where it is established.
        _body = f"""---
type: song-idea
title: {_title}
by: {str(_i.get('by') or USER.capitalize()).strip()}
status: {str(_i.get('status') or 'spark').strip()}
key: {str(_i.get('key') or '').strip()}
bpm: {str(_i.get('bpm') or '').strip()}
feel: {str(_i.get('feel') or '').strip()}
started: "{_started}"
capture_id: {_cid}
tags:
  - original
  - idea
---

# {_title}

## The idea

{str(_i.get('idea') or '').strip() or '_Not written down yet._'}

## Notes
"""
        if not DRY:
            ORIG_DIR.mkdir(parents=True, exist_ok=True)
            _path.write_text(_body, encoding="utf-8")
        _o_have[_cid] = _path
        _o_new.append(_path.name)
    except Exception as exc:                                  # noqa: BLE001
        # Popped at the top of this file, so unwritten and unreturned means GONE. Handed back on
        # the page instead, where it stays visible as "not synced" and gets another chance.
        _o_failed.append(f"idea {_i.get('title', '?')}: {type(exc).__name__} — kept on the page")
        _o_keep_i.append(_i)

# Oldest FIRST, because each one is inserted at the top of the section: insert in chronological
# order and the newest ends up on top, which is the house rule. Insert in list order and the
# section comes out exactly backwards — `at` is the reader-visible date and it does not have to
# agree with the order the captures were appended (TODAY is a snapshot on a tab left open, and a
# page can hold two days of notes before anyone syncs).
for _c in sorted(board.get("notes") or [], key=lambda c: str(c.get("at") or "")):
    _nid = str(_c.get("id") or "").strip()
    _tgt = str(_c.get("target") or "").strip()
    try:
        if not _nid or not _tgt:
            raise ValueError("comment has no id or no target")
        _path = _o_have.get(_tgt)
        if _path is None:
            # The idea it belongs to is not in the vault — its own capture failed above, or it was
            # deleted there. Keep BOTH on the page rather than writing an orphan comment nothing
            # would ever render.
            raise FileNotFoundError(f"no note for idea {_tgt}")
        # A dry run never wrote the idea's note, so there is nothing on disk to append to and
        # nothing to dedupe against. Counting it as written is the honest answer to "what would
        # this do" — reporting it as a failure would send someone hunting a bug that only exists
        # because --dry-run asked for no side effects.
        if DRY and not _path.exists():
            _o_notes.append(_path.name)
            continue
        _cur = _path.read_text(encoding="utf-8")
        if re.search(r"<!--\s*nid:" + re.escape(_nid) + r"\s*-->", _cur):
            continue                      # already appended by an earlier sync
        _entry = (f"<!-- nid:{_nid} -->\n"
                  f"### {str(_c.get('by') or USER.capitalize()).strip()} — "
                  f"{str(_c.get('at') or datetime.date.today().isoformat())}\n\n"
                  f"{str(_c.get('text') or '').strip()}\n\n")
        # Inserted directly under `## Notes` — newest-first, like every other log in this vault
        # ([[feedback_newest_first_ordering]]). If the heading is somehow missing (a note written
        # by hand without one), the section is created at the end rather than the comment lost.
        # `[ \\t]*`, never `\\s*` — `\\s` matches newlines, so a greedy `\\s*$` swallowed the blank
        # lines below the heading into the match and each insert then added two more of its own.
        _m = re.search(r"^##[ \t]+Notes[ \t]*$", _cur, re.M)
        if _m:
            _out = _cur[:_m.end()] + "\n\n" + _entry + _cur[_m.end():].lstrip("\n")
        else:
            _out = _cur.rstrip("\n") + "\n\n## Notes\n\n" + _entry
        if not DRY:
            _path.write_text(_out, encoding="utf-8")
        _o_notes.append(_path.name)
    except Exception as exc:                                  # noqa: BLE001
        _o_failed.append(f"note on {_tgt or '?'}: {type(exc).__name__} — kept on the page")
        _o_keep_n.append(_c)

# ---- the board's log gets a line for every input, without anyone remembering to write one ----
# Nate asked for "a specific change log or notes page that records all inputs and shit". The half
# that matters is that it is not a discipline: everything this script writes, it logs. A line is
# appended ONLY for work actually done this run — a capture skipped by the dedupe above writes no
# note and therefore no log line, which is what keeps a re-sync from filling the page with repeats.
_o_log_add = ([f"Added **{n[:-3]}**" for n in _o_new]
              + [f"Note added to **{n[:-3]}**" for n in _o_notes])
if _o_log_add and not DRY:
    _lp = ORIG_DIR / "_Log.md"
    try:
        _today = datetime.date.today().isoformat()
        _who = USER.capitalize()
        _new_lines = "\n".join(f"- **{_today}** · {_who} · {w}" for w in _o_log_add)
        if _lp.exists():
            _cur = _lp.read_text(encoding="utf-8")
            _m = re.search(r"^##[ \t]+Log[ \t]*$", _cur, re.M)
            if _m:
                # Top of the section, like every other log in this vault.
                _lp.write_text(_cur[:_m.end()] + "\n\n" + _new_lines + "\n"
                               + _cur[_m.end():].lstrip("\n"), encoding="utf-8")
            else:
                _lp.write_text(_cur.rstrip("\n") + "\n\n## Log\n\n" + _new_lines + "\n",
                               encoding="utf-8")
        else:
            # The folder can legitimately exist without the log — a clone that predates it, or a
            # fresh one. Better a bare log than a lost line; _README.md documents the full header.
            _lp.write_text("---\ntype: reference\ntags: [originals, school, shared, log]\n---\n\n"
                           "# Originals — log\n\nEvery input to the board, newest first.\n\n"
                           "## Log\n\n" + _new_lines + "\n", encoding="utf-8")
        print(f"    · {len(_o_log_add)} line(s) added to Originals/_Log.md")
    except OSError as exc:
        # Never fatal. The notes are the valuable half and they are already on disk; a missing log
        # line is a gap in a record, not lost work.
        print(f"    ! could not update _Log.md: {exc}", file=sys.stderr)

# Hand back only what failed, and only if something did — an empty `originals` key on a page that
# never had one is noise the next build would have to guard against.
if _o_keep_i or _o_keep_n:
    progress["originals"] = {"ideas": _o_keep_i, "notes": _o_keep_n}
if board.get("ideas") or board.get("notes"):
    print(f"  originals: {len(board.get('ideas') or [])} idea(s) and "
          f"{len(board.get('notes') or [])} note(s) waiting — "
          f"{len(_o_new)} new note(s), {len(_o_notes)} comment(s) appended"
          + (" [dry run]" if DRY else ""))
    for _w in _o_new:
        print(f"    + School & Content/Originals/{_w}")
    for _f in _o_failed:
        print(f"    ! not written: {_f}", file=sys.stderr)
    if (_o_new or _o_notes) and not DRY:
        print("    run /school artifact to rebuild, then ./Machine/Scripts/sync-shared.sh --commit"
              " — nothing reaches the other person until it is on the repo")


def fields(entry):
    return " ".join(f"{k}={v}" for k, v in sorted((entry or {}).items())) or "(default)"

print(f"progress-{USER}.json")
for sec in OWNED:
    if sec == "notes":
        continue          # a log, not a keyed map — reported on its own below, with the text
    if sec in not_on_page:
        print(f"  {sec:11} {len(existing.get(sec) or {})} -> carried (no `{sec}` on the page)")
        continue
    print(f"  {sec:11} {len(existing.get(sec) or {})} -> {len(progress.get(sec) or {})}")
    # A tempo that moved does not change any COUNT — 1 drill in, 1 drill out — so the two
    # sections the page writes per-entry values into say which entries moved, by name. The
    # other four churn on every sync and would drown this in noise.
    if sec in ("assignments", "drills"):
        was, now = existing.get(sec) or {}, progress.get(sec) or {}
        for k in sorted(set(was) | set(now)):
            if was.get(k) == now.get(k):
                continue
            mark = "+" if k not in was else ("-" if k not in now else "~")
            print(f"    {mark} {k}: {fields(was.get(k))} -> {fields(now.get(k))}")
print(f"  homework    {len(existing.get('homework') or {})} -> {len(progress.get('homework') or {})}")
print(f"  semester    start {existing.get('semester_start') or '(shared default)'} -> "
      f"{progress.get('semester_start') or '(shared default)'}")
_unfiled = [n for n in (progress.get("notes") or []) if not n.get("filed")]
print(f"  notes       {len(existing.get('notes') or [])} -> {len(progress.get('notes') or [])}"
      f"  ({len(NEW_NOTES)} new, {len(_unfiled)} unfiled)")
if NEW_NOTES:
    print("  --- NEW PATCH NOTES FROM THE PAGE ---")
    for _n in NEW_NOTES:
        print(f"    · [{_n['at']}] {_n['text']}")
    print("  File these (/patch), then set \"filed\": true on each in progress-<user>.json.")
_cal = progress.get("calendar") or {}
if _cal:
    print(f"  calendar    {len(_cal)} lesson event(s) mapped (vault-owned, not read from the page)")
# spec-179 — `originals` is neither OWNED nor CARRIED. It is a THIRD kind, like ext_lessons
# and ext_files: popped off the page, written out as notes, and only the failures handed
# back. Naming it here keeps the report honest — it is not "carried through untouched", and
# a reader who saw it in that list would reasonably conclude the board had not been read.
carried = [k for k in existing if k not in OWNED + ("user", "homework", "semester_start",
                                                    "notes", "calendar", "originals")]
if carried:
    print(f"  carried through untouched: {', '.join(carried)}")
# PATCH-115 — a sync leaves a trace. The Sync page shows the vault's own history back to the
# reader, and nothing else in the system records that a sync happened at all: the page cannot know
# (it is not running when this does), and the file's mtime is one bit that the next write destroys.
# Written into a CARRIED section on purpose — the page must never own or overwrite it — so it
# reaches the page on the next build.py, which is the same lag every other vault-side edit has.
_log = existing.get("sync_log") or []
_log.insert(0, {
    "at": datetime.datetime.now().astimezone().replace(microsecond=0).isoformat(),
    "source": src.name,
    "concepts": len(progress.get("concepts") or {}),
    "tests": len(progress.get("tests") or {}),
    "misses": len(progress.get("misses") or {}),
    "homework": len(progress.get("homework") or {}),
    "notes_new": len(NEW_NOTES),
})
progress["sync_log"] = _log[:30]          # newest first, last 30 kept
if not DRY:
    target.write_text(json.dumps(progress, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("[dry run — nothing written]" if DRY else "written")
