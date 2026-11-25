---
type: plugin
title: "Remote Pitch - MPE"
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

# Remote Pitch - MPE

![[Images/Remote Pitch - MPE.png]]
*Remote Pitch's UI shown (Remote Pitch - MPE's interface is nearly identical).*

**Category:** Utility
**Vendor:** Max for Live

## What it is

An MPE-aware variant of Remote Pitch that reads per-note pitch-bend data from an MPE controller.

## What it's used for

Routing per-note MPE pitch data into mapped parameters for expressive control.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Remote Pitch - MPE.png
coords: Images/Remote Pitch - MPE.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Per-note Pitch Bend | Reads per-note MPE pitch-bend data | MPE-aware pitch control |
| ② | Range | Bend range | Match the controller's MPE range |
| ③ | Map | Destination | Drive per-note targets |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
