---
type: plugin
title: "ml.circular.doppler"
category: Pan/Imaging
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# ml.circular.doppler

![[Images/ml.circular.doppler.jpg]]

**Category:** Pan/Imaging
**Vendor:** Max for Live

## What it is

A Max for Live effect (from the 'ml.' object family) that simulates a circular/rotating doppler-shift panning effect.

## What it's used for

Creating rotating, doppler-style panning motion effects on a sound source.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/ml.circular.doppler.jpg
coords: Images/ml.circular.doppler.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Circular LFO (rate) | Phase/Shift + Bars/Beats sync — how fast the virtual source orbits | Sync to the beat for rhythmic whoosh-bys |
| ② | Orbit display | The circular path the source travels around the listener | Watch/drag the dot to see where the source is |
| ③ | Effect / Position / Gain | Overall effect amount, listener position, and output gain | Dial Effect back for a subtle sway; up for a full orbit |
| ④ | Modulation amounts (Pitch / Volume / Filter / Z-Axis) | How much doppler pitch/level/tone/depth shift is applied | More Pitch for an obvious whoosh; Z-Axis for near/far depth |
| ⑤ | 2nd LFO | A second orbit modulator for more complex motion | Layer a slower LFO for wandering, non-circular paths |
| ⑥ | L-R separation (Ratio) | Stereo width of the effect | Widen so the orbit reads clearly across the stereo field |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
