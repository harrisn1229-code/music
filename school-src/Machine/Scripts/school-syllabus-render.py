#!/usr/bin/env python3
"""Render the Music School semester syllabus to a printable HTML page.

Reads the durable plan at Machine/School/syllabus.json (relative to the vault root, resolved
from this file's location) and writes Machine/Scripts/school-syllabus.html beside itself.
`/school replan` rewrites syllabus.json; re-running this script re-renders from it.

    python3 Machine/Scripts/school-syllabus-render.py
    # then, for the PDF (verified 2026-08-05 — Chrome needs an absolute file:// URL,
    # and --no-sandbox because it runs unprivileged here):
    google-chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
      --print-to-pdf="$PWD/00 Human/20 Music/School & Content/Curriculum/Syllabus — Fall 2026.pdf" \
      "file://$PWD/Machine/Scripts/school-syllabus.html"

No /tmp dependency: it runs from a clean checkout. It used to load its data from a
session-scoped scratchpad path, which meant the syllabus could not be regenerated at all
once that session ended (fixed in spec-146 Phase 3).
"""
import json, pathlib, html, sys

VAULT = pathlib.Path(__file__).resolve().parent.parent.parent
DATA = VAULT / "Machine" / "School" / "syllabus.json"
OUT = VAULT / "Machine" / "Scripts" / "school-syllabus.html"

if not DATA.exists():
    sys.exit(f"No syllabus data at {DATA} — /school replan regenerates it.")

D = json.loads(DATA.read_text(encoding="utf-8"))
SEM = D["semester"]
C, ROWS = D["courses"], D["rows"]
NAME = lambda cid: C[cid]["name"].split("—",1)[1].strip()
# spec-147 Phase 2: every course carries a `class`; the week table names the class its lessons
# belong to so the printed page reads like a semester rather than a list of course IDs.
CLASSES = {k["id"]: k for k in D.get("classes", [])}
CLASS_OF = lambda cid: CLASSES.get(str(C[cid].get("class")), {})
CLASS_SHORT = lambda cid: (CLASS_OF(cid).get("name","").split("—",1)[-1].strip() or "—")
def dm(iso):
    y,m,d = iso.split("-"); mm = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()[int(m)-1]
    return f"{mm} {int(d)}"

# spec-172 Phase 3b: THREE track arrays, not two. `instrument` (courses 19-26) is dealt from
# its own queue at its own pace and lands in its own key on every row. A row written before
# Phase 3b has no `instrument` key, hence the .get() — the old plan still renders.
TRACKS = ("theory", "prod", "instrument")
def lessons_in(r):
    return [pair for t in TRACKS for pair in r.get(t, [])]

# lesson test milestones: the week a course's last lesson is scheduled
last = {}
for r in ROWS:
    for cid,u in lessons_in(r):
        if u == C[cid]["lessons"]: last[cid] = r["week"]

rows_html = ""
for r in ROWS:
    tests = [cid for cid,w in last.items() if w == r["week"]]
    cell = lambda key: "<br>".join(
        f"<b>{C[c]['strands']}</b> lesson {u}" for c,u in r.get(key, [])) or "<i>—</i>"
    t, p, n = cell("theory"), cell("prod"), cell("instrument")
    klasses = []
    for c,_u in lessons_in(r):
        nm = CLASS_SHORT(c)
        if nm != "—" and nm not in klasses: klasses.append(nm)
    kcell = "<br>".join(f"<span class='kls'>{html.escape(k)}</span>" for k in klasses) or "<i>—</i>"
    milestone = "".join(f"<span class='ms'>✎ /school test {c}</span>" for c in sorted(tests)) or ""
    rows_html += f"""<tr>
      <td class='wk'><b>{r['week']}</b><span>{dm(r['start'])}</span></td>
      <td>{t}</td><td>{p}</td><td>{n}</td><td class='klsc'>{kcell}</td><td class='msc'>{milestone}</td></tr>"""

cat = ""
# spec-172 Phase 3b: the dot was `"th" if theory else "pr"`, which painted all eight
# instrument courses production-green. Key off the course's own domain, three ways.
DOT = {"theory": "th", "production": "pr", "instrument": "in"}
for cid in D["theory"] + D["prod"] + D.get("instrument", []):
    c = C[cid]
    dot = DOT.get(c["domain"], "th")
    cat += f"""<tr><td class='cid'>{cid}</td><td><span class='dot {dot}'></span>{html.escape(NAME(cid))}</td>
      <td class='sm'>{c['strands']}</td><td class='num'>{c['lessons']}</td><td class='num'>{c['concepts']}</td>
      <td class='sm'>{html.escape(CLASS_SHORT(cid))}</td><td class='num tgt'>{c['target']}%</td></tr>"""

# Headline counts describe the SCHEDULED plan only — any course absent from the theory/prod arrays
# is held out, and counting it would print a plan bigger than the table below it. (Empty as of
# 2026-08-06: DRM/ARR/BAS were held out on the morning pass, then scheduled at assumed-Novice.)
SCHED = D["theory"] + D["prod"] + D.get("instrument", [])
n_courses = len(SCHED)
n_lessons = sum(len(lessons_in(r)) for r in ROWS)
n_concepts = sum(C[cid]["concepts"] for cid in SCHED)
per_week = round(n_lessons / max(1, SEM["weeks"]))

held = [cid for cid in C if cid not in SCHED]
held_html = ""
if held:
    items = ", ".join(f"<b>{C[c]['strands']}</b> ({C[c]['lessons']}u)" for c in sorted(held))
    held_html = (f"<p class='note'><b>Held out of this semester:</b> {items} — written and ready, but "
                 f"their strands postdate both placements, so there is no measured score to set a "
                 f"target from. They enter at the next replan, after a re-placement.</p>")

HTML = f"""<style>
@page {{ size: A4; margin: 14mm 13mm; }}
* {{ box-sizing: border-box; }}
body {{ font: 10.5px/1.45 -apple-system,"Segoe UI",Helvetica,Arial,sans-serif; color:#1a1a1a; margin:0; }}
h1 {{ font-size: 23px; margin:0 0 2px; letter-spacing:-.4px; }}
.sub {{ color:#666; font-size:11px; margin-bottom:14px; }}
h2 {{ font-size:12.5px; margin:19px 0 7px; padding-bottom:4px; border-bottom:1.5px solid #1a1a1a;
     text-transform:uppercase; letter-spacing:.7px; }}
table {{ width:100%; border-collapse:collapse; }}
th {{ text-align:left; font-size:8.5px; text-transform:uppercase; letter-spacing:.5px; color:#777;
      border-bottom:1px solid #ccc; padding:0 6px 4px; font-weight:600; }}
td {{ padding:5px 6px; border-bottom:1px solid #eee; vertical-align:top; }}
.wk {{ width:52px; }} .wk b {{ display:block; font-size:13px; }}
.wk span {{ color:#888; font-size:8.5px; }}
.msc {{ width:120px; }}
.ms {{ display:block; font-family:ui-monospace,Menlo,monospace; font-size:8px; background:#1a1a1a;
       color:#fff; padding:2px 5px; border-radius:2px; margin-bottom:2px; }}
.grid {{ display:flex; gap:9px; margin-bottom:4px; }}
.box {{ flex:1; border:1px solid #ddd; border-radius:4px; padding:8px 9px; }}
.box b {{ display:block; font-size:17px; }} .box span {{ color:#777; font-size:8.5px; text-transform:uppercase; letter-spacing:.4px; }}
.cid {{ font-family:ui-monospace,Menlo,monospace; color:#999; width:26px; }}
.sm {{ color:#777; font-size:9px; }} .num {{ text-align:right; width:42px; }}
.tgt {{ font-weight:600; }}
.asm {{ color:#a16207; font-style:italic; font-size:8.5px; }}
.dot {{ display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:6px; }}
.th {{ background:#2563eb; }} .pr {{ background:#059669; }} .in {{ background:#b91c4a; }}
.day {{ border-left:2.5px solid #1a1a1a; padding:2px 0 2px 11px; margin:7px 0; }}
.day b {{ font-size:10.5px; }} .day span {{ color:#666; }}
.ex {{ background:#f7f7f5; border-radius:4px; padding:9px 11px; font-size:9.5px; margin-top:6px; }}
.ex code {{ font-family:ui-monospace,Menlo,monospace; font-size:9px; }}
.k {{ display:inline-block; width:44px; color:#888; font-size:8px; text-transform:uppercase; letter-spacing:.5px; }}
.two {{ display:flex; gap:16px; }} .two > div {{ flex:1; }}
p {{ margin:5px 0; }} .note {{ color:#666; font-size:9.5px; }}
.pb {{ page-break-before: always; }}
</style>

<h1>Music School — {html.escape(SEM['name'])}</h1>
<div class='sub'>{SEM['weeks']}-week semester · {dm(SEM['start'])} – {dm(SEM['end'])}, {SEM['end'][:4]} · built from the placements of Aug 2–3</div>

<div class='grid'>
  <div class='box'><b>{n_courses}</b><span>courses</span></div>
  <div class='box'><b>{n_lessons}</b><span>lessons</span></div>
  <div class='box'><b>{n_concepts}</b><span>concepts</span></div>
  <div class='box'><b>~{per_week}</b><span>lessons / week</span></div>
  <div class='box'><b>3</b><span>tracks in parallel</span></div>
</div>
<p class='note'>Three tracks run at once — <b style='color:#2563eb'>theory</b> ~{SEM.get('theory_lessons_per_week', 2)} lessons/week,
<b style='color:#059669'>production</b> ~{SEM.get('production_lessons_per_week', 1)}/week and
<b style='color:#b91c4a'>instrument</b> ~{SEM.get('instrument_lessons_per_week', 3)}/week. Theory and production share
<code>taught_limit: 2</code>; instrument has its own <code>instrument_limit</code> and never takes a taught slot
(spec-172 Phase 3b). Standing daily drills sit outside all three.</p>

<h2>The daily rhythm</h2>
<p class='note'>One command: <code>/today</code>. It serves everything below into the homework block. You never pick.</p>
<div class='day'><b>🎓 Concept review — ~2 min</b><br><span>3 spaced-repetition cards due today. Rate each ⚡ automatic / 🙂 solid / 😬 rusty / 💀 forgot.</span></div>
<div class='day'><b>🎯 Lesson study — ~20 min</b><br><span>Read the lesson, do its drill. About 3 of these a week.</span></div>
<div class='day'><b>🎸 Applied task — ~15 min</b><br><span>Play what the lesson taught. One per lesson, {n_lessons} across the semester.</span></div>
<div class='day'><b>🎵 Song &amp; technique — remainder</b><br><span>The existing practice lanes, now feeding the school rather than running beside it.</span></div>

<h2>How a lesson works</h2>
<div class='ex'>
  <b>Lesson 2 — Order of sharps and flats</b><br><br>
  <span class='k'>Read</span> Circle of Fifths → <i>Sharp/flat order mnemonic</i>; Key Signatures → <i>The pattern</i><br>
  <span class='k'>Drill</span> Given 2, 3, 4, 5 sharps — name the key. Given 1–4 flats — name the key <i>and</i> list the flats.<br>
  <span class='k'>Apply</span> Play I–IV–V in E, A and B on guitar, naming each key's sharps aloud as you go.<br>
  <span class='k'>Then</span> Its 3 concepts enter spaced repetition and start appearing in the daily block.
</div>
<p class='note' style='margin-top:7px'>The <b>Apply</b> step is the new half. It routes to a song you're already learning, a resource
in the vault, or something sourced online that targets the concept. Ad-hoc interest — “I want to learn this song” — gets absorbed
here rather than pulling you off the plan.</p>

<h2>Grading</h2>
<div class='two'>
  <div>
    <p><b>Per concept</b> — every review is graded ⚡ / 🙂 / 😬 / 💀. The interval grows on a good answer and collapses on a bad one, so weak material comes back faster.</p>
  </div>
  <div>
    <p><b>Per course</b> — a lesson test when all lessons are done. Pass at the course's target (80% for most, <b>85%</b> where you already placed Proficient). Fail re-seeds only the missed concepts.</p>
  </div>
</div>

<div class='pb'></div>
<h2>The {SEM['weeks']} weeks</h2>
<table>
<tr><th>Week</th><th style='color:#2563eb'>Theory track</th><th style='color:#059669'>Production track</th><th style='color:#b91c4a'>Instrument track</th><th>Class</th><th>Milestone</th></tr>
{rows_html}
</table>

<h2>Course catalogue</h2>
<table>
<tr><th></th><th>Course</th><th>Strand</th><th class='num'>Lessons</th><th class='num'>Concepts</th><th>Class</th><th class='num'>Target</th></tr>
{cat}
</table>
{held_html}
<p class='note' style='margin-top:9px'><b>Target</b> is the pass bar for the course's final. The order is
dependency-driven: <b>FND</b> comes first because every other course assumes its derivation rules, and
<b>HAR</b> follows because POP, BLU and MEL are all applications of it.</p>

<h2>Commands</h2>
<div class='ex'>
<span class='k'>Daily</span> <code>/today</code> — serves everything. This is the only one you need.<br>
<span class='k'>Study</span> <code>/school lesson &lt;id&gt; &lt;n&gt;</code> — mark a lesson done; releases its concepts into rotation.<br>
<span class='k'>Test</span> <code>/school test &lt;id&gt;</code> — the lesson test when a course's lessons are complete.<br>
<span class='k'>Status</span> <code>/school</code> — where every course stands.
</div>
"""
OUT.write_text(HTML, encoding="utf-8")
print(f"html written → {OUT.relative_to(VAULT)}")
