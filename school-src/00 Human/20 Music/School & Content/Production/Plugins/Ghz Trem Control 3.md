---
type: plugin
title: "Ghz Trem Control 3"
category: Modulation
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Ghz Trem Control 3

![[Images/Ghz Trem Control 3.png]]

**Category:** Modulation
**Vendor:** Goodhertz

## What it is

Goodhertz's Trem Control, a tremolo effect plugin with adjustable rate, depth, and waveform shape.

## What it's used for

Classic amplitude tremolo effects on guitars, keys, and synths.

## FX chain notes

An insert effect, usually post-EQ, for rhythmic amplitude modulation.

## Techniques

- **Closing stage of a deliberate "sampled from a record" vocal-bus pass, panning the finished vocal stem side to side.** Building a from-scratch Bryson Tiller-style '90s R&B beat with no real sampling: the consolidated vocal stem goes into a new mixer channel, gets a heavy EQ cut (a lot of both highs AND lows) → reverb → **this device panning the result side to side** — reasoned directly on-screen: "if you're sampling a '90s R&B record, you're going to have to cut loads of the highs out and loads of the lows out, so I did that to make it sound like I'm actually sampling a song." → [[EQ]], [[Sampling and Sound Selection]], [[Modulation]], [[Bryson Tiller Fake-Sample Chord Bed Chain]] — loner, [how to make smooth rnb beats for bryson tiller from scratch (no samples)](https://www.youtube.com/watch?v=ZMB_sqF_Y3Q)
- **A "tremolo control" panning a processed vocal chop side-to-side, as the one distinguishing move on an otherwise shared vocal chain.** On a bouncy/melodic Playboi Carti/Lil Keed-style sample flip, one of two self-recorded vocal takes gets a tremolo control set to move side-to-side plus a bit of delay, while its twin take (same base AlterBoy → EQ → reverb chain) skips both — the tremolo+delay pair is what makes the two takes read as distinct layers rather than duplicates. *(qualitative only — no Rate/Depth/Wave values given; read the side-to-side description as this plugin's stereo/auto-pan-leaning mode rather than a straight volume-only tremolo — verify against the Trem Type control on the actual unit.)* Full build: [[Jetsonmade Bouncy Melodic Sample Chain]]. → [[Modulation]], [[Width and Stereo]], [[Little AlterBoy]], [[Vocal Stacks and Ad-libs]] — loner, [how jetsonmade makes bouncy/melodic beats for playboi carti & lil keed (from scratch)](https://www.youtube.com/watch?v=OQZbvASWIQE)

## Key Parameters

```visual-key
image: Images/Ghz Trem Control 3.png
coords: Images/Ghz Trem Control 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Rate | Tremolo speed — **Hz** or **BPM-synced** to a note value from the grid. | Sync for anything rhythmic; Hz when you want it to drift against the grid. | — |
| ② | Multiplier | Scales the synced rate (1x, and up/down). | Fast way to halve or double the speed without re-picking a note value. | — |
| ③ | Depth | How much the level actually moves. | — | — |
| ④ | Wave | Modulation waveform — smooth through to square. | Square gives the hard on/off chop; smooth gives classic amp tremolo. | — |
| ⑤ | Bias | Shifts the modulation's centre point. | Use it so the tremolo dips below unity rather than pumping above it — keeps the part sitting at a steady level. | — |
| ⑥ | Symmetry | Skews the waveform's up/down halves. | Asymmetric shapes give the lopsided, vintage-amp feel rather than a perfect LFO. | — |
| ⑦ | Tube Color | Valve-style coloration in the **Vibe** section. | The difference between "volume LFO" and "amp tremolo" — add some or it sounds sterile. | — |
| ⑧ | Trem Type | The modelled tremolo circuit (Standard and alternatives). | Pick this first; it sets what the other controls are shaping. | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
