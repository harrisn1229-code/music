---
type: plugin
title: "Pro-G"
category: Compressor/Limiter
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Pro-G

![[Images/Pro-G.png]]

**Category:** Compressor/Limiter
**Vendor:** FabFilter

## What it is

FabFilter's noise gate/expander with a lookahead detection circuit and a range control for precise gating without artifacts.

## What it's used for

Cleaning up bleed on drum mics, tightening noisy vocal or guitar recordings, and gating gated-synth effects.

## FX chain notes

Placed early in a track's chain, before compression and EQ, to control unwanted noise before it's amplified further.

## Techniques

- **Used as a Gate (not just noise cleanup) specifically to create audible contrast between a hyper-compressed vocal and the space between phrases.** Illangelo (The Weeknd's lead vocal chain): "I use this primarily to create contrast between what's about to be a super, hyper-compressed, focused vocal and we also want to hear that space in between." Setting: opens above Threshold, tucks by only about **12 dB** below it — a partial duck via the Range control, not a hard gate to silence. Positioned right after unowned Vocal Rider and before de-essing/limiting in his chain. Explicitly compared to Waves RVox's built-in Gate feature ([[RVox]]) — he prefers this dedicated plugin over RVox's all-in-one approach for more control, even though it's "a little bit more work." → [[RVox]], [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]

## Key Parameters

```visual-key
image: Images/Pro-G.png
coords: Images/Pro-G.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Threshold | Level where gating/expansion engages | Set to cut noise/bleed below it |
| ② | Ratio / Range | Expansion depth + maximum attenuation (Range) | Steep Ratio for gating; Range for a partial duck vs. full silence |
| ③ | Attack / Hold / Release | Envelope of the gate | Fast attack, enough Hold to keep tails |
| ④ | Knee / Lookahead | Threshold softness + look-ahead to catch fast transients | Add Lookahead so sharp attacks aren't clipped |
| ⑤ | Style (Classic) | Gate/expander algorithm/character | Pick Classic/Clean/Vintage per source *(sidechain/EQ live in the Expert panel)* |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
