---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=GF-XMVa3lW8
channel: Sage Audio
duration: "00:10:43"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, eq, phase, stereo-width]
briefed: 2026-W33
---

# How to EQ Your Master

![](https://www.youtube.com/watch?v=GF-XMVa3lW8)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=GF-XMVa3lW8)

## Synopsis

An EQ-specific mastering breakdown from Sage Audio (the same studio behind [[How to Setup Your Mastering Chain]], [[The Only Music Mastering Video You’ll Ever Need]], [[EQ Masterclass]], [[Mid Side Masterclass]], and the rest of this chain's Sage Audio sourcing) — where those videos each cover the whole mastering chain or a broad menu of EQ moves, this one narrows in on just the mastering EQ decision itself: how much to move, which phase mode to use and why, what to do when you genuinely don't know what a master needs, how to pick between an analog-emulation and a digital EQ, and how to use mid/side EQ for width. Genuinely new content not already carried elsewhere in this vault's Sage Audio sourcing: a concrete numeric gain-staging rule for mastering EQ specifically (±3 dB hard ceiling outside emergency mix fixes, 0.25–2 dB as the normal working range); the mechanism that a natural/zero-phase EQ's phase shift on any boost or cut literally alters the resulting curve, not just the timbre; a generic "no idea what to change" frequency starting point (80 Hz / 2 kHz / 5 kHz-up shelf); a demonstrated analog-vs-digital EQ curve comparison using the Maag EQ4 as the analog-emulation example, including the point that most of an analog-emulation plugin's mystique comes from hiding its curve on a display; and a specific mid/side EQ recipe pairing a mid-image boost at 80 Hz (kick) and 2 kHz (vocal) with a matching side-image attenuation at those same two frequencies to reduce phase cancellation, distinct from this vault's existing Mid Side Masterclass recipe (which pairs a side HPF + mid ~2.5 kHz boost + side high shelf, no matching side attenuation and no kick frequency). Everything else (phase-mode choice generally, mid/side widening being safe and common) restates ideas already documented in more depth elsewhere.

## Techniques

- **Gain-staging discipline for mastering EQ.** Never move a band more than **±3 dB** during mastering unless fixing a serious problem in a mix you don't have access to revise. Normal working range: **0.25–2 dB** of boost or cut — enough to matter, not enough to read as an aggressive, noticeable change. Framed as the single most important discipline for the whole video: mastering should be subtle, and EQ is the easiest processor to make a noticeable change with, so it needs the most restraint.
- **Phase mechanism: why a natural-phase EQ move changes more than tone.** A zero-phase / natural-phase EQ inevitably shifts the signal's phase on **every** boost or cut, and that phase shift **alters the shape of the very curve you were trying to create** — not just a side-effect on timbre, but a change to the intended EQ move itself. This can sound good, but when precise, accurate changes matter more than natural-sounding ones, use **linear-phase** processing instead.
- **A generic starting point for "I don't know what this master needs."** No exact frequencies can be prescribed since every master differs, but when genuinely stuck: a **small boost ~80 Hz**, a **small boost ~2 kHz**, and a **subtle shelf from ~5 kHz up**. Stated result: a louder kick, a more prominent vocal, and a clearer overall master. Explicitly flagged as *not* going to work on every mix — a starting point, not a rule.
- **Choosing EQ type by the kind of change needed.** Broadband, tonal changes → an **analog-emulation** EQ (natural-sounding curves). Narrow, surgical changes → a **digital** EQ. The decision is about the *goal* (broad tone vs. specific fix), not about one type being generally better.
- **What actually makes an analog-emulation EQ distinct, demonstrated on the Maag EQ4.** A lot of an analog-emulation plugin's mystique comes from **hiding the curve** — no display showing what's actually changing, which plugin marketing leans on deliberately. Put a frequency/curve analyzer on one (demoed on the **Maag EQ4**) and the curves, while unique, are mostly reproducible on a typical digital EQ — except the Maag EQ4 specifically reaches into **supersonic frequencies** most digital EQs don't model (not named as the "Air Band" in the video, but that's the feature being described). What genuinely carries the "analog" character is how closely the curve is modeled off the real hardware; most analog-emulation EQs run **natural phase**, some offer a linear-phase option for accuracy closer to the original gear.
- **When digital/surgical EQ is the right call.** Reach for a digital EQ (not analog-emulation) for a specific, narrow alteration: attenuating **sibilance**, or notching a **harsh resonance confined to a narrow frequency range** — cases where broad, natural-sounding curves would touch more of the signal than intended. *(Caption note: the transcript names a specific "20 to 30 hertz" range for the harsh-sound example, which doesn't line up with "harsh" content — read qualitatively as a narrow problem band rather than that literal range; see Source below.)*
- **Mid/side EQ for stereo width — a concrete recipe.** A mid/side-capable EQ widens or narrows the stereo image by processing mid and side independently — called a common, safe mastering practice for width without introducing unwanted phase changes (referencing the channel's own prior dedicated stereo-width video for more depth — not yet in this vault as of this pass, see Routed to). Recipe: **boost the mid image at ~80 Hz** (kick) and **~2 kHz** (vocal), then **attenuate the side image at those same two frequencies** to reduce phase cancellation between the mid and side content. Separately: a **high shelf boost on the side image** widens perceived top end "more times than not."

## Routed to

- [[Master Chain]] — §1 [[Pro-Q 4]] (mastering EQ gain-staging discipline + natural-phase-alters-the-curve mechanism + the 80 Hz/2 kHz/5 kHz-shelf starting point), §5 [[Ozone 9 Imager]] (the mid 80 Hz/2 kHz boost + matching side attenuation width recipe)
- [[EQ]] (effect page) — gain-staging discipline, phase mechanism, analog-vs-digital EQ type selection with the Maag EQ4 example
- [[Width and Stereo]] (technique) — the mid/side EQ width recipe, cross-referenced against the existing Mid Side Masterclass recipe
- [[Ozone 9 Vintage EQ]] (plugin, owned analog-emulation equivalent) — new `## Techniques` section, the analog-emulation curve/phase lesson mapped from the unowned Maag EQ4
- [[Ozone 9 Equalizer]] (plugin, owned, has a native Analog/Digital per-band toggle) — new `## Techniques` section, the digital/surgical use case
- [[Plugin Wishlist]] — Maag EQ4 added under "From videos (to vet)"

No new plugin/effect/technique note was needed — every idea in this video had a home in the existing mastering-chain and EQ documentation. No sound/tone-selection content, no vintage-gear mention (the Maag EQ4 is a boutique-modern hardware unit, not a vintage source — routed to the wishlist instead of [[Vintage Gear Worklist]]).

## Source

- [How to EQ Your Master](https://www.youtube.com/watch?v=GF-XMVa3lW8) — Sage Audio, 10:43
- Transcript source: captions (pinned yt-dlp), high confidence for the spoken narration throughout. One likely caption garble: the "harsh sound" surgical-EQ example names a "20 to 30 hertz" range, which doesn't match a harsh/sibilant character (that content normally sits in the mid-highs) — read qualitatively as "a narrow problem band" in the extraction above rather than trusting that literal figure. Several short musical-demo passages (EQ-setting A/Bs) aren't narration and were skipped in the transcript rather than transcribed as song audio, consistent with this workflow's note that music-heavy passages garble auto-captions.
- Full transcript: [[How to EQ Your Master (transcript)]]
