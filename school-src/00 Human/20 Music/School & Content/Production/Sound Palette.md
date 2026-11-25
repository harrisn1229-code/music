---
type: reference
title: Sound Palette
tags: [production, arrangement, frequency, reference]
---

# Sound Palette

Pick sounds by **slot**, not by instrument. Every sound in a mix occupies a frequency/role slot; sounds in the same slot are **interchangeable** (an e-piano and a synth bed are the same *arrangement object* — warm sustained low-mid harmony), and two sounds fighting for one slot is where mud comes from. Fill each slot once, on purpose, and the mix balances itself before any EQ ([[Masking and Carving]] is the repair shop; this page is how you avoid needing it).

**Rules of thumb**
- One **main occupant** per slot per section. A second occupant enters only when the first leaves (verse Rhodes → chorus pad = a swap, not a stack).
- A sound's slot = where its **energy** lives, not its note range (an 808's harmonics reach the BASS slot; a bright pad is BED + AIR).
- Arrangement contrast = **changing which slots are filled**, not adding more sounds to filled ones.
- Every recipe/patch in the instrument notes is tagged with its slot (see [[Serum 2]] / [[Omnisphere]] Patch Recipes).

## The slots

| Slot | Range | Role in the song | Interchangeable sound types | Go-to sources |
|---|---|---|---|---|
| **[[SUB Slot|SUB]]** | 20–60 Hz | Physical weight; felt not heard | 808, sub sine, synth sub, bass gtr fundamental | [[Serum 2]] 808 recipe · [[Omnisphere]] sub · [[Analog]] |
| **[[BASS Slot|BASS]]** | 60–250 Hz | The groove's pitch; warmth | Bass gtr, Juno/synth bass, Reese, 808 harmonics, piano LH | [[Model 84 Polyphonic Synthesizer]] bass · [[Serum 2]] growl · [[Keyscape]] piano LH |
| **[[BED Slot|BED]]** | 250–800 Hz | Warm sustained harmony; the emotional floor | Pads, e-piano/Rhodes, Wurli, organ, rhythm gtr (open), warm keys, synth bed | [[Omnisphere]] bed recipe · [[Keyscape]] Rhodes/Wurli · [[Model 84 Polyphonic Synthesizer]] pad · [[Drift]] |
| **[[MIDS Slot|MIDS/COMP]]** | 800 Hz–2.5 kHz | Rhythmic harmony, comping, riffs; density & drive | Comping keys, clav, muted gtr riffs, plucks, stabs, vocal chops | [[Serum 2]] pluck · [[Omnisphere]] stab · [[Keyscape]] Clavinet |
| **[[LEAD Slot|PRESENCE/LEAD]]** | 2.5–6 kHz | The thing you're listening *to* | Lead vocal, lead synth, lead gtr, bell/whistle hooks | [[Serum 2]] leads · [[Omnisphere]] Mike Dean lane · vocal chain |
| **[[AIR Slot|AIR]]** | 6 kHz+ | Sheen, expense, openness | Hats/shakers, shimmer verb, breath, pad harmonics, [[Fresh Air]] lift | sends + [[ValhallaShimmer]] · [[Fresh Air]] |
| **[[TEXTURE Slot|TEXTURE]]** *(overlay)* | full-band, low level | Ambience, era, "air in the room" — glue, not content | Vinyl/tape noise, granular atmospheres, room tone, crowd | [[RC-20 Retro Color]] noise · [[Omnisphere]] granular texture |
| **[[TRANSIENT Slot|TRANSIENT]]** *(overlay)* | broadband hits | Rhythm skeleton | Drums/percussion — kick straddles SUB+BASS, snare MIDS+PRESENCE, hats AIR | Drum racks · [[FX Chain System]] drum chains |

## How to use it

1. **Writing/producing:** sketch the section as slots first — "SUB: 808 · BED: Rhodes · LEAD: vocal · AIR: hats · TEXTURE: crackle." Empty slots are a choice, not a gap (sparse verse = BED empty).
2. **Sound selection:** need warmth? Shop the BED row — *any* entry works, pick for vibe (Rhodes = soul, pad = dreamy, rhythm gtr = band). Don't audition across slots.
3. **Mix trouble:** find the slot with two occupants. Swap one out, move it an octave (changes its slot), or carve ([[Masking and Carving]]).
4. **Hook focus:** per section, decide what the hook is — whatever it is becomes the [[LEAD Slot]] occupant for that section: pushed high in the mix, with every competing track carved around it (dynamic dips keyed by the hook). Each slot page has a "When it's the hook" / "When it competes" pair for exactly this call.
5. **Genre skins:** the same slot map wears different clothes — trap: 808/–/dark pad/–/AT vocal/hats/–; bedroom pop: bass gtr/chorused gtr BED/diary vocal/dim AIR/tape TEXTURE ([[Bedroom Pop - Indie]]).

*Companions: [[Stereo Field]] (the horizontal axis — pan map per slot, mono-first workflow, width tools, phase checklist) · [[Session Layout]] (how the slots show up in an actual Live Set — routing hierarchy, track order, clip-color slot map) · [[Instrument Preset Map]] (where to find patches) · [[Sound Selection Guide]] (recommended sounds/tones by role — what to reach for) · [[Sampling and Sound Selection]] (how to sample) · [[FX Chain System]] (how each slot gets processed) · Patch Recipes in [[Serum 2]] and [[Omnisphere]] (how to build slot occupants from scratch).*

## From books

- **The slot logic applied *inside* a single instrument: a drum kit's four lanes get their own ascending high-pass ladder, so kick/toms/snare/hats never share a zone.** Low cuts: kick **40–60 Hz** · toms **60–200 Hz** (per drum) · snare **100–200 Hz** · hats **200–300 Hz+**. Body boosts sit immediately above each cut (kick 80–100 · snare 200–300 · toms 100–300), presence boosts stagger up top (kick 2–4 kHz · snare 5–7 · toms 5–10 · hats high-shelf 7–10+), and toms lose their 300–800 Hz boxiness. A useful reminder that "one occupant per slot" is a rule you can run at kit scale as well as at arrangement scale — each slot page now carries its own drum-lane line. → [[SUB Slot]], [[BASS Slot]], [[BED Slot]], [[MIDS Slot]], [[LEAD Slot]], [[AIR Slot]], [[TRANSIENT Slot]], [[Masking and Carving]], [[EQ]] — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]

## From videos

- **A guitar-specific instance of "give each layer its own space" decided at the instrument, before tracking: separate three stacked rhythm-guitar parts by pickup selection + effect rather than by writing different material.** Bed/arpeggiated part on the middle pickup (both pickups blended) with light tremolo; backbeat-accent part switched to the bridge pickup with tremolo off "to give our second part its own sonic space"; melodic double-stop part switched again to the neck pickup for the same stated reason. All three parts share the same underlying triad chords — the separation is entirely tone/pickup, decided at the amp, not carved afterward with EQ ([[Masking and Carving]] is the repair-shop version of this same problem). Full three-part system → [[Layering Rhythm Guitar Parts with Triads]]. — Jack Ruch, [[Make Your Rhythm Guitar Sound Like A Record]]
- **Pre-highlight patches before the session** — Disclosure starred their favorite [[Roland D-50]] sounds the afternoon before streaming "so there's less messing about" mid-write; choose sounds while browsing, write while writing (the palette-slot philosophy, from the source) — Disclosure, [Making Beats + Talk stream](https://youtu.be/1GhqAf9lc3A)
- **Build a palette by deciding what to say no to, not by collecting more samples** — pick a specific reference feel (KSHMR's example: a "Peru meets psy-trance" hybrid), then actively reject anything outside it — a clean snare loses out to ethnic percussion that fits the Peru side, and only the hardest psy-trance sounds get used rather than the genre's whole palette; constraint is what produces a recognizable, personal sound — producers with a distinctive signature are reliably using fewer, more deliberately-chosen sources, not pulling from everything available. — KSHMR (Sol State), [KSHMR MUSIC PRODUCTION Q&A](https://www.youtube.com/watch?v=ZdipHMBxPlA)
