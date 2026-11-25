---
type: school-test
test_kind: final
course: "[[Course 13 — Signal Path & Synthesis Methods]]"
class: "[[Class 6 — Sound Design]]"
lesson: 
domain: production
questions: 18
pass_pct: 80
---

# Course 13 · Final Exam — Signal Path & Synthesis Methods

- 18 questions · pass at **80%** · cumulative across all four lessons
- Weighted to mechanism rather than vocabulary — why a filter can't brighten a sine matters more than being able to define one
- Passing completes the course and seeds all ten concepts to `maintenance`
- Fill in every `**A:**` line, then run the grade command at the bottom of the page
- Or run `/school final 13` to sit it in chat instead, one question at a time

---

#### Q1
<!-- concept: SYN-C01 · type: objective -->
Give the three blocks in order, what each does, and which envelope drives which.

**A:** 

#### Q2
<!-- concept: SYN-C01 · type: objective -->
A patch is dull however far you open the filter. Name the block at fault and the fix.

**A:** 

#### Q3
<!-- concept: SYN-C01 · type: free-text -->
State the corollary about filters and harmonics, and follow it through to two consequences the course draws from it.

**A:** 

#### Q4
<!-- concept: SYN-C02 · type: objective -->
Which ADSR parameters are times and which are levels? Say what decay is actually measuring.

**A:** 

#### Q5
<!-- concept: SYN-C02 · type: objective -->
Sustain is set to 100%. What does decay do, and why?

**A:** 

#### Q6
<!-- concept: SYN-C03 · type: objective -->
Give the pluck settings, and name the single parameter that decides whether it's a pluck at all.

**A:** 

#### Q7
<!-- concept: SYN-C03 · type: objective -->
What has to be added to an amp envelope to get a sound rather than a shape? Define "snap".

**A:** 

#### Q8
<!-- concept: SYN-C04 · type: objective -->
Define an LFO, and say what you're hearing when one is running.

**A:** 

#### Q9
<!-- concept: SYN-C04 · type: objective -->
Speed an LFO up past the hearing threshold. What have you built, and what does that say about the two ideas?

**A:** 

#### Q10
<!-- concept: SYN-C05 · type: objective -->
State the modulation rule, and say how each of the two choices reads to a listener.

**A:** 

#### Q11
<!-- concept: SYN-C05 · type: objective -->
A pad has to hold interest across sixteen bars without obviously repeating. Say what you'd route where.

**A:** 

#### Q12
<!-- concept: SYN-C06 · type: objective -->
What do unison and detune each contribute, and what happens with unison but no detune?

**A:** 

#### Q13
<!-- concept: SYN-C06 · type: objective -->
Give the two costs of wide detuned voices, and the rule for the low end.

**A:** 

#### Q14
<!-- concept: SYN-C07 · type: objective -->
Contrast subtractive and FM by what each does to harmonic content, and name what subtractive can't produce.

**A:** 

#### Q15
<!-- concept: SYN-C10 · type: objective -->
Where does wavetable's movement originate, compared with subtractive's?

**A:** 

#### Q16
<!-- concept: SYN-C08 · type: free-text -->
Explain why FM does bells and subtractive can't, from the ratio up. Your answer should say what a filter is unable to do.

**A:** 

#### Q17
<!-- concept: SYN-C09 · type: objective -->
Define granular synthesis and state its defining property.

**A:** 

#### Q18
<!-- concept: SYN-C09 · type: free-text -->
You need a texture nothing in your library has. Describe how you'd get one using granular, and say why the method scales beyond a single use.

**A:** 


## ✅ End of questions

## Grading

Fill in every `**A:**` line, then paste this into Claude Code:

```text
/school grade Course 13 — Final Exam
```

**Use Opus.** Objective questions are a normalized string match, but the free-text ones are scored against a rubric and that needs judgement — a cheaper model marks good answers wrong.

It marks **every question inline** — ✅ or ❌ with the correct answer and why — scores the test, and writes the attempt to this page's frontmatter. The key below stays collapsed; you shouldn't need it.


The full key is in the collapsed block below, but grading writes the answers inline where you need them — you shouldn't have to open it.

---

> [!danger]- 🔒 Answer key — do not open until you have answered every question
> **Q1.** **Oscillator generates · filter removes · amplifier shapes — one envelope on the amp, one on cutoff**
> Nothing is audible without the amp envelope. The filter envelope is where most of the character lives, and LFOs sit alongside modulating whichever block you route them to.
>
> **Q2.** **The oscillator — the waveform never had those harmonics. Swap it for a richer one**
> Opening the filter further can't help, because there is nothing above the fundamental left to let through.
>
> **Q3.** **A filter can only remove harmonics the oscillator generated**
> *Rubric (5):* states the corollary correctly — subtraction can't add content (1) · draws the consequence that patches start from saws, since the richest waveform gives the filter the most to work with (2) · draws the consequence that FM had to exist, because escaping the limit requires generating content rather than removing it (2)
> The corollary is the most load-bearing sentence in the course, because it converts a whole class of problems from mysterious to obvious. Two things follow from it directly. The first is a workflow habit: initialize a patch on a saw rather than a sine, because a saw hands the filter a dense spectrum to carve and a sine hands it nothing. Every bright, aggressive or evolving subtractive sound is a subtraction from something that was already richer than the result. The second is historical and conceptual: if the only operation available is removal, then the ceiling on a subtractive synth is whatever its oscillators can produce, and its oscillators are harmonic by construction. FM exists because that ceiling is real, and it works by generating sidebands instead of removing partials — a different operation, not a better filter.
>
> **Q4.** **Sustain is the only level · attack, decay and release are times**
> Decay measures the fall from the attack peak down to the sustain level. It sets how long the fall takes, not how far. How far is sustain's job.
>
> **Q5.** **Nothing — the peak and the sustain level are the same height, so there's no journey to time**
>
> **Q6.** **Attack near zero, short decay, sustain at or near zero, short release — sustain is the one that decides**
> With sustain up the note holds for as long as the key is held and it's a bass rather than a pluck.
>
> **Q7.** **A filter envelope with a healthy envelope amount — snap is the sound changing while it plays**
> An amp envelope alone gives you a volume shape. Bright at the attack and darkening immediately is what makes the shape read as an instrument.
>
> **Q8.** **An oscillator below hearing range wired to a parameter — you hear what it moves, never the LFO**
>
> **Q9.** **You've built FM — the only difference between modulation and audio is speed**
> Past roughly 20 Hz the movement stops reading as movement and starts reading as tone.
>
> **Q10.** **Modulate timbre, not level — level reads as volume automation, timbre reads as alive**
> Cutoff and wavetable position are the two targets that matter.
>
> **Q11.** **Two modulators at different rates — an 8-bar LFO on cutoff, a faster one on wavetable position**
> Mix in an envelope as well: an LFO is periodic and will eventually reveal its loop, where an envelope fires once per note and stays tied to the playing.
>
> **Q12.** **Unison stacks copies · detune spreads them in pitch · unison alone just sums louder**
> The thickening comes entirely from the copies beating against each other, which means unison supplies the mechanism and detune only makes the copies non-identical enough to interact.
>
> **Q13.** **They can partially cancel in mono · detune below about 150 Hz smears the pitch**
> So keep subs and 808s mono with no detune, layer rather than detune if you want width down there, and check any wide patch in mono before trusting it.
>
> **Q14.** **Subtractive removes harmonics · FM creates sidebands — subtractive can't make inharmonic content**
> Its oscillators are harmonic by construction, so every partial is an integer multiple of the fundamental.
>
> **Q15.** **At the source — a scannable table of waveforms with the position modulatable**
> Subtractive imposes movement downstream with a filter; wavetable generates it at the oscillator.
>
> **Q16.** **Non-integer ratios put sidebands between the harmonics — a filter can't relocate a partial**
> *Rubric (5):* says the carrier-to-modulator ratio sets where FM's sidebands land (1) · says integer ratios give harmonic results and non-integer ratios give inharmonic ones the ear can't fuse into a pitch (2) · says a bell is physically inharmonic, and that a filter can only attenuate existing partials rather than move one to a non-integer position (2)
> Start with what a bell is. Struck metal vibrates in modes that don't line up as whole-number multiples of a fundamental, so its overtones sit between the harmonics and the ear never quite fuses them into a single clear pitch. That unfused quality is what "metallic" means. FM reaches it because the carrier-to-modulator ratio decides where the sidebands fall: set an integer ratio and they land on harmonics, giving pitched sounds like basses and electric pianos; set something like 1:1.41 and they land between, which is exactly the bell's arrangement. Subtractive can't follow because both of its operations are wrong for the job. Its oscillators produce harmonic partials by construction — that's what makes them periodic — and its filter can only make an existing partial quieter or louder. Nothing in the chain can put energy at a non-integer position, so the target is outside the method rather than merely difficult within it.
>
> **Q17.** **Audio chopped into 1 to 100 ms grains and replayed — position and pitch are decoupled**
> The four controls are position, size, density and pitch. The decoupling means you can freeze a moment indefinitely or stretch enormously without transposing.
>
> **Q18.** **Granulate something you already have, then print the result and treat it as a new source**
> *Rubric (5):* describes loading an existing bounce or recording rather than hunting for a sample (1) · uses grain size, position and density to find different material inside it — very short grains produce tone from the grain rate, longer ones keep the source's identity (2) · describes printing the result and re-granulating it, so the method compounds rather than being a one-off effect (2)
> The move is to stop looking for the texture and make it out of something at hand. Bounce a source — a chord you wrote, a vocal phrase, half a second of a take you were going to delete — and load it in. Then explore rather than process: hold the position still and sweep grain size, and the same half-second gives you three unrelated instruments, because at 5 ms you're hearing a buzzy pitch generated by the grain rate itself, at 40 ms you're hearing a smooth texture, and at 150 ms you're hearing recognisable fragments of the source. Grain size is the character control: very short grains stop sounding like the source at all, and longer ones keep its identity. Density decides whether it's a cloud or a stutter, and spray is what stops high density reading as a periodic buzz. When something works, print it. That printed file is now a source with no relationship to anything in a library, and it can be granulated again — which is why this scales. Each pass moves further from the origin, so the method is a way of generating material indefinitely rather than an effect you apply once.

## ✅ End of test
