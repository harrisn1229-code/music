---
type: plugin
title: "RX Repair Assistant"
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

# RX Repair Assistant

![[Images/RX Repair Assistant.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that automatically analyzes a recording and suggests/applies a chain of repair modules to fix detected issues. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Fast first-pass automated cleanup on a problematic recording before manual fine-tuning.

## FX chain notes

Used as the first step in an audio repair workflow.

## Key Parameters

```visual-key
image: Images/RX Repair Assistant.png
coords: Images/RX Repair Assistant.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Voice / Music + Learn | Pick the source profile, then Learn to analyze the audio and set the modules | Play a representative section so it profiles the problems |
| ② | Clean Up (De-noise / De-reverb / De-hum / De-click) | The noise-removal module cluster | Dial De-noise/De-reverb to taste; toggle De-hum/De-click as needed |
| ③ | Tone (Tone / Tilt-Scoop / Lo-cut / Hi-cut) | Tonal balancing of the cleaned signal | Tilt to brighten/darken; Lo-cut to drop rumble |
| ④ | De-ess (Shaping / Threshold / Fast-Slow) | Sibilance control | Set Threshold on the S's; Fast for quick sibilants |
| ⑤ | De-clip (Threshold / Output Gain / Limiter) | Repairs clipped peaks with a safety limiter | Set Threshold below the clipped ceiling; leave Limiter on |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
