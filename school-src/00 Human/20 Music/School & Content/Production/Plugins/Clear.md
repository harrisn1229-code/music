---
type: plugin
title: "Clear"
category: Pitch/Vocal
vendor: "Supertone"
tags: [plugin]
depth_linked: true
owned: unknown
owned_source: TRIAL — capture shows a "TRIAL" badge in the header (2026-07-20)
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Clear

![[Images/Clear.png]]

**Category:** Pitch/Vocal
**Vendor:** Supertone

## What it is

Supertone's AI-powered vocal noise-reduction/clarity plugin (from the makers of Supertone Shift), using neural processing to isolate and clean vocal recordings.

## What it's used for

Cleaning up noisy vocal recordings (room noise, hiss, bleed) using AI-driven separation.

## FX chain notes

Used early in a vocal cleanup pass, before creative EQ/compression.

## Key Parameters

```visual-key
image: Images/Clear.png
coords: Images/Clear.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Voice | Level of the separated **voice** stem. | This is a source-separation tool, not a de-noiser — it splits the incoming audio into stems and lets you rebalance them. Push Voice up and Ambience down to pull a vocal out of a noisy recording. | — |
| ② | Ambience | Level of the separated **background/ambience** stem — room, noise, bleed. | Pull it down to clean up a take; keep some in so the result doesn't sound vacuum-sealed. | — |
| ③ | Voice Reverb | Level of the reverb **that was on the voice**, separated out from the dry voice itself. | The genuinely clever one: it lets you keep a vocal's original room while removing the background, or strip the room and leave the dry voice. | — |
| ④ | Solo / Mute / Invert *(per stem)* | `S`, `M` and `INVERT` on each of the three stems. | Solo each stem first to hear what the separation actually caught before you start balancing. Invert is for checking what's been removed. | — |
| ⑤ | Mono | Processes in mono. | — | — |
| ⑥ | Eco Mode | Lower-CPU processing mode. | Turn on while arranging, off for the final render — separation quality is CPU-dependent. | — |
| ⑦ | Split View | Shows the three stems as separate spectrum displays rather than stacked. | — | — |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
