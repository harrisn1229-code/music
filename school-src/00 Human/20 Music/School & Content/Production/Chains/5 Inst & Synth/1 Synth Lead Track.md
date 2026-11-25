---
type: chain
aliases: ["Synth Lead Track"]
title: Synth Lead Track
chain_type: track
family: keys-synths
source: digital
routing: Synth Lead → Inst-Synth Group → Inst-Synth Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, OTT, Saturn 2, Wider, Utility]
status: default
tags: [chain, synth, track]
---

# Synth Lead Track

**Role:** Melodic synth lines — the "second vocal." Gets vocal-style treatment: present, controlled, carved against the actual vocal.

**Chain philosophy:** carve → multiband control → edge → width → seat.

## 1 — Sound Selection

- **[[Serum 2]]** — the modern default (pop/trap/EDM). Patch recipe: 1–2 osc, unison 3–7, detune 0.10–0.20, LPF 24 dB with a touch of envelope, **mono + legato + glide 40–80 ms** for expressive lines. → [[Serum 2 — Modern Lead]]
- **[[DUNE 3]]** — festival supersaws (the unison engine is the point, 8–16 voices). → [[DUNE 3 — Festival Supersaw Lead]]
- **[[Massive]]** — growly 2010s character. · **[[Drift]] / [[Model 84 Polyphonic Synthesizer]]** — warm analog mono (synthwave/indie; Model 84 chorus = instant vintage width). · **[[Omnisphere]]** — hybrid/organic texture leads.
- Universal patch rules: vibrato via mod-wheel LFO (not baked in), attack 0–10 ms, release short enough not to smear, **kill sub content below ~100 Hz at the patch**.
- 🎬 **No VST for the target hardware? Substitute a one-shot sample kit and keep it unquantized** — Mike Dean's Moog Matriarch leads (no VST exists) sourced from a producer one-shot kit instead, played back completely off the grid on purpose. → [[Sound Selection Guide]], [[Sampling and Sound Selection]], [[Rhythm and Groove]] — loner, [mike dean's secret 'astroworld' synth techniques!?](https://www.youtube.com/watch?v=2bJGXDlSFdY)
- 🎬 **Pick oscillators whose harmonic content fits the key** — a major-harmonic voice sits where a clashing square wouldn't — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck). Pre-highlight favorite patches before the session ([[Sound Palette]]).

## 2 — Programming Best Practice

- 🎬 **Keep the foundation thin and mono, on purpose, to leave room for the vocal** — where "typically people use big, rich sounds," a deliberately thin, simple, **mono** patch (bass + lead synth both in mono) leaves more frequency and stereo headroom for the voice to sit in; a new synth entering later gets staggered a bar early and hard-panned to introduce width — see [[Width and Stereo]] for the pan-timing half of the move. → [[Width and Stereo]] — loner, [James Blake's production tricks are GAMECHANGING!?](https://www.youtube.com/watch?v=9FX7p23hSlc)
- 🎬 **Two-synth morph** — layer a **smooth synth + a raspy one on the same MIDI** and fade the filter so one *becomes* the other across the phrase (clean Diva/Juno → filter-distorted MS-20) — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8).
- 🎬 **Velocity → filter, not volume** — expression via cutoff mapping (the Poly6 move) — Disclosure, [Howard Is Here](https://youtu.be/gCfU5Cq9WU4).
- 🎬 **~10 automation lanes on one synth** (release, EQ builds, verb/delay builds) bring a line to life; in dense sections layer several synths each panned/automated *slightly* differently so nothing loops identically — Disclosure, [Howard Is Here](https://youtu.be/gCfU5Cq9WU4) → [[Automation]].
- Commit to audio when dialed ([[FX Chain System]] bounce-in-place).

## 3 — Source → Ableton (UAD front end)

Light-touch — the patch is the tone; this is the analog handshake:

### 1. [[UAD Neve 1073]] — Preamp plugin, light · ~0 VU
### 2. [[UAD UA 1176LN]] — 1–2 dB fast (tames patch level jumps)
### 3. [[UAD Pultec EQP-1A]] — bypass or air only

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Carve
- HPF 100–200 Hz · if it shares register with the vocal, dynamic-dip 2–4 kHz keyed from the vocal (the lead synth defers to the lead singer).

### 2. [[OTT]] — Multiband control
- **Depth 15–30%** (① — never the default 100%; that's sound design, not mixing) · **Time up** (② — relax pumping on slower material) · **In/Out to unity** (③/④)
- What it is: 3-band up+down compression — highs near-limited, mids breathing, output hyped — "bright, dense, modern" in one knob; works best on sounds that already *move*.

### 3. [[Saturn 2]] — Edge
- Tube/tape, drive to taste — leads can take real drive; harmonics = cut-through
- 🎬 Hero raspy lead: **[[Decapitator]] "Punish"** near 9–10 for one moment; **acid**: hot resonant filter (~+20 dB) sweeping INTO the distortion so the resonance peak drives it (MS-20 → 303) — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8) / [Deeper](https://youtu.be/SM0FZ58ckVw).

### 4. [[Wider]] — Width
- Subtle, mono-compatible — big without leaving the center.

### 5. [[Utility]] — Final gain/pan seat.

## 5 — Track FX (optional)

- 🎬 **[[Frequency Shifter]] on a sawtooth** — the Ring Shifter move, "the key to our sound": movement + stereo width + phase — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU) / [You & Me](https://youtu.be/9zsU5Y8r_Ow) → [[Modulation]].
- **Bit-crusher for "silk"/character** on a beep/lead — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU).

## 6 — Bus / Send FX (optional)

Routing: **Synth Lead → [[2 Inst-Synth Group|Inst-Synth Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain]]**.

- **[[Delay Send Other]] is the lead synth's reverb** — synced repeats keep energy; wash reverb blurs it. [[Delay Send Slap]] for the small-club one-slap.

## Variations

- **Supersaw EDM:** skip Wider (already huge), mono below 150 Hz, sidechain-duck vs kick.
- **Analog mono lead:** skip OTT, add [[RC-20 Retro Color]] wobble + slap delay — the synthwave lane.

## From videos

- **A thin, mono foundation (bass + lead synth both in mono) is used specifically to leave room for the vocal, with new elements staggered a bar early and panned to build width once room is needed** — see the inline 🎬 note in §2 above. → [[Width and Stereo]] — loner, [James Blake's production tricks are GAMECHANGING!?](https://www.youtube.com/watch?v=9FX7p23hSlc)

## Sources

Disclosure — [NO CAP](https://youtu.be/kz5dmb3QdI8) · [Deeper](https://youtu.be/SM0FZ58ckVw) · [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU) · [Higher Than Ever Before](https://youtu.be/9XkHSronZck) · [Howard Is Here](https://youtu.be/gCfU5Cq9WU4) · EDMProd (OTT) — link in [[FX Chain System]]
