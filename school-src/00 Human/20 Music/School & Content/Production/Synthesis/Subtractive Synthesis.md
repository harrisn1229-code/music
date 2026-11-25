---
type: synthesis
title: Subtractive Synthesis
tags: [synthesis, production, subtractive]
created: 2026-08-03
---

# Subtractive Synthesis

**Start with more than you need, then take away.** The oldest and most common approach, and the one the [[Signal Path]] describes.

Generate a harmonically rich waveform — a saw or a square — then use a [[Filters and Resonance|filter]] to remove harmonics until what's left is the sound you wanted. Sculpture, not construction.

## Why it dominates

- **It maps onto how hearing works.** Removing highs reads as *further away*, *duller*, *warmer* — the same cues real acoustics produce. Filter moves feel musical without you having to think about spectra.
- **It's cheap.** A few oscillators and a filter, which is why it existed in analogue hardware decades before digital synthesis.
- **It's predictable.** Turn cutoff down, it gets darker. Every time. Compare [[FM Synthesis]], where a small parameter change can transform the timbre unrecognizably.

## The limitation that defines it

**A subtractive filter can only remove harmonics the oscillator already generated.**

That's not a criticism, it's the definition, and it's the answer to SYN-07 — what actually separates subtractive from FM. Start on a sine, which has no harmonics above the fundamental, and no filter on earth will brighten it. There's nothing there to let through.

It also means **inharmonic content is essentially unreachable.** Saw and square waves have harmonics at whole-number multiples of the fundamental, and filtering can only attenuate those — never move them to non-integer positions. Bells, metal and glass are inharmonic, which is precisely why subtractive synths are bad at them and [[FM Synthesis]] is good at them.

## The standard patch recipe

Almost every subtractive sound is this, with different numbers:

1. **Pick the waveform** for harmonic content. Saw for bright and full, square for hollow, triangle/sine for soft. [[Oscillators and Waveforms]]
2. **Add a second oscillator** — detuned for thickness, an octave down for weight, or a sub. [[Voice Architecture]]
3. **Set the filter type and cutoff.** Low-pass, roughly where you want the brightness ceiling.
4. **Shape the amp envelope** — the loudness contour. [[Envelopes and ADSR]]
5. **Shape the filter envelope** with envelope amount — the *character*. This is the step that separates a patch from a tone.
6. **Add modulation** — an LFO on cutoff for movement, PWM for thickness, velocity to filter for playability. [[LFOs and Modulation]]
7. **Then, and only then, effects.**

Steps 4 and 5 are where beginners stop early and where the sound actually lives.

## Four patches worth being able to build cold

| Patch | Recipe |
|---|---|
| **Sub bass** | Sine or triangle, mono, no detune, fast attack, short release. Nothing clever. |
| **Pluck** | Saw, filter env fast decay + sustain 0 + high env amount, amp env matching. |
| **Pad** | Two detuned saws, slow amp attack, high sustain, long release, slow LFO on cutoff. |
| **Supersaw lead** | Saw, unison 7+, moderate detune, wide spread, filter mostly open, mono/legato with glide. |

Build all four from an initialized patch and subtractive synthesis stops being mysterious.

## On your synths

The purest ones are [[Analog]], [[Model 84 Polyphonic Synthesizer|Model 84]] and [[Drift]] — two oscillators, one filter, two envelopes, an LFO. Nothing hidden, everything on one panel. **Learn on these.**

[[Serum 2]], [[Wavetable]] and [[DUNE 3]] are subtractive at heart with a more complex oscillator stage — the filter and amp behave identically, the source is just richer. [[Omnisphere]] is subtractive processing over sampled sources rather than generated ones.

## The habit worth building

**Initialize the patch and build it yourself.** Preset-browsing teaches sound *selection*; building teaches sound *design*, and only the second one generalizes. This is exactly the gap the placement found — [[Instrument Preset Map]] shows fluent preset navigation, and SYN-11 showed the signal path underneath was blank.

The [[Instrument Preset Map]] advice still holds for working fast under deadline. This is the other mode, for when you're learning.

## Related

- [[Signal Path]] — the architecture this method uses
- [[Oscillators and Waveforms]] · [[Filters and Resonance]] · [[Envelopes and ADSR]] · [[LFOs and Modulation]] · [[Voice Architecture]]
- [[FM Synthesis]] · [[Wavetable Synthesis]] · [[Granular Synthesis]] — the alternatives
- [[Synthesis Index]]

## From videos

*Seeded 2026-08-03 — awaiting `/music-enrich`.*
