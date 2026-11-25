---
type: synthesis
title: FM Synthesis
tags: [synthesis, production, fm, operator]
created: 2026-08-03
---

# FM Synthesis

**Frequency Modulation: one oscillator modulates another's frequency, generating harmonics that weren't there before.**

This is the fundamental split from [[Subtractive Synthesis]], and the answer to SYN-07. Subtractive starts rich and *removes*. FM starts with sine waves — the simplest possible source — and *creates* harmonic content through modulation. Additive by mechanism, subtractive's opposite by philosophy.

## Carriers and modulators

Two roles, and any operator can play either:

- **Carrier** — the oscillator you actually hear.
- **Modulator** — an oscillator wired to the carrier's *frequency*, which you don't hear directly.

Wire a modulator to a carrier and the carrier's pitch wobbles at the modulator's rate. Slow, that's vibrato — an [[LFOs and Modulation|LFO]]. Speed the modulator into the audio range and the wobble stops being heard as pitch movement and starts being heard as **new harmonic content: sidebands** appearing above and below the carrier frequency.

**FM is just an LFO running too fast to hear as movement.** That's the whole trick, and it's why [[LFOs and Modulation]] and this page are the same idea at different speeds.

Two controls govern everything:

| Control | Effect |
|---|---|
| **Ratio** (modulator freq ÷ carrier freq) | *Where* the sidebands land — decides harmonic vs inharmonic |
| **Index / amount** (modulation depth) | *How many* sidebands and how loud — decides brightness and aggression |

Modulation index is FM's brightness knob. Envelope it and you get the DX7 electric piano — bright bell-like attack decaying into a soft sine body — which is one envelope on one parameter.

## Why FM does bells and metal

The question the placement asked (SYN-13, blank), and the mechanism is worth knowing exactly.

- **Integer ratios (1:1, 2:1, 1:3) → harmonic sidebands.** They land on whole-number multiples of the fundamental, right on the overtone series. Your ear fuses them into one clear pitch. Result: basses, electric pianos, organs, plucks.
- **Non-integer ratios (1:1.41, 3:2.7) → inharmonic sidebands.** They land *between* the harmonics. The ear can't fuse them into a single pitch, so the sound turns clangorous and metallic. Result: bells, mallets, metal, glass, aggressive digital leads.

**Real bells are physically inharmonic** — a struck metal object vibrates in modes that aren't whole-number multiples of any fundamental. FM reproduces that naturally because non-integer ratios put partials in exactly those non-integer positions. ([MusicTech](https://musictech.blog/fm-synthesis-explained/), [Synth Basics](https://synthbasics.com/learn/fm-synthesis))

Subtractive can't get there. Its oscillators are harmonic by construction and the filter can only attenuate what exists — it can't *relocate* a partial to a non-integer position. That's the complete answer to why subtractive struggles with bells and FM doesn't.

## Algorithms

More than two operators, and the wiring matters. An **algorithm** is a preset routing: which operators modulate which, and which reach the output.

- **Stacked** (A modulates B modulates C) — modulating a modulator, spectra get complex fast. Aggressive, digital, hard to predict.
- **Parallel** (several carriers side by side) — closer to additive; each carrier contributes its own partial set. Smoother, more organ-like.
- **Mixed** — most useful algorithms, some modulation depth plus a clean carrier for body.

[[Operator]] gives four operators and eleven algorithms, displayed as a diagram in the top-left. That diagram is the patch's architecture — read it first, before touching anything.

## Why it has a reputation for being hard

Honest framing, because it explains why the placement found this blank and that's normal:

- **Parameters aren't perceptual.** Cutoff maps to "brightness" intuitively. "Ratio 1.41 at index 6" maps to nothing until you've heard it.
- **It's non-linear.** Small ratio changes can transform a patch completely. Subtractive degrades gracefully; FM jumps.
- **Tweaking randomly rarely converges.** Subtractive rewards fiddling. FM mostly rewards understanding.

**The practical route in:** don't build from scratch first. Load an [[Operator]] preset, look at its algorithm, then change *one* thing — one ratio, or one operator's envelope — and listen. Ratios first, index second, envelopes third.

## Where it earns its place in your music

FM isn't a niche curiosity for the genres you work in:

- **Bells, mallets and glassy plucks** — the ear-candy melodic layer. [[Operator]] and [[Collision]] both cover this.
- **Electric pianos** — the DX7 lane, all over 80s pop and modern R&B.
- **Hard digital basses** — FM basses have a bite subtractive can't produce. Relevant to [[EDM Subgenres]].
- **Clean sine subs** — [[Operator]] with modulation at zero is a pure sine generator, which is a perfectly good 808 source.

## Drill

On [[Operator]]: pick the simplest algorithm (one modulator into one carrier). Set ratio 1:1 and sweep the modulation index from 0 up — hear harmonics appear on a sine. Then move the ratio to 1:2 (still harmonic), then to 1:1.41 (inharmonic). The moment it turns metallic is the whole lesson.

## Related

- [[Subtractive Synthesis]] — the opposite approach
- [[LFOs and Modulation]] — the same mechanism below audio rate
- [[Oscillators and Waveforms]] · [[Envelopes and ADSR]]
- [[Operator]] · [[Collision]] · [[Synthesis Index]]

## Sources

- [FM Synthesis Explained: Operators, Algorithms, And The DX7 — MusicTech](https://musictech.blog/fm-synthesis-explained/)
- [FM Synthesis Explained: Carriers, Modulators, Ratios — Synth Basics](https://synthbasics.com/learn/fm-synthesis)
- [Frequency Modulation Synthesis — CCRMA, Stanford](https://ccrma.stanford.edu/software/clm/compmus/clm-tutorials/fm2.html)

## From videos

- **Translate synesthetic/color creative feedback into an FM ratio change, not a volume or envelope change.** On "We Are the World"'s bell intro, given the note "those are silver bells, I need golden," the fix was iteratively adjusting FM ratio (nothing else) until the timbre read warmer/richer — a concrete example of a producer's non-technical, color-language note mapping onto FM ratio as the actual parameter to move, found in 5-10 minutes of by-ear tweaking. → [[Vintage Gear Worklist]] — Anthony Marinelli, [[MJ's We Are the World Synclavier Intro]]
- **Non-integer, near-3.5 FM ratios (slightly different per partial/operator) are what produce a bell/gong/metallic tone — not a whole-number ratio.** A full parameter reverse-engineering of Michael Jackson's "Beat It" intro (a 4-partial Synclavier patch, cross-checked against a modern app emulation to confirm every number matches): each partial runs an FM ratio near 3.48-3.50 (e.g. 3.496, 3.503, 3.483) rather than a "safe" harmonic ratio like 1, 2, or 4 — demonstrated A/B, a ratio of exactly 4 sounds clean/ordinary while the near-3.5-but-each-partial-different ratios beat against each other for genuine inharmonic bell/gong character. Full patch anatomy for reference: each partial's base tone is additive-built from decaying sine harmonics (~100/50/25/12/6/3%, sawtooth-like before FM); partials pair up an octave apart (2 high, 2 low) so a single note plays in octaves by construction; each partial carries its own independent envelope (wildly different decay lengths per partial, e.g. ~7s vs. ~1.5s final decay) so the harmonic balance shifts over the note's duration; portamento was applied to exactly one of the four partials, not globally; and "chorus" here means a full extra copy of ALL partials pitched slightly higher (not a stereo-width effect) — A/B'd, most of the patch's perceived character comes from this doubled-voice layer. Bit depth (8-bit, matching the original hardware) was also load-bearing — 24-bit read as "too clean." → [[Voice Architecture]], [[Vintage Gear Worklist]] — Anthony Marinelli (feat. Kevin Maloney), [[MJ's Beat It Intro Breakdown on Synclavier]]
- **FM (additive) and analog/subtractive synthesis framed as deliberately complementary "opposite directions," not competing options.** FM builds complex tones by adding components together from scratch; subtractive synthesis starts full-spectrum and removes harmonics with filters. Demonstrated in practice: an FM tone (Synclavier, raw sawtooth-like character) run through an analog filter/flanger/phase-shifter chain (Roland System 100), with the filter automated live to follow a written orchestral score's dynamics (mezzo forte, forte) — the combination read as more dimensional and expressive than either the FM tone or the analog processing alone. A useful default: reach for FM+analog together rather than treating one as a replacement for the other. → [[Filters and Resonance]], [[Vintage Gear Worklist]] — Anthony Marinelli, [[Blue Thunder - The Sounds I Made For The Film]]
