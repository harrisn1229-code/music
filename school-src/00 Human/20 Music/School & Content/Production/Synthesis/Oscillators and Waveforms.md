---
type: synthesis
title: Oscillators and Waveforms
tags: [synthesis, production, oscillators, waveforms]
created: 2026-08-03
---

# Oscillators and Waveforms

The first block in the [[Signal Path]]. The oscillator generates the raw tone; everything downstream can only shape what it produces.

**The governing rule: a subtractive filter can only remove harmonics. It can never add them.** So the waveform you start on sets the ceiling on how bright the patch can ever be. Start on a sine and no amount of filter tweaking will give you a lead.

## The four basic waveforms

| Wave | Harmonics | Sounds like | Use for |
|---|---|---|---|
| **Sine** | Fundamental only — no harmonics at all | Pure, hollow, flute-ish | Subs, 808s, bells (via [[FM Synthesis]]), layering under anything |
| **Triangle** | Odd harmonics, falling off fast | Soft, slightly reedy | Gentle leads, softer subs, flute-like pads |
| **Square / pulse** | Odd harmonics only | Hollow, woody, clarinet-ish | Basses, chiptune leads, retro anything |
| **Sawtooth** | *All* harmonics, falling off gradually | Bright, buzzy, full | Supersaws, brass, strings, the default for pads and leads |

**Saw is the workhorse** precisely because it has the most harmonic content — the most raw material for the filter to carve. When in doubt, start there.

The square-vs-saw difference is worth hearing rather than reading: square omits every even harmonic, which is what produces its hollow character. That's the same reason a clarinet sounds hollow — it behaves like a closed pipe and suppresses even harmonics too.

## Pulse width

A square wave is a pulse at exactly 50% width. Move that width away from 50% and the harmonic content changes — thinner, more nasal as it narrows.

**Pulse width modulation (PWM)** — a slow [[LFOs and Modulation|LFO]] on pulse width — is one of the oldest and best thickening tricks in synthesis. It makes a single oscillator sound like several slightly detuned ones without the CPU cost or the phase issues. The classic string-machine and Juno pad sound is PWM.

## Stacking oscillators

Most patches use more than one source, summed before the filter.

- **Two oscillators detuned slightly** — the fundamental thickening move. See [[Voice Architecture]].
- **An octave apart** — adds weight below or sparkle above without muddying.
- **A fifth apart** — instant power-chord character. Locks the patch to one harmonic function, so use deliberately.
- **Sub oscillator** — usually a sine or square one or two octaves down, dedicated to low-end weight. Keep it clean: no detune, no drive. In a mix the sub is doing a job the ear reads as *level*, not *tone*.
- **Noise** — not a pitched oscillator at all. White noise is flat across the spectrum; pink noise falls off with frequency. A short burst of filtered noise on the attack is what gives a patch its "breath" or its pick attack, and it's the cheapest way to make a synth sound less synthetic.

## Phase and retrigger

Whether an oscillator restarts its waveform at the same point on every note (**retrigger** / phase reset) or runs freely matters more than it sounds like it should:

- **Retriggered** — every note attacks identically. Essential for basses and 808s, where a consistent transient is the whole point.
- **Free-running** — every note is slightly different. Good for pads and anything that should feel organic.

An 808 or sub bass with a free-running oscillator will have inconsistent attack level note-to-note. That's a real and commonly misdiagnosed problem — it gets blamed on the compressor.

## On your synths

- [[Analog]] · [[Model 84 Polyphonic Synthesizer|Model 84]] — two oscillators plus sub and noise, the classic layout, nothing hidden.
- [[Drift]] — two oscillators with a genuinely good noise source and its "drift" control, which slightly randomizes pitch and is what makes it sound analogue.
- [[Wavetable]] · [[Serum 2]] — the waveform itself is scannable rather than fixed. See [[Wavetable Synthesis]].
- [[Operator]] — sine oscillators only, because in FM you *build* harmonics rather than filtering them away. See [[FM Synthesis]].

## Drill

On [[Analog]], listen to all four waveforms through a wide-open filter, then close the filter to the same cutoff on each. Note how much each one still has left. That difference *is* the harmonic content, and it's why saw is the default.

## Related

- [[Signal Path]] · [[Filters and Resonance]] · [[Voice Architecture]]
- [[Wavetable Synthesis]] · [[FM Synthesis]] — two ways past the four basic waves
- [[Bass Design]] · [[Kick Design]] — where the sub-oscillator thinking gets applied
- [[Synthesis Index]]

## From videos

- **PWM depth must scale DOWN for low-frequency material and can go much heavier on high-frequency material — the same modulation amount reads as rich/chorusy up high but "squirrely"/out of tune down low.** From a Jupiter-8 recreation of The Weeknd's "Blinding Lights" lead: check register before committing to a PWM depth setting, and back it off specifically on bass-register parts. Instrument choice (poly vs. mono) was decided by listening for note-to-note RING/overlap on the reference rather than guessing — sustained ring between overlapping notes ruled out a monophonic synth outright. → [[Layering and Stacking]] — Anthony Marinelli, [[How To Program The Synth Lead From The Weeknds Blinding Lights]]
- **A square wave can stand in for a "sine-like" tone when the reference itself wasn't a pure sine either — its odd-order harmonics decay perceptually fast enough to read close to a sine while adding a touch of character a literal sine oscillator would lack.** From the Thriller theremin patch: vintage electronics of the reference era couldn't generate a perfect sine and had no filtering to clean one up, so a slightly-imperfect square wave was the historically accurate choice, not a workaround. Worth trying whenever a "should be a sine" patch sounds too clean/sterile against a real-world or period reference. → [[LFOs and Modulation]] — Anthony Marinelli, [[How I Programmed the Theremin Sound On Thriller]]
- **For synth bass specifically, start on a square wave, not a saw — square gives more focused fundamental with just enough odd-harmonic edge to cut through; a pure sine alone is too boomy to articulate a moving line.** Square skips even harmonics (fundamental, 3rd, 5th, 7th...) so more of its energy concentrates in the fundamental than a saw's full harmonic series does — reads rounder/fatter low-end and thinner/more nasal as pulse width narrows off 50%, consistent with this page's own pulse-width section. If a square still isn't fat enough, add PWM (below) before reaching for a second oscillator. → [[Bass Design]] — Anthony Marinelli, [[10 Tips For Synth Bass]]
- **Pulse-width modulation from the note's own envelope, not just an LFO, thickens a mono bass oscillator without phasing.** The standard PWM entry uses a slow LFO (documented above); an alternative worth having in the toolkit — route the amp/filter envelope itself (a decay-shaped ramp) into pulse-width instead, so the width changes as the note evolves rather than cycling independently. Reads like "almost two oscillators" (a moving, chorus-like texture) while staying a single, perfectly in-tune source — no detune/phase-cancellation risk since there's only one oscillator. A slow sine LFO into PW gets the same chorusing effect and can be tempo-synced for a rhythmic width-pump. → [[LFOs and Modulation]], [[Envelopes and ADSR]] — Anthony Marinelli, [[10 Tips For Synth Bass]]
- **A cheap "pipe organ" texture from pure oscillator stacking: layer several octave-related pitches from the same note (sub-octave, unison, an octave up, a further fifth/octave above that — the classic 16'/8'/4'/2' organ-stop ratios), detune them very slightly, and add chorus.** No filter trickery or special waveform needed — the organ-like character comes entirely from stacking harmonically-related octave/fifth intervals of the same note and letting slight detune + chorus do the "breathing" the ear associates with a real organ or string machine. On a synth with multiple detunable oscillators/unison voices (any owned poly synth), this is a direct application of this page's own octave/fifth-stacking guidance above — the addition here is the specific 16'/8'/4'/2' organ-stop ratio and the detune+chorus finish. → [[Voice Architecture]] — Anthony Marinelli & Rob Rosen, [[Rob Rosen Reveals His Ultimate Synth Collection]]
- **Blend in a sine wave from the SAME oscillator, underneath its main waveform (saw or square), for extra low-end weight with zero tuning/phasing risk — the Yamaha CS-80 trick.** Some synths (the CS-series specifically; on gear without it, use a second oscillator's sine — see the anti-phasing bullet on [[Voice Architecture]]) let you tap a sine-wave output from the same oscillator generating the main waveform and mix it back in. Because it's the same source, it's automatically in tune and phase-locked — pure added fundamental with no risk of the two-oscillator phase cancellation this page's stacking section otherwise carries. The sine alone is too boomy/undefined to carry a line (no articulation), so it's always a *blend under* the main waveform, not a replacement — dial the ratio until the bass reads full on low notes without losing definition on the line. → [[Bass Design]] — Anthony Marinelli, [[10 Tips For Synth Bass]]
