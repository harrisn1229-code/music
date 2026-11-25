---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=YSR6P2G5GvY
channel: You Suck at Producing
duration: "00:18:56"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: captions
transcript_confidence: high — clean, coherently-timed captions; a couple of bass-preset names ("car start", "glonk") are best-guess spellings
tags: [yt-note, music, production, mixing, gain-staging, referencing, eq, clipping, loudness]
---

# You Suck at Mixing: The Ultimate Guide

![](https://www.youtube.com/watch?v=YSR6P2G5GvY)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=YSR6P2G5GvY)

## Synopsis
A full start-to-finish mixdown walkthrough on Underbelly's own track "Get Too Close" — the most comprehensive video in this batch. Covers stem-prep and export (drum rack chain extraction, normalize-on-export and why it forces a relevel), building a mix from silence by bringing tracks in order of importance, a free MIDI-triggered sidechain device (Duck Buddy), loudness-matched reference-track comparison via LUFS, drum-bus glue (multiband compression + a saturator squasher), a "cut low end from everything that doesn't need it" EQ pass, checking sub consistency across different bass patches on a spectrum analyzer, a quick vocal-chain rundown, and a full mastering chain built from a saturator/clipper (New Fangled Saturate) instead of a limiter, finishing with routing references to External Out so they don't get double-mastered during the final A/B, and dither on export. Dense and practical — this is the closest thing in the batch to a single "whole mixing workflow in one video" reference.

## Techniques
- **Bounce to a fresh project file to force commitment** — Save As a "-premix" copy, rename/clean tracks, ungroup drum racks (consolidate the MIDI with Cmd/Ctrl-J, delete reactivated-on-extract deactivated notes, then right-click each drum sound → Extract Chains one at a time — no batch option), then Export Audio/Video with render track set to All Individual Tracks, Normalize on. Normalize maximizes each stem's level (makes clicks/pops easier to spot) but destroys the mix's relative volumes — expect to rebuild levels from scratch on the other side. → [[Gain Staging]]
- **Build the mix up from silence, in priority order** — select all tracks, pull every fader to −∞, then bring elements in one at a time starting with the kick (~−12 dB as a first guess), then next-most-important (clap), then hi-hats/loops — go by ear/gut for anything without an obvious reference point. → [[Gain Staging]]
- **Duck Buddy (free Max for Live): MIDI-note sidechain, not audio-detected** — unlike a normal compressor, it doesn't listen to the kick's audio at all; it reads the kick track's MIDI notes and applies a pre-built volume-duck curve to whatever track it's on. Route: drag the original kick MIDI into the mix session as a muted "Sidechain Input" track, group everything else into "Not Drums," and put Duck Buddy on that group fed from the Sidechain Input. → [[Plugin Wishlist]]
- **Loudness-match 2-3 reference tracks by Integrated LUFS before comparing anything** — meter the mix's drop (here ~−10 LUFS-I), then pull each reference's fader down until it reads the same, so A/B judgments aren't just "louder wins." Listen for punch/brightness first — here the references were both punchier on the kick and had noticeably more top-end air than the rough mix. → [[Referencing and Translation]]
- **Route the references to External Out before final loudness comparisons** — once your own mastering chain is built out on the master, playing references through Main would double-master them (they're already mastered, then re-run through your clipper/limiter); switching their output to External Out still sends them to the monitors but bypasses the master chain, keeping the final loudness A/B honest. → [[Referencing and Translation]]
- **Drum-bus glue: multiband compressor, matched by ear, then a saturator squash** — multiband compression on the drum group tames each band independently (drag the band's gain handle down to reduce it, or back to the original "orange tip" level to preserve a hit you don't want touched); level-match on/off by pulling output down until the on/off comparison isn't just "louder." Follow with a saturator on the Digital Clip setting, drive and output set as *opposites* of each other so it isn't adding level — just crunch and reduced peaks, banking headroom for a louder master later. → [[Compression]], [[Clipping and Loudness]]
- **Cut low end from every track that doesn't need it** — called out as one of the favorite/most effective mixing moves: put EQ Eight on hi-hats, room mics, and secondary snares and cut whatever low-end bump shows up (switching the filter curve to the steeper "X4" type for precision) — cleans the whole mix and lets the bass read more clearly. → [[EQ]], [[Masking and Carving]]
- **Check sub consistency across different bass patches on a spectrum analyzer** — add a spectrum to the main bus, freeze the auto-resize (press Play, click Auto bottom-left) and zoom into the low end with the blue range sliders; hover a bump to read its frequency/note. Compare against the references' sub level for genre-appropriate weight, and level-match different bass patches within the same song against each other (e.g. one preset reading louder in the sub than the next) so the low end doesn't dip when the patch changes. → [[EQ]], [[Referencing and Translation]]
- **Vocal chain, quick-reference order** — gate (kill quiet noise) → EQ (cut low end) → Auto-Shift/pitch correction → formant automated up/down for a pitch effect → a free LA-2A emulation → Ableton's stock Compressor on default settings → OTT (further squash) → Valhalla Shimmer automated in on buildups, plus an occasional Shifter-created pitched-up double and automated Echo. A rundown, not a deep-dive on any one stage.
- **Mastering chain built from a saturator/clipper instead of a limiter** — New Fangled Saturate's clip shape switched from Soft to Hard; the meter's red line shows how much is being shaved off the peaks. The Auto toggle auto-gain-matches so you can judge Drive honestly (with Auto on, more drive ≠ louder, so you can hear if it's actually distorting); push Drive as hard as possible without crossing into audible distortion, then flip Auto off to hear the real loudness gained. → [[Clipping and Loudness]]
- **Dither on the final bounce, not before** — add dither only on the final master export (24-bit here); it's very quiet white noise that masks digital artifacts from the bit-depth reduction. → [[Clipping and Loudness]]

## Routed to
- [[Gain Staging]] — added the "-inf up, priority order" build-from-silence bullet and the normalize-destroys-relative-levels stem-export note
- [[Referencing and Translation]] — added LUFS-matching 3 references + the External Out double-mastering-avoidance routing trick
- [[EQ]] — added the "cut low end from everything that doesn't need it" pass and the spectrum-analyzer sub-consistency check
- [[Compression]] — added the multiband-glue + saturator-squash drum-bus combo
- [[Clipping and Loudness]] — added the saturator/clipper mastering-chain workflow (Drive/Auto toggle, hard clip shape) and the dither-on-final-bounce note
- [[Plugin Wishlist]] — added Duck Buddy (free M4L MIDI-note sidechain) and New Fangled Saturate (mastering saturator/clipper) under "From videos (to vet)"

## Source
[You Suck at Mixing: The Ultimate Guide](https://www.youtube.com/watch?v=YSR6P2G5GvY) · You Suck at Producing · 00:18:56 · captions (high) · transcript: [[You Suck at Mixing: The Ultimate Guide (transcript)]]
