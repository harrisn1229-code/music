---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=uJ5Lh7YD-pM
channel: Anthony Marinelli Music
duration: "00:37:57"
video_type: gear
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, filters, distortion, vintage-gear]
---

# The SCREAMING Filter: How Herman Gillis Created the Sherman Filterbank

![](https://www.youtube.com/watch?v=uJ5Lh7YD-pM)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=uJ5Lh7YD-pM)

## Synopsis

Interview with Herman Gillis, inventor of the Sherman Filterbank (used by The Orb, David Bowie, Human League, Ziggy Marley), tracing the design from his teenage guitar-pedal experiments through the Filterbank 1, Quad Modular Filter, Filterbank Compact, and the Rodec/Sherman Minirestyler, with Anthony demoing the sound live on a Minimoog and TR-909. The valuable content is the multi-stage distortion architecture inside a switched-capacitor filter design — genuinely applicable to building or evaluating any aggressive filter chain, not just this specific unit.

## Techniques

- **Multi-stage distortion inside a filter, not just before/after it**: the Filterbank distorts at three separate points in the signal path — an input-stage diode limiter (added specifically to tame the signal *before* it hits the switched-capacitor filter, since driving the SCF stage directly "sounds really not nice"), inherent non-linearity in the switched-capacitor filter itself, and a third stage where the filter's own output amplitude-modulates a VCA. Getting an aggressive filter/distortion character right is a question of tuning the *ratio* between these stages, not just cranking one drive knob.
- **Amplitude-modulating a VCA with a lower filter's resonant sine wave produces even-harmonic emphasis, not the usual odd-harmonic content**: Filter 2 (tuned to a fixed sub-ratio of Filter 1 — 1:2, 1:4, or 1:7 — or freely detuned) outputs a resonant sine wave that amplitude-modulates the VCA carrying Filter 1's signal. Because the VCA's gain response to that modulating sine is asymmetric, the resulting waveform is asymmetric too, which boosts even-order harmonics — the opposite of the odd-harmonic content most classic distortion (tube, diode clipping) produces. Worth trying deliberately when a sound needs to sit differently than the usual saturation flavor.
- **Dual-filter harmonic-ratio design as a distortion source in itself**: running two filters in a fixed low integer ratio (rather than one filter plus a separate drive stage) is itself a distortion/coloration technique — the "harmonic mode" — distinct from detuning them freely for a chorus-like spread.
- **A single knob crossfading LP→BP→HP, made dynamically modulatable by the input envelope** (Minirestyler): rather than a filter-type switch, the low-pass/band-pass/high-pass selection is one continuous knob, and that knob itself can be modulated by an envelope follower on the incoming signal — so the filter type morphs in real time with the source's dynamics, not just its cutoff.
- **"Range extension" mode**: in fixed-ratio harmonic mode, an extra range control transposes both filters together rather than just one, shifting their ratio relationship as it goes and pushing the design into heavy distortion at extreme settings — a way to get a second, more chaotic distortion character out of the same dual-filter architecture without adding an external drive stage.
- **General lesson — locate the distortion stage before you judge a design**: same finding as the video on 10 distortion techniques ([[Saturation and Distortion]]) — when evaluating an aggressive filter or drive circuit (hardware or plugin), listen for *where* in the path the actual clipping/saturation is happening (input, filter stage, post-filter gain stage) rather than assuming one drive knob tells the whole story.

## Routed to

- [[Saturation and Distortion]] — new bullet on the multi-stage distortion architecture and the even-vs-odd-harmonic VCA-modulation technique.
- [[Filters and Resonance]] — new bullet on dual-filter fixed-ratio "harmonic mode" as a distortion/coloration source, and the envelope-modulatable LP/BP/HP crossfade knob.
- [[Vintage Gear Worklist]] — added Sherman Filterbank / Minirestyler (unchecked, backlog) under Outboard/Effects; not yet a full gear-ref note.

## Source

- [The SCREAMING Filter: How Herman Gillis Created the Sherman Filterbank](https://www.youtube.com/watch?v=uJ5Lh7YD-pM) — Anthony Marinelli Music, 37:57. Captions, high confidence.
