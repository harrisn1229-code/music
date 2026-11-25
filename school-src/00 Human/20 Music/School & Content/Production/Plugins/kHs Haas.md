---
type: plugin
title: "kHs Haas"
category: Pan/Imaging
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# kHs Haas

![[Images/kHs Haas.png]]

**Category:** Pan/Imaging
**Vendor:** Kilohearts

## What it is

A Haas-effect snap-in creating stereo width via short (sub-40ms) delay offsets between channels.

## What it's used for

Psychoacoustic stereo widening without true stereo modulation.

## FX chain notes

Stacked late in a Snap Heap chain, for final width adjustments.

## Key Parameters

```visual-key
image: Images/kHs Haas.png
coords: Images/kHs Haas.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Delay | Short inter-channel delay that creates the Haas widening illusion | 5–35 ms widens; keep short so mono-fold stays clean |
| ② | Channel | Which channel (LEFT / RIGHT) gets delayed | Mono-check after — Haas width partially collapses in mono |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
