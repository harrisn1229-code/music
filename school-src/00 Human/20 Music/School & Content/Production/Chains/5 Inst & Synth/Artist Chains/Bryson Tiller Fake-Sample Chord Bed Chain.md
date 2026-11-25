---
type: chain
title: Bryson Tiller Fake-Sample Chord Bed Chain
reference: a '90s-R&B-style chord bed built entirely from layered VST electric pianos and processed to sound genuinely sampled — reference track Bryson Tiller's "Always Forever"
chain_type: style
family: keys-synths
routing: 3-layer Rhodes/Wurlitzer stack + vocal chop + harmony chop → [[2 Inst-Synth Group|Inst-Synth Group]] / [[2 Main Vocal Group|Main Vocal Group]] → [[3 Inst-Synth Bus|Inst-Synth Bus]] / [[3 Vocal Bus|Vocal Bus]] → Master
signal_chain: [Layer 1 Rhodes (Cassette → chorus → heavy reverb → heavy delay → EQ cut lows/mids → Juno emulation heavy), Layer 2 Wurlitzer V2 (reverb → delay → EQ, light touch), Layer 3 second Rhodes (EQ → mid-sides for width), 4-bar wordless vocal chop (AlterBoy pitch-up/formant-down → EQ cut lows+highs → reverb to space it out), harmony vocal chops (same chain), stem consolidation (2 vocal stems → 1, 3 keys stems → 1), vocal bus finishing (heavy EQ cut both ends → reverb → tremolo panning side to side), tempo build (written at 80 BPM, Warp-stretched to 135 BPM), drums (shortened/pitched-down/timing-shifted hi-hat, 4-layer percussion, spaced kick, 808 following chord roots + ghost notes, Analog Lab triangle lead with cutoff pulled down, pitched/reversed perc riser)]
status: video-derived
tags: [chain, keys, vocals, style, sampling, r&b, 90s, bryson-tiller]
---

# Bryson Tiller Fake-Sample Chord Bed Chain

**Reference/vibe:** a from-scratch chord bed deliberately built to sound like a **genuine '90s R&B sample** — reference track named on-screen is Bryson Tiller's "Always Forever" — without sampling anything real. Reverse-engineered from a loner (YouTube) breakdown, [how to make smooth rnb beats for bryson tiller from scratch (no samples)](https://www.youtube.com/watch?v=ZMB_sqF_Y3Q). Distinct from [[2000s R&B Piano Sample Chain]] (a real sample-flip built from one instrument per layer, comparatively CLEAN processing appropriate to a 2000s-era reference) and [[Bryson Tiller Vocal Chain]] (Bryson Tiller's own lead-vocal processing style) — this chain's defining move is **fabricating the "sampled" character from scratch**: three separate electric-piano layers, each independently processed, plus a heavy dual-end EQ + reverb + tremolo pass explicitly reasoned as "if you're sampling a '90s R&B record, you're going to have to cut loads of the highs and lows" — the processing recipe IS the era simulation, not a light touch held back because the reference "isn't too vintage" (the opposite judgment call from the 2000s chain).

## Chain overview

Three electric-piano/synth layers stack into one chord bed (two separate Lounge Lizard Rhodes instances plus a Wurlitzer V2, each with its own processing recipe), a wordless 4-bar vocal chop plus a harmony chop sit on top, everything gets bounced down to two stems for easier manipulation, then the vocal stem gets a deliberate "sampled from a record" EQ/reverb/tremolo pass. The whole bed is written at a slow 80 BPM and Warp-stretched up to the final 135 BPM once the arrangement is locked. Drums are simple but bounce-focused: a shortened/pitched-down/timing-shifted hi-hat, four stacked percussion layers doing most of the actual bounce work, a deliberately spaced-out kick, and an 808 that follows the chord roots with ghost notes layered in so it never locks 1:1 with the kick.

## 1. Chord bed — three layers

1. **Layer 1 — Lounge Lizard Rhodes, basic 4-chord progression, the heaviest-processed layer.** Chain: [[Cassette]] (tape/lo-fi) → **chorus** ([[TAL-Chorus-LX]]) → heavy reverb → heavy delay → EQ (cut lows + some mids) → a **Juno emulation run "quite heavy"** — named on-screen as a free plugin (unowned; owned stand-in [[Model 84 Polyphonic Synthesizer]], see [[Plugin Wishlist]]). → [[BED Slot]]
2. **Layer 2 — Wurlitzer V2 (Arturia Wurli V), already "watery"/washed-out, kept as background texture.** Lighter chain since the source is already soft: reverb → delay → EQ. → [[Plugin Wishlist]], [[BED Slot]]
3. **Layer 3 — a second Lounge Lizard instance, "for more depth," same chord pattern transposed to each key of the progression.** Chain: EQ → **mid-sides** ([[Ghz Midside 3]]) for width. → [[Width and Stereo]]
- 🎬 *From video:* stack multiple instances of the SAME source instrument, each with its own distinct chain and register, rather than one layer trying to do everything — three "Rhodes" instances read as one wide, lush bed. → [[Layering and Stacking]]

## 2. Vocal chop + harmony

1. **Main chop:** a 4-bar wordless vocal run (deliberate nonsense lyrics — texture, not a topline) → [[Little AlterBoy]] (pitch all the way up, Formant down a little) → EQ (cut lows AND highs) → reverb "to drown it out, space it out." → [[Pitch and Formant]]
2. **Harmony chop:** a second layer of vocal chops behind the main run, same chain (AlterBoy → reverb → delay). → [[Vocal Stacks and Ad-libs]]
- 🎬 *From video:* AlterBoy's pitch-up/formant-down move works as well on a texture/sample-style vocal chop as it does on a lead vocal — same recipe, different musical role.

## 3. Consolidation + vocal-bus finishing

1. **Bounce down:** 2 vocal stems → 1 stem; 3 keys layers → 1 stem — explicitly to make reversing/chopping/stretching easier downstream. → [[Layering and Stacking]]
2. **Vocal bus:** new mixer channel → heavy EQ cut (a lot of both highs AND lows) → reverb → **tremolo panning side to side** ([[Ghz Trem Control 3]]).
- 🎬 *From video:* "if you're sampling a '90s R&B record, you're going to have to cut loads of the highs out and loads of the lows out" — the explicit reasoning behind the vocal bus's heavy dual-end EQ cut. → [[EQ]], [[Sampling and Sound Selection]]

## 4. Tempo — write slow, stretch up

- Written and arranged at **80 BPM** (near the felt tempo of the "Always Forever" reference), then both keys and vocal clips switched to **Stretch/Warp mode** and the project tempo bumped to **135 BPM** once the arrangement was locked. Stated payoff: makes it easier to get a good drum bounce once the bed is already living in the faster pocket. → [[Rhythm and Groove]]

## 5. Drums

- **Hi-hat:** shorten the tail/decay drastically → pitch down → nudge timing off-grid (~half the shift range) for bounce. → [[Pocket and Microtiming]], [[Genre Drum Patterns]]
- **Percussion:** 4 stacked layers — "where I'm getting most of the bounce from." → [[Layering and Stacking]]
- **Kick:** deliberately spaced out — the hats/perc already carry the bounce/energy.
- **808:** follows the chord progression's bass notes, plus short ghost notes between the main hits so it never locks 1:1 with the kick. → [[Bass Design]], [[SUB Slot]]
- **Lead:** Analog Lab triangle-wave patch, cutoff pulled down (raw patch too bright) — "a very classic R&B" lead tone. → [[LEAD Slot]]
- **Riser:** a perc one-shot pitched all the way down, time-shifted, reversed — bridge-to-hook riser. → [[TEXTURE Slot]]

## 6. Arrangement

- **Intro:** reverse keys + bass + lead.
- **Verse:** sparse start (keys only, no bass) → builds to full (vocals, reverse keys, lead, bass, riser) by verse-end.
- **Hook:** vocals OUT, 808 back IN, and the key sample itself bounced to audio and **pitched all the way up** to stand in for the vocal as the hook's melodic variation. → [[Arrangement and Song Form]]

## Variations

- **The multi-instance-of-one-source layering move (three separate Lounge Lizard/Wurlitzer loads, each independently processed) generalizes to any electric-piano/pad source** — the reusable lesson is differentiated processing per instance, not the specific plugins.
- **The "cut both ends hard + reverb + tremolo = sampled from a record" vocal-bus recipe** is a reusable era-simulation move for any from-scratch part that needs to read as genuinely sampled rather than merely vintage-flavored.
- **Write-slow-then-Warp-stretch-up** generalizes to any beat where the target tempo makes the chord/vocal writing stage feel rushed — write at a comfortable slower tempo, stretch the finished bed up afterward.

## Notes

- No exact EQ frequencies, reverb decay/mix values, or delay time/feedback settings were given on screen beyond the qualitative descriptions above ("heavy," "cut the lows and some of the mids") — treat every device's setting as a starting point to dial in by ear.
- The named **free Juno emulation** plugin is unconfirmed by exact product (likely TAL-U-NO-62 given the free/Juno-60-style description) — flagged on [[Plugin Wishlist]] for identification; [[Model 84 Polyphonic Synthesizer]] is the owned Juno-106 stand-in in the meantime.
- Sibling chain in the same R&B-sample lane, same reference artist: [[Bryson Tiller Vocal Chain]] (his own lead-vocal treatment, a separate breakdown) and [[2000s R&B Piano Sample Chain]] (the real-sample-flip, restrained-processing counterpart to this chain's fabricate-it-from-scratch, heavy-processing approach).

**Sources:** loner — [how to make smooth rnb beats for bryson tiller from scratch (no samples)](https://www.youtube.com/watch?v=ZMB_sqF_Y3Q) (00:11:34, 2020-10-02) · full note: [[how to make smooth rnb beats for bryson tiller from scratch (no samples)]]
