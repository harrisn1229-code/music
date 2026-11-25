---
type: plugin
title: "Auto Filter"
category: Modulation
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Auto Filter

**Category:** Modulation
**Vendor:** Ableton

## What it is

Ableton's stock filter device — low-pass, high-pass, band-pass, and notch modes with a built-in LFO and envelope-follower section for automated filter movement.

## What it's used for

Classic filter-sweep duty (LPF/HPF/band-pass shaping) plus rhythmic or drifting filter modulation via its own LFO, without reaching for a dedicated modulation-effect plugin.

## FX chain notes

Sits inline wherever tonal shaping or a filter sweep is needed; frequently paired with its own LFO section rather than an external modulator when the filter movement doesn't need to sync to anything else in the rack.

## Techniques

- **A high-pass sweep filter as the closing stage on a bounced 3-vocal stem, reached for specifically to carve room for a future artist rather than for movement/character.** After bouncing three separately-processed vocal takes (main/high/low) down to one stem, an Arturia high-pass sweep filter runs after EQ and reverb on the stem — the stated reasoning: three full vocal layers would leave "no room for the artist to hop on it," so the filter thins the combined stem before it goes into the finished sample. Owned-lane stand-in for the named Arturia filter. → [[EQ]], [[Reverb]] (effect), [[Little AlterBoy]], [[Sampling and Sound Selection]], [[90s R&B Sample Chain]] — loner, [how to make your own 90's rnb samples](https://www.youtube.com/watch?v=PQjIBDgJehQ)
- **Velocity-linked cutoff via Expression Control, with a min-cutoff macro and a Rise/Fall glide macro, so filter brightness tracks playing dynamics.** Route [[Expression Control]] (MIDI effect) to link incoming MIDI note **velocity** to the Auto Filter's **cutoff frequency** — harder-played notes open the filter, softer notes close it, so brightness follows performance dynamics automatically rather than a static setting or a synced LFO. Two companion macros: one for the filter's **minimum cutoff frequency** (how closed it gets at low velocity), and one for the **glide time between cutoff values** via the **Rise** and **Fall** parameters (how quickly cutoff slides to its new velocity-driven target instead of snapping). One stage in a longer stacked-modulation piano chain — see [[Arca Piano]]. → [[Arca Piano]], [[Expression Control]] — asd, [ableton sound design | DECONSTRUCTION STUDY [ver. 1] Arca Inspired Piano](https://www.youtube.com/watch?v=equNWJvGVio)
- **DJ-mode "knocky" sweet spot on the kick + a Wet/Dry snap from 0→100%, for an instant micro-drop transition.** Switch to **DJ mode**, sweep to find where the kick has a distinctly "knocky" character (filtering out the low end until that spot is located), leave the device's Wet/Dry at 0% for the normal kick, then automate a hard snap to 100% for the exact transition moment (the filter engages, low end drops out, a small resonance boost appears) and back to 0% once the section lands — pairs with removing the bass entirely (not just filtering it) at the same instant for maximum contrast. → [[TRANSIENT Slot]], [[Arrangement and Song Form]] — Pick Yourself, [3 transition techniques pros use instead of risers](https://youtu.be/05A0Ez0IWAE)
- **A continuous downward Frequency sweep (not a snap) on the percussion/cymbal loop, as a connective bridge into a darker section.** Rather than cutting a part abruptly, automate the Frequency knob to gradually sweep down across the transition — psychoacoustically "introducing" the listener to the darker part that follows rather than jump-cutting into it; the gradual sweep read as clearly smoother than a hard stop in an A/B comparison. → [[AIR Slot]], [[Arrangement and Song Form]] — Pick Yourself, [3 transition techniques pros use instead of risers](https://youtu.be/05A0Ez0IWAE)
- **Envelope-sidechain for a triggered filter sweep** — enable Sidechain, key it from the kick (or any other pad in a Drum Rack — the source dropdown isn't limited to the whole drum track), then use the Envelope amount to pick the sweep direction: negative (e.g. −127) sweeps the filter DOWN every hit for a "whoosh," positive sweeps it UP instead. Freq and Res shape the range/character. → [[Sidechaining]] — You Suck at Producing, [How to Sidechain Everything in Ableton Live](https://www.youtube.com/watch?v=gej-sIZDTVU) · [How to write instrumentals for vocalists with Splice!](https://www.youtube.com/watch?v=NnIgCEn3f08) (keying a chord stab's filter envelope from the kick instead of the chords' own transients, for a filter "pump" synced to the kick rather than the chord hits)
- **Turning the Frequency knob live while the transport plays records an automation curve for that motion** — no separate "record automation" step needed; the movement is captured as-played, then editable afterward as a pink automation line in Arrangement View. → [[Automation]] — You Suck at Producing, [How To Use Automation](https://www.youtube.com/watch?v=ZFXrs2-s_YI)
- **Post-Grain-Delay brightness tamer in a parallel wet/dry rack** — running Auto Filter right after [[Grain Delay]] rolls off the harsh top end granular processing adds; group both into an Audio Effect Rack split into a wet chain (Grain Delay → Auto Filter) and a dry chain (untouched original) so the source's natural top end survives underneath the granular texture. → [[Grain Delay]] — You Suck at Producing, [Making Sounds Dreamy with Ableton's Grain Delay](https://www.youtube.com/watch?v=Noouom1jrSY)
- **Band-pass macro mid-chain in a resample-and-refine dubstep-bass loop** — after the initial FM/oscillator sound design on a bass patch, add an Auto Filter in **band-pass** mode, map it to a macro (alongside a **Scale** macro), then resample onto an audio track while continuing to modulate/layer texture — repeating the whole cycle until the sound lands. The same loop applies just as well on [[Wavetable]], Vital, or Serum — it's a synth-agnostic sound-design habit, not device-specific. → [[Operator]], [[Wavetable]], [[Randomized Rack Design]] — dnksaus, [Make HEAVY Dubstep Basses with Operator](https://www.youtube.com/watch?v=PFmBcZujMwk)
- **Per-ear LFO phase offset for stereo filter drift** — instead of one filter frequency moving identically across the stereo field, set the built-in LFO with a slight **phase offset between right and left**, so each ear's cutoff drifts slightly differently over time — a cheap way to widen an otherwise-mono texture layer. → [[Width and Stereo]] — dnksaus, [Auto Transpose Trick - Live 12.3](https://www.youtube.com/watch?v=aUvQ8Bvv3lY)
- **Band-pass + slow LFO as a texture-layer filter** — set the filter type to band-pass and run the built-in LFO at a slow, free rate for a gentle drifting tonal window on an atmospheric/pad layer, rather than a rhythmic sweep. — dnksaus, [generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg)

## See also

- Effects: [[EQ]]
- Techniques: [[Width and Stereo]] · [[Randomized Rack Design]]
- Palette: [[Sound Palette]]
