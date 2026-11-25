---
type: plugin
title: "ValhallaShimmer"
category: Reverb/Delay
vendor: "Valhalla DSP"
tags: [plugin]
depth_linked: true
owned: true
owned_source: has-ui-image (Nate confirmed 2026-07-20)
owned_checked: 2026-07-20
owned_note: "no confident install match"
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# ValhallaShimmer

![[Images/ValhallaShimmer.jpg]]

**Category:** Reverb/Delay
**Vendor:** Valhalla DSP

## What it is

Valhalla's pitch-shifting shimmer reverb, adding octave-up (or other interval) pitched reflections to the reverb tail for an ethereal, ambient texture.

## What it's used for

Ambient, ethereal shimmer-reverb pads and atmospheric textures on vocals and instruments.

## FX chain notes

Used on a dedicated send/return for a shimmer texture layered under the dry signal.

## Techniques

- **Bright Hall algorithm, Center width, on a guitar arpeggio for an ethereal wash** — Valhalla Shimmer's **Bright Hall** mode set to **Center** width turns a plucky/arpeggiated clean guitar part into a beautiful, ethereal shimmer wash — the go-to when a source needs to read as dreamy/emo/ambient rather than just "reverberant." Pair with BLEASS Granulizer's pitched-delay mode (see [[Plugin Wishlist]]) for even more ethereal depth on top. → [[Ambient Texture and Field Recording]] — You Suck at Producing (Underbelly), [How To Make EDM (Emo Dance Music)](https://www.youtube.com/watch?v=skrcNjB4NIc)
- **First-call reverb for turning a plain/dry source into a lush ambient soundscape, with Supermassive as the free fallback** — for a fast lush-pad/wash effect, ValhallaShimmer is the first reach; if the $50 isn't worth it yet, Valhalla's free Supermassive gets close, especially starting from one of its own reverb presets rather than dialing from scratch. Chain it early in a soundscape-building signal path — before granular/tape/pitch layers stack on top. → [[Grain Delay]] — You Suck at Producing, [The best FX for creating LUSH Soundscapes](https://www.youtube.com/watch?v=wysKsyJf7dg)

## Used in my chains

My **pitch-shifted (shimmer) reverb** — feeds the tail through a pitch shifter so it blooms into an angelic, evolving pad (an effect, not a room):

- **[[1 Synth Bed Track|Synth Bed]]** / **[[1 Electric Guitar DI Track|Electric Guitar DI]]** — ambient shimmer texture layered under the part (Shift +12, moderate feedback, high-passed so it floats above the mix).
- **[[Reverb Send Long]]** — as an alt to the plate/hall when a part wants an ethereal, rising tail instead of a natural space.

## Key Parameters

```visual-key
image: Images/ValhallaShimmer.jpg
coords: Images/ValhallaShimmer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Shift (Pitch) | Transposition fed into the reverb feedback (each pass shifts further) | **+12** for the classic octave-up angelic shimmer; −12 for a dark sub-bloom | — |
| ② | Feedback | How much shifted signal recirculates (tail length + shimmer buildup) | Higher = more endless-rising shimmer; watch it from self-oscillating | — |
| ③ | Diffusion | Density/smoothness of the tail | High for a smooth pad; lower for a grainier texture | — |
| ④ | Size | Perceived space size | Large for a wash; smaller for a focused shimmer | — |
| ⑤ | Low Cut / High Cut | Band-limits the shimmer | Low-cut so the shimmer floats above the mix without mudding lows; high-cut to darken | — |
| ⑥ | Mod (Rate / Depth) | Chorusing of the tail | Keeps the long shimmer alive and evolving | — |
| ⑦ | Mix | Dry/wet blend | 100% on a send; low as a subtle insert sparkle | — |
| ⑧ | Modes (reverb / pitch / color) | Mono/stereo, pitch-shift mode (single/dual), and bright/dark color | Dual pitch mode for a richer shimmer; bright color for the angelic sound | — |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
