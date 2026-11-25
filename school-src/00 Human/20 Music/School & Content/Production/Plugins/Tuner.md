---
type: plugin
title: "Tuner"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-08-01
---

# Tuner

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock tuning-display utility — an audio effect that analyzes a monophonic input in real time and shows the detected pitch/note name, normally used to tune a live instrument (guitar, bass, vocals) while recording.

## What it's used for

Its usual job is visual instrument tuning during tracking, but it's just as useful **read-only, mid-arrangement**: drop it on any track carrying a monophonic tonal part to find out exactly what note is sounding at a given moment — no ear-training or manual pitch-guessing required. Distinct from [[Auto-Key]], which analyzes a whole recording's overall key/scale for downstream pitch-correction; Tuner reads a single note at a single instant.

## FX chain notes

Inserted temporarily on the track being checked (a synth loop, a bass part) purely for its readout — not part of the permanent signal chain. Pull it back off once the note has been confirmed.

## Techniques

- **Find a loop's root note by reading the Tuner off its first downbeat, then use the same check on a clashing part to diagnose a key mismatch.** Add Tuner to the track carrying a loop's dominant tonal element and read the note it displays right on the phrase's first downbeat — that's the loop's practical root note. Add Tuner to a part that sounds wrong against it (a bass line, a second synth) to read what note IT is actually hitting; a mismatch between the two readouts is the actual bug, not a mixing or sound-design problem. Once the mismatched part's real root is confirmed this way, retune it with its instrument's **Transpose** knob (see [[Simpler]]) to match. → [[Bassline Writing]] — You Suck at Producing, [How to Drop the Bass](https://www.youtube.com/watch?v=RWWmu8Hw5zU)

## See also

- Plugins: [[Auto-Key]] (whole-recording key/scale detection, vs. this device's single-note readout) · [[Simpler]] · [[Sampler]]
- Techniques: [[Bassline Writing]]
- Theory: `Scales.md` · `Keys.md`
