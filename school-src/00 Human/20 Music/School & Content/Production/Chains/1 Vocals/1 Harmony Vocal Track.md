---
type: chain
aliases: ["Harmony Vocal Track"]
title: Harmony Vocal Track
chain_type: track
family: vocals
source: mic
mic: Neumann TLM 102
routing: Harmony Vocal → Main Vocal Group → Vocal Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Tube-Tech CL 1B mkII, UAD Pultec EQP-1A]
foundation: Vocal Foundation
signal_chain: [Auto-Tune Pro, Pro-Q 4, Pro-C 2, Pro-DS]
status: default
tags: [chain, vocal, track]
---

# Harmony Vocal Track

**Role:** Harmony parts around the lead (3rds/5ths/6ths), pushed further back in the depth field. Harmonies carry *pitch information, not tone* — strip everything that isn't the note.

**Chain philosophy:** tune → tightest EQ of the stack → compress flat → de-ess → wide + wet.

## 1 — Recording Setup

- Same setup as [[1 Main Vocal Track|Main Vocal Track]] §1: [[Neumann TLM 102]], ghost latency track.
- Sung **softer than the lead**, same mic position as the lead session for fused timbre.

## 2 — Tracking Best Practice

- **Pan L/R pairs at ~35–42 L/R** (Live's 0–50 scale) — just *inside* hard-panned doubles so layers don't stack on the same spot (no doubles in the section? harmonies can take the outside). **Block harmonies come in fours** (L/R per note), each note balanced to the chord.
- **Time-align to the lead, keep their own pitch** — harmonies match *timing* (manually or [[VocAlign Ultra AU]]) but never pitch-match to the lead's notes.
- 🎬 **Blend later stack layers down in level for balance, rather than matching the first pair at full strength.** After the first two stacks are level-matched and mono-checked while tracking (see [[1 Double Vocal Track]]), a third/fourth note gets pulled down slightly — "this particular note is blended down just a little bit because [they] have to be balanced properly" — the level-matching discipline is for judging the blend honestly, not for the final print level of every layer — Kuk Harrell (Mix with the Masters), [[Creating vocal stacks with Kuk Harrell]].
- 🎬 **Fifthy/medieval harmonies are a flavor** — Khalid's "very fifthy, quite medieval-sounding" stacks; parallel fifths break the rules and sound modern — Disclosure, [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A).
- 🎬 Consider **more tune on harmonies than the main** when the singer is reaching (Smino logic) — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c).

## 3 — Source → Ableton (UAD Console)

Same console pass as [[1 Main Vocal Track|Main Vocal Track]] §3, printed conservatively.

## 4 — Ableton Initial Processing

**From the [[0 Vocal Foundation|Vocal Foundation]] →** keeps the skeleton (tune → corrective EQ → level) and pushes it toward *tightest, flattest, and wettest* of the whole stack — harmonies carry pitch info, not tone. The deltas:
- **Retune 45–50 → 22** · **scale set to the harmony's notes**, not song-key chromatic (§4.1)
- **Corrective HPF/cut → the tightest band-limit of any vocal** (§4.2 — HPF 200–300, LPF 7–9k; keep only the band the note lives in)
- **Leveling 3–5 dB → flatten 6–10 dB** (§4.3 — pad-like sustain, "a synth pad made of voice")
- **Drop [[Soothe2]]; add an aggressive [[Pro-DS]]** (§4.4 — stacked sibilance adds up fast)
Character is *deferred, not declined*: the harmony earns its own seat later via the texture-split brightness in §5 and running wetter/wider than the lead in §6.

### 1. [[Auto-Tune Pro]] — Pitch
- **Retune 22** (①) · **Humanize 100%** (③) · **scale set carefully** (④ — the harmony's notes, not just song-key chromatic).

### 2. [[Pro-Q 4]] — Tightest band-limit
- HPF 200–300 Hz · LPF 7–9 kHz · dip lead presence 3–5 kHz −2 to −3 dB
- **Why:** Keep only the band where the harmony note actually lives.

### 3. [[Pro-C 2]] — Flatten
- 4:1 · **6–10 dB GR** · release auto
- **Why:** Even pad-like sustain — harmonies behave like a synth pad made of voice.

### 4. [[Pro-DS]] — De-ess
- Aggressive — stacked sibilance from multiple takes adds up fast.

## 5 — Track FX (optional)

- **Texture split trick:** EQ harmonies **brighter/airier** when the doubles went warm (or vice versa); give a second harmony layer its own flavor (a little [[Decapitator]] + chorus smear) — different textures = each layer gets its own seat.

## 6 — Bus / Send FX (optional)

Routing: **Harmony Vocal → [[2 Main Vocal Group|Main Vocal Group]] → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — dry tracks, chain on the group.

- **More [[Reverb Send Room]]/[[Reverb Send Long]] AND more delay than the lead** — harmonies run wetter on purpose; depth = behind. [[Width Send]] for spread on big hooks.
- **Delay treatment:** the extra delay is **cohesion delay via the shared group send** ([[Delay Send Slap]]/[[Delay Send Other]], hotter than the lead), sidechain-ducked to the lead → [[Sidechaining]] so the wetness blooms in gaps and tucks under words. A one-word harmony catch = a throw-track [[EchoBoy]] insert, not a per-note delay on this track. Cohesion → group send · moment → insert.

## Variations

- **Beatles block harmonies:** less tune (retune 40+), [[LALA]] instead of Pro-C 2, mono-ish placement, drier — the blend comes from the takes.
- **Pad harmonies (ooh/aah beds):** treat as [[1 Synth Bed Track|Synth Bed Track]] — heavier LPF, long reverb, sidechain-duck under the lead. 🎬 **Non-singer-friendly build method:** record (or reuse) a single sustained tone with variation minimized, pan it center, then duplicate and pitch-shift copies to different scale degrees to build the harmonic backdrop — the pitching does the harmonic work, not vocal performance, so it doesn't require an actual multi-note take. A rough demo tone is enough raw material to start from. — Synthet, [All producers should do this](https://www.youtube.com/watch?v=8t3Ep4e_dyE)
- 🎬 **Synthesized harmonies (Henry Saiz method):** skip singing the harmony takes entirely — route a MIDI chord/melody track → vocoder (lead vocal as modulator) → a MIDI-playable vocal synth (Neptune's "voice synth" mode) as the carrier, so playing the chord track live re-pitches the vocal into a harmony stack. Keep the lead vocal itself minimally processed (light multiband comp + delay/reverb only) so it reads as distinct from the synthesized layer underneath — same [[BED Slot]] role as a pad harmony, but MIDI-controllable instead of comped from takes. Nate doesn't own a MIDI-playable vocal synth yet — see [[Plugin Wishlist]]. — Henry Saiz, [How Henry Saiz gets crazy vocal effects](https://youtu.be/tzS2ogFszuI)

## From videos

- 🎬 **A full-mix AlterBoy-based harmony chain, run wetter/heavier than the lead's on purpose:** built as the second of a two-line vocal stack, this layer runs [[Little AlterBoy]]'s "vocal chorus" preset → EQ → AlterBoy again (formant shifted down, mix 100%, Drive boosted) → [[ValhallaVintageVerb]]'s dark vocal room preset (size down, mix ~90). No pitch shift at all on this layer — unlike the main vocal's pitched-up/50%-mix ghost double, this harmony gets full-strength character processing plus a reverb tail, consistent with harmonies running wetter/further back than the lead (see §6 above). → [[Little AlterBoy]], [[ValhallaVintageVerb]], [[Pitch and Formant]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)

## Sources

Same source set as [[1 Main Vocal Track|Main Vocal Track]] · Disclosure — [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · Kenny Beats — [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c) · Henry Saiz — [How Henry Saiz gets crazy vocal effects](https://youtu.be/tzS2ogFszuI) · loner — [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo) · Kuk Harrell (Mix with the Masters) — [[Creating vocal stacks with Kuk Harrell]]
