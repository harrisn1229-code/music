---
type: chain
aliases: ["Drums Kick Track"]
title: Drums Kick Track
chain_type: track
family: drums
source: digital
routing: Drums Kick → Drums Group → Drums Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Transient Master, FETish, kHs Clipper]
status: default
tags: [chain, drums, track]
---

# Drums Kick Track

**Role:** The kick — anchor of the groove. Sample selection is 80% of the job; the chain sharpens what the sample already is.

**Chain philosophy:** EQ → transient → comp → clip. Transient shaping before compression (shape the hit, then level it); clipper last to shave the peak for loudness.

## 1 — Sound Selection

- **Selection IS the recording step** — audition in [[XO]] until it knocks raw. If the kick needs heavy processing to hit, swap the sample: pick crunchy, don't manufacture crunch.
- 🎬 **Or synthesize it** — Disclosure build kicks from a kick-synth (Ultrabeat / BigKick / Kick 2) and **tune the fundamental to the song key** — full method in [[Kick Design]] — [Latch](https://youtu.be/u-0Q41XB7U4) / [Waterfall](https://youtu.be/sL5CG444qwQ).
- 🎬 **The "all-knock" kick** — energy ~100 Hz, "nothing at 50 Hz" (old UK garage) — for when a bendy sub or 808 already owns the [[SUB Slot]] and the kick only needs to knock through the [[BASS Slot]] — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8).
- 🎬 **[[LinnDrum]] click layered low on a dead kick** — "use it for the click, not very loud" — attack layer only — Disclosure, [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A).
- 🎬 **Or skip the kick entirely** — modern trap often runs an 808 with enough front-end attack alone; audition a harder 808 before adding kick + duck — Kenny Beats, [808 & Kick](https://youtu.be/4iAKvWWlCvY).
- 🎬 **A live-tracking-stage version of "layer two":** a physically distinct 28" marching band bass drum set up in front of the main kit kick and damped with blankets over the top, for character — mic'd with an NS10 monitor driver (reversed as a mic) + D12 on the front head for the tonal split, then a subtle sample layer blended in on top via a Logic drum-replacement plugin ("Trigger" per the transcript, name uncertain — [[Plugin Wishlist]]). Full mic/damping detail on [[Drum Mic Technique]]. → [[Drum Mic Technique]], [[Kick Design]], [[Layering and Stacking]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]

## 2 — Programming Best Practice

- **Layer two:** a punchy sub kick + a kick with a hat/click baked in, and **nudge the punchy one a hair ahead** so its transient leads — the "fake compression" move (see [[3 Drums Bus|Drums Bus]]) — Disclosure.
- **Trap (kick + 808 both present):** don't put a kick on *every* 808 note — copy the 808 pattern to the kick, then delete most of them, keeping kicks only on hits that deserve emphasis.
- **Kick + 808 CAN hit together — sidechain is a choice, not a requirement** — when they fight, fix sample pairing (kick attack matching the 808), timing offset, and masking cuts first — Kenny Beats, [808 & Kick](https://youtu.be/4iAKvWWlCvY) → [[Sidechaining]].
- **The kick owns sub-100 Hz** — hard low-cut the sub-100 junk out of everything that isn't kick/808 (guitars, keys, even hats): the instruments sound identical, the low end gets clean, the beat takes more level — Kenny Beats → [[Masking and Carving]].

## 3 — Source → Ableton (UAD front end)

Optional analog pass when a sample feels sterile — UAD plugins acting as the console input, printed to audio:

- 🎬 *From video:* **parallel-distorted kick** — duplicate the direct/close kick to a second channel, run it through a guitar-distortion-pedal-style stage (Nick Launay uses a hardware SansAmp; owned stand-in [[Decapitator]] or [[Devil-Loc Deluxe]]), and blend under the direct signal for thickness — a named repeatable trick, not a one-off. Full recipe on [[Parallel Processing]] — Mix with the Masters (Nick Launay), [[Parallel distortion by Nick Launay]].
- 🎬 *From video:* **tuned parallel-distorted kick, variant with a note.** Same SansAmp-duplicate idea, but driven for a musical NOTE instead of pure thickness: a very narrow, sweepable EQ tunes the distorted low end to the song's key ("I like to keep things musical"), then a gate (Drawmer DS201; owned stand-in [[Gate]]) shapes the note's length before it's blended under the clean, clear-topped close mic. Full recipe on [[Saturation and Distortion]] (effect) and [[Gate]] — Mix with the Masters (Nick Launay), [[Mixing Nick Cave & The bad seeds - Nick Launay]].

### 1. [[UAD Neve 1073]] — Preamp plugin
- Light iron drive · ~0 VU

### 2. [[UAD UA 1176LN]] — Compressor
- 1–2 dB on peaks, or skip on one-shots

### 3. [[UAD Pultec EQP-1A]] — EQ
- The boost+atten @ 60 Hz trick for weight · print

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Shape
- HPF 25–30 Hz · define the thump (boost or notch ~50–60 Hz, wherever this kick's fundamental is) · cut box 250–400 Hz · click +1–2 dB @ 3–5 kHz if it needs attack definition
- 📖 *From book:* trap/808 alternative HPF — **40–60 Hz** (not 25–30) when an [[Bass Design|808]] owns the sub outright and this kick only needs knock; thump shelf **80–100 Hz**, snap **2–4 kHz**, click band **8–10 kHz** (printed as a "notch," almost certainly meant as a boost — see the caveat on [[Kick Design]]) — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]
- 🎬 *From video:* if the kick reads "too loud and too quiet at the same time" with the low end already sitting right, the fix is usually a missing beater/attack transient, not more low end — add **1–3 kHz** presence for the "smack" of the beater hitting the head, A/B'd on/off before touching anything else. → [[TRANSIENT Slot]], [[Kick Design]] — Andy Wallace (Mix with the Masters), [[Mixing Avenged Sevenfold - Andy Wallace]]
- **Why:** Decide the kick's fundamental *now* — the bass carve ([[1 Electric Bass DI Track|Electric Bass DI Track]]/[[1 Digital Bass Track|Digital Bass Track]]) is built around it.

### 2. [[Transient Master]] — Punch
- Attack +10–30% · sustain to taste (down = tighter, up = roomier) · trim output — added attack raises peaks
- **Why:** Transient designers add punch without compressor pumping — level-independent, works on every hit equally. Attack = a **depth knob**: more = toward your face, less = sits back.

### 3. [[FETish]] — Comp (optional)
- **Ratio 4:1** (②) · **Attack slow (~2, knob left)** (③ — lets the beater click through before clamping) · **Release fast (~6)** (④ — recovers before the next hit) · **HPF engaged** (⑤ — so sub doesn't over-trigger the detector) · **~2 dB GR** · **Mix 100%** (⑦) · **Output** to make up (⑧)
- **Why:** Only for uneven kicks (live or velocity-varied) — evens hit-to-hit level without dulling the transient. A consistent one-shot can skip this entirely.

### 4. [[kHs Clipper]] — Clip
- **Input to shave 1–2 dB off the peak** (① — drive to taste) · **Hard** (②) · enable **oversampling** (⑤) to hold true peak on the shaved transients
- **Why:** Clipping the transient trades inaudible peak for real loudness headroom — the modern hip hop/EDM standard, and why the drum-bus limiter won't have to work as hard. *(Owned substitute for Gold Clip Track — same transient-clip job.)*

## 5 — Track FX (optional)

- Usually nothing — kick character was decided at selection. Release automation for section energy (the [Never Enough](https://youtu.be/lGopQwQo9Ag) short-kick trick: ~120 ms with release opening up) lives here when used.

## 6 — Bus / Send FX (optional)

Routing: **Drums Kick → [[2 Drums Group|Drums Group]] → [[3 Drums Bus|Drums Bus]] → [[Master Chain]]**.

- **This track is the sidechain trigger** for [[Kickstart 2]]/duck sends on four-on-floor — better: split to a **dedicated inaudible trigger track** so added syncopated kicks don't stutter the pump ([[Sidechaining]]).
- No reverb, no width — the kick lives center and dry.

## Variations

- **Trap:** kick keeps the click + 60–100 Hz knock, HPF 45–50 Hz so the 808 owns the sub — layered low end needs strict lanes. End 808 patterns with a velocity-0 note so tails don't carry.
- **Four-on-floor EDM:** more Transient Master attack; trigger duty as above.

## From books

- **Kick EQ starting points, and one printed contradiction worth knowing about.** Low cut **40–60 Hz** (rumble — the trap/808 alternative to this chain's 25–30 Hz HPF) · low shelf **80–100 Hz** for thump · boost **2–4 kHz** for snap (this chain's own "click +1–2 dB @ 3–5 kHz" is the same move) · a band at **8–10 kHz** for click, printed as a **notch** despite "for click" being its stated reason — read as a boost, or as a narrow notch for a clicky resonance. Compare Lophiile's opposing rule above: don't low-pass the kick's top off, shelf the lower-highs down instead. See the inline 📖 line in §4 above. → [[Kick Design]], [[EQ]], [[Masking and Carving]] — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]

## From videos

- **Diagnose "too loud and too quiet at the same time" as a missing beater/attack transient, fixed by boosting 1–3 kHz rather than touching the low end.** Andy Wallace, with zero upper-range EQ applied yet: "the too loud component can happen because when you have the low end feeling where it should be, you're not getting enough smack on it." See the inline 🎬 line in §4 above. → [[Kick Design]], [[TRANSIENT Slot]] — Mix with the Masters (Andy Wallace), [[Mixing Avenged Sevenfold - Andy Wallace]]
- **A tuned variant of the parallel-SansAmp kick trick: the distorted low end is deliberately tuned to the song's key and gated for note length, then blended under a clean close mic.** Nick Launay, on a Nick Cave kick that was already good on its own: "I want it to have a little bit more clarity in the top end, so I'll get that from the close mic... and I usually tune that note to the song because I like to keep things musical." Full recipe with the Drawmer DS201 gate on §3 above. → [[Saturation and Distortion]] (effect), [[Gate]], [[SUB Slot]] — Mix with the Masters (Nick Launay), [[Mixing Nick Cave & The bad seeds - Nick Launay]]
- **A dull, "cardboard"-sounding raw bass drum fixed by layering in a sample — no EQ/compression chain shown, just the added layer.** Bob Clearmountain, A/B'ing before/after on Squeeze's "The Knowledge": "that's the original bass drum, a bit dull, it sort of sounds like cardboard. I add that in and it just adds a bit of punch to it... a little point to the bass which is nice." → [[Kick Design]], [[Sound Selection Guide]] — Mix with the Masters (Bob Clearmountain), [[Bob Clearmountain's mixing techniques]]
- **A named, repeatable parallel-distortion trick: guitar distortion pedal (SansAmp) on a duplicated kick channel, blended under the direct mic for thickness.** Nick Launay: "that trick I've explained before on other Mix with the Masters sessions" — confirming it's a standing go-to, not improvised for this session. Same shape reused one drum over on the snare (Distressor, low end only — see [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]]). No exact drive/blend amount given. → [[Parallel Processing]], [[Saturation and Distortion]], [[Drum Mic Technique]], [[Plugin Wishlist]] — Mix with the Masters (Nick Launay), [[Parallel distortion by Nick Launay]]
- **"Oliver Power Tools Vol. 3" (Splice) chosen specifically for a disco-poppy kit character, reused twice in the same beat — once for the main kick/hat foundation (a 4-step kick fill), and again later for the snare layer.** Genre-appropriate kit choice named as the reason for reaching for it, ahead of any processing. → [[Sound Selection Guide]], [[Rhythm and Groove]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **"My Hi" kick is two full layers plus a clicky top-end layer, stacked over an already kick-heavy garage loop:** one kick tuned for punch/attack (low end mostly rolled off), a separate sub kick underneath for the felt weight and low-end "collapse," and a third short/clicky layer riding on top purely for transient click — three lanes doing three different jobs rather than one kick doing everything. → [[Layering and Stacking]] — Disclosure (Sol State), [In The Studio: Disclosure "My High" breakdown [Twitch]](https://www.youtube.com/watch?v=hOJafQO-LyY)

- **The "car EQ" kick curve + 1k dip** — shelf (don't filter) the lower-highs, filter only the extreme top, ~1 kHz dip for boxy kicks; mono the sample; shorten the low tail for punch — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc) & [Make Your Drums Slap](https://www.youtube.com/watch?v=v4ZhwlhF5yE)
## Sources

Disclosure — [Latch](https://youtu.be/u-0Q41XB7U4) · [NO CAP](https://youtu.be/kz5dmb3QdI8) · [Making Beats + Talk](https://youtu.be/1GhqAf9lc3A) · Kenny Beats — [808 & Kick + Subtractive EQ](https://youtu.be/4iAKvWWlCvY) · [[Kick Design]] for synthesis
