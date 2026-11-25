---
type: chain
title: Reverb Send Room
chain_type: send
family: fx
source: n/a
routing: "Return track — receives sends from any track/group → Master"
signal_chain: [ValhallaRoom, Pro-Q 4]
status: default
tags: [chain, send, reverb]
---

# Reverb Send Room

**Role:** The mix's shared "room" — the default space most elements send to. One room for everyone is what makes separate recordings sound like they happened in the same place.

**Send/return theory:** returns run **100% wet**; the *send knob* is the dry/wet control. One reverb shared by ten tracks beats ten inserted reverbs — cheaper, and more importantly *coherent*: every element sits in the same acoustic space.

## Signal chain

### 1. [[ValhallaRoom]] — The room
- **Mix 100%** (②) · **Decay 1.0 s** (③ — 0.8–1.2 window) · **Pre-delay 20 ms** (④ — 15–25) · **High Cut ~5–6 kHz** (⑦)
- **The controls that matter, in order: Mix, Decay, High Cut** (then pre-delay, then everything else). Workflow: set **Early Size first** (it defines the room's perceived size/attack), then fine-tune Late Size (default ~15 is fine); Depth balances early-vs-late character.
- Mode picks: **Large Room / Bright Room** = the do-everything modes (Bright Room even works on bass) · Dark Room/Dark Chamber = washier, more chorused · **Nostromo/Narcissus** = great on keys.
- Low Mult below 1.0 to tighten the reverb's low end at the source (on top of the return HPF).
- **Why pre-delay matters:** 0 ms glues the reverb onto the dry signal and blurs it; 15–25 ms separates the dry transient from the tail — the source stays upfront *and* sounds placed. The #1 amateur reverb fix. (Fast rhythmic sources like busy bass lines want it shorter, ~10 ms, or the timing smears.)

### 2. [[Pro-Q 4]] — Filter the return
- **HPF 200–300 Hz · LPF 4–6 kHz**
- **Why:** Low reverb energy = mud, high reverb energy = harsh sizzle that fights vocal air. The "Abbey Road filter" trick: a band-limited reverb adds *space* without adding *frequency content* — you can run more of it before the mix notices.
- 🎬 *From video (clarity):* on a vocal fighting to stay clear through this send, add a narrow dip around **1.5–3.5 kHz** on top of the HPF/LPF — a general clarity move, separate from the wide-band filtering above — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)

## Usage
- Snare is the main customer (its tail defines the space) · vocals low send · guitars/keys to place them · never send bass, kick, or 808s (low end + reverb = mud, always).

## Variations
- **Drier modern trap:** decay down to 0.5–0.7 s — a "small booth" flavor just for glue.

## From videos

- **The general recipe behind this send's ducking mechanism, stated as a universal build: put the reverb on an aux, add a compressor sidechained to the DRY vocal, and it ducks the return for the vocal's attack/decay then blooms back in the gaps — usable on ANY reverb/delay plugin, not just ones with built-in ducking.** Combine with an EQ dip around the vocal's 200–400 Hz masking range on the return afterward for the fuller fix — see [[Sidechaining]] for the full recipe this send could add if it doesn't already run a sidechain stage. → [[Sidechaining]], [[Masking and Carving]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)
- **Reverb send pre-delay used deliberately as a groove/timing tool on a clap, not just for space.** Paul Epworth, opening the clap reverb in his Adele "Rolling in the Deep" session: "you can see how we're using the pre-delay to try and give a little bit of swing and timing to the feel of the rhythm track as well." No exact pre-delay value given (qualitative), but the framing is distinct from this note's own pre-delay rule above (dry-transient-vs-tail separation) — here the pre-delay amount itself is treated as a rhythmic push, shifting the clap's perceived placement relative to the beat, not just keeping it upfront. Worth trying on a backbeat element when a static grid feels stiff: nudge the send's pre-delay rather than (or alongside) moving the MIDI/audio itself. → [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]], [[Pocket and Microtiming]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **The "zombie vocal" ceiling — if the send reads as audible reverb rather than body, it's too hot.** CLA peels a vocal's reverb send back to roughly **5% wet** specifically so it never announces itself: "I have it set so low I really [don't] hear reverb... let me see if I can just get it to not be a zombie." A concrete, low number to anchor this send's "you don't really hear it" philosophy (see Kenny Beats' bullet below) against. → [[Reverb]] (effect), [[1 Main Vocal Track]] — Chris Lord-Alge (Mix with the Masters), [[Chris Lord-Alge processing vocals]]
- **Clarity move for this send's return EQ: dip ~1.5–3.5 kHz in addition to the HPF/LPF, and keep pre-delay in the 10–50 ms window** — this room send's Pro-Q 4 stage already band-limits (HPF 200–300 / LPF 4–6 kHz); the added clarity trick is a narrow attenuation around 1.5–3.5 kHz so that intelligibility band stays drier, paired with the pre-delay already on this note (20 ms sits inside the general 10–50 ms window this technique recommends) — the transient passes through dry before the reflections arrive. → [[Pro-R 2]] — Sage Audio, [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro)
- **The short tier is body, not audible space** — "you don't really hear it"; his 2022 short verb is [[Pro-R 2]] preset *Vocal Backings Bright* (he used the original Pro-R at the time — the preset name may differ in Pro-R 2) (lightly tweaked) — set it so muting it thins the vocal rather than removing a reverb sound — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
