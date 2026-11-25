---
type: school-test
test_kind: lesson
course: "[[Course 01 — Derivation Rules]]"
class: "[[Class 1 — Music Fundamentals]]"
lesson: 3
domain: theory
questions: 11
pass_pct: 75
---

# Course 01 · Lesson 3 Test — Intervals as a System

- 11 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 01 3` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FND-C05 · type: objective -->
State the two things that happen to an interval when you invert it.

**A:** 

#### Q2
<!-- concept: FND-C05 · type: objective -->
Invert each: major 3rd, minor 6th, perfect 5th, major 2nd, minor 7th.

**A:** 

#### Q3
<!-- concept: FND-C05 · type: objective -->
Invert an augmented 4th. What do you get, and what does that tell you about the tritone?

**A:** 

#### Q4
<!-- concept: FND-C06 · type: objective -->
Why is "a 3rd" an incomplete interval name? Say what each half of a full name tells you.

**A:** 

#### Q5
<!-- concept: FND-C06 · type: objective -->
Name these fully, with number and quality: C→F, C→E♭, D→A♭, E→C♯.

**A:** 

#### Q6
<!-- concept: FND-C07 · type: objective -->
C→A♯ sounds identical to a minor 7th. What is it actually called, and why?

**A:** 

#### Q7
<!-- concept: FND-C07 · type: objective -->
Name and distinguish: C→D♯ against C→E♭.

**A:** 

#### Q8
<!-- concept: FND-C07 · type: free-text -->
A fully diminished 7th chord on G is spelled G B♭ D♭ F♭ rather than using an E. Explain why, using the letter-distance rule.

**A:** 

#### Q9
<!-- concept: FND-C06 · type: free-text -->
Naming intervals by number alone works fine on paper for a long time. Where does the habit actually cost you something, and why there specifically?

**A:** 

#### Q10
<!-- concept: FND-C05 · type: objective -->
You're told an interval inverts to a diminished 5th. What was it?

**A:** 

#### Q11
<!-- concept: FND-C07 · type: free-text -->
Give the two-step method for naming any interval correctly, in order, and say what goes wrong if you do the steps the other way round.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 01 — Lesson 3 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** The numbers sum to 9, and the quality flips
> Major↔minor, augmented↔diminished, perfect stays perfect.
>
> **Q2.** minor 6th · major 3rd · perfect 4th · minor 7th · major 2nd
> *Also accepted:* m6 · M3 · P4 · m7 · M2
> Each pair sums to 9 and swaps quality, except the perfect 5th, which stays perfect.
>
> **Q3.** A diminished 5th — the tritone inverts to itself in sound
> 4 + 5 = 9, augmented flips to diminished. Both are six semitones, which is why the tritone is symmetrical and why it can resolve two ways.
>
> **Q4.** The number says how far; the quality says which colour
> *Also accepted:* number = letter distance · quality = perfect/major/minor/augmented/diminished
> C→E and C→E♭ are both "a 3rd" and they are not the same interval.
>
> **Q5.** perfect 4th · minor 3rd · diminished 5th · major 6th
> *Also accepted:* P4 · m3 · dim5 (or °5) · M6
> D→A♭ is a 5th by letter count (D E F G A) — D's perfect 5th is A natural, and flattening it by a half step shrinks a perfect interval to diminished, not minor (5ths aren't in the major/minor family). E→C is a 6th by letter count (E F G A B C) and lands as minor (E is in C major); sharpening the top note to C♯ *grows* the interval by a half step, turning minor into major — sharpening can't produce a smaller (minor) interval.
>
> **Q6.** An augmented 6th, because the interval number comes from letter distance
> *Also accepted:* aug 6 · A6
> C D E F G A spans six letter names, so it is a sixth of some kind no matter how it sounds. C→B♭ spans seven letters and is the minor 7th.
>
> **Q7.** C→D♯ is an augmented 2nd; C→E♭ is a minor 3rd
> Same sound, three semitones. C–D is two letters, so the first is a 2nd. C–D–E is three letters, so the second is a 3rd.
>
> **Q8.** Because the chord needs four alternating letters, and E would break the pattern
> *Rubric (5):* says a 7th chord must span the letters G–B–D–F (2) · says F♭ is used because the letter has to be F (2) · notes that E is the same pitch but the wrong letter (1)
> A seventh chord stacks thirds, so it uses every other letter: G, B, D, F. Each note is then altered to fit the quality. A fully diminished 7th needs that top note three semitones above D♭, which is the pitch of E — but the letter has to be F, so it's spelled F♭. Writing E would give G–B–D–E, which skips F and doubles up on the letter pattern, and the chord would stop reading as stacked thirds.
>
> **Q9.** In ear training, where a 3rd with no quality attached is half an answer
> *Rubric (5):* names ear training as the place it breaks (2) · explains that quality is the distinction ear training is built on (2) · notes that on paper the number alone is often unambiguous, which is why the habit survives (1)
> On paper C→F is unambiguous whether or not you say "perfect", so nothing forces the habit. By ear the number is the easy half — hearing *a* 3rd is much easier than hearing *which* 3rd, and the quality is what carries the emotional content. A number-only vocabulary means the ear was never asked the question that matters.
>
> **Q10.** An augmented 4th
> 9 − 5 = 4, and diminished flips back to augmented.
>
> **Q11.** Count the letters to get the number, then adjust for quality
> *Rubric (5):* step 1 is counting letter names inclusively (2) · step 2 is fixing the quality from the accidentals (2) · says that starting from the sound gives the enharmonic wrong name (1)
> Count letters first, inclusive of both ends, which fixes the number. Then look at the accidentals to decide the quality. Doing it the other way round means starting from how it sounds, which gets you an enharmonically equivalent name that may have the wrong number — the C→A♯ trap, where the sound says minor 7th and the letters say sixth.
## ✅ End of test
