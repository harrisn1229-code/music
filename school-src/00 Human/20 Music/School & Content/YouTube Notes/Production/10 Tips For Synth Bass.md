---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=nELAOF1iI7Y
channel: Anthony Marinelli Music
duration: "00:39:56"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, bass, sound-design, oscillators, envelopes, filters]
---

# 10 Tips For Synth Bass

![](https://www.youtube.com/watch?v=nELAOF1iI7Y)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=nELAOF1iI7Y)

## Synopsis

Anthony Marinelli — a 40-year film/commercial/record synth programmer whose credits include Michael Jackson's *Thriller* bassline — walks through ten hands-on synth-bass-programming tips, demonstrated live across a rack of vintage analog gear (ARP 2600, Minimoog, Jupiter-8, Yamaha CS-80/CS-30, Sequential Prophet, Synthex). Every tip is framed as portable to any subtractive analog-style synth — VST, plugin, or hardware — not specific to the vintage units on screen. The tips run oscillator-up: tuning discipline, multi-oscillator phase management, waveform choice, a same-oscillator sine-blend trick, envelope sustain/release, filter keyboard tracking, real-time performance controllers, note-length/articulation phrasing, a parallel-effects mult trick, and a closing philosophy tip about giving a sound "personality."

## Techniques

1. **Tune your oscillators — always, every session.** Analog oscillators drift out of tune on their own; a synth that was in tune yesterday may not be today. If deliberately using multiple detuned oscillators for a fat/wide sound, don't spread them symmetrically — favor one as the true-pitch center (louder/centered) with the others detuned slightly below and above, mirroring how a piano tuner "stretch tunes" a piano's tripled unison strings (one true, one flat, one sharp) for fatness without losing a sense of center pitch.
2. **On a 2-oscillator bass, fix note-to-note phase cancellation ("some notes go thin, some go fat" moving up the keyboard) by favoring one oscillator's volume over the other, not by re-tuning.** Especially relevant when the second oscillator is an octave below/above — raise the primary oscillator's level so it always carries through regardless of the phase relationship at any given note.
3. **Waveform choice for bass: square, not saw, as the default starting point.** Square wave skips even harmonics, concentrating energy in the fundamental and low odd harmonics — rounder and more focused for bass than a saw's full harmonic series, while still carrying enough edge to articulate a line (unlike a plain sine, which is too boomy/undefined). A pure sine alone reads as a "boombox" hit, not a playable line.
4. **Thicken a single oscillator via pulse-width modulation instead of adding a second oscillator (avoids all tuning/phasing risk).** Route the envelope generator (a long-decay ADSR) into the pulse-width-modulation input for a shape that evolves with the note, or use a slow LFO (sine or other waveform) for a chorus-like effect that can be tempo-synced for a rhythmic width-pump ("sidechain-style chorus on the bass").
5. **The Yamaha CS-series trick: blend a sine wave from the SAME oscillator generating the main waveform back in underneath it.** Because it's the same source, it's automatically in tune with zero phasing risk — pure added low-end weight. The sine alone is too undefined to carry a line, so it's always blended under a square or saw, never a full replacement; dial the blend until low notes read full without the line losing definition. On synths without this built-in tap, approximate it with a second oscillator set to sine and favor the main oscillator per tip 2.
6. **Envelope sustain and release matter more for bass than they get credit for.** A small amount of sustain (not zero) lets a held note actually hold rather than always decaying regardless of how long the key is down. A small amount of release (not zero) keeps repeated/rapid-fire notes from sounding clipped/gated — without it, a triggered bass part sounds percussive and disconnected no matter the note length; with a touch of release, repeated hits regain a natural tail.
7. **Minimize keyboard filter tracking on a bass patch — the opposite instinct from leads.** Real bass guitars get duller, not brighter, as they play higher up the neck (less string length/energy). Tracking the filter cutoff to pitch makes upper bass notes read unnaturally bright/thin instead. Marinelli's own practice: little to no tracking on almost every bass sound he's used on records; add filter envelope amount instead if upper notes need more presence, and reserve tracking-on for parts that move around a lot in the upper register.
8. **Use real-time performance controllers to give the bass line personality: pitch bend, glide/portamento (slides between notes instead of jumping), vibrato, and mod-wheel-to-filter-cutoff.** These are the "go-to" three (pitch, glide, vibrato) plus opening the filter live via mod wheel or an expression pedal if the controller has a free hand. Mixing and matching these performance layers is framed as what separates an expressive part from a static, purely-programmed one.
9. **Articulate note length deliberately: mix long held notes and short/muted ones, don't default to one or the other.** Worked example: the *Thriller* bassline's actual rhythm reads "long-long-long-long-short-short-long-long-short-short-long-long-long-long-short-short" — a mostly-uniform gate length reads mechanical by comparison. Also know whether the instrument is single-trigger (legato — a new note played without releasing the first doesn't re-attack the envelope, so the phrase glides/connects) or multi-trigger (every note re-attacks even under a legato phrase) — some hardware (Minimoog) is hard-wired single-trigger with no option to change it. If programming rather than playing, check MIDI gate lengths aren't defaulting to one uniform value ("machine-gunning" the part).
10. **Mult the dry bass signal in parallel with a pedal-effected copy, rather than committing fully wet.** A hardware mult splits one input to multiple identical outputs; run one path straight and the other through an effects pedal (distortion, phase, delay, reverb — whatever fits), then blend. Keeping the dry path restores definition, punch and high end a fully-wet signal loses, and mixing the phase relationship between the two paths can add extra width/character. Balance is a spectrum from mostly-dry-with-a-touch-of-effect to mostly-effected-with-a-touch-of-dry-for-definition — both are legitimate depending on how much character is wanted. In-DAW equivalent: a parallel send/return rather than a physical mult.
11. **(Framing tip, not a technique) Treat every sound-design choice as a contribution of "personality," the way a session musician contributes to a track.** An unusual filter type (a band-pass instead of the default low-pass), a pitch bend at the right moment, portamento used sparingly — small, deliberate choices that make a programmed part feel like it was played by someone with a point of view, rather than just functional. No settings given; explicitly an attitude/practice, not a recipe.

## Routed to

- [[Voice Architecture]] — oscillator tuning discipline + uneven multi-voice detune weighting (tip 1), favor-one-oscillator anti-phasing fix (tip 2), single/multi-trigger + long/short note phrasing (tip 9).
- [[Oscillators and Waveforms]] — square-wave-for-bass default (tip 3), envelope/LFO-driven PWM (tip 4), same-oscillator sine-blend trick (tip 5).
- [[Envelopes and ADSR]] — nonzero sustain/release for bass articulation (tip 6).
- [[Filters and Resonance]] — minimal keyboard tracking for bass, contrasting the page's general lead/pad default (tip 7).
- [[Bass Design]] — full synthesis-side checklist added as a headline "From videos" entry, upstream of the note's existing mix-processing content.
- [[Parallel Processing]] — mult-and-blend dry/effected bass (tip 10).
- Tip 8 (real-time performance controllers) and tip 11 (personality framing) folded into the [[Bass Design]] checklist entry rather than given separate homes — neither carries settings specific enough for its own bullet elsewhere.

## Source

[10 Tips For Synth Bass](https://www.youtube.com/watch?v=nELAOF1iI7Y) · Anthony Marinelli Music · 00:39:56 · captions, high confidence. Transcript: [[10 Tips For Synth Bass (transcript)]]
