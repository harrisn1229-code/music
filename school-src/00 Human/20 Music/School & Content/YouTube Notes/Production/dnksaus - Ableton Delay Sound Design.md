---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=DCIEayyv1bk
channel: dnksaus
duration: "00:17:58"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken walkthrough, auto-caption punctuation light but content unambiguous
tags: [yt-note, music, production, ableton, delay, sound-design]
briefed: 2026-W31
---

# dnksaus - Ableton Delay Sound Design

![](https://www.youtube.com/watch?v=DCIEayyv1bk)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=DCIEayyv1bk)

## Synopsis

A whirlwind tour through every delay-family device in Ableton Live Suite, run in sequence on the same Operator+arpeggiator source via a chain selector — the fastest single-video survey of Live's delay lineup in the vault so far. Covers the classic stock **Delay** (Re-Pitch vs. non-Re-Pitch modulation character, feedback-at-the-extremes trick), **Grain Delay** (layering multiple XY-automation passes), **Spectral Time** (Tilt/Stereo/Max/Mask/Ultra-mode/Freeze), **Echo** (Character/Noisy, Ducking, envelope-follower-driven Decay for reverb tails), **Shifter** (Window-shaped texture, self-pitching feedback), **Phaser-Flanger** (envelope-follower-driven auto-modulation with S&H randomization), **Beat Repeat** (Mix/Insert/Gate output modes), and five devices with no prior coverage in the vault: **Pitch Hack** and **Gated Delay** (both from the free Creative Extensions pack), **Filter Delay** (three-way L/R/center delay, paired here with a Kentaro LFO Cluster M4L device), **Vector Delay** (from the Inspired by Nature pack — physics/magnet-style modulation), and **Pitch Loop 89** (a Suite-bundled stereo pitch/delay/filter device). Closes on **Looper** (speed/reverse for live recording — already deeply covered elsewhere in the vault, so not re-enriched here) and a framing note on how to actually use all this: chop it for transitions into a hit, or leave it running behind the mix in "texture mode."

## Techniques

- **Delay: Re-Pitch mode + milliseconds for an "itching" modulation character, feedback at the extremes** — in ms mode, modulating the delay-time knob with **Re-Pitch** on gives an "itching"/pitch-bending character; with Re-Pitch off it's more robotic and delayed/jumpy instead. Combine either with **Ping Pong** for stereo. Favorite combo: Re-Pitch on, Dry/Wet at 100 (delay signal only), and **Feedback set either very high or right at zero** — the incoming sound then just "jumps around" without extra buildup/craziness. Resampled for later use. → [[Delay]] (new)
- **Grain Delay: layer a second XY-automation pass on top of the first via the + button** — move the XY macro pair around to modulate two parameters at once for an instant cool sound, then press the **+** button at the top of the screen to record a *second* automation pass over a *different* parameter pair without erasing the first (used Delay Time × Spray for pass two). **Spray** gives its own Haas-effect-like stereo widening on top of whatever else is automated; a random-pitch element adds extra "bubbliness." → [[Grain Delay]]
- **Spectral Time: Tilt automation for "space laser" sweeps, Max softens the transient, Freeze in ms mode for melodic refresh** — Tilt's sign controls which frequencies delay first (already documented); automating **Tilt** (and optionally Time) live is "my favorite way to abuse this" for a rising/falling space-laser sweep. **Max** pulls a positive-Tilt sweep back while keeping some transient, or use it to blur further. Runs best in **Ultra** mode when full spectral detail matters; push **Feedback** for actual delayed trails rather than a single smear. The **Freeze** section is more useful on melodic material when triggered in **milliseconds mode**, since that lets you keep refreshing exactly where the freeze lands rather than committing to one static capture. → [[Spectral Time]]
- **Echo: Noisy character for ambient beds, envelope-follower-driven Decay stretches the built-in reverb's tail** — in ms mode with the built-in reverb engaged and dry/wet up, the **Character → Noisy** control adds a noisy, degraded delay character good for ambient material; **Ducking** keeps the wet signal out of the way of the original incoming hits. Echo's own **Modulation** section includes an envelope follower — driving **Decay** with it stretches the reverb's tail in response to the input, useful for atmospheric intro material that reads like a wash of water-splash-type texture. → [[Echo]]
- **Shifter: Window shapes the texture, and the built-in delay only pitches up once feedback is present** — the **Window** section shapes texture independently of pitch amount; the same octave-up setting reads as a different texture depending on Window time. Shifter's own internal delay/feedback path is what causes the audible pitch-up-per-repeat — with **Feedback at zero you don't hear the pitch climb at all**, since there's nothing to feed back into. An LFO on Window/pitch opens up a lot of textural variation. → [[Shifter]]
- **Phaser-Flanger: envelope-follower-driven auto-modulation with Sample & Hold + a second offset follower for extra randomness** — the flanger side is functionally a ~0.1–20 ms delay; the device's built-in **envelope follower** can shift its own settings in response to the incoming signal (mapped here to Feedback, envelope amount pushed **negative**, **Release** shaping how the response decays). Switching the LFO to **Sample & Hold** adds stepped randomness on top; running a **second envelope follower at a slightly different rate** than the first compounds the randomness further. For delay times longer than the ~20 ms ceiling here, reach for **Doubler** instead. → [[Phaser-Flanger]] (new)
- **Beat Repeat: Mix / Insert / Gate output modes, low Variation, resample while automating Gate** — the three output-routing modes: **Mix** blends repeats with the incoming signal, **Insert** mutes the incoming signal while repeats play, **Gate** plays the repeats only (nothing from the source at all). Prefers a **low Variation** setting plus Beat Repeat's built-in pitch element, tuned against whatever other delay it's chained after. Good workflow: resample while turning up Variation and automating Gate live. → [[Beat Repeat]]
- **Pitch Hack (Creative Extensions pack, free): reverse + random pitch, Recycle feeds the transposed signal back through itself** — reverses the incoming sound while pitch-shifting it (semitones + cents), with a random-pitch option; the **Recycle** knob feeds the *already-transposed* output back into the delay's own cycle, so a +5-semitone signal runs back through the delay again already shifted. Abuse case: duplicate the device and pitch the copy back down, so the chain reverses itself while a "recycle reception" loop keeps compounding. → [[Pitch Hack]] (new)
- **Filter Delay: independent L/R/center delay lines, automated via a third-party LFO Cluster device** — gives a separately-timed delay for the left, right, and center channels; paired here with **LFO Cluster** (a free Max for Live device by Kentaro bundling multiple independent LFOs in one device — already on [[Plugin Wishlist]]) to automate the per-side delay times at once rather than hand-mapping one LFO per side. → [[Filter Delay]] (new), [[Plugin Wishlist]]
- **Gated Delay (Creative Extensions pack, free): sequenced reverse/gate pattern with a randomize dice** — same family as Pitch Hack but with no pitch component: a step sequence where "blue" steps get linked/reversed and a "yellow" step is where the gate is applied; a built-in dice button randomizes the whole pattern in one click — a Beat-Repeat-adjacent way to get rhythmic patterning. → [[Gated Delay]] (new)
- **Vector Delay (Inspired by Nature pack, free): physics/magnet-style modulation via an XY map with edge behavior** — a delay whose modulation is driven by a physics simulation (think a ball/magnet moving on a 2D map) rather than a standard LFO: add voices, recycle the output back into itself, and map the "ball"'s position on the Y-axis (for example) to pan, velocity, or gain. The map's edges can be set to **bounce** the moving point back or **wrap around** to the opposite side, which changes the character of the resulting modulation pattern substantially. Described as having "a lot of different possibilities." → [[Vector Delay]] (new)
- **Pitch Loop 89: independent per-ear pitch-delay with vibrato-style modulation for stereo effects** — a stereo pitch/delay device (bundled with Live Suite) giving a different pitched-delay result on the left vs. right ear, plus modulation (vibrato-type movement) on top — called out specifically as "really cool for stereo-effect kind of stuff." → [[Pitch Loop 89]] (new)
- **Looper for live-recording speed/reverse capture** — record the incoming signal into a loop, then change its speed or reverse it; framed here as a live-performance capture tool rather than the deeper sound-design engine documented elsewhere. → [[Looper]] *(not re-enriched — see Routed to)*
- **Use-case framing: transitions vs. background texture** — once a chain like this is dialed in, either **chop it up as a transition** into the next hit (used here as a lead-up into a snare) or **leave it running continuously in "texture mode"** underneath the rest of the arrangement — the two default homes for this kind of abused-delay sound design.

## Routed to

- [[Echo]] — new `## Techniques` bullet: Noisy character + envelope-follower-driven Decay stretching the reverb tail
- [[Delay]] (new) — gap-fill plugin note for Ableton's basic stock delay (distinct from [[Echo]]); Re-Pitch/non-Re-Pitch modulation character, feedback-at-the-extremes technique
- [[Grain Delay]] — new `## Techniques` bullet: layering a second XY-automation pass via the + button
- [[Spectral Time]] — new `## Techniques` bullet: Tilt-automation space-laser sweep, Max softening, Freeze-in-ms-mode workflow
- [[Shifter]] — new `## Techniques` bullet: Window texture-shaping + feedback-gated pitch-up behavior
- [[Phaser-Flanger]] (new) — gap-fill plugin note: envelope-follower auto-modulation, S&H LFO, dual-envelope-follower randomization
- [[Beat Repeat]] — new `## Techniques` bullet: Mix/Insert/Gate output-mode breakdown
- [[Pitch Hack]] (new) — gap-fill plugin note (Creative Extensions pack): reverse + random pitch, Recycle self-feedback
- [[Filter Delay]] (new) — gap-fill plugin note: independent L/R/center delay lines
- [[Gated Delay]] (new) — gap-fill plugin note (Creative Extensions pack): sequenced reverse/gate pattern + randomize dice
- [[Vector Delay]] (new) — gap-fill plugin note (Inspired by Nature pack): physics/magnet-style XY modulation
- [[Pitch Loop 89]] (new) — gap-fill plugin note: per-ear pitch-delay + vibrato modulation
- [[Delay]] (effect page) — new `## From videos` bullet tying the whole delay-family tour together
- [[Plugin Wishlist]] — LFO Cluster entry (already listed) cross-referenced from the new [[Filter Delay]] note
- [[Looper]] — deliberately **not** re-enriched; the speed/reverse-for-live-recording content here is already covered in much greater depth by its own dedicated video

## Source

[Ableton Delay Sound Design](https://www.youtube.com/watch?v=DCIEayyv1bk) · dnksaus · 17:58 · captions (high confidence) · transcript: [[dnksaus - Ableton Delay Sound Design (transcript)]]
