---
type: plugin
title: "RX De-click"
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

# RX De-click

![[Images/RX De-click.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that detects and removes clicks and pops from a recording (vinyl noise, mouth clicks, digital glitches). Owned in both the RX 10 and RX 11 suites.

## What it's used for

Cleaning up clicks/pops from vinyl-sourced samples, vocal mouth clicks, or glitchy recordings.

## FX chain notes

Used early in a cleanup chain, before tonal/dynamics processing.

## Key Parameters

```visual-key
image: Images/RX De-click.png
coords: Images/RX De-click.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Algorithm | Click-detection method (Single-band / Multi-band) | Multi-band for dense or musical clicks; Single-band for isolated ones |
| ② | Sensitivity | Click-detection threshold | Higher to catch more clicks; watch for artifacts |
| ③ | Frequency skew | Biases detection toward low (LF) or high (HF) clicks | Skew HF for mouth/edit clicks; LF for thumps |
| ④ | Click widening [ms] | How wide each detected click is treated | Wider for longer clicks/pops |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
