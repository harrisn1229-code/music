---
type: school-test
test_kind: final
course: "[[Course 10 — Drum Programming & Beat Construction]]"
class: "[[Class 5 — Beat & Arrangement]]"
lesson: 
domain: production
questions: 20
pass_pct: 80
---

# Course 10 · Final Exam — Drum Programming & Beat Construction

- 20 questions · pass at **80%** · cumulative across all three lessons
- Passing completes the course and seeds all ten concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 10` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: DRM-C01 · type: objective -->
A kick isn't hitting. What's the first move, and what's the move you're avoiding?

**A:** 

#### Q2
<!-- concept: DRM-C01 · type: objective -->
What can a processing chain fix, and what can't it fix?

**A:** 

#### Q3
<!-- concept: DRM-C02 · type: objective -->
Name the four parts of a synthesised kick.

**A:** 

#### Q4
<!-- concept: DRM-C02 · type: objective -->
Give a starting value for the pitch envelope: how far it drops, and over how long.

**A:** 

#### Q5
<!-- concept: DRM-C02 · type: objective -->
What is the Hold stage for, and roughly how long?

**A:** 

#### Q6
<!-- concept: DRM-C03 · type: objective -->
A track is in D minor. What note is the kick tuned to?

**A:** 

#### Q7
<!-- concept: DRM-C03 · type: objective -->
The root is too low to be usable. What's the fix?

**A:** 

#### Q8
<!-- concept: DRM-C04 · type: free-text -->
Explain why random timing scatter reads as bad playing rather than as human playing.

**A:** 

#### Q9
<!-- concept: DRM-C05 · type: objective -->
Which hits stay on-grid and which take the variation? Give the rule that decides.

**A:** 

#### Q10
<!-- concept: DRM-C05 · type: objective -->
Late or early for the secondaries, and why?

**A:** 

#### Q11
<!-- concept: DRM-C05 · type: objective -->
Why must the amount differ hit to hit?

**A:** 

#### Q12
<!-- concept: DRM-C06 · type: objective -->
When do you write ghost notes, and why at that point?

**A:** 

#### Q13
<!-- concept: DRM-C06 · type: free-text -->
What are ghost notes doing to the listener's expectations? Answer in terms of the push-pull.

**A:** 

#### Q14
<!-- concept: DRM-C07 · type: objective -->
What do you set for velocity, and what goes wrong if the band is too wide?

**A:** 

#### Q15
<!-- concept: DRM-C07 · type: objective -->
Why does randomising velocity model a real player when randomising timing doesn't?

**A:** 

#### Q16
<!-- concept: DRM-C08 · type: objective -->
Give the structure that stops a 4-bar loop reading as one bar, and describe the hat treatment.

**A:** 

#### Q17
<!-- concept: DRM-C08 · type: objective -->
Why is the hat treatment inverted rather than matched to the kick?

**A:** 

#### Q18
<!-- concept: DRM-C09 · type: objective -->
Give the tier method: starting point, how many changes, and what counts as one.

**A:** 

#### Q19
<!-- concept: DRM-C09 · type: objective -->
The section still feels flat after three changes. What does the method say to do?

**A:** 

#### Q20
<!-- concept: DRM-C10 · type: free-text -->
Choke groups exist to model something a real kit does. Name the constraint, say what setting implements it, and give one other place in a beat where the same thinking applies.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 10 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Bypass the chain and audition other samples — avoid adding more processing**
> Selection is the fix; processing is not.
>
> **Q2.** **It refines a close-but-not-quite sample; it can't rescue a wrong one**
> Processing improves a choice that was nearly right. It doesn't convert a bad choice into a good one.
>
> **Q3.** **Body · pitch envelope · click · saturation**
> *Also accepted:* sub/tone for body · transient/noise for click
>
> **Q4.** **Up 12 to 36 semitones, falling to zero over 15–40 ms**
> That fast drop is the "pew" the ear reads as punch.
>
> **Q5.** **To hold the body before the decay starts — roughly 30–50 ms**
> With Hold in place the decay only ever shapes the tail instead of eating the body.
>
> **Q6.** **D**
> *Also accepted:* the root · or A, the fifth above, as a deliberate alternative
>
> **Q7.** **Tune to the fifth above and let it bend**
> *Also accepted:* tune up an octave · let a click layer carry the audibility
>
> **Q8.** **Because real deviation is informed and random deviation isn't**
> *Rubric (5):* says random scatter is undirected (2) · says a real drummer's timing follows feel, groove and the role of each hit (2) · notes that a few hits landing well by luck doesn't rescue the rest (1)
> A drummer's timing errors aren't errors — they track what the hit is for, where the groove sits, and how hard the phrase is pushing. Random scatter has none of that structure, so it destroys the dependable anchor a groove needs and replaces it with noise. The result reads as someone playing badly, which is worse than reading as a machine, because a machine at least sounds deliberate.
>
> **Q9.** **Anchors on-grid, secondaries take the variation — the rule follows the metric role, not the instrument**
> A hat marking a strong beat alone is an anchor; the same hat on offbeats is a secondary.
>
> **Q10.** **Late — it reads as relaxed and heavy, where early reads as rushed**
>
> **Q11.** **Because a uniform offset reads as a setting rather than as a player**
> Everything equally late just sounds slow.
>
> **Q12.** **As a second pass, after kick, snare and hats are finished**
> Placing them earlier means writing against a pattern that hasn't settled.
>
> **Q13.** **The ear leans toward an expected strong beat and gets a syncopated ghost instead**
> *Rubric (5):* says the listener anticipates the strong beat (2) · says the ghost lands off that expectation (2) · names the displaced anticipation as the tension that makes it groove (1)
> Expectation is the raw material. The listener's attention leans forward toward where the next strong hit should be, and a ghost note arrives adjacent to it rather than on it. That small gap between anticipated and actual is the push-pull — it's why a groove pulls you along rather than just keeping time, and it's why ghost notes are structural rather than decorative.
>
> **Q14.** **A range, not a value — too wide reads as inconsistent rather than natural**
>
> **Q15.** **Because real players genuinely do vary how hard they hit, without deciding to**
> Nobody's timing wanders randomly, so randomising it models nothing.
>
> **Q16.** **A-B-A-C, with the hats inverted against the kick on each bar**
> The A bars take a simple kick with syncopated hats; B takes a busy kick with strong-beat hats. Whatever the kick is doing, the hats do the opposite.
>
> **Q17.** **So something is always anchoring while something else plays around**
> Matching them would make both elements busy at once and both plain at once, which the ear reads in a single bar.
>
> **Q18.** **Sparsest Intro, duplicate for A, exactly three changes — an element made more active, or a new one added**
> Each change must be immediately obvious and present throughout. A swap counts; crashes and tom fills don't.
>
> **Q19.** **Thin out rather than stack — don't add a fourth change**
> Past a point, more elements stop reading as more energy.
>
> **Q20.** **A kit can't ring an open hat through a closed one — enable *cut itself*. Bass tails too**
> *Rubric (5):* names the open/closed hi-hat constraint (2) · names *cut itself* or an equivalent choke setting (1) · gives a second application — bass or 808 tails, or the four-limb ceiling (2)
> One pair of hats can only be in one state at a time, so an open hat ringing underneath a closed one is physically impossible and the ear notices even when it can't say why. Enabling *cut itself* on the group makes each new hit stop the previous one. The same reasoning applies to overlapping bass or 808 tails, where the consequence is worse because two sustaining low notes sum unpredictably rather than just sounding odd. The four-limb ceiling is the same constraint applied to what you write rather than to what rings.
## ✅ End of test
