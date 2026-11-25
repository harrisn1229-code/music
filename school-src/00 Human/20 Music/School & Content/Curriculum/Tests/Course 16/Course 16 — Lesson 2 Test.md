---
type: school-test
test_kind: lesson
course: "[[Course 16 — Handoff & Release Prep]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 2
domain: production
questions: 12
pass_pct: 75
---

# Course 16 · Lesson 2 Test — Delivery

- 12 questions · pass at **75%**
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school test 16 2` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: MIX-C01 · type: objective -->
Should there be a limiter on the 2-bus of a mix you're sending to be mastered? Give the peak level you deliver at and how you get there.

**A:** 

#### Q2
<!-- concept: MIX-C01 · type: objective -->
A limiter pulled 8 dB off your peaks. Say what that actually costs, in the engineer's terms.

**A:** 

#### Q3
<!-- concept: MIX-C01 · type: objective -->
You want the engineer to hear your loudness intent. What's the correct way to communicate it?

**A:** 

#### Q4
<!-- concept: MIX-C04 · type: objective -->
Recite the delivery spec — format, rate, depth, dither, headroom, consolidation, naming.

**A:** 

#### Q5
<!-- concept: MIX-C04 · type: objective -->
Two lines of the spec get missed most. Name them and say why each one matters.

**A:** 

#### Q6
<!-- concept: MIX-C05 · type: objective -->
What does LUFS measure, and what is it explicitly not?

**A:** 

#### Q7
<!-- concept: MIX-C05 · type: objective -->
Streaming platforms normalize to roughly what target? Say what happens to a master pushed to −7.

**A:** 

#### Q8
<!-- concept: MIX-C05 · type: free-text -->
Explain why mastering louder than the normalization target is a losing trade. Be specific about what you lose and what you gain.

**A:** 

#### Q9
<!-- concept: MIX-C06 · type: objective -->
What is a reference track for, and what's the one step that makes it work?

**A:** 

#### Q10
<!-- concept: MIX-C06 · type: objective -->
What should you use a reference to answer, and what should you not use it for?

**A:** 

#### Q11
<!-- concept: MIX-C07 · type: objective -->
List what a mastering engineer needs from you.

**A:** 

#### Q12
<!-- concept: MIX-C07 · type: free-text -->
Name four things that make a mastering engineer's job harder, and say which of them can't be undone at all.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 16 — Lesson 2 Test
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **No — take it off. Peaks at −6 to −3 dBFS, reached with a gain move**
> A fader or a clip-gain move, not a processor. Nothing on the 2-bus at all.
>
> **Q2.** **8 dB of information deleted before they ever see the file — and there's no undoing it**
> It isn't headroom you saved. The dynamic range that lived up there is gone from the audio, so every decision downstream is made against a signal that's already been flattened.
>
> **Q3.** **Send both versions, clearly labelled**
> They get the unprocessed mix to work from and a reference for where you wanted it to end up. Nothing is lost and nothing is guessed at.
>
> **Q4.** **WAV at native rate · 24-bit · no dither · peaks −6 to −3 dBFS · consolidated · named**
> Consolidated means every file starts from the same timeline zero; named means named for what the track is.
> *Also accepted:* AIFF in place of WAV · never MP3
>
> **Q5.** **Native sample rate and no dither**
> Don't convert the rate — conversion artifacts are permanent, and there's no reason to introduce them on the way out. Don't dither either: dither belongs on the last step of the last process, and that step isn't yours.
>
> **Q6.** **Integrated perceived loudness over time — not peak level**
> Peak tells you the single highest sample. LUFS tells you how loud the thing actually sounds across its length, which is what a listener and a platform both respond to.
>
> **Q7.** **Around −14 LUFS — a master pushed to −7 simply gets turned down on playback**
> The platform undoes the loudness and keeps the damage.
>
> **Q8.** **You lose dynamics and gain nothing, because the platform turns it back down**
> *Rubric (5):* says the platform normalizes to its target regardless of how loud the master is (2) · says the loudness advantage is therefore erased on playback (1) · says the dynamic range spent achieving it is not restored, so the track ends up at the same level with less life in it (2)
> The trade only made sense in an era when louder actually played louder. Now the platform measures integrated loudness and adjusts playback gain to hit its target, so two masters delivered at −7 and −14 arrive at the listener's ears at the same level. What differs is what happened on the way. The −7 master bought its loudness by limiting and compressing the peaks away, and that reduction is printed into the audio — normalization turns the whole file down uniformly, which restores the level but not the transients. The result is a track that plays no louder than the competition and has less punch, less depth and less distance between its quiet and loud sections. The one honest exception is material heard outside normalized playback, which is a small enough case that it shouldn't drive the master.
>
> **Q9.** **A finished commercial record in the same lane, used as an external anchor — level-match it**
> Anything louder sounds better, so an unmatched reference only tells you that it's louder.
>
> **Q10.** **Use it for specific questions — low end, vocal position, brightness — not as something to clone wholesale**
> Cloning a reference produces a worse version of someone else's record. Answering three specific questions against it produces a better version of yours.
>
> **Q11.** **The mix at real headroom with nothing on the 2-bus, plus a reference and a note on intent**
> Full-resolution WAV at native rate, 24-bit. For a release, also the running order and the gaps between tracks.
>
> **Q12.** **An already-limited mix · sample-rate conversion · an MP3 in the lineage · a problem buried in the mix**
> *Rubric (5):* names an already-limited mix as the first and worst (2) · names sample-rate conversion and an MP3 anywhere in the lineage (1) · names a problem buried in the mix, which mastering can only make louder rather than fix (1) · identifies the limiting, the conversion and the MP3 as irreversible, since all three delete information from the file (1)
> Three of the four are permanent and one merely wastes everyone's time. A limiter that pulled the peaks down has removed dynamic range that no process can reconstruct. Sample-rate conversion introduces artifacts that stay in the file whatever is done afterward. An MP3 anywhere in the chain — even a bounce that was compressed once and re-imported — has discarded content the encoder judged inaudible, and it is not coming back. Those are the irreversible three, and they share a shape: information deleted before the file changed hands. The fourth is different in kind. A problem buried in the mix, a boxy low-mid or a vocal sitting too far back, is still fixable, just not by mastering — the tools there act on the whole programme, so all mastering can do is make the problem louder along with everything else. The fix for that one is a message and a revised bounce.

## ✅ End of test
