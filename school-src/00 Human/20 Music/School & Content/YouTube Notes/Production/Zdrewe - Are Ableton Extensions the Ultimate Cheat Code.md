---
type: yt-note
date: 2026-07-20
source: youtube
url: https://youtu.be/RAAc3OKRYqE?is=FCKk943zkE9M74Eq
channel: Zdrewe
duration: 10:16
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, ableton, extensions, midi, workflow]
briefed: backlog
---

![](https://youtu.be/RAAc3OKRYqE?is=FCKk943zkE9M74Eq)
📺 [Watch on YouTube](https://youtu.be/RAAc3OKRYqE?is=FCKk943zkE9M74Eq)

## Synopsis
Zdrewe stress-tests four Ableton **Extensions** (the extensions-SDK ecosystem that shipped alongside Live's MIDI Tools update) in a real project instead of a feature-tour demo: SideBrain's **Style Rhythm Generator** for drum-pattern/fill generation, **Midnight Tools** for chord voicing/variation, **BB Cut ("Bend Cut")** for glitch/vocal-chop generation, and **Loop Mutator** for randomized 4-bar drop/glitch content. The throughline is speed — each tool collapses a multi-step manual task (program a fill, voice a chord, chop a vocal, design a glitch transition) into a couple of clicks, with enough manual override (density sliders, voicing menus, algorithm choice, snapshotting) to keep the result usable rather than generic. Useful reference for fast idea generation and drop/transition design inside stock-plus-extensions Ableton, without leaving Live for a third-party MIDI/glitch plugin.

## Techniques

- **SideBrain Style Rhythm Generator — style-conditioned drum pattern + fill generation.** Right-click an empty MIDI clip → Extensions → SideBrain Style Rhythm Generator, pick a style (UK garage, trap, etc.), set pattern length (8 bars for more variation), then **Reshuffle** to audition different pattern variations without regenerating from scratch. **Generate Fill** touches only the fill/turnaround bar, leaving the rest of the pattern intact — good for building a drop-in fill without redoing the whole loop. The preview pane also lets you pick the drum-sample set before committing; **Create MIDI Clip** builds both the MIDI pattern *and* a matching Drum Rack from the previewed sounds in one action.
- **Per-voice density sliders post-generation** — after generating, dial back individual voice density (kick, closed hat, percussion, shaker) rather than regenerating; a "busy" first pass is easily thinned to taste per-drum-voice.
- **"Extract Drum Channels" (SideBrain) vs. manual chain-extraction** — functionally similar to activating a Drum Rack's chains and right-click "Extract Chains," but faster (one click) and, notably, does **not** relocate the extracted tracks to the end of the session — it drops them in place. Worth reaching for over the manual method specifically to avoid the reordering side effect.
- **Layering generated + existing kit pieces** — link generated kick/snare together (for later deletion) while muting them, keeping only the *generated* hats/percussion layered on top of an existing kick/snare — a way to borrow just the fill/percussion character from a generator without replacing a dialed-in kick/snare.
- **Chord MIDI tools — quick voice extraction.** From a generated/simple chord clip you can one-click extract just the bass note, just the top voice, or apply "Strum" + "Humanize" for a less static block-chord feel — fast moves for turning a static chord clip into something playable/varied.
- **Midnight Tools — chord re-voicing and progression variation.** Change a chord's voicing (e.g. spread voicing, 2nd inversion) from a menu and audition in place; a **Variations** menu offers alternate voicings/progressions to browse instead of manually re-voicing each chord by hand — apply per-chord, or Apply-all once you land on one you like. The built-in "generate additional chords from your progression" feature was judged unreliable/nonsense in this pass — the video's recommendation is to write your own basic triads first, then lean on Variations to reharmonize/re-voice, not to generate the progression itself from nothing. A **Chord Progression Helper** extension exists but writes into Session View clips only, which doesn't fit an Arrangement-View workflow — skipped for that reason.
- **BB Cut ("Bend Cut") — vocal chop / glitch generation.** Extensions → BB Cut, choose an algorithm (e.g. "Tone Pusher") and play with its sliders — algorithm choice changes the chop character significantly, worth auditioning a few before committing. It works well specifically for vocal-chop-style glitch content, not just generic beat repeat. Generates a batch of clips per pass — if the first pass isn't usable, Undo History → Custom Action, then try a different algorithm rather than manually cleaning up unwanted clips.
- **Loop Mutator — randomized 4-bar drop/transition design.** Workflow: select ~4 bars of your drop, Copy, new track, Paste to get bounced audio, Consolidate, then send to Loop Mutator and hit Randomize repeatedly — each randomize pass introduces glitch/mutation into the loop. When a result is good, **save it as a snapshot** inside the device before randomizing again, so you can accumulate several candidate mutations instead of overwriting your only good result. Once you've collected snapshots, either export a single mutated loop or export the whole snapshot queue for use as drop/transition/glitch material across a song. Constraint: it only accepts 4-bar chunks per pass.

## Routed to
- [[Ableton Extensions and MIDI Tools]] (new technique note, Production/Techniques/)

## Source
- Channel: Zdrewe
- Duration: 10:16 · Uploaded 2026-07-09
- Transcript source: YouTube captions (clean, high confidence — spoken tutorial, not music-heavy)
- Full transcript: [[Zdrewe - Are Ableton Extensions the Ultimate Cheat Code (transcript)]]
