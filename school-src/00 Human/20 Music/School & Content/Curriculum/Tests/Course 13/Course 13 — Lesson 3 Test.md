---
type: school-test
test_kind: lesson
course: "[[Course 13 — Signal Path & Synthesis Methods]]"
class: "[[Class 6 — Sound Design]]"
lesson: 3
domain: production
questions: 10
pass_pct: 75
---

# Course 13 · Lesson 3 Test — Movement and Thickness

- 10 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 13 3` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SYN-C04 · type: objective -->
What is an LFO, and how does it differ from an audio-rate oscillator?

**A:** 

#### Q2
<!-- concept: SYN-C04 · type: objective -->
What do you actually hear when an LFO is running?

**A:** 

#### Q3
<!-- concept: SYN-C04 · type: objective -->
Push an LFO past roughly 20 Hz. What has it become, and what was the only thing you changed?

**A:** 

#### Q4
<!-- concept: SYN-C05 · type: objective -->
You want a pad that evolves across eight bars. Name what you'd modulate and what you'd modulate it with.

**A:** 

#### Q5
<!-- concept: SYN-C05 · type: objective -->
State the rule about what to modulate, and say how each of the two options reads to a listener.

**A:** 

#### Q6
<!-- concept: SYN-C05 · type: objective -->
Why mix envelopes with LFOs rather than using LFOs alone?

**A:** 

#### Q7
<!-- concept: SYN-C06 · type: objective -->
What does unison do, and what does detune do?

**A:** 

#### Q8
<!-- concept: SYN-C06 · type: objective -->
Walk unison from one voice to seven with detune at zero. What happens, and why?

**A:** 

#### Q9
<!-- concept: SYN-C06 · type: objective -->
Give the rule for subs and 808s, and name the second cost of wide detune.

**A:** 

#### Q10
<!-- concept: SYN-C06 · type: free-text -->
Detune usually gets the credit for thickness. Say where the thickening actually comes from, and what that mechanism predicts about checking the patch in mono.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 13 — Lesson 3 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **An oscillator running below hearing range, wired to a parameter instead of the output**
> Same circuit as an audio oscillator. Just slow, and routed to a knob.
>
> **Q2.** **Nothing — you hear what it moves**
> The LFO itself is never in the signal path, which is the distinction the name doesn't tell you.
>
> **Q3.** **It becomes FM — the only thing that changed was speed**
> Past the hearing threshold the modulation stops reading as movement and starts reading as tone. The line between modulation and audio is speed alone, which is why FM and this are the same idea.
>
> **Q4.** **A slow LFO or a long envelope on filter cutoff or wavetable position**
> Layer modulators at different rates — an 8-bar LFO on cutoff with a 1 to 2 bar one on position — so nothing repeats obviously.
>
> **Q5.** **Modulate timbre, not level — level reads as volume automation, timbre reads as alive**
> "Use an LFO" with no target is the incomplete version of the advice. The target is the rule.
>
> **Q6.** **An LFO is periodic and eventually reveals its loop · an envelope fires once per note**
> Mixing the two means some of the movement is tied to the playing rather than to a cycle, which is what keeps a long pad from giving itself away.
>
> **Q7.** **Unison stacks copies of the same oscillator · detune spreads them apart in pitch**
>
> **Q8.** **Almost nothing happens — identical copies at the same pitch just sum louder**
> There's no interaction between them to hear, so all you've bought is level.
>
> **Q9.** **Keep subs and 808s mono with no detune — and wide detuned voices can partially cancel in mono**
> Detune below roughly 150 Hz turns a defined pitch into a beating, undefined smear. If you want width down there, layer rather than detune.
>
> **Q10.** **From the copies beating against each other — which is why the patch has to be checked in mono**
> *Rubric (5):* says the thickening comes from the detuned copies beating against one another rather than from detune as an effect (2) · says unison is what supplies the copies, so it's doing the work detune gets credit for (1) · says wide detuned voices can partially cancel when summed to mono, so the patch must be checked there (2)
> Detune on its own is not a thickener — it's a pitch offset, and with one voice there's nothing to offset it against. What produces the sound people are after is interference: several near-identical copies slightly out of tune with each other, drifting in and out of phase, so the amplitude and the timbre wander continuously without anything being modulated. Unison supplies the copies and is therefore the half doing the work; detune just makes the copies non-identical enough to interact. The mechanism also tells you the failure mode. Interference that produces reinforcement in one speaker can produce cancellation when the channels are summed, so a huge stereo patch can arrive thin or hollow in mono. That isn't a mixing surprise to discover late — it's a predictable consequence of how the thickness was made, which is why the mono check belongs in the patch design rather than the mixdown.

## ✅ End of test
