---
type: plugin
title: "Chord Generator"
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

# Chord Generator

![[Images/Chord Generator.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live MIDI effect that takes an incoming MIDI note and generates a full chord voicing from it based on a selected chord type/scale.

## What it's used for

Quickly auditioning chord progressions or turning single-note MIDI input into full chords for pads and keys.

## FX chain notes

Sits before the instrument in a MIDI chain, generating the notes the instrument then plays.

## Techniques

- **"Multi-textural" hi-hat/stab via a chain selector of Chord presets** — build a rack containing many Chord Generator instances, each set to a different chord-type preset, chosen through a chain selector (a "chord selector"), with the Strum parameter (limited to roughly ±50) and Tension/Crescendo also macro-mappable — strumming an otherwise plain hi-hat or stab sample through this gives it an expressive, multi-note "flare." The same rack repurposes directly as a "snare enhancer" by applying the identical chain-selector-of-chord-presets trick to a different drum role. → [[Randomized Rack Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)

## Key Parameters

```visual-key
image: Images/Chord Generator.jpg
coords: Images/Chord Generator.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Chord Type / Extensions | Major/minor base plus the extension grid (6, 7, maj7, add9, b5, #5, b9, #9, 11, 13) | Play one key → a full voiced chord |
| ② | Omit 3 | Drops the third from the chord | On for power-chord / sus-style voicings |
| ③ | Inversion | R / 1 / 2 / 3 inversion buttons (+ Random) | Invert to keep smooth voice-leading between chords |
| ④ | Disposition | Spreads the voicing from Closed to Open | Open for wide, spread chords; closed for tight clusters |
| ⑤ | Pitch offsets | Per-voice transpose (Original + Pitch 1–4) | Octave a voice up/down to reshape the spread |
| ⑥ | Random | Randomizers for chord, inversion, and pitch | Roll for happy-accident voicings |

## See also

- Related: [[Chord]] — Ableton's stock chord device (Learn mode + preset browser + Strum/Tension/Crescendo), a different control set from this Max for Live pack's extension/inversion/disposition grid
- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
