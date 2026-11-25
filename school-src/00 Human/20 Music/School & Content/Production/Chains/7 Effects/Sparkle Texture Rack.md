---
type: chain
title: Sparkle Texture Rack
reference: loner (YouTube breakdown channel)
chain_type: style
family: fx
routing: "Track insert (fully wet, no dry pass-through) — Delay/Reverb (tape preset) → [[kHs Pitch Shifter]] (+1 octave) → [[Portal]] (texture) → chorus → half-time → [[EQ Eight]] (low-pass)"
signal_chain: [Delay/Reverb (tape-style preset), Pitch Shifter (+12 semitones), Portal (granular/glitch texture preset), Chorus (vocal-chorus preset), Half-Time device (Mix macro), EQ Eight (Band 7 Low Pass, Frequency macro)]
status: video-derived
tags: [chain, fx, style, sound-design, ableton, texture, reverb, chorus, pitch, half-time, macro]
---

# Sparkle Texture Rack

**Reference/vibe:** a fully-wet, 6-stage "one or two knob pedal" built from stock/owned plugins to replicate the character of chased-after hardware guitar pedals (Chase Bliss Thermae, Hologram Microcosm, Chase Bliss Blooper, Cooper FX Arcades — pure name-drops in the source, no settings given) without the rarity/cost/learning-curve tax of hunting real hardware down. Built in FL Studio's **Patcher** (a routing/container plugin hosting a chain of other plugins with a custom macro-knob surface); the direct Ableton equivalent is an **Audio Effect Rack** with Macro knobs — see [[EffectRack]] for the same "save FX-rack chains as reusable sounds" lesson from a different video, and [[Randomized Rack Design]] for the general macro-mapping mechanics. Saved and named "Sparkle" in the source, then dragged onto a fresh 130 BPM perc loop on a new mixer track to prove instant recall.

**Signal source:** built from a mix of stock and owned tools plus two unowned Waves plugins swapped for owned equivalents below — nothing here blocks an owned-tools build.

- Reverb/delay opening stage → owned lane: [[ValhallaDelay]] (Tape/BBD mode) or [[EchoBoy]]/[[Kramer Tape]] feeding [[Echo]].
- Pitch shift → source names "Waves SoundShifter" (unowned, [[Plugin Wishlist]]); owned lane [[kHs Pitch Shifter]] (±12 semitones covers the octave move).
- Texture stage → **[[Portal]]** (owned).
- Chorus stage → owned lane [[TAL-Chorus-LX]] or [[kHs Chorus]] (source plugin name garbled in captions, "Clever" — unconfirmed, medium confidence).
- Half-time stage → **Cableguys HalfTime** (unowned, [[Plugin Wishlist]]) — already the established owned-adjacent gap for every other half-time chain on this vault (see [[Little AlterBoy]], [[Phaser-Flanger]]).
- Low-pass EQ → **[[EQ Eight]]** (owned, Band 7 set to Low Pass).

## Chain (build order)

### 1. Warm-up build — chorus-modulated reverb (2-3 macros, dry path kept)
Reverb ([[ValhallaVintageVerb]]-style) chained output-to-input into a chorus ([[TAL-Chorus-LX]]) set to a **flanging preset**. Macros: reverb **Mix**, reverb **Decay**, chorus **Mix** — three knobs. Recreates one feature of the KMA Cirrus hardware pedal ("a chorus modulated reverb setting"). Closing EQ cut on the low end (no exact frequency given). Dry signal stays in parallel with the wet chain throughout.
- **Why the extra chorus instead of the reverb's own internal modulation:** "you can modulate the reverb inside Valhalla but that's not giving you a unique sound, everyone can do that" — an arbitrary second device is what makes the combination personal rather than a factory setting anyone could reach for.

### 2. The full build — fully wet, no dry pass-through
Unlike step 1, this chain drops the dry signal entirely — everything downstream is meant to sit as "more of a textural element on top" of the underlying part, not a replacement for it.

1. **Tape-flavored "space echo" reverb/delay preset** — described only as "nice little reverb, a bit of a tape effect as well." Owned lane: [[ValhallaDelay]] Tape/BBD mode.
2. **Pitch shift +1 octave** — owned lane [[kHs Pitch Shifter]] (Pitch = +12 semitones, Mix full wet).
3. **[[Portal]]** — loaded with a preset from its "pitch" category, "make it super textural."
4. **Chorus** — loaded with a **"vocal chorus" preset**, run fully wet (no dry blend dragged in for this stage either).
5. **Half-time device** (Cableguys HalfTime lane) — its Mix parameter mapped to a macro named **"Half Time,"** the first of only two macros exposed on the whole rack.
6. **Low-pass EQ** ([[EQ Eight]] Band 7, Filter Type = Low Pass) — its **Frequency** mapped to the second and last macro.

### 3. Expose only 2 macros on the whole 6-stage chain
- **Half Time** (mix of the half-time stage) and **low-pass cutoff frequency** — those are the ONLY two performable controls; every preset choice and internal setting on stages 1-4 stays baked in and unmapped.
- **Why:** "I want to make this kind of like a one or two knob pedal... this is the effect it's going to give you, but I want to let the person decide" — the design goal is a simple front panel, not a fully-tweakable rack. This is the same "which parameters actually need a macro" discipline already documented generally on [[Randomized Rack Design]] and [[EffectRack]].

### 4. Save as a named preset, recall instantly
Save the whole chain (routing + macro mapping) as a single preset ("Sparkle" in the source). Demoed by dragging a fresh perc loop onto a new mixer track in a different project, loading the preset, and immediately having both macros available with zero rebuild — the same "recallable instrument in your palette" payoff already documented on [[EffectRack]].

## Usage

- **Melodic top-line / one-shot texture layer** — the source use case: a piano one-shot run through the full wet chain as a textural overlay on top of a chord progression.
- **Any percussive loop** — demoed working on a 130 BPM perc loop dragged in after the fact, proving the saved preset generalizes beyond the original source material.

## Variations

- **Warm-up build only (step 1)** — the simpler chorus-modulated-reverb chain is a complete, useful "pedal" on its own; the fully-wet 6-stage build in step 2 is the fuller expression, not a prerequisite.
- **Swap the half-time stage's automated engagement** — elsewhere on this vault, the equivalent half-time stage in a Dez Wright wash-out chain (spring reverb → [[Portal]] → half-time → EQ, see [[Portal]]) has its engagement automated to switch on only in the second half of a loop rather than running constantly; the same automation move applies here if a static Half Time macro reads as too committed.
- **As a send instead of an insert** — the video builds this as a track insert (Patcher on a one-shot's channel); nothing about the macro/chain structure prevents running it on a return if the goal is a shared texture across multiple tracks.

## Notes

- Two unowned Waves plugins named in the source (SoundShifter, and the half-time device — likely Cableguys HalfTime) already have owned-lane substitutes documented above and cross-linked on [[Plugin Wishlist]]; nothing here blocks building the chain today with owned tools.
- Plugin notes carrying this video's techniques: [[ValhallaVintageVerb]], [[TAL-Chorus-LX]], [[Portal]], [[kHs Pitch Shifter]], [[EQ Eight]], [[EffectRack]].
- Effect-type pages carrying this video's techniques: [[Reverb]], [[Modulation]], [[Delay]], [[Pitch and Formant]], [[EQ]].

**Sources:** loner, [this secret plugin will change the way you process your melodies!?](https://www.youtube.com/watch?v=xwuodd40bug) — video-derived, 2026-08-11.
