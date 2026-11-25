---
type: yt-note
date: 2026-07-31
source: youtube
url: https://www.youtube.com/watch?v=p60y3Y3dE3M
channel: You Suck at Producing
duration: "00:13:06"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: captions
tags: [yt-note, music, production, sound-design, fm-synthesis, operator, serum]
---

# Why Ableton's Operator is Better than Serum (for FM) | Sound Design Tutorial

![](https://www.youtube.com/watch?v=p60y3Y3dE3M)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=p60y3Y3dE3M)

## Synopsis

A genuine FM-synthesis lesson using Operator as the FM engine, then routing the result through Serum's effects section for finishing. Covers the fundamentals clearly (fundamental + sidebands, Coarse as a frequency ratio, Fine for detuning sidebands), the "any waveform is just a specific harmonic recipe" lesson (sine = 1st harmonic only, square = odd harmonics, sawtooth = all harmonics), a genuinely obscure and valuable MIDI-routing fix for getting a non-instrument effects rack's internal modulation to actually trigger, and a "one LFO drives several parameters at once" cohesive wobble-chain technique. Old video (2019) but the FM fundamentals and the MIDI-routing trick are timeless and non-obvious.

## Techniques

- **FM fundamentals: fundamental + sidebands, Coarse as a ratio, Fine to detune sidebands** — a modulator oscillator's Level controls how much FM is applied (more level = more visible harmonic sidebands around the fundamental); Coarse sets the modulator's frequency as a whole-number RATIO to the fundamental (Coarse 2 = 2x frequency, Coarse 3 = 3x, etc. — more sidebands as the ratio climbs); Fine detunes those sidebands away from the fundamental without moving the fundamental itself.
- **Any waveform is a specific harmonic recipe — hand-drawable, or reachable via FM** — sine = only the 1st harmonic; square = only the ODD harmonics; sawtooth = every harmonic present, fully maxed. → [[Operator]] (draws on/reinforces the existing hand-drawn-harmonics + odd/full-harmonic-stack techniques already documented there)
- **A sawtooth FM modulator with Coarse-punched gaps, for an abrasive harmonic cluster** — set the modulator to a full sawtooth and bring the carrier's own level to zero so the FM output alone carries the tone, then raise the modulator's Coarse to punch deliberate gaps into the resulting dense harmonic cluster rather than just shifting it wholesale. → [[Operator]]
- **Stagger independent envelopes on carrier and modulator oscillators (Sustain 0 on both) so FM harmonic content blooms and fades across the note** — distinct Attack/Decay timings per oscillator make the tone's harmonic density evolve over time instead of sitting at one fixed FM ratio. → [[Operator]]
- **MIDI-loopback fix: feed note-on triggers to a standalone effects rack (Serum 2 FX) that isn't receiving them from its host track** — an audio-effect device's own envelopes/LFOs need a MIDI note-on to fire, but a track just processing another instrument's audio doesn't normally pass that through; create a new MIDI track, set its MIDI From to the source instrument's track, MIDI To back into the effects-rack track, and Monitor to In — the note-on now reaches the effect's internal modulation even though the audio comes from elsewhere. → [[Serum 2 FX]]
- **One LFO mapped to several Serum FX stages at once, for a cohesively "breathing" wobble** — the same slow, custom-shaped LFO (BPM sync off, ~1.1 Hz) driving filter cutoff, an EQ low-cut's frequency, a distortion stage's Drive, AND a reverb's Mix simultaneously — every stage peaks and recedes together on one cycle instead of each device moving independently. → [[Serum 2 FX]]

## Routed to

- [[Operator]] — three new bullets: harmonic-gap sawtooth-modulator technique, staggered dual-oscillator envelope technique
- [[Serum 2 FX]] — new Techniques section created; MIDI-loopback trigger fix and multi-parameter LFO-sync technique added

## Source

[Why Ableton's Operator is Better than Serum (for FM) | Sound Design Tutorial](https://www.youtube.com/watch?v=p60y3Y3dE3M) · You Suck at Producing · 13:06 · captions (high confidence — clean creator captions) · transcript: [[Why Ableton's Operator is Better than Serum (for FM) (transcript)]]
