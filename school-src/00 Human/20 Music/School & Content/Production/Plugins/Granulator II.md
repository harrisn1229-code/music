---
type: plugin
title: "Granulator II"
category: Instrument
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Granulator II

![[Images/Granulator II.jpeg]]

**Category:** Instrument
**Vendor:** Max for Live

## What it is

Ableton's official Max for Live granular sampler, playing back a loaded sample as a cloud of overlapping grains with position, size, and pitch controls.

## What it's used for

Granular synthesis — turning samples into evolving pads, textures, and glitch instruments.

## FX chain notes

Used as the instrument source; often followed by reverb/delay sends to extend the granular texture.

## Techniques

- **Granulate two different resampled sources separately, then layer them, for a denser "atmosphere" texture** — rather than granulating one already-combined mix, resample each source individually (a string part, a piano part) to its own audio track, run each through its own Granulator II instance (Grain size + Spray for randomized grain variation), and layer the two granulated results together — the layered pair reads as richer/more atmospheric than granulating either alone. Raise the device's own amp envelope **Attack** for a slow ease-in rather than an abrupt grain onset, and follow with a convolution reverb to further space the result out. → [[Ambient Texture and Field Recording]] — You Suck at Producing, [Part 2 of my video with Ableton!](https://www.youtube.com/watch?v=OKa4Pu5SftI)

## Key Parameters

```visual-key
image: Images/Granulator II.jpeg
coords: Images/Granulator II.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Sample display | The loaded sample or LIVE-INPUT buffer; Grab/Write captures incoming audio | Load a note/texture, or Grab live input to granulate it |
| ② | Grain | Grain rate/density (grains per second) | Low for a stuttery texture; high for a smooth pad |
| ③ | FilePos / Spray | Playback position in the sample + spray (random scatter of the grains) | Freeze FilePos on a vowel; add Spray for a wider, blurred texture |
| ④ | Scan (Time / Curve) | Automatically moves the read position through the sample | Slow Scan for an evolving pad that drifts across the sample |
| ⑤ | LFO | Modulation LFO (Cycle + waveform) animating the grains | Slow sine LFO into position/pitch for movement |
| ⑥ | AM | Amplitude modulation of the grains | Add for tremolo/ring-mod-style texture |
| ⑦ | Volume / Voices | Output level and grain voice count (polyphony) | More voices for a denser, thicker granular wash |

## See also

- Newer alternative: **[[Granulator 3]]** — Ableton's redesigned single-device granular sampler (Live 12 Suite) folding this device plus [[GranulatorInput II]]/[[GranulatorFollow II]] into one instrument
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
