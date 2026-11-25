---
type: yt-note
date: 2026-07-31
source: youtube
url: https://www.youtube.com/watch?v=J-GeRU5SLNo
channel: You Suck at Producing
duration: 00:08:44
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, live-performance, session-view, ableton]
briefed: 2026-W31
---

# How To PERFORM with Ableton Live | Live Performance Setup

![](https://www.youtube.com/watch?v=J-GeRU5SLNo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=J-GeRU5SLNo)

## Synopsis

A walkthrough (comedic "Underbelly" persona, built for a real Skrillex-adjacent show) of a hybrid Ableton Live Session View setup for solo electronic performance — part DJ set, part live keyboard/drum-pad performance. The goal is three things at once: playable keys, a playable beat pad, and traditional press-play mixing, all inside one Live Session. The core structural ideas are a two-deck DJ layer for straightforward song-to-song mixing, "song group" track stacks (backing track + live-performed instrument stack + a sidechain-trigger track) that turn on/off automatically via automated dummy clips, an automated chain selector that swaps instrument sounds mid-song without the performer touching anything, a MIDI-quantize Max for Live device that snaps live keyboard/pad playing to the grid in real time, and a separate cue/headphone output so a click track and pre-listen don't leak to the crowd.

## What's taught

- **Two-deck DJ layer for straightforward song-to-song transitions (~0:45).** Two tracks ("Deck A"/"Deck B") each hold full-song audio clips, mimicking a traditional two-turntable DJ setup — trigger clips from a hardware controller (APC40 here), ride the channel fader to bring a deck in/out, and use a mapped filter (high-pass going one way, low-pass the other, modeled on a DJM mixer's filter knob) to sweep between songs instead of a hard cut.
- **"Song group" track stack: backing track + live instrument stack + sidechain-trigger track (~2:00).** Each performed song gets its own group of three tracks: (1) a **backing track** carrying every instrument the performer is *not* playing live, (2) an **instrument stack** driven from a USB MIDI keyboard for the parts that *are* played live, and (3) a **sidechain-trigger track** — a Simpler with just a click/impulse sound that mimics the backing track's kick pattern, so a sidechain-ducking chain on the live instruments ducks in time with the (audio) backing track's kick even though the live instruments aren't directly reacting to it. → [[Sidechaining]]
- **Instrument stacks stay always-on for MIDI, but the rack itself is muted/off by default (~2:40).** Each song's instrument stack has its MIDI *From* set to the USB keyboard with Monitor set to **In**, so it's always receiving MIDI without needing to arm the track — but the instrument rack device itself defaults to **off**, so idle songs' synths aren't all running simultaneously and taxing the CPU. A **dummy automation clip** on that track turns the instrument-rack device on right at the top of the song and off at the very end, so switching songs is just triggering the right group's dummy clip.
- **Automated chain selector to swap instrument sounds mid-song, hands-free (~3:30).** Inside a song's instrument rack, the **chain selector** is automated across the timeline so it switches which chain (pluck → alternate sound → Reese, etc.) is active at specific bars without the performer touching anything — the performer just plays the keyboard and trusts the automation to route to the right patch at the right moment.
- **Drum-rack beat pad with choke groups for a clean live-percussion layer (~5:10).** A Drum Rack loaded with the full routine's one-shots across 16 pads, with **choke groups** set up so triggering one pad cuts off a previous still-ringing sample cleanly (standard hi-hat-style choking, applied here to a performance pad routine rather than a drum kit).
- **Real-time MIDI quantize via a Max for Live device, engaged only during performance (~5:45).** A MIDI-quantize M4L device (only active while the project is playing) shifts live-played notes onto the grid in real time — the performer has to play *slightly ahead* of the beat so the quantizer has room to shift the note back onto the grid; playing late instead of early means the note misses the quantize window and the beat is missed rather than corrected. → [[MIDI Generate and Transform Tools]]
- **Separate cue/headphone output so the click track and pre-listen never reach the crowd (~7:00).** The metronome is routed to a **different audio output** (output 3 here) than the main mix, feeding only the performer's headphones — not the house PA. A dedicated **return track** is also routed to that same headphone output, carrying a bit of every track's signal, so the performer can hear a personal cue mix (a touch of everything plus the click) that's completely separate from what the audience hears.
- **A more advanced song-group example layering register-split live keys, a triggered backing beat, and pad-triggered one-shots instead of quantize (~7:20).** In a later section of the set, the keyboard's low/mid/high registers are mapped to three different sounds simultaneously (e.g. a lead up top, a bass in the middle, a Reese below) that change together as the song's chain selector advances — and rather than relying on MIDI quantize for this section, the performer instead just triggers pre-arranged one-shot sound effects from pads, sidestepping the timing problem entirely for that passage.

## Routed to
- New technique note created: [[Live Performance Setup]] (registered in [[Techniques Index]])
- [[Sidechaining]] — the Simpler-click sidechain-trigger-track pattern
- [[MIDI Generate and Transform Tools]] — real-time MIDI-quantize M4L device note

## Source
- Channel: You Suck at Producing
- Duration: 8:44
- Transcript: captions (clean — spoken monologue, transcribes reliably)
- Full transcript: [[How To PERFORM with Ableton Live - Live Performance Setup (transcript)]]
