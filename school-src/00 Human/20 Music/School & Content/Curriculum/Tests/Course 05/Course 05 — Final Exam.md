---
type: school-test
test_kind: final
course: "[[Course 05 — Subdivision, Feel & Genre]]"
class: "[[Class 2 — Reading & Rhythm]]"
lesson: 
domain: theory
questions: 16
pass_pct: 80
---

# Course 05 · Final Exam — Subdivision, Feel & Genre

- 16 questions · pass at **80%** · cumulative across all three lessons, weighted to feel and the genre parameters
- Passing completes the course and seeds all nine concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 05` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: RHY-C01 · type: objective -->
In 6/8, how many beats and what note value? Give the arithmetic that gets you there.

**A:** 

#### Q2
<!-- concept: RHY-C01 · type: objective -->
Apply the same rule to 12/8, and say why the beat unit is dotted.

**A:** 

#### Q3
<!-- concept: RHY-C02 · type: objective -->
Define syncopation and name its three forms.

**A:** 

#### Q4
<!-- concept: RHY-C02 · type: objective -->
State the condition syncopation depends on.

**A:** 

#### Q5
<!-- concept: RHY-C03 · type: objective -->
What does swing do to a pair of eighths, and how does a shuffle relate to a triplet?

**A:** 

#### Q6
<!-- concept: RHY-C03 · type: objective -->
Why is swing a dial rather than a switch?

**A:** 

#### Q7
<!-- concept: RHY-C06 · type: objective -->
Define pocket, give the two directions and the usable millisecond range.

**A:** 

#### Q8
<!-- concept: RHY-C06 · type: objective -->
What creates pocket rather than just sounding slow?

**A:** 

#### Q9
<!-- concept: RHY-C08 · type: objective -->
Quantize, humanize, groove template — say what each is for.

**A:** 

#### Q10
<!-- concept: RHY-C08 · type: objective -->
Why is partial quantize strength better than 100%?

**A:** 

#### Q11
<!-- concept: RHY-C04 · type: objective -->
Distinguish polyrhythm from hemiola.

**A:** 

#### Q12
<!-- concept: RHY-C05 · type: objective -->
What is half-time, and why does moving one hit change the perceived tempo?

**A:** 

#### Q13
<!-- concept: RHY-C07 · type: objective -->
Name the three parameters that separate genres, and contrast boom-bap with trap on all three.

**A:** 

#### Q14
<!-- concept: RHY-C07 · type: objective -->
What does "trap hats are triplets" get wrong?

**A:** 

#### Q15
<!-- concept: RHY-C06 · type: free-text -->
You've nudged every element in a loop 15 ms late and it sounds worse, not more relaxed. Explain what went wrong and what you should have done.

**A:** 

#### Q16
<!-- concept: RHY-C05 · type: free-text -->
Explain how half-time lets a trap beat be fast and slow at once, and name which of the three genre parameters is doing the work.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 05 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Two beats, dotted quarter — divide the top number by 3**
> Six eighths written, two dotted-quarter pulses felt.
>
> **Q2.** **Four beats, dotted quarter — three divisions per beat makes the unit dotted**
> Three eighths equals a dotted quarter exactly, so the beat can't be an undotted value.
>
> **Q3.** **Emphasis where the meter doesn't expect it — accent a weak position, tie over a strong one, or rest on it**
>
> **Q4.** **The meter has to stay in the listener's head**
> Remove the steady pulse and there's nothing left to play against.
>
> **Q5.** **Lengthens the first, shortens the second — a shuffle is a triplet with the middle note gone**
>
> **Q6.** **Because straight and full triplet are two endpoints, and every ratio between them is playable**
>
> **Q7.** **Where a part sits relative to the grid, on purpose — late is relaxed, early is urgent, 5–30 ms**
> Past about 40 ms it reads as a mistake.
>
> **Q8.** **Elements disagreeing — anchors on the grid, other parts behind**
> Pocket is a relationship between parts, not an offset applied to all of them.
>
> **Q9.** **Quantize for machine-tight parts · humanize for played-sounding parts · groove templates transfer feel**
> A template stores timing and velocity offsets from one piece of material for use on another.
>
> **Q10.** **50–75% pulls a performance toward the grid while keeping its feel**
> Full strength discards the feel entirely.
>
> **Q11.** **Polyrhythm stacks conflicting subdivisions; hemiola reorganises the grouping**
> Three against two at once, versus three groups of two against two groups of three.
>
> **Q12.** **The backbeat moves to beat 3, and the ear judges groove speed from snare placement**
> Written at 140, felt at about 70.
>
> **Q13.** **Tempo, backbeat placement, hi-hat subdivision**
> Boom-bap: ~90, backbeat on 2 and 4, straight 8ths. Trap: ~140 felt half-time, snare on 3, 16ths with rolls.
>
> **Q14.** **The bed is 16ths — the 32nds and triplets are rolls on top**
>
> **Q15.** **Everything moved together, so nothing anchors — nudge only the secondary elements**
> *Rubric (5):* says a uniform offset shifts the whole grid rather than creating a relationship (2) · says with no on-grid reference the result reads as slow or sloppy (1) · says the fix is to leave kick and snare on the grid and move only the hats or secondary parts (2)
> Pocket is differential. If every element moves by the same amount, the internal relationships are identical to the quantized version and all you've done is delay the loop — the listener has no on-grid reference to hear the lateness against, so it reads as the track dragging. The fix is to keep the anchors, usually kick and snare, exactly on the grid and push only the hats or secondary percussion behind them. The tension between the two is the feel.
>
> **Q16.** **The hats run at the written tempo, the backbeat at half — hi-hat subdivision is doing the work**
> *Rubric (5):* says the hi-hats subdivide the fast written tempo (2) · says the backbeat on 3 sets a slow felt pulse (2) · names hi-hat subdivision as the parameter supplying the fast layer (1)
> Two clocks. The snare on beat 3 halves the felt tempo, which is what a vocalist phrases against. Meanwhile the hats keep subdividing the actual 140 in 16ths, which is where the density and energy come from. Of the three genre parameters, hi-hat subdivision is the one supplying the fast layer — backbeat placement supplies the slow one, and the tempo itself never changes.
## ✅ End of test
