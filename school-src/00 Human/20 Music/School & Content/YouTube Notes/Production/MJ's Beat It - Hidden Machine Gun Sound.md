---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=kdEqP6jb--Y
channel: Anthony Marinelli Music
duration: "00:11:45"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, michael-jackson, arp-2600, sequencing, arrangement]
---

# MJ's "Beat It" - Hidden Machine Gun Sound

![](https://www.youtube.com/watch?v=kdEqP6jb--Y)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=kdEqP6jb--Y)

## Synopsis

A deep patching breakdown of a nearly-hidden 16th-note "machine gun" texture in "Beat It," placed for exactly 4 bars right before Eddie Van Halen's guitar solo — plus a genuinely valuable arrangement-mixing story about engineer Bruce Swedien deliberately muting the sound everywhere else in the song even though it ran the whole way through on tape.

## Techniques

- **Clock-synced sample & hold, via the same tempo-derived gate driving the envelope generators — the core, most reusable trick in this video.** A Dr. Click clock unit derives a 16th-note gate pulse from the track's own tempo. That single gate is MULTED (split) two ways: (1) into two ADSR envelope generators' trigger inputs, firing them in time with the track; (2) into the sample & hold generator's EXTERNAL clock input (not its own free-running internal clock) — so the random voltages it outputs update exactly on the beat instead of drifting independently of the track. This is the difference between "random modulation that happens to be near the tempo" and modulation that's genuinely locked to it.
- **Sample pink noise, not white noise, for the random source** — pink noise has a narrower/more weighted frequency range than white noise, so the resulting random voltages read as more musically "in range" rather than fully chaotic.
- **Two oscillators for the base tone**: a thin pulse wave (duty cycle well under 50%) with slow/medium-rate sine-LFO pulse-width modulation, plus a sawtooth an octave up with no modulation — combined in unison for a gritty "grind."
- **Dual simultaneous filter modulation sources**: the clock-synced sample & hold feeds the filter for random brightness "bubbling," AND the same tempo-locked ADSR envelope feeds the filter for a rhythmic pulse — both modulating cutoff at once, one random-in-time and one rhythmic-in-time, is what gives the filter movement its "alive" character rather than a single predictable sweep.
- **VCA gated fully closed at rest, opened only by the tempo-synced ADSR**: initial VCA gain is zero, so nothing passes except when the envelope fires — this is what turns a continuously-open filtered tone into a staccato, rhythmically gated "machine gun" pattern rather than a sustained drone.
- **A simple concept, described honestly as simple despite the patch complexity**: at its core this is "a one-note sequencer moving in 16th notes that gets brighter randomly" — the elaborate patching is just the vintage-synth route to that one idea; a modern synced VST LFO/S&H module gets there far more easily.

## What's taught (mixing/arrangement)

- **Deliberately clear space for a texture rather than leaving it in the whole mix, even when it exists on tape the whole time.** The machine-gun part ran through much of the track on the recorded stems, but engineer Bruce Swedien only brought it up for the 4 bars right before the guitar solo (right after the "screwdriver hitting a drum case" snare lick section settles into one held chord) and muted it everywhere else — creating a moment of clear, audible tension right before Eddie Van Halen's solo, then getting fully out of the way so the solo has no 16th-note clutter competing with it.
- **A physical "mix score"**: Swedien reportedly tracked a live mix visually on staff paper laid on a plexiglass stand — not musical notes, but a written map of which tracks/sounds come in and out where — functioning as a literal orchestration chart for a mix rather than relying purely on memory or automation.
- **General takeaway for arrangement**: the "difference maker" in a dense multi-layered production isn't stacking every sound throughout — it's finding the specific moment a texture can stand out clearly, then pulling it back out to make room for the next thing, letting the song breathe.

## Routed to

- [[LFOs and Modulation]] — new bullet: clock-synced sample & hold (external clock input, not free-running) as the mechanism for tempo-locked random filter movement.
- [[Filters and Resonance]] — cross-referenced: dual simultaneous modulation sources (random + rhythmic) on one filter.
- [[Arrangement and Song Form]] — new bullet: deliberately clearing/muting a texture to a narrow window rather than leaving it in throughout, plus the physical mix-score anecdote.

## Source

- [MJ's "Beat It" - Hidden Machine Gun Sound](https://www.youtube.com/watch?v=kdEqP6jb--Y) — Anthony Marinelli Music, 11:45. Captions, high confidence.
