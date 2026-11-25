---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=Izo8-oYXvOQ
channel: dnksaus
duration: "00:17:17"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken walkthrough, auto-caption punctuation light but content unambiguous; two VST product names are somewhat garbled and flagged below
tags: [yt-note, music, production, ableton, color-bass, future-bass, sound-design, genre-study]
briefed: 2026-W31
---

# dnksaus - Color Bass and Future Sound Design in 2023

![](https://www.youtube.com/watch?v=Izo8-oYXvOQ)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Izo8-oYXvOQ)

## Synopsis

An explicit survey — "every color-bass/future-rhythm method I know" — split stock-first, VST-second. Stock methods: convolution reverb using recorded chord stabs as impulse responses (building a reusable, key-organized personal "chord impulse" sample library — a genuinely new workflow habit layered on top of the chord-locked-convolution rack already documented on [[Hybrid Reverb]]); a standard project-start template of sends; a Vocoder used as a textural "creepy noise" pad (light touch here — full Vocoder treatment lands on its own dedicated video later in this batch); a Spectral Resonator vs. plain-resonator comparison; Granulator as a texture layer; and — the throughline of the "future sound design" half — the reminder that future bass's wobble is fundamentally just Shaper/LFO volume automation ("2016 in a nutshell"), reinforced with a low-pass or a random texture device (Auto Filter, Spectral Time) automated alongside it, plus building a color-bass patch from independently-layered voices (top/middle/bottom, each its own oscillator instance) rather than one fat unison patch. VST half: Zynaptiq Pitch Map (a second independent endorsement, already wishlisted from an Ian Kirkpatrick video), Zynaptiq MORPH (new — real-time two-sound morphing), and a Harmony Engine-type auto-chord generator (vendor unclear from the audio). This video is also the direct source for a new **Color Bass** card added to [[EDM Subgenres]], since the existing Future Bass card didn't capture this more experimental, texture-driven sibling style.

## Techniques

- **Build a reusable, key-organized "chord impulse" sample library for convolution reverb** — record chord stabs, EQ/verb them to taste, export via Cmd+Shift+R into a dedicated personal sound-design sample folder (organized by key, e.g. an "F# minor" subfolder within a "chord impulses" folder), then drag those into Convolution-mode [[Hybrid Reverb]] instances (Size ~100–200, or down toward 50 for an octave-up character) with a [[Scale]] MIDI device on the source track to stay in key. Builds on the already-documented chord-locked-convolution-rack technique (duplicate the chain per chord, Distribute Ranges Equally, map to a macro) by turning it into a growing, reusable personal library rather than a one-off rack. → [[Hybrid Reverb]], [[Scale]]
- **Standard project-start send template** — habitually loads a Valhalla reverb, a Room Reverb, an Echo, a "wide"-bus rack from his own rack pack, Chorus-Ensemble, a granular Max device, and a kick/snare sidechain rack at the start of every new project file, rather than building sends from scratch each time. → [[Plugin Wishlist]]
- **Vocoder as a textural "creepy noise" pad** — External carrier mode, chord-stack/noisy audio as the modulator input, compressed/leveled and aligned, **Range reduced** for a calmer, more pad-like result rather than an aggressive vocoded sweep, then further EQ/band-range tweaks. Light touch here — full Vocoder coverage is deferred to its own dedicated video later in this batch.
- **Spectral Resonator vs. a plain resonator, MIDI-driven from a muted chord track** — a plain resonator is conceptually just a bank of tuned EQ notches; Spectral Resonator does the same job but reads as "cooler," and adds MIDI input so a muted chord-playing track can drive which pitches it resonates (Poly mode for full chords, not just one note at a time). Layered here with Granulator for extra texture on top. → [[Spectral Resonator]], [[Granulator 3]]
- **Future bass's wobble is fundamentally Shaper/LFO volume automation** — the core mechanism behind the classic 2016-era future-bass wobble sound (referencing Flume's style) is just automating amplitude with a [[Shaper]] or [[LFO]]; reinforce it with an automated low-pass ([[Auto Filter]]) or a texture-generating device like [[Spectral Time]] automated alongside for movement. → [[EDM Subgenres]] (Color Bass)
- **Color-bass patch built from independent per-voice layers** — rather than one fat unison patch, split a color-bass sound into a top-layer voice, a middle-layer voice, and a bottom-layer voice, each its own [[Wavetable]]/[[Operator]] instance, then group them — with a dynamics-linked bit-reduction stage ([[Redux]]/[[Erosion]]) crunching the combined result once the layers are stacked. → [[Wavetable]] (Color Bass patch recipe)
- **VST: Zynaptiq Pitch Map needs effects stacked after it to stand out** — judged to sound fairly generic/"basic" by itself; pairs with a Shaper-driven scale-quantize trick and a retune pass through a second, differently-algorithmed pitch-shift VST (too garbled to name reliably) to actually read as distinctive. Already wishlisted from a separate Ian Kirkpatrick source — this is a second, independent endorsement of the same plugin. → [[Plugin Wishlist]]
- **VST: Zynaptiq MORPH for real-time two-sound morphing** — computes a continuous A→B and B→A transition across an X/Y control, for hybrid sounds sitting between two source patches (demoed morphing an Operator patch toward another sound). → [[Plugin Wishlist]]
- **VST: a Harmony Engine-type auto-chord generator** — automatically generates chord/harmony content from an input; named in passing, vendor not confidently identifiable from the audio. → [[Plugin Wishlist]]
- **Recap framing (his own):** convolution, vocoder, resonator, spectral resonator, filtering/automation on a plain chord source, granulating, and layering — treated as the seven repeatable stock "color" methods this whole channel keeps returning to.

## Routed to

- [[Hybrid Reverb]] — new `## Techniques` bullet: reusable key-organized chord-impulse sample library workflow
- [[Scale]] — cross-referenced from the chord-impulse-library technique (no direct edit; already covers the "play in key" use)
- [[Spectral Resonator]] — new `## Techniques` bullet: comparison vs. a plain resonator + Range-reduced pad use
- [[Wavetable]] — new **Color Bass** Patch Recipe: independent per-voice layering
- [[EDM Subgenres]] — new **Color Bass — 140–150 BPM half-time** genre card (Future Bass's texture-driven sibling), the main "may need a section added" gap this video fills
- [[Plugin Wishlist]] — extended the existing Zynaptiq Pitch Map entry with this video's second endorsement + caveat; two new entries: Zynaptiq MORPH, Harmony Engine-type auto-chord VST (vendor unclear); standard project-start send template mentioned in passing
- Vocoder — deliberately light touch; full coverage deferred to its own dedicated video later in this batch, where [[Vocoder]] gets created as a new plugin note

## Source

[Color Bass and Future Sound Design in 2023](https://www.youtube.com/watch?v=Izo8-oYXvOQ) · dnksaus · 17:17 · captions (high confidence) · transcript: [[dnksaus - Color Bass and Future Sound Design in 2023 (transcript)]]
