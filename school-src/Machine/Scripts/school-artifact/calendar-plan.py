#!/usr/bin/env python3
"""Reconcile the school's term schedule onto a Google Calendar — the PLANNING half.

    python3 calendar-plan.py <progress.json>          # print the plan as JSON
    python3 calendar-plan.py <progress.json> --record <results.json>

WHY THIS IS TWO HALVES. Google Calendar is reachable only through an MCP tool, which a script
cannot call — only a live Claude session can. So this script computes WHAT should change and
the session executes it, then hands the results back with --record. The split keeps the hard
part (deciding) testable and the easy part (three API calls) where the credentials are.

WHY IT READS THE RENDERED PAGE. The schedule is derived, not stored: `schedule()` in app.js
recomputes it from what is enrolled, the three lane paces, each course's `lessons_per_week`
cap, and the semester start. Re-implementing that here would be a SECOND scheduler, free to
disagree with the first the moment either changes — and the disagreement would show up as
calendar events on wrong days, which is the least debuggable place for it. So this renders the
page headlessly and reads the timeline back out, exactly as lane-assert.py and cap-assert.py
already do. One scheduler, one truth.

That is only possible because the timeline is machine-readable: `.tl-d` carries
`data-date="YYYY-MM-DD"` and each lesson chip carries `data-course` and `data-lesson-n`.
`data-lesson-n`, not `data-lesson` — the bare name is a live click contract bound to
completeLesson(), and using it here would have made every timeline chip try to turn a lesson
in. Do not "simplify" that back.

THE MAPPING IS VAULT-OWNED. `calendar` in progress-<user>.json maps "<course>:<lesson>" to the
event id this created. sync.py deliberately does NOT read that section from the page: the page
has no idea calendars exist, so reading it from there would return empty every time, orphan
every event, and create a fresh duplicate set on the next run while the old ones stayed
forever.

ONE-WAY, BY DECISION. The vault is the source of truth; the calendar is a projection. Anything
edited on the calendar is overwritten. Nate chose this (2026-08-21) over treating calendar
edits as input, which is a much larger build.
"""
import json, pathlib, re, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SCHOOL = ROOT / "Machine" / "School"

MARK = "hyperion-school"          # stamped in every event we own, so a stray one is identifiable
# PATCH-116 — Nate: "on gmail events i want some sort of signifier that its a music school event.
# either with an emojoe or 'school'". The MARK above is in the DESCRIPTION, which you only see once
# an event is opened — useless in a month grid where a school lesson sits next to everything else in
# his week. This is the signifier that rides on the SUMMARY, where it is visible at a glance.
# Emoji rather than the word: it costs one character instead of eight in a cell that truncates
# early, and it reads as a category mark rather than as part of the lesson's own title.
SCHOOL_TAG = "🎓"


def user() -> str:
    f = SCHOOL / "local-user.json"
    return (json.loads(f.read_text(encoding="utf-8")).get("user") or "nate") if f.exists() else "nate"


def calendar_cfg(u: str) -> dict:
    cfg = json.loads((SCHOOL / "calendar.json").read_text(encoding="utf-8"))
    c = cfg.get(u)
    if not c or not c.get("calendar_id"):
        sys.exit(f"no calendar configured for {u} in Machine/School/calendar.json")
    # Disabled is a normal state, not a failure: /school sync calls this as a step and a non-zero
    # exit there reads as "the sync broke". Say so on stdout and leave with 0.
    if c.get("enabled") is False:
        print(f"calendar integration is disabled for {u} "
              f"(enabled: false in Machine/School/calendar.json) — nothing planned. "
              f"Existing events are left as they are; set it back to true to reconcile them.")
        sys.exit(0)
    # A reconcile that deletes must never be able to reach a personal calendar.
    if "@group.calendar.google.com" not in c["calendar_id"]:
        sys.exit("calendar_id is not a dedicated calendar — refusing to run a deleting "
                 "reconcile against a primary calendar")
    return c


def rendered_plan(progress_path: str) -> list:
    """Every lesson the timeline drew, with the date it is due by."""
    body = (HERE / "school.html").read_text(encoding="utf-8")
    head, rest = body.split('id="progress">', 1)
    _old, tail = rest.split("</script>", 1)
    body = head + 'id="progress">' + pathlib.Path(progress_path).read_text(encoding="utf-8") + "</script>" + tail

    probe = """
<script>
addEventListener('load',()=>setTimeout(()=>{
  var out=[];
  var today=(document.querySelector('.tl-d.now')||{}).getAttribute
            ? document.querySelector('.tl-d.now').getAttribute('data-date') : null;
  /* Lessons (.tl-l) and course-start markers ([data-course-start]) only — Nate: "only sync
     over the lesson and course items no homework or quizzes or tests." Those three all draw
     as `.tl-q` (see homeworkItem/quizItem/testItem in app.js), so this selector already
     excludes them by construction; nothing needs to filter them back out. */
  [].slice.call(document.querySelectorAll('.tl-l,[data-course-start]')).forEach(function(c){
    var course=c.getAttribute('data-course');
    var isStart=c.hasAttribute('data-course-start');
    var n=c.getAttribute('data-lesson-n');
    if(!course) return;
    if(!isStart && !n) return;
    var day=c.closest('.tl-d');
    var date=day?day.getAttribute('data-date'):null, overdue=false;
    if(!date){
      /* The Overdue band has no day row and so no date. Skipping it would let the calendar
         lie by omission about work already owed, so an overdue lesson is placed on TODAY and
         labelled — it follows you forward each sync until it is turned in, which is the
         honest projection of "you still owe this". A course-start marker can never be
         overdue — courseStarts() only ever anchors one on or after today — so there is no
         equivalent fallback for it; it simply has nothing to record here. */
      if(isStart) return;
      if(!c.closest('.tl-late')) return;
      if(!today) return;
      date=today; overdue=true;
    }
    if(isStart){
      out.push({course:course, lesson:'start', date:date, overdue:false,
                courseShort:c.getAttribute('data-course-short')||'',
                classShort:c.getAttribute('data-class-short')||''});
    } else {
      var nm=c.querySelector('.tl-n'), st=c.querySelector('.tl-s');
      out.push({course:course, lesson:n, date:date, overdue:overdue,
                name:(nm?nm.textContent:'').trim(), title:(st?st.textContent:'').trim()});
    }
  });
  var d=document.createElement('div');d.id='plan';
  d.textContent='PLAN::'+JSON.stringify(out);document.body.appendChild(d);
},1400));
</script>"""
    out = ('<!doctype html><html lang="en"><head><meta charset="utf-8">' + probe +
           '</head><body>' + body + '</body></html>')
    (HERE / "test-calendar.html").write_text(out, encoding="utf-8")
    dom = subprocess.run(
        ["google-chrome", "--headless", "--disable-gpu", "--no-sandbox",
         "--virtual-time-budget=12000", "--dump-dom", f"file://{HERE}/test-calendar.html"],
        capture_output=True, text=True).stdout
    m = re.search(r"PLAN::(\[.*?\])</div>", dom, re.S)
    if not m:
        sys.exit("the page did not finish rendering — no plan extracted")
    return json.loads(m.group(1))


def main():
    u = user()
    cfg = calendar_cfg(u)
    prog_path = sys.argv[1]
    # argv[1] says what to RENDER; the mapping always comes from the live progress file, which is
    # the only place event ids are written. Reading it from argv[1] instead would make a fixture
    # look unmapped, re-create every event, and leave the originals orphaned on the calendar.
    live = SCHOOL / f"progress-{u}.json"
    mapped = (json.loads(live.read_text(encoding="utf-8")).get("calendar") or {}) if live.exists() else {}

    if "--record" in sys.argv:
        results = json.loads(pathlib.Path(sys.argv[sys.argv.index("--record") + 1]).read_text(encoding="utf-8"))
        # Re-read the REAL progress file as the base. argv[1] is whatever the plan was computed
        # against and is routinely a fixture; writing THAT back would replace live progress with
        # a stale copy — every completed lesson, quiz rating and turn-in in the gap silently lost.
        # Recording an event id must touch exactly one section and nothing else.
        target = SCHOOL / f"progress-{u}.json"
        prog = json.loads(target.read_text(encoding="utf-8"))
        mapped = prog.get("calendar") or {}
        for key, ev in (results.get("upsert") or {}).items():
            mapped[key] = {"event_id": ev["event_id"], "date": ev["date"]}
        for key in (results.get("removed") or []):
            mapped.pop(key, None)
        prog["calendar"] = dict(sorted(mapped.items()))
        target.write_text(json.dumps(prog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"recorded: {len(mapped)} event(s) mapped in {target.name}")
        return

    want = {f'{l["course"]}:{l["lesson"]}': l for l in rendered_plan(prog_path)}
    create, update, delete = [], [], []
    for key, l in sorted(want.items()):
        if l["lesson"] == "start":
            # Nate: "include class in event for when courses arent started yet." A rough
            # projection (courseStarts()'s own "roughly" — see its title-attribute wording on
            # the page), so the summary and description say so rather than reading as a firm
            # commitment the way a lesson's own due date is.
            title = f'{SCHOOL_TAG} Starts — {l["courseShort"]}' + (f' ({l["classShort"]})' if l["classShort"] else '')
            desc = (f'{MARK} · {key}\nProjected start of Course {l["course"]} — a rough estimate, '
                    f'not a fixed date. Managed by /school sync — edits here are overwritten.')
        else:
            title = f'{l["name"]} — {l["title"]}'.strip(" —")
            if l.get("overdue"):
                title = "Overdue · " + title
            # The tag goes on LAST so it always leads, overdue or not.
            title = f'{SCHOOL_TAG} {title}' 
            desc = (f'{MARK} · {key}\nLesson due by this day. Managed by /school sync — '
                    f'edits here are overwritten.')
        row = {"key": key, "date": l["date"], "summary": title, "description": desc}
        if key not in mapped:
            create.append(row)
        # PATCH-116 — the DATE is no longer the only thing worth pushing. An event already on the
        # calendar keeps whatever summary it was created with, so a title change (the 🎓 tag, a
        # renamed lesson, an overdue mark clearing) would never reach Google without this: the
        # reconcile would see a matching date and call it settled. `summary` is recorded in the
        # mapping from now on; an entry that predates this has none, which reads as "differs" and
        # updates exactly once, after which every entry carries one and it settles.
        elif mapped[key].get("date") != l["date"] or mapped[key].get("summary") != title:
            update.append({**row, "event_id": mapped[key]["event_id"],
                           "was": mapped[key].get("date"),
                           "was_summary": mapped[key].get("summary")})
    for key, ev in sorted(mapped.items()):
        if key not in want:
            delete.append({"key": key, "event_id": ev["event_id"], "date": ev.get("date")})

    print(json.dumps({
        "calendar_id": cfg["calendar_id"], "timezone": cfg["timezone"],
        "summary": {"planned": len(want), "mapped": len(mapped),
                    "create": len(create), "update": len(update), "delete": len(delete)},
        "create": create, "update": update, "delete": delete,
    }, indent=2))


if __name__ == "__main__":
    main()
