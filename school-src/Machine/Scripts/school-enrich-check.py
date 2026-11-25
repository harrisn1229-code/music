#!/usr/bin/env python3
"""
school-enrich-check.py — after a /music-enrich run, say what the school still needs.

    python3 Machine/Scripts/school-enrich-check.py [--since 2026-08-22] [--json]

Enrichment writes into `20 Music/` freely. Some of what it writes is invisible to the school
until a second thing happens, and that second thing is easy to forget — on 2026-08-22 a run
produced two drills and eight routines, and none of it reached a lesson or the published page
because nobody ran `/school sync-drills` or rebuilt the artifact afterwards.

This script is that check, done mechanically. It reports four things and exits non-zero if any
of them has work outstanding, so `/music-enrich` Step 7.5 can gate on it instead of relying on
someone remembering:

  1. DRILLS/ROUTINES UNREGISTERED   — a drill or routine note missing from Drill Index.md
  2. ROUTINES UNWIRED              — a Practice Method/ note with no reinforces:/classes:,
                                     minus the ones that are deliberately methodology
  3. READING TARGETS NEWER THAN THE BUILD — a note a lesson's **Read** line inlines that has been
                                     edited since school.html was built: the page is serving stale text
  4. ARTIFACT STALE                — school.html older than any note the page actually renders
                                     (curriculum notes + reading targets — NOT all of School & Content)

It writes NOTHING. Every finding is something a human or the workflow then acts on.
"""
import argparse, datetime, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
SC = ROOT / "00 Human/20 Music/School & Content"
CUR = SC / "Curriculum"
ART = ROOT / "Machine/Scripts/school-artifact/school.html"

DRILL_DIRS = ["Guitar/Drills", "Piano/Drills", "Bass/Drills"]
ROUTINE_DIRS = ["Guitar/Practice Method", "Bass/Practice Method", "Theory/Practice Method"]

# A routine that implements a concept carries reinforces:/classes:. A *methodology* note — how to
# practise, not what to practise — correctly carries neither, and flagging it forever would train
# everyone to ignore this report. The marker is explicit so the distinction is declared by the note
# rather than guessed at by a regex over its title.
METHODOLOGY_MARK = "practice_methodology: true"

WIKI = re.compile(r"\[\[([^\[\]|]+)(?:\|[^\[\]]*)?\]\]")


def stems(dirs):
    out = []
    for d in dirs:
        p = SC / d
        if p.is_dir():
            out += [f for f in p.glob("*.md")]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", help="ISO date; only consider notes modified on/after it")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    cutoff = None
    if a.since:
        cutoff = datetime.datetime.fromisoformat(a.since).timestamp()

    def recent(p):
        return cutoff is None or p.stat().st_mtime >= cutoff

    index_txt = (CUR / "Drill Index.md").read_text() if (CUR / "Drill Index.md").exists() else ""
    drills, routines = stems(DRILL_DIRS), stems(ROUTINE_DIRS)

    # 1 — every drill and every WIRED routine belongs in the index. Methodology notes do not:
    # the index is a practice surface, not a bibliography.
    unregistered = []
    for p in drills + routines:
        t = p.read_text()
        wired = re.search(r"^(reinforces|classes):\s*\[?[^\]\s]", t, re.M)
        if p in routines and not wired:
            continue
        if p.stem not in index_txt:
            unregistered.append(str(p.relative_to(ROOT)))

    # 2 — a routine with no wiring and no methodology marker is genuinely undecided.
    unwired = []
    for p in routines:
        t = p.read_text()
        if re.search(r"^(reinforces|classes):\s*\[?[^\]\s]", t, re.M):
            continue
        if METHODOLOGY_MARK in t:
            continue
        unwired.append(str(p.relative_to(ROOT)))

    # 3 — which notes do lesson **Read** lines actually pull in? A touched one means the page is
    # serving text older than the vault.
    # Matched CASE-INSENSITIVELY, because that is how both consumers resolve a link: Obsidian
    # resolves wikilinks without regard to case, and build.py's own READ_INDEX is keyed on
    # `base.strip().lower()`. A case-sensitive match here reports links that work perfectly
    # everywhere else as broken — `[[INTERVALS]]` → `Intervals.md` was flagged for exactly that
    # reason on 2026-08-23 and cost a round trip chasing a bug that did not exist.
    targets = set()
    for c in (CUR / "Courses").glob("*.md"):
        for line in c.read_text().split("\n"):
            if "**Read**" in line or line.strip().startswith("- [ ] [["):
                for m in WIKI.finditer(line):
                    targets.add(m.group(1).split("#")[0].split("/")[-1].strip().lower())

    # A reading target counts as "touched" only if it is newer than the BUILT BUNDLE — that is what
    # actually means the page is serving stale text. Measuring against --since instead listed notes
    # that had already been rebuilt, so the report stayed loud after the work was done. --since still
    # narrows it to one run's worth when you want that.
    art_mtime = ART.stat().st_mtime if ART.exists() else 0
    touched = []
    for p in (ROOT / "00 Human/20 Music").rglob("*.md"):
        if "z Archive" in str(p) or not recent(p):
            continue
        if p.stem.lower() in targets and p.stat().st_mtime > art_mtime:
            touched.append(p.stem)

    # 4 — is the built bundle older than anything it RENDERS?
    #
    # Scoped deliberately to the page's actual inputs: the curriculum notes plus every note a
    # lesson **Read** line inlines. Comparing against all of `School & Content/` was the first
    # cut and it was useless — editing any of ~1,800 notes turned the gate red, including notes
    # the page never renders, so it reported "stale" permanently and would have been ignored
    # within a week. A gate that is always red is not a gate.
    stale, newest = False, None
    if ART.exists():
        art_m = ART.stat().st_mtime
        rendered = list((CUR).rglob("*.md"))
        for p in (ROOT / "00 Human/20 Music").rglob("*.md"):
            if "z Archive" not in str(p) and p.stem.lower() in targets:
                rendered.append(p)
        for p in rendered:
            if p.stat().st_mtime > art_m:
                stale = True
                if newest is None or p.stat().st_mtime > newest[1]:
                    newest = (str(p.relative_to(ROOT)), p.stat().st_mtime)
    else:
        stale = True

    res = {
        "unregistered_in_drill_index": sorted(unregistered),
        "routines_unwired": sorted(unwired),
        "reading_targets_touched": sorted(set(touched)),
        "artifact_stale": stale,
        "artifact_stale_because": newest[0] if newest else None,
    }

    if a.json:
        print(json.dumps(res, indent=2))
    else:
        print("school-enrich-check\n" + "=" * 19)
        print(f"\n1. Unregistered in Drill Index ({len(res['unregistered_in_drill_index'])})")
        for x in res["unregistered_in_drill_index"]:
            print("   -", x)
        print(f"\n2. Routines with no reinforces:/classes: and no methodology marker "
              f"({len(res['routines_unwired'])})")
        for x in res["routines_unwired"]:
            print("   -", x)
        print("     → wire it, or mark it `practice_methodology: true` if it is advice, not an exercise")
        print(f"\n3. Reading targets newer than the build — page serving stale text for these "
              f"({len(res['reading_targets_touched'])})")
        for x in res["reading_targets_touched"]:
            print("   -", x)
        print(f"\n4. Artifact stale: {res['artifact_stale']}"
              + (f"  (newer: {res['artifact_stale_because']})" if newest else ""))
        print("\n" + "-" * 19)
        if any([res["unregistered_in_drill_index"], res["routines_unwired"],
                res["reading_targets_touched"], res["artifact_stale"]]):
            print("WORK OUTSTANDING — see /music-enrich Step 7.5")
        else:
            print("clean — the school is level with the notes")

    outstanding = any([res["unregistered_in_drill_index"], res["routines_unwired"],
                       res["reading_targets_touched"], res["artifact_stale"]])
    sys.exit(1 if outstanding else 0)


if __name__ == "__main__":
    main()
