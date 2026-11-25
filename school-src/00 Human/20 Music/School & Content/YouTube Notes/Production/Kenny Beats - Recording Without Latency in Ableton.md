---
type: yt-note
date: 2026-07-16
source: youtube
url: https://youtu.be/Gj4_IvHFn6g
channel: fliko (Kenny Beats Twitch clips)
duration: "00:08:03"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, ableton, recording, latency, workflow]
swept: 2026-07-19
briefed: backlog
---

# Kenny Beats — Recording Without Latency in Ableton

![](https://youtu.be/Gj4_IvHFn6g)
📺 [Watch on YouTube](https://youtu.be/Gj4_IvHFn6g)

## Synopsis

The complete fix for Ableton recording latency, in two layers: the settings everyone should set (reduced-latency monitoring, buffer size, driver error compensation) and the real weapon — the **ghost "latency track"**: record every take on two tracks at once, one monitored with all the fun effects, one bare with monitoring off routed straight to a hardware out, and keep the bare one, which lands perfectly on the grid. This is the backbone of his whole vocal/guitar tracking template and applies verbatim to Nate's Ableton + Apollo setup.

## Techniques

- **Options → "Reduced Latency When Monitoring" = ON** — the first switch to flip, before anything else. → [[Latency-Free Tracking]]
- **Buffer size 128 while tracking (64 if the machine can take it), never 1024** — Preferences → Audio → Buffer Size; his demo goes from ~26 ms overall latency to ~6 ms at 128. Under ~3 ms is unnoticeable to most people. Big buffers are for mixing, small for recording. → [[Latency-Free Tracking]], [[Gain Staging]]
- **Driver Error Compensation to ~0 ms** — after setting the buffer, trim the compensation field until the overall-latency readout is as close to zero as possible (his demo: 6 ms → 0.05 ms). → [[Latency-Free Tracking]]
- **The ghost latency track (the game-saver):** duplicate the tracking track so both record the same input simultaneously — **Tracking track:** monitoring IN, full FX (reverb/gate/EQ/de-ess/2A — whatever makes the performer feel good), routed to master. **Latency track:** ZERO plugins, monitoring OFF, output to **Ext. Out 1/2 instead of master** (skips the mixbus and every plugin delay). The FX-track take prints late; the bare take prints on time. Keep the bare take, drag it into the main vocal/guitar group (which carries the same chain), and it plays back perfectly in time *with* all the effects. → [[Latency-Free Tracking]], [[1 Main Vocal Track|Main Vocal Track]], [[1 Acoustic Guitar Track|Acoustic Guitar Track]]
- **Scale it for multi-mic sources** — recording 2 mics on a guitar = 4 tracks armed (each mic gets its FX track + its ghost track). → [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]]
- **Label it in the template** — his template has the pair permanently labeled "tracking" / "latency" so there's zero setup when someone walks in. → [[Latency-Free Tracking]]

## Routed to

- [[Latency-Free Tracking]] — new technique note built from this video
- [[1 Main Vocal Track|Main Vocal Track]] — ghost-track tip inline at Step 1
- [[1 Acoustic Guitar Track|Acoustic Guitar Track]] — ghost-track tip inline at §3
- [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]] — 4-track version for the two-mic pair

## Source

[Kenny Beats — How to Record Without Any Latency in Ableton](https://youtu.be/Gj4_IvHFn6g) · fliko (Twitch clip) · 08:03 · captions (clean, spoken) · transcript: [[Kenny Beats - Recording Without Latency in Ableton (transcript)]]
