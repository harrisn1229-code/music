---
type: plugin
title: "MMultiAnalyzer"
category: Utility
vendor: "MeldaProduction"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# MMultiAnalyzer

![[Images/MMultiAnalyzer.jpg]]

**Category:** Utility
**Vendor:** MeldaProduction

## What it is

MeldaProduction's multi-mode spectral analyzer offering spectrogram, spectrum, and loudness analysis views in one plugin.

## What it's used for

Detailed spectral and loudness analysis during mixing and mastering.

## FX chain notes

Used as an analysis-only tool on any bus — it doesn't process the signal.

## Key Parameters

```visual-key
image: Images/MMultiAnalyzer.jpg
coords: Images/MMultiAnalyzer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | View tabs | Analysis view — Spectrum / Sonogram / Collisions / Loudness & Wave / Stereo / Oscilloscope | Pick the view for the job — Spectrum for tone, Sonogram over time |
| ② | Analysis controls | Averaging / Resolution / Slope / Gain — how the spectrum is measured and tilted | Set Slope +3–4.5 dB/oct so a full mix reads roughly flat |
| ③ | Tracks | The multi-instance list — every MMultiAnalyzer instance overlays its spectrum here | Drop an instance on each track to compare them on one graph |
| ④ | This Instance | Name / colour label for this instance's curve | Name and colour-code each track so the overlay is readable |
| ⑤ | Collisions | Highlights where two tracks mask each other in the same band | Find the fight, then EQ-carve on the actual track |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
