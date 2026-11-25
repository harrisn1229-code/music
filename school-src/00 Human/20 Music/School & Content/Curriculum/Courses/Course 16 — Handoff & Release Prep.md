---
type: school-course
course_id: "16"
domain: production
strands: [MIX, SMP]
class: "[[Class 7 — Vocals & Release]]"
depends_on: []
target_pct: 80
lessons: 3
concepts: 9
---

# Course 16 — Handoff & Release Prep

What has to be settled before a track leaves your computer: which decisions get baked in, what files go out and in what state, and what has to be cleared before anyone can hear it. Two strands, one question.

**What it assumes**

- Nothing. It's the one course in the school that can be taken at any point.

| Lesson | Title               | Concepts | Test                        |
| ------ | ------------------- | -------- | --------------------------- |
| 1    | The Commit Boundary | 2        | [[Course 16 — Lesson 1 Test]] |
| 2    | Delivery            | 5        | [[Course 16 — Lesson 2 Test]] |
| 3    | Clearance           | 2        | [[Course 16 — Lesson 3 Test]] |

**What this unlocks**

- Nothing downstream depends on it, which is exactly why it can run early and in parallel with a long theory course.
- [[Course 15 — Vocal Method]] — comping and tuning both sit on the *commit* side of Lesson 1's boundary, so this course decides how permanent they are.
- Practically: it's the difference between handing a mixing engineer a session they can work with and one they have to undo first.

> [!warning] The one mistake that can't be taken back
> Every other gap in the school is a knowledge gap you can close at leisure. These nine concepts govern **what leaves your computer**, and several of them can't be reversed after the fact — a limiter printed onto the 2-bus, or an uncleared sample on a released track.

## The lessons

### Lesson 1 — The Commit Boundary

**Read**
- [ ] [[Mix Handoff]] → *The commit boundary*, *Multitracks vs stems*

**The material**
- The governing rule: **[[MIX-C03 — Commit vs leave open|commit what defines what a part *is*; leave open everything about how parts *relate*.]]**
- **Commit:** character distortion, synthesis, creative effects, sample choice, tuning, timing edits. **Leave open:** track-to-track balance, corrective EQ, bus compression, reverb amounts, the 2-bus.
- The pair that gets reversed most often is **track-by-track EQ and compression** — those belong on the *leave open* side. They're relational, which makes them the engineer's decision rather than yours.
- The test for anything ambiguous: **if removing it would change what the part is, commit it. If removing it would only change how loud or bright it sits against its neighbours, leave it.**
- Then the file question. **[[MIX-C02 — Multitracks vs stems|Multitracks are every individual track]]** and they're what a mixing engineer wants. **Stems are grouped submixes**, for remixers and live playback. The words get used interchangeably and they aren't.

**Concepts**
- [[MIX-C02 — Multitracks vs stems]]
- [[MIX-C03 — Commit vs leave open]]

**Homework**
- [ ] **Review** — for ten elements in a current session, call each one commit or leave-open and say why. Include at least one you're unsure about, and apply the removal test to it.
- [ ] **Apply** (~15 min) — open your most recent session and freeze-and-flatten every element you called *commit*. Leave the open ones alone. Note how much faster the session loads afterwards.
- [ ] **Test** — [[Course 16 — Lesson 1 Test]]

### Lesson 2 — Delivery

**Read**
- [ ] [[Mix Handoff]] → *Delivery spec*, *Session organization*, *What to send alongside*, *Using a reference track properly*, *Mastering prep*

**The material**
- The limiter rule first, because it's the expensive one. **[[MIX-C01 — No limiter on the 2-bus|Nothing on the 2-bus.]]** Peaks at **−6 to −3 dBFS**, reached with a gain move rather than a processor. A limiter that pulled 8 dB off the peaks is 8 dB the engineer never gets to see.
- **[[MIX-C04 — Delivery spec|The spec]]:** native sample rate, 24-bit, WAV, no dither, consolidated from a common start, every track named for what it is. Format and headroom are the easy part; knowing *why* each line is what it is, is the lesson.
- **[[MIX-C05 — LUFS and streaming normalization|LUFS is integrated loudness over time]]**, and streaming platforms normalize to roughly **−14**. Mastering louder than that just gets turned down again — you lose dynamics and gain nothing.
- **[[MIX-C06 — Level-matching a reference|Level-match your reference track.]]** Anything louder sounds better, so an unmatched reference only tells you that it's louder. Use it for specific questions — low end, vocal position, brightness — not as a target to clone wholesale.
- **[[MIX-C07 — What a mastering engineer needs|What the mastering engineer needs]]** is the mix at that headroom, with the reference and a short note saying what you're after. What they can't do is put back dynamics you already printed away.

**Concepts**
- [[MIX-C01 — No limiter on the 2-bus]]
- [[MIX-C04 — Delivery spec]]
- [[MIX-C05 — LUFS and streaming normalization]]
- [[MIX-C06 — Level-matching a reference]]
- [[MIX-C07 — What a mastering engineer needs]]

**Homework**
- [ ] **Review** — run the checklist at the bottom of [[Mix Handoff]] against your most recent bounce and note every line that fails. Then say what −14 LUFS means for how loud you master.
- [ ] **Apply** (~15 min) — bounce one finished song to the full delivery spec: consolidated from bar 1, named, at the session sample rate, plus the reference track and a one-paragraph note. Put it in a folder you could send today without touching it again.
- [ ] **Test** — [[Course 16 — Lesson 2 Test]]

### Lesson 3 — Clearance

**Read**
- [ ] [[Sample Clearance]] — all of it; it's short

**The material**
- **[[SMP-C01 — The two rights|Two rights, not one.]]** The **master** is the recording; the **composition** is the song. Sampling uses both, and both have to be cleared separately, often by different owners.
- **Interpolation — replaying the part yourself — uses only the composition.** That's why it's the standard move on a recognizable hook: it halves the number of people who have to say yes.
- **[[SMP-C02 — Clear before release|Clear before release, never after.]]** Afterwards you're negotiating with no leverage, against someone who now knows the song is working.
- The consequences are concrete: takedown, frozen royalties, or a majority publishing share handed over. The musical difference between sampling and interpolation is obvious; the clearance difference is the one that costs money.

**Concepts**
- [[SMP-C01 — The two rights]]
- [[SMP-C02 — Clear before release]]

**Homework**
- [ ] **Review** — for one sample-based idea, name which of the two rights it uses and who would have to clear each. Then say what interpolating it instead would change.
- [ ] **Apply** (~15 min) — write that idea's clearance line into the session notes: source, which of the five routes in [[Sample Clearance]] applies, and the one action that would make it releasable. Then play it with the sample muted and decide whether the track survives.
- [ ] **Test** — [[Course 16 — Lesson 3 Test]]

## Course final

`/school final 16` when all three lessons are done. Eighteen questions across the nine concepts, weighted to applied scenarios rather than definitions — the point is whether the checklist fires while you're actually bouncing something. Pass at **80%**.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 16 — Final Exam]]

## Related

- [[Class 7 — Vocals & Release]]
- [[Mix Handoff]] · [[Sample Clearance]] — the two notes this course reads from
- [[Course 14 — Compressor Mechanics]] — [[FX-C01 — A limiter is a compressor]] is why the 2-bus rule reads the way it does
- [[Machine/Workflows/school]] · [[School Config]] · [[Techniques Index]]
