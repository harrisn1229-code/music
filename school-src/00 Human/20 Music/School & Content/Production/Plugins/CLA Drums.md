---
type: plugin
title: "CLA Drums"
category: Compressor/Limiter
vendor: "Waves"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# CLA Drums

![[Images/CLA Drums.png]]

**Category:** Compressor/Limiter
**Vendor:** Waves

## What it is

A Waves drum compressor plugin designed by mix engineer Chris Lord-Alge, tuned for punchy, radio-ready drum-bus compression.

## What it's used for

A complete **drum channel strip**, not just a compressor — one voicing selector (Toms/Snare/Kick/OH/Room/Cowbell) re-tunes six faders: Bass, Treble, Compress, Reverb, Gate and Output, each with its own 2–3 character voicings. Fast, mix-ready CLA character out of the box.

## FX chain notes

Placed at the end of a drum bus chain, after individual drum processing.

## Techniques

- **The real tracking-room workflow this plugin's voicing model is built to emulate.** CLA's own per-piece voicing selector (① above) maps directly onto a philosophy he states plainly while getting live drum sounds: direct mics (kick, snare) are where the EQ/compression "heat" belongs, while overhead/room voicings exist to color a signal that's already good rather than to correct one — "the room tracks... they're so good you're not gonna EQ those." Practical takeaway for dialing this plugin in: drive the Kick/Snare voicings harder (Bass/Treble/Compress all doing real work), keep the OH/Room voicings comparatively light — glue and character, not correction. Room-mic processing in the real session was kept to compression only, deliberately no reverb (owned here: this plugin's own Reverb fader, Studio voicing, kept low for the same reason). Full context: [[Drum Mic Technique]]. → [[Drum Mic Technique]], [[EQ]], [[Limiting]] — Chris Lord-Alge (Mix with the Masters), [[Tracking live drums with Chris Lord-Alge]]

## Key Parameters

```visual-key
image: Images/CLA Drums.png
coords: Images/CLA Drums.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Drum Selector | Chooses which kit piece the whole plugin is voiced for: Toms / Snare / Kick / OH / Room / Cowbell. | Set this **first** — it re-tunes every fader below it. Everything else is wrong until this matches the source. |
| ② | Input Sens | Input sensitivity — how hard the source drives the internal processing. | The faders are all relative to this. If nothing seems to do much, this is usually why. |
| ③ | Bass | Low-end fader, with three voicings selected by the button above it: **Upper / Lower / Sub**. | Sub on a kick for weight under the beater; Upper on a snare for body without mud. |
| ④ | Treble | High-end fader, voiced **Roof / Top / Bite**. | Bite is the aggressive one — it finds the stick rather than the air. Top for a gentler lift. |
| ⑤ | Compress | Built-in drum compression, voiced **Wall / Spank / Push**. | Spank for transient snap on a snare; Wall when you want the whole kit flattened into one wash. |
| ⑥ | Reverb | Built-in drum ambience, voiced **Hall / Club / Studio**. | Studio for a tight believable room; Club/Hall when the kit is meant to sit further back. |
| ⑦ | Gate | Gate fader, voiced **Hard / Soft**. | Hard to kill bleed on close mics; Soft to tighten a room mic without it sounding chopped. |
| ⑧ | Output | Output level. | Match against bypass — every fader here adds gain, so the A/B lies otherwise. |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]] · [[Drum Mic Technique]]
- Palette: [[Sound Palette]]
