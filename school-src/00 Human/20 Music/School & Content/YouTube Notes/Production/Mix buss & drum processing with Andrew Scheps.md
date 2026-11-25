---
type: yt-note
date: 2026-08-16
source: youtube
url: https://www.youtube.com/watch?v=8_J9DP4EsFk
channel: Mix with the Masters
duration: "00:08:33"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mixing, andrew-scheps, mix-bus, drum-bus, parallel-compression, limiting]
briefed: backlog
---

# Mix buss & drum processing with Andrew Scheps

![](https://www.youtube.com/watch?v=8_J9DP4EsFk)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=8_J9DP4EsFk)

## Synopsis

Andrew Scheps walks through his mix-bus processing chain and then the drum-kit dial-in for one mix, and it's dense with concrete, numbered settings throughout. Two big ideas anchor the video: his standing mix-bus chain (a broad "happy face" Pultec-style EQ into an Oxford Limiter run barely engaged, both of which he leaves on from the very start of the mix rather than adding at the end) and a layered, quietly aggressive drum treatment built almost entirely from parallel processing — a shared kick/snare "crush" bus, a drums-dirt effects send that's automated in and out for pushes and choruses, tom and snare short-ambience reverbs (one pitch-shifted for an unnaturally big, stadium-like character), and two stacked parallel drum-bus compressors (a Fatso-style unit and a Fairchild-670-style "drum crush," the latter deliberately run unlinked left/right). His stated mixing philosophy threads through: aggressive multi-stage processing that individually looks subtle but together does "a big part of the sound of this mix," and heavy per-track treatment specifically so the drums can "keep up with" everything else layered on top.

## Techniques

- **Mix-bus "happy face" EQ, on from the start of the mix: a broad low boost around 100 Hz and a broad high shelf-like boost around 10 kHz, both plus a few dB.** "Just plus 2 and a half at 100, and plus 4, very broad at 10 — so it's almost like a shelf at 10." Explicitly a Pultec-style passive EQ plugin — Scheps states he prefers the Pultec plugin emulation over the real Pultec hardware ("Pultecs seem to ring a little bit down on the low end especially... the plugins are generally a little tighter") and separately name-checks the Lang EQ (same passive topology, solid-state makeup amp instead of tube) as tighter still, wishing someone would model it. Rationale for doing this across the whole mix rather than per-track: "why do it individually if you can do it across the mix? And why not do it immediately so that this is just what your mix sounds like from the very beginning."
- **Oxford Limiter run barely engaged on the mix bus, for character and length, not loudness — with a specific settings recipe.** Input trimmed down about **0.25 dB**; output ceiling **−0.1 dB** ("just to keep the red lights off"); **slowest attack, fastest release**; **auto gain off, auto comp off** ("it just does the amount of limiting it needs to do to keep it at 0.1 dB below clipping"); the plugin's built-in **Inflator/enhancer circuit** engaged for a little extra harmonic lift. Despite reading as barely doing anything, bypassing it shows **4–5 dB of gain reduction on kick/snare peaks** — described as "actually a big part of how I'm lengthening the kick and the snare... without the limiter, they just come poking out and they're too loud, and they're too short, and they're not really helping."
- **A shared parallel "kick snare crush" bus: both dry kick and snare tracks (plus the engineer's own pre-built parallel kick/snare compressors) are sent into one more parallel compressor, a DBX 160-style unit.** Settings: **~4:1 to 4.5:1 ratio**, transient-triggered ("each transient just triggers the compressor"), not a huge amount of gain reduction — described as adding "a little bit of length" and reshaping the attack rather than obviously squashing. This crush bus sits downstream of the individually-tracked kick/snare processing, taking "that entire kick sound as a whole and pump[ing] it up a little bit."
- **A dedicated tom-reverb chain: low-pass filter into a short ambience reverb, then that reverb is PITCH SHIFTED — an intentionally unnatural, "stadium" tom sound.** Described as a classic '80s/'90s move (the equivalent of running an AMS delay after an AMS reverb, pitch-shifting the reverb tail). "It gives them this unnatural room, the stadium thing... in context with the kit it's just a way to make them stand out and almost sound a little bit unnatural." Explicit design philosophy: individually the tom treatment sounds artificial, but "together it still sounds like a drummer, it doesn't sound like samples being built up."
- **A short, bright, very stereo snare-reverb bus — automated on/off, engaged only in choruses — to lengthen the snare without it reading as "reverb."** Similar short-ambience recipe to the tom reverb (same room, not pitch-shifted, brighter) but kept subtle and mix-automated in and out via the mute-automation lane. "You're not supposed to notice the snare getting longer... it keeps the snare the same relative length" against everything else stacking up in the chorus.
- **"Drums dirt" send: high-pass EQ → a lo-fi/bitcrush stage → an aggressive multiband clipper (an iZotope Trash-style plugin), used ONLY as an automated push effect on transitions and choruses, not a constant processing stage.** Explicitly muted/unmuted by section rather than left on. Purpose: beefing up the whole kit in specific moments — "in context, that drums-the-dirt is really helping the kit keep up," making the hats and overall kit push forward without simply turning the fader up (which would just be "a loud dry drum kit"). General mixing principle stated alongside it: parallel effects like this exist "to try and make it so... the drum kit gets bigger to keep up with the other instruments... not so that you notice them coming and going, but so that you don't think you're missing anything when you get to the next section."
- **Room-mic tracks brought up ONLY during the same pushes/chorus sections as the drums-dirt send — another automated-in/automated-out layer, not a constant blend.** "Again, you don't notice those coming and going, but if they didn't happen [it would feel flat]... it just sounds like all of a sudden the drummer is beating the crap out of the drums, which probably was."
- **Two stacked stereo parallel drum-bus compressors, each contributing a different flavor, both run in addition to the crush bus above:** (1) a Fatso-style tape/compressor plugin with heavy peak limiting (the drum kit's transients are hard enough to trigger real gain reduction on it), described as adding fullness — "a little more boring, a little dryer without [it]"; (2) a "drum crush" plugin modeled on a **Fairchild 670** but run as **two mono instances, unlinked left/right** — deliberately not stereo-linked so each side compresses independently, "probably working pretty hard on this song." Both feed the drum bus in parallel with the dry signal; bypassing both together noticeably drains the excitement — "everything just sounds like more fun with them."
- **Kick track processing (the individual close-mic tracks, before the shared crush bus): heavy noise gating left as-received from the session ("these gates came to me like this"), a high-pass filter, a lo-fi stage, and aggressive EQ, plus two triggered sample layers blended in only at specific moments** — a short, clicky, low-end-heavy sample used only in choruses, and a longer, more "drum machine"-like kick sample used only on certain downbeats — deliberately not used throughout, to "reinforce and make dynamics happen within the kick drum performance" and to make a mostly-real kit read partly programmed without sounding like samples wholesale.
- **Overheads: matched EQ (a shared top-end boost matching the room mics' existing cymbal EQ) plus an extra high-shelf boost on both channels, specifically to compensate for how much cymbal energy is bleeding into the closer mics and room mics instead of the overheads themselves** — used to keep the overheads contributing "a little bit of air to the kit" in the drier sections where the room mics aren't engaged.
- **A reamped guitar-amp-in-a-room track used purely as an ambience layer for the drum kit** (not a separate instrument) — deliberately included because close mics and overheads alone get "eaten up very, very quickly" once other instruments are added; the odd, non-drum-shaped ambience from the reamp draws the ear and gives the kit a sense of length/space that survives in a dense mix.

## Routed to

- [[UAD Pultec EQP-1A]] — mix-bus "happy face" broad EQ recipe (+2.5 dB @ 100 Hz, +4 dB broad shelf @ 10 kHz)
- [[EQ]] — broad, always-on mix-bus EQ philosophy (do it across the mix, from the start, not per-track after the fact)
- [[Limiting]] — Oxford Limiter always-on mix-bus recipe (input trim, ceiling, slow attack/fast release, auto gain/comp off, inflator)
- [[Parallel Processing]] — kick/snare crush bus; stacked Fatso + Fairchild-670-style stereo drum-bus parallel compressors run unlinked
- [[Reverb]] — tom reverb + pitch shift for stadium character; automated snare-reverb bus
- [[Saturation and Distortion]] — drums dirt send (HPF → lo-fi → multiband clipper), automated as a push effect
- [[Automation]] — mute-automating room mics and the drums-dirt send in/out for pushes and choruses
- [[Kick Design]] — layered triggered kick samples blended selectively with the live kit
- [[3 Drums Bus]] — kick/snare crush bus, Fatso + drum-crush stacked parallel compressors, drums-dirt automated send added inline
- [[Plugin Wishlist]] — DBX 160 (kick/snare crush), Fairchild 670 / "drum crush" plugin (unlinked stereo use), Oxford Limiter with Inflator, iZotope Trash-style multiband clipper, Waves MV2-style parallel compressor
- [[Vintage Gear Worklist]] — DBX 160, Fairchild 670

## Source

- **Channel:** Mix with the Masters
- **Duration:** 8:33
- **Transcript:** automatic/official English captions (high confidence, dense spoken walkthrough with exact numbers throughout) — [[Mix buss & drum processing with Andrew Scheps (transcript)]]
- **URL:** https://www.youtube.com/watch?v=8_J9DP4EsFk
