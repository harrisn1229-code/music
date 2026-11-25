---
type: yt-note
date: 2026-08-05
source: youtube
url: https://www.youtube.com/watch?v=pxF96B5i6WI
channel: Max Konyi
duration: "00:12:02"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, lofi, series, studio-one, synth, lead, modulation, distortion, eq, reverb, automation]
briefed: backlog
---

# Retro Lead Synth | Studio One LoFi Tutorial | Part 7

![](https://www.youtube.com/watch?v=pxF96B5i6WI)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=pxF96B5i6WI)

## Synopsis

Part 7 of the [[Make a Chill LoFi Beat in Studio One Part 1|lo-fi build-along series]] — designs the melodic lead: a preset-based bell-ish patch, aged with dual-LFO pitch wobble, tube distortion, and an aggressive "tiny speaker" EQ, finished with an insert reverb. The second half covers performing the melody with pitch-bend and pan automation for "life," plus a reverse-hit swell used to lead into the phrase. Dense with reusable retro/lo-fi sound-design moves that are effect-agnostic — several of the individual pieces (dual-LFO modulation, distort-before-EQ ordering, reverse-swell anticipation) are documented lessons on their own even outside the lo-fi context.

## Techniques

- **Start from a preset that's already close, then reshape its envelope for a new character.** Instead of building a patch from an initialized oscillator (as in [[Bass Synth and Bassline Studio One LoFi Tutorial Part 5|Part 5]]), picks a vintage "8-bit trumpet" preset purely because its tone attracted him, disables its baked-in effects, then reshapes it into a **bell-like** patch: release stretched to a couple of seconds, sustain/decay pulled and bent down steeply — "tap the key and it decays," the same tap-and-decay logic as the [[Bass Synth and Bassline Studio One LoFi Tutorial Part 5|bass patch's]] amp envelope, applied to a lead instead.
- **Dual cross-modulated LFOs for an irregular, "alive" retro pitch wobble.** Both LFOs set to free-running (not tempo-synced), rate ~3 on both: LFO1 modulates pitch directly (a subtle up/down wobble); **LFO2 modulates LFO1's rate** rather than modulating pitch itself — so the *speed* of the pitch wobble itself drifts over time instead of pulsing at one constant rate, "sometimes it moves faster, sometimes it moves slower, just like a real retro thing wouldn't actually always bend at the same rate." Framed explicitly as emulating the interaction of many uncontrolled physical factors in a real vintage instrument/circuit. → [[Modulation]]
- **Distortion-before-EQ, and the order matters audibly.** A "bad tube"-type distortion driven hard (drive maxed, output trimmed down ~5 dB to compensate) for an "old, broken circuit" fuzz character — then Max flags explicitly: **"make sure your EQ comes after your distortion... we want to distort the entire signal and then filter it, not filter then distort" — "the difference is actually pretty substantial."** Filtering first and distorting after only distorts what survived the filter; distorting first then filtering shapes the full distorted signal, including harmonics the filter is about to remove. → [[Saturation and Distortion]]
- **"Speakerphone"/tiny-speaker EQ recipe: scoop both ends to a narrow midrange band, applied AFTER the distortion.** High cut pulled to ~2.9–3 kHz at 36 dB/oct, low cut pulled up to ~733 Hz at 36 dB/oct — an aggressive narrow-band scoop specifically meant to sound like the signal is squeezed through a tiny speaker/telephone driver, done deliberately after the distortion stage per the ordering rule above. → [[EQ]]
- **Insert reverb (not a send) when only one instrument will ever use it.** Since the reverb is only ever going to affect this one lead, it's put directly on the track as an insert rather than routed to a shared send — lets the Mix knob alone control a "sunken" blend without extra routing overhead. Settings: large hall, width ~0.8, height ~0.4, pre-delay ~583 ms (a long pre-delay, matching the "walls far away" effect described in [[Drums Studio One LoFi Tutorial Part 3|Part 3]]'s snare-reverb discussion), length ~13 s (long tail, but see the Mix note below), high-quality mode, **Mix ~47%** — nearly even dry/wet so the lead reads "sunk back in this big space" without disappearing. → [[Reverb]]
- **Pitch-bend automation on the melody as a "humanness" device, distinct from the LFO wobble above.** On top of the LFO-driven random wobble, the actual note-to-note melody gets *performed* pitch bends: bent down into the start of the first note and released, and a bend down into a later note then back up "slowly to grab the top" — described as one of two complementary ways (alongside subtle LFO modulation) to get "more life and humanness out of a synth... volume swells, all the stuff that real sounds in the physical world can do." → [[Automation]]
- **Pan automation swept across a phrase for movement, not just static stereo placement** — the lead's pan knob automated to sweep from hard right at the start of the phrase across to hard left by the end, then brought back a touch earlier for balance, plus a small overall volume boost (~3–4 dB) to compensate for the automation making it feel buried. → [[Automation]], [[Width and Stereo]]
- **Reverse-hit "swell" built by hand, as an anticipation lead-in into a note.** Recipe: place a short hit of an already-used percussive sound (here, a snare-ish "B" hit), Ctrl+B to bounce it to audio, Ctrl+R to reverse it, trim off the (now-leading) loud transient so only the swelling tail remains, fade the new end so it doesn't click, route it through the same reverb as the lead, then position/stretch it so it fades directly into the first note of the phrase — with volume pulled down so it reads as anticipation, not its own event. On the loop's second pass, panned to enter from the opposite side of where the first pass's swell entered, mirroring the lead melody's own left-right pattern variation. → [[Ear Candy and Hiding Synths]] (the general reverse-swell-into-a-downbeat technique is already documented there — this is a concrete from-scratch build method for making one, rather than reaching for a plugin's reverse function)

## Routed to

- [[1 Synth Lead Track|Synth Lead Track]] — dual-LFO retro wobble, distortion-before-EQ order, "speakerphone" EQ, insert reverb for a solo lead, pitch-bend + pan automation, and the manual reverse-swell build all woven inline
- [[Modulation]] — LFO2-modulating-LFO1-rate technique added to From videos
- [[Saturation and Distortion]] — distort-before-EQ ordering rule added to From videos
- [[EQ]] — narrow-band "speakerphone" scoop recipe added to From videos (complements the existing Disclosure "telephone/old-radio tone" bullet with concrete frequencies + the ordering rule)
- [[Automation]] — pitch-bend + pan-sweep as "humanness" performance devices added to From videos
- [[Ear Candy and Hiding Synths]] — cross-referenced the reverse-swell build method (existing page already documents the reverse-swell *concept*; no duplicate bullet needed, just the cross-link from the chain note)

## Source

[Retro Lead Synth | Studio One LoFi Tutorial | Part 7](https://www.youtube.com/watch?v=pxF96B5i6WI) · Max Konyi · 12:02 · captions (high confidence — clean, single-speaker tutorial narration) · transcript: [[Retro Lead Synth Studio One LoFi Tutorial Part 7 (transcript)]]

**Series note:** [[Bass Synth and Bassline Studio One LoFi Tutorial Part 5|← Part 5]] (Part 6 — a texture/vocal-chop layer — wasn't in this queue) · [[Final Mix & Master Studio One LoFi Tutorial Part 9|Part 9 →]] (Part 8 — arrangement — wasn't in this queue). The preset browser and distortion/reverb plugin names are Studio One-specific; every actual move (envelope reshaping, cross-modulated LFOs, ordering rule, EQ numbers, automation, reverse-audio build) is captured behaviorally and ports directly to Ableton (Wavetable/Operator + Overdrive/Redux + EQ Eight + Reverb).
