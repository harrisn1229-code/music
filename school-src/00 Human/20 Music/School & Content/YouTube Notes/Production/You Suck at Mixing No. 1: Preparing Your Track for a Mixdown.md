---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=YP1dSPX8doc
channel: You Suck at Producing
duration: "00:09:19"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: captions
transcript_confidence: high — clean captions, single continuous demo
tags: [yt-note, music, production, gain-staging, mixing, workflow, bounce]
---

# You Suck at Mixing No. 1: Preparing Your Track for a Mixdown

![](https://www.youtube.com/watch?v=YP1dSPX8doc)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=YP1dSPX8doc)

## Synopsis
Opens the "You Suck at Mixing" series with the prep pass that happens before any actual mixing: committing to the arrangement by bouncing every MIDI track to audio. Covers which effects survive the bounce and which get stripped, how to split a drum rack into individually-bounced hits, the export settings that matter (render length, Normalize, dither, mono conversion), and the track-organizing scheme (color-coded by group, ordered by when elements occur) that sets up the relative-volumes pass in the next video.

## Techniques
- **Mixing can't save a bad song — commit to the composition and arrangement first** — before starting a mixdown, be fully happy with the creative decisions; the mixdown process is essentially "committing" to the track as-is, so any doubts about the song itself should get resolved (or crowd-sourced for feedback) before this stage. → [[Committing and Printing]]
- **Bounce every MIDI track to audio before mixing** — this forces commitment (no more endless MIDI tweaking), and audio tracks are both easier on CPU and cleaner to work with in the mixdown than live MIDI/instrument chains.
- **Strip effects that aren't essential — but keep the ones that ARE the sound** — before bouncing, go through every track and turn off audio effects that aren't dialed in yet or aren't integral (an EQ/reverb still being tuned, a sidechain compressor you plan to rebuild in the mixdown). But leave on anything that actually defines the sound's character — pulling a distortion off a congas part left it sounding like "a flimsy shell of itself," so that one stayed baked into the bounce. Also strip unnecessary automation and any tracks you're not using. → [[Committing and Printing]]
- **Extract chains from a drum rack before bouncing, so each hit gets its own stem** — exporting a drum rack as one track bakes every hit together into a single audio file with no way to separate them afterward. Right-click a drum sound inside the rack and hit Extract Chains: it becomes its own track with its own MIDI, its own drum rack, and any audio effects that were on that specific hit. Label each resulting track clearly.
- **Export settings that matter for a mixdown bounce** — select individual tracks (note: exporting a selected group bounces both a combined group file AND each track individually — redundant but sometimes useful); extend the render length a bit past the end of the track to catch reverb/delay tails; leave Normalize ON even though it maximizes each stem's level and destroys the relative volumes you'd set — see why below; leave dither OFF (that's a master-track-only step); convert tracks to mono where it makes sense.
- **Normalize on export is deliberate, not a mistake** — normalizing turns every stem up to be as loud as possible without clipping, which wrecks whatever relative-volume balance existed in the writing phase. That's the point: redoing the relative volumes a second time (in the next video) produces a better result than the first pass, and it forces you to reckon with any elements that were buried or hidden in the original mix — they'll come back in loud and force a real decision about whether they're needed at all. → [[Gain Staging]]
- **Organize the fresh mixdown project before touching a single fader** — drag every bounced file into a new empty Live set, holding Cmd/Ctrl so each one lands on its own track. Color-code tracks by instrument group (all snares one color, all hi-hats another, etc.), and within each group order the elements top-to-bottom by when they occur in the track — a "downward staircase" layout. This groundwork is what makes the relative-volumes pass fast and organized.

## Routed to
- [[Gain Staging]] — added the pre-bounce prep pass (selective effect stripping, drum-rack chain extraction, export settings, and the track-organizing scheme that sets up the relative-volumes pass)

## Source
[You Suck at Mixing No. 1: Preparing Your Track for a Mixdown](https://www.youtube.com/watch?v=YP1dSPX8doc) · You Suck at Producing · 00:09:19 · captions (high) · transcript: [[You Suck at Mixing No. 1: Preparing Your Track for a Mixdown (transcript)]]
