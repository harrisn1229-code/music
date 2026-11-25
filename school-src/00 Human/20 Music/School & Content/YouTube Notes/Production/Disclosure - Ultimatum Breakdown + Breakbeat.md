---
type: yt-note
date: 2026-07-15
source: youtube
url: https://youtu.be/uWe3UvI4KlU
channel: Disclosure
duration: "04:03:09"
video_type: production
music_enriched: true
transcript_source: whisper
tags: [yt-note, music, production, disclosure, house, vocoder, mixing, mastering, gear]
swept: 2026-07-19
briefed: backlog
---

![](https://youtu.be/uWe3UvI4KlU)
📺 [Watch on YouTube](https://youtu.be/uWe3UvI4KlU)

# Disclosure - Ultimatum Breakdown + Breakbeat

A 4-hr stream: a deep breakdown of **"Ultimatum"** (ENERGY's first single, ft. **Fatoumata Diawara**), then a casual Splice-breakbeat jam. This is the batch's richest **mixing / mastering / gear** reference: the definitive **Disclosure master-bus procedure** ("since Ultimatum"), a **500-series vocal-tracking chain**, the **Gem Dopamine "Dolby Trick,"** running a **whole vocal (and drums/claps) through a vintage vocoder**, **808 + pitch-envelope kicks**, the **comp→saturation transient-limiting order**, and **gain-staging by getting the drums to ~−8 dB**. Whisper transcript (no captions) — high confidence; long, with chat asides.

## Techniques

### Vocoder (the hook)
- **Run a *whole* vocal through a vintage Roland VP-330 vocoder + play the chords** — the noisy/lush vocoded-chord version alongside Fatoumata's real vocal is the main vibe. Vocoder chain: top-boost + roll-off → **Maag EQ4** (10k air) → **[[Gem Dopamine]]** → distorting H-delay ping-pong → **EMT 140** plate (sidechained). → [[Modulation]].
- **Send *anything* through a vocoder while playing chords** — claps and drums sent through it take on the chords/harmony ("instead of a clap you get a chord"); it thickens the drums and ties them into the song's harmony. A fun, reusable trick (also does it live with Jimmy Napes). → [[Modulation]].

### The "Dolby Trick" (Gem Dopamine)
- **[[Gem Dopamine]] simulates the "Dolby Trick"** (a tape-hiss-reduction move, lore says invented by Lennon) — a **high-frequency booster + de-esser in one**: the wet knob adds airy top, the compression knob de-esses so the S/T don't get harsh. The fast way to a clean airy vocal without stacking EQ + de-ess + comp. Think Mariah/Britney: tons of air, no ice-pick S's. → [[De-essing]], [[AIR Slot]].

### Drums
- **808 kick + a *pitch envelope* in Battery** — put a pitch envelope on an 808 to add (or subtract) the ~100 Hz "pop"/punch, turning it into a synth-tunable kick. 3-layer kick = click + crackle + big boom, each EQ'd to its role. → [[Kick Design]].
- **Battery multi-output routing + one-window kit habit** — 16 stereo outs (right-click sample → direct out); arrange the kit **low-freq at the bottom → highs at the top** so you always know where things are. **Use MIDI *velocity* for volume, not automation**, so a later fader move doesn't override your dynamics. → [[2 Drums Group|Drums]], [[Automation]].
- **An imperfect recorded rim over loopy shakers/tambourines** — a whole live take (SM7/58 on a snare) so every 2 and 4 differs, breaking up the loop repetition. → [[Sampling and Sound Selection]].
- **Ableton Rewire for warping** — bring stems into Ableton (better warp algorithms: **Pro mode for vocals, Beat mode for claps/transients**), use it as a playback device via Rewire, route outputs into Logic. → workflow.

### Synths & bass
- **[[Poly6]] unison detune + spread + ensemble** — the thing that makes it more than a Juno: it detunes the *oscillators in the synth* (a chorus/flange done in the synth, not as an effect). Only the cutoff is automated; a sawtooth pluck. → [[Poly6]].
- **[[Monark]] + a *real* Moog layered** — Monark set 303-like (sawtooth, octaves, no sustain, quick decay, cutoff/resonance ridden on the build); send the same MIDI to a real Moog on top for resonance/detune movement → "analog meets digi, best of both." → [[1 Digital Bass Track|Digital Bass Track]], [[Sound Selection Guide]].
- **Bass EQ: +50 Hz, −30 Hz, a bite boost up top; no separate sub needed** if the bass already throws out enough low. **DBX 160** for aggressive attack/finger-noise. → [[1 Digital Bass Track|Digital Bass Track]].
- **[[Ring Shifter]] for subtle movement** on an Oberheim pad; a **Wurlitzer** (not Rhodes) tracked through a Neve/EMI desk, Transient Master to cut between-stab noise, filter automation + tremolo + sidechain; a Rhodes layered on top for twinkle. → [[BED Slot]].

### Mixing order & the master bus
- **Compression → *saturation* (tape after the comp), not the reverse** — saturation clips/limits the transients coming out of the compressor with little audible change but a real peak reduction, so tape acts like a transient limiter after the comp. → [[Compression Staging]], [[Saturation and Distortion]].
- **The definitive Disclosure master bus** ("same since Ultimatum"): **SSL G-bus** (~2–3 dB; **HPF the sidechain so the bass doesn't over-trigger it**) → **Studer tape** (GP9) → **The Drama** S73 multiband (~60%, its air band as a *safety* band to catch anything poking out) → **[[Saturn 2|Saturn]]** → **[[Oxford Inflator]]** → **[[Soothe2]]** (master, to tame the tinnitus frequencies) → EQ (often *none* — left as a bypassed guide for the mastering engineer) → limiter (or leave it off for mastering). → [[Master Chain]].
- **[[Oxford Inflator]] as glue on *buses*, not every channel** — on the BV bus and drum bus it makes the parts interact/have character; a 3-band psychoacoustic lift. → [[Master Chain]].

### Gain staging & mastering hand-off
- **Gain-stage from the drums: get them out at ~−8 dB (lightly limited), then build everything around that** — bass, pads, vocals fall into place and you arrive at the master with healthy headroom. Keep the master fader at 0; peaks ~−8 to −10. → [[Gain Staging]].
- **Never limit before mastering** — send a clean 24-bit WAV at −6 to −10 dB with headroom; a track already smashed to 0 leaves the engineer nothing to work with (they normalize + limit + dither, and hear limiter differences you can't). → [[Master Chain]].
- **44.1 kHz is fine for dance music** — there's already plenty of top end, and everything bounces to 44.1/16-bit for streaming anyway; save 96/192 for orchestral sparkle. → [[Referencing and Translation]].

### Vocal-tracking chain (500-series)
- **Neve 1073/1084 preamp (treble boost, roll a little bass) → LA-2A ("one-LA": threshold + gain only, *harder you hit it, higher the ratio*) → Maag EQ4 → Logic.** The **Maag air band boosts up to 40 kHz** — the *slope* toward it gives a beautiful brightness even though the ear tops out ~20 kHz. Reach for the LA-2A on tracked vocals/guitar for shine. → [[De-essing]], [[Compression]].

### Monitoring & referencing
- **Sit where the bass is** — pull the desk to the center of the room and walk around to find the most neutral spot *before* treating; DIY panels mostly kill echo, not balance. Small rooms help. → [[Gain Staging]].
- **The learning story:** mixed all of *Settle* on flat Tanoy monitors + a car (a Polo with a Halfords boot sub), A/B-ing his song against favorite reference tracks until they matched — took ~3 months. Reference against tracks you love, on the systems people actually listen on. → [[Referencing and Translation]].

### Breakbeat jam (quick tips)
- **Transient-Master *sustain* to build the reverb/movement inside a break sample** (reinforces [Never Enough](https://youtu.be/lGopQwQo9Ag)); **Logic swings better, Ableton warps better**; "**if in doubt, nick a breath**" (a sampled/reversed breath as a transition); demo bounce ~−4/−5 dB limiting ("can't hear it working, but it's loud in the car"). → [[Sampling and Sound Selection]].

## Routed to
- Palette: [[SUB Slot]], [[BASS Slot]], [[BED Slot]], [[LEAD Slot]], [[AIR Slot]]
- Techniques: [[Compression Staging]], [[Gain Staging]], [[Sampling and Sound Selection]], [[Automation]]
- Effects: [[Modulation]], [[Saturation and Distortion]], [[De-essing]], [[Compression]]
- Plugins: [[Gem Dopamine]], [[Poly6]], [[Monark]], [[Oxford Inflator]], [[Soothe2]], [[Saturn 2]], [[Ring Shifter]]
- Chains: [[Master Chain]], [[1 Digital Bass Track|Digital Bass Track]], [[2 Drums Group|Drums]] bus
- Sound Selection Guide: Poly6 unison-detune, Monark + real Moog, VP-330 vocoder, 808+pitch-envelope kick
- Vintage: [[Roland TR-808]], [[Roland TB-303]], [[Roland Juno-106]]

## Source
- [Disclosure - Ultimatum Breakdown + BREAKBEAT (Twitch Production Tutorial)](https://youtu.be/uWe3UvI4KlU) · Disclosure · 4:03:09
- Transcript: [[Disclosure - Ultimatum Breakdown + Breakbeat (transcript)]]
- Transcript source: **Whisper (base)**, no captions · confidence high (song = "Ultimatum" ft. Fatoumata Diawara; Whisper sometimes labels the session "Marley Marley").
