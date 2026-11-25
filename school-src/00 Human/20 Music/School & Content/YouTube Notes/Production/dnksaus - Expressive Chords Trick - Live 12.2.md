---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=lEUkcbhdDqo
channel: dnksaus
duration: "00:08:09"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, chords, midi, generative]
briefed: 2026-W31
---

# dnksaus - Expressive Chords Trick - Live 12.2

![](https://www.youtube.com/watch?v=lEUkcbhdDqo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=lEUkcbhdDqo)

## Synopsis

A tour of Live 12.2's "Expressive Chords" branding for Ableton's stock chord device — the same [[Chord]] device already documented in the vault, here shown with its Live 12.2 additions: Invert/Reverse/Quantize articulation controls and, most importantly, the **Import Chords from Clip** button, which lifts an entire chord progression straight out of any MIDI clip for rhythmic replay. dnksaus pairs this with Ableton's stock audio-to-MIDI **Convert Harmony** feature to pull a progression out of a found Splice melodic loop (~80–90% accurate), cleans up stray notes with **Fit to Scale**, then reimports the cleaned progression. The back half builds a generative intro layer on **Drift** (LFO in Wander mode for pitch drift, Key modulating the LFO's Rate so every note wanders differently) plus Expression Control/Random Generator randomization and an Arpeggiator in Play Order mode, closing with two workflow habits: Option-drag exponential automation curves for a reverb wash-in (with Size automation as a repitching effect), and recording a generative rack's randomized MIDI output to a new track to freeze a good take permanently.

## Techniques

- **"Expressive Chords" = the existing Chord device's Live 12.2 update, not a new device** — adds Invert, Reverse, and Quantize articulation controls on top of the previously-documented Learn/Strum/Tension/Crescendo set.
- **Import Chords from Clip — the standout feature** — point the device at any MIDI clip and press the button to pull its entire chord progression in, then replay it in a new rhythm/articulation via Strum/Tension/Crescendo/Invert — useful even without a dedicated MIDI-pack library.
- **Convert Harmony (stock audio-to-MIDI) to extract a progression from a found sample** — drag an audio clip (e.g. a Splice melodic loop) onto a MIDI track and Convert Harmony; roughly 80–90% accurate, not perfect.
- **Set Scale to the sample's actual key first, then Fit to Scale** — cleans up stray, out-of-key notes the harmony conversion sometimes picks up, before the extracted progression is reimported anywhere.
- **Save a preset with its MIDI baked in** — an Expressive Chords preset can store the captured/imported progression alongside its knob settings, so recalling the preset recalls the whole progression.
- **Modulate articulation per note** — velocity or a Random-mode Expression Control/Random Generator onto Strum/Tension/Crescendo/Invert for per-hit humanized variation rather than a fixed repeated strum.
- **Drift's LFO in Wander mode, Key modulating Rate** — Wander mode makes pitch meander rather than cycle on a fixed shape; routing Key (which note is played) to modulate the LFO's Rate means every note wanders at a different speed — more natural than one fixed rate for the whole part.
- **Random Generator's Slope control** — glides from the current random value to the next rather than snapping instantly, softening per-note jumps into something closer to a portamento.
- **Arpeggiator in Play Order mode when a chord device upstream is already randomizing** — avoids the arp's own Style patterning fighting with an already-randomized strum/articulation; Rate/Steps (octave-range limited) and Gate mapped to macros for further variation.
- **Exponential Wet/Decay automation (Option-drag) for a reverb wash-in** — bends a linear automation ramp into an exponential curve so a texture layer blooms in gradually rather than fading mechanically; automating Size while the reverb rings adds a repitching-tail side effect — a fast way to texture a boring intro.
- **Record a generative rack's MIDI to a new track to lock in a keeper** — once a randomized pass (Drift's wandering pitch, Random Generator-driven chord articulation) produces something good, route the MIDI to a new track and record it, freezing that one take into fixed, repeatable MIDI without needing the randomizing devices live in the chain anymore.

## Routed to

- [[Chord]] — new `## Techniques` bullets: Import Chords from Clip, the Convert Harmony + Fit to Scale extraction workflow, per-note articulation modulation, and MIDI-baked presets; "What it is" updated to note the Live 12.2 "Expressive Chords" branding — **extends the existing note rather than duplicating it**, per the deferred-topic plan from an earlier batch
- [[Scale]] — new `## Techniques` bullet: Fit to Scale as a Convert Harmony cleanup step, cross-linked to [[Chord]]
- [[Drift]] — new `## Techniques` section (previously missing): LFO Wander mode + Key-modulated rate for per-note pitch drift
- [[Arpeggiator]] — new `## Techniques` bullet: Play Order mode alongside an already-randomized chord device, octave-limited Rate/Steps + Gate
- [[Automation]] — new `## From videos` bullets: Option-drag exponential reverb-wash curves + Size-as-repitch, and recording a generative take to lock it in
- [[Reverb]] (Ableton plugin note) — new `## Techniques` bullet cross-linking the exponential-wash/Size-repitch trick to [[Automation]]
- [[Randomized Rack Design]] — new bullet: Random Generator's Slope control, plus the record-to-freeze workflow, cross-linked to [[Automation]]
- No new plugin/technique/chain notes this video — everything here extends already-registered notes
- Not added to [[Plugin Wishlist]]: "GMM" (his own multiband compression Max device) and the "44 vinyl sim" rack are bare name-drops with no described settings/technique — skipped per the ignore-pure-name-drops rule
- No chain created/updated: the intro-layer build (Drift + reverb wash + arp) is a generative sound-design pass, not an ordered mix-processing chain — its reusable pieces already live on [[Randomized Rack Design]] and [[Automation]]

## Source

[Expressive Chords Trick - Live 12.2](https://www.youtube.com/watch?v=lEUkcbhdDqo) · dnksaus · 8:09 · captions (high confidence) · transcript: [[dnksaus - Expressive Chords Trick - Live 12.2 (transcript)]]
