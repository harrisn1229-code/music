---
type: plugin
title: "Microtonic Multi"
category: Instrument
vendor: "Sonic Charge"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Microtonic Multi

![[Images/Microtonic Multi.png]]
*Sonic Charge's Microtonic UI (Microtonic Multi is the same interface, routed to multiple outputs).*

**Category:** Instrument
**Vendor:** Sonic Charge

## What it is

A multitimbral/multi-output variant of Microtonic, allowing each drum voice to be routed to a separate output for individual processing.

## What it's used for

Same synthesized drum-kit role as Microtonic, with per-voice routing for independent mixing.

## FX chain notes

Each voice typically routes to its own return/bus for individual EQ and compression.

## Key Parameters

```visual-key
image: Images/Microtonic Multi.png
coords: Images/Microtonic Multi.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Drum channels (×8) | Eight independent drum voices (1–8), selected across the top | Pick a channel, then design that hit |
| ② | Oscillator | Per-drum pitched tone — waveform, freq, pitch-mod amount/rate | Fast pitch-drop on the kick; tuned tone on toms |
| ③ | Noise | Per-drum noise layer — filter mode/freq/Q + its own envelope | Filtered noise for snares/hats; envelope shapes the tail |
| ④ | Mix / EQ / Distort | Osc-vs-noise blend, EQ, and distortion for the selected drum | Distort for grit; EQ to place the hit |
| ⑤ | Output (A / B) | Multi-out routing — send each drum to its own output | Route kick/snare/hats to separate tracks/chains |
| ⑥ | Pattern sequencer | The 16-step trig/acc/fill/len grid (patterns a–p) + swing/fill | Program the groove; add swing and fills |

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
