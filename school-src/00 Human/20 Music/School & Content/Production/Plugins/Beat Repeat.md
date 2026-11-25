---
type: plugin
title: "Beat Repeat"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Beat Repeat

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock stutter/glitch device — captures a slice of the incoming audio and repeats ("stutters") it on a set grid, with control over when the stutter starts, how often and how many times it fires, the subdivision it repeats at, and an optional pitch decay across the repeats.

## What it's used for

Rhythmic stutter/glitch texture on loops, drums, or resampled ambient beds — a fast way to add mechanical repetition/glitch character without hand-editing audio.

## FX chain notes

Typically placed mid-chain on a texture/glitch signal path (e.g. between a delay stage and a looper feeding back into itself), or as a **send/insert toggle** via its Insert mode when the stutter needs to sit less aggressively in the mix.

## Techniques

- **Gate, Grid, Variation, and Chance together shape how mechanical the stutter reads** — **Gate** sets how many times the captured slice repeats; **Grid** sets the length of each repeated slice; **Variation** randomizes the Grid size within a range on every trigger for a less locked-in stutter; **Chance** is a probability knob for whether a repeat fires at all — flagged as unreliable in practice, so manual control is generally the better call. → [[Rhythm and Groove]] — You Suck at Producing, [Beat Repeat](https://www.youtube.com/watch?v=16dka0dY1HU)
- **Manual Repeat/Stop beats the Chance knob for deliberate placement** — pressing the device's own **Repeat** button starts a stutter on demand and **Stop** ends it exactly where wanted, instead of leaving timing to chance; map **Grid** to a MIDI knob for real-time stutter-length changes while performing. — You Suck at Producing, [Beat Repeat](https://www.youtube.com/watch?v=16dka0dY1HU)
- **Insta vs. off changes whether the dry signal survives a repeat** — with **Insta** (Instead) engaged, only the repeated/stuttered signal is audible while a repeat is active; with it off, the repeat blends with the still-playing dry signal. The all-or-nothing **Gate mode** (drums-only during repeats) is "pretty extreme" — reach for Insta first. — You Suck at Producing, [Beat Repeat](https://www.youtube.com/watch?v=16dka0dY1HU)
- **Map Pitch Decay and Volume Decay for a stutter that fades, not just repeats** — Pitch Decay drops each successive repeat's pitch across the run (a glitch-slowdown feel); Volume Decay quietens each repeat instead of holding a fixed level — either mapped turns a flat mechanical repeat into a shaped one. — You Suck at Producing, [Beat Repeat](https://www.youtube.com/watch?v=16dka0dY1HU)
- **Mix / Insert / Gate output modes control how repeats relate to the source signal** — **Mix** blends the repeats with the incoming signal, **Insert** mutes the incoming signal while repeats are playing, and **Gate** plays the repeats only (nothing from the source at all) — pick by how disruptive the stutter should read against the original material. Prefers a **low Variation** setting alongside Beat Repeat's built-in pitch element, tuned against whatever delay device it's chained after; a good workflow is to resample while turning up Variation and automating Gate live. → [[Delay]] — dnksaus, [Ableton Delay Sound Design](https://www.youtube.com/watch?v=DCIEayyv1bk)
- **Stutter placement and density** — vary **where in the loop the stutter starts**, **how often it stutters**, and **how many repeats it fires** per trigger — these three controls together shape whether Beat Repeat reads as a subtle texture or a full glitch breakdown.
- **Vary the subdivision for a less mechanical stutter** — instead of one fixed grid, let the repeat subdivision vary (12ths, 24ths, 8ths, quarters — skip triplets if they're not wanted) so the stutter doesn't lock to one obvious rhythmic grid every time.
- **Subtle pitch decay for texture** — a small amount of pitch decay across the repeated slice adds a falling-pitch character that reads as an intentional textural layer rather than a glitch artifact.
- **Insert mode for a gentler stutter** — when the stutter is too disruptive to the flow of a loop/ambient chain, switch Beat Repeat to **Insert mode** so it sits in the signal path less aggressively than its default gating behavior.
- **Mid-chain glitch stage on a resample path** — placed between a glitch [[Echo]] stage and a final [[Looper]] (feeding back into its own loop), Beat Repeat adds a second layer of rhythmic chop on top of Echo's random-slicer texture before the result gets resampled. → [[Looper]], [[Randomized Rack Design]]

## See also

- Effects: [[Delay]] · [[Modulation]]
- Techniques: [[Randomized Rack Design]] · [[Ambient Texture and Field Recording]] · [[Live Performance Setup]] (Grid + Pitch Decay macro-mapped and ridden live mid-loop)
- Palette: [[TEXTURE Slot]] · [[TRANSIENT Slot]] · [[Sound Palette]]
