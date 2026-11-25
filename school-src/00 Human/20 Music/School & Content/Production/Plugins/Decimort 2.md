---
type: plugin
title: "Decimort 2"
category: Drive/Color
vendor: "D16 Group Audio Software"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Decimort 2

![[Images/Decimort 2.jpg]]

**Category:** Drive/Color
**Vendor:** D16 Group Audio Software

## What it is

A bit-depth and sample-rate reduction (decimation) plugin from D16 Group modeling the character of vintage samplers and lo-fi digital hardware.

## What it's used for

Classic lo-fi/bitcrushed textures on drums, vocals, and synths — emulating old sampler grit (SP-1200/MPC-style character) rather than harsh digital distortion.

## FX chain notes

Placed on an individual track or a drum bus, often before saturation/EQ to shape the resulting lo-fi tone.

## Techniques

- **Owned best-match for a "Lo-Fi" bitcrush/downsample stage added to a thin, weak percussion loop purely to give it WEIGHT — not brightness, not vintage color, just heft.** Jaycen Joshua, on a "ticky, poofy" tambora loop: "so I just dirty it up a little bit with the Lo-Fi — I love this plugin, you're adding the distortion and saturation that gives it the weight that it needs." Positioned right after a CLA-76-style compressor and before an EQ pass that cedes low end to the 808 — see [[UAD UA 1176LN]], [[Pro-Q 4]]. → [[UAD UA 1176LN]], [[Pro-Q 4]], [[Saturation and Distortion]], [[Masking and Carving]] — Mix with the Masters (Jaycen Joshua), [[Jaycen Joshua on creative drum mixing]]
- **Fake "drums baked into an old sample" by dropping a plain boom-bap kick+snare pattern through a sample-rate reduction stage** — since real vintage soul samples always have their original drums smeared into the recording, program a simple kick/snare pattern and lower its sample rate (source video used FL Studio's Edison; Decimort 2's Sample Rate control is the direct owned equivalent) for the same washed-out/filtered vintage character, rather than trying to EQ/reverb a clean modern kit into sounding old. → [[Sampling and Sound Selection]] — loner, [[the secrets behind OZ's 'her loss' production!?]]

## Key Parameters

```visual-key
image: Images/Decimort 2.jpg
coords: Images/Decimort 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Bits | Bit-depth reduction | Low for crushed digital grit |
| ② | Sample Rate | Downsampling/decimation | Drop for vintage-sampler aliasing (SP-1200/MPC vibe) |
| ③ | Filter (Pre/Post) | Anti-alias + tone filters | Model a specific sampler's filter character |
| ④ | Quantization / Jitter | Sampler imperfection modeling | Adds the analog 'grunge' of old samplers |
| ⑤ | Mix | Dry/wet blend | Parallel-blend for grit under a clean source |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
