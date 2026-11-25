---
type: plugin
title: "EffectRack"
category: Utility
vendor: "Soundtoys"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# EffectRack

![[Images/EffectRack.png]]

**Category:** Utility
**Vendor:** Soundtoys

## What it is

Soundtoys' container plugin that hosts multiple Soundtoys effects in one signal chain with shared routing and a single interface.

## What it's used for

Combining several Soundtoys effects (e.g. Decapitator into EchoBoy into Crystallizer) in one manageable rack.

## FX chain notes

Used as a container hosting a chain of other Soundtoys effects.

## Techniques

- **The "1-2 knob custom pedal" design pattern: chain several devices, but expose only the 2-3 macros that actually matter for real-time use.** FL Studio's Patcher (a routing/container plugin — the direct sibling of this device and Ableton's Audio Effect Rack) chains a reverb into a chorus into an EQ, but the design goal is explicit: "I want to make this kind of like a one or two knob pedal... this is the effect it's going to give you, but I want to let the person decide" — everything upstream (preset choice, pitch amount, internal chain order) stays baked-in and unmapped; only the 1-2 controls someone would actually want to ride live (e.g. a half-time mix, a low-pass cutoff) get a macro. Framed as the general fix for the guitar-pedal-envy problem (rare/expensive/hard-to-learn hardware) — replicate the character with owned plugins, then package it exactly like a real pedal's simple front panel. Full worked chain: [[Sparkle Texture Rack]]. → [[Randomized Rack Design]], [[ValhallaVintageVerb]], [[Portal]] — loner, [this secret plugin will change the way you process your melodies!?](https://www.youtube.com/watch?v=xwuodd40bug)
- **Save FX-rack chains as reusable "sounds"** — the feature that converted him to Ableton: hours of sound design saved as an audio-effect-rack chain becomes a recallable instrument in your palette; build a library of signature chains, not just presets — Lophiile, [Help Me Devvon interview](https://www.youtube.com/watch?v=-v7NEBcX830)

## Key Parameters

```visual-key
image: Images/EffectRack.png
coords: Images/EffectRack.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Rack / Modules | A host that chains Soundtoys effects into one insert | Build a multi-effect chain (e.g. Radiator → EchoBoy → Crystallizer) |
| ② | Signal Order | Order of the chained effects | Drive before delay before reverb, like a pedalboard |
| ③ | Mix (global) | Overall dry/wet of the rack | Blend the whole processed chain |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
