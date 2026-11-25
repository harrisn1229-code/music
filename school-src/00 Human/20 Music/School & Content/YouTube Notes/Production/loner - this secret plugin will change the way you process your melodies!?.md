---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=xwuodd40bug
channel: loner
duration: "00:10:34"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, sound-design, guitar-pedals, macros, texture, reverb, chorus, pitch, half-time]
briefed: backlog
---

# loner - this secret plugin will change the way you process your melodies!?

![](https://www.youtube.com/watch?v=xwuodd40bug)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=xwuodd40bug)

## Synopsis

A sound-design tutorial pitching FL Studio's **Patcher** (a routing/container device that hosts and wires together a chain of other plugins into one custom multi-effect unit) as a way to replicate what pedal-chasing sample-makers actually want from hardware guitar pedals (Chase Bliss Thermae, Hologram Microcosm, Chase Bliss Blooper, Cooper FX Arcades are named as the genre of gear people chase) without the rarity/cost/learning-curve tax of hunting them down secondhand. loner frames it as "replicating these pedals inside FL Studio with the plugins you already have," then builds two worked examples live: (1) a simple "chorus-modulated reverb" — a reverb into a chorus set to a flanging preset, with just two macro knobs (reverb Mix + reverb Decay) and a chorus Mix knob exposed on a Patcher surface — inspired specifically by one feature of the KMA Cirrus hardware pedal (a chorus-modulated reverb setting); and (2) a fuller, fully-wet textural chain — a tape-flavored "space echo" reverb/delay preset → an octave-up pitch shift → a granular/glitch texture plugin (Portal) → a chorus loaded with a "vocal chorus" preset → a half-time device → a low-pass EQ — built specifically as a "one or two knob pedal" by exposing only a Half Time macro and a low-pass-cutoff macro to the end user, saved as a reusable preset named "Sparkle" that gets dragged onto any new track/project instantly. The whole point of the video is the meta-lesson: build once, expose 1-2 simple macro knobs, save as a preset, and you have a reusable "pedal" without owning the pedal. Ableton's direct equivalent of Patcher is the **Audio Effect Rack** with Macro knobs (Nate already documents the same "save FX-rack chains as reusable sounds" lesson on [[EffectRack]] from a different video) — the routing mechanics (drag a plugin's parameter to a mapped knob, chain plugins output-to-input, expose only what the end user needs) map over directly. Auto-captioned spoken narration over screen-recorded FL Studio work — transcribes cleanly (no music-garble), but exact plugin names are inferred where the captions render them phonetically (see routing notes below); treat unconfirmed names as **medium confidence**.

## Techniques

- **The pedal-chasing problem, stated as the reason to build this instead:** rare/hard-to-find pedals (eBay/Reverb only, rarely sold direct), driven-up prices once something's sought-after, and a steep learning curve once you actually land one — the video's stated motivation for replicating pedal character entirely inside plugins you already own. Thermae, Microcosm, Blooper, and Cooper FX Arcades are named as the class of pedal this targets (pure name-drops here, no settings given — already wishlisted from a companion loner video, see [[Plugin Wishlist]]).
- **FL Studio's Patcher = a routing host for chaining stock/third-party plugins with a custom macro-knob surface.** Two lanes always exist inside Patcher: a straight-through dry path ("FL Studio to FL Studio") and whatever wet path you build; adding an effect means dragging a connector from the dry-signal node into the plugin's input, then from the plugin's output back to the output node — nothing is audible until that connection exists. A **Surface** tab (Add → Knob/Button/Slider) creates the visible macro control; the **Map** tab (right-click plugin → Inputs → Parameters) exposes every one of that plugin's parameters as a mappable red connector, dragged onto the Surface knob to link them. → [[EffectRack]] (Ableton's own container-plugin equivalent), [[Randomized Rack Design]] (the Ableton-native macro-mapping mechanics this generalizes to)
- **Chain 1 — chorus-modulated reverb, recreating one feature of the KMA Cirrus hardware pedal.** Reverb (a Valhalla-style "vintage verb") → chorus set to a **flanging preset**, chained output-to-input inside Patcher. Two macros exposed: reverb **Mix** and reverb **Decay** (both mapped from the reverb's own parameters), plus a chorus **Mix** knob — three total knobs standing in for the whole chain's character. The point of picking the chorus specifically (vs. modulating the reverb with a stock modulation plugin like Valhalla's own internal chorus) is stated directly: "obviously you can modulate the reverb inside Valhalla but that's not giving you a unique sound everyone can do that" — stacking a *separate*, arbitrarily-chosen modulation device after the reverb is what makes the combination personal rather than a factory setting. → [[Reverb]], [[Modulation]], [[ValhallaVintageVerb]], [[TAL-Chorus-LX]], [[TEXTURE Slot]]
- **A closing EQ cut on the low end**, added after the reverb+chorus chain "just to cut a little bit of the low end out" — no specific frequency given, framed as routine cleanup rather than a creative move. *(general starting point)* → [[EQ]], [[EQ Eight]]
- **Chain 2 — the fully-wet "Sparkle" texture chain, built on a second (piano) one-shot with the dry signal deliberately NOT passed through** (unlike Chain 1, which kept a dry path): (1) a tape-flavored "space echo" reverb/delay preset — "nice little reverb, a bit of a tape effect as well"; (2) an **octave-up pitch shift** (captioned "Waves... Sound Shifter" — read as **Waves SoundShifter**, already on [[Plugin Wishlist]]; owned equivalent [[kHs Pitch Shifter]] covers the same ±12-semitone octave move); (3) **Portal** (owned — loaded with the "pitch" preset category, "make it super textural") for granular/glitch texture; (4) a chorus plugin (captioned "Clever" — name unconfirmed/likely garbled, *(medium confidence)*) loaded with its **"vocal chorus" preset**, run wet-only (no dry blend dragged in); (5) a **half-time device** exposed as a single macro named "Half Time," mapped to its Mix parameter so the end user dials between full half-time, no half-time, or anywhere between; (6) a **low-pass EQ** (band 7 set to Low Pass) with its **frequency** mapped to a second macro — the chain's only other exposed control. → [[Delay]], [[Pitch and Formant]], [[Portal]], [[EQ]], [[EQ Eight]], [[kHs Pitch Shifter]]
- **Deliberately expose only 2 macros ("Half Time" + low-pass frequency) on a 6-stage chain, not a knob per device** — the stated design goal: "I want to make this kind of like a one or two knob pedal... this is the effect it's going to give you, but I want to let the person decide" how much half-time and how dark the top end is. Everything upstream (the reverb/delay preset, the pitch amount, the Portal preset, the chorus preset) is baked in and NOT exposed — only the two controls that matter for real-time performance/mixing decisions get a knob. The Ableton-native version of this is the same "which parameters actually need a macro" discipline already documented generally on [[Randomized Rack Design]] and [[EffectRack]]. → [[EffectRack]], [[Randomized Rack Design]]
- **Save the finished multi-effect chain as a named preset ("Sparkle") and drag it onto any new track/project instantly** — once built, Patcher's Save As stores the entire routed chain + macro mapping as one recallable unit; demoed by dragging a fresh 130 BPM perc loop onto a new mixer track, opening Patcher, loading the "Sparkle" preset from its own preset browser, and immediately having both macro knobs available with zero rebuild. The direct parallel already documented on [[EffectRack]]: "hours of sound design saved as an audio-effect-rack chain becomes a recallable instrument in your palette." → [[EffectRack]], [[Sound Palette]]
- **The finishing move on the demo sample: a vocal loop, pitched up a minor 6th to fit the (guessed) B harmonic minor key of the source**, plus a heavy-drive delay with a counter-melody rhythm — "bring the drive up... let's go eighth notes, bring the mix pretty heavy" — and a half-time layered onto the delay's return specifically, as a separate finishing touch from the two chains built earlier in the video. *(general starting point — exact drive/mix values not given on screen)* → [[Delay]], [[Vocal Stacks and Ad-libs]]

## Routed to

- [[ValhallaVintageVerb]] — chorus-modulated reverb macro chain
- [[TAL-Chorus-LX]] — flanging-preset chorus stacked after reverb
- [[Portal]] — reinforced/generalized wash-out-chain pattern
- [[kHs Pitch Shifter]] — new Techniques section, octave-up pitch-shift macro
- [[EQ Eight]] — low-pass macro as a chain-closing "sparkle" control
- [[EffectRack]] — new Techniques bullet on the 1-2-knob custom-pedal design pattern
- [[Reverb]], [[Modulation]], [[Delay]], [[Pitch and Formant]], [[EQ]] — effect-type pages
- [[Plugin Wishlist]] — new use-case sub-bullets on Cableguys HalfTime and Waves SoundShifter
- [[Sparkle Texture Rack]] — new chain note (7 Effects) built from Chain 2
- [[FX Chain System]] — chain index registration

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=xwuodd40bug)
- Channel: loner
- Duration: 00:10:34
- Transcript source: captions (clean — spoken narration, no music-garble); a small number of plugin names are phonetically inferred from auto-captions and flagged medium-confidence above
- Full transcript: [[loner - this secret plugin will change the way you process your melodies!? (transcript)]]
