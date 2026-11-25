---
type: plugin
title: "UAD Tube-Tech CL 1B mkII"
category: Compressor (Opto)
vendor: "Universal Audio"
platform: UAD Console
tags: [plugin, uad]
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
video_enriched: true
---

# UAD Tube-Tech CL 1B mkII

![[Images/UAD Tube-Tech CL 1B mkII.png]]

**Category:** Optical (tube) Compressor
**Vendor:** Universal Audio — emulation of the Tube-Tech / Lydkraft CL 1B mk II hardware. Owned.

## What it is

Emulation of the Tube-Tech CL 1B — a tube-driven optical compressor famous for smooth, program-dependent gain reduction and silky tube warmth. Where the [[UAD UA 1176LN]] (FET) *grabs* transients, the CL 1B *rides* the whole phrase like a fader. The **mkII** adds a switchable sidechain HP filter and a wet/dry (parallel) mix control over the classic model.

## What it's used for

The go-to opto leveler on the way in — lead and stacked vocals especially. Gentle 2–4 dB GR that glues level and prints tube silk without clamping peaks. Also great on bass and anything that wants smoothing rather than transient control.

## Key settings (tracking)

- **Ratio:** ~2:1–3:1 (soft, musical — not a peak grab).
- **Attack:** fast (or the mkII's fixed setting) so it engages cleanly; **Release:** slow / auto so it decelerates like a fader.
- **Gain reduction:** 2–4 dB — a ride, not a crush. Make-up gain to unity.
- **Sidechain HP filter (mkII):** engage so low-end doesn't pump the gain.
- **Wet/dry:** keep ~100% when printing on the way in — parallel is a mix-phase move.

## FX chain notes

Console **tracking compressor** in the `uad_console` vocal chains — [[1 Main Vocal Track|Main Vocal Track]] §3.2, and inherited by [[1 Harmony Vocal Track|Harmony]], [[1 Backup Vocal Track|Backup]], [[1 Double Vocal Track|Double]], and [[1 Main Vocal High Track|Main Vocal High]]. Replaced the [[UAD UA 1176LN]] here (opto ride in, fast peak-precision now on [[Pro-C 2]] mid-chain). Pairs with the [[UAD Teletronix LA-2A]] on the [[3 Vocal Bus|Vocal Bus]] — two smooth opto stages bracketing one fast stage ([[Compression Staging]]).

## Techniques

- **Won a two-compressor audition on background vocals through a Tube-Tech-style channel strip by doing almost nothing audible — chosen over an "R Compressor" (Waves Renaissance Compressor) alternative.** "On the background vocals I'm choosing to use the Tube-Tech channel where I get a little bit more flexibility. I'm not doing anything really, it ends up all I'm doing is using the CL 1B. I'm also trying an R Compressor." A legitimate audition outcome: the more transparent unit won by leaving the BVs basically untouched rather than by adding character. *(qualitative — no ratio/GR given)* → [[Pro-C 2]], [[Compression]], [[Compression Staging]], [[Tony Maserati Vocal Chain]] — Tony Maserati (Mix with the Masters), [[Vocal chain with Tony Maserati]]
- **Confirmed real-world use as the closing opto stage of a three-unit analog vocal chain on a hit record — a channel EQ ("1081") → [[UAD UA 1176LN|1176]] → this unit.** Tom Elmhirst names the chain directly on Adele's "Rolling in the Deep": "as we know it's a 1081, going into a Yuri, and a Tube-Tech CL1B." No dial-in settings shown (the video demonstrates the signal routing, not the parameters), but it's real-record confirmation of exactly the fast-1176-then-slow-CL1B series order this note's own Techniques entry above and "Used in my chains" section already document as the house pairing — worth treating as standard, proven practice on a lead vocal, not just a documented theory. The vocal's effects afterward (reverb + two delays) are also introduced in stages across the song rather than all at once — see [[Arrangement and Song Form]]. → [[UAD UA 1176LN]], [[Compression Staging]], [[1 Main Vocal Track]], [[Plugin Wishlist]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **A slow leveler stage placed AFTER a fast FET compressor, purely to round the voice off consistently regardless of how loud/quiet the performance gets — no character-shaping intent.** In a chain running [[UAD Pultec EQP-1A|Pultec]] (boost bottom) → [[UAD UA 1176LN|1176]] (fast attack/release, catches peaks + reacts to the boosted bass) → CL 1B (much slower attack/release than the 1176), the CL 1B's job is described purely as leveling: "no matter how far he's going or quiet he is, it's just constantly rounding off the voice quite nicely." A clean real-world example of this note's fast-then-slow staging pattern (see [[Compression Staging]]) with two *different* character units rather than the classic 1176→LA-2A pair. → [[UAD UA 1176LN]], [[UAD Pultec EQP-1A]], [[Compression Staging]] — Mix with the Masters (Ben Baptie), [[Julian Casablancas' vocal sound with Ben Baptie]]
- **Best-match owned equivalent for a "valve compressor" stage on a jazzy R&B counter-melody guitar, sandwiched between Cassette crunch and a fruity delay.** Recreating PARTYNEXTDOOR's "Joy" mood: a Kontakt "Evolution Strawberry Bank" guitar filling the gaps before piano chord hits runs valve compressor → [[Cassette]] crunch → delay → EQ (cut low + harsh mid-range); the last bar is separately time-stretched then reversed for a unique cadence. *(general starting point — no exact ratio/threshold given on screen)* → [[Cassette]], [[Kontakt 7]], [[EQ Eight]], [[Sound Selection Guide]] — loner, [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU)
- **Best-match for a "valve compressor" tightening a Postcard Piano lead, mid-chain between a register-carving EQ and a vintage verb.** On a chill/ambient Frank Ocean-style beat, the piano's 5-stage chain runs EQ (cut low + high, to separate the piano from the Rhodes/Lounge Lizard chord bed) → **valve compressor** ("just to tighten the sound up a bit") → [[ValhallaVintageVerb]] → [[ValhallaDelay]]. *(general starting point — no exact ratio/threshold given)* → [[EQ]], [[ValhallaVintageVerb]], [[ValhallaDelay]], [[Frank Ocean Chill Ambient Chain]] — loner, [how to make chill ambient beats for frank ocean (sad/melodic chord technique)](https://www.youtube.com/watch?v=whI75NJcom8)
- **Best-match owned equivalent for a "valve compressor" tightening an uneven guitar take.** After an AmpliTube amp-sim stage on a simple counter-melody guitar part, a valve compressor levels notes that are "hanging way louder than others" — a straightforward gain-evenness pass, not character-driven — before a Cassette crunch stage and a second amp-preset switch finish the part. → [[Cassette]], [[1 Electric Guitar DI Track]] — loner, [making a soulful afrobeats beat for rema & wizkid from scratch (use voice notes to start ideas!?)](https://www.youtube.com/watch?v=e-KvnLXHAy4)
- **First stage of a vintage-sample-flip processing chain — valve/tube compressor before EQ before room reverb before a denoiser-as-lowpass.** Recreating Jake One's dark, soft-Rhodes sample sound (*Percocet and Stripper Joint*, Future): a valve compressor runs first in the chain, ahead of EQ, a room reverb ("sounds like it's being played next door"), and a noise-reduction plugin used deliberately for its side-effect low-pass character rather than its intended job. *(general starting point — no exact ratio/threshold given on screen)* → [[EQ Eight]], [[UAD RealVerb-Pro]], [[RX Guitar De-noise]], [[Sampling and Sound Selection]] — loner, [the secret samplemaker behind Southside's best beats!?](https://www.youtube.com/watch?v=WLOHe9CJChY)

## Used in my chains

My **tracking compressor** — an optical/tube leveler printed on the way in: rides the whole phrase like a fader and prints tube warmth + silk (the fast peak-precision now lives on [[Pro-C 2]] downstream):

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 2, tracking compressor (UAD Console)*: Ratio 2:1–3:1, Attack fast, Release slow/auto, **2–4 dB GR** (a smooth opto ride, "never past 7 on the needle"). Sidechain HP so low end doesn't pump it; Wet/Dry 100% (parallel is a mix-phase move).

## Key Parameters


> [!warning] The capture for this page is the **non-mkII CL 1B**
> The capture run's browser search resolved "UAD Tube-Tech CL 1B mkII" to **UAD Tube-Tech CL 1B**, and the resulting file is byte-identical to [[UAD Tube-Tech CL 1B mkII]]'s. The mkII's extra controls (sidechain HP, wet/dry mix) are therefore **not** in this screenshot. Left unbadged pending a real mkII capture.
| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold | Level above which opto gain reduction begins | Set for a gentle 2–4 dB GR ride on the way in | — |
| ② | Ratio | Compression ratio | 2:1–3:1 for smooth vocal leveling | — |
| ③ | Attack | Onset speed (fixed or manual on the mkII) | Fast so it catches the phrase, opto smoothness does the rest | Run much slower than a preceding fast-attack 1176, specifically for contrast — the pairing is the point — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ④ | Release | Recovery (fixed / manual / auto) | Slow/auto so it rides the program like a fader | Deliberately slow, used purely as a leveler after a fast FET stage — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ⑤ | Gain | Makeup output | Match bypass — this stage is warmth + level, not loudness | — |
| ⑥ | Sidechain HP (mkII) | High-passes the detector so lows don't drive the GR | Engage so the low end doesn't pump the whole vocal | — |
| ⑦ | Wet/Dry Mix (mkII) | Built-in parallel blend | Keep 100% on the way in; parallel is a mix-phase decision | — |
| ⑧ | In / Out | Bypass / metering | A/B level-matched to judge the tube color fairly | — |

## See also

- Plugins: [[UAD UA 1176LN]] · [[UAD Teletronix LA-2A]] · [[Pro-C 2]] · [[LALA]]
- Effects: [[Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]]
- Palette: [[Sound Palette]]
