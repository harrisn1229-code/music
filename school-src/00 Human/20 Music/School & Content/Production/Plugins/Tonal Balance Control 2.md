---
type: plugin
title: "Tonal Balance Control 2"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Tonal Balance Control 2

![[Images/Tonal Balance Control 2.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

iZotope's cross-plugin reference tool that displays a track or master's spectral balance against genre-target curves, syncing with other iZotope plugins.

## What it's used for

Checking a mix or master's tonal balance against reference curves for a target genre.

## FX chain notes

Used as an analysis-only tool alongside Ozone/Neutron on the master bus — it doesn't process audio itself.

## Used in my chains

A **reference/metering tool** (no audio processing, no chain settings) — shows the mix's spectral balance against genre target curves so tonal decisions aren't guesswork:

- **[[Master Chain]]** — the tonal-balance reference (the owned half of the Gullfoss-replacement pair: TBC2 + [[Pro-Q 4]] cover the tonal-balance side, [[Soothe2]] the dynamic-unmask side). Check the low/mid/high balance against a target curve; make the actual moves on Pro-Q/Ozone.

## Key Parameters

```visual-key
image: Images/Tonal Balance Control 2.png
coords: Images/Tonal Balance Control 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

Read-only reference — you *watch* it and act elsewhere:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Target Curve | The genre reference the mix is compared against | Pick a target matching the song's genre (or load a custom from a reference track) | — |
| ② | Balance Meter (Low/Mid/High) | Shows how the mix sits vs. the target in broad bands | If a band reads outside the range, fix it on [[Pro-Q 4]]/[[Ozone 9 Maximizer]] | — |
| ③ | Crest / Dynamics readout | Shows how dynamic vs. crushed the mix is | Use to catch over-limiting before it's baked in | — |
| ④ | Custom Target | Build a target from your own reference tracks | Drag in 3–4 references you love to make a personal target | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
