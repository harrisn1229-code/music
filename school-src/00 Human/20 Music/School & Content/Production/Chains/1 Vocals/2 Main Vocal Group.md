---
type: chain
aliases: ["Main Vocal Group"]
title: Main Vocal Group
chain_type: group
family: vocals
source: mixed
routing: "[Main Vocal, Main Vocal (high), Double Vocal, Harmony Vocal] → Main Vocal Group → Vocal Bus → Master"
signal_chain: [Pro-Q 4, LALA]
status: default
tags: [chain, vocal, group]
---

# Main Vocal Group

**Role:** Sums the lead + its layers (high, doubles, harmonies) into one balanced element. Group-stage work is about the *relationship between the layers* and carving against the rest of the mix — the heavy lifting already happened on the tracks, and the [[3 Vocal Bus|Vocal Bus]] does the final polish. Keep this lean.

## Chain overview
Carve EQ → gentle glue. Balance between layers is faders/automation, not more processing.

## Chain

### 1. [[Pro-Q 4]] — Group carve
- EQ *against the other groups*: find where the vocal masks or is masked (usually 1–5 kHz vs guitars/synths, 200–400 Hz vs everything)
- Cut the offending band in the *other* group's chain first — boost here only if the vocal still needs it
- Dynamic node dip on this group only if a layer resonance pokes out when the stack is summed
- **Why:** Step 4 of the process — pick what stands out, EQ the interference out of the *other* tracks so the vocal wins its lane without being boosted into harshness.

### 2. [[LALA]] — Layer glue
- **Peak Reduction for ~1.5 dB GR** (① — slow/gentle) · **Comp mode** (③) · **HPF engaged** (④) · **Mix 100%** (⑤) · **Gain to unity** (②)
- **Why:** An LA-2A-style leveler melts the layers into one voice without audible pumping; the real leveling already happened per-track.

## Send FX (the shared vocal space)

One send bank, shared by **every** vocal lane (mains and ad-libs through the *same* returns) — that's what makes the stack sit in one room. Dialed here at group level; full recipes live in the send chain notes. Architecture per [[Kenny Beats Vocal Chain]]:

**Return routing:** the vocal-dedicated returns ([[Delay Send Slap]], [[Delay Send Other]], [[Reverb Send Long]]) output **into [[3 Vocal Bus|Vocal Bus]]**, not master — the bus glue melts wet into dry, and riding the bus fader carries the space with the voice. Mix-wide returns ([[Reverb Send Room]], [[Width Send]], [[Saturation Send]]) stay → master.

- **Delays — all [[EchoBoy]]:** 1/4, 1/8, 1/16, slap, 1/2 returns share one setting varied only by subdivision, band-limited with EchoBoy's internal high/low cut (no EQ after) → [[Delay Send Slap]], [[Delay Send Other]]
- **Delay returns sidechain-duck to the lead** — tails tuck under words, bloom in the gaps → [[Sidechaining]]
- **Reverb tiers:** short = [[Pro-R 2]] "Vocal Backings Bright" (body only; preset originates on the older Pro-R) · long/super-long = [[ValhallaVintageVerb]] → [[Reverb Send Room]], [[Reverb Send Long]]
- **[[Width Send]]** on hooks · **[[Saturation Send]]** for attitude sections
- **Spotlight throws are an insert, not a send** — dedicated "effects track": loud [[EchoBoy]] insert, high end cut, subdivision per throw, long-verb ducked under the ad-libs

## Variations
- **Dense stack sections:** automate the group fader, not the layers — the internal balance is already set.
- **If backups fight the lead:** the duck belongs on [[2 Backup Vocals Group|Backup Vocals Group]], not here.

## From videos

- **A gated-distant-mic alternative to a plugin reverb send, driven by the vocal's own dynamics** — David Bowie's "Heroes," Tony Visconti: three mics at increasing distance from the singer, with a [[Gate]] on the two farther mics thresholded so only louder singing opens them — quiet phrases stay dry, loud phrases progressively open the more reverberant, more distant mics. In-the-box equivalent: send the vocal to a room-verb return and gate that return's input off the vocal's own level, rather than automating a send fader by hand. → [[Gate]] — David Bennett Music Theory, [[15 facts you didn't know about classic songs]]
- **"The group has the chain"** — Kenny's mantra (via Alex Tumay's Young Thug template, ~150 released songs): every comp/verse/hook track stays 100% empty, the one chain lives here on the group, so takes punched in 30 minutes apart sound identical and every settings change happens in exactly one place. Exception: [[Auto-Tune Pro]] goes on individual tracks when parts need different keys/retunes — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk) + [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
