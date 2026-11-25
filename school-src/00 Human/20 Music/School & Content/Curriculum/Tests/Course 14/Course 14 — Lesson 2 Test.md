---
type: school-test
test_kind: lesson
course: "[[Course 14 — Compressor Mechanics]]"
class: "[[Class 6 — Sound Design]]"
lesson: 2
domain: production
questions: 9
pass_pct: 75
---

# Course 14 · Lesson 2 Test — Choosing and Ordering

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 14 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FX-C04 · type: objective -->
State the difference between multiband and broadband compression in one line.

**A:** 

#### Q2
<!-- concept: FX-C04 · type: objective -->
Give the failure mode that makes the choice obvious in practice.

**A:** 

#### Q3
<!-- concept: FX-C04 · type: free-text -->
A vocal's low-mids bloom on certain notes. Say exactly what a broadband compressor does to that take, and what multiband does instead.

**A:** 

#### Q4
<!-- concept: FX-C05 · type: objective -->
Beyond "warmth" — what does saturation do to a signal?

**A:** 

#### Q5
<!-- concept: FX-C05 · type: objective -->
Contrast even-order and odd-order harmonics: where each sits and what each reads as.

**A:** 

#### Q6
<!-- concept: FX-C05 · type: objective -->
Name the second thing saturation does, and the consequence for how loud a track reads at the same meter reading.

**A:** 

#### Q7
<!-- concept: FX-C06 · type: objective -->
Give the four-stage chain order for a vocal.

**A:** 

#### Q8
<!-- concept: FX-C06 · type: objective -->
Say why de-essing goes *after* compression, not before.

**A:** 

#### Q9
<!-- concept: FX-C06 · type: free-text -->
For each of the four stages, say what it's protecting the next one from. Then name the exception this order makes to the "compress first, EQ after" rule.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 14 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Multiband compresses one range · broadband compresses the whole signal**
>
> **Q2.** **With broadband, one bad band drags everything down with it**
> Knowing the trigger is the easy half. The failure mode is what makes the decision obvious at the desk.
>
> **Q3.** **Broadband ducks the whole vocal on exactly those notes — multiband ducks only the low-mids**
> *Rubric (5):* says the broadband compressor sees the low-mid peak and pulls the entire signal down (2) · says the top end that was fine gets ducked along with it, on precisely the notes where the problem occurs (2) · says multiband compresses only the offending range and leaves the rest untouched (1)
> The detail that matters is *when* it happens. It isn't that broadband makes the vocal generally quieter — it's that the ducking is locked to the notes where the bloom occurs, so the take develops a rhythm of the whole voice dipping on particular words. That reads as a performance problem rather than as a processing artefact, which is why it can go undiagnosed for a long time. Multiband splits the signal so the detector for the low-mid band only sees the low-mids, and the compression it applies stays there. The presence and air keep their level throughout, and what you've fixed is the thing that was actually wrong.
>
> **Q4.** **It generates new harmonic content that wasn't in the source**
> Which harmonics is the choice you're actually making, and that's what turns it from a texture into a decision.
>
> **Q5.** **Even-order sit at octaves and read warm and full · odd-order add edge and grit**
> The 2nd is the characteristic even harmonic and the 3rd the characteristic odd one.
>
> **Q6.** **It rounds transient peaks — so the signal reads louder and denser at the same meter reading**
> Taking the tops off the peaks lets the average level come up without the meter moving, which is perceived as loudness.
>
> **Q7.** **Subtractive EQ → compression → de-ess → tone-shaping EQ**
>
> **Q8.** **Because pulling the body down raises the esses**
> Compression brings the quieter material up relative to the peaks, so sibilance that was in proportion before compression is out of proportion after it. De-essing first treats a balance that no longer exists by the time the listener hears it.
>
> **Q9.** **Clean up so the compressor isn't chasing rumble · then compress · then catch the raised esses · boost last**
> *Rubric (5):* subtractive EQ first protects the compressor from reacting to rumble and mic bumps it was never meant to hear (2) · de-essing after compression catches sibilance that compression has raised (1) · tone-shaping boosts last so a presence lift isn't immediately squashed by the compressor (1) · names the exception — cut non-musical content before the compressor, even though the general rule is compress first and EQ after (1)
> Each stage exists to hand the next one a signal it can act on sensibly. Corrective cuts go first because a compressor's detector doesn't know that the 60 Hz rumble and the plosive aren't part of the vocal — it just sees level, and it will duck the whole take to control content nobody was ever going to hear. Compression then works on a signal made only of the thing you care about. De-essing comes next because compression has changed the balance it needs to judge: reducing the body raises the esses relative to it, so the amount of sibilance to remove is only knowable after the compressor has run. Tone-shaping boosts go last for the mirror-image reason — a presence lift placed before the compressor is a lift the compressor will immediately pull back down. The exception this makes to "compress first, EQ after" is narrow and deliberate: cut non-musical content before the compressor, and leave everything else until afterward.

## ✅ End of test
