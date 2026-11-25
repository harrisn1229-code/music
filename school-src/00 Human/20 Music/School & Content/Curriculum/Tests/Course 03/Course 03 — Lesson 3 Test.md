---
type: school-test
test_kind: lesson
course: "[[Course 03 — Scale Construction]]"
class: "[[Class 1 — Music Fundamentals]]"
lesson: 3
domain: theory
questions: 9
pass_pct: 75
---

# Course 03 · Lesson 3 Test — Scales Against Chords

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 03 3` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SCL-C07 · type: objective -->
What is modal interchange described as, when you look at it through scales rather than chords?

**A:** 

#### Q2
<!-- concept: SCL-C07 · type: objective -->
Fm, A♭, B♭ and E♭ appear in a C major song. Which scale are they the triads of?

**A:** 

#### Q3
<!-- concept: SCL-C08 · type: objective -->
Over a Cmaj7♯11, which scale fits and which note makes it fit?

**A:** 

#### Q4
<!-- concept: SCL-C08 · type: objective -->
Why doesn't plain C major work over that chord?

**A:** 

#### Q5
<!-- concept: SCL-C08 · type: objective -->
State the general rule for matching a scale to a chord.

**A:** 

#### Q6
<!-- concept: SCL-C08 · type: objective -->
Name a scale that fits C7, and one that fits Cm7♭5. Say which note decides each.

**A:** 

#### Q7
<!-- concept: SCL-C08 · type: objective -->
Minor pentatonic over a dominant chord is the honourable exception. Name the two reasons it works.

**A:** 

#### Q8
<!-- concept: SCL-C07 · type: free-text -->
Borrowed chords and modal interchange-as-scales are the same idea from two directions. Explain what stays fixed and what changes, and why that keeps the key centre intact.

**A:** 

#### Q9
<!-- concept: SCL-C08 · type: free-text -->
Explain how the characteristic notes from Lesson 2 become a chord-scale matching tool, using one chord as a worked example.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 03 — Lesson 3 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Keep the tonic, change the collection**
> The chord view calls it borrowing; the scale view calls it swapping which seven notes are available around an unmoved tonic.
>
> **Q2.** **C natural minor** — they're the triads of the parallel minor
> *Also accepted:* C minor · C Aeolian
>
> **Q3.** **Lydian — the raised 4th *is* the ♯11 the chord is asking for**
> *Also accepted:* C Lydian
>
> **Q4.** **It supplies a natural F, a half step above the E — the classic avoid note over a major chord**
> The chord's 3rd and the scale's 4th collide, which is exactly what the ♯11 sidesteps.
>
> **Q5.** **The chord names the notes that must be there, and the scale supplies the rest**
> Pick the scale whose characteristic note matches what the chord is asking for.
>
> **Q6.** **C7 takes Mixolydian, decided by the ♭7 · Cm7♭5 takes Locrian, decided by the ♭5**
> *Also accepted:* half-diminished scale for the second
> In each case the chord's defining alteration is the scale's characteristic note.
>
> **Q7.** **The ♭3 grinding against the chord's major 3rd is the blues sound**
> The friction is deliberate rather than accidental, and three of minor pentatonic's five notes are the dominant's own root, 5th and ♭7. It does *not* avoid the natural 4th — the 4th is in the scale (A C **D** E G) — it's passed through rather than landed on.
>
> **Q8.** **The tonic stays fixed and the note collection changes, so the key centre never moves**
> *Rubric (5):* says the tonic is what stays constant (2) · says the available collection is what changes (1) · says a key change would relocate the tonic, which is why this reads as colour instead (2)
> Both views describe one operation: hold the root, swap the surrounding material. From the chord side you see Fm and A♭ appearing in C major; from the scale side you see C natural minor being borrowed from while C stays home. Because nothing relocates the tonic, the ear keeps hearing C as the centre and reads the imported notes as shading rather than as a modulation. A real key change would move where home is, and that's the thing neither of these does.
>
> **Q9.** **Match the chord's defining alteration to the mode whose characteristic note is that alteration**
> *Rubric (5):* states the matching principle in terms of characteristic notes (2) · works one chord correctly end to end (2) · notes that the chord tells you which note is non-negotiable (1)
> Lesson 2 reduced each mode to one altered degree. That's exactly the information chord-scale matching needs, because a chord symbol also announces one or two non-negotiable altered notes. Worked example: Cmaj7♯11 insists on a raised 4th. Run through the characteristic notes and Lydian is the mode whose whole identity is ♯4, so Lydian fits and every other major-family option supplies a natural 4 that clashes with the 3rd. The chord asked a question in the form of an alteration, and the characteristic-note list is the lookup table that answers it.
## ✅ End of test
