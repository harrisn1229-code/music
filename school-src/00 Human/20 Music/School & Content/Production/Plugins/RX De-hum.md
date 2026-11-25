---
type: plugin
title: "RX De-hum"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# RX De-hum

![[Images/RX De-hum.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that detects and removes electrical hum (50/60Hz and harmonics) from a recording. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Removing ground-loop or electrical hum picked up during a recording session.

## FX chain notes

Used early in a cleanup chain, before EQ/compression.

## Key Parameters

```visual-key
image: Images/RX De-hum.png
coords: Images/RX De-hum.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Learn / Adaptive mode | Analyzes the audio to find the hum fundamental + harmonics automatically; Adaptive keeps tracking it | Click Learn over a hum-only section; Adaptive for hum that drifts |
| ② | Filter type (Dynamic / Static) | Adaptive tracking notches vs. fixed static notches | Dynamic for varying hum; Static for a rock-steady mains buzz |
| ③ | Sensitivity | How aggressively hum is detected and removed | Enough to kill hum without notching tone |
| ④ | Bands | Number of harmonic notches applied | More bands for buzzy, harmonic-rich hum |
| ⑤ | Filter Q | Width/sharpness of each notch | Higher Q for narrower, more surgical notches |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
