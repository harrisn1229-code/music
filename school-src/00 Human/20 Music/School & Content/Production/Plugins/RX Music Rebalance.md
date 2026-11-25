---
type: plugin
title: "RX Music Rebalance"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: has-ui-image (Nate confirmed 2026-07-20)
owned_checked: 2026-07-20
owned_note: "no confident install match"
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# RX Music Rebalance

![[Images/RX Music Rebalance.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

An RX module using AI source separation to independently adjust the level of vocals, bass, drums, and other elements within a finished mix. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Rebalancing an already-mixed stereo file (e.g. remix stems recovery, karaoke creation, fixing a buried vocal in a bounced reference).

## FX chain notes

Used as a corrective/creative tool on a finished stereo file rather than during the original mix.

## Techniques

- **Phase-cancel the separated stems against the source before trusting them.** Giles Martin's QA discipline for the Beatles "demixing" remixes (a bespoke, higher-end cousin of this same AI source-separation category): after splitting a mix into stems, sum the stems back together and phase-invert against the original source — a correct separation cancels to silence. "I don't want the process to add anything or take away anything from what we have... it's important that we start from a raw format" before any further EQ/processing. Applies directly to any stem split pulled from this plugin: before rebalancing a vocal/bass/drum level or exporting a stem split, sum the separated stems and phase-cancel them against the source stereo file to confirm the AI split didn't silently color or lose anything. → [[Ozone 9 Master Rebalance]], [[Phase Alignment]] — Tape Notes (Giles Martin), [[TN 190 The Beatles (Giles Martin) - Full Video Episode]]

## Key Parameters

```visual-key
image: Images/RX Music Rebalance.png
coords: Images/RX Music Rebalance.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Stem faders (Vocals / Bass / Drums / Other) | AI level control of each separated stem (Mute/Solo per stem) | Bring a vocal up or drums down in a finished mix |
| ② | Sensitivity (per stem) | How aggressively that stem is separated | Small moves keep artifacts low |
| ③ | Quality | Separation quality (Best / …) | Best for a final render; lower while auditioning |
| ④ | Stem split / Render | Export the separated stems, or render the rebalanced mix | Stem split to pull a rough acapella/instrumental |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
