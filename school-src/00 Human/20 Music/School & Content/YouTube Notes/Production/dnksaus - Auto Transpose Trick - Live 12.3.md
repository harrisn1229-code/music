---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=aUvQ8Bvv3lY
channel: dnksaus
duration: "00:08:07"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, sampling, splice, randomization, granular]
briefed: 2026-W31
---

# dnksaus - Auto Transpose Trick - Live 12.3

![](https://www.youtube.com/watch?v=aUvQ8Bvv3lY)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=aUvQ8Bvv3lY)

## Synopsis

Despite the title, this isn't about a dedicated "auto transpose" MIDI device — it's a Live 12.3-beta Splice-browser trick (clicking a loop's Key field auto-transposes the whole filtered batch to the song's key) used as the seed for a full loop-collage workflow. dnksaus filters Splice for melodic loops in a target mode, key-matches them all in one click, then uses Session View's Follow Action (Any + Unlinked + Legato) to randomly shuffle between them into an ADHD-style collage, smooths the hard cuts with a crossfade, and layers in a basic drum pattern. The back half turns the bounced collage into raw material for further sound design: a Granulator 3 in Cloud mode ties the loops into one atmospheric blanket, an Auto Filter with a phase-offset LFO widens it, a Binary-LFO volume macro adds a "sometimes mute" effect, and — for a second, texture-focused pass — the whole thing gets consolidated and sliced to a new MIDI track with warp timing preservation off for playable pseudo-granular chunks.

## Techniques

- **Splice Key-field auto-transpose** — filter the Splice tab for loops in a mode (e.g. minor), then click any result's **Key** field and pick the song's key — every loop in the filtered list transposes to match immediately, so a curated batch can be dragged in already in-key. → (new) [[Splice Sounds]]
- **Follow Action loop-collage recipe** — select a pile of dragged-in loops, Shift+Tab to the Launch section, turn on Follow Action set to **Any** (random next clip), **Unlinked** with a short length (quarter note for fast switching), and **Legato** (keeps play position across switches instead of restarting) — a hands-off way to generate an ever-shifting collage from curated loops. → [[Randomized Rack Design]]
- **Crossfade + Echo Ducking to smooth the collage** — Command+Option+F crossfades the hard cuts between switched clips; an Echo with its built-in **Ducking** turned on keeps the dry loop audible on top of the wet echo trail rather than burying it.
- **Granulator 3 Cloud mode as a collage "atmospheric blanket"** — bouncing the full loop collage into a Granulator 3 in Cloud mode with Variation turned up (position/grain-size/transposition variance) ties the disparate loops into one cohesive chorused texture. → [[Granulator 3]]
- **Auto Filter with a per-ear phase-offset LFO** — widen a mono texture by running Auto Filter's LFO with a slight phase offset between right and left, so the cutoff drifts slightly differently per ear. → (new) [[Auto Filter]]
- **Slice to new MIDI track with preserve-warp-timing off** — consolidating the collage and slicing it to a MIDI track with that option off (rather than a plain Simpler slice) frees each slice's start point/length for reshaping — pseudo-granular playable chunks from a linear recording. → [[Simpler]]

## Routed to

- [[Splice Sounds]] — new `## Techniques` section: the Key-field batch auto-transpose trick
- [[Auto Filter]] — new plugin note (gap-fill; Ableton stock device, no prior note); seeded with the per-ear phase-offset LFO technique (extended further in a later video this batch)
- [[Simpler]] — new `## Techniques` section: slice-to-MIDI with preserve-warp-timing off for pseudo-granular chunks
- [[Sampling and Sound Selection]] — new `## From videos` bullet at the top: the full Splice-collage → Follow-Action shuffle → granulate recipe
- [[Randomized Rack Design]] — cross-linked (Follow-Action mechanism already documented from the previous video this batch; no duplicate bullet added)
- [[Granulator 3]] — no new bullet needed (Cloud-mode Variation/chorus behavior already fully documented from the previous video; this video's contribution is the *usage context*, captured on [[Sampling and Sound Selection]] instead)
- [[Echo]] — no edit (Ducking-for-dry-signal-priority restates the already-documented feature; not re-added to avoid duplication)

## Source

[Auto Transpose Trick - Live 12.3](https://www.youtube.com/watch?v=aUvQ8Bvv3lY) · dnksaus · 8:07 · captions (high confidence) · transcript: [[dnksaus - Auto Transpose Trick - Live 12.3 (transcript)]]
