---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=P2_uC93HshU
channel: Sage Audio
duration: "00:12:12"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, compression, fet, vca, optical, tube, digital, distortion]
---

# Compression Masterclass

![](https://www.youtube.com/watch?v=P2_uC93HshU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=P2_uC93HshU)

## Synopsis

A compressor-type taxonomy from Sage Audio (FET, tube, VCA, optical, digital, upward), explaining each type's real-world detection/timing behavior and the general attack/release-vs-oscillation-period distortion rule already established elsewhere in this channel's catalog — plus a specific warning about poorly-designed compressor plugins introducing aliasing distortion via missing oversampling.

## Techniques

- **Compressors can subtly reshape frequency response even with zero gain reduction, and this is plugin-design-dependent, not a universal trait of "analog-style" compression.** Some FET/tube emulations subtly attenuate highs (or lows+highs) even when not actively compressing; FabFilter Pro-C 2's optical and "bus" (VCA-style) emulations, by contrast, only change the compression BEHAVIOR, not tone, at zero gain reduction — worth A/B'ing a specific plugin's "off" state before assuming character = tone shift. → [[Compression]]
- **FET (1176-style): fixed ratio steps (4:1/8:1/12:1/20:1 + a program-dependent "All" ~12:1-20:1), attack 20-800 μs, release 50 ms-1.1 s — fast enough that it's ALMOST ALWAYS distorting/emphasizing transients, which is the point.** Because its fastest attack (20 μs) is far shorter than even a very high audio frequency's oscillation period, FET compression inherently colors transients rather than staying transparent — good for drum overheads, parallel compression, and anything wanting an aggressive, transient-forward character rather than invisibility. Sidechain options let lows or highs specifically trigger compression. → [[UAD UA 1176LN]], [[Compression]]
- **Tube (STA/Fairchild-style): nonlinear ~3:1 ratio that shifts with input level, 2-8 second release even at its fastest "mode" setting — functionally the opposite character from FET, favoring smoothness over punch.** Attack stays too slow to catch transients at its slowest mode setting, deliberately preserving transient detail while still smoothing everything else — reduces detail/punch rather than emphasizing it, the inverse tradeoff from a 1176-style unit. → [[Compression]]
- **VCA: RMS (average-loudness) detection instead of peak, which is described as closer to how the human ear perceives/compresses sound than peak detection.** Not universal to all VCA units — some still use peak detection — but the RMS-detecting ones (dbx 165-style demoed) combine a soft knee with attack/release ranges wide enough to sound either smooth or punchy depending on setting. → [[Compression]]
- **Optical (LA-2A-style): fixed 10 ms attack, but a genuinely unique two-part PROGRAM-DEPENDENT release driven by the photocell's behavior.** The first half of any given gain reduction releases after a fixed 60 ms; the second half releases anywhere from 1-15 seconds later, with the exact timing depending on the detected signal's own frequency and amplitude. This split-release character is why optical compression reads as retaining transient detail (fast first-half release) while still sounding fuller/glued (slow long-tail second-half release) — named as especially suited to vocals and bass for that combination. → [[UAD Teletronix LA-2A]], [[Compression]]
- **Digital compressors are best understood as a combinable toolkit of all the above behaviors, not a distinct "type" of their own** — mix and match detection method, attack/release ranges, and harmonic-distortion amount; look-ahead (processes the signal ahead of time for more transparent compression) and flexible sidechain routing are the features that don't really exist on the classic hardware types being emulated. → [[Compression]], [[Pro-C 2]]
- **Upward/low-level compression trades "no peak/transient reduction, no harmonic generation from gain reduction" for "raises the noise floor along with quiet detail" — a clean tradeoff worth naming explicitly.** Compresses from the noise floor up rather than the peaks down, so it adds perceived detail without touching transients or generating the harmonic distortion that downward gain reduction causes — but since it's amplifying quiet content indiscriminately, it also raises whatever noise is sitting in that range. → [[Compression]]
- **The attack/release-vs-oscillation-period distortion rule, restated with the exact math: 1000 ms ÷ frequency in Hz = the oscillation period in ms; an attack/release shorter than that period will distort that frequency.** Worked example: a 50 Hz wave completes one oscillation every 1000/50 = 20 ms, so any attack/release under 20 ms will distort content at 50 Hz and above — which is why the 1176's 20-800 μs attack range almost always introduces some distortion by design. Same mechanism already logged from this channel's other compression videos, restated here with the explicit formula. → [[Compression]]
- **A concrete failure mode to check for: a poorly-designed compressor plugin without oversampling generates aliasing distortion at high frequencies, reflecting disharmonious harmonics back down into the audible spectrum.** Demoed on Logic's stock compressor emulations — most modes show aggressive, harsh high-order harmonics (Platinum Digital being a partial exception), and Studio VCA mode showed visible comb filtering from phase cancellation. Root cause: without oversampling/filtering, distortion generated at high frequencies has nowhere to go within the sample rate and folds back down, and the resulting harmonics may not even be in the song's key. Practical takeaway: prefer compressor plugins that explicitly use oversampling/filtering, and treat "harsh, generic-sounding stock compressor" as a possible oversampling problem, not just a character issue. → [[Compression]]

## Routed to

- [[Compression]] (effect page) — full compressor-type taxonomy (FET/tube/VCA/optical/digital/upward), oscillation-period distortion formula, aliasing-from-missing-oversampling warning
- [[UAD UA 1176LN]] (plugin) — FET-type behavior specifics (ratio steps, attack/release range, always-distorting-by-design framing)
- [[UAD Teletronix LA-2A]] (plugin) — optical two-part program-dependent release mechanism
- [[Pro-C 2]] (plugin) — digital-compressor-as-combinable-toolkit framing, zero-gain-reduction tone-neutrality note

## Source

- [Compression Masterclass](https://www.youtube.com/watch?v=P2_uC93HshU) — Sage Audio, 12:12
- Transcript source: captions, high confidence
- Full transcript: [[Compression Masterclass (transcript)]]
