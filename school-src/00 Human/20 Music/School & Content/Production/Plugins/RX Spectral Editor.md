---
type: plugin
title: "RX Spectral Editor"
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
---

# RX Spectral Editor

![[Images/RX Spectral Editor.jpg]]

**Category:** Utility
**Vendor:** iZotope

## What it is

RX's spectrogram-based editing view, allowing surgical removal of unwanted sounds by directly selecting and editing frequency content visually. Owned in both the RX 10 and RX 11 suites.

## What it's used for

Manually removing coughs, chair squeaks, or other transient unwanted sounds visible in a spectrogram.

## FX chain notes

Used for manual surgical repair, typically in the standalone RX app via RX Connect.

## Techniques

- **The cleanest possible surgical EQ: select a time-frequency region directly and reduce/delete it with the Gain module, instead of filtering.** Any filter (minimum or linear phase) introduces amplitude-modulation artifacts on a signal whenever its amplitude changes — even with the cutoff set far from that signal's own frequency (see [[EQ]]) — because filtering reshapes the waveform in real time. RX's frequency-select tool operates on the spectral data directly, so the usual filter-induced artifacts don't apply. Worked vocal example: cut below 80 Hz, reduce a narrow nasal band −5 dB, boost ~3 kHz +2–3 dB, add +3 dB of air above 11 kHz — all as direct spectral edits rather than channel-EQ moves. Best suited to aggressive/surgical cuts (notches, high/low-pass) done once up front, since this happens **before any of the DAW's own inserts** on that track — not for ongoing musical EQ that needs to interact with the rest of the chain. Workflow: set RX as the DAW's external sample editor (Logic: Advanced Plugins → Audio → Audio Editor → RX), select a clip, **Shift+W** to open it in RX, edit, File → Overwrite, close — fully non-destructive; reopen and restore Initial State to revert. → [[EQ]] — Sage Audio, [The Cleanest, Most Accurate EQ Possible (and you've never tried it)](https://www.youtube.com/watch?v=Tfq7XkbYk5U)
- **An alternative to a threshold-based de-esser for sibilance headed to earbud playback — direct visual editing instead of dynamics processing.** Earbuds amplify sibilance two ways (a frequency-response boost around the presence range, and bypassing the outer ear's natural diffusion), making sibilant energy read harsher than on speakers. Rather than (or alongside) a de-esser, select the sibilant content directly in the spectrogram and attenuate it manually — offers finer, more deliberate control than a dynamics processor's attack/release/threshold interaction, at the cost of being manual rather than automatic. → [[De-essing]], [[Referencing and Translation]] — Sage Audio, [Perfecting Vocals on Modern Playback Systems](https://www.youtube.com/watch?v=pzEG3HxI3WE)
- **Speculative: rearranging FFT bins by AMPLITUDE (not just frequency) could make dynamics processing surgically precise without a threshold function — an open question, not a built workflow.** This plugin already maps bins by time (X) and frequency (Y), with color as amplitude — far more precise than traditional EQ for targeted amplitude changes. The unbuilt idea: keep time on the X-axis but make the Y-axis AMPLITUDE instead of frequency (the data is already known and mappable) — then a dynamic-range slice (e.g. everything between −40 dB and −80 dB) could be selected and reduced regardless of whether a performance is present, avoiding a traditional gate's attack/release fussiness and audible artifacts entirely. No plugin currently does this — logged as food for thought against a future feature or workaround, not a technique to attempt today. → [[Compression]] — Sage Audio, [5 Advanced Compression Techniques (Simple to Complex)](https://www.youtube.com/watch?v=V1lZaf8NWd0)

## Key Parameters

```visual-key
image: Images/RX Spectral Editor.jpg
coords: Images/RX Spectral Editor.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Selection tools | Lasso / brush / magic-wand / time-frequency box for selecting regions | Pick the tool that fits the artifact's shape |
| ② | Spectrogram | The time/frequency display — paint over a noise/artifact to target it | Isolate a cough/click/hum tone visually, then process only that |
| ③ | Process | Applies attenuate / gain / replace to the current selection | Attenuate a cough; use surrounding audio to replace a click |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
