---
type: school-test
test_kind: lesson
course: "[[Course 13 — Signal Path & Synthesis Methods]]"
class: "[[Class 6 — Sound Design]]"
lesson: 1
domain: production
questions: 9
pass_pct: 75
---

# Course 13 · Lesson 1 Test — The Path

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 13 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SYN-C01 · type: objective -->
Name the three blocks of a subtractive voice in order, and give the one-word job of each.

**A:** 

#### Q2
<!-- concept: SYN-C01 · type: objective -->
Which envelope is the reason anything is audible at all, and which one is where most of the character comes from?

**A:** 

#### Q3
<!-- concept: SYN-C01 · type: objective -->
Where do LFOs sit in this picture? Name three things worth routing one to, and what each produces.

**A:** 

#### Q4
<!-- concept: SYN-C01 · type: objective -->
State the corollary about what a filter is able to do.

**A:** 

#### Q5
<!-- concept: SYN-C01 · type: objective -->
Why do patches usually start from a saw? Say what the same fact explains about why FM had to be invented.

**A:** 

#### Q6
<!-- concept: SYN-C01 · type: objective -->
Close the oscillator entirely and push the filter's resonance. What happens, and what does that tell you about the filter?

**A:** 

#### Q7
<!-- concept: SYN-C01 · type: objective -->
A sub and a noise source are switched on. Which block are they part of?

**A:** 

#### Q8
<!-- concept: SYN-C01 · type: free-text -->
Three classic patch problems: no attack, dull no matter what you do, and doesn't evolve. Trace each one to a block or a decision, and give the fix.

**A:** 

#### Q9
<!-- concept: SYN-C01 · type: free-text -->
"Every subtractive synth you own is these three blocks with a different panel drawn around it." Explain what learning that once actually buys you.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 13 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Oscillator, filter, amplifier — generate, remove, shape**
> The oscillator makes the raw waveform, the filter takes harmonics away, and the amplifier controls level over time.
>
> **Q2.** **The amp envelope makes it audible · the filter envelope carries the character**
> Without an envelope on the amplifier there's no level over time and therefore no sound. The filter envelope is what makes a patch change while it plays.
>
> **Q3.** **Alongside the chain, modulating whichever block you point them at**
> Pitch for vibrato, cutoff for movement, amplitude for tremolo. Also useful on pulse width, pan and effect sends.
>
> **Q4.** **A filter can only remove harmonics the oscillator already generated**
> It can't add anything. There is nothing downstream that puts content into a signal that never had it.
>
> **Q5.** **A saw is the richest raw material — and subtractive can only subtract, which is why FM exists**
> Starting from the harmonically densest waveform leaves the filter the most to work with. The same limitation is precisely what FM was invented to escape, because FM generates content rather than removing it.
>
> **Q6.** **It self-oscillates into a sine — the filter is a sound source in its own right**
> With enough resonance the filter rings at its cutoff frequency with no input at all, which is a useful way to get a clean sine and a good demonstration that "filter" understates what the block does.
>
> **Q7.** **The oscillator block — they're mixed in alongside the main waveform**
> Everything that generates raw material lives at the start of the chain, before anything has been removed or shaped.
>
> **Q8.** **No attack is the amp envelope · dull is the wrong waveform · no evolution is nothing modulating**
> *Rubric (5):* traces a missing attack to the amp envelope, and fixes it by shortening the attack time (1) · traces persistent dullness to the oscillator's waveform rather than the filter, and fixes it by choosing a richer waveform (2) · traces a static patch to having nothing modulating, and fixes it with an LFO or envelope on cutoff or wavetable position (2)
> All three are the same diagnostic move: decide which block owns the symptom before touching a knob. A patch with no attack has an amp envelope with too long an attack time, and no amount of filter work will find the transient. A patch that stays dull however far you open the filter is telling you the oscillator never generated the harmonics you're hunting for — swap the waveform, because subtraction can't uncover what isn't there. A patch that sounds fine but lifeless has nothing modulating: the sound is identical in bar eight to bar one, so route a slow LFO or a long envelope at the timbre and it comes alive. Naming the block first is what stops you spending twenty minutes in the wrong section of the panel.
>
> **Q9.** **Every synth becomes the same instrument with a different layout to learn**
> *Rubric (5):* says the three-block chain is common to every subtractive synth regardless of interface (2) · says learning it once transfers to any new synth, which reduces to finding where each block is drawn (2) · notes that it also gives you a diagnostic map, so a problem points at a block rather than at the whole panel (1)
> The practical payoff is that a new synth stops being a new subject. Open it and the only question is where the three blocks are on this particular panel and what the manufacturer chose to call them, which is a five-minute problem rather than a weekend. It's also why patch recipes stop being necessary. A recipe tells you which knobs to turn on one specific instrument; the chain tells you what you're trying to accomplish, so you can do it anywhere, including on a synth the recipe's author never used. And it converts troubleshooting from guesswork into a lookup — the symptom names the block, and the block names the handful of controls worth touching.

## ✅ End of test
