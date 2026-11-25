---
type: plugin
title: "Ozone 9 Equalizer"
category: EQ
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Ozone 9 Equalizer

![[Images/Ozone 9 Equalizer.png]]

**Category:** EQ
**Vendor:** iZotope

## What it is

The standalone EQ module from iZotope's Ozone 9 mastering suite, offering digital and analog-modeled EQ curves with a spectrum display.

## What it's used for

Mastering-grade broad tonal shaping and surgical correction on a final mix bus.

## FX chain notes

Used on the master bus, typically before Ozone's dynamics/EQ modules in the mastering chain.

## Techniques

- **A genuinely light-touch stereo-bus EQ pass, useful as a literal numeric floor for "barely anything": +0.3 dB ~80 Hz, +0.8 dB ~8 kHz.** Framed explicitly as a discipline — "I'm never a heavy EQer unless I know that it needs it... just light little touches" — run on the 2-bus after an (unowned) Waves L2 Ultramaximizer's first pass (Threshold −2.6 — see [[Plugin Wishlist]]) and before [[Ozone 9 Maximizer]], only when listening first confirms the bus needs anything at all — never a default step. → [[Ozone 9 Maximizer]], [[Master Chain]], [[Critical Listening for Mastering]] — Neal Pogue (Mix with the Masters), [[Understanding Kaytranada's vision with Neal Pogue]]
- **Switch a band to Digital mode specifically for narrow, surgical fixes — sibilance or a harsh resonance confined to a narrow frequency range — and reach for Analog mode instead for broad, tonal moves.** The decision is about the kind of change needed, not one mode being generally better: broadband/tonal → analog-modeled curves (this plugin's ③ Analog/Digital toggle, or see [[Ozone 9 Vintage EQ]] for the dedicated analog-emulation module); narrow/precise → digital. This module's built-in per-band Analog/Digital switch makes it the single owned tool that covers both halves of the decision without swapping plugins. → [[EQ]], [[Master Chain]] — Sage Audio, [How to EQ Your Master](https://www.youtube.com/watch?v=GF-XMVa3lW8)

## Key Parameters

```visual-key
image: Images/Ozone 9 Equalizer.png
coords: Images/Ozone 9 Equalizer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Bands | Up to 8 EQ nodes (analog or digital/surgical) | Digital mode for surgical cuts; analog for smooth broad moves |
| ② | Freq / Gain / Q | Per-band controls | Narrow cut to remove; wide boost to shape |
| ③ | Analog / Digital mode | Filter behavior per band | Analog = smoother, minimal ringing; Digital = precise + M/S |
| ④ | Mid/Side | Process center vs. sides per band | Side-only air; mid-only low tightening |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
