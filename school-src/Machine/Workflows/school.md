---
type: workflow
status: active
trigger: /school
tags: [workflow, school, music, theory, assessment, learning]
---
> **In this repo the school is a standalone app, not an artifact page.** It is built into `docs/`
> and saves progress on each reader's device — see `CLAUDE.md` and `README.md` at the repo root.
> Everything below describes how the school itself works (enrolment, releases, quizzes, tests) and
> still applies. The parts about publishing an artifact, `/school sync` and
> `progress-<user>.json` describe the older single-file page (`build.py --artifact`).

# Workflow - /school

The **Music School** — a structured learning system layered over the vault's existing music knowledge (48 Theory notes, 10 Effects pages, 34 Techniques). The notes are the textbook; this is the syllabus, the testing and the schedule.

```
/school                    → status: enrolled courses, concepts due today
/school class              → list all eight classes with progress
/school class <n>          → open one: courses, lessons, the exam that closes it
/school class <n> enroll   → declare you're taking a class (does not enroll its courses)
/school class <n> unenroll → back to available — progress is kept, not wiped
/school course             → list courses; `course <id>` opens one and reports lesson progress
/school course <id> enroll   → move an available course to enrolled (respects courses.taught_limit) → releases Lesson 1
/school course <id> unenroll → back to available — progress is kept, not wiped
/school lesson <id> <n>      → manual fallback: lesson n done → releases lesson n+1's concepts, bumps lessons_complete
/school test <course> <lesson>  → take that lesson test IN CHAT, blind, then grade — a pass releases the next lesson automatically
/school final <course>        → the course final, in chat — a pass completes the course and seeds every concept to maintenance
/school midterm <domain> <n>  → a midterm, in chat
/school exam <domain>         → the domain final, in chat
/school grade <test-page>     → grade answers already typed into a test page
/school sync-drills           → re-read Drills/, refresh **Technique** lines in lessons
/school replan             → re-lay the remaining lessons, slide the end date, state the cost

Optional:
/school drill              → blind practice in chat, records nothing (the page is where ratings count)
/school artifact           → rebuild the published web study surface from the notes and re-publish it
/school sync               → pull progress back OUT of that page into progress-<user>.json
```

`/school enroll <id>` is a shorthand for either enroll command above — it resolves `<id>` against courses first, then classes, and does whichever matches. Prefer the explicit `course`/`class` form when you know which one you mean.

> [!info] No assessment layer
> Placements, results notes, answer keys, levels, `/school assess` and `/school grade` were **deleted 2026-08-09** (spec-147). This is a teaching system, not a diagnostic one. The ear-training WAVs in `School/Audio/` survive because they are *test* material.

## The vault surfaces are gone — retired 2026-08-20, deleted 2026-08-24

**The published web page is the school.** Coursework is read, worked and ticked on the page (`/school artifact`, Step 6) and nowhere else. Three vault surfaces were switched off on 2026-08-20:

| Surface | What it used to do | Now |
|---|---|---|
| `/today` Step 4.5 | Served tier 1 `### 🎓 Coursework` above the practice lanes, and offered a push/swap replan when the lesson was declined | Serves the practice lanes only |
| `/practice` | Gathered the week's lesson, its applied task and the day's concept dues; subtracted them off the top of the minute budget; auto-enrolled scheduled courses | Song dues, set dues, stale lanes and drills only — reads no school config, writes no school state |
| Command Center **Learning** card | Semester band, Coursework band and the Commands list | Practice half only — the school half was **deleted** 2026-08-24, along with the `SCHOOL_SURFACES_RETIRED` flag that had been hiding it. The card keeps its "Open the school" link |
| Plugin **School** view + enroll fences | A whole School pane (`SCHOOL_VIEW_TYPE`), plus ```` ```class-controls ```` / ```` ```course-controls ```` enroll-and-lesson fences on the class/course notes | **Deleted 2026-08-24.** So is the plugin's entire write path into `progress-<user>.json` |

**Everything else still works.** `/school`'s chat commands — `test`, `final`, `midterm`, `exam`, `replan`, `sync`, `artifact`, the class/course/lesson commands — are all live. The curriculum notes, `School Config.md`, `Machine/School/syllabus.json` and both progress files are untouched.

**The Obsidian half is not coming back, and it is no longer one flag away.** On 2026-08-24 the plugin's school UI and its write path were deleted outright, not hidden: the School view, its ribbon and command, the `class-controls` / `course-controls` fences, `mutateSchoolProgress` and every enroll / un-enroll / lesson / reset mutator. **Nothing in the plugin writes `Machine/School/progress-<user>.json` any more** — it is read-only there. The reason is not tidiness: the plugin dated a re-released quiz from `today` while the page dates it from the lesson plan, and a concurrent plugin write dropped a homework tick on 2026-08-24. One writer, one set of rules.

**`Machine/School/progress-<user>.json` is now a durability backup, not a feed.** `/school sync` (Step 6) still pulls the page's state home to it exactly as before — that is the off-page copy of a semester's work, and it is what a restored vault surface would read from. Nothing in the vault writes to it from a daily note any more, deliberately: a checkbox in a daily note bumping `lessons_complete` would fight the next sync. **Sync after any real session on the page**, since a republish overwrites the page's embedded state with the vault's copy.

> **How the backup actually happens (solved 2026-08-20).** A headless `claude -p` **cannot** fetch the
> page — `WebFetch` returns the unauthenticated Artifact landing shell with no
> `<script type="application/json" id="progress">` block, so any cron job built on fetching is dead on
> arrival (tested twice; see `Machine/School/sync.log`). The page hands the file over instead: **Sync to
> vault → Copy everything** puts the page's WHOLE state on the clipboard (homework, logged lessons,
> semester start — not the pruned preview beside it); paste it into `~/Downloads/school-<user>.json`.
>
> **It is Copy, not Download, and that is not a style choice (2026-08-20):** a page declaring the
> `downloads` capability **cannot be shared publicly**, and sharing is what makes the page reachable
> from Nate's other devices. Access beat one-click export. The page now declares `artifact` only.
> **Do not re-add `downloads` on a republish** — it would silently un-shareable the page. From there it is a plain local
> file needing no login, no network and no Claude:
>
> | Unit | What it does |
> |---|---|
> | `school-sync.path` | Fires the moment `~/Downloads/school-*.json` appears — usually within a second |
> | `school-sync.timer` | Daily catch-up at 07:52, `Persistent=true` so a machine that was off runs it on next boot |
> | `school-sync.service` | Runs `Machine/Scripts/school-import-download.sh` |
>
> The importer runs `sync.py`, archives the file to `Machine/School/imported/` (last 20 kept), and logs
> to `Machine/School/sync.log`. A failed file is renamed `.failed` so it stops retrying. Units live in
> `~/.config/systemd/user/`; `systemctl --user disable --now school-sync.path school-sync.timer` stops it.
> **An interactive Claude session can still fetch the page directly** — that path works and is what
> `/school sync` uses when asked in chat.

---

> [!info] Enrollment is opt-in (spec-156, 2026-08-12)
> Classes and courses default to `available` — nothing is enrolled until you say so. Enrolling a course releases Lesson 1's concepts automatically; passing a lesson test releases the next one. **Enroll on the page** (or with the chat commands above). There is no vault enrollment surface left: the Learning card's class browser and course rows, the standalone School view and the `class-controls` / `course-controls` fences were all deleted 2026-08-24.

**The load-bearing rule: a course is an ordered syllabus over notes that already exist.** Never write a course — or a test question — for material with no backing note. Author the note first, then the course. An empty course that links nothing looks like progress and teaches nothing. *(Verified 2026-08-12: all 147 concepts resolve to a note that exists.)*

## Paths

| What | Where |
|---|---|
| Hub | `00 Human/20 Music/School & Content/Curriculum/School.md` |
| Config | `00 Human/20 Music/School & Content/Curriculum/School Config.md` |
| Courses | `00 Human/20 Music/School & Content/Curriculum/Courses/Course NN — <Strand> <Title>.md` (`type: school-course`) |
| Concepts | `00 Human/20 Music/School & Content/Curriculum/Concepts/<STRAND>-CNN — <Title>.md` (`type: school-concept`) |
| Classes | `00 Human/20 Music/School & Content/Curriculum/Classes/Class N — <Title>.md` (`type: school-class`) |
| Tests | `00 Human/20 Music/School & Content/Curriculum/Tests/Course NN/…` and `Tests/…` (`type: school-test`) |
| Audio | `00 Human/20 Music/School & Content/Curriculum/Audio/ear-NN.wav` |
| Renderer | `Machine/Scripts/school-eartrain-render.py` |
| **Progress (per-person)** | `Machine/School/progress-<user>.json` — see State model below |
| Which person this vault is | `Machine/School/local-user.json` (gitignored, `{"user": "nate"}`) |

## State model (spec-155, status vocabulary renamed spec-156)

Course/concept/class/test notes hold only **shared, config-shaped** frontmatter now — `course_id`, `domain`, `strands`, `class`, `depends_on`, `lesson`, `source`, `target_pct`, `lessons`, `concepts`. **Every per-person field lives in `Machine/School/progress-<user>.json` instead**, keyed by concept/test note **basename**, course `course_id`, or class `class_id`:

```json
{
  "user": "nate",
  "concepts": { "<basename>": { "status", "sr_interval", "sr_ease", "sr_due", "last_practiced", "sr_last_rating" } },
  "courses":  { "<course_id>": { "status", "lessons_complete", "started", "completed", "scheduled_start" } },
  "classes":  { "<class_id>": { "status" } },
  "tests":    { "<basename>": { "status", "attempts" } }
}
```

`scheduled_start` (spec-158, C2) is the "Schedule it" course-final option's only trace: an ISO date, present only while the course is still `available` and waiting for that date. It used to be consumed by `Machine/Workflows/practice.md` Step 0.5, which auto-enrolled the course and deleted the key on the day it arrived — **that step was retired 2026-08-20**, so the key is currently inert and never coexisting with `status: enrolled` is no longer enforced by anything. Treat a stale `scheduled_start` as a reminder, not a trigger.

**Store deltas only — never write a default value.** Defaults: concept `status: queued` / `sr_interval: 0` / `sr_ease: 2.5` / `sr_due: null` / `last_practiced: null` / `sr_last_rating: null`; test `status: unsat` / `attempts: []`; course `status: available` / `lessons_complete: 0` / `started: null` / `completed: null`; class `status: available`. An entry with nothing left after removing default-valued keys is **omitted entirely** — that's what "not started yet" looks like. This is the same rule the plugin (`lib/school-state.js`) merges against, so the card and every workflow in this file agree on one shape.

**The status vocabulary (spec-156, 2026-08-12).** Class and course both go `available` → `enrolled` → `completed` — renamed from `planned`/`active`/`complete`; the class default flipped from `active` to `available` in the same move, since classes previously had exactly one status and everything was always "active." Concept stays `queued` → `learning` → `maintenance`, and test stays `unsat` → `passed`/`failed`, both unchanged. **`passed` is reserved for tests only** — a course or class is `completed`, never "passed." Concepts keep `queued` on purpose: a concept is `queued` because the *system* hasn't released it yet (lesson progression is the gate); a class or course is `available` because *you* haven't chosen it — different situations, so they don't share a word.

**The homework/review vocabulary (PATCH-060/061, 2026-08-20) — supersedes the spec-171 PATCH-004/009 wording decision.** **Homework tasks** are **completed**, not "turned in" — that is the counter on every Homework block (`N/M completed`). The **lesson** is still **turned in**: that is a different object and it kept its verb, so "Turn in lesson 3" and a `Turned in` chip are correct and should not be "fixed". A lesson's quizzes are still **assigned** when it is turned in — automatically on enrollment (Lesson 1), on passing a lesson test (the next one), or manually via `/school lesson <id> <n>` — and a quiz is still **passed**. The page's spaced-repetition surface is labeled **Review**, not "Drill." "In rotation", "the drip" and "spaced-repetition cards" remain the engine's vocabulary, not the student's. Nate changed the page's wording on 2026-08-20; write any future copy — course notes, the artifact, this file — in these terms so nothing "corrects" the page back to the old words.

Every instruction below that reads or writes `status:`, `sr_*:`, `lessons_complete:`, `started:`, `completed:` or `attempts:` on a course/concept/class/test note means **read/write it in the progress file**, not in the note's frontmatter. `target_pct`, `lessons`, `concepts`, `course_id` and the rest of the structural fields are unchanged — still in the shared note, identical for Nate and Britt.

If `progress-<user>.json` is missing, treat every lookup as a miss and apply the defaults above — a fresh clone (or Nate deleting his own to start over) renders a clean, empty school, not an error.

### Course note anatomy

A course note lists its concepts **inside the lesson that introduces them**, never in one table at the top — a top-level list forces a lookup to answer "what does this lesson actually cover?"

- Each lesson ends with `**Concept(s) introduced:**` and a two-column table — `Concept | Taught in`. Singular label when the lesson introduces one.
- The concept note's `lesson:` frontmatter is the source of truth for which lesson owns it — that's what `/school lesson` reads. If a course note disagrees, fix the course note.

## Modes (decide from `$ARGUMENTS`)

- **empty** → STATUS mode.
- **`class`** → list all eight classes with progress.
- **`class <n>`** → open one: its courses, lesson progress, and the exam that closes it.
- **`class <n> enroll`** / **`class <n> unenroll`** → Step 3.
- **`course`** / **`course <id>`** / **`course <id> enroll`** / **`course <id> unenroll`** → Step 3.
- **`enroll <id>`** → shorthand: resolves `<id>` against courses first, then classes, and runs the matching enroll.
- **`lesson <id> <n>`** → manual fallback — lesson `n` done, release lesson `n+1`.
- **`test <course> <lesson>`** → sit a lesson test in chat.
- **`final <course>`** / **`midterm <domain> <n>`** / **`exam <domain>`** → the bigger tests, in chat.
- **`grade <test-page>`** → grade answers already typed into a page.
- **`sync-drills`** → re-read `Drills/` and refresh `**Technique**` lines.
- **`drill`** → drill due cards in chat.
- **`artifact`** → Step 6, rebuild + republish the web surface.
- **`sync`** → Step 6, pull that page's progress back into the vault. **Match `sync-drills` first** —
  it is a different mode, and a loose prefix match on `sync` would swallow it.
- **`replan`** → REPLAN mode. Re-lay the remaining lessons across the remaining weeks, slide the end date, and say what it costs.

---

## Step 1 — STATUS (`/school`)

1. **Enrolled courses** — glob `courses.folder`, cross-reference each course's `course_id` against `progress-<user>.json`'s `courses` section for `status: enrolled` (default `available` when absent). One line each: `Course NN — Title · <strand> · lessons n/m · concepts: q queued / l learning / m maintenance`.
2. **Due today** — total concepts with `sr_due <= today` per the progress file, split by domain. The **page** serves them now (the daily-note drip was retired 2026-08-20); `/school drill` runs them blind in chat as practice, but records nothing — ratings only count on the page.
3. **Next up** — count *taught* enrolled courses: every `status: enrolled` course whose `course_id` is **not** in `courses.standing`. If that count is under `courses.taught_limit`, name the next `available` course from **the syllabus order** (`syllabus.json`'s `theory` / `prod` arrays).

> [!warning] Never subtract standing courses from a combined limit
> The guard is `taught_count < courses.taught_limit`, with every id in `courses.standing` excluded from `taught_count`. It used to be `active_count < active_limit - 1`, which hardcoded exactly one standing course — adding a second silently allowed an extra *taught* course. `active_limit` is display-only now.
4. **Where you are in the semester** — the current week from `syllabus.json` `rows`, and whether lessons complete is ahead of or behind it.
5. Make no writes.

If `Courses/` is empty, say the school is set up but no course exists yet.

---

## Step 2 — TEST FORMAT AND GRADING CONTRACTS

### Test note format (load-bearing — the grader parses this)

> [!note] Amended 2026-08-10 — the answer key moved to the bottom
> It used to be a collapsed callout under each question. Nate's call: *"I don't want the urge to look… I'd only check the answer key after doing the whole test, not by question as I'm doing it."* The spec's original objection — you can't check Q3 without seeing Q7 — is answered by the **Grade test** button, which checks for you.

```markdown
```school-test
```

#### Q1
<!-- concept: FND-C01 · type: objective -->
Give the enharmonic equivalent of C♯, F♭ and E♯.

**A:** 

#### Q2
…

## ✅ End of questions

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** C♯ = D♭ · F♭ = E · E♯ = F
> *Also accepted:* Db · D flat
> The explanation, if any, goes here on its own line.
>
> **Q2.** …

## ✅ End of test
```

- **`` ```school-test `` fence at the top** — renders the **Grade test** button.
- Heading is exactly `#### Q<N>`. Metadata comment on the next line: `<!-- concept: <ID> · type: <objective|free-text> -->`, plus ` · audio: ear-NN.wav` for listening questions.
- The answer line is exactly `**A:** `. **The span runs to the next `#### ` or `## `.**
- **Never terminate an answer on `---`** — a horizontal rule is legal inside a typed answer. **But strip trailing `---`** before testing for emptiness.
- The page ends with `## ✅ End of test`; `## ✅ End of questions` closes the last answer span before the key.

> [!warning] Run the linter before a test page counts as done
> `python3 Machine/Scripts/school-test-lint.py` checks every rule on this page mechanically —
> frontmatter, question numbering, concept IDs that resolve, one key entry per question, terse
> key line 1, rubric weights summing to 5, brand names, notation-dependent questions, and stray
> content that would be captured as the last answer. **Exits non-zero on any error**, so it gates
> a build the same way `school-theory-check.py` does.
>
> Phase 5 authors 71 more of these across many sessions. "Be careful" is not a mechanism.

#### The key block — three rules the grader depends on

1. **One collapsed `> [!danger]-` callout at the bottom.** Never a callout per question.
2. **Line 1 of each entry is the canonical answer, and it must be TERSE.** It is the only text matched against. A verbose line 1 breaks matching in both directions: token-subset one way produces false negatives (a right short answer misses the key's prose), the other way produces false positives (an incomplete answer is a subset of a chatty key).
3. **Explanation goes on the following lines** — shown only when the answer was wrong. `*Also accepted:*` lists alternates, separated by `·` **only** (splitting on commas would turn "C, crossing into the next letter" into a bare "C" that credits an incomplete answer). `*Rubric (5):*` is free-text only.

#### `/school grade <page>` — mark the page in place

There is **no grade button**. A local grader could only ever do the objective half, and free-text needs a rubric read every time — so a second partial path earned nothing and was removed 2026-08-10. One command does the whole job.

Each test page carries a copyable command in its `## Grading` section. **Run it on Opus** — free-text scoring is judgement, and a cheaper model marks good answers wrong.

**First, write the overall result as a banner directly under the page's `# ` title.** Not collapsible — this is the thing you want to see on opening the page later:

```markdown
> [!failure] ❌ FAILED — 68%
> Pass bar **75%** · objective **6/8** · free-text **4/10** · graded 2026-08-10
> Re-sit after reviewing the ❌ and 📝 answers below. Missed concepts go back into the drip at `learning`.
```

`> [!success] ✅ PASSED — 84%` on a pass, and drop the third line. **Re-grading replaces the banner**, never adds a second one.

**Scoring:** every question is worth 1. An objective question scores 1 or 0; a free-text question scores its rubric fraction (3/5 → 0.6). So 6 objective correct plus two free-text at 2/5 is `6 + 0.4 + 0.4 = 6.8 / 10 = 68%`. Report `objective` as a count and `free_text` as rubric points out of the total available, so both halves stay legible.

**Write the result inline, immediately after each question's `**A:**` line**, as a callout whose *title* carries the verdict so it reads collapsed:

```markdown
**A:** Fb, E#,

> [!failure]- ❌ Incorrect — F♭, E♯ and B♯
> They sound as E, F and C respectively. C♯, G♭ and A♯ are the black keys.
```

- **Correct** → `> [!success] ✅ Correct` — one line, no callout body. Do not restate the answer; they got it.
- **Incorrect** → `> [!failure]- ❌ Incorrect — <the terse answer>`, with the explanation inside.
- **Free-text** → `> [!note]- 📝 4/5 — <what was missing>`, with the rubric breakdown inside. Award partial credit and say specifically what was absent, not just the number.
- **Blank** → `> [!abstract] ⬜ Blank — 0` (free-text: `⬜ Blank — 0/5`), with the terse canonical answer on the title line and the explanation inside, exactly as an ❌ carries it. **It scores zero.** The callout stays visually distinct from ❌ on purpose — *didn't answer* and *answered wrong* are different diagnoses even though they now cost the same.

**Re-grading replaces these callouts**, never stacks them. Strip any existing `> [!success] ✅`, `> [!failure]-`, `> [!note]- 📝` or `> [!abstract] ⬜` block following an `**A:**` line before writing the new one.

**Leave the bottom answer key untouched and collapsed.** Inline marks are the point — the key is the fallback.

Then write the attempt into `progress-<user>.json` → `tests["<test basename>"].attempts`, newest-first (create the entry if it doesn't exist yet):

```json
"attempts": [
  { "date": "2026-08-10", "score_pct": 80, "result": "passed", "objective": "6/8", "free_text": "7/10" }
]
```

Set `tests["<test basename>"].status` to `passed` / `failed` against the threshold from `tests:`. **Blanks score zero** — see below. Report answered/total alongside the score so an abandoned section is still legible.

### Question-authoring constraints

- **Plain-text answerable only.** No question may require reading or writing staff notation, or interpreting an image. Ask about notation *concepts* in words instead.
- **Counterpoint must be text-shaped** — give voices as note-name sequences and ask him to *identify* the error, never "write the alto line."
- **FX is effect-*type* only.** No plugin or brand names, ever, despite the 355 plugin notes in the vault. This is an explicit standing preference.
- Roman numerals, chord symbols, note names and interval names are the preferred answer vocabulary.
- Every question answerable in at most a few sentences.

---

### Normalization rules for objective matching

A false negative here reads as a knowledge gap that isn't real. Be generous.

- Case-insensitive; collapse whitespace runs; strip trailing punctuation.
- `♯` ↔ `#` freely.
- `♭` ↔ `b` **only when the character directly follows a note letter A–G or a Roman numeral.** A lone `b` is the note B, not a flat.
- Note lists are order- and separator-insensitive: `F♯ C♯ G♯` == `F#, C#, G#`.
- Accept the realistic synonym set: `maj7`/`M7`/`major 7th`, `m`/`min`/`minor`, `dim`/`°`, `aug`/`+`, `P5`/`perfect 5th`, `ø7`/`half-diminished`, etc. When in doubt, credit it. **Grade the knowledge, not the notation habit.**

### Blanks score zero (amended 2026-08-27 — reversed)

**A blank costs the full point.** It used to be scored as *"didn't answer"* rather than *"got it wrong"* and cost nothing, on the reasoning that zeros understate a section abandoned partway. Nate reversed it the day a Lesson 2 test came back **100% with both free-text questions left blank** — every procedural question right, neither *why* question attempted, and the headline number said the paper was perfect. A score that improves when you skip the hard half is not a score.

- A blank scores **0**, the same as a wrong answer. Free-text blanks score **0 out of the rubric's 5**.
- **Still report answered/total** next to the percentage. The distinction survives in the reporting, not in the arithmetic — it was always the useful half.
- Mark it `⬜ Blank — 0`, not `❌`. Different diagnosis, same cost.
- A blank goes into `misses` like any wrong answer (`kind: "wrong"`). Declining to answer is exactly the signal the retake queue exists for.
- **Blanks seed their concept back to `learning`** on the same terms as a missed question.

> The old rule's real target was a *test* abandoned partway, not a *question* ducked. That case is now visible in `answered N/M` instead of being priced into the percentage.

---

## Step 3 — CLASSES AND COURSES (`/school class …`, `/school course …`)

Read `courses:` and `concepts:` from `School Config.md` first.

### `/school class` — list the eight

Glob `classes.folder` for `type: school-class`. One line each:

`Class N — Title · <status> · <domain> · courses c/C · lessons u/U · next: <exam or —>`

Mark every class whose `class_id` is in `classes.standing` as **standing** and print its `load:` (`routine` or `intensive`) instead of an exam. Standing classes have no finish line, so a progress bar on them is misleading — show reps or say "ongoing". `status` is `available` / `enrolled` / `completed` (default `available` when the class has no progress entry).

### `/school class <n>` — open one

Its courses in track order with per-course lesson progress, what the class assumes, and the exam that closes it. Then the next concrete action: the next lesson of the first incomplete course. Make no writes.

### `/school class <n> enroll`

1. Read the class. If already `enrolled` or `completed`, say so and stop.
2. In `progress-<user>.json` → `classes["<class_id>"]`, set `status: "enrolled"`.
3. **Does not enroll any course underneath it.** Enrollment is one deliberate act per object — say so, and name which courses are available to enroll next.

### `/school class <n> unenroll`

Delete `classes["<class_id>"].status` from `progress-<user>.json` (i.e. remove just that key, leaving the entry empty/absent once it has nothing else) — the class falls back to `available`. **Never touch any course, lesson or concept state underneath it.** Re-enrolling resumes exactly where it left off.

### `/school course` — list

Glob `courses.folder` for `type: school-course`. Print one line each: `Course NN — Title · <domain>/<strand> · <status> · lessons n/m · concepts due today: k`. `status` is `available` / `enrolled` / `completed`. Then the count against `courses.taught_limit` and, if there's room, which `available` course the placement's course order says is next.

Mark every course in `courses.standing` as **`standing`** rather than `enrolled` in that list, and report the taught count separately (`2/2 taught · 2 standing`), so a full reading load never reads as having room.

Courses print `target` as their pass bar. There is no score column — nothing in the school records how well a strand was known before it was taught.

### `/school course <id>` — open one

Report where it stands: lessons complete, concepts by status (`queued`/`learning`/`maintenance`), how many are due today, and the next lesson's read + drill. Make no writes.

### `/school course <id> enroll`

The chat equivalent of the page's **Enroll** button — same rules, same result. (The dashboard's Enroll button was deleted 2026-08-24.)

1. Read the course. If already `enrolled` or `completed`, say so and stop.
2. **Check `depends_on`** — every listed course must be `enrolled` or `completed` (not necessarily completed). If one isn't, refuse and name it.
3. **Check the taught limit.** Count courses with `status: enrolled` whose `course_id` is **not** in `courses.standing`. If that count is already `courses.taught_limit`, refuse and name which taught course to finish or pause first.
   - A course that *is* in `courses.standing` skips this check entirely — enrolling Course 09 or 17 never consumes a slot.
   - **Do not subtract standing courses from a combined limit.** With two standing courses in flight, `active_limit - 1` arithmetic would allow a third taught course. That is the regression this design invites; test it explicitly.
4. In `progress-<user>.json` → `courses["<course_id>"]`, set `status: "enrolled"`, `started: today`.
5. **Release Lesson 1's concepts** — same operation as `/school lesson`'s release step below, for lesson `1`. Enrolling is the only deliberate act; nothing else needs to run.
6. Report the course, its class, its lesson count, and what lesson 1 asks for.

### `/school course <id> unenroll`

Delete `courses["<course_id>"].status` from `progress-<user>.json` — the course falls back to `available`. **Never touch `lessons_complete` or any concept's status** — progress is kept, not wiped. Re-enrolling resumes.

### `/school lesson <id> <n>` — manual fallback: lesson `n` done

**The escape hatch, not the main path.** The main path is automatic: enrolling a course releases Lesson 1, and passing a lesson test (Step 2, below) releases the next one. Reach for this when you've worked through a lesson and don't want to test on it.

`n` is **the lesson you just finished** — not the one being released. This command:

1. Bump `progress-<user>.json` → `courses["<course_id>"].lessons_complete` to `n`, but **never decrease it** — if it's already `≥ n`, leave it alone.
2. **Release lesson `n + 1`'s concepts — from chat, this means bumping the number and nothing else (PATCH-110, 2026-08-24).** Set `lessons_complete` and stop. Do **not** write `status`/`sr_due` onto the next lesson's concepts by hand.

   **Why the step shrank.** A quiz is due the day before the *next* lesson — the page's `workDueMap()` — and that date can only be computed by the page's scheduler, which nothing outside `app.js` can run. So chat used to write `sr_due: today` as an approximation, and the result was the bug Nate reported on 2026-08-24: passing a lesson test in chat dumped the next lesson's quizzes on the schedule as due *today*, while clicking the same pass on the page dated them correctly. `reconcileReleases()` (app.js, runs at boot) now derives the release from `lessons_complete`: lessons up to `lessons_complete + 1` are open, so their quizzes are assigned, on the plan's date. Bump the number and the page does the rest on next load.

   **If you must write concept state by hand anyway** — a course with no plan slot, or a repair — the shape is `status: "queued" → "learning"`, `sr_interval: 0`, `last_practiced: null`, and **never `start_interval`.** `start_interval` is the interval on *entering maintenance*, not on release. C1 shipped a bug applying it at release, which marked a freshly unlocked concept as already practised and hid it from the drip for two days — fixed 2026-08-12 (`_releaseUnit` in `main.source.js`). Do not reintroduce it. Leave `sr_due` for `reconcileReleases()` unless there is genuinely no plan to read.

**Idempotent — load-bearing.** A concept already `learning` or `maintenance` is never touched by step 2, and step 1 never lowers `lessons_complete`. Running this twice, or running it after the lesson's test already passed and released the same concepts, is a no-op the second time.

**On enrollment, the same release logic runs for lesson 1** (there is no "lesson 0" to have finished) — see `/school course <id> enroll` step 5.

### `/school drill` — blind practice in chat. **Writes nothing.**

> [!warning] The writer was removed 2026-08-24 — and it had already gone wrong
> This command used to carry its own copy of the SM-2 math and write `sr_ease`, `sr_interval`,
> `sr_due`, `last_practiced` and `sr_last_rating` straight into `progress-<user>.json`. That made it
> the **fourth scheduler** in the system and the last writer competing with the page.
>
> It was not a theoretical risk. The two had already **diverged in opposite directions**: this file
> said ⚡ raises `sr_ease` and multiplies the interval, while `rate()` in `app.js` has retired the
> quiz outright since PATCH-114. Same rating, contradictory outcomes, and whichever ran last won.
> A morning of drilling in chat could silently un-retire everything retired on the page.
>
> The page owns spaced repetition. There is exactly one implementation of the math — `rate()` in
> `app.js` — and this file no longer restates it. **Do not re-add the formulas here.** If the
> scheduling needs to change, it changes in `rate()`.

**What it still is: a way to practise blind, in the terminal, when you are not at the page.** Gather
every `type: school-concept` note, cross-referenced against `progress-<user>.json` → `concepts` for
`status: learning|maintenance` and `sr_due <= today`. Ask each concept's `**Q.**` one at a time,
without revealing the answer. After the answer, show the concept's answer and say how it went.

**Then stop.** Record nothing — not the rating, not `last_practiced`, not a date. Nothing about the
session reaches any file.

**Say so at the end**, plainly, so the reader is never left thinking a session counted when it did
not:

> That was practice only — nothing was recorded. Rate these on the school page if you want the
> schedule to move: they are waiting for you under **Quizzes**.

**Prefer the page.** Its quiz session is blind too — question, then *Reveal answer*, then rate — so
the modality argument this command was originally built on no longer holds. The page does the same
thing and its ratings count. Reach for `/school drill` when you want to run through a few away from
the browser, and treat it as a rehearsal.

### Tests — `/school test`, `final`, `midterm`, `exam`

Pages live in `tests.folder`: `Tests/Course NN/` for lesson tests and course finals, `Tests/` for the six cross-course exams. **Filenames must be globally unique** — Obsidian resolves `[[Lesson 1 Test]]` by basename across the whole vault, so every page is named `Course NN — Lesson N Test`, `Course NN — Final Exam`, or `Theory Midterm 1` and friends.

**Chat mode must not leak the key — and "don't print it" is not enough (PATCH-117, 2026-08-24).** Nate: *"when taking a test in terminal, my text line auto populates with answers to test questions."* Reading the whole page pulls the answer key into the session's context, and the terminal's own predictive input then offers it back to him as he types — so the key leaks without ever being printed.

**Read only the questions.** Slice the page at `## ✅ End of questions` and read nothing below it:

```bash
sed -n '1,/^## ✅ End of questions/p' "<test page>"
```

Read the key at **grading** time, in a separate call, after every answer is in. Same for `final`, `midterm` and `exam`.

Then ask **one question at a time**, wait for the answer, *then* reveal that one question's answer. Never print the `> [!success]` callouts ahead of an answer. Blind is the whole point of sitting a test in chat, exactly as it is on the page's quiz session.

> A page that has already been sat carries the previous attempt's answers inline too, above the key — the slice above still includes those. On a re-sit, skip the `**A:**` lines and their verdict callouts when reading, or the same leak happens one question at a time.

**Grading** reuses the normalization rules in Step 2 and the blanks-score-zero rule. Grade the knowledge, not the notation habit.

**Thresholds** come from `tests:` in School Config — `lesson_pass` 75, `final_pass` 80, `midterm_pass` 80, `exam_pass` 80.

**On a course final pass:** course → `status: completed`, `completed:` today, every concept **not already `retired`** seeded to `maintenance` at `start_interval`. *(F9, 2026-08-25 — the old wording said simply "every concept", which put a quiz you had rated automatic and retired straight back into the drip the day its course completed: the exact double-ask PATCH-114 exists to prevent. Retiring is a decision the reader made; completing a course is not a reason to overrule it.)* When the class's last course completes, the class also → `status: completed`.

**Then offer the next course — a choice, not a fait accompli (spec-158, C2).** Find the next `available` course in that class's `courses` array (or, if the class just completed, the next class's first course). Compute each option's projected end date and weekly load by actually running the preview — never estimate by hand:

```
node Machine/Scripts/school-replan.cjs                                    # Start now (no hold — baseline dry run)
node Machine/Scripts/school-replan.cjs --hold=<nextCourseId>:<chosenDate> # Schedule it
node Machine/Scripts/school-replan.cjs --cap-at-planned-end               # Pause / hold
```

Present all three before asking:

> **Start now** → next course enrolls, Lesson 1 releases, finishes **{newEnd from run 1}** at ~{unitsPerWeek} lessons/week.
> **Schedule it** → pick a date; finishes **{newEnd from run 2}** instead.
> **Pause / hold** → nothing scheduled, no nag — but **{dropped courses/lessons from run 3}** fall off the {plannedEnd} end date.

Then act on the choice:
- **Start now** — `courses["<nextId>"]`: `status: "enrolled"`, `started: today`; release Lesson 1 (same as `/school course <id> enroll` step 5).
- **Schedule it** — `courses["<nextId>"].scheduled_start: <chosenDate>`. Course stays `available` (not enrolled yet). **Read this before offering it:** the auto-enroller that used to fire on the date was `Machine/Workflows/practice.md` Step 0.5, **retired 2026-08-20** — a `scheduled_start` is now an inert note-to-self that nothing acts on. Either enroll on the date yourself (page or `/school course <id> enroll`), or un-retire that step. Say so when you offer this option; don't promise it happens by itself.
- **Pause / hold** — leave the course `available`, write nothing, say nothing further. `/school replan` (no flags) is the honest baseline again next time it's run; this offer doesn't repeat itself uninvited.

**On a course final fail:** course stays `enrolled`; re-seed **only** the missed concepts to `sr_interval: 0`, `status: learning`.
**Every grade writes the missed QUESTIONS, not just the missed concepts (PATCH-112, 2026-08-24).** For every question marked ❌ or scored short of full rubric credit, add an entry to `progress-<user>.json` → `misses`, keyed `"<test basename>#<question number>"`:

```json
"Course 01 — Lesson 1 Test#3": {
  "concept": "FND-C01 — Enharmonic equivalents",
  "test": "Course 01 — Lesson 1 Test", "n": 3,
  "kind": "wrong",              // "wrong" | "partial"
  "due": "2026-08-31",          // a week out is the default; sooner for a concept he is mid-lesson on
  "q": "<the question, verbatim>",
  "a": "<line 1 of the key — the terse canonical answer>",
  "why": "<what was missing, in the words the inline grade used>"
}
```

**The question text has to be carried, not referenced.** Test papers are vault markdown and never reach the page's curriculum island, so a key alone would render a blank card. `q`/`a`/`why` are the whole card.

**Why questions and not just concepts.** Seeding the concept back to `learning` is still correct and still happens — but a lesson test asks eight or ten questions about one or two concepts, so on Course 01 a single missed question and a perfect paper re-seed exactly the same thing. Nate: *"if questions are marked wrong or partially wrong for a test i want those questions to be generated as pop quizzes at a later time."* The page serves them at the head of the quiz session, draws them on the term view as ↻ Retake chips, and clears an entry when it is rated `automatic` (`solid` pushes it a week, `rusty` two days, `forgot` tomorrow). `misses` is OWNED by `sync.py`, so those ratings come home.

**On a lesson test pass — tick the test task too (PATCH-110, 2026-08-24).** Set `homework["<courseId>:<n>:hoN"] = true` for the lesson's authored `**Test**` item (`01:1:ho2` and friends — read the id out of `Machine/School/…`'s curriculum, or count the Homework block's items in the course note; the Test is the last one). **This tick is what the page means by "the test was sat"** — `testGate()`, the Completed section and the `Sat` pill all read it, and nothing reads `tests[...]​.status`, which the page only carries through to the vault. A pass recorded in `tests` but not ticked here leaves the page showing the test as still open, which is exactly what happened on 2026-08-24 and is why the rule is written down rather than left to the grader.

**On a lesson test pass:** record the attempt, seed any missed concepts back to `learning`, then **run the same release `/school lesson <id> <n>` would** for `n` = the lesson just tested — bump `lessons_complete` to `n` (never lower it), which is what opens lesson `n + 1`. This is the automatic chain (spec-156): passing the test is what releases the next lesson, so nothing needs to be typed mid-habit. **Do not date lesson `n + 1`'s quizzes yourself** — `reconcileReleases()` assigns them on the plan's day at next page load (PATCH-110). A missed concept seeded back to `learning` keeps `sr_due: today` on purpose: that one *is* due now, and it is a re-drip rather than a release.
**On a lesson test fail:** record the attempt, seed the missed concepts back to `learning`, and **release nothing** — the lesson stays current, `lessons_complete` doesn't move. **Block nothing else** — `tests.gate_lessons` is `false` on purpose, a failed lesson test never blocks retaking it or moving on to review. A hard gate turns one bad afternoon into a stalled semester, and the drip already re-surfaces what was missed.
**Idempotent** — the same rule as `/school lesson`: re-grading (or re-passing after a regrade) never lowers `lessons_complete` and never pulls an already-`learning`/`maintenance` concept back to `queued` or re-releases a lesson that's already out.

Every grade appends to `progress-<user>.json` → `tests["<test basename>"].attempts` **newest-first** (`{date, score_pct, result}`) and sets that entry's `status:`.

**In the rules above**, "course →" and "concept …" mean `progress-<user>.json` → `courses["<course_id>"]` and `concepts["<concept basename>"]` respectively — never the shared note's frontmatter.

> [!warning] The answer-span regex is amended for collapsible keys
> The old pattern ran `**A:**` to the next `#### ` or `## `, which now swallows the `> [!success]` callout sitting between them — grading the answer against itself. Terminate on the callout too:
> ```python
> ans = re.search(r'\*\*A:\*\*(.*?)(?=\n> \[!success\]|\n#### |\n## |\Z)', block, re.S).group(1)
> ans = re.sub(r'(\s*\n---\s*)+$', '', ans).strip()   # separator, not content
> ```
> Still never terminate on `---` alone — a horizontal rule is legal inside a typed answer.

### `/school sync-drills`

Re-read **both** the `Drills/` and the `Practice Method/` subfolder under each instrument folder (`20 Music/School & Content/Guitar/Drills/`, `Guitar/Practice Method/`, `Piano/Drills/`, `Bass/Drills/`, `Bass/Practice Method/`). For every drill or routine, match its `reinforces:` (concept IDs) and `classes:` against each lesson's concepts. Add or update a `**Technique**` line in matching lessons.

> **Drill vs routine — Nate's rule, 2026-08-12.** A **drill** trains a *technique*: mindless dexterity, sequenced by tempo and level (downstrokes, legato, slap, finger independence). A **practice routine** implements a *concept* and requires active thought (scale workouts, interval ladders, arpeggio work where you are thinking about which arpeggio). The gray cases resolve on that test — sweep picking is a drill until you are choosing the arpeggio, then it is a routine.
> Consequence: **routines are what carry `reinforces:`, not drills.** Most true drills honestly have `reinforces: []` and that is correct — the school has no concepts for motor skill. This scan covers `Practice Method/` for exactly that reason; the member name `sync-drills` and the `**Technique**` label are now both slight misnomers, worth renaming in Phase C.

- **Only ever touch `**Technique**` lines.** Never rewrite a Review, Apply or Test item.
- A `**Technique**` line appears **only where a drill genuinely applies** — never invent one to fill a slot.
- Report what was added, and **say plainly which drills matched nothing**, so an unlinked drill can't sit invisible.
- Run it after every drill import.

## Step 4 — THE DAILY DRIP — RETIRED 2026-08-20

**Due concepts are served by the page now, not by the daily note.** `/practice` no longer gathers concept dues and `process-homework` no longer rates them — see "The vault surfaces are retired" above. `/school drill` still drills your due cards in chat when you want them there, but as of 2026-08-24 it **records nothing** — the page is the only thing that writes spaced-repetition state.

> **Dormant, kept verbatim for restoration:** *Concepts reach the daily homework block through `/practice`, not through this workflow. `/practice` Step 1 gathers concept dues the same way it gathers song dues; `process-homework` reads the marks back.*
> - *Cap: `concepts.daily_drip` (3) concept lines per day, oldest `sr_due` first.*
> - *Routing: **none.** Concepts are tier 1 — they render together under `### 🎓 Coursework`, at the top of the block above every lane, regardless of domain. `concepts.drip_lanes` is retired (spec-146); the theory and production lanes are pure tier-2 practice content again. This move is safe because `process-homework` matches the 🎓 marker and the wikilink, **not** the heading above the line.*
> - *Line format (parsed by `process-homework`, keep byte-compatible): `- [ ] 🎓 {Concept title} · interval {sr_interval}d · [[{Concept page}]]`*
> - *Rated ⚡/🙂/😬/💀 exactly like a song maintenance rep.*
>
> *The drip is a floor, not a quota — concepts appear when due, goal or no goal, and a day with none due renders no concept lines.*

---

## Step 5 — REPLAN (`/school replan`)

**The semester is a living plan, not a table someone typed once.** This mode re-lays it against reality. Nate: *"treat it like actual school (with a little flexibility)… will try to mitigate any floating."* He should **feel** the slip without being punished by it.

### Inputs

| What | Where |
|---|---|
| The schedule | `Machine/School/syllabus.json` — `semester` (start/weeks/end/pace/float) + `rows` (week → lessons) + `courses` (catalogue, `depends_on`) |
| Progress | `progress-<user>.json` → `courses["<course_id>"].lessons_complete` (bumped by `/school lesson`) |
| Config | `semester:` in `School Config.md` — `start`, `weeks`, pace, `float` |
| Today | today's date |

`syllabus.json` is the **machine-readable source of truth**. `Syllabus — Fall 2026.md` and the PDF are both rendered from it. Never hand-edit the note and expect a replan to respect it — edit the JSON, or better, let this mode write it.

### The math — run the script, don't hand-derive it (spec-158)

**`relaySyllabus()` in `lib/school-state.js` is the one implementation of this algorithm.** It used to also drive the Learning card's course-final timeline preview (Start now / Schedule / Pause); that card half was deleted 2026-08-24, but the rule still stands — a second, hand-computed estimate here would drift, which is exactly the failure spec-158 calls out. Run it:

```
node Machine/Scripts/school-replan.cjs --apply
```

This reads `Machine/School/syllabus.json` and `Machine/School/progress-<user>.json`, deals every not-yet-done lesson in each track's existing course order from the current week at the configured pace (`theory_lessons_per_week`, `production_lessons_per_week`), and writes the new `rows` + `semester.end` straight into `syllabus.json` (`--apply`). Without `--apply` it only prints the result — use that first to see the numbers before committing to them.

What the algorithm does, for reference (the code is the source of truth — this is a summary, not a spec to re-implement by hand):
1. **Which week are we in.** `week = floor((today − start) / 7) + 1`, clamped at 1 before the semester opens.
2. **Deal from there.** Every lesson not yet complete, per track, in the track's existing course order — `theory_lessons_per_week` theory lessons and `production_lessons_per_week` production lessons per week.
3. **Standing courses ride alongside** — one lesson per week per still-pending standing course, never consuming a track's normal slot.
4. **A track that runs dry lets the other double up** rather than leaving a week half full.
5. **A course a dependent relies on must be fully dealt first** — holding one course back (the preview's "Schedule" option, `--hold=<id>:<date>`) never lets a course that depends on it jump ahead in the same track.
6. **The new end date.** `semester.float: true` (default) → the end slides to the last week that got a lesson. Pass `--cap-at-planned-end` (the preview's "Pause" option) to hold the end at `semester.start + weeks*7 − 1` instead — whatever doesn't fit is reported in `dropped` and falls off.

**Idempotency is mechanical now, not a discipline.** Running the script twice with no work done in between prints byte-identical JSON — it's a pure function of `syllabus.json` + `progress-<user>.json` + today's date, no randomness and no "since last time" state.

### What it writes

1. **`Machine/School/syllabus.json`** — new `rows`, new `semester.end`. Already done by `school-replan.cjs --apply` above; nothing else in the file changes.
2. **`00 Human/20 Music/School & Content/Curriculum/Syllabus — Fall 2026.md`** — regenerate "The 13 weeks" table and the header line from the new plan (read the applied `rows` back out of `syllabus.json`). Preserve every hand-written section (the shape, course order prose, the applied layer, grading, related).
3. **Offer** the PDF re-render — `python3 Machine/Scripts/school-syllabus-render.py`, then Chrome headless (command in the script header). Don't run it unasked; it's a slow step and the note is the working copy.

### What it says

**Plain language, once.** The report is three things and nothing else:

> Week 4 of 13. You're **3 lessons behind** — FND u4, HAR u1 and MIX/SMP u2 haven't been marked done.
> Re-laid at the current pace, the semester now ends **Nov 15** instead of Nov 8.
> If you'd rather hold Nov 8, **BLU u3 and MEL u1** fall off the end.

Then stop. **No nagging** is a design requirement, not a nicety — state the cost once, accept whatever he decides, and adjust. Never re-raise it on a later day unsolicited.

### Idempotency (load-bearing)

Running `/school replan` twice with no work done in between must produce a **byte-identical** plan — verified mechanically now: `school-replan.cjs` (no `--apply`) prints the same JSON both times, since it's a pure function of `syllabus.json` + the progress file + today's date. Re-running is how you check the plan, so it has to be free.

---

## Step 6 — The artifact (`/school artifact`, `/school sync`)

The school also publishes as a **web study surface** — the whole curriculum (classes, courses, lessons,
concepts) as one page, with enrollment, lesson completion, homework checkboxes and a spaced-repetition
drill that all save into the page itself. It exists because reading and drilling are nicer there than
in Obsidian; it is **not** a second system of record.

**One page per person.** The curriculum is shared; progress is not.

| What | Where |
|---|---|
| **The** page (Nate's) | `https://claude.ai/code/artifact/b7703b1d-6929-4fb2-a284-910e886fa71e` ← `school.html` |
| Britt's page | **Hers to publish, not in this vault.** Nate's copy (`a8b1a9ac…` ← `school-britt.html`) was DELETED 2026-09-19 — see the note below |
| Builder | `Machine/Scripts/school-artifact/build.py [--user <name>] [--out <file>]` |
| Source | `app.css`, `app.js` beside it — **the `.html` files are generated bundles, never hand-edit them** |
| Sync back | `Machine/Scripts/school-artifact/sync.py` |
| Local check | `maketest.py` / `shot.sh` (headless render), `verify-publish.py` (publish round trip) |

`--user` picks whose `progress-<user>.json` seeds the page; `--out` keeps the builds in separate files
so they publish as separate artifacts. **Never publish two people from one file path** — same path means
same artifact, and one would overwrite the other.

> [!warning] SETTLED 2026-09-19 — Britt publishes her own page. This vault does not build one for her.
> Nate: *"we dont need the other copy now since she'll make her own."* The `a8b1a9ac…` artifact was
> **deleted**, and `school-britt.html` is no longer built or published from here. **Do not re-add
> either** — rebuilding hers from this vault recreates the exact dead end below.
>
> **Why it was always going to be a dead end.** The page saves by **republishing itself**
> (`claude.use('artifact')` → `cap.publish()`), and the runtime grants that only to the artifact's
> writer. On a page she does not own, Britt gets `readonly`: she can read every lesson and every
> idea on the board, and **nothing she does is saved** — no homework tick, no quiz rating, no new
> idea. `Users/Britt/Your Music School Page.md` has said exactly this since it was written:
> *"Nate can't publish it for you — the page saves by republishing itself, and only the owner can
> do that."* It was also never shared (`sharing: owner` on its last publish), so in the nine days
> it existed it was a page **nobody but Nate could open** — the preview it was built to be, for an
> audience of zero.
>
> **The one path known to work:** she says *"set up my music school"* in Claude Code in her own
> clone, `build.py --user britt` runs there, and she publishes from her own account. Her clone
> carries the curriculum, the build scripts and the plugin; the three build inputs it was missing
> (`soundslice-meta`, `song-covers`, `song-charts`) were added to `sync-shared.sh` the same day.
>
> **The untested middle option, still untested:** sharing an artifact with *edit* access may make
> a non-owner a writer (the runtime has a `not_writer` code distinct from "not the owner", and
> artifact sharing has a "can edit" level). It is moot now — nobody needs it — but if it ever comes
> up, the test is whether her save chip reads **saved** or **read-only** at the bottom-left of the
> rail. Until someone checks, do not tell anyone a page they do not own is theirs to write in.
>
> **Never publish two people from one file path** — same path means same artifact, and one would
> overwrite the other. `--out` is what keeps them apart. Still true, and still the reason
> `--out` exists, even with only one page built here now.

### `/school artifact` — rebuild and republish

1. `python3 Machine/Scripts/school-artifact/build.py` — Nate's page only; there is no second page to
   build from this vault any more (see the note above). It reads the curriculum notes, `School Config`'s
   `config` fence, `syllabus.json` and `progress-<user>.json`, and prints its counts. Treat any `!` line
   it prints as a real finding — it lints for config drift (a standing course whose class isn't standing).
2. Publish `Machine/Scripts/school-artifact/school.html` with the `Artifact` tool, passing the URL above
   so it **updates in place** rather than creating a second page, and **omit `capabilities` entirely**.
   **`favicon: 🎓`** — the same mark `SCHOOL_TAG` puts on the calendar events. Keep it identical on every
   republish: the tab icon is how Nate finds the page among open tabs, and a changed one reads as a
   different site. Recorded here 2026-08-26 because the tool requires the field on every publish and
   nothing else in the repo said what it should be.
   Omitting it carries the stored declaration forward unchanged, which is what you want on every
   republish of an existing page.
   **Never add `downloads` or `mcp`.** Either one makes the artifact un-shareable, and this page is
   shared by link — adding one silently breaks Nate's access from his other devices. This step used to
   read `capabilities: {artifact: {}, downloads: true}`; that was wrong and is the reason the rule is
   written here rather than left to memory.
3. **Run `/school sync` first if the page has unsynced progress** — a republish replaces the page's
   embedded state with whatever is in the vault, so unsynced ticks and ratings are lost.

### `/school sync` — pull progress home

The page stores its state in a `<script type="application/json" id="progress">` block, so the page itself
is the transport.

1. `WebFetch` the artifact URL. The tool saves the full HTML locally and prints the path.
2. `python3 Machine/Scripts/school-artifact/sync.py <that path>` — add `--dry-run` first to see the diff.
   It writes `Machine/School/progress-<user>.json` (deltas only, defaults pruned, the same shape the
   plugin merges). **Whose file it writes comes from the page**, so syncing Britt's URL lands in
   `progress-britt.json` — no flag to forget.
   It **merges**: it owns `concepts`/`courses`/`classes`/`tests`/`homework`, plus `assignments` and
   `drills` (spec-173), and carries every other section (`technique`, `books`) through untouched.
   **Owned = read from the page. Carried = read from the vault and written back.** So anything the
   page writes into a *carried* section is silently replaced by the vault's older copy on the next
   sync — no error, no warning. `drills` was carried until spec-173, which is why the homework
   page's practice log had to move it across the line the day it shipped. Any future section the
   page writes belongs in `OWNED` immediately, not after the first week of state quietly reverts.
3. **Enrich any outside lessons.** sync.py's own run above may just have written a new
   `type: outside-lesson` note (or one may already be sitting unenriched from before); this is the
   step that actually does something with it. Nate: *"when i put in outside lessons i want claude
   to create the lesson page with what i added and related things from the vault that need to be
   included... it'd create a drill for the school system and pull in info about [what was covered]
   and whatever resources would be useful. so an outside lesson page would be created that goes
   over what was went over and the homework that is due by next lesson. so there would be a
   separate attached homework page."* Deliberately folded into this command rather than a separate
   one — Nate's own call, so enrichment happens wherever sync already runs instead of one more
   thing to remember to invoke.

   For every `00 Human/20 Music/Users/<Name>/Lessons/*.md` with `enriched: false` (idempotent —
   skip anything already `true`, so re-running sync can never fight an edit Nate made by hand):
   - Read `## Covered` and `## Homework` as captured.
   - **Leave `soundslice:` alone.** Nate's guitar teacher sends homework and reference material as
     Soundslice pages, and Nate works in Soundslice's own player — *"would like to work within the
     soundslice interface so maybe its just a link to the soundslice page"* (2026-08-23). The links
     render on the lesson card as buttons out. **Never transcribe, mirror or summarise the score into
     the note:** Soundslice already loops it, slows it and shows the tab, and a copy here goes stale
     the moment the teacher edits theirs. Enrichment adds vault context *around* the material, never
     a second copy of it. Entries are flat `Label — URL` strings — see the folder's `_README.md` for
     why the YAML mapping form silently fails.
   - **Research the vault** for what actually teaches this — theory notes, technique notes,
     existing concept pages, FX chains, whatever is genuinely relevant — and search the web too if
     nothing in the vault covers it yet. Same standard `/research` holds itself to: cite sources,
     don't just format back what Nate typed ([[feedback_research_dont_transcribe]]).
   - Write real content into `## Links`, replacing the placeholder — actual wikilinks plus a short
     synthesis of what they say. **This is a link, not a concept**: outside lessons are
     deliberately unpaced, and unpaced material gets no quiz — the placeholder text already says so
     ("Link only — do not assign quizzes") and enrichment must not contradict it by inventing a
     concept note or wiring one to the quiz system.
   - Turn `## Homework` into something actually actionable if it arrived as a one-line shorthand —
     keep what Nate wrote, add the detail that makes it a task rather than a reminder.
   - **If what was covered is a repeatable technique** — a scale run, a tempo exercise, a specific
     pattern to build up, anything that is practiced rather than recalled — create a `type: drill`
     note under `Drills/` (or `Practice Method/`) using the same generic frontmatter the plugin's
     Drill Library already reads (`tempo_start`, `tempo_target`; `drill_keys` + `drill_count` only
     for an indexed family the way Hanon uses them). This is the exact mechanism spec-160 built —
     any note with that shape is picked up automatically, no code change required — and it is the
     right home for this, not a concept: the codebase's own line on the distinction is "routines are
     what carry `reinforces:`, not drills… the school has no concepts for motor skill." Link the new
     drill note from `## Links` too.
   - **File anything uploaded on the page** (PATCH-146, 2026-08-26). The lesson card has an
     **+ add files** button; an upload is held in the progress island and `sync.py` writes it into
     `Lessons/Resources/` as a real file, then strips it from progress. **This happens automatically
     in step 2 above** — the sync prints `uploads: N from the page, N written to Lessons/Resources/`.
     A file it could NOT write is kept in `ext_files` on purpose so it stays on the page and gets
     another chance; that is reported on stderr and is worth chasing, because until it is written
     the page is the only copy. The Obsidian plugin does the same on save, so uploads made offline
     are filed too.
   - **Check `Lessons/Resources/` for anything else the teacher handed over** (PATCH-145). Files
     put there by hand attach two ways — a subfolder named after the lesson note, or a loose file
     whose name starts with the lesson's date — and the folder's own `_README.md` is the reference.
     If the build printed `! resource claimed by no lesson`, the filename matches no lesson: fix
     the name or move it into the right folder, then rebuild.
   - **Rebuild after either.** A resource only reaches the live page on the next `/school artifact`.
   - Set `enriched: true` once real content is in place.

   If a lesson's capture included a **next lesson date** (`next_date:` in its frontmatter — set from
   the page's "Next lesson" field, or add it by hand if missing), the artifact reads it directly and
   needs no separate scheduling. PATCH-148 draws both on the schedule: the **lesson** on `next_date`
   itself, and its **homework the day before** — Nate's call, 2026-08-26, and the same rule a course
   lesson's homework already follows (`workDueMap`). A lesson with no `next_date` gets neither chip;
   there is nothing to date them from. If nothing enriched this run, say so
   in one line and move on — most syncs will have nothing pending here.
   Rebuild and republish (`/school artifact`) afterward if anything was enriched — the new Links
   and homework content only reaches the live page on the next build.
4. Report what moved: courses enrolled, lessons closed, concepts released or rated, outside lessons
   enriched.
5. **Reconcile the Google Calendar** (below) — **DISABLED since 2026-08-26**, Nate: *"disable google
   calendar integration for now"*. `calendar.json` carries `enabled: false` for him and
   `calendar-plan.py` now prints that and exits 0, so running this step is harmless but pointless;
   skip it and say nothing unless he asks. The existing events were deliberately **left on the
   calendar** rather than deleted, and `progress-<user>.json` still holds their ids in `calendar`, so
   flipping the flag back to `true` reconciles the same events into line instead of creating a second
   set. They will drift out of date in the meantime — that is the accepted cost of a pause, not a bug
   to fix. When it IS on: do this *after* the merge, since the plan is derived from what is enrolled
   and complete, so planning before the merge schedules yesterday's term.

### The calendar reconcile — lessons onto Google Calendar

One-way: the vault is the source of truth, the calendar is a projection, and anything edited on the
calendar is overwritten. Lessons only. Target and timezone come from `Machine/School/calendar.json`,
keyed per person.

```
python3 Machine/Scripts/school-artifact/calendar-plan.py Machine/School/progress-<user>.json
```

It renders the page headlessly and reads the timeline back — it does **not** re-derive the schedule.
`schedule()` in `app.js` is the only scheduler; a second one here would be free to disagree, and the
disagreement would surface as events on wrong days. It prints `{create, update, delete}`.

Then execute the plan with the Google Calendar MCP tools — `create_event` / `update_event` /
`delete_event`, `allDay: true`, `availability: AVAILABILITY_FREE` (a due-by marker must not block
time), Google's **end date is exclusive** so a one-day event ends on the following date. Collect the
ids and hand them back:

```
python3 Machine/Scripts/school-artifact/calendar-plan.py <progress.json> --record <results.json>
```
`results.json` is `{"upsert": {"<course>:<lesson>": {"event_id": …, "date": …}}, "removed": [keys]}`.

Three things here are load-bearing:

- **The mapping is vault-owned.** `calendar` in `progress-<user>.json` maps `<course>:<lesson>` to the
  event id. `sync.py` never reads it from the page — the page has no idea calendars exist, so reading
  it there returns empty, orphans every event, and creates a duplicate set on the next run while the
  originals stay forever.
- **`--record` re-reads the live progress file** and touches only `calendar`. The argument says what to
  *render* and is routinely a fixture; writing that body back would replace live progress with a stale
  copy and lose every lesson, rating and turn-in in the gap.
- **The calendar id must be a dedicated calendar.** The reconcile deletes, and deletion is routine —
  the plan moves whenever a course is enrolled, paused or reset. The script refuses any id without
  `@group.calendar.google.com` so a primary calendar can never be in reach of it.

**Overdue lessons.** The Overdue band renders outside any dated day row, so it carries no date. Those
lessons are placed on **today** and titled `Overdue · …`, moving forward each reconcile until turned
in. Skipping them was the alternative, and it would let the calendar say you owe nothing while the
page says otherwise.

The page's own **Sync to vault** tab shows the same JSON with a Copy button, for when Nate would rather
paste it than have the command fetch it.

### The Song Library shelf (spec-176, 2026-08-31)

`Songs` in the rail's **Library** group: every `type: song-ref` / `song-collection` note in
`School & Content/Song Library/`, as a grid of album sleeves. Click one and you land on that note's
page — the same PATCH-144 source page a **Read** line links to, with a header carrying the sleeve
and the frontmatter facts (key, tempo, form, feel, genre, instruments) that never appear in the prose.

- **It is a shelf.** Nothing on it is assigned, due, scheduled or scored, and it writes no progress.
  Wiring songs into practice/spaced repetition is a later spec — Nate: *"will add them to the
  practice/learning system afterwards. for now just want the library in there to reference."*
- **Sleeves come from the note's own `![[Images/…]]` embed**, squared and re-encoded to 300px webp,
  cached in `Machine/School/song-covers/`. 64 sleeves cover 105 of the 119 songs; the other 14 get a
  lettered plate, which is a finished state and not a gap to fill.
- **Both builds carry the whole shelf** since the Sync ceiling was retired (2026-08-31, below).
  `build.py`'s drop ladder — sleeves, then charts, then the whole library, then lesson handouts —
  is still there and still correct, but nothing trips it any more. If a rung ever fires, that is news.
- **Side effect worth knowing:** every song note now has a page in the bundle, so a
  `[[🎵 ARTIST - Title]]` written anywhere in the school is a live link rather than an inert span.
- **Filters:** key, tempo, genre, and a search box over title/artist/album/key. Key groups by
  **tonic**, not by the key string — the notes spell one key six ways (`B♭`, `Bb major`,
  `B flat major`…) and a menu built from raw values splits five songs across four entries. Major
  vs minor is deliberately not inferred from a bare `F`. Tempo bands exclude a song with no `bpm`
  rather than filing it under "Under 80"; every menu carries its own count and omits empty options.

### Chord charts (spec-176b, 2026-08-31)

`Song Library/Files/` holds 70 chart PDFs. **69 are matched to their song by FILENAME** — there is
no frontmatter join, and only seven were ever referenced from a note — and shown in a **Chord chart**
fold at the top of the song page, above the note. `Sex And Candy` matches nothing because no song
note exists for it; the build prints every unclaimed chart by name.

- **They are TEXT, not page images, and that is a measurement.** These average 3 pages at ~45 KB per
  page as webp: 60 charts is ~10.8 MB of base64 against a bundle already at 12.6 MB of the
  artifact's **16 MB** ceiling. It does not fit at any readable resolution. `pdftotext -layout`
  keeps what a chart is — chord names over lyrics, tab staves, fingering grids — in 4 KB.
- **`white-space:pre` and the mono face are load-bearing, not styling.** The chart's meaning is
  column position. Reflow it and it stops being a chart. It scrolls sideways in its own box.
- **Folded shut by default.** A chart is three pages of monospace; open, it puts the whole note
  below the fold on 66 of 119 songs. Open state is remembered for the session.
- Matching is 80%-of-title-words plus an artist check for one-word titles, with accents folded and
  camelCase split. The threshold only bites at five title words or more, so short titles still have
  to match exactly. **Score title words as a SET** — "Cry Baby Cry" has three words and two
  distinct ones, and scoring against the list length rejected a chart that matched perfectly.

### The Originals board (spec-179, 2026-09-10)

> **Retired 2026-11-16.** Originals is no longer part of School. It is its own tool in the Music app
> (`music/originals/`), and School is just the curriculum and progress. What follows is kept as history.

`Originals` in the rail's **Library** group: the shared idea board, one card per song idea, newest
first. Nate: *"i want to create an 'originals' tab within the music school artifact so myself and my
sister can put song ideas there and ideate on them."*

**It is the only writable shelf on the page**, and the only one whose content flows BOTH ways.

| What | Where |
|---|---|
| The notes | `School & Content/Originals/*.md`, `type: song-idea` — **shared**, mirrored by `sync-shared.sh` |
| The folder's own contract | `School & Content/Originals/_README.md` — note format, both ids, what it is not |
| Captures in flight | `progress-<user>.json` → `originals: {ideas: [...], notes: [...]}` |
| Written out by | `sync.py`, in the same pass as outside lessons and uploads |

**Why it is vault-backed and not live.** Three facts left no other shape, and they are worth
restating before anyone tries to "improve" this into a shared document:

- The page saves by **republishing itself**, and only the owner may publish. A reader on a shared
  link is `readonly` (PATCH-129) and can never write a word into someone else's page.
- The **`db` capability is one store per artifact.** Nate's page and Britt's page are two artifacts,
  so db would not have joined them either — it would have given each page a private store.
- Declaring `db` makes an artifact **organization-internal and un-shareable publicly**, the same
  class of breakage as `downloads` and `mcp` above.

So the two pages meet in the **repo**, not in the browser. Nate's call, 2026-09-10, made knowing the
cost: **the round trip is a sync and a rebuild each way.** Say the whole thought in a note rather
than half of it; this is `Handoff.md`'s lag, not a chat.

**The full loop, and every step is load-bearing:**

```
type on the page  ->  P.originals            (progress island, survives saves)
                  ->  /school sync           (sync.py writes real notes, strips the captures)
                  ->  sync-shared.sh --commit  (the ONLY thing that reaches the other person)
                  ->  their /school artifact rebuild
```

Stopping after the sync means it is in Nate's vault and nowhere else — the same rule
[[feedback_school_edits_push_to_repo]] already states for course notes, and the sync prints the
reminder itself.

**Idempotence is the whole safety story, and it rests on two ids.** A capture stays on the page
until a REBUILD replaces the page, so any save between the sync and the rebuild hands `sync.py` the
same captures again. `capture_id:` in the note's frontmatter and `<!-- nid:… -->` above each comment
are what make the second pass write nothing. Content is never the key — two people can write the
same sentence on the same day. **Never edit or reuse either id**; delete the note instead.

- **`## Notes` is newest-first**, and `sync.py` sorts incoming comments oldest-first precisely so
  that inserting each at the top leaves the newest there.
- **A comment whose idea has no note is kept on the page**, not written as an orphan — reported on
  stderr, visible as "not synced", and retried on the next sync.
- **Attribution comes from the build**, not from the runtime: `build.py` stamps `user` into the
  curriculum, so a capture is signed by whoever the page was built for. There is no `user`
  capability on this account to ask the viewer who they are, and a page can only be published by
  the person it was built for, so this cannot be wrong.
- **Status, key and tempo are edited in the note, not on the page.** Deliberate scope line: each
  would need a third kind of capture and a frontmatter rewrite in `sync.py`, for fields that change
  a handful of times in an idea's life. Comments are the ideation; those are bookkeeping.
- **Countless on the rail**, like every shelf. The only count worth having would be unsynced
  captures, and PATCH-126 already settled that a badge nothing on the page can clear does not go on
  that rail — the board's own banner carries it, where the sync it asks for is one line away.
- **Not hidden when empty**, unlike Songs and Tools. Those are shelves and an empty shelf is a dead
  end; this is where you go to write the first one.
- `Originals/` is **skipped by `READ_INDEX`**, the same way `Curriculum/` is: these notes already
  have a real page in the bundle, and a `source:` page would be a read-only copy of the prose with
  no way to reply.

**The page renders the WHOLE note body above `## Notes`, not just `## The idea`.** That heading is
what the page's composer writes; it is a convention, not a contract. Reading only it would have shown
one paragraph of a 14-section song project and dropped the rest with nothing saying so. Keep idea
pages to **tight lists and tables** — Nate, 2026-09-10: *"too much content. i like simple to the
point lists."* Long-form reasoning goes in the `## Notes` thread, dated and attributed.

**`_Log.md` — every input to the board, newest first** (2026-09-10). Nate: *"maybe for originals
theres a specific change log or notes page that records all inputs and shit."* One page for the
whole board rather than one per idea: a thread already holds an idea's reasoning, and what was
missing was the view ACROSS them. `sync.py` appends a line for every idea it files and every comment
it appends — **only for work actually done that run**, so a re-sync that writes nothing logs nothing.
Hand-done work (a trim, a rename, a move in or out) has to be added by hand; nothing else knows.
Format is `- **YYYY-MM-DD** · Who · what happened`, one line, and a line that does not match is
skipped by the build and reported as `!` rather than half-rendered. Rendered folded under the cards —
not a rail tab, because a log is what you consult after something changed, never the reason you
opened the board.

**Nate's own `Users/Nate/Originals/` and `Song Seeds/` are NOT this and are not shared** — with one
exception he asked for on 2026-09-10: **`I would hate me now` was MOVED onto the board** (move, not
copy — his call, so nothing drifts). `wewereondrugs` stayed private.

That exception is the shape of the rule, not a hole in it: **moving a note in is a DECISION**, made
one song at a time, that puts its lyrics and production notes on a remote for good. He asked for a
shared board, not a shared folder.

### What the page deliberately does not own

- **Tests.** Lesson tests, finals, midterms and exams stay in chat — blind, one question at a time. The
  page's *Mark lesson complete* button is the manual fallback, exactly equivalent to `/school lesson`; the
  real gate is still a passing test.
- **The curriculum.** Edit the notes, then rebuild. Nothing *taught* is authored in the page.
  **spec-179 is the one exception and it is deliberately outside the curriculum**: the Originals
  board takes writing from the page, but what it writes is song ideas in `Originals/`, never a
  concept, a lesson or a course. Nothing on that board is assigned, due or scored. If a future
  feature wants to author teaching material here, this line still says no.
- **Homework in the course notes.** The page's homework ticks live in `progress-<user>.json` under
  `homework`, keyed `course:lesson:block+index` — **never** in the shared course notes' `- [x]` boxes.
  Those notes are shared with Britt, so per-person state in them would leak one person's homework into
  the other's page on the next rebuild. Same rule as spec-155. Don't "restore" the note write-back.
- **Scheduling.** Retired 2026-08-20 — `/today` and `/practice` no longer serve the daily drip; the page is the only daily school surface. See "The vault surfaces are retired" at the top.
- **Nate's own song-practice notes.** `20 Music/Users/<Name>/Songs/**` are the Obsidian plugin's surface —
  per-instrument spaced repetition driven by an in-note `song-controls` block that cannot run here. The page
  owns the SHARED `Song Library/`, and the ~77 `[[🎵 …]]` links into the personal copies are deliberately
  left inert by the link closure below. Pulling those pages in would ship the reading and none of the controls.

### Lists that Obsidian draws and the page did not (2026-09-10)

Nate: *"fix the lists thing."* `_MD` runs Python-Markdown with **`sane_lists`**, which will not start
a list on the line after a paragraph — it is there to stop a stray hyphen mid-sentence becoming a
bullet. Obsidian has no such rule. So a note written and previewed in Obsidian rendered as a list
there and as **one run-on paragraph here, hyphens and all**. Measured across `School & Content/`:
**251 notes** are written that way.

`tight_lists()` in `build.py` inserts the blank line at RENDER time, immediately before
`wikilinks()`/`callouts()` so it sees raw source rather than emitted HTML. **Result: +198 lists and
+719 bullets recovered, and `<li><p>` stayed at zero** — no previously-tight list was broken loose.

- **Fixing the notes was the wrong lever** — 251 files, and the next note typed re-breaks it.
- **Dropping `sane_lists` was too blunt.** It guards the mid-sentence-hyphen case, and this corpus is
  full of em-dashed prose that would trip it.
- **Ordered forms are capped at two digits.** `\d{1,9}` would match a line opening "1985. It was a
  good year", and the inserted blank line is what would TURN that into a list — the rule would
  manufacture the bug it exists to prevent.
- **Four guards**, each ruling out a place the insert would change meaning: fenced code; an indented
  predecessor (a lazy continuation or nested list — breaking there turns a tight list loose); a
  predecessor that is itself a list item; and headings, blockquotes and table rows, after all of
  which markdown already starts a list.

### The link closure (PATCH-159, 2026-09-07)

Nate: *"guitar positions isnt linked on the page. make sure all links work in the school system."*
Before it, 2,437 of the page's 4,550 `[[wikilink]]` spans were dead grey text — PATCH-144 gave a page only
to notes a **Read** line ASSIGNS, and everything merely *referenced* (Guitar Positions among them) had
nowhere to go. `build.py` now walks outward from the pages the bundle already has and gives every note it
reaches a **reference page**, capped far shorter than an assigned one. Result: **163 dead spans of 7,144**.

**It is budgeted, and the budget is the thing to watch.** `REF_CAP` (2,600 chars a page) and `REF_BUDGET`
(2.8 MB of HTML) are at the top of the closure block in `build.py`. The run prints what it spent and, if it
ran out, which notes it could not reach — treat a non-zero *"still dead"* count as a real finding. The
16 MB artifact ceiling is the hard limit behind them: the bundle is **13.5 MB** now, and the uncapped
closure is 22 MB, so raising `REF_CAP` without checking the output size is how the next publish fails.

**Do not "fix" the remaining 163 by adding roots.** They are, in order: Nate's own song pages (above),
notes in `z Archive/`, links to notes that do not exist anywhere in the vault (a vault typo, fix the note),
and `Curriculum/` config/build docs that are not teaching material. None of them is a missing page.

---

## Sync hazards (PATCH-138, 2026-08-25)

`Machine/Scripts/school-artifact/` is inside Obsidian Sync's blast radius, and on 2026-08-24 that
cost real work: a second device still running an old build pushed stale copies of `app.js`,
`app.css`, `build.py` and `calendar-plan.py` over the current ones. Two things follow.

- **`sync-shared.sh` now refuses to mirror a file that has gone backwards** — differs from what is
  committed *and* is older than that commit. That is a restored snapshot, not an edit. It stops
  before copying anything, and the repo is then the recovery source (`cp ~/hyperion-shared/<path>`).
  Without this the script mirrored the corruption onto the repo's good copies, which is how the only
  clean copy nearly got lost.
- **The real fix is to stop syncing the source** — and as of **2026-08-31 that is the decision, for
  the whole folder rather than just the sources.** Nate: *"stop shipping school through obsidian
  sync. i wont be using the boox anyways."* Exclude `Machine/Scripts/school-artifact/` under
  **Settings → Sync → Selective sync** on every device. Until that is done, treat a device that has
  been closed for a while as loaded: open it and let it finish syncing *before* editing here.

  **What that costs, stated plainly:** the offline pane reads `school.html` from the vault, so once
  the folder stops syncing, **the plugin only works on the machine that runs `build.py`.** No other
  device gets a bundle at all. That is the accepted trade — the Boox is out of use, and every other
  device can open the artifact URL, which is always current and never had a size cap to dodge.

  **What it buys:** the 4.6 MB ceiling is gone, so nothing is stripped from the build to make it
  fit a transport that no longer carries it. `progress-<user>.json` is ~4 KB and still syncs — the
  state was never the problem.

  **`school-lite.html` is gone too — retired 2026-09-01** (Nate: *"i think i want to abandon
  school-lite"*). It survived the 08-31 change as "the copyright-clean copy", but that reason did
  not hold up: `sync-shared.sh` ships build **sources**, never built HTML, and excludes `Books/`
  outright — so Britt's own build is scan-free without any help. Its last real job was the offline
  pane on a phone or tablet, and nobody reads it there. **The copyright gate is unchanged and never
  lived in lite**: it is `BOOKPAGES[c.book]` returning undefined for a book not in the bundle, with
  every reader written as `bk ? … : []`. One build now; both offline panes read `school.html` and
  the `auto · lite` toggle is gone.

Related: the offline pane deliberately writes only `progress-<user>.json` (~4 KB), never the 9 MB
bundle, so ordinary use does not put the build in flight at all.

---

## Notes

- **The answer key is Machine-side on purpose.** Never surface it in chat before grading, never link it from `00 Human/`.
- **Courses never restate content.** A course links vault notes in order and adds drills and a test. If a course finds itself explaining the material, the material belongs in a note and the course should link it.
- **Concept notes are thin.** A question, an answer, why it matters, a drill, a source link. They are SR wrappers — the teaching lives in the note they point at.
- **Every strand has backing notes.** Verified 2026-08-12 — all 147 concepts resolve to a note that exists. The load-bearing rule above is what keeps it that way.
- **NOT and VOI (added 2026-08-03) are the exception** — both were added *after* their backing notes existed, not before. NOT is backed by `Theory/Notation.md` (rewritten), `Theory/Reading Bass Clef.md`, `Theory/Sight Reading.md` and `Guitar/Reading Notation on Guitar.md`; VOI by `Guitar/Chord Voicings.md`. If you re-place later, these two should behave differently from the unbacked strands — a low score there is a genuine gap, not an untaught one.
- **Audio regeneration is idempotent** — the renderer skips existing files unless `--force`. `--list` shows what it would write; `--selftest` pitch-verifies what's there.
- The renderer needs **no pip installs**. It uses `fluidsynth` + the system GM soundfont when both are present, and falls back to built-in stdlib additive synthesis otherwise. Both paths produce identical pitches, so the key is valid either way.
- House rules apply: newest-first ordering, Human/Machine boundary, vault-relative paths.
