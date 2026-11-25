---
type: plugin
title: "Limiter"
category: Compressor/Limiter
vendor: "Ableton"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Limiter

![[Images/Limiter.png]]

**Category:** Compressor/Limiter
**Vendor:** Ableton

## What it is

Ableton's brickwall peak limiter, used to catch transients and prevent clipping without complex mastering controls.

## What it's used for

Final safety limiting on a track or the master bus, and quick loudness maximization during mixing/rough mastering.

## FX chain notes

Always the last device in a chain — placed after all EQ, compression, and saturation to catch peaks before output.

## Techniques

- **A dry kick+808 print with only a stock Limiter on top can beat sidechain, EQ, or phase-alignment for resolving their clash** — compared head-to-head against five other kick/808-clash fixes, the plain-limiter-only version was the preferred result: no ducking or carving at all, the limiter alone absorbs the collision. Worth trying before reaching for a dedicated sidechain chain. → [[Sidechaining]], [[Kick Design]] — Oliver (Sol State), [Oliver ENDS The "Sidechain Your 808" Debate](https://www.youtube.com/watch?v=ORENdwJV15Y)

## Used in my chains

Ableton's stock **brickwall limiter** — a transparent peak ceiling (vs. [[kHs Clipper]]'s transient shave or [[Pro-L 2]]'s deeper control):

- **[[1 Digital Bass Track|Digital Bass Track]]** — *long sliding 808s (trap)*: at the end of the chain to pin the 808's sustain to a fixed ceiling (glide lives on the instrument, not the chain).

## Key Parameters

```visual-key
image: Images/Limiter.png
coords: Images/Limiter.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Gain | Input drive into the limiter | Push to hit the ceiling harder for more limiting/loudness | — |
| ② | Ceiling | Maximum output level (the brickwall) | Set to your headroom target (−0.3 to −1 dBTP for masters) | — |
| ③ | Release | How fast gain recovers after limiting | Faster = louder but can distort/pump; slower = cleaner, less loud | — |
| ④ | Lookahead | Advance-look to catch peaks before they pass | Longer for transparent catches; shorter for lower latency | — |
| ⑤ | Stereo / L-R link | Link channels vs. limit independently | Linked to preserve the stereo image; unlinked only for a specific effect | — |
| ⑥ | Auto-release | Program-dependent release | On for varied material so the release adapts to the signal | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
