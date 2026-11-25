---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=bf8Ia7ALpu8
channel: dnksaus
duration: "00:02:26"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: medium — auto-captions garbled several technical terms (e.g. "MP" for MPE, "gandoo" for Glissando); corrected against context, content is clear despite the rough raw transcript
tags: [yt-note, music, production, ableton, midi, mpe]
briefed: 2026-W31
---

# dnksaus - This Device Automates Each Note Separately - Live 12.1

![](https://www.youtube.com/watch?v=bf8Ia7ALpu8)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=bf8Ia7ALpu8)

## Synopsis

A quick-hit (2:26) intro to Live 12.1's two new piano-roll MPE mini-tools, previously undocumented in the vault: **Glissando**, which auto-connects matching notes across a chord progression (e.g. every chord's top note) and pitch-glides them into each other with adjustable timing/slope, and the **MPE LFO**, which auto-generates per-note modulation (fade-in/out envelope, sine/square/triangle/Random shapes) targetable at Pitch Bend, Slide, or Pressure via an "MP" dropdown. dnksaus demos it on Wavetable, mapping Slide to Wave Position and Pressure to Filter Frequency on the instrument's own MPE tab, then pressing the LFO's Random button to auto-generate independent per-note automation (each note starting from a different seed) before pushing the pitch range to an extreme ~96 semitones for a glitch effect, freezing/flattening the result, and dropping it into Simpler to sketch a bass patch.

## Techniques

- **The underlying feature: true per-note pitch bend** — Live's piano-roll MPE tab lets you click an individual note and bend its pitch independently, even while other notes are sounding simultaneously — distinct from a single shared pitch-bend lane for the whole clip.
- **Glissando — auto pitch-glide between chord voicings** — connects matching notes across a progression (e.g. each chord's top note glides into the next chord's top note); if the note count changes between voicings, it shows which note each one connects to instead; both glide timing and glide slope/curve are adjustable. Framed as an easy way to add tension to a chord progression.
- **MPE LFO — auto-generating per-note modulation with a fade envelope** — Attack/Decay-style controls fade the LFO's depth in and out over a note's length rather than running at constant depth from note-on; sine/square/triangle are available, but the **Random** shape gives a noisy per-note character, especially at slow rates.
- **The MP dropdown retargets the LFO to Slide or Pressure, not just Pitch Bend** — the same auto-generating LFO can drive whichever MPE parameter lane is selected.
- **MPE controllers (e.g. Push) drive Slide/Pressure independently per note** — finger-slide drives Slide, finger-pressure drives Pressure, on hardware that supports it.
- **Map Slide/Pressure to timbre on Wavetable's own MP tab** — Slide → Wave Position, Pressure → Filter Frequency (example mapping), so per-note MPE data reshapes timbre, not just pitch.
- **Random-seed auto-generation across every note at once** — pressing the MPE LFO's Random button generates independent Slide/Pressure automation for every note in the clip simultaneously, each from a different seed, so every note gets distinct wave-shape/filter-frequency movement without hand-drawing a single curve.
- **Push the pitch range to ~96 semitones for a deliberate glitch effect** — far beyond musical bend range, reads as broken/glitchy rather than expressive.
- **Freeze + flatten, then reprocess in Simpler** — commit the generated result and drop it into Simpler to build a new patch (here, a bass) out of the frozen result rather than leaving the generative MPE data live indefinitely.

## Routed to

- [[MPE Piano Roll Tools]] — **new technique note** (previously undocumented Live 12.1 feature, a genuine gap): the full Glissando + MPE LFO mechanics
- [[Wavetable]] — new `## Techniques` bullet: mapping Slide/Pressure to Wave Position/Filter Frequency on its own MP tab (light touch — Wavetable's full dedicated pass is a separate upcoming video in this queue)
- [[Chord]] — cross-linked from Glissando's chord-progression-tension technique (See Also updated)
- [[Expression Control]], [[Ableton Extensions and MIDI Tools]], [[Simpler]] — See Also cross-links added for bidirectional discovery (companion per-note-randomization device, companion productivity-tools note, and the end-of-chain reprocessing step)

## Source

[This Device Automates Each Note Separately - Live 12.1](https://www.youtube.com/watch?v=bf8Ia7ALpu8) · dnksaus · 2:26 · captions (medium confidence — garbled auto-captions on technical terms) · transcript: [[dnksaus - This Device Automates Each Note Separately - Live 12.1 (transcript)]]
