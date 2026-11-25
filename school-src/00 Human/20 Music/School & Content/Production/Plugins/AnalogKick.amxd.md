---
type: plugin
title: "AnalogKick.amxd"
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

# AnalogKick.amxd

![[Images/AnalogKick.amxd.jpg]]

**Category:** Instrument
**Vendor:** Max for Live

## What it is

A Max for Live synthesized kick drum instrument (distinct from the official Ableton Drum Synths pack), modeling analog kick drum circuitry.

## What it's used for

Synthesized analog-style kick drums as an alternative sound source to DS Kick or sampled kicks.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/AnalogKick.amxd.jpg
coords: Images/AnalogKick.amxd.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Amp Envelope | Volume Atk/Dcy (+ Hold) — the loudness shape of the kick | Short decay for tight; longer for boom |
| ② | Freq Envelope | Atk/Dcy of the pitch sweep — the kick's pitch-drop | Faster drop for click/punch |
| ③ | Freq Min / Max | Start and end pitch of the sweep (e.g. 56 → 224 Hz) | Tune Min to the sub; raise Max for more click |
| ④ | Tune / Base / KeyTrk | Base pitch, root note, and key-tracking amount | Tune to the song key; KeyTrk to follow MIDI |
| ⑤ | FM (Harm / Depth / Env) | FM section adding harmonic content/metallic click | Add depth for a beater click on top |
| ⑥ | Mix (Beater / Osc) | Blend of the beater (click) vs. oscillator (body) | More beater for attack; more osc for weight |
| ⑦ | Distort | Saturation stage — Off / Dist 1 / Dist 2 + Drive | Grit for translation on small speakers |
| ⑧ | EQ (Low / High) | Built-in tone shaping of the kick | Shelf lows for weight, highs for click |
| ⑨ | Presets / A–B | Preset browser (808 …) and an A/B morph pair | A/B two kicks and morph between them |

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
