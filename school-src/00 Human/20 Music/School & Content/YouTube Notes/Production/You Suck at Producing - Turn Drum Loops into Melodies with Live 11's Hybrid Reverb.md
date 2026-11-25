---
type: yt-note
date: 2026-07-30
source: youtube
url: https://www.youtube.com/watch?v=0l7PS7C1JNw
channel: You Suck at Producing
duration: "00:06:03"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — no caption track available (captionType: none), so this transcript comes from the video's own pre-fetched JSON transcript field, which reads clean and complete
tags: [yt-note, music, production, reverb, convolution, sound-design]
briefed: backlog
---

# Turn Drum Loops into Melodies with Live 11's Hybrid Reverb

![](https://www.youtube.com/watch?v=0l7PS7C1JNw)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=0l7PS7C1JNw)

## Synopsis
Under the channel's usual joke framing (Ableton's Hybrid Reverb as an eco-friendly "hybrid" alternative to gas-guzzling reverbs), a genuinely useful sound-design walkthrough of using Hybrid Reverb's Convolution side as a resynthesis tool rather than a space effect — dropping arbitrary samples in as the impulse response to make a rhythmic loop take on an entirely different tonal character. The back half solves a real limitation: Attack, Decay, and Size can't be automated on the device itself, so it shows a rack-based workaround (duplicate the chain with a second impulse response, then LFO the chain selector) that turns two static convolved "instruments" into a continuously, hands-off crossfading pair. Works equally on Live 10 via the equivalent Max for Live convolution reverb, per the video's own note.

## Techniques
- **Turn Blend fully to the Convolution side to use Hybrid Reverb purely as a convolution engine**, ignoring the Algorithmic side entirely.
- **Convolution reverb applies an arbitrary sample's spectral/temporal shape to the input, "as if it's the room"** — cycle through the built-in impulse responses or drag in any custom sample; a tonal impulse (e.g. a grand piano hit) convolved with a rhythmic source (a hi-hat loop) makes the rhythm ring with that tonal character instead of just gaining ambience.
- **Decay trims the convolved tail for a tighter, less messy result.**
- **Attack adds a fade-in** to soften the convolved result's entrance.
- **Size doubles as a pitch control on the convolved result** — changing Size pitches the output up or down, not just the perceived room size.
- **Attack, Decay, and Size can't be automated directly on the device itself** — a real, stated device limitation.
- **Workaround: group into a rack, duplicate the chain with a different impulse response** — Cmd/Ctrl+G to group the device into an Audio Effect Rack, open the Chain list, duplicate the chain, and load a *different* impulse-response sample into the duplicate (ideally in the same musical key as the first) — the same source loop now yields two distinct convolved "instruments" that can be worked with independently.
- **Turn the rack's Chain Selector into a manual blend control** — drag each chain's small volume slider fully toward its own end (one fully left, one fully right) so the Chain Selector crossfades between the two convolved instruments rather than switching hard between them.
- **Map an LFO to the Chain Selector for a hands-off, continuously drifting crossfade** between the two impulse-response "instruments," rather than a static blend.
- **Narrow the LFO's mapped range so the crossfade never fully loses either sound** — restricting the range keeps both convolved textures present throughout instead of the sweep hard-cutting to one extreme.

## Routed to
- [[Hybrid Reverb]] — added two Techniques bullets: the convolution-as-resynthesis mechanic (arbitrary sample as IR, Size as pitch control), and the rack-duplicate-plus-LFO-crossfade workaround for the device's un-automatable Attack/Decay/Size

## Source
[Turn Drum Loops into Melodies with Live 11's Hybrid Reverb](https://www.youtube.com/watch?v=0l7PS7C1JNw) · You Suck at Producing · 00:06:03 · captions (high) · transcript: [[You Suck at Producing - Turn Drum Loops into Melodies with Live 11's Hybrid Reverb (transcript)]]
