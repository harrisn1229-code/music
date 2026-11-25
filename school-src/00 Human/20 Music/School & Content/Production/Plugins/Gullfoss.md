---
type: plugin
title: "Gullfoss"
category: EQ
vendor: "Soundtheory"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
briefed: backlog
---

# Gullfoss

![[Images/Gullfoss.jpg]]

**Category:** EQ
**Vendor:** Soundtheory

## What it is

Soundtheory's real-time adaptive EQ that continuously analyzes and balances a mix's spectral content, automatically reducing masking and boosting clarity.

## What it's used for

Fast, intelligent overall clarity and balance improvements on a mix bus or individual busy tracks.

## FX chain notes

Used early on a mix bus, often before manual EQ, to establish a clearer starting balance.

## Techniques

- **Two sightings in one episode — heavy-handed on a mix bus, lighter on a vocal.** On Ballad's mastering chain, run "heavy-handed... normally not up into the 40% range" for broad tonal correction ahead of the limiter chain — a much stronger setting than this note's other mastering-stage entries. On Barum's lead vocal, used at a normal lighter touch for smoothing alongside Waves MV2. Both used specifically as an alternative to manual EQ sculpting when time is short. → [[Master Chain]], [[1 Main Vocal Track]] — Overmono (Tape Notes), [[TN 187 Overmono - Full Video Episode]]
- **A second mastering-stage use, this time Brighten-led instead of Recover-led — and a name resolved from behavior, not a clean caption.** On the master output: isolate this plugin's processing to the low-mids into the highs specifically, sparing the kick/808 (same "keep it off the low end" discipline as the Recover-led entry below, reached here via frequency isolation for a different stated reason — protecting the kick/808 balance rather than protecting a transient from latency smear), then use a good amount of the **Brighten** parameter for clarity — the source frames the whole move explicitly as **reducing masking**, matching this plugin's own tagline. Read with real confidence as this plugin despite the source's auto-captions garbling the name entirely (heard as "golf rcq") — the frequency-isolation-to-spare-the-kick move, the named **Brighten** parameter, and the "reduce masking" framing all match this note's own documented behavior precisely. → [[EQ]], [[Master Chain]] — Sage Audio, [Creating a Hip Hop Mastering Chain](https://www.youtube.com/watch?v=4JXwuR6AUok)
- **On a master, isolate this plugin to mids and highs only (exclude the kick/low end) to protect transients from its latency, leaning mainly on Recover.** Because the plugin's real-time analysis introduces latency that could smear a transient, pull the **⑥ Frequency range limiters** in to keep it working only on mids and highs, away from the kick — the standard "exclude a range it shouldn't touch" use of those limiters, applied here specifically to protect a kick's transient at the mastering stage. **① Recover** is the main control reached for, described as dynamically making buried mix detail easier to hear — this is the plugin's ordinary unmasking job (pulling masked content back into audibility), not a phase-cancellation fix, despite how the source video's captions phrase it. Owned substitute confirmed here directly (not [[Gullfoss Master]], which isn't licensed) — this standard build covers the technique. → [[EQ]], [[Master Chain]] — Sage Audio, [How to Master a Song Start to Finish](https://www.youtube.com/watch?v=aUygMNRx2yE)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Gullfoss.pdf|Local PDF]] · [Official manual](https://www.soundtheory.com/static/Gullfoss%20Operation%20Manual.pdf)

**High-level points:**
- Gullfoss doesn't apply a fixed EQ curve — it's a continuously-updating auditory-perception model (~1000 model updates/sec, ~300 EQ updates/sec) that decides in real time which frequencies are masked vs. dominant and adjusts accordingly.
- **Recover** boosts components that are being *dominated* (masked) by others; **Tame** reduces components that are *dominant*. They work in opposite directions and both range 0–200%.
- **Bias** controls how the audible spectrum is split between what Recover treats vs. what Tame treats — positive Bias gives Recover more range, negative gives Tame more range. It doesn't change intensity, just which frequencies each parameter is allowed to touch.
- **Brighten** is a secondary parameter (only active when Recover/Tame are non-zero) that biases the *unmasking* decision toward preferring lower or higher frequencies — it's a clarity-preserving tone control, distinct from a plain shelf EQ.
- **Boost** independently reshapes bass/mid/treble balance to taste (like a loudness-contour tilt) while preserving the *perceived loudness* of the signal, so A/B comparisons aren't biased by level.
- The two frequency-range limiters on the EQ graph restrict where Recover/Tame are allowed to act — critical for telling Gullfoss to ignore ranges with no real information (e.g. sub-rumble, ie ultra-highs) so it doesn't chase noise.
- Processing is genuinely transparent by design — it never forces a predefined spectral shape, and dynamics/perceived loudness are deliberately preserved, which is why it reads as "clarity" rather than "an EQ move."

## Key Parameters

```visual-key
image: Images/Gullfoss.jpg
coords: Images/Gullfoss.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ⑦ Sidechain is a routing feature (external input drives the analyzer), not a front-panel control — no badge.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Recover | Boosts masked/dominated frequency components to reveal detail | Run early on a busy mix bus before manual [[EQ]] to unmask elements competing for the same space — see [[MIDS Slot]] | — |
| ② | Tame | Reduces dominant/masking frequency components | Use on a harsh vocal or cymbal-heavy mix bus to pull back what's masking everything else, before any corrective EQ | — |
| ③ | Bias | Splits how much frequency range Recover vs. Tame is allowed to act on (−100% to +100%) | Push negative when a mix is generally too harsh/bright (give Tame more room); positive when a mix feels dull/masked (give Recover more room) | — |
| ④ | Brighten | Secondary control biasing the unmasking decision toward low or high frequencies (−100% to +100%, only active when Recover/Tame ≠ 0) | Nudge positive for extra top-end air on a dull [[AIR Slot]] source without a separate shelf boost | — |
| ⑤ | Boost | Global bass/mid/treble tilt independent of Recover/Tame, in dB (−50 to +50) | Small positive Boost to taste for extra low-end weight on a mix bus while loudness stays matched for fair A/B | — |
| ⑥ | Frequency range limiters | Two draggable bars on the EQ graph restricting where Recover/Tame operate | Exclude sub-bass rumble or ultra-high hiss from the unmasking calculation so Gullfoss doesn't chase non-musical noise | — |
| ⑦ | Sidechain input | Auxiliary input (v1.9+) lets an external signal drive the analyzer while the main input is what's processed | Sum stems to a bus, feed that sum as sidechain into each stem's own Gullfoss instance for consistent stem-mastering EQ | — |

Circled numbers above match a from-scratch signal-flow read of the manual, not an annotated screenshot (none exists for this note).

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
