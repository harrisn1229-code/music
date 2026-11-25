---
type: report
title: Production System Report
created: 2026-07-12
tags: [production, report, reference, index]
---

# Production System Report

The read-through reference for the whole production system built 2026-07-12: what exists, where it lives, the rules it runs on, and the best lessons from the research pass (web + ~45 YouTube transcripts). Everything links to the deeper note.

---

## 1. The map

```
00 Human/20 Music/School & Content/Production/
├── Plugin Index.md          ← 366 plugins, 9 role categories, one wiki page each
├── Plugins/                 ← per-plugin reference pages
├── Chains/
│   ├── FX Chain System.md   ← the hub: routing model, conventions, all indexes, sources
│   ├── 1 Vocals/  2 Drums/  3 FX/  4 Bass/  5 Inst & Synth/  6 Guitars/  7 Effects/  8 Master/
├── Techniques/              ← 49 teaching pages + [[Techniques Index]]
├── Genres/                  ← 9 playbooks + [[Artist Study Queue]] + [[Genres Index]]
├── Instrument Preset Map.md ← go-to patches per job inside each instrument plugin
├── Plugin Wishlist.md       ← the few real gaps worth buying (short list)
└── Production System Report.md   ← this file
```

- **82 chain notes** (+ hub) — every track/group/bus/send/master lane, 7 anchored on your real Device Lister exports (marked `anchor:`), all in **Step 1 Record (UAD) → Step 2 Process (Ableton) → Step 3 Effects** structure.
- **10 style vocal chains** — Gorillaz, Dijon, Tame Impala, The Weeknd, Travis Scott, Frank Ocean, Billie Eilish, Mac DeMarco, Dua Lipa, Charli XCX (future candidates: [[Artist Study Queue]]).
- **49 technique pages**, **9 genre playbooks** (incl. [[Bedroom Pop - Indie]] — the home lane, [[Dance Pop (Dua Lipa, Charli XCX)]], and [[EDM Subgenres]] identity cards).

## 2. The workflow (every source, same discipline)

**Step 1 — Record (UAD Console):** Unison preamp (**UAD Neve 1073** default; **UAD UA 610-B** for rounder tube) → **UAD 1176LN** or **UAD Teletronix LA-2A** (2–4 dB, peaks only) → **UAD Pultec EQP-1A** (rumble atten / touch of air). Printed conservative — like tracking to analog.
*Software instruments run the same step* with the UAD plugin equivalents in Ableton (Step 1a = instrument choice, Step 1b = UAD front end). Drums-from-packs: selection IS the recording step ([[XO]]).

**Step 2 — Process (Ableton, bounceable):** corrective EQ → compression → saturation/color → tonal EQ → cleanup (de-ess/soothe last — every comp and saturator regenerates harshness).

**Step 3 — Effects:** sends (shared room, long tail, slap, synced delay, parallel comp, dirt, width) + per-track character.

**Steps 4–6:** group carving (EQ *against the other groups*) → bus finish (broad, gentle, analog) → [[Master Chain]] (mix-into-it stages + export loudness stages).

## 3. The standing rules

- **Gain staging:** ~0 VU (≈ −18 dBFS) into everything; meter sandwich (Utility + mvMeter head/tail); unity through every device — level-matched A/B or your ears lie. ([[Gain Staging]])
- **Compression in stages:** tracking 2–4 dB → track 3–5 → group 1–2 → bus 1–3 → master 1–2. No stage works hard; none pump. 1176 early / LA-2A late — mirror-image release curves. ([[Compression Staging]])
- **The masking hierarchy:** lead vocal → backbeat/kick → bass → hooks → everything else. Collisions: the lower rank moves. Cut the loser, don't boost the winner. ([[Masking and Carving]])
- **Low end law:** mono below ~100–120 Hz, one sub owner at a time, kick/bass pocket decided per song, no reverb/width on lows ever.
- **Returns:** 100% wet, band-limited (HPF 200–300 / LPF 4–8k), pre-delay 15–25 ms, big tails duck under the dry vocal. ([[Depth and Space]])
- **Parallel over serial** when you want *more of a quality* without trading the source: crush, dirt, width sends. ([[Parallel Processing]])

## 4. First-call plugins by job (the short list)

| Job | First call | Character alt |
|---|---|---|
| Surgical/dynamic EQ | [[Pro-Q 4]] | [[Sie-Q]] (musical), [[Gullfoss]] (adaptive) |
| Track comp | [[Pro-C 2]] | [[LALA]] (opto), [[Ghz Vulf Compressor 3]] (pump) |
| Peak-catch comp | [[UAD UA 1176LN]] | [[FETish]] |
| Bus glue | [[Glue Compressor]] | [[API-2500]] (drums) |
| Saturation | [[Saturn 2]] (multiband) | [[Decapitator]] (attitude), [[Ghz Tupe 3]] (tube), [[Kramer Tape]] (tape) |
| Density/loudness | [[Oxford Inflator]] | [[OTT]] (multiband, low depth) |
| Clipping | [[Gold Clip]] / [[Gold Clip Track]] | [[kHs Clipper]] |
| Resonance/harshness | [[Soothe2]] | Pro-Q 4 dynamic bands |
| De-ess | [[Pro-DS]] | — |
| Transients | [[Transient Master]] | [[kHs Transient Shaper]], [[BitterSweet]] |
| Reverb | [[ValhallaRoom]] (room), [[ValhallaPlate]] (vocal tail) | [[ValhallaVintageVerb]] (psych/70s), [[ADAPTIVERB]] |
| Delay | [[EchoBoy]] | [[Echo]] (built-in ducking), [[ValhallaDelay]] |
| Width | [[MicroShift]] | [[Chorus-Ensemble]], [[S1 Imager]] (M/S) |
| Duck/pump | [[Kickstart 2]] | Pro-C 2 ext. SC, [[Duck_Buddy]] |
| Pitch | [[Auto-Tune Pro]] | [[Little AlterBoy]] (formant/character) |
| Lo-fi texture | [[RC-20 Retro Color]] | [[Decimort 2]], [[Corrosion]] |
| Limiter | [[Ozone 9 Maximizer]] | [[Ghz Faraday Limiter 3]] |

**Instruments:** [[Keyscape]] (pianos/EPs — LA Custom C7, Rhodes LA Custom E, Wurli 200A) · [[Omnisphere]] (pads) · [[Serum 2]] (modern leads/bass design) · [[Model 84 Polyphonic Synthesizer]] (Juno lane) · [[DUNE 3]]/[[Massive]] (EDM) · [[Ramzoid 808 Cooker]] (808s) · [[XO]]/[[Drum Rack]] (drums from packs).

## 5. The chains — how to actually use them

1. Building a session: pull up the family's track chains, set the meter sandwich, follow the stage order; settings are **starting points** — the Why lines tell you which knob matters.
2. The 7 ⭐ anchors are your current working chains, annotated — trust them first.
3. Genre work: open the [[Genres Index]] playbook first; it tells you which variations to use in each chain note.
4. Style vocal chains (Gorillaz/Dijon/Tame Impala/Weeknd/Travis) are complete recipes — capture notes included, since half of each sound is Step 1.
5. Every note is Producer Pal-parseable (`signal_chain` frontmatter + stage grammar) for phase 2 automation.

## 6. Techniques in one line each ([[Techniques Index]])

- [[Gain Staging]] — hit analog-modeled plugins at 0 VU and never judge un-level-matched.
- [[Compression Staging]] — many gentle stages; 1176→LA-2A physics.
- [[Sidechaining]] — duck level (Kickstart), duck frequencies (soothe2/Pro-Q SC), or don't duck at all (trap EQ-pocket school).
- [[Parallel Processing]] — crush a copy, tuck it under; send selectively (no cymbals to the crush).
- [[Masking and Carving]] — hierarchy, mute-test, Pro-Q collision view, M/S carves, dynamic dips.
- [[Phase Alignment]] — pink-noise trick, 3:1 rule, polarity = low-end test, Align Delay.
- [[Depth and Space]] — level/darkness/transients/wet-ratio are the four distance dials.
- [[Width and Stereo]] — real doubles > micro-pitch > chorus > Haas > M/S; mono-check everything.
- [[Clipping and Loudness]] — hard clip micro-transients pre-limiter; oversampling can eat headroom (Gold Clip excepted); LUFS honesty (−9 to −7 trap, −10 to −12 organic).

## 7. Genres in one line each ([[Genres Index]])

- [[Bedroom Pop - Indie]] — **the home lane**: charm over polish, close and dry, chorused guitars, diary vocals, one "wrong" sound per song.
- [[Psych-Pop (Tame Impala)]] — play soft + crush hard, bass leads, drive *after* reverb, vocals layered till anonymous, hard pans.
- [[Hip Hop - Trap]] — 808+kick one instrument, hats are the melody, hard-tune as timbre, arrange by muting drums.
- [[Modern Pop]] — vocal is the product; verse intimacy vs chorus bloom is engineered contrast.
- [[Dance Pop (Dua Lipa, Charli XCX)]] — nu-disco polish ↔ brat-club abrasion; vocal as rhythm instrument; the 8-bar contract.
- [[60s - Beatles]] — commit at the source; palm-muted Hofner, kit-compressed drums, ADT slap doubles, hard-pan courage, tape on everything.
- [[House - EDM]] — the duck is the heartbeat; kick+bass must groove alone for 8 bars first.
- [[EDM Subgenres]] — tempo + drum pattern + bass character = the lane (deep/tech house, future bass, melodic dubstep, synthwave, techno, DnB, garage).
- [[Rap Subgenres]] — drums + 808 behavior + tune amount = the lane, with examples each (boom bap → trap → drill → rage → plugg → cloud → phonk → G-funk → jazz rap → melodic/emo → club → alt/abstract).
- [[Neo-Soul - Lo-fi]] — late snare, Rhodes extensions, RC-20 texture, don't fix the timing.

## 7b. Style vocal chains (artist studies, `Chains/1 Vocals/Artist Chains/`)

[[Gorillaz Vocal Chain]] (band-limit + degrade) · [[Dijon Vocal Chain]] (omni bleed + breakup) · [[Tame Impala Vocal Chain]] (layered-anonymous + tape echo) · [[The Weeknd Vocal Chain]] (many light touches, warmth + air) · [[Travis Scott Vocal Chain]] (retune 0 + ducked hall + throws) · [[Frank Ocean Vocal Chain]] (dry, hand-tuned, 3D layers) · [[Billie Eilish Vocal Chain]] (whisper close + edit discipline) · [[Mac DeMarco Vocal Chain]] (tape wobble + slap croon) · [[Dua Lipa Vocal Chain]] (SM7 handheld + opto + low-mid soothe) · [[Charli XCX Vocal Chain]] (tune-as-jewelry + formant automation + insert distortion) · [[Myles Smith Vocal Chain]] (fixed lead+double+pan floor + Milesauce ad-lib layer) · [[Arlo Parks Vocal Chain]] (basic insert chain + named "Underwater Space" send, embedding over front-and-center clarity) · [[Jack Antonoff Vocal Chain]] (dry room-mic band take + mistuned vocoder hook + two-full-takes-layered trick). Next up: [[Artist Study Queue]].

## 8. Top lessons from the research pass (the gold)

1. **Clip-gain before compression** — hand-level the comp to 0 VU; the compressor should meet music, not level swings.
2. **Humanize 100%** is the anti-T-Pain switch; retune ~35–50 for invisible tune.
3. Higher 1176 ratios (8:1/12:1) = steeper knee = *more* precise peak-catching, not more squash.
4. **soothe2 sidechained on the instrument group** (keyed from vocal) is the modern unmasking endgame.
5. Stacks: **fours, never twos**; panned hard while tracking; sung softer than the lead; de-essed/tuned harder; timing alignment beats all plugins.
6. **Pink-noise phase alignment** for the SM57+TLM cab pair.
7. Guitars: don't HPF past the ~100 Hz fundamental; notch 3.5–4.5k; spread the "magic boosts" across layers.
8. Acoustic: 90% of exposed parts want EQ and NO compression; "butter compression" (1.2–1.5:1, threshold floored) for beds.
9. Bass: wide EQ moves only (narrow cuts notch individual notes); **heard (350 Hz–2 k) vs felt (sub)** — saturate the heard band, save 6 dB of headroom.
10. Trap: sidechain optional — Mixed by Ali school EQ-pockets + gates the kick tail instead.
11. **API-2500 Thrust** stops the kick pumping the drum bus; slow attack + fast release + aggressive ratio is the drum recipe.
12. Parallel crush: kick/snare/toms only; ride the *return* +1 dB in choruses.
13. Kramer Tape: **flux is the drive knob**; 15 ips bright / 7.5 ips fat.
14. Clippers: most oversampling silently refills the peaks you shaved — verify with sample-peak meters.
15. Inflator the honest way: Effect 100%, ride input to clip lights, level-match output.
16. Piano/keys: the 1–2 kHz boost sounds honky solo and correct in the mix; **M/S low-mid cuts** clear the center and widen for free.
17. Reverb: pre-delay 15–25 ms is the #1 amateur fix; duck long tails under the dry vocal.
18. Slap delay: 80–140 ms **unsynced**, one repeat, always duller than the source; run slap + synced 1/8 together.
19. Transient shapers are **depth knobs** (attack up = closer), not just punch.
20. Sound selection is the mix — a great sample/patch needs almost nothing; swap before you sculpt.

## 9. Presets & purchases

- **[[Instrument Preset Map]]** — the go-to patches per job inside Keyscape / Omnisphere / Serum 2 / Model 84 / stock Ableton / Nexus / DUNE / XO. Browse by job, audition ≤5, commit.
- **[[Plugin Wishlist]]** — the only real gaps worth money: **Melodyne** (manual pitch — the Frank Ocean/Finneas method), **VocAlign** (stack alignment), **Youlean Loudness Meter** (free — just install), then ShaperBox/room-correction as the lanes deepen. Everything else: the 366 already cover it.

## 10. What's next

- **Producer Pal phase 2** — auto-build chains in Live from the notes (capture as a new idea when ready).
- More style chains from the [[Artist Study Queue]] (Mk.gee, Bon Iver Messina, Steve Lacy, Kendrick, McCartney solo…) and playbooks (boom bap, shoegaze, funk/Prince) as lanes emerge.
- Chains evolve: when a session teaches you something, edit the note — the vault copy is the source of truth, and `anchor:` exports can be re-run through Device Lister any time.
