---
type: plugin
title: "RC-20 Retro Color"
category: Drive/Color
vendor: "XLN Audio"
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

# RC-20 Retro Color

![[Images/RC-20 Retro Color.png]]

**Category:** Drive/Color
**Vendor:** XLN Audio

## What it is

XLN Audio's all-in-one lo-fi/retro character plugin combining tape, vinyl, noise, distortion, and space effects in one interface.

## What it's used for

Fast, one-stop retro/lo-fi character — tape warble, vinyl crackle, degraded texture — on any track or bus.

## FX chain notes

Used as a single coloration stage late in a chain, often the final creative-character device before output.

## Techniques

- **Bitcrush's "Flux" mode applies a different crush amount to every note automatically, instead of one static setting for the whole part** — functionally like ten different bitcrushers each dialed differently, but happening per-note with no manual automation required; a built-in source of note-to-note variation for anti-repetition/"analog" character. Similar move on **Wobble**: dial its own internal Mix knob back against the untouched dry signal for a subtle pitch-wobble variation that's mostly only noticeable on headphones, rather than running it full-wet as an obvious effect. → [[Automation]] — Disclosure, [Faking "That Analog Sound" (15 Tricks)](https://www.youtube.com/watch?v=HEcJ8vHWk88)
- **A full from-scratch lofi-hip-hop preset, module by module**: **Noise** — pink over white (skip vinyl this pass), kept quiet; **Wobble/Flux** — turned to full flux to audition, then pulled back to a subtler amount, set to follow the notes slightly, and switched from the stereo default to **mono**; **Distort** — subtle tube saturation for grit, deliberately skipping the Digital/bitcrush module this pass; **Space** — wants "big space" from this module; **Magnetic** — demoed cranked for the volume-fluctuation ("magnitude") + flutter (tremolo-like) effect, then dialed back to a musical amount. Paired with sidechaining everything against the kick as a baseline lofi habit. → [[Neo-Soul - Lo-fi]], [[Sidechaining]] — Max Konyi, [[Jazzy LoFi Hip-Hop - Beat Breakdown]]
- **EP tape + vibrato pairing** — Scarbee A-200 electric piano through RC-20, then a vibrato plugin (Melda MVibrato) after it: "the RC-20 and the vibrato working together create a crazy little wave, super beautiful." His caveat elsewhere: the stock fake-tape-on-piano sound is becoming a cliche ("lo-fi beats to study to") — the vibrato stage is what keeps it human — Lophiile, [Sound Design With a Musical Mindset](https://www.youtube.com/watch?v=spPaJzYPgzk)

- **On top of an amp-sim for the instant guitar-sample tone** — the "Jai Paul" chain: Guitar Rig funky patch → RC-20 (variant: Flux-chorus preset, wobble pulled down) — the lo-fi funk guitar-loop starting point — Kenny Beats, [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ)
- **"Flux" mode = a *different* bit-crush per note** — on a Juno bass, flux makes the Digital/bit-crush section shift note-to-note (vs a static crusher applying the same crush to every note); "like 10 bit-crushers each on a different setting." → [[Saturation and Distortion]] — Disclosure, [Never Enough](https://youtu.be/lGopQwQo9Ag)
- **"Wobble" blended via the Mix knob** on sawtooth stab chords — parallel phase/flange character instead of full-wet. Guy uses RC-20 as an *effects box* (sprinkles/flanger/character), not the usual lo-fi sample-crusher. → [[Modulation]] — Disclosure, [Never Enough](https://youtu.be/lGopQwQo9Ag)
- **"Whip" knob for a one-move mono→wide drop** — use the Space/Whip control to open a mono verse into a wide chorus at the drop, so the section reads "bigger" without a volume jump. → [[Stereo Field]], [[Width and Stereo]], [[Modulation]] — Disclosure, [Talk (with Khalid)](https://youtu.be/PBbnvElf9ac)
- **Noise layer for the [[TEXTURE Slot]]** — its vinyl/hiss noise gives a track an era and kills dead silence (low level, high-passed so it doesn't muddy [[SUB Slot]]/[[BASS Slot]]). → [[Ambient Texture and Field Recording]] — Disclosure, general Disclosure/Burial texture habit

## Manual

- 📄 [[RC-20 Retro Color.pdf|Local PDF]] · [Official manual](https://assets.xlnaudio.com/documents/rc-20-retro-color_manual.pdf)

**High-level points:**
- Six modules in a fixed chain — **Noise, Wobble, Distort, Digital, Space, Volume** — each with its own on/off, amount, and small param set; the skill is using *one or two*, not all six.
- The **Magnitude** big knob scales every enabled module at once — it's the "how broken" master fader, automatable for section contrast.
- **Flux** adds random drift to the degradation so loops don't degrade identically every pass — the anti-static secret.
- Every module has its own **wet/dry-style depth**, so this is parallel processing without routing.
- Noise types are program-dependent (vinyl crackle ducks with the music if you want) — noise that *reacts* reads as real media, constant noise reads as a sample layer.

## Used in my chains

My **lo-fi character** box — wobble, noise, distortion, and reverb-degradation in one, for instant "aged/vintage" texture:

- **[[1 Drums FX Track|Drums FX Track]]** — *slot 2, character*: wobble/noise texture on the FX lane.
- **[[1 Backup Vocal Track|Backup Vocal Track]]** — *slot 4, character (on-brand)*: lo-fi color on ad-libs/backups.
- **[[1 Electric Guitar DI Track|Electric Guitar DI]]** (Jai Paul lo-fi-funk chain) / **[[2 Drums Group|Drums Group]]** (unsplit-loop texture) — as the degradation stage.
- *Alt* to [[Decapitator]] on the [[Saturation Send]] when you want wobble/noise, not just drive.

## Key Parameters

```visual-key
image: Images/RC-20 Retro Color.png
coords: Images/RC-20 Retro Color.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Noise (type + ducking) | Vinyl/tape/mains hum layers | Vinyl crackle, ducked, low in the mix on keys/samples = instant "sampled from wax" | Kenny Beats reaches for RC-20 constantly on The Cave (documented on stream) |
| ② | Wobble (rate/depth) | Wow & flutter pitch instability | Subtle slow wobble on pianos/pads = the emotional "old tape" effect; heavy = broken VHS | The lo-fi hip hop piano sound is essentially wobble + noise |
| ③ | Distort (types) | Saturation through tube/tape/transistor flavors | Low drive on drum bus = glue-grit; automate off in choruses for lift | — |
| ④ | Digital (bits/sample rate) | Bitcrush + downsampling | 12-bit-ish on drums = SP-1200/MPC60 era hip hop crunch | The SP-1200 sound it's imitating defined golden-era hip hop drums |
| ⑤ | Space | Small lo-fi reverb/ambience | Tiny amounts fake "recorded in a room" on DI'd sources | — |
| ⑥ | Volume (dropouts) | Random level dips like worn media | Very low amounts on intros/outros; too much reads as a glitch plugin | — |
| ⑦ | Magnitude | Master depth over all modules | Automate: verse 100% → chorus 40% = the arrangement opens up without new tracks | — |
| ⑧ | Flux | Randomizes module behavior over time | Any looped material: some Flux so bar 1 ≠ bar 5 | — |

*One coloration stage late in the chain (see [[FX Chain System]]); on the [[Bedroom Pop - Indie]] lane this is the "one wrong sound" machine.*

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
