---
type: plugin
title: "Ghz Tone Control 3"
category: EQ
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Ghz Tone Control 3

![[Images/Ghz Tone Control 3.png]]

**Category:** EQ
**Vendor:** Goodhertz

## What it is

Goodhertz's Tone Control, a simplified 3-band-style tone-shaping EQ modeled on classic hi-fi tone controls.

## What it's used for

Quick, musical broad-strokes tonal shaping without a full parametric EQ's complexity.

## FX chain notes

A simple tonal pass on a track or bus.

## Used in my chains

The **broad "seat it" tone stage** — a hi-fi tilt/shelf EQ used late to sit a source against the vocal, not to carve surgically (that's [[Pro-Q 4]]'s job):

- **[[1 Electric Bass DI Track|Electric Bass DI Track]]** — *slot 4, broad seat*: darker (Bass +1.5, Treble −1) for Motown support, brighter (Treble +1.5) for melodic/McCartney lines.
- **[[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]** — *slot 5, broad tone*: Treble −1.5 dB with a low Treble Slope so the darkening is broad rather than shelf-y, and **Master Air −20 to −30%** to push the guitar back behind the vocal — guitars give up 2–5 kHz where the vocal lives ([[Masking and Carving]]).
- **[[1 Electric Guitar DI Track|Electric Guitar DI Track]]** — *slot 4, broad seat*: darker/brighter to carve the DI lane apart from the mic'd guitar when both are in the song.

## Key Parameters

```visual-key
image: Images/Ghz Tone Control 3.png
coords: Images/Ghz Tone Control 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Bass Gain | Low-shelf gain (boost/cut). | +1 to +2 dB for weight/warmth; cut to de-mud a boomy source. | — |
| ② | Bass Frequency | Corner frequency of the low shelf. | Lower for sub weight only; higher to warm the low-mids. | — |
| ③ | Bass Slope | Steepness of the bass shelf's transition. **At 0% the transition band is very smooth, gradually crossing several octaves**; higher is tighter and more targeted. | Leave it near 0% when you want a broad tonal tilt that doesn't announce itself; raise it when the boost needs to stop before it reaches the low-mids. | — |
| ④ | Treble Gain | High-shelf gain (boost/cut). | Cut 1–2 dB to seat a bright source behind the vocal; boost for air. | — |
| ⑤ | Treble Frequency | Corner frequency of the high shelf. | Set above the vocal's presence band so a boost adds air rather than harshness. | — |
| ⑥ | Treble Slope | Steepness of the treble shelf's transition — the mirror of Bass Slope. | Same logic: low slope for a gentle overall brightening, high slope to keep the lift up in the air band only. | — |
| ⑦ | Master Air | Refines the **air band** — most obvious above 10 kHz but perceptually affects the whole spectrum. **−100% pushes a sound back in the mix and duller; +100% brings it closer, newer, more detailed.** | The most useful control here and the one people miss. Use it as a front/back depth control, or as an "old vs new" gesture, without touching the shelves at all. | — |
| ⑧ | Master Mix | Scales the whole tone-shaping. **At 200% the Bass Gain, Treble Gain and Master Air are effectively doubled.** Does **not** affect Low Cut or High Cut. | Dial the shape you want at 100%, then use Mix as a single "more/less of that" control instead of re-balancing three sliders. | — |
| ⑨ | Low Cut / High Cut | Independent HPF and LPF, each with its own frequency and slope. Unaffected by Master Mix. | Because Mix doesn't scale them, these stay put as hard boundaries while everything else is dialled — set them once and shape above/below. | — |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
