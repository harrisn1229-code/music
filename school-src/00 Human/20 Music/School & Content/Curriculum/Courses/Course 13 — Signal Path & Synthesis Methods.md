---
type: school-course
course_id: "13"
domain: production
strands: [SYN]
class: "[[Class 6 — Sound Design]]"
depends_on: []
target_pct: 80
lessons: 4
concepts: 10
---

# Course 13 — Signal Path & Synthesis Methods

What a synth is actually doing, from the three blocks every one of them shares to the four methods that distinguish them. The difference this course exists for: **following a patch recipe versus knowing why it works well enough to write your own.**

**What it assumes**

- Nothing. Lesson 1 starts at the three blocks on the panel.

| Lesson | Title                  | Concepts | Test                        |
| ------ | ---------------------- | -------- | --------------------------- |
| 1    | The Path               | 1        | [[Course 13 — Lesson 1 Test]] |
| 2    | Envelopes              | 2        | [[Course 13 — Lesson 2 Test]] |
| 3    | Movement and Thickness | 3        | [[Course 13 — Lesson 3 Test]] |
| 4    | The Four Methods       | 4        | [[Course 13 — Lesson 4 Test]] |

**What this unlocks**

- Patch design from scratch rather than preset selection. [[Instrument Preset Map]] stays the right tool under deadline; this is the other mode.
- [[Bass Design]], [[Kick Design]] and [[Snare Design]] stop being recipes and become derivations — which is what [[Course 10 — Drum Programming & Beat Construction]] Lesson 1 asks for when it says to synthesise the kick.
- [[Course 14 — Compressor Mechanics]] pairs with it naturally. Both are the concept layer underneath a tool that's already in daily use.

> [!info] Hands on the synth, not on the page
> Every drill here is done at an instrument. This is the one subject in the school where reading alone provably doesn't work — the ear has to connect the knob to the change, and no note can do that for you.

## The lessons

### Lesson 1 — The Path

**Read**
- [ ] [[Signal Path]], then [[Oscillators and Waveforms]] and [[Filters and Resonance]]

**The material**
- **[[SYN-C01 — The signal path|Oscillator → filter → amplifier.]] Generate, remove, shape.** Every subtractive synth on the market is that chain with a different panel drawn around it.
- The amp envelope is why anything is audible at all. The filter envelope is where most of the character comes from. LFOs sit alongside and move whichever block you point them at.
- The corollary explains half the strand: **a filter can only remove harmonics the oscillator generated.** Start on a sine and nothing downstream can brighten it, because there's nothing there to uncover.
- That's why patches start from saws — the richest raw material — and it's the reason [[FM Synthesis]] had to be invented at all. Subtractive can only subtract.

**Concepts**
- [[SYN-C01 — The signal path]]

**Homework**
- [ ] **Review** — open [[Analog]] and identify the three blocks on the panel. Play all four waveforms through a wide-open filter, then set the same cutoff on each and hear how much of each one is left.
- [ ] **Apply** (~15 min) — build a patch from an initialized [[Analog]], one oscillator with the filter wide open, then close the filter to taste on each of the four waveforms. Save all four, naming each preset after what the filter left behind. Then close the oscillator entirely and push resonance until the filter self-oscillates into a sine.
- [ ] **Test** — [[Course 13 — Lesson 1 Test]]

### Lesson 2 — Envelopes

**Read**
- [ ] [[Envelopes and ADSR]]

**The material**
- **[[SYN-C02 — ADSR: three times and one level|Three times and one level.]]** Attack, decay and release are durations. **Sustain is the only level** in the whole envelope.
- Decay is a *journey* — from the peak down to the sustain level — which is why filing it as a level makes the knob seem broken. It isn't setting a volume; it's setting how long the fall takes.
- Four shapes cover most of what you'll build: **[[SYN-C03 — Building a pluck|pluck]]** (sustain at **0**, so the note is only its own decay), pad, organ and bass.
- The pairing that creates character is the **filter envelope plus envelope amount.** An amp envelope alone gives you a shape; the filter envelope gives you a sound that changes while it plays, which is what "snap" actually is.

**Concepts**
- [[SYN-C02 — ADSR: three times and one level]]
- [[SYN-C03 — Building a pluck]]

**Homework**
- [ ] **Review** — on [[Analog]], build all four shapes from an initialized patch using the amp envelope only. Say what sustain is set to in each, and why.
- [ ] **Apply** (~15 min) — build a pluck, a pad, a stab and a swell from one initialized patch, then add a filter envelope to each and find the envelope amount that makes the pluck actually snap. Put all four in a single 8-bar clip and play it against a beat.
- [ ] **Test** — [[Course 13 — Lesson 2 Test]]

### Lesson 3 — Movement and Thickness

**Read**
- [ ] [[LFOs and Modulation]], then [[Voice Architecture]]

**The material**
- **[[SYN-C04 — LFOs modulate parameters, not audio|An LFO is an oscillator below hearing range wired to a *parameter* rather than to the output.]]** You never hear the LFO — you hear what it moves. Push it past about 20 Hz and it becomes FM; the only difference is speed.
- **[[SYN-C05 — Modulate timbre to make it evolve|To make something evolve, modulate its timbre rather than its level]]** — filter cutoff or wavetable position. Level changes read as volume automation; timbre changes read as alive.
- Then thickness. **[[SYN-C06 — Unison needs detune|Unison stacks copies, detune spreads them, and unison without detune does almost nothing]]** — identical copies at the same pitch just sum to a louder version of the same sound.
- The rule that matters in bass-heavy genres: **no detune on subs and 808s.** Detuning the low fundamental turns a defined pitch into a beating, undefined smear.

**Concepts**
- [[SYN-C04 — LFOs modulate parameters, not audio]]
- [[SYN-C05 — Modulate timbre to make it evolve]]
- [[SYN-C06 — Unison needs detune]]

**Homework**
- [ ] **Review** — on [[Serum 2]] or [[DUNE 3]], walk unison from 1 to 7 voices with detune at zero and confirm almost nothing happens. Then bring detune up and say what changed.
- [ ] **Apply** (~15 min) — build a [[Wavetable]] pad with two LFOs at different rates, one on cutoff and one on position. Hold a chord for 16 bars and record it; it should never repeat. Then rebuild the same chord in [[Serum 2]] and record unison 1 → 7 with detune coming up.
- [ ] **Test** — [[Course 13 — Lesson 3 Test]]

### Lesson 4 — The Four Methods

**Read**
- [ ] [[Subtractive Synthesis]], [[FM Synthesis]], [[Wavetable Synthesis]], [[Granular Synthesis]]

**The material**
- Four ways to make a sound, each defined by what it can do that the others can't.
- **[[SYN-C07 — Subtractive vs FM|Subtractive starts rich and filters away]]** — predictable, cheap, and unable to make inharmonic content. **FM has one oscillator modulate another's frequency, *creating* sidebands** that weren't in either source.
- **[[SYN-C08 — Why FM does bells|Integer ratios give harmonic, pitched results; non-integer ratios give inharmonic ones]]** — which is what bells and struck metal physically are. That's why FM does bells and subtractive can't: the overtones of a bell aren't multiples of its fundamental.
- **[[SYN-C10 — Wavetable moves the timbre at the source|Wavetable]]** is a scannable table of waveforms with the position modulatable — timbral movement generated at the source rather than imposed by a filter.
- **[[SYN-C09 — Granular decouples time from pitch|Granular breaks audio into grains, decoupling time from pitch]].** Freeze a moment, stretch enormously without transposing, or build texture out of any recording at all.

**Concepts**
- [[SYN-C07 — Subtractive vs FM]]
- [[SYN-C08 — Why FM does bells]]
- [[SYN-C10 — Wavetable moves the timbre at the source]]
- [[SYN-C09 — Granular decouples time from pitch]]

**Homework**
- [ ] **Review** — on [[Operator]], take the simplest algorithm at ratio 1:1 and sweep the modulation index, hearing harmonics appear on a sine. Then try 1:2, still harmonic, then 1:1.41. The moment it turns metallic is the lesson.
- [ ] **Apply** (~15 min) — make the same two-bar riff four times: [[Operator]] for FM, [[Wavetable]], [[Analog]] for subtractive, and [[Granulator 3]] over a bounce of your own voice. Same notes, four methods, one clip each in a Session row.
- [ ] **Test** — [[Course 13 — Lesson 4 Test]]

## Course final

`/school final 13` when all four lessons are done. Eighteen questions weighted to mechanism rather than vocabulary — why a filter can't brighten a sine matters more than being able to define one. Pass at **80%**.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 13 — Final Exam]]

## Related

- [[Class 6 — Sound Design]]
- [[Synthesis Index]] — the eleven pages this course reads from
- [[Course 14 — Compressor Mechanics]] — the other half of Class 6
- [[Machine/Workflows/school]] · [[School Config]]
