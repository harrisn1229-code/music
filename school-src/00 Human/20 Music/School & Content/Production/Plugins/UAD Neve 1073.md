---
type: plugin
title: "UAD Neve 1073"
category: Preamp & EQ (Unison)
vendor: "Universal Audio"
platform: UAD Console
status: owned
tags: [plugin, uad, unison]
manual_enriched: true
video_enriched: true
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# UAD Neve 1073

![[Images/UAD Neve 1073.png]]

**Category:** Preamp & EQ (Unison)
**Vendor:** Universal Audio — owned (paid add-on, confirmed 2026-07-16); stock-bundle sibling is [[UAD UA 610-B]]

## What it is

Emulation of the Neve 1073 console module — the most recorded preamp/EQ in history. Class-A transformer "iron" that adds weight and sheen; Unison version models the input stage on the [[Universal Audio Apollo Twin MkII]].

## What it's used for

Body + silk on anything: vocals, acoustic/electric guitar, bass DI. Drive the red gain for thick harmonic push, keep it low for clean weight.

## Key settings

- **Mic gain:** lowest position that reaches level (condensers run hot); output trim to ~−18 dBFS average.
- **EQ on the way in:** high shelf +1–2 dB @ 12 kHz max, HPF off — sweeten lightly, never carve (carving happens in Ableton where it's undoable).
- **Ultimatum tip:** Disclosure's tracking chain is 1073 (treble boost, roll a little bass) → LA-2A → air EQ — see [[Disclosure - Ultimatum Breakdown + Breakbeat]].

## FX chain notes

Primary Unison preamp in `uad_console` chains — the 1073's gentle iron adds body to acoustics and weight to vocals; swap to [[UAD UA 610-B]] for a rounder tube flavor. See [[1 Acoustic Guitar Track|Acoustic Guitar Track]].

## Techniques

- **Best-match owned equivalent for a Neve 88R console's preamp+EQ stage on piano tracking — "a bit of top and a bit of bottom" is the whole EQ move.** Greg Wells, on a grand-piano session: "we are going to take advantage of this really pristine Neve 88R console that's here, and the mic pres are fantastic, the EQ is also fantastic — we're probably going to add a bit of top and a bit of bottom." A light, additive shelf move (not a carve) on a hammer/room-mic'd piano signal, same gentle-sweetening philosophy this note's own "EQ on the way in" guidance already states. Full mic-array and downstream-compressor context on [[Piano Recording]]. → [[Piano Recording]], [[EQ]], [[Gefell UMT70S]] — Greg Wells (Mix with the Masters), [[Producing and recording piano with Greg Wells]]
- **Best-match owned mic pre for recreating an overdriven Helios console channel — drive the input into "gradual, just enough" distortion rather than tracking clean, exactly the move Eddie Kramer names as his own modern fallback when the specific Waves HLS plugin (which models this same Helios mic-pre character) isn't available.** "The way I would approach it would be use a normal mic pre, start to gradually distort the input, just gradually, just enough, and then use the plug-in for the EQ, and you'll get very, very, very close to that." Directly reinforces this note's own "drive the red gain for thick harmonic push" guidance — here specifically as a *recreation* technique for a named historic console sound (the crunchy 12-string on "All Along The Watchtower"), not just a general character choice. Pair with hot tape print for the full stacked effect — see [[Kramer Tape]]. Waves HLS itself is unowned — see [[Plugin Wishlist]]. → [[Kramer Tape]], [[Saturation and Distortion]], [[1 Acoustic Guitar Track|Acoustic Guitar Track]] — Mix with the Masters (Eddie Kramer), [[Eddie Kramer's story behind "All Along The Watchtower" by Jimi Hendrix]]
- **The shared front-end preamp for both a mic'd upright bass AND a lead vocal in the same tracking breakdown — one unit doing double duty across two very different sources.** Al Schmitt's setups: bass (dual Neumann M149s) → Neve preamp → tube compressor tapped ~1 dB for color; vocal (Neumann U-47) → Neve preamp (the console's 88R module) → compressor barely engaged, because the singer's own mic technique already does most of the leveling. Worth noting as validation of this note's own "body + silk on anything: vocals... bass DI" framing — here it's literally the same preamp choice on both a plucked/bowed acoustic instrument and a voice, not a coincidence of two separate engineers' habits. → [[UAD Teletronix LA-2A]], [[Vocal Mic Technique]], [[1 Main Vocal Track]] — Al Schmitt (Mix with the Masters), [[Recording techniques with Al Schmitt]]
- **Neve stereo-bus character, direct A/B against an API-flavored path: "low bottom end, like warm, thick"** — a character some call "fuzzy," some call "glue." Live comparison summing a stereo bus through a Neve-flavored analog stage vs. an API-flavored one: the Neve stage adds low-end warmth and thickness (the same transformer-iron behavior this note's own "What it is" section describes at the channel-strip level, shown here operating at the bus/summing stage instead), where the API path stays focused and midrange-forward by contrast. Framed as a tonal either/or, not a correctness call — "it's just choosing different things, do I want the Neve, what kind of stereo bus do I want." → [[API-2500]], [[Critical Listening for Mastering]], [[Saturation and Distortion]] — Jack Joseph Puig (Mix with the Masters), [Listening to the details with Jack Joseph Puig](https://www.youtube.com/watch?v=20CbTBdY8sk)

## See also

- Plugins: [[UAD UA 610-B]] · [[UAD Teletronix LA-2A]] · [[UAD Pultec EQP-1A]]
- Techniques: [[Gain Staging]] · [[EQ]] · [[Sound Palette]]

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/UAD Neve 1073 (hardware - Neve 1073).pdf|Local PDF]] · [AMS Neve 1073 & 1084 Channel Amplifiers User Guide (Issue 5.2), official manual for the original hardware](https://cdn.prod.website-files.com/6020bb169c964f974852ad3d/61ca27f35fc8025d886ce4c0_Neve%201073%20Manual.pdf)
- 📄 UAD plugin manual (web-only, no separate PDF): [Neve 1073 Preamp & EQ Manual — Universal Audio Support](https://help.uaudio.com/hc/en-us/articles/4419497223188-Neve-1073-Preamp-EQ-Manual)

**High-level points:**
- The 1073 is a **Class-A, transformer-coupled** mic pre + 3-band EQ — the transformers (input and output) are most of what people mean by "Neve iron": they saturate gently and add low-order harmonic thickness before anything hits the EQ stage.
- Only **one HF shelf frequency exists** — fixed at 12 kHz. Unlike most modern EQs there's no HF frequency selector; the "air" move on a 1073 is always at 12 kHz, which is why engineers reach for a different EQ (Pultec, air-band shelf) when they need brightness elsewhere.
- The **mid band is peaking only** (no shelf option), fixed-Q, with 6 selectable center frequencies (0.36/0.7/1.6/3.2/4.8/7.2 kHz) — there's no continuously-sweepable frequency, so "close enough" stepped choices are the era-authentic workflow, not a limitation to fight.
- The **High Pass Filter is a separate passive network** from the EQ bands entirely (18 dB/octave, 4 fixed frequencies: 50/80/160/300 Hz) and can be engaged independently of whether the EQL (equalizer) section is switched in or out.
- **EQL button = full EQ bypass** — switches the entire 3-band EQ (not just one band) in or out of circuit, useful for instant preamp-only A/B against the EQ'd signal.
- **Phase button** flips polarity 180° at the balanced output — a per-channel phase-invert switch built into the module itself, not something you need a separate utility for.
- Mic input gain runs **+80 dB down to −20 dB in 5 dB steps** (stepped, not continuous) — the "trim" control most engineers discuss as pushing the input transformer harder for grit is this same stepped mic-gain knob, not a separate drive stage.
- Line input gain range is **+20 dB to −10 dB in 5 dB steps**, separate control from mic gain — the Unison plugin models the same input-stage behavior, so gain-staging habits (run it hot, trim the make-up at the output) carry over directly.

## Used in my chains

My **Unison preamp** — printed on the way in (conservative, because printed is forever), gain into gentle color, level to ~0 VU. The pop/rock classic (mid-forward weight + silk):

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 1 (UAD Console)*: gain into gentle color, ~0 VU (alt [[UAD UA 610-B]] for rounder tube on ballads).
- **[[1 Drums Kick Track|Kick]]** / **[[1 Drums Hat Track|Hat]]** (light, ~0 VU) — preamp color on drum sources.
- **[[1 Electric Guitar Amp Track|Electric Guitar Amp]]** — Unison preamp per mic; **[[1 Synth Lead Track|Synth Lead]]** — light, ~0 VU.
- Thin-DI first-aid: 1073 drive + [[Ghz Tupe 3]] = the owned "CLA Guitars."

## Key Parameters

```visual-key
image: Images/UAD Neve 1073.png
coords: Images/UAD Neve 1073.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Mic Gain | Input trim, +80 dB to −20 dB in 5 dB steps, feeding the Class-A input transformer. Drives the "iron" harder as gain increases. | For [[BASS Slot]]/vocal tracking in Ableton: push gain a few steps past unity-need, then trim back with the Output control — the transformer saturation is gain-dependent, so overdriving-then-trimming is how you dial in more or less "Neve" character, not just level. | Disclosure's tracking chain runs 1073 (treble boost, roll a little bass) → LA-2A → air EQ — see [[Disclosure - Ultimatum Breakdown + Breakbeat]]. |
| ② | Output Level | Post-EQ, pre-output trim. Unity at full clockwise; ~20 dB down at mid-position. | Use to recover headroom after pushing Mic Gain hot — keeps the transformer color without clipping downstream. | — |
| ③ | HF Shelf (12 kHz, fixed) | ±16 dB shelf, single fixed frequency — no sweep. | The classic "air" move on vocals/acoustic — since it's fixed at 12 kHz, layer a second EQ ([[Sound Palette]] [[AIR Slot]]) if you need a different air frequency. | — |
| ④ | Mid Peak (6-position) | ±18 dB peaking, fixed Q, selectable center 0.36/0.7/1.6/3.2/4.8/7.2 kHz. | Pick the nearest stepped frequency rather than fighting for a continuous sweep — era-authentic workflow; use a second parametric EQ afterward for surgical fixes. | — |
| ⑤ | LF Shelf (4-position) | ±16 dB shelf, selectable 35/60/110/220 Hz. | Higher frequencies (110/220 Hz) give a fast "add body" move on thin DI/vocal sources; lower (35/60 Hz) for true low-end weight on bass/kick. | — |
| ⑥ | High Pass Filter | Passive, 18 dB/octave, 4 fixed points: 50/80/160/300 Hz — independent of the EQL bypass switch. | Engage at 80–160 Hz on vocals/guitar to clear mud before it ever reaches Ableton — cheaper to fix here than in-DAW. | — |
| ⑦ | EQL (bypass) | Switches the entire 3-band EQ in/out of circuit. | Flip off for an instant preamp-only vs. preamp+EQ A/B while tracking. | — |
| ⑧ | Phase | 180° polarity invert at the balanced output. | Use when combining a DI + mic'd signal on the same source and they're summing destructively. | — |

## See also (Key Parameters cross-links)
Palette: [[BASS Slot]] · [[AIR Slot]] — Effects: [[EQ]] · [[Gain Staging]]
