---
type: school-test
test_kind: lesson
course: "[[Course 03 — Scale Construction]]"
class: "[[Class 1 — Music Fundamentals]]"
lesson: 1
domain: theory
questions: 10
pass_pct: 75
---

# Course 03 · Lesson 1 Test — The Minor Family and the Pentatonics

- 10 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 03 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SCL-C01 · type: objective -->
Spell A natural minor.

**A:** 

#### Q2
<!-- concept: SCL-C01 · type: objective -->
Describe natural minor from the parallel side — which degrees are altered against the major scale?

**A:** 

#### Q3
<!-- concept: SCL-C02 · type: objective -->
Spell A harmonic minor, and say which degree changed.

**A:** 

#### Q4
<!-- concept: SCL-C02 · type: objective -->
Harmonic minor exists for one reason. What is it?

**A:** 

#### Q5
<!-- concept: SCL-C02 · type: objective -->
Spell A melodic minor ascending, and say what problem it solves that harmonic minor creates.

**A:** 

#### Q6
<!-- concept: SCL-C03 · type: objective -->
Spell C major pentatonic. Which two degrees of the major scale were removed?

**A:** 

#### Q7
<!-- concept: SCL-C03 · type: objective -->
Why does removing exactly those two make the scale hard to play wrong over a major triad?

**A:** 

#### Q8
<!-- concept: SCL-C03 · type: objective -->
Spell A minor pentatonic. What's its relationship to C major pentatonic?

**A:** 

#### Q9
<!-- concept: SCL-C02 · type: free-text -->
Explain the chain that connects harmonic minor to chord function: what the raised 7th does, and what a minor key lacks without it.

**A:** 

#### Q10
<!-- concept: SCL-C03 · type: free-text -->
One shape covers both major and minor pentatonic on guitar. Explain why, and say what that fact hides from a player who only knows the shape.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 03 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** A natural minor: A B C D E F G
> The white notes from A — the same collection as C major with a different tonic.
>
> **Q2.** **Major with ♭3, ♭6 and ♭7**
> That's the parallel view: same root, three degrees lowered.
>
> **Q3.** A harmonic minor: A B C D E F G♯
> The 7th is raised.
>
> **Q4.** **To give a minor key a real leading tone, and therefore a functioning V chord**
> With a natural 7th the chord on the fifth degree is minor and doesn't pull home. Raising it makes it dominant.
>
> **Q5.** A melodic minor: A B C D E F♯ G♯
> Raising the 6th as well removes the augmented 2nd that harmonic minor leaves between ♭6 and ♮7 — an awkward gap to sing or play melodically.
>
> **Q6.** C major pentatonic: C D E G A — the 4th and 7th were removed
> *Also accepted:* F and B removed
>
> **Q7.** **Because those two are exactly the notes that create half-step tension against a major triad**
> Take them out and no note in the scale sits a semitone from a chord tone, so nothing can clash.
>
> **Q8.** A minor pentatonic: A C D E G — the same five notes taken from the relative minor root
> Same collection, different tonic, which is why one shape covers both.
>
> **Q9.** **The raised 7th becomes a leading tone, which turns v into V — without it minor has no dominant**
> *Rubric (5):* says the raised 7th sits a semitone below the tonic (1) · says this converts the minor v into a major V or V7 (2) · says a natural-minor key therefore has no chord that pulls home (2)
> In natural minor the seventh degree sits a whole tone below the tonic, so the chord built on the fifth degree comes out minor and there's no semitone pulling into home. Raising the 7th puts a leading tone in place, and that single alteration turns the v chord into a major V — or a V7 once you add the seventh. The whole dominant function that Course 02 builds on is unavailable in minor until you make that change, which is why the scale exists at all.
>
> **Q10.** **Because they're the same five notes from different roots — and the shape hides which note is home**
> *Rubric (5):* says major and minor pentatonic share a collection, related as relative keys (2) · says the shape is identical because only the tonic differs (1) · says a shape-only player can't tell which note is functioning as tonic, so phrases land in the wrong place (2)
> C major pentatonic and A minor pentatonic contain the same five pitches; only the tonal centre differs, exactly like the relative major/minor relationship between full scales. So one fingering serves both, which is why guitarists learn it first and get a lot of mileage from it. What the shape hides is which of the five notes is home. A player working from the shape alone can play all the right notes and still resolve phrases onto the wrong one, which sounds unfinished without being obviously wrong.
## ✅ End of test
