---
type: yt-note
date: 2026-08-09
source: youtube
url: https://youtu.be/v5GenNOs22w
channel: Tom Casey Music
duration: "00:13:38"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken walkthrough, every menu path stated
strand: DRM
tags: [yt-note, music, production, ableton, drums, glitch, midi]
briefed: backlog
---

# Tom Casey Music - This One Ableton Hack Makes Drums Sound Insane

![](https://youtu.be/v5GenNOs22w)

Nate's capture note: *"Implement this."*

Turning a generic drum loop into a randomised, glitchy variation engine — **and then harvesting fixed MIDI back out of it.** Two Ableton features doing the work: *Slice to New MIDI Track* and the *Group Notes → Play One* right-click option. Routed into [[Randomized Rack Design]] and [[MIDI Generate and Transform Tools]].

## The build

**1 — Slice the loop.** Right-click the audio clip → *Slice to New MIDI Track* → choose **Transient**. Every kick, snare and hat becomes its own pad in a Drum Rack.

The transient split is doing more than it looks: even when a loop uses one hi-hat sample throughout, slicing by transient captures each hit with its own micro-variations. *"That's what we're looking for"* — the variation is free and comes from the source performance.

**2 — Pull the kick and snare out.** Audition the slices (enable the MIDI note-editor preview button), find the kick and the snare, and place them as a plain pattern — kick on 1, snare on 2. Fold away the rest. You now have a stable backbone.

**3 — Group everything else into a random pool.** Select the remaining slices — hats, shakers, cymbals — stack them at the same time position, right-click → **Group Notes → Play One**.

That's the trick. A stacked group plays **exactly one of its notes** when the playhead crosses it, chosen at random. The group highlights blue when hovered.

**4 — Tighten the subdivision and duplicate.** Set the group to 32nd notes, then duplicate it across the bar. Every 32nd now fires a random slice.

**5 — Randomise velocity and chance.** Select the notes, randomise velocities; open the *Chance* view and randomise chance too. Use **deviation markers** to bias the spread — e.g. mid velocity with deviation pulled downward, so most hits are quiet and occasional ones jump.

## The part worth stealing — mining the MIDI back out

The randomisation is live and different every pass, which is useless if you find a version you like. The fix:

1. `Ctrl+Shift+T` for a new MIDI track
2. Set its **MIDI From** to the randomisation track (not "All Ins")
3. Arm it and hit record

The generated notes get **printed as a fixed clip.** Now you have a captured, editable sequence — a *"monophonic seed of MIDI notes"* — that you can layer, quantize or edit like anything else.

**This generalises well beyond drums.** Any device or clip producing MIDI randomisation can be recorded this way, including scale-constrained synth parts. It's the missing half of every generative technique: without it you get a toy, with it you get material. → [[MIDI Generate and Transform Tools]]

## Making it glitchier

Two devices, in this order:

- **Beat Repeat** — adds syncopation and stutter repeats
- **Auto Filter** — specifically the newer **resampling filter** type, which gives sample-rate reduction and an 8-bit/bitcrushed character
- **Modulate the filter:** Modulators → **LFO**, random shape, rate set to **sync → 32nd notes**, mapped to filter frequency. Match the LFO rate to the note subdivision so the filter moves with the pattern rather than against it.
- Limit the LFO's **range** so it never filters down too far and drops out.
- Group the chain so the dry signal is preserved and the filtered version mixes in as colour rather than replacing the sound.

## Why it's worth doing

The real argument isn't the glitch sound — it's that this **turns loops you already own into material you'd actually use.** Layer the randomised version under the original loop and a generic break becomes a specific one. That's a library problem solved with technique instead of purchases.

It's also fast. The setup looks elaborate on screen and takes a couple of minutes once you know the two menu items.

## Routed to

- [[Randomized Rack Design]] — Group Notes → Play One as a randomiser, plus velocity/chance deviation curves
- [[MIDI Generate and Transform Tools]] — slice-to-MIDI on transients, then mining fresh MIDI back out by recording the randomised output

## Source

[youtu.be/v5GenNOs22w](https://youtu.be/v5GenNOs22w) · Tom Casey Music · 13:38 · captions, high confidence · [[Tom Casey Music - This One Ableton Hack Makes Drums Sound Insane (transcript)]]

## Related

[[Randomized Rack Design]] · [[MIDI Generate and Transform Tools]] · [[Sample Browser and Clips Workflow]] · [[Genre Drum Patterns]] · [[Groove and Microtiming]] · [[Ableton Extensions and MIDI Tools]] · [[Sampling and Sound Selection]]
