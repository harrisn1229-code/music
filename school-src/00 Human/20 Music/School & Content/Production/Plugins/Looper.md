---
type: plugin
title: "Looper"
category: Utility
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Looper

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock live-looping/overdub device — records incoming audio into a buffer that plays back in a continuous loop, with overdubbing, speed (including reverse and octave-shift), and feedback-decay controls, plus the ability to insert other devices directly into its own feedback path.

## What it's used for

Usually framed as a live-performance/beat-jamming tool, but equally useful as a sound-design engine — layering overdubs while continuously varying speed, direction, and decay builds evolving ambient beds and glitch textures that are hard to get any other way.

## FX chain notes

Runs inline on a track; audio routed to its own track with output set to **Insert Looper** (instead of Post Mixer) feeds back into Looper's own buffer rather than the main mix — anything on that insert track processes and re-processes the looped content every pass.

## Techniques

- **Core controls** — **Record** starts capture, **+** commits the loop length. Set **Tempo Control to follow the song tempo** — by default, pressing + instead *changes the project tempo* to match what you just recorded, which is rarely what you want for sound-design use. Set it to **record a fixed bar count** (e.g. 2 bars) rather than manually stopping; after that it auto-stops and starts overdubbing on top of what's already playing. Use **Feedback** to treat the accumulating loop like a delay — each pass gets a little quieter, keeping it from becoming an unlistenable wall of overdubs. → [[Sidechaining]] is not involved here; this is Looper's own decay, not a duck — dnksaus, [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **Speed/Reverse only affect material recorded *after* the change** — the octave-shift arrows and Reverse button do **not** retroactively repitch or flip audio already in the loop; only new overdubs recorded after the change are affected. Treat Reverse as a **direction toggle**, not a one-shot flip — everything played after pressing it plays in the new direction until pressed again. This is the mental model that makes modulating these controls musically useful rather than just chaotic. — dnksaus, [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **Binary-LFO octave/direction modulation** — group Looper into a rack, map **Speed** to a macro (range roughly -12 to +12), add an [[LFO]] on **Binary** mode (coin-flip min/max) in Remote mode mapped to Speed for constant octave-flipping (raise Smooth for a "blippy" rather than clicky transition). Duplicate the LFO and map the copy to the first LFO's own **Depth** so the swing amount itself varies — different rates per LFO (free or tempo-synced to a bar/half-bar) give a mixture of switching patterns. A third LFO (lower Smooth) mapped to **Reverse** randomly flips playback direction — expect occasional clicks when a flip lands mid-phrase; that's often the point. → [[LFO]], [[Randomized Rack Design]] — dnksaus, [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **Insert an FX chain into Looper's own feedback loop** — make a new audio track, take input from the track running Looper, but set the track's *output* routing to **"Insert Looper"** instead of Post Mixer — this feeds that track's output back into Looper's own buffer instead of to the main mix, so whatever device sits on the insert track processes and re-processes the looped audio every pass. A glitch-fade [[Echo]] (Wander wave, synced Time, feedback down/dry-wet up) on that insert chain progressively scrambles the loop content the more it recirculates — go careful about how often new audio is fed in, since the mangling compounds each pass. → [[Echo]], [[Randomized Rack Design]] — dnksaus, [delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc) & [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **Glitch-and-resample signal path for ambient beds** — Echo → [[Beat Repeat]] → Looper, with Beat Repeat's stutter start-point/frequency/count/subdivision (12ths/24ths/8ths/quarters) and a subtle pitch decay for texture (switch Beat Repeat to Insert mode if the stutter is too disruptive), finished with a reverb send — then resample the whole chain to a new audio track (take audio straight from the source track, not post-master, if a master chain sits in the way). Keep input notes sparse — feeding a self-modulating chain too many notes too fast turns "atmosphere" into noise fast. → [[Beat Repeat]]
- **Chase Bliss Habit-style "resurfacing" delay** — recreate the hardware pedal's "records the last few minutes, sometimes resurfaces a chunk messed-up" behavior with a *second*, separate Looper set to a long buffer (16 bars ≈ 30 s at 140 BPM) placed at the **start** of a chain. Group it into a rack, set the rack so the dry signal doesn't pass by default, then open the Chain window and add a **dry chain** to restore pass-through. Add a Binary LFO through a **Volume Macro** (a Utility with Gain mapped to a macro, capped at 0 dB instead of +36 — worth building once as a reusable utility) mapped to this Looper's output gain, smoothed to avoid clicks — the result intermittently resurfaces audio from ~30 seconds ago faintly over the current material. Keep this Looper's Feedback low so the resurfacing doesn't spiral. For finer control than a straight 50/50 coin flip, route a [[Shaper]] in Manual mode into the picture and map a Random-mode LFO to its manual-value knob, skewing the max value past 50% to bias how often old material resurfaces. → [[Randomized Rack Design]], [[Shaper]] — dnksaus, [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)
- **CPU discipline on dense self-modulating racks** — an 8-instrument "sound blender" rack (see [[Randomized Rack Design]]) ran ~20% CPU, mostly from the simultaneous instruments rather than the LFOs; cycling through presets within one synth instead of stacking multiple full instruments conserves CPU on similar builds. — dnksaus, [looper is actually a SOUND BLENDER](https://www.youtube.com/watch?v=fDTkW7H4FaE)

## See also

- Effects: [[Delay]] · [[Modulation]]
- Techniques: [[Randomized Rack Design]] · [[Ambient Texture and Field Recording]] · [[Sampling and Sound Selection]]
- Palette: [[TEXTURE Slot]] · [[Sound Palette]]
