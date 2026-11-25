---
type: plugin
title: "Gem Dopamine"
category: EQ
vendor: "Overloud"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Gem Dopamine

![[Images/Gem Dopamine.jpg]]

**Category:** EQ (air enhancer / de-esser)
**Vendor:** Overloud

## What it is

Overloud's **enhancer** — an emulation of two classic Dolby-A-style tape-encoding processors. It adds airy top-end sheen by dynamically re-balancing the harmonics *already* in the signal (not synthesizing new ones like a typical exciter), and its dynamic action de-esses as it brightens. Endorsed by Guy Lawrence (Disclosure) — "super useful for getting a nice, airy, clean sound quickly."

> [!warning] Corrected 2026-07-18 — this page previously described a "fuzz/boost guitar pedal." That's wrong: Gem **Dopamine** is a vocal-air enhancer/de-esser (the "Dolby Trick"), which is how every chain below uses it. ([Overloud](https://www.overloud.com/products/dopamine) · [DJBooth review](https://djbooth.net/pro-audio/gem-dopamine/))

## What it's used for

The one-move path to a clean, airy vocal top end **without** harsh sibilance — front of the vocal-air chain, adding sheen while de-essing so you don't have to stack EQ + de-ess + comp.

## FX chain notes

Placed **before** the harshness/de-ess stages (it adds air *and* tames the S's it would otherwise exaggerate); a subtractive de-esser follows as the safety net.

## Techniques

- **It simulates the "Dolby Trick"** — the tape-hiss-reduction move (Lennon-lore) that's really a **high-frequency booster + de-esser in one**: the wet knob adds airy top, the compression knob de-esses so the S/T don't get harsh. The one-move way to a clean airy vocal without stacking EQ + de-ess + comp (Mariah/Britney-style air with no ice-pick S's). → [[De-essing]] — Disclosure, [Ultimatum](https://youtu.be/uWe3UvI4KlU)
- **Air *with* compression, not a raw HF boost** — instead of a big additive treble EQ, add the highs while de-essing/compressing so the vocal gets air without harsh boosted S's — Disclosure, [Help Me Lose My Mind](https://youtu.be/FPgLRkgKoMU)
- **Disclosure use it as a vocal brighten/de-ess, not a guitar fuzz** — it boosts the highs *while* de-essing for breathy top without harsh sibilance; the first stage of the vocal air chain, followed by a subtractive de-esser — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ), [Higher Than Ever Before](https://youtu.be/9XkHSronZck) & [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI)
- **Front of the Anderson .Paak vocal chain** as brighten/de-ess before EQ — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8)

## Used in my chains

The **air-with-de-ess front end** of the vocal top-end chain — adds sheen *before* the harshness stages so the highs come up without the S's turning to ice picks:

- **[[1 Main Vocal Track|Main Vocal Track]]** — ***slot 8, "final air" (optional)*** — took this slot from [[Fresh Air]] on 2026-07-20. Wet 30–40%, Compression engaged, Frequency/Tone on the top octave, Mix to taste. Sits dead last so it airs the *finished* texture; its built-in de-ess action is why it works there, where a plain enhancer would just amplify whatever sibilance survived [[Pro-DS]]. Keep the [[Pro-Q 4]] presence boost small (+2–3 dB, dynamic), and skip this stage entirely if that shelf already gave enough air.
- **[[3 Vocal Bus|Vocal Bus]]** — add air at the front with Dopamine so the top stays breathy, *then* the harshness/de-ess stages ([[Soothe2]], manual de-essing) do the taming.

## Key Parameters

```visual-key
image: Images/Gem Dopamine.jpg
coords: Images/Gem Dopamine.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

The panel is a Dolby-A-card style rack: four knobs (Dry, Wet, Comp, Level), the orange/blue 361/180 card select, and a preset browser with A/B.

| #   | Parameter                | What it is / does                                                    | Technique                                                                            | Artist / record example                                |
| --- | ------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| ①   | Dry                      | Level of the dry (unprocessed) signal                               | Keep some dry under the effect for a parallel-blend feel                             | —                                                      |
| ②   | Wet (Enhancement Amount) | How much airy top-end sheen the Dolby-A-style encoding adds          | Bring up until the vocal opens/brightens, back off before it hisses                  | Disclosure — front of the vocal-air chain              |
| ③   | Comp (Dynamic action)    | The dynamic/de-ess behavior — tames S/T so the added air isn't harsh | More to keep sibilance controlled as you push Wet; the "de-ess as it brightens" half | Disclosure — [Ultimatum](https://youtu.be/uWe3UvI4KlU) |
| ④   | Level                    | Output level out of the encoder                                     | Level-match so brighter ≠ automatically "better" in the A/B                          | —                                                      |
| ⑤   | Card (361 / 180)         | The two emulated card types — the orange (361) / blue (180) buttons  | Audition both — one is brighter/more aggressive than the other                       | —                                                      |
| ⑥   | Preset / A-B             | Preset browser + A/B compare (top bar)                              | A/B two settings to check the air move isn't just "louder"                          | —                                                      |

## See also

- Effects: [[EQ]] · [[De-essing]] · [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
