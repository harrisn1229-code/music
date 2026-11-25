---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=I5nYK1mCmW4
channel: loner
duration: 00:12:17
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, sound-design, ambient-texture, granular, sampling, synthesis]
briefed: backlog
---

# easy ambient sound design technique!? | making a melodic r&b synth beat for drake from scratch

![](https://www.youtube.com/watch?v=I5nYK1mCmW4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=I5nYK1mCmW4)

## Synopsis

A from-scratch Drake-adjacent melodic R&B beat build from loner, hung on one core "discovery": **any sample dropped into a granular sampler becomes an instant, unique pad** just by turning on its granular engine after setting a loop point — no dedicated pad patch required. He builds the whole beat's synth layer around that trick in Arturia Pigments (used purely as a multi-engine sampler rather than a synth), stacks a sine-wave body layer and a noise-texture layer under it, writes a chord progression and heavily filters it with a shaper device, records and heavily processes a lead vocal chop into a textural accent (Little AlterBoy pitch-up/formant-down → bandpass EQ → heavy vintage reverb → phaser), reprocesses a reused one-shot through the Mellotron V ("the melotron") for a differently-voiced counter-melody (loop, detune/flutter, saturation, noise, then bit crusher → flanger → reverb → rotary speaker), builds a two-part bass (a stabby short bass on the bar + a longer "respace" sustained bass shaped with a volume shaper), layers in his own unreleased "Layers Volume 2" sample-pack content for an accent, a second bass, and a texture perc loop, then finishes with drums built around an intentionally off-the-one kick pattern (referencing Boi Wonder's kick on Jack Harlow's "Nail Tech"), extra percs, a "Balenciaga Vol 8" hi-hat, and an ambient perc under the snare. The most valuable, reusable idea is the loop-point-then-granular pad technique — everything else (chord filtering, vocal-chop processing, bass layering, drum choices) is a fairly standard loner-channel toolkit applied to it. Auto-captions render "Little AlterBoy" as "ulta boy"/"the altar boy" and "Mellotron" as "the melotron"/"metatron" — both are recurring, previously-confirmed homophones on this channel (see [[Little AlterBoy]] and the Dahi "SZA Used" breakdown for the Mellotron V spelling-out).

## Techniques

### Core discovery: loop point + granular engine = instant pad
- **Turn any sample into a pad in two moves: set a loop point past the transient, then turn on the granular engine.** In Pigments' Sample engine, drag the loop-start point across the waveform until the attack is cut out (loop begins mid-sustain), which alone lets any sample sustain indefinitely; switching on the granular engine on top of that turns the looped sample into what sounds like "a completely different sound," instantly pad-like even on a source as plain as a stock piano one-shot. → [[Ambient Texture and Field Recording]], [[Sampling and Sound Selection]]
- **Grain size trades off smoothness vs. graininess — lower values sound choppier/more textured, higher values sound smoother.** Named A/B: grain size 80 vs. 700 — at 700 "the grains are moving more smoothly," reading as a smoother pad; lower settings keep more audible grain texture. *(general starting point — no single "right" value; pick by ear for the desired smoothness)* → [[Ambient Texture and Field Recording]]
- **Push the granular pad further toward "pad" with envelope + pitch moves**: raise the amplitude envelope's Attack (softens the onset further) and pitch the whole sample down a full octave. → [[Ambient Texture and Field Recording]]
- **Pigments' 3-layer patch-build pattern for one synth sound**: Engine 1 = the granular sample/pad; Engine 2 = a plain sine wave (Wavetable engine) underneath for body/low-end reinforcement, with Phase Distortion pushed up "very slightly" purely to add a touch of high end to the sine; Utility engine = a noise/texture layer from Pigments' built-in texture bank ("fake rain" preset picked here), volume brought down low and filtered to tame excess high end. Finished with the engine's own reverb (dry/wet pushed up, "quite a big reverb") and a chorus. → [[Layering and Stacking]], [[Ambient Texture and Field Recording]], [[Sound Selection Guide]], [[BED Slot]]

### Chords
- **Heavily filtered ambient chord progression via a filter-preset "shaper box" stage.** After writing the progression, cut the low end out first, then add a shaper-style device and switch to its **"Half"** filter preset (mix pulled back a little), then bring the filter cutoff down further (down to roughly "3" on its scale) for a deliberately "super filtered," muffled chord bed. Owned-lane equivalent already tracked: [[Shaper]] (Ableton's ShaperBox-role Max for Live device). → [[Shaper]], [[EQ]], [[BED Slot]]

### Vocal chop / accent
- **Consolidate a vocal take into one audio file before processing, specifically to make reverse/stretch operations easier.** After chopping/editing an auto-tuned vocal line down to the wanted phrase (repeating one section, cutting a disliked part), consolidate the edited region into a single audio file first — makes downstream reverse/time-stretch moves simpler than working across multiple clip edits. → [[Sampling and Sound Selection]]
- **Vocal-chop processing chain: Little AlterBoy (pitch fully up, formant down a little) → bandpass EQ → heavy vintage reverb ("to drown it out") → phaser.** Another confirmed loner use of the pitch-up/formant-down AlterBoy move (see [[Little AlterBoy]] for the full reuse history), here finished with a narrow bandpass EQ carve, a heavy wet reverb specifically to bury/obscure the source, and a phaser for movement. Auto-captioned "ulta boy"/"the format." → [[Little AlterBoy]], [[Reverb]], [[EQ]], [[Modulation]], [[Pitch and Formant]]
- **A "Layers Volume 2" one-shot accent, chosen to sit specifically on the first chord** — his own in-progress sample pack supplying a textural accent element rather than a purchased pack; picked by ear for what worked over that one chord specifically rather than dropped in generically. → [[Sound Selection Guide]], [[Plugin Wishlist]]

### Reprocessing a reused one-shot through the Mellotron V
- **Recipe for making a previously-used one-shot sound different: drag it into the Mellotron V's Advanced sampler, loop it, move the start point, pitch down an octave, add flutter (detune/wobble), and layer in the instrument's built-in tape-mechanism saturation + noise.** Framed explicitly as the reuse workflow: "if it's a one shot you've used before but you want to use it again but in a different way, maybe throw it in the melotron." The flutter, saturation, and noise stages emulate a real tape Mellotron's mechanical character rather than being generic effects. → [[Ambient Texture and Field Recording]], [[Sampling and Sound Selection]], [[Plugin Wishlist]]
- **4-effect-slot finishing chain on the Mellotron: bit crusher (his favorite, "a really kind of weird metallic distorted sound") → flanger → reverb → rotary speaker (reads as an organ).** Described as fairly random experimentation ("just throwing random stuff on it") rather than a fixed recipe, but the resulting chain is a repeatable four-stage texture pass: distortion/bitcrush → modulation → reverb → rotary/Leslie-style modulation, finishing as a "very simple counter melody" textural layer. → [[Saturation and Distortion]], [[Modulation]], [[Reverb]]

### Bass
- **Two-bass system: a stabby short bass hit at the end of every bar, plus a longer, more sustained second bass ("a respace," from Layers) carrying the rest of the part.** The short bass is deliberately non-sustained and placed only at bar-ends as a rhythmic anchor; the second, longer bass (a "Layers" one-shot) does the harmonic/sustain work, EQ'd to cut the real low end out (so it doesn't fight whatever owns the [[SUB Slot]]) and run through a **volume shaper from ShaperBox** for rhythmic movement. Owned-lane equivalent for the shaper stage: [[Shaper]]. → [[Bass Design]], [[Shaper]], [[EQ]], [[BASS Slot]], [[Sound Selection Guide]]

### Texture perc loop
- **A "Layers Volume 2" perc loop, used purely as a texture layer under the real drums — EQ'd to cut both high and low end.** Explicitly not a groove-driving element: it's added under the drum programming for texture only, so both extremes are carved out to keep it from competing with the actual kick/hats. → [[Ambient Texture and Field Recording]], [[Sound Selection Guide]]

### Drums
- Rim shot, then a kick with a deliberately different, off-the-one pattern — a stylistic reference to Boi Wonder's kick pattern on Jack Harlow's "Nail Tech," used here as "a completely different style of beat." Song/style-specific reference, not a generalized rule.
- Two additional percs layered in.
- Hi-hat sourced from "Only One's New Balenciaga Vol 8" (a third-party sample pack). → [[Sound Selection Guide]]
- An ambient perc placed underneath the snare, for texture rather than groove.

## Routed to

- [[Ambient Texture and Field Recording]] — loop-point + granular pad technique, grain-size smoothness tradeoff, Mellotron reprocessing-a-reused-one-shot recipe, Layers Volume 2 texture perc loop
- [[Sampling and Sound Selection]] — consolidate-before-processing habit, Mellotron reuse workflow for an already-used one-shot
- [[Layering and Stacking]] — Pigments 3-layer patch build (granular sample + sine body + noise texture)
- [[Bass Design]] — two-bass system (stabby bar-end bass + sustained "respace" bass with volume shaper)
- [[Shaper]] — chord filter-preset "Half" + cutoff carve; bass volume-shaper use (two new reuses logged)
- [[Little AlterBoy]] — vocal-chop pitch-up/formant-down recipe (another confirmed reuse)
- [[Reverb]] (effect page) — heavy "drown it out" vintage reverb on the vocal chop; Mellotron's built-in room reverb stage
- [[Modulation]] (effect page) — Pigments chorus; Mellotron flutter + flanger + rotary speaker
- [[Saturation and Distortion]] (effect page) — Mellotron bit crusher + tape-mechanism saturation
- [[EQ]] (effect page) — bandpass EQ on the vocal chop; low-end cuts on chords, second bass, and texture perc loop
- [[Sound Selection Guide]] — Synths/Keys (granular pad recipe), Texture (Layers Volume 2 accent + perc loop, Mellotron reprocessing), Bass (two-bass system), Drums (Balenciaga Vol 8 hi-hat)
- [[Plugin Wishlist]] — Pigments (Arturia, new granular-sampler use case), Mellotron V (Arturia, new reprocessing use case), ShaperBox/VolumeShaper (Cableguys, two new reuses)

## Source

- 📺 [Watch on YouTube](https://www.youtube.com/watch?v=I5nYK1mCmW4)
- Channel: loner
- Duration: 00:12:17
- Transcript: captions, high confidence (spoken tutorial, transcribes cleanly) — full transcript: [[easy ambient sound design technique!? - making a melodic r&b synth beat for drake from scratch (transcript)]]
