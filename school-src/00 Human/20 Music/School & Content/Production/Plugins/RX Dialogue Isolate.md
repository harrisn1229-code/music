---
type: plugin
title: "RX Dialogue Isolate"
category: Pitch/Vocal
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# RX Dialogue Isolate

![[Images/RX Dialogue Isolate.png]]

**Category:** Pitch/Vocal
**Vendor:** iZotope

## What it is

An RX 11 module using source-separation AI to isolate spoken dialogue from background noise/music. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Extracting clean dialogue from a noisy or music-bed-heavy recording.

## FX chain notes

Used as a source-separation repair stage before further vocal processing.

## Key Parameters

```visual-key
image: Images/RX Dialogue Isolate.png
coords: Images/RX Dialogue Isolate.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Voice / Reverb / Noise | Level of each AI-separated component | Voice up, Noise down; keep a little Reverb so it doesn't sound gated |
| ② | Sensitivity | How strongly speech is separated from the rest | Higher isolates more but risks artifacts |
| ③ | Quality | Separation quality (Good/Real-time → higher offline modes) | Real-time to audition; a higher mode for the final render |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
