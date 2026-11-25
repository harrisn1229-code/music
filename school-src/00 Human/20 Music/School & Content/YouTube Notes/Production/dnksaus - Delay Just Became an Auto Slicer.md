---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=zAjmcohzIwc
channel: dnksaus
duration: "00:15:55"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, delay, echo, looper, sound-design, randomization]
briefed: 2026-W31
---

# dnksaus - Delay Just Became an Auto Slicer

![](https://www.youtube.com/watch?v=zAjmcohzIwc)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=zAjmcohzIwc)

## Synopsis

dnksaus (Ableton-sponsored) breaks down what Live 12.4 added to three stock devices — Erosion (a noise/sine blend knob), Chorus-Ensemble (static per-tap delay time + selectable extra-voice count), and — the main event — Echo's Modulation LFO, which gained new wave shapes and time-behavior modes. The video reframes Echo as a "time machine": with feedback down and dry/wet up, the Delay Time knob scrubs anywhere in a rolling buffer of the recent past (a bar in Sync mode, up to 5 seconds in Time mode), and three modes govern what happens when the position changes — Repitch (tape-style pitch-bend catch-up), Fade (clean crossfade "scrub"), and Jump (hard cut, glitchy). Combining the new Sample & Hold LFO wave with Fade mode turns Echo into a fully automatic random sample-slicer with zero extra devices. The back half builds a reusable "Glitch Atmos" rack (auto-slicer Echo + [[Hybrid Reverb]] Shimmer on a wet chain, a dry chain, a chain-volume-fade dry/wet macro, and a hand-built ducking compressor recreating Echo's own Ducking feature on a custom chain), then shows inserting that glitch chain into Looper's own feedback loop — combined with Binary-mode LFOs mapped to Looper's Speed/Reverse/Feedback for a self-mutating, resampleable ambient/glitch generator.

## Techniques

- **Echo as a "time machine"** — feedback all the way down, dry/wet all the way up = a single copy of the signal living in Echo's rolling record buffer; the Delay Time knob then scrubs to any point in the recent past — a bar back in Sync mode, up to 5 seconds back in Time mode (free-running). → [[Echo]], [[Delay]]
- **Three behaviors for changing delay-time position** — **Repitch** (default): pitch-bends to catch up to the new time position, tape-speed-change character, great for sound-effect throws; **Fade**: crossfades cleanly to the new position — a "satisfying scrubbing" effect with no pitch artifact; **Jump**: hard-cuts to the new position — deliberately glitchy/artifact-heavy. Pick by how much artifact you want: Repitch for tape-throw FX, Fade for smooth scrubbing, Jump for glitch. → [[Echo]]
- **The "time machine" sound-effect workflow** — manually scrub the Delay Time knob with feedback up (Repitch mode) to grab a throw/riser-style FX moment, print it to a new MIDI track in Slice mode, layer another Echo on top for compound effects. → [[Echo]], [[Sampling and Sound Selection]]
- **Wander LFO wave = built-in tape-warble, no external LFO needed** — Echo's new LFO wave list includes Wander (a curved-random shape); previously an unstable vintage pitch-warble required an external M4L [[LFO]] set to its Stray shape mapped to Delay Time. Now: a low Delay Time + Wander wave + Repitch mode gives that same vintage pitch-warble directly inside Echo — save the patch as "unstable pitch warble." → [[Echo]], [[LFO]]
- **Envelope-follow Erosion's own controls** — [[Envelope Follower]] mapped to Erosion's Amount (and/or its new noise/sine Blend knob) so Erosion's character tracks the amplitude of whatever is playing into it — a level-reactive texture layer instead of a static one. → cross-reference: no dedicated Erosion note existed before this video; created one (see Routed to).
- **The auto-slicer recipe** — fresh Echo, Feedback fully down, Dry/Wet fully up, LFO Wave = **S&H** (Sample & Hold — random value stair-steps to a new value each cycle, no smoothing between steps), LFO Time mode = **Sync** (e.g. quarter notes for a chunky chop, 16ths for denser glitch), Delay filter off. Result: Echo randomly samples positions from "now" back to the LFO's sync division and plays them back — a fully automatic, hands-off random slicer/chopper with zero extra devices. Widen the effective sample range with the LFO's Delay Amount; turn on the filter (narrow/low bandwidth) + Ping Pong + higher Feedback for a more atmospheric, wandering-glitch texture instead of a tight chop. → [[Echo]], [[Delay]]
- **"Glitch Atmos" rack build** — group the auto-slicer Echo + a [[ValhallaVintageVerb]]-class reverb (here: Ableton [[Hybrid Reverb]] in **Algorithm mode** — no convolution — **Shimmer algorithm**) into an Instrument/Audio Effect Rack; open the Chain window and build a **dry chain** (unaffected signal) alongside the **wet chain** (glitch delay at 100% dry/wet → reverb). Drag each chain's volume-fade zone (the white bar on top of the blue chain-select bar) to opposite ends and shift them past each other by one so each chain fully mutes outside its own end — this turns the chain-select bar into a genuine dry/wet crossfade knob you can map straight to a macro (no separate Utility/gain-blend device needed). → [[Randomized Rack Design]]
- **Recreating Echo's Ducking on a custom rack** — Echo's Character-tab Ducking (a built-in sidechain that ducks the wet signal while the dry input is present, then lets it swell back) doesn't exist on other devices/racks by default, so rebuild it: put a Compressor at the end of the wet chain, enable its Sidechain, turn on **External**, set the source to the same track's **"rack pre-effects"** signal (= the dry input before this rack's processing) as the key, then dial Threshold (Peak detection, threshold turned up a bit since it reads hot) and Release so the wet chain ducks under playing and blooms in the gaps. Generalizes to any wet FX chain built inside a rack, not just this one. → [[Sidechaining]], [[Randomized Rack Design]]
- **Insert an FX chain into Looper's own feedback loop** — new audio track, take input from the track running Looper, but set the *output* routing to **"Insert Looper"** instead of Post Mixer — this feeds the chain's output back into Looper's own buffer instead of to the main mix, so whatever's on this track processes and re-processes the looped audio every pass. Put the glitch-fade Echo (Wander wave this time, synced to half notes, ~3-second Time range) on that insert track so the loop content gets progressively more scrambled each time it recirculates — go careful about how often new audio is fed in, since the mangling compounds. → (new) [[Looper]]
- **Binary LFO macro-randomization on Looper** — group Looper into a rack, map **Speed** to a macro (range -12 to +12), add an [[LFO]] set to **Binary** mode (coin-flip between the mapped min/max each cycle) in Remote mode mapped to that Speed macro for constant octave-flipping; raise the LFO's Smooth so the flips aren't a hard click. Duplicate the LFO and map the copy to the first LFO's **Depth** so the octave swing itself varies (sometimes centers, sometimes hits the full octave). Duplicate again (lower Smooth this time) and map to **Reverse** so playback direction randomly flips — note reversing mid-phrase can generate audible clicks, so weigh how disruptive that's allowed to be. A further Binary LFO mapped to **Feedback** creates random "audio drop" gaps in the recirculated loop; a Random-mode LFO on **Rate** varies how fast all of this cycles. → (new) [[Looper]], [[Randomized Rack Design]]
- **Resample and mine the result** — once the self-mutating loop/glitch chain sounds interesting, resample it to a new audio track, then either drop the render into a MIDI track in Slice mode to mine fresh rhythmic/percussive material, chop it into one-shots, or build a full track section from it directly.

## Routed to

- [[Echo]] — new `## Techniques` section (time-machine + auto-slicer + Wander + ducking-recreation), `video_enriched: true` added, Key Parameters row ⑦ expanded for the Repitch/Fade/Jump 3-way behavior
- [[Delay]] (effect page) — time-machine + auto-slicer `## From videos` bullets
- [[LFO]] — Binary-mode macro-randomization bullet, Stray-shape vinyl-warble cross-reference
- [[Erosion]] — new plugin note (gap-fill; Live 12.4 stock device, no prior note) with the noise/sine Blend + envelope-follower-driven Amount technique
- [[Looper]] — new plugin note (gap-fill; no prior note existed) seeded with the feedback-loop-insert-chain and Binary-LFO macro-randomization techniques (fuller treatment lands with the dedicated Looper video next in this batch)
- [[Sidechaining]] — "recreate Ducking via external sidechain off rack pre-effects" bullet
- [[Randomized Rack Design]] — new technique note (gap-fill; this channel's throughline) seeded with the chain-volume-fade dry/wet macro, the custom-ducking-on-a-rack pattern, and the Binary-LFO octave/reverse macro pattern

## Source

[delay just became an AUTO SLICER](https://www.youtube.com/watch?v=zAjmcohzIwc) · dnksaus · 15:55 · captions (high confidence) · transcript: [[dnksaus - Delay Just Became an Auto Slicer (transcript)]]
