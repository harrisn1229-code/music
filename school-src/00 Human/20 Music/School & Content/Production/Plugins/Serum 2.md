---
type: plugin
title: "Serum 2"
category: Instrument
vendor: "Xfer Records"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Serum 2

![[Images/Serum 2.png]]

**Category:** Instrument
**Vendor:** Xfer Records

## What it is

Xfer's flagship wavetable synthesizer, one of the most widely used modern synths for EDM, trap, pop, and sound design, with an intuitive wavetable editor.

## What it's used for

Modern electronic sound design across basses, leads, plucks, and pads — an industry-standard modern wavetable synth.

## FX chain notes

Used as the instrument source, often followed by saturation, EQ, and a limiter to manage its dense harmonic content.

## Techniques

- **A sustained-quarter-note sub-bass patch named "Base Subway," run alongside a separate live eighth-note bass** — a two-bass layering pattern used across the album. The sub is sidechain-pulsed via [[Kickstart 2]] even in a four-on-the-floor track, deliberately turning a static sustained note into a felt-more-than-heard rhythmic pulse. → [[Kickstart 2]], [[Sidechaining]], [[Layering and Stacking]] — Myles Smith / Peter Fenn (Tape Notes), [[TN 184 Myles Smith & Peter Fenn - Full Video Episode]]
- **Bell envelope shape: sine oscillator, short attack/decay, sustain pulled to zero, release raised** — starting from an init/default patch with a plain sine wave, an attack around ~1 ms and a short decay with **sustain all the way down and release brought up** is what reads as "bell" rather than a sustained tone — the envelope shape does the work, not the oscillator choice. Layer a pre-existing one-shot (attack stripped off so only its textural tail survives) into the **Sample engine** oscillator on top of the from-scratch sine layer for instant extra texture — Serum 2's Sample/Multisample engine is the direct match for this move (Pigments calls the equivalent "Engine 2"). Full recipe under Patch Recipes below. → [[Sound Selection Guide]], [[ValhallaDelay]] — loner, [these one shot secrets will transform your melodies!?](https://www.youtube.com/watch?v=TNLIX3Z4Ohk)
- **Sine wave + short plucky envelope + LFO→Coarse Pitch for a classic R&B "gun bass"-style pluck, recreating a 2005 Yin Yang Twins bass from scratch.** Simplest bass-design recipe in the set: (1) oscillator = plain **sine wave**, no wavetable drawing needed; (2) shorten the amp envelope's decay for a quick, plucky (not sustained) note shape; (3) map an **LFO to the oscillator's Coarse Pitch** knob so pitch **shifts quickly downward** right at the start of every note. The fast downward LFO pitch-drop on top of an otherwise plain sine is what reads as a "classic R&B bass" rather than a static sub — the same LFO→Coarse-Pitch idea as the fast-decay riddim-bass and gun-bass patches elsewhere on this page, applied here to a soft sine instead of a triangle/distorted-sine core. → [[BASS Slot]], [[Bass Design]], [[Sound Selection Guide]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
- **Load a vocal sample as a wavetable for granular-style manipulation a normal sampler can't do** — dropping a vocal recording into Serum's wavetable slot (rather than a Sampler) turns simple scrubbing/position modulation into granular-feeling texture; used as a core soundscape layer under a chorus hook rather than as a recognizable vocal. Don't expect a specific reference sound to reproduce exactly — the value was in what the granular texture turned into, not in matching a target. → [[Ear Candy and Hiding Synths]] — Flux Pavilion, [Never Gonna Be Alone Breakdown (17 Tips)](https://www.youtube.com/watch?v=C75vq9Wf7d8)
- **Co-modulate the Distortion unit's downsample amount AND mix together for a clean-but-alive "video-gamey" bass** — rather than a static bitcrush, automate/modulate both the downsample amount and the effect's dry/wet mix simultaneously on a sustained bass patch, keeping it "clean enough to have a good balance" while still giving the tone movement and character. Same modulated-downsample approach reused on a separately-composed final chord voicing for a cohesive chiptune character across a track. → [[Electro Funk-Hop]] — Max Konyi, [[Beat Breakdown - Groovy Electro Funk-Hop (one of my favourites!)|Beat Breakdown - Groovy Electro Funk-Hop]]
- **A short cluster-chord stab as a percussive melodic accent** — a brief Serum chord hit (voiced to match the surrounding harmony, e.g. a minor cluster) smacked on an accent beat right after a melodic phrase resolves; when its tail rings into the next chord change, fix it with the chord-tail crossfade trick (bounce the same hit twice, once per chord, and crossfade the tails) rather than shortening the hit. → [[Committing and Printing]] — Max Konyi, [[Jazzy LoFi Hip-Hop - Beat Breakdown]]
- **LFOs mapped as hand-drawable envelopes for a from-scratch kick** — instead of the normal ADSR, map **LFO1 → Level** and **LFO2 → Coarse Pitch** and hand-shape each LFO's curve directly — LFO2 forced **unidirectional** (Option+Shift+click) and curved downward gives the classic kick pitch-drop, LFO1's curve (top point dragged left, a point added at the bottom, curved up) gives the amp shape. Push the tone further with the wavetable editor: draw extra harmonic bars onto the base sine (bar height = overtone volume, position = frequency) for grit, then use the second row of bars — each harmonic's **phase**, functioning like a per-harmonic delay — to reshape the tone further without touching the harmonic amplitudes. Layer in the **AlphaNz** noise-table (LFO1 → its Level, routed through the filter via the N button) for a noise transient. Full "Boomer→Zoomer" recipe below. → [[Kick Design]] — You Suck at Producing, [5 Ways To Make Any Genre Sound 'Hyper'](https://www.youtube.com/watch?v=MFCiyKwWjeQ)
- **Draw harmonics directly into the wavetable editor, then Morph→Crossfade + LFO the WT Position for a dubstep "wub" bass.** Open the pencil/draw tool, select the **Sine** waveform type, and hand-draw individual harmonic bins — the top row of bins sets each harmonic's volume, the bottom row sets its phase. (Harmonic-series refresher: doubling the fundamental's frequency is +1 octave, tripling is +1 octave and a fifth — drawn harmonics at musical ratios build a chord-like tone from one oscillator.) Duplicate the oscillator first so a plain sine survives as a clean sub. Switch the draw panel to **Morph → Crossfade**, then map an **LFO** to the resulting **WT Position** knob so the oscillator continuously sweeps between the plain sine and the hand-drawn harmonic wave — the movement engine of the bass. Add Distortion afterward and re-tweak individual harmonics' phase for further tonal shifts. Widening (Hyper) the harmonic layer is fine, but high-pass it and keep the reserved sub oscillator on **Direct Out** (bypassing FX) so the low end stays mono and phase-coherent. → [[BASS Slot]], [[Bass Design]], [[Phaser-Flanger]] (the free "disperser" companion trick from the same video) — You Suck at Producing, [Make INSANE Dubstep Basses Just By Drawing!](https://www.youtube.com/watch?v=6tgjeG_6OvQ)
- **Fast-decay LFO mapped to Coarse pitch, for a kicky percussive knock on a plucky riddim-bass patch** — on a short, plucky triangle-wave patch (fast decay ramp on the amp envelope), duplicate that same fast-ramp shape onto **LFO1** and map it to oscillator A's **Coarse pitch** for a percussive pitch-knock at the start of every note; reused across a whole set of bass patches in the same track for a consistent "kicky" character. → [[BASS Slot]] — You Suck at Producing (Underbelly ft. San Holo), [How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs)
- **Hyper/Dimension with Hyper at zero — pure Dimension widening, no chorus-y "hyper" artifact** — Serum's Hyper/Dimension FX slot has two blended halves; pulling **Hyper all the way down** and leaving only **Dimension** active gives a cleaner width effect on an 808/bass without the more aggressive hyper-chorus character stacked on top. A free equivalent for non-Serum sources: Xfer's own **Dimension Expander**, a standalone free plugin from Xfer founder Steve Duda. → [[Plugin Wishlist]] — You Suck at Producing (Underbelly ft. Pixelwax), [Sound Design walkthrough of my new song with Pixelwax!](https://www.youtube.com/watch?v=IOc-lDT6_ZA)
- **The same patch, minus one modulation, becomes a different layer's sub** — a "gun bass" sub and a separate straight sub layer can literally be the same Serum patch, with **Auto Pan removed** from the second instance so it reads as a plain, thick, juicy sub instead of the modulated/moving version — a fast way to get a matched pair of layers (movement + anchor) without designing two patches from scratch. → [[Bass Design]] — Eli derp, [How To Make Insanely Phat Basses with @eliderp_](https://www.youtube.com/watch?v=8a84OhMSfzM)
- **Envelope 2 → Master Tune, for a whole-patch percussive "kick" on a gun bass** — mapping a fast envelope (Env 2) to the synth's **Master Tuning** (rather than a single oscillator's pitch) pitch-drops the *entire* patch — every oscillator at once — for a brief instant at the start of each note; without it the same patch reads as a plain sustained bass, with it the patch gains an extra percussive knock/kick that cuts through the mix. Credit: a technique from Eli derp, reused across his gun-bass patches. → [[BASS Slot]], [[Kick Design]] — You Suck at Producing (Underbelly), [Ableton Tricks I Learned From Remixing Mr. Bill](https://www.youtube.com/watch?v=xk8HsgS9Gbc)
- **Drag a percussive sample straight into the Noise oscillator slot for a "gun bass" transient layer** — instead of Serum's generic noise, load any hard, punchy one-shot ("crazy perk sound") directly into the Noise oscillator so that sample itself becomes the transient/attack layer, blended under a heavily-distorted sine-wave core for a "gun bass" — a from-scratch alternative to layering a separate transient track. → [[Sound Selection Guide]] — You Suck at Producing (Underbelly ft. San Holo), [How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs)
- **Draw custom harmonics directly into the wavetable editor** — open the oscillator's wavetable editor and hand-draw harmonic content (rather than picking a stock table) for a more character-laden, "screechier" tone, then pull back the harshest drawn harmonics by ear once the rest of the patch is built around it. → [[Operator]] (the equivalent hand-drawn-waveform technique on Operator) — You Suck at Producing (Underbelly ft. San Holo), [How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs)
- **Band-pass notch multi-filter with an LFO mapped to BOTH cutoff and frequency at once** — Serum's multi-filter set to the band-pass **notch** type, with a single LFO routed to both the filter's cutoff and its frequency parameter simultaneously, for a "wibbly wobbly" moving-filter glue pass on a distorted-sine "gun bass" layered with a sampled noise-oscillator transient. → [[BASS Slot]] — You Suck at Producing (Underbelly ft. San Holo), [How To Make WHOLESOME RIDDIM with San Holo](https://www.youtube.com/watch?v=sVpQB8yh9xs)
- **Global Time knobs — separate ones for envelopes and LFOs** — unlike single-Global-Time instruments ([[Wavetable]], [[Sampler]], [[Operator]]), Serum 2 splits this into **two** knobs: one scales all envelope rates, the other scales all LFO rates independently — worth knowing which knob to reach for depending on whether the goal is reshaping envelope-driven punch/pad character or LFO-driven movement/vibrato speed. → [[Wavetable]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)
- **From-scratch design home** — "I still feel the most comfortable and best-sounding in Serum... Serum sounds better [than Massive], so I try to just do it in Serum"; his "Dusty" pluck (BTS "Paradise") is a simple patch whose whole character is the noise oscillator — Lophiile, [Help Me Devvon interview](https://www.youtube.com/watch?v=-v7NEBcX830) & [Paradise breakdown](https://www.youtube.com/watch?v=L968H6x2sBY)

## Manual

- 🌐 [Official web manual](https://xferrecords.com/manual/serum-2/docs) — Xfer publishes Serum 2's manual as a web manual only; the PDF ("Serum 2 User Guide.pdf") ships **inside the install**, in the `Serum 2 Presets` folder (macOS: `/Library/Audio/Presets/Xfer Records/`). Copy it into `Production/Manuals/` from the production machine to complete this note.
- 📄 [What's New in Serum 2 (PDF)](https://static.xferrecords.com/Serum%202%20What's%20New.pdf) — the v1→v2 delta.

**High-level points:**
- Serum 2 adds whole new engine types per oscillator beyond wavetable — **Multisample/Sample**, **Granular**, and **Spectral** — it's no longer "just" a wavetable synth.
- Everything is drag-and-drop modulation: grab any mod source (LFO/env/velocity/macro) and drop it on any knob; the mod matrix is just the list view of what you dropped.
- The **Warp** menu is where wavetable movement lives (sync, bend, FM, RM, formant) — WT Position picks the frame, Warp mangles it.
- Serum 2 has a real **FX bus/routing system** — you can keep the sub clean while distorting everything else *inside* the synth.
- The wavetable editor (pencil/FFT bins, import-from-audio) is a first-class feature, not an afterthought.
- CPU discipline: unison voices multiply everything; per-osc oversampling ("quality") matters most on FM/sync patches.

## Used in my chains

A **wavetable synth source** (instrument, not an FX slot) — the modern go-to for designed basses, leads, and plucks:

- Reached for on [[1 Synth Lead Track|Synth Lead]] / [[1 Digital Bass Track|Digital Bass]] / [[1 Synth Bed Track|Synth Bed]] when a part needs a designed, moving wavetable timbre (vs. [[Drift]]/[[Operator]] analog/FM or [[Omnisphere]] organic).

## Key Parameters

```visual-key
image: Images/Serum 2.png
coords: Images/Serum 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

*Numbered badges on the image = the ① column in the table below.*

| #   | Parameter               | What it is / does                                 | Technique                                                                                                    | Artist / record example                                                            |
| --- | ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| ①   | WT Position             | Which frame of the wavetable playing              | Automate or LFO it — static position = static timbre; slow LFO → pad movement, envelope → pluck that "opens" | —                                                                                  |
| ②   | Warp                    | Per-osc wavetable mangler (sync/bend/FM/formant…) | FM-from-B + notch/bandpass filter movement = the classic bass-growl recipe                                   | Virtual Riot & KSHMR document this constantly in preset packs/streams              |
| ③   | Unison + Detune + Width | Voice stacking, pitch spread, stereo spread       | 6–7 voices, Detune ~0.10–0.18, Width ~80% = the future-bass/pop supersaw; keep subs at 1 voice mono          | Post-2014 future bass (Illenium-era) is essentially Serum unison saws into [[OTT]] |
| ④   | Sub Osc (direct out)    | Clean shape an octave down, can bypass FX         | Route sub direct-out so distortion only hits the mids — clean low end under a filthy mid bass                | Standard trap/EDM bass split                                                       |
| ⑤   | Noise Osc               | Sample-based noise layer, pitch-trackable         | Short-attack noise = transient click that makes plucks/keys cut on phone speakers                            | —                                                                                  |
| ⑥   | Filter + Drive          | Multi-type filter (analog, comb, formant…)        | Small envelope → cutoff amounts for pluck shape; comb filter for metallic trap textures                      | —                                                                                  |
| ⑦   | Env curves              | Assignable envelopes with draggable stage curves  | Fast attack + medium decay to WT position = "talking" attack transient                                       | —                                                                                  |
| ⑧   | LFO Trig/Env modes      | LFO as loop, one-shot envelope, or free-run       | LFO in Env mode drawn as a ramp = sidechain-style pump with no compressor                                    | The "fake sidechain" move, ubiquitous in EDM                                       |
| ⑨   | Macros                  | Performance knobs mapped to many params           | Map one "intensity" macro (detune+FX mix+cutoff), automate that in Ableton instead of 6 lanes                | —                                                                                  |
| ⑩   | Glide (mono legato)     | Pitch slide time between notes                    | Mono + ~60–120 ms glide = modern trap lead/808 slide feel                                                    | Ubiquitous in trap leads                                                           |

*Preset strategy lives in [[Instrument Preset Map]]; the FX-side twin is [[Serum 2 FX]].*

## Patch Recipes

From-scratch builds by **sound role** (slots defined in [[Sound Palette]]). Circled numbers = the matching row in the Key Parameters table above:

### 808 — [[SUB Slot]]
- Osc A: sine (Basic Shapes)
- ③ 1 voice, mono — **no unison ever**
- ④ Sub osc: off (the osc *is* the sub)
- ⑦ Amp env: instant attack, full sustain
- ⑦ Pitch knock: envelope → coarse pitch, +24 st, decay ~60 ms
- ⑩ Glide 60–80 ms, legato on (slides)
- FX: light tube Distortion (phone-speaker harmonics)

### From-scratch kick ("Boomer→Zoomer") — [[SUB Slot]] / [[TRANSIENT Slot]]
- Osc A: Basic Shapes sine
- ⑧ LFO1 → Level, curve hand-shaped for the amp envelope (top point left, extra point at bottom, curved up)
- ⑧ LFO2 → Coarse Pitch, unidirectional (Option+Shift+click), curved downward — the pitch-drop
- ⑥ Filter: drive cranked, ⑧ LFO1 → filter cutoff for movement
- Wavetable editor: hand-drawn harmonics for grit + phase row edited for further tonal reshaping
- ⑤ Noise osc: AlphaNz table, ⑧ LFO1 → Level, routed through filter (press N)
- FX: Distortion → Hyper/Dimension (width) → second Distortion (⑧ LFO1 → Drive) → filter Pre + high-pass → [[EQ Eight|EQ8]] (highs) → [[OTT]] (mono/glue) → [[Multiband Dynamics]] (re-add bottom, dip mids) → heavy distortion rack
- Finish: resample the kick, chop for glitch variations
- (general starting point — settings satirized/exaggerated in the source video; dial back for a usable kick)

### Dubstep/trap growl — [[BASS Slot]]
- Osc A: saw — ③ 2 voices, detune 0.08
- ② Osc B: any vocal-ish table, Warp: FM(A)
- ⑧ LFO1 → FM amount (the "talking" movement)
- ⑥ Filter: notch or LP Dirty — ⑧ LFO2 slow on cutoff
- ④ Sub osc → direct out (clean under the filth)
- FX: Distortion → [[OTT]]-style multiband → Hyper/Dimension
- Then: resample and re-mangle for movement

### Supersaw lead — [[LEAD Slot]]
- Osc A: saw — ③ 7 voices, detune 0.12–0.18, width ~85%
- Osc B: same, octave up, blend ~30%
- ⑥ HP filter ~140 Hz (stays out of the bass)
- ⑦ Fast attack
- FX: chorus OFF (unison ③ does it) → OTT after in Ableton
- The Illenium-era future bass chord machine

### Pluck — [[MIDS Slot|MIDS/COMP Slot]]
- Osc A: saw or square — ③ 1–3 voices
- ⑥⑦ Env2 → filter cutoff: fast decay ~200 ms, zero sustain
- ⑤ Noise osc: tiny click, short attack
- Space: verb on the send, not in the patch

### Synth bed — [[BED Slot]]
- Osc A: warm analog-style table — ③ 2–4 voices, slight detune
- ①⑧ Slow LFO → WT position (movement, not melody)
- ⑦ Amp attack ~800 ms–1.5 s
- ⑥ HP filter ~120 Hz
- ③ Width moderate — the bed sits *behind* the vocal ([[Stereo Field]])
- Swappable with an e-piano or [[Model 84 Polyphonic Synthesizer]] pad (same slot)

### Textured bell one-shot — [[TEXTURE Slot]] / [[BED Slot]]
- Osc A: Basic Shapes sine
- ⑦ Amp env: attack ~1 ms, short decay, **sustain to 0**, release raised — this shape IS the bell
- Sample engine: layer a pre-existing bell/bright one-shot, attack stripped off (texture tail only)
- FX: short untempo-synced delay (subtle grain, not an echo) → reverb (mono width, long pre-delay, ~35% dry/wet, size down) → wide/near-maxed detuned chorus for width
- Optional deeper pass: pitch-shift delay, dry/wet down, LFO synced ~2:1 mapped to dry/wet + a slow filter sweep, for an evolving "guitar pedal" texture
- Bounce to a one-shot: trim silence, fade in/out, save loop points (a shortened "ping-pong" loop blurs chord notes together)
- (general starting point — exact ms/percent values weren't given on screen) — loner, [these one shot secrets will transform your melodies!?](https://www.youtube.com/watch?v=TNLIX3Z4Ohk)

### Trap lead — [[LEAD Slot]]
- ⑩ Mono, legato, glide ~80 ms
- Osc A: square or saw — ③ 1 voice (thin is the point)
- ⑧ LFO vibrato with delay (fades in on held notes)
- Simple = sits; the 808 owns the bottom

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- Osc A: saw — ③ 4 voices, detune ~0.08, width ~50% (Juno-ish, NOT a supersaw)
- ④ Sub osc: square, 1 oct down, moderate
- ⑥ LP filter ~75% open, low res, touch of drive — **the brightness IS the forwardness**
- ⑦ Amp attack ~100 ms, full sustain (played chords, not a swell)
- FX: Serum's **Chorus ON, slow + deep** — the Juno move; skip Hyper/Dimension (mono-fold risk, [[Stereo Field]])
- Depth: drier than a normal bed — minimal send, no predelay = up front without extra level
- The [[Synthwave]] pad/stab; [[Model 84 Polyphonic Synthesizer]] does this natively if you want the real circuit hiss

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
