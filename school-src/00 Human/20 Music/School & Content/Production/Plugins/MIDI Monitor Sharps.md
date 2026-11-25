---
type: plugin
title: "MIDI Monitor Sharps"
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

# MIDI Monitor Sharps

![[Images/MIDI Monitor Sharps.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A variant of MIDI Monitor that displays note names using sharps rather than flats.

## What it's used for

Same MIDI-debugging role as MIDI Monitor, with sharp-based note naming preference.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/MIDI Monitor Sharps.jpg
coords: Images/MIDI Monitor Sharps.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | MIDI readout | Note / Root / Chord / Velocity, with note names spelled using sharps (C# vs. Db) | Read the exact notes/chord in sharp spelling |
| ② | Message filters | Which message types are shown (Note pitch / CC / Pitchbend / Aftertouch / SysEx) | Filter to just CC to debug a controller mapping |
| ③ | View tabs (Note / Flow) | How the MIDI data is displayed | Flow view to watch the message stream over time |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
