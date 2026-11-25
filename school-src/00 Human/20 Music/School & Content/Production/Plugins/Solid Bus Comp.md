---
type: plugin
title: "Solid Bus Comp"
category: Compressor/Limiter
vendor: "Native Instruments"
tags: [plugin]
depth_linked: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
video_enriched: true
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Solid Bus Comp

![[Images/Solid Bus Comp.png]]

**Category:** Compressor/Limiter
**Vendor:** Native Instruments

## What it is

Native Instruments' bus compressor plugin modeled on classic SSL-style bus compression circuits.

## What it's used for

Bus/glue compression on drum busses, groups, or the master bus.

## FX chain notes

Placed at the end of a group/bus chain for cohesive glue compression.

## Techniques

- **Keep gain reduction almost invisible even at the song's loudest point, as one leg of a "multibus" mix-bus setup — several parallel stereo buses, each doing a little, summed together.** Checked specifically at the chorus (the loudest section): "it's barely three [dB]." Settings stated on camera: **30 ms / 4:1 ratio / 0.1 s release** — fast release so the compressor recovers almost instantly and never audibly holds the signal. Driving reason: an explicit brief to avoid an "overly compressed" sound ("that was a complaint that they'd had"). Part of a wider philosophy — see [[Parallel Processing]] for the full multibus structure (multiple simultaneous parallel buses, not one send). → [[Compression]], [[Compression Staging]], [[Parallel Processing]], [[Master Chain]] — Michael Brauer (Mix with the Masters), [[The power of multi-bus processing with Michael Brauer]]
- **Reframe a mostly-dry Wet/Dry blend as "not compression, just how the input is going in" — judge the unit by its input-stage coloration, not by GR on the wet path.** On a parallel-blend stage he calls "the Germaniums," the Dry knob is set "way more towards dry, like at about 2:00" on the dial — with the blend leaning that dry, what's actually audible is the character the signal picks up passing through the circuit, not a compression effect. Directly applicable to this plugin's own Dry/parallel blend (⑤ Output/Dry, above): try leaning the blend heavily dry and judging by tone/openness rather than GR. → [[Parallel Processing]], [[Compression]] — Michael Brauer (Mix with the Masters), [[The power of multi-bus processing with Michael Brauer]]
- **SSL-style compression as one stage of a background "effects vocal" texture chain, run purely for vibe rather than clarity or level control.** On a re-purposed background vocal part that runs throughout "Dancing With A Stranger" (a Sam Smith take, low in the mix): "added a little Scheps to it, a little SSL compression to it, verbed it out, and add a little pumper behind it" — SSL comp sits alongside a channel-strip character stage (Scheps — unowned, see [[Plugin Wishlist]]), a sidechain-style "pumper" ([[Duck_Buddy]]), and reverb, each A/B'd against bypass. *(qualitative only — no ratio/threshold given)* → [[Duck_Buddy]], [[Vocal Stacks and Ad-libs]], [[Compression]] — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
- **SSL-style master-bus glue as one leg of a small home-studio master chain, run subtly for small-speaker legibility rather than loudness.** Alongside an API-style summing+bus-comp pair and a Waves 1073 in mid-side: "computer speakers and phone speakers lose nuance and detail — printing loud/glued/mastered audio keeps it legible." Owned-plugin equivalent for the "Waves SSL bus compressor" named in the source. → [[Master Chain]], [[API-2500]] — Jack Ruch, [My Home Recording Setup for Guitar](https://www.youtube.com/watch?v=KYTGFneEJ2A)

## Key Parameters

```visual-key
image: Images/Solid Bus Comp.png
coords: Images/Solid Bus Comp.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Threshold | Level where compression begins | Set for 1–3 dB of bus glue |
| ② | Ratio | Compression amount | 2:1 for gentle mix-bus glue; 4:1 firmer |
| ③ | Attack / Release | Envelope (SSL-style) | Slow attack keeps punch; Auto release breathes |
| ④ | Makeup | Output gain | Match bypass to unity |
| ⑤ | Output / Dry | Output level + Dry knob for parallel (New-York) blend | Blend Dry back for glue that keeps dynamics |
| ⑥ | Sidechain (SC Gain / Link L-R) | Sidechain drive + stereo linking of detection | Link for a stable stereo image; SC Gain to tune the trigger |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
