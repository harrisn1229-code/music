---
type: school-test
test_kind: final
course: "[[Course 16 — Handoff & Release Prep]]"
class: "[[Class 7 — Vocals & Release]]"
lesson: 
domain: production
questions: 18
pass_pct: 80
---

# Course 16 · Final Exam — Handoff & Release Prep

- 18 questions · pass at **80%** · two per concept, cumulative across all three lessons
- Weighted to applied scenarios rather than definitions — the point is whether the checklist fires while you're actually bouncing something
- Passing completes the course and seeds all nine concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 16` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: MIX-C03 · type: objective -->
State the commit boundary as one rule, and give the test for anything ambiguous.

**A:** 

#### Q2
<!-- concept: MIX-C03 · type: objective -->
Sort these five: a saturated bass patch, the vocal's corrective EQ, the drum bus compressor, the tuning on the lead, the reverb send amount.

**A:** 

#### Q3
<!-- concept: MIX-C02 · type: objective -->
An engineer asks for "the stems". What do you send, and what do you ask?

**A:** 

#### Q4
<!-- concept: MIX-C02 · type: free-text -->
Say why sending stems to a mixing engineer looks cooperative and isn't. Use a concrete request they'd be unable to fulfil.

**A:** 

#### Q5
<!-- concept: MIX-C01 · type: objective -->
Give the 2-bus rule, the target peaks, and how you reach them.

**A:** 

#### Q6
<!-- concept: MIX-C01 · type: objective -->
You've mixed into a limiter all week and the mix sounds wrong without it. What do you actually send?

**A:** 

#### Q7
<!-- concept: MIX-C04 · type: objective -->
Recite the full delivery spec.

**A:** 

#### Q8
<!-- concept: MIX-C04 · type: objective -->
Your session runs at 48 kHz and the engineer's studio runs at 44.1. What sample rate do you export at, and why?

**A:** 

#### Q9
<!-- concept: MIX-C05 · type: objective -->
What does LUFS measure, what's the streaming target, and what happens above it?

**A:** 

#### Q10
<!-- concept: MIX-C05 · type: objective -->
Two masters of the same song, one at −7 LUFS and one at −14. Say what a listener on a streaming platform hears.

**A:** 

#### Q11
<!-- concept: MIX-C06 · type: objective -->
Give the one step that makes a reference track useful, and say what happens without it.

**A:** 

#### Q12
<!-- concept: MIX-C06 · type: objective -->
Name three specific questions worth taking to a reference.

**A:** 

#### Q13
<!-- concept: MIX-C07 · type: objective -->
You're sending a mix off to be mastered today. List what goes in the folder and what the note says.

**A:** 

#### Q14
<!-- concept: MIX-C07 · type: free-text -->
Of the four things that make a mastering engineer's job harder, three are irreversible and one isn't. Name all four, say which is which, and explain the difference.

**A:** 

#### Q15
<!-- concept: SMP-C01 · type: objective -->
Name the two rights, and say which ones sampling and interpolation each need.

**A:** 

#### Q16
<!-- concept: SMP-C01 · type: objective -->
Someone tells you interpolation means you don't need to clear anything. Correct them.

**A:** 

#### Q17
<!-- concept: SMP-C02 · type: objective -->
Give the timing rule and the reason behind it, then name three costs of getting it wrong.

**A:** 

#### Q18
<!-- concept: SMP-C02 · type: free-text -->
A track built on a recognizable sample is finished and you want to release it next month. Walk the routes available and say which questions decide it.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 16 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Commit what defines what a part is; leave open how parts relate**
> The test: if removing it would change what the part is, commit it. If removing it would only change how loud or bright it sits against its neighbours, leave it.
>
> **Q2.** **Commit the saturated bass and the tuning · leave the other three open**
> The corrective EQ, the drum bus compressor and the reverb send amount all stay open. The first two define what those parts are. The other three describe how parts sit against each other, which makes them the engineer's decisions.
>
> **Q3.** **Send multitracks and ask whether they really meant grouped submixes**
> The words get used interchangeably and they aren't the same deliverable, so the word alone doesn't tell you which one they want. The rule is to send multitracks unless they've specifically asked for grouped submixes — and one question settles which of the two this was.
>
> **Q4.** **Because the balance is already printed — they can't move the snare without moving the kick**
> *Rubric (5):* gives a concrete request that stems make impossible, such as bringing the snare forward without the rest of the kit (2) · says a stem is a pre-balanced group, so the decisions the engineer was hired to make are already baked in (2) · notes that it looks cooperative because it's fewer, tidier files (1)
> Four neat files feel like a considerate handoff, and that's exactly the problem — the tidiness came from making decisions that weren't yours. Ask for the snare to come up two decibels and there's no snare to move: it's inside a drum submix printed at a fixed balance alongside the kick, the hats and the percussion. The engineer can reach for dynamic EQ around the snare's fundamental, which is repair rather than mixing and audibly so, or they can raise the whole kit. With multitracks it's a fader move that takes a second. Stems are a real deliverable with real uses — remixers, live playback, sync — where a small number of pre-balanced files is precisely what's wanted. They're just not what a mixing engineer asked for, and sending them removes most of what they were going to do.
>
> **Q5.** **Nothing on the 2-bus — peaks at −6 to −3 dBFS, reached with a gain move**
> A fader or clip-gain move rather than a processor.
>
> **Q6.** **Both, clearly labelled — the unprocessed mix to work from, the limited one as your intent**
> Nothing is lost and nothing has to be guessed at. What you don't do is send only the limited version and hope they can work backwards, because they can't.
>
> **Q7.** **WAV at native rate · 24-bit · no dither · peaks −6 to −3 dBFS · consolidated · named**
> Consolidated means every file starts from the same timeline zero, and named means named for what it is. Never MP3. AIFF is fine in place of WAV.
>
> **Q8.** **48 kHz — the session's native rate**
> Conversion artifacts are permanent, and converting is their call rather than yours. Sample-rate conversion has to happen somewhere, and it should happen once, downstream, by someone who knows what the destination is.
>
> **Q9.** **Integrated perceived loudness over time, not peak · target around −14 · anything louder gets turned down**
> The platform undoes the loudness and keeps the damage.
>
> **Q10.** **The same playback level — but the −7 one has less punch and less depth**
> Normalization matches the levels, so the loudness the limiter bought is erased. What it doesn't do is give back the transients that were flattened to buy it.
>
> **Q11.** **Level-match it — without that, all it tells you is that it's louder**
> Anything louder sounds better, so an unmatched reference sends you chasing a loudness difference with EQ and compression. That's how references make mixes worse.
>
> **Q12.** **Low end · vocal position · brightness**
> *Also accepted:* stereo width · how much low-mid the mix carries · where the drums sit against the music
>
> **Q13.** **The mix at native rate and 24-bit with nothing on the 2-bus, the reference track, and a note on intent**
> For a release, also the running order and the gaps between tracks. The note says what you're after in a paragraph, not a specification.
>
> **Q14.** **A limited mix, rate conversion and an MP3 are permanent · a buried mix problem isn't**
> The four are an already-limited mix, sample-rate conversion, an MP3 anywhere in the lineage, and a problem buried in the mix.
> *Rubric (5):* names all four (1) · identifies the limiting, the conversion and the MP3 as irreversible, since each deletes information from the file (2) · says a buried mix problem is still fixable but not by mastering, whose tools act on the whole programme and can only make the problem louder (2)
> The three irreversible ones share a shape: something was thrown away before the file changed hands. A limiter that pulled the peaks down removed dynamic range no process can reconstruct. Sample-rate conversion leaves artifacts baked into the audio. An MP3 anywhere in the chain, including a bounce that was encoded once and re-imported, has discarded content the encoder judged inaudible and it isn't coming back. None of those is a preference the engineer can work around — they're subtractions from the material itself. The fourth is different in kind rather than degree. A boxy low-mid or a vocal sitting too far back is entirely fixable, just not with mastering tools, which act on the whole programme and will therefore raise the problem along with everything else. That one has a cheap remedy the others don't: a message and a revised bounce.
>
> **Q15.** **Master is the recording, composition is the song · sampling needs both, interpolation one**
> Interpolation needs the composition only.
> The master usually sits with the label, the composition with the songwriters and their publishers.
>
> **Q16.** **Wrong — replaying a melody still uses the composition, so publishing still has to clear it**
> "I played it myself" is not a defence. What interpolation removes is the master side and therefore the label, which halves the negotiation rather than ending it.
>
> **Q17.** **Clear before release, always — afterwards you have no leverage**
> The costs: takedown, frozen royalties, and a majority publishing share.
> After release you're negotiating with someone who knows the song is working, and who is pricing a party that has already infringed rather than one of many requests.
>
> **Q18.** **Interpolate it if you can · otherwise full clearance**
> Either way, decide now whether the song is worth a possible majority publishing split.
> *Rubric (5):* checks whether the source is identified and whether it came from a licensed library or royalty-free pack (1) · proposes interpolation as the route that drops the master side and halves the negotiation (2) · says full clearance through a service or attorney is the only route to a specific famous recording, and is slow enough that next month may not be realistic (1) · frames the decision as whether the song is worth a possible majority publishing split, decided before release rather than after (1)
> Start by ruling out the easy exits. If the sample came from a licensed library or a royalty-free pack, both rights are already handled and there's nothing to do. If the source isn't identified, nothing can be cleared at all and that has to be solved first. Then the real fork: can you replay the part yourself? Interpolation uses only the composition, which takes the label out of the conversation entirely and leaves a single publisher to negotiate with — usually faster, usually cheaper, always fewer parties. If the specific recording is the point and interpolation won't do, the only remaining route is full clearance through a service or an attorney, and that is the slow and expensive one, slow enough that a release next month is probably not a realistic plan. What decides it is the last question rather than any of the technical ones: on a recognizable sample, holders routinely ask for a significant publishing share and a piece of the master, so is this song worth that trade? Answer it now. A great flip you can't release is a beat, not a song, and finding that out after the mix is the expensive way to learn it.

## ✅ End of test
