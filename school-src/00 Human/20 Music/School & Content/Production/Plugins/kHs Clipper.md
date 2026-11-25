---
type: plugin
title: "kHs Clipper"
category: Compressor/Limiter
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# kHs Clipper

![[Images/kHs Clipper.png]]

**Category:** Compressor/Limiter
**Vendor:** Kilohearts

## What it is

A hard-clipping snap-in for adding loud, aggressive clipping distortion/limiting.

## What it's used for

Aggressive loudness/distortion character on drum busses and masters (trap/EDM-style clipped mixes).

## FX chain notes

Placed near the end of a Snap Heap chain, often just before a limiter.

## Techniques

- **Clip just enough to add white noise on the transient, on purpose — it's what lets more limiting run afterward without the transient reading as squashed.** Set this stage to clip transients only just past the point where they start generating a touch of white noise as they cross the threshold — the peak itself gets controlled the same as any clip, but the added noise makes the transient still *sound* present rather than flattened. Run this ahead of the limiting stages specifically: because the ear reads the transient as intact, the following limiter(s) can be pushed harder for extra loudness without the mix reading as more squashed than it did before the clip. → [[Master Chain]], [[Clipping and Loudness]] — Sage Audio, [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34)
- **Same noise-as-exciter mechanism, reframed around loudness rather than brightness — a second angle on the entry below.** A hard clipper distorts transients whenever they cross a threshold; the resulting white-noise-like content generated at each clipped transient makes that transient read as *more* apparent even though its peak is being attenuated — and, framed this time around perceived loudness rather than brightness, nets an overall loudness increase on the master. Corroborates the entry below from a different source and angle. Source describes this on an unnamed "hard clipper... with some detail preservation" — distinct enough from this plugin's actual 3-knob panel (In Gain/Knee/Out Gain, no "detail" control) that the exact product is unconfirmed; the *mechanism* is transcript-grounded and generalizes to this device regardless. → [[Clipping and Loudness]], [[Master Chain]] — Sage Audio, [Creating a Hip Hop Mastering Chain](https://www.youtube.com/watch?v=4JXwuR6AUok)
- **The genre-right call for an intentionally aggressive master (EDM: aggressive kick/snare/pluck) — reach for this device over tape emulation.** Clipping imparts distortion to each transient, which retains the genre's intended aggression; tape emulation's subtle wave-shaping and high-frequency attenuation would counteract it instead. The opposite call (gentle genres like jazz, where tape is right and this device would be a bad fit — unwanted transient distortion, no need for clip-level loudness) is logged on [[Kramer Tape]]. → [[Critical Listening for Mastering]], [[Saturation and Distortion]], [[Clipping and Loudness]] — Sage Audio, [Before You Master Music, Watch This](https://www.youtube.com/watch?v=tEqcGkgHgqc)
- **Clipping adds high-frequency noise that functions like an exciter — the mechanism behind why it *helps* transient perception instead of hurting it.** Every time the threshold is crossed, the clip introduces a form of high-frequency noise/harmonic content on the transient — this brightens the master overall and, counter-intuitively, makes transients easier for the ear to identify against the rest of the mix, even though the peak is technically being shaved. Reinforces this device's existing "clip micro-transients, they're inaudible to remove" framing with the added-brightness half of the story. → [[Clipping and Loudness]] — Sage Audio, [Mastering Loud But Not Squashed](https://www.youtube.com/watch?v=YJVE4_CQ9Ts)

## Used in my chains

My **transient clipper** (owned substitute for Gold Clip) — shaves 1–2 dB of peak so the limiter works less and the mix gets real loudness. Clipping trades inaudible peak (masked by the transient) for headroom:

- **[[Master Chain]]** — *slot 7, clip the peaks*: **Hard** clip, shave 1–2 dB, oversampling on — but **verify with a true-/sample-peak meter** that downsampling isn't recreating overs. ([[Pro-L 2]] transparent mode is the fallback if a guaranteed true-peak ceiling is needed.)
- **[[1 Drums Kick Track|Drums Kick Track]]** — *slot 4, clip*: shave 1–2 dB off the kick peak, oversampling on to hold true peak on the shaved transient — the modern hip hop/EDM knock.

## Key Parameters

```visual-key
image: Images/kHs Clipper.png
coords: Images/kHs Clipper.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | In Gain | Drive into the clipper — how hard the signal hits the ceiling. | This *is* the clip amount. There's no separate threshold: you push level in and the clipper catches what goes over. | — |
| ② | Knee | Hardness of the clipping curve, from a hard corner to a soft rounded knee. | Hard for transparent peak-catching on a kick; soft when you want the clip to add harmonic thickness rather than just limit. | — |
| ③ | Out Gain | Output level after clipping. | Pull down by roughly what you pushed In Gain up, so the A/B is about the clipping and not the loudness. | — |

> **Not on this panel:** the earlier version of this table listed **Bias** and **Oversampling**. Neither is a control here — kHs Clipper is three knobs. Oversampling is a Kilohearts host/Snap Heap setting, not part of the plugin.

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
