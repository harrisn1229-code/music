---
type: chain
title: Parallel Comp Send
chain_type: send
family: fx
source: n/a
routing: "Return track — drums mainly, vocals sometimes → Master"
signal_chain: [Pro-Q 4, UAD UA 1176LN Rev E, Pro-Q 4]
status: default
tags: [chain, send, compression]
---

# Parallel Comp Send

**Role:** The "New York" crush bus — a destroyed copy of the drums blended *under* the clean ones. Adds weight, sustain, and room excitement while the dry signal keeps all its transients. Parallel = you can crush without consequences.

**Theory:** serial compression trades transients for control. Parallel compression sidesteps the trade: the dry path keeps the punch, the crushed path brings up all the quiet detail (ghost notes, room, decay), and you mix in just enough of the wreckage.

## Signal chain

### 1. [[Pro-Q 4]] — Pre-EQ (the "NY" part, optional)
- Smiley: +2–3 dB lows (~100 Hz) and highs (~8 kHz) *before* the comp
- **Why:** The compressor slams the boosted extremes hardest, exaggerating the thick-bottom/crispy-top character of the classic NYC drum sound.

### 2. [[UAD UA 1176LN]] — The crush
- **All-buttons-in mode** (push all 4 ratio buttons) · attack FAST (7) · release FAST (7) · input cranked for **10–20 dB GR — pin the needle, it cannot be too much here**
- **Why all-buttons:** the ratio goes nonlinear and program-dependent, adding explosive harmonic excitement — famous on drum busses for 50 years. The fast release creates the pumping that drags up room sound and sustain.
- Alt flavors: [[Devil-Loc Deluxe]] (even more destroyed) · [[FETish]] (same 1176 trick, native).
- 🎬 *From video:* on a **film/game percussion stem**, this exact fast-1176-into-EQ shape gets reused lighter — a Chris Lord-Alge-style 1176 blended (not slammed) with a Pultec-style EQ pushing top end, aimed at "snap" rather than NYC-style crush; framed as necessary because media delivery is separate stems, not one locked mix, so the whole stem gets parallel-compressed as a unit instead of the finished mix Andrew Scheps-style. → [[UAD Pultec EQP-1A]], [[Parallel Processing]], [[TRANSIENT Slot]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]

### 3. [[Pro-Q 4]] — Post-tame (optional)
- HPF 40 Hz · shave any harsh 3–5 kHz the crush created.
- 🎬 *From video:* an alternate top-end stage in this same slot — [[UAD Pultec EQP-1A|Pultec-style EQ]] pushing "top end" for snap, positioned as an addition to the crush rather than a tame — worth trying instead of/alongside the HPF+shave move above when the goal is more snap, not less harshness. → [[UAD Pultec EQP-1A]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]

## Usage
- 🎬 *From video:* related pattern worth cross-checking against this send's single-crush design — a **four-aux system**, not one send, where each aux rebuilds a specific quality lost to heavy bus compression (transient spark, tonal attention, kick character) rather than one aux doing everything. See [[3 Drums Bus]] for the full aux-by-aux breakdown and [[Parallel Processing]] for the philosophy — Mix with the Masters (Jaycen Joshua), [[Jaycen Joshua on creative drum mixing]]
- 🎬 *From video:* PSP Vintage Warmer 2 (unowned) auditioned as an alternate/additional color source on this exact send, specifically for its "snap" character — with an explicit latency caution named before committing another device to the bus. Reusable habit: treat added latency on a parallel send as a real risk to check for, not something PDC always makes a non-issue. → [[Plugin Wishlist]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]
- **Send selectively, post-fader:** kick, snare, toms YES — **cymbals, overheads, and hats NO** (cymbals + heavy compression = splatty wash). This per-element choice is exactly why it's a send and not an insert on the group.
- Blend the return from silence until the kit feels bigger, then back off 1 dB. Should be *felt disappearing* when muted, not heard. Soloed, it's *supposed* to sound ugly — "be aggressive, be a little nasty with it."
- **The chorus move:** automate the *crush return* up +1 dB in choruses instead of the drum faders — energy lifts without the drums getting louder.
- 🎬 *From video:* a harder-committed version of the chorus move above, confirmed on a hit record — instead of a gradual +1 dB automation ride, the whole parallel-comp path is withheld entirely until one structural landmark (the outro-chorus lift) and then switched on across THREE separate signal groups at once: kit close mics, room mics, AND stomp tracks simultaneously. Toggling it in/out is audible as a sudden jump in drive/excitement, not a slow build. → [[Parallel Processing]], [[Arrangement and Song Form]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **Vocals:** a quieter parallel-crush send under a lead adds density on hooks (send less than drums).

## Variations
- **Crush + tape:** add [[Kramer Tape]] driven hard *after* the 1176 on the return — compression + tape wreckage is the full old-school NY chain.
- **Pumping as an effect (EDM/hip hop):** turn the return UP until the pump is audible and rhythmic — a creative choice, not a mistake, if it grooves.
