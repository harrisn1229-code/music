---
type: yt-note
date: 2026-07-31
source: youtube
url: https://www.youtube.com/watch?v=IOc-lDT6_ZA
channel: You Suck at Producing
duration: "00:15:13"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: captions
tags: [yt-note, music, production, sound-design, bass, wavetable, operator, serum, vocoder]
---

# Sound Design walkthrough of my new song with Pixelwax!

![](https://www.youtube.com/watch?v=IOc-lDT6_ZA)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=IOc-lDT6_ZA)

## Synopsis

A full-song sound-design breakdown ("Monkey Drum," with Pixelwax) covering leads, creature-voice textures, two contrasting bass layers, guitar, and stab chords. Highlights include a genuinely universal fix — faking an ADSR on any plugin lacking one via Envelope MIDI mapped to a following Utility's Gain — a parallel dry/pitched-wet Grain Delay rack, a subtle-but-real Operator 808 trick (offsetting Oscillator B's Phase for extra weight), Serum's Hyper/Dimension used Dimension-only (with a free Xfer alternative), Vocoder used as a pure character effect on a bass (not vocal morphing), and a reverb-send automation trick to keep a shimmer's tail from smearing across the whole song. Also several credited sample-pack/preset uses (Blake Scallon, Cymatics' San Holo lead) treated honestly as valid sound-design shortcuts.

## Techniques

- **Fake an ADSR on any plugin lacking one, via Envelope MIDI → a following Utility's Gain** — map Envelope MIDI's output to a Utility's Gain knob for any plugin that has no built-in Sustain/Release (a sustain-only synth-string emulation here) — the note now decays/releases as if the original plugin had a real envelope. → [[Envelope MIDI]], [[Utility]]
- **Parallel dry/wet Audio Effect Rack for a pitched Grain Delay layer** — split a wavy synth into a dry chain and a wet chain (Grain Delay pitched up an octave, Auto Filter trimming extreme highs/lows) inside one rack, rather than relying on Grain Delay's own Dry/Wet — makes it easy to process the wet half further without touching the dry signal. → [[Parallel Processing]], [[Grain Delay]]
- **Harmonic Series wavetable + dual envelope mapping + Frequency Shifter + Sine-mode Erosion, for a "tweety bird" creature voice** — Env→Wave Position (harmonics build over the note) + Env→Pitch Bend (chirp), then a small frequency shift (~−5 kHz) and Erosion's Sine mode as a lo-fi bit-crusher. → [[Wavetable]], [[Shifter]], [[Erosion]]
- **Operator 808: Oscillator B Phase offset (~30) for extra weight, no other change** — on a Tetris-shape 808 (Osc B sine, Coarse 2, modulating Osc A's sub), nudging Oscillator B's **Phase** alone makes the same patch read heavier. → [[Operator]], [[Bass Design]]
- **Serum's Hyper/Dimension used Dimension-only (Hyper at zero), with a free non-Serum equivalent (Xfer Dimension Expander)** — cleaner width than running both halves together; Utility's **Bass Mono** mode afterward keeps the sub centered while the harmonics stay wide. → [[Serum 2]], [[Plugin Wishlist]]
- **Vocoder as a pure character effect on an instrument, not a vocal-morph tool** — dropped straight on a bass for its robotic/Daft-Punk-adjacent coloring; Carrier must stay on Modulator (not Noise) or the result turns harsh. → [[Vocoder]], [[Bass Design]]
- **Stack a second OTT plainly in series when one isn't enough** — no macro/rack needed, just insert another instance after the first. → [[OTT]]
- **Automate a shimmer reverb SEND's level (not the device's own Dry/Wet) to bloom per-hit and close immediately** — prevents a beautiful long shimmer tail from bleeding across the whole song when it should only color individual chord hits. → [[Reverb]], [[Automation]]
- **Reused patches/chains across sounds**: the same Grain Delay "sparkle" patch reused on a guitar layer; the same Ableton Guitar & Bass pack (Electric Bass, Guitar Soft Tremolo preset) providing both a bass and guitar layer; credited sample-pack sounds (Blake Scallon) and a credited preset (Cymatics' San Holo lead — simple saw + noise modulating Coarse pitch for lo-fi character) used honestly rather than hidden. *(No dedicated routing — noted as a workflow philosophy: presets and packs are legitimate building blocks, not something to be embarrassed about.)*

## Routed to

- [[Envelope MIDI]] — universal ADSR-faking technique added
- [[Parallel Processing]] — dry/pitched-wet rack architecture technique added
- [[Wavetable]] — "tweety bird" creature-voice technique added
- [[Operator]] — Oscillator B Phase-offset 808-weight technique added
- [[Serum 2]] — Hyper/Dimension Dimension-only technique added
- [[Vocoder]] — non-vocal character-effect use case added
- [[OTT]] — manual series-stacking bullet added
- [[Reverb]] — shimmer send-automation technique added
- [[Plugin Wishlist]] — Xfer Dimension Expander (free) added

## Source

[Sound Design walkthrough of my new song with Pixelwax!](https://www.youtube.com/watch?v=IOc-lDT6_ZA) · You Suck at Producing (Underbelly ft. Pixelwax) · 15:13 · captions (high confidence — clean creator captions) · transcript: [[Sound Design walkthrough of my new song with Pixelwax! (transcript)]]
