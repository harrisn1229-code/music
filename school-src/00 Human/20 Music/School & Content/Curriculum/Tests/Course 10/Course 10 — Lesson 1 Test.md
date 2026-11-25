---
type: school-test
test_kind: lesson
course: "[[Course 10 — Drum Programming & Beat Construction]]"
class: "[[Class 5 — Beat & Arrangement]]"
lesson: 1
domain: production
questions: 10
pass_pct: 75
---

# Course 10 · Lesson 1 Test — The Sounds

- 10 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 10 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: DRM-C01 · type: free-text -->
A kick feels weak in a beat. Before touching a single device, what should you do — and why is that the right order?

**A:** 

#### Q2
<!-- concept: DRM-C02 · type: objective -->
Name the three components of a synthesised kick.

**A:** 

#### Q3
<!-- concept: DRM-C02 · type: objective -->
Which part of a synth kick carries its **audibility on small speakers**, and which carries its **weight**?

**A:** 

#### Q4
<!-- concept: DRM-C02 · type: free-text -->
Why does a kick need a *pitch* envelope rather than just a volume envelope?

**A:** 

#### Q5
<!-- concept: DRM-C03 · type: objective -->
A track is in F minor. What note should the kick be tuned to?

**A:** 

#### Q6
<!-- concept: DRM-C03 · type: free-text -->
The key is B and tuning the kick to B puts it around 61 Hz, which is boomy on your system and vanishes on phones. What are your options?

**A:** 

#### Q7
<!-- concept: DRM-C03 · type: objective -->
When does tuning the kick to the key **stop mattering**?

**A:** 

#### Q8
<!-- concept: DRM-C01 · type: objective -->
Complete the principle in your own words: "Selection is the fix; ______ is not."

**A:** 

#### Q9
<!-- concept: DRM-C02 · type: objective -->
You want a kick that cuts through a dense mix without adding low end. Which layer do you reach for, and roughly where does it live?

**A:** 

#### Q10
<!-- concept: DRM-C03 · type: free-text -->
Your kick is tuned to the root and the 808 is playing the same root. What problem is coming, and what's the first thing to check?

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 10 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Bypass everything on the channel and audition replacement samples.**
> Selection is the fix; processing is not. A weak kick is nearly always the wrong sample rather than an under-processed one, and EQ or compression spent rescuing a bad choice costs more time and sounds worse than swapping to a sample that was already right. Processing should refine a sound that already works.
> *Rubric (5):* says audition/replace samples first (2) · says bypass or ignore processing while judging (1) · gives the reason — processing can't fix selection (2)
>
> **Q2.** The click/transient, the body/tone, and the pitch envelope
> The body is a pitched sine or triangle; the pitch envelope drops its pitch fast.
> *Also accepted:* attack/transient · sustain-body/sub · pitch sweep. Naming "noise layer" instead of click is fine.
>
> **Q3.** The **click/transient** carries audibility on small speakers; the **body/sub** carries weight.
> A phone has no output below roughly 200 Hz, so the transient is the entire kick down there.
>
> **Q4.** **Because the drop in pitch is what the ear reads as a drum being struck.**
> A sine with only a volume envelope reads as a short bass note, not a kick. A real drumhead is tightest at the moment of impact and slackens immediately, so the pitch falls fast — a fast downward pitch sweep is that physical behaviour, and without it the sound has no impact.
> *Rubric (5):* says the pitch drop creates the "hit" (2) · contrasts with a plain sine/bass note (1) · references the physical drumhead behaviour or the speed of the sweep (2)
>
> **Q5.** **F** — the root of the key.
> *Also accepted:* F · or the fifth (C) as a deliberate alternative.
>
> **Q6.** **Tune up an octave**
> to the B above (~123 Hz), which keeps it in key and audible. Other legitimate moves: tune to the **fifth** instead of the root; keep the sub in key and let a **click layer** carry the audibility; or accept an out-of-key kick if it's short enough that no pitch registers. The rule is that a kick only needs to be in key when it rings long enough for the ear to hear a pitch.
> *Rubric (5):* names octave-up as the primary fix (2) · offers a second option — fifth, layered click, or short-kick exemption (2) · notes that pitch only matters when the kick sustains (1)
>
> **Q7.** **When the kick is short enough that no pitch registers.**
> A tight, clicky kick with almost no tail has no audible fundamental to clash, so its tuning is irrelevant.
>
> **Q8.** **Processing.**
>
> **Q9.** **The click/transient layer**, in the upper mids — roughly **2–5 kHz**.
> It adds audibility and definition without touching the sub.
> *Also accepted:* anywhere in the 1–6 kHz region · or "the attack/noise layer" without a frequency.
>
> **Q10.** **They occupy the same fundamental, so they'll sum unpredictably**
> — sometimes reinforcing into a boom, sometimes partially cancelling so the low end disappears. That's a **phase** relationship, and the first thing to check is whether flipping the polarity of one makes the low end fuller. After that: sidechain the 808 to the kick, or separate them in time or in register so they aren't both fundamental at once.
> *Rubric (5):* identifies the frequency collision / same fundamental (2) · names phase or cancellation as the mechanism (2) · offers a concrete first move — polarity check, sidechain, or separation (1)

## ✅ End of test
