---
type: chain
aliases: ["Electric Bass DI Track"]
title: Electric Bass DI Track
chain_type: track
family: bass
source: di
bass: Hofner B-Bass H-Series
routing: Electric Bass DI → Bass Group → Bass Bus → Master
uad_console: [UAD UA 610-B (Unison), UAD 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Ghz Vulf Compressor 3, Ghz Tupe 3, Ghz Tone Control 3, Pro-Q 4]
status: default
anchor: current working chain (Bass_DI export)
tags: [chain, bass, track]
---

# Electric Bass DI Track

**Role:** DI'd [[Hofner B-Bass H-Series]] — the low-end foundation. Current working chain, kept as the default with starting points.

**Chain philosophy:** cut-EQ → compress → tube color → broad tone → carve-EQ. **EQ on both sides of the dynamics/color block** — cut *before* so the comp doesn't chase rumble, carve *after* so the kick relationship is set on the finished tone.

## 1 — Recording Setup

- **Bass: [[Hofner B-Bass H-Series]]**, DI into the [[Universal Audio Apollo Twin MkII]] Hi-Z — no amp needed. **With flatwounds this IS the Dahi lane:** "flatwounds just got a tone — sounds old school but got pocket," tracked straight in with nothing on it. Trust the dry take — [SZA "Used" breakdown](https://youtu.be/SPyDimvPNb0).
- **Playing technique is the tone:**
  - **Modern hip hop thick bass:** bass pickup solo'd, play *lightly with the thumb* above the neck pickup — the Hofner goes lower/thicker than a Fender; a legit 808-alternative.
  - **Beatles palm-mute:** the classic "Hofner sound" is really *palm muting* — short thumpy notes, tone rolled down.
  - 🎬 *From video:* the same "technique over gear" diagnosis from the tracking-engineer side of the glass: a boomy bass sound is almost always the bass/player's tone, not a mic-placement or processing problem — "most good bass players get a good tight sound," and a boomy one doesn't get fixed by leaning on a compressor ("the Summit doesn't help that much in controlling it"). Applies just as much to a DI signal as a mic'd one: if the DI reads boomy, check the instrument/technique before reaching for more EQ/comp. → [[Sound Selection Guide]] — Al Schmitt (Mix with the Masters), [[Recording techniques with Al Schmitt]]
  - 🎬 *From video:* a blind-test teardown of the full bass tone chain rated **fingers/plucking-hand technique as the single most important link — ahead of every piece of gear**, including strings, pickups, and amp: push with the pad of the finger (not near the nail) for a strong tone, dig in for growl vs. wispy/light plucking for a weak thin tone, and always fix technique first when a tone problem shows up before reaching for gear. Full ranked chain: [[Bass Tone Chain Priority]]. → BassBuzz, [How to Fix Your Sh*tty Bass Tone](https://www.youtube.com/watch?v=7b0ShkSBtcU)
- Levels: peaks −12 dBFS, ~−18 average — bass has the widest level swings of any DI source ([[Gain Staging]]).

## 2 — Tracking Best Practice

- **Mono, single take, dead center** — bass is never double-tracked for width; the low end lives in mono ([[Width and Stereo]]). For vintage lanes, force it: **stereo width to zero** (Kenny keeps his bass dead mono for anything 60s/70s — "makes everything really easy to pan and figure out").
- **One bass, multiple SECTIONS** — the bass doesn't have to be one thing per song: a synth-bass section vs an 808 section vs live bass answering between 808 hits ([[Arrangement and Song Form]]) — Kenny Beats, [Trap Drums More Interesting](https://youtu.be/fo-E8dY81Nw).
- **Write on the instrument** — Howard wrote Watch Your Step's bassline on a bass guitar while waiting for the session; a busy bassline can imply the whole harmony over one chord ("root-avoidant basslines = instant sophistication," the Latch lesson).
- Comp per phrase; the groove pocket matters more than note perfection.

## 3 — Source → Ableton (UAD Console)

### 1. [[UAD UA 610-B]] — Unison preamp
- The classic DI bass front end; a little tube gain is most of a "bass tone." (Alt: [[UAD Neve 1073]] for more forward, modern punch.)

### 2. [[UAD UA 1176LN]] — Compressor
- 4:1 · fast-ish attack, fast release · **2–4 dB GR** grabbing the pluck peaks
- **Why on the way in:** catching peaks at tracking means the Ableton chain gets an even signal.

### 3. [[UAD Pultec EQP-1A]] — EQ
- The famous **low-end trick: boost AND atten @ 60 Hz simultaneously** (lows up while the shifted dip keeps 200 Hz mud out) · print gently (1–2).

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Corrective (pre)
- HPF 35–40 Hz (sub rumble) · LPF 8–9 kHz (string clank) · wide cut ~300 Hz if boomy, slight wide cut ~100 Hz if overwhelming
- Starting point: the **dynamic "Bass Guitar Brighten" factory preset**, then edit (highs back down, peaks tamed) — dynamic presets evolve with the signal — Kenny Beats, [Bass Mix & Effects Chain](https://youtu.be/ivvV0iiiCxQ)
- **Bass EQ rule: wide moves only** — narrow cuts notch *individual notes* out of the line.
- 🎬 *From video:* the wide ~300 Hz boomy-cut and HPF above are "Tubby" (~80 Hz rumble) and "Muddy" (~250 Hz mush) territory in the [[Bass EQ Frequency Zones — The Five Dwarves]] framework — Tubby fixes stage-shaking rumble/kick masking, Muddy fixes notes mushing together into indistinct mud; both are two-way controls (Muddy can be added back in if the tone reads thin, not just cut). → BassBuzz, [[How to Get the PERFECT Bass Tone]]
- **Why:** Cuts before compression — low junk dominates the comp's detector and makes it pump.

### 2. [[Ghz Vulf Compressor 3]] — Character compression
- **Compression for ~5 dB GR** (① — 4–6 dB range) · **medium Attack** (②) · **timed Release** (③ — grooves with the part) · **Drop off** (④) · **Dust off** (⑤ — clean on a mix bass) · **Mix 100%** (⑥)
- Brand-agnostic per Kenny: "you just need some kind of compression — the EQ part is probably more important."
- **Why:** On bass, colored consistency IS the sound; the low end must be *steady* for the mix to feel solid.

### 3. [[Ghz Tupe 3]] — Tube harmonics
- Low-medium drive
- **Why:** Harmonics at 2×/3× the fundamental let the line read on phones that can't reproduce 60 Hz.

### 4. [[Ghz Tone Control 3]] — Broad seat
- **Darker (Bass +1.5 dB ①, Treble −1 dB ③)** for Motown-y support; **brighter (Treble +1.5 dB ③, or Tilt bright ⑤)** for melodic/McCartney lines.

### 5. [[Pro-Q 4]] — Carve vs kick (post)
- Decide who owns what: typically kick 50–60 Hz, bass 80–120 Hz (or flipped — per song)
- Dynamic node: dip the bass −2 to −3 dB @ the kick's zone, **sidechained from the kick track**
- **+1–2 dB wide boost somewhere in 700 Hz–1 kHz** — the single best "hear the bass on any speaker" move
- 🎬 *From video:* this 700 Hz–1 kHz presence boost sits right at the top of "Honky" (~500 Hz) running into "Bitey" (~1.5 kHz) in the [[Bass EQ Frequency Zones — The Five Dwarves]] framework — a nasal (Honky) or overly harsh (Bitey) DI can fight this exact boost; check those zones aren't already overcooked before adding more here. → BassBuzz, [[How to Get the PERFECT Bass Tone]]
- **Sub addition when the vintage bass can't ring it off:** R-Bass-style ~69 Hz generation, low amount (owned lane: [[Saturn 2]] low band or [[Bloom Bass Impulse]]) — the Hofner has the same sub gap as Kenny's '69 Fender — [Bass Mix & Effects Chain](https://youtu.be/ivvV0iiiCxQ)
- **Layering another bass?** One frequency band each ("you want each bass in its own frequency spectrum" — Disclosure's Minimoog-low + OBXD-top split) — [Prince Edit + Talk VIP](https://youtu.be/hOvLf9nX500)
- **Why:** The kick/bass pocket is the most important low-end decision in the mix; set it *after* the color stages so it holds.

## 5 — Track FX (optional)

- **Envelope filter, used subtle** — the Mu-Tron lane: "just about the best on bass," run *way less drastic* than the funk quack. Owned: [[Envelope Follower]] → [[Auto Filter]] cutoff, low amount — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk)
- **Parallel dirty bass:** duplicate to an amp-sim channel, drive hard, **bandpass 160 Hz–1.2 kHz**, blend under the clean DI — bass audible everywhere without more level. (Or the [[Saturation Send]].)
- 🎬 *From video:* a real-world sighting of exactly this parallel-blend move, done as a deliberate remix upgrade over the original mix rather than a from-scratch default. Tom Lord-Alge blended a clean bass DI with an amp-sim run through a personal saved distortion preset (starting point, then dialed in further) for a "nasty and gritty" tone — "when you play the two sounds together, it's just nasty and gritty." Explicitly not on his original mix of the same song; a case for revisiting an old mix with a fresh creative move rather than only correcting it. → [[Saturation and Distortion]], [[Parallel Processing]], [[Plugin Wishlist]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- 🎬 *From video:* **verse/chorus tonal shift via deliberate re-phasing, not EQ** — if the bass is tracked with a second close mic alongside the DI (not just DI alone), split that close mic to its own channel engaged only on choruses, and nudge a sample-accurate phase/time adjuster ([[Align Delay]]) to change the phase relationship between the close mic and the DI — the resulting tonal difference is real and section-specific, with no EQ move at all. Only works because a second source exists to re-phase against — a single DI or single mic gives no second phase relationship to manipulate. → [[Phase Alignment]] — Mix with the Masters (Nick Launay), [[Parallel distortion by Nick Launay]]

## 6 — Bus / Send FX (optional)

Routing: **Electric Bass DI → [[2 Bass Group|Bass Group]] → [[3 Bass Bus|Bass Bus]] → [[Master Chain]]**.

- Low end gets **no reverb, no width** ([[FX Chain System]] rules); [[Saturation Send]] is the only send that regularly earns its place.
- The bass ducks to the kick via the dynamic node in §4 (or a dedicated sidechain trigger — see [[Sidechaining]]).

## The "heard vs felt" model

Bass splits into two jobs: **felt** = sub/low warmth (big speakers, chest) · **heard** = ~350 Hz–2 kHz grit and note detail (phones). If the bass is "missing," diagnose *which one*: turning up the felt costs huge headroom for little audibility; saturating/boosting the heard band costs ~1 dB and makes the line audible everywhere. Tupe 3 + the mid boost are the heard tools; the fader is the felt tool.

## Variations

- **Beatles/Sgt Pepper lane:** DI + amp **blended** (the Abbey Road invention), amp mic 5–8 ft back, compress the blend ([[LALA]] standing in for the RS124), tone rolled off, palm-muted. (Most of Sgt Pepper is the Rickenbacker — the "Hofner sound" people mean is the muting.)
- **Modern pop:** [[Saturn 2]] multiband — drive mids only, keep sub clean.
- **Vintage 60s/70s:** flats, dry, dead mono, [[Pro-Q 4]] mid/side with width 0 below ~200 Hz.
  - 🎬 *From video:* validated on the same [[Hofner B-Bass H-Series]] class of instrument through an analog mixer's channel strip — bass EQ has no universal curve, it's entirely mix-dependent (scoop mids for a mid-dense mix, more/less low end for others); build a "fundamental" tone/EQ pass on the mixer first, then refine further in the DAW once there's an actual mix to fit, rather than doing 100% of the EQ work on either side alone. Compression kept light (~5 dB GR at most) and treated as a later, song-specific decision, not a blind default. Driving the mixer's channel strip harder simultaneously distorts the bass AND limits its dynamic range — a combined saturation+dynamics move, not just tone shaping. → [[Saturation and Distortion]] — Zach Scholz, [How To Record 70's Style Bass Tones](https://www.youtube.com/watch?v=c4EPtO-Jgj0)
  - 🎬 *From video:* the same mixer's overdriven channel fuzz on bass was rated above every fuzz pedal tried on bass — "the best and cleanest sounding fuzz" — a real, repeatable analog-mixer-as-fuzz-pedal move if an analog mixer/console is ever added to this chain (not owned today, so this stays a reference point rather than an owned-gear step). → [[BASS Slot]] — Zach Scholz, [How To Record 70's Style Bass Tones](https://www.youtube.com/watch?v=c4EPtO-Jgj0)

## From videos

- **A slightly hollow bass DI fixed with a small top-end shelf, A/B'd bypassed vs. engaged to confirm it was doing real work — then, separately, that same DI blended with amp-sim distortion for a deliberately "nasty and gritty" remix move (see the inline 🎬 note in §5 Track FX above for the full distortion-blend detail).** Also: a fast visual habit for navigating a session with parallel DI/amp bass tracks — a DI region reads visually "pointier" than a mic'd amp region on the same instrument, before even soloing either. → [[EQ]], [[Saturation and Distortion]], [[BASS Slot]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- **"Blend first" philosophy for a bass delivered from a strong producer — add EQ/compression only if the source genuinely needs it, not by default — plus a light character/distortion stage and a kick sidechain reserved specifically for the drop.** "Again, when you're getting tracks from a really good producer, usually the sounds that are coming in are top-notch. The first thing I do is I blend, and then I, you know, design with the EQ and compression if need be, but the only thing I really did on this guy was throw some Trash on there, a little Clip Control." Trash + Clip Control (iZotope, unowned — see [[Plugin Wishlist]]) supplied light distortion character, credited to a named colleague as the source of that move ("Seth Hunter put me on to that"). A saturation/character plugin ("Dark Essence") was flagged as good for both bass AND vocals — also unowned. Sidechain compression off the kick, specifically for the drop section only: **2.5 dB GR**. → [[Sidechaining]], [[Sound Selection Guide]], [[Plugin Wishlist]], [[Saturation and Distortion]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **A five-zone bass EQ frequency map — Tubby ~80 Hz, Muddy ~250 Hz, Honky ~500 Hz, Bitey ~1.5 kHz, Edgy ~3–5 kHz+ — each a cut-to-fix-a-symptom / boost-to-chase-a-tone pair, useful as a naming system for exactly what this chain's Pro-Q 4 stages are already doing.** Full per-zone breakdown, fixes, and five artist recipes (Jamerson, McVie, Steve Harris, Geddy Lee, Tim Commerford) on [[Bass EQ Frequency Zones — The Five Dwarves]]; inline notes added at the corrective (pre) and carve (post) Pro-Q 4 stages above. Also reinforces this chain's "playing technique is the tone" framing directly: tone is a chain (fingers → strings → pickups → amp → EQ) and EQ's power comes from being last — a great chain up to that point can still be ruined by bad EQ at the end, and the reverse also holds. → [[EQ]], [[BASS Slot]], [[BED Slot]], [[MIDS Slot]], [[LEAD Slot]], [[Bass Tone Chain Priority]] — BassBuzz, [[How to Get the PERFECT Bass Tone]]
- **String type (round wound vs. flat wound) is a real, deliberate tonal choice worth making on purpose — but pickup upgrades, electronics/wiring swaps, tone wood, and cable all tested as marginal-to-placebo in a blind test when the existing gear is functional.** Full ranked chain and troubleshooting priority order: [[Bass Tone Chain Priority]]. → BassBuzz, [How to Fix Your Sh*tty Bass Tone](https://www.youtube.com/watch?v=7b0ShkSBtcU)
- **Bass EQ is entirely mix-dependent — there is no default curve, only what a given mix calls for** — demonstrated by applying several different EQ curves to the same take specifically because there was no target song to judge against; the takeaway is the discipline (audition against context, don't reach for a preset), not any one curve. → [[3 Bass Bus|Bass Bus]] — Zach Scholz, [How To Record 70's Style Bass Tones](https://www.youtube.com/watch?v=c4EPtO-Jgj0)
- **Split workflow: a "fundamental" tone pass on hardware/console first, refined further in the DAW once there's a real mix to fit** — deliberately not doing all the tonal work on either side alone. — Zach Scholz, [How To Record 70's Style Bass Tones](https://www.youtube.com/watch?v=c4EPtO-Jgj0)

## Sources

Andrew Lepard, Make Believe Studios (Hofner hip hop), Boulevard Recording (Beatles bass) — links in [[FX Chain System]] · Kenny Beats — [Bass Mix & Effects Chain](https://youtu.be/ivvV0iiiCxQ) · [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk) · Dahi — [SZA "Used"](https://youtu.be/SPyDimvPNb0) · Disclosure — [Prince Edit + Talk VIP](https://youtu.be/hOvLf9nX500) · Zach Scholz — [How To Record 70's Style Bass Tones](https://www.youtube.com/watch?v=c4EPtO-Jgj0)
