---
type: chain
title: Future-Style Vintage Sample Chain
reference: "loner-style vintage sample-flip build, later chopped into a super hard dark beat for Future"
chain_type: style
family: keys-synths
routing: Electric piano + doubled vintage upright + bass + accent one-shot + violin + texture + 2 perc loops + 2 vocal loops + guitar → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] / [[2 Guitar Group|Guitar Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → bounce/chop stage → Master
signal_chain: [Arturia Wurli V "funky cat" chords, room reverb + EQ + dynamic EQ + valve comp, SSS Vintage Upright doubled octave up, ValhallaVintageVerb + AudioThing Speakers + AudioThing Reels + Pro-Q 4 + delay, Scarbee Rickenbacker bass (high-register-then-pitch-down), Layers Volume 2 accent one-shot, Embertone Joshua Bell violin (harmonic preset), texture layer, 2x Splice perc loops, 2x Splice vocal loops (double-time stretched, 2 distinct FX chains), reversed/granular-chopped guitar + Shaper + reverb + tremolo pan, Fruity Slicer beat-slice + pitch -9st + drums]
status: video-derived
tags: [chain, keys, vocals, guitar, bass, style, sampling, vintage]
---

# Future-Style Vintage Sample Chain

**Reference/vibe:** a from-scratch "vintage sample" built to sound like a genuinely old chopped record, then flipped into a hard, dark trap beat for Future. Reverse-engineered from a loner (YouTube) breakdown, [this is how frank dukes & cubeatz make vintage samples in 2022!?](https://www.youtube.com/watch?v=Nak-TAIPQ-c) — despite the title, this is loner's own build, not an actual Frank Dukes/CUBEATZ session. Nine layered elements stack into one sample before the whole thing is bounced and chopped. Unlike [[Kendrick Lamar Soul Sample Chain]] (piano-centric, 3-part vocal harmony stack), this build's centerpiece ideas are **semitone-close chord voicing for tension**, **room-preset reverb on real-instrument samples**, and **giving each vocal layer in a stack its own distinct processing chain** rather than one copied chain. See [[Plugin Wishlist]] for every unresolved instrument/plugin name in this chain.

## Chain overview

Nine elements — a Rhodes-style chord bed, a doubled vintage-upright piano, a bass, an accent hit, a violin melody, a texture layer, two perc loops, two differently-processed vocal loops, and a reversed/chopped guitar — are built up individually, then the whole mix is bounced into a beat-slicer, pitched down 9 semitones, and chopped by ear into a beat, finished with a simple programmed drum layer. The two biggest reusable ideas: **voice a repeating chord shape so only the top note moves, always by a semitone**, and **treat "give every vocal/instrument layer its own distinguishing chain" as a rule, not an accident** — no two layers in this build share an identical processing chain.

## 1. Chords — Arturia Wurli V2 ("funky cat" preset)

- **Instrument:** Arturia Wurli V2, "funky cat" preset (heard/captioned "Whirly V2" — see [[Plugin Wishlist]]).
- **Voicing:** all three chords are the same D♯m shape (the last a G♯m), only the top note changes each time — bar 1–4 the top line walks up, bar 5–8 it walks back down. Every top-line move lands a semitone from an adjacent chord tone, which is where the "creepy, eerie, mysterious" tension comes from. → [[Chord Inversions]]
- 🎬 *From video:* "these two notes are only a semitone apart... it's just creating real tension and mystery" — a reusable voicing principle independent of the specific chord.

## 2. Chords FX chain

- A tape-cassette color stage FIRST, noise turned off — see [[Cassette]].
- **Room-preset reverb** (small/reflective, small decay, high wet) — NOT hall/plate. "Use room presets when you're picking a reverb, especially if you're using a sample with real instruments like a piano or Rhodes." → [[ValhallaVintageVerb]], [[Reverb]]
- **EQ** (cut low end) → **dynamic EQ** (knocks down two identified resonant peaks) → **valve compressor** (mix pulled back so it doesn't over-tighten). → [[EQ]], [[Compression]]
- 🎬 *From video:* static EQ handles broad shaping; the dynamic-EQ stage right after mops up specific problem peaks a static cut can't reach cleanly.

## 3. Doubled piano — "SSS Vintage Upright"

- **Instrument:** "SSS Vintage Upright" (see [[Plugin Wishlist]] — second confirmed use of this exact name), copying the same chords an octave up, chosen for its deliberately imperfect/old character.
- **Processing:** velocities pulled down significantly → pushed toward mono (not fully) → panned right → [[ValhallaVintageVerb]] (ambient room preset, short, high mix) → AudioThing Speakers (radio/mic/bathroom-style emulation, see [[Plugin Wishlist]]) → AudioThing Reels ("Excited Tape" preset, wow/flutter pushed up for detune) → [[Pro-Q 4]] (high-cut) → delay.
- 🎬 *From video:* automate the reverb's wet/dry mix UP under the last four bars, where only one chord is hitting — the space should track arrangement density, not stay static. → [[Automation]], [[Depth and Space]]

## 4. Bass — Scarbee Rickenbacker

- **Instrument:** NI Scarbee Rickenbacker (in owned [[Kontakt 7]]) — second confirmed use, see [[Sound Selection Guide]].
- 🎬 *From video:* a walk-down fill + a short connective phrase sell the part as "realistic," more than tone choice alone. → [[Bassline Writing]]
- 🎬 *From video:* track in a HIGHER-than-usual octave, then pitch the whole part down afterward — the register move itself (not just the final pitch) is what produces the texture. → [[Bass Design]], [[Pitch and Formant]]

## 5. Accent — "Layers Volume 2" one-shot

- A single one-shot hit landed on the bass note's downbeat, then half-timed to sit lower/less busy. → [[Rhythm and Groove]], [[Plugin Wishlist]]

## 6. Violin — Embertone Joshua Bell

- **Instrument:** Embertone Joshua Bell violin, **harmonic** articulation preset — reads closer to a flute than a violin (soft, airy, minimal attack). A very simple melody, short reverb to close. No owned equivalent — see [[Plugin Wishlist]]. → [[Melody Writing]]

## 7. Texture layer

- A subtle texture bed added purely for depth. → [[Ambient Texture and Field Recording]]

## 8. Perc loops — Splice

- Two Splice perc loops (a simple drum bounce + a small transitional fill), both filtered to sit under the main elements. → [[Sampling and Sound Selection]]

## 9. Vocals — 2 Splice loops, 2 DIFFERENT chains

Both loops first run through the **double-time stretch trick** (credited to Hicks): stretch a vocal loop to double its length in a beat-slicer for an instant warped/vintage read. Owned-lane mechanism: Ableton clip Warp mode (Complex/Complex Pro), drag the clip's right edge to double its length. → [[Sampling and Sound Selection]]

- **Loop 1:** short-but-heavy delay → [[ValhallaDelay]] "reverse pitch" 4-bar reverse-loop preset (mix pulled well down, since the repeats land off-time) → EQ (cut a little low, a little high).
- **Loop 2 (underneath):** a DIFFERENT chain — plate reverb ([[ValhallaPlate]]) → a heavier/longer delay than loop 1's → more filtering, with more high end taken away.
- 🎬 *From video:* credited to Corbinian's Nami/CUBEATZ sample-style breakdowns — "different vocals have different effects, some have lots of delay, some don't." Give every vocal layer in a stack its own distinguishing chain rather than copying one chain across all of them. → [[Vocal Stacks and Ad-libs]]

## 10. Guitar — reversed granular chop

- **Trick (credited to Simbo, Split Mind):** reverse the guitar → random-chop it into many small pieces → select all → nudge the whole selection back "maybe two little clicks" → set to Generic mode for a click-free crossfade. A granular-blur effect distinct from a plain reverse. Owned-lane equivalent: Ableton clip Warp mode set to Beats, slice heavily, select-all + nudge, Complex/Complex Pro for the crossfade behavior. → [[Sampling and Sound Selection]]
- **Finishing:** [[Shaper]] (ShaperBox-style pulse) → reverb (full mix, but short) → tremolo panning side to side as the final stage. → [[Reverb]], [[Modulation]], [[Width and Stereo]]

## 11. Finishing chop + drums

1. Bounce the full 9-element sample.
2. Load into a beat-slicer (Fruity Slicer, beat-slicing mode for even chops — owned-lane [[Simpler]] Slice Playback Mode or Ableton's Slice to New MIDI Track).
3. Pitch down 9 semitones; raise attack and decay slightly.
4. **Chop by ear on a keyboard** "trying to find a bounce" — first half of the resulting beat left sparser, second half repeats the same chop pattern with more elements layered back in.
5. **Drums:** clap → hi-hats → clap layered with a snare (for grip) → a second snare → 808 → kick → an open hat as a one-off switch-up. → [[Genre Drum Patterns]]

## Arrangement

**Space tracks density, not the other way round.** The reusable arrangement move from Stage 3: automate the reverb's wet/dry **up** under the last four bars, where only one chord is hitting. A sparse passage needs more space, not the same amount — static reverb across a whole loop is what makes thin sections sound thin.

| Stage | What happens |
|---|---|
| Build | nine elements written and processed individually |
| Bounce | the whole mix printed to one stem |
| Flip | pitched down **9 semitones**, sliced, re-chopped as the beat |

**The move — the arrangement happens after the bounce.** Everything up to the flip is sound design. Section structure is decided by *which slices go where*, which is why the sample only needs to be four or eight bars long.

**Density: 9 elements collapsing to 1 stem, then chopped.** See [[Hip Hop - Trap]] § Arrangement for what happens to it downstream.

## Variations

- **The semitone-top-line chord-voicing trick generalizes past D♯m/G♯m** — any minor-key vintage chord bed can borrow the "only the top note moves, always by a semitone" shape for the same tension.
- **Cross-reference: the near-identical D♯m → G♯m(iv) chord shape recurs in a separate loner video** ([how southside makes dark synth trap beats for future from scratch (dark melody music theory)](https://www.youtube.com/watch?v=TVjyuF5-xUo)) — same two chord tones a semitone apart, same iv-chord resolution — almost certainly loner's recurring "Southside dark trap" teaching example rather than a coincidence. That video's build is a straight synth-pad trap instrumental (not a sample-flip-then-chop), documented separately as [[Southside Dark Synth Trap Chain]]; full worked chord example on [[Chord Progressions]].
- **The per-layer-distinct-chain rule** (vocals here, but also true of the piano/doubled-piano pair and the two perc loops) is the single most reusable idea in this build — reach for it on any multi-layer stack, not just vocals.

## Notes

- No exact EQ frequencies, compressor ratios, reverb decay/mix percentages, or delay time/feedback values were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- All-unowned instrument sources (Arturia Wurli V, "SSS Vintage Upright," Embertone Joshua Bell, AudioThing Speakers/Reels, "Layers Volume 2") — see [[Plugin Wishlist]] for the current gaps; the processing stages around them (EQ, delay, reverb, compression, tremolo) are fully owned-tool coverable.

**Sources:** loner — [this is how frank dukes & cubeatz make vintage samples in 2022!?](https://www.youtube.com/watch?v=Nak-TAIPQ-c) (00:11:50, 2022-05-01) · full note: [[loner - this is how frank dukes & cubeatz make vintage samples in 2022!?]]
