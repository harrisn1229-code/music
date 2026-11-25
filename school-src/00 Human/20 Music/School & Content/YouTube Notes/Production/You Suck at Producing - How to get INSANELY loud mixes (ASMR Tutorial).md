---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=lV_lpR2Wgv8
channel: You Suck at Producing
duration: "00:09:47"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: medium — auto-captions, generally followable but a couple of plugin names are clearly garbled ("sweets or a mirror," "eli der")
tags: [yt-note, music, production, mastering, loudness, mixing]
briefed: backlog
---

# How to get INSANELY loud mixes (ASMR Tutorial)

![](https://www.youtube.com/watch?v=lV_lpR2Wgv8)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=lV_lpR2Wgv8)

## Synopsis
A dense, whistle-stop tour of every trick Underbelly uses to get his own tracks loud, built around his song "Turtleneck Training." It moves through four fronts at once: taming per-track dynamics with Saturator's Digital Clip mode before anything hits the master, judging sub-bass level honestly (spectrum + LUFS-matched reference track instead of trusting weak speakers) and fixing it with harmonic content rather than volume, an arrangement philosophy of "loud" coming from minimal simultaneous elements plus heavy sidechain rather than sheer element count, and a from-scratch mastering chain that leans on multiband dynamics and two limiters in series instead of one. Genuinely dense for under 10 minutes — closer to a checklist than a single technique.

## Techniques
- **Saturator's Digital Clip mode as a per-track peak-taming pass, done on basically every track** — before mastering, switch Saturator to Digital Clip, crank Drive a large amount, and pull Output down by roughly the same amount so the level stays put; this squashes the gap between a track's peaks and its average loudness (on the drop drums, peak dropped ~25 dB) and banks headroom that makes the eventual master far easier to push loud. → [[Saturator]]
- **Cut low end out of every element that isn't the kick/sub** — even a subtle low-end trim on non-bass tracks (e.g. pads/chords) clears real room for the kick and sub to own that space later.
- **Visualize sub-bass with a zoomed Spectrum on the master** — sub level is nearly impossible to judge honestly on weak speakers/earbuds; a Spectrum analyzer (Auto-zoomed into the sub band) makes it visible instead of guessed-at.
- **Loudness-match a reference track before comparing anything else** — bring up an integrated-LUFS meter, match the reference's loudness to the track's, THEN compare their Spectrum displays — an unmatched comparison lies about relative sub level.
- **If a reference's sub cuts through more at matched level, fix harmonics, not volume** — turning the sub up isn't the answer if it's already loudness-matched; instead open the sub oscillator's wavetable editor and draw in extra harmonics (instead of a plain sine), adjust their phase, then add a filter + drive to bring those harmonics forward.
- **"Loud" comes from minimal simultaneous elements, not more elements** — his own drop runs only three things at once: drums, bass, and chords — density of arrangement is a loudness lever, not just a taste choice.
- **Keep drum hits short (~100 ms kick) so they duck out of the way fast** — a short kick clears space for everything else almost immediately after it hits.
- **Heavy sidechain on everything except drums, keyed from a muted white-noise "ghost" track instead of the kick's own audio** — decoupling the sidechain trigger from the actual kick sample gives precise control over duck length via Release alone; keep Release short — just enough for the kick to poke through without the pumping itself being audible. → [[Sidechaining]]
- **With few elements playing, spend extra detail on the ones that ARE there** — automate coarse pitch up and down on a plain sine wave, draw in extra harmonics for brightness, and run a bandpass Auto Filter with Drive cranked for grit — turns one simple oscillator into a detailed focal element.
- **A stack of width/character effects on that detail layer** — Grain Delay for octave-widening, Serum's own built-in width effects, and a custom Max for Live device (heard in captions as "Eli der") that reduces the signal to a set number of harmonics and wobbles via time modulation, followed by OTT to squash it and a Frequency Shifter at 100% dry/wet for extra crunch.
- **Mastering chain: clip, then multiband, then a touch of EQ, then TWO limiters in series** — Saturator (Digital Clip) shaves peaks first, same idea as the per-track pass; Multiband Dynamics squeezes low/mid/high independently instead of one broad EQ move; a small brightness boost on an EQ follows; then, instead of pushing one limiter hard enough to distort, run the loudness push through two limiter instances in series — splitting the same gain reduction across two reads noticeably cleaner. → [[Multiband Dynamics]], [[Pro-L 2]]

## Routed to
- [[Clipping and Loudness]] — added two From-videos bullets: the Saturator-per-track + reference-track loudness/spectrum-matching workflow, and the two-limiters-in-series mastering move
- [[Saturator]] — added a Techniques bullet on the Digital Clip per-track peak-taming pass
- [[Pro-L 2]] — added a Techniques bullet on splitting master limiting across two chained instances
- [[Multiband Dynamics]] — added a Techniques bullet on independent low/mid/high squeeze as a mastering EQ alternative
- [[Sidechaining]] — added a From-videos bullet on the white-noise ghost-trigger sidechain kept short, on a minimal-element mix
- [[Plugin Wishlist]] — added the unowned "Eli der" harmonic-reduction/time-wobble device under From videos (to vet)

## Source
[How to get INSANELY loud mixes (ASMR Tutorial)](https://www.youtube.com/watch?v=lV_lpR2Wgv8) · You Suck at Producing · 00:09:47 · captions (medium) · transcript: [[You Suck at Producing - How to get INSANELY loud mixes (ASMR Tutorial) (transcript)]]
