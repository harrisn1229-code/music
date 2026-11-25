---
type: plugin
title: "Utility"
category: Utility
vendor: "Ableton"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Utility

![[Images/Utility.jpg]]

**Category:** Utility
**Vendor:** Ableton

## What it is

Ableton's stock gain-staging and stereo-management device — width control, mono-below-frequency, phase invert, and DC offset removal in one simple utility.

## What it's used for

Gain staging before/after other devices, correcting stereo width or phase issues, and mono-ing low end on bass and kick tracks.

## FX chain notes

Commonly the first device on a channel (gain trim) and/or the last device before a bus (width/phase correction) — essentially a mix-hygiene tool, not a creative effect.

## Techniques

- **Manual breath removal as the FIRST device in a lead vocal chain — a deliberate alternative to a dedicated breath-removal plugin, carried over from a different DAW's workflow.** Illangelo (The Weeknd): "I have a Utility plug-in here and I'm doing this to get rid of this breath that I heard here... I used to manually get rid of all the breaths by hand. On Cubase, it's actually quite easy to do that using some hotkeys. I find it better than using plug-ins to remove breaths. But since switching over to Ableton, I've had to adapt a lot of my workflow." Reach for Utility's Gain automated down over one specific breath rather than a broadband breath-detection plugin when precision matters more than speed. Also used a second time, later in his chain, feeding directly into a dedicated "Air band" EQ ([[Fresh Air]]-adjacent — see [[The Weeknd Vocal Chain]]). → [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]], [[Vocal Comping and Takes]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]
- **On a multi-mic drum kit, interrogate every mic pairing's polarity independently with Phz-L/Phz-R — there's no single "correct" polarity, only what sums fullest for that pairing.** Rack tom vs. floor tom sometimes sums better opposite-phase, sometimes coherent; overheads vs. front/room mic (looking at the kit from opposite directions) often benefits from flipping the overheads relative to the front mic; stereo pair vs. close mics is a separate relationship again, and flipping just the stereo mic can read distinctly better on its own. Audition each pairing fresh per session rather than applying a fixed rule — "there's no hard and fast rule, but polarity matters within the relationship of the different microphones to each other." Distinct from *absolute* polarity (kick-toward-listener vs. away), which the same source is skeptical actually matters — see [[Phase Alignment]] for that half of the argument. → [[Phase Alignment]] — Steve Albini, [Optimizing phase relationships with Steve Albini](https://www.youtube.com/watch?v=DvvLr-Op5yc)
- **Use Utility's Gain knob as an insert-stage volume control for a track that already has fader automation drawn on it** — a track's fader gets silently overridden by its own volume automation: moving the fader during a mix pass has no lasting effect, because on playback the automation snaps the level right back to whatever the curve says. Insert Utility ahead of/instead of the fader and use its Gain knob as the track's real volume control instead — it sits underneath the automation in signal terms rather than competing with it, so the drawn curve stays intact while the overall level is still adjustable. Same logic applies to pan automation on a track (edit the automation itself rather than fighting the Pan knob). → [[Gain Staging]], [[Automation]] — Max Konyi, [Creating a Solid First Mix (Specific Process)](https://www.youtube.com/watch?v=dXBNtKHt2r0)
- **Phase-invert as the second half of a free "disperser" bass trick.** Paired with a duplicated, phase-cancelling [[Phaser-Flanger]] pair on a bass (Amount at 0, one chain phase-inverted so the two null each other), adding Utility to one of those two chains and flipping *its* phase-invert switch reintroduces a frequency-dependent delay between the chains — because the inversion happens at a different point in the chain than the phaser cancellation — producing the actual disperser "bubbly/wobbly" low-end texture. See [[Phaser-Flanger]] for the full build. → [[Bass Design]], [[Phase Alignment]] — You Suck at Producing, [Make INSANE Dubstep Basses Just By Drawing!](https://www.youtube.com/watch?v=6tgjeG_6OvQ)
- **Gain past 0 dB as the crudest possible hard-clip distortion** — pushing Utility's Gain knob hot on a sine-based source (an 808) shears the top/bottom of the waveform flat into a square wave, visible on an oscilloscope, with the spectrum analyzer showing new harmonic overtones stacking above the fundamental — the beginner-level entry point to hard clipping, using a gain-staging tool as a distortion device. → [[Clipping and Loudness]], [[Saturation and Distortion]] — You Suck at Producing, [How to use Distortion](https://www.youtube.com/watch?v=EolO6-evB2M)
- **Mono the snare** — "snares are dope mono": Utility width to 0 on snare/clap samples (also fixes samples panned slightly off-center); stereo snares only as a deliberate special — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
- **Mono an AI-extracted acapella to kill separation-artifact "phasiness"** — stem-separation tools (LALAL.AI) tend to dump smearing/artifact noise into the stereo side channel; summing the extracted vocal to mono with Utility noticeably tightens and cleans it before further processing. — Sol State, [How To Take An Acapella From ANY Song (And Remix It)](https://www.youtube.com/watch?v=5pBUt5sHjGU)

## Manual

- 📄 [Live Audio Effect Reference — Utility](https://www.ableton.com/en/manual/live-audio-effect-reference/) (web-only, no per-device PDF — Live 12 manual chapter)

**High-level points:**
- Utility isn't an "effect" in the creative sense — it's the channel-strip functions (gain, pan, mute, polarity, mono-check) Live doesn't otherwise expose as a standalone device.
- Width is the parameter that actually causes surprises: pushed past 100% it doesn't add width so much as emphasize the *difference* signal between L/R, which can introduce phase cancellation on mono playback (phones, clubs, some Bluetooth speakers) if pushed too far.
- Mute exists specifically so you can A/B a track without deleting/disabling the whole chain below it — cheaper undo than disabling the track.
- Phz-L/Phz-R (polarity flip) is the fix for a track that phase-cancels against another mic'd source (DI vs. amp mic, kick-in vs. kick-out) — flip one, listen for the low end to thicken instead of thin out.
- DC removal only matters once something nonlinear (a compressor, saturator, wave-shaper) sits after it in the chain — DC offset itself is inaudible, but it can bias those devices' behavior.
- Channel Mode's "Swap" is a fast way to check if a stereo source was tracked/exported with channels flipped, without touching routing.

### Sources
- [How To Use The Ableton Live UTILITY Audio Effect — OBEDIA](https://obedia.com/how-to-use-the-ableton-live-utility-audio-effect/)

## Used in my chains

Ableton's **stock gain/width/mono utility** — the mono-low and width-check workhorse at the end of low-end chains:

- **[[1 Digital Bass Track|Digital Bass Track]]** — *slot 5, mono low*: Bass Mono (mono below ~120 Hz) so the sub stays centered/phase-solid.
- **[[3 Bass Bus|Bass Bus]]** — *slot 3, mono guarantee*: mono the low end across whichever bass source is active.
- **[[1 Acoustic Piano Track|Acoustic Piano]]** — *slot 4, width check*: mono-check the stereo image / trim width.

## Key Parameters

```visual-key
image: Images/Utility.jpg
coords: Images/Utility.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Width | Mono↔stereo balance: 0% = fully mono, 100% = unaltered, up to 200% = difference-only (extreme, phase-risky) | Narrow a wide sample/pad to ~60–80% before it hits a bus with a mono-checked kick/bass, so summed low end stays solid | — |
| ② | Channel Mode | Isolates/swaps L, R, Stereo, or Swap | "Swap" as a fast phase/channel-order diagnostic on an imported stereo file | — |
| ③ | Phz-L / Phz-R | Flips polarity of the left/right channel independently | Flip one mic's polarity when a multi-mic source (DI + amp, kick in/out) is thinning out from cancellation | — |
| ④ | Gain | ±35 dB input trim | First device on a channel purely for gain-staging before the rest of the chain, so downstream devices see a consistent level | — |
| ⑤ | Panorama | Standard pan-pot, positions the (already width-processed) signal in the stereo field | Last-stage pan after width/mono decisions are locked in, so panning doesn't fight the width setting | — |
| ⑥ | DC | High-pass filters out DC offset / sub-audible content | Ahead of a saturator/compressor that's behaving oddly on a DI'd bass or synth sub — DC bias can throw off nonlinear processing | — |
| ⑦ | Mute | Fully silences the signal through the device | Cheap A/B toggle on a bus without disabling/removing the whole chain | — |
| ⑧ | Bass Mono | Mono-sums everything below the set frequency (120 Hz) | Mono the sub so the low end stays centered and phase-solid — his go-to on bass chains | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]] · [[Clipping and Loudness]] · [[Phase Alignment]]
- Effects: [[Saturation and Distortion]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
