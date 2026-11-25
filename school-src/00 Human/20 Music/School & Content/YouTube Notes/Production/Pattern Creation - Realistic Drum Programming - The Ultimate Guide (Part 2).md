---
type: yt-note
date: 2026-08-06
source: youtube
url: https://www.youtube.com/watch?v=GxlaVdvX8kw
channel: Max Konyi
duration: "00:43:31"
video_type: production
music_enriched: true
briefed: 2026-W32
transcript_source: captions
tags: [yt-note, music, production, drums, pattern-programming, rhythm, groove]
---

# Pattern Creation | Realistic Drum Programming - The Ultimate Guide (Part 2)

![](https://www.youtube.com/watch?v=GxlaVdvX8kw)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=GxlaVdvX8kw)

## Synopsis

Part 2 of Max Konyi's realistic drum programming series — direct sequel to [[Sample Selection and Manipulation - Realistic Drum Programming - The Ultimate Guide (Part 1)|Part 1]] (sample selection/manipulation), which he explicitly says to watch first since even the best pattern can't save a bad sample choice. This installment is entirely about MIDI pattern programming itself — hit placement, velocity, and variation — analyzed across three example beats (a straight 16th-note beat, a Latin-influenced groove, and a funky beat). Core throughline: realism/believability comes from **listening to real drummers and imitating their decision-making**, not from a library of "correct" patterns to copy. Max walks through drum-kit fundamentals (low/high/timekeeping element roles, snare placement conventions, kick placement, the four-limb physical constraint), then spends the back half on velocity/subtlety (overt accent velocity vs. imperceptible per-hit humanization vs. velocity ramps for forward motion) and variation/contrast (establishing a norm within a pattern, then breaking it). Explicitly holds over timing/quantization and mixing for future videos in the series.

## Techniques

**Listening and imitation (the core method, not a plugin technique)**
- **"Pretend to be a beginner drummer" as a practice method:** watch beginner drum-kit tutorials on YouTube (not production channels — actual drum-lesson content), learn the basic vocabulary (why a hit goes there, stick position, articulation names), and literally tap the patterns out on a table with hands/feet before programming them — the physical rehearsal builds an intuition for *why* a real player makes each placement decision, which then transfers into more believable MIDI programming. → [[Rhythm and Groove]]
- **Program along with a slowed-down drum tutorial breakdown**, then treat the drummer's simple pattern as a "rule set" (e.g. "hi-hat is this fast, snare hits here, kick hits here") and deliberately mutate it — add hits, remove hits, move the snare — to practice generating original variations from a known-good template rather than copying it verbatim.
- **Listen to full mixes (not isolated drum breakdowns) for placement-in-context**, not just pattern shape: when does the player switch from hi-hat to ride, when does an open hat happen, when does the snare drop out while the kick stays — because a real pattern is written in response to what the other instruments are doing, so an isolated "correct" pattern learned from a tutorial will still need contextual editing before it fits a specific track.

**Drum-kit fundamentals**
- **Three functional roles, not fixed instruments:** a low/contrasting element (kick), a high/contrasting element (snare — or any other percussive sound with enough tonal contrast to the kick), and a **timekeeping element** — any steady, pulsing sound at a set subdivision (hi-hat is the default, but a ride, shaker, tom, or even sporadic hip-hop-style hits that only imply the beat can fill the role). Think of the timekeeping element as symbolic of pulse, not literally "the hi-hat."
- **Snare placement, two dominant conventions:** on beats 2 and 4 (backbeat) at normal tempo, or beat 3 alone at half-time feel — the same underlying placement felt at half the counted tempo ("double time" is the same idea counted at double speed). → [[Genre Drum Patterns]] (half-time/backbeat vocabulary already documented there)
- **Kick placement has no fixed rule beyond "usually lands on the downbeat of the bar/pattern"** — reggae is a named exception (kick lands with the snare instead). Beyond the downbeat anchor, kick placement is genre-dependent and found by ear/experimentation, not a formula.
- **The four-limb physical constraint as a creativity forcing function:** a real drummer only has two hands and two feet, so at most four simultaneous hits are physically possible (and combinations are further limited — e.g. you can't hit two cymbals and a snare at once with two hands). Deliberately thinking within this constraint when programming (rather than stacking unlimited simultaneous MIDI hits) forces more considered, "playable"-feeling pattern choices. Ties into [[Bassline Writing]]'s "band test" (imagine a real player physically executing the part) applied to drums specifically.
- **Tempo and groove are linked — a groove written for one tempo often doesn't transplant cleanly to another**, the same way a melody written in one key doesn't always feel right transposed; treat groove-writing as tempo-specific rather than time-stretching a favorite pattern onto a new track's BPM.
- **Four beat-feel axes to consider independent of pattern specifics:** straight vs. swing subdivision ([[Rhythm and Groove]] covers this in depth already), subdivision choice (8th/16th/triplet) and how it changes the physical "head-bob" response, washy/open vs. tight/closed (open cymbals and long decays vs. closed hats and short sounds), and techy/dense vs. sparse/relaxed hit density.

**Velocity and subtlety**
- **Two distinct uses of velocity: overt accenting and imperceptible humanization.** Overt = a clearly audible loud/soft alternation that itself creates the groove (e.g. a 16th-note hi-hat alternating hard/soft to establish the pulse and head-bob feel) — this is a *pattern-defining* choice, not humanization. Imperceptible = tiny per-hit velocity randomization (a real player can't hit identically twice) that doesn't change the perceived accent pattern but adds cumulative organic feel. Both matter and do different jobs — don't substitute one for the other.
- **Studio One's Humanize function (Ctrl+H) with separate velocity-range and note-start-range controls** — velocity randomized ±6–10% while leaving note-start-range at 0 (timing untouched) keeps the accent pattern intact while adding subtle volume variation; the two parameters can be dialed independently depending on how much timing vs. volume "humanness" is wanted. **Ableton-native equivalent:** the note editor's velocity lane supports the same idea directly — drag a random-range band above a group of notes (already documented with settings guidance in [[Rhythm and Groove]]'s "Randomize velocity within a bounded range" bullet) rather than a single global humanize percentage.
- **Velocity ramps as a forward-motion device**, distinct from the accent-pattern alternation above: a short run of repeated hits (e.g. a triplet fill or a hi-hat run) with velocity climbing hit-to-hit toward the target note mimics a real drummer's roll technique — starting soft and building into the peak hit — directing the ear/body toward where the "one" is about to land. Generalizes the [[Kick Design]] "duplicate-pitch-up-LPF soft/hard kick" idea (documented from Part 1) from a two-hit pair to a multi-hit ramp.
- **Sample-based realism compounds with velocity humanization** on a multi-sample-per-velocity-tier kit (as built in Part 1): randomizing velocity doesn't just change volume, it also swaps which actual sample plays (soft/medium/hard articulation samples), so the same velocity randomization technique reads as even more realistic on a properly layered kit than on a single-sample-per-hit kit.
- **Keep the loudest, most rhythmically load-bearing hits (the punch elements — often the primary snare and/or kick) at a STEADY velocity even in an otherwise-humanized pattern**, when punchiness/consistency matters more than maximum realism (common in modern electronic-leaning styles) — a deliberate, genre-aware exception to "always humanize everything."

**Variation and contrast**
- **Establish a norm within the first bar/phrase of a pattern, then deliberately break it in the repeat** — the same "expectation setup, then subversion" principle already documented at the song-section level in [[Arrangement and Song Form]], applied here at the *bar-to-bar pattern* level instead: e.g. bar 1 has one ghost note, bar 2 has a double ghost note plus an extra hit; bar 3 repeats bar 1 near-verbatim (reinforcing the norm again) so the listener half-expects bar 4's near-repeat of bar 2's variation — but bar 4 changes AGAIN (the b-section's extra hit becomes an accented rimshot instead), so even the "variation" half of an A-A'-B-B' structure doesn't repeat identically. → [[Rhythm and Groove]], [[Arrangement and Song Form]]
- **An unexpected accent on a previously-unaccented hit is itself a foreshadowing device** — giving a rimshot/accent treatment to a note that has never been emphasized before in the pattern "peaks the ear" and primes the listener for an upcoming break/fill, even before the actual fill starts.
- **Cross-bar "conversation" between two elements** (demonstrated with toms answering a ride-bell accent pattern): bar 1's tom phrase gets one ride-bell response, bar 2's (varied) tom phrase gets a *different* ride-bell response — treating two elements as call-and-response across a multi-bar phrase rather than each looping independently.
- **Contrast entire beats against each other using the same axis list as the fundamentals section above** — tempo, subdivision, washy/tight, techy/sparse, which cymbal is in use, which elements are present — as the deliberate palette for differentiating one song section's groove from the next (verse hi-hat vs. chorus ride, tight verse vs. washy chorus, etc.), not just varying hits within one repeating pattern.

## Routed to

- [[Rhythm and Groove]] — listening/imitation-as-practice method, four-limb constraint, velocity-ramp-as-forward-motion, and bar-level norm/variation added to From videos
- [[Arrangement and Song Form]] — cross-referenced the bar-level (pattern-scale) version of the establish-then-break-expectation principle already documented there at the section scale
- [[Genre Drum Patterns]] — cross-referenced snare-placement conventions (backbeat/half-time) already documented there
- [[Bassline Writing]] — cross-referenced the four-limb "band test" parallel (imagine a real player physically executing the part)
- [[Kick Design]] — cross-referenced the velocity-ramp generalization of Part 1's duplicate-pitch-up-LPF soft/hard kick technique

## Source

[Pattern Creation | Realistic Drum Programming - The Ultimate Guide (Part 2)](https://www.youtube.com/watch?v=GxlaVdvX8kw) · Max Konyi · 43:31 · captions (high confidence — clear single-speaker tutorial audio) · transcript: [[Pattern Creation - Realistic Drum Programming - The Ultimate Guide (Part 2) (transcript)]]

**Series note:** [[Sample Selection and Manipulation - Realistic Drum Programming - The Ultimate Guide (Part 1)|← Part 1]] (sample selection/manipulation). Max flags future series installments on drum fills, timing/quantization, and mixing — none queued in this pass, so no forward link yet.
