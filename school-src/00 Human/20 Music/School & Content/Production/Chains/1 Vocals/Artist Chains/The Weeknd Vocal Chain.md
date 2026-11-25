---
type: chain
title: The Weeknd Vocal Chain
reference: The Weeknd (Blinding Lights, Die For You, Call Out My Name, Is There Someone Else?)
chain_type: style
family: vocals
tags: [chain, vocal, style, weeknd]
---

# The Weeknd Vocal Chain

**Reference/vibe:** the modern pop-R&B gold standard — silky, breathy intimacy that can open into a huge 80s belt without ever getting harsh. Warmth at 200–300 Hz + extended air above 10 kHz + *controlled* mids (slight 1–2 kHz dip) — expensive-sounding restraint, tuned invisibly, stacked wide on hooks.
**Signal source:** U87-class condenser in the references — your [[Neumann TLM 102]] is the right family. Breath control IS the instrument; record close (3–6") for the intimacy proximity warmth.

## Step 1 — Record (UAD Console)
1. **UAD Neve 1073 (Unison)** — clean-rich, minimal drive
2. **UAD Teletronix LA-2A** — 2–3 dB smooth optical (the CL-1B-style silk in his documented chains; LA-2A is your equivalent)
3. **UAD Pultec EQP-1A** — +1–2 @ 12 kHz air, low ATTEN @ 60 Hz

## Chain overview
Tune (subtle) → clean → two-stage comp → dynamic mids → color → de-ess → air. His documented mix chains run deep (Auto-Tune EFX → Pro-Q → Pro-MB → 1176 → doubler → MicroShift → plate) — the theme is *many light touches*.

## Step 2 — Process (Ableton)

### 1. [[Auto-Tune Pro]] — Invisible tune
- Retune 30–45, Humanize 100 — locked but human (the EFX-era pull is slightly rubbery; a touch faster than you'd expect for how natural it reads).

### 2. [[Pro-Q 4]] — Sculpt
- HPF 70–90 Hz · **keep 200–300 Hz** (his warmth — don't scoop it like a rap vocal) · dip 1–2 kHz −1 to −2 dB (the anti-harshness move) · air shelf +2 @ 10 kHz+.

### 3. [[Pro-C 2]] → [[LALA]] — Two-stage
- Pro-C 2 Vocal style 3–4 dB, then LALA 1–2 dB ride — glassy evenness for long sustained notes.

### 4. [[Pro-Q 4]] (dynamic) or [[Soothe2]] — Mid control
- Dynamic dip 2–4 kHz on the belts only — how he gets loud without ever biting.

### 5. [[Little Radiator]] — Tube silk
- Low drive (it's in his documented chain) — warmth that reads as "expensive," not "dirty."

### 6. [[Pro-DS]] — De-ess
- Split-band, slightly firm — all that air makes S's expensive too.

## Step 3 — Effects (sends)
- **[[Width Send]] (MicroShift — literally his documented plugin):** hooks and stacked choruses wide, verses nearly dry-center.
- **Plate:** [[ValhallaPlate]] 1.5–2.5 s, pre-delay 30 ms, ducked — the 80s bloom on "Blinding Lights"-style choruses.
- [[Delay Send Slap]] subtle + 1/4 throws on phrase-ends · [[Doubler4]] barely-on for the chorus thickener.
- Stacks: octave-down whisper layer under big hooks (tucked), harmonies bright and wide per the pop rules ([[1 Harmony Vocal Track|Harmony Vocal Track]]).

## Vocal arrangement

| Section | Lead | Behind it |
|---|---|---|
| Verse | single, breathy, intimate, close | nothing, or one low double |
| Pre | single, opening up | doubles enter, width starts |
| Chorus | the 80s belt | doubles hard-panned, harmonies inside, long verb ducked under the dry |
| Bridge | back to one breath-close voice | — |

**The move — intimacy to enormity, on the same voice.** The verse and the chorus are the same singer and the same chain; what changes is the layer count and the width. Restraint in the verse is what buys the chorus its size.

**Tuned invisibly, always.** Unlike the Travis lane, the tune is never the effect here — so the arrangement carries all the contrast.

**Stack count: 1 → 4 + harmonies.**

## Notes / variations
- **After Hours synthwave lane:** more plate, wider stacks, chorus on the doubles.
- **Trilogy dark-R&B lane:** slower tune, more room than plate, RC-20 light for haze, falsetto layers drenched.
- The discipline: every stage does 1–3 dB of work. If any single plugin is obvious, it's overdone.

## Step 4 — Illangelo's own lead-vocal chain (primary source, product-and-setting-level)

Everything above this section was reconstructed from press/blog sources. This section is the real thing, straight from Illangelo (Abel's longtime co-producer/engineer across *Trilogy* through *After Hours*), screen-sharing his actual Ableton session — product names and numbers, not inference. Where it diverges from Step 1–3 above, **trust this section**; where it's silent, the earlier steps still hold as a general Weeknd-family starting point.

**Tracking (before Ableton):** everything goes direct into a **UAD audio interface**, monitored live so Abel hears Auto-Tune + compression/limiting in real time while singing — controlled playback without printing anything heavy. Preamp of choice among the UAD Unison roster: **Manley VOXBOX** (unowned — see [[Plugin Wishlist]]; owned equivalent [[UAD Neve 1073]] or [[UAD UA 610-B]] for tube warmth). Tracking compressor recipe (maps directly to owned [[UAD Tube-Tech CL 1B mkII]]): **on**, Release Medium/Medium-fast, Attack Medium/Medium-slow (song-dependent), **Threshold left alone — level controlled via Input drive only**, targeting only slight needle movement (bumps to ~−1 dB, peaks −3 to −7 dB at most — nowhere near −10/−20). Reverb monitored live + a delay on a secondary Aux while tracking, so the performance is sung against real space/repeats from take one. Stated reason for staying interface-direct over vintage mics/hardware chains (which he rates highly but doesn't reach for): a full year of Abel sessions jumping between studios makes a portable, consistent signal path matter more than hardware character that can't travel.

**In Ableton, in signal order:**
1. **[[Utility]]** — manually removes one specific breath, right at the top (not a dedicated breath plugin) — a habit carried over from Cubase's hotkey breath-editing, which he still prefers but had to partly adapt away from.
2. **[[Pro-Q 4]]** ("Q3" in his own terms) — steep low roll-off, a boost around **1500 Hz, ~+4 dB**, gentle top-end smoothing filter. **Linear Phase / Medium** only at the very end of finishing a record; **Natural Phase** the other 99% of the time.
3. **Vocal Rider (Waves, unowned — [[Plugin Wishlist]])** — Range maxed **12 dB up/12 dB down**, Center 0, Sensitivity maxed, Speed Fast. Real-time gain-riding BEFORE any compression, specifically because tracking stays clean/uncompressed — likened to the singer physically moving toward/away from the mic (pushed back when loud, pulled in when soft). His words: "we're just trying to get the strongest base possible for the lead vocal... little bit by little bit, chipping away at it." Owned lane doing a related job: [[RVox]] (see §5 below for why he splits this out instead).
4. **[[Pro-G]]** — gate/expander creating contrast between the eventual hyper-compressed vocal and audible space between phrases: opens above threshold, tucks ~**12 dB** below it.
5. **DeBreath (Waves, unowned — [[Plugin Wishlist]])** — dialed to **−9**, a touch-up pass on breaths the top-of-chain Utility move didn't catch. Adds serious latency with no workaround found — kept anyway for the hours it saves over manual breath-cutting.
6. **Eiosis E2 Deesser (unowned — [[Plugin Wishlist]])** — his strongest endorsement in the whole video: "nothing does what this de-esser does... this should be almost your first choice in de-essing. It's my first choice." → [[De-essing]]
7. **[[Pro-L 2]]** — run on the LEAD VOCAL TRACK ITSELF, not the master. **Attack deliberately slow** so each phrase's initial transient energy pokes through before clamping — peaks visibly land at phrase starts as a result. Philosophy: many gentle stages in series so the vocal never arrives "already clamped down."
8. **[[Pro-MB]]** — most gain reduction on the low end; the top end is mostly let through except when specific moments trigger it (wanted). His framing: a standard static EQ "is not going to sound as alive as when you're doing it with something that reacts instantly in the moment as needed."
9. **A second, unnamed de-esser** — light cleanup catching a couple of remaining peaks the Eiosis stage left; explicitly not the heavy lifter. Confirms a **two-de-esser layering pattern**: one primary (Eiosis), one late touch-up.
10. **[[Utility]] → a favorite EQ with a dedicated "Air band"** (plugin name not confirmed — the source video's captions cut off before he names it) — a gentle boost around **20 kHz** (~0.5 in this session, sometimes cranked to 4–6). Compared directly to owned **[[Fresh Air]]**: "I think Slate Digital might have just released something called Fresh Air... it's fire. This one also does a similar thing." Called his favorite plugin overall.

**Why this differs from Step 2 above:** the press-sourced chain (Auto-Tune EFX → Pro-Q → Pro-MB → 1176 → doubler → MicroShift → plate) is directionally right but compresses a much longer real chain into a few named stages. The real chain runs Vocal Rider *ahead* of any hard compression (not after), splits gating and de-essing into multiple dedicated single-purpose plugins rather than one or two multi-tools, and puts [[Pro-L 2]] on the *track*, not the bus — reinforcing this chain's overall "many light touches, nothing obvious" discipline rather than contradicting it.

## Step 5 — The "backgrounds" reverse-reverb texture (opens the record)

The swelling reverse-reverb intro heard on Weeknd records comes from a group Illangelo calls **"backgrounds"** — a genuinely different animal from the lead vocal chain above, built for atmosphere rather than intelligibility. Three parallel vocal layers feed it: one pitched an **octave up**, one **dry**, one through **[[OTT]]** (pushing mids/highs, controlling lows). From there: an unidentified plugin/nickname ("Denise, The Sweeper") + a second EQ pass doing low-end notching, with a companion low band that fades back in as the sound decays → **[[Utility]]** automation accenting the swell's rise → **ShaperBox** (Cableguys, unowned) Mix 22%, pumping at half-beat → **Sinevibes Blend** multi-chorus (unowned), deliberately locked to **2 voices** ("there's something about keeping it to the simplistic nature of just two") → **MondoMod** (SoundToys, unowned), Blend ~60–80% — his own words: "I used this on all backgrounds, I used this on anything that was stereo information... I just want to hear it moving" → an Audio Effect Rack with an unidentified "whirl" device → **[[ValhallaDelay|Valhalla Delay]]** → a very long reverb closing the chain (**~19-second decay** — "long decay, 19 seconds... that's beautiful") → a final [[Pro-Q 4]] top-end roll-off.

Not (yet) worth its own dedicated chain note — genuinely reusable for anyone chasing this specific reverse-reverb-swell texture, but built from three unowned modulation plugins (ShaperBox, Sinevibes Blend, MondoMod) with no settled owned-lane substitution yet. Revisit as a standalone Production/Chains entry once those gaps close or a clear owned-plugin stand-in emerges (candidates: [[Chorus-Ensemble]] for the 2-voice chorus role, a Max for Live LFO rack for MondoMod's constant stereo-movement role).

**Sources:** [Sound On Sound — Inside Track: The Weeknd](https://www.soundonsound.com/techniques/inside-track-weeknd) · [Rys Up Audio — Weeknd vocal chain breakdown](https://rysupaudio.com/blogs/news/how-to-sound-like-the-weeknd) · Mix with the Masters (Illangelo), [[Producing The Weeknd's vocals with Illangelo]]
