---
type: synthesis
title: Signal Path
tags: [synthesis, production, fundamentals]
created: 2026-08-03
---

# Signal Path

The single most load-bearing fact in synthesis, and the one the placement found missing (SYN-11, blank). Every subtractive synth you own is the same three blocks in the same order. Learn this and every synth stops being a wall of knobs and becomes the same instrument with a different skin.

**Oscillator → Filter → Amplifier.**

Generate a raw tone. Remove some of it. Control how loud it is over time.

That's it. Everything else — envelopes, LFOs, modulation matrices, macros — exists to *move* those three blocks while a note is held.

## The three blocks

| Block | Job | The question it answers |
|---|---|---|
| **Oscillator** (VCO/DCO) | Generates a raw, harmonically rich waveform | *What is the sound made of?* |
| **Filter** (VCF) | Removes harmonics — usually the highs | *What is the tone?* |
| **Amplifier** (VCA) | Controls level over time | *What is the shape?* |

Optionally the oscillator stage mixes several sources: two or three oscillators, a sub oscillator, and a noise generator. They sum before the filter.

## Where the modulators act

This is the half that makes it a synth rather than a tone generator. Envelopes and LFOs don't sit *in* the audio path — they sit alongside it and move the blocks.

```
          ┌──────────┐   ┌────────┐   ┌───────────┐
  NOTE →  │ OSC(s)   │ → │ FILTER │ → │ AMPLIFIER │ → OUT
          └──────────┘   └────────┘   └───────────┘
                ↑             ↑             ↑
             LFO/ENV      FILTER ENV     AMP ENV
             (pitch)      (cutoff)       (level)
```

- **The amp envelope is mandatory.** Without it nothing sounds at all — a VCA at zero is silence. This is why every synth has an ADSR wired to the amp by default and why "why can't I hear anything" is almost always a dead amp envelope.
- **The filter envelope is where the character lives.** A second envelope on cutoff, with an *envelope amount* control, is what produces the bright-then-dark snap of a pluck, the slow open of a pad, the wub of a bass.
- **LFOs go anywhere.** On pitch → vibrato. On filter cutoff → movement. On amp → tremolo. On pulse width → the classic chorusy thickening. On wavetable position → morphing timbre.

## Reading it on your own synths

The same three blocks, differently dressed:

| Synth | Oscillator | Filter | Amp |
|---|---|---|---|
| [[Analog]] | OSC1/OSC2 + noise | Filter section | Amp with its own ADSR |
| [[Wavetable]] | Osc 1/2 (wavetable + position) | Filter 1/2 | Amp envelope |
| [[Drift]] | Osc 1/2 + noise | Filter (with its own env) | Amp env |
| [[Serum 2]] | Osc A/B + sub + noise | Filter (routable per osc) | Env 1 → amp by default |
| [[Model 84 Polyphonic Synthesizer|Model 84]] | Saw + sub + pulse | The Juno filter | Amp ADSR |
| [[Operator]] | Four operators (FM — see [[FM Synthesis]]) | Optional filter | Operator A's envelope |

[[Operator]] is the informative exception: it's FM, so its "oscillators" modulate each other rather than summing. The filter and amp stages still behave the same way.

## Why the order matters

The blocks are in that order for a reason, and reversing them in your head causes real mistakes.

**Filter before amp** means the filter shapes tone while the note is still at full level, and the amp then shapes the *result*. If the amp came first, a fast amp decay would leave the filter nothing to work on.

**The filter is subtractive** — it can only remove what the oscillator generated. A sine wave has one harmonic; no filter can make it brighter, because there's nothing above the fundamental to let through. This is why patches start from saws and squares: you can't carve what isn't there. It's also the core limitation that [[FM Synthesis]] exists to escape.

## What this unlocks

Once the path is internalized, three common problems become obvious rather than mysterious:

- **"The patch has no attack."** The amp envelope's attack is too slow, or the filter envelope is opening slower than the amp.
- **"It sounds dull no matter what I do with the filter."** The oscillator isn't generating enough harmonic content — wrong waveform, or a sine.
- **"It doesn't evolve."** Nothing is modulating the filter or the wavetable position. A held note with static blocks is a static sound. (SYN-10: the answer is a slow LFO or long envelope on *cutoff or wavetable position* — the timbre, not the level.)

## Related

- [[Oscillators and Waveforms]] → [[Filters and Resonance]] → [[Envelopes and ADSR]] — the three blocks in detail
- [[LFOs and Modulation]] · [[Voice Architecture]]
- [[Subtractive Synthesis]] — this path, used as a method
- [[Synthesis Index]]

## From videos

*Seeded 2026-08-03 — awaiting `/music-enrich`. Candidate sources already in the vault: the "You Suck at Producing" synthesis episodes in `YouTube Notes/`.*
