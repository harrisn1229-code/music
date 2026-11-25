---
type: plugin
title: "Granulator 3"
category: Instrument
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Granulator 3

**Category:** Instrument
**Vendor:** Max for Live

## What it is

Ableton's redesigned single-device granular sampler (free in the Live 12 Suite — Packs tab), replacing the split [[Granulator II]] / [[GranulatorInput II]] / [[GranulatorFollow II]] trio with one instrument: load a sample, and it plays back overlapping/looping/stacked grains from it with built-in position, grain-size, LFO, and per-key modulation controls, no companion device needed for live-input capture or follow-modulation.

## What it's used for

Granular synthesis on any sample — vocals, sound-design sessions, drum-kit textures — for pads, chorused/stereo-spread grain washes, glitchy stuttering slices, and evolving ambient textures.

## FX chain notes

Used as the instrument source; often followed by a multiband glue compressor and/or reverb send to extend the granular texture, or resampled to a new audio/MIDI track once a good variation is found.

## Techniques

- **Granulate a vocal sample-pack chop, paired with an Operator sub, for a "complete the sentence" background filler** — take a vocal one-shot from a sample pack (e.g. a jungle/breaks pack), run it through Granulator 3, and layer an [[Operator]] sub underneath, then crunch the pair with [[Multiband Dynamics]] — the result works as a small background texture element that reads like it's finishing a musical phrase alongside the main parts, without competing for lead attention. → [[Operator]], [[Multiband Dynamics]] — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **A post-processing granular-delay cousin exists (unowned)** — "Granular Mirror Maze," a free Max for Live device demoed on [[Wavetable]], works as a post-processing granular-flavored delay rather than a sampler: it randomizes delay time via a Max Delay control, with a Scrub knob setting how fast that randomization happens — conceptually parallel to Granulator 3's own grain-size knob, but applied to an already-playing signal instead of a loaded sample. Worth vetting against stacking Granulator 3 after a delay send for a similar effect. → [[Plugin Wishlist]] — dnksaus, [10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso)
- **Record a live-tweaked texture pass from a consolidated foley file** — drag a batch of foley one-shots onto a dashed grid so they play back-to-back, consolidate into one file, drop it into Granulator 3 with multiband compression after it, then record a fresh audio track while turning **Variation** up, mapping a **random LFO** that differs per ear (stereo), and adjusting **Spread** live — capturing an evolving performance rather than committing to one static setting. Reinforces the existing Variation-knob and per-ear-LFO mechanics documented below from a new foley-specific workflow. → [[Ambient Texture and Field Recording]] — dnksaus, [Texturing Your Tracks in Ableton](https://www.youtube.com/watch?v=9Bab-gq4E00)
- **Three grain modes** — **Classic** overlaps grains for a consistent sustained sound; **Loop** doesn't overlap grains (this is where the Reverse chance-of-reverse-playback option lives); **Cloud** stacks multiple simultaneous grain instances (density knob) for the most sustained, pad-like result. — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Tune the sample to play as a pad, not transpose per key** — by default every key transposes the loaded sample; find the sample's real pitch with a tuner and pitch it to match if you want a static pad rather than a keyboard instrument. Add **Glide** (turn on Mono, turn up the Glide knob) for a portamento between held notes. → [[Sound Palette]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **The Variation knob + orange-highlighted parameters** — turning up Variation reveals which parameters (in orange) will randomize per grain: **Position** varies by default; add **grain size** variance for texture, **TR (transposition)** variance for a built-in chorus effect (Cloud mode only), and **Volume** variance for dynamic movement. **Spread** gives the right and left ear a different pitch for an icy stereo-widened grain cloud. → [[Randomized Rack Design]], [[Width and Stereo]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Key-modulation amount on Transpose, Filter Frequency, and Position** — clicking a knob while the dynamic modulation bar is active shows its **Key** amount: at 100% that parameter changes on every keyboard note (the default for Transpose); bring Key to 0 on Transpose and Filter Frequency to hold a fixed pitch/tone across the keyboard. **Position with Key turned up is the standout trick** — instead of transposing, each key jumps to a different point in the sample, like an ethereal, non-transient-locked version of [[Simpler]]'s Slice mode; there's no exact formula for how much Key moves Position, so vary it by ear. With Glide on, this glides *between slices* instead of between pitches — grain size controls how fast the perceived position changes as the glide runs. A great vocal-chop source. — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Note pitch-bend still transposes even with Key off** — turning Key to 0 stops per-note transposition, but the MPE tab's Note pitch-bend lane still bends pitch and can be automated (e.g. a scripted octave-down swoop); remember bending transposition also changes grain size (76.1 ms at 0 semitones, half that at +12). — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Tempo-sync grain size via the millisecond hack** — grain size has no sync option, so highlight a note value (e.g. a quarter note) in the arrangement to read its exact duration in ms (bottom-left of screen) and type that number directly into Grain Size — locks the grain rate to the grid without a sync button. — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Shape knob = grain envelope character** — the built-in modulation envelope's Shape control (default 50%) reshapes each grain's amplitude curve: in Classic mode, lower = a pointy downward-ramp grain, higher = an upward-ramp grain. A **negative Shape modulation** turns a plucky envelope shape back toward regular over the note's length; pairing that with a grain-size modulation (small → normal) reads as a natural pluck-to-sustain transition. — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Scan for auto-scrubbing + LFO for glitch texture** — **Scan** automates the read position for you (1× plays at the sample's natural rate; try ~0.25× for a slow crawl); running the built-in **LFO** on grain size and/or position at the same time as Scan gives a glitchy, evolving texture. The LFO can differ **per ear** (right/left), so position/grain-size drift independently in each channel for extra width. → [[LFO]], [[Width and Stereo]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Live-resample a drum kit's own output back into itself** — turn on Granulator's **I/O** section to resample live input straight from another playing track (source = the drum-kit track, "post effects" off) instead of a pre-recorded file — credit Nicholas Théo's channel for the trick. Pair with an [[LFO]] in **Square** mode set to resample (capture) automatically every 2 bars (skewed shape) so it keeps re-grabbing fresh material hands-off, feeding a live-generative texture layer. → [[Randomized Rack Design]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Generate drum-pattern variety, then granulate the result** — drag a batch of drum clips from the [[Sample Browser and Clips Workflow|Clips tab]] into Session View (Decap stock kits work well), select them all, open Follow Action (Shift+Tab), set to **Unlink**, quarter-note length, next-clip **Any** (random pick) with **Legato on** (so switches keep the current playback position instead of restarting) — this auto-shuffles between kit-pattern variations; feed the result into a fresh Granulator for texture. → [[Randomized Rack Design]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
- **Now MPE-capable** — Granulator 3 accepts MPE expression data directly, extending the per-note modulation options beyond the Key-amount tricks already documented above. The go-to randomization recipe for instant wildness: LFO in Random mode, Rate turned down a little, Stereo turned up (different per ear), Variation maxed, and the LFO amount maxed — reinforces the existing Scan+LFO glitch-texture recipe above from a second, independent source. → [[Randomized Rack Design]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Glue preference: Multiband Dynamics over OTT** — for gluing a granular texture, dnksaus reaches for the [[Multiband Dynamics]] multiband-compression preset before OTT, calling it "a nice glue" — a gentler alternative when [[OTT]]'s extreme up/down character is too much. → [[Multiband Dynamics]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)

## See also

- Plugins: [[Granulator II]] · [[GranulatorInput II]] · [[GranulatorFollow II]] (the older 3-device version this replaces) · [[LFO]] · [[Simpler]] · [[Multiband Dynamics]] · [[OTT]]
- Techniques: [[Randomized Rack Design]] · [[Ambient Texture and Field Recording]] · [[Sampling and Sound Selection]]
- Palette: [[TEXTURE Slot]] · [[Sound Palette]]
