---
type: patch
title: "Serum 2 — Modern Lead"
instrument: "Serum 2"
slot: lead
chains: [Synth Lead Track]
tags: [patch]
depth_linked: true
swept: 2026-07-19
---

# Serum 2 — Modern Lead

**Instrument:** [[Serum 2]] · **Slot:** [[LEAD Slot]] · **Used by:** [[1 Synth Lead Track|Synth Lead Track]]

## What it's for
The pop/trap/EDM default single-line lead — modern, mono, expressive. Reach for it when the part is played (not chorded) and needs to sit forward without a supersaw's width eating the mix. Replaces a live lead instrument when speed matters.

## Settings
- Derived from [[Serum 2#Patch Recipes|Serum 2 — Supersaw lead]], narrowed for mono use: Osc A saw/supersaw wavetable, ③ unison 3–7 voices, detune 0.10–0.20 (down from the recipe's 7-voice/0.12–0.18 width, which fights a mono voicing)
- ⑥ Filter: LPF ~24 dB, cutoff open with a touch of envelope amount (fast attack, short decay) for pluck-forward motion
- ⑦ Amp env: fast attack (0–10 ms), release short enough to not smear the line
- ⑩ Mono + legato + glide 40–80 ms (poly only for chord-stab variants — that's a voicing switch, not a different patch)
- Kill sub content below ~100 Hz at the patch (HPF or osc-level) — leads never need it
- Vibrato via mod-wheel LFO, not baked into the patch
- FX: chorus off — unison ③ already does the width job

## In context
- Sits after the chain's saturation/OTT stage on [[1 Synth Lead Track|Synth Lead Track]] — keep the patch's own output clean, let the chain add grit.
- Mono at the source; width comes from the chain's stereo tools, not this patch ([[Stereo Field]]).

## See also
- [[LEAD Slot]] · [[Sound Selection Guide]] · [[Serum 2]] · [[1 Synth Lead Track|Synth Lead Track]]
