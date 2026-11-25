---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=9G1ME30K2ro
channel: Sage Audio
duration: "00:08:39"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken narration throughout, no music-heavy passages; only the two standard subscriber/membership ad-reads are boilerplate rather than technical content
tags: [yt-note, music, production, reverb, mixing]
briefed: backlog
---

# Reverb Masterclass

![](https://www.youtube.com/watch?v=9G1ME30K2ro)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=9G1ME30K2ro)

## Synopsis

A fast (8:39), definitional tour of reverb from Sage Audio — the same analog mastering studio behind [[Delay Masterclass]], [[Mid Side Masterclass]], [[Limiter Masterclass]], [[Audio Mastering Science: Using Research to Make Informed Decisions]], [[Reverb on a Master: Everything You Need to Know]], and [[All Processing is Connected - Crucial Knowledge for Pro Mixes & Masters]]. Same house format as [[Delay Masterclass]]: short chapters, each stating one clear mechanical principle, no specific plugin dwelt on (FabFilter Pro-R gets one passing mention as an example of a reverb with built-in EQ). Nine chapters here: algorithmic vs. convolution reverb, how to build your own convolution reverb from a recorded impulse, timing reverb to tempo, EQ'ing a reverb return, blending an instrument in with reverb via mid-frequency isolation, a glossary of reverb parameters (Room/Time-RT60/Decay/Size/Diffusion/Pre-delay), reverb-with-clarity settings, and automating reverb. The most concretely useful, numbered takeaways: the `60,000 ÷ BPM` formula (shared mechanism with [[Delay Masterclass]]'s delay-timing chapter) applied to reverb decay/RT60 instead of delay time; the 10–50 ms pre-delay + 1.5–3.5 kHz attenuation combo for keeping a reverbed vocal intelligible; and the two automation moves (pre-delay up for verse intelligibility, RT60 to max then snapped back down for a creative swell).

## Techniques

- **Algorithmic reverb is built from delay taps + EQ filters, whatever the room label** — spring, plate, chamber, and room reverb are almost always algorithmic under the hood: multiple delay taps at various levels, shaped with EQ filters, synthesizing the reflections of a room or reverb device rather than sampling a real one. → [[Reverb]]
- **Convolution reverb uses a recorded impulse response (IR)** — a transient recorded in a physical space, which encodes the room's size, frequency response (nodes/anti-nodes), and attack/decay times; versatile because any real space's IR can be loaded to create a realistic reverb. → [[Reverb]], [[Hybrid Reverb]]
- **How to build your own convolution reverb** — record a clap or other sharp transient in the room you want to emulate (a phone/portable recorder is enough), edit the recording down to just the transient and its tail, export as a WAV file, then load that file into a convolution reverb plugin as the impulse response — the room is now a permanent, reusable reverb setting. → [[Hybrid Reverb]], [[Ambient Texture and Field Recording]]
- **Time reverb (or any time-based effect) to tempo with `60,000 ÷ BPM`** — dividing 60,000 by the session's BPM gives one quarter note in milliseconds; multiply or divide that number for other note values (e.g. ×4 for a whole note) to set decay/RT60 in time with the track instead of guessing by ear. Same formula [[Delay Masterclass]] uses for delay time, applied here to reverb's decay length. → [[Reverb]]
- **EQ the reverb return to make it stand out (boost highs, dip lows) vs. band-limit it to make it blend in** — send the reverb to an aux/return, insert an EQ after it, and boost the highs while dipping the lows for a bright, noticeable reverb sound (the opposite move — HPF/LPF band-limiting — is for a reverb meant to sit invisibly). Some plugins (FabFilter Pro-R named specifically) build an EQ into the reverb itself rather than needing a separate insert. → [[Reverb]], [[Pro-R 2]]
- **Blend an instrument in with reverb by isolating the reverb to the mid frequencies** — band-limit the reverb return to the mids so it doesn't read bright or boomy, and it lands in an already-dense part of the mix rather than a distinct new layer — this is what makes it "blend in" instead of drawing attention. Combine with tempo-timing (above) for the best result. → [[Reverb]], [[Masking and Carving]], [[Depth and Space]]
- **Reverb parameter glossary** — **Room**: the emulated space, alters the character of reflections. **Time (RT60)**: how long the reverberated signal takes to decrease by 60 dB. **Decay rate**: shapes the tail, but can also affect RT60. **Size**: alters the reverb's attack and release, and the density of its diffusion. **Diffusion**: determines whether the original signal or the early reflections generate the reverb tail. **Pre-delay**: the time in milliseconds before the reverb starts affecting the signal. Not every reverb plugin exposes all of these separately — some combine or omit functions. → [[Reverb]], [[Reverb]] (Ableton), [[Pro-R 2]]
- **Reverb with clarity: 10–50 ms pre-delay + attenuate 1.5–3.5 kHz** — a 10–50 ms pre-delay lets the source transient pass through unaffected before the reverb arrives; separately, attenuating the reverberated signal around 1.5–3.5 kHz keeps that intelligibility band drier. Combined, these keep a reverb-heavy signal (demoed on vocal) from getting buried or hard to hear. → [[Reverb]], [[Pro-R 2]], [[Reverb Send Room]], [[Reverb Send Long]]
- **Automating reverb: pre-delay up for verse intelligibility, RT60 to max then snapped back down for a creative swell** — automation can touch just about any parameter on a reverb plugin; two named uses — increase pre-delay during a verse to keep the vocal more intelligible, or push RT60/decay to its maximum value then quickly drop it back down for a creative swell effect. → [[Automation]], [[Reverb]] (Ableton)

## Routed to

- [[Reverb]] (effect) — 5 new `## From videos` bullets: algorithmic-vs-convolution + build-your-own-IR, tempo-timing formula, EQ'ing to stand out vs. blend in, mid-frequency blend-in move, parameter glossary, clarity combo (pre-delay + 1.5–3.5 kHz notch)
- [[Pro-R 2]] — new `## Techniques` section added (was missing): built-in-EQ note + the clarity pre-delay/notch combo mapped onto its Predelay and Decay Rate EQ controls
- [[Hybrid Reverb]] — 1 new `## Techniques` bullet: the foundational record-a-clap-as-IR recipe, cross-linked to its existing more advanced convolution entries
- [[Reverb]] (Ableton plugin) — 1 new `## Techniques` bullet: the two automation moves (pre-delay for intelligibility, RT60 max-then-drop for a swell)
- [[Reverb Send Room]] (chain) — inline 🎬 line on the Pro-Q 4 stage (clarity notch) + `## From videos` bullet
- [[Reverb Send Long]] (chain) — inline 🎬 line on the Pro-Q 4 stage (clarity notch + pre-delay range) + `## From videos` bullet
- [[Depth and Space]] (technique) — 1 new `## From videos` bullet: mid-frequency isolation as a blend-in move
- [[Automation]] (technique) — 1 new `## From videos` bullet: reverb pre-delay/RT60 automation moves

## Source

- [Reverb Masterclass](https://www.youtube.com/watch?v=9G1ME30K2ro) — Sage Audio, 8:39
- Transcript source: captions (pinned yt-dlp), high confidence — clean spoken narration throughout
- Full transcript: [[Reverb Masterclass (transcript)]]
