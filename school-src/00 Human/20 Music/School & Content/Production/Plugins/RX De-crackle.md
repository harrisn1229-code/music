---
type: plugin
title: "RX De-crackle"
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

# RX De-crackle

![[Images/RX De-crackle.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that removes broadband crackle/hiss-like artifacts distinct from discrete clicks. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Cleaning up crackly, aged, or noisy source recordings.

## FX chain notes

Used early in a cleanup pass, before tonal shaping.

## Key Parameters

```visual-key
image: Images/RX De-crackle.png
coords: Images/RX De-crackle.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Quality | Detection/removal quality (Low/Medium/High) | Higher for dense vinyl crackle at the cost of CPU |
| ② | Strength | Amount of crackle removal | Enough to remove crackle without dulling transients; back off if it introduces artifacts |
| ③ | Amplitude skew | Biases removal toward louder or quieter crackle | Skew to target the surface crackle level that's audible |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
