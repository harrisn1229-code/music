---
type: chain
aliases: ["Backup Vocals Group"]
title: Backup Vocals Group
chain_type: group
family: vocals
source: mixed
routing: "[Backup Vocal tracks] → Backup Vocals Group → Vocal Bus → Master"
signal_chain: [Pro-Q 4, Glue Compressor, S1 Imager, Pro-C 2 (sidechain)]
status: default
tags: [chain, vocal, group]
---

# Backup Vocals Group

**Role:** Sums all backup/ad-lib tracks into one wide, controlled element that never steps on the lead.

## Chain overview
Carve → glue harder than the main group → widen slightly → duck under the lead.

## Chain

### 1. [[Pro-Q 4]] — Carve
- HPF the summed group again (150–200 Hz) · dip the lead's presence band (3–5 kHz) −1 to −2 dB.

### 2. [[Glue Compressor]] — Glue
- **Ratio 4:1** (②) · **Attack 20 ms** (③) · **Release Auto** (④) · **Threshold set for 3 dB GR** (① — read the GR meter, not the number) · **Range 8 dB** safety cap (⑥) · **Makeup** to match bypassed level (⑤) · **Dry/Wet 100%** (⑦)
- **Why:** Backups can take real bus compression (harder than the lead) — it fuses multiple takes into one solid block. 4:1 + 20 ms is firm enough to glue without killing consonant transients.

### 3. [[S1 Imager]] — Width
- **Width +15%** (①) — slight increase; **check mono compatibility** (⑤)
- **Why:** Backups live at the sides; the lead owns the center.

### 4. [[Pro-C 2]] — Duck (sidechain from lead vocal)
- External sidechain keyed from [[1 Main Vocal Track|Main Vocal Track]] · 2:1 · **1–2 dB GR** only when the lead sings · slow release
- **Why:** Automatic priority — backups bloom in the gaps and tuck when the lead speaks.

## Send FX
- Backups feed the **same shared vocal send bank** as the mains (dialed on [[2 Main Vocal Group|Main Vocal Group]]) — one delay/reverb space for every vocal lane. Backups typically run the delay **hotter** than the lead (throws + wetter tails are on-brand), sidechain-ducked to the lead → [[Sidechaining]].
- **Ad-lib word throws are inserts, not sends** — a dedicated throw track (loud [[EchoBoy]], high-end cut, subdivision), per [[1 Backup Vocal Track|Backup Vocal Track]] §6. Cohesion → shared group send · moment → insert.

## Variations
- **Call-and-response arrangements:** skip the duck — the parts already alternate.
- **Huge hook stacks:** swap S1 Imager push for [[Width Send]] so the width is blendable.

## From videos

- **De-ess doubles noticeably harder than the lead — the ear can't discern multiple simultaneous S sounds unless they land out of time — and repurpose a redundant double (EQ out the low end, compress hard) into a distinct "breathy" high-frequency lift instead of muting it.** Tony Maserati, on K.Flay's "Dreamers": two main doubles carry body, a repurposed third carries breathy energy. Vary the blend section-to-section (a phrase before the chorus, or the end of a chorus) rather than repeating the same treatment every time, specifically to hold listener attention. → [[De-essing]], [[RX De-ess]], [[Vocal Stacks and Ad-libs]], [[Layering and Stacking]] — Tony Maserati (Mix with the Masters), [[Background Vocals  - Tony Maserati]]
- **The Disclosure stack-bus chain** — per track: Tube-Tech-style EQ (lows out) + de-esser; on the GROUP: **overdrive (saturate in) → stereo 1176 (LA-3A auditioned for group vocals, passed) → EQ → [[Decapitator]] → de-ess AGAIN** ("a lot of S's as a group"). De-ess before AND after the group color — Disclosure, [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8) → [[Compression Staging]]
