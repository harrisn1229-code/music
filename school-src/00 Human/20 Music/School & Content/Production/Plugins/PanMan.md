---
type: plugin
title: "PanMan"
category: Pan/Imaging
vendor: "Soundtoys"
video_enriched: true
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

# PanMan

![[Images/PanMan.png]]

**Category:** Pan/Imaging
**Vendor:** Soundtoys

## What it is

Soundtoys' auto-panner and tremolo effect with tempo-synced rhythmic movement patterns.

## What it's used for

Rhythmic auto-pan and tremolo movement effects on synths, guitars, and vocals.

## FX chain notes

Used as an insert effect for rhythmic stereo/amplitude movement.

## Techniques

- **Run a continuously-active, always-moving "hard bounce MIDI" auto-pan pattern on a picked drum layer purely for imaging, not a one-off swipe.** After auditioning a Battery sound he liked, Finneas ran it through PanMan next specifically "for imaging, just takes things out of just like sort of mono mania" — the modulation source is set to trigger constantly (not a single swept move) and is credited directly with adding "a real sort of depth" and excitement to the layer. *(qualitative only — no Offset/Width/Rate given)* → [[Width and Stereo]], [[Finneas Drum Sampling Chain]] — Finneas (Mix with the Masters), [[Creative drum sampling with Finneas]]
- **Pan LAST in a reamped ambient guitar-texture chain, to place the wash distinctly from the dry guitar layer.** In a two-layer R&B guitar recipe (a dry EQ→comp→reverb→delay→flanger→shaper chain, plus the same performance reamped through a Montreal Assembly Count to 5 pedal → shaper → EQ → reverb), PanMan is the final device on the reamped/texture layer, placing the finished wash in the stereo field so it sits apart from — not on top of — the dry guitar's position. *(general starting point — no exact Offset/Width given)* → [[SZA R&B Guitar Chain]], [[Width and Stereo]] — loner, [the secrets behind sza's 'sos' production!?](https://www.youtube.com/watch?v=qbkFwpExtVQ)
- **A pan move on an ambient, two-reverb vocal loop, as the last stage after compression.** For a huge-soundscape ambient vocal treatment: two reverbs → a compressor placed after them (so compression reveals the reverb tail's texture, see [[Compression]]) → a pan effect last, to spread the finished wet loop across the stereo field. *(general starting point — no rate/depth/pattern given)* → [[Reverb]], [[Stereo Field]] — loner, [how Frank Dukes changed sample-making forever!?](https://www.youtube.com/watch?v=mKA2Ldh-19U)

## See also

- Effects: [[Modulation]]
- Techniques: [[Width and Stereo]] · [[Stereo Field]]

## Techniques

- **The moving center ad-lib** — two ad-lib tracks panned wide L/R + a third in the center running PanMan, drifting between them: static width plus one moving element — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/PanMan.pdf|Local PDF]] · [Official manual](https://www.soundtoys.com/wp-content/uploads/PanMan-Manual.pdf)

**High-level points** (the mental model, not a feature list):
- PanMan isn't one auto-panner — it's **six independent modulation-source modes** (LFO, Rhythm Step, Rhythm Shape, PingPong, Random, Random Step) sharing the same Offset/Width/Smoothing core. Switching modes swaps the entire control layout, not just a waveform choice — pick the mode by *how* you want the movement triggered, then dial the shared controls.
- **Offset + Width together define the whole pan range**, not two separate settings: Offset is the center point (-105° to +105°, where ±90° = hard L/R and beyond that is "past the speakers"), Width is how far the modulation swings *around* that center (up to 210°). Setting Offset to +90° with Width at 180° physically can't exceed 105° — the two clamp each other, so "beyond the speakers" only happens with the right combination, not from cranking either knob alone.
- **Smoothing controls the character of the transition, not the speed** — Hard = instant jump cuts between pan positions (classic choppy stutter-pan), Soft = eased glides. On directional modes (left-to-right etc.) it specifically governs how hard the "snap-back" to the start position hits.
- **Rhythm Step mode is a step sequencer for pan position**, not an LFO — each step in the Rhythm Step Editor is a discrete L/C/R target with its own timing, so you can program asymmetric rhythmic pan patterns (not just alternating L/R) synced to Rhythm/Steps/Tap Tempo.
- **Analog Style is a saturation/character layer bolted onto every mode** (Clean/Fat/Crunch/Squash/Shred/Dirt/Pump) — it's modeling the coloration of the vintage hardware (PanScan, Cyclosonic FS-1, Electrospace Spanner) PanMan is built from, independent of which modulation mode is driving the pan.
- The **Pan Position Meter**'s yellow LEDs are a deliberate "you're panning past the speakers" indicator, not a clipping warning — there's nothing wrong with going there, it's just useful to see when you didn't mean to.

### Sources
- Manual covers LFO/Rhythm Step/Rhythm Shape/PingPong/Random/Random Step modes in full (pp. 8–26); Key Parameters table below focuses on the shared core + LFO mode, the one most directly usable in a mix chain.

## Used in my chains

My **rhythmic auto-panner / tremolo** — tempo-synced or triggered stereo movement:

- **[[1 Electric Piano Track|Electric Piano Track]]** — *slot 5, tremolo/auto-pan (optional)*: synced pan for vintage EP movement (a Rhodes/Wurli tremolo staple).
- **[[1 Backup Vocal Track|Backup Vocal Track]]** — the "moving center ad-lib": one PanMan lane drifting between a static wide pair.

## Key Parameters

```visual-key
image: Images/PanMan.png
coords: Images/PanMan.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ⑥ toggles LFO ↔ Rhythm-Step mode; ⑦ (the per-step L/C/R editor) appears only in Rhythm-Step mode, so it isn't badged on this LFO-mode capture.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Offset | Base/center pan position (-105° to +105°) | Set off-center (e.g. +20°) before adding Width so the panned element still favors one side — a subtler stereo mover than full L-R | — |
| ② | Width | How far the pan swings around Offset (up to 210°) | Push past 180° combined with a wide Offset for exaggerated "beyond the speakers" throws on synth stabs in the [[TEXTURE Slot]] | — |
| ③ | Smoothing | Hard (jump-cut) vs. Soft (eased glide) transition character | Hard smoothing on a rhythmic gated synth for a choppy stutter-pan; Soft for a slow tremolo-like swirl on pads | — |
| ④ | Rate (LFO mode) | LFO frequency, 0.1–10 Hz | Sync visually to song tempo by ear, or use free-run for a "not quite locked" analog wobble on a guitar bus | — |
| ⑤ | Direction (LFO mode) | LFO shape: Left-to-Right / Back-and-Forth / Right-to-Left | Back-and-Forth for symmetric tremolo/pan sweeps; one-directional modes for a sawtooth-style "always resets" pan throw | — |
| ⑥ | Rhythm / Steps (Rhythm Step mode) | Tempo-synced note division + number of steps in the pattern | Program an odd step count (e.g. 3 or 5) against a straight beat grid for a pan pattern that phases against the song | — |
| ⑦ | Rhythm Step Editor | Per-step L/C/R target grid | Draw an asymmetric pattern (not just alternating) for rhythmic ear-candy on a hi-hat or delay-send bus | — |
| ⑧ | Analog Style | Saturation/character model (Clean/Fat/Crunch/Squash/Shred/Dirt/Pump) | Fat/Squash add subtle grit that makes the pan effect feel more "hardware" and less clinically digital | Modeled on PanScan/Cyclosonic FS-1/Electrospace Spanner hardware panners |
| ⑨ | Input / Output | Level trim in/out of the effect | Push Input to drive Analog Style saturation harder without changing the final level (compensate with Output) | — |
| ⑩ | Pan Position Meter | Visual L–C–R display; yellow = past-speaker range | Watch for unintended yellow-zone panning when dialing in extreme Offset+Width combos | — |
