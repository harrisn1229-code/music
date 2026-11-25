---
type: chain
title: Width Send
chain_type: send
family: fx
source: n/a
routing: "Return track — vocals, synths, guitars → Master"
signal_chain: [MicroShift, Pro-Q 4]
status: default
tags: [chain, send, width]
---

# Width Send

**Role:** Parallel stereo thickener — the classic "pitch-shift widener" (a.k.a. the H3000 micro-pitch trick on every pop vocal since the 80s). Splits the signal to L/R copies detuned a few cents apart with tiny delays, creating width that doesn't exist in the mono source.

## Signal chain

### 1. [[MicroShift]] — The widener
- **Style I** (① — the classic H3000 recipe) · **Detune & Delay at 100% default** (②/③ — push toward 200% only for deliberately phasey/crazy moments) · **Mix 100%** (⑤ — return)
- **Focus knob** (④): set the crossover ~100–200 Hz — everything below stays mono *inside the plugin*, so the widening never touches the low end
- Audition all three styles per source — same trick, subtly different phase behavior
- **Why a send:** at 100% wet on an insert, micro-pitch makes the source blurry; as a *blend under* the dry center image, the dry keeps the focus and the shifted copies pure width. Focus + size simultaneously.

### 2. [[Pro-Q 4]] — Keep it out of the way
- **HPF 250–400 Hz** (belt-and-suspenders on top of the focus knob) · LPF ~10 kHz.

## Usage
- **Lead vocal hooks:** automate the send up in choruses — verse stays intimate/mono-ish, chorus blooms wide. The cheapest "chorus lift" in pop.
- 🎬 *From video (mono→wide drop):* make a chorus feel bigger **without turning it up** — keep the verse mono, then on the drop fade this send (or a chorus/rotary) up so it opens to full width; the fastest one-knob version is the **[[RC-20 Retro Color]] "Whip"** control, or just switch on a flanger/chorus/phaser for the drop — Disclosure, [Talk](https://youtu.be/PBbnvElf9ac).
- **Mono synths/guitars** that need to feel doubled without re-recording.
- 🎬 *From video:* direct confirmation of the exact hardware this send's "H3000 micro-pitch trick" is modeling — a real Eventide H3000 set to ±4 cents split L/R as a guitar-solo widener, run alongside a second H3000 on a subtle custom flange for character. Full technique on [[MicroShift]] — Chris Lord-Alge (Mix with the Masters), [[Mixing Muse Guitars - Chris Lord-Alge]].
- Never on bass, kick, or anything whose mono low end matters.

**Mono-compatibility check:** flip the master to mono ([[Utility]]) — the widened element should get quieter but not disappear or comb-filter. If it vanishes, drop the send or raise the return's HPF.

## Variations
- **Subtle tape-chorus flavor:** [[Chorus-Ensemble]] on the return instead — more vintage motion, less surgical width.
- **Extreme trap vocal width:** MicroShift Style II + higher send, panned doubles on top.
