---
type: plugin
title: "Ozone 9 Match EQ"
category: EQ
vendor: "iZotope"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ozone 9 Match EQ

![[Images/Ozone 9 Match EQ.png]]

**Category:** EQ
**Vendor:** iZotope

## What it is

Ozone 9's reference-matching EQ, analyzing a reference track's spectral curve and applying a matching EQ curve to the current master.

## What it's used for

Matching a master's tonal balance to a reference commercial track.

## FX chain notes

Used early in the mastering chain to establish a target tonal balance before further manual EQ.

## Techniques

- **Reference-match a vocal against a specific ARTIST's captured tonal signature, not just a generic reference track — build a small preset library per artist, per role.** A working match-EQ setup with multiple saved reference snapshots, each captured from a different target artist's vocal and applied by role in the chain: two presets (one per artist) for the main vocal-EQ stage, and a separate pair for a later "air"-EQ stage. The mechanism is this note's own reference-snapshot-then-match workflow — the new information is treating "artist" as the organizing unit for a preset library (several saved snapshots, picked by which artist's tonal signature the vocal should lean toward) rather than one generic reference track re-captured per song. Paired in the same chain with a distinct pre-compressor "pushpull" EQ stage (parametric bands nudging toward a level indicator rather than shaping tone) — see [[EQ]] (effect) for that half. → [[EQ]] — Jaycen Joshua (Mix with the Masters), [Mixing Summits with Jaycen Joshua](https://www.youtube.com/watch?v=L6xx7DWKzng)
- **Track-level use, not just mastering: match-EQ a tape-returned (or otherwise reprocessed) signal back toward a pre-processing balance you already liked** — when a physical tape print (or any hardware/character stage) shifts a part's tone more than you want, snapshot the pre-stage tone as the reference and pull the post-stage signal back toward it, so you keep the glue/character without losing a balance that was already working. A legitimate earlier-stage use of the same reference-matching idea this note otherwise documents at mastering. — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)

## Key Parameters

```visual-key
image: Images/Ozone 9 Match EQ.png
coords: Images/Ozone 9 Match EQ.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Reference Snapshot | Captures a target track's spectral curve | Snapshot a reference you love, match your master to it |
| ② | Amount | How strongly the match is applied | Partial for guidance, not a carbon copy |
| ③ | Smoothing | How detailed vs. broad the match curve is | Smoother avoids over-correcting narrow peaks |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]]
- Palette: shapes any slot · [[Sound Palette]]
