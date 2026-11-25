---
type: plugin
title: "Keyscape"
category: Instrument
vendor: "Spectrasonics"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
briefed: backlog
---

# Keyscape

![[Images/Keyscape.png]]

**Category:** Instrument
**Vendor:** Spectrasonics

## What it is

Spectrasonics' deeply-sampled keyboard instrument covering acoustic and electric pianos, Rhodes, Wurlitzers, and rare vintage keyboards.

## What it's used for

Studio-quality acoustic and electric piano/keys sounds across pop, hip hop, and R&B production.

## FX chain notes

Used as the instrument source, typically followed by light compression and EQ to fit the keys into the mix.

## Techniques

- **The "Creative" preset category as a chord-instrument source beyond the standard piano/EP patches** — a deep sub-library ("so much good stuff") used for a jazzy half-diminished chord vamp (F♯ø7 → Fm6 → C9/E) in a lofi hip-hop context, distinct from reaching for a plain Rhodes/Wurli patch. → [[Neo-Soul - Lo-fi]] — Max Konyi, [[Jazzy LoFi Hip-Hop - Beat Breakdown]]
- **Sustain-layer under a pluck** — same chords as the lead pluck but sustained, tucked underneath so the pluck carries attack and Keyscape carries body; two patches reading as one instrument — Lophiile, [Paradise breakdown](https://www.youtube.com/watch?v=L968H6x2sBY)
- **"Greg Phillinganes" electric-piano hits for a UK-garage flip** — the go-to Keyscape EP patch for chopped-soul garage chords; pairs with deliberately-loud lo-fi hats + a bedroom MPC saturation over the loop. → [[Saturation and Distortion]], [[House - EDM]], [[BED Slot]] — Disclosure, [Writing U.K. Garage in the Studio!](https://youtu.be/OJ9d8AR8bBg)

## Manual

- 📄 [[Keyscape.pdf|Local PDF (294 pp, compressed)]] · [Official web reference guide](https://support.spectrasonics.net/manual/Keyscape/)

**High-level points:**
- 36 deeply-sampled keyboard instruments; each patch exposes **custom controls specific to that instrument** (a Rhodes gets bark/bell/tremolo, a piano gets lid/pedal-noise/velocity curve) — the controls page changes per patch, so always look.
- The per-patch **EQ, drive, and FX knobs are modeled for that instrument** and genuinely good — shape there before reaching for Ableton devices.
- **Velocity curve matters more than any knob**: match it to your controller or every patch feels wrong.
- Mechanical/pedal/release noises are separately mixable — they're the "realness" layer; too loud reads as noise, off reads as fake.
- Keyscape patches load inside [[Omnisphere]] as a satellite — layerable with pads, filterable, arpeggiable.
- House rule: internal reverb OFF, sends do space (see [[Instrument Preset Map]] for the per-job patch table).

## Used in my chains

My **default keys source** (an instrument, not an FX slot) — internal reverb OFF (space comes from sends), velocity curve to taste:

- **[[1 Acoustic Piano Track|Acoustic Piano Track]]** — *the default*: LA Custom C7 grand (pop/ballad centerpiece), Wing Upright/Tack for vintage character → [[Keyscape — LA Custom C7 Grand]] / [[Keyscape — Wing Upright & Tack Piano]].
- **[[1 Electric Piano Track|Electric Piano Track]]** — *the definitive EP box*: Rhodes/Wurli patches into the [[Ghz Tupe 3]] → [[LALA]] → [[Chorus-Ensemble]] chain.

## Key Parameters

| #   | Parameter              | What it is / does                                | Technique                                                                                         | Artist / record example                                                       |
| --- | ---------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ①   | Velocity curve         | Maps your controller's touch to sample dynamics  | Set once per controller, save as default — fixes "I can't play soft" on the C7                    | —                                                                             |
| ②   | Custom controls page   | Per-instrument modeled controls                  | On Rhodes patches: Bark + Bell are the tone; on Wurli: Drive is the pop/rock bite                 | Wurlitzer bark = the Supertramp/"Dreamer" lane; Rhodes = the neo-soul default |
| ③   | Tremolo (EPs)          | Modeled amp tremolo (rate/depth)                 | Kill it if you're panning with [[PanMan]] (house rule from the preset map)                        | —                                                                             |
| ④   | Mechanical/pedal noise | Key/pedal action sample layers                   | A touch louder on intimate ballads = "musician in the room" effect                                | —                                                                             |
| ⑤   | Drive / EQ knobs       | Instrument-specific modeled tone stage           | Add drive here (modeled per instrument) before Ableton saturation — it responds like the real amp | —                                                                             |
| ⑥   | LA Custom C7 lid/mic   | The flagship grand's tone options                | "Cinematic" sub-variants for ballads (per [[Instrument Preset Map]])                              | —                                                                             |
| ⑦   | MKS-20 patches         | Roland's 80s "structured adaptive" digital piano | The 80s ballad/"human nature" digital-piano lane                                                  | The MKS-20/SA-piano sound defined 80s ballads (Whitney-era pop)               |
| ⑧   | Internal FX            | Per-patch chorus/phaser/reverb chains            | Reverb OFF always; keep chorus on EPs when it *is* the sound (Mark I + chorus = neo-soul)         | —                                                                             |

*Per-job patch shortlist lives in [[Instrument Preset Map]] — browse by job, audition ≤5, commit.*

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
