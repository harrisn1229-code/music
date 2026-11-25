---
type: plugin
title: "Ghz DC19 3"
category: Reverb/Delay
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Ghz DC19 3

![[Images/Ghz DC19 3.png]]

**Category:** Utility
**Vendor:** Goodhertz

## What it is

Goodhertz\'s **playable delay** — designed around sliders rather than knobs so delay time can be swept continuously (a 128th to a whole note when synced; 3 ms to 8 seconds when free). Two taps with ping-pong routing, per-tap filtering, a built-in spring reverb, and performance macros (Kill All, Kill Feedback, Infinite Hold, Spring Hold).

## What it's used for

Removing DC offset from recordings (common with certain audio interfaces or damaged files) before further processing.

## FX chain notes

Placed at the very start of a chain, before any gain-sensitive processing like compression or limiting.

## Techniques

- **Spring reverb reached for specifically to change a sound's TEXTURE while it's being pitch/time-manipulated, not to add space.** Emile Haynie, working inside Pro Tools' Elastic Time: "I use reverbs in Elastic Time quite a [bit] just to change what could be a basic sound... I have a spring reverb on this just to change the texture a little bit." A fifth confirmed use-case for DC19's built-in Spring section beyond the vintage/section-arrival roles logged below — spring as a general tone-coloring stage on audio that's already being warped, not a finishing touch on a static part. Owned-lane: DC19's Spring section, applied to a Warped clip in Ableton. → [[Reverb]] (effect), [[Sampling and Sound Selection]] — Emile Haynie (Mix with the Masters), [[Arrangement & Processing with Emile Haynie]]
- **Spring reverb as a deliberate chorus-ARRIVAL cue on a second piano layer, A/B'd dry vs. wet to prove the "another dimension" effect — a professional mix confirmation of the vintage-sound pattern already logged repeatedly below.** Tom Elmhirst, mixing Adele's "Rolling in the Deep": a low piano runs the whole song, and a separate high piano exists ONLY in the chorus, carrying "a sort of shangri-la spring reverb vibe" as its one defining processing move — described directly as "a standard spring type, one vintage spring in space." Demoed dry-vs-wet: without the spring the high piano is flat/undifferentiated, with it "immediately atmosphere, different... gives me another dimension in the chorus that wasn't there." The reusable idea: gate a spring reverb to a SECTION-EXCLUSIVE layer (not a constant send) so its entrance itself becomes the arrival cue, rather than applying it as a static texture from the start. → [[1 Acoustic Piano Track]], [[Arrangement and Song Form]], [[Reverb]] (effect) — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **Spring reverb as the closing stage of a Rhodes chord chain (after tape + ShaperBox filter), reached for specifically "to give it more of a vintage sound."** Working around a found a cappella: Rhodes chords → J37 tape ([[Kramer Tape]]) → ShaperBox filter preset ([[Shaper]], pad-ifying) → **spring reverb** (DC19's built-in Spring section) — spring is the last stage, added once the tone/character stages are already set, matching the same "spring near the end, after color/movement" pattern already logged below from a different loner breakdown. → [[Kramer Tape]], [[Shaper]], [[Chains/5 Inst & Synth/1 Electric Piano Track|Electric Piano Track]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- **Two spring-reverb roles in the same Dez Wright breakdown: a wash-out stage on a pluck sample, and a late-chain space stage on a guitar sample.** (1) On *Wants and Needs* (Drake): spring reverb is the FIRST stage of a pluck wash-out chain — **spring reverb** → Portal → half-time → EQ — establishing the "washed out" foundation before the texture/glitch device gets added on top. (2) On the *Numbers* (A Boogie) guitar chain: preamp → amp → cassette → flanger → **spring reverb** → EQ, positioned near the end of the chain rather than the start — space added after tone/color/movement are already set, not before. → [[Portal]], [[Cassette]], [[Phaser-Flanger]], [[EQ Eight]], [[Dez Wright Guitar Sample Chain]] — loner, [dez wright's synth secrets will elevate your melodies!?](https://www.youtube.com/watch?v=_8vOz54DTiY)
- **Built-in spring reverb as a distinct texture layer on a bright contrast-guitar accent.** A dry, low-octave guitar (amp + EQ only) is the foundation; a second, brighter guitar layered on top for high-end contrast gets a fuller chain — preamp → guitar amp → **spring reverb** → EQ — where the spring specifically is what separates it from the plain-room-reverb'd Rhodes underneath. DC19's built-in Spring section (⑤) is the direct owned match — route it to the guitar's send/insert and use **Spring Hold** if the character needs to be locked in for a phrase rather than swept. → [[UAD Century Tube Channel Strip]] (preamp), [[Morgan Amps Suite]] (amp), [[EQ Eight]], [[Layering and Stacking]], [[Sound Selection Guide]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

## Key Parameters

```visual-key
image: Images/Ghz DC19 3.png
coords: Images/Ghz DC19 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Delay Time (A / B) | The two delay taps, each shown in ms. **Sliders, not knobs** — that's the whole design idea: synced you can slide from a 128th to a whole note, unsynced from 3 ms to 8 seconds, continuously. | Ride the slider while it's playing. It's built to be performed rather than set — automate a sweep across the bar instead of picking one value. | — |
| ② | Ping / Pong | Routing between the A and B taps — off, or bouncing between them. | Off for a straight single delay; Pong to throw the repeats across the stereo field without a second instance. | — |
| ③ | Sync / Free | Switches delay time between tempo-synced note values and free milliseconds, with a tempo multiplier row (1/4, 1/2, 2, 4). | Sync for anything rhythmic; Free when you want the tape-flavoured "wrong" times that don't land on the grid. | — |
| ④ | Filter (Q) | Per-tap filter shaping the repeats — the curve editors either side of the delay lanes. | Roll the top off the repeats so they sit behind the dry signal and degrade with each pass, dub-style. | — |
| ⑤ | Spring | Built-in **spring reverb** with its own decay, routable to just the delay or to dry + delay. | The surf/echo-chamber sound in one control. Route it to delay-only to keep the dry signal clean while the repeats bloom. | — |
| ⑥ | Feedback | How much of the output is fed back for repeats. | Push it near self-oscillation and use the macros below to catch it — that's the "playable" part. | — |
| ⑦ | Output | Output level of the effect. | — | — |
| ⑧ | Mix | Dry/wet blend. | — | — |
| ⑨ | Macros (Kill All / Kill Feedback / Infinite Hold / Spring Hold) | Performance buttons. **Spring Hold** pins Spring Amount to 100% and routes all audio through the spring; **Infinite Hold** freezes the current repeats. | These are the reason to insert DC19 rather than a stock delay — automate them as arrangement events (a hold into the drop, a kill on the turnaround). | — |

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]
