---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=vzJSKU7kGrU
channel: Sage Audio
duration: "00:08:33"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken breakdown, coherent full sentences throughout; one short musical demo excerpt is not transcribable
tags: [yt-note, music, production, mastering, reverb, master-bus]
briefed: backlog
---

# Reverb on a Master: Everything You Need to Know

![](https://www.youtube.com/watch?v=vzJSKU7kGrU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=vzJSKU7kGrU)

## Synopsis

A short, focused breakdown from Sage Audio (a mastering studio operating since 2005) on a rarely-discussed mastering move: putting reverb on the master bus itself. The core framing is a **spectrum of mix cohesion** — at one end, every element in a mix was recorded/processed in a different "room" (samples in one space, vocals in another, a DI'd guitar through an amp emulator) and the record sounds disjointed; at the other end, everything shares nearly identical decay/reflections and blurs together into mush. Reverb-on-master is a tool to nudge a mix that's too far toward "disjointed" back toward the cohesive middle — and should be avoided entirely if the mix is already too far toward "blurred." The video explicitly compares this to bus compression: compression ties dynamics together, reverb ties the perceived *space* (and collective ADSR) together. Two concrete tips follow: (1) sequence reverb correctly in the mastering chain relative to compression/limiting, and monitor it with the limiter engaged, since a limiter's gain makeup can suddenly expose a reverb tail that sounded fine unlimited; (2) use a reverb with both an EQ section and controllable early/mid/late reflections, because a mastering-stage reverb isn't there to add ambience broadly — it's there to surgically boost cohesion in the specific frequency ranges/reflection stages where a mix sounds disjointed, while leaving already-cohesive ranges alone. Understated, technical, worth the runtime even though this is a narrow use case for someone who ultimately hands mixes off to a mastering engineer rather than self-mastering.

## Techniques

- **Reverb quality bar for mastering is much higher than for a mix-bus creative send.** On an individual mix element, a stylistic/colored reverb is fine (genre sound, creative choice). On the *master*, you're affecting 100% of the signal, so the reverb needs to be the most realistic unit/plugin available — one that changes timbre "as realistically and subtly as possible," not a character reverb. The presenter names an unnamed on-screen "iZotope convolution plug-in" as his pick specifically because it emulates reflections from multiple distances accurately; he flags that generic impulse-response (IR) plugins can struggle with close reflections without introducing phase cancellation. *(Plugin name not spoken in the audio — likely shown as on-screen text only; not confirmed enough to add to the wishlist under a specific product name.)*
- **The cohesion spectrum — the whole decision framework for whether to use reverb on a master at all.** Picture a spectrum: one end = every element has a distinct decay rate/reflection set (disjointed, "recorded in different rooms"); other end = everything shares nearly identical decay/reflections (blurred together, hard to distinguish instruments). The target zone is the *middle* — distinct enough to stay intelligible, cohesive enough to read as one record. Only reach for mastering-stage reverb when the mix sits toward the "too disjointed" side of that middle; never when it's already toward "too blurred" — more reverb there only makes the masking worse.
- **Reverb-on-master vs. bus compression — same job, different axis.** Bus compression ties a mix together by forcing more uniform *dynamics* across everything simultaneously. Reverb-on-master ties a mix together by placing everything inside a shared perceived *space*, which also affects the collective ADSR (attack/decay/sustain/release) of the mix as a whole. Framed as two tools solving the same "make it sound like one record" problem from different angles.
- **Chain position: after upward compression/limiting-shaping, before peak limiting — and monitor with the limiter ON.** Temporal effects (reverb, delay) "sneak up" during mastering because their reflections/taps live in the lower amplitude range, which a limiter's makeup gain then pushes back up to audible. Fix: get the master's dynamics roughly finalized first (upward compression + limiting applied) *before* dialing in reverb, so you're judging reverb level against something close to the final loudness. Insert the reverb after any upward compression, but still before the peak limiter. Then adjust the reverb's settings **with the limiter enabled** — demoed live in the video: a reverb level that sounds appropriately subtle with the limiter bypassed becomes noticeably too audible once the limiter (with gain compensation) is switched on, forcing a subtler reverb setting than you'd pick by ear pre-limiter. → [[Master Chain]], [[Limiting]], [[Compression Staging]]
- **Check both quiet AND loud sections before settling on a reverb level — automate the send if no single setting works for both.** A reverb level dialed against a loud/busy section can be far too aggressive during a sparse section (where the tail has nothing to hide behind and becomes obviously audible); a level dialed against a sparse section can smear transients and hurt intelligibility once a busy section comes in. If there's no single setting that works across the whole song, automate the reverb's mix/send amount over time rather than compromising on one static value. → [[Automation]]
- **Pick a mastering-stage reverb with a built-in EQ section — and use it to target specific COHESION problem-frequencies, not to "shape the reverb's tone."** The framing shift is the point: a reverb's EQ is normally thought of as tone-shaping the reverb sound itself, but on a master it doubles as a way to increase or decrease *perceived cohesion* independently per frequency range. Worked example from the video: lows already sound cohesive, but the mids around ~1.5 kHz and the highs around ~6 kHz sound disjointed (as if recorded in different rooms) — the fix is to pull the reverb's reflections down in the lows (leave that range alone) while boosting them specifically in the ~1.5 kHz and ~6 kHz ranges where the disjointedness lives. Without that per-band control you're stuck affecting the whole spectrum uniformly, which the video calls "rarely the best approach." → [[EQ]], [[SUB Slot]], [[BASS Slot]], [[MIDS Slot]], [[AIR Slot]], [[Sound Palette]]
- **Controllable early / mid-distance / late reflections matter as much as the EQ.** A reverb whose reflections split into close/early, mid-distance, and far/late positions (rather than one blended "amount" knob) lets you fill specific gaps in a mix's sense of depth rather than adding one generic wash. Two named failure patterns and their fixes: (1) a mix that only has a dry signal plus a long late-reflection tail (heard mainly once it emerges from masking) reads as fake/flat depth — fix by adding early *and* mid reflections to bridge the gap between dry and late; (2) a mix that already has early and late reflections but is missing the mid-distance layer has the same "gap" problem in miniature — fix by adding mid-distance reflections specifically, EQ'd to roughly match whatever reverb character the mix already implies, rather than just cranking the overall wet amount. → [[Depth and Space]], [[ValhallaRoom]], [[Hybrid Reverb]]
- **A little goes a long way — same discipline as bus compression.** Explicitly compared to the SSL-style "1–2 dB of glue is enough" rule: master-bus reverb should be used subtly, checked by ear, not pushed for an obvious effect. The demo section is deliberately understated — audible on close listening, not an obvious wash.

## Routed to

- [[Reverb]] (effect page) — cohesion-EQ + reflection-stage technique, chain-position/limiter-monitoring technique
- [[ValhallaRoom]] (plugin) — closest owned match for the early/mid/late reflection + EQ workflow described (Early/Late Size, Depth, High Cut/Low Cut, Bass/Treble Mult)
- [[Hybrid Reverb]] (plugin) — closest owned match for "most realistic convolution reverb" on a master bus
- [[Master Chain]] — new optional master-bus reverb insertion point (after Oxford Inflator, before kHs Clipper) + `## From videos` bullet

## Source

- [Reverb on a Master: Everything You Need to Know](https://www.youtube.com/watch?v=vzJSKU7kGrU) — Sage Audio, 8:33
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken breakdown throughout
- Full transcript: [[Reverb on a Master: Everything You Need to Know (transcript)]]
