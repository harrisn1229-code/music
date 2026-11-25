---
type: chain
aliases: ["Vocal Bus"]
title: Vocal Bus
chain_type: bus
family: vocals
source: mixed
routing: "[Main Vocal Group, Backup Vocals Group, vocal FX returns (Delay Send Slap, Delay Send Other, Reverb Send Long)] → Vocal Bus → Master"
signal_chain: [UAD Teletronix LA-2A Silver, Decapitator, Pro-Q 3, Oxford Inflator, Pro-DS, Soothe2]
status: default
anchor: current working chain (Bus_Vox export)
tags: [chain, vocal, bus]
---

# Vocal Bus

**Role:** Final polish on *all* vocals summed — the "vocal master." This is your current working chain, kept as the default with researched starting points.

**Vocal FX returns feed this bus** — [[Delay Send Slap]], [[Delay Send Other]], [[Reverb Send Long]] output here (not master), so the glue melts tails into the dry voice and a bus fader ride moves voice + space together. Safe because the GR here is gentle (1–3 dB — heavy bus compression would pump the tails). Mix-wide returns ([[Reverb Send Room]], [[Width Send]], [[Saturation Send]]) stay → master. If a hook wash ever turns murky, the Decapitator/Inflator densifying the tails is the suspect — trim the return level, don't re-route.

🎬 *From video:* the reason THIS bus exists as a separate, dedicated bus rather than sitting inside a general vocal group — with the lead routed here and every OTHER instrument (including backing vocals/doubles/harmonies) summed into a separate instrumental bus, LUFS meters on both buses let you measure and match the two: in the majority of popular mixes the lead vocal reads at roughly the SAME loudness as the instrumental. Once matched, push the vocal slightly below that reading to sit "in" the mix, or slightly above to sit "on top of" it. → [[Master Chain]], [[Referencing and Translation]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)

## Chain overview
Slow leveler → saturation → broad tone → density → de-ess → resonance cleanup. The logic: glue the level first so every later stage sees a steady signal; add color; then the last three stages *clean up what the color added*. De-ess and soothe sit at the end because saturation and Inflator both regenerate harshness.

**Bus philosophy:** by the time audio hits a bus, moves should be broad and gentle — 1–3 dB, wide Qs, low mix knobs. If you're reaching for surgery here, the fix belongs on a track or group.

## Chain

### 1. [[UAD Teletronix LA-2A]] — Program leveling
- Compress mode (Limit rarely sounds good on vocals) · **1–3 dB GR** on the loudest phrases (up to ~5 on dense material) · gain to match unity
- **Why:** The LA-2A's optical release "stomps on the brakes" — fast at first, slowing as it approaches zero — so it rides the performance like a fader without audible letting-go. With the [[UAD Tube-Tech CL 1B mkII|CL 1B]] as the opto leveler on the way in, the chain now rides gently at *both* ends — CL 1B in, LA-2A on the bus — and the fast peak-precision work sits in the middle on [[Pro-C 2]] (§4.3 of the track chains). Two smooth opto stages bracketing one fast stage: no single comp does all the work, which is the point. Three gentle stages always beat one deep one — an LA-2A asked to do all the work alone clamps hard on peaks and recovers too slowly.
- 🎬 *From video:* the point of a leveler here is to **glue a stacked vocal** (one lead + doubles) into one voice; Disclosure follow it with a character pass (even a flat Neve, "not done unless it's been through a Neve"). A subtle [[OTT]] at ~23% can stand in for the glue and "sounds like a G-bus comp" — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI) & [NO CAP](https://youtu.be/kz5dmb3QdI8).

### 2. [[Decapitator]] — Saturation
- Style A (tape-ish) or E (aggressive) · Drive 2–4 · Mix 20–35% · Punish off
- **Why:** Harmonic density on the summed stack reads as loudness and presence without EQ boost. Post-leveler = consistent drive; parallel mix keeps the transients honest.

### 3. [[Pro-Q 4]] — Broad tone
- HPF 80–100 Hz on the sum · wide presence lift +1–1.5 dB @ 3–4 kHz if needed · air shelf +1 dB @ 10 kHz+
- **Why:** One broad tonal statement for the whole vocal picture. Cuts the saturation's low-mid buildup too (check 200–300 Hz).

### 4. [[Oxford Inflator]] — Density
- Gentle bus use: Effect 20–40% · Curve 0 · watch output — keep unity
- Sonnox's intended full workflow (for when you want more): **Effect 100%, ride the input fader up until the clip lights flicker, then pull the output down to match the bypassed peak level** — that's the honest way to hear only the effect, not extra volume
- **Curve meaning:** −50 = subtle richness/depth · 0 = balanced valve warmth (default) · +50 = fat, mid-forward, eats subtle dynamics
- **Why:** Perceived loudness/fullness without GR (it's psychoacoustic, not compression — it can even make full-level white noise sound louder). The "make it sound finished" stage. Always level-match when judging it.

### 5. [[Pro-DS]] — De-ess
- Split-band · range 3–6 dB
- **Why:** Decapitator + Inflator both push sibilance back up — catch it after them, not before.
- 🎬 *From video:* on a committed track, **manual de-essing beats this** — chop and lower each harsh S by hand to dodge the lisp/phasing a de-esser adds; a bus de-esser is the safety net, not the whole job. And add air *before* the harshness stages with a boost-type de-esser ([[Gem Dopamine]]) so the top stays breathy — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck) & [NO CAP](https://youtu.be/kz5dmb3QdI8).

### 6. [[Soothe2]] — Final resonance tame
- Depth moderate (start ~30%, raise until audible, back off) · sharpness medium-high · focus 1–8 kHz
- **Why:** The last safety net: dynamic, frequency-specific control over whatever harshness survived — far more transparent than carving static EQ dips.
- 🎬 *From video:* keep **one Soothe on the bus rather than per track** — it's CPU-heavy and one instance on the sum tames harshness across the whole stack. Same plugin also works keyed off the vocal to duck *other* instruments out of its way (see [[Sidechaining]]) — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ) & [Looking For Love](https://youtu.be/NlJt0pCptGk).

## Meters & gain staging
Meter sandwich per [[FX Chain System]] — ~0 VU in, unity out. Every device's output gain set so bypassing it doesn't change level (otherwise "louder = better" fools you on every knob).

## Variations
- **Trap/hip hop:** Decapitator Style E, Drive 4–5, Mix up to 40% — modern rap vocal density.
- **Ballad/acoustic:** drop Decapitator mix to ~10–15%, Inflator to ~15% — keep the dynamics breathing.
- **If the bus feels overworked:** soothe2 earlier (before Decapitator) so the saturator gets cleaner input — try both, keep the one where 3–4 kHz stays sweet.

## From videos

- **The "sound-good-izer" stays OFF until the song is done** — Kenny's chain ends in a CLA Vocals-style lift (bass module a touch + light compress) that he never enables while tracking: it adds latency, adds character artists get used to, and hides real problems. Owned lane: treat [[Oxford Inflator]]/[[Saturn 2]] here the same way — toggle on when the record is finished, then re-trim levels — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk)
General tips pulled from production breakdowns (via `/music-enrich`), newest-first.

- **Subtle [[OTT]] (~23% depth) glues a stack like a G-bus comp** without the pumped sound — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8)
- **One [[Soothe2]] on the bus** (CPU-heavy) tames harshness across the whole stack; **[[Gem Dopamine]]** adds air while de-essing at the front — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ) & [Higher Than Ever Before](https://youtu.be/9XkHSronZck)
- **Manual de-essing beats a bus de-esser** once committed — chop and lower each harsh S by hand to avoid the lisp/phasing — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck) & [NO CAP](https://youtu.be/kz5dmb3QdI8)
- **Glue-comp a 3-vocal stack**, then character (even a flat Neve for "it's been through a Neve") — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI)
