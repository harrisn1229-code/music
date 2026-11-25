---
type: chain
title: Free-Rate Arpeggiator Resampling Rack
reference: asd (ableton sound design, YouTube breakdown channel)
chain_type: style
family: drums
routing: MIDI track (sample/instrument) → [[Arpeggiator]] (Rate Mode = Free) → instrument → new armed MIDI track (MIDI From = arpeggiated track, records the resampled rhythm) → [[2 Drums Group|Drums Group]] or downstream instrument/bus
signal_chain: [Arpeggiator (Rate Mode Free), Rate automation (drawn over a legato note), resample-to-new-MIDI-track, MIDI note editor edits, optional Random → Scale generative layer, optional instrument-internal LFO trigger modulation, optional copied Rate-automation → filter cutoff, optional Corpus/Grain Delay resonator finish]
status: video-derived
tags: [chain, drums, style, sound-design, ableton, arpeggiator, midi, generative, rhythm]
---

# Free-Rate Arpeggiator Resampling Rack

**Reference/vibe:** rhythms that stretch and compress "like a rubber band" instead of sitting on a fixed BPM grid — the entry point of asd's five-part "Exponential Rhythms" series, and its most straightforward method. The sibling chains reach related territory a different way: [[Exponential Groove Drum Rack]] (part 2) uses [[Simpler]]'s percentage-based Length parameter across a whole Drum Rack; [[ableton sound design - EXPONENTIAL RHYTHMS 3-5 Texture Mode|Texture Mode]] (part 3) uses clip-level warp settings. This chain instead decouples [[Arpeggiator]]'s Rate from BPM-synced time divisions entirely, then — the technique's real power move — resamples the arpeggiator's live MIDI output onto a new track so the result becomes permanent, editable rhythm material rather than a one-off performance.

**Signal source:** built entirely from stock Ableton devices ([[Arpeggiator]], [[Random]], [[Scale]], instrument-internal LFO, optionally [[Corpus]]/[[Grain Delay]]) — nothing here needs an unowned plugin, see [[Plugin Wishlist]] (nothing added from this video).

## Chain (build order)

### 1. [[Arpeggiator]] on any sample/instrument, Rate Mode = Free
Drag any sample onto a MIDI track (any MIDI instrument or VST works — demoed on a kick sample), load [[Arpeggiator]] as a MIDI effect, and set **Rate Mode = Free**. This decouples Rate from BPM-dependent divisions and instead sweeps a raw **10 ms–1000 ms** interval range — holding a note and moving Rate live stretches/squishes the rhythm in real time.

### 2. Draw Rate automation over a legato note for precision
Build a 2-bar MIDI clip with a single note on middle C, press **Legato** so the note sustains to the clip's end, and draw a Rate automation curve directly over it. Different curve shapes produce distinctly different rhythms; crossing a certain Rate threshold flips the result from discrete rhythmic hits to a continuous pitched tone (the series' recurring audio-rate-crossover phenomenon).
- **Why:** live performance (step 1) is good for finding a range; drawn automation is what makes the result repeatable and refinable.

### 3. Resample to a new MIDI track — lock the rhythm in
Create a new MIDI track, arm it, and set its input/**MIDI From** to the arpeggiated track, then record. Every arp hit is captured as a distinct, permanently editable MIDI note event — stretch, compress, or chop individual hits in the new clip's note editor.
- 🎬 *From video:* asd used exactly this to build a song's central rhythm — resampled the arpeggiated MIDI output from a **hi-hat** track, then reused that resulting MIDI clip to drive the rhythms of the **bass, strings, and vocal** elements elsewhere in the same track. One resampled rhythm became the backbone for multiple, otherwise-unrelated parts.
- **Why:** this is the step that turns Arpeggiator from a live-only modulation effect into reusable, arrangeable material — the technique's real value over just riding Rate live.

### 4. Secondary shaping parameters (optional, stack freely)
- 🎬 *From video:* modulate **Gate** for note-length variation relative to the current Rate value.
- 🎬 *From video:* feed **chords** into Arpeggiator instead of single notes for pitch variation across hits, plus variation for any key-tracked downstream parameters; the **Style** parameter changes how the chord gets interpreted/ordered.

### 5. Optional generative-melody layer: [[Random]] → [[Scale]]
For tonal/harmonic instruments, chain a [[Random]] MIDI effect right after Arpeggiator (re-transposes each generated hit), then a [[Scale]] device after that (quantizes the randomized result into a chosen scale) — turns the arp into a self-generating melodic line that stays in key.

### 6. Optional per-hit modulation: instrument-internal LFO trigger mode
For instruments with a built-in LFO: enable its note-on/trigger mode with wave = Random or Sample & Hold, so every incoming arp hit retriggers the LFO to a fresh random value assignable to pitch, filter cutoff, or other synth parameters. Distinct from the Max for Live [[LFO]] device — this uses the instrument's own internal LFO.

### 7. Optional correlated-movement finish: copy Rate automation to a second parameter
Copy the drawn Rate automation curve and paste it onto a second parameter's automation lane (e.g. filter cutoff), then reshape to taste on the new target.
- 🎬 *From video:* demoed on the kick-sample instrument — pasted the Rate curve onto a **resonant high-pass filter's cutoff**, pitched the sample up, and tightened the amplitude envelope for a tighter, "clicky" sound. *(general starting point — exact filter/pitch/envelope values not given in source)*

### 8. Optional resonator finish
As a further textural layer, run the result through a resonator effect — asd names [[Corpus]] and [[Grain Delay]] as personal go-tos for this, flagged as "an entirely different rabbit hole" with no specific settings given (a dedicated resonators series was stated as planned).

## Macro rack summary

| Stage | Target | Job |
|---|---|---|
| Rate Mode | Arpeggiator Rate | Free = 10–1000 ms raw range, decoupled from BPM |
| Rate automation | Arpeggiator Rate, drawn over a legato note | precise, repeatable stretch/squish shaping |
| Resample track | New MIDI track, MIDI From = arp track | locks the arpeggiated rhythm into permanent, editable MIDI |
| Gate | Arpeggiator Gate | note-length variation relative to Rate |
| Random → Scale | post-Arpeggiator MIDI chain | generative-but-in-key melody on tonal instruments |
| Copied Rate curve | a second parameter (e.g. filter cutoff) | correlated movement from one drawn shape |

## Variations

- **Any MIDI instrument, not just drums** — the demo uses a kick sample, but the technique is instrument-agnostic; asd's own use case (resampling a hi-hat's arp output to drive bass/strings/vocals) shows it working across an entire arrangement, not just percussion. Filed under `2 Drums/` alongside its sibling [[Exponential Groove Drum Rack]] for series continuity, but equally applicable via `5 Inst & Synth/`.
- **Pair with the sibling techniques** — combine this Arpeggiator-based method on one element with [[Exponential Groove Drum Rack]]'s Simpler-Length method on a Drum Rack, or with [[ableton sound design - EXPONENTIAL RHYTHMS 3-5 Texture Mode|Texture Mode]]'s clip-warp method on a melodic clip, for a fuller "exponential rhythms" arrangement across multiple elements.
- **Live-performance vs. drawn-automation are two distinct modes** — live Rate-riding is fast for finding a range/feel; drawn automation + resampling is what makes a result repeatable and reusable elsewhere in the arrangement.

## Notes

- All-stock-plugin build — nothing to add to [[Plugin Wishlist]] from this video.
- Sibling technique note: [[Rhythm and Groove]] (Polyrhythms section) cross-links this chain's audio-rate-crossover mechanism against the sibling Simpler-Length method.
- Resonators (Corpus, Grain Delay) are named as a further finishing layer but with no settings given in source — see those plugins' own notes for their independently-documented techniques from other videos.

**Sources:** asd, [ableton sound design | EXPONENTIAL RHYTHMS [1/5] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I) — video-derived, 2026-08-11.
