---
briefed: 2026-W34
type: yt-note
date: 2026-08-20
source: youtube
url: https://www.youtube.com/watch?v=MXz2hPL36PQ
channel: Sage Audio
duration: "00:14:30"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, delay, reverb, compression, saturation, dynamic-eq, tempo-sync]
---

# How to Time Every Audio Effect to the BPM

![](https://www.youtube.com/watch?v=MXz2hPL36PQ)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=MXz2hPL36PQ)

## Synopsis
A Sage Audio breakdown of how to lock every processor's time-based behavior to a session's tempo, going effect by effect from simplest to hardest: delay (a pure formula), reverb (formula plus by-ear correction), compression/dynamic EQ (no reliable formula — attack/release interact in ways that defeat the math, so ears are the only real tool), and modulated saturation/dynamic EQ (a plugin's envelope follower/generator can hit BPM-accurate timing with much more precision than a compressor ever can). The throughline: the naive `60,000 / BPM` formula gets you the math-correct answer, but only delay actually behaves the way the formula predicts — everything downstream of it needs increasing amounts of by-ear correction because the processor's own behavior (reflection density, attack/release interaction, waveshaping) distorts the relationship between a parameter's numeric value and how "in time" it actually sounds.

## Techniques
- **The core BPM-to-milliseconds formula, with every subdivision derived from it.** `60,000 / BPM` = one quarter note in ms (60,000 = ms in a minute). At 120 BPM: 500 ms = quarter note. Halve repeatedly for smaller divisions (250 ms = eighth, 125 ms = sixteenth); double for larger (1000 ms = half, 2000 ms = whole). **Dotted note** (50% longer) = value × 1.5 (dotted quarter at 120 BPM = 500 × 1.5 = 750 ms). **Triplet** (2/3 of the original duration) = value ÷ 1.5 (quarter-note triplet at 120 BPM = 500 ÷ 1.5 = 333 ms). This is the formula to reach for on any processor that doesn't offer note-value sync natively. → [[Delay]]
- **Delay timing is the one place the formula alone is enough** — set the ms value directly from the table above; most delays sync to tempo and offer note values natively, but the formula matters for anything that only takes raw milliseconds. → [[Delay]]
- **Reverb pre-delay follows the same formula directly; decay time needs by-ear correction on top of it.** Pre-delay is straightforward (same ms-per-note-value math as delay). Decay time is not — it's contingent on the specific reverb algorithm's early-vs-late reflection density, so a "2-second whole note" computed from the formula will often read shorter than 2 seconds in context if the algorithm front-loads reflections and thins out toward the tail (early reflections mask over each other in a full mix, so the tail reads faster than a solo listen suggests). Two corrective moves once the formula gets you close: (1) rebalance early-vs-late reflections while listening in the context of the full mix, or (2) nudge the decay time **±10–20 ms** until it locks with the track. A supporting move: EQ the reflections with a small bump around **~3 kHz** to fight masking from competing mix elements, and consider moving the reflections to the less-busy side of the stereo image. → [[LEAD Slot]] (2.5–6 kHz), [[Reverb]], [[Masking and Carving]]
- **Compression cannot be timed by formula — the attack parameter is not "time before compression starts," it's "time to maximum attenuation," and release changes that relationship substantially.** Demonstrated on a sine wave slammed from low to high amplitude: attenuation begins the instant the signal crosses threshold, not after the attack time elapses. With a 20 ms attack / 200 ms release, the *majority* of gain reduction happens in the first ~20 ms, but the true *maximum* attenuation isn't reached until roughly 100 ms in — the release setting is what's stretching that out. Drop the release to 10 ms (its fastest setting on the demoed compressor) and both the total amount of attenuation AND the time to reach peak attenuation shrink — max attenuation now lands closer to the nominal 10 ms attack figure the number implied in the first place. Different compressor algorithms shift this further: a "classic" mode (FabFilter [[Pro-C 2]]-style) speeds up attenuation noticeably; look-ahead essentially removes the delay, giving near-immediate attenuation. Practical read: **there is no reliable formula for timing compression** — tune by ear, watching the gain-reduction meter, aiming for the signal to return to unity right before the next transient hits (harder on sporadic-transient sources like vocals). The same advice applies to dynamic EQ. → [[Pro-C 2]], [[Compression]], [[Compression Staging]]
- **Modulated saturation (FabFilter [[Saturn 2]]'s envelope follower / envelope generator) can hit BPM-accurate attenuation timing far more precisely than a compressor, because a saturator clips the waveform rather than gain-riding it, which removes most of the variables that make compression unpredictable.** Three modes demoed, envelope follower linked to the Drive dial: **(1) Envelope mode** — attack time maps closely to the target subdivision (1 ms attack / 50 ms release tested; setting attack to **125 ms** for a 16th note at 120 BPM, or **31.25 ms** for a 64th note, tracked the target closely — not perfect, but far more accurate/repeatable than compression). **(2) Transient mode** — release plays the bigger role; at the shortest release settings accuracy on the attack figure degrades slightly (a 31.25 ms target attack read closer to 23 ms), but once release is **≥100 ms** the attack time matches the plugin's stated value exactly; release time also maps directly to return-to-unity time (a 50 ms release ≈ a 50 ms return to unity). **(3) Envelope generator** — the most accurate option: set attack to the target subdivision (e.g. 31.25 ms for a 64th note) and additionally control the *slope* of attack/decay/release independently — a negative attack slope concentrates the majority of attenuation right at the target time value, giving precise control over dynamics regardless of the incoming frequency. Best results on Saturn 2's **clean tape** algorithm specifically, though other algorithms still track the envelope reasonably well. → [[Saturn 2]], [[Saturation and Distortion]]
- **Dynamic EQ can achieve the same BPM-accurate, envelope-driven attenuation as modulated saturation — named plugin (transcript-garbled, likely "Shade EQ" by UVI) not owned.** Same mechanism as Saturn 2's envelope generator: create an envelope, attach it to a filter band's gain, set a positive depth to expand or a negative depth to compress. Decay controls the length of the transient; the curve value controls when peak attenuation/amplification lands; delay, attack, and hold control when the effect fires and for how long. Because the envelope tracking is accurate, the same basic BPM formula can drive genuinely tempo-locked dynamic EQ moves — though it may take tuning to avoid sounding unnatural. No owned equivalent found for this specific envelope-to-filter-gain workflow; logged to the wishlist. → [[Plugin Wishlist]], [[EQ]]
- **General principle: the more a processor's behavior deviates from a pure gain-multiply (waveshaping, reflection density, complex attack/release interaction), the less trustworthy the raw BPM formula becomes, and the more by-ear tuning is required** — delay (formula is enough) → reverb (formula + small ear correction) → compression/dynamic EQ (formula unreliable, ears only) → modulated saturation/dynamic EQ with an envelope follower (formula usable again, because clipping/envelope-following sidesteps the attack/release interaction problem that breaks compression timing). → [[Compression]], [[Reverb]], [[Delay]]

## Routed to
- [[Delay]] — core BPM formula, delay timing
- [[Reverb]] — pre-delay formula + decay-time by-ear correction, 3 kHz masking EQ tip
- [[Compression]] — why compression resists formula timing, attack-vs-max-attenuation distinction
- [[Compression Staging]] — release-to-next-transient alignment by ear
- [[Saturation and Distortion]] — modulated saturation BPM-timing technique
- [[Saturn 2]] — envelope follower/generator settings for BPM-accurate attenuation
- [[Pro-C 2]] — "classic" mode's faster attenuation curve
- [[EQ]] — dynamic EQ timing, same-advice-as-compression note
- [[Masking and Carving]] — reverb reflection masking in a full mix
- [[Plugin Wishlist]] — unowned dynamic EQ with envelope-to-gain routing

## Source
[How to Time Every Audio Effect to the BPM](https://www.youtube.com/watch?v=MXz2hPL36PQ) · Sage Audio · 00:14:30 · captions (clean, spoken breakdown, high confidence) · transcript: [[How to Time Every Audio Effect to the BPM (transcript)]]
