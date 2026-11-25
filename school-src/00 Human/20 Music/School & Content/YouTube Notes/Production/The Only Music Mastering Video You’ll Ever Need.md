---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=M88T8jFL2uU
channel: Sage Audio
duration: "00:10:06"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, eq, compression, limiting]
briefed: backlog
---

# The Only Music Mastering Video You’ll Ever Need

![](https://www.youtube.com/watch?v=M88T8jFL2uU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=M88T8jFL2uU)

## Synopsis

A concise (10:06), plugin-agnostic mastering primer from Sage Audio (the same analog mastering studio behind [[Audio Mastering Science: Using Research to Make Informed Decisions]] and [[Reverb on a Master: Everything You Need to Know]]) — where those two videos were research-driven deep dives on specific sub-topics, this one is the "whole signal chain in one pass" overview: a five-stage minimal mastering chain built from four tool categories (mid/side EQ, an RMS-leaning compressor, an upward processor + optional saturator, a limiter), demonstrated with concrete free/named plugins at each stage (Kotelnikov, Oxford Inflator, PSP Vintage Warmer 2, Weiss MM-1, Voxengo Elephant) and A/B'd stage-by-stage. The throughline is restraint — "make each setting effective so you don't need another processor to undo the last one" — and the chain order itself is the lesson: balance first (EQ), control dynamics quietly (RMS comp), reveal detail without limiting (upward processing/saturation), shape tone once dynamics are settled (tone EQ), then limit last and lightly. Two EQ passes bookend the dynamics stages — a corrective pass before (balance + side-image cleanup) and a tonal pass after (broad shaping + stereo-image sculpting) — a two-EQ mastering structure that maps directly onto [[Master Chain]]'s existing corrective-EQ-first / tone-EQ-later shape, just condensed to five stages instead of eight. Distinct concrete numbers throughout: RMS comp target (1–2 dB, mostly RMS blended with a little peak), limiter target (release >100 ms, channel link 60–80%, max 3 dB of attenuation), and a clean three-way distinction between saturation (reshapes peaks), upward processing (reshapes from the quietest points up, preserving transient timbre), and limiting (retains peak shape, uses clean gain) that the video treats as three genuinely different tools, not overlapping ones.

## Techniques

- **The five-stage minimal mastering chain, in order, with the reasoning for the order:** (1) EQ — balance the frequency response *before* any processing that could amplify something unwanted; (2) RMS-leaning compressor — control average loudness quietly so peak compression isn't needed later; (3) upward processor (+ optional saturator) — bring up quiet detail and add loudness/density without hitting the limiter hard; (4) tone-shaping EQ — broad filters once dynamics are settled, the "fun part," add what you want more of; (5) limiter — last, and light. The stated goal at every stage: make each setting *effective* so you don't need another processor to undo the last one — more conflicting processing = more processing needed to fix it = more processed/unpleasant sound. → [[Master Chain]], [[EQ]], [[Compression]], [[Limiting]]
- **Minimal 4-tool-category kit for a full master, no more needed:** a fully parametric mid/side EQ (frequency response + imaging), a saturator and/or RMS compressor (dynamics control + fills out the frequency response), an upward processor (brings up quiet detail while retaining peaks), and a versatile limiter. Framed explicitly as "90% of a great master" if each does its job well — a minimalist counterpoint to [[Master Chain]]'s fuller 8-stage default. → [[Master Chain]]
- **Corrective EQ pass (before dynamics): linear-phase, low-latency setting; side-image-only high-pass filter placed between a source's fundamental and its 2nd-order harmonic; small dip ~250 Hz; small dip in a resonant high-mid pocket.** Linear phase at a *low-latency* setting keeps pre-ringing minimal (less transient impact than a true zero-latency EQ); an 18 or 24 dB/octave HPF is safe at that setting without messing up phase rotation. The HPF is **side-image only** — placed between the fundamental range and the 2nd-order harmonic range, it makes everything below that filter identical in L/R, i.e. it doesn't remove the fundamental, just the stereo info sitting under it. The ~250 Hz dip reduces masking of higher frequencies and general mix muddiness; the high-mid dip targets vocal nasal resonances and other instruments crowding that range. Framed as "almost always useful," varying song to song. → [[Pro-Q 4]], [[Width and Stereo]], [[Master Chain]]
- **RMS-leaning mastering compression target: 1–2 dB of total attenuation, blended mostly RMS with a small amount of peak detection, tuned so it's inaudible as compression — just quieter.** The explicit goal is a compressor you can't hear working, only its level drop. Keeping this stage this light and RMS-biased means the chain's final limiter only has to catch a few dB, which keeps the limiter itself from sounding noticeable — this compressor's real job is "make the limiter's job small," not do audible dynamics control on its own. → [[Glue Compressor]], [[Compression]]
- **Three genuinely different dynamics tools, not overlapping ones: saturation reshapes peaks; limiting retains peak shape entirely and uses clean gain to attenuate; upward processing reshapes the waveform from its quietest points UP, which preserves timbre and transient impact while still adding loudness.** A clean mental model for why a mastering chain reaches for all three rather than picking one — each does a mechanically distinct thing to the waveform. Every upward processor "shapes a little differently" and introduces unique harmonics, so the choice of tool is a genuine tone decision, not interchangeable: named in the video are the **Oxford Inflator** (owned), **PSP Vintage Warmer 2**'s knee function ("a personal favorite," not owned), and the **Weiss MM-1 Maximizer** (Softube, not owned) as three different-flavored options for the same slot. → [[Oxford Inflator]], [[Saturation and Distortion]], [[Limiting]]
- **Tone-shaping EQ pass (after dynamics): repeat the side-image HPF cleanup (the upstream RMS-comp/upward-processing stages can reintroduce side-image low content), then dip low mids if needed, boost lows and high mids, add a side-image bell in the mid-range for stereo impressiveness without unbalancing the overall tone, and choose where the air frequencies live — side-only to expand, mid-only to focus, or identical on both.** This is explicitly the "fun part" — additive, done once dynamics are settled — versus the first EQ pass's purely corrective job. The air-frequency placement decision (side/mid/both) is presented as a genuine creative choice, not a fixed rule, but "a great starting point more often than not." → [[Pro-Q 4]], [[Width and Stereo]], [[Master Chain]]
- **Limiter target, stated as tool-agnostic ("whichever limiter you use is fine"): release time above 100 ms, channel linking around 60–80%, and no more than 3 dB of attenuation.** If more than 3 dB of GR is needed to hit an LUFS target, the fix is upstream — more upward processing and/or peak attenuation before the limiter — not pushing the limiter harder. After limiting, the check isn't a number, it's a re-listen: does it still sound the way you want with all the quiet detail pushed forward? If not, go back to the tone-shaping EQ, not the limiter. Demoed tool: **Voxengo Elephant** (not owned) — praised for exposing nearly every parameter (attack, release, shape, time, expansion into the limiter, channel link) rather than for being uniquely better. → [[Pro-L 2]], [[Ozone 9 Maximizer]], [[Limiting]]

## Routed to

- [[Master Chain]] — inline `🎬` notes on §1 Pro-Q 4 (corrective EQ, side-image HPF placement rule), §3 Glue Compressor (RMS/peak-blend target), §6 Oxford Inflator (three-way saturation/upward-processing/limiting distinction), §8 Ozone 9 Maximizer (limiter release/link/max-GR targets), plus a `## From videos` bullet on the 5-stage minimal chain
- [[Pro-Q 4]] (plugin) — corrective + tone-shaping mastering EQ passes
- [[Glue Compressor]] (plugin) — RMS-leaning mastering compression target
- [[Oxford Inflator]] (plugin) — upward-processing role + named alternatives
- [[Pro-L 2]] (plugin) / [[Ozone 9 Maximizer]] (plugin) — limiter release/link/GR targets
- [[EQ]] (effect page) — two-pass mastering EQ structure
- [[Compression]] (effect page) — RMS-leaning mastering compression target
- [[Limiting]] (effect page) / [[Saturation and Distortion]] (effect page) — the saturation vs. upward-processing vs. limiting distinction
- [[Width and Stereo]] (technique) — side-image-only HPF + side/mid air-frequency choice
- [[Plugin Wishlist]] — TDR Kotelnikov, PSP Vintage Warmer 2, Weiss MM-1 Maximizer, Voxengo Elephant

## Source

- [The Only Music Mastering Video You'll Ever Need](https://www.youtube.com/watch?v=M88T8jFL2uU) — Sage Audio, 10:06
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken breakdown throughout; four short musical demo/transition segments not transcribable
- Full transcript: [[The Only Music Mastering Video You’ll Ever Need (transcript)]]
