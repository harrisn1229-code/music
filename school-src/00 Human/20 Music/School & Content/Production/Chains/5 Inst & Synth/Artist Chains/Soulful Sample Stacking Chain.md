---
type: chain
title: Soulful Sample Stacking Chain
reference: "loner-style Rhodes-led soulful sample, built as a 6-element bed then finished with outside-sample stacking"
chain_type: style
family: keys-synths
routing: Electric piano + bass + 2 synth textures + accent synth + piano bed → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Bass Group|Bass Group]] → sample-stack pass (perc loop, strings, guitar, brass, all Splice) → bounce/consolidate → [[3 Inst-Synth Bus|Inst-Synth Bus]] → Master
signal_chain: [AAS Lounge Lizard EP + spring reverb + Ghz Vulf Compressor 3 + EQ + ValhallaDelay, Kontakt Scarbee Rickenbacker bass + Guitar Rig crunch + small mono spring reverb + 50 Hz low cut, Arturia Juno "Girl in Africa" preset texture, Portal "Backfire" preset + half-time, Arturia Jupiter-8 "Give Me a Sign" (Layers Analog Lab bank) + heavy reverb + Cassette Crushed, Kontakt "Gentleman" piano + Ghz Vulf Compressor 3 + EQ + spring reverb (near-mono), Splice perc loop, Splice string loop (chop/reverse/key-match/stretch) + Cassette Lo-Fi Drums + heavy reverb + delay + mono, Splice wire-guitar sample (pitch/stretch) + reverb + EQ, Splice brass sample (reversed) + half-time + 100% wet vintage reverb + hard pan]
status: video-derived
tags: [chain, keys, bass, synths, style, sampling, layering, vintage]
---

# Soulful Sample Stacking Chain

**Reference/vibe:** a Rhodes-led "soulful sample" built in two clean stages — first a six-element instrumental bed (electric piano, bass, two synth textures, an accent synth, a second piano), each processed with its own small effects chain that leans on **spring reverb** as the vintage-color constant across every layer; then a **"sample stacking"** finishing pass that reaches for outside Splice samples (a perc loop, strings, a "wire guitar," brass) layered on top of the finished bed for accents/melodies/textures the bed itself can't easily produce. Reverse-engineered from a loner (YouTube) breakdown, [use this easy technique to take your samples to the next level!? (making a soulful sample)](https://www.youtube.com/watch?v=vN0fgGDxp6E). The reusable idea distinguishing this chain from [[Future-Style Vintage Sample Chain]] and [[Afro Sample Chain]]: **sample stacking as a named, deliberate workflow** — don't force every element from a VST when a real recorded performance (violin, guitar, brass) is one Splice search away; source it, then shape it around what you've already written rather than composing and processing it yourself.

## Chain overview

Ten elements total: six written/programmed (electric piano, bass, two synth textures, an accent synth, a second piano), then four sample-stacked on top (a perc loop, a strings sample, a guitar sample, a brass sample). The bed elements share a consistent processing language — spring reverb + a compressor + EQ + delay, at varying intensities per element's role (sustained chord bed vs. single-note accent) — while the stacked samples share a consistent SOURCING language (Splice search → chop → reverse where useful → confirm key → time-stretch → shape with reverb/EQ/delay to sit in the mix, usually pushed toward mono for its own pocket).

## 1. Electric piano — AAS Lounge Lizard

- **Instrument:** AAS Lounge Lizard, chosen directly after watching a "K1" breakdown video that used a real Rhodes — see [[Plugin Wishlist]] (repeat-use unowned electric-piano VST on this vault).
- **Processing:** spring reverb (short, pushed toward mono) → [[Ghz Vulf Compressor 3]] (tight compression, loud/close-together) → EQ (cut lows, boost some highs) → [[ValhallaDelay]] (short mix, feedback pushed high, Wow/Flutter left on for detune character, delay time kept short enough that it reads "almost like a chorus effect" rather than a distinct echo).
- 🎬 *From video:* a short, high-feedback, unsynced-ms delay is a deliberate chorus substitute — the same short/high-feedback pattern also documented on [[ValhallaDelay]] from a different loner build (dark synth trap counter melody). Worth reaching for whenever a part wants chorus-like thickening without an actual chorus device.

## 2. Bass — Kontakt Scarbee Rickenbacker

- **Instrument:** Scarbee Rickenbacker in [[Kontakt 7]] — "I use this all the time," the most repeat-used instrument on this vault's sample-flip breakdowns (see [[Sound Selection Guide]]).
- **Processing:** [[Guitar Rig 7 FX]] (crunch, to help the bass stand out in the mix — unowned, demo-only) → a very small spring reverb (all-the-way short, all-the-way mono, mix brought well down so it doesn't muddy the low end) → low cut around 50 Hz to remove "stubby" sub-adjacent frequencies.
- 🎬 *From video:* "you don't want to muddy out your low end with too much reverb, but it just adds a nice little bit of texture" — the mono + short + low-mix combination is the whole trick for putting any texture on a bass without smearing the low end. → [[BASS Slot]], [[Bass Design]]

## 3. Synth texture — Juno, "Girl in Africa" preset

- **Instrument:** owned-lane [[Roland Juno-106]] territory (Softube Model 84 / TAL-U-NO-LX), preset "Girl in Africa" (name as given in the video — no owned VST ships this exact preset; treat as a starting-point character).
- **Processing:** filter cutoff/frequency brought down a little for less high end, then a simple original melody played on top.
- 🎬 *From video:* a synth added purely as "a little textural part," not a lead — kept deliberately understated relative to the piano/bass foundation. → [[TEXTURE Slot]]

## 4. Accent texture — Portal, "Backfire" preset

- **Device:** [[Portal]] — "Backfire" preset, plus a half-time device to pitch/tempo it lower.
- 🎬 *From video:* a brand-new purchase used on the very first project after buying it — reached for immediately rather than deep-dived, consistent with Portal's other logged "browse presets, print what sounds good" workflow (see [[Portal]]'s Techniques section).

## 5. Accent synth — Jupiter-8, "Give Me a Sign" (Layers Analog Lab bank)

- **Instrument:** owned-lane [[Roland Jupiter-8]] territory (Arturia Jup-8 V in the source, via Analog Lab, "Layers" third-party preset bank) — "Give Me a Sign" preset, used for exactly ONE note across the whole track.
- **Processing:** a really heavy reverb (mix at 81, very heavy decay) → [[Cassette]] "Crushed" preset, deliberately pushed hardest of any element in the build "to make it really stand out within the mix."
- 🎬 *From video:* the single most heavily processed layer in the whole bed is also the one doing the LEAST — a one-note accent, not a sustained part. Save your most extreme processing for the smallest, most attention-grabbing element rather than spreading heavy treatment evenly across every layer.

## 6. Second piano — Kontakt "The Gentleman"

- **Instrument:** "The Gentleman" patch in [[Kontakt 7]] — a second confirmed use of this exact patch on this vault (see [[Kontakt 7]]'s Techniques section for its other, differently-processed use on a 2000s R&B sample).
- **Processing:** [[Ghz Vulf Compressor 3]] again, dialed less harsh than on the Rhodes ("didn't want it too crazy") → EQ (cut lows around 200 Hz) → spring reverb again, mix pushed higher than the other layers, decay length brought up a little. Mixer track pushed closer to mono than the rest of the bed for its own pocket.
- 🎬 *From video:* the same compressor plugin dialed to two different intensities across two layers in one build (Rhodes = tight/aggressive, this piano = gentler) — treat plugin choice and plugin SETTING as two separate decisions, not "pick the tool once and reuse the preset." → [[Width and Stereo]]

## 7. Sample stack 1 — perc loop

- An unnamed perc loop placed underneath the finished bed purely "to give it a little bit more." → [[Sampling and Sound Selection]]

## 8. Sample stack 2 — Splice strings

- **Source:** a Splice string loop — reached for instead of composing/processing a realistic string melody from a VST, "obviously it's really hard to replicate realistic sounding violins and strings."
- **Prep:** chop the wanted part → reverse it → confirm it's in-key → time-stretch to tempo.
- **Processing:** [[Cassette]] "Lo-Fi Drums" preset (a filtering/character role on a melodic layer, not on drums — cross-role reuse) → heavy reverb (to drown it out) → a medium-sized delay (FL Studio "Fruity Delay" in the source; owned-lane: [[Delay]]) → pushed to mono for its own pocket.

## 9. Sample stack 3 — "wire guitar" (loner's favorite element of the video)

- **Source:** a Splice sample searched by the term "wire guitar," auditioned until a fitting melody was found, then dropped in.
- **Prep:** pitched and time-stretched to key/tempo, a specific section chosen by ear.
- **Processing:** reverb (to drown it out a bit) → EQ (cut some lows + specific mid-range frequencies described as "kind of a bit annoying").

## 10. Sample stack 4 — brass

- **Source:** a Splice brass sample, added because the build "just needed one more thing."
- **Prep:** reversed, pitch kept intact (a different texture than a straight reverse-and-repitch).
- **Processing:** half-time device → vintage reverb at 100% wet mix ("really drowned out") → panned hard to one side.

## Arrangement

**Two stages, and the second one is the arrangement.** Six written/programmed bed elements first (EP, bass, two synth textures, accent synth, second piano), *then* four sampled layers stacked on top (perc loop, strings, guitar, brass).

| Stage | Elements | Slots |
|---|---|---|
| The bed | 6, written | BASS · BED · MIDS |
| The stack | 4, sampled | MIDS · AIR · TEXTURE |

**The move — write the bed, sample the top.** The written layers share one processing language (spring reverb + compressor) so they read as one instrument; the sampled layers arrive already sounding like a record. That split is what makes ten elements cohere instead of pile up.

**Density: 10 — the densest build in this folder.** It works because the bed is uniform. If the six written elements had six different reverbs, this would be mud.

## Variations

- **The core reusable idea — sample stacking — generalizes past this exact build.** loner explicitly frames it as direction-agnostic: start from your own written material and layer outside samples on top (this build), OR start from an outside sample (e.g. a simple guitar chord progression) and write your own material on top of THAT instead. Either direction is "sample stacking."
- **Spring reverb as a single-tool vintage-color signature** — used on all six bed elements in this build, at varying mix/decay per role. A simpler, more consistent version of the "one reverb type, tuned per layer" idea also seen on [[Future-Style Vintage Sample Chain]] ("use room presets... especially with real-instrument samples").
- **Match processing intensity to the element's job, not a house style** — the loudest/most-processed layer here (Jupiter-8 accent) is also the smallest (one note); the most-understated layer (Juno texture) does the least standalone work. Process for the role, not out of habit.

## Notes

- No exact reverb decay times, compression ratios/attack-release, or EQ Hz figures were given for most stages beyond the qualitative descriptions above (spring reverb settings, Vulf Compressor amounts) — treat every device setting as a starting point to dial in by ear. Confirmed exact figures: bass low cut ~50 Hz, second-piano EQ cut ~200 Hz, Jupiter-8 reverb mix 81%, brass reverb mix 100%.
- Unowned/best-match sources: AAS Lounge Lizard (electric piano — see [[Plugin Wishlist]]), Guitar Rig 7 FX (demo-only on this machine), Arturia Juno emulation + Analog Lab "Layers" bank (Jupiter-8 preset pack) — see [[Plugin Wishlist]]. Everything else (Kontakt instruments, ValhallaDelay, Cassette, Portal, EQ, general reverb/delay) is fully owned.

**Sources:** loner — [use this easy technique to take your samples to the next level!? (making a soulful sample)](https://www.youtube.com/watch?v=vN0fgGDxp6E) (00:08:19, 2021-11-28) · full note: [[loner - use this easy technique to take your samples to the next level!? (making a soulful sample)]]
