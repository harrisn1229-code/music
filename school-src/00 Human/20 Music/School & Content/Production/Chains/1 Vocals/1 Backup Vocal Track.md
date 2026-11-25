---
type: chain
aliases: ["Backup Vocal Track"]
title: Backup Vocal Track
chain_type: track
family: vocals
source: mic
mic: Shure SM57 or Neumann TLM 102
routing: Backup Vocal → Backup Vocals Group → Vocal Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Tube-Tech CL 1B mkII, UAD Pultec EQP-1A]
foundation: Vocal Foundation (character added in-chain, not deferred)
signal_chain: [Auto-Tune Pro, Pro-Q 4, Pro-C 2, RC-20 Retro Color, Pro-DS]
status: default
tags: [chain, vocal, track]
---

# Backup Vocal Track

**Role:** Ad-libs, gang vox, response lines, shout layers — anything that answers or hypes the lead rather than doubling it. Backups can take far more character/degradation than the lead — *differentness* is what makes them read as a separate element.

**Chain philosophy:** tune → band-limit → crush → character → de-ess.

## 1 — Recording Setup

- **[[Neumann TLM 102]]** for clean stacks; the **[[Shure SM57]]** is a great choice for grittier ad-libs — its mid-forward bite separates naturally from the TLM lead. (Handheld SM57 with monitors up = the Dijon/Dua Lipa energy lane.)
- Same room/latency discipline as [[1 Main Vocal Track|Main Vocal Track]] §1.

## 2 — Tracking Best Practice

- **Stack discipline (Kuk Harrell):** stacks come in **fours**, panned hard L/R *as you track them* — check the first take's tightness in mono before the pan spreads it wide, and keep every added stack's level identical to the last while tracking so the blend judgment stays honest (see [[1 Double Vocal Track]] for both steps in full); sung softer than the lead, with a softer "give it to me sexy" unison direction when the lead is already powerful (see [[Vocal Stacks and Ad-libs]]); **one shared FX chain across all stacks** — reverb, delay, a little doubler, EQ, compressor, then "the driver" (unconfirmed device), dialed in once and reused for the entire record's stacks, not reinvented per line — simplicity makes a stack read as one instrument. Kuk Harrell (Mix with the Masters), [[Creating vocal stacks with Kuk Harrell]].
- 🎬 **The Kenny ad-lib architecture: pan-L track + pan-R track + phone-filter track (center)** — two takes alternate sides; the band-limited phone-filter lane cuts through *between* the mains without being louder — [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) → [[Masking and Carving]].
- 🎬 **The moving center ad-lib** — a third lane running [[PanMan]], drifting between the wide pair: static width + one moving element — [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c).
- 🎬 **Vary the tune per lane** — ad-libs Legato when mains run Soft EFX (smoother bed), or *more* retune on reaching stacks — never one setting across mains + ad-libs — [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c).
- 🎬 **Syllable/consonant sync separates professional from sloppy stacks** — a stacked phrase where one take's consonant lands a fraction off from the others reads as unprofessional; sync syllable timing across takes while tracking, or manually nudge it afterward. Stacking itself also has a performer-facing benefit worth knowing: a self-conscious singer finds their own take easier to accept layered than exposed alone — one more reason to track doubles even on a rough idea. → [[Vocal Harmony]] — Synthet, [the vocal trick to like yourself](https://www.youtube.com/watch?v=dulq8IJR9nI)

## 3 — Source → Ableton (UAD Console)

Same console pass as [[1 Main Vocal Track|Main Vocal Track]] §3; for gritty SM57 ad-libs, drive the [[UAD Neve 1073]] harder — attitude on the way in is on-brand here.

## 4 — Ableton Initial Processing

**From the [[0 Vocal Foundation|Vocal Foundation]] →** keeps the skeleton (tune → corrective EQ → level) but is the **one role that deliberately breaks the foundation's "no color" rule *in-chain*** — for backups, *differentness* is the job, so character gets added here instead of deferred. The deltas:
- **Neutral default → varied/off** (§4.1 — match the lead for polished stacks, off for shouted ad-libs, or vary per lane; never one setting across mains + ad-libs)
- **Corrective HPF/cut → telephone-ish band-limit** (§4.2 — HPF 150–250, LPF 8–10k; they live at the edges)
- **Leveling 3–5 dB → crush 6–10 dB** (§4.3 — flat and steady)
- **Drop [[Soothe2]]; add [[RC-20 Retro Color]] in-chain** (§4.4 — degradation pushes backups behind the lead and gives ad-libs attitude; this is the foundation's deferred "color" stage pulled *forward* on purpose)
- **De-ess harder** (§4.5) than the lead

### 1. [[Auto-Tune Pro]] — Pitch
- Match the lead's setting for polished stacks (or vary per §2), off for shouted/spoken ad-libs.

### 2. [[Pro-Q 4]] — Band-limit
- HPF 150–250 Hz · LPF 8–10 kHz — telephone-ish is fine, they live at the edges.

### 3. [[Pro-C 2]] — Crush
- 4:1–8:1 · **6–10 dB GR** — flat and steady.

### 4. [[RC-20 Retro Color]] — Character (optional but on-brand)
- Lo-Fi or Tape mode · mix 20–40%
- **Why:** A little degrade pushes backups behind the lead and gives ad-libs attitude — especially hip hop.

### 5. [[Pro-DS]] — De-ess
- Standard split-band pass — de-ess stacks *harder* than the lead; width should never come with stray S's.

## 5 — Track FX (optional)

- **Phone filter** on the center ad-lib lane (band-limited beats louder).
- [[Decapitator]] pushed for the screamed lane ([[Shure SM57]] → [[UAD Neve 1073]] slammed → Decapitator Punish, no cleanup — the Dijon move).

## 6 — Bus / Send FX (optional)

Routing: **Backup Vocal → [[2 Backup Vocals Group|Backup Vocals Group]] → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — the stack-bus chain (group saturation → 1176 → EQ → Decapitator → group de-ess) lives on the group.

- **Delay treatment:** ad-lib **throws** are inserts on a dedicated throw track (loud [[EchoBoy]], high-end cut, subdivision per throw) — the signature backup move, drag the last word to the throw track. **Cohesion** delay for the whole stack rides the shared group send ([[Delay Send Other]]), sidechain-ducked to the lead → [[Sidechaining]]. Cohesion → group send · moment → insert. · [[Reverb Send Room]] to sit the stack together.

## Variations

- **Trap ad-libs:** hard-tune + [[Saturation Send]] pushed, pan hard L/R alternating, delay throws on line-ends.
- **Gang/crowd vox:** no tune, wide pan spread across takes, [[Reverb Send Long]] for size.

## Sources

Kuk Harrell (Mix with the Masters) — [[Creating vocal stacks with Kuk Harrell]] · Kenny Beats — [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) · [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c) · Disclosure — [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8) (stack-bus chain on [[2 Backup Vocals Group|Backup Vocals Group]])
