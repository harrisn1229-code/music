---
type: plugin
title: "Pro-C 2"
category: Compressor/Limiter
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Pro-C 2

![[Images/Pro-C 2.png]]
*FabFilter's current Pro-C UI (Pro-C 3 shown — Pro-C 2's interface is nearly identical).*

**Category:** Compressor/Limiter
**Vendor:** FabFilter

## What it is

FabFilter's flagship compressor — eight compression styles (Clean, Classic, Opto, Vocal, Mastering, Bus, Punch, Pumping), a sidechain filter, and a detailed gain-reduction display.

## What it's used for

The go-to all-purpose compressor across the whole mix — vocals, drums, bass, and bus compression, switching character per style mode.

## FX chain notes

Sits after corrective EQ, commonly followed by an EQ for tonal balance and then a limiter/saturation stage.

## Techniques

- **Punch algorithm vs. Mastering algorithm — a measurable cleanliness tradeoff, not just a character choice.** Punch measured -37 dB THD on an 80 Hz test tone at 12 ms attack / 50 ms release — deliberate coloration, likely by design. Switching to the **Mastering algorithm** drops THD to roughly best-in-class levels, but it introduces significant distortion at frequency extremes **when oversampling is off** — turn oversampling ON for a genuinely transparent master-bus compress. For a "leave the signal alone" application, reach for Mastering + oversampling rather than Punch. → [[Compression]] — Sage Audio, [The CLEANEST Compression Possible (not clickbait)](https://www.youtube.com/watch?v=xA2J2TpfoD4)
- **The "Classic" style noticeably speeds up attenuation compared to default styles — a factor when timing compression to the BPM.** Demonstrated against a sine-wave-driven gain-reduction test: switching to Classic mode measurably quickens how fast maximum attenuation is reached versus the default curve, on top of what Attack/Release alone already control. Combined with Lookahead (near-eliminates the attack-time delay entirely), these are the two style/routing choices that most change how "in time" a compression move reads against the track — since attack/release alone can't be timed by formula (see [[Compression]]). → [[Compression]], [[Compression Staging]] — Sage Audio, [How to Time Every Audio Effect to the BPM](https://www.youtube.com/watch?v=MXz2hPL36PQ)
- **Best-match owned equivalent for "R Compressor" (Waves Renaissance Compressor) auditioned twice in one session — once as a light alternative on background vocals, once as a keep-him-high-in-the-mix stage on the lead during background-role sections.** On BVs: auditioned against [[UAD Tube-Tech CL 1B mkII|CL 1B]] through a Tube-Tech-style channel strip; the CL 1B alone ended up doing nearly the whole job. On the lead-in-choruses: "a little bit of R Compressor as well. Again, trying to keep him high in the mix" — a level-maintenance role rather than character. *(qualitative — no ratio/GR given)* → [[UAD Tube-Tech CL 1B mkII]], [[Compression]], [[Compression Staging]], [[Tony Maserati Vocal Chain]] — Tony Maserati (Mix with the Masters), [[Vocal chain with Tony Maserati]]
- **Parallel compression as the ONLY compression stage on a lead vocal — chosen specifically to preserve a delivered take's existing dynamics rather than level them.** "The only compression I've got going on is parallel. It's tucked in, so I'm keeping all the dynamics of their song, but all I'm doing is tucking in, just a bit of a nicer version with all my work." A real-world case for reaching for parallel over serial specifically when the source material's dynamic performance is already good and shouldn't be flattened — here because the vocal arrived wet/pre-mixed from the artist. → [[Parallel Processing]], [[Compression]], [[James Blake Vocal Chain]] — Mix with the Masters, [[MSM Mixing James Blake's Vocals]]
- **A light peak-catch stage, right after EQ and before a push-forward leveler — a best-match stand-in for a named Waves Renaissance Compressor move (unowned).** In a fixed tracking-vocal chain: EQ (fixed high-end recipe) → **this plugin, light** → [[RVox]] (push out front) → reverb/delay sends → doubler. "Compressing just a little bit to kind of keep the peaks out" — explicitly a peak-control move, not leveling or character (RVox handles the push-forward job downstream). On this plugin: **Clean** or **Vocal** style, low ratio, fast-ish attack, 1–3 dB GR *(general starting point — source gives no ratio/threshold, just "a little")*. → [[Compression]] (effect), [[RVox]], [[Compression Staging]], [[1 Main Vocal Track]] — Kuk Harrell, [[Radio-ready vocal effects with Kuk Harrell]]
- **"Just to tighten it up a bit" — a light-touch glue pass used identically on both a nylon-guitar chord bed and its doubling Analog Lab piano layer, positioned mid-chain (after a reverb/tape-color stage, before EQ and a final lossy-codec finish).** No specific ratio/threshold given — a "general starting point" light compression stage rather than a squashing move; the point is consistency between two doubled melodic layers, not character. This sample was later flipped into a platinum-certified song. → [[EQ]], [[Prof Jam Trouble Now Sample Chain]] — loner, [how i made the sample that got me a platinum song!?](https://www.youtube.com/watch?v=6aHjhniTOnk)
- **A compressor is functionally an EQ too, via attack and release — worked example on a strummed acoustic guitar.** Quick attack + long release: the quick attack **attenuates the initial transient**, which carries its own frequency content, so shaping it changes the instrument's overall frequency response; the long release also affects other transients/content across the signal, further reshaping frequency balance. Separately, a **short attack distorts the signal**, generating new harmonics that add yet another frequency-response change on top. Net point: this plugin's attack/release settings are reshaping tone whether or not that's the intent — check the high-frequency range specifically to hear it happening. → [[EQ]], [[Compression]] — Sage Audio, [EQ Masterclass](https://www.youtube.com/watch?v=iPBnL6mx9c0)
- **New York style parallel compression: drive an EQ into the compressor beforehand to make the compression itself more audible/characterful.** The base recipe: send + aux track, this compressor pushed to heavy attenuation (safe since it's blended in, not the whole signal), followed by a linear-phase EQ (avoids phase cancellation against the dry channel) boosting whatever ranges should stick out (worked example: kick + vocal range boosted, highs subbed). The character move: insert a *second* EQ before the compressor and drive specific frequencies into it — the compressor has to work harder on those bands, so compression on those frequencies reads as more apparent than a flat, undriven signal would produce, and the aux fader becomes a simple one-knob automation target for the whole effect's intensity. The video's own demo runs this exact recipe on a free SSL emulation (Analog Obsession) as an alternative, but this compressor is the owned, named tool for the job. → [[Parallel Processing]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **Parallel compression as a mastering-stage alternative to limiting — compress heavily, then use the built-in Dry Gain to blend back to roughly 50/50 wet/dry.** Compressing hard on its own still attenuates peaks the same way a limiter does; blending the dry signal back in until it's ~50/50 leaves peaks essentially unaffected while quieter detail still gets amplified from the wet half — peak attenuation is still happening, just spread across only half the total output. Knee, Threshold, Ratio, and the compression Style are the controls for exactly what the wet half catches. Because the blended result doesn't risk clipping and doesn't need an instant attack, open Attack/Release up specifically to optimize transient retention rather than defaulting fast/aggressive. If the heavy compression adds unwanted harmonic distortion, lean on a mastering-tuned Style, or deliberately audition other Styles for a distortion character that suits the track. → [[Clipping and Loudness]], [[Parallel Processing]], [[Master Chain]], [[Limiting]] — Sage Audio, [Stop Limiting Your Masters](https://www.youtube.com/watch?v=s_LDCzWx20g)

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/Pro-C 2.pdf|Local PDF]] · [Official manual](https://www.fabfilter.com/downloads/pdf/help/ffproc2-manual.pdf)

**High-level points:**
- Threshold sets the level above which compression kicks in — the circular meter around the knob shows the actual sidechain-filtered signal level, making it easy to dial in.
- The 8 **Style** modes aren't just "flavors" — they change the underlying detection/gain-computer algorithm (Vocal auto-adapts knee/ratio to the input; Mastering is tuned for minimal harmonic distortion; Pumping is an aggressive, over-the-top EDM/drum-bus character).
- **Range** caps the maximum gain reduction regardless of how far the signal sits above threshold — a safety net distinct from Ratio, which scales the response curve instead of limiting it.
- **Knee** up to 72 dB (very soft) combined with a fast Attack can produce saturation-like coloration rather than clean gain reduction — a deliberate character move, not just "smoother compression."
- **Auto Release** adapts release time to how much gain reduction is currently applied, adding a second layer of program-dependency on top of each Style's built-in behavior.
- **Lookahead** (up to 20 ms) and **Hold** (up to 500 ms) shape the front and back of the gain-reduction envelope independently — Hold specifically is what creates the classic "pumping" glue effect on drum busses.
- **Dry Gain** is true parallel compression built into the plugin (no separate bus needed) — blends the unprocessed dry signal back in without adding latency mismatch.
- The sidechain section has its own 3-band EQ (HP/LP + a customizable auto-Bell mid band) so triggering can be tuned to specific frequencies without a separate EQ insert.

## Used in my chains

My **all-purpose fast compressor** — the second-stage leveler after the opto/tracking comp, and the utility comp everywhere else. Style + attack change per job:

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 3, leveling*: Style Vocal, Attack 10 ms, Release Auto, 3–5 dB GR, Range caps GR ~5 dB (catches the fast transients the [[UAD Tube-Tech CL 1B mkII|CL 1B]] opto lets through).
- **[[1 Double Vocal Track|Double]]** / **[[1 Main Vocal High Track|High]]** — *"crush"/"flatten"*: firmer leveling so support layers sit dead-flat under the lead.
- **[[2 Backup Vocals Group|Backup Vocals Group]]** — *slot 4, duck*: external sidechain from the lead vocal so backups tuck under the lead.
- **[[1 Digital Bass Track|Digital Bass]]** *(control)*, **[[1 Drums Snare-Clap Track|Snare]]** *(level)*, **[[1 Drums FX Track|Drums FX]]** *(tame)* — general leveling/duck duty.

## Key Parameters

```visual-key
image: Images/Pro-C 2.png
coords: Images/Pro-C 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | Range | What it is / does | Technique | Artist / record example |
| --- | --- | --- | --- | --- | --- |
| ① | Threshold | -60–0 dB | Level above which the sidechain-filtered signal triggers gain reduction | On [[BASS Slot]] or drum bus, set with Audition Triggering on so you can hear exactly what's being caught before judging by eye | — |
| ② | Ratio | 1:1–100:1 | Amount of compression above threshold (1:1 = none, ∞:1 = limiting) | Gentle 2–4:1 for transparent [[BED Slot]] glue; push toward ∞ only when intentionally limiting | — |
| ③ | Style |  | 8 detection/response algorithms (Clean, Classic, Opto, Vocal, Mastering, Bus, Punch, Pumping) | Pumping for trap/EDM drum-bus glue; Vocal for automatic lead-vocal leveling; Bus for mix-bus cohesion (see [[Compression]]) | — |
| ④ | Knee | 0–72 dB | Hardness/softness of the threshold transition (0–72 dB) | Push past 60 dB + fast Attack for a saturation-like vocal effect instead of a clean [[LEAD Slot]] compressor | — |
| ⑤ | Range | 0–60 dB | Caps maximum applied gain reduction, independent of Ratio | Use on parallel-adjacent chains to prevent an aggressive Ratio from over-squashing peaks | — |
| ⑥ | Attack | 0.005–250 ms | Speed of gain-reduction onset (0.005–250 ms) | Fast attack tames transient-heavy [[TRANSIENT Slot]] material; slow attack lets drum transients through before clamping | — |
| ⑦ | Release / Auto Release | 10 ms–2.5 s | Recovery time after gain reduction; Auto Release adapts it to the amount of GR in real time | Leave Auto Release on for program-dependent glue on a full mix bus | — |
| ⑧ | Lookahead | 0–20 ms | Up to 20 ms advance-look to catch transients before they clip through | Enable for transparent limiting-style catches on drum busses; disable for zero-latency tracking | — |
| ⑨ | Hold | 0–500 ms | Prolongs peak gain reduction (up to 500 ms) before release begins | Longer Hold + slow Release = classic pumping glue on a drum bus (see [[Compression]]) | — |
| ⑩ | Wet Gain / Auto Gain |  | Make-up gain after compression; Auto Gain estimates it automatically from Threshold/Ratio/Knee/Attack | Leave Auto Gain on while A/B-ing styles so loudness doesn't bias the comparison | — |
| ⑪ | Dry Gain |  | Blends uncompressed dry signal back in (built-in parallel compression) | Add 10–20% Dry on a [[BASS Slot]] bus compressor to retain low-end punch while still gluing the transients | — |
| ⑫ | Side Chain EQ |  | 3-band filter (HP, LP, customizable auto-Bell mid) shaping what triggers detection | High-pass the sidechain to stop a compressor over-reacting to sub-bass on a full mix bus | — |

Circled numbers above match a from-scratch signal-flow read of the manual, not an annotated screenshot (none exists for this note).

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
