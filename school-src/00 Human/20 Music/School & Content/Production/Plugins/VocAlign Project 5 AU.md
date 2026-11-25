---
type: plugin
title: "VocAlign Project 5 AU"
category: Pitch/Vocal
vendor: "Synchro Arts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# VocAlign Project 5 AU

![[Images/VocAlign Project 5 AU.png]]

**Category:** Pitch/Vocal
**Vendor:** Synchro Arts

## What it is

Synchro Arts' automatic dialogue/vocal alignment plugin, time-aligning a target track to a reference track's timing (e.g. ADR to production audio, or doubled vocal takes).

## What it's used for

Aligning doubled vocal takes or ADR dialogue precisely to a reference track's timing without manual editing.

## FX chain notes

Used as a timing-correction stage before pitch correction and mix processing.

## Used in my chains

My **vocal-alignment** tool — time-warps a dub/stack to match a guide take so layers read as one thick voice (the master width/fusion control on stacks):

- **[[1 Ensemble Stack Track|Ensemble Stack Track]]** — *slot 2, timing*: **doubles align to the take they're doubling** (not one global reference) so each pair fuses; for a unison ensemble with no source, pick one layer as reference and align the rest to it.

> Owned substitute for [[VocAlign Ultra AU]] (which hangs Live on automated load) — Project 5 does the same align-a-dub-to-a-guide job.

## Key Parameters

```visual-key
image: Images/VocAlign Project 5 AU.png
coords: Images/VocAlign Project 5 AU.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Guide / Dub assignment | Sets which take is the reference and which gets aligned | Align each double to the take it's doubling, not a global guide | — |
| ② | Align | Runs the time-warp to match the dub to the guide | The core action — tightens timing so stacks fuse | — |
| ③ | Tightness / Flex | How rigidly the dub snaps to the guide | Tightest for a fused single voice; looser to keep some natural spread | — |
| ④ | Energy / Time edit | Fine-tunes the alignment envelope | Tweak if a word over-tightens and loses its natural attack | — |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
