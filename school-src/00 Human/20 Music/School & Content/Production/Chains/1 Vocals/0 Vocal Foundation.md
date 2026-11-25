---
type: chain
aliases: ["Vocal Foundation", "Vocal Front-End"]
title: Vocal Foundation
chain_type: foundation
family: vocals
source: any vocal
routing: prepends §4 of every vocal track chain (Main / Double / Harmony / Backup / Ensemble)
uad_console: inherited from the specific vocal track note (UAD Neve 1073 front end — see [[1 Main Vocal Track|Main Vocal Track]] §3)
signal_chain: [Utility, mvMeter2nogpu, Auto-Tune Pro, Pro-Q 4, Pro-C 2, Soothe2, Utility, mvMeter2nogpu]
status: default
tags: [chain, vocal, foundation]
---

# Vocal Foundation

**The identical first step in every vocal chain.** Drop this on any vocal — lead, double, harmony, ad-lib, ensemble stack — *before* you've decided how the part gets treated. It does only the neutral, corrective work that every vocal wants no matter its role: get level right, correct pitch, cut what's wrong, level the dynamics, tame resonance. Nothing here shapes character or commits to a sound.

**Why a fixed block:** you don't always know at record time whether a take becomes the lead, a stacked double, or one voice in an ensemble. This block is the same regardless, so you can commit it immediately and postpone the creative calls ([[1 Main Vocal Track|lead]] vs [[1 Double Vocal Track|double]] vs [[1 Ensemble Stack Track|ensemble]]) until you actually hear the arrangement. The UAD Console front end ([[UAD Neve 1073]] → comp → EQ, printed on the way in) is already the same across vocals — this is the Ableton-side equivalent: a shared, printable starting point.

**Where it sits:** this *is* the front of `## 4 — Ableton Initial Processing` on each vocal track note. Everything after the hand-off point below is per-role and decided later.

## Prep — before the block (same as any vocal)

- **Clip-gain to ~0 VU / −18 dBFS average** by hand — pull the big jumps down first so the comp works on musical dynamics, not editing you skipped ([[Gain Staging]]).
- **Chop dead space between phrases** (keep natural breaths, never clip word edges) — every downstream comp raises the floor of what you leave. **Editing is gain-staging** — Kenny Beats, [Recording Vocals the Right Way](https://youtu.be/3Nw1d37nluo).
- Fix pops/mouth noise and do Melodyne-level pitch surgery here, before the chain — no plugin fixes a sloppy comp.
- 🎬 **Mic distance is an intentional intimacy/bass-boost dial (the proximity effect), not just placement trivia** — moving a directional mic closer raises low-frequency response; roughly a fist's distance is a good default, closer (a finger's length) for deliberate warmth/intimacy on a specific line. Decide per-take, not just per-session. — Synthet, [how to make love music](https://www.youtube.com/watch?v=vGxAodP1-dc)

## The block

Meter sandwich implied by the head/tail Utility + [[mvMeter2nogpu]] — target ~0 VU average in and out ([[Gain Staging]]).

### 1. [[Auto-Tune Pro]] — Pitch (neutral default)
- Key/scale: **match the song** · **Retune 45–50** (natural, "invisible support") · **Humanize 100%** · **Flex-Tune 0** · **input voice type set to the actual voice** (Low Male / Alto / Soprano — a range switch; wrong = it misreads everything)
- Keep it invisible here. Hard-tune (Retune 0–20 / audible ~7) is a *character* choice — make it downstream per song, not in the foundation — [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c).
- **Why:** First so everything downstream reacts to corrected pitch.

### 2. [[Pro-Q 4]] — Corrective EQ (subtractive only)
- HPF 24 dB/oct @ **80–100 Hz** · cut mud **−2 to −4 dB @ 200–400 Hz** · check **2–5 kHz** for harshness/nasality and dip if needed · **Natural Phase** mode (tracking is done)
- No boosts here — presence/air/tone shaping is a later, per-role move.
- **Why:** Cuts before compression so the comp doesn't spend its GR fighting rumble and mud.

### 3. [[Pro-C 2]] — Leveling compression
- Style **Vocal** · attack **10 ms** · release **auto** · **3–5 dB GR** · range slider caps GR ~5 dB so it can't overreact
- Second-stage leveler — the [[UAD Tube-Tech CL 1B mkII|CL 1B]] opto at tracking (§3 of the track note) was stage one; this fast digital comp catches the transients the opto let through ([[Compression Staging]]).
- **Why:** "Some compression" — musical control, not squash. Staged beats one deep comp.

### 4. [[Soothe2]] — Resonance suppression
- **Soft mode** · sharpness/selectivity default (~3) · raise depth until clearly working, back off slightly · focus **1–6 kHz** · delta mode to audition what it removes
- **Why:** Dynamic harshness control static EQ can't do — this is still corrective, so it belongs in the foundation. Placed before any color so you're not exciting resonances downstream.

## Hand-off — everything past here is a later, per-role decision

The foundation stops at neutral. These get chosen once you know the part's job — see the role notes:

- **Color / saturation** ([[Saturn 2]], [[Decapitator]], [[Kramer Tape]]) — density + attitude, and it re-pushes sibilance, which is *why* it lands after the foundation
- **Tonal EQ boosts** (presence @ 3–5 kHz, air shelf) — [[Pro-Q 4]] additive pass
- **De-ess** ([[Pro-DS]]) — the finishing de-ess goes *last*, after color has regenerated the S's; don't bake it into the foundation. (Pull a *light* corrective [[Pro-DS]] in here only if a source is genuinely too essy to comp cleanly.)
- **Air** ([[Gem Dopamine]] / [[Fresh Air]])
- **Role & width:** lead upfront/mono ([[1 Main Vocal Track|Main Vocal Track]]) · doubles hard-panned ([[1 Double Vocal Track|Double Vocal Track]]) · harmonies ([[1 Harmony Vocal Track|Harmony Vocal Track]]) · ensemble spread + [[Width Send]] ([[1 Ensemble Stack Track|Ensemble Stack Track]])
- **Space:** [[Reverb Send Room]] / [[Delay Send Slap]] — group/bus sends, per the routing model

## Producer Pal note

`chain_type: foundation` is a new type: Producer Pal instantiates `signal_chain` as a **saved device rack** ("Vocal Foundation") it can prepend to any vocal track chain, then the role-specific stages append after. The meter-sandwich Utility/[[mvMeter2nogpu]] pair is included explicitly here since this rack is the chain head.

## Sources

Kenny Beats — [Recording Vocals the Right Way](https://youtu.be/3Nw1d37nluo) · [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c) · [Vocal Template](https://youtu.be/X_iDENABLmk) — chain-order theory in [[FX Chain System]] · [[Compression Staging]] · [[Gain Staging]]
