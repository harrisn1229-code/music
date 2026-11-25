---
type: plugin
title: "kHs Bitcrush"
category: Drive/Color
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# kHs Bitcrush

![[Images/kHs Bitcrush.png]]

**Category:** Drive/Color
**Vendor:** Kilohearts

## What it is

A bit-depth/sample-rate reduction snap-in for classic digital lo-fi distortion.

## What it's used for

Lo-fi digital grit and crushed textures on drums, synths, and vocals.

## FX chain notes

Stacked in a Snap Heap chain, often combined with a filter snap-in to tame harshness.

## Techniques

- **Sample-rate reduction as the LAST step of a vocal-chop finish, before duplicating + time-stretching the result.** For a *Blind*-inspired ("SOS") vocal-chop treatment: after a Little AlterBoy pass with the Formant knob automated up/down (pitch untouched, for a woozy character), drop the **Quantize** knob (owned equivalent to the source's "lower the sample rate in Edison" move), then duplicate the chop and time-stretch the duplicate to play faster, layering it back against the original. *(general starting point — no exact Quantize value or stretch amount given)* → [[Little AlterBoy]], [[Pitch and Formant]] — loner, [the secrets behind sza's 'sos' production!?](https://www.youtube.com/watch?v=qbkFwpExtVQ)
- **Quantize (sample-rate) reduction as the final stage on an already-processed lead vocal, for a "filtered out" R&B character rather than obvious crunch** — after a light AlterBoy pitch-up → reverb → EQ → delay chain, drop the **Quantize** knob down (owned equivalent to the source's "Edison, lower the sample rate" move) so the vocal reads as muffled/filtered-through-something rather than cleanly hi-fi, while staying present in the mix — the signature Bryson Tiller ("Exchange") vocal texture. Subtle here vs. the more aggressive full-crush technique below — dial Quantize/Bits by ear against how "vintage-sample" vs. "clean" the target wants to feel. → [[Little AlterBoy]], [[Pitch and Formant]], [[Bryson Tiller Vocal Chain]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
- **Lo-fi vocal chain for a deliberately "badly recorded old sample" character:** distortion/trash preset first → drive/pre-gain pushed → bitcrush → ping-pong delay. The point is a glitchy, degraded vocal specifically because a clean one would clash with the vibe of an otherwise polished, professional track — used on a chorus hook vocal, not a mistake to fix. → [[Delay]] — Flux Pavilion, [Never Gonna Be Alone Breakdown (17 Tips)](https://www.youtube.com/watch?v=C75vq9Wf7d8)

## Key Parameters

```visual-key
image: Images/kHs Bitcrush.png
coords: Images/kHs Bitcrush.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Quantize | Sample-rate reduction (decimation) — the kHz readout up top; aliasing/'old sampler' character | Drop toward 8–12 kHz for the classic SP/vintage-sampler sound |
| ② | Bits | Reduces bit depth — quantizes amplitude for gritty digital noise | Low bit values for crushed lo-fi; subtle for a touch of digital edge |
| ③ | Dither | Adds noise to smooth the quantization steps | On to soften harsh bit-reduction artifacts |
| ④ | ADC Q | Input converter quality — filtering/aliasing on the way in | Lower for grittier, more aliased digital character |
| ⑤ | DAC Q | Output converter quality — reconstruction filtering on the way out | Lower for a rougher, cheaper-DAC tone |
| ⑥ | Mix | Dry/wet blend | Parallel-blend so the crush adds grit without losing the source |

## See also

- Effects: [[Saturation and Distortion]] · [[Pitch and Formant]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
- Chains: [[Bryson Tiller Vocal Chain]]
