---
type: audit-report
date: 2026-09-09
started: 2026-09-14
spec: "[[spec-184-school-content-audit]]"
status: complete — all 9 batches, 2026-09-14
tags: [audit, school, curriculum, review]
---

# Music School Content Audit

Spec: [[spec-184-school-content-audit]] · idea [182] · **fix-in-place** for math, **flag-only** for judgment.

> [!warning] Why this exists
> Two answer-key entries in [[Course 01 — Lesson 3 Test]] were wrong (D→A♭ labelled a minor 6th when it is a **diminished 5th**; E→C♯ labelled a minor 6th when it is a **major 6th**), caught only because Nate answered correctly and the grading contradicted the page's own key. Nate: *"why are there mistakes in answer keys? ... i dont want any mistakes."* The curriculum was authored in bulk passes and never mechanically re-verified. This is that pass.

**Method:** every checkable claim verified **two independent ways** — the taught shortcut *and* raw semitone / scale-degree arithmetic — so a checker cannot validate its own blind spot the way the original error did. Passes are logged as checked, not just failures.

## Summary

*Updated after each batch.*

| Batch | Concepts | Test questions | Errors fixed (distinct / locations) | Flagged |
|---|---|---|---|---|
| 1 — Class 1 Fundamentals | 55 | 392 | **14 / 21** | 6 |
| 2 — Class 10 Jazz Harmony | 26 | 140 | **10 / 33** | 6 |
| 3 — Class 3 Songwriting | 27 | 194 | **2 / 10** | 6 |
| 4 — Class 4 Ear Training | 14 | 69 | **3 / 6** | 7 |
| 5 — Class 2 Reading & Rhythm | 18 | 192 | **5 / 18** | 8 |
| 6 — Class 5 Beat & Arrangement | 30 | 193 | **3 / 5** | 8 |
| 7 — Class 6 Sound Design | 16 | 127 | **4 / 6** | 9 |
| 8 — Class 7 Vocals & Release | 16 | 125 | **0** | 7 |
| 9 — Classes 8 & 9 (lighter) | 0 (none exist) | 0 (none exist) | **4 / 4** | — |
| **Total — all 9 batches** | **202** of 202 | **~1,432** | **45 / 103** | **57** |

**Every concept note in the school was checked.** 202 of 202.

Plus two orchestrator-level sweeps run after the batches, held back so they could not race the agents:
- **`/school` command arguments — 80 occurrences in 77 files.** Courses 02–16 all pointed at a *different course's* test or final, on a pre-renumbering scheme. Course notes and test pages both. This also resolved the `/school final 02` collision, where Course 02 and Course 16 both claimed the same argument.
- **`Course 13 — Final Exam` Q15 retagged `SYN-C07` → `SYN-C10`.** It is the wavetable question; Q14 beside it is the genuine SYN-C07 question. Because tags drive spaced-repetition seeding, SYN-C10 could never re-seed from its own final. The final now covers all 10 of its concepts, which makes batch 7's corrected "seeds all ten concepts" true.

### Error rate — and the number that actually matters

Per-batch hard-error rates against distinct checkable claims run **≈3% to ≈6%**. But the aggregate is the wrong number to plan from, because the errors are not spread evenly — they cluster almost perfectly by *whether the material was ever re-read*:

| Material | Result |
|---|---|
| Courses 01 + 02 — worked over repeatedly, 117 questions, 18 concepts | **zero errors** |
| Courses 29, 30 + the widened Theory Midterm 1 — written in one pass 2026-09-01 | **12 of batch 1's 14** |
| Class 10 — written in one pass 2026-09-01 | **10 errors, ~6% of claims** |

**≈10× difference in defect density between reviewed and unreviewed material, from the same pipeline.** The content generator is not unreliable. Shipping a pass with no recomputation step is. Every batch independently reached this conclusion.

### What the full nine batches changed about that read

The pattern held, and two batches sharpened it:

- **Class 7 (Vocals & Release) found zero errors in 171 items** — every numeric claim worked twice, all 22 rubric point-sums re-added. A whole class can be clean.
- **Class 5's agent made the most useful methodological finding in the audit:** recomputation found one error there, and it was about bars, not music. Everything else of value came from **internal consistency** — one part of the curriculum contradicting another. For the production classes (5, 6, 7) a *contradiction pass* would have caught every top finding, including the three it could not fix. Recomputation is the wrong primary tool there.
- **The count drift was real and is now closed.** Three agents independently fixed three different class concept-counts (Classes 2, 5 and 6). Verified afterwards from every direction: **202 concept files on disk · 202 declared across the ten class notes · 202 in the build · zero unreferenced by any course note.** The `-C10` concepts that caused it (SYN-C10, ARR-C10 and others) were written *after* their tests, and nothing downstream noticed.
- **A cited page range is an unchecked claim.** Batch 9 found three wrong ones, including an exercise whose opening page — heading, C-major opening and printed metronome mark — **is simply missing from the vault's Hanon scan** (PDF pp. 98 and 99 are the same image). The curriculum was teaching from a page that is not in the file.

**The failures are copy slips, not knowledge gaps** — and the files prove it: the Jazz Exam gets A♭maj7♯5 right at Q29 and wrong at Q18; Lesson 2's rubric describes tritone-sub guide tones perfectly while Q7 in the same file states the rule backwards. Nothing conceptually wrong was taught. Every fix was a wrong label on a correct idea.

> [!note] First launch paused before any content changed — 2026-09-14
> Batches 1–4 were launched at 10:23 and stopped at Nate's request a minute later, while all four were still **reading**. Verified by mtime: no curriculum file was edited, no report written, nothing rebuilt or pushed. **Relaunched 10:27 from a clean state**, this time writing their sections to disk incrementally so an interruption cannot lose coverage.
>
> One unrelated observation from the same check: `Tests/Course 01/Course 01 — Final Exam.md` has an mtime of **10:07 today**, sixteen minutes before the audit started and not from this session. Worth knowing what touched it before the audit runs, given Obsidian Sync has clobbered school sources mid-work before.

### Baselines — 2026-09-14, after batches 1–4 landed

Shared with [[spec-157-shakedown-review]] per the wiring; that spec reads these rather than re-running them.

| Check | Reading |
|---|---|
| `school-test-lint` | **96 pages, clean** |
| `school-course-lint` | **29 pages, clean** |
| `school-theory-check` | 441 files, **1 problem** — pre-existing, and in a backing note (see below) |
| `link-health` | 149 broken targets / 284 occurrences — **all pre-existing**, none introduced by the audit |
| `build.py` | clean, no `!` lines · 13,634 KB (under the 14 MB budget) |

> [!warning] The audit's own fixes broke both lints, and that is worth remembering
> Immediately after batches 1–4, `school-course-lint` had **2 of 29 failing** (bullets over the 420-char cap) and `school-test-lint` had 4 warnings (canonical answer lines over length). Every one came from a *correct* fix written long — the corrected claim needed more words than the wrong one. Fixed by splitting the bullets and moving the explanation off the canonical answer line; no corrected fact was changed. **A content fix can fail a format lint, so the lints have to run after the audit, not before it.**

> [!note] One theory-check problem, out of this audit's scope
> `Theory/Harmony/Chord Progressions.md:111` gives **G as C E♭ G** (that is C minor; G is G B D). It sits in a backing reference note, which the spec puts explicitly out of scope, so it was flagged rather than fixed. It is a real error in a note the curriculum cites.

### Published

| When | What |
|---|---|
| 2026-09-14, after batches 1–4 | `/school sync` first (zero deltas — nothing unsynced on the page), both artifacts rebuilt, **Nate's page → version 60**, **Britt's page → version 3**, `sync-shared.sh --commit` pushed **49 changes** to the shared repo |
| 2026-09-14, after batches 5–9 + the two sweeps | `/school sync` again (zero deltas), both rebuilt clean, **Nate's page → version 61**, **Britt's page → version 4**, `sync-shared.sh --commit` pushed **92 changes**. Final lints: `school-test-lint` 96 pages clean · `school-course-lint` 29 pages clean |

Verified before publishing Britt's copy: her build carries `user: britt` and an all-empty progress island, identical to the live version's — no progress leak between pages.

### Batch status

| # | Batch | Status |
|---|---|---|
| 1 | Class 1 — Music Fundamentals (courses 01/02/03/29/30 + Theory Midterm 1) | ✅ **done** |
| 2 | Class 10 — Jazz Harmony (course 31 + Jazz Exam) | ✅ **done** |
| 3 | Class 3 — Songwriting: Harmony & Melody (courses 06/07/08) | ✅ **done** |
| 4 | Class 4 — Ear Training (course 09) | ✅ **done** |
| 5 | Class 2 — Reading & Rhythm (courses 04/05) + Theory Midterm 2 + Theory Final | ✅ **done** — 5 errors / 18 edits |
| 6 | Class 5 — Beat & Arrangement (courses 10/11/12) + Production Midterm 1 | ✅ **done** — 3 errors / 5 edits |
| 7 | Class 6 — Sound Design (courses 13/14) + Production Midterm 2 | ✅ **done** — 4 errors / 6 edits |
| 8 | Class 7 — Vocals & Release (courses 15/16) + Production Final | ✅ **done** — **0 errors**, 171 items checked |
| 9 | Classes 8 & 9 — Guitar Sight Reading + Piano Technique (lighter pass) | ✅ **done** — 4 errors in course notes; **no test pages exist** for courses 19–28, by design |

---

## Batch 1 — Class 1, Music Fundamentals

**Checked:** 55 concepts / 392 test questions / ~115 course-note worked examples and inline claims

Coverage: class note; Courses 01, 02, 03, 29, 30; all 55 concept notes (FND 8, HAR 10, SCL 8, CHD 13, VOI 16); all 21 lesson tests + 5 course finals; `Theory Midterm 1` (72 q). Every objectively-checkable claim verified twice — once by the taught method (letter distance + major-scale shortcut, stacked thirds, order of sharps/flats, characteristic-note alteration) and once by raw semitone arithmetic (C=0…B=11, wrapping) or scale-degree count computed against the actual scale.

**Clean by course:** Course 01 — 57 questions, 8 concepts, 0 errors (including the rest of Lesson 3, which was only partially hand-fixed: Q5's D→A♭ = d5 and E→C♯ = M6 both re-verified, and Q1–Q4, Q6–Q11 all pass). Course 02 — 60 questions, 10 concepts, 0 errors. Course 03 — 46 questions, 8 concepts, 2 errors. Courses 29 + 30 + the widened Midterm — 229 questions, 29 concepts, 12 errors.

### Fixed

- [x] `Concepts/FND-C01 — Enharmonic equivalents.md`#Drill — was: enharmonic of C♯ answered as **D**, and the white-key list as "D, E, F, C" — now: **D♭**, white keys "E, F, C" — C♯ = 1 semitone, D = 2; D♭ = 1. D♭ is also not a white key, so its presence in the white list was the same error propagating.
- [x] `Courses/Course 03 — Scale Construction.md`#Lesson 2 modal table — was: "each mode differs from its major or minor baseline by **exactly one** characteristic note", Locrian row "♭5" — now: "one … Locrian is the single exception, carrying two", row "♭5 — plus a ♭2" — Aeolian = 1 2 ♭3 4 5 ♭6 ♭7 (semitones 0 2 3 5 7 8 10); Locrian = 0 1 3 5 6 8 10. Two degrees differ, not one. `SCL-C05` already stated "Locrian ♭2 and ♭5" correctly — the course note contradicted its own concept.
- [x] `Tests/Course 03/Course 03 — Lesson 2 Test.md`#Q4 key · `Tests/Course 03/Course 03 — Final Exam.md`#Q8 key — was: "Locrian ♭5 … measured against minor" with no exception noted — now: ♭5 kept as the naming answer, with the ♭2 stated, since "against minor" is the framing the key itself uses. Existing "♭5" answers still grade correct.
- [x] `Concepts/CHD-C01 — Chords are stacked thirds.md`#Why it matters — was: "**seven** applications of the rule exhaust the diatonic notes" — now: "six" — the note's own convention counts thirds added (2 = triad, 3 = seventh chord); 1-3-5-7-9-11-13 is six thirds and all seven diatonic notes. A seventh application returns the root. `Course 29 Lesson 1 Test` Q2 ("six a 13th") and `Final` Q1 already used the correct count.
- [x] `Tests/Theory Midterm 1.md`#Q29 key — was: "Seven applications exhaust the diatonic notes" — now: "Six" — same off-by-one, and the same key's own first line says "six a 13th".
- [x] `Concepts/CHD-C04 — The four seventh qualities.md`#Why it matters — was: "Minor-major 7 occurs in neither major nor minor" — now: "neither major nor natural minor — it is the tonic seventh of harmonic and melodic minor" — A harmonic minor = A B C D E F G♯ (0 2 3 5 7 8 11 from A); the tonic seventh is A C E G♯ = 0-3-7-11 = 1 ♭3 5 7 = m(maj7), diatonic. The school teaches harmonic minor in `SCL-C02`, so the old claim contradicted the curriculum.
- [x] `Concepts/CHD-C10 — The symmetrical chords…`#Answer — was: "Diminished 7 is **four** stacked minor 3rds (3+3+3)" — now: "three stacked minor 3rds (3+3+3), four notes" — 3+3+3 is three intervals; four minor 3rds = 12 semitones = back to the root. The parallel clause "augmented is **two** stacked major 3rds (4+4)" fixes the counting convention as intervals-not-notes.
- [x] `Tests/Theory Midterm 1.md`#Q38 key — was: "The pattern is four stacked minor 3rds, so any of the four can be read as the root" — now: "three stacked minor 3rds, four notes in all, so any of the four…" — same count; "four roots" was right, "four stacks" was not.
- [x] `Concepts/CHD-C12 — Decoding a slash chord.md` · `Courses/Course 29 — Chord Vocabulary.md`#Lesson 4 — was: "G/C is 9-5-maj7, a **rootless** Cmaj9" — now: "a Cmaj9 with no 3rd" — G/C sounds C G B D; relative to C that is 1, 5, 7, 9 (0, 7, 11, 14). The root **is** present, in the bass; the absent tone is the 3rd (E). The cited source (`Theory/Harmony/Slash Chords.md`) says "rootless (Cmaj9 no 3rd)" — its "rootless" describes the upper G triad, and the compression kept the misleading half and dropped the load-bearing one.
- [x] `Concepts/VOI-C05 — One triad, every string group.md` · `Courses/Course 30 — Voicings & Comping.md`#Lesson 2 · `Tests/Course 30/Course 30 — Lesson 2 Test.md`#Q6 key · `Tests/Course 30/Course 30 — Final Exam.md`#Q8 key · `Tests/Theory Midterm 1.md`#Q46 key — was: "the D-G-B and G-B-E groups reuse the same shapes with **the top note** shifted one fret" — now: D-G-B shifts the top note, G-B-E shifts the top two — semitone offsets within each 3-string group from its lowest string: E-A-D and A-D-G are (0, 5, 10); D-G-B is (0, 5, **9**) so only the B-string note sits a semitone low; G-B-E is (0, **4**, **9**) so both upper notes do. Worked: a C major triad is frets 3-2-0 on A-D-G, 10-9-8 on D-G-B (top +1), and 5-5-3 on G-B-E (middle and top both +1).
- [x] `Concepts/VOI-C06 — One shape, several chords.md`#Drill — was: "off the ♭7 of a dominant **a major 3rd below**" — now: "a minor 7th below (Dm7♭5 read as E7alt, say)" — if the grip's root is the dominant's ♭7, the dominant's root is 10 semitones below it, not 4. D(2) − 10 ≡ 4 = E; Dm7♭5 = D F A♭ C reads against E as ♭7, ♭9, 3 (G♯), ♭13 → E7♭9♭13, altered. "A major 3rd below" is the interval for the *other* case in the same concept — the grip played off the dominant's **3rd**, which yields a dominant 9.
- [x] `Concepts/VOI-C15 — Renumber off the chord, not the key.md` · `Courses/Course 30 — Voicings & Comping.md`#Lesson 6 · `Tests/Course 30/Course 30 — Lesson 6 Test.md`#Q7 key · `Tests/Course 30/Course 30 — Final Exam.md`#Q23 key · `Tests/Theory Midterm 1.md`#Q56 key — was: "the same pitch is **'2 of C'** under a C chord and '4 of D' a beat later under Dm" — now: "'5 of C' … '4 of D'" — the 2 of C is D (2 semitones above C); the 4 of D is G (5 above D). Not the same pitch, so the example contradicted the sentence it illustrated. G is 7 semitones above C = the 5th, and 5 semitones above D = the 4th, so one pitch, two numbers.
- [x] `Tests/Theory Midterm 1.md`#Q6 stem — was: "Name the interval D→F♯♯ and say why it isn't a **perfect 5th**" — now: "…why it isn't a perfect 4th" — D(2) → F𝄪(7) is 5 semitones; a perfect 5th from D is A, 7 semitones. The trap the question exists for is that 5 semitones is the perfect-4th distance (D→G) while the letters D-E-F say 3rd → augmented 3rd. The key already corrected the stem ("not a 5th"), so the wrong premise was only visible in the question.
- [x] `Tests/Theory Midterm 1.md`#Q58 key — was: "you might write **G♯** for the ♯4, which is the same pitch as A" — now: "G𝄪 (G double-sharp) … the same pitch as A, but it repeats the letter G and skips A" — G♯ = 8 semitones, A = 9; they are not the same pitch (G♯ = A♭, which is E♭ major's *natural* 4th). G𝄪 = 7 + 2 = 9 = A. The old text's "repeats no letter and skips one" was also backwards: E♭ F G G𝄪 B♭ C D repeats G and skips A.
- [x] `Tests/Theory Midterm 1.md`#Q62 stem + key — was: "the next phrase leaps from **A down to C** … A down to C = minor 3rd" — now: "from that A **up to the C above it**", key states the m3 and adds why direction is not inversion — A(9) down to C(0) is 9 semitones = a descending **major 6th**, the same interval as the first leap, not its inversion. A up to the next C is 3 semitones, letters A-B-C = 3rd → minor 3rd, and 6 + 3 = 9 with the quality flipped. This is the exact failure `FND-C06`'s "Top note, bottom note" section was written to prevent — the bottom note is whichever pitch is lower, never whichever is played first — so the key was grading against its own concept.
- [x] `Courses/Course 02 — Chord Function.md`#Course final · `Courses/Course 03 — Scale Construction.md`#Course final — was: `/school final 03` on Course 02 and `/school final 05` on Course 03 — now: `02` and `03` — `Machine/Workflows/school.md` defines `final <course>`, and the frontmatter `course_id` is "02" and "03". As written, Course 02's page launches Course 03's final. See the shakedown note: 13 other course notes carry the same stale numbers and are owned by other batches.
- [x] `Courses/Course 03 — Scale Construction.md`#Lesson 3 · `Concepts/SCL-C08 — Matching a scale to a chord.md` — was: minor pentatonic over a dominant "sidesteps the natural 4th entirely" — now: states the 4th **is** in the scale and is passed through, with the root/5th/♭7 named as what it shares with the chord — C minor pentatonic is C E♭ **F** G B♭, and F is the natural 4th. Flagged here for completeness: `Course 03 Lesson 3 Test` Q7 and `Final` Q15 already carried the corrected wording, and the concept + course note were brought into line during this batch (a concurrent process landed that specific edit at 14:31 while I was mid-pass; I re-verified both files and the arithmetic holds).

### Flagged (Nate's call)

- [ ] `Concepts/CHD-C06 — Upper structures…` · `Courses/Course 29`#Lesson 2 · `Tests/Course 29/Course 29 — Lesson 2 Test.md`#Q10 · `Tests/Course 29/Course 29 — Final Exam.md`#Q10 · `Tests/Theory Midterm 1.md`#Q34 — the "six bass-note options for one E minor triad" list does not compute, and the fault is in the cited source, not the curriculum. E-G-B over C is Cmaj7, not the "♭6 maj7♯11" claimed (no F♯ anywhere in an E minor triad); over A it is A-E-G-B = A9 no-3rd, not the claimed "iv minor 6/9" (Am6/9 = A C E F♯ B, which shares only two notes). Three of the six rows in `Theory/Harmony/Upper Structure Chords.md` also state the bass relative to the *upper triad's root* and three relative to the *home bass note*, which is why they disagree. I did not touch it — the claim's truth depends on the Max Konyi video it was transcribed from. **What I'd do:** re-watch the source or re-derive the six options from scratch, then rewrite the reference note and re-cut the four curriculum restatements from it. Until then the concept is drilling something that cannot be verified at the keyboard.
- [ ] `Concepts/VOI-C09` · `Courses/Course 30`#Lesson 4 · `Tests/Course 30/Course 30 — Lesson 4 Test.md`#Q3 · `Tests/Course 30/Course 30 — Final Exam.md`#Q15 — the "push" is defined as a sustained hit on the **"and" of 3** that "pulls into the next bar" / "arrives before the barline". The conventional jazz anticipation is the "and" of 4; the "and" of 3 is a beat and a half from the barline and does not anticipate the next downbeat. Internally consistent across all four places, so it is either right per the cited `Jazz Comping` note or wrong in all of them. **What I'd do:** check the source note against a recording before changing anything — this is a convention claim, not arithmetic.
- [ ] `Concepts/CHD-C08` · `Courses/Course 29`#Lesson 3 · `Tests/Course 29/Course 29 — Lesson 3 Test.md`#Q6 · `Tests/Course 29/Course 29 — Final Exam.md`#Q14 — "G7♭9 and G7♭13 are interchangeable as written symbols". **I checked this and left it alone** — it looked like the ♭9/♭13 pitches being conflated (A♭ vs E♭, different notes), but the claim is about scale implication and it holds: both live in G Phrygian dominant, the 5th mode of C harmonic minor (G A♭ B C D E♭ F). Worth flagging anyway because it is a simplification — a written ♭9 with no ♭13 commonly implies the half-whole diminished scale, which carries a **natural** 13, so the two symbols are interchangeable in the minor-V context the key describes and not universally. **What I'd do:** add "in a minor-key V context" to the four copies, or leave it as a deliberate first-pass simplification.
- [ ] `Concepts/CHD-C02 — Triad quality…`#Drill — "Play a minor triad, raise only the middle note… Then **hold the outer notes** and move the 5th instead to reach diminished and augmented." The 5th is one of the outer notes, so the instruction contradicts itself. Should read "hold the root and 3rd". Pure wording, so not auto-fixed.
- [ ] `Concepts/CHD-C11` · `Courses/Course 29`#Lesson 4 — "bass-line control (walk the bass by step under static harmony, **C → C/B → Am**)" appears in a list of reasons to *invert*. C/B is not an inversion of C major: B is not a chord tone of C-E-G, so that chord is a slash chord (effectively Cmaj7/B). The bass walk C-B-A is correct; the example just does not belong under "inversion". Framing, not math.
- [ ] `Concepts/CHD-C03` · `Courses/Course 29`#Lesson 1 — "from one root inside an octave there are 11 dyads, 19 triads, 43 tetrads and 66 pentads". Verified faithful to `Theory/Harmony/Chord Classification from 2 to 12 Notes.md`, which derives them by de-duplicating symmetrical chords out of the raw combinations (55 → 19, 165 → 43, 330 → 66). No change needed; noting it so a later pass does not "correct" it to the raw binomials.

### Echoed elsewhere

Every error below was written once and copied into every surface that restates it. All copies were fixed together; none of the echoes crossed out of Class 1.

- "2 of C / 4 of D" — originated in `VOI-C15`, echoed into `Course 30` (Lesson 6), `Course 30 — Lesson 6 Test` Q7 key, `Course 30 — Final Exam` Q23 key, and `Theory Midterm 1` Q56 key. Five copies, all fixed.
- B-string shape shift — originated in `VOI-C05`, echoed into `Course 30` (Lesson 2), `Course 30 — Lesson 2 Test` Q6 key, `Course 30 — Final Exam` Q8 key, and `Theory Midterm 1` Q46 key. Five copies, all fixed.
- "rootless Cmaj9" — `CHD-C12` and `Course 29` (Lesson 4). Two copies, both fixed. No test asks it.
- "four stacked minor 3rds" — `CHD-C10` and `Theory Midterm 1` Q38 key. Fixed in both. `Course 29`, its Lesson 3 Test Q10 and its Final Q17 all say "3+3+3" and were already right, which is what identified "four" as the outlier.
- "seven applications exhaust the diatonic notes" — `CHD-C01` and `Theory Midterm 1` Q29 key. Fixed in both; the Course 29 tests were already right.
- Locrian's single characteristic note — `Course 03` table, `Course 03 — Lesson 2 Test` Q4 key, `Course 03 — Final Exam` Q8 key. `SCL-C05` was the one place that had it right.
- Minor pentatonic "sidesteps the natural 4th" — `SCL-C08` and `Course 03` (Lesson 3). The two tests had already been corrected; the concept and course note had not, so the school was teaching one thing and testing another.

---

## Batch 2 — Class 10, Jazz Harmony

**Checked:** 26 concepts / 140 test questions (80 lesson-test + 26 course final + 34 Jazz Exam) / ~45 worked examples and inline claims in the Course 31 and Class 10 notes

Coverage is complete: every JAZ concept note, all seven lesson tests, the Course 31 Final Exam, the Jazz Exam and both the course and class notes were read in full and every objectively-checkable claim in them was verified twice — once by the taught method (ii–V–I function, stacked thirds, tritone-sub-a-♭5-away, chord-scale derivation) and once by raw semitone arithmetic from absolute pitch (C=0 … B=11) or by scale-degree count against the actual scale. **10 distinct errors found, appearing in 33 places across 17 files.** All 33 fixed. Lesson 6 Test and the Class 10 note were checked and came back clean.

### Fixed

- [x] `Concepts/JAZ-C12 — A turnaround is a controlled reset.md`#Answer (+ Course 31 §Lesson 4, Jazz Exam Q12) — was: "the roots walk down in thirds then jump a fourth" — now: "the root falls a third, then rises a fourth twice" — C(0)→A(9) = −3 semitones (one minor 3rd down); A(9)→D(2) = +5 and D(2)→G(7) = +5 (two perfect 4ths up). One third and two fourths, not thirds-plural and one fourth.
- [x] `Concepts/JAZ-C14 — A bridge can be contrast made from harmonic rhythm alone.md`#Answer (+ Course 31 §Lesson 4, Lesson 4 Test Q7, Final Exam Q14 rubric, Jazz Exam Q14) — was: the Rhythm Changes bridge is "four dominants … none of them diatonic to the key" — now: "only the last, F7, is the key's own V7"; the other three are non-diatonic — B♭ major = B♭ C D E♭ F G A. D7 = D F♯ A C (F♯ outside), G7 = G B D F (B♮ outside), C7 = C E G B♭ (E♮ outside), **F7 = F A C E♭ — every note diatonic**, and it is the V7 of B♭.
- [x] `Courses/Course 31 — Jazz Harmony.md`#Lesson 4 (+ Lesson 4 Test Q9) — was: of the Montgomery-Ward bridge I7–IV7–II7–V7, "the II7's major 3rd is the only note outside the key" — now: "only the V7 is diatonic — I7, IV7 and II7 each bring in one note from outside the key (in C: B♭, E♭ and F♯)" — in C major (C D E F G A B): C7 adds B♭(10), F7 adds E♭(3), D7 adds F♯(6); G7 = G B D F is entirely diatonic. Three outside notes, not one.
- [x] `Concepts/JAZ-C16 — A passing chord connects; a substitute replaces.md`#Why it matters (+ Course 31 §Lesson 5, Lesson 5 Test Q3) — was: "C♯dim7 → Dm7, which is a rootless A7" — now: "a rootless A7♭9" — C♯dim7 = C♯(1) E(4) G(7) B♭(10), four notes stacked in minor 3rds. A7 = A C♯ E G; strip the root and you get C♯ E G, a three-note diminished triad. The fourth note B♭(10) sits one semitone above A(9) = the ♭9. Only A7♭9 minus its root produces C♯dim7.
- [x] `Concepts/JAZ-C18 — One melody note, many chords.md`#Answer (+ Course 31 §Lesson 5, Lesson 5 Test Q7 + Q9 rubric prose, Final Exam Q18, Jazz Exam Q18) — was: a held C is "the ♯5 of A♭maj7" — now: "the 3rd of A♭maj7" — A♭(8) → C(0) = 4 semitones = major 3rd. A♭'s ♯5 is 8+8 = 16 mod 12 = 4 = **E♮**, not C. Confirmed independently by the same exam: Jazz Exam Q29 correctly gives "A♭maj7♯5 (E is the ♯5)".
- [x] `Concepts/JAZ-C23 — Bebop scales: the extra note is rhythmic.md`#Answer (+ Lesson 7 Test Q3) — was: running the G bebop dominant down from the root "lands G, E, D and B on downbeats" — now: "lands G, F, D and B on downbeats — the four chord tones of G7" — descending G F♯ F E D C B A in straight eighths from beat 1: beat 1 = G, 1& = F♯, beat 2 = F, 2& = E, beat 3 = D, 3& = C, beat 4 = B, 4& = A. On-beats = G B D F = exactly G7's chord tones (the entire point of the added note). E is the 13th and lands on the "&" of 2.
- [x] `Concepts/JAZ-C05`#Answer (+ Lesson 2 Test Q7, Final Exam Q5 key + rubric bullet + prose, Jazz Exam Q5 and Q27 stem) — was: "The 7th of each chord becomes the 3rd of the next" — now: "Each chord's 3rd is held over as the next chord's 7th, and each chord's 7th falls a half step onto the next chord's 3rd" — Dm7's 3rd F(5) **is** G7's 7th F(5) and G7's 3rd B(11) **is** Cmaj7's 7th B(11) — identical pitches. Dm7's 7th C(0) → G7's 3rd B(11) and G7's 7th F(5) → Cmaj7's 3rd E(4) are −1 semitone each, i.e. resolutions, not identities. The card had the two relations swapped and stated the moving one as an identity; the Final Exam prose said "the 7th of each chord **is** the 3rd of the next", which is flatly false. (Same file's Lesson 2 Q10 rubric already had it right — "the roles have swapped, not the notes".)
- [x] `Concepts/JAZ-C10 — ♭II–I is not always a tritone sub.md`#Answer (+ Course 31 §Lesson 3, Final Exam Q10 rubric) — was: a tritone-sub ♭II is reached "at the end of a three-semitone descent from ii or V" — now: "the roots stepping down a semitone at a time into it, as in `Dm7 → D♭7 → Cmaj7`" — D(2)→D♭(1)→C(0), one semitone per step. No descent from V exists at all: G(7)→D♭(1) is 6 semitones and ♭II7 *is* the substituted V, so you cannot descend into it from V; and ii→♭II is a one-semitone step, never three.
- [x] `Tests/Course 31/Course 31 — Lesson 3 Test.md`#Q14 rubric (+ `Concepts/JAZ-C11`) — was: in the backdoor, B♭7 carries "D, which is already in the tonic chord" — now: "already in the tonic chord once you land on Cmaj9 (B♭7 and a plain Cmaj7 share no notes at all)" — B♭7 = B♭(10) D(2) F(5) A♭(8); Cmaj7 = C(0) E(4) G(7) B(11). Intersection is empty. D is only a common tone against Cmaj9 = C E G B **D**, which is the landing chord the concept note itself recommends.
- [x] `Tests/Course 31/Course 31 — Lesson 1 Test.md`#Q8 key — was: "Whatever follows is the intended I, even when the I never actually arrives" (self-contradictory) — now: "Whatever it points at — the chord a fourth above the dominant — is the intended I, even when the I never actually arrives" — G(7) → C(0) = +5 semitones = the perfect 4th above; the target is defined by the interval, not by what physically follows, which is the whole point of the deceptive and unresolved cases in the same answer.

### Flagged (Nate's call)

- [ ] `Concepts/JAZ-C09 — Substituting a secondary dominant…`#Answer (+ Lesson 3 Test Q8, Final Exam Q9, Jazz Exam Q9) — **"the minimum viable form is any major triad a semitone above the target" is taught as a tritone substitution, but it contains no tritone.** Heading to Dm, the sub for A7 is E♭7 = E♭ G B♭ D♭, whose tritone is G(7)/D♭(1) = 6 semitones — A7's own tritone. Strip it to a plain E♭ major triad (E♭ G B♭) and only G survives; D♭ is gone. So the triad works by the ♭2̂→1̂ chromatic pull, which is exactly the Phrygian mechanism JAZ-C10 separates from a tritone sub, and it directly contradicts JAZ-C08's "only dominants qualify — the tritone is what is being preserved". The practical advice is good; the label is wrong. Not auto-fixed because it is sourced to [[Ch12 — Tritone Substitution and Other Mystery Chords]] and renaming the device is a pedagogical call. Suggest: keep the move, call it "the minimum viable ♭II", and add one clause saying the triad trades the tritone for the chromatic pull.
- [ ] `Concepts/JAZ-C05` — **the concept's title/filename, "The 7th of one chord is the 3rd of the next", is the inverted relation** (see the fix above; it is the 3rd that is literally the next chord's 7th). The body now states it correctly, but the title still carries the loose shorthand. Not renamed: the filename is a wikilink target in 4 files and is very likely a progress/SR key, so the rename needs to be coordinated rather than done inside a content batch. Suggested title: "JAZ-C05 — The 3rd of one chord is the 7th of the next".
- [ ] `Concepts/JAZ-C08`#Why it matters (+ Course 31 §Lesson 3) — "the chromatic iii → ii → ♭II descent in 'Toxic' reads as tritone subs of a 6-2-5". The ♭II leg checks out as a sub for V, but the "6" leg does not: vi (A C E) and iii (E G B) share only E(4), so iii is not a diatonic third-substitute for vi the way the lesson's own rule defines one (chords a third apart sharing two of three triad tones). Left alone because the claim's truth depends on the actual recording, which is out of auto-fix scope.
- [ ] Recording- and book-dependent claims across the batch, none verifiable against theory: Rihanna's "Stay" as Am7→D in E · "Lights Up" resolving A♭ minor to A♭ major · Zero 7's "The Waiting Line" · the two Stevie Wonder instances · "New York State of Mind" / "Layla" / "You Are So Beautiful" as bare backdoor dominants · "One Note Samba" stacking two subs. All are internally coherent as *theory* (each named device spells out correctly), but nothing here confirms the songs actually do it. Worth one listening pass.
- [ ] `Concepts/JAZ-C15`#Answer (+ Lesson 4 Test Q11, Final Exam Q15, Jazz Exam Q15) — "the first half of a 16+16 **must not** resolve to I" is stated as a law in four places. It is a strong convention, not a rule; plenty of 16+16 tunes cadence on I at bar 16 and restart. Suggest softening to "is not supposed to" / "almost never does", or the test will mark a correct counterexample wrong.
- [ ] `Tests/Course 31/Course 31 — Lesson 7 Test.md`#Q10 key — "Ruch's method for turning a transcription into vocabulary". This attribution appears nowhere else in the batch and cannot be checked against theory; it needs verifying against [[Solo Analysis and Concept Extraction]] or removing.

### Echoed elsewhere

Every single error found was present in more than one file. The batch's echo profile:

- "none diatonic" (Rhythm Changes bridge) — **5 files**: JAZ-C14, Course 31 note, Lesson 4 Test Q7 (+ its explanation line), Final Exam Q14 rubric, Jazz Exam Q14. All fixed.
- "the 7th of each chord becomes the 3rd of the next" — **5 files, 7 places**: JAZ-C05, Course 31 note (via the wikilink title), Lesson 2 Test Q7, Final Exam Q5 key + rubric bullet + prose, Jazz Exam Q5 key + Q27 question stem. All fixed except the filename (flagged above).
- "A♭maj7 (♯5)" — **5 files**: JAZ-C18, Course 31 note, Lesson 5 Test Q7 "Also accepted" + Q9 rubric prose, Final Exam Q18 "Also accepted", Jazz Exam Q18. All fixed.
- "rootless A7" — **3 files**: JAZ-C16, Course 31 note, Lesson 5 Test Q3. All fixed.
- "roots walk down in thirds" — **3 files**: JAZ-C12, Course 31 note, Jazz Exam Q12. All fixed.
- "three-semitone descent from ii or V" — **3 files**: JAZ-C10, Course 31 note, Final Exam Q10 rubric. All fixed.
- "G, E, D and B on downbeats" — **2 files**: JAZ-C23, Lesson 7 Test Q3. Both fixed.
- "the II7's major 3rd is the only note outside the key" — **2 files**: Course 31 note, Lesson 4 Test Q9. Both fixed.
- backdoor "D, already in the tonic chord" — **2 files**: JAZ-C11, Lesson 3 Test Q14 rubric. Both fixed.

A curriculum-wide grep confirms no JAZ error leaked into another class's files; all echoes were inside Class 10.

---

## Batch 3 — Class 3, Songwriting: Harmony & Melody

**Checked:** 27 concepts / 194 test questions / 26 worked examples

- Concepts: all 27 (POP-C01…C11, BLU-C01…C08, MEL-C01…C08) — Q&A callout, "why it matters", and drill in each.
- Test questions: 162 across the 13 in-batch test pages (Course 06: 10+12+11+12+24 = 69 · Course 07: 10+10+9+16 = 45 · Course 08: 10+10+12+16 = 48), plus the 32 Class-3-tagged questions in `Tests/Theory Final Exam.md` (Q1–Q27 objective, Q48–Q52 synthesis). Every question stem, headline answer, "also accepted" list, rubric line and long explanation was read.
- Worked examples: 26 spelled-out musical examples (15 in the three course notes, 11 more that appear only inside answer-key explanations).
- Frontmatter arithmetic checked too: class `concepts: 27` = 11+8+8 ✓, `lessons: 10` = 4+3+3 ✓; every test's `questions:` field matches both its stem count and its key count (13/13 ✓); course notes' stated final-exam sizes (24/16/16) match the exams ✓.

Verification method used throughout: taught method first (stacked thirds, Roman numeral against the stated key, mode = parent minor ± one characteristic degree, bar counts), then an independent semitone recomputation from absolute pitch (C=0…B=11) or a scale-degree count computed from the actual spelled scale. Both had to agree.

### Fixed

- [x] `Curriculum/Courses/Course 07 — Blues Form & Vocabulary.md`#Lesson 3 — The Vocabulary — was: "minor pentatonic works over dominant chords partly because it **avoids the natural 4th**" — now: the scale's other three notes are the chord's own root, 5th and ♭7; it does **not** dodge the natural 4th (major pentatonic is the scale that leaves the 4th out) — cross-check: A minor pentatonic = A C D E G; semitones from A = 0, 3, 5, 7, 10, and a perfect 4th is 5 semitones, so D *is* in the scale. The page's own Q2/Q3 spell the A blues scale as "A C D E♭ E G" = minor pentatonic + ♭5, which contains the same D. The scale that omits the 4th is major pentatonic (1 2 3 5 6 = 0, 2, 4, 7, 9).
- [x] `Curriculum/Concepts/BLU-C07 — Why the ♭3 isn't wrong.md`#Why it matters — was: "minor pentatonic also **avoids the natural 4th**, the one note that genuinely clashes" — now: same correction (three of five notes are chord tones; the 4th is in the scale, passed through rather than rested on) — cross-check: identical scale-content computation; the "natural 4th genuinely clashes with a major 3rd" half is true (D=2 vs C♯=1, one semitone) and was kept — only the claim about which scale contains it was wrong.
- [x] `Curriculum/Tests/Course 07/Course 07 — Lesson 3 Test.md`#Q7 (stem **and** key) — was: "Which note does minor pentatonic avoid that genuinely would clash over a dominant chord?" → "**The natural 4th** … it isn't in minor pentatonic at all" — now: stem asks which note in minor pentatonic is the one that clashes with the chord's major 3rd and whether the scale avoids it; key is "**The natural 4th — and no, the scale does not avoid it**" with the A C D E G spelling shown and major pentatonic (A B C♯ E F♯) named as the scale that does omit it — cross-check: the question was built on a false premise, so the stem had to move with the key; D = 5 semitones above A = the perfect 4th, present in the scale.
- [x] `Curriculum/Tests/Course 07/Course 07 — Lesson 3 Test.md`#Q9 rubric + explanation — was: "Mixolydian's natural 4th is a note the blues scale drops" / "It also drops the natural 4th that Mixolydian carries" — now: both scales keep the natural 4th; what the blues scale drops is Mixolydian's 2nd (B), major 3rd (C♯) and 6th (F♯) — cross-check: A Mixolydian = A B C♯ D E F♯ G; A blues = A C D E♭ E G; set difference Mixolydian − blues = {B, C♯, F♯}, blues − Mixolydian = {C, E♭}, intersection contains D. Same edit corrected "Mixolydian contains … nothing that fights them" to "almost everything agrees", since Mixolydian's D is exactly the avoid note the question is about.
- [x] `Curriculum/Concepts/MEL-C03 — Motifs and how to develop them.md`#Answer + #Why it matters — was: "**Eight** named techniques: repetition · sequence · inversion · interval contraction · interval expansion · diminution · augmentation · rhythmic metamorphosis · imitation" and "a table of all eight" — now: **nine** in both places — cross-check: the list as written is 9 items counted individually; settled against the primary source by reading p.35 of `Books/Music Theory for Musicians and Normal People/The Whole Enchilada Set.pdf` directly — the page has **7 labelled rows**, two of which pair two named techniques each ("Interval Contraction / Interval Expansion", "Diminution / Augmentation"), so the page is 7 rows = 9 named techniques. "Eight" is not reachable by either count.
- [x] `Curriculum/Courses/Course 08 — Melody Writing.md`#Lesson 1 — The Line Itself — was: "The **eight** named development techniques are …" followed by the same 9-item list — now: "nine" — cross-check: as above, direct from the source PDF page.

### Flagged (Nate's call)

- [ ] `Tests/Course 06/Course 06 — Lesson 1 Test.md`#Q7 (echoed in `Course 06 — Final Exam.md`#Q4 and `Tests/Theory Final Exam.md`#Q2) — "Roughly how long does it take a listener to stop tracking a repeating progression?" → **"About two passes"**. This number appears nowhere in Lesson 1, in `POP-C02`, or in the `Loop-Based Harmony` reading, but it's a graded objective question. It's a perceptual claim, not math, so I didn't touch it — but it's currently ungettable from the material. Either teach it (with a source) in POP-C02, or make the question qualitative.
- [ ] `Tests/Course 08/Course 08 — Lesson 1 Test.md`#Q4 (echoed in `Course 08 — Final Exam.md`#Q2) — "give a reasonable starting span" → **"about an octave and a third"**, with *also accepted:* "roughly an octave to an octave and a half". Same problem: MEL-C01 and Course 08 Lesson 1 teach the range constraint but never give a span, so the number is only in the key — and the key's headline and its own accepted-alternates disagree about the band (an octave and a third ≈ 16 semitones vs. up to 18). Pick one, and put it in the lesson.
- [ ] `Concepts/POP-C06 — Sus and add9 under a vocal.md` (echoed in `Course 06 — Lesson 2 Test.md`#Q10 and `Course 06 — Final Exam.md`#Q11) — "sus2, sus4 and add9 voicings **remove or blur the 3rd**". Sus2 (1–2–5) and sus4 (1–4–5) remove the 3rd; **add9 (1–3–5–9) keeps it**. "Blur" is carrying that distinction and is defensible as written, so I left it — but Q10/Q11 grade the single word "the 3rd", and a student who answers "add9 doesn't remove it" is right and would be marked down. Suggested wording: "sus2/sus4 remove the 3rd outright; add9 keeps it but puts a 9th a step above it so the pad stops asserting the quality on its own."
- [ ] `Tests/Course 06/Course 06 — Lesson 3 Test.md`#Q11 — labels C major as **♭III** in the key of A minor. I deliberately did **not** change this: the curriculum consistently uses the parallel-major-relative convention in minor keys (the Aeolian cadence is taught everywhere as ♭VI–♭VII–i for F–G–Am in A minor), so ♭III is internally consistent. But under the classical convention A minor's diatonic mediant is plain **III**, and nothing in Class 3 states which convention the school uses. One sentence in Course 06 Lesson 3 would stop a correct answer being graded wrong.
- [ ] `Concepts/BLU-C07`, `Courses/Course 07`, `Tests/Course 07 — Lesson 3 Test.md`#Q7/#Q9 — my replacement text says blues "passes through the natural 4th rather than resting on it". That half is genre convention, not computation (it mirrors the ♭5 treatment the strand already teaches). The factual corrections around it stand on their own; reword this clause freely if you'd put it differently.
- [ ] `Concepts/POP-C09`, `Course 06 — Lesson 4 Test.md`#Q3, `Course 06 — Final Exam.md`#Q19 — "Michelle" and "Something" cited as the Beatles descending-chromatic-bass examples, and `Course 07`/`BLU-C03` cite "Key to the Highway" as the 8-bar blues. All three are the conventional citations and none looked wrong, but they're source-dependent claims I verified against convention rather than against the recordings — noting them as checked-but-not-source-verified rather than as errors.

### Echoed elsewhere

The pentatonic/natural-4th error was not local to Course 07 — the same sentence had been copied into Course 03's material (Class 1's batch). Fixed in all four places, same correction, same cross-check:

- `Curriculum/Courses/Course 03 — Scale Construction.md`#Lesson 3 — "because it sidesteps the natural 4th entirely" → corrected (fixed).
- `Curriculum/Concepts/SCL-C08 — Matching a scale to a chord.md`#Answer — "it sidesteps the natural 4th entirely" → corrected (fixed).
- `Curriculum/Tests/Course 03/Course 03 — Lesson 3 Test.md`#Q7 key — "and it avoids the natural 4th … the note that would genuinely clash isn't in the scale at all" → corrected (fixed). The Q7 stem ("name the two reasons it works") still fits, so only the key changed.
- `Curriculum/Tests/Course 03/Course 03 — Final Exam.md`#Q15 rubric **and** explanation — "notes that minor pentatonic also avoids the natural 4th" / "the scale omits the natural 4th entirely" → corrected in both (fixed). Note the same wrong claim was worth a scoring point in the rubric *and* restated in the explanation below it.

Out of scope, not edited, needs Nate:
- `School & Content/Theory/Fundamentals/Blues Scales and Blue Notes.md` line 54 — "**Why minor pentatonic works over dominants at all** … it **avoids the natural 4th**". This is the origin: it's the `source:` note for BLU-C06/BLU-C07 and the ancestor of all six curriculum copies. Backing notes are out of audit scope, so it still carries the wrong claim and will re-seed it on the next content pass.
- `School & Content/Books/Music Theory for Musicians and Normal People/… - Enrichment.md` line 81 and `School & Content/Theory/Form/Motivic Development.md` line 11 both say "8 named techniques" over a 9-technique list — the origin of the MEL-C03 miscount, also out of scope.

Not echoed: I checked the Class-3 portions of `Tests/Theory Final Exam.md` (Parts A–C, Q1–Q27, and synthesis Q48–Q52) against every fix above. It carries neither error and its Class-3 answers are clean — including the ♭VII-as-Mixolydian-or-parallel-minor reconciliation at Q48, which is correct in both directions (C Mixolydian's ♭7 → B♭ D F; C natural minor also contains B♭, D and F).

### What passed (so the coverage is auditable, not just the failures)

Every one of these was recomputed two ways and agreed: `C–G/B–Am–F` = I–V–vi–IV in C with the bass descending C–B–A–F; E7 as V/vi into Am carrying G♯ (leading tone) and the G♯–D tritone (8→2 = 6 semitones); all four Axis rotations and the claim that they are identical pitch content; the Axis common-tone claims (C/Am share C+E, F/Am share A+C) and the IV–I plagal seam; C↔Am as relative keys; `C–B♭–F` as I–♭VII–IV with B♭ diatonic to both C Mixolydian and C natural minor; Dm–G as Dorian (G major needs B♮ = Dorian's ♮6) vs Dm–Gm as Aeolian (B♭); ♭VI–♭VII–i = F–G–Am all diatonic to A natural minor; the four chromatic mediants from C (E, A, E♭, A♭ major — the diatonic thirds are Em and Am, and each chromatic mediant shares exactly one common tone with C); ♭VI/♭III as simultaneously borrowed and mediant; the Am-as-pivot modulation (vi in C, ii in G, then D7→G); the 12-bar in A (`A A A A / D D A A / E D A E`, 4+4+4 = 12, A7/D7/E7 = I7/IV7/V7); the quick change at bar 2 and the minor-blues ♭VI at bar 9 with a dominant V; the A turnaround A7–F♯7–B7–E7 in bars 11–12; the A blues scale A C D E♭ E G (0,3,5,6,7,10) with the ♭5 a tritone from the root and sitting between the 4th and 5th; the ♭3/♮3 semitone (C vs C♯) throughout Course 07; F→Fm as the borrowed-iv last-pass swap.

---

## Batch 4 — Class 4, Ear Training

**Checked:** 14 concepts / 69 test questions / 19 worked examples (+ all 20 `eartrain.json` audio clips cross-verified against the render script)

Scope worked: `Classes/Class 4 — Ear Training.md`, `Courses/Course 09 — Ear Training Method.md`, `Concepts/EAR-C01`…`EAR-C14` (14), `Tests/Course 09/` (Lessons 1–5 = 49 questions, Final Exam = 20 questions), and `Machine/School/eartrain.json` (read-only) checked against `Machine/Scripts/school-eartrain-render.py`.

~90 objectively-checkable claims verified two independent ways (taught method + raw semitone/scale-degree arithmetic from absolute pitch). 3 distinct wrong claims found, appearing in 6 places. All 6 fixed.

### Fixed

- [x] `Concepts/EAR-C10 — Half-step bass motion is a diatonic landmark.md`#Answer — was: "a **♯4 in the bass** almost always signals either a secondary dominant of V (V/V) or **a half-diminished ii**" — now: "…either a secondary dominant of V (V/V with its 3rd in the bass — in C, D7/F♯) or a **♯iv half-diminished** (♯ivø7 — in C, F♯ A C E)" — **cross-check:** a iiø7 in C is D F A♭ C = pitch classes {2,5,8,0}; ♯4 = F♯ = pc 6, which is not in that set at any inversion, so a ♯4 bass note can never be a iiø7. The half-diminished chord that *does* contain ♯4 in the bass is rooted on ♯4: F♯ A C E = {6,9,0,4}, intervals from F♯ = 0-3-6-10 = half-diminished 7th, i.e. ♯ivø7. Separately V/V = D7 = D F♯ A C; ♯4 (F♯) is its **3rd**, so ♯4 in the bass means V/V in *first inversion* — which the old wording left unstated.
- [x] `Courses/Course 09 — Ear Training Method.md`#Lesson 4 → The material — same wrong claim ("**♯4 in the bass** means a V/V or a half-diminished ii") — now names V/V with its 3rd in the bass (D7/F♯) and ♯ivø7 (F♯ A C E) — same cross-check as above.
- [x] `Tests/Course 09/Course 09 — Lesson 4 Test.md`#Q7 answer key — was: "A secondary dominant of V (V/V), or **a half-diminished ii**" — now: "A secondary dominant of V (V/V, with its 3rd in the bass), or a ♯iv half-diminished (♯ivø7)", and the rubric line beneath it now spells both chords out and states that a iiø7 (D F A♭ C in C) contains no ♯4 at all — **cross-check:** as above; the rubric wording was corrected alongside the label, not just the label.
- [x] `Tests/Course 09/Course 09 — Final Exam.md`#Q13 answer key — was: "the **♯4 in the bass** is the landmark that gives it away before any testing" — now: "the chromatic **♯4** is the landmark… In this clip the D7 is in root position, so ♯4 (F♯) is the chord's 3rd sounding over a bass on degree 2, not a ♯4 bass note" — **cross-check:** `ear-17`'s middle event is MIDI `[62, 66, 69, 72]` = D4 F♯4 A4 C5; lowest sounding note is 62 = D = scale degree 2 of C, and 66 = F♯ = ♯4 sits a 3rd above it. The key asserted a voicing the audio does not contain. **This is the one confirmed disagreement between `eartrain.json` and a curriculum note** — the audio is right, the note was wrong, so the note was fixed and nothing under `Machine/School/` was touched.
- [x] `Concepts/EAR-C07 — A chord is a gestalt, not a stack of degrees.md`#Drill — was: "Play the **six** diatonic triads of C" — now: "Play the **seven** diatonic triads of C" — **cross-check:** the major scale has 7 degrees, so stacking diatonic thirds on each yields 7 triads: C(0,4,7) Dm(2,5,9) Em(4,7,11) F(5,9,0) G(7,11,2) Am(9,0,4) B°(11,2,5). Seven, not six. `Tests/Course 02/Course 02 — Lesson 1 Test.md` and `Course 02 — Final Exam.md` both already say "the **seven** diatonic triads of a major key", confirming the correct count is used elsewhere in the curriculum.
- [x] `Courses/Course 09 — Ear Training Method.md`#Lesson 3 → The routine — same miscount ("the six diatonic triads of C in random order against a drone") — now "seven" — same cross-check.

**Verified-correct and logged as checked** (a sample of the claims that passed both routes, so coverage is auditable):

- `EAR-C01` — "the same physical C … as tonic of C major vs as scale degree 5 of F major": F major = F G A B♭ C D E, so C is degree 5 by letter count; semitone check F=5 → C=0, (0−5) mod 12 = 7 = perfect 5th. ✓
- `EAR-C01` — "play a C major scale and stop on B": B is degree 7 of C major, one note short of the octave. ✓
- `EAR-C03` / Lesson 2 Q8 — E vs E♭ over a C drone as 3 vs ♭3: C=0→E=4 (M3), C=0→E♭=3 (m3), one semitone apart. ✓
- `EAR-C05` / Lesson 2 Q6 / Final Q4 — "5 and ♯4 are one fret apart": degree 5 = 7 semitones, ♯4 = 6 semitones, difference 1. Drill's G and F♯ over a C drone = exactly those two degrees. ✓
- `EAR-C05` — drill's E and A over a C drone as the confusable pair: E = degree 3, A = degree 6, which is the 3/6 same-world pair the concept names. ✓
- `EAR-C06` / Lesson 3 Q4 / Final Q15 — the three sevenths: Cmaj7 = C E G B (0-4-7-11, B→C is a half step = the stated "rub against the root"); C7 = C E G B♭ (0-4-7-10, ♭7 on top); Cm7♭5 = C E♭ G♭ B♭ (0-3-6-10 = diminished triad 0-3-6 carrying a minor 7th). All three spellings and the "same ♭7" claim check out. ✓
- `EAR-C08` — C/E is first inversion (E = 3rd), C/G is second inversion (G = 5th). ✓
- `EAR-C09` — vi vs VI in C = Am vs A major. ✓
- `EAR-C10` / Lesson 4 Q5 — "IV→iii (4→3) or vii°→I (7→1)" are the only two half-step spots: the major scale's two semitone steps are 3–4 and 7–1 only (C-major intervals 0,2,4,5,7,9,11), so F→E = 5→4 = 1 semitone and B→C = 11→0 = 1 semitone, and no other adjacent diatonic roots are a semitone apart. ✓
- `EAR-C10` / Lesson 4 Q6 — "IV→iii is the only diatonic spot a major chord drops to a minor chord a half step below": major triads in C are I(C), IV(F), V(G); minor are ii(Dm), iii(Em), vi(Am). Only F→E is a semitone with that quality pair (C→B is major→**diminished**, G→F♯ is not diatonic). ✓
- `EAR-C10` — the minor-key equivalent "♭VI→v": in A natural minor the triads are Am B° C Dm Em F G; F(major) → Em(minor) is a semitone down, and the other semitone root move C→B° is major→diminished. Unique, as claimed. ✓
- `EAR-C10`#Drill — the same two moves in A♭: A♭ B♭ C D♭ E♭ F G, so IV=D♭ → iii=Cm (D♭=1 → C=0, one semitone) and vii°=G° → I=A♭ (G=7 → A♭=8, one semitone). ✓
- `EAR-C11` / Lesson 4 Q8–Q9 — authentic V–I, plagal IV–I, half …–V, deceptive V–vi. All four Roman-numeral pairs standard and correct. ✓
- `EAR-C12` / Lesson 5 Q2 — "I played a G and it feels like 4, so the key is D": D major = D E F♯ G, G is degree 4; semitone check D=2 → G=7 = 5 semitones = perfect 4th. ✓
- Final Exam Q19 — "an E that feels like 5 makes the key A": A major = A B C♯ D E, E is degree 5; semitone check A=9 → E=4, (4−9) mod 12 = 7 = perfect 5th. ✓
- Final Exam Q3 — `ear-01` is C4→G4, upper degree 5, assigned to the "5 world", consistent with EAR-C04's stated grouping. ✓
- Final Exam header arithmetic — "fourteen by ear, six on the method": audio-tagged questions are Q1–Q9 and Q11–Q15 = 14; non-audio are Q10, Q16–Q20 = 6; 14+6 = 20 = the frontmatter's `questions: 20`. ✓
- Frontmatter counts — Class 4 declares `lessons: 5, concepts: 14`; Course 09's lesson table sums 2+3+3+3+3 = 14 concepts across 5 lessons; concept files EAR-C01…C14 = 14; each test's `questions:` matches its actual question count (9, 10, 10, 10, 10, 20). All consistent, and `syllabus.json` course `09` agrees (`lessons: 5, concepts: 14, target: 70, class: 4`). ✓
- **All 20 `eartrain.json` clips recomputed from raw MIDI numbers** and every stated answer is correct: `ear-01` 60→67 = 7 st = P5 · `ear-02` 60→64 = 4 = M3 · `ear-03` 57→60 = 3 = m3 · `ear-04` 60+66 = 6 = tritone · `ear-05` 69→60 = −9 = descending M6 · `ear-06` 60→70 = 10 = m7 · `ear-07` (0,4,7) major triad · `ear-08` (0,3,7) minor · `ear-09` (0,3,6) diminished · `ear-10` (0,4,7,10) dominant 7th · `ear-11` (0,3,6,10) half-diminished 7th · `ear-12` (0,2,4,5,7,9,11,12) major scale · `ear-13` (0,2,3,5,7,8,10,12) natural minor · `ear-14` D-rooted (0,2,3,5,7,9,10,12) Dorian · `ear-15` C / G-B-D(1st inv) / A-C-E(1st inv) / F-A-C(2nd inv) = I–V–vi–IV · `ear-16` Dm7–G7–Cmaj7 = ii7–V7–Imaj7 · `ear-17` C–D7–G = I–V/V–V · `ear-18` C–F–G–Am ending V→vi = deceptive · `ear-19` C7→F7 (both 0,4,7,10) = I7→IV7 · `ear-20` Dø7–G7–Cm = iiø7–V7–i. `eartrain.json` and `school-eartrain-render.py` hold byte-identical clip specs. **No clip's stated interval or chord is wrong.** ✓

### Flagged (Nate's call)

- [ ] `Courses/Course 09 — Ear Training Method.md` + all six `Tests/Course 09/` pages#grade commands — every test on this course tells you to run `/school test **13** n` and the course note says `/school final **13**`, but `syllabus.json` keys this course as `09`; **course 13 is "Signal Path & Synthesis Methods" (Class 6, Sound Design)** — a different course entirely. `School Config.md` lines 262–268 record an earlier correction of exactly this 13-means-Ear-Training confusion (fixed 2026-08-20; these test pages were written 2026-08-19, so they kept the stale ID). Not a theory claim, and it touches the school's command/ID layer that other agents and the orchestrator share, so I did not edit it. If `13` is not a live alias the school skill still accepts, this is a one-token change in 7 places (`13` → `09`).
- [ ] `Tests/Course 09/Course 09 — Final Exam.md`#Q13 + `EAR-C10` — the concept teaches "**♯4 in the bass**" as the landmark, but the exam's only ♯4 question plays `ear-17`, whose D7 is in **root position** (♯4 is an inner voice). I corrected the key's description of the audio, but the pedagogical mismatch remains: the question doesn't actually demonstrate the landmark it tests. Fixing it properly means re-voicing the clip to D7/F♯ — a change under `Machine/School/`, which is out of bounds here. Your call whether to re-render.
- [ ] `Concepts/EAR-C07`#Answer — the three example labels are "major-on-4, minor-on-6, **dominant-on-♭7**". The first two are diatonic to a major key; the third is not (♭7 isn't in the major scale, and ♭VII7 is a borrowed/blues chord). It's fine as a *label-format* example but reads as if all three are the same kind of thing. Wording, not math — I'd either swap it for a diatonic third example (e.g. "diminished-on-7") or say explicitly that the format also covers non-diatonic chords.
- [ ] `Concepts/EAR-C07`#Drill + `Course 09`#Lesson 3 routine — I corrected "six diatonic triads" to "seven" because the count is unambiguous. If the original intent was deliberately to *omit* B° from the drill, the wording should say so ("the six major and minor diatonic triads of C, leaving out B°") rather than miscount — but that's a pedagogical choice, so flagging the alternative rather than assuming it.
- [ ] `Courses/Course 09 — Ear Training Method.md`#Lesson 2 routine — the `[[Visual Ear Training - The Perfect Melody]]` bullet appears **twice, verbatim**, once at the top of the routine and once near the bottom. Duplication, not a theory error, so not auto-fixed. Delete one.
- [ ] `Concepts/EAR-C04`#Answer — the "5 world (1,4,5,2) / 3 world (3,6,7)" split and the feeling vocabulary throughout the course are Max Konyi's taxonomy, not derivable facts. I verified the split is used *self-consistently* everywhere it appears (concept, Lesson 2 Q3/Q5/Q7, Final Q3) but there is no arithmetic that can confirm the grouping itself. Source-dependent by nature; noting it so the report doesn't imply it was mathematically validated.
- [ ] `Course 09`#Lessons 1–2 + `Final Exam` — the three 1-hour "Immersive Ear Training" videos, "Visual Ear Training — The Perfect Melody", and the three source-video notes are cited recordings. Their *existence and content* were not verified (out of scope per the brief: anything depending on a cited recording or video).

### Echoed elsewhere

- The "**half-diminished ii**" error appeared in **three** files, not one: `Concepts/EAR-C10`, `Courses/Course 09 — Ear Training Method.md` (Lesson 4 material), and `Tests/Course 09/Course 09 — Lesson 4 Test.md` (Q7 key + rubric). All three fixed together. A curriculum-wide grep for `half-diminished ii` / `iiø` / `♯4 in the bass` now returns zero hits.
- The "**six diatonic triads of C**" miscount appeared in **two** files: `Concepts/EAR-C07` (drill) and `Courses/Course 09` (Lesson 3 routine). Both fixed. A grep for `six diatonic` now returns zero hits.
- Checked outside the batch for the same error family and found **no further echoes**. `Concepts/CHD-C10` and `Courses/Course 29` both discuss `♯iv°` (diminished, not half-diminished) and both are **correct** — ♯4̂ genuinely is 5̂'s leading tone (F♯→G), and I's leading tone B genuinely is not in F♯ A C. No edit needed, and they are another class's files anyway.

---

## Batch 5 — Class 2, Reading & Rhythm

**Scope:** `Class 2 — Reading & Rhythm.md` · `Course 04 — Reading & Position Play.md` · `Course 05 — Subdivision, Feel & Genre.md` · 18 concept notes (NOT-C01–C09, RHY-C01–C09) · 8 course test papers · `Theory Midterm 2.md` (40 q) · `Theory Final Exam.md` (all 60 q re-checked, not just Class 2's Part E).

**Checked:** 18 concepts (answer callout + "why it matters" + drill = 54 claim blocks) / 192 test questions with their answer keys and rubrics (Course 04: 46, Course 05: 46, Theory Midterm 2: 40, Theory Final Exam: 60) / ~30 course-note worked examples and rule bullets / 14 structural counts (frontmatter `questions:` vs actual stems vs key entries on all 10 papers, lesson tables vs concept `lesson:` fields, class/course concept rosters).

Every rhythm claim was recomputed in a common subdivision (eighths, 16ths or triplet-12ths) independently of the taught shortcut; every reading claim was re-derived from standard tuning (E2 A2 D3 G3 B3 E4) and from absolute pitch, not from the concept's own rule.

---

### Fixed

**Confirmed error 1 — "A triplet is exactly 2:1" (4 files, 6 places).** A triplet divides the beat into three *equal* parts (1:1:1); the 2:1 belongs to the **shuffle / full triplet swing**, i.e. the pair left when the middle triplet note goes. RHY-C03 contradicted itself inside one sentence ("a triplet divides the beat into three equal parts … a triplet is exactly 2:1"), and the error was copied into the course note, the lesson-test key *and its question stem*, and the midterm key *and its question stem*.
*Cross-check (12ths of a beat):* straight eighths = 6+6 (1:1) · triplet = 4+4+4 (1:1:1) · shuffle/full-triplet swing = 8+4 (2:1). Swing is the continuum 6:6 → 8:4.

- [x] `Concepts/RHY-C03 — Swing is a triplet with the middle note gone.md`#Answer — was: "A triplet is exactly 2:1" — now: "Full triplet swing is exactly **2:1** — the long note takes two of the beat's three triplet parts and the short note takes one" — confirmed by counting the beat in 12ths: the triplet is 4+4+4, the 2:1 is 8+4.
- [x] `Courses/Course 05 — Subdivision, Feel & Genre.md`#Lesson 2 bullet — was: "A triplet is exactly 2:1, while swing sits anywhere between straight and full triplet" — now: "Full triplet swing is exactly 2:1 — long note two of the beat's three triplet parts, short note one — while swing sits anywhere between straight (1:1) and that full triplet" — same 12ths count.
- [x] `Tests/Course 05/Course 05 — Lesson 2 Test.md`#Q3 stem — was: "A triplet is an exact ratio. What is it…" (false premise in the *question*, so a correct student answer would read as wrong) — now: "Full triplet swing is an exact ratio between the two eighths of a pair. What is it…".
- [x] `Tests/Course 05/Course 05 — Lesson 2 Test.md`#Q3 key — was: "Straight is 1:1, full triplet is 2:1" — now: spells out long = two of the beat's three triplet parts, short = one, and states that the triplet itself is three equal parts.
- [x] `Tests/Theory Midterm 2.md`#Q21 stem — was: "Give the triplet ratio" — now: "Give the full-triplet swing ratio".
- [x] `Tests/Theory Midterm 2.md`#Q21 key — was: "A triplet is exactly 2:1" — now: "Full triplet swing is exactly 2:1 — swing sits anywhere between straight (1:1) and that", with the triplet's three equal parts stated explicitly.

**Confirmed error 2 — "three dotted-quarters across two 4/4 bars … realigns every 3 bars" (3 files, 5 places).** Three dotted quarters = 9 eighths; two bars of 4/4 = 16 eighths. The figure as written neither fills the loop nor produces the stated realignment. The realignment figure (3 bars) is right, but it belongs to a *continuous dotted-quarter pulse*, not to three hits.
*Cross-check (eighths):* dotted quarter = 3 eighths, 4/4 bar = 8 eighths, LCM(3,8) = 24 eighths = **8 dotted quarters = exactly 3 bars**, landing on the downbeat of bar 4. (Against a 2-bar loop the drift would only close after 6 bars, which is what the old wording implied and which contradicted its own "every three bars".)

- [x] `Concepts/RHY-C04 — Polyrhythm and hemiola.md`#Why it matters — was: "three dotted-quarters across two 4/4 bars cycles out of phase and realigns every 3 bars" — now: "a dotted-quarter pulse over 4/4 — three eighths against a bar of eight — … realigns on the downbeat every 3 bars (8 dotted quarters = 24 eighths = 3 bars)" — confirmed by the LCM count above.
- [x] `Concepts/RHY-C04 — Polyrhythm and hemiola.md`#Drill — was: "program three dotted-quarter hits across a 2-bar loop" (the drill can't produce the drift it asks you to hear — the loop is too short) — now: "a repeating dotted-quarter hit over a 4/4 loop at least 3 bars long … then land back on the downbeat of bar 4".
- [x] `Courses/Course 05 — Subdivision, Feel & Genre.md`#Lesson 2 Homework (Technique) — same wrong figure — now: "a repeating dotted-quarter hit across a 4/4 loop three bars or longer … realign on the downbeat every three bars — eight dotted quarters to twenty-four eighths".
- [x] `Tests/Course 05/Course 05 — Lesson 2 Test.md`#Q12 rubric — was: "describes three dotted-quarters across two 4/4 bars (2)" — this is the line the grader scores against, so the wrong figure was worth 2 of 5 marks — now: "describes a dotted-quarter pulse against 4/4, three eighths against a bar of eight (2)".
- [x] `Tests/Course 05/Course 05 — Lesson 2 Test.md`#Q12 explanation — rewritten to "each hit is worth three eighths against a bar of eight … eight dotted quarters make twenty-four eighths, which is exactly three 4/4 bars".

**Confirmed error 3 — concept counts.**
- [x] `Tests/Course 04/Course 04 — Final Exam.md`#header — was: "seeds all **eight** concepts to `maintenance`" — now: "all **nine**" — Course 04 carries NOT-C01…C09 (frontmatter `concepts: 9`; lesson table 5+2+2 = 9; nine concept files exist). Cross-checked against the other 17 course finals: every other one matches its course frontmatter, so 04 and 05 were the outliers.
- [x] `Tests/Course 05/Course 05 — Final Exam.md`#header — was: "seeds all **eight** concepts" — now: "all **nine**" — RHY-C01…C09; frontmatter `concepts: 9`; lesson table 3+4+2 = 9.
- [x] `Classes/Class 2 — Reading & Rhythm.md`#frontmatter — was: `concepts: 16` — now: `concepts: 18` — 9 (Course 04) + 9 (Course 05). Cross-checked the convention on Class 1 (8+10+8+13+16 = 55 = its stated 55) and Class 3 (11+8+8 = 27 = its stated 27), so class notes do carry the sum of their courses and 16 was simply wrong.

**Confirmed error 4 — mis-tagged concept (silently removed a concept from the final).**
- [x] `Tests/Course 04/Course 04 — Final Exam.md`#Q14 — was: `<!-- concept: NOT-C08 -->` on the question "You fall behind. What do you do, and what do you never do?" — that is verbatim NOT-C09's question — now: `NOT-C09`. Before the fix the final tagged **zero** questions to NOT-C09 while claiming to seed all of the course's concepts; after it, all nine concepts have coverage (verified by re-tallying every `concept:` tag in the paper).

**Confirmed error 5 — stale course numbers in prose (not command arguments).**
- [x] `Tests/Theory Midterm 2.md`#header — was: "covers Class 2: Courses **08 and 06**" — now: "Courses **04 and 05**" — the paper's own Part A/Part B headers already said "(Course 04)" and "(Course 05)", so the page contradicted itself.
- [x] `Tests/Theory Final Exam.md`#Part E header — was: "Cumulative: Class 2 (Courses **08, 06**)" — now: "(Courses **04, 05**)".
- [x] `Tests/Theory Final Exam.md`#Part D header — was: "Cumulative: Class 1 (Courses **01, 03, 05**)" — now: "(Courses **01, 02, 03**)" — Part D's questions are tagged FND (Course 01), HAR (Course 02) and SCL (Course 03); Course 05 is a Class 2 course and appears nowhere in Part D. Same legacy-numbering family (01→01, 02→"03", 03→"05", 04→"08", 05→"06").

---

### Verified correct (logged so coverage is auditable)

Everything below was recomputed and **passed** both ways.

- **Note values.** Dotted half = 3 (16ths: 8+4 = 12/4) · double-dotted half = 3½ (8+4+2 = 14/4, *not* 4) · dotted quarter = 1½ (4+2 = 6/4) · double-dotted quarter = 1¾ (4+2+1 = 7/4). Correct in NOT-C03, Course 04 Lesson 1 bullets + homework, Course 04 L1 Q6/Q7/Q8, Course 04 Final Q4 ("3 · 3½ · 1¾") and Q5, Midterm 2 Q5/Q6, Theory Final Q41.
- **Compound meter.** 6/8 = two dotted-quarter beats (6 eighths ÷ 3, beat = 3 eighths) · 9/8 = three · 12/8 = four; "no undotted value spans three eighths" holds. Correct in RHY-C01, Course 05 L1 Q1–Q4, Course 05 Final Q1/Q2, Midterm 2 Q15/Q16/Q29, Theory Final Q45.
- **Metric hierarchy.** 1 > 3 > 2 and 4 > offbeats > "e"/"a"; kick on 1 and 3, snare on 2 and 4 falls out of it. RHY-C09, Course 05 L1 Q7, Midterm 2 Q17. 4/4 = eight eighth-note positions ✓.
- **Half-time.** Snare 2-and-4 → beat 3 doubles the backbeat gap from 2 beats to 4, so 140 is felt at ~70 — the "doubling the gap halves the perceived tempo" phrasing in Course 05 L3 Q4 is arithmetically exact. RHY-C05, Course 05 L3 Q2/Q3/Q4/Q8, Course 05 Final Q12/Q16, Midterm 2 Q27/Q33.
- **3-against-2 mnemonic.** "Nice cup of tea" over 6 units: duple at 0 and 3 ("nice", "of"), triple at 0, 2, 4 ("nice", "cup", "tea") — spoken order nice–cup–of–tea matches the sounding order. RHY-C04, Course 05 L2 Q12, Midterm 2 Q26. Hemiola as "three groups of two against two groups of three" = 6 units grouped 2+2+2 vs 3+3 ✓.
- **Fretboard/reading.** "The same written pitch exists in five or six places" — re-derived from standard tuning: E4 sits at string 1 fret 0, string 2 fret 5, string 3 fret 9, string 4 fret 14, string 5 fret 19, string 6 fret 24 → 5 or 6 depending on fret count ✓. Guitar sounds an **octave lower** than written (permanent 8vb, written pitch above sounding pitch) ✓ in NOT-C06, Course 04 L2 Q1, Course 04 Final Q9, Midterm 2 Q11/Q35, Theory Final Q43. Position system = four-fret window, one finger per fret ✓.
- **Notation rules.** Accidental lasts to the bar line, on that exact line/space only, not the same letter in another octave ✓ · tie = same pitch / slur = different pitches (hammer-on or pull-off on guitar) ✓ · 8va higher, cancelled by *loco* or the end of the bracket, 8vb lower ✓ · D.S. al Coda = sign → To Coda → jump ✓ · five-step scan order ✓.
- **Structural counts.** All 10 papers: frontmatter `questions:` = number of `#### Q` stems = number of answer-key entries (16/12/9/9, 16/9/12/9, 40, 60). Both course lesson tables match the concept files' `lesson:` frontmatter exactly (04: 5/2/2 · 05: 3/4/2). Course finals' "Sixteen questions" matches both papers.
- **Theory Final Exam, whole paper.** Re-checked all 60 questions, including the ~32 Class 3 ones another batch cleared, and the Class 1 carry-over in Part D. Spot-verified by semitone count: inversions m2→M7 (1/11), P5→P4 (7/5), M3→m6 (4/8), d5→A4 (6/6) ✓ · G7 tritone B–F = 6 semitones, B→C and F→E ✓ · V/V in C = D7 (D F♯ A C) → G ✓ · A harmonic minor A B C D E F G♯ with the A2 F–G♯ (3 semitones, 2 letters) ✓ · D Dorian D E F G A B C, characteristic ♮6 = B ✓ · E♭ Lydian E♭ F G A B♭ C D, ♯4 = A♮ ✓ · F♭ = E, correct in C♭ major (4th degree) and as ♭6 of A♭ minor, with the G♭-major near-miss stated correctly ✓ · E major = F♯ C♯ G♯ D♯, four flats = A♭ major = B♭ E♭ A♭ D♭ ✓ · order of sharps/flats exact reverses ✓ · blues in A = A A A A / D D A A / E D A E, blues scale A C D E♭ E G ✓ · Aeolian cadence ♭VI–♭VII–i = F G Am in A minor ✓ · chromatic mediants from C = E, A, E♭, A♭ ✓ · Axis rotations I–V–vi–IV / vi–IV–I–V / IV–I–V–vi / V–vi–IV–I ✓ · C–G/B–Am–F bass line C–B–A–F ✓. Only the two Part D/E headers above were wrong.

---

### Flagged (Nate's call)

- [ ] `Tests/Theory Midterm 2.md`#header — "Roughly 60% revisits the course finals; 40% is **synthesis**". The actual paper is 28 recall questions (70%), 7 synthesis (17.5%) and 5 listening (12.5%). Either the description or the paper's balance is wrong; I didn't guess which. Would rewrite as "70% revisits the course material, Part C is synthesis, Part D is listening" *unless* you'd rather add synthesis questions.
- [ ] `Tests/Course 05/Course 05 — Final Exam.md`#coverage — the final has **no RHY-C09 question** (strong/weak hierarchy) yet passing it seeds all nine concepts to `maintenance`, so a concept can reach maintenance untested. Course 04's final had the same hole via the mis-tag and is now closed; this one needs a question, and swapping one of the three RHY-C06 questions would do it.
- [ ] `Courses/Course 04 — Reading & Position Play.md` + 4 test pages — **stale `/school` command arguments**, not touched per instruction: `/school final 08` (course note + Course 04 Final), `/school test 08 1|2|3` (Course 04 lesson tests), `/school final 06` (Course 05 note + Course 05 Final), `/school test 06 1|2|3` (Course 05 lesson tests). 10 occurrences; they should read 04 and 05.
- [ ] `Courses/Course 04 …`#Lesson 2 + `NOT-C07` + `Course 04 — Lesson 2 Test`#Q8 + `Midterm 2`#Q13 — "Leavitt holds Volume 1 of *Modern Method* in first position for **24 pages**". A cited-book claim I can't verify from the vault; it's repeated in four places, so if the number is off it's off everywhere. Worth one check against the book.
- [ ] `Tests/Course 04/Course 04 — Final Exam.md`#Q4, `Midterm 2`#Q5/Q6, `Theory Final`#Q41 — these ask for note values "in beats" **without stating the meter**, while the keys assume 4/4 (a dotted half is 2 beats in 6/8). NOT-C03 and Course 04 L1 Q6 both say "In 4/4" explicitly. Left alone because it's wording, not a wrong answer; adding "In 4/4" to all three would make it uniform.
- [ ] `Concepts/NOT-C08`#Why it matters ("**1/5** — key signature counts, BPM isn't the time signature"), `Concepts/RHY-C04` ("**Both blank**, and hemiola appeared nowhere in the vault before 2026-08-03"), `Concepts/RHY-C08` ("**Your best two answers in the strand**") — diagnostic residue from the original assessment left in teaching notes. Reads as grading exhaust in material meant to be studied; I'd strip it, but it's your voice and your call.
- [ ] `Tests/Course 04/Course 04 — Final Exam.md`#Q16 and `Course 04 — Lesson 3 Test`#Q9 — both tagged NOT-C08 (the 30-second scan) but both actually ask about the course's design (why a test can't measure sight reading). Not wrong enough to retag blind, but they inflate NOT-C08's apparent coverage.
- [ ] Judgment items left untouched as specified: pocket's 5–30 ms / >40 ms window (RHY-C06), quantize/humanize 50–75% strength (RHY-C08), boom-bap ~85–95 vs trap ~130–145 BPM and kit/feel descriptions (RHY-C07), "hip hop sits behind the beat", the 808-as-kick-and-bass consequence, and every free-text rubric's pedagogical framing.

---

### Echoed elsewhere

- The "triplet is exactly 2:1" error existed in **four** files — `RHY-C03` (concept), `Course 05` (course note bullet), `Course 05 — Lesson 2 Test` (Q3 stem **and** key), `Theory Midterm 2` (Q21 stem **and** key). All six places fixed together. `Course 05 — Final Exam` Q6 phrases the same idea correctly ("straight and full triplet are two endpoints") and needed no change — one of five copies happened to be right, which is why grepping the wrong phrase was necessary rather than trusting any single file.
- The dotted-quarter hemiola error existed in **three** files (`RHY-C04` twice, `Course 05` homework, `Course 05 — Lesson 2 Test` rubric + explanation). All five places fixed together.
- "seeds all eight concepts" was checked against **all 19 course finals**; only Course 04 and Course 05 disagreed with their course frontmatter. Both fixed.
- The legacy course numbering (04→"08", 05→"06") appears in prose in two files (fixed) and in 10 `/school` command arguments (flagged, untouched).

---

---

## Batch 6 — Class 5, Beat & Arrangement

Scope: `Classes/Class 5 — Beat & Arrangement.md` · Courses 10, 11, 12 · 30 concept notes (DRM-C01–C10, BAS-C01–C10, ARR-C01–C10) · 12 course tests · `Tests/Production Midterm 1.md`.

**Checked:** 30 concepts / 193 test questions (each with its answer-key entry, 193 key entries) / 22 course-note material + homework blocks
**Of those, objectively checkable:** ~44 distinct claims (~18%). The rest is production and arrangement technique, gear settings, genre convention and cited-track material — judgment by the spec's own line.

Breakdown of the computable surface, all recomputed two ways:

| Claim family | Instances | Result |
|---|---|---|
| Pitch → frequency (A440-relative) | 2 | pass |
| Kick tuned to root / fifth above | 6 | pass |
| A-B-A-C kick↔hat grid inversion | 4 | pass |
| Metric role of beat 3 | 1 | pass |
| Relative major = +3 semitones / A min → C | 5 | pass |
| Withheld-chord diatonic sets | 2 | pass |
| Pop section-length proportions (4 → ~8) | 4 | pass |
| Bar-phrase drift arithmetic | 1 | **1 fail** |
| Section/loop bar counts (32/8, 3-vs-4-bar) | 2 | pass |
| Question counts vs frontmatter vs key entries | 13 files × 3 | pass |
| Concept counts (class, course, exam coverage) | 8 | **4 fail, 2 coverage gaps** |
| 55 Hz kick/bass collision figures across 5 files | 5 | pass (internally consistent) |

---

### Fixed

- [x] `Tests/Course 12/Course 12 — Lesson 2 Test.md`#Q12 key (long explanation) — was: a 10-bar loop against 8-bar vocal phrases "keeps landing **a bar and a half** out of step with it" — now: "keeps landing **two more bars** out of step with it on every repeat" — *Taught method:* the lesson's own framing is that the loop and the vocal phrase are both whole-bar units, so any misalignment is a whole number of bars; a half-bar offset can't arise from two integer periods. *Independent arithmetic:* phase drift per repeat = 10 − 8 = 2 bars; offsets cycle 2 → 4 → 6 → 0, realigning at lcm(10,8) = 40 bars. gcd(10,8) = 2, so every reachable offset is a multiple of 2 bars. 1.5 is not in that set. Both methods agree the figure is wrong and that 2 bars per repeat is right.
- [x] `Classes/Class 5 — Beat & Arrangement.md`#frontmatter — was: `concepts: 28` — now: `concepts: 30` — *Taught method:* sum the three courses' declared `concepts:` (10 + 10 + 10). *Independent:* count concept files on disk by strand — DRM 10, BAS 10, ARR 10 = 30; and count the `## Concepts` bullets in each course note's three lessons (3+3+4 patterns) = 30. Cross-checked against every other class: Classes 1, 3, 4 and 10 all declare their exact file count, so the declared number is meant to be accurate and 28 was simply stale.
- [x] `School.md`#Class 5 row — was: "9 lessons · **28** concepts" — now: "· **30** concepts" — same claim echoed; fixed together. (`lessons: 9` verified separately: 3 + 3 + 3 = 9, passes.)
- [x] `Courses/Course 11 — Bass Writing & Design.md`#Course final — was: "eighteen questions across the **nine** concepts" — now: "across the **ten** concepts" — *Taught method:* the note's own `## Concepts` lists total BAS-C01…C10. *Independent:* `grep` of `<!-- concept: -->` tags in `Course 11 — Final Exam.md` returns ten distinct BAS ids. The exam does reach all ten; only the number was stale.
- [x] `Tests/Course 11/Course 11 — Final Exam.md`#header — was: "18 questions · pass at 80% · **two per concept**" and "seeds all **nine** concepts to `maintenance`" — now: "18 questions · pass at 80% · cumulative across all three lessons" and "seeds all **ten** concepts" — *Independent:* the tag census is BAS-C01…C05 and C07…C09 at two questions each (16) plus BAS-C06 and BAS-C10 at one each (2) = 18. Ten concepts at two apiece would be 20, so "two per concept" was arithmetically false as well as stale. Removed the false relation; left the question set untouched (see the flag below — whether to add two questions is a design call, not an arithmetic one).

Three distinct wrong claims, five file edits. No fix touched a technique, gear or genre statement.

---

### Flagged (Nate's call)

- [ ] `Tests/Course 10/Course 10 — Lesson 1 Test.md`#Q2 — **the highest-consequence item in this batch.** Q2 asks "Name the **three** components of a synthesised kick" and its key gives click / body / pitch envelope. Every other statement of the same claim says **four**: `DRM-C02` ("Name the four parts"), the Course 10 note Lesson 1 ("four parts to control: body, pitch envelope, click and light saturation"), the Lesson 1 homework ("name the four parts"), `Course 10 — Final Exam` Q3, and `Production Midterm 1` Q2 — five sources against one. Q2 is an *objective* (string-match) question, so a student who learned the lesson as taught and answers "body, pitch envelope, click, saturation" can be marked wrong by the course's own key. Not auto-fixed because the resolution is a pedagogical choice — either make Q2 four-part to match everything else (recommended), or keep three and say explicitly that saturation is processing rather than a synthesis stage. It cannot stay silently both.
- [ ] `Concepts/BAS-C05 — Bass and keys as a conversation.md`#Answer, echoed in `Course 11 — Bass Writing & Design.md` Lesson 2, `Course 11 — Lesson 2 Test.md` Q7 key, `Course 11 — Final Exam.md` Q10 key — "a bass patch playing its own upper harmony voice **a 3rd or 5th above the root, in contrary motion** to the root line." These two halves cannot both be true: a voice held at a fixed interval above another moves in *parallel* motion by definition; contrary motion requires the interval to change. The Final Exam key even glosses it as "the two voices move against each other rather than in parallel," which restates the contradiction rather than resolving it. Almost certainly the intended sense is *enters* a 3rd or 5th above and then moves contrary (so the interval widens and narrows). Suggested wording: "an upper voice starting a 3rd or 5th above the root and then moving in contrary motion to it." Flagged not fixed because it is a wording repair around a theory term, in four files — and because it is exactly the shape of the bug that started this audit: every reader nods at "contrary motion" without noticing it can't coexist with a fixed interval.
- [ ] `Concepts/BAS-C06 — Syncopate off the kick to make it funky.md`#Answer, echoed in `Course 11 — Lesson 2 Test.md` Q8 key ("The strong beats are 1, 2, 3 and 4") and `Production Midterm 1` Q20 key — calls all four quarter-note beats of 4/4 "the strong beats." Defensible *relative to the 16ths between them*, but it collides inside this same class with `Course 10 — Lesson 2 Test.md` Q4, whose key hinges on beat 3 being "a strong beat" as against beats 2 and 4 — a distinction that is meaningless if all four are strong. It will also read as flatly wrong against whatever Class 2 (Reading & Rhythm) teaches about metric hierarchy. Suggested: call them "the on-beat quarter positions" or "the downbeats" in BAS-C06, and reserve "strong beat" for the 1-and-3 sense the drum course uses. Flag, not fix: it's terminology, and the right wording depends on what Batch 5 settled on for Class 2.
- [ ] `Tests/Course 12/Course 12 — Final Exam.md`#header + `Courses/Course 12 — Arrangement & Song Form.md`#Course final — both say "eighteen questions across the **nine** concepts" / "seeds all nine concepts to `maintenance`", but Course 12 has **ten** (ARR-C01…C10). The tag census confirms the final exam contains **no ARR-C10 question at all** — ARR-C01…C09 at two apiece = 18. So unlike the Course 11 case, the number here is an accurate description of the paper and the real defect is a coverage gap: a student can pass the Course 12 final without ever being tested on ARR-C10, and passing then seeds a concept to `maintenance` that was never examined. Deliberately **not** fixed — changing "nine" to "ten" would paper the gap over. The fix Nate should pick is to add two ARR-C10 questions (the simplicity referee; ARR-C10 is already tested in `Course 12 — Lesson 2 Test.md` Q4, so the material exists) and *then* update the count.
- [ ] `Tests/Production Midterm 1.md`#header — "Roughly 60% revisits the course finals; **40% is synthesis**." Part D is the synthesis part and holds Q35–Q40: 6 of 40 = **15%**, against 34 of 40 = 85% for Parts A–C. Off by a factor of ~2.7. Two possible resolutions and they are different decisions: (a) the paper was *designed* for 40% synthesis and under-delivers, so add ~10 more Part D questions; or (b) the line is just a stale description, so change it to "roughly 85% / 15%". Not auto-fixed because (b) would quietly retire a design intent.
- [ ] `Tests/Production Midterm 1.md`#header + coverage — the midterm's 40 tagged questions cover 27 of the class's 30 concepts. The three missing are **DRM-C10, BAS-C10 and ARR-C10** — every single `-C10`. Combined with the stale "28 concepts" on the class note and the Course 11 / Course 12 count errors above, the picture is unambiguous: the three C10 concepts were written *after* the tests, class metadata and exam headers were generated, and nothing downstream was updated. Worth deciding once whether the C10s are examinable material or bonus reading, rather than three times.
- [ ] Stale `/school` command arguments throughout the batch (flagged per instruction, not fixed — orchestrator sweeps): Course 10 uses `/school test 14`, `/school final 14`; Course 11 uses `16`; Course 12 uses `15`; the lesson tests carry `/school test 14 1`, `16 2`, `15 3` etc. Also **`Tests/Production Midterm 1.md` line 15 in prose**: "covers Class 5 — Beat & Arrangement: **Courses 14, 16 and 15**" — the same stale ids, but in body text rather than a command, so it will be missed by a grep that only targets `/school` lines. Worth adding to the sweep pattern.
- [ ] `Concepts/DRM-C03`, echoed in `Course 10 — Drum Programming & Beat Construction.md` Lesson 1 — "Latch's kick hits F every bar and establishes an F minor the track otherwise avoids." A cited-track key claim, so flag-only by the spec. Noting it because it is the one factual assertion in the batch that a reader would take as checkable: Disclosure's "Latch" is usually catalogued as A♭ major (relative of F minor), so the claim is defensible but not self-evidently right, and the pedagogical point survives either way. Verify against the track, not against theory.

Also noted, below the flag line but worth knowing: `Class 6 — Sound Design` declares 15 concepts against 16 files on disk (SYN 10 + FX 6) — the same late-added-concept pattern, in Batch 7's scope, not touched here.

---

### Echoed elsewhere

- `School.md` (Class 5 summary row) — the `28 concepts` figure from the class note's frontmatter is restated there; fixed in both.
- `Tests/Course 11/Course 11 — Final Exam.md` — the "nine concepts" figure from the Course 11 course note is restated twice in the exam header (question distribution and seeding line); fixed in both files together.
- The `3rd or 5th above the root, in contrary motion` claim appears in **four** files (BAS-C05, the Course 11 note, Lesson 2 Test Q7 key, Final Exam Q10 key) — flagged as a set so they get repaired together rather than one at a time.
- The `strong beats are 1, 2, 3, 4` claim appears in **three** files (BAS-C06, Lesson 2 Test Q8 key, Midterm Q20 key) — same, flagged as a set.
- Verified-clean echoes worth recording as covered: the A-B-A-C kick/hat inversion is stated in four places (DRM-C08, C10 L3 Q2 key, C10 Final Q16 key, Midterm Q11 key) and all four assign it the same way round — syncopated hats under the simple A-bar kick, strong-beat hats under the busy B-bar kick. The 55 Hz kick/bass collision figures agree across five files. "Relative major of A minor is C / +3 semitones" agrees across five. None of these needed a fix, and each was the kind of claim that inverts silently when copy-pasted.

---

---

## Batch 7 — Class 6, Sound Design

Scope: `Class 6 — Sound Design.md`; Courses 13 (SYN, 10 concepts) and 14 (FX, 6 concepts);
16 concept notes; 9 test pages (C13 L1–L4 + Final, C14 L1–L2 + Final, Production Midterm 2).

**Checked:** 16 concepts / 127 test questions (with their 127 answer-key entries and 17 scored rubrics) / 22 course-note worked examples and homework items
**Of those, objectively checkable:** 31 (9 structural counts, 14 numeric/physical claims, 8 concept-tag→question mappings)
The remaining ~112 are definitional, technique, gear or pedagogical-framing claims — flag-only per the spec.

Question counts per page: C13 L1 = 9, L2 = 9, L3 = 10, L4 = 11, Final = 18; C14 L1 = 9, L2 = 9, Final = 12; Midterm 2 = 40. Total 127. Every one matches its own frontmatter `questions:` field and its header bullet — checked individually, all 9 pass.

---

### Fixed

- [x] `Curriculum/Tests/Course 13/Course 13 — Final Exam.md`#header bullet — was: "seeds all **nine** concepts to `maintenance`" — now: "seeds all **ten** concepts" — Taught route: the course note's lesson table gives 1 + 2 + 3 + 4 concepts = 10. Independent route: `ls Concepts/SYN-C*` returns SYN-C01…SYN-C10 = 10 files, and `Course 13`'s own frontmatter says `concepts: 10`. Three routes agree on 10; "nine" agrees with none of them. Cross-checked against the house convention — Course 02's final says "all ten" for 10, Course 14's says "all six" for 6 — so the sentence is a count, not a figure of speech.

- [x] `Curriculum/Classes/Class 6 — Sound Design.md`#frontmatter — was: `concepts: 15` — now: `concepts: 16` — Taught route: the class's `courses: ["13","14"]` × their declared `concepts:` = 10 + 6 = 16. Independent route: file count, SYN 10 + FX 6 = 16. Convention cross-check: of the ten class notes, seven already satisfy class.concepts == Σ(course.concepts) exactly (Class 1 = 8+10+8+13+16 = 55 ✓, Class 3 = 11+8+8 = 27 ✓, Class 7 = 7+9 = 16 ✓, Classes 4, 8, 9, 10 ✓), so the sum is the rule and 15 is the deviation. `school-artifact/build.py:1351` reads this field straight into `n_concepts`, so the wrong number was rendering on the published page.

- [x] `Curriculum/Tests/Production Midterm 2.md`#header bullet 3 — was: "**Fifteen** concepts across two courses" — now: "**Sixteen** concepts" — same arithmetic as above; this is the prose echo of the Class 6 frontmatter error.

- [x] `Curriculum/Tests/Production Midterm 2.md`#header bullet 2 — was: "Roughly **60%** revisits the course finals; **40%** is synthesis" — now: "Roughly **80%** … **20%** is synthesis" — The page defines synthesis questions as its own Part D ("spans both courses"). Taught route: Part D is Q33–Q40 = 8 questions; 8/40 = 20%, leaving Parts A–C = Q1–Q32 = 32/40 = 80%. Independent route: matched every midterm question against the two course finals by text — Part C Q21–Q32 are 12/12 verbatim or near-verbatim from Course 14 Final Q1–Q12, and Part A+B Q1–Q20 are 20/20 traceable to Course 13's final or lesson tests. So the revisit share is ≥ 32/40 by both routes. (Q36 is in fact Course 13 Final Q16 word-for-word inside Part D, which makes the true synthesis share 7/40 = 17.5% — the stated 40% is off by a factor of two either way.) See the flag below if the preferred remedy is adding synthesis questions rather than correcting the description.

### Echoed elsewhere

- `Curriculum/School.md:84` — "Class 6 — Sound Design · production · 6 lessons · **15** concepts" → **16**. Fixed.
- `Curriculum/School.md:85` — "Course 13 — Signal Path & Synthesis Methods — SYN · 0/4 lessons · **9** concepts" → **10**. Fixed. This is the origin of the whole off-by-one: all four fixes above are the same error — SYN-C10 (Wavetable) was added to the strand and never propagated into any count.
- Searched `Curriculum/` for every other statement of these counts (`nine concepts`, `Fifteen concepts`, `all six/ten concepts`, the `N lessons · N concepts` pattern in School.md). No further Class 6 echoes. The identical pattern in Classes 2 and 5 is *not* an echo of my fix — it is the same systemic drift in other batches' files; flagged below, untouched.

---

### Flagged (Nate's call)

- [ ] **`Curriculum/Tests/Course 13/Course 13 — Final Exam.md`#Q15 — wrong concept tag, and it is the root cause of everything fixed above.** Q15 asks "Where does wavetable's movement originate, compared with a subtractive one's?" — verbatim SYN-C10's question — but is tagged `<!-- concept: SYN-C07 -->`. Consequence, computed: the final's 18 tags distribute as C01×3, C02×2, C03×2, C04×2, C05×2, C06×2, C07×**2**, C08×1, C09×2 = 18 across only **nine** distinct concepts, with SYN-C10 appearing zero times. Retag Q15 to SYN-C10 and it becomes ten distinct concepts, which is what the course actually has and what the header bullet I corrected now claims. Until it is retagged, a student who misses the wavetable question gets SYN-C07 re-seeded and SYN-C10 can never be re-seeded from the final at all. `Production Midterm 2.md`#Q18 has the same question tagged correctly as SYN-C10, which is the proof. **Not auto-fixed** — concept tags drive spaced-repetition seeding and other agents are working concurrently; this is a one-line change once the orchestrator says go.

- [ ] **`Concepts/SYN-C05`, `Courses/Course 13`#Lesson 3, `Tests/Course 13/Course 13 — Lesson 3 Test.md`#Q4 key — the recommended LFO rates cannot do what the text says they do.** The taught rule is "layer modulators at different rates … so nothing repeats obviously", and the worked recommendation is "an 8-bar LFO on cutoff, a 1–2 bar one on position". Taught route: two different rates, therefore no obvious repeat — passes. Independent route: these are tempo-synced bar values, so they are phase-locked to the transport and the composite pattern's period is the LCM of the two. LCM(8, 2) = 8 bars. LCM(8, 1) = 8 bars. Layering the fast LFO under the slow one extends the repeat period by **nothing at all** — the patch repeats exactly on the slow LFO's own cycle. The two routes disagree, so the recommendation contradicts its own numbers. It matters because `Course 13 — Final Exam`#Q11 and `Production Midterm 2`#Q14 both set the target explicitly at "sixteen bars without obviously repeating", and the model answer they accept repeats at eight. A rate that is not an integer divisor fixes it: 8-bar + 3-bar gives LCM = 24 bars; 8-bar + 5-bar gives 40. **Flag not fix** — which rates to teach is a settings recommendation, and it appears in four files that should change together (the two key entries say only "a faster one", so only SYN-C05 and the L3 test key state the offending number).

- [ ] **`Courses/Course 14`#Lesson 1 homework, `Concepts/FX-C03`#Drill, `Tests/Course 14/Course 14 — Lesson 1 Test.md`#Q9 key — "null-test that they match" does not null.** The three files instruct building parallel compression on a return track and again with the stock Compressor's Dry/Wet at ~50%, then null-testing them. Live's Dry/Wet is a linear blend, so the one-device path outputs 0.5·dry + 0.5·wet; a return at unity send with the return fader at 0 dB outputs 1.0·dry + 1.0·wet. The dry:wet *balance* is identical, but the amplitude is exactly 2×, i.e. 20·log₁₀(2) = **6.02 dB** hotter. Polarity-invert one against the other and the residual is the signal itself at full level, not silence. They null only after 6.02 dB of compensation. Suggested wording: "match once the levels are matched" — the pedagogical point (they are the same topology) survives intact; only the word "null-test" overclaims.

- [ ] **`Tests/Course 14/Course 14 — Final Exam.md`#Q9 note and `Tests/Production Midterm 2.md`#Q29 note — "even-order harmonics sit at octaves" is true only of the 2nd, 4th and 8th.** Harmonic *n* sits 1200·log₂(n) cents above the fundamental: n=2 → 1200 c = an octave ✓; n=4 → 2400 c = two octaves ✓; n=6 → 1200·log₂6 = 3102 c = two octaves **plus a perfect fifth** ✗; n=10 → 3986 c = three octaves **plus a major third** ✗. Only powers of two are octaves. `Course 14`'s course note and `FX-C05` both write it correctly as "Even-order **(2nd)** sit at octaves" — the two test keys dropped the qualifier and turned a scoped claim into a false general one. Restoring "(2nd)" is a one-word fix in each, but it is a wording call on a widely-used pedagogical shorthand, so it is yours.

- [ ] **`Concepts/FX-C06 — Chain order: EQ, compression, de-ess.md`#Why it matters — leaked grader feedback in the concept note.** The section opens `1.5/5 — you put de-ess after compression, which is right and is the part most people get wrong. What's missing is corrective EQ *first*…`. That is a scored response to a student answer, in second person, pasted into a concept note where the surrounding sixteen notes all carry explanatory prose. Nothing factual in it is wrong; it is in the wrong voice and the wrong document. Rewrite as explanation.

- [ ] **`Tests/Course 13/Course 13 — Lesson 2 Test.md`#Q8 key — "stab" is defined as the organ shape.** The key accepts "stab in place of organ" and justifies it with "A stab is the organ shape, not the pluck shape — attack 0, sustain 100%, release 0." A stab is conventionally a short fully-decayed hit (sustain 0, short decay) — much closer to the pluck shape than to a rectangle that holds at full level for as long as the key is down. `Course 13`#Lesson 2 homework also asks for "a pluck, a pad, a stab and a swell", treating stab and pluck as distinct. Terminology, not math, so flagged: either drop the substitution or re-describe the stab.

- [ ] **`Tests/Production Midterm 2.md`#header bullet 3 — "expect two or three questions on each" does not describe the actual spread.** Counted by tag across all 40: SYN-C01 = 6, SYN-C02 = 3, SYN-C03 = 2, SYN-C04 = 2, SYN-C05 = 3, SYN-C06 = 3, SYN-C07 = 1, SYN-C08 = 2, SYN-C09 = 1, SYN-C10 = 1, FX-C01 = 3, FX-C02 = 3, FX-C03 = 2, FX-C04 = 2, FX-C05 = 3, FX-C06 = 3 (sums to 40 ✓). Three concepts get a single question (SYN-C07, SYN-C09, SYN-C10) and SYN-C01 gets six. Left alone because the honest remedy is a design decision — either soften to "most concepts" or add questions for the three thin ones. Note the three thin ones sit in the same corner as the mis-tag flagged above.
  - Related: if you would rather raise the synthesis share than accept the 80/20 I corrected, adding cross-course questions for SYN-C07/C09/C10 fixes both this and that bullet in one pass.

- [ ] **Command arguments — flagged per instructions, untouched.** Course 13's pages address themselves as course **04** (`/school test 04 1…4`, `/school final 04` in both the course note and the final exam); Course 14's address themselves as course **07** (`/school test 07 1–2`, `/school final 07`). Also `Tests/Production Midterm 2.md`#header bullet 1 states in prose, not in a command: "covers Class 6 — Sound Design: **Courses 04 and 07**", where Class 6's frontmatter says `courses: ["13","14"]`. Left for the orchestrator's sweep since it is the same id family and should be resolved one way everywhere at once.

- [ ] **Out-of-batch instances of the count drift I fixed — for whoever owns those batches.** Same failure, different classes, deliberately not touched: `Class 2` declares `concepts: 16` where Courses 04 + 05 declare 9 + 9 = 18; `Class 5` declares 28 where Courses 10 + 11 + 12 declare 10 + 10 + 10 = 30. `School.md` agrees with the stale class figures rather than the courses for both (lines 60–61 show Courses 04/05 at 8 each, lines 79–80 show Courses 11/12 at 9 each, against frontmatter of 9, 9, 10, 10). Separately, `School.md:20` says the school is "Twenty-nine: **nineteen** taught, one standing, and **nine** instrument courses" — the total 29 is right, but the split is 18 taught / 1 standing / 10 instrument (19–24 Hanon = 6, 25–28 Reading = 4).

---

### Verified and passing — logged as checked

Every numeric or physical claim in the batch, each run the taught way and then independently:

- **LFO below hearing range, "~under 20 Hz"** (SYN-C04, C13 L3 Q1/Q3, C13 Final Q8/Q9, Midterm Q11/Q12) — taught: below audibility. Independent: 20 Hz has a 50 ms period, which is the boundary at which successive cycles fuse into pitch rather than reading as separate events. Agree. ✓
- **"Push an LFO past ~20 Hz and it becomes FM"** (5 places) — audio-rate modulation of a parameter is by definition frequency/amplitude modulation; the sideband structure appears continuously as the modulator crosses into the audio band. ✓
- **FM ratio claims, 1:1 / 1:2 / 1:1.41** (SYN-C08 drill, Course 13 Lesson 4 homework) — taught: integer harmonic, non-integer inharmonic. Independent, by Chowning sidebands at f_c ± n·f_m: 1:1 → {0, f, 2f, 3f…} = integer multiples, harmonic ✓. 1:2 → {f, 3f, 5f…} = odd multiples, still harmonic on fundamental f ✓ (matches the course note's "then 1:2, still harmonic"). 1:1.41 → {0.41f, f, 1.82f, 2.41f, 3.23f, 3.82f…}; referred to the lowest component the ratios are 1, 2.44, 4.44, 5.88 — non-integer, inharmonic ✓. Both routes agree at all three ratios, and 1.41 ≈ √2 is irrational, which is the strongest possible case. ✓
- **"Integer ratios give harmonic sidebands, non-integer inharmonic"** and **"a bell's overtones aren't multiples of its fundamental"** (SYN-C08, C13 L4 Q6/Q7/Q8, C13 Final Q16, Midterm Q19/Q36) — physically correct: struck-plate/bell modes are governed by a two-dimensional wave equation whose eigenvalues are not integer-related, unlike an ideal string's. ✓
- **"A filter can only remove harmonics the oscillator generated"** and its corollary that a sine cannot be brightened (SYN-C01, SYN-C07, C13 L1 Q4/Q5, C13 Final Q2/Q3, Midterm Q3/Q4) — a linear filter's transfer function scales existing partials and creates none; a sine has one partial. ✓
- **Filter self-oscillates into a sine at high resonance with the oscillator closed** (C13 L1 Q6, C13 Final, Midterm Q5) — a resonant filter pushed past unity loop gain oscillates at cutoff, and the output is a sine because the resonant pole is a single frequency. ✓
- **Granular grains "~1–100 ms"** (SYN-C09, C13 L4 Q9, C13 Final Q17, Midterm Q20) — matches the standard range. Independent: 1 ms → 1000 Hz grain rate, 100 ms → 10 Hz; that interval brackets exactly the transition from grain-rate-as-pitch to grain-as-event. ✓
- **Grain sizes 5 / 40 / 150 ms give "buzzy pitch / smooth texture / recognisable fragments"** (SYN-C09 drill, C13 L4 Q11 rubric, C13 Final Q18 rubric) — independent: grain rate = 1/size, so 5 ms → 200 Hz (squarely in the pitch range, hence a buzzy tone) ✓, 40 ms → 25 Hz (at/just above the pitch floor, fuses as texture) ✓, 150 ms → 6.7 Hz (well below, so events are individually resolved) ✓. All three descriptions follow from the arithmetic.
- **"Detune below ~150 Hz smears the pitch"; keep subs and 808s mono, no detune** (SYN-C06, C13 L3 Q9, C13 Final Q13, Midterm Q16) — independent: beat rate equals the frequency *difference*, so a constant cents detune produces a slower beat the lower you go — ±10 cents on a 50 Hz sub is 50·(2^(10/1200) − 1) = 0.29 Hz, one amplitude cycle every 3.4 s, which on a sustained note reads as a wobble rather than as thickness; the same 10 cents at 500 Hz is 2.9 Hz and reads as chorusing. The physics supports the rule. The 150 Hz figure itself is a production convention (typical mono-below crossover), not a derived constant — noted, not flagged, since it is stated as "about" everywhere it appears.
- **"Wide detuned voices can partially cancel in mono"** (4 places) — voices at different frequencies have a continuously sliding phase relationship, so summing produces periodic cancellation. Correct, and correctly contrasted in Midterm Q39 against parallel compression, where the wet path is a time-varying *gain* on the same signal — gain is a real scalar and introduces no phase shift, so the two paths always add. Q39's general test ("differ in pitch or in time, or only in level — the first two can cancel, the third can't") is right. ✓
- **Limiter ≈ "20:1 with a fast attack", ∞:1 also accepted** (FX-C01 drill, C14 L1 Q2, C14 Final Q1, Midterm Q21) — this is the one place the content admits arithmetic, so I ran it: at 20:1 a signal 20 dB over threshold emerges 1 dB over, i.e. 19 dB of gain reduction and an effective ceiling; at ∞:1 the output is pinned at threshold exactly. Both match the "acting as a ceiling" description. ✓
- **Soft knee "eases the ratio in over a window either side, so compression begins before threshold"** (FX-C02, Course 14 note, C14 L1 Q5, C14 Final Q3/Q4, Midterm Q23/Q24) — correct: the knee width is centred on the threshold, so the transfer curve departs from unity slope at threshold − knee/2. ✓
- **Parallel compression as upward compression** (FX-C03, C14 L1 Q8, C14 Final Q6, Midterm Q26) — C14 Final Q6's rubric states the actual mechanism ("the crushed copy is reduced most during peaks and barely at all in the quiet passages, so what it adds is largest exactly where the signal was quietest"), which is the correct and non-trivial version. ✓
- **Saturation "reads louder at the same meter reading"** (FX-C05, C14 L2 Q6, C14 Final Q10, Midterm Q30) — correct against a peak meter: rounding peaks raises crest-factor-adjusted average level without moving peak. The keys say "loudness is perceived from the average rather than from the peak", which is right. ✓
- **Midterm Q35 — saturating a sub so it survives small speakers** — checked the physics rather than the phrasing: saturation generates harmonics at integer multiples (a 40 Hz sub yields 80, 120, 160, 200 Hz…), these lie above a phone speaker's roll-off, and the ear reconstructs the 40 Hz from the 40 Hz spacing between them. Missing-fundamental/residue pitch, correctly described. ✓
- **Midterm Q38 — knee vs. envelope attack analogy** — "a knee's behaviour depends on how far the incoming signal is from the threshold at that instant" vs. an attack time firing identically per note. Correct: knee is a function of input level, attack is scheduled. ✓
- **Structural counts, all 9 test pages** — each page's `questions:` frontmatter, its header bullet, and its actual `#### Q` count agree: 9/9/9, 9/9/9, 10/10/10, 11/11/11, 18/18/18, 9/9/9, 9/9/9, 12/12/12, 40/40/40. ✓
- **Course 14 Final "two per concept"** — tags are C01×2, C02×2, C03×2, C04×2, C05×2, C06×2 = 12 over 6 concepts. Exact. ✓
- **Course note lesson tables** — Course 13's 1+2+3+4 = 10 = its `concepts:`; Course 14's 3+3 = 6 = its `concepts:`. Lessons 4 and 2 match frontmatter and match Class 6's `lessons: 6`. ✓
- **Concept `lesson:` frontmatter vs. course note placement** — all 16 checked one by one: SYN-C01→L1; C02, C03→L2; C04, C05, C06→L3; C07, C08, C09, C10→L4; FX-C01, C02, C03→L1; C04, C05, C06→L2. All match. ✓
- **Pass thresholds** — Course 13 `target_pct: 80` = its final's `pass_pct: 80`; Course 14 `target_pct: 85` = its final's 85, and the course note's justification ("higher than the default") is consistent with the lesson tests' 75. Midterm 80. ✓

---

---

## Batch 8 — Class 7, Vocals & Release

**Checked:** 16 concepts / 125 test questions / 27 worked examples (15 concept drills + 12 course homework items) + 3 structural notes = **171 items**
**Of those, objectively checkable:** **73** (43%) — 56 test questions, 6 concept notes, 11 structural counts, spanning ~21 distinct claim families at ~100 sites
**Errors found: 0.** Every computable claim survived both routes.

Scope: `Classes/Class 7 — Vocals & Release.md` · `Courses/Course 15 — Vocal Method.md` · `Courses/Course 16 — Handoff & Release Prep.md` · concepts VOX-C01…C07, MIX-C01…C07, SMP-C01…C02 · `Tests/Course 15/` (4 pages, 43 q) · `Tests/Course 16/` (4 pages, 48 q) · `Tests/Production Final Exam.md` Parts A–C (Q1–Q29) and the Class-7-tagged Part F items (Q54, Q55, Q57, Q59, Q60) = 34 q. Parts D–E of the Production Final Exam are Class 5/6 material and belong to Batches 6/7.

---

### Fixed

*(none — see the verification log below for what was checked and how)*

No high-confidence computable error was found in this batch. Per the brief, no stylistic claim was "corrected" into another and no fix was manufactured to match the theory batches' counts.

---

### Verification log — every computable claim, both routes

**A note on what Course 15 does and doesn't contain.** The brief anticipated vocal range claims ("E2–C5"), named intervals, pitches, keys, chords and transposition claims. A regex sweep for pitch names (`[A-G][#b♯♭]?[0-9]`), interval names, `octave`, `semitone`, `vocal range`, `tessitura` and `transpos*` across all 16 concepts, all 8 course-15/16 test pages, both course notes, the class note and Production Final Exam Parts A–C returns **zero matches**. Class 7 makes no pitched claim of any kind. Course 15's only numeric content is three figures: mic distances, a 20 ms delay and a 15 ms nudge. The computable seam in this batch is entirely in Course 16.

#### Loudness and delivery specs (Course 16) — all pass

1. **Peak headroom −6 to −3 dBFS** — 10 sites (MIX-C01, MIX-C04, Course 16 note L2, C16 L2 Q1 + Q4, C16 Final Q5 + Q7, PFE Q17 + Q19, PFE Q53 body). *Taught:* deliver peaks at −6 to −3, reached with a gain move. *Independent:* 3–6 dB below 0 dBFS costs ~0.5–1 bit of a 24-bit word's ~144 dB range — negligible — and guarantees no overshoot through downstream processing or converters. Matches the standard mix-delivery convention. **Internally identical at all 10 sites; no site states a headroom figure that disagrees with the ceiling or the target.** ✅
2. **"A limiter that pulled 8 dB off your peaks"** — 4 sites (MIX-C01, Course 16 note, C16 L2 Q2, C16 L2 Q2 explanation). *Taught:* 8 dB the engineer never sees. *Independent dB arithmetic:* gain reduction of 8 dB at the peaks reduces peak-to-average distance by exactly 8 dB, and that reduction is printed. The figure is the GR amount, not an over-claim, and it is compatible with the −6/−3 rule (the point is which device did the reduction). ✅
3. **24-bit** — 7 sites. *Taught:* 24-bit (MIX-C04: "24-bit minimum"). *Independent:* 24-bit fixed gives ~144 dB theoretical dynamic range, far exceeding any programme material; correct for handoff. ✅ (see Flag 3 on "minimum" vs the flat figure)
4. **No dither** — 5 sites. *Taught:* "dither is the last step of the last process, and that isn't you." *Independent:* dither is required only on bit-depth *reduction*. Truncating 32-bit float to 24-bit puts truncation noise at ≈ −144 dBFS, below anything that survives further processing, and mastering will re-quantize anyway. The rule is correct and the stated reason is the correct reason. ✅
5. **Format — WAV or AIFF, never MP3** — 5 sites. *Taught:* lossless container. *Independent:* both are uncompressed PCM containers, bit-identical to the render; MP3 is lossy and irreversible, consistent with the "MP3 anywhere in the lineage" irreversibility claim in C16 L2 Q12 / C16 Final Q14 / PFE Q24. ✅
6. **Native sample rate, no conversion** — 6 sites. ✅
7. **C16 Final Q8 — session at 48 kHz, engineer's studio at 44.1; export at?** *Key:* 48 kHz, the session's native rate. *Independent:* 48→44.1 is a non-integer 160:147 ratio requiring interpolation; performing it once, downstream, at the point the destination is known, is strictly better than performing it twice. Key is correct and its stated reason is the correct reason. ✅
8. **LUFS = integrated perceived loudness over time, not peak** — 5 sites. *Independent:* ITU-R BS.1770 / EBU R128 define LUFS as K-weighted loudness relative to full scale, gate-integrated over the programme. "Not peak level" is correct; the C16 L2 Q6 gloss ("peak tells you the single highest sample") is also correct. ✅
9. **Streaming normalization target ≈ −14 LUFS** — 7 sites, always hedged ("roughly", "around", "near", "a target near"). Spotify, YouTube, Amazon Music and Tidal all publish −14; Deezer −15; **Apple Music −16**. Hedged language is defensible; the Apple exception is not named anywhere. → **Flagged (Flag 1), not fixed** — source-dependent platform spec, and the category the brief says to flag.
10. **"A −7 LUFS master and a −14 one arrive at the same playback level"** — 4 sites (MIX-C05, C16 L2 Q7 + Q8 body, C16 Final Q10, PFE Q21). *Taught:* the platform turns the loud one down. *Independent arithmetic:* normalization gain = target − measured, so −7 receives −14−(−7) = **−7 dB** and −14 receives −14−(−14) = **0 dB**; both land at −14 LUFS. **Second, stronger route:** for an arbitrary target T the two gains are T+7 and T+14, landing both at T — so **this answer is correct for any target value, including Apple's −16.** The conclusion is robust even if Flag 1's figure is stale. ✅
11. **PFE Q59 — "normalization just changes playback gain / alters nothing in the file"** — *Independent:* correct. Normalization is a playback-side gain offset; the delivered file is unmodified and the change is undoable with a fader. (Spotify's "Loud" mode adds a playback limiter, but that too acts at playback, not on the file, so the claim holds as stated.) ✅
12. **Consolidation from a common timeline zero** — 4 sites. Internally consistent; the gloss "every file starts from the same timeline zero" appears identically in all four. ✅

#### Timing, distance and signal claims (Course 15) — all pass

13. **20 ms delayed copy → "comb filtering or slapback, not width"** — 3 sites (VOX-C06 drill, C15 L2 Q11, C15 Final Q11 / PFE Q11). *Taught:* same waveform offset in time, so interference or echo. *Independent:* a 20 ms delay combs with first null at 1/(2×0.020) = **25 Hz** and nulls every **50 Hz** thereafter — a dense comb; 20 ms also sits inside the precedence/fusion window (~5–40 ms), so a discrete slap is equally available. Both halves of the disjunction are physically correct at 20 ms. ✅ *(but see Flag 5 on the key leaving the disjunction unresolved)*
14. **15 ms pocket nudge** — 4 sites (VOX-C07 drill, Course 15 note L3 homework, C15 L3 Q8 key + rubric). *Independent tempo-derived check:* at 90 BPM a beat is 666.7 ms, so 15 ms ≈ 2.3% of a beat; at 140 BPM a beat is 428.6 ms, so 15 ms ≈ 3.5%, roughly a 1/28th-beat displacement. That sits at the edge of the just-noticeable difference for rhythmic displacement in a musical context — audible as feel, not readable as an error. The figure is musically sane at hip-hop tempos. ✅
15. **Mic distances** — 5 sites: VOX-C01 "2–6 in" close; VOX-C01 drill "3, 8 and 14 inches"; Course 15 L1 homework "4 inches and 12 inches" and "a consistent 6 inches"; C15 L1 Q2 key "2 to 6 inches ... *also accepted* 3 inches close and 12 to 14 inches back". No pair contradicts: every "close" figure falls in 2–6 in and every "back" figure in 12–14 in, and the key's accepted-variants line explicitly reconciles them. **All imperial throughout — no metric leakage.** ✅
16. **PFE Q53 — "treat it as a compressor at 20:1"** cross-checked against FX-C01's own drill ("set the ratio to 20:1 with a fast attack") and FX-C01's answer ("a compressor with a very high ratio, acting as a ceiling"). Consistent across the Class 6 → Class 7 boundary; no drift. ✅
17. **PFE Q59 — "saturation generates new harmonics at multiples of the fundamental, so the average rises while the peak reading barely moves"** — *Independent:* harmonic distortion produces integer multiples of the fundamental, and soft-clipping rounds transient peaks, which raises RMS relative to peak. Physically correct, and the "which of the three is the trap" verdict (the limiter, because it is the only subtractive one) follows correctly from the three mechanisms as stated. ✅

#### Set-membership checks against MIX-C03 — all pass

18. **C16 Final Q2** — sort five: saturated bass patch / vocal corrective EQ / drum bus compressor / lead tuning / reverb send amount. Key commits 2, leaves 3 open. Against MIX-C03's lists: saturated bass = character distortion → commit ✅; tuning → commit ✅; corrective EQ → leave ✅; bus compression → leave ✅; reverb amounts → leave ✅. Membership correct 5/5. *(wording issue: Flag 4)*
19. **PFE Q15** — sort four: same, minus the reverb send. Key commits 2, leaves 2. Correct 4/4. ✅
20. **PFE Q54** — sort a vocal chain: tuning / timing edits / de-esser / corrective EQ / character distortion. Key commits tuning, timing edits, distortion; leaves de-esser and corrective EQ. Against MIX-C03: tuning ✅, timing edits ✅, character distortion ✅ on the commit side; corrective EQ ✅ on the leave side. The de-esser is not enumerated in MIX-C03, but the rubric derives it from the stated test ("answering how the vocal sits ... depends on what the compressor does afterward") rather than asserting it — correct application of the taught test. ✅
21. **Five clearance routes, count and order** — 4 sites (SMP-C02 "Why it matters", C16 L3 Q7, PFE Q28, C16 Final Q18 rubric). All four list the same five in the same order: licensed libraries · royalty-free packs · interpolation · replay and rewrite · full clearance. Count = 5 everywhere, matching Course 16's "the five routes" and the L3 Q7 prompt. ✅
22. **Two rights — which each use** — 6 sites (SMP-C01, Course 16 note L3, C16 L3 Q1/Q2/Q4, C16 Final Q15/Q16, PFE Q25/Q26). Sampling = master + composition; interpolation = composition only. Identical at every site, and every site that mentions it also states interpolation is *not* a loophole. No drift. ✅

#### Structural arithmetic — all pass

23. **Question counts vs frontmatter:** C15 L1 9/9 ✅ · L2 12/12 ✅ · L3 8/8 ✅ · Final 14/14 ✅ · C16 L1 9/9 ✅ · L2 12/12 ✅ · L3 9/9 ✅ · Final 18/18 ✅ · PFE 60/60 ✅
24. **C16 Final claims "two per concept" across 9 concepts = 18.** Recounted from the concept comments: MIX-C03 ×2, MIX-C02 ×2, MIX-C01 ×2, MIX-C04 ×2, MIX-C05 ×2, MIX-C06 ×2, MIX-C07 ×2, SMP-C01 ×2, SMP-C02 ×2. Exactly 2 each, 18 total. ✅
25. **Concept counts:** Course 15 frontmatter `concepts: 7`, lesson table 2+4+1 = 7, `## Concepts` lists 7 files, 7 VOX files exist ✅. Course 16 frontmatter `concepts: 9`, lesson table 2+5+2 = 9, lists 9, 9 files exist ✅. Class 7 frontmatter `concepts: 16` = 7+9 ✅, `lessons: 6` = 3+3 ✅.
26. **Pass marks vs School Config:** `lesson_pass: 75` → all six lesson tests at 75 ✅; `final_pass: 80` → Course 16 Final at 80 ✅; Course 15 Final at 85 is the documented exception, and School Config names it explicitly ("Course 15's is 14, both at 85%") ✅; `midterm_pass: 80` → Production Final Exam at 80 ✅. Question counts against the configured ranges: `lesson_questions: [8,15]` → 9, 12, 8, 9, 12, 9 all in range ✅; `final_questions: [12,25]` → 14, 18 ✅; `exam_questions: [30,80]` → 60 ✅.
27. **Rubric point sums.** Every free-text question states a "*Rubric (5)*" then distributes points across criteria. All **22** Class-7 free-text rubrics were re-added: C15 L1 Q5 (2+2+1) · C15 L1 Q9 (1+2+2) · C15 L2 Q6 (1+2+2) · C15 L2 Q12 (2+1+2) · C15 L3 Q8 (2+2+1) · C15 Final Q3 (2+1+2) · Q10 (2+1+2) · Q14 (2+2+1) · C16 L1 Q6 (2+2+1) · Q9 (2+1+2) · C16 L2 Q8 (2+1+2) · Q12 (2+1+1+1) · C16 L3 Q9 (1+2+2) · C16 Final Q4 (2+2+1) · Q14 (1+2+2) · Q18 (1+2+1+1) · PFE Q53 (2+2+1) · Q54 (2+2+1) · Q55 (2+1+2) · Q56 (2+2+1) · Q59 (2+1+1+1) · Q60 (2+1+1+1). **All 22 sum to exactly 5.** ✅
28. **Link health (Class 7 scope):** all seven notes cited as sources or exceptions resolve — Vocal Mic Technique, Vocal Comping and Takes, Vocal Tuning, Vocal Stacks and Ad-libs, Rap Vocal Production, Artificial Double Tracking (ADT), Limiting; plus Mix Handoff and Sample Clearance. **0 broken links.** ✅

---

### Flagged (Nate's call)

- [ ] **`Concepts/MIX-C05 — LUFS and streaming normalization.md` + 6 echo sites — Apple Music normalizes to −16 LUFS, not ≈ −14.** The school teaches "streaming services normalize to a target near −14" with no exception named. Spotify, YouTube, Amazon and Tidal are −14; Deezer −15; Apple Music −16. The hedge ("roughly", "around") carries it, and every dependent answer key is target-independent arithmetic that stays correct either way (see log item 10) — so nothing is *wrong*, but a 2 dB spread across the largest platforms is being smoothed over. **Platform spec that may simply have changed → flagged, not fixed, per the brief.** What I'd do: keep −14 as the working number and add one parenthetical to MIX-C05 naming Apple Music at −16, leaving all seven answer keys untouched. Echo sites: MIX-C05 ×2, Course 16 note L2 + homework, C16 L2 Q7, C16 Final Q9, PFE Q21.
- [ ] **No true-peak ceiling anywhere in the curriculum.** A school-wide grep for `dBTP` / `true peak` returns zero hits. MIX-C04 specifies headroom in dBFS sample peak only. For the mix-handoff stage this is defensible — a dBTP ceiling is the mastering engineer's concern, and the course is explicit that mastering isn't the student's job. But MIX-C05 *does* teach streaming delivery, where inter-sample peaks after lossy encoding (AAC/Ogg) are the entire reason a −1 dBTP ceiling is the standard recommendation, and MIX-C07 enumerates what a mastering engineer needs. **This is a content gap, not an error** — adding it is a curriculum decision. What I'd do: one sentence in MIX-C05 distinguishing sample peak (what you deliver at) from true peak (what the platform's encoder sees), and no new test question unless Nate wants the strand to cover mastering-side delivery at all.
- [ ] **`Concepts/MIX-C04 — Delivery spec.md` — "24-bit **minimum**" vs seven answer keys that say flatly "24-bit".** The concept allows more; every key states the bare figure and objective questions are graded by normalized string match. A student who answers "32-bit float" — increasingly the common handoff depth, and correct per the concept's own wording — reads as wrong against the key. **Convention that may have shifted → flagged.** What I'd do: add "32-bit float also fine" to the *Also accepted* line of C16 L2 Q4, C16 Final Q7 and PFE Q19, rather than changing the concept.
- [ ] **`Tests/Course 16/Course 16 — Final Exam.md`#Q2 key — "The first two" has the wrong referent, and it points at exactly the error the concept records Nate making.** The key reads: *"**Commit the saturated bass and the tuning · leave the other three open** / The corrective EQ, the drum bus compressor and the reverb send amount all stay open. **The first two** define what those parts are. The other three describe how parts sit against each other."* Read in sequence, "the first two" attaches to the three-item leave-open list that immediately precedes it — i.e. the corrective EQ and the drum bus compressor — which is the *backwards* answer that MIX-C03's own "Why it matters" section records ("then answered it backwards at MIX-11 by putting track-by-track EQ and compression on the commit side"). The membership verdict in the bold line is correct (verified 5/5, log item 18); only the explanation's referent is broken. The parallel key at `Production Final Exam.md`#Q15 is unambiguous because no sentence intervenes between the bold answer and "The first two" — so this is a copy-edit regression introduced when the fifth item was added. **Pedagogical wording → flagged, not fixed.** What I'd do: name them, matching Q15's structure — "The saturated bass and the tuning define what those parts are. The other three describe how parts sit against each other."
- [ ] **C15 L2 Q11 / C15 Final Q11 / PFE Q11 — the question fixes the delay at 20 ms; the key answers with an unresolved disjunction.** Q11 asks "you delay the copy by **20 ms** — what do you actually get?" and the key answers "**Comb filtering or slapback — not width**", explaining "what you get is interference or an echo **depending on the delay length**." The question already supplied the delay length. Both halves are physically defensible at 20 ms (log item 13), so two contradictory answers both mark correct on a string-matched objective question. What I'd do: either drop the number from the question so the disjunction is the point, or keep 20 ms and have the key commit, with the other outcome as an *Also accepted* line.
- [ ] **Stale course IDs — wider than the `/school` command arguments, and one is a genuine collision.** Per the brief I did not touch `/school test <n>` / `/school final <n>`, but the same stale scheme appears in **prose headings inside a test page**, which the orchestrator's command sweep will not catch: `Tests/Production Final Exam.md` line 202 reads *"Part D — Cumulative: Class 5 (Courses 14, 16, 15)"* when Class 5's `courses:` array is `["10","11","12"]`, and line 282 reads *"Part E — Cumulative: Class 6 (Courses 04, 07)"* when Class 6's is `["13","14"]`. The mapping is consistent and legacy (10→14, 11→16, 12→15, 13→04, 14→07, 15→09, 16→02), matching `/school test 09` on Course 15 and `/school test 02` on Course 16. **The same file mixes both schemes**: Part F's prose uses the *current* numbering correctly (Q53 "Course 14" for FX-C01 ✅, Q56 "Course 10 / 11 / 13" ✅, Q58 "Course 11" for BAS-C07 ✅). Separately, **`/school final 02` is claimed by both Course 02 (Chord Function) and Course 16** — not a stale label but an outright ambiguous command. Flagging all of it for the orchestrator's sweep.
- [ ] **`School Config.md` — SMP strand `sources:` omits `[[Sample Clearance]]`.** It lists only "Techniques/Sampling and Sound Selection (mostly about selection, not method)", but Course 16 Lesson 3 reads entirely from `[[Sample Clearance]]` and both SMP concepts cite it as `source:`. Out of batch scope (config, not curriculum content) and cosmetic, but it's the strand's declared source-of-truth. One-line fix whenever config is next touched.

---

### Echoed elsewhere

No error was found, so nothing was propagated. The echo *search* was run regardless, and is itself a finding: the batch's high-risk numbers are copy-pasted widely and are **identical at every site**, which is the outcome you want.

- `−6 to −3 dBFS` — 10 sites across 6 files, identical.
- `≈ −14 LUFS` — 7 sites across 5 files, identical (and all hedged).
- `24-bit` — 7 sites, identical except MIX-C04's "minimum" (Flag 3).
- `8 dB` limiter figure — 4 sites, identical.
- five clearance routes — 4 sites, same five, same order.
- two rights — 6 sites, identical.
- `15 ms` / `20 ms` — 4 and 3 sites, identical.
- **Cross-class:** PFE Q53's "a compressor at 20:1" matches FX-C01's drill (Course 14, Batch 7 scope) — verified consistent, no drift across the class boundary, no edit made outside this batch.

---

---

## Batch 9 — Classes 8 & 9, Guitar Sight Reading + Piano Technique (lighter pass) — PARTIAL

> **Interrupted.** The batch hit an Opus session rate limit mid-run and never wrote its own report.
> It had edited three course notes and had not reached the test pages. The three edits below were
> recovered by diffing the vault against the shared repo's last commit (`ea829ec`, pushed before this
> batch launched) and were each re-read and kept — they are source-verified corrections, not guesses.
> **The test pages for courses 19–28 were not checked.** A second run covers them.

**Checked:** 3 course notes (Hanon VI, Reading I Parts One & Two). Test pages: **not reached.**
No concept notes exist in these classes.

### Fixed
- [x] `Courses/Course 24 — Hanon VI.md`#Exercise 56 — was: "pp. 98–103", and "that mark is printed on the exercise itself" — now: "pp. 100–103", with the printed-mark claim corrected — **PDF pp. 98 and 99 are the same image** (both reference the same embedded scan object), so the page that should sit at 99 — ex. 56's heading, its C-major opening and its printed metronome mark — is not in the vault file at all. What is readable starts part-way in, at A minor. p. 98 is the fourfold-trill fingerings page, which belongs to exercises 54–55.
- [x] `Courses/Course 24 — Hanon VI.md`#Exercise 60 — was: "pp. 111–115" — now: "pp. 111–116" — page range checked against the scan.
- [x] `Courses/Course 25 — Reading I — First Position, Part One.md`#Review — was: *"Regular review of all material is a must"* at pp. 9 and 19 — now: *"Regular review of all material is a must!"* at p. 9, and the shortened *"Review of all material is a must"* at p. 18 — two different notices on two different pages, quoted as one.
- [x] `Courses/Course 26 — Reading I — First Position, Part Two.md`#Review — same wrong citation, fixed to match.

### Echoed elsewhere
- The Leavitt review-notice citation was wrong identically in Courses 25 and 26; both were corrected together.

---

## Batch 9 (resumed) — Classes 8 & 9 test pages

**Checked:** 0 test pages / 0 questions / 0 rubric sums — **there are none to check.**

### Scope verification (done before any content check)
- `Curriculum/Tests/` contains only `Course 01`–`Course 16`, `Course 29`–`Course 31`, plus the standalone `Jazz Exam.md`, `Production Final Exam.md`, `Production Midterm 1/2.md`, `Theory Final Exam.md`, `Theory Midterm 1/2.md`. There is no `Course 17` through `Course 28` directory at all.
- Each of the eight course notes in scope for this batch says so itself, in its own body text:
  - `Courses/Course 19 — Hanon I.md:25` — "No theory. This course teaches no ideas and tests none — it is the place you play the exercise." / line 171: "A **performance check**, not a test page. There are no `type: school-test` pages in this course and nothing here enters the spaced-repetition drip — finger facility is a motor skill, and the drip is for facts."
  - Same pattern, same wording template, confirmed present in `Course 20 — Hanon II`, `Course 21 — Hanon III`, `Course 22 — Hanon IV`, `Course 23 — Hanon V`, `Course 24 — Hanon VI` (Hanon strand, Class 9).
  - `Courses/Course 25 — Reading I — First Position, Part One.md:26,112`, `Course 26 — …Part Two.md:26,106`, `Course 27 — Reading II — Position Playing, Part One.md:26,129`, `Course 28 — …Part Two.md:26,109` — identical "no theory / no test pages / performance check" language (Reading strand, Class 8).
- Cross-check: `grep -rl "type: school-test" .` across the entire Curriculum tree returns files only for the course ranges listed above (1–16, 29–31, standalone exams). Zero hits for 19–28. Two independent checks (directory listing + frontmatter grep) agree: nothing exists in scope.

### Fixed
- (none — no files existed to fix)

### Flagged (Nate's call)
- (none)

### Echoed elsewhere
- (n/a)

---

## For the shakedown (spec-157)

*Not content errors — the reasons content errors are easy to write and hard to notice. [[spec-157-shakedown-review]] §0 consumes this section as a pre-seeded input, already confirmed. Do not re-derive these; judge them, categorise them, severity-tag them.*

**Four independent batches converged on the same top three.** That convergence is itself the finding — none of these agents saw each other's reports.

### The three all four batches found

1. **One claim is copy-pasted into 2–5 surfaces with no source of truth.** A claim lives in the concept note, the course note's "The material" bullets, the lesson-test key, the course-final key and the class-exam key — as verbatim restatements, not references. One error therefore costs 5 edits, and **a partial fix leaves the school teaching one thing and testing another**. That is not hypothetical: the minor-pentatonic claim had both tests corrected and the concept and course note left wrong, and nothing detected the divergence. 70 error locations came from 29 distinct mistakes.
2. **Rubrics restate the answer, so one error ships two or three times in the same file — and reads as corroborated.** Every free-text key carries a rubric decomposing the same claim into scored parts, plus an explanation paragraph. When the claim is wrong, all three are wrong in the same direction, and the repetition makes the first look checked. `Course 07 — Lesson 3 Test` needed three fixes in one page for one mistake. In `Course 03 — Final Exam` Q15 the rubric version was worth a scoring point, so **a student who knew better would have been marked down.**
3. **Nothing recomputes a spelled chord against its own label, anywhere in the authoring path.** At least **6 of batch 2's 10 errors** are catchable by a short script that parses chord symbols to pitch classes and checks membership, diatonicism and interval names. No such gate exists. This is the cheapest high-value fix in the report.

### The format actively hides errors

4. **Keys show a label plus a justification written *from* that label, never the derivation.** That is precisely the D→A♭ failure mode — the prose was written to fit the wrong label, so it agreed with it. Keys for computable questions could carry the one-line semitone derivation the way this audit's fixes do.
5. **A wrong premise in a question *stem* is invisible to any key-only review.** `Theory Midterm 1` Q6 asked why D→F𝄪 "isn't a perfect 5th" while its own key said "not a 5th" and answered a different question.
6. **"Also accepted:" lists hide claims no headline states.** The A♭maj7♯5 error survived in two of them.
7. **Concept-note *titles* carry theory claims.** JAZ-C05's title is itself a wrong claim, and correcting it needs a rename touching wikilinks in four files plus (probably) progress/SR keys — so the format structurally protects a class of error from ever being fixed. Titles should be descriptive labels, not assertions.
8. **Concept-drill answers have no enforced schema.** `FND-C01`'s drill answer sits as two bare lines with no callout, no label, no "Answer:" marker — and it was the one drill answer that was wrong. Nothing in the format signalled it was an answer key at all.

### Mechanical, no judgment needed — sweep these

9. **`/school` command IDs on test pages are unverified against the syllabus.** `/school final <course>` is stale in **13 of 19 course notes** (Course 04 → `08`, Course 07 → `11`, Course 16 → `02` — a pre-renumbering scheme), and all six Course 09 test pages route to `/school test 13`, which is a real but *different* course (Signal Path & Synthesis). `School Config.md` shows the same 09/13 confusion was caught and corrected elsewhere on 2026-08-20 and the fix never propagated. **No lint checks that a test page's `/school` command matches its own `course:` frontmatter.** Sweep all of them at once.
10. **Dead assessment references still read as evidence.** Concept "Why it matters" blocks across three strands cite question IDs from the assessment layer **deleted 2026-08-09** ("POP-02 blank", "SCL-14, also missed"). They are the stated reason each concept exists, and they point at nothing.
11. **Recorded paths drift silently.** The Course 09 Final Exam and `School Config.md` line 130 both say clips live in `School/Audio/`; they are actually in `School & Content/Curriculum/Audio/`. Nothing breaks because nothing resolves those strings — but a reader following them finds nothing.

### Unstated conventions that produce "correct answer marked wrong"

12. **The minor-key Roman-numeral convention is never stated.** The curriculum uses parallel-major-relative numerals in minor (♭III, ♭VI, ♭VII) and grades against them. Internally consistent, invisible to a student. Batch 3 correctly refused to "fix" a ♭III label for this reason.
13. **Some keys grade values the lesson never taught** — "about two passes", "about an octave and a third". Nothing checks that a graded answer is derivable from that lesson's own Read list. Invisible until a student who studied properly is marked wrong.

### The strongest single argument for a gate

14. **The machine-generated, machine-verified layer was 20/20 correct. Every error was in hand-written prose about it.** Ear training's clips are Goertzel-verified against their specs, and all twenty recompute correctly from raw MIDI. The exam is deliberately architected so *answers* cannot drift from the audio — but the explanatory prose beside each answer is an unguarded second copy, and that is exactly where the error landed. The guard covers the label and not the reasoning next to it.

### Process finding — from running this audit, not from the content

15. **Batch isolation did not hold between concurrent agents.** Two agents edited `SCL-C08` and `Course 03` ~30 seconds apart on the same claim, and the second's earlier read did not show the first's write. No corruption resulted and both fixes were verified consistent afterwards — but a lock or claim file is needed before the next multi-agent pass over the vault.

---
