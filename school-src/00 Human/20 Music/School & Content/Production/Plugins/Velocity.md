---
type: plugin
title: "Velocity"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Velocity

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock MIDI velocity-shaping device — Fixed/Add/Multiply/Compress modes for setting or reshaping incoming note velocity, distinct from the 3rd-party [[Velocity Shaper]] already in the collection.

## What it's used for

Humanizing a repeated/generated part with velocity variance, or (less obviously) using velocity as a *selection* signal — randomized velocity driving which instrument in a rack fires.

## FX chain notes

Sits in a MIDI chain wherever velocity needs setting or randomizing; when used as a selection signal, it sits right before the instrument rack whose chains are distributed by velocity range rather than by chain-selector.

## Techniques

- **Fixed-mode random range for humanized velocity** — set mode to **Fixed**, **Random** to a modest range (e.g. 20–30), and turn up **Output High** so every note passing through gets a random velocity within that band — an easy way to de-robotify a static or arpeggiated line. → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)
- **Fully-randomized Velocity as an instrument-selector, instead of a chain-selector macro** — rather than routing a rack's chain-selector bar to a macro/Random Generator to pick which instrument chain fires, distribute the rack's chains by **Velocity** range instead and put a Velocity device (fully randomized) right before it — every incoming note gets a random velocity, which in turn picks a random instrument from the rack, so a single note can trigger any of 6–8 layered sound sources without touching the chain-selector mechanism at all. → [[Randomized Rack Design]] — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Plugins: [[Velocity Shaper]] (3rd-party alternative, already documented) · [[Arpeggiator]] · [[Random]]
- Techniques: [[Randomized Rack Design]]
