---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=EMu1jdIiNOU
channel: loner
duration: "00:08:12"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, sampling, lofi, mono, panning, sound-selection]
briefed: backlog
---

# loner - hidden techniques the top samplemakers don't want you to know!?

![](https://www.youtube.com/watch?v=EMu1jdIiNOU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=EMu1jdIiNOU)

## Synopsis

loner reverse-engineers a Kupla ("koopa nami" in the auto-captions) lofi sample flip after noticing something counterintuitive while dragging Kupla's stems into FL Studio: almost every element in the original sample is recorded/printed in **mono**, not stereo. The video's real thesis — and the "hidden technique" of the title — is that Kupla's famously huge, wide-sounding samples are built almost entirely from mono elements that are then deliberately, heavily panned, with only a couple of textural elements left in stereo as the exception rather than the rule. Around that central idea, loner builds a full from-scratch sample flip element by element (guitar lead, guitar counter-melody, Wurli, vocal chop, bass, kick/percussion, a stacked "combined stem" texture, and melodic layers) narrating the exact signal chain and rough settings for each, so the page is as much a compact multi-element sample-flip recipe as it is a mono/panning lesson. Density is high for an 8-minute video — nearly every sentence names a plugin or a preset — but settings are mostly qualitative/preset-named rather than exact numeric values (a fast narrated screen-capture style, not a tutorial with on-screen parameter callouts).

## Techniques

### The core lesson — mono + panning, not stereo width
- **Kupla's samples are built almost entirely from mono stems, heavily panned, not from stereo-wide elements** — loner discovered this by dragging the original stems into FL Studio and finding nearly all of them in mono; recreating that (rather than defaulting every layer to stereo) is presented as the actual key to the "how do they get such a full sound" question the video opens with. → [[Width and Stereo]], [[Stereo Field]]
- **The exceptions are deliberate: only the *textural* elements (things that come and go, not the main instrumental parts) were left in stereo** in the original Kupla sample — everything foundational (guitar, Wurli, vocal, bass) stays mono + panned; only a supporting melodic/textural layer (see Analog Lab "mob ties" element below) is kept stereo and panned hard to one side. → [[Width and Stereo]], [[TEXTURE Slot]]
- **"The key to using mono in your samples is lots of little layers, and panning."** — closing thesis, restated plainly: many mono layers, each individually panned to its own position, reads as fuller and wider in aggregate than fewer stereo layers.

### Guitar lead (main instrument)
- Source: an **acoustic guitar recorded on an iPhone**, then **pitched down 5 semitones**. → [[Sound Selection Guide]]
- **Shaper Box** (Cableguys) added first to recreate the swelling volume-in envelope heard on the guitar in the original Kupla sample — a fast way to fake an instrument "swelling in" rather than re-performing a volume-pedal-style attack. → [[Plugin Wishlist]], [[Shaper]]
- **Multiband compressor** to tame harsh mid-range frequencies specifically (not a broadband squeeze). → [[Multiband Compression]], [[Multiband Dynamics]], [[MIDS Slot]]
- **EQ** to cut the same harsh frequencies further after the multiband stage.
- **Chorus** added after the EQ for width/movement on the lead.

### Guitar counter-melody (same instrument, second part)
- Same guitar source, a counter-melody part; chain: **compressor → EQ (cut low end) → spring reverb (mix at 100%, i.e. fully wet on its own return) → Valhalla delay**.
- **Dual-mixer-channel delay routing for a wet/dry blend with heavy mono panning**: the guitar is routed to **two separate mixer channels**, one of which feeds into the other (channel 2 → channel 3), so the final signal carries both the dry component and the wet (delayed) component in the same routed path; the whole thing is **heavy-panned to the left and printed mono**. → [[ValhallaDelay]], [[Delay]], [[Width and Stereo]]

### Wurli / electric piano ("Whirly V2")
- **Arturia Wurli V2, "Lonely Times" preset** — chosen specifically because the Kupla sample's Wurli-type part sounded very distorted/harsh, and this preset + treatment reproduces that. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **Cassette (crushed preset)** added on top of the Wurli for the harsh/distorted lofi character. → [[Cassette]], [[Saturation and Distortion]]
- Same chord progression as the guitar part (reuses the harmony, new timbre).

### Vocals
- **Auto-Tune** as the base of the vocal treatment. → [[Auto-Tune Pro]]
- **Little AlterBoy** ("an altar boy," per captions) for character/pitch treatment on top of the tuned vocal. → [[Little AlterBoy]]
- **A short, heavy reverb** on the vocal.
- **EQ**: cut the low end out, and lower some of the high end — a deliberately narrowed, mid-forward vocal rather than a bright, full-range one. → [[EQ]], [[Pitch and Formant]]

### Bass
- **MotorBass** (bass synth VST), **"Kick Violin Bass" preset**. → [[Sound Selection Guide]], [[Plugin Wishlist]]
- **AmpliTube** (amp sim) added to the bass for grit/character. → [[Plugin Wishlist]], [[UAD Ampeg SVT-VR Classic]]
- **EQ** cutting the harshest frequencies out afterward.

### Percussion
- **Kick**: EQ'd to remove most of the low end deliberately, keeping only the high-end texture/click — matches what was heard in the Kupla original (a kick used for its transient/texture, not its sub). → [[Kick Design]], [[SUB Slot]]
- **Wood block-style perc sound** added as a second percussion layer.
- **A chopped "Only One" perc loop** — small chops pulled from an existing loop and dropped in as additional percussion hits rather than programmed from scratch. → [[Sampling and Sound Selection]]

### Melodic / textural layers
- **Analog Lab, "Mob Ties" preset** (Aperture bank) — a melodic element deliberately kept **stereo** (the one clear exception to the mono-everything rule), panned heavily to the right, with **outer-space-style reverb, an echo/delay, and an EQ**. → [[Plugin Wishlist]], [[Sound Selection Guide]]
- **A reversed lead** as a second melodic element.

### The "combined stem" texture move
- **Bounce multiple percussive + melodic one-shots into a single stem, then degrade that stem as one unit** — three percussive sounds (a snap, an open hat, a perc hit landing on the downbeat) combined with the two melodic elements above, all bounced together into one printed stem. → [[Layering and Stacking]], [[Sampling and Sound Selection]]
- **Extreme sample-rate reduction on the bounced stem via Edison, down to ~2000 Hz**, stripping most of the high end for a crunchy, degraded texture that reads as one cohesive "combined" sound rather than several separate layers. → [[Saturation and Distortion]], [[Bitspeek]], [[Decimort 2]]
- **Master-bus pitch shift: the whole bounced/degraded stem pitched down 2 semitones** using Sound Shifter, applied at the very end as a final character pass. → [[Auto Shift]], [[Shifter]]

## Routed to

- [[Shaper]] (Ableton's Shaper device — best-match owned equivalent for the ShaperBox swell technique)
- [[Multiband Dynamics]]
- [[Cassette]]
- [[ValhallaDelay]]
- [[Auto-Tune Pro]]
- [[Little AlterBoy]]
- [[UAD Ampeg SVT-VR Classic]] (best-match owned equivalent for AmpliTube-on-bass)
- [[Multiband Compression]] (effect page)
- [[Saturation and Distortion]] (effect page)
- [[Width and Stereo]] (technique note — primary home for the mono+pan lesson)
- [[Sampling and Sound Selection]] (technique note)
- [[Sound Selection Guide]] (Guitar, Synths/Keys, Bass, Vocals, Drums sections)
- [[Plugin Wishlist]] (ShaperBox — already listed, left alone; AmpliTube — already listed, left alone; new: Arturia Analog Lab/Wurli V2, MotorBass)

## Source

- **Link:** https://www.youtube.com/watch?v=EMu1jdIiNOU
- **Channel:** loner
- **Duration:** 8:12
- **Transcript:** captions, high confidence (spoken narration over screen capture, transcribes cleanly) — full transcript at (transcript)
