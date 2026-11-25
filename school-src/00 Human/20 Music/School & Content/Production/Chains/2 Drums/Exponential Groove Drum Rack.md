---
type: chain
title: Exponential Groove Drum Rack
reference: asd (ableton sound design, YouTube breakdown channel)
chain_type: style
family: drums
routing: Drum Rack (per-pad Simpler) → [[2 Drums Group|Drums Group]] → [[3 Drums Bus|Drums Bus]] → Master
signal_chain: [Drum Rack, Simpler ×N (one per pad, loop settings copied to all siblings), Length macro (mapped to all siblings), Transpose macro (hi-hats), Loop macro, Fade macro, harmonic backdrop layer, Reverb, Compressor]
status: video-derived
tags: [chain, drums, style, sound-design, ableton, simpler, generative, rhythm]
---

# Exponential Groove Drum Rack

**Reference/vibe:** an evolving, self-mutating drum groove built from a completely ordinary drum pattern — the pattern itself never changes, but a single macro rides every pad's sample-loop length at once, so the groove constantly stretches, compresses, and drifts into audio-rate texture while the underlying beat stays recognizable. Part of asd's five-part "Exponential Rhythms" series; the sibling clip-level technique (Texture warp mode, no instrument needed) is [[ableton sound design - EXPONENTIAL RHYTHMS 3-5 Texture Mode|Texture Mode]]. The through-line across the whole series: use a percentage-based (not fixed-time) parameter as the modulation target, so the same automation/macro produces genuinely different, evolving results rather than a locked-in repeat.

**Signal source:** built entirely from stock Ableton devices ([[Drum Rack]], [[Simpler]] ×N, [[Reverb]], [[Compressor]]) — nothing here needs an unowned plugin, see [[Plugin Wishlist]] (nothing added from this video).

## Chain (build order)

### 1. [[Drum Rack]] — kit container, one Simpler per pad
Load a Drum Rack with a handful of drum one-shots (impact/kick/snare/hat character samples); Drum Rack auto-creates one [[Simpler]] instance per pad, each with its own spatial/pan variation by default.

### 2. Program the pattern — legato, ordinary
Write a simple, unremarkable drum pattern first — the groove's evolution comes entirely from the macro modulation layered on top, not from a complex pattern. **Every note set to Legato** so notes sustain long enough for the per-pad Simpler loops to actually cycle rather than being cut short.

### 3. [[Simpler]] loop setup on one pad, then **copy value to all siblings**
On a single pad's Simpler: enable **Loop**, disable **Zero Crossing Snap**, set **Sample Start = 0**, **Loop = 100%**, **Length = 100%**, nudge the sample's end marker in toward the tail. Right-click that Simpler → **copy value to all siblings** to push the identical settings to every other pad's Simpler in one action, rather than repeating the setup by hand per pad.
- **Why:** establishes the same loop-capable baseline on every pad before any macro mapping happens — the macro step below depends on every pad already having Loop enabled and a usable Start/Loop/Length setup.

### 4. Map **Length** to a rack macro, then **map to all siblings**
Map one pad's Simpler **Length** parameter to a rack macro; right-click → **map to all siblings** so the same macro now drives every other pad's Length parameter simultaneously. One knob rides loop length across the whole kit.
- 🎬 *From video:* fine-tune each pad's individual **Start/End** afterward so every sample's "sweet spot" for the shared macro range still lands right — not every one-shot loops musically across the exact same macro range without this per-pad correction.
- **Why it's free polyrhythm:** Simpler's Length is a **percentage of each individual sample's own Start–End span, not a time value** — so the identical macro position produces a genuinely different loop rate on every pad (a short sample and a long sample never sync to the same rate at the same macro value). See [[Rhythm and Groove]] (Polyrhythms) for the general mechanism. → [[Simpler]], [[Rhythm and Groove]]

### 5. Ride the macro live against the pattern
Trigger the ordinary drum pattern while moving the Length macro. The exponential/evolving-rhythm movement superimposes onto the existing beat rather than replacing it — the pattern's backbone stays audible while the loop rates underneath constantly shift. Framed in the source as "only creating the illusion of things falling apart," not actual chaos — the balance point between control and disorder is the point of the whole series.

### 6. Extra movement layers (optional, stack freely)
- 🎬 *From video:* map **Transpose** on the hi-hat pads specifically to their own macro — since loop rate is pitch-coupled on a real audio loop, this adds pitch-driven rhythmic movement just to the hats, distinct from the shared Length macro.
- 🎬 *From video:* extend the arrangement's sequence loop length and draw in Length-macro automation across the longer span so the groove keeps evolving rather than repeating a short cycle.
- 🎬 *From video:* deliberately **lengthen some MIDI notes** so they overlap — overlapping notes trigger overlapping looped samples, which reads as genuinely overlapping/layered rhythm rather than one clean pattern.
- 🎬 *From video:* map **Loop** (region start) to a second macro and **Fade** (crossfade) to a third — Loop combined with the existing Length/Transpose automation can push samples further past the audio-rate-looping threshold; Fade smooths the audible clicking that shows up once loop regions get very small.

### 7. Harmonic backdrop + finishing
Layer in one or two additional melodic/harmonic samples for a chordal backdrop under the rhythm (not part of the Drum Rack's percussive pads). Finish with a spacious [[Reverb]] and a healthy amount of [[Compression]] on the arranged sequence. *(general starting point — exact reverb/compression values not stated in source)*

## Macro rack summary

| Macro | Target | Job |
|---|---|---|
| Length | Simpler Length, mapped to all siblings | shared loop-rate control across the whole kit; per-pad rate differs because Length is % of each sample's own length |
| Hi-Hat Transpose | Simpler Transpose (hi-hat pads only) | pitch-coupled loop-rate movement, isolated to the hats |
| Loop | Simpler Loop (region start) | pushes further past the audio-rate-looping threshold, combined with Length automation |
| Fade | Simpler Fade (crossfade) | smooths clicking on very small (near-audio-rate) loop regions |

## Variations

- **Any kit, not just impacts** — the reusable idea is the copy/map-to-all-siblings workflow plus the percentage-based-Length mechanic, not the specific impact-sample kit. Works on any Drum Rack built from one-shots with enough sustain to loop musically.
- **Pair with the Texture-warp-mode approach** — [[ableton sound design - EXPONENTIAL RHYTHMS 3-5 Texture Mode|Texture Mode]] reaches a related-but-distinct family of results at the clip level (no Drum Rack/Simpler needed); the two can be combined on different elements of the same arrangement — one drum kit via this Simpler-macro method, one melodic/textural clip via Texture warp.
- **Pair with the Free-Rate Arpeggiator approach** — [[Free-Rate Arpeggiator Resampling Rack]] (part 1 of the same series) reaches the audio-rate-crossover phenomenon via Arpeggiator's fixed-time Rate parameter instead of Simpler's per-sample-relative Length, and adds a resample-to-new-MIDI-track workflow for locking a rhythm in permanently — usable on any MIDI instrument, not just a Drum Rack.
- **Dial back for a usable mix element** — as built, this is a generative/experimental patch. For a track-ready groove, keep the Length macro's range narrower and reserve full audio-rate excursions for transitions/breakdowns rather than the whole arrangement.

## Notes

- All-stock-plugin build — nothing to add to [[Plugin Wishlist]] from this video.
- Sibling technique note: [[Rhythm and Groove]] (Polyrhythms section) documents the general "percentage-based parameter = free polyrhythm across differently-sized samples" mechanism this chain relies on.

**Sources:** asd, [ableton sound design | EXPONENTIAL RHYTHMS [2/5] Sample Looping in Simpler](https://www.youtube.com/watch?v=QRj6sxdimkQ) — video-derived, 2026-08-11.
