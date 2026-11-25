---
type: school-course
course_id: "30"
domain: theory
strands: [VOI]
class: "[[Class 1 — Music Fundamentals]]"
depends_on: ["29"]
target_pct: 80
lessons: 6
concepts: 16
---

# Course 30 — Voicings & Comping

Teaches what to do with a chord once you can spell it — which notes to keep, where to put them, when to strike them, and how to stay out of the way of whoever else is playing. It is the playing half of harmony, and it happens entirely on the instrument.

**What it assumes**

- [[Course 29 — Chord Vocabulary]] — you have to be able to name the notes in a chord before deciding which of them to leave out.

| Lesson | Title | Concepts | Test |
|-----|---|---|---|
| 1 | A Voicing Is a Choice, Not a Chord | 3 | [[Course 30 — Lesson 1 Test]] |
| 2 | Finding the Other Voicings | 3 | [[Course 30 — Lesson 2 Test]] |
| 3 | Voice Leading Between Voicings | 2 | [[Course 30 — Lesson 3 Test]] |
| 4 | Comping — Rhythm, Motif and Fills | 3 | [[Course 30 — Lesson 4 Test]] |
| 5 | Sharing the Role | 2 | [[Course 30 — Lesson 5 Test]] |
| 6 | From Chart to Chord Melody | 3 | [[Course 30 — Lesson 6 Test]] |

**What this unlocks**

- **Playing with other people.** Everything in Lessons 4 and 5 is a rule about how a part fits beside other parts. Nothing else in the school covers it.
- **The arrangement fix for what looks like a mix problem.** A chord low on the neck under a vocal is mud; the same chord higher is fine. That decision is made here, not in the mixer.
- **Jazz harmony becomes playable rather than theoretical.** Substitution and reharmonisation are voicing decisions before they are analytical ones.
- Practically: sitting down with a chart and a guitar and getting through it, instead of getting through it by ear and hoping.

> [!info] The gap this course closes
> [[School Config]] created the VOI strand for a specific reason: *"CHD covers whether you can **spell** a chord and nothing covered whether you can **arrange and play** one — the actual guitar skill."* That reasoning was recorded on 2026-08-03 and no concepts were written against it. This is that gap closed. It is a playing course — every Apply item puts hands on an instrument.

## The lessons

### Lesson 1 — A Voicing Is a Choice, Not a Chord

**Read**
- [ ] [[Chord Voicings]] → *Chord vs. voicing vs. shape*, *Which notes actually matter*, *The named voicing families*
- [ ] [[Breaking Up Voicings]] → *The core method*
- [ ] [[Quartal Chord Voicings]] → *What it is*, *One shape, many chord identities*

> [!warning] Ch13 is vault-only reading — deliberately NOT on the Read list above
> **[[Ch13 — The A Hard Day's Night Chord — Rock's Holy Grail]] §1–§2 is the strongest case in the
> library for this lesson, and it must be read in Obsidian, not on the school page.** Every note on
> a `**Read**` line is parked into the published artifact as its own page by `build.py`'s
> `reading_for()`; Ch13 is an extraction from a scanned commercial book and its own header says
> *"nothing here travels into the published artifact."* Citing it in prose keeps the pointer and
> publishes nothing. Courses 29 and 31 handle Ch11 and Ch12 the same way.
>
> And read it for the **argument, not for a chord**: the fret diagrams, tablature and frequency
> tables were destroyed by the scan — two pages carry printed accuracy estimates near 20%. The note
> says so and refuses to guess. Do not try to reconstruct the voicing from it.

**The material**
- The idea the course rests on: [[VOI-C01 — Chord, voicing, shape|chord, voicing and shape are three different things]]. A **chord** is pitch content — C major is C-E-G in any order. A **voicing** is the specific order, spacing and register. A **shape** is one fingering that realises a voicing.
- Slide a shape up a fret and the voicing is unchanged while the chord changes. That is the proof they are separate.
- Ch13 is the strongest case in the library for treating the voicing as harmony rather than decoration: the sonority everyone recognises is **an ensemble effect no single instrument can play**, built from a 12-string, a bass, an overdubbed piano and room bleed. Even the guitarist who played it did not think of it as a chord he was playing.
- A 12-string is not a 6-string with the same notes — four courses tuned in octaves means a pitch nobody fingered is one of the most audible things in the sound. **Register and doubling are chord identity.**
- Then the practical half: [[VOI-C02 — Which notes to drop: shell and rootless voicings|which notes you can drop]]. Guide tones first — 3rd and 7th define quality and function. Then the extension you want. Then the root, which the bass has. The 5th goes first unless it is altered.
- **Shell** is root, 3rd, 7th. **Rootless** is 3rd, 7th, extensions. **Drop 2** moves the 2nd-highest note of a close voicing down an octave and is the workhorse; **drop 3** moves the 3rd-highest and spaces it wider.
- And the one that is ambiguous on purpose: [[VOI-C03 — Quartal voicings: ambiguity on purpose|quartal voicings]] stack 4ths, so they state a set of notes without committing to a quality — which is why nothing in them wants to resolve anywhere.
- One quartal grip reads as minor 11, sus4, 6/9 or major 13 depending only on which note the ear takes as the root. The fingers never move.
- Last piece of texture: a struck four-note chord is four notes you can deploy separately — outside pair then inside pair, every other note, or a held top note with a line moving underneath.

**Concepts**
- [[VOI-C01 — Chord, voicing, shape]]
- [[VOI-C02 — Which notes to drop: shell and rootless voicings]]
- [[VOI-C03 — Quartal voicings: ambiguity on purpose]]

**Homework**
- [ ] **Review** — take one chord you play constantly and write down every note in it. Cross out the 5th. Cross out the root. Say what is left and whether it still names the chord.
- [ ] **Apply** (~15 min) — on guitar, comp one tune with shell voicings only. Then do the same tune again with guide tones alone, no root. Record both to one Ableton track and listen back for what actually went missing.
- [ ] **Test** — [[Course 30 — Lesson 1 Test]]

### Lesson 2 — Finding the Other Voicings

**Read**
- [ ] [[Octave-Shift Voicing Discovery]] → *The method*, *Collision-resolution mechanic, generalized*
- [ ] [[Major Triads Across the Fretboard (String-Group Inversions)]] → in full, it is a short note
- [ ] [[Multifunctional Voicings]] → *The core mechanism*, *Three worked shapes, three functions each*

**The material**
- Three ways to end up with more voicings than you memorised, and none of them is a chord chart.
- The first is generative: [[VOI-C04 — Octave shift, and the collision fix|move one note of a shape up or down an octave]] and see what you land on. If two notes collide on a string, move the **newly-colliding** note to its own nearest octave and cascade until every note has a string of its own.
- That mechanic is what makes it terminate instead of dead-ending, and it is also the definition of open position: a close voicing becomes a spread one exactly by lifting an interior note an octave. Move the root of a close C major up and you get another close inversion; move the middle note up and you get the open 1-5-3.
- The second is inventory: [[VOI-C05 — One triad, every string group|one triad lives in twelve places]] — three inversions on each of four adjacent 3-string groups.
- Because the guitar is tuned in fourths except between G and B, the two groups crossing that pair reuse the E-A-D / A-D-G shapes with every note **above** the pair a fret higher — **D-G-B shifts the top note, G-B-E the top two**. Twelve locations, not twelve grips.
- The payoff is not "more shapes to know". It is that you pick each chord by **proximity to the previous one** rather than defaulting to root position, which cuts hand travel, raises the tempo you can play cleanly, and sounds less generic.
- The third is reinterpretation: [[VOI-C06 — One shape, several chords|one shape covers several chords]] depending on which chord tone you play it from. A min7♭5 or half-diminished grip played off the **♭7 of a dominant** reads as that dominant, altered; the same family off the **3rd** reads as a dominant 9.
- That is the efficiency argument for the whole strand. You are not finding a grip for G7alt mid-tune — you are re-pointing one you already own.

**Concepts**
- [[VOI-C04 — Octave shift, and the collision fix]]
- [[VOI-C05 — One triad, every string group]]
- [[VOI-C06 — One shape, several chords]]

**Homework**
- [ ] **Review** — take one chord shape and move each of its notes up an octave in turn, resolving collisions. Write down the two results you would actually use and name the family each landed in.
- [ ] **Apply** (~15 min) — pick one major triad and find all three inversions on all four string groups. Use [[FretFlip]] to check yourself when a position will not come, then play a four-chord progression choosing the nearest voicing every time instead of the root-position one.
- [ ] **Test** — [[Course 30 — Lesson 2 Test]]

### Lesson 3 — Voice Leading Between Voicings

**Read**
- [ ] [[Voice Leading]] → *The algorithm*, *The bass exception*
- [ ] [[Spread Triad Voice-Leading Etude]] → *Spread triad, defined*, *The construction rule*
- [ ] [[Close Position Triad Voice-Leading Etude]] → skim the comparison table

**The material**
- A voicing is only good relative to the one before it, and there is an algorithm: [[VOI-C07 — Move the least: the common-tone pivot|hold the common tone and move the rest by the nearest step]].
- Find the note both chords share. Do not move it. Move everything else to the nearest available note of the next chord. Repeat through the progression. You never have to name the inversion you land on.
- **The bass is the exception.** The lowest voice stays on each chord's actual root while the upper voices invert above it, because the ear reads the chord's identity from the bass. Voice-leading it too would smooth the motion and lose the harmony.
- The test is audible: the same progression in strict root position throughout keeps every note and loses the character.
- Then the rule turned into a generator: [[VOI-C08 — Spread triads, and one note per change|chain triads by thirds and move exactly one voice]]. A **spread** triad is a close triad with the middle note up an octave — 1-5-3, with a string skip and a wider, harp-like spacing.
- Chain the diatonic triads a third at a time — I, iii, V, vii°, ii, IV, vi — moving one voice by a half or whole step at each change, always to the closest spread voicing of the next chord. Land it with a real cadence, V7 to I.
- **Coverage falls out as a side effect.** Because the closest-voicing rule forces a different inversion each time a quality recurs, the chain touches every diatonic triad of the key in every inversion without inversions ever being drilled separately.
- Watch the terminology: "open position" here means spread spacing, not playing near the nut. Same words, unrelated meanings.

**Concepts**
- [[VOI-C07 — Move the least: the common-tone pivot]]
- [[VOI-C08 — Spread triads, and one note per change]]

**Homework**
- [ ] **Review** — write out a four-chord loop and, for each change, circle the note the two chords share. Then say where every other note goes and by how far.
- [ ] **Apply** (~15 min) — on piano, play that loop twice: once all root position, once voice-led by common tone with the left hand still on the plain roots. Then move to guitar and run the spread-triad chain down the neck in C, one note moving per change.
- [ ] **Test** — [[Course 30 — Lesson 3 Test]]

### Lesson 4 — Comping — Rhythm, Motif and Fills

**Read**
- [ ] [[Jazz Comping]] → the five named comping rhythms
- [ ] [[Jazz Comping — Rhythmic Motif and Walking Bassline]] → *The core tip*, *Bonus: walking bassline with the chords*
- [ ] [[Comping Fills]] → *The core tip*, *A fill's job is to connect, not decorate*
- [ ] [[Six Devices for R&B Rhythm Guitar Fills]] → pick two devices, not all six

**The material**
- The sentence the lesson exists for: [[VOI-C09 — Comping is rhythm before it is harmony|rhythm matters more than the notes]].
- So the practice order is fixed. Drill the rhythm **alone, on one static shell voicing**, metronome on 2 and 4, until it is automatic. Only then move it through the changes with real voicings.
- Five rhythms cover most of it. **Charleston** — beat 1, then the "and" of 2; the reference groove, and static. **Push** — a sustained hit on the "and" of 3 that pulls into the next bar, which is the momentum Charleston lacks.
- **Downbeat-anchored** — straight, unsyncopated, safe behind a busy soloist. **Off-the-one** — the "and" of 1 and beat 3, skipping the downbeat. **Response** — a reply to a phrase the soloist has just finished.
- The commonest failure is playing too much. Chords on 2 and 4, or one per bar, nearly always sit better than constant strumming.
- Then the thing that makes a part sound deliberate: [[VOI-C10 — One repeatable motif, then vary it|hold one motif before you vary anything]]. Reinventing the rhythm bar to bar reads as scattered even when every individual choice is defensible.
- Lock the motif for a full pass through the form. *Then* depart from it and return — the return only lands because the baseline was established first. Scaled up, that is riff comping: one whole figure held for eight bars at a time.
- A stable pattern is also what lets everyone else interact with you. A drummer can catch a hit and double it; a soloist can build on a surface that stays put.
- Walking bass under the same rhythm: **root on beats 1 and 3, an approach note toward the next root on 2 and 4** — a half step below, half step above, or whole step above. Try more than one direction; the interval decides.
- Last, the space between: [[VOI-C11 — A fill waits for the rest, and it goes somewhere|a fill only enters when the soloist stops]], and its job is to connect forward to the next bar, not to decorate the chord it starts on.
- Build one bottom-up — a plain diatonic or blues line first, colour added as a second pass. The R&B device catalogue is the what: butterfly hammer-ons, three-string triad groupings, diatonic 6ths, 4ths, 3rds, and single-note pentatonic lines.

**Concepts**
- [[VOI-C09 — Comping is rhythm before it is harmony]]
- [[VOI-C10 — One repeatable motif, then vary it]]
- [[VOI-C11 — A fill waits for the rest, and it goes somewhere]]

**Homework**
- [ ] **Review** — listen to one track and write down only where the comping instrument strikes. No pitches. Then say which of the five rhythms it is closest to.
- [ ] **Apply** (~15 min) — one shell voicing, metronome on 2 and 4, one minute per rhythm: Charleston, push, downbeats, off-the-one, response. Then pick the best one, hold it through a full chorus of a blues, and play a fill only in the bars where the melody rests.
- [ ] **Test** — [[Course 30 — Lesson 4 Test]]

### Lesson 5 — Sharing the Role

**Read**
- [ ] [[Jazz Comping — Sharing the Role with Another Comping Instrument]] → in full
- [ ] [[Layering Rhythm Guitar Parts with Triads]] → *The core idea*, *Why triads specifically*
- [ ] [[Bossa Nova Comping Pattern]] → skim, for the case where the guitar owns the groove

**The material**
- Two harmony instruments playing independently reads as clutter no matter how good each part is. So: [[VOI-C12 — Two comping instruments divide register and time|divide the role explicitly]].
- **Assign it out loud at the top of the tune** — you comp the head, I comp the first solo, you take the second. That removes the guesswork rather than negotiating it live. Unrehearsed, the default is that piano is primary and the guitarist behaves like a horn player until cued.
- **Comp in the holes.** When the soloist settles into a repeating motif, place your hits in the gaps it leaves rather than doubling it. By the second repetition you can hear where the holes will be.
- **Track register and move opposite.** Soloist goes up, you comp lower. Going higher than the soloist is the more delicate move — it pulls attention off them — so it is used sparingly.
- **Laying out is a real choice**, including for a whole tune. It also buys thinking time: leaving room lets the soloist define what is needed, so you come back in with something that fits.
- The exception proves the rule. A Freddie Green straight-quarter-note part sits under a comping piano precisely because it has stopped being comping and become a second drummer — completely predictable, harmonically unassertive.
- On a bossa the convention flips: the **guitar** owns the repeating groove and the piano answers it. Only one instrument carries the ostinato at a time.
- Same problem, recorded instead of live: [[VOI-C13 — Layered rhythm parts stay small|stacked rhythm parts have to stay lean]]. Closed triads — three notes, no doublings — are small on purpose, which is what lets three of them sit on top of each other.
- What separates the layers is **string group, neck position and tone**, not different material. One triad vocabulary relocated: a bed part low and arpeggiated, a backbeat part on the top three strings, a double-stop melody above.

**Concepts**
- [[VOI-C12 — Two comping instruments divide register and time]]
- [[VOI-C13 — Layered rhythm parts stay small]]

**Homework**
- [ ] **Review** — take a recording with both piano and guitar comping. Write down who is playing in each eight-bar stretch and what each one gave up to make room.
- [ ] **Apply** (~15 min) — play along with a track that already has a comping instrument. Comp only in its gaps for one chorus, then lay out completely for the next one and just listen to what changed.
- [ ] **Test** — [[Course 30 — Lesson 5 Test]]

### Lesson 6 — From Chart to Chord Melody

**Read**
- [ ] [[Reading and Interpreting a Jazz Lead Sheet]] → *The core method*, steps 1–5
- [ ] [[Chord Melody Arranging]] → *The core idea*, *Physical execution: don't harmonize every note*
- [ ] [[Guide-Tone Diads for Blues Rhythm Guitar]] → *The core shape*, *Drill*
- [ ] [[Playing Chord Charts]] → the tool, worked as reading rather than as a drill

**The material**
- The strand's thesis in one line, and the tool page states it: making music from a chord chart is like cooking from a recipe. [[VOI-C14 — A chart is a framework, not an instruction|A chart is a framework]].
- **Read the form before a single chord.** AABA or ABAC, 32 bars — and an AABA tune with an 8-bar A is often only 16 bars of distinct harmony once the repeats are accounted for.
- **Use the form to predict.** In an AABA tune starting on the tonic, the last two bars of each A are a turnaround about ninety percent of the time. That is a chunk of the chart solved before it is read.
- **Reduce to named devices.** A secondary ii-V into the IV chord is "the IV chord". A four-bar reset is "a turnaround". The point is recognising the same device in the *next* tune.
- **The printed harmonisation is a starting point.** When a chord clashes with the melody, substituting is normal practice, not a liberty. Judge it against the melody, not the page.
- Then playing melody and harmony at once: [[VOI-C15 — Renumber off the chord, not the key|read every melody note as a degree of the chord under it]], not of the parent key. The same pitch is "5 of C" under a C chord and "4 of D" a beat later under Dm.
- Index your voicings by **which chord tone the melody note is and which string it lands on** — that is the lookup you need mid-arrangement, and it is why the shape transfers to any chord of that quality by sliding to the new root.
- **Do not harmonise every note.** Landing the melody note alone with one finger and adding the rest only sometimes is both physically easier and better sounding; the space reads as phrasing rather than a wall of block chords.
- And the floor everything else is built on: [[VOI-C16 — Guide-tone diads: the minimum viable voicing|two notes, the 3rd and the ♭7]], state a dominant chord on their own. Change the 3rd and it flips major to minor; change the ♭7 and it stops being a dominant.
- Through a blues in A the identical shape moves **down a half step for the IV and up a half step for the V**. One grip, the whole form. The rootless 9ths and 13ths are this pair with colour stacked on top.

**Concepts**
- [[VOI-C14 — A chart is a framework, not an instruction]]
- [[VOI-C15 — Renumber off the chord, not the key]]
- [[VOI-C16 — Guide-tone diads: the minimum viable voicing]]

**Homework**
- [ ] **Review** — open a standard you do not know. Before touching an instrument, mark the form, circle every likely turnaround, and reduce every multi-chord passage to one named device.
- [ ] **Apply** (~15 min) — run one progression through [[Playing Chord Charts]] in three keys using its transposer, then play a 12-bar blues in A on guitar with nothing but the 3rd-♭7 diad, moving by half step for the IV and V.
- [ ] **Test** — [[Course 30 — Lesson 6 Test]]

## Course final

`/school final 30` when all six lessons are done. Twenty-four questions weighted to the decisions rather than the definitions — which notes to drop, which voicing to move to, when to play and when not to. Pass at **80%**.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 30 — Final Exam]]

## Related

- [[Class 1 — Music Fundamentals]] · [[Course 29 — Chord Vocabulary]]
- [[Chord Voicings]] · [[Quartal Chord Voicings]] · [[Breaking Up Voicings]] · [[Multifunctional Voicings]] · [[Octave-Shift Voicing Discovery]] · [[Voice Leading]] · [[Spread Triad Voice-Leading Etude]]
- [[Major Triads Across the Fretboard (String-Group Inversions)]] · [[Jazz Comping]] · [[Comping Fills]] · [[Chord Melody Arranging]] · [[Guide-Tone Diads for Blues Rhythm Guitar]] · [[Reading and Interpreting a Jazz Lead Sheet]]
- [[Playing Chord Charts]] · [[FretFlip]] · [[Ch13 — The A Hard Day's Night Chord — Rock's Holy Grail]]
- [[Machine/Workflows/school]] · [[Music Theory]]
