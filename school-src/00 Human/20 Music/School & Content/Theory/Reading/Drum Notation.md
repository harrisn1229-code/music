---
type: reference
title: Drum Notation
tags: [music, theory, notation, drums, reading, percussion]
created: 2026-08-11
source: Drums Cheat Sheet (single-page poster) — see [[Drums Cheat Sheet - Enrichment]]
---

# Drum Notation

Part of [[Music Theory]] and the percussion branch of [[Notation]]. **How a drum kit is written down** — the neutral clef, which staff position and notehead shape means which piece of the kit, the articulation marks that are the difference between four different snare sounds, and how a written bar maps onto a DAW grid.

The general symbol system (note values, rests, ties, dots, repeats, dynamics) is in [[Notation]] and [[Time Signatures & Note Values]] and is not repeated here. What follows is only what changes when the staff stops encoding pitch and starts encoding *which drum*.

---

## 1. The drum (neutral) clef

Drum parts use the **percussion / neutral clef** — two thick vertical bars (𝄥) — not treble or bass. It carries no pitch information at all. Its only job is to announce: *the vertical axis on this staff is kit position, by convention, not frequency.*

Consequences worth internalising:

- **There is no absolute standard.** The layout below is the common modern convention (and the one the vault's cheat-sheet poster uses), but charts vary — a well-engraved part prints its own key at the top. **Read the key before the notes.**
- **Ledger lines above and below are in constant use** — cymbals sit above the staff, the feet sit below it. Unlike pitched notation, that's normal here, not an extreme register.
- The horizontal axis is unchanged: time, read left to right, in the printed meter.

## 2. The drum key — 23 voices

The full key from the cheat sheet, which is as complete a kit map as a single staff supports. **Notehead shape carries as much information as staff position** — that is the part pitched readers miss.

### Cymbals and upper voices

| Voice | Notation |
|---|---|
| **China** | Circled X (⊗), ledger line above the staff |
| **Splash** | **Open diamond** notehead, above the staff |
| **Cowbell** | **Filled triangle** notehead |
| **Crash** | X on a ledger line above the staff |
| **Choked crash** | Crash X with a **staccato dot above** — grab the cymbal to stop it |
| **Closed hi-hat** | X in the top space |
| **Open hi-hat** | X with a small **open circle (o)** above |
| **Ride** | X on the top line |
| **Ride bell** | **Filled diamond** on the top line |
| **High tom** | Plain filled notehead, top space |
| **Mid tom** | Plain filled notehead, one step lower |
| **Snare** | Plain filled notehead, third space |

### Snare articulations, lower toms, feet

| Voice | Notation |
|---|---|
| **Ghost note** | Snare notehead **in parentheses** — as quiet as it will speak |
| **Snare doubles** | Snare note with **three slashes through the stem** — a *measured* double-stroke roll |
| **Snare buzz** | Snare note with a **z on the stem** — an *unmeasured* press/buzz roll |
| **Rim click (cross-stick)** | **X notehead on the snare line** |
| **Mid tom 2 / floor tom (low tom) / low tom 2** | Plain filled noteheads, descending |
| **Kick drum (right bass)** | Filled notehead, bottom space |
| **Left bass** | Filled notehead below it — second bass drum or double pedal |
| **Hi-hat closed, foot** | **X below the staff** — the left foot, not the hands |
| **Choked splash** | Circled X (⊗) below the staff |

**The three rules that follow from this table:**

1. **X = metal, round = skin.** X-heads are cymbals and cross-stick; plain noteheads are drums. A diamond means the cymbal is being struck somewhere specific (bell) or is a small/short cymbal (splash); a circled X means it's the extreme one (China, or a choked splash).
2. **The four snare articulations are four different sounds, not four velocities.** Ghost, buzz, measured doubles and rim click are separate symbols because they are separate techniques — see [[Drum Rudiments]]. Programming them as "the same sample, quieter" is the single most common way a MIDI drum part fails to read as a drummer.
3. **Hi-hat has three notations** — closed (hands), open (hands, with the `o`), and foot (X *below* the staff). A drum rack needs three destinations and a choke group, not one hat pad.

## 3. Articulation and repeat marks in drum parts

Shared with [[Notation]] and [[Dynamics & Articulations]], but these are the ones that carry the weight on a drum chart:

- **Accent (>)** — the backbeat, the fill's landing, the crash. On a drum chart accents are not expressive garnish; they are most of the groove's identity.
- **Parentheses** — ghost note. Distinct from a general dynamic marking: it is a specific stroke height.
- **Tie** — only the first note is struck. On drums this mostly appears at the tail of roll figures.
- **`o` / `+` above a hat** — open / closed. (The cheat sheet uses `o` for open; `+` for closed is the other common convention.)
- **Single-measure repeat (𝄎)** — "play the previous bar again." Drum charts lean on this harder than any other kind of part; a whole 32-bar section may be one written bar plus repeat signs.
- **Two-measure repeat** — the double-slash version, for a two-bar groove.
- **Multi-measure repeat / repeat barlines (𝄆 … 𝄇)** — the section-level version.
- **R / L under the notes** — sticking. Not optional information: the same rhythm with different sticking is a different rudiment and a different sound. See [[Drum Rudiments]].
- **Cut time (𝄵)** — appears on drum charts constantly, because the half-time/double-time distinction is read at the meter, not at the notes.

## 4. Reading a written bar as a DAW grid

The most transferable idea on the cheat-sheet poster: it prints the **same bar twice** — once notated, once as a **step grid** with kit voices down the left and 16 columns across (`1/16 · 1/8 · 3/16 · 1/4 · 5/16 · 3/8 · 7/16 · 2/4 · 9/16 · 5/8 · 11/16 · 3/4 · 13/16 · 7/8 · 15/16 · 4/4`, quarters in heavy rule). That grid is a piano roll, with the columns labelled as fractions of the bar instead of `1 e & a`.

Both directions are worth practising:

- **Chart → piano roll.** Staff position picks the drum-rack pad; horizontal position picks the step. Accents become high velocities, parentheses become low ones (a workable default: accent ~110–127, normal ~85–100, ghost ~25–45 — *general starting point*).
- **Piano roll → chart.** Writing out a programmed beat in notation is the fastest way to notice that it has no ghost notes, no open hats, and no dynamic range at all.

The two worked examples on the poster:

- **Basic beat** — hi-hat on all eight 8ths, snare on 2 and 4, kick on 1 and 3.
- **Basic fill** — four 16ths on high tom (beat 1), mid tom (beat 2), floor tom (beat 3), crash + kick together on beat 4.

> [!warning] The poster mislabels that grid's ruler as "Time Signatures"
> `1/16, 1/8, 3/16, 1/4…` are **subdivision positions within one 4/4 bar**, not time signatures. Read them as `1 e & a 2 e & a 3 e & a 4 e & a`.

## Related

[[Notation]] · [[Drum Rudiments]] · [[Time Signatures & Note Values]] · [[Dynamics & Articulations]] · [[Sight Reading]] · [[Genre Drum Patterns]] · [[Rhythm and Groove]] · [[Syncopation and Metric Displacement]] · [[Music Theory]]

## Sources

- [[Drums Cheat Sheet - Enrichment]] — the drum key, notation panel and beat/fill grids this note is built from.
