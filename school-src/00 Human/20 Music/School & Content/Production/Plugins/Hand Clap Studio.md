---
type: plugin
title: "Hand Clap Studio"
category: Instrument
vendor: "Robotic Bean"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Hand Clap Studio

![[Images/Hand Clap Studio.jpg]]

**Category:** Instrument
**Vendor:** Robotic Bean

## What it is

Robotic Bean's dedicated hand-clap synthesis/sound-design instrument.

## What it's used for

Building custom, layered hand-clap sounds for beats without relying on sampled claps.

## FX chain notes

Used as a drum-voice instrument, typically feeding a drum bus alongside kick/snare.

## Techniques

- **"Underneath claps" + the early clap** — layered under the main clap for thickness, plus a dry clap placed slightly AHEAD of the beat in the step sequencer — Disclosure, [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8)

## Used in my chains

A **realistic clap instrument** (source, not an FX slot) — built from real hand-clap samples (4 clap types, 5 velocities, round-robins, ~700 samples). The magic is modeling *many people clapping slightly out of sync*:

- **[[1 Drums Snare-Clap Track|Drums Snare-Clap Track]]** — *"underneath claps"*: layered **under** the main clap for thickness (Disclosure's move). Set Clappers to 4–8, a little Looseness for a human group feel, Spread for width, and Close-mic'd (dry) so it reinforces the main clap without adding space.

## Key Parameters

```visual-key
image: Images/Hand Clap Studio.jpg
coords: Images/Hand Clap Studio.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Clappers (1–8) | Number of individual people clapping | 1 = a single sharp clap; 4–8 = a thick "group" clap for the underneath layer | Disclosure underneath-claps |
| ② | Looseness | Statistical timing sloppiness — how late the following claps fall (one is always on the beat); tempo-scaled | A little for a human group; more for a loose, live feel — none for a tight single clap | — |
| ③ | Spread | Stereo positioning of the clappers across the field | Wide for a room-of-people clap; narrow/mono when layering *under* a centered main clap | — |
| ④ | Mic Balance (Close ↔ Room) | Blend between the close mic and the room mic (built-in Echo Chamber ambience) | Close for a dry reinforcement layer; add Room for standalone claps with built-in space | — |
| ⑤ | Clap Type (×4) | Which of the 4 sampled clap/snap sets is loaded | Audition all four against the main clap — pick the one that fills the gap in its tone | — |
| ⑥ | Velocity / Round-robins | 5 velocity layers + round-robins for non-machine-gun realism | Play/automate velocity so repeated claps vary like real hands | — |

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
