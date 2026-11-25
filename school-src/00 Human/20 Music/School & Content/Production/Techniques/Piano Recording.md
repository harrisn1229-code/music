---
type: technique
title: Piano Recording
tags: [technique, piano, keys, recording, microphone, tracking, production]
created: 2026-08-12
---

# Piano Recording

**The part of a piano sound that's decided before any plugin loads, plus the arranging discipline that keeps a huge, harmonically-rich instrument from swallowing a modern mix.** The tracking-stage counterpart to [[Drum Mic Technique]] and [[Vocal Mic Technique]] — mic array, signal path, and print-vs-tweak-later philosophy, all for one specific source: acoustic piano.

## Play it economically — a modern-sounding piano is a spare one

**A huge sonic footprint means restraint pays off more on piano than on almost any other instrument.** "Piano is a very different beast, it's a huge sonic footprint, so I want to try and play it economically — not big flashy chords, just kind of open — and to me that sounds more modern. Unfortunately when there's too much harmonic information, it starts to sound dated — too many chords, too many major thirds, too many things." The stated fix on this session: an ostinato — repeating a single interval (a fifth) in the right hand rather than voicing full chords — deliberately embracing "the monotony of it." → [[Arrangement and Song Form]], [[Masking and Carving]]

## Mic array: hammer pair, room pair, and a dedicated low-end mic

A three-zone setup, each zone doing a distinct job rather than one pair trying to cover the whole instrument:

- **Hammer mics (closest, most-featured pair)** — two [[Gefell UMT70S|Gefell]] UM92s positioned near the hammers. This is the pair that carries the most detail and the most risk (see the choke story below) — it's also the pair that gets compressed.
- **Room mics** — a pair of Gefell UM300s for the room/ambient picture, mirroring the [[Drum Mic Technique|drum room-mic discipline]] of letting a good room pair do its job with minimal processing rather than close-mic-and-fix.
- **Low-end mic** — a Violet Amethyst positioned at the foot of the piano, but **about nine feet back** — a deliberately distant placement to capture the instrument's low-frequency body as its own signal, EQ'd separately ("we're gonna probably add some low EQ to that, just for extra tone if we need it") rather than relying on the hammer/room pairs for low end. → [[BASS Slot]], [[BED Slot]]

**Gefell's lineage explains the "big, gorgeous, musical" mic sound:** Gefell and Neumann were the same company before splintering, and both lines descend from the same M7 capsule design — see [[Gefell UMT70S]] for the full comparison-point writeup (closest owned equivalent: [[Neumann TLM 102]], with [[Neumann U47]] as the other unowned reference point already tracked in this vault).

## Signal path: console EQ/preamp, gentle compression on the direct mics only, clock straight to Pro Tools

- **Console preamp + EQ** on a Neve 88R (console-only, not the standalone [[UAD Neve 1073]] module) — "a bit of top and a bit of bottom" on the way in. Owned-lane equivalent for the same move: [[UAD Neve 1073]] (see its Techniques section for this same session logged there).
- **Compress the hammer mics only** — the direct/detail pair gets a compressor (a hardware Chandler TG-1); the room and low-end mics are left alone, the same direct-gets-the-heat / ambient-stays-alone split [[Drum Mic Technique]] documents for drums.
- **Limit mode over compression mode, on a compressor that has both.** "There's a Chandler TG-1 here — limit mode is the way to use that thing. I don't really get the compression mode in it, but limit is like magic. I don't want to do it too much, because you can overcook it." A real, stated mode preference, not a generic name-drop — see [[Compression]] (effect) and [[UAD Teletronix LA-2A]] (the owned unit with the equivalent Comp/Limit switch) for the fuller writeup.
- **Clock straight into Pro Tools** (Antelope 10MX) and try to finish processing before it hits the DAW — "recording the way you want it to sound, rather than tweaking after the fact." Full commit-vs-tweak philosophy on [[Committing and Printing]].

## When committing goes wrong: the chorus choke, and backing off rather than reprocessing later

**A huge chord overloaded the most-featured mic pair mid-take — the fix was backing the compressor off and re-tracking, not EQ-ing around it afterward.** Playing a big A♭ minor-seven chord at the top of the chorus made the hammer-mic signal audibly choke through the TG-1 — "it made the thing choke a little bit, it was like zzt, and then it would come back in, it almost sounded like the fader" — while everywhere else in the take it sounded great. The fix: re-track the piano through the same signal path but with the TG-1 backed off so it wasn't collapsing on the loud chord, then match levels afterward (with a likely follow-up clip-gain pass). Directly illustrates [[Committing and Printing]]'s central tension — commit to a tracked sound, but stay willing to backpedal and re-print when a later part of the performance reveals the first pass was wrong, rather than trying to fix a choking compressor in the mix. → [[Committing and Printing]], [[Compression Staging]]

**Mistakes as part of the process, not a failure of the "commit" philosophy.** "Some of the best things I've ever come up with in my life were completely embarrassing mistakes that I would have thrown in the trash bin, but somebody else in the room said, 'what was that, we should use that.'" Framed as the necessary flip side of committing early: committing sometimes means committing to the wrong thing, and catching/fixing it (or occasionally keeping it) is the job, not a sign the discipline failed. → [[Committing and Printing]]

## Related

[[Drum Mic Technique]] · [[Vocal Mic Technique]] · [[Committing and Printing]] · [[Compression Staging]] · [[Compression]] (effect) · [[UAD Neve 1073]] · [[UAD Teletronix LA-2A]] · [[Gefell UMT70S]] · [[Neumann TLM 102]] · [[Neumann U47]] · [[Arrangement and Song Form]] · [[Sound Selection Guide]]

## From videos

- **This note's entire content** — mic array (hammer/room/low-end zones), Neve 88R + Chandler TG-1 signal path, the limit-mode preference, the chorus-choke backpedal story, and the economical-playing arranging philosophy — Greg Wells (Mix with the Masters), [[Producing and recording piano with Greg Wells]]
