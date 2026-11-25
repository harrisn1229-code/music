---
type: plugin
title: "Roar"
category: Drive/Color
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Roar

**Category:** Drive/Color
**Vendor:** Ableton

## What it is

Ableton's Live 12 stock multi-stage saturation/distortion device — the first audio effect (alongside the instruments [[Wavetable]] and [[Meld]]) to get its own expanded device view. Two saturation stages can be routed serially, in parallel, multiband, or mid/side, plus a self-contained feedback mode, with three LFOs, an envelope follower, and a Shaper section feeding its own modulation matrix.

## What it's used for

Multi-stage drive/distortion duty on anything from a single track to a whole bus — dnksaus frames it as "a bus of buses," the same relationship a drum bus has to a further drum bus, i.e. a saturation stage meant to sit at a summing point, not just on one source.

## FX chain notes

Works as a track-level saturator/distortion or as a bus-level glue/color stage; the routing choice (single/serial/parallel/multiband/mid-side/feedback) should match the role — parallel or multiband for a gentler bus-glue use, feedback mode for a self-oscillating sound-design texture.

## Techniques

- **Mid/side saturation recipe: saturate the mid image's lows for a more centered low end, saturate the side image's highs for expanded stereo highs.** Route Roar's **mid/side** mode so its two saturation stages land one on each image, then pick a saturation flavor per stage that emphasizes the target range (low-emphasis on mid, high-emphasis on side) — the setup plus the harmonics generated becomes a stereo-imaging move, not just coloration. This is the exact native-plugin equivalent of a technique the source video demoed via manual duplicate-channel M/S routing with an unowned saturator (PSP Saturator) — Roar's mid/side mode does it in one instance. → [[Saturation and Distortion]], [[Width and Stereo]], [[Stereo Tool]] — Sage Audio, [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM)
- **Six routing modes, matched to the role** — a single stage, two stages in serial, two stages in parallel simultaneously, **multiband** (split processing by frequency), **mid/side** (independent center vs. side processing), and a **feedback** mode driven by its own Feedback section. Parallel routing works well for adding density without losing the dry signal's dynamics. → [[Multiband Compression]], [[Stereo Field]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Feedback mode: time/sync or resonate-to-a-note, tone-tamed** — the feedback section can run in time-based or tempo-synced modes, or lock the feedback to **resonate at a specific note** (e.g. F) for a tonal rather than noisy result; turning **Tone** down tames the resonance so it doesn't get harsh. Layer a noisy source into the feedback loop, then shape it further with Threshold, Release, and Frequency. — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **New Shapers, a Comb filter, and a Noise modulation source** — Roar ships its own set of waveshaping Shapers distinct from the stock [[Shaper]] device, includes filter types not seen elsewhere in Ableton's stock devices (a Comb filter among them), and has a **Noise** modulation source that injects randomness into any mapped parameter (e.g. mapped to a second stage's blend amount) — plus a "Fractal" shape described as a "goopy" character, good high-passed. → [[Shaper]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Three LFOs + an envelope follower feed its own modulation matrix** — same self-contained modulation approach as [[Meld]]/[[Wavetable]]'s expanded views: map the built-in envelope follower or any of the three LFOs to Drive, blend amount, or any other Roar parameter without needing an external [[LFO]]/[[Envelope Follower]] device. — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Think of it as "a bus of buses"** — reach for Roar at a summing point (a group or bus) the same way a drum bus feeds a further drum bus, rather than reserving it for single-track coloring only. → [[Compression Staging]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)

## See also

- Plugins: [[Saturator]] · [[Decapitator]] · [[Saturn 2]] · [[Shaper]] · [[Meld]] · [[Wavetable]]
- Effects: [[Saturation and Distortion]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Stereo Field]]
- Palette: [[Sound Palette]]
