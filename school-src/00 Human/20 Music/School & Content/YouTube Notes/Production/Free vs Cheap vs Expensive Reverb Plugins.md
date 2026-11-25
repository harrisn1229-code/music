---
type: yt-note
date: 2026-08-22
source: youtube
url: https://www.youtube.com/watch?v=wkBSKgSDkhs
channel: Sage Audio
duration: "00:15:48"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, reverb, plugin-comparison, convolution, algorithmic]
---

# Free vs Cheap vs Expensive Reverb Plugins

![](https://www.youtube.com/watch?v=wkBSKgSDkhs)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=wkBSKgSDkhs)

## Synopsis

A three-tier reverb plugin comparison — free (Melda MConvolutionEZ-class algorithmic reverb, MCharmVerb), cheap (Waves Renaissance Reverb), and expensive (Liquid Sonics Seventh Heaven Professional, the pick as best-sounding) — that doubles as a vocabulary primer for reverb parameters (diffusion, complexity/delay taps, frequency-dependent decay) largely transferable to any reverb, owned or not.

## Techniques

- **Diffusion controls whether the input signal or the early reflections feed the reverb TAIL — a parameter name worth understanding conceptually even outside this specific plugin.** At 0%, the tail is generated directly from the dry input; at 100%, the tail is generated from the early reflections instead — a structural choice about what's actually "reverberating," not just a density/smoothness knob. → [[Reverb]]
- **"Complexity"/delay-tap-count controls realism vs. CPU cost directly — more delay taps = more nuanced, less artifact-prone reverb, at a real per-instance CPU cost.** Worth knowing when deciding how many reverb instances to run in a session vs. consolidating to fewer sends — a highly complex algorithmic reverb on every track adds up fast. → [[Reverb]]
- **Frequency-dependent decay time (decay length that varies by frequency band, not just a single overall decay time) is a genuinely more advanced reverb feature — low end can decay differently than highs.** Distinct from simple high/low damping (which just changes tonal balance of the tail); this changes HOW LONG different frequency ranges of the tail actually ring for. Worth searching for on any reverb being evaluated for a mix/master bus role, since it gives much finer control over how a reverb tail resolves. → [[Reverb]]
- **Algorithmic vs. convolution isn't just "cheap vs. expensive" — a convolution reverb can be built FROM an algorithmic hardware unit's own impulse responses, capturing a specific unit's character more faithfully than a real-time algorithm alone.** Named example: the hardware Bricasti M7 is itself algorithmic, but Liquid Sonics' Seventh Heaven emulates it via convolution — multiple impulse responses captured from the real hardware compose each setting, rather than a real-time reverb algorithm trying to approximate it. A useful distinction when evaluating why two reverbs that sound similar on paper (both "algorithmic-derived") can sound different in practice. *(Seventh Heaven Professional not owned — see [[Plugin Wishlist]].)* → [[Reverb]]
- **A reverb plugin with its own multi-band master EQ built specifically for the reverb tail can make a separate follow-up EQ largely unnecessary.** Seventh Heaven's added 5-band master EQ section (not present on the original M7 hardware) subtly-to-drastically reshapes just the reverb's own frequency response — worth checking whether an owned reverb already has an equivalent stage before reaching for a generic EQ plugin after it on a send. *(Not owned — general lesson only.)* → [[Reverb]]

## Routed to

- [[Reverb]] (effect page) — diffusion, complexity/CPU tradeoff, frequency-dependent decay, algorithmic-vs-convolution distinction, built-in tail EQ concept
- [[Plugin Wishlist]] — Seventh Heaven Professional (Liquid Sonics) logged as a real, endorsed unit, not owned

## Source

- [Free vs Cheap vs Expensive Reverb Plugins](https://www.youtube.com/watch?v=wkBSKgSDkhs) — Sage Audio, 15:48
- Transcript source: captions, high confidence
- Full transcript: [[Free vs Cheap vs Expensive Reverb Plugins (transcript)]]
