---
type: plugin
title: "S1 Imager"
category: Pan/Imaging
vendor: "Waves"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# S1 Imager

![[Images/S1 Imager.png]]

**Category:** Pan/Imaging
**Vendor:** Waves

## What it is

Waves' stereo imaging plugin (from the StudioRack S1 series) for adjusting stereo width and correcting mono compatibility.

## What it's used for

Adjusting the perceived stereo width of a track or bus.

## FX chain notes

Used late in a chain, after EQ/compression, for final stereo-width shaping.

## Used in my chains

My **stereo widener** on high-frequency groups — top percussion/backing vocals where width is cheap and safe (no low-end mono risk):

- **[[2 Drums Hats Group|Drums Hats Group]]** — *slot 3, width*: slight widen — top percussion is where width is cheap and safe.
- **[[2 Backup Vocals Group|Backup Vocals Group]]** — *slot 3, width*: slight width increase, **check mono compatibility**.

## Key Parameters

```visual-key
image: Images/S1 Imager.png
coords: Images/S1 Imager.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①②③⑤ only — ④ Shuffle isn't on this plugin. Bass shuffling lives in the separate [[S1 Shuffler]], not the Imager.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Width | Amount of stereo widening (rotation of the stereo field) | Small increase on top-percussion/BGV groups; watch the correlation meter | — |
| ② | Rotation | Rotates the stereo image left/right | Nudge to re-center a lopsided group | — |
| ③ | Asymmetry | Adjusts L/R balance of the widening | Fix an uneven stereo source before widening | — |
| ④ | Shuffle (bass) | Frequency-dependent widening (keeps lows narrower) | Keep low frequencies mono while widening the top | — |
| ⑤ | Output | Makeup level | Level-match; always mono-check after widening | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
