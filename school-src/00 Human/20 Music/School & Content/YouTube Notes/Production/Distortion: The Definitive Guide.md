---
briefed: 2026-W34
type: yt-note
date: 2026-08-21
source: youtube
url: https://www.youtube.com/watch?v=lnoMqI8Hodo
channel: Sage Audio
duration: "00:12:41"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, saturation, distortion, harmonics]
---

# Distortion: The Definitive Guide

![](https://www.youtube.com/watch?v=lnoMqI8Hodo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=lnoMqI8Hodo)

## Synopsis

Sage Audio's ground-up theory pass on what distortion actually IS, mechanically — not a plugin walkthrough. Distortion is framed as an ADDITIVE process (a new, equal-and-opposite waveform gets added on top of the original when a clipper shears the peaks), not a subtraction, and that added waveform's relationship to the original — whole-number multiple (a true harmonic) vs. non-whole-number multiple (a disharmonious overtone) — is what determines whether distortion reads as "musical" or "ugly." The video's real payoff for this vault is the symmetrical/asymmetrical framework: symmetrical distortion (both peak and trough shaped identically) generates ODD harmonics only; asymmetrical distortion (peak and trough shaped differently) generates BOTH even and odd harmonics; rectification (one side left alone, the other fully inverted) generates even harmonics only and effectively doubles the oscillation rate, killing the fundamental. Tape, tube, transistor, and clipper all fall into one bucket or the other depending on WHERE in a circuit/algorithm the saturation actually happens — and crucially, this isn't fixed by device type: FabFilter Saturn 2 (owned) reads symmetrical, while Melda Audio's Saturate plugin reads asymmetrical, so two "saturator" plugins can generate structurally different harmonic content even at matched settings.

## Techniques

- **Distortion is additive, not subtractive.** Clipping a sine wave doesn't just cut off the peak — it adds a new waveform equal and opposite to the removed section. That new waveform is a whole-number multiple of the original frequency (a clipped 100 Hz wave adds a 300 Hz component in the worked example) — this whole-number-multiple relationship is literally what a harmonic IS.
- **Harmonic vs. disharmonious overtone — the actual reason some distortion sounds musical and some doesn't.** A harmonic that's a whole-number multiple of the fundamental usually lands on another note in the same key (worked example: C4/261.6 Hz × 3 = 784.89 Hz ≈ G5, a perfect fifth). A non-whole-number multiple (2.3× in the example) lands on a frequency with no relationship to the Western scale — since distortion sums the original and the added waveform, that off-key content plays simultaneously with the in-key material and sticks out as dissonance. **Even-order harmonics are always perfect octaves** (2×, 4×, 8× the fundamental) and therefore always read as musical — this is the actual mechanism behind "even harmonics = warm/musical, odd harmonics = edgy/aggressive," not folklore.
- **Symmetrical vs. asymmetrical distortion — the single most reusable idea in the video.** Symmetrical shaping (identical treatment of the waveform's peak and trough — the video's own clipping example) generates **odd harmonics only**. Asymmetrical shaping (peak and trough treated differently — one soft-clipped, one hard-clipped, or one left alone) generates **both even and odd harmonics**. **Rectification** is a specific asymmetrical case where one side is left completely alone and the other fully inverted — it produces **even harmonics only** and effectively doubles the oscillation rate, which kills the fundamental; rare as a creative effect for that reason, but worth knowing since some plugins do offer it.
- **Which real devices land in which bucket.** **Asymmetrical (even + odd):** tubes, transformers, transistors, guitar amps (a tube/transistor combo), and by extension any compressor/EQ/hardware emulation built from those components. **Symmetrical (odd only):** soft- and hard-knee clippers, tape UPWARD processors/maximizers like [[Oxford Inflator]], and brick-wall limiters. Rectifiers exist as creative plugins too, but in real audio hardware they mostly live in POWER circuits (converting AC to DC) — that wave-shaping happens to the current, not the audio signal, so it's normally inaudible.
- **The symmetrical/asymmetrical bucket is set by the ALGORITHM, not the device category — confirmed with two real owned/wishlist plugins.** [[Saturn 2]]'s saturation reads **symmetrical** (odd harmonics); Melda Audio's Saturate plugin reads **asymmetrical** (even + odd) — same broad "saturator" label, structurally different harmonic output. Also true of a tape machine: saturating the TAPE itself is symmetrical, but if the circuit/amplifier around it uses tubes or transformers, saturating THAT stage is asymmetrical — a single hardware unit can have multiple, differently-behaving saturation points depending on where it's driven.
- **Some saturators generate harmonics that aren't whole-number multiples at all — a third, messier category beyond the even/odd split.** Demoed on the free plugin Plastic Funeral (designed for aggressive/chaotic distortion): its harmonic output includes odd and even content, but ALSO frequencies with no clean relationship to the original waveform — happens when only one section of the oscillation is being shaped, producing content that doesn't correlate to the source. Useful as a diagnostic: if a distortion plugin sounds "chaotic" or "aggressive" rather than "warm" or "edgy," it's likely generating non-integer-multiple content on top of true harmonics.
- **Saturation, wave shaping, and distortion are one continuous mechanism, not three separate effects.** Saturation = a component (tape, a circuit, a digital algorithm) can no longer represent additional input linearly. Wave shaping = the resulting change to the input/output relationship. Distortion = the harmonics that wave shaping generates. You can't have one without the others — they describe different points in the same process, which is why the terms get used interchangeably in practice.

## Routed to

- [[Saturation and Distortion]] (effect page) — the symmetrical/asymmetrical harmonic framework, real-device bucket list, and the confirmation that Saturn 2 vs. Melda Saturate land in different buckets despite both being "saturators"
- [[Saturn 2]] (plugin) — new technique bullet noting its saturation reads symmetrical/odd-harmonic, useful when picking it specifically for an odd-harmonic (edgier/more aggressive) character vs. reaching for an asymmetrical unit for even-harmonic warmth
- [[Plugin Wishlist]] — Melda Audio Saturate added under "From videos (to vet)" as the asymmetrical counterexample to Saturn 2, real technique (confirmed differing harmonic behavior) not just a name-drop

No chain, effect-page-beyond-Saturation, or Sound Palette routing beyond the above — this video is pure theory/mechanism, not a worked chain or settings walkthrough, so Steps 6/7 (wishlist beyond the one plugin, chains) mostly don't apply. No sound-selection or vintage-gear content.

## Source

- [Distortion: The Definitive Guide](https://www.youtube.com/watch?v=lnoMqI8Hodo) — Sage Audio, 12:41
- Transcript source: captions (pinned yt-dlp), high confidence — spoken theory narration throughout, no music-heavy passages to garble.
- Full transcript: [[Distortion: The Definitive Guide (transcript)]]
