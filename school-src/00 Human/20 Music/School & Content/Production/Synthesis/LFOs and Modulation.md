---
type: synthesis
title: LFOs and Modulation
tags: [synthesis, production, lfo, modulation]
created: 2026-08-03
---

# LFOs and Modulation

Modulation is what separates a synth from a tone generator. A patch with nothing moving is a static sound no matter how good the oscillator is.

## What an LFO actually is

**A Low Frequency Oscillator is an oscillator running below the hearing range — roughly under 20 Hz — used to *modulate a parameter* rather than be heard as a tone.**

The placement (SYN-04) got "low frequency oscillator" and stopped there. The distinction that matters is the second half: **it's the same circuit as an audio oscillator, just slow, and it's wired to a knob instead of to the output.** You never hear the LFO. You hear what it's moving.

Push an LFO up past ~20 Hz and it stops sounding like movement and starts sounding like tone — at which point you've built [[FM Synthesis]]. The line between "modulation" and "audio" is only speed.

## LFO controls

| Control | What it does |
|---|---|
| **Rate** | How fast. Free-running in Hz, or **tempo-synced** to note values |
| **Shape** | Sine (smooth), triangle, square (on/off jumps), saw (ramp + snap back), random/S&H (stepped chaos) |
| **Depth / amount** | How far it pushes the target. Often bipolar |
| **Phase / offset** | Where in its cycle it starts |
| **Retrigger** | Restart on each note, or run free |
| **Fade in** | Ramp the depth up over time — how you get delayed vibrato |

**Tempo-sync is the single most useful setting.** An LFO at 1/8 or 1/4 locks movement to the groove; the same LFO free-running at an arbitrary Hz fights it. For anything rhythmic, sync it.

## What to modulate

Same LFO, entirely different results depending on destination:

| Target | Result |
|---|---|
| **Pitch** | Vibrato (subtle, with fade-in) or a warble/siren (extreme) |
| **Filter cutoff** | Movement, the wub, sweeping pads |
| **Amplitude** | Tremolo; square-wave LFO gives gated/stutter |
| **Pulse width** | The classic thickening — see [[Oscillators and Waveforms]] |
| **Wavetable position** | Morphing timbre — see [[Wavetable Synthesis]] |
| **Pan** | Auto-pan; use sparingly, check mono |
| **FM amount** | Evolving harmonic content |
| **Effect depth** | Movement without touching the synth voice |

## Making a pad actually evolve

This was SYN-10 — you had "use an LFO" and no target. **The answer is filter cutoff or wavetable position, modulated slowly.**

The rule: **to make a sound evolve, modulate its *timbre*, not its *level*.** Level changes read as volume automation; timbre changes read as the sound being alive.

For a genuinely evolving eight-bar pad, layer modulators at different rates so nothing repeats obviously:

1. A very slow LFO (8 or 16 bars) on filter cutoff — the broad sweep.
2. A second, faster LFO (1–2 bars) on wavetable position or a second filter — detail.
3. A long *envelope* (not LFO) on something, so the first pass differs from later ones.
4. Slight random/drift on pitch, if the synth offers it — [[Drift]]'s "drift" control does exactly this.

The reason to mix envelopes with LFOs: an LFO is periodic and eventually reveals its loop. An envelope fires once per note and doesn't.

## The modulation matrix

Beyond the hard-wired routings, most modern synths give you a matrix: pick a **source**, pick a **destination**, set an **amount**.

Sources aren't just LFOs — velocity, aftertouch, mod wheel, note number, random-per-note, and envelopes are all modulators. Some of the most useful routings have nothing to do with LFOs:

- **Velocity → filter envelope amount** — hit harder, sound brighter. The single biggest "feels played" upgrade.
- **Note number → cutoff** (key tracking) — keeps high notes from sounding muffled.
- **Mod wheel → LFO depth** — vibrato under your control instead of always-on.
- **Random per note → pitch (tiny amount)** — subtle humanization, kills the machine-gun effect on repeated notes.

**Modulate the modulator.** An LFO whose *depth* is controlled by an envelope gives vibrato that fades in — much more musical than vibrato from note one. Most synths allow this; almost nobody uses it.

## On your synths

[[Serum 2]] has the most flexible matrix, with drag-and-drop routing and drawable LFO shapes. [[Wavetable]] gives two LFOs plus a matrix and is the most direct place to hear position modulation. [[Drift]] is deliberately simple — one LFO, a few destinations — which makes it a good place to learn. [[Operator]] routes modulation per-operator, which is the entire point of FM.

## Drill

On [[Wavetable]]: build a pad, then add a 4-bar LFO to filter cutoff and an 8-bar LFO to wavetable position at different rates. Hold one chord for 16 bars and listen to it not repeat. Then remove the position LFO and hear how much deader it gets.

## Related

- [[Signal Path]] — where modulators act
- [[Envelopes and ADSR]] — the other modulator, once per note
- [[Filters and Resonance]] · [[Oscillators and Waveforms]] · [[Wavetable Synthesis]]
- [[Automation]] · [[Sidechaining]] — modulation at the arrangement level
- [[Synthesis Index]]

## From videos

- **Audio-rate modulation: use a second OSCILLATOR (not an LFO) as a modulation source, running fast enough to sit in the audible frequency range.** Route it into another oscillator's pitch input for a subtle "ripping"/shaking texture that helps a sound cut through a mix; route the same source into the filter instead for a distinctly different, separately-tunable result. The modulator's own detune and waveform shape the character of the effect, and modulating two destinations (pitch AND filter) at once with the same source gives a more extreme, "shredding" result. Genuinely different from stacking a second full audio oscillator for size — a single oscillator plus audio-rate modulation keeps one clear pitch center where two stacked oscillators can phase and drift out of tune with each other. → [[Bass Design]] — Anthony Marinelli, [[How to Make Huge Sounds with 1 Oscillator]]

- **Route filtered white noise into the OSCILLATOR's pitch input (not amplitude) for a subtle "breath" character on a whistle/wind-instrument patch — the Mort Garson/Plantasia lead.** Noise through a bandpass-style fixed filter bank (thinning broad white noise down to a narrower band) patched into the pitch/frequency driver adds a barely-audible flutter that reads as breathiness rather than obvious noise — described via a violin-rosin analogy: up close the bow noise is ugly and obvious, but at a normal listening distance (or with reverb) it just reads as tone with "bite" and personality; dial the noise amount low enough that removing it entirely is what reveals how much it was doing. Full patch is otherwise minimal: one triangle oscillator → mixer (for saturation) → filter (envelope-controlled cutoff, no resonance) → VCA (same envelope, normal-connected), plus glide and a fast, always-on vibrato for expression. → [[Filters and Resonance]] — Anthony Marinelli, [[The Secret Behind Plantasias Iconic Whistle Sound]]

- **The mod wheel is a routing choice (shape + destination), not a fixed vibrato control.** Swap the LFO shape feeding it — square instead of triangle/sine gives a rhythmic, "steppy" modulation rather than smooth vibrato — and swap the destination: routed to the filter instead of oscillator pitch, a fast LFO with a low static cutoff produces a sample-and-hold-like stepped texture without ever touching the wheel live. **Noise as an overlooked modulation/character source**: a small, subtle noise blend into a saw oscillator adds "personality" that reads as flat/bland without it — too much just reads as duller, not more textured, so a little goes a long way; layering a slow triangle LFO on top of a light noise blend gives a cassette-style wow-and-flutter warble. **PWM register gotcha**: pulse-width-modulation depth/rate that sounds fine in a high register can read as audibly out of tune in a low register at the identical settings — slow the rate (or reduce the pulse-width excursion) specifically for low notes; a faster PWM rate works fine in the high register, including full chords. → [[Voice Architecture]] — Anthony Marinelli, [[Get MORE EXPRESSION Without Spending Money]]

- **Sample a slow sine LFO instead of noise for a non-random, "trending" stepped modulation shape.** Sample & hold's usual input is noise (fully random stepped voltages); feeding it a slow sine wave instead produces a stepped output that still follows the sine's overall rise-and-fall shape rather than jumping unpredictably — a middle ground between a smooth LFO and full random, useful whenever a "stepped" character is wanted without giving up predictable direction. A separate general-purpose AR (attack/release only) envelope WITH a delay stage before it starts is worth having alongside the main ADSR specifically for effects that shouldn't begin the instant a note is struck — a delayed vibrato onset, or a pad's filter that stays dull for a beat before blooming open. Korg PS-3300 FS. → [[Vintage Gear Worklist]] — Anthony Marinelli (feat. Korg's Luke), [[New Korg PS-3300 FS Deep Dive at NAMM 2024]]
- **Clock-sync a sample & hold generator via its EXTERNAL clock input (not its own free-running internal clock) for random modulation that's genuinely locked to the track, not just near-tempo.** A single tempo-derived 16th-note gate (from a clock/sync unit reading the track's tempo) is molted (split) two ways: into an envelope generator's trigger input (firing it rhythmically in time) AND into the sample & hold's external clock input, so its random output voltages update exactly on the beat. Sampling PINK noise rather than white gives a narrower, more musically-weighted random range than full white-noise chaos. The payoff is a filter fed by BOTH this clock-synced random source AND a tempo-locked envelope simultaneously — one random-in-time, one rhythmic-in-time — producing movement that reads as "alive" rather than a single predictable sweep. Michael Jackson's "Beat It" hidden machine-gun texture. → [[Filters and Resonance]] — Anthony Marinelli, [[MJ's Beat It - Hidden Machine Gun Sound]]
- **Repoint a step sequencer's pitch-CV output at the FILTER instead of oscillator pitch, turning "pitch steps" into a rhythmic accent/gate pattern — then play the actual notes/chords live on the keyboard on top.** The sequencer's per-step voltages (normally read as a melody) instead open/close the filter step by step for a rhythmic pulse, while pitch is played spontaneously in real time rather than programmed — same patch can hold a bassline, chord, or melodic phrase while the sequencer drives an independent groove underneath. Any pitched CV source works as the modulation input, not just a dedicated sequencer — demonstrated by patching a second polyphonic synth's own output into the first synth's filter, so playing chords on the second instrument drives complex, chord-dependent rhythmic filter patterns on the first. → Anthony Marinelli, [[Why Most People Use Sequencers Wrong]]
- **A shared "driver" oscillator, itself LFO-modulated, sends the SAME vibrato to multiple VCOs simultaneously — keeping them detuning together in sync, rather than drifting independently the way separate per-oscillator LFO routing would.** On a Moog modular (recreating The Beatles' "Here Comes the Sun" synth line): a sine LFO feeds an attenuator into the "driver" module, which controls the frequency of both audio oscillators at once — the mechanism behind the part's whistle-like top line and its vibrato-out ending. Worth reaching for whenever multiple oscillators need to move together as one voice rather than spread apart. → [[Filters and Resonance]] — Anthony Marinelli, [[The Beatles Here Comes the Sun - Synth Parts]]
- **Clock-synced gate-fired envelope as a hardware-native alternative to LFO/automation-drawn wobble**: a tempo-synced clock/sync unit generates a subdivided gate pulse (quarter/eighth/eighth-triplet/16th, switchable live), and each pulse fires an envelope generator that modulates a filter directly — producing a dubstep-style rhythmic wobble without ever drawing automation or syncing a plugin LFO. The subdivision being a physical selector means the wobble feel can change live while playing. → [[Filters and Resonance]] — Anthony Marinelli Music, [[How I Create Dubstep on Analog Synths (without a computer)]]
