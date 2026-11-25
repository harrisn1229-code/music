---
type: plugin
title: "Serum 2 FX"
category: Modulation
vendor: "Xfer Records"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: false
owned_source: user-declared (Nate 2026-07-21 — not owned; machine not authorized for Serum 2)
owned_checked: 2026-07-21
params_enriched: 2026-07-19
---

# Serum 2 FX

**Category:** Modulation
**Vendor:** Xfer Records

## What it is

The standalone effects-rack version of Serum 2, exposing Serum's internal effects chain as its own insertable plugin.

## What it's used for

Applying Serum's signature effects processing to any audio source, not just Serum's own oscillators.

## FX chain notes

Used as an insert effect anywhere in a chain, independent of the Serum 2 instrument.

## Techniques

- **A MIDI-loopback trick to make Serum 2 FX's own envelopes/LFOs actually fire when it's fed by a different instrument** — Serum 2 FX's internal modulation (envelopes, LFOs synced to note-on) needs a MIDI note-on trigger, but an audio-effect track processing another instrument's audio doesn't normally pass MIDI note data through to it. Fix: create a new empty MIDI track, set its **MIDI From** to the source instrument's track (e.g. an Operator FM patch) so it receives the same note-on events, then set that new track's **MIDI To** back into the track holding Serum 2 FX and set **Monitor to In** — the note-on now reaches Serum 2 FX's own modulation system even though the audio it's actually processing comes from the separate instrument track. Without this, Serum 2 FX's envelopes/LFOs simply never trigger. → [[Operator]] — You Suck at Producing, [Why Ableton's Operator is Better than Serum (for FM)](https://www.youtube.com/watch?v=p60y3Y3dE3M)
- **Map ONE LFO to several Serum FX parameters at once, for a cohesively "breathing" multi-stage wobble** — rather than modulating just the filter cutoff, route the same LFO (BPM sync off, a slow free rate like ~1.1 Hz, custom-shaped envelope) to multiple stages simultaneously: filter cutoff (the main wobble), an EQ low-cut's frequency (removes low end specifically at the wobble's peak), a distortion stage's Drive (gets more intense at the same peak), and a reverb's Mix (a brief splash of reverb right at the peak that decays slowly after) — every stage swells and recedes together on the same cycle instead of each device doing its own disconnected thing. Hyper/Dimension widening used here with **Size at ~1%** and **Mix maxed** (a narrower, more mix-forward alternative to the Hyper-at-zero/Dimension-only setting documented on [[Serum 2]]). Finish with Multiband + OTT to glue. → [[Randomized Rack Design]] — You Suck at Producing, [Why Ableton's Operator is Better than Serum (for FM)](https://www.youtube.com/watch?v=p60y3Y3dE3M)

## Key Parameters

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Effect Slots | Serum's FX rack as a standalone insert | Chain filter/dist/delay/reverb/etc. like Serum's FX tab |
| ② | Per-effect controls | Each slot's parameters | Same effects as inside [[Serum 2]] |
| ③ | Order | Signal order of the FX | Reorder like a modular chain |
| ④ | Mix | Per-effect wet/dry | Blend each stage |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
