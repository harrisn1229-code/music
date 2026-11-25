---
type: technique
title: Drum Rudiments
tags: [technique, drums, rudiments, rhythm, sticking, programming]
created: 2026-08-11
source: Drums Cheat Sheet (single-page poster) — see [[Drums Cheat Sheet - Enrichment]]
---

# Drum Rudiments

**The sticking vocabulary a real drummer builds fills and grooves out of** — and, for a producer who never picks up sticks, the reason a programmed fill sounds programmed. A rudiment is a fixed pattern of which hand hits when; the *rhythm* is often unremarkable, and all the character comes from the hand order and the accents it forces.

Companion to [[Drum Notation]] (how these are written), [[Genre Drum Patterns]] (what genre plays what) and [[Rhythm and Groove]] (humanisation and ghost notes). The 18 rudiments below are the set printed on the vault's cheat-sheet poster — a working selection, **not** the full 40 PAS rudiments (the flam-drag family — flamacue, flam paradiddle, ratamacue, lesson 25 — is absent).

## The one rule the poster teaches by layout

Every rudiment on the sheet is printed **twice — once right-hand-lead, once left-hand-lead**. That's the instruction: a rudiment you can only start with your strong hand is half-learned. The programming equivalent is that a fill should not always resolve with the same hand/sample landing on the downbeat — alternate which layer lands on the accent and the repetition stops reading as a loop.

---

## The 18, by family

### Single-stroke rolls — strict alternation

| Rudiment | Sticking |
|---|---|
| **Single Stroke Roll** | `R L R L R L R L` (continuous 16ths) |
| **Single Stroke Four** | `R L R L` — a bracketed group of four landing on the next downbeat |
| **Single Stroke Seven** | `R L R L R L R` — seven strokes under one bracket, resolving on an accent |

The "four" and "seven" are **fill shapes**, not exercises: an odd-numbered burst that lands on a downbeat is how a drummer gets a fill to end where the bar does.

### Double-stroke rolls — diddles, counted by stroke total

Every one of these is *N* diddles plus a final accented single, which is why the counts are all odd.

| Rudiment | Structure | Sticking |
|---|---|---|
| **Double Stroke Roll** | continuous diddles | `R R L L R R L L …` |
| **Five Stroke Roll** | 2 diddles + 1 | `R R L L R` / `L L R R L` |
| **Seven Stroke Roll** | 3 diddles + 1 | `R R L L R R L` (and mirror) |
| **Nine Stroke Roll** | 4 diddles + 1 | `R R L L R R L L R` (and mirror) |
| **Eleven Stroke Roll** | 5 diddles + 1 | written on the sheet as four triplet-bracketed groups |
| **Thirteen Stroke Roll** | 6 diddles + 1 | `R R L L R R L L R R L L R` (and mirror) |

On the page these are usually abbreviated — a slashed notehead with the stroke count in parentheses above and a tie into the accented release, rather than every stroke drawn out. See [[Drum Notation]] §3.

### Paradiddles — the alternation-breakers

| Rudiment | Sticking | Notes |
|---|---|---|
| **Single Paradiddle** | `R L R R` / `L R L L` | Accent on note 1. The double at the end **flips the lead hand** each time through — that's the whole point |
| **Double Paradiddle** | `R L R L R R` / `L R L R L L` | Six notes — fits a triplet/shuffle feel naturally |
| **Paradiddle-Diddle** | `R L R R L L` / `L R L L R R` | Six notes, and it **does not** flip lead hand — it repeats on the same hand |

Paradiddles exist so a drummer can move accents around the kit without breaking a steady 16th-note hand motion. That is exactly the move behind a hi-hat pattern with accents that wander: the hands never stop, only the accent placement changes.

### Flams — two hands, almost together

| Rudiment | Sticking |
|---|---|
| **Flam** | `lR` / `rL` — a quiet grace note from the opposite hand immediately before the main stroke |
| **Flam Accent** | `lR L R` / `rL R L` — a flam plus two taps, written as a triplet |
| **Flam Tap** | `lR R  rL L` — a flam plus a tap on the **same** hand (a flammed diddle) |

**A flam is not two notes — it is one thicker note.** The grace note is quiet and close enough that the ear hears attack width, not a rhythm.

### Drags and grace-note figures

| Rudiment | Sticking |
|---|---|
| **Single Drag Tap** | `l l R … L` / `r r L … R` — a drag (double grace note) into an accented stroke, then a tap |
| **Double Drag Tap** | `l l R  l l R  L` / `r r L  r r L  R` — two drags then the accented tap |
| **"Sting (riff)"** | Two grace notes into a main stroke — i.e. the standard **ruff**; the poster's name for it is non-standard (see [[Drums Cheat Sheet - Enrichment]]) |

---

## Translating rudiments into MIDI

The producer-facing half of this note. Each of these is a concrete programming move, not an abstraction:

- **Flam → two hits ~10–25 ms apart, the first at roughly half the velocity of the second** *(general starting point)*. Under ~8 ms it reads as flanging/phase rather than a flam; over ~40 ms it reads as two separate notes. Nudge the grace note off-grid rather than quantising both. Pairs with [[Pocket and Microtiming]].
- **Drag / ruff → a 2-note grace burst (32nd-ish) at low velocity immediately before the accent.** The cheapest way to make a snare hit sound *played* instead of *placed*.
- **Buzz roll → a dense cluster (32nds or faster) with a velocity ramp**, not a uniform repeat. A flat-velocity roll sounds like a stutter edit — same failure mode already documented for trap hat rolls in [[Genre Drum Patterns]].
- **Measured double-stroke roll → pairs of hits where the second of each pair is quieter.** A real double stroke has a rebound; equal velocities is the tell.
- **Paradiddle sticking → alternate between two sample layers** (or two pan positions) following `R L R R`. This is the single most effective way to make a 16th-note hat line stop sounding like one sample retriggered — the "hands" become two slightly different sounds, which is physically what's happening on a real kit. → [[Width and Stereo]], [[Layering and Stacking]]
- **Ghost notes → the parenthesised strokes** in the funk/shuffle grooves on the cheat sheet, at roughly velocity 25–45 *(general starting point)*. They are the difference between a rock beat and a funk beat far more than the kick pattern is.
- **Odd-count rolls (5/7/9) as fill lengths.** Reaching a downbeat with an odd burst is why drummer fills land and grid fills float.

## Related

[[Drum Notation]] · [[Genre Drum Patterns]] · [[Rhythm and Groove]] · [[Pocket and Microtiming]] · [[Snare Design]] · [[Layering and Stacking]] · [[Syncopation and Metric Displacement]] · [[Time Signatures & Note Values]]

## Sources

- [[Drums Cheat Sheet - Enrichment]] — the 18-rudiment panel, with sticking, this note is built from.
