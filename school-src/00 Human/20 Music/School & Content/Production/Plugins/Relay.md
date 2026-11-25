---
type: plugin
title: "Relay"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Relay

![[Images/Relay.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

iZotope's simple, transparent gain-control/level-matching plugin used to A/B different processing chains at matched loudness.

## What it's used for

Level-matching a bypass comparison so A/B decisions aren't biased by loudness differences.

## FX chain notes

Used alongside other plugins purely for gain compensation, not tonal processing.

## Key Parameters

```visual-key
image: Images/Relay.png
coords: Images/Relay.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Gain | Level trim (the fader) | Gain-stage a channel inside the iZotope mix suite |
| ② | Pan | Stereo position | Place the channel L/R |
| ③ | Width | Stereo width of the channel | Narrow lows / widen tops before the bus |
| ④ | Peak / RMS meters | Level metering; Relay also links the channel into the iZotope mix suite for inter-plugin communication | Use as the first/last insert so Neutron/Ozone can "see" this track |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
