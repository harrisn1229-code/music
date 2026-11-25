---
type: plugin
title: "Pro-DS"
category: Pitch/Vocal
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Pro-DS

![[Images/Pro-DS.png]]

**Category:** Pitch/Vocal
**Vendor:** FabFilter

## What it is

FabFilter's de-esser, using an adaptive, wideband or split-band detection algorithm to target sibilance without engaging on transients or plosives.

## What it's used for

Controlling harsh 's', 'sh', and 't' sounds on vocal recordings.

## FX chain notes

Placed after the main vocal compressor and before final EQ, so it reacts to the already-leveled signal.

## Techniques

- **De-essing bookends a chain rather than sitting once mid-chain — a first pass to tame the raw take, a second pass at the very end after saturation/drive has had a chance to reintroduce sibilance.** On a wet/pre-reverbed lead vocal delivery: this plugin first (before drive/EQ/Soothe/dynamics), then again as the final stage after parallel compression — "a lot of taming, de-essing... and a bit of de-essing at the end." Separately, a bus-level safety-net instance on the lead vocal Group targets the 'ch'/'esses' consonant cluster specifically, one named parameter **set to 3.7** *(unit unconfirmed — threshold or range)* — a reminder that sibilance diagnosis should name the actual consonants (esses, ch, ts) rather than a generic "sibilance," since affricates sit in the same harsh-cluster problem zone. → [[De-essing]], [[James Blake Vocal Chain]] — Mix with the Masters, [[MSM Mixing James Blake's Vocals]]
- **A full-master de-essing pass built on mid-side processing, run FIRST in the chain, before any EQ or dynamics.** Shelf + Bell filters, subtle attenuation only (no more than a few dB) — the M/S angle is the point: since the mid image usually carries more sibilance, mid-side processing means the mid gets attenuated more often than the side, giving both more accurate de-essing on the centered vocal/lead content *and* an incidental, subtle expansion of the side image's highs as a side effect. → [[De-essing]], [[Width and Stereo]], [[Master Chain]] — Sage Audio, [How to Master a Song Start to Finish](https://www.youtube.com/watch?v=aUygMNRx2yE)
- **Mastering-stage de-essing — narrower and more careful than a mix-stage pass, and not always needed.** Sibilant energy at the mastering stage usually sits **5–8 kHz** (confirm by ear or on the spectrum — it varies by track), narrower than typical vocal-track de-essing ranges. Set the threshold carefully: too loose and the de-esser attenuates unrelated high-frequency content (cymbals, air) whenever it triggers, not just the sibilant. The correctness check is listening specifically for whether attenuation fires *with* the sibilant and nothing else — [[Multiband Compression]] is a valid substitute for a dedicated de-esser stage here (see [[Pro-MB]]). → [[De-essing]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **In the TRACKING chain, before the compressor** — his 2022 monitor chain runs EQ → Pro-DS (Male Wide Band preset, threshold to taste) → compressor → Pultec-style EQ; wideband + no lookahead = zero latency, safe while recording — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
- **Stereo mode for group vocals** — set the stereo link to 0 so each side of a hard-panned stack de-esses independently — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI)
- **Second, subtractive de-ess stage** after a boost-type de-esser (Gem Dopamine); note that manual S-by-S editing beats it once committed to a track — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Pro-DS.pdf|Local PDF]] · [Official manual](https://www.fabfilter.com/downloads/pdf/help/ffprods-manual.pdf)

**High-level points:**
- **Single Vocal** mode runs a highly intelligent detection algorithm trained to split sibilance from non-sibilance on one voice — in this mode Threshold can be dropped all the way to −∞ dB so *all* sibilance gets reduced by roughly the same amount (set by Range) rather than only the loudest peaks.
- **Allround** mode triggers purely from the HP/LP frequency window + Threshold — built for de-essing full mixes/busses, not a single vocal's sibilance signature.
- **Wide Band** lowers overall gain across the signal when sibilance is detected; **Split Band** only attenuates the high-frequency range above the trigger band, leaving low end completely untouched (and adds a touch of extra latency).
- The high-pass/low-pass trigger sliders aren't just detection — in **Split Band + Allround** mode, that same frequency window doubles as a de-essing-based high-frequency limiter/brightener (compress the highs, then bring them back up with a shelf EQ afterward) — a mastering trick, not just vocal cleanup.
- **Lookahead** up to 15 ms catches the very start of a sibilant burst before it exceeds threshold — ~10 ms is FabFilter's own suggested starting point.
- Built-in real-time spectrum analyzer on the trigger-frequency sliders shows exactly where the 's'/'sh'/'t' energy sits (typically 5–10 kHz), so the HP/LP window can be dialed precisely instead of guessed.

## Used in my chains

My **de-esser** — near the end of every vocal chain (comp + saturation both push sibilance up, so de-ess last). **Single Vocal mode, split-band, sidechain framed on the S region (~4–8 kHz), range 4–6 dB**, audition button to hear only what's ducked:

- **[[1 Main Vocal Track|Main Vocal]]** (slot 7), **[[1 Harmony Vocal Track|Harmony]]** (4), **[[1 Main Vocal High Track|High]]** (4), **[[1 Backup Vocal Track|Backup]]** (5) — per-track de-ess.
- **[[1 Double Vocal Track|Double]]** — *de-ess hard* (support layers can take more).
- **[[2 Ensemble Stack Group|Ensemble Stack Group]]** (4) / **[[3 Vocal Bus|Vocal Bus]]** (5) — de-ess the composite as a safety net (manual de-essing on committed tracks beats it).

## Key Parameters

```visual-key
image: Images/Pro-DS.png
coords: Images/Pro-DS.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold | Sidechain level above which de-essing engages | In Single Vocal mode, drop to −∞ for uniform sibilance reduction scaled by Range instead of only catching peaks | — |
| ② | Range | Caps/scales how much gain reduction the de-esser can apply | Keep conservative (a few dB) on a lead vocal to avoid a lisping, over-de-essed tone | — |
| ③ | HP/LP trigger filters | Frequency window (2–20 kHz) the de-esser listens to for sibilance | Use the built-in spectrum analyzer to zoom the window onto the actual 's'/'t' energy rather than a generic 6–8 kHz guess | — |
| ④ | Single Vocal / Allround mode | Switches between intelligent per-voice sibilance detection and generic frequency-band triggering | Allround + Split Band on a mix bus doubles as a high-frequency limiter/brightener move (see [[De-essing]]) | — |
| ⑤ | Wide Band / Split Band | Wide Band ducks the whole signal; Split Band ducks only the high band above the trigger | Split Band on group vocals/mixes so low end and body stay untouched while only the harsh top gets tamed | — |
| ⑥ | Stereo Link | Amount of stereo linking for detection (mid/side option in stereo instances) | Set to 0% on a hard-panned vocal stack so each side de-esses independently — see [[LEAD Slot]] | — |
| ⑦ | Lookahead | Up to 15 ms advance detection of the sibilant onset | ~10 ms is FabFilter's recommended default for catching the full 's' without over-triggering | — |
| ⑧ | Side Chain In/Ext | Toggles detection between the main input and an external side-chain feed | Use an external, less-processed vocal take as the sidechain trigger when de-essing a heavily saturated/distorted vocal | — |

Circled numbers above match a from-scratch signal-flow read of the manual, not an annotated screenshot (none exists for this note).

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
