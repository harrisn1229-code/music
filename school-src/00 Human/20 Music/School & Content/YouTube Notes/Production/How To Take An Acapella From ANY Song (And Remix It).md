---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=5pBUt5sHjGU
channel: Sol State
duration: "00:05:03"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, sampling, stem-separation, remix, acapella-extraction, vocal-processing]
briefed: backlog
---

# How To Take An Acapella From ANY Song (And Remix It)

![](https://www.youtube.com/watch?v=5pBUt5sHjGU)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=5pBUt5sHjGU)

## Synopsis
A sponsored-but-genuinely-useful walkthrough of using LALAL.AI, an AI stem-separation tool, to pull a usable acapella out of any commercially released song that never got an official a cappella — unlocking a whole category of songs to remix that were previously off-limits. The host frames LALAL.AI as the "easy version" of Spleeter (Deezer's open-source stem separator), which he'd tried first but found too fiddly to set up (needs a virtual machine and manual install). The core argument of the video isn't just "here's a tool" — it's a full cleanup chain for making the AI-extracted vocal actually sit in a mix despite its inherent artifacts, demonstrated with an A/B test against his own song's real studio acapella. He closes on a mindset point: don't fight the technology trying to recreate a perfect studio vocal — lean into the character and imperfection the AI extraction gives you instead.

## Techniques
- **LALAL.AI for acapella/stem extraction from a finished song** — upload a WAV, enable "use the new algorithm" (better quality), pick a processing level (middle setting is a good starting point), and download; positioned as the low-friction alternative to self-hosting Spleeter (open-source but requires installing code + a virtual machine). Free tier splits 3 songs before paywall. → [[Sampling and Sound Selection]] — Sol State, [How To Take An Acapella From ANY Song (And Remix It)](https://www.youtube.com/watch?v=5pBUt5sHjGU)
- **Audition the raw AI rip section-by-section before committing** — extraction quality is inconsistent within one vocal; some phrases come out clean, others (typically where drums bled through) come out mushy — solo the isolated vocal first and identify which sections are actually usable before building a cleanup chain around them.
- **High-pass around 50 Hz as the first cleanup move** — cut everything below ~50 Hz on the extracted vocal; there's no usable vocal content down there anyway, and it's often where separation junk/rumble concentrates. → [[EQ Eight]]
- **Mono the extracted vocal to collapse artifact "phasiness"** — a lot of the AI separation's smearing/artifact noise lives in the stereo side-channel; summing to mono is a small move that noticeably tightens and cleans the vocal. → [[Utility]]
- **Run Soothe (or equivalent) after the mono step to catch AI-processing peaks** — the separation algorithm introduces its own resonant peaks distinct from normal vocal harshness; a dynamic resonance suppressor knocks those down without static EQ notching. → [[Soothe2]]
- **Rebuild lost top-end with Erosion or a gentle "fresh air" style high-frequency exciter** — stem separation tends to dull the extreme highs; add a touch of high-frequency texture/air back in after the de-resonance pass to restore presence. → [[Erosion]], [[Fresh Air]]
- **Add reverb last, purely for width/naturalness, not to mask artifacts** — a light reverb send glues the processed vocal and gives it a sense of space closer to a real studio take, applied after the corrective chain rather than as a cover-up. → [[Reverb]]
- **Full recommended cleanup chain order: solo/audition → EQ high-pass (~50 Hz) → mono → Soothe/de-resonance → top-end exciter (Erosion/Fresh Air) → reverb** — the sequence matters: address low-end junk and stereo artifacts before dynamic de-resonance, then restore highs, then glue with space last.
- **Slice the cleaned vocal to a new MIDI track for chop-based arrangement** — once processed, throw the vocal region onto a new MIDI channel and use Ableton's transient-based slicing to chop it into playable pads, then hand-pick the best-sounding transients/phrases to build a new vocal pattern or hook rather than using the phrase verbatim. → [[Simpler]]
- **Keep a "bad" artifact on purpose if it sounds interesting** — one of the AI separation's glitches accidentally produced a texture the host liked enough to keep in the final chopped pattern as a unique chord-like element; treat unexpected artifacts as potential material, not just errors to eliminate.
- **Mixing philosophy: an element only has to sit right in context, not sound perfect solo** — you can get away with an imperfect isolated element (like an AI-extracted vocal) if everything else in the mix is doing its job; judge processing decisions by how the piece sits in the full arrangement, not in isolated soloing.
- **Work with the AI artifacts, don't fight them** — don't chase a perfect studio-quality recreation from an AI-separated source; instead lean into the vocal's altered character on purpose (extra reverb, unconventional filtering, deliberate texture) rather than trying to scrub every trace of the extraction process away.

## Routed to
- [[Sampling and Sound Selection]]
- [[EQ Eight]]
- [[Utility]]
- [[Soothe2]]
- [[Erosion]]
- [[Fresh Air]]
- [[Reverb]]
- [[Simpler]]

## Source
[How To Take An Acapella From ANY Song (And Remix It)](https://www.youtube.com/watch?v=5pBUt5sHjGU) · Sol State · 00:05:03 · captions · transcript: [[How To Take An Acapella From ANY Song (And Remix It) (transcript)]]
