---
type: chain
title: Delay Send Other
chain_type: send
family: fx
source: n/a
routing: "Return track — vocals, leads, throws → Vocal Bus"
signal_chain: [EchoBoy, Pro-Q 4, Pro-C 2 (sidechain)]
status: default
tags: [chain, send, delay]
---

# Delay Send Other

**Role:** The rhythmic/synced delay — dotted-8th and quarter-note repeats, ping-pong, ad-lib throws. Where slap adds *size*, this adds *motion and energy* (synced repeats push the groove; reverb just smears it).

## Signal chain

### 1. [[EchoBoy]] — Synced repeats
- **Echo Type: Ping-Pong** (①/⑧ — bounces L↔R) · **Time: dotted 1/8** (③ — the pop/U2 default; 1/4 for a slower throw) · **Feedback 22%** (④ — 2–4 audible repeats) · **Style: analog/tape character on** (② · ⑨) · **Low Cut 200 Hz / High Cut 8 kHz** on the feedback (⑥ — repeats sit behind the dry) · **Mix 100%** (⑦ — it's a return)
- **Why dotted-8th:** it lands off the main beats, so repeats fill the pockets *between* the vocal phrases instead of stacking on them.

### 2. [[Pro-Q 4]] — Filter
- HPF 300–500 Hz · LPF 4–6 kHz — repeats always duller than the source.

### 3. [[Pro-C 2]] — Duck (sidechain from dry vocal)
- 2–3 dB GR keyed from the lead · medium release
- **Simpler alt:** Ableton's stock [[Echo]] has **built-in ducking** (one knob + threshold) — use it when this return runs Echo instead of EchoBoy.
- **Why:** Repeats hide while the line is sung and answer in the gaps — you can run a hot send level and never lose a lyric. Same trick as the long reverb.

## EchoBoy deep tricks
- **Dual Echo polyrhythm:** 1/16 on one side, 1/8 on the other — the classic percussion/vocal stereo motion you hear everywhere without noticing.
- **Rhythm mode as a drum machine:** taps programmed like steps — run a plain hat through it for patterns you'd never write by hand.
- **It contains a chorus and a reverb** (in the style presets) — in a pinch, EchoBoy alone covers delay + chorus + verb on one return.
- **Section automation:** shorter delay in verses, longer in choruses; or build an Audio Effect Rack with chains (slap / 1/8 / 1/4 / ping-pong) and switch per section.
- **Throw track workflow:** for big word-throws, copy the word to a dedicated throw *track* (half-note ping-pong + reverb + a little distortion, 100% wet) instead of automating the send — more control, reusable. 🎬 *From video:* a working pro example of this exact pairing — EchoBoy delay throw + a hall reverb riding directly behind it, printed only on select verse lines rather than run continuously — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
- 🎬 *From video:* Disclosure keep a **second, quick out-of-time stereo delay** just for throws (separate from the main synced delay) — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8); and a **feedback delay ridden to self-oscillation** makes a DJ-friendly extended outro / transition — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU).

## Usage
- Hook vocals · **ad-lib throws:** automate the send up on the last word of a line (the classic rap throw) · synth leads (this send is their main space) · guitar solos.
- 🎬 *From video:* run TWO instances of this send together at the chorus — a standard synced eighth-note delay (as documented above) PLUS a second, wider eighth-note delay panned hard to the extremes for a panoramic left-right spread — Elmhirst's own description: "there's two different delays, there's an eighth note just doing standard eighth note, and then there's this other eighth note going off to the canyon... so it's much more panoramic, left and right." Both are introduced at the SAME structural moment (the chorus), on top of a reverb send already brought in one section earlier at the bridge — see [[Arrangement and Song Form]] for the full staged build. The wide pair reads as "a bed of lovely atmospherics behind her vocal" without eating up room in the mix, despite being two simultaneous delay returns. → [[Arrangement and Song Form]], [[Reverb Send Long]], [[1 Main Vocal Track]], [[Width and Stereo]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]

## Variations
- **Trap quarter-triplet throws:** time 1/4T, feedback higher (40%), automate in for single words.
- **Dub/experimental:** feedback 50%+ momentarily and *ride it* — self-oscillation as a transition FX.

## From videos

- **Confirms this send's own §3 duck (Pro-C 2 sidechained from the dry vocal) as a universal, plugin-agnostic recipe — usable to duck any reverb or delay, not just ones with built-in ducking.** Pair with a 200–400 Hz EQ dip on the return (this send's existing HPF/LPF plus that specific masking-range carve) as the second half of the fix. → [[Sidechaining]], [[Masking and Carving]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)
- **Two instances of this send run together at the chorus — a standard eighth-note delay plus a second, wider eighth-note delay panned hard for a panoramic spread — see the inline 🎬 note in Usage above.** → [[Arrangement and Song Form]], [[Reverb Send Long]], [[Width and Stereo]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **A short tap plus a quarter-note tap, built inside one combined reverb+delay plugin instead of two separate sends.** "We'll do a little delay here, and then the second one will be quarter note" — CLA reaches for Waves CLA Epic (unowned) specifically so the short-tap+quarter-note pairing lives in one plugin ("it's all in one... rather than trying to build something from scratch"). Owned-lane equivalent for the same pairing: this send at **Time 1/4** (instead of the default dotted-1/8) running alongside [[Delay Send Slap]] for the short tap. *(qualitative — feedback/mix not given)* → [[Delay Send Slap]], [[Reverb]] (effect), [[Plugin Wishlist]] — Chris Lord-Alge (Mix with the Masters), [[Chris Lord-Alge processing vocals]]
- **EchoBoy delay throw + hall reverb, paired directly and printed only on specific verse lines, not two independent sends.** "I also had a delay throw in here with a reverb on it on certain lines that he said in the verse. I'm using the EchoBoy for that delay throw. Followed by a hall verb." — confirms this send's throw-track workflow as a real pro recipe, with the specific addendum that the reverb rides the same selected words as the throw for a bigger accent than either alone. → [[ValhallaRoom]], [[Reverb]] (effect) — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
- **One EchoBoy setting, five subdivisions** — his 1/4, 1/8, 1/16, slap and 1/2 sends are the *same* [[EchoBoy]] patch varied only by note value, band-limited with EchoBoy's internal high/low cut — every delay in the song shares one tone family — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8)
- **The throw/effects track** — drag the last word of a line onto a dedicated track with a loud **insert** EchoBoy (high end cut, subdivision changed per throw) + a ducked long-reverb send: the delay throw as an arrangement event, not an always-on send — Kenny Beats, [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) → [[Automation]]
