---
type: yt-note
date: 2026-07-31
source: youtube
url: https://www.youtube.com/watch?v=5RNBLgC455s
channel: You Suck at Producing
duration: "00:18:39"
video_type: production
music_enriched: true
briefed: 2026-W31
transcript_source: whisper
tags: [yt-note, music, production, sound-design, bass, neurobass, operator, automation, performance]
---

# How to make (and PERFORM) a Neurobass

![](https://www.youtube.com/watch?v=5RNBLgC455s)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=5RNBLgC455s)

## Synopsis

The single densest bass sound-design video processed this session — a complete, end-to-end neurobass build: constructing a square-wave-like tone from scratch by stacking sine oscillators on odd harmonics (with an actual harmonic-series explanation via the frequency spectrum), a genuinely clever "clamp the macro's range to where the filter actually does something" trick applied to TWO filters sharing one macro, a parallel band-pass/dry blend rack, a full saturation→OTT→EQ→limiter finishing chain (introducing a new Ableton free device, Color Limiter), then a second half on *performing* neurobasses live — recording a macro sweep in time with the groove and cleaning it up with Simplify Envelope, freezing for CPU/chopping, and finally an Instrument Rack built for live performance via a Touché MPE-style controller. Closes by building a mix-and-match "flavor palette" of several different neurobass variations into one composite arrangement track. Referenced back in [[Part 2 of my video with Ableton!]] as the source of a bass swap that fixed a "boxy and flaccid" earlier bass.

## Techniques

- **Full neurobass build order** (complete recipe now on [[Bass Design]]): Operator in Parallel algorithm + mono + Glide (~150 ms) → odd-harmonic oscillator stacking to approximate a square wave from sines → dual filters sharing ONE macro, each capped to its own useful frequency ceiling → a parallel band-pass/dry blend rack → Saturator → OTT (~70%) → EQ (120 Hz translation boost + high-end crisp) → Color Limiter. → [[Bass Design]], [[Operator]], [[Color Limiter]]
- **Cap a Rack Macro's range to where the mapped parameter actually stops doing anything** — after sweeping a filter's cutoff and finding it inaudible past a point (~300 Hz here), map it to a macro and set the macro's own MAXIMUM to that discovered ceiling — the full macro throw now covers only the useful range. Map a SECOND filter (a Band-Pass, found ceiling ~600 Hz) to the SAME macro so one knob sweeps two filters together. → [[Randomized Rack Design]]
- **Parallel band-pass/dry blend via a two-chain Audio Effect Rack** — a heavily band-passed "BP" chain plus an unprocessed "Thru" chain, with the Thru chain's volume brought up just slightly to restore crispness the band-pass alone would remove entirely. → [[Parallel Processing]]
- **Translation-frequency EQ boost (~120 Hz) + cut above it, for phone/laptop-speaker audibility** — boost specifically around the frequency floor most small speakers can reproduce, and cut everything just above so nothing competes with that boost.
- **Live-record a macro sweep in time with the groove, then Simplify Envelope + nudge points to clean it up** — capture a human-timed filter/macro movement by playing and turning the knob live rather than hand-drawing the curve, then use Ableton's **Simplify Envelope** function to reduce the resulting breakpoint density to something editable, followed by small manual timing nudges. → [[Automation]]
- **Freeze + Flatten for CPU, a visible waveform, and easier future chopping** — three concrete, separate reasons to commit a finished MIDI performance to audio beyond the usual CPU argument. → [[Committing and Printing]]
- **A notch filter, performed/automated to coincide with existing movement, for an added phasey layer** on top of an already-frozen bass.
- **Build several distinct variations of the same core patch (crunchy, screechy, trashy, etc.) into a mix-and-match flavor palette**, dragging different frozen clips into different arrangement slots on one composite track rather than committing to a single neurobass patch for the whole song. → [[Bass Design]]
- **A 4-macro live-performance Instrument Rack, played via a Touché (MPE-style hardware controller)** — press = filter open, left = FM/screechy, right = white noise, up = Grain Delay — a real example of mapping a full sound-design chain to one expressive physical controller for live performance rather than programming everything after the fact. *(Hardware-specific — noted for context, not routed to the wishlist.)*

## Routed to

- [[Bass Design]] — full neurobass build recipe added as a new From-videos entry, plus the flavor-palette technique
- [[Color Limiter]] — new plugin note created (free Ableton Creative Extensions limiter), registered in [[Plugin Index]]
- [[Randomized Rack Design]] — macro-range-clamping technique added
- [[Parallel Processing]] — band-pass/dry two-chain blend technique added
- [[Automation]] — live-recorded-macro + Simplify Envelope technique added
- [[Committing and Printing]] — Freeze/Flatten reasons (CPU, waveform, chopping) bullet added

## Source

[How to make (and PERFORM) a Neurobass](https://www.youtube.com/watch?v=5RNBLgC455s) · You Suck at Producing · 18:39 · Whisper (no captions available; moderate confidence, spoken clearly but with music under narration) · transcript: [[How to make (and PERFORM) a Neurobass (transcript)]]
