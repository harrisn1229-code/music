---
type: yt-note
date: 2026-07-31
source: youtube
url: https://www.youtube.com/watch?v=6tgjeG_6OvQ
channel: You Suck at Producing
duration: 00:07:58
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, bass-design, serum, dubstep]
briefed: 2026-W31
---

# Make INSANE Dubstep Basses Just By Drawing!

![](https://www.youtube.com/watch?v=6tgjeG_6OvQ)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=6tgjeG_6OvQ)

## Synopsis

A Serum wavetable-editor bass-design tutorial delivered in the channel's comedic "Kelly, DJ Kum" persona, plus a free Ableton-native workaround for anyone without Serum. The core idea is building a "wub"/dubstep bass entirely by drawing individual harmonics into Serum's wavetable editor rather than starting from a preset, then explains the harmonic-series math behind why that works, morphs between the drawn wave and a clean sine with an LFO for movement, and finishes with EQ/sub-splitting and layered effects for polish. The back half pivots to a completely free, plugin-agnostic trick for anyone on stock Ableton: building a "phase disperser" (the wobbly, bubbly low-end texture normally sold as its own plugin) out of a duplicated, phase-inverted Phaser chain plus a phase-inverted Utility — credited to fellow producer "Offset."

## Techniques

- **Draw harmonics directly into Serum's wavetable editor (~0:15).** Open the pencil/draw tool in the wavetable editor, switch the waveform-type selector to **Sine**, then draw directly into the harmonic bins. The **top row** of bins sets each harmonic's **volume/level**; the **bottom row** sets that harmonic's **phase** (how early/late that partial's cycle starts relative to the fundamental). The drawn harmonics appear live in the Spectrum view above.
- **Harmonic-series math, made concrete (~1:15).** The fundamental (A1) sits at 110 Hz. Doubling the frequency (220 Hz) moves up exactly one octave (A2). Tripling it lands an octave + a fifth (E). Quadrupling (440 Hz) is two octaves up (A3, doubling again). The 5th harmonic above that lands on a new pitch again — draw enough harmonics at musically related ratios and you're effectively building a chord-like structure out of a single oscillator's partials, not separate voices.
- **Duplicate the oscillator before drawing, so the original sine survives as a clean fallback (~2:05).** Hit the **+** (duplicate oscillator) button in Serum before hand-drawing harmonics, so oscillator 1 stays a plain sine (usable later for a clean sub) while oscillator 2 becomes the hand-drawn, harmonically-dense "wub" wave.
- **Distortion + phase tweaking after drawing (~2:45).** Add Distortion in the Effects tab and crank Drive to bring the drawn harmonics out further; going back into the wavetable editor afterward and nudging individual harmonics' **phase** bins (not just volume) produces audibly different tonal character once distortion is already reacting to the waveform shape.
- **Morph → Crossfade + LFO-driven wavetable position, for movement between two shapes (~3:35).** In the pencil/draw panel, switch to **Morph → Crossfade** mode so the oscillator can blend between the plain sine and the hand-drawn harmonic wave. Map an **LFO** (triangle shape used here) to the resulting **WT Position** knob so the oscillator continuously sweeps between the two waveforms — this is the wobble/movement engine of the bass, distinct from amplitude wobble.
- **Widen the harmonic layer, but keep the sub mono and untouched by FX (~4:40).** Adding Serum's **Hyper** (unison/widening) makes the drawn harmonic oscillator sound "girthy" and wide — but doing this on the low end causes phase cancellation and mud. Fix: **high-pass** the harmonic oscillator to remove its low end, and run a **separate sub oscillator** (the reserved plain-sine osc 1) with **Direct Out** enabled so it completely bypasses the FX chain — the sub stays phase-coherent and mono no matter what happens to the top oscillator's effects.
- **LFO on level for wobble amplitude, and a saturator layer for extra edge (~5:05).** A second LFO (triangle wave, described as sounding "hella lit" in this shape) mapped to level/gain adds the classic amplitude-wobble motion. Layering a saturator (OTT mentioned by name) on top adds further aggression/glue once the core tone and movement are set. → [[OTT]], [[Bass Design]]
- **Free Ableton-native "phase disperser" built from a duplicated, phase-inverted Phaser + Utility (~6:00) — the headline free technique.** A hardware/plugin disperser delays low frequencies relative to highs (it is *not* a filter/EQ — nothing is removed in level, only shifted in time). To fake this for free: (1) put a **Phaser** on the bass track; (2) turn the Phaser's **Amount down to 0** so none of its sweeping/notch movement is audible, leaving only static all-pass notches; (3) **group the Phaser into an Audio Effect Rack** (Cmd/Ctrl+G); (4) **duplicate that rack's chain**; (5) on the duplicate chain, flip its **phase-invert** switch — the two phasers' static notches now cancel each other out, so with both chains active and both at Amount 0 the track sounds *identical* to bypassing the whole rack (a null test, effectively); (6) add a **Utility** device to one of the two chains and flip **its** phase-invert switch too — because Utility's invert happens at a different point in the signal path than the Phaser-pair cancellation, this reintroduces a frequency-dependent delay between the two chains, which is the actual "disperser" bubbly/wobbly effect; (7) duplicate the whole rack a couple more times for a stronger effect. → [[Phaser-Flanger]], [[kHs Phaser]], [[Utility]], [[Phase Alignment]]

## Routed to
- [[Serum 2]] — wavetable harmonic-drawing + Morph/Crossfade LFO-position technique
- [[Phaser-Flanger]] — free phase-disperser build (duplicated phase-inverted Phaser + Utility)
- [[Utility]] — phase-invert's role in the disperser trick
- [[Bass Design]] — mono sub / Direct Out discipline referenced

## Source
- Channel: You Suck at Producing
- Duration: 7:58
- Transcript: captions (clean — spoken/comedic monologue, not sung, transcribes reliably)
- Full transcript: [[Make INSANE Dubstep Basses Just By Drawing! (transcript)]]
