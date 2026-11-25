---
type: chain
title: Brent Faiyaz Ambient Synth Chain
reference: A dark/moody minimal ambient R&B beat styled after Brent Faiyaz's "Mercedes" — a from-scratch build
chain_type: style
family: keys-synths
routing: Chord synth + Aperture pluck-double + Aperture perc texture + 5ive&XYZ bass/fill/melody + Layers vocal chop → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Bass Group|Bass Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Bass Bus|Bass Bus]] → Master
signal_chain: [Chord synth (spring reverb heavy/short, EQ cut low + high), Analog Lab Aperture "Pluck Heaven" strummed double (EQ low-cut), Analog Lab Aperture perc loop (texture, no further processing given), 5ive & XYZ kit bass one-shot (pitch slides drawn in, velocity varied), 5ive & XYZ kit perc-loop-chopped drum fill (auto-pan), 5ive & XYZ kit synth melody (Portal "Echoes" preset, half-time 1-bar), Layers "Talk to Me" vocal chop (time-stretched, pitch-fit to key), unnamed "fill impact" transition texture, velocity-varied dual hi-hats, once-per-bar snare + ambient perc layer (reverb), perc/rim/open hat/perc/kick/sub bass]
status: video-derived
tags: [chain, keys, synth, bass, style, sampling, r&b, ambient, brent-faiyaz]
---

# Brent Faiyaz Ambient Synth Chain

**Reference/vibe:** a dark, moody, deliberately minimal ambient R&B beat built to sound like Brent Faiyaz's *Mercedes* — reverse-engineered from loner's breakdown, [how to make ambient synth beats for brent faiyaz (r&b music theory trick!?)](https://www.youtube.com/watch?v=ugup5iVzGYY). Same restraint-first ethos as [[Frank Ocean Chill Ambient Chain]] — most individual FX chains here are 2–3 stages, and the density comes from stacking many small layers rather than heavily processing any single one. The headline move is compositional, not processing: a bare two-chord loop (see [[Chord Progressions]]) carries almost the whole harmonic weight of the beat.

## Chain overview

A two-chord harmonic bed, doubled and textured with progressively more layers, over a drum kit built around velocity-varied hi-hats and a deliberately sparse, layered snare. The reusable core idea: **keep the harmony as simple as possible (two chords, close voice-leading for tension), then build density entirely through arrangement — doubling the chords with a different-character preset, adding texture layers one at a time, and reserving processing complexity for compositional/performance details (slides, velocity, panning) rather than deep FX chains.**

## 1. Chords — vi→v natural-minor loop

- **Progression:** F♯maj7 (vi) → Fm (v) in A♯ natural minor — both diatonic, no borrowed/modal-interchange chords. Full derivation and theory reasoning → [[Chord Progressions]].
- **Melody:** a few top-line passing notes added over the held chords, not a separate melodic layer. → [[Melody Writing]]
- **Chain:** spring reverb (heavy, kept short) → EQ (cut lows, cut some highs).
- 🎬 *From video:* "a big key to Brent's sound is simplicity" — two close-voiced chords with a major→minor quality shift generate real tension with zero functional dominant. → [[Chord Progressions]], [[Reverb]], [[EQ]]

## 2. Chord double — Analog Lab Aperture "Pluck Heaven"

- **Source:** Arturia Analog Lab (unowned, see [[Plugin Wishlist]]), Aperture preset bank, "Pluck Heaven" preset — "a mix of a pluck and a pad."
- **Performance:** same chords as Stage 1, played strummed rather than block-triggered.
- **Chain:** EQ, low-cut only.
- 🎬 *From video:* a doubling layer gets its own identity from preset choice + performance (strumming), not new harmony. → [[Plugin Wishlist]], [[Sound Selection Guide]]

## 3. Texture — Aperture perc loop

- **Source:** the same Aperture bank, an unnamed perc loop, added purely for texture.
- 🎬 *From video:* one small texture layer per pass, added and left alone rather than processed further. → [[Ambient Texture and Field Recording]]

## 4. Bass — 5ive & XYZ kit one-shot

- **Source:** a "technical bass" one-shot from the 5ive & XYZ kit (vendor unconfirmed, recurring unnamed-kit source already tracked on [[Sound Selection Guide]]).
- **Why a one-shot, not a Kontakt bank:** lets pitch **slides** be drawn into the MIDI (not possible on a multisampled bank) for realism; velocity is also easy to vary.
- 🎬 *From video:* motivated directly by "a lot of Brent songs have real basses" — one-shot slides as the cheap stand-in for a real bass performance. → [[Bass Design]], [[Sound Selection Guide]]

## 5. Drum fill — 5ive & XYZ kit, chopped perc loop

- **Source:** a perc loop from the same kit, chopped into a fill.
- **Chain:** auto-pan (slow), so it sweeps side to side.
- 🎬 *From video:* stereo width added via one moving element rather than a wide processing chain. → [[Width and Stereo]], [[Modulation]]

## 6. Melody — 5ive & XYZ kit synth

- **Source:** a synth patch from the same kit, a simple melody placed toward the end of the 4-bar loop.
- **Chain:** [[Portal]] "Echoes" preset → half-time (1-bar setting).
- 🎬 *From video:* the Echoes preset delays the signal so the melody plays later than triggered — a reversed/echoey feel that reads almost like an accent on beat one rather than a normal phrase. → [[Portal]]

## 7. Hook vocal chop — Layers "Talk to Me"

- **Source:** the Layers kit ("my bundle," already tracked on [[Sound Selection Guide]]), a loop called "Talk to Me," picked for a close tempo match.
- **Processing:** time-stretched, then pitch-fit into the song's key.
- 🎬 *From video:* a texture layer, not a lead vocal — chosen and conformed rather than written. → [[Sound Selection Guide]]

## 8. Transition — unnamed "fill impact" texture

- A short, unnamed impact/fill sound used purely to smooth the transition into the drums/drop. No further detail given.

## 9. Drums — velocity-varied hats, spaced/layered snare

- **Hi-hats:** two layers — hat 1 straight, with velocity changed on every OTHER note for realism/bounce; hat 2 staggered, a few sparse notes underneath. → [[Rhythm and Groove]]
- **Snare:** spaced to once per bar (modeled on Brent Faiyaz's own "kind of weird" snare spacing) for rhythmic contrast against the fast hats, layered with a separate ambient percussive hit (its own reverb) to help it sit in the mix. → [[Snare Design]]
- **Rest of kit:** perc → rim shot → open hat → another perc → kick → sub bass (sub explicitly designed off a Brent Faiyaz reference sound, no further detail given).
- 🎬 *From video:* "I'd really recommend layering your snares like this especially if you're finding it hard to get the snare to sit in the mix nicely." → [[Snare Design]], [[Rhythm and Groove]]

## Arrangement

**Two chords, and density does everything else.** Stated in the chain overview and it's the headline: keep the harmony as simple as possible (a vi→v loop with close voice-leading), then build every bit of sectional movement through *arrangement* rather than through new chords.

| Section | Layers |
|---|---|
| Intro | chord bed alone |
| Verse | + pluck double · texture · bass |
| Hook | + melody · vocal chop |
| Transition | the "fill impact" texture, then a drop back |

**The move — add one layer per section over a harmony that never changes.** The nine stages above are effectively nine arrangement slots, and the build order *is* the running order.

**Density: 1 → 7 over a two-chord loop.** The widest density swing in this folder sitting on the narrowest harmony — that contrast is the genre.

## Variations

- **The vi→v natural-minor two-chord device generalizes past this specific key** — any natural-minor scale's vi and v chords sit a semitone apart at the root with close inner voices; transpose the same relationship into any key for the same close-voice-leading tension. → [[Chord Progressions]]
- **The live-bass-one-shot-for-slides trick (Stage 4) applies to any bass patch where a Kontakt-style articulation bank would otherwise block pitch slides.**
- **The once-per-bar snare + ambient-perc layer (Stage 9) is a reusable mix-placement fix any time a snare "won't sit," independent of this beat's specific spacing choice.**

## Notes

- Several sample-kit names are auto-caption garbles carried over from other Sound Selection Guide entries ("5ive and XYZ kit," heard variously as "five and xyz kit" / "x y and five's kit") — vendor unconfirmed, treat as the same recurring unnamed kit.
- No exact numeric settings (reverb decay, EQ frequencies, auto-pan rate, half-time parameters) were given on screen beyond qualitative descriptions — treat every device's setting as a starting point to dial in by ear.

**Sources:** loner — [how to make ambient synth beats for brent faiyaz (r&b music theory trick!?)](https://www.youtube.com/watch?v=ugup5iVzGYY) (00:08:10, 2021-12-05) · full note: [[how to make ambient synth beats for brent faiyaz (r&b music theory trick!?)]]
