---
type: reference
tags:
  - music
  - theory
  - harmony
  - tuning
  - lattice
  - analysis
aliases:
  - Tonnetz
  - Note Lattice
  - Chord Lattice
created: 2026-09-01
source: Nick Clark, "Visualizing the Network of Musical Harmony" (Google Doc, read in full 2026-09-01) · W A Mathieu, *Harmonic Experience* · Richard Cohn, *Audacious Euphony* · Kyle Gann, *The Arithmetic of Listening* · Dmitri Tymoczko, *A Geometry of Music*
---

# The Harmonic Lattice

Part of [[Music Theory]]. A **two-dimensional map of pitch space** in which one axis is the perfect
fifth and the other is the major third. Every note, chord, scale and key becomes a **shape and a
position** rather than a name — so "how far apart are these two chords" becomes a question you can
answer by looking. Known in the literature as the **Tonnetz**, first described by Leonhard Euler in
1739.

**Why it earns a note here.** The vault already has [[Circle of Fifths]] (one axis, fifths only) and
Roman-numeral function ([[Chord Progressions]], [[Cadences]]). Both flatten something real. The
circle collapses the major third entirely; Roman numerals give one label to chords the ear treats as
two different objects. The lattice is the tool that shows the missing dimension — and it is the
**only** model in the library that does.

> The gap it fills, in one sentence: **a Roman numeral names a chord's function; the lattice names
> its location.** Two ii chords in the same key have the same function and different locations.

## The build — three primes and nothing else

The lattice is derived, not invented. It comes straight out of the harmonic series (see
[[Tuning and Temperament]]):

- Multiplying a frequency by a **prime** generates a genuinely new interval class; multiplying by a
  composite just restacks ones you already have.
- **2 → the octave** (2:1). Treated as identity — the lattice is a map of pitch *classes*.
- **3 → the perfect fifth** (3:2). This becomes the **horizontal axis**. Left = down a fifth (×2/3,
  octave-corrected to the perfect fourth, 4:3).
- **5 → the major third** (5:4). This becomes the **vertical axis**. Down = the minor sixth (8:5).
- **7 → the harmonic seventh** (7:4). A *third* axis, into depth. Usually omitted because the page
  is flat, and because equal temperament's ♭7 sits **31 cents sharp** of it.

That is the whole construction. Nick Clark's summary of the payoff is the claim the model rests on:

> "For the most part, music and harmony is just a collection of octaves, perfect fifths, major
> thirds, and sometimes minor sevenths."

**The minor third is not an axis.** It is a *move*: up a fifth, then down a major third. That single
fact is why a minor triad and a major triad are the same shape in different orientations, and it is
the first thing the lattice teaches that the keyboard hides.

### The 12-note 5-limit lattice

Extend fifths from F to D and fill in the thirds above and below, and you get exactly twelve
distinct relationships — enough to spell major, minor, all seven [[Diatonic Modes]], harmonic minor,
melodic minor and more. Their just ratios and their distance from 12-TET:

| Degree | Just ratio | Cents (JI) | vs. 12-TET |
|---|---|---|---|
| 1 | 1/1 | 0 | — |
| ♭2 | 16/15 | 112 | +12 |
| 2 | 9/8 | 204 | +4 |
| ♭3 | 6/5 | 316 | +16 |
| 3 | 5/4 | 386 | **−14** |
| 4 | 4/3 | 498 | −2 |
| ♯4 | 45/32 | 590 | −10 |
| 5 | 3/2 | 702 | +2 |
| ♭6 | 8/5 | 814 | +14 |
| 6 | 5/3 | 884 | −16 |
| ♭7 | 9/5 | 1018 | +18 |
| 7 | 15/8 | 1088 | −12 |

⚠️ **Correction to the source.** Clark's 32-modes document prints the major third as *"+14 cents"*.
It is **−14** — the just major third is 386 cents, *flat* of the tempered 400. His lattice document
states the same fact correctly the other way round ("a major third is 14 cents sharp" *in equal
temperament*), so the table is a sign slip, not a disagreement. Every other row checks out.

## Chords are shapes

Once the axes are fifths and thirds, a chord stops being a stack of intervals and becomes a
**polygon**, and chords that feel related turn out to *be* related geometrically:

- **Major triad** — an L: root, its fifth, its major third. **Minor triad** — the same L, root
  repositioned. This is the geometric statement of parallel/relative kinship.
- **maj7** — a perfect square (the 7 is simultaneously the fifth of the 3 and the third of the 5).
  That square is *why* maj7 sounds settled rather than tense; see [[Seventh Chords]].
- **C6 and Cm7 are one shape** with the root in two places. So are **sus2 and sus4** — both are
  fifths-only shapes with no third at all, which is the structural reason a sus chord is neither
  major nor minor and can stand in for either ([[Suspended Chords]]).
- **Augmented triad** — two stacked major thirds, no perfect fifth: a straight vertical line, and
  symmetrical, so C+ = E+ = G♯+ ([[Augmented Chords]]).
- **Diminished 7th** — a diagonal, symmetrical four ways ([[Diminished Chords]]).

**The important lesson is the ambiguous ones.** A dominant 7th has **at least three** valid lattice
positions, because its ♭7 can be reached three different ways — as the minor third of the 5, as two
fifths below the root, or as the 7th harmonic. Written out in cents against the root, those are
1018, 996 and 969 against 12-TET's flat 1000. The keyboard plays one key; the ear picks one reading
from context, or blurs them. That is the mechanism behind everything dominants can be made to do —
see [[Tritone Substitution]], [[Augmented Sixth Chords]], [[Altered Chords]].

Same logic, more useful: the **7♯9** ("Hendrix chord") has no reachable ♯9 anywhere near the tonic.
The note the ear actually takes is the ♭3, which sits close. Spelled honestly the chord is
**7(♭10)** — a major triad with a minor third added on top. Nobody writes it that way, and the
lattice is what shows you why they should. Cf. [[Chord Naming by Context]].

## Scales and keys are regions

Map the seven church modes and they do **not** all come out the same shape — which is the geometric
form of the point [[Diatonic Modes]] makes in words: a mode is a set of *relationships to a tonic*,
not a set of notes.

Concretely: C minor and E♭ major are not the same object. In C minor the F is heard as a fifth
*below* C; in E♭ major the same F is two fifths *above* E♭. Different position, same key on the
piano. That difference is what keeps the ear inside Lydian instead of sliding a fifth down into the
parent major — the standing problem in modal writing ([[Modal Pop]], [[Modal Jazz]]).

Two more that pay off directly:

- **Whole tone** — a straight run along the major-third axis; two augmented triads a whole step
  apart, hence only two distinct whole-tone scales.
- **Blues** — the minor pentatonic plus a note between 4 and 5 that reads better as ♭5 than ♯4 (it
  is the minor third of the ♭3 and the major third below the ♭7). More to the point, blues is where
  the **7th harmonic** actually lives: over I7–IV7–V7, the ♭3, ♭7 and 4 can each be heard as the
  harmonic seventh of one of those three roots. That is a real structural argument for why blue
  notes aren't "out of tune" — see [[Blues Scales and Blue Notes]] and
  [[BLU-C07 — Why the ♭3 isn't wrong]].

## The chord lattice, and why it wraps

Replace each vertex with the triad rooted there and you get a map of all 24 major and minor triads.
The diatonic chords of a key form a compact blob; borrowed and secondary chords sit just outside it
in predictable directions ([[Chords by Key]], [[Borrowed Chords]], [[Secondary Dominants]]).

**In equal temperament the map wraps around.** Walk off one edge and you re-enter on the other, as
Clark puts it, "like pacman" — because F♯ and G♭ are the same key. Roll it up and the lattice is a
**torus**. Only 12-TET does this; in just intonation the lattice is genuinely infinite and open.

**This wrap is the whole engine of chromatic modulation.** Enharmonic reinterpretation isn't a
notational trick, it is a teleport across the map — and the chords that can perform it are exactly
the symmetrical ones, augmented triads, fully diminished 7ths and 7sus4, because a symmetrical shape
has no single home. See [[Modulation (Key Change)]] and
[[HAR-C10 — Tonicization vs modulation]].

## The four commas — the payoff chapter

12 keys have to stand in for roughly **30-plus** just-intonation tones. The leftovers are **commas**,
and a progression can travel one without the listener noticing a thing. There are four in the
5-limit lattice:

| Comma | The mismatch | Ratio | Size |
|---|---|---|---|
| **Syntonic** (didymic) | 4 fifths ≠ major third + 2 octaves | 81:80 | 21.5¢ |
| **Pythagorean** | 12 fifths ≠ 7 octaves | 531441:524288 | 23.5¢ |
| **Great diesis** | 3 major thirds ≠ 1 octave | 128:125 | 41¢ |
| **Diaschisma** | 4 fifths + 2 major thirds ≠ 3 octaves | 2048:2025 | 19.5¢ |

**The syntonic comma is the one that matters in pop**, because it is the gap between the two ii
chords. ii is *both* the relative minor of IV *and* the minor v of V, and those are different places
on the lattice a syntonic comma apart. Same for ♭VII: the IV-of-IV, or the relative major of the
minor v. Follow a loop by common tone and you can come back to a "home" chord that is one comma from
where you started — the progression has quietly drifted and resolved anyway.

Clark's term for a deliberate enharmonic jump is a **"comma zap."** The school's vocabulary for the
same move is **enharmonic reinterpretation / enharmonic modulation** ([[Modulation (Key Change)]]);
keep "comma zap" as his handle for it, not as a replacement.

**The practical reading is a compositional one**, and it is the reason this note exists: a chord
loop is not necessarily a closed circle. It can be a *spiral*, and knowing which comma it spirals by
tells you what to do next.

## Two ways to map a progression — and they disagree

This is the most transferable idea in the source, and it generalises well past the lattice:

1. **Tonic-relative** — plot every chord at its nearest position to the original tonic. Answers
   *how far from home are we?*
2. **Common-tone / voice-leading** — plot each chord relative to the one before it. Answers *what
   path did the ear actually walk?*

They produce different pictures of the same music, and both are true. Clark links this to the jazz
distinction between **vertical and horizontal thinking** — relating everything to the key, versus
treating each chord as a temporary tonic ([[Modal Jazz]], [[Chord Substitution]]). His own position
is that a listener does some blend of the two, and that the blend is not measurable.

## Worked examples he maps

Newest-first by nothing in particular — grouped by what each one demonstrates. All of these are on
the lattice in the source with diagrams; the analysis below is the takeaway, not the picture.

**Syntonic comma (the common one)**

- **The 1975 — "Sincerity is Scary"** · D–E/E♯–F♯m–G9. The G9 is doing double duty as IV7 of D and
  as a ♭II augmented sixth of F♯ ([[Augmented Sixth Chords]]).
- **MGMT — "Lady Dada's Nightmare"** (intro) · every chord shares a common tone with the last; the
  Cmaj7 it lands on is a syntonic comma from the Cmaj7 it left.
- **Knower — "Real Nice Moment"** · a chain of maj7 chords linked by single common tones.
- **Faine Jade — "Introspection"** · plain major triads only. I–IV–V in D, the V pivots to ♭III, the
  same I–IV–V in F, and back — the cleanest demonstration on the list.
- **Bonnie Tyler — "Total Eclipse of the Heart"** · verse walks D♭ → F♭ → A♭ and the A♭ it arrives
  on is a comma from the A♭ it passed. Also the best pop demonstration of a chorus that stays close
  to home while the verse travels.

**Great diesis (three major thirds vs. an octave)**

- **MGMT — "Siberian Breaks"** (intro) · C major / A minor, then a jump to B♭m borrowed from
  parallel Phrygian, then Amaj7 that is arguably B𝄫maj7.
- **Louis Cole — "Phone"** (bridge) · climbs the major-third spine out of D♭ and lands a diesis up.
- **MGMT — "The Handshake"** (bridge) · both a diesis and a syntonic comma in eight bars.

**Pythagorean comma (rare — needs a long journey)**

- **Stevie Wonder — "They Won't Go When I Go"** (bridge) · **twelve dominant 7ths descending by
  fifth**, all the way around, arriving at an F♯m that is technically a G♭m. Clark says this is the
  only pop example he knows.

**Diaschisma**

- **MGMT — "Metanoia"** (intro) · B𝄫 to A via distant enharmonics.

**Symmetry and ambiguity**

- **Kanye West — "Violent Crimes"** · Emaj7–A7(9,13)–D♯+7(♭9)–G♯m7. The "D♯+7♭9" isn't really an
  augmented chord; whether it holds a G or an F𝄪 depends on which side of it you listen from, and
  the honest answer is that it morphs.
- **Tame Impala & Thundercat — "No More Lies"** · a piece with **two** competing tonal centres
  (B♭ and E♭) rather than one — Clark's "solar system with two suns."

**The major-third spine**

- **John Coltrane — "Giant Steps"** · the lattice respells it. Bmaj7, Gmaj7, E♭maj7, C♭maj7 and
  D♯maj7 all live in **one column** of major thirds; the tune is ii–V–I cadences orbiting a B
  augmented triad, and it begins and ends on the same lattice position. See [[The ii-V-I]],
  [[Chromatic Mediants and Pop Modulation]].
- **Liszt — "Un Sospiro"** (ending) · a ♭II chord and a Locrian ♭5 chord, then diminished-7th
  symmetry walking northwest, landing on C♯ a syntonic comma *and* a great diesis from the opening
  D♭. Clark calls it the best borrowed-from-Locrian passage he has found.
- **Schubert** · via the lattice animation in Cohn's *Audacious Euphony* — three different flavours
  of dominant-7th/augmented-sixth in one excerpt.

Also mapped but not detailed: **Michael Jackson — "Stranger in Moscow"**, **Louis Cole —
"Disappear"**.

## What the lattice adds, and where it stops

**Adds**

- A visual account of harmonic *distance* that the [[Circle of Fifths]] cannot give, because the
  circle has no third axis.
- A reason why symmetrical chords modulate so freely — they have no unique address.
- A geometric definition of **negative harmony**: reflect a shape across an axis. That is all it is.
- The best available picture of **tonal gravity** — pull toward a tonic along several independent
  routes at once, rather than one ranked list of "closest notes."
- A nice piece of arithmetic on the tritone: the arithmetic mean of an octave is the perfect fifth,
  the harmonic mean is the perfect fourth, and the **geometric mean is √2 — the tempered tritone**.
  This is where *meantone* temperament got its name. And in 12-TET the tritone is simultaneously the
  largest melodic gap and the largest leap on the 5-limit lattice.

**Stops**

- **Melody and stepwise motion** are better read on a keyboard or fretboard; the lattice scatters
  them.
- **Whole-step root motion is genuinely ambiguous on it** — melodically adjacent, harmonically no
  common tones, and could be a move left *or* right.
- Every mapping is a **guess about perception**, not a measurement. Clark says so repeatedly, and it
  is the honest frame: two listeners can hear the same bars in two irreconcilable ways, and neither
  is wrong.
- His own closing warning is worth keeping verbatim, because it applies to every analytical tool in
  this library:

> "It can be easy to form a habit of composing music with your mind and your eyes, and neglect
> creating music with your ear and your heart."

## Reading his notation

His documents use conventions that are **not** this school's. Translate when quoting; the school's
vocabulary wins in concept-facing notes.

| His | This vault | Note |
|---|---|---|
| `II-`, `VI-7` | `ii`, `vi7` | Uppercase-plus-hyphen for minor. Vault uses lowercase Roman numerals |
| `∆7` | `maj7` | |
| `SubV/I` | tritone substitute | [[Tritone Substitution]] |
| "comma zap", "zapping", "portals" | enharmonic reinterpretation | [[Modulation (Key Change)]] |
| "spine / axis of major thirds" | major-third (chromatic-mediant) axis | [[Chromatic Mediants and Pop Modulation]] |
| "barbershop seventh" | harmonic seventh (7:4) | Both are in use; "harmonic seventh" is the general term |
| "note lattice" | harmonic lattice / Tonnetz | |

## Related

[[Music Theory]] · [[Circle of Fifths]] · [[Tuning and Temperament]] · [[Intervals]] ·
[[The 32 Thaats (32 Modes)]] · [[Diatonic Modes]] · [[Chromatic Mediants and Pop Modulation]] ·
[[Modulation (Key Change)]] · [[Augmented Sixth Chords]] · [[Chord Naming by Context]] ·
[[Blues Scales and Blue Notes]] · [[Nick Clark — Music Theory Documents]]

## Sources

- **Nick Clark, "Visualizing the Network of Musical Harmony"** — the document this note is drawn
  from. Read complete on 2026-09-01 (about 101,000 characters of text). **Its ~60 lattice diagrams
  did not come through the text extraction**, so the geometry above is reconstructed from his prose
  and verified against the ratio arithmetic; go to the original for the pictures, which are most of
  its value.
- W A Mathieu, *Harmonic Experience* — where he first met the lattice, and the deepest treatment.
- Richard Cohn, *Audacious Euphony* — chromatic harmony via triadic geometry.
- Kyle Gann, *The Arithmetic of Listening* — tuning theory and the comma arithmetic.
- Dmitri Tymoczko, *A Geometry of Music* — the academic version of the same instinct.
