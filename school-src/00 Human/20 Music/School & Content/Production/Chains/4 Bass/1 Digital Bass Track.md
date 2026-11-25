---
type: chain
aliases: ["Digital Bass Track"]
title: Digital Bass Track
chain_type: track
family: bass
source: digital
routing: Digital Bass → Bass Group → Bass Bus → Master
uad_console: [UAD UA 610-B (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Saturn 2, Pro-C 2, Kickstart 2, Utility]
status: default
tags: [chain, bass, track]
---

# Digital Bass Track

**Role:** 808s, synth bass, sub bass — the programmed low end. Treated like an instrument per the process: same stages a recorded bass gets, with UAD plugin equivalents standing in for the hardware pass.

**Chain philosophy:** tone EQ → saturation → control comp → sidechain duck → mono. Saturation *before* the compressor here (unlike the recorded chains) because on an 808 the saturator is *generating* the tone — you want the comp to level the harmonics it creates.

## 1 — Sound Selection

**Selection is the real recording step — a great 808 sample needs almost nothing.**

- 🎬 **Juno-emulation synth bass written by following the chord roots + extra bounce notes, written EARLY in the build "so I can make sure it's right," then Decapitator for crunch.** Building an 80s synthwave/pop beat, the bassline doubles the chord progression's own root notes with extra notes layered in purely "to give it a bounce and rhythm," then [[Decapitator]] runs afterward just for crunch (no exact Style/Drive given). A third confirmed sighting of loner's root-following-plus-embellishment bass-writing pattern on this vault (see the Bryson Tiller reuse logged below); the explicit "write bass early" ordering and the added Decapitator crunch stage are the new information here. → [[Decapitator]], [[Bass Design]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- 🎬 **CS80 one-shot bass from a personal one-shot kit ("Nami's kit," a repeat go-to bass source), pitched up, then given a ShaperBox volume preset so it pulses instead of sitting flat.** Building a beat around a found a cappella: the bass one-shot's pitch is brought up (and the underlying chord's root note dropped, since it tracked too high otherwise), then a **ShaperBox volume preset ("set to a half")** is added so the bass "pulses a bit more" rather than being constantly present — the closing chord's timing gets nudged slightly afterward because the pulse read as too jolty/in-your-face. Owned-lane mapping for the volume-pulse stage: [[Shaper]]. → [[Shaper]], [[Sound Selection Guide]], [[Plugin Wishlist]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- 🎬 **Kontakt Scarbee Rickenbacker bassline written by following the chord roots + added licks, sample pitch-shifted down as a whole after tracking too high.** On an afrobeats build, the bass part is the chord progression's own root notes played back, with extra melodic licks layered on top; register came in too high on playback, so the whole recorded take is pitch-shifted down rather than re-tracked lower — paired with an AmpliTube amp preset layered on top for color. → [[Kontakt 7]], [[Bassline Writing]], [[Sound Selection Guide]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- 🎬 **A two-part bass system: a plucked synth patch filling only the GAPS between chords (never doubling the main line), plus a finger-picked "Moto Bass" (near-certain auto-caption garble of IK Multimedia MODO Bass, unowned — see [[Plugin Wishlist]]) carrying the actual bassline.** A dedicated ending flourish — a run pitched down six semitones — gets its own light [[Decapitator]] drive + EQ pass afterward specifically to make it "stand out a little more" than the rest of the part. → [[Bass Design]], [[Decapitator]], [[EQ]], [[Sound Selection Guide]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)

- **[[Ramzoid 808 Cooker]]** — purpose-built trap 808 design: base tone, drive/character in-instrument, done. → [[Ramzoid 808 Cooker — Trap 808]]
- **808 samples from packs** (SpinZ/Zay-type industry sounds) — pick ones with **real front-end attack**: enough attack and the kick becomes optional ("a lot of the best shit right now is no kick" — Kenny Beats, [808 & Kick](https://youtu.be/4iAKvWWlCvY))
- **[[Serum 2]]** — reese/growl/design bass (EDM lane): sine sub osc + saw/wavetable above, sub osc unprocessed. → [[Serum 2 — Reese Growl Bass]]
- **[[Operator]]** — clean FM sub (sine + slight 2nd harmonic); a plain sine patch ("Huge Sine Base") is the reliable fallback under a characterful bass — Disclosure. → [[Operator — Clean FM Sub]]
- **[[Drift]] / [[Model 84 Polyphonic Synthesizer]]** — analog-style synth bass (indie/synthwave). → [[Drift — Analog Synth Bass]] / [[Model 84 — Juno Bass]]
- **[[Bloom Bass Impulse]]** — production-ready basses when speed wins.
- 🎬 **Sample one good note and pitch it around** when a synth won't track evenly across the keyboard; add a **rim on top for attack** ("three notes but it gels") — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU). Go-to synth-bass sounds: [[Sound Selection Guide]].
- 🎬 **Tune the reinforcement devices to the note, not just the patch** — on an Operator/Serum FM/synth bass, two or three [[Saturator]] instances each tuned (Color section's Freq) to the note's own fundamental (then an octave up), plus [[Corpus]] tuned to the same sub frequency, thickens the fundamental before any EQ/comp stage even runs — a free pre-tuned rack version exists. Full escalation ladder (parallel high-passed harmonic layer, multiband glue, a tuned phase disperser, grit, duplicate) on [[Bass Design]] — dnksaus, [Tighten Your Sub Bass with CORPUS (Not Clickbait) \[I Swear\]](https://www.youtube.com/watch?v=260MHJtu0pc)

- 🎬 **Speed-run alternative to the full sound-design ladder above: one deep-bass one-shot + a simple root-following line, beefed up with just three stock devices.** For a UK garage beat, skip synthesis entirely — pick a "super deep bass" one-shot (Oliver's Power Tools kit), write the line as the chord roots only, then [[OTT]] (multiband: Depth down from default, low boosted, high cut, some mids cut) → [[MicroShift]] (light, for chorus-like thickening, not width) → [[EQ Eight]] (cut at 30 Hz). Three devices instead of the tuned-Saturator/Corpus escalation — reach for this when a fast, simple, garage-appropriate bass is the goal rather than a dense sound-design build. → [[Bass Design]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)

## 2 — Programming Best Practice

- **Simpler settings for 808s:** set it to *cut itself* so notes never overlap; glide mode for slides; end patterns with a **velocity-0 note** so the tail doesn't carry into the next section. → [[Simpler — 808 Sample (Choke + Glide)]]
- **The bassline does the harmony** — over a static melody collage, the 808/bass line walking different roots *implies* the chord changes (Young Chop blueprint; Disclosure literally "harmonize the bassline"). Root-avoidant lines = instant sophistication (the Latch lesson). → [[Arrangement and Song Form]]
- **Multiple bass SECTIONS per song** — a synth-bass "Mike Dean section" vs an 808 section, or live bass answering between 808 hits — Kenny Beats, [Trap Drums More Interesting](https://youtu.be/fo-E8dY81Nw)
- **Layering two basses? One frequency band each** — Minimoog-style low (volume automation only) + a squelchy top layer (OBXD lane); "you want each bass in its own frequency spectrum" — Disclosure, [Prince Edit + Talk VIP](https://youtu.be/hOvLf9nX500) → [[Masking and Carving]]
- Mono, center — always.

## 3 — Source → Ableton (UAD front end)

Same 1-record/2-process discipline as external sources, minus the Unison impedance magic — UAD plugins in Ableton acting as the console input, printed to audio when dialed:

### 1. [[UAD UA 610-B]] — Preamp plugin
- Light tube drive · ~0 VU ([[Gain Staging]])

### 2. [[UAD UA 1176LN]] — Compressor
- 2–3 dB on peaks, or skip — a good 808 sample is already even

### 3. [[UAD Pultec EQP-1A]] — EQ
- The low-end trick (boost + atten @ 60) if the 808 needs weight · print gently
- 🎬 Named directly as a go-to low-end EQ for the "sense of bottom" its emulation brings, close to the hardware — used here right after a distortion pass for grit (see Saturn 2 stage below) — Mix with the Masters (Marcella Araica), [[Blending melodies with Marcella Araica]]

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Shape
- HPF 25–30 Hz · boost/cut the fundamental to fit the key · **cut where the kick lives** (kick usually owns 50–60 Hz — same pocket logic as [[1 Electric Bass DI Track|Electric Bass DI Track]] stage 5)
- 🎬 On a high, busy bassline with little natural boom: **boost the sub, cut the boxy low-mids ~150 Hz** — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI)

### 2. [[Saturn 2]] — Harmonics (the 808 make-or-break)
- **Multiband** (① — crossover ~80–100 Hz): sub band **clean/undriven** (②), drive the band above — **Gentle Transformer** type (③) on 350 Hz–2 kHz + small level boost + **a touch of per-band Dynamics squeeze** (④)
- **Heard vs felt:** the sub is *felt*, the mids are *heard*. Turning up the felt costs ~7 dB of headroom; saturating the heard band costs ~1 dB and reads everywhere. Diagnose which is missing first.
- 🎬 The heard band is where **bass-amp fizz** lives — overdrive + Softube-style saturator on top, "like a real bass amp; you miss it when it's gone" (roll super-lows, boost the ~700 Hz–1.5 kHz click) — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ). Sub-only bass vanishing on phones? **Octave-up layer purely for 100–200 Hz warmth** — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8) / [You & Me](https://youtu.be/9zsU5Y8r_Ow)
- **Why:** Distorting the whole 808 turns the sub to mud; driving only the mids gives fundamental *plus* audibility. (Optional soft clip after to claw back the last dB.)
- 🎬 A qualitative confirmation of this stage's own thesis from a working mixer: "add distortion to the 808s... it just brings it a nice grit... little tricks that I use to kind of cut things through" — judged primarily on NS-10-style monitors (see [[Referencing and Translation]]), then followed by the Pultec stage above for bottom-end warmth — Mix with the Masters (Marcella Araica), [[Blending melodies with Marcella Araica]]

### 3. [[Pro-C 2]] — Control
- 4:1 · fast attack · release timed to the gap between notes · **2–4 dB GR**
- **Why:** Every 808 note the same size — low-end evenness matters more than dynamics down here.
- 🎬 **On a pure sine-wave bass specifically, heavy compression is framed as a correction, not just glue: no distortion/harmonics means "each moment at each frequency generates a different volume level," so compression is what makes the note-to-note loudness even — with a bit of perceived definition as a bonus.** *(qualitative — no ratio/threshold survives the source's garbled machine-translated captions)* → [[Bass Design]], [[Compression Staging]] — Mosty (Mix with the Masters), [[Mosty mixing a reggaeton track]]

### 4. [[Kickstart 2]] — Kick duck (the EDM/pop school)
- **Sync'd to the kick pattern** (②/④ — or [[Duck_Buddy]] / Pro-C 2 external sidechain for real triggering) · depth via the **Mix knob** (③ — back off until the pump stops being audible) · **curve = the groove** (①)
- **Stealth mode:** duck **only the lows** (multiband, or SC filtered <150 Hz) — full mix benefit, zero audible pumping
- 🎬 **A reggaeton fourth data point for the no-sidechain school below: skipped entirely, by choice, on a sine-wave sub bass** — the mixer doesn't recall his exact reason, just that "I felt that I didn't need it," favoring a simple, low-processing-count arrangement instead. → [[Sidechaining]], [[Bass Design]] — Mosty (Mix with the Masters), [[Mosty mixing a reggaeton track]]
- 🎬 **Disclosure's double-sidechain:** gentle wideband (~3–4 dB) + an aggressive **[[Pro-MB]] band on the sub only** (~12 dB) — the [[SUB Slot]] fully clears the kick while the [[BASS Slot]] detail keeps its level — [Deeper](https://youtu.be/SM0FZ58ckVw). Use a **dedicated sidechain trigger track** if extra syncopated kicks would stutter the pump ([[Sidechaining]]).
- **The hip hop counter-school (Mixed by Ali + Kenny):** *don't* sidechain — "it pulls the punch out of the 808" / "sidechain as a band-aid is lame." Fix sample pairing + surgical EQ pockets + gate the kick's tail instead; duck only when you like the sound of ducking. Sparse trap → the Ali way; dense four-on-floor → the duck.
- 🎬 **A third school, between the two above: duplicate the kick (with its full processing chain) as the trigger, hand-draw the duck instead of letting a live compressor react, then let [[Soothe2]] catch whatever still leaks through.** Bring the duplicated, fully-processed kick down to sit right under this bass, manually dip the bass's volume around each kick hit, then add Soothe2 on top — triggered by the duplicated kick — to mop up any transient/resonant bleed the manual dip missed. Genre-agnostic per the source ("works for every genre out there"); only the *depth* of the effect changes by genre. Result on the source mix: no audible bass-dip and 4 dB of headroom recovered. → [[Soothe2]], [[Sidechaining]] — Jaycen Joshua (Mix with the Masters), [Mixing Summits with Jaycen Joshua](https://www.youtube.com/watch?v=L6xx7DWKzng)

### 5. [[Utility]] — Mono low
- Bass Mono on, ~100–120 Hz
- **Why:** Stereo low end phase-cancels on clubs/vinyl and collapses on phones — subs live in mono, width lives above.

## 5 — Track FX (optional)

- **[[EchoBoy]] motion delay on a driven bass** — keeps a heavily saturated bass from feeling static without softening the distortion (the Monark→Distressor-on-full-red "My Hi" chain; owned drive lane: [[FETish]]/[[Devil-Loc Deluxe]] pushed hard) — Disclosure, [First Twitch Stream](https://youtu.be/IObzp3OugtY)
- **[[Chorus-Ensemble]] only above 200 Hz** (synthwave/pop lane) — keep the sub mono-clean.

## 6 — Bus / Send FX (optional)

Routing: **Digital Bass → [[2 Bass Group|Bass Group]] → [[3 Bass Bus|Bass Bus]] → [[Master Chain]]**.

- Low end gets **no reverb, no width** ([[FX Chain System]] rules) · [[Saturation Send]] for parallel dirt if stage 2 isn't enough.

## Variations

- **Long sliding 808s (trap):** [[Limiter]] at the end to pin sustain · glide on the instrument, not the chain.
- **Synthwave/pop synth bass:** open the LPF, chorus above 200 Hz, less duck.

## From videos

- **Heavy compression as a loudness-evenness fix on a sine-wave sub bass, plus a data point for skipping the kick sidechain entirely** — see the inline 🎬 notes in §3 (Pro-C 2) and §4 (Kickstart 2) above. → [[Bass Design]], [[Compression Staging]], [[Sidechaining]] — Mosty (Mix with the Masters), [[Mosty mixing a reggaeton track]]
- **Mix 808 low-end decisions primarily on NS-10-style monitors, add distortion purely for grit/cut-through, then finish with the Pultec for bottom-end warmth** — see the inline 🎬 notes in §4 (Saturn 2) and §3 (Pultec) above. → [[Saturation and Distortion]], [[UAD Pultec EQP-1A]], [[Referencing and Translation]], [[SUB Slot]] — Mix with the Masters (Marcella Araica), [[Blending melodies with Marcella Araica]]
- **A CS80 one-shot bass, pitched up, pulsed with a ShaperBox volume preset, built around a found a cappella** — see the inline 🎬 note in §1 above. → [[Shaper]], [[Sound Selection Guide]], [[Plugin Wishlist]] — loner, [we made a crazy r&b trapsoul song!? (making a beat from scratch around an acapella)](https://www.youtube.com/watch?v=39aHjEJ5-FU)
- **A minimal-effort UK garage bass chain: one deep-bass one-shot, root-following line, then OTT → MicroShift → EQ** — see the inline 🎬 note in §1 above. → [[OTT]], [[MicroShift]], [[EQ Eight]], [[Bass Design]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Root-following bassline + pitch-shift-the-whole-take-down fix on Kontakt Scarbee Rickenbacker** — see the inline 🎬 note in §1 above. → [[Kontakt 7]], [[Bassline Writing]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **A "make the run stand out" finishing move: light Decapitator drive + EQ applied ONLY to a pitched-down accent run, not the whole bassline** — see the inline 🎬 note in §1 above for the full two-part bass system this belongs to. → [[Decapitator]], [[EQ]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **Root-following Juno-emulation bass + extra bounce notes, written early in the build, plus Decapitator crunch** — see the inline 🎬 note in §1 above. → [[Decapitator]], [[Bass Design]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- **A full "chain it over and over" dubstep bass sound-design pass, built entirely on stock tools:** start from a plain sine wave → drive it through distortion ([[Saturator]]/[[Overdrive]]) until the waveform's character comes entirely from the processing → a 3-band [[Multiband Dynamics]] preset ("Smasher": heavy ratios on low/mid/high) as a faux-OTT stage → automate an EQ band directly for a moving notch/wah character → **bounce/resample the result and keep layering more processing on the printed audio** rather than endlessly tweaking one live chain. Worth knowing: resampling then pitching the bounced tone pitches every baked-in effect (phaser, chorus, distortion) along with the note, not just the pitch — a genuinely different texture than pitching a live synth voice. Build **3 separate layers** for one composite bass (long fuzzy sustained tone / short plucky hit / high screechy top) rather than one patch doing everything; **layer an octave-up duplicate** when the sub feels harmonically thin, and **crank distortion (not EQ) to generate missing harmonics** on a thin sub. → [[Saturation and Distortion]], [[EQ]], [[EDM Subgenres]] (Dubstep) — Max Konyi, [How to Make Dubstep in Studio One with Stock Instruments | Weekly Challenge #10](https://www.youtube.com/watch?v=sD3mE-siI5M)
- **Tuned dual/triple Saturator + Corpus for a "thick bass" front end** — the full recipe: two or three [[Saturator]] instances each tuned to the played note (fundamental, then an octave up), plus [[Corpus]] tuned to the same sub frequency for physically-modeled reinforcement, before any of the usual EQ/comp/duck stages below run. Escalation from there: resample + a parallel high-passed (~150–300 Hz) Saturator layer, [[Multiband Dynamics]] + notch EQ, a harmonically-tuned phase disperser + grit, then a Limiter before anything wilder. Full writeup: [[Bass Design]]. — dnksaus, [Tighten Your Sub Bass with CORPUS (Not Clickbait) \[I Swear\]](https://www.youtube.com/watch?v=260MHJtu0pc)
- **808 tuning + slides workflow** — tune the 808 UP an octave+ to hear the note center, then drop it back (never guess at sub pitch); slides on audio 808s: pitch to the note with warp OFF, then warp mode **Tones** + clip transposition envelope and draw the slides — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
## Sources

Disclosure — [Deeper](https://youtu.be/SM0FZ58ckVw) · [Waterfall](https://youtu.be/sL5CG444qwQ) · [NO CAP](https://youtu.be/kz5dmb3QdI8) · [First Twitch Stream](https://youtu.be/IObzp3OugtY) · [Prince Edit + Talk VIP](https://youtu.be/hOvLf9nX500) · Kenny Beats — [808 & Kick + Subtractive EQ](https://youtu.be/4iAKvWWlCvY) · [Beat Mix & Creation](https://youtu.be/FC__hbvnETY) · George T Music (Mixed by Ali) — link in [[FX Chain System]]
