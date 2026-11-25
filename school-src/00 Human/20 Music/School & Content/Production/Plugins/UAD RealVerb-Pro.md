---
type: plugin
title: "UAD RealVerb-Pro"
category: Reverb (Algorithmic)
vendor: "Universal Audio"
platform: UAD Console
status: owned
tags: [plugin, uad]
manual_enriched: false
video_enriched: true
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# UAD RealVerb-Pro

![[Images/UAD RealVerb-Pro.png]]

**Category:** Reverb (Algorithmic)
**Vendor:** Universal Audio — owned (confirmed 2026-07-17).

## What it is

UAD algorithmic reverb that models room shape and surface materials — blend two spaces and morph size/material for custom ambiences.

## What it's used for

Flexible general-purpose reverb: rooms, halls and plates from a single tweakable engine; design a bespoke space per source.

## Techniques

- **Layer multiple reverb lengths on one source — short/medium/long — rather than committing to a single reverb, then EQ the return (or send) for the final match against a reference.** Andy Wallace's reconstruction method: (1) start with just the longest room/hall return against the dry source, (2) judge what's missing by ear (usually "presence"), (3) blend in a second, shorter reverb layer to restore it, (4) EQ the combined reverb return brighter to close the gap, (5) A/B continuously against a printed reference throughout. **Routing rule for the EQ step:** EQ the RETURN when the reverb is dedicated to one source; EQ the SEND instead when the same reverb bus is shared by multiple sources, so the shared return stays neutral for everything else feeding it. → [[Reverb]], [[Depth and Space]], [[2 Guitar Group|Guitar Group]] — Mix with the Masters (Andy Wallace), [[Jeff Buckley's guitar sound with Andy Wallace]]
- **A small, contained room setting for a "played next door" vintage-sample vibe** — third stage of a vintage-sample-flip chain (valve compressor → EQ → room reverb → denoiser-as-lowpass) on a dark, soft Rhodes sample (*Percocet and Stripper Joint*, Future); the room read is deliberately small/contained/slightly muffled rather than a hall or plate — sounding like the source is being played in an adjacent room, not the same space as the listener. *(general starting point — room shape/decay/predelay not given on screen; small Room Shape, short-to-moderate Decay, and a darkened EQ are the sensible starting point for the "next door" read)* → [[UAD Tube-Tech CL 1B mkII]], [[EQ Eight]], [[RX Guitar De-noise]], [[Sampling and Sound Selection]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

## Key Parameters

```visual-key
image: Images/UAD RealVerb-Pro.png
coords: Images/UAD RealVerb-Pro.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Room Shape / Material | Models the space geometry + surface materials | Build a custom room's size and reflectivity |
| ② | Decay | Tail length | Short for ambience; long for space |
| ③ | Predelay | Gap before the reverb | Keeps the dry source clear |
| ④ | EQ | Tone of the reverb | Darken to sit it behind the mix |
| ⑤ | Mix | Dry/wet blend | 100% on a send |

## See also

- Plugins: [[UAD Pure Plate Reverb]] · [[Pro-R 2]] · [[UAD Cooper Time Cube Mk II]]
- Palette: [[Sound Palette]]

> [!note] Stub — created 2026-07-17 (spec-129, confirmed-owned UAD). Enrich with `/music-enrich` for key settings + chain notes.
