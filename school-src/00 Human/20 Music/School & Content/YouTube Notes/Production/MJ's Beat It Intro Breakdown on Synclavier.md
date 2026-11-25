---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=wrqnDFCUzBo
channel: Anthony Marinelli Music
duration: "00:28:41"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, fm-synthesis, michael-jackson, synclavier]
---

# MJ's "Beat It" Intro Breakdown on Synclavier

![](https://www.youtube.com/watch?v=wrqnDFCUzBo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=wrqnDFCUzBo)

## Synopsis

A full parameter-by-parameter reverse-engineering of the "Beat It" intro's Synclavier FM preset (following on from [[MJ's Beat It Intro - Real Sound & Story]]), read directly off the original hardware and cross-checked against a modern iPad emulation (Synclavier Go) to confirm every number matches. The single most detailed FM patch-anatomy video in this batch — genuinely useful as a template for recreating the "gongy," bell-like Synclavier character on any modern FM synth.

## Techniques

- **Monophonic, single-voice patch, deliberately** — the original preset runs at 1-voice polyphony (not the system's max of 128), so notes cut each other off rather than ringing/overlapping; demonstrated side by side, 128-voice polyphony makes the same patch sound noticeably sloppier/muddier.
- **8-bit resolution is load-bearing to the character**, not an artifact to clean up. A/B'd against the same patch at 24-bit and 6-bit/4-bit: 24-bit sounds "too clean," 4-bit is unusably crunchy, and 6-bit was close but the team settled on the original 8-bit as correct. When recreating a vintage digital patch on a modern engine, deliberately matching the source's bit depth (where the option exists) can matter as much as matching the actual parameters.
- **4-partial FM stack, additive-built waveforms per partial**: each partial's base waveform is built from stacked sine-wave harmonics at decaying percentage levels (100% fundamental, ~50%, ~25%, ~12%, ~6%, ~3% — successive octave/fifth/third/seventh partials), described as reading close to a sawtooth's harmonic profile before any FM modulation is even applied.
- **Octave-doubled partial tuning**: partials 1-2 sit at one octave, partials 3-4 at the octave below (measured ~440/441 Hz vs. ~224.6 Hz) — so a single played note sounds in octaves by construction, similar in spirit to the two-oscillator octave-doubling seen on [[How To Program The Synth Riff From Prince's 1999]] but built from 4 independently-enveloped FM partials instead of 2 subtractive oscillators.
- **Non-integer, near-identical-but-not-quite FM ratios across partials is what produces the "gongy"/bell/metallic character**: each partial uses an FM ratio near 3.48-3.50 (specifically ~3.496, ~3.503, ~3.483 across partials) rather than the "safe," harmonic default of a whole-number ratio (1, 2, 3...) — demonstrated A/B against a ratio of exactly 4: the whole-number ratio reads as a clean, ordinary tone, while the near-3.5-but-each-partial-slightly-different ratios produce inharmonic, bell-like partials that beat against each other. **This is the single most important parameter for FM bell/gong/metallic patches.**
- **Distinct envelope shaping per partial, not a shared envelope**: partial 1 has full sustain-less peak with a ~7-second final decay and ~4-second initial decay (long, ringing); partial 2 has a shorter attack (~89 ms) and ~1.5-second final decay, no sustain — different partials are deliberately given different decay lengths so the harmonic balance shifts audibly over the note's duration, not just its overall volume.
- **Portamento on exactly one partial (partial 3), the others none** — a subtle pitch-slide audible only when notes are played close together, applied selectively rather than globally, adding a small amount of "slipperiness" without smearing the whole patch.
- **Chorus as a full extra voice, not a stereo-width effect**: the Synclavier's "chorus" doesn't widen the stereo image — it makes an entirely new copy of all 4 partials, pitched slightly higher, adding a genuine 5th (in practice doubling to 8) voice stack. A/B with chorus on vs. off is dramatic — described as "so much of the character of the sound" coming from this doubled-voice layer, not a subtle top-end sparkle.
- **On matching a legacy digital instrument's math vs. its analog output stage**: the presenters make the point that "Synclavier emulation" software isn't emulating an analog circuit (there wasn't meaningfully one in the signal path) — it's replicating the same digital algorithm and numbers, so a software FM synth with the right partial/ratio/envelope parameters can match a vintage Synclavier patch far more precisely than an analog-modeled synth ever could.

## Routed to

- [[FM Synthesis]] — new `## From videos` bullet: near-3.5 non-integer FM ratios (slightly different per partial) as the mechanism behind bell/gong/metallic FM tones, plus the additive-harmonic-stack + per-partial envelope/portamento/chorus construction of a full 4-partial patch.
- [[Voice Architecture]] — cross-referenced: octave-doubled partial tuning and "chorus = full extra detuned voice" as an FM-domain parallel to unison/detune on subtractive synths.
- [[Vintage Gear Worklist]] — added detail to the Synclavier entry: the full "Beat It" patch anatomy.

## Source

- [MJ's "Beat It" Intro Breakdown on Synclavier](https://www.youtube.com/watch?v=wrqnDFCUzBo) — Anthony Marinelli Music (feat. Kevin Maloney), 28:41. Captions, high confidence.
