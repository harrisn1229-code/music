---
type: yt-note
date: 2026-07-27
source: youtube
url: https://www.youtube.com/watch?v=Gi_y81NmoGg
channel: dnksaus
duration: "00:13:27"
video_type: production
music_enriched: true
transcript_source: captions
transcript_confidence: high — clean spoken tutorial, plugin/parameter names come through clearly
tags: [yt-note, music, production, ableton, reverb, sound-design, convolution]
briefed: 2026-W31
---

# dnksaus - Reverb Can Be POWERFUL

![](https://www.youtube.com/watch?v=Gi_y81NmoGg)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Gi_y81NmoGg)

## Synopsis

A rapid-fire tour of Ableton's **Hybrid Reverb** (convolution + algorithmic, no dedicated plugin note in the vault until this pass) used far beyond its "add some space" role. dnksaus builds a vocal pad by freezing a Hybrid Reverb tail on the Algorithmic side, then a second pad via Sampler's sustain-loop mode with a Key-modulated band-pass filter; layers a Wavetable rhythm part on top using his personal default preset; then goes deep on the **Convolution** side — dropping in drum one-shots and full drum loops as impulse responses (getting a rhythmic, near-vocoder-like tonal delay), and building a chord-progression-following percussion texture by racking a convolution reverb with one bounced chord per chain and automating the chain-selector macro. The video closes with pre-delay-as-slapback and a reverb+OTT+multiband-compression recipe for turning plain synth/bass zaps into huge drop "womp" one-shots — including a direct rebuttal of "never put reverb on sub-bass."

## Techniques

- **Hybrid Reverb has two sides** — **Convolution** (any sample becomes the impulse response) and **Algorithmic** (five distinct algorithms, e.g. Prism, Quartz). → (new) [[Hybrid Reverb]]
- **Freeze on the Algorithmic side for an instant pad** — Prism algorithm, Dry/Wet 100%, then Freeze mid-playback locks whatever's sounding at that instant; audition several slices of a vocal chop to find one that freezes cleanly.
- **Sustain-loop-mode Sampler pad** — record the frozen chop, drop it into Sampler, sustain loop mode + crossfade to hold notes indefinitely, tune the root by ear, open Attack/Release/Sustain/Voices, then OTT (amount down, time-scaling up, low end off) → band-pass filter (12 dB slope) with an LFO mapped to filter Key so each note gets a slightly different filter position. → [[Sampler]]
- **Wavetable default-preset workflow** — a personal go-to patch (unison on noise + two LFOs wobbling pitch, one slow "over"-wobble ~10 cents and one more vibrato-like) saved via right-click → Save as Default Preset so every new Wavetable instance loads pre-configured. (Full Wavetable pass deferred to its own dedicated video later in this queue.)
- **Convolution with drum samples/loops as the impulse response** — a single drum hit gives a metallic/tonal color; a **full drum loop at the song's BPM** as the IR reads as a rhythmic, tonal delay-like effect — near-vocoder-ish without actually vocoding, if the loop has no kick. Size ≈ pitch/length of the IR (50 = an octave up); Decay trims the tail.
- **Chord-following convolution texture** — bounce each chord to its own clip, rack a percussion loop's Convolution-mode Hybrid Reverb, duplicate per chord, drop one bounced chord per chain as its impulse response, distribute the chain-select ranges equally and map to a macro, then **automate** that macro so the percussion's tonal color tracks the chord changes (short ~150 ms decay per chain for clarity; Size up an octave for extra color). → [[Automation]], [[Randomized Rack Design]]
- **Pre-delay as a built-in slapback** — push any reverb's Pre-Delay far enough and it reads as a slapback rather than a smeared tail; pair with a short Note Length so the effect stays audible on short chops.
- **Reverb → OTT → multiband compression = a drop "womp" one-shot** — turns a basic synth/bass zap into a huge-impact drop transition sound; works on sub-bass despite the usual caution. → [[OTT]]
- **Instant vocal chops from the browser** — drag a Splice sample onto a MIDI track (auto-converts to Simpler), flip to Slice mode. → [[Simpler]]
- **Percussion-one-shot prep via Drum Rack + Clips tab** — filter the Samples tab for one-shot percussion or browse the Clips tab's drum-clip/percussion-clip filter to find a groove fast, then map a Pitch device to scroll which one-shot plays and route random panning to a macro (mapped to all siblings) for variation, before bouncing to use as convolution material.

## Routed to

- [[Hybrid Reverb]] — new plugin note (gap-fill; Ableton stock device, no prior note despite two name-drops in batch 1); full technique set from this video (also retroactively wikilinked the two pre-existing plain-text mentions in [[OTT]] and the "best knob"/"auto slicer" yt-notes now that the page exists)
- [[Reverb]] (effect page) — new `## From videos` bullets (convolution-as-resynthesis, freeze-for-pad, drop-womp, pre-delay slapback) at the top; added Hybrid Reverb to the `## Owned` list
- [[OTT]] — new `## Techniques` bullet: reverb→OTT→multiband drop-womp recipe
- [[Sampler]] — new `## Techniques` bullet: sustain-loop-mode pad build
- [[Simpler]] — new `## Techniques` bullet: instant browser-drag vocal chops
- [[Automation]] — new `## From videos` bullet: automating which IR a convolution reverb loads to follow the chord progression
- [[3 FX/1 Drums FX Track]] (chain) — inline 🎬 tip + new `## From videos` section: drop-womp recipe, and Granulator 3 as a native granular-smear alternative to the wishlisted [[Portal]]
- [[Sampling and Sound Selection]] — cross-linked from Simpler's new bullet (no duplicate content added)
- Wavetable, Vocoder — light touch only; both have their own dedicated videos later in this queue, deferred to avoid premature/thin coverage
- **Update (batch 6):** [[Vocoder]] got its own plugin note from its dedicated video ([Why Vocoder is Ableton's Most Versatile Device!!](https://www.youtube.com/watch?v=v6tJJ2Y8Eos)); no specific technique from this video needed porting over since this note only gave Vocoder a passing name-drop, not a captured technique.

## Source

[reverb can be POWERFUL](https://www.youtube.com/watch?v=Gi_y81NmoGg) · dnksaus · 13:27 · captions (high confidence) · transcript: [[dnksaus - Reverb Can Be POWERFUL (transcript)]]
