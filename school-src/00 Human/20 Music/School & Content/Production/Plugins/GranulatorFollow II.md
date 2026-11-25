---
type: plugin
title: "GranulatorFollow II"
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

# GranulatorFollow II

![[Images/GranulatorFollow II.jpg]]
*Companion device shown as "GranulatorSlave II" (Robert Henke's official name for the Granulator II pack's follow/slave device) — same UI family.*

**Category:** Instrument
**Vendor:** Max for Live

## What it is

A companion/variant of Granulator II that follows an external control signal (e.g. envelope or MIDI) to drive grain position or parameters.

## What it's used for

Modulating granular playback position/parameters dynamically from another source for evolving textures.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/GranulatorFollow II.jpg
coords: Images/GranulatorFollow II.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Note In / Voices / Master | The follow source — incoming note, active-voice count, master link, and Hold | Set which Granulator voice/parameter this device tracks |
| ② | Pitch (Tune / Fine) | Derives/offsets the grain pitch per voice | Detune followed voices for a wider granular spread |
| ③ | FM (Freq) | Derives the FM frequency | Follow FM to add motion tied to the source |
| ④ | Grain | Derives the grain size/rate | Vary grain density per followed voice |
| ⑤ | File Position (FilePos / Spray) | Derives the playback position + spray | Offset read position per voice for evolving texture |
| ⑥ | LFO (Cycle / Position) | Derives the LFO rate + phase | Give each voice its own LFO drift |
| ⑦ | Scan (Factor) | Derives the auto-scan amount | Scale how fast each voice scans the sample |
| ⑧ | Volume | Derives the output level | Balance the followed voices |

## See also

- Newer alternative: **[[Granulator 3]]** — Ableton's redesigned single-device granular sampler with built-in per-key/LFO follow modulation, no separate Follow companion needed
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
