---
briefed: 2026-W34
type: yt-note
date: 2026-08-21
source: youtube
url: https://www.youtube.com/watch?v=pzEG3HxI3WE
channel: Sage Audio
duration: "00:09:52"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vocal, mono, de-essing, saturation, eq, referencing]
---

# Perfecting Vocals on Modern Playback Systems

![](https://www.youtube.com/watch?v=pzEG3HxI3WE)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=pzEG3HxI3WE)

## Synopsis

A translation-focused vocal video: why vocals sound worse on earbuds/portable speakers, and four concrete fixes. The throughline is that modern playback hardware REMOVES things a vocal used to get for free from older, less-precise systems — mono fold-down loses stereo vocal FX, earbuds bypass the outer ear's natural diffusion (making sibilance land raw), and low-distortion drivers (a marketed positive) mean the pleasant in-key harmonic coloration a vintage tube amp used to add automatically now has to be put there deliberately. The most actionable finding is the AirPods air-frequency measurement: Adaptive EQ dips 11 kHz+ by roughly 10 dB, so boosting vocal air above 10 kHz is worth doing for earbuds translation — but ONLY with an exciter (Fresh Air specifically named and owned) rather than a plain EQ boost, since EQ would also raise the noise floor an exciter's added harmonics mask instead.

## Techniques

- **Check stereo vocal-effects mono compatibility with MSED before committing.** Most phone/portable speakers sum L/R to mono, discarding the SIDE image — lead vocals are usually mono already so this rarely matters directly, but stereo vocal effects (reverb, delay, micro-pitch shift, chorus) live partly or wholly in the side image and get thinned or lost on fold-down. Test method: send the stereo effect via an aux/return, insert the free plugin MSED on the return to mute the side image, and listen to what survives — applies to any stereo instrument, not just vocals. Keep the vocal's own core effects at least partially centered so loudness doesn't collapse on mono playback. → [[Width and Stereo]], [[Referencing and Translation]], [[Plugin Wishlist]]
- **Earbuds amplify sibilance two ways: frequency response AND bypassing the outer ear's natural diffusion — de-ess harder, or edit with an FFT tool instead.** (1) Earbud frequency response (measured on 3rd-gen AirPods) significantly amplifies the high-mid/presence range right around and above the vocal's clarity formant — good for intelligibility, but the same boost extends into the sibilant range and reads harsh unchecked. (2) Earbuds physically bypass the pinna (outer ear), so the natural shaping/diffusion a room or car cabin would normally apply to sibilant energy — plus all room reflections — never happens; sound is delivered straight into the ear canal, making sibilance read as more "internal"/harsh than it would through speakers. Fix: use a de-esser, or for finer control, edit sibilance directly with an FFT editor ([[RX Spectral Editor]]) rather than a threshold-based dynamics processor. → [[De-essing]], [[RX Spectral Editor]]
- **Modern low-distortion playback is a translation problem, not a feature — reintroduce in-key harmonic content deliberately, isolated to the fundamental.** Low-THD playback systems (Apple earbuds specifically named) don't add the pleasant in-key harmonic coloration a classic tube amp used to supply automatically — a tube's characteristic 2nd-order harmonic is an exact octave of the fundamental, always in-key, and improves the ratio of musical-to-unmusical overtones in a vocal, reading fuller/more complex. If the playback system won't add this, the mixer has to. Use a MULTIBAND saturator and isolate the saturation to the vocal's fundamental specifically — this avoids intermodulation distortion and keeps the added harmonics tied to in-key content, rather than saturating the whole signal (which distorts according to whatever the peak happens to be). → [[Saturation and Distortion]], [[Pitch and Formant]]
- **AirPods measurably lack "air" above ~11 kHz — boost it with an EXCITER, not a plain EQ boost, and control the noise floor first.** Measured AirPods response dips roughly **10 dB SPL** starting around **11 kHz** with Adaptive EQ enabled (no way to disable it); a portable speaker (JBL Flip cited) is a little better but still drops a couple dB before cutting out entirely above 17 kHz. Laptop speakers are the one common modern playback system that doesn't roll off the highs. Unless a track is headed mainly to laptop speakers, boosting the vocal above **10 kHz** is worth it for earbud/portable-speaker translation — but boosting there with a plain EQ also raises the perceived NOISE FLOOR if the recording has any. Sequence: (1) confirm a low-noise source recording, (2) check that nothing in the chain is adding noise by default (Waves plugins specifically flagged as having noise enabled by default in some units), (3) if noise persists and re-recording isn't possible, use [[RX Spectral De-noise]] or similar RX tooling to surgically remove it first, (4) THEN reach for an exciter — **[[Fresh Air]] (Slate Digital, owned, free)** — rather than a plain EQ boost, because the exciter's generated harmonics psychoacoustically LOWER the perceived noise floor through masking, where a plain EQ boost raises the noise right along with the signal. → [[Fresh Air]], [[EQ]], [[RX Spectral De-noise]], [[AIR Slot]]

## Routed to

- [[Width and Stereo]] — cross-linked, mono fold-down check for stereo vocal FX (companion to the existing mono-compatibility rules on that page)
- [[Referencing and Translation]] — cross-linked, MSED mono-check method added as a specific vocal-FX translation test
- [[De-essing]] (effect page) — new bullet: earbud-specific sibilance mechanism (frequency response + bypassed pinna diffusion), de-esser or FFT-editor fix
- [[RX Spectral Editor]] (plugin) — new technique bullet: manual sibilance editing as an FFT-editor alternative to a de-esser, specifically for earbud translation
- [[Saturation and Distortion]] (effect page) — new bullet: reintroducing in-key 2nd-order-harmonic warmth on a vocal via multiband saturation isolated to the fundamental, to compensate for low-THD modern playback
- [[Fresh Air]] (plugin) — new technique bullet: using it specifically as the AirPods-air-frequency fix (boost above 10 kHz via exciter, not plain EQ, so harmonics mask rather than raise the noise floor)
- [[EQ]] (effect page) — cross-linked, why a plain boost is the wrong tool here vs. an exciter
- [[RX Spectral De-noise]] (plugin) — cross-linked as the recommended noise-cleanup step before boosting vocal air
- [[Plugin Wishlist]] — MSED (free mono-check utility) added under "From videos (to vet)"

## Source

- [Perfecting Vocals on Modern Playback Systems](https://www.youtube.com/watch?v=pzEG3HxI3WE) — Sage Audio, 9:52
- Transcript source: captions (pinned yt-dlp), high confidence for the spoken narration; recurring short music-demo passages (a vocal loop A/B'd across the mono/sibilance/harmonic examples) were skipped rather than transcribed as song audio.
- Full transcript: [[Perfecting Vocals on Modern Playback Systems (transcript)]]
