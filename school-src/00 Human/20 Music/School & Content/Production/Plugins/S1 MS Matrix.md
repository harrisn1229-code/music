---
type: plugin
title: "S1 MS Matrix"
category: Pan/Imaging
vendor: "Waves"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
video_enriched: true
---

# S1 MS Matrix

![[Images/S1 MS Matrix.png]]

**Category:** Pan/Imaging
**Vendor:** Waves

## What it is

Waves' mid/side matrix plugin for encoding/decoding a signal into mid and side components for independent processing.

## What it's used for

Splitting a stereo signal for independent mid/side EQ or dynamics processing.

## FX chain notes

Used to feed mid/side-specific processing on a mix or master bus.

## Techniques

- **The manual mid/side routing trick, stated as an explicit workflow for making any non-M/S-capable plugin process mid/side.** Duplicate the channel/track, put an instance of this plugin (or [[Ghz Midside Matrix 3]]) on **both** copies — one instance's Mode set to isolate the mid image, the other to isolate the side — then insert whatever processor is needed on each copy independently. This is the general mechanism behind mid/side EQ, saturation, compression, delay/reverb, transient shaping, and parallel processing on any plugin that lacks native M/S support. → [[Width and Stereo]] — Sage Audio, [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM)

## Key Parameters

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Mode | Encode (L/R→M/S) or decode (M/S→L/R) | Insert around any processor for manual M/S |
| ② | — | A pure routing utility | Pair two instances to M/S-process anything |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
