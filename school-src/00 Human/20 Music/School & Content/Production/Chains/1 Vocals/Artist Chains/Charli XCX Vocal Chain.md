---
type: chain
title: Charli XCX Vocal Chain
reference: Charli XCX / A.G. Cook (360, Von dutch, Vroom Vroom, Track 10, Everything is romantic)
chain_type: style
family: vocals
tags: [chain, vocal, style, charli-xcx, hyperpop]
---

# Charli XCX Vocal Chain

**Reference/vibe:** the voice as plastic — hard Auto-Tune worn as jewelry ("I drink and I smoke and I use Auto-Tune"), distortion for attitude, **formant shifting as an expressive tool** (A.G. Cook shifts formants to make lines read younger/older without pitch change), all presented bone-dry and abrasively upfront over minimalist club production punctuated by abrupt silences.
**Signal source:** [[Neumann TLM 102]] close and confident — delivery is *spoken-bratty* as much as sung; attitude over accuracy (Auto-Tune will handle accuracy anyway).

## Step 1 — Record (UAD Console)
1. **UAD Neve 1073 (Unison)** — driven a little (the edge starts here)
2. **UAD 1176LN** — 4:1 fast, 3–4 dB
3. **UAD Pultec EQP-1A** — bypass

## Chain overview
Hard tune → formant play → crush → distort → dry presentation. Brat-era vocals are *more* processed than Travis but *less* spacious — the effects are on the voice itself, not the room around it.

## Step 2 — Process (Ableton)

### 1. [[Auto-Tune Pro]] — Jewelry-grade tune
- **Retune 0, Humanize 0**, Classic algorithm — the snap is celebrated. Automate key/scale changes for deliberate warble moments.

### 2. [[Little AlterBoy]] — Formant character (the A.G. Cook move)
- Formant ±2–4 (pitch untouched): up = brattier/younger, down = darker/detached — **automate it per section or per line** ("Everything is romantic" style). Print bold choices as separate takes/layers.

### 3. [[Pro-C 2]] — Flatten hard
- 6:1, **5–8 dB** — zero dynamics; the voice becomes a synth stab.

### 4. [[Decapitator]] — The attitude
- Style E, Drive 4–6, Mix 40–60%, Punish for the shouted lines — audible, unapologetic distortion (this is an *insert*, not a send — the dirt IS the tone).

### 5. [[Pro-Q 4]] — Bright plastic finish
- HPF 100–120 · presence 3–5 kHz forward · air up — hyperpop vocals are bright to the point of glassy (opposite of the Travis hood).

## Step 3 — Effects (dry, then extreme — no middle)
- Default state: **dry, center, loud.** The minimalism (A.G. Cook mutes everything, leaves silences) makes the dry voice enormous.
- The extremes, automated in for single words/bars: pitch-throw an entire line ±12 ([[Little AlterBoy]]), [[Delay Send Other]] feedback spikes into self-oscillation as transitions, one sudden cavernous [[Reverb Send Long]] word, stutter/retrigger edits (chop the audio itself).
- Stacks: unison clones (same take duplicated with different formant/distortion settings) rather than re-sung doubles — the *clone* aesthetic, deliberately inhuman.

## Vocal arrangement

| Section | Lead | Behind it |
|---|---|---|
| Verse | **spoken or half-sung**, retune 0, bone dry | nothing |
| Pre | same, formant shifted up | one clone |
| Hook | hard-tuned, sung | 4–6 clone stacks, formants split high/low |
| Break | *silence* — the vocal stops mid-phrase | — |

**The move — spoken verse against tuned hook.** That's the dynamic, and it's the whole vocal arrangement. Formant automation does what a key change would do elsewhere: a line reads younger or older with no pitch change.

**The silence is a part.** A.G. Cook's mute is an arrangement event — see [[Dance Pop (Dua Lipa, Charli XCX)]] § Arrangement. Write it in deliberately rather than letting a section just end.

**Stack count: 1 → 6, all clones of one take.**

## Notes / variations
- **Pop lane (Track 10 / party 4 u):** keep the hard tune, drop distortion, add wash — hyperpop's soft inverse.
- **Club lane (Vroom Vroom / 360):** distortion forward, sidechain the vocal itself to the kick, spoken-word verses barely tuned against hard-tuned hooks (the contrast is the writing).
- Production context: [[EDM Subgenres]] + [[Modern Pop]] arrangement discipline — mute more than you add.

**Sources:** [MusicRadar — the theory behind Brat](https://www.musicradar.com/music-tech/recording/i-drink-and-i-smoke-and-i-use-auto-tune-but-whats-the-music-theory-behind-charli-xcxs-brat) · [A.G. Cook vocal processing breakdown](https://www.youtube.com/watch?v=WnQ9Hr_YS2U) · [Noise Chest — 360 remake](https://noisechest.com/articles/charli-xcx-360)

## From videos — Music, Fashion, Film era (Tape Notes) — a deliberate pivot away from the Brat sound above

Charli, A.G. Cook and Finn Keane frame this album explicitly as "the polar opposite" of *Brat*'s hard-tuned, hyperpop-plastic vocal approach — rawer, more "bendy" and live-feeling. Newest-first:

- **Vocal moving in and out of tune within a song, for a raw-vs-classic contrast — the direct inverse of the Brat-era "always hard-tuned" default above.** "Rock Music" alternates a loosely/barely-tuned, live-feeling delivery against sections of classic hard Auto-Tune, rather than committing to one setting throughout. *(general starting point — no specific Retune/Humanize values given)* → [[Vocal Tuning]] — Tape Notes, [[TN 185 Charli XCX, A. G. Cook, Finn Keane - Full Video Episode]]
- **AlterBoy's Robot/Quantize mode for flat, static backing textures, not the formant-automation move above.** On "Card Declined," nonsense-syllable backing vocals run through AlterBoy's robot mode read as "static one-note things," not real harmonies — a different AlterBoy use case from this chain's usual per-line formant automation. → [[Little AlterBoy]] — [[TN 185 Charli XCX, A. G. Cook, Finn Keane - Full Video Episode]]
- **Crunched, hard-panned backing vocals (Waves Butch Vig Vocals) promoted to lead at a song's end, artifacts deliberately left in.** On "Rock Music," heavily distorted BVs sit hard-panned for most of the song, then become the loud lead at the very end — extra digital grit from AlterBoy/Butch Vig is kept rather than cleaned up, with only light compression for range. Explicit philosophy: "we're leaning into all of that sort of extra dirt... doesn't really matter [if it's] digital or analog." → **Waves Butch Vig Vocals**, [[Little AlterBoy]] — [[TN 185 Charli XCX, A. G. Cook, Finn Keane - Full Video Episode]]

## From videos — Ian Kirkpatrick ("Move Me", Crash era)

The documented lead chain from Ian's Move Me breakdown (tracked on the SM7 in-session; Charli "backs off the mic when loud — a real-life compressor"). Order: **Squasher** (light) → **mostly-dry SSL bus comp** (parallel, dry/wet to dodge phase) → **Soothe 2** (~1k–8k thrash; soft-cranked vs hard-subtle react differently) → **FabFilter Pro-C2** (peak-reduction *automated* as dynamics) → **gem Dopamine** (air back post-de-ess) → **Pultec Pro** (cut ~30 Hz, boost 16k). Newest-first:

- **Automate the compressor's peak reduction for a "naked" moment** — pull reduction back on a lyric so the vocal jumps out; lower loud words into the comp so they don't over-trigger. → [[Compression]], [[Automation]] — [Move Me Full](https://www.youtube.com/watch?v=22odAiV5I5w)
- **Mono→stereo-double dynamic** — verse mono/intimate, hook stereo double (spatial contrast, not volume). → [[Width and Stereo]] — [Charli Vocal FX](https://www.youtube.com/watch?v=ByPr9CMVnIg)
- **Hide synths from the vocal word (PadShop granular, recorded live not printed)** + octave-up **Little AlterBoy** (drive maxed) as a hook-escalation layer; **double-time individual words** on the looped last chorus. → [[PadShop]], [[Little AlterBoy]], [[Ear Candy and Hiding Synths]] — [Charli Vocal FX](https://www.youtube.com/watch?v=ByPr9CMVnIg)
- **Keep the tuning artifact** — a Melodyne squeak became the song's hype "woot." → [[Melodyne]] — [Charli Vocal FX](https://www.youtube.com/watch?v=ByPr9CMVnIg)
