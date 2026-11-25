---
type: plugin
title: "Pro-R 2"
category: Reverb/Delay
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Pro-R 2

![[Images/Pro-R 2.png]]

**Category:** Reverb/Delay
**Vendor:** FabFilter

## What it is

FabFilter's current-generation algorithmic reverb, adding a Brightness/Character control, dedicated vocal-focused presets, and refined decay-EQ shaping.

## What it's used for

Natural vocal and instrument reverb where tonal control over the tail (not just size/decay) matters.

## FX chain notes

Used on a send/return track, often the primary reverb for vocals in a modern pop/hip hop mix.

## Techniques

- **A fixed "medium hall" vocal reverb send used identically on every session — a best-match stand-in for a named Waves R-Verb move (unowned).** Part of an always-the-same tracking-vocal send pair: this reverb (medium hall) + a quarter-note ping-pong delay ([[H-Delay]]), described as "creating the dreamscape, the imaging of it" — used for space/imaging rather than character, and reached for identically on every singer rather than tailored per song. On this plugin: a Hall-family preset, moderate decay, built into the artist's monitor mix live while tracking. *(qualitative — no decay time/mix % given)* → [[Reverb]] (effect), [[H-Delay]], [[1 Main Vocal Track]] — Kuk Harrell, [[Radio-ready vocal effects with Kuk Harrell]]
- **Pro-R has EQ built into the reverb itself, so a bright/present tail doesn't need a separate insert EQ after the send.** General reverb technique: to make a reverb stand out as a noticeable effect, send it to an aux and boost highs/dip lows on a separate EQ inserted after it. Pro-R is called out specifically as a plugin that skips that extra insert — reach for **Brightness** (⑥) to tilt the tail brighter and **Decay Rate EQ** (⑩) to shape which bands ring longest, instead of chaining a third-party EQ after the send. → [[Reverb]] — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)
- **The general clarity recipe (10–50 ms pre-delay + attenuate ~1.5–3.5 kHz) maps directly onto this device's Predelay + Decay Rate EQ controls.** Pre-delay in the 10–50 ms window lets the source transient pass through unaffected before the reverb arrives (this note's Predelay ②, "the standard fix for my reverb is eating the words"); separately, dipping ~1.5–3.5 kHz keeps that intelligibility band drier — do it with the Decay Rate EQ (⑩) so only *how long* that band rings gets cut, not its tone. Combined, both moves keep a reverbed vocal from getting buried. → [[Reverb Send Room]], [[Reverb Send Long]] — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)

## Key Parameters

```visual-key
image: Images/Pro-R 2.png
coords: Images/Pro-R 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Space | The big central control — sets the modelled room's size/type, with **decay time in seconds** shown inside it. | Set this first; it decides the character everything else shapes. The number in the middle is decay, so you're picking room and length in one gesture. |
| ② | Predelay | Gap before the reverb starts. | Longer predelay keeps a vocal intelligible while still sitting in a big space — the standard fix for "my reverb is eating the words". |
| ③ | Character | Density and colour of the tail, from clean through to more coloured/vintage. | Low for a transparent modern verb; push it when the reverb is meant to be heard as an effect. |
| ④ | Thickness | How dense the early reflections are. | Thicker fills gaps and glues; thinner leaves air around the source. |
| ⑤ | Distance | How far back the source sits in the modelled room. | This is the depth control — use it rather than Mix when you want something further away but equally loud. See [[Depth and Space]]. |
| ⑥ | Brightness | Tonal tilt of the tail. | Darker to push the reverb behind the vocal; brighter when the tail is part of the sound. |
| ⑦ | Width | Stereo width of the reverb. | Narrow it on a busy mix so the tail doesn't smear the whole stereo field — see [[Stereo Field]]. |
| ⑧ | Ducking | Ducks the reverb while the dry signal plays, then lets it bloom. | The single most useful control here for vocals: set it so the tail only appears in the gaps between phrases. |
| ⑨ | Mix | Dry/wet blend. | 100% on a send; low on an insert. |
| ⑩ | Decay Rate EQ | Per-band **decay** control — how long each frequency range rings, drawn as a curve. | Not a tone EQ: it changes how long bands last, not how loud they are. Fast-decay lows and highs while keeping mids gives clean, uncluttered tails. |
| ⑪ | Auto Gate | Gates the tail automatically. | Tightens a long reverb on a percussive source without automating Mix. |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
