---
type: plugin
title: "Ghz Midside 3"
category: Pan/Imaging
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Ghz Midside 3

![[Images/Ghz Midside 3.png]]

**Category:** Pan/Imaging
**Vendor:** Goodhertz

## What it is

Goodhertz's Mid/Side plugin, splitting a stereo signal into mid and side components for independent processing.

## What it's used for

Independent EQ/dynamics processing of the center vs the stereo-width content of a mix or master.

## FX chain notes

Used to feed mid/side-specific EQ or compression, typically on a mix or master bus.

## Techniques

- **Widening pass on the third layer of a 3-layer "fake sample" Rhodes chord bed, specifically "for more depth."** Building a from-scratch Bryson Tiller-style '90s R&B chord progression: a second, separate Lounge Lizard Rhodes instance (on top of an already-processed main Rhodes layer and a Wurlitzer V2 layer) runs EQ → **mid-sides** — "makes it wider" — with the same chord pattern transposed to each different key of the progression. → [[Width and Stereo]], [[BED Slot]], [[Bryson Tiller Fake-Sample Chord Bed Chain]] — loner, [how to make smooth rnb beats for bryson tiller from scratch (no samples)](https://www.youtube.com/watch?v=ZMB_sqF_Y3Q)
- **Boost the Side channel alone on a deliberately simple, root-notes-only bass to widen it and "fill the frequency" — the single processing move on an otherwise unprocessed part.** On a 6/8 R&B beat, the bass has no independent line (just the guitar's chord roots copied straight across) — this device's Side gain is the whole beef-up. *(general starting point — no exact dB given, no accompanying low-end mono-lock mentioned)* → [[Bass Design]], [[Width and Stereo]], [[Smooth R&B 6-8 Chain]] — loner, [making a smooth/sexy rnb beat in 6/8 time signature](https://www.youtube.com/watch?v=mMZaktspUAA)
- **A three-move mid/side EQ recipe using this plugin's own ③ Mid/Side Filters.** High-pass the **side** image to lock the low end mono; boost **~2.5 kHz on the mid** image alone to help a vocal cut through in a master without brightening/widening the side; a **high shelf on the side** image expands perceived highs/brightness without touching the center. → [[EQ]], [[Width and Stereo]] — Sage Audio, [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM)

## Key Parameters

```visual-key
image: Images/Ghz Midside 3.png
coords: Images/Ghz Midside 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Mid Gain | Level of the **mid** (centre-summed) channel. | Pull mid down to push a mix wider without touching the sides; push it up to bring a buried vocal forward. | — |
| ② | Side Gain | Level of the **side** (difference) channel. | The honest width control — raising Side widens without the phase risk of a delay-based widener. See [[Stereo Field]]. | — |
| ③ | Mid / Side Filters | Independent filtering on each channel. | The classic move: high-pass the **sides** so bass stays centred and mono-safe while the top half widens. | — |
| ④ | Solo / Mute *(per channel)* | Auditions or kills mid or side on its own. | Solo the side channel to hear exactly what your widening is doing — most phase problems are obvious here and invisible in stereo. | — |
| ⑤ | Stereo Width | Overall width, from mono to fully wide. | — | — |
| ⑥ | Width Mode | How the width is calculated (Standard and alternatives). | — | — |
| ⑦ | Mono Below | Collapses everything under a set **Frequency** to mono, with **Strength** and **Bass Makeup**. | Set around 100–200 Hz so the low end stays locked and mono while the rest keeps its width. This is the single most useful control here for a mix bus. | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
