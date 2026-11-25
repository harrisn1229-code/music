---
type: plugin
title: "Corrosion"
category: Drive/Color
vendor: "HoRNet"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Corrosion

![[Images/Corrosion.png]]

**Category:** Drive/Color
**Vendor:** HoRNet

## What it is

HoRNet's multiband/algorithmic saturation and distortion plugin offering multiple distortion algorithms with per-band control.

## What it's used for

Adding harmonic saturation or aggressive distortion to specific frequency ranges of a track or bus.

## FX chain notes

Placed after EQ, shaping harmonic content by band before compression/limiting.

## Key Parameters

```visual-key
image: Images/Corrosion.png
coords: Images/Corrosion.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Source | What the plugin generates — **Noise** and other source types. | Corrosion isn't a distortion: it *generates* a signal and shapes it against your track. Pick the source first. | — |
| ② | Amount | How much of the generated signal is blended in. | This is the wet control. Small amounts add a noise floor / texture bed under a part. | — |
| ③ | Freq / Q / Type | The filter shaping the generated source — frequency, resonance, and shape (Band Pass and others). | Band Pass with a narrow Q turns broadband noise into a pitched hiss you can tune to the track. | — |
| ④ | Track Pitch | Makes the filter **follow the incoming signal's pitch**. | The interesting one — the noise tracks the part instead of sitting at a fixed frequency, so it reads as part of the sound rather than layered over it. | — |
| ⑤ | Analog | Analog-modelling toggle. | On for a softer, less digital noise character. | — |
| ⑥ | Input / Output | Levels in and out. | — | — |

> **Not on this panel:** the earlier table listed **Drive**, **Bands/Crossovers** and **Algorithm**. None exist here — that description belonged to a multiband distortion, which this isn't.

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
