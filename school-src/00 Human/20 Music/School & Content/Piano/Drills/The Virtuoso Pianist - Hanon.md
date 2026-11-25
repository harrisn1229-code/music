---
type: drill
instrument: piano
category: dexterity
difficulty: 2
minutes: 15
tempo_start: 60
tempo_target: 108
# spec-173 follow-up: this book's progress is NOT keyed by this note's basename. Its own
# index says so — "one row per exercise, keyed hanon-1 … hanon-60 … no note per exercise,
# this table is the whole index" — and the school page writes exactly those keys. These two
# fields are what let the plugin read that family instead of looking for 60 notes that the
# design deliberately does not have.
drill_keys: hanon-
drill_count: 60
reinforces: []
classes: ["9"]
source: "Charles-Louis Hanon — The Virtuoso Pianist (public domain)"
file: "[[The Virtuoso Pianist - Hanon.pdf]]"
tags: [drill, piano, dexterity, hanon]
---
```drill-controls
```

# The Virtuoso Pianist — Hanon

The standard piano dexterity book, complete at 116 pages. Public domain (1873), so unlike the rest of the library it can be shared freely — worth knowing if any of this goes to Britt.

Hanon's own subtitle for Part I states the goal exactly: *"Preparatory Exercises for the Acquirement of Agility, Independence, Strength and Perfect Evenness in the Fingers."*

- Play from [[The Virtuoso Pianist - Hanon.pdf]]

## Structure

| Part | Exercises | What it's for |
|---|---|---|
| **I** | 1–20 | Preparatory — agility, finger independence, evenness. Stays in C, hands an octave apart |
| **II** | 21–43 | Transcendent — scales, arpeggios, broken chords in all keys |
| **III** | 44–60 | Virtuoso — trills, tremolos, repeated notes, wrist technique |

## Hanon's own instructions

These are printed in the book and they are the method, not preamble:

- **Metronome ♩=60, working gradually up to 108.** That's the meaning of the double metronome mark at the head of each exercise.
- ***"Lift the fingers high and with precision, playing each note very distinctly."***
- **Both hands play the same difficulty throughout** — *"in this way the left hand becomes as skilful as the right."* The figure the left hand plays ascending is copied by the same fingers of the right hand descending, which is the whole trick of the book: it refuses to let the weak hand off.
- Each exercise trains a named finger pair (3–4 in No. 2, 2–3–4 in No. 3, and so on). Exercise 1 specifically stretches 5–4 in the left hand ascending and 5–4 in the right descending.
- *"As soon as Ex. 1 is mastered"* — move on, but keep it in the warm-up. Hanon is cumulative; Part I is meant to be run as a set, not graduated from.

## How to run it

- **Part I as a warm-up set** is the normal use — 15 minutes, exercises 1–20 in order, at whatever tempo is clean.
- Nate's lane here is **writing and producing, not classical pedagogy**, so the honest scope is: enough keyboard facility to voice chords and play parts in, not a route to Part III. Parts II and III are available if wanted, but nothing in the school assumes them.
- Hanon is famously criticised for being unmusical — the criticism is fair and doesn't matter for this purpose. It builds hands. Musicality comes from the repertoire, not the drill book.

## Practice index

Read start to finish across all 116 pages to build this. One row per exercise, keyed `hanon-1` … `hanon-60` in the progress file (`Machine/School/progress-nate.json`) — no note per exercise, this table is the whole index. Page numbers are the PDF's own page count (1–116, matching the `pages` parameter), not the printed book-page numbers visible in some scans.

**Page numbers corrected 2026-08-20 (spec-172).** Exercises 32–38 were each recorded one page late. Verified against the scan: PDF p.42 carries *"Turning the thumb under the 2nd finger. / 32. / M.M. ♩ = 40 to 72"*, p.46 carries both 36 and 37, p.47 carries 38 (running onto 48), and p.49 carries 39 with M.M. ♩=60 to 120 — which is where the drift ends, absorbed by 38's two-page span. Exercise 39 onward was already right. Caught when the page images went on screen and stopped matching the text beside them.

**Tempo sourcing, honestly:** Part I's own text gives one blanket mark for all 20 exercises — *"begin with the metronome set at 60, gradually increasing the speed up to 108."* Part II opens with the same "M.M. ♩=60 to 108" heading over Exercise 21 and no new mark appears until Exercise 32, so 21–31 carry that same block figure, not an independently-printed one. From Exercise 32 on, and throughout Part III, **every exercise (or exercise-group) prints its own M.M. mark**, and those are transcribed exactly. Exercises 36–38 print no tempo at all in this scan — left blank rather than guessed.

| # | Part | What it trains | Page(s) | Tempo target (M.M. ♩) |
|---|---|---|---|---|
| 1 | I | 5–4 finger stretch, left hand ascending / right hand descending | 1 | 60→108 (Part I block mark) |
| 2 | I | 3–4 fingers; played together with Ex. 1 once mastered | 2–3 | 60→108 (block) |
| 3 | I | 2-3-4 fingers | 3 | 60→108 (block) |
| 4 | I | 3-4-5 fingers, special exercise | 4 | 60→108 (block) |
| 5 | I | 1-2-3-4-5, all fingers lifted high and precisely | 5 | 60→108 (block) |
| 6 | I | Daily consolidation of Exs. 1–5 (no distinct finger-pair caption printed for this exercise) | 6 | 60→108 (block) |
| 7 | I | 3-4-5 fingers, "exercise of the greatest importance" | 7 | 60→108 (block) |
| 8 | I | 1-2-3-4-5, "very important exercise for all five fingers" | 8 | 60→108 (block) |
| 9 | I | 4–5 extension, general finger exercise | 9 | 60→108 (block) |
| 10 | I | 3–4 trill preparation, left hand ascending / right hand descending | 10 | 60→108 (block) |
| 11 | I | 3-4-5, another trill preparation for 4th–5th | 11 | 60→108 (block) |
| 12 | I | 1–5 extension, plus 3-4-5 exercise | 12 | 60→108 (block) |
| 13 | I | 3-4-5 fingers | 13 | 60→108 (block) |
| 14 | I | 3–4 trill preparation | 14 | 60→108 (block) |
| 15 | I | 1–3 extension, exercise for all 5 fingers | 15 | 60→108 (block) |
| 16 | I | 3–5 extension, plus 3-4-5 exercise | 16 | 60→108 (block) |
| 17 | I | 1-2 / 2-4 / 4-5 extensions, plus 3-4-5 exercise | 17 | 60→108 (block) |
| 18 | I | 1-2-3-4-5 | 18 | 60→108 (block) |
| 19 | I | Finger extension across all five (printed fingering partly illegible in this scan) | 19 | 60→108 (block) |
| 20 | I | 2-4 / 4-5 extensions, plus 3-3-4 exercise — closes Part I | 20 | 60→108 (block) |
| 21 | II | Transcendent series opens: 3-4-5 pattern, left hand beat 1 mirrored by right hand beat 3 | 21–22 | 60→108 (block, restated at Part II's head) |
| 22 | II | Same object as No. 21, 3-4-5 | 23–24 | 60→108 (block) |
| 23 | II | Continues the transcendent finger-independence series (3-4-5-type pattern) | 25–26 | 60→108 (block) |
| 24 | II | Continues the transcendent series | 27–28 | 60→108 (block) |
| 25 | II | Continues the transcendent series | 29–30 | 60→108 (block) |
| 26 | II | Continues the transcendent series | 31–32 | 60→108 (block) |
| 27 | II | Continues the transcendent series | 33–34 | 60→108 (block) |
| 28 | II | Continues the transcendent series | 35–36 | 60→108 (block) |
| 29 | II | Continues the transcendent series | 37–38 | 60→108 (block) |
| 30 | II | Continues the transcendent series, closes the run of paired-page exercises | 39–40 | 60→108 (block) |
| 31 | II | 1-2-3-4-5 and extensions, 3/4 time | 41–42 | 60→108 (block) |
| 32 | II | Turning the thumb under the 2nd finger | 42 | 40→72 |
| 33 | II | Turning the thumb under the 3rd finger | 43 | 40→72 |
| 34 | II | Turning the thumb under the 4th finger | 44 | 60→108 |
| 35 | II | Turning the thumb under the 5th finger — "of the highest importance" | 45 | 40→72 |
| 36 | II | Another example of turning the thumb under | 46 | not printed |
| 37 | II | Special thumb-passing exercise, played with the two thumbs only | 46 | not printed |
| 38 | II | Preparatory exercise for the study of scales | 47–48 | not printed |
| 39 | II | The 12 major scales and their 2 relative-minor forms (harmonic + melodic), all 12 keys | 49–60 | 60→120 |
| 40 | II | Chromatic scales — at the octave, minor third, major sixth, minor sixth, contrary motion | 61–63 | 60→120 |
| 41 | II | Arpeggios on the triads, all 24 keys | 64–67 | 60→108 |
| 42 | II | Finger-stretch extension, diminished-seventh chord arpeggios | 68 | 60→120 |
| 43 | II | Finger-stretch extension, dominant-seventh chord arpeggios — closes Part II | 69–70 | 60→120 |
| 44 | III | Notes repeated in groups of three, high precise finger-lift, no hand/wrist rise | 71–72 | 60→120 |
| 45 | III | Notes repeated in groups of two, all five fingerings in turn, accent the first of each slurred pair | 73–74 | 60→108 |
| 46 | III | The trill for all five fingers (Mozart's own trill study, then Thalberg's trill) | 75–76 | 60→108 |
| 47 | III | Notes repeated in groups of four | 77 | 60→120 |
| 48 | III | Wrist exercise — detached thirds, then detached sixths | 78–79 | 40→84 |
| 49 | III | Stretches, 1st–4th and 2nd–5th fingers, each hand | 80 | 60→108 |
| 50 | III | Legato thirds, then scales in legato thirds, then chromatic scales in minor thirds | 81–82 | 40→84 |
| 51 | III | Preparatory exercise for scales in octaves | 83–85 | 40→84 |
| 52 | III | Scales in thirds, in the keys most used | 86–90 | 40→84 |
| 53 | III | Scales in octaves, all 24 keys | 91–94 | 40→84 |
| 54 | III | The fourfold trill in thirds, all five fingers | 95–96 | 40→92 |
| 55 | III | The threefold trill | 96–97 | 40→92 |
| 56 | III | Scales in broken octaves, all 24 keys | 100–103 (opening page missing from the scan) | 60→120 |
| 57 | III | Broken arpeggios in octaves, all 24 keys | 104–106 | 40→72 |
| 58 | III | Sustained octaves accompanied by detached notes | 107–108 | 60→92 |
| 59 | III | Fourfold trill in sixths, combining 1st+4th and 2nd+5th fingers | 109–110 | 40→84 |
| 60 | III | The tremolo — "played with the same rapidity as the roll on the drum" | 111–116 | 48→72 |

Pages 98–110 (Exercises 56–59) are page **ranges**, not single-page pins — this stretch of the scan has several short exercises sharing pages. The drift once noted here has a concrete cause, found 2026-09-14: **PDF pp. 98 and 99 are the same image** (both pages reference the same embedded scan object), so one real page — the opening of Exercise 56, carrying its heading, its C-major start and its printed metronome mark — is absent from the file. p. 98 is the *special fingerings for the fourfold trill* page, which belongs with Exercises 54–55; Exercise 56's readable material begins at p. 100, part-way in at A minor. The starts of Exercises 57 (p. 104), 58 (p. 107), 59 (p. 109) and 60 (p. 111) were each re-read off the raster and are exact.

## Progress

| Date | Exercises | Tempo | Notes |
|---|---|---|---|
| — | — | — | not yet started |

## Related

[[Drill Index]] · [[Chord Inversions]] · [[Chords by Key]]
