---
type: chain
aliases: ["FX Bus"]
title: FX Bus
chain_type: bus
family: fx
source: mixed
routing: "[Drums FX, transitions, ear candy] → FX Bus → Master"
signal_chain: [Pro-Q 4, Glue Compressor, Pro-C 2 (sidechain)]
status: default
tags: [chain, fx, bus]
---

# FX Bus

**Role:** Sums the *sound-effect elements* ([[1 Drums FX Track|Drums FX Track]], risers, impacts, transitions, foley). Distinct from the send returns ([[Reverb Send Room]] etc.), which are shared spaces — this bus is for elements that ARE effects.

## Chain

### 1. [[Pro-Q 4]] — Containment
- HPF 100–200 Hz and LPF ~12 kHz on the sum — FX get the mid window, the spectral edges belong to the music.

### 2. [[Glue Compressor]] — Tame
- **Ratio 4:1** (②) · **Attack 10 ms** (③ — fast-ish, grabs unpredictable spikes) · **Release Auto** (④) · **Threshold for ~2.5 dB GR** (①) · **Makeup** to unity (⑤) · **Dry/Wet 100%** (⑦)
- **Why:** FX elements (delays, risers, one-shots) are unpredictable by nature; a firm 4:1 with a fast attack keeps their collective level civilized so no single throw jumps out of the mix.

### 3. [[Pro-C 2]] — Duck vs lead vocal
- External sidechain from the lead vocal · 1–2 dB
- **Why:** Ear candy should never cost a lyric. Ducking the whole FX lane under the vocal means you can be generous with candy and never mask the money.

## Variations
- **Instrumental/EDM:** re-key the duck from the lead synth instead.
