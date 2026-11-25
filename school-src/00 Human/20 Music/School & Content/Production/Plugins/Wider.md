---
type: plugin
title: "Wider"
category: Pan/Imaging
vendor: "Polyverse Music"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Wider

![[Images/Wider.png]]

**Category:** Pan/Imaging
**Vendor:** Polyverse Music

## What it is

Polyverse's stereo widening plugin using spectral processing to widen a signal without the phase issues of simple Haas-based widening.

## What it's used for

Widening mono or narrow-stereo synths, guitars, and vocals for a bigger stereo image.

## FX chain notes

Used late in a track's chain, after EQ/compression, for final stereo-width shaping.

## Used in my chains

My **one-knob, phase-coherent widener** — mono-compatible spread that stays solid in the center (no hollow phase-flip collapse):

- **[[1 Synth Lead Track|Synth Lead Track]]** — *slot 4, width*: subtle, mono-compatible — big without leaving the center.

## Key Parameters

```visual-key
image: Images/Wider.png
coords: Images/Wider.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Width | The main width amount, shown as a percentage above the knob (100% = unprocessed). Spreads the signal while preserving mono compatibility. | Keep it subtle; the whole point is width that survives a mono fold-down. Past ~130% the centre starts to feel hollow even though it stays mono-safe. | — |
| ② | Low Bypass | Frequency below which widening is **not** applied — everything under it stays centred. Shown in Hz on the knob face. | Set it around 300–400 Hz so bass and kick stay mono and locked while the top half widens. This is the control that keeps a widener from wrecking your low end — see [[Stereo Field]]. | — |
| ③ | Mono | Collapses the output to mono — a built-in mono-check button. | Use it as the A/B: hit Mono and confirm nothing disappears. Faster than reaching for a Utility just to check. | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
