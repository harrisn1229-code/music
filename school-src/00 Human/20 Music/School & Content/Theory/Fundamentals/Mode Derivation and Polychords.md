---
type: reference
tags:
  - music
  - theory
  - scales
  - modes
  - chords
  - polychords
created: 2026-08-13
source: "Guitar Grimoire - Scales and Modes, book-derived (spec-161)"
---

# Mode Derivation and Polychords

Part of [[Music Theory]] → [[Scale Modes Reference]]. That page (and the [[Guitar Grimoire - Scales and Modes - Enrichment|Guitar Grimoire]] book page behind it) is the mode-by-mode **catalog** — formulas, names, compatible chords for 27 scales, looked up. This page is the **method** behind that catalog: how to derive any mode's formula from scratch by hand, how to find its parent scale by chart instead of counting, and how to build a polychord substitute for any big chord on a 6-string instrument — a reusable technique, not more data to memorize. Sourced from the book's own front-matter method section, p.1–14.

## 1. The building blocks (p.2–4)

Everything below leans on one piece of vocabulary. There are 12 equal chromatic "blocks" a half-step apart. Intervals split into two families:

- **Majors** — 2nd, 3rd, 6th, 7th
- **Perfects** — 1st (unison), 4th, 5th, 8th (octave)

Flat a major → minor. Flat a minor → diminished. Sharp a major or a perfect → augmented. Flat a perfect → diminished. There's no such thing as a diminished unison. Count blocks to name any interval directly — e.g. 4 blocks = minor 3rd = 1½ steps.

## 2. What a mode actually is (p.5–7)

A mode is the same 7 tones, renumbered from a different starting degree — no new pitches, just a new "1." The major scale's 2nd degree becomes the II mode's 1, its 3rd degree becomes the III mode's 2, and so on. Worked out against the major scale (1 2 3 4 5 6 7):

| Mode | Renumbering rule | Result |
|---|---|---|
| II (Dorian) | 2→1, 3→2, 4→3... | 1 2 ♭3 4 5 6 ♭7 |
| III (Phrygian) | 3→1, 4→2, 5→3... | 1 ♭2 ♭3 4 5 ♭6 ♭7 |
| IV (Lydian) | 4→1, 5→2, 6→3... | 1 2 3 ♯4 5 6 7 |
| V (Mixolydian) | 5→1, 6→2, 7→3... | 1 2 3 4 5 6 ♭7 |
| VI (Aeolian) | 6→1, 7→2, 1→3... | 1 2 ♭3 4 5 ♭6 ♭7 |
| VII (Locrian) | 7→1, 1→2, 2→3... | 1 ♭2 ♭3 4 ♭5 ♭6 ♭7 |

The book's own reframing is worth keeping: "there is actually only 1 scale, the Major scale and its modes. All other scales can be thought of as derived modes which also have modes" (p.6) — every one of the 27 scales in the full catalog is built by running this exact renumbering process on a different parent, not by a fundamentally different method.

## 3. The 4-step accidental system — deriving any mode by hand (p.7)

This is the actual technique for reading any mode's formula off a chart (or deriving it from nothing): compare the mode's own tones, degree by degree, against the plain major-scale pattern, and add whatever accidental the gap requires.

1. **MARK** where each tone of the mode falls, against the 12 chromatic positions.
2. **NUMBER** the tone positions 1–7.
3. **COMPARE** to the major-scale pattern at those same numbered positions.
4. **ADD** ♭ or ♯ where a tone sits one chromatic box off from the major-scale reference — or ♭♭ / 𝄪 (double-flat / double-sharp) where it sits **two** boxes off, which shows up on the book's more exotic 27-scale catalog.

Worked examples from the book (p.7):

- **Dorian**: comparing tone-by-tone to major gives 1, 2, ♭3, 4, 5, 6, ♭7 — only the 3rd and 7th need a flat.
- **Phrygian**: 1, ♭2, ♭3, 4, 5, ♭6, ♭7 — four flats needed against the major reference.
- **Enigmatic Mode III** (one of the book's exotic 27-scale-catalog modes): 1, 2, 3, ♯4, 5, ♭6, ♭7 — note the mix of a sharp *and* flats in the same mode; the 4-step system doesn't assume every accidental points the same direction, it just reports what the comparison finds.

The method generalizes past the 7 diatonic modes to any of the book's 27 scales — it's the same 4 steps whether the target is a familiar mode like Dorian or an unfamiliar one like Hungarian Minor's mode VI.

## 4. The Quick Mode Generator Chart — finding the parent scale fast (p.8)

The 4-step system derives a formula from first principles. This chart is the shortcut once you trust the math: a 3-step lookup that tells you which *already-known* major scale you're actually playing, just transposed and re-rooted.

1. Find your starting key in **column I**.
2. Find your desired mode's **Roman-numeral column**.
3. Run your finger across from the key and down from the mode column until they **meet** — that intersection is the parent major scale, transposed so its own root lands on your starting key.

Worked example from the book (p.8): **G Mixolydian** (mode V). Start at G in column I, run across to column V, and the intersection lands on **C**. That means G Mixolydian *is* C Major, fingered with the root shifted to G — same 7 notes, same fretboard shapes you already know for C Major, different tonal center. "It's as simple as 1-2-3" is the book's own summary of the chart (p.8).

Use the 4-step system (§3) when you need to *derive* a mode's formula from nothing — by ear, or on an unfamiliar scale with no chart handy. Use the Quick Mode Generator Chart (this section) when you already trust the underlying math and just need the fast answer: which familiar scale/fingering am I actually borrowing for this mode.

## 5. Building chords and the naming legend (p.9–10)

**Building any chord**: stack every other tone of the scale — 1-3-5 is a triad, 1-3-5-7 is a 7th chord. Extensions are the identical logic continued past the octave: 9th = 2nd, 11th = 4th, 13th = 6th, each one octave up.

**The chord-symbol legend** used throughout the book's charts (and reused below for the polychord formula):

| Symbol | Denotes | Change | Result | Name |
|---|---|---|---|---|
| `−` | 3rd | ♭ | ♭3 | minor |
| `+` | 5th | ♯ | ♯5 | augmented |
| `°` | 3rd, 5th | ♭ | ♭3, ♭5 | diminished |
| `△` | 7th | (unchanged) | 7 | delta (major 7th) |
| `7` | 7th | ♭ | ♭7 | dominant |
| `ø` | 3rd, 5th, 7th | ♭ | ♭3, ♭5, ♭7 | half-diminished |
| `°7` | the 7th of `ø` | extra ♭ | ♭♭7 | fully diminished 7th |

Worked example (p.10): `E♭△+♭13` reads as root E♭, major 7th (△), sharp 5th (+), flat 13th — numeric formula 1-3-♯5-7-9-11-♭13.

## 6. The polychord substitution formula: X = Y/Z (p.11–13)

Big extended/altered chords (6–7 tones) don't fit cleanly on 6 strings. The fix is to **simulate** the large chord with a smaller 3-or-4-tone chord placed over the root at the right interval, rather than trying to fret every tone.

**Formula:** `X (desired chord) = Y (3-or-4-tone chord) / Z (interval over the root)`

Worked example from the book — a `13♯11` chord, spelled in full as 1-3-5-♭7-9-♯11-13 (p.11):

- **`13♯11 = △+/♭7`** — play a delta-augmented shape (1-3-♯5-7, i.e. root-3rd-sharp5th-7th) with its own root placed at the *13♯11 chord's* ♭7. Check the math: the △+'s own 1-3-♯5-7 lands on the 13♯11 chord's ♭7-9-♯11-13 — exactly the four upper tones the big chord needs (p.11–12).
- **`13♯11 = M/9`** — the *same* chord can also be simulated with a plain major triad (1-3-5) placed over the 9th instead (p.12).
- **`13♯11 = M/2`** — and again over the 2nd, since the 2nd and 9th are the same pitch class — "the result would also be the same" (p.12).

The book's own point in giving three solutions to one chord: **there is no single correct polychord** — multiple small shapes can simulate the same big chord, and which one you reach for is a fretboard-convenience choice, not a right-answer lookup. In practice, the bass player (or an implied bass note) usually carries the root; the guitar or keyboard supplies the 3-or-4-tone chord at the chosen interval on top.

## 7. Compatibility — checking a chord against a mode (p.14)

Before assuming a chord works over a given mode, cross-check its tones directly: **if every tone the chord asks for is already a tone of the mode, it's compatible.**

Worked example from the book: over **Dorian** (1 2 ♭3 4 5 6 ♭7), both a `−7` chord (1-♭3-5-♭7) and a `−9` chord (1-♭3-5-♭7-9) check out tone-for-tone — every note either chord needs is already sitting in the Dorian scale. The **same two chords also work over Aeolian** (1 2 ♭3 4 5 ♭6 ♭7), for the identical reason. But neither works over **Locrian** (1 ♭2 ♭3 4 ♭5 ♭6 ♭7) — Locrian's own ♭5 conflicts with the perfect 5th both `−7` and `−9` require, so only `ø` (half-diminished: 1-♭3-♭5-♭7, which itself carries a ♭5 instead of a perfect 5th) survives the check.

## 8. Using this as a technique

- **Self-test the 4-step system** on an unfamiliar mode (a Guitar Grimoire exotic scale, or any mode name you don't already have memorized) before checking the printed formula — the method should reproduce the book's answer from nothing but the major-scale comparison.
- **Reach for the Quick Mode Generator Chart live**, when a chart calls for a mode you don't have memorized and there's no time to derive it: find the parent scale, play the fingerings you already know, and let your ear track the shifted root.
- **Apply X = Y/Z whenever a chart hands you a big altered/extended symbol** that doesn't sit under 6 strings cleanly — look for a smaller triad or 7th shape already under your fingers that supplies the chord's upper structure, and let the root live in the bass (or stay implied). This is the same generalized move as [[Slash Chords]] and [[Upper Structure Chords]] — a familiar small shape, relocated over an unfamiliar bass note or interval, standing in for a chord too large to voice directly.
- **Run the compatibility check (§7) before assuming a chord works over a mode**, rather than after something clashes on the bandstand — it's a fast tone-by-tone comparison, not a memorization task.

## Related

[[Scale Modes Reference]] (the mode-by-mode catalog this method builds and reads) · [[Diatonic Modes]] (the 7 major-scale modes this method's worked examples derive) · [[Guitar Grimoire - Scales and Modes - Enrichment]] (full book synopsis and scale catalog, source for every citation above) · [[Slash Chords]] · [[Upper Structure Chords]] (both share the polychord-over-a-bass-note mechanism generalized in §6 and §8) · [[Chord Substitution]] · [[Extended Chords]] · [[Altered Chords]] · [[Chords]] · [[Intervals]] (the major/perfect interval vocabulary §1 leans on) · [[Music Theory]]
