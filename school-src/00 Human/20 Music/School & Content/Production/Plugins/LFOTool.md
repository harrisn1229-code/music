---
type: plugin
title: "LFOTool"
category: Modulation
vendor: "Xfer Records"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# LFOTool

![[Images/LFOTool.png]]

**Category:** Modulation
**Vendor:** Xfer Records

## What it is

Xfer's tempo-synced LFO/modulation plugin, drawing custom modulation shapes to drive volume, filter, or panning in a rhythmic, sidechain-pump style.

## What it's used for

Custom rhythmic pumping/ducking and modulation effects beyond what a standard sidechain compressor offers.

## FX chain notes

Inserted directly on the track to be modulated, often for sidechain-pump-style effects on pads and bass.

## Techniques

- **Groove dynamics on static loops/shakers** — half-note duck shape on percussion loops "to get it to groove better"; also stands in for a snare-side duck. Keep it subtle; for evenness he prefers fixed note-value shapes over random ("random sounds off on some bars") — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)

## Used in my chains

An **LFO shaper** — draws a repeating curve onto volume/filter/pan for rhythmic movement (sidechain-pump without a trigger, tremolo, groove shaping):

- **[[1 Drums Hat Track|Drums Hat Track]]** — a **half-note volume duck** on static shaker/perc loops to make them groove (also lands as a fake snare-duck); prefer fixed note values over random.

## Key Parameters

```visual-key
image: Images/LFOTool.png
coords: Images/LFOTool.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | LFO Curve | The repeating shape (draw points or pick a preset) | Draw the exact ducking/tremolo shape; a smooth half-note dip grooves a static loop | Lophiile shaker duck |
| ② | Rate / Sync | Tempo division the curve loops at | **Fixed note values** (1/2, 1/4) over random for a musical, repeatable groove | — |
| ③ | Target (Volume / Cutoff / Pan) | Which parameter the LFO modulates | Volume for sidechain-style pump; Cutoff for filter wobble; Pan for auto-pan | — |
| ④ | Depth | How much the target is modulated | Back off until the movement grooves without sounding gimmicky | — |
| ⑤ | Filter (HP/LP + Res) | Built-in filter that can also be LFO-swept | Sweep the cutoff for a rhythmic filter without a separate device | — |
| ⑥ | Smoothing / Env | Rounds the curve so steps don't click | Add a little so sharp shapes don't pop on transient-heavy material | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
