---
type: chain
title: 90s R&B Sample Chain
reference: "90s R&B — a compact from-scratch sample built entirely with VSTs + self-recorded vocals, with a 3-take vocal stack bounced thin, a Battery 4 texture layer, and a whole-sample pitch-down/reverse finish"
chain_type: style
family: keys-synths
routing: Piano (9ths) + second layered keys part + 3-take vocal stack (bounced to one stem) + Battery 4 texture layer → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Vocal Bus|Vocal Bus]] → Master
signal_chain: [Piano 9th chords (EQ → Little Plate → clean chorus → layered "warm keys" pad), main vocal (EQ → AlterBoy same-pitch/Formant -5 → reverb + slight delay), high vocal (EQ → AlterBoy pitch-up/Formant down a little → heavy reverb), low vocal (EQ → AlterBoy pitch-up/Formant down a lot → average reverb → Fruity Delay), 3-vocal bounce → stem EQ (lows+highs) → reverb → Arturia high-pass sweep filter, second keys layer (EQ → reverb → Fruity Delay → Cassette fuzzy-box detune), Battery 4 texture layer (pitch down → filter highs+lows → buried low in mix), final polish (pitch whole sample down 7 semitones → EQ cut lows → reverse a section → crossfade de-click)]
status: video-derived
tags: [chain, keys, vocals, style, sampling, r&b, 90s]
---

# 90s R&B Sample Chain

**Reference/vibe:** a compact, from-scratch '90s R&B sample — no real sample source, built entirely from a VST chord bed and self-recorded vocals. Reverse-engineered from an early (2020) loner breakdown, [how to make your own 90's rnb samples](https://www.youtube.com/watch?v=PQjIBDgJehQ), whose per-take-processing and bounce-then-thin-out logic reappear across most of this channel's later, more elaborate R&B builds already logged in this vault. Distinct from [[2000s R&B Piano Sample Chain]] (a cleaner, "not too vintage" era with restrained processing and a 4-melodic-source stack) and [[Bryson Tiller Fake-Sample Chord Bed Chain]] (no vocal stack at all) — this chain's defining move is **thinning the vocal stack on purpose so a future flip has room to sing over it**, not just processing three takes differently.

## Chain overview

A 9th-chord piano bed gets a short 4-stage color chain, then a completely separate second keys layer doubles the same chords with heavier processing. Three vocal takes (main/high/low), recorded with zero effects first, each get a genuinely different [[Little AlterBoy]] pitch/formant setting, then get bounced to one stem and deliberately filtered thin — the reasoning stated on-screen is that three full vocal layers would leave no room for an artist to rap or sing on the eventual flip. A pitched-down, filtered Battery 4 drum pass sits underneath purely for background nostalgia, not as a real drum part. The whole thing closes with a single pitch-down-and-reverse pass across the fully bounced sample, cleaned up with a crossfade de-click at the edit points.

## 1. Piano — 9th-chord bed

- **Chords:** four chords, "lots of ninths... that's how you get like an R&B sound" — extend every chord to a 9th rather than picking selectively. → [[Chord Progressions]]
- **Chain:** EQ (cut lows + some mids) → **plate reverb** ([[Little Plate]]) → **"clean chorus"** preset (Arturia-sourced on-screen; owned-lane [[Chorus-Ensemble]]) → a separately-layered **"warm keys"** preset (Arturia Analog Lab — unowned, see [[Plugin Wishlist]]) stacked on top "just to give it a bit more depth."
- 🎬 *From video:* stacking 9ths across a whole progression (not just the melody note) is a one-sentence, reliable shortcut to an R&B chord read. → [[Chord Progressions]]

## 2. Second keys layer — doubled chords, heavier processing

- **Source:** the same chord progression copied over, with a few extra notes added.
- **Chain:** EQ (cut lows) → reverb → **Fruity Delay** (owned-lane [[Delay]]) → **[[Cassette]]** "fuzzy box" — reached for specifically to detune the layer for "a very old-school feeling," not as a chain-ending crunch stage.

## 3. Vocals — 3-take stack, each earning a different AlterBoy setting

1. **Record raw first, zero effects, all three takes** — main, low harmonies, high notes — explicitly to prove "you don't have to be able to sing to do this." → [[Vocal Stacks and Ad-libs]]
2. **Main:** EQ (cut lows) → [[Little AlterBoy]] at the SAME pitch, Formant down 5 → reverb + a very slight delay.
3. **High:** EQ (cut lows) → AlterBoy pitched all the way up, Formant down only a little → noticeably heavier reverb than the main take, "because I want this to be more in the [mix]."
4. **Low:** EQ (cut some lows) → AlterBoy also pitched all the way up, Formant down "quite a lot" (more than the high take) → average reverb → Fruity Delay ([[Delay]]).
- 🎬 *From video:* give each take in a small vocal stack a genuinely different AlterBoy pitch/formant setting rather than one shared preset — the same lesson this channel repeats for years afterward, here in its earliest documented form. → [[Little AlterBoy]], [[Vocal Stacks and Ad-libs]]

## 4. Bounce + thin the vocal stack

1. Mute the piano, arm disc-recording on the master channel, Alt+R to render the 3-take stack to one stem.
2. **Stem chain:** EQ (cut lows + highs) → reverb → an **Arturia high-pass sweep filter** (owned-lane [[Auto Filter]]).
- 🎬 *From video:* bounce a multi-layer vocal stack down and deliberately filter it thin — "if you were having that in a sample normally, it'd be hard for the artist to find room to hop on it." A mixing-for-flippability move, not a tone choice. → [[Sampling and Sound Selection]], [[Auto Filter]]

## 5. Texture — Battery 4 drum pass

- A very basic pattern in **Battery 4** (unowned — see [[Plugin Wishlist]]), bounced to audio, pitched down, filtered (highs and lows cut), and buried low in the mix — "just so you can have this extra level of texture and nostalgic feeling," not a functioning drum part. → [[Sound Selection Guide]]

## 6. Final polish

1. **Pitch the whole finished sample down 7 semitones** as the literal last step across every already-balanced layer. → [[Pitch and Formant]]
2. **EQ cut the lows** the pitch-down made muddier.
3. **Reverse a section** for variation.
4. **Crossfade de-click** at every reverse/edit transition point so the cuts don't pop — owned-lane equivalent: a short fade/crossfade at the clip boundary in Ableton's clip editor. → [[Sampling and Sound Selection]]

## Arrangement

**Reverse a section for variation** — Stage 6's finishing move, and the only sectional device this build uses. The whole sample gets a pitch-down and a reversed passage rather than a second written section.

| Section | Source |
|---|---|
| Main | 9th-chord piano bed + doubled keys + 3-take vocal stack |
| Variation | a reversed section of the same material |

**The move — crossfade every reverse point.** A short fade at each clip boundary so the cuts don't pop. Unglamorous, and it's the difference between "vintage" and "edited."

**Density: 5–6, flat.** Like most sample builds here, the arrangement lives downstream in the flip — see [[Hip Hop - Trap]] § Arrangement.

## Variations

- **The "thin the stack on purpose" lesson generalizes past vocals** — any layered element meant to leave room for a later collaborator (a melodic stack, a chord bed) benefits from the same bounce-then-filter pass.
- **The whole-sample pitch-down-as-last-step move recurs across this channel's catalog** (see [[Pitch and Formant]], [[Afro Sample Chain]]) — the semitone amount varies by build, not the position in the chain.

## Notes

- No exact EQ frequencies, reverb decay/mix values, or delay times were given on-screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear, per the video's own auto-caption-only transcript.
- **Battery 4** and the **Arturia "warm keys" Analog Lab preset** are the two unowned sources in this build — see [[Plugin Wishlist]]; every processing stage after the source instruments is fully owned-tool coverable.
- Compact/early sibling of the same channel's later, more elaborate R&B chord-bed builds: [[2000s R&B Piano Sample Chain]], [[Bryson Tiller Fake-Sample Chord Bed Chain]], [[Soulful Sample Stacking Chain]].

**Sources:** loner — [how to make your own 90's rnb samples](https://www.youtube.com/watch?v=PQjIBDgJehQ) (00:09:01, 2020-08-24) · full note: [[how to make your own 90's rnb samples]]
