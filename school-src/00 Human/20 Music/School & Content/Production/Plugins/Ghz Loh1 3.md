---
type: plugin
title: "Ghz Loh1 3"
category: Drive/Color
vendor: "Goodhertz"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ghz Loh1 3

![[Images/Ghz Loh1 3.png]]

**Category:** Drive/Color
**Vendor:** Goodhertz

## What it is

Goodhertz's Lohgain-style gain/character plugin adding subtle analog-style coloration and gain staging.

## What it's used for

Adding gentle analog gain character to a track or bus while adjusting level.

## FX chain notes

An early-to-mid chain coloration stage.

## Techniques

- **HI-cut used to tame a glittery Analog Lab texture layer, right after a heavy reverb pass.** A minimal high-end sparkle layer (Analog Lab's Impulse bank, Louis of Loophole's bank — just the last three notes of the progression) gets heavy reverb (low end cut from the return) then this device's HI side ("Good Hertz Low High" as auto-captioned) to cut back the resulting brightness — same corrective-HI-cut-after-reverb role as the entry below. → [[Reverb]], [[Sound Selection Guide]], [[Plugin Wishlist]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- **HI filter used to tame an overly bright reversed-one-shot ambient synth pad, right after a long reverb and before a ShaperBox mix-reduced filtering stage.** On an underwater-sounding R&B pad build (reversed one-shot + simple 4-chord progression → low-cut EQ → long "infinity"-preset reverb → **Loh1 3 (HI side)** → [[Shaper]] at Mix ~50%), Loh1's high-cut is reached for specifically because the reverb stage left the pad "way too bright" — a quick corrective HI cut before the finishing filter/shaper stage, rather than going back to re-EQ earlier in the chain. Auto-captioned "good hurts low high." → [[Reverb]], [[Shaper]], [[Sampling and Sound Selection]] — loner, [how to make melodic r&b beats for tory lanez & chris brown (underwater synth/vocal sample)](https://www.youtube.com/watch?v=7JCup6FVW5o)

## Key Parameters

```visual-key
image: Images/Ghz Loh1 3.png
coords: Images/Ghz Loh1 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Filter Type | **LO / HI / BP / Off** — low-pass, high-pass, band-pass, or filter bypassed (leaving just the LIM/SAT stage). | Off is genuinely useful: it turns Lohi into a pure limiter/saturator with no filtering at all. | — |
| ② | Frequency | Filter corner frequency. | — | — |
| ③ | Slope | Steepness of the filter, in dB/octave. | Gentle slopes for a tonal tilt; steep when you want the band genuinely gone. | — |
| ④ | Resonance | Emphasis at the corner frequency. | A little resonance is what makes a filter sweep sound musical rather than like a mute. | — |
| ⑤ | Mix (filter) | Blend of the filtered signal against the unfiltered one, **inside** the filter stage. | Parallel filtering — keep the body of the source while the filtered copy adds the character. | — |
| ⑥ | Threshold *(Lim/Sat)* | Where the built-in limiter/saturator starts working. | This is the second half of the plugin. Drop it to push the signal into saturation rather than just filtering it. | — |
| ⑦ | Color *(Lim/Sat)* | How much analog-style coloration the limiter/saturator adds. | Pair a low Threshold with high Color for lo-fi grit; keep Color low for clean limiting. | — |
| ⑧ | Out | Output level. | — | — |
| ⑨ | Dry | Overall dry/wet for the whole plugin. | — | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
