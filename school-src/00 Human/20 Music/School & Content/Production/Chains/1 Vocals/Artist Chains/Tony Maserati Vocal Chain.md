---
type: chain
title: Tony Maserati Vocal Chain
reference: Tony Maserati — near-finished multi-vocal mix session (parallel vocal, BVs, lead-in-choruses, "answer" vocal); song unconfirmed
chain_type: style
family: vocals
tags: [chain, vocal, style, tony-maserati, video-derived]
video_derived: true
status: reference
---

# Tony Maserati Vocal Chain

**Reference/vibe:** not a single-voice "sound" template like the artist-tone chains elsewhere in this folder — this is an **engineer's role-based restraint discipline**, caught mid-session on a track with a lead, background vocals, a lead-in-the-choruses (background role), and an "answer" vocal. The governing idea across every stage: decide what a vocal's *job* is in a given section before deciding how much to process it. A background part gets almost nothing on purpose; the intelligibility device (parallel) gets boosted specifically where effects density threatens to bury it; a compressor gets auditioned and dropped when it isn't earning its slot; and a subtle edit problem gets solved by literally naming the missing consonant rather than re-editing blind.

**Signal source:** none documented — this is a mix-only breakdown of a session already tracked; no recording chain shown.

## Chain overview

Parallel vocal (intelligibility, automated up in dense sections) → BV chain (channel-strip compressor, auditioned against an alternative, mostly untouched) → lead-in-background-sections chain (tape-based de-ess/thin → dynamic EQ dipping attacks → light compression → parallel, unresolved) → answer-vocal punch send (saturation) → editing pass (missing-consonant diagnosis + donor-take paste, run on both BVs and lead) → a non-vocal aside (guitar synth attack reduction to blend against strings).

## Step 1 — Parallel vocal (intelligibility)

- **Purpose-check by mute test:** muting the parallel path measurably drops word intelligibility — confirms the parallel path's job is clarity, not density/aggression (contrast with the usual "add density" parallel-comp framing — see [[Parallel Processing]]).
- **EQ'd and automated UP in the bridge**, specifically because other effects are being layered on that section — the intelligibility device gets boosted *ahead of* the effects that would otherwise bury it, not after.
- Owned lane: any of the house parallel returns ([[Parallel Comp Send]]) or a plugin's own dry/wet blend ([[Pro-C 2]] dry knob).

## Step 2 — Background vocals

- **Tube-Tech-style channel strip** chosen "for a little bit more flexibility" over a plain compressor insert.
- **Compressor audition:** [[UAD Tube-Tech CL 1B mkII|CL 1B]] vs. an "R Compressor" (Waves Renaissance Compressor — owned best-match [[Pro-C 2]] / [[LALA]]). The CL 1B alone did nearly the whole job — "I'm not doing anything really, it ends up all I'm doing is using the CL 1B." → [[Compression]], [[Compression Staging]]
- Flagged issue (unresolved on camera): the BVs' *entrance* pops out a bit too much in the ear — leads directly into Step 5's edit fix.

## Step 3 — Lead vocal, background-role sections (choruses)

Deliberately minimal — "he's meant to be part of the overall background sound, so I am doing very little":

1. **Tape-based de-ess/thinning** — Studer A800 tape machine (unowned — see [[Plugin Wishlist]]), **"Pop" preset/formula**, chosen specifically to make the voice thinner while adding analog character; the de-essing is a side effect of the tape stage, not a dedicated de-esser. Owned best-match: [[Kramer Tape]], dialed toward thin/bright rather than warm/full.
2. **Dynamic EQ dipping the ATTACKS** — [[Pro-Q 4|Pro-Q 3]], a dynamic band tuned to the transient/attack energy of the voice rather than a static frequency or sibilance. Owned equivalent: [[Pro-Q 4]].
3. **Light compression** ("R Compressor" again) — framed here as a keep-him-high-in-the-mix move. Owned best-match: [[Pro-C 2]].
4. **Parallel** — routed but **not confirmed as earning its place**: "I'm not sure that's quite working at the moment, maybe we'll get rid of that." A live audit, not a settled recipe.

## Step 4 — "Answer" vocal (punch send)

- Sent to [[Decapitator]] specifically for punch, judged by direct without/with A-B, then pushed further by raising both the send level and the Decapitator's own mix.
- A send (not an insert) purely for saturation-driven punch on a secondary/call-and-response vocal line.

## Step 5 — Editing pass: missing-consonant diagnosis

- **Name the specific missing/wrong phoneme**, not just "the edit sounds off": tried "b" of *baby*, then "m" of *maybe*, landed on the actual answer — a missing **"h"** on *"hey there."*
- **Fix by donor-take paste**, run as two separate passes: copy the "h" from elsewhere in the session, paste onto the affected BV tracks (checked against the beat grid), then repeat the same fix on the lead vocal separately — fixing one part never assumed to fix the other.
- → [[Vocal Comping and Takes]] for the general technique.

## Step 6 — Non-vocal aside: blending a guitar synth against strings

- A guitar synth's attack was already "left-heavy" and fighting a late-arriving string/cello part.
- **Transient Designer-style attack reduction** (owned: [[Transient Master]] / [[Transient Shaper]]) pulled the guitar synth's attack down — the blend goal wasn't matching the parts' transients, it was decreasing one so all three (string, cello/viola, guitar synth) read as one texture instead of competing.

## Vocal arrangement

| Role | Job in the section | Processing budget |
|---|---|---|
| **Lead** | carries the lyric | the full chain |
| **Background** | fills, no attention | almost nothing, on purpose |
| **Lead-as-background** (in choruses) | supports its own lead | treated as a background part, not a lead |
| **Answer** | responds in the gaps | boosted for intelligibility where effects density would bury it |

**The move — decide the job before the processing.** The same singer's take gets a different chain depending on what it's *doing* in that section. A lead vocal demoted to a background role in the chorus gets background treatment, even though it's the same voice and the same performance.

**This is a role map, not a stack count.** It's the discipline that makes dense vocal arrangements survive: every layer knows whether it's speaking or listening. Pairs directly with the masking hierarchy in [[Masking and Carving]].

**Test:** if you can't name a layer's job in one word, it doesn't belong in that section.

## Notes / variations

- **Role before processing amount.** The single reusable idea across this whole session: ask what a vocal is *doing* in this section (lead, background, answer, intelligibility layer) before reaching for a chain — the same voice gets radically different treatment section to section.
- **A compressor audition can end in "barely anything."** Trying two options and landing on whichever one does *less* audible work is a legitimate outcome, not a wasted step.
- Not a full genre/artist "sound" template like [[Kenny Beats Vocal Chain]] or [[James Blake Vocal Chain]] — like the James Blake note, this is a single mix-session's problem-solving order, video-derived from one short clip with almost no numeric settings given.

**Source:** Mix with the Masters, [[Vocal chain with Tony Maserati]] ([watch](https://www.youtube.com/watch?v=7R0nD4nCYVU)) — captions transcript, high confidence on wording, low confidence on exact numeric settings (mostly qualitative on screen).
