---
type: plugin
title: "AM-Bird"
category: Modulation
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# AM-Bird

> [!warning] Unconfirmed
> Exact origin/vendor of this device could not be confirmed from the screenshots — included as-owned; verify function in Live before relying on it.

**Category:** Modulation
**Vendor:** Max for Live

## What it is

A Max for Live **amplitude / ring modulator** with musical interval selection — modulation can be locked to an octave, fifth, fourth or third so the resulting sidebands stay in harmony, with keyboard read-outs predicting where they land.

## What it's used for

Sound-design texture layers and ambient ear candy in a mix.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/AM-Bird.png
coords: Images/AM-Bird.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Amt | Depth of the amplitude modulation. | The main control — AM-Bird is a **ring/amplitude modulator**, not a granular device. Amt is how much of the modulated signal you hear. | — |
| ② | ModFreq | Modulation frequency in Hz, free-running. | Low frequencies give tremolo; push into the audio range and it becomes ring-mod sidebands. | — |
| ③ | Wave | Modulator waveform (the four shape buttons). | Sine for smooth ring-mod; the squarer shapes for gated, choppy modulation. | — |
| ④ | Interval (Oct / P5 / P4 / M3 / m3) | Sets the modulation to a **musical interval** rather than an arbitrary frequency. | This is what makes it usable on tuned material — pick an interval and the sidebands land in harmony instead of clashing. The reason to reach for this over a plain ring mod. | — |
| ⑤ | Sideband (Upper / Downer) | Which sideband is kept — above or below the carrier. | Upper reads brighter/bell-like; Downer adds weight underneath. | — |
| ⑥ | DutC | Duty cycle of the modulator waveform. | Skews the modulation's on/off ratio — asymmetric settings give a stuttered, rhythmic feel. | — |
| ⑦ | MPortam | Portamento on the modulation, in ms. | Smooths jumps when the interval changes, so switching intervals glides instead of clicking. | — |
| ⑧ | Predicted Note / Sideband Harmonies | The two keyboard read-outs — where the sidebands will land, and what harmony they imply. | Read-only, and genuinely useful: check here before committing so you know the modulation is in key. | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
