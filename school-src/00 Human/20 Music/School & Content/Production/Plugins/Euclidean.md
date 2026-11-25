---
type: plugin
title: "Euclidean"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Euclidean

![[Images/Euclidean.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI effect that generates Euclidean rhythm patterns (evenly-distributed hit patterns) to drive an instrument or drum rack.

## What it's used for

Generating polyrhythmic, evenly-spaced rhythm patterns for drums and percussion without hand-programming every step.

## FX chain notes

Sits before the instrument/drum rack in the MIDI chain, generating the rhythmic trigger pattern.

## Key Parameters

```visual-key
image: Images/Euclidean.jpg
coords: Images/Euclidean.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Rotation (per channel) | Rotates the pattern, shifting where the hits fall | Rotate for groove variations between the channels |
| ② | Events (per channel) | Number of active hits spread evenly across the steps (the Euclidean rhythm) | More events for a busier line; few for a sparse pulse |
| ③ | Steps (per channel) | Total steps in the pattern | Different step counts per channel = polyrhythms |
| ④ | Circular display | Polyrhythm visualization of the four channels together | Watch how the layered patterns interlock |
| ⑤ | Key / Vel (per channel) | The note + velocity each channel outputs | Set each channel to a drum note or a melodic pitch |
| ⑥ | Playback / Rate (16n · :2 · x2 · Triplets · Re-Sync) | Timing and sync of the sequencer | ×2 for double-time; Triplets for swung grids; Re-Sync to realign |
| ⑦ | Presets | Save/recall pattern banks | Store variations and switch them live |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
