---
type: plugin
title: "LFO"
category: Utility
vendor: "Max for Live"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# LFO

![[Images/LFO.png]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

Ableton's official Max for Live modulation device — a flexible LFO that can target almost any device parameter via Live's mapping system.

## What it's used for

Adding rhythmic or free-running modulation to filter cutoffs, volume, pan, or nearly any mapped parameter.

## FX chain notes

Inserted on the track/device chain and mapped to a target parameter; a foundational Live modulation building block.

## Techniques

- **Control=0.5 + Amount=0.5 mapped to a macro = "full modulation" — the default starting point for any LFO→macro map.** When [[LFO]] is mapped to a rack macro (Map button → click the macro), **Control** (0–1) sets the macro's default/center value and **Amount** (0–1) sets how far the LFO can swing that macro from center — setting both to exactly 0.5 centers the macro with maximum swing room in both directions, described as achieving "full modulation" of the mapped target. Worth trying first before hand-tuning either knob further. Demonstrated building the [[Glitch Delay Rack]]: LFO mapped to a [[Delay]] time macro at Control=0.5/Amount=0.5, **Random** wave, **Rate ~5 Hz** for a rhythmic beat-shuffling glitch character; **Frequency/Rate** and **Curve** were then each mapped to their own finishing macros (Rate ranged 5–30 Hz; Curve — which skews the LFO's output-value distribution toward low values below 1, unaffected at 1, toward high values above 1 — ranged ~0.3 upward) so the LFO's own character becomes performable on top of the base modulation. → [[Delay]], [[Randomized Rack Design]], [[Glitch Delay Rack]] — asd, [Ableton Sound Design | Glitch Delay Audio Effect Rack](https://www.youtube.com/watch?v=95e5bfB8th8)
- **Bundle several LFO instances at different rates for one-pass multi-parameter automation (unowned tool, general lesson)** — the unowned paid Max for Live "LFO Cluster" (Kintaro) bundles a whole cluster of independently rate/shape-set LFOs in one device, for automating several delay (or other) parameters at once from a single unit rather than one [[LFO]] per parameter. The reusable version with just the owned device: group several stock LFO instances into a rack together so they're managed/saved as one unit, each mapped to a different target and running its own rate/shape — most of the workflow win without the extra purchase. → [[Plugin Wishlist]] — dnksaus, [10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso)
- **Map to Auto Filter frequency for loop movement** — Max for Live LFO mapped to a filter cutoff on a percussion loop, custom shape, very subtle depth — an alternative to LFO Tool when you want free-form shapes — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
- **Binary mode as a "coin flip" macro randomizer** — Shape = Binary outputs only the mapped parameter's minimum or maximum value each cycle (a hard coin-flip, not a smooth sweep) — map it (Remote mode) to a rack macro (e.g. an octave-range Speed knob at -12/+12) for constant, hands-off A/B toggling; raise Smooth so the flips aren't a hard click. Stack a second Binary LFO mapped to the first LFO's own Depth to randomize *how far* it swings, and a third (lower Smooth, more click-like) mapped to a toggle-style parameter (e.g. [[Looper]]'s Reverse) for random direction flips. → [[Randomized Rack Design]] — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc) & [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **Stray shape mapped to a delay's time for a vinyl-wobble intro** — Shape = Stray (curved random) mapped to a delay/echo's Time parameter, with the delay in Repitch mode, feedback down and dry/wet up — the classic manual route to a wobbly, vinyl-style pitch warble before Echo's own Wander wave existed. → [[Echo]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)

## Key Parameters

```visual-key
image: Images/LFO.png
coords: Images/LFO.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Shape | LFO waveform (sine/tri/square/S&H/custom) | The modulation contour |
| ② | Rate / Sync | Speed (free or tempo-synced) | Sync for rhythmic modulation |
| ③ | Depth / Offset | Amount + center of modulation | Map to any parameter via the Map button |
| ④ | Map | Assigns the LFO to a target parameter | Modulate filter/volume/device params |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
