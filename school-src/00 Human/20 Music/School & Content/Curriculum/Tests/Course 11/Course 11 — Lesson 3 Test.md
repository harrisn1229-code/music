---
type: school-test
test_kind: lesson
course: "[[Course 11 — Bass Writing & Design]]"
class: "[[Class 5 — Beat & Arrangement]]"
lesson: 3
domain: production
questions: 11
pass_pct: 75
---

# Course 11 · Lesson 3 Test — The Low End as a Shared Resource

- 11 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 11 3` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: BAS-C07 · type: objective -->
Why do kick and bass fight? State the fix in one line.

**A:** 

#### Q2
<!-- concept: BAS-C07 · type: objective -->
Give the diagnostic, step by step, before any decision gets made.

**A:** 

#### Q3
<!-- concept: BAS-C07 · type: objective -->
You've picked one to hold the sub. What do you do to the other — and what if high-passing the kick guts it?

**A:** 

#### Q4
<!-- concept: BAS-C07 · type: objective -->
The same decision can be made in time rather than in frequency. Name two forms of that.

**A:** 

#### Q5
<!-- concept: BAS-C07 · type: free-text -->
Explain why EQing both sources fails, and what "ownership is a decision, not a compromise" is warning against.

**A:** 

#### Q6
<!-- concept: BAS-C08 · type: objective -->
Give the method for tuning an 808, in order.

**A:** 

#### Q7
<!-- concept: BAS-C08 · type: objective -->
Why can't you do that job in place, down at the sub octave?

**A:** 

#### Q8
<!-- concept: BAS-C08 · type: objective -->
Getting slides out of an audio 808: give the three steps in order.

**A:** 

#### Q9
<!-- concept: BAS-C09 · type: objective -->
The part is right and the tone is wrong. Give the ladder, all four rungs in order.

**A:** 

#### Q10
<!-- concept: BAS-C09 · type: objective -->
Limiter rather than compressor — why? Then give the order of the remaining moves.

**A:** 

#### Q11
<!-- concept: BAS-C09 · type: free-text -->
"Don't skip rungs by processing a patch that was never going to get there." Name the lesson from the drum course this echoes, and say what the two have in common.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 11 — Lesson 3 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **They're both trying to own the same twenty hertz — decide who owns the sub**
> The fix is a decision about ownership, not a pair of EQ moves.
>
> **Q2.** **Put an analyser on each, play them together, and find where each fundamental actually peaks**
> A real case had the kick peaking around 55 Hz with a second bump near 120, and the bass also at 55 — a direct collision you can see before you hear what to do about it.
>
> **Q3.** **High-pass the other until the clash stops — if that guts the kick, swap the kick first**
> Replace it with one that has more inherent high-end character, then cut the new one. Where the kick is otherwise interchangeable, the source with more low-end content is the one that should keep the sub.
>
> **Q4.** **Sidechaining · automating kick length by section**
> Both separate the two sources in time instead of in frequency, which leaves each one's spectrum intact.
>
> **Q5.** **Because you end up with two thin sources and the same collision**
> *Rubric (5):* says cutting both removes low end from each without resolving which one holds it (2) · says the result is two weakened sources still occupying the same region (1) · explains that ownership means committing one source to the sub and accepting the other loses it, rather than splitting the difference (2)
> Splitting the difference is the instinct and it's the wrong shape of answer. If the kick and the bass both peak at the same frequency, taking a few decibels out of each leaves them both peaking there, just quieter — the overlap is unchanged and now neither one has the weight it needed. What the collision is asking for is a choice. One of them gets the sub and keeps its fundamental fully intact; the other gets high-passed until it stops competing and takes its identity from the range above. That will feel like a loss on the source you cut, heard in solo, and it isn't one in the mix, because the low end it gave up was never audible as its own thing anyway. "Ownership is a decision" is a warning against trying to give both sources most of what they want.
>
> **Q6.** **Pitch it up an octave or more, tune it there, then drop it back to the sub register**
> Never guess at pitch down at 40 Hz.
>
> **Q7.** **Sub-register pitch is genuinely inaudible as pitch on most systems**
> The ear can't do the job in place, so tuning by feel down there is guessing. It's the same principle as tuning the kick — a low end on the wrong note fights the song, and you won't hear which note it's on until you move it up.
>
> **Q8.** **Pitch to the note with warp off · set warp mode to Tones · draw the slides in the transposition envelope**
> Warp off gives a clean stretch when you set the pitch. Tones is the warp mode built for bass. The clip's transposition envelope is easier than MIDI slides, and grace notes clicked in just before a target read as bends when no pitch wheel is handy.
>
> **Q9.** **Synth patch · a different synth · a real or sampled bass guitar · DI plus amp sim**
> Each rung is a bigger change of source than the last. The point is to change what's making the sound before changing what's processing it.
>
> **Q10.** **Bass wants a ceiling with its dynamics intact — then saturate, then sidechain last**
> Gain-riding pumps the low end. A compressor riding the level of a sustained low note makes the whole low end breathe with it. A limiter caps the peaks and leaves the part alone.
>
> **Q11.** **Selection is the fix; processing is not — both say the fix is upstream of the chain**
> *Rubric (5):* names the drum-course principle that selection is the fix and processing is not (2) · says both are cases of changing the source rather than treating it (2) · notes that processing refines something already close and can't convert a wrong choice into a right one (1)
> The drum course opens with a weak kick and the instruction to bypass the channel and audition other samples before touching a device. This is the same instruction with more rungs on it, because a bass patch has more ways to be replaced than a one-shot does — a different preset, a different instrument, a played or sampled bass guitar, a real signal through an amp. What the two share is a claim about where a chain's power actually is. Processing can refine a sound that was already nearly right; it cannot make a source into something it isn't, and the hours spent trying are the most expensive hours in a session because they feel productive throughout. Walking a rung is usually five minutes and settles the question either way.

## ✅ End of test
