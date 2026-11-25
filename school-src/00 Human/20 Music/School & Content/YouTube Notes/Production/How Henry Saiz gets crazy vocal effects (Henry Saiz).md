---
type: yt-note
date: 2026-07-19
source: youtube
url: https://youtu.be/tzS2ogFszuI?is=swu2mGCbywchojHU
channel: Aulart
duration: "5:58"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vocals, vocoder]
swept: 2026-07-19
briefed: backlog
---

# How Henry Saiz gets crazy vocal effects | Henry Saiz (Sneak Peek)

![](https://youtu.be/tzS2ogFszuI?is=swu2mGCbywchojHU)
📺 [Watch on YouTube](https://youtu.be/tzS2ogFszuI?is=swu2mGCbywchojHU)

## Synopsis

A short Aulart masterclass sneak-peek where electronic producer Henry Saiz walks through how he built the backing-vocal layer on one of his tracks. The core idea: instead of recording sung harmonies, he keeps the **lead vocal deliberately clean and minimally processed** (light multiband compression, a touch of delay/reverb) and generates the **harmony layer synthetically** — routing a MIDI chord track through a vocoder into a vocal synthesizer plugin (**Neptune**, in Reason) so the vocoder's carrier plays whatever chord/melody the MIDI track feeds it, using the lead vocal as the modulator. He plays the demo with and without the Neptune layer so the contribution is audible. He mentions using Reason mostly for its effects bundle (specifically Neptune) rather than as his main sequencer.

## Techniques

- **Keep the lead vocal clean, put the weirdness in a parallel layer** — the lead vocal chain here is just multiband compression + some delay + some reverb, enough to sit in the mix; all the "crazy vocal effects" branding actually comes from a separate harmony/texture layer built underneath it, not from processing the lead itself.
- **MIDI-driven vocoder harmonies** — signal flow: a MIDI chord/melody track → **vocoder** (lead vocal as the modulator/voice input) → **Neptune** (Zynaptiq vocal synth, running inside Reason) as the carrier/pitch engine. Playing the MIDI track live re-pitches the vocal content to follow the chords, producing sung-sounding harmony stacks without recording additional vocal takes.
- **Neptune's two modes** — he references an "autotune algorithm" mode and a "voice synth algorithm" mode inside Neptune; the voice-synth mode is what lets a MIDI track literally play the vocal like an instrument (comparable in spirit to Melodyne's DNA re-pitch/vocoding, but MIDI-controllable in real time rather than editor-based).
- **A/B the layer to judge contribution** — he explicitly plays the mix with Neptune muted vs. active so the harmony layer's contribution is audible in isolation before committing — a useful habit for judging any parallel/synth-harmony layer rather than trusting it by ear in the full mix only.
- **Reason as an effects-only tool** — notable workflow detail: he doesn't sequence in Reason anymore, he keeps it open specifically to access Neptune and a couple of its other plugins as effects/instruments inside his main DAW.

## Routed to

- [[1 Harmony Vocal Track]] — added a Variations entry: "Synthesized harmonies (Henry Saiz method)" as an alternative to sung block harmonies.
- [[Plugin Wishlist]] — added **Zynaptiq Neptune** under `## From videos (to vet)`.

## Source
- [Watch on YouTube](https://youtu.be/tzS2ogFszuI?is=swu2mGCbywchojHU) · Aulart (Henry Saiz masterclass sneak-peek) · 5:58 · transcript source: captions, high confidence (clean spoken narration, no music-garble issues) · transcript: [[How Henry Saiz gets crazy vocal effects (Henry Saiz) (transcript)]]
