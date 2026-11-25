---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=jkJVim4X9C4
channel: Anthony Marinelli Music
duration: "00:15:38"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, bass-design]
---

# How I Programmed Michael Jackson's "Thriller" Bass on my Tonus ARP 2600

![](https://www.youtube.com/watch?v=jkJVim4X9C4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=jkJVim4X9C4)

## Synopsis

The title-track "Thriller" bass on the actual ARP 2600 (Tonus/Moog-ladder-filter variant) used on the original session, then A/B'd against a Minimoog and an Arturia ARP 2600 V emulation — a rich patch with several genuinely reusable techniques, plus a real comparative finding about single- vs. multi-trigger instrument behavior.

## Techniques

- **Modulate pulse width AT THE SAME RATE as the filter envelope (not an independent LFO) so pulse width — and therefore harmonic content — shifts once per note, in sync with that note's own envelope trajectory, rather than as a constant ambient wash.** Patched from the same ADSR that drives the filter into oscillator 2's PWM input; described as an "inner growl" that moves with each note (compared directly: static square wave = "kind of a house bass," same wave with envelope-synced PWM = "more like a Fender bass" with a moving, breathing harmonic character). Distinct from the usual LFO-driven PWM chorusing technique elsewhere on this channel — here the modulation source is the AMPLITUDE/FILTER envelope, not a free-running LFO, so the effect is tied to note articulation rather than a constant rate.
- **Deliberately set the filter envelope's decay LONGER than the bass part's actual note durations — so full decay is never heard during normal playing, but held/long notes reveal it — as a substitute for velocity/aftertouch on an instrument that has neither.** On hardware with no velocity or pressure sensing, this gives the part an expressive dynamic range anyway: short, rhythmic notes get cut off mid-decay (bright, punchy), while a sustained note is allowed to fully open up — the same patch reads differently depending purely on how long a note is held, which functions as an expression parameter in place of velocity.
- **Add a sine wave from a spare oscillator directly into the filter mix, purely to reinforce low-end fundamental without changing the main timbre** — a targeted low-end boost technique distinct from EQ, injected at the synthesis stage before the filter shapes everything together.
- **A genuine instrument-choice tradeoff, demonstrated directly: multi-trigger (ARP 2600) vs. single-trigger (Minimoog) behavior changes what a legato bassline sounds like.** On the ARP, every new note retriggers its envelopes even when played connected/overlapping; on the Minimoog, holding one note and playing another does NOT retrigger — some notes get audibly "missed"/smoothed together instead of individually articulated. Neither is wrong, but they produce different results on the same fast, connected bass part — check which behavior a part actually needs before assuming either instrument is a drop-in substitute for the other.
- **Software emulation caveat, stated plainly**: an emulated ARP 2600 (Arturia) can replicate the full patch-routing potential, but specific filter circuit revisions differ even across REAL ARP 2600 hardware generations (early Moog-ladder-filter units vs. later models where it was removed) — know which physical unit a reference recording actually used before assuming any 2600 (real or emulated) will match it exactly.

## Routed to

- [[Bass Design]] — new bullet on envelope-synced PWM (vs. LFO-driven), and using envelope decay duration as an expression substitute on non-velocity-sensitive instruments.
- [[Envelopes and ADSR]] — cross-linked for the decay-longer-than-the-part technique.
- [[Voice Architecture]] — cross-linked for the multi-trigger vs. single-trigger legato comparison.

## Source

- [How I Programmed Michael Jackson's "Thriller" Bass on my Tonus ARP 2600](https://www.youtube.com/watch?v=jkJVim4X9C4) — Anthony Marinelli Music, 15:38. Captions, high confidence.
