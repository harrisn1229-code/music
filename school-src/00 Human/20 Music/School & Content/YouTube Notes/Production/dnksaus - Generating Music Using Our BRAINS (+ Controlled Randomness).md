---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=FykE1BOrcOg
channel: dnksaus
duration: "00:13:32"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, randomization, composition, generative]
briefed: 2026-W31
---

# dnksaus - Generating Music Using Our BRAINS (+ Controlled Randomness)

![](https://www.youtube.com/watch?v=FykE1BOrcOg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=FykE1BOrcOg)

## Synopsis

The capstone video for this channel's self-randomizing-rack throughline: a full generative song-writing rack built entirely from stock MIDI devices. Starting from an Operator FM patch, dnksaus stacks a **Scale** device (auto-loaded in the song's key via a saved default preset) into a **Chord** rack (several presets, chain-selected and macro-mapped with Strum/Tension/Crescendo), then drives the whole thing with his "Random Generator" utility rack (documented from an earlier video this batch) instead of manual knob-turning, so a different chord voicing/spacing/strum fires on every MIDI note. A melody line gets the same treatment via **Arpeggiator** (Style/Steps/Gate/Rate each randomized, Rate further coin-flipped with a Binary random generator) into **Velocity** (randomized for humanized dynamics). A second pass swaps the usual chain-selector-of-instruments pattern for something new: distributing a rack's chains by **Velocity range** instead, so a fully-randomized Velocity device picks which of 6-8 layered instruments fires on each note — achieving the "sound blender" effect from an earlier batch through a completely different mechanism. The video closes with practical workflow: looping a section to stack take lanes from a long generative recording, then painting in the best-sounding takes to comp a usable progression.

## Techniques

- **Chord device: Learn mode + chain-selector rack of presets** — teach a voicing via Learn, or rack several presets with a macro-mapped chain-selector (Strum/Tension/Crescendo mapped to all siblings). → (new) [[Chord]]
- **Scale device auto-loads in the song's key** — save its scale-aware setting as a default preset so every new instance matches the project automatically. → (new) [[Scale]]
- **"Random Generator" drives the whole chord rack per note** — the nine-Expression-Control utility rack (documented from the previous video this batch) mapped to Chord's chain-selector/Strum/Tension/Crescendo instead of Expression Control's Random mode one parameter at a time. → [[Randomized Rack Design]]
- **Arpeggiator + randomized Style/Steps/Gate/Rate** — Style range restricted to avoid landing on chord-stack modes; Rate restricted to a window and coin-flipped with a Binary-mode random generator. → (new) [[Arpeggiator]]
- **Velocity device: Fixed-mode humanization AND instrument-selector** — a modest random range humanizes dynamics; fully randomizing Velocity and distributing a rack's chains by velocity range (instead of a chain-selector) lets random velocity pick which instrument fires — a new mechanism for the "different sound per note" pattern. → (new) [[Velocity]]
- **Random MIDI device for occasional octave jumps** — Interval 12, Sign Add/Sub, layered on top of the generated melody for unpredictable accents. → (new) [[Random]]
- **Take-lane comping for generative recording** — loop-record a section so every pass stacks as its own take lane, then paint in the best-sounding take per section with the pencil tool. → [[Randomized Rack Design]]
- **Bass Lock sub-layer, reused** — his own auto-sub-octave device, scale-aware, chord-root-recognizing, tracking the generative rack's harmony automatically. → [[Plugin Wishlist]]
- **Auto Filter band-pass + slow LFO on a pad layer** — a texture-appropriate reuse of the per-ear-drift device seeded earlier this batch. → [[Auto Filter]]
- **Operator FM patch as the seed instrument** — algorithm with B FMing A and a parallel saw C, negative filter envelope for a "bubbly" character. Full dedicated Operator coverage deferred to its own upcoming video in this queue.
- **Auto Shift reused for a simple in-key pitch lift** — scale-degree shift up + High mode on a vocal chop; no new nuance beyond what's already documented on [[Auto Shift]] from the previous video this batch.

## Routed to

- [[Chord]] — new plugin note (gap-fill; Ableton's stock chord device, no prior note — distinct from the existing Max for Live [[Chord Generator]]); cross-linked both directions
- [[Scale]] — new plugin note (gap-fill; Ableton stock device, no prior note)
- [[Arpeggiator]] — new plugin note (gap-fill; Ableton stock device, no prior note)
- [[Random]] — new plugin note (gap-fill; Ableton stock device, no prior note); disambiguated against [[Expression Control]]'s Random mode (cross-linked both directions)
- [[Velocity]] — new plugin note (gap-fill; Ableton stock device, no prior note — distinct from the existing 3rd-party [[Velocity Shaper]]); cross-linked both directions
- [[Randomized Rack Design]] — extended with three new bullets: the full generative song-writing rack, velocity-as-instrument-selector, and take-lane comping workflow
- [[Plugin Wishlist]] — Bass Lock entry (added from the previous video) extended with this video's citation
- [[Auto Filter]], [[Auto Shift]] — reused with no new nuance; not re-enriched to avoid padding
- Operator — light touch only; has its own dedicated video later in this queue

## Source

[generating music using our BRAINS (+ controlled randomness)](https://www.youtube.com/watch?v=FykE1BOrcOg) · dnksaus · 13:32 · captions (high confidence) · transcript: [[dnksaus - Generating Music Using Our BRAINS (+ Controlled Randomness) (transcript)]]
