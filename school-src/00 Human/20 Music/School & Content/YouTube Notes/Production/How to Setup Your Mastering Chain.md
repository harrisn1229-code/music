---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=Y-5B4kOXUoM
channel: Sage Audio
duration: "00:06:27"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, workflow, eq, saturation, compression, limiting, metering]
briefed: backlog
---

# How to Setup Your Mastering Chain

![](https://www.youtube.com/watch?v=Y-5B4kOXUoM)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Y-5B4kOXUoM)

## Synopsis

A short, fundamentals-first walkthrough from Sage Audio (the same mastering studio behind [[The Only Music Mastering Video You’ll Ever Need]], [[Mastering Compression Settings]], [[Audio Mastering Science: Using Research to Make Informed Decisions]], [[Limiter Masterclass]], and the rest of this chain's Sage Audio sourcing) — but where those videos each go deep on one technique or menu of options, this one is the setup pass that comes before any of them: import and session settings, headroom, signal routing, then the four-stage EQ → saturation → compression → limiting flow in order, closing with post-limiter metering and export. Nothing here names a specific plugin — it's the scaffolding those other videos' plugin-specific moves slot into. Genuinely new information not already captured elsewhere in this chain's sourcing: the session's minimum bit depth/sample rate (24-bit/96 kHz, to reduce processing-induced aliasing) and the target headroom pulled in via clip gain (~5 dB) before any processing starts; a plain-language statement of signal routing order (file/waveform → inserts → aux sends/buses → stereo output); the optical-vs-digital compressor character split (smooth/subtle vs. aggressive-genre); a paired LUFS + dB true peak metering check with a concrete streaming-safe range (−14 to −8 LUFS integrated, −2 to −0.5 dBTP); and a three-version export habit (archival high-res, per-service streaming spec, 320 kbps MP3 for sharing/promo). Everything else (EQ subtractive-then-additive ordering, saturation types + subtlety + oversampling, "compress only if needed," limiter oversampling for aliasing) restates ideas this chain already carries in more plugin-specific form — logged here anyway since it's the tool-agnostic version of the same lesson, and because it's the piece that ties the whole chain's *order* together in one place.

## Techniques

- **Import and session setup.** Import the stereo mix into a DAW — this is where you'll adjust, monitor, and export the master. Regardless of the mix's own sample rate/bit depth, create the mastering session at a **minimum of 24-bit / 96 kHz**. It's typical to match the mix's sampling rate, but using a *higher* rate than the mix reduces the aliasing your own mastering processing introduces.
- **Headroom via clip gain.** Before processing anything, make sure there's enough headroom to work with — if mastering multiple tracks in one sitting, roughly match their levels first. The right tool for setting headroom is **clip gain**, not a fader. Stated starting point: **~5 dB of headroom**, though the exact amount is a judgment call.
- **Signal routing order.** Understand exactly how the signal is routed before deciding where to place each processor: **file/waveform → inserts → any auxiliary sends/buses → stereo output**. Each stage of processing hits the signal in the order it's placed, and that order is what determines the end result — so decide the order deliberately, not by habit.
- **EQ — subtractive first, additive later.** The first insert in the chain is typically an EQ used to **attenuate** whatever shouldn't carry forward into later processing — that attenuation can be applied stereo (L/R) or mid-side, depending on where the offending content sits. **Additive** EQ moves are typically saved for later in the chain, once the signal's been cleaned up — though some engineers combine both moves into a single first-insert EQ instead.
- **Saturation — pick the flavor, keep it subtle, oversample.** Saturation blends distortion and harmonic content, useful for controlling a master's dynamics while adding character — often described as adding "tone." Comes in multiple flavors (tape, tube, transistor, and others), each providing a different kind of clarity/character; pick based on what the source needs. At the mastering stage, use it **subtly** — overdone saturation here reads as unpleasant distortion, not glue. If the plugin offers oversampling, **enable 2x or more** to keep the added harmonics from aliasing.
- **Compress only if the master needs it — and match the character to the genre.** Whether to use compression at all during mastering is genuinely debated; the practical stance is to reach for it only when it's actually needed, not as a default stage. When it is used, compression controls the master's dynamics and reshapes its timbre via attack/release. **Optical** compression reads smooth and works well used subtly (a gentle glue pass); **digital** compression reads more aggressive and suits harder/louder genres — pick the type for the genre first, then dial settings.
- **Limiting — the last stage, and where aliasing is most likely.** The limiter is the final processing stage: it raises loudness and protects the signal from peaking/clipping distortion. Both the specific limiter chosen and its settings meaningfully shape the master's timbre, on top of everything already done upstream. Because aggressive limiting specifically can introduce aliasing, **enable oversampling if the limiter offers it** — called out as more important here than at earlier stages, since limiting does the most nonlinear work in the chain.
- **Post-limiter metering: check LUFS and dB true peak separately.** After limiting, use a metering plugin to read both numbers — **LUFS** is the master's loudness, **dB true peak** is its ceiling/peaking risk. If dB true peak reads above 0 dB, go back and pull the limiter's output ceiling down rather than trusting the loudness number alone. For a streaming release, a stated safe starting range is **−14 to −8 LUFS** (integrated) and **dB true peak between −2 and −0.5 dBTP**.
- **Export three separate versions.** (1) A **high-resolution version** at the same settings as the mastering session itself — the archival master. (2) A **streaming version**, set to the highest bit depth/sample rate each distribution service will accept (varies per service — check before export). (3) A **320 kbps file**, useful for sharing and radio promotion where file size matters more than absolute fidelity.

## Routed to

- [[Master Chain]] — new `## Session Setup` section (24-bit/96 kHz minimum, ~5 dB clip-gain headroom); inline 🎬 bullets on §1 [[Pro-Q 4]] (subtractive-first EQ), §3 [[Glue Compressor]] (optical vs. digital character, compress-only-if-needed), §6 [[Oxford Inflator]] (saturation subtlety + oversampling), §8 [[Ozone 9 Maximizer]] (limiter oversampling for aliasing); `## Monitoring` addition (paired LUFS + dBTP check, streaming-safe range); new `## Export` section (three-version export habit); `## From videos` overview bullet
- [[EQ]] (effect page) — subtractive-first, additive-later EQ ordering
- [[Saturation and Distortion]] (effect page) — saturation flavor choice, subtlety, oversampling
- [[Compression]] (effect page) — compress-only-if-needed, optical vs. digital character
- [[Clipping and Loudness]] (technique) — paired LUFS + dB true peak metering workflow and streaming-safe range

[[Limiting]] (effect page) was checked but **not** edited — it already carries this exact lesson near-verbatim ("Always use oversampling when limiting a master...", sourced to a separate Sage Audio video) via its `## From videos` list, so adding this video's version would have been a straight duplicate; the §8 [[Ozone 9 Maximizer]] inline bullet on [[Master Chain]] above still cites this video for the mastering-chain-specific framing (why *this* stage's oversampling matters more than earlier stages').

No unowned plugins were named (the video stays tool-agnostic throughout), so nothing was added to [[Plugin Wishlist]]. No sound/tone selection content, no vintage-gear mentions, no new plugin/effect/technique note was needed — every idea in this video already has a home in the existing mastering-chain documentation, so this pass enriched in place rather than creating anything new.

## Source

- [How to Setup Your Mastering Chain](https://www.youtube.com/watch?v=Y-5B4kOXUoM) — Sage Audio, 6:27
- Transcript source: captions (pinned yt-dlp), high confidence for the spoken narration; a short section under the "compress" and "limit" chapters briefly picks up song-lyric audio from the video's musical demo instead of narration (flagged inline in the transcript) — expected per this workflow's note that music-heavy passages garble auto-captions, doesn't affect the instructional content extracted above
- Full transcript: [[How to Setup Your Mastering Chain (transcript)]]
