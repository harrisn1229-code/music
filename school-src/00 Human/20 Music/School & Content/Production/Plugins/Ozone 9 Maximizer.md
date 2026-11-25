---
type: plugin
title: "Ozone 9 Maximizer"
category: Compressor/Limiter
vendor: "iZotope"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Ozone 9 Maximizer

![[Images/Ozone 9 Maximizer.png]]

**Category:** Compressor/Limiter
**Vendor:** iZotope

## What it is

Ozone 9's loudness maximizer/limiter, with multiple limiting algorithms (IRC), true-peak limiting, and a transient-preserving mode.

## What it's used for

Final loudness maximization on a master to competitive streaming/commercial loudness levels.

## FX chain notes

The last device in the Ozone master chain.

## Techniques

- **Reach for this module only after listening confirms the stereo bus actually needs it — a reactive "give it a little more beef/heaviness" pass, not a default loudness step.** Run SECOND in a two-plugin stereo-bus routine, after an (unowned) Waves L2 Ultramaximizer's light first pass (Threshold −2.6 — see [[Plugin Wishlist]]) and after [[Ozone 9 Equalizer]]'s barely-there tonal touches (+0.3 dB ~80 Hz, +0.8 dB ~8 kHz). A/B'd bypassed vs. engaged on a Kaytranada/Kali Uchis mix, this stage's contribution read as extra clarity and a slightly harder hit rather than raw volume — deliberately light, not pushed for loudness: "just give it a little bit more 'umphhh.'" Pairs with this note's own "maximizer = limiter mechanically" framing below — here it's run light on purpose. → [[Ozone 9 Equalizer]], [[Plugin Wishlist]], [[Critical Listening for Mastering]] — Neal Pogue (Mix with the Masters), [[Understanding Kaytranada's vision with Neal Pogue]]
- **A "maximizer" is mechanically the same device as a limiter — worth remembering before treating "maximize" as a gentler alternative to limiting.** It uniformly amplifies the input until the ceiling is hit, using the same look-ahead brick-wall attenuation on peaks that any limiter runs — reaching for a "maximizer" instead of a "limiter" doesn't dodge the transient-blurring tradeoff [[Limiting]] describes. If transient impact matters more than raw loudness at this stage, spend the loudness budget upstream instead — a parallel-compression pass ([[Pro-C 2]]'s Dry Gain) or a subtle multiband saturation pass ([[Saturn 2]]'s Subtle Tube/Tape + Dynamic style) both amplify quiet detail without this device's peak-shaving mechanism. → [[Limiting]], [[Clipping and Loudness]] — Sage Audio, [Stop Limiting Your Masters](https://www.youtube.com/watch?v=s_LDCzWx20g)
- **Tool-agnostic mastering-limiter target: release above 100 ms, channel link ~60–80%, max 3 dB of attenuation — and if you need more GR than that to hit an LUFS target, fix it upstream, not at the limiter.** Presented as "whichever limiter you use is fine" — carry these settings into any limiter. If 3 dB of GR isn't enough loudness, add more upward processing ([[Oxford Inflator]]) and/or peak attenuation before this stage rather than pushing Threshold harder here. After limiting, judge by re-listening — does it still sound like what you want once quiet detail gets pushed forward? — and revisit the tone-shaping EQ upstream if not, not this device. → [[Master Chain]], [[Pro-L 2]] — Sage Audio, [The Only Music Mastering Video You'll Ever Need](https://www.youtube.com/watch?v=M88T8jFL2uU)

## Used in my chains

My **final limiter/maximizer** — IRC-IV intelligent limiting for a clean loud ceiling:

- **[[Master Chain]]** — *slot 8, the limiter*: IRC IV, ceiling **−1.0 dBTP** (true peak, prevents streaming-codec clip), threshold pushed for **2–3 dB GR max** on the loudest section.
- **[[3 Drums Bus|Drums Bus]]** — *slot 5, peak catch*: IRC IV, threshold for **1–2 dB GR on hits only**, ceiling −0.3 dB relative.

## Key Parameters

```visual-key
image: Images/Ozone 9 Maximizer.png
coords: Images/Ozone 9 Maximizer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold | Drives signal into the limiter (more GR = louder) | Push for 2–3 dB GR max on the master; 1–2 dB on a bus peak-catch | — |
| ② | Ceiling | Maximum output (set to true-peak) | **−1.0 dBTP** for streaming; −0.3 for a bus | — |
| ③ | Character (IRC mode) | The limiting algorithm (IRC I–IV, transient vs. transparent) | **IRC IV** for transparent, intelligent master limiting | — |
| ④ | Transient / Character amount | Balances punch vs. smoothness within the mode | More transient to keep drum punch; smoother for dense material | — |
| ⑤ | Stereo Independence | How independently L/R are limited (by frequency/time) | Raise to preserve stereo width under heavy limiting | — |
| ⑥ | Learn Threshold | Auto-sets threshold from the loudest section | Learn on the drop, then trim by ear | — |
| ⑦ | True Peak / Dither | Inter-sample peak detection + final dither | True-peak on for masters; dither only on the final export | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
