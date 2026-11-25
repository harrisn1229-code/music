---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=0ruBn14ftkI
channel: Sage Audio
duration: "00:04:03"
video_type: production
music_enriched: true
transcript_source: whisper
tags: [yt-note, music, production, mastering, loudness, lufs]
---

# How to Master for Streaming

![](https://www.youtube.com/watch?v=0ruBn14ftkI)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=0ruBn14ftkI)

## Synopsis

A short Sage Audio explainer on how streaming-service loudness normalization (most services target roughly −14 LUFS integrated) should inform mastering decisions, plus a specific true-peak safety margin for lossy encoding and a compact suggested mastering chain order. Most of the loudness-target and true-peak content is already covered in more depth on [[Clipping and Loudness]] (which cites Sage Audio's own more detailed videos); this one adds a genre-split target range and a concrete lossy-encoding headroom number worth folding in.

## Techniques

- **Genre-split loudness target: −14 to −8 LUFS integrated is the practical range for most material, with the specific point chosen by genre.** More dynamic genres (folk, classical, jazz) sit fine around −14 LUFS; louder, denser genres (rap, pop, rock) target closer to −8 LUFS. The quieter the master, the more dynamic range survives normalization. → [[Clipping and Loudness]] (cross-references Sage Audio's tighter [[Master Chain]] pop-trap target of −9 to −7 LUFS-I, consistent with this video's "louder genres run closer to −8" guidance)
- **Reduce true peak by up to 2 dB below 0 dBTP to protect against lossy-encoding gain changes.** Converting a WAV master to a lossy delivery format (MP3/AAC) can shift amplitude by up to 2 dB — a master peaking near 0 dBTP can clip after conversion. *(Sage Audio's number here, ~2 dB, is close to but not identical to the ~1 dB safety margin already logged on [[Clipping and Loudness]] from a different source — both point at the same lossy-conversion risk, treat 1–2 dB true-peak headroom as the practical range rather than picking one exact figure.)* → [[Clipping and Loudness]], [[Limiting]] (effect)
- **A compact suggested mastering chain order:** subtractive EQ first (low-latency linear-phase mode specifically for low-frequency cuts) → light saturation for harmonic fullness → a low-level compressor or maximizer (kept subtle, more so on quieter genres) → a second EQ pass to bring up favored details, optionally with mid-side widening on the side image → limiter + LUFS meter to finish. → [[Master Chain]], [[EQ]] (effect), [[Saturation and Distortion]], [[Multiband Compression]], [[Width and Stereo]]

## Routed to

- [[Clipping and Loudness]] (genre-split loudness target + true-peak encoding-headroom cross-reference)
- [[Master Chain]] (chain-order corroboration)

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=0ruBn14ftkI) — Sage Audio, "How to Master for Streaming" (00:04:03)
- Transcript: Whisper (no captions available), 663 words, good confidence.
- Full transcript: [[How to Master for Streaming (transcript)|transcript]]
