---
type: plugin
title: "Morgan Amps Suite"
category: Drive/Color
vendor: "Neural DSP"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# Morgan Amps Suite

![[Images/Morgan Amps Suite.png]]

**Category:** Drive/Color
**Vendor:** Neural DSP

## What it is

Neural DSP's neural-modeled emulation of the Morgan Amps boutique amplifier lineup.

## What it's used for

Boutique amp tone for clean and overdriven guitar parts without physical hardware.

## FX chain notes

Used as the amp-sim stage on a DI guitar track.

## Techniques

- **Best-match owned equivalent for Stark (Klevgrand) run on a synth pad, not a guitar, purely to change the pad's character.** A community-stem sample flip runs a guitar amp (named "Stark" on screen) on a pad element loner "didn't like" the tone of, followed by an EQ cut on the low end and a check-listen for a specific high frequency — a fourth logged non-guitar use of Stark (see [[Plugin Wishlist]] for the others: a distorted pad texture, a low-octave guitar accent, a cloned vocal layer), reinforcing that an amp-sim's job here is texture/re-tone, not literal guitar processing. → [[EQ]], [[Saturation and Distortion]], [[Sound Selection Guide]] — loner, [turning your melodies into crazy full samples!?](https://www.youtube.com/watch?v=M8saMeKUdTE)
- **Amp stage of a 6-step Dez Wright guitar-sample chain, second after the preamp.** Recreating *Numbers* (A Boogie): preamp → **amp** → cassette → flanger → spring reverb → EQ, with a perc loop + texture layered underneath the processed guitar for ambience. Guitar chords for the sample were found via a chord progression clicked in blind on a placeholder sound, then matched to a chord-finder website before recording the real guitar part. → [[UAD Century Tube Channel Strip]] (preamp), [[Cassette]], [[Phaser-Flanger]], [[Ghz DC19 3]], [[EQ Eight]], [[Dez Wright Guitar Sample Chain]], [[Sampling and Sound Selection]] — loner, [dez wright's synth secrets will elevate your melodies!?](https://www.youtube.com/watch?v=_8vOz54DTiY)
- **Run on a SYNTH PAD, not a guitar — a texture/grit move explicitly new to the producer.** A constraint-challenge beat (10-sound, no-VST week) runs a plain pad through a guitar amp for a distorted, grittier "hard"/"wire" texture as the opening element of a beat — called out on camera as something never tried before. Half-timed afterward for a rhythmic-feel change without touching the sound source. Corroborates the vocal-layer use below: an amp-sim's job isn't limited to actual guitar/bass sources. → [[Saturation and Distortion]], [[Sound Selection Guide]] — loner, [i made beats WITHOUT VSTs for an entire week!?](https://www.youtube.com/watch?v=gZMSr8CjqOc)
- **Minimal amp + EQ on a dry, low-octave guitar accent — keep it simple so it reads live against a processed sample.** Recreating Jake One's *Percocet and Stripper Joint* (Future) sample: the low-octave guitar accent is played deliberately dry, then only amp + EQ added — no heavy effects chain — so it contrasts with the more heavily processed Rhodes sample underneath it. A second, brighter guitar layered in for high-end contrast gets a fuller chain (preamp → amp → spring reverb → EQ) instead. → [[UAD Century Tube Channel Strip]] (preamp), [[Ghz DC19 3]] (spring reverb), [[EQ Eight]], [[Layering and Stacking]], [[Sound Selection Guide]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)
- **Run on a cloned VOCAL layer, not a guitar, specifically for cut-through.** *UTOPIA*'s "God's Country" clones the lead vocal into two layers: the standard chain (Auto-Tune → reverb → EQ) plus a second layer routed through a guitar amp + EQ purely because the plain layer "needed to cut through the mix more" — a genre-crossed use of an amp sim as a presence/aggression stage on vocals. → [[Saturation and Distortion]], [[Vocal Stacks and Ad-libs]], [[Travis Scott Vocal Chain]] — loner, [the secrets behind Travis Scott's 'UTOPIA' production!?](https://www.youtube.com/watch?v=9vHZnAAegfw)

## Used in my chains

My **amp-sim source** for real guitar tone — Neural DSP's boutique Morgan Amplification suite, built on chimey clean headroom + touch-sensitive edge-of-breakup:

- **[[1 Electric Guitar DI Track|Electric Guitar DI Track]]** — *slot 1, amp + cab*: pick the amp voicing for the part (gain low for AC-style sparkle, up for crunch), light boost/OD in front for lead thickness, cab section with two movable mics (ribbon + dynamic), master out ~0 VU.

## Key Parameters

```visual-key
image: Images/Morgan Amps Suite.png
coords: Images/Morgan Amps Suite.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Amp voicing / channel | Which Morgan amp model is active | Pick the voicing first — AC-style shimmer through a Strat is the sweet spot | — |
| ② | Gain | Preamp gain / drive | Low for chimey sparkle & edge-of-breakup; up for crunch | — |
| ③ | EQ (Bass / Mid / Treble / Presence) | The amp tone stack | Set after the cab is chosen — the cab does most of the tone | — |
| ④ | Boost / OD (front pedal) | Klon/TS-style boost into the amp | Subtle on cleans; more for lead thickness/sustain | — |
| ⑤ | Noise Gate | Cleans hum/noise ahead of the amp | Just enough to kill hiss between phrases without choking sustain | — |
| ⑥ | Cabinet + Mics | IR cab with two movable mics (ribbon + dynamic, or dual 57s) | Move the mics like a real cab — position is the biggest tone lever | — |
| ⑦ | Output section (Doubler / Reverb / Delay) | Post-amp FX + master level | Doubler for an instant hard-L/R double; reverb/delay pulled back; master ~0 VU | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
