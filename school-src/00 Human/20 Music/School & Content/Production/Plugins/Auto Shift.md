---
type: plugin
title: "Auto Shift"
category: Pitch/Vocal
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Auto Shift

**Category:** Pitch/Vocal
**Vendor:** Ableton

## What it is

Ableton's stock pitch-correction ("autotune"-style) device, with scale-awareness — correction can quantize to the song's defined scale rather than a fixed set of semitones — plus a High/Low correction-character mode, a Smooth (correction-speed) control, and its own LFO section (vibrato, etc.).

## What it's used for

Standard pitch/tuning correction on vocals, but also — with scale-awareness on — as a scale-quantizing pitch tool for non-vocal, purely instrumental sound design (tuning a self-oscillating delay feedback loop, building chord stacks by shifting duplicated chains by scale degrees).

## FX chain notes

Inserted directly on the source needing correction/quantization — a vocal, or (in the sound-design uses below) an Echo feedback loop or a duplicated instrument chain.

## Techniques

- **Scale-quantize a self-oscillating Echo feedback loop into a melody** — feed a noise burst (e.g. from [[Vinyl Distortion]]'s Crackle) into an Echo set to Time mode with a very short delay time, Dry/Wet 100%, Feedback pushed past 100% so it self-oscillates, Modulation wave = Random with Delay Mod up (×4, Phase + Sync on, eighth notes) for a semi-melodic feedback tone — then put **Auto Shift** on the result with **scale-awareness on** and mode set to **High**, so the self-generating feedback pitch snaps to the song's actual scale instead of wandering freely. Shift the tonal center either via Echo's own delay time, or via Auto Shift shifting by **scale degrees** (rather than semitones) so any transposition stays in-key; the Feedback amount also shifts the perceived tonality. Add a touch of Auto Shift's own LFO-driven vibrato to make the result feel more "sung." → [[Echo]], [[Vinyl Distortion]], [[Randomized Rack Design]] — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Build a chord stack by duplicating chains at different scale-degree shifts** — group Auto Shift into a rack, open the Chain window, and duplicate the chain several times, setting each duplicate's shift to a different **scale degree** rather than a fixed semitone count (e.g. +2, +4, +7 — an octave — and −1 scale degrees) — the result is a chord stack that's always diatonically correct to the song's key, built without a separate chord-generator device. Map the shift amounts (and vibrato) to macros; to bring harmonies in gradually as a vocal performance builds, select all chains, distribute the chain-select ranges equally, drag them all to one end of the bar, then drag each duplicate chain's volume-ramp (white bar) so a single macro fades in more harmony layers as it's turned up. → [[Randomized Rack Design]] — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)

## See also

- Plugins: [[Echo]] · [[Vinyl Distortion]] · [[Auto-Tune Pro]]
- Effects: [[Pitch and Formant]]
- Techniques: [[Randomized Rack Design]] · [[Automation]]
