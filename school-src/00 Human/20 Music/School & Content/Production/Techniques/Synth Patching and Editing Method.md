---
type: technique
title: Synth Patching and Editing Method
tags: [technique, synthesis, workflow, production]
---

# Synth Patching and Editing Method

A repeatable workflow for approaching an unfamiliar synth panel and for editing a preset into a track, rather than turning knobs and listening for the result. Distinct from [[Voice Architecture]]/[[Filters and Resonance]]/[[Envelopes and ADSR]] (which cover what each module *does*) — this page is about the *order of operations* for finding and shaping a sound.

## Draw the sound before hunting the panel for it

Visualize the target sound as a diagram, not the physical panel in front of you: the four building blocks (pitch/timbre/duration/volume) laid out **horizontally** as the audio path, and every modulator (an envelope generator, an LFO) drawn as a **separate box below it**, connected upward by a vertical arrow to whichever block it controls. A single modulator box can send arrows to two destinations at once — an LFO patched to both the oscillator AND the filter is one box with two vertical arrows, not two patches to reason about independently. Only after the diagram is settled do you hunt the actual panel for modules matching each box — this is what keeps an intimidating, differently-labeled front panel from being intimidating. Make small, incremental adjustments once you're in — a large single move can push a filter into self-oscillation or otherwise destroy the sound before you can identify what changed it. On a panel with limited patch points (the ARP 2600 is the recurring example), look for a **normalled connection or a "more of"/mult function** before assuming you're out of options — many control inputs are already internally routed to a sensible default, or a mult can duplicate one signal to several destinations without a spare cable per destination. → Anthony Marinelli, [[How I learn ANY Synth in Minutes]]

**A second ARP 2600 (3620 keyboard) patch-free split trick**: plug the keyboard's own "upper voice" output jack directly into an oscillator's input — that oscillator becomes the split's upper voice, freeing the rest for the lower voice, without a dedicated split/dual mode. **A real panel-reading gotcha to watch for**: a module's controls aren't always physically located in the section named for it — on one synth, the filter TYPE selector lives in the VCA section, only found by tracing backward from the output rather than looking in the filter section; the same panel labels its three envelope generators A, C and E (skipping B/D), a shared-modulation-matrix numbering scheme rather than a literal row of three. → Anthony Marinelli, [[I Hate This Synth Because]]

## Read the panel in signal-flow order before touching a knob

Scan left to right (or whatever direction the manufacturer laid out signal flow), using the panel's own printed section labels to identify each module — oscillators → filter → envelope generators → VCA → mixer — rather than guessing from the sound alone. Trace which jacks/switches feed which module to confirm the patch, don't assume. This is approachable even on an intimidating, non-color-coded panel (the ARP 2600 is the recurring example) if given a deliberate minute to read it first, rather than diving straight into turning knobs.

## Build oscillator tuning off one reference, not a chain

Tune oscillator 1 to an external pitch reference by listening for zero beating, then tune oscillator 2 against oscillator 1 (not the external reference again), then oscillator 3 against oscillator 1 as well — always referencing back to the same "anchor" oscillator rather than each new oscillator to the last one tuned, which compounds drift. To deliberately detune for effect afterward, detune ONE oscillator and pull its level down in the mix — a quiet, detuned color voice under an in-tune primary — rather than detuning everything.

## Time a preset to the track before shaping its tone

Workflow order matters: identify the track's rhythmic phrase length first, then adjust ONLY the filter envelope's attack/decay/sustain so the sound's onset and cutoff line up with that phrase (slow the attack if it "speaks" too hard, lower sustain if it rings past the phrase, tune decay so it "dies" exactly on time) — and only THEN layer in tonal changes (brightness, resonance, detune, PWM) for character. Chasing tone before timing means redoing the timing work later.

A useful decision rule for "should this sound be brighter right now": check whether it's carrying the melody at that moment in the arrangement — the sound "isn't always the star," so brighten it (via the filter, not the oscillator or envelope) only in the sections where it actually is.

## Add expression hardware beyond the wheels

Two cheap, easy real-time controllers beyond the stock pitch/mod wheels:
- **A passive volume pedal** after the synth's output, into an amp/preamp — recreates the original "synths ran through amps" workflow; backing off input level into the pedal then re-boosting through a preamp is a free way to add incidental drive/distortion.
- **A CV foot pedal** (e.g. a Korg foot controller sending ~0–4V) patched directly into a filter-cutoff CV input — frees both hands to keep doing pitch bend + vibrato on the wheels while the foot sweeps the filter, giving three simultaneous expressive dimensions instead of two.

## Break any target sound into four parameters before patching

Listen for, in order: **Pitch** (register/frequency content), **Timbre** (the harmonic/filtered character), **Duration** (the envelope shape over time), **Volume** (how loud/dynamic it is) — build the patch by addressing each in that order rather than guessing at the whole sound at once. One practical corollary: a static filter setting does NOT sound the same an octave higher — brightness must be re-opened slightly whenever a patch is transposed up, or it reads as duller than the reference even though nothing else changed.

Aim to get a from-memory recreation to roughly 80% right on the panel alone, without repeatedly A/B-ing against the reference — then let the actual track (not the reference) decide the remaining 20% (more brightness, less resonance, added attack, a different octave).

## Debug a dead signal by tracing backward, not re-checking everything at once

When no sound comes out of a patched signal chain, trace it backward one connection at a time from the output rather than re-checking every stage simultaneously — isolates a bad cable or wrong jack quickly. The same 4-parameter framework above (pitch, timbre, duration, amplitude) doubles as a troubleshooting checklist: confirm each stage is actually doing its job, in that order, rather than guessing at the whole chain.

## Related

- [[Voice Architecture]] · [[Filters and Resonance]] · [[Envelopes and ADSR]] · [[Sound Selection Guide]]
- [[Techniques Index]]

## From videos

- **Backward signal-tracing as a debugging method, demonstrated live when a patch cord failed mid-recording.** → [[Oscillators and Waveforms]] — Anthony Marinelli, [[How I Programmed the Theremin Sound On Thriller]]
- **The 4-parameter (Pitch/Timbre/Duration/Volume) listening framework, demonstrated live against unfamiliar reference sounds with no prep.** → [[Sound Selection Guide]] — Anthony Marinelli, [[How I break down ANY sound]]
- **The same 4-parameter framework applied to a short, worked patch: the flute-y Minimoog lead on Michael Jackson's PYT.** Pitch → single triangle-wave oscillator (Minimoog's practical stand-in for a pure sine, since it has no true sine oscillator) at a 4-foot range; Timbre → filter cutoff low with a touch of resonance for body, not pushed further (thins out here); Duration → filter envelope long decay mostly sitting at high sustain, VCA envelope high sustain with a slightly softened attack (an instant attack read as harsh); a closing vibrato layer used oscillator 3 purely as a sine-wave LFO into oscillator 1's pitch — sawtooth/square LFO shapes were demonstrated as audibly worse alternatives. → [[Voice Architecture]] — Anthony Marinelli, [[How I Programmed the Lead Synth on Michael Jackson's PYT]]
- **The panel-reading, tuning-reference-chain, and preset-timing methods above, plus the expression-pedal tricks** — all five "mistakes" and their fixes, demonstrated on ARP 2600/Minimoog. → Anthony Marinelli, [[5 Mistakes People Make With Synths]]
