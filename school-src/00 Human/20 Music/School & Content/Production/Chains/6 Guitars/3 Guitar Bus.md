---
type: chain
aliases: ["Guitar Bus"]
title: Guitar Bus
chain_type: bus
family: guitars
source: mixed
routing: Guitar Group → Guitar Bus → Master
signal_chain: [Sie-Q, Kramer Tape, Oxford Inflator]
status: default
tags: [chain, guitar, bus]
---

# Guitar Bus

**Role:** Final color pass on the guitar section. In your routing, groups handle relationships and buses handle *finish* — broad tone + analog glue, nothing surgical.

## Chain overview
Musical EQ → tape → density. All gentle: the bus should be almost removable without the mix falling apart.

## Chain

### 1. [[Sie-Q]] — Musical tone
- Broad strokes only: a dB of top (Höhen) if the section is dull, a dB off the low-mids if thick
- **Why:** A character EQ makes "vibe" moves that a surgical EQ makes clinical — buses want musical, not corrective.
- 🎬 *From video:* a single shared guitar-bus EQ move used to replace duplicating the same correction on every individual guitar track — "why use twelve EQs when you can use one?" Andrew Scheps builds a dedicated guitar aux specifically for one overall mid-range presence lift, on top of (not instead of) any per-track EQ. → [[EQ]], [[EQ Three]] — Andrew Scheps (Mix with the Masters), [[Mixing Guitars & Bass - Andrew Scheps]]
- 🎬 *From video (clicky guitar):* Disclosure's guitar-bus recipe on "Talk" — **overdrive → a note-following EQ (Surfer EQ) → a small EQ to boost the click**, on a Telecaster tracked clean through a **Neve (light drive) → DBX 160** ("the best comp for clicky guitar; I'd track through one"). Note-following EQ tracks the played note so one moving band does the work of five fixed ones. → [[Sound Selection Guide]], wishlist: Surfer EQ / DBX 160 — Disclosure, [Talk](https://youtu.be/PBbnvElf9ac).

### 2. [[Kramer Tape]] — Tape glue
- **15 ips** (④) · **Flux low, to taste** (①) · **Record low** (②) · **Playback to unity** (③ — watch output)
- **Why:** Tape compression + harmonics is the classic "guitars glued to the record" finish — subtle rounding of transients that makes parts feel produced, not just summed.
- 🎬 *From video:* hardware validation of this exact stage — bussing several guitar parts (a strummed lead, a doubling tremolo part, a harmony line) out to a physical tape deck together and consolidating them to a stereo pass produced glue he credited directly to "tape's compression and saturation." → [[Sony TC-630]] — Zach Scholz, [Using Analog Tape to Glue a Mix Together](https://www.youtube.com/watch?v=Xk0LYE7HGAI)

### 3. [[Oxford Inflator]] — Density (optional)
- Effect 15–25%
- **Why:** A touch of perceived loudness so the section holds up against the drums bus without pushing faders.

## Variations
- **Add an SSL-style bus compressor ahead of this chain's tone/tape/density stages when the section needs glue, not just color.** Philippe Zdar treats an SSL-style bus comp on the guitar return as capable enough alone to mix an entire record with — "if you have only this you can still mix lots of songs with only this, you don't need all of this, of course it's just a luxury." Pairs with a same-pan wet/dry double for warmth without added width. → [[Compression]], [[Width and Stereo]] — Philippe Zdar (Mix with the Masters), [[Mixing Phoenix Guitars - Philippe Zdar]]
- **Fold guitars into a single combined "All Music" bus instead of a dedicated guitar bus.** Marcella Araica routes guitars through the same bus as samples and transitional risers (no separate guitar bus in her signal flow) and adds one shared UA 33609 there, dialed light/breathing rather than heavy — see [[3 Inst-Synth Bus|Inst-Synth Bus]] for the full settings and [[Committing and Printing]] for the printing step that precedes it. Worth reaching for on a simpler session where a dedicated guitar bus (this note's default) is more separation than the arrangement needs. → [[3 Inst-Synth Bus|Inst-Synth Bus]], [[Compression Staging]] — Mix with the Masters (Marcella Araica), [[Printing stems through analog equipment with Marcella Araica]]
- **Trap/pop with sparse guitar:** bypass the whole bus — one guitar loop doesn't need section treatment.
- **Rock-forward mix:** swap Kramer for [[Decapitator]] (Style A, mix ~20%) for grit instead of gloss.
- 🎬 *From video:* route a bass part into THIS bus rather than the [[3 Bass Bus|Bass Bus]] when it needs its low end deliberately capped — Peter Katis put an electric bass guitar into the guitar bus "because I did not want it to have a lot of low end," pairing the bus's own already-gentle, non-low-end-focused tone stage with a tremolo on the bass itself ([[Auto Pan]], see [[Bass Design]]) so the part stays present without competing with the song's real sub. A genuine cross-bus routing move, not just a processing choice — worth reaching for whenever a bass-shaped part (a guitar-bass hybrid, a bass lick meant to read thin) shouldn't get the [[3 Bass Bus|Bass Bus]]'s full low-end treatment. → [[Bass Design]], [[Arrangement and Song Form]] — Peter Katis (Mix with the Masters), [Mix breakdown with Peter Katis](https://www.youtube.com/watch?v=o4F2EO_KMLk)
