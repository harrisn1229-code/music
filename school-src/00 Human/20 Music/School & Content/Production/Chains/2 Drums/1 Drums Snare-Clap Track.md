---
type: chain
aliases: ["Drums Snare-Clap Track"]
title: Drums Snare-Clap Track
chain_type: track
family: drums
source: digital
routing: Drums Snare/Clap → Drums Group → Drums Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Transient Master, Saturn 2, Pro-C 2]
status: default
tags: [chain, drums, track]
---

# Drums Snare-Clap Track

**Role:** The backbeat. Snares/claps are the loudest transient in most modern mixes — crack + body + a tail that sets the mix's sense of space.

**Chain philosophy:** shape EQ → transient → color → level. Body-vs-crack balance first, dynamics after.

## 1 — Sound Selection

- **A snare that already crunches through raw needs almost no chain; a weak/airy one can't be EQ'd into hardness.** Audition in [[XO]] against the beat's *intent* — hard trap = crunchy digital, boom bap = live/dusty — before reaching for a single plugin.
- 🎬 **No sample fits? Build the snare from scratch** — Operator body oscillator (fixed frequency ~160–250 Hz + pitch envelope) + noise tail + texture layers ([[Shifter]]/[[Corpus]]/[[Grain Delay]]), grouped and saved as a reusable "snare starter" rack — see [[Snare Design]] for the full recipe — dnksaus, [craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA).
- 🎬 **Match transients across a loop** — one snare with a bad transient/pop gets chopped and replaced so it matches the rest — Disclosure, [Never Enough](https://youtu.be/lGopQwQo9Ag).
- 🎬 **[[Hand Clap Studio]] "underneath claps"** — layered under the main clap for thickness (Clappers 4–8, a little Looseness for a human group, Close-mic'd/dry and fairly narrow so it reinforces without adding space) — Disclosure, [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8).

## 2 — Programming Best Practice

- 🎬 **UK garage bounce snares: 4 ticks off-grid, selected as a group.** Alongside the normal on-grid backbeat snare hits, place extra "bounce" snares in the gaps, then Select None → select just those extra hits → nudge right 4 ticks (arrow key ×4) — a specific, repeatable offset (not "a little late") credited as the actual source of garage's bounce feel. A clap layered on top with some hits landing ON the snare and some just BEFORE it adds further bounce. Full kit build order (hats, kick) on [[Genre Drum Patterns]]. → [[Pocket and Microtiming]], [[Genre Drum Patterns]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Counter-snares and percs go in the GAPS** — balance, not overlap; the backbeat stays king.
- 🎬 **A clap slightly AHEAD of the beat** (drawn in the step sequencer) reads urgent and clean — the deadmau5 clap is "so ahead of the kick, so clean, cuts through everything" — Disclosure, [Remix Stems](https://youtu.be/IOSPhXcXT_8) / [Prince Edit stream](https://youtu.be/hOvLf9nX500).
- **Trap stack:** layer snare + clap, EQ each to its lane (snare = body, clap = 1–4 kHz slap).
- Velocity-vary ghost hits; keep the main 2 & 4 consistent.

## 3 — Source → Ableton (UAD front end)

Optional analog pass when a sample feels sterile — printed to audio:

### 1. [[UAD Neve 1073]] — Preamp plugin — light drive, ~0 VU
### 2. [[UAD UA 1176LN]] — 1–2 dB on peaks, or skip on one-shots
### 3. [[UAD Pultec EQP-1A]] — broad body/air strokes
- 🎬 Kenny's live-snare order agrees: **Pultec first, before any dynamics**, then a gate for noise between hits — [Cook Up From Scratch](https://youtu.be/l7AjRTXex2U)
- 🎬 *From video:* **parallel comp on this exact pair, blended under the dry snare rather than run as a straight insert.** Bob Clearmountain: EQ-only pass first (this note's own Pultec top-end/700 Hz/low-end move) → the same signal additionally hit with the 1176 → blended with the untouched dry snare — "you get a little bit of the natural sound but you get that compression." Named payoff on a rolled passage: the parallel layer pulls up the quieter in-between/ghost notes along with the main hits. Full recipe on [[Parallel Processing]]. — Mix with the Masters (Bob Clearmountain), [[Bob Clearmountain's mixing techniques]]
- 🎬 *From video:* **parallel low-end-only distorted snare** — duplicate the direct/close snare (a 57) to a second channel, drive a compressor hard for character (Nick Launay uses a hardware Distressor; owned stand-in [[UAD UA 1176LN]] or [[Devil-Loc Deluxe]]), then EQ that channel top-rolled-off/low-boosted so it reads as a pure thuddy low-end layer, and blend it under the direct mic — a narrower target than the kick's full-signal parallel-distortion trick above. Full recipe on [[Parallel Processing]] — Mix with the Masters (Nick Launay), [[Parallel distortion by Nick Launay]].

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Shape
- Body +1–3 dB @ 200–250 Hz (the "thwack") · cut mud 400–600 Hz · crack/presence 3–6 kHz · air 10 kHz+ for claps
- 📖 *From book:* add an HPF **100–200 Hz** ahead of the body boost — but set it *below* this snare's body, since the chart's own 200–300 Hz "umph" shelf overlaps the same range as the cut; crisp/crack alternative **5–7 kHz**; optional high cut 15–20 kHz (headroom only, not a harshness fix) — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]
- **Why:** Body-vs-crack balance is the whole snare identity — set it before dynamics.

### 2. [[Transient Master]] — Snap
- Attack +10–25% · sustain down slightly for tight trap, up for roomy rock.

### 3. [[Saturn 2]] — Color
- Tape or tube, single band, low-medium drive
- **Why:** Saturation rounds the harsh digital edge and fattens the body — a saturated snare sits *in* the track instead of on top of it.

### 4. [[Pro-C 2]] — Level (optional)
- Punch style · slow attack · 1–3 dB GR on uneven hits — one-shots skip.

## 5 — Track FX (optional)

- Usually nothing; special-moment tricks (reverse-clap risers, filtered-verb clap tails à la [Never Enough](https://youtu.be/lGopQwQo9Ag)) get automated per section.

## 6 — Bus / Send FX (optional)

Routing: **Drums Snare/Clap → [[2 Drums Group|Drums Group]] → [[3 Drums Bus|Drums Bus]] → [[Master Chain]]**.

- **[[Reverb Send Room]]** — the snare is the *main* customer of the room send; its tail defines the mix's space.
- 🎬 *From video:* on the clap specifically, treat the room send's **pre-delay** as a swing/timing control, not just a space control — nudge it to push the clap's felt placement against the beat, on top of (or instead of) moving the hit itself. See [[Reverb Send Room]] for the full note. — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **[[Parallel Comp Send]]** for size on hooks · **[[Delay Send Slap]]** instead of reverb for the trap "pop."

## Variations

- **Trap:** the stack from §2, no reverb — slap delay for the pop.
- **Beatles/vintage:** [[Kramer Tape]] instead of Saturn, sustain UP, real room verb longer.

## From books

- **Snare EQ starting points — and the 200 Hz conflict against this chain's own body boost.** Low cut **100–200 Hz** ("more if necessary") · low shelf **200–300 Hz** for "umph" · boost **5–7 kHz** for crisp · high cut **15–20 kHz** ("remove harsh freq"). This chain instead **boosts +1–3 dB @ 200–250 Hz** for the thwack, so the HPF has to sit *below* this snare's body or it removes what the next band adds — high-pass by ear per sample, not at a fixed number. Treat the 15–20 kHz cut as headroom hygiene only; real snare harshness is 2–5 kHz ([[Soothe2]]). See the inline 📖 line in §4 above. → [[Snare Design]], [[EQ]], [[Masking and Carving]] — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]

## From videos

- **A textbook parallel-compression A/B/C on a snare — dry, then EQ-only, then EQ+compression, then the compressed pass blended back under the dry original — see the inline 🎬 note in §3 above.** [[UAD Pultec EQP-1A]] (top end, ~700 Hz boost, a bit of low end) + [[UAD UA 1176LN]], blended under the dry snare rather than inserted straight. Also, on the snare's "underneath"/bottom-mic signal specifically: raw described as "pretty nasty-sounding," fixed with a lot of top end plus a scoop-then-restore midrange move (cut mids, then add some back) for brightness rather than body. → [[UAD UA 1176LN]], [[UAD Pultec EQP-1A]], [[Parallel Processing]], [[EQ]] (effect) — Mix with the Masters (Bob Clearmountain), [[Bob Clearmountain's mixing techniques]]
- **Reverb-send pre-delay used deliberately as a swing/timing tool on a clap — see the inline 🎬 note in §6 above.** → [[Reverb Send Room]], [[Pocket and Microtiming]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **A dark-sounding top snare mic opened up decisively at the tracking stage, plus a bottom-mic level catch, before any mix-stage processing.** CLA's first listen on a live snare's top mic read "a little too deep" — opened it up rather than under-correcting, with the stated rule "never be shy with EQ, that's what it's here for"; separately, the bottom-snare mic was caught reading too loud in the level check and pulled down before moving on. Full mic-technique context on [[Drum Mic Technique]]. → [[Drum Mic Technique]], [[EQ]], [[Gain Staging]] — Chris Lord-Alge (Mix with the Masters), [[Tracking live drums with Chris Lord-Alge]]
- **UK garage bounce-snare recipe: 4-tick off-grid nudge on extra bounce snares + on/before-the-beat clap layering** — see the inline 🎬 note in §2 above; also live-recorded hand claps (compressor → Cool Room-preset reverb → bandpass EQ) layered under the programmed snare/clap for extra texture and bounce. → [[Pocket and Microtiming]], [[Genre Drum Patterns]], [[Reverb]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Scoop the snare's fundamental frequency, THEN compress hard, for a fat-but-not-punchy character** — removing the fundamental first changes what the compressor actually grabs; the goal is "the close-mic sound of the snare but without so much of the punch, almost like the punch of an overhead." Finish with a touch of spring reverb. → [[3 Drums Bus|Drums Bus]], [[Snare Design]] — Zach Scholz, [I Tried Recording a Song Like It's 1976](https://www.youtube.com/watch?v=6kA1mWeTiZc)
- **Dual-mic snare trick for a live/hybrid source: a standard top mic + a second angled mic that doubles as a near-front kick mic** — second mic (same model as the first) positioned slightly above the shell, a bit further back, not quite side-snare — picked up more kick batter-head and kit ambience than a straight top mic alone; both summed to one input before the DAW. Driving both mics hot into an analog stage for deliberate clipping is a genre-appropriate lo-fi choice, not a mistake to fix. When the second mic directly faces the hi-hat and bleed is unavoidable, use **expansion instead of compression** to push the snare out and drop the bleed down, rather than compressing (which pulls bleed up toward the snare). → [[2 Drums Group|Drums Group]], [[Sidechaining]] — Zach Scholz, [Recording Old School "Hip-Hop" Drum Tones](https://www.youtube.com/watch?v=R14N3T5AikU)
- **Build a synth snare from scratch: Operator body + pitch envelope, noise tail, texture layers, saved as a "snare starter" rack** — see [[Snare Design]] for the full macro-mapped recipe (body/tail/texture/EQ) plus metallic Grain Delay and pitched-impact-one-shot variants. → [[Snare Design]] — dnksaus, [craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA)
- **Mono the snare, shorten the sample, saturate first** — [[Utility]] width 0 ("snares are dope mono"), clip the baked-in reverb off hit 1 (leave it on hit 2 for contrast), saturate a soft sample before reaching for a new one, EQ out the papery top — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc) & [Make Your Drums Slap](https://www.youtube.com/watch?v=v4ZhwlhF5yE)
## Sources

Kenny Beats — [Cook Up From Scratch](https://youtu.be/l7AjRTXex2U) · Disclosure — [Never Enough](https://youtu.be/lGopQwQo9Ag) · [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8) · [Prince Edit](https://youtu.be/hOvLf9nX500)
