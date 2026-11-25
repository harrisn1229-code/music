---
type: plugin
title: "Reverb"
category: Reverb/Delay
vendor: "Ableton"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Reverb

![[Images/Reverb.jpg]]

**Category:** Reverb/Delay
**Vendor:** Ableton

## What it is

Ableton's stock algorithmic reverb, offering room, hall, and other space types with detailed early-reflection and diffusion network controls.

## What it's used for

Adding spatial depth and ambience to any track — from tight room ambience to large hall tails — as Live's built-in reverb before reaching for a third-party unit.

## FX chain notes

Almost always used on a send/return track rather than inserted directly, fed via each track's send level for shared, cohesive space.

## Techniques

- **A "small room" plate-style setting as a piano-tightening stage, and a short low-cut reverb as stage 2 of a sample-to-beat flip.** Two separate roles in one build: (1) on a 2000s R&B piano bed, a "very small room plate reverb" runs between a compressor and a make-dynamic EQ carve, kept subtle to match the era's clean, restrained character (see [[Little Plate]]); (2) when flipping the finished sample into a beat, reverb runs right after the opening EQ band cut — kept fairly short, with low end cut out of the return and Size brought down a little — pushing the sample further toward "lo-fi and distant" ahead of a time-stretch/tempo-drop stage. → [[Little Plate]], [[EQ Eight]], [[Compressor]], [[Sampling and Sound Selection]], [[2000s R&B Piano Sample Chain]] — loner, [how to make a 2000's r&b sample & flip it into a beat for tory lanez/bryson tiller](https://www.youtube.com/watch?v=sPqBmZLaDM4)
- **Compressor → reverb (Cool Room-style preset) → bandpass EQ on live-recorded hand claps, layered under programmed garage drums for texture and bounce.** Hand claps clapped live into a mic along to the beat, chopped to stay in time, then a compressor, a "Cool Room"-type room-reverb preset, and a bandpass EQ (cutting both highs and lows) — the processed claps read as texture on their own and add bounce once blended under the rest of the drum kit. A medium-size reverb was also used earlier in the same build on an airy R&B chord one-shot (alongside a low-end EQ cut) purely to give the chords "a little bit of space." → [[Genre Drum Patterns]], [[EQ Eight]], [[Compression]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Two roles in one from-scratch afrobeats build: heavy vintage verb on an ambient reversed-guitar texture, plus a heavy "drowning" reverb on a Splice vocal chop.** (1) On a fully-processed guitar part that was reversed and chopped into a fresh layer, this device's vintage-verb character is pushed heavy in the mix, decay pulled down, size pulled slightly smaller than default, alongside a bandpass-style filter and a half-time device — the combined result "almost sounds like a vocal." (2) Separately, a melodic Splice vocal chop (pitched down an octave, edited down to just its usable phrase) gets a heavy reverb specifically to "drown it out," then forced mono and panned right, with the earlier reversed-guitar layer doubled into the same stereo position. → [[EQ Eight]], [[Automation]], [[Depth and Space]], [[Sampling and Sound Selection]], [[1 Electric Guitar DI Track]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **Two reverb automation moves: pre-delay up for verse intelligibility, Size/Decay to max then snapped back down for a creative swell.** Automation can touch just about any parameter on this device — increasing Pre-Delay (①) during a verse keeps a vocal more intelligible without changing the reverb's character; separately, pushing Size/Decay (②) to its maximum value then quickly dropping it back down is a fast creative-swell move, distinct from the exponential Wet/Decay ramp and Size-repitching automation already documented below. → [[Automation]] — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)
- **A return can send into a second return — off by default, worth switching on** — R opens the Return Tracks panel, S reveals each track's per-return send knobs (A/B/C…); right-click a return → **Enable Send** additionally lets that return's own output feed into *another* return's chain instead of only ever receiving from source tracks — e.g. routing a delay return into a reverb return so the echoes pass through the same room as the dry sources, rather than bypassing it. → [[Delay]] (Ableton), [[Depth and Space]] — You Suck at Producing, [Sends and Returns](https://www.youtube.com/watch?v=SzTGuvAqqfU)
- **The device is really two halves, each independently auditionable — and the send/return workflow rule** — solo Early Reflections (Diffuse Reflections off) to hear just the room's character (input-processing filter, Spin's built-in chorus-like smear on the early taps, Shape); solo the Diffusion Network (Early Reflections off) to hear just the long tail (its own filter, Density/Scale, **Freeze** for a sustain-forever pad). **Pre-Delay** pushed toward 250 ms gives the dry note's transient room to "breathe" before the reflections arrive, instead of the reverb covering it immediately. Above all: never run high Dry/Wet on the source track itself (it replaces the dry signal instead of adding to it) — put the reverb on a return, Dry/Wet 100%, and control the amount per track via that track's send knob, so multiple sources can share one cohesive space. → [[Depth and Space]] — You Suck at Producing, [Using Ableton's Reverb](https://www.youtube.com/watch?v=r4zTfXkFb6I)
- **Exponential Wet/Decay automation for a wash-in, Size automation for a repitching tail** — Option-drag an automated Wet (or Decay) ramp to bend it exponential rather than linear, so a texture layer washes in gradually then blooms, rather than fading in mechanically; automating **Size** while the reverb rings produces a cool repitching side effect on the tail — a fast way to add texture/movement to an otherwise-static intro. → [[Automation]] — dnksaus, [Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo)
- **Macro-map Decay and Size for a controllable snare/drum tail** — on a built-from-scratch drum layer, map Decay (kept short so it isn't a long wash) and Size to rack macros; a small Size on a texture layer reads as "putting it in a room" rather than a full reverb wash. → [[Snare Design]] — dnksaus, [craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA)

## Key Parameters

```visual-key
image: Images/Reverb.jpg
coords: Images/Reverb.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Predelay | Gap before the reverb | Keeps the dry source clear in front |
| ② | Size / Decay | Room size + tail length | Small for ambience; large for space |
| ③ | Diffusion / Density | Smoothness of the tail | Higher for a lush wash |
| ④ | EQ (In/Out filters) | Band-limits input + tail | HP the input so lows don't mud the tail |
| ⑤ | Dry/Wet | Blend | Low on inserts; 100% on a send |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]] · [[Snare Design]] · [[Automation]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
