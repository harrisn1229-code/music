---
type: index
title: Synthesis Index
tags: [synthesis, index]
created: 2026-08-03
---

# Synthesis Index

General, tool-agnostic best practice organized by *concept* — the reusable principles behind sound design, independent of any one synth. Specific patches live on the plugin notes in [[Plugin Index]] and the go-to starting points in [[Instrument Preset Map]]; the *why* lives here.

Built on the same model as [[Effects Index]]: pages per concept, never per plugin.

> [!info] Why this folder exists
> The vault had **355 plugin notes and 28 patch recipes, and nothing explaining the ideas underneath them.** That gap was the costliest one in the vault: SYN was the least-backed strand of all, and the single most load-bearing fact in synthesis — the [[Signal Path]] — came back blank. Recipes could be followed but not generalized. Authored 2026-08-03 to close that, and to back **Course 13 — SYN** in the [[Machine/Workflows/school]].

## Start here

- **[[Signal Path]]** — oscillator → filter → amplifier, and where envelopes and LFOs act. **Read this first.** Every subtractive synth you own is these three blocks in this order.

## The building blocks

- [[Signal Path]] — Oscillator → Filter → Amplifier, the load-bearing three-block order every subtractive synth shares
- [[Oscillators and Waveforms]] — the four basic waves, harmonic content, pulse width, sub oscillators, noise, phase retrigger
- [[Filters and Resonance]] — filter types, cutoff and slope, resonance and self-oscillation, filter drive, key tracking
- [[Envelopes and ADSR]] — **three times and one level**, amp vs filter envelopes, the four shapes worth knowing cold
- [[LFOs and Modulation]] — modulation vs audio rate, tempo sync, what to modulate, the mod matrix, making a pad actually evolve
- [[Voice Architecture]] — unison and detune, poly/mono/legato, glide, voice count and CPU, per-voice randomization
- [[Expressive Controllers and CV Conversion]] — MPE-to-CV on real analog voices (Continuum, Osmose), the W/X/Y/Z patch template, the voltage-threshold soft-attack trick, declicking a CV gate

## The methods

- [[Subtractive Synthesis]] — start rich, take away. The default, and its defining limitation
- [[FM Synthesis]] — one oscillator modulates another's frequency. Why it does bells and metal when subtractive can't
- [[Wavetable Synthesis]] — a scannable table of waveforms; position as the instrument
- [[Granular Synthesis]] — grains, and the decoupling of time from pitch

## What's here vs elsewhere

| For | Go to |
|---|---|
| The principle behind a control | **this folder** |
| Which preset to grab under deadline | [[Instrument Preset Map]] |
| A specific plugin's quirks | [[Plugin Index]] |
| Designing a specific *element* | [[Kick Design]] · [[Snare Design]] · [[Bass Design]] |
| Processing after the synth | [[Effects Index]] |
| Sample-based sources | [[Sampling and Sound Selection]] |

## The through-line

Four claims that recur across every page, worth holding onto:

1. **The signal path is always the same.** Oscillator, filter, amp. Every synth is that, dressed differently.
2. **A filter can only remove.** The oscillator sets the ceiling on brightness — which is exactly why [[FM Synthesis]] exists.
3. **Modulate timbre, not level, to make something evolve.** Filter cutoff or wavetable position, not volume.
4. **Build, don't browse, when you're learning.** Preset selection and sound design are different skills and only the second generalizes.

## Related

- [[Machine/Workflows/school]] — this folder closes the largest gap on that list
- [[Effects Index]] · [[Techniques Index]] · [[Instrument Preset Map]]
