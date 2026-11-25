---
type: plugin
title: "MicroShift"
category: Pan/Imaging
vendor: "Soundtoys"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
---

# MicroShift

![[Images/MicroShift.png]]

**Category:** Pan/Imaging
**Vendor:** Soundtoys

## What it is

Soundtoys' stereo-widening pitch-shift effect using subtle detuned doubling to create width without a true stereo source.

## What it's used for

Widening mono vocals, guitars, and synths using pitch-shifted doubling rather than simple delay-based widening.

## FX chain notes

Used late in a track's chain, after EQ/compression, for final width.

## Techniques

- **Used as a mono→wide structural reveal rather than constant widening: a guitar DI starts dead-center in a track's intro, then MicroShift widens it the instant the drums enter**, so the stereo image visibly "jumps out" as a deliberate arrangement cue. → [[Width and Stereo]], [[Arlo Parks Vocal Chain]] — Arlo Parks & Baird (Tape Notes), [[TN 183 Arlo Parks & Baird - Full Video Episode]]
- **Used on a heavily-pitched, octave-doubled vocal layer to build a fake horn section, not for width on a lead vocal.** Joy Anonymous's "Hentai-cizer" technique: their own dry vocal take is repitched/processed (this plugin plus a Safari Pedals distortion) then doubled with an octave layer to stand in for a real horn section — reasoning given explicitly: a synth patch can be copied, a processed human voice can't, so it doubles as a signature/ownership device. → [[Layering and Stacking]], [[Sound Selection Guide]] — Joy Anonymous (Tape Notes), [[TN 186 Joy Anonymous - Full Video Episode]]
- **A default go-to on stacked vocal ad-lib/baby layers, described as run "on absolutely loads of stuff."** First widening stage on a resampled vocal layer, right after pitch/formant shaping ([[Little AlterBoy]]) and before a touch of Auto-Tune — a habitual, low-effort reach rather than a considered per-song choice. → [[1 Main Vocal Track]], [[Vocal Stacks and Ad-libs]] — Overmono (Tape Notes), [[TN 187 Overmono - Full Video Episode]]
- **A direct, named confirmation of the H3000-widener technique this plugin is built to emulate: a dedicated Eventide H3000 set to micro pitch-shift, roughly ±4 cents split left/right, used as a widener on a guitar solo.** Chris Lord-Alge: "we have our two H3000s — we have one set up for micro pitch shift, which means we're going to go four cents up on each side, right, as a widener... left fine, right fine, so it's plus and minus four." Run alongside a second H3000 doing a subtle custom flange ("Death Flange") for a "supernatural" character — see [[Modulation]] (effect) for that half. This is the actual hardware/technique behind this vault's own [[Width Send]] chain ("the H3000 micro-pitch trick") — Style I + Detune/Delay at 100% is the direct owned-lane match. → [[Width Send]], [[Stereo Field]] — Mix with the Masters (Chris Lord-Alge), [[Mixing Muse Guitars - Chris Lord-Alge]]
- **A light pass for chorus-like thickening on a bass, not stereo widening** — after [[OTT]] (multiband: Depth down, lows boosted, highs/mids cut) on a simple UK-garage bass one-shot, a little MicroShift was added purely "to give it a bit of a chorus effect," a different job from this device's usual mono→wide widener role — followed by an [[EQ Eight]] 30 Hz cut. → [[Bass Design]], [[OTT]], [[EQ Eight]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)

## Used in my chains

My **mono→wide** widener (the H3000 micro-pitch trick) — pitch/delay-splits a signal L/R so it spreads without the phase mess of a chorus, and keeps the low end mono via Focus:

- **[[Width Send]]** — *slot 1, the widener*: Style I (classic H3000), Detune & Delay at 100% default, Focus ~100–200 Hz (lows stay mono inside the plugin), Mix 100% (it's a return).

## Key Parameters

```visual-key
image: Images/MicroShift.png
coords: Images/MicroShift.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Style (I / II / III) | Three H3000-derived widening algorithms with subtly different phase behavior | Audition all three per source — same trick, different phase; Style I is the classic | — |
| ② | Detune | Amount of pitch detune on the split voices | 100% default is the pro widening; push toward 200% only for deliberately phasey/crazy moments | — |
| ③ | Delay | Timing offset between the widened voices | Left at default with Detune; more delay = wider but more comb-y | — |
| ④ | Focus | Crossover frequency below which the signal stays mono (protects low end) | Set ~100–200 Hz so widening never touches the bass/kick | — |
| ⑤ | Mix | Dry/wet blend | 100% on a dedicated width return; lower as a subtle insert | — |

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]
