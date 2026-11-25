---
type: plugin
title: "Align Delay"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# Align Delay

![[Images/Align Delay.png]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live utility device that delays a signal by a precise, adjustable amount (samples or ms) to correct phase/timing alignment between tracks.

## What it's used for

Time-aligning mic'd sources (e.g. DI vs amp, close vs room mic) so they sum without phase cancellation.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Techniques

- **Owned best-match for the Eventide Precision Time Align used to recreate analog tape flanging — automate the Delay parameter sweeping a couple of milliseconds back and forth around zero on a duplicate of the exact same audio.** Tom Lord-Alge's modern recreation of classic half-inch tape varispeed flanging: duplicate a track to two identical copies, insert a delay-compensation plugin on one (he names the Eventide Precision Time Align specifically because it can push delay in *either* direction around zero, not just add positive delay), set it to zero delay, then **automate the delay value sweeping by a couple of ms either side of zero** — the flange "jet engine" sweep appears purely from that automated near-zero modulation between two otherwise-identical signals: "you just automate the movement — tape flange in a DAW, solved." This plugin's own Delay parameter (in **ms**, not samples) is the direct owned mechanism; the one gap is whether it can express negative/pre-delay the way the named unit does — check before relying on it for the exact pre/post-delay flip TLA demonstrates, and fall back to a send/return trick (advance one copy instead of delaying the other) if it can't. → [[Modulation]], [[Automation]], [[Tape Flanging Emulation]], [[Plugin Wishlist]] — Mix with the Masters (Tom Lord-Alge), [[Tom Lord-Alge's secret mixing techniques]]

## Used in my chains

Always **slot 1** on a two-mic source — align before anything else, because every downstream move assumes a phase-coherent signal.

- **[[1 Acoustic Guitar Track|Acoustic Guitar Track]]** — on the [[Shure SM57]] body mic vs. the condenser: units = samples, ~13 to start, null-tuned per take.
- **[[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]** — on the [[Neumann TLM 102|TLM]] track if spaced from the [[Shure SM57|57]]: samples, nudge until the low end is fullest.

Only needed when two mics capture one source; skip on DI-only / single-mic takes.

## Key Parameters

```visual-key
image: Images/Align Delay.png
coords: Images/Align Delay.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Delay | The delay amount applied to the incoming signal, to time-align it with another track | Nudge until the summed low end is fullest; or flip polarity, null the two mics to find the exact offset, then flip polarity back | — |
| ② | Unit (ms / samples / distance) | Expresses the delay amount as milliseconds, samples, or physical distance | **Samples** for sample-exact DI-vs-amp / spaced-pair alignment; **distance** when you know the mic spacing in inches/cm | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
