---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=GMeZtNImaT0
channel: loner
duration: 00:10:17
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, sound-design, weeknd, synth, r-and-b, synthwave]
briefed: backlog
---

# the production secrets behind the weeknd's evolving sound!?

![](https://www.youtube.com/watch?v=GMeZtNImaT0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=GMeZtNImaT0)

## Synopsis

loner makes three original beats, each reverse-engineered from one Weeknd album — *Starboy* (2016), *After Hours* (2020), and *Dawn FM* (2022) — to trace how Abel Tesfaye's sound evolved across a decade: from Benny Blanco/Cashmere Cat-flavored pop-R&B with Daft Punk-inspired plucky synth bass, through the darker Metro Boomin-produced *After Hours* half-time R&B, to *Dawn FM*'s full 80s synth-pop pastiche built on hand-built subtractive synth pads. It's a compact, high-density breakdown — light on exact numeric settings (a scripted "let's build a beat" format, not a mix tutorial), but the sound-design and arrangement logic is concrete and transcribable: which two waveforms to blend and why, exactly which two LFOs go where and in what cycle mode, why a reverse guitar gets a *pitch-mode* delay specifically, and the compositional trick (both the chords and the counter-melody moving stepwise downward) behind why "Snow Child" reads as sad. The most valuable through-line for the vault is the *Dawn FM* synth-pad recipe near the end — a genuinely reusable from-scratch patch-design routine that maps directly onto owned dual-oscillator/modulation-matrix synths (DUNE 3, Wavetable, Operator).

## Techniques

### Starboy-era beat (~0:00–2:10)
- **Drums create the pocket, write the drum bounce before the melody sits on top** — "True Colors" is built around a melodic piano melody, but the actual key to the song per loner is the *drum bounce* — get the groove/pocket right first, then the piano melody drops in and locks with it, rather than writing melody and groove independently. → [[Pocket and Microtiming]], [[Rhythm and Groove]]
- **Vocal chops scattered through a beat = an instant "pop" flavor tag** — called out as specifically a Benny Blanco/Cashmere Cat signature move on "True Colors": short, chopped vocal fragments used as a rhythmic/textural layer rather than lead vocal content. → [[Sampling and Sound Selection]], [[Ear Candy and Hiding Synths]]
- **Pulsing ambient background vocals, replicated from Splice vocal packs** — the vocal texture that actually inspired this beat came from "Nothing Without You" (not "True Colors" itself): low, pulsing, ambient vocal layers sitting behind the main elements, recreated here using Splice vocal one-shots/loops rather than original vocal takes. → [[Sound Selection Guide]], [[Ambient Texture and Field Recording]]
- **Daft Punk-inspired plucky synth bass via a Juno-106 emulation** — Starboy's bassline is credited to Daft Punk (who produced/featured on the title track and "I Feel It Coming," a combined 3B+ streams); both songs share a "melodic percussive plucky synth" element, which loner attributes to Daft Punk's known use of the **Roland Juno-106**, recreated here on **Arturia's Jun-6 V** (heard in captions as "Junior VST" — a mis-transcription of Jun-6 V, Arturia's Juno-6/60 emulation). → [[Roland Juno-106]], [[Model 84 Polyphonic Synthesizer]] *(owned Juno-106 emulation — the direct substitute for the unowned Arturia unit)*, [[Plugin Wishlist]]
- **Choir sample as an intro layer, heavier sub synth bass underneath, distorted tom for grit** — final layering pass on the Starboy beat: a choir sample pulled from "All I Know" seeded the intro, a second, much heavier synth bass sits underneath the Daft Punk-style pluck, and a distorted tom adds percussive weight. → [[Layering and Stacking]], [[Saturation and Distortion]]

### After Hours-era beat (~2:10–5:10)
- **Descending chords AND a descending counter-melody = an easy, reliable "sad" cue** — "Snow Child"'s standout trait: both the chord progression *and* the counter-melody move down the scale simultaneously (not just one or the other). loner states this outright as a technique: stepwise descending motion in both harmony and a secondary melodic line reads as sad/melancholic — a fast, repeatable move for a minor-key or dark-toned section. → [[Melody Writing]], [[Chord Progressions]]
- **A soft synth patch voiced to read as an organ, not a synth, for the "sad melodic chords"** — "Snow Child"'s chord layer is a soft synth deliberately voiced with an organ-like character (rounder, less brassy than a typical soft-synth pad) rather than an obviously synthetic patch, adding to the track's cold/wintery depth. → [[Sound Selection Guide]], [[BED Slot]]
- **Reverse guitar into a pitch-mode delay for a rising, textural intro hit** — "Escape From LA" opens with a reversed electric guitar swell right before the beat drops; loner's recreation: record/print a reverse guitar part copying the same chords as the main synth part, then run it through **Valhalla Delay with Pitch mode selected** specifically to add extra high-end texture/shimmer to the reversed swell (not a standard tape/digital delay mode). → [[ValhallaDelay]], [[Reverb]]/[[Delay]] (Effects), [[1 Electric Guitar DI Track|Electric Guitar DI Track]]
- **A phaser on the hi-hat for extra texture** — on the Metro Boomin-style beat (After Hours tracks with Metro: "Heartless," "Faith," "Til I Bleed Out," "Escape From La"), the hi-hat pattern gets a phaser insert specifically to add movement/texture beyond a plain hi-hat sound. → [[Phaser-Flanger]], [[Modulation]] (Effects)
- **One sustained "air candy" note as a deliberately sparse ear-candy layer** — Weeknd beats are noted as rhythmically/harmonically simple at their core, but always carry ear-candy elements on top; here that's a single held note added purely as a flavor/texture layer, not a functional part. → [[Ear Candy and Hiding Synths]], [[AIR Slot]]
- **A high-pitched organ contrasted against lower synth keys** — a second organ part, pitched high, deliberately contrasts the register of the lower synth chords (echoing the high organ heard on "Til I Bleed Out"'s outro) — a register-contrast move for adding interest without adding harmonic complexity. → [[Sound Selection Guide]], [[Layering and Stacking]]
- **Half-time drums + chords + a textural siren sound as an intro-specific arrangement, borrowed from "Escape From LA"** — the intro section of the recreated beat pulls three things specifically from "Escape From LA": the drums dropped to half-time feel, the chord layer, and a textural siren-type sound — used as a distinct, lower-energy intro before the full-time groove kicks in. → [[Genre Drum Patterns]] (Half-time section), [[Arrangement and Song Form]]

### Dawn FM-era beat (~6:00–end)
- **Dawn FM synth pad, step 1 — dual-oscillator waveform blend:** a saw wave and a square wave mixed together, **mix set to ~70% in favor of the saw**; tuning the two oscillators to different notes rather than unison — specifically **tuning one oscillator to a major-key interval relative to the other** — is called out as the move that gives the patch a "really big" sound (an interval, not a unison detune, is doing the width/size work here). → [[DUNE 3]], [[Wavetable]], [[Operator]], [[BED Slot]]
- **Dawn FM synth pad, step 2 — effects chain order:** Chorus → Reverb → Overdrive, in that order — chorus widens the raw oscillator blend first, reverb adds space to the now-widened signal, and overdrive is the *last* stage, coloring the already-spatialized sound rather than distorting a dry signal that then gets reverb (distorting-then-reverbing vs. reverbing-then-distorting are audibly different; this recipe distorts last). → [[Chorus-Ensemble]], [[Reverb]] (Effects), [[Overdrive]], [[Saturation and Distortion]]
- **Dawn FM synth pad, step 3 — two independent LFOs doing two different jobs, in two different cycle modes:** **LFO2 → filter (low-pass) cutoff**, sync rate set to **quarter notes**, and critically the **cycle mode set to Single** (a one-shot sweep per trigger, not a repeating loop) — gives each note/chord a filter-opening motion rather than a constantly cycling wobble. **LFO3 → Reverb dry/wet knob**, this time in **Cycle mode** (continuously looping) — used deliberately to "fill the space in between chords," i.e. the reverb wetness itself breathes in and out on a loop, adding motion to the gaps between chord hits rather than to the chords themselves. This Single-vs-Cycle pairing (one modulator per-note, one modulator continuous) is the actual sound-design insight, not just "add two LFOs." → [[DUNE 3]], [[Modulation]] (Effects), [[Reverb]] (Effects), [[Automation]]
- **An ambient pulsing synth sitting just behind the main guitar** — pulled from Dawn FM's fifth track, "Sacrifice": a low-level ambient pulsing synth layer positioned behind (not competing with) a lead guitar part — a textural-bed placement note, not a lead element. → [[Sound Selection Guide]], [[BED Slot]]
- **"Here We Go Again" (ft. Tyler, The Creator) breaks the synth-pop mold with a synth bass + two electric-piano layers** — one synth electric piano and one "more realistic sounding" electric piano stacked together, the more-realistic layer specifically credited with adding high-end texture the pure-synth layer lacks — a two-EP-timbre layering move for a track that intentionally sits apart from the rest of the album's synth-pop palette. → [[Layering and Stacking]], [[Sound Selection Guide]]
- **Build order for the recreation: drums first (for groove), then kick specifically (dictates the track's bounce), then two snares, then two basses** — loner's stated build sequence for the Dawn FM-style beat: get the drum groove established before anything else, prioritize the kick early because it sets the whole track's bounce/feel, then layer in two separate snare sounds and two separate bass layers. → [[Session View Workflow]], [[Bass Design]]

## Routed to

- [[Model 84 Polyphonic Synthesizer]] — Juno-106 emulation technique (owned substitute for the video's Arturia Jun-6 V)
- [[Roland Juno-106]] — Daft Punk plucky-synth reference added to Techniques
- [[ValhallaDelay]] — reverse guitar + Pitch mode technique
- [[Phaser-Flanger]] — hi-hat phaser texture technique
- [[DUNE 3]] — Dawn FM synth-pad sound-design recipe (waveform blend, effects order, dual-LFO modulation)
- [[Modulation]] (Effects) — Single-cycle vs. Cycle-mode LFO routing lesson
- [[Genre Drum Patterns]] — half-time intro arrangement note
- [[Ear Candy and Hiding Synths]] — one-note air candy + high organ register-contrast
- [[Melody Writing]] — descending chords + descending counter-melody = sad
- [[Sound Selection Guide]] — vocal chops, Splice ambient vocals, choir sample, organ-voiced soft synth, ambient pulsing synth-behind-guitar, dual electric-piano layering
- [[Plugin Wishlist]] — Arturia Jun-6 V added
- [[1 Synth Bed Track|Synth Bed Track]] — Dawn FM synth pad recipe woven inline
- [[1 Electric Guitar DI Track|Electric Guitar DI Track]] — reverse guitar + pitch-delay technique woven inline

## Source

- **Channel:** loner
- **Video:** [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)
- **Duration:** 10:17
- **Transcript source:** YouTube captions (clean, spoken-narration style — high confidence throughout; a handful of proper nouns garbled, e.g. "Junior VST" for Arturia Jun-6 V, "RB" for "here" mid-sentence artifacts)
- Full transcript: [[the production secrets behind the weeknd's evolving sound!? (transcript)]]
