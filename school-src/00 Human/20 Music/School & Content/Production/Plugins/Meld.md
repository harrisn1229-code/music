---
type: plugin
title: "Meld"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Meld

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's dual-engine synth (Live 12 Suite) — two independently-chosen synth engines (musical/melodic banks alongside bass/texture banks, several of them scale-aware), each with two engine-specific macros, a shared per-engine filter section (also two macros per filter type), a 3-column LFO section, a Spread/Stack modulation matrix for voice stacking, and per-voice Drive/limiting.

## What it's used for

Rich, evolving pads, chord-stack textures, and basses — the Spread/Stack system in particular turns a single patch into a detuned, panned, multi-voice stack without loading multiple synth instances.

## FX chain notes

Used as the instrument source; commonly grouped into a rack with a sub-layer synth underneath (e.g. via a dedicated sub-octave device) and an Echo/reverb send for space.

## Techniques

- **A texture-from-scratch source when there's no sample library or mic** — Meld's dedicated texture-type synth engines, combined with its built-in modulators (and a filter placed after), can generate a usable weird/evolving texture layer without any recorded or sampled source material at all — a fallback when field-recording/foley isn't an option. → [[Ambient Texture and Field Recording]] — dnksaus, [Texturing Your Tracks in Ableton](https://www.youtube.com/watch?v=9Bab-gq4E00)
- **Two independent engines with per-engine macros** — pick one engine per bank; each comes with two contextual macros that change meaning depending on the engine chosen (e.g. the **Swarmsaw** engine's macros are Motion — built-in modulation — and Spacing — turns it into a chord). Several engines carry a scale-aware flat/sharp symbol. The **Chord** engine sets a chord shape (like the piano roll's Stack device) plus an inversion. — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Spread + Stack = a modulation-matrix voice stacker** — Stack (e.g. set to 3) adds extra voices per engine; Spread controls how those extra voices differ from the base voice. By default Spread maps to **detune** (±50 cents across the added voices) and **pan** (±50, spreading left/right/center) — an instant wide, detuned stack. Re-mapping Spread elsewhere in the **modulation matrix** (LFOs, envelopes, MPE all available) gets more interesting results — mapping Spread to **pitch quantization** gives a full chord stack on every single MIDI note; mapping it to a filter's Phaser amount gives each stacked voice its own phaser depth. → [[Randomized Rack Design]] — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Glide: Portamento vs. Gissando (glissando)** — switch to Monophonic mode to enable Glide; **Portamento** glides continuously between notes, **Gissando** stair-steps through the in-between notes instead of sliding smoothly. Running one engine on each mode gives a hybrid glide character. — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Per-filter macros + the 3-column LFO section** — each filter type (Phaser, an analog-mode low-pass, etc.) gets its own two contextual macros, same pattern as the engines. The LFO section runs **three columns simultaneously**: a basic LFO (simple waveforms, good for vibrato-style modulation) and an "LFO effect" column of random-style modifiers — both running at once for movement that a single LFO wouldn't give. Slow, low-amount LFOs mapped to the engine macros keep a patch alive without becoming obviously modulated; mapping an LFO to **pitch quantization** produces a melody that slowly evolves over time. — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Per-voice Drive and limiting** — turning up Drive applies distortion independently to each stacked voice (rather than summing first then distorting), with a built-in limiter to control the result. — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **The filter roster, and a dedicated Mix section** — beyond a classic morphing filter (low-pass/band-pass/high-pass/notch), Meld also ships a vowel/formant filter, scale-aware filters (e.g. resonator-style), and a Phaser filter type. A separate **Mix** section sits after the filters with its own tone shaping (low-pass/high-pass), a built-in limiter, and a Drive knob — the synth's own output/summing stage, distinct from the per-voice Drive described above. — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Cross-modulation between the two engines, and Spread mapped to filter frequency** — the modulation matrix lets one engine's LFO drive a parameter on the *other* engine (e.g. Engine A's LFO1 effects mapped to Engine B's Spacing macro) — genuine cross-engine modulation, not just within-engine routing. Mapping **Spread** to a filter's frequency (rather than the default detune/pan) makes the stacked voices play at several different filter frequencies simultaneously for a spacious, rich result — a further example alongside the pitch-quantization and Phaser-depth mappings already documented above. Turning on an engine's scale-aware toggle also repurposes its semitone-transposition control into a **scale-degree** transposition control, tracking whatever scale is set at the top of the track. → [[Randomized Rack Design]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)

## See also

- Plugins: [[Wavetable]] · [[Operator]] · [[Hybrid Reverb]] · [[Echo]]
- Techniques: [[Randomized Rack Design]] · [[Width and Stereo]]
- Palette: [[Sound Palette]]
