---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=zcabM3_wfTs
channel: Anthony Marinelli Music
duration: "00:08:01"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, workflow]
---

# How To Program The Synth Lead From The Weeknd's "Blinding Lights"

![](https://www.youtube.com/watch?v=zcabM3_wfTs)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=zcabM3_wfTs)

## Synopsis

A deliberate change of pace from the Thriller-era breakdowns: recreating a MODERN reference sound (The Weeknd's "Blinding Lights" lead, on a Jupiter-8) without knowing what synth actually made it — a live demonstration of the ear-first analysis method applied to an unknown source, plus an explicit workaround for not having the "right" gear.

## Techniques

- **Polyphonic vs. monophonic instrument choice decided by listening for note-to-note RING/OVERLAP, not by guessing.** Hearing sustained ring between overlapping notes on the reference ruled out a monophonic synth immediately — a poly instrument was required to get that overlap at all. A concrete example of choosing the instrument category from a specific audible cue rather than defaulting to whatever's on the desk.
- **PWM depth must scale DOWN for low-frequency material and can go much heavier on high-frequency material — the same modulation amount reads as "rich/chorusy" up high but "squirrely"/out of tune down low.** Stated as a general rule, not specific to this patch: check register before committing to a PWM depth setting, and back it off specifically on bass-register parts.
- **Pulse wave (for PWM-driven chorus/richness) + sawtooth (for pitch definition/"point") together, the same combination logic seen elsewhere on this channel** — pulse handles width/warmth, sawtooth supplies the harmonic edge that keeps the pitch legible; wide-open low-pass filter (24 dB/octave) with no resonance, so none of the character comes from filter shaping.
- **"Modern" analog-plus-chorus/delay/reverb/saturation coloring, named directly as a genre expectation**: even a well-matched analog patch usually needs chorus/delay/reverb/saturation layered on top to read as "modern" rather than "vintage" — demonstrated with a direct chorus on/off A/B.
- **The explicit overdub workaround for missing multi-oscillator hardware**: if the only available synth has one oscillator, record a sawtooth pass, then a separate pulse-wave pass, and blend them (plus a plugin chorus) to approximate the same combined character achieved natively on a 2-oscillator synth — a concrete example of "reconstruct via overdubbing what your gear can't do in one patch," restated as the general workflow for any modern reference sound whose exact source synth is unknown: analyze by ear, get as close as available gear allows, then identify and fill the specific gap via overdubbing rather than assuming a single patch has to do everything at once.

## Routed to

- [[Oscillators and Waveforms]] — new bullet on scaling PWM depth to register (heavier high, lighter low).
- [[Layering and Stacking]] — cross-linked for the overdub-to-approximate-a-multi-oscillator-patch workaround.

## Source

- [How To Program The Synth Lead From The Weeknd's "Blinding Lights"](https://www.youtube.com/watch?v=zcabM3_wfTs) — Anthony Marinelli Music, 8:01. Captions, high confidence.
