---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=dq-vQAGsd8w
channel: Sage Audio
duration: "00:09:44"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vocal, eq, compression, saturation, reverb, doubling, reamping]
---

# Vocal Masterclass

![](https://www.youtube.com/watch?v=dq-vQAGsd8w)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=dq-vQAGsd8w)

## Synopsis

A second, differently-organized Sage Audio vocal deep-dive (companion to [[Clean Vocal Chain]]) — a labeled frequency map of the voice, a 3-compressor stacking strategy (peak-down, RMS-down, upward), why saturation tracks a vocal's changing fundamental in a way static EQ can't, using Soothe2's dynamic resonance suppression, isolating breaths/sibilance to their own processed track, layering three distinct reverb types for three different jobs, doubling/modulation for thickness, and reamping/impulse-response processing for timbral complexity.

## Techniques

- **A labeled vocal frequency map: 100-300 Hz fundamental, ~500 Hz vowel pronunciation, 700 Hz-1 kHz nasal resonance, 1-4 kHz perceived clarity, 4-11 kHz sibilance, air shelf above that.** Actionable moves per zone: high-pass up to 100 Hz + small boost at the vocal's actual fundamental (within 100-300 Hz); gentle boost around 500 Hz for intelligibility (or cut it to push the vocal further back in the mix — a deliberate front/back placement lever); find and dip the specific nasal frequency between 700 Hz-1 kHz until it's gone; boost somewhere in 1-4 kHz (2 kHz is a good starting search point, ~1-octave bandwidth) for clarity; handle 4-11 kHz sibilance with EQ, dynamic EQ, or a de-esser — a mix of dynamic EQ + de-essing is the stated preference; a high shelf above the sibilance range for "air," described as more felt than explained. → [[EQ]], [[De-essing]]
- **Stack three compressors on a vocal, each doing a DIFFERENT job in this order: peak-down, RMS-down, upward.** Peak-down attenuates the loudest individual transients. RMS-down measures overall loudness (not just instantaneous peaks) and compresses from the loudest points down — a smoother, more program-aware form of downward control. Upward compression measures from the noise floor up and amplifies quiet content, adding detail. Only a few dB of attenuation from the two downward stages combined, but MORE aggressive low-level (upward) compression, since upward compression is less audibly obvious than downward. Quick attack on both downward compressors, ~50 ms release (retains detail without the release-side transient distortion covered elsewhere in this channel's compression videos). → [[Compression]], [[Compression Staging]]
- **Saturation tracks a vocal's changing fundamental in a way a fixed EQ boost can't — the actual reason to reach for saturation over EQ for harmonic-based tone shaping on a vocal.** An EQ boost at "the fundamental" only helps for notes actually at that frequency; a sung vocal's fundamental moves note to note. Saturation's harmonic generation is relative to whatever the current input's fundamental actually is, so it "follows" pitch changes automatically. Layering multiple saturation types (plus optionally an exciter) builds a more complex harmonic array than one saturator alone. Also notes the same psychoacoustic effect covered elsewhere in this channel (a strong-enough harmonic stack can cause the fundamental itself to be perceived even if attenuated/removed). → [[Saturation and Distortion]], [[Pitch and Formant]]
- **Soothe2 settings for maximum accuracy on a moving-fundamental vocal signal: Soft mode, low Depth, higher Rendering/Oversampling.** Because a vocal's resonant frequencies move with the notes being sung (not fixed like an instrument), static resonance suppression is a poor fit — Soothe2's dynamic approach is suited to this, but the source stresses it's not mandatory, just a way to catch subtle issues that come up specifically because of a moving fundamental. Higher Rendering/Oversampling settings specifically target phase-issue avoidance at the cost of more CPU. → [[Soothe2]]
- **Isolate breaths and sibilance onto their own separate track for independent, gentler processing — rather than fighting them within the main vocal chain's settings.** Find and extract breath/sibilant moments to a new track, lower that track's level, and apply whatever processing is needed there (compression, EQ) without those settings compromising the main vocal's chain. A creative extension: add reverb to just the isolated breath/sibilance track (with gain compensation) to soften harsh sibilants via the reverb's own smoothing character. → [[Vocal Mic Technique]], [[De-essing]]
- **Layer three DIFFERENT reverb types on one vocal, each with a distinct job — not one reverb doing everything.** (1) A very short room/ambient reverb to thicken the vocal without obvious space. (2) A medium-length reverb with dense reflections and a mid-range emphasis, specifically to help the vocal blend into the rest of the mix. (3) A long, stylistic reverb to give the vocal its own character/identity, deliberately separated from the surrounding instrumentation. Three sends, three distinct purposes (thickness / blend / identity) rather than picking one "vocal reverb" preset. → [[Reverb]]
- **Doubling and modulation, distinguished as related but separate tools for thickness.** Doubling = a very quick delay creating two distinct voices still perceived as one source. Modulation (chorus-style pitch/timing wobble) adds variation on top of a doubled signal. Can be combined — doubling for the base thickness effect, modulation layered on top for extra variation — or used independently. → [[Artificial Double Tracking (ADT)]]
- **Reamping (or an impulse-response plugin standing in for it) placed at the START of the vocal chain, so it colors everything processed after it.** Physical reamping = play the vocal back through real hardware (a speaker) and re-record it, for real acoustic/electrical coloration; an IR-loading plugin recreates that character without the physical round-trip. Positioning it first in the chain means every later stage (EQ, compression, saturation, reverb) works on the reamped signal, not the dry original — deliberately baking the character in early rather than treating it as a final-stage effect. *(Single mention — not enough yet for a dedicated technique note; logged here as the only home for now.)*

## Routed to

- [[1 Main Vocal Track]] (chain) — 3-compressor stacking strategy and 3-reverb-type layering added inline/to `## From videos`, complementing the existing [[Clean Vocal Chain]] entry
- [[EQ]] (effect page) — labeled vocal frequency map
- [[Compression]] (effect page) — peak-down/RMS-down/upward 3-stage stacking
- [[Saturation and Distortion]] (effect page) — fundamental-tracking rationale for saturation over static EQ
- [[Soothe2]] (plugin) — Soft/low-Depth/high-Rendering setting recommendation for vocals
- [[Reverb]] (effect page) — 3-type layered reverb strategy
- [[Artificial Double Tracking (ADT)]] (technique) — doubling vs. modulation distinction

## Source

- [Vocal Masterclass](https://www.youtube.com/watch?v=dq-vQAGsd8w) — Sage Audio, 9:44
- Transcript source: captions, high confidence
- Full transcript: [[Vocal Masterclass (transcript)]]
