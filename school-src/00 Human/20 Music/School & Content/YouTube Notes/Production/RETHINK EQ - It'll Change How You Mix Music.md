---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=JCjHSd10rGI
channel: Sage Audio
duration: "00:11:54"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, eq, psychoacoustics, dynamics, saturation]
---

# RETHINK EQ - It'll Change How You Mix Music

![](https://www.youtube.com/watch?v=JCjHSd10rGI)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=JCjHSd10rGI)

## Synopsis

A conceptual reframe of EQ from Sage Audio: rather than "a tool that controls frequency response," the video walks through five side effects EQ has beyond tone-shaping — it works like a granular extension of the channel fader, it interacts with perceived loudness in a frequency-dependent (not flat) way, it reshapes dynamic range, it can isolate or amplify harmonic distortion introduced elsewhere in the chain, and at extreme settings it can produce genuine psychoacoustic illusions (phantom harmonics, perceived pitch shift). None of this changes how to turn the knobs day-to-day, but it explains why an EQ move sometimes has a bigger or smaller effect on the overall mix than the dB number alone would suggest.

## Techniques

- **Think of EQ as a granular extension of the channel fader, not a separate "tone" tool.** A channel fader changes the amplitude of an entire instrument at once; an EQ band does the same thing but scoped to just the fundamental, an overtone, or a percussive transient — e.g. a kick's 60 Hz fundamental, its 180/360 Hz overtones, and its ~1 kHz transient click can each be pushed independently. The Q value is effectively how many "sub-faders" you're controlling at once. Reframing EQ this way makes mix-balance decisions (not just tone decisions) the primary lens for every EQ move. → [[EQ]]
- **A 6 dB EQ change doubles or halves perceived loudness of that range — but the mix-wide impact depends on which frequency you touched, not just the dB amount.** Our ears have a resonance peak around **3.5 kHz** (also roughly the vocal's third formant), so a boost there reads as far louder to the mix overall than an equal-dB boost somewhere less perceptually weighted (e.g. 500 Hz on a bass) — demoed on a LUFS meter, where the 3.5 kHz vocal boost moved the reading more than the 500 Hz bass boost at the same gain. Concrete implication: when chasing perceived loudness/energy without just raising the fader, a small boost around 3–4 kHz on a lead/vocal is a more efficient lever than the same boost buried in the low-mids. → [[LEAD Slot]], [[EQ]]
- **EQ reshapes an element's dynamic range, and the effect compounds unpredictably across overlapping bands.** Boosting a Bell filter on a fundamental raises that peak more than it raises the quiet parts of the same range, widening dynamic range; with multiple bands touching overlapping harmonics of the same note, the net peak level after EQ depends on which frequency actually dominates that peak — boosting one harmonic while cutting an overlapping one can raise OR lower the resulting peak depending on their relative amplitude contribution. Practical takeaway: don't assume an EQ move that "only" touches one band leaves dynamics/peak level unaffected — recheck levels after any EQ pass, especially before a compressor/limiter downstream. → [[EQ]], [[Compression]]
- **EQ can isolate and re-amplify the specific harmonics a saturator generates, giving more surgical control over the distorted character than the distortion plugin's own controls.** Chain: send to a parallel/aux track, low-pass to isolate just the fundamental, saturate, then EQ the resulting harmonic stack — boost a shelf above the fundamental to emphasize the added harmonics, or high-pass out the original fundamental entirely to isolate the distortion-generated content by itself, blending that back in at a controlled level. This is a more precise way to dial in "how much grit vs. how much fundamental" than adjusting the saturator's own drive/mix alone. → [[Saturator]], [[Saturation and Distortion]]
- **Extreme EQ boosts can create psychoacoustic illusions — phantom harmonics and perceived pitch shift — worth knowing as a ceiling, not a technique to reach for casually.** A large boost at a fundamental (e.g. +30 dB at 100 Hz) can shift the perceived pitch by up to roughly a semitone even though the actual fundamental frequency hasn't moved; a large boost at one frequency (e.g. 2 kHz) can cause the ear to perceive harmonics above it (4 kHz, 8 kHz…) that are not physically present in the signal at all. Useful mainly as an explanation for "why does this EQ move sound more drastic than the dB reading suggests" at aggressive settings. → [[EQ]]

## Routed to

- [[EQ]] (effect page) — fader-extension reframe, loudness/frequency-weighting relationship, dynamic-range interaction, psychoacoustic pitch/harmonic illusions
- [[Compression]] (effect page) — note on rechecking dynamics/peak level after an EQ pass, before compression/limiting
- [[Saturation and Distortion]] (effect page) — EQ-after-saturator technique for isolating and reshaping generated harmonics
- [[Saturator]] (plugin) — the isolate-fundamental → saturate → EQ-the-harmonics chain

## Source

- [RETHINK EQ - It'll Change How You Mix Music](https://www.youtube.com/watch?v=JCjHSd10rGI) — Sage Audio, 11:54
- Transcript source: captions, high confidence — clean spoken breakdown
- Full transcript: [[RETHINK EQ - It'll Change How You Mix Music (transcript)]]
