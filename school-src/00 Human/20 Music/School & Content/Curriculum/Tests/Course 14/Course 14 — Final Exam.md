---
type: school-test
test_kind: final
course: "[[Course 14 — Compressor Mechanics]]"
class: "[[Class 6 — Sound Design]]"
lesson: 
domain: production
questions: 12
pass_pct: 85
---

# Course 14 · Final Exam — Compressor Mechanics

- 12 questions · pass at **85%** · two per concept, cumulative across both lessons
- The bar is higher than the school default on purpose: six concepts is a small enough surface that leaving it at "mostly" isn't worth doing
- Passing completes the course and seeds all six concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 14` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FX-C01 · type: objective -->
State the relationship between a limiter and a compressor, and give settings that demonstrate it.

**A:** 

#### Q2
<!-- concept: FX-C01 · type: objective -->
Given that relationship, say what printing a limiter onto the 2-bus costs the person who receives the file.

**A:** 

#### Q3
<!-- concept: FX-C02 · type: objective -->
Define knee, name the control it's routinely confused with, and say why knee explains a lot of why two compressors at identical settings sound different.

**A:** 

#### Q4
<!-- concept: FX-C02 · type: objective -->
Which knee would you put on a lead vocal, and which on a drum bus you want to hear pumping? Say why in each case.

**A:** 

#### Q5
<!-- concept: FX-C03 · type: objective -->
Describe parallel compression, and say why it produces density without costing punch.

**A:** 

#### Q6
<!-- concept: FX-C03 · type: free-text -->
Parallel compression is described as behaving like upward compression. Explain what that means and why the description is accurate.

**A:** 

#### Q7
<!-- concept: FX-C04 · type: objective -->
When do you reach for multiband instead of broadband? Give the trigger and the failure mode.

**A:** 

#### Q8
<!-- concept: FX-C04 · type: objective -->
Only the low-mids of a vocal are misbehaving and you compress broadband anyway. Describe what the listener hears.

**A:** 

#### Q9
<!-- concept: FX-C05 · type: objective -->
Name the two things saturation does to a signal, and say which harmonics you'd want on a warm bass versus an aggressive one.

**A:** 

#### Q10
<!-- concept: FX-C05 · type: objective -->
Why does a saturated signal read louder at the same meter reading?

**A:** 

#### Q11
<!-- concept: FX-C06 · type: objective -->
Give the four-stage chain order and say why de-essing sits where it does.

**A:** 

#### Q12
<!-- concept: FX-C06 · type: free-text -->
Someone hands you a vocal chain with tone-shaping boosts before the compressor and the de-esser first in line. Say what each misplacement causes, and give the order you'd rebuild it in.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 14 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **A limiter is a compressor with a very high ratio acting as a ceiling — around 20:1, fast attack**
> Same device, extreme setting. Not a different category of tool.
>
> **Q2.** **The dynamic range at the top, which is what they need to work with**
> A limited mix arrives with its loudest moments already decided and no way to undo them, so every downstream choice is made against a signal that's already flat.
>
> **Q3.** **How abruptly the ratio engages — not ratio, which is how extreme it is**
> Two compressors set to the same ratio and threshold can behave very differently depending on how gradually each one brings that ratio in, and knee is usually where that difference lives.
>
> **Q4.** **Soft on the vocal for transparent levelling · hard on the drum bus so you hear it work**
> A soft knee begins compressing gently before the threshold is properly reached, so nothing announces itself. A hard knee slams the full ratio on at the crossing, which is what makes the compression part of the sound.
>
> **Q5.** **A crushed copy blended under the dry signal — the dry path keeps its transients**
> Nothing was taken away from the untouched copy, so the peaks arrive at full height while the compressed copy fills in underneath them.
>
> **Q6.** **It raises the quiet material instead of lowering the loud, which is what upward compression means**
> *Rubric (5):* says upward compression means lifting quiet parts rather than pushing loud ones down (2) · says the dry path delivers the peaks unchanged, so nothing is being reduced (2) · says the crushed copy contributes most in the quiet moments, since that's where its gain reduction is least (1)
> Ordinary downward compression reduces the distance between loud and quiet by attacking the loud end. Parallel compression closes the same gap from the other direction, and the mechanism is worth seeing clearly. The dry copy is untouched, so every peak still reaches its original height in the output. The crushed copy is heavily reduced during those peaks and barely reduced at all in the quiet passages, which means the amount it adds to the sum is largest exactly where the signal was quietest. Add the two and the low-level material has risen while the peaks have not, which is the definition of upward compression even though every device involved is compressing downward. That's also why it reads as density rather than as squash: nothing was removed, something was added underneath.
>
> **Q7.** **Reach for multiband when only part of the spectrum has the dynamic problem**
> The failure mode is that broadband sees one band's peaks and pulls the whole signal down with them.
>
> **Q8.** **The whole vocal dips on exactly the notes where the low-mids bloom**
> The top end that was fine gets ducked too, and because the ducking is locked to specific notes it reads as a performance problem rather than as processing.
>
> **Q9.** **It generates new harmonics and rounds transient peaks — even-order for warm, odd-order for aggressive**
> Even-order harmonics sit at octaves and read full and warm. Odd-order add edge and grit, which is what an aggressive bass wants.
>
> **Q10.** **Because rounding the peaks lets the average level rise without the meter moving**
> Loudness is perceived from the average rather than from the peak, so taking the tops off buys level the meter never reports.
>
> **Q11.** **Subtractive EQ → compression → de-ess → tone-shaping EQ**
> De-essing goes after compression because compression raises the esses. Reducing the body brings sibilance up relative to it, so the right amount to remove is only knowable once the compressor has run.
>
> **Q12.** **Boosts get squashed on the way in · the de-esser treats a balance that no longer exists**
> *Rubric (5):* says a boost before the compressor is immediately pulled back down, so the tone-shaping never survives (2) · says de-essing first removes sibilance that compression will then raise again, so the take ends up sibilant anyway (2) · gives the correct rebuild order — subtractive EQ, compression, de-ess, tone-shaping EQ (1)
> Both mistakes come from the same habit of ordering a chain by what feels most urgent rather than by what each stage needs to see. A presence lift placed ahead of the compressor is a signal you've deliberately made louder in a specific range, handed to a device whose entire job is to make loud things quieter — so the compressor works hardest on precisely the frequencies you just raised, and the lift arrives at the output smaller than you set it and moving in level besides. The de-esser in front has the mirror problem: it removes the sibilance present in the raw take, then the compressor reduces the body underneath and the remaining esses come back up in relative terms, so the take is sibilant again with a de-esser doing nothing useful. Rebuild it as subtractive EQ first, so the compressor isn't reacting to rumble or plosives; compression second; de-essing third, against the balance the listener will actually hear; and tone-shaping boosts last, where nothing downstream can undo them.

## ✅ End of test
