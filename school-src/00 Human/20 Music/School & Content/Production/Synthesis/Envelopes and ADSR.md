---
type: synthesis
title: Envelopes and ADSR
tags: [synthesis, production, envelopes, adsr]
created: 2026-08-03
---

# Envelopes and ADSR

An envelope is a shape drawn over time, triggered by a note, applied to a parameter. It is not a sound — it's a controller.

> [!warning] The one to fix first
> **Three of the four ADSR controls are *times*. Only sustain is a *level*.** The placement (SYN-06) had decay filed as a level, which is the single most common ADSR misread and the reason decay controls never behave the way people expect.

## The four stages

| Stage | Type | What it does |
|---|---|---|
| **Attack** | **Time** | How long to rise from silence to full level after the key goes down |
| **Decay** | **Time** | How long to fall *from* full level *down to* the sustain level |
| **Sustain** | **Level** | The level it holds at while the key stays down |
| **Release** | **Time** | How long to fall from the sustain level to silence after the key comes up |

Read as a sentence: *rise over **A**, fall over **D** until you reach **S**, hold there, then fall to zero over **R**.*

Decay is a time because it describes a *journey* — from peak down to sustain. Sustain is a level because it's a *destination*, not a duration. Sustain is also the only stage with no time of its own: it lasts exactly as long as you hold the key.

```
 level
   │      ╱╲
   │     ╱  ╲______________          ← sustain LEVEL (held)
   │    ╱                   ╲
   │   ╱                     ╲
   └──┴────┴──────────────────┴──── time
      A    D                  R
      ↑    ↑                  ↑
    time  time              time
```

## Two envelopes, two jobs

Every subtractive patch uses at least two, and knowing which is which solves most "why does it sound wrong" questions.

- **Amp envelope** → the [[Signal Path|amplifier]]. Controls *loudness* over time. **Mandatory** — with no amp envelope there's no sound at all.
- **Filter envelope** → the [[Filters and Resonance|filter]] cutoff. Controls *brightness* over time. This is where character comes from.

The filter envelope has an extra control the amp envelope doesn't: **envelope amount** (sometimes "env depth" or a bipolar knob). It scales how far the envelope pushes the cutoff, and it can be negative — a negative amount makes the filter *close* on attack instead of opening, which is a distinctly different and underused sound.

## The four shapes worth knowing

Most patches are a variation on one of these.

**Pluck / percussive** — attack 0, short decay, **sustain 0**, short release.
All the energy is in the first fraction of a second and then it's gone. That's what "pluck" means, and the sustain-at-zero is the part people miss (SYN-12). Copy the same shape onto the filter envelope with a healthy envelope amount and you get the bright-then-dark snap that sells it.

**Pad** — slow attack, long decay, high sustain, long release.
The note swells in and lingers. A pad with a fast attack isn't a pad, it's an organ.

**Organ / stab** — attack 0, decay irrelevant, **sustain 100%**, release 0.
Fully on while held, fully off when released. Decay does nothing here because sustain is already at maximum — there's nowhere to fall to. Useful to understand: it's why the decay knob sometimes appears broken.

**Bass** — attack 0, medium decay, sustain moderate, short release.
Instant, some front-weight, controlled tail. Short release matters — a long release on a bass smears every note into the next and is the most common cause of muddy low end.

## Beyond ADSR

- **DAHDSR** ([[Serum 2]], [[Wavetable]]) adds *delay* before the attack and *hold* at the peak. Delay is genuinely useful for staggering layers so they don't all hit at once.
- **Envelope curves.** Most modern synths let you bend each segment from linear to exponential. Real acoustic decay is exponential — a linear decay reads as synthetic, which is sometimes exactly what you want.
- **Free envelopes / mod envelopes.** Any spare envelope can be routed anywhere via the modulation matrix — wavetable position, FM amount, pan, effect depth. See [[LFOs and Modulation]].
- **Velocity → envelope.** Routing velocity to the filter envelope amount is what makes a patch feel played rather than typed: hit harder, it opens brighter.

## On your synths

[[Analog]] and [[Model 84 Polyphonic Synthesizer|Model 84]] give you the classic pair, amp and filter, and nothing else — the best place to learn the shapes. [[Drift]] has one envelope hard-wired to the amp plus a flexible second. [[Wavetable]] and [[Serum 2]] give three or more, freely routable. [[Operator]] gives each of its four operators its own multi-stage envelope, which is the whole reason FM can produce evolving timbres — see [[FM Synthesis]].

## Drill

Load [[Analog]] on a saw wave and build all four shapes above from scratch, amp envelope only. Then add the filter envelope to each and find the envelope amount that makes the pluck snap. Ten minutes, and the ADSR misread stops being possible.

## Related

- [[Signal Path]] — where envelopes act
- [[Filters and Resonance]] · [[LFOs and Modulation]] · [[Voice Architecture]]
- [[Synthesis Index]]

## From videos

- **A plucked-mallet patch (Thriller's "Minimoog marimba") is TWO separate decay-only envelopes working in tandem, not one shared shape — filter decay controls the brightness-closing speed of the "attack" transient, VCA decay independently controls how long the note actually rings.** Both envelopes: no attack, no sustain — decay time is the entire shape, on both filter and amp, matching the concept-page rule that sustain-at-zero is what makes a "pluck" rather than a held bass. The two decays are tuned separately: get the filter's closing SPEED right first (how fast the "attack" brightness fades), then dial VCA decay down to stop the note ringing rather than assuming one decay value covers both jobs. Keyboard tracking on the filter was needed even on a plucked patch — without it, high notes didn't "speak" as clearly, requiring either tracking or a compensating higher initial cutoff. Two oscillators (mid pulse wave, octave below; skinny pulse wave, octave above, at lower mixer volume) with resonance added specifically for a thinning, highpass-like "plunk" character that clears space in a dense track rather than just adding emphasis. → [[Filters and Resonance]], [[Bass Design]] — Anthony Marinelli, [[MJ's Thriller Minimoog Marimba Synth Breakdown]]
- **Let the envelope generator control ONLY the attack portion of a filter's modulation, and leave the sustain stage parked at a fixed formant frequency (no EG amount there at all).** This gives a bass or lead patch a brief "bite" transient at the start of each note without disturbing an otherwise-static, vowel-like tone underneath — avoids the "robotic" sameness of a patch where every note follows the exact same full envelope shape, while keeping a stable, recognizable tonal core across notes. Pairs with using resonance to build that fixed formant in the first place (park cutoff+resonance manually, no filter-envelope modulation on the sustain portion). → [[Filters and Resonance]], [[Bass Design]] — Anthony Marinelli, [[The Most Misunderstood Knob On Your Synth]]
- **A more precise variant of "VCA as gate": set VCA decay slightly LONGER than the filter envelope's decay (not equal, not zero), specifically so the filter's own decay shape stays audible rather than getting cut short by the amp stage — and phrasing can be controlled purely via legato vs. staccato note timing on a keyboard with no velocity/aftertouch at all.** From the Minimoog "Baby Be Mine" (Thriller) warble lead: resonance set almost to self-oscillation is extremely sensitive (a tiny nudge is the difference between clean and a "squirt" artifact); explicit numeric settings get you to about 85%, ear does the rest — same discipline as [[Synth Patching and Editing Method]]'s 80% rule, just quantified higher here since real numbers were given. → [[Bass Design]] — Anthony Marinelli, [[How I Programmed the Baby Be Mine Warble Mini Moog Lead on Thriller]]
- **The VCA envelope can be set to act purely as a gate (no attack, full decay, full sustain) so that ALL the tonal shaping happens at the filter envelope instead — a clean division of labor between the two envelopes on a subtractive patch.** From a Minimoog bass recreation: filter envelope does the real work (attack slowed slightly for a "talking" onset without losing playability, decay speed setting the downward tone-slope character, sustain level required for a held note to actually sustain rather than decay away regardless of key-hold time), while the VCA envelope just passes that shape through to the output essentially unmodified. Worth trying deliberately when a patch's shaping feels muddled between two envelopes fighting each other. → [[Bass Design]] — Anthony Marinelli, [[Burn Rubber on Me - Legendary Synth Bass REVEALED]]
- **A small amount of sustain and release is what lets a bass patch be PLAYED expressively, not just triggered — a direct nuance on this page's own "short release" bass preset above.** This page's bass preset (attack 0, sustain moderate, short release) is the right default for a clean, controlled low end — but "short"/"moderate" isn't zero, and this is the reasoning why: with sustain at (or near) zero, a held note just decays away no matter how long you hold the key, so there's no way to *choose* to sustain a note versus let it decay — a little sustain gives you that choice back without materially changing the pluck. Release matters even more for anything triggered repeatedly (a fast repeated-note bass line, or MIDI-programmed 16th-note stabs): with release at zero the sound is clipped/percussive on every hit regardless of note length; a short-but-nonzero release restores a natural tail between repeated triggers so the part doesn't sound gated. Net: treat "short release" as "short, not off" — dial in the smallest amount that stops the part sounding clipped, don't default to zero for a punchy bass. → [[Bass Design]], [[Voice Architecture]] (single/multi-trigger articulation is the companion half of this) — Anthony Marinelli, [[10 Tips For Synth Bass]]
- **"Envelope squeeze" — collapse all four ADSR stages toward each other on the time axis at once, rather than shortening one stage in isolation.** Turned fully up on a purpose-built plugin control, it "squash[es] everything together," intensifying the source's texture/character — distinct from the usual single-stage tweak (e.g. shortening decay alone): it compresses attack/decay/sustain-hold/release as a group, so the whole note reads more percussive/dense rather than just shorter. *(described qualitatively in the source — no numeric setting given)* No dedicated one-knob "squeeze" control on owned synths, but the effect is approximable by hand: shorten Attack + Decay + Release together in the same direction rather than isolating one. → [[Layering and Stacking]] — loner, [I Created The 'Perfect' Plugin For Producers](https://www.youtube.com/watch?v=kI2f9JNImGE)
