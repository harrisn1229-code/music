---
type: plugin
title: "Varispeed 3.0"
category: Drive/Color
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
---

# Varispeed 3.0

![[Images/Varispeed 3.0.jpg]]

**Category:** Drive/Color
**Vendor:** Max for Live

## What it is

A Max for Live effect simulating tape varispeed — pitch and time shifting together the way a physical tape machine's speed control would.

## What it's used for

Classic varispeed pitch/tempo effects for transitions and tape-style character.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Techniques

- **A sample chosen and nudged specifically because tempo/pitch coupling would land it in a better key**: Daft Punk's "Harder, Better, Faster, Stronger" samples Edwin Birdsong's "Cola Bottle Baby" and subtly increases its tempo, which — because tempo and pitch are coupled in a straight speed change — also lifts the sample up by one semitone as a side effect, tightening the groove and improving the key fit in a single move rather than two independent edits. → [[13 songs you didn't know sample other songs]] — David Bennett Music Theory, [13 songs you didn't know sample other songs](https://www.youtube.com/watch?v=951suvmMDs4)
- **George Martin's "wound-up piano" trick — half-speed record, double-speed playback, on "In My Life" and "Rocky Raccoon."** Martin composed a piano solo too intricate to play at the intended tempo, so he recorded it with the tape running at half speed (letting him actually play the notes at a comfortable pace), then played the tape back at normal/double speed — the performance snaps into the correct tempo but an octave higher, with a harpsichord-like timbre from the pitched-up transients. He'd used the same "wound-up piano" method previously with Billy J. Kramer; "Rocky Raccoon"'s piano solo is reportedly the same technique. A direct, decades-earlier precedent for this plugin's Speed-knob-as-pitch-shift-via-tempo-change mechanism, just used to enable an otherwise-unplayable performance rather than for tone. → [[27 Beatles songs that George Martin played on]] — David Bennett Music Theory, [27 Beatles songs that George Martin played on](https://www.youtube.com/watch?v=YDYedISQ2JU)
- **A dramatic real-world varispeed match: an entire song section vari-sped to land perfectly in both the destination key AND tempo simultaneously, by design.** Elton John/Dua Lipa's "Cold Heart" is a 4-song medley (Sacrifice, Rocket Man, Kiss the Bride, Where's the Shoorah) built around Sacrifice's original 1989 vocal (used as-is, only reharmonized underneath — new B♭ minor progression under the same melody/performance). The "Where's the Shoorah" choir sample was originally E♭ major at 130 BPM; slowing it via vari-speed to Cold Heart's 116 BPM tempo *also* dropped its pitch down to D♭ major — the song's actual key — in the same single move, because tempo and pitch are coupled on real tape (exactly this plugin's Speed-knob mechanism). The producers likely chose which archival tracks to sample specifically by testing which ones COULD vari-speed cleanly into the target key/tempo pair, rather than picking samples first and fixing pitch/tempo independently afterward with modern time-stretch tools. **Independent pitch/tempo tools exist and are more flexible, but coupled vari-speed is still the cleaner-sounding, more "found" result when a source happens to line up** — worth testing a real vari-speed match before reaching for independent stretch/shift on a sample that's close-but-not-quite in key/tempo. → [[Sampling and Sound Selection]] — David Bennett Music Theory, [[How "Cold Heart" was made from 4 classic Elton John songs]]
- **Core mechanism, from the tape-hardware side: speed moves tempo and pitch together, in either direction** — slow down and both drop together (softens transients); speed up and both rise together (tightens the groove); the harmonics shift too either way. This is exactly what this plugin's Speed knob recreates in the box. → [[Pitch and Formant]] — Zach Scholz, [This One Knob Completely Changed My Music](https://www.youtube.com/watch?v=OeHzepmklOo)
- **Keep the move subtle — a few percent, not a speed-halving** — real tape varispeed use isn't dramatic; a full 15→7.5 ips halving would drop a source a full octave, but the actual creative move is usually just a few percent (his own deck tops out at 12%). Even that small a shift is enough to change how a track feels emotionally — a useful calibration for how far to push the Speed knob before it reads as an effect rather than a mood change.
- **Cited historical example: Tears for Fears' "Everybody Wants to Rule the World"** — tracked at a slower BPM, then sped up on tape by about 4% afterward "to give a little bit of life to the track" — a real-world reference point for how small a Speed move can still matter.
- **Mixing-stage use: bounce, then speed-shift for fresh ears on a fatigued mix** — at the point where your ears are fatigued and you feel indifferent toward a track, even mid-mix, bounce it into a new session and speed it up or down just to hear it differently; it plays back like hearing the mix for the first time. Slowing down in particular tends to surface buried melodic ideas that were getting lost after working the track too long.
- **Also a mastering-stage decision, not just a mixing trick** — right before finishing a track, trying a small overall speed/pitch shift and keeping it if it lands better than the original is the same move tape engineers made nudging tape speed and letting a song "sit" wherever that landed.
- **Historical practical use for vocals: slow down to make a hard part easier to sing, then bring it back to speed** — a vocal line that's difficult to hit can be tracked slowed down (performed at the lower, easier pitch/tempo) and then sped back up afterward so the take pitches back up with it — the same logic behind "sing in falsetto, then pitch down" documented on [[Pitch and Formant]], applied via full-signal speed instead of just pitch.
- **Owned hardware equivalent for the exact same idea:** [[Sony TC-630]], if run at an adjustable speed for varispeed coloring specifically, rather than only its usual fixed-speed tape-warmth pass. → [[Sony TC-630]] — Zach Scholz, [This One Knob Completely Changed My Music](https://www.youtube.com/watch?v=OeHzepmklOo)
- **Also demoed live via a hardware deck's varispeed pitch-control knob** on a 1984-style recreation track, run right alongside a fixed-speed reel-to-reel for the fidelity pass — a reminder that a varispeed move and a "print through tape for color" move are two separate, stackable stages, not either/or. — Zach Scholz, [I Tried Recording a Song Like It's 1984](https://www.youtube.com/watch?v=iQ1QHsdhsiA)

## Key Parameters

```visual-key
image: Images/Varispeed 3.0.jpg
coords: Images/Varispeed 3.0.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique |
|---|---|---|---|
| ① | Tempo_on | Engages varispeed / links the speed change to the project tempo | On to have the pitch shift follow tempo changes |
| ② | Speed (central knob) | Shifts pitch + time together, like tape varispeed | Down for a pitched-down drag; up for chipmunk |
| ③ | ± Semitone | Quick −1 / +1 semitone step buttons | Nudge exact semitones without dialing the knob |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
