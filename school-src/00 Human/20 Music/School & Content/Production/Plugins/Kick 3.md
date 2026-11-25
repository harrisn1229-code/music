---
type: plugin
title: "Kick 3"
category: Instrument
vendor: "Sonic Academy"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
manual_enriched: true
briefed: backlog
---

# Kick 3

![[Images/Kick 3.png]]

**Category:** Instrument
**Vendor:** Sonic Academy

## What it is

Sonic Academy's dedicated kick-drum sound-design instrument, layering and shaping synthesized/sampled kick components (click, body, sub).

## What it's used for

Building custom electronic kick drums by layering and tuning multiple components.

## FX chain notes

Used as the kick instrument source in a drum rack, typically followed by saturation and compression on the drum bus.

## Key Parameters

```visual-key
image: Images/Kick 3.png
coords: Images/Kick 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Layers (Osc/Sample/Sub) | Stacked kick layers | Blend a sub-sine + click sample + body |
| ② | Pitch Envelope | The kick's pitch-drop | Steeper for punch; longer for 808 slide |
| ③ | Distortion / Saturation | Harmonic grit for translation | Drive the click so it reads on phones |
| ④ | EQ / Filter | Per-layer tone | Carve mud, boost the beater click |
| ⑤ | Envelope | Amp contour | Tight for trap; long for boom |

## Manual

- No standalone manual PDF exists — Sonic Academy documents Kick 3 through in-app tooltips + video tutorials rather than a written manual.

**High-level points**:
- Kick 3's engine is built around **layering three independent components** (Oscillator/Body, Sample, and a dedicated Sub layer) rather than one synth voice — the "sound design" is mostly in how the layers are balanced against each other, not deep synthesis on any one layer.
- The **pitch envelope is the single most important control for genre character** — a short, steep drop reads as a tight trap/hip-hop kick; a slower, longer drop reads as a boomier house/techno kick or an 808-style slide.
- Built-in **distortion/saturation stages exist specifically for phone/laptop-speaker translation** — the sub layer is often felt more than heard on small speakers, so driving the click/body layer's saturation is what keeps the kick audible on cheap playback.
- The plugin ships with a large factory preset library organized by genre — presets are a fast starting point but the workflow is designed around **tweaking the 3-layer balance + pitch envelope on top of a preset**, not building fully from scratch every time.
- Exports a rendered sample (drag-out) as well as running live as an instrument — useful for freezing a kick sound into an audio layer once it's dialed in, so it stops eating CPU/voices in a big project.

### Sources
- [Sonic Academy Kick 3 product page](https://www.sonicacademy.com/products/kick-3) + [tech specs](https://www.sonicacademy.com/products/kick-3/tech-specs) + [tutorials index](https://www.sonicacademy.com/products/kick-3/tutorials)

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
