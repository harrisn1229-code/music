---
type: plugin
title: "RX Spectral De-noise"
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

# RX Spectral De-noise

![[Images/RX Spectral De-noise.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module offering detailed spectral-domain noise reduction with manual noise-profile learning. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Removing broadband background noise (hiss, room tone, hum) from a recording with precise spectral control.

## FX chain notes

Used early in a cleanup chain, before tonal/dynamics processing.

## Key Parameters

```visual-key
image: Images/RX Spectral De-noise.png
coords: Images/RX Spectral De-noise.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Learn (Noise Profile) | Learns the fingerprint of the noise to subtract | Learn on a silent section of pure noise first |
| ② | Threshold | Signal-vs-noise decision point | Nudge so quiet detail survives |
| ③ | Reduction (dB) | Amount of noise removed | Moderate — too much = watery artifacts |
| ④ | Adaptive mode | Continuously re-learns the noise (no manual Learn) | On for varied/changing noise floors |
| ⑤ | Quality (Fast → Best) | Processing algorithm A/B/C/D | Best/D for a final pass; Fast while auditioning |
| ⑥ | Artifact control (Musical noise / Gating) | Tames the two main de-noise artifacts | Toward Gating to kill musical-noise 'birdies' |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
