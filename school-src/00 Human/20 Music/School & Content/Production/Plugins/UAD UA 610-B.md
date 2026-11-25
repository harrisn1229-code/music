---
type: plugin
title: "UAD UA 610-B"
category: Preamp (Unison)
vendor: "Universal Audio"
platform: UAD Console
tags: [plugin, uad, unison]
owned: true
owned_source: uad-auth
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
depth_linked: true
manual_enriched: true
briefed: backlog
---

# UAD UA 610-B

![[Images/UAD UA 610-B.png]]

**Category:** Tube Preamp / Channel Strip (Unison)
**Vendor:** Universal Audio — stock Realtime Analog Classics bundle on the [[Universal Audio Apollo Twin MkII]]

## What it is

Emulation of the UA 610 tube console preamp — the desk Sinatra and the Beach Boys were cut on. As a **Unison** plugin it physically reconfigures the Apollo's preamp impedance/gain staging to behave like the hardware, not just process after the fact.

## What it's used for

Warm, round tube color on the way in. The go-to Unison pick for acoustic guitar and vocals when "flattering, not flat" is the goal.

## Key settings

- **Gain (tube stage):** LOW setting for condensers — the [[Neumann TLM 102]] runs hot. Drive higher only when you *want* audible tube thickening.
- **Level:** trim so the DAW sees ~−18 dBFS average, peaks −12 (see [[Gain Staging]]).
- **HPF:** off at the preamp — do surgical cuts in Ableton where they're undoable.
- **Impedance:** 2.0k default for mics; changing it audibly shifts brightness/body — sweep by ear.

## FX chain notes

Rounder-tube alternative to the [[UAD Neve 1073]] as the first device in `uad_console` chains — see [[1 Acoustic Guitar Track|Acoustic Guitar Track]]. Neutral alternative: no Unison plugin at all (clean Apollo preamp).

## Used in my chains

My **rounder tube preamp** (Unison) — the warmer, tube-forward alternative to the [[UAD Neve 1073|Neve 1073]] on the way in; especially good where tube input flatters the source. ~0 VU, printed conservatively:

- **[[1 Electric Piano Track|Electric Piano Track]]** — *slot 1*: driven slightly harder than a piano (EPs love tube input), ~0 VU.
- **[[1 Electric Bass DI Track|Electric Bass DI]]** / **[[1 Digital Bass Track|Digital Bass]]** — *slot 1, Unison preamp*: tube weight on the bass DI.
- **[[1 Synth Bed Track|Synth Bed]]** — *slot 1*: barely on, ~0 VU.
- Alt to the 1073 for round tube warmth on soft/ballad vocals.

## Key Parameters

```visual-key
image: Images/UAD UA 610-B.png
coords: Images/UAD UA 610-B.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①–⑤ only — ⑥ Unison is a UAD Console integration mode, not a control on this panel.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Gain (input) | Tube input gain — drives the preamp's tube stage for warmth/color | Push a touch harder on EPs/bass for tube saturation; back off for clean weight | — |
| ② | Level (output) | Output level, played against Gain to set drive vs. loudness | High Gain + low Level = more tube color at the same output | — |
| ③ | Hi EQ | High shelf (program EQ) | Gentle top lift for air on dull sources | — |
| ④ | Lo EQ | Low shelf (program EQ) | A little low weight on thin DIs | — |
| ⑤ | Impedance (Hi/Lo) | Input impedance — changes the tone/loading of the mic/DI | Switch to hear which loading flatters the source (a real tone lever) | — |
| ⑥ | Unison | Hardware-integration mode for tracking through Apollo | Use the Unison instance while tracking so the preamp interacts with the source | — |

## Manual

- 📄 [[00 Human/20 Music/School & Content/Production/Manuals/UAD UA 610-B (hardware - 2-610).pdf|Local PDF]] · [Official manual](http://media.uaudio.com/assetlibrary/2/-/2-610-manual.pdf)
- Hardware original: the UAD 610-B models the tube preamp channel from Bill Putnam's original 610 modular console (1960, cut Pet Sounds and countless Bill Putnam-era records); the linked PDF is Universal Audio's **2-610** — the modern 2-channel reissue that carries the same circuit topology and control layout as the vintage 610 channel, used here as the closest available manual since the original console documentation isn't published as a standalone PDF.

**High-level points**:
- The 610 is a **two-gain-stage, all-tube, class-A single-ended** preamp — the tube stages (not a solid-state gain block) are what add the "round" character, and driving Gain harder pushes more of that coloration before Level trims it back down.
- **Gain vs. Level is a drive/loudness split**, same as any tube preamp: high Gain + low Level = more tube saturation at a controlled output loudness; low Gain + high Level = cleaner, more headroom.
- **Impedance switching is a real tone control**, not a technical afterthought — changing input impedance changes how a mic or DI "sees" the preamp, audibly shifting brightness and low-end body; the manual explicitly frames it as something to sweep by ear per source, not leave on a default.
- The built-in **Hi/Lo shelving EQ is program EQ**, not surgical — broad, musical shelves meant for a light pre-color, not corrective work (leave surgical cuts to a linear-phase EQ downstream).
- As a **Unison** plugin in the Apollo ecosystem, selecting it changes the physical input impedance/gain staging of the interface itself while tracking — it only behaves like the hardware when loaded in the Unison-enabled input slot, not as an insert after the fact.
- Originally built into 610-series modular console channels (not sold as a standalone box until later reissues like the 2-610/SOLO-610) — the UAD emulation models the channel-strip preamp section specifically.

## See also

- Plugins: [[UAD Neve 1073]] · [[UAD Teletronix LA-2A]] · [[UAD Pultec EQP-1A]]
- Techniques: [[Gain Staging]] · [[Compression Staging]]
- Gear: [[Universal Audio Apollo Twin MkII]]
