---
type: yt-note
date: 2026-08-12
source: youtube
url: https://www.youtube.com/watch?v=Hunq0HakrI4
channel: Mix with the Masters
duration: 00:06:22
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vocal-chain, compression, eq, parallel-processing, phase-alignment]
briefed: backlog
---

# Julian Casablancas' vocal sound with Ben Baptie

![](https://www.youtube.com/watch?v=Hunq0HakrI4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Hunq0HakrI4)

## Synopsis

A short, dense Mix with the Masters breakdown: mix engineer Ben Baptie walks through how he turned a completely clean, dry, "sophisticated Play-Doh" recording of Julian Casablancas' voice into The Strokes' signature vocal sound, entirely through processing rather than a special mic or performance. The value here is the **structure** of the treatment, not any single plugin: a parallel "mult" (a driven, deliberately thinned-and-hard-limited duplicate of the vocal, built from in-the-box plugins) is blended under the untouched original *before* either signal reaches the main analog vocal chain, then the combined signal goes through a specific four-stage hardware-style chain (Pultec → fast 1176 → slow CL 1B → line EQ with only its low-pass filter engaged). The back half covers arrangement, not processing: the song starts completely bone dry and the only vocal effect used the entire track is a single slap delay, deliberately withheld early and introduced gradually to build intensity — and used specifically to create a second rhythmic pulse that syncopates against tightly-picked rhythm guitar. Two plugin names are unclear in the auto-captions (rendered "c62" and "the sanzan plugin") and are logged qualitatively/flagged rather than guessed with false confidence.

## Techniques

- **Start from a completely clean take — the "Strokes sound" is built entirely in processing, not tracked in.** Baptie was handed Julian's vocal with zero effects on the channel — "a very calm... standard recording of a great voice." Everything distinctive about the sound comes from the chain below, not the source.
- **The parallel "mult" — a driven, thinned, hard-limited duplicate blended under the clean lead, before either signal hits the main vocal chain.** Baptie duplicates the vocal channel in Pro Tools and runs two versions into the console/main chain simultaneously:
  - **Channel A (the main channel, more subtly driven):** iZotope Trash (thins the tone out, brings up midrange character) → a compressor (auto-captioned **"c62" — exact model unclear**, no confident match found; used to control the bottom end) → EQ ("to do the same," i.e. more low-end control) → [[UAD UA 1176LN|1176]]. All of this runs pre-vocal-chain, entirely in the box.
  - **Channel B ("the mult," far more driven):** a plugin auto-captioned **"the sanzan plugin"** (exact name unclear/possibly garbled — no confident match) plus Waves L1 Ultramaximizer. First role: keeping sample-rate/phase consistency between the two parallel channels running simultaneously ("sample rates, sample basing stuff... to keep the phase as close as possible... it can go out with these guys if they're all running at the same time"). Second role: the same plugin thins this channel out aggressively, then the L1 limits it "really really hard to take off any of the peaks" — described as **"creating a box for him to sit in."**
  - **Why split it this way:** the untouched-dynamics channel still carries the natural performance dynamic; the driven "mult" fills in a stable mid-range bed underneath it. Blended together, "the two of them just kind of bring out the fizz of his voice" — a clear, present signal going up the console into the main chain. → [[Parallel Processing]], [[Phase Alignment]], [[Saturation and Distortion]], [[MIDS Slot]]
- **Main vocal chain, four stages, deliberately re-adding richness a thinner in-the-box front end had stripped out:**
  1. **[[UAD Pultec EQP-1A|Pultec EQP-1A]]** — a broad "big" top-and-bottom EQ. Boosted **~100 Hz** by a real amount, even though the raw voice is thin-sounding — deliberate, because the in-the-box stage had already thinned it further, so the Pultec's job is putting analog low-end richness back in. Also added "a bit more top." → [[UAD Pultec EQP-1A]], [[BASS Slot]], [[EQ]]
  2. **[[UAD UA 1176LN|1176]]**, fast attack **and** fast release — grabs peaks quickly. Because the Pultec ahead of it boosted 100 Hz, the 1176 "grabs the bass response as well quite quick" — feeding a compressor a boosted low end makes it **work harder and react to frequencies it wouldn't otherwise catch**, which here reads as excitement/energy in the voice rather than just gain reduction. This is an EQ-before-compressor move, not a compressor setting alone. → [[UAD UA 1176LN]], [[Compression Staging]], [[Compression]]
  3. **Tube-Tech CL 1B** (captioned "tube Tech CR1B" — the CL 1B is the only Tube-Tech unit this matches) — much slower attack/release than the 1176, run purely as a **leveler**: rounds off the voice consistently regardless of how loud or quiet Casablancas gets, with no real character of its own. → [[UAD Tube-Tech CL 1B mkII]]
  4. **A Neve/API-style channel strip EQ on the line input (captioned "1081")** — only the **low-pass filter** section used, pulled down "a couple of clicks," nothing else on the EQ touched. Purpose: shave off top-end "Hi-Fi" quality so the vocal doesn't read too clean/digital against the track — a single-purpose move, not general tone shaping. No owned equivalent with a comparable passive LPF section; general lesson (a light top-end LPF, used surgically rather than as tone EQ, to de-hi-fi a vocal) logged qualitatively. → [[EQ]], [[Plugin Wishlist]]
- **Treatment philosophy: keep the processing itself un-dynamic even though the singer is very dynamic.** "As dynamic as he is as a singer, the actual treatment of his vocal doesn't need to be super dynamic" — he has a natural softness but always needs to cut through, so the chain's job is consistency (the leveling CL 1B, the surgical LPF), not chasing his performance.
- **The song starts completely bone dry — no reverb, no delay, nothing — just the two blended channels into the main chain.** Effects are then introduced gradually as the song progresses, section by section, to build the sense of intensity growing — explicitly **not** about getting louder: "it should just feel like it's slightly leaning in a bit more on itself." → [[Arrangement and Song Form]], [[Automation]]
- **The only vocal effect used across the whole song: a single slap delay — deliberately no reverb at all.** Against tightly-picked rhythm guitar parts, the slap's repeat creates "a second rhythm to his voice" that syncopates against the guitar picking — vocal and guitar start "bouncing off of each other." Combined with drums and bass already being rhythmically locked, this turns the whole arrangement into something that "basically becomes like a dance song." A clean example of a mix decision (which effect, and when to bring it in) driving arrangement-level groove rather than just adding space. → [[Delay]] (effect), [[1 Main Vocal Track]], [[Rhythm and Groove]], [[Arrangement and Song Form]]

## Routed to

- [[UAD Pultec EQP-1A]] — Techniques + Key Parameters cross-fill
- [[UAD UA 1176LN]] — new Techniques section + Key Parameters cross-fill
- [[UAD Tube-Tech CL 1B mkII]] — Techniques + Key Parameters cross-fill
- [[Compression]] (effect) — From videos
- [[EQ]] (effect) — From videos
- [[Saturation and Distortion]] (effect) — From videos
- [[Delay]] (effect) — From videos
- [[Parallel Processing]] — From videos (new recipe: the driven/limited parallel "mult")
- [[Phase Alignment]] — From videos (parallel-channel sample-rate/phase consistency)
- [[Compression Staging]] — From videos (EQ-drives-compressor-harder case study)
- [[Arrangement and Song Form]] — From videos (dry-start, gradual FX introduction)
- [[1 Main Vocal Track]] — inline 🎬 notes + From videos
- [[Plugin Wishlist]] — three unconfirmed/unowned entries (the "sanzan" plugin, the "c62" compressor, Neve/API 1081-style channel EQ)

## Source

- **Channel:** Mix with the Masters
- **Duration:** 6:22
- **Transcript:** captions, high confidence (clean spoken breakdown, no music-heavy passages) — two proper nouns garbled by auto-caption ("sanzan," "c62," "CR1B" for CL 1B, "1081") flagged inline rather than guessed
- [[Julian Casablancas' vocal sound with Ben Baptie (transcript)|Full transcript]]
