---
type: chain
title: Southside Dark Synth Trap Chain
reference: "Southside-style dark synth trap beat for Future/Roddy Ricch, built from scratch"
chain_type: style
family: keys-synths
routing: Main pad + low-fill pad + counter melody + hook stab + drums → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Drums Group|Drums Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] → [[Master Chain|Master]]
signal_chain: [Analog Lab "Providence/Selena" pad → reverb + half-time 1/8 delay + EQ + volume/filter/width Shaper stack, Analog Lab "Lost/Loophole" low-fill pad → release/filter tweak + band-pass EQ, Kontakt "Tape Synths" counter melody → ValhallaDelay + vintage reverb + Reels tape, copied-chord hook stab → reverb + delay + EQ, own drum kit → room/snare/hats/rolls/percs/808/kick]
status: video-derived
tags: [chain, keys, synths, trap, style, dark, southside]
---

# Southside Dark Synth Trap Chain

**Reference/vibe:** a from-scratch dark synth trap instrumental in the style of Southside's work for Future/Roddy Ricch. Reverse-engineered from a loner (YouTube) breakdown, [how southside makes dark synth trap beats for future from scratch (dark melody music theory)](https://www.youtube.com/watch?v=TVjyuF5-xUo). Unlike [[Future-Style Vintage Sample Chain]] (a 9-element vintage sample built, bounced, and chopped into a beat), this is a straight synth-pad trap instrumental — two layered synth pads carry the harmony, a Kontakt counter melody and a copied-chord stab round out the melodic content, and drums come from a personal one-shot kit rather than a sample flip. The centerpiece idea is the **dark chord voicing**: 2–3 note shapes built around an internal semitone clash, the same underlying trick already logged on [[Chord Progressions]] and [[Future-Style Vintage Sample Chain]] — the near-identical D♯m/G♯m shape recurring across two different loner videos strongly suggests it's his go-to teaching example for this style, not a coincidence.

## Chain overview

Two Analog Lab pads (a dark unusual-texture main pad + a low-end-filling second pad) carry the 3-chord dark voicing; a Kontakt counter melody and a copied-chord hook stab add melodic interest without adding new harmonic material; drums are simple and built in a fixed order. Arrangement does most of the remaining work — no kick for 8 bars, a half-time toggle for energy contrast, and an octave-pitched-down bounce to signal the verse.

## 1. Main pad — Analog Lab "Providence" bank, "Selena" preset

- **Instrument:** Arturia Analog Lab, "Providence" bank, "Selena" preset — a dark, unusual texture, "sounds a bit mad" completely dry. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **FX chain:** heavy-but-short reverb → half-time delay set to 1/8 (not a straight subdivision) → EQ (heavy low-end cut — the raw preset's low end was "just a textural element") → a **triple-role Shaper stack**: volume shaper (base pulse) → filter shaper (gradually brings the high end in) → width shaper (stereo → mono → stereo cycle). → [[Reverb]], [[Delay]] (effect), [[EQ]], [[Shaper]], [[Width and Stereo]]
- 🎬 *From video:* "I love the texture of it and I knew that I could flip it into something more usable" — the raw, slightly-broken-sounding preset IS the source material; the FX chain is what makes it usable, not a cleaner starting patch.

## 2. Chord voicing — the dark theory

- **Chord 1:** D♯ minor triad, top note pulled from F♯ down to F — two chord tones (D♯, F) a semitone apart.
- **Chord 2:** the same shape reduced to just F/F♯ — the whole chord IS the semitone clash.
- Variation notes (an extra F, a G♯) layered in for melodic movement; the 2-chord shape repeats for 6 bars.
- **Chord 3 (bars 7–8):** G♯ minor (the **iv** chord), top note (D♯) dropped an octave to stay in register.
- → [[Chord Progressions]] (full worked example), [[Melody Writing]]

## 3. Low-fill pad — Analog Lab "Lost," Loophole bank

- **Instrument:** "Lost" preset, "Loophole" bank (Louis of Loophole) — added because the main pad's texture doesn't cover the low end. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **Settings:** release raised from default (was too short), filter cutoff brought down slightly.
- **FX:** band-pass EQ, cutting some high and low end so the two pads occupy separate bands. → [[EQ]], [[Masking and Carving]]

## 4. Counter melody — Kontakt "Tape Synths"

- **Instrument:** Kontakt, "Tape Synths" library (Fono Loop). → [[Kontakt 7]], [[Sound Selection Guide]], [[Plugin Wishlist]]
- **FX chain:** [[ValhallaDelay]] (heavy feedback, time set in ms not a synced subdivision, kept short — reads "almost like a chorus") → heavy vintage reverb → "Reels" tape, "Excited Tape" preset (harshness + wow/flutter up, for detune/vintage color) → half-time, automated in at certain points only.
- → [[Automation]]

## 5. Hook stab — copied chord

- Copy the first chord voicing (D♯m from stage 2), place on bar 1 and bar 5 only.
- **FX:** reverb → very heavy delay → EQ cutting the lows.
- 🎬 *From video:* used as the hook-arrival signal in place of a riser or crash cymbal. → [[Arrangement and Song Form]]

## 6. Drums — personal kit

- Own unreleased "2022 essentials" kit (not a sourceable pack).
- **Build order:** room → bounce snare → hi-hat (two-step base) → hi-hat rolls → second hi-hat layer for bounce → percs (plain, ambient, and a drum-fill perc with pulled-down velocity + panning) → hard/distorted 808 → hard kick.
- → [[Genre Drum Patterns]], [[Rhythm and Groove]]

## 7. Arrangement

1. **Intro:** the two pads only.
2. **Hook:** kick OUT for the first 8 bars, then in; half-time counter-melody effect engaged for the hook's first half, switched OFF for the second half — both toggles land at the same moment for an energy jump.
3. **Verse:** bounce the main pad to audio, pitch the bounce down an octave — signals the section, not a tone change.
4. **Extend:** repeat the structure rather than writing new material.
- → [[Arrangement and Song Form]], [[Pitch and Formant]]

## Variations

- **The 2–3 note semitone-clash voicing generalizes to any minor key** — same shape as [[Future-Style Vintage Sample Chain]]'s D♯m/G♯m trick; treat it as loner's standard dark-trap chord recipe, not tied to this specific key.
- **The kick-out/half-time-toggle hook move is reusable arrangement grammar** independent of the synth-pad instrumentation here — any halftime trap beat can borrow "remove the kick, toggle one effect off" as a cheap energy-contrast tool.

## Notes

- No exact reverb decay/mix percentages, delay feedback amounts, or EQ frequencies were given on screen beyond the qualitative descriptions above — treat every device's setting as a starting point to dial in by ear.
- All-unowned instrument sources (Analog Lab "Providence" and "Loophole" banks, Fono Loop "Tape Synths," "Reels" tape plugin) — see [[Plugin Wishlist]] for current gaps; the processing stages (reverb, delay, EQ, Shaper) are fully owned-tool coverable.

**Sources:** loner — [how southside makes dark synth trap beats for future from scratch (dark melody music theory)](https://www.youtube.com/watch?v=TVjyuF5-xUo) (00:08:43, 2022-01-09) · full note: [[loner - how southside makes dark synth trap beats for future from scratch (dark melody music theory)]]
