---
type: yt-note
briefed: 2026-W33
date: 2026-08-13
source: youtube
url: https://www.youtube.com/watch?v=35RLrGYQwX4
channel: Mix with the Masters
duration: "00:09:21"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mixing, hybrid-summing, bus-routing, rafa-sardina]
---

# Rafa Sardina's mixing workflow

![](https://www.youtube.com/watch?v=35RLrGYQwX4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=35RLrGYQwX4)

## Synopsis

Rafa Sardina walks through a hybrid analog/in-the-box routing setup: drums, bass, and strings run out of Pro Tools through three SSL buses (A/B/C), each bus carrying its own light processing, before all three SSL outputs plus several direct Pro Tools stereo pairs (vocals, guitars, keys) get summed together in a dedicated summing box. From there, the combined stereo mix is routed into a small mastering console with its own insert chain (an SSL-style stereo compressor, a Shadow Hills-style compressor, a Vacuum Tube compressor, a GML-style subtractive EQ, and a Sontec-style "flavor" EQ) used for glue and parallel compression — a stage he's explicit is mixing, not mastering, applied from very early in the process. Nate doesn't own an SSL desk, a hardware summing box, or any of this outboard, so the real value here is the underlying **routing and blending philosophy** — which buses to share for "glue," which to keep separate for distinct elements, and when in the mix process to reach for parallel compression — translated onto Ableton-native bus/send structures rather than the specific boxes.

## Techniques

- **Deliberately route multiple different instrument groups (drums, bass, some strings) through the SAME SSL bus specifically to create a blended, cohesive character — sharing a bus is itself a glue technique, distinct from any effect placed on it.** "With the drums I wanted to sort of like get rid of some of the edge of the drums... I decided to go through the SSL with all of the elements because I wanted to have more of a blended feeling." Ableton-native equivalent: route multiple track groups to a shared send/return or shared bus (rather than each having its own independent bus) when the goal is a blended, glued character across elements, not just per-element processing. → [[Session Templates]], [[Masking and Carving]], [[Glue Compressor]]
- **A concrete 3-way choice for how "distinct" a bass line should read, expressed entirely through bus routing rather than EQ/compression settings: same bus as the drums (maximum blend), a dedicated separate bus (maximum distinction), or a third bus shared with nothing (an in-between with room for bass-specific processing).** "If I wanted to have a more distinct bassline I'll probably use a different bus in the SSL, I wouldn't go through the same bus as the drums... if I wanted an in-between approach I will basically route the bass not just to bus A but I will also go to a different bus C and dedicate bus C just to the bass, maybe even with its own unique additional compression or EQ." Directly portable to Ableton: the number of tracks feeding one Group/return, and whether a track feeds one group alone vs. multiple, is a mix decision made as early as routing, not left to compression alone. → [[Session Templates]], [[Bass Design]]
- **The blend-vs-distinct routing decision is made VERY early — at the point of first evaluating the song, before any individual EQ/compression choices — because it determines every downstream decision.** "This happens like super early when I evaluate the song — I go like, okay, I'm going for the glue in this song, or I'm going for more of a certain landscape, then I'm going to share a lot of effects between the different elements of the mix... I might even use them on the vocal if the approach asks for it." → [[Session Templates]], [[Gain Staging]]
- **"Glue" is explicitly NOT only a function of which effects/plugins you use — it's equally a function of summing/routing choices themselves.** "People think, like, glue you create with just effects — no, glue you also create with your choices of summing, your choices [of] share compression, [routing] certain elements in the mix." A direct statement that bus/routing architecture is itself a glue tool, not just a delivery mechanism for compressors. → [[Session Templates]], [[Glue Compressor]]
- **A stereo summing/blend box combines several parallel stereo buses (SSL outputs) with several direct DAW stereo pairs (vocals, guitars, keys, each pre-separated into their own stereo output before hitting the summing stage) — a "multibus" architecture where different instrument families are kept in their own summed lanes right up until the final stereo mix.** Extra inserts are available even at the summing stage itself, letting a whole lane (e.g. "all of the vocals") get one more shared processing pass right before the final sum. Ableton-native equivalent: multiple parallel Group/Return tracks feeding a shared pre-master bus, with inserts available on each lane before the final sum — the same layered-blend structure without needing a physical summing box. → [[Session Templates]]
- **Parallel compression is deliberately added MIDWAY through the mix, once the track's full energy is actually present — not at the start of the process — because a heavy parallel-comp stage's impact is very dependent on how much energy (drums pumping, bass, vocals) is already in the mix at the time it's dialed in.** "My parallel compression, because it's so [dependent] on my program... [I add it] midway through the mixing process when I have all of the energy of the mix happening... then I experiment a little bit with the parallel compression." Contrast: EQ/tone-shaping moves that will affect every subsequent mixing decision (his example: adding ~1 kHz on a mastering EQ) get made EARLY instead, precisely because they change how every later decision (queuing a guitar, equalizing the vocal) gets judged. → [[Parallel Processing]], [[Compression Staging]]
- **Adding parallel compression on the master/summing stage measurably widens the stereo field, and requires re-checking (re-EQing) other elements afterward because it changes how the center reads.** "My power compression, going through my LA-2As, is really giving me that extra dimensional element in the stereo field — it's actually widening the stereo field a tiny bit... it does affect your center, it does affect the way the base speaks out, so very often when you apply the parallel compression you have to reconsider what you did with the kick, with the snare, with the vocal — sometimes you have to change slightly, you have to re-cue a little bit those elements in order to accommodate this new compression into the mix." A concrete warning: a late-added parallel-comp stage is not a free lunch — it can require re-visiting earlier EQ/level decisions on the kick, snare, and vocal. → [[Width and Stereo]], [[Parallel Processing]], [[Compression Staging]]
- **A small mastering-style console/insert chain used from EARLY in mixing (not at the end) purely for "vibe," explicitly disclaimed as NOT mastering: "I don't truly do mastering, this is not mastering at all... it's really mix, and I view it that way, because it stays from early, early, early on the moment I have some sounds going."** The chain: an SSL-style stereo compressor for general glue, a Shadow Hills-style compressor and a Vacuum Tube compressor as alternate character options (kept as separate available inserts rather than one fixed default), a GML-style subtractive EQ (his example: cutting ~300 Hz and a touch at ~550 Hz), and a Sontec-style "flavor" EQ used more aggressively for a couple of narrow enhancement bumps (his example: a small boost around 1 kHz). Owned-lane equivalent for the whole "glue chain living on the master from early on" idea: [[Master Chain]]'s own documented "mix-into-it" mode. → [[Master Chain]], [[EQ]], [[Compression]]

## Routed to

- [[Masking and Carving]] — routing drums/bass/strings through a shared bus for blend
- [[Glue Compressor]] — shared-bus glue as a technique distinct from any one plugin; SSL-style master-bus stage
- [[Bass Design]] — the 3-way blend/distinct/in-between bass routing decision
- [[Session Templates]] — deciding blend-vs-distinct routing at song-evaluation time; multibus parallel-lane architecture
- [[Gain Staging]] — early routing decisions shaping every later mix choice
- [[Parallel Processing]] — mid-mix timing for adding parallel compression; master-bus parallel comp widening the stereo field
- [[Compression Staging]] — early tonal EQ vs. mid-mix parallel compression timing
- [[Width and Stereo]] — parallel compression's stereo-widening side effect and the re-cueing it forces
- [[Master Chain]] — early-and-throughout "mix-into-it" glue-chain philosophy; GML/Sontec-style EQ moves
- [[EQ]] — subtractive mastering-EQ cut (~300 Hz) vs. additive "flavor" EQ boost (~1 kHz)
- [[Compression]] — SSL/Shadow Hills/Vacuum Tube compressor options as alternate character choices

## Source

- **Channel:** Mix with the Masters
- **Duration:** 9:21
- **Transcript:** automatic captions (medium-high confidence — spoken walkthrough, some technical hardware names auto-transcribed loosely, e.g. "sampling box"/"submixer" for summing box, "Masterlink"-adjacent console name garbled) — [[Rafa Sardina's mixing workflow (transcript)]]
- **URL:** https://www.youtube.com/watch?v=35RLrGYQwX4
