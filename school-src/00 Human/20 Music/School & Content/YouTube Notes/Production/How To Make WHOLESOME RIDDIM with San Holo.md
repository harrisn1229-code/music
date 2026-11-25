---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=sVpQB8yh9xs
channel: You Suck at Producing
duration: "00:09:00"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: captions
tags: [yt-note, music, production, sound-design, bass, dubstep, riddim, serum, collab]
---

# How To Make WHOLESOME RIDDIM with San Holo

![](https://www.youtube.com/watch?v=sVpQB8yh9xs)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=sVpQB8yh9xs)

## Synopsis

Underbelly and San Holo trade a track back and forth, turning riddim (deliberately framed as the "most vile" EDM subgenre) into something "wholesome" by layering real harmony and melody on top of headbanging drums/bass. Underbelly narrates his own Serum riddim-bass sound design in detail (drum groove, a wobble bass patch, a harmony bass layered underneath it with a wavetable-drawn harmonic trick learned from another producer, and a "gun bass" built from a distorted sine + a sample loaded directly into the noise oscillator), then San Holo's side adds vocal chops, bell-pluck/piano melody layering, and a second, deliberately harder rhythm-drop bass. Genuinely dense, transcript-grounded Serum sound-design and arrangement content under the joke framing; ends as a real single ("An Introduction to Wholesome Rhythm," out on Underbelly).

## Techniques

- **Simple riddim drum groove + layered "top loops" for texture** — kick on 1 & 3, clap on 3, hi-hats nudged slightly late (behind the beat) for a laid-back feel; two chopped-up sample-pack "top loops" (credited to "Grape Milk") layered over the core beat purely for top-end texture/interest, not rhythm. → [[Rhythm and Groove]], [[Sampling and Sound Selection]]
- **Saturator, Digital Clip curve, glues the whole drum bus** — a [[Saturator]] on the **Digital Clip** setting across the drum group to squeeze the layers together and roll off transient peaks — a fast, one-device drum-bus glue pass. → [[Saturator]]
- **Riddim wobble-bass patch in Serum** — triangle-wave oscillator with a very fast decay ramp for a short, plucky shape; that same fast-ramp shape duplicated onto **LFO1** and mapped to oscillator A's **Coarse pitch** for a kicky, percussive pitch-knock; a touch of the noise oscillator blended in, plus light distortion; Amp module set to **Boost** mode for extra character. → [[Serum 2]]
- **FX stack on the wobble bass: width + mono control, phase disperser, grit, multiband sub control, then a groove-timing offset** — [[Ozone 9 Imager]] to widen the high end while keeping the bass mono; a Kilohearts-style phase disperser (already in [[Plugin Wishlist]]) for "wiggly wobbly" motion; [[Erosion]] for noise; a third-party bass rack ("Fat Rack") for extra glue; [[Multiband Dynamics]] with the low-band slider dialing exactly how much sub comes through. Then, in Arrangement view → Track Controls → **Track Options**, the whole sub track is nudged back in time (~40 ms, dialed by ear) for a classic swung/behind-the-beat rhythm feel — a per-track timing offset, not a groove-quantize template. → [[Serum 2]], [[Ozone 9 Imager]], [[Erosion]], [[Multiband Dynamics]], [[Rhythm and Groove]]
- **Draw custom harmonics directly into Serum's wavetable editor** — a technique credited to "DJ Kaybomb" (see [[Operator]]'s hand-drawn-waveform technique for the Operator-side version of the same idea): open the oscillator's wavetable/waveform editor and draw in harmonic content by hand for a screechier, more character-laden tone than a stock table, then pull back the harshest drawn harmonics by ear. → [[Serum 2]], [[Operator]]
- **Ableton's Reverb used as a tonal comb filter, not a spatial effect** — a reverb device (Early Reflections stage) applied to the harmony bass specifically for its "phasey comb" filtering character rather than any sense of room/space — the same device reached for as a creative filter, not reverb. → [[Reverb]]
- **Frequency-carve two stacked bass layers so they share the low end without masking** — a second, "harmony" bass sits above the wobble/sub bass (see Chroma harmonization below); its low end is cut to make room for the sub bass underneath, and the same fast-LFO→Coarse pitch-knock and OTT/disperser/Fat Rack processing from the wobble bass are reused on it. → [[Masking and Carving]], [[BASS Slot]] / [[SUB Slot]]
- **Chroma (harmonizer) turns a single bass/melody line into automatic chords in a chosen key** — described as "Auto-Tune on steroids": run any source through it, pick a key, and it harmonizes/plays chords in that key without the listener consciously registering "now there are chords" — used specifically so the riddim-focused audience gets real harmony "without even knowing it." → [[Plugin Wishlist]]
- **Vocal-chop layering: pitch-bent chops, a supporting melody chop, and drop-specific ear candy** — vocal chops pitched up and down through the phrase, run through a light [[OTT]] + reverb; a separate melody loop chopped up to *support* the vocal chop rather than compete with it; at the drop, layered "womp" hits at the start of each phrase plus bell-pluck layers doubling the melody, and — for a softer half of the drop — the same melody re-voiced as a Spitfire soft-piano intro (multiple layers of the same patch). → [[Layering and Stacking]], [[Sound Selection Guide]]
- **"Gun bass": a distorted sine core + a percussive sample loaded straight into the noise oscillator** — strip a Serum patch back to a single sine wave and heavily distort it (reusing the fast-LFO-to-Coarse pitch-knock trick above for percussive shape); separately, drag any hard, "crazy perk" one-shot sample directly into Serum's **noise oscillator slot** (a technique credited to "Odd Prophet") so that sample itself becomes the transient "gun" layer, blended in under/over the sine core. Glue with a band-pass **notch** filter (one of Serum's multi-filter types) with an LFO mapped to *both* cutoff and filter frequency simultaneously for a "wibbly wobbly" moving-filter character; process with the same disperser + Fat Rack + [[OTT]] + [[Saturator]] (Wave Shaper setting, not Digital Clip) stack as the other basses. → [[Serum 2]], [[Saturator]], [[OTT]]
- **Resample to a looped Simpler with Glide for a pitch-bent wobble, vs. automating pitch directly in Serum for the same effect** — two different routes to a gliding pitch-bend on the "gun bass": (1) convert the patch to audio, load it into [[Simpler]] with **Loop** enabled, then in Simpler's Controls tab turn up **Glide** — playing overlapping notes then slides the loop's *playback rate* up and down between them (a pitch-bend built from loop-rate glide, not a pitch envelope); (2) skip resampling entirely and instead automate the pitch-bend directly inside Serum while manually slowing down the underlying MIDI note lengths — a non-destructive alternative that keeps the patch editable. → [[Simpler]], [[Serum 2]]

## Routed to

- [[Serum 2]] — wobble-bass patch (fast-ramp LFO→Coarse pitch-knock, Amp Boost mode), hand-drawn wavetable harmonics, gun-bass noise-oscillator sample trick, dual-LFO band-pass-notch filter technique
- [[Simpler]] — resample-to-loop + Glide pitch-bend technique added
- [[Ozone 9 Imager]] — new Techniques section added: widen highs / keep bass mono on a riddim bass
- [[Saturator]] — Digital Clip drum-bus glue technique added
- [[Erosion]], [[Multiband Dynamics]] — cited in the FX-stack bullet (no new technique beyond what's already documented)
- [[Reverb]] — comb-filter creative-use technique added
- [[Layering and Stacking]] — vocal-chop/bell-pluck/piano drop-layering entry added
- [[Masking and Carving]] — dual-bass low-end carve entry added
- [[Rhythm and Groove]] — Track Delay per-track timing-nudge entry added
- [[Plugin Wishlist]] — Fat Rack (El Groove) and Chroma (harmonizer) added under "From videos (to vet)"

## Source

[How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs) · You Suck at Producing (Underbelly ft. San Holo) · 9:00 · captions (high confidence — clean creator captions; a few plugin names — "Fat Rack," "Chroma," "Awesome/Kilohearts Disperser" — are best-guess spellings, flagged low confidence) · transcript: [[How To Make WHOLESOME RIDDIM with San Holo (transcript)]]
