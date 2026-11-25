---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=PFmBcZujMwk
channel: dnksaus
duration: "00:04:02"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: low-medium — heavy background music over a fast, dense narration badly garbles several device/parameter names (auto-captions render whole clauses as filler); the overall workflow shape (protect sub → shape oscillator/filter → FM algorithm exploration → resample-and-refine loop) is clear even where exact wording isn't
tags: [yt-note, music, production, ableton, dubstep, bass, sound-design, operator]
briefed: 2026-W31
---

# dnksaus - Make HEAVY Dubstep Basses with Operator

![](https://www.youtube.com/watch?v=PFmBcZujMwk)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=PFmBcZujMwk)

## Synopsis

A short, fast-paced companion piece to the much longer [[dnksaus - Operator in Depth (Dubstep Sound Design)]] from batch 5 — same instrument, same genre lane, but framed as a quick condensed workflow rather than a deep-dive. Most of what's demonstrated here is already documented in depth on [[Operator]]'s "FM bass growl" [[BASS Slot]] Patch Recipe (fully-serial algorithm, low-integer Coarse ratio for growl, filter distortion circuits, protecting the sub in [[Multiband Dynamics]] ahead of [[OTT]]) and on the [[EDM Subgenres]] Dubstep card, so this note only pulls out what's genuinely new: doing the sub-protection multiband pass **first**, before any further sound design, rather than only right before OTT at the end; a **velocity-tracked filter envelope** (a different modulation source from the previously-documented key-tracked Center Frequency); and the explicit closing statement that the whole workflow — draw harmonics, distort in the filter, try each FM algorithm, filter again, resample, repeat — applies just as well on [[Wavetable]], Vital, or Serum, not just Operator.

## Techniques

- **Protect the sub with Multiband Dynamics as step one, not just before OTT** — rather than only reaching for [[Multiband Dynamics]] (low band bypassed/reduced) right before an [[OTT]] pass at the end of a patch, this pass applies that same sub-protecting multiband setting immediately, right after picking the bass note, so the sub-bass fundamental stays clean through every subsequent distortion/filtering stage on the way to the limiter — a "protect it from the start," not "protect it right before the risky step," framing of the existing dubstep-bass caution. → [[Multiband Dynamics]], [[OTT]], [[EDM Subgenres]] (Dubstep)
- **Velocity-tracked filter envelope amount, distinct from key-tracked Center Frequency** — set Operator's filter envelope's velocity-sensitivity control high so how hard a note is played directly changes how much the filter envelope moves the cutoff — a different modulation axis from the already-documented **Center Frequency** knob (which key-tracks cutoff to the played note's pitch, not its velocity). Useful for a bass patch that should snarl harder on accented notes without any external dynamics processing. → [[Operator]]
- **Draw harmonics + explore every FM algorithm + swap oscillator waveforms as an empirical distortion loop** — reinforces the already-documented drawn-harmonics and Algorithm-selector techniques on [[Operator]], framed here as a fast iterative loop rather than a deliberate build: draw a rough harmonic shape, audition several of the 11 algorithms (all "feed into each other top-down" in a serial FM chain) since they all sound meaningfully different, and try swapping the oscillator waveform (e.g. to a saw) for further character — pick by ear across a handful of quick tries rather than reasoning it out in advance. → [[Operator]]
- **The resample-and-refine loop, generalized across FM/wavetable synths** — once the patch has some FM/filter character, map **Scale** to a macro, add an [[Auto Filter]] in band-pass mode and map that too, then resample onto an audio track while continuing to modulate (adding tone/texture layers, modulating transposition), and **Consolidate** the result — repeating the whole cycle until the sound lands. Explicitly stated to work the same way on [[Wavetable]], Vital, or Serum, not just Operator — the loop is a synth-agnostic sound-design habit, not an Operator-specific trick. → [[Auto Filter]], [[Wavetable]], [[Randomized Rack Design]]

## Routed to

- [[Operator]] — new `## Techniques` bullet: velocity-tracked filter envelope amount (distinct modulation axis from the existing key-tracked Center Frequency bullet)
- [[Auto Filter]] — new `## Techniques` bullet: band-pass mode macro-mapped mid-sound-design as part of the resample-and-refine loop
- [[EDM Subgenres]] — Dubstep card: light addendum noting the sub-protection-first ordering and the velocity-tracked filter envelope alongside the existing Key techniques list
- [[Multiband Dynamics]], [[OTT]] — cross-linked from the "protect first" reframing (no direct edit — the mechanism itself is unchanged, only the ordering emphasis is new, already covered by the existing bullets' wording)

## Source

[Make HEAVY Dubstep Basses with Operator](https://www.youtube.com/watch?v=PFmBcZujMwk) · dnksaus · 4:02 · captions (low-medium confidence — dense narration over loud music bed) · transcript: [[dnksaus - Make HEAVY Dubstep Basses with Operator (transcript)]]
