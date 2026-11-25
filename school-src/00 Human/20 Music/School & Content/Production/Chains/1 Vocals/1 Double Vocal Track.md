---
type: chain
aliases: ["Double Vocal Track"]
title: Double Vocal Track
chain_type: track
family: vocals
source: mic
mic: Neumann TLM 102
routing: Double Vocal → Main Vocal Group → Vocal Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Tube-Tech CL 1B mkII, UAD Pultec EQP-1A]
foundation: Vocal Foundation
signal_chain: [Auto-Tune Pro, Pro-Q 4, Pro-C 2, Pro-DS]
status: default
tags: [chain, vocal, track]
---

# Double Vocal Track

**Role:** Unison double(s) of the lead — thickness, not a second voice. Band-limit dramatically, compress flat, mix in until you only notice it when you mute it (tucked −6 to −10 dB under the lead).

**Chain philosophy:** tune tight → bandpass hard → crush → de-ess → tuck.

## 1 — Recording Setup

- Same setup as [[1 Main Vocal Track|Main Vocal Track]] §1: [[Neumann TLM 102]], same room/latency discipline, ghost latency track armed.
- **Performance note:** sing doubles slightly *softer* than the lead — a softer unison layers in as sweetness instead of competing.

## 2 — Tracking Best Practice

- **Record a real L+R pair, panned hard (35–50 L/R)** — the doubles are the vocal's width layer; a single mono double sits ~10–15 off-center instead.
- 🎬 **Pan hard the instant a stack is tracked, and judge the FIRST take in mono before anything else** — Kuk Harrell tracks the first stack, immediately pans it hard, and specifically checks tightness *in mono* first ("I'll start panning left and right away so I can tell if it's tight in mono... it's definitely there, so it's so tight"); the wide image only comes after the mono check confirms the take is genuinely tight, since looseness that reads as "fine" in mono can still be barely-there once split — Kuk Harrell (Mix with the Masters), [[Creating vocal stacks with Kuk Harrell]] → [[Width and Stereo]].
- 🎬 **Keep every added stack's level EXACTLY the same as the one before it while tracking, specifically to judge whether the vibe is matching** — "I keep the levels exactly the same because if I start pulling down what they did now I can't really tell if the vibe is matching"; level-match during the tracking pass, not after, so blend problems get caught rather than hidden — Kuk Harrell (Mix with the Masters), [[Creating vocal stacks with Kuk Harrell]].
- **On big hooks, stack in FOURS** — two per side, never two total ("if you stack something you always want to do four, don't do two — because if you do two you've just got three there and it really doesn't create anything special. So always just do an even number of four" — Kuk Harrell (Mix with the Masters), [[Creating vocal stacks with Kuk Harrell]]; two sounds like three voices, four becomes a texture). 🎬 Kenny's stepped-pan version: duplicate the hard pair at ~25L/25R, again at ~15L/15R — one harmony per slot, a big stack with zero wideners — [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8).
- **Real doubles beat doublers** — Kenny ran a ~20% [[Doubler2]]-style on everything for years ("bigger, not doubled"), then dropped it entirely for real takes — [Vocal Template](https://youtu.be/X_iDENABLmk). When you *do* want a fake double, that's **[[Artificial Double Tracking (ADT)]]** — the Beatles/Lennon trick ([[MicroShift]] or [[Doubler2]] with detune + delay + modulation on).
- **Editing before processing (the real secret):** align the double's timing and pitch to the lead first — manually or [[VocAlign Ultra AU]] — and keep S's/T's aligned or edited off (the lead carries the consonants). No plugin fixes a loose double; a tight double barely needs processing.

## 3 — Source → Ableton (UAD Console)

Same console pass as [[1 Main Vocal Track|Main Vocal Track]] §3 ([[UAD Neve 1073]] → [[UAD Tube-Tech CL 1B mkII]] → [[UAD Pultec EQP-1A]]), printed conservatively.

## 4 — Ableton Initial Processing

**From the [[0 Vocal Foundation|Vocal Foundation]] →** the double keeps the block's *skeleton* (tune → corrective EQ → level) but is the most aggressive departure from its neutral defaults — every setting pushes toward *band-limited, crushed, tucked* rather than transparent. The deltas:
- **Retune 45–50 → 18** (tighter than the lead so it fuses instead of chorusing)
- **Corrective HPF/cut → hard bandpass** (§4.2 — kill lows *and* air; the double owns neither)
- **Leveling 3–5 dB → crush 6–10 dB** (§4.3 — no dynamic life of its own)
- **Drop [[Soothe2]]; swap in a hard [[Pro-DS]]** (§4.4 — a band-limited crushed double doesn't need resonance surgery, it needs its S's gone since the lead carries consonants)
No color, air, or width stages — the double's whole job is invisibility, so the foundation's hand-off *toward* character is declined here.

### 1. [[Auto-Tune Pro]] — Pitch
- **Retune 18** (① — tighter than the lead so the double fuses instead of chorusing out of tune) · **Humanize 100%** (③) · **Flex-Tune 0** (②) · **Key/Scale = song key** (④).

### 2. [[Pro-Q 4]] — Hard bandpass
- HPF 180–250 Hz · LPF 8–10 kHz · dip 3–5 kHz −2 dB (presence belongs to the lead)
- Flavor call: **warm/dark doubles** for soft wide hooks, airy for bright pop — opposite of whatever the harmonies get
- **Why:** Doubles that keep their lows and air smear the lead; tighter band = one thick voice.

### 3. [[Pro-C 2]] — Crush
- 4:1–6:1 · fast-ish attack · **6–10 dB GR**
- **Why:** Doubles should have no dynamic life of their own — flat layers glue.

### 4. [[Pro-DS]] — De-ess hard
- Range 6–10 dB · or edit/nudge the double's S's and T's off the lead's instead.

## 5 — Track FX (optional)

- Nothing, usually — differentness belongs to backups/harmonies; the double's job is invisibility.

## 6 — Bus / Send FX (optional)

Routing: **Double Vocal → [[2 Main Vocal Group|Main Vocal Group]] → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — the group has the chain; these tracks stay dry.

- Little or no reverb of its own — it rides the lead's space. A touch of [[Width Send]] only if a single mono double needs spread.
- **Delay:** rides the lead's shared group delay send at a *low* level, sidechain-ducked with the lead → [[Sidechaining]] — a double lives tight to the lead, so much delay of its own pulls it off into a separate voice. **No per-double throws** — a word-throw belongs on the lead track's throw insert, not here. Cohesion → shared group send · moment → the lead's insert.

## Variations

- **Hook-only doubles:** automate them in for choruses — verses stay single-voice ([[Arrangement and Song Form]] subtraction logic).
- **Wide pop doubles:** pan the pair 25–35 L/R and let more air through (LPF up to 12 kHz).

## Sources

Kuk Harrell (Mix with the Masters) — [[Creating vocal stacks with Kuk Harrell]] · Make Pop Music (stacks) — link in [[FX Chain System]] · Kenny Beats — [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) · [Vocal Template](https://youtu.be/X_iDENABLmk)
