---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=YJVE4_CQ9Ts
channel: Sage Audio
duration: "00:09:31"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, loudness, limiting, clipping, saturation, eq]
briefed: backlog
---

# Mastering Loud But Not Squashed

![](https://www.youtube.com/watch?v=YJVE4_CQ9Ts)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=YJVE4_CQ9Ts)

## Synopsis

A tight, chapter-by-chapter Sage Audio rundown of how to make a master sound loud without smashing it flat — the same "loud but not squashed" thesis that runs through this channel's longer mastering videos ([[Master Chain]] already carries several), condensed here into eight quick mistakes-and-fixes. The throughline: loudness is mostly won *before* the limiter (EQ for perceived loudness, the right saturation flavor, upward processing that lifts quiet detail instead of shaving peaks, correct oversampling/linear-phase choices, a sane normalization target), and the limiter's own job should be small and specific once it gets there. Two ideas here are genuinely new against what's already logged on this vault's mastering notes: an **unlinked left/right dual-mono limiting** approach (a direct counterpoint to the "keep channels linked" research already on [[Master Chain]] and [[Width and Stereo]]) using the Sonnox Oxford Limiter's Enhance function, and a contrarian take that **true-peak limiting mode itself should be avoided** — monitor true peaks and pull the ceiling down manually instead of running the limiter in TP mode. Also useful: a plain-language mechanism for *why* clipping doesn't just add loudness but helps the ear track transients (adds high-frequency noise that functions like an exciter), and a clear statement of *why* 250 Hz gets cut and 3–5 kHz gets boosted on a loudness-focused EQ pass (ear sensitivity + 250 Hz's outsized masking effect on that exact band).

## Techniques

- **The core mistake: over-relying on the limiter.** The harder a signal gets pushed into a limiter, the quieter it actually reads in the long run — worse still once the master gets normalized (streaming/YouTube). Everything else in the video is really "what to do instead of just cranking the limiter."
- **Perceived-loudness EQ move: boost ~3–5 kHz, cut ~250 Hz.** Ears are most sensitive around 3–5 kHz (subtly boosting it reads as louder without more level), and 250 Hz has the strongest masking effect on that same 3–5 kHz band — attenuating 250 Hz reduces that masking and lets the 3–5 kHz range come through more clearly, which also reads as louder. Both moves stacked together audibly increase perceived loudness with no added gain. → [[Masking and Carving]], [[EQ]]
- **Saturator selection for loudness: pick one that emphasizes mids/highs, stays subtle on the lows.** Saturation's harmonics land in specific frequency ranges depending on the unit — for a loud master, want a saturator whose harmonic emphasis sits in the mids/highs (the range the EQ move above already targets) rather than piling more harmonic content into the low end. Demoed on a **PSP saturator** (unowned — general PSP-brand mention, exact model unclear from captions, distinct from the already-wishlisted PSP Vintage Warmer 2's knee function). **Always enable oversampling, and the smoothing function if available, to avoid aliasing.** → [[Saturation and Distortion]]
- **Upward processing (maximization / upward compression / inflating) captures quiet detail and amplifies it — the non-destructive alternative to downward compression for a loud master.** This is mechanically what aggressive limiting is *trying* to accomplish, but without sacrificing peaks — used too aggressively it still costs dynamics, but it's the better starting tool than reaching straight for downward compression when mastering for loudness. → [[Oxford Inflator]], [[Clipping and Loudness]]
- **Compression mistakes for a loud master: no look-ahead, no long release time, don't heavily compress at all.** Compression mostly doesn't help much when mastering for loudness, outside of a corrective role (de-essing). The one deliberate exception: **subtle mid-side compression for dynamic stereo expansion** (compressing the mid image more than the side reads wider) — everything else about compression on a master risks working against loudness, not for it. → [[Compression]], [[Width and Stereo]]
- **Linear phase and oversampling both affect final loudness — for different mechanical reasons.** Linear-phase processing should generally be avoided (outside parallel processing) because of how it smears transients — the more latency/pre-ringing, the more pronounced the loss. Oversampling reduces aliasing distortion; aliasing distortion causes **phase cancellation in the highs**, which quietly costs loudness two ways at once — attenuating important high-frequency content directly, and lowering overall level through destructive interference. → [[Phase Alignment]]
- **Normalization strategy: don't master TO −14 LUFS — master a little above it.** Streaming platforms (YouTube, Spotify, etc.) normalize to roughly −14 LUFS; mastering directly to that number is a common mistake (self-admitted). A master pulled up to roughly **−10 to −9 LUFS** using upward processing plus thoughtful limiting still sounds louder than a −14 LUFS master *even after* normalization, because the quiet detail pushed forward stays audible post-normalization — but only if dynamics weren't destroyed getting there; a smashed master doesn't get this benefit regardless of its pre-normalization LUFS number. → [[Clipping and Loudness]]
- **Dual-mono (unlinked L/R) limiting — separate the signal into left and right channels, insert identical limiters on each, unlinked.** Each limiter then only attenuates when *its own* channel crosses threshold, rather than both channels ducking together (similar to running channel link low/off) — this lets the signal push to a noticeably higher level while still avoiding aggressive attenuation, since a loud moment on one side no longer forces gain reduction on the quieter side too. Named specifically effective with the **Sonnox Oxford Limiter**, using its **Enhance function** to amplify quieter details alongside the peak-down limiting itself. *(Note: this runs counter to the linked-channel research already logged on [[Master Chain]] and [[Width and Stereo]] — commercial masters keep L/R RMS within 0.8 dB of each other, and unlinked limiting is exactly the kind of processing that can push a channel outside that range. Treat this as a loudness-first alternative to try and A/B against the linked default, not a universal replacement for it.)* → [[Limiting]], [[Pro-L 2]]
- **Common limiter mistakes: avoid look-ahead, and — counter to how it's usually pitched — avoid running in true-peak limiting mode.** Look-ahead lets a limiter capture peaks early, which attenuates transients and reduces important dynamic high-frequency content, the same way it costs loudness on a compressor. Separately: true-peak limiting mode *also* reduces transient impact and reads as quieter, so instead of enabling TP mode on the limiter itself, **monitor true peaks with a separate meter and pull the output down manually** to stay clear of overs. *(Note: this is a genuinely contrarian stance — most other Sage Audio mastering content on this vault, and the owned [[Ozone 9 Maximizer]]/[[Pro-L 2]] chain settings, explicitly recommend TP-mode limiting with a −1.0 dBTP ceiling as the safe default. Worth A/B-testing rather than adopting outright.)* → [[Limiting]]
- **Clipping mechanism, explained: adds high-frequency noise that functions like an exciter, which is why it helps rather than hurts transient perception.** Whenever a clipper's threshold is crossed, it introduces a form of high-frequency noise/harmonic content — this brightens the master overall and, somewhat counter-intuitively, *helps retain the sense of transients* because the added high-frequency noise makes the transient easier for the ear to identify against the rest of the mix, even though the clip itself is technically shaving the peak. → [[Clipping and Loudness]], [[kHs Clipper]]

## Routed to

- [[Masking and Carving]] — perceived-loudness EQ move (3–5 kHz boost / 250 Hz cut)
- [[Saturation and Distortion]] — saturator selection for loud masters (mids/highs emphasis, oversampling+smoothing)
- [[Saturator]] — same saturator-selection technique, plugin note
- [[Limiting]] — dual-mono unlinked L/R limiting; avoid true-peak mode contrarian take
- [[Pro-L 2]] — dual-mono unlinked limiting, Channel Link cross-reference
- [[Clipping and Loudness]] — clipping-as-exciter mechanism; normalization/LUFS strategy supporting note
- [[kHs Clipper]] — clipping-as-exciter mechanism
- [[Phase Alignment]] — oversampling/aliasing → phase cancellation → loudness loss mechanism
- [[Compression]] — compression mistakes for a loud master (no look-ahead/long release; mid-side exception)
- [[Master Chain]] — dual-mono limiting Variation entry (contrasted against the existing linked-channel recommendation)
- [[Plugin Wishlist]] — Sonnox Oxford Limiter entry extended with the dual-mono technique; PSP saturator (oversampling/smoothing) added

## Source

- [Mastering Loud But Not Squashed](https://www.youtube.com/watch?v=YJVE4_CQ9Ts) — Sage Audio, 9:31
- Transcript: [[Mastering Loud But Not Squashed (transcript)]] — captions (not auto-generated), high confidence, clean spoken breakdown
