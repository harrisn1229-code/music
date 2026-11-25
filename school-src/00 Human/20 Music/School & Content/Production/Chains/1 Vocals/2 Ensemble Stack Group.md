---
type: chain
aliases: ["Ensemble Stack Group"]
title: Ensemble Stack Group
chain_type: group
family: vocals
source: mixed
routing: "[Ensemble Stack layers — flexible count] → Ensemble Stack Group → Vocal Bus → Master"
signal_chain: [Pro-Q 4, UAD Teletronix LA-2A, Decapitator, Pro-DS, ValhallaVintageVerb]
status: default
tags: [chain, vocal, group]
---

# Ensemble Stack Group

**Role:** Sums a self-stacked vocal ensemble — **however many layers you built** — into one cohesive element, and holds the *arrangement* (which layer-roles are present) plus the glue, cohesion, shared space, and width treatments. The per-layer prep already locked pitch/time/level on [[1 Ensemble Stack Track|Ensemble Stack Track]]; the group makes the layers read as one. Distinct from [[2 Main Vocal Group|Main Vocal Group]] (which balances a lead against its layers) — here the stack is the instrument.

## Two ways to run it (choose per song)
- **Fused ensemble (no lead)** — every core layer level-matched so nothing wins; one shared space; tightest fusion. *Bon Iver "Holocene", Imogen Heap, gospel self-stacks.*
- **Lead + support stack** — a front vocal with the other roles tucked underneath (doubles just under, octaves ~−8 to −12 dB, harmonies below the lead); the standard pop stack.
Same building blocks either way — only the **level relationship** changes. Everything below applies to both.

## Layer roles — the modular stack (add blocks as the section needs)

There is **no fixed take count.** Build from these roles; a sparse verse might be Core only, a final chorus might stack all of them. Record doubles as **L/R pairs** and harmonies **doubled per part**.

| Role | Job | Typical count | Pan | Level | Double it? | Band-limit (track §4.3) |
|---|---|---|---|---|---|---|
| **Core / Unison** | the body of the ensemble — your main "approaches," sung different ways | 1–several | center → near-center | reference | it's its own role (see Doubles) | HPF 80–120 Hz |
| **Doubles** (of each core layer) | width + thickness; the main stereo image | 2–8, in **L/R pairs** | tight ±20–30% (verse) → wide ±60–100% (chorus/hook) | just under their source | — align each to its source | HPF 80–120 Hz, softer sibilance |
| **Octave-down anchor** ("low one in the middle") | weight + gravity, *felt not heard* | 1, **not doubled** | **center** | ~−8 to −12 dB under core | no | HPF low (~40–60 Hz), keep weight |
| **Octave-up / air** | sheen + lift on top | 1 (optionally doubled) | center or slight ± | low, felt not heard | optional | HPF high (~150–300 Hz) |
| **Harmonies** (3rd/5th/6th/7th) | color; don't harmonize every note | each part doubled | wide ±60% (high one side, low the other) | under core/lead | yes | HPF ~120 Hz+ |
| **Whisper / air texture** | ear candy | doubled | ±L/R | subtle | yes | HPF high, consistent mic distance |
| **Gang / choir** | anthemic size | 6–20 takes, varied tone/accent | spread around the field | balance to taste | — | vary per take |

**Build order:** Core → Doubles (width) → Octave-down (weight) → Octave-up / Harmonies / Whisper / Gang as wanted. **Panning principle:** the stereo field is a *stage* — keep the Core and Octave-down anchor **centered** and get width from the doubles/harmonies/air. Don't hard-pan *everything* or you carve a hole in the middle and the stack disconnects from the mix — [Synchro Arts](https://www.synchroarts.com/posts/vocal-layering).

### This song's config (worked example — 5 layers, expandable)
Two approaches sung different ways = **Core A + Core B** ▸ **each doubled** (A + A-double L/R pair, B + B-double L/R pair) ▸ **+ Octave-down anchor, centered**. Add more later by dropping in blocks from the table (an air layer up top, a harmony pair, etc.) — the group chain and width variants don't change, they just have more to fuse.

## Harmony layer (turning the stack into a chord)

Everything above stacks the *same note* (unison + octaves). Adding **harmonies** turns the ensemble from a thick single note into a **chord sung by one voice** — the biggest expansion move available. It's an optional layer-role, but arrange it deliberately:

- **Intervals — start with 3rds and 6ths** above and/or below the melody (the **3rd is the "money note"** — most color per layer). Add **5ths** for openness and **7ths / octaves** for a fuller, choir-like spread. Match the interval to the underlying chord so the harmony spells the actual harmony, not just a parallel line.
- **Don't harmonize every note.** Bring harmonies in on **hooks, phrase-ends, and transitions**; harmony that's on the whole time loses its lift. Subtraction is the arrangement ([[Arrangement and Song Form]]).
- **Double each harmony part** (L/R pair) and **pan wide (~±60%)** — high harmony one side, low harmony the other — so the chord **opens up around the centered Core + octave anchor**. This is what makes a self-stack read as a *group* rather than one fat note.
- **Register / EQ:** HPF each harmony **~120 Hz+** so they sit above and around the core without stacking mud; keep them a touch **under** the core/lead in level (color, not competition).
- **Tuning:** harmonies follow the **harmony line, not the melody** — set them in [[Auto-Tune Pro]] to the right scale, and run them slightly *more* tuned than the leads to lock the chord tight. For a Beatles/block-harmony blend instead, back the tune off (retune 40+) and let the takes blend (see [[1 Harmony Vocal Track|Harmony Vocal Track]] Variations).
- **Fused vs lead:** in a **fused ensemble** the harmonies blend as equal chord tones; in a **lead + support** stack they tuck under the lead as color. Same parts, different balance.
- **Per-part processing** (band-limit, wetter delay/reverb, texture-split between harmony layers) lives on the dedicated [[1 Harmony Vocal Track|Harmony Vocal Track]] — route those tracks into this group so they share the glue, de-ess, and one space.

## Chain overview
Carve → glue-comp (one comp over the whole stack) → light saturate → de-ess the composite → one shared space. **Unify-then-glue:** the single most important group move is *one* slow comp riding every layer together, and *one* ambience they all share.

> **What the group does NOT do (inherited downstream):** program leveling ([[UAD Teletronix LA-2A]]), broad tone EQ, final de-ess, resonance ([[Soothe2]] — kept as *one* instance on the bus, not per-track), and air all come from the [[3 Vocal Bus|Vocal Bus]] this group routes into — don't duplicate them here. Track prep + this group + the bus together = the full chain the lead runs, just distributed (see [[1 Ensemble Stack Track|Ensemble Stack Track]] §4).

## Chain

### 1. [[Pro-Q 4]] — Composite carve
- Subtractive EQ on the **summed** stack, not each layer: HPF cleanup if the sum still has mud, tame resonances that only poke out when everything's up (2–4 kHz harshness, 200–400 Hz box). Broad, gentle. Carve the vocal's lane against the *other* groups here rather than boosting.
- **Why:** Stacked layers pile up low-mid and sibilant energy; carve the composite so the glue comp isn't fighting buildup.

### 2. [[UAD Teletronix LA-2A]] — Glue compression (slow opto)
- Compress mode · **2–4 dB GR** on the loudest phrases · gain to unity. Optical, soft-knee, longer release for cohesion — [Sage Audio](https://www.sageaudio.com/articles/how-to-stack-vocals). [[UAD Tube-Tech CL 1B mkII]] is an equally good opto here; Ableton Glue Comp or [[Pro-C 2]] in an opto style stands in fine.
- **Why:** **One comp moving the whole stack together** is the biggest part of the single-source illusion — it makes the layers breathe as one voice. Slow opto so there's no audible pumping.

### 3. [[Decapitator]] — Saturation for cohesion
- Style A (tape-ish) · Drive 2–4 · Mix 20–35% · Punish off. A [[UAD Pultec EQP-1A]] / [[UAD Neve 1073]] tone pass is an alternate flavor.
- **Why:** A touch of *shared* harmonic drive fuses stacked voices more than almost anything — common harmonics read as one source. Post-glue so drive level is consistent.

### 4. [[Pro-DS]] — De-ess the composite
- Split-band, sidechain framed on the S region (~4–8 kHz), range 4–6 dB. De-ess background layers **harder** than a lead.
- **Why:** Many stacked "s"es get harsh fast — de-ess the **sum**, not each layer (per-layer de-essing over-processes and dulls the performances).

### 5. [[ValhallaVintageVerb]] — One shared space (reverb)
- A single short room/plate, low-to-medium mix. For depth, a short plate to glue + a longer hall/chamber to push some layers back.
- **Why:** Putting every layer in **the same ambience** is what makes them read as one performance in one room. Never give individual layers their own reverb — separate spaces re-separate the voices.

## Delay / echo — where it goes

Same principle as reverb: **cohesion lives on the group, moments live on a throw track.**
- **Ambient / glue delay** (slap, 1/8, 1/4 that places the *whole ensemble* in a space) → a **shared group send** to [[Delay Send Slap]] / [[Delay Send Other]] (one setting, varied only by subdivision, band-limited via [[EchoBoy]]'s internal hi/lo cut). One delay across the whole stack reinforces the single-source illusion; a per-layer delay pulls the voices apart the way per-layer reverb does. **Sidechain-duck the delay returns to the stack** so tails tuck under words and bloom in the gaps — [[Sidechaining]].
- **A specific word / phrase throw** (last word repeats, a catch on one line) → **not the group.** Drag that word to a dedicated effects/throw track with a **loud [[EchoBoy]] insert**, high end cut, subdivision per throw ("spotlight throws are an insert, not a send"). This is a *per-layer* move and lives on the track — see [[1 Ensemble Stack Track|Ensemble Stack Track]] §5.
- **Rule of thumb:** cohesion → group send · moment → individual insert.

### Routing
**Ensemble Stack Group → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — the vocal-dedicated delay/reverb returns output **into the [[3 Vocal Bus|Vocal Bus]]** (so bus glue melts wet into dry and riding the bus fader carries the space with the voice), not straight to master. Keep this group about fusing the stack.

## Variations — width treatments (driven by which layers are present)

- **A — Thick & Centered** *(Bon Iver "Holocene"; intimate lead-stack)* — one big voice: tightest [[VocAlign Project 5 AU]] alignment; core + doubles near center (±0–15%); octave-down anchor doing the weight; [[Little MicroShift]] off/low; short, mono-leaning [[ValhallaVintageVerb]]; glue comp a touch firmer.
- **B — Wide Ensemble / Choir** *(Imogen Heap, HAIM, gospel)* — a choir-of-yourself: looser alignment (keep the natural timing spread); pan the double/harmony pairs across the field (e.g. ±100 / ±60 / ±25%); [[Little MicroShift]] for extra spread; wider/stereo verb; slightly *less* glue so they breathe. Core + octave-down still centered.
  - 🎬 *From video:* a minimal from-scratch version of this exact variation — 4 layers (main/low/high/mid-different-tone) instead of a full role menu, with [[Little AlterBoy]] doing the pitch/formant differentiation per layer (main formant-down-slightly; a second layer octave-up + formant-down, paired to the main's reverb; a third layer same pitch/formant setting but a longer, heavier reverb since it reads more exposed) and the low layer getting [[Decapitator]] crunch instead of pitch shifting — see [[Vocal Stacks and Ad-libs]] § From videos for the full breakdown.
- **C — Hybrid: Center Core + Wide Halo** *(modern produced pop)* — focused center in a big bloom: the Core layers + octave-down anchor tight-center; the doubles/harmonies/air spread wide with [[Little MicroShift]] as the halo; center marginally louder but no single "lead"; HPF the halo a little higher so it sits *under* the core; big surrounding bloom.
  - 🎬 Optional moving element: one halo layer on [[PanMan]] drifting between the wide pair (static width + one moving voice) — the trick [[1 Backup Vocal Track|Backup Vocal Track]] §2 cites for ad-libs.

## From videos

- **A minimal 4-layer "choir from one voice" build (Variation B in miniature) — main/low/high/mid-different-tone, no external singers, pitch/formant + reverb doing all the differentiation instead of the full tune/align/glue chain above.** [[Little AlterBoy]] set differently per layer (main: formant down slightly + short reverb; second: octave-up + formant-down, same short reverb as main to fuse the pair; third: same pitch/formant setting but a longer, heavier reverb since it reads more open/exposed); low layer skips AlterBoy for EQ (cut lows) + [[Decapitator]] crunch + heavy reverb. All four bounced to one stem. A useful low-overhead reference point against this note's full role-based system — worth reaching for when a quick choir texture is needed without tracking a full ensemble menu. → [[Vocal Stacks and Ad-libs]], [[Little AlterBoy]], [[Decapitator]] — loner, [making a soulful/emotional gospel sample for lil durk & lil baby (turning my vocals into a choir)](https://www.youtube.com/watch?v=nHBEE-uvq4M)

## Sources

Layering best practice (researched 2026-07-17): [Sage Audio — How to Stack Vocals](https://www.sageaudio.com/articles/how-to-stack-vocals), [Twisby — 7 Layers You Need to Record](https://twisbyrecords.com/post/how-to-layer-vocals-like-a-pro/), [Synchro Arts — Vocal Layering](https://www.synchroarts.com/posts/vocal-layering), [Singing Success — 5 Industry-Standard Vocal Layers](https://singingsuccess.com/5-industry-standard-vocal-layers/). Kuk-Harrell stack discipline via [[FX Chain System]]. Style references — thick-centered: Bon Iver "Holocene"; wide choir: Imogen Heap, HAIM, gospel self-stacks. Spec: `spec-131-ensemble-vocal-stack-chains`.
