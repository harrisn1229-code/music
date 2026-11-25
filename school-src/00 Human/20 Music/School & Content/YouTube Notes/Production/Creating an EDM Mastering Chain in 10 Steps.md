---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=yOJ-EtjFD34
channel: Sage Audio
duration: "00:08:26"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, eq, compression, limiting, width-and-stereo]
briefed: 2026-W33
---

# Creating an EDM Mastering Chain in 10 Steps

![](https://www.youtube.com/watch?v=yOJ-EtjFD34)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=yOJ-EtjFD34)

## Synopsis

A fast, dense 10-step walkthrough of one EDM master from Sage Audio (the same channel behind most of this vault's [[Master Chain]] sourcing) — narrated stage-by-stage over A/B listens rather than taught as theory, so nearly every step reduces to a concrete plugin choice and setting. The chain runs: opening mid/side EQ → a transient/tonal split-EQ pass with per-band mid-side panning → an early mid-side resonance reducer (kick excluded from triggering it) → upward processing (Oxford Inflator) → Fresh Air for top-end harmonics → a mid-frequency upward-compression aux bus → an unusual compress+expand device on the output → hard clipping ahead of the limiters → two limiting stages in series (the second with de-linked L/R channels) → a final EDM-standard loudness target around −6.5 to −6 LUFS. Most of the individual moves corroborate techniques already logged deeply on [[Master Chain]] from other Sage Audio videos, but this one adds a genuinely new plugin (a transient/tonal split-EQ tool, almost certainly Eventide/Soundtheory's **Split EQ**, misheard in captions as "even tied") used with mid-side panning per band — a technique not yet on this vault's existing Split EQ wishlist entry — plus two device identities the captions garble badly enough to flag rather than guess (the mid-frequency aux's "upward compressor" and an output-stage device the narrator calls "the presser," which behaves like a combined compressor/expander and reads as an unusual choice for the genre). Settings throughout are given as starting points, not fixed rules — the video repeats "use your ear" at nearly every stage.

## Techniques

- **1. Opening mid-side EQ pass.** Cut low frequencies from the **side** image, boost around **200 Hz** where the low-order harmonics that matter sit, then a **high shelf on the side image** for extra width up top; separately on the **mid** image, amplify the kick's fundamental, dip a small amount around **250 Hz** (declutters so higher frequencies read louder), and boost around **3 kHz** for the same "read louder" reason — frequencies and Q will vary mix to mix, treat these as a starting point rather than a fixed recipe → [[Width and Stereo]], [[EQ]], [[Master Chain]]
- **2. Split-EQ pass with per-band mid-side panning (new plugin for this vault's wishlist).** A split EQ — captioned "even tied," almost certainly **Eventide/Soundtheory Split EQ** (the same product already logged unowned on [[Plugin Wishlist]]) — separates the mix into transient content (shown green in the plugin) and tonal content (shown blue), amplified independently on the **lows, high-mids, and highs**. With that split made, opened the plugin's mid-side panning section and set it **per band**: on the **lows**, centered the transients (keeps punch mono/club-safe); on the **high-mids**, subtly widened the tonal band only; on the **highs**, centered the transients *and* widened the tonal band a good amount. Result: a noticeably bigger kick impact plus a better width-vs-transient-detail balance in the top end than a single wide-band mid-side move gives. This is a new use case for the plugin beyond the existing wishlist entry's four-zone (mid-tonal/mid-transient/side-tonal/side-transient) description — per-band panning, not just per-band EQ → [[Plugin Wishlist]], [[Width and Stereo]]
- **3. Mid-side resonance reduction, run earlier than usual.** A dynamic resonance suppressor (Soothe2-shaped device, matches [[Soothe2]]'s existing role on [[Master Chain]]) placed right after the opening EQ stage rather than after compression/saturation — reasoning given: catching resonances here also removes ones that later processing would otherwise regenerate. The **kick was excluded from triggering the processor** (a sidechain/detector filter), then very subtle attenuation was pulled from the rest of the spectrum and blended in with the mix dial rather than run 100% wet → [[Soothe2]], [[Master Chain]]
- **4. Upward processing (Oxford Inflator).** Auditioned several upward processors and preferred this one's character for the mix; used an **aggressive Effect %**, compensated by **lowering the Input** slightly, and found the **Band Split** setting with a **slightly higher Curve value** sounded best — "use your ear and find the settings you enjoy," not a fixed recipe → [[Oxford Inflator]], [[Master Chain]]
- **5. Fresh Air for top-end harmonics.** Felt the highs were lacking, so ran the free **Fresh Air** plugin's **two high shelf filters** plus its harmonic-generation stage; used noticeably **more aggressive settings** than typical because "the track called for it" — result: a brighter, more detailed high-frequency range → [[Fresh Air]]
- **6. Mid-frequency upward-compression bus.** Sent to a bus/aux; a **linear-phase EQ** first isolates the mid image across a self-chosen low-mid-to-high-mid range ("include what you feel sounds best," not a fixed crossover); an **upward compressor** on that aux then shrinks dynamic range from the noise floor *up* and from the peaks *down* simultaneously, producing a dense sound, blended back into the mix via the aux track's own channel fader — reads as more dense and upfront. Matches this vault's existing "New York style upward compression, isolated to a mid frequency band" variation on [[Oxford Inflator]]/[[Master Chain]], sourced from a different video — worth treating as corroboration rather than a separate technique. Plugin identity for the upward compressor itself is unclear from captions → [[Oxford Inflator]], [[Master Chain]], [[Parallel Processing]]
- **7. Output-stage compressor/expander ("the presser" — name unclear, flag for verification).** A device the narrator was "worried wouldn't fit the genre since it seems geared more towards Rock," but that worked well anyway: it **compresses the signal above threshold and expands it below threshold in the same unit**. Used **subtle settings and a low ratio** (mastering-appropriate), still landed a noticeable jump in perceived loudness and punchiness, and specifically increased the **kick's impact** while tightening overall dynamic control. Combined compress+expand-in-one is not how any of this vault's owned compressors are typically used — flagged to [[Plugin Wishlist]] rather than matched to an owned plugin → [[Compression]], [[Master Chain]]
- **8. Hard clipping ahead of the limiters.** Before the limiting stages, clip the transients just enough that they generate a touch of **white noise** whenever they cross the threshold. The transient's peak gets controlled, but the added noise makes it still *sound* present — which in turn lets more limiting run later without the transient reading as squashed → [[kHs Clipper]], [[Clipping and Loudness]], [[Master Chain]]
- **9. Limiting stage 1 — Sonnox Oxford Limiter (unowned, matches the existing [[Plugin Wishlist]] entry).** Fast attack, fast release, **no dithering**, **no auto gain compensation**, and about **25% of the Enhance function** dialed in. Enhance's specific job here: bring up quiet detail, including the white noise step 8 just added — the master reads fuller and more aggressive, with loudness gained *without* needing aggressive peak attenuation → [[Plugin Wishlist]], [[Limiting]], [[Master Chain]]
- **10. Limiting stage 2 — a second, dynamic/transient-enhancing limiter, run in series.** For EDM specifically, a second limiter engaged with **oversampling on**, **no look-ahead**, and a **quick attack and release** — the goal is a slight extra loudness bump while keeping the dynamics' impact. **Channels de-linked** so left/right attenuate separately, which the narrator says "brings a little life and variation back into the track" under heavy limiting — corroborates this vault's existing de-linked-channel entries on [[Master Chain]]/[[Pro-L 2]]/[[Width and Stereo]] from other sources, tension flag and all. Final target: **≈ −6.5 to −6 LUFS integrated**, called "pretty standard for EDM" but explicitly adjustable louder or quieter to taste → [[Limiting]], [[Master Chain]], [[Width and Stereo]]

## Routed to

- [[Fresh Air]] — Techniques section added (aggressive-settings top-end harmonic boost)
- [[Oxford Inflator]] — Techniques bullet added (aggressive Effect %, Band Split + Curve)
- [[Soothe2]] — Techniques bullet added (early-chain placement, kick-excluded sidechain)
- [[kHs Clipper]] — Techniques bullet added (clip-to-white-noise before limiting)
- [[Pro-L 2]] — Techniques bullet added (de-linked dual-limiter stage, EDM LUFS target)
- [[Master Chain]] — inline notes at the corrective-EQ, resonance-reduction, upward-processing, clipping, and limiting stages, plus a From videos entry
- [[Plugin Wishlist]] — Split EQ entry extended (mid-side panning per band); Sonnox Oxford Limiter entry extended (fast attack/release, no dither, 25% Enhance settings); new flagged entry for the unidentified output compressor/expander ("the presser")
- [[Width and Stereo]] — From videos bullet added (opening mid-side EQ recipe + split-EQ per-band panning)
- [[Compression]] — From videos bullet added (combined compress/expand output device, general lesson)

## Source

- [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34) — Sage Audio, 8:26
- Transcript: captions, moderate confidence — a couple of plugin names are audibly garbled ("even tied" for what's almost certainly Eventide/Soundtheory Split EQ; "the presser" for an unidentified compressor/expander), flagged inline above and on [[Plugin Wishlist]] rather than guessed.
- Full transcript: [[Creating an EDM Mastering Chain in 10 Steps (transcript)]]
