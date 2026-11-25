---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=xA2J2TpfoD4
channel: Sage Audio
duration: "00:11:54"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, compression, distortion, thd]
---

# The CLEANEST Compression Possible (not clickbait)

![](https://www.youtube.com/watch?v=xA2J2TpfoD4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=xA2J2TpfoD4)

## Synopsis

Sage Audio investigates why some compressors introduce far less harmonic distortion (THD) than others at the same settings, landing on the Hilbert transform (a more accurate way of measuring a waveform's amplitude/frequency/phase than standard level detection) as the mechanism behind ToneBoosters' unusually clean "Punch" algorithm. Along the way it gives a concrete, usable rule for why fast attack/release times distort low frequencies, and compares several real compressors (Pro-C 2, Weiss DS1 MkII) on cleanliness.

## Techniques

- **The core distortion rule: attack/release times shorter than a frequency's own oscillation period will distort that frequency.** A wave's period in seconds = 1 ÷ frequency — an 80 Hz wave completes one oscillation every ~12.5 ms. A compressor attenuating faster than that (attack or release under ~12.5 ms) cuts into the wave mid-oscillation, and the differential between the original and reshaped wave generates new harmonic content (multiples of the original frequency). Lower frequencies (longer periods) are more vulnerable to this than highs. Practical rule of thumb: **for a genuinely transparent compress on a given frequency, keep attack and release times longer than that frequency's oscillation period** — worked example in the video uses attack >10 ms / release >50 ms as a clean-sounding starting point on a full mix. → [[Compression]], [[Compression Staging]]
- **Hilbert transform = the accuracy mechanism behind unusually low-THD compressors — worth knowing as a distinguishing feature to listen/read for, not something to tune yourself.** A standard level detector estimates a waveform's amplitude with some measurement error, and that error itself becomes distortion; the Hilbert transform (rotating a signal's phase 90° to derive the "imaginary" component needed for exact amplitude/frequency/phase math) measures far more accurately, closer to FFT-editor precision but at negligible latency (ToneBoosters compressor needs only ~144 samples at 48 kHz, ~3 ms). ToneBoosters' developer confirmed Hilbert transforms are core to their low-THD "Punch" algorithm. Not something to configure — a plugin either uses this kind of accurate measurement or it doesn't; it's a reason a specific plugin/algorithm sounds cleaner than another at identical settings. → [[Compression]]
- **Pro-C 2's Punch algorithm at 12 ms attack / 50 ms release measured -37 dB THD on an 80 Hz test tone — deliberately introduced coloration, likely by design.** Switching Pro-C 2 to its **Mastering algorithm** drops THD to roughly the ToneBoosters level, but the Mastering algorithm introduces significant distortion at extreme low and high frequencies **when oversampling is off** — turn oversampling on for a genuinely clean result at the frequency extremes. Actionable takeaway for a "transparent" bus/master compress: Pro-C 2 Mastering algorithm + oversampling on, rather than Punch. → [[Pro-C 2]], [[Compression]]
- **A compressor can sound great while measurably NOT being clean — the Weiss DS1 MkII is the named example.** Its character/distortion is significant enough that the video explicitly advises against it for mastering-style "alter the signal as little as possible" applications, even though it's a well-regarded unit — a reminder that "sounds good" and "measures transparent" are different axes, and the choice between them is a deliberate one, not an oversight. → [[Compression]]
- **Phase rotation from a Hilbert-transform detector is inaudible as long as it's applied identically to both channels** — the same logic as why inverting a mix's polarity (a 180° rotation) is inaudible in isolation: amplitude and frequency are unchanged, only phase angle, and mastering engineers already routinely rotate phase for peak/trough alignment before a processor. Addressed here mainly to preempt a "does this secretly smear the stereo image" concern about Hilbert-based detectors — it doesn't, so long as L/R are processed identically.

## Routed to

- [[Compression]] (effect page) — the attack/release-vs-oscillation-period distortion rule, Hilbert transform accuracy explanation, Weiss DS1 MkII character-vs-transparency callout
- [[Pro-C 2]] (plugin) — Punch vs. Mastering algorithm THD comparison + oversampling recommendation for a genuinely transparent compress

## Source

- [The CLEANEST Compression Possible (not clickbait)](https://www.youtube.com/watch?v=xA2J2TpfoD4) — Sage Audio, 11:54
- Transcript source: captions, high confidence
- Full transcript: [[The CLEANEST Compression Possible (not clickbait) (transcript)]]
