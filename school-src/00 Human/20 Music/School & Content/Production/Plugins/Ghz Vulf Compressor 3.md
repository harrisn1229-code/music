---
type: plugin
title: "Ghz Vulf Compressor 3"
category: Drive/Color
vendor: "Goodhertz"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Ghz Vulf Compressor 3

![[Images/Ghz Vulf Compressor 3.png]]

**Category:** Drive/Color
**Vendor:** Goodhertz

## What it is

Goodhertz's Vulf Compressor, a character compressor modeled on lo-fi, VHS/tape-degraded compression sounds popularized by the 'Vulfpeck' aesthetic.

## What it's used for

Lo-fi, retro-degraded compression character on drums, keys, and full mixes — a creative rather than transparent compressor.

## FX chain notes

Used as a character/coloration stage rather than a corrective compressor, often late in a bus chain.

## Techniques

- **Two roles, two intensities, in one Rhodes-led soulful-sample build — dialed tight/aggressive on the electric piano, then noticeably gentler on a second piano later in the same build.** Auto-captioned twice, as "a good hurts full compressor" on the Rhodes (Lounge Lizard electric piano) and "a wolf compressor" on the piano — both near-certain homophone garbles of Goodhertz Vulf Compressor. On the Rhodes: kept "really tight," aiming for the part to sound loud and close-together, first stage after a short mono spring reverb, before EQ and delay. On the piano ("The Gentleman," Kontakt): explicitly dialed back — "not quite as harsh as I added it on the Rhodes because I didn't want it too crazy" — same plugin, same build, deliberately different setting per layer's role. → [[Kontakt 7]], [[EQ]], [[Reverb]], [[ValhallaDelay]], [[Soulful Sample Stacking Chain]], [[Sound Selection Guide]] — loner, [use this easy technique to take your samples to the next level!? (making a soulful sample)](https://www.youtube.com/watch?v=vN0fgGDxp6E)
- **Named directly on-screen ("a Goodhertz Vulf Compressor") as the tightening stage on a vintage piano, right after a tape/hiss-reduction pass and before a low-end EQ cut.** Building a from-scratch jazzy R&B sample: a "Reels"-style tape emulation (Baked preset, hiss/motor turned down — see [[Kramer Tape]]) runs first for grit, then this compressor tightens the part up, then EQ cuts the low end — one of the rare cases in this vault's video corpus where an owned plugin is identified by its real name rather than a best-match mapping. → [[Kramer Tape]], [[EQ Eight]], [[Chord Progressions]] — loner, [how to make moody vintage r&b samples for partynextdoor (sounds like a real jazz sample)](https://www.youtube.com/watch?v=wD4RzEKo7vU)

## Used in my chains

The **character-compression** option — colored, groovy leveling where the *sound* of the compressor is the point (not transparent control). Keep **Wow** and **Lo-Fi** at 0% for straight colored comp; bring them up for the lo-fi Vulf warble:

- **[[1 Electric Bass DI Track|Electric Bass DI Track]]** — *slot 2, character compression*: Compression for ~5 dB GR, medium Attack, timed Release (grooves with the part), **Wow 0%, Lo-Fi 0%**, Master Mix 100%. On bass, colored *consistency* IS the sound — the low end must be steady for the mix to feel solid. Note Compression can't go fully off, so 0% is still a little Vulf, not bypass.

## Key Parameters

```visual-key
image: Images/Ghz Vulf Compressor 3.png
coords: Images/Ghz Vulf Compressor 3.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①–⑥ only — this capture shows the main panel; ⑦ and ⑧ live in the **COMP ADV** and **LOFI ADV** panels, which are collapsed here.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Input (IN) | Input gain, **pre**-compression. The slider has a peak meter embedded in it showing the level going in before any processing. | Because compression here is drive-dependent, set input first — it decides how hard the rest of the plugin works, and the embedded meter means you don't need a separate one. | — |
| ② | Compression (COMP) | Overall compression amount. **It can't be fully switched off** — even at 0% Vulf still imparts its signature compressor character. | Dial for 4–6 dB GR on bass — colored consistency, not transparency. Treat 0% as "minimum character", not "bypass"; use Master Mix if you need it truly out. | — |
| ③ | Wow / Flutter (WOW) | Depth of the vinyl-style wow & flutter — pitch instability, not level. | This is the control that makes a part feel *played back* rather than recorded. Small amounts on keys/guitar; it gets seasick fast on anything sustained. | — |
| ④ | Lo-Fi (LOFI) | Overall fidelity. Higher settings produce **more total harmonic distortion, reduced high-frequency resolution, and more noise** — three things at once. | Because it moves THD, HF detail and noise together, use it as a single "make this worse on purpose" gesture rather than trying to dial in distortion alone. | — |
| ⑤ | Output (OUT) | Output gain, **post**-compression. | Level-match against bypass so the A/B is about character, not loudness. | — |
| ⑥ | Master Mix (dry) | Overall wet/dry. **At 0% the Compression, Wow/Flutter and Lo-Fi processing are fully bypassed** — this is the real bypass. | Parallel move: push Compression hard, then pull Master Mix back to keep the transients while gluing underneath. | — |
| ⑦ | Attack / Release *(Comp Adv)* | Compression onset and recovery, in the COMP ADV panel. | Medium attack lets the note attack through before the colored clamp; time the release to the tempo so any pumping is musical. | — |
| ⑧ | Noise / Crunch / Type *(LoFi Adv)* | The LOFI ADV panel: independent noise amount, crunch, and a flavour selector (Analog and others) setting the harmonic-distortion character. | When Lo-Fi as a single knob is too much of everything, come in here and add just the noise, or just the crunch, and leave the HF resolution alone. | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
