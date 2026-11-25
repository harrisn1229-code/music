---
type: chain
title: Arca Piano
reference: Arca (sound-design study, not a specific released track), asd (YouTube breakdown channel)
chain_type: style
family: keys-synths
routing: Upright Piano (Instrument Rack) → [[2 Inst-Synth Group|Inst-Synth Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → Master
signal_chain: [Upright Piano, Reverb, Glue Compressor, Chorus-Ensemble (pitch drift), Chorus-Ensemble (classic/HP), Auto Filter + Expression Control, Multiband Dynamics]
status: video-derived
tags: [chain, keys, style, arca, sound-design, experimental]
---

# Arca Piano

**Reference/vibe:** the distressed, granular-feeling piano texture found across Arca's work — not a clean acoustic-piano chain like [[1 Acoustic Piano Track|Acoustic Piano Track]], but a deliberately degraded, constantly-moving sound-design patch built as an Instrument Rack with macros. The through-line is **stacking several independent LFO/envelope-driven movements at once** (pitch drift, chorus feedback, filter cutoff, brightness) rather than any single dramatic effect — that stacking habit is the actual "Arca sound," more than any one device setting.

**Signal source:** built entirely from Ableton stock devices (Upright Piano instrument, Glue Compressor, Chorus-Ensemble ×2, Auto Filter, Expression Control, Multiband Dynamics) — nothing here needs an unowned plugin, see [[Plugin Wishlist]] (nothing added from this video).

## Chain (signal order, top to bottom)

### 1. Upright Piano — instrument
Ableton's stock upright piano instrument as the seed sound, dropped into an Instrument Rack. First macro, named **"Intimate,"** initialized here (its own target/range wasn't specified in the source — treat as a placeholder macro to wire up later, e.g. to velocity response or mic-position character).

### 2. [[Reverb]] (Ableton) — spacious, placed BEFORE the compressor
🎬 *From video:* a spacious reverb send/insert, deliberately placed **ahead of** the Glue Compressor in the chain rather than after it (see stage 3's *Why*) — a macro maps the reverb's **Dry/Wet** for to-taste adjustment.

### 3. [[Glue Compressor]] — flatten, don't glue
🎬 *From video:* **Threshold pulled all the way down + Makeup gain cranked up** — the opposite of the gentle 1–3 dB bus-glue setting this device normally runs (compare [[Glue Compressor]]'s "Used in my chains" section). Flattening the dynamic range this hard accentuates the piano's mechanical pedal/hammer noise, giving the sound a **stuffy, congested quality** — the compression itself becomes a texture generator, not a leveling tool.
- **Why reverb sits before it, not after:** because the compressor is driven this hard, it constantly "resets" between hits — and every reset **pushes the reverb's wet signal to the forefront** once the loud dry transient is clamped down. Bypassing the compressor to A/B makes this obvious: with it engaged, the reverb tail seems to **float free of the dry source**, reading as a mirage/apparition of the original piano rather than a normal room tail sitting under it. A concrete, non-mastering-context example of the same "compression exposes a quiet reverb tail" mechanism [[Reverb]] and [[Compression]] already document for mastering — here it's used deliberately as a sound-design effect, not something to avoid. → [[Reverb]], [[Compression]], [[Depth and Space]]

### 4. [[Chorus-Ensemble]] — instance 1, pitch drift
🎬 *From video:* set to what the source calls **"VA mode"** (the transcript's exact wording — the device's real mode options are Chorus/Ensemble/Vibrato per this note's own Key Parameters table, and the described behavior — pure pitch movement rather than delay-time chorusing — matches **Vibrato mode** most closely; flagged as a transcription-garble, not a confirmed mode name), slow LFO **Rate**, for subtle **pitch drift**. **Amount** mapped to a macro to dial the depth of pitch modulation to taste.

### 5. [[Chorus-Ensemble]] — instance 2, Classic mode
🎬 *From video:* a second, separate instance kept in **Classic** mode, **Dry/Wet at 100% (fully wet)**, **high-pass filter engaged** on the wet path so the signal's low end stays tight and undisturbed by the chorusing, slow LFO **Rate** again, but **Chorusing Amount maximized** this time (opposite of instance 1's subtle depth). **Feedback** mapped to a new macro to push the effect's intensity further. Meticulous, stacked chorus use like this (two instances, two different jobs) is called out as another Arca staple.

### 6. [[Auto Filter]] + [[Expression Control]] — velocity-linked cutoff
🎬 *From video:* [[Expression Control]] (MIDI effect) links **incoming MIDI note velocity to the Auto Filter's cutoff frequency** — higher-velocity notes open the filter, lower-velocity notes close it, so filter brightness tracks how hard each note is played. Two more macros: one for the filter's **minimum cutoff frequency**, one for the **glide time between cutoff values** via Auto Filter's **Rise and Fall** parameters (how quickly the filter slides to its new velocity-driven target rather than snapping).

### 7. [[Multiband Dynamics]] — brightness/final stage
🎬 *From video:* start from the stock **multiband compression preset**, then raise the **output level of each band** for a brighter overall tone, and shorten the **Time Scaling** parameter so all bands' attack/release envelopes are faster — squashing and brightening the signal further. **Amount** mapped to the rack's final macro slot as an overall **brightness control** for the whole patch.

## Macro rack summary

| Macro | Target | Job |
|---|---|---|
| Intimate | (unspecified in source) | placeholder — initialized first, target not detailed |
| Pitch Drift Amount | Chorus-Ensemble #1 Amount | pitch-drift depth |
| Chorus Feedback | Chorus-Ensemble #2 Feedback | chorus intensity |
| Filter Min Cutoff | Auto Filter cutoff floor | how closed the filter gets at low velocity |
| Filter Glide | Auto Filter Rise/Fall | how fast cutoff slides to its velocity target |
| Reverb Mix | Reverb Dry/Wet | space amount |
| Brightness | Multiband Dynamics Amount | overall top-end/squash |

## Arrangement

**Where it sits:** **MIDS + TEXTURE** at once — it's a degraded, constantly-moving sound-design patch, not a piano part. Treat it as a texture occupant when you decide what else can play.

**When it plays:** the macros are the arrangement. Because the rack is macro-driven, a section changes by moving one knob across it rather than by muting or adding parts — closest in kind to [[Psych-Pop (Tame Impala)]]'s global-effect-pass method.

**Watch the flattened dynamics.** Threshold down, makeup up (see the chain above) means this thing has no natural swells to shape a section with. Any dynamic contrast has to be written into the macro automation deliberately.

## Variations

- **Any acoustic/EP source, not just piano** — the reusable idea is the rack shape (compressor-driven texture → stacked chorus movement → velocity-linked filter → reverb-before-compressor mirage → multiband brightness), not the specific Upright Piano patch. Try it on [[1 Electric Piano Track|Electric Piano Track]] or a Rhodes/EP source for a similar "haunted" character.
- **Dial back for a usable mix element** — as built, this is an extreme sound-design patch (heavily flattened dynamics, maxed chorus). For something mix-ready, start from lighter Glue Compressor settings and a single chorus instance before adding the reverb-before-comp trick.

## Notes

- Not a recreation of a specific released Arca track — the source frames this as a general study of Arca's sound-design habits (stacked LFO/envelope movement as a "world-building tool"), with an explicit caution at the end against copying an artist's whole identity rather than learning from technique. That caution is captured on the video page, not repeated here.
- All-stock-plugin build — nothing to add to [[Plugin Wishlist]] from this video.

**Sources:** asd, [ableton sound design | DECONSTRUCTION STUDY [ver. 1] Arca Inspired Piano](https://www.youtube.com/watch?v=equNWJvGVio) — video-derived, 2026-08-11.
