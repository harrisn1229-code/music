#!/usr/bin/env python3
"""
school-course-lint.py — check that `type: school-course` pages hold the polished format
(spec-147, the course polish pass).

Pure Python 3 standard library. No pip installs.

Why this exists
---------------
The polish pass put 16 course pages on one shape: concepts linked inline in the sentence that
teaches them *and* listed in a `**Concepts**` block, a what-it-teaches opener rather than
build history, Title Case lesson headings, a fixed header and footer order. None of that is
enforced by anything else — a course page renders fine while quietly drifting, and the drift
only surfaces when a lesson turns out to drill a concept the page never mentioned.

The expensive failure is the concept coverage one. A concept assigned to a lesson in its own
frontmatter but missing from that lesson's page is a card that enters the spaced-repetition
drip without ever having been taught. That is silent, and it is exactly the kind of thing a
person re-reading a 200-line page does not catch.

So: a linter. Run it after touching any course page, and before a new one counts as done.

Course 17 is exempt by design — it is page-based, carries no concepts, has no lesson sections
and no exam, and deliberately breaks the template. See spec-147-HANDOFF.md.

Exit non-zero on any failure so it can gate a build.

Usage
    python3 school-course-lint.py                 # every course page
    python3 school-course-lint.py "Course 08 — Reading & Position Play"
    python3 school-course-lint.py --list-exempt   # show what is skipped and why
"""

import re
import sys
import pathlib
import collections

VAULT = pathlib.Path(__file__).resolve().parents[2]
SCHOOL = VAULT / "00 Human" / "20 Music" / "School & Content" / "Curriculum"
CD, CO = SCHOOL / "Concepts", SCHOOL / "Courses"

# spec-172 retired the two reps courses: Course 17 became 25/26 and Course 18 became 19-24, all
# with real ### Lesson sections and homework. Nothing is exempt any more — the performance-check
# carve-out in check() (concepts: 0 needs no Final Exam link) is what lets them pass on merit
# instead, so every other rule still applies to them.
EXEMPT = {}

# Phrasing that addresses the builder rather than the student, or assumes what the reader
# already knows. The school is read by someone starting from zero; both kinds mislead.
BANNED = [
    r"\byou had\b", r"\byou missed\b(?! )", r"\byou already know\b", r"\bblank on\b",
    r"\byou skipped\b", r"\bscoring badly\b", r"\bwrong model for\b", r"coverage audit",
    r"fully backed", r"\bunblocked 20", r"already documented", r"genuinely from scratch",
    r"from.scratch (authoring|job)", r"was authored", r"were authored", r"authoring job",
    r"needed no authoring", r"\bthe audit found\b", r"\bgoing in\b", r"weakest strand",
    r"\byou specifically said\b",
]

# "re-seeds only the concepts you missed" is the standard Course-final boilerplate and refers
# to test results, not to prior knowledge. It appears in every course; it is not a finding.
BANNED_EXEMPT_LINE = "concepts you missed"

# Small words that stay lowercase inside a Title Case heading, unless they lead or close it.
LOWER_OK = {"a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "is",
            "it", "its", "nor", "of", "on", "or", "the", "to", "vs", "with", "without"}

# Long enough that a bullet has stopped being a bullet. The polished set runs to ~380.
BULLET_MAX = 420


def title_case_ok(t):
    words = re.findall(r"[A-Za-z][\w’'♭♯-]*", t)
    for i, w in enumerate(words):
        if w[0].isupper():
            continue
        if i not in (0, len(words) - 1) and w.lower() in LOWER_OK:
            continue
        return False, w
    return True, None


def concepts_by_course():
    """Map course name -> lesson number -> [concept ids], from the concepts' own frontmatter.

    The concept notes are the source of truth for what a lesson drills. A course page claiming
    otherwise is the bug this function exists to expose.
    """
    by = collections.defaultdict(lambda: collections.defaultdict(list))
    for p in sorted(CD.glob("*.md")):
        parts = p.read_text(encoding="utf-8").split("---")
        if len(parts) < 3:
            continue
        fm = parts[1]
        c = re.search(r'course:\s*"\[\[(.*?)\]\]"', fm)
        u = re.search(r"^lesson:\s*(\d+)", fm, re.M)
        if c and u:
            by[c.group(1)][int(u.group(1))].append(p.stem)
    return by


def check(name, by):
    txt = (CO / f"{name}.md").read_text(encoding="utf-8")
    fails = []

    # --- header: what-it-teaches -> assumes -> lesson table -> unlocks -> the lessons ---
    body = txt.split("---", 2)[2]
    order = ["**What it assumes**", "| Lesson | Title", "**What this unlocks**", "## The lessons"]
    pos = [body.find(m) for m in order]
    if -1 in pos:
        fails.append(f"missing header element: {order[pos.index(-1)]}")
    elif pos != sorted(pos):
        fails.append(f"header elements out of order: {list(zip(order, pos))}")
    else:
        h1 = re.search(r"^# .*$", body, re.M)
        # A bold or callout opener is the build-history shape the polish pass removed.
        if h1 and body[h1.end():pos[0]].strip().startswith(("**", ">")):
            fails.append("opener is not a plain what-it-teaches line")

    # --- footer: ## Course final (with the exam link) then ## Related ---
    fin = re.search(r"^## Course final$", txt, re.M)
    rel = re.search(r"^## Related$", txt, re.M)
    cid = re.search(r'course_id:\s*"(\d+)"', txt).group(1)
    # spec-172: a course with `concepts: 0` is a PERFORMANCE-CHECK course — the books, where the
    # assessment is playing the thing, not answering a page. It has no Final Exam note to link, and
    # demanding one would mean inventing an assessment the curriculum deliberately does not have.
    # Scoped deliberately: the footer must still EXIST and still sit before ## Related, and every
    # other check still runs. The alternative considered and rejected was adding these courses to
    # EXEMPT, which would have switched off header order, table agreement and frontmatter totals on
    # six courses that pass all three.
    n_con_fm = re.search(r"^concepts:\s*(\d+)", txt, re.M)
    perf_check = bool(n_con_fm) and int(n_con_fm.group(1)) == 0
    if not fin or not rel or fin.start() > rel.start():
        fails.append("Course final / Related footer missing or out of order")
    elif not perf_check and f"[[Course {cid} — Final Exam]]" not in txt[fin.start():rel.start()]:
        fails.append("Course final section lacks the Final Exam link")

    # --- lesson headings: Title Case, and matching the index table ---
    rows = dict(re.findall(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|", txt, re.M))
    parts = re.split(r"^### Lesson (\d+) — (.*)$", txt, flags=re.M)
    secs, heads = {}, {}
    for i in range(1, len(parts), 3):
        n = int(parts[i])
        heads[n], secs[n] = parts[i + 1].strip(), parts[i + 2]
    for n, h in heads.items():
        ok, bad = title_case_ok(h)
        if not ok:
            fails.append(f"L{n} heading not Title Case ({bad!r}): {h}")
        if rows.get(str(n), "").strip() != h:
            fails.append(f"L{n} table title {rows.get(str(n))!r} != heading {h!r}")

    # --- concept coverage: inline AND blocked, in the lesson the concept says it belongs to ---
    for u, ids in sorted(by[name].items()):
        sec = secs.get(u, "")
        if not sec:
            fails.append(f"no ### Lesson {u} section")
            continue
        blk = re.search(r"\*\*Concepts\*\*\n((?:- .*\n)+)", sec)
        listed = re.findall(r"\[\[(.*?)\]\]", blk.group(1)) if blk else []
        # FX is a two-letter strand. Matching [A-Z]{3} silently skips all six of its concepts.
        inline = set(re.findall(r"\[\[([A-Z]{2,4}-C\d+ — [^\]|]+)\|", sec))
        for c in sorted(ids):
            if c not in listed:
                fails.append(f"L{u} {c} missing from Concepts block")
            if c not in inline:
                fails.append(f"L{u} {c} not linked inline in the material")
        for x in listed:
            if x not in ids:
                fails.append(f"L{u} Concepts block has stray {x}")
        row = [l for l in txt.splitlines() if l.startswith(f"| {u} ")]
        if row:
            m = re.match(r"^\|\s*\d+\s*\|[^|]+\|\s*(\d+)", row[0])
            if m and int(m.group(1)) != len(ids):
                fails.append(
                    f"L{u} table says {m.group(1)} concepts, frontmatter assigns {len(ids)}")

    # --- frontmatter totals agree with the page ---
    n_lessons = int(re.search(r"^lessons:\s*(\d+)", txt, re.M).group(1))
    n_con = int(re.search(r"^concepts:\s*(\d+)", txt, re.M).group(1))
    tot = sum(len(v) for v in by[name].values())
    if len(heads) != n_lessons:
        fails.append(f"{len(heads)} lesson sections vs frontmatter lessons: {n_lessons}")
    if tot != n_con:
        fails.append(f"{tot} assigned concepts vs frontmatter concepts: {n_con}")

    # --- prose ---
    lines = txt.splitlines()
    for i, line in enumerate(lines, 1):
        if line.startswith("- ") and len(line) > BULLET_MAX:
            fails.append(f"line {i}: bullet {len(line)} chars > {BULLET_MAX}")
    for pat in BANNED:
        for m in re.finditer(pat, txt, re.I):
            ln = txt[: m.start()].count("\n") + 1
            if BANNED_EXEMPT_LINE in lines[ln - 1]:
                continue
            fails.append(f"line {ln}: banned phrasing {m.group(0)!r}")

    return fails


def main():
    argv = sys.argv[1:]
    if "--list-exempt" in argv:
        for k, v in EXEMPT.items():
            print(f"{k}\n    {v}")
        return 0

    names = argv or sorted(p.stem for p in CO.glob("*.md"))
    by = concepts_by_course()
    checked = skipped = bad = 0
    for name in names:
        if name in EXEMPT:
            print(f"skip {name}  ({EXEMPT[name]})")
            skipped += 1
            continue
        fails = check(name, by)
        checked += 1
        if fails:
            bad += 1
            print(f"FAIL {name}")
            for f in fails:
                print(f"        {f}")

    tail = f", {skipped} exempt" if skipped else ""
    if bad:
        print(f"\nschool-course-lint: {bad} of {checked} course page(s) failing{tail}")
        return 1
    print(f"school-course-lint: {checked} course page(s), clean{tail}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
