---
type: yt-note
date: 2026-09-03
briefed: backlog
source: youtube
url: https://www.patreon.com/posts/166944340
channel: Tape Notes
duration:
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, overmono, gear-list, vocal-production, drum-reamping, synth-layering, mastering, mixing]
---

# TN: 187 OVERMONO - FULL VIDEO EPISODE!

![](https://www.patreon.com/posts/166944340)
📺 [Watch on Patreon](https://www.patreon.com/posts/166944340)

## Synopsis

Ed and Tom of Overmono walk through three tracks from their album *Pure Devotion* — **Ballad** (feat. Kindora & Rocc), **Barum**, and **Night in Shining Prada** (feat. John Glacier, transcribed as "John Joseph Holt") — plus a short outro clip of **Adra**. This is one of the deepest process breakdowns in the vault: a heavily layered, plugin-dense duo workflow built around deliberately over-processing recorded vocals until they "sound like a sample," a house style of real-world speaker reamping instead of reverb for spatial depth, custom drum racks multi-sampled from whatever synth is in the room that week, and a mastering chain built from several *light* limiters stacked in series rather than one heavy one. Companion piece to [[TN 187 Overmono - Gear List]] (their studio inventory) — this episode is where several of that list's plugins get real, artist-specific technique behind them.

## Techniques

### Ballad — vocal chain (Rocc's vocal, sample-flavored)
- **The whole vocal is deliberately over-processed to sound sampled, not recorded.** Even though most of Rocc's vocal was freshly tracked (some lines resampled from his and Kindora's other songs), Overmono push ~4-5 stacked compressors on it (they estimate **~20dB of total gain reduction split across the chain**) specifically because heavy compression pulls up mouth noise, room tone and grit the way an old sample would carry — "when we get it into a world where it feels like it's being sampled, then we start approaching using it in a different way." → **[[Compression Staging]]**, **[[1 Main Vocal Track]]**.
- **Stage 1 (baby/ad-lib layer):** [[Little AlterBoy]] to pitch the layer up + shift formants up (not just repitch — formants specifically raised for character), a touch of EQ, [[MicroShift]] ("we use it on absolutely loads of stuff") for width, then a touch of Auto-Tune even on an already-in-tune take. → [[Little AlterBoy]], [[MicroShift]], [[Auto-Tune Pro]].
- **Stage 2 (vocal group bus):** [[TAL-Chorus-LX]] ("which we rinse on" — their go-to chorus, run on nearly everything that passes through this bus), occasional Waves CLA Vocal Plugin (not owned) for high-energy passages, a "Helpless" preset that scoops a lot of low end to help things "pop," a sidechain duck compressor, and a short slapback delay.
- **Stage 3 (Rocc's main vocal bus):** Eventide Discord4 (not owned — MicroShift-like doubling/widening with more control over pitch spread and delay time) for stereo width; another sidechain duck; UAD 1176 with the **"Album Ready Vocal" preset** for heavy compression. → [[UAD UA 1176LN]].
- Heavy corrective EQ removing most of the low end gives the vocal a deliberate "phone quality" that reinforces the sampled feel; a slow/gentle late-chain compressor adds harmonics; the last of the ~4 compressors is still doing **-5 to -6dB** on its own.
- **EQ specifics:** cut some sub on the mag (Maag EQ4, not owned), +1dB boost at 2.5kHz for "a bit of bite."

### Drum bus (Ballad)
- Kick: light EQ + a touch of frequency shifting.
- Custom drum racks are built by **multi-sampling whichever synth is currently in the studio** (Volca Decade, Juno, MS-20 all named) into Ableton drum racks rather than leaning on drum-machine presets; TR-1000 used sparingly for texture, deliberately avoided as a primary kit source to dodge "traditional drum machine" sound.
- Drum bus chain: [[API-2500]] compressor for snap/punch, light EQ (small notch + high shelf), a second Vari-Mu-style compressor to glue the kit together, then Maag EQ4 with the **low-pass trimmed slightly + a touch of distortion dialed in** (not just an air-band EQ — used here as a top-end tamer). → [[API-2500]].
- Bus processing philosophy: "we always do most of our mix work as we go along" — bus chains get built up incrementally while writing, not applied at the end.

### Ballad — mix bus / mastering chain (their default, described start to finish)
- **[[Acustica Audio Ruby 3]] (Pultec-style tube EQ, not owned) called "without a doubt our most used plugin and probably the most important" to their sound.** Typical move: a small cut+boost around 40Hz, a scoop around 200Hz, a small cut+boost at the top — dialed in fast, "by feel." Real hardware (D.W. Fearn VT-5) experience is what sold them on it.
- Tape stage: Ampex ATR-102 emulation (not owned), **~10dB attenuation before hitting the tape stage** to land at the right drive level, "Jazz Vision Master" preset — the repro-section top-end lift is described as distinct from a plain EQ boost.
- Gullfoss (owned) used **heavy-handed, up to ~40% intensity** (their normal use is much lighter) for broad tonal correction before the limiter chain. → [[Gullfoss]].
- Their in-development plugin ("Diamond Cut," a collaboration, not yet released) used as a light bus processor: soft saturation, a little stereo width, light clipping/expansion — used sparingly here (~1dB gain reduction).
- **Four-limiter layered chain, each doing only 1-2dB of reduction with a different character, rather than one limiter doing 6dB:** Diamond Cut (punch) → PSP VintageWarmer2 (not owned, EQ high-shelf + compression) → Waves L2 Ultramaximizer (not owned, "smeary," pulls up noise/detail, used *very* lightly since "L2 can ruin music really quickly") → [[Pro-L 2]] in **transparent mode**, ~2dB. Between the limiters, Maag EQ4 adds ~2dB at 15kHz for "sizzle." → [[Pro-L 2]].
- Small correction after the Ruby's Pultec-style top/bottom cut: if the mid-scoop leaves a "gaping void in the middle," add back ~0.5dB in the low-mids.
- Explicit philosophy: no fixed mastering chain — "it's different every time... we just keep going until it sounds right to us," not toward a textbook-correct signal path.

### Chorus synth stack (Ballad — layered pad/chord texture)
- Multiple synth layers (Access Virus TI, a Jupiter-4 "accordion" patch, Juno-60) recorded separately then comped together into one composite chord layer, rather than one big multitimbral patch.
- **Eventide Omnipressor (not owned) used as a transient/sustain splitter**, not a compressor in the normal sense: turn the transient control way down and the sustain control up on a plucky/organ-like layer to soften the attack and make it feel more "drawn out," paired with a second, more standard heavy compressor after it for extra glue. → candidate for [[Plugin Wishlist]] if a transient-shaping use case comes up (see wishlist add below).
- **Dry-vs-wet-panned mono trick:** record a synth completely dry panned hard left, record the same signal through a Roland Space Echo RE-201 fully wet panned hard right, then **sum both hard-panned copies to mono** ("against all logic") before further processing — described as adding an unusual thickness/distortion character that a normal centered dry+wet blend doesn't give. → **[[Layering and Stacking]]**.
- Post-mono-sum chain: compression, then [[Radiator]] (owned) "to warm it up a bit — we use that on mix buses quite a lot," then Arturia Pre-1973 preamp emulation (not owned) for a *small* top-end lift ("you only need a tiny amount, and it adds a huge amount"), then LiquidSonics Cinematic Rooms reverb (not owned) used extremely subtly — "I don't want something to sound like it's got reverb on it, but it should sound like it's in a sense of space." → [[Radiator]].

### Barum
- **Vermona Performer synth** (4 independent monosynth voices stacked, with a polyphony mode that *randomly cycles which of the 4 voices plays each repeated note* — each voice can carry different envelope/release settings) used for a chord layer that evolves and detunes naturally over a held/repeated chord, described as impossible to replicate on anything else they've tried (including attempting to recreate the idea in Reason). Run through a "Decades Expander" for chorus + ring-mod modulation.
- CS-15 synth used dry-ish for the bassline — just a compressor and a touch of F501-style chorus; praised for sounding "amazing straight out of the box" with minimal processing needed.
- **Drum reamp technique — the episode's most distinctive move:** the TR-1000 drum stem, once the arrangement was locked, was replayed back out through two different real-world speakers simultaneously and re-recorded with mics: a **4×12 Marshall guitar cab** on one side (gritty, no low end — EQ'd out afterward) and a **~100-year-old railway station announcement speaker** (unknown brand, rebuilt with a period-correct Goodmans driver) on the other side. Elements were pre-panned before the reamp so each speaker only received one side's signal, preserving the original stereo picture but through two very different, unnatural-sounding transducers — described as giving "a really wide stereo image" that "feels slightly unnatural." A dry copy of the kick was blended back in underneath. → **[[Depth and Space]]**.
- Vocal (sampled, Jazz Carousel source) run through a hardware Eventide Space-type reverb pedal (transcribed "space station" — likely Eventide Space, unconfirmed) doing most of the spatial heavy lifting, then Waves MV2 (not owned — upward compression/expansion) and Gullfoss (owned, lighter touch here) for smoothing. → [[Gullfoss]].
- Prophet-10 layers using an F501-style spring-reverb/chorus pedal for a wet-only recorded return, panned independently of the dry signal (sometimes the dry is dropped entirely and only the wet return is kept).
- **Narrowing-stereo breakdown trick:** during a Prophet breakdown section, multiple detuned Prophet layers are gradually panned *narrower* over several bars (inspired by an unnamed Stephen Stills record) so the section feels like it's "closing in," then snaps back to full width at the next section change. → [[Depth and Space]].
- A Moog-style modulated delay ("Mugefuge Clusterflux," likely a Moogerfooger MF-104 Analog Delay or similar — name garbled in transcript) used on a Prophet layer for a wobbly delay/modulation texture.

### Night in Shining Prada (feat. John Glacier)
- Song built from a raw a cappella voice-note poem John sent — Overmono wrote chords around the vocal's existing cadence/melody rather than the usual reverse order. **84 total arrangement/vocal-comp versions were done; they ended up going with version 83, not the final one**, after realizing an earlier version (28) had something that got lost by version 56 and had to be partially rebuilt from there.
- **Prophet 6's built-in phaser used as a signature, non-reproducible texture** — they tried recreating the same chord voicing on their own Prophet 10 with an outboard/plugin phaser and couldn't get close, so for later sessions they went back to the *same physical Prophet 6 in the same studio* to re-record the part instead of trying to emulate it.
- OB-6 layered under the Prophet stack for a "lush, brassy Oberheim" texture (same pairing already logged from the [[TN 187 Overmono - Gear List]] page).
- SH-2 synth used for a minimal, mostly-2-note bassline; doubled through the same re-amped Marshall stack (see Barum above) purely to add audible upper harmonics on small speakers — used **as an alternative to a saturation plugin** when the direct signal was "too subby" to translate.
- **TB-303 used loud, dry and unapologetically "classic"-sounding** as a deliberate anti-cliché choice — rather than disguising the 303 character (their normal instinct with familiar sounds), they leaned into it hard as the track's "call to arms" element, introduced relatively late in the arrangement. → [[Roland TB-303]].
- **Reverb-avoidance vocal technique:** instead of a reverb plugin, the vocal was replayed through a real vintage Tannoy speaker set up in a small stone/concrete storeroom next to the studio, with the mic moved closer to or further from the speaker to dial in natural room depth — chosen specifically because plugin reverbs kept sounding "too processed" for a vocal they wanted to feel almost dry but still "in a space." → **[[Depth and Space]]**.
- A Rodec MX modular mixer (built-in Sherman Filterbank-style filter section) plus a Roland Jet Phaser were used to reamp/return a heavily filtered, phased version of the full mix (or full drum stem) as a low-level textural layer blended under the main mix — same "record the effect, not just the source" philosophy as the wet-only Space Echo layers above.

### General / advice
- **Cymbal-baking technique (credited to Sylvia Massey's *Recording Unhinged*):** strip the lacquer off a cheap crash cymbal with a wire brush, coat it in a paste of blended crisps, ~1L vinegar and ground coffee, bake overnight, then chip off the crust. Result: a corroded cymbal with unusually long, near-infinite sustain and a "dead," lo-fi character — used as the crash on *Night in Shining Prada*. → [[Sound Selection Guide]].
- General advice: distrust internalized production "rules" picked up from forums (e.g. "you can't boost EQ on a breakbeat, only cut") — years of experience taught them there are no fixed rules, only what sounds right by ear.
- They record almost everything into audio, not MIDI, even early sketches — chopping/arranging happens in the audio domain from the start.

## Routed to
- [[Compression Staging]] — heavy layered-vocal-compression philosophy, layered-limiter mastering chain
- [[Layering and Stacking]] — dry/wet hard-pan-to-mono trick, multi-synth chord comping
- [[Depth and Space]] — speaker-reamp technique (Marshall + antique speaker; Tannoy room mic'ing), narrowing-stereo breakdown trick
- [[Sound Selection Guide]] — baked-cymbal technique
- [[API-2500]], [[UAD UA 1176LN]], [[Pro-L 2]], [[MicroShift]], [[TAL-Chorus-LX]], [[Little AlterBoy]], [[Auto-Tune Pro]], [[Radiator]], [[Gullfoss]] — technique bullets added
- [[Roland TB-303]] — usage note added
- [[Plugin Wishlist]] — Eventide Omnipressor (new), Eventide Discord4 (new); sightings added for Waves MV2, PSP VintageWarmer2, Waves L2 Ultramaximizer, Arturia Pre 1973, Ampex ATR-102, Maag EQ4, Acustica Ruby 3, Waves CLA Vocal Plugin, LiquidSonics Cinematic Rooms
- [[Vintage Gear Worklist]] — Sequential Prophet-6 (new), Oberheim OB-6 (2nd sighting), Sequential Prophet-10 (2nd sighting), Roland SH-2 (2nd sighting), Yamaha CS-5/CS-15 (2nd sighting), Roland Space Echo RE-201 (4th sighting — dry/wet-mono-sum trick), Vermona PERfourMER MKII (2nd sighting), Sherman Filterbank/Rodec (2nd sighting — Rodec MX + Jet Phaser reamp), Roland Jet Phaser (2nd sighting), Roland TR-1000 (2nd sighting — speaker reamp source)

## Source
- Patreon: [TN: 187 OVERMONO - FULL VIDEO EPISODE!](https://www.patreon.com/posts/166944340)
- Channel: Tape Notes
- Transcript source: real captions (Patreon subtitle track), high confidence — spoken breakdown, transcribes cleanly aside from a handful of garbled gear names (flagged inline above).
- See also: [[TN 187 Overmono - Gear List]]
