---
type: plugin
title: "SurferEQ"
category: EQ
vendor: "Sound Radix"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-21
---

# SurferEQ

![[Images/SurferEQ.png]]
*Vendor's current UI (SurferEQ 2 shown — SurferEQ's interface is nearly identical).*

**Category:** EQ
**Vendor:** Sound Radix

## What it is

Sound Radix's pitch-tracking EQ, moving EQ bands dynamically with a signal's detected pitch rather than staying at fixed frequencies.

## What it's used for

EQ moves that need to follow a vocal or instrument's pitch (e.g. controlling a resonant harmonic that moves with the melody).

## FX chain notes

Used as a specialized EQ stage where standard static EQ can't track pitch-dependent problems.

## Key Parameters

```visual-key
image: Images/SurferEQ.png
coords: Images/SurferEQ.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Pitch Track | Follows the source's fundamental pitch | EQ bands move WITH the note — relative harmonic EQ |
| ② | Bands (harmonic-relative) | Bands set relative to the tracked pitch | Boost the 3rd harmonic across every note consistently |
| ③ | Bass Mono / Formant | Low-end + formant options | Keep the low band coherent as pitch moves |
| ④ | Mix | Blend | Dynamic, musical tone-shaping that static EQ can't do |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
