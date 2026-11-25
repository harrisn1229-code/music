---
type: plugin
title: "Operator"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Operator

![[Images/Operator.jpg]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's FM/subtractive hybrid synth with four operators, each switchable between multiple oscillator algorithms, plus a filter and modulation section.

## What it's used for

FM basses, electric-piano and bell tones, aggressive leads, and classic FM-style sound design without needing a dedicated FM synth like Native Instruments FM8.

## FX chain notes

As the instrument source, often followed by an EQ to control harsh FM overtones and a chorus/delay send to add width.

## Techniques

- **Automate an FM tuning parameter to shift the lead's timbre up then back down darker, as a pre-drop tension cue.** Rather than changing the sound design or the played note, automate a tuning-related FM parameter (e.g. Coarse/Fine on the relevant oscillator) across a buildup so the tone's perceived pitch/brightness rises slightly then settles back down darker heading into a section change — just the timbre moving, giving the listener "a bit of suspension until the next part hits." The same idea maps to other synth types when the lead isn't Operator: automate wavetable position on a wavetable synth, or filter cutoff on a purely subtractive one. → [[LEAD Slot]], [[Arrangement and Song Form]] — Pick Yourself, [3 transition techniques pros use instead of risers](https://youtu.be/05A0Ez0IWAE)
- **Offset Oscillator B's Phase (~30) for an instantly "heavier" 808, no other parameter change** — on an 808 built from a Tetris-shape patch where Oscillator B (sine, Coarse 2) modulates and adds harmonics to Oscillator A's pure sub, nudging **Oscillator B's Phase** to roughly 30 (away from its default alignment) makes the same patch read as noticeably heavier/weightier — a small, easy-to-overlook knob worth checking on any FM 808 before reaching for EQ or saturation to add weight. Add Oscillator C for a few more harmonics on top once the core two-oscillator sub+FM-harmonic pairing is dialed in. → [[Bass Design]] — You Suck at Producing (Underbelly ft. Pixelwax), [Sound Design walkthrough of my new song with Pixelwax!](https://www.youtube.com/watch?v=IOc-lDT6_ZA)
- **A plain sine-wave chord (no FM) + LFO → Oscillator B Level + Auto Pan for a full "wobble chords" layer** — strip everything back to Operator's simplest sound: a bare sine wave playing a full chord (an F minor triad with a half-step passing move at the end, in this example) rather than an FM patch. The wobble comes entirely from modulation, not the oscillator: map an **LFO to Oscillator B's Level** so harmonic content pulses in and out as the LFO cycles, then add **Auto Pan** synced to quarter notes with **Amount maxed** and **Phase pulled to 0** for a hard, rhythmic stereo wobble on top. A simple source plus two modulation layers reads as a much more complex "wobble" sound than the raw patch suggests. → [[Auto Pan]], [[Chord]] — You Suck at Producing (Underbelly), [Ableton Tricks I Learned From Remixing Mr. Bill](https://www.youtube.com/watch?v=xk8HsgS9Gbc)
- **Detune-based "wiggle" wobble before reaching for the LFO — then a tempo-synced LFO→Volume routing for the pulse itself** — on a square-algorithm patch (osc B modulates A, osc D modulates C), turn oscillator B's level down (~−30) to tame the raw FM tone, then push **Fine** on both oscillators to a matched amount (~20) for an analog-style detune "wiggle" before any LFO gets involved; the rhythmic wobble itself comes after, by routing the LFO's destination to **Volume** instead of pitch and syncing its rate to the track tempo (~124 BPM here) — the classic dubstep pulse layered on top of the detune wiggle, not a substitute for it. → [[BASS Slot]], [[EDM Subgenres]] (Dubstep) — You Suck at Producing, [The Most Slept On Ableton Synth for UK Dubstep](https://www.youtube.com/watch?v=vLsEQAxir1o)
- **Mono voices + glide + deliberately-overlapping notes = a portamento call-and-response bass** — set Voices to 1 and raise Glide time, then in the piano roll let consecutive notes overlap slightly (rather than butting them end-to-end) so each new note glides/pitch-bends out of the previous one instead of re-triggering cleanly — used to write a "dialogue" between two alternating Operator bass parts. Pair with the **horizontal-line algorithm** (all 4 oscillators independent, no cross-modulation) for a second, cleaner-toned bass voice contrasted against an FM-heavy square-algorithm lead bass. → [[Bassline Writing]] — You Suck at Producing, [The Most Slept On Ableton Synth for UK Dubstep](https://www.youtube.com/watch?v=vLsEQAxir1o)
- **A slow, deep pitch envelope for a downward bend/growl tail, not just an attack "knock"** — Coarse pushed to 12 on an oscillator (past the growl range documented below), its own envelope faded in over ~3 seconds with sustain up for harmonic bloom, then the separate pitch envelope pulled fully down with a long decay (3–4 s) for an audible pitch-bend-*downward* tail — a distinct application from the fast percussive attack-knock covered elsewhere on this page. → You Suck at Producing, [The Most Slept On Ableton Synth for UK Dubstep](https://www.youtube.com/watch?v=vLsEQAxir1o)
- **Velocity-tracked filter envelope amount, for a bass that snarls harder on accented notes** — set the filter envelope's velocity-sensitivity control high so playing dynamics directly change how much the filter envelope moves the cutoff — a distinct modulation axis from **Center Frequency** (which key-tracks cutoff to the played note's *pitch*, not its velocity). Useful on a dubstep bass patch to add expressive bite without any external dynamics processing; protect the sub with [[Multiband Dynamics]] as the *first* sound-design step on a patch like this, not only right before a later [[OTT]] pass. → [[Multiband Dynamics]], [[OTT]], [[EDM Subgenres]] (Dubstep) — dnksaus, [Make HEAVY Dubstep Basses with Operator](https://www.youtube.com/watch?v=PFmBcZujMwk)
- **Laser SFX: a fast pitch-envelope knock into Shifter's Coarse, then Redux + circular Auto Pan for a "video-game" character** — build a quick laser/riser element on an Operator patch by adding an [[Envelope MIDI]] device and shaping its **pitch envelope with the Peak around 48** for a fast pitch-drop-style sweep (save that envelope shape for reuse elsewhere in the same chain); a filter envelope can shape the tone the same way. Follow with [[Shifter]] and a second [[Envelope MIDI]] mapped to modulate Shifter's **Coarse** parameter across roughly a 50–100 range for a moving pitch-shifted layer, then compress. Resample once it's dialed in, then run the resampled hit through **[[Redux]]** (turn the sample rate down, add some jitter) for a lo-fi "video game" character, and a **[[Auto Pan]]** set to circle continuously for extra spatial depth; roll off some top end with a filter/EQ to taste. Used as a background laser layer in a G Jones-style jungle/rave-inspired dubstep track. → [[Envelope MIDI]], [[Shifter]], [[Redux]], [[Auto Pan]] — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **A full-sawtooth FM modulator with Coarse-punched "gaps," for an abrasive harmonic cluster** — set the modulator oscillator (B) to a full sawtooth (every harmonic present) and the carrier (A) to a plain sine, then bring A's level to 0 and B's level up so B's FM output IS the audible signal — the sine carrier gets bombarded with the sawtooth's full harmonic content. Raising B's **Coarse** (e.g. to 2) then punches deliberate gaps into that dense harmonic cluster rather than just shifting it, for a more abrasive, comb-filtered-sounding texture than a plain saw-into-sine FM pair. Confirms the underlying lesson elsewhere on this page: sine = only the 1st harmonic, square = only odd harmonics, sawtooth = every harmonic at full — any waveform is just a specific harmonic recipe, hand-drawable or achievable via FM. → [[Wavetable]] — You Suck at Producing, [Why Ableton's Operator is Better than Serum (for FM)](https://www.youtube.com/watch?v=p60y3Y3dE3M)
- **Stagger independent ADSR envelopes on the carrier and modulator oscillators, so the FM harmonic content blooms over the note instead of sitting static** — give the modulator oscillator its own envelope (e.g. Attack ~220 ms, Sustain 0, Decay ~550 ms) distinct from the carrier's (e.g. Attack ~24 ms, Sustain 0, Decay ~500 ms) — because Sustain is 0 on both, the modulator's harmonic contribution fades in and back out on its own timeline relative to the carrier, so the tone's harmonic density genuinely evolves across the note rather than being a fixed FM ratio. → [[Wavetable]] (the general envelope-shapes-timbre-over-time principle) — You Suck at Producing, [Why Ableton's Operator is Better than Serum (for FM)](https://www.youtube.com/watch?v=p60y3Y3dE3M)
- **Draw custom oscillator waveforms directly from harmonics** — in an oscillator's waveform display, draw harmonic content by hand (all harmonics at once, or restrict to just even or just odd harmonics) for genuinely unique waves instead of picking a preset shape; the **Repeat** dropdown then re-times how that drawn pattern repeats (Off/1 = brightest, up to 4 = darker/lower), and the active harmonic count can be reduced to 32 or 16 for a simpler wave. A plain sine FM'ing a hand-drawn wave gives a distinct FM color before any distortion is even applied. → [[Wavetable]] (custom-wavetable-import is the closest sibling technique) — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Filter distortion circuits + key-tracked Center Frequency** — the filter's Drive/distortion character has four types (Soft = cleanest, Hard = more distorted, Sine = crunchy/redux-like, 4-bit = heavily crushed) layered on top of the standard LP/HP/BP/notch/morph shapes, plus a separate analog-modeled circuit-type dropdown for further distortion flavor (paralleling [[Wavetable]]'s Clean/OSR/MS2/SMP/PRD filter-circuit choice). The **Center Frequency** knob sets how much the played MIDI note shifts the filter's center: 0 = fixed center point, 100 = the note fully drives it, negative = inverted tracking. → [[Wavetable]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Push Coarse ratio past ~10 for metallic/squeaky FM partials** — a fast, simple way to push an otherwise-tame FM patch into aggressive, non-musical territory once its basic shape is set — the low-integer-ratio "FM bass growl" recipe below is the tame end of this same knob. — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Protect the sub-bass with multiband before OTT, on a dubstep FM bass** — run [[Multiband Dynamics]] after the patch and turn off/reduce the low band while adjusting the crossover so the sub-bass fundamental stays clean, *then* reach for [[OTT]] if wanted — doing it the other way around lets OTT chew into the fundamental. Explicit caution: OTT can strip the "magic" out of a sound if pushed too far, on bass especially. → [[Multiband Dynamics]], [[OTT]], [[EDM Subgenres]] (Dubstep) — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Loop an oscillator's envelope for a built-in LFO** — the same free-running-envelope trick documented on [[Wavetable]] and [[Sampler]], confirmed here on Operator's own oscillators: loop oscillator B's envelope for a rhythmic modulation layer, or loop oscillator A's envelope instead to modulate the *whole patch's volume* (Global Time scales that loop's rate too, same as the sibling instruments). → [[Wavetable]], [[Sampler]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **The LFO as a "5th oscillator"** — Operator's built-in LFO defaults to modulating pitch on all oscillators (vibrato) but can be re-routed to the filter or any other parameter including volume; in **High** mode its rate reaches audio range (Ableton's own info text calls it a fifth oscillator), its rate can be key-tracked, and the **Sample & Hold** shape gives glitchy, "computery" noise textures. It can fade in via its own ADSR or sync to tempo. → dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Unlink a delay's left/right sides for Haas-style width — check mono** — running a different delay time on the left vs. right channel after a distorted FM bass widens it noticeably, but always check the result in mono since it can fall apart there. → [[Echo]], [[Width and Stereo]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **A high/low splitter to protect the sub while processing only the highs** — split the signal into a high band and a low band, apply distortion/character effects to the high band only, and recombine, so aggressive processing never reaches the clean sub-bass underneath. → [[Multiband Dynamics]], [[SUB Slot]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **Big reverb swells for drop teases and buildups** — click a single note on an FM patch and turn a big reverb's time way up (with the filter switched back on) for a huge, held wash — good for teasing a drop or automating other elements underneath during a buildup; a brighter reverb algorithm reads more forward/"prism," a darker one reads more hall-like. Turn off the modulating LFO's re-trigger so the swell doesn't restart every note. → [[Hybrid Reverb]] — dnksaus, [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)
- **A fixed-frequency oscillator as a snare-body starter** — set an operator to a fixed Frequency (not Note-tracked), macro-map that frequency ~160–250 Hz (where snares typically sit), turn Re-trigger on with Voices = 1, pull Sustain + Decay down, push Initial + Attack up, then add a pitch envelope (Peak ≈ 48, Decay brought down) for punch; FM it for a more "perky" character. A second Operator instance on a **Noise** oscillator (attack up, time knobs + volume macro-mapped) builds the tail layer. → [[Snare Design]] — dnksaus, [craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA)
- **Global Time — one knob scaling every envelope + LFO rate at once, in either direction** — the same Global Time knob found on [[Wavetable]]/[[Sampler]] also lives on Operator's global section; sweeping it gets a ton of patch variation for free (a simple FM bass patch stretched/compressed in time without touching individual oscillator envelopes). It runs both directions: **negative** values make the whole patch faster and clickier, **positive** values stretch everything longer and more pad-like — one knob for defining a patch's whole time-feel either way. → [[Wavetable]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4) & [Operator in Depth (Dubstep Sound Design)](https://www.youtube.com/watch?v=0tFb6vqzuHo)

## Manual

- 📄 [Live Instrument Reference — Operator](https://www.ableton.com/en/manual/live-instrument-reference/) (web-only, no per-device PDF — Live 12 manual chapter)

**High-level points:**
- The Algorithm (11 fixed routings) is the single biggest sound-design decision — it decides which oscillators modulate which others (serial FM chains) vs. run in parallel (additive-style, the rightmost algorithm). Change algorithm before fighting individual osc parameters.
- Each of the 4 oscillators has its **own** ADSR envelope shaping its output level over time — this is what actually creates classic FM timbre movement (a bright attack that decays into a duller sustained tone), not the filter.
- "Waveform" per oscillator isn't limited to sine — Operator includes several other shapes (plus 2 noise types) specifically so FM sounds can be built without pure-sine math; a non-sine modulator produces messier, more aggressive FM than textbook FM synthesis.
- Feedback (per-oscillator, self-modulation) is the fastest way to turn a clean tone into noise/distortion-adjacent texture — small amounts add grit, large amounts approach white noise.
- The Filter sits after the oscillator/algorithm stage and is a normal subtractive filter (12 types) — useful for taming harsh FM overtones without touching the FM structure itself.
- The Pitch envelope is a dedicated modulation source (separate from the amp envelopes) built for percussive "pitch knock" — a fast pitch-down sweep on attack is the classic FM kick/bass move.
- Global shaping knobs (Time / Tone / Volume, plus Spread and Transpose) sit in the right-hand global section — Time scales all envelopes at once, Tone controls high-frequency/aliasing brightness. *(An earlier note here claimed "2 X/Y macro pads"; the panel has no X/Y pads — corrected 2026-07-20.)*

## Used in my chains

An **FM synth source** (instrument, not an FX slot) — the clean FM option for subs and glassy e-pianos:

- **[[1 Digital Bass Track|Digital Bass Track]]** — clean FM sub (sine + slight 2nd harmonic); the plain "Huge Sine Base" is the reliable fallback under a characterful bass (Disclosure) → [[Operator — Clean FM Sub]].
- **[[1 Electric Piano Track|Electric Piano Track]]** — DX7-style FM e-piano (80s glass; modern trap loves it pitched dark) → [[Operator — DX7 FM E-Piano]].

## Key Parameters

```visual-key
image: Images/Operator.jpg
coords: Images/Operator.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Algorithm | 11 fixed FM routings between oscillators A–D, from fully serial (chained modulation) to fully parallel (additive) | Start on a mid-complexity algorithm (2 modulator pairs) for e-piano/bell tones; go full-serial for aggressive bass/lead FM | — |
| ② | Oscillator Waveform | Per-osc shape selector — sine plus several other waveforms + 2 noise types | Use a non-sine modulator for dirtier, more aggressive FM than clean sine-on-sine math produces | — |
| ③ | Coarse / Fine (per osc) | Sets the oscillator's frequency ratio relative to the played note (Coarse = whole ratios, Fine = detune) | Classic FM e-piano: modulator at a 14:1-ish ratio with a fast-decaying envelope over a sine carrier | — |
| ④ | Osc Envelope (per osc) | Individual ADSR controlling that oscillator's output level over time | Fast attack + medium decay on the modulator only = the "bright attack, dull sustain" FM e-piano signature | — |
| ⑤ | Feedback (per osc) | Self-modulation amount — the oscillator modulates its own phase | Push feedback on a sub oscillator for FM growl/distortion textures without adding another osc | — |
| ⑥ | Filter | Standard subtractive filter (12 types) after the FM/algorithm stage, own envelope + key tracking | Gentle low-pass to round off harsh upper FM partials on a lead, without disturbing the FM structure | — |
| ⑦ | Pitch Envelope | Dedicated pitch-modulation envelope, independent of the amp envelopes | Fast pitch-down "knock" on attack — the standard FM kick/808-adjacent bass trick | — |
| ⑧ | LFO | Global low-frequency modulator, syncable, routable to pitch/filter/amp and other destinations | Slow LFO → filter cutoff for a breathing FM pad; fast LFO → pitch for vibrato on a lead patch | — |
| ⑨ | Voices / Glide | Unison voice count + detune, and portamento/glide time between notes | Mono + glide for a classic FM bass slide; a few unison voices with light detune for a wider e-piano | — |
| ⑩ | Global (Time / Tone / Volume) | Whole-patch shaping — Time scales all envelopes, Tone controls high-frequency/aliasing brightness, Volume is output | Pull Tone down to tame digital fizz on a bright FM patch; nudge Time to stretch/shorten the whole envelope feel | — |

## Patch Recipes

Circled numbers = the matching row in the Key Parameters table above.

### FM e-piano — [[MIDS Slot]]
- ① Algorithm: 2-pair FM (osc B → osc A, osc D → osc C), outputs mixed
- ③ Modulator (B/D) Coarse ratio ~14 (the classic DX-style bell/e-piano ratio)
- ④ Modulator envelope: fast attack, medium decay, low sustain — carrier envelope: fast attack, long decay/release
- ⑤ Feedback: 0–low (keep it clean for e-piano)
- ⑥ Filter: gentle low-pass, cutoff open, mostly out of the way
- FX: short plate/room reverb send, light chorus for width

### Sine sub — [[SUB Slot]]
- ① Algorithm: fully parallel (rightmost) or single-osc only
- ② Waveform: sine
- ③ 1 voice, no unison — subs stay mono
- ④ Osc envelope: instant attack, sustained
- ⑨ Glide: legato on with 60–100 ms for slides
- FX: none needed pre-bus; keep the sub dry into the mix bus

### Toy bell / pluck — [[LEAD Slot]] or [[TEXTURE Slot]]
- ① Algorithm: 2-pair or 3-osc serial chain for inharmonic partials
- ③ Modulator Coarse ratio: non-integer (e.g. 3.5–7 range) for bell-like inharmonicity
- ④ All oscillator envelopes: fast attack, no sustain, medium-long decay (plucked/struck character)
- ⑤ Feedback: light, adds metallic edge
- ⑦ Pitch envelope: small, fast pitch-down on attack for a struck-transient feel
- FX: delay + reverb send for space, since the dry patch is very short

### FM bass growl — [[BASS Slot]]
- ① Algorithm: fully serial (single long modulation chain)
- ③ Modulator Coarse ratio: low integer (1–3) for a fundamental-locked growl; push past ~10 instead for a squeaky/metallic dubstep variant
- ⑤ Feedback: pushed further than the e-piano recipe — this is the texture source
- ⑦ Pitch envelope: pronounced pitch-down knock on attack
- ⑥ Filter: low-pass, envelope-modulated for movement; try the Hard or 4-bit drive circuit for extra grit before reaching for outboard distortion
- FX: [[Multiband Dynamics]] with the low band bypassed/reduced *before* [[OTT]] — protects the sub-bass fundamental from OTT's up/down pumping (dubstep convention; see [[EDM Subgenres]])
- Optional: unlink a following delay's L/R time for Haas width, checked in mono; split high/low and only distort the highs to keep the sub clean

### Dubstep wobble bass — [[BASS Slot]] / [[SUB Slot]]
- ① Algorithm: square (osc B → A, osc D → C) for the lead bass; horizontal-line (fully independent oscillators) for a second, cleaner call-and-response voice
- ③ Fine detune matched on both oscillators (~20) for an analog "wiggle" wobble, independent of the LFO
- ⑤ Osc B level down (~−30) to tame the raw FM tone once matched across oscillators
- ⑧ LFO synced to tempo, destination **Volume** (not pitch) for the rhythmic wobble pulse
- ⑨ Voices 1, Glide up, overlapping notes in the piano roll for a portamento call-and-response between two Operator basses
- ⑦ Pitch envelope pulled fully down with a long decay (3–4 s) for a downward pitch-bend tail
- FX: [[Erosion]] (Frequency + Noise up for grit) → [[Multiband Dynamics]] (low band boosted, ~+8, for sub emphasis — the inverse of the sub-*protection* move in the growl recipe above) → short reverb (decay up, dry/wet low, low cut on)
- Source: You Suck at Producing, [The Most Slept On Ableton Synth for UK Dubstep](https://www.youtube.com/watch?v=vLsEQAxir1o)

## See also

- Techniques: [[Snare Design]] · [[Kick Design]] · [[Width and Stereo]]
- Genres: [[EDM Subgenres]] (Dubstep)
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
