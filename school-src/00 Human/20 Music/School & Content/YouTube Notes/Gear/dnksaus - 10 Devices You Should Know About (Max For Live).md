---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=B0i_S4jbhso
channel: dnksaus
duration: "00:08:50"
video_type: gear
music_enriched: true
transcript_source: captions
transcript_confidence: medium — clear rapid-fire rundown, but ten distinct third-party device/vendor names raise mis-transcription risk on the less common ones
tags: [yt-note, music, production, ableton, max-for-live, gear]
briefed: 2026-W31
---

# dnksaus - 10 Devices You Should Know About (Max For Live)

![](https://www.youtube.com/watch?v=B0i_S4jbhso)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=B0i_S4jbhso)

## Synopsis

A grab-bag rundown of ten favorite Max for Live devices (five free, five paid) by other developers — not dnksaus's own tools this time. Each gets a short demo and a stated use case. One of the ten, **BIP**, resolves a long-standing gap in the vault: the existing (owned, but previously unconfirmed-function) `BIP for L9` note turns out to be exactly this — a hotkey-mapped instant-resample utility. The other nine are unowned and route to the wishlist, each also cross-linked to its closest owned equivalent per the best-match rule: EQ Eight (MIDI to EQ Eight), Envelope Follower/Granulator 3 (Granular Mirror Maze), Soothe2 (High Frequency Limiter), Sidechaining (Chain Shaper), Randomized Rack Design (Gradient's preset-morph-and-mutate), LFO (LFO Cluster), Volcano 3 (Slink Filter), and Snare Design (Palmas, for clap-variation generation).

## Techniques

- **BIP resolved: hotkey-mapped instant resampling of the focused track** — map a keyboard shortcut (tilde/backtick in this demo) to instantly resample whatever track is currently selected/focused, with no need to manually create and arm a new audio track first; save the mapping into a default project once and it's always available. This is the same device as the existing (previously function-unconfirmed) `BIP for L9` plugin note. → [[BIP for L9]]
- **High Frequency Limiter (GM Audio, free)** — pick a threshold to tame harsh high-frequency content while mostly preserving the body of the sound; a Solo button previews exactly what's being cut. Framed as a budget alternative to Soothe-style dynamic resonance suppression when you still want to keep (rather than remove) most of the top end. → [[Soothe2]], [[Plugin Wishlist]]
- **Palmas (free)** — an instrument device generating a different clap variation on every trigger (pitch, width, "hand count"/spread-in-time like a strumming effect, and a minimum-velocity knob) — worth resampling once a good pass lands rather than leaving it live; useful for build-ups or layering under claps/snares. → [[Snare Design]], [[Plugin Wishlist]]
- **Inverter (Nathan, free)** — flips a waveform inside-out for a genuinely different-sounding result; chaining invert → process → invert again later in the signal path is called out as a source of interesting new textures. → [[Plugin Wishlist]]
- **MIDI to EQ Eight (free)** — reads the frequency of the MIDI note being played and outputs a mappable value that can drive an EQ Eight band's frequency directly (with a multiplier to track at a harmonic/multiple of the played note rather than the note itself) — a way to make an EQ move follow a bassline's actual pitch. → [[EQ Eight]], [[Plugin Wishlist]]
- **Granular Mirror Maze (free)** — a post-processing, granular-flavored delay: randomizes delay time via a Max Delay control, with a Scrub knob setting how fast that randomization happens (conceptually parallel to a grain-size knob). Demoed on [[Wavetable]]. → [[Granulator 3]], [[Plugin Wishlist]]
- **Chain Shaper (paid)** — draws a fully custom sidechain-ducking curve by hand (no attack/threshold/release numbers, pure visual shape) applied to Ableton's own Compressor, with independent curve shapes for the low, mid, and high bands — preferred over routing a plain Utility for sidechain shaping. → [[Sidechaining]], [[Plugin Wishlist]]
- **Gradient (Patches, paid)** — stores two (or more) full device presets into "corners," then an XY pad morphs continuously between them, with the ability to exclude specific parameters from the morph and to save any in-between blend as its own new corner; a **Mutate** button randomizes to a new preset entirely. → [[Randomized Rack Design]], [[Plugin Wishlist]]
- **LFO Cluster (Kintaro, paid)** — a bundle of multiple LFOs, each independently rate/shape-set and mappable, for automating a whole cluster of parameters (e.g. several delay controls) at once rather than one LFO device per parameter. → [[LFO]], [[Plugin Wishlist]]
- **Slink Filter (paid)** — sums many band-pass filters into one continuously-moving, spectrum-spanning sweep ("jump rope" wave), with region protection/slope control and built-in "physics" modulation (Gravity, Invert, Ripple, Multiply). → [[Volcano 3]], [[Plugin Wishlist]]

## Routed to

- [[BIP for L9]] — resolved: removed the "Unconfirmed" callout, added `## Techniques`, updated frontmatter (`video_enriched: true`), and updated its one-line description in [[Plugin Index]]
- [[EQ Eight]] — new `## Techniques` bullet: mapping MIDI-note pitch to drive an EQ band's frequency
- [[Soothe2]] — new `## Techniques` bullet: a cheaper harsh-highs safety net as an alternative angle on dynamic resonance control
- [[Snare Design]] — new bullet in `## From videos`: clap-variation-generator instrument as a resample source
- [[Sidechaining]] — new bullet in `## From videos`: visual, per-band sidechain-curve drawing
- [[Randomized Rack Design]] — new bullet in `## From videos`: preset-morph-and-mutate as a lighter-weight alternative to hand-building a two-preset chain-morph rack
- [[LFO]] — new `## Techniques` bullet: bundling multiple LFOs at different rates/shapes for one-device multi-parameter automation
- [[Volcano 3]] — new `## Techniques` bullet: summed band-pass filters as a spectrum-spanning sweep, as a texture-design idea alongside its own modulation system
- [[Granulator 3]] — cross-linked from the Granular Mirror Maze bullet (reinforcement of the existing post-processing-granular framing, no new bullet needed)
- [[Plugin Wishlist]] — nine new entries under "From videos (to vet)": High Frequency Limiter, Palmas, Inverter, MIDI to EQ Eight, Granular Mirror Maze, Chain Shaper, Gradient, LFO Cluster, Slink Filter

## Source

[10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso) · dnksaus · 8:50 · captions (medium confidence) · transcript: [[dnksaus - 10 Devices You Should Know About (Max For Live) (transcript)]]
