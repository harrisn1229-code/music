---
type: plugin
title: "Delay"
category: Reverb/Delay
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Delay

**Category:** Reverb/Delay
**Vendor:** Ableton

## What it is

Ableton's basic stock delay device (Live 11+ consolidated Simple Delay and Ping Pong Delay into this one device) — a straightforward tempo-synced or free-time (milliseconds) delay with Feedback, Ping Pong/stereo linking, and a **Re-Pitch** toggle governing what happens to the repeats when the delay time changes. Distinct from the deeper, character-laden [[Echo]].

## What it's used for

A clean, simple delay when [[Echo]]'s full character/modulation section isn't needed — quick slapbacks, rhythmic throws, and (per the technique below) a fast, minimal sound-design tool via its Re-Pitch behavior and feedback extremes.

## FX chain notes

Drop-in send/insert delay wherever a plain, low-CPU echo is enough; reach for [[Echo]] instead when ducking, built-in reverb, or a Character/Noise section is wanted.

## Techniques

- **Fruity Delay reused on two different layers of one '90s R&B build: a light "very very slight" delay on the main vocal, and a full delay stage closing out a second keys layer's chain.** Main vocal: a super-light delay pass, barely audible, paired with a light reverb — a texture/glue role rather than an audible echo. Second layered keys part (same chords as the main chord bed, extra notes added): EQ → reverb → this device → [[Cassette]] "fuzzy box" for detuning — delay placed mid-chain, ahead of the closing character stage rather than last. → [[Little AlterBoy]], [[Reverb]] (effect), [[Cassette]], [[90s R&B Sample Chain]] — loner, [how to make your own 90's rnb samples](https://www.youtube.com/watch?v=PQjIBDgJehQ)
- **A plain space-filling delay reused across four different elements in one build (piano-adjacent guitar, reversed brass, ride cymbal, drum bus), owned-lane stand-in for FL Studio's "Fruity Delay."** On a from-scratch jazzy R&B sample: a counter-melody guitar, a reversed brass-chop layer, and a heavily-reverbed ride cymbal (hit only on beat one, to extend/lengthen it) each get their own delay stage purely "to give a bit of space" — a repeated, low-key utility use rather than an audible rhythmic echo effect. → [[Reverb]] (effect), [[EQ Eight]], [[Sampling and Sound Selection]] — loner, [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU)
- **Delay's Wet turned all the way up (not blended) on a panned melodic one-shot, for a texture that reads as its own layer rather than an echo of the dry source.** On a UK-garage R&B-chord beat, a third melodic one-shot (panned hard right) runs with delay Wet maxed and some low end cut afterward — a deliberately extreme wet setting rather than the usual subtle blend, so the delayed signal effectively becomes the part's texture. → [[Sound Selection Guide]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Dotted-time preset on an electric-piano chord bed, with wow/flutter-style modulation dialed back for a cleaner bounce.** After a tape stage and a subtle reverb, the dotted note-division preset is tried first ("let's try the dotted presets, see what that sounds like"), then its tape-delay-style modulation (auto-captioned "the wire and the flutter" — near-certain garble of wow/flutter) is turned down; the first preset tried was kept as-is, no further auditioning needed. Best-match: this device's dotted-time division for the rhythmic move; [[EchoBoy]] if the wow/flutter-style tape character itself is wanted. → [[Kramer Tape]], [[Reverb]], [[EQ Eight]], [[1 Electric Piano Track]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **The "Glitch Delay" rack — LFO-mapped delay time is the entire effect; a two-chain crossfade builds the dry/wet macro instead of the knob.** Full from-scratch build (era note: video calls this device "Simple Delay" and "Ping Pong Delay" separately — the pre-Live-11 names for what's now unified in this [[Delay]] note): Stereo Link on, mode = Time, Dry/Wet 100%, then manually drag the delay-time slider while a loop plays — that manual drag IS the foundation effect, later automated by mapping an [[LFO]] (Random wave, ~5 Hz, Control=0.5/Amount=0.5 for full modulation) to a Delay Time macro. A separate Feedback macro adds a metallic character at higher values. The dry/wet macro is built as a **two-chain crossfade** (dry passthrough chain + wet delay chain, zones stretched full-width in the Chain Select editor, faded past each other, chain selector mapped to the macro) rather than the delay's own Dry/Wet knob — done specifically so a second delay (Ping Pong, nested in its own mono/stereo sub-rack, same shared macros) can slot into the wet path later. **Re-Pitch mode** = tape-throw pitch-bend on time changes (smoother); **Jump mode** = audible clicks on every time change (harder mangle/distortion) — a limiter goes at the chain's end before pushing either extreme. Full build: [[Glitch Delay Rack]]. → [[LFO]], [[Randomized Rack Design]], [[Glitch Delay Rack]] — asd, [Ableton Sound Design | Glitch Delay Audio Effect Rack](https://www.youtube.com/watch?v=95e5bfB8th8)
- **Two delays in the same beat, deliberately set to DIFFERENT time values, as a swing technique.** On a house remake of Drake's *Honestly, Nevermind* sound: the main hi-hat carries a delay (owned equivalent for FL Studio's stock delay: this Delay device), and a separate vocal-chop delay is set to a time value that does NOT match the hi-hat's — that mismatch between the two delayed elements is named explicitly as "a massive key to creating swing." A house chord/piano part gets its own delay too (after reverb and an EQ filtering pass, before heavy compression), so multiple elements each carry their own delay stage rather than sharing one. → [[Delay]] (effect), [[House - EDM|House / EDM]] — loner, [how to make authentic house beats for drake's 'honestly, nevermind'!?](https://www.youtube.com/watch?v=E63Q8-gXoMU)
- **The delay stage is what makes a chain sound "woozy" — called out explicitly, not just present in the chain** — on Mike Dean's *Rodeo* intro guitar chain (auto-tune → tape/cassette → EQ cut highs → this → Radiator/Trash distortion → half-time automation), the delay stage is singled out as "very important in achieving that woozy Travis Scott sound," ahead of the distortion stages that follow it. → [[Cassette]], [[EQ Eight]], [[Radiator]] — loner, [the secrets behind mike dean's 'rodeo' production!?](https://www.youtube.com/watch?v=V9FhndW8t74)
- **Dial delay time manually via the BPM formula for push/drag feel, rather than relying on the quantized note-division dropdown** — `60,000 ÷ BPM` gives a quarter note in ms (halve/quarter further for 8th/16th); nudge a few ms shorter than that number for a delay that "pushes" ahead of the beat, or a few ms longer for one that "drags" behind — Delay's free-time ms mode is exactly where this manual calculation pays off over the synced note-division options. → [[Delay]] (effect) — Sage Audio, [Delay Masterclass](https://www.youtube.com/watch?v=wjzowK7iurc)
- **Automate a delay send's amount to echo only specific words/hits** — right-click the delay-send knob → Show Automation, then draw the send level up only under the vocal-chop words/hits that should echo (leaving the rest of the phrase dry) so a repeated word trails off with a delay instead of the whole part getting a blanket delay send; on the delay return itself, set the delay time to a straight 4/4 division and push feedback up for a longer ring-out on those triggered moments. → [[Automation]] — You Suck at Producing, [The Most Slept On Ableton Synth for UK Dubstep](https://www.youtube.com/watch?v=vLsEQAxir1o)
- **Milliseconds mode + Re-Pitch for an "itching" modulation character; feedback pinned to either extreme for a clean jump-around effect** — in ms mode, modulating the delay-time knob with **Re-Pitch** on gives an "itching"/pitch-bending character as the time changes; with Re-Pitch off the same modulation reads more robotic and delayed/jumpy instead. Combine either in mode with **Ping Pong** for a stereo variant. Favorite combo: Re-Pitch on, Dry/Wet at 100 (delay signal only), and **Feedback set either very high or right at zero** — the incoming sound then jumps around cleanly without extra buildup/craziness, good for resampling into a new one-shot. → [[Delay]] — dnksaus, [Ableton Delay Sound Design](https://www.youtube.com/watch?v=DCIEayyv1bk)

## See also

- Plugins: [[Echo]] (deeper/character sibling) · [[EchoBoy]]
- Effects: [[Delay]]
- Palette: [[TEXTURE Slot]] · [[Sound Palette]]
