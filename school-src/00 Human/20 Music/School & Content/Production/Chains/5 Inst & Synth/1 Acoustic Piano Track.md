---
type: chain
aliases: ["Acoustic Piano Track"]
title: Acoustic Piano Track
chain_type: track
family: keys-synths
source: digital
routing: Acoustic Piano → Inst-Synth Group → Inst-Synth Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD Teletronix LA-2A Silver, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Pro-C 2, Kramer Tape, Utility]
status: default
tags: [chain, keys, track]
---

# Acoustic Piano Track

**Role:** Piano VST — usually a supporting harmonic instrument that must *not* fight the vocal (piano covers the entire spectrum, so it's the #1 masking offender).

**Chain philosophy:** carve → even → sweeten → width check.

## 1 — Sound Selection

- **[[Keyscape]] — the default.** *LA Custom C7* flagship grand (pop/ballad centerpiece), *Wing Upright*/*Wing Tack* for character/vintage, duo patches for hybrid color. In-patch: internal reverb OFF (space comes from sends), velocity curve to taste. → [[Keyscape — LA Custom C7 Grand]] / [[Keyscape — Wing Upright & Tack Piano]]
- **[[Kontakt 7]]** libraries for felt/intimate or cinematic flavors.
- **[[Nexus]]** for instant pop "stacked piano" (already produced — bypass most of the chain below). → [[Nexus — Stacked Pop Piano]]
- **Rule: choose the patch that already IS the sound** — patch-switching beats EQ-rescuing. 🎬 Pre-highlight favorites *before* a writing session (Disclosure star their D-50 patches ahead of time — "less messing about") — [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) → [[Sound Palette]].

## 2 — Programming Best Practice

- **Play at performance energy, commit to audio when dialed** ([[FX Chain System]] bounce-in-place — Disclosure record synths/keys in as audio: "the MIDI isn't the sound").
- **Cut the low junk from the part itself:** if the left hand doubles the bassline's register, thin the voicing — arrangement beats EQ ([[Masking and Carving]]).
- **HPF discipline applies to keys too** — sub-100 Hz belongs to kick/808; the piano's low octave stays only when piano is the star — Kenny Beats, [808 & Kick](https://youtu.be/4iAKvWWlCvY).

## 3 — Source → Ableton (UAD front end)

The "recorded through a console" pass that keeps software instruments on the same footing as recorded ones — printed when dialed:

### 1. [[UAD Neve 1073]] — Preamp plugin — barely driven, ~0 VU
### 2. [[UAD Teletronix LA-2A]] (Silver) — 1–2 dB gentle leveling
### 3. [[UAD Pultec EQP-1A]] — +1 @ 12 kHz air max

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Carve
- HPF 60–100 Hz (give the low octave to bass/kick unless piano is solo) · low shelf −1 to −3 dB @ 150–200 Hz in dense mixes (boost instead when it's the sparse centerpiece)
- **Mid/side mud trick:** cut 250–300 Hz on the **mid channel only** (−6 to −9 dB is fine) — clears the center for snare/bass/vocal while the sides keep the body; *widens* the piano for free
- **Dynamic dip 2–3 kHz sidechained from the lead vocal**, −2 to −4 dB
- Magic frequencies (sound honky soloed, correct in the mix): **1–2 kHz = background→priority** (and earbud/car translation) · **5 kHz shelf = presence** (automate up in choruses) · 10–12 kHz = airy-but-distant
- **Why:** The vocal-sidechained dip is the modern answer to piano/vocal masking — full piano alone, automatic space when the singer's in.

### 2. [[Pro-C 2]] — Even out
- 3:1 · attack 30–40 ms (hammer transient passes) · **2–4 dB GR** — slightly more than feels natural, so it never jumps over the vocal.

### 3. [[Kramer Tape]] — Sweeten
- **15 ips** (④) · **Flux low** (①) · **a touch of Wow & Flutter** (⑥) · **Playback to unity** (③)
- **Why:** VST pianos are too perfect; tape wobble/harmonics add the "recorded in a room" quality.
- 🎬 **J37 tape → Abbey Road Chambers reverb, "to make it sound like it's in a room."** A bridge/breakdown piano (built by copying chords + vocals in from the main pad, then manually "strummed") runs this device (the owned J37 stand-in) directly into a reverb standing in for Abbey Road Chambers — owned equivalent [[ValhallaVintageVerb]] (1970s Color, chamber-family mode). Same J37→Kramer Tape mapping already confirmed on a separate electric-piano video. → [[ValhallaVintageVerb]], [[Reverb]], [[Plugin Wishlist]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)

### 4. [[Utility]] — Width check
- VST pianos come huge-stereo; narrow to ~70–85% so it doesn't smear over the panned guitars.

## 5 — Track FX (optional)

- **[[RC-20 Retro Color]]** for the lo-fi bed lane (use it as an effects box, not a crusher). A filtered/reversed copy of the piano makes a free intro ([[Arrangement and Song Form]]'s filtered-intro trick).

## 6 — Bus / Send FX (optional)

Routing: **Acoustic Piano → [[2 Inst-Synth Group|Inst-Synth Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain]]**.

- **[[Reverb Send Room]]** modest · **[[Reverb Send Long]]** generous only on featured/ballad parts · sidechain-duck under the vocal when it's a bed.
- 🎬 *From video:* a second, CHORUS-ONLY high-piano layer running alongside the main piano, with **[[Ghz DC19 3]]'s Spring reverb as the entire distinguishing move** — reserve the spring for a section-exclusive layer (route only the chorus-only piano to it, or automate the send in specifically at the chorus) rather than a constant texture, so the spring's entrance itself reads as the arrival cue. A/B dry vs. wet before committing — the effect is meant to be obvious ("another dimension"), not subtle glue. → [[Ghz DC19 3]], [[Arrangement and Song Form]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]

## Variations

- **Featured/ballad:** skip the vocal dip, HPF down to 40 Hz, long verb generous.
- **Pop stab piano:** more comp (4–6 dB), Transient-style attack, mono it and pan like a rhythm guitar.

## From videos

- **A pair of small-diaphragm condensers ("K86s") strapped directly to the piano's soundboard and left in place permanently, for a live-tracked piano.** Paul Epworth: "we've been recording pianos with a couple of K86s strapped to the soundboard of the piano, which is something we discovered that Abbey Road like to do" — praised specifically for **flexibility**: mounted on the soundboard rather than floating over open strings, the lid can be opened or closed at will (open for isolation/character, closed to track another instrument in the room at the same time) without re-rigging the mics. A hedged, unconfirmed mention of a hardware stereo bus compressor on the same piano signal path ("probably the best stereo compressor available... may well have been a 1178 or something") — best-match owned equivalent logged on [[UAD UA 1176LN]], flagged speculative there (no settings given). → [[UAD UA 1176LN]], [[Vintage Gear Worklist]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **A two-piano arrangement: a low piano runs the entire song as the harmonic "peg," a high piano is reserved for the chorus only, and spring reverb is the high piano's sole distinguishing move — see the inline 🎬 note in §6 above for the full recipe and owned-plugin mapping.** → [[Ghz DC19 3]], [[Arrangement and Song Form]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **Build a bridge/breakdown piano part by copying existing chord MIDI + vocal audio into a new section, then manually "strumming" the copied chords for a played feel** — see the inline 🎬 J37/Abbey Road Chambers note in §4.3 above for the finishing processing. → [[Arrangement and Song Form]], [[Kramer Tape]], [[Plugin Wishlist]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)

## Sources

Hardcore Music Studio (piano frequencies), Better Mixes (mid/side), Help Me Devvon (collision detection) — links in [[FX Chain System]] · Disclosure — [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · Kenny Beats — [808 & Kick](https://youtu.be/4iAKvWWlCvY) · loner — [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
