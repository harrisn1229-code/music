---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=U-XT1kPp-Yg
channel: dnksaus
duration: "00:05:17"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken workflow narration, a few product/rack names garbled by auto-caption (e.g. "Bouncing Notes," "EQ Pickers" transcribed as "you Pickers") but the mechanics are unambiguous
tags: [yt-note, music, production, ableton, racks, workflow, randomization]
briefed: 2026-W31
---

# dnksaus - Chain Selector Should Be Illegal Holy Sh*t

![](https://www.youtube.com/watch?v=U-XT1kPp-Yg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=U-XT1kPp-Yg)

## Synopsis

A tight, mechanics-first tutorial on Ableton's Instrument/Drum Rack **Chain Selector** — the 0–127 macro-mappable value range that decides which chain in a rack plays — and how far dnksaus has pushed the same trick as a product line. He demonstrates the base technique with 470 dragged-in snare samples (Distribute Ranges Equally, narrowed to the 127-chain ceiling), then generalizes it: chain-selector racks dropped one-per-pad into a Drum Rack for an instantly-randomizable kit, and the same selector logic applied to *audio-effect presets* instead of samples — a rack per stock effect where every factory preset becomes its own chain, so "randomize the Chorus" picks a genuinely different Chorus preset rather than just re-rolling a parameter. He sells the whole collection (drum/sample selectors, per-effect preset randomizers in Standard and Suite tiers, MIDI-effect randomizers, single-effect "Pickers," and a "starter kit" for building your own randomized synth) as a Gumroad pack. The most reusable non-obvious details: the 127-chain hard ceiling on any selector-mapped rack, the CPU cost of running many preset-chains live simultaneously (and the fix — extract the keeper), and a specific "shrink-then-redistribute" move for temporarily excluding one chain from an existing randomizer rack without deleting it outright.

## Techniques

- **The Chain Selector is a plain 0–127 macro-mappable value that decides which rack chain plays** — group anything into a rack (Command/Control+G), open its Chain window, and the blue selector bar spanning 0–127 is itself a mappable macro destination: drag it (or a mapped macro knob) and whichever chain's zone currently contains that value plays. This is the base mechanism behind every variant below. → [[Randomized Rack Design]]
- **127-chain hard ceiling — narrow a big sample dump before distributing** — the selector's range tops out at 127/128 values (MIDI-range-sized), so dragging in more samples than that (470 snares, in the demo) needs trimming down to the first 127/128 before **Distribute Ranges Equally** (Command/Control+A, right-click) will actually spread them across the full selector range — extra samples beyond that ceiling get deleted from the chain list rather than left unreachable. A genuinely useful ceiling to know before building a huge randomizer rack from an oversized sample dump. → [[Randomized Rack Design]], [[Sample Browser and Clips Workflow]]
- **Chain-selector racks dropped one-per-pad into a Drum Rack for an instantly-randomizable kit** — save a finished selector rack (say, the snare-picker above) and drag it straight into a Drum Rack pad; do that for every pad (kick, snare, hats, etc.) and pressing the rack's top-level Random button re-rolls the *entire* kit at once, one new sample per pad, in a single click. Demoed with stock Ableton factory samples as a baseline — the stated recommendation is to swap in your own favorite samples per pad group rather than leaving the factory defaults in. A lighter, sample-only sibling of the fuller macro-reshaping "Sketch Kit" already documented on [[Drum Rack]]. → [[Drum Rack]], [[Randomized Rack Design]]
- **The same selector trick generalizes to audio-effect presets, not just samples — one rack per effect type** — instead of dragging samples into the Chain window, build a rack per stock effect (e.g. Chorus) where every one of that effect's factory presets becomes its own chain; mapping the selector to Random then picks a genuinely different *preset*, not just a re-randomized parameter value. Built in parallel Standard and Suite editions (so a non-Suite user still gets full-preset coverage of the Standard-only effects), plus a combined "3-in-one" version stacking three of these preset-randomizer racks in series for compound combinations. → [[Randomized Rack Design]], [[Plugin Wishlist]]
- **A live multi-preset randomizer doesn't remember the winning preset's name — and costs real CPU while all presets sit loaded** — because the Chain window only shows numeric position (or a small arrow indicator of which chain is currently active), landing on a preset you like via Random gives you no readable label to recall later; the fix is to drag that one winning chain/device straight out of the rack to keep it, which also cuts CPU since running every preset in the rack "live" simultaneously (rather than just the one currently selected) is described as genuinely CPU-intensive. → [[Randomized Rack Design]], [[Gain Staging]]
- **Shrink a chain's selector range to zero, then redistribute, to temporarily exclude one option without deleting it** — inside an existing multi-chain randomizer rack, to pull one chain (e.g. an unwanted Hybrid Reverb option) out of the random pool without removing it from the rack: select all chains in the Chain window, drag that chain's bottom-range marker from right to left and its top marker from left to right (collapsing its zone to nothing), then re-run **Distribute Ranges Equally** so the remaining chains reclaim the freed range. A more reversible move than deleting the chain outright — useful while auditioning a rack before committing. → [[Randomized Rack Design]]
- **A "starter kit" rack turns this whole selector trick into a build-your-own randomized synth** — a packaged rack scaffold (multiple randomized effect-preset chains stacked on an instrument) meant as a starting point: audition with the random generators live, exclude unwanted chains with the shrink-and-redistribute move above, then once a combination lands turn off/delete the random generators, drag the winning chain/preset out, and save the result as its own standalone instrument rack. → [[Randomized Rack Design]], [[Plugin Wishlist]]
- **MIDI-effect chain-selector racks (arp/chord, "Bouncing Notes," Echo/other MIDI FX presets)** — the same per-preset selector-rack trick applied to Ableton's MIDI effects rather than audio effects — randomly selecting between different arpeggio/chord-voicing setups and other stock MIDI-effect presets. Named on camera but not demoed in enough detail to describe the exact parameter mapping beyond "same idea, applied to MIDI." → [[Randomized Rack Design]], [[Plugin Wishlist]]
- **Standalone single-effect "Pickers" (Reverb, EQ, Distortion) as smaller companion products** — beyond the full per-rack-type collection, individual "Picker" racks exist for single effect categories (Reverb Picker, EQ Picker, Distortion Picker) for anyone who only wants the preset-randomizer trick on one effect type rather than the whole pack. → [[Plugin Wishlist]]

## Routed to

- [[Randomized Rack Design]] — seven new bullets: the base Chain Selector mechanism, the 127-chain ceiling, the Drum Rack per-pad application, the generalization to effect-preset racks, the no-label/CPU-cost caveat + extract-to-keep fix, the shrink-then-redistribute exclusion move, and the "starter kit" randomized-synth build
- [[Drum Rack]] — cross-referenced from the per-pad chain-selector kit bullet (sibling to the existing "Sketch Kit" entry — no direct edit needed beyond the pointer, already deeply enriched)
- [[Plugin Wishlist]] — new entry: the "Chain Selector" pack (drum/sample selectors, per-effect preset randomizers, MIDI-effect randomizers, single-effect Pickers, synth starter kit)

## Source

[Chain Selector should be illegal holy sh*t](https://www.youtube.com/watch?v=U-XT1kPp-Yg) · dnksaus · 5:17 · captions (high confidence) · transcript: [[dnksaus - Chain Selector Should Be Illegal Holy Sh*t (transcript)]]
