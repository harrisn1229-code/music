---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=SrFwQqDMJQM
channel: Sage Audio
duration: 00:06:12
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, limiting]
briefed: backlog
---

# How to Limit Your Master

![](https://www.youtube.com/watch?v=SrFwQqDMJQM)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=SrFwQqDMJQM)

## Synopsis

A tight, six-minute Sage Audio explainer that walks through the practical decision points a producer hits when reaching for a mastering limiter — which unit to reach for, how much to attenuate, what release/attack settings do (and, for attack, what they actually mean on a limiter as opposed to a compressor), whether to trust a limiter's dedicated true-peak mode, whether to bother with oversampling, and how to use a limiter for stereo expansion rather than pure loudness. It's a companion piece to the channel's other, deeper limiter breakdowns already in this vault ([[Limiting]], [[Master Chain]], [[Pro-L 2]]) — shorter and more rapid-fire, structured as a "best pick for X" + "best setting for X" checklist rather than a single worked chain. The most useful new material here is mechanical: a clear explanation that a limiter's "Attack" control does not behave like a compressor's Attack (limiters attack essentially instantly; the control actually sets how long before the release/recovery envelope begins), and a concrete numeric release-time ladder (50 ms as the loud-without-distortion sweet spot, faster is audibly dirtier, 250 ms+ for smoothness, 5–10 ms if you want maximum loudness and don't mind the distortion). It also restates, more concisely than elsewhere in this vault, the channel's now-familiar contrarian stance against a limiter's dedicated true-peak detection mode, and adds a genuinely new stereo-expansion option — running a **mid-side limiter** that attenuates the mid image more than the side — alongside the already-documented channel-unlink technique.

## Techniques

- **Ranked limiter picks (Sage Audio's own, explicitly framed as opinion):** best free — **Limiter No. 6**; best introductory — **Waves L1**; best versatile — **FabFilter Pro-L 2** (owned, see [[Pro-L 2]]); best for retaining detail — **Newfangled Audio's Elevate** ("newfangled audios" in the auto-captions); best overall-sounding — **Voxengo Elephant** (already flagged elsewhere in this vault, see [[Plugin Wishlist]]).
- **Attenuation ceiling — a looser numeric target than this vault's existing "max 3 dB" tool-agnostic rule:** typically stay under 5–6 dB of gain reduction at any point when limiting, though some engineers push harder depending on genre/track. If a loud master needs more than that, reach for **low-level compression before the limiter** — it amplifies the quieter parts of the signal, raising perceived loudness without needing aggressive limiting.
- **Best release time — a concrete numeric ladder, not a single number.** 50 ms is the sweet spot for a loud master without introducing distortion; anything faster than 50 ms causes mild-to-moderate audible distortion (may or may not be wanted, genre-dependent); for a smoother-sounding master, go 250 ms or slower; if raw loudness matters more than cleanliness and some distortion is acceptable, 5–10 ms. *Tension flag: this "50 ms sweet spot / 250 ms for smooth" ladder sits below this vault's existing tool-agnostic "release above 100 ms" target from a different Sage Audio video (see [[Limiting]], [[Pro-L 2]], [[Master Chain]] §8) — worth A/B'ing both on a given master rather than picking one as the house default.*
- **What a limiter's "Attack" control actually does — a mechanical clarification, not a setting recipe.** Don't read a limiter's Attack the way you'd read a compressor's: every limiter's actual attack (the time to fully engage gain reduction on a peak) is near-instant, effectively zero milliseconds, regardless of what the Attack knob shows. What the Attack control on a limiter really sets is **the time before the release/recovery envelope begins** — a quicker "attack" here means less distortion; a longer one trades some cleanliness for a louder-reading master. Combine with the release-time ladder above for finer control over a master's timbre.
- **Skip true-peak detection in most cases — restates this vault's existing contrarian stance, more concisely.** True-peak mode alters the master's transients for a less impactful sound. Instead: pull the limiter's ceiling down slightly, turn oversampling on, and use a short amount of lookahead — the ceiling prevents overs, oversampling gives more accurate quantization (less aliasing), and lookahead ducks the signal ahead of a peak — all with a much less aggressive effect on the transient than the limiter's own true-peak mode. → [[Limiting]], [[Pro-L 2]] carry the deeper mechanical "why" and a numeric recipe (ceiling −0.5 to −1 dB, 0.1 ms lookahead, 4x+ oversampling) from a separate Sage Audio source.
- **Always use oversampling when limiting a master — no real downside cited.** Prevents aliasing distortion and gives a more accurate representation of the signal's amplitude, which reduces peaking. Mechanically: pushing a signal into a brick-wall ceiling generates harmonic distortion; if those harmonics come from high enough frequencies they alias, and oversampling is what avoids that.
- **Stereo expansion via a limiter — two distinct methods.** (1) Use a **mid-side limiter** so the mid image gets attenuated more than the side. (2) **Unlink the channels** so left and right are limited independently — won't widen every master, but can make L/R read as more unique/distinct, a pleasant side effect rather than a guaranteed win. → the channel-unlink route is already deeply documented in this vault (dual-mono limiting, Channel Link tuning) on [[Pro-L 2]], [[Limiting]], [[Master Chain]] (Variations), and [[Width and Stereo]]; the **mid-side-limiter** route (mid attenuated more than side, via the limiter itself rather than a separate mid/side bus compressor) is new to this vault — see [[Width and Stereo]] for the equivalent mid-image-*compression* version of the same "attenuate the center, sides read louder by comparison" idea.

## Routed to

- [[Pro-L 2]] — attenuation ceiling, release-time ladder, attack-control clarification
- [[Limiting]] — ranked limiter picks, attenuation ceiling, release-time ladder, attack-control clarification, true-peak/oversampling restatement, mid-side-limiter stereo expansion
- [[Master Chain]] — §8 Ozone 9 Maximizer inline note + From videos entry (release-time ladder + attack clarification)
- [[Width and Stereo]] — mid-side-limiter stereo expansion technique
- [[Plugin Wishlist]] — Limiter No. 6 (new), Newfangled Audio Elevate (new), added citation to the existing Voxengo Elephant entry

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=SrFwQqDMJQM)
- Channel: Sage Audio
- Duration: 6:12
- Transcript: captions (clean, spoken breakdown — high confidence). See [[How to Limit Your Master (transcript)]].
