---
type: plugin
title: "Arpeggiator"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Arpeggiator

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock MIDI arpeggiator — Style, Rate/sync, Steps, and Gate controls that turn held notes/chords into a repeating, patterned sequence.

## What it's used for

Turning a static chord or note into rhythmic movement — melody lines, plucked chord patterns, generative sequences when combined with randomized modulation.

## FX chain notes

Sits in a MIDI chain before the instrument (and typically before any chord/randomization devices further down the chain), converting held notes into a moving sequence those devices then process further.

## Techniques

- **Free Rate Mode decouples repeats from BPM — 10–1000 ms range, plus a resample-to-new-MIDI-track workflow to lock the result in** — set **Rate Mode = Free** so Rate sweeps a raw **10 ms–1000 ms** interval instead of BPM-synced divisions; hold a note and ride Rate live for real-time stretch/squish rhythms, or for precision build a 2-bar clip with one **Legato** note on middle C and draw a Rate automation curve over it — different curve shapes give different rhythms, and past a certain Rate threshold the ear stops hearing discrete hits and starts hearing a continuous pitched tone. Because each hit is a distinct MIDI note event (not just audio modulation), it can be captured permanently: create a new MIDI track, arm it, set its input/**MIDI From** to the arpeggiated track, and record — the resulting clip's hits can then be manually stretched, compressed, or chopped in the note editor. Used to build a song's central rhythm by resampling an arpeggiated **hi-hat** track, then reusing that MIDI clip to drive bass, strings, and vocal rhythms elsewhere in the same song. → [[Automation]], [[Rhythm and Groove]], [[MIDI Generate and Transform Tools]], [[Kick Design]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **Gate, chords-in, and Style as secondary shaping parameters** — modulating **Gate** introduces note-length variation relative to the current Rate value; feeding **chords** in (instead of single notes) adds pitch variation across the arpeggiated hits plus knock-on variation for any key-tracked parameters/effects downstream; the **Style** parameter changes how the chord gets interpreted/ordered. → [[Chord]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **Random → Scale after Arpeggiator for a generative-but-in-key melody, and an instrument's own built-in LFO trigger mode for per-hit random modulation** — chain a [[Random]] MIDI effect right after Arpeggiator (re-transposes each generated hit) then a [[Scale]] device after that (quantizes the randomized result into a chosen scale) for a self-generating melodic line on tonal/harmonic instruments. Separately, for instruments with a built-in LFO: enable its note-on/trigger mode with wave = Random or Sample & Hold, so every incoming arp hit retriggers the LFO to a fresh random value assignable to pitch, filter cutoff, etc. — this is the instrument's own internal LFO/trigger mode, distinct from the Max for Live [[LFO]] device. → [[Random]], [[Scale]], [[Melody Writing]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **ARP as the last layer added, specifically to fill the high end and lift energy** — once the low/mid melodic layers of a build were locked in, an Arpeggiator was added last, deliberately to occupy the top of the arrangement and increase perceived energy — a simple "what's the melody missing" fix rather than a compositional starting point. → [[AIR Slot]], [[Melody Writing]] — loner, [do you need pedals to make industry level melodies!?](https://www.youtube.com/watch?v=H-3SmPmGJOg)
- **Play Order mode when a chord device upstream is already randomizing articulation** — with a randomized [[Chord]]/Expressive Chords device feeding it (strum/tension/crescendo/invert varying per hit), set Arpeggiator to **Play Order** rather than a musical Style so it doesn't fight the chord device's own note-order randomization; map Rate and Steps (restrict to a sensible octave range) plus Gate to macros for further variation on top. → [[Chord]], [[Randomized Rack Design]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Restrict Style's range before randomizing it** — mapping Arpeggiator's **Style** parameter to a random source (the "Random Generator" utility rack — see [[Randomized Rack Design]]) needs its range trimmed first, otherwise it can land on "chord" style modes and undo the arpeggiation — restrict the range so randomization stays within genuine arpeggio styles. — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Randomize Rate between a restricted range with a Binary random generator** — group the Arpeggiator into a rack, map **Rate**, restrict its range to a musically useful window (e.g. 16th to 8th notes), then drive it with a "Random Generator" utility rack (see [[Randomized Rack Design]]) set to **Binary mode** (outputs only the lowest or highest mapped value, a hard toggle rather than a smooth random spread) — a coin-flip between two arp speeds instead of a fully free-running rate. — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Randomize Steps and Gate alongside Style for a fully generative arp line** — mapping Style, Steps, and Gate to separate random sources (rather than just Rate) varies the arp's pattern shape and note length on every trigger, not just its speed — layered with a [[Velocity]] device (random range) and further Random Generators on ADSR, this is the core of a hands-off generative melody rack. → [[Velocity]], [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Plugins: [[Chord]] · [[Scale]] · [[Random]] · [[Velocity]] · [[Expression Control]]
- Techniques: [[Randomized Rack Design]], [[MIDI Generate and Transform Tools]], [[Automation]], [[Kick Design]]
- Chains: [[Free-Rate Arpeggiator Resampling Rack]]
