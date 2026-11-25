---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=2_v4VrPkzec
channel: Sage Audio
duration: "00:10:39"
video_type: production
music_enriched: true
transcript_source: whisper
tags: [yt-note, music, production, eq, phase, mastering]
---

# How EQ Changes Phase | 1 FREE Mastering SECRET You Need to Know!

![](https://www.youtube.com/watch?v=2_v4VrPkzec)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=2_v4VrPkzec)

## Synopsis

Sage Audio explains why any zero-latency ("minimum phase") EQ inevitably shifts phase — grounded in the FFT math behind digital EQ bands — and walks the resulting tradeoffs: linear phase reduces that phase shift at the cost of latency and pre-ringing, phase shift is worst in the low end, and mismatched EQ across a stereo pair can create an unintended Haas/precedence-effect image shift. Most of the linear-phase-vs-minimum-phase tradeoff itself is already well covered on [[Phase Alignment]] and [[EQ]] from other Sage Audio videos; this one's distinct contribution is the FFT/Nyquist mechanism for *why* it happens and the stereo-mismatch Haas-effect warning.

## Techniques

- **Why zero-latency EQ shifts phase at all — the FFT/Nyquist mechanism.** A digital EQ built on the Fast Fourier Transform can only represent half as many frequency bands as the block's sample count (Nyquist) — e.g. a 4,096-sample block yields 2,048 representable frequencies, so at 44.1 kHz (22,050 Hz usable range) that's roughly one band per 10 Hz. Each of those bands is a **minimum phase filter**, and each one alters the timing (phase) of the signal around it — the more a band boosts/cuts, the further the surrounding frequencies shift from 0° phase, and the effect worsens toward the low end, especially on high-pass filters. → [[Phase Alignment]], [[EQ]]
- **Linear phase fixes it by delaying every filter band equally** (so no relative timing discrepancy between bands survives), at the cost of added overall latency — and the higher the linear-phase setting, the more accurate low-frequency correction gets, since phase cancellation matters most there. The tradeoff: **pre-ringing** — a linear-phase processor compensating for its own latency shifts signal backward in time, which can audibly soften transients, worse at higher latency settings. Consistent with [[Phase Alignment]]'s existing pre-ringing entry (Sage Audio, "EQ Masterclass") — same tradeoff, now with the underlying delay-compensation mechanism spelled out. → [[Phase Alignment]]
- **Mismatched EQ across a stereo pair can create an unintended Haas/precedence-effect image shift.** If two otherwise-identical hard-left/hard-right signals (e.g. a doubled acoustic guitar) get zero-latency EQ on only one channel, that channel's phase shifts slightly relative to the other — effectively delaying it — which can trigger the precedence effect (the ear localizes sound toward whichever channel arrives first) and pull the perceived image toward the unprocessed side. Worth checking for on any element EQ'd separately per channel rather than via a linked/mid-side stereo EQ instance. → [[Width and Stereo]], [[Stereo Field]]

## Routed to

- [[Phase Alignment]] (FFT/Nyquist mechanism behind minimum-phase EQ's phase shift)
- [[Width and Stereo]] (EQ-induced Haas-effect image-shift caution)

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=2_v4VrPkzec) — Sage Audio, "How EQ Changes Phase | 1 FREE Mastering SECRET You Need to Know!" (00:10:39)
- Transcript: Whisper (no captions available), 1,395 words, good confidence.
- Full transcript: [[How EQ Changes Phase (transcript)|transcript]]
