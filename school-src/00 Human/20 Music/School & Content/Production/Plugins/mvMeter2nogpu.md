---
type: plugin
title: "mvMeter2nogpu"
category: Utility
vendor: "TBProAudio"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# mvMeter2nogpu

![[Images/mvMeter2nogpu.png]]

**Category:** Utility
**Vendor:** TBProAudio

## What it is

TBProAudio's loudness/true-peak metering plugin (non-GPU-accelerated build), offering LUFS and true-peak measurement to broadcast/streaming standards.

## What it's used for

Loudness and true-peak metering during mixing and mastering to meet streaming platform targets.

## FX chain notes

Used as an analysis-only tool, typically on the master bus.

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/mvMeter2.pdf|Local PDF]] · [Official manual](https://www.tbproaudio.de/assets/content/manuals/mvMeter2%20manual.pdf)

**High-level points:**
- mvMeter2 isn't a true-peak/LUFS-only meter — it's several classic meter *behaviors* (VU, PPM, RMS, RMS+3dB, EBU R128) rebuilt in one plugin, each with correct ballistics for that standard (VU's slow analog swing vs. PPM's fast-attack/slow-release).
- EBU R128 mode reads Momentary Loudness (ML) and Short-term Loudness (SL) — this is the actual loudness-standard mode, not a separate "LUFS meter" — reference level defaults to -23 dBFS (EBU spec).
- Reference Level is mode-specific and matters more than it looks: VU's standard reference is -18 dBFS, so 0 VU ≠ 0 dBFS — miscalibrating this makes the needle lie.
- Gain Match auto-sets Pre-Gain so the current Max reading lands on the mode's reference level — the fast way to calibrate a signal to a target loudness without doing mental dB math.
- Dual meter mode (L/R or M/S side-by-side) is how to catch mono-incompatible content — a wide stereo source will show the two needles disagreeing.
- The "nogpu" build in this vault exists for CPU-only rendering environments — functionally identical metering to the GPU build, just without hardware-accelerated graphics.

## Used in my chains

A **metering/reference tool** (no audio processing, no settings to dial into a chain) — the 0 VU calibration reference for the meter-sandwich/gain-staging convention used across the [[FX Chain System]]. Drop it to check that each stage sits around 0 VU / −18 dBFS average before and after coloration devices; it doesn't change the sound.

## Key Parameters

```visual-key
image: Images/mvMeter2nogpu.png
coords: Images/mvMeter2nogpu.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Meter Mode | Selects Peak / RMS / RMS+3dB / EBU R128 / VU / PPM ballistics + scale | Use VU on a bus for a "how hot does this feel" analog read; switch to EBU R128 (SL) for a true loudness read before an export | — |
| ② | Reference Level | Sets the 0-point (dBFS) the current mode's scale is calibrated against (e.g. -18 dBFS for VU, -23 dBFS for EBU) | Match reference level to your delivery target (e.g. -14 LUFS streaming) so 0 on the meter means "on target," not just "loud" | — |
| ③ | Channel Selector | Chooses Stereo / Left / Right / Mid / Side for single-meter, or L+R / M+S for dual-meter | Flip to Mid/Side to check how much of the low end is genuinely centered before committing to a width move | — |
| ④ | Pre-Gain | Trims the signal feeding the meter only (not the audio path) | Nudge Pre-Gain instead of second-guessing the mix when a source is just metering hot/cold relative to reference | — |
| ⑤ | Gain Match | Auto-calculates Pre-Gain so the Max reading sits on the mode's reference level | One-click calibration pass before a final loudness check, instead of manually trimming and re-reading | — |
| ⑥ | Needle Mode | Sets the red secondary needle to track current value, max value, or off | Track "max" during a mix pass to catch transient overs that the eye misses on the live needle | — |
| ⑦ | OL LED mode / level | Overload indicator triggers at meter-zero or at a set dBFS ceiling | Set OL level a few dB under your true-peak ceiling as an early-warning light while mixing, before running a dedicated true-peak limiter check | — |
| ⑧ | Delay | Time-aligns the meter reading against other busses with mismatched latency | Match delay across parallel busses (e.g. a linear-phase EQ'd bus vs. a dry bus) so their meters stay comparable | — |
| ⑨ | DAW sync | Resets the meter (esp. max/EBU integration) on DAW transport start | Enable when doing repeated pass/re-pass loudness checks on the same section, so each pass starts from a clean read | — |

*Numbered badges not yet placed on the plugin screenshot — annotated image is a follow-up pass.*

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
