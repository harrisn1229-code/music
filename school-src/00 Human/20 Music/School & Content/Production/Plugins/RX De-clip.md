---
type: plugin
title: "RX De-clip"
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

# RX De-clip

![[Images/RX De-clip.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that reconstructs waveform peaks that were digitally clipped during recording. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Repairing overloaded/clipped recordings that can't be re-tracked.

## FX chain notes

Used as a first-pass repair tool before any further mixing processing.

## Key Parameters

```visual-key
image: Images/RX De-clip.png
coords: Images/RX De-clip.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Threshold [dB] | Level above which samples are treated as clipped (upper/lower, linkable) | Set just below the clipped ceiling |
| ② | Makeup gain [dB] | Compensates for the reduced peaks | Bring level back after reconstruction |
| ③ | Quality | Reconstruction detail (Low/Medium/High) | Higher for badly clipped material |
| ④ | Post-limiter | Catches any overshoots left by the reconstruction | Leave on to guarantee no new clipping |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
