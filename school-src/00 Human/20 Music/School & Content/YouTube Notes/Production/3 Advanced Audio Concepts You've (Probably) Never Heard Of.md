---
briefed: 2026-W34
type: yt-note
date: 2026-08-21
source: youtube
url: https://www.youtube.com/watch?v=cjwBvTtE5-I
channel: Sage Audio
duration: "00:09:40"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, masking, saturation, theory]
---

# 3 Advanced Audio Concepts You've (Probably) Never Heard Of

![](https://www.youtube.com/watch?v=cjwBvTtE5-I)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=cjwBvTtE5-I)

## Synopsis

Sage Audio's grab-bag of three genuinely obscure but usable concepts: bit shifting as a 6 dB-increment alternative to normal gain/pan changes (Air Windows plugins, free, unowned); temporal (time-based) masking, the sibling of the more familiar simultaneous masking — a loud transient masks quieter content both BEFORE it (pre-masking, ~20 ms) and AFTER it (post-masking, up to ~100 ms), which the video ties directly to why a snare's ring is one of the hardest things to mix (it's a quiet sound arriving right in the post-masking window of its own loud transient); and natural, non-electronic distortion — a rocket launch's air-pressure waveform genuinely deforms into triangle/square shapes with no electronics involved, and the human ear's own auditory reflex (middle-ear muscles contracting on loud transients) behaves like a built-in compressor that generates real harmonic distortion. The masking segment is the most directly actionable: the fix for a masked quiet element (like snare ring) is upward processing/maximization — raising the quiet content's own amplitude relative to the peak, rather than trying to carve the masker.

## Techniques

- **Bit shifting: a 6 dB-increment alternative to normal gain/pan changes, with zero rounding-error risk.** Normal gain/pan changes extend a signal's WORD LENGTH to represent fine, non-6-dB-aligned amplitude changes (e.g. −1.7 dB) — on 16-bit material this can cause a rounding/quantization error (32/64-bit DAW processing makes this mostly inaudible in practice, but the mechanism is real). Bit shifting instead moves the entire bit series left (×2 gain, +6 dB) or right (÷2 gain, −6 dB) — word length never changes, so there's no rounding error, but every change is locked to 6 dB steps. Same mechanic works for panning (shift instead of attenuating the opposite channel). **Air Windows plugins (free, unowned) use this method** — worth trying specifically when a "closer to the original recorded signal" character matters more than fine gain resolution. → [[Plugin Wishlist]]
- **Temporal (time-based) masking — the sibling of simultaneous masking, and the mechanism behind why snare ring is so hard to mix.** Simultaneous masking = two things loud at the SAME time, one buries the other (e.g. ~250 Hz masking a vocal's 3–5 kHz consonants while both play together). Temporal masking = masking across DIFFERENT times, centered on a loud transient: **pre-masking** extends roughly **20 ms before** the loud sound, **post-masking** extends up to **~100 ms after** it, with the masking effect falling off exponentially the further a quiet sound sits from the transient. The snare's ring sits right in that post-masking window of its OWN transient (loud hit → quiet ring within ~100 ms) while ALSO competing with everything else playing simultaneously — a double masking problem, which is why it's disproportionately hard to make audible without over-processing. → [[Masking and Carving]], [[Snare Design]]
- **The fix for temporal masking: upward processing/maximization on the masked (quiet) content, not carving the masker.** Bringing up a signal's own quiet details relative to its peak (the [[Oxford Inflator]] mechanism — subtle wave shaping of lower-amplitude content) increases the amplitude of that masked material relative to the transient that's burying it, reducing BOTH temporal and simultaneous masking at once. On a snare specifically: run upward processing on the snare channel/bus itself so the ring reads through its own transient's masking window, rather than trying to duck or EQ the surrounding mix. → [[Oxford Inflator]], [[Masking and Carving]], [[Snare Design]], [[TRANSIENT Slot]]
- **Distortion occurs in nature — a rocket launch genuinely deforms a sound's waveform from sine toward triangle/square shapes, purely from air pressure, no electronics involved.** At extreme sound pressure levels, air molecules stop compressing/expanding gradually (the normal sine-wave behavior) and start behaving more like the abrupt transitions of triangle/square waves — audible on an oscilloscope reading a rocket launch, and NOT a result of mic/preamp clipping. Practical takeaway for mixing: monitor at reasonable levels — while nobody mixes at rocket-launch SPL, the same air-pressure reshaping happens (much more subtly) at loud monitoring volumes, and can give a misleadingly "bigger" or distorted read on a mix that isn't actually there in the file. → [[Referencing and Translation]], [[Saturation and Distortion]]
- **The ear's own auditory reflex is a real, physical compressor that generates genuine harmonic distortion — not a metaphor.** Loud, usually rapid sounds trigger the middle ear's ossicles to contract, reducing sound pressure reaching the auditory nerve — mechanically similar to optical compression, with parameters that vary by SPL. Onset takes roughly **20–100 ms** to reach maximum attenuation; after a couple of seconds attenuation settles to roughly **50%** of the original level before gradually releasing back to normal (reported figures vary). Because this reflex mildly reshapes the waveform, it generates real harmonic distortion — the same mechanism (wave shaping → harmonics) as any electronic compressor or saturator, just happening inside the listener's own ear. → [[Saturation and Distortion]]

## Routed to

- [[Masking and Carving]] — new bullet on temporal (pre/post) masking mechanism + timing figures + the upward-processing fix, distinct from the page's existing simultaneous-masking material
- [[Oxford Inflator]] (plugin) — new technique bullet: using Inflator/upward processing specifically to fight temporal masking on a snare's ring
- [[Snare Design]] — cross-linked from the masking entry (snare ring as the video's worked example)
- [[Saturation and Distortion]] (effect page) — brief bullet on natural (non-electronic) distortion sources: rocket-launch air-pressure deformation and the ear's own auditory-reflex compression
- [[Referencing and Translation]] — cross-linked from the natural-distortion bullet (reasonable monitoring level as a translation discipline)
- [[Plugin Wishlist]] — Air Windows bit-shifting plugins added under "From videos (to vet)" (free, real technique: 6 dB-increment gain/pan with no rounding error)

No chain integration — none of the three concepts map onto a specific device chain; bit shifting and the natural-distortion segment are theory/awareness rather than a settings recipe, and the temporal-masking fix routes through the existing Oxford Inflator/Masking and Carving lane instead of a new note.

## Source

- [3 Advanced Audio Concepts You've (Probably) Never Heard Of](https://www.youtube.com/watch?v=cjwBvTtE5-I) — Sage Audio, 9:40
- Transcript source: captions (pinned yt-dlp), high confidence — spoken theory narration throughout; a few short music-demo passages (rough mix A/Bs) were not part of the narration and are skipped rather than transcribed as song audio.
- Full transcript: [[3 Advanced Audio Concepts You've (Probably) Never Heard Of (transcript)]]
