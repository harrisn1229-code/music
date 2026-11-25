---
type: plugin
title: "Chord"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Chord

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock MIDI chord device — a preset browser of chord voicings with a **Learn** mode (play a chord, every subsequent key plays that same voicing), plus Strum, Tension, and Crescendo controls for arpeggiating the chord's notes, and (Live 12.2, marketed as "**Expressive Chords**") Invert/Reverse/Quantize articulation controls plus an **Import Chords from Clip** button that lifts an entire progression straight out of any MIDI clip. Distinct from the Max for Live [[Chord Generator]] pack device, which builds voicings from an extension/inversion/disposition grid instead of a preset browser.

## What it's used for

Turning single-note MIDI input into full chord voicings — either by teaching it a chord via Learn, or by browsing its preset library — with built-in strum/timing/velocity shaping on top.

## FX chain notes

Sits before the instrument in a MIDI chain, generating the notes the instrument then plays; commonly racked with several Chord instances (each on a different preset) selected via a chain-selector macro for on-the-fly voicing changes.

## Techniques

- **A one-note-in, full-chord-out trick to make a plain patch instantly harmonic** — drop Chord ahead of a simple, otherwise-plain instrument patch (a basic sawtooth "womp" in this example) so a single played note triggers a full voicing (an A minor chord here); add a small half-step passing move on a triplet subdivision for extra motion within the held chord. Turns a one-note MIDI part into a chord layer without re-programming the MIDI itself. — You Suck at Producing (Underbelly), [Ableton Tricks I Learned From Remixing Mr. Bill](https://www.youtube.com/watch?v=xk8HsgS9Gbc)
- **Scale-aware toggle turns the shift knobs from semitones into scale degrees** — with scale-awareness off, Chord's per-note shift controls move in fixed semitones, so a voicing built as a minor 3rd stays a minor 3rd even after the song's scale changes to major (risking out-of-key notes); switching scale-awareness on re-maps those same knobs to scale degrees, so the same "+2" shift always lands on the correct diatonic tone (major or minor 3rd, whichever the current [[Scale]] calls for) as the underlying key changes. Pairs with Learn mode: play a custom chord in, hit **Learn** to capture both its notes and the shift amounts needed to reproduce it, then the whole voicing transposes correctly everywhere once scale-awareness is on. → [[Scale]] — You Suck at Producing, [UNLOCK Music Theory with New Tools in Ableton Live 12](https://www.youtube.com/watch?v=Br2a6XxMZ5M)
- **Import Chords from Clip (Live 12.2) — steal a whole progression from any MIDI clip** — arguably the biggest feature of the "Expressive Chords" update: point the device at an existing MIDI clip and press **Import Chords from Clip** to pull every chord out of it in order, then replay that exact progression in your own rhythm/articulation via the device's Strum/Tension/Crescendo/Invert/Reverse controls — genuinely useful even without a dedicated MIDI-pack library. → [[Sample Browser and Clips Workflow]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Extract a progression from audio first, then import it** — for a found sample (e.g. a Splice melodic loop) with no MIDI: drag the audio clip onto a MIDI track and **Convert Harmony** (Ableton's stock audio-to-MIDI harmony extraction — roughly 80–90% accurate, not perfect); set the song's [[Scale]] to the sample's actual key first, then run **Fit to Scale** to transpose away any stray out-of-key notes the conversion picked up. Once the extracted MIDI clip is clean, **Import Chords from Clip** pulls that progression into the chord device for rhythmic rearrangement. → [[Scale]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Modulate articulation controls per note for humanized variation** — route a MIDI input (velocity) or a Random-mode [[Expression Control]]/Random Generator (see [[Randomized Rack Design]]) onto Strum/Tension/Crescendo/Invert so every chord hit gets a slightly different articulation instead of a fixed, repeated strum. — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Save a preset with its captured MIDI baked in** — an Expressive Chords preset can be saved together with the imported/built-in MIDI progression, so recalling the preset recalls the whole progression, not just the device's knob settings. — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Learn mode for an instant custom voicing** — press **Learn**, play a chord once on the keyboard, and every other key played afterward plays that exact same note order — a fast way to lock in a specific voicing without hunting the preset browser. — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Chain-selector rack of chord presets** — group several Chord instances into a rack (each on a different preset via the **hot-swap** button, which jumps straight to the chord-preset folder), select all chains, distribute the chain-select ranges equally, and map that bar to a macro — one knob now switches between chord voicings/spacings. Map **Strum** to a macro and "map to all siblings" so every preset in the rack gets the same strum control; **Tension** shapes the strum's timing curve (linearity), **Crescendo** shapes the velocity ramp across the strummed notes. → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Randomize the whole chord rack per note with Random Generator** — map the chain-selector macro (plus Strum/Tension/Crescendo) to a Random Generator utility rack (see [[Randomized Rack Design]]) instead of turning the knob by hand, so a different chord preset/spacing/strum fires on every incoming MIDI note — the seed of a generative chord-progression rack. Deleting a preset from the rack requires redistributing the remaining chains' ranges. → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Plugins: [[Chord Generator]] (Max for Live alternative — extension/inversion grid instead of a preset browser) · [[Scale]] · [[Expression Control]]
- Techniques: [[Randomized Rack Design]] · [[Sample Browser and Clips Workflow]] · [[MPE Piano Roll Tools]]
- Palette: [[Sound Palette]]
