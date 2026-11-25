---
type: school-test
test_kind: lesson
course: "[[Course 15 — Vocal Method]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 1
domain: production
questions: 9
pass_pct: 75
---

# Course 15 · Lesson 1 Test — Before the Chain

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 15 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: VOX-C01 · type: objective -->
Define proximity effect.

**A:** 

#### Q2
<!-- concept: VOX-C01 · type: objective -->
Use it as a tone control: what do you do for weight and intimacy, and what do you do when the vocal is getting boomy? Give distances.

**A:** 

#### Q3
<!-- concept: VOX-C01 · type: objective -->
Which mics does it apply to? Say when that makes an omni the right call.

**A:** 

#### Q4
<!-- concept: VOX-C01 · type: objective -->
A pop filter helps twice. Name both things it does.

**A:** 

#### Q5
<!-- concept: VOX-C01 · type: free-text -->
Proximity effect turns distance into a knob. Name the EQ move it replaces, and say why making the change at the source beats making it in the chain.

**A:** 

#### Q6
<!-- concept: VOX-C02 · type: objective -->
Do you comp by phrase or by syllable? Give the listening criteria in order.

**A:** 

#### Q7
<!-- concept: VOX-C02 · type: objective -->
Why does delivery outrank timing?

**A:** 

#### Q8
<!-- concept: VOX-C02 · type: objective -->
Give the three rules for handling the seams of a comp.

**A:** 

#### Q9
<!-- concept: VOX-C02 · type: free-text -->
Describe the Frankenstein comp — what it is, why it ends up worse than a single take, and the one check that catches it.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 15 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Bass response rises as a directional mic gets closer to the source**
>
> **Q2.** **Move in to 2 to 6 inches for weight · back off when it gets boomy**
> *Also accepted:* 3 inches close and 12 to 14 inches back · any pair showing the close position adds low end and the far one removes it
>
> **Q3.** **Directional mics only — an omni has essentially none**
> That makes an omni the right call for a singer who moves, because their tone stays consistent as the distance changes instead of the low end swelling every time they lean in.
>
> **Q4.** **It blocks plosives, and it sets a minimum distance so the tone stays consistent**
> The second job is the one people don't count, and it's the reason a filter helps even for a singer with no plosive problem.
>
> **Q5.** **A low-end EQ cut — and at the source it costs nothing**
> *Rubric (5):* names a low-end or low-shelf cut as the equivalent move (2) · says the source fix costs nothing, where the EQ fix removes real signal after the fact (2) · notes that the distance is a performance decision, so it's available before there's anything to repair (1)
> Moving back six inches and cutting the low end with an EQ arrive at a similar tonal place by very different routes. The EQ is subtractive repair: the boominess was captured, it's in the file, and you're attenuating a band that also contains parts of the voice you'd rather keep. The distance change means the boominess was never recorded, so nothing has to be taken away and nothing useful goes with it. It's also available earlier and costs nothing — no device, no decision to revisit at mix time, no CPU. That's the general shape of the argument for source fixes, and proximity effect is the cleanest example of one because a single physical adjustment gives you a continuously variable low-end control before a single plugin is loaded.
>
> **Q6.** **By phrase — delivery first, then pitch, then timing, then tone**
> Delivery means which take actually means it.
>
> **Q7.** **Because timing is fixable afterwards and delivery isn't**
> You can move a syllable. You can't put conviction into a phrase that was sung without it.
>
> **Q8.** **Cut on a breath · keep the breaths · crossfade every edit**
> *Also accepted:* watch consonant collisions — cutting mid-word leaves a doubled or clipped consonant
> Breaths are where the seams hide and they're also part of the performance, so removing them is two mistakes at once. Ride a loud breath down rather than deleting it.
>
> **Q9.** **A comp assembled from the best fragment of every word**
> Technically perfect, and worse than the best full pass.
> *Rubric (5):* describes assembling from tiny fragments, best-of on every syllable (1) · says the result is technically flawless but the performance stops being continuous (2) · gives the check — a comp should beat your best single take, and if it doesn't, use the single take (2)
> The failure is subtle because every decision that produced it was locally correct. Each fragment genuinely is the best version of that word, so the comp is unimprovable syllable by syllable and still doesn't work. What's lost is continuity: a sung phrase has direction — the singer is going somewhere across it, pushing and easing and shaping the line as one gesture — and cutting between takes every few hundred milliseconds destroys that even when the joins are inaudible. What you're left with is a sequence of correct moments that don't add up to a performance. The check is simple enough to run every time and it settles the question honestly: put the comp against your best single full pass and listen to both. If the comp doesn't beat it, the comp was work spent making the take worse, and the single take is the one to keep.

## ✅ End of test
