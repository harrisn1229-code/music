---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=LZxglknf3xA
channel: Sage Audio
duration: "00:08:19"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, limiting, mastering, dynamics]
briefed: backlog
---

# Limiter Masterclass

![](https://www.youtube.com/watch?v=LZxglknf3xA)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=LZxglknf3xA)

## Synopsis

Sage Audio's chaptered explainer on limiters specifically (as distinct from their many broader mastering-chain videos already in this vault) — mechanism-first, working chapter by chapter from "what does a limiter do" up through combining multiple limiters. It covers: the core tradeoff (loudness vs. distortion from instant-attack peak attenuation), how to need less limiting in the first place (upward compression to control dynamics before the limiter), why limiting distorts and how algorithm choice changes that (naming FabFilter Pro-L 2's Modern vs. Punch algorithms specifically), clipping vs. limiting as distinct distortion mechanisms, channel de-linking (with Sage Audio's own stated default of ~30% link — notably looser than the 60–80% link target sourced from a different Sage Audio video elsewhere in this vault), the true-peak tradeoff and a concrete non-true-peak alternative recipe (ceiling, look-ahead, oversampling numbers), running two limiters in series with distinct roles per instance, and "soft limiting" as a named, ratio-defined category (>10:1) distinct from brick-wall limiting. Most valuable here: it's the only Sage Audio source in this vault that puts hard numbers on channel-link percentage and the non-true-peak ceiling/lookahead/oversampling recipe, and the only one that names Pro-L 2's specific algorithms by their distortion behavior rather than just "pick one for the character you want."

## Techniques

- **What a limiter does, mechanically** — protects a signal from clipping distortion while letting you increase perceived loudness; every limiter has an *instant* attack time so nothing crosses the set threshold, which is convenient but can cause significant distortion if leaned on too hard.
- **Avoid excessive limiting by controlling dynamics before the limiter, specifically via upward compression** — since limiting only attenuates peaks, you can use less of it (or skip brick-wall limiting) by bringing the quietest parts of the signal up first; upward compression increases detail while reducing dynamic range. Try various forms of compression ahead of the limiter to see how much of that control you can get before the limiter ever engages.
- **How limiting creates distortion, and why the algorithm matters** — instantly attenuating a signal at threshold crossing causes mild-to-moderate distortion; the amount depends on both how much attenuation is happening and the limiter's algorithm. Named example on FabFilter Pro-L 2: the **Modern** setting reduces harmonic distortion significantly (the transparent choice), while the **Punch** algorithm creates *purposeful* distortion specifically to increase the volume of transients (a character choice, not a flaw to avoid).
- **Clipping vs. limiting are distinct distortion mechanisms** — a limiter attenuates whatever crosses the threshold; a clipper cuts the waveform flat at the crossover point, causing moderate-to-significant harmonic distortion (more than limiting). Limiting exists specifically to avoid the harder clipping a digital system would otherwise force. Some engineers deliberately run **both** a clipper and a limiter together, finding it gives better control over transients and mix timbre than either alone.
- **Channel de-linking — Sage Audio's own stated default is ~30% link.** Most limiters let you de-link L/R channels so detection and attenuation run independently per side, which can retain detail that grouped/linked attenuation would otherwise lose. Sage Audio's personal preference: link the channels by only about 30% — enough for some stereo cohesion, loose enough to keep most of the per-channel independence.
- **True-peak limiting, pros and cons** — true-peak mode detects inter-sample peaking distortion and reduces the signal against that metric, which does mean less overall distortion, but it comes at a real cost: a bigger hit to transient detail and reduced perceived loudness. Mechanically, it works by *reforming* distorted waveforms — which necessarily changes the timbre/ADSR of the transient it's reforming.
- **A concrete non-true-peak alternative to fight inter-sample peaking, in three numbers** — if you want to avoid inter-sample peaking distortion without true-peak mode's transient cost: (1) lower the limiter ceiling to −0.5 to −1 dB, (2) add 0.1 ms of look-ahead, (3) push oversampling to 4x or more. Won't eliminate inter-sample clipping completely, but greatly reduces it while retaining the transient's ADSR shape.
- **Running two limiters, with distinct roles per instance, not just split gain reduction** — chain two limiters (identical or different types) back to back on the master. The first limiter's job: attenuate peaks by about 2 dB. The second limiter's job: increase perceived loudness. Use the same ceiling/look-ahead/oversampling settings (the recipe above) on both, and deliberately try different limiter *types* on each to combine their distinct timbres rather than stacking two of the same.
- **"Soft limiting" is a named category, not just "gentle brick-wall"** — limiters aren't only the brick-wall kind; anything with a ratio greater than 10:1 counts as limiting. Unlike brick-wall limiters, a soft/high-ratio limiter's attack time isn't instant, so it can be shaped with normal attack/release controls. Recommended specifically as the *first* limiter in the two-limiter technique above — it controls peaks with less distortion and gives more control over the signal's timbre than a brick-wall first stage would.

## Routed to

- [[Pro-L 2]] — Punch vs. Modern algorithm distortion behavior; the non-true-peak ceiling/lookahead/oversampling recipe; the ~30% channel-link figure (tension flag vs. this vault's existing 60–80% link target)
- [[Limiting]] — two-limiter role split + mixing limiter types; soft limiting (>10:1 ratio) concept; upward compression before limiting; true-peak ADSR mechanism
- [[Clipping and Loudness]] — clipping-vs-limiting distortion comparison and the deliberate clip+limiter combo
- [[Master Chain]] — partial-delink (~30%) Variations entry; two-limiter role-split bullet

## Source

- [Limiter Masterclass](https://www.youtube.com/watch?v=LZxglknf3xA) — Sage Audio, 8:19, uploaded 2021-10-05
- Transcript source: captions, high confidence (clean spoken chapter-by-chapter breakdown, no music-garbled sections)
- Full transcript: [[Limiter Masterclass (transcript)]]
