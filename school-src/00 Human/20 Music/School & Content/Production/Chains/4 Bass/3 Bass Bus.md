---
type: chain
aliases: ["Bass Bus"]
title: Bass Bus
chain_type: bus
family: bass
source: mixed
routing: Bass Group → Bass Bus → Master
signal_chain: [Ghz Tupe 3, Glue Compressor, Utility]
status: default
tags: [chain, bass, bus]
---

# Bass Bus

**Role:** Final pass on the low-end lane. Light — most bass work already happened at track/group.

## Chain

### 1. [[Ghz Tupe 3]] — Warmth
- **Tube 15%** (① — very low drive) · **Tilt neutral** (②) · **Mix 100%** (④) · **Output** matched (⑤)
- **Why:** one more coat of harmonics helps the whole low end translate; the bus is the right place because it catches whichever bass source is active.

### 2. [[Glue Compressor]] — Glue
- **Ratio 2:1** (②) · **Attack 30 ms** (③ — lets the note attack/pluck through before clamping) · **Release 0.2 s** (④ — or Auto) · **Threshold for ~1.5 dB GR** (①) · **Range 6 dB** (⑥) · **Makeup** to unity (⑤) · **Dry/Wet 100%** (⑦)
- **Why:** Gentle 2:1 with a slow attack fuses whichever bass source is active without squashing the sub or dulling the transient — the bus glues, it doesn't level.

### 3. [[Utility]] — Mono guarantee
- Bass Mono ~100 Hz — the final insurance under everything (harmless if the tracks already did it).
- 🎬 *From video:* when a synth bass has lots of built-in chorus/sides, a touch of **[[OTT]]** before this (upward, "a push not a squash") **tightens the mono low end** so the [[SUB Slot]] reads punchy — Disclosure, [Deeper](https://youtu.be/SM0FZ58ckVw).

## Variations
- **If the bass lane feels over-compressed:** bypass Glue here — three comps (track, group, bus) can be one too many; the track comp is the load-bearing one.

## From videos
General tips pulled from production breakdowns (via `/music-enrich`), newest-first.

- **[[OTT]] to tighten a wide bass's mono center** — upward, subtle, so the sub reads punchy under all the chorus/sides — Disclosure, [Deeper](https://youtu.be/SM0FZ58ckVw)
- **Most bass moves are track-level** (double-sidechain, bass-amp fizz, octave-up for phones, sample-one-note) — see [[1 Digital Bass Track|Digital Bass Track]] / [[1 Electric Bass DI Track|Electric Bass DI Track]] for those; the bus stays light — Disclosure, various
