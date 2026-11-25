---
type: plugin
title: "UAD Teletronix LA-2A"
aliases: ["UAD Teletronix LA-2A Silver"]
category: Compressor (opto)
vendor: "Universal Audio"
platform: UAD Console
tags: [plugin, uad]
manual_enriched: true
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
video_enriched: true
---

# UAD Teletronix LA-2A

![[Images/UAD Teletronix LA-2A.png]]

**Category:** Optical Compressor
**Vendor:** Universal Audio — Legacy version in the Apollo stock bundle ([[Universal Audio Apollo Twin MkII]])

## What it is

Emulation of the Teletronix LA-2A tube opto leveler. Program-dependent attack (~10 ms) and release (~60 ms then slow tail) — it *rides* the signal rather than clamping it. Two knobs, no wrong answers.

## What it's used for

Gentle leveling on the way in: vocals, acoustic guitar, bass. Disclosure's "one-LA" rule: threshold + gain are the only controls — **the harder you hit it, the higher the effective ratio** ([[Disclosure - Ultimatum Breakdown + Breakbeat]]). Their reach-for on tracked vocals/guitar "for shine."

## Key settings

- **Peak Reduction:** ≤3 dB GR on the loudest phrases *while tracking* — printed compression is forever; add more later in the box, never less.
- **Gain:** makeup to unity (bypass A/B at equal loudness).
- **Comp/Limit switch:** Comp (4:1-ish) always for tracking.
- **Emphasis (rear-panel R37):** leave stock.

## FX chain notes

Second device in `uad_console` chains, after the Unison preamp — see [[1 Acoustic Guitar Track|Acoustic Guitar Track]]. In-the-box equivalent for later stages: [[LALA]].

## Techniques

- **A light-drive lead-vocal setting (roughly 0-7 on the compression control) as a stated sweet spot, paired with a "boost after to restore what an earlier cut removed" sequencing trick.** Josh Gudwin's Justin Timberlake vocal chain runs the LA-2A lightly (0-7) as one of the final stages, AFTER a subtractive EQ pass had already cut the mic's brightness/sibilance (~4.5 kHz down, de-essing); a **+3 dB boost added right after the LA-2A** specifically restores the top-end sparkle the earlier cut removed, rather than boosting first and fighting sibilance later. — Josh Gudwin, [[Guitar & vocal treatment with Josh Gudwin]]
- **A dedicated "crush" room mic on drums run hard through an LA-2A as a deliberately over-compressed parallel layer, rather than gentle program leveling.** Sylvia Massy, tracking The Melvins: a ribbon mic placed near the kick (drummer's-perspective right side) is fed through a Teletronix LA-2A specifically to be "crushed" — a distinct, harder-driven use case from this note's own gentle ≤3 dB tracking guidance above, closer to a parallel-distortion/room-glue role than clean leveling. Direct hardware match for this owned unit. → [[Drum Mic Technique]], [[Parallel Processing]], [[2 Drums/3 Drums Bus|Drums Bus]] — Sylvia Massy (Mix with the Masters), [[Analog Recording workflow - Sylvia Massy]]
- **Owned-lane equivalent for a stated Limit-over-Comp mode preference on a hardware compressor with the same switch — and a real backpedal-when-it-chokes story from the same session.** Greg Wells, on compressing the close hammer mics of a tracked piano through a hardware Chandler TG-1: "limit mode is the way to use that thing — I don't really get the compression mode in it, but limit is like magic. I don't want to do it too much because you can overcook it." This unit's own **Comp/Limit switch** (see Key settings above: "Comp always for tracking") makes it the direct owned-lane stand-in for trying that same mode swap. The rest of the story is a real-world case for the "≤3 dB GR while tracking" guidance above and for [[Committing and Printing]]'s commit-then-backpedal discipline: a huge chord choked the compressor mid-take, so the fix was backing the unit off and re-tracking the piano through it again rather than fixing the choke afterward in the mix. Full mic-array and signal-path writeup on [[Piano Recording]]. → [[Piano Recording]], [[Committing and Printing]], [[Compression]] (effect) — Greg Wells (Mix with the Masters), [[Producing and recording piano with Greg Wells]]
- **Core lead-vocal compression stage of a real stem-mix chain: Peak Reduction 3–7, Gain to taste — "for me it's between three and seven on this plug-in."** Positioned after EQ/broad-EQ/light-multiband stages and before a subtractive multiband EQ/de-esser: "Jump into the compressor, LA-2A, the LA-2A is a great vocal compressor to me. I love using it. It just makes my vocals for me, sound nice and even... the gain is always going to be a little louder on a plug-in, that's cool because you just get your peak reduction to where you like it... you can really push these if you want, but I don't like doing that too much." Also cited as the owned-lane stand-in for a personal OPTO default recipe on background vocals (mid Attack, mid Release, ~3.5 dB GR, make-up gain ~3/4 of the GR amount) built on an unowned Waves R-Comp. → [[Compression]], [[Pro-Q 4]], [[Soothe2]], [[Pro-MB]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **A Summit-style opto/tube compressor tapped for only ~1 dB of gain reduction on tracking bass, purely for tube coloration — a real-world data point validating this note's own "≤3 dB GR while tracking" guidance at the gentle end.** Al Schmitt, on double-mic'd upright bass into a Summit tube compressor: "I just tap it about a dB. I do that to get the tube sound from the tube... the Summit doesn't help that much in controlling it, because I only just tap it." Explicitly NOT used for level control — a boomy bass gets fixed by keeping the mics close/tight and addressing the player's tone, not by leaning on the compressor. The Summit TLA-100A (opto/tube leveler design lineage close to this unit) is the named hardware; this is its owned-lane equivalent. → [[UAD Neve 1073]], [[Sound Selection Guide]], [[1 Electric Bass DI Track]] — Al Schmitt (Mix with the Masters), [[Recording techniques with Al Schmitt]]
- **Named as one half of Michael Brauer's "compressors are big tone machines" pair — routed through specifically for its COLOR, whether or not it's meaningfully engaging gain reduction.** Greg Wells describing Brauer's approach: "I love how he uses them to create different colors and different vibes — even if he's not even really engaging the gain reduction in the compressor, he'll just route things through different compressors." This unit's own slow opto behavior and tube warmth make it a natural color stage even when Peak Reduction is barely doing work — a use case distinct from this note's own "Key settings" leveling guidance above, where the point IS the gain reduction. Pair with [[UAD UA 1176LN]] for a fast/slow color pair the same way this note's [[Compression Staging]] link already pairs them for control. *(secondhand — Wells describing Brauer's approach, not Brauer's own demo; no settings given)* → [[Compression]] (effect), [[Compression Staging]], [[UAD UA 1176LN]] — Greg Wells (Mix with the Masters), [[Bringing vocals out of the speakers with Greg Wells]]

## See also

- Plugins: [[LALA]] · [[UAD UA 1176LN]] · [[UAD UA 610-B]]
- Effects: [[Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]]

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/UAD Teletronix LA-2A (hardware - LA-2A).pdf|Local PDF]] · [Universal Audio LA-2A User's Guide (Rev 1.3), official manual for the original hardware reproduction](https://media.uaudio.com/assetlibrary/l/a/la-2a_manual.pdf)
- 📄 UAD plugin manual (web-only, no separate PDF): [Teletronix LA-2A Leveler Collection Manual — Universal Audio Support](https://help.uaudio.com/hc/en-us/articles/4419496124180-Teletronix-LA-2A-Leveler-Collection-Manual)

**High-level points:**
- The LA-2A is an **electro-optical (opto) compressor**: the audio signal drives an electro-luminescent light panel, whose light shines on a photo-electric (cadmium-sulfide) cell that controls the gain — there's no traditional VCA or FET gain element, which is why it "glows" into compression rather than snapping.
- **Only two controls matter** — Peak Reduction and Gain — and the manual is explicit about the order: **set Peak Reduction first** for the desired amount of compression, **then** set Gain for output level. Gain does not affect the compression amount at all, only the output level after it.
- The **cadmium-sulfide photocells give a natural "two-stage" release** — ~0.06 seconds for the first 50% of gain recovery, then 0.5–5 seconds for the remaining release depending on how much reduction was applied. This program-dependent, non-linear release is the actual mechanism behind the unit's "musical"/"transparent" reputation — it isn't a single fixed release time like a VCA compressor.
- **Attack is fixed and very fast** (electro-luminescent light response, not user-adjustable) — there's no attack knob because the original design didn't need one for its broadcast-limiting origin.
- **Limit/Compress switch changes the I/O curve, not the timing**: Compress = gentler curve, low ratio; Limit = steeper curve, higher ratio. Same attack/release behavior either way.
- **The VU meter is multi-purpose**: switchable between +4 dB output monitoring, +10 dB output monitoring, and a middle Gain Reduction position that reads compression amount directly in dB — the same meter serves both jobs, so know which mode you're in before trusting the reading.
- Originally a **broadcast-industry limiter** (Teletronix, early 1960s) before becoming a studio-tracking staple — the fast electro-luminescent attack was built to catch broadcast peaks, not for musical "gluing," which explains why it works so well as a fast, forgiving peak-catcher on vocals/bass even though the tone-shaping reputation came later.
- Tube complement: (2) 12AX7A, (1) 12BH7A, (1) 6AQ5 — the tube stages contribute the harmonic coloration on top of the opto gain-reduction behavior; up to 40 dB of gain reduction available, but usable range for tracking is far more conservative (see Key settings above — ≤3 dB while printing).

## Used in my chains

My **slow opto leveler** — gentle program-dependent gain riding (1–2 dB) that glues without pumping. Peak Reduction for the GR, Gain to unity, Comp mode:

- **[[3 Vocal Bus|Vocal Bus]]** — *slot 1, program leveling* (Silver).
- **[[2 Ensemble Stack Group|Ensemble Stack Group]]** — *slot 2, glue compression* (slow opto melts layers).
- **[[1 Acoustic Piano Track|Acoustic Piano]]** (Silver) / **[[1 Electric Piano Track|Electric Piano]]** — *slot 2*: 1–2 dB gentle leveling (the LA-2A a Rhodes historically ran into).

> Note: [[LALA]] (AnalogObsession) is the free native LA-2A stand-in used on tracks/groups where a UAD instance isn't spent — same opto job.

## Key Parameters

```visual-key
image: Images/UAD Teletronix LA-2A.png
coords: Images/UAD Teletronix LA-2A.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. Only ①②④ are badged: this capture is the **LA-2 (Gray)** panel, which has no Limit/Compress switch (③), and ⑤⑥ describe fixed internal behaviour rather than panel controls. The panel's two screwdriver trims (−MIX+, +HF−) aren't in the table yet.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Peak Reduction | Sets compression amount via the opto cell — the *only* control that affects gain reduction. | Set this first, dial to taste while watching the meter in Gain Reduction mode; leave Gain alone while adjusting this. | Disclosure's "one-LA" rule — Peak Reduction (+ Gain) are the only controls touched; the harder the source hits it, the higher the effective ratio (program-dependent). See [[Disclosure - Ultimatum Breakdown + Breakbeat]]. |
| ② | Gain (Output) | Post-compression output level trim — has zero effect on the compression itself. | Set only after Peak Reduction is dialed in; use to match bypassed vs. compressed loudness for an honest A/B. | — |
| ③ | Limit/Compress switch | Changes the compressor's I/O curve: Compress = gentler slope/low ratio; Limit = steeper slope/higher ratio. | Compress for gentle program-level leveling (default for tracking); Limit when you need real peak control on an unpredictable source. | — |
| ④ | Meter Selector (+4/0/+10) | Switches the VU meter between +4 dB output, Gain Reduction (center), and +10 dB output monitoring. | Check Gain Reduction mode while dialing in Peak Reduction so you're reading compression amount, not output level. | — |
| ⑤ | Release behavior (fixed, not a knob) | Program-dependent two-stage release: ~0.06s for the first 50% recovery, 0.5–5s for full release depending on reduction amount. | Not adjustable — the "musicality" comes from this baked-in behavior; if you need a different release curve, reach for a VCA/FET compressor instead. | — |
| ⑥ | Attack (fixed, not a knob) | Very fast, fixed by the electro-luminescent light response. | Relied on for its transparency on fast transients (vocal sibilance, bass pluck) without a harsh clamp. | — |

## See also (Key Parameters cross-links)
Palette: [[BASS Slot]] — Effects: [[Compression]] · [[Compression Staging]] · [[Gain Staging]]
