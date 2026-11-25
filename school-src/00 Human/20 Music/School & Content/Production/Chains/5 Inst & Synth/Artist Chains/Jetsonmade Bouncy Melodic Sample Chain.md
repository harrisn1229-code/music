---
type: chain
title: Jetsonmade Bouncy Melodic Sample Chain
reference: "bouncy, melodic Playboi Carti/Lil Keed-style trap beat, built from scratch"
chain_type: style
family: keys-synths
routing: Mallet + bell + percussion + Analog Lab texture + sub-fill + vocal chop → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] / [[2 Drums Group|Drums Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain|Master]]
signal_chain: [Kontakt mallet lead + EQ low-cut, drum-kit perk one-shot + EQ hi/lo-cut + heavy reverb, Analog Lab shaker+bowl texture, felt-not-heard sub-fill layer, harsh high-attack bell accent, stab-bass preset with shortened release, 2x self-recorded vocal takes (AlterBoy + EQ + reverb, one +tremolo/delay) bounced/double-timed/chopped/partially reversed, reverse+octave-down verse pass on mallet+vocal, minimal drums (clap + hi-hat + rolls + velocity, no kick), embedded 808 extracted from the finished bounce]
status: video-derived
tags: [chain, keys, synths, trap, plugg, style, sampling, vocal-chop]
---

# Jetsonmade Bouncy Melodic Sample Chain

**Reference/vibe:** a from-scratch, "oozy," bouncy melodic trap beat built in the style of jetsonmade's work for Playboi Carti and Lil Keed. Reverse-engineered from a loner (YouTube) breakdown, [how jetsonmade makes bouncy/melodic beats for playboi carti & lil keed (from scratch)](https://www.youtube.com/watch?v=OQZbvASWIQE) — a loner build in jetsonmade's style, not an actual jetsonmade session. Unlike the vintage/soul-sample chains elsewhere in this folder (which build toward an old-record character), this build's centerpiece ideas are **structuring a sample-for-flip like an actual song** (hook + verse, signaled purely by reverse/pitch-down processing rather than new material), and a genuinely counterintuitive drum decision: **skip the kick entirely and extract the bassline from the sample's own bounce** rather than programming a fresh 808.

## Chain overview

Five melodic/textural layers (mallet, bell, two percussion layers, a felt-not-heard sub-fill) stack around a self-recorded, heavily processed vocal chop to form the sample; the whole thing is then bounced, and a reversed/pitched-down-an-octave "verse" version is built from the same material. Drums, added afterward in a fresh project, stay deliberately minimal — the sample already carries the bounce, and the beat's bass comes from the sample itself rather than a new 808.

## 1. Mallet lead — Kontakt

- **Instrument:** Kontakt, unnamed mallet patch. → [[Kontakt 7]], [[Sound Selection Guide]]
- **FX:** EQ, lows cut. → [[EQ]]
- 🎬 *From video:* already bounced to audio by the time of the walkthrough — its live chain isn't shown beyond the stated low-cut move.

## 2. Percussion layer 1 — drum-kit "perk"

- A percussion one-shot from a drum-kit pack, EQ'd with both highs AND lows cut, then a lot of reverb added — pure texture, not rhythmic weight. → [[EQ]], [[Reverb]] (effect), [[Sound Selection Guide]]

## 3. Percussion layer 2 — Analog Lab shaker + bowl

- **Instrument:** Arturia Analog Lab, a combined shaker + bowl preset, found by clicking through presets until one had "a really cool cool sound, a cool texture." → [[Sound Selection Guide]], [[Plugin Wishlist]]

## 4. Sub-fill layer (felt, not heard)

- An element added underneath the mallet purely to fill the low and low-mid frequencies — "you can hardly even hear it but it just fills up the lower frequencies and the mid frequencies." → [[Layering and Stacking]], [[SUB Slot]], [[BASS Slot]]

## 5. Bell accent

- A second, higher-frequency element with more attack/harshness than the mallet, added purely for extra bite. → [[Layering and Stacking]], [[Sound Selection Guide]]

## 6. Stab bass

- A frequently-reused preset (auto-captioned "knits her base"/"knitter bass," exact source unconfirmed), release brought down for a short, stabby character. *(low confidence on the preset name)* → [[Bass Design]], [[Sound Selection Guide]]

## 7. Vocal chop — two self-recorded takes

- **Take 1 & 2 shared base chain:** [[Little AlterBoy]] → heavy EQ ("trying to drown out... because obviously I can't sing, so it's drowning out the bad frequencies") → heavy reverb. → [[EQ]], [[Reverb]] (effect)
- **Take 2's distinguishing move:** a tremolo control panning the vocal side-to-side, plus a bit of delay. → [[Ghz Trem Control 3]], [[Modulation]], [[Delay]] (effect)
- 🎬 *From video:* bounce both takes to one audio stem, double-time it (stretch to 2x speed), chop to fit the other elements, then reverse just the last two small chopped parts for a late variation. → [[Sampling and Sound Selection]], [[Vocal Stacks and Ad-libs]]

## 8. Verse version — reverse + octave-down

- Reverse and re-chop the main mallet part to match its original rhythmic pattern, then pitch the WHOLE thing down one octave — used specifically to signal the verse section, not as a tone choice.
- Vocals pitched down to match at the same point, so hook and verse share sonic identity but read as clearly different energy.
- A declick/degrade pass removes pops introduced by the heavy chopping. *(specific tool name garbled in auto-captions — general lesson only)*
- → [[Pitch and Formant]], [[Arrangement and Song Form]], [[Sampling and Sound Selection]]

## 9. Structuring for handoff

- The whole sample is built like an actual song (hook + verse) specifically so a producer flipping/buying it already knows how to build on it — "it gives the producer who's flipping it, they know how to structure it, it's already done for them." → [[Arrangement and Song Form]], [[Sampling and Sound Selection]]

## 10. Drums — deliberately minimal

- **Build:** clap + a basic hi-hat with a few rolls, velocity varied, plus some low notes following the chords' root notes/bounce.
- **No extra percussion** — "Uzi's beats are normally very open."
- **No kick at all** — the embedded 808/bass already has a heavy attack; "finding a kick that matches over the top of that is quite difficult," so it's left out entirely and the 808 alone "already hits."
- **Bassline:** rather than programming a new 808, the bass baked into the finished bounced sample is isolated (right-click → extract) and dragged across the arrangement as the beat's own bassline.
- → [[Genre Drum Patterns]], [[Bass Design]], [[Kick Design]]

## Arrangement

**The verse is the same sample, reversed and dropped an octave.** Stage 8 above is the whole arrangement method — no second sample is written. Reverse and re-chop the mallet part to its original rhythmic pattern, pitch the entire thing down twelve semitones, and that *is* the verse section.

| Section | Source |
|---|---|
| Hook | the sample as built — five melodic layers + vocal chop |
| Verse | the same sample, reversed + octave down |
| Late variation | the last two vocal-chop slices reversed |

**The move — transform, don't write.** One recorded idea covers every section. Cheapest possible arrangement, and it guarantees the sections belong to each other.

**Density: 5–6 layers, constant.** Sections differ by pitch and direction, not by count — a **timbre** genre in the [[Genres Index]] sense.

## Variations

- **The reverse-and-pitch-down-an-octave verse trick generalizes to any melodic sample flip** — a cheap way to signal a section change using only the material already built, no new instrumentation required. Directly comparable to the half-time/kick-out toggles used for the same purpose on [[Southside Dark Synth Trap Chain]] and [[Future-Style Vintage Sample Chain]] — a third distinct "signal the section via processing, not new parts" mechanism on this vault.
- **Skip-the-kick-when-the-808-already-hits is a reusable rule, not specific to this beat** — any build where the bass/808 has a strong front-end attack is a candidate to drop the kick entirely rather than fight for space.
- **Extracting a bassline from a finished bounce (instead of writing a fresh 808) is worth trying whenever a sample's own low end already reads right** — see [[Sampling and Sound Selection]] for the owned-lane equivalent (Melodyne-based note extraction).

## Notes

- No exact EQ frequencies, reverb decay/mix percentages, or delay time/feedback values were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- Two low-confidence items from auto-caption garble: the stab-bass preset name ("knits her base"/"knitter bass") and the declick/degrade tool name used after heavy chopping ("generic bleeding") — neither could be confidently identified, so no owned-tool guess was made; see [[Plugin Wishlist]] for the stab-bass gap.
- Analog Lab (shaker+bowl preset) is the only unowned source in this build — see [[Plugin Wishlist]] for its now-eighth confirmed sighting on this vault. Every processing stage (EQ, reverb, delay, tremolo/modulation, pitch/formant) is fully owned-tool coverable.

**Sources:** loner — [how jetsonmade makes bouncy/melodic beats for playboi carti & lil keed (from scratch)](https://www.youtube.com/watch?v=OQZbvASWIQE) (00:09:18, 2020-10-29) · full note: [[loner - how jetsonmade makes bouncy-melodic beats for playboi carti & lil keed (from scratch)]]
