---
type: plugin
title: "Group Humanizer"
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

# Group Humanizer

![[Images/Group Humanizer.jpg]]

> [!warning] Unconfirmed
> Shipped across several .amxd files (audio version, human input, mean follower, player, settings) — documented here as one device; some sub-component names were partially cut off in the source screenshot.

**Category:** Utility
**Vendor:** Max for Live

## What it is

A multi-part Max for Live device set (shipped as several linked .amxd components — audio version, human input, mean follower, player, and settings modules) that adds human-feel timing/velocity variation across a group of tracks.

## What it's used for

Humanizing quantized MIDI/audio groups so multiple tracks feel like they're played by one performer rather than perfectly locked to the grid.

## FX chain notes

Applied across a group bus or linked tracks; the settings module configures the amount/character of humanization applied by the others.

## Key Parameters

```visual-key
image: Images/Group Humanizer.jpg
coords: Images/Group Humanizer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Timing error (std dev) | Random per-note timing deviation for each part | Raise for a looser, more human feel; low to stay tight |
| ② | Motor error (std dev) | Models unintended motor/performance jitter | A touch adds realism beyond pure timing noise |
| ③ | Listening coefficient W | How strongly this part follows the others' timing | High = players lock to each other's groove |
| ④ | Influence coefficient I | How strongly this part pulls the others | Give the "leader" part more influence over the group |
| ⑤ | Offset | Fixed timing offset per channel | Push a part slightly ahead/behind for feel |
| ⑥ | Self-regulation mode | Reference (metronome) vs. free-run; "adjust ableton clock" syncs to Live | Metronome to keep the group anchored to the grid |
| ⑦ | Threshold | Regulation threshold in ms | Sets how far drift is allowed before it's pulled back |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
