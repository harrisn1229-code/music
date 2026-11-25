---
type: plugin
title: "Kickstart 2"
category: Compressor/Limiter
vendor: "Nicky Romero"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Kickstart 2

![[Images/Kickstart 2.png]]

**Category:** Compressor/Limiter
**Vendor:** Nicky Romero

## What it is

A sidechain-pumping plugin by Nicky Romero/Cableguys that applies rhythmic volume ducking synced to the host tempo, simulating classic sidechain compression pumping.

## What it's used for

Classic EDM/house sidechain 'pump' effect on pads, bass, and synths without routing an actual sidechain compressor.

## FX chain notes

Inserted directly on the track to be pumped — no sidechain routing required, since the ducking pattern is drawn/tempo-synced internally.

## Techniques

- **Used to sidechain-pulse a sustained sub-bass on essentially every song, even in a four-on-the-floor track** — Myles Smith / Peter Fenn's stated default: "we sidechain almost every sub." A sustained quarter-note [[Serum 2]] sub patch ("Base Subway") gets pulsed against the kick specifically so the movement is *felt* rather than consciously heard — a major part of why the track reads as physically danceable live despite a static-sounding sub on paper. → [[Serum 2]], [[Sidechaining]] — Myles Smith / Peter Fenn (Tape Notes), [[TN 184 Myles Smith & Peter Fenn - Full Video Episode]]
- **Pulled BACK (mix low), on a melodic guitar part rather than a bass/pad, purely to make the part "flow in and out" — a near-inaudible breathing pump, not an EDM-style pump.** The second-to-last stage of a 9-device 6/8 R&B guitar chain (…→ [[Kramer Tape]] "Reels" → **this device, pulled back** → reverb, heavy/final) — the whole technique here is depth restraint via the mix knob, distinct from this note's more assertive sync/curve-driven uses elsewhere. Full chain: [[Smooth R&B 6-8 Chain]]. → [[Kontakt 7]], [[TAL-Chorus-LX]] — loner, [making a smooth/sexy rnb beat in 6/8 time signature](https://www.youtube.com/watch?v=mMZaktspUAA)
- **Pulse a bounced-and-chopped pad layer at half time, as the device that turns a static chop into a pumping pad.** After a keys layer is processed, bounced to audio, and chopped/re-placed (see [[ValhallaDelay]]'s entry on the same build), Kickstart is added specifically to make that chopped layer **pulse at half time**, before a second reverb and a final EQ finish the pad. → [[ValhallaDelay]], [[Sound Selection Guide]], [[Afro Sample Chain]] — loner, [how i made the sample that got a 1 million stream placement (it's easier than you think!?)](https://www.youtube.com/watch?v=atjGOpxBzag)
- **Pump a reversed/resampled chord bed** — first move after flattening a reversed chord layer: Kickstart it into the groove so the texture immediately sits with the drums — Lophiile, [Starting a Song from a Drum Loop](https://www.youtube.com/watch?v=DBK3n5pX35A)

- **Sidechain everything from one instance** — quick ducking on synths/reverbs to lock the groove without routing a kick trigger — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8)

## Used in my chains

The **EDM/pop sidechain-pump** — fake ducking synced to the beat without a real sidechain comp. Depth via the Mix knob (back off until the pump stops being audible); curve shape = the groove:

- **[[1 Digital Bass Track|Digital Bass Track]]** — *slot 4, kick duck*: sync'd to the kick pattern (or [[Duck_Buddy]] / [[Pro-C 2]] external SC for real triggering). **Stealth mode**: duck only the lows (<150 Hz) for the full-mix benefit with zero audible pumping.
- **[[1 Synth Bed Track|Synth Bed Track]]** — *slot 4, duck*: gentle curve vs. the kick (rhythmic breathing), or keyed from the *vocal* for auto-space in ballads (slow release so it flows, not "always-full radio compression").

## Key Parameters

```visual-key
image: Images/Kickstart 2.png
coords: Images/Kickstart 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Curve | The ducking envelope shape (choose from the library or draw your own) | The curve IS the groove — steep/short for hard EDM pump, gentle for subtle breathing | — |
| ② | Sync / Rate | Tempo division the curve repeats at (1/4, 1/8, dotted, etc.) | Match the kick's rhythm; 1/4 for four-on-the-floor pump | — |
| ③ | Mix (Amount / Depth) | How deep the volume duck goes | Back off until the pump stops being *audible* but the space is still there | — |
| ④ | Trigger (Sync vs. Sidechain) | Free-run tempo-sync vs. real sidechain triggering from an input | Sync for consistency; external SC ([[Duck_Buddy]]/Pro-C 2) when the kick pattern varies | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
