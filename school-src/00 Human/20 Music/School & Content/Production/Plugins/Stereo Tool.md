---
type: plugin
title: "Stereo Tool"
category: Pan/Imaging
vendor: "Mensia"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# Stereo Tool

![[Images/Stereo Tool.png]]

**Category:** Pan/Imaging
**Vendor:** Mensia

## What it is

Mensia Technologies' stereo image analysis and correction plugin, checking mono compatibility and adjusting stereo width.

## What it's used for

Verifying and correcting a mix's stereo/mono compatibility before delivery.

## FX chain notes

Used on the master bus late in the mixing/mastering process.

## Techniques

- **Mid/side saturation via the Mid Sat / Side Sat controls: drive Mid Sat for a more centered low end, drive Side Sat for expanded stereo highs.** A native-plugin route to a technique the source video otherwise built by hand (duplicate-channel routing + a saturator per image): push ③ Mid Sat to emphasize/thicken the mid image's lows so the center reads more anchored, push ③ Side Sat to emphasize the side image's highs for a stereo-highs expansion — same underlying "harmonics as an imaging tool" mechanism as the ③ Mid Sat/Side Sat entry already below, applied with a frequency-emphasis intent rather than just edge-softening. → [[Saturation and Distortion]], [[Width and Stereo]], [[Roar]] — Sage Audio, [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM)

## Used in my chains

Ableton's **stock width/pan/mono utility** — a lightweight alternative to [[Utility]] for width and mono-below control:

- Width/mono duty on instrument and synth tracks where a quick spread or a mono-below-X-Hz is all that's needed (keeps the low end centered; mono-check with it too).

## Key Parameters

```visual-key
image: Images/Stereo Tool.png
coords: Images/Stereo Tool.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Width | Central width control (shown as a %) driving the mid/side balance. | The main move. Everything else here refines what this does. | — |
| ② | Mid Soft / Side Soft | Soft-clipping on the mid and side channels independently. | Soften the sides to stop a widened part getting spiky at the edges while the centre stays clean. | — |
| ③ | Mid Sat / Side Sat | Saturation on mid and side independently. | Saturating **only the sides** is a width trick that survives mono better than level-based widening — the centre is untouched. See [[Stereo Field]]. | — |
| ④ | Left / Right Gain | Per-channel level (the two 100% controls). | Use for a genuine balance fix; asymmetric material sits better nudged here than panned. | — |
| ⑤ | All Pass (L / R) | Independent all-pass filters per channel — phase shift without level change. | This is the phase tool. Small offsets widen without volume changes, but **mono-check** — all-pass is exactly where mono collapse comes from. | — |
| ⑥ | Left / Right Delay | Per-channel delay in ms. | Haas widening. A few ms on one side is huge; it's also the least mono-safe control here. | — |
| ⑦ | SCL / PTS / COL / THK | Vectorscope display controls — scale, points, colour, thickness. | Display only, no audio effect. Set for readability and forget. | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
