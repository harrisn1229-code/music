---
type: plugin
title: "Wavetable"
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

# Wavetable

![[Images/Wavetable.jpg]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's modern wavetable synth with two wavetable oscillators, a dedicated modulation oscillator, effects section, and a large built-in wavetable library plus scanning/warping controls.

## What it's used for

Modern electronic leads, basses, pads, and evolving textures — Live's answer to Serum/Massive-style wavetable sound design for EDM, trap, and pop production.

## FX chain notes

As the instrument source; commonly followed by FabFilter Saturn or Ableton Saturator for harmonic reinforcement, then a limiter/EQ on the bus.

## Techniques

- **Muted saw lead with a mod-wheel-gated LFO pitch wobble** — route one LFO to both oscillators' pitch amount for a wobble, but leave the mod wheel controlling how much of it is actually heard (down = static/muted saw, up = the wobble engages) — turns a fixed modulation into a live-performable gesture, chill-hop context. → [[Modulation]] — Max Konyi, [How I Make Chill-Hop in Studio One](https://www.youtube.com/watch?v=C9hcFfEOLhI)
- **Harmonic Series wavetable + Env→Wave Position + Env→Pitch Bend, for a "tweety bird" creature voice** — start from the **Harmonic Series** factory wavetable, then in the Matrix map one envelope to Osc 1's **Wave Position** (dragging up the waveform to add harmonics over the note's course) and a second envelope to the oscillator's **Pitch Bend** amount for a chirping pitch-bend character. Follow with a frequency-shifting device (small negative shift, around −5 kHz, for timbral variation) and [[Erosion]] in its **Sine** mode as a lo-fi bit-crusher (drag its texture control left/right for grit amount) before finishing with [[OTT]] and EQ. → [[Shifter]], [[Erosion]] — You Suck at Producing (Underbelly ft. Pixelwax), [Sound Design walkthrough of my new song with Pixelwax!](https://www.youtube.com/watch?v=IOc-lDT6_ZA)
- **A looping amp envelope IS the wobble — no external LFO needed for the base pulse** — shape the amp envelope for a "wah" contour (short fade-in, Sustain pulled down, Release tightened) then enable the envelope's own **Loop** mode instead of routing a separate LFO to Amp — the envelope repeats itself continuously for the classic wobble-bass pulse, freeing an LFO slot for a secondary modulation instead. Pair with a filter cutoff swept the same way (envelope or LFO opening/closing the cutoff, resonance up, filter type/steepness adjusted) for the paired timbral half of the wobble. → [[Kick Design]] (the same envelope-as-LFO logic applied to kicks in [[Serum 2]]) — DJ Kaybomb (You Suck at Producing), [Add MOVEMENT & GRIT To Your Bass Sounds](https://www.youtube.com/watch?v=3fExmMtMMzk)
- **A slow, small, free-running LFO on FM/Warp Amount makes every wobble hit sound subtly different** — route a small amount (~1.5–2) of a secondary modulation (e.g. FM Amount on Osc B) to an **LFO**, and critically turn OFF that LFO's retrigger/sync-to-note-start behavior so it runs continuously in the background rather than resetting its phase on every new note — each wobble hit then lands at a different point in the LFO's cycle and reads as organically varied instead of mechanically identical. → [[Randomized Rack Design]] — DJ Kaybomb (You Suck at Producing), [Add MOVEMENT & GRIT To Your Bass Sounds](https://www.youtube.com/watch?v=3fExmMtMMzk)
- **Unison Shimmer/Noise modes for instant lushness** — even on a basic wavetable shape, switching Unison mode to **Shimmer** and turning up Attack + Release gets a lush pad fast; **Noise** unison mode is similarly an instant-character shortcut before touching anything else. — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **A native per-note "Random" toggle on the MIDI tab — no external randomizer device needed** — turn on **Random** for Wave Position (and separately for Warp) on the MIDI tab and every triggered note lands on a different point in the table/warp amount automatically, without wiring up an [[Expression Control]] or [[LFO]] device — a built-in equivalent to the external random-per-note tricks documented elsewhere. → [[MPE Piano Roll Tools]], [[Randomized Rack Design]], [[Expression Control]] — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **A 7 Hz LFO into a small Pitch amount for a "pitch-bendy" character** — Matrix-map an LFO at roughly 7 Hz to Pitch with a small amount (and the LFO's own amount turned down to ~1) for a gentle wobble/bend rather than a full vibrato. — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Make the patch velocity-sensitive FIRST, then map velocity to many parameters beyond amplitude, for a genuinely expressive instrument** — many synth patches default to little or no velocity-to-amplitude response, so the first fix is turning up how much velocity affects **Amplitude** at all. Once that's live, velocity is a free expression source for far more than volume: map it to the amp envelope's **Decay/Release** (louder notes ring out longer), an oscillator's **Wave Position** (different velocities get subtly different timbres, not just different loudness), the **filter cutoff** (harder hits read brighter), the filter envelope's amount/**Resonance**, and even **Unison amount** with a Noise-type unison mode dialed in (harder hits get more textured/noisy, almost reverb-like) — every one of these stacking on top of the others makes a single instrument feel played rather than triggered. Keep individual modulation amounts subtle; several small velocity-driven moves compound into something that reads as alive without any single one being obvious on its own. Basic envelope humanizing underneath all of this: a touch of Attack removes an unnaturally clicky onset, some Release avoids an abrupt cutoff, and pulling Sustain down gives a plucky, less static character. → [[Rhythm and Groove]] — You Suck at Producing, [You Suck at Producing #50: Making Instruments More Expressive](https://www.youtube.com/watch?v=R2EEvUd1mcY)
- **Velocity → oscillator wave position** — with velocity-sensitive playing, map velocity so different notes/voices land on different wavetable positions, giving natural per-note timbre variation from dynamics alone. — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Modulate Time in the Matrix live, tied to the recorded phrase** — rather than a fixed modulation amount, move the Matrix's Time modulation live while recording a phrase (start subtle, get more frantic as it goes) so the wavetable's internal movement tracks the actual performance rather than a static automation curve. → [[Automation]] — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **MPE controller (Push 3) XY pad mapped to wave position** — map an MPE-capable controller's per-pad XY position to Wave Position so where you press on each pad selects a different point in the table — an expressive chords/keys-playing use case. → [[MPE Piano Roll Tools]], [[Expression Control]] — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Classic oscillator-FX mode stretches a dragged-in sample's frame end** — when using a custom dropped-in sample as the wavetable rather than a factory table, switching the oscillator effect to **Classic** mode stretches out the end of that frame — makes an otherwise-short, non-loopy imported sample read more like a sustained texture/pad instead of a one-shot. → [[Operator]] (Oscillator FX row) — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Reese bass: skip OTT, lean on compressing the noise content** — for a Reese-style bass, avoid [[OTT]] (as with most basses), but compressing the noisy/distorted content specifically reads as a good, characterful move; keep the low end protected/preserved from that same processing, same convention as the dubstep sub-preservation rule. → [[EDM Subgenres]] (Drum & Bass — Reese), [[Bass Design]] — dnksaus, [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Global Time — one knob scaling every envelope + LFO rate at once** — turning it up elongates all envelope stages (pluck → pad character), turning it down shortens everything (pad → pluck) — the fastest way to morph a patch's whole time-feel without touching each envelope/LFO individually. Automating Global Time from 0 to 100 across a long build (16+ bars) makes every envelope/LFO in the patch stretch together for a unified tension riser into a drop; snap it back down with Sustain at the drop for release. → [[Automation]] — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4)
- **Loop an envelope into a free-running LFO, key-tracked rate confirmed** — set an envelope's Sustain and Release to 0, then change its Loop dropdown from **None to Loop** — it free-runs as a repeating cycle instead of firing once per note, turning an envelope generator into an LFO-like modulator with full ADSR-style stage control. Global Time then scales the loop's rhythm into exponential patterns; a per-note keytrack variant (negative amount) makes lower notes loop/sustain longer than higher notes — confirmed live with a concrete example: a low note looping/running fast against a high note at roughly -30 by comparison. — dnksaus, [the best knob in ableton's stock plugins](https://www.youtube.com/watch?v=dcP02dHWgu4) & [Wavetable is Ableton's Prettiest Synth](https://www.youtube.com/watch?v=cCy2nW9E6V4)
- **Map per-note MPE data (Slide/Pressure) to timbre controls** — on Wavetable's own MP tab, map **Slide** to **Wave Position** and **Pressure** to **Filter Frequency** (for example) so an MPE controller — or Live 12.1's auto-generating MPE LFO piano-roll tool — reshapes each note's timbre individually, not just its pitch. Full tool detail is on [[MPE Piano Roll Tools]] (light touch here — Wavetable's own full pass is a separate upcoming video). — dnksaus, [This Device Automates Each Note Separately - Live 12.1](https://www.youtube.com/watch?v=bf8Ia7ALpu8)

## Manual

- 📄 [Live 12 Reference Manual — Wavetable chapter (§30.13)](https://www.ableton.com/en/manual/live-instrument-reference/#wavetable) — Ableton stock device; per the manual-enrich workflow, no PDF is downloaded (would mean grabbing the whole Live manual).

**High-level points:**
- Two main wavetable oscillators + a sub oscillator feed **two analog-modeled filters** (Cytomic circuits: Clean/OSR/MS2/SMP/PRD) — the filter circuit choice, not just cutoff/reso, is a distinct sound-design axis.
- Each oscillator's **wavetable position** is the primary timbre-shaping control — a static position is a static tone; modulating it (LFO, envelope, MIDI) is *the* Wavetable move for evolving pads/leads.
- Per-oscillator effects (FM / Classic PW+Sync / Modern Warp+Fold) sit **on top of** the wavetable itself and don't reset when you switch effect type — you can A/B how the same knob values distort differently across effect types.
- Filter routing has three explicit modes (Serial / Parallel / Split) — Split sends each oscillator to its own filter, which is the fastest way to build one layered patch instead of stacking two instrument tracks.
- The Mod Matrix and MIDI tab **share the same rows**, so a parameter you've wired to an envelope/LFO shows up right next to where you'd also wire velocity/note/MIDI CC to it.
- Modulation destinations are explicitly additive (centered on 0, can go negative) or multiplicative (centered on 1, floor of 0) — this is stated per-parameter in the manual and changes how modulation amount behaves.
- Unison offers six distinct modes (Classic, Shimmer, Noise, Phase Sync, Position Spread, Random Note) that go beyond simple detune — several spread *wavetable position*, not just pitch, across voices.
- Hi-Quality mode is off by default on new instances (Live 11.1+) to save up to 25% CPU — existing Live Sets/presets keep loading in Hi-Quality to preserve their original sound, so toggling it can subtly change a saved patch.

## Used in my chains

A **synth source** (Ableton stock, instrument not FX slot) — evolving/motion pads via wavetable-position modulation:

- **[[1 Synth Bed Track|Synth Bed Track]]** — evolving/motion pads (the position-LFO movement that [[OTT]] loves), alongside [[Drift]].

## Key Parameters

```visual-key
image: Images/Wavetable.jpg
coords: Images/Wavetable.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Wave Position | Scans through the frames of the loaded wavetable | Static = fixed timbre for a stab; slow LFO or envelope into it = the signature "morphing" pad/lead move for EDM/pop | — |
| ② | Wavetable chooser (+ custom import) | Selects the wavetable per oscillator; any WAV/AIFF can be dragged in as a table | Drag a vocal chop or foley hit in as a wavetable for a genre-signature, ownable texture instead of a stock table | — |
| ③ | Oscillator FX (FM / Classic / Modern) | Per-osc modulator: FM, pulse-width + sync, or warp + wavefold | FM with a fast decay envelope on Amt = classic aggressive bass growl; Fold for harsher EDM/trap leads | — |
| ④ | Sub Oscillator (Gain/Tone/Octave) | Dedicated sine-based sub, tunable to the note + Transpose | Tone at 0% for a pure clean sub under a busy lead — free SUB-slot layer without a second track | — |
| ⑤ | Filter circuit (Clean/OSR/MS2/SMP/PRD) | Analog-modeled filter character, independent of cutoff/reso | OSR or PRD for grittier, more "hardware" trap/EDM bass; Clean for surgical pop/bedroom-pop beds that need to stay polite | — |
| ⑥ | Filter routing (Serial/Parallel/Split) | How the two oscillators feed the two filters | Split = one Wavetable instance doing double duty as a layered lead+bass or bright/dark dual-filter patch | — |
| ⑦ | Morph filter's Morph control | Sweeps LP→BP→HP→notch→LP continuously | Automate Morph across a build/drop for a filter-sweep riser without extra plugins | — |
| ⑧ | Envelope Slope (Attack/Decay/Release) | Bends each envelope segment logarithmic↔linear | Negative slope on Decay = envelope holds near peak then snaps down — punchier plucks/stabs than a plain ADSR | — |
| ⑨ | Unison mode + Voices + Amount | 6 unison modes stacking detune, phase, or wavetable-position spread | Classic mode, 4–7 voices = modern supersaw lead/bed; Position Spread for a wide, evolving texture bed that isn't just "more detune" | — |
| ⑩ | Mono/Poly + Glide | Voice mode and mono-only glide time | Mono + short Glide = trap/EDM lead slide feel; switch to Poly for chorded Beatles-lane bedroom-pop beds | — |

## Patch Recipes

From-scratch builds by **sound role** (slots defined in [[Sound Palette]]). Circled numbers = the matching row in the Key Parameters table above.

### Bed — [[BED Slot]]
- ② Osc 1 + Osc 2: a warm analog-style or "Pad" category wavetable each
- ①⑧ Slow LFO or long Env → ① Wave Position on Osc 2 for internal movement, not melody
- ⑥ Filter routing: Parallel
- ⑤ Filter circuit: Clean or MS2, cutoff moderate, low resonance
- ⑨ Unison: Position Spread mode, 3–4 voices, moderate Amount — width without just detuning
- ⑧ Amp envelope: Attack 0.8–1.5 s, high Sustain
- HPF ~120–150 Hz on the way out ([[BED Slot]] mix rule); swappable with [[Analog]] or [[Drift]] pads in the same slot

### Lead/pluck — [[LEAD Slot]]
- ② Osc 1: a bright saw/digital-style wavetable
- ③ Classic FX: PW modulated by a fast envelope for a "quack" attack
- ⑤ Filter circuit: OSR for extra edge, ⑦ short Morph sweep from LP toward BP on the attack
- ⑧ Fast Attack, short Decay, low Sustain, negative Decay slope for a snappy pluck
- ⑨ Unison: Classic, 2 voices, light detune — keep it tight, not a pad
- ⑩ Poly (plucks are usually chorded/rhythmic, not legato)

### Bass/Sub — [[BASS Slot]] · [[SUB Slot]]
- ④ Sub Oscillator on, Tone low (near-pure sine), Gain high — the free SUB-slot layer
- ② Osc 1: a growl/vocal-formant wavetable for BASS-slot harmonics
- ③ FM on Osc 1, Amt modulated by a fast-decay envelope for the classic wavetable growl-bass attack
- ⑥ Filter routing: Split (Osc 1 → its own filter, Sub → both) so distortion never touches the sub
- ⑩ Mono, short Glide for 808-style slides
- ⑨ Unison off on the sub path — SUB stays mono/centered ([[SUB Slot]] mix rule)
- **Reese variant:** skip [[OTT]] on the bass itself; compress the noisy/distorted osc content instead (a Compressor or [[Multiband Dynamics]]), and keep the low end preserved/dry from that processing — see also the DnB Reese entry in [[EDM Subgenres]]

### Dubstep wobble — [[BASS Slot]]
- Osc 1: a table from the **Harmonics** category (more overtone content to filter-sweep than a plain basic shape)
- ⑧ Amp envelope: short Attack, Sustain down, Release tightened, into a wah-shaped contour — **Loop enabled** so the envelope repeats on its own (the wobble's core pulse, no LFO needed for this part)
- ⑤⑥ Filter: cutoff swept open/closed by the same looping motion, Resonance up, filter type/steepness to taste
- ③ Small FM/Warp Amount (~1.5–2) on Osc 2, modulated by a **free-running LFO** (retrigger OFF) for subtle per-note variation in the wobble's timbre
- ⑨ Unison on for width (amount to taste)
- ④ Sub Oscillator on, Octave 0, Gain up — mono/centered
- FX: light reverb (Decay short, kept tight rather than washy) → [[OTT]] (Amount + high end pulled back) → [[Erosion]] (Noise-type mode for grit) → [[Utility]] (mono the low end)
- (general starting point — settings loosely transcribed from a comedic/character-voiced video; dial by ear)

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- ② Osc 1 + Osc 2: classic saw or square wavetables (early frames of the table, not deep morphed positions)
- ⑨ Unison: Classic mode, 4 voices, moderate Amount (Juno-style ensemble, not a modern supersaw)
- ⑤ Filter circuit: MS2 (modeled on a classic Japanese monosynth), cutoff bright, low resonance
- ⑧ Amp envelope: Attack ~100 ms, full Sustain (chords, not a slow swell)
- ⑩ Poly, no glide — played as chords/stabs
- Dry-ish, minimal reverb send — see [[Synthwave]]; [[Model 84 Polyphonic Synthesizer]] is the reference implementation for the real-circuit version of this patch

### Color Bass — [[BASS Slot]] (layered-voice variant)
- Split the patch into **independent per-voice layers** rather than one unison patch: a top-layer Wavetable instance, a middle-layer instance, and a bottom-layer instance, each its own oscillator/voice, then grouped into a rack
- ② Vary the wavetable choice per layer (e.g. a Reese-style table on one layer, a cleaner tone on another) so the layers read as genuinely distinct rather than three copies of the same patch
- Crunch the combined result with a dynamics-linked bit-reduction stage ([[Redux]]/[[Erosion]]) once the layers are stacked together
- Pairs with a [[Hybrid Reverb]] chord-locked convolution pad and/or a [[Spectral Resonator]]/[[Vocoder]] texture layer sitting alongside it in the same arrangement section — see [[EDM Subgenres]] (Color Bass)
- dnksaus, [Color Bass and Future Sound Design in 2023](https://www.youtube.com/watch?v=Izo8-oYXvOQ)

## See also

- Techniques: [[Automation]] · [[MPE Piano Roll Tools]] · [[Randomized Rack Design]]
- Genres: [[EDM Subgenres]] (Drum & Bass — Reese, Color Bass)
- Techniques: [[Bass Design]]
- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
