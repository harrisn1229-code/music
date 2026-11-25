---
type: plugin
title: "ValhallaRoom"
category: Reverb/Delay
vendor: "Valhalla DSP"
video_enriched: true
tags: [plugin]
depth_linked: true
owned: true
owned_source: has-ui-image (Nate confirmed 2026-07-20)
owned_checked: 2026-07-20
owned_note: "no confident install match"
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# ValhallaRoom

![[Images/ValhallaRoom.jpg]]

**Category:** Reverb/Delay
**Vendor:** Valhalla DSP

## What it is

Valhalla's algorithmic room/hall reverb plugin, covering a wide range of natural space sizes and characters.

## What it's used for

General-purpose natural-sounding room and hall reverb across any source.

## FX chain notes

Used on a send/return as the primary space-design reverb.

## Techniques

- **Paired with Ableton's stock convolution Spring reverb as the default vocal-space combo across most of an album, deliberately kept restrained.** Kevin Parker (Tame Impala), on *Deadbeat*: "Valhalla Room, a bit of like Ableton Spring... echo" alongside EchoBoy on most tracks — explicitly says he didn't want to get "too experimental with the vocals," aiming for clarity over heavy reverb processing despite having both devices available. → [[Tame Impala Vocal Chain]] — Kevin Parker (Tape Notes), [[TN 188 Tame Impala - Full Video Episode (Part 1)]]
- **One stage of a five-effect stack used to "dress up" a plain Output Analog Strings patch into "crazy kind of messed up old sounding" cinematic strings — sample delay → clip distortion → this device → a channel EQ → Little AlterBoy.** Finneas, on the combined result: "sounded like some Hans Zimmer type things." The lesson generalizes past this specific chain: a plain starting patch is only a starting place — stacking several simple, unglamorous effects (a delay, a distortion, a room, an EQ, a formant shift) can transform it into something "kind of unrecognizable" and full of character, which he names as the satisfying part of production. *(qualitative only — no Decay/Mix/High Cut given)* → [[Little AlterBoy]], [[Plugin Wishlist]], [[Saturation and Distortion]], [[Sampling and Sound Selection]], [[Finneas Drum Sampling Chain]] — Finneas (Mix with the Masters), [[Creative drum sampling with Finneas]]
- **Large room, pushed hard and audible, as a chorus-uplift effect on an octave-up doubled lead vocal — not the usual tucked-back "invisible glue" room use.** On Sam Smith's chorus ("Dancing With A Stranger"): "there was this high octave vocal verbed out, we used the large room — that's just his vocal, octaved up." The octave layer is the lead itself pitched up (not a separate take), then deliberately drenched because the effect is meant to be heard, distinct from a support layer's normal narrower/quieter treatment (see [[1 Main Vocal High Track|Main Vocal High Track]]). Paired opposite-vocalist choice on the same song: Normani's chorus gets a [[Vocoder]] instead, "same kind of vibe verbed out" — different color, same job (uplift the chorus slightly). *(qualitative only — no decay/mix given)* → [[Vocoder]], [[1 Main Vocal High Track|Main Vocal High Track]], [[Modulation]] — Kevin Davis (Mix with the Masters), [Mixing Vocals from 'Dancing With A Stranger' with Kevin Davis](https://www.youtube.com/watch?v=bQIZONdZvk8)
- **Master-bus cohesion reverb: use Early Size / Late Size / Depth as a stand-in for "early/mid/late reflections," and a post-reverb EQ to fix cohesion by frequency band, not tone.** For a mastering-stage reverb (rare, only when a mix reads disjointed rather than glued), this device's ⑤ Early/Late Size + ⑥ Depth controls are the closest owned match to a dedicated close/mid/far reflection reverb — push Depth toward more early reflections to bridge a mix that only has dry + a late tail (fake/flat depth), or dial Late Size up if the mix already has early reflections but lacks a longer tail. Then EQ the return itself (not this device's own tone) to target only the frequency ranges that sound disjointed — e.g. boost ~1.5 kHz and ~6 kHz if those ranges sound like they were recorded in a different room, leave already-cohesive ranges (often the lows) alone. Chain position: after any upward compression on the master, before the peak limiter, and dial the send level with the limiter engaged since its makeup gain exposes tails that seemed subtle unlimited — automate the send if no single level works for both loud and sparse sections. Keep it very subtle — this is a cohesion nudge, not a wash. → [[Master Chain]], [[Depth and Space]], [[Reverb]] — Sage Audio, [Reverb on a Master: Everything You Need to Know](https://www.youtube.com/watch?v=vzJSKU7kGrU)
- **The vocal long-verb recipe: 3.0 s decay · 100% wet on the return · depth ~90% · EQ on the return channel** — dial-in scale by send level: Travis-washed ad-libs = heavy, wet main = moderate, near-dry = barely cracked — Kenny Beats, [Vocal Template](https://youtu.be/X_iDENABLmk)

- **Room reverb as a "vintage" stage on a strummed guitar or vintage-piano sample, ahead of an EQ + modulation stage rather than as the final effect** — for a from-scratch R&B/soul sample layer (a strummed guitar body layer, or a vintage-piano chord progression), place this device *before* the corrective EQ and a chorus/flanger stage, not after — a short-to-medium room decay reads as the natural space the "vintage" source was recorded in, and the EQ/flanger afterward shapes tone on top of that space rather than the room being the last thing applied. Reused twice in the same breakdown (guitar strum layer, and separately a vintage-piano progression). → [[EQ]], [[Phaser-Flanger]], [[Chorus-Ensemble]], [[Bryson Tiller Vocal Chain]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)
- **Room reverb on an arpeggiated guitar top-layer, run through a guitar-amp sim + compressor first, for a lighter counterpart to a strummed body layer** — same "vintage-room-before-modulation" logic as above, applied to a second, differently-processed guitar take (compressor → guitar-amp sim → this room reverb → EQ) so the two guitar layers chop and stack without one drowning the other. → [[EQ]], [[6 Guitars/1 Electric Guitar DI Track|Electric Guitar DI Track]] — loner, [the secrets behind bryson tiller's 'trapsoul' sound!?](https://www.youtube.com/watch?v=RVJ5fOlLy4w)

## Used in my chains

My **room/ambience** reverb — natural short-to-medium spaces on a return (body and "in a room" cue, not a wash):

- **[[Reverb Send Room]]** — *slot 1, the room*: Mix 100%, Decay 0.8–1.2 s, Predelay 15–25 ms, High Cut ~5–6 kHz. Large Room / Bright Room are the do-everything modes.

## Key Parameters

```visual-key
image: Images/ValhallaRoom.jpg
coords: Images/ValhallaRoom.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

Controls that matter, in order: **Mix, Decay, High Cut** — then Predelay, then the rest.

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Mode | The room algorithm | **Large Room / Bright Room** = do-everything (Bright even works on bass); Nostromo/Narcissus great on keys | — |
| ② | Mix | Dry/wet (100% on a send) | 100% on the return; the send level sets the amount | — |
| ③ | Decay | Reverb tail length | 0.8–1.2 s for a room that adds space without washing | — |
| ④ | Predelay | Gap before the reverb starts | 15–25 ms keeps the dry source clear in front of the room | — |
| ⑤ | Early / Late Size | Perceived room size (early defines size/attack) | **Set Early Size first**; Late Size default ~15 is fine | — |
| ⑥ | Depth | Balance of early reflections vs. late tail | More early = closer/roomier; more late = washier | — |
| ⑦ | High Cut / Low Cut | Damping of the tail | High Cut ~5–6 kHz so the room sits behind the mix; Low Cut to keep it clear of the sub | — |
| ⑧ | Bass / Treble Mult | Per-band decay multipliers | Shorten low decay so the room doesn't build mud | — |
| ⑨ | Mod (Rate / Depth) | Chorusing of the tail | A little keeps it lush; more for a dark/chorused character | — |

## See also

- Effects: [[Reverb]] · [[Delay]]
- Techniques: [[Depth and Space]]
- Palette: sits in [[TEXTURE Slot]] / space · [[Sound Palette]]
