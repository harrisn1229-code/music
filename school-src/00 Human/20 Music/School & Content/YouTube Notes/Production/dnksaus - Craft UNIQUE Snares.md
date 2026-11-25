---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=WeHN9GPokMA
channel: dnksaus
duration: "00:10:15"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, sound-design, drums, snares]
briefed: 2026-W31
---

# dnksaus - Craft UNIQUE Snares

![](https://www.youtube.com/watch?v=WeHN9GPokMA)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=WeHN9GPokMA)

## Synopsis

A from-scratch sound-design pass on building a unique snare instead of only auditioning samples — the snare-specific companion to the channel's earlier kick/drum-kit videos. dnksaus opens by reframing what a snare even is ("any somewhat tonal sound with a punchy or snappy transient," spanning tonal dubstep-snare emulations to pitched-up percussion to real found percussion), then builds a full synth snare in **Operator**: a fixed-frequency body oscillator macro-mapped into the 160–250 Hz snare range with a pitch envelope for punch, a noise-oscillator tail shaped by reverb and EQ, a second noise transient layer, and texture from **Shifter** and **EQ Eight**'s narrow-Q "punchy part" trick — all grouped and saved as a reusable, macro-mapped "snare starter" rack. From there he layers in **Corpus** (physical modeling) for a "splinky" UK-style texture, Drum Bus for transient shaping, foley/percussion one-shots from a saved browser search, an initial pre-hit click for tension, and — for metallic SOPHIE-style snares — **Grain Delay**'s Spray control. The video closes with a resampling/take-lane workflow for capturing keepers from a randomized rack, and one more unconventional trick: pitching a booming "impact" one-shot up ~4 octaves through Drum Bus → Pro-Q 4 (and, for the unowned-plugin-curious, Kilohearts Spiff's spectral Delta mode).

## Techniques

- **Reframe what counts as a snare** — any tonal-ish sound with a punchy/snappy transient qualifies: tonal dubstep-snare emulations of a real drum, the same dubstep snare pitched up a couple octaves (reads as percussion instead), or a real percussion one-shot that already has a natural snap.
- **Operator body oscillator, fixed frequency in the snare range** — set an oscillator to a fixed (not note-tracked) Frequency, group it into a rack ("the body"), macro-map that frequency to roughly 160–250 Hz. Re-trigger on, Voices = 1. Pull Sustain + Decay down, push Initial (transient) + Attack up.
- **Pitch envelope for punch** — Peak ≈ 48, Decay brought down, turns the body oscillator percussive rather than a pitch-sweep; FM the oscillator on top for a more "perky" character.
- **Noise-oscillator tail, EQ'd to stay out of the body's way** — a second Operator on a Noise oscillator with attack up builds the tail/impact layer; map each layer's individual time knobs to a macro (roughly -255 to 30 ms) and map volume too; EQ out the low end and trim harmonics so the body still reads through.
- **Reverb decay + size macro-mapped on the tail** — add a reverb to the tail layer and map Decay (kept short) and Size to macros for a controllable amount of "room" per variation.
- **A second transient/click layer** — another Noise oscillator, harmonics pushed up, for extra click/attack detail layered under the main hit.
- **Shifter for chorus/frequency-shift texture, then again for Fine Tune** — map Shifter's chorus/frequency-shift amount to a macro (~500 Hz–1 kHz) on the tail; a second Shifter later in the build maps Fine Tune instead.
- **The "punchy part" EQ trick: a narrow ~200 Hz peak** — a narrow-Q boost around 200 Hz brings out the body's punch; narrower = more ring. Map Gain (floored at 0) and Q to a macro so the amount of ring is variable/randomizable. Bring the highs up slightly and group the whole thing.
- **Save the result as a "snare starter" rack** — with every stage macro-mapped (frequency, pitch-envelope peak, reverb decay/size, EQ gain/Q, texture dry/wet), the saved rack is a combinatorial starting point, not a fixed sound — build future snares as variations on it, and save several variations into the sample library.
- **Corpus as a "splinky" UK-style texture layer** — physical-modeling stock device in Suite; map nearly every relevant macro except Width/L-R position/Spread, but do map Dry/Wet. An LFO on a mapped parameter adds a "splinky" modulated character; cap Decay so it doesn't ring out too long when layered under an existing snare.
- **Drum Bus for transient shaping** — its Transient knob pulled negative shortens the decay for a snappy/tight sound; pushed positive it emphasizes the initial transient instead — fun combined with the device's other parameters, especially right after a "put it in a room" reverb.
- **Foley/percussion browser layer, saved as a reusable search** — filter the Samples tab for One-Shot + Foley or Percussion, then save that filtered search for later reuse instead of re-filtering each session.
- **An initial click before the main hit adds tension** — the Jack Ü-style habit of a short pre-hit click ahead of the actual snare transient.
- **A reverb-based tail instead of noise** — the tail layer doesn't have to be a noise burst; a short, tight reverb (e.g. a "water splash" character) can stand in for it.
- **Metallic (SOPHIE/umu-style) snares via Grain Delay's Spray** — Grain Delay samples small snippets of the incoming signal (snippet size set by its Frequency knob); with Time at zero, Spray randomly and differently offsets left/right timing on every grain cycle, reading as metallic; more Feedback + varying Frequency = more variety. "Short delay times make it metallic, and Grain Delay makes it more random, so the metal sounds cooler."
- **Resample continuously to catch a keeper from a randomized rack** — highlight a short section (~half a bar), Command+L to loop it, add a new audio track, and keep resampling the snare rack (automating parameters while it runs); Live 12.2's take-lane dropdown (or Enter on a stacked take) makes picking the best pass fast.
- **Pitched-up impact one-shot as a percussive layer** — filter Samples → One-Shot → "impact" for something big/booming, pitch it up ~4 octaves (same logic as pitching a dubstep snare into percussion territory), then Drum Bus → Pro-Q 4 (light expansion/compression via its dynamic-band Attack/Release). Some results read closer to a hi-hat than a snare.
- **Kilohearts Spiff's Delta mode for spectral transient shaping (unowned)** — a spectral transient shaper that can expand some frequencies more than others; Delta mode isolates just what's being boosted vs. the dry signal — another route to perky snares, and noisy layered results can make good clap/snare hybrids (some get "too weird").

## Routed to

- [[Snare Design]] — **new technique note** (sibling to [[Kick Design]]): the full body/tail/texture/EQ recipe, the "snare starter" rack, and the layering/metallic variants
- [[Corpus]] — **new plugin note** (Ableton stock physical-modeling resonator, previously undocumented gap); registered in [[Plugin Index]] under Modulation
- [[Grain Delay]] — **new plugin note** (Ableton stock granular delay, previously undocumented gap); registered in [[Plugin Index]] under Reverb/Delay; added to [[Delay]] effect page's Owned list
- [[Operator]] — new `## Techniques` bullet: the fixed-frequency body-oscillator + pitch-envelope snare build (light touch — Operator's own dedicated deep-dive is a separate upcoming video)
- [[Shifter]] — new `## Techniques` bullet: macro-mapped chorus/frequency-shift + Fine Tune on snare layers
- [[EQ Eight]] — new `## Techniques` bullet: the narrow ~200 Hz "punchy part" peak, macro-mapped Gain/Q
- [[Drum Bus]] — new `## Techniques` bullet: the Transient trick reused on a built snare
- [[Simpler]] — new `## Techniques` bullet: pitched-up impact one-shot as a percussive layer
- [[Pro-Q 4]] — new `## Techniques` bullet: dynamic-band Attack/Release as a creative expander/compressor
- [[Reverb]] (Ableton plugin note) — new `## Techniques` section + bullet: macro-mapped Decay/Size for a controllable tail
- [[Sampling and Sound Selection]] — new `## From videos` bullet: saving a filtered browser search (One-Shot + Foley/Percussion) for reuse
- [[Sound Selection Guide]] — new Snare/Clap bullet cross-linking [[Snare Design]]
- [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] (chain) — inline 🎬 tip under Sound Selection + new `## From videos` bullet, both pointing at [[Snare Design]]
- [[Plugin Wishlist]] — no new add; Kilohearts Spiff already listed there (Ian Kirkpatrick citation) — dedupe, skipped

## Source

[craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA) · dnksaus · 10:15 · captions (high confidence) · transcript: [[dnksaus - Craft UNIQUE Snares (transcript)]]
