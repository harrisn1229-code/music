---
type: yt-note
date: 2026-08-05
source: youtube
url: https://www.youtube.com/watch?v=gVE4e39aM7g
channel: Max Konyi
duration: "00:19:03"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, lofi, series, studio-one, drums, sampling, eq, reverb, groove]
briefed: backlog
---

# Drums | Studio One LoFi Tutorial | Part 3

![](https://www.youtube.com/watch?v=gVE4e39aM7g)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=gVE4e39aM7g)

## Synopsis

The longest and densest video in the queue — builds the whole drum part of the [[Make a Chill LoFi Beat in Studio One Part 1|lo-fi series]] from a custom sample kit through programming, mixing, and a snare-specific reverb send. Covers kit-building via one-shot sample search, per-sample envelope/gain/pan editing, choke groups, hi-hat filtering, velocity standardization, the signature "slugging"/drunken-drumming hi-hat feel played by hand, multi-output routing for individual drum control, a drum-bus lo-fi EQ filter, and a fully worked snare reverb send. This is the single richest source video in the batch for both the [[2 Drums Group|Drums]] chain family and the lo-fi genre's groove identity.

## Techniques

### Kit building
- **Build a custom drum kit from one-shot samples, not loops** — in the sampler, search the built-in library filtered to "One Shot" (not full loops) by drum type (kick, snare, hat, crash…), audition, and drag chosen hits onto keys to build a kit from scratch. Same idea in Ableton: Drum Rack / Simpler populated one sample at a time from the browser. → [[Sampling and Sound Selection]]
- **Layer two kicks with different envelope shaping, choked together.** Primary kick: amp envelope tightened (hold ~32 ms, decay ~848 ms) so it's punchier and less boomy. Secondary kick: gain pulled down ~8.6 dB, decay ~897 ms, and — the key move — **attack faded in ~4.3 ms** because the raw sample's attack was "too punchy and clicky" for the song; softening the attack makes the layer blend rather than fight the primary kick. Both kicks are placed in a **choke group** so triggering one cuts the other, exactly like a real kick drum can't sound twice at once. → [[1 Drums Kick Track|Drums Kick Track]] (Ableton equivalent: Simpler/Drum Rack choke groups)
- **Snare gain/decay trim to sit in the kit** — gain down ~7.2 dB, decay shortened to ~1.45 s so it doesn't ring over the rest of the pattern.
- **Small panned "poppy/glitchy" texture hits as ear candy** — two secondary percussion one-shots, each turned down (~−15.3 dB and ~−10.8 dB) and panned hard-ish left/right (~40L / 40R) so they read as a subtle side-to-side flicker; used once in the whole loop, purely textural. → [[Ear Candy and Hiding Synths]]
- **Alternating hard/soft hi-hat samples, high-passed identically, to fake one physical hat.** Two hi-hat one-shots: the "hard" hit boosted +2.1 dB, both hits **high-passed (12 dB/oct ladder-style filter) at ~1.85 kHz** to remove low junk and read as "clean and unobtrusive." Alternating a harder and softer sample for the same instrument is what simulates a single physical hi-hat being struck at different velocities/positions. → [[1 Drums Hat Track]]

### Programming and feel
- **Different quantize treatment per drum voice within the same pattern**: snares quantized hard (must land exactly on their division), kicks quantized only on the bar's downbeat (the "1"), everything else left loose/human — either played and kept, or nudged by hand to taste. A concrete example of "not everything shifts together" from [[Pocket and Microtiming]].
- **Velocity standardization by drum role** — select all snares and snap them to one velocity (~80%) by holding a modifier while dragging the velocity lane; do the same for the primary kick only (not the softer secondary layer, which stays intentionally quieter/looser). A deliberate choice to standardize rather than humanize on these two elements specifically, contrasted with leaving hats more variable.
- **"Slugging" / drunken-drumming hi-hat feel, played by hand, not quantized.** Term borrowed from gospel drumming (aka "drunken drumming" — the lo-fi hi-hat lurch): the off-beat 8th-note hi-hat hit lands **slightly late**, not exactly on the grid, creating a lurching feel "so prevalent in Lo-fi and so many modern genres." Max plays it by hand specifically because the human sloppiness IS the vibe, then only nudges hits that sound clearly wrong afterward — same manual, ear-first correction approach from [[Piano Chord Progression Studio One LoFi Tutorial Part 2|Part 2]]. → [[Pocket and Microtiming]], [[Rhythm and Groove]]
- **Quantize the velocity, then re-humanize it with a small random spread.** After manually playing the alternating hi-hats, select the "hard" hits and force them all to one velocity (~75), then the "soft" hits to another (~60) — same standardization move as the kick/snare above — then run **Humanize** (Ctrl+H in Studio One) on just the velocity parameter (note-start left untouched since the timing was already deliberately placed) with a small spread (~5–8%) to reintroduce natural micro-variation without undoing the standardization. A two-step "lock it, then loosen it a little" workflow, distinct from either pure quantize or pure raw performance.
- **Tiny end-of-loop drum fill as a loop-boundary signal** — a quiet extra hit plus the two panned glitch pops (see above) dropped right at the end of the bar, deliberately subtle ("not even really going to be that perceivable"), just enough motion to signal the loop is about to restart.

### Mixing
- **Route each drum voice to its own output channel** (kick → its own channel, snare → its own, hats → its own, rest → a shared "percussion" channel) instead of leaving everything on one sampler output — enables independent EQ/level/processing per voice and per-voice sends later (used here specifically to put reverb only on the snare and to set up kick sidechain triggering, covered in [[Final Mix & Master Studio One LoFi Tutorial Part 9|Part 9]]). Direct Ableton equivalent: Drum Rack per-pad outputs to separate tracks, or Simpler instances per drum on separate tracks.
- **The signature lo-fi drum-bus filter: narrow-band the whole kit.** On the drum bus: **low cut 40 Hz at 24 dB/oct** (removes sub-rumble from the kick to leave room for the actual sub-bass) and **high cut down to 2 kHz at 24 dB/oct** (removes top end from the whole kit) — this single EQ move is described as making the kit sound noticeably "more lo-fi" on its own. → [[EQ]], [[3 Drums Bus|Drums Bus]], [[Neo-Soul - Lo-fi]]
- **Compensate individual elements after a drum-bus low-pass** — since the bus-wide high cut removes top end from everything including the hats, boost the hats back up (~+4 dB) post-filter so they still cut through; conversely pull the kick down a touch (~−4 dB) if it's hitting harder than the rest of the (now darker) kit. Also pan the hi-hat off-center for stereo separation once it's more audible.
- **Snare-only reverb send, tuned so the tail just clears before the next hit.** Room reverb on its own send (not the drum bus's own reverb routing — deliberately re-routed to the drum bus rather than the instrument bus so soloing drums doesn't silence it): **medium hall** (not large — changes the early/late reflection balance), **length pulled down** so the tail finishes right around when the next snare hits (~2.7 s in the final mix balance), **low reflectivity** for a smoother (less fluttery) tail, **population knob pulled low** for more low end presence in the tail (fewer reflective surfaces = thinner-sounding room = more apparent low end), **high-quality mode** enabled (lengthens the tail slightly, worth compensating for), and a **short pre-delay** to keep the snare's transient separated from the reverb wash rather than smearing into it. Final send level buried around **−20 to −22 dB** — "I don't want anyone to be thinking that there's a Reverb on the snare, I just want it to be there and be filling out the space." → [[Reverb]], [[1 Drums Snare-Clap Track]]

## Routed to

- [[1 Drums Kick Track|Drums Kick Track]] — dual-kick choke-group + softened-attack layering technique woven in
- [[1 Drums Hat Track|Drums Hat Track]] — alternating hard/soft hat + HPF ~1.85kHz + post-filter gain boost woven in
- [[2 Drums Group|Drums Group]] / [[3 Drums Bus|Drums Bus]] — signature lo-fi drum-bus HPF 40Hz/LPF 2kHz filter woven in
- [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] — snare reverb send recipe added
- [[EQ]] — lo-fi drum-bus band-limiting recipe added to From videos
- [[Reverb]] — snare send-tuned-to-decay-before-next-hit technique added to From videos
- [[Pocket and Microtiming]] — "slugging"/drunken-drumming hi-hat lo-fi swing bullet added to From videos
- [[Neo-Soul - Lo-fi]] — drum-bus filter recipe + kit-building notes added to From videos
- [[Sampling and Sound Selection]] — one-shot kit-building method cross-referenced (no direct edit; existing page already covers sample-based kit assembly at this depth)
- [[Ear Candy and Hiding Synths]] — panned glitch-pop texture hits cross-referenced (light touch, same principle already well covered there)

## Source

[Drums | Studio One LoFi Tutorial | Part 3](https://www.youtube.com/watch?v=gVE4e39aM7g) · Max Konyi · 19:03 · captions (high confidence — clean, single-speaker tutorial narration, some numeric values slightly garbled by the transcript but internally consistent enough to trust; flagged inline where a number was ambiguous) · transcript: [[Drums Studio One LoFi Tutorial Part 3 (transcript)]]

**Series note:** [[Piano Chord Progression Studio One LoFi Tutorial Part 2|← Part 2]] · [[Bass Synth and Bassline Studio One LoFi Tutorial Part 5|Part 5 →]]. Studio One's Impact sampler and its specific choke-group UI are the only DAW-specific mechanics here — everything else (multi-output routing, choke groups, per-voice sends, bus filtering) maps 1:1 onto Ableton's Drum Rack + Simpler + Group/Return tracks.
