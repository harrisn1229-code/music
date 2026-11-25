---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=iJwF61mjWuQ
channel: Sol State
duration: "00:04:18"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, sidechain, mixing, bass, kick, low-end, clipping]
briefed: backlog
---

# Fox Stevenson: New Sidechain Trick (to Avoid "Bow Tie", Get "That Pump" & Maximize Subs) [Advanced]

![](https://www.youtube.com/watch?v=iJwF61mjWuQ)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=iJwF61mjWuQ)

## Synopsis
Fox Stevenson diagnoses a specific failure mode in standard bass/808 sidechaining: ducking the whole signal amplitude (an [[LFO Tool]]-style volume shaper keyed off the kick) carves a "bow tie" shape into the low end over time — the sub gets pinched out right when the kick hits, exactly the moment it's needed most. His fix is to sidechain only the top end of the bass (just above where the sub lives) rather than the whole signal, which preserves the sub's full amplitude while still delivering the audible "pump" people are actually chasing. He then goes further with a more advanced, non-sidechain approach: route the kick and sub to a shared bus and clip them together, which forces their transients into alignment ("forces them to become friends") for a tighter kick/sub relationship than sidechaining can achieve — then cleans up the resulting clip-distortion with a fast, sidechained, soft-knee multiband move keyed off the kick's own low end, and uses an oscilloscope to see exactly which harmonics got clipped away so they can be dialed back into the dry kick. This overlaps thematically with existing vault coverage — the "bow tie" term itself already appears in [[Fox Stevenson - You Will Never Use Clipping the Same Way Again]] (there describing a limiter/clipper folding a snare while protecting the sub), and multiband sub-only sidechaining is already documented via Disclosure in [[Sidechaining]]. This video's contribution is new: it names and explains the amplitude-duck "bow tie" mechanism explicitly, and its multiband fix is the *inverse* of Disclosure's approach (duck the top end and protect the sub, vs. Disclosure ducking only the sub and protecting the top end) — plus the clip-together kick/sub bus trick with oscilloscope-guided recovery isn't documented anywhere else in the vault.

## Techniques
- **"Bow tying" — the failure mode of a standard whole-signal amplitude sidechain on a bass/sub.** Keying an [[LFO Tool]]-style volume-shaper duck off the kick and zooming out on the bass's low-end view shows a pinched, bow-tie-shaped envelope: the sub gets carved out right at the kick hit, exactly when you want it. He names this explicitly as the thing to avoid — not because pumping is bad, but because it's an unintended casualty of ducking the *whole* signal. → [[LFO Tool]], [[Sidechaining]] — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Fix: sidechain only the top end of the bass (just above the sub), not the whole signal.** Splitting the bass and only ducking the frequencies above where the sub content lives keeps the full sub amplitude intact through every kick hit while still delivering the exact same audible "pump" — because you rarely actually *hear* sub, you feel it, so ducking it contributes nothing to the perceived pump but costs you all your low-end energy. This is why he defaults to **multiband sidechaining on the kick** as a habit, not a one-off fix. Note this is the inverse of the sub-only multiband duck already documented from Disclosure ([[Sidechaining]]) — that method ducks *only* the sub and leaves the top end alone; this one ducks the top and protects the sub. Two opposite multiband strategies solving the same masking problem depending on which part of the bass you're willing to sacrifice. → [[Multiband Compression]], [[Sidechaining]] — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Pumping is a valid creative choice — the goal isn't to eliminate it, it's to choose it deliberately.** If you like the sound of a hard pump, that's a legitimate aesthetic decision; the point of this fix is that you shouldn't be *losing sub as a side effect* of chasing that pump — get the pump you want without the sub tax. — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Advanced non-sidechain alternative: bus the kick and sub together and clip them, forcing their transients to lock ("become friends").** Rather than a compressor duck, send both the kick and the bass/sub to the same group/bus and drive a clipper across it — clipping forces the two signals to share headroom and their transients align tightly, producing a kick/sub relationship closer to "perfect" than sidechaining alone gets, at the cost of the kick picking up audible distortion. → [[ClipGain]], [[Clipping and Loudness]] — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Flatten the gain-reduction history on the bus before clipping, then dial it back if it's too flat.** Watching the dynamics-history display on the bus processor, pull the kick/sub relationship down toward flat (fully glued) as a starting point, then back off toward more natural dynamics if fully flat reads as too aggressive — flat is the extreme end of the dial, not necessarily the target. — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Clean up clip-distortion on the kick by sidechaining a fast, soft-knee multiband move to the kick's own low end.** The clip-together trick distorts the kick only *while* the kick's low end is present and overlapping the sub — so key a multiband dynamics processor's sidechain input off the kick's low end itself, with attack and release set very fast (fast enough to avoid adding audible distortion from the multibanding itself) and a soft knee, to strip out just those clip-induced distortion artifacts without otherwise touching the kick. → [[Multiband Compression]], [[Kick Design]] — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **After de-distorting, the kick reads too quiet against the sub — bus it and blend dry kick back in to taste.** Once the clip-distortion cleanup pulls level out of the kick, group the processed signal and parallel-blend in as much of the original dry kick as needed to restore its presence against the now-tighter sub. — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **Use an oscilloscope to see exactly which waveform content got carved out, then re-EQ it back into the dry kick bus.** Watching an oscilloscope while comparing processed vs. dry shows precisely which harmonics/waves were removed by the clip-cleanup stage — that visual read lets you re-introduce specifically those frequencies back into the dry kick blend rather than guessing with EQ. Explicitly framed as a **supplement to your ears, not a substitute** — verify by eye, decide by ear. → [[jo.Oscilloscope]] — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)
- **End result: go far more aggressive on kick/sub processing than a normal sidechain allows, because the pair is now locked together rather than one merely reacting to the other.** With the clip-glue + cleanup + dry-blend chain in place, you can push the processing much harder than a standard sidechain setup tolerates, because kick and sub are forced to move as one unit instead of the sub passively reacting to the kick's trigger. — Fox Stevenson (Sol State), [Fox Stevenson: New Sidechain Trick](https://www.youtube.com/watch?v=iJwF61mjWuQ)

## Routed to
- [[LFO Tool]]
- [[Sidechaining]]
- [[Multiband Compression]]
- [[ClipGain]]
- [[Clipping and Loudness]]
- [[Kick Design]]
- [[jo.Oscilloscope]]
- [[Fox Stevenson - You Will Never Use Clipping the Same Way Again]]

## Source
[Fox Stevenson: New Sidechain Trick (to Avoid "Bow Tie", Get "That Pump" & Maximize Subs) [Advanced]](https://www.youtube.com/watch?v=iJwF61mjWuQ) · Sol State · 00:04:18 · captions (high confidence — spoken, clean audio) · transcript: [[Fox Stevenson - New Sidechain Trick (to Avoid Bow Tie, Get That Pump & Maximize Subs) Advanced (transcript)]]
