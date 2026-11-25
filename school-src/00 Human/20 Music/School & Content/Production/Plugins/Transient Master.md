---
type: plugin
title: "Transient Master"
category: Compressor/Limiter
vendor: "Native Instruments"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Transient Master

![[Images/Transient Master.png]]

**Category:** Compressor/Limiter
**Vendor:** Native Instruments

## What it is

Native Instruments' simple two-knob transient shaper (attack/sustain), one of the most widely used transient-design tools.

## What it's used for

Adding or reducing punch and sustain on drums, bass, and percussive elements.

## FX chain notes

Used before or in parallel with compression, since it reshapes transients directly.

## Techniques

- **Owned best-match for a third SPL-style transient-designer use case: a very subtle attack boost on a drum tracking-stage underneath/bottom mic, A/B'd to show just how light the touch is.** "Here's the 56s and the 56, as I mentioned to you, I was right with the SPL — let me give you an A/B on that, SPL — and as you can see, it's not a lot, it's just subtle, just add a little bit of attack." Same hardware family as the other two SPL Transient Designer uses already logged below (Marcella Araica's printed-stem pass, Tony Maserati's attack-reduction move) — this one specifically demonstrates the low end of the Attack knob's useful range, not a heavy push. *(no attack amount given — qualitative, "subtle")* → [[Drum Mic Technique]], [[TRANSIENT Slot]] — Mix with the Masters (Jack Joseph Puig), [[Tracking drums with Jack Joseph Puig]]
- **Kept loaded on toms and drum loops as a standby tool alongside [[Decapitator]] and an SPL Transient Designer, used only when a specific hit needs transient shaping — not applied as a blanket default.** "As you see on the toms and the drum loops, I have Decapitator, Transient Designer and Transient Master in case I need to do any transient love." Fits the same "already-great source, minimal-intervention" philosophy the same mixer applies to drums generally: "I didn't do anything to the kicks... I just messed with the blend, I didn't change anything that didn't need to be changed." → [[Decapitator]], [[2 Drums Group]], [[Mix Handoff]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Owned best-match for an SPL Transient Designer hardware unit used to shape kick and snare on an analog board before printing them back as individual stems.** "I have put them out onto the board, did some EQ, and I've processed them with the transient designer... printed back with all the processing that I did on the board for the EQ and what I've done on the SPL transient designer." The hardware unit (SPL's own dedicated Transient Designer, a well-known two-knob attack/sustain hardware processor) is the direct hardware ancestor of this plugin's own attack/sustain concept — same core move (independent attack/sustain shaping, level-independent, unlike a compressor), just outboard instead of in-the-box, applied at the tracking/printing stage rather than mixing. *(no attack/sustain amounts given — qualitative)* → [[Committing and Printing]], [[TRANSIENT Slot]], [[Plugin Wishlist]] — Mix with the Masters (Marcella Araica), [[Printing stems through analog equipment with Marcella Araica]]
- **Owned best-match for "Transient Designer"-style attack reduction on a non-drum source — decreasing a guitar synth's already-left-heavy attack specifically so it blends with a string/cello part rather than fighting it.** "The guitar synth part is kind of feeling already like it's a bit left-heavy. Its attack is already a bit left-heavy. I might be able to decrease that... maybe a bit of Transient Designer on there, that might help decrease that attack a bit... now what I'm doing is getting rid of that attack." The blend goal for a string + guitar-synth + cello combination wasn't matching the parts' transients, it was pulling one part's attack DOWN enough that all three read as one blended texture instead of three competing onsets — a reminder this device's attack knob works below zero for exactly this melodic-blend case, not just the usual poke-a-drum-forward use above. *(no exact amount given)* → [[TRANSIENT Slot]], [[Masking and Carving]], [[Tony Maserati Vocal Chain]] — Tony Maserati (Mix with the Masters), [[Vocal chain with Tony Maserati]]
- **Run this after low-level (upward) compression, not instead of it, for loudness that keeps its transient punch.** Low-level compression amplifies the quiet parts of a signal while leaving peaks alone — louder overall, but less dynamic, and with transients *not* truncated the way heavy downward compression would leave them. This plugin's job on top of that: expand what's left of the peaks even further, described as "a special form of expansion" that captures and boosts only the transient — called out specifically as ideal for **snares, kicks, and other instruments with a quick transient**, which lines up with this note's own kick/snare slot settings below. → [[Compression]] — Sage Audio, [How to Master Loud and Clear Without Sounding Harsh](https://www.youtube.com/watch?v=cy-S6YmVe2U)
- **Poke a buried snare** — attack up, sustain down a touch until the hit "pokes" through the loop, then back off if it is too much; his go-to after shortening the sample and before EQ — Lophiile, [Make Your Drums Slap](https://www.youtube.com/watch?v=v4ZhwlhF5yE)

## Used in my chains

My **transient shaper** — adds attack/punch or shortens sustain independent of level (level-independent, so it works where a compressor can't):

- **[[1 Drums Kick Track|Kick]]** — *slot 2, punch*: Attack +10–30%, Sustain to taste (down = tighter, up = roomier), trim output (added attack raises peaks).
- **[[1 Drums Snare-Clap Track|Snare]]** — *slot 2, snap*: Attack +10–25%, Sustain down for tight trap / up for roomy rock.
- **[[1 Drums Hat Track|Hats]]** — *slot 3, definition*: Attack + for tick definition, or Sustain − to shorten washy open hats.
- **[[2 Drums Group|Drums Group]]** — *slot 4, punch restore*: Attack +5–15% to give back the punch bus compression took.

## Key Parameters

```visual-key
image: Images/Transient Master.png
coords: Images/Transient Master.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Attack | Boosts (+) or softens (−) the transient/attack portion | +10–30% for kick/snare punch; − to tame a spiky source | — |
| ② | Sustain | Lengthens (+) or shortens (−) the body/tail | Down for tight/trap, up for roomy/rock; down on washy open hats | — |
| ③ | Smooth / Limiter | Rounds the processed transients to avoid clicks/overs | Engage when pushing Attack hard so the added peaks don't distort | — |
| ④ | Gain / Output | Makeup — Attack boosts raise peak level | Trim so the shaping isn't just "louder"; watch the meter | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
