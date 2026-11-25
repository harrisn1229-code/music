---
type: plugin
title: "Sampler"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Sampler

![[Images/Sampler.png]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's full-featured multi-sample instrument with layered zones, modulation, filters, and a dedicated built-in effects/LFO section — the deep-editing counterpart to Simpler.

## What it's used for

Building velocity-layered and round-robin instruments from multi-sampled recordings (pianos, orchestral instruments, custom multisamples).

## FX chain notes

Used as the primary instrument source when a patch needs zone/velocity layering that Simpler can't do; typically followed by standard mix-bus processing.

## Techniques

- **Consolidate and crossfade a gappy vocal loop in Simpler, then move it to Sampler** — slice out the open/quiet parts of a loop, drag the remaining slices together to close the gaps, select them all and hit **Command+F** to crossfade them into each other (removing the poppy edit points), **Command+J** to consolidate into one file, then drag that consolidated file into Sampler for full envelope/zone control. — dnksaus, [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Freeze a randomized velocity/sample-offset pattern into a fixed, repeatable one** — the Velocity-device-into-Sample-Offset randomization below re-randomizes on every playback by default; to lock in one specific pattern instead, turn off the Velocity device, draw MIDI notes by hand, select them all, and run Live's built-in **Randomize velocities** command — every note gets a different, but now *fixed*, velocity (and therefore offset) that repeats identically on replay; re-randomize a single note in isolation if just one lands wrong. → [[Automation]], [[Randomized Rack Design]] — dnksaus, [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Confirmed: the same distributed Selector ranges carry over to Velocity mode** — building a ~128-sample percussion selector (Zone → Selector tab, select all, **Distribute Ranges Equally**, map the bar to a macro) and then simply switching the Zone to **Velocity** mode reuses the same distributed ranges, so velocity alone now picks the hit instead of the macro — confirms and extends the Zone-modes bullet below with a percussion-specific example. — dnksaus, [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Whole break-beat loops distributed across an Instrument Rack's chains** — the Zone-distribution idea, one level up: group full drum-break loops as separate chains in an Instrument Rack, select them in the Chain List, and **Distribute Ranges Equally** so each key plays back a different whole break rather than a single hit. Each chain still needs its own manual beat-slicing to be sub-loop-playable (no batch "save as default" for that); a workaround for a simple few-notes-per-loop feel is duplicating that note range across an octave (roughly C1–D♯1), or reaching for the [[Expression Control]] Random-to-chain-selector trick instead. → [[Randomized Rack Design]], [[Expression Control]] — dnksaus, [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Generative MIDI/Arpeggiator resampling from a sliced instrument** — draw dense MIDI notes across every slice (Option/Alt-duplicating so each slice gets a trigger), stretch that pattern out over a long span, add an [[Arpeggiator]] set to Random, and record the result to a new audio track purely to hear what the combination generates. → [[Randomized Rack Design]], [[Arpeggiator]] — dnksaus, [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Sustain-loop-mode pad from a recorded vocal chop** — record a vocal chop to a new audio track, drag it onto a MIDI track (auto-converts to Sampler for more control than [[Simpler]]), turn on **sustain loop mode** with some room and turned-up crossfade so the note holds indefinitely while a key is held, tune the **root note** by ear (find the sample's actual pitch), then shape it into a real pad: turn up **Attack** and **Release**, add a touch of **Sustain**, and add **Voices**. Follow with [[OTT]] (amount down, time-scaling up so it's not over-squashed, low end off), then a **band-pass filter (12 dB slope)** with an LFO mapped to filter with **Key** turned up so each note gets a slightly different filter position (slow rate, free-trigger off; Morph mode for a half-band-pass variant). → [[Hybrid Reverb]], [[OTT]] — dnksaus, [reverb can be POWERFUL](https://www.youtube.com/watch?v=Gi_y81NmoGg)
- **Zone section — three sample-selection modes** — dragging a sample into a [[Drum Rack]] pad loads Simpler by default; switch to Sampler to reach the Zone section's selection modes: **Key** (incoming MIDI note picks the sample), **Velocity** (hit strength picks the sample), and **Selector** (a draggable blue bar picks the sample, independent of note/velocity — Command-A → right-click **Distribute Ranges Equally** across all loaded samples, then map the bar to a macro). **Round Robin** is a fourth zone mode for sequential/random cycling with a resettable count. → [[Drum Rack]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **ADSR as a transient shaper** — set Loop to **Trigger** mode so a hit always plays the full sample regardless of note length; instead of using Attack to fade in, turn up **Initial** for a plateau at the top of the attack, let **Sustain** act as transient emphasis, and enable **Decay** to shape the tail into a percussive form. Map Initial (limit ~0–200 ms), Decay (limit ~50 ms–2 s), and Sustain to macros for a sample reshapeable from tight/clicky to long/boomy. → [[Kick Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Transpose as a sample-refresh macro, with per-drum-type ranges** — mapping Transpose to a macro dramatically refreshes a single sample into many different-feeling hits: snares can take a wide range (roughly -12 to +24), kicks want a narrower one (roughly -5 to +7) before they stop reading as a kick. → [[Kick Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Exclude Global Time from rack randomization** — when a rack's macros are wired for a Randomize button, individual macros can be excluded from that action — Global Time (below) is a good candidate to exclude since it's a broad, deliberate creative choice better set by hand than left to chance, unlike the per-sample micro-variation macros around it. → [[Randomized Rack Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Velocity → Sample Offset for randomized start points on a texture/pad (not drums)** — when velocity isn't already doing dynamics duty (a texture bed or sustained pad, unlike a drum-rack pad), the plain workaround is fine: add a [[Velocity]] device set to **Fixed** mode with Random turned all the way up, feeding a note into Sampler, then on Sampler's MIDI tab map **Velocity → Sample Offset** and turn that amount up to 100 — every note now starts playback at a random point in the sample. Pair with **loop/back-and-forth sustain mode** + crossfade, a touch more Release, **random pan**, and an LFO (sample-and-hold or sine, phase spun) modulating pan so a held note doesn't stay panned in one place, then fine-tune the ADSR around it. → [[Velocity]], [[Ambient Texture and Field Recording]] — dnksaus, [Texturing Your Tracks in Ableton](https://www.youtube.com/watch?v=9Bab-gq4E00)
- **A makeshift sample-start macro via MPE Slide → Sample Offset** — Sampler has no native macro-mappable start-point control, and the common workaround (Velocity in Fixed mode → Sample Offset) conflicts with drums that already use velocity for dynamics. Instead, add the stock **[[MPE Control]]** Max device, group it into its own rack, and on its Slide section map both minimum and maximum to a single macro — moving that macro now scrubs the sample's start point. The **Snap** toggle (on by default) minimizes clicks/pops at the new start point; expose it as an on/off option for kicks where pops are more audible than on snares. Restrict the **Sample Start** range directly on samples with silent tails so the macro only sweeps useful territory. → [[MPE Control]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Pitch-envelope punch on kicks/808s** — the pitch envelope (Amount + Peak mapped to a macro, plus Decay) adds extra transient "knock": moderate values (Amount ~48, Peak limited to a narrow range like 0–33 rather than the full 0–100, which reads as too extreme) give subtle additional punch layered on the sample's own transient. → [[Kick Design]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE)
- **Shaper section (4 modes) and FM/AM section for texture** — the Shaper section's 4 waveshaping modes reshape a sample's harmonic character (Soft is a good starting mode for kicks); the **FM section** can generate genuinely new-sounding textures out of an existing sample rather than just distorting it — squeezing more variety from the same source material instead of hunting new samples. Map Shaper Drive to a macro for an overall "how aggressive" dial. On one-shot bass samples, the same oscillator section can **AM** as well as FM the loaded sample for a wilder tone — functionally close to [[Operator]]'s FM approach, but with no custom hand-drawn-harmonic waveform option the way Operator has. → [[Operator]] — dnksaus, [the last drum kit you'll build](https://www.youtube.com/watch?v=VfOPVl0tzCE) & [Sampler is more OP than you might think](https://www.youtube.com/watch?v=rW6pjAyYHcY)
- **Global Time as a one-knob rhythmic-feel control** — Sampler has the same Global Time knob as [[Wavetable]]/[[Operator]] (scales all its envelope rates at once); mapped to a macro and automated on a hi-hat patch (with Attack up a little), a moving Global Time value produces a shifting hi-hat "shuffle" feel purely from envelope-timing changes — no separate groove/humanize tool needed. → [[Wavetable]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)

## Key Parameters

```visual-key
image: Images/Sampler.png
coords: Images/Sampler.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. Badges mark the **tabs** each group of controls lives behind — this capture has no sample loaded, so the panels themselves are empty.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Zones (Key/Vel/Sample) | Multisample mapping across key + velocity | Build realistic multisampled instruments |
| ② | Filter | Cutoff/res tone-shaping | Env-mod the filter for movement |
| ③ | Envelopes (Amp/Filter/Pitch) | Contours per stage | Shape the sound's evolution |
| ④ | LFO / Mod Matrix | Modulation sources + routing | Animate and add expression |

## See also

- Techniques: [[Kick Design]] · [[Randomized Rack Design]] · [[Ambient Texture and Field Recording]]
- Related: [[Simpler]] · [[Operator]] · [[Wavetable]] · [[MPE Control]] · [[Velocity]] · [[Expression Control]] · [[Arpeggiator]]
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
