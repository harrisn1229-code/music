---
type: plugin
title: "Ghz Good Dither 3"
category: Utility
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ghz Good Dither 3

![[Images/Ghz Good Dither 3.png]]

**Category:** Utility
**Vendor:** Goodhertz

## What it is

Goodhertz's dithering plugin, applying noise-shaped dither when reducing bit depth (e.g. 24-bit to 16-bit) to minimize quantization artifacts.

## What it's used for

Correct bit-depth reduction at the final export/bounce stage of mastering.

## FX chain notes

The absolute last device in the master chain, after the limiter, only engaged on final bit-depth-reducing export.

## Key Parameters

```visual-key
image: Images/Ghz Good Dither 3.png
coords: Images/Ghz Good Dither 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Dither Type | The dither algorithm applied at bit-depth reduction | Use on the final export stage only |
| ② | Noise Shaping | Shapes the dither noise out of audible bands | More shaping for perceptually quieter noise |
| ③ | Bit Depth | Target bit depth | Match your export format (e.g. 16-bit) |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
