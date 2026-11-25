---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=s_LDCzWx20g
channel: Sage Audio
duration: "00:10:02"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken breakdown throughout; two short musical A/B comparison sections mid-video aren't transcribable (marked in the transcript)
tags: [yt-note, music, production, mastering, limiting, loudness, parallel-compression, saturation, clipping]
briefed: backlog
---

# Stop Limiting Your Masters

![](https://www.youtube.com/watch?v=s_LDCzWx20g)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=s_LDCzWx20g)

## Synopsis

A Sage Audio breakdown (the same analog mastering studio behind [[Audio Mastering Science: Using Research to Make Informed Decisions]] and [[Reverb on a Master: Everything You Need to Know]]) that makes a specific, mechanical case against brick-wall limiting as the go-to mastering loudness tool, then walks through three concrete plugin-based alternatives. The core argument: a modern look-ahead limiter's only genuine benefit is that it lets you push more input gain into the device, amplifying quieter detail and reducing masking — but because it always attenuates gain exactly at the peak (mapped out in advance via look-ahead, not reacting like a normal compressor), it inescapably reduces transient impact and reads as "blurred," no matter how good the specific limiter's algorithm is (release/attack shape, post-attenuation transient expansion, oversampling accuracy, and linked-vs-independent channels all change the character, not the fundamental tradeoff). Reframed on a graph (input on X, output on Y): instead of pushing everything up until the loudest parts hit the ceiling, push up everything *below* a threshold (e.g. −10 dB) while leaving the peaks alone — same perceived loudness, no peak attenuation. Three ways to actually do that: **parallel compression** (Pro-C 2, compress hard then blend to ~50/50 wet/dry so only half the output carries the attenuation), **gentle upward maximization** (Oxford Inflator, and the unowned PSP Vintage Warmer 2 — both push quiet content up then round gradually toward the ceiling rather than squaring the wave like a clipper), and **subtle multiband saturation** (Saturn 2's Subtle Tube/Tape types + Dynamic style, which gets the same upward-detail effect as parallel compression without needing to attenuate first, adjustable per frequency band). A pointed aside: iZotope's Ozone Maximizer is explicitly called out as "a limiter" under a different name — same uniform-amplify-to-ceiling-plus-look-ahead-brick-wall-attenuation mechanism, just branded as maximization. Concise (10:02), demo-light (two short musical A/B comparisons, not hands-on screen-share walkthroughs), heavy on mechanism — a strong companion to [[Clipping and Loudness]] and the existing [[Master Chain]] loudness stack, since three of the four plugins named (Pro-C 2, Oxford Inflator, Saturn 2, Ozone 9 Maximizer) are already owned and already in that chain.

## Techniques

- **How a brick-wall limiter actually works, mechanically.** Look-ahead (when enabled) introduces latency but lets the processor measure incoming peaks before they arrive, so it knows exactly when to attenuate without needing an attack time — it doesn't clip the peak like a clipper does, it reduces gain right at the moment the peak occurs, already mapped out in advance rather than reacting like a typical compressor.
- **The only real benefit of a limiter is that it lets you push more input gain into it** — the quieter parts get amplified along with everything else, which reads as louder (generally preferred) and reduces the masking of quiet detail. Look-ahead-guided attenuation also causes less harmonic distortion than clipping, since the wave is shaped to a lesser extent.
- **The core tradeoff: limiters always reduce transient impact, reading as a "blurred" sound — by design, not misuse.** Whatever algorithm a specific limiter runs (release time/shape, attack shape, whether transients are expanded post-attenuation, oversampling accuracy on peak detection, channels attenuated in tandem vs. independently) changes the *character* of that tradeoff, never removes it — limiting works by altering the amplitude of peaks, so it will always cost some transient impact.
- **Reframe the goal: if amplifying quiet detail is the actual point, there are better ways to do it than look-ahead peak attenuation.** Graphed as input (X) vs. output (Y): a limiter pushes the whole input up until the loudest parts hit a ceiling; the alternative is to push up only the portion of the signal *below* a threshold (worked example: −10 dB) while leaving everything above it alone — same achievable loudness as limiting, without ever attenuating the peaks.
- **Method 1 — Parallel compression via [[Pro-C 2]]: compress heavily, then blend to roughly equal parts wet/dry.** Compressing hard on its own still attenuates peaks same as a limiter would; blending the dry signal back in until it's ~50/50 leaves peaks essentially unaffected while quieter details still get amplified from the wet half. Knee, Threshold, Ratio, and the compressor Style/algorithm are all knobs for controlling exactly what gets caught — peaks are still touched, but only across half the total output since the other half is untouched dry signal.
- **Since a parallel-blended mastering compressor removes the risk of clipping and the need for an instant attack, Attack and Release can be opened up specifically to optimize transient retention** rather than defaulting to fast/aggressive settings the way a straight limiter would need.
- **If harmonic distortion from the heavy compression is a concern, lean on a mastering-tuned compression algorithm/style, or deliberately audition different compressor models for a distortion character that suits the track** — framed as a feature to shape, not just a side effect to minimize. With plugins that lack a built-in dry/wet blend, the same result needs a manual parallel setup (separate wet chain + dry blend + output gain-matching) rather than one plugin doing it natively.
- **Method 2 — Maximization is not automatically gentler than limiting: iZotope's Ozone Maximizer is explicitly named as mechanically the same thing as a limiter** — uniform amplification of the input until the ceiling, with look-ahead brick-wall attenuation on the peaks, same as any other limiter. Calling a device a "maximizer" instead of a "limiter" doesn't change what it's doing to the transients.
- **Method 2b — [[Oxford Inflator]] as the gentler maximization path: pushes quieter signal upward, then gradually/slowly reduces amplitude as it approaches 0 dB — it doesn't square the waveform the way a hard clipper does.** Some call this a "soft clipper," but the observed wave-shaping is more gradual bending than a clipper's flat-topped squaring — the mechanical reason it reads as density/warmth rather than a harder clipped edge.
- **Method 2c — PSP Vintage Warmer 2 (unowned) — a knee-driven maximizer with the brick-wall stage optional.** Its Knee control amplifies quieter details similarly to the Inflator; compression only begins at a higher amplitude and stays subtle even then; unlike most limiters, its brick-wall limiting function can be switched off entirely, letting you hand-balance maximization against peak monitoring instead of the plugin enforcing a hard ceiling. Worked setting: pull input Drive down ~4 dB and increase the Knee — yields strong maximization with zero attenuation until about −12 dB and no significant attenuation until about −3 dB; the Mix control can also bring in more dry signal for additional transient detail on top of that.
- **Method 3 — [[Saturn 2]]'s Subtle Tube or Subtle Tape saturation type, combined with the Dynamic per-band style, reproduces the parallel-compression effect without ever attenuating the signal first.** Framed as almost equivalent to the Pro-C2 dry-dial trick above, but achieved through saturation curve + dynamics interaction rather than compress-then-blend. The plugin's Drive control isn't needed for this effect specifically — only if extra harmonic content is also wanted.
- **Saturn 2's multiband architecture lets the maximization amount vary per frequency range** — introduce more of the effect on a band that needs more density, less (or none) on a band that's already loud enough, instead of one blanket amount across the whole spectrum. If mix/dry-blend artifacts or aliasing distortion are a concern at higher drive, both oversampling and linear-phase processing modes are available in the plugin.
- **All three alternatives (parallel compression, gentle maximization, subtle multiband saturation) chase the same underlying goal — amplify lower-amplitude content without peak attenuation, or in parallel compression's case, attenuation that's deliberately controlled and blended down — and a direct A/B in the video shows all three reaching a competitively loud, upfront master without brick-wall limiting.**

## Routed to

- [[Pro-C 2]] — parallel-compression-as-mastering-alternative technique (Dry Gain blend, Knee/Threshold/Ratio/Style control, opened-up Attack/Release)
- [[Saturn 2]] — Subtle Tube/Tape + Dynamic style as a limiting-free loudness move; multiband per-band maximization
- [[Oxford Inflator]] — mechanical clarification (gradual wave-shaping vs. a clipper's squaring)
- [[Ozone 9 Maximizer]] — the "maximizer = limiter" clarification
- [[Limiting]] (effect page) — the core mechanism/tradeoff explanation + the three-alternatives summary
- [[Clipping and Loudness]] (technique) — the case-against-limiting + alternatives, tied into the existing loudness-stack note
- [[Parallel Processing]] (technique) — parallel compression as a mastering-stage limiting alternative
- [[Multiband Compression]] (effect page) — Saturn 2's per-band maximization use case
- [[Master Chain]] — inline notes on §6 Oxford Inflator and §8 Ozone 9 Maximizer, a new Variations entry (parallel-comp/saturation alternative to stages 6–8), and a `## From videos` bullet
- [[Production/Plugin Wishlist|Plugin Wishlist]] — PSP Vintage Warmer 2 added to "From videos (to vet)"

## Source

- [Stop Limiting Your Masters](https://www.youtube.com/watch?v=s_LDCzWx20g) — Sage Audio, 10:02
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken breakdown throughout; two short musical A/B demos not transcribable
- Full transcript: [[Stop Limiting Your Masters (transcript)]]
