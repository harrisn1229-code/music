---
type: school-test
test_kind: lesson
course: "[[Course 14 — Compressor Mechanics]]"
class: "[[Class 6 — Sound Design]]"
lesson: 1
domain: production
questions: 9
pass_pct: 75
---

# Course 14 · Lesson 1 Test — What a Compressor Actually Is

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 14 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: FX-C01 · type: objective -->
What's the practical difference between a limiter and a compressor?

**A:** 

#### Q2
<!-- concept: FX-C01 · type: objective -->
Settings that would turn a compressor into something behaving like a limiter — give a ratio and an attack.

**A:** 

#### Q3
<!-- concept: FX-C01 · type: free-text -->
Explain how that one fact reframes the master-chain conversation. Say what a limiter on the 2-bus is actually doing to the person who receives the file.

**A:** 

#### Q4
<!-- concept: FX-C02 · type: objective -->
Define knee. Say what it is *not* — the control it gets confused with.

**A:** 

#### Q5
<!-- concept: FX-C02 · type: objective -->
Contrast hard and soft knee in terms of when the ratio engages.

**A:** 

#### Q6
<!-- concept: FX-C02 · type: objective -->
Which knee for transparent levelling, and which for catching peaks? Give a source for each.

**A:** 

#### Q7
<!-- concept: FX-C03 · type: objective -->
What is parallel compression, and which copy keeps its transients?

**A:** 

#### Q8
<!-- concept: FX-C03 · type: objective -->
It behaves like a different kind of compression entirely. Name it, and say what it's doing to the quiet parts.

**A:** 

#### Q9
<!-- concept: FX-C03 · type: free-text -->
Set up parallel compression two ways on the same drum bus. Describe both, and say which you'd keep in a real session and why.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 14 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **There isn't one in kind — a limiter is a compressor with a very high ratio, acting as a ceiling**
> Same device, extreme setting. Not a different category of tool.
>
> **Q2.** **A ratio around 20:1 with a fast attack**
> *Also accepted:* ∞:1 · a brickwall ratio · any very high ratio described as a ceiling
>
> **Q3.** **A limiter isn't a mastering object — it's a compressor squashing so hard nothing is left to work with**
> *Rubric (5):* says a limiter is the same device at an extreme setting rather than a special mastering tool (2) · says a limiter on the 2-bus removes the dynamic range the next person needs (2) · connects it to the rule about not sending a limited mix to a mastering engineer (1)
> Once a limiter stops being its own category, the master-chain question answers itself. What a limiter does is hold everything under a ceiling by compressing very hard at the top, and what a mastering engineer needs is the dynamic range that lives up there. Printing one onto the 2-bus doesn't hand over a louder mix — it hands over a mix whose loudest moments have already been decided and can't be undone, so every choice downstream is made against a signal that's already been flattened. The reframe matters because "it's a limiter, that's what masters use" is a category error rather than a mixing preference. Reach for one to audition how the mix will sit when it's loud, then take it off before the file leaves.
>
> **Q4.** **How abruptly the ratio engages — it isn't ratio, which is how extreme the compression is**
> The two get conflated constantly, and knee is most of why two compressors at identical settings sound different.
>
> **Q5.** **Hard applies the full ratio the instant threshold is crossed · soft eases it in over a window**
> The soft-knee window sits either side of the threshold. With a soft knee, compression has already begun gently before the threshold is properly reached.
>
> **Q6.** **Soft for transparent levelling — vocals, the mix bus · hard for catching peaks — drums**
> Hard knee is the choice on a drum bus when you want to hear the compressor working. It's also the choice when the compression is meant to be part of the sound rather than invisible.
>
> **Q7.** **Blend a heavily compressed copy underneath the dry signal — the dry path keeps its transients**
> You get density and sustained detail without losing punch, because nothing was taken away from the untouched copy.
>
> **Q8.** **Upward compression — it lifts the quiet parts rather than pushing the loud ones down**
> The loud moments are still arriving at full height from the dry path; what the crushed copy adds is body underneath them.
>
> **Q9.** **A return track with a crushed send, or the stock device's Dry/Wet knob — the knob, in a session**
> *Rubric (5):* describes the return-track version — send the bus to a return, compress that hard, blend it under (2) · describes the one-device version using a Dry/Wet control at around 50% (2) · picks one with a reason, such as the single device being simpler to recall, automate and move with the track (1)
> The two are the same thing built differently. On a return, you send the drum bus out to a track carrying a heavily compressed copy and ride the return's fader to decide how much body comes back; the original stays untouched on its own channel. In one device, you put a compressor directly on the bus, set it to crush, and use Dry/Wet to blend the untreated signal back in — the device is doing the parallel split internally. Null-tested at matched settings they behave the same. In a session the single device usually wins, because it lives on the channel it belongs to, moves and duplicates with it, and doesn't leave an orphaned return behind when the track gets rearranged. The return version earns its place when several sources should share one crushed copy.

## ✅ End of test
