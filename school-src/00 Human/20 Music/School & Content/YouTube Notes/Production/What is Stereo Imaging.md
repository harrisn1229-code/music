---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=h1aNrMEi5XA
channel: Sage Audio
duration: "00:12:25"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, stereo, width, panning, mic-technique, mastering]
---

# What is Stereo Imaging?

![](https://www.youtube.com/watch?v=h1aNrMEi5XA)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=h1aNrMEi5XA)

## Synopsis

A ground-up stereo imaging primer from Sage Audio covering the full 180° field concept (not just the traditional 90° pan pot range), width vs. depth definitions, three tracking-stage mic formations, mixing-stage panning techniques including a genuinely novel spectral/HRTF-style panning method, and mastering-stage stereo control via mid/side — with a clear caution against over-widening at the mastering stage specifically.

## Techniques

- **The stereo field has three zones, and traditional panning only reaches ONE of them.** Center 90° (where a standard pan pot operates, hard-left to hard-right) vs. the left 45° and right 45° zones beyond that, which together make up the full 180° field. A pan pot alone caps a mix at the center 90° — accessing the outer 45° zones on either side requires delay-based phase cancellation techniques (splitting a mono signal into two, delaying one), not panning. → [[Width and Stereo]]
- **Width and depth are precisely distinct, separately-controlled properties: width = POSITION within the 180° field, depth = AMPLITUDE plus how much temporal processing (reverb/delay) is applied.** A wider image sits farther from center (0°) toward either edge; depth reads through loudness (louder = closer) and through reverb/delay characteristics (a longer reverb time/larger room = farther away, a dry close-mic'd signal = closer). Useful as a clean mental model: panning and delay-based imaging control width, level and reverb/delay control depth — different tools for different axes. → [[Width and Stereo]], [[Depth and Space]]
- **Three tracking-stage mic formations, each targeting a different part of the 90° field.** **Spaced pair**: two identical mics, equally spaced from each other and the source (spacing specifically minimizes phase cancellation between them), panned hard L/R post-recording — fills the 90° field from its outer edges in. **Mid/side**: one cardioid mic (stays centered/mono) + one figure-8 (bidirectional) mic, duplicated, one copy phase-inverted, both panned hard L/R — three total channels (mid, side-L, side-R); balancing center vs. side channel level directly controls the recorded stereo width. **Decca tree**: a spaced pair (panned hard L/R) PLUS a third center omni mic left un-panned — the omni fills in the gaps a spaced pair alone leaves in the middle of the 90° field, for a fuller, more continuously-filled stereo image. → [[Drum Mic Technique]], [[Width and Stereo]]
- **Delay-based panning mimics real inter-aural time difference (ITD) — delay just ONE channel slightly to make a signal read as coming from the OTHER side.** Real directional hearing works because sound reaches the near ear before the far ear; delaying the right channel makes the left ear receive the signal first, so the brain interprets the source as coming from the left (and vice versa) — a psychoacoustically natural-sounding trick, easily built with a plain sample delay on one channel. → [[Width and Stereo]]
- **Spectral (HRTF-style) panning: attenuate ONE channel's high frequencies to mimic how the head physically shadows the far ear — a distinct, natural-sounding companion technique to delay-based panning.** A real head blocks/absorbs/reflects high frequencies specifically (not lows) on the way to the ear farther from a sound source — so a sound source to the right reaches the right ear with a full spectrum but reaches the left ear with attenuated highs, and the brain reads that spectral asymmetry as directional information. Recreate by duplicating a signal to two channels and rolling off the highs on just one side — combined with delay-based panning and traditional pan/level, this gives access to genuinely natural-sounding placement anywhere across the full 180° field, not just the center 90°. → [[Width and Stereo]]
- **Mastering-stage width control is primarily mid/side gain balance, NOT delay-based widening — and delay-based widening at mastering carries real risk.** Since mastering usually works on a stereo file rather than individual instruments, mid/side processing (splitting into mono "mid" + up-to-179°-wide "side" channels, then adjusting their relative levels) is the main width tool available. Delay-based imagers CAN be used at mastering but the video explicitly cautions against relying on them there: delaying whole instrument groups/frequency ranges risks severe phase issues, aggressive widening at this stage can cost a master its impact, and heavy 180°-field content translates poorly on mono playback systems. Net guidance: **more stereo widening is not better at the mastering stage** — approach delay-based imaging there very carefully, if at all. → [[Width and Stereo]], [[Referencing and Translation]]

## Routed to

- [[Width and Stereo]] (technique) — full-180°-field concept, width/depth distinction, delay-based and spectral/HRTF panning, mastering-stage width caution
- [[Depth and Space]] (technique) — depth-via-amplitude-and-temporal-processing definition
- [[Drum Mic Technique]] (technique) — spaced pair / mid-side / Decca tree mic formation summaries
- [[Referencing and Translation]] (technique) — mono-translation risk from over-widening at mastering

## Source

- [What is Stereo Imaging?](https://www.youtube.com/watch?v=h1aNrMEi5XA) — Sage Audio, 12:25
- Transcript source: captions, high confidence
- Full transcript: [[What is Stereo Imaging (transcript)]]
