---
type: plugin
title: "XO"
category: Instrument
vendor: "XLN Audio"
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

# XO

![[Images/XO.png]]

**Category:** Instrument
**Vendor:** XLN Audio

## What it is

XLN Audio's AI-assisted drum sample browser and playback instrument, using machine tagging to organize huge sample libraries by sonic characteristics.

## What it's used for

Fast browsing and auditioning of one-shot drum samples (kicks, snares, hats) tagged by AI for quick kit-building.

## Techniques

- **Percussion loop pulled straight from XO's browser and dropped in unprocessed as a texture/bounce layer under an ambient synth pad.** On an underwater-sounding R&B synth-pad build, a perc loop sourced from XO is layered in alongside a rain-noise texture with no further processing mentioned — it "sounded really good as it is." Auto-captioned "this perk loop from x y," a near-certain caption garble of "XO." *(Flagged uncertain — the source could instead be a same-sounding third-party pack name; logged here as the closest owned match.)* → [[Ambient Texture and Field Recording]], [[Sampling and Sound Selection]] — loner, [how to make melodic r&b beats for tory lanez & chris brown (underwater synth/vocal sample)](https://www.youtube.com/watch?v=7JCup6FVW5o)

## FX chain notes

Used as the drum instrument source when assembling a kit from one-shot samples.

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/XO.pdf|Local PDF]] · [Official getting-started guide](https://support.xlnaudio.com/hc/en-us/articles/6843805387421-XO-getting-started-guide)

**High-level points:**
- XO's core idea is **"Space"** — a 2D scatter plot where every drum sample in your library (factory content + your own folders) is placed by sonic similarity, not folder location. Browsing is spatial (click/drag through clusters) rather than list-scrolling, so genre/sample-pack silos disappear — a snappy trap clap and a snappy pop clap can sit next to each other regardless of which pack they came from.
- The **Similarity List** is the fast-iteration tool: once you land on a sound you like, it surfaces the closest-sounding neighbors as a one-click swap list — this is how you audition variations without leaving the beat playing.
- **8 fixed sample slots**, each independently loaded/muted/soloed — XO is built around building one kit at a time (kick, snare, clap, hats, toms, perc, FX), not an unlimited multi-sampler.
- **Kit Similarity** (shift the whole kit's similarity position at once, optionally locked to a filter like "808" or "short") is the fastest way to re-skin an entire pattern's sound palette without rebuilding the groove — e.g. turn a trap kit into a lo-fi kit in one drag.
- Per-slot sound-shaping (Envelope/Pitch/Tone/Cut/VelSens/FX Sends) plus a Kit-level bus (Crunch/Cut/Soft Clip) means XO isn't just a sample browser — it can finish-process the kit before it ever leaves the plugin.
- The sequencer (2 patterns, chainable AB/AAAB) has a built-in **Accentuator** (per-lane accent curve) and per-lane **Groove/Nudge** — groove and humanization live inside the instrument, not bolted on via a separate MIDI effect.

## Used in my chains

A **drum-sample browser/sequencer** (source tool, not an FX slot) — organizes one-shots on a similarity map so you pick by sound, not filename:

- **[[2 Drums Group|Drums Group]]** — browse/audition one-shots by similarity to choose kicks/snares/hats, then play them via [[Drum Rack]]/[[Simpler]]. Sound selection replaces mic technique as "Step 1 — Record."

## Key Parameters

```visual-key
image: Images/XO.png
coords: Images/XO.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①③④⑤ only — this capture is the **Space** view. ② Similarity List appears once a sample is selected, and ⑥–⑬ (envelope, pitch, tone, VelSens, FX sends, accentuator, groove, kit bus) all live behind the **Edit** tab.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Space | 2D similarity-plotted sample browser across all loaded libraries | Drag through a cluster to audition dozens of similar one-shots fast when hunting for a specific [[SUB Slot]] kick character | — |
| ② | Similarity List | Ranked list of sounds closest to the currently selected one | Step through with arrow keys while the beat plays to A/B candidates in context, not in isolation | — |
| ③ | 8 Sample Slots | Fixed kick/snare/clap/hat/etc. slots, each mute/solo/lock-able | Lock a slot you're happy with, then use Kit Similarity to re-roll everything else around it | — |
| ④ | Search & Filter Panel | Category tags (Kick/Snare/Clap/…) + Main Freq / Length / Drumminess sliders + folder scope | Filter Length short + text search "808" to force a slot into tight sub-808 territory only | — |
| ⑤ | Kit Similarity | Shifts all 8 slots' similarity position together | One-drag re-skin of a whole pattern's sound palette (e.g. trap kit → lo-fi kit) without touching the groove | — |
| ⑥ | Envelope (Transient/Hold/Decay) | Per-sample amplitude shaping | Shorten Decay on a sampled 808 to tighten it for busy trap patterns; lengthen for a sustained [[BASS Slot]] sub | — |
| ⑦ | Pitch + Pitch Spread | ±1 octave tune, plus stereo detune offset | Small Pitch Spread on claps/snares for a wider, doubled-hit feel without duplicating the sample | — |
| ⑧ | Tone / Cut | Tilt-style tone filter (Tone) + steep frequency cut (Cut) | Cut low end out of a clap/hat slot so it doesn't fight the [[SUB Slot]] kick in the mix — see [[Masking and Carving]] | — |
| ⑨ | VelSens | How much velocity affects volume and sample start point | Higher VelSens on hats for natural-feeling dynamic playing/programming | — |
| ⑩ | FX Sends (×2) | Per-slot send to XO's internal reverb/delay units | Send snare/clap to a short send-reverb for glue without wetting the kick | — |
| ⑪ | Accentuator | Per-lane accent-velocity curve across the step sequence | Hit Random for quick humanized velocity variation on a programmed hat lane instead of hand-drawing every step | — |
| ⑫ | Groove + Nudge (per lane) | Swing template + half-step time offset, per sequencer lane | Nudge the hat lane late against a straight kick/snare for a laid-back pocket feel | — |
| ⑬ | Kit bus (Crunch/Cut/Soft Clip) | Kit-level saturation, filter, and clip stage | Light Crunch + Soft Clip on the whole kit bus for extra punch before it hits the mixer | — |

## Patch Recipes
Circled numbers = the matching row in the Key Parameters table above.

### Trap/hip-hop kit — [[SUB Slot]] + [[TRANSIENT Slot]]
- ④ Search & Filter: Category Kick, text "808", Length long → load into slot 1
- ⑥ ① Decay shortened for pocket-tight sub hits under busy hi-hat lanes
- ④ Category Clap + Snare layered in adjacent slots for the classic trap clap-snare stack
- ⑨ High VelSens on the hat slot for rolls/triplets with natural dynamic falloff
- ⑪ Accentuator random-hit on the hat lane for a humanized roll feel

### Lo-fi / boom-bap kit — [[BED Slot]]
- ④ Search & Filter: Drumminess pulled down, Main Freq lower, folder scope narrowed to a vintage/dusty-tagged pack if available
- ⑧ Cut applied to trim harsh highs off snare/hat slots for a dusty, filtered character
- ⑬ Kit bus Crunch pushed for tape-like grit across the whole kit
- ⑫ Groove set to a swung template (Swing16) with light per-lane Nudge for a human, not-quantized feel

### EDM/pop kit — [[TRANSIENT Slot]]
- ④ Category Kick, Length short, Main Freq higher for a punchy club kick
- ⑦ Pitch Spread added on the clap slot for extra width without phasing
- ⑩ FX Send to a short reverb on claps/snares for glue against a loud master bus
- ⑤ Kit Similarity used mid-session to audition alternate kit character while keeping the same groove

### Quick re-skin (any genre)
- ① Land on a kick you like in Space, lock it (③)
- ⑤ Kit Similarity dragged to shift every other slot's character together, filtered by the locked kick's vibe
- ② Step through the Similarity List per-slot for any element that doesn't sit right after the re-skin
