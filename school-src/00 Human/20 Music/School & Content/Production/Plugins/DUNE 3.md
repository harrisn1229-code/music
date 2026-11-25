---
type: plugin
title: "DUNE 3"
category: Instrument
vendor: "Synapse Audio"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# DUNE 3

![[Images/DUNE 3.jpg]]

**Category:** Instrument
**Vendor:** Synapse Audio

## What it is

Synapse Audio's wavetable/virtual-analog hybrid synthesizer known for a rich unison engine and powerful modulation system.

## What it's used for

Modern EDM and electronic leads, basses, and pads with a distinctive thick unison character.

## FX chain notes

Used as the instrument source, often followed by saturation and EQ to manage its dense harmonic content.

## Techniques

- **Dawn FM synth-pop pad recipe: two waveforms tuned to an interval (not unison), then Chorus → Reverb → Overdrive, then two LFOs in two different cycle modes.** From-scratch build reverse-engineered from The Weeknd's *Dawn FM*: (1) blend a **saw and a square wave**, mix ~70% toward the saw — Osc 1 VA saw, Osc 2 VA pulse; (2) **tune Osc 2 to a major-key interval above Osc 1 instead of unison-detuning it** — an interval (not detune) is what makes the patch read "big," maps to DUNE 3's Osc B semitone/fine-tune offset; (3) effects **in this exact order**: Chorus first (widens the raw blend), Reverb second (spatializes the now-wide signal), Overdrive last (colors the already-spatialized sound rather than distorting dry) — route via the effect bus/insert FX in that sequence; (4) **modulation is two separate LFOs with two different cycle modes, not one LFO doing double duty**: LFO2 → filter (Cutoff, ⑥) cutoff, synced to **quarter notes**, cycle mode set to **Single** (one-shot per-note sweep, not looping) for a filter-opening motion on every note; LFO3 → the effect bus's **Reverb dry/wet** amount, cycle mode set to **Cycle** (continuous loop) specifically to fill the space between chord hits with breathing reverb wetness. → [[BED Slot]], [[Chorus-Ensemble]], [[Overdrive]], [[Modulation]] (Effects), [[Reverb]] (Effects), [[1 Synth Bed Track|Synth Bed Track]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/DUNE 3.pdf|Local PDF]] · [Official manual](https://www.synapse-audio.com/DUNE-36-Manual.pdf) (v3.6, current as of DUNE 3.6/2025)

**High-level points:**
- Signal path per voice is classic subtractive (Oscillator → Filter → Amp) plus **four freely-assignable MSEG envelopes** on top of the usual Amp/Filter envelopes — DUNE 3's flexibility comes from routing MSEGs to arbitrary destinations, not from a bigger oscillator section.
- Oscillators 1 and 2 are each a **stack of up to 32 oscillators** with their own Detune/Spread — DUNE 3 gets "thick" from stacking inside a single oscillator slot, before unison voices are even engaged (8 unison voices × up to 32 stacked oscillators = up to 200 oscillators per note).
- **Tuning mode** (Linear, Nonlinear, Gaussian, Alternate, Random, Perfect 5th, Minor, Major, Sub Osc, SWARM) changes *how* the stacked oscillators are pitched/weighted around center — this is the single biggest tone-shaping decision in the oscillator section, more impactful than Detune alone.
- Each oscillator independently picks a synthesis model — **VA** (analog-style saw/pulse/triangle with sync), **WT** (wavetable, with a built-in Wavetable Editor for custom tables), or **FM** (3-operator sine FM) — meaning one patch can mix an analog osc with a wavetable osc with an FM osc simultaneously.
- The **Filter Route** (Serial / FX-first / Parallel) determines how Filter 1, Filter 2, and the insert FX interact — Parallel routing splits the signal into two differently-filtered layers blended by the Balance knob, the fast way to build "clean top + growly bottom" in one patch.
- **Drive** on the filter does double duty: it sets input gain (controlling the resonance-vs-signal mix at high Reso), and on the ladder-style filter models it additionally saturates regardless of resonance — Drive is a tone knob, not just a gain-staging knob.
- Unison (up to 8 voices, AMT/DETUNE/SPRD) is a *separate* layer from the in-oscillator stacking — combining high oscillator Density with many unison voices multiplies CPU and harshness fast; most patches only need one or the other pushed hard.

## Used in my chains

A **synth source** (instrument, not an FX slot) — big analog/wavetable-hybrid supersaw/pad/lead engine:

- An instrument option on [[1 Synth Lead Track|Synth Lead]] / [[1 Synth Bed Track|Synth Bed]] when a part wants lush unison/supersaw width or a hybrid analog-wavetable timbre.

## Key Parameters

```visual-key
image: Images/DUNE 3.jpg
coords: Images/DUNE 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ③⑥⑦⑧⑨ only — this is a small vendor render, not an in-Live capture (DUNE 3 wouldn't authorise during the capture run), so ① Density, ② Tuning Mode, ⑤ Sync and ⑩ FM Amt can't be located with confidence. Worth re-badging once a real capture exists.*

The 5–15 parameters that actually matter, worst-documented first:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Density | Number of oscillators stacked in Osc 1/2 (up to 32 each); 0 turns the stack off | 1 = clean single osc; 8–16 = instant thick pad/lead without touching unison at all | — |
| ② | Tuning Mode | How the stacked oscillators are pitched/weighted (Linear, Nonlinear, Gaussian, Alternate, Random, Perfect 5th, Minor, Major, Sub Osc, SWARM) | SWARM for a shimmering, internally-modulated pad; Sub Osc mode for an instant reinforced low end from one oscillator slot | — |
| ③ | Synthesis Model (VA / WT / FM) | Per-oscillator generation method — analog-style, wavetable, or 3-op FM | Mix VA (Osc 1) with WT (Osc 2) for a hybrid analog/digital tone; FM mode for bells and e-piano-style tones | — |
| ④ | Detune / Spread | Pitch spread and stereo spread of the oscillator stack | High spread + moderate detune = the "wall of sound" EDM lead; keep basses at 0 spread (mono) | — |
| ⑤ | Sync (VA mode) | Hard-syncs the oscillator to an internally-generated virtual leader osc at an independently set frequency | Modulate Sync Freq via the mod matrix for classic aggressive sync-lead sweeps | — |
| ⑥ | Cutoff / Reso / Drive | Filter brightness, resonant peak depth, and input gain/saturation | Push Drive with high Reso for self-oscillating filter effects (laser/bass-drum tricks); Drive alone saturates on ladder-style filter models | — |
| ⑦ | Filter Route (Serial / FX-first / Parallel) | Order of Filter 1, Filter 2, and the insert FX relative to each other, blended by Balance | Parallel route = clean top layer + growly bottom layer in one patch, the DUNE growl-bass move | — |
| ⑧ | KTRK (Key Track) | How much the MIDI key number shifts the filter cutoff | Moderate KTRK keeps a bass's brightness consistent across the keyboard instead of getting darker on low notes | — |
| ⑨ | Unison AMT / DETUNE / SPRD | Polyphonic voice-stacking layer, separate from per-oscillator Density | The "outer" thickness layer — use sparingly alongside a high-Density oscillator, or CPU/harshness stack fast | — |
| ⑩ | FM Amt A / B (via MSEG) | Modulatable amount of FM operators A and B feeding carrier C | MSEG ramping FM Amt to zero over the note = a bright-to-sine decay, the classic FM bell/e-piano evolution | — |

## Patch Recipes

Circled numbers = the matching row in the Key Parameters table above.

### Synth bed / pad — [[BED Slot]]
- Osc 1: WT mode, warm analog-ish wavetable, ① Density 8–16, ② Nonlinear or Gaussian tuning
- ④ Detune moderate, Spread wide for stereo width
- ⑥ Filter: CL Lowpass 18 dB, Cutoff ~70% open
- ⑨ Unison: 2–3 voices, light Detune, wide Spread
- FX: chorus/ensemble via the effect bus, moderate reverb

### Lead / pluck — [[LEAD Slot]]
- Osc 1: VA saw or WT with a swept Position, ② SWARM tuning for internal shimmer
- Filter Env → ⑥ Cutoff, fast decay for pluck shape
- ⑨ Unison: 2–4 voices, moderate Detune
- Amp Env: fast attack, medium decay
- FX: tempo-synced delay send

### Bass / sub — [[BASS Slot]] / [[SUB Slot]]
- Osc 1: VA sine or triangle, ① Density = 1 (single osc, no stack)
- Osc 2 off, or SEMI −12 for a sub-octave layer
- ⑥ Filter: CL Lowpass 24 dB, Drive pushed for growl (EDM bass), or fully open + no drive for a clean sub
- ⑨ Unison: 1 voice for a clean sub, more for growl bass
- FX: none for a clean sub; Distortion → [[OTT]]-style multiband for an EDM growl bass

### EDM growl / wobble bass — [[BASS Slot]]
- Osc 1/2: WT mode, aggressive wavetables, ① Density 4–8, ② SWARM tuning for internal modulation
- ⑥ Filter: XP Lowpass 24 dB (saturates both signal and feedback paths) for growl, Drive pushed, Reso moderate-high
- Filter Env or LFO → Cutoff for wobble/wah movement
- ⑨ Unison: narrow Spread to keep it centered and mono-bass-focused
- FX: DUNE 3's own Distortion insert, pre-filter, for extra grit

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- Osc 1: VA saw, ① Density 4–8, ② Linear tuning — thick but not a full supersaw
- ④ Detune light–moderate, Spread ~50–60%
- ⑥ Filter: CL Lowpass 12 dB or 18 dB, Cutoff ~75% open, low Reso, a touch of Drive
- Amp Env: attack ~100 ms, full sustain — played chords, not a swell
- FX: Chorus effect bus **ON**, slow + deep — the Juno move; dry send, minimal reverb for forwardness
- See [[Synthwave]]; same recipe on [[Model 84 Polyphonic Synthesizer]], [[Drift]], [[Serum 2]]

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
