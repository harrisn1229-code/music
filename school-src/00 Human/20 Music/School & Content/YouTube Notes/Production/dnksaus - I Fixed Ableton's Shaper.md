---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=45l00IhqVd4
channel: dnksaus
duration: "00:08:58"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, modulation, sound-design]
briefed: 2026-W31
---

# dnksaus - I Fixed Ableton's Shaper

![](https://www.youtube.com/watch?v=45l00IhqVd4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=45l00IhqVd4)

## Synopsis

A two-part video: first a genuinely useful walkthrough of stock **Shaper**'s Live 12 additions (Mod mode, bipolar/unipolar, Manual mode) that the vault's existing Shaper note hadn't captured, then the pitch for dnksaus's own Max for Live "fix" — **Multi-Shaper** and **Multi-Shaper MIDI** — built because hand-stacking several stock Shapers on Manual mode, one at a time, to sketch one expressive bass automation patch is slow. Multi-Shaper randomizes eight Shaper-style curves at once (with controls for point density, curviness, and a guaranteed max/min per curve), can flip all eight between Mod/Remote or polarity at once, rotates mappings between shapers for instant variation, and can lock all eight to one shared shape. Multi-Shaper MIDI does the same thing per incoming note instead of per macro turn. The back half is a speed-build of two bass/wamp patches (Operator → reverb → OTT → multiband compression → Multi-Shaper/Multi-Shaper MIDI mapped across FM, filter frequency, Shaper drive, oscillator envelope, dry/wet) to show the device in action, plus reassurance that Randomize is fully undo-safe and recallable via presets.

## Techniques

- **Shaper's Map + Mod mode (Live 12)** — press Map, click a parameter to modulate it; Mod mode (new in Live 12) lets you keep hand-turning the mapped knob while modulation still runs underneath.
- **Bipolar vs unipolar via the +/− toggle** — bipolar moves both directions from the knob's center; unipolar moves one direction only — more expressive for automation-style moves, though not a universal preference.
- **Remote mode** — pressing Mod again switches to Remote, which drives the parameter across its full defined range instead of relative to a center point.
- **Manual mode (Live 12) for non-linear scrubbing / storing automation in a rack** — turns the drawn curve into something scrubbed by hand rather than played back on a clock; useful for combining exponential and linear curves as a performable shape saved inside a rack rather than a fixed automation clip.
- **Snap off + Option-drag for free curves** — turn off Snap to draw without grid quantizing; hold Option while drawing to get curves instead of straight segments.
- **The stock-Shaper pain point Multi-Shaper solves** — building one expressive "wamp" bass automation meant stacking several Shapers in Manual mode, mapping each to a macro by hand, and mouse-spamming for random curves — slow for one sound.
- **Multi-Shaper: 8 curves randomized together** — point density from 3 up to 64 per curve, each guaranteed at least one max and one min value; curves can be forced straight, forced curvy, or given a random curviness chance; one control flips all eight between Mod/Remote or bipolar/unipolar at once, or leaves them independent.
- **Rotate and Mono modes** — Rotate shifts each shaper's assigned mapping onto the next shaper (1→2, 2→3…) for instant re-shuffled variation without re-mapping; Mono mode locks all eight shapers to share a single shape.
- **Manual-mode scrubbing as a preset browser** — turning the Manual knob across all eight shapers at once becomes a way to browse toward a "sweet spot" combination rather than authoring one by hand.
- **Multi-Shaper MIDI — per-note instead of per-macro** — the same 8-curve randomization concept, but each shape is triggered by an incoming MIDI note; trigger-once-then-sustain, or continuous retrigger per note, both supported.
- **Fully undo-safe, and presets recall the actual shape** — Randomize All is a single undo step (Cmd+Z reverts it cleanly); Cmd+Option+Z opens the undo history; saved presets store and recall the generated shape data, not just settings.
- **Automating Rotate mid-patch for evolving sound design** — automating the Rotate control partway through a part reassigns all the mappings to different shapers' curves, giving a deliberate shift in character over time without manual re-mapping.
- **Live 11-compatible build available** — a parallel version omits the Live-12-only Mod-mode mappings so the device still works on Live 11.

## Routed to

- [[Shaper]] — new `## Techniques` bullets: the Map/Mod/bipolar-unipolar/Remote/Manual mechanics (deepens the existing note, which only had the Manual-mode probability-biasing technique from an earlier batch), plus a cross-link to the Multi-Shaper wishlist entry
- [[Plugin Wishlist]] — **expanded** (not new-added — already present from earlier videos this queue-drain) the "Multi-Shaper" entry under "From videos (to vet)" with the full randomization/Rotate/Mono/MIDI-mode/undo-safety detail and this video as an additional citation
- [[Randomized Rack Design]] — new `## From videos` bullet cross-linking Multi-Shaper's 8-curve randomization to the note's throughline, with a link back to [[Shaper]]

No new plugin/technique/chain notes this video — it enriches an existing plugin note and an existing wishlist entry rather than creating anything new. No chain candidate: this is a device-mechanics + workflow-speed video, not a full ordered processing chain.

## Source

[I fixed ableton's Shaper](https://www.youtube.com/watch?v=45l00IhqVd4) · dnksaus · 8:58 · captions (high confidence) · transcript: [[dnksaus - I Fixed Ableton's Shaper (transcript)]]
