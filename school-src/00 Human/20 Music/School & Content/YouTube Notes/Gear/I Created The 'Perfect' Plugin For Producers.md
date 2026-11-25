---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=kI2f9JNImGE
channel: loner
duration: 00:07:14
video_type: gear
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, plugin-design, sound-design, texture]
briefed: backlog
---

# I Created The 'Perfect' Plugin For Producers

![](https://www.youtube.com/watch?v=kI2f9JNImGE)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=kI2f9JNImGE)

## Synopsis

A behind-the-scenes documentary (not a tutorial) about loner and Johnny Wood teaming up with sound-design producers Louie and Nahum, plus audio developer Evan, to build a VST instrument called **Luma**, aimed squarely at "beatblock" — the goal being a texture-focused instrument that manufactures instant character rather than another preset-browsing synth. The through-line is a design philosophy worth more than any single setting: they mapped their own workflows first (texture — bouncing/pitching audio for character — was "the biggest thing"), then built features around that finding rather than starting from a feature list. Concretely the plugin bundles: a main melodic voice paired with a sidechained noise/texture layer for instant character, convolution reverb that accepts melodic sources (not just impulse claps) as its "room," per-note randomized variance (panning, ADSR), an "envelope squeeze" control that collapses the ADSR stages together, lo-fi degradation stages (sample-rate reduction and an MP3-style lossy "spectral gate," inspired by a conversation at an audio developer conference), realistic pedal-style glitch emulation modeled on real hardware pedals they love but can't always afford, and a one-click infinite randomized-preset generator. They shipped it as a 7-day free trial specifically to crowd-test whether it actually helped producers rather than trusting their own read on it — validated by strong community uptake. Worth watching less for hard settings (there are almost none — it's an origin story, not a walkthrough) and more for the underlying sound-design ideas, several of which map directly onto existing Ableton tools even without owning Luma itself.

## Techniques

- **Side-chain a noise/texture layer to the main melodic sound for instant character** — a noise layer keyed off (sidechained to) a piano gave the noise pulses and swells in time with the melodic part; generalized into "main sound + subsidiary noise section" as a reusable two-layer instrument design pattern rather than a single static patch. → [[Sidechaining]], [[TEXTURE Slot]]
- **Convolution reverb using melodic material as the impulse response, not just a transient/clap** — "the easiest example is reverb… you can go even crazier even using melodic sounds on top" — loading a melodic snippet (not a sharp transient) as a convolution IR reads as a tonal, harmonically-colored space rather than a neutral room. → [[Reverb]], [[TEXTURE Slot]]
- **Variance: randomize panning and ADSR shape per note played, not just pitch/velocity** — "subtle changes with each note that's pressed… panning adds width, and ADSR changes [the shape]" — a built-in per-note randomization layer so a held chord or repeated phrase never sounds mechanically identical twice. → [[Voice Architecture]] (per-voice randomization), [[Envelopes and ADSR]]
- **"Envelope squeeze" — collapse the ADSR stages toward each other rather than only scaling one stage** — turned fully up, it "squashes everything together," intensifying the texture/character of the sound rather than just shortening the tail — a distinct move from the usual single-stage ADSR tweak (shorten decay, etc.); it's compressing the *whole envelope's time axis* at once. *(described qualitatively — no numeric setting given)* → [[Envelopes and ADSR]]
- **MP3-style lossy compression artifact as its own filter/effect type ("spectral gate"), separate from bit-crush/sample-rate reduction** — inspired by a conversation about "the MP3 sound" at an audio developer conference; distinct from the plugin's own sample-rate-reduction stage — modeling the specific *lossy-encoding* artifact (spectral thinning/pre-echo character) rather than generic decimation grit. → [[Saturation and Distortion]]
- **Sample rate reduction as a standard texture filter stage**, paired with the MP3/spectral-gate effect above rather than used alone. → [[Saturation and Distortion]]
- **Realistic, "tasteful" pedal-glitch emulation as a design target, benchmarked against real hardware pedals rather than generic plugin glitch effects** — name-checked Chase Bliss Thermae, Fairfield Circuitry Shallow Water, and a "Chrono Console" (likely the Providence Chrono Delay DLY-4 — caption garble, not confidently identified) as the expensive-pedal sound they wanted a tasteful software equivalent of; called out as the hardest engineering piece — "quite a bit of work… a lot of tweaking by hand" for the audio developer. → [[Plugin Wishlist]]
- **A one-click "infinite randomized presets" generator as the intended anti-beatblock feature** — framed internally as "the final piece of the puzzle": a single button that regenerates a full new preset combination across the instrument's parameters, aimed at sparking ideas rather than browsing a static preset list. → [[Randomized Rack Design]]
- **Analyze your own workflow before designing a tool/preset/rack, rather than starting from a feature wishlist** — the whole plugin's feature set traces back to the team mapping loner's and Johnny Wood's actual creation habits first and finding texture-manipulation was the dominant behavior; a transferable process lesson for building your own racks/presets, not just for building a commercial plugin.
- **Validate a paid tool's value with a free trial before assuming the pitch works** — rather than trust their own sense that the plugin was good, they released a 7-day free trial specifically because the tool was hard to describe in words and "the quickest way to figure out how valuable it is is to actually try it" — a crowd-testing strategy, not a settings tip, but a useful framing for judging your own experimental racks/devices too.

## Routed to

- [[Sidechaining]] — noise-layer-sidechained-to-melody bullet
- [[Reverb]] — melodic-source convolution bullet
- [[Voice Architecture]] — per-note pan/ADSR variance bullet
- [[Envelopes and ADSR]] — envelope squeeze bullet
- [[Saturation and Distortion]] — MP3/spectral-gate + sample-rate-reduction bullet
- [[Randomized Rack Design]] — infinite randomized presets bullet
- [[Plugin Wishlist]] — Luma (the plugin itself, unowned) + pedal-glitch reference gear

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=kI2f9JNImGE)
- Channel: loner
- Duration: 00:07:14
- Transcript: captions, clean/high confidence (spoken documentary narration, not a music-heavy breakdown) — see [[I Created The 'Perfect' Plugin For Producers (transcript)]]
