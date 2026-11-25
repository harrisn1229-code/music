---
type: plugin
title: "Mix Matcher"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Mix Matcher

![[Images/Mix Matcher.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live reference/analysis device that compares the current mix against a reference track's tonal balance/level.

## What it's used for

A/B'ing a mix-in-progress against a reference commercial track for tonal and loudness matching.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Mix Matcher.jpg
coords: Images/Mix Matcher.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | A / B inputs | Pick the two signals to compare (your mix vs. a reference track) | Route a track you love into B, your mix into A |
| ② | Match | Level-matches the two so the comparison is fair | Match first so louder ≠ "better" |
| ③ | Pink reference | Overlays a pink-noise / target tilt curve to aim at | Aim your mix's average tilt at the pink slope |
| ④ | Spectrum graph | The frequency-response comparison display | Read where your mix is darker/brighter than the reference |
| ⑤ | Graph settings | Freeze, Scale X (Log/Lin), Line Width, Smoothing | Freeze a reference curve; smooth for a readable average |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
