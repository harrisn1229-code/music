---
type: plugin
title: "Gold Clip"
category: Compressor/Limiter
vendor: "Schwabe Digital"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Gold Clip

![[Images/Gold Clip.jpg]]

**Category:** Compressor/Limiter
**Vendor:** Schwabe Digital

## What it is

Schwabe Digital's clipping plugin, used for controlled digital clipping/distortion as a loudness and character tool distinct from traditional limiting.

## What it's used for

Adding aggressive, controlled clipping distortion for extra perceived loudness and edge, common in modern trap/EDM mastering chains.

## FX chain notes

Placed just before the final limiter, catching peaks via clipping to reduce the limiter's workload.

## Used in my chains

The **modern-knock clipper** — shaves transient peaks by clipping instead of limiting, which is the current trap/drum loudness sound (a limiter ducks the whole signal; a clipper just flattens the spike and keeps the body loud):

- **[[3 Drums Bus|Drums Bus]]** — *trap-knock variation*: in place of [[Ozone 9 Maximizer]], with the [[API-2500]] attack faster (10–15 ms). Threshold set to shave ~3–4 dB off the kick/snare transients, Softness low (hard for knock), Oversampling on, Mix 100%.

## Key Parameters

```visual-key
image: Images/Gold Clip.jpg
coords: Images/Gold Clip.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold (Input/Drive) | Level at which clipping begins — lower = more of the signal driven into the clip | Set so only the transient peaks cross it (~3–4 dB of clipping on drums) | — |
| ② | Ceiling / Output | Output level after clipping | Set to your headroom target; the clip does the peak control, this sets level | — |
| ③ | Softness (Hard ↔ Soft) | Knee/curve of the clip — hard = aggressive/edgy, soft = rounder/warmer | Hard for punchy trap knock; softer to clip a mix bus more transparently | — |
| ④ | Oversampling | Anti-aliasing quality — reduces harsh aliasing artifacts from hard clipping | Turn up (2–4×) when clipping hard so the distortion stays clean | — |
| ⑤ | Mix | Dry/wet blend | 100% for pure clipping; blend for parallel clip on a fragile source | — |
| ⑥ | Delta / Monitor | Auditions only the clipped-off portion | Use to hear exactly how much transient you're removing before committing | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
