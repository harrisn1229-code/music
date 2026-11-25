---
type: plugin
title: "Drift"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Drift

![[Images/Drift.png]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's dual-oscillator analog-modeled synth introduced in Live 12, combining classic subtractive synthesis with drift/character modeling and a built-in modulation matrix.

## What it's used for

General-purpose analog-style synth duty — basses, leads, pads — as Live's modern default alongside Analog and Wavetable.

## FX chain notes

Used as an instrument source; pair with Ableton's Saturator for extra harmonics and a chorus/ensemble effect to widen mono patches.

## Techniques

- **LFO Wander mode + Key-modulated rate for natural pitch drift** — set the modulation LFO to **Wander** mode and route it to Pitch so the pitch meanders instead of cycling on a fixed shape; then, in the Mod section, have **Key** (which note is being played) modulate the LFO's **Rate** — every note wanders at a slightly different speed instead of all notes drifting identically, a more natural/human result than one fixed Wander rate across the whole part. → [[Randomized Rack Design]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)

## Used in my chains

An **instrument source** (not an FX slot) — the warm analog option for synthwave/indie:

- **[[1 Digital Bass Track|Digital Bass Track]]** — analog-style synth bass → dedicated patch [[Drift — Analog Synth Bass]].
- **[[1 Synth Bed Track|Synth Bed Track]]** — evolving/motion pads (Shape/position modulation that [[OTT]] loves).
- **[[1 Synth Lead Track|Synth Lead Track]]** — warm analog mono lead (vs. [[Massive]] growl / [[Omnisphere]] texture).

## Manual

- 📄 [Live Instrument Reference — Drift](https://www.ableton.com/en/manual/live-instrument-reference/) (web-only, no per-device PDF — Live 12 manual chapter; Drift ships built into Live 12 Standard/Suite)

**High-level points:**
- Two-oscillator subtractive architecture, but Osc 1's **Shape** knob is the real sound-design engine — it morphs the waveform's harmonic content in real time (behavior differs per waveform) and is itself a modulation destination (Env1, Env2/Cyc, LFO, Key, Velocity, Modwheel, Pressure, Slide). Most Drift patches live or die on what's modulating Shape.
- The **Filter Type** toggle swaps the entire filter model, not just the slope: 12 dB is modeled on the **DFM-1** (softer, more musical self-oscillation), 24 dB is modeled on the **Cytomic MS2** (Moog-ladder-style, more aggressive) — choose for character, not just dB-per-octave.
- **Env 2 doubles as a Cycling Envelope** (a looping envelope with Tilt/Hold/Rate/Ratio/Time/Sync controls) when toggled — Drift's answer to a second LFO with envelope-shaped, tempo-syncable control, useful for rhythmic filter or pitch movement.
- The **Drift** slider (the plugin's namesake) desyncs each voice's pitch and filter cutoff slightly, emulating analog voice-to-voice inconsistency — this is what keeps thick unison patches from sounding digitally "perfect" and static, not a detune knob.
- **Voice Mode** is a bigger decision than it looks: Poly (up to 32 true voices), Mono (4-voice unison with a Thickness slider), Stereo (2 voices hard-panned), and Unison (4 detuned voices per note) are structurally different signal paths, not just polyphony limits.
- The **Mod Section** supports only 3 simultaneous routings from a fixed source list to a fixed destination list (Osc gain/shape/detune, noise gain, LP freq/reso, HP freq, LFO/Cyc rate, main volume) — plan modulation priorities, there's no unlimited mod-matrix depth here.
- **Retrigger** (oscillator and LFO, separately) resets phase per note — off by default for a smoother analog-modeled sound, so switching it on is the deliberate move for punchy, consistent plucks.

## Key Parameters

```visual-key
image: Images/Drift.png
coords: Images/Drift.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

The 5–15 parameters that actually matter, worst-documented first:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Shape (Osc 1) | Real-time waveform morph — behavior is unique per waveform selected | Envelope → Shape (fast decay) for a "brightening" pluck attack; slow LFO → Shape for an evolving pad | — |
| ② | Shape Mod Source / Amount | Assigns one mod source (Env1/Env2/LFO/Key/Vel/Modwheel/Pressure/Slide) to Shape, −100% to +100% | Negative amount + fast-decaying envelope = a "dark-into-bright" analog pluck, inverted from the usual filter-sweep move | — |
| ③ | Filter Type (12 dB DFM-1 / 24 dB MS2) | Swaps the filter model and slope together | MS2 24 dB for aggressive resonant basses/leads; DFM-1 12 dB for gentler pads and keys | — |
| ④ | Drift (global) | Per-voice pitch/cutoff randomization emulating analog voice inconsistency | Small amount on unison/poly patches = analog "glue" without audible detuning; push high for lo-fi wobble | — |
| ⑤ | Voice Mode (Poly/Mono/Stereo/Unison) | Structural voice architecture, not just a polyphony cap | Mono + Glide for basslines; Unison for a thick lead/pad without stacking MIDI notes | — |
| ⑥ | Cycling Envelope (Env 2 toggle) | Loops with Tilt/Hold/Rate — a syncable LFO/envelope hybrid | Sync Rate to tempo, route to filter cutoff for rhythmic gating without adding a separate LFO device | — |
| ⑦ | Osc 2 Detune | Semitone (Oct) and cent (Detune) offset of Osc 2 vs. Osc 1 | A few cents = thickened, unison-free width; wide detune = intentional dissonant beating | — |
| ⑧ | HP (filter section) | Independent high-pass, post low-pass filter | Carve low-mid mud out of a pad or lead without touching the LP cutoff sweep at all | — |
| ⑨ | Mod Section (3 routings) | Fixed source→destination matrix, only 3 slots | Velocity → Osc 1 gain makes plucks feel dynamic by changing timbre, not just loudness | — |
| ⑩ | Mono Glide / Legato | Portamento time + legato toggle, Mono voice mode only | 60–120 ms glide, legato on, for trap/EDM slide bass lines | — |

## Patch Recipes

Circled numbers = the matching row in the Key Parameters table above.

### Synth bed / pad — [[BED Slot]]
- Voice Mode: Poly
- Osc 1: Saw or Saturated, ① Shape ~40%, ② slow LFO → Shape for gentle movement
- Osc 2: same waveform, ⑦ detuned a few cents for width
- ③ Filter: 12 dB DFM-1, cutoff open ~70%
- ④ Drift: light — analog glue, not audible pitch wobble
- FX: chorus/ensemble send for width, moderate reverb

### Lead / pluck — [[LEAD Slot]]
- Voice Mode: Mono or Unison
- Osc 1: Pulse or Saw, ② Env1 → Shape (fast decay) for a brightening pluck attack
- ⑥ Optional Cycling Envelope → cutoff for added rhythmic movement
- ⑩ Glide ~60–100 ms, legato on
- FX: tempo-synced delay send

### Bass / sub — [[BASS Slot]] / [[SUB Slot]]
- Voice Mode: Mono
- Osc 1: Sine or Triangle; Osc 2 off or set an octave down
- ③ Filter: MS2 24 dB with moderate Res for growl, or wide open/clean for a pure sub
- ⑦ Detune: 0 — subs stay mono and clean
- ⑩ Glide legato for slides
- FX: none pre-bus — keep it dry into the mix bus

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- Voice Mode: Poly
- Osc 1: Saw, ① Shape ~50–60% (brighter than the standard bed recipe)
- Osc 2: same waveform, ⑦ light detune (~5–8 cents) — Juno-ish, not a supersaw
- ③ Filter: 12 dB DFM-1, cutoff ~75% open, low Res
- ④ Drift: light — the deliberate analog inconsistency *is* the vintage character
- FX: chorus/ensemble **ON**, slow + deep — the Juno move; dry send, minimal reverb for forwardness
- See [[Synthwave]]; same recipe on [[Model 84 Polyphonic Synthesizer]] and [[Serum 2]]

## See also

- Techniques: [[Randomized Rack Design]]
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
