---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=21dpmumO4So
channel: Sage Audio
duration: "00:08:54"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken breakdown, coherent full sentences throughout; three short musical demo excerpts (before/after A-Bs) aren't transcribable
tags: [yt-note, music, production, mastering, research, dynamic-range, stereo-width, reverb]
briefed: backlog
---

# Audio Mastering Science: Using Research to Make Informed Decisions

![](https://www.youtube.com/watch?v=21dpmumO4So)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=21dpmumO4So)

## Synopsis

A research-grounded mastering video from Sage Audio (the same analog mastering studio behind [[Reverb on a Master: Everything You Need to Know]]) — instead of ear-only trial and error, the presenter pulls three published/measured findings about what commercially successful masters actually look like, and turns each into a concrete mastering check. First: a 2014 AES paper (Pastana & Rice, 53rd AES convention, 928 commercially successful songs) measured peak-to-RMS ("crest factor") ratios per octave, finding the lows sit around a 16:1 ratio (most controlled/compressed) and the highs around 28:1 (least controlled) — grouped practically into three wider mastering bands, this becomes a real audible target you can solo-and-measure against with a free multiband splitter (Isolate) plus peak and RMS meters, compressing a band that's too dynamic or expanding one that's over-squashed. Second: the same measurement approach applied to stereo width found L/R RMS levels deviate by at most 0.8 dB across ~40 years of commercially mono-compatible material — not a ban on width, but a reason to keep the four foundational, power-carrying elements (lead vocal, bass, kick, snare) centered, avoid any L/R-differential EQ or unlinked limiting at the mastering stage, and favor small M/S-balance nudges over delay-based stereo expanders (which the video's own A/B shows losing focus on centered elements). Third: a blind listening study (30 listeners) found the most popular reverb/temporal-effect level sits 9 loudness units below the dry signal — and because mastering-stage dynamics processing (limiting, clipping, compression with makeup gain — anything that raises a ceiling while pushing quieter details up) disproportionately amplifies exactly those quiet reverb reflections, a mix's reverb can read as tasteful pre-mastering and noticeably too wet post-mastering, with no easy way to fix that from a finished stereo file — so the fix has to happen at the mix stage, by intentionally setting reverb a touch lower than "feels right" to leave headroom for mastering to push it back up. Concise (8:54), light on hands-on plugin screenshots, heavy on "here's the actual measured number and why it matters" — a good companion piece to the earlier reverb-on-master video, which this one cross-references conceptually (both land on the same "check with the limiter engaged" and "reverb sneaks up during mastering" points, from different angles).

## Techniques

- **Measured dynamic-range target by octave (AES 2014, Pastana & Rice, 928 songs): peak-to-RMS crest factor runs from ~16:1 in the lowest octave up to ~28:1 in the highest.** Lows carry the most controlled/compressed dynamic range in successful commercial masters; highs carry the most uncontrolled/dynamic range. Practical mastering grouping: collapse the 8 measured octaves into 3 wider mastering bands (low/mid/high) so any correction is spread over a wider range and sounds more natural, rather than surgically targeting a narrow octave. → [[Multiband Compression]], [[SUB Slot]], [[BASS Slot]], [[MIDS Slot]], [[AIR Slot]]
- **Method to check a master against the crest-factor targets: split into 3 bands with a free multiband tool (Isolate), insert a peak meter + an RMS meter, solo each band, play, and compare the measured peak:RMS ratio against the study's per-range figures.** Too-high ratio for a given band (more dynamic than the reference) → compress that band. Too-low ratio (already over-controlled) → expand it. Re-check the overall tonal response afterward to make sure the corrective moves didn't shift the intended balance. Framed as too time-consuming for routine use, but worth doing at least once to calibrate what "standard" actually measures like — after that, deviate from it deliberately rather than by accident. → [[Multiband Compression]], [[Clipping and Loudness]]
- **Stereo width research (same measurement logic, applied to L/R RMS): commercially successful masters keep left and right channel RMS within 0.8 dB of each other, and mono-compatible mixing has been the dominant convention for roughly 40 years** (some early stereo records tried unconventional panning and that practice died out quickly). This isn't a width ban — a mix can still be wide while the L/R RMS values stay matched, because width mostly lives in the *side* image rather than a level imbalance between channels. → [[Width and Stereo]]
- **Mastering-stage stereo rules that follow from the RMS-matching finding: keep the four foundational/power elements centered (lead vocal, bass, kick, snare — panned only for a deliberate creative effect); never run L/R-differential EQ (same frequency, different amount, on each channel) at mastering; keep a mastering limiter's channels linked or mostly linked so gain reduction doesn't land unevenly on one side.** All three practices are what actually keeps L/R RMS inside the 0.8 dB range measured above, rather than being independent "best practice" rules. → [[Width and Stereo]], [[EQ]], [[Limiting]], [[Master Chain]]
- **Stereo expansion above 200 Hz is generally fine, but at the mastering stage keep it small and prefer M/S-balance/EQ moves over delay-based expanders.** A demonstrated A/B: widening the side image via EQ vs. widening the same section with a delay-based stereo expander — the delay-based version audibly loses focus on the mix's centered elements, because amplifying the side image only accentuates stereo information *already present* in the mix, while a delay-based expander manufactures new inter-channel differences that can smear those four centered elements (lead vocal/bass/kick/snare) instead of just widening what's already there. → [[Width and Stereo]], [[Master Chain]]
- **Preferred reverb/temporal-effect level (blind study, 30 listeners): 9 loudness units below the dry signal is the most popular setting** — most listeners prefer some dry signal over a heavily reverberated one, and −9 LU relative to dry was the sweet spot among this study's panel. A concrete numeric anchor for "how much reverb is too much" beyond ear-only judgment. → [[Reverb]], [[Depth and Space]]
- **Why reverb (set correctly pre-mastering) can read as too wet post-mastering: reverb reflections are mostly quiet detail, and mastering-stage processing that creates a ceiling while pushing the overall signal up (limiting, clipping, compression with makeup gain) disproportionately amplifies quiet content — including those reflections.** Worked-through example: a range with a good amount of reverb but a peak:RMS ratio higher than the octave-band target needs peak compression to bring the dynamic range in line; to preserve the original frequency balance after that compression, the range then needs makeup gain — and that makeup gain amplifies the same quiet reverb reflections right along with everything else, pushing the reverb's audible level up as an unintended side effect of an unrelated dynamic-range fix. There's no reliable way to reverse-engineer or isolate this from a finished stereo file, so the fix has to happen upstream: **the mix engineer should deliberately set reverb/temporal effects a bit lower than "feels right" in the mix**, leaving room for the mastering stage's inevitable amplification to land it in the right place rather than pushing it past it. Demoed on a drum track: reverb added, then compressed with makeup gain (mastering-style) — the reverb becomes noticeably more audible purely from that processing, with no change to the reverb send itself. → [[Reverb]], [[Master Chain]], [[Clipping and Loudness]], [[Compression]]
- **Isolate (free) — a multiband splitter used purely as a measurement/diagnostic tool here, not a creative processor**: split the spectrum into adjustable crossover bands, solo one band at a time to measure its peak/RMS ratio against the crest-factor research above. Not owned; not previously documented. → [[Plugin Wishlist]], [[Multiband Compression]]

## Routed to

- [[Multiband Compression]] (effect page) — crest-factor-by-octave research + the solo-and-measure method
- [[Width and Stereo]] (technique) — the 0.8 dB L/R RMS finding + the mastering stereo rules that follow from it
- [[Reverb]] (effect page) — the −9 LU preferred-level finding + why mastering amplifies reverb
- [[Master Chain]] — inline notes on the §5 Ozone 9 Imager and §8 Ozone 9 Maximizer stages, plus a `## From videos` bullet
- [[Clipping and Loudness]] (technique) — cross-reference on why makeup gain amplifies quiet detail
- [[Plugin Wishlist]] — Isolate (free multiband splitter, measurement use case)

## Source

- [Audio Mastering Science: Using Research to Make Informed Decisions](https://www.youtube.com/watch?v=21dpmumO4So) — Sage Audio, 8:54
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken breakdown throughout; three short musical A/B demos not transcribable
- Full transcript: [[Audio Mastering Science: Using Research to Make Informed Decisions (transcript)]]
