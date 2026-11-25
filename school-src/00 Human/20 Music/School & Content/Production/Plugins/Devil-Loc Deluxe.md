---
type: plugin
title: "Devil-Loc Deluxe"
category: Compressor/Limiter
vendor: "Soundtoys"
video_enriched: true
tags: [plugin]
depth_linked: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Devil-Loc Deluxe

![[Images/Devil-Loc Deluxe.png]]

**Category:** Compressor/Limiter
**Vendor:** Soundtoys

## What it is

An expanded version of Devil-Loc with additional controls (mix, tone, crush modes) over the original.

## What it's used for

Same extreme character-compression role as Devil-Loc, with finer control over the crushed tone.

## FX chain notes

Same placement as Devil-Loc — parallel or direct on drum busses for aggressive character.

## Used in my chains

The **extreme-crush** option — reached for when a part should sound destroyed, not just compressed:

- **[[2 Drums Group|Drums Group]]** — *scratch-kit crush*: last device in the Pultec → Gate → [[Soothe2]] → Devil-Loc chain (Crush ~7, Crunch ~4, Darkness to taste, Mix 100%), then warp + pitch the loop down. Kenny's sampled-break move on your own kit.
- **[[Parallel Comp Send]]** — *alt flavor*: even-more-destroyed option in place of the 1176 crush (Crush hard, Mix 100% — the send level is the parallel blend).
- **[[1 Digital Bass Track|Digital Bass Track]]** — *drive lane variation*: pushed hard as an owned stand-in for the Distressor-on-full-red bass, paired with [[EchoBoy]] motion.

## Techniques

- **Live-drum crush stage** — last device in Kenny's scratch-kit chain (Pultec → Gate → Soothe2 → Devil-Loc) before warping/pitching the loop down — Kenny Beats, [Cook Up From Scratch](https://youtu.be/l7AjRTXex2U)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Devil-Loc Deluxe.pdf|Local PDF]] · [Official manual](https://www.soundtoys.com/wp-content/uploads/Devil-Loc-Deluxe-Manual.pdf)
- 📄 Hardware original: Shure Level-Loc (Model M62 Audio Level Controller) — a late-1960s podium-mic brickwall limiter; no manual link found (consumer PA hardware, pre-digital), background sourced from the Devil-Loc Deluxe manual's own history section.

**High-level points** (the mental model — signal flow, modes, things the manual says that nobody discovers by knob-twisting):
- Devil-Loc Deluxe models the **Shure Level-Loc**, a 1960s podium-mic limiter never intended as a musical tool — its "unintentional mojo" (dirty, nasty, trashy leveling + saturation) was repurposed by engineer Tchad Blake to build massive drum sounds from its gritty, pumping character. The plugin's whole design brief is: keep that accidental character, add studio-friendly control over it.
- **Signal flow is Crush → (gain reduction/limiting) → Crunch (post-limit makeup gain into an output amp stage) → Darkness (post-distortion high-cut) → Mix.** Crush and Crunch are two separate gain stages driving two separate nonlinear circuits (compressor, then output amp) — cranking both compounds distortion multiplicatively, not additively.
- **Crush drives the gain-reduction circuit itself** — more signal in, more compression, and if driven hard enough the gain-reduction circuit **saturates and changes its own release time** (see Specifications: normal vs. "saturated" release times differ by a factor of ~13). This is a real circuit-behavior coupling, not two independent knobs — pushing Crush hard changes how Release behaves even if the Release switch hasn't moved.
- **Crunch is not "more of the same" as Crush** — it's a distinct downstream stage: post-limiting makeup gain that also drives a separate output-amplifier distortion stage. Use Crush for pumping/leveling character, Crunch for adding output-stage grit on top.
- **Darkness's high-cut filter sits *after* distortion** — it's there specifically to shape/tame the harmonics Crunch just generated, not to EQ the input.
- **Release is a 2-position switch (Slow/Fast), not a continuous knob** — Fast is exactly half of Slow's release time (~1.7s vs ~0.85s normal; ~22s vs ~11s saturated). The "saturated" release times (10-20x longer than normal) only kick in once Crush is driven hard enough to saturate the gain-reduction circuit.
- **Attack is fixed at ~1.3ms** — there's no attack control; all the shaping happens via Crush (compression amount + release behavior), Crunch (output distortion), and Darkness (post-distortion tone).
- **Mix is a straight dry/wet blend** (0 = fully dry, 10 = fully wet) — built-in parallel processing, useful for keeping some clean signal under an extreme Crush/Crunch setting.

## Key Parameters

```visual-key
image: Images/Devil-Loc Deluxe.png
coords: Images/Devil-Loc Deluxe.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Crush | Drives the gain-reduction/limiting circuit — more signal in, more compression; hard enough and the circuit itself saturates, lengthening the release time | Push Crush hard on a drum bus for the classic Level-Loc pumping/sucking effect in [[BED Slot]]/[[TRANSIENT Slot]] roles; back off if the sustained "sucking" gets too rhythmic for the part | Tchad Blake's Level-Loc drum-bus technique (the plugin's own stated inspiration) |
| ② | Crunch | Post-limiting makeup gain that also drives a separate output-amplifier stage — more Crunch = more output-stage distortion | Use Crunch (not Crush) when you want added grit/distortion without changing the compression's pumping character | — |
| ③ | Darkness | Post-distortion high-cut filter cutoff — shapes the harmonics Crunch just created | Roll Darkness down to tame fizz from a hot Crunch setting, same "de-fizz after saturation" role as [[Saturation and Distortion]] high-cuts elsewhere in the chain | — |
| ④ | Release (Slow/Fast) | 2-position switch; Fast = half of Slow's release time. Saturating the Crush circuit multiplies whichever release time by ~10-13× | Fast for tighter, more rhythmic pumping on faster material; Slow (especially saturated via a hard Crush) for the long, breathing "gasping" sustain-release effect | — |
| ⑤ | Mix | Dry/wet blend, built-in parallel processing (0 = dry, 10 = 100% wet) | Keep Mix under 100% to run an extreme Crush/Crunch setting as a blended-in effect layer rather than replacing the source entirely | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[BED Slot]] · [[TRANSIENT Slot]] · [[Sound Palette]]
