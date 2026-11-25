---
type: reference
title: Stereo Field
tags: [production, mixing, panning, stereo, mono, reference]
---

# Stereo Field — Panning, Width & the Mono-First Workflow

[[Sound Palette]] is the **vertical** axis (frequency); this page is the **horizontal** (pan/width) and **depth** (front/back) axes. Layout and routing live on [[Session Layout]]. House workflow: **mix in mono first** — levels and phase get decided in mono; stereo is a *reveal*, not a crutch.

## The mono-first workflow

1. **Utility → Mono on the master** (or [[Stereo Tool]] for a correlation meter) from the first level balance.
2. In mono, set **all levels** and fix **all masking** ([[Masking and Carving]]) — if the mix reads in mono, panning makes it better; if it doesn't, panning is hiding a problem.
3. **Phase pass in mono:** anything doubled, layered, parallel-processed, or multi-mic'd gets checked here (below).
4. Flip to stereo → **pan per the slot map** → width moves last, and every width move gets re-checked against the mono fold.
5. The test forever after: **A/B mono constantly**. Elements that vanish in mono = phase problem, not a level problem.

## Pan map (by [[Sound Palette]] slot)

| Slot | Pan/width rule |
|---|---|
| [[SUB Slot]] / [[BASS Slot]] | **Dead center, mono.** No exceptions below ~120 Hz. |
| Kick + snare ([[TRANSIENT Slot]]) | Center. Hats/percussion spread 20–50%, mirrored. |
| [[LEAD Slot]] (vocal/hook) | Center. Its doubles/harmonies pan out (30–70%), never the lead itself. |
| [[BED Slot]] | The widest thing in the mix — sides-heavy, soft center (double-track L/R or M/S shelf on sides). |
| [[MIDS Slot]] | 30–60% off-center, **opposing pairs** (keys 40L ↔ gtr 40R) so the center stays clear for the vocal. |
| [[AIR Slot]] | Wide but additive; shimmer/air can be 100% sides. |
| [[TEXTURE Slot]] | Anywhere — mono texture off to one side reads "real"; wide texture eats the bed's contrast. |

- **LCR bias:** when unsure, hard-left / center / hard-right beats timid 15% pans — commitment reads as intent.
- Arrangement first: two parts fighting for one pan position is the stereo version of a slot collision — move one.

## Width tools (what survives mono, what doesn't)

| Method | Mono fold | Notes |
|---|---|---|
| Double-track panned L/R | ✅ survives | The gold standard — real differences, no phase trick ([[BED Slot]] guitars/pads) |
| Unison/detune inside the synth | ✅ mostly | [[Serum 2]]/[[Model 84 Polyphonic Synthesizer]] detune width folds to a slightly thicker mono |
| Pitch-shift micro-width ([[MicroShift]]/[[Little MicroShift]]) | ✅ mostly | ±9 cents style widening folds gracefully — the safe vocal/synth widener |
| M/S EQ (sides-only shelf, [[Pro-Q 4]]) | ✅ survives | Width by brightness contrast, zero phase risk |
| [[S1 Imager]] / [[Ozone 9 Imager]] width | ⚠️ check | Fine in moderation; extreme width = sides cancel in mono |
| Haas delays ([[kHs Haas]], <30 ms offsets) | ❌ combs | The classic mono-killer — if you use it, the mono A/B is mandatory |
| [[Wider]] / phase-based wideners | ❌ by design | Literally built from phase offset — vanishes or combs in mono; effect moments only |
| [[S1 Shuffler]] | ✅ mostly | Designed to widen without over-widening — the "natural" option |

## Phase checklist (the mono pass)

- **Multi-mic sources** ([[Shure SM57]] + [[Neumann TLM 102]] on the [[Fender Blues Junior]]): flip polarity on one, keep whichever is *fuller* in mono; nudge sample-alignment if both feel hollow.
- **Parallel chains** ([[Parallel Comp Send]], NY buses): latency-compensated ≠ phase-aligned — listen in mono, and use Linear Phase EQ ([[Pro-Q 4]]) on parallel paths that comb.
- **Layered samples** (two kicks/808s): align transients, flip polarity to taste — the louder-in-mono combination wins.
- **DI + mic'd takes**: DI arrives earlier — slide it to the mic take.
- Correlation meter ([[Stereo Tool]]): hovering near 0/negative on a *core* element = fix it; on an AIR/TEXTURE effect = maybe fine.

## Depth (the third axis, briefly)

Front-to-back = dry/wet + predelay + darkness: hook dry with 20–40 ms predelay ([[ValhallaVintageVerb]]), bed wetter and darker, texture wettest. Depth contrast is why the LEAD reads "in front" even at equal level.

## From videos

- **Force a stereo-by-default sampled instrument almost fully into mono, then pan it hard to one side, specifically to carve it its own pocket in a busy mix.** A free Pianobook violin counter-melody: "I found when it was stereo it was filling too much space, and I wanted to have its own little pocket." A clean, reusable mono+hard-pan move for any wide-by-default instrument (Kontakt/sample-library strings, pads) competing for room with other melodic layers, rather than fighting the collision with EQ carving alone. → [[Sound Palette]], [[Masking and Carving]], [[Kontakt 7]], [[Frank Ocean Chill Ambient Chain]] — loner, [how to make chill ambient beats for frank ocean (sad/melodic chord technique)](https://www.youtube.com/watch?v=whI75NJcom8)

*Companions: [[Sound Palette]] (frequency slots) · [[Masking and Carving]] (collisions) · slot pages' Mix rules (per-slot width specifics).*
