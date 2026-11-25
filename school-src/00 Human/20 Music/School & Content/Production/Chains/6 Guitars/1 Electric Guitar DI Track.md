---
type: chain
aliases: ["Electric Guitar DI Track"]
title: Electric Guitar DI Track
chain_type: track
family: guitars
source: di
guitar: Fender Stratocaster
routing: Electric Guitar DI → Guitar Group → Guitar Bus → Master
uad_console: [UAD UA 610-B (Unison), UAD 1176LN (bypass), UAD Pultec EQP-1A (bypass)]
signal_chain: [Morgan Amps Suite, Pro-Q 4, Ghz Tupe 3, Ghz Tone Control 3, UAD UA 1176LN Rev E]
status: default
tags: [chain, guitar, track]
---

# Electric Guitar DI Track

**Role:** DI'd [[Fender Stratocaster]] — the flexible lane (re-ampable forever, no mic bleed, silent tracking). Two sub-lanes: **amp-sim** (Archetype does the amp's job) and **no-amp-sim** (preamp character in, EQ in the box — Kenny's current default).

**Chain philosophy:** amp sim → corrective EQ → color → tone → comp. Identical logic to [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]] once the "amp" exists — the sim replaces amp+mic+room, everything after treats it like a mic'd source.

## 1 — Recording Setup

- **Clean signal in > expensive guitar** — "a really cheap guitar with a really, really clean signal — processing it and making it sound great doesn't even matter." Fresh-ish strings, **tune BEFORE the effects**, direct into the [[Universal Audio Apollo Twin MkII]] Hi-Z input — Kenny Beats, [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ).
- **Pedals-into-DI is a legit lane:** comp pedal first (Dyna Comp-style squash, "very slept on") → dirt → straight into the preamp. **Fuzz straight DI, no amp** — a Big Muff-family fuzz ([[Big Muff Pi]]) direct into the preamp "sounds amazing" — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk).
- **Latency:** buffer ~128 while tracking; if monitoring through the sim in Ableton, arm a ghost latency track ([[Latency-Free Tracking]]).
- Levels: peaks −12 dBFS, ~−18 average ([[Gain Staging]]).

## 2 — Tracking Best Practice

- **Record the clean DI even when monitoring through a sim** — re-amp forever; no comp/EQ printed (the sim wants raw dynamics).
- **Stack immediately for width:** same part twice, panned opposite (35–50 L/R), then a **contrasting layer** on a different patch/color — Kenny's guitar-sample move. Never copy-paste a take.
- **Treat the finished loop like a SAMPLE** — pitch it, chop it, "f*** it up"; recording your own guitar loop = sample-flip freedom with zero clearance — [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ) → [[Sampling and Sound Selection]]. This is the comp-tool lane.
- **Mono per take;** width comes from the stacked takes, not wideners.

## 3 — Source → Ableton (UAD Console)

### 1. [[UAD UA 610-B]] — Unison preamp
- Clean for the amp-sim lane · **Alt for the no-amp-sim lane: [[UAD Neve 1073]]** driven a touch — Kenny's current default is "DI through a preamp or old mixer for character, then EQ in the box"; the 1073's iron is that character here.

### 2. [[UAD UA 1176LN]] — bypass
- The amp sim wants the raw dynamic signal; compressing before a sim changes how the "amp" breaks up.

### 3. [[UAD Pultec EQP-1A]] — bypass
- Or low ATTEN @ 60 Hz only.

## 4 — Ableton Initial Processing

### 1. [[Morgan Amps Suite]] — Amp + cab
- Neural DSP's Morgan Amplification suite — boutique, low-watt voicings built on **chimey clean headroom** and touch-sensitive edge-of-breakup (the AC-style shimmer through a Strat is the sweet spot). Pick the amp voicing for the part (①): **gain low for sparkle, up for crunch** (②).
- Light **boost/OD in front** (Klon/TS-style) for lead thickness — keep it subtle on clean parts.
- Open the **cab section** — two movable mics (ribbon + dynamic, or dual 57s), same speaker-position logic as a real cab.
- Use Neural's **output section** (doubler for an instant hard-L/R double; reverb/delay pulled back) · master out ~0 VU.
- **Why:** The sim is the sound source, not an effect — first in chain, unprocessed DI in.
- **No-amp-sim lane: skip this stage entirely** — the [[UAD UA 610-B|610-B]] character from §3 + EQ below is the whole tone (Kenny: "lately I'm not using Guitar Rig or Neural DSP — real amp or preamp, then EQ it").
- *(**Stopgap** — Nate owns [[Archetype- John Mayer X]], it's just not installed yet. Once installed, revert this stage to it: Morgan is a clean/boutique lane and won't do the Dumble-style singing lead the JM plug does. `signal_chain` head → `Archetype- John Mayer X`.)*

### 2. [[Pro-Q 4]] — Corrective EQ
- HPF 70–100 Hz · cut 200–350 mud · narrow-cut fizz 3–6 kHz (sims fizz more than real cabs)
- Stacking layers? Shelf the ~**15 kHz** super-highs per layer — stacked DI top-octave junk becomes "white-noise ringing" — [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ)

### 3. [[Ghz Tupe 3]] — Tube glue
- **Tube 20%** (① — low drive) · **Tilt neutral** (②) · **Mix 100%** (④)
- **Why:** sims can feel sterile; tube nonlinearity puts air molecules back. (Thin-DI first-aid: this + 1073 drive is the owned CLA Guitars.)

### 4. [[Ghz Tone Control 3]] — Broad seat
- **Tilt** (⑤) darker/brighter against the vocal and the mic'd guitar — e.g. Treble −1.5 dB (③) here if the DI is the bright lane — carve the two guitar lanes apart when both are in the song.

### 5. [[UAD UA 1176LN]] — Compression
- 4:1 · slow attack, medium-fast release · 2–4 dB GR — same reasoning as the amp track.

## 5 — Track FX (optional)

- 🎬 **Reverse-guitar intro swell + [[ValhallaDelay]] Pitch mode** — record a reverse guitar part copying the same chords as the main synth part (Weeknd "Escape From LA"-style intro), then run it through **ValhallaDelay with Pitch mode selected specifically** (not tape/digital) for extra shimmering high-end texture on the swell before the beat drops. → [[ValhallaDelay]], [[Depth and Space]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)
- **The "Jai Paul" guitar-sample chain** — swap stages 1–5 for: [[Guitar Rig 7 FX|Guitar Rig]] funky patch → [[RC-20 Retro Color]] (variant: + very short room verb, Flux-chorus preset with wobble pulled down, widener — [[Doubler4]]/[[Width Send]]). The instant lo-fi-funk loop tone — Kenny Beats, [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ)
- **[[Chorus-Ensemble]]** low-mix on clean funk parts.

## 6 — Bus / Send FX (optional)

Routing: **Electric Guitar DI → [[2 Guitar Group|Guitar Group]] → [[3 Guitar Bus|Guitar Bus]] → [[Master Chain]]**.

- Sends same as [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]: [[Reverb Send Room]] to place · [[Delay Send Other]] for leads · [[Width Send]] only when a real double isn't available.

## Variations

- **Clean pop/funk DI (no amp):** Pro-Q → [[Pro-C 2]] (fast, 4–6 dB) → [[Chorus-Ensemble]] — the Nile Rodgers/city-pop lane.
- **Ambient/washy:** Archetype clean channel → heavy [[Reverb Send Long]] + [[ValhallaShimmer]] insert at low mix.
- 🎬 **Print-and-repurpose: consolidate a fully-processed melodic guitar part, then reverse + chop it into a SECOND, unrelated ambient texture layer.** After the melodic chain finishes (AmpliTube "clean" → valve comp → Cassette crunch → second amp preset for presence), bounce/consolidate to audio, then reverse and chop the print on a new track; filter it super ambient (low+high cut) → heavy vintage reverb (mix heavy, decay down, size a touch smaller) → half-time — the result "almost sounds like a vocal." Owned: [[UAD Tube-Tech CL 1B mkII]] (valve comp), [[Cassette]], [[EQ Eight]] (filter), [[Reverb]] (vintage verb), [[Automation]] (half-time). → [[Sampling and Sound Selection]], [[Depth and Space]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **Wall-of-fuzz commit:** [[Big Muff Pi]] → 1073 (no sim, no cab) — print it.

## From videos

- **Interface gain-staging rule for guitar DI: avoid clipping the input, but don't set gain so low the amp sim/modeler is starved of signal** — an amp-sim stage expects a certain input level to "function properly," so under-gaining changes its behavior, not just its loudness. **Always record the DI in parallel with the amp/Kemper signal**, via an active DI box (20 dB pad used here) with a link/thru output feeding the amp sim/Kemper simultaneously onto a second interface channel — two stated reasons: full re-ampability if the chosen tone doesn't work out later, and a high-gain amp tone obscures exactly where a note's timing/accent falls, so the clean DI makes rhythmic mistakes far easier to hear and fix. **Tone-dialing workflow, zero-up not high-down:** start amp-sim/Kemper gain at zero and work up until it suits the playing, rather than starting hot and pulling back; named mistakes to avoid are too much gain ("just mud") and scooping all the mids (mids are "where all the meat is" of a guitar tone and scooping undermines sitting in a mix); keep every knob move small — "if you have to do really big moves, probably something in the chain isn't suited for the sound you're after." An overdrive pedal run with its OWN gain at zero works as a pre-EQ stage (tightens/compacts the DI signal before the amp sim) rather than as added distortion. → [[Gain Staging]] — BERNTH feat. Daniel Fellner, [[4 BEST HOME RECORDING TRICKS! - Dialing In Your Perfect Guitar Tone]]

- **Run compression UNLINKED (dual-mono) to fix a right-heavy stereo signal — each channel gets its own detector, so the louder side is hit with more gain reduction and the two even out, without manual gain-riding.** "So hitting it with mono, which means you know, the left and right channel operate with their own brand through this threshold, and this was a right-heavy signal, so I'm hitting the right side with a little more compression, this is evening them out ever so slightly." Paired with a static EQ pass on the same track: a resonance pulled down ~2 dB, more midrange presence, reduced hiss, boosted low end. On a separate synth-guitar hybrid track, only light compression control was applied, EQ present but inactive — a reminder that "already sounds pretty rad" is a legitimate stopping point. → [[Width and Stereo]], [[Compression]], [[Sound Selection Guide]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Consolidate/reverse/chop a fully-processed melodic guitar print into a second ambient texture layer, filtered and vintage-reverbed until it "almost sounds like a vocal"** — see the inline 🎬 note in Variations above. → [[UAD Tube-Tech CL 1B mkII]], [[Cassette]], [[Reverb]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **Reverse-guitar intro swell + ValhallaDelay Pitch mode for extra high-end texture, sourced** — see the inline 🎬 note in §5 above. → [[ValhallaDelay]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)
- **Lead-guitar chain: analog mixer drive → [[Guitar Rig 7 FX|Guitar Rig]] amp sim → a tape plugin for breakup, A/B'd with/without to show how much of the "amp" character was actually coming from the tape stage, not the sim alone** — a concrete demonstration that a tape/saturation stage after an amp sim isn't optional coloring, it's doing real character work; worth A/B'ing the tape stage on/off on any amp-sim lead to hear how much it's actually contributing. → [[Ghz Tupe 3]], [[Saturation and Distortion]] — Zach Scholz, [I Tried Recording a Song Like It's 1976](https://www.youtube.com/watch?v=6kA1mWeTiZc)
- **Mid-song effect switch as an arrangement move, not a whole-song setting** — switching a pedal/effects unit on specifically for one section (a guitar swell mid-tune) then back off, rather than committing an effect to the whole part — a reminder that a track FX stage can be automated per-section rather than fixed to a single choice for the entire take. Also stacked a touch of tape echo on the same lead part. → [[Automation]] — Zach Scholz, [I Tried Recording a Song Like It's 1976](https://www.youtube.com/watch?v=6kA1mWeTiZc)
- **Chromeo's own account confirms the "Nile Rodgers lane" above is the real Chic/Bob Clearmountain technique** — guitar straight into a preamp, zero amp, flat EQ and zero compression on the raw DI ("it already sounds kind of punchy... punchier than when you go through an amp"), pickup position 2 (bridge+middle "quack"), THEN a heavy compressor pass to exaggerate the percussive attack — matches the Pro-Q → [[Pro-C 2]] → [[Chorus-Ensemble]] variation almost stage-for-stage. Clean direct with no compression at all is also a legitimate end tone, not just a step. — Sol State, [Get Chromeo's Guitar Sound in 5 Min.](https://www.youtube.com/watch?v=bj2dWuFYzMQ)

## Sources

Kenny Beats — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk) · [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ) · Guitar World — Archetype walkthrough (link in [[FX Chain System]]) · Zach Scholz — [I Tried Recording a Song Like It's 1976](https://www.youtube.com/watch?v=6kA1mWeTiZc)
