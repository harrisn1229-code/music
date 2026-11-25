---
type: technique
title: MPE Piano Roll Tools
tags: [technique, ableton, midi, mpe, workflow]
---

# MPE Piano Roll Tools

Live's piano roll has an **MPE tab** (per-note expression lanes — Pitch Bend, Slide, Pressure) that lets you shape an individual note's pitch/timbre independently even while other notes are sounding at the same time — true polyphonic per-note control, not one shared pitch-bend lane for the whole clip. Live 12.1 added two "mini tools" inside that tab that *generate* per-note MPE data automatically instead of hand-drawing every note's curve: **Glissando** (auto pitch-glide between chord voicings) and the **MPE LFO** (an auto-generating per-note modulator). Companion to [[Expression Control]] (the Max for Live device that does per-note *randomization* on mapped Ableton parameters more generally) and [[Ableton Extensions and MIDI Tools]] (the broader productivity-shortcut family).

## Glissando — auto pitch-glide between chord voicings
- **Connects matching notes across a chord progression** — e.g. the top note of each chord automatically pitch-glides into the top note of the next chord. If the chord voicings have different note counts from one chord to the next, Glissando shows which note in the next chord each current note connects to.
- **Timing and slope are both adjustable** — control when the glide starts relative to the chord change and how curved (vs. linear) the glide is.
- **Use for voice-leading tension between chords** — a fast way to add glide/tension into a chord progression's top line without manually drawing pitch-bend on every note. → [[Chord]]

## MPE LFO — auto-generating per-note modulation
- **A per-note LFO with a fade-in/out envelope** — Attack/Decay-style knobs fade the LFO's depth in and out over the note's length, rather than running at constant depth from note-on.
- **Standard shapes plus Random** — sine, square, and triangle are available, but the **Random** wave (his favorite) gives notes a noisy, unstable character; slower rates read as a distinct wobble/character rather than a clean vibrato.
- **The MP dropdown re-targets the LFO to Slide or Pressure, not just Pitch Bend** — the same auto-generating LFO can drive whichever MPE lane is selected.
- **MPE controllers (e.g. Push) drive Slide/Pressure per note** — sliding a finger up/down on a pad drives **Slide**; pushing harder drives **Pressure** — independently per note, on hardware that supports it.
- **Map Slide/Pressure to timbre on the instrument itself** — on [[Wavetable]]'s own MP tab, map Slide to **Wave Position** and Pressure to **Filter Frequency** (for example), so per-note MPE data reshapes the *timbre*, not just pitch.
- **Random-seed auto-generation per note** — pressing the MPE LFO's Random button auto-generates independent Slide/Pressure automation for every note in the clip at once, each starting from a different random seed, so every note gets its own distinct wave-position/filter-frequency movement without drawing a single curve by hand.
- **Push the pitch-bend amount to an extreme range (up to ~96 semitones) for a glitch effect** — far beyond a musical bend, this reads as a deliberately broken/glitchy pitch effect rather than expressive pitch movement.
- **Freeze + flatten to commit, then reprocess** — once a generated result is good, freeze/flatten the clip and drop the result into [[Simpler]] to build a new patch (e.g. a bass) out of the frozen chaos, rather than leaving the generative MPE data live indefinitely.

## See also

- Plugins: [[Wavetable]] · [[Simpler]] · [[Chord]] · [[Expression Control]]
- Techniques: [[Ableton Extensions and MIDI Tools]] · [[Randomized Rack Design]]

## From videos

- **"Pressure glide" — portamento triggered by relative finger pressure between two notes, not a wheel or a switch — plus dual sustenuto pedals for layered textures.** Set a minimum interval threshold; any two notes played at or below that interval automatically glide between each other based on the relative pressure difference the player applies, reading as natural phrasing rather than a triggered effect. Separately: instead of one continuous (0–127) sustain pedal, running TWO independent sustenuto pedals lets each capture whatever notes are held when it engages while the keyboard stays free for new, unpedaled notes on top — a held pad plus fresh runs at once, which a single sustain pedal can't produce. → Anthony Marinelli Music (feat. Josh Mattoff), [[Osmose - Ultimate Synth Expression]]
- **MPE controlling real analog hardware, not a software instrument** — a Haken Continuum and an Osmose driving four ARP 2600s and a Moog Modular 3C directly via a CV converter, one per-note MIDI channel per voice. Full patch template (the W/X/Y/Z signal scheme, the voltage-threshold soft-attack trick, CV-gate declicking via a lag processor, and the "different physical unit per chord note" ensemble effect) documented on its own page. → [[Expressive Controllers and CV Conversion]] — Anthony Marinelli Music (feat. Josh Mattoff), [[The future of EXPRESSIVE analog synths is HERE]]
- **Glissando (chord-to-chord pitch glide) and the MPE LFO (auto-generating per-note modulation) — Live 12.1's new piano-roll MPE mini-tools** — full mechanics documented above: connecting matching notes across a progression, the fade envelope + Random shape, retargeting to Slide/Pressure, Wavetable's MP-tab timbre mapping, per-note random-seed auto-generation, and the extreme-range glitch trick. → [[Wavetable]] — dnksaus, [This Device Automates Each Note Separately - Live 12.1](https://www.youtube.com/watch?v=bf8Ia7ALpu8)
