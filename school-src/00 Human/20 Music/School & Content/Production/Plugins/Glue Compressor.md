---
type: plugin
title: "Glue Compressor"
category: Compressor/Limiter
vendor: "Ableton"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Glue Compressor

![[Images/Glue Compressor.png]]

**Category:** Compressor/Limiter
**Vendor:** Ableton

## What it is

Ableton's bus-style compressor modeled on classic VCA console/SSL-bus compressor behavior, with a program-dependent auto-release and a Range control for makeup gain limiting.

## What it's used for

Bus and master glue compression — pulling a drum bus, mix bus, or group together with a cohesive, musical compression character.

## FX chain notes

Sits at the end of a group/bus chain (drum bus, mix bus) after individual track processing, usually with light gain reduction (1-3 dB) for cohesion.

## Used in my chains

My default group/bus glue — slot 2 on almost every group, and the stereo glue on the master. Pattern: **2:1 + 30 ms + Auto release + ~1.5 dB GR** for gentle "move as one section" glue; **4:1** and firmer when a bus can take real compression.

- **[[Master Chain]]** — *slot 3, the glue*: 2:1, Attack 30 ms, Auto, 1.5 dB GR on the beat, Soft Clip OFF. The SSL-bus move that makes buses sound like a record.
- **[[3 Bass Bus|Bass Bus]]** — 2:1, Attack 30 ms, Release 0.2 s, ~1.5 dB GR — glues bass sources without squashing sub/transient.
- **[[2 Guitar Group|Guitar Group]]** / **[[2 Inst-Synth Group|Inst-Synth Group]]** — 2:1, 30 ms, Auto, ~1.5 dB GR — section moves as one, pick/note attack intact.
- **[[2 Drums Hats Group|Drums Hats Group]]** — 2:1, **Attack 1 ms** (no transient to protect), ~1.5 dB GR — hat + shaker + perc breathe as one.
- **[[2 Backup Vocals Group|Backup Vocals Group]]** — firmer **4:1**, Attack 20 ms, ~3 dB GR — fuses multiple backing takes into one block.
- **[[3 FX Bus|FX Bus]]** — **4:1**, Attack 10 ms, ~2.5 dB GR — keeps unpredictable FX throws civilized.

## Techniques

- **Owned best-match for a named "Dr. Dre preset" ("Cross-Eyed") on a drum-bus parallel "Transformer" aux — a fast-attack, gentle-ratio SSL-style recipe that lets the transient sneak through before grabbing it.** Concrete settings given: **Attack 30, Release 1, Ratio 2:1**, drawing roughly 8 dB of gain reduction — the fast-ish attack is deliberate so the transient passes before compression engages, and the resulting harmonic distortion/character is treated as the point, not a side effect. Feeds off a [[Decapitator]] saturation stage (see that note's own "Transformer" entry) with the aux's low end stripped so only top-end "spark" returns to the mix. → [[Decapitator]], [[Parallel Processing]], [[3 Drums Bus]], [[TRANSIENT Slot]] — Mix with the Masters (Jaycen Joshua), [[Jaycen Joshua on creative drum mixing]]
- **Owned best-match for "glue created by shared-bus routing, not just by effects" — the general lesson behind an SSL desk's bus-sharing habit: route multiple element groups through the SAME bus/return specifically to blend them, rather than reaching only for a compressor.** "People think glue you create with just effects — no, glue you also create with your choices of summing, your choices [of] share compression, [routing] certain elements in the mix." On this owned device: multiple tracks feeding the same Glue Compressor instance (rather than each getting its own) is itself the glue move; the compressor's own character is secondary to the shared-bus decision. → [[Session Templates]], [[Masking and Carving]] — Mix with the Masters (Rafa Sardina), [[Rafa Sardina's mixing workflow]]
- **Owned best-match for an SSL-style channel compressor's default "Z" preset — deliberately named to sort to the bottom of the preset list — used as an always-on default on nearly every vocal track: very light compression, barely audible, no EQ engaged, purely to lift the signal a little.** "Basically my ZZZZ setting... it drops down to the bottom of the list, so I use Z as my default. And my default is with the compressor in doing very light compression, barely hearing it, and it just kind of lifts up the signal a little bit. No EQ going on, but yeah, that's my SSL preset." Positioned right after an SSL-style broad EQ pass, ahead of [[Soothe2]], in the source's per-track vocal chain. The named plugin (a Waves-style SSL 4000 E-Channel) is unowned — see [[Plugin Wishlist]]. → [[Compression]] (effect), [[Plugin Wishlist]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Heavy compression placed at the very END of a multi-stage color chain reveals texture the earlier stages added, rather than just leveling the part.** Recreating a Mk.gee Casio CZ-5000-style synth: two layered CZ-emulation VSTs → flanger → chorus → tape (noise) → plate reverb → distortion → **heavy compression last** — explicitly called out as what "brings out all the nice textures from the noise and the flanger" earlier in the chain. Same group-then-compress logic used on the live-drum side of the same video: route kick + snare roll + snare + hat to one bus and compress + saturate them TOGETHER (the actual "saturation" Mk.gee describes as his drum-sound secret) rather than per-element. → [[Kontakt 7]], [[Saturation and Distortion]], [[Little Plate]], [[Kramer Tape]] — loner, [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU)
- **Threshold all the way down + Makeup gain cranked up, to flatten dynamics into a texture, not to glue.** The opposite of the gentle 1–3 dB bus-glue setting this device normally runs (see "Used in my chains" above): pulling Threshold to its floor and driving Makeup gain hard flattens the dynamic range almost entirely, which accentuates a source's mechanical noise — on an upright piano patch, this exaggerates pedal thumps and hammer noise into a **stuffy, congested** character. Placed first in an [[Arca Piano]] sound-design chain, ahead of a reverb deliberately positioned before it (see next entry) and a stack of chorus/filter movement after it. → [[Arca Piano]], [[Clipping and Loudness]] — asd, [ableton sound design | DECONSTRUCTION STUDY [ver. 1] Arca Inspired Piano](https://www.youtube.com/watch?v=equNWJvGVio)
- **Reverb placed BEFORE this device (not after) turns its own gain-reduction "reset" into a mirage effect.** When Glue Compressor is driven hard (as in the flatten-dynamics entry above), it constantly resets between hits — and each reset **pushes a preceding reverb's wet tail to the forefront** right as the loud dry transient gets clamped down. A/B'd by bypassing the compressor: with it engaged the reverb reads as floating free of the dry piano, like a mirage/apparition of the original note, rather than a normal tail sitting under it. A deliberate sound-design use of the same "compression exposes a quiet reverb tail" mechanism [[Reverb]] and [[Compression]] already document as something to watch out for on a master — here it's the point. → [[Arca Piano]], [[Reverb]], [[Compression]], [[Depth and Space]] — asd, [ableton sound design | DECONSTRUCTION STUDY [ver. 1] Arca Inspired Piano](https://www.youtube.com/watch?v=equNWJvGVio)
- **BPM-time the release for glue compression — the actual formula, not just "match the tempo."** Glue compression works by using a long release so multiple transients get compressed collectively (reads as cohesive) — but if the release isn't in time with the track, the signal's return-to-unity lands like a rogue transient and messes up perceived timing. Formula: `60,000 ÷ BPM = one quarter note in ms`, multiply by 4 for a whole note, subtract the attack time, use that as the release (140 BPM example: 429 ms/quarter → 1,716 ms whole note, minus attack). Pairs with a **vari-mu ("very-mu") character compressor** for tone — one that adds harmonics + subtle EQ on top of the gain reduction, not owned (Pulsar Audio Mu / free Klanghelm, see [[Plugin Wishlist]]); Glue Compressor's own Soft Clip is the closest owned stand-in for adding character on this stage. → [[Compression]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **Mastering-target: 1–2 dB total, RMS-detector-biased with a little Peak blended in, tuned to be inaudible as compression — just quieter.** On a master/final-bus pass, set the **Peak/RMS switch** mostly toward RMS (average-loudness detection) with a small amount of Peak mixed in, and dial threshold/ratio for only 1–2 dB of total gain reduction — the explicit test is that you shouldn't be able to hear it working, only see the level drop. Keeping this stage this light means a downstream limiter only has to catch a few dB, which is what keeps the limiter itself from sounding noticeable — this stage's real job is shrinking the limiter's workload, not doing audible dynamics control on its own. *(The video demos this on the free Kotelnikov compressor, which isn't owned — see [[Plugin Wishlist]] — but Glue Compressor's own Peak/RMS blend switch covers the identical mechanic.)* → [[Master Chain]], [[Compression]] — Sage Audio, [The Only Music Mastering Video You'll Ever Need](https://www.youtube.com/watch?v=M88T8jFL2uU)
- **Attack maxed + Release minimized to glue a drum bus without eating transients, plus a sidechain low-cut so the kick doesn't over-trigger it** — on a full drum group, push **Attack all the way up** so the kick/snare transients pass through uncompressed before the compressor clamps down, and pull **Release all the way down** so it recovers to zero gain reduction before the next hit — glue without visibly squashing each transient. If the kick still reads "neutered" (over-compressed) because its low end dominates the detection, open the sidechain filter and engage the **EQ**/high-pass on the detector so the compressor reacts less to sub-bass content specifically. Finish with **Makeup** gain to restore level and **Soft Clip** engaged for an extra layer of glue/distortion character; pull the whole group's output down if the combined result reads too loud. → [[Compression Staging]], [[EQ]] — You Suck at Producing (Underbelly ft. Arbor), [how to turn simple lofi beats into FULL SONGS ft. @prodarbour](https://www.youtube.com/watch?v=VOMJUqx_rm0)
- **Glue Compressor on the master is Ableton's answer to FL Studio's Soft Clipper — proof Ableton drums CAN hit as hard as FL's.** Ableton has no device literally named "Soft Clipper," but the Glue Compressor driven on the master bus behaves almost identically to it — pushing back on the persistent myth that Ableton can't get drums to smack the way FL Studio can. → [[Clipping and Loudness]] — Decap (Sol State), [9 Producer Tips From "Drums That Knock" Creator Decap](https://www.youtube.com/watch?v=MGCa4b49blA)
- **"Drum Full Parallel" preset as one-device parallel compression, no separate send needed** — loading this preset directly on a drum bus blends a heavily-compressed copy with the clean signal inside the single device, instead of routing a separate parallel-compression send. → [[Parallel Processing]] — You Suck at Producing, [Warmth](https://www.youtube.com/watch?v=Yv3v9SsoDMw)
- **Back the preset's Threshold off, then gain-match with a Utility** — the Drum Full Parallel preset's default is extreme (heavy, constant gain reduction); raising Threshold reduces how hard it ducks so the drums stay louder/less squashed, then a [[Utility]] after the compressor restores the level to match the original for a fair A/B. → [[Utility]] — You Suck at Producing, [Warmth](https://www.youtube.com/watch?v=Yv3v9SsoDMw)
- **Pushed makeup gain after parallel comp produces deliberate soft clipping — kept as wanted "crunch," not fixed** — turning the Gain (makeup) knob up hot enough to soft-clip is A/B'd directly against the same signal with the clipping bypassed; the un-clipped version reads flatly worse — the crunch is the point, not a mistake to gain-stage away. → [[Clipping and Loudness]] — You Suck at Producing, [Warmth](https://www.youtube.com/watch?v=Yv3v9SsoDMw)

## Manual

- 📄 [Live 12 Reference Manual — Live Audio Effect Reference, Glue Compressor section (§28.21)](https://www.ableton.com/en/manual/live-audio-effect-reference/#glue-compressor) — Ableton stock device; per the manual-enrich workflow, no PDF is downloaded (would mean grabbing the whole Live manual).

**High-level points:**
- Modeled on the classic SSL 4000-series G-bus compressor sound (VCA-style, program-dependent behavior) — the device that "glues" a whole mix or bus together on countless commercial records.
- **Ratio is a detented knob**, not continuously variable — fixed stops at 2:1, 4:1, 10:1 (plus positions in between); this mirrors the original hardware's rotary switch, not a plugin limitation.
- **Auto Release** adapts release time dynamically to the incoming material — this is the hardware's signature "musical" behavior and the setting used on most bus-glue duty.
- **Range** caps the maximum possible gain reduction independent of Threshold/Ratio — a safety ceiling so an unexpected peak can't over-compress the bus.
- **Peak/RMS switch** changes detector behavior: RMS reacts to average loudness (smoother, more musical for bus glue), Peak reacts to instantaneous level (faster, grabbier pumping).
- **Soft Clip** adds an output clipping stage that rounds off peaks for extra loudness/glue without harsh digital clipping.
- **Dry/Wet** enables New York-style parallel compression inside the one device — no separate return track needed.
- The **Sidechain section** has its own Gain + EQ (high/low cut) that shapes only the detection signal, not the audio itself — high-passing the sidechain input is the standard fix for kick-triggered over-pumping.

## Key Parameters

```visual-key
image: Images/Glue Compressor.png
coords: Images/Glue Compressor.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold | Level above which compression begins | Dial in so the gain-reduction meter shows 2-4 dB on peaks for subtle glue, not obvious pumping | — |
| ② | Ratio | Detented ratio: 2:1 / 4:1 / 10:1 (+ in-between positions) | 4:1 is the classic "glue" setting for a drum bus or mix bus | — |
| ③ | Attack | How fast compression engages after the threshold is crossed | Slower attack (30 ms+) lets transients through first, preserving punch on a drum bus | — |
| ④ | Release | Release time, or Auto | Auto for most program material — the hardware's signature adaptive behavior | — |
| ⑤ | Gain (Makeup) | Compensates for level lost to compression | Match bypassed vs. compressed loudness by ear before judging the effect | — |
| ⑥ | Range | Caps maximum gain reduction regardless of Threshold/Ratio | Set a ceiling (e.g. −6 dB) as a safety net on unpredictable program material | — |
| ⑦ | Dry/Wet | Blends compressed signal with the uncompressed original | Parallel ("New York") compression in one device — push Wet down for aggressive-but-controlled glue | — |
| ⑧ | Soft Clip | Output clipping stage that rounds off peaks | Engage for extra perceived loudness/glue without harsh digital clipping | — |
| ⑨ | Sidechain (Gain/EQ) | External trigger input + detection-signal-only shaping (opens from the title-bar ► fold) | High-pass the sidechain input so low end doesn't over-trigger compression (classic kick-vs-bass pumping fix) | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]] · [[Parallel Processing]] · [[Clipping and Loudness]]
- Palette: [[Sound Palette]]
