---
type: school-test
test_kind: lesson
course: "[[Course 15 — Vocal Method]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 2
domain: production
questions: 12
pass_pct: 75
---

# Course 15 · Lesson 2 Test — Tuning and Stacks

- 12 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 15 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: VOX-C04 · type: objective -->
What does retune speed control?

**A:** 

#### Q2
<!-- concept: VOX-C04 · type: objective -->
Contrast the slow and fast ends: what does each preserve, and what does each cost?

**A:** 

#### Q3
<!-- concept: VOX-C04 · type: objective -->
Name the effect of fast retune that's easiest to miss, and say what the real mistake is — given that both ends of the dial are legitimate.

**A:** 

#### Q4
<!-- concept: VOX-C03 · type: objective -->
When should you *not* tune a vocal? Give the sharp version of the rule, not "when it sounds bad".

**A:** 

#### Q5
<!-- concept: VOX-C03 · type: objective -->
Name three further cases where you leave a take alone.

**A:** 

#### Q6
<!-- concept: VOX-C03 · type: free-text -->
Over-tuning is more common and more damaging than under-tuning. Explain why, and say what makes it hard to catch while you're doing it.

**A:** 

#### Q7
<!-- concept: VOX-C05 · type: objective -->
State the treatment hierarchy as a single principle.

**A:** 

#### Q8
<!-- concept: VOX-C05 · type: objective -->
Give the treatment for a lead, a double, a harmony and an ad-lib — pan, level and processing for each.

**A:** 

#### Q9
<!-- concept: VOX-C05 · type: objective -->
Why does the principle work? Say what a lead needs that an ad-lib doesn't.

**A:** 

#### Q10
<!-- concept: VOX-C06 · type: objective -->
What's the difference between a real double and a copied one?

**A:** 

#### Q11
<!-- concept: VOX-C06 · type: objective -->
You duplicate a vocal and delay the copy by 20 ms. What do you actually get?

**A:** 

#### Q12
<!-- concept: VOX-C06 · type: free-text -->
Say where the thickening in a real double actually comes from, and name the deliberate exception to the rule.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 15 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **How fast correction pulls a note to pitch**
>
> **Q2.** **Slow preserves scoops, slides and vibrato · fast snaps instantly and kills all three**
> Slow is transparent and effectively inaudible as tuning. Fast is the hard tuned sound, and it steps the vibrato rather than letting it move.
>
> **Q3.** **Fast retune destroys vibrato**
> The mistake is reaching for it to fix a pitch problem and getting the effect by accident.
> Neither end of the dial is wrong. There's a genre at each. What's wrong is arriving at one of them without deciding to.
>
> **Q4.** **When the deviation is the expression**
> Blues and soul phrasing lives between the notes. A scoop, a bend, or a note leaned into slightly flat is doing the emotional work, and correcting it removes the reason the line landed.
>
> **Q5.** **When the genre's identity is a human voice · when the singer is strong · when it's already an effect**
> With a strong singer, fix the two wrong notes rather than processing the take. The general form is to correct genuine mistakes and leave everything else.
>
> **Q6.** **It's invisible while you're doing it and obvious a week later**
> *Rubric (5):* says over-tuning is the far more common and more damaging error (1) · says each individual correction looks right at the time, so nothing signals the cumulative loss (2) · says what's removed — the deviation that carried the expression, and the vibrato a fast retune flattens — is the reason the take was good (2)
> Tuning is a corrective task and corrective tasks reward attention, so the failure comes from doing the job too well rather than too little. Every note pulled to centre looks like an improvement in isolation; there's no moment where the screen tells you that you've gone too far, because the display shows deviation and deviation is exactly what you've been removing. What you've also removed doesn't appear anywhere: the scoop into the phrase, the note leaned into flat because the singer meant it, and — if the retune speed came up along the way — the vibrato that made the take worth keeping. Come back to it after a week with fresh ears and the whole vocal sounds stiff and slightly synthetic, and there's no single edit to undo, because it was all of them. Under-tuning has the opposite profile: it's audible immediately and fixable in a minute.
>
> **Q7.** **The further a part is from delivering the lyric, the more it can become texture**
>
> **Q8.** **Lead centre and present · doubles wide and under · harmonies lower · ad-libs widest and furthest back**
> Processing gets heavier down the list — least on the lead, heaviest on the ad-libs. Doubles should sit well under the lead and not be heard as separate parts. Harmonies are colour rather than content. Ad-libs carry the heaviest effects because nobody needs to parse them word for word.
>
> **Q9.** **Because the lead needs every word parseable and an ad-lib doesn't**
> Processing that would bury a lyric is free on a part that isn't carrying one, which is why the same reverb is a mistake in one place and the right call three feet further back.
>
> **Q10.** **A real double is a second performance — timing, pitch and tone differ naturally**
> A copy is identical, which is a different thing entirely regardless of what you do to it afterward.
>
> **Q11.** **Comb filtering or slapback — not width**
> The two signals are the same waveform offset in time, so what you get is interference or an echo depending on the delay length. Neither is the sound of two voices.
>
> **Q12.** **From the natural variation between two performances**
> The deliberate exception is ADT, which is a sound in its own right rather than a substitute for a double.
> *Rubric (5):* says the differences in timing, pitch and tone between two takes are what produce the thickening (2) · says an identical copy just sums louder, because there's no variation to hear (1) · names artificial double tracking as the deliberate exception, and frames it as its own effect rather than a replacement for a real double (2)
> The thickening isn't a property of having two tracks — it's a property of having two *different* tracks. Two performances of the same line never line up exactly: the consonants land a few milliseconds apart, the pitch wanders independently, the tone shifts as the singer's throat does something slightly different the second time. All of that is continuous, small-scale disagreement, and disagreement is what the ear reads as more than one voice. An identical copy has none of it, so summing it changes the level and nothing else, and offsetting it manufactures a fixed relationship the ear hears as an artefact rather than as a person. The exception is worth keeping straight: artificial double tracking is a real technique with a real sound, invented for exactly this problem and used deliberately for decades. It just isn't a way of getting a double — it's a different effect that happens to live nearby.

## ✅ End of test
