---
type: plugin
title: "kHs Pitch Shifter"
category: Pitch/Vocal
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# kHs Pitch Shifter

![[Images/kHs Pitch Shifter.png]]

**Category:** Pitch/Vocal
**Vendor:** Kilohearts

## What it is

A real-time pitch-shifting snap-in for transposing a signal without changing tempo.

## What it's used for

Harmonizing, octave-doubling, or creative pitch effects within a modular chain.

## FX chain notes

Stacked in a Snap Heap chain, often combined with a delay for pitch-shifted echo effects.

## Techniques

- **Owned equivalent for an octave-up pitch shift on a fully-wet textural chain (captioned "Waves... Sound Shifter" — read as Waves SoundShifter, unowned, see [[Plugin Wishlist]]).** Stage 2 of a 6-stage "Sparkle" macro chain built to replicate hardware guitar-pedal texture without owning the pedal: tape-echo → **pitch shift +1 octave** → Portal (granular texture) → chorus → half-time → low-pass EQ. Pitch = +12 semitones covers the octave move; on this plugin, Mix stays full-wet (no dry blend) to match the source chain, which drops the dry signal entirely for this pass. → [[Portal]], [[Pitch and Formant]], [[Sparkle Texture Rack]] — loner, [this secret plugin will change the way you process your melodies!?](https://www.youtube.com/watch?v=xwuodd40bug)

## Key Parameters

```visual-key
image: Images/kHs Pitch Shifter.png
coords: Images/kHs Pitch Shifter.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Pitch | Transposition — the ± readout (semitones/cents) | +12/−12 for octaves; small cents for detune |
| ② | Jitter | Randomizes grain timing | Add to smear/soften grain artifacts, or for texture |
| ③ | Grain Size | Size of the grains used for shifting | Smaller for tighter transients; larger for smoother tone |
| ④ | Mix | Dry/wet blend | Blend for detune thickening; full for a harmony |
| ⑤ | Correlate | Links L/R grain processing (toggle) | On for a coherent stereo shift; off for a wider, looser one |
| ⑥ | Compensation | Latency/quality compensation mode (LOW / …) | Higher for fewer artifacts at the cost of latency |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
