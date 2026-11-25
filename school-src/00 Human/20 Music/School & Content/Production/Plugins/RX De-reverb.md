---
type: plugin
title: "RX De-reverb"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# RX De-reverb

![[Images/RX De-reverb.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module that reduces unwanted room reverb/ambience captured in a recording. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Drying out a vocal or instrument take that was recorded in a live/reflective room when a cleaner sound is needed.

## FX chain notes

Used as a corrective cleanup stage before adding intentional reverb back in.

## Techniques

- **Run it on every percussion one-shot before adding character** — de-reverb a shaker/tambourine/percussion sample (own recording or a sample-pack grab) to strip room noise and space out first, then layer in whatever processing/character is actually wanted — cleaning the source first gives more control than EQ-ing around baked-in room tone; a similarly-priced Native Instruments de-reverb tool does the same job if reaching for a cheaper option — Disclosure, [First Twitch Stream Ever (Production Tutorial)](https://youtu.be/IObzp3OugtY)

## Key Parameters

```visual-key
image: Images/RX De-reverb.png
coords: Images/RX De-reverb.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Learn | Analyzes the audio to build a reverb profile to subtract | Click Learn over a reverb-heavy section first |
| ② | Reduction | Overall amount of reverb tail removed | Dry up a roomy take; too much = phasey/gated |
| ③ | Reverb Profile (Low / Low-mid / High-mid / High) | Per-band reduction amount (with per-band Solo) | Pull down only the bands where the room rings |
| ④ | Tail length [s] | How much of the decay is targeted | Match to the room's decay time |
| ⑤ | Artifact smoothing | Reduces processing artifacts | Increase if the result sounds watery |
| ⑥ | Enhance dry signal | Boosts the dry to compensate for removed energy | On to keep the source from sounding thin after reduction |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
