---
type: plugin
title: "Phaser-Flanger"
category: Modulation
vendor: "Ableton"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-27
---

# Phaser-Flanger

**Category:** Modulation
**Vendor:** Ableton

## What it is

Ableton's stock combined phaser/flanger device — the flanger side is functionally a very short (~0.1–20 ms) modulated delay, paired with a phaser stage, plus a built-in envelope follower and LFO section that can drive the device's own parameters from the incoming signal.

## What it's used for

Classic sweeping phaser/flanger movement on guitars, keys, and synths; the built-in envelope follower additionally makes it a lightweight audio-reactive modulation source for other parameters, without wiring up a separate [[Envelope Follower]] device.

## FX chain notes

Insert on the source track needing the sweep/flange movement; when used purely as an envelope-follower-driven auto-modulator (feedback/rate reacting to the input), it can sit ahead of a following delay-family device to make that device's own character respond to dynamics.

## Techniques

- **Best-match for a "fruity phaser" (FL Studio's stock phaser) on a light hi-hat's end-of-pattern roll, deliberately set to an odd 1/3-step subdivision for a "bit off and a bit weird" feel.** On a chill/ambient Frank Ocean-style beat's minimal 3-piece drum kit, the phaser is a low-effort finishing texture add on the hi-hat roll only, not a full sound-design pass. → [[Rhythm and Groove]], [[Frank Ocean Chill Ambient Chain]] — loner, [how to make chill ambient beats for frank ocean (sad/melodic chord technique)](https://www.youtube.com/watch?v=whI75NJcom8)
- **The Beatles' "Blue Jay Way" reverse-vocal-through-a-Leslie trick, recreated with a phaser as the finishing color stage on a bounced/reversed vocal chop.** Beatles history note: they reportedly recorded the entire song backwards through a Leslie speaker, then chopped parts of that reversed pass to lead into sections of the forward song. Recreation on a period-accurate psych-rock sample build: bounce the vocal, reverse it, chop two short reversed sections and splice them back in as lead-ins, then add a phaser (this device) + [[ValhallaVintageVerb]] ("a vintage verb"). Framed in the source as proof the era was genuinely experimental — "unheard of" when the Beatles did it. → [[Reverb]], [[60s - Beatles]], [[Beatles Psych-Rock Sample Chain]] — loner, [these 1960's production secrets will change the way you make samples!?](https://www.youtube.com/watch?v=Ngz_fZraTP4)
- **Flanger as a mid-chain color/movement stage on a guitar-sample flip, between saturation and reverb.** Recreating Dez Wright's *Numbers* (A Boogie) guitar sample: preamp → amp → cassette → **flanger** → spring reverb → EQ — the flanger sits after the cassette's tape saturation and before the spring reverb adds space, rather than at either end of the chain. → [[Cassette]], [[Ghz DC19 3]], [[EQ Eight]], [[Morgan Amps Suite]], [[Dez Wright Guitar Sample Chain]] — loner, [dez wright's synth secrets will elevate your melodies!?](https://www.youtube.com/watch?v=_8vOz54DTiY)
- **Flanger as an early-chain movement stage on TWO different Mk.gee-inspired chains — a baritone guitar bass tone and a Casio CZ-5000-style synth recreation.** Guitar chain: preamp/comp/amp → **chorus → flanger → tape emulation** for overall color, before the chain's real secret sauce (a noise-gated distorted reverb send). CZ-synth chain: two layered CZ-emulation VSTs → **flanger → chorus → tape (envelope-mode noise) → plate reverb → distortion → heavy compression**. Both put the flanger near the front, as a color/movement stage rather than a final effect. → [[Chorus-Ensemble]], [[Kramer Tape]], [[Little Plate]], [[Mk.gee Baritone Guitar Chain]], [[Modulation]] — loner, [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU)
- **Flanger as the last stage on a vintage-piano chord sample, after compression/reverb/EQ, for "real vintage" character** — on a live-played piano progression built to sound like an old soul/R&B sample, order the chain heavy compressor → room reverb → EQ → flanger; the flanger specifically is what the source calls out as pushing it into vintage territory, not the compression or reverb stages. → [[ValhallaRoom]], [[Bryson Tiller Vocal Chain]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
- **Flanger stacked with AlterBoy + half-time for a "chopped and screwed" vocal top-line** — AlterBoy (pitch) → this device → a half-time device (Cableguys HalfTime — unowned, see [[Plugin Wishlist]]) gives a slowed, warped vocal character before a final shaper-box stage does the heavy character work. → [[Little AlterBoy]], [[Bryson Tiller Vocal Chain]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
- **A phaser on the hi-hat as a quick texture add for a Metro Boomin/Weeknd-style beat** — insert on the hi-hat pattern specifically (not the full drum bus) to give an otherwise plain hi-hat extra movement/texture in a half-time R&B groove. Simple, low-setting move, not a deep sound-design build. → [[Genre Drum Patterns]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)
- **A "massive phaser" as the sound-design core of a dedicated intro-only bass synth** — rather than a subtle sweep on the main bassline, build a separate synth patch specifically for a track's intro section with heavy phaser character as its defining feature — a purpose-built intro texture, distinct from (and not reused as) the main bass patch. Pairs with a flanger on a saw lead elsewhere in the same session for a general "chorus/phaser-forward" synthwave lead recipe. → [[Modulation]], [[Synthwave]] — Max Konyi, [Synthwave in Studio One with Stock Instruments | Weekly Challenge #9](https://www.youtube.com/watch?v=IA61_2JAd84)
- **Free "phase disperser" bass texture: duplicated, phase-cancelling Phaser pair + a phase-inverted Utility.** A hardware/plugin disperser delays low frequencies relative to highs (not a filter/EQ — nothing is removed in level, only shifted in time). Free stock-Ableton build: (1) insert this device on the bass, (2) turn **Amount** all the way down to 0 so no sweep/notch movement is audible; (3) group it into an Audio Effect Rack (Cmd/Ctrl+G); (4) duplicate that chain; (5) flip the duplicate's **phase-invert** switch — the two phasers' static notches now cancel, so the rack sounds identical bypassed or not (a de facto null test); (6) add a **Utility** device to one chain and flip *its* phase-invert switch too — because that inversion lands at a different point in the signal path than the phaser-pair cancellation, it reintroduces a frequency-dependent delay between the two chains, which is the actual disperser "bubbly/wobbly" effect; (7) duplicate the whole rack a couple more times for a stronger effect. Credited in-video to fellow producer "Offset." → [[Utility]], [[kHs Phaser]], [[Phase Alignment]], [[Bass Design]], [[Serum 2]] (the wavetable-drawn bass this was demoed on) — You Suck at Producing, [Make INSANE Dubstep Basses Just By Drawing!](https://www.youtube.com/watch?v=6tgjeG_6OvQ)
- **Self-modulating auto-flange on a snare's transient layer, chained into Grain Delay, for metallic SOPHIE-style hits** — a snare-specific tuning of this device's envelope-follower auto-modulation: oscillating frequency pushed up into flange range, **Feedback maxed**, driven by its own envelope follower with a quick attack and a short (~0.5) release, **LFO waveform set to Sample & Hold**, **Phase ≈ 14** for a slight left/right time offset (a metallic stereo smear rather than true width), **Warmth** maxed, with some of the dry snare bled through underneath. Chained directly into [[Grain Delay]] (Feedback maxed, short time, Spray) afterward — the video's explicit thesis is that a flanger and a Grain Delay are both just forms of delay, and stacking delay-family devices is the whole metallic recipe. → [[Grain Delay]], [[Snare Design]] — dnksaus, [How to Metallic Snares like SOPHIE](https://www.youtube.com/watch?v=MuD_Rq04tic)
- **Envelope-follower-driven auto-modulation, S&H LFO, and a second offset envelope follower for extra randomness** — map the device's own **envelope follower** to a parameter (e.g. Feedback), push the envelope-follower amount **negative**, and shape the response with **Release**. Switch the LFO to **Sample & Hold** for stepped randomness layered on top. Running a **second envelope follower at a slightly different rate/response** than the first compounds the randomness further, for a less mechanical, more organic-feeling automatic modulation. For delay times longer than the ~20 ms flanger ceiling, reach for **Doubler** instead of pushing this device past its range. → [[Delay]], [[Envelope Follower]] — dnksaus, [Ableton Delay Sound Design](https://www.youtube.com/watch?v=DCIEayyv1bk)

## See also

- Plugins: [[kHs Phaser]] · [[kHs Flanger]] (3rd-party equivalents already documented) · [[Envelope Follower]] · [[Doubler2]]
- Effects: [[Modulation]] · [[Delay]]
- Palette: [[TEXTURE Slot]] · [[Sound Palette]]
