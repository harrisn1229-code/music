#!/usr/bin/env python3
"""Build the Music School artifact — one self-contained HTML page from the vault.

Reads the curriculum notes (classes, courses, concepts), School Config, syllabus.json
and progress-<user>.json, and writes school.html beside this file. That file is what
`Artifact` publishes; the published page then writes its own progress back to itself
via the `artifact` capability, and `/school sync` pulls it home.

    python3 Machine/Scripts/school-artifact/build.py
    python3 Machine/Scripts/school-artifact/build.py --user britt --out school-britt.html

Re-run after ANY edit to a course/class/concept note — the page is a generated bundle,
never hand-edited (same rule as the plugin's main.js).

ONE PAGE PER PERSON. The curriculum is shared; progress is not. --user picks whose
progress-<user>.json seeds the page, and --out keeps the two builds in separate files so they
publish as separate artifacts. Never publish two people from one file path.
"""
import base64, collections, datetime, hashlib, json, pathlib, re, html, shutil, subprocess, sys, unicodedata, urllib.request
import markdown

HERE = pathlib.Path(__file__).resolve().parent
VAULT = HERE.parent.parent.parent
CUR = VAULT / "00 Human/20 Music/School & Content/Curriculum"
SCHOOL = VAULT / "Machine/School"

argv = sys.argv[1:]
def _opt(flag, default=None):
    return argv[argv.index(flag) + 1] if flag in argv and argv.index(flag) + 1 < len(argv) else default

# THE APP BUILD (2026-11) — this repo's default. `build.py` with no flags writes the installable
# web app into docs/ (what GitHub Pages serves): a small index.html, app.js/app.css, the
# curriculum as data/*.json, and the public-domain book pages as individual images.
#
# The app carries NO licensed material and NO ONE'S progress:
#   * book scans still in copyright, chord-chart PDFs, album art and any other embedded file that
#     is not in this repo are shipped as NAMED SLOTS — the reader adds their own copy in the app,
#     where it is kept in the browser's storage on that device and never uploaded anywhere;
#   * progress starts empty and is saved on the device (plus the optional GitHub sync).
#
# `--out <file>` (or `--artifact`) still writes the old single-file page for one person, exactly
# as before, for anyone who publishes it as a Claude artifact.
APP = "--artifact" not in argv and not _opt("--out")
# Where the app is written. This source lives inside the Music app's repo (`music/school-src/`),
# and the app is School's folder there (`music/school/`), so with no --dest that is where it goes:
#   python3 school-src/Machine/Scripts/school-artifact/build.py      (from the music repo)
# --dest writes it somewhere else (a scratch copy to compare against, say).
APP_DIR = (pathlib.Path(_opt("--dest")).expanduser().resolve() if _opt("--dest")
           else VAULT.parent / "school" if (VAULT.parent / "apps.js").exists() else VAULT / "docs")
USER = _opt("--user")
if not USER:
    lu = SCHOOL / "local-user.json"
    USER = "me" if APP else (json.loads(lu.read_text()).get("user", "nate") if lu.exists() else "nate")
OUT = HERE / _opt("--out", "school.html")

# PATCH-161 — the <title> carries WHOSE page this is. Two people's pages are two artifacts with
# the same name in one gallery, and telling them apart meant opening both (2026-09-19, after
# Nate's reverted to an August build and he could not tell which card was his).
# app.js's buildDoc() re-emits this title from `document.title` on every self-save, so the two
# must stay in step: hardcoding the name in EITHER place is what silently renames a page back.
TITLE = "School" if APP else f"Music School — {USER.title()}"

# ---------------------------------------------------------------- config
# Throttles that the page must agree with. School Config.md is the authority;
# these are the fallbacks if its ```config fence stops parsing as YAML.
CONFIG = {
    "daily_drip": 3, "taught_limit": 2,
    # spec-172 Phase 3b: the instrument lane's own allowance, separate from taught_limit
    # (which stays 2). Instrument courses never consume a taught slot -- Nate's call,
    # 2026-08-20: "give instrument its own lane and lessons per week."
    "instrument_limit": 2,
    # 2026-08-20 (spec-172): courses 17/18 retired, and 13 was never the standing one --
    # Course 09 (Ear Training Method) is, in Class 4. Mirrors School Config as corrected there.
    "standing_courses": ["09"], "standing_classes": ["4"],
    "lesson_pass": 75, "final_pass": 80,
    "sr": {"start_interval": 2, "min_interval": 2, "max_interval": 90,
           "default_ease": 2.5, "ease_step": 0.15},
}
def _read_config(txt):
    """Pull the scalars we need by name. The ```config fence is YAML-shaped but carries
    prose comments with colons in them, so a full yaml.safe_load is not reliable here."""
    def num(section, key):
        m = re.search(rf"^{section}:\n(?:[ \t].*\n|\n)*?[ \t]+{key}:\s*(\d+)", txt, re.M)
        return int(m.group(1)) if m else None
    def lst(section, key):
        m = re.search(rf"^{section}:\n(?:[ \t].*\n|\n)*?[ \t]+{key}:\s*\[([^\]]*)\]", txt, re.M)
        return [x.strip().strip('"\'') for x in m.group(1).split(",") if x.strip()] if m else None
    got = {"daily_drip": num("concepts", "daily_drip"), "taught_limit": num("courses", "taught_limit"),
           "standing_courses": lst("courses", "standing"), "standing_classes": lst("classes", "standing"),
           "lesson_pass": num("tests", "lesson_pass"), "final_pass": num("tests", "final_pass")}
    missing = [k for k, v in got.items() if v is None]
    if missing:
        raise ValueError("not found in School Config: " + ", ".join(missing))
    # OPTIONAL, and deliberately outside the `missing` check above: a School Config that
    # predates spec-172 Phase 3b has no instrument_limit, and that must fall back to the
    # built-in default rather than taking the whole throttle parse down with it.
    instr = num("courses", "instrument_limit")
    if instr is not None:
        got["instrument_limit"] = instr
    return got

def _read_strands(txt):
    """The 17-strand subject taxonomy out of the ```config fence.

    PATCH-012 (spec-171) gives every strand a visual identity on the published page, and the
    page needs the strand's human label and its domain to do it. Both already exist, in
    School Config's `theory_strands:` / `production_strands:` blocks -- so they are read from
    there rather than duplicated in app.js, where renaming a strand in the config would
    silently leave the page saying the old thing. `i` is the strand's position in its
    declared display order; the page spreads its per-domain hue arc along it, so the order
    the config lists strands in is the order the colours run.

    The `emoji:` field is deliberately NOT carried over: five of the emoji are duplicates
    across strands (FND/NOT both, VOI/BLU both, RHY/DRM both, FX/MIX both), so the set does
    not identify a strand. The 3-letter key does, and it is typographically controllable.
    """
    out = {}
    for section, dom in (("theory_strands", "theory"), ("production_strands", "production")):
        m = re.search(rf"^{section}:.*\n((?:(?:[ \t].*)?\n)*)", txt, re.M)
        if not m:
            continue
        for i, it in enumerate(re.finditer(
                r"^[ \t]+-[ \t]+key:[ \t]*(\S+)[ \t]*\n[ \t]+label:[ \t]*(.+?)[ \t]*$",
                m.group(1), re.M)):
            out[it.group(1)] = {"label": it.group(2), "domain": dom, "i": i}
    if not out:
        raise ValueError("no strand entries found")
    return out


def _read_semester(txt):
    """semester.start / semester.weeks out of the ```config fence -- same targeted-regex
    approach as _read_config, kept separate so a missing/malformed semester: block doesn't
    take the throttle parse down with it (and vice versa)."""
    m = re.search(r"^semester:\n(?:[ \t].*\n|\n)*?[ \t]+start:\s*(\S+)", txt, re.M)
    w = re.search(r"^semester:\n(?:[ \t].*\n|\n)*?[ \t]+weeks:\s*(\d+)", txt, re.M)
    if not (m and w):
        raise ValueError("semester.start/weeks not found in School Config")
    return m.group(1), int(w.group(1))


def _read_pace(txt):
    """The per-week pacing of each TRACK, out of the same `semester:` block.

    spec-172 Phase 3b added a third track (instrument) and with it a third number, and the
    page, /school replan and the Learning card must all agree on it. School Config is the
    authority (same as start/weeks, PATCH-001); syllabus.json's semester{} is the mirror the
    other two actually read, so anything found here is synced into that file below.

    A missing key is a supported state -- the mirror keeps whatever it already had, and
    app.js falls back to its own 2/1/3 defaults. Returns only the keys actually present."""
    out = {}
    for key in ("theory_lessons_per_week", "production_lessons_per_week",
                "instrument_lessons_per_week"):
        m = re.search(rf"^semester:\n(?:[ \t].*\n|\n)*?[ \t]+{key}:\s*(\d+)", txt, re.M)
        if m:
            out[key] = int(m.group(1))
    return out

try:
    cfg_txt = (CUR / "School Config.md").read_text(encoding="utf-8")
    block = re.search(r"```config\n(.*?)\n```", cfg_txt, re.S)
    if not block:
        raise ValueError("no ```config fence")
    CONFIG.update(_read_config(block.group(1)))
except Exception as e:                                    # noqa: BLE001
    print(f"  ! School Config not parsed ({e}) — using built-in throttles", file=sys.stderr)
    block = None

# The strand taxonomy is read separately so a malformed strand block cannot take the
# throttle parse down with it. An empty CONFIG["strands"] is a supported state: the page
# falls back to deriving the strand list from the concepts themselves, keyed by the
# 3-letter code with no label.
CONFIG["strands"] = {}
if block:
    try:
        CONFIG["strands"] = _read_strands(block.group(1))
    except Exception as e:                                # noqa: BLE001
        print(f"  ! School Config strands not parsed ({e}) — the page will label them by key",
              file=sys.stderr)

SEM = {"name": "Fall 2026", "start": "2026-08-10", "weeks": 17}
syl_path = SCHOOL / "syllabus.json"
SYL = json.loads(syl_path.read_text(encoding="utf-8")) if syl_path.exists() else {}
if SYL.get("semester"):
    SEM = SYL["semester"]

# PATCH-001 (spec-171): School Config.md's semester.start / semester.weeks are now
# authoritative -- see the comment on that block for why. syllabus.json's copies of those
# two fields are a generated mirror, synced here on every rebuild rather than left to
# drift: school-replan.cjs, school-syllabus-render.py and the Command Center Learning
# card (lib/school-state.js buildSemesterState) all read syllabus.json's semester{}
# directly and are out of this patch's scope, so syncing the file they already read is
# lower-risk than re-pointing three more places at School Config. semester.end stays
# owned by `/school replan --apply`, which is drift-aware in a way this script can't be
# (its math needs `rows` + lessons_complete) -- build.py only recomputes end, as the
# undrifted start+weeks*7-1 that buildSemesterState itself calls plannedEnd, when
# start/weeks actually changed since the last sync. Run `/school replan --apply`
# afterward for a drift-aware end once the plan has real `rows`.
try:
    if not block:
        raise ValueError("no ```config fence")
    cfg_start, cfg_weeks = _read_semester(block.group(1))
    # spec-172 Phase 3b: the three per-week paces ride the same mirror. They were duplicated
    # in School Config and syllabus.json with NOTHING keeping them in sync, which is how the
    # instrument lane could have shipped with the page pacing it at 3 and /school replan at 2.
    cfg_pace = _read_pace(block.group(1))
    pace_drift = {k: v for k, v in cfg_pace.items() if SEM.get(k) != v}
    dates_drift = SEM.get("start") != cfg_start or int(SEM.get("weeks") or 0) != cfg_weeks
    if dates_drift or pace_drift:
        syl_sem = SYL.setdefault("semester", {}) if syl_path.exists() else None
        new_end = None
        if dates_drift:
            y, mo, d = (int(x) for x in cfg_start.split("-"))
            new_end = (datetime.date(y, mo, d)
                       + datetime.timedelta(days=cfg_weeks * 7 - 1)).isoformat()
            SEM["end"] = new_end
            if syl_sem is not None:
                syl_sem["start"], syl_sem["weeks"], syl_sem["end"] = cfg_start, cfg_weeks, new_end
        if syl_sem is not None:
            syl_sem.update(cfg_pace)
        if syl_sem is not None:
            syl_path.write_text(json.dumps(SYL, indent=2, ensure_ascii=False) + "\n",
                                encoding="utf-8")
        if dates_drift:
            print(f"  ! semester start/weeks changed in School Config -> synced into syllabus.json "
                  f"(end recomputed as {new_end}; run /school replan --apply for a drift-aware date)",
                  file=sys.stderr)
        if pace_drift:
            print("  ! semester pacing changed in School Config -> synced into syllabus.json ("
                  + ", ".join(f"{k}={v}" for k, v in sorted(pace_drift.items())) + ")",
                  file=sys.stderr)
    SEM["start"], SEM["weeks"] = cfg_start, cfg_weeks
    SEM.update(cfg_pace)
except Exception as e:                                    # noqa: BLE001
    print(f"  ! School Config semester not parsed ({e}) — using syllabus.json as-is", file=sys.stderr)

# ---------------------------------------------------------------- markdown
def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        return {}, text
    fm = {}
    lines = m.group(1).splitlines()
    i = 0
    while i < len(lines):
        km = re.match(r'^([a-z_]+):\s*(.*)$', lines[i])
        if not km:
            i += 1
            continue
        k, v = km.group(1), km.group(2).strip()
        if v.startswith("[") and v.endswith("]"):
            v = [x.strip().strip('"\'') for x in v[1:-1].split(",") if x.strip()]
            i += 1
        elif v == "" and i + 1 < len(lines) and re.match(r'^\s+-\s', lines[i + 1]):
            # YAML block sequence. Obsidian writes lists this way as readily as the inline
            # form, and reading only the inline form silently dropped Class 2's course list —
            # the note was correct, the parser was not (found 2026-08-19).
            v, i = [], i + 1
            while i < len(lines) and re.match(r'^\s+-\s', lines[i]):
                v.append(lines[i].split("-", 1)[1].strip().strip('"\''))
                i += 1
        else:
            raw, v = v, v.strip('"\'')
            # A YAML double-quoted scalar escapes its own quotes. Stripping the delimiters without
            # unescaping leaves the backslashes in the text, and they render literally — spec-176
            # found it on the song notes' `composition:`, which is one long sentence with quoted
            # titles inside it and reads as `\"Cool Blues,\"` on the page. Scoped to a value that
            # really was double-quoted, so a plain string containing a backslash is left alone.
            if len(raw) > 1 and raw[0] == raw[-1] == '"':
                v = v.replace('\\"', '"').replace("\\\\", "\\")
            if v in ("true", "false"):
                v = v == "true"
            i += 1
        fm[k] = v
    return fm, text[m.end():]


def posint(v, default=0):
    """A frontmatter number that may be absent, blank, or hand-typed as something odd.

    Returns `default` instead of raising: these notes are edited by hand in Obsidian and a
    mistyped pacing key must not take the whole build down. The existing `int(x or n)` idiom
    reads fine for keys that have always been there (`target_pct`, `lessons`); a key that is
    absent on 25 of 26 courses wants a total function.
    """
    try:
        n = int(str(v).strip())
    except (TypeError, ValueError):
        return default
    return n if n > 0 else default


LINK_INDEX = {}          # basename -> ("course"|"class"|"concept", id)

def wikilinks(text):
    def sub(m):
        target, alias = m.group(1), m.group(2)
        # `.rstrip("\\")` — inside a markdown TABLE the alias bar is escaped (`[[Neumann TLM
        # 102\|TLM 102]]`), and the pattern above stops at the bar, so the backslash was riding
        # along on the end of the note name and no lookup could ever match it. Found by the
        # PATCH-159 link audit: 6 spans, all in mic-technique tables.
        target = target.split("#")[0].split("|")[0].strip().rstrip("\\").strip()
        base = target.split("/")[-1]
        if not base:                      # [[#A heading in this note]] — nothing to link to
            return html.escape(alias or m.group(0))
        label = html.escape(alias or base)
        hit = LINK_INDEX.get(base)
        if hit:
            kind, ident = hit
            return (f'<button type="button" class="xlink xlink-{kind}" '
                    f'data-goto="{kind}:{html.escape(ident)}">{label}</button>')
        # PATCH-159 — the note's REAL basename rides along. Before this the only thing that
        # crossed into the page was the rendered LABEL, so an aliased link ([[Guitar
        # Positions|positions]]) or one written in another case ([[INTERVALS]]) could never be
        # resolved by app.js no matter what pages the bundle gained — it was matching on a
        # string the vault does not key anything by. Nothing reads the `title`; that is for a
        # reader hovering a span this build genuinely could not place.
        return (f'<span class="xlink xlink-vault" data-note="{html.escape(base)}" '
                f'title="Vault note — not in this page">{label}</span>')
    return re.sub(r"\[\[([^\[\]|]+)(?:\|([^\[\]]+))?\]\]", sub, text)

CALLOUT = re.compile(r"^> \[!(\w+)\](-?)\s*(.*?)$")

def callouts(text):
    """Obsidian callouts -> <div class=callout> / <details> for the collapsible form."""
    out, lines, i = [], text.split("\n"), 0
    while i < len(lines):
        m = CALLOUT.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        kind, fold, title = m.group(1).lower(), m.group(2), m.group(3)
        body, i = [], i + 1
        while i < len(lines) and lines[i].startswith(">"):
            body.append(lines[i][1:].lstrip(" ") if lines[i] != ">" else "")
            i += 1
        inner = md("\n".join(body))
        head = title or kind.title()
        if fold == "-":
            out.append(f'<details class="callout co-{kind}"><summary>{md_inline(head)}</summary>'
                       f'<div class="co-body">{inner}</div></details>')
        else:
            out.append(f'<div class="callout co-{kind}"><p class="co-title">{md_inline(head)}</p>'
                       f'<div class="co-body">{inner}</div></div>')
    return "\n".join(out)

_MD = markdown.Markdown(extensions=["extra", "sane_lists"], output_format="html5")

# PATCH-137 (F12) — neutralise raw HTML in vault prose before it becomes page markup.
# python-markdown passes inline HTML through verbatim, and app.js interpolates the stored html into
# innerHTML — so `<img src=x onerror=...>` typed into any scanned note runs for every viewer, on a
# page that holds a live artifact-publish capability. These notes are shared-authorship (Britt's
# clone can edit them and Nate rebuilds from whatever arrives), so "we only write trusted markdown"
# is not a property anyone can enforce.
#
# Only genuinely dangerous constructs are removed rather than escaping all `<`: the curriculum
# legitimately contains `<br>`, `<b>`, `<sup>` and similar in hand-written notes, and escaping those
# would visibly break pages to fix a hazard none of them carry. Script/style/iframe/object/embed
# elements, every `on*=` handler, and `javascript:` URLs are what actually execute.
_RAW_TAGS = re.compile(r"</?\s*(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*>",
                       re.I)
_RAW_ON   = re.compile(r"""\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)""", re.I)
_RAW_JS   = re.compile(r"""((?:href|src)\s*=\s*['"]?)\s*javascript:""", re.I)

_YT_IMG = re.compile(r'<img\b[^>]*\bsrc="https?://(?:www\.|m\.)?(?:youtube\.com|youtu\.be)/[^"]*"[^>]*>', re.I)
_EMPTY_PRE = re.compile(r'<pre><code(?: class="[^"]*")?>\s*</code></pre>\n?')
def defang(html_text):
    """Strip the constructs that can execute; leave ordinary inline formatting alone."""
    out = _RAW_TAGS.sub("", html_text)
    out = _RAW_ON.sub("", out)
    # `![](https://www.youtube.com/watch?v=…)` is how Obsidian embeds a player; as HTML it is an
    # <img> pointing at a web page, which can only ever draw a broken-image frame. The note's own
    # "Watch on YouTube" link sits on the next line, so nothing is lost by dropping it.
    out = _YT_IMG.sub("", out)
    # An Obsidian plugin's block with nothing in it (```drill-controls```) is a widget in the vault
    # and an empty grey box here.
    out = _EMPTY_PRE.sub("", out)
    return _RAW_JS.sub(r"\1", out)

# A list item at column 0. Ordered forms are capped at TWO digits on purpose: `\d{1,9}` would
# match a line opening "1985. It was a good year", and inserting a blank line above that is what
# would TURN it into a list — the rule would manufacture the bug it exists to prevent.
LIST_ITEM = re.compile(r"^([-*+]|\d{1,2}[.)])\s+\S")


def tight_lists(text):
    """Insert the blank line Python-Markdown needs before a list that follows a paragraph.

    `sane_lists` (see `_MD`) will not start a list on the line after a paragraph — by design, it
    is there to stop a stray hyphen mid-sentence becoming a bullet. Obsidian has no such rule, so
    a note written and previewed in Obsidian renders as a list there and as ONE RUN-ON PARAGRAPH
    here, hyphens and all. Measured 2026-09-10: **251 notes** under `School & Content/` are
    written this way — course notes, song notes, the reading the lessons pull. Nate, seeing it on
    his own song page: *"fix the lists thing."*

    Fixing it in the notes was the wrong lever (251 files, and the next note typed re-breaks it)
    and dropping `sane_lists` was too blunt — it guards the mid-sentence-hyphen case that this
    corpus, full of em-dashed prose, would trip constantly. So the blank line is inserted at
    RENDER time, for exactly the shape that is unambiguous.

    Four guards, each ruling out a place where the insert would change meaning rather than fix it:
      · fenced code — a `- ` there is content, and a blank line inside a fence is a blank line;
      · an INDENTED predecessor — that is a lazy continuation or a nested list, and breaking there
        turns a tight list loose (every item wrapped in its own `<p>`) for no reason;
      · a predecessor that is itself a list item — same list, already fine;
      · a heading, blockquote or table row — markdown already starts a list after all three.
    """
    out, fence = [], False
    for ln in text.split("\n"):
        st = ln.lstrip()
        if st.startswith("```") or st.startswith("~~~"):
            fence = not fence
            out.append(ln)
            continue
        if not fence and LIST_ITEM.match(ln) and out:
            prev = out[-1]
            if (prev.strip() and not prev[:1].isspace()
                    and not LIST_ITEM.match(prev)
                    and prev[:1] not in ("#", ">", "|")):
                out.append("")
        out.append(ln)
    return "\n".join(out)


def md(text):
    if not text or not text.strip():
        return ""
    _MD.reset()
    # tight_lists FIRST, on the raw source: callouts() emits finished HTML into the line
    # stream and re-enters md() for its body, so running after it would be inserting blank
    # lines between HTML blocks instead of before markdown lists.
    out = _MD.convert(callouts(wikilinks(tight_lists(text.strip()))))
    # stray task lines outside the lesson parser render as static marks
    out = out.replace("<li>[ ] ", '<li class="tk">').replace("<li>[x] ", '<li class="tk tk-on">')
    return defang(out)

def md_inline(text):
    if not text:
        return ""
    _MD.reset()
    out = _MD.convert(wikilinks(text.strip()))
    return defang(re.sub(r"^<p>(.*)</p>$", r"\1", out.strip(), flags=re.S))

def strip_fences(text):
    return re.sub(r"```[a-z-]*-controls\n?```\n?", "", text)

# PATCH-005 (spec-171): the `| Lesson | Title | Concepts | Test |` table at the top of a
# course note duplicates the sticky `.uindex` lesson list courseView() renders in the
# right-hand sidebar (app.js) -- a table written before that sidebar existed. It has to
# stay in the note itself: school-course-lint.py's header-order check requires it between
# "**What it assumes**" and "**What this unlocks**", and cross-checks each row's title and
# concept count against the ### Lesson heading and frontmatter. So it is stripped here, at
# render time, out of the page only -- the note on disk (and the lint) are untouched.
#
# STILL LOAD-BEARING after spec-172. Every course 01-16 and 19-26 opens with one of these
# tables and the lint requires it, so the strip stays. It remains scoped to the course
# INTRO only (see the COURSES loop), so a similarly-shaped table written inside a later
# ## section still renders. The book courses' `Pages` column is read out of this same
# table by lesson_pages() BEFORE the strip runs -- do not move the strip earlier.
LESSON_INDEX_TABLE = re.compile(
    r"^\|\s*Lesson\s*\|.*\n"     # header row: | Lesson | Title | Concepts | Test |
    r"^\|[ \t\-:|]+\n"            # separator row: |-----|---|---|---|
    r"(?:^\|.*\n)*"               # data rows
    r"\n?",                       # the blank line the table leaves behind
    re.M,
)

def strip_lesson_index_table(text):
    return LESSON_INDEX_TABLE.sub("", text)

# ---------------------------------------------------------- reading material (PATCH-010)
# A lesson's **Read** block is a list of pointers into the textbook:
#
#     - [ ] [[Notes & Pitches]] → *Sharps & flats*, *Half-steps & whole-steps*
#     - [ ] [[INTERVALS]] → the table, top to bottom
#     - [ ] [[Scales]] in full — it's 65 lines
#
# Those notes live in the vault, not in this page, so on the published artifact every Read
# line was dead text and the reading step could not actually be done there. This block pulls
# the named material INTO the bundle: the link resolves to a note, the `→` suffix resolves to
# one or more headings inside it, and the heading's subtree is rendered to HTML and parked in
# a shared pool that app.js folds in under the task line.
#
# Three rules keep this honest and keep the page small:
#   1. NOTHING here may raise. Every failure degrades to a coarser pull and, at worst, to
#      today's behaviour -- the link on its own. Misses are counted and printed, never fatal.
#   2. Pull SECTIONS, not notes, wherever a section is named. All 72 notes wholesale is
#      1,481 KB of markdown; the named sections are 90 KB of it.
#   3. Drop the enrichment tail. `## From videos` is /music-enrich's video digest and is
#      1,069 KB of that 1,481 KB across these notes -- 72% of the corpus, none of it the
#      assigned reading. `Related` / `See also` are link lists that render as dead
#      xlink-vault spans here. Both come out of whole-note pulls; a section pull that names
#      one of them by heading still gets it.
SC_ROOT = CUR.parent                        # 00 Human/20 Music/School & Content
# Search order for a bare basename. Obsidian resolves [[X]] by basename regardless of case
# and regardless of folder, so this index is CASE-INSENSITIVE -- [[INTERVALS]] is
# Theory/Fundamentals/Intervals.md, and a case-sensitive lookup finds nothing.
READ_ROOTS = ["Theory", "Guitar", "Bass", "Piano", "Production", "Books",
              "Ensemble", "Song Library", "YouTube Notes"]
READ_INDEX, READ_AMBIG = {}, {}
try:
    _ord = {n: i for i, n in enumerate(READ_ROOTS)}
    for _p in sorted(SC_ROOT.rglob("*.md"),
                     key=lambda q: (_ord.get(q.relative_to(SC_ROOT).parts[0], 99), str(q))):
        _top = _p.relative_to(SC_ROOT).parts[0]
        if _top == "Curriculum":            # the school's own notes are already in the page
            continue
        # Originals moved out of School into its own app. The folder's notes are still never
        # read as source pages here: they are the readers' own song ideas, and this repo is public.
        if _top == "Originals":
            continue
        _k = _p.stem.lower()
        if _k in READ_INDEX:
            READ_AMBIG.setdefault(_k, [READ_INDEX[_k]]).append(_p)
        else:
            READ_INDEX[_k] = _p
except Exception as e:                                    # noqa: BLE001
    print(f"  ! reading index not built ({e}) — Read lines stay links only", file=sys.stderr)

# ------------------------------------------------ embedded files -> named slots (app build)
# A note's `![[Some File.pdf]]` used to be dropped outright ("vault embeds can't resolve here").
# In the app build it becomes a SLOT instead: a small block that carries the file's name. If the
# file is in this repo it is copied to docs/files/ and the slot shows it; if it is not — a
# licensed PDF, a vendor's screenshot, anything this repo deliberately does not carry — the app
# offers "add your copy", keeps what the reader picks on their own device, and shows it in place.
# The join is the FILE NAME and nothing else, which is also what lets someone add a whole folder
# at once and have every file land where it belongs.
SHIP_W = 1600                # px: the widest a shipped picture is written
SLOT_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf", ".mp4", ".mov", ".m4a", ".mp3"}
MEDIA_INDEX = {}             # lowercased basename -> path, for files that ARE in the repo
try:
    for _p in sorted(SC_ROOT.rglob("*")):
        if _p.is_file() and _p.suffix.lower() in SLOT_EXT:
            MEDIA_INDEX.setdefault(_p.name.lower(), _p)
except Exception:                                         # noqa: BLE001
    pass
SLOTS = {}                   # file name -> {"have": bool, "n": how many notes embed it}
_EMBED_LINE = re.compile(r"^!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]\s*$", re.M)

def _slot(m, song=False):
    name = m.group(1).strip().split("/")[-1]
    ext = pathlib.PurePosixPath(name).suffix.lower()
    # A song note's sleeve is drawn by the song page's own header; a second copy in the body
    # would only repeat it. Audio renders (the ear-training clips) are synthesised by the page.
    if not APP or ext not in SLOT_EXT or (song and m.group(1).strip().startswith("Images/")):
        return ""
    have = name.lower() in MEDIA_INDEX
    e = SLOTS.setdefault(name, {"have": have, "n": 0})
    e["n"] += 1
    return (f'\n\n<div class="byo" data-file="{html.escape(name, quote=True)}"'
            + (' data-have="1"' if have else "") + '></div>\n\n')

# Section names in a Read pointer are written the way a person says them, not the way the
# heading is spelled: "rhythm notation" for "## 5. Rhythm notation", "accidental scope rules"
# for "## 4. Accidentals and key signatures". Normalising strips the ordinal prefix, folds
# punctuation and de-pluralises, so those land on the same key.
_ORDINAL = re.compile(r"^\s*\d+[a-z]?[.)]\s*")
def _hnorm(s):
    s = re.sub(r"\[\[([^\[\]|]+)\|([^\[\]]+)\]\]", r"\2", s or "")
    s = re.sub(r"\[\[([^\[\]]+)\]\]", r"\1", s)
    s = _ORDINAL.sub("", s.strip().lower()).replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return " ".join(w[:-1] if len(w) > 3 and w.endswith("s") else w for w in s.split())

ENRICH_H = re.compile(r"^(from videos.*|related|see also|sources?|further reading|"
                      r"where this is taught in the vault)$", re.I)
WIKI = re.compile(r"\[\[([^\[\]|]+)(?:\|([^\[\]]+))?\]\]")
# One whole-note pull is capped so a single 30k-word note cannot dominate a lesson (or the
# bundle). It cuts on a heading boundary and the page says how much is left in the vault.
WHOLE_CAP = 22000

_note_cache = {}
def load_note(base):
    """Basename -> {title, body, heads}. None if the vault has no such note."""
    p = READ_INDEX.get((base or "").strip().lower())
    if not p:
        return None
    key = str(p)
    if key in _note_cache:
        return _note_cache[key]
    try:
        _fm, body = frontmatter(p.read_text(encoding="utf-8"))
    except Exception:                                     # noqa: BLE001
        _note_cache[key] = None
        return None
    body = re.sub(r"^#\s+.+$", "", body, count=1, flags=re.M)   # the H1 repeats the title
    # Embeds: dropped in the single-file page (nothing to resolve them against), slots in the app.
    _is_song = str(_fm.get("type", "")) in ("song-ref", "song-collection")
    body = _EMBED_LINE.sub(lambda m: _slot(m, _is_song), body)
    body = re.sub(r"^!\[\[[^\]]*\]\]\s*$", "", body, flags=re.M)  # anything left (unclosed, odd) goes
    # spec-176 — the Song Practice card's block. It is EMPTY on disk (the Obsidian plugin draws
    # it at read time), so outside Obsidian it renders as a blank <pre> at the top of all 117 song
    # notes. Same class of thing as the embed above: a vault-only construct with nothing to show
    # here. Only the empty form is stripped — a fence someone actually typed content into stays.
    body = re.sub(r"^```song-pickup\n```\s*$", "", body, flags=re.M)
    heads = [{"lvl": len(m.group(1)), "title": m.group(2).strip(),
              "hs": m.start(), "bs": m.end()}
             for m in re.finditer(r"^(#{2,6})\s+(.+?)\s*$", body, re.M)]
    for i, h in enumerate(heads):
        h["end"] = len(body)
        for j in heads[i + 1:]:
            if j["lvl"] <= h["lvl"]:
                h["end"] = j["hs"]
                break
    _note_cache[key] = {"title": p.stem, "body": body, "heads": heads}
    return _note_cache[key]

def match_head(nt, want):
    """A spoken section name -> the heading it means. Four passes, loosest last."""
    tgt = _hnorm(want)
    if not tgt:
        return None
    hm = {}
    for h in nt["heads"]:
        hm.setdefault(_hnorm(h["title"]), h)
    if tgt in hm:
        return hm[tgt]
    cand = [h for k, h in hm.items() if k and (k.startswith(tgt) or tgt.startswith(k))]
    if len(cand) == 1:                       # "ledger lines and octave signs" -> "3. Ledger lines"
        return cand[0]
    tw = set(tgt.split())
    best, score = None, 0.0
    for k, h in hm.items():
        kw = set(k.split())
        if not kw:
            continue
        ov = len(tw & kw)
        sc = ov / max(1, min(len(tw), len(kw)))
        if ov >= 2 and sc > score:
            best, score = h, sc
    if score >= 0.6:
        return best
    # Last pass: a distinctive opening word that occurs in exactly ONE heading of the note
    # ("accidental" -> "4. Accidentals and key signatures"). Deliberately narrow -- >=5
    # characters and unique, or it stays unresolved and falls back.
    for w in tgt.split():
        if len(w) < 5:
            continue
        hits = [h for k, h in hm.items() if w in k.split() and not ENRICH_H.match(h["title"])]
        return hits[0] if len(hits) == 1 else None
    return None

def _teaching_body(nt):
    """The note minus its enrichment tail. Returns (markdown, sections_dropped)."""
    tops = [h for h in nt["heads"] if h["lvl"] == 2]
    if not tops:
        return nt["body"], 0
    out, dropped = nt["body"][:tops[0]["hs"]], 0
    for h in tops:
        if ENRICH_H.match(h["title"]):
            dropped += 1
            continue
        out += nt["body"][h["hs"]:h["end"]]
    return out, dropped

def _demote(text, floor=4):
    """Shift the pulled headings under the lesson's own h3 so they never outrank it.

    `floor` is the shallowest heading the pull is allowed to render at. 4 for a fold inside a
    lesson (the lesson's own heading is an h3); 3 on a source page, where the note IS the page
    and its own `##` sections are the top level under the page title. It must never be 2:
    app.css styles `.prose h3`-`h6` and nothing else, so an h2 in pulled prose renders as an
    unstyled browser default."""
    lvls = [len(m.group(1)) for m in re.finditer(r"^(#{1,6})\s+\S", text, re.M)]
    if not lvls:
        return text
    shift = max(0, floor - min(lvls))
    return re.sub(r"^(#{1,6})(\s+)",
                  lambda m: "#" * min(6, len(m.group(1)) + shift) + m.group(2), text, flags=re.M)

def _lede(text, n=155):
    """First real sentence of prose, plain text — the line the collapsed fold shows.

    Some sections open on a table with no prose at all ([[INTERVALS]] is one). Rather than
    show an empty line the fold says what shape the material is, so the reader still knows
    what is behind the toggle without opening it."""
    for line in text.split("\n"):
        s = line.strip()
        if not s or s[0] in "#|>" or s.startswith("```") or set(s) <= set("-*_ "):
            continue
        s = re.sub(r"^(?:[-*+]|\d+[.)])\s+", "", s)
        s = re.sub(r"\[\[([^\[\]|]+)\|([^\[\]]+)\]\]", r"\2", s)
        s = re.sub(r"\[\[([^\[\]]+)\]\]", r"\1", s)
        s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
        s = re.sub(r"[*_`]", "", s)
        s = re.sub(r"\s+", " ", s).strip()
        if len(s) < 25:
            continue
        return s[:n].rstrip() + "…" if len(s) > n else s
    rows = len([l for l in text.split("\n")
                if l.strip().startswith("|") and not re.match(r"^\|[ \t\-:|]+$", l.strip())])
    return f"A table, {rows - 1} rows." if rows > 2 else ""

READING = {}
READ_STATS = {"lines": 0, "links": 0, "section": 0, "note": 0, "opening": 0, "missing": 0}
READ_MISSES = []

def _slug(s):
    return re.sub(r"-{2,}", "-", re.sub(r"[^a-z0-9]+", "-", (s or "").lower())).strip("-")[:64] or "x"

def _entry(nt, head=None, opening=False):
    """Park one pulled chunk in the shared pool; return its id. Deduped across all 18 courses."""
    trimmed = 0
    if head:
        rid = f'{_slug(nt["title"])}--{_slug(head["title"])}'
        src, title, kind = nt["body"][head["bs"]:head["end"]], head["title"], "section"
    elif opening:
        top = nt["heads"][0]["hs"] if nt["heads"] else len(nt["body"])
        src = nt["body"][:top]
        if len(src.strip()) < 40:            # nothing above the first heading — give the note
            return _entry(nt)
        rid, title, kind = f'{_slug(nt["title"])}--opening', nt["title"], "opening"
    else:
        src, _dropped = _teaching_body(nt)
        rid, title, kind = _slug(nt["title"]), nt["title"], "note"
        # `more` counts only TEACHING sections withheld by the cap. The enrichment tail
        # _teaching_body drops is not reading material, so it is not advertised as missing.
        # Offsets are taken against `src` (post-strip), never against nt["body"].
        if len(src) > WHOLE_CAP:             # cut on a heading boundary, never mid-sentence
            tops = [m.start() for m in re.finditer(r"^## \S", src, re.M)]
            keep = [o for o in tops if o <= WHOLE_CAP]
            edge = keep[-1] if keep else WHOLE_CAP
            src, trimmed = src[:edge], max(1, len([o for o in tops if o >= edge]))
    if rid not in READING:
        READING[rid] = {"note": nt["title"], "title": title, "kind": kind,
                        "html": md(_demote(src)), "lede": _lede(src),
                        "words": len(re.findall(r"\S+", src)), "more": trimmed}
    READ_STATS[kind] += 1
    return rid

# ------------------------------------------------------- the source page (PATCH-144)
# PATCH-053 made the note name on a Read line open the ASSIGNED SLICE in place, because that
# slice was the only part of the note this page carried. Nate, 2026-08-26: *"i want those links
# to go to the actual page instead of just expanding the section below. i like how it is now but
# want the link to go to the actual page so i can get more info if i want."*
#
# So the fold stays exactly as it is — it is the assigned reading and it opens without leaving
# the lesson — and the note name beside it becomes what it always looked like: a link to the
# note. That note now has a page in this bundle. Same three constraints as PATCH-010:
#
#   1. Only notes something in the school actually ASSIGNS get a page. The nine reading roots
#      hold 3,635 notes and 24 MB of teaching body; the 73 that a **Read** line points at are
#      375 KB of it. A page for every note in the vault is not a bigger feature, it is a
#      different bundle.
#   2. The enrichment tail stays out, for the same reason it stays out of a whole-note pull —
#      `## From videos` is 72% of this corpus and none of it is the note. The page SAYS how
#      many sections it is not showing, so "the rest is in the vault" is a fact you can see
#      rather than something the page quietly decides for you.
#   3. Nothing here may raise. A note that will not load has no page, and its link stays the
#      inert span it is today.
SOURCES = {}
SRC_INDEX = {}                 # note basename, lowercased -> source id (app.js links on this)
SRC_USED = {}                  # source id -> ["01:2", ...] the lessons that assign it
SOURCE_CAP = 60000             # the largest assigned note is 23 KB; this is a bound, not a trim


def _cut(src, cap):
    """Trim to `cap` characters on the best boundary there is; return (text, sections_withheld).

    A top-level heading first, so a trimmed page ends where a section ends. PATCH-159 added the
    paragraph fallback: at SOURCE_CAP every note has a `## ` above the cut, but a REFERENCE page
    is capped at a couple of thousand characters and plenty of notes open with more prose than
    that before their first heading — those were being sliced mid-sentence. The half-cap floor
    keeps the fallback from cutting the page down to a title when the only blank line is early.
    """
    if len(src) <= cap:
        return src, 0
    tops = [m.start() for m in re.finditer(r"^## \S", src, re.M)]
    keep = [o for o in tops if o <= cap]
    if keep:
        edge = keep[-1]
    else:
        para = src.rfind("\n\n", 0, cap)
        edge = para if para > cap // 2 else cap
    return src[:edge], max(1, len([o for o in tops if o >= edge]))


def _source(nt, cap=SOURCE_CAP, ref=False):
    """Park one whole note as its own page; return its id. Deduped across all 18 courses.

    `ref` marks a page the LINK CLOSURE added (PATCH-159) rather than one a **Read** line
    assigns. It changes nothing about how the page is built — only what it is allowed to cost
    (`cap`) and what the page says it is. An assigned note always wins: the closure runs last
    and this returns early on a note that already has a page, so nothing is ever downgraded to
    a reference page by being linked from one.
    """
    sid = _slug(nt["title"])
    SRC_INDEX[nt["title"].lower()] = sid
    if sid in SOURCES:
        return sid
    src, dropped = _teaching_body(nt)
    src, trimmed = _cut(src, cap)
    body_html = md(_demote(src, floor=3))
    # The contents strip, read back OUT of the rendered html rather than off nt["heads"].
    # The two can disagree — the cap above can drop sections, and _demote can shift a note
    # that starts at `###` — and app.js scrolls to these BY INDEX into the rendered <h3>s, so
    # a list that is merely nearly right would land the reader on the wrong section.
    # `html.unescape` because these come back out of RENDERED markup: a heading containing "&" is
    # `&amp;` by the time it is read here, and app.js escapes whatever it is given — so the strip
    # printed "Production &amp; Arrangement". Unescape here rather than skipping esc() there; the
    # strip is the only consumer, and a raw "&" is what it should have been handed all along.
    secs = [html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", h)).strip())
            for h in re.findall(r"<h3[^>]*>(.*?)</h3>", body_html, re.S)]
    SOURCES[sid] = {
        "title": nt["title"], "html": body_html,
        "words": len(re.findall(r"\S+", src)), "secs": secs,
        "extra": dropped, "more": trimmed,
    }
    if ref:
        SOURCES[sid]["ref"] = 1
    return sid


def reading_for(task_text, sink=None):
    """Every [[link]] on one **Read** line -> the ids of the material it points at.

    The `→` suffix binds to the link it FOLLOWS, so `[[Bass Design]], then [[Kick Design]] →
    the kick/bass clash bullets` pulls Bass Design whole and only a slice of Kick Design.

    `sink`, if given, collects the SOURCE page id of every note this line resolved (PATCH-144).
    It is a separate channel from the return value on purpose: the ids that come back are
    slices and there may be several per note, while a source is one page per note and the
    caller wants it to record who assigns what.
    """
    ids, ms = [], list(WIKI.finditer(task_text))
    READ_STATS["lines"] += 1
    for i, m in enumerate(ms):
        base = m.group(1).split("#")[0].split("/")[-1].strip().rstrip("\\").strip()
        tail = task_text[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(task_text)]
        READ_STATS["links"] += 1
        nt = load_note(base)
        if not nt:
            READ_STATS["missing"] += 1
            READ_MISSES.append(f"no such note: [[{base}]]")
            continue
        try:
            # PATCH-144 — the note gets a page whatever the pointer resolves to below. A
            # pointer that names a section still names a NOTE, and that note is what the link
            # on the line goes to.
            sid = _source(nt)
            if sink is not None and sid not in sink:
                sink.append(sid)
        except Exception as e:                            # noqa: BLE001
            READ_MISSES.append(f"no source page: [[{base}]] ({e})")
        try:
            named = re.findall(r"\*([^*]+)\*", tail.split("→", 1)[1]) if "→" in tail else []
            hits = []
            for w in named:
                h = match_head(nt, w)
                if h:
                    hits.append(h)
                else:
                    READ_MISSES.append(f"no such section: [[{base}]] → *{w.strip()}*")
            if hits:
                ids += [_entry(nt, head=h) for h in hits]
            elif "→" in tail:
                # A pointer that names no heading we can find — "→ the table, top to bottom",
                # "→ the energy-tier bullets". The note's opening is the sensible landing
                # place for those (for [[INTERVALS]] the opening IS the table) and it is a
                # far smaller pull than the whole note.
                if not named:
                    READ_MISSES.append(f"prose pointer: [[{base}]] {tail.strip()[:52]}")
                ids.append(_entry(nt, opening=True))
            else:
                ids.append(_entry(nt))
        except Exception as e:                            # noqa: BLE001
            READ_STATS["missing"] += 1
            READ_MISSES.append(f"pull failed: [[{base}]] ({e})")
    return ids

# ---------------------------------------------------------------- concepts
concepts = {}
for p in sorted((CUR / "Concepts").glob("*.md")):
    fm, body = frontmatter(p.read_text(encoding="utf-8"))
    if fm.get("type") != "school-concept":
        continue
    LINK_INDEX[p.stem] = ("concept", p.stem)
    concepts[p.stem] = {"raw": body, "fm": fm, "path": p}

# ---------------------------------------------------------------- courses / classes
course_files, class_files = {}, {}
for p in sorted((CUR / "Courses").glob("*.md")):
    fm, body = frontmatter(p.read_text(encoding="utf-8"))
    if fm.get("type") != "school-course":
        continue
    cid = str(fm.get("course_id"))
    LINK_INDEX[p.stem] = ("course", cid)
    course_files[cid] = (fm, body, p.stem)
for p in sorted((CUR / "Classes").glob("*.md")):
    fm, body = frontmatter(p.read_text(encoding="utf-8"))
    if fm.get("type") != "school-class":
        continue
    kid = str(fm.get("class_id"))
    LINK_INDEX[p.stem] = ("class", kid)
    class_files[kid] = (fm, body, p.stem)

# concepts resolve now that LINK_INDEX is complete
CONCEPTS = {}
for cid, c in concepts.items():
    body, fm = c["raw"], c["fm"]
    title = re.search(r"^# (.+)$", body, re.M)
    q = re.search(r"^\*\*Q\.\*\*\s*(.+?)(?=\n\n|\n> \[)", body, re.S | re.M)
    ans = re.search(r"^> \[!question\]-.*?\n((?:>.*\n?)*)", body, re.M)
    ans_txt = ""
    if ans:
        ans_txt = "\n".join(l[1:].lstrip(" ") if l != ">" else "" for l in ans.group(1).split("\n"))
    def section(name):
        m = re.search(rf"^## {name}\s*\n(.*?)(?=^## |\Z)", body, re.S | re.M)
        return md(m.group(1)) if m else ""
    CONCEPTS[cid] = {
        "id": cid,
        "title": (title.group(1).strip() if title else cid),
        "short": re.sub(r"^[A-Z0-9]+-C\d+\s+—\s+", "", (title.group(1).strip() if title else cid)),
        "strand": fm.get("strand", ""),
        "domain": fm.get("domain", ""),
        "course": re.sub(r"[\[\]]", "", str(fm.get("course", ""))).split("—")[0].strip().replace("Course ", ""),
        "lesson": posint(fm.get("lesson"), 0),   # PATCH-137 (F13b)
        "source": re.sub(r"[\[\]]", "", str(fm.get("source", ""))),
        "q": md(q.group(1)) if q else "",
        "a": md(ans_txt),
        "why": section("Why it matters"),
        "drill": section("Drill"),
    }

LESSON_H = re.compile(r"^### Lesson (\d+)\s*—\s*(.+)$", re.M)
# PATCH-136 (B7) — a label may carry a trailing clause. All five lessons of Course 09 write
# `**The routine** — this is the homework. ~10 minutes, daily...`, which this regex rejected
# because it demanded the label ALONE on its line. The block then went unrecognised and its text
# fell into the preceding Concepts chunk, which keeps wikilinks and discards everything else — so
# the standing ear-training course shipped with no routine to tick, no `**Test**` line, and
# duplicated concept ids. The page is the only school surface, so that homework was undoable
# anywhere. The suffix is allowed and ignored; the label itself still has to be exact.
# The suffix must NOT cross a newline, and that is the whole subtlety. Written first as
# `(?:\s*[—–-].*)?`, it ate the first task of nearly every block: `\s*` matches a NEWLINE, the
# next line begins `- [ ]`, and that list bullet satisfied `[—–-]` — so `**Read**\n- [ ] …` matched
# as one label and the task vanished. It orphaned `01:1:ho2`, the tick that records a sat test.
# `[ \t]*` and `[^\n]*` keep the match on one line, which is all the suffix was ever for.
LABEL = re.compile(r"^\*\*(Read|The material|Concepts|Homework|The routine)\*\*(?:[ \t]*[—–-][^\n]*)?[ \t]*$", re.M)
TASK = re.compile(r"^-\s+\[( |x)\]\s+(.*)$")

def parse_lesson_body(cid, unum, text):
    """Split one lesson into its labelled blocks; tasks become addressable checkboxes."""
    parts, marks = [], list(LABEL.finditer(text))
    lead = text[:marks[0].start()] if marks else text
    for i, m in enumerate(marks):
        end = marks[i + 1].start() if i + 1 < len(marks) else len(text)
        parts.append((m.group(1), text[m.end():end]))
    blocks = []
    for label, chunk in parts:
        if label == "Concepts":
            ids = [b for b in re.findall(r"\[\[([^\[\]|]+)(?:\|[^\[\]]+)?\]\]", chunk)
                   if b.split("/")[-1] in CONCEPTS]
            blocks.append({"kind": "concepts", "ids": [b.split("/")[-1] for b in ids]})
            continue
        tasks, prose, idx = [], [], 0
        for line in chunk.split("\n"):
            t = TASK.match(line.strip())
            if t:
                task = {"id": f"{cid}:{unum}:{label[:2].lower()}{idx}",
                        "done": t.group(1) == "x", "html": md_inline(t.group(2))}
                # PATCH-010 — only **Read** lines carry inlined material. Homework and The
                # routine link out too, but those are things to DO, not things to read.
                if label == "Read":
                    sids = []
                    r = reading_for(t.group(2), sink=sids)
                    if r:
                        task["read"] = r
                    # PATCH-144 — the back-reference. A source page is reached from a lesson
                    # and has to be able to say which lessons sent you there, or eight courses
                    # all pointing at [[Arrangement and Song Form]] is a fact only build.py
                    # ever knows.
                    for s in sids:
                        SRC_USED.setdefault(s, []).append(f"{cid}:{unum}")
                tasks.append(task)
                idx += 1
            else:
                prose.append(line)
        blocks.append({"kind": "tasks" if tasks else "prose", "label": label,
                       "tasks": tasks, "html": md("\n".join(prose))})
    return md(lead), blocks

# ------------------------------------------------------------ the books (spec-172)
# Six of the eight new courses are one exercise of a scanned book per lesson, and a page
# number is not a lesson: the point of this block is that the page itself is IN the page,
# so the exercise can be read where it is assigned instead of "go open the PDF".
#
# THE TWO BOOKS DO NOT NUMBER THEIR PAGES THE SAME WAY, and that is the trap in this block.
# A course's `Pages` column says what a lesson cites; `folios` says how to turn one of those
# numbers into a page of the PDF. Hanon cites the scan's own 1-116 index, so it has no map.
# Leavitt's courses cite the BOOK'S OWN PRINTED FOLIOS (Course 25 says so in its own text),
# and the scan's index runs ahead of them by an amount that CHANGES twice — feeding a folio
# straight to the renderer there returns the wrong page, and wrongly by a varying amount.
#
# Leavitt's copyright gate was withdrawn by Nate on 2026-08-20 (*"disregard the copywright
# gate for levitt"*) — he owns the book and the artifact is private. That is a decision about
# THIS page being private, not a licence to redistribute: if the school page is ever made
# public, this entry comes back out.
#
# 127 PDF pages against a 123-page book plus four leaves of front matter, and TWO printed
# pages are absent from the scan, so the gap closes in two steps rather than one:
#
#     folios   3-14   -> PDF folio+2      (PDF 5 is folio 3, "SECTION ONE")
#     folio    15     -> ABSENT (Sharps and Flats)
#     folios  16-33   -> PDF folio+1      (PDF 17 is folio 16, "Here We Go Again")
#     folio    34     -> ABSENT (Another Duet in G)
#     folios  35-126  -> PDF folio        (PDF 35 is folio 35, "Key of F")
#
# Verified by RENDERING the pages and reading the printed titles off them against the book's
# own Contents (PDF 4, which lists every piece with its folio) — not by arithmetic. Pinned on
# both sides of both steps: 14/16 and 33/35, plus 27, 28, 30, 32, 50, 94, 118, 122 and the
# index, which the Contents itself says is on p. 126 and which is PDF 126. The scans carry no
# printed page number at all — the raster is cropped tight to the ink — so the titles and the
# Contents are the only ground truth there is. 2026-08-20.
LEAVITT_FOLIOS = {f: f + off for lo, hi, off in ((3, 14, 2), (16, 33, 1), (35, 126, 0))
                  for f in range(lo, hi + 1)}

BOOKS = {
    "hanon": {
        "courses": ["19", "20", "21", "22", "23", "24"],
        "pdf": SC_ROOT / "Piano/Drills/The Virtuoso Pianist - Hanon.pdf",
        "label": "The Virtuoso Pianist — C. L. Hanon (1873) · public domain · Internet Archive scan",
        "note": "PDF page numbers, 1-116 — not the printed book-page numbers in the scan.",
        "cap": "PDF page",
        # spec-173: one Hanon lesson IS one exercise, and that exercise is already a row of the
        # tempo track — `drills`, keyed hanon-1 … hanon-60 (spec-160). So these six courses'
        # lessons carry a `drill` key and the page logs practice against the drill that exists
        # rather than inventing a second tempo store. Leavitt has NO drill_key on purpose:
        # reading is not a tempo drill, and the guitar-reading courses must not gain one.
        "drill_key": "hanon",
    },
    "leavitt": {
        # spec-174 — FOUR courses since the guitar-reading split (Reading I and Reading II each
        # became a Part One and a Part Two). This list is the ONLY thing that puts a course's
        # scans in the page: BOOK_OF is built from it, a course missing from it gets book: ""
        # and app.js's BOOKPAGES[c.book] test then finds nothing, so its lessons render with no
        # scan at all. It fails silently and it fails big — left at ["25","26"] through the
        # split, pages 60-123 stopped being embedded and school.html lost 1.7 MB with no
        # warning anywhere. Anything that splits or renumbers a book's courses has to come
        # back here; the build's own "N cited page(s) not in the scan" line will not catch it,
        # because an unlisted course is never asked for its pages in the first place.
        "courses": ["25", "26", "27", "28"],
        "pdf": SC_ROOT / "Books/A Modern Method for Guitar/A Modern Method for Guitar - Volume 1.pdf",
        "label": "A Modern Method for Guitar, Volume 1 — William Leavitt · Berklee Press · "
                 "Nate's own copy · this page is private",
        "app_label": "A Modern Method for Guitar, Volume 1 — William Leavitt · Berklee Press · "
                     "your own copy, kept on this device",
        "app_note": "Lessons cite the book's own printed page numbers. If the page shown is one or "
                    "two off in your PDF, set the page offset for this book under My files.",
        "note": "The book's own printed page numbers, not the scan's. Two of them are absent "
                "from the scan and show no image: p. 15 (Sharps and Flats) and p. 34 "
                "(Another Duet in G).",
        "cap": "Page",
        "folios": LEAVITT_FOLIOS,
        # Cited, real, and not in the scan. Named here so the build reports them as a known
        # hole instead of a fault — and so nothing renders a NEIGHBOUR in their place.
        "absent": {15: "Sharps and Flats", 34: "Another Duet in G"},
        "w": 1250,   # not the 1100 Hanon uses. Leavitt's PDF pages are letter with the raster
                     # inset ~0.5in a side, so 1100 of PAGE would only be ~960 of BOOK; 1250
                     # puts the same ink-per-pixel on screen. Measured 19.5 KB/page over a
                     # 15-page stratified sample, ~2.4 MB for the 121 pages the courses cite.
    },
}
BOOK_OF = {cid: bid for bid, b in BOOKS.items() for cid in b["courses"]}
# {course id: drill key prefix} — courses 19-24 today, and nothing else. Derived from BOOKS so
# the list of which courses are tempo drills is stated once, beside the book it comes from.
DRILL_KEY_OF = {cid: b["drill_key"] for b in BOOKS.values() if b.get("drill_key")
                for cid in b["courses"]}

# Rendering is CACHED ON DISK, not redone per build. pdftoppm + ImageMagick over the 236
# pages these courses cite takes ~4 minutes, and build.py re-runs after every curriculum
# edit; with the cache warm the cost is a base64 pass of a few hundred ms. Pass
# --rerender-pages (or delete the cache dir) to rebuild it. The cache lives in the vault and
# goes through Obsidian Sync, so it holds only the pages some lesson actually cites.
# The app build renders straight into docs/books/<book>/ — those images ARE the published pages,
# so they are committed once and never rendered again.
PAGE_CACHE = (APP_DIR / "books") if APP else (SCHOOL / "book-pages")
# Which books may be PUBLISHED. Check a book's copyright before adding it here: pre-1929 or
# explicitly licensed only. Anything else is "bring your own" in the app — see BOOKPAGES below.
PUBLISHABLE_BOOKS = {"hanon"}
RERENDER = "--rerender-pages" in argv
PAGE_W = 1100        # px. Measured: 900 is legible everywhere but Part III's densest pages
                     # (111-115) start beaming into each other; 1100 holds those and costs
                     # ~27 KB/page, ~3.4 MB for the book, ~4.5 MB once base64'd.
PAGE_FMT = "webp"    # lossless WebP off a 1-bit threshold. The scan is grayscale noise
                     # around bilevel line art (its own PDF stores a JBIG2 mask), so
                     # thresholding FIRST is what takes a page from 220 KB to ~27 KB.
                     # Lossless after that keeps staff lines and beams crisp; a JPEG of the
                     # same page is 175 KB and mushy. Measured 2026-08-20.
PAGE_THRESHOLD = "62%"

# PATCH-164 (2026-09-22) — a SECOND renderer, for machines with no poppler and no ImageMagick.
# Found on Britt's clone: a fresh checkout on a Mac without Homebrew rendered none of Hanon's 114
# pages, and because nothing here is fatal the page published anyway at `school-books: none` —
# 5.7 MB lighter, missing the entire core material for courses 19-24, with only a stderr line to
# say so. Every new clone hits this, since book-pages/ is gitignored and the scans are not shared.
#
# pypdfium2 + Pillow are pip-installable with no compiler and no system package manager, which is
# the whole point — `pip install --user pypdfium2 Pillow` is reachable where `brew install` is not.
# poppler stays FIRST and unchanged: it is what every cached page to date was rendered with, and
# this path exists to match it, not to replace it.
_PDFIUM_DOCS = {}

def _pdfium_ready():
    """Engine name if pypdfium2 + Pillow can stand in for poppler/ImageMagick, else None."""
    try:
        import pypdfium2, PIL                                 # noqa: F401,PLC0415
        return "pypdfium2+Pillow"
    except ImportError:
        return None

def _render_pdfium(pdf, p, w, dest):
    """Render ONE page the poppler path's way: scale to width, greyscale, threshold at
    PAGE_THRESHOLD, lossless WebP. The threshold matches ImageMagick's `-threshold N%`, which
    whitens a pixel strictly ABOVE N% of the 8-bit range — 62% is 158.1, hence `> cut`.

    EQUIVALENT, NOT IDENTICAL, and that was measured rather than assumed. Against the poppler
    cache on 7 Hanon pages (2026-09-22): same dimensions every time (1100x1424), file sizes
    within ~1%, black-pixel counts within 0.04% — but ~3.5% of pixels differ, all of them on
    glyph edges, because pdfium and poppler antialias differently before the threshold bites.
    Compared visually at the same crop: staves, note heads, beams and fingering numbers are
    indistinguishable.

    So a cache filled partly by one engine and partly by the other is FINE — the pages are the
    right pages and read the same. Do not "fix" a byte mismatch between two machines' caches;
    there is nothing to fix. What would be a real bug is a size mismatch, which would mean the
    scale calculation has drifted apart from pdftoppm's -scale-to-x."""
    import pypdfium2 as pdfium                                # noqa: PLC0415
    doc = _PDFIUM_DOCS.get(str(pdf))
    if doc is None:
        doc = _PDFIUM_DOCS[str(pdf)] = pdfium.PdfDocument(str(pdf))
    page = doc[p - 1]                                         # pdftoppm -f/-l are 1-based
    img = page.render(scale=w / page.get_width()).to_pil().convert("L")
    cut = float(PAGE_THRESHOLD.rstrip("%")) / 100 * 255
    img.point(lambda v: 255 if v > cut else 0).save(
        dest, format="WEBP", lossless=True, method=6)

def render_book_pages(bid, book, wanted):
    """Fill the disk cache for the pages this book's lessons actually cite, then hand back
    {cited page: base64}. NOTHING here is fatal — a missing PDF, missing poppler/ImageMagick
    or a bad page just means those images are not in the bundle and the lessons read exactly
    as they did before, with their page numbers and the vault link.

    `wanted` is in the numbering the COURSES use. book["folios"] maps that to a PDF page;
    without one the two are the same thing (Hanon). A cited page the map has no entry for is
    not in the scan at all and is skipped — the lesson keeps the citation, and no neighbour
    is rendered in its place."""
    cache = PAGE_CACHE / bid
    w = book.get("w", PAGE_W)
    folios = book.get("folios")
    def pdf_page(n):
        return n if folios is None else folios.get(n)

    # The cache is keyed by the CITED page, so a corrected folio map would otherwise be a
    # silent stale hit: p043.webp is still on disk, still a plausible-looking page of the
    # book, and now the wrong one. This sidecar records which PDF page each cached file was
    # actually rendered from; a mismatch re-renders it. That is the whole guard — do not key
    # the cache by the cited page without it.
    smap = cache / "_pdfmap.json"
    seen = {}
    if smap.exists():
        try:
            seen = {int(k): int(v) for k, v in json.loads(smap.read_text("utf-8")).items()}
        except Exception:                                     # noqa: BLE001
            seen = {}                                         # unreadable == re-render

    cited = [n for n in wanted if pdf_page(n) is not None]
    todo = [n for n in cited if RERENDER or seen.get(n, n) != pdf_page(n)
            or not (cache / f"p{n:03d}.{PAGE_FMT}").exists()]
    if todo:
        if not book["pdf"].exists():
            print(f"  ! {bid}: {book['pdf'].name} not found — lessons keep their page "
                  f"numbers, no images", file=sys.stderr)
            return {}
        tools = [t for t in ("pdftoppm", "convert") if not shutil.which(t)]
        engine = "poppler+imagemagick" if not tools else _pdfium_ready()
        if engine is None:
            print(f"  ! {bid}: {' and '.join(tools)} not on this machine and pypdfium2/Pillow "
                  f"not importable — {len(todo)} page(s) not rendered. Fix with ONE of: "
                  f"`pip install --user pypdfium2 Pillow` (no system packages needed), "
                  f"poppler-utils + imagemagick, or build where the cache is warm.",
                  file=sys.stderr)
        else:
            cache.mkdir(parents=True, exist_ok=True)
            print(f"  rendering {len(todo)} {bid} page(s) at {w}px via {engine} — one-off, "
                  f"cached in {PAGE_CACHE / bid}")
            for n in todo:
                p, raw = pdf_page(n), cache / f"_raw{n:03d}"
                try:
                    if engine == "poppler+imagemagick":
                        subprocess.run(["pdftoppm", "-f", str(p), "-l", str(p), "-png", "-gray",
                                        "-scale-to-x", str(w), "-scale-to-y", "-1",
                                        "-singlefile", str(book["pdf"]), str(raw)],
                                       check=True, capture_output=True)
                        subprocess.run(["convert", str(raw) + ".png", "-colorspace", "Gray",
                                        "-threshold", PAGE_THRESHOLD, "-strip",
                                        "-define", "webp:lossless=true",
                                        "-define", "webp:method=6",
                                        str(cache / f"p{n:03d}.{PAGE_FMT}")],
                                       check=True, capture_output=True)
                    else:
                        _render_pdfium(book["pdf"], p, w, cache / f"p{n:03d}.{PAGE_FMT}")
                except Exception as e:                        # noqa: BLE001
                    print(f"  ! {bid} p{n}: not rendered ({e})", file=sys.stderr)
                finally:
                    pathlib.Path(str(raw) + ".png").unlink(missing_ok=True)
    out, on_disk = {}, dict(seen)
    for n in cited:
        f = cache / f"p{n:03d}.{PAGE_FMT}"
        if f.exists():
            out[str(n)] = base64.b64encode(f.read_bytes()).decode("ascii")
            on_disk[n] = pdf_page(n)
        else:
            on_disk.pop(n, None)
    if cache.is_dir() and on_disk != seen:
        smap.write_text(json.dumps({str(k): v for k, v in sorted(on_disk.items())},
                                   separators=(",", ":")), encoding="utf-8")
    return out

# spec-172: lessons_from_index() / INDEX_ROW lived here. They existed only for Courses 17
# and 18, whose lessons were rows in a "## The lesson index" table instead of "### Lesson N"
# sections. Both courses are retired and their replacements (19-26) use ordinary ### Lesson
# sections, so nothing in the vault has a "## The lesson index" heading any more and the
# parser could never fire. Deleted 2026-08-20. The `reps` FLAG it used to set is not dead --
# see the COURSES loop.

# The `| Lesson | ... | Pages | ... |` intro table of a book course carries which page(s) of
# the scan each lesson is on. Read here, before strip_lesson_index_table() removes the table
# from the rendered intro; courses with no Pages column simply yield {}.
PAGES_ROW = re.compile(r"^\|\s*(\d+)\s*\|(.+)\|\s*$", re.M)
PAGE_SPAN = re.compile(r"(\d+)\s*-\s*(\d+)")

def lesson_pages(intro_raw):
    """{lesson number: [page, ...]} from the intro table's Pages column. Never raises."""
    head = re.search(r"^\|\s*Lesson\s*\|(.+)$", intro_raw, re.M)
    if not head:
        return {}
    cols = [c.strip().lower() for c in head.group(1).split("|")]
    if "pages" not in cols:
        return {}
    pi = cols.index("pages")
    out = {}
    # PATCH-137 (C8) — scan only the Pages table's OWN rows, not every pipe-row in the whole intro.
    # `lesson_drills()` was already scoped this way for exactly this hazard: a second table anywhere
    # in the intro (a course listing, a key signature chart) has rows that match `| N | … |` just as
    # well, and its numbers would land in the page map as if the book said so. Bounded at the first
    # blank line after the header, which is where a markdown table ends.
    _tail = intro_raw[head.end():]
    _stop = re.search(r"\n\s*\n", _tail)
    table = _tail[:_stop.start()] if _stop else _tail
    for m in PAGES_ROW.finditer(table):
        cells = [c.strip() for c in m.group(2).split("|")]
        if pi >= len(cells):
            continue
        pgs = []
        for part in cells[pi].replace("\u2013", "-").replace("\u2014", "-").split(","):
            part = part.strip()
            span = PAGE_SPAN.fullmatch(part)
            if span:
                a, b = int(span.group(1)), int(span.group(2))
                if a <= b <= a + 40:          # a runaway span would drag in the whole book
                    pgs.extend(range(a, b + 1))
            elif part.isdigit():
                pgs.append(int(part))
        if pgs:
            out[int(m.group(1))] = pgs
    return out

# spec-173 — the lesson→drill join, out of that SAME intro table:
#
#   | Lesson | Title                                  | Pages | Tempo (M.M. ♩) |
#   | 1      | Exercise 32: Turning the Thumb Under…  | 42    | 40→72          |
#
# gives lesson 1 the drill `hanon-32` and a tempo target of 72.
#
# THE EXERCISE NUMBER COMES OUT OF THE TABLE ROW, NOT OUT OF THE LESSON HEADING. The heading
# ("### Lesson 1 — Exercise 32: …") reads the same today, and that is exactly the trap: it is
# prose, it gets rewritten, and a regex over it would start handing lessons the wrong drill —
# or a plausible one — the first time a title is reworded. The table is structure: one row per
# lesson, keyed by its lesson number, which is the same row the Pages column is read from.
#
# TEMPO IS THE NUMBER THE MARK WORKS UP TO — the second half of "60→108", because that is what
# `tempo_target` means in the drill track (reaching it is what moves a drill to `maintenance`).
# A cell with no numbers at all ("not printed") yields None and the page shows no target.
# Exercises 36-38 are that case and they are BLANK ON PURPOSE: the scan prints no mark for
# them, and a guessed number would be indistinguishable on screen from a transcribed one.
EXERCISE_N = re.compile(r"\bExercise\s+(\d+)\b", re.I)
TEMPO_TO = re.compile(r"(\d+)\s*(?:→|-+>|\bto\b)\s*(\d+)")

def lesson_drills(intro_raw, prefix):
    """({lesson number: {"drill": key, "tempo_target": int|None}}, [complaint, ...]).

    Never raises: a course whose table cannot be read simply joins no drills, and says why."""
    out, notes = {}, []
    head = re.search(r"^\|\s*Lesson\s*\|(.+)$", intro_raw, re.M)
    if not head:
        return out, ["no `| Lesson |` index table — no lesson can be joined to a drill"]
    cols = [c.strip().lower() for c in head.group(1).split("|")]
    if "title" not in cols:
        return out, ["index table has no Title column — cannot read exercise numbers"]
    ti = cols.index("title")
    tempo_i = next((i for i, c in enumerate(cols) if c.startswith("tempo")), None)
    if tempo_i is None:
        notes.append("index table has no Tempo column — every lesson joins with tempo_target null")
    # Only the rows of THIS table, not every `| 3 | …` line in the intro: a second numbered
    # table elsewhere in the intro would otherwise be read as lessons and complained about.
    block = intro_raw[head.end():].split("\n\n", 1)[0]
    for m in PAGES_ROW.finditer(block):
        n = int(m.group(1))
        cells = [c.strip() for c in m.group(2).split("|")]
        if ti >= len(cells):
            continue
        ex = EXERCISE_N.search(cells[ti])
        if not ex:
            notes.append(f"lesson {n} names no exercise in the index table — no drill joined")
            continue
        target = None
        if tempo_i is not None and tempo_i < len(cells):
            t = TEMPO_TO.search(cells[tempo_i])
            if t:
                target = int(t.group(2))
        out[n] = {"drill": f"{prefix}-{int(ex.group(1))}", "tempo_target": target}
    return out, notes

COURSES = {}
DRILL_JOIN = []          # (course, lesson, drill key, tempo target) — reported after the loop
for cid, (fm, body, stem) in sorted(course_files.items()):
    body = strip_fences(body)
    title = re.search(r"^# (.+)$", body, re.M)
    body = re.sub(r"^# .+$", "", body, count=1, flags=re.M)
    h2 = list(re.finditer(r"^## (.+)$", body, re.M))
    intro_raw = body[:h2[0].start()] if h2 else body
    pages_by_lesson = lesson_pages(intro_raw)
    drill_prefix = DRILL_KEY_OF.get(cid)
    drills_by_lesson, drill_notes = (lesson_drills(intro_raw, drill_prefix)
                                     if drill_prefix else ({}, []))
    intro = strip_lesson_index_table(intro_raw)
    lessons, sections = [], []
    for i, m in enumerate(h2):
        name = m.group(1).strip()
        end = h2[i + 1].start() if i + 1 < len(h2) else len(body)
        chunk = body[m.end():end]
        if name.lower() == "the lessons":
            uh = list(LESSON_H.finditer(chunk))
            sections.append({"name": name, "raw": chunk,
                             "html": md(chunk[:uh[0].start()] if uh else chunk),
                             "lessons_here": True})
            for j, um in enumerate(uh):
                uend = uh[j + 1].start() if j + 1 < len(uh) else len(chunk)
                lead, blocks = parse_lesson_body(cid, int(um.group(1)), chunk[um.end():uend])
                lessons.append({"n": int(um.group(1)), "title": um.group(2).strip(),
                              "lead": lead, "blocks": blocks})
        elif name == "Related":
            continue
        else:
            sections.append({"name": name, "raw": chunk, "html": md(chunk),
                             "lessons_here": False})
    for u in lessons:
        pg = pages_by_lesson.get(u["n"])
        if pg:
            u["pages"] = pg
        # spec-173. Both keys land together or neither does: a lesson with `drill` and no
        # `tempo_target` would read on the page as "target not loaded" rather than "the book
        # prints none", and those are different things. null IS the answer for 36-38.
        d = drills_by_lesson.get(u["n"])
        if d:
            u["drill"] = d["drill"]
            u["tempo_target"] = d["tempo_target"]
    for _n in drill_notes:
        print(f"  ! Course {cid}: {_n}", file=sys.stderr)
    if drill_prefix:
        _un = [u["n"] for u in lessons if "drill" not in u]
        if _un:
            print(f"  ! Course {cid}: {len(_un)} lesson(s) joined no drill "
                  f"({', '.join(str(x) for x in _un[:8])}) — the page cannot log practice for "
                  f"them", file=sys.stderr)
        DRILL_JOIN.extend((cid, u["n"], u["drill"], u["tempo_target"])
                          for u in lessons if "drill" in u)
    # `reps` — a course you do repetitions in rather than one you are quizzed on. app.js
    # prints "reps, not quizzes" from it in two places. It used to mean "lessons came out
    # of an index table", which was only ever true of the retired 17/18; the surviving test
    # is that a reps course declares no concepts, which picks out exactly 19-26 today
    # (every taught course 01-16 declares 6 or more). If a taught course ever ships with
    # concepts: 0, revisit this rather than letting it inherit the label.
    n_concepts = posint(fm.get("concepts"), 0)   # PATCH-137 (F13b)
    COURSES[cid] = {
        "id": cid, "stem": stem, "reps": bool(lessons) and not n_concepts,
        "book": BOOK_OF.get(cid, ""),
        "title": (title.group(1).strip() if title else stem),
        "short": re.sub(r"^Course \d+\s*—\s*", "", (title.group(1).strip() if title else stem)),
        "domain": fm.get("domain", ""), "strands": fm.get("strands", []),
        "class": re.sub(r"[\[\]]", "", str(fm.get("class", ""))),
        "class_id": "", "depends_on": [str(x) for x in (fm.get("depends_on") or [])],
        "target": posint(fm.get("target_pct"), 80),
        "n_lessons": posint(fm.get("lessons"), len(lessons)),
        "n_concepts": n_concepts,
        # spec-174 — a per-course weekly ceiling, declared in the course note's own
        # frontmatter as `lessons_per_week`. Nate on the guitar-reading split: "for this make
        # it max one lesson per week since there's alot still."
        #
        # This is NOT the lane's pace and does not replace it. `semester.*_lessons_per_week`
        # in School Config still caps what a whole TRACK deals in a week; this caps what ONE
        # course may contribute to any single week inside that track. The two compose: a long
        # book can sit in a lane beside a faster course without swamping it, and the lane goes
        # on running at its own pace using whatever else is enrolled.
        #
        # Course-level rather than class- or lane-level on purpose: it is a property of how
        # long this particular book is, not of the instrument or the track.
        #
        # 0 means "no cap", which is also what an absent or unreadable key gives — app.js
        # reads 0 as Infinity, so every course that does not declare the key paces exactly as
        # it did before this shipped, and a school.html built before it has no key at all and
        # lands on the same branch.
        "lessons_per_week": posint(fm.get("lessons_per_week"), 0),
        "standing": cid in CONFIG["standing_courses"],
        "intro": md(intro), "sections": sections, "lessons": lessons,
    }

# The drill note keeps its OWN transcription of the same printed metronome marks — its Practice
# index, whose rows ARE the hanon-1 … hanon-60 keys the join points at. Two hand-typed copies of
# one number in the scan will eventually disagree, and the disagreement would be invisible on
# screen: the homework page would show one target and the dashboard's Drill Library the other,
# both stated with total confidence. So they are compared on every build. Nothing here is fatal.
def _drill_note_targets(book):
    """{exercise number: tempo target or None} from the book note's own Practice index."""
    note = book["pdf"].with_suffix(".md")
    if not note.exists():
        return None
    txt = note.read_text(encoding="utf-8")
    head = re.search(r"^\|\s*#\s*\|(.+)$", txt, re.M)
    if not head:
        return None
    cols = [c.strip().lower() for c in head.group(1).split("|")]
    ti = next((i for i, c in enumerate(cols) if c.startswith("tempo")), None)
    if ti is None:
        return None
    out = {}
    for m in PAGES_ROW.finditer(txt[head.end():].split("\n\n", 1)[0]):
        cells = [c.strip() for c in m.group(2).split("|")]
        if ti < len(cells):
            t = TEMPO_TO.search(cells[ti])
            out[int(m.group(1))] = int(t.group(2)) if t else None
    return out or None

for _bid, _book in BOOKS.items():
    if not _book.get("drill_key"):
        continue
    try:
        _ref = _drill_note_targets(_book)
    except Exception as _e:                                   # noqa: BLE001
        _ref = None
        print(f"  ~ {_bid}: drill note index not read ({_e}) — tempo targets not cross-checked")
    if _ref is None:
        print(f"  ~ {_bid}: no Practice index found in the drill note — the courses' tempo "
              f"targets are unverified against it")
        continue
    for _cid, _n, _key, _target in DRILL_JOIN:
        if not _key.startswith(f"{_book['drill_key']}-"):
            continue
        _ex = int(_key.rsplit("-", 1)[1])
        if _ex not in _ref:
            print(f"  ! Course {_cid} lesson {_n} joins {_key}, which has no row in the drill "
                  f"note's Practice index — the tempo track cannot hold it", file=sys.stderr)
        elif _ref[_ex] != _target:
            print(f"  ! Course {_cid} lesson {_n} ({_key}): course table says tempo target "
                  f"{_target}, drill note says {_ref[_ex]} — one of the two is mistyped",
                  file=sys.stderr)

CLASSES = {}
for kid, (fm, body, stem) in sorted(class_files.items(), key=lambda kv: int(kv[0])):
    body = strip_fences(body)
    title = re.search(r"^# (.+)$", body, re.M)
    body = re.sub(r"^# .+$", "", body, count=1, flags=re.M)
    body = re.sub(r"^## Related\s*\n.*", "", body, flags=re.S | re.M)
    CLASSES[kid] = {
        "id": kid, "title": (title.group(1).strip() if title else stem),
        "short": re.sub(r"^Class \d+\s*—\s*", "", (title.group(1).strip() if title else stem)),
        "domain": fm.get("domain", ""),
        "courses": [str(x) for x in (fm.get("courses") or [])],
        "standing": kid in CONFIG["standing_classes"],
        "exam": re.sub(r"[\[\]]", "", str(fm.get("midterm", "") or fm.get("exam", "") or "")),
        "n_lessons": int(fm.get("lessons", 0) or 0), "n_concepts": int(fm.get("concepts", 0) or 0),
        # PATCH-149 — a WHOLE-CLASS weekly cap, and it is not the same thing as the per-course
        # one below it. Nate, 2026-08-26: *"for guitar sight reading i just want one lesson a
        # week since its alot of content."* Class 8's four courses each already carried
        # `lessons_per_week: 1`, and that was not enough: with two of them enrolled the
        # instrument lane dealt 25→1 and 26→1 into the SAME week, which is one per course and
        # two per class. A cap on the parts cannot bound the whole. Absent (0) means no ceiling.
        "lessons_per_week": posint(fm.get("lessons_per_week"), 0),
        "html": md(body),
    }
for kid, k in CLASSES.items():
    for cid in k["courses"]:
        if cid in COURSES:
            COURSES[cid]["class_id"] = kid

# concepts per course/lesson, from the concept notes' own `lesson:` (source of truth)
for c in COURSES.values():
    c["concept_ids"] = sorted([k for k, v in CONCEPTS.items() if v["course"] == c["id"]])

# ------------------------------------------------------------ the drills library (spec-174)
# Surfaces four already-built-but-unwired piles onto one page: technique drills (tempo-tracked,
# `type: drill`, {Guitar,Bass,Piano}/Drills/), practice routines (Practice Method/ notes that
# carry `reinforces:` or `classes:`), watch-only videos (YouTube Notes/{Lessons,Theory,Other}/,
# `watch_only: true`) and practice methodology (the remaining Practice Method/ notes -- no
# `reinforces:`, no `classes:`, nothing to tempo-track or turn in, read-only).
#
# DRILLS ARE NOT SPACED REPETITION -- spec-160/spec-174. Nothing below writes sr_interval,
# sr_ease, sr_due or a rating. Tempo is the only progression axis, and tempo_current lives only
# in progress-<user>.json (D_DRILL in sync.py), never in the note.
DRILL_DIRS = {"guitar": SC_ROOT / "Guitar/Drills", "bass": SC_ROOT / "Bass/Drills",
              "piano": SC_ROOT / "Piano/Drills"}
ROUTINE_DIRS = {"guitar": SC_ROOT / "Guitar/Practice Method", "bass": SC_ROOT / "Bass/Practice Method",
                "theory": SC_ROOT / "Theory/Practice Method"}
WATCH_DIRS = [SC_ROOT / "YouTube Notes/Lessons", SC_ROOT / "YouTube Notes/Theory",
              SC_ROOT / "YouTube Notes/Other"]
DRILL_LINT = []
# CONCEPTS is keyed by the concept note's full stem ("SCL-C05 — Characteristic notes"), the
# same as every [[wikilink]] resolves to -- but a drill/routine note's `reinforces:` frontmatter
# names the bare code only (`reinforces: [SCL-C05, SCL-C08]`), so a direct CONCEPTS[code] lookup
# always misses. This is the code -> full-key index that closes that gap.
CONCEPT_BY_CODE = {k.split(" — ", 1)[0].strip(): k for k in CONCEPTS}

def _drill_read(title, section=None):
    """Resolve a drill/routine/video/methodology note's body to HTML the same way a lesson's
    **Read** line does -- by calling reading_for() itself, not a second markdown path. `section`
    names a heading the way a Read pointer's `→ *Heading*` suffix does; a note with no such
    heading gracefully falls back to its opening (reading_for's own contract), which is reported
    in the normal READ_MISSES lint, not raised."""
    task = f"[[{title}]]" + (f" → *{section}*" if section else "")
    ids = reading_for(task)
    return ids[0] if ids else None

def _tempo(v):
    """A printed metronome mark, or None. Never a guess -- see practiceLog()'s note in app.js
    for why an invented target is worse than an absent one. Module level since PATCH-159:
    routines carry the same two marks drills do and were silently dropping them."""
    s = str(v if v is not None else "").strip()
    return int(s) if s.isdigit() else None


TECHNIQUE = {"guitar": [], "bass": [], "piano": []}
for _instrument, _d in DRILL_DIRS.items():
    for p in sorted(_d.glob("*.md")) if _d.exists() else []:
        fm, _body = frontmatter(p.read_text(encoding="utf-8"))
        if fm.get("type") != "drill":
            continue
        ts, tt = _tempo(fm.get("tempo_start")), _tempo(fm.get("tempo_target"))
        if ts is not None and tt is not None and tt < ts:
            DRILL_LINT.append(f"{p.stem}: tempo_target ({tt}) is below tempo_start ({ts})")
        TECHNIQUE[_instrument].append({
            "id": p.stem, "title": p.stem, "instrument": _instrument,
            # [[wikilink]] brackets stripped to plain text, same convention CONCEPTS["source"]
            # already uses -- this is a metadata line, not a place to grow a second xlink path.
            "source": re.sub(r"[\[\]]", "", str(fm.get("source", "") or "")),
            "difficulty": posint(fm.get("difficulty"), 0), "minutes": posint(fm.get("minutes"), 0),
            "tempo_start": ts, "tempo_target": tt,
            "read": _drill_read(p.stem, "How to run it"),
        })
for _k in TECHNIQUE:
    TECHNIQUE[_k].sort(key=lambda d: d["title"])

ROUTINES, METHODOLOGY = [], []
for _instrument, _d in ROUTINE_DIRS.items():
    for p in sorted(_d.glob("*.md")) if _d.exists() else []:
        fm, _body = frontmatter(p.read_text(encoding="utf-8"))
        if fm.get("type") == "drill":
            DRILL_LINT.append(f"{p.stem}: type: drill inside Practice Method/ -- stale (the "
                              f"Full Scale Workout / Interval Ladder drift, 2026-08-13) -- should "
                              f"be practice-routine or technique")
        reinf_codes = [c for c in (fm.get("reinforces") or []) if c]
        cls = [str(c) for c in (fm.get("classes") or []) if c]
        if reinf_codes or cls:
            # app.js keys CONCEPTS (and every data-goto="concept:…") by the note's FULL stem,
            # the same thing every [[wikilink]] resolves to -- but frontmatter reinforces: is
            # written as the bare code, so it is translated here rather than teaching app.js a
            # second concept-id convention just for this page.
            reinf = []
            for code in reinf_codes:
                full = CONCEPT_BY_CODE.get(code)
                if full:
                    reinf.append(full)
                else:
                    DRILL_LINT.append(f"{p.stem}: reinforces {code}, no such concept")
            course_id = lesson_n = None
            _c0 = CONCEPTS.get(reinf[0]) if reinf else None
            if _c0:
                course_id = _c0["course"] or None
                lesson_n = _c0["lesson"] or None
            # PATCH-159 -- `tempo_start`/`tempo_target`/`minutes`/`source` are read here for the
            # same reason a technique drill reads them: the notes ALREADY CARRY THEM and the page
            # was throwing them away. Interval Ladder declares `tempo_start: 60`,
            # `tempo_target: 120`, `minutes: 5` and is assigned by Course 01 lesson 3 as a
            # **Technique** line -- and had no page, no stat strip and nowhere to log a session,
            # because "routine" was reading as "unmeasured". Nate, 2026-09-07: *"im on the
            # interval ladder dril page and i dont see a way to log progress."* A routine is a
            # drill that also reinforces concepts, not a drill with the tempo track taken out.
            ROUTINES.append({
                "id": p.stem, "title": p.stem, "instrument": _instrument,
                "reinforces": reinf, "classes": cls, "course_id": course_id, "lesson": lesson_n,
                "difficulty": posint(fm.get("difficulty"), 0), "minutes": posint(fm.get("minutes"), 0),
                "source": re.sub(r"[\[\]]", "", str(fm.get("source", "") or "")),
                "tempo_start": _tempo(fm.get("tempo_start")),
                "tempo_target": _tempo(fm.get("tempo_target")),
                "read": _drill_read(p.stem, "How to run it"),
            })
        else:
            rid = _drill_read(p.stem)
            METHODOLOGY.append({
                "id": p.stem, "title": p.stem, "instrument": _instrument,
                "lede": READING[rid]["lede"] if rid and rid in READING else "", "read": rid,
            })
ROUTINES.sort(key=lambda r: r["title"])
METHODOLOGY.sort(key=lambda m: m["title"])

YT_ID = re.compile(r"[?&]v=([\w-]{11})")
THUMB_CACHE = SCHOOL / "video-thumbs"
THUMB_W = 320

def _fetch_thumb(vid):
    """YouTube thumbnail -> cached WebP -> base64, same on-disk-cache contract as
    render_book_pages(): NOTHING here is fatal, a miss just means the card ships with no
    image. `img.youtube.com` is as CSP-blocked at runtime as youtube.com itself, which is why
    this has to happen at build time and be inlined, not linked."""
    out = THUMB_CACHE / f"{vid}.webp"
    if not out.exists():
        if not shutil.which("convert"):
            DRILL_LINT.append(f"thumb {vid}: ImageMagick not on this machine -- no thumbnail")
            return None
        THUMB_CACHE.mkdir(parents=True, exist_ok=True)
        raw = THUMB_CACHE / f"_raw-{vid}.jpg"
        try:
            got = False
            for res in ("mqdefault", "hqdefault"):
                try:
                    with urllib.request.urlopen(
                            f"https://img.youtube.com/vi/{vid}/{res}.jpg", timeout=8) as r:
                        raw.write_bytes(r.read())
                    got = True
                    break
                except Exception:                             # noqa: BLE001
                    continue
            if not got or raw.stat().st_size < 500:
                DRILL_LINT.append(f"thumb {vid}: could not fetch -- no thumbnail")
                return None
            subprocess.run(["convert", str(raw), "-resize", f"{THUMB_W}x", "-strip",
                            "-quality", "80", str(out)], check=True, capture_output=True)
        except Exception as e:                                # noqa: BLE001
            DRILL_LINT.append(f"thumb {vid}: not rendered ({e})")
            return None
        finally:
            raw.unlink(missing_ok=True)
    try:
        return base64.b64encode(out.read_bytes()).decode("ascii")
    except Exception:                                         # noqa: BLE001
        return None

WATCH = []
for _d in WATCH_DIRS:
    for p in sorted(_d.glob("*.md")) if _d.exists() else []:
        fm, _body = frontmatter(p.read_text(encoding="utf-8"))
        if not fm.get("watch_only"):
            continue
        url = str(fm.get("url", "") or "")
        if not url:
            DRILL_LINT.append(f"{p.stem}: watch_only: true with no url")
        thumb = None
        m = YT_ID.search(url)
        # The app build links the thumbnail straight from YouTube at view time (app.js) instead of
        # copying somebody else's image into the repo. The single-file page still inlines it,
        # because the artifact sandbox cannot reach YouTube.
        if m and not APP:
            thumb = _fetch_thumb(m.group(1))
        # Which shelf of the Drills page a video sits on, read off its tags: the instrument it is
        # played on, else ear training, else production, else theory.
        _tg = fm.get("tags") or []
        if isinstance(_tg, str):
            _tg = [t.strip() for t in _tg.strip("[]").split(",")]
        _tg = {str(t).lower() for t in _tg}
        _instr = ("ear" if "ear-training" in _tg else "guitar" if "guitar" in _tg
                  else "bass" if "bass" in _tg else "piano" if _tg & {"piano", "keys", "keyboard"}
                  else "production" if "production" in _tg else "theory")
        WATCH.append({
            "instrument": _instr,
            "id": p.stem, "title": p.stem, "url": url, "channel": str(fm.get("channel", "") or ""),
            "duration": str(fm.get("duration", "") or ""), "drill": bool(fm.get("drill", False)),
            "video_type": str(fm.get("video_type", "") or ""), "thumb": thumb,
            "read": _drill_read(p.stem, "What to watch for"),
        })
WATCH.sort(key=lambda w: (not w["drill"], w["title"]))         # drill: true first, house rule

DRILLS = {"technique": TECHNIQUE, "routines": ROUTINES, "watch": WATCH, "methodology": METHODOLOGY}

# ------------------------------------------------------------- the tools shelf (spec-177)
# Nate, 2026-09-01, a link drop of ~30 outside sites, apps, textbooks, articles and playlists:
# *"integrate these resources into music school"*. They are NOT coursework and nothing here is
# ever due -- this is a SHELF, the same category as the drill library (spec-174) and the song
# library (spec-176), and it takes the same no-numeral rule on the rail for the same reason a
# drill does: a numeral on that rail means work owed today.
#
# WHY `Curriculum/Tools/` AND `type: school-tool`, NOT "Resources". `Lessons/Resources/` already
# means something else in this build -- PATCH-145, the files Nate uploads against an OUTSIDE
# lesson, keyed by lesson-note name and cached under `Machine/School/lesson-resources/`. Two
# meanings for one word inside one page is how a later reader wires the wrong one.
#
# THE BODY IS RENDERED HERE, not through reading_for(). READ_INDEX deliberately skips everything
# under `Curriculum/` ("the school's own notes are already in the page", ~line 409), so
# load_note() cannot see a tool note at all and the _drill_read() route the drill cards use would
# return None for all 30 of these. md(_demote(...)) is the same pair _source() uses on a note page.
TOOL_DIR = CUR / "Tools"
TOOLS, TOOL_LINT = [], []
TOOL_STATUSES = ("live", "superseded", "unverified")
for p in sorted(TOOL_DIR.glob("*.md")) if TOOL_DIR.exists() else []:
    fm, tbody = frontmatter(p.read_text(encoding="utf-8"))
    if fm.get("type") != "school-tool":
        continue
    url = str(fm.get("url", "") or "")
    if not url:
        TOOL_LINT.append(f"{p.stem}: no url -- the card would have nothing to open")
    reinf = [str(c) for c in (fm.get("reinforces") or [])]
    unknown = [c for c in reinf if c not in CONCEPT_BY_CODE]
    if unknown:
        TOOL_LINT.append(f"{p.stem}: reinforces unknown concept code(s) {', '.join(unknown)}")
    st = str(fm.get("status", "live") or "live")
    if st not in TOOL_STATUSES:
        TOOL_LINT.append(f"{p.stem}: status '{st}' is not one of {'/'.join(TOOL_STATUSES)}")
        st = "live"
    # The H1 repeats the note title and the next line repeats `url:` as a bare link. The card
    # already draws both, so they come out before the body is rendered rather than showing twice.
    tb = re.sub(r"^#\s+.+$", "", tbody, count=1, flags=re.M)
    tb = re.sub(r"^\U0001F517\s*\[.*?\]\(.*?\)\s*$", "", tb, count=1, flags=re.M)
    TOOLS.append({
        "id": str(fm.get("tool_id") or _slug(p.stem)), "title": p.stem, "url": url,
        "kind": str(fm.get("kind", "other") or "other"),
        "cost": str(fm.get("cost", "") or ""),
        "domain": str(fm.get("domain", "theory") or "theory"),
        "platforms": [str(x) for x in (fm.get("platforms") or [])],
        "offline": bool(fm.get("offline", False)),
        "strands": [str(x) for x in (fm.get("strands") or [])],
        "classes": [str(x) for x in (fm.get("classes") or [])],
        # FULL concept keys, not the bare codes the note carries: every other cross-link in this
        # bundle (a drill's `reinforces`, CONCEPTS itself) is keyed the way a [[wikilink]]
        # resolves, and app.js's conceptChip() indexes CONCEPTS directly. CONCEPT_BY_CODE is the
        # code -> full-key index built for exactly this gap in the drills section above.
        "reinforces": [CONCEPT_BY_CODE[c] for c in reinf if c in CONCEPT_BY_CODE],
        "status": st,
        "channel": str(fm.get("channel", "") or ""),
        "count": posint(fm.get("count"), 0),
        "html": md(_demote(tb.strip(), floor=3)),
    })
# live first, then by kind, then alphabetical -- a superseded or unverified entry is a pointer,
# and pointers sort below things you can actually go and use.
TOOLS.sort(key=lambda t: (t["status"] != "live", t["kind"], t["title"].lower()))
if TOOL_LINT:
    print(f"  ! {len(TOOL_LINT)} tool note problem(s):", file=sys.stderr)
    for _m in TOOL_LINT[:10]:
        print(f"      {_m}", file=sys.stderr)

# ------------------------------------------------------------ the song library (spec-176)
# Nate, 2026-08-31: *"i want to add the song library to the music school system. start with just
# creating a visual page that has song titles with their photos where the user can click into the
# song to see details. will add them to the practice/learning system afterwards. for now just want
# the library in there to reference."*
#
# So this is a SHELF, and the sentence above is the spec: nothing here is assigned, due, scheduled
# or scored, and nothing on this page writes progress. It sits in the rail's Library group for
# exactly the reason PATCH-111 gives — it would look identical on a vault that never started a
# course. The practice/learning wiring is a LATER spec; leaving the hooks out is the point, not an
# omission (a half-wired song that shows a due date nothing computes is worse than no wiring).
#
# Three pieces, carried by three different mechanisms on purpose:
#
#   · SONGS   — the frontmatter. ~30 KB, rides inside CURRICULUM because the grid needs all of it
#               at once to filter and sort, and it is too small to be worth a decision.
#   · the body — parked through `_source()`, the SAME function a **Read** line uses. There is no
#               second markdown path here (PATCH-144's rule), the detail page IS `sourceView` with
#               a header bolted on, and the side effect is worth as much as the page: `_source`
#               registers each note's basename in SRC_INDEX, so every `[[🎵 ARTIST - Title]]`
#               already written across the school becomes a live link the moment this ships.
#   · COVERS  — base64 webp, in an island of its own like the book scans, because it is the one
#               part that is measured in megabytes and the one part `lite` may have to leave
#               behind. app.js renders a typographic tile wherever a cover is missing, so a build
#               without the island is a page that still works.
SONG_DIR = SC_ROOT / "Song Library"
SONG_IMG = SONG_DIR / "Images"
COVER_CACHE = SCHOOL / "song-covers"
COVER_W = 300         # px. A tile is 210-260 CSS px wide; 300 keeps it sharp on a retina panel.
COVER_Q = 70
SONG_EMBED = re.compile(r"^!\[\[Images/([^\]|]+)", re.M)
SONG_TYPES = ("song-ref", "song-collection")
SONGS, COVERS = {}, {}
SONG_STATS = {"notes": 0, "bare": [], "failed": [], "shadowed": []}


def _cover(name):
    """`Images/<file>` -> an id in COVERS, or None. Deduped — 64 sleeves cover 105 songs.

    Square-cropped to the centre because a shelf only reads as a shelf when every tile is the
    same shape. Album art is square to begin with, so the crop only bites on the handful of
    soundtrack stills that are not.

    Cached on disk for the same reason the book scans and the lesson handouts are: build.py
    re-runs after every curriculum edit, and the key carries size and mtime so a replaced sleeve
    can never be served from a stale render.
    """
    src = SONG_IMG / name
    if APP:                                   # album art is not ours to ship — see `cover_file`
        return None
    if not src.exists():
        SONG_STATS["failed"].append(f"{name}: not in {SONG_IMG.name}/")
        return None
    cid = _slug(src.stem)
    if cid in COVERS:
        return cid
    st = src.stat()
    key = hashlib.sha1(f"{src}|{st.st_size}|{int(st.st_mtime)}|{COVER_W}|{COVER_Q}"
                       .encode("utf-8")).hexdigest()[:16]
    out = COVER_CACHE / f"{key}.webp"
    if not out.exists():
        if not shutil.which("convert"):
            SONG_STATS["failed"].append(f"{name}: needs ImageMagick (convert)")
            return None
        COVER_CACHE.mkdir(parents=True, exist_ok=True)
        try:
            subprocess.run(["convert", str(src) + "[0]", "-auto-orient",
                            "-resize", f"{COVER_W}x{COVER_W}^", "-gravity", "center",
                            "-extent", f"{COVER_W}x{COVER_W}",
                            "-strip", "-quality", str(COVER_Q), str(out)],
                           check=True, capture_output=True, timeout=120)
        except Exception as e:                                # noqa: BLE001
            out.unlink(missing_ok=True)
            SONG_STATS["failed"].append(f"{name}: {type(e).__name__}")
            return None
    COVERS[cid] = base64.b64encode(out.read_bytes()).decode("ascii")
    return cid


def _fm_str(fm, k):
    v = fm.get(k, "")
    return "" if isinstance(v, (list, bool)) else str(v).strip()


def _fm_list(fm, k):
    """Frontmatter that is a list on most notes and a bare string on a few."""
    v = fm.get(k, [])
    if isinstance(v, list):
        return [str(x).strip() for x in v if str(x).strip()]
    s = str(v).strip()
    return [p.strip() for p in s.split(",") if p.strip()] if s else []


for sp in sorted(SONG_DIR.glob("*.md")) if SONG_DIR.exists() else []:
    try:
        raw = sp.read_text(encoding="utf-8")
    except Exception as e:                                    # noqa: BLE001
        SONG_STATS["failed"].append(f"{sp.stem}: {type(e).__name__}")
        continue
    fm, _sb = frontmatter(raw)
    if _fm_str(fm, "type") not in SONG_TYPES:
        continue
    SONG_STATS["notes"] += 1
    # The body comes through the reading index, not through `sp`, and that is deliberate: the
    # index is what a `[[wikilink]]` resolves to, so a page built off it can never show one note
    # while every link in the school points at another. If the two disagree the index wins and
    # the collision is REPORTED — silently rendering the shadowed note is the bug this catches.
    nt = load_note(sp.stem)
    if nt is None:
        SONG_STATS["failed"].append(f"{sp.stem}: not in the reading index")
        continue
    _hit = READ_INDEX.get(sp.stem.lower())
    if _hit and _hit != sp:
        SONG_STATS["shadowed"].append(f"{sp.stem} -> {_hit.relative_to(SC_ROOT)}")
    sid = _source(nt)
    _m = SONG_EMBED.search(raw)
    cid = _cover(_m.group(1).strip()) if _m else None
    if not cid:
        SONG_STATS["bare"].append(sp.stem)
    SONGS[sid] = {
        "id": sid, "title": _fm_str(fm, "title") or sp.stem, "artist": _fm_str(fm, "artist"),
        "album": _fm_str(fm, "album"), "year": _fm_str(fm, "year"), "key": _fm_str(fm, "key"),
        "bpm": _fm_str(fm, "bpm"), "genre": _fm_str(fm, "genre"), "feel": _fm_str(fm, "feel"),
        "structure": _fm_str(fm, "structure"), "cover": cid,
        # The NAME of the sleeve this note embeds. The app shows the reader's own copy of that
        # file if they have added one, and a lettered tile if they have not.
        "cover_file": _m.group(1).strip().split("/")[-1] if _m else "",
        "instruments": _fm_list(fm, "instruments"), "tags": _fm_list(fm, "tags"),
        # The one paragraph on the note that says what the song IS. Present on 112 of 119 and
        # already written for a reader, so the detail page opens on it rather than on a stat strip.
        "about": _fm_str(fm, "composition"),
        "collection": _fm_str(fm, "type") == "song-collection",
    }

COVER_BYTES = sum(len(v) for v in COVERS.values())

# ------------------------------------------------- the chord charts (spec-176b, 2026-08-31)
# Nate: *"i want the chord charts linked to the song page in its own section at the top."*
#
# `Song Library/Files/` holds 70 chart PDFs — Ultimate Guitar prints, sheet-music scans, tab. Only
# SEVEN of them were referenced from a song note, so 63 charts have been sitting in the vault
# invisible to everything. They are matched to songs by FILENAME here, which is the only join that
# exists; nothing in the frontmatter points at them.
#
# THEY GO IN AS TEXT, NOT AS PAGE IMAGES, and that is a measurement rather than a preference. These
# average three pages at ~45 KB per page as webp: 60 charts is ~8 MB of image, ~10.8 MB once
# base64'd, against a bundle already at 12.5 MB of the artifact's 16 MB ceiling. It does not fit at
# any resolution worth reading. `pdftotext -layout` keeps what a chart actually is — chord names
# positioned over lyrics, tab staves, fingering grids — in 4 KB, which fits both builds, stays
# legible on a phone, and is selectable text rather than a picture of text. The one thing lost is
# the sheet-music scans' notation, and those are the minority of this folder.
CHART_DIR = SONG_DIR / "Files"
CHART_CACHE = SCHOOL / "song-charts"
CHART_CAP = 24000             # chars per chart. The largest here is 6 KB; this is a bound, not a trim.
CHARTS = {}
CHART_STATS = {"pdfs": 0, "matched": 0, "unclaimed": [], "failed": []}
# Words that describe the FILE rather than the song. Dropped from both sides before matching, or
# "chords" in a filename would count as evidence against a song whose title lacks it.
CHART_STOP = {"chord", "chords", "tab", "tabs", "official", "sheet", "sheetmusic", "music",
              "ultimate", "guitar", "archive", "the", "a", "an", "and", "of", "by", "at"}


def _cnorm(s):
    """Filename or title -> comparable word list. Apostrophes and camelCase are the whole trick.

    `the-beatles-ill-follow-the-sun` has to reach "I'll Follow the Sun" (apostrophe dropped, not
    turned into a word boundary), and `SheetMusic_LanaDelRey_ParisTexas` has to reach "Paris,
    Texas" (camel case split BEFORE the lowercase, or the boundary is gone).
    """
    s = re.sub(r"\.pdf$", "", s, flags=re.I)
    s = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", " ", s)
    # Accents folded, or "3 Gymnopédies" (the note) never reaches "3 Gymnopedies" (the PDF) —
    # the é becomes a word break and splits the only token that identifies the piece.
    s = unicodedata.normalize("NFKD", s.lower().replace("'", "").replace("’", ""))
    s = "".join(c for c in s if not unicodedata.combining(c))
    return [w for w in re.sub(r"[^a-z0-9]+", " ", s).split() if w not in CHART_STOP]


def _chart_text(src):
    """One chart PDF -> its text, or None. Cached like every other rasterised thing here."""
    st = src.stat()
    key = hashlib.sha1(f"{src}|{st.st_size}|{int(st.st_mtime)}|{CHART_CAP}"
                       .encode("utf-8")).hexdigest()[:16]
    cache = CHART_CACHE / f"{key}.txt"
    if not cache.exists():
        if not shutil.which("pdftotext"):
            CHART_STATS["failed"].append(f"{src.name}: needs poppler-utils (pdftotext)")
            return None
        CHART_CACHE.mkdir(parents=True, exist_ok=True)
        try:
            out = subprocess.run(["pdftotext", "-layout", str(src), "-"],
                                 check=True, capture_output=True, timeout=120)
            cache.write_bytes(out.stdout)
        except Exception as e:                                # noqa: BLE001
            cache.unlink(missing_ok=True)
            CHART_STATS["failed"].append(f"{src.name}: {type(e).__name__}")
            return None
    txt = cache.read_text(encoding="utf-8", errors="replace")
    # Form feeds are pdftotext's page breaks; a rule reads better than an invisible control char.
    txt = txt.replace("\f", "\n———\n").replace("\r", "")
    txt = re.sub(r"\n{4,}", "\n\n\n", txt).strip("\n")
    return txt[:CHART_CAP] if txt.strip() else None


# The chart PDFs themselves are not in this repo (Ultimate Guitar prints, published sheet music).
# What IS here is `Files/_filenames.txt`, one name per line, so the same filename match can still
# say which song each chart belongs to; the app then asks the reader for their own copy by name.
_chart_names = sorted(_f.name for _f in CHART_DIR.glob("*.pdf")) if CHART_DIR.exists() else []
_names_txt = CHART_DIR / "_filenames.txt"
if _names_txt.exists():
    _chart_names = sorted(set(_chart_names) | {l.strip() for l in
                          _names_txt.read_text(encoding="utf-8").splitlines() if l.strip()})
if _chart_names and SONGS:
    # SETS, not lists. "Cry Baby Cry" has three words and two distinct ones, and scoring an
    # intersection against the list length marked a chart that matches perfectly as 2/3.
    _stoks = {sid: (set(_cnorm(s["title"])), set(_cnorm(s["artist"]))) for sid, s in SONGS.items()}
    for _f in (CHART_DIR / n for n in _chart_names):
        CHART_STATS["pdfs"] += 1
        _ftoks = set(_cnorm(_f.name))
        _hit = None
        for _sid, (_ti, _ar) in _stoks.items():
            if not _ti:
                continue
            # 80% of the title, not all of it. A filesystem truncates
            # (`…she-came-in-through-the-bathroom-w.pdf`) and a note title carries a suffix the
            # chart has no reason to know about ("Eternity and a Day II. By The Sea 1"). The
            # threshold only ever bites at FIVE title words or more — 4/5 is the first fraction
            # that clears it — so a short title still has to match exactly and cannot drift.
            _got = len(_ti & _ftoks)
            if _got / len(_ti) < 0.8:
                continue
            # A one-word title ("16", "Girl") matches far too much on its own, so it has to bring
            # the artist with it. Two or more title words are specific enough to stand alone —
            # which is what lets `beware of darkness official.pdf` reach a note whose artist
            # (George Harrison) the filename never mentions.
            if len(_ti) < 2 and not (_ar & _ftoks):
                continue
            _sc = (_got, len(_ar & _ftoks))
            if _hit is None or _sc > _hit[1]:
                _hit = (_sid, _sc)
        if _hit is None:
            CHART_STATS["unclaimed"].append(_f.name)
            continue
        if APP:
            # A chart that IS in this repo (a public-domain score, the author's own chart) ships
            # and is shown as it is; any other is a named slot the reader's own copy fills.
            SONGS[_hit[0]].setdefault("chart_shipped" if _f.exists() else "chart_files", []).append(_f.name)
            CHART_STATS["matched"] += 1
            continue
        if not _f.exists():
            continue
        _txt = _chart_text(_f)
        if not _txt:
            continue
        CHARTS.setdefault(_hit[0], []).append(
            {"name": _f.stem, "text": _txt, "lines": _txt.count("\n") + 1})
        CHART_STATS["matched"] += 1

CHART_BYTES = sum(len(c["text"]) for v in CHARTS.values() for c in v)

# ------------------------------------------------- Soundslice metadata (spec-178, 2026-09-02)
# Nate: *"make soundlice links have their own page in the artifact. they're very useful as tools.
# can you embed them in the page directly?"*
#
# THE EMBED QUESTION IS NOW CLOSED, BY OBSERVATION RATHER THAN INFERENCE. spec-174's Phase 0 note
# recorded that the CSP verdict rested on the Artifact tool's documented contract because the
# Chrome bridge was unavailable, and asked the next person to run a live click-test. That test was
# run 2026-09-02 against a throwaway published artifact, and the page's own
# `securitypolicyviolation` handler caught both frames:
#
#     directive=frame-src  blocked=https://www.soundslice.com
#     directive=frame-src  blocked=https://www.youtube.com
#     ... form-action 'self'; frame-src 'self' blob: data:; object-src 'none'; ...
#
# `frame-src 'self' blob: data:`. No external host, no carve-out, nothing to negotiate: a
# Soundslice iframe inside this page is dead, and so is every other embed. The link-out is not a
# preference any more, it is the only thing that works.
#
# WHAT WE CAN DO INSTEAD is carry everything ABOUT the slice into the page, so the shelf is
# readable before you leave it. The slice pages are public and carry two useful strings: the real
# <title> (Nate's hand-typed label said "Harmonic minor chord scale"; the slice itself says
# "D Harmonic minor worksheet" -- the key was missing) and an og:description that is the teacher's
# own written brief ("Played in 4th position ... particular attention to triplets (25bpm)"), which
# appears NOWHERE in the vault note. That is metadata about the assignment, not the score, so the
# README's do-not-mirror rule is untouched.
SLICE_CACHE = SCHOOL / "soundslice-meta"
SLICE_HASH = re.compile(r"soundslice\.com/slices/([A-Za-z0-9_-]+)")
SLICE_LINT = []
REFETCH_SLICES = "--refetch-slices" in argv
_SS_TITLE = re.compile(r"<title>(.*?)</title>", re.S | re.I)
_SS_DESC = re.compile(r'<meta[^>]*property="og:description"[^>]*content="(.*?)"\s*/?>', re.S | re.I)


def _slice_meta(url, hid):
    """Public Soundslice page -> {title, desc}, cached on disk as JSON.

    Same contract as _fetch_thumb() and render_book_pages(): NOTHING here is fatal. A miss ships
    the card with Nate's own label and no brief, which is exactly what the page showed before
    this spec -- so a build on a plane is a quieter page, never a broken one. Pass
    --refetch-slices (or delete the cache dir) to re-read a slice whose teacher has edited it.

    The cache is keyed by the slice HASH, not the note or the label, because the hash is the only
    part of this that is stable: Nate retypes labels and the teacher renames slices.
    """
    out = SLICE_CACHE / f"{hid}.json"
    if out.exists() and not REFETCH_SLICES:
        try:
            return json.loads(out.read_text(encoding="utf-8"))
        except Exception:                                     # noqa: BLE001
            pass                                              # corrupt cache -> refetch below
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=12) as r:
            page = r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:                       # noqa: PERF203
        # A 404/410 is the SERVER'S ANSWER, not a network problem: that slice is not there. Found
        # on Nate's 2026-09-02 capture, where the URL typed on the phone was one character short
        # (`/slices/Kpj7` against the five-character hashes every real slice uses) and the card
        # would otherwise have shipped a confident button onto a dead page. Cached like any other
        # answer, and flagged so the card can SAY so -- silent omission is the worst failure a
        # catalogue can have, and a door that looks open is worse than one marked shut.
        if e.code in (404, 410):
            SLICE_LINT.append(f"{hid}: {e.code} from Soundslice -- the URL looks wrong, card flagged")
            meta = {"title": "", "desc": "", "status": "missing"}
            try:
                SLICE_CACHE.mkdir(parents=True, exist_ok=True)
                (SLICE_CACHE / f"{hid}.json").write_text(json.dumps(meta), encoding="utf-8")
            except Exception:                                 # noqa: BLE001
                pass
            return meta
        SLICE_LINT.append(f"{hid}: HTTP {e.code} -- card ships label-only")
        return {}
    except Exception as e:                                    # noqa: BLE001
        # Anything else is US, not them -- no network, DNS, a timeout. Deliberately NOT cached, so
        # the next build on a real connection tries again instead of inheriting a permanent blank.
        SLICE_LINT.append(f"{hid}: not reachable ({type(e).__name__}) -- card ships label-only")
        return {}
    t = _SS_TITLE.search(page)
    d = _SS_DESC.search(page)
    # " | Soundslice" is on every page and says nothing; the card is already under a Soundslice
    # heading. The description is skipped when it merely repeats the title, which is what a slice
    # with no teacher notes returns (verified on VNb7c) -- an echo is not a brief.
    title = html.unescape(t.group(1)).replace(" | Soundslice", "").strip() if t else ""
    desc = html.unescape(d.group(1)).strip() if d else ""
    if desc and desc.split("\n")[0].strip() == title:
        desc = ""
    meta = {"title": title, "desc": desc}
    try:
        SLICE_CACHE.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(meta, ensure_ascii=False), encoding="utf-8")
    except Exception:                                         # noqa: BLE001
        pass                                                  # an unwritable cache is not fatal
    return meta


# ---------------------------------------------------------------- outside lessons
# Lessons with a real teacher, one note each under Users/<Name>/Lessons/. Per person on
# purpose — a teacher is not shared curriculum. The page can also capture these itself and
# `/school sync` writes them here; `capture_id` is how a captured entry is matched to the
# note it became, so the page can stop showing its own unsynced copy.
LESSONS = []
LESSON_DIR = VAULT / "00 Human/20 Music/Users" / USER.capitalize() / "Lessons"
for lp in sorted(LESSON_DIR.glob("*.md")) if LESSON_DIR.exists() else []:
    fm, body = frontmatter(lp.read_text(encoding="utf-8"))
    if fm.get("type") != "outside-lesson":
        continue
    def sect(name, text=body):
        m = re.search(rf"^## {name}\s*\n(.*?)(?=^## |\Z)", text, re.S | re.M)
        return m.group(1).strip() if m else ""
    # PATCH-137 (F11) — key the ticks by CAPTURE ID when the note has one. A lesson captured on the
    # page keys its homework `ext:cap-<…>:<i>`; sync.py writes the note with every box as `- [ ]`
    # and build.py re-keyed it `ext:<filename stem>:<i>`. So the tick survived, pointed at a key
    # nothing read any more, and the same homework came back unticked and counted due again after
    # the very sync that was meant to preserve it. The capture id is already in the note's
    # frontmatter for exactly this kind of matching; the filename stem is a fallback for notes
    # written by hand, which never had a capture id to lose.
    _hw_key = fm.get("capture_id") or lp.stem
    hw, hw_raw, idx = [], [], 0
    for line in sect("Homework").split("\n"):
        t = TASK.match(line.strip())
        if t:
            hw.append({"id": f"ext:{_hw_key}:{idx}", "done": t.group(1) == "x",
                       "html": md_inline(t.group(2))})
            # spec-178 -- the RAW task text, kept local and never emitted. A slice is matched to
            # the homework that assigns it by looking for its hash in this string, and the
            # rendered `html` is the wrong thing to search: md_inline() turns a bare URL into an
            # <a href> and may percent-encode inside it, so the hash is no longer guaranteed to
            # sit there as plain text. Match the source, ship the render.
            hw_raw.append(t.group(2))
            idx += 1
    # Soundslice — the teacher's own delivery channel (2026-08-23). Nate's guitar teacher sends
    # homework and reference material as Soundslice pages, and Nate wants to WORK in Soundslice's
    # own interface rather than have anything mirrored here. So this is deliberately a link list
    # and nothing more: no embed, no transcription, no attempt to restate the score.
    #
    # It could not be an embed even if we wanted one — the artifact CSP blocks external hosts, so
    # a Soundslice iframe is exactly as dead as a YouTube one. Link out, and use a real <a href>
    # so the frame runtime's __frame_nav hand-off carries it (see watchCard in app.js).
    #
    # ENTRIES ARE FLAT STRINGS, `Label — https://…`, NOT a YAML mapping. That is not a style
    # choice: frontmatter() above is a line parser that reads block sequences of SCALARS only, so
    # a `- label:` / `url:` mapping silently arrives as the string "label: …" with the url line
    # dropped entirely. Tested 2026-08-23. Anything richer needs a real YAML parser first.
    ss = fm.get("soundslice") or []
    if isinstance(ss, str):
        ss = [ss]
    slices = []
    for item in ss:
        s = str(item).strip()
        if not s:
            continue
        m = re.search(r"(https?://\S+)\s*$", s)
        if not m:
            print(f"  ! {lp.stem}: soundslice entry has no URL — {s[:70]!r}")
            continue
        url = m.group(1)
        label = s[:m.start()].rstrip().rstrip("—-–:").strip()
        _h = SLICE_HASH.search(url)
        _hash = _h.group(1) if _h else ""
        if not _hash:
            SLICE_LINT.append(f"{lp.stem}: {url} is not a /slices/<hash>/ URL -- no metadata")
        _meta = _slice_meta(url, _hash) if _hash else {}
        slices.append({
            "url": url, "label": label or "Open in Soundslice", "hash": _hash,
            # The slice's OWN title and the teacher's OWN brief, read from the public page at
            # build time (see _slice_meta). Both are strings the teacher typed into Soundslice's
            # form -- NOT the notation. `Lessons/_README.md`'s rule against mirroring the score
            # is unchanged and this does not touch it.
            "title": _meta.get("title", ""), "desc": _meta.get("desc", ""),
            # "missing" means Soundslice answered 404/410 for this URL. The card wears it as a
            # warning rather than dropping the slice: the homework still says to do it, so the
            # entry has to stay and say what is wrong with it.
            "status": _meta.get("status", "ok"),
            # Which of this lesson's homework lines actually assign this slice. Matched on the
            # hash against the raw task text above, so it survives however the URL was written.
            "hw": [hw[i]["id"] for i, _raw in enumerate(hw_raw) if _hash and _hash in _raw],
        })

    LESSONS.append({
        "id": lp.stem, "date": str(fm.get("date", "")), "instrument": fm.get("instrument", "guitar"),
        "teacher": fm.get("teacher", ""), "capture_id": fm.get("capture_id", ""),
        "enriched": bool(fm.get("enriched", False)), "next_date": str(fm.get("next_date", "") or ""),
        "covered": md(sect("Covered")), "homework": hw, "links": md(sect("Links")),
        "soundslice": slices,
    })
LESSONS.sort(key=lambda x: x["date"], reverse=True)   # newest first, house rule

# ------------------------------------------------------ the slice shelf (spec-178)
# ONE CARD PER SLICE, not per mention. The teacher re-sends a worksheet across lessons -- the
# drop-voicing sheet is already homework twice -- and a shelf that listed it twice would make the
# reader work out that they are the same page. So the hash is the identity, and every lesson that
# assigned it hangs off `uses`, newest first (house rule), which is also what dates the card.
#
# The LABEL comes from the most recent use. Nate retypes it each lesson and the latest phrasing is
# the one that matches what he is currently being asked to do.
_by_hash = {}
for _l in LESSONS:                                    # already newest-first, so first write wins
    for _s in _l["soundslice"]:
        k = _s["hash"] or _s["url"]
        e = _by_hash.get(k)
        if e is None:
            e = _by_hash[k] = {
                "hash": _s["hash"], "url": _s["url"], "label": _s["label"],
                "title": _s["title"], "desc": _s["desc"], "status": _s["status"], "uses": [],
            }
        e["uses"].append({
            "lesson": _l["id"], "date": _l["date"], "instrument": _l["instrument"],
            "teacher": _l["teacher"], "hw": _s["hw"],
        })
SLICES = list(_by_hash.values())
# Newest assignment first. `uses[0]` is the most recent because LESSONS was already sorted that
# way before this ran -- do not re-sort `uses` here or that invariant has two owners.
SLICES.sort(key=lambda x: x["uses"][0]["date"], reverse=True)

# ------------------------------------------------- lesson resources (PATCH-145, 2026-08-26)
# Nate: *"for outside lesson entries. i want the ability to upload resources - usually related
# to homework. is that possible? if i cant upload in the artifact i can add elsewehre."*
#
# NOT IN THE PAGE, AND THAT IS SETTLED. The artifact runtime serves this account four
# capabilities — `artifact`, `downloads`, `mcp`, `self` — and none of them is file storage.
# The one thing that could be made to work (read the file to a data: URI, then `publish()` the
# whole document with it inside) fails three separate ways, so it is not a fallback, it is a
# trap: every `build.py` run regenerates school.html from the vault and would erase it; the
# Obsidian plugin's stubbed `publish()` keeps only the progress island and drops the rest; and
# the full bundle is already 10.4 MB of a 16 MB ceiling.
#
# So the vault is the upload surface — which is also the one that works OFFLINE, where a
# page-side upload never could. Two ways to attach a file, both checked here:
#
#   1. `Lessons/Resources/<the lesson note's filename>/` — everything in that folder.
#      Its `capture_id` works as the folder name too, for a page-captured lesson.
#   2. A file sitting directly in `Lessons/Resources/` whose name starts with the lesson's
#      DATE — `2026-08-26 barre chords.pdf`. This is the drop-it-in-from-the-phone path: one
#      folder, no subfolder to create, and the date is already how these notes are named.
#
# A file that matches neither is REPORTED, never silently ignored — an attachment that does
# not appear is indistinguishable from one nobody added, and that is the failure mode this
# whole block exists to avoid.
RES_DIR = LESSON_DIR / "Resources"
RES_CACHE = SCHOOL / "lesson-resources"
RES_W = 1000                  # px. Legible for a chart or a scanned page; ~40-70 KB of webp
RES_PDF_DPI = 150             # what pdftoppm rasterises at before the resize
RES_MAX_PAGES = 24            # per PDF — a teacher's handout, not a book
RES_BUDGET = 1600 * 1024      # bytes of base64 across ALL lessons. See the drop report below.
RES_IMG = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".heic"}
RESOURCES, RES_BYTES = {}, 0
RES_STATS = {"files": 0, "pages": 0, "kinds": {}, "failed": [], "dropped": [], "unclaimed": []}


def _res_render(src):
    """One resource file -> a list of base64 webp page images. [] means "cannot be shown".

    Cached on disk under `Machine/School/lesson-resources/`, keyed by the source's path, size
    and mtime, for the same reason the book scans are: build.py re-runs after every curriculum
    edit and rasterising a PDF each time would make an unrelated edit cost minutes. A changed
    file gets a new key, so the cache can never serve a stale render of a replaced handout.
    """
    ext = src.suffix.lower()
    if ext not in RES_IMG and ext != ".pdf":
        return []
    st = src.stat()
    key = hashlib.sha1(f"{src}|{st.st_size}|{int(st.st_mtime)}|{RES_W}|{RES_PDF_DPI}"
                       .encode("utf-8")).hexdigest()[:16]
    cache = RES_CACHE / key
    if not (cache / "done").exists():
        if RERENDER and cache.exists():
            shutil.rmtree(cache, ignore_errors=True)
        missing = [t for t in ("convert", "pdftoppm") if not shutil.which(t)]
        if ext == ".pdf" and missing:
            RES_STATS["failed"].append(f"{src.name}: needs {' + '.join(missing)}")
            return []
        if not shutil.which("convert"):
            RES_STATS["failed"].append(f"{src.name}: needs ImageMagick (convert)")
            return []
        cache.mkdir(parents=True, exist_ok=True)
        try:
            if ext == ".pdf":
                subprocess.run(["pdftoppm", "-r", str(RES_PDF_DPI), "-l", str(RES_MAX_PAGES),
                                "-png", str(src), str(cache / "raw")],
                               check=True, capture_output=True, timeout=240)
                for raw in sorted(cache.glob("raw-*.png")):
                    subprocess.run(["convert", str(raw), "-resize", f"{RES_W}x>",
                                    "-strip", "-quality", "78",
                                    str(cache / f"p{raw.stem.split('-')[-1]}.webp")],
                                   check=True, capture_output=True, timeout=120)
                    raw.unlink()
            else:
                # -auto-orient first: a phone photo of a chart carries its rotation in EXIF,
                # and -strip (which is what makes these small) throws that away.
                subprocess.run(["convert", str(src) + "[0]", "-auto-orient",
                                "-resize", f"{RES_W}x>", "-strip", "-quality", "80",
                                str(cache / "p001.webp")],
                               check=True, capture_output=True, timeout=120)
            (cache / "done").write_text("", encoding="utf-8")
        except Exception as e:                            # noqa: BLE001
            shutil.rmtree(cache, ignore_errors=True)
            RES_STATS["failed"].append(f"{src.name}: {type(e).__name__}")
            return []
    return [base64.b64encode(p.read_bytes()).decode("ascii")
            for p in sorted(cache.glob("p*.webp"))]


def _res_add(lid, src):
    """Attach one file to one lesson, inside the global budget."""
    global RES_BYTES
    pages = _res_render(src)
    entry = {"name": src.name, "kind": "pages" if pages else "file",
             "kb": round(src.stat().st_size / 1024)}
    if pages:
        cost = sum(len(p) for p in pages)
        # The budget is a HARD stop and what it stops is SAID. A bundle that silently drops
        # the third page of a handout reads exactly like a handout with two pages.
        if RES_BYTES + cost > RES_BUDGET:
            RES_STATS["dropped"].append(f"{src.name} ({cost // 1024} KB)")
            entry["kind"] = "over"
        else:
            RES_BYTES += cost
            entry["pages"] = pages
            RES_STATS["pages"] += len(pages)
    RES_STATS["files"] += 1
    RES_STATS["kinds"][entry["kind"]] = RES_STATS["kinds"].get(entry["kind"], 0) + 1
    RESOURCES.setdefault(lid, []).append(entry)


if RES_DIR.exists():
    _by_folder = {}                       # folder name (lowercased) -> lesson id
    for _l in LESSONS:
        _by_folder[_l["id"].lower()] = _l["id"]
        if _l.get("capture_id"):
            _by_folder[str(_l["capture_id"]).lower()] = _l["id"]
    _skip = lambda p: p.name.startswith(".") or p.name == "_README.md"
    for _f in sorted(RES_DIR.iterdir()):
        if _skip(_f):
            continue
        if _f.is_dir():
            _lid = _by_folder.get(_f.name.lower())
            if not _lid:
                RES_STATS["unclaimed"].append(f"{_f.name}/ (no lesson note by that name)")
                continue
            for _r in sorted(_f.iterdir()):
                if _r.is_file() and not _skip(_r):
                    _res_add(_lid, _r)
            continue
        # A loose file: it belongs to the lesson whose date its name starts with. Newest
        # first in LESSONS, so two lessons on one date give it to the later note — the same
        # tie-break every other newest-first surface in this vault uses.
        _m = re.match(r"(\d{4}-\d{2}-\d{2})", _f.name)
        _hit = next((_l for _l in LESSONS if _m and _l["date"] == _m.group(1)), None)
        if _hit:
            _res_add(_hit["id"], _f)
        else:
            RES_STATS["unclaimed"].append(
                f"{_f.name} ({'no lesson on ' + _m.group(1) if _m else 'no date in the filename'})")

# ------------------------------------------------------- book pages -> the bundle
# Kept OUT of CURRICULUM on purpose: this is megabytes of base64 and the curriculum block
# is the one a person greps when the page renders something odd. Each course carries its
# `book` id and each lesson its `pages`, which is the join.
BOOKPAGES = {}
for _bid, _book in BOOKS.items():
    _wanted = sorted({n for _cid in _book["courses"] if _cid in COURSES
                      for _u in COURSES[_cid]["lessons"] for n in _u.get("pages", [])})
    if not _wanted:
        print(f"  ! {_bid}: no lesson cites a page — check the courses' Pages column",
              file=sys.stderr)
        continue
    if APP and _bid not in PUBLISHABLE_BOOKS:
        # BRING YOUR OWN. The app carries the book's name and which PDF page each cited page is
        # on — never the pages. The reader adds their own PDF in the app and it is rendered there,
        # on their device. A copy of the PDF sitting in this vault changes nothing: an
        # in-copyright book is never written into docs/, whatever is on disk.
        _fol = _book.get("folios")
        _pp = {str(n): (n if _fol is None else _fol[n]) for n in _wanted
               if _fol is None or _fol.get(n) is not None}
        BOOKPAGES[_bid] = {"byo": True, "file": _book["pdf"].name, "w": _book.get("w", PAGE_W),
                           "cap": _book.get("cap", "PDF page"),
                           "label": _book.get("app_label", _book["label"]),
                           "note": _book.get("app_note", _book["note"]), "pages": _pp}
        print(f"  {_bid}: bring-your-own — {len(_pp)} cited page(s), no images in the app")
        continue
    _got = render_book_pages(_bid, _book, _wanted)
    # A page the scan does not contain is a known hole, not a fault: it is reported without a
    # `!` so a real failure still stands out, and it simply has no image — app.js filters the
    # fold down to the pages the bundle actually carries, so no neighbour stands in for it.
    _absent = _book.get("absent", {})
    _hole = [n for n in _wanted if n in _absent]
    if _hole:
        print(f"  {_bid}: {len(_hole)} cited page(s) not in the scan, no image — "
              + ", ".join(f"p. {n} ({_absent[n]})" for n in _hole))
    _miss = [n for n in _wanted if n not in _absent and str(n) not in _got]
    if _miss:
        print(f"  ! {_bid}: {len(_miss)} cited page(s) have no image "
              f"({', '.join(str(x) for x in _miss[:8])}{'...' if len(_miss) > 8 else ''})",
              file=sys.stderr)
    if _got:
        BOOKPAGES[_bid] = {"fmt": PAGE_FMT, "w": _book.get("w", PAGE_W),
                           "cap": _book.get("cap", "PDF page"), "label": _book["label"],
                           "note": _book["note"], "pages": _got}
        if APP:      # the images are files under docs/books/, so the JSON only says which exist
            BOOKPAGES[_bid].update({"base": f"books/{_bid}/", "pages": {k: 1 for k in _got}})

# --------------------------------------------------------- ear training (spec-172)
# 20 clips as PITCH DATA, not audio: {id, answer, events:[{notes:[midi], start, dur}]}.
# Nate chose browser synthesis over mp3, which is why this is 6 KB of JSON instead of 5 MB
# of encoded WAV — there are no audio files in the bundle and no encoder on this machine.
# The player is app.js's (Web Audio); build.py only carries the data across.
EARTRAIN = []
try:
    EARTRAIN = json.loads((SCHOOL / "eartrain.json").read_text(encoding="utf-8"))
except Exception as e:                                    # noqa: BLE001
    print(f"  ! eartrain.json not read ({e}) — the ear-training player will have no clips",
          file=sys.stderr)

# PATCH-144 — fold the back-references in once every course has been parsed. Deduped and left
# in lesson order, which is the order they were assigned in.
for _sid, _used in SRC_USED.items():
    if _sid in SOURCES:
        SOURCES[_sid]["used"] = list(dict.fromkeys(_used))


# ------------------------------------------------- the link closure (PATCH-159, 2026-09-07)
# Nate: *"guitar positions isnt linked on the page. make sure all links work in the school
# system."*
#
# PATCH-144's rule was "only notes something in the school ASSIGNS get a page", and that rule is
# exactly why [[Guitar Positions]] read as dead grey text: it is named 13 times -- from the
# Interval Ladder drill, from lesson prose, from inside pulled reading -- and assigned by no
# **Read** line anywhere. Measured on the build this replaced: 4,550 vault spans on the page,
# 2,113 of them live, 2,437 dead across 779 distinct note names.
#
# THE WHOLE CLOSURE DOES NOT FIT, AND NO CAP MAKES IT FIT. Following every link out of every page
# the bundle already has reaches 434 notes at hop 1, another 1,010 at hop 2, and 4,745 at
# fixpoint -- 5.4 MB of rendered HTML for hop 1 ALONE, on top of an 11.5 MB bundle against a
# 16 MB artifact ceiling. So this pass is deliberately BUDGETED rather than complete, and the
# run prints what it could not reach instead of leaving that to be discovered on the page:
#
#   * HOP BY HOP outward from what is already there, so the reader's first click always lands
#     somewhere real and it is DEPTH that runs out, never the page in front of them;
#   * MOST-LINKED FIRST within a hop, so each byte of the budget buys the most dead spans;
#   * REF_CAP per page, far under an assigned note's 60 KB, because these are reference pages --
#     the opening and the first sections, closed by the same "the rest is in the vault" footer a
#     capped assigned note already prints. A short real page beats a grey span, and beats a
#     bundle that will not publish;
#   * TRANSCRIPTS EXCLUDED. 1,625 of the notes reachable from here are raw auto-caption dumps
#     under `YouTube Notes/Transcripts/`; the lesson note that digests one is in the bundle
#     already, and spending the budget on captions would buy fewer links and worse pages.
#
# The pass runs HERE, after every other section has been built, for two reasons: it has to see
# the spans in DRILLS, TOOLS, SONGS and SLICES as well as the courses, and a note it adds must
# never win over the same note being parked in full by a Read line (`_source` returns early on a
# note that already has a page, so assignment always takes precedence).
REF_CAP = 2600                 # chars of teaching body on a page nothing assigns
REF_BUDGET = 2_800_000         # bytes of rendered HTML this pass may add to the bundle
_VSPAN = re.compile(r'class="xlink xlink-vault" data-note="([^"]*)"')

def _vault_names(obj, sink):
    """Every inert `[[note]]` span reachable in `obj`, counted by the note's real basename."""
    if isinstance(obj, str):
        if 'xlink-vault' in obj:
            for n in _VSPAN.findall(obj):
                base = html.unescape(n).split("#")[0].split("/")[-1].strip().lower()
                if base:
                    sink[base] += 1
    elif isinstance(obj, dict):
        for v in obj.values():
            _vault_names(v, sink)
    elif isinstance(obj, (list, tuple)):
        for v in obj:
            _vault_names(v, sink)

_frontier = [CLASSES, COURSES, CONCEPTS, LESSONS, READING, SOURCES, DRILLS, TOOLS, SONGS, SLICES]
_ref_spent, _ref_added, _ref_hops = 0, 0, 0
_ref_left = collections.Counter()          # what the budget could not reach, most-linked first
while _frontier:
    _counts = collections.Counter()
    for _o in _frontier:
        _vault_names(_o, _counts)
    _ref_hops += 1
    _next, _full = [], False
    for _name, _n in _counts.most_common():
        if _name in SRC_INDEX:
            continue                       # already a page — a live span, not a dead one
        _p = READ_INDEX.get(_name)
        if _p is None or "Transcripts" in _p.parts:
            continue                       # not a note in the reading roots, or a caption dump
        if _full:
            _ref_left[_name] = _n
            continue
        _nt = load_note(_name)
        if not _nt:
            continue
        _had = len(SOURCES)
        try:
            _sid = _source(_nt, cap=REF_CAP, ref=True)
        except Exception as e:                                # noqa: BLE001
            READ_MISSES.append(f"no reference page: [[{_name}]] ({e})")
            continue
        if len(SOURCES) == _had:
            continue                       # deduped onto a page that already existed
        _cost = len(SOURCES[_sid]["html"])
        if _ref_spent + _cost > REF_BUDGET:
            # Roll it back whole — a half-registered page is a link into nothing. Every page in
            # this pass costs about the same (REF_CAP bounds it), so the first one that does not
            # fit means the budget is gone rather than that one note happened to be fat.
            del SOURCES[_sid]
            SRC_INDEX.pop(_nt["title"].lower(), None)
            _ref_left[_name] = _n
            _full = True
            continue
        _ref_spent += _cost
        _ref_added += 1
        _next.append(SOURCES[_sid])
    _frontier = _next
_ref_dead = sum(_ref_left.values())

# The route index for app.js's inert-span pass. A drill, a routine and a tool all have a page in
# here that is NOT a `source:` page, and matching on the note's basename is the only way the pass
# can know that: [[Interval Ladder]] should open the routine — stat strip, practice log, the lot —
# not a read-only copy of the same note's prose. Source pages stay the fallback for everything
# else, so this map only has to carry what has somewhere better to go.
LINK_ROUTES = {}
for _d in ROUTINES:
    LINK_ROUTES[_d["title"].lower()] = f'routine:{_d["id"]}'
for _list in TECHNIQUE.values():
    for _d in _list:
        LINK_ROUTES[_d["title"].lower()] = f'technique:{_d["id"]}'
for _t in TOOLS:
    LINK_ROUTES.setdefault(_t["title"].lower(), f'tool:{_t["id"]}')
# The school's OWN notes under `Curriculum/` are deliberately outside READ_INDEX -- "already in
# the page" -- but two kinds of them are named by [[wikilink]] from teaching content and had
# nowhere to land, which read as the school failing to link to itself. A test paper's page IS the
# Tests view (its score, its missed questions and the reading that answers them); the drill
# index's page is the Drills shelf. Neither view takes an argument, so these are routes to a
# place, not to a row -- which is the honest shape here: the paper itself is sat in Claude Code.
for _p in sorted((CUR / "Tests").rglob("*.md")) if (CUR / "Tests").exists() else []:
    LINK_ROUTES.setdefault(_p.stem.lower(), "tests")
LINK_ROUTES.setdefault("drill index", "drills")
LINK_ROUTES.setdefault("song library", "songs")

# ------------------------------------------------ test papers (app build)
# The app sits and grades tests itself (the reader answers on the page; Claude marks it through
# the reader's own API key), so the papers travel with it: questions, and the key the grader
# marks against. A paper that has been sat in the vault carries that attempt inline — the typed
# answers, a verdict callout under each, a result banner under the title. NONE of that is read:
# the question is the text between the metadata comment and `**A:**`, and nothing after it.
PAPERS = {}
_Q_HEAD = re.compile(r"^#### Q(\d+)\s*$", re.M)
_Q_META = re.compile(r"<!--\s*concept:\s*(.*?)\s*·\s*type:\s*([a-z-]+)(?:\s*·\s*audio:\s*([^\s>]+))?\s*-->")
_KEY_ENTRY = re.compile(r"^\*\*Q(\d+)\.\*\*\s*(.*)$")
def _paper(path):
    fm, body = frontmatter(path.read_text(encoding="utf-8"))
    if str(fm.get("type", "")) != "school-test":
        return None
    cut = body.find("## ✅ End of questions")
    qpart, kpart = (body[:cut], body[cut:]) if cut >= 0 else (body, "")
    heads = list(_Q_HEAD.finditer(qpart))
    qs = []
    for i, m in enumerate(heads):
        blk = qpart[m.end(): heads[i + 1].start() if i + 1 < len(heads) else len(qpart)]
        meta = _Q_META.search(blk)
        text = blk[meta.end():] if meta else blk
        text = text.split("**A:**")[0].strip()
        qs.append({"n": int(m.group(1)), "concept": (meta.group(1) if meta else "").strip(),
                   "type": (meta.group(2) if meta else "objective"),
                   "audio": (meta.group(3) or "") if meta else "",
                   "q": md(text), "qt": text})
    key, cur = {}, None
    for line in kpart.splitlines():
        if not line.startswith(">"):
            continue
        line = line[1:].strip()
        m = _KEY_ENTRY.match(line)
        if m:
            cur = key.setdefault(int(m.group(1)), {"a": m.group(2).strip(), "also": [], "why": [], "rubric": ""})
        elif cur is not None and line:
            if line.startswith("*Also accepted:*"):
                cur["also"] = [x.strip() for x in line[len("*Also accepted:*"):].split("·") if x.strip()]
            elif line.startswith("*Rubric"):
                cur["rubric"] = line.split(":*", 1)[-1].strip()
            else:
                cur["why"].append(line)
    for q in qs:
        k = key.get(q["n"], {})
        q.update({"a": k.get("a", ""), "also": k.get("also", []),
                  "why": " ".join(k.get("why", [])), "rubric": k.get("rubric", "")})
    course = re.search(r"Course (\d+)", str(fm.get("course") or ""))
    title = re.search(r"^# (.+)$", body, re.M)
    try: lesson = int(fm.get("lesson")) if str(fm.get("lesson") or "").strip() else None
    except (TypeError, ValueError): lesson = None
    try: pass_pct = int(fm.get("pass_pct"))
    except (TypeError, ValueError): pass_pct = None
    return {"name": path.stem, "title": title.group(1).strip() if title else path.stem,
            "kind": str(fm.get("test_kind") or "lesson"), "course": course.group(1) if course else "",
            "lesson": lesson, "pass": pass_pct, "qs": qs}
if APP and (CUR / "Tests").exists():
    for _p in sorted((CUR / "Tests").rglob("*.md")):
        try:
            _pp = _paper(_p)
        except Exception as _e:                                   # noqa: BLE001
            print(f"  ! paper {_p.name}: {_e}")
            continue
        if _pp and _pp["qs"]:
            PAPERS[_pp["name"]] = _pp
    _nokey = [n for n, p_ in PAPERS.items() if any(not q["a"] for q in p_["qs"])]
    print(f"  papers: {len(PAPERS)} test papers, {sum(len(p_['qs']) for p_ in PAPERS.values())} questions"
          + (f" · ! {len(_nokey)} with a question that has no key entry" if _nokey else ""))

CURRICULUM = {
    "user": USER, "semester": SEM, "config": CONFIG,
    "classes": CLASSES, "courses": COURSES, "concepts": CONCEPTS, "lessons_external": LESSONS,
    # PATCH-010 — the textbook, deduped. Every Read task references entries here by id
    # rather than carrying its own copy, so the eight lessons that all send you to
    # [[Arrangement and Song Form]] cost one pull between them.
    "reading": READING,
    # PATCH-144 — the notes those Read lines point AT, one page each. `srcindex` is the
    # basename -> id map app.js links on: it turns an inert `[[Note]]` span, anywhere on the
    # page, into a link to the note's page here.
    "sources": SOURCES, "srcindex": SRC_INDEX,
    # PATCH-159 — basename -> the route that is BETTER than a source page for that note.
    "routes": LINK_ROUTES,
    # THREE track orderings, not two (spec-172 Phase 3b). `instrument` is syllabus.json's third
    # array: courses 19-26 are dealt from their own queue at their own pace instead of queueing
    # behind the theory track. A track array that is not emitted here is invisible to the page —
    # app.js's trackLessons() sorts by position in these lists and drops nothing, but schedule()
    # only deals the tracks it is given, so an unemitted array means 68 lessons that never appear
    # on the timeline. Adding a fourth track is this line plus PACE/schedule() in app.js.
    "order": {"theory": SYL.get("theory", []), "prod": SYL.get("prod", []),
              "instrument": SYL.get("instrument", [])},
    # spec-174 -- technique drills, practice routines, watch-only videos, read-only methodology.
    "drills": DRILLS,
    # spec-176 -- the song library, frontmatter only. Each entry's `id` IS its id in `sources`
    # above, which is what makes the detail page free: the grid links to `source:<id>` and the
    # note body is already there. The sleeves are their own island (see `covers`).
    "songs": SONGS,
    # spec-177 -- the outside-tools shelf. Countless on the rail, like drills and songs:
    # nothing here is ever due. Each entry carries its own rendered `html`, so the shelf
    # needs no `sources` page and no second markdown path.
    "tools": TOOLS,
    # spec-178 -- the Soundslice shelf. Countless on the rail for the reason drills, songs and
    # tools each give: a numeral there means WORK OWED TODAY, and a slice is a door, never a debt.
    # The homework that assigns one is what is owed, and it is already counted on the Homework tab.
    "slices": SLICES,
}

prog_path = SCHOOL / f"progress-{USER}.json"
# PATCH-164 (2026-09-22) — a MISSING progress file used to fall back to {"user": USER} in
# silence. That is correct on a genuine first run and catastrophic every other time: the build
# succeeds, looks normal, and publishing it overwrites the live page's embedded state with an
# empty one — school.md line 56, "a republish overwrites the page's embedded state with the
# vault's copy". The two cases are indistinguishable from inside the build, so it refuses and
# makes the caller say which one this is.
#
# Why the flag rather than a prompt: build.py is run by scripts and by other sessions, and the
# recovery path (sync first) is the right answer often enough that stopping is the safe default.
# Found on Britt's clone 2026-09-22, where progress-britt.json did not exist yet and a publish
# would have wiped a page she had already enrolled on.
if not prog_path.exists() and "--new-user" not in argv and not APP:
    sys.exit(
        f"  ! no {prog_path.relative_to(VAULT)} — refusing to build.\n"
        f"    A build without it produces an EMPTY page, and publishing that over an existing\n"
        f"    one destroys whatever progress lives there.\n"
        f"    · Page already exists for '{USER}'?  Run /school sync FIRST, then rebuild:\n"
        f"        python3 Machine/Scripts/school-artifact/sync.py <artifact.html>\n"
        f"    · Genuinely a brand-new user with no page yet?  Re-run with --new-user.")
PROGRESS = json.loads(prog_path.read_text(encoding="utf-8")) if prog_path.exists() else {"user": USER}
if APP:      # nobody's progress is published; each device starts clean and keeps its own
    PROGRESS = {"user": USER}
# `assignments` (spec-173, the per-lesson turn-in) and `drills` (spec-160's tempo log, which the
# homework page writes tempo_current into) are seeded EMPTY rather than left absent when the
# vault has none yet. Not cosmetic: sync.py owns a section it finds on the page and carries one
# it does not, so a page that omits the key entirely gets its state carried-not-read — which is
# the exact silent revert this spec exists to close. Emitting the key is what says "the page
# speaks for this section now".
for k in ("concepts", "courses", "classes", "tests", "homework", "assignments", "drills"):
    PROGRESS.setdefault(k, {})

# PATCH-136 (B8) — warn when a recorded tick no longer matches any task the build emits.
# Task ids are POSITIONAL (`{course}:{lesson}:{label-prefix}{index}`, line ~681), so inserting one
# line into a Homework block silently re-points every tick below it: the new task is born ticked,
# its neighbours inherit the wrong state, and the `**Test**` item's tick — the one `testGate()` and
# the "Sat" pill read — is orphaned, so a test that WAS sat shows as never sat. Nothing detected
# any of that. This does not fix the ids (content-hashing them is the real answer, and it would
# invalidate every existing tick), but it makes the damage visible at the moment it happens instead
# of weeks later. `ext:` keys belong to outside lessons, which are not built from course notes.
_emitted = set()
for _c in COURSES.values():
    for _u in _c.get("lessons", []):
        for _b in _u.get("blocks", []):
            for _t in _b.get("tasks", []):
                _emitted.add(_t["id"])
_orphans = sorted(k for k in (PROGRESS.get("homework") or {})
                  if not k.startswith("ext:") and k not in _emitted)
if _orphans:
    print(f"  ! {len(_orphans)} homework tick(s) match no task in this build — the note's task "
          f"lines have moved and these ticks now point at nothing:", file=sys.stderr)
    for _k in _orphans[:8]:
        print(f"      {_k}", file=sys.stderr)
    if len(_orphans) > 8:
        print(f"      … and {len(_orphans) - 8} more", file=sys.stderr)
PROGRESS["user"] = USER
# Homework state comes from the PER-PERSON progress file only — never from the `- [x]` boxes in
# the course notes. Those notes are shared with Britt, so seeding from them would leak one
# person's homework into the other's page on every rebuild. Same principle as spec-155.

def jdump(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")

CSS = (HERE / "app.css").read_text(encoding="utf-8")
JS = (HERE / "app.js").read_text(encoding="utf-8")
# The glyph check is not optional here, and it is why this comment exists: Google's Bodoni Moda
# ships without em dash, en dash OR hyphen glyphs and blanked them out in every heading
# (verified 2026-08-19, which is what put Prata in). Course titles are full of em dashes and they
# land in .vh, so any display face swapped in has to be checked for them — Fraunces was, 2026-08-24.
FONTS = ("https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700"
         "&family=Courier+Prime:wght@400;700"
         "&family=Prata&family=Spectral:wght@400;500;600&display=swap")

# PATCH-139 — THE BUILD STAMP, and why it is in the CONTENT and not the filesystem.
# The offline pane used to report `file.stat.mtime`, and on the Boox that read "built 8/21" while
# the desktop had rebuilt many times since. An mtime is a property of the copy, not of the build:
# a sync client sets it to whenever the file landed, and a file that never lands keeps a date that
# looks like an answer and is not one. Stamping the document means the pane reports the build it is
# actually running, so "is this current?" stops being a guess.
STAMP = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

def emit(path, bookpages, label, resources=None, covers=None, songs=True, charts=None):
    # spec-176 — `songs=False` takes the whole song library back out: the frontmatter block AND
    # the 119 note pages `_source()` parked in `sources`. A song note that a **Read** line also
    # assigns stays — it is coursework at that point, and the lesson linking to it must not break.
    # app.js needs no build flag to cope: it hides the tab when `songs` is empty (see rail()), so
    # a copy without the library is a school with one fewer shelf, not a school with a dead tab.
    cur = CURRICULUM if songs else dict(
        CURRICULUM, songs={},
        sources={k: v for k, v in SOURCES.items() if k not in SONGS or v.get("used")})
    path.write_text(f"""<title>{TITLE}</title>
<meta name="school-build" content="{STAMP}">
<meta name="school-books" content="{'full' if bookpages else 'none'}">
<link rel="stylesheet" href="{FONTS}">
<style id="app-css">{CSS}</style>
<div id="app"></div>
<script type="application/json" id="curriculum">{jdump(cur)}</script>
<script type="application/json" id="progress">{jdump(PROGRESS)}</script>
<script type="application/json" id="eartrain">{jdump(EARTRAIN)}</script>
<script type="application/json" id="bookpages">{jdump(bookpages)}</script>
<script type="application/json" id="resources">{jdump(resources or {})}</script>
<script type="application/json" id="covers">{jdump(covers or {})}</script>
<script type="application/json" id="charts">{jdump({}) if not songs else jdump(charts or {})}</script>
<script id="app-js">{JS}</script>
""", encoding="utf-8")
    return path.stat().st_size / 1024

# ---------------------------------------------------------- the copyright gate on the BUNDLE
# 2026-09-01, Nate's call. The published artifact is shared with anyone who has the link, so a
# scanned in-copyright book embedded in it is redistribution — and this file has said so about
# Leavitt since the scans went in ("the copyright gate, which exists because Leavitt cannot be
# redistributed"). What that comment described was the gate in app.js — `BOOKPAGES[c.book]`
# returning undefined for an absent book — but nothing ever *applied* it to the published build,
# so all 119 Leavitt pages shipped on every publish from 2026-08-20 onward.
#
# It was also masked: `school-lite.html` was described as "the copyright-clean copy", which made
# it sound like the boundary was handled somewhere. It was not — lite was a second file, and the
# FULL build is what gets published. Retiring lite on 2026-09-01 did not cause this and did not
# fix it; it removed the thing that made it look fixed.
#
# THE SPLIT IS BY COPYRIGHT STATUS, NOT BY SIZE:
#   * hanon   — Charles-Louis Hanon, "The Virtuoso Pianist", 1873. PUBLIC DOMAIN. Ships.
#   * leavitt — William Leavitt, "A Modern Method for Guitar" (Berklee Press). IN COPYRIGHT.
#               Stays in the vault, never in the bundle.
#
# The page needs no change to cope, which is the whole point of the app.js gate: every reader is
# written `bk ? … : []`, so an absent book is a course whose lessons show no page images on a page
# that otherwise works completely. The PDF stays in `Books/` and the offline Obsidian pane reads
# the vault, so nothing is lost locally — only the published copy is thinner.
#
# To add a book here, check its copyright first. Pre-1929 or explicitly licensed only.
_withheld = {k: v for k, v in BOOKPAGES.items() if k not in PUBLISHABLE_BOOKS}
PUBLISHED_BOOKPAGES = {k: v for k, v in BOOKPAGES.items() if k in PUBLISHABLE_BOOKS}
if _withheld and not APP:
    import json as _json
    _kb = sum(len(_json.dumps(v)) for v in _withheld.values()) / 1024
    print(f"  copyright gate: {len(_withheld)} book(s) withheld from the bundle "
          f"({', '.join(sorted(_withheld))}) — {_kb:,.0f} KB. In the vault, not on the page.")

def emit_app(d):
    """Write the installable app into docs/. Everything the page needs is a plain file beside
    index.html, so GitHub Pages can serve it as-is and the service worker can keep it offline."""
    shell = HERE / "app-shell"
    (d / "data").mkdir(parents=True, exist_ok=True)
    cur = dict(CURRICULUM, slots=SLOTS, papers=PAPERS)
    # Listening questions name a clip (`audio: ear-NN.wav`); the clips are this school's own
    # renders (school-eartrain-render.py), so they ship.
    adir = d / "audio"
    for name in sorted({q["audio"] for p_ in PAPERS.values() for q in p_["qs"] if q["audio"]}):
        src = CUR / "Audio" / name
        if src.exists():
            adir.mkdir(exist_ok=True)
            if not (adir / name).exists():
                shutil.copyfile(src, adir / name)
    # Files that ARE in this repo and are shown in place: embeds in notes, and shipped charts.
    # A picture is re-encoded as WebP no wider than SHIP_W (a 2 MB screenshot becomes ~60 KB, and
    # every file here is downloaded when the app installs); the slot records the name it was
    # written under (`src`). Anything else is copied as it is.
    fdir = d / "files"
    keep = set()
    def ship(name, path):
        fdir.mkdir(exist_ok=True)
        if path.suffix.lower() in (".png", ".jpg", ".jpeg"):
            out = fdir / (name + ".webp")
            try:
                if not out.exists() or out.stat().st_mtime < path.stat().st_mtime:
                    from PIL import Image                      # noqa: PLC0415
                    im = Image.open(path)
                    im = im.convert("RGBA" if "A" in im.getbands() or "transparency" in im.info else "RGB")
                    if im.width > SHIP_W:
                        im = im.resize((SHIP_W, round(im.height * SHIP_W / im.width)), Image.LANCZOS)
                    im.save(out, "WEBP", quality=84, method=6)
                keep.add(out.name)
                return out.name
            except Exception as ex:                           # noqa: BLE001
                print(f"  ~ {name}: could not be re-encoded ({ex}); shipped as it is")
        shutil.copyfile(path, fdir / name)
        keep.add(name)
        return name
    for name, e in SLOTS.items():
        if e["have"]:
            src = ship(name, MEDIA_INDEX[name.lower()])
            if src != name:
                e["src"] = src
    for s_ in SONGS.values():
        for name in s_.get("chart_shipped", []):
            ship(name, CHART_DIR / name)
    if fdir.is_dir():
        for f in fdir.iterdir():
            if f.name not in keep:
                f.unlink()
    (d / "data/curriculum.json").write_text(jdump(cur), encoding="utf-8")
    (d / "data/eartrain.json").write_text(jdump(EARTRAIN), encoding="utf-8")
    (d / "data/bookpages.json").write_text(jdump(BOOKPAGES), encoding="utf-8")
    shutil.copyfile(HERE / "app.js", d / "app.js")
    shutil.copyfile(HERE / "app.css", d / "app.css")
    # the shell: everything in app-shell/ except the two templates filled in below
    for f in sorted(shell.rglob("*")):
        if f.is_file() and f.name not in ("index.html", "sw.js", ".DS_Store"):
            out = d / f.relative_to(shell)
            out.parent.mkdir(parents=True, exist_ok=True)
            if not out.exists() or out.read_bytes() != f.read_bytes():
                shutil.copyfile(f, out)
    (d / ".nojekyll").write_text("", encoding="utf-8")
    index = (shell / "index.html").read_text(encoding="utf-8")
    index = (index.replace("{{TITLE}}", html.escape(TITLE)).replace("{{STAMP}}", STAMP)
                  .replace("{{BOOKS}}", "full" if any(not b.get("byo") for b in BOOKPAGES.values()) else "none"))
    (d / "index.html").write_text(index, encoding="utf-8")
    # library.html — the same app opened in library mode: the shelves the Music app's Library tool
    # links to (songs, drills, the idea board, the reader's files). See LIBMODE in app.js.
    lib = (index.replace(f"<title>{html.escape(TITLE)}</title>", "<title>Library</title>")
                .replace('window.MS_APP = {build: "' + STAMP + '"};', 'window.MS_APP = {build: "' + STAMP + '", mode: "library"};')
                .replace('<div class="boot"><h1>School</h1>', '<div class="boot"><h1>Library</h1>'))
    assert 'mode: "library"' in lib and "<title>Library</title>" in lib, "library.html: the shell template changed"
    (d / "library.html").write_text(lib, encoding="utf-8")
    # The service worker carries a list of every file and a hash of each, so an update fetches
    # only what changed — the 114 Hanon pages are downloaded once, ever.
    files = {}
    for f in sorted(d.rglob("*")):
        rel = f.relative_to(d).as_posix()
        if f.is_file() and rel not in ("sw.js", ".nojekyll") and not rel.endswith((".DS_Store", "_pdfmap.json")):
            files[rel] = hashlib.sha1(f.read_bytes()).hexdigest()[:10]
    sw = (shell / "sw.js").read_text(encoding="utf-8")
    sw = sw.replace("/*{{FILES}}*/{}", json.dumps(files, ensure_ascii=False, separators=(",", ":")))
    sw = sw.replace("{{STAMP}}", STAMP)
    (d / "sw.js").write_text(sw, encoding="utf-8")
    return sum(f.stat().st_size for f in d.rglob("*") if f.is_file()) / 1024, len(files)

if APP:
    _app_kb, _app_n = emit_app(APP_DIR)
    OUT = APP_DIR / "index.html"
else:
    emit(OUT, PUBLISHED_BOOKPAGES, "full", RESOURCES, COVERS, charts=CHARTS)

# THE LITE BUILD IS GONE — retired 2026-09-01, Nate: *"i think i want to abandon school-lite."*
#
# It had three stated reasons and all three were dead:
#
#   1. **Transport.** PATCH-139 built it because `school-lite.html` had to cross Obsidian Sync's
#      5 MB per-file cap to reach the Boox. Nate retired that on 2026-08-31 (*"stop shipping school
#      through obsidian sync. i wont be using the boox anyways"*) and the 4.6 MB ceiling went with
#      it. The shed ladder it fed — sleeves, then charts, then the whole song library, then the
#      lesson handouts — went overboard cheapest-first to protect a device that is out of service.
#   2. **The shared repo.** The comment here claimed lite was "the only build that could ever ship
#      in the shared repo." **That was already untrue when it was written.** `sync-shared.sh` ships
#      build SOURCES (build.py, app.js, app.css, sync.py), never built HTML, and it excludes
#      `Books/` outright — so Britt clones a vault with no scans in it and her own build comes out
#      copyright-clean on its own. Lite was doing nothing for her.
#   3. **The phone/tablet pane.** The last real one: both offline panes loaded lite on a small
#      device because reading the full bundle killed them there. Nate, 2026-09-01: no one reads the
#      pane on a phone or tablet any more. So it goes.
#
# **The copyright gate did NOT live here and is unaffected.** It is `BOOKPAGES[c.book]` returning
# undefined for any book not in the bundle, with every reader written as `bk ? … : []`. A vault
# without `Books/` produces a scan-free page from this one build, which is exactly what the shared
# repo relies on. Dropping lite removed a second COPY of the page, not the boundary.
#
# If a small-device build is ever wanted again, `emit()` still takes the flags that made lite what
# it was — `emit(path, {}, "lite", RESOURCES, COVERS, charts=CHARTS)` reproduces it in one line.
# What is not coming back is the ladder: it existed to hit a transport cap that no longer exists.

# lint: a standing course should sit in a standing class and vice versa. Flags config drift
# rather than silently propagating it into the page.
for c in COURSES.values():
    kls = CLASSES.get(c["class_id"])
    if c["standing"] and kls and not kls["standing"]:
        print(f"  ! Course {c['id']} is standing in School Config but its class "
              f"({kls['title']}) is not — check courses.standing", file=sys.stderr)
    if kls and kls["standing"] and not c["standing"] and len(kls["courses"]) == 1:
        print(f"  ! {kls['title']} is a standing class but its only course "
              f"({c['id']}) is not in courses.standing", file=sys.stderr)

# PATCH-010 — say what the Read lines resolved to. A fallback is not an error (the page still
# renders material and still shows the link) but it IS drift: a heading got renamed, or a
# pointer was written as prose. Printing the count keeps that visible instead of silent.
rd_html = sum(len(r["html"]) for r in READING.values())
print(f"  reading: {READ_STATS['links']} pointers on {READ_STATS['lines']} Read lines -> "
      f"{READ_STATS['section']} named sections · {READ_STATS['note']} whole notes · "
      f"{READ_STATS['opening']} fell back to the note's opening · {READ_STATS['missing']} link-only")
print(f"           {len(READING)} deduped entries, {rd_html/1024:.0f} KB of HTML"
      + (f"  ({len(READ_AMBIG)} ambiguous basenames in the index)" if READ_AMBIG else ""))
src_html = sum(len(s["html"]) for s in SOURCES.values())
print(f"  sources: {len(SOURCES)} note pages, {src_html/1024:.0f} KB of HTML · "
      f"{sum(1 for s in SOURCES.values() if s['more'])} trimmed at the cap · "
      f"{sum(len(s.get('used', [])) for s in SOURCES.values())} lesson references")
# PATCH-159 — the closure, said out loud. A budgeted pass that reports only what it MANAGED is a
# pass that quietly stops being enough; the number that matters on the next run is the one on the
# right, and the names under it are where to spend the next byte of budget if the ceiling moves.
print(f"  link closure: {_ref_added} reference page(s) over {_ref_hops} hop(s), "
      f"{_ref_spent/1024:.0f} KB of {REF_BUDGET/1024:.0f} KB budget · "
      f"{len(_ref_left)} note(s) / {_ref_dead} span(s) still dead")
if _ref_left:
    print("    most-linked still dead: " + ", ".join(
        f"{n} (x{c})" for n, c in _ref_left.most_common(8)))
for _m in READ_MISSES:
    print(f"  ~ unresolved: {_m}", file=sys.stderr)

kb = OUT.stat().st_size / 1024
print(f"  build stamp: {STAMP}")
# The old warning here fired on every build ("over Obsidian Sync's 5 MB cap") and went with the
# lite build: the bundle does not travel through Sync any more, so a per-file transport cap is not
# a fact about this file. What IS still a hard limit is the ARTIFACT's, and that is what is watched
# now — 16 MB is where a publish stops being possible, and there is no asset store on this account
# to spill into (checked 2026-08-31: the runtime serves artifact/downloads/mcp/self and nothing
# else, and the latter two make the page un-shareable).
#
# THIS IS NOW THE ONLY SIZE GUARD IN THE FILE, which makes it load-bearing in a way it was not while
# lite existed. Watch it when the song library grows: spec-179 adds ~145 Beatles pages, and the
# shelf already carries 64 sleeves.
ART_CEILING = 16 * 1024
if kb > ART_CEILING * 0.85 and not APP:
    print(f"  ! {OUT.name} is {kb/1024:.1f} MB, past 85% of the artifact's {ART_CEILING/1024:.0f} MB "
          f"ceiling.\n    The book scans are the bulk of it and are the first thing that should "
          f"leave — a vault without Books/ builds a scan-free page from this same build.",
          file=sys.stderr)
print(f"  user: {USER}")
if LESSONS:
    print(f"  outside lessons: {len(LESSONS)} ({sum(1 for l in LESSONS if not l['enriched'])} not yet enriched)")
# spec-178 -- say how much of the shelf actually carries the teacher's own words. A slice whose
# metadata never arrived still ships as a working link, so this is the only place that would
# report a build that quietly fell back to label-only on every card.
if SLICES:
    _tit = sum(1 for x in SLICES if x["title"])
    _brf = sum(1 for x in SLICES if x["desc"])
    print(f"  soundslice shelf: {len(SLICES)} slice(s) across "
          f"{len({u['lesson'] for x in SLICES for u in x['uses']})} lesson(s) · "
          f"{_tit} with the slice's own title, {_brf} with the teacher's brief · "
          f"{sum(len(u['hw']) for x in SLICES for u in x['uses'])} homework link(s)")
if SLICE_LINT:
    print(f"  ! {len(SLICE_LINT)} soundslice problem(s):", file=sys.stderr)
    for _m in SLICE_LINT:
        print(f"    - {_m}", file=sys.stderr)
# PATCH-145 — say what was attached AND what was not. An unclaimed file is the failure this
# report exists for: it is in the folder, it is not on the page, and nothing else would say so.
if RES_STATS["files"] or RES_STATS["unclaimed"]:
    print(f"  lesson resources: {RES_STATS['files']} file(s) on {len(RESOURCES)} lesson(s) · "
          f"{RES_STATS['pages']} page image(s), {RES_BYTES / 1024:.0f} KB of "
          f"{RES_BUDGET / 1024:.0f} KB budget"
          + (f" · {RES_STATS['kinds']['file']} not renderable (listed by name)"
             if RES_STATS["kinds"].get("file") else ""))
for _m in RES_STATS["unclaimed"]:
    print(f"  ! resource claimed by no lesson: {_m}", file=sys.stderr)
for _m in RES_STATS["failed"]:
    print(f"  ! resource could not be rendered: {_m}", file=sys.stderr)
for _m in RES_STATS["dropped"]:
    print(f"  ! resource over the {RES_BUDGET // 1024} KB budget, not in the page: {_m}",
          file=sys.stderr)
print(f"  ear training: {len(EARTRAIN)} clips, "
      f"{sum(len(c['events']) for c in EARTRAIN)} note events ({len(jdump(EARTRAIN))/1024:.0f} KB)")
for _bid, _b in BOOKPAGES.items():
    if APP:      # pages are files under docs/books/ (or the reader's own PDF), not base64 here
        if not _b.get("byo"):
            _disk = sum(f.stat().st_size for f in (APP_DIR / "books" / _bid).glob(f"p*.{_b['fmt']}"))
            print(f"  {_bid}: {len(_b['pages'])} page images at {_b['w']}px {_b['fmt']} "
                  f"({_disk/1048576:.2f} MB in docs/books/{_bid}/)")
        continue
    _raw = sum(len(v) for v in _b["pages"].values())
    print(f"  {_bid}: {len(_b['pages'])} page images at {_b['w']}px {_b['fmt']} "
          f"({_raw/1048576:.2f} MB base64, {_raw/len(_b['pages'])*3/4/1024:.0f} KB/page on disk)")
if DRILL_JOIN:
    _keys = [k for _c, _n, k, _t in DRILL_JOIN]
    _blank = [k for _c, _n, k, t in DRILL_JOIN if t is None]
    print(f"  drills: {len(DRILL_JOIN)} lessons joined to {len(set(_keys))} tempo-track keys "
          f"({_keys[0]}…{_keys[-1]}), {len(_blank)} with no printed mark"
          + (f" — {', '.join(_blank)}, null on purpose" if _blank else ""))
print(f"  {len(CLASSES)} classes · {len(COURSES)} courses · "
      f"{sum(len(c['lessons']) for c in COURSES.values())} lessons · {len(CONCEPTS)} concepts")

# spec-174 -- the Drills Library page's own count/lint line, separate from DRILL_JOIN above
# (that one counts Hanon/Leavitt COURSE lessons joined to a tempo key; this one counts the
# physical drill/routine/video/methodology notes the new page surfaces).
_n_tech = sum(len(v) for v in TECHNIQUE.values())
print(f"  drills library: {_n_tech} drills (guitar {len(TECHNIQUE['guitar'])} / "
      f"bass {len(TECHNIQUE['bass'])} / piano {len(TECHNIQUE['piano'])}) · "
      f"{len(ROUTINES)} routines · {len(WATCH)} watch-only ({sum(1 for w in WATCH if w['drill'])} "
      f"drill: true) · {len(METHODOLOGY)} methodology")
for _l in DRILL_LINT:
    print(f"  ! drills: {_l}", file=sys.stderr)

# spec-176 — the song library. `bare` is not an error and is not listed by name: 14 of these
# notes have never had a sleeve filed and the page shows a lettered tile for them, which is a
# finished state, not a gap. `shadowed` IS an error and IS listed — see the loop's own note.
if SONGS:
    print(f"  song library: {len(SONGS)} songs ({sum(1 for s in SONGS.values() if s['collection'])} "
          f"collections) · {len(COVERS)} sleeves at {COVER_W}px webp "
          f"({COVER_BYTES/1024:.0f} KB base64) · {len(SONG_STATS['bare'])} showing a lettered tile")
if CHART_STATS["pdfs"]:
    # spec-177 — the shelf's own line, in the same place and shape as the two shelves above
    # it. A count that only appears when something is wrong is a count nobody trusts.
    print(f"  tools shelf: {len([t for t in TOOLS if t['status'] == 'live'])} live "
          f"({len([t for t in TOOLS if t['status'] != 'live'])} unverified/superseded) · "
          f"{len({c for t in TOOLS if t['status'] == 'live' for c in t['reinforces']})} of "
          f"{len(CONCEPTS)} concepts have at least one")
    print(f"  chord charts: {CHART_STATS['matched']} of {CHART_STATS['pdfs']} PDFs matched to a "
          f"song by filename · {len(CHARTS)} songs have one · {CHART_BYTES/1024:.0f} KB of text")
# An unclaimed chart is the failure this report exists for: the file is in the folder, it is on no
# page, and nothing else in the system would ever say so.
for _m in CHART_STATS["unclaimed"]:
    print(f"  ! chord chart matched no song: {_m}", file=sys.stderr)
for _m in CHART_STATS["failed"]:
    print(f"  ! chord chart: {_m}", file=sys.stderr)
for _m in SONG_STATS["shadowed"]:
    print(f"  ! song note shadowed in the reading index: {_m}", file=sys.stderr)
for _m in SONG_STATS["failed"]:
    print(f"  ! song library: {_m}", file=sys.stderr)
# PATCH-137 (F13a) — a full successful build must not exit 1 on its own success line.
# `--out` anywhere outside the vault made `relative_to` raise: the page WAS written, then the
# process died with a traceback and no size line, so the build looked failed when it had not.
try:
    _shown = OUT.relative_to(VAULT)
except ValueError:
    _shown = OUT
if APP:
    _mine = sum(1 for e in SLOTS.values() if not e["have"])
    print(f"  slots: {len(SLOTS)} embedded file(s) named in notes — {len(SLOTS) - _mine} shipped from "
          f"this repo, {_mine} for the reader to add")
    print(f"  -> {APP_DIR}  ({_app_n} files, {_app_kb / 1024:.1f} MB) — the app; commit that folder to publish")
else:
    print(f"  -> {_shown}  ({kb:.0f} KB)")
