---
type: plugin
title: "Melodyne"
category: Pitch/Vocal
vendor: "Celemony"
tags: [plugin]
depth_linked: true
owned: false
owned_source: user-declared (Nate 2026-07-21 — not owned)
owned_checked: 2026-07-21
params_enriched: 2026-07-18
video_enriched: true
---

# Melodyne

![[Images/Melodyne.png]]

**Category:** Pitch/Vocal
**Vendor:** Celemony

## What it is

Celemony's audio-to-MIDI pitch and time editor, using DNA (Direct Note Access) technology to isolate and edit individual notes within polyphonic and monophonic audio.

## What it's used for

Deep pitch and timing correction on vocals and instruments — far more surgical than real-time pitch correction, plus note-level formant, vibrato, and timing edits.

## FX chain notes

Used offline/pre-mix as a corrective editing pass, typically before the vocal chain's EQ, compression, and de-essing.

## Techniques

- **Switch off Polyphonic detection specifically to make manual note-dragging easier, then move a whole detected note by hand as a creative sound-design edit, not a correction — and accept some loss of the note's original character as part of the result.** Building a metallic texture layer, the algorithm gets switched away from polyphonic ("it's trying to go polyphonic, but it's much easier to manipulate this stage in") before dragging a whole detected note (read as starting around F3, target A2) down by hand; some of the original note's detail gets lost in the drag and is deliberately kept rather than undone — "I start losing some of the note on this one, right here... at this point it's just kind of, you're just kind of being creative and designing however you want it." *(qualitative — thin, demonstrative transcript; no exact semitone value confirmed)* → [[Layering and Stacking]] — Shawn Everett (Mix with the Masters), [[Digital Audio Manipulation with Shawn Everett]]
- **Resynthesize mode used deliberately for its "digital and futuristic" character, not for pitch correction.** "We used Melodyne a lot, so of course it's a tool made to fix vocals tuning and everything. And we used the Resynthesize part of the plugin. And what we love about it is that it gives things like a very digital and futuristic texture. And we wanted things to sound a bit unnatural on this record. Not unnatural, but supernatural." Justice run vocals, synths, and pianos through Resynthesize specifically for the artifact character it introduces — a corrective tool repurposed as a texture/sound-design source. → [[Pitch and Formant]] — Justice x Kevin Parker (Mix with the Masters), [Behind the Track｜'Neverender' by Justice & Tame Impala](https://www.youtube.com/watch?v=emP9EWcqss4)

## Used in my chains

My **surgical pitch/time editor** (an offline/print tool, not a live chain slot) — done *before* the vocal chain, since no plugin fixes a sloppy comp:

- **Vocal prep** ([[1 Main Vocal Track|Main Vocal Track]] and all vocal chains) — manual pitch surgery to a level [[Auto-Tune Pro]] can't do (Melodyne-level note-by-note), before the chain runs.
- **[[1 Ensemble Stack Track|Ensemble Stack Track]]** — its **time tool** as the manual fallback when [[VocAlign Project 5 AU|VocAlign]] stalls: warp each take's transients to the reference guide.

## Key Parameters

Note-object based — you edit detected notes, not knobs:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Pitch (per note) | Moves a note's center pitch to the target | Correct only the sour notes by hand — leave the good ones for a human result | — |
| ② | Pitch Modulation | Scales the note's vibrato/wobble depth | Reduce on an over-wobbly note; keep some so it doesn't sound frozen | — |
| ③ | Pitch Drift | Straightens intra-note pitch drift (attack/release scoops) | Tame a drifting sustain without killing the natural scoop into the note | — |
| ④ | Timing (Time tool) | Moves/warps a note's position and length | Nudge late/early notes to the grid; warp a dub's transients to a guide take | — |
| ⑤ | Formant | Shifts formants independently of pitch | Fix chipmunk/monster artifacts after a big pitch move | — |
| ⑥ | Amplitude | Per-note level | Even out a phrase by hand before compression (editing = gain-staging) | — |
| ⑦ | Note Separation | Redefines where notes start/split | Fix mis-detected slurs/runs so pitch edits land on the right note | — |
| ⑧ | Algorithm (Melodic / Percussive / Polyphonic) | Detection mode for the material | Melodic for vocals/mono lines; Polyphonic (DNA) for chords/guitars | — |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
