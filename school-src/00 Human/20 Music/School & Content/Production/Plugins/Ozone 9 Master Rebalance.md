---
type: plugin
title: "Ozone 9 Master Rebalance"
category: Utility
vendor: "iZotope"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
video_enriched: true
---

# Ozone 9 Master Rebalance

![[Images/Ozone 9 Master Rebalance.png]]

**Category:** Utility
**Vendor:** iZotope

## What it is

Ozone 9's AI-driven rebalancing tool that can independently raise/lower vocal, bass, and drum energy within an already-mixed master using source separation.

## What it's used for

Fixing an already-mixed/mastered file's balance issues (e.g. vocal too buried) without going back to the original mix session.

## FX chain notes

Used as a corrective mastering-stage tool, often before final EQ and limiting.

## Techniques

- **Phase-cancel a source-separation split against the source before trusting the rebalance.** Same QA discipline documented in full on [[RX Music Rebalance]] (Giles Martin's Beatles "demixing" remixes): sum the AI-separated stems and phase-invert against the original stereo file — it should cancel to silence — before nudging any stem's level, so the separation itself is confirmed to add or remove nothing. → [[RX Music Rebalance]] — Tape Notes (Giles Martin), [[TN 190 The Beatles (Giles Martin) - Full Video Episode]]

## Key Parameters

```visual-key
image: Images/Ozone 9 Master Rebalance.png
coords: Images/Ozone 9 Master Rebalance.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Bass / Vocals / Drums | AI level control of separated master elements | Nudge a too-loud vocal/bass down on a finished master |
| ② | Amount | How aggressively it separates/adjusts | Small moves — big ones introduce artifacts |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
