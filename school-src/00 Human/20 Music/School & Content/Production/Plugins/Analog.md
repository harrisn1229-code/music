---
type: plugin
title: "Analog"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
briefed: backlog
---

# Analog

![[Images/Analog.png]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's virtual analog modeling synth, built around a dual-oscillator subtractive architecture modeled on classic analog synth circuitry (including component drift/imperfection modeling).

## What it's used for

Warm analog-style bass, pads, and leads without loading a heavier third-party synth; good for quick sketching and for sounds that don't need modern wavetable complexity.

## FX chain notes

Used as a sound source at the start of an instrument chain; often followed by Ableton's own Saturator/Amp or a third-party drive plugin to add grit, then EQ Eight to carve space in the mix.

## Techniques

- **Pitch envelope + Pitch Wrap for a laser SFX layer** — an analog-style laser/zap texture built from a pitch envelope (fast downward sweep at note-on) combined with Analog's Pitch Wrap behavior (pitch that folds/wraps rather than just sliding linearly) — the same laser-design goal as [[Operator]]'s Laser SFX recipe, done on Analog's simpler subtractive engine instead of FM. → [[Operator]] (Laser SFX recipe) — Eli derp, [How To Make Insanely Phat Basses with @eliderp_](https://www.youtube.com/watch?v=8a84OhMSfzM)

## Manual

- 📄 [Live 12 Reference Manual — Analog chapter (§30.1)](https://www.ableton.com/en/manual/live-instrument-reference/#analog) — Ableton stock device; per the manual-enrich workflow, no PDF is downloaded (would mean grabbing the whole Live manual).

**High-level points:**
- Two physically-modeled oscillators (built with Applied Acoustics Systems) + a noise generator feed **two independent multi-mode filters**, routable in series or parallel — routing itself is a sound-design decision, not just a signal-flow detail; four Quick Routing buttons set it up fast.
- Modeling means no sampling/wavetables at all — sound is calculated in real time from the equations describing analog circuits, so it never aliases regardless of pitch or pulse width.
- Each filter has its **own dedicated amplifier and its own ADSR envelope** (4 total: 2 filter, 2 amp) — nothing is shared globally, so the two signal paths (if split) can have completely different contours.
- Each oscillator's Sub/Sync control is either/or: **Sub** adds a clean octave-down layer, **Sync** hard-syncs to an internal oscillator whose Ratio slider dials in classic "analog nastiness" — great mod-wheel target.
- Filter 2 can **Follow** Filter 1's cutoff with an adjustable offset, which is how the two filters stay linked through modulation without patching anything.
- The Key slider on each oscillator controls how much MIDI note pitch affects tuning — leaving one oscillator at 100% (equal temperament) and detuning the other's Key value creates two oscillators that drift apart the farther from middle C you play.
- Global section carries vibrato (a pitch-hardwired LFO with its own delay/attack/rate), unison (2 or 4 voices), and glide (constant or proportional to interval) — separate from the four per-section LFOs/envelopes.
- MPE section exposes Pressure, Slide, and per-note Pitch Bend, each routable to up to two destinations — Analog is MPE-ready out of the box.

## Key Parameters

```visual-key
image: Images/Analog.png
coords: Images/Analog.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Oscillator Shape | Sine / sawtooth / rectangle / white noise per oscillator | Saw for trap/EDM supersaw-style layering (stack with unison ⑨); sine for a clean sub/808 body; rectangle + Pulse Width for a brighter 80s-synthwave bed | — |
| ② | Octave / Semi / Detune | Coarse + fine per-oscillator tuning | Detune Osc 2 a few cents against Osc 1 for instant analog chorus/width on a bed patch, no extra chorus plugin needed | — |
| ③ | Sub/Sync mode | Adds an octave-down sub layer, OR hard-syncs the oscillator for extra harmonics | Sub mode = free sub-octave layer for bass/808 roles; Sync mode + mod-wheel-mapped Ratio = filthy risers and EDM/trap growl leads | — |
| ④ | Filter type | 2nd/4th-order LP, BP, notch, HP, formant | Formant filter's Reso knob cycles vowel sounds — usable as a lo-fi talk-box effect on hip hop hooks; 4-pole LP for classic subtractive bass | — |
| ⑤ | Filter Freq/Reso + Drive | Cutoff, resonance, and Sym/Asym saturation on the filter output | Push an Asym Drive option for grindy trap bass without a separate saturator; automate Freq with the filter envelope for pluck/bass movement | — |
| ⑥ | Filter routing (Quick Routing / Follow) | Parallel, split, single-filter, or serial oscillator→filter paths | Split routing = two independent filter chains from one Analog instance (layered lead + bass); Follow keeps Filter 2 locked to Filter 1's movement for a thicker single sweep | — |
| ⑦ | Envelope Loop mode + Free/Legato | Off / AD-R / ADR-R / ADS-R looping, plus trigger (Free) and legato behavior | Free (trigger) mode = fixed-length percussive plucks/stabs regardless of hold time — the trap/hip hop pluck move; AD-R loop = pulsing filter-env texture for a bed | — |
| ⑧ | LFO Wave + Rate + Retrig | Sine/triangle/rectangle/noise LFO, Hz or tempo-synced, with retrigger | Tempo-synced triangle on filter Freq = classic EDM bass wobble/pump; enable Retrig for rhythmically consistent per-note modulation | — |
| ⑨ | Unison (Voices + Detune) | Stacks 2 or 4 detuned voices per note | 4 voices + wide detune for a big EDM/pop lead or bed; keep it off or at 2 voices with light detune for Beatles-lane bedroom-pop warmth | — |
| ⑩ | Glide (Time + Const/Prop + Legato) | Pitch slide between notes, constant or interval-proportional | Proportional glide mode for realistic mono basslines and melodic slides — the McCartney-style walking-bass move (see [[BASS Slot]] "when it's the hook") | — |

## Patch Recipes

From-scratch builds by **sound role** (slots defined in [[Sound Palette]]). Circled numbers = the matching row in the Key Parameters table above.

### Bed — [[BED Slot]]
- ① Osc 1 + Osc 2: sawtooth
- ② Osc 2 detune +6 to +8 cents against Osc 1 (analog chorus width)
- ⑥ Quick Routing: split evenly to both filters
- ④ Filter 1 + Filter 2: 4-pole low-pass, ⑥ Filter 2 Follow on
- ⑤ Freq ~40–50%, Reso low (10–15%), Drive off
- ⑦ Amp/filter envelope: Attack 0.8–1.2 s, high Sustain, Release ~1.5 s, Loop off
- ⑧ LFO: slow triangle (~0.2 Hz) → small amount into Filter Freq for movement
- ⑨ Unison on, 4 voices, moderate detune for width
- HPF around 120–150 Hz on the way out ([[BED Slot]] mix rule)

### Lead/pluck — [[LEAD Slot]]
- ① Osc 1: rectangle with Pulse Width modulated; Osc 2 off or low-level saw
- ③ Sub off, Sync on with moderate Ratio for edge
- ④ Filter 1: 2-pole low-pass or band-pass for pluck "quack"
- ⑤ Freq envelope-modulated (positive Freq Mod from filter envelope), Reso moderate-high, Drive Asym for bite
- ⑦ Free (trigger) mode, fast Attack, short Decay, Sustain nearly zero
- ⑨ Unison 2 voices, subtle detune
- ⑩ Glide off — plucks re-trigger, they don't slide

### Bass/Sub — [[BASS Slot]] · [[SUB Slot]]
- ① Osc 1: sawtooth (harmonics for BASS) or sine (pure SUB)
- ③ Sub mode on, Level high — this is the free sub-octave layer
- ④ Filter 1: steep 4-pole low-pass, Filter 2 off or Follow
- ⑤ Freq envelope-modulated open on the transient for growl, Reso low to stay mono-clean
- ⑦ Free mode, fast Attack, high Sustain — consistent note length like an 808
- ⑩ Glide Const mode, short time for 808-style slides
- ⑨ Unison off — sub stays centered/mono ([[SUB Slot]] mix rule)

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- ① Osc 1 + Osc 2: sawtooth
- ⑨ Unison on, 4 voices, wide detune (Juno-style ensemble, not a modern supersaw)
- ⑤ Filter Freq bright (~70–80% open), low Reso, light Sym Drive for the "forwardness"
- ⑦ Amp envelope: Attack ~100 ms, full Sustain (played chords, not a slow swell)
- ⑧ Slow LFO → subtle pitch or filter movement, tempo-synced
- Dry-ish, minimal reverb send — brightness carries the presence, not width (see [[Synthwave]]; [[Model 84 Polyphonic Synthesizer]] is the reference implementation for the real-circuit version of this patch)

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
