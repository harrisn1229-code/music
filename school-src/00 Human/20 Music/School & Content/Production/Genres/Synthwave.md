---
type: genre-playbook
title: Synthwave
reference_artists: [The Midnight, Kavinsky, FM-84, Timecop1983, Gunship, Com Truise, John Carpenter]
reference_tracks: ["Nightcall", "Days of Thunder", "Running in the Night", "On the Run", "Sunset", "Tech Noir"]
tags: [genre, synthwave, retrowave]
swept: 2026-07-19
---

# Synthwave

**What makes it the genre:** the imagined 1980s, rebuilt with reverence — Juno chorus on everything harmonic, LinnDrum-family drums with gated reverb, a relentless 16th-note synth bass, and neon brightness as an emotional statement. It's *nostalgia engineering*: period-correct sound sources, but mixed with modern low end and loudness. Nearly always minor-key, mid-tempo, cinematic.

## The pillars

### 1. The polysynth — chorus is the genre
- The center of the harmony: a bright Juno-style poly playing pads and held chords — **[[Model 84 Polyphonic Synthesizer]] "80s polysynth / Synthwave" recipe** (same recipe on [[Serum 2]] and [[Omnisphere]]).
- It's a **bed that sits forward**: brighter and drier than a normal pad ([[BED Slot]] bright-variant) — filter ~75% open, Chorus II, minimal send. Brightness + dryness = up front without level ([[Stereo Field]] depth rule).
- Stab variant: same patch, fast attack, short release — played on the off-beats.
- 🎬 A single Juno-emulation instrument can carry the WHOLE harmonic side of a track — one worked build ran it across five separate roles (main pad, bass, a second "chorus-lift" pad, a pluck texture, a bell counter-melody), each with its own small effects recipe rather than a shared bus. Full per-layer breakdown below. → [[Model 84 Polyphonic Synthesizer]]

### 2. Drums — LinnDrum physics + gated reverb
- Palette: LinnDrum / Oberheim DMX / TR-707 samples (or 808 kick under a Linn snare). Straight 8ths, four-on-the-floor or the half-time "driving at night" beat.
- **The gated snare is the signature:** [[ValhallaVintageVerb]] **Nonlin mode** (built for exactly this), or a big 1980s-Color room → hard gate. Huge, then *gone*.
- Toms matter in this genre — the fill into the chorus is a feature, gated the same way.
- Keep kick + snare center and punchy ([[TRANSIENT Slot]]); the era's drums were dry *under* the gated blast.

### 3. Bass — the 16th-note engine
- Mono synth bass pumping straight 16ths (or driving 8ths) — [[Model 84 Polyphonic Synthesizer]] Juno bass recipe (HPF 0 bump) or a Moog-ish mono patch.
- **Sidechain it to the kick** ([[Kickstart 2]] or Compressor sidechain) — the pump is period-appropriate *and* the groove.
- Mono, chorus OFF, center ([[BASS Slot]] rules); modern sub weight under it is the one deliberate anachronism.

### 4. Leads & arps
- Arpeggios: 8th/16th synced arps outlining the chords ([[Serum 2]] simple saw, or [[Omnisphere]] `ARP + BPM`) — delay-synced dotted-8th throws.
- Leads: soaring single-voice saw with pitch-bend scoops and delayed vibrato ([[Serum 2]] trap-lead recipe minus the trap: slower glide, more hold), or DX7-style FM bells/keys for the glassy verses ([[Omnisphere]] `Keyboards` FM patches).
- Vocals (if any): clean 80s pop delivery, chorused/doubled wide, long bright plate — or vocoder/talkbox as texture.

### 5. Mix moves — neon
- **Chorus on everything harmonic** except bass/kick — when in doubt, more.
- Reverbs bright and long: [[ValhallaVintageVerb]] **1980s Color** everywhere (it's literally the era's technology switch); plate for vocals, Nonlin for drums.
- Dotted-8th and quarter-note delays ([[ValhallaDelay]] tape/BBD modes) on leads and stabs — throws on phrase-ends.
- Brightness discipline: the *polysynth and leads* carry the neon; keep drums-verb and bass darker so the top doesn't pile up ([[AIR Slot]] "one bright element" rule still applies).
- Wide beds, mono bass, LCR courage — then the [[Stereo Field]] mono check: all that chorus must fold (Juno-style BBD chorus folds fine; avoid Haas tricks).

## Arrangement

**Section map** — the worked 140 BPM breakdown below follows this shape almost exactly.

| Section | Bars | Slots filled | Density |
|---|---|---|---|
| Intro | 8–16 | everything, **under a filter sweep across the whole section** | 5 (filtered) |
| A / verse | 16 | SUB · BASS (16ths) · BED · LEAD · TRANSIENT — **pad out** | 5 |
| B / chorus | 16 | **pad + arp together** | 7 |
| Solo | 16 | lead synth takes LEAD, vocal out | 6 |
| Outro | 8–16 | filter closes back down | ↓ |

**Entrances & exits**
- **The 16th-note bass never stops.** It's the clock. Everything else is optional; that isn't.
- **The pad is the section switch** — pad out = verse, pad + arp = chorus. Same parts, different mute states, per the third breakdown below.
- Panned descending toms (high → mid → low) as the transition device, plus a plain riser. Period-correct and cheap.
- **B-section lift = duplicate and beef up the SAME bass and kick**, not new parts. Stated directly in the second breakdown.

**The contrast move — the arp arriving.** One part, and the section has changed gear. The filter sweep does the same job at the intro, over the whole section rather than the last two bars.

**Density rule: 5–7, high and steady.** Like psych-pop, this is a dense genre where sections differ by mute state and filtering, not by emptying out. The gated snare and the chorused pad fill so much space that subtraction reads as broken rather than dynamic.

## Session recipe (start here)
84–110 BPM · minor key (Am/Fm/Cm lanes) · **i–VI–III–VII** or **i–VII–VI** progressions · build order: 16th bass + kick first (the engine), polysynth chords second (the neon), gated snare third (the era), lead/arp last (the hook) · sidechain bass+pads from the kick · [[Sony TC-630]] print pass on the polysynth = real tape era-glue.

## More from a second breakdown (worked session at 140 BPM)

- **Drum envelope: add a Hold stage (~30–50 ms) before Decay** so the decay curve only ever shapes the tail, never eats into the hit's initial body — general drum-design hygiene, applies to any synthwave kick/snare/tom. → [[Kick Design]], [[Snare Design]]
- **Room reverb on the kick isn't automatic — audition it, don't assume it** — an explicit negative result: adding room reverb to a synthwave kick didn't read the way expected; dial it carefully rather than defaulting to "reverb on everything" for the kit.
- **Distortion on a bass/low element often adds new unwanted low-frequency content — EQ it back out afterward**, don't treat the distortion pass as finished until the low end is checked. → [[EQ]], [[Saturation and Distortion]]
- **Beef up weak toms with distortion**, not just level/EQ — a fast fix for thin-sounding toms.
- **A "massive phaser" bass synth as a distinct, purpose-built intro-only texture** — separate from the main bassline patch, designed specifically for the intro's character. → [[Phaser-Flanger]]
- **Reverse reverb + aggressive low-frequency removal as a rising intro transition** — combine a reverse-reverb swell with cutting a large chunk of low end on the same element for a thinning, rising lead-in to the drop. → [[Reverb]]
- **Filter sweep over the WHOLE intro section**, confirming the general filtered-intro arrangement move for this genre specifically. → [[Arrangement and Song Form]], [[Auto Filter]]
- **Saw lead: slow LFO on oscillator pitch + flanger + a generous reverb send** — the recipe reached for when a first pass on a saw lead read as flat/dry: modulate pitch gently rather than statically, add a flanger for movement, and lean much harder on reverb send level than feels natural at first.
- **Melody rhythm placement should dodge whatever rhythmic hit already grabbed the ear elsewhere** — before placing a lead note on a strong beat, check whether another part (a stab, a bass hit) already occupies and "claims" that beat rhythmically; if so, write the melody note somewhere else. → [[Melody Writing]]
- **Sometimes skip the kick on some beats** rather than four-on-the-floor throughout — a legitimate genre variation, not a mistake.
- **B-section energy lift: duplicate and "beef up" the SAME bass and kick parts** rather than writing new ones — reads as a structural jump in intensity from the existing material alone. → [[Arrangement and Song Form]]
- **A IVm7sus-over-tonic ("four sus") cadence chord as a synth-wavy alternate to a plain IV major** — worth filing as a genre-flavored substitution option, even when not fully committed to in a given track. → [[Suspended Chords]]

*Source: Max Konyi, [[Synthwave in Studio One with Stock Instruments - Weekly Challenge No. 9]] — captions, low-medium confidence.*

## More from a third breakdown (an 80s Weeknd-style synthwave/pop beat)

One Juno-emulation instrument, five roles, each with a distinct small effects chain:

- **Main pad:** attack/envelope pulled down for a dry starting tone → chorus (applied BEFORE the arpeggiator, not after) → tape/cassette warmth → heavy reverb ("it wants to be a big sound," and stacks well with the chorus for extra size) → EQ (cut the audible low notes) → delay. A half-time effect was tried on this chain and then removed for being unused — audition optional stages and cut what isn't earning its keep rather than leaving a dead device in a shipped chain.
- **Bass, written early ("so I can make sure it's right"):** follows the chord progression's own root notes, with extra notes added on top purely for bounce/rhythm, then [[Decapitator]] afterward for crunch.
- **Second "chorus-lift" pad,** added once the base pad+bass+drums felt too small for the chorus: same dry-start move (envelope AND frequency pulled down) → EQ (lows + a deeper mid cut than the main pad) → delay → reverb.
- **Pluck texture layer,** hook-second-half only: reverb → delay → EQ (heavy low cut, since the patch barely has low end to begin with) → auto-panned side to side for movement — a texture/ear-candy layer, not a melodic part.
- **Bell counter-melody,** end-of-verse only: a **tape, eighth-note, ping-pong delay** (modulation down, drive low, mix pushed up) is effectively the entire processing chain — called a repeat go-to ("I like to use this delay a lot"). Owned lane: [[EchoBoy]].
- **Drums:** two Splice kits picked specifically for "80s pop kind of drums" character over a generic trap/hip-hop bank (**Oliver's Power Tools pack two**, **"Medicine Hyper Color"**); the now-familiar hi-hat recipe on this channel — shorten the tail, pitch down, then nudge off the kick — reappears here with the exact repeatable keyboard workflow named for the first time: **Select None → Ctrl+A → Shift-right arrow twice**. → [[Pocket and Microtiming]], [[Genre Drum Patterns]]
- **Priority statement:** "the drums are pretty simple... but for me the main part is the bass, the bass gives it the rhythm and the swing" — bass over drum groove as the primary rhythmic driver, worth weighing against this genre's usual "16th-note bass engine as the groove" framing above (pillar 3) rather than treating as a contradiction — here the bass is a chord-root-following part with bounce notes, not the driving 16th-note mono line.
- **Arrangement:** quick two-part intro → panned descending toms (high/mid/low) → a plain riser from a Splice "BWB kit" → verse/chorus contrast built entirely from muting the main pad (chorus = pad + arp together; verse = pad OUT, bell fills the tail of each verse) rather than writing new parts per section. A snare roll is built by chopping a section with Ableton's Cut tool (Shift-click to slice) and duplicating the pieces.

*Source: loner, [[how to make an 80's synthwave-pop beat for the weeknd.]] — captions, good confidence.*

## Sources
- [Output — Best plugins for synthwave](https://output.com/blog/best-plugins-for-synthwave)
- [Futureproof Music School — How to make synthwave](https://futureproofmusicschool.com/blog/dive-into-synthwave-create-your-own-sound-today)
- [Synthwave Pro — Track from start to finish](https://synthwavepro.com/how-to-make-a-synthwave-track-from-start-to-finish/)
- [Synth Pop — What makes a synthwave song](https://synpop.com/what-makes-a-synthwave-song/)

*Related: [[EDM Subgenres]] synthwave card (quick-identity version — this page is the full playbook) · [[Psych-Pop (Tame Impala)]] shares the chorus-everything DNA.*

*Vintage gear behind the sound: [[LinnDrum]] (the gated snare kit) · [[Linn LM-1]] · [[Roland Juno-106]] + [[Roland Juno-6 - Juno-60]] (the chorus bed) · [[Roland Jupiter-8]] (the luxury arp) · [[Roland SH-101]] (the 16th-note bass engine) · [[Oberheim DMX]] · [[Simmons SDS-V]] (the tom fill) — full library: [[Vintage Gear Index]].*
