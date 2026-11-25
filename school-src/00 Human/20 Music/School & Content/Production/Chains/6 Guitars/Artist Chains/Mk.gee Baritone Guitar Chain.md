---
type: chain
title: Mk.gee Baritone Guitar Chain
reference: Mk.gee (Two Star & the Dream Police; "Alesis," "DNM," "How Many Miles," "CZ")
chain_type: style
family: guitars
tags: [chain, guitar, style, mkgee, texture]
---

# Mk.gee Baritone Guitar Chain

**Reference/vibe:** a low, almost bass-like guitar tone that swings from clean whisper to crunched-out chaos, built entirely around one idea — **the effect only reacts when you play loud.** Mk.gee has done almost no interviews; this chain is reverse-engineered from a single onstage gear Q&A (his actual instrument + pedal), the record itself, and a loner (YouTube) breakdown, [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU).
**Signal source:** a 60s reissue Fender Jaguar modified to a **baritone range** (Mk.gee's actual gear) — no baritone guitar owned, substitute a baritone-range sampler/VST for the same low register. Works equally on a real electric guitar tracked through [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]] first.

## Chain overview

Preamp/comp/amp for a dynamics-dependent crunch → chorus/flanger/tape for overall color → a **noise-gated distorted-reverb send** (the actual secret — a Death By Audio-style FX Ranger pedal with a hidden built-in noise gate) that only fires on the loudest notes. Everything downstream of the first stage depends on the source performance having a genuinely **wide dynamic range** — quiet notes stay clean, loud notes trigger both the preamp crunch and the gated reverb. A flat/compressed take defeats the whole chain.

## Step 1 — Track/select the source

- **Baritone range is the tone, not a processing trick.** If tracking a real guitar, use (or approximate with a capo/tuning) a baritone instrument, or pitch a standard guitar's DI down before the chain. If using a sampler/VST, pick a baritone-voiced patch specifically for the low, semi-bass-like register.
- **Play/record with a genuinely wide dynamic range** — some notes really quiet, some really loud. This is a hard requirement, not a style choice: the preamp crunch (§2) and the gated reverb send (§3) are both threshold-dependent on note volume. → [[Gain Staging]]

## Step 2 — Front-of-chain tone (Ableton)

### 1. [[Decapitator]] (preamp) — crunch on the loudest notes only
- Drive high enough that the loudest played notes get a crunchy, distorted texture; quieter notes stay comparatively clean. *(general starting point — no exact drive value given on screen)*
- **Why:** this is where the wide-dynamic-range performance first pays off — the distortion is a function of note volume, not a constant setting.

### 2. Compressor — light shaping
- Gentle, not flattening — the goal is to preserve the dynamic swing from §1, not squash it back out. → [[Compressor]]

### 3. Amp sim
- Best-match owned lane: [[Archetype- John Mayer X]] or [[Guitar Rig 7 FX]] for the amp stage after the preamp/comp.

### 4. [[Chorus-Ensemble]] → [[Phaser-Flanger]] → [[Kramer Tape]] — overall tone/color
- Chorus first, flanger second, tape emulation last — a general width/movement/warmth stack, not a single dramatic effect. Same three-device order reused (differently weighted) in the CZ-style synth variation below.
- **Why:** sets the baseline tone before the send-based secret sauce gets added — this stage should sound "good" on its own with the reverb send off.

## Step 3 — The secret sauce: noise-gated distorted-reverb send

Mk.gee's actual pedal (named on camera): an FX Ranger-style **distorted reverb**. The part he never mentioned describing it: **it has a noise gate built in**, so the effect only activates above a set input volume.

1. Create a send/return track (Ableton: right-click the source track → **Route to This Track**, or route via a Return track).
2. On the return, in order: **[[Reverb]] → Distortion → Compressor.**
3. Add a **[[Gate]] BEFORE all of it** — first device in the return chain.
4. Set the gate's threshold so **only the loudest notes cross it** and trigger the reverb/distortion/compressor stack; quieter notes pass through with no send at all.
5. **Push the send harder (more aggressive Reverb + Distortion) on chord/harmony parts than on the bass part** — used to fill out arrangement space on a chords pass without drowning the lower, sparser bass part.

**Why:** without the gate, the distorted reverb is just a static effect on the send level. With the gate first, the effect becomes *performance-reactive* — it only "blooms" when the player pushes, which reads as the send coming alive rather than sitting there constantly. This is the actual mechanism Mk.gee's live pedal hides.

## Arrangement

**Where it sits:** low and almost bass-like — **BASS into MIDS**, which means it needs an explicit agreement with the actual bass part about who owns below 250 Hz.

**When it plays:** the gate decides. The distorted-reverb send only opens when he plays loud, so **dynamics are the arrangement** — a quiet passage and a loud one are different sections with no parts added or removed.

**The stated move:** push the send harder on chord/harmony passes than on the bass part, to fill arrangement space without drowning the lower, sparser part (Step 3.5 above). That's slot management by send level — the same idea as [[Session Layout]]'s return rules, applied inside one instrument.

## Variations — CZ-style vintage synth chain

Same core device palette (chorus/flanger/tape/distortion/compression), reordered and extended, for a Casio CZ-5000-style vintage synth part instead of guitar (Mk.gee's song "CZ"):

1. **Source:** layer two DIFFERENT CZ-emulation VSTs — "Virtual CZ" (preset **"Sharp Angle"**) + a second, different CZ emulation from Arturia. Not owned → [[Plugin Wishlist]], [[Vintage Gear Worklist]] (Casio CZ-101 already tracked as the closest documented unit).
2. **[[Phaser-Flanger]] → [[Chorus-Ensemble]]** — movement/width, same two devices as the guitar chain, reordered flanger-first.
3. **[[Kramer Tape]]** as the tape stage — closest owned equivalent to "Reels," used in the original for its **envelope-mode noise knobs** (hiss only sounds while a note plays, not a constant bed). Real gap: Kramer Tape doesn't document the same envelope-linked noise behavior — flag if the constant-noise artifact becomes audible. → [[Plugin Wishlist]]
4. **[[Little Plate]]** — a clean plate reverb as the "reset" stage, deliberately placed *before* the final dirt stage rather than as the last effect ("plates tend to be nice and clean").
5. **[[Decapitator]] → [[Glue Compressor]]** — distortion then **heavy compression placed LAST**, which is what reveals/brings out the texture the noise (tape) and flanger stages generated earlier in the chain, rather than just leveling the part.
- Leave the **first note of every bar silent** in the synth part — copied directly from "CZ" — leaving room for the bass to start the loop instead of colliding with the synth on beat 1.
- Layer a second, loud lead synth on top for a dynamic "jolt," applying the same wide-dynamic-range principle as the guitar chain.

## Notes

- **This is a texture/sound-design chain, not a corrective one** — nothing here is EQ/de-noise; the whole point is a controlled, performance-reactive distortion/reverb interaction. Pair with a properly tracked/de-noised source if recording a real guitar ([[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]).
- **Dynamic range is the load-bearing idea across the whole chain** — see [[Gain Staging]] for the "play light, then push it hard" version of the same principle applied to drums on the same record.

**Sources:** loner — [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU) (00:11:42, 2025-01-26) · full note: [[loner - the secrets behind Mk.gee's HYPNOTIC production!?]]
