---
type: plugin
title: "jo.Oscilloscope"
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

# jo.Oscilloscope

![[Images/jo.Oscilloscope.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live metering device (by Max/MSP developer 'jo') that displays a real-time oscilloscope view of the audio waveform.

## What it's used for

Visually inspecting waveform shape, clipping, and phase behavior during mixing.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/jo.Oscilloscope.jpg
coords: Images/jo.Oscilloscope.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Waveform display | The oscilloscope view of the audio over time | Visual check of shape/phase — a meter, not a processor |
| ② | Buffer / Gain | Zoom of the display — time window + amplitude scale | Adjust to read individual transients or full cycles |
| ③ | Trigger Mode | How the scope syncs/holds the waveform (Off / …) | Trigger for a stable, standing waveform |
| ④ | Expand | Enlarges the display | Expand for a bigger, easier-to-read scope |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
