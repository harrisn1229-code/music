---
type: plugin
title: "kHs Shaper"
category: Drive/Color
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# kHs Shaper

![[Images/kHs Shaper.png]]

**Category:** Drive/Color
**Vendor:** Kilohearts

## What it is

A general waveshaping distortion snap-in with a drawable/adjustable transfer curve.

## What it's used for

Custom-shaped harmonic distortion and saturation character.

## FX chain notes

Stacked in a Snap Heap chain, typically after EQ.

## Key Parameters

```visual-key
image: Images/kHs Shaper.png
coords: Images/kHs Shaper.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Shape (Curve) | The waveshaping transfer curve — preset selector ("Default") and editable in the graph above | Choose/adjust the curve for soft-clip vs. hard character |
| ② | Drive | Input gain into the waveshaper | More drive = more harmonics/distortion |
| ③ | DC Filter | Removes DC offset from the output (toggle) | Leave on to keep the output centered after shaping |
| ④ | Mix | Dry/wet blend | Parallel for controlled saturation |
| ⑤ | Overflow | What happens when the signal exceeds the curve range (HOLD / wrap / fold) | Fold/wrap for aggressive digital character; Hold to clamp |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
