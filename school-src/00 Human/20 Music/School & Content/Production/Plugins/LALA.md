---
type: plugin
title: "LALA"
category: Compressor/Limiter
vendor: "AnalogObsession"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# LALA

![[Images/LALA.png]]

**Category:** Compressor/Limiter
**Vendor:** AnalogObsession

## What it is

A freeware optical leveling-amplifier compressor plugin by Analog Obsession modeled on the classic LA-2A-style opto compressor circuit.

## What it's used for

Smooth, musical vocal and bass leveling with the gentle, program-dependent character of an opto compressor.

## FX chain notes

Often the first compression stage on vocals for smooth leveling, followed by a faster compressor for peak control.

## Used in my chains

My **opto leveler** (the owned LA-2A) — slow, program-dependent gain riding that melts things together without audible pumping. Used for gentle glue/level-ride, 1–3 dB GR, never as a peak grabber:

- **[[2 Main Vocal Group|Main Vocal Group]]** — *slot 2, layer glue*: ~1.5 dB GR, gentle — melts the vocal layers into one voice (real leveling already happened per-track).
- **[[1 Electric Piano Track|Electric Piano Track]]** — *slot 2, leveling*: 2–3 dB GR — opto is what a Rhodes historically ran into (an LA-2A in every 70s studio); smooth sustain without killing the bark.
- **[[2 Bass Group|Bass Group]]** — *slot 2, level ride*: 1–2 dB GR, slow — smooths section-to-section bass (verse fingerstyle vs. chorus 808) so low-end energy stays constant.
- **[[1 Acoustic Guitar Track|Acoustic Guitar Track]]** — *slot 4, gentle or none*: **bypass on exposed parts** (~90% sound better with EQ and no comp); 2–3 dB GR + Mix 100% only when it's a bed in a dense mix.

## Key Parameters

```visual-key
image: Images/LALA.png
coords: Images/LALA.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①–⑤ only — ⑥ Output has no badge because this panel has no separate output stage; ② Gain **is** the output.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Peak Reduction | The main control — how much opto gain reduction is applied (acts as threshold + amount together) | Turn up until the meter shows 1–3 dB GR; opto self-adjusts attack/release to program | — |
| ② | Gain | Makeup output level | Set to unity so you judge leveling, not loudness | — |
| ③ | Comp / Limit | LA-2A-style mode switch — Comp (gentler ~3:1-ish) vs. Limit (firmer) | **Comp** for musical leveling/glue; Limit only when you need firmer control | — |
| ④ | HPF (sidechain) | High-passes the detector so low end doesn't drive the gain reduction (AnalogObsession extra) | Engage on bass/full mixes so the sub doesn't pump the whole signal | — |
| ⑤ | Mix | Dry/wet parallel blend (AnalogObsession extra) | 100% for straight leveling; blend for parallel opto glue that keeps transients | — |
| ⑥ | Output | Final output trim | Match bypass for a fair A/B | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
