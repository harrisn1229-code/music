---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=6PY_bABtwhg
channel: Anthony Marinelli Music
duration: "00:06:37"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, modular, expression]
---

# My Favorite Eurorack Module

![](https://www.youtube.com/watch?v=6PY_bABtwhg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=6PY_bABtwhg)

## Synopsis

A focused demo of the Intellijel Planar joystick module, used to add real-time expression to synths that lack velocity or aftertouch — X and Y axes independently driving filter brightness and vibrato depth. Includes a genuinely non-obvious fact (a ring modulator functions as a VCA when DC-coupled) and a concrete envelope-shaping detail for getting "bite" on the resulting sound.

## Techniques

- **Two-axis expressive control from one joystick, on a synth with no velocity/aftertouch**: X axis sends CV straight to the filter cutoff for brightness; Y axis sends CV into a ring modulator being used as a VCA, gating a low-frequency sine oscillator to produce vibrato depth. Moving right adds brightness with no vibrato, moving up adds vibrato with no brightness, diagonal movement blends both.
- **Non-obvious fact: a ring modulator is a VCA when DC-coupled** — not commonly known, but functionally reliable.
- **"Bite" on the VCA comes from the envelope's exponential input plus a touch of decay time** — a linear input or zero decay reads noticeably flatter/duller. A short attack/release on the AR envelope prevents pops at the start/end of the gate.
- **A joystick smooths what a manual slider does clunkily** — sweeping a filter cutoff by hand with a slider is audibly steppy/clunky compared to the same sweep via the joystick's continuous motion.
- **Outboard guitar pedals (phase shifter, then flanger) layered on top** for a "talking" quality on the final patched sound — consistent with the pedal technique captured from this channel's other videos.
- **Philosophy note**: most modules in this rig aren't sound generators — the presenter prefers vintage synths for sound generation itself, and uses Eurorack specifically for expression/control modules like this joystick.

## Routed to

- [[Voice Architecture]] — new `## From videos` bullet with the joystick technique, the ring-mod-as-VCA fact, the envelope "bite" detail, and an Ableton translation via two [[Expression Control]] instances mapped to one physical controller axis.

## Source

- [My Favorite Eurorack Module](https://www.youtube.com/watch?v=6PY_bABtwhg) — Anthony Marinelli Music, 6:37. Captions, high confidence.
