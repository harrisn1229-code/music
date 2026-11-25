---
type: plugin
title: "Echo"
category: Reverb/Delay
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Echo

![[Images/Echo.jpg]]

**Category:** Reverb/Delay
**Vendor:** Ableton

## What it is

Ableton's flagship delay device modeling analog and tape-style echo units, with dual delay lines, modulation, filtering, and a noise/character section.

## What it's used for

Rhythmic delay effects, tape-echo character, and dub-style repeats — Live's deep, modern delay replacing the older Simple/Ping Pong Delay devices.

## FX chain notes

Used on a send/return for shared delay throws, or inserted directly for a dedicated rhythmic delay effect on vocals, leads, or guitars.

## Techniques

- **A super light delay as the FINAL stage of a 2000s R&B lead-vocal chain, closing out a reverb rather than sitting up front.** Owned-lane stand-in for the source's "fruity delay" (FL Studio's stock delay). Chain: octave-up → [[Little AlterBoy]] → [[Pro-Q 4|Pro-Q 3]] high/low cut → [[Decapitator]] (grit, when needed) → an unconfirmed "Intensity" reverb (vocal distance sci-fi preset, near-full wet) → **this device, kept super light**, just to close the chain rather than add an audible echo. Harmonies underneath get the same chain. → [[Little AlterBoy]], [[Decapitator]], [[Reverb]], [[Delay]] (effect), [[2000s R&B Piano Sample Chain]] — loner, [how to make a 2000's r&b sample & flip it into a beat for tory lanez/bryson tiller](https://www.youtube.com/watch?v=sPqBmZLaDM4)
- **Classic dub echo throw, performed live: 100% wet return + selective sends (skip the bass) + low Feedback for a single repeat + a self-feeding return for on-demand runaway echo** — build a return track with Echo on it, Dry/Wet at **100%** (a return only needs to contribute wet signal), delay time on straight 16th notes for a simple, danceable throw. Send every element EXCEPT the bass to this return — dub convention keeps the bass dry/centered so the low end stays solid while everything else gets thrown into the echo. Pull **Feedback down** so only a single echo repeat is heard rather than a long decaying trail, for a tight, controllable throw rather than an always-on wash. For the genre-defining move: enable the return track's OWN send back into itself — now raising the return track's own volume doesn't just make the echo louder, it also feeds MORE signal back into its own delay line, so a single fader ride builds a runaway, self-reinforcing echo escalation live, rather than a static effect. Map physical faders to individual track volumes (all kept ≤0 dB) plus this return's volume, and perform the whole dub mix live — muting/unmuting sources and riding the self-feedback fader in real time — rather than programming it with automation after the fact. → [[Delay]], [[Sidechaining]] — You Suck at Producing, [Dub Mixing Techniques (Scientist, Prince Fatty)](https://www.youtube.com/watch?v=FjUPE1DH37s)
- **Character → Noisy for ambient beds; envelope-follower-driven Decay stretches the built-in reverb's tail** — in milliseconds mode with the built-in reverb engaged and dry/wet up, **Character → Noisy** adds a noisy, degraded delay character that suits ambient material; **Ducking** keeps the wet signal out of the way of the original incoming hits. Echo's own **Modulation** section includes an envelope follower — driving **Decay** with it stretches the reverb's tail in response to the input, good for atmospheric intro material that reads like a wash of water-splash-type texture. → [[Delay]], [[Ambient Texture and Field Recording]] — dnksaus, [Ableton Delay Sound Design](https://www.youtube.com/watch?v=DCIEayyv1bk)
- **Unlink L/R delay time for Haas-style width on a bass/lead — check mono** — set Echo's Channel Mode to independent Stereo and give the left and right delay lines different times so the source widens noticeably; demoed after a distorted FM bass. Always check the result in mono afterward since an unlinked-L/R widening trick like this can collapse or thin out badly there. → [[Width and Stereo]], [[Operator]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Self-oscillating feedback tuned into a melody with Auto Shift** — kickstart with a noise burst (e.g. [[Vinyl Distortion]]'s Crackle, the only stock effect that generates noise from nothing), Echo in **Time mode**, very short delay time, Dry/Wet 100%, **Feedback pushed past 100%** so it self-oscillates into a continuous tone, Modulation wave = **Random**, Delay Mod up (×4), Phase + Sync on, eighth notes — for a semi-melodic self-generating feedback tone. Put [[Auto Shift]] (scale-aware, High mode) after it to snap the wandering pitch to the song's scale; shift the tonal center via Echo's own Delay Time or via Auto Shift's scale-degree shift, and use Feedback amount as a further tonality control. Needs a fresh noise burst to restart if the project is reopened. → [[Vinyl Distortion]], [[Auto Shift]], [[Randomized Rack Design]] — dnksaus, [Scale-Aware Abuse](https://www.youtube.com/watch?v=NZyKN5Wn7A0)
- **Echo as a "time machine"** — Feedback fully down, Dry/Wet fully up = a single copy of the signal sitting in Echo's rolling record buffer; the Delay Time knob then scrubs to any point in the recent past — a bar back in Sync mode, up to 5 seconds back in Time mode. Moving that knob behaves 3 ways: **Repitch** pitch-bends to catch up to the new position (tape-speed-change character, best for sound-effect throws), **Fade** crossfades cleanly to the new position (a smooth "scrub" with no pitch artifact), **Jump** hard-cuts to the new position (deliberately glitchy/artifact-heavy). Manually scrubbing in Repitch mode with feedback up is a fast way to print one-off throw/riser FX to a new MIDI track in Slice mode — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc)
- **The auto-slicer recipe** — Feedback fully down, Dry/Wet fully up, Modulation LFO **Wave = S&H** (Sample & Hold — stair-steps to a new random value each cycle, no smoothing), LFO **time mode = Sync** (quarter notes = chunky chop, 16ths = denser glitch), delay Filter off. Echo now randomly samples positions between "now" and the LFO's sync division and plays them back — a fully automatic, hands-off random slicer/chopper with no extra devices. Widen the LFO's Delay Amount for a bigger sample range; add a narrow/low-bandwidth Filter + Ping Pong + higher Feedback for a wandering atmospheric texture instead of a tight chop. → [[Delay]], [[Randomized Rack Design]] — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc)
- **Wander LFO wave = built-in tape pitch-warble** — the Modulation LFO's **Wander** wave shape (a curved random) mapped to Delay Time with **Repitch** on, at a low Delay Time, gives an unstable vintage pitch-warble directly — previously this needed an external [[LFO]] device set to its Stray shape mapped in from outside. Pairs well with an envelope-follower-driven [[Erosion]] Amount/Blend for a level-reactive texture layer alongside it — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc)
- **Recreate Echo's own Ducking on a *different* wet chain** — Ducking (⑧) only lives on Echo itself; to duck a *different* device's wet output (a reverb, a custom rack chain) the same way, put a Compressor at the end of that wet chain, enable external Sidechain sourced from the track's **"rack pre-effects"** signal (the dry input), and dial Threshold (Peak mode) + Release so the wet chain tucks under the dry source and blooms in the gaps — the general-purpose version of what Ducking does natively here. → [[Sidechaining]] — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc)

## Manual

- 📄 Ableton stock device — [Live Audio Effect Reference (Echo)](https://www.ableton.com/en/live-manual/12/live-audio-effect-reference/) (official manual chapter, no separate per-device PDF).

**High-level points** (the mental model — not a feature list):
- Echo is organized as **two independent delay lines (Left/Right)** whose relationship is set by **Channel Mode** — Stereo (fully independent), Ping Pong (bounces L/R), or Mid/Side (the L/R knobs become Mid/Side knobs instead — a genuinely different mental model, not just a stereo-width tweak).
- **Filter and Modulation both live pre-feedback** conceptually — because Feedback routes each channel's output back into its own input, anything you do to a repeat (filtering, LFO wobble) compounds on every subsequent repeat. This is *why* Echo repeats can progressively darken/wobble more than a single-tap delay would suggest.
- **Two separate "vibe" layers exist on top of the basic delay**: the Modulation tab (LFO + envelope-follower modulating delay time and/or filter — precise, controllable movement) and the Character tab (Noise/Wobble/Repitch — analog-imperfection emulation, intentionally "sloppy"). Reach for Modulation for rhythmic/musical movement, Character for lo-fi/tape vibe.
- **Repitch vs. not**: with Repitch on, changing the delay time pitch-shifts the repeats (like grabbing a tape delay's speed knob live) — with it off, changing delay time crossfades cleanly to the new time instead. This single toggle is the difference between a "tape throw" effect and a clean tempo change.
- **Ducking** reduces the wet signal while the dry input is present (sidechains the delay to the source) so repeats duck out of the way of the next word/note and swell back in the gaps — this is what keeps a vocal delay from smearing over the next syllable without manual automation.
- **Delay Offset** (with Stereo Link on) nudges L/R timing apart by fractional amounts for a "swung" feel — a fast way to add human-feeling asymmetry to an otherwise mechanically even delay.

## Used in my chains

The **native delay** option — Live's stock alternative to [[EchoBoy]] on delay throws, with built-in filter/modulation/reverb/ducking so a whole delay-return lives in one device:

- Referenced across the vocal stack ([[1 Main Vocal Track|Main Vocal]], [[1 Harmony Vocal Track|Harmony]], [[1 Backup Vocal Track|Backup]], stacks + groups) and on [[1 Digital Bass Track|Digital Bass]], [[1 Electric Piano Track|E-Piano]], [[1 Drums FX Track|Drums FX]], and both delay sends — as the stock throw/wash device.
- Its **Ducking** (⑧) makes it self-sufficient on a vocal-lane return: the repeats tuck under the dry and bloom in the gaps without a separate sidechain comp. Filter + Reverb + Wobble/Repitch let one Echo do character delays that would otherwise take three devices.

## Key Parameters

```visual-key
image: Images/Echo.jpg
coords: Images/Echo.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ⑥ Modulation and ⑦–⑧ (Character: Noise/Wobble/Repitch + Ducking) live on the Modulation / Character sub-tabs.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Channel Mode | Stereo / Ping Pong / Mid/Side — how the two delay lines relate to each other | Ping Pong for wide, bouncing rhythmic delays on leads/vocals; Mid/Side to delay only the side content and keep the center image tight | Sage Audio, [Delay Masterclass](https://www.youtube.com/watch?v=wjzowK7iurc) — general principle: a mismatched L/R (or Mid/Side) delay time widens the image on purpose, the same mechanism a doubler plugin uses; keep them matched when widening isn't the goal |
| ② | Left / Right (or Mid/Side) delay time + Sync | Per-channel delay time, in beat divisions (Notes/Triplet/Dotted/16th) or free ms | Set L = dotted 8th, R = quarter for a classic asymmetric rhythmic delay | — |
| ③ | Delay Offset (+ Stereo Link) | Fractional timing nudge between L/R when linked, for a "swing" feel | Small Offset amounts (a few %) add human swing without fully decoupling the two delay times | — |
| ④ | Filter (HP/LP + Res) | Shapes the tone of the repeats; compounds each time due to feedback | Narrow the filter band progressively darkens/thins each repeat — classic "fading into the mix" delay tail | — |
| ⑤ | Feedback (+ Ø invert) | How much of each channel's output feeds back into its own input — controls number/decay of repeats | Push toward self-oscillation carefully for rhythmic delay freakouts; the Ø (phase invert) button changes the tonal character of a resonant feedback loop | Sage Audio, [Delay Masterclass](https://www.youtube.com/watch?v=wjzowK7iurc) — Feedback re-feeds the signal below unity gain so repeats naturally diminish rather than loop away; crosstalk (L↔R delay bleed, not a labeled Echo param — widens the image, emulates an analog tape-delay defect) is the related cousin, closest here to Channel Mode (①) |
| ⑥ | Modulation (LFO + Env Mix) | LFO (6 waveforms) modulating delay time and/or filter, blendable with an envelope follower | Sync a slow triangle LFO to Mod Delay for a chorus-like wobble on the repeats only, not the dry signal | — |
| ⑦ | Noise / Wobble / Repitch | Character controls simulating vintage-gear imperfection (hiss, irregular time modulation, pitch-shift-on-time-change). Moving Delay Time behaves 3 ways: **Repitch** (pitch-bends to catch up — tape-speed-change), **Fade** (crossfades cleanly — a smooth "scrub"), **Jump** (hard-cuts — glitchy artifacts) | Repitch ON + a live delay-time automation move = instant "tape delay speed change" throw; Fade for scrubbing FX; Jump when you want the cut artifact | dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc) |
| ⑧ | Ducking | Reduces wet signal while dry input is present, then lets it swell back | Turn on for vocal/lead delays so repeats stay out of the way of the next phrase without manual sidechain automation | — |
| ⑨ | Input (Gain + D) | Drive into the delay's internal saturation; D engages distortion | A little Input drive + D warms/dirties the repeats without touching the dry signal's tone | — |
| ⑩ | Reverb (amount + placement) | Built-in reverb, placeable pre-delay, post-delay, or inside the feedback loop | Reverb-in-feedback-loop builds a smeared, decaying wash from the repeats themselves — different from a reverb on a separate send | — |
| ⑪ | Dry/Wet | Balance between the unprocessed and delayed signal | On an insert (not a send), keep Wet low-to-moderate so the delay reads as texture, not a doubled signal | — |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
