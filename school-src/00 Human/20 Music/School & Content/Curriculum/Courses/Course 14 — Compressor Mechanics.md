---
type: school-course
course_id: "14"
domain: production
strands: [FX]
class: "[[Class 6 — Sound Design]]"
depends_on: []
target_pct: 85
lessons: 2
concepts: 6
---

# Course 14 — Compressor Mechanics

What a compressor is doing under the presets, which one to reach for, and what order the chain goes in. **The smallest course in the school and one of the highest-return**, because every chain in the vault already contains a compressor.

**What it assumes**

- Nothing. It starts at what the device is.

| Lesson | Title                          | Concepts | Test                        |
| ------ | ------------------------------ | -------- | --------------------------- |
| 1    | What a Compressor Actually Is  | 3        | [[Course 14 — Lesson 1 Test]] |
| 2    | Choosing and Ordering          | 3        | [[Course 14 — Lesson 2 Test]] |

**What this unlocks**

- Nothing formally depends on it, which is what makes it a good course to run alongside a long theory one — two lessons, and it doesn't compete for attention.
- [[Course 16 — Handoff & Release Prep]] — its limiter rule is Lesson 1's first fact applied to the 2-bus, and it reads better once you know a limiter *is* a compressor.
- Practically: the compressor settings written into the chain notes stop being recipes to follow and start being decisions you can change.

## The lessons

### Lesson 1 — What a Compressor Actually Is

**Read**
- [ ] [[Compression]] → *What it is*, and the "compression is a person" mnemonic in the note
- [ ] [[Limiting]]
- [ ] [[Parallel Processing]]

**The material**
- **[[FX-C01 — A limiter is a compressor|A limiter is a compressor with a very high ratio acting as a ceiling.]]** Same device, extreme setting — not a different category.
- That single fact reframes the whole master-chain conversation, and it connects straight to [[MIX-C01 — No limiter on the 2-bus]] in [[Course 16 — Handoff & Release Prep]].
- **[[FX-C02 — Hard knee vs soft knee|Knee is how abruptly the ratio engages.]] Hard knee** switches the full ratio on the instant the signal crosses threshold. **Soft knee** eases it in over a window either side, so compression begins gently *before* the threshold is properly reached.
- Soft knee for transparent levelling on vocals and the mix bus; hard knee for catching peaks, or when you want to hear the compressor working.
- **[[FX-C03 — Parallel compression|Parallel compression]]** duplicates the signal, crushes one copy and blends it *under* the untouched one. The dry path keeps its transients, so you get density and sustained detail without losing punch.
- In effect it's **upward** compression: lifting the quiet parts rather than pushing the loud ones down. Ableton's stock Compressor has a Dry/Wet knob, so it needs no return track at all.

**Concepts**
- [[FX-C01 — A limiter is a compressor]]
- [[FX-C02 — Hard knee vs soft knee]]
- [[FX-C03 — Parallel compression]]

**Homework**
- [ ] **Review** — on one drum bus, A/B hard against soft knee at the same ratio and threshold, and say which one you can hear working.
- [ ] **Apply** (~15 min) — build parallel compression twice on the same source: once on a return track, once with the device's Dry/Wet. Null-test that they match, then decide which you'd actually keep in a session.
- [ ] **Test** — [[Course 14 — Lesson 1 Test]]

### Lesson 2 — Choosing and Ordering

**Read**
- [ ] [[Multiband Compression]], then [[Saturation and Distortion]], then [[Compression Staging]] and [[Masking and Carving]]

**The material**
- **[[FX-C04 — Multiband vs broadband|Multiband compresses one range; broadband compresses the whole signal.]]** That's the easy half. The reason it matters: with broadband, **one bad band drags everything down with it.**
- If a vocal's low-mids bloom on certain notes, a broadband compressor ducks the entire vocal on exactly those notes — including the top end that was fine.
- **[[FX-C05 — Saturation adds harmonics|Saturation adds harmonics]]**, and which harmonics is the choice you're actually making. **Even-order (2nd) sit at octaves and read as warm and full; odd-order (3rd) add edge and grit.** It also rounds transient peaks, so a saturated signal reads louder at the same meter.
- **[[FX-C06 — Chain order: EQ, compression, de-ess|Chain order: subtractive EQ → compression → de-ess → tone-shaping EQ.]]** De-essing after compression is the step most people invert.
- Clean up **first**, so the compressor isn't reacting to rumble and mic bumps it was never meant to hear. **De-ess after compression**, because pulling the body down *raises* the esses. Boosts **last**, so a presence lift doesn't get immediately squashed.
- This is the applied form of the "compress first, EQ after" rule in [[Compression]] — with the one exception that note already flags: cut non-musical content *before* the compressor.

**Concepts**
- [[FX-C04 — Multiband vs broadband]]
- [[FX-C05 — Saturation adds harmonics]]
- [[FX-C06 — Chain order: EQ, compression, de-ess]]

**Homework**
- [ ] **Review** — name the four stages of the chain in order and say what each one is protecting the next from. Then say which harmonics you'd want on a warm bass and which on an aggressive one.
- [ ] **Apply** (~15 min) — build the full vocal chain in that order on a real take. Then deliberately move the de-esser in front of the compressor, listen to the sibilance come back, and put it where it belongs.
- [ ] **Test** — [[Course 14 — Lesson 2 Test]]

## Course final

`/school final 14` when both lessons are done. Twelve questions weighted to the mechanism. Pass at **85%** — higher than the default, because six concepts is a small enough surface that leaving it at "mostly" isn't worth doing.

Passing completes the course and seeds its concepts to `maintenance`. Failing keeps it `active` and re-seeds only the concepts you missed.

→ [[Course 14 — Final Exam]]

## Related

- [[Class 6 — Sound Design]]
- [[Compression]] · [[Limiting]] · [[Multiband Compression]] · [[Parallel Processing]] · [[Compression Staging]] · [[Saturation and Distortion]] · [[Masking and Carving]]
- [[Course 16 — Handoff & Release Prep]] — [[MIX-C01 — No limiter on the 2-bus]] is Lesson 1 applied
- [[Course 13 — Signal Path & Synthesis Methods]] — the other half of Class 6
- [[Machine/Workflows/school]] · [[Effects Index]]
