---
type: chain
title: PARTYNEXTDOOR Jazz Sample Chain
reference: PARTYNEXTDOOR's "Joy" (P3) — a from-scratch vintage jazzy R&B sample-flip build
chain_type: style
family: keys-synths
routing: Piano + electric guitar + bass + brass + minimal drums → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Guitar Group|Guitar Group]] / [[2 Bass Group|Bass Group]] / [[2 Drums Group|Drums Group]] → bounce/pitch/flip stage → Master
signal_chain: [Teletone Audio "Postcard Piano" (Reels tape + Ghz Vulf Compressor 3 + EQ), Kontakt "Evolution Strawberry Bank" guitar (valve comp + Cassette crunch + delay + EQ, last bar reversed), Kontakt "Scarbee Rickenbacker" bass (tube pre-amp only), Splice brass loops (bandpass EQ + heavy reverb + delay), minimal drums (bandpass-EQ'd kick+snare, low hats, reverbed/delayed ride, open hat, ~50% swing), full bounce pitched down 1 semitone + EQ + comp, Melodyne flip-and-pitch-up-2-3-semitones + new bass part]
status: video-derived
tags: [chain, keys, guitar, bass, drums, style, sampling, vintage, jazz, r&b, partynextdoor]
---

# PARTYNEXTDOOR Jazz Sample Chain

**Reference/vibe:** a from-scratch vintage jazzy R&B instrumental built to chase the mood of PARTYNEXTDOOR's "Joy" (off *P3*) — real jazz harmony (minor 9ths, minor 7ths, an inverted major 9th), an unusual 6/8 time signature identified by ear from the drums, and an arrangement built entirely by subtracting elements rather than adding new ones. Reverse-engineered from a loner (YouTube) breakdown, [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU). Companion build to [[Kendrick Lamar Soul Sample Chain]] and [[Future-Style Vintage Sample Chain]] — same vintage-sample-flip lineage, jazz-forward voicings instead of soul/trap.

## Chain overview

Five elements (piano, guitar, bass, brass, drums) build a single instrumental sample, then the whole thing gets bounced, pitched, and flipped as a second-pass demo. The two biggest reusable ideas: **identify an odd time signature (6/8) by ear from the drums, not the melody**, and **arrange by subtraction across four 8-bar sections** rather than writing new material per section — bass and guitar are toggled off/on and brass drops out for the final section, explicitly reasoned to leave room for whoever eventually flips the sample.

## 0. Time signature — set before writing anything

- **Identify 6/8 by ear from the drums:** "Joy" counts in groups of three (one-two-three, one-two-three) rather than four — the tell for 6/8 over 4/4.
- Owned-lane equivalent of the FL Studio numerator/denominator field: Ableton's time signature, set alongside tempo at the top of Arrangement/Session View (or per-clip in Session View).
- 🎬 *From video:* the same chords in 6/8 vs. 4/4 read as a genuinely different bounce against a metronome click — 6/8 changes the feel, not just the count.

## 1. Piano — Teletone Audio "Postcard Piano"

- **Instrument:** Teletone Audio "Postcard Piano" — chosen for vintage character/imperfection over a clean modern piano. No owned equivalent tracked; second confirmed use of this library. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **Voicing:** roll the chord's bass note slightly ahead of the rest of the notes (not block-triggered) for a natural, bouncy feel. → [[Pocket and Microtiming]]
- **Progression:** Bm9 (×2, filler notes added) → C♯m7 (×2, top-line notes added) → bars 5–7 repeat bars 1–2 → C♯m7 again → resolves on **Amaj9**, voiced **A as bass note, B (the 9th) inverted up to the top** rather than left in a plain root-position stack. → [[Chord Progressions]], [[Chord Inversions]]
- **FX chain:** "Reels"-style tape emulation (Baked preset, hiss/motor down) → **[[Ghz Vulf Compressor 3]]** (owned) to tighten → EQ cutting low end. → [[Kramer Tape]], [[EQ Eight]]

## 2. Electric guitar — filling the gaps

- **Instrument:** Kontakt "Evolution Strawberry Bank" — fills empty space before/between piano chord hits. → [[Kontakt 7]], [[Sound Selection Guide]]
- **FX chain:** valve compressor ([[UAD Tube-Tech CL 1B mkII]]) → [[Cassette]]-style crunch → delay → EQ cutting low end and harsh mid-range.
- 🎬 *From video:* the LAST bar of the guitar part is time-stretched slightly, then reversed, for a unique cadence into the next section — a cheap way to punctuate a section boundary without new material.

## 3. Bass — Scarbee Rickenbacker

- **Instrument:** Kontakt "Scarbee Rickenbacker" — kept deliberately simple/clean, the odd one out against the busier piano/guitar/brass build. → [[Kontakt 7]], [[Sound Selection Guide]]
- **FX chain:** a tube pre-amp preset only ([[UAD Century Tube Channel Strip]]) — no other processing.

## 4. Brass — sourced, not synthesized

- **Source:** Splice loops, not a programmed brass VST — realistic brass is hard to fake convincingly.
- **Treatment:** layered chops, reversed and left dry (no FX on the reversed pass itself), then all on ONE mixer channel: bandpass EQ (cut low + high) → heavy reverb (mix pushed near 100%) → delay for extra space. → [[EQ]], [[Reverb]] (effect), [[Delay]] (effect)

## 5. Drums — minimal, deliberately simple

- **Kick + snare on one mixer channel**, kick hitting only the downbeat of every bar, both through a bandpass EQ (cut low + high).
- **Hi-hat** turned way down — present but barely audible.
- **Ride** hits only on the "one," pushed through heavy reverb to extend the hit, plus delay to fill space.
- **Open hat** as the final drum element.
- **Swing knob to ~50%** — a standing habit for "unique" drum feels (afrobeats, jazzy 6/8 material). → [[Rhythm and Groove]]

## 6. Arrangement — subtraction across 4×8-bar sections

- **Bars 1–8:** everything in (bass, guitar, piano, brass).
- **Bars 9–16:** bass OUT — reasoned explicitly to leave room for whoever flips the sample to add their own bass.
- **Bars 17–24:** guitar OUT, bass back IN, for a more spaced-out section.
- **Bars 25–32:** bass OUT again AND brass OUT, for the sparsest final section.
- Pure subtraction — no new material per section, only elements toggled off. → [[Arrangement and Song Form]]

## 7. Bounce & finishing

1. Bounce the entire sample to one audio file.
2. Pitch the whole thing down 1 semitone.
3. EQ: cut real low end + a few mid-range frequencies.
4. Compressor: tighten and shave peaks.

## 8. Flip demo — a second-pass example

1. Open a new project, load the bounce, **Melodyne it** to find its actual bass notes (found: B♭, C, B♭, C, A♭). → [[Plugin Wishlist]] (Melodyne — #1 tracked gap, reinforced by this instrumental use-case)
2. Extracted notes read too low → pitch the ENTIRE sample up 2–3 semitones before writing a new bass part.
3. New bass part includes a couple of "glidy" (portamento) notes rather than plain static hits.

## Variations

- **The subtraction-arrangement move generalizes past this exact instrumentation** — any multi-element sample build can use the same "toggle elements off across fixed-length sections, reason each removal around what a flipper needs" approach, independent of the jazz/R&B genre lane.
- **The 6/8-by-ear-from-drums identification method** is reusable on any reference track suspected of an odd meter, not just this one.

## Notes

- No exact EQ frequencies/gains, reverb decay, or delay time/feedback values were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- All-unowned instrument sources (Teletone Postcard Piano) — see [[Plugin Wishlist]]; Kontakt-based sources (Evolution Strawberry Bank, Scarbee Rickenbacker) are owned via [[Kontakt 7]].

**Sources:** loner — [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU) (00:10:16, 2026-08-11) · full note: [[loner - how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)]]
