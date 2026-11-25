---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=uQyDT0NEfTE
channel: loner
duration: "00:09:15"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, sample-flip, vst-demo, vocal-instrument]
briefed: backlog
---

# loner - is this the best new vst for adding vocals to your melodies!?

![](https://www.youtube.com/watch?v=uQyDT0NEfTE)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=uQyDT0NEfTE)

## Synopsis

A gear-demo/build video rather than a beat-recreation breakdown: loner cooks up one sample from scratch specifically to review two new instruments Arturia sent him — **Augmented Strings** and **Augmented Voices** (named on-screen as part of "Arturia's V Collection 9," though these are Spitfire Audio's Augmented Strings/Voices line, the same instruments already logged from two earlier loner videos — see [[Plugin Wishlist]]). The title question is specifically about Augmented Voices as a vocal-sample substitute. Structure: build the harmonic/pad foundation in Augmented Strings first (chord progression with a diminished ending, a modulated pad layer, a plucky bounce line), process it (EQ, reverb, triplet delay, tape detune), then move to Augmented Voices for a big realistic choir topline, a pulsing texture layer, and a counter-melody — plus a synth bass built on Arturia's Korg MS-20 emulation. He also stumbles on and isolates a hidden texture buried inside one of the bass presets, and closes with the arrangement/drop-out structure that turns the finished loop into a sample with movement. Settings are given fairly concretely for the instrument-browsing side (preset names, scale/interval choices, quantize grid) but processing values are mostly qualitative ("bring that down a little," "make the feedback really high") — a fast narrated build video, not a settings-heavy tutorial.

## Techniques

### Augmented Strings — chord bed, pad, and bounce line
- **Interface overview: a small set of front-panel knobs (effect amount, delay, reverb) plus a "morph" control that blends between two internal layers, with a deeper Advanced page for full customization** — a hybrid instrument combining a real-string sampler layer with synth-string layers, so combining the two produces "really big strings"; also has textures, LFOs mappable to nearly everything, a built-in arpeggiator, an effects rack, and macros for deep customization once you're into preset-editing territory. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **Base chord progression from the Strings > Soft preset, then a deliberate diminished-chord ending pulled from the harmonic minor scale, with the chord's top three notes shifted up an octave for voicing.** After the main progression, one final chord is added specifically as a diminished chord (reasoned via the harmonic minor scale), then the top three notes of that chord are moved up an octave rather than leaving it in closed position — a targeted voicing move to make the ending chord read as a distinct top-line event rather than just another block chord. → [[Diminished Chords]], [[Chord Progressions]]
- **A second Augmented Strings instance, Pad presets, "City of Demons" preset, layered underneath the chord progression as a pad bed** — copied from a separate instance of the same plugin rather than a different instrument, keeping the pad and the chords in the same sonic family. → [[Sound Selection Guide]], [[Layering and Stacking]]
- **LFO1 mapped to the pad's Filter A cutoff, synced to tempo at a 1/1 rate, to make an otherwise-boring pad "pulse."** The pad on its own was "kind of boring," so an unused LFO is routed to filter cutoff and set to sync at 1/1 (once per bar) — the effect brings the high end in slowly, then filters back out, i.e. a slow tempo-locked pulse rather than a fast wobble; depth was then pulled back slightly because the initial amount read as "a little bit harsh." *(general starting point — exact depth value not given, described as "just a little bit" reduction)* → [[Modulation]], [[BED Slot]]
- **"Gentle Modulation" preset in Sketch Cassette (captioned "sketch cassette 2") added purely for vintage character on the chord/pad layer, before any EQ or delay processing runs.** → [[Plugin Wishlist]]
- **"Impetuous" preset — a plucky violin-type sound — used as a bounce/counter line, then requantized to a third-note (triplet) grid to change the feel of an otherwise "basic," static-sounding chord progression.** Explicit before/after: the progression felt too static, so a plucky violin layer was added and then its notes were snapped to third-of-a-beat (triplet) subdivisions instead of straight quantization — "that fits perfectly as to how I've imagined it." → [[Rhythm and Groove]], [[Melody Writing]]
- **Processing chain on the chord/pad layer: EQ on the low end → a reverb (name unclear in captions, described as "instruments" and a preset resembling "small sweet strings") → ValhallaDelay set to triplet timing (to match the plucky bounce line) → a tape-style detune pass via Reels' tape presets, "Excited Tape" preset.** *(the reverb plugin/preset name is garbled in the auto-captions — treated qualitatively rather than guessed)* → [[EQ]], [[Reverb]], [[ValhallaDelay]], [[Plugin Wishlist]]

### Augmented Voices — choir, texture, and counter-melody
- **Same interface/workflow as Augmented Strings (real vocal sampler layer + synth vocal layers, blendable) — used first for a big, realistic choir topline melody.** Browsed the "real choirs" preset category specifically for realism, auditioned several, picked something softer, then trimmed the phrase's tail at a specific point in the arrangement. → [[Sound Selection Guide]]
- **Shaper Box's filter preset set to "Half," applied to the choir vocal specifically to make it pulse rhythmically** — the same rhythmic-gating role Shaper Box plays elsewhere in this channel's videos (see [[Shaper]], the owned Max for Live equivalent), here applied to a real-choir sample rather than a synth pad. → [[Shaper]], [[Plugin Wishlist]]
- **A second, textural Augmented Voices sound layered as an accent, run through an "Eternity" delay (name as heard in captions, product unconfirmed) using its "broken tape player" preset, for a deliberately detuned/distorted texture.** Augmented Voices' own presets are described as frequently layered (a main sound + a more textural companion sound) — this textural companion is pulled out and used on its own as a background accent rather than doubling the main choir line. *(product identity uncertain — captions render it as "eternity delay"; no confident match to an owned or already-tracked plugin)* → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **Counter-melody built from Augmented Voices' Lead section, "hitting on the one" (rhythmically anchored to the downbeat), finished with a simple delay set really long, basic ping-pong mode, feedback pushed really high.** A distinct treatment from the choir/texture layers above — a long, heavy-feedback ping-pong delay rather than a triplet or short delay, giving the counter-melody its own washier, more sustained character. *(general starting point — no exact time/feedback numbers given)* → [[Delay]], [[Melody Writing]]

### Synth bass — Arturia's Korg MS-20 emulation
- **Arturia's Korg MS-20 V (V Collection 9), a preset chosen and pushed through an added distortion stage, as the sample's synth bass.** Reasoned on-screen purely from the source ("it's a Korg synth, there's gonna be some great basses in here"); a preset is picked and a distortion device added on top specifically "to progress the sample" as later sections strip other elements away. → `Korg MS-20` (queued, unchecked — see [[Vintage Gear Worklist]]), [[Saturation and Distortion]]
- **Discovering and isolating a hidden texture layer baked inside a bass preset.** The chosen MS-20 preset carried "a really nice texture in the background" underneath its bass content; rather than accept it bundled in, the strings/bass portion of the preset was muted/removed to expose and keep only the texture element as its own standalone layer — worth remembering that a preset's most useful part isn't always its headline sound. → [[Sampling and Sound Selection]], [[Layering and Stacking]]

### Arrangement
- **A 9-bar intro before the main section lands, followed by a subtractive drop-out structure across the loop's variations rather than adding new elements.** The main/full section is held back until after 9 bars for the intro. Once inside the main loop, movement between pattern variations comes from pulling elements OUT in sequence — bass dropped immediately, then the pad/chord strings, then the first choir vocal, then the second vocal (to make "pattern 2" distinct from pattern 1), then the bass again — rather than layering anything new in. → [[Arrangement and Song Form]]

## Routed to

- [[Plugin Wishlist]] (Spitfire Audio Augmented Strings — third reuse logged; Spitfire Audio Augmented Voices — third reuse logged; Sketch Cassette — new reuse logged; Reels — new reuse logged; ShaperBox/Cableguys — new reuse logged; new "Eternity" delay entry, name unconfirmed)
- [[ValhallaDelay]] (triplet-timed delay on the strings/pad chord layer — new technique)
- [[Shaper]] (owned Max for Live equivalent for the Shaper Box "Half" filter-pulse move on the choir vocal)
- [[Modulation]] (effect page — LFO-modulated filter cutoff pulsing a pad, synced 1/1)
- [[Delay]] (effect page — long, heavy-feedback ping-pong delay on the counter-melody)
- [[Chord Progressions]] (From videos — harmonic-minor diminished ending chord, top-three-notes-up-an-octave voicing)
- [[Rhythm and Groove]] (From videos — triplet/third-note requantize to change a melodic line's "bounce")
- [[Arrangement and Song Form]] (From videos — 9-bar intro + sequential subtractive drop-outs)
- [[Layering and Stacking]] (isolating a hidden texture buried inside a bass preset)
- [[Sound Selection Guide]] (Synths/Keys — Augmented Strings/Voices presets used; Vocals — choir + textural + counter-melody Augmented Voices roles)
- [[Vintage Gear Worklist]] (Korg MS-20 — already queued unchecked; source citation added)

## Source

- **Link:** https://www.youtube.com/watch?v=uQyDT0NEfTE
- **Channel:** loner
- **Duration:** 9:15
- **Transcript:** captions, high confidence (spoken narration over screen capture, transcribes cleanly aside from a couple of garbled plugin/preset names flagged inline above) — full transcript at [[loner - is this the best new vst for adding vocals to your melodies!? (transcript)|(transcript)]]
