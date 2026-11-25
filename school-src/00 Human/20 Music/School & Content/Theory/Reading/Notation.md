---
type: reference
tags: [music, theory, notation, reading]
created: 2026-07-19
source: Toby W. Rush, *Music Theory for Musicians and Normal People* p.3–4 · William Leavitt, *A Modern Method for Guitar* Vol.1 p.3–24 · https://www.rpmseattle.com/of_note/clefs-for-music-notation/ · https://www.readmusicmethod.com/landmarks-on-the-staff
swept: 2026-07-19
updated: 2026-08-03
---

# Notation

Part of [[Music Theory]]. **How written music encodes pitch and time** — the symbol system itself. The *skill* of turning those symbols into sound in real time is [[Sight Reading]]; the guitar-specific half of it is [[Reading Notation on Guitar]]; the clef most guitarists never learn is [[Reading Bass Clef]]; the clef that encodes no pitch at all is [[Drum Notation]].

![[IMG_5762 1.jpeg]]

---

## 1. The staff

Five lines and four spaces, read left to right. Vertical position = pitch, horizontal position = time. **Bar lines** divide it into **measures**; a **double bar line** ends a section, and a **final bar line** (thin + thick) ends the piece.

Moving up one line-or-space = up one letter name. The staff is a graph, not a list — that is the whole trick, and it is why fluent readers see *intervals and shapes*, not individual note names.

## 2. Clefs

A clef fixes one specific line to one specific pitch; everything else follows from it. All four stay fixed relative to **middle C**.

| Clef | Fixes | Used by |
|---|---|---|
| **Treble (G)** | The spiral curls around **line 2 = G above middle C** | Guitar, violin, flute, right hand of piano, most vocal parts |
| **Bass (F)** | The two dots straddle **line 4 = F below middle C** | Bass, cello, trombone, left hand of piano — see [[Reading Bass Clef]] |
| **Alto (C)** | The centre points at **line 3 = middle C** | Viola |
| **Tenor (C)** | Same C-clef, moved so **line 4 = middle C** | Upper-register cello, bassoon, trombone |

**The C-clefs are movable by design.** Alto and tenor are the same symbol at different heights — which is the clearest demonstration that a clef is a *pointer*, not a fixed alphabet.

> **Guitar reads at sounding pitch minus an octave.** Guitar is a transposing instrument: written notes sound **one octave lower** than printed. Some engravers mark this with a small **8 under the treble clef** (`8vb` clef), but modern scores usually omit it and assume you know. Same for bass guitar in bass clef. Detail in [[Reading Notation on Guitar]].

### Landmark notes — the fast way in

Do not memorise all nine positions per clef. Learn **three anchors per clef** and count one or two steps from the nearest one. This is the standard pedagogy across method books and is materially faster than mnemonic sentences, because it scales to ledger lines instead of breaking at them.

| | Anchors |
|---|---|
| **Treble** | Middle C (1 ledger below) · **G** on line 2 · high C (3rd space) |
| **Bass** | Middle C (1 ledger above) · **F** on line 4 · low G (line 1) |

Mnemonics still work as a backstop — treble lines **E G B D F**, treble spaces spell **FACE**; bass lines **G B D F A**, bass spaces **A C E G**.

## 3. Ledger lines

Short lines extending the staff for notes above or below it. They continue the same alternating line/space pattern — the staff simply keeps going, invisibly.

**Ledger lines are where most readers stall**, because the anchor is far away and they revert to counting from the top line every time. The fix is more anchors (middle C above the bass staff, middle C below the treble staff), not more counting.

**Octave signs** avoid stacks of ledger lines: `8va` = play an octave higher than written, `8vb` = an octave lower, `15ma` = two octaves higher. The dotted bracket shows how far the instruction runs; `loco` cancels it.

## 4. Accidentals and key signatures

| Sign | Effect |
|---|---|
| ♯ sharp | Raise a half step — **one fret** |
| ♭ flat | Lower a half step — one fret |
| ♮ natural | Cancel a previous sharp or flat |
| 𝄪 double sharp | Raise a whole step |
| 𝄫 double flat | Lower a whole step |

**The scope rules, which are the actual content of this section:**

- A sharp or flat in the **key signature** applies for the **whole piece**, in every octave, until the key signature changes.
- An accidental *not* in the key signature applies **only for the rest of that measure**, and **only on that exact line or space** — not the same letter in another octave.
- **The bar line cancels it.** A natural at the start of the next measure is a *courtesy* accidental — technically redundant, printed to stop you second-guessing.
- A natural cancelling a key-signature sharp or flat is likewise good only to the end of the measure.
- A tie carries an accidental across the bar line for that one held note.

**Enharmonic** = same pitch, different spelling (F♯ = G♭, B♯ = C, F♭ = E). The spelling is not arbitrary — it encodes function. See [[Key Signatures]] and [[Chord Naming by Context]].

## 5. Rhythm notation

Each value is exactly **half** the one before:

**double whole → whole → half → quarter → eighth → 16th → 32nd → 64th → 128th**

(128th notes are vanishingly rare in practice — the textbook example is the intro of Beethoven's "Pathétique" Sonata, Op. 13, 1st mvt.) Each value has a matching **rest**; rests are proportional to each other the same way. Eighths and shorter carry **flags** when alone and **beams** when grouped; beaming is not decorative — it groups notes into beats, and correct beaming is half of what makes a rhythm readable at a glance.

- **Slash/tremolo shorthand** — a diagonal slash through a stem (or below a stemless note) reads one of two ways depending on context: a literal **tremolo** (rapidly repeat the note), or a notational shorthand for **smaller embedded values** — e.g. a half note with two slashes means "eighth notes in the space of a half note." The mark alone doesn't disambiguate; the surrounding context does. — [[The Elements of Rhythm - Sound, Symbol, and Time - Enrichment|The Elements of Rhythm]], p.12
- **Augmentation dot — three interpretations, not just one:**
  1. **Addition reading** (the one most players know): adds **half the note's own value**. A second dot adds half of *the first dot's addition*, not half the original again (double-dotted half = 2 + 1 + ½ = 3½ beats).
  2. **Divides into three non-dotted values** — a dotted half → three quarter notes.
  3. **Divides into two smaller dotted values** — a dotted half → two dotted quarter notes.
  Reading (2) — that a dotted value's natural division is into **three** — is the specific fact that makes compound meter make sense: a compound pulse is written as a dotted note precisely because dotted values divide in threes. See [[Time Signatures & Note Values#The Time Signature Table — a method for graphing any meter|the Time Signature Table]] for how this plays out in practice. — [[The Elements of Rhythm - Sound, Symbol, and Time - Enrichment|The Elements of Rhythm]], p.12–13, 18
- **Tie** — joins two noteheads of the **same pitch** into one sustained sound, most often across a bar line when a duration exceeds what a measure can hold. **Only the first is attacked.** For three or more, tie between each adjacent pair; never draw one long tie spanning several noteheads.
- **Slur** — a curved line connecting *different* pitches, telling the performer to play them fluidly connected (no re-articulation for winds/voice, one bow stroke for strings, legato for piano; on guitar, hammer-on/pull-off). Drawn connecting **noteheads, not stems** — the standard student mistake is drawing it stem-to-stem; the one exception is a slur crossing a passage where stems change direction.
- **Phrase marking** — visually a slur (a curved line), but a different job: marks off a **complete musical idea/statement**, drawn above the staff, and carries no articulation instruction of its own. A slur can sit nested inside a phrase marking without conflict — don't conflate the two just because they look identical.
- **Tuplets** ("artificial division") — a bracketed number divides a beat against the prevailing meter: **triplet** = a compound (3-part) division inserted into a simple-meter beat; **duplet** = the mirror image, a simple (2-part) division inserted into a compound-meter beat. A **super-triplet** (or other larger tuplet) is the same device spanning multiple beats instead of one. Full treatment: [[Time Signatures & Note Values#Tuplets (artificial division)|Tuplets]].

**Rests are read, not skipped.** Whole rest hangs below line 4 and means "the whole measure" in any meter; half rest sits on top of line 3. The rhythm-first principle: when reading breaks down, it is almost always rhythm rather than pitch — see [[Sight Reading]].

## 5b. Measures, repeats, and roadmap signs

- **Measure / bar line** — a measure is the beat-grouping bounded by bar lines, per the active time signature. A **double bar line** marks a sectional division; a **final bar line** (thin+thick) ends the piece. Bar lines and measures are a Baroque-era (~1600) innovation, not original to Western notation — Renaissance mensural notation had neither, using proportional durations instead.
- **Repeats and endings** — a repeat sign covers a measure, group of measures, or full section. **First/second endings** (volta brackets) let a repeated passage conclude differently on the repeat. **Multiple endings with an iteration count** — jazz/vernacular charts often write the repeat count directly above the passage ("3x's") instead of stacking bracket numbers.
- **Roadmap terms, precisely**: **Da Capo (D.C.)** = "from the head," return to the beginning. **Dal Segno (D.S.)** = "from the sign," return to the 𝄋 segno symbol. **…al Fine** = "to the finish," almost always paired with D.C. — ends the piece at the word *Fine*. **…al Coda** = "to the tail," almost always paired with D.S. — jumps to a separate closing Coda section. Read the roadmap before playing — see §7 below for the symbol table. — [[The Elements of Rhythm - Sound, Symbol, and Time - Enrichment|The Elements of Rhythm]], p.32–39

## 6. Meter, expression, transposition

Deliberately not duplicated here:

- **[[Time Signatures & Note Values]]** — time signatures, beat units, simple vs compound, complex meter
- **[[Dynamics & Articulations]]** — the volume and articulation glossary (*p / f / cresc. / dim.*, staccato, accent, tenuto, fermata)
- **[[Transposing Instruments]]** — written vs sounding pitch on non-concert instruments

## 7. Navigation signs

The part of notation that has nothing to do with pitch and stops a reader dead when unfamiliar. Charts and lead sheets lean on these heavily.

| Sign | Means |
|---|---|
| `𝄆 … 𝄇` repeat bars | Play the enclosed section twice |
| **1st / 2nd endings** (volta brackets) | Take bracket 1 the first time, skip to bracket 2 on the repeat |
| **D.C.** (*da capo*) | Go back to the beginning |
| **D.S.** (*dal segno*) | Go back to the sign 𝄋 |
| **al Fine** | …and stop at the word *Fine* |
| **al Coda / To Coda ⊕** | …then jump to the Coda section |
| **Coda ⊕** | The tail section jumped to |
| **Simile / %** | Repeat the previous measure (or two) as written |

Read the roadmap *before* playing a chart. Working out a D.S. al Coda mid-performance is the single most common way a competent reader gets lost.

## 8. Reading conventions worth knowing

- **Stems** point up below the middle line, down above it; on the middle line, either (follow the neighbours). In two-voice writing, upper voice always stems up, lower always down — that is how you tell the parts apart.
- **The order at the start of a system** is always: clef → key signature → time signature. A key change mid-piece prints the new signature after a double bar.
- **Score order** in an ensemble is top to bottom by family, and it does not change between systems — find your line once.
- **Chord symbols sit above the staff; lyrics below.** Fingerings, position marks and string indications sit closest to the notes.

---

## From videos

- **Solfège as a full national naming-convention alternative to the A–G letter system, not just an ear-training tool.** Most of continental Europe, Latin America, French-speaking Canada, Arabic/Persian-speaking regions, and many Asian countries name pitches Do–Re–Mi–Fa–Sol–La–Ti as their default system (1:1 with C–D–E–F–G–A–B, including modifier words for sharps/flats), while only English and Dutch-speaking countries use the alphabetical letters — worth knowing before assuming a foreign-language theory source or chord chart is using an unfamiliar system rather than just different syllables for the same notes. → [[US vs UK music theory EXPLAINED]] — David Bennett Music Theory, [[Most countries don't use ABCDEFG for music notes (Solfege explained)]]
- **Where the ♭/♮/♯ symbols actually come from, and why German-tradition countries name B natural "H."** 9th-century Gregorian chant notation used two written forms of the note B to avoid an "undesirable" tritone against F: **B durum** ("hard B," our B natural), written as a squared/Gothic ("black letter") symbol, and **B molle** ("soft B," our B♭), written as a rounded Latin-style symbol — the direct ancestors of ♮ and ♭ respectively (♯ is most likely an adapted form of the same squared symbol). Leading theory for the German "H": the squared hard-B symbol visually resembled the letter H (and/or H stood for "hart," German for hard), freeing the letter "B" to be reassigned to what English calls B♭ — two independently-workable solutions to the same naming problem, which is why English (B/B-flat) and German-tradition (B/H) systems still diverge. **Payoff**: only the German naming lets B♭-A-C-B natural spell B-A-C-H — J.S. Bach used exactly that 4-note motif to encode his own name in several works, a device impossible under English naming. → [[US vs UK music theory EXPLAINED]] (the parallel UK/US note-naming dialect page) — David Bennett Music Theory, [Why does Germany have an H note?](https://www.youtube.com/watch?v=hlafE9fm4_g)

## Where this is taught in the vault

| Source | Covers |
|---|---|
| [[A Modern Method for Guitar - Enrichment]] | Pages 3–24 — staff, clef, note values, first position, sharps/flats, eighth notes, rests/ties/dots, all on guitar, taught through repertoire |
| [[Music Theory for Musicians and Normal People - Enrichment]] | Toby Rush's one-page-per-concept treatment — the source of §1 and §5 |
| [[The Elements of Rhythm - Sound, Symbol, and Time - Enrichment|The Elements of Rhythm]] | Ch.1 of a college theory text — durational-value proportions/dotting/tremolo shorthand, measures/repeats/D.C./D.S./al Fine/al Coda, slur-vs-phrase-marking-vs-tie disambiguation, tuplets — the source of §5 and §5b |
| [[Reading Notation on Guitar]] | The guitar-specific half: octave transposition, one pitch in five places, tab vs standard, chord frames, slash notation |
| [[Reading Bass Clef]] | The clef guitarists skip and pianists need |
| [[Drum Notation]] | The percussion/neutral clef: staff position = kit piece, notehead shape = articulation; the 23-voice drum key and the chart↔piano-roll translation |
| [[Sight Reading]] | The skill, the practice method, and the `theory` practice-lane plans |

## Related

*Video: [[How to Read Sheet Music — The BIGGEST Mistake Everyone Makes Part 4]]*


[[Music Theory]] · [[Notes & Pitches]] · [[Key Signatures]] · [[Intervals]] · [[Time Signatures & Note Values]] · [[Dynamics & Articulations]] · [[Transposing Instruments]] · [[Guitar Positions]] · [[Drum Notation]]
