---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=Qf_x97bfxQk
channel: Anthony Marinelli Music
duration: "00:10:17"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, oscillators]
---

# How I Programmed the Theremin Sound On Michael Jackson's Thriller

![](https://www.youtube.com/watch?v=Qf_x97bfxQk)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Qf_x97bfxQk)

## Synopsis

The spooky theremin-style synth from Thriller's outro (under Vincent Price's rap), with real production history (the song began life as a disco track called "Starlight," the theremin/Vincent Price idea was spontaneous and improvised during the session). The patch itself is deliberately simple — one audio oscillator, one LFO — but includes a genuinely useful oscillator-substitution trick and a debugging method framed around the same 4-parameter listening model used elsewhere on this channel.

## Techniques

- **Use a square wave as a "sine-like" substitute when a period-accurate reference tone (here, a real vintage theremin) wasn't a pure sine either — a square wave's odd-order harmonics decay perceptually fast enough to read close to a sine, while adding a touch of character a literal sine would lack.** Reasoning stated directly: 1980s-era theremins/electronics of the reference era couldn't generate perfect sine waves and had no filtering to clean them up, so a slightly-imperfect square wave (not a clean sine oscillator) is the historically-accurate choice, not just a workaround.
- **LFO waveform shape changes the CHARACTER of pitch modulation, not just its rate — a sine LFO into oscillator pitch gives a smooth "slurping"/glissando slide (the theremin's hand-controlled glide), while a square LFO on the same routing gives a "trill" that alternates cleanly between two discrete pitches.** Same "LFO shape matters, not just LFO speed" principle already logged elsewhere on this channel, here demonstrated as a direct A/B on the same patch.
- **Systematic signal-flow debugging: when no sound comes out, trace the patch backward one connection at a time (rather than re-checking everything at once) to isolate a bad cable/wrong jack** — demonstrated live when a patch cord failure interrupted the recording; framed as the same discipline as [[Synth Patching and Editing Method]]'s panel-reading approach, applied to troubleshooting instead of initial patching. The 4-parameter framework (pitch, timbre, duration, amplitude) doubles as this troubleshooting checklist — confirm each stage is doing its job in that order.
- **A historical/creative-process note, not a technique but worth keeping**: the Vincent Price cameo and theremin idea were entirely spontaneous, decided and executed within the same session via a personal phone call — framed as a reminder to act on a good spontaneous idea in the moment rather than defer it.

## Routed to

- [[Oscillators and Waveforms]] — new bullet on using a square wave as a characterful sine substitute.
- [[Synth Patching and Editing Method]] — new bullet on backward signal-tracing as a debugging technique, using the 4-parameter framework as a troubleshooting checklist.
- [[LFOs and Modulation]] — cross-linked for the sine-vs-square LFO pitch-modulation character contrast.

## Source

- [How I Programmed the Theremin Sound On Michael Jackson's Thriller](https://www.youtube.com/watch?v=Qf_x97bfxQk) — Anthony Marinelli Music, 10:17. Captions, high confidence.
