---
type: yt-note
date: 2026-07-15
source: youtube
url: https://youtu.be/gCfU5Cq9WU4
channel: Disclosure
duration: "03:32:32"
video_type: production
music_enriched: true
transcript_source: whisper
tags: [yt-note, music, production, disclosure, house, afro-house, vocals, vocoder]
swept: 2026-07-19
briefed: backlog
---

![](https://youtu.be/gCfU5Cq9WU4)
📺 [Watch on YouTube](https://youtu.be/gCfU5Cq9WU4)

# Disclosure - Howard Is Here + Douha (Mali Mali) Breakdown

A 3.5-hr stream: Howard's first Twitch appearance (songwriting chat + a live beat jam), then Guy's solo breakdown of **"Douha (Mali Mali)"** (ENERGY, ft. Malian singer **Fatoumata Diawara** — Whisper mishears the title as "Marley Marley"). The breakdown is dense despite the casual format. Best material: **triggering sidechains from a metronome beep instead of the kick** (and stacking delayed trigger tracks to beat UAD latency), the **remix-a-simple-Motown-song** writing strategy, **odd-bar-count drops**, a **bass "attack layer"**, dirtying clean softsynths on the way in, and using **Melodyne to *rewrite* a melody** to fit new chords. Whisper transcript (no captions) — high confidence; first ~20 min is farm/tree chat.

## Techniques

### Songwriting (Howard segment)
- **Write a simple "Motown" song, then remix the acapella and beef the chords up.** Their repeat strategy (Holding On, others): sit at a piano with Jimmy Napes, write a classic major/minor-chord song, then take the vocal and remix it — **melodies written over simple chords sound more interesting once you re-harmonize underneath them.** → songwriting; see [[Disclosure - Holding On ft. Gregory Porter Twitch Breakdown]].
- **Sample your *own* song** — "Boss" sampled the chorus of another (slower, unpitched) song Guy had written; lifting an acapella and re-scoring under it is a recurring move. → [[Sampling and Sound Selection]].
- **Chords are the root** — Howard won't change chords late ("a whole new flavor"); the mood and even the lyric flow from the chord. Latch is a 6/8 triplet-feel dance record (rare — chasing the Tears for Fears "Everybody Wants to Rule the World" lineage). → songwriting.

### Sidechaining (the standout)
- **Trigger every sidechain from a *metronome beep*, not the kick.** Because kick length is heavily automated (short vs long), keying off the kick gives inconsistent pumping; a separate constant beep gives full control over the pump depth. → [[Sidechaining]].
- **Beat UAD latency with multiple delayed trigger tracks.** UAD plugins run off the interface, so there's round-trip latency (~50 ms); to sidechain a bus that sits behind several UAD plugins, duplicate the trigger beep and delay copies (sometimes 5) so the key lines up. → [[Sidechaining]].

### Drums
- **Drum bus = compression → tape (control with saturation, so the kick squashes the hats/cabasa) → [[Oxford Inflator]] → light limiter.** Kept *clean, out of the red* here — Fatoumata's voice is soft/floaty and didn't want a distorted kit; "just looking for glue." EQ the top-end harshness *inside* the Inflator (transparent). → [[Compression Staging]], [[Saturation and Distortion]].
- **Big Kick synth kick, 4–5 layered** (sub layer + a top layer down a separate channel: comp/overdrive/EQ/reverb). 808 hats **recorded live jamming on a real 808**; a **909 hat loop is the track's real driver** ("immediately house territory"); 909 snare pitch-riser done by hand on the 808. → [[Kick Design]], [[2 Drums Group|Drums]].
- **Record real claps and pan *every angle*** — 9 clap layers panned full-L/R, medium-L/R, slight-L/R, center-L/R, center — "every angle covered in the stereo field"; clicks the same. → [[Width and Stereo]].

### Bass (3 layers)
- **Add a tiny "attack layer" for finger-noise punch** — under two bass guitars + a sine sub ([[Repro-1]]), a little **kick-like pitched bleep** gives the initial attack "as if you compressed it harder, without compressing." Comp the bass guitar with a **DBX 160** ("attacky, gives the finger noise"). → [[1 Digital Bass Track|Digital Bass Track]], [[Compression]].
- **Bass sparkle/width:** [[Decimort 2]] bit-crushers (noise + a frequency on top), iZotope Vocal Doubler (super-wide, 1% chorus), Echo Boy delay (top-end only). Sine sub: roll off <20 Hz, cut ~100 Hz where the bass guitar already lives. → [[1 Digital Bass Track|Digital Bass Track]].

### Synths
- **Dirty a clean plugin polysynth with [[Decapitator]] on the way *in*** — the [[Poly6]] chords go in hot "because it wasn't recorded through a desk"; add dirt to make a soft-synth "a bit worse / a bit real." → [[Saturation and Distortion]].
- **Velocity → *filter*, not volume** — on the Poly6 chords, MIDI velocity drives the filter cutoff for expression. → [[Automation]].
- **~10 automation lanes on one synth** (release, EQ builds, Valhalla + H-delay builds) to bring it to life; in the "crazy section," layer ESP + Juno + **Diva** + Prophet, each panned/automated *slightly* differently (depth + rate of pan) so nothing loops identically. → [[Automation]].
- **The Disclosure formula:** **Juno-106 / [[Poly6]] + Transient Master + Valhalla + H-delay + [[Ring Shifter]]** = the sound. → [[Sound Selection Guide]].
- **Monotribe / Monotron as the build-up machine** — analog ribbon through a loaded delay/reverb, unique every time (vs a canned riser sample). → [[Sound Selection Guide]].

### Vocals (Fatoumata Diawara)
- **Use Melodyne to *rewrite the melody*, not fix tuning** — her tuning was great; Howard changed the key (to the relative minor), so Melodyne re-placed the notes that no longer fit the new chords. Melodyne for fixing/re-melodizing; auto-tune only as a stylistic/tracking choice. → [[Pitch and Formant]].
- **Watch low-mid buildup on stacked BVs** — three of her at once pile low-mids fast; the main BV move is cutting low-mids (Tube-Tech → shelf + resonance notches → Saturn for tube shine on an unknown recording chain → de-ess). Reinforces [Birthday](https://youtu.be/b-6x_4XRwOQ). → [[Masking and Carving]].
- **[[Little AlterBoy]] a touch of octave-down on every vocal** (adds up across 3) + an **octave-up automated into the chorus half** for a lift. → [[Width and Stereo]].
- **Vocal bus:** Waves CLA (glue) → Decapitator on Punish *backed off in the mix* (push hard for harmonics, then blend down) → EQ + a separate filter (ProQ automation) → Gem Dopamine (had it, didn't need it — enough air) → stereo *unlinked* de-ess → **Maag EQ4 for air** (owns the real 500-series one) → Saturn → [[Soothe2]] (~77%, "let it do its thing, then dip till you barely hear it") → Echo Boy → Valhalla → post-reverb/delay dynamic EQ → chorus → sidechain. → [[2 Main Vocal Group|Main Vocal Group]].
- **Vocoder as a constant-level synth** — send the lead to a muted bus, set that as the vocoder's sidechain input, play the chords ([[Poly6]] logato carrier), and **compress the vocoder *hard*** so it's a constant pad (the real vocal carries the feel/dynamics) + overdrive + H-delay + Valhalla + chorus + roto-cab. → [[Modulation]].

### Arrangement & mixing knacks
- **Odd-bar-count drops** — hold the drop 2 bars past where the ear expects it (past bar 9, then even longer) to build tension and "make them wait." → [[House - EDM]].
- **Dynamic EQ = static + dynamic on the *same* band (Pro-Q 3) for a double-whammy** — a fixed −10 dB cut *plus* a dynamic −5 dB that reacts to level; static changes tone permanently, dynamic responds to the sound's volume. → [[Masking and Carving]], [[EQ]].
- **Master out (standard Disclosure):** SSL G-bus (~2 dB), tape (not near the red), The Drama (~1–2 dB), Soothe, Inflator; **EQ left as a bypassed guide** to hand the mastering engineer. → [[Master Chain]].

## Routed to
- Palette: [[SUB Slot]], [[BASS Slot]], [[BED Slot]], [[LEAD Slot]], [[AIR Slot]]
- Techniques: [[Sidechaining]], [[Masking and Carving]], [[Width and Stereo]], [[Automation]], [[Compression Staging]]
- Effects: [[Saturation and Distortion]], [[Pitch and Formant]], [[Modulation]], [[EQ]], [[Compression]]
- Plugins: [[Decapitator]], [[Poly6]], [[Oxford Inflator]], [[Soothe2]], [[Decimort 2]], [[Little AlterBoy]], [[Ring Shifter]]
- Chains: [[1 Digital Bass Track|Digital Bass Track]], [[2 Main Vocal Group|Main Vocal Group]], [[2 Drums Group|Drums]] bus, [[Master Chain]]
- Sound Selection Guide: the Disclosure formula, Monotribe build-ups, live-jammed 808 hats
- Vintage: [[Roland TR-808]], [[Roland TR-909]], [[Roland Juno-106]]

## Source
- [Disclosure - HOWARD IS HERE! + Mali Mali Breakdown (Twitch Production Tutorial)](https://youtu.be/gCfU5Cq9WU4) · Disclosure · 3:32:32
- Transcript: [[Disclosure - Howard Is Here + Douha (Mali Mali) Breakdown (transcript)]]
- Transcript source: **Whisper (base)**, no captions · confidence high (title/song = "Douha (Mali Mali)"; Whisper renders it "Marley Marley").
