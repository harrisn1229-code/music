---
type: plugin
title: "RX Guitar De-noise"
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

# RX Guitar De-noise

![[Images/RX Guitar De-noise.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module tuned specifically for removing amp hiss, hum, and noise floor from guitar recordings. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Cleaning up noisy DI or amp recordings of guitar and bass.

## FX chain notes

Used early in an instrument cleanup pass, before amp-sim or EQ processing.

## Techniques

- **Run a denoiser deliberately for its side-effect low-pass character, not its intended noise-removal job — closing stage of a vintage-sample-flip chain.** Jake One's vintage-Rhodes sample chain (*Percocet and Stripper Joint*, Future) ends with a noise-reduction plugin (captioned "Bruce Free," near-certainly **Brusfri** by Klevgrand) whose noise reduction unintentionally rolls off the top end — treated as a feature, adding to the vintage vibe rather than something to correct for. Best-match owned trick: RX Guitar De-noise's Amp module reliably darkens a source's top end as a byproduct of hiss removal when Reduction is pushed past what's strictly needed for the noise floor — lean into that darkening on purpose instead of dialing it back for transparency. *(general starting point — no exact Sensitivity/Reduction values given on screen)* → [[UAD Tube-Tech CL 1B mkII]], [[EQ Eight]], [[UAD RealVerb-Pro]], [[Sampling and Sound Selection]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

## Key Parameters

```visual-key
image: Images/RX Guitar De-noise.png
coords: Images/RX Guitar De-noise.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Modules (Amp / Squeak / Pick) | Three on/off sections targeting amp hiss, fret squeaks, and pick noise | Enable only the noise types present |
| ② | Sensitivity (per module) | Detection threshold for that module | Tune so playing dynamics survive |
| ③ | Reduction (per module) | Amount removed | Subtle — over-reduction dulls the guitar |
| ④ | Amp: Learn / Resolution | Learns the amp-hiss profile; Resolution sets reduction detail | Learn over a silent, amp-only section |
| ⑤ | Squeak: Duration (Short / Long) | Target length of the fret squeaks | Short for quick finger squeaks; Long for slides |
| ⑥ | Pick: Attack | Preserves the pick transient while removing pick noise | Keep high so strums stay crisp |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
