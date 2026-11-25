---
type: chain
aliases: ["Guitar Group"]
title: Guitar Group
chain_type: group
family: guitars
source: mixed
routing: "[Electric Guitar, Electric Guitar DI, Acoustic Guitar] → Guitar Group → Guitar Bus → Master"
signal_chain: [Pro-Q 4, Glue Compressor]
status: default
tags: [chain, guitar, group]
---

# Guitar Group

**Role:** All guitars summed. The group stage decides how the guitar *section* sits against vocals, keys, and drums — per-guitar tone is already done on the tracks.

## Chain overview
Carve → light glue. The most important guitar-group move is a *cut for the vocal*, not anything additive.

## Chain

### 1. [[Pro-Q 4]] — Section carve
- Dip 2–4 kHz −1.5 to −3 dB where the lead vocal lives — **use a dynamic node sidechained from the vocal** so guitars only duck spectrally while the vocal is present
- HPF the summed group 80–100 Hz — guitars don't need what the bass owns
- **Why:** Guitars and vocals fight over the same midrange. Dynamic carving keeps full-bodied guitars in instrumental sections and clears the lane automatically when the singing starts.
- **Alt (often better):** [[Soothe2]] on this group, **external sidechain = the lead vocal**, soft mode, boost its band selection in the vocal's midrange — it dynamically ducks only the *exact* frequencies the vocal occupies moment-to-moment, and only in the mid channel if you set it that way. More surgical than one static/dynamic EQ node.

### 2. [[Glue Compressor]] — Section glue
- **Ratio 2:1** (②) · **Attack 30 ms** (③) · **Release Auto** (④) · **Threshold for ~1.5 dB GR** (①) · **Makeup** to unity (⑤) · **Dry/Wet 100%** (⑦)
- **Why:** Slow-attack, low-ratio bus compression makes separate guitar parts move as one section without killing strum transients — 30 ms leaves the pick attack intact so the section still sounds played, not pumped.

## Diagnosis moves (before touching EQ)
- **The mute test:** play the mix, mute the guitar group. Whatever suddenly gets clearer is what the guitars are masking — cut the guitars *there*. Bring them back louder than normal: whatever *they* bury tells you the other direction.
- **Spread the boosts:** if multiple guitar layers all got the same "magic" boost (1k / 2.5k / 5k), they're fighting each other and the vocal — give each layer a different lane.
- **Pro trick:** sidechain a touch of the snare's fundamental into the guitar group (1–2 dB, subtle) — the backbeat punches through a wall of guitars without anyone hearing the duck.

## Variations
- **Guitar-driven song (guitars ARE the hook):** skip the vocal dip, give guitars the presence lane, and carve the *synths* instead.
- **Panned wall (L/R doubles):** check the group in mono — if the center collapses, back off any wideners on the tracks.

## From videos

- **Session-organization convention: a dedicated "extra guitar" always lives on channel 16, always panned dead center, and is always more distorted than the main guitars — a named favorite habit, functioning as the song's "anchor."** Tom Lord-Alge: "this track has one of my favorite things, which is what I call the extra guitar... it always lives on channel 16 of mine and is always panned at the center — is the extra distorted guitar. It's usually a little bit more distorted than the main guitars, and it's kind of what I call the anchor." A/B'd in/out against the two main guitars: without it the intro reads thin, with it the three read as one wall of sound. Also carried a small whistle-noise texture at the song's opening on this session. → [[Layering and Stacking]], [[1 Electric Guitar Amp Track]], [[Bass and Guitar sound with Tom Lord-Alge]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- **Main guitars: a tight, narrow +6 dB bump around 700 Hz specifically to make the tone "bark," plus a high-pass filter and a touch of top end — nothing more.** "I'm giving a 6 dB bump at 700, a little mid-range, knock it — a very tight curve, because I want it to kind of bark, I want that mid-range to bark." Confirmed by A/B'ing the center "extra guitar" in/out against these two main guitars (see the channel-16 entry above) — together they read as one wall, without the center layer the intro thins out. → [[EQ]], [[1 Electric Guitar Amp Track]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- **Octave guitars entering at the chorus (doubling the main guitar an octave up): hard/"brick wall" compression plus deliberate bottom-end removal, because the layer read "a little too chubby" and needed "its own sound" distinct from the main guitars.** Bypassed A/B confirmed the move was doing real, audible work. The same compressor was framed as doing double duty — glue/character AND overall level placement: "the compression just leaves it at the one, and it also acts to reduce the level, put it where I want it." Judged in-context, not soloed: "we're not going to be listening to this in solo... we're going to balance it in the track so when I play it in the track it sounds exactly like it should." → [[Compression]], [[1 Electric Guitar Amp Track]] — Mix with the Masters (Tom Lord-Alge), [[Bass and Guitar sound with Tom Lord-Alge]]
- **An outro-guitar bus deliberately hit harder than the vocal-chain setting for the same plugins, with wetness dropped, because it isn't a vocal.** "Some Trash. And some Soothe. Yeah, so, this isn't a vocal, so I'm hitting it a little harder than I normally would, well for vocals. I dropped my wetness down just so it's hitting it like..." [[Soothe2]] pushed past its vocal-chain 38% Mix; Trash (iZotope, unowned — see [[Plugin Wishlist]]) for drive/character. A separate outro live-kit-plus-guitar track ran filtering → de-essing → tape emulation/saturation into a Fatso-style tape compressor (unowned — [[Plugin Wishlist]]) for glue — "whatever feels good, do it." → [[Soothe2]], [[Saturation and Distortion]], [[Plugin Wishlist]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Cut the ~15k super-high-end when stacking guitars** — DI/electric layers each throw top-octave energy; stacked it becomes "a weird white-noise ringing thing." Shelf/LPF each layer as the stack grows — Kenny Beats, [How to Make a Guitar Sample](https://youtu.be/i86bG2OsOSQ) → [[Masking and Carving]]
