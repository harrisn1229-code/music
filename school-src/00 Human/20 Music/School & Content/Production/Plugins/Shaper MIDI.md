---
type: plugin
title: "Shaper MIDI"
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

# Shaper MIDI

![[Images/Shaper MIDI.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A MIDI-domain variant of Shaper, applying a drawn modulation shape to MIDI-mapped parameters.

## What it's used for

Custom modulation curves applied to MIDI-controlled parameters (e.g. CC automation shapes).

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Shaper MIDI.jpg
coords: Images/Shaper MIDI.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Curve | Draw the MIDI modulation shape (with preset shapes, Grid, Snap) | Shape a MIDI CC/parameter over time |
| ② | Map (Target) | Assigns the shape to a MIDI CC / parameter | Map to expression/mod destinations |
| ③ | Rate / Sync | Playback speed — tempo-synced (1/4…) or free (ms) | Sync to tempo |
| ④ | Depth | Modulation amount applied to the target | Scale how far the shape moves the value |
| ⑤ | Velocity / Offset | Velocity scaling of the shape + a value offset | Offset to bias the center; Velocity for dynamics-linked depth |
| ⑥ | Jitter / Smooth | Randomize + smooth the shape | Smooth to round hard corners; Jitter for organic variation |
| ⑦ | Echo (Time) | Echoes/repeats the shape at the set Time | Add echoes for cascading modulation gestures |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
