---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=ZVLM1XMT6Z0
channel: dnksaus
duration: "00:16:42"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, granular, sound-design, sampling]
briefed: 2026-W31
---

# dnksaus - Granulate EVERYTHING

![](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)

## Synopsis

dnksaus tours Ableton's new **Granulator 3** (a free Live 12 Suite download replacing the older Granulator II / GranulatorInput II / GranulatorFollow II trio with one combined device) across a wide range of sound sources — vocals, sound-design sessions, drum kits — to show how deep the granular rabbit hole goes. The video is structured as a running technique dump rather than a single build: grain modes (Classic/Loop/Cloud), the Variation knob's per-parameter randomization, the Key-modulation system that governs whether a keypress transposes, refilters, or repositions the sample, a millisecond-based tempo-sync hack for grain size, the Shape envelope for grain character, and a closing stretch on using Scan + LFO (including per-ear LFO differences) for glitchy evolving textures. The back half turns compositional: generating drum-pattern variety via Session View Follow Action, and a live-resampling trick (credited to Nicholas Théo) that lets Granulator continuously re-grab audio from another playing track for a hands-off generative texture layer.

## Techniques

- **Granulator 3 replaces the old 3-device setup** — one instrument now covers what used to need [[Granulator II]] plus [[GranulatorInput II]] (live-input capture) and [[GranulatorFollow II]] (follow-modulation); free in the Live 12 Suite Packs tab. → (new) [[Granulator 3]]
- **Three grain modes** — Classic (overlapping grains, sustained), Loop (non-overlapping, with a reverse-chance option), Cloud (stacked simultaneous grains via a density knob, most sustained/pad-like). → (new) [[Granulator 3]]
- **Tuning for pad use vs. keyboard-transpose use** — find the sample's real pitch with a tuner and match it if the goal is a static pad rather than a per-key transposing instrument; add Glide (Mono on + Glide knob) for portamento between held notes.
- **Variation knob + orange-highlighted parameters** — turning up Variation randomizes whichever parameters are lit orange: Position by default, plus optional grain-size variance, TR (transposition) variance for a built-in chorus effect in Cloud mode, and Volume variance. Spread gives left/right ears different pitches for an icy stereo-widened cloud.
- **Key-modulation amount on Transpose/Filter Frequency/Position** — Key at 100% (default on Transpose) means the parameter changes on every keypress; Key at 0 holds it fixed across the keyboard. **Position with Key turned up** is the standout move: each key jumps to a different point in the sample rather than transposing — an ethereal, non-transient-locked cousin of [[Simpler]]'s Slice mode, great for vocal chops. No exact formula for how far Key moves Position — vary it by ear.
- **Pitch-bend still transposes with Key off** — the MPE tab's Note pitch-bend lane can be automated independently (e.g. a scripted octave-down swoop) even when per-key Key-transpose is disabled; remember transposition changes also shift grain size (76.1 ms at 0 semitones, half that at +12).
- **Tempo-sync grain size via the millisecond hack** — highlight a note value in the arrangement to read its exact ms duration (bottom-left of screen), then type that number straight into Grain Size to lock it to the grid — no sync button needed.
- **Shape knob = grain envelope shape** — default 50%; lower = pointy downward-ramp grain (Classic mode), higher = upward-ramp grain. Negative Shape modulation over a note's length takes a plucky envelope back toward regular — pairs well with a grain-size modulation (small → normal) for a natural pluck-to-sustain feel.
- **Scan + LFO for glitchy evolving texture** — Scan auto-scrubs the read position (1× = sample's natural rate, ~0.25× for a slow crawl); running the built-in LFO on grain size and/or position at the same time adds glitch; the LFO can differ per ear for extra stereo drift.
- **Glue preference: Multiband Dynamics over OTT** — reached for as "a nice glue I prefer way more than OTT" on a granular texture — a gentler multiband alternative to OTT's extreme up/down character. → (new) [[Multiband Dynamics]]
- **Corpus kick preset for a boomier sub-bass** — layered under a hip-hop sub-bass preset, pitched down to E, to thicken the low end (Corpus itself gets a full dedicated pass in a later video in this queue).
- **Follow Action as a hands-off drum-pattern shuffler** — drag a pile of drum-clip previews into Session View, select all, Follow Action → Unlink, quarter-note length, next-clip Any, Legato on — randomly shuffles between pattern variations continuously. → [[Randomized Rack Design]]
- **Live I/O resampling for a self-refreshing texture layer** — Granulator's I/O section resamples live input from another playing track; an LFO in Square mode (skewed shape) triggers the capture automatically every 2 bars for a hands-off generative feedback loop. Credit: Nicholas Théo's channel. → [[Randomized Rack Design]]

## Routed to

- [[Granulator 3]] — new plugin note (gap-fill; Ableton's redesigned single-device granular sampler, no prior note); full technique set from this video
- [[Granulator II]], [[GranulatorInput II]], [[GranulatorFollow II]] — cross-linked to the new Granulator 3 as the newer combined alternative (no technique changes to these notes)
- [[Multiband Dynamics]] — new plugin note (gap-fill; Ableton stock 3-band compressor, no prior note); seeded with the "glue preference over OTT" technique
- [[Randomized Rack Design]] — extended with the Follow-Action pattern-shuffler recipe and the live I/O-resampling generative-loop trick

## Source

[granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0) · dnksaus · 16:42 · captions (high confidence) · transcript: [[dnksaus - Granulate EVERYTHING (transcript)]]
