---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=-op1oR5eSX0
channel: Sage Audio
duration: "00:18:32"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vocal, chain, compression, saturation, de-essing, reverb, delay, eq]
---

# Clean Vocal Chain

![](https://www.youtube.com/watch?v=-op1oR5eSX0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=-op1oR5eSX0)

## Synopsis

A complete, staged, product-and-setting-level lead vocal chain from Sage Audio, built around a stated goal: incredibly detailed, present, and forward, while keeping the performance natural and minimizing audible artifacts. Ten stages across three signal paths — the main channel (phase align → subtractive EQ → compression → disharmonious-frequency transient suppression → de-ess), two auxiliary sends processed in parallel (a controlled fundamental-isolated saturation, and a gated upward-compression mid-detail boost), then a shared bus carrying all three (ear-muscle-modeled multiband compression → room reverb → high-range delay → final additive EQ). Free-plugin alternatives are given at every stage.

## Techniques

- **Stage 1 — Phase alignment before anything else, especially on vocals.** A recording can carry a DC offset from the mic/preamp, shifting peaks/troughs off-center from voltage unity; any threshold-based processor downstream (compressor, saturator, gate) will misread the signal if it's offset. Fix: iZotope RX Standalone's Phase module → "Suggest" — detects and corrects the offset automatically, non-destructively (nothing is removed from the audio, only how accurately downstream processors read it changes). No known free alternative. → [[Phase Alignment]]
- **Stage 2 — Corrective subtractive EQ, three specific moves before any boosting.** High-pass to remove mic/mic-stand resonances; dip ~250 Hz slightly (250 Hz commonly masks 2–5 kHz, where most of a vocal's clarity lives); find the song's key (Tunebat Analyzer or similar) and locate any strong, out-of-key mid-range resonance, then narrow-Q attenuate it by a couple dB; attenuate sibilance in the very top range by 1-2 dB with a bandwidth matched to where the sibilant energy concentrates on a frequency analyzer. Tool: Pro-Q 3/4; free alternative Melda M-EQ (6 bands). → [[EQ]], [[Masking and Carving]]
- **Stage 3 — Compression tuned specifically to avoid transient distortion, with an explicit gain-reduction ceiling.** 2 ms of look-ahead (measures the transient before it hits, so a fast attack can catch the full transient without cutting into and distorting it) + 40-50 ms release (returns to unity quickly without the release-side version of the same distortion) + 4:1 ratio with a soft knee + automatic makeup gain. **Stated ceiling: avoid more than 6 dB of attenuation.** Free-plugin variant (no look-ahead available): Melda M-Compressor with 1.5 ms RMS averaging (smooths erratic triggering), 20 ms attack, 20 ms release (both lengthened specifically to compensate for the missing look-ahead), soft knee widened, 4:1 ratio, same 6 dB ceiling, automatic gain compensation on. → [[Compression]], [[Pro-C 2]]
- **Stage 4 — Dynamically suppress disharmonious (out-of-key) transients with a multiband transient expander/suppressor, rather than removing them statically.** Tool: Newfangled Audio Punctuate (10 bands) set to the song's specific out-of-key frequencies (not the male-vocal preset), in "suppress" mode, attenuating triggered bands by 1-2 dB, measurement set to multiband so each band reacts independently. Use the wet/dry mix to taper the effect until it reads musical rather than processed. No known free multiband-frequency-specific transient suppressor alternative. → [[Multiband Compression]]
- **Stage 5 — Dynamic de-essing as a distinct stage from the static Stage 2 sibilance dip.** Center a band over the sibilant range (same as Stage 2's static dip), set threshold so only sibilance triggers it, quick attack/release (less distortion risk at high frequencies than on lows), attenuate up to ~3 dB, then makeup-gain back up by the same amount to recover the musical highs lost. Tool: Weiss de-esser; free alternatives TDR Sibilance (Tokyo Dawn Labs) or the paid-but-cheap ToneBoosters Sibilance. → [[De-essing]]
- **Stage 6 (parallel aux #1) — Fundamental-isolated saturation to avoid intermodulation distortion.** Saturators generate harmonics (multiples of the fundamental — musical, since ear perceives them as one note) but can ALSO generate intermodulation distortion (unrelated frequencies) if they misread the fundamental — e.g. reading 100 Hz when the real fundamental is 80 Hz can amplify a disharmonious 200 Hz. Fix: send to an aux, use a **linear phase** EQ with steep high-pass + low-pass to isolate just the vocal's fundamental range (a range, since pitch moves), saturate that isolated range only (clean tube setting demoed on FabFilter Saturn 2; free alternative TB Pro Audio GSAT+; free linear-phase EQ options: Logic's stock linear-phase EQ, or LKJB Cuberange), then use a SECOND EQ after the saturator to shape which harmonics come through — e.g. boost a bell around 2 kHz for more harmonic presence, or high-pass out the fundamental entirely to isolate pure overtone/harmonic content. Blend back with the aux channel fader. → [[Saturation and Distortion]], [[Saturn 2]], [[Phase Alignment]]
- **Stage 7 (parallel aux #2) — Gate-then-upward-compress the vocal's mid frequencies for extra detail without raising the noise floor.** Send to a second aux, linear-phase-isolate roughly **400-500 Hz to 5 kHz** with gradual 18-24 dB/octave slopes, insert a gate at roughly **-50 dB threshold** with a soft knee and a touch of look-ahead (FabFilter Gate; free alternative: Melda M-Compressor set to 1:1 ratio + custom shape, dropping amplitude below -50 dB) — the gate exists specifically so the following upward compressor doesn't raise noise-floor hiss along with the mid detail. Then an upward compressor (MV2) raises quiet mid-range content with makeup gain; free alternative Ott (Xfer Records/expert records). Blend with the aux fader. → [[Compression]], [[Masking and Carving]]
- **Stage 8 (shared bus) — Multiband compression modeled on the ear's own acoustic reflex, to add a final natural-feeling dynamic stage.** The stapedius/tensor tympani reflex contracts to protect the eardrum from loud sound, attenuating 1-20 dB depending on intensity, engaging over ~35-40 ms and holding for ~130-150 ms, and acting mainly on **content below 1 kHz**. Modeled directly: isolate a band at 1 kHz and below, attack ~40 ms, release ~150 ms, soft knee, only a couple dB of attenuation (subtle, not obvious), look-ahead and makeup gain OFF (this reflex isn't instantaneous or automatically compensated in real ears). Tool: iZotope's compressor; free alternative TDR Nova. → [[Multiband Compression]]
- **Stage 9 (shared bus) — Room reverb with a deliberately generous pre-delay to preserve the dry attack.** A studio-room emulation (Seventh Heaven Professional by Liquid Sonics demoed — *not owned, see [[Plugin Wishlist]]*; free alternative D-Verb by Stone Voices), mix style blend, **pre-delay of at least 10 ms** so dry vocal transient cuts through before the reflections arrive; on the free alternative, ~1 second decay time with a longer pre-delay and restrained width. → [[Reverb]]
- **Stage 10 (shared bus) — High-frequency-only delay for clarity, explicitly excluding the sibilant range.** FabFilter Timeless (most stock delays fine): 1/8 note on one channel, dotted 1/8 on the other, filtered to only the vocal's clarifying high range — explicitly NOT the sibilant band, since delaying sibilance both amplifies unwanted hiss and exposes the delay's fast attack/decay as an audible artifact rather than a subtle effect. → [[Delay]]
- **Stage 11 (shared bus, final) — Additive-only EQ as the very last stage, shaping everything that came before it (saturation, delay, reverb included).** Worked example: small boost at the fundamental, small dip at 250 Hz (clarity), small boost around 500 Hz (vowel pronunciation), boost the vocal's clarifying **2.5-5 kHz** range. Framed as a starting point, not a fixed recipe — but the placement (dead last, after every other stage) is the actual technique: EQ here reshapes the cumulative sound of the whole chain rather than just the dry vocal. → [[EQ]]

## Routed to

- [[1 Main Vocal Track]] (chain) — full 11-stage chain added inline to `## From videos`, cross-referenced against the existing Illangelo/Greg Wells/Tom Elmhirst entries
- [[Phase Alignment]] (technique) — RX Standalone phase-correction workflow
- [[EQ]] (effect page) — subtractive stage-2 recipe + final additive-only stage-11 placement principle
- [[Compression]] (effect page) — look-ahead-vs-attack-distortion-avoidance recipe, gate-then-upward-compress mid-detail technique
- [[De-essing]] (effect page) — static (Stage 2) + dynamic (Stage 5) two-pass sibilance handling
- [[Multiband Compression]] (effect page) — disharmonious-transient suppression (Stage 4), ear-reflex-modeled bus compression (Stage 8)
- [[Saturation and Distortion]] (effect page) — fundamental-isolated saturation to avoid intermodulation distortion
- [[Reverb]] (effect page) — pre-delay-for-dry-attack technique
- [[Delay]] (effect page) — sibilance-excluded high-range delay
- [[Masking and Carving]] (technique) — 250 Hz-masks-2-5kHz note, gate-before-upward-compression noise-floor discipline

## Source

- [Clean Vocal Chain](https://www.youtube.com/watch?v=-op1oR5eSX0) — Sage Audio, 18:32
- Transcript source: captions, high confidence
- Full transcript: [[Clean Vocal Chain (transcript)]]
