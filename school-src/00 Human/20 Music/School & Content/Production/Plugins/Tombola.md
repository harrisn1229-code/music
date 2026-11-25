---
type: plugin
title: "Tombola"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Tombola

![[Images/Tombola.jpg]]

> [!note] Confirmed 2026-07-20 (from the panel)
> Tombola is a **physics-based generative MIDI sequencer** (Dillon Bastan) — balls bounce inside a rotating polygon and fire notes when they hit the walls. The earlier "lottery randomizer" guess is superseded.

**Category:** Utility (generative MIDI)
**Vendor:** Max for Live

## What it is

A Max for Live **physics-based generative MIDI sequencer** — you drop balls into a rotating polygon (a hexagon by default); every time a ball hits a wall it triggers a note, so gravity, speed, shape, and ball mass shape an evolving, semi-random pattern.

## What it's used for

Generative melodic/rhythmic patterns and evolving, semi-random note sequences for experimental production.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Tombola.jpg
coords: Images/Tombola.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Container (hexagon) | Balls bounce inside the shape; each wall/ball collision fires a MIDI note | The core generative sequencer — add balls and let it play |
| ② | Speed | Rotation speed of the container | Faster rotation reshuffles which walls get hit |
| ③ | Gravity | Gravitational pull on the balls | More gravity = balls settle/bounce lower, denser hits |
| ④ | Shape | Number of sides of the container | Fewer sides for sparse patterns; more for busier ones |
| ⑤ | Mass | Mass / bounciness of the balls | Heavier balls bounce less; lighter ones ricochet more |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
