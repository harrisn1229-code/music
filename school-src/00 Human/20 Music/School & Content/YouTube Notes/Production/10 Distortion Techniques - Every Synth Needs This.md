---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=yKAyvcTmw3A
channel: Anthony Marinelli Music
duration: "00:37:37"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, distortion, saturation]
briefed: backlog
---

# 10 Distortion Techniques: Every Synth Needs This

![](https://www.youtube.com/watch?v=yKAyvcTmw3A)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=yKAyvcTmw3A)

## Synopsis

A hands-on, technique-dense survey of adding drive/distortion to synths — starting with two at-the-instrument tricks (no outboard gear needed) on a Minimoog and an ARP 2600, a genuinely novel LFO-distortion technique for sculpting custom modulation shapes, then a full pedal/amp/plugin shootout (Moogerfooger MF-104M, Boss HM-2, Boss FZ-2 Hyper Fuzz, Mu-Tron III, a Fender Showman amp, a $40 Joyo pedal, and an Arturia plugin emulation) run through the same test patch, closing with a real finding about where a plugin's drive circuit was actually failing to replicate its hardware source.

## Techniques

- **Minimoog self-feedback**: patch the synth's own high output back into its own External Input Volume mixer channel — instrument-level harmonic feedback distortion, no outboard gear. There's a genuine "sweet spot": too hot and the pitch itself destabilizes as the input overloads; dialed correctly, playable pitches with rich added harmonic distortion.
- **ARP 2600 internal preamp reroute**: patch VCF output → the 2600's built-in (normally-bypassed) preamp → VCA, instead of straight VCF→VCA, for instrument-level distortion. Because input/output are separately patchable, the distorted preamp path and the clean normalled path can run in parallel from the same filter output and be blended rather than committing fully wet.
- **Distorting an LFO before it modulates pitch, to sculpt custom hybrid waveforms**: route a slow triangle-wave LFO through a distortion/preamp stage before it reaches its modulation target. Light distortion keeps it a smooth-ish triangle (subtle vibrato); pushed harder it staircases toward square (reads as a trill rather than smooth vibrato); partial settings land on a genuine hybrid waveform unavailable from either pure shape.
- **Moogerfooger MF-104M** (used purely for its input drive stage, delay bypassed): full range from subtle "quack" to steady-state harmonic distortion to full clipped breakup; filter resonance compounds directly with the drive (resonance is filter feedback, so it interacts with the distortion); engaging the actual delay circuit on top adds a distinct "ripping" combined color.
- **Boss HM-2 Heavy Metal**: sweeping filter resonance through the pedal brings strong harmonic distortion; running the filter's sustain level high makes its Contour stage behave like the initial cutoff control, giving direct hands-on shaping through the distortion.
- **Boss FZ-2 Hyper Fuzz**: two distinct voicings on one pedal — "Fuzz 1" reads closer to a vintage Big Muff, "Fuzz 2" reads brighter, closer to a 1960s transistor-radio breakup.
- **Mu-Tron III**: envelope follower with a gain stage, switchable LP/HP/BP filter type and sweep direction (up/down) — driven hard, a genuinely different-character distortion source than the dedicated drive pedals because filter type/direction shapes which harmonics get emphasized. Historically used to distort a portable organ to compete with guitar players in a band.
- **Fender Showman tube amp**: smoother, more consistently satisfying character than any pedal tested, run direct.
- **Joyo American Sound** (~$40, Fender Deluxe amp-in-a-box): effective "frying the speaker cone" character; onboard bass/mid/treble interacts with drive amount for distinct combinations (heavy highs + heavy drive + reduced lows for aggressive bite, or the inverse for a thicker, less chaotic tone).
- **Arturia MF-104S plugin vs. the real MF-104M hardware — a real gap found and diagnosed**: the plugin's drive knob lacked the hardware/pedals' characteristic "cliff" transition (clean → sizzle onset → sharp breakup → escalating harmonics → buzz-saw), instead just reading as "getting brighter." Root cause found by ear: the plugin's drive barely affected the dry input at all, but distorted the delay/effect signal heavily once wet mix was raised — the emulation's drive sits on the effect return path, not the input stage, unlike the hardware. Practical takeaway: verify by ear which signal stage a plugin's drive control actually affects before assuming it replicates known hardware behavior.

## Routed to

- [[Saturation and Distortion]] — 4 new `## From videos` bullets: the two at-the-instrument techniques, the LFO-distortion technique, the full pedal/amp shootout, and the plugin-vs-hardware diagnostic finding.
- [[Voice Architecture]], [[Modulation]] — cross-referenced for the LFO-distortion technique.
- [[Vintage Gear Worklist]] — added this video as a source on the existing Mu-Tron III entry.

## Source

- [10 Distortion Techniques: Every Synth Needs This](https://www.youtube.com/watch?v=yKAyvcTmw3A) — Anthony Marinelli Music, 37:37. Captions, high confidence.
