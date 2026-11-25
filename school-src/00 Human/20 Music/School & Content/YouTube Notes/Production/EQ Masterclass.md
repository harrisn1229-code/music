---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=iPBnL6mx9c0
channel: Sage Audio
duration: "00:12:02"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, eq, compression, saturation, multiband, mid-side]
briefed: 2026-W33
---

# EQ Masterclass

![](https://www.youtube.com/watch?v=iPBnL6mx9c0)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=iPBnL6mx9c0)

## Synopsis

A fast, dense 12-minute tour of EQ from Sage Audio (the same channel behind [[Mastering Compression Settings]], [[The Only Music Mastering Video You’ll Ever Need|The Only Music Mastering Video You'll Ever Need]], [[Mastering Loud But Not Squashed]], [[Mid Side Masterclass]], and [[All Processing is Connected - Crucial Knowledge for Pro Mixes & Masters]]) that treats EQ less as one plugin and more as a mental model that shows up everywhere. It opens with parametric-EQ basics (filter types, slope, proportional Q), then draws a clean decision rule for natural- vs. digital-sounding EQ (phase mode + Q + slope), a specific answer for when linear phase actually earns its cost (parallel processing, high-pass filters) versus when it's overkill, and a quick graphic-EQ aside. The back half is where it gets genuinely valuable: it makes the case, with worked examples, that a compressor's attack/release and a saturator's harmonic generation are *also* EQ — they reshape frequency response as a side effect of their normal job, not just when an EQ plugin is inserted (the same "everything is connected" thesis the channel's other video develops at length, condensed here into two compact examples). It closes with a genuinely useful decision framework for dynamic EQ vs. multiband compression (band count and Q/slope control vs. attack/release/lookahead/knee), and a worked advanced mid-side EQ example — dynamically ducking an instrumental's specific frequencies off an external vocal sidechain, with per-band mid/side placement — that ties every earlier section (parametric EQ, dynamic EQ, linear phase, mid-side) into one concrete routing.

## Techniques

- **Parametric EQ filter menu and the slope/Q relationship.** A full-featured parametric EQ (FabFilter Pro-Q demoed) offers up to nine filter types per band — Bell, Low Shelf, High Pass, High Shelf, Low Pass, Band Pass, Tilt Shelf, and Flat Tilt — with slope measured in dB/octave, and Q that can be set proportional to the band's gain amount (Q widens/narrows automatically as you push the gain harder). Feature sets vary plugin to plugin: some add real-time analyzers, EQ matching, or mid/side imaging on top of the base parametric engine. → [[Pro-Q 4]], [[EQ Eight]], [[EQ]]
- **Semi-parametric bands exist inside otherwise-parametric EQs — check each band's actual slope control before assuming full control.** Named example: the Weiss EQ1 is a parametric EQ overall, but its high-pass filter offers almost no slope control, making that one band effectively semi-parametric even though the rest of the unit is fully parametric — a reminder to check per-band, not per-plugin. *(Weiss EQ1 not owned — not wishlisted; this is a limitation callout, not an endorsed technique.)* → [[EQ]]
- **A concrete natural-vs-digital EQ decision rule: phase mode + Q + slope, in one recipe each way.** For a natural, analog-emulating sound: **natural phase response** (closely tracks the phase/magnitude behavior of analog gear), **proportional Q enabled**, and slopes capped at **12 dB/octave or less** — the lower the Q, the more natural it reads. For a digital/surgical sound: **low-latency linear phase**, plus **higher slopes and Q values** for pinpoint, aggressive-sounding cuts — useful specifically when the job is finding and nailing a narrow problem frequency, not for general tonal work. → [[Pro-Q 4]], [[EQ]]
- **When linear phase actually earns its cost — and when it doesn't.** Linear phase EQ is for solving specific problems, not a default: (1) equalizing a **parallel signal** whose original path isn't also filtered — low-latency linear phase avoids phase cancellation when the two paths recombine; (2) **high-pass filtering**, where it can also help. At high settings it introduces **pre-ringing** (a pre-echo artifact ahead of transients), though the stated opinion is that pre-ringing concerns are often overstated in practice. Personal default given in the video: stick to **zero-latency natural phase** or **low-latency linear phase** — low-latency specifically for the most accurate correction possible without smearing transients. → [[Pro-Q 4]], [[Parallel Processing]], [[Phase Alignment]]
- **Graphic EQ: fixed-band visual shaping, occasionally with built-in harmonic distortion controls.** Graphic EQs are rarely the first reach, but some digital emulations add adjustable center frequencies (beyond the classic fixed-ISO-band layout) plus distortion features — the example given is Logic's stock graphic EQ (emulating an API-style unit), which lets you dial in harmonic distortion deliberately; another named example generates harmonics too but without user control over them. Whether to reach for a graphic EQ vs. parametric/semi-parametric largely comes down to preference — no inherent sonic advantage either way. *(Logic-only, not owned — Ableton has no direct equivalent stock graphic EQ; general lesson only.)* → [[EQ]]
- **A compressor is functionally an EQ too, via attack and release — worked example on a strummed acoustic guitar.** Quick attack + long release: the quick attack **attenuates the initial transient**, which carries its own frequency content, so shaping it changes the instrument's frequency response; the long release also affects other transients/content across the signal, further reshaping frequency balance. Separately, a **short attack distorts the signal**, generating new harmonics that add yet another frequency-response change. Net point: compression is reshaping tone whether or not that was the intent — check the high-frequency range specifically to hear it. → [[Pro-C 2]], [[Compression]], [[EQ]]
- **A saturator's harmonic generation reshapes frequency response far more drastically than a compressor's — verify it on an analyzer, not just by ear.** Running a plain sine wave through a saturator (demoed: Softube Saturation Knob) generates a dense stack of additional harmonic content; measuring the processed signal on a spectrum analyzer shows exactly how far that shifts the frequency balance versus the dry tone. General takeaway: it doesn't matter whether a frequency-response change comes from an EQ or from another processor type entirely (compressor, saturator) — the shift happens either way, and it's worth accounting for regardless of which device caused it. *(Softube Saturation Knob not owned — demonstration only, not wishlisted.)* → [[Saturator]], [[Saturation and Distortion]], [[EQ]]
- **Dynamic EQ vs. multiband compression: a clean decision rule by which kind of control you actually need.** Dynamic EQ (FabFilter Pro-Q named, Nate owns the newer Pro-Q 4) offers more Q/slope control per band and typically far more available bands — the video cites **Pro-Q 3 at up to 26 dynamic bands** versus **Pro-MB at 6** — but its dynamics section is thin: usually just a threshold (manual or automatic) and not much else. Multiband compression (Pro-MB) trades band count and per-band EQ shaping for a full compressor's toolkit per band: **attack, release, look-ahead, knee**. Decision rule: want pinpoint control over *which frequency* and *how it's shaped* → dynamic EQ; want more control over *how the dynamics themselves behave* → multiband compression. → [[Pro-Q 4]], [[Pro-MB]], [[EQ]], [[Multiband Compression]]
- **Advanced mid-side EQ: dynamically duck an instrumental's specific frequencies off an external vocal sidechain, with per-band mid/side placement.** Worked example, mixing a vocal against an instrumental: insert the EQ on the instrumental, build **multiple bands centered on the exact frequencies that should dip whenever the vocal is present**, set each of those bands to **Dynamic**, then point each band's **external sidechain** input at the vocal — the band's threshold now measures the vocal's level instead of the instrumental's own, so the instrumental only ducks those specific frequencies while the vocal is actually singing. Taken further: assign **Stereo Placement per band** — e.g. one dynamic band ducking the **mid** image, another ducking the **side** image — combining the frequency-specific vocal-triggered duck with a stereo-imaging decision in the same move. Called out explicitly as a single example that touches nearly everything else in the video: parametric EQ (Q/slope), dynamic EQ, external sidechaining, mid-side placement, and (optionally) linear phase all at once. → [[Pro-Q 4]], [[2 Inst-Synth Group]], [[Sidechaining]], [[Masking and Carving]], [[Width and Stereo]]

## Routed to

- [[Pro-Q 4]] (plugin) — natural-vs-digital EQ recipe, linear phase decision rule, dynamic EQ band-count comparison, mid-side external-sidechain vocal-duck technique
- [[Pro-C 2]] (plugin) — attack/release-as-EQ on a strummed acoustic guitar
- [[Pro-MB]] (plugin) — dynamic EQ vs. multiband compression decision framework
- [[Saturator]] (plugin) — saturation's frequency-response shift, analyzer-verified
- [[EQ]] (effect page) — filter menu, semi-parametric bands, natural-vs-digital recipe, linear phase rule, graphic EQ aside, compressor-as-EQ, saturator-as-EQ, dynamic EQ vs. MB comparison, mid-side sidechain-duck
- [[Compression]] (effect page) — compressor-as-EQ (attack/release reshaping tone)
- [[Saturation and Distortion]] (effect page) — saturator-as-EQ (harmonic generation reshaping frequency response)
- [[Multiband Compression]] (effect page) — dynamic EQ vs. MB comparison
- [[Sidechaining]] (technique) — external-sidechain dynamic EQ bands keyed from the vocal
- [[Masking and Carving]] (technique) — vocal-priority dynamic duck on an instrumental
- [[Width and Stereo]] (technique) — per-band mid/side placement combined with a dynamic duck
- [[Phase Alignment]] (technique) — linear phase pre-ringing + phase-cancellation-avoidance rule
- [[Parallel Processing]] (technique) — linear phase EQ on a parallel signal path
- [[2 Inst-Synth Group]] (chain) — inline addition alongside the existing Pro-Q 4 sum-carve stage

## Source

- [EQ Masterclass](https://www.youtube.com/watch?v=iPBnL6mx9c0) — Sage Audio, 12:02
- Transcript source: captions (pinned yt-dlp), high confidence — a clean spoken breakdown with only two unclear plugin/vendor names, flagged inline where the reading is inferred rather than certain (a graphic-EQ vendor name and "Softube Saturation Knob")
- Full transcript: [[EQ Masterclass (transcript)]]
