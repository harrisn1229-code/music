---
type: chain
title: Gorillaz Vocal Chain
reference: Gorillaz (2D lead vocal — Feel Good Inc, Clint Eastwood, DARE, On Melancholy Hill)
tags: [chain, vocal]
---

# Gorillaz Vocal Chain

**Reference/vibe:** 2D's lead vocal — lo-fi, band-limited, tape-warped, slightly detached and unpolished on purpose. The character comes from narrowing the vocal's frequency window and degrading it, not from cleaning it up.
**Signal source:** Dry lead vocal, already comped/edited, no processing yet.

## Chain overview
Tune → band-limit → level → degrade (the core ingredient) → tame new harshness → subtle wobble/width → dub-style delay → boxed reverb. The whole chain works against "clean" — every stage after compression is there to remove fidelity, not add polish.

## Signal chain

### 1. [[Auto-Tune Pro]] — Pitch character
**Starting point:**
- Mode: Classic
- Retune Speed: 35–50
- Key/Scale: match song key
- Humanize: on, ~50%
- Natural Vibrato: default

**Why:** Keeps the vocal glued to key without the hard-tune snap — 2D's delivery is laid-back and occasionally loose, not robotic. Faster retune speed (20–25) is a valid variation for the more processed/detached lines.

### 2. [[Pro-Q 4]] — Band-limiting EQ
**Starting point:**
- HPF: 24 dB/oct @ 120–150 Hz
- LPF: 24 dB/oct @ 5–6 kHz
- Broad cut: −2 to −3 dB bell @ 350–500 Hz
- Small shelf boost: +1.5 dB @ 2.5 kHz

**Why:** This is the single most defining move in the chain. Cutting both extremes narrows the vocal into a boxed, "small speaker" window before anything else touches it — everything downstream degrades that narrowed signal.

### 3. [[Pro-C 2]] — Leveling compression
**Starting point:**
- Style: Vocal
- Ratio: 3:1
- Attack: 10 ms
- Release: Auto
- Gain reduction: 4–6 dB
- Knee: soft

**Why:** Evens out the performance without squashing it pop-vocal tight — keep enough dynamic looseness that the lo-fi stage has real transients to chew on.

### 4. [[RC-20 Retro Color]] — Lo-fi degrade (core ingredient)
**Starting point:**
- Mode: Lo-Fi or Tape
- Wow & Flutter: 15–25%
- Noise (vinyl/tape): 10–15%
- Bit Crush: 20–30%
- Mix: 40–60% (blend, don't commit fully dry/wet)

**Why:** Does the heavy lifting for the "Gorillaz" texture in one plugin — unstable pitch wobble, crushed bit depth, and print noise. Keep it as a blend so words stay intelligible; push higher for hookier/more processed lines, pull back for verses that need to sit under a busy arrangement.

### 5. [[Pro-DS]] — De-ess
**Starting point:**
- Range: 6–8 dB
- Frequency: 4–6 kHz (lower than a normal de-ess band since the top end is already rolled off by Pro-Q 3)
- Mode: Split-band

**Why:** Bit-crushing and tape saturation both add digital/harmonic harshness in the sibilance range — this reins it in without smoothing away the grit from step 4.

### 6. [[kHs Chorus]] — Subtle wobble/width
**Starting point:**
- Rate: 0.3–0.6 Hz (slow)
- Depth: 15–25%
- Mix: 15–20% (parallel)

**Why:** A touch of instability and width reminiscent of the slightly-detuned doubling in Gorillaz vocal stacks — not a lush pop chorus, just enough to feel unstable.

### 7. [[Echo]] — Dub slap delay (send/return)
**Starting point:**
- Sync: dotted 1/8 or 1/4 note
- Feedback: 15–25%
- Filter repeats: band/low-pass around 1.5–3 kHz
- Return level: 10–15%

**Why:** Filtered, degraded slap-back repeats sitting behind the dry vocal are a recurring Gorillaz production signature — the repeats should sound more boxed than the source, not less.

### 8. [[ValhallaRoom]] — Boxed reverb (send/return)
**Starting point:**
- Size: small–medium
- Decay: 0.6–1.0 s
- Pre-delay: 15–25 ms
- Damping/filter: roll off both highs and lows on the return
- Return level: 15–20%

**Why:** Gives space without restoring fidelity — filter the return to match the vocal's narrowed band so the reverb doesn't sound cleaner/wider than the dry signal it's tailing.

## Vocal arrangement

| Section | Lead | Behind it |
|---|---|---|
| Verse | 2D — band-limited, tape-warped, detached | nothing |
| Chorus | 2D doubled, still narrow | a loose octave-up or a woolly harmony |
| Feature | **a different character entirely** — different voice, different degradation | — |

**The move — the guest verse is a different treatment, not just a different person.** The band's structural signature is that each character gets their own frequency window and their own damage. A section changes because the *processing* changes hands.

**Narrow it, don't clean it.** The character comes from the shrunken frequency window (see the chain above), so a "bigger" chorus means more of the same narrow voice, never a wider one.

**Stack count: 1 → 2–3.**

## Notes / variations
- For a more extreme/robotic 2D moment (bridge ad-libs, "Murdoc"-style lines), push Auto-Tune retune speed down to ~10–15 and RC-20 bit crush past 40%.
- If the track is dense, drop the Echo/ValhallaRoom return levels first — the band-limiting + RC-20 stages carry the vibe even dry.
- [[kHs Bitcrush]] or [[Decimort 2]] are viable swaps for RC-20 Retro Color if you want to dial bit-crush and wow/flutter independently instead of RC-20's bundled character.
