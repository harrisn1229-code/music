---
type: plugin
title: "Ghz Loudness 3"
category: Utility
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ghz Loudness 3

![[Images/Ghz Loudness 3.png]]

**Category:** Utility
**Vendor:** Goodhertz

## What it is

Goodhertz's Loudness Meter, providing LUFS integrated/short-term/momentary loudness metering to modern streaming-loudness standards.

## What it's used for

Checking a master's loudness against streaming platform targets (Spotify, YouTube, etc.) during mastering.

## FX chain notes

Placed at the very end of the master chain purely for metering — it doesn't process the signal.

## Key Parameters

```visual-key
image: Images/Ghz Loudness 3.png
coords: Images/Ghz Loudness 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Target | The LUFS loudness target you're aiming at (shown on the left scale). | Set this to the platform spec, then let the meter tell you how far off you are — this is a **measurement + trim** tool, not a limiter. It won't squash anything. | — |
| ② | Trim | Output gain trim, in dB. | The correction. Meter first, then trim — never trim by ear against a target. | — |
| ③ | True Peak (LT) | True-peak reading in dBTP, independent of the LUFS number. | Loudness and true peak are different problems: you can hit a LUFS target and still clip inter-sample. Watch both. | — |
| ④ | Momentary / Short Term / Long Term | The three LUFS integration windows. | Long Term for the whole-programme number that platforms use; Short Term while checking a section; Momentary for spotting transient spikes. | — |
| ⑤ | Apply (ST) | Applies the trim needed to hit Target based on the Short Term reading. | The one-click version — measure a representative section, hit Apply, done. | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
