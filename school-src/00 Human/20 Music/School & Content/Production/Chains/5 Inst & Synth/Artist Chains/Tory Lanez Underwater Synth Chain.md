---
type: chain
title: Tory Lanez Underwater Synth Chain
reference: Tory Lanez ("Take Care")-style melodic R&B — a from-scratch build, name-checking Chris Brown/Drake in the same lane
chain_type: style
family: keys-synths
routing: Reversed one-shot synth pad + texture layers + vocal chop + hook flute → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Vocal Bus|Vocal Bus]] → Master
signal_chain: [reversed/trimmed one-shot pad (EQ low-cut, long "infinity"-preset reverb, Ghz Loh1 3 HI-cut, Shaper mix ~50%), unprocessed perc loop (XO), unprocessed rain-noise texture, vocal chop (bandpass EQ, automated half-time device, medium reverb, heavy ValhallaDelay), 3-layer hi-hat drum kit, kick with velocity/pan variation, long subby 808, late hook flute (massive reverb + big delay)]
status: video-derived
tags: [chain, keys, synth, vocals, style, sampling, r&b, tory-lanez]
---

# Tory Lanez Underwater Synth Chain

**Reference/vibe:** a from-scratch "underwater synth + vocal chop" melodic R&B beat, reverse-engineered from Tory Lanez's "Take Care," name-checking Chris Brown and Drake as the same stylistic lane. Reverse-engineered from a loner (YouTube) breakdown, [how to make melodic r&b beats for tory lanez & chris brown (underwater synth/vocal sample)](https://www.youtube.com/watch?v=7JCup6FVW5o). Unlike the richer multi-take builds in [[Kendrick Lamar Soul Sample Chain]] or [[Future-Style Vintage Sample Chain]], this beat is deliberately minimal — only two melodic elements (the synth pad and the vocal chop) for almost the entire runtime, with a flute added only to salvage a weak hook late in the build.

## Chain overview

A single reversed one-shot, hand-trimmed and driven by a repeating 4-chord progression, is processed into a submerged-sounding pad; a Splice vocal chop gets a parallel heavy-processing treatment; two low-level texture layers sit underneath both; a 3-layer hi-hat kit plus a bounce-varied kick and long 808 carry the drums; a flute is bolted on late purely to strengthen the hook. The reusable core idea: **reverse + hand-trim a one-shot for pulse, then bury the result under progressively heavier filtering/reverb until it stops reading as a clean synth** — the "underwater" character is entirely a processing choice, not a special patch.

## 1. Synth pad — reversed/trimmed one-shot

- **Source:** an ambient/synthy one-shot from the producer's own ("Nami's") one-shot kit, chosen because it matched the "watered down synth" heard in the Tory Lanez reference.
- **Reverse + trim:** reverse the one-shot, then hand-adjust its start point and length until the reversed tail's natural swell pulses in and out on its own — no LFO/modulation device involved.
- **Chords, D minor tonal center, one per bar:** **Dm7 → D♯maj7 (♭II7 borrowing) → Gm7 (top two notes dropped an octave) → Fmaj (C dropped an octave)**. Full theory: [[Chord Progressions]].
- **Rhythmic pattern:** each chord hit **four times per bar** — combines with the reversed-tail swell to produce the track's signature pulse.
- 🎬 *From video:* reverse-and-hand-trim is a zero-extra-plugin way to generate rhythmic pulse before reaching for a dedicated modulation device. → [[Sampling and Sound Selection]]

## 2. Synth pad FX chain — "underwater" processing

1. **EQ low-cut** — remove the low end first.
2. **Long, always-active reverb** — auto-captioned "an intensity reverb… the infinity preset," which "comes on as soon as you open it up." Exact product unconfirmed, see [[Plugin Wishlist]].
3. **[[Ghz Loh1 3]]** (HI-cut side) — reached for because the reverb stage left the pad "way too bright."
4. **[[Shaper]]** — Mix pulled to ~50%, used purely to filter out more high-end frequencies rather than as a full effect; gives the pad a "choppy," sample-like feel. Eleventh confirmed reuse of the owned ShaperBox lane, see [[Plugin Wishlist]].
- 🎬 *From video:* the "underwater" read is built entirely from a sequence of progressively darker filtering/reverb stages, not one special plugin. → [[Ghz Loh1 3]], [[Shaper]], [[Reverb]]

## 3. Texture layers (unprocessed)

- **Perc loop** — from XO ("this perc loop from x y," near-certain auto-caption garble of [[XO]]), dropped in with no processing — "sounded really good as it is."
- **Rain noise** — a texture one-shot from the same personal one-shot kit, layered for atmosphere.
- → [[Ambient Texture and Field Recording]], [[XO]]

## 4. Vocal chop

- **Source:** a Splice vocal chop, hand-edited down to the liked parts.
- **Chain:** bandpass EQ (cuts high AND low end) → an **automated half-time rhythmic device on its "quarter" preset** (unconfirmed product, see [[Plugin Wishlist]]) → a medium-sized reverb ("just to give it a bit of space") → a **heavy [[ValhallaDelay]]**, reached for explicitly to fill space since the pad and this chop are the only two melodic elements in the whole beat.
- **Automation:** the half-time device is fully engaged for the first 4 bars (pre-hook, lower energy), then partially lifted for the hook (audibly brighter). → [[Automation]], [[Arrangement and Song Form]]

## 5. Drums

- **Snare:** single sample, no elaborated processing given.
- **Hi-hat 1:** "old-school, more acoustic" character.
- **Hi-hat 2:** shifted noticeably off the timing grid for a natural, live-feeling swing. → [[Pocket and Microtiming]]
- **Hi-hat 3:** modern-sounding, with rolls.
- **Kick:** velocities varied per hit, several hits panned, purely for bounce. → [[Kick Design]]
- **808:** long, very subby, sustaining under the pattern.
- 🎬 *From video:* three differently-timed/processed hi-hat layers stacked together fakes a hybrid boom-bap/modern feel without programming three full patterns. → [[Genre Drum Patterns]]

## 6. Hook-strengthening pass (added after the base beat)

- **Flute** one-shot (same personal kit) → massive reverb → really big delay, added specifically because "the hook just needs something else."
- A **counter-melody**, added for the same reason.
- → [[Sound Selection Guide]], [[Reverb]], [[Delay]]

## 7. Arrangement — pure subtraction, no new material per section

1. **4-bar intro:** pad + textures only, no drums.
2. **Pre-hook:** full drums enter, vocal half-time device kept fully on (lower energy).
3. **Hook:** half-time device lifted (brighter, more energy).
4. **Verse:** vocal chop muted entirely — the mute itself signals "verse, write here" to the artist.
5. **Second pre-hook variation:** hi-hats + snare removed, kick + 808 kept, for contrast on repeat.
- 🎬 *From video:* the whole song's structure comes from selective muting/toggling of just two melodic elements — no new musical material was written per section. Stated philosophy: a catchy chord progression + strong sound selection + bouncy drums is enough; you don't need to keep adding elements. → [[Arrangement and Song Form]]

## Variations

- **The reverse-and-hand-trim pulse trick generalizes to any ambient one-shot**, independent of the specific Dm7–D♯maj7–Gm7–Fmaj progression — the reusable core is the trim-for-pulse technique plus the four-hits-per-bar chord repetition.
- **The "only two melodic elements + heavy processing" minimalism is itself a reusable arrangement constraint** — worth trying deliberately on a beat that's starting to feel over-stacked.

## Notes

- No exact numeric settings (reverb decay/wet%, delay time/feedback, EQ frequencies, half-time device parameters) were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- Two plugins named in the source video remain unresolved: the "intensity/infinity" reverb and the half-time "quarter preset" device — both logged on [[Plugin Wishlist]], not guessed here.
- Sibling in the same lane: [[2000s R&B Piano Sample Chain]] — a fuller, four-melodic-source build (piano+counter-melody+strings+vocal) rather than this chain's deliberately minimal two-element approach, also from a Ne-Yo/T-Pain/Chris Brown-referenced era and flipped for Tory Lanez/Bryson Tiller. The "Intensity" reverb gets a third confirmed sighting there, on a lead vocal this time.

**Sources:** loner — [how to make melodic r&b beats for tory lanez & chris brown (underwater synth/vocal sample)](https://www.youtube.com/watch?v=7JCup6FVW5o) (00:08:07, 2022-04-03) · full note: [[how to make melodic r&b beats for tory lanez & chris brown (underwater synth-vocal sample)]]
