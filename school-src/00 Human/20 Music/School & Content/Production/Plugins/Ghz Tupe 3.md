---
type: plugin
title: "Ghz Tupe 3"
category: Drive/Color
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Ghz Tupe 3

![[Images/Ghz Tupe 3.png]]

**Category:** Drive/Color
**Vendor:** Goodhertz

## What it is

Goodhertz's tape-emulation plugin (Tupe), modeling analog tape saturation, wow/flutter, and compression character.

## What it's used for

Adding analog tape warmth and gentle compression/saturation to tracks or busses.

## FX chain notes

A coloration stage, often near the end of a bus chain to 'glue' the sound with tape-style character.

## Used in my chains

My **tube-warmth** stage — restores "pushed amp / analog" harmonics that clean DIs and VST sources miss. Always low-ish drive, placed *before* the compressor so the comp glues the colored tone:

- **[[3 Bass Bus|Bass Bus]]** — *slot 1, warmth*: Tube 15%, Tilt neutral, Mix 100% — one coat of harmonics so the low end translates on small speakers.
- **[[1 Electric Piano Track|Electric Piano Track]]** — *slot 3, tube drive*: Tube 30% (push to 50% for bark on funky parts) — a Rhodes' character comes from overdriving its amp.
- **[[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]** — *slot 4, tube color*: Tube 30%, output matched to input — restores pushed-amp harmonics after corrective cleanup.
- **[[1 Electric Guitar DI Track|Electric Guitar DI Track]]** — *slot 3, tube glue*: Tube 20% — the owned "CLA Guitars" first-aid for thin DIs (this + 1073 drive).

## Key Parameters

```visual-key
image: Images/Ghz Tupe 3.png
coords: Images/Ghz Tupe 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ② Tilt carries no badge — it lives in the **FILTER** panel, which is collapsed in this capture.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Tube (Drive) | Amount of signal driven into the modeled tube stage — more = more harmonic saturation + soft compression | 15–20% for warmth/glue; 30–50% for audible "pushed amp" bark | — |
| ② | Tilt | Broadband tilt EQ (dark ↔ bright) around a pivot frequency | Tilt slightly bright to keep saturation from dulling the top; dark to tame a harsh source | — |
| ③ | Bias | Asymmetry of the tube stage — shifts the even/odd harmonic balance (warmth vs. edge) | More bias for thicker even-harmonic warmth; less for a cleaner, odd-harmonic edge | — |
| ④ | Mix | Dry/wet blend of the saturated signal (parallel saturation) | Keep 100% for a light insert coat; blend down to preserve transients on percussive sources | — |
| ⑤ | Output | Makeup level after the tube stage | Match output to input so the A/B is about color, not loudness | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
