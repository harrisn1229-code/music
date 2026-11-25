---
type: school-test
test_kind: lesson
course: "[[Course 16 — Handoff & Release Prep]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 1
domain: production
questions: 9
pass_pct: 75
---

# Course 16 · Lesson 1 Test — The Commit Boundary

- 9 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 16 1` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: MIX-C03 · type: objective -->
State the governing rule of the handoff in one sentence.

**A:** 

#### Q2
<!-- concept: MIX-C03 · type: objective -->
Name four things you commit.

**A:** 

#### Q3
<!-- concept: MIX-C03 · type: objective -->
Name four things you leave open.

**A:** 

#### Q4
<!-- concept: MIX-C03 · type: objective -->
Which pair gets put on the wrong side most often? Say which side it actually belongs on and why.

**A:** 

#### Q5
<!-- concept: MIX-C03 · type: objective -->
Give the test for anything ambiguous.

**A:** 

#### Q6
<!-- concept: MIX-C03 · type: free-text -->
Say what goes wrong if you over-commit, and what goes wrong if you under-commit.

**A:** 

#### Q7
<!-- concept: MIX-C02 · type: objective -->
Define multitracks and stems, and say which a mixing engineer wants.

**A:** 

#### Q8
<!-- concept: MIX-C02 · type: objective -->
Who are stems actually for? Name at least two uses.

**A:** 

#### Q9
<!-- concept: MIX-C02 · type: free-text -->
An engineer is handed four stems instead of multitracks and asks for the snare to come forward. Say what they can and can't do, and why the two words aren't interchangeable.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 16 — Lesson 1 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Commit what defines what a part *is*; leave open everything about how parts *relate***
>
> **Q2.** **Character distortion · synthesis · creative effects · sample choice**
> *Also accepted:* tuning and timing edits on vocals · sample chops · arrangement, meaning what plays when
>
> **Q3.** **Track-to-track balance · corrective EQ · bus compression · reverb amounts**
> *Also accepted:* delay amounts · stereo width decisions on the mix as a whole · the 2-bus entirely
>
> **Q4.** **Track-by-track EQ and compression — they're relational, so they belong on the leave-open side**
> They describe how a part sits against its neighbours rather than what the part is, which makes them the engineer's decision rather than yours.
>
> **Q5.** **If removing it would change what the part is, commit it — if it would only change how it sits, leave it**
> Loud or bright relative to its neighbours is a relational property. Being a distorted sound rather than a clean one is not.
>
> **Q6.** **Over-commit and they work around you · under-commit and they mix somebody else's record**
> *Rubric (5):* says over-committing removes decisions the engineer needs, forcing them to undo or work around what's printed (2) · says under-committing hands over parts whose identity isn't settled, so the engineer ends up making creative choices that were yours (2) · notes that the boundary exists to split creative decisions from relational ones (1)
> The two failures are opposite and both expensive. Over-committing means printing relational choices — the track-by-track EQ, the bus compression, a bit of level riding — into files the engineer can't unpick. They now have to fight the mix decisions already in the audio before making their own, and some of them can't be undone at all. Under-committing is the subtler one. If the creative distortion isn't printed, if the tuning is live, if the timing edits are unrendered, then the sound the engineer receives isn't the sound you wrote, and the choices they make to finish it are creative choices you handed over by accident. The boundary is drawn where it is because it splits the two kinds of decision cleanly: what the part is belongs to you, how the parts sit together belongs to them.
>
> **Q7.** **Multitracks are every individual track · stems are grouped submixes — send multitracks**
> Each mic, each synth, each vocal layer, unbundled. Send multitracks unless they've specifically asked otherwise.
>
> **Q8.** **Remixers · live playback**
> *Also accepted:* sync licensing
>
> **Q9.** **They can't touch the snare without also touching the kick**
> *Rubric (5):* says a drum stem is already a mixed group, so any move on the snare hits everything in that group (2) · says the request is answerable with multitracks and effectively isn't with stems (1) · says the two words describe different deliverables and are routinely used as if they were the same thing (2)
> A four-stem delivery has already made the decision the engineer was hired to make. The snare lives inside a drum submix that also contains the kick, the hats and the percussion, printed at a fixed balance, so bringing it forward means bringing the whole kit forward — or reaching for something desperate like dynamic EQ around the snare's fundamental, which is repair rather than mixing. With multitracks the request is a fader move and takes two seconds. That's the whole reason the distinction matters and the reason the loose usage is worth correcting: stems are a legitimate deliverable for remixers, live playback and sync, where a small number of pre-balanced files is exactly what's wanted. They just aren't what a mixing engineer asked for, and sending them looks like cooperation while removing most of what they were going to do.

## ✅ End of test
