---
type: plugin
title: "RX De-ess"
category: Pitch/Vocal
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

# RX De-ess

![[Images/RX De-ess.png]]

**Category:** Pitch/Vocal
**Vendor:** iZotope

## What it is

An RX module dedicated to reducing sibilance in vocal recordings, similar in goal to a dedicated de-esser plugin. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Controlling harsh 's'/'sh' sounds as part of a broader RX repair workflow.

## FX chain notes

Placed after the main vocal compressor, alongside/instead of a dedicated de-esser like Pro-DS.

## Techniques

- **De-ess background vocal doubles noticeably harder than the lead vocal, since the ear can't discern multiple simultaneous S sounds unless they land out of time with each other.** Tony Maserati: "We don't need more than one S — your ear doesn't really discern between how many S's are there unless they're out of time. In this case we want to hear a little bit of that double S but much lower level, that'll keep the lead vocal in the center in front of the listener." A stack of un-de-essed doubles reads as sibilant clutter even when each one individually sounds fine. → [[De-essing]], [[Vocal Stacks and Ad-libs]], [[1 Vocals/2 Backup Vocals Group|Backup Vocals Group]] — Tony Maserati (Mix with the Masters), [[Background Vocals  - Tony Maserati]]

## Key Parameters

```visual-key
image: Images/RX De-ess.png
coords: Images/RX De-ess.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Algorithm (Classic / Spectral) | Broadband vs. spectral de-essing | Spectral for transparent, surgical de-essing |
| ② | Threshold [dB] | Level where sibilance is ducked | Set on the S/T region (Absolute box locks it to a fixed dB) |
| ③ | Cutoff freq [Hz] | Bottom of the sibilance band (~2.5–9 kHz) | Frame it on where the S's live |
| ④ | Speed (Fast / Slow) | Detection reaction speed | Fast to catch quick sibilants; Slow for smoother reduction |
| ⑤ | Spectral shaping [%] | How much the spectral algo reshapes the sibilance | More for stronger, still-transparent reduction |
| ⑥ | Spectral tilt | Tone of the reduction (Brown → Pink → White) | Tilt toward White to focus on the very top; Brown for lower sibilance |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
