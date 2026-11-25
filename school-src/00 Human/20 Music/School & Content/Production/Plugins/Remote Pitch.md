---
type: plugin
title: "Remote Pitch"
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

# Remote Pitch

![[Images/Remote Pitch.png]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI utility for remotely controlling/reading pitch data from a connected controller.

## What it's used for

Routing external pitch control data into a Live session's mapped parameters.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Remote Pitch.png
coords: Images/Remote Pitch.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Sender / Receiver | Sets whether this instance **broadcasts** pitch or **receives** it. | Put a Sender on the source track and a Receiver on each track that should follow. That's the whole device. | — |
| ② | ID | The channel the sender and receiver talk on. | Matching IDs pair up. Use different IDs to run several independent pitch links in one set. | — |

> **Not on this panel:** the earlier table listed **Range** and **Map**. Neither exists — this is a two-control link utility.

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
