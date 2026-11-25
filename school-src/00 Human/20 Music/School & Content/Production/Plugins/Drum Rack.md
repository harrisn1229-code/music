---
type: plugin
title: "Drum Rack"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Drum Rack

![[Images/Drum Rack.png]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's dedicated container/instrument rack for building drum kits, mapping one sample or instrument chain per MIDI note with per-pad routing, choke groups, and macros.

## What it's used for

The standard way to build and play a multi-sample drum kit in Live — assembling kicks, snares, hats, and one-shots into a single playable instrument.

## FX chain notes

Each pad is typically its own mini chain (sample/Simpler > EQ > compression); the whole rack often feeds a shared drum bus with glue compression and parallel saturation.

## Techniques

- **Copy-to-all-siblings + map-to-all-siblings to turn one Simpler's loop trick into a whole-kit "exponential groove" macro** — load a Drum Rack with several one-shots (auto-creates one [[Simpler]] instance per pad), program a simple pattern with every note **legato**, dial in a sample-looping setup (Loop on, Zero Crossing Snap off, Start/Loop/Length at their working values) on just ONE pad's Simpler, then right-click → **copy value to all siblings** to push those settings to every other pad in one action. Map that pad's **Length** parameter to a rack macro, then right-click → **map to all siblings** so the same macro drives every pad's Length simultaneously — one knob now rides loop length across the entire kit while the original pattern plays, superimposing an evolving/exponential rhythmic layer onto the beat rather than replacing it. Because Simpler's Length is a percentage of *each sample's own length* (not a fixed time value), the identical macro position produces a genuinely different rate per pad — real polyrhythm across the kit for free. Layer in extra movement: transposition mapped specifically on hi-hat pads (pitch/loop-length coupling, hats only), an extended sequence loop with drawn-in Length automation, and deliberately lengthened/overlapping MIDI notes so overlapping loops read as overlapping rhythms. Fine-tune per-pad feel afterward with individual Start/End nudges. → [[Simpler]], [[Rhythm and Groove]] (Polyrhythms), [[Randomized Rack Design]], [[Exponential Groove Drum Rack]] — asd (ableton sound design), [EXPONENTIAL RHYTHMS \[2/5\] Sample Looping in Simpler](https://www.youtube.com/watch?v=QRj6sxdimkQ)
- **Drop a saved chain-selector rack onto every pad for a one-click randomizable kit** — build (or buy) a sample-selector rack per drum type (a rack whose Chain window holds many samples of one kind, macro-mapped to a 0–127 selector), drag one of these onto each pad, and the rack's top-level Random button re-rolls the *entire* kit at once, one new sample per pad, in a single press. Demoed with stock factory samples as a baseline, with the explicit recommendation to swap in your own favorite samples per pad group — a lighter, sample-only sibling of the "Sketch Kit" below, which also reshapes each sample's envelope on randomize rather than only re-picking it. → [[Randomized Rack Design]] — dnksaus, [Chain Selector should be illegal holy sh*t](https://www.youtube.com/watch?v=U-XT1kPp-Yg)
- **Build a browsable breakbeat instrument: one chain per loop, key ranges distributed, each chain sliced by Bar** — drag a whole folder of breakbeat loops (e.g. a jungle sample pack) into one instrument rack, one loop per chain: drop the first loop in to create the rack, open the Chain window, then drag the rest of the folder's loops in as additional chains. Select all chains, extend each one's key-zone range to the full 0–127, then right-click → **Distribute Ranges Equally** so each key on the keyboard triggers a different breakbeat loop, playable/browsable starting from C on the first octave. Map that key-range selection to a rack macro for a turn-the-knob breakbeat browser. Each chain then needs its playback mode set to **Slice**, sliced **by Bar** — note this has to be set manually per chain since Ableton's "copy value to all siblings" right-click shortcut doesn't cover the Slice-mode parameter. Pairs well with recording an [[Arpeggiator]] pattern over the resulting key range and resampling a take. → [[Sample Browser and Clips Workflow]], [[Randomized Rack Design]] — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **Rotate a whole kit through library-wide "similar" samples (Live 12)** — every pad in a loaded rack carries a **Similar Samples** button + rotate arrow: press it and that pad cycles through samples the browser judges sonically close to the current one, searched across your *entire* library rather than a pre-loaded selector pool — a different mechanism from the Sketch Kit's own macro-mapped selector below, and one that works on **any** kit, including a stock kit dragged straight from the Packs tab (filter **drum clip** for ready-made drum MIDI + kit combos). Lock a pad to exclude it while rotating the rest (e.g. keep a kick you like, roll everything else), or trigger a kit-wide version that rotates every pad's sample at once. → [[Sample Browser and Clips Workflow]] — dnksaus, [Generating Drum Kits](https://www.youtube.com/watch?v=Beyps5u4DSg)
- **The "Sketch Kit" — a self-randomizing kit for fast idea capture** — build the rack up front from your own proven, favorite samples (sample selection is still the foundation), with every pad wired so a single Randomize press both picks a new sample per pad (via each pad's own [[Sampler]] chain-selector macro) *and* reshapes each chosen sample (via macro-mapped ADSR/transient/pitch/start-point controls) at the same time — turning a handful of go-to samples into a huge combinatorial space, loadable at the very start of any project so you're never blocked curating sounds before an idea gets down. Push-compatible: the hardware's randomize wheel does the same job, with Auto Select keeping the currently-selected pad's inner rack in view. → [[Sampler]], [[Randomized Rack Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Selector-mode sample racks per pad (same recipe for snares/kicks/808s/stabs)** — load a pad's [[Sampler]] with many samples of one drum type, Command-A select all in the Zone editor, right-click **Distribute Ranges Equally**, group into an Instrument Rack (Command-G), then map the Selector's blue bar to a macro (e.g. "snare select") — that one macro now picks which sample plays. Turn on Sampler's **RAM** button afterward to ease CPU in a heavy project. → [[Sampler]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Key-based hi-hat selection instead of a chain-selector bar** — for hats specifically, use Sampler's Zone **Key** mode instead of Selector mode: distribute ranges equally across MIDI keys so each key maps to a different hi-hat sample, then map **Pitch** itself to a macro — pitch becomes the "which hi-hat" selector while simultaneously retuning the chosen sample, a genuinely different mechanism from the Selector-bar approach used elsewhere in the kit. → [[Sampler]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Fill pads fast from saved browser searches, then macro-map across the whole kit** — filter the Samples tab (One-Shot + a tag like Closed Hi-Hat) and save the search, or filter the Clips tab for "drum clip"/"percussion clip" sorted by genre or region, then drag a large batch straight into the rack's pads. Once loaded, map Sustain/Decay/Random Pan to all siblings for whole-kit envelope and per-hit pan variation; a Pitch device mapped to all siblings changes *which* sample plays (MIDI transpose) rather than the audio's actual pitch. Convert the whole rack to [[Drum Sampler]] (right-click) for a built-in per-pad FX section. → [[Sample Browser and Clips Workflow]], [[Drum Sampler]] — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)
- **Built-in sidechain routing inside the rack** — rather than an external sidechain route, have the kick/snare/clap/rim chains' audio output feed a shared internal "sidechain trigger" chain (inaudible on its own), then key the 808/stab/bass chains' compressors off that trigger chain, **high-passed** so only transient content drives the duck — a self-contained sidechain that travels with the rack as one exportable unit. → [[Sidechaining]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)

## Used in my chains

The **kit container** (a structural device, not an FX slot) — all drums come from packs/loops, no live kit:

- **[[2 Drums Group|Drums Group]]** — play one-shots (auditioned via [[XO]]) and slice full loops so kick/snare/hats land on their own pads → their own track chains ([[1 Drums Kick Track|Kick]], [[1 Drums Snare-Clap Track|Snare]], [[1 Drums Hat Track|Hat]]). An unsplit loop gets treated on the group directly. Route pads out to sub-tracks so each hits its chain before the shared bus.

## Key Parameters

```visual-key
image: Images/Drum Rack.png
coords: Images/Drum Rack.coords.json
```
*Tap the numbered circle for what that control does. **① only** — this capture is an empty rack, so the pad chains (②), choke groups (③), return chains (④), send knobs (⑤), per-pad I/O (⑥) and macros (⑦) aren't on screen. They appear once a kit is loaded and the chain list is expanded.*

Structural, not knobs — Drum Rack is a container. What you actually edit:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Pad grid (per-note mapping) | One sample/[[Simpler]]/instrument chain mapped to each MIDI note | Drop a one-shot per pad; slice a loop across pads to free kick/snare/hats | — |
| ② | Pad chain (Simpler → FX) | Each pad is its own device chain — sampler + EQ/comp/etc. | Keep per-pad chains light (samples arrive pre-processed); shape on the track chains | — |
| ③ | Choke Groups | Pads in the same group cut each other off | Put open + closed hats in one choke group so the closed hat silences the open | — |
| ④ | Return Chains | Built-in return tracks inside the rack for shared send FX | One reverb/delay return for the whole kit — cohesive space without per-pad inserts | — |
| ⑤ | Send knobs (per pad) | Amount of each pad sent to the rack's return chains | Bus more snare/clap to the kit reverb, less kick | — |
| ⑥ | I/O routing (per pad) | Receive note in / send audio out to sub-tracks or a bus | Route kick/snare/hats to separate audio tracks so each hits its own chain | — |
| ⑦ | Macros | Map any pad/device parameters to the rack's macro knobs | Assign kit-wide tone/level moves to one knob for fast performance tweaks | — |

## See also

- Plugins: [[Drum Sampler]] (per-pad FX-section alternative to Simpler)
- Techniques: [[Sample Browser and Clips Workflow]] · [[Randomized Rack Design]]
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
