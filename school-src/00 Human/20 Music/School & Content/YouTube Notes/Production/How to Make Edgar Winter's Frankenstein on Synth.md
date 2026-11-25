---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=Zf8GKMviq9E
channel: Anthony Marinelli Music
duration: "00:18:25"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, arp-2600, sound-design, wah, percussion]
---

# How to Make Edgar Winter's Frankenstein on Synth

![](https://www.youtube.com/watch?v=Zf8GKMviq9E)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Zf8GKMviq9E)

## Synopsis

A deep, three-part breakdown of Edgar Winter's "Frankenstein" on an ARP 2600: the wah-processed lead solo, the vibrato-capable bass double, and — the standout — the self-oscillating-filter "talking drum" percussion technique that closes the video. One of the most sound-design-dense videos in this batch.

## Techniques

**Lead patch + wah processing:**
- **3-oscillator lead**: VCO1 square wave, VCO2 a pulse wave with its pulse-width hardwired to be modulated by the ADSR envelope generator (a standing patch he keeps wired rather than a one-off), VCO3 a sawtooth — all three feed the filter. Filter envelope: slow decay to a sustain level, no attack, quick release. No VCA — filter output goes straight to the mixer.
- **Wah pedal signal chain**: filter output → a preamp (to get line level ready for a pedal) → a Crybaby wah with a TDK chip. **Critical addition: blend a straight (unprocessed) copy of the signal back in alongside the wah'd signal** — the wah-affected signal alone loses fundamental/pitch clarity as the wah sweeps; adding the dry signal back in keeps a constant fundamental/pitch reference under the moving wah color, producing a fuller, more "real" instrument-like result than either signal alone. A general parallel-processing principle: process a sound, then reintroduce an unprocessed copy alongside it rather than replacing the source entirely.
- **Old vs. new ARP 2600 keyboard note**: the vintage keyboard's pitch-bend wheel behaves differently (bipolar, no center detent, exponential response, effectively "takes off" from a floor rather than a fixed center) than a modern reissue's — a specific patch/performance move sometimes genuinely requires period-correct hardware to replicate exactly.

**Bass patch:**
- **Octave-doubled two-oscillator bass**: VCO1 square wave at the root pitch, VCO3 sawtooth an octave up, mixed together and pitched down for body.
- **Manually-controllable vibrato via a dedicated third oscillator as LFO, fed through a fader**: because this keyboard has no built-in LFO, VCO2 (a low-frequency sine wave) is routed through an attenuator fader into a mult, then split to modulate VCO1 and VCO3's frequency inputs simultaneously — moving the fader brings vibrato in and out live, matching the song's vibrato-only-at-certain-notes phrasing (a manual substitute for a mod wheel).
- **No keyboard tracking on the filter for bass, confirmed again**: with tracking on, upper notes get inappropriately bright; the deliberate choice is off (or a partial fraction like 1/2 or 1/3 volt/octave on synths that allow adjustable tracking amount) — consistent with this batch's earlier bass-design findings on Prince's "1999" and other Marinelli videos.
- **No VCA on the bass either** — filter output goes straight out, same non-default patching choice seen on the Billie Jean bass breakdown.

**Self-oscillating-filter percussion ("talking drum") technique — the most novel technique in this video:**
1. **Push filter resonance high enough that the filter self-oscillates and generates its own pure tone** with no oscillator input needed — demonstrated with resonance off (silent/no tone) vs. on (a clear pitched tone appears purely from resonance).
2. **Modulate that self-oscillating tone's pitch with a FAST sine-wave LFO** for a vibrato-like "rub"/growl — the speed is notably faster than musical vibrato, adding character rather than pitch wobble.
3. **Layer in a percussive "clock" element**: an internal clock generator fires a fast-decay-only ADSR envelope, which modulates the filter — producing a rhythmic ticking distinct from the sustained tone.
4. **Route everything through a VCA with its own AR (attack/release) envelope on the exponential input**, separately controllable for tightness (fast attack/release) vs. looseness (slower attack, added release/sustain) — this is what turns the raw oscillating-filter tone into a percussive "hit" rather than a continuous drone.
5. **"Play" the filter's center frequency (initial cutoff) live as the melodic/rhythmic control** — sweeping it up and down by hand while everything above stays patched creates a chromatic, drum-like percussion part, playable as a duet against a real drummer.

## Routed to

- [[Filters and Resonance]] — new bullet: the complete self-oscillating-filter percussion technique (resonance-as-oscillator, fast-LFO pitch modulation, clock-fired ADSR, VCA tightness control, live-swept center frequency).
- [[Parallel Processing]] — new bullet: wet/dry blending a wah-processed signal with a straight copy to retain fundamental/pitch clarity.
- [[Bass Design]] — cross-referenced: octave-doubled 2-oscillator bass, dedicated-oscillator-as-LFO vibrato via a manual fader, no keyboard tracking on the filter (repeat confirmation).
- [[Voice Architecture]] — cross-referenced: filter-straight-to-mixer (no VCA) patching, again.

## Source

- [How to Make Edgar Winter's Frankenstein on Synth](https://www.youtube.com/watch?v=Zf8GKMviq9E) — Anthony Marinelli Music, 18:25. Captions, high confidence.
