---
type: plugin
title: "EQ Eight"
category: EQ
vendor: "Ableton"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# EQ Eight

![[Images/EQ Eight.png]]

**Category:** EQ
**Vendor:** Ableton

## What it is

Ableton's flagship 8-band parametric EQ with per-band filter types, a real-time spectrum analyzer, and mid/side or L/R channel processing.

## What it's used for

General-purpose tonal shaping and surgical cuts on any track — the default first-call EQ in a stock Ableton mixing workflow before reaching for a third-party EQ.

## FX chain notes

Usually the first EQ move on a channel (cutting mud/resonance) before compression, with a second EQ Eight instance post-compression for tonal balancing.

## Techniques

- **Frequency-hunting method for notching an annoying resonance by ear, with an explicit hardware-safety step.** (1) place a band, (2) push its **gain fully up** (boost, not cut) to exaggerate the resonance, (3) narrow the **Q to its tightest setting**, (4) **turn your monitor speakers down** before the next step — stated as an important safety precaution, since sweeping a fully-boosted narrow band can be genuinely loud, (5) sweep the **frequency** across the spectrum with the source playing, listening for the single most annoying/ringing point, (6) once found, invert the move — pull that same band **down** instead of up, and only **partially** ("meet it halfway"), not to a deep cut, since taking one frequency out too aggressively reads as hollow. → [[EQ]], [[Gain Staging]] — Mix with the Masters (Leslie Brathwaite), [[Being efficient - Leslie Brathwaite]]
- **The drum-kit high-pass ladder as a stock-only default band layout — one band 1 setting per lane, ascending down the kit.** Band 1 = Low Cut on every drum track, set **40–60 Hz kick · 60–200 Hz toms (per drum) · 100–200 Hz snare · 200–300 Hz hats** — the ascending order is itself the lane assignment, keeping each element out of the zone the one below it owns. Then band 2 = the matching body shelf/boost just above that cut (kick low shelf 80–100 Hz, snare low shelf 200–300 Hz, toms 100–300 Hz), and a presence band on top (kick 2–4 kHz, snare 5–7 kHz, toms 5–10 kHz, hats high shelf 7–10 kHz+). Doable entirely on stock EQ Eight — no dynamic bands needed, since the whole chart is static. *(ranges only in the source; no Q or gain values given — start at ±2–3 dB and moderate Q, general starting point.)* → [[EQ]], [[Masking and Carving]], [[Sound Palette]], [[Kick Design]], [[Snare Design]] — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]
- **A restrained band cut (some high, some low, "not go too crazy") as the opening move of a finished-sample-to-beat flip.** On a 2000s R&B sample being flipped into a modern beat, the flip's very first processing step is a gentle EQ band pulling off some top and bottom end — deliberately mild, to start pushing the sample "more lo-fi and distant and airy" without going full lo-fi in one move. Followed by a short reverb (low end cut from the return, size reduced) then a time-stretch/tempo drop to ~145 BPM. → [[Reverb]], [[Sampling and Sound Selection]], [[2000s R&B Piano Sample Chain]] — loner, [how to make a 2000's r&b sample & flip it into a beat for tory lanez/bryson tiller](https://www.youtube.com/watch?v=sPqBmZLaDM4)
- **Bandpass carving reused three times in one build to narrow drums, brass, and guitar into their own lanes — the same move applied genre-agnostically across the whole mix.** On a jazzy R&B sample (PARTYNEXTDOOR "Joy"-inspired): a kick+snare mixer channel gets a bandpass EQ cutting both low AND high end; a reversed-brass-loop channel gets the same bandpass treatment ahead of a heavy reverb; the guitar counter-melody gets a low + harsh-mid-range cut. Every melodic/percussive element in the build gets carved into a narrower slot rather than left full-range, one of the reasons the busy arrangement stays legible. → [[Reverb]], [[Delay]] (effect), [[Sound Palette]], [[Sampling and Sound Selection]] — loner, [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU)
- **A flat 30 Hz cut underneath a UK-garage bass, as the closing stage of a simple OTT → MicroShift → EQ beef-up chain.** After OTT (multiband Depth reduction, low boost, high/mid cut) and a light MicroShift chorus pass on a plain "super deep bass" one-shot, a 30 Hz cut removes the "really really low frequencies" nobody needs underneath the beefed-up low end. → [[Bass Design]], [[OTT]], [[MicroShift]], [[SUB Slot]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Three roles in one from-scratch afrobeats build: closing low-cut on a chord bed, an ambient bandpass filter on a reversed guitar layer, and the same filter role on a Splice vocal chop.** (1) Final move on the electric-piano chord chain (after tape, reverb, delay) is a straightforward low-end cut. (2) On a fully-processed guitar part reversed/chopped into a fresh texture layer, a low+high cut ("a good bandpass") ahead of a heavy vintage reverb makes it read super ambient before a half-time device finishes it. (3) The same filter-then-reverb move is repeated on a melodic Splice vocal chop, pushed toward mono and panned right to sit "super far" back in the mix. → [[Kramer Tape]], [[Reverb]], [[Delay]], [[Depth and Space]], [[1 Electric Piano Track]], [[1 Electric Guitar DI Track]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **Three different roles in one pop-beat build: low-cut on an ambient synth pad before reverb, a presence boost on a lead vocal, and a "make it stand out" finishing move on a pitched-down bass run.** (1) On the airy synth pad, cut the low end first — before the heavy reverb and cassette stage that follow — so the pad never competes with bass/kick. (2) On the main vocal, boost the high end for presence as the very first move, ahead of the AlterBoy ghost-double stage. (3) On a six-semitone-down bass run added as an ending flourish, EQ runs right after [[Decapitator]]'s light drive to finish shaping the run so it "stands out a little more" than the rest of the bassline. → [[Reverb]], [[Cassette]], [[Little AlterBoy]], [[Decapitator]], [[Bass Design]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **A low-pass band macro-mapped as one of only two exposed controls on a 6-stage "one/two knob pedal" macro chain.** Closing stage of a fully-wet textural rack (tape-echo → octave pitch shift → Portal → chorus → half-time → **EQ**): Band 7 set to Low Pass, its Frequency parameter mapped to a macro so the end user dials the top-end darkness directly rather than tweaking the band by hand — the chain's other exposed control is the half-time device's own mix. Saved as a reusable preset ("Sparkle") once built. Full build: [[Sparkle Texture Rack]]. → [[Portal]], [[EffectRack]], [[EQ]] — loner, [this secret plugin will change the way you process your melodies!?](https://www.youtube.com/watch?v=xwuodd40bug)
- **Closing stage on two different Dez Wright-inspired chains — a pluck wash-out chain and a guitar-sample chain.** (1) *Wants and Needs* (Drake) pluck: spring reverb → Portal → half-time → **EQ**, finishing/taming the washed, glitched signal. (2) *Numbers* (A Boogie) guitar: preamp → amp → cassette → flanger → spring reverb → **EQ**, same closing-stage role — EQ is the last move in both chains, after all the color/space processing rather than before it. → [[Portal]], [[Cassette]], [[Phaser-Flanger]], [[Ghz DC19 3]], [[Dez Wright Guitar Sample Chain]] — loner, [dez wright's synth secrets will elevate your melodies!?](https://www.youtube.com/watch?v=_8vOz54DTiY)
- **Second stage of the Jake One vintage-sample-flip chain** — after a valve compressor and before a room reverb + denoiser-as-lowpass, on a dark, soft Rhodes sample (*Percocet and Stripper Joint*, Future); also the closing stage on both guitar accent layers in the same beat (dry low guitar: amp → EQ; brighter contrast guitar: preamp → amp → spring reverb → EQ). *(general starting point — no exact bands/values given on screen)* → [[UAD Tube-Tech CL 1B mkII]], [[UAD RealVerb-Pro]], [[RX Guitar De-noise]], [[Sampling and Sound Selection]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)
- **Cut the high end on a dry guitar as one stage of a woozy detuning chain** — after auto-tune + tape/cassette saturation, an EQ move cutting out some of the high end is the next stage in Mike Dean's *Rodeo* intro guitar chain, before delay and a distortion (Radiator/Trash) stage — the high-end cut keeps the accumulating saturation from turning harsh. → [[Cassette]], [[Auto-Tune Pro]] — loner, [the secrets behind mike dean's 'rodeo' production!?](https://www.youtube.com/watch?v=V9FhndW8t74)
- **Drive a band's frequency from the played MIDI note's pitch (unowned helper, general lesson lands here)** — the unowned Max for Live device "MIDI to EQ Eight" reads the frequency of whatever MIDI note is being played and outputs a mappable value that can drive an EQ Eight band's own Frequency parameter directly (with a multiplier so the band can track a harmonic/multiple of the note rather than the note itself) — the general lesson (an EQ move that follows a bassline's actual pitch instead of sitting static) is worth reaching for even without the specific device, e.g. via a manually-automated frequency lane keyed to the bass's notes. → [[Plugin Wishlist]] — dnksaus, [10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso)
- **The "car EQ" kick curve** — don't low-pass the top off a kick (sounds "like a kick under a pillow"); instead shelf the lower-highs down and filter only the extreme highs so the attack survives, plus his signature ~1 kHz dip on boxy/distorted thumpy kicks — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
- **Cut the "papery" top off saturated snares; boost shakers into unused air** — after saturating a soft snare, EQ out the papery highs ("you want it to slap, not hiss"); and when a lo-fi hat leaves the high-highs empty, boost the shaker exactly there so each element has its own slot — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
- **A narrow ~200 Hz peak as a reusable "punchy part" building block** — on a synthesized snare, a narrow-Q boost around 200 Hz brings out the punchy body region; narrowing the band further makes it ring out more. Map the peak's Gain and Q to a macro (floor Gain at 0) so the amount of ring is a controllable/randomizable variation rather than a fixed setting. → [[Snare Design]], [[MIDS Slot]] — dnksaus, [craft UNIQUE snares](https://www.youtube.com/watch?v=WeHN9GPokMA)
- **EQ Eight's default (non-linear) phase mode creates its own artifact bump right at a low rolloff's cutoff frequency — Linear Phase mode removes it.** A rolloff set at 25 Hz "shouldn't be doing anything" to a kick sitting well above that frequency, but soloing the kick against the filter revealed a real spike in the low end caused purely by the filter's own phase response at the rolloff point; switching to Linear Phase eliminates the spike entirely — a non-linear-phase filter can color a signal even where the gain number says it shouldn't. → [[Kick Design]] — Jauz (Sol State), [Tiny Details Most Producers Miss](https://www.youtube.com/watch?v=Hv9r2rU-2qk)

## Key Parameters

```visual-key
image: Images/EQ Eight.png
coords: Images/EQ Eight.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①–④ only — ⑤ Oversampling isn't on the device face; it's in the right-click context menu.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Bands (×8) | Eight filter nodes | Surgical cuts + broad shelves in one device |
| ② | Freq / Gain / Q | Per-band controls | Narrow cut to remove; wide boost to shape |
| ③ | Filter Type | Bell/shelf/HP/LP/notch per band | HP @ 80–100 Hz is the everyday cleanup |
| ④ | Mode (Stereo/L-R/M-S) | Processing mode | Mid/Side for width or center-focused moves |
| ⑤ | Oversampling | Higher-quality high-frequency response | On for mastering/critical high-band work |

## See also

- Effects: [[EQ]] · [[Multiband Compression]]
- Techniques: [[Masking and Carving]] · [[Snare Design]]
- Palette: shapes any slot · [[Sound Palette]]
