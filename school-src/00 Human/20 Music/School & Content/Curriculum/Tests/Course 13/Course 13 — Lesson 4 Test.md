---
type: school-test
test_kind: lesson
course: "[[Course 13 — Signal Path & Synthesis Methods]]"
class: "[[Class 6 — Sound Design]]"
lesson: 4
domain: production
questions: 11
pass_pct: 75
---

# Course 13 · Lesson 4 Test — The Four Methods

- 11 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 13 4` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SYN-C07 · type: objective -->
State the fundamental difference between subtractive and FM synthesis in one line each.

**A:** 

#### Q2
<!-- concept: SYN-C07 · type: objective -->
Explain why you can't make a bright lead starting from a sine wave in a subtractive synth.

**A:** 

#### Q3
<!-- concept: SYN-C07 · type: objective -->
Name two things subtractive is good at, and the one thing it can't produce at all.

**A:** 

#### Q4
<!-- concept: SYN-C10 · type: objective -->
Where does a wavetable synth's timbral movement come from, compared with a subtractive one's?

**A:** 

#### Q5
<!-- concept: SYN-C08 · type: objective -->
FM's sidebands land at positions set by what?

**A:** 

#### Q6
<!-- concept: SYN-C08 · type: objective -->
Contrast integer and non-integer ratios: what does each produce, and what's an example use of each?

**A:** 

#### Q7
<!-- concept: SYN-C08 · type: objective -->
Why are bells the standard example? Say what's physically true of a bell.

**A:** 

#### Q8
<!-- concept: SYN-C08 · type: free-text -->
A subtractive synth has a harmonically rich oscillator and a good filter. Explain precisely why it still can't get to a bell.

**A:** 

#### Q9
<!-- concept: SYN-C09 · type: objective -->
What is granular synthesis? Give the grain size range and the four things you control.

**A:** 

#### Q10
<!-- concept: SYN-C09 · type: objective -->
State its defining property, and name two things that property lets you do.

**A:** 

#### Q11
<!-- concept: SYN-C09 · type: free-text -->
"Glitchy stuff" is a real use and undersells it badly. Say what granular's best use is, and describe the workflow.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 13 — Lesson 4 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Subtractive starts rich and filters harmonics away · FM creates sidebands that weren't there**
> FM works by having one oscillator modulate another's frequency. One removes; the other creates. That's the organizing distinction of the whole strand.
>
> **Q2.** **A sine has no harmonics to uncover, and a filter can only remove**
> There is nothing above the fundamental for the filter to let through, so opening it changes nothing.
>
> **Q3.** **Good at predictable, cheap, familiar analogue tones — it can't make inharmonic content**
> Its oscillators are harmonic by construction, so every partial it produces is a multiple of the fundamental.
>
> **Q4.** **From the source — a scannable table of waveforms whose position is modulatable**
> Subtractive imposes its movement downstream with a filter. Wavetable generates it at the oscillator, which is why the two sound different even doing nominally the same thing.
>
> **Q5.** **The carrier-to-modulator ratio**
> The index sets how many sidebands and how loud; the ratio sets where they land.
>
> **Q6.** **Integer gives harmonic sidebands · non-integer gives inharmonic ones**
> Integer ratios give pitched results — basses and electric pianos. Non-integer ratios put sidebands between the harmonics so the ear can't fuse them into one pitch, which is metallic and clangorous.
>
> **Q7.** **Because a bell is physically inharmonic — its overtones aren't multiples of its fundamental**
> FM matches that naturally, since non-integer ratios put partials exactly where a struck piece of metal puts them.
>
> **Q8.** **Because a filter can attenuate a partial but can't move one to a non-integer position**
> *Rubric (5):* says a subtractive oscillator's partials are harmonic by construction — all integer multiples of the fundamental (2) · says a filter can only attenuate or pass what's already there (1) · says getting a bell requires partials at non-integer positions, which no amount of filtering can create or relocate (2)
> The limitation isn't about quality or effort, it's about what's available to work with. A saw or a square contains a great many partials, but every one of them sits at an exact whole-number multiple of the fundamental — that's what makes the waveform periodic and pitched in the first place. A filter's entire vocabulary is "let this through, take this away", so whatever it does, the surviving partials are still at integer positions. A bell's overtones are not; they fall between the harmonics at ratios that no periodic waveform contains. So there is nothing to uncover and nothing to bend into place. FM gets there because it doesn't filter anything — it generates new sidebands at positions the ratio decides, and non-integer ratios put them exactly where a bell's are.
>
> **Q9.** **Chops audio into grains of roughly 1 to 100 ms and replays them — position, size, density and pitch**
> Each grain is short enough that it reads as texture rather than as a fragment of the source.
>
> **Q10.** **Position and pitch are decoupled — freeze a moment, or stretch hugely without transposing**
> Neither is possible with normal playback, where moving through the file and changing its pitch are the same operation.
>
> **Q11.** **As a resampling target — print something, granulate it, print again**
> *Rubric (5):* names resampling as the best use rather than glitch effects (2) · describes the loop of bouncing a source, granulating it, and printing the result (2) · says the decoupling is what makes the wider uses possible — texture, pads, extreme stretching, clouds from a very short source (1)
> Treating granular as an effect you put on something misses that it's a way of turning material you already have into material you don't. The workflow is a loop: bounce something — a chord, a vocal phrase, half a second of a bounce you'd otherwise throw away — load it in, and use position, grain size and density to find what's inside it. A 5 ms grain, a 40 ms grain and a 150 ms grain on the same source give three genuinely different instruments, because at those lengths you're hearing a buzzy pitch produced by the grain rate itself, a smooth texture, and recognisable fragments of the source respectively. Then print the result and treat it as a new source, either to play or to granulate again. What makes all of it work is the decoupling: because position and pitch are independent, you can sit still inside a sound and explore it, rather than being carried through it at whatever rate the recording was made.

## ✅ End of test
