---
briefed: 2026-W34
type: yt-note
date: 2026-08-21
source: youtube
url: https://www.youtube.com/watch?v=V1lZaf8NWd0
channel: Sage Audio
duration: "00:11:51"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, compression, saturation, parallel-processing, stereo]
---

# 5 Advanced Compression Techniques (Simple to Complex)

![](https://www.youtube.com/watch?v=V1lZaf8NWd0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=V1lZaf8NWd0)

## Synopsis

Five compression ideas ordered from simple to genuinely speculative, closing with an open question the presenter admits he hasn't solved. The two most concrete and reusable: (1) using a compressor with **no measured gain reduction at all** purely for its harmonic/timbral character (the Omnipressor and Molot at 1:1/no-attenuation settings both still color a signal), an analog-mastering-era habit most digital compressors can't replicate; and (2) a genuinely novel "parallel harmonic compression" recipe — boost a song's root note and its perfect fifth with a linear-phase EQ BEFORE a heavy parallel-compression stage, so the resulting harmonic distortion lands on in-key content, then attenuate those same two frequencies back down afterward. Also covers gain-riding parallel compression (automating a parallel bus's level section-by-section to control pumping), why decorrelated stereo highs generate worse lossy-codec artifacts, and a speculative FFT-bin-rearrangement idea for gate-free noise reduction.

## Techniques

- **Compress with a real character unit at effectively zero gain reduction, purely for the harmonic/timbral shift — an analog-mastering habit most digital compressors can't replicate.** The Omnipressor (Eventide, unowned) at a **1:1 ratio with no measured compression or expansion** still generates a strong **third-order harmonic** and noticeably maximizes the signal via its input/output stages — used to prepare a track's level and character for the next processor without touching dynamics. Molot (Tokyo Dawn Labs, free, unowned) at no measured attenuation introduces something like a **6 dB/octave high-pass** that's subtle enough for mastering (~0.5 dB attenuated at 50 Hz), boosts everything above 200 Hz by ~0.2 dB and the air region by ~0.3 dB, while generating aggressive even+odd harmonics at high amplitude. The reusable idea beyond either specific plugin: reach for a "great-sounding compressor" purely for its color even when the track doesn't need gain reduction — a use case most modern digital compressors don't support well. → [[Compression]], [[Compression Staging]], [[Plugin Wishlist]]
- **Gain-riding parallel compression — automate the parallel bus's own level per song section instead of leaving it static.** Aggressive parallel compression isn't set-and-forget: pumping reads as more or less noticeable depending on instrumentation at different points in a song. Dial in the parallel-compression settings, listen start to finish, note WHERE pumping is audible, then either automate the compressor's output gain down in those sections, or (if it's on an aux/return track) automate the channel fader there instead. Workflow tip: use the compressor/automation LATCH function and manually ride the aux fader live while the song plays for a first pass, then switch the automation to "read" so the natural human inconsistencies of that live ride stay in — more character than a perfectly smoothed curve. → [[Parallel Processing]], [[Automation]]
- **"Parallel harmonic compression" — boost the song's root note and its perfect fifth before heavy parallel compression, so the resulting distortion harmonics land in-key, then pull them back down after.** A genuinely buildable recipe: on a parallel/aux track, insert a linear-phase EQ FIRST and find the song's fundamental (its key's root note — read off an analyzer as the highest-amplitude low frequency if unsure), boost it aggressively with a bell filter (the boost gets compensated later, so don't hold back). Also find and boost the **perfect fifth** of that root (ratio trick: root Hz × 3 ÷ 2 = the fifth — e.g. 55 Hz root → 165 ÷ 2 = 82.5 Hz, the fifth). THEN insert the parallel compressor and compress heavily — because the boosted content is now in-key, the compressor's wave-shaping distortion is far more likely to generate harmonics that are musically related to the song, instead of harmonics keyed off an arbitrary transient/sibilant peak. Close the chain with a SECOND linear-phase EQ that attenuates the root and fifth back down until balanced — an emphasis/de-emphasis technique for more musical parallel-compression harmonics. → [[Parallel Processing]], [[EQ]], [[Compression]]
- **Decorrelated stereo highs generate worse lossy-codec (MP3/AAC) artifacts than correlated ones — a real cost of aggressive high-frequency stereo widening.** Lossy encoding relies heavily on attenuating high frequencies to shrink file size. When high-frequency artifacts land IDENTICALLY on left and right (correlated), they're more easily masked by other high-energy centered content; when they land only on the SIDE image (decorrelated — e.g. after a stereo-expander plugin widens the highs), there's much less to mask them, and the side image's own spatial/directional cues make the artifacts stand out more. Stereo expansion is fine within reason, but the more high frequencies get decorrelated, the more aggressive lossy-encoding artifacts become on release. → [[Width and Stereo]], [[Mix Handoff]]
- **Speculative: rearranging FFT bins by amplitude (not just frequency) could make dynamics processing (compression, gating, expansion) surgically precise without a threshold function — an open question, not a working technique.** An FFT editor (iZotope RX) already maps bins by time (X) and frequency (Y), with color as amplitude — vastly more precise than traditional EQ for targeted amplitude changes. The speculative idea: keep time on the X-axis but make the Y-axis AMPLITUDE instead of frequency, since amplitude data is already known and mappable — then a dynamic-range slice (e.g. everything between −40 dB and −80 dB) could be selected and reduced regardless of whether a performance is present, avoiding the artifacts/attack-release fussiness of a traditional gate. Logged as food for thought, not a built workflow — no plugin currently does this. → [[RX Spectral Editor]]

## Routed to

- [[Plugin Wishlist]] — Eventide Omnipressor (zero-GR character use) and Tokyo Dawn Labs Molot (free, zero-GR character use) added under "From videos (to vet)"
- [[Compression]] (effect page) — new bullet on compressing purely for harmonic character at 1:1/no-GR, cross-linked to Compression Staging
- [[Parallel Processing]] — two new bullets: gain-riding automation for parallel-comp pumping, and the full "parallel harmonic compression" root+fifth recipe
- [[Width and Stereo]] — new bullet on decorrelated-highs lossy-artifact cost, cross-linked to Mix Handoff (a delivery-format consideration)
- [[Mix Handoff]] — cross-linked, decorrelation as a translation/delivery concern
- [[RX Spectral Editor]] (plugin) — cross-linked as the owned tool the speculative FFT-bin-rearrangement idea would extend, logged as a "watch this space" note rather than a built technique

No chain integration this pass — none of the five ideas map onto a specific device chain stage; the root+fifth parallel-compression recipe is a standalone aux-track build, closer to a technique than a chain, so it lives on [[Parallel Processing]] rather than a new [[FX Chain System]] entry.

## Source

- [5 Advanced Compression Techniques (Simple to Complex)](https://www.youtube.com/watch?v=V1lZaf8NWd0) — Sage Audio, 11:51
- Transcript source: captions (pinned yt-dlp), high confidence for the spoken narration; recurring short music-demo passages (before/after compression A/Bs on a vocal loop) were skipped rather than transcribed as song audio.
- Full transcript: [[5 Advanced Compression Techniques (Simple to Complex) (transcript)]]
