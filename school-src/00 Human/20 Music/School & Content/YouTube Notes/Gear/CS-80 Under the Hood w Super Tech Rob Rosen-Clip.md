---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=ORZr7h_Ojq0
channel: Anthony Marinelli Music
duration: "00:40:34"
video_type: gear
music_enriched: true
transcript_source: captions
tags: [yt-note, music, gear, vintage-synths, cs-80, repair]
---

# CS-80 Under the Hood w/ Super Tech Rob Rosen-Clip

![](https://www.youtube.com/watch?v=ORZr7h_Ojq0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=ORZr7h_Ojq0)

## Synopsis

A standalone "clip" re-cut of the CS-80 "under the hood" segment from the same Rosen Sound studio visit already covered in full in [[Rob Rosen Reveals His Ultimate Synth Collection]] (same opening lines, same interview, same two speakers) — this version runs longer and goes deeper into the internal circuit tour specifically: oscillator boards and how they generate/regulate waveforms, the key-sensor mechanism behind polyphonic aftertouch and velocity (conductive-rubber pads sending analog 0–5V that gets multiplexed to the right voice), the DAC and key-code assigner, the TSB/TKC/KAS support boards, the dedicated effects board (chorus/tremolo via BBD + Yamaha VCAs), and the ring modulator's implementation (oscillator chip, envelope chip, depth-VCA chip). This is **pure repair/circuit-architecture content, honestly** — no production technique, mix setting, or sound-design recipe beyond what's already extracted from the parent interview. The organ-stacking trick and the analog-imperfection-as-character point already routed from [[Rob Rosen Reveals His Ultimate Synth Collection]] cover the only genuinely reusable ideas either video contains; this clip adds circuit-level detail (how polyphonic aftertouch physically works, how the ring modulator's signal chain is built) that's interesting but not something a producer without a CS-80 in for repair can act on.

## What's taught

- **Polyphonic aftertouch mechanism (informational):** each key has a conductive-rubber pad under it; pressing harder varies the resistance between two contact points, producing an analog voltage (0–5V or 0–7V per Rob's estimate) proportional to pressure — that voltage gets digitized (DAC) and multiplexed out to whichever voice/parameter needs it (filter, amp, pitch bend can all read the same after-touch voltage independently, on both of the CS-80's two layers).
- **Ring modulator signal chain (informational):** built from a dedicated oscillator chip, a differential-function chip (the actual ring-mod multiplication), an envelope chip, and a depth VCA — the envelope and depth stages are optional (the ring modulator still works without them, just without dynamic control over the effect).
- **Effects board (informational):** chorus and tremolo are generated via a BBD (bucket-brigade delay) chip plus Yamaha-branded VCAs — an entire dedicated circuit board for what a modern instrument does "on one little function," per Rob's own framing.
- **Comparison aside:** the Black Corporation Deckard's Dream (an analog CS-80 clone) uses genuine analog circuitry with 3340-family oscillators (same family as an OB-8 or Prophet-5) and a wave-shaping circuit "inspired by" but not identical to the original CS-80's; envelopes are software-controlled rather than full analog. The Arturia CS-80 V is acknowledged as a pure software emulation with none of the original circuit design.

## Routed to

- None — the two genuinely reusable ideas in this interview (CS-80 organ-stacking via oscillator layering, and analog voice-imperfection-as-character) were already routed to [[Oscillators and Waveforms]] and [[Voice Architecture]] from [[Rob Rosen Reveals His Ultimate Synth Collection]]; this clip's additional content is circuit-repair detail with no further production technique to extract.

## Source

[CS-80 Under the Hood w/ Super Tech Rob Rosen-Clip](https://www.youtube.com/watch?v=ORZr7h_Ojq0) · Anthony Marinelli Music · 00:40:34 · captions, high confidence. Transcript: [[CS-80 Under the Hood w Super Tech Rob Rosen-Clip (transcript)]]
