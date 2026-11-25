---
type: chain
title: Myles Smith Vocal Chain
reference: Myles Smith / Peter Fenn — *My Mess, My Heart, My Life* (Stargazing, My Mess, Dying Day)
chain_type: style
family: vocals
tags: [chain, vocal, style, myles-smith, video-derived]
video_derived: true
status: reference
---

# Myles Smith Vocal Chain

**Reference/vibe:** an emotionally raw, deliberately imperfect pop-vocal system built around a fixed stacking rule (lead + doubles + hard-panned doubles as the floor, on every hook, no exceptions) with two swappable extra layers on top depending on how big the song needs to feel — a named, physically-performed ad-lib layer ("Milesauce") for anthems, and nothing extra at all for intimate songs. Mic choice is treated as a raw-vs-clean performance decision, not a fidelity one, and can change mid-album for a single song when it serves the take.

**Signal source:** Neumann U87 (not owned) is the default tracking mic on their mobile rig; Shure SM7 (not owned, [[Shure SM7]]) swapped in specifically for texture/relaxation, sometimes for a whole lead vocal.

## Chain overview

Track (mic choice by feel) → lead + doubles + hard-panned doubles (fixed floor, every hook) → optional "Milesauce" ad-lib layer (Decapitator → 1176 → Capitol Chambers reverb) → vocal bus (DynOne multiband + Soothe2, both standing) → master bus (bleeds in from a continuously-running mix-bus chain, not a separate stage).

## Step 1 — Tracking: mic choice as a performance decision

- **Default:** Neumann U87 (not owned) on Miles' lead vocal, through a small Apollo on their mobile rig ([[Universal Audio Apollo Twin MkII]]).
- **Swap to [[Shure SM7]] when raw texture matters more than clean tone.** Most ad-libs/BVs go through the SM7 "just because it sounds raw"; one full song ("Solo") was tracked on an iPhone for the identical reason. On *Dying Day* the ENTIRE lead vocal moved to the SM7 instead of the usual U87 purely because it let Miles sit back and relax into the take — a performability-over-fidelity call, not a tonal endorsement of the mic itself. → [[Vocal Mic Technique]].
- No heavy vocal tuning/processing mentioned at the tracking stage — the raw-texture philosophy starts at mic choice, not in post.

## Step 2 — The fixed stack floor (every hook, every song)

1. **Lead** — the main take.
2. **Doubles** — at minimum one double on every hook across the whole album, "I don't think there's a single hook I've done that's not at least a double" — even on the most stripped-back acoustic tracks (named example: "Grandma's Place").
3. **Hard-panned doubles (left/right)** — doubles panned hard to widen the hook further.

This three-layer floor is non-negotiable per their own description; everything below is additive on top of it, scaled to how big the song needs to read.

## Step 3 — "Milesauce": the named ad-lib layer (big songs only)

- **What it is:** Miles physically steps back from the mic and shouts/moves around it for a fourth, more aggressive texture layer — treated as its own instrument, not a normal double.
- **Chain (a saved preset, reused across songs):** [[Decapitator]] (driven hard, audibly distorting on purpose) → [[UAD UA 1176LN]] → UAD Capitol Chambers reverb (unowned — see [[Plugin Wishlist]]). Demoed dry vs. wet on *Stargazing*: dry is essentially room tone with no vocal-track plugins, wet pushes the Decapitator drive hard enough to make an already-deep voice sound "thick."
- **When to skip it:** deliberately left off *My Mess*, their most intimate/vulnerable song — "on an intimate song like this, you just gotta do what it calls for." The fixed stack floor (Step 2) still applies even when Milesauce doesn't.

## Step 4 — Vocal bus (standing, applies across songs)

- **[[Leapwing DynOne]] (unowned, multiband) run across the ENTIRE vocal bus** — every vocal element together, not per-track. On *Stargazing*: subtle, "brings out the transients." On *My Mess*: paired with the next stage for de-essing.
- **[[Soothe2]] on a saved preset called "DS"**, paired with DynOne specifically on *My Mess* for harshness/sibilance control without a dedicated de-esser.

## Step 5 — Master bus (bleeds in continuously, not a separate mastering stage)

A standing master-bus chain (UAD Hitsville EQ "Mix" preset + God Particle with the limiter backed off — see [[Master Chain]]) runs throughout production, so the vocal bus above is always being heard against a near-final master rather than in isolation. See [[Creative Process and Idea Capture]] for the full mixing-as-you-go workflow this depends on.

## Notes / variations

- **The stack floor scales UP (Milesauce) or holds flat (My Mess) — it never scales down below lead+double+pan.** Treat the three-layer floor as the non-negotiable baseline for any hook, and decide the ad-lib layer per song based on how anthemic it needs to read.
- **Mic choice is a repeatable lever, not a fixed setup.** If a take feels stiff on the "good" mic, trying a rougher one (SM7, even a phone) is a documented fix here, not a downgrade.
- **This chain shares its reverb (Capitol Chambers) and its 1176 with the rest of the session's instrument busses** (shaker/tambourine, mandolin) — see [[Reverb]] — rather than using a vocal-only reverb, which is part of why the whole record reads as one cohesive room.

**Source:** Tape Notes, [[TN 184 Myles Smith & Peter Fenn - Full Video Episode]] ([watch](https://www.patreon.com/posts/161939546)) — real subtitles, high confidence.
