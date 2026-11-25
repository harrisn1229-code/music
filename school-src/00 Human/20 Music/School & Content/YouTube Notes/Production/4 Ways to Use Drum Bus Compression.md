---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=eY-vIUZzA4s
channel: Sage Audio
duration: "00:14:12"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, drums, compression, parallel, multiband, saturation]
---

# 4 Ways to Use Drum Bus Compression

![](https://www.youtube.com/watch?v=eY-vIUZzA4s)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=eY-vIUZzA4s)

## Synopsis

Four distinct, stackable drum-bus compression techniques from Sage Audio: standard bus glue compression with concrete attack/release/GR guardrails, parallel bus compression for pulling up masked low-level detail, an emphasis/de-emphasis EQ trick borrowed from vinyl mastering for frequency-selective compression without a multiband compressor, and harmonic-distortion placement before/after compression for intensity.

## Techniques

- **Standard drum bus compression: concrete guardrails for attack, release, and gain reduction amount.** Route all drum tracks to one bus (in Logic: Stereo Out → an unused numbered bus, creates the aux automatically — route conceptually transfers to Ableton group tracks). Attack too fast attenuates the drums' own transients (kick/snare/hat/tom identity lives in the transient — avoid killing it). Release too long holds gain reduction into the NEXT transient, catching it too; **release should stay above ~20 ms** to avoid low-frequency distortion (the same attack/release-vs-oscillation-period mechanism covered elsewhere in this channel). **Compress subtly: 3-6 dB of gain reduction as a rule of thumb, possibly less** depending on how much the individual drum tracks are already compressed. → [[Compression Staging]], [[2 Drums Group]]
- **Parallel drum bus compression: a SEPARATE aux fed by a unity-gain send from the drum bus (not a change to the drum bus's own output), heavily compressed and blended back in.** Steps: (1) dial in the standard bus compression above first. (2) Add a send from the drum bus to a new aux at **unity gain** — a send, not an output change, so the drum bus's own processing keeps running independently. (3) Insert a heavy compressor on this new "parallel drum comp" aux (a multiband compressor, e.g. Drumatom-style, named as a good choice here) with makeup gain to compensate for the heavy attenuation, keeping the SAME longer-attack/shorter-release philosophy as the main bus to preserve transient dynamics even under heavy compression. (4) Blend the heavily-compressed parallel signal back in via its channel fader until masked low-level detail (snare buzz/ring, stick-on-skin rattle) becomes audible without the main bus's transients being flattened. → [[Parallel Processing]], [[Compression Staging]], [[2 Drums Group]]
- **Emphasis/de-emphasis EQ around a compressor: a multiband-compression workaround using only a standard single-band compressor, borrowed from vinyl mastering's original high-frequency pre-boost/post-cut trick.** Original vinyl technique: boost highs before cutting (emphasis), cut the same amount after playback (de-emphasis) to counteract velocity-related HF loss near a record's center. Applied to drum bus compression: an EQ BEFORE the compressor boosts a target frequency range so the compressor reacts to (compresses) that range more; an equal-and-opposite EQ AFTER the compressor cancels the tonal boost back out, leaving only the extra compression as the audible result. **The inverse setup is the more useful drum-bus application**: EQ before the compressor ATTENUATES a range you want to pass through relatively uncompressed (e.g. dip the kick's low end so the compressor barely reacts to it), letting the compressor bear down harder on everything else (e.g. the mid-range), then apply the equal-and-opposite BOOST after the compressor to restore the original tonal balance — net result: frequency-selective compression (mids compressed harder, kick fundamental left alone) without needing a true multiband compressor. Explicitly named as a workaround for when a preferred bus compressor lacks multiband capability, not a replacement for multiband when one's available. → [[Compression Staging]], [[Multiband Compression]], [[EQ]]
- **Placement of a harmonic-distortion/saturation plugin relative to bus compression changes what gets distorted.** BEFORE compression: the compressor also compresses the added harmonics along with the original signal, making them more prevalent, especially combined with makeup gain or the parallel-compression technique above. AFTER compression: harmonics are generated off the now-controlled, uniform post-compression signal instead. Using distortion both before AND after produces the most intense result — deliberately reserved for drums that need to stick out aggressively in a mix, not a default setting, and explicitly warned against running excessive amounts at both stages simultaneously. → [[Saturation and Distortion]], [[Compression Staging]]

## Routed to

- [[Compression Staging]] (technique) — all four techniques: standard glue guardrails, parallel send/blend recipe, emphasis/de-emphasis EQ workaround, harmonic-distortion placement
- [[2 Drums Group]] (chain) — standard + parallel drum bus compression added to `## From videos`
- [[Parallel Processing]] (technique) — the unity-send-then-blend parallel drum bus recipe
- [[Multiband Compression]] (effect page) — emphasis/de-emphasis as a single-band-compressor workaround for frequency-selective compression
- [[Saturation and Distortion]] (effect page) — before/after-compression harmonic placement

## Source

- [4 Ways to Use Drum Bus Compression](https://www.youtube.com/watch?v=eY-vIUZzA4s) — Sage Audio, 14:12
- Transcript source: captions, high confidence
- Full transcript: [[4 Ways to Use Drum Bus Compression (transcript)]]
