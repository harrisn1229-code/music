---
type: chain
title: Reverb Send Long
chain_type: send
family: fx
source: n/a
routing: "Return track — receives sends from features/hooks → Vocal Bus"
signal_chain: [ValhallaPlate, Pro-Q 4, Pro-C 2 (sidechain)]
status: default
tags: [chain, send, reverb]
---

# Reverb Send Long

**Role:** The "big moment" space — plate/hall tails for hooks, vocal features, ballad moments. Where [[Reverb Send Room]] is invisible glue, this one is *audible* as an effect.

## Signal chain

### 1. [[ValhallaPlate]] — The tail
- **Mix 100%** (②) · **Decay 2.4 s** (③ — 1.8–3.0 window) · **Pre-delay 35 ms** (④ — longer than the room: big spaces have late first reflections, and the longer gap keeps the lyric intelligible under a long tail)
- Plate for vocals (dense, bright, no early-reflection clutter) — swap [[ValhallaVintageVerb]] hall for orchestral/ballad size.

### 2. [[Pro-Q 4]] — Filter
- HPF 250–350 Hz · LPF 6–8 kHz (slightly brighter than the room — plate sparkle is the point) — same band-limiting logic as the room send.
- 🎬 *From video (clarity):* a narrow dip around **1.5–3.5 kHz** on top of the HPF/LPF keeps a long, audible tail from burying the lyric — pair with pre-delay in the **10–50 ms** range (this send already runs 35 ms) so the transient clears before the tail arrives — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)

### 3. [[Pro-C 2]] — Duck the tail (sidechain from lead vocal)
- 2:1 · **2–3 dB GR** keyed from the dry lead · slow release
- **Why:** The pro trick for big-but-clear: the tail tucks *while the singer sings* and blooms in the gaps between phrases. You get cathedral size with dry-vocal intelligibility.
- 🎬 *From video (creative sends):* the **George Michael trick** — invert a **de-esser** and use it to *drive* this send, so only the **S's** trigger the reverb (sibilance as a crash cymbal) — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck). And **reverse-reverb "dream" swells** — print a part full-wet, reverse the audio → a rising wash into a hit — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI). (These often live as **track inserts**, not just this send.)

## Usage
- Lead vocal on hooks (automate the send up for choruses) · harmonies · featured guitar/piano moments · risers.
- 🎬 *From video:* introduce this send at a SPECIFIC section rather than leaving it running from the top — on Adele's "Rolling in the Deep," the verse runs a tape delay only (no reverb at all), and this send is switched on for the first time at the bridge, one section before the chorus's delays arrive — a clean three-step example of staging each vocal-effect send to a different structural landmark. → [[Arrangement and Song Form]], [[Delay Send Other]], [[1 Main Vocal Track]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]

## Variations
- **Shimmer moments:** swap in [[ValhallaShimmer]] for the pitched-up wash (intros/bridges/outros).

## From videos

- **Confirms this send's own §3 sidechain-duck design as the universal recipe: aux + compressor keyed off the DRY vocal, ducking the attack/decay and blooming back in the gaps — the general version of exactly the Pro-C 2 stage this chain already runs.** Pair with the return's existing 1.5–3.5 kHz clarity dip; a broader version of the same masking carve is 200–400 Hz specifically. → [[Sidechaining]], [[Masking and Carving]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)
- **Reverb held back until the bridge, one section before delays arrive at the chorus — see the inline 🎬 note in Usage above for the full three-step build.** → [[Arrangement and Song Form]], [[Delay Send Other]], [[1 Main Vocal Track]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **Clarity move for a long, audible tail: dip ~1.5–3.5 kHz on the return EQ, keep pre-delay in the 10–50 ms window** — this send's existing 35 ms pre-delay and Pro-Q 4 band-limiting already follow the general principle; the added specific is a narrow attenuation around 1.5–3.5 kHz so the lyric-intelligibility band stays drier under a long tail, worth reaching for whenever a hook-moment reverb is fighting the vocal for clarity. → [[Pro-R 2]] — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)
- **The Kenny long-verb recipe: [[ValhallaRoom]] 3.0 s decay · 100% wet on the return · depth ~90% · EQ on the return channel** — send-level scale from his template: Travis-style washed ad-libs = heavy send, wet main vocal = moderate, "pretty much dry" = barely cracked open — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk)
- **2022 update: long tier swapped to [[ValhallaVintageVerb]]** ("just like the way it's been sounding on vocals") — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
