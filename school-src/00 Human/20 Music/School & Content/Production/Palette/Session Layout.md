---
type: reference
title: Session Layout
tags: [production, mixing, routing, session-setup, arrangement-view, reference]
---

# Session Layout — Routing, Track Order & Seeing the Slots

How [[Sound Palette]]'s slots show up in an actual Live Set. Arrangement View workflow. Companion to [[Stereo Field]] (pan map per slot) and [[FX Chain System]] (what goes *on* each tier).

## Group vs Return — the difference

- **Group track = a bus.** The tracks' *actual audio* flows through it. Everything downstream of it hears it.
- **Return track = an effect.** It receives a *copy*, dialed in with the send knob. The dry track still goes to its group.
- Rule: **families are Groups. Effects are Returns.** A "Vocal Return" is a mistake — that's a Group.

## The hierarchy

1. **Tracks** — individual sources.
2. **Groups (by family)** — Vocals · Drums · Bass · Keys/Synths · Guitars · FX/Risers.
3. **Buses (by family)** — same six, one tier up. Only add this tier if a family actually needs it; most songs, the Group *is* the bus.
4. **Mix Bus** — one Group holding all of the above.
5. **Master** — the final 10% ([[Master Chain]]).

**Returns** sit off to the side, not in that chain: Reverb Room · Reverb Long · Delay Slap · Delay Other · Saturation · Width · Parallel Comp · Air/Shimmer. They feed the **Mix Bus**.

**Buses go by family, not by frequency.** Slots change every section (verse Rhodes → chorus pad), so they can't carry routing. Family never changes. Slots decide the *sends* — which return, how wet — not the wiring.

## Track order — low to high, at both scales

Scanning down the Arrangement should always go low → high.

**Group order, top to bottom:**
1. Drums
2. Bass
3. Keys / Synths
4. Guitars
5. Vocals
6. FX / Texture

**Within each group, same rule:**
- Drums → kick · snare · toms · hats (this is the ascending HPF ladder, in track order)
- Keys → pad · Rhodes · comping clav
- Guitars → open rhythm (BED) · muted riff (MIDS) · lead
- Vocals → lead · doubles · harmonies · ad-libs

**Why:** two things sharing a slot end up as *adjacent lanes* instead of twenty rows apart.

## Seeing the slots (three moves, nothing to memorize)

**1. Slot in the track name** — `SUB · 808`, `BED · Rhodes`, `LEAD · Vox`. Shows up in every view, mixer included.

**2. Clip color = slot.** Clip color is independent of track color in Live, so track color stays **family** (guitars stay yellow) while clip color carries **slot**. Low → high reads violet → blue → teal → olive → red → pale ice; the two overlays sit outside the ladder as grey and orange. Pick the nearest swatch in Live's palette:

| Slot | Hex | Reads as |
|---|---|---|
| [[SUB Slot\|SUB]] | `#A051E8` | violet |
| [[BASS Slot\|BASS]] | `#5480E4` | blue |
| [[BED Slot\|BED]] | `#00A9C1` | teal |
| [[MIDS Slot\|MIDS]] | `#A9C300` | olive / lime |
| [[LEAD Slot\|LEAD]] | `#FF3636` | red |
| [[AIR Slot\|AIR]] | `#B8F5FF` | pale ice |
| [[TEXTURE Slot\|TEXTURE]] *(overlay)* | `#7B7B7B` | grey |
| [[TRANSIENT Slot\|TRANSIENT]] *(overlay)* | `#FFA529` | orange |

None of these collide with the family track colors already in use: VOX `#87FF67` · DRUMS `#FFFFFF` · KEYS `#FF94A6` · BASS `#8BC5FF` · GUITAR `#F7F47C`.

Visual reference card (swatches + track order): https://claude.ai/code/artifact/4adf2c0f-fe00-4a56-a68d-a11c0c8a32b8

**3. Locators at every section boundary** — `Verse 1`, `Chorus`, `Bridge`. The vertical slice between two locators *is* that section's slot map.

## How to read it

- Park the playhead anywhere and scan straight down: **the clip colors you see are the filled slots.**
- **Two clips of the same color overlapping vertically = a collision.** Fix it in the arrangement (swap, don't stack) before reaching for EQ.
- Fold your groups while checking — fewer lanes to scan.
- Empty slots are a choice, not a gap. Sparse verse = BED color absent, on purpose.

## What automates per section

Not EQ. **Send levels and group faders.** Section contrast = which slots are filled + how wet they are. If you're redrawing an EQ carve at a section boundary, two things are sharing a slot across it — fix the arrangement, or use dynamic EQ keyed from the winner ([[Masking and Carving]]) so it follows the arrangement by itself.

## See also
[[Sound Palette]] · [[Stereo Field]] · [[FX Chain System]] · [[Session Templates]] · [[Masking and Carving]] · [[Arrangement and Song Form]]
