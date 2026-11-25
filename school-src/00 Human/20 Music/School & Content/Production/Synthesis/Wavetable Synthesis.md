---
type: synthesis
title: Wavetable Synthesis
tags: [synthesis, production, wavetable]
created: 2026-08-03
---

# Wavetable Synthesis

**A table of single-cycle waveforms, scanned through by a movable position — and the position is modulatable, so the timbre morphs over time.**

The placement had this one right (SYN-08). The refinement worth adding is the precision: it isn't just "lots of waveforms available," it's that **scanning between them is a continuously modulatable parameter**, which is the entire reason the method exists.

## How it works

A wavetable is an ordered array of single-cycle waveforms — often 64 or 256 of them. The oscillator plays one at a time. **Position** (or "index") selects which.

Set position statically and it's an ordinary oscillator on an unusual waveform. **Modulate position and you get timbral movement no fixed oscillator can produce** — the sound changes character while the pitch stays put.

That's the distinction from [[Subtractive Synthesis]], where timbre change comes from filtering harmonics away. Here the *source itself* changes.

## Position is the whole instrument

The single most important routing in wavetable synthesis:

| Modulator on position | Result |
|---|---|
| **Slow LFO** | Evolving pad — the classic use |
| **Envelope** | Timbre that changes across the note's life (bright attack → mellow body) |
| **Velocity** | Harder playing selects a more aggressive waveform |
| **Mod wheel** | Hands-on timbral control while playing |
| **Fast LFO / audio-rate** | Harsh, digital, [[FM Synthesis|FM]]-adjacent territory |

This is also the correct answer to the evolving-pad question (SYN-10): **filter cutoff *or* wavetable position**, modulated slowly. Position is often the better choice because it changes the harmonic content rather than just filtering it, so the movement is more interesting than a sweep.

## Interpolation

How the oscillator gets *between* adjacent waveforms in the table:

- **Interpolated / morphing** — smoothly crossfades. Fluid, natural, the default.
- **Stepped** — jumps discretely. Glitchy, digital, rhythmic when synced.

Most synths default to interpolation. Stepped is worth knowing for hard electronic textures.

## Where wavetables come from

- **Factory tables** — the fastest way in. [[Wavetable]] ships with a well-organized set; [[Serum 2]]'s library is enormous.
- **Analogue-style tables** — tables that sweep saw→square→pulse, giving a subtractive-flavoured sound with morphing built in.
- **Imported audio.** [[Serum 2]] will slice any audio file into a wavetable. Drop in a vocal, a field recording, a drum loop — the result is usually unusable as-is and occasionally extraordinary. This is a genuine sound-design lane and it connects to [[Sampling and Sound Selection]].
- **Drawn by hand** — for the patient.

## Practical notes

**Not every position sounds good.** Tables often contain a few genuinely useful waveforms and a lot of transitional material. Find the two or three positions that sound right, then modulate *between those* rather than sweeping the whole table.

**Position modulation can wreck low end.** On a bass, sweeping position changes the fundamental's relative level, which reads as inconsistent volume. Keep bass positions static or modulate narrowly, and see [[Bass Design]].

**It stacks with everything.** A wavetable oscillator still runs into a [[Filters and Resonance|filter]] and an [[Envelopes and ADSR|amp envelope]] — the [[Signal Path]] is unchanged. Wavetable replaces the oscillator block only.

## On your synths

[[Wavetable]] (Ableton stock) is the best learning tool — the table is drawn on screen and you watch the position marker move as you modulate it. That visual feedback is what makes the concept click.

[[Serum 2]] is the deeper version: two wavetable oscillators, imports, wavetable editing, warp modes per oscillator. [[DUNE 3]] and [[Massive]] both use wavetable oscillators under a more traditional interface.

Per [[Instrument Preset Map]], the `Pads` folder in [[Wavetable]] with position-LFO movement is already your established starting point — this note explains why that works.

## Drill

On [[Wavetable]]: hold one note, set the amp envelope to full sustain, and slowly drag the position marker by hand across the whole table. Listen to how much the sound changes with no filter movement at all. Then assign an 8-bar LFO to position and stop touching it.

## Related

- [[Signal Path]] · [[Oscillators and Waveforms]] — wavetable replaces the oscillator block
- [[LFOs and Modulation]] — position modulation is the point
- [[Subtractive Synthesis]] · [[FM Synthesis]] · [[Granular Synthesis]]
- [[Wavetable]] · [[Serum 2]] · [[Synthesis Index]]

## From videos

*Seeded 2026-08-03 — awaiting `/music-enrich`.*
