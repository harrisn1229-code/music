---
type: plugin
title: "Little Plate"
category: Reverb/Delay
vendor: "Soundtoys"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Little Plate

![[Images/Little Plate.png]]

**Category:** Reverb/Delay
**Vendor:** Soundtoys

## What it is

Soundtoys' simplified plate reverb emulation, offering classic plate-reverb tone with a reduced control set.

## What it's used for

Quick, classic plate reverb character on vocals and drums.

## FX chain notes

Used on a send/return for a vintage-style reverb tail.

## Techniques

- **Two plates run together, not one — a longer/darker plate plus a shorter plate, combined on a lead vocal, demoed plate-1-alone / plate-2-alone / both-together.** Kevin Davis names this as his go-to reverb approach ("my favorites are, like I said, Little Plate, Valhalla stuff") on Sam Smith's lead ("Dancing With A Stranger") — the short plate reads as immediacy/attack, the longer dark plate as the sustaining tail; combined they cover more of the reverb's job than either alone. *(qualitative only — no decay/mix values given)* Sequenced after a thickening chorus stage and before a delay-throw+hall-verb pairing on select lines. → [[ValhallaSpaceModulator]], [[ValhallaPlate]], [[ValhallaRoom]], [[Reverb]] — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
- **Plate reverb as stage 2 of a 4-device chain on the very first chords of a from-scratch '90s R&B sample, right after EQ and ahead of a chorus + a separately-layered "warm keys" pad.** A 9th-chord progression ("lots of ninths... that's how you get like an R&B sound") runs EQ (cut lows + some mids) → this plate reverb → a "clean chorus" Arturia preset (owned-lane [[Chorus-Ensemble]]) → a "warm keys" Arturia layer stacked on top for extra depth. *(general starting point — no size/decay values given, auto-caption transcript)* → [[EQ]], [[Chorus-Ensemble]], [[Chord Progressions]], [[90s R&B Sample Chain]] — loner, [how to make your own 90's rnb samples](https://www.youtube.com/watch?v=PQjIBDgJehQ)
- **A "very small room" plate setting on a piano — subtle glue, not a wash — as stage 2 of a 3-stage clean chain.** On a 2000s R&B piano sample (Kontakt "Gentleman," A-minor chords): Compressor → **small room plate reverb** → [[Pro-Q 4|Pro-Q 3]] (low cut + make-dynamic carve). Kept deliberately small/subtle to match the era's clean, not-too-vintage character (no tape stage added anywhere on this piano). *(general starting point — no exact size/decay values given)* → [[Compressor]], [[Pro-Q 4]], [[Reverb]], [[2000s R&B Piano Sample Chain]] — loner, [how to make a 2000's r&b sample & flip it into a beat for tory lanez/bryson tiller](https://www.youtube.com/watch?v=sPqBmZLaDM4)
- **A clean plate as the "palate cleanser" stage inside a heavily-colored synth chain, not the finishing effect.** Recreating Mk.gee's Casio CZ-5000-inspired synth tone: flanger → chorus → tape (noise) → **Little Plate here, specifically because plates read as "nice and clean"** → then distortion + heavy compression on top. The clean reverb resets the sound between the modulation stages and the final dirt stage rather than being the last thing the signal touches. → [[Phaser-Flanger]], [[Chorus-Ensemble]], [[Kramer Tape]], [[Decapitator]], [[Glue Compressor]] — loner, [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU)

## Key Parameters

```visual-key
image: Images/Little Plate.png
coords: Images/Little Plate.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Decay | Reverb tail length, **0.5 s to ∞** (the red arc runs to infinite hold). | The ∞ setting is the fun one — it freezes the plate into a pad. Automate into it on a last word or a cymbal. | — |
| ② | Low Cut | High-pass on the reverb, 20 Hz–1 kHz. | Push to ~200–300 Hz so the plate adds space without muddying the low end. This is the only tone control here — there's no high cut. | — |
| ③ | Mod | Modulation of the plate, toggled by the small switch. | On for a subtle shimmer that keeps a long tail from sounding static; off for a purer plate. | — |
| ④ | Mix | Dry/wet blend. | Low on an insert; 100% when it's on a send. | — |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
