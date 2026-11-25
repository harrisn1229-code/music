---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=MuD_Rq04tic
channel: dnksaus
duration: "00:03:09"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: medium — clean opening but the pace is very fast for a 3-minute video and auto-captions garble several device/parameter names badly toward the end (e.g. "elephant waveform" for a Sample & Hold LFO, and the closing "Purify"/"Electrify" pair could not be confidently identified); the core synthesis chain and its ordering are clear
tags: [yt-note, music, production, ableton, drums, sound-design]
briefed: 2026-W31
---

# dnksaus - How to Metallic Snares like SOPHIE

![](https://www.youtube.com/watch?v=MuD_Rq04tic)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=MuD_Rq04tic)

## Synopsis

A fast, dense 3-minute build of a SOPHIE-style metallic snare, entirely from stock devices. It starts with the same Operator fixed-frequency body already documented in [[Snare Design]] (200 Hz, one voice, Retrigger on, pitch-envelope click) but adds a new refinement — drawing extra harmonics onto the oscillator with **Repeat** set to 1 for a brighter body, the same drawn-harmonics trick already on [[Operator]]'s page applied specifically to a snare. The metallic character itself comes from stacking two delay-family devices in series on the transient/noise layer — [[Phaser-Flanger]] used as a self-modulating auto-flange (envelope follower + Sample & Hold LFO + a small L/R phase offset) followed by [[Grain Delay]] maxed on Feedback with Spray on — then [[Drum Bus]] tames the resulting bright, ringing tail back into something drum-shaped (Transients pulled fully down, Crunch driven, Damping maxed). The closing minute piles on optional extra color (a resonator pass, then an unowned Pitch Map + Envelope Follower pass forcing the metallic hit into a chosen key) framed as a joke ("how to disappoint your grandma") rather than a load-bearing step. The channel's own one-line thesis, worth keeping verbatim: **"if you want to make anything metal, just use delays — a flanger and a Grain Delay are both forms of delay."**

## Techniques

- **200 Hz fixed-frequency Operator body + drawn-harmonic brightening (Repeat = 1)** — the same snare-body starter documented on [[Snare Design]] (fixed frequency ~160–250 Hz, Sustain down, one voice, Retrigger on, pitch-envelope "click"), with a concrete number confirmed here (200 Hz) and a new refinement: draw extra harmonic bars directly onto the oscillator's waveform display and set **Repeat to 1**, which reads as a noticeably brighter body than the plain fixed-frequency sine — the same technique already documented generically on [[Operator]]'s page, applied here specifically to a snare body rather than a lead/bass. Drop the filter cutoff afterward "to whatever sounds cool," then add a second, looped noise oscillator turned fully up for the transient/tail layer. → [[Operator]], [[Snare Design]]
- **Phaser-Flanger as a self-modulating auto-flange on the snare's transient layer** — push the oscillating frequency up into flange range, **Feedback maxed**, and drive the device from its own **envelope follower** with a quick attack and a short (~0.5) release for a very short, snappy modulation response; set the **LFO waveform to Sample & Hold** for stepped/glitchy movement, **Phase ≈ 14** so the left and right channels run at a slightly different modulation time (a metallic stereo-smear rather than true width), **Warmth** pushed all the way up, and let some of the dry snare bleed through underneath. A second, slower LFO (LFO 2) runs at a low rate alongside it. A concrete new setting for the "envelope-follower-driven auto-modulation" technique already on [[Phaser-Flanger]]'s page (previously documented from a delay-sound-design video) — this is the same self-modulating mechanism, tuned specifically for metallic-snare duty. → [[Phaser-Flanger]], [[Snare Design]]
- **Grain Delay: Feedback maxed + a short delay time + Spray, in series after the Phaser-Flanger** — the same short-time/Spray metallic-Grain-Delay technique already on [[Grain Delay]] and [[Snare Design]], with one new concrete detail: Feedback pushed all the way up (rather than just "turned up") for maximum grain-repeat density before Drum Bus tames it. Chaining Phaser-Flanger *into* Grain Delay (rather than either alone) compounds two different delay-family metallic characters into one hit — the video's closing thesis is literally that "flanger and Grain Delay are both forms of delay," and stacking delay-family devices is the whole metallic-snare recipe. → [[Grain Delay]], [[Phaser-Flanger]], [[Snare Design]]
- **Drum Bus tames a bright metallic tail: Transients fully down + Crunch driven + Damping maxed** — right after the Phaser-Flanger → Grain Delay metallic stack, [[Drum Bus]] pulls the ringing, bright result back into a drum-shaped hit: **Transients** pulled all the way negative (shortens/softens the attack rather than emphasizing it — the opposite direction from Drum Bus's usual punch-up use), **Crunch** (drive) pushed up for extra grit, and **Damping** set all the way up to roll off the harsh top end the metallic processing just added. A concrete new combination beyond Drum Bus's existing documented Transient/Damp bullets. → [[Drum Bus]], [[Snare Design]]
- **Resample while still tweaking, then optional extra color: a compressed room reverb and/or a resonator "color snare" pass** — start recording/resampling the metallic hit and keep adjusting settings while it captures, then optionally layer a compressed-room-style reverb afterward, and/or an unspecified resonator device (garbled in the audio — likely [[Corpus]], the vault's stock physical-modeling resonator already used as a snare texture layer, though the exact device name wasn't clearly identifiable) tuned toward a tonal "color snare" character. Low confidence on the resonator's identity specifically; the resample-while-tweaking workflow and the reverb layering are clear. → [[Snare Design]], [[Corpus]]
- **An unowned key-forcing pass as a joke-framed "extra" step: Pitch Map + Envelope Follower** — described as "how to disappoint your grandma even more": route the finished metallic snare through the unowned **Zynaptiq Pitch Map** (already wishlisted from a color-bass sound-design video) alongside an Envelope Follower, set Pitch Map to force the hit into a chosen key, and map two further Pitch Map parameters — heard as "Purify" and "Electrify," but the audio is too garbled here to transcribe those names with confidence. A second independent use-case for Pitch Map beyond its prior color-bass mention. → [[Plugin Wishlist]]
- **The channel's one-line thesis: "just use delays" — flanger and Grain Delay are both forms of delay** — the explicit, stated generalization behind this whole video and the earlier Craft UNIQUE Snares metallic-Grain-Delay bullet: metallic/robotic character on nearly anything comes from stacking short, modulated delay-family devices (chorus/flanger, grain/granular delay, frequency-shift delay) rather than from EQ or distortion. → [[Snare Design]], [[Grain Delay]], [[Phaser-Flanger]]

## Routed to

- [[Snare Design]] — new `## From videos` bullet: the full SOPHIE-style metallic build order (body → noise tail → Phaser-Flanger → Grain Delay → Drum Bus → optional color/key pass), extending rather than forking the existing metallic-snare content
- [[Grain Delay]] — new `## Techniques` bullet: Feedback maxed as the concrete addition to the existing short-time/Spray metallic recipe
- [[Phaser-Flanger]] — new `## Techniques` bullet: the snare-specific self-modulating auto-flange settings (Feedback maxed, quick attack/0.5 release envelope follower, S&H LFO, Phase ≈14, Warmth maxed)
- [[Drum Bus]] — new `## Techniques` bullet: Transients-down + Crunch-up + Damping-maxed combo for taming a metallic tail
- [[Operator]] — cross-linked from the drawn-harmonics/Repeat=1 bullet (no edit needed; the generic technique already documented there is simply confirmed in a new, snare-specific context)
- [[Corpus]] — cross-linked from the low-confidence "resonator" pass (no edit made — too uncertain to add as a sourced technique bullet)
- [[Plugin Wishlist]] — extended the existing Zynaptiq Pitch Map entry with this second, snare-specific use case

## Source

[How to Metallic Snares like SOPHIE](https://www.youtube.com/watch?v=MuD_Rq04tic) · dnksaus · 3:09 · captions (medium confidence — fast pacing, some garbled device/parameter names) · transcript: [[dnksaus - How to Metallic Snares like SOPHIE (transcript)]]
