---
type: plugin
title: "MPE Control"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# MPE Control

![[Images/MPE Control.png]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI utility for managing MPE (MIDI Polyphonic Expression) channel routing and per-note control data.

## What it's used for

Setting up and troubleshooting MPE controller-to-instrument routing.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Techniques

- **Slide → Sample Offset as a makeshift sample-start macro** — [[Sampler]] has no native macro-mappable start-point control, and the common workaround (Velocity in Fixed mode → Sample Offset) conflicts with drums that already use velocity for dynamics. Instead, group MPE Control into its own rack and on its Slide section map both the minimum and maximum to a single macro — moving that macro now scrubs the target Sampler's start point. Save the rack once as a reusable utility rather than rebuilding it per kit. → [[Sampler]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)

## Key Parameters

```visual-key
image: Images/MPE Control.png
coords: Images/MPE Control.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Pressure / Slide / Bend | Manages per-note MPE expression data | Shape/scale MPE from an MPE controller |
| ② | Range / Curve | Scaling of each expression axis | Tame or exaggerate expression |
| ③ | Routing | Where the MPE data is sent | Map to instrument destinations |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
