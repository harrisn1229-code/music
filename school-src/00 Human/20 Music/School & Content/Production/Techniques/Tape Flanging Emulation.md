---
type: technique
title: Tape Flanging Emulation
tags: [technique, modulation, flanging, tape, delay]
created: 2026-08-13
---

# Tape Flanging Emulation

Classic analog flanging comes from playing two copies of the same audio back nearly in sync and physically wobbling the speed of one tape machine so the two drift a couple of milliseconds apart and back — the resulting comb-filter sweep is the "jet engine" flange sound. Source: Tom Lord-Alge's own 2000s-era analog session and his modern DAW recreation of the identical effect. This note documents both the original hardware mechanism and the in-the-box method that reproduces it exactly, without a half-inch tape machine.

## The hardware mechanism

1. Print (bounce) the exact piece of mix you want to flange to half-inch analog tape — with generous pre-roll, since dialing in the sweep by hand takes time (TLA's own example ran ~32 bars before the sweep landed where he wanted it).
2. Fly that tape back into the multitrack alongside the original, unprinted signal.
3. Manually varispeed the tape machine — slow it down, speed it up — while listening for the moment the two signals drift into and out of near-unison. The comb-filter sweep ("the flange") appears specifically in that couple-of-millisecond drift window.
4. Ride the varispeed control live until the sweep lands exactly where the arrangement needs it, then use only the region you actually need — the rest of the pre-roll was just runway to catch the timing.

## The in-DAW recreation

1. Duplicate the audio you want to flange onto a second, identical track — the effect requires two copies of the *same* signal, not two different sounds.
2. Insert a delay-compensation-style plugin on one of the two tracks — one that can push delay in **either direction around zero** (both positive delay and negative/pre-delay), not just add positive delay. TLA names the Eventide Precision Time Align specifically for this; the owned lane is [[Align Delay]] (Max for Live) — verify it can express negative delay before relying on it for the full pre/post-delay range the named unit covers.
3. Set the delay to **zero** as the starting point — the two copies are now identical and in phase.
4. **Automate the delay value sweeping back and forth by a couple of milliseconds around zero.** The flange sweep is produced entirely by that automated near-zero modulation between two otherwise-identical signals — no dedicated flanger plugin required.
5. Print/commit the automated result rather than leaving it live, the same commit-and-move-on discipline documented in [[Committing and Printing]].

## Why it works

A flanger is, mechanically, exactly this: two identical signals summed with one delayed by a few milliseconds, that delay time modulated over time. Tape varispeed and a modulated delay-compensation plugin are two different ways of producing the identical underlying phenomenon — the DAW method just automates what a hand once did on a tape machine's speed control.

## From videos

- **The full technique, source and demo:** duplicate audio to two tracks → delay-compensation plugin (Eventide Precision Time Align) on one, set to zero → automate the delay sweeping a couple of ms around zero — "you just automate the movement... tape flange in a DAW, solved." Demonstrated live against the original hardware method (printing to half-inch tape, then varispeeding it back in) for direct A/B comparison. → [[Align Delay]], [[Modulation]], [[Automation]], [[Plugin Wishlist]] — Mix with the Masters (Tom Lord-Alge), [[Tom Lord-Alge's secret mixing techniques]]

## See also

- Plugins: [[Align Delay]]
- Effects: [[Modulation]]
- Techniques: [[Committing and Printing]] · [[Automation]]
