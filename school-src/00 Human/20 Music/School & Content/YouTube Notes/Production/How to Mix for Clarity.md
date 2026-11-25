---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=R-UjkDtleVU
channel: Sage Audio
duration: "00:09:17"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, clarity, eq, saturation, sidechaining, multiband]
---

# How to Mix for Clarity

![](https://www.youtube.com/watch?v=R-UjkDtleVU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=R-UjkDtleVU)

## Synopsis

Ten distinct, mostly quick techniques from Sage Audio for adding perceived clarity to a mix — the throughline is that "clarity" is largely a matter of the ratio between high and low frequency energy, and of reducing low-end overlap between elements that compete for the same space (kick/bass in particular).

## Techniques

- **Saturate or excite specifically the highs, not the whole signal, for clarity via added harmonic distortion.** Harmonic distortion from saturation fills out the high end of the spectrum; a saturator with a dedicated high-frequency-focus control (Baby Audio's Tape "Presence" slider demoed) concentrates the added harmonics into the highs specifically rather than coloring the whole signal. *(Baby Audio Tape not owned — real, reusable technique though; general lesson lands on [[Saturation and Distortion]].)* → [[Saturation and Distortion]]
- **A fast go-to clarity EQ move: boost 3-5 kHz, centered ~4 kHz — a few dB on an individual track, only 1-2 dB on a bus.** This range is where ears are most sensitive; on a full mix bus, keep it subtle (1-2 dB) since the sensitivity means small moves read as large changes at that scale. → [[EQ]]
- **Vintage tape "encoder-without-decoder" trick for brightening vocals/acoustic instruments.** Real tape machines used a noise-reduction encoder (boosts highs before printing to tape, to sit above the tape hiss) paired with a decoder (attenuates highs back down on playback to restore balance). Running only the encoder stage — skipping the decoder — leaves the high-frequency boost applied with nothing pulling it back down, brightening the signal. Works particularly well on vocals and acoustic instruments. → [[Saturation and Distortion]]
- **Reduce kick/bass low-end overlap by notching the kick's own fundamental out of the bass, not the other way around.** Identify the kick's fundamental frequency (read it off a frequency analyzer/response), then create a narrow bell dip on the BASS at that exact frequency — carving room for the kick rather than compromising the kick's tone. A simple, static, always-on alternative to sidechain ducking for this specific overlap. → [[Masking and Carving]], [[Kick Design]]
- **Frequency-specific bass ducking via multiband sidechain compression, instead of full-spectrum bass ducking.** Standard sidechain ducking (stereo/full-band compressor keyed off the kick) attenuates the ENTIRE bass signal every time the kick hits, including parts of the bass that aren't actually competing with the kick. Better: insert a multiband compressor on the bass, sidechain it from the kick, and isolate the ducking band to just the kick's fundamental frequency (same frequency identified in the technique above) — only the competing low-end range ducks, the rest of the bass's tone/dynamics stay untouched by the kick's trigger. → [[Multiband Compression]], [[Sidechaining]], [[Masking and Carving]]
- **High-pass filter placement should respect the lead vocal's own fundamental — rarely set higher than it on the vocal itself, and used strategically on COMPETING elements instead.** Rule of thumb: don't high-pass a lead vocal above its own fundamental frequency (removes the vocal's own low-end body). When synths/guitars are crowding a vocal, high-pass THEM to just above the vocal's fundamental instead, opening room without thinning the vocal itself. → [[EQ]], [[Masking and Carving]]
- **Modulated high-frequency saturation: trigger saturation on the highs specifically from transients, for a pop that plain static high-frequency saturation doesn't give.** Saturn 2 (owned) — build an envelope follower in Transient mode, attach it to the Drive parameter, and isolate the saturation to the high frequencies; the incoming transient now determines how much high-frequency distortion is triggered moment to moment, making transients "pop" more than a static high-shelf saturation setting. Called out as one of very few plugins offering this specific modulation routing. → [[Saturn 2]], [[Saturation and Distortion]]
- **High-frequency-only transient expansion for extra clarity on drums/guitars/synths — deliberately avoided on vocals.** A frequency-specific transient expander isolated to the highs increases both dynamic range and perceived clarity; works well on drums, guitars, synths, but risks making vocal sibilance more aggressive, so it's skipped there specifically. → [[TRANSIENT Slot]]
- **"Ultimate mix bus air trick": a parallel linear-phase air-boost send with upward compression, not a static EQ boost on the main bus.** On a send/bus carrying a copy of the full mix: linear-phase EQ with a high-Q shelf drastically boosting above ~12 kHz while attenuating everything below (linear phase specifically to avoid phase cancellation when blending this send back against the original), then a low-latency upward compressor to bring the QUIETEST air-range details forward, blended in via the send's channel fader. Distinguishes "air" (frequency-specific, above ~12 kHz) from "clarity" (broader 3-5 kHz sensitivity range) as related but separate goals. → [[EQ]], [[AIR Slot]], [[Compression]]
- **Dynamic mid-frequency EQ (an "intelligent"/dynamic EQ, isolated to the mids) plus external sidechain, for clarity via real-time de-masking rather than a static cut.** Worked example: on a vocal bus, isolate a dynamic EQ band to the mids, sidechain it from the instrument bus, subtle settings — the vocal's mids duck only when the competing instrument content is actually present. Soothe2 (owned) offers the same external-sidechain de-masking approach as a resonance suppressor rather than a dynamic EQ band — demoed on bass, sidechained from the kick, as a lows-focused alternative to the multiband-ducking technique above. → [[Soothe2]], [[Sidechaining]], [[Masking and Carving]]

## Routed to

- [[EQ]] (effect page) — 3-5 kHz clarity boost, vocal-fundamental-aware high-pass placement, linear-phase air-send trick
- [[Saturation and Distortion]] (effect page) — high-frequency-focused saturation for clarity, tape encoder-without-decoder brightening trick
- [[Saturn 2]] (plugin) — transient-triggered high-frequency saturation via envelope follower on Drive
- [[Soothe2]] (plugin) — external-sidechain de-masking on bass/kick, as a lows-focused variant of its existing vocal use
- [[Multiband Compression]] (effect page) — frequency-specific sidechain bass ducking
- [[Sidechaining]] (technique) — multiband + dynamic-EQ sidechain de-masking approaches
- [[Masking and Carving]] (technique) — kick-fundamental-notch-in-bass, vocal-fundamental-aware high-pass placement
- [[Kick Design]] (technique) — identifying the kick's fundamental as the basis for the bass notch

## Source

- [How to Mix for Clarity](https://www.youtube.com/watch?v=R-UjkDtleVU) — Sage Audio, 9:17
- Transcript source: captions, high confidence
- Full transcript: [[How to Mix for Clarity (transcript)]]
