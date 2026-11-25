---
type: plugin
title: "Auto-Key"
category: Utility
vendor: "Antares"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Auto-Key

![[Images/Auto-Key.png]]

**Category:** Utility
**Vendor:** Antares

## What it is

Antares' real-time key and scale detection utility that analyzes a track's tonal content and displays the detected key/scale live.

## What it's used for

Quickly identifying the key of a recording or session so downstream pitch-correction and harmony tools can be set correctly.

## FX chain notes

Placed early in a vocal chain purely for analysis/reference — it feeds key information to Auto-Tune rather than processing audio itself.

## Key Parameters

```visual-key
image: Images/Auto-Key.png
coords: Images/Auto-Key.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Key / Scale Detection | Analyzes a track and detects its key + scale | Run on the song, send the key to [[Auto-Tune Pro]] |
| ② | Send to Auto-Tune | Auto-populates Auto-Tune's key/scale | One-click accurate tuning setup |
| ③ | Reference Pitch | Detected/tuning reference (Hz) | Confirms A440 vs. off-tunings |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
