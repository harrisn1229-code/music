---
type: plugin
title: "MIDI Monitor"
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

# MIDI Monitor

![[Images/MIDI Monitor.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI utility that displays incoming MIDI data (notes, CCs, velocity) for debugging and monitoring.

## What it's used for

Troubleshooting MIDI routing and controller mapping issues during setup.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/MIDI Monitor.jpg
coords: Images/MIDI Monitor.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | MIDI readout | Note / Root / Chord / Velocity of the incoming MIDI | Read the exact note names and chord being played |
| ② | Keyboard display | Visualizes the currently held notes | Glance at what's held without watching the piano roll |
| ③ | Message filters | Which message types are shown (Note pitch / CC / Pitchbend / Aftertouch / SysEx) | Filter to just CC to debug a controller mapping |
| ④ | View tabs (Note / Flow / MPE) | How the MIDI data is displayed | MPE view to confirm per-note expression is coming through |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
