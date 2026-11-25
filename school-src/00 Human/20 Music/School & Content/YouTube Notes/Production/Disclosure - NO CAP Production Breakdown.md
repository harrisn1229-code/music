---
type: yt-note
date: 2026-07-14
source: youtube
url: https://youtu.be/kz5dmb3QdI8
channel: Disclosure
duration: "01:55:14"
video_type: music
music_enriched: true
tags: [yt-note, production, plugins, disclosure, house, techno]
swept: 2026-07-19
briefed: backlog
---

![](https://youtu.be/kz5dmb3QdI8)
📺 [Watch on YouTube](https://youtu.be/kz5dmb3QdI8)

# Disclosure - NO CAP Production Breakdown

Guy and Howard break down "No Cap" (feat. Anderson .Paak) in Ableton on a Twitch stream — a two-hour, wall-to-wall technical teardown of a club tune written at the tail end of a burnt-out two-week London session. The most valuable stretches are the drum programming (turning a bare Splice loop into a groove with rhythmic EQ automation and off-grid transient nudges), the two-synth lead (smooth Diva morphing into a filter-distorted MS-20), the Anderson .Paak vocal chain (Gem Dopamine → de-ess → subtle OTT-as-glue → Decapitator), and a long closing Q&A that lays out Guy's current mastering philosophy (a clipper + Oxford Inflator, limiter off for the mastering engineer) and his go-to plugins. Captions are clean (spoken breakdown, high confidence).

## Techniques
- **Get a groove up fast to write to.** At the end of a tired session, throw up a Splice loop, tweak it, and start writing — "no one cares about a techie tech-house loop, they care about the hook." You can always swap it later (he never did).
- **Rhythmic EQ automation to de-monotonize a loop:** notch out *every* frequency the loop's rim produces, then automate that EQ band in/out every 4 beats so the rim only sounds every other bar. Also pulled all the low frequencies out of the loop so his own kick could own the low end.
- **Classic Disclosure kick = all knock, no sub** — energy ~100 Hz, nothing at 50 Hz (old UK-garage kick) so it lives in the low [[BASS Slot]] not the [[SUB Slot]]. Laid over a bendy sub loop that owns the [[SUB Slot]], the kick + loop are "full" with no separate bassline needed. → [[Kick Design]], [[1 Drums Kick Track|Drums Kick Track]].
- **Auto-filter on a half-rate LFO to mask an unwanted hit** — a shaker landing on beat 1 was fixed by an LFO auto-filter that ducks just that beat.
- **Multiband compression on the lows so the kick pumps the bassy loop** — duck only the low band of the loop ([[SUB Slot]] / low [[BASS Slot]], below ~120 Hz) keyed off the kick with [[Pro-MB]], leaving the mids untouched. *(Starting point: one band < ~120 Hz, 3–4:1, fast attack ~5 ms, release to the groove ~80–120 ms, 2–3 dB GR, sidechain = kick.)* → [[Multiband Compression]], [[Sidechaining]].
- **Invent the clap in Battery** (jack-kick preset → 707 clap + snare + R&B rim) and **nudge it ~10–13 ms early** with Ableton's track delay so the transient hits before the kick — fakes hard compression; in-grid it sounds soft. "Nudge stuff slightly off grid if you want transients to poke through."
- **Two-synth lead that morphs:** melody written on **Diva** (u-he, the White Noise synth) with lots of glide; MIDI copied onto the **Korg MS-20 plugin** and driven so the filter/resonance self-distorts (raspy, Daft-Punk analog) + **Decapitator on Punish**. Layer the smooth and raspy versions and fade the filter up so one becomes the other. Dynamic EQ tames the raspy bits, [[Soothe2]] smooths.
- **Reverse-reverb lead-up:** MS-20 note through heavy reverb, reversed → swelling run-up.
- **Breaths instead of cymbal risers** for an airy, human transition (stolen from Joy Orbison ~2010).
- **Two-oscillator detune texture:** two osc on a Juno/System-8 detuned against each other + auto-pan — take the root note and tune it in/out against the track (classic "What's In Your Head" move).
- **Bass lives in the kick.** Added an **octave-up bass one-shot purely for phones/laptops** — the small-speaker test; it restores the 100–200 Hz [[BASS Slot]] warmth that's missing when only the [[SUB Slot]] kick carries the low end. → [[Referencing and Translation]], [[Kick Design]].
- **Anderson .Paak vocal chain (×3: mono center + L/R):** slight top EQ + compression → **[[Gem Dopamine]]** (brighten/de-ess, [[AIR Slot]]) → trim low end → **de-ess again** (safety) → flanger (parked at 0, ridden in) → **[[OTT]] at 23% depth** as subtle glue ("sounds like a G-bus comp") → compression → **[[Decapitator]]** → reverb/delay. Dry, upfront in the [[LEAD Slot]], clean. → [[3 Vocal Bus|Vocal Bus]], [[1 Main Vocal Track|Main Vocal Track]], [[Stereo Field]].
- **Manual de-essing** — chop and lower each harsh S by hand + a little timing alignment, rather than letting a de-esser phase things.
- **Pitch tricks:** pitched "let's get back to basics" up ~3 semitones for energy into V2; small chromatic word pitches; **Decapitator on 10** for the single hero "no cap."
- **Backing vocals:** AlterBoy formant-down on one, natural on the other (same take) → phasing width; flanger; **TAL Chorus** send to widen.
- **Loop the best lyric for the breakdown** ("turn up the vibe") and build tension by automating reverb, distortion, delay, and stereo width all increasing together; mute the reverb tail into the drop.
- **Mix for the club/CDJ, not Spotify** — mono, upfront, very dry; check on phone + laptop speakers.
- **Sends/buses:** reverb send = Valhalla + high-pass (no rumble) + sidechain; delay send = H-Delay, plus a second quick out-of-time stereo delay for throws; a chorus bus.
- **Current master chain = clipper + [[Oxford Inflator]] only** — no EQ, no compression. Clip peaks, Inflator does upward loudness; a heavily-oversampled clipper beats the old Oxford Limiter (which aliases) across a full mix. **Bypass the clipper/limiter when sending to mastering** (aim −10 to −6 dBFS). The **Oxford Limiter stays on the drum bus** for its forward-push distortion.
- **Drum-bus chain:** compressor → saturation → EQ → dynamic EQ on highs → Oxford Limiter.
- **Saturation is a whole-mix loudness plan** — enough saturation everywhere, then clip (the clip *is* saturation); tape on drums/bass, not the master.
- **Compress before or after saturation, by goal** — saturation shaves transients, so after a hard comp it buys headroom; before a smooth-vocal harmonic pass is fine too.
- **Go-to plugins (Q&A):** EQ = FabFilter Pro-Q; no single go-to comp (Pro-C for do-anything, LA-2A on vocals to brighten, SSL G-bus on drums/mix, 1176 on vocals/synths/mid-range); RBass for missing sub on bass guitar.

## Routed to
- Palette: [[SUB Slot]], [[BASS Slot]], [[TRANSIENT Slot]], [[MIDS Slot]], [[LEAD Slot]], [[Stereo Field]]
- Plugins: [[OTT]], [[Decapitator]], [[Gem Dopamine]], [[Soothe2]], [[Kickstart 2]], [[TAL-Chorus-LX]], [[Oxford Inflator]], [[Pro-DS]]
- Effects: [[Compression]], [[Limiting]], [[Multiband Compression]], [[Saturation and Distortion]], [[EQ]], [[De-essing]], [[Reverb]], [[Delay]], [[Modulation]], [[Pitch and Formant]]
- Techniques: [[Referencing and Translation]], [[Sidechaining]], [[Gain Staging]]
- Wishlist: Diva (u-he), Sinplant, Orchid, RBass — [[Plugin Wishlist]]

## Source
- [Disclosure - NO CAP Production Breakdown](https://youtu.be/kz5dmb3QdI8) · Disclosure · 1:55:14
- Transcript: [[Disclosure - NO CAP Production Breakdown (transcript)]]
- Caption confidence: high (spoken breakdown).
