---
type: plugin
title: "GranulatorInput II"
category: Instrument
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# GranulatorInput II

![[Images/GranulatorInput II.jpg]]

**Category:** Instrument
**Vendor:** Max for Live

## What it is

A companion/variant of Granulator II that grains a live audio input in real time rather than a pre-loaded sample.

## What it's used for

Real-time granular processing of an incoming signal (mic, synth, etc.) for live texture generation.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/GranulatorInput II.jpg
coords: Images/GranulatorInput II.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Granulator Connection (Offline / Connected) | Links this helper to a Granulator II instance so it can granulate the live input | Set Connected and pick the target Granulator |
| ② | Buffer Size | Length of the live-input buffer that gets captured (e.g. 4000 ms) | Longer buffer to freeze a bigger phrase |
| ③ | Grab | Captures the current live input into the buffer for Granulator to read | Hit Grab to freeze whatever is playing into a granular source |

## See also

- Newer alternative: **[[Granulator 3]]** — Ableton's redesigned single-device granular sampler with live-input capture built in, no separate Input companion needed
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
