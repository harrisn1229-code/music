---
type: plugin
title: "External Instrument"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# External Instrument

![[Images/External Instrument.png]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

A routing device that sends MIDI out to (and returns audio from) a hardware synth or another application, letting outboard gear sit inside an Ableton instrument chain.

## What it's used for

Integrating hardware synths/modules into the Live session so their audio can be recorded, processed, and automated like any other track.

## FX chain notes

Sits where an instrument would go in the chain; the return audio is then processed with the same effects chain as a normal instrument track.

## Key Parameters

```visual-key
image: Images/External Instrument.png
coords: Images/External Instrument.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | MIDI To | Routes MIDI out to hardware/another track | Play outboard synths inside the Live chain |
| ② | Audio From | Returns the hardware's audio into Live | Set the input the synth returns on |
| ③ | Gain / Latency | Return level + latency compensation | Calibrate so the hardware sits in time and level |

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
