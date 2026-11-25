---
type: genre-playbook
title: EDM Subgenres
tags: [genre, edm, subgenres]
swept: 2026-07-19
---

# EDM Subgenres

Companion to [[House - EDM]] — the quick-identity card for each electronic lane: tempo, the one element that defines it, and the technique that gets you there. The core rules (pump, mono low end, energy arrangement) apply to all of them.

## Deep House — 118–124 BPM
- **Identity:** warm, rolling, understated — jazzy 7th/9th chord stabs, sub-heavy round bass, shuffled hats, sparse soul vocal chops.
- **Key techniques:** lazy sidechain curve (shallow, late ramp) · [[Model 84 Polyphonic Synthesizer]]/[[Drift]] filtered stab chords (LPF ~2–4 kHz, short amp release) · vocal chops pitched −2 to −5 semis, LPF'd · swing 55–60%.

## Tech House — 124–128 BPM
- **Identity:** stripped and percussive — one rubbery bass hook, minimal chords, big dumb drop that's mostly groove.
- **Key techniques:** bass = mono synth, heavy [[Ghz Vulf Compressor 3]]-style pump, plays *with* the duck · percussion loops layered thin ([[2 Drums Hats Group|Drums Hats Group]] wide) · vocal one-liners as rhythmic objects (delay throws, filter automation).

## Future Bass — 130–150 BPM (half-time drops)
- **Identity:** the detuned supersaw *chord stab* with sidechained wobble — bright, emotional, vocal-chop hooks.
- **Key techniques:** [[Serum 2]] 7-voice unison saw chords → **[[OTT]] at real depth (30–50% — this genre is why OTT exists)** → volume-LFO wobble ([[Kickstart 2]] triggered per-8th) · pitch-bent vocal chops as the lead · white-noise risers everywhere ([[3 FX Bus|FX Bus]]).

## Color Bass — 140–150 BPM half-time
- **Identity:** future bass's more experimental, "colorful"/futuristic cousin — the wobble comes from *texture and pitch movement* (resonators, granular layers, convolution-reverb chord pads, morphed/layered voices) rather than a single detuned-saw chord stab; the bass patch itself is built from several stacked, independently-processed layers instead of one wavetable/Serum patch pushed through OTT.
- **Key techniques:** volume-shape the wobble with a [[Shaper]] or [[LFO]] on the bass's amp stage — "just automating volume" is the whole future-bass-wobble mechanism at its core, per Flume's classic sound → automate a low-pass ([[Auto Filter]]) or a texture device like [[Spectral Time]] alongside it for movement · layer a color-bass patch as **independent per-voice layers** — top/middle/bottom each its own oscillator/voice (e.g. three separate [[Wavetable]] or [[Operator]] instances), grouped, rather than one fat unison patch · a **chord-locked convolution-reverb pad** — record/bounce chord stabs, drop each into its own Convolution-mode [[Hybrid Reverb]] chain (rack, one chain per chord, Distribute Ranges Equally + macro), see [[Hybrid Reverb]] · a **[[Vocoder]]** or **[[Spectral Resonator]]** pass on a noisy/textural sample for a "creepy," resonant pad layer, Range pulled down for a calmer result · [[Granulator 3]] for an additional granular texture layer · a dynamics-linked bit-reduction stage ([[Redux]]/[[Erosion]]) crunching the whole stacked bass together once the layers are combined.
- **VST-only methods (unowned, see [[Plugin Wishlist]]):** Zynaptiq Pitch Map (polyphonic re-pitch — reads as generic/"basic" alone, needs effects stacked after it to stand out) · a Harmony Engine-type auto-chord-generation plugin · Zynaptiq MORPH (real-time two-sound morphing) for hybrid hunting between two source patches.
- **Reference:** dnksaus, [Color Bass and Future Sound Design in 2023](https://www.youtube.com/watch?v=Izo8-oYXvOQ) — an explicit "every color-bass/future-rhythm method I know" survey, stock methods first, VSTs second.

## Melodic Dubstep / Chillstep — 140–150 BPM half-time
- **Identity:** future bass's cinematic sibling — huge half-time snare, supersaw walls, long verb tails, emotional builds.
- **Key techniques:** snare layered huge + [[Reverb Send Long]] gated · everything wide except kick/sub ([[Width and Stereo]]) · automate one macro filter across whole sections.

## Dubstep (Heavy / Wobble Bass) — 138–142 BPM half-time
- **Identity:** future bass's aggressive sibling — a growling, distorted FM/wavetable bass carrying the whole track, half-time snare, sparse arrangement built to showcase the bass's movement (LFO-driven filter/pitch wobble) rather than melody. Distinct from the smoother, cinematic Melodic Dubstep / Chillstep card above.
- **Key techniques:** [[Operator]] fully-serial FM algorithm, low-integer Coarse ratio for growl (push past ~10 instead for a squeaky/metallic variant) · **protect the sub from step one, not just before OTT** — run [[Multiband Dynamics]] (low band bypassed/reduced) immediately after picking the bass note, so the sub-bass fundamental stays clean through every later distortion/filtering stage on the way to any [[OTT]] pass · a velocity-tracked filter envelope for a bass that snarls harder on accented notes (a different modulation axis from key-tracked Center Frequency) · Filter Drive circuit (Hard/4-bit-type character) for grit instead of only outboard distortion · a high/low splitter so aggressive processing only ever touches the highs, never the clean sub · unlink a following delay's L/R time for cheap Haas width (check mono).
- **Reference:** [[Operator]]'s "FM bass growl" Patch Recipe is the from-scratch build for this lane; [[Wavetable]]'s Reese-bass technique (compress the noise, skip OTT) is the closer-to-DnB variant.
- **Jungle/rave-breakbeat hybrid (G Jones-style):** a distinct fusion lane layering a jungle-style chopped breakbeat foundation under a half-time dubstep drop — breakbeats browsed via a macro-mapped [[Drum Rack]] instrument (one chain per loop, sliced by Bar), an [[Operator]] acid-bass + arpeggiator layer voiced in a non-standard [[Scale]] mode (not just natural minor) for an exotic edge, and the drums shifting into more of a half-time dubstep pattern specifically for the drop rather than staying jungle-fast throughout. → [[Drum Rack]], [[Scale]], [[Operator]] — dnksaus, [How to Sound Design G JONES Style](https://www.youtube.com/watch?v=d6d7VA0jAW0)
- **Build-from-a-sine-wave chain, sourced independently a second time — sine → distortion → faux-OTT multiband ("the Smasher": 3 bands, heavy ratios) → automated EQ notch sweep → bounce/resample → repeat with more processing on the printed audio.** Confirms the Multiband-Dynamics-as-faux-OTT pattern above from a second breakdown. The starting oscillator barely matters; character comes entirely from the chained processing. **Resampling then pitching the result carries every baked-in effect (phaser, chorus, distortion) along with the pitch shift** — a genuinely different, often more interesting texture than pitching a live synth voice. Build **3 distinct bass layers** (long fuzzy / short plucky / high screechy) as separate designed elements rather than one patch doing everything; layer an **octave-up duplicate** for extra harmonic presence when the sub feels thin, and **crank distortion (not EQ) to generate missing harmonics** on a thin sub. Straight rock-beat (quarter/half-note kick) is a viable simple dubstep drum foundation to start from. Full chain writeup: [[4 Bass/1 Digital Bass Track|Digital Bass Track]] "From videos." → [[Multiband Dynamics]], [[Saturation and Distortion]], [[EQ]] — Max Konyi, [How to Make Dubstep in Studio One with Stock Instruments | Weekly Challenge #10](https://www.youtube.com/watch?v=sD3mE-siI5M)

## Synthwave / Retrowave — 80–118 BPM
- **Identity:** the 80s reconstructed — analog polysynth chords, gated-reverb snare, chorused everything, arpeggiated 16th bass.
- **Key techniques:** [[Model 84 Polyphonic Synthesizer]] everywhere + [[Chorus-Ensemble]] · gated snare: room send slammed + gate on the return · 16th-note bass arp, slight duck · tape wobble ([[RC-20 Retro Color]]) over the master lightly. (The Weeknd's "Blinding Lights" lane — pairs with [[The Weeknd Vocal Chain]].)

## Techno (peak/melodic) — 125–135 BPM
- **Identity:** hypnosis through repetition — the arrangement is one 8-minute filter move; percussion machinery over feeling.
- **Key techniques:** rumble kick (kick + reverb-tail layer LPF'd into one unit) · modular-ish sequences ([[Wavetable]]/[[Drift]] + arps) evolving via automation, not new parts · dark, mono-leaning, dry.

## Drum & Bass — 170–176 BPM
- **Identity:** broken-beat drums at double speed + sub bass carrying the weight — the drums ARE the lead.
- **Key techniques:** breaks chopped/re-pitched ([[Serato Sample]], [[Simpler]] slices) + one-shot reinforcement · Reese bass ([[Serum 2]] detuned saws, mono, chorus above 200 Hz only) · everything else minimal.
- **Foundational programmed pattern (from-scratch MIDI, before any break gets layered in):** snare on beats 2 and 4 of every measure; kick on beat 1 AND halfway between beats 3 and 4 (the classic breakbeat kick placement, not four-on-floor) — nudge individual kicks slightly off-grid (left/right) for a less mechanical feel. Fill the gaps between kick/snare with a secondary ghost-snare sampled hit, varied per bar and velocity-reduced for dynamics; hi-hats on an 8th-note grid with one small variation/skip per pass so it doesn't loop identically. → [[Rhythm and Groove]] — You Suck at Producing, [How to Write Drum & Bass Beats](https://www.youtube.com/watch?v=7eP5r1VgNso)
- **Match a layered break's kick pattern to the programmed MIDI kicks by ear, then physically edit the audio until they align** — when combining a sampled drum break with programmed MIDI drums, first listen to each kick pattern in isolation and compare — they usually don't match. Delete any of the break's kicks that fall where the MIDI has no kick (patching the resulting gap with a copied neighboring hi-hat hit so it doesn't read as empty), and copy/duplicate one of the break's own kick transients into any beat where the MIDI has a kick but the break doesn't — the goal is the break's kick pattern becoming rhythmically identical to the MIDI pattern, not just "close." Pitching the break up a few semitones (~3) tightens a loose/floppy break before this editing pass. Finish by EQing out low end from the break's kick specifically so it doesn't fight the MIDI kick's own low end. → [[Layering and Stacking]], [[Masking and Carving]] — You Suck at Producing, [How to Write Drum & Bass Beats](https://www.youtube.com/watch?v=7eP5r1VgNso)
- **Prep a loop for double-time by halving the BPM reference, not by warping it 2x directly** — for a sample-pack loop (a shaker here) that needs to run at double the original feel: use the **÷2** button next to the clip's BPM field (halves the reference tempo Ableton warps against, effectively doubling playback speed cleanly) rather than just cranking Warp's stretch amount; switch the Warp mode from **Complex** to **Re-Pitch** and let the pitch rise naturally with the sped-up result instead of fighting to preserve the original pitch (Complex tries to hold pitch steady and sounds worse at extreme speed-ups); finally, **Quantize the audio clip itself to 16th notes** (Ableton's audio quantize, not just MIDI quantize) to snap a loosely-timed loop hard onto the grid. → [[Sampling and Sound Selection]] — You Suck at Producing, [How to Write Drum & Bass Beats](https://www.youtube.com/watch?v=7eP5r1VgNso)

## UK Garage / 2-Step — 130–138 BPM
- **Identity:** swung, syncopated drums (kick NOT four-on-floor), chopped R&B vocal, organ/piano stabs, rolling sub.
- **Key techniques:** shuffle 60–70% on hats/snares, ghost kicks · vocal chops re-pitched to the chord (the hook is usually a re-sung sample) · clean bright mix vs techno's dark.

## Arrangement — the signature per lane

[[House - EDM]] holds the parent shape: **16-bar sections, fill at bar 8, silence before the drop, loopable drum intro and outro for the DJ.** Every lane below inherits it and bends one part.

| Lane | Section grid | The move | Drop density |
|---|---|---|---|
| **Deep House** | 16, long | filter opens over 32 bars — no hard drop | 4–5 |
| **Tech House** | 16, strict | one percussion element swaps each section | 4–5 |
| **Future Bass** | 16 + half-time drop | build is a vocal chop climbing; drop is half-time | 6–7 |
| **Color Bass** | 16 + half-time drop | the drop's *timbre* changes bar to bar, not the notes | 6 |
| **Melodic Dubstep** | 32-bar breakdowns | one macro filter automated across a whole section | 5–6 |
| **Dubstep (heavy)** | 16, half-time | bass movement is the arrangement — LFO does the work | 3–4 |
| **Synthwave** | 16, verse/chorus | pad out = verse, pad + arp = chorus → [[Synthwave]] | 5–7 |
| **Techno** | none — one long curve | the arrangement is a single 8-minute filter move | 3–4 |
| **Drum & Bass** | 16, with a 32-bar intro | the drop *removes* the break, then slams it back | 4–5 |
| **UK Garage** | 16, shuffled | swing the grid; chop the vocal further each section | 4–5 |

**The two poles:** techno has effectively no sections — hypnosis through repetition, one continuous filter move. Future bass changes everything every 16 bars. Both are dance music; the difference is entirely arrangement, not sound design.

**Density rule: 3–7 at the drop, 1–3 at the breakdown.** The swing is the genre. If your breakdown isn't at least 3 slots emptier than your drop, the drop won't land no matter how loud it is.

## Picking a lane per track
Tempo + drum pattern + bass character = the subgenre. Everything else (chains, sends, master) stays your standard template — swap the [[Master Chain]] loudness target (clubs: −7 to −8 LUFS; chill lanes: −10 to −12).
