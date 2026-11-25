---
type: plugin
title: "Collision"
category: Instrument
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
briefed: backlog
---

# Collision

![[Images/Collision.jpg]]

**Category:** Instrument
**Vendor:** Ableton

## What it is

Ableton's physical modeling synth for mallet, string, and membrane percussion instruments (a Native Instruments Reaktor-derived engine licensed to Ableton).

## What it's used for

Bells, mallets, plucked/struck percussive tones, and hybrid percussive instruments — often layered under drum samples or used melodically for tuned percussion.

## FX chain notes

Sits at the top of an instrument chain; commonly routed through a short reverb/delay send and a transient-shaping compressor when used as a drum layer.

## Manual

- 📄 [Live Instrument Reference — Collision](https://www.ableton.com/en/manual/live-instrument-reference/) (web-only, no per-device PDF — Live 12 manual chapter; Collision was co-developed with Applied Acoustics Systems)

**High-level points:**
- Signal flow is a literal physical cause-and-effect chain: an exciter (Mallet or Noise) strikes/excites up to two Resonators, routed in series or parallel — the manual's own example: "a beater strikes a tuned bar (Resonator 1); the tuned bar's resonance is amplified by a resonating tube (Resonator 2)."
- Two independent exciters exist and can run together: **Mallet** (an impact model — Stiffness/Noise/Color) and **Noise** (a filtered white-noise burst with its own ADSR) — combine them for hybrid struck-plus-breathy percussion, or use Noise alone as a pure texture generator.
- Each Resonator's physical **model** (Beam, Marimba, String, Membrane, Plate, Pipe, Tube) matters more than any knob tweak — a Membrane will never sound like a String no matter how Decay/Brightness are set. Pick the model first.
- **Decay** and **Material/Radius** are the two axes of an X-Y pad — Decay (vertical) is how long the resonator rings, Material/Radius (horizontal) is how that damping varies across frequencies, i.e. the *timbre* of the ring, not just its length.
- **Bleed** re-mixes the raw exciter signal back into the resonated output — idealized physical models can sound synthetic/dull without it; a touch of Bleed restores the transient "click" real materials have.
- **Inharm** stretches/compresses the harmonic series away from clean integer ratios — real bells, bars, and tubes are inherently inharmonic, so this parameter is what separates a "toy synth bell" from a believable mallet instrument (set near zero for tuned/pitched use).
- **Quality** (Eco→High) trades CPU for model fidelity — safe to sketch on Eco, bump to High for final bounces; two High-quality resonators plus Noise can get CPU-heavy.
- The manual specifically warns idealized resonator models can spike in amplitude — watch gain staging at high Decay + high Reso-adjacent settings, especially with Bleed added on top.

## Key Parameters

```visual-key
image: Images/Collision.jpg
coords: Images/Collision.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

The 5–15 parameters that actually matter, worst-documented first:

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Mallet Stiffness | Hardness of the striking mallet — low = soft/dull impact, high = sharp/bright, modulated by pitch and velocity | Map velocity → Stiffness for realism (hit harder = brighter attack), the way a real mallet player does | — |
| ② | Mallet Noise / Color | Amount and tone of the impact "chiff" noise layered into the strike | Push Noise up + bright Color for a felt-mallet marimba attack; use as a standalone click layer under other percussion | — |
| ③ | Resonator Type | Physical model per resonator (Beam, Marimba, String, Membrane, Plate, Pipe, Tube) | Choose the model before touching any other knob — Membrane→Pipe in series gives a tuned drum with tube overtone | — |
| ④ | Decay | Internal damping / ring-out length (X-Y vertical axis) | Short decay = plucked, muted hit for a trap perc layer; long decay = ambient bell texture | — |
| ⑤ | Material / Radius | Damping variation across frequencies, or pipe dimensions (X-Y horizontal axis) | Automate or sweep live via the X-Y pad for evolving metallic textures | — |
| ⑥ | Inharm | Stretches/compresses harmonics away from integer ratios | Push high for bell/gong inharmonicity and dissonant texture; keep near zero for pitched, musical mallet tones | — |
| ⑦ | Hit Position | Where on the resonator it's struck (edge vs. center); can be randomized | Randomize per-note for realistic mallet-instrument variation instead of static, robotic repeats | — |
| ⑧ | Bleed | Mixes the raw (pre-resonance) exciter signal back into the output | 10–20% bleed restores the transient click that idealized resonator models otherwise lose | — |
| ⑨ | Resonator Routing (serial/parallel) | Chains Resonator 1 → 2, or runs them independently | Serial = one struck object with a resonant body (bar into tube); parallel = two independent tones layered | — |
| ⑩ | Noise Section (Filter Type/Freq/Res) | An alternate filtered-noise exciter with its own ADSR, separate from the Mallet | Mallet off, Noise on alone with BP + high Res = a breathy/blown texture generator, not a struck sound at all | — |
| ⑪ | LFO Destinations (×2) | Two LFOs, each routable to two parameters, with sine/square/tri/saw/2 noise waveforms | Slow LFO → Material/Radius for a slowly evolving bell texture bed | — |

## Patch Recipes

Circled numbers = the matching row in the Key Parameters table above.

### Tuned mallet lead (marimba/bell) — [[LEAD Slot]]
- ③ Resonator: Marimba or Beam, tuned to the root note
- ⑥ Inharm: near zero — keeps it pitched and musical
- ④ Decay: short–medium (plucked feel, not a drone)
- ① Mallet Stiffness: mid — clear attack without going glassy
- FX: short room/plate send; skip chorus — keep it identifiable as a struck instrument

### Metallic bell texture — [[TEXTURE Slot]]
- ③ Resonator: Plate or Tube, ⑨ serial routing (Plate → Tube)
- ⑥ Inharm: high — dissonant, bell-like partials
- ④ Decay: long, ⑤ Material/Radius swept via the X-Y pad
- ⑪ Slow LFO → Material/Radius for evolving shimmer
- FX: long reverb + delay send — this patch *is* the space, not a layer in it

### Trap perc / rim layer — [[TRANSIENT Slot]]
- ③ Resonator: Membrane, short and tight
- ④ Decay: very short
- ① Mallet Stiffness high, ② Noise moderate for click
- ⑧ Bleed 15–20% for extra transient snap
- FX: none — sits dry, layered under an 808 or clap for texture, not tone

### Breathy/blown texture bed — [[TEXTURE Slot]] or [[BED Slot]]
- Mallet section off; Noise section on alone as the sole exciter
- ⑩ Noise filter: bandpass, high Res, slowly modulated Freq
- ④ Decay: long, via the Noise section's own ADSR
- ⑪ LFO → Noise filter Freq for continuous movement
- FX: reverb send — works as an ambient pad-adjacent layer, not a rhythmic element

### Metallic hybrid stab — [[LEAD Slot]] or [[MIDS Slot]]
- ③ Two resonators in ⑨ parallel: Marimba + Plate, different tunings
- ① Mallet Stiffness high, ② Noise moderate for an aggressive attack
- ⑥ Inharm moderate on the Plate resonator only, low on the Marimba
- FX: light saturation for a modern trap-adjacent metallic stab

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
