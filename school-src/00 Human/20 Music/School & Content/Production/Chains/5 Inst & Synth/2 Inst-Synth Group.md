---
type: chain
aliases: ["Inst-Synth Group"]
title: Inst-Synth Group
chain_type: group
family: keys-synths
source: mixed
routing: "[Acoustic Piano, Electric Piano, Synth Lead, Synth Bed] → Inst-Synth Group → Inst-Synth Bus → Master"
signal_chain: [Pro-Q 4, Glue Compressor]
status: default
tags: [chain, synth, keys, group]
---

# Inst-Synth Group

**Role:** All keys + synths summed — the harmonic middle of the record. This group's enemy is *cumulative low-mid buildup*: every keyboard part adds 200–500 Hz, and together they swamp a mix that soloed fine.

## Chain

### 1. [[Pro-Q 4]] — Sum carve
- Cut the summed low-mids 200–400 Hz −1 to −3 dB (the buildup only exists on the sum — this can't be done on tracks)
- **Collision-detection workflow (Pro-Q's killer diagnostic):** put a Pro-Q on the vocal bus, another here; on this one, set the analyzer's sidechain to the vocal-bus instance — the display **highlights the exact colliding frequencies in red** while both play. Cut the red zones *here* (music yields to vocal), by ear, until the vocal opens up. No more guessing where the masking is.
- Broad dip in the vocal presence zone if the section still masks the singer
- **Alt (often better):** [[Soothe2]] sidechained from the lead vocal (soft mode, mid-channel, pre-emphasis in the vocal's range) — clears the vocal's lane dynamically and *exactly*, the modern unmasking move for dense synth beds vs vocals
- 🎬 *From video:* a more surgical alternative to the Soothe2 route above — build multiple bands on this group centered on the exact frequencies colliding with the vocal, set each **Dynamic**, and point each band's **external sidechain** at the vocal so the threshold measures the vocal's level instead of this group's own; only those targeted frequencies duck, and only while the vocal is actually singing. Push further with per-band **Stereo Placement** — one dynamic band ducking the mid image, another the side image — combining the frequency-specific duck with a stereo-imaging decision in the same move — Sage Audio, [EQ Masterclass](https://www.youtube.com/watch?v=iPBnL6mx9c0)
- **Why:** Step 4 of your process at its purest — EQ decisions that only make sense against the *other* groups.

### 2. [[Glue Compressor]] — Section glue
- **Ratio 2:1** (②) · **Attack 30 ms** (③) · **Release Auto** (④) · **Threshold for ~1.5 dB GR** (①) · **Makeup** to unity (⑤) · **Dry/Wet 100%** (⑦) — the section moves as one.
- **Why:** Same gentle section glue as the other groups — enough to fuse keys + pads + synths into one layer, light enough that no single part's dynamics get flattened.

## Variations
- **Synth-heavy EDM drop:** sidechain the whole group from the kick (Glue Comp external sidechain or [[Kickstart 2]]) — pumping the harmonic layer as a unit is the genre's engine.
- **Lo-fi/gentle cohesion duck (not a pump you're meant to hear):** same routing idea, much lighter touch — kick's compressor send set to **External/pre-fader ("preader")** mode so the duck amount stays constant even if the kick's own fader moves later, sidechaining the group's own [[Glue Compressor]]. Sidechain-duty settings: **knee 0, high ratio, attack instant, release ~300 ms**, threshold dialed by ear (dip extreme first to hear it, e.g. ~26 dB GR, then back off) to land **6–9 dB GR** — deliberately below the threshold of being noticed as "a sidechain happening," just felt as glue between the group and the drums. 🎬 *From video:* Max Konyi, [Final Mix & Master | Studio One LoFi Tutorial | Part 9](https://www.youtube.com/watch?v=-OKUCuyLBSg)

## From videos

- **Advanced mid-side EQ: dynamically duck this group's specific frequencies off an external vocal sidechain, with per-band mid/side placement** — build multiple [[Pro-Q 4]] bands on this group centered on the exact frequencies that clash with the vocal, set each **Dynamic**, then point each band's **external sidechain** at the vocal so the threshold measures the vocal's level instead of this group's own — only those targeted frequencies duck, and only while the vocal is actually singing. Taken further: assign **Stereo Placement per band** (one dynamic band ducking the mid image, another the side image) to combine the frequency-specific duck with a stereo-imaging decision in the same move — a more surgical, per-band alternative to the Soothe2 sidechain already used on this group's sum-carve stage. → [[EQ]], [[Sidechaining]], [[Masking and Carving]], [[Width and Stereo]] — Sage Audio, [EQ Masterclass](https://www.youtube.com/watch?v=iPBnL6mx9c0)
- **Pre-wire this group's sidechain compressor disabled, in a session template, with the kick's send already built** — as a template habit rather than a per-song setup step: park a dedicated compressor on this group specifically for sidechain duty, disabled, with the kick track's compressor-send already routed to its external sidechain input and set to pre-fader/"preader" mode ahead of time — so activating the felt-not-heard kick duck documented above (or any future song's version of it) is a single power-button click instead of rebuilding the routing from scratch. → [[Session Templates]] — Max Konyi, [The Ultimate Template Creation Guide for Studio One (or any other DAW)](https://www.youtube.com/watch?v=eFMfip3CQcI)
- **Route the reverb sends into the same sidechain-ducked group as the instruments, not just the dry signals** — when building the felt-not-heard lo-fi duck above, every reverb feeding this group (except the one on the drums) gets summed into the group *before* the sidechain compressor, so wet tails duck along with their dry sources instead of smearing through the kick untouched — Max Konyi, [Final Mix & Master | Studio One LoFi Tutorial | Part 9](https://www.youtube.com/watch?v=-OKUCuyLBSg)
