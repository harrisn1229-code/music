---
type: chain
title: James Blake Vocal Chain
reference: James Blake — vocal delivered pre-reverbed/"wet" from the artist, mixed against a second co-lead vocalist (Slowthai — song unconfirmed, likely the slowthai *TYRON* era, Dec 2021)
chain_type: style
family: vocals
tags: [chain, vocal, style, james-blake, video-derived]
video_derived: true
status: reference
---

# James Blake Vocal Chain

**Reference/vibe:** a two-co-lead-vocalist mix where James's vocal arrived **already printed through the artist's own reverb** — the engineer's whole approach pivots on *not* touching that space, then building a fairly dense correction/taming chain underneath it, and finally solving the two-vocalist collision with a surgical, frequency-selective sidechain duck rather than manual automation. The interesting engineering here is less "how to make James Blake sound like James Blake" and more "how to mix a vocal you didn't record, without breaking what the artist already committed to."

**Signal source:** none — this is a mix-only breakdown of delivered stems (wet/printed lead + printed reverb channel + ad-libs with reverb baked in). No tracking chain to document.

## Chain overview

Per-track taming (de-ess → drive/character → EQ → resonance suppression → proximity fix → parallel comp → de-ess) → per-group bus shaping (group de-ess + darkening EQ, split lead vs. BV groups) → combined-group cross-vocalist sidechain duck (the headline move) → final air restoration. Two governing constraints run through every stage: (1) the printed reverb must never get touched by anything downstream, and (2) James's dynamics must survive intact since the take is already mixed-feeling on delivery.

## Step 1 — Per-track chain (lead vocal, repeated per lead + adjusted for BVs)

1. **[[Pro-DS]] — De-ess (first pass)** — FabFilter de-esser, tame the raw take before anything else touches it. *(no exact threshold/range given)*
2. **"Drive" — character/distortion** — plugin identity unconfirmed from audio alone; light saturation stage. See [[Saturation and Distortion]].
3. **[[Pro-Q 4]] — Basic EQ** — HPF the low end (general starting point ~80–120 Hz), one narrow-Q cut pulling out a single ugly resonance found by ear. Owned stand-in for the source's "basic SSL EQ." See [[EQ]].
4. **[[Soothe2]] — Resonance suppression** — "softening the aggression," a second-pass catch for whatever the EQ notch above didn't fully deal with.
5. **[[Pro-Q 4]] — Proximity-effect correction (AudioSuite/offline)** — a batch, non-realtime dynamic-EQ pass targeting inconsistent low-mid buildup from mic-distance changes between phrases, applied surgically to specific bothersome words rather than the whole take. See [[Vocal Mic Technique]]. 🎬 *From video:* this whole stage only exists because the vocal is wet/printed — a dry take would get a normal compressor here instead.
6. **[[Pro-C 2]] — Parallel compression (the only compression on the lead)** — deliberately parallel, not serial, specifically to preserve the artist's original dynamic performance while still "tucking in" a slightly denser version. See [[Parallel Processing]].
7. **[[Pro-DS]] — De-ess (second pass)** — catches sibilance any of the above stages (esp. the drive/saturation stage) reintroduced or exaggerated.

## Step 2 — Group/bus stage (lead Group vs. BV Group, kept separate)

- **Lead Group:** bus de-esser targeting the 'ch'/'esses' consonant cluster, one named parameter value **set to 3.7** *(unit unconfirmed — likely a threshold or range)* → gentle low-pass around **10 kHz** on everything above → a broad **mid-frequency cut**. A deliberate darkening/thinning move on the lead bus, not the usual "add air" instinct — see [[Masking and Carving]], [[MIDS Slot]].
- **BV Group:** same chain shape, but its own named de-esser — **"Weiss Deess"** (unowned, see [[Plugin Wishlist]]) — rather than a copy of the lead group's de-esser.

## Step 3 — Combined Group: the cross-vocalist sidechain duck (headline move)

Both the lead Group and BV Group feed a single combined vocal Group. On that combined Group:

- **"Trackspacer" — 32-band dynamic EQ, external-sidechained to the OTHER vocalist (Slowthai)**, set to **M/S mode, Mid-channel only**, ducking the **1–6 kHz** zone specifically at the moments the two vocalists overlap.
- **Why Mid-only:** the Group also carries the printed reverb tails from Step 0 (James's delivered wet vocal) — running the duck broadband/stereo would pull the reverb down with it. Restricting the trigger to the dead-center Mid image ducks only the dry vocal content and leaves the (wider) reverb tail alone.
- **Why 1–6 kHz specifically:** that's where both vocalists' presence/intelligibility content collides — ducking James there "allows Slowthai to cut through the most" exactly when he enters.
- **Stated payoff:** without this, overlapping sections read as "mess in the middle" — a specific example called out is the word "champagne."
- **Owned equivalent:** [[Pro-Q 4]] per-band **Dynamic EQ + External Sidechain + Stereo Placement (Mid/Side per band)** — build several dynamic bands spanning 1–6 kHz on James's group, point each band's sidechain input at Slowthai's vocal, and set Stereo Placement to Mid only. [[Soothe2]]'s **external sidechain** mode is a rougher, broadband-only fallback for the same masking-avoidance job. See [[Sidechaining]], [[Masking and Carving]], [[Width and Stereo]].

## Step 4 — Finishing

- **[[Clariphonic DSP MKII]]** — run last, explicitly framed as restoring "shimmer" the chain above may have cost rather than a first-pass brightening move. See [[AIR Slot]].

## Vocal arrangement

| Section | Lead | Behind it |
|---|---|---|
| Verse | one voice, printed reverb intact | nothing, or a low pad-like held layer |
| Lift | same | **chopped / vocoded stacks used as an instrument**, not as harmony |
| Two-lead sections | both vocalists at once | resolved by frequency-selective ducking, not by automation |

**The move — the second vocal is a synth.** Chopped, pitched, vocoded stacks occupy the BED/MIDS slots the way a pad would. Treat them as instrumentation when you're deciding what else can play, or you'll double-book the slot.

**The real arrangement problem here is collision.** Two co-lead vocals in one section is a masking hierarchy question, not a mixing one — see [[Masking and Carving]]. The chain above solves it with a surgical duck; the cheaper fix is arranging them so they trade rather than overlap.

**Stack count: 1 → many, but as texture.**

## Notes / variations

- **Respect the delivered space rule:** when a vocal arrives pre-reverbed/printed, the whole downstream chain has to actively route around disturbing that reverb (see the Mid-only sidechain restriction above) — a constraint that doesn't exist on a dry delivery.
- **Two-lead-vocalist masking is a sidechain problem, not an automation problem** here — rather than riding faders by hand at the overlap points, the fix is a standing, always-on frequency-selective duck triggered automatically by the other voice's presence. Generalizes to any feature/duet arrangement with two vocalists sharing register.
- Not a full genre/artist "sound" template like the other Artist Chains notes — this is a single mix-session's problem-solving order, video-derived from one short breakdown clip. Treat Steps 1–2 as reasonable defaults for "taming a wet, already-processed vocal delivery"; Step 3 is the reusable, most-valuable idea.

**Source:** Mix with the Masters, [[MSM Mixing James Blake's Vocals]] ([watch](https://www.youtube.com/watch?v=7QJYsvr1Cuk)) — captions transcript, high confidence.
