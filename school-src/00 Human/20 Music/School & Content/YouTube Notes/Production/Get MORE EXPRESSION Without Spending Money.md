---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=DTuMTUzVHhc
channel: Anthony Marinelli Music
duration: "00:12:08"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, modulation, lfo, strings]
---

# Get MORE EXPRESSION Without Spending $

![](https://www.youtube.com/watch?v=DTuMTUzVHhc)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=DTuMTUzVHhc)

## Synopsis

A focused demo of the mod wheel as a route to many different effects, not just vibrato — different LFO shapes, different destinations (pitch, filter), noise as a modulation source, and a full mechanism-level breakdown of why modulating only ONE oscillator's pitch (out of two) is what makes a patch sound like real strings, closing with a genuinely useful gotcha about pulse-width modulation and register.

## Techniques

- **The mod wheel is a routing choice, not a fixed vibrato control** — the same wheel can carry a square-wave LFO instead of triangle/sine (a more rhythmic, "steppy" modulation rather than smooth vibrato), and can be routed to the filter instead of oscillator pitch. Routed to the filter with a fast rate and no wheel movement at all, changing the LFO speed and a low initial cutoff produces a sample-and-hold-like stepped filter texture purely from static parameter choices, not live playing.
- **Noise as an "overlooked" modulation/character source**: a small, subtle amount of noise blended into a saw oscillator adds "personality" that reads as flat/bland without it, but too much reads as simply duller rather than more textured — a little goes a long way. Layering a slow triangle-wave LFO on top of a light noise blend produces a "cassette wow-and-flutter" vintage-tape warble character.
- **The real mechanism behind a classic mod-wheel "strings" patch: modulate the PITCH of only ONE of two oscillators, not both.** Two sawtooth oscillators, no resonance; route a triangle-wave LFO (via the mod wheel) to ONLY oscillator A's pitch. The result reads as a natural chorus/ensemble-strings effect because the two oscillators drift in and out of phase/pitch relative to each other. Putting the identical vibrato on BOTH oscillators together (the typical factory-preset wiring) instead produces a uniform, generic "synthy" wide vibrato — not strings — because there's no relative drift between the two sources for the ear to read as an ensemble.
- **Find a fixed, moderate mod-wheel position rather than full modulation depth** — too much depth on the single-oscillator vibrato trick above stops sounding like strings; the "just right" amount (dialed in by ear, then left static) is what actually reads as a string ensemble. Slow the attack and add release on top for the same effect.
- **An alternative route to the same chorusing without pitch modulation at all: apply the LFO to pulse WIDTH on one square-wave oscillator instead of to pitch.** This produces chorusing/thickness with a different color than pitch-vibrato; combining a touch of PWM chorus with a touch of genuine pitch vibrato and a touch of noise gives an especially "stringy," rosin-like texture.
- **Critical PWM gotcha: pulse-width-modulation depth/rate that sounds fine in a high register can read as audibly out of tune in a low register, at the identical settings.** The fix is register-dependent: slow the LFO rate (or center/reduce the pulse-width excursion) specifically for low notes; a faster PWM rate is usable in the high register without the same artifact, and can support full chords up there. Worth checking any PWM-vibrato patch across its actual playing range before committing to one global rate.

## Routed to

- [[LFOs and Modulation]] — new entry at the top of `## From videos`: mod-wheel-as-routing-choice (shape + destination), noise as a modulation source, and the PWM register-dependence gotcha.
- [[Voice Architecture]] — cross-referenced: the single-oscillator-modulation-vs-dual mechanism behind a convincing strings patch, and the moderate-not-maximum modulation-depth rule.

## Source

- [Get MORE EXPRESSION Without Spending $](https://www.youtube.com/watch?v=DTuMTUzVHhc) — Anthony Marinelli Music, 12:08. Captions, high confidence.
