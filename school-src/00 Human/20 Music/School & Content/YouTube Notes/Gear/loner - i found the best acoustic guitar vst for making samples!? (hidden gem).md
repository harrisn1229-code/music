---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=bCrmhzATbiM
channel: loner
duration: "00:08:03"
video_type: gear
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, gear, sampling, guitar, sound-design]
briefed: backlog
---

# i found the best acoustic guitar vst for making samples!? (hidden gem)

![](https://www.youtube.com/watch?v=bCrmhzATbiM)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=bCrmhzATbiM)

## Synopsis

A gear-demo + workflow video: loner introduces **Fink – Signatures** (Spitfire Audio, £49, standalone — no Kontakt required), an acoustic-guitar toolkit built from performance recordings of songwriter Fink playing a nylon-string (a 2004 Mal Brady Bouchier) and two steel-strings (a 2010 Martin D28, a 1984 Martin D35). The auto-caption text renders the product name as "think signatures" and the nylon-guitar preset family as "brady" — both now resolved via web lookup (see Source). The bulk of the video is a live cook-up: loner builds a full sample from the ground up entirely inside this one instrument (chords, a strummed layer, percussion, vocals, keys), then layers in a couple of outside sounds (a synth bass, a percussion loop) before bouncing the whole thing to audio and running it through his standard chop/pitch/half-time sample-flip pipeline. It's a good demonstration both of what the plugin can do and of loner's repeatable "turn a finished bounce into a sample" process, which matches techniques already logged elsewhere from this channel.

## Techniques

### The plugin (Fink – Signatures)
- **Interface layout:** a volume knob; a dynamics slider (bottom-left) that blends between "close to the mic" and "run through an amp"; a multi-function wheel that crossfades a bundle of effects 0–100%, and — when clicked — exposes individual controls for reverb, attack, release, start point, chorus, and delay; a reverb-type selector at the top (multiple room/length options); plus standard tune/pan/volume controls.
- **Chord presets are real recorded chords, not a chord-detection algorithm layered on single notes** — loner calls this out as the reason it sounds convincingly like an actual performance rather than "a guitar VST" in the usual synthetic sense: play a single note and it triggers an actual multi-string chord voicing that was recorded as one performance.
- **Keyboard is color-coded by chord quality** — green zone = major chords, blue zone = minor, yellow/neutral zone = a third quality (unspecified, likely diminished/other). One-note-per-chord triggering makes sketching a full progression fast: loner builds a 3-chord progression (G♯ major → C minor → A♯ major, i.e. root/relative-minor-adjacent movement in the key of C minor) in about a minute this way. → [[Chord Progressions]]
- **"Brady" preset family = the nylon-string guitar (the Mal Brady Bouchier model).** Used "Brady pulled chords" for the main chord layer: release pulled down short, attack pushed up, chorus raised slightly for width.
- **Layer a second, arpeggiated/strummed preset over the same copied MIDI chords** for a "someone actually strumming" texture on top of the plucked-chord layer — same notes, different articulation preset, stacked rather than replacing the first layer. Turning the effects wheel live while it plays demonstrates: chorus widening the sound, the dynamics/tone knob changing brightness, a "squeak" (fret/finger noise) control adding realism, and reverb adding space — all blendable in real time, not just static settings.
- **A dedicated percussion preset bank** inside the same instrument (the "Brady kit," matching the guitar model for tonal consistency) — used here for a light rhythmic layer with the progression deliberately dropped out at certain points (arrangement contrast) rather than running continuously.
- **A small vocal preset bank is included too** — not extensive, but usable: an "oo swell" preset with the release pulled down, played as chord stacks (not single notes) to fill gaps left by the guitar's arrangement. Two instances of the same vocal chords copied to separate mixer tracks and hard-panned L/R for width, with one instance's level pulled down relative to the other.
- **A small keys preset bank is also included** ("only a couple of presets") — used here as a minor textural extra layered on top of everything else, not a main element.

### Building the sample (full signal-chain walkthrough)
- **Chord layer processing: EQ cutting both low end and high end, then a reverb ("ambient tiled room" preset).** Subtractive EQ to carve space, room-type reverb for glue/space — no numeric settings given (auto-caption transcript, qualitative only). → [[EQ Eight|EQ]], [[Reverb]], [[BED Slot]]
- **Percussion layer:** light reverb only, deliberately "nothing heavy at all" — kept drier than the melodic layers so it stays a rhythmic anchor rather than washing into the same space.
- **Vocal layer processing: a Cassette-style tape saturation with a "chorusy" preset (stack control turned off) + an EQ pass cutting low end**, plus a Shaper-type device on the "half" filter preset on both panned vocal instances — the same Shaper "Half" filter-preset move already logged elsewhere from this channel on Augmented Voices real-choir content (see [[Shaper]]). → [[Cassette]], [[Shaper]], [[EQ Eight|EQ]]
- **Outside instrument #1 — bass:** a couple of simple notes from an unnamed source, purely for low-end texture/fill, not a full bassline. → [[BASS Slot]]
- **Outside instrument #2 — synth pad:** "Scarborough" by Teletone Audio (a plugin loner says he'd "just bought" — described as having "really cool synth sounds"), playing the same chord on the root note, run through a Fruity Delay (heavy delay send), drowned in reverb, and finished with a **half-time** device to sit further back/less present in the mix. Not owned — see wishlist. → [[Delay]], [[Reverb]], [[Sound Selection Guide]]
- **Outside layer #3 — percussion loop:** a loop pulled from "Only Ones" — Balenciaga Volume 8 sample pack, chopped up so it doesn't hit constantly (rhythmic variation rather than a straight loop), run through a bandpass EQ filter to sit inside the mix rather than fight the guitar percussion, plus a tremolo/auto-pan device (named "Good Hertz" tremolo control in the transcript — likely **GoodHertz Tremolo Control**) set to a slow auto-pan so the loop physically pans side to side over time. → [[EQ Eight|EQ]], [[Modulation]], [[Sound Selection Guide]]

### Turning the finished bounce into a sample (loner's standard chop/pitch/half-time pipeline)
- **Bounce the whole arrangement down to a single audio stem first** — everything above collapses to one stem before any of the destructive sample-flip steps below happen; the flip is entirely audio-domain from this point on, not MIDI edits.
- **Trim the tail, then load the stem into a beat-sliced sampler ("Fruity Slicer" set to "beat" mode) so it chops evenly on the grid.** Bouncing into the slicer drops the perceived volume noticeably, so volume and attack both get pushed back up on reload. Owned-equivalent path: [[Simpler]]/[[Sampler]] "Slice to New MIDI Track" (already the documented Ableton-native substitute for Fruity Slicer elsewhere in this vault). → [[Simpler]], [[Sampler]], [[Sampling and Sound Selection]]
- **Half-time the chopped result** (tempo dropped to 70 BPM) **then pitch it down 3 semitones** — "straight away that's giving it a completely different vibe," compared explicitly to a Brent Faiyaz-adjacent character.
- **Reverse a handful of individual chop slices** (not the whole sample) for variation between hits, **then pitch those particular chops down a further 6 semitones** (steeper than the earlier −3, applied selectively rather than globally).
- **Bounce again to audio, then re-stretch the new stem at a different tempo** (132 BPM) — a second bounce-and-restretch pass on top of the half-time/pitch pass, compounding the character change rather than doing it all in one step.
- **Final "bounce" texture move: select a quarter-beat region, run the chop tool with random/arbitrary chop points (not grid-locked), then select-all → snap-mode "none" → zoom in and nudge 2–3 of the resulting pieces slightly out of place, then switch snap to "generic."** This introduces small audible gaps between hits — described as adding "bounce" to the sample, the loner-signature groove-humanizing move on top of an otherwise clean chop grid. → [[Pocket and Microtiming]], [[Rhythm and Groove]]

## Routed to

- [[Sound Selection Guide]] — Fink – Signatures (Guitar section), Teletone Audio "Scarborough" (Synths section), "Only Ones — Balenciaga Volume 8" perc loop pack (Drums section)
- [[Plugin Wishlist]] — Fink – Signatures (Spitfire Audio), Teletone Audio Scarborough, GoodHertz Tremolo Control
- [[Sampling and Sound Selection]] — the chop → half-time → pitch-down → selective reverse/deeper-pitch → re-bounce/re-stretch → random-chop-for-bounce pipeline
- [[EQ]] — subtractive EQ + bandpass-filtered perc loop
- [[Reverb]] — "ambient tiled room" preset, drowning the synth pad in reverb
- [[Modulation]] — chorus widening on the strummed guitar layer, GoodHertz-style tremolo/auto-pan on the perc loop
- [[Cassette]], [[Shaper]] — vocal-layer processing (tape saturation + Shaper "Half" filter preset)
- [[Chord Progressions]] — the color-coded one-note-per-chord workflow

## Source

- **Video:** [i found the best acoustic guitar vst for making samples!? (hidden gem)](https://www.youtube.com/watch?v=bCrmhzATbiM) — loner, 00:08:03, published 2022-04-28
- **Product identification:** auto-captions render the plugin name as "think signatures" and the guitar-model preset name as "brady" — resolved via web lookup to **Fink – Signatures** (Spitfire Audio, £49, released April 2022), built from Fink's own 2004 Mal Brady Bouchier nylon-string, 2010 Martin D28, and 1984 Martin D35 steel-strings.
- **Transcript:** captions, good confidence overall (spoken walkthrough, not sung/played content) — plugin/preset proper nouns ("Fink," "Brady," "Teletone Audio Scarborough," "GoodHertz," "Only Ones — Balenciaga Volume 8") are garbled in the raw captions and reconstructed here from context + one web lookup; flagged inline above where uncertain. Full transcript: [[loner - i found the best acoustic guitar vst for making samples!? (hidden gem) (transcript)]]
