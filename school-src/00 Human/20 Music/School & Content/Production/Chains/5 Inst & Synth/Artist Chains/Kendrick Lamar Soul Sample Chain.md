---
type: chain
title: Kendrick Lamar Soul Sample Chain
reference: Kendrick Lamar / Mr. Morale & the Big Steppers-era piano samples — a from-scratch vintage sample-flip build
chain_type: style
family: keys-synths
routing: Piano + mallet one-shot + 2 synth layers + 3-layer vocal stack → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Vocal Bus|Vocal Bus]] → Master
signal_chain: [Cinesamples Blue piano, King's Microphones, Waves EQ x2, mallet one-shot (stretch mode), Analog Lab synth layer 1 (ValhallaDelay + Decapitator), Analog Lab synth layer 2 (EQ + reverb + delay + shaper), 3x vocal takes (Auto-Tune + compressor + Little AlterBoy + EQ, each with one distinguishing extra stage), final slicer chop (pitch + attack + micro-timing)]
status: video-derived
tags: [chain, keys, vocals, style, sampling, vintage, soul, kendrick-lamar]
---

# Kendrick Lamar Soul Sample Chain

**Reference/vibe:** a from-scratch "vintage soul sample" built to sound like a genuine Kendrick Lamar-style piano-led flip (inspired by the piano-forward tracks on the *Mr. Morale & the Big Steppers* era) rather than a chopped real record. Reverse-engineered from a loner (YouTube) breakdown, [how to make the most realistic vintage soul samples for kendrick lamar!?](https://www.youtube.com/watch?v=oMbeATqXOww). Unlike [[Beatles Psych-Rock Sample Chain]] (real-gear research into owned/replica hardware), this build leans on VST sources with no owned equivalents — see [[Plugin Wishlist]] for every unresolved plugin.

## Chain overview

Five elements stack into one sample: a piano chord bed, a mallet counter-layer, two synth texture layers, and a 3-take vocal harmony stack — finished by bouncing the piano+vocal portion into a slicer for a chop/pitch/micro-timing pass. The build's two biggest reusable ideas: **spread/low-velocity chord voicing on the piano** (theory-level "vintage" before any processing touches it) and **a 3-take vocal stack sharing one base chain, each take earning exactly one distinguishing extra stage** (not three fully separate chains, not a plain doubled take).

## 1. Piano — Cinesamples Blue

- **Instrument:** Cinesamples Blue (Contact bank) — "probably my favorite piano vst." No owned equivalent, see [[Plugin Wishlist]].
- **Chords:** VI–III–v–VII in B natural minor — **Gmaj9 → Dmaj9 → F♯m → Amaj7** (spoken on-screen as "6-3-5-7"). Full theory writeup: [[Chord Progressions]].
- **Voicing:** root low, then the rest of each chord (including the 7th/9th) spread up a full octave — "helps to create such a different vibe... much more emotion out of your chords." The second chord (Dmaj9) repeats the exact same major-9 shape but is re-voiced slightly differently (F♯ brought up) purely for variety between two structurally identical chords. → [[Chord Inversions]]
- **Velocity:** dropped to near-zero on every note, deliberately — "the texture sounds better doing this... when the velocity is super high the notes can be a bit too harsh."
- 🎬 *From video:* try a whole chord part at very low velocity before reaching for EQ/compression on a harsh-sounding source — a general lesson worth applying beyond this chain.

## 2. Piano FX chain — "go-to piano chain" (4th confirmed instance)

- **Waves King's Microphones** — vintage mic emulation. No owned equivalent; closest is [[UAD Century Tube Channel Strip]] / [[UAD Neve 1073]] ahead of an EQ roll-off. → [[Plugin Wishlist]]
- **Waves EQ #1** — a "snare" preset auditioned by ear (not chosen by name), brings out a lot of high end for vintage character.
- **Waves EQ #2** — cuts some low end, boosts a little high end. Owned-lane stand-in for both EQ stages: [[EQ Eight]].
- Same three-stage shape as an earlier loner video's "go-to piano chain" (see [[Sound Selection Guide]], [[Plugin Wishlist]]) — now confirmed a 4th time.

## 3. Mallet layer

- **Source:** a one-shot from the (then-unreleased) "Layers Volume 2" pack, set to **stretch mode** — plays back at a fixed length regardless of octave/pitch. Owned-lane equivalent: Ableton [[Simpler]] in Complex/Complex Pro Warp mode.
- **Part:** copies the piano's chords, hitting rhythmically in between the piano's own notes.
- 🎬 *From video:* pitching a length-locked one-shot into a higher octave (rather than a normally-pitched sample) is what produces the "really cool textures" — the stretch-mode step matters, not just the pitch shift. → [[Sampling and Sound Selection]]

## 4. Synth layer 1 — delay + drive

- **Source:** "chiclets" preset, Arturia Analog Lab's Impulse bank (per prior-video name resolution, see [[Plugin Wishlist]]). One chord copied, hit on the second bar.
- **[[ValhallaDelay]]** — set super long/dragged-out, to rescue a too-quiet/too-thin layer before any drive stage.
- **[[Decapitator]]** — Drive up, Mix pulled back from full-wet, a modest Low Cut. Credited to a producer named Louis, "puts it on a bunch of his synths."

## 5. Synth layer 2 — texture + shaper

- **Source:** a second Impulse-bank preset ("the Machinist"/"Dying," exact name unconfirmed in auto-captions). A simple counter-melody, one note.
- **EQ** — cut low, boost high.
- **Reverb** — very short but heavy (strong wet, fast decay).
- **Delay** — FL Studio's stock "fruity delay," owned-lane [[Echo]]/[[Delay]].
- **Shaper box** — owned-lane [[Shaper]]/[[Transient Shaper]]; a dedicated multiband shaper remains a wishlist gap, see [[Plugin Wishlist]].

## 6. Vocals — 3-layer harmony stack

The real centerpiece of the build. **Three genuinely different vocal takes** (distinct melody + harmony each, not one take doubled three times), placed **center / hard right / hard left**.

**Shared base chain (all three takes):**
1. Auto-Tune ([[Auto-Tune Pro]])
2. A Waves compressor (unnamed product) — "really brings the vocal out, makes it stand out really well." Owned-lane stand-in: [[Glue Compressor]] / [[API-2500]].
3. [[Little AlterBoy]] — neutral/"very standard" setting.
4. EQ — cut low end, a little high boost (lighter cut than the producer's usual).

🎬 *From video:* processed deliberately to read as a **real song's vocal**, not the usual filtered/distant sample-vocal treatment — "this time I wanted to make it sound like a real song, and obviously that means the vocal is going to be much more present." → [[Vocal Stacks and Ad-libs]], [[Vocal Tuning]]

**Per-take distinguishing stage (each take gets exactly ONE extra):**
- **Take 1 (center):** [[Little AlterBoy]] switched to its "vocal dub" preset.
- **Take 2 (hard right):** [[Little AlterBoy]] switched to its "vocal chorus" preset instead.
- **Take 3 (hard left):** base chain kept, **[[ValhallaVintageVerb]]** added on top — "just to slightly switch it up, give it a different sound."

## 7. Finishing chop pass (piano + vocal only)

1. Bounce the piano+vocal portion.
2. Load into a slicer (Fruity Slicer — owned-lane [[Simpler]] in Slice Playback Mode).
3. Pitch down a few semitones.
4. Raise the attack.
5. **Micro-timing pass:** zoom all the way in, nudge every individual note's start time back very slightly — "you almost can't hear it but it just adds a little bit of bounce, a little bit of variety." Concrete real-world example for [[Pocket and Microtiming]]'s "laying back" concept.

## 8. Arrangement — two-half contrast

- **First 8 bars:** the chopped/pitched sample from stage 7, synth layers (stages 4–5) dropped out entirely — vocals + piano are the sole focal point.
- **Second half:** the same sample playing naturally/unchopped, WITH the synth layers reintroduced.
- 🎬 *From video:* "each half of the sample sounds completely different, it feels different" — a structural contrast built entirely from processing/arrangement choices on the SAME source material, not new content. → [[Arrangement and Song Form]]

## Variations

- **Any minor-key soul/neo-soul piano bed** — the reusable core isn't the specific Gmaj9/Dmaj9/F♯m/Amaj7 chords, it's the VI–III–v–VII root motion (see [[Chord Progressions]]) plus the spread-voicing/low-velocity approach.
- **The vocal-stack shape generalizes past this exact chain** — one base chain, three takes, one distinguishing stage per take — reusable on any hook/vocal-heavy sample even without the specific plugins named here.

## Notes

- No exact settings (drive amount, EQ frequencies/gains, reverb decay, delay time/feedback, semitone/ms values on the final chop) were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- All-unowned instrument sources (Cinesamples Blue, Arturia Analog Lab's Impulse bank, Waves King's Microphones) — see [[Plugin Wishlist]] for the current gaps; the processing stages after them (EQ, delay, reverb, saturation, vocal tuning/pitch-formant) are fully owned-tool coverable.

**Sources:** loner — [how to make the most realistic vintage soul samples for kendrick lamar!?](https://www.youtube.com/watch?v=oMbeATqXOww) (00:08:20, 2022-05-26) · full note: [[loner - how to make the most realistic vintage soul samples for kendrick lamar!?]]
