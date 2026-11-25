---
type: chain
aliases: ["Drums FX Track"]
title: Drums FX Track
chain_type: track
family: drums
source: digital
routing: Drums FX → FX Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, RC-20 Retro Color, Pro-C 2]
status: default
tags: [chain, drums, track, fx]
---

# Drums FX Track

**Role:** Sweeps, impacts, risers, reverses, foley percussion — drum-adjacent ear candy. Routes to the [[3 FX Bus|FX Bus]], not the drums bus: these are *texture*, not groove — they shouldn't hit the drum-bus compressor and make it pump.

**Chain philosophy:** fit → character → tame.

## 1 — Sound Selection

- **Selection IS the recording step** — audition in [[XO]] / pack browser. Human-touch sources beat stock sweeps: 🎬 Disclosure use **Splice acapella vocal shouts + a white-noise sweep as impact tools**, and **self-recorded tambourines at different speeds** (varispeed) that lock when pitched together — [Never Enough](https://youtu.be/lGopQwQo9Ag) → [[Sampling and Sound Selection]].
- 🎬 **Layer many small risers instead of one Splice riser** — a freq-mod build + delay build + filtered clap-verb + two tambourines drifting in early, all cresting together — Disclosure, [Never Enough](https://youtu.be/lGopQwQo9Ag).

## 2 — Programming Best Practice

- FX earn their place at **section boundaries** — risers into drops, impacts on downbeats, reverses as pre-echoes. One per transition; more = noise.
- 🎬 **"Sneaky stuff":** heavily distorted, near-silent accent layers under loud kick/snare, pumped hard by the sidechain so you never consciously hear them — "all they do is bring out the hi-hat." Texture you feel, not hear — Disclosure, [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) → [[TEXTURE Slot]].

## 3 — Source → Ableton (UAD front end)

Rarely needed — texture wants character, not fidelity. If a sample is sterile: [[UAD Neve 1073]] driven harder than usual → print. (The [[Sony TC-630]] loop is the better sterile-fix for this lane.)

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Fit
- HPF aggressively (usually 100–300 Hz — FX rarely deserve low end) · LPF if the element fights vocal air
- **Why:** Ear candy earns its place at the spectral edges; full-range FX mask the money elements.

### 2. [[RC-20 Retro Color]] — Character
- Any flavor that separates it from the clean kit — texture is the point. (Hardware lane: [[Sony TC-630]]; Kenny's Generation Loss pedal is this same job — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk).)

### 3. [[Pro-C 2]] — Tame
- Fast catch of unpredictable peaks (impacts/risers vary wildly) · 2–4 dB GR.

## 5 — Track FX (optional)

- Reverses, granular smears ([[Crystallizer]]/[[Echobode]]), pitch drops — this whole track IS the FX lane; go wild, then gain-stage it back down.
- 🎬 **Drop "womp" one-shots: reverb → OTT → multiband compression** — drown a plain synth zap (or a bass hit) in [[Hybrid Reverb]], run [[OTT]] after it, then a multiband compressor on top — turns a basic zap into a huge-impact drop-transition one-shot; works on sub-bass despite the usual low-end caution. Native granular smear alternative to the wishlisted [[Portal]]: [[Granulator 3]] on a resampled kit/clip loop (Cloud mode, Variation up) — dnksaus, [reverb can be POWERFUL](https://www.youtube.com/watch?v=Gi_y81NmoGg) & [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)

## 6 — Bus / Send FX (optional)

Routing: **Drums FX → [[3 FX Bus|FX Bus]] → [[Master Chain]]** (deliberately NOT the drums bus).

- **Risers into drops:** automate [[Reverb Send Long]] up through the riser and cut it dead at the downbeat — the silence-slam trick.
- Sidechain-duck the whole track to the kick when it's a bed rather than an event.

## Variations

- **Percussion loops as texture:** crush harder (RC-20 mix 50%+) and tuck way under the programmed kit.
- **Ambient/indie:** field-recording beds instead of sweeps — see [[Ambient Texture and Field Recording]].

## From videos

- **Drop "womp" one-shots: reverb → OTT → multiband compression** — drown a plain synth/bass zap in [[Hybrid Reverb]], run [[OTT]] after it, then a multiband compressor — turns a basic hit into a huge-impact drop-transition one-shot. → [[OTT]] — dnksaus, [reverb can be POWERFUL](https://www.youtube.com/watch?v=Gi_y81NmoGg)
- **Granulator as a native granular-smear alternative** — [[Granulator 3]] (Cloud mode, Variation up) on a resampled kit/clip loop covers the same "granular smear" role as the wishlisted [[Portal]], for risers/texture built entirely from stock devices. → [[Granulator 3]] — dnksaus, [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)

## Sources

Disclosure — [Never Enough](https://youtu.be/lGopQwQo9Ag) · [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · Kenny Beats — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk) · dnksaus — [reverb can be POWERFUL](https://www.youtube.com/watch?v=Gi_y81NmoGg) & [granulate EVERYTHING](https://www.youtube.com/watch?v=ZVLM1XMT6Z0)
