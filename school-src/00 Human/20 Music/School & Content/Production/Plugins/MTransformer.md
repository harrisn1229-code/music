---
type: plugin
title: "MTransformer"
category: Pitch/Vocal
vendor: "MeldaProduction"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# MTransformer

![[Images/MTransformer.jpg]]

**Category:** Pitch/Vocal (spectral transformer)
**Vendor:** MeldaProduction

> [!warning] Corrected 2026-07-20 — this page previously described a "transient/dynamic EQ" (Compressor/Limiter). That's wrong: MTransformer is a **frequency-domain spectral transformer** — pitch/formant/frequency shifting plus spectral morphing (presets: Vocal shaper, Daemonizer, Robofication, Freezer, Choruser).

## What it is

MeldaProduction's **spectral (frequency-domain) transformer** — it resynthesizes the signal's spectrum, letting you pitch-shift, formant-shift, frequency-shift and morph the timbre, with a modulation pad for evolving textures.

## What it's used for

Creative vocal/synth transformation — robot voices, gender/formant changes, harmonies, freezes, and metallic frequency-shifted textures.

## FX chain notes

Used after broad-strokes EQ, before final compression/limiting.

## Key Parameters

```visual-key
image: Images/MTransformer.jpg
coords: Images/MTransformer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Spectrum | Spectral warping/character of the transform | The core sound-design move — sweep for morphing timbres |
| ② | Level | Level of the transformed spectrum | Balance the effect against the dry |
| ③ | Amount | Depth/strength of the transformation | Subtle for texture; full for radical morphs |
| ④ | Frequency shift | Linear frequency shift (inharmonic — not pitch) | Small for shimmer; large for clangy/metallic |
| ⑤ | Pitch shift | Musical pitch transpose | Octaves for harmony; cents for detune |
| ⑥ | Formant shift | Shifts formants independently of pitch | Move formants for gender/character change |
| ⑦ | Keep formants | Preserves formants during pitch shift | On to avoid chipmunk on big pitch moves |
| ⑧ | Modulation (X=Variate / Y=Feedback) | XY pad randomizing the effect + feeding it back | Drag for evolving, unstable spectral textures |
| ⑨ | Dry/wet | Blend of transformed vs. dry | Blend for texture under the source |
| ⑩ | Output | Makeup/output level | Match bypass |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
