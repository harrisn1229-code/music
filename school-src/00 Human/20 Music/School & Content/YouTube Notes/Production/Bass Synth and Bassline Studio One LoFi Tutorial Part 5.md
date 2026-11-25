---
type: yt-note
date: 2026-08-05
source: youtube
url: https://www.youtube.com/watch?v=afoe7aIzXLg
channel: Max Konyi
duration: "00:08:45"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, lofi, series, studio-one, bass, synthesis, bassline]
briefed: backlog
---

# Bass Synth and Bassline | Studio One LoFi Tutorial | Part 5

![](https://www.youtube.com/watch?v=afoe7aIzXLg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=afoe7aIzXLg)

## Synopsis

Part 5 of the [[Make a Chill LoFi Beat in Studio One Part 1|lo-fi build-along series]] — designs a simple mono synth bass from a saw wave and writes the bassline against the [[Piano Chord Progression Studio One LoFi Tutorial Part 2|chord progression]]. Two halves: a compact, "model it after a real instrument" synthesis approach (filtered saw, shaped amp/filter envelopes, mono/choke behavior), and a plain-language method for writing a root-and-passing-tone bassline by ear over a two-chord loop. Both halves are directly reusable regardless of DAW or synth.

## Techniques

- **Saw wave, heavily low-pass filtered, as the harmonically-rich-but-tamed bass source** — start from a saw (harmonically dense) then pull the filter cutoff down; the *starting* cutoff position is chosen by deciding how dark the sound should get at its darkest point (since the filter is about to be modulated upward from there — see below).
- **Amp envelope modeled after a real bass, not a generic pad shape** — release raised to ~150 ms so notes don't click on release and instead have a smooth roll-off; sustain dropped to zero and decay stretched to ~8 seconds with a **steep exponential decay curve**, so the note is entirely in its decay tail rather than sustaining — "sounds more like a real instrument, it decays over time and it decays in this curve." Explicit design principle: *think about what the best elements of a real instrument are, and build those into the synth patch* for a greater sense of realism and movement. → [[Bass Design]]
- **Filter-envelope "pluck" that decays into the sustained tone** — route envelope 2 to filter cutoff (disable the default mod-wheel-to-filter routing first), set the envelope's peak amount to roughly halfway (not maxed) so the cutoff swing is moderate, and set its decay to ~1 second — the filter opens on the attack and closes back down over that second, mimicking a real bass's brighter attack that darkens as the string's overtones die out ("more high frequencies at the start and they decay over time... the damping of the strings"). → [[Bass Design]], [[1 Digital Bass Track|Digital Bass Track]]
- **Mono mode with note-priority retriggering, treated as a de facto choke group.** Setting the synth to mono (not poly) means an overlapping new note cuts the previous one instead of layering — Max explicitly compares this to the choke groups used on the [[Drums Studio One LoFi Tutorial Part 3|kick drum in Part 3]]: same underlying mechanic (one voice, new trigger kills the old one), applied to a monophonic bass instead of a drum choke group.
- **Root-note-on-the-downbeat bassline method, independent of the exact chord voicing above it.** Simplify the harmony down to "what key am I in, and what's the root of the chord that's currently sounding" — play the scale degree matching the current chord's root exactly when the chord changes, regardless of whether the chord above is played as a triad, a sus2, a 9th, or anything else; everything *between* downbeats is free decoration. Explicitly framed as a starting-point rule meant to be broken once it's internalized. → [[Bassline Writing]]
- **A concrete "root → fifth → root → third, walking" line as one way to fill the space between downbeats** — over the I chord: hit the root, walk up to the fifth (an octave-relative move), leap down to the chord's third, which conveniently sits one note below the next chord's root, walking naturally into the IV chord's root. Over the IV chord: alternate between the target note and the adjacent note a half-step below/above it and back — "hit the target note, then flip down to an adjacent note, then flip back" — described as a very common, simple bass move. → [[Bassline Writing]]
- **Loop-length variation technique: keep the first half identical, change only the tail.** On the second pass through a duplicated 1-bar-ish bass loop, keep the first phrase's notes the same but replace the ending with a new walk-up figure (target note → adjacent step up → next step → resolve) that hasn't been heard yet, specifically to mark that this is the *second* time through and add motion before the loop restarts — the same "signal the loop boundary with something new" idea as [[Drums Studio One LoFi Tutorial Part 3|Part 3]]'s end-of-loop drum fill.

## Routed to

- [[1 Digital Bass Track|Digital Bass Track]] — mono filtered-saw patch + filter-envelope "pluck-into-decay" technique woven into Sound Selection
- [[Bass Design]] — real-instrument-modeled envelope shaping (amp release/decay curve + filter-envelope decay) added to From videos
- [[Bassline Writing]] — root-on-downbeat + root-fifth-root-third walking-line method added to From videos

## Source

[Bass Synth and Bassline | Studio One LoFi Tutorial | Part 5](https://www.youtube.com/watch?v=afoe7aIzXLg) · Max Konyi · 8:45 · captions (high confidence — clean, single-speaker tutorial narration) · transcript: [[Bass Synth and Bassline Studio One LoFi Tutorial Part 5 (transcript)]]

**Series note:** [[Drums Studio One LoFi Tutorial Part 3|← Part 3]] (Part 4 — bass mixing — wasn't in this queue) · [[Retro Lead Synth Studio One LoFi Tutorial Part 7|Part 7 →]] (Part 6 — vocal chop/texture layer — wasn't in this queue). The synth used (Studio One's Mai Tai) is skipped in favor of the patch-design behavior, which maps directly onto Operator, Analog, or Wavetable in Ableton.
