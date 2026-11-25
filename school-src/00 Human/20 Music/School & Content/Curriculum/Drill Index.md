---
type: index
created: 2026-08-09
updated: 2026-08-23
tags: [drill, index, practice]
---

# Drill Index

> [!important] Drill vs practice routine — Nate's rule, 2026-08-12
> **Drill = a technique.** Mindless dexterity, progressed by tempo and level. Downstroke workouts, legato, slap mechanics, finger independence.
> **Practice routine = a concept.** Requires active thought. Scale workouts, interval ladders, arpeggio work where you are choosing the arpeggio.
> The gray cases resolve on that test: sweep picking is a *drill* until you are thinking about which arpeggio, at which point it is a *routine*.
>
> **Where they live:** drills in `<Instrument>/Drills/`, routines in `<Instrument>/Practice Method/`.
> **The third bucket — `practice_methodology: true` (2026-08-23).** `Practice Method/` also holds notes that are neither: **advice about how to practise**, with no exercise to do at a tempo — [[The Practice Priority Pyramid]], [[Practice Mindset — Hard Truths and Realistic Expectations]], [[The Five Essentials of Guitar Practice]] and 17 others. They correctly carry no `reinforces:` and no `classes:`, and the marker says so **explicitly** rather than leaving them looking un-triaged. Without it, `school-enrich-check.py` flags all 25 every run, the report becomes noise, and the genuinely-unwired ones hide in the pile — which is the whole reason the marker exists. Never wire a methodology note to a concept just to silence the report.
> **Which one carries `reinforces:`:** routines. A true drill usually has `reinforces: []` and that is correct — the school has no concepts for motor skill. `/school sync-drills` scans both folders.
> **They progress differently too** — drills by tempo and level, concepts by spaced repetition. Different axes, so the Drill Library is its own enrollable track (spec-160), not a concept mapping.
>
> **2026-08-13 fix:** [[Full Scale Workout]] and [[Interval Ladder]] both carried a stale `type: drill` despite living in `Practice Method/` with non-empty `reinforces:` — this rule's own test says routine. Retyped `type: technique` to match their siblings; they were never counted in the Drill Library below and their `reinforces:`/`classes:` wiring is untouched.

Technique drills — physical skill-building, browsable on their own, tracked by tempo. The table below is **live**: it reads straight from each drill's frontmatter plus your own progress file, so status and tempo here can never drift from the dashboard's Technique · Drill Library section.

> [!info] What a drill is here, and what it isn't
> A **technique drill** is a physical exercise: hands, tempo, stamina. It is *not* the same thing as the `**Drill**` item inside a school lesson's Homework block — that one means concept recall ("name the enharmonic of C♯"). Where a technique drill supports a lesson, the lesson carries a separate `**Technique**` line pointing here.
>
> **Drills are not spaced repetition.** No `sr_interval`, no `sr_ease`, no `sr_due`, no ratings. SR fights forgetting on a widening interval; a dexterity drill wants short, frequent, ideally daily reps at a rising tempo — feeding it into SM-2 would space it out exactly as it starts working. Progress here is **tempo**: the note carries `tempo_start`/`tempo_target` (the drill's own shared properties), while `tempo_current` and status live only in your progress file — never in the note, so the same drill note is honest for Nate and Britt at once.
>
> **Technique is an enrollable track, one per instrument** (Guitar/Piano/Bass Technique) — enroll from the dashboard's Learning card to bring an instrument's drills onto the active surface. A drill is always directly practiceable from its own note regardless of enrollment; enrolling is the "am I actively working this" signal, not a gate.
>
> Drills belong to the practice system ([[Practice System Config]]), not to school coursework.

```drill-library
```

---

## Guitar

Seven drills. Four from **Bernth** (Shred Guitar Community / patreon.com/bernth) — standard tuning, tab + notation; two tempo ladders (picking-hand and fretting-hand stamina) plus two short dexterity pieces. Two more arrived 2026-08-22 from **Brandon D'Eon** via `/music-enrich`: [[Five Painful Finger and Picking Exercises]] (100→130 bpm) and [[Ten Daily Fretboard-Gliding Exercises]] (60→120 bpm), both fretting-and-picking dexterity with their own tempo ladders.

**A sensible guitar session:** [[Finger Technique Exercises]] to warm up (fretting hand only) → one tempo ladder ([[Downstroke Workout]] or [[Legato Finger Strength Workout]]). About 20 minutes. On a bad day, [[Essential Patterns]] alone still counts.

**New 2026-08-22/23 (`/music-enrich`):** eight more notes landed in `Practice Method/`. Only one of them is a concept-implementing routine — [[Beyond-Linear Scale Practice Progression]] (seven ways to practise a scale past running it straight up and down), now wired `reinforces: [SCL-C05, SCL-C08]`, `classes: ["1"]` and carrying a `**Technique**` line in Course 03 Lesson 3. The other seven — [[Practice Mindset — Hard Truths and Realistic Expectations]], [[Learning Theory on the Fretboard, Not on Paper]], [[Interleaved Practice, Chunking, and Deliberate-Practice Drills]], [[The Five Essentials of Guitar Practice]], [[The Five-Category Practice Method]], [[Resolving Seven Common Guitar-Practice Debates]] and [[Recording Yourself for Self-Diagnosis]] — are **practice methodology**, not exercises, and are deliberately left with no `reinforces:`/`classes:`. That matches how the 2026-08-13 methodology notes were left; a methodology note has no concept to reinforce and forcing one on would put "read about mindset" in a homework block.

Guitar also has three **routines** that live in `Practice Method/`, not here — [[Full Scale Workout]] (modal shapes, strict alternate picking) and [[Interval Ladder]] (minor 2nd → octave, spatial interval knowledge), both of which require active theory thought and land in Class 1 with non-empty `reinforces:`; and [[Bebop Vocabulary Practice (Joe Pass Method)]] (spec-161, book-derived — phrase-by-phrase transcription analysis + the graded blues/rhythm-changes study sequence from *Joe Pass Guitar Style*), which is pure analytical/repertoire work with `reinforces: []` — no JAZ concept in the school maps cleanly to "take a transcribed solo apart," so it's left unwired rather than forced.

**2026-08-23 (`/music-enrich`, BERNTH batch):** one more drill, [[12-Level Chromatic Alternate-Picking Speed Workout]] — a 12-tempo-level daily chromatic picking play-along (50→220 bpm), pure right-hand speed/string-transition dexterity with no theory content. `reinforces: []` is correct (chromatic scale, no scale/mode/chord-tone knowledge applied).

**2026-08-23 (`/music-enrich`, BERNTH Guitar Technique Lessons batch):** one more drill, [[Speed-Burst Tension-Release Picking Drill]] — a short-burst-then-rest alternate-picking drill consolidated from three separate BERNTH videos that independently taught the same drill shape (chromatic two-string burst, one-string straight-into-triplet burst, odd 7-note grouping against a drum track). `reinforces: []` is correct — pure picking speed/relaxation/note-spacing, no theory content.

**2026-08-23 (`/music-enrich`, BERNTH Guitar Technique Lessons batch, lines 138-162):** ten more drills, all `reinforces: []` correct (pure motor-skill/technique drilling, no scale/mode/chord-tone knowledge involved):
- [[4-Minute Alternate Picking Shred Challenge (200 BPM Ladder)]] — daily tempo-ladder picking play-along.
- [[Six-Step Legato Fretting-Hand Workout]] — six fretting-hand fixes ending in applied improv.
- [[Funk-Inspired Right-Hand Rhythm and Muting Workout]] — three rhythm/muting exercises on one chord shape.
- [[Three-Tempo-Zone String-Jumping Ladder]] — four string-jump/wrist-independence exercises.
- [[5-Minute Multi-Finger Tapping Workout]] — a daily tapping tempo ladder.
- [[2-Note-Per-String Arpeggio Picking Exercise (C Minor Scale-Degree Chords)]] — mid-tempo arpeggio picking, relaxation-gated.
- [[2-Week Full Technique Workout (6-Block Daily Routine)]] — a six-block daily routine spanning picking/legato/sweep/tapping/hybrid picking.
- [[Pinky-Finger Control Ladder (Chromatic Hammer_Pull-off Progression)]] — chromatic pinky-control ladder.
- [[Finger Independence and Grip Control (Three Fixes)]] — index-anchoring and grip-tension fixes.
- [[Semi-Chromatic No-Lift Finger-Angle Drill]] — basic + advanced fretting-angle correction.

**2026-08-23 (`/music-enrich`, BERNTH Guitar Technique Lessons batch D):** seven more drills, all `reinforces: []` (pure motor skill, no theory applied): [[15-Minute Play-Along Guitar Workout]] (6-block daily warm-up — left-hand isolation, stretch, 3-NPS, hand-sync ×2, speed), [[5-Minute Legato Workout]] (hammer-on/pull-off BPM ladder), [[4-Notes-Per-String Stretch Workout]] (wide-stretch alternate-picking lick forcing correct thumb/fretting-hand form), [[5-Minute Alternate Picking Workouts (BERNTH)]] (paired hand-sync-via-open-strings + endurance workouts), [[30-Day Sweep Picking Speed-Burst Challenge]] (E minor/major shape alternation with an escalating speed burst), [[Finger Independence Harmonic Minor Exercise]] (3-level "flying pinky" fix on a harmonic minor shape), and [[Beginner Sweep Picking Play-Along Workout]] (10-minute beginner sweep play-along).

**2026-08-23 (`/music-enrich`, BERNTH batch):** one more routine, [[Parallel Scale Alternate-Picking Drill (One-Note Mode Switching)]] — an alternate-picking exercise run first on a base scale (E natural minor) then re-run with a single degree manually altered (Phrygian's ♭2, harmonic minor's ♯7) to drill parallel-mode thinking live rather than memorizing a second shape. Wired `reinforces: [SCL-C04]`, `classes: ["1"]`.

---

## Theory

Two routines. [[Rhythm Notation & Meter-Reading Practice]] (spec-161, 2026-08-13) — a written/physical drill set derived from *The Elements of Rhythm*'s own exercises (hand-drawn durational values, filling out the Time Signature Table from scratch, pulse-vs-division tapping, conducting patterns, meter ID from an unmarked rhythm). `reinforces: [RHY-C01, RHY-C09]`. [[Song-Reference Interval Recognition]] (2026-08-30, `/music-enrich`) — a song-anchor ear-training method (one famous melody memorized per interval, ascending and descending sets) for identifying intervals by ear without an instrument. `reinforces: [FND-C06]`, `classes: ["4"]`. Both live in `Theory/Practice Method/` — instrument-independent rather than filed under Guitar/Piano/Bass, since neither depends on which instrument you play.

**`/school sync-drills` does not scan `Theory/Practice Method/` yet** — its folder list (`Machine/Workflows/school.md` Step 3) is hardcoded to the three instrument folders. This routine's `**Technique**` wiring into RHY-C01/RHY-C09's lessons won't happen automatically until that list is extended; flagged here rather than silently assumed to work.

---

## Piano

One drill — [[The Virtuoso Pianist - Hanon]], the standard piano dexterity book, complete at 116 pages, public domain (1873) so it's freely shareable. Part I (Ex. 1–20) is the warm-up set.

---

## Bass

Five drills, all from **BassBuzz**. First landed 2026-08-11; the fifth ([[Ultimate Groove Workout — Fade the Beat]], a Victor-Wooten-credited timekeeping-verification drill with no tempo ladder of its own) closed out the set the same day. The old carve-out in `Theory Gaps §4` that scoped bass as *"writing and arrangement only, explicitly NOT instrument pedagogy"* was **discarded by Nate on 2026-08-09** — bass drills are wanted, and bass is meant to be treated exactly like guitar and piano. Flagged in [[Coverage Review 2026-08-09]].

- [[Slap Bass 5-Level Daily Drill]] — slap-hand mechanics, teeter-totter pop, ghost notes, hammer-ons, melodic phrasing
- [[One-Finger-Per-Fret 5-Level Daily Drill]] — fretting-hand warm-up, root-fifth-octave theory, chromatic/scale walking
- [[Flea Slap Speed Drill]] — pure slap-pop speed/endurance, chromatic walk to the 12th fret
- [[Fretting-Hand Coordination 5-Level Daily Drill]] — fret-end placement, add/subtract fingering, flying-fingers reduction
- [[Ultimate Groove Workout — Fade the Beat]] — internal timekeeping, fading the drum reference out mid-groove

---

### The last five routines, triaged 2026-08-23

The five `Practice Method/` notes that had sat unwired since 2026-08-11 were worked through by hand. Three implement a concept and are now wired; two are methodology and are marked as such. The split follows this page's own drill-vs-routine test, not a guess at the titles:

| Note | Verdict | Why |
|---|---|---|
| [[Improvising Over a Drone Track]] | **routine** → EAR-C01, SCL-C03 | A drone *is* a tonic reference. Free improvisation against it trains recognition **generatively** — hearing an idea and finding it — rather than recalling a shape. Deliberately the instrumental complement to Course 09 Lesson 1's vocal drone work, which the note itself is careful to distinguish it from. |
| [[Steal Like a Bassist — Ear-Training from Known Melodies]] | **routine** → EAR-C02, EAR-C13 | Sing the root, sing a melody you know cold, then find it in the shape — that is [[EAR-C13 — The five-step melody-by-ear process\|the five-step process]] with the ear's answer guaranteed in advance. Wired to Lesson 5 rather than Lesson 1: the melody process is the stronger match of its two concepts. |
| [[Three-Stage Warm-Up (Physical, Mental, Resonance)]] | **routine** → SCL-C03, EAR-C02 | Stage 1 runs major pentatonic around the cycle of fifths; Stage 2 changes key mid-pattern, which is what makes it a routine and not a drill — it requires active thought. Stage 3's sing-while-playing is EAR-C02 applied. |
| [[Etude-Based Vocabulary Practice]] | **methodology** | A practice *order* — play before you analyse, one etude for months, play against the recording. It teaches how to absorb an etude, not a concept. Sibling to [[Backward Chaining Practice]] and [[Hub-Latching Approach]], both already methodology; the note self-describes as practice-methodology material. |
| [[Woodshedding Changes with a Looper]] | **methodology** | Same shape: chunk the progression, loop it, test phrasing against the groove. A workflow for practising any changes rather than an exercise implementing one idea. Its pocket argument is real but is not what the note *is*. |

**Only three `**Technique**` lines were added, one per wired routine, each in its single strongest lesson.** Course 09 Lesson 1 could have taken two more on a literal concept match — the rule that a Technique line appears *only where a routine genuinely applies* beats filling every slot, and three lines on one ten-minute daily routine would make the block unusable.

## How drills reach coursework

**The drill note is the source of truth.** Each one declares its own `reinforces:` (school concept IDs) and `classes:` (class IDs) in frontmatter. Lessons do not declare their drills.

That direction is deliberate: drills arrive in batches and keep arriving, while courses are already written. A drill that tags itself can be dropped into the folder and picked up. `/school sync-drills` re-reads `Drills/` and `Practice Method/` and refreshes the `**Technique**` lines inside lessons — run it after every import.

### Current wiring

| Drill | reinforces | classes |
|---|---|---|
| [[Speed-Burst Tension-Release Picking Drill]] | — | — |
| [[Downstroke Workout]] | — | — |
| [[Legato Finger Strength Workout]] | — | — |
| [[Finger Technique Exercises]] | — | — |
| [[Essential Patterns]] | — | — |
| [[Five Painful Finger and Picking Exercises]] | — | — |
| [[Ten Daily Fretboard-Gliding Exercises]] | — | — |
| [[The Virtuoso Pianist - Hanon]] | — | 9 |
| [[Slap Bass 5-Level Daily Drill]] | — | 5 |
| [[One-Finger-Per-Fret 5-Level Daily Drill]] | BAS-C01, BAS-C02 | 5 |
| [[Parallel Scale Alternate-Picking Drill (One-Note Mode Switching)]] *(routine)* | SCL-C04 | 1 |
| [[Chord Scale Up Down]] *(routine)* | SCL-C05, SCL-C07, SCL-C08 | 1 |
| [[Three-Stage Warm-Up (Physical, Mental, Resonance)]] *(routine)* | SCL-C03, EAR-C02 | 1, 4 |
| [[Improvising Over a Drone Track]] *(routine)* | EAR-C01, SCL-C03 | 4, 1 |
| [[Steal Like a Bassist — Ear-Training from Known Melodies]] *(routine)* | EAR-C02, EAR-C13 | 4 |
| [[Flea Slap Speed Drill]] | — | 5 |
| [[Fretting-Hand Coordination 5-Level Daily Drill]] | — | 5 |
| [[Ultimate Groove Workout — Fade the Beat]] | — | 5 |

**Six guitar drills now declare no class at all** (2026-08-23) — they reach the surface through the Guitar Technique track alone. **Eleven of twelve drills reinforce no concept**, which is expected — they are physical drills and the school teaches ideas. [[One-Finger-Per-Fret 5-Level Daily Drill]] is the one that bridges into coursework (its Level 4 explicitly teaches root/fifth/octave theory). Hanon now maps to [[Class 9 — Piano Technique]], the Piano equivalent to Guitar's Class 8 (spec-160 Job 2). The two guitar routines that DO reinforce concepts, [[Full Scale Workout]] and [[Interval Ladder]], live outside this table — see the Guitar section above.

## Related

[[Practice System Config]] · [[Song Practice]] · [[Guitar Positions]] · [[Coverage Review 2026-08-09]]
