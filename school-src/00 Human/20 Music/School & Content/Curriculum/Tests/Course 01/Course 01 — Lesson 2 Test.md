---
type: school-test
test_kind: lesson
course: "[[Course 01 — Derivation Rules]]"
class: "[[Class 1 — Music Fundamentals]]"
lesson: 2
domain: theory
questions: 10
pass_pct: 75
---

# Course 01 · Lesson 2 Test — The Order, and Reading It Backwards

> [!success] ✅ PASSED — 80%
> Pass bar **75%** · objective **8/8** · free-text **0/10** · answered 8/10 · graded 2026-08-27
> Both free-text questions were left blank and score zero. Q7 and Q10 are in the retake queue.


- 10 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 01 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FND-C02 · type: objective -->
Write out the order of sharps, all seven, then the order of flats, all seven.

**A:** sharps: F, C, G, D, A, E, B. flats: B, E, A, D, G, C, F

> [!success] ✅ Correct

#### Q2
<!-- concept: FND-C02 · type: objective -->
What is the relationship between the two sequences?

**A:** they're the same sequence but reversed

> [!success] ✅ Correct

#### Q3
<!-- concept: FND-C03 · type: objective -->
A key signature has four sharps. Name the major key, and say which sharp you looked at.

**A:** E major. looked at the last sharp and went up a semitone to get the key

> [!success] ✅ Correct

#### Q4
<!-- concept: FND-C03 · type: objective -->
State the sharps rule, then use it: the last sharp is A♯. What major key is this?

**A:** major key is B major. the sharps rule is you look at the last sharp in the sequence and go up a semitone

> [!success] ✅ Correct

#### Q5
<!-- concept: FND-C04 · type: objective -->
A key signature has four flats. Name the major key, and list the four flats in order.

**A:** Bb, Eb, Ab, Db. major key: Ab

> [!success] ✅ Correct

#### Q6
<!-- concept: FND-C04 · type: objective -->
One flat. Which major key, and why can't you use the normal flats rule to get there?

**A:** F major. the flat is Bb. cant use the normal flats rule because theres only one flat listed so you cant take the secont to last flat to get the key

> [!success] ✅ Correct

#### Q7
<!-- concept: FND-C03 · type: free-text -->
The sharps rule is "take the last sharp and go up a half step." *Why* does that work? Explain the mechanism, not just the procedure.

**A:** 

> [!abstract] ⬜ Blank — 0/5 — The last sharp is always the leading tone — degree 7, a semitone below the tonic
> Sharps are added in a fixed order, and each new one raises the seventh degree of the new key. So the most recently added sharp is that key's leading tone, and the tonic is the note a semitone above it. The rule isn't a trick — it's reading the leading tone off the page.
> *Rubric (5):* 0/5 — nothing attempted.

#### Q8
<!-- concept: FND-C02 · type: objective -->
Run both rules backwards. How many sharps does B major have, and which are they?

**A:** B major has 5 sharps. F#, C#, G#, D#, A#

> [!success] ✅ Correct

#### Q9
<!-- concept: FND-C04 · type: objective -->
List the flats in E♭ major, in order.

**A:** Bb, Eb, Ab

> [!success] ✅ Correct

#### Q10
<!-- concept: FND-C02 · type: free-text -->
Someone knows four of the seven sharps and can name a key from a signature, but can't produce the sharps when given a key name. What exactly is missing, and why does the half they have not cover it?

**A:** 

> [!abstract] ⬜ Blank — 0/5 — The last three sharps, which is what makes the rules run in reverse
> Reading forwards only ever needs the final sharp or the second-to-last flat, so a truncated list gets you surprisingly far. Producing a signature from a key name needs every item up to that point, in order. Knowing "four flats is A♭" is useless if you can't then write B♭ E♭ A♭ D♭.
> *Rubric (5):* 0/5 — nothing attempted.

## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 01 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** Sharps: F C G D A E B · Flats: B E A D G C F
> *Also accepted:* the ASCII spellings throughout · "Father Charles Goes Down And Ends Battle" and its reverse
>
> **Q2.** The flat order is the sharp order reversed
> Same seven letters, read backwards. Learning one gets you both.
>
> **Q3.** E major, from the last sharp D♯
> Four sharps are F♯ C♯ G♯ D♯. The last is D♯; a half step up is E.
>
> **Q4.** B major
> *Also accepted:* B
> Last sharp A♯, up a half step is B. That means all five sharps: F♯ C♯ G♯ D♯ A♯.
>
> **Q5.** A♭ major — B♭ E♭ A♭ D♭
> *Also accepted:* Ab major · Bb Eb Ab Db
> The second-to-last flat is A♭, which names the key.
>
> **Q6.** F major, because there is no second-to-last flat to point at
> With only B♭ in the signature the rule has nothing to index against, so this one is memorised.
>
> **Q7.** The last sharp is always the leading tone — degree 7, a semitone below the tonic
> *Rubric (5):* identifies the last sharp as the leading tone or degree 7 (2) · says the leading tone sits a semitone below the tonic (2) · connects that to why you go *up* a half step (1)
> Sharps are added in a fixed order, and each new one raises the seventh degree of the new key. So the most recently added sharp is that key's leading tone, and the tonic is the note a semitone above it. The rule isn't a trick — it's reading the leading tone off the page.
>
> **Q8.** Five sharps — F♯ C♯ G♯ D♯ A♯
> *Also accepted:* 5 · F# C# G# D# A#
> Working backwards: B major means the leading tone is A♯, so the list runs to A♯, which is the fifth sharp.
>
> **Q9.** B♭ E♭ A♭
> *Also accepted:* Bb Eb Ab
> Three flats. E♭ is the second-to-last, which is the check that it's the right key.
>
> **Q10.** The last three sharps, which is what makes the rules run in reverse
> *Rubric (5):* says the full seven-item order is what's missing (2) · explains that reading a key from a signature only needs the *last* item, so a partial list can still do it (2) · notes the reverse direction — key to signature — needs the whole list (1)
> Reading forwards only ever needs the final sharp or the second-to-last flat, so a truncated list gets you surprisingly far. Producing a signature from a key name needs every item up to that point, in order. Knowing "four flats is A♭" is useless if you can't then write B♭ E♭ A♭ D♭.
## ✅ End of test
