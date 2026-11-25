---
type: plugin
title: "kHs Gate"
category: Compressor/Limiter
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# kHs Gate

![[Images/kHs Gate.png]]

**Category:** Compressor/Limiter
**Vendor:** Kilohearts

## What it is

A noise-gate snap-in with adjustable threshold, attack, and release.

## What it's used for

Cleaning up noise/bleed within a modular effects chain.

## FX chain notes

Stacked early in a Snap Heap chain, before further processing.

## Key Parameters

```visual-key
image: Images/kHs Gate.png
coords: Images/kHs Gate.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Threshold | Level below which the gate closes | Set to cut noise/bleed between hits |
| ② | Range | How much the closed gate attenuates | Partial for a natural duck; full for silence |
| ③ | Tolerance | Hysteresis between the open and close thresholds | Widen to stop the gate chattering on borderline levels |
| ④ | Hold | Keeps the gate open after the signal drops | Enough to not chop tails |
| ⑤ | Attack | How fast the gate opens | Fast so transients aren't clipped |
| ⑥ | Release | How fast the gate closes | Natural but fast enough to cut noise |
| ⑦ | Look-ahead | Peeks ahead so the gate opens before the transient (toggle) | On to preserve attack on fast material |
| ⑧ | Flip | Inverts the gate into a ducker (toggle) | On to attenuate *when* signal is present |
| ⑨ | Sidechain | External sidechain source selector | Key the gate off another track |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
