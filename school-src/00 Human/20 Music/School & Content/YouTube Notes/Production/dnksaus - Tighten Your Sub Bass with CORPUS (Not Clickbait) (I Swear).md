---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=260MHJtu0pc
channel: dnksaus
duration: "00:03:45"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: medium — the core recipe (dual/triple tuned Saturators + Corpus) is clear and unambiguous; the "take it further" escalation section names several plugins quickly over a music bed and a couple of specifics (exact Disperser/Trash settings) are best-effort reconstructions from context, not verbatim
tags: [yt-note, music, production, ableton, bass, sound-design, corpus]
briefed: 2026-W31
---

# dnksaus - Tighten Your Sub Bass with CORPUS (Not Clickbait) (I Swear)

![](https://www.youtube.com/watch?v=260MHJtu0pc)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=260MHJtu0pc)

## Synopsis

A short, focused sound-design video whose core recipe is genuinely new territory for this vault: **tune the supporting devices to the note**, not just the synth patch. On an Operator/Serum bass note, two or three [[Saturator]] instances get tuned (via the Color section's Freq control) to the note's own fundamental and an octave above it, and [[Corpus]] — previously only documented here as a drum/snare texture layer — gets tuned to that same sub frequency for a physically-modeled reinforcement of the bass's fundamental rather than an unrelated ringing pitch. That's the whole "not clickbait" thesis: Corpus tuned to the note *does* tighten a sub. The back half of the video piles on an escalation ladder (parallel high-passed harmonic layer, multiband glue, a harmonically-tuned phase disperser, grit, duplication, then a safety limiter) that the creator's own closing tone frames as "too much" past a certain point — useful as a menu of options, not a recipe to run end-to-end every time. No existing technique note in this vault covered bass **sound design** specifically (Kick Design and Snare Design exist as siblings for drums; Bassline Writing covers bass *composition*), so this note's content seeded a new **[[Bass Design]]** technique page rather than being bolted onto an unrelated note.

## Techniques

- **Tune 2–3 Saturators to the played note's fundamental (and an octave up) instead of driving broadband** — set each [[Saturator]]'s Color-section Freq to the bass note's actual fundamental frequency (~156 Hz for the D♯ demoed here), add a second instance tuned an octave up, and optionally a third a further step above — layered, in-tune harmonic reinforcement instead of one saturator doing everything untuned. → [[Bass Design]], [[Saturator]]
- **Tune Corpus to the same sub frequency as the note — reinforcement, not texture** — [[Corpus]]'s resonance dialed to match the bass note's own fundamental (the same D♯ as the Saturators above) so its physically-modeled resonance reinforces the sub rather than ringing an unrelated pitch; a genuinely different application from Corpus's previously-documented drum/snare-texture role in this vault. A free, pre-tuned (every note) rack version of this exact Saturator+Corpus recipe is linked in the video's description. → [[Bass Design]], [[Corpus]], [[SUB Slot]]
- **Escalation rung 1 — resample, then a parallel high-passed harmonic layer** — bounce the tuned bass to a new audio track, run it through another Saturator into an [[EQ Eight]] high-pass set ~150–300 Hz, keeping only the driven upper harmonics in that layer so it can blend in without muddying the actual sub. → [[Bass Design]], [[EQ]]
- **Escalation rung 2 — multiband compression + a notch EQ, fine-tuned by ear** — a multiband-compression pass built from [[Multiband Dynamics]] glues the stacked layers, with a notch EQ cut wherever resonance has built up, fine-tuning every EQ in the chain afterward. → [[Bass Design]], [[Multiband Dynamics]]
- **Escalation rung 3 — a phase disperser tuned to a harmonic multiple of the note (unowned: Kilohearts Disperser)** — calculate a harmonic multiple of the bass fundamental (~1244 Hz off the ~156 Hz D♯, roughly an 8th harmonic) and tune an all-pass disperser device to it for extra metallic motion — used here via a preset rack a friend of the channel's built. → [[Bass Design]], [[Plugin Wishlist]]
- **Escalation rung 4 — grit (unowned: iZotope Trash), duplicate, then a Limiter as a safety net** — a lo-fi/distortion plugin stacked after the disperser, then the whole chain duplicated for more density, at which point a Limiter gets added explicitly as ear protection rather than a mix decision — with [[OTT]] and/or [[Vocoder]] flagged as further "feeling really wild" options past that. → [[Bass Design]], [[Plugin Wishlist]], [[OTT]], [[Vocoder]]
- **A dedicated Bass Design technique note filled a real gap** — [[Kick Design]] and [[Snare Design]] already existed as drum-synthesis sound-design notes, and [[Bassline Writing]] covers bass composition, but nothing in this vault covered bass **sound design** (synthesis/reinforcement) specifically until this video's recipe — now the vault's third "design" sibling. → [[Bass Design]]

## Routed to

- [[Bass Design]] — new technique note (registered in [[Techniques Index]]): the full tuned-Saturator + Corpus recipe plus the escalation ladder
- [[Corpus]] — new `## Techniques` bullet: tuning the resonator to the played note for sub reinforcement (distinct from the existing snare-texture-layer bullet)
- [[Saturator]] — new `## Techniques` bullet: Color-section Freq tuned to the note for layered harmonic reinforcement
- [[Plugin Wishlist]] — two new entries: Kilohearts Disperser and iZotope Trash (2), both part of the Bass Design escalation ladder
- [[4 Bass/1 Digital Bass Track|Digital Bass Track]] — inline 🎬 line at Stage 1 (Sound Selection) plus a new `## From videos` bullet, pointing to [[Bass Design]] for the full recipe (chain updated in place, no new chain created)
- [[Wavetable]], [[Bassline Writing]], [[Sound Selection Guide]] — cross-linked to [[Bass Design]] (light-touch pointers, no new technique content added there)

## Source

[Tighten Your Sub Bass with CORPUS (Not Clickbait) \[I Swear\]](https://www.youtube.com/watch?v=260MHJtu0pc) · dnksaus · 3:45 · captions (medium confidence) · transcript: [[dnksaus - Tighten Your Sub Bass with CORPUS (Not Clickbait) (I Swear) (transcript)]]
