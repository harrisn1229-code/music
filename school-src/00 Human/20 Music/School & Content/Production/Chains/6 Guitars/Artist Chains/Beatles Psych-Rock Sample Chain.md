---
type: chain
title: Beatles Psych-Rock Sample Chain
reference: The Beatles / psych-rock era — a from-scratch vintage sample-flip build
chain_type: style
family: guitars
status: reference
tags: [chain, guitar, bass, style, sampling, vintage, 60s, beatles]
---

# Beatles Psych-Rock Sample Chain

**Reference/vibe:** a full period-accurate psych-rock "sample" built from scratch (not sourced from a real record) — a Fender Stratocaster guitar and a Höfner violin-bass replica processed to sound like a genuine 1960s/70s recording, using real research into the actual gear the Beatles and their contemporaries used rather than a generic "vintage" preset. Reverse-engineered from a loner (YouTube) breakdown, [these 1960's production secrets will change the way you make samples!?](https://www.youtube.com/watch?v=Ngz_fZraTP4). Nate owns the two lead instruments this chain is built around: [[Fender Stratocaster]] and [[Hofner B-Bass H-Series]].

## Chain overview

Two parallel instrument chains (guitar, bass) built on real-gear research, finished with hard L/R panning to opposite sides so the two elements "fill both sides" of the stereo field rather than competing for the same space — the video's own stated first lesson from studying the era.

## Guitar chain

### 1. Amp sim
- Owned equivalent: [[Morgan Amps Suite]]. Source video used Stark (Klevgrand, unowned — see [[Plugin Wishlist]]): "British Guitar A1" amp model, voiced to Drive, "Wide Large" cabinet preset, **built-in reverb turned OFF** (a dedicated reverb stage handles that later in the chain).

### 2. Vibrato pedal
- The pedal, not the amp, is called out as the more important element for the psychedelic character. Owned equivalent: [[Modulation]] (Ableton [[Chorus-Ensemble]] / [[kHs Chorus]] in a slow, shallow vibrato-style setting — no dedicated stock vibrato pedal; a slow LFO-driven pitch wobble is the general substitute).

### 3. Artificial Double Tracking (width)
- Waves Real ADT in the source (unowned, see [[Plugin Wishlist]]) — a guitar-widening use case for ADT, distinct from ADT's usual vocal role. Owned equivalent: [[Doubler2]] or [[MicroShift]], see [[Artificial Double Tracking (ADT)]] for settings.

### 4. Reverb — Abbey Road Chambers
- Chosen specifically because the Beatles tracked at Abbey Road Studios — a historically-motivated pick, not just a good-sounding chamber. Owned equivalent: [[ValhallaVintageVerb]] (1970s Color, Chamber-family mode) or [[ValhallaPlate]].

### 5. Tape delay
- Arturia tape delay in the source (unowned, see [[Plugin Wishlist]]). Owned equivalent: [[EchoBoy]] or [[Kramer Tape]] feeding [[Echo]].

### 6. Compressor
- "Just to tighten the sound up" — general starting point, no exact ratio/threshold given. Owned: [[Glue Compressor]] or [[API-2500]].

### 7. Vintage-mic emulation
- Waves King's Microphones, "King George V" model, 3rd preset — explicitly to compensate for period mic quality, not for character alone. No owned direct equivalent; closest is [[UAD Century Tube Channel Strip]] or [[UAD Neve 1073]] driven for coloration ahead of an EQ roll-off (see stage 8).

### 8. Finishing EQ
- Cut the low end, boost some of the highs. Owned: [[EQ Eight]].

### 9. Pan + width collapse
- Hard-pan to one side (right, in the source) and collapse to almost fully mono. Owned: [[Utility]] (Width near 0) + track Pan.

## Bass chain

### 1. Instrument
- Höfner 500/1 violin bass. Owned real instrument: [[Hofner B-Bass H-Series]] — DI or mic'd through [[Fender Blues Junior]] per its own note. Source video used a plugin replica ("Moto Bass," near-certainly IK Multimedia MODO Bass — unowned, see [[Plugin Wishlist]]) since a hardware Höfner wasn't tracked live for this build.

### 2. Play style
- Finger-picking, muted 100% — the damped/muted setting is what reads as period-correct (short, thumpy McCartney decay, not a ringing sustain).

### 3. Amp
- Fender Bassman replica (AmpliTube in the source — unowned, see [[Plugin Wishlist]]). Real Fender Bassman amps were the Beatles' actual bass amp.

### 4. Compression
- Waves CLA-76 (unowned, see [[Plugin Wishlist]]), described as heavy compression. Owned equivalent: [[UAD UA 1176LN]] or [[UAD Tube-Tech CL 1B mkII]].

### 5. Vintage mic roll-off
- Applying a ~100 Hz high-pass (matching the natural roll-off of many period microphones) to the bass specifically was singled out as giving "so much more of a natural feel" — a general lesson worth applying beyond just this chain. → [[EQ]], [[Vintage Gear Worklist]].

### 6. Pan (opposite the guitar)
- Panned opposite the guitar for the "fill both sides" effect — kept closer to center in practice on a real mix (bass, unlike the guitar, usually needs to stay mono-safe/centered for low-end translation — see [[Width and Stereo]]'s low-end-mono rule), but the source video panned it as part of the same wide-stereo demo.

## Arrangement

**Where it sits:** guitar hard-panned to one side and collapsed almost to mono; flute panned **opposite**, also near-mono; bass center; vocals pushed back. That opposing-pair placement is the arrangement — see [[60s - Beatles]] § Arrangement and [[Stereo Field]].

**When it plays:** period logic — parts enter on overdub passes and stay. The *Blue Jay Way* move is the one real structural stunt: bounce the vocal, reverse it, and chop two sections back in as **lead-ins** to sections.

**The move — fill both sides with different things.** Stated directly in the source: dramatic hard-panning of individual instruments, not stereo widening, is what fills out a mix. Density stays low; placement carries it.

## Notes

- **Real-gear research first, plugin second:** the video's whole method is "find out what the actual period instrument/amp/mic was, then either use it (if owned) or find the closest replica" — worth following literally here since Nate owns both lead instruments the video is built around.
- **Order matters on the guitar side:** amp → pedal (vibrato) → width (ADT) → space (reverb) → time (delay) → dynamics (compressor) → color (vintage mic sim) → tone (EQ) → placement (pan) — color/movement before space/time, dynamics/tone/placement last.
- No exact plugin settings (drive amount, vibrato rate/depth, ADT detune/delay, reverb decay, compression ratio) were shown on screen in the source video beyond the presets named above — treat every device's setting as a starting point to dial in by ear.

**Sources:** loner — [these 1960's production secrets will change the way you make samples!?](https://www.youtube.com/watch?v=Ngz_fZraTP4) (00:08:04, 2022-06-12) · full note: [[loner - these 1960’s production secrets will change the way you make samples!?]]
