---
type: plugin
title: "Scale"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Scale

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock MIDI effect that snaps incoming notes to a defined scale — reads the global song scale (set top-left in Live) when its own scale-aware toggle is on.

## What it's used for

Force-fitting MIDI input (a keyboard performance, a generated/random pattern) into the song's key so nothing plays outside the scale — the backbone device behind most of the scale-aware sound-design tricks used across this channel.

## FX chain notes

Sits early in a MIDI chain, before chord/arpeggiator/instrument devices, so everything downstream only ever receives in-scale notes.

## Techniques

- **Quantize a Random-transposed Arpeggiator chain back into key, for a generative melody that stays musical** — placed after [[Arpeggiator]] (Rate Mode = Free) → [[Random]] (re-transposes each generated hit), Scale snaps the randomized result back into a chosen scale/set of pitches — the third stage of a three-device generative-melody chain for tonal/harmonic instruments, so the random transposition never lands out of key. → [[Arpeggiator]], [[Random]], [[Melody Writing]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **Reverse-engineer an unknown key by trial-fitting candidate roots against Fold view, then build the diatonic triad ladder for B-section chords** — when a written bass/melody idea's key isn't already known, open the clip in **Fold** view (compresses the piano roll to only the notes actually used, big and readable), then try candidate roots in the Scale device one at a time (starting from the idea's own notes) and check whether every note lights up as in-scale on the left-hand key display — a candidate root that leaves even one note unhighlighted is wrong; the first root where every note fits is the real key. Once the key's confirmed, build a triad on every scale degree (I–vii°) to see the full palette of chords available for a new section — picking a chord type not used in the A section (e.g. a minor ii or iii) for contrast, then resolving back to a chord shared with the A section (the A section's first chord, e.g.) for continuity between sections. → [[Chord]], [[Arrangement and Song Form]] — You Suck at Producing (Underbelly ft. Arbor), [how to turn simple lofi beats into FULL SONGS ft. @prodarbour](https://www.youtube.com/watch?v=VOMJUqx_rm0)
- **Global Scale selector drives every clip in the project, but doesn't auto-update them on a key change** — Live 12's top-of-screen Scale selector sets a root + scale (and mirrors it into every clip's piano roll highlighting) and can be right-clicked to display accidentals as sharps, flats, or both; changing the global scale does NOT retroactively move already-written notes — each individual clip (chords, bass, melody) still needs its own **Fit to Scale** press to snap its notes into the new key, and that has to be repeated per clip, they don't cascade automatically. → [[Chord]] — You Suck at Producing, [UNLOCK Music Theory with New Tools in Ableton Live 12](https://www.youtube.com/watch?v=Br2a6XxMZ5M)
- **Pick a non-standard mode for a genre-specific exotic flavor, rather than defaulting to natural minor** — when starting a track's harmonic identity, flip through Scale's less-common modes (rather than reaching straight for minor) until one reads as distinctly "off" in a good way; used with the tonic set to E for a jungle/rave-inspired dubstep track in the style of G Jones. → [[Operator]], [[EDM Subgenres]] (Dubstep) — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **Fit to Scale cleans up audio-to-MIDI conversion artifacts** — after Ableton's stock **Convert Harmony** turns a found audio sample (e.g. a Splice melodic loop) into a MIDI chord clip, set the song's Scale to the sample's actual key first, then run **Fit to Scale** to transpose away any stray, out-of-key notes the ~80–90%-accurate conversion picked up — a cleanup pass before the extracted progression is usable elsewhere (e.g. imported into [[Chord]]). → [[Chord]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Save a default preset so every new Scale device loads in your song's key** — click the scale-aware button, then right-click → **Save as Default Preset** — from then on, dropping a fresh Scale device onto any track loads it already matching the current project's scale, with no manual re-setup each time. This is the same "custom default preset" mechanism used elsewhere in Live (e.g. setting a randomly-spawned device's default patch). → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Scale + Chord as the foundation of a generative chord rack** — group a Scale device with a [[Chord]] rack (chain-selector of presets) so every generated chord is both a valid preset voicing AND locked to the song's key — the two devices are typically grouped and their macros mapped out together as one combined rack. → [[Chord]], [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Plugins: [[Chord]] · [[Arpeggiator]] · [[Random]] · [[Auto Shift]] (scale-aware pitch correction, the audio-side counterpart)
- Techniques: [[Randomized Rack Design]]
