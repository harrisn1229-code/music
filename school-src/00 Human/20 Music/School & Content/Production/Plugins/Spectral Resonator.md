---
type: plugin
title: "Spectral Resonator"
category: Modulation
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Spectral Resonator

**Category:** Modulation
**Vendor:** Ableton

## What it is

Ableton's stock spectral resonator (Live 11 Suite) — resonates the incoming signal at a tunable frequency/note, with control over harmonic spacing (stretch/compress) and pitch-shifting, plus a MIDI input path so an external track's notes/chords can drive which pitches it resonates at.

## What it's used for

A "robotic vocoder that isn't a vocoder" — tonal, resonant textures on vocals, samples, or full tracks; MIDI-driven harmonic/chordal coloring when fed notes from another track.

## FX chain notes

Used as an insert/texture device on a vocal, sample, or lead layer; when MIDI-driven, needs a MIDI-from-track routing set up (source track + Poly mode) rather than sitting purely as an audio effect.

## Techniques

- **Re-harmonize an existing melodic synth part by MIDI-driving Spectral Resonator from a new chord track, instead of rewriting the original melody's notes** — when a sampled/synth melody from a remix source is stuck playing the wrong notes for a new chord progression, don't re-record it: drop Spectral Resonator on that part, switch its input to **MIDI**, and select a separate MIDI track playing the new (power-chord) progression as the source — the resonator effectively re-pitches the existing part to follow the new harmony in real time. A/B with the device bypassed vs. engaged to confirm the effect (the source video calls the improvement dramatic). → [[Bassline Writing]] — You Suck at Producing (Underbelly), [Ableton Tricks I Learned From Remixing Mr. Bill](https://www.youtube.com/watch?v=xk8HsgS9Gbc)
- **MIDI-driven percussion pitching + per-hit Decay automation + mode-switching, for "digital nostalgia" perc textures** — route a chord-playing MIDI track's output into Spectral Resonator's MIDI input on an atonal percussion/perc-hit layer, so the resonator pitches those hits to the actual chord notes instead of leaving them tonally neutral; automate the **Decay** parameter so specific hits ring out longer than others (rather than a uniform decay across the whole loop); and try the different **modulation modes** for distinct textural variants of the same resonated percussion. → [[Morph]] — You Suck at Producing, [5 Ways To Make Any Genre Sound 'Hyper'](https://www.youtube.com/watch?v=MFCiyKwWjeQ)
- **Mental model vs. a plain static resonator: a bunch of tuned EQ notches, done for you** — a plain resonator (e.g. [[kHs Resonator]]) is conceptually "just a bunch of EQ notches tuned to specific pitches"; Spectral Resonator does the same underlying thing but is judged to sound noticeably better/cooler, plus adds the MIDI-input path a static resonator lacks. Used as a texture layer on top of a creepy noisy sample chain, with **Range reduced** for a calmer, more pad-like result rather than an aggressive resonant sweep, and can be MIDI-driven from a muted chord-track "carrier" the same way as the Poly-mode technique below. → [[kHs Resonator]], [[Vocoder]] — dnksaus, [Color Bass and Future Sound Design in 2023](https://www.youtube.com/watch?v=Izo8-oYXvOQ)
- **Resonate a tuned frequency/note, with stretch and pitch-shift** — dial in a resonant frequency or specific note (e.g. tune to 440 Hz), then use the stretch/compress control to spread or tighten the spacing between resonant harmonics, and pitch-shift the whole resonated result on top. — dnksaus, [The Underrated Spectral Stock Plugins in Ableton](https://www.youtube.com/watch?v=AoYHYsrnjYo)
- **MIDI-driven resonance from another track, in Poly mode** — turn on MIDI input and route it from a chord-playing track (demoed from a [[Wavetable]] chord part), then switch the device to **Poly** so it resonates the full chord rather than just one note — the MIDI track becomes the "carrier" harmony driving what the resonator sounds like on the audio signal running through it. — dnksaus, [The Underrated Spectral Stock Plugins in Ableton](https://www.youtube.com/watch?v=AoYHYsrnjYo)
- **On a vocal: robotic/atmospheric color without a true vocoder** — dropped on a vocal (demoed on a flute loop as a stand-in), it reads as a robotic, resonant character distinct from an actual vocoder — no carrier/modulator vocoder routing required, just the resonator itself doing the coloring. → [[Pitch and Formant]] — dnksaus, [The Underrated Spectral Stock Plugins in Ableton](https://www.youtube.com/watch?v=AoYHYsrnjYo)
- **Built-in Chorus and Granular modes** — Chorus randomly modulates the resonated harmonics for movement; Granular adds a grain-based texture option on top of the resonance — both accessible inside the device rather than needing a separate modulation/granular plugin after it. → [[Granulator 3]] — dnksaus, [The Underrated Spectral Stock Plugins in Ableton](https://www.youtube.com/watch?v=AoYHYsrnjYo)
- **Turn Harmonics down on a familiar sample for an extremely wet texture** — demoed on the Beastie Boys' "Intergalactic": pulling the Harmonics control down turns a recognizable sample into a heavily wet, texture-forward result. — dnksaus, [The Underrated Spectral Stock Plugins in Ableton](https://www.youtube.com/watch?v=AoYHYsrnjYo)
- **Scale-aware "candy rain" texture** — with scale-awareness and Quantize both on, the Frequency knob finds a tonal center and Decay pulled down gives a colorful granular-rain texture; automating Formant/Stretch/Pitch Shift/Decay over time (e.g. via the creator's own Multi-Shaper) keeps it evolving. → [[Randomized Rack Design]], [[Plugin Wishlist]] — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)

## See also

- Plugins: [[Spectral Time]] · [[Spectral Blur]] · [[Hybrid Reverb]] · [[Wavetable]]
- Effects: [[Modulation]] · [[Pitch and Formant]]
- Techniques: [[Randomized Rack Design]]
- Palette: [[TEXTURE Slot]] · [[Sound Palette]]
