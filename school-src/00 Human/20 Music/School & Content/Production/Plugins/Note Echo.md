---
type: plugin
title: "Note Echo"
category: Reverb/Delay
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Note Echo

![[Images/Note Echo.png]]

**Category:** Reverb/Delay
**Vendor:** Max for Live

## What it is

A Max for Live MIDI effect that repeats incoming MIDI notes as rhythmic echoes (a MIDI-domain delay).

## What it's used for

Creating rhythmic MIDI note repeats/echoes that trigger the instrument downstream, rather than an audio-domain delay.

## FX chain notes

Sits before the instrument in the MIDI chain, generating the repeated notes the instrument then plays.

## Key Parameters

```visual-key
image: Images/Note Echo.png
coords: Images/Note Echo.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Time / Rate | MIDI note-repeat interval (synced) | Rhythmic MIDI echoes/arps |
| ② | Repeats | Number of echoed notes | More for longer trails |
| ③ | Velocity Decay | Falloff of repeated notes | Fade the echoes for realism |
| ④ | Pitch / Gate | Transpose + length of echoes | Octave/interval echoes |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
