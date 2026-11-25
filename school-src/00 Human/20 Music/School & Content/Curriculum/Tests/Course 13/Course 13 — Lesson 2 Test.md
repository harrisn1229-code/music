---
type: school-test
test_kind: lesson
course: "[[Course 13 — Signal Path & Synthesis Methods]]"
class: "[[Class 6 — Sound Design]]"
lesson: 2
domain: production
questions: 9
pass_pct: 75
---

# Course 13 · Lesson 2 Test — Envelopes

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 13 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SYN-C02 · type: objective -->
In ADSR, which parameters are times and which are levels?

**A:** 

#### Q2
<!-- concept: SYN-C02 · type: objective -->
Decay is a time. Say what journey it's describing, from where to where.

**A:** 

#### Q3
<!-- concept: SYN-C02 · type: objective -->
Set sustain to 100%. What does the decay knob now do, and why?

**A:** 

#### Q4
<!-- concept: SYN-C02 · type: free-text -->
Filing decay as a level is the classic ADSR misread. Explain what goes wrong for someone holding that model, and how sustain differs from all three others.

**A:** 

#### Q5
<!-- concept: SYN-C03 · type: objective -->
Give the four ADSR settings that make a pluck.

**A:** 

#### Q6
<!-- concept: SYN-C03 · type: objective -->
Which single parameter *is* the pluck? Say what the patch becomes if you raise it.

**A:** 

#### Q7
<!-- concept: SYN-C03 · type: objective -->
Name the pairing that creates character rather than just shape, and say what "snap" actually is.

**A:** 

#### Q8
<!-- concept: SYN-C03 · type: objective -->
Name the four envelope shapes that cover most of what you'll build.

**A:** 

#### Q9
<!-- concept: SYN-C03 · type: free-text -->
Build a pad, an organ and a bass from the same initialized patch. For each, say what sustain and release are doing and why.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 13 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Sustain is the only level — attack, decay and release are all times**
>
> **Q2.** **From the attack peak down to the sustain level**
> It sets how long that fall takes, not how far it falls. How far is sustain's job.
>
> **Q3.** **Nothing — there's no distance left to travel**
> The attack peak and the sustain level are the same height, so the journey decay describes has zero length however long you give it.
>
> **Q4.** **They read decay as "how loud it settles", so the knob seems broken**
> *Rubric (5):* says the misread is treating decay as a level rather than a duration (1) · says the consequence is that the knob appears not to do what's expected, because it's setting the speed of a fall rather than its depth (2) · says sustain is a destination rather than a duration, and lasts exactly as long as the key is held (2)
> Someone holding the wrong model turns the decay knob expecting the note to get quieter and instead hears the same note reach the same place slightly sooner or later. That's confusing enough that people conclude the envelope is behaving oddly, when it's doing exactly what it says. Decay describes a journey — start at the peak the attack reached, travel down to whatever height sustain is set to — and the only thing the knob controls is how long that trip takes. Sustain is the odd one out in a second way too: attack, decay and release all end on their own, but sustain has no duration of its own at all. It lasts precisely as long as the key is held, which is why it's a level and not a time.
>
> **Q5.** **Attack near zero · short decay · sustain at or near zero · short release**
> All the energy is front-loaded and then gone, which is what "pluck" means.
>
> **Q6.** **Sustain at zero — raise it and it stops being a pluck and becomes a bass**
> Attack and decay are the intuitive two, and sustain is the one that decides what the patch is. With sustain up the note holds for as long as you hold the key, which is a different instrument.
>
> **Q7.** **The filter envelope plus envelope amount — snap is the sound changing while it plays**
> An amp envelope alone gives you a shape. Bright at the attack and darkening immediately after is what actually sells a pluck, and only a filter envelope can do that.
>
> **Q8.** **Pluck · pad · organ · bass**
> *Also accepted:* stab in place of organ · swell in place of pad
> A stab is the organ shape, not the pluck shape — attack 0, sustain 100%, release 0. It's fully on while held and fully off when released, which is the opposite of a pluck's sustain at zero.
>
> **Q9.** **Pad holds and rings on · organ holds and stops dead · bass holds at a lower level and decays fast**
> *Rubric (5):* pad — sustain high with a long attack and a long release, so it swells in and rings on after the key is let go (2) · organ — sustain full with near-zero attack and near-zero release, so it's on while held and off the instant it isn't (2) · bass — sustain present but below the peak, with a short release so notes don't overlap into mud (1)
> All three come from the same four controls and differ almost entirely in sustain and release. The pad's job is to be continuous, so sustain sits high and release is long enough that consecutive chords overlap and blur into each other — the tail is a feature. The organ is the opposite discipline: sustain at full so the note doesn't change at all while held, and both attack and release near zero so the sound is a rectangle, present or absent with nothing in between. That abruptness is what makes it read as an organ rather than as a synth pad with the tail cut off. The bass sits between them, with sustain below the attack peak so there's still a shape to each note, and a short release specifically to keep the low end clean — a long release on a bass is where overlapping fundamentals come from.

## ✅ End of test
