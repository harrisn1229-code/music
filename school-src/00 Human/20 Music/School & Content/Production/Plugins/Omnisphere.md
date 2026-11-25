---
type: plugin
title: "Omnisphere"
category: Instrument
vendor: "Spectrasonics"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
briefed: backlog
---

# Omnisphere

![[Images/Omnisphere.png]]

**Category:** Instrument
**Vendor:** Spectrasonics

## What it is

Spectrasonics' flagship hybrid synthesizer combining sample-based and synthesized sound sources with deep modulation and granular capabilities.

## What it's used for

Wide-ranging synth duty — pads, atmospheres, basses, and leads — often the deepest sound-design synth in a producer's toolkit.

## FX chain notes

Used as the instrument source, followed by whatever mix-bus processing the patch's role in the arrangement needs.

## Techniques

- **Harmonize 2–3 monophonic synth instances instead of one polyphonic chord voicing** — run three separate monophonic Omnisphere instances (each a slightly different tone), pan them center/left/right, and have each play a single-note line that together outlines a chord or scale — an orchestral/classical way of building harmony from individually-voiced lines rather than one instrument playing a stacked chord. Reused to outline moving chord changes (each voice picking different chord tones) as well as fast harmonized scale runs. → [[Melody Writing]], [[Electro Funk-Hop]] — Max Konyi, [[Beat Breakdown - Groovy Electro Funk-Hop (one of my favourites!)|Beat Breakdown - Groovy Electro Funk-Hop]]
- **A string/"cello" patch through a randomized pattern generator + a manually-swept filter reads as ensemble harmony**, not a static pad — for a moving, textural chord-outlining layer under a slower harmonic rhythm. → [[Chord Progressions]] — Max Konyi, [[Beat Breakdown - Groovy Electro Funk-Hop (one of my favourites!)|Beat Breakdown - Groovy Electro Funk-Hop]]
- **Organ chorus-lift layer** — organ patch with an opening filter + widening as the chorus arrival moment; also "Baritone Boardwalk" as a weird chord layer. Counter-tip from the same artist: generic Omnisphere presets are recognizable ("it sounds SO Omnisphere") — swap or process them when a part feels stock — Lophiile, [Paradise breakdown](https://www.youtube.com/watch?v=L968H6x2sBY) & [Fixing an Old Beat](https://www.youtube.com/watch?v=qJJZHz5D3C4)

## Manual

- 📄 [[Omnisphere.pdf|Local PDF (1,001 pp, compressed)]] · [Official web reference guide](https://support.spectrasonics.net/manual/Omnisphere2/) (searchable — usually faster than the PDF)

**High-level points:**
- The hierarchy is the whole mental model: **Soundsource** (raw sampled/synth material) → **Layer** (A–D, each a full synth voice) → **Patch** (up to 4 layers) → **Multi** (8 patches). Most "deep Omnisphere" is just knowing which level you're editing.
- Every layer can run **sample playback and DSP synthesis simultaneously** — blend a sampled texture with a raw saw under it.
- **Granular** lives per-layer and turns any soundsource into evolving cloud textures — the single biggest "atmosphere" tool in it.
- **Harmonia** = 4 extra pitch/level "voices" per layer without real layers — instant lush stacks.
- The **Orb** is X/Y-pad-style macro modulation you can record as motion — fastest way to make a static patch move.
- Keyscape (and Trilian) load inside Omnisphere as **satellite instruments** — layer Keyscape keys with Omnisphere pads in one Multi.

## Used in my chains

A **synth source** (instrument, not an FX slot) — the organic/hybrid texture option, and THE pad instrument:

- **[[1 Synth Bed Track|Synth Bed Track]]** — the go-to pad: **layer two patches (one dark + one airy)** and balance rather than hunting one perfect patch → [[Omnisphere — Layered Dark+Airy Bed]].
- **[[1 Synth Lead Track|Synth Lead Track]]** — hybrid/organic texture leads (vs. [[Massive]] growl / [[Drift]] analog).

## Key Parameters

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Layers A–D | Four independent synth voices per patch | The go-to bed: layer A dark/wide + layer B airy/thin, balance to taste (see [[1 Synth Bed Track|Synth Bed Track]]) | Mike Dean (Travis Scott, Kanye) is a documented Omnisphere devotee for pads/leads |
| ② | Soundsource browser | Which raw material a layer plays | Browse by category not name: `Pads + Strings`, `Atmospheres`, `ARP + BPM` (see [[Instrument Preset Map]]) | — |
| ③ | Granular page | Per-layer granular engine (intensity/speed/depth) | Low intensity on a vocal/string soundsource = evolving intro texture from any sample | Film-score staple (Spectrasonics' own demos leaning on it) |
| ④ | Harmonia | 4 pitch/level sub-voices per layer | Add a +7 and +12 voice quietly under a pad = instant "expensive" width without muddying | — |
| ⑤ | Orb | Circular X/Y macro modulator, recordable | Record one slow Orb pass on a static pad and loop it — movement without automation lanes | — |
| ⑥ | Unison / Width | Voice thickening per layer | Unison on the *airy* layer only; keep the dark layer mono-ish so the bed doesn't smear | — |
| ⑦ | Filter (per layer) | Dozens of filter types incl. formant/UVI-style | Power filter slow-swept on Atmospheres = the classic trailer riser | — |
| ⑧ | Arpeggiator | Per-patch arp with groove lock | `ARP + BPM` category + chord held = pulsing bed ([[Psych-Pop (Tame Impala)]] pulse lane) | — |
| ⑨ | Mod Matrix | Any source → any of ~1000 destinations | LFO → sample start on a granular layer = never-the-same-twice pads | — |
| ⑩ | FX racks (per layer/patch) | Built-in FX chains | Strip patch reverbs/delays — sends do space (house rule, same as [[Serum 2]]) | — |

*Preset strategy lives in [[Instrument Preset Map]]. Keyscape-inside-Omnisphere: verify the satellite is active.*

## Patch Recipes

By **sound role** (slots defined in [[Sound Palette]]) — in Omnisphere, "building" usually means smart layering, not raw synthesis. Circled numbers = the matching row in the Key Parameters table above:

### Synth bed — [[BED Slot]]
- ① Layer A: dark/wide pad — ② `Pads + Strings`, search "analog" or "juno"
- ① Layer B: airy/thin texture — ② search "glass" or "tape" — at 20–30% level
- ⑦ HP both layers ~120 Hz
- ⑤ Record one slow Orb pass for movement
- The [[1 Synth Bed Track|Synth Bed Track]] recipe; swappable with a Keyscape Rhodes or Model 84 pad (same slot)

### Atmosphere/intro texture — [[TEXTURE Slot]]
- ② Any string/vocal/piano soundsource
- ③ Granular ON: low intensity, slow speed
- ⑩ Long reverb *inside* the patch this once (texture is allowed to be washy)
- One per song, low in the mix

### Hip hop lead/bell — [[LEAD Slot]] (Mike Dean lane)
- ② `Keyboards` or `Bells` category
- ④ Harmonia: +12 voice at ~40%, slight detune
- ⑥ Mono-ish width, portamento on
- ⑩ Saturation in Ableton, not patch FX

### Pulsing bed — [[BED Slot]] (Tame Impala pulse lane)
- ② `ARP + BPM` category, hold a chord
- ⑧ Groove-lock the arp
- ⑦ Filter slow-swept over 8 bars
- See [[Psych-Pop (Tame Impala)]]

### Analog poly brass/stab — [[MIDS Slot|MIDS/COMP Slot]]
- ② `Synth Poly`, search "juno" / "OB"
- Fast attack, medium release
- ⑦⑨ Velocity → filter (played dynamics)
- Stab variant: sustain 0, release short

### Sub reinforcement — [[SUB Slot]]
- ② `Bass` category, sine/808-adjacent soundsource
- ① 1 layer only — ⑥ mono, no unison
- Only when the track's bass source has no sub of its own (never stack two subs — [[SUB Slot]] rule)

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- ② Search "juno" or "analog" in `Synth Poly` / `Keyboards` — pick a bright saw-based poly
- ① Single layer is enough; optional Layer B airy at 15–20%
- ⑦ Filter mostly open — **the brightness IS the forwardness**
- ⑩ Chorus in patch FX **ON this once** (chorus IS the sound); reverb still OFF
- ⑥ Light unison only — check the mono fold ([[Stereo Field]])
- Depth: dry-ish, minimal predelay = forward without extra level
- The [[Synthwave]] pad/stab lane

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
