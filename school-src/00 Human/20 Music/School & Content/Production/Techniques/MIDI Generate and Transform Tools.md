---
type: technique
title: MIDI Generate and Transform Tools
tags: [technique, ableton, midi, workflow, composition]
---

# MIDI Generate and Transform Tools

Live 12's piano roll added a **Generate** menu (creates new MIDI from scratch — rhythms, note clouds, melodic shapes, chord stacks) and a **Transform** menu (reshapes MIDI that already exists — arpeggiate, fill gaps, add ornaments, quantize, shuffle, adjust note-ends, warp time) — a genuinely new layer of the piano roll, distinct from [[MPE Piano Roll Tools]] (which covers the MPE tab's *per-note expression* generators, Glissando and the MPE LFO) and from [[Randomized Rack Design]] (device/macro-level randomization rather than MIDI-note generation). A sensible order to work in: **Generate → Transform → Pitch and Time** (the last for humanizing/extending/adding scale intervals). Companion to [[Chord]] and [[Scale]] (the Stacks generator overlaps their territory but works directly inside the piano roll rather than as a rack device), [[Arpeggiator]] (the Arpeggiate transform mirrors the stock device), and [[Ableton Extensions and MIDI Tools]].

## Generate
- **Rhythm** — generates a rhythmic pattern for a chosen sample/pitch; **Split** adds double-time in places. Layering several Rhythm-generated parts (different sample, different generated pattern, panned apart, velocity variance with adjustable accent placement) builds a full hi-hat pattern fast — finish with a reverb send and a sample selector.
- **Notes** — generates a cloud of notes across a set pitch range, with controls for note-length range, velocity range, max simultaneous voices, and a **Density** knob controlling how much randomness shows up. Follow with the Pitch and Time section to humanize the result.
- **Shape** — a sequencer-like melody generator: set a rate, add random variation, control the density of that randomness, or start from a preset shape. A genuinely useful way to generate melodic ideas, not just rhythmic ones.
- **Stacks** — the piano roll's own chord generator: choose a root note and inversion (shown as a chord name plus a constellation-style diagram), add further chord shapes, and offset each chord to start at a different time. Needs tweaking to sound musical, but a strong idea-starter. → [[Chord]], [[Scale]]
- **Max for Live generators** — a stock M4L generator ships by default, with room for community-built ones — opens the Generate menu up beyond Ableton's own presets.

## Transform
- **Arpeggiate** — works similarly to the stock [[Arpeggiator]] device, applied directly to existing MIDI in the piano roll rather than a rack device.
- **Connect** — fills the gaps between chords/notes; turning up **Spread**, **Rate**, and **Tie** while lowering **Density** produces small melodic "flares" bridging the silences.
- **Ornament** — adds transient-like grace notes at the start of a note, sometimes at a different pitch than the note itself.
- **Quant** — standard quantization.
- **Recombine** — a shuffle/rotation transform (a shuffle button and a mirror button, the latter distinct from a straight pitch-reverse) — configurable to affect pitch, length, and/or velocity independently.
- **Span** — a length adjustment for note *ends* specifically — a humanize-style tool aimed at how notes finish rather than where they start.
- **Strum** — spreads a chord's notes into a strummed attack, piano-roll-native (distinct from the [[Chord]] device's own Strum control).
- **Time Warp** — a separate warp tool from the Pitch and Time section's own timing controls; lets you draw custom time-warp curves while still quantizing within a window of the original timing.

## Workflow order
Generate → Transform → Pitch and Time (Extend, add scale intervals, humanize, nudge an octave) is the suggested sequence — build the raw material first, reshape its pattern/rhythm second, then finish with pitch/timing polish and length changes last.

## See also

- Plugins: [[Chord]] · [[Scale]] · [[Arpeggiator]] · [[Hybrid Reverb]]
- Techniques: [[MPE Piano Roll Tools]] · [[Randomized Rack Design]] · [[Ableton Extensions and MIDI Tools]]

## From videos

- **Resample a Free-Rate Arpeggiator's live MIDI output to a new track — a second instance of "record generative MIDI to lock it in"** — with [[Arpeggiator]] set to Rate Mode = Free driving a sample/instrument, create a new MIDI track, arm it, set its input/MIDI From to the arpeggiated track, and record — every arp hit becomes a distinct, permanently editable MIDI note event (stretch/compress/chop in the new clip's note editor) instead of a live-only modulation effect. Used to build a song's central rhythm: an arpeggiated hi-hat track was resampled this way, then the resulting MIDI clip was reused to drive bass, strings, and vocal rhythms elsewhere in the same track — the same underlying pattern as the "record generative MIDI back out" entry below, applied to an arpeggiator's rhythm output rather than a randomization rack's pitch output. → [[Arpeggiator]], [[Randomized Rack Design]] — asd, [EXPONENTIAL RHYTHMS \[1/5\] Free Rate Arpeggiator](https://www.youtube.com/watch?v=WXzDesXWA3I)
- **Record generative MIDI back out to a fixed clip — the missing half of every randomisation technique.** Any clip or device producing randomised MIDI (a "Group Notes → Play One" pool, a scale-constrained generator) plays differently every pass, which is useless the moment you like a version. Fix: `Ctrl+Shift+T` for a new MIDI track, set its **MIDI From** to the randomisation track specifically (not "All Ins"), arm it and record. The generated notes print as an ordinary editable clip — a "monophonic seed" you can layer, quantize or edit. Without this step generative tools are a toy; with it they're a material generator. Works for synth parts, not just drums. → [[Randomized Rack Design]] — Tom Casey Music, [[Tom Casey Music - This One Ableton Hack Makes Drums Sound Insane]]

- **Stacks: browse voicings per generated chord, read the name/notes/degrees Ableton labels underneath, and offset chords for legato feel** — with a Stacks-generated chord selected, the up-arrow cycles through alternate voicings for that same chord while Ableton displays the chord name, its notes, and its scale degrees directly below the piano roll (no manual identification needed); after generating several chords in a row via the **+** button, resizing/overlapping their boundaries slightly (rather than leaving them as blunt back-to-back blocks) gives a more legato progression. → [[Chord]], [[Chord Progressions]] — You Suck at Producing, [UNLOCK Music Theory with New Tools in Ableton Live 12](https://www.youtube.com/watch?v=Br2a6XxMZ5M)
- **Notes generator, under its earlier Live-12.0 name "Seed": Voices/Density/pitch-range/Duration for a quick melodic sketch** — set **Voices** to 1 for a monophonic line, dial **Density** down to thin the result, constrain the **pitch range** to a useful register for the current key (e.g. an octave-plus band around the tonic), and adjust note **Duration** — a fast way to sketch a new melody without playing anything in. → You Suck at Producing, [UNLOCK Music Theory with New Tools in Ableton Live 12](https://www.youtube.com/watch?v=Br2a6XxMZ5M)
- **Shape: draw the melodic contour directly instead of only using rate/randomness/presets** — beyond the rate + random-variation + preset-shape controls already documented above, Shape also accepts a hand-drawn contour: literally draw the up/down melodic line in the piano roll, then dial in Density, tie notes together, and adjust Range (highest/lowest note) and Rate to taste. — You Suck at Producing, [UNLOCK Music Theory with New Tools in Ableton Live 12](https://www.youtube.com/watch?v=Br2a6XxMZ5M)
- **Generate (Rhythm/Notes/Shape/Stacks/Max for Live) and Transform (Arpeggiate/Connect/Ornament/Quant/Recombine/Span/Strum/Time Warp) — Live 12's new piano-roll MIDI-generation system** — full mechanics documented above, including the layered hi-hat-pattern build from stacked Rhythm generators and the suggested Generate → Transform → Pitch and Time workflow order. → [[Chord]], [[Arpeggiator]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
