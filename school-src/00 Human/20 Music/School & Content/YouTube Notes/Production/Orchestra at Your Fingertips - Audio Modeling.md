---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=G8ktSUcvMmo
channel: Anthony Marinelli Music
duration: "00:34:58"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, orchestral, namm]
---

# Orchestra at Your Fingertips - Audio Modeling | NAMM 2024

![](https://www.youtube.com/watch?v=G8ktSUcvMmo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=G8ktSUcvMmo)

## Synopsis

A long NAMM-booth deep dive with Audio Modeling's founder (Stefano) demoing the SWAM physical-modeling engine across flute, trumpet, French horn, and orchestral strings — genuine real-time acoustic synthesis with zero samples. This is the richest gear-demo in the batch: the underlying design philosophy (continuous articulation instead of sample-switching, auto-randomized divisi to avoid phasing, geometric real-time reverb, phrase-driven bowing) is real, reusable production knowledge, not just feature-naming.

## Techniques

- **A physical model reduces an instrument's whole expressive range to often ONE continuous performance parameter, not a bank of samples.** A flute's entire range from a soft tone to a full flutter-tongue is one continuous "air speed" input mapped to a controller (aftertouch, mod wheel, breath); crank it and the same continuous parameter produces flutter-tonguing.
- **Articulations combine live rather than being chosen one-at-a-time.** Bend, harmonics, and tremolo can all be layered onto a single sustained note simultaneously — impossible on a sample library, which has to switch between separately-recorded articulation samples.
- **Sul tasto / sul ponticello (bow position, near the fingerboard vs. near the bridge) is a continuous timbral control**, not a sample switch — moving through the range live changes tone color the way a real player's bow-position choice does.
- **Divisi realism: each new instance of the same instrument auto-randomizes body resonance, room position, and vibrato speed/depth** so multiple copies never phase-cancel or read as one doubled voice — the software actively prevents two instances occupying the same position (it warns on overlap) rather than leaving spatial spread to the user.
- **Real orchestral divisi workflow, applicable to any string library**: split a section across separate tracks by desk (2 players per stand — violin 1 desk A / desk B, etc.), not one monolithic "violins" track; deliberately vary section thickness across a passage (some phrases thin, some thick) for color rather than always running the full section, which is what flattens a lot of pop-produced strings.
- **Reverb here is real-time geometric acoustic calculation, not convolution** — computed fresh from wall/angle/material/mic-distance data every note, so moving a source farther from the mic correctly drops direct volume AND lengthens reverb time together, the way distance actually behaves acoustically (a convolution reverb only adjusts wet/dry ratio).
- **Bowing follows the phrase's dynamics, not a fixed beat interval** — a legato phrase keeps one bow stroke across it; playing harder correlates with faster bow speed and more frequent changes, matching how a real player bows to dynamics rather than a mechanical every-N-beats rule.
- **Con sordino (mute) is mostly a subtle volume/timbre shift, and more apparent on chords/full sections than on a solo note** — worth expecting a smaller effect than the word "mute" implies when choosing a muted articulation for a passage.

## Routed to

- [[Physical Modeling Orchestral Instruments]] — new technique note, the full framework above, registered in [[Techniques Index]].
- [[String Section Arranging]] — cross-linked as the production-side companion to that page's writing-for-strings theory.

## Source

- [Orchestra at Your Fingertips - Audio Modeling | NAMM 2024](https://www.youtube.com/watch?v=G8ktSUcvMmo) — Anthony Marinelli Music, 34:58. Captions, high confidence. Transcript: [[Orchestra at Your Fingertips - Audio Modeling (transcript)]]
