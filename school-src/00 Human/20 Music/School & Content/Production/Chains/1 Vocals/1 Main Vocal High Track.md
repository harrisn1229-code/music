---
type: chain
aliases: ["Main Vocal High Track"]
title: Main Vocal High Track
chain_type: track
family: vocals
source: mic
mic: Neumann TLM 102
routing: Main Vocal (high) → Main Vocal Group → Vocal Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Tube-Tech CL 1B mkII, UAD Pultec EQP-1A]
signal_chain: [Auto-Tune Pro, Pro-Q 4, Pro-C 2, Pro-DS]
status: default
tags: [chain, vocal, track]
---

# Main Vocal High Track

**Role:** High lead layer (octave-up or high harmony that reinforces the lead). Sits *with* the lead in the center — tucked under it, never competing. A support layer earns its place by being *narrower and more controlled* than the lead.

**Chain philosophy:** tune tighter → band-limit harder → compress flatter → de-ess.

## 1 — Recording Setup

- Same setup as [[1 Main Vocal Track|Main Vocal Track]] §1: [[Neumann TLM 102]], ghost latency track, tempo/key locked.
- Falsetto/octave-up parts sit closer to the mic's sweet spot at lower level — drop input gain ~3 dB so the thin register doesn't ride the preamp hot.

## 2 — Tracking Best Practice

- **Track it right after the lead take it supports**, same mic position — matched timbre fuses; a different session's tone reads as a separate voice.
- Sing softer than the lead; the layer is reinforcement, not a feature. 🎬 Set [[Auto-Tune Pro]]'s **input voice type to the register actually sung** (Soprano for falsetto) or the tracking misreads — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c).
- Center, mono — width belongs to doubles/harmonies.

## 3 — Source → Ableton (UAD Console)

Same console pass as [[1 Main Vocal Track|Main Vocal Track]] §3, printed conservatively.

## 4 — Ableton Initial Processing

### 1. [[Auto-Tune Pro]] — Pitch
- **Retune 22** (①) · **Humanize 100%** (③) · **input voice type = register actually sung** (④ — Soprano for falsetto) — tighter than the lead
- **Why:** High layers expose pitch drift; tighter tune keeps it fused.

### 2. [[Pro-Q 4]] — Band-limit
- HPF up to 150–200 Hz · LPF/high-shelf cut above 10–12 kHz · dip the lead's presence zone (3–5 kHz) −1 to −2 dB
- **Why:** The lead keeps the full range; this layer keeps a narrower window so they never fight.

### 3. [[Pro-C 2]] — Flatten
- 4:1 · attack 5–10 ms · release auto · **4–8 dB GR** — more than the lead
- **Why:** Support layers want near-zero dynamics so they sit still under the lead.

### 4. [[Pro-DS]] — De-ess
- Harder than the lead (range 6–8 dB) — stacked S's multiply.

## 5 — Track FX (optional)

- Nothing, usually — invisibility is the job.

## 6 — Bus / Send FX (optional)

Routing: **Main Vocal High → [[2 Main Vocal Group|Main Vocal Group]] → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — dry track, chain on the group.

- Share the lead's reverb/delay sends at slightly *higher* send levels — pushes the layer back in depth.
- **Delay:** cohesion delay via the shared group send (a touch hotter than the lead for depth), sidechain-ducked with the lead so tails sit behind → [[Sidechaining]]. A specific-word throw stays an insert on a dedicated throw track ([[EchoBoy]]), never this track's send. Cohesion → group send · moment → insert.
- 🎬 *From video:* on a hook/chorus this layer can also be pushed hard and *audible* rather than tucked-back cohesion — a large-room [[ValhallaRoom]] verb, deliberately heavy, as a featured chorus-uplift effect, not glue. This is the exception to "invisibility is the job" above, reserved for a chorus moment — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)

## Variations

- **Falsetto pad use:** widen with [[Width Send]] and pan a recorded pair L/R instead of center.
- **Trap octave layer:** hard-tune (retune 0–10) + more [[Saturation Send]].

## From videos

- **Octave-up doubled vocal drenched in a large room reverb as a deliberate, audible chorus-uplift effect — the opposite of this track's usual "invisibility is the job" treatment.** On Sam Smith's chorus ("Dancing With A Stranger"): "there was this high octave vocal verbed out, we used the large room — that's just his vocal, octaved up... nothing major, just to uplift the chorus slightly." Paired against a [[Vocoder]] treatment on the song's second lead vocalist for the same job (uplift the chorus) but a deliberately different color — "it's just a different color for the chorus." *(qualitative only — no decay/mix given)* → [[ValhallaRoom]], [[Vocoder]], [[Reverb]] (effect) — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)

## Sources

Same source set as [[1 Main Vocal Track|Main Vocal Track]] · Kenny Beats — [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c) · Kevin Davis (Mix with the Masters) — [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
