---
type: yt-note
date: 2026-08-18
source: youtube
url: https://www.youtube.com/watch?v=Uc3SxgT4uCw
channel: Mix with the Masters
duration: 00:06:30
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, guitar, delay, widening, flange, phase-alignment, layering]
briefed: 2026-W34
---

# Mixing Muse Guitars - Chris Lord-Alge

![](https://www.youtube.com/watch?v=Uc3SxgT4uCw)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Uc3SxgT4uCw)

## Synopsis

A Mix with the Masters session walkthrough with Chris Lord-Alge working a Muse guitar session. Two guitar situations get built up in front of the camera: a guitar solo, and the six-plus tracks that make up the song's main "one guitar sound." On the solo, after basic rumble-removal and a midrange bump ("bark it up"), CLA layers a dual delay (an eighth-note repeat and a longer quarter-note repeat) with a touch of reverb behind it, then adds a dedicated pair of Eventide H3000 harmonizers — one set to a classic micro pitch-shift widener (roughly ±4 cents split left/right), the other running a custom program he calls "Death Flange," used subtly to add a "supernatural" quality rather than an obvious sweep. On the main guitar sound, he shows the six tracks that make up ONE guitar tone across the song: several room-mic'd amp tracks plus a separate DI fuzz track of unclear pedal origin, with the DI track specifically checked and flipped for phase against the mic'd signal (audibly restoring lost low end once corrected) and credited with adding real "heat" to the overall blend. He also notes, in passing, that the same six-ish fader strips cover three different roles across the song — rhythm guitar in one section, the solo in another, piano in a third — so despite eating up a lot of physical channels, they're rarely all active at once.

## Techniques

- **Guitar solo dual-delay + light reverb layer for an "arrival" moment: an eighth-note repeat alongside a longer, roughly-quarter-note repeat run simultaneously, with a touch of reverb underneath both.** The two delay times read as a synced eighth/quarter pair (the quarter-note repeat is almost exactly double the eighth-note's length), stacked rather than swapped between — the eighth keeps the part moving, the longer quarter-note repeat gives it size, and the reverb glues the pair together instead of leaving them as two dry, separate echoes. Direct owned-plugin realization: two EchoBoy instances at synced 1/8 and 1/4 note divisions, feeding a shared reverb send. → [[EchoBoy]], [[Delay]] (effect), [[Reverb]] (effect), [[LEAD Slot]]
- **Dual Eventide H3000 setup on a guitar solo — one dedicated purely to a classic micro pitch-shift widener (roughly ±4 cents, split left/right fine-tune), the other running a custom "Death Flange" program blended in subtly for a "supernatural" character rather than an obvious sweep.** The widener half is the exact hardware/technique the vault's [[MicroShift]] (Soundtoys) is already built to emulate — see [[Width Send]], which documents this as "the H3000 micro-pitch trick" — so this is a direct, named confirmation of that owned lane rather than a new gap. The flange half has no exact owned match; closest lane is [[kHs Flanger]] pushed subtle rather than obvious, kept low in the blend the way CLA runs it here. → [[MicroShift]], [[Width Send]], [[Stereo Field]], [[kHs Flanger]], [[Modulation]] (effect), [[TEXTURE Slot]]
- **Check phase between a DI track and its mic'd counterpart on guitar, and flip polarity when they're out of phase — confirmed by ear, not just by eye.** "It's out of phase, so we flip the phase — that brings all the bottom back." Framed as a standing habit: "always want to check the phase of DI versus amp and see which works." Once corrected, the DI fuzz layer (pedal/source unclear from the transcript) is credited with adding real "heat" to the combined guitar sound — a layer that would otherwise be actively cancelling low end against the mic'd signal rather than reinforcing it. → [[Phase Alignment]], [[1 Electric Guitar Amp Track]]
- **One "guitar sound" built from several simultaneous tracked layers — room mics on the amp plus a separate DI fuzz track — rather than a single mic'd source.** Confirms the same multi-mic-plus-DI-layer construction already documented elsewhere in this vault's guitar chain, here specifically flagged as needing its own phase check once a DI layer is added to mic'd layers. → [[Layering and Stacking]], [[1 Electric Guitar Amp Track]]
- **The same six-ish fader strips cover three different roles across a song (rhythm guitar in one section, guitar solo in another, piano in a third) and are rarely all active at the same time** — a console/session economy note: high track count from one performer doesn't necessarily mean simultaneous competition for space, if the parts are arranged to trade off by section. → [[Arrangement and Song Form]]

## Routed to

- [[EchoBoy]] — dual synced-delay-plus-reverb solo technique added to Techniques
- [[MicroShift]] — H3000 micro-pitch widener confirmation added to Techniques
- [[Width Send]] — inline confirmation note added to Usage
- [[Modulation]] (effect) — "Death Flange" subtle-character technique added to From videos
- [[Phase Alignment]] — DI-vs-mic phase check/flip on guitar added to From videos
- [[1 Electric Guitar Amp Track]] — inline phase-check + solo delay/widener notes added
- [[Layering and Stacking]] — multi-mic-plus-DI-layer guitar construction added to From videos
- [[Arrangement and Song Form]] — multi-role track economy note added to From videos

## Source

- 📺 [Mixing Muse Guitars](https://www.youtube.com/watch?v=Uc3SxgT4uCw) — Mix with the Masters (Chris Lord-Alge), 00:06:30
- Transcript: captions, high confidence — [[Mixing Muse Guitars - Chris Lord-Alge (transcript)]]
