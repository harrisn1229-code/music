---
type: plugin
title: "Ozone 9 Imager"
category: Pan/Imaging
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

# Ozone 9 Imager

![[Images/Ozone 9 Imager.png]]

**Category:** Pan/Imaging
**Vendor:** iZotope

## What it is

Ozone 9's stereo imaging module, offering multiband stereo width control and a vectorscope/phase display.

## What it's used for

Adjusting a master's stereo width by frequency band and checking mono compatibility.

## FX chain notes

Used on the master bus, typically after EQ and dynamics, before the final limiter.

## Techniques

- **Mono Maker named directly and used on a drum bus (not just a master): set the crossover at ~61 Hz to collapse everything below it to mono/center.** "It's called the mono maker… taking all your low-end signal from wherever you set the cross point — 61 hertz and below — and putting it right in your middle." Stated as taste rather than a hard rule ("sometimes you want a stereo low end, sometimes you want some crazy stuff") but his default preference: a centered low end reads better, "period, point blank." Directly matches this plugin's own Band Width/crossover controls — set the low crossover ~61 Hz and Band 1 width to 0. → [[3 Drums Bus|Drums Bus]], [[Width and Stereo]] — Jaycen Joshua (Mix with the Masters), [Jaycen Joshua's drum bus](https://www.youtube.com/watch?v=LY-vU5MwBvs)
- **Reach for it on individual elements (a shaker, a tambourine, even a reverb return), not just at mastering** — used as a general-purpose per-track widener on Mode 2, pushed hard whenever a small element needs to sound bigger/wider or have its highs lifted — treated as a normal mix-stage tool rather than a rare mastering-only device. → Disclosure, [11 Best Music Tips from "In My Arms"](https://www.youtube.com/watch?v=7pBkjzNT9eI)
- **Widen the highs, keep the bass mono, on an individual riddim-bass patch (not just the master)** — the same multiband-width logic as the master-chain use below, applied directly on a bass instrument's own FX chain: open up the top-band width for an airier high end while leaving the low band collapsed to mono, so a heavily-processed dubstep/riddim bass stays club/mono-safe without sacrificing perceived width up top. → [[BASS Slot]], [[Width and Stereo]] — You Suck at Producing (Underbelly ft. San Holo), [How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs)

## Used in my chains

My **multiband stereo imager** — width per frequency band, so the low end stays mono while the top opens up:

- **[[Master Chain]]** — *slot 5, imaging*: Band 1 (<120 Hz) width **DOWN to 0** (mono low end — punch + vinyl/club safety); top band **+5–10% width max** if the mix needs it.

## Key Parameters

```visual-key
image: Images/Ozone 9 Imager.png
coords: Images/Ozone 9 Imager.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Band Width (per band) | Stereo width amount for each frequency band | **<120 Hz → 0 (mono)**; small + on the top band for air/openness | — |
| ② | Crossovers | Frequency splits between the imaging bands | Set the low crossover ~120 Hz so only true sub is mono'd | — |
| ③ | Stereoize | Adds width to mono/narrow material | Gentle on the top band; never on the low band | — |
| ④ | Recover Sides | Compensates for width loss | Use if narrowing lows thins the overall image | — |
| ⑤ | Vectorscope / Correlation | Visual width + mono-compatibility meter | Watch correlation stays positive so the mix survives mono | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
