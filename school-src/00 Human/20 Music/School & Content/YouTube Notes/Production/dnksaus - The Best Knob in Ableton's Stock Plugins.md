---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=dcP02dHWgu4
channel: dnksaus
duration: "00:11:19"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, sound-design, synths, workflow]
briefed: 2026-W31
---

# dnksaus - The Best Knob in Ableton's Stock Plugins

![](https://www.youtube.com/watch?v=dcP02dHWgu4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=dcP02dHWgu4)

## Synopsis

A focused case for **Global Time** — a single knob present on several Ableton stock devices ([[Wavetable]], [[Sampler]], [[Operator]], [[Envelope MIDI]]) and on [[Serum 2]] (split into separate envelope/LFO versions there) — that scales *every* envelope stage (attack/decay/release) and LFO rate in the instrument at once. dnksaus walks through building an intro-to-drop tension riser purely by automating Global Time, a "poor man's LFO" trick (looping an envelope with sustain/release zeroed so it free-runs like an LFO, then using Global Time to control its rhythm), a hi-hat "shuffle" via Sampler's own Global Time knob, and Envelope MIDI's Echo mode for a decaying, delay-like modulation envelope. Along the way: a vocal-chop workflow (OTT as sound design not mixing, MPE-tab pitch-shifting of individual chop slices, globally scaling automation via the curve's pin markers), a personal Volume Macro utility convention, and a vinyl-intro recipe (Stray-shape LFO on a zeroed-out delay's Time, in pitch mode). Also name-drops two of the creator's own in-progress free Max for Live devices — "Chord Sauce" (a scale-aware chord/arp generator, beta) and "Randomizer"/"Multi-Shaper" (keymapped device randomization).

## Techniques

- **Global Time = one knob scaling every envelope + LFO rate in the instrument** — present on [[Wavetable]], [[Sampler]], [[Operator]], and [[Envelope MIDI]] (Ableton stock devices) and on [[Serum 2]] (split into a separate envelope-only knob and LFO-only knob there). Turning it up elongates every envelope stage (pluck → pad character); turning it down shortens everything (pad → pluck). The single fastest way to morph a patch's whole time-feel without touching each envelope/LFO individually. → [[Wavetable]], [[Sampler]], [[Operator]], [[Envelope MIDI]], [[Serum 2]]
- **Automate Global Time for a tension riser into a drop** — start Global Time at 0, automate a rise to 100 over ~16+ bars on a chord/pad patch: every envelope and LFO in the patch slows/stretches together as the automation climbs, reading as a single unified "everything is winding up" build rather than several separately-automated parameters. At the drop, snap Sustain and Global Time back down together for the release of tension. → [[Automation]]
- **Loop an envelope into a free-running LFO ("poor man's LFO")** — set an envelope's Sustain and Release both to 0, then change its Loop dropdown from **None to Loop** — the envelope now free-runs as a repeating cycle instead of firing once per note, effectively turning an envelope generator into an LFO (or, read the other way, giving an LFO an envelope's per-stage shape control). Global Time then scales the *rhythm* of that loop into musical exponential patterns. A per-note "juggling" variant exists on the MIDI/key-track tab — a negative amount makes lower notes (bass) loop/sustain longer than higher notes. Not used in the final track shown, but demonstrated as a standalone technique. → [[Wavetable]]
- **Sampler's Global Time for a rhythmic hi-hat shuffle** — on a hi-hat patch, map Sampler's own Global Time (via a macro) and automate it — since Global Time also scales Attack, a moving Global Time value produces a shifting hi-hat "shuffle" feel purely from envelope-timing changes, no separate groove/humanize tool needed. → [[Sampler]]
- **Envelope MIDI's Echo mode as a decaying modulation delay** — Envelope MIDI defaults to **Free** mode; switching to **Echo** mode with Sustain down makes the mapped modulation behave like a decaying delay/echo on whatever parameter it's driving, rather than a straight one-shot envelope. Combine with modulating Global Time for further movement. → [[Envelope MIDI]]
- **OTT as a sound-design tool, not a mixing tool — on a vocal chop** — [[Hybrid Reverb]] into OTT *after* it, deliberately reaching for OTT's extreme multiband up/down character as creative sound design on a chopped vocal phrase rather than as glue/mix compression — reinforces the existing framing on the OTT plugin note from a new source. → [[OTT]]
- **Build a reusable Volume Macro utility** — a Utility device with Gain mapped to a macro, **capped at 0 dB instead of the default +36 dB** (so the macro can only attenuate, never blow up gain-staging by accident), plus a separate mute-style knob — a small convention worth building once and reusing across racks. → [[Randomized Rack Design]]
- **Globally scale automation via the curve's pin markers** — select an entire automation lane and drag the small "pin" markers at the edges of the selection up/down to rescale the whole curve's range at once (and slope them for a tilt), instead of redrawing or multiplying every breakpoint individually. → [[Automation]]
- **MPE tab to pitch-shift individual vocal-chop slices** — when building a vocal-chop slice melody, use the MPE tab to nudge an individual slice's pitch up/down by semitones so it fits the target melody, without re-slicing or re-warping the sample.
- **Vinyl-intro recipe** — on a delay/echo device: Time all the way down, Feedback all the way down, Dry/Wet all the way up, then an [[LFO]] on its **Stray** shape (curved random) mapped to Time with the delay in a pitch/Repitch-reacting mode — produces a wobbly vinyl-style pitch warble; layer a vinyl-noise texture on top for the full effect. → [[LFO]], [[Echo]]

## Routed to

- [[Wavetable]], [[Sampler]], [[Operator]], [[Envelope MIDI]], [[Serum 2]] — each gets a new/extended `## Techniques` bullet on the Global Time knob (instrument-specific nuance per note)
- [[Automation]] — `## From videos` bullets: Global Time riser-into-drop + pin-marker global automation scaling
- [[OTT]] — `## Techniques` bullet: "sound design not mixing" framing on a vocal chop (new source, not a duplicate of existing bullets)
- [[LFO]] — no new edit this pass (the Stray-shape vinyl-warble technique was already added to LFO.md from this same video during the Echo/Delay video's routing pass, since both videos cover it)
- [[Randomized Rack Design]] — Volume Macro utility convention reinforced/cross-linked (already present from earlier videos in this batch; not duplicated)
- [[Plugin Wishlist]] — two entries added under "From videos (to vet)": Chord Sauce (dnksaus, beta chord/arp generator) and Randomizer/Multi-Shaper (dnksaus, free keymapped device-randomizer M4L tools)

## Source

[the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4) · dnksaus · 11:19 · captions (high confidence) · transcript: [[dnksaus - The Best Knob in Ableton's Stock Plugins (transcript)]]
