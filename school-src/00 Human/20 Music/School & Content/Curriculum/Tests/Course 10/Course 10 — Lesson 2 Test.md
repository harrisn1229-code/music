---
type: school-test
test_kind: lesson
course: "[[Course 10 — Drum Programming & Beat Construction]]"
class: "[[Class 5 — Beat & Arrangement]]"
lesson: 2
domain: production
questions: 11
pass_pct: 75
---

# Course 10 · Lesson 2 Test — Making a Grid Read as a Performance

- 11 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 10 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: DRM-C04 · type: free-text -->
A one-click humanize function scatters timing randomly within a threshold. Explain why that produces a worse result than leaving the beat quantized.

**A:** 

#### Q2
<!-- concept: DRM-C05 · type: objective -->
Which hits in a groove stay exactly on the grid, and which ones take the timing variation?

**A:** 

#### Q3
<!-- concept: DRM-C05 · type: objective -->
Secondary hits get shifted late. Why not early, and why a different amount each time?

**A:** 

#### Q4
<!-- concept: DRM-C05 · type: objective -->
A hi-hat is the only thing marking beat 3 in a bar. On-grid or nudged? Say what decides it.

**A:** 

#### Q5
<!-- concept: DRM-C06 · type: objective -->
When in the process do you write ghost notes, and why then rather than as you go?

**A:** 

#### Q6
<!-- concept: DRM-C06 · type: free-text -->
Ghost notes are often described as decoration. What are they actually doing to the listener?

**A:** 

#### Q7
<!-- concept: DRM-C07 · type: objective -->
Velocity randomisation works where timing randomisation doesn't. What's the difference?

**A:** 

#### Q8
<!-- concept: DRM-C07 · type: objective -->
You're setting velocity on a hat pattern. What do you drag, and what happens if the band is too wide?

**A:** 

#### Q9
<!-- concept: DRM-C05 · type: objective -->
Roughly what is the rule in one sentence — what decides whether a given hit moves?

**A:** 

#### Q10
<!-- concept: DRM-C04 · type: objective -->
What word describes a real drummer's timing deviations, as opposed to random ones?

**A:** 

#### Q11
<!-- concept: DRM-C06 · type: free-text -->
You've nudged your secondaries late and added a ghost pass, and it still sounds programmed. Working from this lesson only, name two things you'd check.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 10 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Because random deviation reads as badly played, not as human.**
> A drummer's timing is *informed* — by feel, by the groove, by which hits are load-bearing. Random scatter puts a few hits in the right place by luck and the rest anywhere, so the pattern loses the dependable anchor a groove needs while gaining nothing that reads as intention. A quantized beat at least sounds deliberately machine-like.
> *Rubric (5):* says the deviation is random rather than informed (2) · says real deviation follows feel/groove/role (2) · notes that the result reads as bad playing rather than as human (1)
>
> **Q2.** **Anchors stay on-grid; secondaries take the variation.**
> Anchors are the primary kick and primary snare, held at static velocity too. Secondaries are ghost snares, offbeat claps and the like.
>
> **Q3.** **Late reads as relaxed; early reads as rushed. A varying amount stops it reading as a setting.**
> Everything equally late just sounds like the track is behind — a uniform offset is audibly a knob, not a player. Late is the direction that suggests weight rather than panic.
>
> **Q4.** **On-grid** — the role decides, not the instrument.
> A hat marking a strong beat alone has inherited the anchoring job, so it follows the anchor rule. The same hat playing offbeats between a kick and snare would take the variation.
>
> **Q5.** **As a second pass, after kick, snare and hats are completely finished.**
> Then go back and hunt the gaps. Writing them as you go means placing them against a pattern that isn't settled yet.
>
> **Q6.** **They create the push-pull — a displaced anticipation the ear reads as groove.**
> The ear leans toward an expected strong beat. A syncopated ghost arrives instead of that expected hit, and the small mismatch between what was anticipated and what landed is the pleasurable tension in a groove. That's a structural job, not ornamentation — remove the ghosts and the pattern goes flat rather than merely plainer.
> *Rubric (5):* says the ear anticipates a strong beat (2) · says the ghost lands somewhere else, displacing that expectation (2) · names the result as the tension or push-pull that makes it groove (1)
>
> **Q7.** **Velocity genuinely varies pass to pass in real playing; timing deviation is informed rather than random.**
> A drummer really does hit at slightly different strengths without deciding to, so randomising it models something true. Nobody's timing wanders randomly.
>
> **Q8.** **Drag a range, not a value** — too wide reads as inconsistent rather than natural.
> Setting a range means every pass differs. Keep the band narrow; a wide one sounds like someone who can't play evenly.
>
> **Q9.** **The rule follows the metric role, not the instrument.**
> *Also accepted:* whether the hit is anchoring or playing around · role not instrument
>
> **Q10.** **Informed.**
> *Also accepted:* intentional · deliberate · guided by feel
>
> **Q11.** **Whether the anchors are still truly static, and whether the velocity is a range rather than a value**
> *Rubric (5):* checks that anchors were left alone in timing and velocity (2) · checks velocity is randomised across a narrow range (2) · notes that uniform lateness on the secondaries would also flatten it (1)
> The two most common ways this still fails after the timing pass: the anchors drifted, so there's nothing dependable for the ear to measure the late hits against; or velocity is a fixed value, so every hit is the same strength no matter where it lands. A third worth checking is whether the secondaries all moved by the *same* amount, which turns the nudge back into a setting.
## ✅ End of test
