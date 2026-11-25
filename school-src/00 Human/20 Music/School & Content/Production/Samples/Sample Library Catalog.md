---
title: Sample Library Catalog
type: reference
tags: [production, samples]
files_catalogued: 120386
catalogued_on: 2026-07-16
updated: 2026-07-27
---

# Sample Library Catalog

A snapshot inventory of the full sample library — **120,386 audio files** — classified by type, source pack, sonic class, and (for the vintage material) the specific drum machine or synth.

> [!info] Where the files physically live
> Everything is on the **UGREEN NAS ("hyperion")** at `/Volumes/Production/Samples/`.
> Mount from the Mac via **⌘K → `smb://UGREEN-NAS.local`** (SMB user `ghost_gopher`). Off local network, reach it through the **UGREEN NAS app / web Files**.
> The classifier + raw data live on the NAS at `/Volumes/Production/Samples/.bytype-meta/` (`classify.py`, `build_mirror.py`, `classified.tsv.gz`).

> [!tip] Full searchable list
> The complete per-file index is alongside this note as **`sample-index.tsv`** (120k rows, columns: `source · type · class · instrument · path`). To find specific samples, grep that file — e.g. `grep -iP 'TR-808\tclass' sample-index.tsv` or filter by type/instrument/path.

> [!note] Visual report
> A self-contained, browsable version lives beside this note: **`Sample Library Map.html`** (open in a browser) — with per-type acoustic/electronic splits, per-machine hit breakdowns, and bar charts.

Related: [[Vintage Gear Index]] index (the Mars packs map 1:1 onto those machines/synths).

## At a glance

| Group | Files |
|---|--:|
| Drum one-shots | 49,578 |
| Melodic one-shots | 7,749 |
| Loops | 7,777 |
| Synth multisamples | 44,952 |
| FX · Vocals · untyped · unclassified | 10,330 |
| **Total** | **120,386** |

---

## "By Type" browse layer

The library also has a **`Samples/By Type/`** browse mirror on the NAS — a re-organization by *what things are* (acoustic vs electronic snares, breaks, per-machine folders) rather than by pack. Structure:

`Drums/<Type>/{Acoustic,Electronic,Unsorted}/<Source>/` · `Melodic/` · `Loops/{Drum Loops & Fills, Breaks, Melodic Loops…}` · `Drum Machines/<machine>` · `Synth Multisamples/<lib>` · `FX & Textures/` · `Vocals/` · `_Unsorted/`

> [!warning] Status of By Type
> Originally built as **symlinks (2026-07-16)**, but **Ableton's macOS browser won't follow symlinks** — every category shows up empty in Live. Decision: **rebuild as real copies** (via SSH into the NAS + `cp --reflink`), but that's **PAUSED** (NAS SSH was off). Until rebuilt, browse By Type at the shell/Finder, not in Live.

---

## By Type

| Type | Files | | Type | Files |
|---|--:|---|---|--:|
| Synth/Multisample | 44,952 | | Cowbell | 1,223 |
| Kick | 8,647 | | Cymbal/Ride | 1,136 |
| Snare | 7,714 | | One-Shot/Other | 984 |
| Tom | 7,537 | | Synth | 966 |
| Hat/Closed | 5,147 | | Cymbal/Crash | 946 |
| Unclassified | 5,124 | | Cymbal | 772 |
| FX | 4,105 | | Loop/Melodic | 532 |
| Loop/Other | 4,030 | | Synth/Stab | 380 |
| Hat/Open | 3,097 | | Loop/Perc | 349 |
| Conga/Bongo | 2,990 | | Loop/Break | 345 |
| Bass | 2,911 | | 808/Sub Bass | 145 |
| Clap | 2,805 | | Loop/Hat | 132 |
| Loop/Drum | 2,384 | | Snap | 124 |
| Perc | 2,282 | | Vocal | 117 |
| Shaker/Tamb | 2,156 | | Synth/Pad | 74 |
| Keys/Piano | 1,958 | | Brass/Strings | 72 |
| Hat | 1,524 | | Guitar | 21 |
| Synth/Lead | 1,367 | | Loop/Vocal | 5 |
| Rim | 1,333 | | | |

## By sonic class

| Class | Files |
|---|--:|
| electronic | 107,088 |
| unknown | 10,224 |
| acoustic | 3,074 |

## By source pack

| Source | Files |
|---|--:|
| Samples From Mars | 106,739 |
| Splice | 5,214 |
| KOUNT | 2,225 |
| Dead vol 2 | 1,909 |
| Billboard | 1,053 |
| Dead expansion | 1,005 |
| Goldbaby | 872 |
| Ghost Note | 567 |
| KO-II | 279 |
| Frank Dukes | 259 |
| Alchemist Secret Sauce | 212 |
| DECAP | 30 |
| Hand-Picked One Shots | 19 |

## By vintage machine / synth

Tagged on the Samples From Mars material (37 instruments):

| Instrument | Files | | Instrument | Files |
|---|--:|---|---|--:|
| Roland SH-5 | 5,825 | | E-mu SP-1200 | 2,177 |
| Linn LM-1 | 5,078 | | Korg MS-10 | 2,164 |
| Yamaha DX100 | 4,514 | | Linn/MPC60 | 1,769 |
| ARP 2600 | 4,429 | | Micromoog | 1,734 |
| Roland TR-909 | 4,201 | | Roland TR-626 | 1,615 |
| Roland SH-101 | 4,146 | | Maestro Rhythm King | 1,372 |
| Roland TR-808 | 4,026 | | Simmons SDS800 | 1,272 |
| Soviet Synths | 3,970 | | Oberheim DX | 1,113 |
| Voyetra-8 | 3,860 | | Roland TB-303 | 1,093 |
| Minimoog | 3,738 | | E-mu Drumulator | 1,046 |
| Akai S612 | 3,606 | | Roland CR-78 | 1,022 |
| Akai MPC60 | 3,460 | | Casio SK-1 | 1,004 |
| EDP Wasp | 3,377 | | LinnDrum | 833 |
| Oberheim DMX | 3,204 | | Sequential DrumTraks | 1 |
| Roland TR-606 | 3,012 | | Casio RZ-1 | 1 |
| Roland TR-505 | 2,963 | | | |
| Synare | 2,893 | | | |
| C64 SID | 2,851 | | | |
| Roland System 100M | 2,761 | | | |
| Roland VP-330 | 2,690 | | | |
| Roland TR-707 | 2,601 | | | |
| Simmons SDS-V | 2,584 | | | |

---

## Vintage Gear Index coverage

The machine/synth tags were matched against the [[Vintage Gear Index]] index. These are **catalogued but not in the index yet** — candidates for the `/gear-enrich` queue:

- **Drum machines:** Linn/MPC60, Simmons SDS800
- **Synths:** Roland SH-5, Yamaha DX100, ARP 2600, Soviet Synths, Voyetra-8, Akai S612, EDP Wasp, C64 SID, Roland System 100M, Roland VP-330, Korg MS-10, Micromoog, Casio SK-1

(Already indexed: TR-909/808/606/707/626/505/CR-78, LM-1, LinnDrum, MPC60, DMX/DX, SP-1200, Drumulator, Maestro Rhythm King, Simmons SDS-V, Synare, Casio RZ-1, DrumTraks, SH-101, Minimoog, TB-303.)

## Flags / known issues

- **~18,286 files share a name with another file** — mostly intentional: *Essential WAV From Mars* ships 24-bit + 16-bit mirrors (~5,328 each); KOUNT Splice files exist at pack root *and* under `KOUNT DRUMS/Splice`. A dedupe pass someday, not urgent.
- **5,124 files (4.3%) unclassified** — creatively-named one-shots (loose Splice files, "Funky Crunch", "Haus Baby"…). They land in `_Unsorted` so nothing is lost.
- **`🥇Quick Start / Loops` was empty** — the curated loops shelf was created but never filled (retired 2026-07-16; contents folded into `Billboard` + `Hand-Picked One Shots`).

## Notes

- **Excluded deliberately:** `Grooves/` (MIDI groove templates), `Song Samples/` (Ableton projects).
- **Pending someday:** dedupe actual files; classify `_Unsorted` (~5k) and `Loops/Unsorted Loops` (~4k).
- This is a **point-in-time snapshot** (catalogued 2026-07-16). To refresh: re-run `classify.py` on a fresh file list on the NAS, re-export `classified.tsv.gz`, and regenerate this note + `sample-index.tsv`.
