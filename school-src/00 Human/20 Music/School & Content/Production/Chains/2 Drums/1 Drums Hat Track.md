---
type: chain
aliases: ["Drums Hat Track"]
title: Drums Hat Track
chain_type: track
family: drums
source: digital
routing: Drums Hat → Drums Hats Group → Drums Bus → Master
uad_console: [UAD Neve 1073 (plugin front end), UAD UA 1176LN, UAD Pultec EQP-1A]
signal_chain: [Pro-Q 4, Soothe2, Transient Master]
status: default
tags: [chain, drums, track]
---

# Drums Hat Track

**Role:** Hi-hats — the groove's timekeeper and (in trap) a lead instrument in their own right.

**Chain philosophy:** clean → de-pierce → define. The HPF is the big one; everything else is fatigue control.

## 1 — Sound Selection

- **Selection IS the recording step** — audition in [[XO]]. Hats carry more genre signal than any other drum: 909s = house, crisp digital ticks = trap, dusty loops = boom bap.
- 🎬 **Every note a different length, played AND drawn, overlapping across the bar** — the Disclosure 909-hats rule: "not a single loop in this tune" — [Never Enough](https://youtu.be/lGopQwQo9Ag).

## 2 — Programming Best Practice

- 🎬 **Shorten the tail, pitch down, THEN nudge off the kick with a specific named keyboard workflow — third confirmed sighting of this exact hi-hat recipe on this channel, this time the repeatable shortcut is spelled out.** On an 80s synthwave/pop beat, a light hi-hat gets its decay/tail shortened, pitched down, then timing-shifted off the kick via **Select None → Ctrl+A (select all) → Shift-right arrow twice** — "so it's separated from the kick, it's not hitting straight away." Same three-move recipe (shorten/pitch-down/off-grid) already logged on [[Pocket and Microtiming]] from two earlier loner builds; this video is the first to name the exact repeatable shortcut rather than describing the nudge only qualitatively. → [[Pocket and Microtiming]], [[Genre Drum Patterns]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- 🎬 **Two-hat garage bounce split: a click-like first hat for subtle bounce, a second hat shifted off-grid AND tightened via its Out knob for "where the bounce really comes in."** Hi-hat 1 sits almost like a click rather than a real hat — quiet, textural, adds a little bounce without a real pattern. Hi-hat 2 is shifted back off the timing grid and has its tail shortened (the Out knob) before placement — named explicitly as the element that actually delivers the garage bounce. Kick stays deliberately minimal/spaced-out underneath since the percussion above is already doing the rhythmic work. → [[Pocket and Microtiming]], [[Genre Drum Patterns]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Velocity + pitch variation programmed on the instrument beats any plugin** — velocity = volume, vary lengths, triplets scattered.
- **Roll grammar (trap):** base pattern = two-step; rolls before snares and at 8-bar ends; vary density (1/16 → 1/32); triplet-grid switches for bounce; ride roll velocities evenly for shape.
- **Pitch slides:** drop a hat an octave-ish and slide into the next (slide length = zip speed) — the modern "zap" perc; pitch rolls down as they build.
- **Silence is a move:** a beat of dropped hats before a section change hits harder than any fill.
- **Pan the ornaments** — extra rolls/open hats off-center (core hat can stay center); swing/off-grid the extras — Kenny Beats, [Trap Drums More Interesting](https://youtu.be/fo-E8dY81Nw) → [[2 Drums Hats Group|Drums Hats Group]].
- 🎬 **Velocity→pitch in the sampler mod matrix** (small range) — each hit lands slightly detuned; instant humanization — Disclosure, [Remix Stems Stream](https://youtu.be/IOSPhXcXT_8).
- 🎬 **Vary placement past the default every-4th pattern, and enforce velocity variation** — off-beat hits drive the groove forward past a plain "every fourth beat" pattern; uniform-strength hits read as harsh/mechanical, so vary hit-to-hit velocity like a real player would. Swap the hat for a ride (or combine) to change a section's color without touching the rest of the pattern. Choose tail length per hit on purpose — semi-open for a back-beat hat, short for a dense roll — and enable "cut itself"/choke on the sampler channel so an open-hat tail can't ring through the next closed-hat hit (a real kit physically can't do that). FL's note-repeat function generates fast/triplet/trap rolls without hand-drawing every hit. → [[Rhythm and Groove]] — Synthet, [the inarguably best drum sound..](https://www.youtube.com/watch?v=nJwgwn_jYQ0) · [it hits hard on the feel of your music](https://www.youtube.com/watch?v=IyVWtRToKsY)

## 3 — Source → Ableton (UAD front end)

Optional analog pass when a sample feels sterile — printed to audio:

### 1. [[UAD Neve 1073]] — Preamp plugin — light, ~0 VU
### 2. [[UAD UA 1176LN]] — skip on one-shots
### 3. [[UAD Pultec EQP-1A]] — high-band sweetening only

## 4 — Ableton Initial Processing

### 1. [[Pro-Q 4]] — Clean + crisp
- **HPF 300–500 Hz** (hats need *nothing* below — every hat sample carries junk lows that eat headroom; summed across a busy pattern it measurably muddies the drum bus)
- Crisp +1–2 dB @ 8–12 kHz if dull · cut 2–4 kHz if clanky
- 📖 *From book:* the gentler floor for the same HPF is **200–300 Hz "or more, use ears"** — 300–500 Hz stays the default here, but drop toward 200 Hz on a hat whose character genuinely lives low (a soft closed hat, a live loop). Sizzle = high **shelf** 7–10 kHz+ rather than a peak — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]

### 2. [[Soothe2]] — De-pierce
- Light depth, focus 5–12 kHz
- **Why:** Hats are the #1 listening-fatigue source; dynamic resonance control keeps sparkle while killing ice-pick hits — better than a static cut that dulls the pattern.

### 3. [[Transient Master]] — Definition
- Attack + for tick definition, or sustain − to shorten washy open hats.

## 5 — Track FX (optional)

- 🎬 **Overdrive the shakers — ALWAYS** (Guy's rule): distortion "reminds me of how a shaker sounds on a 7-inch record — it just breaks up" — Disclosure, [Prince Edit stream](https://youtu.be/hOvLf9nX500). Applies to shaker/cabasa lanes on this track too.
- **[[RC-20 Retro Color]]** light for vintage texture on live/loop hats.

## 6 — Bus / Send FX (optional)

Routing: **Drums Hat → [[2 Drums Hats Group|Drums Hats Group]] → [[3 Drums Bus|Drums Bus]] → [[Master Chain]]**.

- **NO reverb on trap hats** — dry = modern. Live/loop lanes: a touch of [[Reverb Send Room]].
- Haas-delay a stereo aux perc layer (one channel ~680 samples) for super-wide separation — keep it off anything mono-critical ([[Width and Stereo]]).

## Variations

- **Trap:** the roll grammar + pitch slides from §2, bone dry.
- **House 909s:** the Disclosure no-loops rule from §1, ride the open-hat lengths.

## From books

- **Hat EQ starting points, agreeing with this chain but from the gentler end.** Low cut **200–300 Hz "or more, use ears"** (this chain's 300–500 Hz sits at the aggressive end of that same instruction) · sizzle via a high **shelf 7–10 kHz+** rather than a peak (vs. this chain's "crisp +1–2 dB @ 8–12 kHz") · high cut **18–20 kHz** for "harsh freq" — headroom hygiene at best; actual hat harshness is the 5–12 kHz band [[Soothe2]] already covers in §4. See the inline 📖 line in §4 above. → [[EQ]], [[Masking and Carving]], [[AIR Slot]] — Whipped Cream Sounds, [[Drum Mixing EQ Guide - Enrichment|Drum Mixing EQ Guide]]

## From videos

- **Hi-hat mic proximity-effect fix, solved by moving the mic rather than EQ-ing it out.** Tracking live drums, CLA diagnosed a hi-hat mic's excess low end as proximity effect (a directional mic's bass response rising as it gets closer to the source) and fixed it by having the mic physically pulled back a foot rather than reaching for a high-pass filter afterward — "I really hear... the low end, like, just really killing... pull the hi-hat back a foot." The general discipline: a mic-position problem gets a mic-position fix, not an EQ patch after the take is committed. Full context on [[Drum Mic Technique]] (same mechanism already documented for vocals on [[Vocal Mic Technique]]). → [[Drum Mic Technique]], [[Vocal Mic Technique]] — Chris Lord-Alge (Mix with the Masters), [[Tracking live drums with Chris Lord-Alge]]
- **Garage two-hat bounce split: click-like hat 1 + off-grid, tail-tightened hat 2** — see the inline 🎬 note in §2 above. → [[Pocket and Microtiming]], [[Genre Drum Patterns]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Shorten/pitch-down/off-grid hi-hat recipe, third sighting — this time with the exact repeatable keyboard shortcut named** — see the inline 🎬 note in §2 above. → [[Pocket and Microtiming]], [[Genre Drum Patterns]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- **Raise the global swing amount as the LAST step of the hat/kick programming pass, after every layer is already placed — a finishing humanization move, not a starting parameter.** Layered hats (a simple bounce pattern + a second copy-pasted layer + a third 4-step hat offset behind the kick's own 4-step fill) were all placed first; swing went up only once every layer existed, explicitly "to create a very natural feel." → [[Rhythm and Groove]], [[Pocket and Microtiming]] — loner, [making a billboard number 1 pop beat for post malone's next album from scratch!?](https://www.youtube.com/watch?v=WX_IB6K-xIo)
- **Placement/velocity/tail-choice checklist + choke groups** — see §2 above for the full breakdown → [[Rhythm and Groove]] — Synthet, [the inarguably best drum sound..](https://www.youtube.com/watch?v=nJwgwn_jYQ0) · [it hits hard on the feel of your music](https://www.youtube.com/watch?v=IyVWtRToKsY)
- **[[LFOTool]] half-note duck on shaker/perc loops** — gentle volume shape to make static loops groove (also lands as a fake snare-duck); prefer fixed note values over random. And park the shaker where the hat isn't: his lo-fi hat left the high-highs empty, so the shaker got boosted exactly there — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
## Sources

Disclosure — [Never Enough](https://youtu.be/lGopQwQo9Ag) · [Remix Stems](https://youtu.be/IOSPhXcXT_8) · [Prince Edit](https://youtu.be/hOvLf9nX500) · Kenny Beats — [Trap Drums More Interesting](https://youtu.be/fo-E8dY81Nw)
