---
type: reference
tags:
  - music
  - theory
  - harmony
  - 20th-century
created: 2026-08-01
source: Toby W. Rush, Music Theory for Musicians and Normal People
swept: 2026-08-01
---

# Set Theory (Pitch-Class Sets)

Part of [[Music Theory]] → [[Twelve-Tone & Serialism]]. Roman-numeral analysis works great for tertial tonal harmony, but breaks down for atonal/[[Twelve-Tone & Serialism|serial]] music where chords aren't built from stacked 3rds and don't have functional roots. **Set theory** analyzes ANY combination of notes by their raw interval content instead.

## Pitch-class set
Convert pitches to integers (**C = 0**, chromatically up through 11), strip duplicates and ignore octave (enharmonics and octaves don't matter), list what's left in brackets: e.g. `[1,2,8]`.

## Inversion
Flip a set upside-down mathematically: subtract each non-zero member from 12. `[1,2,8]` inverts to `[11,10,4]` → reduced/reordered, `[4,10,11]`.

## Normal form
The **most compact** ordering of a set — the rotation with the smallest total span, found by testing each rotation around a 12-pitch circle and picking the one that "wraps" the tightest.

## Prime form
Take the **more compact** of (a) the set's own normal form, or (b) its inversion's normal form, then **transpose it to start on 0**. This is the canonical label for "what interval content does this set have" — independent of the actual pitches used, analogous to how a chord *symbol* is independent of which inversion is voiced.

## Hanson analysis
Howard Hanson's system: order the six basic interval types from consonance to dissonance — **P** (perfect 4th/5th), **M** (major 3rd/minor 6th), **N** (major 2nd/minor 7th), **S** (minor 3rd/major 6th), **D** (minor 2nd/major 7th), **T** (tritone) — then list which appear in a set, with superscripts for duplicates. Example: `[0,3,4,7]` = **PM²N²D**.

## Interval vector
A 6-slot count of how many of each interval class a set contains, in the fixed order **(m2/M7, M2/m7, m3/M6, M3/m6, P4/P5, tritone)**. Example: `[0,1,2,6]` → interval vector `(100011)`.

## Forte numbers
**Allen Forte** catalogued every possible prime form with a unique ID (e.g. "**3-5**" — 3 notes, 5th unique 3-note prime form in his catalog). Sets that share an interval vector but have *different* prime forms get a **"Z"** suffix — e.g. **4-Z15** and **4-Z29** are both 4-note "all-interval tetrachords" sharing interval vector `(1,1,1,1,1,1)` despite being distinct sets.

## Related
- [[Twelve-Tone & Serialism]] — the compositional technique this analytical toolkit is built to describe.
- [[Intervals]] · [[Chords]] · [[Music Theory]]

## From videos

- **Pitch-class sets, inversion, normal form, prime form, Hanson analysis, interval vectors, and Forte numbers — the full atonal-analysis toolkit** — full breakdown above, worked with the concrete example set [0,1,6] throughout (Forte number 3-5, Hanson PDT, interval vector (100011)). → [[Twelve-Tone & Serialism]] — Toby W. Rush, [[Music Theory for Musicians and Normal People - Enrichment|Music Theory for Musicians and Normal People]], p.59–60
