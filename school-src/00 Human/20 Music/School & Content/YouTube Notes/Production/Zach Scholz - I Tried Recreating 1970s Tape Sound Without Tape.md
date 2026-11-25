---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=Ma276-aF5lg
channel: Zach Scholz
duration: "00:08:57"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, tape, 1970s, saturation, production]
briefed: 2026-W31
---

# Zach Scholz - I Tried Recreating 1970s Tape Sound Without Tape

![](https://www.youtube.com/watch?v=Ma276-aF5lg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Ma276-aF5lg)

## Synopsis
Zach Scholz sets out to recreate early-1970s hi-fi reel-to-reel tape character entirely in the box — recording and mixing a full small-band arrangement (acoustic guitar, an old drum loop plus conga, Fender P bass, 12-string, and an old contact-library VST piano) with zero physical tape, then A/B-ing the result against a "raw" digital mix at the end. His working definition of what tape actually does — subtle saturation, subtle compression, top-end rolloff, and a touch of pitch instability ("flutter") — becomes the checklist he chases per-instrument with small plugin chains (a tape-flutter/saturation stage, a driven preamp, and a UAD Oxide tape plugin for glue) rather than one blanket bus effect. His closing take: he barely processed anything relative to what he expected, which he reads as proof that intentional, minimal moves get surprisingly close to the era without real tape or expensive gear — though he still thinks tape changes the workflow itself in a way plugins don't replicate.

## Techniques
- **Core thesis — tape ≈ subtle saturation + subtle compression + top-end rolloff, chased per-instrument rather than as one master pass**: his framing going in is explicit — "tape is going to be adding subtle saturation, compression, and it's also going to roll off a lot of that top end." [[Ozone 9 Vintage Tape]] bundles the drive/tone half of that in one module (Input Drive = saturation, Bias = tonal shift darker/edgier, Speed 15/30 ips = warmer-and-glued vs. tighter-and-cleaner); the explicit rolloff half is more precisely [[Kramer Tape]]'s Lowpass control, which is documented as rolling the *top* off the tape path rather than acting as a general channel EQ. → [[Saturation and Distortion]]
- **Acoustic guitar (main strum) — mic angle picked first, then a "tape mellow-fi" plugin for flutter + saturation, EQ, then a UAD Oxide tape plugin for compression**: "the tape mellow-fi adding a little bit of the flutter that you're hearing in the saturation... then we've got some EQ and I'm running all of that into the UAD oxide plugin for some of that natural tape compression." A wow/flutter-plus-saturation combo in one owned plugin is [[Ghz Wow Control 3]] (Mode = 15 IPS tape, Amount kept low so the wobble reads as texture not effect, Saturate for the harmonic edge alongside the wobble in the same box) or, for a more cassette-flavored version of the same idea, [[Cassette]] (Stability's wow/flutter sliders plus Input drive together); UAD Oxide's compression role is the same job [[Kramer Tape]]'s Flux knob does — push Flux for the squash, leave Playback near unity so it reads as glue, not a level change.
- **Finger-picked take — mic moved closer, same processing chain, but EQ retuned and the part pushed off-center left for "more crunch"**: lines up with this vault's own [[MIDS Slot]] rule to pan comping/riff material 30–60% off center rather than dead center. → [[Stereo Field]]
- **Drums — an old loop plus a conga part, panned slightly off center, with low end deliberately kept in check so the pan doesn't read lopsided**: "if we have too much low end, especially if we pan it off to the side, it's going to start to sound lopsided" is the exact reasoning behind this vault's own pan-map rule that low end stays dead-center/mono below roughly 120 Hz no matter what's panned around it. → [[BASS Slot]], [[TRANSIENT Slot]], [[Stereo Field]]
- **Drums top end — a high shelf pulled down instead of a low-pass filter, specifically to fake tape's natural rolloff rather than hard-filtering it**: the same job [[Kramer Tape]]'s Lowpass control performs from inside the plugin rather than as a separate channel EQ move.
- **Drums processing chain — a Trident preamp driven for a little breakup, then a UAD Oxide tape plugin for glue**: near-identical to [[Kramer Tape]]'s own documented drum-bus role in this vault — driven **hard** so "it squashes the hats/percussion every time the kick hits"; [[RC-20 Retro Color]]'s Distort module (tube/tape/transistor flavors) is the alt single-box option for the "drive it for a little breakup" half.
- **Bass (Fender P) — minimal processing, plus a general EQ-in-context workflow tip**: balance every fader/level first, then listen to the source *in the mix* and mentally note what you don't like before touching EQ — "once everything is balanced, then you can listen to it in context of the mix and make your EQ adjustments." Final move was a touch of compression plus roughly a 1 dB dip out of the low-mids. → [[BASS Slot]]
- **12-string — low end rolled off, a hair taken off an already-bright top end, then bussed together with the rest of the track** (captions cut off before he names the bus processing itself): the natural owned move for a guitar sub-bus like this is [[Kramer Tape]]'s own documented Guitar Bus recipe — low drive, 15 ips, Flux to taste, unity out, "guitars glued to the record." → [[BED Slot]]
- **Piano — an old contact-library VST, saturated a bit, then summed to mono**: close to word-for-word what [[Kramer Tape]]'s own Acoustic Piano Track entry documents in this vault — low-drive tape "give[s] a too-perfect VST piano the 'recorded in a room' quality." → [[BED Slot]], [[Stereo Field]]
- **Reflection — he barely processed anything relative to what he expected, and treats that as the finding, not a caveat**: "I didn't really find myself processing anything that much, which I think goes to show just how important it is to be very intentional with each and every decision."
- **Reflection — ITB gets "surprisingly close" to 70s character without real tape or expensive gear, but tape still changes the *workflow* itself in a way he says he still likes**: his stated conclusion heading into the raw-vs-1970s A/B that closes the video.

## Routed to
- [[Saturation and Distortion]] — new From-videos bullet (the plugin-only 70s-recreation thesis)
- [[Kramer Tape]] — two new Techniques bullets (Lowpass-as-rolloff, Flux-as-compression parallels)

## Source
[I Tried Recreating 1970s Tape Sound… Without Tape](https://www.youtube.com/watch?v=Ma276-aF5lg) · Zach Scholz · 08:57 · captions (clean, spoken) · transcript: [[Zach Scholz - I Tried Recreating 1970s Tape Sound Without Tape (transcript)]]
