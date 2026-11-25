---
type: school-test
test_kind: final
course: "[[Course 15 — Vocal Method]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 
domain: production
questions: 14
pass_pct: 85
---

# Course 15 · Final Exam — Vocal Method

- 14 questions · pass at **85%** · cumulative across all three lessons
- Weighted to the treatment hierarchy and the rap material
- The bar is higher than the school default on purpose: the material is short and procedural, so there's no reason to leave it partly held
- Passing completes the course and seeds all seven concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 15` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: VOX-C01 · type: objective -->
Define proximity effect, say which mics it applies to, and name the EQ move it can replace.

**A:** 

#### Q2
<!-- concept: VOX-C02 · type: objective -->
Give the comping criteria in order, and say why the first one outranks the third.

**A:** 

#### Q3
<!-- concept: VOX-C02 · type: free-text -->
You've built a comp from the best fragment of every word and it's technically flawless. Say what's likely wrong with it and how you'd find out.

**A:** 

#### Q4
<!-- concept: VOX-C03 · type: objective -->
Give the rule for when not to tune, and one genre where it applies most.

**A:** 

#### Q5
<!-- concept: VOX-C03 · type: objective -->
Which error is more common and more damaging, over-tuning or under-tuning? Say why it's hard to notice at the time.

**A:** 

#### Q6
<!-- concept: VOX-C04 · type: objective -->
What does retune speed control, and what does the fast end cost you?

**A:** 

#### Q7
<!-- concept: VOX-C04 · type: objective -->
Both ends of the dial are legitimate. So what's the actual mistake?

**A:** 

#### Q8
<!-- concept: VOX-C05 · type: objective -->
State the treatment hierarchy as one principle.

**A:** 

#### Q9
<!-- concept: VOX-C05 · type: objective -->
Give pan, level and processing for a lead, a double, a harmony and an ad-lib.

**A:** 

#### Q10
<!-- concept: VOX-C05 · type: free-text -->
Explain why the hierarchy works rather than just asserting it. Use a specific processing decision that's right on one part and wrong on another.

**A:** 

#### Q11
<!-- concept: VOX-C06 · type: objective -->
Why doesn't a copied-and-pasted double thicken anything, and what does delaying it give you instead?

**A:** 

#### Q12
<!-- concept: VOX-C07 · type: objective -->
Give the line the whole rap lesson follows from, and the compression approach that follows from it.

**A:** 

#### Q13
<!-- concept: VOX-C07 · type: objective -->
Where do rap doubles go, what is the ad-lib pass for, and what happens to the breaths?

**A:** 

#### Q14
<!-- concept: VOX-C07 · type: free-text -->
This course says comp by phrase and edit timing by syllable. Show that those aren't in conflict, and say what each rule is actually protecting.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 15 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Bass response rises as a directional mic gets closer — directional only — replaces a low-end cut**
> An omni has essentially none, which is why it suits a singer who moves. Backing off is the same fix as an EQ cut made at the source, where it costs nothing.
>
> **Q2.** **Delivery, then pitch, then timing, then tone — delivery wins because timing is fixable and delivery isn't**
> You can move a syllable. You can't put conviction into a phrase that didn't have any.
>
> **Q3.** **It's probably a Frankenstein comp — put it against your best single full take**
> *Rubric (5):* identifies it as a comp assembled too finely, where the performance stops being continuous (2) · says every fragment can be locally correct while the whole fails to read as one gesture (1) · gives the check — A/B against the best single pass, and use the single take if the comp doesn't beat it (2)
> Technical flawlessness is the warning sign rather than the reassurance. Each fragment genuinely is the best version of that word, which is why nothing looks wrong on inspection, but a sung phrase has direction across it — the singer pushing and easing through the line as one movement — and cutting between takes every few hundred milliseconds destroys that even when every join is inaudible. What's left is a run of correct moments that don't add up. Finding out takes two minutes: line the comp up against your best single full pass and listen to both. If the comp doesn't beat it, the comping session was work spent making the take worse, and the honest move is to keep the single take and fix its two worst moments instead.
>
> **Q4.** **Don't tune when the deviation is the expression — blues and soul most of all**
> That phrasing lives between the notes, so a scoop or a note leaned into flat is doing the work the correction would remove.
>
> **Q5.** **Over-tuning — it's invisible while you're doing it and obvious a week later**
> Every individual correction looks like an improvement, and nothing on screen reports what's been lost, because the display shows deviation and deviation is what you've been removing.
>
> **Q6.** **How fast correction pulls a note to pitch — the fast end costs scoops, slides and vibrato**
> Fast retune steps the vibrato rather than letting it move, which is often the reason the take was worth keeping.
>
> **Q7.** **Reaching for fast retune to fix a pitch problem and getting the effect by accident**
> Choosing either end deliberately is fine. Arriving at one without deciding to is not.
>
> **Q8.** **The further a part is from delivering the lyric, the more it can become texture**
>
> **Q9.** **Lead centre and present · doubles wide and under · harmonies lower · ad-libs widest and furthest back**
> Processing gets heavier the further down the list you go: the lead takes the least, the ad-libs the most. Doubles shouldn't be heard as separate parts. Harmonies are colour rather than content.
>
> **Q10.** **Because processing that would bury a lyric is free on a part not carrying one**
> *Rubric (5):* says the lead has to stay parseable word by word, so anything obscuring intelligibility is a cost there (2) · says a part not delivering the lyric has no such constraint, so the same processing becomes an option rather than a cost (1) · gives a specific decision that's right in one place and wrong in another — for example a long wide reverb, or heavy modulation (2)
> The hierarchy isn't a stylistic convention, it's a consequence of what each part is for. Take a long, wide, heavily wet reverb. On an ad-lib it's exactly right: the part exists to fill space and suggest atmosphere, nobody is transcribing it, and smearing it across the stereo field is the whole point. Put the identical send on the lead and the words stop resolving — the tail of one syllable is still sounding under the next, consonants get lost in the wash, and the listener has to work to follow the line. Nothing about the reverb changed; what changed is whether the part had a job that the reverb interferes with. The same reasoning covers panning and level: a lead has to be centred and forward because attention should land on it without effort, and an ad-lib should be neither because it's supporting the space around the thing you're meant to hear.
>
> **Q11.** **It's the same performance twice, so it just sums louder — delay it and you get comb filtering or slapback**
> The variation between two genuine performances is what does the thickening, and a copy has none of it.
>
> **Q12.** **Rap is a rhythmic performance — you're producing pocket, not pitch — so compress harder and faster**
> Presence over beauty, because the lyric has to stay parseable over a loud beat.
>
> **Q13.** **On bar-ends and key phrases · the ad-lib pass fills the space the lead leaves · keep the breaths**
> The double is an accent rather than a texture, so doubling the whole verse flattens it. The ad-lib pass is structural rather than decoration. Breaths are the punctuation in a dense verse.
>
> **Q14.** **They act on different things — one picks the performance, the other places a syllable**
> *Rubric (5):* says comping by phrase is about choosing which performance to use (2) · says syllable-level editing is about where a syllable lands in time, once the take is chosen (2) · says the two rules protect continuity of performance and accuracy of pocket respectively, which are different properties (1)
> The apparent conflict comes from reading both rules as being about edit size, when they're about different operations. Comping is a selection problem: you're deciding which of several performances of a phrase to keep, and the reason to work in phrases is that a performance has continuity across one — chop the selection finer and you get a sequence of correct fragments that no longer reads as somebody singing. Timing editing is a placement problem on material already chosen: the performance is settled, and you're moving where individual syllables land relative to the grid. That has to happen at syllable resolution because pocket is a syllable-scale property — a line can be a few milliseconds late in one word and right everywhere else. So the two rules protect two different things. Phrase-level comping protects continuity of performance; syllable-level timing protects accuracy of pocket. Applying either rule at the other's scale is what causes the damage.

## ✅ End of test
