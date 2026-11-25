---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=L_MSH8_HCek
channel: Sage Audio
duration: "00:12:33"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, compression, loudness, distortion, multiband]
---

# The Science of Perfect Compression

![](https://www.youtube.com/watch?v=L_MSH8_HCek)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=L_MSH8_HCek)

## Synopsis

Sage Audio grounds compression in three underlying mechanisms: the logarithmic (not linear) nature of dB and why that makes 6 dB the real threshold for "noticeable" attenuation; the real purpose of compression (creating headroom to reveal whatever's sitting in the quiet range — good detail or unwanted noise, indiscriminately); the fact that a fixed dB of attenuation has a wildly different loudness-metric impact depending on which frequency it's applied to; and harmonic distortion as an inherent, controllable byproduct of every compressor, not just saturators.

## Techniques

- **6 dB is the real threshold for "noticeably attenuated" in a digital system — because dB FS is logarithmic, not linear.** Every 6 dB full-scale change doubles or halves both the actual sample amplitude and the perceived loudness — a signal attenuated by "only" 6 dB has actually had its perceived loudness and amplitude cut in half. Useful as a sanity check when judging whether a compression setting is subtle or drastic: don't eyeball the dB number the way you'd eyeball a linear percentage. → [[Compression]]
- **The real purpose of compression isn't peak reduction — it's creating headroom so post-compression makeup gain can reveal whatever is sitting in the quiet range, for better or worse.** Attenuating peaks creates distance between the noise floor and 0 dB; makeup gain then raises everything, including previously-masked quiet content. What's actually in that quiet range determines the outcome: genuine detail reads as "upfront," reverb tails read as "farther away," and recording noise/hum reads as louder noise/hum. Direct implication: **recording problems get emphasized by mixing, and mixing problems get emphasized by mastering** — compression amplifies whatever's already there rather than fixing it. → [[Compression]], [[Gain Staging]]
- **A fixed dB of attenuation changes a track's perceived loudness (LUFS) far more when applied near ~3.5 kHz than at ~30 Hz — a mastering-relevant multiband lever.** LUFS metering already weights frequencies by perceptual loudness, so −10 dB FS at 3.5 kHz reads far louder than −10 dB FS at 30 Hz at identical amplitude. On a *simple* signal, attenuating either frequency by a fixed dB amount reduces LUFS by roughly the same amount — but on a *complex, full track*, cutting 3.5 kHz (a major contributor to perceived loudness) drops overall LUFS far more than cutting 30 Hz by the same dB, because 3.5 kHz contributes disproportionately to the track's total perceived loudness in the first place. Practical use: to reduce a mix or master's perceived loudness/LUFS with minimal audible change, target attenuation toward the ~2-5 kHz region rather than the sub, using a multiband compressor with a band centered there. → [[Multiband Compression]], [[Clipping and Loudness]]
- **Every compressor introduces harmonic and intermodulation distortion when triggered — not just saturators — and the amount is controllable via several parameters at once.** Demoed on Pro-C 2 with a −10 dB 100 Hz sine wave: distortion is near-imperceptible until the threshold starts being crossed, then THD rises with the amount of gain reduction before leveling off. Independent levers that change the THD amount at the SAME gain reduction: **knee shape** (soft knee measurably reduces THD vs. hard knee, even with more total attenuation), **compressor type/algorithm** (character units distort more by design), **attack/release speed** (faster attack/release cuts into the waveform before a full oscillation completes, generating harmonics — the same mechanism as the attack/release-vs-oscillation-period rule for clean compression), **source frequency** (a higher input frequency completes more oscillations within the same attack/release window, so proportionally less of each individual cycle gets cut into, meaning less THD), and **look-ahead** (letting the compressor see the signal ahead of time lets it attenuate without cutting into the waveform at all, removing most of this distortion). Net point: a compressor shapes tone/timbre through this distortion mechanism in addition to shaping loudness via attenuation and makeup gain. → [[Pro-C 2]], [[Compression]]

## Routed to

- [[Compression]] (effect page) — 6 dB logarithmic-threshold framing, compression's real purpose (headroom → makeup gain reveals whatever's quiet), harmonic-distortion parameter list
- [[Multiband Compression]] (effect page) — frequency-weighted LUFS impact as a targeted loudness-reduction lever
- [[Clipping and Loudness]] (technique) — frequency-weighted perceived-loudness note for mastering decisions
- [[Gain Staging]] (technique) — headroom-then-makeup-gain framing
- [[Pro-C 2]] (plugin) — knee/attack/release/look-ahead THD demo, reusing the plugin already enriched with the Punch-vs-Mastering algorithm comparison

## Source

- [The Science of Perfect Compression](https://www.youtube.com/watch?v=L_MSH8_HCek) — Sage Audio, 12:33
- Transcript source: captions, high confidence
- Full transcript: [[The Science of Perfect Compression (transcript)]]
