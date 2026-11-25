---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=Tfq7XkbYk5U
channel: Sage Audio
duration: "00:10:40"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, eq, phase, izotope-rx]
---

# The Cleanest, Most Accurate EQ Possible (and you've never tried it)

![](https://www.youtube.com/watch?v=Tfq7XkbYk5U)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Tfq7XkbYk5U)

## Synopsis

Sage Audio digs into a filter artifact most engineers never see directly: any EQ filter (minimum or linear phase, bell/notch/high-pass) causes real amplitude modulation on a signal whenever that signal's amplitude changes — even when the filter's cutoff is set far from that signal's own frequency, and even a "silent" low frequency can still leak through a high-pass set an octave or more above it. The payoff is a genuinely different approach for the cleanest possible surgical cuts: use iZotope RX's spectral/FFT editor to directly delete or attenuate selected time-frequency regions instead of filtering, which sidesteps the artifact entirely because nothing is being filtered — the unwanted information is just removed.

## Techniques

- **EQ boosts widen dynamic range in a simple, predictable way — worth restating as the baseline before the hidden artifact below.** Boosting a fundamental raises its peak by roughly the applied gain while the noise floor in that same range is amplified by a smaller, Q/shape-dependent amount (since it's not pure signal) — net effect: the affected element's overall dynamic range widens slightly. → [[EQ]]
- **The hidden artifact: a filter causes amplitude-modulation "ringing" on a signal whenever that signal's amplitude changes — and this happens even when the filter's cutoff is set far away from the signal's own frequency, on BOTH minimum-phase and linear-phase filters.** Demoed with a variable-amplitude sine wave through a high-pass filter set well above the sine's frequency, where theory says there should be zero effect: instead, every time the sine's amplitude rises or falls, the filter introduces a modulating spike/dip that takes measurable time to settle — roughly 20 ms at 2 kHz, but **close to half a second at 88 Hz** — low frequencies are far more affected. Moving the cutoff progressively higher doesn't fix it quickly either: to fully silence an 88 Hz signal with a high-pass filter, the cutoff had to be pushed all the way to **~23 kHz** — wildly counterintuitive if the goal was "remove content around 90 Hz." Linear phase reduces (doesn't eliminate) the amplitude artifact but trades it for audible pre-ringing on top of the usual post-ringing; steeper slopes (24 dB/oct → 60 dB/oct) shift the tradeoff but never remove it. Practical implication: **a filter near a signal's own frequency — even well outside its passband/stopband — is not as "surgical" as the dB/octave number implies**, and this applies to bells and notches too, not just high/low-pass. → [[EQ]], [[Phase Alignment]]
- **The cleanest surgical EQ found: use iZotope RX's spectral editor to directly select and reduce/delete a time-frequency region instead of filtering it.** RX isn't built as an EQ, but its frequency-select tool lets you highlight a specific time+frequency region in the spectrogram (zoom the vertical/frequency axis for precision) and apply the Gain module to attenuate or remove just that selection — likely operating on the underlying spectral data directly rather than running it through a filter, so the usual filter-induced phase/amplitude-modulation artifacts don't apply. Worked example on a vocal: cut everything below 80 Hz, reduce a narrow nasal band by 5 dB, boost ~3 kHz by 2–3 dB, add 3 dB of air above 11 kHz — all inside RX rather than a channel EQ. → [[RX Spectral Editor]], [[EQ]]
- **Workflow: set RX as the DAW's external sample editor for a fast, non-destructive round-trip (Logic example, concept transfers).** In Logic: enable advanced plugins → Audio → Audio Editor → select RX as the external editor. Then select a clip, hit **Shift+W** to open it in RX, make changes, **File → Overwrite** the original file, and close — RX replaces the clip's audio in place. To revert, reopen with Shift+W, select the file's Initial State, overwrite, close — fully non-destructive. Caveat: this processing happens **before any of the DAW's own inserts** on that track, so it's best suited to aggressive surgical moves (notches, high/low-pass cuts) done once up front, not ongoing musical EQ decisions that need to interact with the rest of the chain. → [[RX Spectral Editor]]

## Routed to

- [[EQ]] (effect page) — the near-frequency filter amplitude-artifact finding, dynamic-range-widening baseline
- [[Phase Alignment]] (technique) — linear-phase pre-ringing tradeoff added to the near-frequency artifact
- [[RX Spectral Editor]] (plugin) — the direct-selection cleanest-EQ technique + DAW external-editor round-trip workflow

## Source

- [The Cleanest, Most Accurate EQ Possible (and you've never tried it)](https://www.youtube.com/watch?v=Tfq7XkbYk5U) — Sage Audio, 10:40
- Transcript source: captions, high confidence
- Full transcript: [[The Cleanest, Most Accurate EQ Possible (and you've never tried it) (transcript)]]
