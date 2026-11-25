---
type: plugin
title: "Archetype: John Mayer X"
category: Drive/Color
vendor: "Neural DSP"
tags: [plugin]
depth_linked: true
owned: true
owned_source: owned-not-installed
owned_checked: 2026-07-18
owned_note: "Nate owns it; not installed yet (confirmed 2026-07-18)"
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Archetype: John Mayer X

![[Images/Archetype- John Mayer X.png]]

**Category:** Drive/Color
**Vendor:** Neural DSP

## What it is

Neural DSP's guitar amp/pedal/tone plugin modeled on John Mayer's signature rigs, using neural-network-based amp/cab modeling.

## What it's used for

Studio-quality guitar tone matching John Mayer's clean-to-driven blues/pop rig sounds without physical amps.

## FX chain notes

Used as the amp-sim stage on a DI guitar track, typically followed by light EQ and compression to sit in the mix.

> [!info] Owned, not installed yet (2026-07-18). [[1 Electric Guitar DI Track|Electric Guitar DI]] currently runs [[Morgan Amps Suite]] as the stopgap — but Morgan is a clean/boutique lane and won't do the **Dumble-style singing lead** the JM plug does. Install it, then revert that stage's `signal_chain` head to this. Settings below are from the plugin's known layout; confirm against the interface once installed (and the annotation pass gets a real screenshot).

## Used in my chains

The **intended amp-sim** for the electric guitar DI once installed — Mayer's blues/pop rig, built for touch-sensitive cleans through to a singing, sustaining Dumble lead:

- **[[1 Electric Guitar DI Track|Electric Guitar DI Track]]** — *slot 1 (target, replacing the [[Morgan Amps Suite]] stopgap)*: Clean channel for sparkle/edge-of-breakup; Lead channel + a transparent OD in front for the sustaining lead; always-on comp (very Mayer); cab with dual movable mics; master ~0 VU.

## Key Parameters

```visual-key
image: Images/Archetype- John Mayer X.png
coords: Images/Archetype- John Mayer X.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Amp Channel (Clean / Crunch / Lead) | Three Mayer-voiced amps (Dumble / Two-Rock / Fender lineage) | Clean for funk/sparkle; Lead for the singing sustain Morgan can't do | John Mayer |
| ② | Gain | Preamp drive of the selected channel | Low for edge-of-breakup cleans; up for the crying blues-lead | — |
| ③ | Amp EQ (Bass / Mid / Treble / Presence) + Master | The amp tone stack + power-amp level | Set after choosing the cab; Presence for bite, Master for power-amp feel | — |
| ④ | Overdrive / Boost pedals (Transparent OD / TS / Klon-style) | Front-end boost for thickness + sustain | A transparent OD into the Lead amp is the singing-lead recipe | — |
| ⑤ | Compressor pedal | Evens dynamics ahead of the amp | Always-on light comp is core to the Mayer clean-funk feel | — |
| ⑥ | Fuzz / Modulation (Fuzz Face / Univibe / Chorus) | Texture/character pedals | Univibe + light chorus for the psychedelic-blues shimmer | — |
| ⑦ | Cabinet + Mics (IR, dual movable) | Speaker cab with two positionable mics | Mic position is the biggest tone lever — move before touching EQ | — |
| ⑧ | Delay + Reverb (rack) | Space — tape/analog delay + spring/plate/hall | Pull back; a short slap + light verb for "in a room," not a wash | — |
| ⑨ | Doubler / Output | Instant hard-L/R double + master level | Doubler for a wide rhythm bed; master out ~0 VU | — |

## See also

- Effects: [[Saturation and Distortion]]
- Similar: [[Morgan Amps Suite]] (the owned/installed clean-boutique lane)
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
