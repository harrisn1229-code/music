---
type: chain
aliases: ["Synth Bed Track"]
title: Synth Bed Track
chain_type: track
family: keys-synths
source: digital
routing: Synth Bed → Inst-Synth Group → Inst-Synth Bus → Master
uad_console: [UAD UA 610-B (plugin front end), UAD Teletronix LA-2A, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, OTT, Utility, Kickstart 2]
status: default
tags: [chain, synth, track]
---

# Synth Bed Track

**Role:** Pads, beds, atmosphere — the glue layer the listener feels but never notices. The whole chain is about *making room*: a pad fills space until something more important needs it.

**Chain philosophy:** aggressive framing → even the wash → width/level → duck.

## 1 — Sound Selection

- 🎬 **Genre-match a preset first, revoice the chord tops by hand after, then swap the preset mid-build if it isn't landing.** Building an airy Post Malone-style pad (Arturia Analog Lab's "Layers Volume 2" bank): picked "Burning Desire" for its melodic character, wrote the progression, hand-nudged individual chord-TOP notes into a similar register for a different feeling without touching the harmony — then swapped the whole instrument to "Night Sky" mid-build once it read "a bit more Post Malone-ish." Same slot, same voicing work, different patch. → [[Melody Writing]], [[Plugin Wishlist]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **[[Omnisphere]]** — THE pad instrument; **layer two patches (one dark + one airy)** and balance instead of hunting one perfect patch. → [[Omnisphere — Layered Dark+Airy Bed]]
- 🎬 **Mike Dean's CS-80 + Jupiter-8 pad** — a two-oscillator raw patch (sawtooth + rectangle wave, Fine Tune pulled up for a wide detune, light chorus + reverb + overdrive, chorus and cutoff modulated together) layered with a factory strings preset from a second synth entirely, built starting from a default patch rather than a preset. Nearest owned build path: [[DUNE 3]]/[[Serum 2]] for the raw detuned-oscillator layer + [[Model 84 Polyphonic Synthesizer]] or [[Omnisphere]] strings for the second layer. → [[Sound Selection Guide]], [[Layering and Stacking]], [[Roland Jupiter-8]] — loner, [mike dean's secret 'astroworld' synth techniques!?](https://www.youtube.com/watch?v=2bJGXDlSFdY)
- **[[Model 84 Polyphonic Synthesizer]]** — the Juno pad lane: saw + sub, chorus II, slow filter — the 80s/indie warm bed in 30 seconds. 🎬 Era-match the processing: "it's got to be 80s for all the reverbs — it's definitely an 80s Juno" — Disclosure, [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A).
- 🎬 **One Juno-emulation instrument carrying FIVE roles in a single 80s synthwave/pop beat (main pad, bass, a second "chorus-lift" pad, a pluck texture, a bell counter-melody), each with a small dedicated chain.** Main pad: attack/envelope down → chorus (before the arpeggiator) → [[Cassette]] → heavy reverb → EQ (cut lows) → delay (a tried half-time stage got cut for being unused). Second pad, added because the chorus needed to sound bigger: same dry-start move → EQ (lows + mids) → delay → reverb. Full per-layer breakdown (pluck, bell) on [[Model 84 Polyphonic Synthesizer]] and [[Synthwave]]. → [[Cassette]], [[TAL-Chorus-LX]], [[Model 84 Polyphonic Synthesizer]], [[Synthwave]], [[Layering and Stacking]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- **[[Wavetable]] / [[Drift]]** — evolving/motion pads (position-LFO movement that OTT loves). · **[[Nexus]]** — instant produced pads.
- 🎬 **80s synth-pop pad recipe (Weeknd *Dawn FM*): saw + square blended ~70/30, one oscillator tuned a major-key interval above the other (interval, not unison-detune, gives the "big" size), then Chorus → Reverb → Overdrive in that exact order, then two LFOs on two different cycle modes — LFO→filter cutoff synced to quarter notes in Single mode (per-note sweep), LFO→reverb dry/wet in Cycle mode (continuous, fills the space between chord hits).** Full recipe on [[DUNE 3]]'s Techniques section. — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0) → [[Modulation]], [[Reverb]]
- Universal pad rules: **attack 0.5–2 s, release 1–3 s**, unison detune wide, slow filter motion, velocity → nothing, no sub octave (the chain HPFs it anyway).
- 🎬 **A one-shot with portamento/glide turned up, used purely as a dedicated section-transition marker** — one specific patch reused every time a "switch" into a new section is needed, rather than writing new transitional material each time (the "Ballin'" glide sound). → [[Arrangement and Song Form]] — loner, [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)

## 2 — Programming Best Practice

- 🎬 **A three-part layering recipe to make ONE synth read as a whole band: a ghost note of the chord just before/after the main hit, one short percussive impact, then a reverb-tail return.** "Every time there's a chord playing you're going to have like a ghost note of the chord just before or after, or you're going to have one impact of the chord that's going to be short, and then you're going to have the reverb coming back... so it gives like a movement of a whole band playing together just with one instrument." Three distinct roles from ONE source rather than three instruments: quiet pre/post-echo ghost hit → short punchy transient impact on the downbeat → longer reverb-tail return filling the space after. → [[Layering and Stacking]], [[Reverb]] — Justice x Kevin Parker (Mix with the Masters), [Behind the Track｜'Neverender' by Justice & Tame Impala](https://www.youtube.com/watch?v=emP9EWcqss4)
- 🎬 **Morph a pad into an arp of the SAME patch via automation, instead of writing a new part for a new section** — automate the arpeggiator's on/off state together with **attack** and **filter cutoff frequency**, so the existing pad reshapes into an up-arp'd version of itself when a new section (e.g. a choir entering a bar early) needs a lift — reusing one sound in a new form reads as more cohesive than introducing a competing new sound at the same moment. → [[Automation]] — loner, [James Blake's production tricks are GAMECHANGING!?](https://www.youtube.com/watch?v=9FX7p23hSlc)
- 🎬 **Keep the bed thin and mono when it's meant to leave room for a vocal, not just "wide and lush" by default** — a deliberately thin, mono foundation (paired with the lead/bass synths, not just this bed) frees frequency and stereo headroom for the voice; width gets introduced later and on purpose, staggered a bar ahead of the section that needs it. → [[Width and Stereo]], [[1 Synth Lead Track]] — loner, [James Blake's production tricks are GAMECHANGING!?](https://www.youtube.com/watch?v=9FX7p23hSlc)
- 🎬 **The melody collage** — a bed doesn't need one great part: stack ~3 unremarkable airy melodies in one key (high octave / low octave / bell), filter/texture/reverse into a drone, and let the **bassline imply the changes** — Kenny Beats, [Beat Mix & Creation](https://youtu.be/FC__hbvnETY) → [[Arrangement and Song Form]], [[BED Slot]].
- **Voice above the mud zone** — the chain cuts 200–300 Hz anyway; don't write the pad's weight there.
- Commit to audio when dialed; a filtered/reversed copy = free intro ([[Arrangement and Song Form]]).

## 3 — Source → Ableton (UAD front end)

Optional — beds get framed so hard in §4 that the front end matters least here:

### 1. [[UAD UA 610-B]] — barely on · ~0 VU
### 2. [[UAD Teletronix LA-2A]] — 1 dB
### 3. [[UAD Pultec EQP-1A]] — bypass

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Aggressive framing
- **HPF 150–300 Hz** (pads NEVER need real low end — fastest mud-killer in a dense mix) · LPF 8–12 kHz (leave the air to vocals/hats) · dynamic dip in the vocal band keyed from the vocal
- **Mid/side upgrade:** make the 200–300 Hz cut **mid-channel only**, deep — the pad vacates the center (snare/bass/vocal) but keeps body on the sides, getting *wider* as a side effect. The single best pad-in-a-dense-mix move.
- 🎬 A small low-mid carve where the synth clashes with the vocal is often all a chord bed needs — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU).

### 2. [[OTT]] — Even the wash
- **Depth 10–20%** (①) — no note swells over the mix · **Time moderate** (② — avoid pumping) · **In/Out to unity** (③/④)

- 🎬 **Low-cut EQ → heavy reverb → cassette/tape stage, that exact order, for an ambient "vintage-but-airy" pad.** After [[Pro-Q 4]]'s low-cut in this stage, a deliberately heavy reverb goes on for the "super ambient" target, then a clean-tape/cassette pass strictly for vintage color — the tape stage comes LAST, after the pad's already wet, not as a dry-signal color pass before space is added. Owned lane: [[Cassette]]. → [[Cassette]], [[Reverb]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)

### 3. [[Utility]] — Width + level
- Wide is fine here (pads are where width belongs), check mono · sit the level lower than feels right — **if you clearly hear the pad, it's too loud.**

### 4. [[Kickstart 2]] — Duck
- **Gentle curve** (① — rhythmic breathing vs. the kick) — or **keyed from the *vocal*** (④) for auto-space in ballads · **Mix to taste** (③)
- 🎬 Disclosure key the bed's compressor **off the vocal via a muted empty bus**, slow release so it flows (fast release = "radio compression, always full"); [[Soothe2]]/Trackspacer do the frequency-domain version — [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU) → [[Sidechaining]].
- **Why:** A pad that ducks is a pad that never has to be turned down.

## 5 — Track FX (optional)

- **[[RC-20 Retro Color]]** texture on dark trap pads · [[ValhallaShimmer]] insert (low mix) on exposed ambient sections · granular smears ([[Portal]]-style — wishlist) behind a printed part.
- 🎬 **Textured pulsating one-shot pad: Reverb → guitar amp → shaper box → EQ — the guitar-amp stage is what makes it read as "textured" instead of clean.** Reused twice with different attack/shaper settings for two Mustard beats (a dark two-note power-chord pad, and a glossier more-attack pad). Owned amp-sim lane: [[Morgan Amps Suite]]; the shaper-box stage is the already-tracked [[Plugin Wishlist]] gap (Cableguys ShaperBox). → [[Saturation and Distortion]], [[EQ]] — loner, [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)

## 6 — Bus / Send FX (optional)

Routing: **Synth Bed → [[2 Inst-Synth Group|Inst-Synth Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain]]**.

- Beds mostly carry their own space (patch reverb/motion); [[Reverb Send Long]] only when the bed doubles as the song's atmosphere.

## Variations

- **Ambient intros/outros (pad exposed):** open the filters, automate width, Shimmer insert.
- **Trap bed:** LPF down to 5–6 kHz, RC-20 texture, very low in the mix.

## From videos

- **The ghost-note + impact + reverb-tail band-in-a-box recipe, sourced end to end** — see the inline 🎬 note in §2 above. → [[Layering and Stacking]], [[Reverb]] — Justice x Kevin Parker (Mix with the Masters), [Behind the Track｜'Neverender' by Justice & Tame Impala](https://www.youtube.com/watch?v=emP9EWcqss4)
- **The full Post Malone-style pad build, sourced end to end** — see the two inline 🎬 notes in §1/§4 above (preset choice + swap, then low-cut → heavy reverb → cassette-tape finishing order). → [[Cassette]], [[Reverb]], [[Plugin Wishlist]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **A portamento one-shot as a section-transition marker, plus a textured pulsating pad chain (Reverb → guitar amp → shaper box → EQ) built twice with different attack/shaper settings** — see the two inline 🎬 notes in §1/§5 above. → [[Arrangement and Song Form]], [[Saturation and Distortion]], [[Plugin Wishlist]] — loner, [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)
- **Pad-to-arp morph via automating arp on/off + attack + filter cutoff together, plus a thin/mono foundation to leave room for a vocal** — see the two inline 🎬 notes in §2 above. → [[Automation]], [[Width and Stereo]] — loner, [James Blake's production tricks are GAMECHANGING!?](https://www.youtube.com/watch?v=9FX7p23hSlc)
- **The full Dawn FM synth-pop pad build, sourced end to end** — see the inline 🎬 note in §1 above; full step-by-step (waveform blend, tuning interval, effects order, dual-LFO cycle-mode routing) lives on [[DUNE 3]]'s Techniques section. → [[DUNE 3]], [[Modulation]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)
- **One Juno-emulation instrument run across five pad/texture roles in one build (main pad, second "chorus-lift" pad, plus a pluck and a bell logged on other chains) — see the inline 🎬 note in §1 above.** Full per-layer chains on [[Model 84 Polyphonic Synthesizer]] and the [[Synthwave]] genre page's third worked-breakdown section. → [[Cassette]], [[TAL-Chorus-LX]], [[EchoBoy]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)

## Sources

Disclosure — [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU) · [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · Kenny Beats — [Beat Mix & Creation](https://youtu.be/FC__hbvnETY) · loner — [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0) · Justice x Kevin Parker (Mix with the Masters) — [Behind the Track｜'Neverender' by Justice & Tame Impala](https://www.youtube.com/watch?v=emP9EWcqss4)
