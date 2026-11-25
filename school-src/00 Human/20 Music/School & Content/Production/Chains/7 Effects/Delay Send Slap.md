---
type: chain
title: Delay Send Slap
chain_type: send
family: fx
source: n/a
routing: "Return track — vocals mainly → Vocal Bus"
signal_chain: [EchoBoy, Pro-Q 4]
status: default
tags: [chain, send, delay]
---

# Delay Send Slap

**Role:** Single short echo (80–140 ms) — the "thickener" delay. Reads as size and attitude, not as an audible echo. THE hip hop and rock'n'roll vocal effect (and the sound of every 50s Elvis record).

## Signal chain

### 1. [[EchoBoy]] — The slap
- **Echo Type: Studio Tape** (①, Slapback style ②) · **Time 110 ms, unsynced** (③ — slap is a physical size cue, not rhythmic; syncing to tempo usually makes it worse) · **Feedback 5%** (④ — ONE repeat) · **Wow & Flutter on** for tape character (⑤) · **High Cut ~6 kHz** on the repeat (⑥) · **Mix 100%** (⑦ — it's a return)
- **Why:** One fast, slightly-degraded repeat fools the ear into hearing a bigger performance rather than an effect — thickness without the pitch-wobble of chorus or the wash of reverb.
- 🎬 *From video:* Disclosure reach for **slapback (+ a short "toilet"-sized room verb) to put a vocal *in a space* rather than flood a cathedral** — reads as "mic in a room," more natural/human; and on a chorus bus a slapback keeps it **present/"right there"** while other sections use long verbs (a very Lennon/Beatles move) — Disclosure, [Deeper](https://youtu.be/SM0FZ58ckVw) / [Waterfall](https://youtu.be/sL5CG444qwQ). Often run as a **track insert**, not just this send.

### 2. [[Pro-Q 4]] — Filter
- HPF 250–400 Hz · LPF 3–5 kHz — the repeat should always be *smaller* than the source (duller + narrower = sits behind). EchoBoy note: its low cut sits *before* the delay circuit, high cut *after* — use the high cut for taming, and remember darker repeats read as *moving away* (free depth).
- Stereo control: EchoBoy's tweak panel has a **L/R offset** (~25 = repeats spread off-center; 0 = mono slap dead behind the voice — both are valid looks).

**Combine, don't choose:** slap + [[Delay Send Other]]'s 1/8 running together is the standard pro vocal setup — slap does thickness, the synced delay does motion.

## Usage
- Lead vocal (rap verses especially — slap instead of reverb keeps it dry-but-big) · ad-libs · lead guitar stabs.

## Variations
- **Doubling effect:** pull time down to 60–90 ms and pan the return slightly off-center — fake double.
- **50s/Beatles slap:** more EchoBoy wobble + saturation, time ~120–140 ms.

## From videos

- **The general principle behind this send's own "sidechain-duck the return to the lead" entry below: this works on ANY reverb/delay plugin, not just ones with built-in ducking — put it on an aux, sidechain a compressor to the dry vocal, done.** Pairs with an EQ dip at 200–400 Hz on the return for the vocal-masking-range half of the fix. → [[Sidechaining]], [[Masking and Carving]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)
- **Howard's one-slap rule** — a single, extremely short delay repeat, very low in the mix, on almost anything (vocals, drums, instruments): "it makes it sound like you're in a small club — that's where things sound good" — Disclosure, [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8) → [[Depth and Space]]
- **Band-limit inside [[EchoBoy]]** — use EchoBoy's built-in high/low cut on the return instead of a separate EQ after it: one less device, same tail control — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
- **Sidechain-duck the return to the lead** — compressor on the delay return keyed from the main vocal: tails tuck while words happen, bloom in the gaps — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk) → [[Sidechaining]]
