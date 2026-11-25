---
type: plugin
title: "Doubler2"
category: Pitch/Vocal
vendor: "Waves"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Doubler2

![[Images/Doubler2.png]]

**Category:** Pitch/Vocal
**Vendor:** Waves

## What it is

Waves' vocal/instrument doubling plugin creating up to 2 additional voices via pitch/timing variation to simulate double-tracking.

## What it's used for

Fast artificial double-tracking on vocals or instruments without recording additional takes.

## FX chain notes

Used late in a chain, after EQ/compression, blended in parallel with the dry signal.

## Techniques

- **The doubler audibility test: never chorus/phasey, and the proof it's working is that pulling it out is audibly worse.** Greg Wells: "a little bit of kind of a doubler effect is nice if it doesn't sound phasey, if it doesn't sound like a chorus thing." On a "raging rock track," a little doubling avoids having to turn the vocal fader up — target is you never consciously notice it while it's on, but "if you take the doubler out, it's like — what happened, why doesn't it sound as good." Owned-lane read: keep Modulation Rate/Depth low enough that the doubled voices don't wander into obvious chorus territory — that's the "phasey" failure mode named directly. *(qualitative — no detune/delay/mix values given)* → [[Artificial Double Tracking (ADT)]], [[Depth and Space]], [[1 Main Vocal Track]] — Greg Wells (Mix with the Masters), [[Bringing vocals out of the speakers with Greg Wells]]
- **The "basic" doubler slot in a fixed, always-the-same tracking-vocal chain — light width, not a wide effect.** Last stage of Kuk Harrell's go-to chain (EQ → light comp → RVox → reverb/delay sends → **this plugin**): "the simple, the basic doubler, just to kind of spread his voice out just a little bit." Reached for on every session identically, alongside a fixed R-Verb medium-hall + H-Delay quarter-note-ping-pong send pair, and built live into the artist's headphone monitor while tracking. *(qualitative — no voice count/detune/mix values given)* → [[Modulation]] (effect), [[Width and Stereo]], [[1 Main Vocal Track]] — Kuk Harrell, [[Radio-ready vocal effects with Kuk Harrell]]
- **Doubler as a permanent lead-vocal width stage, automated up across the song** — iZotope Vocal Doubler inserted directly on the *lead* vocal (not a separate double track), wet mix automated from ~50% in the first half of the song up to ~90% in the second half, for a progressively widening "3D" texture across the arrangement rather than a static setting. Owned equivalent: [[Doubler2]] Dry/Wet automated 50% → 90% on the lead itself → [[Stereo Field]]. — Illangelo, [How Illangelo mixes The Weeknd's vocals](https://youtube.com/shorts/fG2s168La_E?is=dN4ixQppvlexuZOz)
- **~20% mix, always-on, on everybody** — Kenny's old template ran a subtle doubler on every voice: "doesn't make it sound like two of them or spread — just a little bigger." (By 2022 he dropped it in favor of real doubles; use it when a real double isn't available) — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk)

## Used in my chains

The **fake-double fallback** — used only when a real second take isn't available (a real double always wins):

- **[[1 Double Vocal Track|Double Vocal Track]]** — *not a slot; the fallback*: 2 voices, Detune ~8–12 cents, Delay ~15–25 ms, Dry/Wet ~20% for "bigger, not doubled." If the part matters, record the real double instead.

The **automated width finisher** — a second, distinct use-case: on the lead itself, not a fallback:

- **[[1 Main Vocal Track|Main Vocal Track]]** §5 Track FX (optional) — inserted directly on the lead, Dry/Wet automated ~50% → ~90% across the song for a progressive 3D-widening arc (Illangelo/After Hours technique) — see the plugin's own Techniques above.

## Key Parameters

```visual-key
image: Images/Doubler2.png
coords: Images/Doubler2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Voices (×2) | Number of simulated doubled voices generated from the source | Both voices on for width; one for a single asymmetric slap-double | — |
| ② | Detune (per voice) | Pitch offset in cents from the source (the "not quite in tune" of a real double) | 8–12 cents reads as human; 20+ starts to chorus/warble | — |
| ③ | Delay (per voice) | Timing offset in ms — the gap that makes it a double, not a unison | 15–30 ms for a natural double; under ~10 ms fattens rather than doubles | — |
| ④ | Gain (per voice) | Level of each doubled voice under the dry | Keep well below the dry so it thickens without becoming a visible second vocal | — |
| ⑤ | Pan / Stereo Rotation | Placement/spread of the voices across the stereo field | Hard-pan the two voices for a wide LCR double; center for a mono fatten | — |
| ⑥ | Modulation — Rate / Depth | LFO that slowly drifts detune/delay so the double sounds alive, not static | A little depth stops the double from sounding like a robotic clone | Greg Wells: keep this low enough that the double never sounds "phasey" or "like a chorus thing" |
| ⑦ | EQ (Freq / Gain) | Tone-shapes the doubled voices relative to the dry | Roll a little top off the doubles so they sit behind the lead, not beside it | — |
| ⑧ | Dry/Wet | Balance of doubled voices vs. the original | ~20% for subtle Kenny-style width; higher only for an obvious effect | — |

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
