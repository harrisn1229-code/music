---
type: chain
title: Glitch Delay Rack
reference: asd (ableton sound design, YouTube breakdown channel)
chain_type: style
family: fx
routing: "Track insert (or a send return) — [[Delay]] (time-mapped, Random-LFO-modulated) → nested mono/[[Delay]] Ping Pong sub-rack → [[Limiter]]"
signal_chain: [Delay (mono, Time mode), LFO (Random wave, mapped to Delay Time + Feedback + Rate + Curve macros), chain-selector dry/wet macro, nested rack (mono Delay chain / stereo Ping Pong Delay chain, shared macros), Limiter]
status: video-derived
tags: [chain, fx, style, sound-design, ableton, delay, lfo, macro, glitch]
---

# Glitch Delay Rack

**Reference/vibe:** a from-scratch custom Audio Effect Rack built from only two delays and one [[LFO]] — proof that a single well-chosen modulation source (an LFO mapped to delay time) produces the entire range of results from subtle stutter to full deconstruction, with everything else in the rack (feedback, dry/wet, stereo width) as supporting macros. Built and demoed by asd (2017) using the era's separate "Simple Delay" / "Ping Pong Delay" devices — both are the same device family unified today in [[Delay]] (Live 11+). Companion technique note: [[Randomized Rack Design]] (the chain-volume-fade dry/wet macro and nested-rack-shared-macros patterns this build relies on are documented generally there).

**Signal source:** built entirely from stock Ableton devices ([[Delay]] ×2, [[LFO]], [[Limiter]]) — nothing here needs an unowned plugin. LFO 2.0 is a free Ableton Max for Live device if not already installed. Nothing added to [[Plugin Wishlist]] from this video.

## Chain (build order)

### 1. Prove the concept by hand
Loop a percussion-based sample on an audio track (busy transient content shows the effect most clearly). Drop [[Delay]] on the track: **Stereo Link on** (bypasses the right channel's own time, applies the left channel's setting to both sides), mode **Time** (not Beat sync), **Dry/Wet 100%**. Play the loop and manually drag the delay-time slider around — this manual drag alone is the entire foundation of the rack; everything after this step exists to automate that one gesture.
- **Why:** confirms the ear-catching effect before any device/macro complexity gets added — the rest of the build is pure automation of this one motion.

### 2. Group into a rack, map Delay Time + Beat Division to a macro
Group the delay into an Audio Effect Rack. Map **Delay Time** to a macro; also map **Beat Division** to that *same* macro (so the synced and free-time behaviors move together). Map the **delay-mode button** (Beat sync / Time) to a separate macro — a performable toggle rather than a fixed choice.

### 3. [[LFO]] → the time macro, at "full modulation"
Map [[LFO]] to the delay-time macro (Map → click macro). Set **Control = 0.5** (macro's center/default value) and **Amount = 0.5** (swing range from center) — together this is "full modulation" of the mapped macro, the starting point worth trying before hand-tuning further. Switch **Wave = Random** (stepped, unpredictable per-cycle values) and **Rate ≈ 5 Hz**.
- 🎬 *From video:* **Beat sync** delay mode + this LFO setup reads as more rhythmically "locked"/relevant — a crude beat-shuffling effect — than free **Time** mode with the identical LFO settings.
- **Why:** Random wave at a mid-fast rate is what turns smooth modulation into "glitch" — a sine/triangle LFO on the same macro would read as a sweep, not a stutter.

### 4. Feedback macro
Map **Feedback** to its own macro. Higher feedback = a more metallic character layered on top of the LFO's rhythmic chaos — a one-knob "how extreme" control.

### 5. Dry/wet macro — built as a two-chain crossfade, not the Dry/Wet knob
Create a **dry chain** (empty passthrough) and a **wet chain** (the delay) inside the rack. Open the **Chain Select editor**, stretch both chains' zones to span the full 0–127 range, adjust each chain's **fade range** and **zone range** so 0 = fully dry, 127 = fully wet, smooth crossfade between. Map the **chain selector** to a macro.
- **Why this instead of the delay's own Dry/Wet knob:** leaves the rack able to accommodate a *second* delay inside the same wet path later (step 6) — the chain-selector approach scales to more devices, a plain knob doesn't. This is the same mechanism documented generally on [[Randomized Rack Design]] as "the chain-volume-fade dry/wet macro."

### 6. Nest a Ping Pong sub-rack for stereo width
Group the mono delay into **its own** audio effect rack (nested inside the outer rack). Inside that inner rack, build a **mono chain** and a **stereo chain** using the same two-chain zone-stretch technique as step 5. Drop a [[Delay]] instance in **Ping Pong** mode into the stereo chain, map its time/feedback/mode parameters to the **same macros** already driving the mono delay (both delays track together, no independent control needed), fully expand its **band-pass filter** section, and set its own Dry/Wet to 100% (the outer rack's macro already handles the overall blend).
- **Why:** nested rack + shared macros is the reusable idea — adds a parallel processing variant without duplicating the control surface. → [[Width and Stereo]]

### 7. Finishing macros: LFO Rate + Curve
Map the LFO's **Frequency/Rate** to its own macro, ranged **5–30 Hz** (arbitrary starting range). Map the LFO's **Curve** to a second macro, ranged roughly **0.3 and up** — Curve skews the LFO's *output-value distribution*: at 1 unaffected, below 1 more low values, above 1 more high values. Net effect: Rate controls glitch speed, Curve controls whether the randomization leans subtle or extreme.

### 8. [[Limiter]] — protect the output
Drop a limiter at the very end of the chain. Jump-mode transitions and high feedback can get loud fast; the limiter is a safety net before pushing the rack to its extremes.

## Delay-mode behaviors (right-click the delay's title bar)

| Mode | Character |
|---|---|
| Re-Pitch | Tape-throw pitch-bend on time changes — smoother, more musical glitch |
| Jump | Audible clicks on every time change — harder mangle/distortion |

## Usage

- **Percussive loop** — the obvious, foundational result (what the build is designed around).
- **Melodic content (piano comp, etc.)** — noticeably subtler than percussion; switching to the Ping Pong/stereo path specifically adds "interesting and busy" movement even here.
- **Full song / mix** (both rhythmic and harmonic elements present) — produces the wildest, most extreme results of the three source types.

## Variations

- **Skip the Ping Pong nesting for a lighter/mono-only build** — steps 1–5 alone (delay + LFO + feedback + dry/wet macro) already deliver the core glitch character; the nested stereo rack is an add-on for width, not a prerequisite.
- **Swap Random for Sample & Hold or a custom shape** — the general LFO-on-delay-time mechanism generalizes beyond Random wave; see [[Delay]] and [[Randomized Rack Design]] for related LFO-on-delay techniques from other sources (S&H random-slicer, Stray-shape vinyl wobble).
- **As a send instead of an insert** — the video builds this as a track insert; nothing about the macro/chain structure prevents running it on a return the way [[Delay Send Other]] does, if the goal is a shared glitch texture across multiple tracks.

## From videos

- **A genuine "happy accident" alternative to a designed glitch rack: push a synth-into-delay signal chain past the software's real-time calculation limit for real, unrepeatable glitches.** Justice ran a mono synth through a digital delay and sped the tempo up until Ableton's delay could no longer calculate the taps in real time — the resulting glitches are a literal one-take recording of the software failing to keep up, not a simulated effect. Deliberately used for a specific dramatic goal (turning a "sunny" outro into "a feverish nightmare"), and kept once discovered — an example of treating a genuine technical limitation as a compositional device rather than a bug to avoid. Distinct from this rack's LFO-on-delay-time approach: no macro control, no repeatability, found by pushing a real signal chain past breaking rather than designed. — Justice, [[Behind the Track - 'Dear Alan' by Justice]]

## Notes

- All-stock-plugin build (LFO 2.0 is free Ableton content) — nothing to add to [[Plugin Wishlist]] from this video.
- Sibling technique: [[Randomized Rack Design]] documents the chain-volume-fade dry/wet macro and nested-rack-shared-macros patterns generally (that note's other examples are sourced from a separate, later dnksaus video — this chain is an earlier worked example of the same core Ableton trick).
- Plugin notes carrying this video's techniques: [[Delay]], [[LFO]].

**Sources:** asd, [Ableton Sound Design | Glitch Delay Audio Effect Rack](https://www.youtube.com/watch?v=95e5bfB8th8) — video-derived, 2026-08-11.
