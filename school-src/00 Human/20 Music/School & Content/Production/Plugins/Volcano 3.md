---
type: plugin
title: "Volcano 3"
category: Modulation
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Volcano 3

![[Images/Volcano 3.png]]

**Category:** Modulation
**Vendor:** FabFilter

## What it is

FabFilter's current creative filter plugin with an expanded filter-type library, new distortion modes, and a redesigned modulation system.

## What it's used for

Advanced filter sweeps, modulation-driven texture design, and transition/riser effects.

## FX chain notes

An insert effect, frequently automated or driven by its internal LFO/envelope for build-ups and drops.

## Techniques

- **Sum many band-pass filters into one spectrum-spanning sweeping wave (unowned tool, general lesson)** — the unowned paid Max for Live "Slink Filter" sums a bank of band-pass filters into a single continuous, "jump-rope"-style wave moving across the spectrum, with region-protection (e.g. keep the lows fully untouched), slope control, and built-in "physics" modulation (Gravity, Invert, Ripple, Multiply) driving the offset. Volcano 3's own multi-band-capable filter shapes plus its modulation system can approximate the same idea — layer several filter bands at different cutoffs, each driven by its own LFO/envelope at a different rate, and protect a low band by excluding it from modulation entirely. → [[Plugin Wishlist]] — dnksaus, [10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso)

## Key Parameters

```visual-key
image: Images/Volcano 3.png
coords: Images/Volcano 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Filter nodes / Routing | Up to four multimode filters (the graph nodes); Routing sets how they chain/parallel | Chain/parallel for complex filtering |
| ② | Frequency | Cutoff of the selected filter | Sweep/automate for movement |
| ③ | Peak | Resonance / emphasis at the cutoff | Resonate for character; push high for whistling |
| ④ | Drive | Saturation in the filter path | Analog grit as you push |
| ⑤ | Type / Slope / Delay | Filter type (LP/HP/BP…), steepness, and all-pass delay | Steeper slope for surgical cuts; type per source |
| ⑥ | Level | Per-filter output level (+ Add Modulation below to animate) | Balance the filters; map an LFO to cutoff for motion |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
