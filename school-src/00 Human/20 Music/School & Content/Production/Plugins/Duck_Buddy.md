---
type: plugin
title: "Duck_Buddy"
category: Compressor/Limiter
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# Duck_Buddy

![[Images/Duck_Buddy.jpg]]

**Category:** Compressor/Limiter
**Vendor:** Max for Live

## What it is

A Max for Live sidechain-ducking utility that applies gain reduction to a signal in response to a trigger source, without needing a full compressor.

## What it's used for

Simple sidechain pumping effects (e.g. bass or pad ducking under the kick) without configuring a full compressor's sidechain routing.

## FX chain notes

Inserted on the track to be ducked, triggered by a chosen source track.

## Techniques

- **A "pumper" (sidechain-style ducking) run purely for vibe/breathing character on a background vocal texture layer, not for masking or level control.** On a re-purposed background "effects vocal" part running throughout "Dancing With A Stranger": "we added a little pumper to it to give it a vibe, but it's verbed out... add a little pumper behind it, just added a little vibe to the song" — one stage of a chain also running channel-strip character (Scheps, unowned — see [[Plugin Wishlist]]), [[Solid Bus Comp]], and reverb, each A/B'd against bypass. *(qualitative only — no depth/length settings given, and the pump's trigger source isn't specified)* → [[Solid Bus Comp]], [[Vocal Stacks and Ad-libs]], [[Sidechaining]] — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)

## Used in my chains

A **MIDI-triggered ducking** utility (Slynk, Max for Live) — draws a custom gain-reduction shape triggered by a MIDI note (not audio detection), so the duck is perfectly repeatable and clickless:

- **[[1 Digital Bass Track|Digital Bass Track]]** — the *real-triggering* alternative to [[Kickstart 2]]'s tempo-sync: feed it the kick's MIDI so the bass ducks exactly on each kick, even when the pattern varies (vs. Kickstart's fixed sync, or [[Pro-C 2]] external sidechain).

## Key Parameters

```visual-key
image: Images/Duck_Buddy.jpg
coords: Images/Duck_Buddy.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Trigger Source (MIDI) | The MIDI track/note that fires the duck | Point it at the kick's MIDI so ducking tracks the actual pattern | — |
| ② | Depth | Amount of gain reduction applied | Back off until the pump supports the groove without being obvious | — |
| ③ | Length | Duration of the gain-reduction envelope | Match to the kick's spacing so the bass recovers before the next hit | — |
| ④ | Custom Envelope | Draw the exact ducking curve | Shape a fast dip + smooth recovery for a musical pump | — |
| ⑤ | Lookahead | Catches faster transients (fixes late triggering) | Increase if the duck lands slightly after the transient | — |
| ⑥ | Ramp / Smooth | Smooths the envelope to prevent clicks | Add just enough to kill clicks on sharp shapes | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
