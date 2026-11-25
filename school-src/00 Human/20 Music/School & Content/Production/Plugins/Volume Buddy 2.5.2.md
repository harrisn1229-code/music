---
type: plugin
title: "Volume Buddy 2.5.2"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Volume Buddy 2.5.2

![[Images/Volume Buddy 2.5.2.jpg]]

**Category:** Utility
**Vendor:** Max for Live

> [!warning] Corrected 2026-07-20 — this is a **LUFS loudness-matcher / auto-gain** utility (Pre/Post LUFS, Difference, Gain Offset), not a generic "volume control." Updated from the panel.

## What it is

A Max for Live **loudness-matching (auto-gain) utility** — it measures Pre and Post LUFS, shows the Difference, and applies a Gain Offset so bypassed vs. processed (or two devices) sit at matched loudness for a fair A/B.

## What it's used for

Level-matched A/B comparisons — so a plugin that just makes things louder doesn't fool you into thinking it sounds better.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Key Parameters

```visual-key
image: Images/Volume Buddy 2.5.2.jpg
coords: Images/Volume Buddy 2.5.2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Difference (LUFS) | The loudness difference between the Pre and Post signal | Watch it hit ~0 for a level-matched A/B |
| ② | Pre / Post | Input vs. output LUFS meters | Compare the loudness in vs. out |
| ③ | Gain Offset | The gain applied to match the output loudness | Let it auto-match, or read the offset a plugin added |
| ④ | Sensitivity / Hold | How fast the auto-gain reacts, and Hold to freeze it | Hold to lock the match while you audition |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
