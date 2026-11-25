---
type: school-course
course_id: "29"
domain: theory
strands: [CHD]
class: "[[Class 1 — Music Fundamentals]]"
depends_on: ["01"]
target_pct: 80
lessons: 4
concepts: 13
---

# Course 29 — Chord Vocabulary

Teaches how to **spell** a chord, and how the naming system that spells it actually works. One rule builds the whole vocabulary; the rest of the course is what happens at the edges of that rule — extensions, removals, alterations, symmetry, and the point where a name stops being a fact and becomes a choice.

**What it assumes**

- [[Course 01 — Derivation Rules]] — chord spelling is interval arithmetic. Major and minor thirds have to be automatic before stacking them means anything. Function is *not* a prerequisite; this course is the vocabulary, [[Course 02 — Chord Function]] is the grammar, and they can run in either order.

| Lesson | Title | Concepts | Test |
|-----|---|---|---|
| 1 | Stacked Thirds, and Why the System Generalises | 3 | [[Course 29 — Lesson 1 Test]] |
| 2 | Sevenths and Extensions | 3 | [[Course 29 — Lesson 2 Test]] |
| 3 | Alteration and Colour | 4 | [[Course 29 — Lesson 3 Test]] |
| 4 | Naming, Inversion and the Slash | 3 | [[Course 29 — Lesson 4 Test]] |

**What this unlocks**

- [[Course 30 — Voicings & Comping]] — the other half of the same skill. This course is whether you can spell a chord; that one is whether you can arrange and play it.
- [[Course 31 — Jazz Harmony]] — substitution, tritone subs and reharmonisation are all operations on chord *names*, and none of them is teachable before the names are secure.
- Practically: reading a chart without stalling on a symbol you don't recognise, and writing down a chord you found by ear instead of losing it.

> [!info] Taught from zero
> No prior knowledge assumed and nothing skipped. Some of it will be revision, which is the cheaper error. Run `/school test 29 1` early if a lesson turns out to be known.

## The lessons

### Lesson 1 — Stacked Thirds, and Why the System Generalises

**Read**
- [ ] [[Chords]] → *Triads (3 notes)*, *Beyond thirds: non-tertial harmony*
- [ ] [[Chord Classification from 2 to 12 Notes]] → *The count*

**The material**
- One rule builds the entire vocabulary: [[CHD-C01 — Chords are stacked thirds|stack thirds from the root]]. Skip a scale degree, take the next one, repeat.
- Two thirds is a triad, three is a seventh chord, and continuing gives the 9th, 11th and 13th. The name for the system is **tertian** harmony, and it is the common-practice default rather than a law of nature.
- [[CHD-C02 — Triad quality is the order of the two thirds|Quality is the order of the two thirds]], not a fact to memorise per chord: M3+m3 major, m3+M3 minor, m3+m3 diminished, M3+M3 augmented — in half steps 4+3, 3+4, 3+3, 4+4.
- **Only the middle note separates major from minor.** Raise it a half step and the chord flips, which is the cheapest mood change available and the reason the 3rd is the quality tone. The 5th is what decides diminished against augmented.
- The two symmetrical orders — 3+3 and 4+4 — are the two chords that cause trouble in Lesson 3. Everything else in the system has an unambiguous root; those two do not.
- The rule also has an edge, and knowing where it sits matters: [[CHD-C03 — Stack something other than thirds and the naming system stops|stack something other than thirds and the names stop working]].
- **Secundal** stacks 2nds and gives tone clusters, which are timbral rather than harmonic. **Quartal** stacks 4ths. **Quintal** stacks 5ths and respells as the same notes as quartal, so it is not a separate system.
- Quartal harmony does not fit the tertian naming convention at all, which is why standard symbols keep mislabelling it as sus4. A chord name is a construct, and harmony happens whether or not a stack has an agreed label.
- The catalogue is finite, which is the reassuring part: from one root inside an octave there are 11 dyads, 19 triads, 43 tetrads and 66 pentads. The system generalises; it does not sprawl.

**Concepts**
- [[CHD-C01 — Chords are stacked thirds]]
- [[CHD-C02 — Triad quality is the order of the two thirds]]
- [[CHD-C03 — Stack something other than thirds and the naming system stops]]

**Homework**
- [ ] **Review** — from C, stack thirds up to a 13th and name the chord at every stage. Then build all four triad qualities from the same root and say which single note moved each time.
- [ ] **Apply** (~15 min) — play a minor triad on guitar or piano, raise only the middle note to hear major, then move only the 5th to reach diminished and augmented. Finish by playing a quartal voicing and trying to name it with a standard symbol.
- [ ] **Test** — [[Course 29 — Lesson 1 Test]]

### Lesson 2 — Sevenths and Extensions

**Read**
- [ ] [[Seventh Chords]] → *The three you'll use constantly*, *The rest of the family*
- [ ] [[Extended Chords]] → *The dominant series (built on C7)*, *What to actually play (standard omissions)*
- [ ] [[Upper Structure Chords]] → *The idea*, *The six bass-note options*

**The material**
- One more third on top of the triad, and [[CHD-C04 — The four seventh qualities|four qualities fall out of a two-by-two grid]] — {major or minor triad} × {♭7 or natural 7}.
- maj7 (1 3 5 7), dominant 7 (1 3 5 ♭7), minor 7 (1 ♭3 5 ♭7), minor-major 7 (1 ♭3 5 7). Two more sit on the diminished triad: half-diminished m7♭5 (1 ♭3 ♭5 ♭7) and diminished 7 (1 ♭3 ♭5 ♭♭7), which differ only in the seventh.
- **The diatonic placement is the part worth memorising.** Dominant 7 occurs on exactly one degree of a major key and half-diminished on exactly one, so either chord spotted out of context names its parent key. A bare maj7 is ambiguous, a bare m7 worse.
- Keep stacking and you reach 9, 11 and 13 — but [[CHD-C05 — 9, 11 and 13 need a complete structure underneath|an extension name needs a complete structure underneath it]].
- "9 = 2, 11 = 4, 13 = 6, an octave up" is usually true and is not the rule. The rule is a role test: full triad present → the 2 becomes a 9; full seventh chord present → the 6 becomes a 13. Pull the lower tone and the name reverts, whatever octave it is voiced in.
- Cadd9 against Csus2 is that one fact — is the 3rd there. And Cmaj7♯11 is never called ♯4, because it sits on a complete seventh chord.
- **What you play is smaller than what you spell.** Drop the 5th on a 9th chord, the 3rd on an 11th because it clashes with the 11, and the 5th, 9th and especially the 11th on a 13th.
- Then the move that turns three shapes into a vocabulary: [[CHD-C06 — Upper structures: a chord over a foreign bass|an upper structure is a chord over a bass note that is not its own]].
- If that bass note is already in the upper chord you have an inversion and nothing new. If it isn't, the composite gets its own name, its own function and its own resolution. Home position is the ♭6 of a major key.
- The same E minor triad over six different bass notes reads as a ♭6 major 7♯11, a ♭7 dominant 13, a iv minor 6/9, an altered dominant, and two rarer suspended-dominant colours. One shape, six chords.

**Concepts**
- [[CHD-C04 — The four seventh qualities]]
- [[CHD-C05 — 9, 11 and 13 need a complete structure underneath]]
- [[CHD-C06 — Upper structures: a chord over a foreign bass]]

**Homework**
- [ ] **Review** — spell all six seventh qualities from C. Then voice C9, Cadd9 and Csus2 and say which note is missing from each.
- [ ] **Apply** (~15 min) — take a diatonic triad loop in Ableton and convert every chord to its diatonic seventh, then thin each voicing by the omission rules and A/B it against the full stack.
- [ ] **Test** — [[Course 29 — Lesson 2 Test]]

### Lesson 3 — Alteration and Colour

**Read**
- [ ] [[Altered Chords]] → *Single alterations*, *Usage*
- [ ] [[Suspended Chords]] → *Types*, *How sus4 chords get used (three patterns)*
- [ ] [[Add Chords]]
- [ ] [[Sixth Chords]]
- [ ] [[Augmented Chords]] → *Usage — transition/passing chords*
- [ ] [[Diminished Chords]] → *Where they live diatonically*, *Usage — passing chords*

**The material**
- Three operations get lumped together as "colour" and they are not the same thing. [[CHD-C07 — Sus removes, add adds — neither is an alteration|Sus removes and add adds]] — neither one alters anything.
- **sus replaces the 3rd** with the 2nd or the 4th, so the chord is neither major nor minor. **add keeps the triad** and adds one note with no 7th: Cadd9 is C E G D, while C9 is C E G B♭ D.
- sus4 carries a pull and usually resolves; sus2 pulls weakly and often just sits as an open colour. In practice only two see much use — sus4 on major triads and 7sus4 on dominants.
- [[CHD-C08 — Alteration proper: the dominant's movable tones|Alteration is the third operation]]: a chord tone shifted a half step. It is a dominant-family device, and the movable tones are the 5th and the 9th — ♭5, ♯5, ♭9, ♯9, ♯11.
- One rule governs all of them: **do not alter a note the melody is sitting on.** The symbol names a scale as much as a note stack, which is why G7♭9 and G7♭13 are interchangeable in writing and 7♯11 and 7♭5 share one physical voicing.
- [[CHD-C09 — The sixth chord, and the minor-6 naming trap|The 6th chord]] is a triad plus the 6th degree and no 7th — a milder colour than a 7th. The trap: the added 6th is always the **major** 6th, even on a minor triad, so Bm6 is B D F♯ G♯.
- A 6th chord is note-for-note its relative minor 7th — C6 is Am7 — and with no bass to anchor a root, both names are defensible. Classical figured bass also writes a superscript 6 for first inversion, so "C6" means C/E in an analysis and C E G A on a chart.
- Then the two chords built from one interval repeated: [[CHD-C10 — The symmetrical chords, and what symmetry costs them|the symmetrical chords]]. Diminished 7 is 3+3+3 and augmented is 4+4.
- Symmetry buys transposability — slide a diminished 7th shape up three frets and it is the same four pitches — and costs a root the ear can find, a true inversion, and any function of its own. One dim7 has four names, one augmented triad three.
- **The functional half, which the reference note leaves out.** Look at the notes of the diminished chord. Is any one of them the leading note of the chord that follows? **No → a passing chord**, colouring the line and driving nothing. **Yes → a dominant substitute**, and it will resolve.
- The same ♯iv° is passing on the way to I — the leading note of I is not in it — and a functioning dominant on the way to V, because ♯4̂ *is* the leading note of 5̂. One shape, two jobs, decided entirely by what comes next.

**Concepts**
- [[CHD-C07 — Sus removes, add adds — neither is an alteration]]
- [[CHD-C08 — Alteration proper: the dominant's movable tones]]
- [[CHD-C09 — The sixth chord, and the minor-6 naming trap]]
- [[CHD-C10 — The symmetrical chords, and what symmetry costs them]]

**Homework**
- [ ] **Review** — sort sus2, add9, 7♯9, 6 and dim7 into removals, additions and alterations. Then spell Bm6 and Bm♭6 and say which note differs.
- [ ] **Apply** (~15 min) — over a V7 in a loop, add one alteration at a time and hear each resolution. Then play a melody over it and drop whichever alteration collides with the melody note.
- [ ] **Test** — [[Course 29 — Lesson 3 Test]]

### Lesson 4 — Naming, Inversion and the Slash

**Read**
- [ ] [[Chord Inversions]] → *The inversions of C major*, *Why invert*
- [ ] [[Slash Chords]] → *The interpretation method*, *All twelve major triads over a C bass note*
- [ ] [[Chord Naming by Context]]

**The material**
- [[CHD-C11 — Inversion: same notes, different bass|An inversion changes exactly one thing]] — which chord tone is in the bass. Two inversions for a triad, three for a seventh chord, and the notes never change.
- The bass note is the single most important note for a chord's feel, which makes inverting a compositional decision rather than a fingering convenience.
- Three reasons to do it: **voice leading** (keep common tones, move the least), **bass-line control** (walk the bass by step under static harmony, C → C/B → Am), and hand economy.
- On guitar the decision inverts itself: with four fingers and six strings the live question is which tones to **drop**. Keep the 3rd and 7th, drop the 5th first and the root second. Rootless is the default with a bass player present, not an exotic case.
- [[CHD-C12 — Decoding a slash chord|A slash symbol is a playing instruction]] — upper chord over bass note — and what the composite *is* is a separate question with a three-step method.
- Take the bass as the root, relate every upper note back to it as a degree, then name the result. B♭/C is ♭7-9-11 over C, so C7sus4(9). G/C is 9-5-maj7, a Cmaj9 with no 3rd. E/C is maj3-♯5-maj7, so Cmaj7♯5.
- Two stopping points. If the bass note is already a tone of the upper chord there is no new chord at all — A♭/C is first-inversion A♭. And with no 3rd and no 7th present the reading is genuinely ambiguous, so only the surrounding harmony decides.
- Which is the idea the whole course exists to install, and the one four Pedler chapters converge on: [[CHD-C13 — A chord name exposes a relationship, not a fact|a chord name is chosen to expose a relationship, not to state a fact]].
- The correct name is the one that reflects the sound you actually hear and the voice leading as it resolves — not the one with the fewest accidentals, and not the one a chart would print.
- The same four notes are Cmaj7/E in the key of C and Em(add♭6) with E as the centre. Em6 is a half-diminished a third away or a rootless dominant 9th a fourth up, and **each name predicts a different next chord**.
- A diminished 7th has four names and an augmented triad three. The collection of pitches never changes; only what you are claiming about it does. That is a licence, not a loophole — pick the name that gets you where you are going.

**Concepts**
- [[CHD-C11 — Inversion: same notes, different bass]]
- [[CHD-C12 — Decoding a slash chord]]
- [[CHD-C13 — A chord name exposes a relationship, not a fact]]

**Homework**
- [ ] **Review** — run the three-step method on B♭/C, A/C and G♭/C, name each composite, and say where each wants to go. Then find one chord of your own that needed a slash and name it two ways.
- [ ] **Apply** (~15 min) — take a four-chord loop and re-voice it so the bass walks by step, then play the same loop with 3rds and 7ths only and check nothing about its identity was lost.
- [ ] **Test** — [[Course 29 — Lesson 4 Test]]

## Course final

`/school final 29` when all four lessons are done. Twenty-four questions weighted to the material that actually trips people — the extension-naming rule, the three colour operations, symmetry and the leading-note test, and the naming argument. Pass at **80%**.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 29 — Final Exam]]

## Related

- [[Class 1 — Music Fundamentals]]
- [[Chords]] · [[Chord Classification from 2 to 12 Notes]] · [[Seventh Chords]] · [[Extended Chords]] · [[Upper Structure Chords]] · [[Altered Chords]] · [[Suspended Chords]] · [[Add Chords]] · [[Sixth Chords]] · [[Augmented Chords]] · [[Diminished Chords]] · [[Chord Naming by Context]] · [[Chord Inversions]] · [[Slash Chords]]
- [[Machine/Workflows/school]] · [[Music Theory]]
