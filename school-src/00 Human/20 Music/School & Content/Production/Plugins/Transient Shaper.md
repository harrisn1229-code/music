---
type: plugin
title: "Transient Shaper"
category: Compressor/Limiter
vendor: "Softube"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-21
video_enriched: true
---

# Transient Shaper

![[Images/Transient Shaper.png]]

**Category:** Compressor/Limiter
**Vendor:** Softube

## What it is

Softube's transient-shaping plugin with independent attack/sustain controls for reshaping a signal's punch.

## What it's used for

Adding or removing punch and sustain on drums and percussive elements.

## FX chain notes

Used before or in parallel with compression, since it directly reshapes transients rather than gain-reducing.

## Techniques

- **Owned best-match for a Sonnox Oxford Envolution transient designer sitting on a percussion aux bus — push Attack noticeably up, trim Sustain down slightly, then blend only a small amount of the processed signal back in rather than running fully wet.** Praised specifically for "really, really good sensitivity, a really good threshold" for grabbing internal transients "a little bit better than some of the other ones can," plus independent sustain control — language that matches this note's own **Mode/Sensitivity** parameter directly. Pushed "a little bit over the top," it "adds a nice amount of attack" while cutting sustain, but reads "a little bit process sounding" at full strength — the fix was mixing in "just a tiny bit" of the processed signal (parallel-blend the transient shaper itself, not just insert it straight). *(General starting point: Attack pushed up noticeably, Sustain trimmed down slightly, then Mix/blend brought back to roughly 15–25% rather than fully wet.)* → [[3 Drums Bus|Drums Bus]], [[TRANSIENT Slot]], [[Compression Staging]], [[Parallel Processing]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]

## Key Parameters

```visual-key
image: Images/Transient Shaper.png
coords: Images/Transient Shaper.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Attack | Boosts/softens the transient | + for drum punch; − to tame spikes |
| ② | Sustain | Lengthens/shortens the body | − for tight; + for roomy |
| ③ | Mode / Sensitivity | Detection behavior | Tune to the source's dynamics |
| ④ | Output | Makeup | Match bypass — attack boosts raise peaks |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
