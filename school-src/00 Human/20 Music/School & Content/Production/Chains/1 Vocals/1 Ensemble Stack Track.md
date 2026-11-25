---
type: chain
aliases: ["Ensemble Stack Track"]
title: Ensemble Stack Track
chain_type: track
family: vocals
source: mic
mic: Neumann TLM 102
routing: Ensemble Stack (each layer) → Ensemble Stack Group → Vocal Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Tube-Tech CL 1B mkII, UAD Pultec EQP-1A]
foundation: Vocal Foundation (front half only — Pro-C 2 + Soothe2 deferred to group/bus)
signal_chain: [Auto-Tune Pro, VocAlign Project 5 AU, Pro-Q 4]
status: default
tags: [chain, vocal, track]
---

# Ensemble Stack Track

**Role:** The **per-layer prep** for a self-stacked vocal ensemble — the tune/align/band-limit/level work applied to *each individual layer* you record, whatever its role in the stack. There is **no fixed take count**: you build the ensemble from a menu of layer-roles (core, doubles, octave anchor, air, harmonies…) and add blocks as the section needs. The arrangement/roles and the glue live on [[2 Ensemble Stack Group|Ensemble Stack Group]]; this note is what makes any single layer sit right.

This is distinct from [[1 Double Vocal Track|Double Vocal Track]] (one lead + one double) and [[1 Backup Vocal Track|Backup Vocal Track]] (elements that *answer* the lead). A stack can be run two ways — decide per song (see the group note): a **fused ensemble** (no single lead, everything level-matched into one source — Bon Iver/Imogen Heap) or a **lead + support stack** (a front vocal with doubles/octaves/harmonies underneath — standard pop). The building blocks are the same; only the balance differs.

**Chain philosophy:** `tune → align → band-limit → level-match` (per layer) ▸ `EQ → glue → saturate → de-ess → shared space` (on the group). **Unify per-layer, glue on the group.** What fuses a stack is *consistency of tuning, timing, and space* — not per-layer processing. Keep the *performance* differences you tracked on purpose (a soft approach vs a full one, ahead vs behind, vowel shape), but lock pitch and time and match tone. In a fused ensemble, **level-match ruthlessly so no layer becomes an accidental lead**; in a lead+support stack, the support layers deliberately sit lower.

## 1 — Recording Setup

- **Same mic for every layer** — [[Neumann TLM 102]], shock mount, pop filter ~4" out, 48V on. One consistent source is half of what fuses a self-stack; don't swap mics between layers the way you would for *contrast* on backups.
- **Consistent distance and position per layer-role.** Keep mic distance identical across a role (esp. whisper/air layers, which expose distance changes). Step back slightly and sing softer for gang/choir layers to keep peaks controlled.
- Same room/latency discipline as [[1 Main Vocal Track|Main Vocal Track]] §1 (phone silenced, HVAC off, track through the UAD Console to sidestep latency).

## 2 — Tracking Best Practice

- **Record in role-pairs, and know each layer's job before you sing it** (full menu in [[2 Ensemble Stack Group|Ensemble Stack Group]] `## Layer roles`). Doubles get tracked as **L/R pairs** so the stereo image is built at the source; harmonies get **doubled per part**; the octave-down anchor is usually a **single centered take**.
- **Match what a layer is doubling.** A double should copy the tone, phrasing, and timing of the take it doubles as closely as possible, with **softer sibilance and transients** so it blends under rather than flams against the source — [Sage Audio](https://www.sageaudio.com/articles/how-to-stack-vocals).
- **Sing core/unison layers with intent, not identically.** For a rich single source you want the *performances* varied (soft/breathy vs full/chest, slightly ahead/behind, different vowel emphasis) while pitch and time get locked afterward. Tuning + alignment can't *add* richness — that has to go in at the mic.
- **Octave layers are felt, not heard** — sing them relaxed; they add weight (down) or sheen (up), and they'll sit low in the mix, so don't oversing them.
- **Kuk-Harrell stack discipline:** track a role in one pass, judge tightness against the panned image as you go, sing the stack softer than a normal lead, and run **one shared chain across the whole role**. Cross-reference [[FX Chain System]] and [[1 Backup Vocal Track|Backup Vocal Track]] §2 rather than re-deriving it.

## 3 — Source → Ableton (UAD Console)

Same console pass as [[1 Main Vocal Track|Main Vocal Track]] §3 ([[UAD Neve 1073]] → [[UAD Tube-Tech CL 1B mkII]] → [[UAD Pultec EQP-1A]]), printed conservatively. Keep the print **matched within a role** (same preamp gain and 2–4 dB opto GR across all the doubles of a part) so no layer arrives louder or brighter than its siblings — matched prints are what let layers fuse. The octave-down anchor and air layer can print at their own level since they occupy different registers.

## 4 — Ableton Initial Processing (per layer)

**From the [[0 Vocal Foundation|Vocal Foundation]] →** a stack takes only the block's **front half** per layer — gain-in → [[Auto-Tune Pro]] → corrective [[Pro-Q 4]] — and **deliberately drops the foundation's [[Pro-C 2]] and [[Soothe2]] at the layer stage.** Per-take leveling/resonance work fights fusion (it re-separates the voices), so those two move *downstream*: the glue comp is one opto over the whole stack on [[2 Ensemble Stack Group|the group]], and [[Soothe2]] runs once on the [[3 Vocal Bus|Vocal Bus]]. In their place the layer adds **[[VocAlign Project 5 AU]]** (§4.2 — the timing/fusion knob a single voice never needs) and **level-matching** (§4.4). Net: the ensemble still runs the foundation's full logic — it's just spread across **track → group → bus** instead of piled on each take.

> **Per-take is deliberately minimal — this is the point, not a gap.** A stack fuses when the *sum* is processed once, not when each take is compressed/saturated/de-essed on its own (per-take character work actively fights fusion — it re-separates the voices). So each layer only gets **tune → align → band-limit → level**. Everything else is distributed downstream:
> - **Compression:** the console/tracking print already applied the [[UAD Tube-Tech CL 1B mkII|CL 1B]] on the way in (§3); the *glue* comp is one opto over the whole stack on [[2 Ensemble Stack Group|the group]].
> - **Saturation, composite carve EQ, de-ess, shared space** → [[2 Ensemble Stack Group|Ensemble Stack Group]].
> - **Program leveling ([[UAD Teletronix LA-2A]]), tone EQ, final de-ess, resonance ([[Soothe2]] — one instance, not per-take), air** → inherited from the [[3 Vocal Bus|Vocal Bus]] the group routes through.
>
> Net: the ensemble runs the *same* full chain the lead does — it's just spread across **track → group → bus** instead of piled on each take.

### 1. [[Auto-Tune Pro]] — Pitch
- Every layer to the **same key/scale** (④), **Retune 25** (① — medium). Consistent pitch centers are what make separate takes fuse. Vary retune only subtly; unison/double layers usually take **more aggressive** tuning than a lead so they lock tight — [Sage Audio](https://www.sageaudio.com/articles/how-to-stack-vocals). Harmony layers follow the harmony line, not the melody.
- **Why:** First so everything downstream reacts to corrected, matched pitch.

### 2. [[VocAlign Project 5 AU]] — Timing (the master width/fusion knob)
- **Doubles align to the take they're doubling** (not to one global reference) so each pair reads as one thick voice. For a fused unison ensemble with no source take, pick one layer as the reference and align the rest to it.
- **Tighter alignment = more fused / mono-leaning; looser = wider, more natural ensemble.** This single control largely decides Variant A vs B on the group. Leave the octave anchor and air layers unaligned (their register already separates them).
- **Why:** Timing consistency does more for the single-source illusion than any EQ or comp move. Manual/aligned timing beats leaving it to chance — [Sage Audio](https://www.sageaudio.com/articles/how-to-stack-vocals).
- *(Owned substitute for VocAlign Ultra AU, which hangs Live on automated load — Project 5 does the same align-a-dub-to-a-guide job. If it also stalls, fall back to manual: warp each take's transients to the reference, or use [[Melodyne]]'s time tool.)*

### 3. [[Pro-Q 4]] — Band-limit (role-dependent)
- **Core/doubles:** HPF ~80–120 Hz (stacking builds low mud); gentle LPF only if harsh.
- **Octave-down anchor:** HPF *lower* (keep its weight, ~40–60 Hz) but carve any boom; it lives under everything.
- **Octave-up / air / whisper:** HPF *higher* (~150–300 Hz) so they sit as sheen above the core without adding mud.
- Keep moves small and roughly identical *within* a role.
- **Why:** Clears the summed low-end buildup and slots each role in its own register before the group glue comp.

### 4. Level-match (clip gain, per the chosen philosophy)
- **Fused ensemble:** clip-gain every core/double layer so **none dominates** — a composite, not a stack-with-a-winner.
- **Lead + support:** the lead sits at reference; supporting layers tuck under it, and **octave layers land ~−8 to −12 dB below** ("felt more than heard") — [Twisby](https://twisbyrecords.com/post/how-to-layer-vocals-like-a-pro/).

### 5. Keep per-layer color minimal (two optional exceptions)
- No per-layer **saturation/character** passes on core/double layers — similar tone + one shared space (on the group) is what reads as a single source. (Deliberate degradation belongs on *backups*, not a fused ensemble.)
- **Optional — gentle per-take leveler:** if a take is *wildly* dynamic, a light [[Pro-C 2]] (2–3 dB GR, fast-ish) *after* clip-gain evens it before it hits the group glue comp. Keep it subtle — clip-gain does most of the work, and a heavy per-take comp fights fusion.
- **Optional — light per-take de-ess before the group:** for very sibilant stacks, a gentle [[Pro-DS]] on each take *and* the composite de-ess on the group is the "de-ess before AND after" move (Disclosure's group-vocal approach — [[2 Backup Vocals Group|Backup Vocals Group]]). Only reach for it when the single group de-ess can't tame the stacked S's.

## 5 — Track FX (optional)

Usually nothing per layer — fusion and character come from the group. Resist adding per-layer color; it pulls a layer out of the composite.

- **Exception — specific-word delay throws.** When *one word or phrase* should catch/repeat, that's a **per-layer** move, not a group send: drag the word to a dedicated effects/throw track with a **loud [[EchoBoy]] insert** (high end cut, subdivision per throw), or automate a delay send on just that layer for that moment. Ambient/glue delay for the *whole* stack stays a shared group send — see [[2 Ensemble Stack Group|Ensemble Stack Group]] `## Delay / echo`.

## 6 — Bus / Send FX (optional)

Routing: **Ensemble layers → [[2 Ensemble Stack Group|Ensemble Stack Group]] → [[3 Vocal Bus|Vocal Bus]] → [[Master Chain]]** — "the group has the chain." Every layer stays dry; the glue, saturation, de-ess, and the shared reverb + delay sends all live on the group so the whole stack sits in identical space and treatment. The only per-layer time-based FX is a deliberate word-throw (§5).

## Variations

- The layer-role menu, the two philosophies (fused vs lead+support), and the three width treatments all live on [[2 Ensemble Stack Group|Ensemble Stack Group]]. The per-layer levers that feed them are the **[[VocAlign Project 5 AU]] tightness** (§4.2) and **role-based HPF/level** (§4.3–4.4).

## Sources

Kuk Harrell stack discipline (via [[FX Chain System]]). Layering best practice: [Sage Audio — How to Stack Vocals](https://www.sageaudio.com/articles/how-to-stack-vocals), [Twisby — 7 Layers You Need to Record](https://twisbyrecords.com/post/how-to-layer-vocals-like-a-pro/), [Synchro Arts — Vocal Layering](https://www.synchroarts.com/posts/vocal-layering). Self-stack references: Bon Iver "Holocene", Imogen Heap, HAIM, gospel self-stacks. Spec: `spec-131-ensemble-vocal-stack-chains`.
