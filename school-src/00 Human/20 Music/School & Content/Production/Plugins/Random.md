---
type: plugin
title: "Random"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Random

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock MIDI effect that randomly transposes incoming notes by a defined interval — a Chance-of-being-applied device with an Interval amount and a Sign (Add/Sub) direction, distinct from [[Expression Control]]'s Random mode (a continuous random modulation source) and from dnksaus's own "Random Generator" macro-randomizer utility rack (see [[Randomized Rack Design]]).

## What it's used for

Adding occasional octave (or other interval) jumps to a melodic line at random, rather than a fixed, predictable transposition on every note.

## FX chain notes

Sits in a MIDI chain after the main note-generating devices (arpeggiator, chord rack) so it randomly re-transposes the notes those devices already produced.

## Techniques

- **Chained after Arpeggiator, feeding a Scale device, for a generative-but-in-key melody** — placed directly after [[Arpeggiator]] (Rate Mode = Free), Random re-transposes each arpeggiated hit; a [[Scale]] device chained after that quantizes the randomized result back into a chosen scale/set of pitches — turns a fixed arpeggio into a self-generating melodic line for tonal/harmonic instruments, distinct from the octave-jump use below (interval/direction on a normal melodic line rather than a generative arp chain). → [[Arpeggiator]], [[Scale]], [[Melody Writing]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **Occasional random octave jumps** — set **Interval** to 12 (an octave) and **Sign** to **Add** so some notes get randomly bumped up an octave (flip Sign to **Sub** for random octave-downs instead) — a lighter-touch, note-level alternative to fully re-randomizing pitch, good for adding unpredictable accents to an otherwise-generated melody line. → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Plugins: [[Expression Control]] (continuous random modulation, vs. this device's per-note interval jump) · [[Arpeggiator]] · [[Scale]] · [[Velocity]]
- Techniques: [[Randomized Rack Design]]
