---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=RVJ5fOlLy4w
channel: loner
duration: "00:09:24"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, r-and-b, trapsoul, sampling, vocal-chain, guitar, bass-design]
briefed: backlog
---

# the secrets behind bryson tiller's 'trapsoul' sound!?

![](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=RVJ5fOlLy4w)

## Synopsis

loner reverse-engineers three eras of Bryson Tiller's sound by building three beats from scratch, one inspired by each song, rather than literally sampling the originals. The throughline for all three is Tiller's producer Foreartec (Timothy "Foreartec" Thomas), and the video's real thesis is **make your own sample instead of clearing one** — record a live element (guitar, piano, synth), process it as if it *were* a decades-old sample (heavy modulation, room verb, filtering, pitch moves), then treat the result exactly like a chopped loop: reverse it, chop it, run the whole bounced stem through an ambience/multi-effect pass before drums go on. **Song 1 (Exchange, off *Trap Soul*, 2015)** builds a from-scratch R&B guitar sample (strummed body layer + arpeggiated top layer, processed differently and layered), a present-but-filtered lead vocal (Little AlterBoy pitch-up → reverb/EQ/delay → sample-rate reduction for the signature "filtered out" Tiller vocal), a Rhodes fill note to resolve the loop, and a whole-sample ambient multi-effect pass before the drums (two snares — one straight, one for "bounce" — bass, hats with deliberately cut note-tails for space, kick, open hat). **Song 2 (Next to You, off *Anniversary*, 2020)** is a vintage-piano-plus-synth sample: a heavily compressed, reverb'd, EQ'd, flanged vintage piano chord progression, a reversed-and-pitched-up-an-octave synth counter-melody (Technicolor bank) run through a shaper/reverb/EQ/half-time chain, then a lead vocal (AlterBoy → reverb/EQ/delay) plus a second chopped vocal layer, drums, and a synth sub. **Song 3 ("Outside")** is a reversed/chopped ambient guitar sample re-pitched from a single chord, run through a guitar-amp-with-phasing-and-modulation → half-time (mix ~70%) → EQ → shaper box → reverb chain, plus a vocal top-line processed with AlterBoy/flanger/half-time for a "chopped and screwed" feel and then a shaper box that "completely changed" the vocal's character; drums blend modern and old-school elements, and the standout is a from-scratch R&B bass built in Serum (sine wave, short plucky envelope, LFO mapped to coarse pitch for a fast downward pitch-drop) as a stand-in for a sampled 2005 Yin Yang Twins bass, finished with a snap, shaker, two modern hi-hats, three percussion layers (ride, bongo, one more), and an 808 for extra low end.

## Techniques

### Song 1 — "Exchange" (Trap Soul, 2015)

- **Build the sample instead of finding it.** Rather than literally sampling KP & Envyi's "Swing My Way" the way Foreartec did for the original, record a live guitar performance and process it to *sound* like a decades-old soul/R&B sample — this is the video's core method, reused across all three songs. → [[Sampling and Sound Selection]]
- **Two guitar takes of the same chord progression, processed on divergent chains, then layered.** Take 1 strummed (the body/full layer), Take 2 arpeggiated (a lighter top layer) — chop both and stack them rather than relying on one guitar take to do everything.
  - **Strummed/body layer chain:** preamp *(for distortion, not clean gain — general starting point: light-to-moderate drive)* → chorus → room reverb → EQ → a "shaper box" (likely Cableguys ShaperBox — unowned, see [[Plugin Wishlist]]). → [[Chorus-Ensemble]], [[ValhallaRoom]]
  - **Arpeggiated/top layer chain:** compressor → a guitar-amp plug-in ("stark" in the auto-transcript — name unclear/likely garbled, not confidently matched to an owned or wishlist tool) → room reverb → EQ. Deliberately processed lighter/brighter than the strum layer so the two chop-and-layer without mudding each other. → [[6 Guitars/1 Electric Guitar DI Track|Electric Guitar DI Track]]
- **Vocal kept present, not buried — light-touch chain, then a lo-fi filter pass as the signature move.** Little AlterBoy (pitch shift up) → reverb → EQ → delay, then the whole vocal bounced through **Edison's sample-rate reduction** (a Cakewalk audio editor) to get the muffled/"filtered out" texture that's a signature of Tiller's vocal sound on this era. Owned equivalent for the sample-rate step: **kHs Bitcrush**'s sample-rate control. → [[Little AlterBoy]], [[kHs Bitcrush]], [[Pitch and Formant]]
- **A short Rhodes ("roads" in the auto-transcript) fill resolves an otherwise-incomplete loop** — added specifically to bridge back to the first chord because the guitar+vocal loop didn't land back on the top of the progression cleanly on its own. A cheap fix for a loop that's "almost" a full bar.
- **Whole-sample ambient multi-effect pass before drums go on**, mirroring what Foreartec did on the original Exchange sample: a multi-effect plugin combining filter + delay + modulation run over the *entire* bounced sample (guitar + vocal + Rhodes together) for a diffuse, weird, ambient character that's hard to pin to one setting — described as giving "a weird, like, ambient sound." Unowned tool that matches this description: **Sugar Bytes Effectrix** (multi-effect sequencer with filter/delay/mod modules). → [[Plugin Wishlist]]
- **Drums:** two snares (one main, one dedicated "for bounce" — a second snare layer specifically for groove feel rather than tone); bass; hi-hats with the **ends of the notes cut off** deliberately (a gate/clip move, not a sample choice) for a "spacey," more open-feeling groove — matching what Foreartec did in the reference clip; finished with a kick and an open hat.

### Song 2 — "Next to You" (Anniversary, 2020)

- **Vintage-piano sample, built from a live take, not a sample pack.** A chord progression played to evoke "Timeless Interlude" / "Keep Doing What You're Doing" — vintage upright/electric piano tone, emotional voicings — chain: heavy compressor → room reverb → EQ → **flanger**, the flanger specifically called out as what pushes it into "real vintage" territory. → [[Phaser-Flanger]], [[ValhallaRoom]]
- **Reversed, pitched-up synth counter-melody layered against the real piano** — Tiller/Foreartec's habit of combining synth texture with a real instrument. Play a counter-melody with a lead patch from the **Technicolor** bank, bounce to audio, **reverse it**, pitch it **up an octave**, then process: shaper box → reverb → EQ → half-time (Cableguys ShaperBox + HalfTime — both unowned, see [[Plugin Wishlist]]).
- **Vocal: same light-touch chain as Song 1** — AlterBoy → reverb → EQ → delay for the lead — plus a **second vocal layer chopped from a separate recording** (not a duplicate of the lead take) layered underneath/around it for texture. → [[Little AlterBoy]]
- Drums, then a **synth bass** underneath (not detailed further in the transcript).

### Song 3 — "Outside"

- **Reversed/chopped/re-pitched single-chord guitar as the whole ambient bed** — rather than a full progression, take one chord from the guitar take, reverse and chop it, and **re-pitch just that one chord** to build the song's entire harmonic movement. A minimal-material approach: one performed chord stretched into a full progression via pitch, not more playing.
- **Guitar processing chain:** a guitar-amp plug-in that **adds phasing and modulation** (built into the amp sim, not a separate pedal stage) → **half-time**, mixed at **~70%** ("giving us both low and high end" — i.e. blended rather than fully committed, keeping some of the dry low end alongside the half-time-shifted high end) → EQ → shaper box → reverb.
- **Vocal top-line, processed for a "chopped and screwed" character:** AlterBoy → flanger → half-time — described as giving "a slower, almost chopped and screwed kind of feel" — then a **shaper box that "completely changed the sound of the vocals"** as the final, most transformative stage (the shaper, not the pitch/flange stage, is doing the heaviest lifting on character here). → [[Little AlterBoy]], [[Phaser-Flanger]], [[Plugin Wishlist]]
- **Sample-stage move reused a third time:** reverse the guitar/vocal sample and chop it for a vintage feel, plus separately process the **top-line melody** for variation (not identical processing to the main sample).
- **Drums blend modern and old-school elements** for the bounce/feel ("vinyls" combine modern and old-school drums) — not itemized further beyond the elements below.
- **From-scratch R&B bass in Serum, standing in for a sampled 2005 Yin Yang Twins bass** — the video's clearest concrete synth-bass recipe:
  1. Oscillator = **sine wave**.
  2. Amp envelope shortened to a **quick, plucky decay** (not sustained).
  3. Map an **LFO to the oscillator's coarse pitch** knob so the pitch **quickly shifts down** at the start of each note — the fast downward pitch-drop is what reads as "classic R&B bass" rather than a static sine sub.
  → [[Serum 2]], [[Bass Design]], [[SUB Slot]]
- **Percussion layer list:** snap → shaker (called out as *the* essential 2000s-R&B drum element) → two modern hi-hat sounds → three percussive layers (ride, bongo, one more unnamed) → an 808 on top for extra low end.

## Sound/sample selection notes

- **Reference song for the bass design: a 2005 Yin Yang Twins track** — the video doesn't name the specific song, but frames the Serum sine-wave/plucky-envelope/LFO-pitch-drop bass above as a from-scratch reconstruction of that record's bass sound. Worth digging up the actual Yin Yang Twins 2005 discography to identify the exact reference track before relying on this recipe as a literal match.
- **"Technicolor" synth bank** used for the Song 2 counter-melody lead patch — likely a factory/expansion preset bank name (unconfirmed which synth/vendor from context alone).
- **Foreartec's Exchange sample chain is the video's north star** — KP & Envyi "Swing My Way," heavily pitched/filtered/modulated rather than used raw; worth listening to the original Exchange alongside this breakdown.

## Routed to

- [[Little AlterBoy]] — Little AlterBoy technique bullet (Techniques)
- [[kHs Bitcrush]] — Techniques bullet
- [[ValhallaRoom]] — Techniques bullet
- [[Chorus-Ensemble]] — Techniques bullet
- [[Phaser-Flanger]] — Techniques bullet
- [[Serum 2]] — Techniques bullet
- [[Pitch and Formant]] — From videos
- [[Reverb]] — From videos
- [[Sampling and Sound Selection]] — From videos
- [[Sound Selection Guide]] — Drums/Bass sections
- [[Neo-Soul - Lo-fi]] — genre note
- [[6 Guitars/1 Electric Guitar DI Track|Electric Guitar DI Track]] — From videos + inline
- [[Bryson Tiller Vocal Chain]] — new artist chain, created from this video
- [[FX Chain System]] — Artist Chains registration
- [[Plugin Wishlist]] — Effectrix, Cableguys HalfTime

## Source

- Channel: loner
- Duration: 00:09:24
- Uploaded: 2022-12-13
- Transcript: captions, good confidence (spoken breakdown, no music-garbled sections beyond a couple of one-word gaps marked "foreign" in the auto-captions)
- Full transcript: [[the secrets behind bryson tiller's 'trapsoul' sound!? (transcript)]]
