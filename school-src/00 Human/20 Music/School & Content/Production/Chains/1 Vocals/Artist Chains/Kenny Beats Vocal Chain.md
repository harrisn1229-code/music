---
type: chain
title: Kenny Beats Vocal Chain
reference: Kenny Beats vocal template (Alex Tumay lineage, 2020 → 2022 versions; ~150 released songs)
chain_type: style
family: vocals
tags: [chain, vocal, style, kenny-beats]
---

# Kenny Beats Vocal Chain

**Reference/vibe:** the modern rap/melodic-rap *engineer's* chain — not an artist tone but the template that recorded ~150 songs (Vince Staples, 03 Greedo, Dominic Fike lane). Clean, fast, identical on every punch-in: lean tracking chain, **the chain lives on the group**, all space on shared sends, and the tune amount calibrated to the artist's identity. Built by copying Alex Tumay's (Young Thug's engineer) Pro Tools template into Ableton; updated 2022.
**Signal source:** condenser through a clean pre — [[Neumann TLM 102]]. Delivery: anything from dry rap verse to fully tuned hooks; the chain doesn't change, the Auto-Tune settings do.

## Step 1 — Record (UAD Console)

1. **[[UAD Neve 1073]] (Unison)** — clean gain, barely driven; Kenny's chain colors later, not at the pre
2. **[[UAD Teletronix LA-2A]]** — his 2A stage, as **peak reduction not tone**: loudest word toward the quietest, "needle never past 7, 10 is really pushing it" on screams
3. **[[UAD Pultec EQP-1A]]** — low ATTEN only; no air boost printed (the raise happens in the box, adjustable)

**Track every take on TWO tracks** — monitored FX track + ghost latency track (no plugins, monitor off, out to a spare hardware pair); keepers come off the ghost track → [[Latency-Free Tracking]]. Record against a **2-track beat bounce** in a separate session — no limiter on the beat, ever. Lock tempo + key *before* anyone sings.

## Chain overview

Gate the room → tune per-lane → lean corrective chain **on the group, tracks empty** → everything spatial on shared sends (one EchoBoy family, three reverb tiers) → the "sound-good-izer" lift stays OFF until the song is done. Punch-ins 30 minutes apart sound identical because there is exactly one chain.

## Step 2 — Process (Ableton, on [[2 Main Vocal Group|Main Vocal Group]])

### 0. [[Gate]] — room killer
- Low threshold (−40 dB zone) — chip bags, chair creaks, HVAC between phrases die here even in an imperfect booth.

### 1. [[Auto-Tune Pro]] — per-lane, the ONE plugin allowed on individual tracks
- **Five settings, done:** input voice type → key → scale → retune speed → style. Voice type is the forgotten one (Low Male/Alto/Soprano = range switch) — wrong = everything misreads
- **Retune map:** ~30–40 invisible support · **~7 = audible Travis/Greedo bite** · >10–12 full T-Pain chip
- **Humanize 0, always** — naturalness comes from low retune + **Legato** style instead (opposite knob-philosophy from Nate's Humanize-100 default — pick ONE per song)
- Mains vs ad-libs get *different* tune (ad-libs more, or Legato-vs-Soft-EFX split); goes on tracks when takes need different keys/settings.

### 2. [[Pro-Q 4]] — channel EQ
- Low cut + a small high raise ("people's voices just don't punch enough"), adjusted per voice · **Zero Latency while tracking → Natural Phase when mixing**.

### 3. [[Pro-DS]] — de-ess (2022 order: BEFORE the comp)
- Male Wide Band preset, threshold to taste — tames S's on the way *into* the compressor so the comp doesn't pump on sibilance. (His 2020 chain had it last; 2022 moved it up.)

### 4. [[Pro-C 2]] or [[LALA]] — R-Compressor slot
- Gentle leveling, 2–4 dB GR — stage two after the tracking 2A ([[Compression Staging]]).

### 5. [[UAD Pultec EQP-1A]] — "fake Pultec" sweetening
- Light low boost + broad air lift, last in the chain — the polish stage.

### 6. — the "sound-good-izer" (OFF until the song is done)
- CLA Vocals-style last-mile lift: owned lane = [[Oxford Inflator]] or [[Saturn 2]] light. It adds latency + character artists get used to while tracking; toggle on when the record is finished, then re-trim. → [[3 Vocal Bus|Vocal Bus]]
- **Playback psychology:** the group chain runs slightly nicer than the headphone chain — drag-down playback sounds *better* than the take felt and artists push harder. "Psychological warfare, but healthy."

## Step 3 — Effects (sends — shared by ALL vocal tracks)

- **Delays: ALL [[EchoBoy]]** — 1/4, 1/8, 1/16, slap, 1/2 returns share one EchoBoy setting varied only by subdivision; **band-limit with EchoBoy's internal high/low cut**, no EQ after (one plugin per return, one tone family). → [[Delay Send Slap]], [[Delay Send Other]]
- **Delays sidechain-duck to the lead** — compressor on the returns keyed from the vocal: tails tuck under words, bloom in gaps. → [[Sidechaining]]
- **Reverb tiers:** short = [[Pro-R 2]] "Vocal Backings Bright" (tweaked; Kenny used the original Pro-R in 2022) — body only, "you don't really hear it" · long + super-long = [[ValhallaVintageVerb]] ("just sounds right on vocals"). 2020 alt-recipe: [[ValhallaRoom]] 3.0 s, 100% wet, ~90% depth, EQ on the return. → [[Reverb Send Room]], [[Reverb Send Long]]
- **Doubler:** dropped from the 2022 chain. 2020 mode: [[Doubler2]] at ~20% on everybody — "a little bigger," never audibly doubled.
- **Ad-lib group = pan-L + pan-R + phone-filter center track** — the band-limited phone track cuts through *between* the mains; optional [[PanMan]] drifting center ad-lib. Harmony stacks: copy-pairs at stepped pans (25L/25R, then 15L/15R in Live terms) — width with no widener plugin. → [[1 Backup Vocal Track|Backup Vocal Track]], [[1 Double Vocal Track|Double Vocal Track]]
- **The "effects track"** — drag a line-end word to a dedicated track: loud [[EchoBoy]] **insert** (not send), high end cut, subdivision changed per throw, + long-verb send ducked under the ad-libs. Throws as arrangement events. → [[Automation]]

## Vocal arrangement

| Section | Lane | Behind it |
|---|---|---|
| Verse | main vocal, punched in | doubles only on emphasis words |
| Hook | main + a tight double | harmonies + a low octave |
| Ad-libs | **own track, own group**, panned wide | delay throws on line-ends |

**The move — the arrangement is a template, not a decision.** The chain lives on the group and is identical on every punch-in, so an artist can build a stack in real time without anyone stopping to dial anything. That's what makes ~150 songs possible: the vocal arrangement is *fast* rather than clever.

**Doubles on emphasis words only** — not whole verses. Full-verse doubling flattens the delivery, which is the one thing this lane can't afford.

**Stack count: 1 → 4, built live.**

## Notes / variations

- **Sends are shared by mains AND ad-libs** — one space for the whole stack; that's why it glues.
- **Dry-verse / tuned-hook split (Greedo mode):** same chain, Auto-Tune bypassed on verse takes, ~7 retune on hooks — tune amount is the artist's identity, ask them.
- **vs [[Travis Scott Vocal Chain]]:** Travis = the *drowned* version of this architecture (same tune + sends skeleton, wet/dark pushed to the aesthetic); Kenny's default stays clean and upfront.
- This is the lineage [[1 Main Vocal Track|Main Vocal Track]] / [[2 Main Vocal Group|Main Vocal Group]] / [[3 Vocal Bus|Vocal Bus]] were built from — use those for the house default; use this note when you want the *all-Kenny* setup verbatim.

**Sources:** [Vocal Template (2020)](https://youtu.be/X_iDENABLmk) · [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) · [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c) — full notes: [[Kenny Beats - Recording and Voice Mix Process (Vocal Template)]] · [[Kenny Beats - New Vocal Chain 2022]] · [[Kenny Beats - Auto-Tune Process]]
