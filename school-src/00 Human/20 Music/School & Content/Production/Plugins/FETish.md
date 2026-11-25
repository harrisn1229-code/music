---
type: plugin
title: "FETish"
category: Compressor/Limiter
vendor: "AnalogObsession"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# FETish

![[Images/FETish.png]]

**Category:** Compressor/Limiter
**Vendor:** AnalogObsession

## What it is

A freeware FET-style compressor plugin by Analog Obsession modeled on classic fast-attack FET compressor circuits (in the vein of a 1176-style unit).

## What it's used for

Fast, punchy compression on drums, bass, and vocals — adding aggressive character and control in the style of a hardware FET compressor.

## FX chain notes

Commonly used as a punchy front-end compressor before a smoother leveling compressor or limiter later in the chain.

## Manual

- No official manual exists — freeware plugin, documented via vendor product pages and community write-ups.

### Sources
- [Analog Obsession — Dynamic Processing](https://analogobsession.com/dynamicprocessing/) (vendor product page)
- [plugins4free — FETISH by Analog Obsession](https://plugins4free.com/plugin/2775)
- [Bedroom Producers Blog — Analog Obsession Releases Free Fetish Compressor](https://bedroomproducersblog.com/2017/08/24/analog-obsession-fetish-compressor/)

**High-level points** (the mental model — signal flow, modes, things nobody discovers by knob-twisting):
- FETish is a freeware emulation of a **1176-style FET compressor** — same lineage as hardware units known for extremely fast attack/release and aggressive, characterful compression rather than transparent leveling.
- **Attack and Release knobs are reverse-scaled** (like the real 1176) — turning the knob one way shortens the time, the opposite of most compressors' knob convention. Attack ranges ~20–800 microseconds (genuinely FET-fast — much quicker than an opto or VCA compressor); Release ranges ~50ms–1.1s.
- **Ratio is switch-selected, not continuous**: 4:1, 8:1, 12:1, 20:1 — each ratio setting has its own curve/character, not just a steeper slope of the same curve (mirrors the real 1176's discrete ratio buttons).
- **A "Slam" mode exists for the classic "all buttons in" 1176 trick** — engaging multiple ratio-like settings simultaneously for extreme, ultra-fast, characterful limiting, referencing the famous (originally accidental) hardware technique.
- **HPF and HF sit in the sidechain/detector path, not the audio path** — HPF (20–500Hz) keeps low end out of the gain-reduction *decision* so bass-heavy sources don't cause the compressor to pump on every low note; HF pushes the detector to react more to high frequencies (FLAT = natural, dialed in = more high-frequency-triggered compression).
- **Mix is built-in parallel compression** — blend crushed/compressed signal with the dry input without a separate bus.
- Input gain is internally level-compensated across its 0–60dB range so driving the circuit harder for more saturation/compression doesn't blow up the level — Output (-30 to +30dB) is the separate makeup-gain stage.

## Used in my chains

The **native 1176** — the owned FET-comp stand-in wherever a hardware 1176 slam is wanted:

- **[[1 Drums Kick Track|Drums Kick Track]]** — *slot 3, comp (optional)*: 4:1, slow-ish attack / fast release, HPF engaged, ~2 dB GR — only for uneven (live/velocity-varied) kicks; a one-shot skips it.
- **[[Parallel Comp Send]]** — *alt flavor*: the 1176 all-buttons-in crush, native (vs. [[UAD UA 1176LN]]), Mix as parallel blend.
- **[[1 Digital Bass Track|Digital Bass]]** — drive/grit lane pushed hard (alt to [[Devil-Loc Deluxe]]).

## Key Parameters

```visual-key
image: Images/FETish.png
coords: Images/FETish.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Input | Drives the FET compression circuit (0–60dB, level-compensated) | Push Input hard for classic 1176-style "crush," relying on the internal compensation rather than riding Output to match levels | — |
| ② | Ratio (4:1/8:1/12:1/20:1) | Switch-selected compression ratio, each with its own character (not just a steeper slope) | 4:1/8:1 for punchy-but-musical bus/vocal work; 12:1/20:1 (or Slam, all engaged) for the "British broadcast" ultra-squashed drum-bus effect | — |
| ③ | Attack | Reverse-scaled attack time, ~20–800 microseconds — genuinely FET-fast | Fast attack clamps transients hard for that classic FET-slam character on drums/bass; back it off to let more transient through on a vocal | — |
| ④ | Release | Reverse-scaled release time, ~50ms–1.1s | Fast release for audible "pumping" on a drum bus; slower release for a smoother, less-obvious vocal/bus compression | — |
| ⑤ | HPF | High-pass filter in the sidechain/detector path (20–500Hz) — keeps low end from triggering gain reduction | Roll HPF up on bass-heavy sources (808s, kick-heavy drum busses) so the compressor doesn't pump on every low note, in [[SUB Slot]]/[[BASS Slot]] chains | — |
| ⑥ | HF | Boosts how much the detector reacts to high frequencies (FLAT = natural) | Dial in HF to make the compressor react more to cymbals/sibilance/fret noise for de-essing-adjacent control | — |
| ⑦ | Mix | Dry/wet blend — built-in parallel compression | Keep Mix under 100% on drum bus for NY-style parallel compression without a separate send/return | — |
| ⑧ | Output | Makeup gain (-30 to +30dB) | Match Output to bypassed level for an honest A/B before committing to a setting | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[SUB Slot]] · [[BASS Slot]] · [[Sound Palette]]
