---
type: plugin
title: "Drum Sampler"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Drum Sampler

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's per-pad drum instrument — a [[Simpler]] alternative purpose-built for [[Drum Rack]] pads, converted via right-click "Convert to Drum Sampler." Beyond basic sample playback it ships with a built-in **effects section** (nine selectable effect types per pad — stretch/grain, FM, and others) and its own MPE-style modulation ("MP") tab with LFO/Velocity/Slide-driven modulation routing.

## What it's used for

Adding built-in per-pad sound-design processing (time-stretch character, grain manipulation, FM, modulation-driven movement) directly on a Drum Rack pad, without inserting a separate device chain per pad.

## FX chain notes

Sits inside a Drum Rack pad in place of Simpler; its effects section runs after the sample playback, so mapping its controls (Stretch Factor, Grain, the Mod-section targets) to a macro and copying to all siblings applies the same processing across an entire converted kit at once.

## Techniques

- **Detune a percussion one-shot ~50 cents as a near-subliminal pre-drop cue.** Nudging a loaded cymbal/percussion sample's tune ~50 cents (half a semitone) off pitch is subtle enough not to register consciously in the mix, but reads as a small hint of tension ahead of a section change — a much gentler alternative to a full/extreme transposition, which is also an option when a more obvious effect is wanted. → [[AIR Slot]], [[Arrangement and Song Form]] — Pick Yourself, [3 transition techniques pros use instead of risers](https://youtu.be/05A0Ez0IWAE)
- **Convert a whole Drum Rack from Simpler to Drum Sampler for its built-in FX section** — right-click the rack → Convert to Drum Sampler turns every pad's default Simpler into a Drum Sampler (takes a moment on a big kit); each pad gains a 9-effect FX section for extra sound design without adding separate devices. — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)
- **Map Stretch Factor + Grain to a macro, copied to all siblings, then automate** — with automation arm on, map Stretch Factor to a macro (Map to All Siblings) so every pad's time-stretch character moves together, then do the same for Grain size; automate the macro live while the pattern plays for evolving per-pad texture. — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)
- **MP (MPE) tab modulation via the Mod section's Transform = LFO** — switch a pad's Mod-section target to **FX2**, choose **Slide** instead of Velocity as the controlling MPE parameter, turn it up to 100%; set the Transform section to **LFO** (an MP-tab LFO affecting whatever the MP tab is routed to — e.g. switched from Pitchbend to Slide), extend/shape it, and set Shape to **Random** — this generates an evolving, per-pad automation-like modulation. **Copy to All Siblings** is required for every one of these settings individually — Drum Sampler's macros aren't shared automatically across pads the way a rack macro is, and each effect has its own control layout, so remapping is per-effect, not global. — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)
- **FM and the other 7 effect slots are worth exploring individually** — beyond Stretch/Grain, Drum Sampler's FX section includes an FM mode among its nine effect types, each with its own character and control set — audition per pad/kit rather than assuming one setup transfers. — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)

## See also

- Plugins: [[Simpler]] (the lighter-weight default Drum Rack pad instrument this replaces) · [[Drum Rack]]
- Techniques: [[Sample Browser and Clips Workflow]] · [[Randomized Rack Design]]
- Palette: [[Sound Palette]]
