---
type: plugin
title: "Ghz CanOpener Studio 3"
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

# Ghz CanOpener Studio 3

![[Images/Ghz CanOpener Studio 3.png]]

**Category:** Utility
**Vendor:** Goodhertz

## What it is

Goodhertz's headphone crossfeed and stereo-correction plugin (CanOpener Studio), simulating natural speaker crossfeed for headphone monitoring and translating mixes for mono/phone playback checks.

## What it's used for

Checking how a mix translates on headphones vs speakers, and simulating natural crossfeed for headphone-only mixing sessions.

## FX chain notes

Used on the master bus during a monitoring/reference pass, not typically left on for the final render.

## Key Parameters

```visual-key
image: Images/Ghz CanOpener Studio 3.png
coords: Images/Ghz CanOpener Studio 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Crossfeed Amount | How much of each channel is fed to the opposite ear — the core of the headphone-to-speaker illusion. | This is the whole point of the plugin: it stops hard-panned material sounding like it's inside your head. 100% is the natural starting point. | — |
| ② | Angle | Simulated angle of the virtual speakers. | Narrower angles feel more like nearfields; wider feels like a bigger room. 60° approximates a standard listening triangle. | — |
| ③ | Bass / Treble | Equalisation of the monitoring path. | **Monitoring-only** — this shapes what *you* hear, not the mix. Use it to compensate for a known headphone tilt, never as a mix move. | — |
| ④ | L/R Balance | Left/right balance of the monitoring path. | Useful if your hearing isn't symmetrical — again, monitoring only. | — |
| ⑤ | Mono / Flip L/R / Polarity / Dim | Monitoring checks: collapse to mono, swap channels, invert polarity, or drop the level. | Mono and Polarity are the two mix-checking moves you'll use constantly — see [[Stereo Field]]. | — |
| ⑥ | Output / Compensation | Output level, with loudness compensation for the crossfeed processing. | Leave Compensation on so switching the plugin in and out isn't a level change. | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
