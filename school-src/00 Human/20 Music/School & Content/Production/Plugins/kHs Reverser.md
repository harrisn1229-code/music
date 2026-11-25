---
type: plugin
title: "kHs Reverser"
category: Reverb/Delay
vendor: "Kilohearts"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# kHs Reverser

![[Images/kHs Reverser.png]]

**Category:** Reverb/Delay
**Vendor:** Kilohearts

## What it is

An audio-reversing snap-in that plays back a buffered chunk of audio backwards in real time.

## What it's used for

Reverse-swell and reverse-crash effects (classic reverse cymbal/riser technique).

## FX chain notes

Stacked in a Snap Heap chain, often combined with reverb for reverse-reverb swells.

## Techniques

- **Reverse EVERY duplicated layer of a texture stack differently, not identically, so the copies read as distinct elements rather than one reversed sound repeated.** Building a multi-layer metallic texture ("metal two"), five-plus duplicates of the same source each get reversed with a different point/length per layer ("different reverse puppies... just mess them up") — alongside one layer left phase-inverted and another patched with a pasted-in section — so no two duplicates sound alike going into the pitch-shifting pass. *(qualitative — no Time/Crossfade values given, thin demonstrative transcript)* → [[Layering and Stacking]] — Shawn Everett (Mix with the Masters), [[Digital Audio Manipulation with Shawn Everett]]

## Key Parameters

```visual-key
image: Images/kHs Reverser.png
coords: Images/kHs Reverser.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Time | Length of the buffered chunk that gets reversed — the "4 / 16" readout; the note icon sets the sync division | Sync to a beat division for rhythmic reverses |
| ② | Crossfade | Smooths the loop point to avoid clicks | Increase if the reverse clicks at the seam |
| ③ | Mix | Dry/wet blend | Full on a send; blend as an insert texture |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
