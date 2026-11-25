#!/usr/bin/env python3
"""
school-test-lint.py — check that `type: school-test` pages are gradeable (spec-147).

Pure Python 3 standard library. No pip installs.

Why this exists
---------------
`/school grade` reads a test page and marks it. Everything it does depends on the page holding
to a format, and the format has a lot of small load-bearing details — a key entry whose first
line is a paragraph, a rubric whose weights don't sum to 5, a stray callout after the last
answer. Each of those degrades grading quietly: you get a mark, it just isn't right.

Phase 5 authors 71 more of these pages across many sessions. Checking by hand does not scale,
and "be careful" is not a mechanism. So: a linter, run before a page is considered done.

Exit non-zero on any ERROR so it can gate a build. WARNINGs are judgement calls that degrade
grading quality without breaking it — worth reading, not worth failing on.

Usage
    python3 school-test-lint.py                    # every test page
    python3 school-test-lint.py --path <file|dir>  # one page or folder
    python3 school-test-lint.py --quiet            # errors only
"""

import argparse
import re
import sys
from pathlib import Path

VAULT = Path(__file__).resolve().parents[2]
TESTS = VAULT / "00 Human" / "20 Music" / "School & Content" / "Curriculum" / "Tests"
CONCEPTS = VAULT / "00 Human" / "20 Music" / "School & Content" / "Curriculum" / "Concepts"

# A key's first line is the canonical answer. Past this it stops being an answer and starts
# being an essay — which makes the ❌ callout title unreadable and gives the grader a fuzzy
# target. Chosen from the worked examples, not from nothing: the longest good one is ~70 chars.
TERSE_MAX = 110

BRANDS = re.compile(r"\b(fabfilter|pro-?q|soothe\d?|ozone|waves|uad|serum|massive|izotope|"
                    r"valhalla|arturia|kontakt|omnisphere|autotune|melodyne)\b", re.I)
NOTATION = re.compile(r"\b(read the notation|on the staff below|notate the|write out the staff|"
                      r"see the image|in the score below)\b", re.I)


class Report:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def err(self, page, msg):
        self.errors.append((page, msg))

    def warn(self, page, msg):
        self.warnings.append((page, msg))


def concept_ids():
    return {p.stem.split(" — ")[0] for p in CONCEPTS.glob("*.md")}


def parse_questions(text):
    out = []
    for block in re.split(r"(?m)^#### ", text)[1:]:
        m = re.match(r"Q(\d+)", block)
        if not m:
            continue
        meta = re.search(r"<!--(.*?)-->", block)
        mt = meta.group(1) if meta else ""
        out.append({
            "n": int(m.group(1)),
            "concept": (re.search(r"concept:\s*([A-Z0-9]+-C\d+)", mt) or [None, None])[1],
            "type": (re.search(r"type:\s*([a-z-]+)", mt) or [None, None])[1],
            "has_meta": bool(meta),
            "has_answer_line": "**A:**" in block,
            "block": block,
        })
    return out


def parse_key(text):
    key = {}
    m = re.search(r"> \[!danger\]-[^\n]*\n((?:>.*\n?)*)", text)
    if not m:
        return key, False
    cur = None
    for raw in m.group(1).split("\n"):
        line = re.sub(r"^>\s?", "", raw)
        h = re.match(r"\*\*Q(\d+)\.\*\*\s*(.*)$", line)
        if h:
            cur = int(h.group(1))
            key[cur] = {"first": h.group(2).strip(), "accepted": None, "rubric": None, "extra": []}
        elif cur is not None and line.strip():
            if line.startswith("*Also accepted:*"):
                key[cur]["accepted"] = line[len("*Also accepted:*"):].strip()
            elif line.startswith("*Rubric"):
                key[cur]["rubric"] = line
            else:
                key[cur]["extra"].append(line)
    return key, True


def lint(path, rep, ids):
    name = path.stem
    text = path.read_text(encoding="utf-8")
    if "type: school-test" not in text.split("---")[1 if text.startswith("---") else 0]:
        return

    # `status:` and `attempts:` moved to Machine/School/progress-<user>.json (spec-155) — they
    # no longer live in the test page's frontmatter, so they're not asserted here.
    fm = text.split("---")[1]
    for field in ("test_kind", "class", "domain", "questions", "pass_pct"):
        if not re.search(rf"(?m)^{field}:", fm):
            rep.err(name, f"frontmatter missing `{field}:`")

    qs = parse_questions(text)
    key, has_key = parse_key(text)

    # ---- structure ----
    if not has_key:
        rep.err(name, "no `> [!danger]- 🔒 Answer key` block — grading has nothing to mark against")
    if "## ✅ End of questions" not in text:
        rep.err(name, "missing `## ✅ End of questions` — the last answer span runs into the key")
    if not text.rstrip().endswith("## ✅ End of test"):
        rep.err(name, "page must end with `## ✅ End of test`")
    if "```school-test" in text:
        rep.warn(name, "stale ```school-test fence — the grade button was removed 2026-08-10")

    cmd = re.search(r"```text\n(/school grade [^\n]+)\n```", text)
    if not cmd:
        rep.err(name, "no copyable `/school grade …` command in a ```text block")
    elif cmd.group(1).strip() != f"/school grade {name}":
        rep.err(name, f"grade command targets `{cmd.group(1).split('grade ',1)[1]}` but the page is `{name}`")

    declared = re.search(r"(?m)^questions:\s*(\d+)", fm)
    if declared and int(declared.group(1)) != len(qs):
        rep.err(name, f"frontmatter says {declared.group(1)} questions, page has {len(qs)}")

    nums = [q["n"] for q in qs]
    if nums != list(range(1, len(qs) + 1)):
        rep.err(name, f"question numbering not contiguous from 1: {nums}")

    # ---- per question ----
    for q in qs:
        tag = f"Q{q['n']}"
        if not q["has_meta"]:
            rep.err(name, f"{tag}: no `<!-- concept: … · type: … -->` comment")
            continue
        if not q["concept"]:
            rep.err(name, f"{tag}: metadata has no concept ID")
        elif q["concept"] not in ids:
            rep.err(name, f"{tag}: concept `{q['concept']}` does not resolve to a concept note")
        if q["type"] not in ("objective", "free-text"):
            rep.err(name, f"{tag}: type is `{q['type']}` — must be objective or free-text")
        if not q["has_answer_line"]:
            rep.err(name, f"{tag}: no `**A:**` line")
        if BRANDS.search(q["block"]):
            rep.err(name, f"{tag}: names a plugin or brand — {BRANDS.search(q['block']).group(0)}")
        if NOTATION.search(q["block"]):
            rep.err(name, f"{tag}: appears to require reading notation or an image")

        k = key.get(q["n"])
        if not k:
            rep.err(name, f"{tag}: no matching `**Q{q['n']}.**` entry in the answer key")
            continue

        if not k["first"]:
            rep.err(name, f"{tag}: key entry has an empty first line")
        elif len(k["first"]) > TERSE_MAX:
            rep.warn(name, f"{tag}: key line 1 is {len(k['first'])} chars — the canonical answer "
                           f"should be terse; move the explanation to the next line "
                           f"(\"{k['first'][:60]}…\")")

        if q["type"] == "free-text":
            if not k["rubric"]:
                rep.err(name, f"{tag}: free-text with no `*Rubric (5):*` line")
            else:
                # Strip the `*Rubric (5):*` prefix first — that 5 is the total, not a weight.
                weights = re.sub(r"^\*Rubric[^:]*:\*", "", k["rubric"])
                pts = [float(x) for x in re.findall(r"\((\d+(?:\.\d+)?)\)", weights)]
                if pts and abs(sum(pts) - 5) > 0.01:
                    rep.err(name, f"{tag}: rubric weights sum to {sum(pts):g}, must be 5")
        elif k["rubric"]:
            rep.warn(name, f"{tag}: objective question carries a rubric — rubrics are free-text only")

        if k["accepted"] and "·" not in k["accepted"] and "," in k["accepted"]:
            rep.warn(name, f"{tag}: `*Also accepted:*` separates with commas — use ` · `, "
                           f"since a comma inside a variant splits it into a wrong fragment")

    # ---- stray content between the last answer and the questions-end marker ----
    end = text.find("## ✅ End of questions")
    last_a = text.rfind("**A:**", 0, end if end != -1 else len(text))
    tail = None
    if last_a != -1 and end != -1:
        seg = text[text.find("\n", last_a) + 1:end]
        tail = type("M", (), {"group": lambda self, _i, s=seg: s})()
    if tail:
        stray = [l for l in tail.group(1).split("\n")
                 if l.strip() and not re.match(r"^> \[!(?:success|failure|note|abstract)\]", l)
                 and not l.startswith("> ") and l.strip() != "---"]
        if stray:
            rep.warn(name, f"content sits between the last answer and `## End of questions` "
                           f"— it will be captured as that answer: \"{stray[0][:60]}…\"")

    orphan = set(key) - set(nums)
    if orphan:
        rep.err(name, f"answer key has entries for questions that don't exist: {sorted(orphan)}")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--path", help="a single page or a folder")
    ap.add_argument("--quiet", action="store_true", help="errors only")
    args = ap.parse_args()

    root = Path(args.path) if args.path else TESTS
    if not root.is_absolute():
        root = VAULT / root
    pages = [root] if root.is_file() else sorted(root.rglob("*.md"))

    rep = Report()
    ids = concept_ids()
    for p in pages:
        lint(p, rep, ids)

    if rep.errors:
        print(f"ERRORS ({len(rep.errors)})")
        for page, msg in rep.errors:
            print(f"  ✗ {page} — {msg}")
        print()
    if rep.warnings and not args.quiet:
        print(f"WARNINGS ({len(rep.warnings)})")
        for page, msg in rep.warnings:
            print(f"  ! {page} — {msg}")
        print()
    if not rep.errors and not rep.warnings:
        print(f"school-test-lint: {len(pages)} page(s), clean")
    elif not rep.errors:
        print(f"school-test-lint: {len(pages)} page(s), no errors, {len(rep.warnings)} warning(s)")
    return 1 if rep.errors else 0


if __name__ == "__main__":
    sys.exit(main())
