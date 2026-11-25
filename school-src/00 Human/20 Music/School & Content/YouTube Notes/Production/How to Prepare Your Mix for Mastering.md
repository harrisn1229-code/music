---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=vd81zTPvnMQ
channel: Sage Audio
duration: "00:10:51"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, mixing, handoff, loudness, metering]
briefed: 2026-W33
---

# How to Prepare Your Mix for Mastering

![](https://www.youtube.com/watch?v=vd81zTPvnMQ)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=vd81zTPvnMQ)

## Synopsis

Sage Audio's own FAQ-style companion to the mastering-chain videos already threaded through [[Master Chain]] and [[Limiting]] — this one sits on the *client* side of the handoff instead of the mastering engineer's chain, answering the questions a mixing engineer actually asks before sending a mix out: how loud the peak should be, how to measure it, whether processing belongs on the master bus, whether to preview-mix with a limiter on, how loud the overall mix should read, and what export settings to use. Nearly every headline claim here (the −6 to −3 dBTP peak target, "nothing but light/subtle processing on the 2-bus," native-resolution export, no dithering) is already documented on [[Mix Handoff]] — in fact this exact video is the article Mix Handoff's own Sources list already cites (sageaudio.com/articles/how-to-prepare-your-mix-for-mastering), so this pass is mostly confirming the video matches its own article rather than surfacing new headline advice. What the video adds beyond what was already captured: the actual **mechanism** for why true peak (not sample peak / 0 dBFS) is the right metric — inter-sample peaking, and the "using as many bits as possible" framing for why you don't just mix quiet for safety (24-bit ≈ 144 dB of available dynamic range, the closer to 0 dB the more of it gets used); a **quantified checklist** for what counts as "too much" 2-bus processing (limiting/compression attenuation >3 dB, EQ changes >3 dB, harmonic distortion >1%, any stereo widening plugin at all); and a **worked example** tying mix loudness to genre dynamic range (a 15 dB-dynamic-range pop mix vs. a much wider-range classical mix, both peaking at −3 dBTP but landing at very different overall loudness) plus the specific LUFS bands this channel uses for masters (−16 to −9 LUFS-I) vs. mixes being sent for mastering (−25 to −18 LUFS-I).

## Techniques

- **Peak target: −6 to −3 dB true peak, recommend ~−3 dBTP.** 0 dBFS is the ceiling a digital signal cannot cross without clipping distortion (unpleasant harmonics that change tone/timbre). Leaving ~6 to 3 dB of headroom below that uses most of the available bits while still leaving room for a mastering engineer to work. −3 dBTP specifically is the sweet spot: it uses the majority of the available dynamic range while guaranteeing the mastering engineer a full 3 dB of headroom to push into.
- **Why not just mix quieter for extra safety (e.g. −10 dBTP)?** "Use as many bits as possible" — in a 24-bit recording there's ~144 dB of available dynamic range, and the closer a signal's peak sits to 0 dB, the more of that range actually gets used. Mixing unnecessarily quiet wastes resolution rather than protecting anything.
- **Measure true peak, not sample peak.** Use **dB true peak (dBTP)** as the metering standard when setting your peak level, because it accounts for **inter-sample peaking** — reconstruction peaks that sit between the samples a normal sample-peak meter reads, which matter increasingly as the signal gets close to clipping. A signal that reads clean on a sample-peak meter can still be clipping in true-peak terms.
- **Quantified ceiling for "how much processing is too much" on the mix's own master/2-bus.** Light, controlled, subtle compression and EQ are fine; anything past this is the line into "excessive" and works against the mastering engineer rather than for them: **limiting/compression with attenuation greater than 3 dB**, **EQ changes greater than 3 dB**, **harmonic distortion greater than 1%**, and **any stereo-widening plugin at all** (called out as something to avoid outright, not just use sparingly). Rule of thumb given directly: if you're in doubt whether to use a given process on the master output, don't.
- **Don't mix with a preview limiter riding the master output the whole session.** It's become common to leave a limiter on the mix bus from the start, reasoning that it shows how the mix will sound once it's loud — but this leads to misinformed mixing decisions more often than not, because any master-bus processing affects everything decided underneath it. The moment that limiter (or whatever else is on the master) comes off or gets changed, the mix's own timbre and dynamic range shift — meaning every balance/tone call made while it was on was made against a mix that no longer exists once it's removed. Better path: mix start to finish with **nothing on the master output**, get the mix itself to sound as good as it can unprocessed, and the resulting master will be better *because* the underlying mix is better.
- **How loud should the finished mix be? It depends on genre-driven dynamic range, not a fixed number.** More dynamic mixes read quieter overall; less dynamic mixes read louder — even though both are peaking at the same −3 dBTP ceiling. Worked example: a pop song with ~15 dB of dynamic range (quietest content at −18 dBTP, loudest peak at −3 dBTP) reads noticeably louder overall than a classical piece with the same −3 dBTP peak but a quietest point around −60 dBTP, because more of the pop song's signal sits close to that peak level. No single "right" mix loudness exists, but as a rough guide: **finished masters typically land ~−16 to −9 LUFS integrated**, and **a mix being prepared for mastering typically falls ~−25 to −18 LUFS integrated** — with real variation by genre and dynamics either way.
- **Export at native resolution — same sample rate and bit depth as the session, never converted.** If the mix was tracked/mixed at 48 kHz / 24-bit, export at 48 kHz / 24-bit. Sample rate determines the frequency range that survives; bit depth determines the dynamic range that survives. Exporting at native resolution means neither gets truncated before it reaches the mastering engineer.
- **No dithering on export, if the export bit depth matches the session's own bit depth.** Dithering exists to mask quantization error when *reducing* bit depth — since a native-resolution export isn't reducing anything, adding dither only adds unnecessary noise and lessens the mix's dynamic range for no benefit. (Dither would become relevant if bouncing down to a lower bit depth than the session, which this workflow doesn't call for.)
- **A/B demo (not narration-driven — instructional value is in the checklist, not the audio comparison itself):** the video closes by playing an incorrectly-prepared mix (clipping, wrong sample rate/bit depth, over-processed master) against a correctly-prepared one (peak set to −3 dBTP, correct native sample rate/bit depth, no master-bus processing) to make the difference audible rather than just describe it.

## Routed to

- [[Mix Handoff]] — new `## From videos` bullet: the quantified over-processing ceiling (>3 dB limiting/EQ, >1% distortion, any stereo widening) and the true-peak/inter-sample-peaking mechanism behind the existing −6 to −3 dBFS headroom line in the Delivery spec
- [[Clipping and Loudness]] — new `## From videos` bullet: the genre-dynamic-range worked example (pop vs. classical) and the mix-stage LUFS band (−25 to −18 LUFS-I) vs. master-stage LUFS band (−16 to −9 LUFS-I) this channel uses
- [[Limiting]] — new `## From videos` bullet: why riding a preview limiter on the master through the whole mix session leads to misinformed decisions, cross-linked to the existing "why to re-judge after adding a limiter" and "take it off before mastering" entries already on that page

No unowned plugin was named (the video stays tool- and plugin-agnostic throughout, matching the article it's paired with), so [[Plugin Wishlist]] wasn't touched. No sound/tone-selection content and no vintage-gear mention, so [[Sound Selection Guide]] and the Vintage Gear worklist weren't touched. No new chain was warranted — [[Mix Handoff]] is the exact, already-built home for "what to do before sending a mix out," and this video restates its own source article near word-for-word rather than laying out a distinct chain.

## Source

- [How to Prepare Your Mix for Mastering](https://www.youtube.com/watch?v=vd81zTPvnMQ) — Sage Audio, 10:51
- Transcript source: captions (pinned yt-dlp), high confidence throughout — this is a spoken breakdown with no music-heavy stretches except a brief unnarrated A/B demo near the end (flagged inline in the transcript)
- Full transcript: [[How to Prepare Your Mix for Mastering (transcript)]]
