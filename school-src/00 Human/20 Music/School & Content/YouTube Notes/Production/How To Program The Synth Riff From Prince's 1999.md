---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=l0Blz_pxF1A
channel: Anthony Marinelli Music
duration: "00:10:17"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, sound-design, oberheim]
---

# How To Program The Synth Riff From Prince's 1999

![](https://www.youtube.com/watch?v=l0Blz_pxF1A)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=l0Blz_pxF1A)

## Synopsis

A complete, ear-first patch recreation of the classic "1999" opening synth riff on an Oberheim OB-X (the original was likely an OB-Xa, which has more modulation options, but Marinelli deliberately uses the simpler OB-X to prove the sound is achievable on almost any two-oscillator synth). Walks through his actual listening/diagnosis process — identifying octave doubling, vibrato vs. pulse-width "wiggle," resonance, and envelope shape by ear before touching a knob — then the full patch settings.

## Techniques

- **Ear-first diagnosis method, generalizable to any patch-recreation task**: listen for (1) the part/pitch relationship — here, two oscillators an octave apart; (2) the *type* of modulation ("wiggle") — distinguishing vibrato (pitch/frequency modulation) from pulse-width modulation by listening for whether the movement sounds sine-wave-smooth (both) vs. sawtooth-jagged; (3) filter character — resonance, brightness, attack; (4) envelope shape on both the filter and the amplitude (VCA) separately.
- **Two-oscillator octave stack, both oscillators at full volume** (not half), starting waveform is a pulse wave on both (not sawtooth) specifically because only a pulse wave's width can be modulated — a sawtooth can't produce pulse-width modulation.
- **Two simultaneous, synced modulation sources on both oscillators together, not independently**: (1) pulse-width modulation, sine-wave-shaped, sweeping the pulse wave's duty cycle between a "skinny" thin pulse and a full square wave; (2) frequency modulation (vibrato) at a medium rate, also sine-shaped. Both target BOTH oscillators identically and in sync — **the key distinguishing choice vs. a string patch**, where vibrato is deliberately sent to only one oscillator (or the two oscillators are detuned) to create chorusing/beating instead of the tight, moving-together character this riff wants.
- **Filter**: initial cutoff frequency near zero (fully closed), opened primarily by the filter envelope to roughly its midpoint at peak, moderate-to-high resonance (audibly "squirts" without the vintage Oberheim's filter losing its fundamental — noted as a specific advantage of this era of Oberheim filter design over some other resonant filters), and keyboard control-voltage tracking ON so the filter brightens going up the keyboard (without tracking, higher notes read dull and would need the filter opened further, throwing off the balance of every other knob).
- **Filter envelope**: slight attack (not instant, not slow), fairly quick decay, sustain level with a bit of "bite" left in (not fully closed), moderate release — described as subtle but load-bearing; removing the release collapses the character noticeably.
- **Amplitude (VCA) envelope**: slight attack (softens the transient without being obviously slow), essentially no decay, high/near-full sustain (holding the note lets it "ring through"), and enough release time that the note doesn't get choked off — a VCA release of zero was demonstrated to also mute the filter's own release, since the amp closes before the filter tail can be heard.

## Routed to

- [[Voice Architecture]] — new `## From videos` bullet: two-oscillator octave-doubled patch with synced dual modulation (PWM + vibrato) as the OB-X/OB-Xa "1999" riff architecture.
- [[LFOs and Modulation]] — cross-referenced: synced-to-both-oscillators modulation vs. detuned/single-oscillator modulation as the string-vs-tight-lead distinguishing choice.
- [[Filters and Resonance]] — cross-referenced: keyboard tracking + envelope-driven cutoff + resonance without fundamental loss (vintage Oberheim filter trait).
- [[Sound Selection Guide]] — added as a go-to source/reference for a bright, resonant, PWM-driven synth-riff lead.

## Source

- [How To Program The Synth Riff From Prince's 1999](https://www.youtube.com/watch?v=l0Blz_pxF1A) — Anthony Marinelli Music, 10:17. Captions, high confidence.
