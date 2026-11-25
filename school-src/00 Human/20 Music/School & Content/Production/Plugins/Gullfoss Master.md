---
type: plugin
title: "Gullfoss Master"
category: EQ
vendor: "Soundtheory"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: false
owned_source: manual-correction (installed but NOT licensed — Nate confirmed 2026-07-18; spec-129 mis-flagged it owned because it's present in Live's browser)
owned_checked: 2026-07-18
params_enriched: 2026-07-19
visual_key: 2026-07-20
briefed: backlog
---

# Gullfoss Master

![[Images/Gullfoss Master.jpg]]
*Same Gullfoss interface (Gullfoss Master is a mastering-tuned build of the same plugin UI).*

**Category:** EQ
**Vendor:** Soundtheory

## What it is

The mastering-tuned version of Gullfoss, calibrated for full-mix/master-bus use with mastering-appropriate defaults.

## What it's used for

Adaptive clarity and tonal balancing specifically on a final master bus.

## FX chain notes

Used early in a mastering chain, before final EQ and limiting.

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Gullfoss Master.pdf|Local PDF]] · [Official manual](https://www.soundtheory.com/static/Gullfoss%20Operation%20Manual.pdf)

**High-level points** (the mental model — signal flow, modes, things the manual says that nobody discovers by knob-twisting):
- Gullfoss is not a static EQ — it runs a real-time **auditory-perception model** (~1000 model updates/sec, ~300 EQ updates/sec) that continuously re-adjusts a fully adaptive curve to reveal frequency content that's being **masked** by other content, the same way your brain adapts to a bad-sounding room. It's designed to be **artifact-free even at extreme settings** — it never forces the signal into a fixed target curve the way a match-EQ or a "smart" tonal-balance tool does.
- **Recover and Tame are the two primary controls, and they do opposite jobs**: Recover boosts components that are *dominated* (masked by something louder), Tame cuts components that are *dominant* (doing the masking). Both range 0–200%. Because unmasking always works as a cut-and-boost pair, the perceived loudness and dynamics of the signal are preserved — it doesn't just get generically brighter or louder.
- **Bias and Brighten are secondary controls that only do anything once Recover or Tame is non-zero.** Bias (-100% to +100%) decides which frequency *range* gets classified as needing recovery vs. taming — positive gives Recover more territory, negative gives Tame more. Brighten (-100% to +100%) is different: for a masked/masking pair, there's a whole continuum of possible "correct" unmasking outcomes (make the quiet tone just loud enough to poke out, vs. quiet the loud tone until it stops masking) — Brighten picks where on that continuum the fix lands, controlling perceived brightness without touching clarity.
- **Boost is a separate, global bass/mid tilt control (-50dB to +50dB, unit is dB)** that simulates the perceived frequency-balance shift humans hear at different playback volumes (the equal-loudness-contour effect) — it's not part of the unmasking engine at all, and works independently even with Recover/Tame at zero.
- **The two frequency-range limiters in the EQ graph restrict where Tame/Recover are allowed to act** — drag them in from the graph edges. Default order excludes processing outside the two markers; reversing their order instead excludes the range *between* them. Use this to keep Gullfoss out of a sub-bass region or an already-clean high end it shouldn't touch.
- **A sidechain input exists (v1.9.0+)**: feed a different signal into the analyzer while the main input still gets processed and output — built for stem-mastering (drive per-stem instances off the sum of all stems so they behave like one mix-bus pass) or creative ducking. Gullfoss is timing-sensitive here — host sidechain-delay-compensation mismatches will throw off the result; check/fix manually if it sounds off.
- **Gullfoss Master is the same engine/UI as standard Gullfoss**, just shipped with mastering-appropriate default settings — there's no functional difference in the parameters themselves, just what they default to. (Gullfoss Live is a separate low-latency variant — ~2ms vs ~20ms — that trades some transient accuracy for tracking/live use; not the Master version.)

## Key Parameters

```visual-key
image: Images/Gullfoss Master.jpg
coords: Images/Gullfoss Master.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ⑦ Sidechain is a routing feature (external input drives the analyzer), not a front-panel control — no badge.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Recover | Boosts frequency components currently being masked/dominated by louder ones (0–200%) | Push Recover on a full mix-bus pass to pull buried detail (room tone, cymbal wash, low-level harmonics) back into audibility without manually EQ-hunting for it — works any slot, commonly a final [[MIDS Slot]]/[[AIR Slot]] clarity pass | — |
| ② | Tame | Cuts frequency components currently dominating/masking others (0–200%) | Use Tame alone (Recover at 0) when a single harsh resonance or boxy buildup is masking everything around it, as an alternative to manual [[Masking and Carving]] | — |
| ③ | Bias | Shifts how much frequency range Recover vs. Tame is allowed to claim (-100% to +100%) | Positive Bias when the mix needs more "opening up" (Recover-led); negative Bias when it needs more "settling down" (Tame-led) | — |
| ④ | Brighten | Picks where on the masked/masking continuum the fix lands — negative = darker result, positive = brighter result, without changing clarity | Nudge negative if Recover/Tame's default fix reads too bright/harsh for the genre; nudge positive for extra top-end "air" without a literal EQ boost | — |
| ⑤ | Boost | Global bass/mid tilt (-50dB to +50dB) modeling the equal-loudness-contour shift at different playback volumes — independent of Recover/Tame | Dial Boost to taste for the intended playback context (quieter background listening wants more low-end Boost) — separate move from the unmasking parameters | — |
| ⑥ | Frequency range limiters | Two draggable markers on the EQ graph restricting where Tame/Recover can act | Pull the low-end limiter up to keep Gullfoss out of sub-bass/kick fundamental territory it might otherwise "fix" | — |
| ⑦ | Sidechain | Routes a separate input to the analyzer while the main input is still what gets processed/output | Feed the summed stem mix to the sidechain on each per-stem Gullfoss instance for consistent stem-mastering behavior | — |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[MIDS Slot]] · [[AIR Slot]] · [[Sound Palette]]
