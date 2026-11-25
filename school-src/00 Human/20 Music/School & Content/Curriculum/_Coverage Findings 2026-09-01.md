---
type: index
date: 2026-09-01
tags: [index, review, school, curriculum, coverage]
---

# Coverage Findings — 2026-09-01

What the Pedler, Pollack and Nick Clark imports turned up **about the school itself**. Nothing here
has been acted on: every item is a change to tested curriculum, and that is Nate's call.

Three independent agents reading three unrelated sources converged on the same gaps, which is the
reason this note exists rather than a shrug.

---

## 1. Five strands are taught but untestable

| Strand | Label | Concepts |
|---|---|---|
| `CHD` | Chords | **0** |
| `VOI` | Chord Voicings & Comping | **0** |
| `JAZ` | Jazz | **0** |
| `CPT` | Voice Leading | **0** |
| `20C` | Impressionism & Modern Colour | **0** |

They are real entries in [[School Config]]'s taxonomy and valid `strands:` values, but **no
`Curriculum/Concepts/` file starts with any of them**, so nothing can be wired to them and nothing
can be quizzed on them. `build.py` lints such a code as unknown.

For `CPT` and `20C` this is deliberate and documented — both are "deliberately light." **For `CHD`,
`VOI` and `JAZ` it does not appear to be.** [[School Config]] says VOI exists precisely because
"CHD covers whether you can *spell* a chord and nothing covered whether you can *arrange and play*
one — the actual guitar skill." That reasoning is intact; the concepts were never written.

**The strongest single argument for filling VOI** came out of Pedler ch13: 14,000 words on one
chord, whose entire point is that voicing, register and instrument doubling *are* the harmonic
content — the sonority is an ensemble effect no single instrument can play. The school currently has
no way to test any of that.

---

## 2. Six concept cards are contradicted by their own source material

Found by two agents reading Pedler independently. **No concept note was edited.**

| Concept | What it says | What the source shows |
|---|---|---|
| [[HAR-C06 — Why V–I resolves: the tritone]] | the tritone is the reason | Three independent mechanisms — leading tone, tritone contraction, root motion by fifth. **Only the second needs the 7th.** The card presents an intensifier as the cause |
| [[HAR-C07 — Secondary dominants]] | fifth-resolution treated as definitional | The real split is **functioning vs non-functioning**, and the Beatles live in the non-functioning case. The drill only trains the functioning one |
| [[HAR-C08 — Borrowed chords and modal interchange]] | "secondary dominants add pull, borrowed chords add colour" | False for the two chords that built rock harmony — ♭VII→V is a functional pre-dominant |
| [[POP-C08 — Relative-key switching]] | works "without any modulation machinery" | The same-notes property is **why a bare switch often fails to register**; the Beatles use machinery constantly |
| [[POP-C10 — Dorian IV vs Aeolian iv]] | chord-only test, either/or framing | The major IV alone is only a *suggestion* — it needs the ♮6 in the melody. And real songs switch mode line by line |
| [[BLU-C02 — Why every chord is a dominant 7th]] | asserted, no mechanism | Derivable: the tonic minor pentatonic already contains the ♭7 of I, IV **and** V |

**None of these is a factual error** — they are simplifications that the drill then tests as though
they were complete. That is a different problem from being wrong, and a cheaper one to fix.

---

## 3. Categories the school has no concept for at all

- **Diminished harmony.** Only a reference note, and it covers just the passing-chord half. The
  functional half — diminished as a dominant substitute — is missing entirely. The test is a single
  binary: *is any note of the diminished chord the leading note of what follows?*
- **Combination cadences.** [[Cadences]] and HAR-C02–C05 assume the list of four is closed. Pedler
  produces three counter-examples where two cadence types happen **simultaneously** (bass doing one
  thing, upper voices another).
- **A time-varying sonority as a harmonic event** — a chord that changes during its own duration
  through decay and harmonics. Nothing in ARR or MIX treats this.
- **Harmonic distance as geometry.** The [[The Harmonic Lattice|harmonic lattice]] models it in two
  dimensions; nothing else in the vault does. Negative harmony existed here only as a name.
- **Generative rather than derivative modes.** Every modes note in the vault rotates a parent scale.
  [[The 32 Thaats (32 Modes)|The 32 thaats]] generate from one rule — including nine modes that are
  nobody's mode of anything.

---

## 4. A data bug in the Song Library

**Seven Beatles pages have a frontmatter `key:` that contradicts the page's own `## Chords`
section**, and in six of the seven the Chords section agrees with Pollack. Verified on five:

| Page | `key:` | Its own Chords section |
|---|---|---|
| Cry Baby Cry | A major | G major |
| For You Blue | G major | D major |
| If I Needed Someone | G major | A major |
| Polythene Pam | A major | E major |
| Wait | C major | E minor |

Capo does not explain it. The Chords sections *do* distinguish played from sounding key — *"D major
… played as A shapes, capo 5"*, *"E minor as played (capo 2 → sounds in F♯m)"* — but For You Blue's
`G major` matches neither D nor A, and Wait's `C major` matches neither Em nor F♯m.

**Not fixed, because the right value depends on a convention only Nate sets:** does `key:` mean the
key it *sounds* in, or the key it is *played* in? Say which, and this is a two-minute fix.

Also worth a pass: those 41 pages have `progressions: []` empty on 29 of them.
