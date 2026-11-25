---
type: school-course
course_id: "10"
domain: production
strands: [DRM]
class: "[[Class 5 — Beat & Arrangement]]"
depends_on: []
target_pct: 80
lessons: 3
concepts: 10
---

# Course 10 — Drum Programming & Beat Construction

Drum **sound** and drum **programming**: building the sounds instead of repairing them, making a quantized grid read as something a person played, and giving a loop internal form. [[Course 05 — Subdivision, Feel & Genre]] covers the theory of time and stops where the DAW starts. This is the other side of that line.

**What it assumes**

- Nothing. Lesson 1 starts at the parts of a kick drum.

| Lesson | Title                               | Concepts | Test                        |
| ------ | ----------------------------------- | -------- | --------------------------- |
| 1    | The Sounds                          | 3        | [[Course 10 — Lesson 1 Test]] |
| 2    | Making a Grid Read as a Performance | 4        | [[Course 10 — Lesson 2 Test]] |
| 3    | Loop Form and Energy Tiers          | 3        | [[Course 10 — Lesson 3 Test]] |

**What this unlocks**

- [[Course 11 — Bass Writing & Design]] — its first instruction is "groove first, bass second", which assumes the groove is finished. That's this course.
- [[Course 12 — Arrangement & Song Form]] — the three-changes tier method in Lesson 3 is arrangement at loop scale; Course 12 runs the same idea at song scale.
- Practically: drums stop being something you fix in the mix and start being right where they're made.

> [!info] Taught from zero
> This course assumes **no prior knowledge and skips nothing.** Lesson 1 begins at "what are the parts of a kick", not one rung above it. Some of it will be revision, and revision is the cheap error — skipping the thing you didn't actually know is the expensive one.
>
> If a lesson turns out to be entirely known, run `/school test 10` early rather than sitting through it. **The test is the gate; the lessons are the route.**

## The lessons

### Lesson 1 — The Sounds

**Read**
- [ ] [[Kick Design]] → *Why synthesize a kick*, *Anatomy of a synth kick*, *Layering + placement*
- [ ] [[Snare Design]] → *Anatomy of a synth snare*
- [ ] [[Sampling and Sound Selection]]

**The material**
- The habit to unlearn first: **[[DRM-C01 — Selection is the fix; processing is not|stacking processing on a kick that doesn't hit]].** Compressor after compressor, EQ after EQ, chasing something the sample was never going to do.
- The fix is almost always upstream — pull the sample, audition another, drop the chain back to nothing. **A chain fixes a close-but-not-quite sample; it doesn't rescue a wrong one.**
- Synthesising instead gives you [[DRM-C02 — Anatomy of a synth kick|four parts to control]]: **body** (a pitched sine or triangle, tuned to the root, 200–450 ms decay), **pitch envelope** (+12 to +36 semitones falling to zero over 15–40 ms — the "pew" that reads as punch), **click** (a sub-10 ms noise or HF layer), and light **saturation** so it survives a phone speaker.
- Add a **Hold stage of 30–50 ms** before Decay, so the decay only ever shapes the tail rather than eating the body.
- Then the decision that ties drums to harmony: **[[DRM-C03 — Tune the kick to the key — and what to do when the key is too low|tune the kick to the song's root]].** Latch's kick hits F every bar and establishes a key the track otherwise avoids. When the root is too low to be usable, tune to the fifth above and let it bend.

**Concepts**
- [[DRM-C01 — Selection is the fix; processing is not]]
- [[DRM-C02 — Anatomy of a synth kick]]
- [[DRM-C03 — Tune the kick to the key — and what to do when the key is too low]]

**Homework**
- [ ] **Review** — name the four parts of a synth kick and a starting value for each. Then say what you'd do with a kick in C minor that flaps speakers.
- [ ] **Apply** (~15 min) — build a kick from a sine in Operator using only body, pitch envelope, click and saturation. Tune it to the root of a track in progress, then A/B it against the sample you were using.
- [ ] **Test** — [[Course 10 — Lesson 1 Test]]

### Lesson 2 — Making a Grid Read as a Performance

**Read**
- [ ] [[Rhythm and Groove]] → *Humanization*, *Ghost notes and note length*
- [ ] [[Pocket and Microtiming]] in full

**The material**
- **[[DRM-C04 — Why one-click humanize fails on drums|One-click humanize does not work on drums]]**, and the reason generalises: it scatters timing *randomly* within a threshold, while a real drummer's deviations are **informed** — by feel, by groove, by experience. A few hits land well by luck and the whole thing reads as badly played.
- What works instead is a rule about **metric role**. **[[DRM-C05 — Anchors stay on-grid; secondaries go late|Anchor hits stay exactly on-grid]]** at static velocity — primary kick, primary snare — because the groove needs something dependable underneath it.
- **Secondary hits take the variation** — ghost snares, offbeat claps — shifted **late, never early**, by a *different* amount each time, since uniform lateness reads as a setting rather than a player. The rule follows the role, not the instrument: a hi-hat marking a strong beat alone stays on-grid, because it has inherited the anchoring job.
- **[[DRM-C06 — Ghost notes are a second pass — and they are the push-pull|Ghost notes are a second pass]].** Finish kick, snare and hat completely, then go back and hunt the gaps. They aren't decoration — the ear leans toward an expected strong beat, gets a syncopated ghost instead, and that displaced anticipation *is* the pleasurable tension in a groove.
- **[[DRM-C07 — Velocity range, not velocity value|Velocity is the one place randomisation genuinely models a player]]**: drag a **range**, not a value, so every pass differs. Keep the band narrow — too wide reads as inconsistent rather than natural.

**Concepts**
- [[DRM-C04 — Why one-click humanize fails on drums]]
- [[DRM-C05 — Anchors stay on-grid; secondaries go late]]
- [[DRM-C06 — Ghost notes are a second pass — and they are the push-pull]]
- [[DRM-C07 — Velocity range, not velocity value]]

**Homework**
- [ ] **Review** — say which hits get nudged late and by how much, and why velocity randomisation works where timing randomisation doesn't.
- [ ] **Apply** (~15 min) — take a quantized beat. Nudge only the off-8th hats late by varying amounts, leave the anchors alone, then add a ghost-snare pass. A/B against an auto-humanized copy of the same beat.
- [ ] **Test** — [[Course 10 — Lesson 2 Test]]

### Lesson 3 — Loop Form and Energy Tiers

**Read**
- [ ] [[Rhythm and Groove]] → *Pattern-level form*
- [ ] [[Arrangement and Song Form]] → the energy-tier bullets
- [ ] [[Layering and Stacking]]

**The material**
- A 4-bar loop that reads as one bar is the commonest failure at this scale. The fix is **[[DRM-C08 — A-B-A-C inside a single loop|A-B-A-C inside the loop]]**: a simple kick pattern on the A bars and a syncopated one on B, each paired with the **inverse** hat treatment — strong-beat hats under the busy kick, syncopated hats under the simple one.
- The two elements keep trading who anchors and who plays around, so the pattern doesn't read as repetition until the full cycle completes.
- Then **[[DRM-C09 — The three-changes energy tier method|the three-changes tier method]]**, the concrete cure for loop-itis at clip level. Write the sparsest **Intro** that still works, duplicate it for **A**, and make exactly **three changes** — each either an existing element made more active or a new element added, each immediately obvious and present throughout. Three more for **B**.
- A *swap* counts as a change: jingle bell to ride, toms pitched up into a new voice. Past a point, thin out rather than stack. Crashes and tom fills are transitional and don't count toward the three.
- Starting a song with four energy-tiered clips already built means four jumping-off points instead of one basket to overfill.
- Last, physical plausibility. **[[DRM-C10 — Choke groups — a real kit can't do that|A real kit can't ring an open hat through a closed one]]**, so enable *cut itself* on the group. The same goes for overlapping bass tails, which are worse. The four-limb ceiling is that constraint applied to writing rather than to tails.

**Concepts**
- [[DRM-C08 — A-B-A-C inside a single loop]]
- [[DRM-C09 — The three-changes energy tier method]]
- [[DRM-C10 — Choke groups — a real kit can't do that]]

**Homework**
- [ ] **Review** — name the three changes from Intro to A on a beat you've built, and say what doesn't count as one.
- [ ] **Apply** (~15 min) — take a 1-bar loop and expand it to A-B-A-C with inverse hat treatments. Then build Intro/A/B/Outro at three changes per tier, writing down what the three were each time.
- [ ] **Test** — [[Course 10 — Lesson 3 Test]]

## Course final

`/school final 10` — twenty questions across the ten concepts. Pass at **80%**. Sit it early if the lessons read as already known: the test is the gate, the lessons are the route.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 10 — Final Exam]]

## Related

- [[Class 5 — Beat & Arrangement]]
- [[Rhythm and Groove]] · [[Kick Design]] · [[Snare Design]] · [[Pocket and Microtiming]] · [[Genre Drum Patterns]] · [[Layering and Stacking]]
- [[Course 05 — Subdivision, Feel & Genre]] — the theory half; genre pattern shapes there, execution here
- [[5 Tips for Realistic Drums that Slap]] · [[Pattern Creation - Realistic Drum Programming - The Ultimate Guide (Part 2)]] · [[Sample Selection and Manipulation - Realistic Drum Programming - The Ultimate Guide (Part 1)]] — source videos
- [[Machine/Workflows/school]] · [[School Config]]
