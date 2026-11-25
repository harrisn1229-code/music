---
type: chain
aliases: ["Acoustic Guitar Track"]
title: Acoustic Guitar Track
chain_type: track
family: guitars
source: mic
guitar: Yamaha FG730S
mics: Neumann TLM 102 (12th fret) + Shure SM57 (body/bridge, optional 2nd mic)
routing: Acoustic Guitar → Guitar Group → Guitar Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD Teletronix LA-2A, UAD Pultec EQP-1A]
signal_chain: [Align Delay, RX Voice De-noise, Pro-Q 4, LALA, Soothe2, Pro-Q 4]
status: default
tags: [chain, guitar, track]
---

# Acoustic Guitar Track

**Role:** Mic'd [[Yamaha FG730S]] — strummed beds or fingerpicked features.

**Chain philosophy:** phase-align → de-noise → subtractive EQ → gentle leveling → resonance tame → sweeten. Acoustic guitar is a *subtractive* instrument in a mix — it covers the entire spectrum, so the job is removing what fights everything else, not adding character.

## 1 — Recording Setup

- **Guitar:** [[Yamaha FG730S]], fresh-ish strings — dead strings = dull takes no EQ fixes. Decide *before* setting up. **Source rule: instrument > mic > preamp.** No onboard pickup on the FG730S, so there's no DI option — this is a mic-only chain.
- **Mic 1 (always): [[Neumann TLM 102]] → 12th–14th fret**, 8–12" out, angled ~45° toward the neck/body joint. String detail + air without the soundhole boom (Beato's go-to single-mic spot). Shock mount, 48V on, no pop filter needed.
- 🎬 *From video:* independent validation of this exact spot — a large-diaphragm cardioid condenser (his Warm Audio WA-87 R2, same mic class as the [[Neumann TLM 102]]) landed by ear at ~45° off-axis, roughly 10" from the end of the fretboard, after physically moving the mic while playing the actual part rather than starting from a formula. His stated philosophy: "most of that is going to come from up here" (the playing), not the mic — don't chase a gear upgrade before the part itself is dialed in. — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
- 🎬 *From video:* a second, more aggressive close-mic option when boominess (not detail/air) is the problem — mic right by the **last fret**, not the soundhole, about **2½–3 inches away**: "I like to mic it right by the fretboard... I'm trying to eliminate some of the boominess from the body of the guitar... you're eliminating the possibility of extra boom." Closer and more fretboard-specific than the ~10"-off-the-fretboard-end default above; reach for this variant instead when the ~45°/10" spot is still reading boomy. A modern affordable mic recommended for the job: [[Shure KSM 141]] (~$600, combines an AKG 451's brightness with a Neumann KM 84's vintage voicing, 20 dB pad, switchable omni/cardioid) — "does a very lovely job on recording acoustic guitars, percussion, any of that stuff." — Eddie Kramer, [Eddie Kramer's story behind "All Along The Watchtower" by Jimi Hendrix](https://www.youtube.com/watch?v=N6m019pawms)
- **Mic 2 (optional, for the stereo-pair variation): [[Shure SM57]] → body/bridge**, aimed at or slightly behind the bridge — NOT straight at the soundhole (that's where the boom lives). Adds warmth under the TLM's detail.
- **Mic 3 (optional, room): [[Neumann TLM 102]] or [[Shure SM57]] at 2–3 ft**, for natural room tone rather than detail. Only worth it in a room you actually like — in an untreated space this captures the boxiness the close-mic advice above is designed to avoid, and reverb is cheaper. Blend under the close mic and add [[Reverb Send Room]] for depth. *(From Nate's own tracking notes, filed 2026-08-09.)*
- **Fake stereo without a second mic:** duplicate the mono close-mic take, hard-pan the copies L/R and delay one by **~10 ms**. Cheap width when only one mic was available — but it is a Haas trick, so **mono-check it**; see [[Artificial Double Tracking (ADT)]] for the version that survives a fold-down.
- **3:1 rule** when both mics are up: mics ~3× as far from each other as each is from the guitar. Polarity-check anyway (flip ø, keep the fuller low end) — see [[Phase Alignment]].
- **Room:** phone silenced, fan/HVAC off, window closed. If a scratch take sounds boxy, move 2–4" *closer* and thin the proximity warmth later with a low cut — don't back off into the bad room.
- **Monitoring:** [[Audio-Technica ATH-M50x]] closed-back — no click bleed into the mic.
- **Interface:** [[Universal Audio Apollo Twin MkII]], input gain set on the *actual part at performance energy* — peaks **−12 dBFS**, average ~−18 (see [[Gain Staging]]).

## 2 — Tracking Best Practice

The decisions that shape the mix later — pick the variation *before* pressing record and label clips with the [[Sound Palette]] slot (`BED` / `MIDS`).

- **Default answer: yes, double-track strummed parts. Never copy-paste a take** — the micro-timing/tuning differences ARE the width. Duplicated takes just get louder, not wider ([[Width and Stereo]]).
- **Takes discipline:** 3 takes per part max, then a listen-back; comp in Ableton rather than chasing one perfect take. Record path `AcGtr_<song>_<take>`.

**Variations — pick one:**

1. **Wide double (the modern default, strummed bed):** 2 full takes of the same part, TLM 102 only (mono each), panned **40L / 40R** (Live's pan runs 0–50 per side). Occupies the [[BED Slot]]; mix HPF's it ~120 Hz, so don't chase bass while tracking.
2. **"Four of everything" (dense pop/produced records):** 4 takes — **2 hard-panned 50L/50R + 2 at ~22L/22R** — fills the whole field instead of leaving a hole between hard-panned doubles. Straight from Disclosure's stems session ([[Disclosure - SSL SIX Mixing Al Green Stems]]). Vary take 3–4: capo up + higher chord voicings (the Beatles trick — same part, different octave color) so the layers stack instead of comb-filtering.
3. **Stereo pair, single performance (fingerpicked feature):** [[Neumann TLM 102]] neck + [[Shure SM57]] bridge, panned ~25L/25R "player perspective." One expressive take beats stacked takes when the part is the feature — flirts with the [[MIDS Slot]]; move the TLM 4" closer and drop gain 3 dB to keep transients clean.
4. **Mono center (sparse/folk):** one take, one mic, dead center. If the arrangement is voice + guitar, mono is *more* intimate — pan "like you're looking at a stage," not for width's own sake ([[Disclosure - SSL SIX Mixing Al Green Stems]]).
5. **Tape character layer (optional, any of the above):** print one extra take through the [[Sony TC-630]] loop (line out → tape → back in) — a hardware [[RC-20 Retro Color]] double to tuck under the clean takes.
   - 🎬 *From video:* treat this as a distinct, LATER, more consequential step than any in-the-box tape-modeling plugin already on the track — not a redundant extra. One documented session ran a deliberately "wonky" pre-EQ (mid scoop + shelf boosts, there specifically to provoke a bigger reaction out of the plugin stage) into an ITB tape-saturation plugin first, and only THEN moved to the physical tape print — described as "we are ready for tape" only once the plugin pass was already dialed in. The tape pass itself was praised for how it *compresses* the signal, on top of whatever the plugin stage did. His framing: "tape is commitment" — the plugin stage is like shooting flat log footage, the physical print is the color grade. **Budget time to manually realign the return** — tape bounces don't land back sample-accurately — and consider a match-EQ pass afterward ([[Ozone 9 Match EQ]]) if a pre-tape balance you liked needs to survive the print. See [[Committing and Printing]]. — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)

## 3 — Source → Ableton (UAD Console)

Printed on the way in via Console — conservative, because printed is forever. EQ comes *after* compression on the way in, desk-style ([[Disclosure - SSL SIX Mixing Al Green Stems]]).

### 1. [[UAD Neve 1073]] — Unison preamp
- Mic gain: lowest position that reaches level (the TLM 102 runs hot); output trim for −18 dBFS average, peaks −12
- EQ flat on the way in (high shelf +1 dB @ 12 kHz max if the guitar sounds dark at the mic) — the 1073's gentle iron adds body to acoustics
- **Alt:** [[UAD UA 610-B]] for a rounder tube flavor, or no Unison plugin for fully neutral.

### 2. [[UAD Teletronix LA-2A]] — Tracking compressor
- Comp mode · Peak Reduction for **≤3 dB GR on the hardest strums, never more on the way in** · Gain to unity
- The "one-LA" rule: threshold + gain only; hit it harder = higher effective ratio ([[Disclosure - Ultimatum Breakdown + Breakbeat]] — their reach-for on tracked guitar "for shine")
- **Alt:** [[UAD UA 1176LN]] (4:1, attack 3–4, release 6–7, 2–4 dB GR) when the part is percussive strumming rather than smooth fingerpicking.

### 3. [[UAD Pultec EQP-1A]] — Broad-stroke EQ
- Low ATTEN **2–3 @ 60 CPS** (rumble/boom out before the converters) · Low BOOST 0 · High BOOST 0–2 @ 12 KCS broad, only if the guitar sounds dark at the mic
- Leave real sweetening to Ableton where it's undoable.

🎬 *From video (if monitoring through Ableton plugins instead of Console):* buffer **128**, driver error compensation to ~0 ms, and arm a ghost **latency track** per mic — no plugins, monitor off, routed to a spare hardware out instead of the master; keep the ghost takes, they land on the grid (two mics = four tracks armed) — Kenny Beats, [Recording Without Latency](https://youtu.be/Gj4_IvHFn6g) → [[Latency-Free Tracking]]

## 4 — Ableton Initial Processing

Corrective, bounceable. [[Utility]] + [[mvMeter2nogpu]] meter sandwich at head/tail — ~0 VU (−18 dBFS) through everything.

### 1. [[Align Delay]] — Phase (two-mic takes only)
- On the [[Shure SM57]] body mic: **Unit = samples** (②), **start at 13 samples** (① — ≈4 in of 57-vs-condenser spacing @ 44.1k, ~3–4 samples per inch) and nudge while both mics play; keep whatever makes the low end fullest. **Check polarity flip first** — it's free, and if a flip alone nulls the comb you may need almost no delay ([[Phase Alignment]]).

### 2. [[RX Voice De-noise]] — Noise floor
- **Adaptive mode ON · Reduction 4 dB** starting point (range 3–6) · learn on pre-count-in room tone
- Condenser self-noise + room hiss is far quieter than amp hiss — go lighter than the electric chain's 6–10 dB
- **Why:** every downstream stage ([[LALA]], [[Soothe2]]) raises the floor with the signal — clean it before anything amplifies it.

### 3. [[Pro-Q 4]] — Subtractive EQ (Joe Gilder's "3 cuts + 1 boost")
1. **Rumble:** HPF **45 Hz, 24 dB/oct** always; move it up to **120–150 Hz, 12–18 dB/oct** in a dense mix
2. **Thump:** bell **−3 dB @ 150 Hz, Q 1.5** — the percussive down-strum "djembe" bump; boost to find it, cut to balance, don't delete it (it's the warmth)
3. **Plastic:** bell **−2.5 dB @ 650 Hz, Q 1.2** — sweep 500–800 Hz for the cheap/boxy buildup; a small cut opens both lows and highs ("grown-up smiley EQ — a smirk, not a smile")
4. **Air:** shelf **+1.5 dB @ 8 kHz** — pick sparkle that cuts a dense mix. Small; overdoing this is the classic tell.
- **Why:** acoustic covers the whole spectrum; these four target exactly what fights the mix. EQ sits *before* [[Soothe2]] so any brightening gets caught downstream ([[Disclosure - SSL SIX Mixing Al Green Stems]]).

### 4. [[LALA]] — Gentle leveling (or none)
- **Exposed part: bypass it.** ~90% of exposed acoustics sound better with EQ and NO compression — compression audibly squashes the harmonics.
- **Bed in a dense mix:** Peak Reduction for 2–3 dB GR (①), Comp mode (③), **Mix 100%** (⑤), makeup to unity (②)
- **"Butter compression" alternative (beds):** threshold all the way down, ratio crawled up from 1:1 to just **1.2–1.5:1**, attack **30 ms**, release **50 ms** — always-on ultra-shallow leveling, 5–6 dB of control with no grab-and-release pumping (Gilder)
- **Why:** opto/slow attack lets the pick through; fast heavy compression turns strumming into cardboard ([[Compression Staging]]).

### 5. [[Soothe2]] — Pick/string harshness
- **Depth 3 · focus 2–6 kHz** (pull the side bands down out of the way) · **Sharpness ~50 · Selectivity ~40 · Speed 50%**
- **Wet/dry ~75%** — the Disclosure master-bus trick scaled to a track: tame the spikes, keep the life ([[Disclosure - SSL SIX Mixing Al Green Stems]])
- Delta-listen: you should hear *only* uneven string zing, not the whole guitar
- **Why:** strummed steel spikes unevenly; dynamic taming beats a static cut that dulls the whole part.

### 6. [[Pro-Q 4]] — Sweeten
- Shelf **+1.5 dB @ 10 kHz** only if the part is featured · skip for background strumming
- Featured fingerpicked part: optional bell **+1 dB @ 5 kHz, Q 1** for fingertip detail.

## 5 — Track FX (optional)

Most acoustic parts want nothing here — character was decided at the mic.

- **[[RC-20 Retro Color]]** — lo-fi bed under a produced track: Wobble 10–15%, Noise off, Distort 5%, MIX ~30%. Use it as an effects box, not a crusher ([[Disclosure - 'Never Enough' Twitch Breakdown]]).
- **[[Chorus-Ensemble]]** — last-resort width on a single take that *should* have been doubled: Amount 15%, Rate 0.3 Hz, Dry/Wet 20%. A real double (§2) always beats this.

## 6 — Bus / Send FX (optional)

Routing: **Acoustic Guitar → [[2 Guitar Group|Guitar Group]] → [[3 Guitar Bus|Guitar Bus]] → [[Master Chain]]** — carve against other groups happens at [[2 Guitar Group|Guitar Group]], tape/glue finish at [[3 Guitar Bus|Guitar Bus]].

- **[[Reverb Send Room]]** — send **−15 to −12 dB** (modest); acoustics carry their own room already
- **[[Reverb Send Long]]** — fingerpicked features only, send to taste from −20 dB, pre-delay 20–40 ms so the pick stays upfront
- **[[Delay Send Slap]]** — rare; a 60s color on mono-center folk parts
- **[[Width Send]]** — skip it: real double-tracking (§2) beats artificial width on acoustics, and fake-wide acoustics fall apart in mono.

## Variations (mix-stage quick recipes)

- **Strummed bed under full band:** HPF 150 Hz, LPF ~10 kHz, LALA 3–5 dB GR, pan per §2 option 1–2
- **Solo/fingerpicked feature:** stereo pair (§2 option 3), minimal EQ, [[Reverb Send Long]] to taste

## From videos

- **Close-mic right by the last fret (not the soundhole), ~2½–3" away, specifically to eliminate body boominess — a second, more aggressive close-mic option than this chain's default §1 spot, for when boominess itself (not detail/air) is the problem.** Eddie Kramer: "I like to mic it right by the fretboard... I'm trying to eliminate some of the boominess from the body of the guitar... get up away from the hole of the actual guitar, right by the last fret — you're eliminating the possibility of extra boom." Also the story behind a famous track's guitar blend: two guitarists' live parts (12-string + 6-string) printed to one blended stereo track with drum bleed, bass rolled off one part to clear the other's low end, kept dry to preserve crispness — see [[Layering and Stacking]], [[Masking and Carving]]. Modern mic recommendation for this close-mic role: [[Shure KSM 141]]. → [[Shure KSM 141]], [[Layering and Stacking]], [[Masking and Carving]] — Mix with the Masters (Eddie Kramer), [[Eddie Kramer's story behind "All Along The Watchtower" by Jimi Hendrix]]
- **A structural width-automation move: the mono/narrower demo acoustic guitar runs from the top of the song through the first pre-chorus, then the recording switches to a newly re-tracked, deliberately WIDER acoustic guitar performance from the pre-chorus onward.** Paul Epworth, on Adele's "Rolling in the Deep": "we've actually got the original... acoustic from the Logic demo on the front up to the first pre-chorus, and from then on it switches to... a new acoustic performance which we recorded to make it a bit wider... so you get this nice change of width of image." The wider re-track uses a **binaural head** specifically for its width — muting the close mic "scoops a lot of room-y-ness out," confirming the binaural signal carries most of the perceived width, with the close mic filling in detail on top. A concrete, real-record example of width as an *arrangement* device (narrower verse → wider pre-chorus arrival) rather than a fixed per-song setting — same family as this vault's other section-staged width/effects builds (see [[Arrangement and Song Form]]). → [[Width and Stereo]], [[Arrangement and Song Form]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **Mic placement found by ear, physically moving the mic while playing, lands on almost this exact spot** — a large-diaphragm cardioid condenser at ~45° off-axis, ~10" from the end of the fretboard — direct validation of this chain's §1 default. → [[Neumann TLM 102]] — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
- **A vintage-era "wonky" pre-EQ move: broad mid scoop + low-shelf and high-shelf boosts, sounds thin soloed on purpose** — exists specifically to provoke a bigger reaction out of a following saturation/tape stage, not to sound good dry. → [[Saturation and Distortion]], [[BED Slot]], [[MIDS Slot]], [[AIR Slot]] — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
- **Vintage pitch-drop capture trick: track slightly fast, then slow the take down afterward (tempo+pitch together)** — reproduces a classic tape-era move without needing tape; in Logic this is Flex Time's Speed FX mode specifically (links pitch+tempo the way real tape-speed change would) — the same relationship [[Varispeed 3.0]] recreates live. → [[Varispeed 3.0]], [[Pitch and Formant]] — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
- **Match-EQ discipline after a tape print, when the goal is glue without a big tonal shift** — pull the tape-returned signal back toward a pre-tape mix balance that was already working, rather than letting the tape stage overwrite it. → [[Ozone 9 Match EQ]] — Zach Scholz, [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
- **Explicitly not a universal default** — this level of vintage processing (wonky pre-EQ + tape print) is a deliberate, "a little extreme" character choice for period-correct material, not the guitar tone for every mix. Worth remembering before reaching for the full chain on a part that doesn't call for it.

## Sources

Rick Beato (mic placement) · Joe Gilder (3-cuts-1-boost, butter compression) — links in [[FX Chain System]] · [[Disclosure - SSL SIX Mixing Al Green Stems]] (four-of-everything panning, stage panning, EQ-before-Soothe, desk order) · [[Disclosure - Ultimatum Breakdown + Breakbeat]] (LA-2A one-knob tracking) · Zach Scholz — [Recording Vintage Acoustic Guitar Tones](https://www.youtube.com/watch?v=CQuuXtnyZy8)
