---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=9FX7p23hSlc
channel: loner
duration: "00:07:35"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, piano, synths, vocal-fx, sampling, james-blake]
briefed: backlog
---

# James Blake's production tricks are GAMECHANGING!?

![](https://www.youtube.com/watch?v=9FX7p23hSlc)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=9FX7p23hSlc)

## Synopsis

loner (same channel behind the "how to make authentic house beats," "one shot secrets," and Mike Dean/OZ breakdowns already in this vault) builds a short original track "in the style of" James Blake and narrates the specific moves along the way — a genuine attempt to reverse-engineer Blake's chord voicing, detuning, vocal, drum-bounce, synth-arrangement, and modular-workflow habits rather than a generic "here's a cool plugin" video. The throughline is restraint used as a texture source: open piano voicings for space, deliberate near-out-of-key pitch elements pushed right up to (but not over) "bad," a thin/mono synth foundation that leaves room for the voice, and a found-audio constraint borrowed from Blake's own stated modular-synth philosophy. Also includes a short sponsor segment for an AI voice cloner (used here to benchmark the finished track against Blake's actual voice) — flagged separately below, not treated as a production technique. Most valuable single idea: the "discordant edge" framing — deliberately detuning further than a normal (~30-cent) tolerance specifically to sound unsettled without sounding broken, chopped into an automation clip rather than left static.

## Techniques

### Piano — open/drop-2 voicings for space (~0:20)
- Start from a standard close-position chord (demoed on G♯m7 in its original voicing), then **close the voicing further first** — stack every note as tight together as possible.
- **Drop 2:** take the 2nd-highest note of that closed voicing and move it down an octave. Spreads the chord across a wider frequency range, which (1) makes the chord feel bigger/more ambient, and (2) creates separation between the top note and the rest of the stack.
- **Why it matters musically:** the top note of a voiced chord (the "soprano") is the note the ear tracks as the melody — drop 2 isolates that note more than a close voicing does, so the chord *reads* a melody even when it's just a block chord. → [[Chord Voicings]] (the drop-2 family's full worked shapes/inversions — guitar-fretted there; this is the same voicing principle applied at the piano), [[BED Slot]]

### Piano — the "discordant edge" (detuning without sounding broken) (~1:15)
- Framed as the trick "most people are flat out scared to do": push a sound toward genuine discord (harsh/jarring by definition) without crossing into actually sounding bad — walking that edge on purpose rather than avoiding it.
- **Baseline detune:** transparent compression + a cassette/tape-emulation ("sketch cassette") plugin on the piano for a standard, musical detune — described as sticking to a **~30-cents-max rule of thumb** *(general starting point — the video states this as James Blake's own usual ceiling, not confirmed against a primary source)*.
- **Pushing past it for the discordant edge:** set the piano's own pitch-shift knob range to **one semitone**, then draw an automation clip on it — clicked-in automation points going **well over 50 cents**, then chopped up (short, jagged segments rather than a smooth curve) — attributed to a move James Blake used on "Radio Silence." → [[Pitch and Formant]], [[Automation]]

### Vocals — relative-minor pitch-shift layer (~2:05)
- Record a vocal take, duplicate it, and **pitch the duplicate up 7 semitones**. Framed in the video as turning the melody into "the relative minor key" of the song's major scale *(caption-transcript math as stated — flagged as loose: a plain major-scale relative minor sits a minor 3rd below the tonic, not +7 semitones up; treat the exact interval claim with caution and audition rather than trusting the number)*.
- Layered a couple of extra background-vocal layers inspired by Blake's own catalog: **Frank Ocean's spoken word chopped into a rhythmic pattern, then the chopped background vocals reversed** (the video doesn't name the specific Blake/Ocean collaboration track this references beyond "on [a track]" — transcript drops the title). → [[Pitch and Formant]], [[Vocal Stacks and Ad-libs]]

### Voice cloning (sponsor segment, not a mix technique) (~2:55)
- Used an AI voice cloner (named in the video as "LA.AI," described as needing 10–50 minutes of raw source audio + a one-time fee) to clone James Blake's own voice, specifically to A/B the finished pastiche track against a clone of the real artist's voice as a QA/benchmark step.
- **Not routed anywhere production-side** — this is a sponsored plug for a third-party voice-cloning service, not a mixing/production technique, and voice cloning carries its own consent/ethics questions the video doesn't address. Noted here for completeness only.

### Drums — auto-slice a self-made loop for a unique bounce (~3:35)
- Referenced from a James Blake interview: Blake keeps a folder of drum loops from other tracks and re-chops them to the current tempo rather than starting from scratch every time.
- Recreated with stock tools: build a drum loop from **short, tight, low-sustain sounds** (called out as a real staple of Blake's drum sound), drop it into an auto-slicer (**FL Studio's Fruity Slicer**, "dull auto slicing" mode — Ableton-equivalent path is **Simpler/Sampler's "Slice to New MIDI Track"** already documented on [[Sampling and Sound Selection]]), and slice it automatically rather than on-beat by hand — automatic slicing lands on **less predictable, more unique** chop points than manual onbeat slicing.
- Build a new percussion loop by re-triggering/reordering those auto-generated chops, then build the rest of the drum bounce around that new perc pattern. → [[Sampling and Sound Selection]], [[Genre Drum Patterns]]

### Synths — the "journey" arrangement approach (~4:10)
- **Foundation is deliberately thin, not rich.** Where "typically people use big, rich sounds," the demo synth is kept very thin and simple — both the bass and the synth key are run in **mono** — specifically to leave more frequency/stereo room for the vocal. → [[BASS Slot]], [[MIDS Slot]]
- **Stagger new elements in a bar early, each panned to a different side.** Two different synths each enter a bar ahead of their section and are panned to opposite sides — introduces a new frequency range AND opens up stereo width at the same moment, without the new element feeling like it "took you out of the song" (the entry lands just ahead of the downbeat, so it reads as anticipation rather than an interruption). → [[Width and Stereo]], [[Stereo Field]]
- **Reuse a sound in a new form instead of introducing a new one, for cohesion.** A third section brings in a choir (also a bar early) and turns a basic synth pad into an arpeggiated version of the SAME patch — "it went from pad to up[arp]" — rather than writing a brand-new synth part, on the reasoning that "using the same sound, but in a different form, gives the track so much more cohesion." Attributed as a trick Blake used on "Radio Silence."
  - **Mechanism:** automate the arpeggiator on/off, plus automate **attack** and **filter cutoff frequency** together, to reshape the pad into the arp'd version dynamically rather than swapping devices. → [[Automation]], [[Arrangement and Song Form]]

### Modular synths — "curate, not compose" (~5:45)
- Quoting Blake from a podcast appearance: a modular synth is "more of a sense of curating something coming in, rather than actually composing like you would the piano" — with a modular rig you're forced to curate what the patch hands you rather than write from a blank page.
- **Challenge format (not modular-specific — works with any found audio):** go into Splice or your own old files, grab random unrelated audio fragments, and force yourself to build them into whatever you're currently working on rather than reaching for a fresh, purpose-made sound.
- **Worked example (3 "modular synth" loops sourced this way):** one fragment was chopped, **time-stretched to run longer**, and re-pitched to different notes to build a bassline; the other two fragments were placed on the same mixer channel and **intricately chopped together to compose a new melody** out of unrelated source material ("putting the pieces together"). → [[Sampling and Sound Selection]]

## Routed to

- [[Chord Voicings]] — drop-2 piano voicing entry
- [[Pitch and Formant]] — discordant-edge detune automation + relative-minor vocal pitch-shift
- [[Vocal Stacks and Ad-libs]] — chopped/reversed background vocal
- [[Sampling and Sound Selection]] — auto-slice drum bounce + modular "curate not compose" chop technique
- [[Width and Stereo]] — staggered panned-synth entrance
- [[Automation]] — pad-to-arp transformation
- [[1 Synth Bed Track]], [[1 Synth Lead Track]] — inline thin/mono foundation + pad→arp move

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=9FX7p23hSlc) — loner, "James Blake's production tricks are GAMECHANGING!?", 7:35
- Transcript: captions, clean spoken narration (not music-garbled) — high confidence. Full transcript: [[James Blake's production tricks are GAMECHANGING!? (transcript)]]
