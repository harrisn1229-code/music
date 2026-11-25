---
type: chain
aliases: ["Electric Guitar Amp Track"]
title: Electric Guitar Amp Track
chain_type: track
family: guitars
source: amp-mics
mics: Neumann TLM 102 (air/top) + Shure SM57 (mids/lows)
guitar: Fender Stratocaster
amp: Fender Blues Junior
routing: Electric Guitar → Guitar Group → Guitar Bus → Master
uad_console: [UAD Neve 1073 (Unison), UAD 1176LN, UAD Pultec EQP-1A]
signal_chain: [Align Delay, RX 11 Voice De-noise, Pro-Q 4, Ghz Tupe 3, Ghz Tone Control 3, UAD UA 1176LN Rev E]
status: default
anchor: current working chain (Step_2_Electric_Guitar export)
tags: [chain, guitar, track]
---

# Electric Guitar Amp Track

**Role:** Mic'd amp — the real-amp tone lane. [[Fender Stratocaster]] → [[Fender Blues Junior]] → two mics blended: [[Shure SM57]] close for mids/lows, [[Neumann TLM 102]] for the airy top.

**Chain philosophy:** phase-align → de-noise → corrective EQ → tube color → broad tone → comp. Blend the two mics into one picture *first* (they're one instrument), then process the blend.

## 1 — Recording Setup

- **Run the decision tree before every take** (Kenny's habit): what guitar is working, what does the song want — DI + amp sim for speed? real amp? pedals → DI? pedals → amp? one mic or two balanced? Choose consciously instead of defaulting to yesterday's chain — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk).
- **Amp: [[Fender Blues Junior]] at LOW volume** — Kenny's most-recorded amp is a '64/65 Blackface Vibro Champ barely turned up ("even at a really low volume just sounds so good"). Small vintage-voiced Fender driven quietly beats a cranked amp for recording. Pedals in front per the board order: wah → dirt ([[Big Muff Pi]]/[[Boss DS-2]]) → delay ([[Line 6 DL4]]).
- 🎬 *From video:* a third independent source confirms the same clean-platform-first amp philosophy — "that's how I like to set an amp generally... it gives you a really nice platform to start adding pedals and effects, and it kind of works equally well with every guitar." Set the amp clean with a touch of reverb *before* engaging any pedals, on a mid-'60s Fender Princeton Reverb (Eminence speaker) — same small-clean-blackface-Fender lane as the owned [[Fender Blues Junior]]. — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)
- 🎬 *From video:* a fourth confirmation of the small-clean-Fender-platform pattern, this time with the actual pedal *dial-in* method spelled out. Studio amp volume ≈ 3–4 (Princeton Reverb/Headstrong), live volume higher with more headroom for a louder band (Pro Reverb) — "all these old Fender amps have a great balanced, clean tone and are a really nice starting place for adding pedals." **Boost/overdrive volume-balancing method (new, reusable):** set a clean-boost pedal's volume *slightly louder* than clean rhythm volume (live use: helps melody/solo parts cut through the mix without breaking up, given headroom); with an overdrive, set gain to taste but push the pedal's own volume louder than feels necessary solo, to compensate for the *perceived* volume loss its own compression causes once a full band (especially drums/cymbals) is playing — "it might sound loud when you're playing by yourself... but you're going to notice that perceived volume loss with the compression of an overdrive" once the band comes in. Also: an overdrive's main job isn't just grit — it adds compression (sustain, "squishier" feel under the fingers) and typically cuts high end, taming a bright clean guitar/amp combo. **Tone controls set per pickup/guitar, not fixed** — a brighter guitar, brighter amp, or bridge-pickup use wants different pedal tone-control settings than a darker neck-pickup tone. **Amp volume changes the whole downstream calculation** — a louder/cranked amp is already compressing on its own tubes/speaker, shrinking available headroom, so pedal boost/overdrive volume settings need to come back down from wherever they sat at bedroom volume; re-tune the board any time the amp's own volume changes rather than assuming one dial-in transfers across sessions. → [[Fender Blues Junior]], [[Boss DS-2]] — Jack Ruch, [Dial In Your Amps and Pedals for Great Clean and Overdriven TONES!](https://www.youtube.com/watch?v=45s77xBLZBU)
- **Speaker map:** dust cap center = brightest/harshest · middle of the cone = balanced · outer edge = dark, low-heavy, least articulate.
- **[[Shure SM57]]:** close (1–3"), middle of the cone as the start. This mic is the body of the tone — wear headphones in front of the cab and move it; an inch genuinely changes the tone.
- **[[Neumann TLM 102]]:** the air layer. Two safe options: (a) next to the SM57, **capsules equal distance from the cone** (avoids comb-filtering); or (b) 1–3 ft back for air + room, then align in §4.
- 🎬 *From video:* a third confirmation of the two-mic-blend pattern, this time with a ribbon standing in for the condenser's air role: **[[Shure SM57]] (dynamic, mid-rangey/cutting) + [[Royer 121]] (ribbon, warmer/fuller, not owned)** — "the warmer, fuller sound of the Royer ribbon mic combined with the more focused mid-rangey harsher sound of the 57, which really cuts through the mix." Positioning stated as by-ear, not formula: "I just kind of positioned those a little bit off the center of the cone of the speaker, back an inch or two off the grill cloth. Basically, just move it around until it sounds good" — a looser framing of this stage's own "an inch of movement changes the tone" rule. — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)
- **Pink-noise phase alignment (Dan Austin method):** play pink noise through the amp, set the SM57, then **flip the TLM's polarity and physically move it until the summed pair cancels hardest** (thin "windy" sound = perfectly aligned), flip back — phase-locked, blend freely. **Polarity-check every setup regardless:** flip ø, keep the fuller low end ([[Phase Alignment]]).
- 🎬 *From video:* a DI layer summed with a mic'd amp signal needs the same polarity check as two mics — "always want to check the phase of DI versus amp." A DI fuzz/pedal track on Muse's guitars was out of phase against its mic'd counterpart; flipping it "brought all the bottom back" and let the DI layer add real heat instead of cancelling low end. Full note on [[Phase Alignment]] — Mix with the Masters (Chris Lord-Alge), [[Mixing Muse Guitars - Chris Lord-Alge]].

## 2 — Tracking Best Practice

- **Always print the clean DI too** — even when committed to the amp: it's the re-amp safety net, and you can *see* transients in a DI for editing that saturated takes hide.
- **Two mics = four tracks armed** — each mic gets its monitored FX track + its ghost latency track (no plugins, monitor off, out to a spare hardware pair); keep the ghost takes — [Recording Without Latency](https://youtu.be/Gj4_IvHFn6g) → [[Latency-Free Tracking]].
- **Rhythm double-tracking (the real width move):** record the part twice, pan **35–50 L/R** (Live's pan runs 0–50 per side) — beats any widener. Vary take 2: different pickup position or capo'd voicing so the layers stack instead of comb-filtering.
- **Hardware echo as part of the tone, printed** — Kenny keeps Space Echo/Echorec-style boxes ON the amp and records them; owned lane: [[EchoBoy]] tape mode or the [[Sony TC-630]] loop *before* commit, instead of always saving delay for sends — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk).
- **Bonus texture — the crushed room mic:** on big rock moments, a bright condenser a few feet back, **preamp slammed into breakup**, HPF'd hard, blended low *on its own track* (never summed into the close pair).
- **Tone-first rule:** if the mix needs massive EQ later, the fix is here — amp gain (too much eats note definition in a mix) and presence, or a different mic spot. **Re-record over re-sculpt.**

## 3 — Source → Ableton (UAD Console)

### 1. [[UAD Neve 1073]] — Unison preamp (per mic)
- The guitar-amp classic; light drive, ~0 VU. (Alt: [[UAD UA 610-B]], or a UAD Marshall/Fender Unison amp if going direct-ish.)
- 🎬 *From video:* the plain statement of the hot-but-not-clipping discipline this stage already runs, re-tuned per outboard preamp: "I just set the preamps right until they're... not clipping. So, as loud as they can get without hitting the red... you want to hit your recording software, the computer, with as much signal as possible. That's going to give you a nice loud full sound." Stated as a real, audible upgrade over interface-only gain, not just a habit: "I've done it without the mic preamps and there's a noticeable difference." → [[Gain Staging]] — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)

### 2. [[UAD UA 1176LN]] — Compressor (optional)
- 2–3 dB GR max on peaks · 4:1 · skip entirely for dynamic blues/edge-of-breakup playing.

### 3. [[UAD Pultec EQP-1A]] — EQ
- HPF-duty only (low ATTEN @ 60 Hz) · print conservative — the amp + mic *is* the sound.

## 4 — Ableton Initial Processing

### 1. [[Align Delay]] — Phase alignment (on the TLM track, if spaced)
- **Unit = samples** (②), **start ~13** (①) and nudge until the low end is fullest with both mics playing; polarity-flip check first
- **Why:** A spaced pair arrives at different times = comb filtering no EQ can fix. Align first; every downstream move assumes a coherent source.

### 2. [[RX 11 Voice De-noise]] — Noise floor
- Learn on a gap · 6–10 dB reduction, adaptive
- **Why:** Amp hiss + single-coil hum gets multiplied by every later compressor/saturator.

### 3. [[Pro-Q 4]] — Corrective EQ
- HPF 80–120 Hz — **the guitar's fundamental lives ~100 Hz; don't HPF past it** (up to 200 Hz on layer/lead parts only) · cut mud 250–700 Hz as needed · **notch the 3.5–4.5 kHz nastiness** (narrow, a few dB)
- Magic boost map when the part needs it: **1 kHz** upfront/full · **2.5 kHz** edge/bite · **5 kHz** definition · **8 kHz** airy lift — but never boost the same ones on every guitar layer; stack them across different frequencies or they fight and mask the vocal.
- **Why:** Cuts before compression. Leave the 100 Hz–1 kHz "meat" mostly alone — heavily-EQ'd distorted guitar hurts more than it helps.
- 🎬 *From video:* a fifth confirmation of restraint as the default, with one named exception spelled out in full — on an analog-recorded band track, "there's no gouging of EQ," most guitar layers get only a top-end touch or nothing at all. The one deliberate EQ move given: main guitars get a **tight, narrow +6 dB bump around 700 Hz** specifically to make the tone "bark," plus HPF and a little top end — "a very tight curve, because I want it to kind of bark." A bridge-guitar layer on the same session got literally zero EQ ("this guitar just sounds great, so I didn't need to do anything to it other than gain it"). → [[EQ]], [[2 Guitar Group|Guitar Group]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]

### 4. [[Ghz Tupe 3]] — Tube color
- **Tube 30%** (① — low–medium) · **Tilt neutral** (②) · **Output matched to input** (⑤) · **Mix 100%** (④)
- **Why:** Restores the "pushed amp" harmonics after corrective cleanup; before the comp so the 1176 glues the colored tone.

### 5. [[Ghz Tone Control 3]] — Broad tone
- **Tilt slightly dark** (⑤) / **Treble −1.5 dB** (③) to seat it against the vocal — guitars usually give up 2–5 kHz where the vocal lives ([[Masking and Carving]]).

### 6. [[UAD UA 1176LN]] — Compression
- 4:1 · attack slow (counter-clockwise — knobs run backwards) · release fast · **2–4 dB GR** · no threshold — work input/output toward each other; sidechain filter ON if palm-muted lows pump it
- **Why:** Slow attack lets the pick through, fast release adds sustain and attitude — the classic 1176-on-guitar move. Last in chain to even out the tone stages.

## 5 — Track FX (optional)

- Most amp takes want nothing — the character was printed at the amp/pedals.
- 🎬 *From video:* a third confirmation of this rule — "no EQ, no compression, no plugins on the guitar tracks themselves; all the character is printed at the amp/pedal stage." — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)
- **[[RC-20 Retro Color]]** for a lo-fi layer under a produced track: Wobble 10–15%, MIX ~30%.
- Cut the ~**15 kHz** super-highs when stacking multiple guitar layers — stacked top-octave junk becomes "white-noise ringing" (handled at [[2 Guitar Group|Guitar Group]] if not here) — [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ).

## 6 — Bus / Send FX (optional)

Routing: **Electric Guitar → [[2 Guitar Group|Guitar Group]] → [[3 Guitar Bus|Guitar Bus]] → [[Master Chain]]** — section carve at the group, tape/glue at the bus.

- **[[Reverb Send Room]]** to place it · **[[Delay Send Other]]** for leads · **[[Width Send]]** on singles that need to feel doubled (a real double from §2 always wins).
- 🎬 *From video:* a guitar-solo "arrival" recipe — dual synced delay (eighth-note + a longer, roughly-quarter-note repeat) run together with a touch of reverb underneath, plus [[Width Send]] for a micro-pitch widener — see [[EchoBoy]] and [[MicroShift]] for the full owned-lane recipe — Mix with the Masters (Chris Lord-Alge), [[Mixing Muse Guitars - Chris Lord-Alge]].
- 🎬 *From video:* for a Mk.gee-style "controlled chaos" alternative send — a distorted reverb that only fires on the loudest notes, gated first in the send chain — see [[Mk.gee Baritone Guitar Chain]].

## Variations

- **Beatles lane:** SM57 only, [[Kramer Tape]] instead of Tupe 3, compress harder ([[LALA]] after the 1176) for that squashed AM sweetness.
- **Funk/tight:** faster 1176 attack (5–6) to clip the pick attack down, HPF up to 120 Hz.

## From videos

- **A "one guitar sound" built from several simultaneous tracked layers — multiple room mics on the amp plus a separate DI fuzz track — needs its own phase check once the DI layer is added, distinct from a plain two-mic blend.** Chris Lord-Alge's six-track guitar sound: three room mics in one blend plus a fourth DI fuzz layer (pedal/source unclear), phase-checked and flipped against the mic'd signal (see the inline 🎬 note in §1 above) before the DI layer's "heat" could be trusted in the mix. → [[Phase Alignment]], [[Layering and Stacking]] — Mix with the Masters (Chris Lord-Alge), [[Mixing Muse Guitars - Chris Lord-Alge]]
- **"Know when to EQ and when to leave it alone" — the organizing principle for a full analog-recorded band's guitar pass, with a deliberately thinned intro guitar as the one section that gets real, arrangement-motivated processing.** Because the source is an analog recording, "there's no gouging of EQ" — most tracks get a top-end touch or nothing. The intro guitar is the exception: HPF + a boost around 6–7 kHz to make it thinner than its natural tone, justified by A/B'ing against the original mix ("I did reference the original mix... I felt it was just a little too chubby, so I made it a little bit thinner") and by an arrangement reason — "we're building as this track goes along, so that when the band does come in we have somewhere to go." Also: gain trims done with the plugin's own input/output, not the fader, "so in case I bump it, I know where it is." Full breakdown (extra-guitar channel/pan convention, main-guitar bark EQ, octave-guitar compression) on [[2 Guitar Group|Guitar Group]]. → [[EQ]], [[Gain Staging]], [[Arrangement and Song Form]], [[2 Guitar Group|Guitar Group]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- **A dial-in-focused companion video from the same channel adds the actual pedal-volume-balancing method this chain's inline notes reference above.** No new signal path here — same small-clean-Fender-platform philosophy — but the reusable content is the *how*: boost volume set slightly louder than clean rhythm volume; overdrive volume pushed louder than feels necessary alone to compensate for perceived volume loss from the pedal's own compression once a full band is playing; tone controls set per guitar/pickup rather than fixed; and pedal settings re-tuned whenever the amp's own volume changes (louder amp = less headroom = pedal settings come back down). Full detail on the inline 🎬 note in §1 above. — Jack Ruch, [Dial In Your Amps and Pedals for Great Clean and Overdriven TONES!](https://www.youtube.com/watch?v=45s77xBLZBU)
- **A second full home-studio guitar rig lands remarkably close to this chain's own signal path — same interface family, same close mic, same two-mic-blend/clean-platform philosophy — confirming rather than replacing it.** Full chain: [[Fender Stratocaster|guitar]] → pedalboard → amp, mic'd with [[Shure SM57]] + [[Royer 121]] (ribbon, not owned) → a pair of API mic preamps → [[Universal Audio Apollo Twin MkII|Apollo interface]] → computer. Same fixed, repeatable capture chain reused across every session ("the guitars change... but everything else here stays set up pretty much the same"), character baked in at the amp/pedal stage rather than rebuilt each time. See the inline 🎬 notes at §1 (clean-platform-first, two-mic blend, mic-positioning-by-ear), §3 (preamp gain staging), and §5 (near-zero track processing) above for the full detail. Boss Delay Machine settings and pedal-stacking habits from the same video are on [[Line 6 DL4]]; master-bus glue-for-small-speakers rationale on [[Master Chain]]. — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)

## Sources

Dan Austin (pink-noise alignment), Premier Guitar (spaced pair), Bedroom Producer/Hardcore Music Studio (EQ maps) — links in [[FX Chain System]] · Kenny Beats — [Guitar Recording Process](https://youtu.be/VruZ-A0_aZk) · [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ) · [Recording Without Latency](https://youtu.be/Gj4_IvHFn6g) · Jack Ruch — [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A) · [Dial In Your Amps and Pedals for Great Clean and Overdriven TONES!](https://www.youtube.com/watch?v=45s77xBLZBU)
