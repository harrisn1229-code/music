---
type: plugin
title: "Massive"
category: Instrument
vendor: "Native Instruments"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Massive

![[Images/Massive.png]]

**Category:** Instrument
**Vendor:** Native Instruments

## What it is

Native Instruments' classic wavetable synthesizer, known for aggressive, modern EDM/dubstep-style bass and lead sounds.

## What it's used for

Growling basses, aggressive leads, and classic 2010s-EDM-style wavetable sound design.

## FX chain notes

Used as the instrument source, often followed by saturation and multiband processing to control its aggressive harmonic content.

## Techniques

- **One-osc/one-filter bed patch recipe** — smooth square wavetable with bend +/- for an old-school analog-ish saw → low-pass with an opening envelope → unison stack in the Voicing tab (Restart via Gate on) → white noise low for hiss → copy the filter envelope onto the amp → subtle LFO on pitch for drift. His philosophy: complexity comes from the chords, not the patch — Lophiile, [Sound Design With a Musical Mindset](https://www.youtube.com/watch?v=spPaJzYPgzk)
- **Combo-macro patches ("RnB Twinkles")** — build one macro that opens the filter AND raises reverb together, then automate just that macro over a simple line for an expressive bridge layer; also his "machine plucks" = simple patch + harsh noise layer for deliberate weirdness in a chorus stack — Lophiile, [How I Made Paradise by BTS](https://www.youtube.com/watch?v=L968H6x2sBY)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Massive.pdf|Local PDF]] · [Official manual (NI)](https://www.native-instruments.com/fileadmin/ni_media/downloads/manuals/MASSIVE_Manual_English_1_5_5.pdf) (v1.5.5, 113 pages)

**High-level points:**
- Sound source is **three wavetable oscillators + a dedicated Modulation Oscillator + Noise + Feedback** — the Modulation Oscillator isn't a 4th tone source, it's a sine-wave *modulator* for ring/phase(FM)/position modulation and filter FM, which is where Massive's signature growl comes from.
- Each oscillator's **Intensity** knob behaves completely differently depending on the selected mode (Spectrum = low-pass-like harmonic rolloff, Bend A/B/C = reshapes the wavetable readout speed, Formant = shifts formants) — same knob, four unrelated sonic results.
- **Two filter busses**, each independently choosable from 11 types (including Daft, Scream, Comb), routable serial or parallel via the Input Fader, with a separate Mix control for blending Filter 1 vs Filter 2 output — routing is as important as filter type.
- The **Feedback section** re-routes signal from a chosen point back into a filter's input — this is how Massive gets analog-style filter saturation/self-oscillation-adjacent grit without an external distortion device.
- Modulation is 8 slots total: **4 Envelopes** (blue tabs) + **4 Assignable pages** (green tabs, each switchable between LFO / Stepper / Performer) — Stepper and Performer are step-sequencer-style modulators unique to Massive's character versus a typical synth's plain LFO/env pair.
- Envelopes have a **Sustain Loop** (a mini-LFO living inside the sustain stage, up to 32 half-cycles or infinite) plus a Sustain Morph between two selectable curve shapes — this is how Massive does rhythmic/wobbling sustain without external modulation.
- Play Mode per envelope (Gate / One Shot / Hold) changes note-off behavior fundamentally — Hold is built for live/groove use, letting stacked notes release together on a retrigger.
- Insert Effects (Delay, Sample & Hold, Bitcrusher, Frequency Shifter, HPLP, Sine/Parabolic Shaper) sit inside the signal path before the Amp section — cheaper to reach for than routing out to an external effect for quick lo-fi/metallic textures.

## Used in my chains

A **synth source** (instrument, not an FX slot) — the growly, aggressive 2010s-character option:

- **[[1 Synth Lead Track|Synth Lead Track]]** — growly wavetable/dubstep-lineage character leads (vs. [[Drift]] warm-analog / [[Omnisphere]] organic texture).

## Key Parameters

```visual-key
image: Images/Massive.png
coords: Images/Massive.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Wavetable + Wt-Position | Selects the table per oscillator; scans through its frames | Modulate Wt-Position with an LFO for classic PPG-style morphing pads/leads | Waldorf PPG Wave-style morphing is the reference point the manual itself cites — Massive's engine is built explicitly on that lineage |
| ② | Intensity (mode-dependent) | Spectrum/Bend A/B/C/Formant — reshapes harmonic content or wavetable readout | Formant mode + slow modulation = "morphing vowel" texture on a lead; Spectrum mode as a cheap extra low-pass per oscillator | — |
| ③ | Modulation Oscillator (Ring/Phase/Position + Filter FM) | Sine-wave modulator for ring mod, phase (FM), position mod, or filter-frequency FM | Filter FM + fast-decaying envelope into Filter 1 (Daft) = classic aggressive click-into-growl trap/EDM bass attack | This exact Filter FM patching move is the manual's own worked example for "interesting bass sounds" |
| ④ | Noise section (Color/Amp) | Sample-based noise generator with its own routing fader | Fast Performer/Stepper on Noise Amp = rhythmic hi-hat-like texture without a sampler | — |
| ⑤ | Feedback section (Amp + routing) | Re-routes signal from a chosen insert point back into a filter | Route Filter 1's output back into itself for smoothed, saturated resonance instead of a harsh peak | — |
| ⑥ | Filter type (11 options incl. Daft/Scream/Comb) | Two independently-typed filter busses | Scream or Daft filter for aggressive 2010s-EDM/dubstep growl bass; standard LP2 for cleaner hip hop/pop bass | Massive's Daft/Scream filters are widely cited (KVR/Gearspace breakdowns) as the go-to for 2010s dubstep/EDM bass design |
| ⑦ | Filter routing (Input Fader + Mix) | Serial vs. parallel blend between Filter 1 and Filter 2 | Full serial (Input Fader up, Mix on Filter 2) = one signal sculpted twice for a more extreme, resonant lead/bass tone | — |
| ⑧ | Envelope Sustain Loop + Morph | Loops the sustain stage as a mini-LFO (up to 32 half-cycles/infinite), morphs between two sustain shapes | A short Sustain Loop count on the Amp envelope = a rhythmic pulsing bass/pad with zero external modulation | — |
| ⑨ | Play Mode (Gate/One Shot/Hold) | Controls how an envelope responds to note-off | One Shot on a pluck envelope = the note always finishes its decay even on staccato playing — consistent pluck length regardless of MIDI timing | — |
| ⑩ | Insert Effects (Bitcrusher/Freq Shifter/HPLP/Shapers) | Pre-Amp-section lo-fi/metallic processing | Bitcrusher + Frequency Shifter combo for a cheap, self-contained lo-fi hip hop texture layer without leaving the instrument | — |

## Patch Recipes

From-scratch builds by **sound role** (slots defined in [[Sound Palette]]). Circled numbers = the matching row in the Key Parameters table above.

### Bed — [[BED Slot]]
- ① Osc 1 + Osc 2: warm/analog-flavored wavetables, Osc 2 detuned a few cents
- ①⑧ Slow Performer or LFO → Wt-Position on Osc 2 for internal movement, not melody
- ⑥ Filter 1: LP2, ⑦ routing parallel, Mix blended between both filters
- ⑧ Amp envelope: slow Attack (0.8–1.5 s), high Sustain, no Sustain Loop
- HPF ~120–150 Hz on the way out ([[BED Slot]] mix rule); swappable with [[Omnisphere]]/[[Serum 2]] beds in the same slot

### Lead/pluck — [[LEAD Slot]]
- ① Osc 1: bright digital-style wavetable
- ③ Modulation Oscillator → Phase (FM) on Osc 1, Amt modulated by a fast envelope for a "quack" attack transient
- ⑥ Filter: Scream or standard LP for pluck character, ⑧ Envelope Decay ~150–250 ms, Sustain near zero
- ⑨ Play Mode: One Shot — consistent pluck length regardless of how staccato it's played
- Keep unison/detune minimal — thin and upfront, not a pad

### Bass/Sub — [[BASS Slot]] · [[SUB Slot]]
- ① Osc 1: a growl-flavored wavetable for BASS-slot harmonics; Osc 3 or a plain sine routed for the SUB body
- ③ Filter FM: Modulation Oscillator → Filter 1 (Daft), amount driven by a fast-decay envelope — the manual's own "interesting bass sounds" recipe
- ⑤ Feedback section on, moderate Amp, routed back into Filter 1 for saturation-style grit
- ⑨ Play Mode: Gate or One Shot with high Sustain for consistent note length like an 808
- Keep the SUB-body oscillator's routing fader sent clean/unfiltered so distortion never touches it ([[SUB Slot]] mix rule: mono, no widener)

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- ① Osc 1 + Osc 2: classic saw-shaped wavetable frames (early/simple positions, not deep morphs)
- Detune Osc 2 a few cents against Osc 1 for a Juno-style ensemble width (light, not a modern supersaw)
- ⑥ Filter: LP2, cutoff bright, low resonance, ⑦ routing parallel
- ⑧ Amp envelope: Attack ~100 ms, full Sustain — played chords, not a slow swell
- Dry-ish, minimal reverb send — see [[Synthwave]]; [[Model 84 Polyphonic Synthesizer]] is the reference implementation for the real-circuit version of this patch

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
