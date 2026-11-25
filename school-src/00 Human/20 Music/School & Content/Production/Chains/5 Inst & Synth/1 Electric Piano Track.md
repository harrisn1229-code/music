---
type: chain
aliases: ["Electric Piano Track"]
title: Electric Piano Track
chain_type: track
family: keys-synths
source: digital
routing: Electric Piano → Inst-Synth Group → Inst-Synth Bus → Master
uad_console: [UAD UA 610-B (plugin front end), UAD Teletronix LA-2A, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, LALA, Ghz Tupe 3, Chorus-Ensemble, PanMan]
status: default
tags: [chain, keys, track]
---

# Electric Piano Track

**Role:** Rhodes/Wurli VST — the warm harmonic bed of the neo-soul/hip hop lane. The classic EP sound *is* its signal chain: keys → tube preamp → chorus/tremolo.

**Chain philosophy:** clean → level → tube bark → motion → (tremolo).

## 1 — Sound Selection

- **[[Keyscape]] — the definitive EP box:**
  - *Rhodes — LA Custom E* / *Classic Mark I*: THE neo-soul/hip hop Rhodes. In-patch: a little tube drive for bark; tremolo OFF if using PanMan downstream (don't double-tremolo) → [[Keyscape — Rhodes LA Custom E & Mark I]]
  - *Wurlitzer 140B* (tube, warmer) or *200A* (the Supertramp/Queen pop-rock Wurli) → [[Keyscape — Wurlitzer 140B & 200A]]
  - *Clavinet C* for funk comping · *Pianet* for the "I Am the Walrus" tine sound → [[Keyscape — Clavinet C]] / [[Keyscape — Pianet]]
- **[[Operator]]** for DX7-style FM e-piano (80s glass; modern trap loves it pitched dark). → [[Operator — DX7 FM E-Piano]]
- **[[Nexus]]** EP patches when it needs to be produced-and-done in 10 seconds.
- 🎬 **A vintage/ambient Rhodes chain built around a found a cappella, plus a doubling piano layer for body.** Rhodes chords (freestyled in C minor, the personal home key, then transposed back to the source's pitch when done) → **J37 tape** ("my favorite preset," a "metallic drum loop" character) → **ShaperBox filter preset** (rolls off the highs, turns the part into more of a pad) → **spring reverb**, "to give it more of a vintage sound." A doubling piano (Teletone Audio "Postcard Piano," unowned — third confirmed use, see [[Plugin Wishlist]]) copies the exact same chords for body, then gets its own **"Reels" "Excited Tape" preset** (harshness + flutter both up) + a few original licks/riffs + a **Portal** instance for extra character. Owned-lane mapping: J37 → [[Kramer Tape]]; ShaperBox filter → [[Shaper]]; spring reverb → [[Ghz DC19 3]]. → [[Kramer Tape]], [[Shaper]], [[Ghz DC19 3]], [[Portal]], [[Plugin Wishlist]], [[Melody Writing]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- 🎬 **Voice-memo-to-DAW chord workflow + a named go-to Wurlitzer patch.** Chord progressions found away from the studio get voice-memo'd on the phone first "so I could remember it," then rebuilt in the DAW; the default go-to electric-piano sound named explicitly is Arturia Wurli V's "Plain Roads" preset (owned lane: [[Keyscape]] Wurlitzer 140B/200A above) — chords played in freely to match the voice-memo idea, then quantized. Processing: [[Kramer Tape]] (J37 best-match) → a very subtle reverb (size/decay/wet all pulled down) → a dotted delay preset with wow/flutter-style character reduced → a closing EQ low-cut. → [[Kramer Tape]], [[Reverb]], [[Delay]], [[EQ Eight]], [[Plugin Wishlist]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- 🎬 **West Coast "Mustard" bounce — layer TWO piano parts together, both in a major scale, for the bouncy melodic-chord identity.** Doubled piano + major scale specifically is what gives the chords their bounce — called out as ingrained DNA for the style, not a one-off preset choice. Rhodes/Roads + guitar accents get layered on top afterward as further texture. → [[Melody Writing]], [[Layering and Stacking]], [[Genre Drum Patterns]] — loner, [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)

## 2 — Programming Best Practice

- **The behind-the-beat feel can be printed, not quantized** — 🎬 Kenny runs the Rhodes through a Strymon Deco "for some lag": tape-slew as a feel artifact. Owned lane: [[Cassette]] or [[EchoBoy]] tape mode (single subtle repeat), or a small positive track delay — [R&B Vibes Beat](https://youtu.be/XJEEE7q2oEA).
- **Ninth chords nearly always** (Howard Lawrence's default color) — EPs love extensions; voice them mid-register so the mud zone stays clear.
- Commit to audio when the patch is dialed ([[FX Chain System]] bounce-in-place).

## 3 — Source → Ableton (UAD front end)

### 1. [[UAD UA 610-B]] — Preamp plugin — driven slightly harder than piano (EPs love tube input) · ~0 VU
### 2. [[UAD Teletronix LA-2A]] — 1–2 dB
### 3. [[UAD Pultec EQP-1A]] — low ATTEN @ 100 Hz if woolly

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Clean
- HPF 60–80 Hz · tame the honky 400–800 Hz zone if muddy · bell +2–4 kHz for tine definition on melodic parts.

### 2. [[LALA]] — Leveling
- **Peak Reduction for ~2.5 dB GR** (①) · **Comp mode** (③) · **Mix 100%** (⑤) · **Gain to unity** (②)
- **Why:** opto compression is historically what Rhodes ran into (an LA-2A in every 70s studio) — smooth sustain without killing the bark.

### 3. [[Ghz Tupe 3]] — Tube drive
- **Tube 30%** (① — low-medium; push to **50%** for bark on funky parts) · **Tilt slightly bright** (②) · **Mix 100%** (④)
- **Why:** A Rhodes' character comes from overdriving its amp; clean EP VSTs are missing the point.

### 4. [[Chorus-Ensemble]] — Motion
- **Mode Ensemble** (①) · **Rate 0.4 Hz** (② — slow drift) · **Amount 20%** (③ — low depth) · **Width 100%** (⑥) · **Dry/Wet 30%** (⑧) — the Dyno-My-Piano shimmer
- Pensado's "silky bed" recipe: micro pitch-shift ([[Little MicroShift]]) + **multiband saturation** ([[Saturn 2]] — warm the mids, leave the top clean) + Dimension-D-style chorus — judge by *feel*, not solo sound.

### 5. [[PanMan]] — Tremolo/auto-pan (optional)
- Slow sine, subtle — the suitcase-Rhodes stereo tremolo.

## 5 — Track FX (optional)

- **[[RC-20 Retro Color]]** instead of Tupe for the lo-fi trap/ambient loop flavor.
- 🎬 A **velocity→filter mapping** (Poly6-style: velocity drives cutoff) makes comping expressive without automation — Disclosure, [Howard Is Here](https://youtu.be/gCfU5Cq9WU4).

## 6 — Bus / Send FX (optional)

Routing: **Electric Piano → [[2 Inst-Synth Group|Inst-Synth Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain]]**.

- **[[Reverb Send Long]]** heavy on ambient EP beds · [[Delay Send Slap]] (Howard's one-slap) for the small-club feel · sidechain-duck vs kick with [[Kickstart 2]] on trap lanes.

## Variations

- **Trap/ambient EP loops:** RC-20, heavy long verb, kick duck.
- **Dry funk:** skip chorus + tremolo, more Tupe bark, mono, panned.

## From videos

- **Deliberately minor, sub-2 dB piano processing on an already-good mix stem: mid/side narrowing on the sides, a light kick-sidechain to pull certain frequencies more mono during kick hits, and an overall light EQ pass purely for thickness.** "This is all minor stuff, right? Taking out some sides, doing some really soft moves on here, a little bit of mid/side work on this piano, hitting it with a little bit of side chain off the kick, making it a little more mono in certain frequencies, and then doing some overall light EQ. Nothing over... nothing over 2 dB. For me it just kind of thickened him up a little bit." A useful reminder that a piano's stereo width can be narrowed dynamically (via sidechain) rather than only with a static M/S EQ move. → [[Width and Stereo]], [[Sidechaining]], [[EQ]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **A vintage/ambient Rhodes chain (J37 tape → ShaperBox filter/pad → spring reverb) plus a doubling Teletone Audio "Postcard Piano" layer (Reels "Excited Tape" preset → licks/riffs → Portal), built around a found a cappella** — see the inline 🎬 note in §1 above. → [[Kramer Tape]], [[Shaper]], [[Ghz DC19 3]], [[Portal]], [[Plugin Wishlist]], [[Melody Writing]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- **Voice-memo-to-DAW chord capture + Arturia Wurli V "Plain Roads" as the named go-to sound, with a tape → subtle reverb → dotted delay → EQ low-cut processing chain** — see the inline 🎬 note in §1 above. → [[Kramer Tape]], [[Reverb]], [[Delay]], [[EQ Eight]], [[Plugin Wishlist]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **Two bouncy pianos layered together, both in a major scale, for the West Coast "Mustard bounce" chord identity, plus Rhodes/Roads + guitar accents layered on top as texture** — see the inline 🎬 note in §1 above. → [[Melody Writing]], [[Layering and Stacking]] — loner, [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)

## Sources

Pensado's Place (Rhodes recipe) — link in [[FX Chain System]] · Kenny Beats — [R&B Vibes Beat](https://youtu.be/XJEEE7q2oEA) · Disclosure — [Howard Is Here](https://youtu.be/gCfU5Cq9WU4) · [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · loner — [the secrets behind DJ Mustard's ICONIC beats!?](https://www.youtube.com/watch?v=bID1-whdYB0)
