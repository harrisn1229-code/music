---
type: plugin
title: "UAD UA 1176LN"
aliases: ["UAD 1176", "UAD UA 1176LN Rev E"]
category: Compressor (FET)
vendor: "Universal Audio"
platform: UAD Console
tags: [plugin, uad]
manual_enriched: true
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
video_enriched: true
briefed: backlog
---

# UAD UA 1176LN

![[Images/UAD UA 1176LN.png]]

**Category:** FET Compressor
**Vendor:** Universal Audio — SE/Legacy version in the Apollo stock bundle ([[Universal Audio Apollo Twin MkII]])

## What it is

Emulation of the 1176 FET limiting amplifier — the fastest attack in the business (20–800 *micro*seconds). Where the [[UAD Teletronix LA-2A]] rides, the 1176 grabs.

## What it's used for

Peak control and attitude: drums, aggressive vocals, strummed acoustic when the pick transients spike. Also the classic serial partner (1176 catches peaks → LA-2A levels).

## Key settings (tracking)

- **Ratio:** 4:1.
- **Attack:** 3–4 (medium-slow for the 1176 — lets the pick/consonant through). Counter-intuitive: higher number = *faster* on an 1176.
- **Release:** 6–7 (fast, ~50 ms — resets before the next strum).
- **Input:** drive to 2–4 dB GR on peaks only; **Output** to unity.
- Never "all-buttons" on the way in — that's a mix decision.

## FX chain notes

Alternative to the [[UAD Teletronix LA-2A]] in `uad_console` chains when the part is percussive rather than smooth — see [[1 Acoustic Guitar Track|Acoustic Guitar Track]].

## Techniques

- **Via the [[UAD Spark]] suite's "X 1176" version, a preset called "Bass Squeeze" run on the bass bus, plus a stage in a dedicated ad-lib vocal chain.** Myles Smith / Peter Fenn: light bass-bus compression via the "Bass Squeeze" preset (their live bass + sub bass combo); separately, part of a saved "Milesauce" ad-lib chain (Decapitator → this → Capitol Chambers reverb) for a driven, thickened vocal-ad-lib texture; also on the doubled mandolin part in *My Mess*. → [[Decapitator]], [[Vocal Stacks and Ad-libs]] — Myles Smith / Peter Fenn (Tape Notes), [[TN 184 Myles Smith & Peter Fenn - Full Video Episode]]
- **The "Album Ready Vocal" factory preset run as one stage inside a much longer heavily-layered vocal chain, not a single-compressor solution.** Part of a stacked chain totaling an estimated ~20dB of gain reduction across ~4-5 compressors on a single vocal, deliberately pushed hard to make a freshly recorded take "sound like it's been sampled." Sits after [[MicroShift]]/Eventide Discord4 widening, before a slow/gentle late-stage compressor. → [[Compression Staging]], [[1 Main Vocal Track]] — Overmono (Tape Notes), [[TN 187 Overmono - Full Video Episode]]
- **Owned best-match for a CLA-76 used to genuinely SHAPE (not just control) a hip-hop/trap percussion loop — bypass-checked to confirm it's doing real character work, not just gain-riding.** Jaycen Joshua, on a tambora/percussion loop: "it was given to me with the CLA-76, I guess that's his go-to compressor... he is truly using it and giving it a sound through the plug-in — if I took this plug-in off, you could see how much it's taking away, it distinctively changes the sound. So I commit." First stage of a longer loop chain (compressor → [[Decimort 2|Lo-Fi/bitcrush]] → [[Pro-Q 4|EQ]] → creative noise suppressor) — see [[Masking and Carving]]. → [[Decimort 2]], [[Pro-Q 4]], [[Committing and Printing]], [[Jaycen Joshua on creative drum mixing]] — Mix with the Masters (Jaycen Joshua), [[Jaycen Joshua on creative drum mixing]]
- **A textbook parallel-compression demo on a snare, run as this unit paired with [[UAD Pultec EQP-1A]] blended under the dry signal — not a serial insert.** Bob Clearmountain, A/B/C'ing a snare live: dry → EQ-only pass (top end, ~700 Hz boost, a bit of low end) → a compressed pass through this unit ("1178" in the auto-caption, almost certainly the 1176) + the Pultec → the two blended together. "You get a little bit of the natural sound but you get that compression." Named specific payoff beyond density: on a rolled/rudimented passage, the parallel layer brings up the quieter in-between/ghost notes along with the accented hits, not just the loud ones. → [[UAD Pultec EQP-1A]], [[Parallel Processing]], [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] — Mix with the Masters (Bob Clearmountain), [[Bob Clearmountain's mixing techniques]]
- **Owned best-match for a hedged, unconfirmed mention of a hardware stereo bus compressor across a live piano signal path.** Paul Epworth, on the piano tracking chain for Adele's "Rolling in the Deep": "to record the piano, I think we'd have definitely gone through... probably the best stereo compressor that was available in the studio at the time. It may well have been a 1178 or something." Not a confirmed unit or setting — Epworth is speculating from memory, not reading off the session — but the 1178 (UREI's dual-1176-in-one-chassis stereo unit) makes this unit the direct owned equivalent if it was in fact an 1176-family compressor. *(Speculative/qualitative only — no GR, ratio, or attack/release given; flag accordingly if reused.)* → [[1 Acoustic Piano Track|Acoustic Piano Track]], [[Vintage Gear Worklist]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **Owned best-match for a CLA-76 stage inside a parallel "girth" vocal aux — duplicate the vocal's master aux, EQ it (default filter, cut a little low/high), hit it with this unit ("smashing" but not fully), then blend the parallel signal back at roughly −33 dB.** "Then it's smashing an 1176, well I guess not a whole smash, but it's hitting an 1176. The CLA-76 is kind of like, you know, it's an older plug-in, but it still works very well... when I'm sending light to these parallel guys, it's to give the vocal some more girth or some more feeling or some more sound... it's a little darker, kind of just opens it up for me. And this is down, you know, −33, so it's down there, but it's doing something. To me, it sounds better." Stated as a general fix for a "make the vocal fuller/louder" revision that beats just raising the fader. Waves CLA-76 itself is a different, unowned product from this UAD unit but functionally the same fast-FET-smash role — no wishlist entry needed since this note already covers the lane. → [[Pro-Q 4]], [[Parallel Processing]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Owned best-match for a Chris Lord-Alge-signature 1176 built into a dedicated PARALLEL PERCUSSION bus for a film/game score — blended with a Pultec-style top-end EQ, then mixed back under the dry stem for snap, rather than run at 100% wet.** "I'm going to try adding a little bit of the Chris Lord-Alge 1176, in addition to... a little bit of the JJP Puig Tech, some top end from that. Let's see what happens if I blend in a little bit of that — see if we get a little snap out of it." Framed explicitly as a per-STEM move rather than per-element or whole-mix: because film/game scoring delivers separate stems (not one locked mix), a single overall compressor can't be used the way pop mixing uses one — so the parallel 1176 treats the whole percussion stem as one unit instead. Matches this vault's own [[Parallel Comp Send]] chain shape (fast FET compressor → EQ, on a send) — start from that chain's documented fast-attack/fast-release/heavy-GR default and back off since it's being blended in here, not committed hard. *(no exact ratio/attack/release/GR given — qualitative)* → [[UAD Pultec EQP-1A]], [[Parallel Comp Send]], [[Parallel Processing]], [[TRANSIENT Slot]], [[3 Drums Bus|Drums Bus]] — Mix with the Masters (Alan Meyerson), [[Adding impact to percussions with Alan Meyerson]]
- **The other half of Michael Brauer's "compressors are big tone machines" pair (with [[UAD Teletronix LA-2A]]) — reached for on a vocal for its FET color, not always for its gain reduction.** Greg Wells describing Brauer's approach: "I love how he uses them to create different colors and different vibes — even if he's not even really engaging the gain reduction in the compressor, he'll just route things through different compressors." This note's own Manual section already documents the mechanism that makes it possible on this unit specifically: **Attack fully counterclockwise = OFF**, which "disables gain reduction entirely while signal still passes through the 1176's circuitry" — the documented way to add 1176 FET saturation/color with zero actual compression, exactly the move Brauer's philosophy describes in general terms. *(secondhand — Wells describing Brauer's approach, not Brauer's own demo)* → [[Compression]] (effect), [[Compression Staging]], [[UAD Teletronix LA-2A]] — Greg Wells (Mix with the Masters), [[Bringing vocals out of the speakers with Greg Wells]]
- **Confirmed real-world use as the fast/transient stage of a two-compressor series pair on a hit vocal — a channel EQ ("1081") into this unit, then into the [[UAD Tube-Tech CL 1B mkII|CL 1B]].** Tom Elmhirst names the analog chain directly on Adele's "Rolling in the Deep": "as we know it's a 1081, going into a Yuri, and a Tube-Tech CL1B" — a console EQ feeding a fast FET compressor (this unit, standing in for the Urei/UREI 1176) feeding a slow opto compressor. No settings given (the video shows the routing, not the dial-in), but the ordering itself is the confirmed real-record evidence for the exact fast-then-slow series pairing this note's own "Used in my chains" and the Ben Baptie/Julian Casablancas Techniques entry above both already document — worth treating that pairing as standard practice, not a niche trick. → [[UAD Tube-Tech CL 1B mkII]], [[Compression Staging]], [[1 Main Vocal Track]], [[Plugin Wishlist]] — Mix with the Masters (Tom Elmhirst), [[Tom Elmhirst breaks down his mix of 'Rolling in the Deep' by Adele]]
- **Fast attack AND fast release, fed by a boosted low end from the EQ ahead of it, makes the 1176 react to and grab the vocal's bass response too — not just peaks.** In a chain running [[UAD Pultec EQP-1A|Pultec]] (boosted ~100 Hz) → 1176 (fast/fast) → [[UAD Tube-Tech CL 1B mkII|CL 1B]], the fast 1176 "grabs the base response as well quite quick" specifically because the Pultec handed it a hotter low end — "you're adding and making a compressor work a bit harder than it actually would do if it didn't have the bottom end in there." The result reads as the compressor exciting the vocal, not just controlling it. Reusable move: EQ-boost the low end feeding a fast compressor when you want it to react to the bottom, not only the loudest transients. → [[UAD Pultec EQP-1A]], [[Compression Staging]], [[Compression]] — Mix with the Masters (Ben Baptie), [[Julian Casablancas' vocal sound with Ben Baptie]]

## See also

- Plugins: [[UAD Teletronix LA-2A]] · [[FETish]] · [[Pro-C 2]]
- Effects: [[Compression]]
- Techniques: [[Compression Staging]] · [[Parallel Processing]]

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/UAD UA 1176LN (hardware - 1176LN).pdf|Local PDF]] · [Universal Audio 1176LN Solid-State Limiting Amplifier User Guide, official manual for the original hardware reissue](https://media.uaudio.com/assetlibrary/1/1/1176ln_manual.pdf)

**High-level points:**
- **Attack and Release run backwards from most gear**: both knobs get *faster* turned clockwise and *slower* turned counterclockwise — the opposite of nearly every other compressor. The manual calls this out explicitly since it trips up anyone used to normal conventions.
- **Attack fully counterclockwise = OFF**, not "slowest" — this disables gain reduction entirely while signal still passes through the 1176's circuitry, which is the documented way to add 1176 "color" (the FET saturation/tone) with zero actual compression.
- **Input knob sets both level AND threshold** — there's no separate threshold control. Raising Input raises how hard the signal hits the (fixed) threshold, so "drive it harder" and "compress it harder" are the same knob.
- **Ratio buttons (4/8/12/20) are mutually exclusive in normal use, but pressing all four together is a documented, intentional mode** ("All-Button"/"British Mode") — not a malfunction. It causes a lag on the attack of initial transients, constantly shifting attack/release/bias points, and radically increased distortion; the meter often pins at maximum. UA's own manual says engineers love this on drums/room mics and for "dirtying up" bass, guitar, or making vocals sit "in your face."
- **12:1 and 20:1 aren't just "more compression"** — the manual frames 4:1/8:1 as compression ratios and 12:1/20:1 as the unit switching into limiting behavior, with the threshold set higher at those ratios.
- **Meter Function buttons double as the power switch** — depressing any Meter button other than OFF powers the unit on; OFF powers it off. The same four buttons choose what the VU meter reads: Gain Reduction, or output level referenced to +4 dBm or +8 dBm.
- **Recommended dial-in order** (from the manual's own quick-start): Input/Output to ~24 (12 o'clock, unity) → pick Ratio → Attack/Release to ~4 (12 o'clock) → meter to GR → raise Input until desired gain reduction shows → fine-tune Attack/Release for the material → switch meter to +4/+8 and raise Output to make up any lost level.

## Used in my chains

My **fast FET compressor** — catches transients the slow opto lets through, adds punch/attitude. Fast attack, fast release, a few dB GR (or all-buttons-in for crush). [[FETish]] is the free native stand-in:

- **[[1 Drums Kick Track|Kick]]** / **[[1 Drums Snare-Clap Track|Snare]]** — *slot 2*: 1–2 dB on peaks (skip on consistent one-shots).
- **[[1 Digital Bass Track|Digital Bass]]** — *slot 2, compressor*: fast FET control on the bass.
- **[[1 Drums Hat Track|Hats]]** — *slot 2*: skip on one-shots.
- Lo-fi vocal lane: [[Shure SM57]] → **1176 slammed** → [[Decapitator]] (crushed section vocal).

## Key Parameters

```visual-key
image: Images/UAD UA 1176LN.png
coords: Images/UAD UA 1176LN.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Input | Sets input level **and** threshold (Input is post-Input, pre-threshold in one knob — no separate threshold control). Higher = more gain reduction. | Dial to 2–4 dB GR on peaks only for tracking (see Key settings above); this is the primary "how much compression" control, not Ratio. | — |
| ② | Output | Post-gain-reduction output level (make-up gain). Doesn't affect the compression itself. | Set to unity after dialing Input/Ratio/Attack/Release, monitored via the +4/+8 meter mode. | — |
| ③ | Attack | 20–800 microseconds, **fastest fully clockwise, OFF fully counterclockwise** (reversed convention vs. most compressors). | Medium-slow (3–4 on the dial) lets pick/consonant transients through before clamping — counter-intuitively this is a *higher* number on the 1176. Fully off adds FET color with zero gain reduction. | Fast on a lead vocal, paired with a boosted low end ahead of it, to grab bass response as well as peaks — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ④ | Release | 50 ms – 1100 ms, fastest fully clockwise, slowest fully counterclockwise (same reversed convention as Attack). | Fast release (~50 ms, dial ~6–7) resets before the next transient/strum; too fast causes audible pumping/breathing, too slow lets a loud section's gain reduction bleed into a quiet one. | Fast, alongside fast attack, on the same lead vocal — quick recovery keeps it reacting to the voice's dynamics — Ben Baptie, [[Julian Casablancas' vocal sound with Ben Baptie]] |
| ⑤ | Ratio (4/8/12/20) | Four mutually-exclusive buttons: 4:1 and 8:1 = compression (moderate/severe); 12:1 and 20:1 = limiting (threshold set higher). All four pressed together = "All-Button" mode — a documented extreme-distortion effect, not a fault. | 4:1 for tracking-transparent leveling; All-Button on drum room mics/ambience, or to deliberately dirty up bass/guitar/vocal. | Classic 1176 → LA-2A serial pairing: 1176 catches transient peaks first, LA-2A handles smooth program-level leveling after. |
| ⑥ | Meter | Standard VU meter; reads either Gain Reduction or output level depending on the Meter Function setting. | Switch to GR while dialing Input/Ratio, then to +4/+8 to confirm final output level before committing. | — |
| ⑦ | Meter Function (GR / +8 / +4 / OFF) | Selects meter display AND powers the unit — pressing any button but OFF turns the 1176LN on. | Leave on GR during compression setup, flip to +4/+8 only to check final gain-staged output level. | — |

## See also (Key Parameters cross-links)
Palette: [[BASS Slot]] — Effects: [[Compression]] · [[Compression Staging]] · [[Gain Staging]]
