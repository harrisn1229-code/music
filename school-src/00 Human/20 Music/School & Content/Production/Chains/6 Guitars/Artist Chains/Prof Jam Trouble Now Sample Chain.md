---
type: chain
title: Prof Jam Trouble Now Sample Chain
reference: "Trouble Now" — Prof Jam & Benji Price (platinum, Portugal) — a from-scratch vintage Latin/guitar sample build, later sold via sample pack and flipped by an unrelated producer into the final song
chain_type: style
family: guitars
routing: Nylon guitar + doubling piano + vocal chops + synth bass (late) + light percussion → [[2 Guitar Group|Guitar Group]] / [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] / [[2 Bass Group|Bass Group]] → [[3 Guitar Bus|Guitar Bus]] / [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Vocal Bus|Vocal Bus]] / [[3 Bass Bus|Bass Bus]] → Master
signal_chain: [nylon guitar (i-i-iv-V in C# minor), reverb + Reels "Master Vintage" preset + Pro-C2 + low-cut EQ + Goodhertz Lossy "Packet Loss", Analog Lab piano doubling the same chords through a near-identical chain, Little AlterBoy "Double Rainbow" vocal chop (reused for a switch-up), Analog Lab Prophet "Bass Bass" synth bass (late entrance), 2x acoustic hi-hat + open hat (band-pass EQ + tremolo), master Reels "Master Vintage" + boosted hiss + 3-semitone pitch-down]
status: video-derived
tags: [chain, guitar, style, sampling, vintage, latin, loner]
---

# Prof Jam Trouble Now Sample Chain

**Reference/vibe:** a from-scratch "vintage Mexican/Latin" guitar sample, built in 2019 and sold in a sample pack with no idea it would ever be used — years later it turned up, unknown to its maker, as the core of "Trouble Now" by Prof Jam & Benji Price, which went platinum in Portugal. Reverse-engineered from a loner (YouTube) breakdown, [how i made the sample that got me a platinum song!?](https://www.youtube.com/watch?v=6aHjhniTOnk). Companion to [[Kendrick Lamar Soul Sample Chain]] (same channel, same "doubled melodic layer + vocal-chop + synth-bass" shape) and [[Dez Wright Guitar Sample Chain]] (same "write chords → color chain" guitar-sample method) — this build is the simplest/most compact of the three, and the only one with a confirmed real-world commercial outcome.

## Chain overview

Five elements: a nylon-guitar chord bed, a piano doubling the exact same chords through a near-identical processing chain, a vocal chop reused twice (different notes each time) as the arrangement's switch-up device, a synth bass that enters only at that switch-up, and a barely-there percussion texture layer. The build's two biggest reusable ideas: **doubling a melodic part on a second instrument through an almost-identical processing chain** (rather than one part carrying the whole harmonic weight), and **reusing one fully-processed vocal-chop chain twice with different notes** instead of building a second vocal sound for the arrangement's switch-up.

## 1. Guitar — nylon-string chord progression

- **Instrument:** a nylon-string guitar VST (original source, "Evolution Nylon Strings," discontinued/uninstalled; current substitute unresolved in auto-captions — "the elephant of nylon guitar"). Committing to nylon over steel-string/electric sets the track's vintage-Latin identity before any processing touches it.
- **Chords:** **C♯m (i, D♯ added a semitone above the E for tension) → C♯m (i, identical shape re-voiced two octaves up) → F♯m (iv) → G♯ major (V)** — full theory writeup: [[Chord Progressions]], [[Chord Inversions]].
- **Realism layer:** extra connective notes added on top of the base progression, PLUS deliberately uneven strum timing within a chord (e.g. the D♯ note hitting fractionally before the other two notes) — "that's what's making it sound really realistic," not the notes/velocities alone. → [[Pocket and Microtiming]]
- 🎬 *From video:* stagger a chord's note-on times by a few ms instead of triggering every note simultaneously — a concrete, transferable humanization move beyond MIDI velocity randomization.

## 2. Guitar FX chain

1. Reverb, likely [[ValhallaVintageVerb]] ("vintage verb").
2. A tape/vintage-color plugin (auto-caption "Reels" — see [[Plugin Wishlist]], likely AudioThing Reels), "Master Vintage" preset.
3. [[Pro-C 2|Pro-C2]] — light touch, "just to tighten it up a bit."
4. A low-cut EQ ("loca eq" in auto-captions).
5. [[Ghz Lossy 3|Goodhertz Lossy]], "Packet Loss" preset — final vintage/lossy-codec degradation, "takes away the quality of it."

## 3. Piano — doubling layer

- **Instrument:** Arturia Analog Lab 4, a plain piano preset, playing the EXACT same chord progression as the guitar.
- **FX chain (near-identical to the guitar's):** the same "Reels"/Master Vintage stage → [[Pro-C 2|Pro-C2]] → an EQ (low-end cut + a notch on "a really harsh frequency") → a short reverb.
- 🎬 *From video:* "pretty similar processing to the guitar... my processing hasn't changed too much... I use a few different plugins but for the most part for the basics it's the same" — a self-observed, repeatable "double the melody, near-duplicate the chain" method.
- **Realism layer:** some piano notes deliberately hit early/off-grid — "this is what shows that it's a really old sample." → [[Pocket and Microtiming]]

## 4. Vocal chops

- **Source:** a hook sample from Output Arcade (2019; producer now prefers Splice or his own vocals for this role — see [[Plugin Wishlist]]).
- **Chain:** [[Little AlterBoy]], "Double Rainbow" preset — pitch shifted all the way up, formant brought all the way down, filtered (cut high end, cut low end), a heavier reverb than the guitar/piano chains got, and a tremolo control panning the result hard side-to-side.
- 🎬 *From video:* the SAME processed chain/preset is reused later in the song for a late arrangement switch-up — just different notes, not a new sound — paired with removing some of the guitar's notes in that section to make room. → [[Arrangement and Song Form]], [[Ear Candy and Hiding Synths]]

## 5. Synth bass — late entrance

- **Source:** "Bass Bass" preset, Prophet model inside Arturia Analog Lab.
- Enters only at the same late switch-up section as the vocal-chop change — not present for the whole track. → [[Bass Design]]

## 6. Percussion — texture layer

- Two acoustic-sounding hi-hats + one open hat.
- Processing: a band-pass EQ + a Goodhertz tremolo control. Kept "very very subtle" — "just adds a little bit of texture underneath," not a groove element. → [[Ambient Texture and Field Recording]]

## 7. Arrangement

- Start with every element EXCEPT the piano → bring the piano in partway through for a lift/sense of movement → slow the whole thing down toward the end, leaning on the vocal-chop switch-up + synth bass as the closing texture. → [[Arrangement and Song Form]]

## 8. Master bus

- Same "Reels"/Master Vintage-family color stage as the guitar/piano chains, with the hiss level deliberately boosted — "because I wanted that texture in the background."
- Final pitch-down of the whole finished bounce by **three semitones**, with a pitch-shift tool (likely Waves SoundShifter — see [[Plugin Wishlist]]).

## Variations

- **The "double the melody on a second instrument through a near-identical chain" move generalizes past guitar+piano** — any two complementary timbres (guitar+EP, synth+strings) carrying the same chord progression through matched processing reads as a fuller, more "real" sample than one instrument alone.
- **The "reuse one fully-processed vocal-chop chain for a switch-up, just swap the notes" move** is a cheap, reliable arrangement device — no second sound-design pass needed for a structural pivot.

## Notes

- No exact settings (reverb decay, EQ frequencies/gains, "Master Vintage" preset parameters, Pro-C2 ratio/threshold) were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- The "Reels" plugin identification is medium-confidence (auto-caption garble); [[RC-20 Retro Color]] was considered and ruled out (no "Reels" module in its documented manual) in favor of AudioThing Reels, already logged separately on [[Plugin Wishlist]] from another video.
- This is the only chain in this vault reverse-engineered from a video with a confirmed real-world commercial outcome (a platinum single) — the producer's own framing of the video is as much "put your samples out there, you never know" as it is a technical breakdown.

**Sources:** loner — [how i made the sample that got me a platinum song!?](https://www.youtube.com/watch?v=6aHjhniTOnk) (00:06:45, 2022-05-12) · full note: [[loner - how i made the sample that got me a platinum song!?]]
