---
type: patch
title: "Operator — Clean FM Sub"
instrument: "Operator"
slot: sub
chains: [Digital Bass Track]
tags: [patch]
depth_linked: true
swept: 2026-07-19
---

# Operator — Clean FM Sub

**Instrument:** [[Operator]] · **Slot:** [[SUB Slot]] · **Used by:** [[1 Digital Bass Track|Digital Bass Track]]

## What it's for
Clean weight under a beat when a full 808 design is more than the part needs — sine sub plus a slight 2nd-harmonic for a bit of presence on small speakers, without turning into a growl or FM bass patch.

## Settings
- Derived from [[Operator#Patch Recipes|Operator — Sine sub]], with a 2nd-harmonic layer added: Osc A sine, level 0 dB
- Osc B: ratio 2 (the 2nd harmonic), level −20 to −14 dB
- Algorithm: **not** B modulating A — additive stack (parallel algorithm, bottom-left) so B adds harmonic content rather than FM-distorting A
- ① 1 voice, no unison — subs stay mono
- Osc A envelope: attack 2–5 ms, decay ~0, sustain 0 dB, release 100–250 ms
- Pitch envelope: off
- ⑨ Glide ~60 ms, legato on, for slides
- Filter/Tone: closed enough to kill aliasing on the 2nd-harmonic layer
- Mono, 1 voice throughout

## In context
- The "clean" option against [[Ramzoid 808 Cooker — Trap 808]] (designed/driven) and [[Simpler — 808 Sample (Choke + Glide)]] (sampled) — pick this when the part wants presence without character.
- Keep dry into the mix bus; the 2nd-harmonic layer is there to survive small speakers, not to be processed further.

## See also
- [[SUB Slot]] · [[Sound Selection Guide]] · [[Operator]] · [[1 Digital Bass Track|Digital Bass Track]]
