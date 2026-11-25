---
type: plugin
title: "UAD Pultec EQP-1A"
category: EQ (passive/tube)
vendor: "Universal Audio"
platform: UAD Console
tags: [plugin, uad]
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
depth_linked: true
manual_enriched: true
video_enriched: true
briefed: backlog
---

# UAD Pultec EQP-1A

![[Images/UAD Pultec EQP-1A.png]]

**Category:** Passive Tube Program EQ
**Vendor:** Universal Audio — Legacy version in the Apollo stock bundle ([[Universal Audio Apollo Twin MkII]])

## What it is

Emulation of the Pultec EQP-1A passive program EQ. Broad, musical curves that are nearly impossible to make sound bad; the tube make-up stage colors even at flat settings.

## What it's used for

Gentle tone-shaping on the way in, and the famous **low-end trick** (boost + atten at the same low frequency = tight lows with a scooped mud notch) on bass/kick.

## Key settings (tracking, acoustic guitar)

- **Low ATTEN:** 2–3 @ **60 CPS** — takes out rumble/boom before it hits the converters.
- **Low BOOST:** 0 (the boost/atten trick is for bass/kick, not acoustics).
- **High BOOST:** 0–2 @ 12 KCS max, bandwidth broad — save real sweetening for [[Pro-Q 4]] in Ableton where it's undoable.
- **ATTEN SEL:** 10 KCS, 0 — leave it.

## FX chain notes

Third device in `uad_console` chains, after the compressor — see [[1 Acoustic Guitar Track|Acoustic Guitar Track]]. Note the desk-order lesson from [[Disclosure - SSL SIX Mixing Al Green Stems]]: EQ *after* compression on the way in.

## Techniques

- **Run on kick and snare purely as a big, musical tone/loudness control — described as making the same kick and snare sound "just a bigger version of it," like a tone control on an old stereo, not a corrective move.** Joe Chiccarelli, tracking session (transcribed in captions as "pole tech," clearly Pultec): "sometimes I'm putting a Pultec on my kick and snare that are basically just great tone controls, great loudness controls — so it's almost like I'm getting the same kick and snare drum sound, but they're just a bigger version of it." *(No exact Low/High Boost numbers given — a broad-strokes character move, not a corrective EQ curve.)* → [[Drum Mic Technique]], [[1 Drums Kick Track|Drums Kick Track]], [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] — Mix with the Masters (Joe Chiccarelli), [[Tracking Drums - Joe Chiccarelli]]
- **The mix-bus "happy face" EQ: a broad low boost plus a broad high shelf, engaged from the very first minute of the mix rather than added at the end.** Andrew Scheps runs a Pultec emulation on his mix bus with **Low Boost ~2.5 dB at 100 Hz** and **High Boost ~4 dB, very broad, at 10 kHz** ("almost like a shelf at 10") — deliberately drastic on its own, but left on throughout the whole mix so it becomes "just what your mix sounds like from the very beginning" rather than a bolted-on mastering-style EQ. His stated preference is for the Pultec plugin emulation specifically over real Pultec hardware — "Pultecs seem to ring a little bit down on the low end especially... the plugins are generally a little tighter." → [[EQ]], [[Master Chain]], [[Limiting]] — Mix with the Masters (Andrew Scheps), [[Mix buss & drum processing with Andrew Scheps]]
- **Half of a parallel-compression pairing on a snare — this unit's broad EQ (top end, ~700 Hz boost, a bit of low end) run on the same parallel path as [[UAD UA 1176LN]], blended under a dry snare rather than as a plain corrective insert.** Bob Clearmountain, demoing live: EQ-only pass first (this unit's move), then the same path re-run through the 1176 as well, then blended with the dry signal — "you get a little bit of the natural sound but you get that compression." A 700 Hz boost is an unusual, higher-than-usual frequency choice for this EQ compared to this note's own low-trick/air-focused settings elsewhere — worth trying as a snare-body move, not just the classic low-end or high-air roles. → [[UAD UA 1176LN]], [[Parallel Processing]], [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] — Mix with the Masters (Bob Clearmountain), [[Bob Clearmountain's mixing techniques]]
- **Named directly as a go-to low-end EQ, praised specifically for how closely the plugin emulates the hardware's "sense of bottom."** On an 808 mix stage, after a distortion pass for grit: "I love this Pultec EQP-1A EQ, which is another one of my go-to EQs when I'm doing anything in the low end. I feel like it just brings a sense of bottom that is emulated pretty much like the exact hardware." A plain endorsement (no exact Low Boost/Atten frequency or amount stated) but a direct, working-engineer confirmation of the plugin's low-boost character and emulation quality specifically. → [[SUB Slot]], [[Saturation and Distortion]], [[Bass Design]], [[4 Bass/1 Digital Bass Track|Digital Bass Track]] — Mix with the Masters (Marcella Araica), [[Blending melodies with Marcella Araica]]
- **Owned best-match for a Jack Joseph Puig-signature Pultec-style EQ ("JJP Puig Tech"), used inside a parallel percussion bus purely to add top end for snap.** On a film/game percussion stem: "adding a little bit of the Chris Lord-Alge 1176, in addition to... a little bit of the JJP Puig Tech, some top end from that" — the EQ's job here is narrow and specific (boost the top for snap on the parallel path), not general tone-shaping. Sits after the FET compressor in the parallel chain, matching this note's own "EQ after compression on the way in" desk-order lesson above. *(No exact frequency/dB given — general starting point: a broad High BOOST around 10–12 kHz, similar to this note's own "silky top air" settings elsewhere on this page.)* → [[UAD UA 1176LN]], [[Parallel Comp Send]], [[Parallel Processing]], [[AIR Slot]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]
- **Insert a passive tube EQ purely for the coloration of its circuit, with no EQ move dialed in at all — "even if there's no EQ, it opens up the sound a little bit."** On a mix-bus "multibus" setup, a Curve Bender (the named unit — ADL/Anamod's officially-licensed reissue of this same Pultec EQP-1A/MEQ-5 circuit) sits in the chain "really just to bring the level down," but simply activating it, signal running through the tube stage and passive network, was enough to "open up" the sound on its own. Confirms this note's own "no flat bypass tone" mental model (below) with a live-session example: try running this plugin at a genuinely flat setting, purely for the tube-stage color, the way a corrective EQ elsewhere in the chain wouldn't be used. Part of a "many small barely-there stages, summed" mix-bus philosophy — see [[Parallel Processing]] for the full multibus structure. → [[EQ]], [[Parallel Processing]], [[Master Chain]] — Michael Brauer (Mix with the Masters), [[The power of multi-bus processing with Michael Brauer]]
- **Boost the bottom hard even on a naturally thin-sounding voice, when an earlier in-the-box stage has already thinned it further — the Pultec's job is putting analog richness back, not chasing the source tone.** Big broad EQ, top and bottom: a real boost around **~100 Hz** ("I definitely was... adding quite a lot of 100") plus a bit more top, printed into a chain where a driven parallel double had already thinned the vocal out for character — the low boost isn't tone-matching the singer's natural voice, it's compensating for what came before it in the chain. Feeds directly into the next stage: the boosted 100 Hz makes the following [[UAD UA 1176LN|1176]] react harder to the vocal's bass response too (see that plugin's Techniques). → [[BASS Slot]], [[EQ]], [[Compression Staging]], [[1 Main Vocal Track]] — Mix with the Masters (Ben Baptie), [[Julian Casablancas' vocal sound with Ben Baptie]]
- **Late-chain master tone shaping — small, deliberate moves once corrective/clarity stages are already done.** With dynamic EQ and an adaptive clarity tool (Gullfoss) already handling the heavy corrective work earlier in the chain, use a Pultec-style EQ for a final tone pass only: boost the lows a touch, boost the air band around **16 kHz**, dip roughly **700 Hz**, boost roughly **3 kHz** — every move gradual and subtle, explicitly framed as tone shaping near the end of the chain, not a corrective stage. → [[EQ]], [[Master Chain]] — Sage Audio, [How to Master a Song Start to Finish](https://www.youtube.com/watch?v=aUygMNRx2yE)
- **Push the low boost hard to hear what it's actually doing, then back off to a small boost for the real mix** — a quick-and-dirty way to learn a Pultec's low-boost character: exaggerate it first so the effect is obvious, then dial back to a tasteful amount once you know what you're listening for. → Sol State, [I found the 15 BEST FREE PLUGINS on the internet (and they are soooo good)](https://www.youtube.com/watch?v=0BTcW2PNrnA)

## Used in my chains

My **broad passive-EQ sweetener** — printed conservatively on the way in (tone-shaping proper happens later in Ableton). Famous for the "Pultec low trick" (boost + atten at the same low freq) and silky top air:

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 3, broad EQ (UAD Console)*: Low Atten 1–2 @ 60–100 Hz (rumble), +1–2 dB @ 12 kHz air, broad bandwidth.
- **[[1 Acoustic Piano Track|Acoustic Piano]]** — *slot 3*: +1 @ 12 kHz air max.
- **[[1 Drums Kick Track|Kick]]** (EQ) / **[[1 Drums Hat Track|Hat]]** (high-band sweetening only) — broad tone/air.

## Key Parameters

```visual-key
image: Images/UAD Pultec EQP-1A.png
coords: Images/UAD Pultec EQP-1A.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Low Frequency | Selects the low-shelf corner (20 / 30 / 60 / 100 Hz) | 60–100 Hz for kick/bass weight; 20–30 for sub air | 100 Hz on lead vocal, to re-add richness a driven parallel double had thinned out — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ② | Low Boost | Passive low-shelf boost at the selected freq | The "weight" half of the Pultec trick | A real boost, not subtle — compensating for an earlier thinning stage, not tone-matching the source — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ③ | Low Atten | Low-shelf cut at the **same** freq | Boost + Atten together = a bump + slightly-higher dip → thick lows with no mud (the classic trick) | — |
| ④ | High Boost Frequency | Selects the high peak (3 / 4 / 5 / 8 / 10 / 12 / 16 kHz) | 10–12 kHz for vocal/cymbal air; 3–5 kHz for presence | — |
| ⑤ | High Boost | Peaking boost at the selected high freq | +1–2 for silky air; passive design stays smooth even pushed | — |
| ⑥ | Bandwidth (Sharp ↔ Broad) | Q of the high boost | Broad for air/sheen; sharper for a focused presence lift | — |
| ⑦ | High Atten Frequency | Selects the high-shelf cut corner (5 / 10 / 20 kHz) | 10–20 kHz to gently tame harsh top | — |
| ⑧ | High Atten | High-shelf cut amount | A touch to soften a bright source without dulling it | — |
| ⑨ | Gain | Output/tube makeup | Level-match; the tube stage itself adds subtle color | — |

## Manual

- Hardware original: no verified-≥20KB PDF found via curl (attempts against archive.org's "Pultec_EQP-1A_owners_manual", benmook.com's scan, and the Elektrotanya service-manual mirror all failed — gated download page or a spec-sheet-sized scan under the size bar) — [Internet Archive listing](https://archive.org/details/Pultec_EQP-1A_owners_manual) · [ManualsLib copy](https://www.manualslib.com/manual/1006513/Pultec-Eqp-1a.html) kept as web-only references. `PDF gated`.

**High-level points** (the mental model — passive EQ, not an active filter):
- The EQP-1A is a **passive** LC-network EQ followed by a fixed tube make-up-gain stage — the curves are shaped by inductors/capacitors, not active filter math, which is why boosts stay smooth and hard to make sound bad even pushed.
- **Low Boost and Low Atten share the same frequency selector** and can be run simultaneously — that's the famous "Pultec trick": boosting and attenuating the same low frequency doesn't cancel, it nets a boost centered slightly above the selected frequency with a scoop just below it (tight low end, less mud) because the two networks peak at slightly different points despite sharing a nominal frequency.
- **High Boost and High Atten are on independent frequency selectors** (unlike the low side) and can each be dialed to a different corner — e.g. boost air at 10-12 kHz while attenuating harshness at 5 kHz, in one pass.
- **Bandwidth on the High Boost** goes from sharp to broad — broad is the classic "silky air" setting; sharp gets closer to a surgical presence bump.
- There is no "flat" bypass tone — the output tube stage colors the signal even with every control at zero, which is part of why engineers print through it even for a modest move.
- Designed as a **program/mastering EQ** for broad, additive moves — not a corrective/surgical tool; pair with a subtractive EQ (in this vault, [[Pro-Q 4]]) for anything that needs precision.

## See also

- Plugins: [[UAD UA 610-B]] · [[UAD Teletronix LA-2A]] · [[Pro-Q 4]]
- Effects: [[EQ]]
- Techniques: [[Gain Staging]]
