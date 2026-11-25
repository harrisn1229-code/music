---
type: yt-note
date: 2026-07-15
source: youtube
url: https://youtu.be/e9d7KYEG3VM
channel: Disclosure
duration: "00:31:23"
video_type: production
music_enriched: true
transcript_source: whisper
tags: [yt-note, music, production, disclosure, two-step-garage, vocoder, synths, vocals]
swept: 2026-07-19
briefed: backlog
---

![](https://youtu.be/e9d7KYEG3VM)
📺 [Watch on YouTube](https://youtu.be/e9d7KYEG3VM)

# Disclosure - 'Who Knew' with Mick Jenkins Twitch Breakdown

Guy breaks down "Who Knew" (ENERGY, with Mick Jenkins) — the **two-step garage beat he says is the best he's ever made**, and "the blueprint of ENERGY": *one* synth for the pads (**Poly6**) and *one* for the bass (**Monark**), both brought to life entirely by **live-performed filter/resonance mapped to MIDI knobs**. The standout reusable tricks: the full **vocoder routing recipe** (pre-fader send → muted bus → sidechain input), **converting a 4-on-floor garage loop into two-step by EQ'ing out its kick**, **dynamic EQ keyed separately to snare vs hat**, and **sample-delay widening to fake three vocals out of two**. Whisper transcript (no captions) — high confidence.

## Techniques

### Synths — one Poly6, one Monark, performed live
- **Map cutoff + resonance to MIDI-keyboard knobs and *perform* the filter live.** As Howard played the [[Poly6]] one-take, Guy rode the cutoff/resonance by hand (then neatened it) — the whole synth movement is a jam, not LFOs. "If I didn't show you the file you'd believe it was a real analog synth." You can only do this once parameters are mapped to hardware. → [[Automation]], [[Modulation]].
- **The jam drives the arrangement** — pull the filter down → pull the drums down; player digs in + bass enters → slam the drums in. Structure figured out by jamming, not by grid. → [[House - EDM]].
- **Keep a bass part as one glued synth that *glides*, not chopped audio.** The entire bass is one [[Monark]] instance start-to-finish; automate cutoff, resonance, and 2–3 oscillators coming in/out for texture so it rises/falls and glides between mangled moments — deliberately *not* multiple instances or chopped audio. → [[1 Digital Bass Track|Digital Bass Track]].
- **Poly6 chain:** EQ (cut lows/rumble, tame resonances when notes cluster, lift washy top) → Valhalla Delay (light automated ping-pong) → ValhallaVintageVerb "concert hall" ~3 s → light comp (tame builds) → Logic Chorus + Roto Cab on a bus. Heavy reverb/delay/buildup automation. → [[BED Slot]], [[Reverb]].
- **Poly6 + Monark are the two most-used plugins on the whole album** — "the blueprint of ENERGY." (Aside: Settle won a Best-Mix award on *all stock Logic* — "you don't need fancy stuff.") → [[Sound Selection Guide]].

### Drums — a garage loop turned two-step
- **Convert a 4-on-floor garage loop to two-step by EQ'ing out its kick, then add your own.** Built on a cleared **Jeremy Sylvester** garage loop, chopped/warped in **Ableton** (rewired into Logic — prefers Ableton's warp); EQ out the loop's "boom-boom-boom" 4-4 bass drum, then program a two-step kick pattern over it. → [[Sampling and Sound Selection]], [[Kick Design]].
- **Dynamic EQ keyed *separately* to snare and hat on a drum loop** — one set of dynamic nodes ducks when the snare hits, another cuts the hi-hat when it's in; "you can watch them move one after the other." Surgical loop-taming. (Kept a big ~30 Hz sub-rumble under the snare — "big energy.") → [[EQ]], [[Masking and Carving]].
- **Two kicks: one long kick on the 1 + little filler kicks** between (the fillers were fighting the bass, so kept small). J Dilla snares chopped for offbeat garage hits; a layered hi-hat over the sample's. → [[2 Drums Group|Drums]].
- **MIDI note *length* = 808 note length** — hold a MIDI note longer for a longer 808 (shaker/maraca/808 closed+long in Battery); lets you write rhythmic 808 lines by drawing note lengths. → [[Sampling and Sound Selection]].
- **Vocoder the *whole drum bus* for tonality** — send the drum bus (bus 15) through a vocoder to add harmonic texture under the kit. → [[Modulation]].
- **Drum bus:** glue comp (don't crush — the sample's already crushed) → tape (into the red so the kick "squirts" the hats) → a little [[Oxford Inflator]] → more saturation → EQ (pull painful high-mids) → limiter *barely* touching. A **two-step groove rarely lands kick+snare together, so there's no big transient peak** → it doesn't need hard limiting; leave it open and dynamic. → [[2 Drums Group|Drums]], [[Clipping and Loudness]].

### The vocoder recipe (reusable)
- **Full routing:** on the vocal, add a **pre-fader** send to a bus (so the send level is constant regardless of the fader) and **mute that bus** (you don't hear the raw send); then set the **vocoder's sidechain input = that bus**. Play chords on the vocoder synth — the vocal becomes the synth (chords = carrier, voice = modulator). Here the carrier is the Poly6 chords, elongated. Adds a robotic bed under the lead. → [[Modulation]], [[Pitch and Formant]].

### Vocals (Mick Jenkins)
- **Sample-delay widening: fake three vocals from two.** Double-track, keep one center, duplicate it and nudge one channel by a few samples per side (here L 344 / R 1387 samples) → super-wide stereo without re-tracking. Ends up one center + one hard-L + one hard-R. Works on guitar too. (Slightly phasey, "better than nothing.") → [[Width and Stereo]], [[Stereo Field]].
- **Give up the vocal's low-mids to a dominant single synth.** Because the Poly6 owns the low-mids and is the only synth, the vocal is cut hard there and lives in the high-mids/highs — deliberate lane split so they don't clash. → [[Masking and Carving]].
- **Vocal bus (every vocal in the track runs through this one bus):** glue comp (both doubles together) → EQ (big low-mid cut) → de-ess → **[[Saturn 2|Saturn]]** clean-tube warmth ("like an old desk/preamp") → two H-Delays (one ¼-note automated in/out, one ⅛-note-triplet, short) → reverb → Logic Chorus + Roto Cab (width) → **sidechained by kick *and* snare** (aggressive pump purely to *glue* the vocal into the drums, not as an effect). → [[2 Main Vocal Group|Main Vocal Group]], [[Sidechaining]].
- **Keep a sensitive vocal upfront and dry** over washy pads — the synth does the wet/resonant motion underneath, so the voice stays present. Per-vocal: [Frank Sinatra's Capitol **U-47**] → Neve (treble boost, cut rumble) → Tube-Tech → EQ (boost highs, cut a resonance + lows) → de-ess. Light Melodyne (bends). → [[LEAD Slot]] / [[AIR Slot]].
- **A single lo-fi "Burial" ad-lib** — take one vocal ad-lib through heavy distortion (CamelPhat-style), cut all the highs, big echo-boy + reverb, so it reads as an out-and-out Burial sample. → [[Ambient Texture and Field Recording]].

## Routed to
- Palette: [[SUB Slot]], [[BASS Slot]], [[BED Slot]], [[LEAD Slot]], [[AIR Slot]]
- Techniques: [[Sampling and Sound Selection]], [[Masking and Carving]], [[Sidechaining]], [[Automation]], [[Kick Design]]
- Effects: [[Modulation]], [[EQ]], [[Reverb]], [[Pitch and Formant]]
- Plugins: [[Monark]], [[Poly6]], [[Saturn 2]], [[Oxford Inflator]]
- Chains: [[1 Digital Bass Track|Digital Bass Track]], [[2 Main Vocal Group|Main Vocal Group]], [[2 Drums Group|Drums]] bus
- Sound Selection Guide: Poly6 + Monark (ENERGY blueprint), Jeremy Sylvester garage loop
- Vintage: [[Roland TR-808]]

## Source
- [Disclosure - 'Who Knew' with Mick Jenkins: Twitch Breakdown](https://youtu.be/e9d7KYEG3VM) · Disclosure · 31:23
- Transcript: [[Disclosure - 'Who Knew' with Mick Jenkins Twitch Breakdown (transcript)]]
- Transcript source: **Whisper (base)**, no captions · confidence high (spoken).
