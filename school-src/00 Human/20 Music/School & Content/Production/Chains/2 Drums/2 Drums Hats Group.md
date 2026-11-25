---
type: chain
aliases: ["Drums Hats Group"]
title: Drums Hats Group
chain_type: group
family: drums
source: mixed
routing: "[Drums Hat tracks, shakers, percs] → Drums Hats Group → Drums Bus → Master"
signal_chain: [Pro-Q 4, Glue Compressor, S1 Imager]
status: default
tags: [chain, drums, group]
---

# Drums Hats Group

**Role:** Hats + shakers + top percussion summed — the mix's "top layer" treated as one texture.

## Chain

### 1. [[Pro-Q 4]] — Sum cleanup
- HPF the whole group 300+ Hz · one broad tilt decision: how bright is the top layer vs the vocal air?
- **Why:** Hats and vocal air share 8–12 kHz — decide who owns it (usually vocal, in your genres) and shelf the hats accordingly.

### 2. [[Glue Compressor]] — Texture glue
- **Ratio 2:1** (②) · **Attack 1 ms** (③ — fast; hats have no transient worth protecting at group level) · **Release Auto** (④) · **Threshold for ~1.5 dB GR** (①) · **Makeup** to unity (⑤) · **Dry/Wet 100%** (⑦)
- **Why:** Makes hat + shaker + perc breathe as one instrument instead of three competing tickers. A fast attack is fine here — clamping the tick fronts evens the texture rather than dulling it.

### 3. [[S1 Imager]] — Width
- **Width +15%** (①) — top percussion is where width is cheap and safe (no mono-compat risk like low end).

## Variations
- **Trap:** skip the imager, keep hats fairly centered and dry — modern trap tops are narrow and upfront.
- 🎬 *From video:* Southside signature exception to "dry" trap hats — reverb specifically on the hats (named example: *Married to the Game*), as either the hats' own insert or a dedicated hi-hat send depending on the session. → [[Reverb]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

## From videos

- **Reverb specifically on the hi-hats, as a recurring Southside signature** — named example: *Married to the Game*; a deliberate exception to the "keep trap hats dry" default above, worth reaching for on a Southside/Future-adjacent beat specifically. → [[Reverb]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

- **"Always overdrive your shakers — ALWAYS"** — chasing the 7-inch-record breakup: distortion on shakers/cabasa as a rule, not a choice — Disclosure, [Prince Edit stream](https://youtu.be/hOvLf9nX500) → [[Saturation and Distortion]]
- **Pan and de-grid the extras** — hat rolls/open hats/percussion off-center and swung/off-grid; the core hat can stay center but the ornaments shouldn't stack on it — Kenny Beats, [Trap Drums More Interesting](https://youtu.be/fo-E8dY81Nw) → [[Width and Stereo]]
- **909 hat volume-envelope hold trick — one sample, two lengths.** Pull the volume envelope's hold stage all the way up: hold the key down and the hat sustains for as long as you hold it, release early and it stays short — one key gives you both a long and a short hat, no second sample needed. — Disclosure (Sol State), [How Disclosure Makes A Remix/Edit](https://www.youtube.com/watch?v=jS9rs9y3kFs)
