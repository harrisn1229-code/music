---
type: plugin
title: "Envelope MIDI"
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

# Envelope MIDI

![[Images/Envelope MIDI.jpg]]

**Category:** Utility
**Vendor:** Max for Live

> [!warning] Corrected 2026-07-20 — this page previously described an audio-envelope-follower ("converts an audio envelope into MIDI CC"). That's [[Envelope Follower]]. **Envelope MIDI** is a **note-triggered modulation envelope**: you Map it to a parameter and it fires a drawable ADSR on each MIDI note.

## What it is

A Max for Live **modulation-envelope generator** (from the Mapping/Modulators pack) — Map it to any parameter and it outputs a drawable, MIDI-note-triggered ADSR envelope to modulate that target.

## What it's used for

Per-note modulation sweeps on a mapped parameter (filter cutoff, send level, device knob) — a bespoke ADSR you can draw, triggered by the notes you play.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Techniques

- **Fake an ADSR on any plugin that doesn't have one, by mapping Envelope MIDI to a following Utility's Gain** — some instrument/effect plugins (a sustain-heavy synth-string emulation, e.g.) expose no Sustain/Release control at all, so a note just rings until it's manually stopped; insert a [[Utility]] after that plugin, map Envelope MIDI's output to Utility's **Gain** knob (via the standard Map button), and shape Envelope MIDI's own ADSR stages — the result behaves as if the original plugin had a real amp envelope, entirely from the outside. A general fix, not specific to any one troublesome plugin. → [[Utility]] — You Suck at Producing (Underbelly ft. Pixelwax), [Sound Design walkthrough of my new song with Pixelwax!](https://www.youtube.com/watch?v=IOc-lDT6_ZA)
- **Pitch envelope (Peak ≈48) as a reusable laser-SFX knock, plus a second instance driving Shifter's Coarse** — shape the pitch envelope with **Peak around 48** for a fast pitch-drop "knock," saved for reuse across a chain; a second Envelope MIDI instance can instead modulate a following [[Shifter]]'s **Coarse** parameter over roughly a 50–100 range for a moving pitch-shifted layer on the same sound. Part of a laser/riser build documented on [[Operator]]. → [[Operator]], [[Shifter]] — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **Global Time knob** — Envelope MIDI has the same Global Time control found on [[Wavetable]]/[[Sampler]]/[[Operator]], scaling its whole envelope timing at once — useful for exploring how fast/slow the mapped modulation sweep feels without redrawing the envelope. → [[Wavetable]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)
- **Echo mode as a decaying modulation delay** — Envelope MIDI defaults to **Free** mode (a plain one-shot envelope per note); switching to **Echo** mode with Sustain down makes the mapped modulation behave like a decaying delay/echo on whatever parameter it drives, instead of a straight envelope shape — a distinct character worth reaching for over Free mode when the modulation itself should trail off rhythmically. — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)

## Key Parameters

```visual-key
image: Images/Envelope MIDI.jpg
coords: Images/Envelope MIDI.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Map | Assigns the envelope to a target parameter | Map to a filter cutoff, send, etc. |
| ② | Envelope curve | The drawable envelope shape (draggable stage curves) | Draw a bespoke contour beyond a plain ADSR |
| ③ | Amount | Modulation depth applied to the target | Scale how far each note moves the parameter |
| ④ | ADSR (Attack / Decay / Sustain / Release) | The envelope stages, triggered per MIDI note | Fast attack + medium decay for a pluck-style sweep |
| ⑤ | Velocity | Velocity-scaling of the modulation depth | Harder notes sweep further |
| ⑥ | Mode / Time (Free / Sync) | Free-run vs. tempo-synced envelope timing | Sync so stages land on beat divisions |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
