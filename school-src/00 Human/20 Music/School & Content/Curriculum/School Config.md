---
type: school-system-config
---

# School Config

Tunable settings for the **Music School** — the assessment/curriculum system in `20 Music/School/`. Edit values in the `config` block below to tune behavior; no code changes needed.

This is a separate system from the song spaced-repetition engine ([[Song System Config]]) and the practice teacher ([[Practice System Config]]). Concept reviews render in the same daily homework block the practice system serves — in their own **tier-1 coursework section**, not routed into a practice lane — but the two engines keep their own settings.

**The school is live, and it lives on its published page** — `Machine/Scripts/school-artifact/`. The `concepts:` and `courses:` blocks below are read by `build.py` (which builds the page) and by the plugin's read-only drill catalogue. The Obsidian school UI was deleted 2026-08-24: no vault surface renders, enrolls, or writes school state any more.

**The school is tier 1.** Coursework is scheduled, paced and graded — it is not chosen. The six practice lanes in [[Practice System Config]] are tier 2: they fill whatever minute budget is left after the day's lesson, its applied task, and its concept reviews. See the `## Tiers` section there.

```config
theory_strands:                 # the theory subject taxonomy, in display order
  - key: FND
    label: Fundamentals
    emoji: 🎼
    sources: Notes & Pitches, INTERVALS, Key Signatures, Keys, Time Signatures & Note Values, Circle of Fifths, Dynamics & Articulations, Transposing Instruments
  - key: NOT
    label: Notation & Sight Reading
    emoji: 🎼
    sources: Notation (rewritten 2026-08-03), Reading Bass Clef, Reading Notation on Guitar, Sight Reading, Books/A Modern Method for Guitar. Added 2026-08-03.
  - key: CHD
    label: Chords
    emoji: 🎹
    sources: Chords, Seventh Chords, Extended Chords, Add Chords, Suspended Chords, Augmented Chords, Diminished Chords, Altered Chords, Chord Inversions, Chord Naming by Context
  - key: VOI
    label: Chord Voicings & Comping
    emoji: 🎸
    sources: Chord Voicings (new 2026-08-03), Chord Inversions, Chord Progressions, Books/Joe Pass Guitar Chords. CHD tests spelling a chord; VOI tests arranging and playing it.
  - key: SCL
    label: Scales & Modes
    emoji: 🪜
    sources: Scales, Diatonic Modes, Scale Modes Reference
  - key: HAR
    label: Harmony
    emoji: 🧩
    sources: Chord Progressions, Chords by Key, Cadences, Non-Harmonic Tones, Secondary Dominants, Secondary Subdominants, Borrowed Chords, Parallel Minor, Modulation, Neapolitan Sixth, Augmented Sixth Chords, Chromatic Bass Lines
  - key: MEL
    label: Melody Writing
    emoji: 🎶
    sources: Techniques/Melody Writing, Motivic Development. Sits in theory rather than production — it's composition.
  - key: POP
    label: Popular & Contemporary
    emoji: 🔊
    sources: Loop-Based Harmony, Modal Pop, The Axis Progression, Chord Progressions
  - key: BLU
    label: Blues
    emoji: 🎸
    sources: Blues Form and Harmony, Blues Scales and Blue Notes, Turnarounds
  - key: JAZ
    label: Jazz
    emoji: 🎺
    sources: Jazz Harmony, The ii-V-I, Chord Substitution, Guide Tones, Turnarounds, Reharmonization,
             Bebop Vocabulary, Rhythm Changes, Modal Jazz (all written 2026-08-09), plus Blues Form and
             Harmony, Upper Structure Chords, Secondary Dominants, Scale Modes Reference. Expanded from
             "dip a toe" to comprehensive by Nate 2026-08-09 — the old shallow scope no longer applies.
  - key: RHY
    label: Rhythm & Groove
    emoji: 🥁
    sources: Groove and Microtiming (written 2026-08-09 — the sourced evidence base: Witek 2014 on the
             syncopation inverted-U, Frane 2017 on hip hop swing ratios, Datseris 2019 and Kilchenmann &
             Senn 2015 on microtiming), Syncopation and Metric Displacement, Time Signatures & Note Values,
             Production/Techniques/Rhythm and Groove, Pocket and Microtiming, Genre Drum Patterns
  - key: CPT
    label: Voice Leading
    emoji: ✍️
    sources: Part-Writing, Vocal Harmony (species counterpoint cut from the assessment)
  - key: 20C
    label: Impressionism & Modern Colour
    emoji: 🌀
    sources: 20th-Century Harmony (serialism, set theory and aleatoric music cut from the assessment)
  - key: EAR
    label: Ear Training
    emoji: 👂
    sources: Scale Degree Ear Training, Transcribing and Playing by Ear (both written 2026-08-05 from the
             @maxkonyi enrichment), plus INTERVALS, Seventh Chords, Chord Inversions, Chord Progressions,
             Cadences, Keys. Backs Course 09.

production_strands:             # the production subject taxonomy, in display order
  - key: SYN
    label: Synthesis Principles
    emoji: 🎚
    sources: Production/Synthesis/ — Signal Path, Envelopes and ADSR, LFOs and Modulation, Voice
             Architecture, Subtractive Synthesis, FM Synthesis, Granular Synthesis
  - key: SMP
    label: Sampling & Warping
    emoji: ✂️
    sources: Techniques/Sampling and Sound Selection (mostly about selection, not method)
  - key: VOX
    label: Vocal Production
    emoji: 🎤
    sources: Vocal Comping and Takes, Vocal Tuning, Vocal Stacks and Ad-libs, Vocal Mic Technique,
             Rap Vocal Production
  - key: FX
    label: Effects & Production
    emoji: 🎛
    sources: Production/Effects/ (effect-type pages — never plugin-specific).
  - key: MIX
    label: Mix & Handoff
    emoji: 🎛
    sources: nine Production/Techniques component notes plus Mix Handoff
  # --- Added 2026-08-06 from the 116-video enrichment batch. Courses 14/15/16 teach these
  # from zero — no prior knowledge assumed, nothing skipped — scheduled into weeks 13-17.
  # Assume low rather than average: pitching a course too low costs some cheap revision,
  # pitching it too high silently skips the one thing that was actually unknown. The lesson
  # test is the escape hatch — sit it early when the material turns out to be known.
  - key: DRM
    label: Drum Programming & Beats
    emoji: 🥁
    sources: Rhythm and Groove, Pocket and Microtiming, Kick Design, Snare Design, Genre Drum Patterns,
             Layering and Stacking, Sampling and Sound Selection. Distinct from the RHY theory strand:
             RHY is meter/subdivision/feel, DRM is sample choice, envelopes, velocity and grid execution.
  - key: ARR
    label: Arrangement & Song Form
    emoji: 🎬
    sources: Arrangement and Song Form (39 new citations in the batch — the most-enriched note in the
             vault), Automation, Layering and Stacking, Ear Candy and Hiding Synths,
             Referencing and Translation, Theory/Musical Form.
  - key: BAS
    label: Bass Writing & Design
    emoji: 🎸
    sources: Bassline Writing, Bass Design, Kick Design (the kick/bass clash), Sidechaining,
             Masking and Carving, Chromatic Bass Lines. Scoped per Theory Gaps §4 — writing and
             arrangement only, explicitly NOT instrument pedagogy.

audio:
  dir: 00 Human/20 Music/School/Audio
  sample_rate: 44100
  renderer: auto                # auto | stdlib | fluidsynth
  soundfont: /usr/share/sounds/sf2/default-GM.sf2
  tonal_centres: C, A           # keep timbre/register from becoming the confound

# ---------------------------------------------------------------------------
# Concepts, courses and the semester.
# ---------------------------------------------------------------------------
concepts:
  folder: 00 Human/20 Music/School/Concepts
  sr: inherits [[Song System Config]] sr — do not duplicate the numbers here
  daily_drip: 3                  # concept reviews per day in the homework block
  # drip_lanes retired (spec-146): school work is tier 1 and renders in its own
  # ### 🎓 Coursework block above the lanes, not routed into theory/production.
  # Those two lanes go back to pure tier-2 practice content.

tests:
  folder: 00 Human/20 Music/School/Tests
  lesson_pass: 75                  # a lesson test is a CHECKPOINT, not a gate
  final_pass: 80                 # a course final completes the course
  midterm_pass: 80
  exam_pass: 80
  lesson_questions: [8, 15]     # widened from [8, 12] on 2026-09-01 — see the sizing rule below.
  final_questions: [12, 25]     # widened from [16, 25] on 2026-08-11 (Nate's call). Course 14's
                                 # final is 12 questions and Course 15's is 14, both at 85% — small
                                 # concept surfaces (six and seven) where the higher pass bar matters
                                 # more than the count. The course pages are the specific authority;
                                 # the floor now stops contradicting two shipped pages.
  midterm_questions: [40, 80]   # widened from a flat 40 on 2026-09-01 (Nate: "it can be more
                                 # questions if needed"), same pattern final_questions already
                                 # follows: a RANGE here, with the test page as the specific
                                 # authority.
                                 #
                                 # Class 1 went 3 courses / 26 concepts -> 5 / 55 when Courses 29
                                 # (CHD) and 30 (VOI) landed. Theory Midterm 1 runs roughly one
                                 # question per concept per course part plus synthesis and
                                 # listening, so holding it at 40 would have meant thinner coverage
                                 # of every concept rather than a shorter exam. It is ~62 now.
                                 #
                                 # The other two midterms are UNAFFECTED and stay at 40 — they close
                                 # smaller classes. This is a range precisely so one paper growing
                                 # does not drag the others with it.
  exam_questions: [30, 80]      # widened from a flat 60 on 2026-09-01 — see the sizing rule below.
                                 # The LOW end moved too, deliberately: Class 10 (Jazz) closes over
                                 # 26 concepts and needs ~32 questions, which a floor of 40 would
                                 # have padded. A range has to bind in both directions or it just
                                 # relocates the original problem.
  # ---------------------------------------------------------------------------
  # SIZING RULE (2026-09-01) — Nate: "it can be more questions if needed… same goes for any class
  # or course."
  #
  # Every count in this block is a RANGE and a piece of guidance. **The page is the authority.**
  # Coverage drives size; size does not drive coverage:
  #
  #   * A test is long enough when every concept in its scope is actually tested. If that takes 15
  #     questions, write 15.
  #   * A course has as many lessons as the backing notes carry testable ideas. If a strand's
  #     library supports six lessons, write six — Course 30 (VOI) has 30 backing notes in
  #     `Guitar/Chords & Comping/` alone, and Course 31 (JAZ) has 17 in `Theory/Jazz/`.
  #   * A class grows when courses are added to it, and its exam grows with it. Theory Midterm 1
  #     went 40 -> 72 when Class 1 went 26 -> 55 concepts, because holding the count would have
  #     meant thinner coverage of every concept rather than a shorter exam.
  #
  # THE RULE DOES NOT RUN THE OTHER WAY. Nothing here licenses padding. A concept exists because it
  # is one testable idea with a backing note; a question exists because it tests one. The
  # load-bearing rule still governs: never write a course, a lesson or a test question for material
  # with no backing note.
  # ---------------------------------------------------------------------------
  gate_lessons: false              # failing a lesson test does NOT block the next lesson.
                                 # Deliberate: a hard gate turns one bad afternoon into a stalled
                                 # semester, and the SR drip already re-surfaces what was missed.

classes:
  folder: 00 Human/20 Music/School/Classes
  standing: ["4"]                # Class 4 (Ear Training) only. Not a scheduled block, gates
                                 # nothing, `load: routine` (~10 min/day), and it keeps running
                                 # after its last lesson because the skill decays.
                                 #
                                 # 2026-08-20 (spec-172): classes 8 and 9 LEFT this list. Guitar
                                 # Sight Reading and Piano Technique were standing for one reason —
                                 # a book that never ends can't set a term end date, so the whole
                                 # class had to sit outside the schedule. Splitting the books into
                                 # ordinary courses (19-24 Hanon, 25-26 Reading) removes that
                                 # reason, so both classes schedule like any other now. The daily
                                 # habit is unchanged; only the bookkeeping is. Their class notes
                                 # already carry `standing: false` — this list is what build.py
                                 # actually reads (`classes.standing`), so leaving 8/9 here would
                                 # have made the page contradict the notes.

courses:
  folder: 00 Human/20 Music/School/Courses
  # active_limit REMOVED 2026-08-24. It was derived (taught_limit + len(standing)), guarded
  # nothing, and its only reader was the Learning card's enrolled counter — which was deleted
  # with the rest of the vault school UI. build.py never read it. Use taught_limit.
  taught_limit: 2                # max TAUGHT courses in flight, across theory and production. This
                                 # is the real READING load. Standing courses are excluded from the
                                 # count entirely rather than subtracted from a combined limit — and
                                 # since 2026-08-20 so are instrument courses, which have their own
                                 # allowance below. See the guard paragraph under "Phase 2".
  instrument_limit: 2            # spec-172 Phase 3b, 2026-08-20 — the instrument lane's OWN
                                 # allowance, deliberately NOT part of taught_limit. Nate: "give
                                 # instrument its own lane and lessons per week", so the answer to
                                 # the question the Phase 2 comment left open is: they do not
                                 # compete for a taught slot.
                                 #
                                 # 2, because the two instrument classes are two different
                                 # instruments — Class 9 (Piano Technique, courses 19-24) and Class
                                 # 8 (Guitar Sight Reading, 25-26). Both were STANDING daily habits
                                 # before this spec, i.e. both ran every day at once. An allowance
                                 # of 1 would have quietly ended that; 2 preserves exactly what
                                 # they already were, one open course per instrument.
                                 #
                                 # The 3-a-week pace is shared ACROSS the lane, not per course —
                                 # same as theory's 2. Two open instrument courses split three
                                 # lessons a week between them, in `instrument` array order.
  standing: ["09"]               # Courses that run daily alongside everything else and never block a
                                 # slot. 09 (Ear Training Method) installs a ~10-min daily routine and
                                 # keeps running after it completes, because the skill decays.
                                 #
                                 # 2026-08-20 (spec-172): 17 and 18 are GONE — not un-standinged,
                                 # RETIRED. Sight Reading became courses 25-26 and Hanon became
                                 # 19-24, all eight ordinary, none standing. Do not add them
                                 # back: a standing course is excluded from the schedule outright,
                                 # and putting these back would undo the whole spec.
                                 #
                                 # UPDATED 2026-08-20 (Phase 3b): those eight rode the `theory`
                                 # array for one afternoon and now ride their own `instrument`
                                 # array in Machine/School/syllabus.json — a third TRACK, paced by
                                 # instrument_lessons_per_week and capped by instrument_limit.
                                 # syllabus.json now has THREE order arrays, not two.
                                 #
                                 # CORRECTED 2026-08-20: this list read ["13","17","18"] while its own
                                 # comment called 13 "Ear Training". Course 13 is *Signal Path &
                                 # Synthesis Methods*, sitting in non-standing Class 6 (Sound Design);
                                 # the daily ear routine is Course 09, whose Class 4 has always been a
                                 # standing class. The comment was right and the number was wrong, so
                                 # the number moved. Consequence to expect: 09 no longer consumes one
                                 # of the two taught slots, and 13 now does.
                                 #
                                 # The numbers are NOT arbitrary — they are domain blocks: theory
                                 # 01-09, production 10-16, instrument 19-28 (17-18 retired, and the
                                 # gap is left as a gap on purpose — old progress keys referenced
                                 # them). Do not renumber a course across a block to tidy this list.
                                 #
                                 # THEORY HAS A SECOND RANGE — 29-31, added 2026-09-01 (spec-182).
                                 # Theory 01-09 was FULL and renumbering is forbidden by the line
                                 # above, so the three courses that closed the empty strands went on
                                 # the end instead: 29 Chord Vocabulary (CHD) and 30 Voicings &
                                 # Comping (VOI) in Class 1, 31 Jazz Harmony (JAZ) in the new Class
                                 # 10. Nate's call: "29/30/31 and add chd to class one."
                                 #
                                 # So "theory is 01-09" is no longer true and a reader must not infer
                                 # a course's domain from its number alone — read `domain:` off the
                                 # course note. The blocks are now theory 01-09 + 29-31, production
                                 # 10-16, instrument 19-28.
                                 #
                                 # LOAD-BEARING — this was a list-of-one until 2026-08-09 and the guard
                                 # compared taught courses against `active_limit - 1`, hardcoded to
                                 # exactly one standing course. A second standing course silently made
                                 # that arithmetic allow an extra TAUGHT course, which is the one thing
                                 # the limit exists to prevent. Count taught courses against
                                 # `taught_limit` and exclude EVERY id in `standing`. Never subtract.

semester:
  # PATCH-001 (spec-171, 2026-08-19): start/weeks are AUTHORITATIVE HERE — this is the one
  # place to hand-edit the semester's dates. Machine/School/syllabus.json's semester.start
  # / semester.weeks are a generated mirror that build.py overwrites on every rebuild to
  # match what's below (its `end` gets recomputed too, as the undrifted start+weeks*7-1,
  # unless a start/weeks change wasn't detected). syllabus.json still owns `end` day-to-day
  # once `/school replan --apply` has run — that command is drift-aware (it reads `rows` +
  # progress) in a way a plain start+weeks formula isn't — and it owns `rows` outright.
  # Edit dates here, then rebuild the artifact (`python3 Machine/Scripts/school-artifact/
  # build.py`) to push the change through.
  start: 2026-08-10
  weeks: 17                      # 13 → 17 on 2026-08-06, absorbing DRM/ARR/BAS (9 lessons).
                                 # End moves Nov 8 → Dec 6. The theory track still finishes
                                 # week 13; weeks 14-17 are production-only, which is why the
                                 # tail runs 2 prod lessons/week without raising the weekly load.
  theory_lessons_per_week: 2
  production_lessons_per_week: 1
  instrument_lessons_per_week: 2   # spec-172 Phase 3b, 2026-08-20; lowered 3 -> 2 on
                                 # 2026-08-21. Nate: "for hanon: make it max 2 lessons per
                                 # week. takes time to learn each one."
                                 # An instrument lesson is not a reading block — a Hanon
                                 # lesson is ONE exercise played at its own printed mark, and
                                 # the work is repetition, not comprehension. Two new
                                 # exercises a week leaves five days to consolidate the ones
                                 # already open. This is the LANE's pace, and the lane deals
                                 # round-robin, so 2 is the CEILING Hanon can ever hit (alone)
                                 # and it drops to ~1/week while a Reading course is also
                                 # enrolled. At 2/week the 60 Hanon lessons run ~30 weeks.
                                 #
                                 # AUTHORITATIVE HERE, like start/weeks. build.py mirrors all
                                 # three *_lessons_per_week into Machine/School/syllabus.json's
                                 # semester{} on every rebuild, because school-replan.cjs and
                                 # the Learning card read that file rather than this one.
  schedule: 00 Human/20 Music/School/Syllabus — Fall 2026.md
  plan: Machine/School/syllabus.json   # the machine-readable copy /school replan rewrites
  float: true              # the end date slides rather than compressing later weeks
```

## Phase 2 — how it works

**Courses are ordered syllabi over notes that already exist.** A course doesn't restate content; it points at vault notes in a deliberate order and adds the drills and the lesson test. **A course over a strand with no backing notes doesn't get written until those notes are** — see [[Coverage Review 2026-08-09]]. That constraint is what keeps the school honest: an empty course that links nothing would look like progress and teach nothing.

`taught_limit: 2` is the load control, and with `standing: ["09"]` that reads as **two taught courses plus one standing** — ideally one taught course per domain, so the long theory road and the short production one run in parallel without either stalling. The standing slot is reserved for `courses.standing` and is not a third reading course. **`instrument_limit: 2` is a separate budget on top of that** — see "Instrument has its own lane" below.

**The guard is `taught_count < taught_limit`, with every id in `courses.standing` — and every course whose `domain` is `instrument` — excluded from the count.** It is *not* `active_limit - 1` — that older arithmetic hardcoded exactly one standing course, so a second one silently allowed an extra taught course, which is the one thing the limit exists to prevent. (`active_limit` was display-only and derived; the key was removed 2026-08-24 with the surface that displayed it.) This paragraph used to describe the subtracting version and contradicted the config block above it; corrected 2026-08-20 (spec-172). Instrument courses run the same guard against `instrument_limit`, on their own count.

**Instrument has its own lane** (spec-172 Phase 3b, decided by Nate 2026-08-20: *"give instrument its own lane and lessons per week."*). The eight instrument courses (19–26, 68 lessons) are ordinary, non-standing courses, but they ride a **third track array** — `instrument` in `Machine/School/syllabus.json`, beside `theory` and `prod` — at `instrument_lessons_per_week` (2), and they are counted against `instrument_limit` (2) rather than `taught_limit`. **`taught_limit` stays 2 and instrument work never consumes a taught slot.** So the full picture is: two taught courses, plus two instrument courses, plus every standing course, all open at once.

The reason it is a separate number and not a bigger `taught_limit` is that the two loads are not the same thing. A taught slot is a reading-and-quizzing commitment; a Hanon lesson is ten minutes at the keys with a metronome. Adding them into one budget would mean opening Hanon closes a theory course, which is the outcome the decision exists to prevent.

### The semester floats

`semester.float: true` means the **end date is not hard-held**. Pushing work slides the plan rather than compressing later weeks — but `/school replan` always states the price in plain language (*"moves the semester to Nov 15 and BLU u3 falls off the end"*). Feel the slip; don't get punished by it. The teacher states a cost **once**, accepts the answer, and adjusts. No nagging.

`semester.plan` (`Machine/School/syllabus.json`) is the machine-readable schedule: which lessons land in which week, plus the course catalogue. `/school replan` rewrites it and regenerates the syllabus note; `Machine/Scripts/school-syllabus-render.py` renders the PDF from it.

### Course dependencies

Every course note carries **`depends_on:`** — a list of `course_id` strings, empty where there are none. It exists so `/today`'s **swap** offer can't propose taking HAR before FND.

**A dependency is satisfied when that course is `enrolled` or `completed`** — not requiring `completed`. That is deliberate and it is what the syllabus itself does: SCL u1 is scheduled in the same week as HAR u4, so a completion rule would make the shipped plan illegal on its own terms. The point of the field is to stop a *swap* pulling a course ahead of its grammar, not to serialise the semester.

The graph comes from the syllabus's stated reasoning plus what the course notes say outright (Course 03: *"Course 02 — do that first; this leans on it"*). Production courses have empty lists — 02, 07 and 09 each say in so many words that nothing depends on them. **Where the syllabus is silent, prefer an empty list**: a false dependency blocks a legal swap, which is worse than a missing one.

### Course lifecycle

A course's `strands:` is a **list** — most courses cover one strand, but a course may span several when the material is really one subject (Course 16 covers MIX and SMP, because handoff and clearance are both "settle this before a release").

`available` → `enrolled` → `completed` (spec-156, 2026-08-12 — renamed from `planned`/`active`/`complete`; **`completed` matches the `completed:` date field**, so the status and the date agree). This status, and **`lessons_complete:`** (bumped by enrolling a course, passing a lesson test, or the manual "lesson done" fallback — `/school lesson <id> <n>`; what `/school course <id>` reports as `lessons n/m`), live in `Machine/School/progress-<user>.json` → `courses["<course_id>"]` — **not** in the course note's own frontmatter (spec-155, 2026-08-12: the shared tree is stateless so it can be shared between Nate and Britt). The Learning card's **course rows** derive progress from released concepts instead, so per-course progress can't disagree with the drip; its **semester band** reads `lessons_complete` directly from the progress file, because pace is a question about lessons, not cards. A course completes by passing its final at `final_pass`, which also seeds every concept to `maintenance`. A failed final leaves it `enrolled` and re-seeds only the missed concepts to `sr_interval: 0`.

### Class lifecycle (spec-156, 2026-08-12)

`available` → `enrolled` → `completed`, default `available`. Classes previously had exactly one status (`active`) so every class was always active — there was no such thing as not being enrolled. Enrolling a class is a standalone declaration; it does **not** auto-enroll its courses. Un-enrolling sets the class back to `available` without touching any course, lesson or concept progress underneath it — re-enrolling resumes exactly where it left off. Lives in `Machine/School/progress-<user>.json` → `classes["<class_id>"]`, same store-deltas-only rule as courses.

### Concept notes

One note per testable idea, in `concepts.folder`. They are **thin SR wrappers, not content** — a question, its answer, a link to the note that teaches it, and SR state. The answer sits in the concept note because the drill needs it inline; the *teaching* stays in the linked vault note.

```yaml
type: school-concept
domain: theory                                    # theory | production
strand: FND
course: "[[Course 01 — Derivation Rules]]"    # blank if unattached
source: "[[Key Signatures]]"                      # the note that teaches it
```

**SR state (`status`, `sr_interval`, `sr_ease`, `sr_due`, `last_practiced`, `sr_last_rating`) is per-person and lives in `Machine/School/progress-<user>.json` → `concepts["<concept basename>"]`, not here** (spec-155). Defaults when a concept has no entry yet: `status: queued`, `sr_interval: 0`, `sr_ease: 2.5`, the rest blank.

Ratings mirror the song engine exactly — ⚡ automatic / 🙂 solid / 😬 rusty / 💀 forgot — and so does the math, so `process-homework` needs no second SR implementation.

**What the top two ratings mean** (renamed 2026-08-27, PATCH-157 — was `nailed`): the split is about *how* the answer arrived, not whether it was right. Both are correct answers.

- **⚡ Automatic** — recall was immediate, no working it out. Terminal: the quiz retires from the rotation.
- **🙂 Solid** — right answer, but you had to think. Stays on the ladder: ease +`ease_step`, interval × ease.

Nate: *"i want to rename nailed to 'automatic' or something where the answers recal is automatic without much thinking. solid is still the right answer but required more thinking."* The old name described the outcome, which is exactly the thing that does **not** distinguish the two tiers — and is why `nailed` drifted into four different meanings across four surfaces (see [[_Shakedown 2026-08-24]]). `🎯` is still accepted on read everywhere; nothing written before the rename was invalidated.

**The SR numbers live in one place only.** [[Song System Config]]'s `sr:` block (start 2 / min 2 / max 90 / ease 2.5 / step 0.15) is the single source of truth for **both** songs and concepts. They used to be duplicated here byte-for-byte with nothing keeping them in sync, which is a drift risk when "identical math" is the whole design premise. `concepts.sr` above is now a pointer; `process-homework` and `/school drill` both read the numbers from Song System Config.

## Notes

- **The subject taxonomy is 22 strands** — 14 theory, 8 production — and it is the stable spine of the school. Courses, concepts and tests all key off it. Strands are a *taxonomy*, not a score: nothing here records how well anything was known.
- **Weighted toward the music Nate actually makes.** Set 2026-08-02 at his request: *"focus on pop and modern day over classical, blues is important, applicable to the music I make."* POP, BLU, JAZ and RHY are the applied strands and carry the most weight; CPT and 20C are deliberately light.
- **JAZ was expanded from "dip a toe" to comprehensive on 2026-08-09.** The original shallow scope no longer applies — see [[Jazz Harmony]] and [[Coverage Review 2026-08-09]].
- **RHY came from a vault audit, not from Nate.** Rhythm was the thinnest subject in the library despite hip hop, trap and EDM being his core lanes. Backed properly 2026-08-09 with [[Groove and Microtiming]].
- **NOT and VOI were added 2026-08-03**, both *after* the vault gained notes to back them. NOT exists because a vault with three guitar method books and a sight-reading practice lane had almost nothing on notation. VOI exists because CHD covers whether you can *spell* a chord and nothing covered whether you can *arrange and play* one — the actual guitar skill.
- **Every strand has backing notes and a course.** Verified 2026-08-12: all 147 concepts resolve to a note that exists. The load-bearing rule holds — never write a course, or a test question, for material with no backing note.
- **DRM, ARR and BAS are taught from zero.** They were added 2026-08-06 because the enrichment batch backed them heavily. No diagnosis sits behind them, so they assume nothing and skip nothing; the lesson test can be sat early if a lesson turns out to be known.
- **The assessment layer was deleted 2026-08-09** (spec-147). No diagnostics, no results notes, no scores, no levels, no `/school assess` or `/school grade`. The ear-training WAVs survive in `School/Audio/` because they are test material, not assessment material. The school is a teaching system now, not a diagnostic one.
