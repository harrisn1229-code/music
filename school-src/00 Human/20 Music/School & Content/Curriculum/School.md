---
type: school-hub
updated: 2026-08-21
phase: 2
---

# 🎓 Music School

A structured way to actually **learn** what's already in this vault.

The theory library, the effect pages, the technique notes — 48 Theory notes, 10 Effects pages, 34 Techniques, hundreds of YouTube extractions — that's a textbook. It was all reference material with nothing testing whether any of it stuck. This is the school built on top of it.

**The notes are the textbook. The school is the syllabus, the testing, and the schedule.** Nothing here duplicates content that already exists elsewhere in the vault; courses point at the notes you already have.

## How this works

Four levels, each named the way school names them:

- **Class** — a block of related courses, closed by an exam. **Ten** of them.
- **Course** — an ordered syllabus over notes that already exist. **Twenty-nine**: nineteen taught, one standing (ear training), and nine instrument courses across the two books.
- **Lesson** — one sitting: a short reading, the material in bullets, and homework. 53 in total.
- **Concept** — one testable idea, in its own note, on a spaced-repetition schedule. **202** of them.

**A week looks like:** two theory lessons, one production lesson, the daily ear-training routine, and three concept reviews a day in the homework block. Lessons are worked in order; concepts arrive on their own schedule once a lesson is closed.

**Where to start:** open the class you're on below, take its first course, read lesson 1, do the homework, then run `/school lesson <course> 1` to close it and release its concepts into the drip.

> The three throttles are deliberate: **3 concept reviews a day**, **2 taught courses at a time**, and lessons gated behind the previous one. They exist so the daily load stays a load you'll actually do.

---

## 🗓 Semester plan

**17 weeks, Aug 10 – Dec 6** (extended from 13 weeks on 2026-08-06 to
absorb the four new courses). Two tracks in parallel (theory ~2 lessons/week, production ~1/week) plus
the standing daily ear drill, **53 lessons**, ending with a lesson test per course. Weeks 14–17 are
production-only — the theory track still finishes in week 13, so the tail runs two production lessons a
week without the weekly load going up.

> The standalone `Syllabus — Fall 2026` note and its PDF were deleted in spec-141 A1 — `Machine/School/syllabus.json` is the live definition, and `/school replan` re-lays the plan from it on demand.

**Follow it manually for now** — `/today` currently serves only the concept drip, and the per-lesson applied tasks aren't built. Closing that is idea #146 in [[Ideas]] (Ideating, decisions locked).

## 📚 Classes

**Class → Course → Lesson → Concept.** **Ten classes**; nine are scheduled blocks and one (ear training) is standing.

Two *taught* courses run at a time — that's the reading load, one per domain — plus two **instrument** courses on their own lane and allowance, plus the standing ear-training course, which never consumes a slot.

> [!abstract]- **Class 1 — Music Fundamentals** · theory · 21 lessons · 55 concepts · closes with **[[Theory Midterm 1]]**
> - **[[Course 01 — Derivation Rules]]** — FND · 1/4 lessons · 8 concepts · 🟢 Active
> - **[[Course 02 — Chord Function]]** — HAR · 0/4 lessons · 10 concepts · ⚪ Planned
> - **[[Course 03 — Scale Construction]]** — SCL · 0/3 lessons · 8 concepts · ⚪ Planned
> - **[[Course 29 — Chord Vocabulary]]** — CHD · 0/4 lessons · 13 concepts · ⚪ Planned
> - **[[Course 30 — Voicings & Comping]]** — VOI · 0/6 lessons · 16 concepts · ⚪ Planned
>
> Sat after [[Course 30 — Voicings & Comping]] completes.

> [!abstract]- **Class 2 — Reading & Rhythm** · theory · 6 lessons · 16 concepts · closes with **[[Theory Midterm 2]]**
> - **[[Course 04 — Reading & Position Play]]** — NOT · 0/3 lessons · 8 concepts · ⚪ Planned
> - **[[Course 05 — Subdivision, Feel & Genre]]** — RHY · 0/3 lessons · 8 concepts · ⚪ Planned
>
> Sat after [[Course 05 — Subdivision, Feel & Genre]] completes.

> [!abstract]- **Class 3 — Songwriting: Harmony & Melody** · theory · 10 lessons · 27 concepts · closes with **[[Theory Final Exam]]**
> - **[[Course 06 — Loop Harmony & Modal Colour]]** — POP · 0/4 lessons · 11 concepts · ⚪ Planned
> - **[[Course 07 — Blues Form & Vocabulary]]** — BLU · 0/3 lessons · 8 concepts · ⚪ Planned
> - **[[Course 08 — Melody Writing]]** — MEL · 0/3 lessons · 8 concepts · ⚪ Planned
>
> Sat after [[Course 08 — Melody Writing]] completes.

> [!abstract]- **Class 4 — Ear Training** · theory · 5 lessons · 14 concepts · 🔵 standing · `routine`
> - **[[Course 09 — Ear Training Method]]** — EAR · 0/5 lessons · 14 concepts · 🔵 Standing — daily
>
> Runs from day one alongside everything else and **keeps running after it completes** — the skill decays if you stop. Its material also appears as the listening section in both theory midterms and the theory final.

> [!abstract]- **Class 5 — Beat & Arrangement** · production · 9 lessons · 30 concepts · closes with **[[Production Midterm 1]]**
> - **[[Course 10 — Drum Programming & Beat Construction]]** — DRM · 0/3 lessons · 10 concepts · 🟢 Active
> - **[[Course 11 — Bass Writing & Design]]** — BAS · 0/3 lessons · 9 concepts · ⚪ Planned
> - **[[Course 12 — Arrangement & Song Form]]** — ARR · 0/3 lessons · 9 concepts · ⚪ Planned
>
> Sat after [[Course 12 — Arrangement & Song Form]] completes.

> [!abstract]- **Class 6 — Sound Design** · production · 6 lessons · 16 concepts · closes with **[[Production Midterm 2]]**
> - **[[Course 13 — Signal Path & Synthesis Methods]]** — SYN · 0/4 lessons · 10 concepts · ⚪ Planned
> - **[[Course 14 — Compressor Mechanics]]** — FX · 0/2 lessons · 6 concepts · ⚪ Planned
>
> Sat after [[Course 14 — Compressor Mechanics]] completes.

> [!abstract]- **Class 7 — Vocals & Release** · production · 6 lessons · 16 concepts · closes with **[[Production Final Exam]]**
> - **[[Course 15 — Vocal Method]]** — VOX · 0/3 lessons · 7 concepts · ⚪ Planned
> - **[[Course 16 — Handoff & Release Prep]]** — MIX, SMP · 0/3 lessons · 9 concepts · ⚪ Planned
>
> Sat after [[Course 16 — Handoff & Release Prep]] completes.

> [!abstract]- **Class 8 — Guitar Sight Reading** · instrument · 8 lessons · 0 concepts · closes with **[[Course 28 — Reading II — Position Playing, Part Two]]**
> - **[[Course 25 — Reading I — First Position, Part One]]** — NOT · 0/2 lessons · pp. 3–29
> - **[[Course 26 — Reading I — First Position, Part Two]]** — NOT · 0/2 lessons · pp. 30–59
> - **[[Course 27 — Reading II — Position Playing, Part One]]** — NOT · 0/2 lessons · pp. 60–99
> - **[[Course 28 — Reading II — Position Playing, Part Two]]** — NOT · 0/2 lessons · pp. 100–123
>
> Leavitt's *A Modern Method for Guitar*, split four ways so each course is a digestible stretch of the book. Paced at **one lesson a week** — each lesson is a dozen-plus pages with its own named pieces to play. No longer standing: spec-172 made it an ordinary class so it could schedule at all. The check is a performance rep, not a test page.

> [!abstract]- **Class 9 — Piano Technique** · instrument · 60 lessons · 0 concepts · closes with **[[Course 24 — Hanon VI]]**
> - **[[Course 19 — Hanon I]]** — ex. 1–10 · 0/10 lessons
> - **[[Course 20 — Hanon II]]** — ex. 11–20 · 0/10 lessons
> - **[[Course 21 — Hanon III]]** — ex. 21–31 · 0/11 lessons
> - **[[Course 22 — Hanon IV]]** — ex. 32–43 · 0/12 lessons
> - **[[Course 23 — Hanon V]]** — ex. 44–52 · 0/9 lessons
> - **[[Course 24 — Hanon VI]]** — ex. 53–60 · 0/8 lessons
>
> Hanon's *The Virtuoso Pianist*, **one lesson per exercise** — 60 in all, each played at its own printed mark. Split six ways along the book's own Part I/II/III divisions and at exercise 32, where the tempo marks stop being one blanket figure and start being printed per exercise. Added by spec-172; this class did not exist when this hub was last written.

> [!abstract]- **Class 10 — Jazz Harmony** · theory · 7 lessons · 26 concepts · closes with **[[Jazz Exam]]**
> - **[[Course 31 — Jazz Harmony]]** — JAZ · 0/7 lessons · 26 concepts · ⚪ Planned
>
> New 2026-09-01. JAZ was expanded to comprehensive on 2026-08-09 and seventeen notes were written to back it; the syllabus never followed until now. Deliberately its own class rather than part of Class 1 — jazz is an idiom, not a fundamental.

**Exam calendar** — six cross-course exams, each closing a class:

| Exam | Covers | Lands after |
|---|---|---|
| [[Theory Midterm 1]] | Class 1 (+ ear listening) | Course 03 |
| [[Theory Midterm 2]] | Class 2 (+ ear listening) | Course 05 |
| [[Theory Final Exam]] | Class 3, **cumulative over 1–3** (+ ear listening) | Course 08 |
| [[Production Midterm 1]] | Class 5 | Course 12 |
| [[Production Midterm 2]] | Class 6 | Course 14 |
| [[Production Final Exam]] | Class 7, **cumulative over 5–7** | Course 16 |

---
## The strands

**22 strands — 14 theory, 8 production.** The subject taxonomy the whole school keys off. Every one is backed by notes that exist; verified 2026-08-09.

### Theory

| | Strand | Backed by |
|---|---|---|
| 🎼 | Fundamentals | [[Notes & Pitches]], [[Intervals]], [[Key Signatures]], [[Keys]], [[Circle of Fifths]] |
| 🎼 | Notation & Sight Reading | [[Notation]], [[Reading Bass Clef]], [[Reading Notation on Guitar]], [[Sight Reading]], [[A Modern Method for Guitar - Enrichment|Leavitt Vol 1]] |
| 🎹 | Chords | [[Chords]], [[Seventh Chords]], [[Extended Chords]], [[Chord Inversions]], [[Chord Naming by Context]] |
| 🎸 | Chord Voicings & Comping | [[Chord Voicings]], [[Chord Inversions]], [[Joe Pass Guitar Chords - Enrichment|Joe Pass]] |
| 🪜 | Scales & Modes | [[Scales]], [[Diatonic Modes]], [[Scale Modes Reference]] |
| 🧩 | Harmony | [[Chord Progressions]], [[Cadences]], [[Secondary Dominants]], [[Borrowed Chords]], [[Modulation (Key Change)]] |
| 🎶 | Melody Writing | [[Melody Writing]], [[Motivic Development]] |
| 🔊 | Popular & Contemporary | [[Loop-Based Harmony]], [[Modal Pop]], [[The Axis Progression]] |
| 🎸 | Blues | [[Blues Form and Harmony]], [[Blues Scales and Blue Notes]], [[Turnarounds]] |
| 🎺 | Jazz | [[Jazz Harmony]], [[The ii-V-I]], [[Chord Substitution]], [[Guide Tones]], [[Reharmonization]], [[Bebop Vocabulary]], [[Rhythm Changes]], [[Modal Jazz]] — *expanded 2026-08-09* |
| 🥁 | Rhythm & Groove | [[Groove and Microtiming]], [[Syncopation and Metric Displacement]], [[Time Signatures & Note Values]] |
| ✍️ | Voice Leading | [[Part-Writing]], [[Vocal Harmony]] |
| 🌀 | Impressionism & Modern Colour | [[20th-Century Harmony]] |
| 👂 | Ear Training | [[Scale Degree Ear Training]], [[Transcribing and Playing by Ear]], [[Identifying Chord Progressions by Ear]] |

### Production

| | Strand | Backed by |
|---|---|---|
| 🎚 | Synthesis Principles | `Production/Synthesis/` — [[Signal Path]], [[Envelopes and ADSR]], [[LFOs and Modulation]], [[Subtractive Synthesis]], [[FM Synthesis]], [[Granular Synthesis]] |
| ✂️ | Sampling & Warping | [[Sampling and Sound Selection]], [[Sample Browser and Clips Workflow]], [[Sample Clearance]] |
| 🎤 | Vocal Production | [[Vocal Comping and Takes]], [[Vocal Tuning]], [[Vocal Stacks and Ad-libs]], [[Vocal Mic Technique]], [[Rap Vocal Production]] |
| 🎛 | Effects & Production | the [[Effects Index]] pages — effect *types*, never specific plugins |
| 🎚 | Mix & Handoff | nine Techniques notes plus [[Mix Handoff]] |
| 🥁 | Drum Programming & Beats | [[Rhythm and Groove]], [[Pocket and Microtiming]], [[Kick Design]], [[Snare Design]], [[Genre Drum Patterns]] |
| 🎬 | Arrangement & Song Form | [[Arrangement and Song Form]], [[Automation]], [[Ear Candy and Hiding Synths]], [[Musical Form]] |
| 🎸 | Bass Writing & Design | [[Bassline Writing]], [[Bass Design]], [[Chromatic Bass Lines]], [[Sidechaining]] |

**Weighted toward the music you actually make.** The applied strands — Popular, Blues, Jazz and Rhythm — carry the most weight; Voice Leading and Impressionism are deliberately light. The vault's theory library is a *classical* one, and left alone the school would have taught thoroughly on music you don't write.

**Mixing and mastering are scoped to how you work** — you mix as you go then send to a mixing engineer, so MIX covers judgment and delivery prep rather than mixdown mastery. Mastering appears only as what an engineer needs from you.

**Notation and Voicings are the two *playing* strands.** Everything else covers what you know about music; these two cover what you can do with a page and a fretboard.

---

## Commands

| | |
|---|---|
| `/school` | Status — active courses, concepts due today |
| `/school course` | List courses and where each stands |
| `/school course <id> start` | Move a planned course to active (respects `active_limit`) |
| `/school lesson <id> <n>` | Complete lesson *n* → its concepts enter the daily drip |
| `/school drill` | Drill every concept due today, in chat |
| `/school test <id>` | The course's lesson test → pass at threshold → complete |

---

## How grading works

Tests are graded the same way whether you type answers into the page or sit one in chat.

- **Objective** questions match against a list of accepted spellings, normalized generously — `Bb`, `B♭` and `B flat` all count, and note lists are order-insensitive. It grades the knowledge, not your notation habits.
- **Free-text** questions are read against a 5-point rubric and get partial credit, plus a note on what specifically was missing.
- **Blanks are skipped, never zero.** A blank is "didn't answer", not "got it wrong", and scoring it as wrong would understate a section you simply ran out of steam on.
- Answer keys live in a collapsed callout under each question, so you can check one question without seeing the rest.

---

## Related

- [[Music Theory]] — the theory library hub, the textbook this is built on
- [[Effects Index]] — the effect-type pages behind the FX strand
- [[School Config]] — tunables: strands, level thresholds, audio settings
- [[Song Practice]] — the song learning system (separate engine; Phase 2 will share its daily block)
- Practice Goals *(retired 2026-08-12, spec-158)* — the `theory` lane here is where school work will land
