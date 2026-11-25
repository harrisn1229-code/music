---
type: plugin
title: "Fresh Air"
category: EQ
vendor: "Slate Digital"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Fresh Air

![[Images/Fresh Air.png]]

**Category:** EQ
**Vendor:** Slate Digital

## What it is

Slate Digital's free high-frequency enhancer plugin, adding air and presence via a simple, musically-tuned interface.

## What it's used for

Quick top-end 'air' and presence boost on vocals and mix busses.

## FX chain notes

Used late in a chain, after EQ/compression, for a final presence lift.

## Techniques

- **The named fix for AirPods' measured ~10 dB air-frequency dip — reach for this plugin specifically over a plain EQ boost, because its exciter harmonics mask noise where an EQ boost would raise it.** AirPods' Adaptive EQ dips content above roughly **11 kHz** by about **10 dB SPL** (no way to disable it); most portable speakers roll off similarly, laptop speakers are the one common exception. Boosting a vocal above **10 kHz** is worth it for earbud/portable-speaker translation — but a PLAIN EQ boost there also raises the perceived noise floor right along with the signal. This plugin's exciter-style harmonic generation instead psychoacoustically LOWERS perceived noise through masking while still adding air, which is why it's named directly as the fix. Sequence first: confirm a low-noise source, check nothing upstream is adding noise by default (some Waves plugins do), and denoise with RX if needed — THEN reach for this plugin. → [[EQ]], [[RX Spectral De-noise]], [[AIR Slot]] — Sage Audio, [Perfecting Vocals on Modern Playback Systems](https://www.youtube.com/watch?v=pzEG3HxI3WE)
- **Independently name-checked as a close cousin of an engineer's stated favorite plugin — a dedicated "Air band" EQ, boosted gently around 20 kHz as the very last stage of a lead vocal chain.** Illangelo (The Weeknd), on the unnamed plugin closing his own lead-vocal chain (product name not confirmed on-screen — see [[Plugin Wishlist]] and [[The Weeknd Vocal Chain]]): "I think Slate Digital might have just released something called Fresh Air... I think I might have messed with it a while back and it's fire. This one also does a similar thing." Worth auditioning THIS plugin directly in that exact slot — final stage, after everything else, dedicated top-end "air" only — given the direct comparison. → [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]
- **On a hip-hop master, push both bands until the mix reads bright enough, then pull Trim back to compensate.** Amplify Mid Air and High Air together until the top end sounds sufficiently brightened for the genre, then dial Trim back down to compensate for the added gain — standard Fresh Air gain-staging (see the Trim entry in Manual below), applied here as a simple two-step recipe rather than per-band targeting. Explicit caution: don't overuse it, the effect turns aggressive quickly. Called out specifically as sounding great on a hip-hop master (excites the high-frequency range effectively for the genre). → [[Master Chain]] — Sage Audio, [Creating a Hip Hop Mastering Chain](https://www.youtube.com/watch?v=4JXwuR6AUok)
- **Push it harder than the two-knob "quick air" default when a mix genuinely calls for it — used at the mastering stage, not just per-track.** On an EDM master, both high shelf filters plus the harmonic-generation stage were run at noticeably **more aggressive settings than typical**, judged by ear against the track rather than a fixed number, because the mix's highs were reading as lacking after the earlier stages in the chain. Result: a brighter, more detailed high-frequency range without switching to a different top-end tool. → [[Master Chain]] — Sage Audio, [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34)

## Used in my chains

_No fixed slot as of 2026-07-20._ It previously held **slot 8 ("final air")** on [[1 Main Vocal Track|Main Vocal Track]] — Mid Air 15, High Air 12, Trim to level-match — but that slot was swapped to [[Gem Dopamine]], which does the same dynamic-HF job **with its own compression/de-ess stage built in**, so the air enhancement self-polices sibilance at the end of the chain.

Still the simpler option when you want air and nothing else: two knobs, no dynamics stage to set up.

## Manual

- 📄 [Official docs](https://docs.slatedigital.com/FreshAir/Fresh%20Air.html) — web-only, no downloadable PDF from Slate Digital; kept as URL-only per the enrichment guard on non-PDF official docs.

**High-level points** (the mental model — not a feature list):
- Fresh Air is deliberately a **2-knob tool**, not a general EQ — it's tuned to two specific "shelf-ish" bands (high-mid presence and top-end air) rather than freely-sweepable frequency/Q, so it can't do damage the way a mis-set parametric EQ can.
- **Mid Air ≠ High Air** — they target different ranges and different jobs: Mid Air is a *presence* control (makes something feel closer/clearer, especially vocals), High Air is a *brightness/sheen* control (adds sparkle without harshness). Reach for the right one instead of always turning both.
- **Link** locks the two bands together for parallel moves — useful once you've found a ratio between Mid/High Air that works for a source and want to ride overall amount with one gesture.
- **Trim exists because boosting adds gain** — Mid/High Air boosts are not gain-compensated automatically; Trim is there specifically to level-match afterward, which matters a lot when Fresh Air sits before a compressor (uncompensated gain would otherwise bias how hard the compressor works) or on a mix bus (uncompensated gain can bias an A/B into sounding "better" just because it's louder).
- The **VU meter is peak+RMS with a clip indicator**, not just a level readout — treat it as the "don't clip past here" reference when riding Trim.

## Key Parameters

```visual-key
image: Images/Fresh Air.png
coords: Images/Fresh Air.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Mid Air | Boosts high-mid frequencies for presence/clarity | Reach for this first on a vocal that feels distant or buried — a little Mid Air often does what people reach for a parametric boost to do, faster | Sage Audio — hip-hop master, pushed alongside High Air until bright enough |
| ② | High Air | Boosts super-high frequencies for brightness/"air" | Use on a full mix bus for a top-end lift that reads as sheen, not harshness — a common cheap "make it sound finished" move | Sage Audio — hip-hop master, pushed alongside Mid Air until bright enough |
| ③ | Link | Locks Mid Air and High Air to move together | Dial a ratio you like on one source, then use Link so future level rides don't have to be re-balanced by ear each time | — |
| ④ | Trim | Output gain compensation for the level added by Mid/High Air boosts | Always trim back down when Fresh Air sits before a compressor or on a mix bus — otherwise you're compressing/judging against a volume increase, not the actual tonal change | Sage Audio — dialed back after boosting both Air bands on a hip-hop master |
| ⑤ | Bypass | True bypass — removes all processing | Use for a level-matched A/B (pair with Trim) rather than trusting your ear on a louder "on" state | — |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
