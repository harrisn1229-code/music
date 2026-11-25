---
type: technique
title: Expressive Controllers and CV Conversion
tags: [technique, synthesis, mpe, expression, modular, cv]
created: 2026-08-30
---

# Expressive Controllers and CV Conversion

Controlling vintage analog synths — genuinely voltage-controlled, no MIDI input at all — with a per-note continuous expressive controller (Haken Continuum, Osmose) via a MIDI-to-CV converter, so each key/note carries independent, continuous pitch/pressure/position data into a real analog voice rather than the synth's own on/off keyboard gate. Source: a deep two-controller demo pairing a Haken Continuum and an Osmose with four ARP 2600s and a Moog Modular 3C, one voice per instrument.

## MPE fundamentals this depends on

Every new note played opens its own MIDI channel (up to 15), carrying continuous, independent tracking of pressure, aftertouch, and pitch-bend per note — the mechanism MPE (MIDI Polyphonic Expression) is built on. A **CVC (Control Voltage Converter)** takes that per-channel MPE data and converts it into actual control-voltage signals a vintage analog synth's CV/gate inputs can use directly — multiple CVCs can be networked together (or a dedicated CVC Expander used) to drive more independent voices than one converter alone supports.

## The four-signal patch template (W / X / Y / Z)

Applied identically across every voice (a Moog Modular 3C and four separate ARP 2600s in the source demo) so the same patch recipe scales to as many analog voices as you have:

- **W → envelope generator gate/trigger.** Fires the amp/filter envelope's shape.
- **X → oscillator pitch** (1V/octave, patched to every oscillator on that voice in parallel via a mult).
- **Y → filter cutoff/brightness**, patched directly to the VCF's control input — attenuator set high for maximum sweep range from key pressure/position.
- **Z → VCA volume**, patched to the amp's linear control input — this is what actually gates the sound on/off as a key is touched.

**A genuinely reusable soft-attack trick lives in how W and Z interact**: route W into an envelope generator with a very SHORT decay time. A light/soft key touch doesn't generate enough voltage to cross that envelope's trigger threshold at all — so soft playing produces a slow, brass-like swell purely from Z's continuous VCA gate opening, with no envelope transient. Play harder, and the note crosses the threshold, firing the envelope and adding its transient "spike" on top. One continuous physical gesture — touch pressure — is controlling whether a note has an attack transient at all, not just its intensity, with no separate velocity-to-amount CC mapping required. The result reads as two-stage per note: **volume without brightness first** (Z opens on the first half of key travel), **then brightness** (Y/filter opens on the second half) — independently, per note, per voice.

## Declicking a CV gate

The ARP 2600's voltage-processor section includes a **lag processor** — patch a CVC's Z (gate) signal through it before it reaches the VCA's linear input, and it rounds off the sharp leading/trailing edges of that gate, removing an audible click at note-on that a hard-edged gate signal would otherwise produce.

## Sustain via MIDI CC

Some expressive controllers/converters expose a continuous 0–127 sustain-style control mappable to specific MIDI CC numbers per voice (demonstrated grabbing "Sustain 1"/"Sustain 2" independently) — this can also be automated from a DAW to modulate a live performance rather than only played by hand. **The sustain footswitch itself can be continuous, not just on/off**: with 0–127 range on a single foot control grabbing one specific held voice, lifting the foot gently (not all the way) and pressing back down continuously sweeps that held voice's VCA/filter in real time — turning a sustain pedal into a live expressive filter/volume swell on a drone note, independent of whatever's being played on top.

## A second CV destination on the same trigger

The same W-style envelope/gate signal that fires the amp envelope can also be **multed to a second destination — pulse width** — so a harder touch simultaneously shortens/opens the envelope AND shifts the oscillator's pulse width, adding a compounding waveform-shape change to the attack rather than just a loudness/brightness change. General principle: don't assume one CV signal has to go to only one parameter — multing a single expressive-control signal to two related destinations (envelope + timbre-shaping parameter) compounds the expressive effect from a single physical gesture.

## Pitch quantization ("rounding")

The Continuum's **rounding** control sets how quickly a note's continuous pitch snaps/corrects to the nearest true pitch once a key is touched — turned all the way up, it removes continuous pitch-bend entirely and plays hard, quantized notes like a normal keyboard; backed off, it restores full glissando/fretless pitch behavior. A single control for dialing between "keyboard-normal" and "fully continuous, in-the-cracks" playing on the same instrument, rather than a fixed either/or choice.

## MPE arpeggiator across multiple physical synths

An MPE-aware arpeggiator (demonstrated on the Osmose, reportedly developed by Expressive E during a pandemic-driven production pause) doesn't just arpeggiate notes on one instrument — because it's sending CV out to several separate hardware voices, **each arpeggiated step can fire a genuinely different physical synth** (step 1 → Moog 3C, step 2 → ARP 2600 #1, step 3 → ARP 2600 #2, and so on), cycling through the whole rig rather than one instrument playing a fast repeated pattern. Per-note continuous expression still applies live WHILE the arpeggiator runs: aftertouch pressure on a held note can jump that note an octave in real time mid-pattern, and pitch bend is separately adjustable across an extremely fine resolution range (from a quarter-semitone up to 96 steps per semitone), letting a player bend and "resolve" notes over a running arpeggio rather than just letting it repeat statically. **A real gotcha at this sensitivity**: a touch light enough to be inaudible can still be enough to trigger/advance the arpeggiator's step sequence — the step genuinely fires, silently, which can throw off the pattern if you're not aware a "ghost" step happened. The arpeggiator can sync to its own internal tempo, external MIDI clock, or a DAW's clock, and can also send clock pulses OUT to drive drum machines or other sequencers.

## Live-tuning drift, and dialing resonance in per note

Even a well-maintained multi-oscillator analog rig like this drifts over a live session — one oscillator caught going noticeably out of tune after staying stable for roughly two days of use, requiring an on-the-fly retune (see [[Live Performance Setup]] for the DIY visual-tuner trick this problem motivates). Once resonance is added into a patch that didn't have it, near-misses in pitch/timing that then get corrected read as MORE satisfying, not less — likened directly to how a string player has to actively land and correct pitch by ear, i.e. tension-then-release as a musical device, not just a technical imperfection to eliminate. **Deliberately leaving resonance OFF on some voices while it's on for others**, in a multi-instrument ensemble patch like this, was found in the moment to add more "personality" to the combined chord than making every voice identical — the same heterogeneity principle as the "violin section" trick above, applied to a processing parameter instead of just instrument identity.

## The "violin section" ensemble trick

Assigning each note of a chord to a physically **different unit of the same model** (four individually-drifted ARP 2600s, one per voice/note) produces a natural same-but-different character across the chord — the same effect a real string section gets from several individually-built instruments played by different players, rather than one instrument's identical timbre stacked. Worth remembering whenever multiple real hardware instances of the same synth are available for a chord part: assign different units to different notes rather than layering the same unit's output.

## Design philosophy: dial back internal modulation

With this much continuous, independent expression coming from the player's hands per note, the source's own advice is to deliberately DIAL BACK the traditionally elaborate internal modulation/filter-sweep programming that normally adds "organic" motion to a static waveform — most of the expressive motion should come from touch, not from pre-programmed modulation, or the two start fighting each other rather than compounding.

## A vintage precursor: the CS-80 ribbon strip

Continuous per-note expression didn't start with MPE — the Yamaha CS-80's pitch-bend ribbon strip is a genuine hardware precursor, and Stevie Wonder used it for a two-hand vibrato-simulation trick: sustain a held note with one hand on the keybed, then use a separate finger on the other hand to manipulate the ribbon strip in real time to fake vibrato, exactly as a guitarist would bend a sustained note. Because the ribbon is continuous rather than stepped/quantized, the resulting pitch movement reads as natural rather than mechanical — the same quality this note's MPE pitch-bend-resolution discussion above cares about on modern controllers. A related one-note ornament from the same lineage: hold a sustained note and rapidly re-articulate a *lower* note against it, the synth-performance equivalent of a classical trill, used as an alternative to vibrato rather than a substitute for it. → Anthony Marinelli Music, [[Stevie Wonder and MJ Keyboard Secrets by Greg Phillinganes]]

**The CS-80's other precursor trait — hardwired poly aftertouch, no MIDI or CV converter required — is what actually defines its "musicality," according to Steve Porcaro (Toto), who used it throughout "Africa," "Rosanna" and Michael Jackson's "Human Nature": every held note responds independently to touch pressure, "like individual players," rather than uniformly, and Porcaro says even later poly-aftertouch-capable MIDI synths don't fully recreate that quality.** The same ribbon/glide pedal covered above has TWO distinct modes, both different from ordinary portamento: **glissando mode** moves pitch in true half-steps rather than a continuous slide, and can send different held notes in two different directions AT ONCE — releasing the pedal jumps the pitch immediately to its destination. A second mode does the opposite: releasing the pedal **stops the glide wherever it currently is**, letting a player freeze mid-slide instead of always resolving to the target note. Together, live control comparable to writing a glissando string-section part, but playable in real time — used on the intros to "After the Love Is Gone" and "Hollow Notes." Without a CS-80, the nearest tonal substitute (a Prophet-5 or Jupiter-8 clav-adjacent patch) still can't "breathe" the same way, since it's the touch response being emulated, not the raw timbre. → [[Voice Architecture]] — Anthony Marinelli & Steve Porcaro, [[Totos Steve Porcaro Shows How He Created the Synth Sounds on Africa Human Nature Rosanna and More]]

## Related

[[Voice Architecture]] · [[MPE Piano Roll Tools]] · [[Envelopes and ADSR]] · [[Filters and Resonance]]
