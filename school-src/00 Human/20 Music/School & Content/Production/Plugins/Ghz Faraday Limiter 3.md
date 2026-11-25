---
type: plugin
title: "Ghz Faraday Limiter 3"
category: Compressor/Limiter
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ghz Faraday Limiter 3

![[Images/Ghz Faraday Limiter 3.png]]

**Category:** Compressor/Limiter
**Vendor:** Goodhertz

## What it is

Goodhertz's Faraday Limiter, a transparent brickwall limiter designed for clean, artifact-free peak control.

## What it's used for

Clean peak limiting on tracks, busses, or masters where a neutral limiting character is wanted.

## FX chain notes

The last device in a chain, catching peaks after all other processing.

## Key Parameters

```visual-key
image: Images/Ghz Faraday Limiter 3.png
coords: Images/Ghz Faraday Limiter 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Threshold | Sets where limiting — and the more pronounced saturation — begins. The saturation intensity depends on the Color setting. | Lower Threshold doesn't just limit harder, it changes the *character*: as it drops, Color becomes more tape-like with pronounced odd-order harmonics. | — |
| ② | Ratio | **Stepped, not continuous** — 2:1, 4:1, 8:1 or the default 20:1. | Leave at 20:1 for true limiting; step down to 4:1 or 8:1 to use it as a coloured compressor instead. | — |
| ③ | Color | Amount of analog coloration and transformer saturation. **0% is clean, 100% an analog middle ground, 200% fully-saturated transformer growl.** | This is the reason to reach for Faraday over a transparent limiter. 100% on a bus for glue with character; 200% when the distortion *is* the effect. | — |
| ④ | Warmth | Alters the **frequency-dependence of the detector**, so highs and lows hit the limiter differently. −100% releases much faster on highs only (brighter); +100% weights the lows with a longer release (darker, sluggish, like severe tape compression). | The most misunderstood control here — it's not a tone knob, it's a detector-tilt. Push negative to keep a dark source from pumping; push positive for deliberate tape-style sludge. | — |
| ⑤ | Attack | An attack **time constant**, not a fixed time. Smaller values clamp quickly and dampen transients; larger values react slowly and emphasise punch. | Larger for drums when you want the hits to survive; smaller when you need the peaks genuinely controlled. | — |
| ⑥ | Release | Release time constant. Smaller releases faster — louder, more audible pumping; larger releases slowly and smoothly. | Small for loudness on a dense mix; large when pumping would be obvious. | — |
| ⑦ | Auto Gain | Compensates output for the gain reduction applied. | Leave on while auditioning Threshold so loudness doesn't bias the judgement. | — |
| ⑧ | Out | Output level after limiting. | — | — |
| ⑨ | Dry | Dry/wet blend for parallel limiting. | Blend dry back in to keep transients while the limited signal holds the body. | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
