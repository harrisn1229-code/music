---
briefed: 2026-W34
type: yt-note
date: 2026-08-20
source: youtube
url: https://www.youtube.com/watch?v=Aha_7purQQo
channel: Sage Audio
duration: "00:14:05"
video_type: theory
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, theory, eq, masking, psychoacoustics]
---

# Psychoacoustics Pt.2 - the Logarithmic Ear

![](https://www.youtube.com/watch?v=Aha_7purQQo)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Aha_7purQQo)

## Synopsis
Part two of Sage Audio's psychoacoustics series, focused on the ear's physical structure and why it processes pitch logarithmically rather than linearly. Covers the cochlea's spiral structure and hair-cell encoding limits (why we're much better at distinguishing pitch in the lows than the highs), critical bands/Barks and their direct implication for masking and EQ filter design, and the Fletcher-Munson-adjacent 2–5 kHz sensitivity range tied to vocal formants and ear-canal resonance. The throughline: an EQ's constant-Q behavior (same Q, wildly different Hz bandwidth depending on center frequency) isn't a limitation to work around — it directly mirrors how the ear itself processes pitch, so understanding *why* the ear is logarithmic explains *why* EQ, masking, and mix clarity behave the way they do.

## Techniques
- **The cochlea encodes pitch logarithmically, not linearly, because each hair cell can only vibrate up to ~500 times/second.** ~10,000 hair cells (cilia) line the basilar membrane inside the cochlea's spiral. Each cell can encode up to about 500 Hz on its own; above 500 Hz, multiple hair cells work in sequence to encode the info. The membrane is loose near the cochlea's center (encoding low frequencies) and gradually stiffens moving outward (encoding higher frequencies). Net result: **we're much better at discriminating pitch below 500 Hz, and still reasonably good up to ~4 kHz — above 4 kHz, pitch discrimination gets noticeably worse.** Concrete illustration: the gap between A2 and A3 is 110 Hz, but the gap between A6 and A7 is ~1,760 Hz — perceived "one semitone" spans a vastly larger Hz range as frequency rises. → [[EQ]]
- **This is why EQ is logarithmic — a filter's Q stays constant but its Hz bandwidth balloons at high frequencies, and that's not a flaw, it matches reduced high-frequency pitch sensitivity.** A one-octave-Q filter might cover 100–200 Hz total in the lows but 1,000+ Hz in the highs. A narrow/high-Q filter targeting a resonance in the lows attenuates a tight band; the identical Q at a high frequency attenuates a much wider absolute range — but because ears are less pitch-sensitive up there, the wider real-world bandwidth isn't perceived as inaccurate. **Practical read: don't second-guess a high-frequency EQ move for "covering too wide a range" — the ear's own resolution is just as wide there.** → [[EQ]]
- **Critical bands (Barks): the cochlea only resolves ~24 discrete frequency bands total (vs. thousands on an EQ/FFT display) — two tones inside the same critical band mask or modulate against each other and are hard to tell apart.** Worked example: Bark band 4 is centered at 350 Hz with a 300–400 Hz bandwidth (100 Hz wide) — a 310 Hz tone and a 330 Hz tone would be very hard to distinguish, and playing two close tones inside one band together produces audible beating/pulsing (amplitude modulation) rather than two clean pitches. Critical bandwidth widens with frequency the same way pitch discrimination does — a 20 Hz difference is hard to notice in the lows; a 200–300 Hz difference is hard to notice in the highs. **Direct mix implication: keep the kick's and bass's fundamentals (and their harmonics) separated by at least an octave** — if their fundamentals land inside the same critical band, they mask and unwantedly modulate each other; the same logic applies to any two instruments with close fundamentals (e.g. vocal vs. guitar/synth). → [[Masking and Carving]], [[SUB Slot]], [[BASS Slot]]
- **Reduce masking by centering an EQ boost's frequency on the critical band's own center frequency, using a moderately narrow (~1/3-octave) filter rather than a wide one.** Worked example: boosting the note A5 (880 Hz) — the nearest critical band is centered at 840 Hz with a 150 Hz bandwidth. A ~1/3-octave filter centered on 880 Hz stays mostly inside that critical band, so the boost amplifies A5 more than the surrounding content that could mask it; a wider filter would amplify the masking frequencies by the same amount as the target note, defeating the point. **Don't go narrower than ~1/3 octave to "fix" this** — an ultra-narrow filter needs steep phase rotation to build, which itself amplifies content right around the center frequency and can introduce a beating effect (linear-phase processing avoids this specific side effect). Framed as an occasional tool for complex productions/heavy masking, not a default EQ approach — "your ears" get you most of the way most of the time. → [[EQ]], [[Masking and Carving]]
- **The 2–5 kHz sensitivity zone (Fletcher-Munson-adjacent) lines up with the ear canal's own resonance (~3.5 kHz, from canal diameter) and the third vocal formant — critical bands 14–19 are the zone to emphasize for perceived clarity.** This is the range we're most sensitive to and where the third vocal formant (vowel/consonant info) lives, making it the go-to zone for speech/vocal intelligibility. Since 3.5 kHz sits right at the edge of accurate pitch discrimination (per the hair-cell limit above), boosting in-key content there gives the listener extra help identifying pitch, which reads as the mix/vocal sounding "more musical." **Practical move: find a couple of in-key notes/harmonics that fall in this range and boost a band centered on them** rather than boosting the range generically — targets clarity/musicality at once, and reduces masking by concentrating the boost on in-key content specifically. → [[LEAD Slot]] (2.5–6 kHz), [[EQ]], [[Vocal Mic Technique]]

## Routed to
- [[EQ]] — logarithmic Q/bandwidth explanation, critical-band-targeted boosting technique
- [[Masking and Carving]] — critical bands, kick/bass octave-separation rule, critical-band-centered boosting for masking control

## Source
[Psychoacoustics Pt.2 - the Logarithmic Ear](https://www.youtube.com/watch?v=Aha_7purQQo) · Sage Audio · 00:14:05 · captions (clean, spoken breakdown, high confidence) · transcript: [[Psychoacoustics Pt.2 - the Logarithmic Ear (transcript)]]
