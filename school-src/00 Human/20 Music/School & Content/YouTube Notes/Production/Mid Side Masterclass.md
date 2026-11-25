---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=SHxih1xc5yM
channel: Sage Audio
duration: "00:08:10"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken breakdown throughout; the eight short "let's take a listen" A/B demo moments aren't transcribable (marked in the transcript)
tags: [yt-note, music, production, mid-side, stereo, width, eq, saturation, compression, mastering]
briefed: 2026-W33
---

# Mid Side Masterclass

![](https://www.youtube.com/watch?v=SHxih1xc5yM)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=SHxih1xc5yM)

## Synopsis

A fast (8:10), rapid-fire tour of mid/side (M/S) processing from Sage Audio — the same analog mastering studio behind [[Stop Limiting Your Masters]], [[The Only Music Mastering Video You’ll Ever Need]], [[Mastering Compression Settings]], [[Audio Mastering Science: Using Research to Make Informed Decisions]], [[Reverb on a Master: Everything You Need to Know]], and [[All Processing is Connected - Crucial Knowledge for Pro Mixes & Masters]] — those six already form most of the [[Master Chain]]'s deep-dive content. This one is a breadth pass rather than a deep dive: nine short chapters (concept, EQ, routing, saturation, compression, temporal effects, transients, parallel processing, split EQ, automation), each landing one or two concrete moves before cutting to the next. The mechanical foundation: a mid/side track is derived by phase-inverting one channel of a stereo signal — the result nulls everything identical between L/R, leaving only the differences (the "side"); the free Voxengo MSED plugin does this without a manual phase-invert trick. Two ideas recur as the throughline connecting all nine chapters: (1) most conventional effects can be run in M/S even without native support, by duplicating the channel and encoding/decoding around a plugin with two instances of an M/S utility (exactly what owned [[S1 MS Matrix]] and [[Ghz Midside Matrix 3]] are built for); and (2) M/S isn't mastering-only — several of the techniques (transient expansion on the sides, mid-image parallel processing) are called out as working "especially" on drums and instrument buses, not just full mixes. Genuinely new material against the existing Sage Audio coverage already woven into [[Width and Stereo]] and [[Master Chain]]: the manual M/S routing trick stated explicitly as a workflow (rather than assumed), M/S saturation as its own chapter (mid saturated for centered low end, side saturated for expanded highs), the creative-temporal chapter (different delay/reverb type on mid vs. side), transient expansion on the side image specifically, mid-image parallel processing (compression + limiting + overdrive blended in), a combined split-EQ + M/S routing for four independently-adjustable zones, and M/S-targeted automation (volume, pan, and — the video's own favorite — automated saturation amount per channel for an evolving image).

## Techniques

- **What mid/side is, mechanically.** A stereo signal's mid = everything identical between L and R; the side = everything different. Derive a side image manually by phase-inverting one channel of a stereo track — this nulls out everything identical, leaving only the difference signal. Free, simpler alternative: **MSED (Voxengo)** — a dedicated mid/side encode/decode utility. Owned equivalents that do the same job with more control: [[Ghz Midside 3]], [[Ghz Midside Matrix 3]], [[S1 MS Matrix]].
- **Mid/Side EQ — three go-to moves.** (1) High-pass the **side** image to make the low end mono (the single most common M/S EQ move — locks the lows center and mono-safe while the rest keeps its width). (2) Boost **~2.5 kHz on the mid** image to help a vocal cut through in a master (a mid-only presence boost — doesn't touch the side, so it doesn't brighten/widen the overall image while doing it). (3) A **high shelf on the side** image expands the perceived high frequencies / brightens the width without affecting the center. → [[Ghz Midside 3]] (has independent mid/side filtering built in for exactly this).
- **Easy M/S routing — process anything in mid/side even when the plugin doesn't offer it natively.** Duplicate the channel/track, then put an M/S encode/decode utility (MSED, or owned [[S1 MS Matrix]] / [[Ghz Midside Matrix 3]]) on **both** copies — one instance isolating the mid image, the other isolating the side — and insert whatever plugin is needed on each copy independently. This turns any mono-in/stereo-out plugin into a de-facto M/S processor. Most DAWs offer some native M/S routing option; when they don't, this two-instance trick is the reliable fallback.
- **Mid/side saturation — a chapter of its own, distinct from ordinary saturation.** Uncommon but useful. Owned: [[Saturn 2]] natively supports M/S routing for this. When a saturator doesn't offer M/S natively, use the duplicate-channel routing trick above with any saturator (demoed on **PSP Saturator**, unowned). Worked recipe: saturate the **mid** image emphasizing the **lows**, which makes the low end read more centered/anchored; saturate the **side** image emphasizing the **highs**, causing an expansion of the perceived stereo highs. The setup + the harmonics saturation generates become a stereo-imaging tool in their own right, not just a coloration one. → [[Roar]] (Ableton's own mid/side saturation routing mode is the closest native owned equivalent), [[Stereo Tool]] (independent Mid Sat / Side Sat controls map onto the same recipe).
- **Mid-image compression for dynamic stereo expansion.** Whenever the **mid** image is compressed **more** than the side, the mix reads wider — because attenuating the (usually louder, more transient-heavy) center makes the side read louder by comparison. This is usually the natural outcome anyway, since the mid image is typically more powerful and triggers a compressor more often than the side does. Stated applicability is broader than a mastering-only trick: **works on drums, vocals, and full mixes/masters — subtly** on the latter two. → [[Pro-MB]] (Stereo Placement = Mid on a band already covers the frequency-specific version of this from a different Sage Audio video), [[Width and Stereo]].
- **Creative temporal mid/side — run a different delay or reverb type on the mid image than on the side.** Example given: a harmonizer on a vocal's mid image, paired with reverb on the side image — two genuinely different effects rather than the same send at different levels. Also demoed on drum overheads specifically, to give the sides their own distinct stereo imaging separate from the center. → [[Delay]], [[Reverb]].
- **Transient expansion on the side image — a favorite move, especially on drums.** The sides frequently lack a needed percussive quality that a transient expander can restore; insert a transient expander (heard in captions as **"Punctuate"** — vendor unclear, possibly a mis-transcribed/lesser-known product, flagged for the wishlist rather than confidently named) on the isolated side image (same duplicate-channel routing as above), then blend the effect in carefully so it isn't overdone.
- **Mid-image parallel processing — compression, limiting, and overdrive blended into the mid image only.** Demoed with **Invigorate (Newfangled Audio)** on the mid image, blended in via a mix/dial control. Works well on drums; also called out as a good fit for various instrument buses, not just drums specifically. → [[Parallel Processing]].
- **Split EQ inserted onto an M/S image — four independently-adjustable zones from one signal.** Insert a split EQ (matches Soundtheory's **Split EQ**, already on [[Plugin Wishlist]] under its Eventide-branded co-release) onto a signal's mid/side image (via the duplicate-channel routing), so the mid and side images each get further broken into their own tonal and transient elements via the split EQ — mid-tonal, mid-transient, side-tonal, side-transient, four zones total from one source. Flagged as a setup that can introduce phase issues if not careful; needs dialed-in settings to avoid it.
- **Automation on mid/side channels — three levels, from simple to the video's own favorite.** Simple: automate the mid image's volume **down** while the side's volume goes **up**, for increasing stereo expansion over a section. More aggressive: automate panning on the mid/side channels. The video's own preferred move: automate **different, dynamically-changing levels of saturation on the mid and the side independently**, so the timbre and the width of the stereo image both evolve together over time rather than sitting at one static setting. → [[Automation]].

## Routed to

- [[Width and Stereo]] — full "From videos" set: the routing trick, mid/side EQ recipe, saturation recipe, temporal-effects split, transient expansion on sides, mid-image parallel processing, split-EQ + M/S combo, M/S automation
- [[EQ]] — the three-move mid/side EQ recipe (side HPF, mid 2.5 kHz vocal boost, side high shelf)
- [[Saturation and Distortion]] — mid/side saturation as its own technique category
- [[Compression]] — mid-image compression's broadened applicability (drums/vocals, not just mastering)
- [[Delay]] and [[Reverb]] — different delay/reverb type on mid vs. side
- [[Ghz Midside 3]] — Techniques section added: the EQ recipe
- [[S1 MS Matrix]] — Techniques section added: the duplicate-channel M/S routing trick, stated as an explicit workflow
- [[Roar]] — new Techniques bullet: the mid-lows/side-highs saturation recipe mapped onto Roar's mid/side routing mode
- [[Stereo Tool]] — new Techniques bullet: Mid Sat/Side Sat mapped onto the same saturation recipe
- [[Pro-MB]] — new Techniques bullet: mid-image compression's applicability broadened beyond mastering
- [[Production/Plugin Wishlist|Plugin Wishlist]] — MSED (Voxengo, free), PSP Saturator, Invigorate (Newfangled Audio), Punctuate (transient expander, vendor unclear) added; a new bullet added under the existing Split EQ entry for the M/S + tonal/transient combo
- [[Master Chain]] — a new `## From videos` bullet: M/S saturation as a master-bus option
- [[3 Drums Bus|Drums Bus]] — a new `## From videos` bullet: side-image transient expansion + mid-image parallel processing on a drum bus

## Source

- [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM) — Sage Audio, 8:10
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken breakdown throughout; eight short musical A/B demos not transcribable
- Full transcript: [[Mid Side Masterclass (transcript)]]
