---
type: chain
aliases: ["Bass Group"]
title: Bass Group
chain_type: group
family: bass
source: mixed
routing: "[Electric Bass DI, Digital Bass] → Bass Group → Bass Bus → Master"
signal_chain: [Pro-Q 4, LALA]
status: default
tags: [chain, bass, group]
---

# Bass Group

**Role:** All bass sources summed. Usually only one bass plays at a time, so this group is mostly about a consistent low-end lane regardless of which source is active.

## Chain

### 1. [[Pro-Q 4]] — Lane consistency
- Match the electric and digital bass into the same spectral footprint (their track chains differ; the *mix* shouldn't notice a handoff between them)
- The kick-pocket dip lives on the tracks — only repeat it here if both basses layer simultaneously.

### 2. [[LALA]] — Level ride
- **Peak Reduction for ~1.5 dB GR** (① — slow) · **Comp mode** (③) · **HPF engaged** (④ — so the sub doesn't pump it) · **Gain to unity** (②)
- **Why:** An opto leveler smooths section-to-section bass level (verse fingerstyle vs chorus 808) so the low-end energy of the song stays constant — the thing listeners feel as "solid."

## Variations
- 🎬 *From video:* found bass presence in the 700 Hz–1 kHz tone/string-noise range rather than adding low end that was already excessive. Andrew Scheps: "there's more than enough low-end, but a lot of these sort of tone and string noise will be down in this 700 to 1k range, so I'm gonna try adding a little bit of this — just sounds a little more present." → [[EQ]], [[Masking and Carving]] — Andrew Scheps (Mix with the Masters), [[Mixing Guitars & Bass - Andrew Scheps]]
- **Live bass + 808 layered (pop-trap hybrid):** split duties with EQ — 808 owns below ~120 Hz, Hofner owns 120 Hz+ (HPF the Hofner hard) — two basses only work when they don't share an octave.
