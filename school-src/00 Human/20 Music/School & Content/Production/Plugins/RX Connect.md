---
type: plugin
title: "RX Connect"
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

# RX Connect

![[Images/RX Connect.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module/plugin that round-trips audio between a DAW and the standalone RX application for deeper repair work. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Sending a problem section of audio to the full RX app for advanced repair, then returning it seamlessly to the Ableton session.

## FX chain notes

Inserted at the point in the chain needing RX's standalone repair tools.

## Key Parameters

```visual-key
image: Images/RX Connect.png
coords: Images/RX Connect.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Reference (↑) | Sends the audio to the RX standalone app as a reference (send only) | Push a clip into RX to compare against while editing |
| ② | Repair (↑↓) | Round-trips audio to RX and back — send, edit there, receive the repaired result | The main workflow: fix in RX, get the cleaned audio back in the host |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
