---
type: plugin
title: "Saturn 2"
category: Drive/Color
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Saturn 2

![[Images/Saturn 2.png]]

**Category:** Drive/Color
**Vendor:** FabFilter

## What it is

FabFilter's current multiband saturation plugin with an expanded set of saturation styles, a dynamic per-band system, and mid/side processing.

## What it's used for

Adding character, warmth, or aggressive harmonic distortion to specific frequency ranges — from subtle analog glue to full digital destruction.

## FX chain notes

Typically used post-EQ on individual tracks or the mix bus, often followed by a limiter to catch the added harmonic energy.

## Techniques

- **The modulation section can make almost every parameter (distortion type, saturation amount, tone controls) program-dependent — start from a preset and inspect its filter/modulation routing rather than building from an empty state.** A broader framing of the transient-Drive technique below: any parameter can be modulated by the incoming signal's own dynamics, which gets complex fast — the recommended entry point is loading a preset and reverse-engineering what it's already doing. Per-band (multiband) and mid-side saturation, plus per-band frequency emphasis before distortion (targeting more distortion at specific frequencies), make this the most flexible saturator in the vault. → [[Saturation and Distortion]] — Sage Audio, [How to Use Saturation Plugins](https://www.youtube.com/watch?v=0XtjaRN3j4E)
- **Transient-triggered high-frequency saturation via an envelope follower on Drive — one of very few plugins offering this modulation routing.** Build an envelope follower in Transient mode, attach it to the Drive parameter, isolate the affected band to the highs — the incoming transient now determines how much high-frequency distortion is triggered moment to moment, making transients pop more than a static high-shelf saturation setting would. A more aggressive, dynamic alternative to plain static high-frequency saturation for adding perceived clarity. → [[Saturation and Distortion]] — Sage Audio, [How to Mix for Clarity](https://www.youtube.com/watch?v=R-UjkDtleVU)
- **Saturn 2's saturation reads SYMMETRICAL (odd harmonics only) — a specific, useful fact when picking an algorithm for character rather than just drive amount.** Per Sage Audio's symmetrical/asymmetrical distortion framework (symmetrical = peak and trough shaped identically = odd harmonics; asymmetrical = peak/trough shaped differently = even + odd harmonics), Saturn 2 lands on the symmetrical side — the same bucket as soft/hard-knee clippers and [[Oxford Inflator]]-style upward maximizers. Contrast: Melda Audio's Saturate plugin (unowned) reads asymmetrical despite being a similarly general-purpose saturator — worth A/B'ing Saturn 2 against an asymmetrical (tube/transformer-emulating) unit when a part specifically needs even-harmonic warmth rather than odd-harmonic edge. → [[Saturation and Distortion]], [[Oxford Inflator]], [[Plugin Wishlist]] — Sage Audio, [Distortion: The Definitive Guide](https://www.youtube.com/watch?v=lnoMqI8Hodo)
- **BPM-accurate attenuation timing via the envelope follower/generator, linked to Drive — three modes, from good to best.** **(1) Envelope mode:** attack time tracks the target subdivision closely (e.g. 125 ms for a 16th note or 31.25 ms for a 64th note at 120 BPM, released at 1–50 ms) — not perfect but far more accurate/repeatable than a compressor. **(2) Transient mode:** release plays the bigger role — with release **≥100 ms**, the attack time matches the plugin's stated value exactly; at very short releases, accuracy on the attack figure degrades slightly (target 31.25 ms read closer to 23 ms). Release also maps directly to return-to-unity time (50 ms release ≈ 50 ms return to unity). **(3) Envelope generator (most accurate):** set attack to the target subdivision and additionally control the SLOPE of attack/decay/release independently — a negative attack slope concentrates peak attenuation right at the target time value, giving precise dynamic control regardless of incoming frequency. Best results on the **Clean Tape** algorithm specifically, though other algorithms track the envelope reasonably well too. Works because clipping the waveform (rather than gain-riding it like a compressor) removes most of the variables that make compression timing unpredictable — see [[Compression]] for the contrast. → [[Saturation and Distortion]], [[Compression]] — Sage Audio, [How to Time Every Audio Effect to the BPM](https://www.youtube.com/watch?v=MXz2hPL36PQ)
- **Distortion stage on a bridge vocal, built to make an otherwise-simple song feel "very dense" for one section only.** Pull the level down on a raw vocal fragment, distort it a little, then run it through Saturn "I like Saturn a lot, it's cool, and you really give that distorted feel" — layered ahead of delay, reverb, and a vocoder pass on the same bridge vocal stack. *(qualitative only — no Drive/Type/Mix values given)* → [[1 Main Vocal Track]], [[Saturation and Distortion]] — Mix with the Masters (Benny Blanco & Selena Gomez), [Behind the Track｜'Younger And Hotter Than Me' by Selena Gomez & benny blanco](https://www.youtube.com/watch?v=rkJ-LaoArUY)
- **Program-dependent multiband saturation for mastering: different tube color per band, drive modulated by an envelope follower per band.** Split lows/mids/highs; warm tube color on the lows and mids, clean tube color on the highs specifically to keep the high-frequency transients detailed and bright rather than smeared by saturation. Feed each band's Drive from an envelope follower keyed off its own incoming transient (this plugin's Modulation matrix, Env source → Drive), so the distortion amount tracks the signal dynamically instead of sitting at one fixed level — genuinely program-dependent rather than a static multiband setting. Owned equivalent for a source described only as an unnamed "multi-band processor." → [[Saturation and Distortion]], [[Master Chain]] — Sage Audio, [Creating a Hip Hop Mastering Chain](https://www.youtube.com/watch?v=4JXwuR6AUok)
- **Isolate the kick/bass/snare fundamentals into one band, saturate that band a fair amount, and leave the highs completely untouched — a mastering-stage technique that also removes the need for oversampling.** Multiband-isolate the low fundamentals (kick, bass, snare) into their own band and drive it a fair amount; run zero saturation on the high range (cymbals, sibilance) since those harmonics turn ugly fast. Two compounding benefits: harmonics stay musical because they're only being generated from low, pitched, fundamental-heavy content, not noisy high-frequency material; and because only lows are saturated, none of the resulting harmonics can realistically go past the Nyquist limit, so **no oversampling is needed** at all for this band — which matters because oversampling's own linear-phase filter is a second source of transient smear, on top of what saturation itself costs. Genre-dependent drive amount: demoed heavier on a punk mix where extra distortion is expected; use it subtler on most other genres. → [[Master Chain]], [[Saturation and Distortion]], [[Clipping and Loudness]] — Sage Audio, [My Favorite Mastering Chain - Why Simple is Better](https://www.youtube.com/watch?v=bLVMsAwjRPw)
- **Subtle Tube or Subtle Tape + the Dynamic style as a limiting-free mastering loudness move — reproduces the parallel-compression trick without ever attenuating the signal first.** On a master, the Subtle Tube/Tape saturation types combined with the Dynamic per-band style push quieter detail up the same way parallel compression does (see [[Pro-C 2]]'s Dry Gain technique), achieved through the saturation curve + Dynamics interaction rather than compress-then-blend. Drive itself isn't needed for this effect specifically, only if extra harmonic content is also wanted. Because Saturn is multiband, the amount can vary per frequency range — more density on a band that needs it, none on a band that's already loud enough — rather than one blanket setting across the spectrum; oversampling and linear-phase processing are available if mix/dry-blend artifacts or aliasing become a concern at higher settings. → [[Clipping and Loudness]], [[Master Chain]], [[Multiband Compression]], [[Limiting]] — Sage Audio, [Stop Limiting Your Masters](https://www.youtube.com/watch?v=s_LDCzWx20g)
- **Dry saturation on a vocal's high end for air** — distort the top then shape; fewer phasing issues than a pure EQ boost — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck)
- **Subtle tube saturation on the master bus** for mix-bus color — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ)
- **Its auto-gain lets you hear the distortion, not just level** — crank it and only the distortion comes up — Disclosure, [Looking For Love](https://youtu.be/NlJt0pCptGk)

## Used in my chains

My **multiband saturation/color** stage — placed after compression (consistent drive level). Usually single-band Warm Tape/Tube at low drive for glue; multiband when a specific band needs harmonics (the 808 move):

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 5, color*: Warm Tape or Warm Tube, single band, Drive low, Mix 20–40% — density so the vocal reads on small speakers.
- **[[1 Digital Bass Track|Digital Bass Track]]** — *slot 2, harmonics (the 808 make-or-break)*: **multiband** — saturate the mid/high band of the 808 so it translates on phone speakers, keep the sub band clean/undriven.
- **[[1 Drums Snare-Clap Track|Snare-Clap]]** (3) / **[[2 Drums Group|Kit]]** (3) / **[[3 Drums Bus|Drums Bus]]** (4, final color) — tape/tube color, one of the stacked ~10%-harmonics saturation layers.
- **[[1 Synth Lead Track|Synth Lead Track]]** — *slot 3, edge*: more Drive for aggressive character on the lead.

## Key Parameters

```visual-key
image: Images/Saturn 2.png
coords: Images/Saturn 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ②–⑧ only — this capture is a **single-band** instance, so ① Bands/Crossovers has nothing on screen. Split the spectrum into bands and the per-band controls appear in the display above.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Bands / Crossovers | Up to 6 independent frequency bands, each saturated separately | Split the 808 so only mids/highs get driven and the sub stays clean | — |
| ② | Drive (per band) | Saturation amount for that band | Low (single-band) for glue; push one band for targeted harmonics | — |
| ③ | Type (saturation model) | The model per band (Warm Tube/Tape, Clean, Subtle, Broken, amps, transformers…) | Warm Tape/Tube for musical color; Broken/Rectifier for aggressive edge | — |
| ④ | Dynamics (per band) | How the saturation reacts to input level | Positive to bring saturation up on louder hits; negative to tame it | — |
| ⑤ | Mix (per band + global) | Parallel blend of saturated vs. dry | 20–40% on a vocal so it colors without smearing transients | — |
| ⑥ | Tone / Feedback | HP/LP per band + global feedback voicing | Roll lows off a driven band so harmonics don't muddy | — |
| ⑦ | Modulation (XLFO / Env / XY) | Mod matrix animating any parameter | Envelope-follow Drive so it saturates harder on peaks only | — |
| ⑧ | Output | Global makeup level | Level-match against bypass — saturation adds perceived loudness | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
