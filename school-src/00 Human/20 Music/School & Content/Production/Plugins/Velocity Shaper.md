---
type: plugin
title: "Velocity Shaper"
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

# Velocity Shaper

![[Images/Velocity Shaper.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI utility that reshapes incoming note velocity values via a custom curve.

## What it's used for

Correcting or stylizing velocity response from a controller or humanizing programmed MIDI velocity.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Velocity Shaper.jpg
coords: Images/Velocity Shaper.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Curve | The velocity shape applied to the clip's notes (drag the curve, 1–127) | Compress/expand or curve the dynamics of a MIDI part |
| ② | Loop / Rotate / Division | Repeats/rotates the curve across the notes on the chosen grid | Loop a short curve for a rhythmic velocity pattern |
| ③ | Transform | Applies (bakes) the reshaped velocities into the clip | Hit Transform to commit the new velocities |

## See also

- Related: [[Velocity]] — Ableton's stock velocity-shaping MIDI device (Fixed/Add/Multiply/Compress modes)
- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
