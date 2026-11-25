---
type: school-test
test_kind: lesson
course: "[[Course 01 — Derivation Rules]]"
class: "[[Class 1 — Music Fundamentals]]"
lesson: 1
domain: theory
questions: 10
pass_pct: 75
---

# Course 01 · Lesson 1 Test — Two Names for One Pitch

> [!success] ✅ PASSED — 78%
> Pass bar **75%** · objective **7/8** · free-text **4/10** · graded 2026-08-24 (sat in chat)


- 10 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 01 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FND-C01 · type: objective -->
Give the enharmonic equivalent of C♯, F♭ and E♯.

**A:** Db, E, F

> [!success] ✅ Correct

#### Q2
<!-- concept: FND-C01 · type: objective -->
Which two pairs of white keys have **no** black key between them?

**A:** B - C, E - F

> [!success] ✅ Correct

#### Q3
<!-- concept: FND-C01 · type: objective -->
Of these six notes, which sound as white keys? C♯, F♭, E♯, B♯, G♭, A♯

**A:** Fb, E#

> [!failure]- ❌ Incorrect — F♭, E♯ and B♯
> B♯ was missing again. It sounds as C, a white key. F♭ = E and E♯ = F, which you had. The other three — C♯, G♭, A♯ — are the black keys.

#### Q4
<!-- concept: FND-C01 · type: objective -->
Name the enharmonic equivalent of B♯. Which letter does it share a key with, and why is that letter a step *up* rather than down?

**A:** C

> [!success] ✅ Correct

#### Q5
<!-- concept: FND-C01 · type: free-text -->
Two spellings sound identical. What decides which one is *correct* in a given piece?

**A:** depends on which key it is in

> [!note]- 📝 2/5 — the key is half of it; missing the letter-sequence rule and an example
> *Rubric:* names context/key **2/2** · names the letter-sequence requirement **0/2** · gives a concrete example **0/1**
> Why the key decides: a scale or chord has to use consecutive letter names, one per letter, so the spelling is chosen to keep that intact. Example: in B major the note is A♯; the same pitch in F minor is B♭.

#### Q6
<!-- concept: FND-C01 · type: objective -->
On guitar, the 6th fret of the low E string. Give both names for that pitch.

**A:** A#, Bb

> [!success] ✅ Correct

#### Q7
<!-- concept: FND-C01 · type: objective -->
True or false, and why: "every white key has a black key on either side of it."

**A:** False. B only has black on left, C only has black on right, E only has black on left, F only has black on right

> [!success] ✅ Correct

#### Q8
<!-- concept: FND-C01 · type: objective -->
You're in the key of G♭ major. Is the fourth degree spelled B or C♭? Why?

**A:** Cb - C is the fourth degree of G and it has to have consecutive letters

> [!success] ✅ Correct

#### Q9
<!-- concept: FND-C01 · type: objective -->
Give the enharmonic equivalent of D𝄫 (D double-flat).

**A:** C

> [!success] ✅ Correct

#### Q10
<!-- concept: FND-C01 · type: free-text -->
A producer says "just call it C♯, it's the same note." When does that shortcut actually cost you something?

**A:** if the song is in a flat key where it has flats instead of sharps

> [!note]- 📝 2/5 — you named the flat-key case but not what breaks, or who it breaks for
> *Rubric:* names spelling a scale/chord **2/2** · names readability/function for another musician **0/2** · notes it's harmless when nothing is written down **0/1**
> The consequence: a wrong spelling breaks the alternating-letter pattern, so a chord stops reading as stacked thirds and misleads the next musician about its function. The exception: at a piano with no notation involved, the shortcut costs nothing — which is why producers get away with it.

## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 01 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** C♯ = D♭ · F♭ = E · E♯ = F
> *Also accepted:* Db · D flat · the ASCII spellings throughout
>
> **Q2.** E–F and B–C
> *Also accepted:* E to F and B to C · B–C and E–F
> These are the only two white-key pairs with no black key between them.
>
> **Q3.** F♭, E♯ and B♯
> They sound as E, F and C respectively. C♯, G♭ and A♯ are the black keys.
>
> **Q4.** C — a semitone **above** B
> *Also accepted:* C · up a semitone from B · the C above it
> Sharpening always raises, so B♯ is the pitch a semitone above B, which is C. Because B is the last letter before the alphabet restarts, that step lands on the next octave's C. In C♯ major it has to be spelled B♯ rather than C so the scale keeps one note per letter, with B♯ as the leading tone resolving up to C♯.
>
> **Q5.** Context — the key you're in and which letter the music needs next
> *Rubric (5):* names context/key (2) · names the letter-sequence requirement (2) · gives a concrete example (1)
> A scale or chord must use consecutive letter names, so the spelling is chosen to keep that intact. In B major the note is A♯; in F minor the same pitch is B♭.
>
> **Q6.** A♯ and B♭
>
> **Q7.** False
> E has no black key above it and F none below it; same for B and C. Those are the only two exceptions.
>
> **Q8.** C♭
> The scale runs G♭ A♭ B♭ C♭ D♭ E♭ F — B was already used for B♭, so the fourth degree has to be a C of some kind. Spelling it B would use B twice and skip C.
>
> **Q9.** C
> *Also accepted:* B♯ is the same pitch · but C is expected.
>
> **Q10.** When you spell a scale or chord from it, or hand the part to a reader
> *Rubric (5):* names spelling a scale/chord (2) · names readability/function for another musician (2) · notes it's harmless when nothing is written down (1)
> Wrong spelling breaks the alternating-letter pattern, so the chord stops reading as stacked thirds. It also misleads about function. At a piano, where there's no notation involved, the shortcut costs nothing.
## ✅ End of test
