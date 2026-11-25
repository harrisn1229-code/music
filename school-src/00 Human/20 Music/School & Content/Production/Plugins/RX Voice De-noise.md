---
type: plugin
title: "RX Voice De-noise"
category: Pitch/Vocal
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# RX Voice De-noise

![[Images/RX Voice De-noise.png]]

**Category:** Pitch/Vocal
**Vendor:** iZotope

## What it is

An RX module using AI-driven noise modeling tuned specifically for vocal/dialogue sources. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Removing background noise from vocal recordings while preserving vocal tone better than generic noise reduction.

## FX chain notes

Used early in a vocal cleanup pass, before creative processing.

## Techniques

- **Owned best-match for a "noise suppressor" run CREATIVELY on a drum loop — not to clean it up, but to deliberately destroy fidelity for a lo-fi/degraded character, as the last stage of a loop's processing chain.** Jaycen Joshua, on a tambora/percussion loop: "why would you use the noise suppressor? ... I'm taking away the fidelity, I'm messing this loop up — it's a totally different sound... sometimes wrong is right, sometimes you got to make something not beautiful to understand how beautiful it is. I do it all the time." A vocal-tuned de-noiser repurposed on a drum element specifically for the degradation artifacts it introduces, run after a compressor, a Lo-Fi/bitcrush stage, and an EQ move that ceded low end to the 808 — see [[UAD UA 1176LN]], [[Decimort 2]], [[Pro-Q 4]]. → [[Decimort 2]], [[Saturation and Distortion]], [[Masking and Carving]] — Mix with the Masters (Jaycen Joshua), [[Jaycen Joshua on creative drum mixing]]

## Used in my chains

My **noise-floor cleanup** — learns a noise profile and removes hum/hiss/room tone transparently before the chain adds gain that would raise it:

- **[[1 Acoustic Guitar Track|Acoustic Guitar Track]]** — *slot 2, noise floor*: Adaptive ON, Reduction 4 dB (range 3–6), learn on pre-count-in room tone.
- **[[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]** — *slot 2*: learn on a gap, 6–10 dB reduction, adaptive (amp hiss/hum runs hotter).

## Key Parameters

```visual-key
image: Images/RX Voice De-noise.png
coords: Images/RX Voice De-noise.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Learn / Noise Profile | Captures the noise fingerprint from a silent section | Learn on a pre-count-in gap of pure room tone/hum | — |
| ② | Adaptive Mode | Continuously re-learns the noise as it changes | ON for varied room noise; off + a fixed profile for steady hum | — |
| ③ | Reduction (dB) | How much of the profiled noise is removed | 3–6 dB starting point; more (6–10) for a hissy amp — too much = artifacts | — |
| ④ | Threshold / Sensitivity | Where the de-noiser decides signal vs. noise | Nudge so quiet playing/breaths survive but the floor drops | — |
| ⑤ | Output / Delta | Level + audition the removed noise | Delta-listen to confirm you're only removing noise, not tone | — |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
