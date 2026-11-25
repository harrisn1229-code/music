---
type: synthesis
title: Granular Synthesis
tags: [synthesis, production, granular, texture]
created: 2026-08-03
---

# Granular Synthesis

**Chop audio into very short grains — typically 1–100 ms — and replay them with independent control over position, size, density and pitch.**

The placement (SYN-14) had "samples a specific part of a waveform, good for glitchy stuff." Glitch is a real use, but it undersells it: the defining property is that **playback position and pitch become independent**, which is what makes everything else possible.

## The decoupling

In normal sample playback, time and pitch are locked. Play a sample at half speed and it drops an octave — tape behaviour, and what [[Sampling and Sound Selection|re-pitching]] does.

Granular breaks that link. Because the synth is re-triggering tiny grains rather than playing the file linearly, it can:

- **Freeze** — hold the position still and repeat the same grain indefinitely. An infinite sustain from a half-second source.
- **Stretch enormously** — move the position slowly while grains fire at their own rate. Ten-second stretches of a one-second sample, with no transposition.
- **Transpose without changing duration** — pitch the grains, leave position speed alone.
- **Scatter** — randomize position and get a cloud rather than a line.

That decoupling is the concept. Glitch is one thing you can do with it.

## The four controls

| Control | What it does | Typical range |
|---|---|---|
| **Position** | Where in the source file grains are taken from | The main performance control |
| **Grain size** | How long each grain is | ~1–10 ms = buzzy/pitched · 20–50 ms = smooth · 100 ms+ = recognizable fragments |
| **Density / rate** | How many grains fire per second | Sparse = stuttery · dense = continuous texture |
| **Spray / jitter** | Randomization of position per grain | A little = organic · a lot = cloud |

**Grain size is the character control.** Very short grains stop sounding like the source at all and start producing tone from the grain rate itself — the source becomes raw material rather than something you recognize. Longer grains keep the source's identity.

**Spray is the "make it sound less like a machine" control.** Zero spray with high density produces a periodic buzz; a small amount breaks up the regularity into texture.

## What it's genuinely for

- **Pads and textures from anything.** Take half a second of a vocal, a room recording, a guitar note — get an evolving bed. This is the highest-value use and it costs almost nothing.
- **Ambient beds and drones** — see [[Ambient Texture and Field Recording]].
- **Time-stretching as sound design** rather than tempo-matching. Stretching something 20× produces material that doesn't sound like a stretch, it sounds like a new instrument.
- **Reverb-like tails without a reverb** — dense, sprayed grains from a decaying source behave like a diffuse tail with a different character than any algorithm.
- **Glitch and stutter** — sparse, low-density grains at rhythmic intervals.

## The workflow that matters most

Granular's best use in your workflow is as a **resampling target**, not a live instrument:

1. Print or bounce something — a chord, a vocal phrase, a drum fill.
2. Load it into [[Granulator 3]].
3. Freeze on an interesting moment, find a grain size and spray that sounds good.
4. **Print the result** and treat it as new source material.

That's the print → mangle → reprint loop, and it connects directly to the resampling gap the placement found (SMP-09). See [[Committing and Printing]] and [[Sample Clearance]] if the source isn't yours.

## Practical notes

**It is CPU-hungry.** Many grains, each with its own envelope. Print early.

**Mono-check dense granular.** Grains scattered in stereo can partially cancel — see [[Width and Stereo]].

**Source quality is everything.** Granular magnifies whatever's there. Noise, hum and clipping in the source become *features* of the texture, sometimes usefully and usually not.

**It's rarely a foreground sound.** Granular textures sit under things. A granular pad at 20% in the background does more for a track than one at the front.

## On your synths

[[Granulator 3]] (Max for Live) is the main tool — drop in a sample, position knob, grain controls, done. Also [[Granulator II]] and its `Follow`/`Input` variants for live-input granulation.

[[Omnisphere]] has granular modes inside its oscillator section, useful when you want granular character with a full synth architecture around it. [[Simpler]] in its own way overlaps — its warp modes do related work at a coarser grain (see [[Sampling and Sound Selection]]).

## Drill

Take one second of any sustained sound you've made. Load [[Granulator 3]], freeze the position, and find grain sizes at 5 ms, 40 ms and 150 ms — three completely different instruments from one source. Add spray to the smoothest one, print it, and use it as a pad.

## Related

- [[Signal Path]] — granular replaces the oscillator block; filter and amp are unchanged
- [[Sampling and Sound Selection]] · [[Sample Clearance]] · [[Committing and Printing]]
- [[Ambient Texture and Field Recording]] · [[Layering and Stacking]]
- [[Wavetable Synthesis]] — the other "source is a file" method
- [[Synthesis Index]]

## From videos

- **The other five [[Simpler]] warp modes, in granular terms — Tones/Beats/Complex/Complex Pro/Re-Pitch alongside Texture** — an earlier, broader overview of the same Simpler warp-mode territory the two entries below cover in Texture-only depth. **Tones mode** is Texture without the flux parameter, but its grain size is **signal-dependent** rather than Texture's static user-set value — the two modes sound distinct on the same source for that reason alone, not just the missing flux. **Beats mode** is a different flavor of grain-adjacent processing built on transients/beat-divisions rather than a grain-size knob: its **Preserve** param loops each detected transient in place (or loops against a BPM-relative beat division instead — quarter/8th/16th/32nd, finer = denser/more granular-sounding), its **Loop** param sets the per-segment repeat behavior (Back and Forth *[default]* = play-to-end/reverse-to-a-mid-zero-crossing/forward-again repeating; Forward = same segments, no reverse; Off = play once then silence for any remaining time), and its **Envelope** slider fades each segment's volume (100 = no fade, 0 = near-instant decay) — combining a low Envelope value with a fine beat division produces short, percussive stutters. **Complex/Complex Pro** sit outside the grain-based family entirely (phase-vocoder-style character, qualitatively different from Texture/Tones/Beats) and pair well with Simpler's pitch envelope; Complex Pro's extra **Formant**/**Envelope** sliders (normally for transposition-intelligibility) can be pushed for effect instead — see [[Pitch and Formant]]. **Re-Pitch mode** is the non-decoupled outlier — it raises/lowers pitch by whatever amount produces the target time-stretch, i.e. old-school locked-together sampler behavior, useful specifically when that character is wanted rather than avoided. → [[Simpler]] (Warp mode ③) — asd (ableton sound design), [Granular Warping Techniques in Simpler](https://www.youtube.com/watch?v=sfIH55dm8NQ)
- **Region-based slicing at the max 64 regions as a granular-pad seed source, distinct from transient slicing** — Simpler's **Region** slicing algorithm (vs. Transient) divides a sample into equal-length regions; setting **Regions to its maximum of 64** gives the finest equal-length slicing available, useful for auditioning small fragments of a musical/vocal source for one worth Texture-warping into a pad — reverb on top of the stretched result made a real audible difference over the dry version. → [[Simpler]], [[Ambient Texture and Field Recording]] — asd (ableton sound design), [Granular Warping Techniques in Simpler](https://www.youtube.com/watch?v=sfIH55dm8NQ)
- **Simpler's own Length/Start/Loop/Fade params as a device-native, non-warp-mode route into audio-rate/granular-adjacent looping** — no clip warping needed: load a one-shot into [[Simpler]], enable **Loop**, disable Zero Crossing Snap, set Start = 0 and Loop/Length to 100%, then automate **Length** on a sustained note — because Length is a **percentage of the sample's own length, not a time value**, shrinking it drives the loop continuously into audio-rate territory (heard as pitch/tone, not discrete rhythm). Since it's real audio looping, loop rate is pitch-coupled — **Transpose** modulation is a second lever, smoothed into a glissando via Voices=1 + Glide. The **Start/Loop/Fade** region params interact for granular/textural results distinct from a clean loop, and a **Warp mode** applied afterward severs the pitch/loop-length coupling entirely, mangling content directly instead (the part-3 Texture-mode route below). Scales to a whole kit via [[Drum Rack]]'s copy/map-to-all-siblings workflow, where the same Length-is-relative-to-each-sample-length fact produces genuine polyrhythm across pads from one shared macro. → [[Simpler]], [[Drum Rack]], [[Rhythm and Groove]] — asd (ableton sound design), [EXPONENTIAL RHYTHMS \[2/5\] Sample Looping in Simpler](https://www.youtube.com/watch?v=QRj6sxdimkQ)
- **Ableton's Texture warp mode as a device-free, clip-level route into granular-style design** — Texture is one of Live's six audio-warp modes; pushing an audio clip's segment BPM far past the project BPM (drag/type/BPM-doubling button) while set to Texture forces drastic time-stretching, and the mode responds by breaking the clip into grains — **grain size** sets grain length (and therefore the resulting rhythm's rate: audio-rate-short up to long/distinguishable), and **flux** adds random per-grain length jitter (Texture mode's version of spray/jitter — low = subtle variation, high = rhythmic chaos). Both are pitch-dependent, so transposing the clip is itself a rhythm-design lever. Small grain + high flux = noisy timbre that still preserves the source's transient contour; large grain + high flux + pitched-up = smoothed, spread textural drone — the same "grain size is the character control" spectrum this note already documents for Granulator, reached here with zero extra devices, purely through clip warp settings. Also worth trying: reversing the source clip before texture-warping it. → [[Simpler]] (Warp mode ③), [[Ambient Texture and Field Recording]] — asd (ableton sound design), [EXPONENTIAL RHYTHMS \[3/5\] Texture Mode](https://www.youtube.com/watch?v=HTLPQgNkXyc)
- **Warp-parameter automation lives in the clip's Envelopes tab, not a track automation lane, and it's percentage-based** — sample-warp parameters (grain size, flux, transpose, etc.) can't be automated from track automation lanes; they're automated per-clip via the sample editor's **Envelopes tab**, and that automation drives a *percentage of the current Audio-tab value*, not an absolute target — so set grain size/flux to their **maximum** first, then shape the working range down inside the Envelopes tab, to keep full modulation headroom available. → [[Sample Browser and Clips Workflow]] — asd (ableton sound design), [EXPONENTIAL RHYTHMS \[3/5\] Texture Mode](https://www.youtube.com/watch?v=HTLPQgNkXyc)
