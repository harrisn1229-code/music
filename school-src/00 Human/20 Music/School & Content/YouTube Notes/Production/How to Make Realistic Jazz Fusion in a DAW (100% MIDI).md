---
type: yt-note
date: 2026-08-05
source: youtube
url: https://www.youtube.com/watch?v=OffDe0sEXH4
channel: Mind of Max
duration: "00:20:27"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, jazz-fusion, composition, mixing, reverb, midi-realism]
briefed: backlog
---

# How to Make Realistic Jazz Fusion in a DAW (100% MIDI)

![](https://www.youtube.com/watch?v=OffDe0sEXH4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=OffDe0sEXH4)

## Synopsis

Max Konyi (Mind of Max) breaks down how he wrote and produced a 100%-MIDI jazz fusion track (made in **Studio One**, a different DAW than Nate's Ableton Live — the techniques below are DAW-agnostic and mapped to Ableton where relevant) so convincingly that listeners couldn't tell it wasn't a real band. He frames realism as three simultaneous problems: **idiomatic composition** (notes/rhythm/structure that actually sound like the genre), **instrument choice and manipulation** (high-quality, expressively-programmed virtual instruments), and **mix realism** (psychoacoustic cues — mainly reverb — that put the "band" in a believable shared space). All instruments come from Acoustic Samples (physically-modeled trumpets/saxes/Rhodes/Wurlitzer/guitar/bass), mixed with FabFilter Pro-R2 and other third-party tools. The video ends with an A/B of the same composition using stock instruments and no mix realism — a useful demonstration of how much of "realness" lives outside the notes themselves. This is a dense, well-structured lesson on jazz fusion composition (groove/melody/harmony contrast between sections, parallel sus chords, secondary-dominant/tritone-flavored moves, chromatic descending harmony resolving to a Lydian-dominant chord) plus a genuinely reusable reverb-layering system for realism in any genre, not just jazz fusion.

## Techniques

**Composition — idiomatic jazz fusion (~2:00–8:30)**
- **Write drums first per section**, then melody against the groove, then harmonize last — the groove gives a physical, felt foundation the melody's rhythm can mesh with before any specific notes are chosen.
- **Every section needs its own groove, and neighboring sections should contrast** — a groove (kick/snare/hat pattern) gains its identity from what surrounds it; a triplet-groove breakdown that occurs exactly once in the whole song (never repeated) stands out as "a unicorn" precisely because it's unique and everything before it builds toward it.
- **Melody = "silhouette" first, notes second** — write the *contour and rhythm* of a melodic line before choosing specific pitches; the "shape" is what defines a melody's character, the exact notes come later and could "be a million different things" without breaking the identity.
- **Contrast governs melody too** — staccato/short-note melodies should be followed by long/sustained ones and vice versa; busy-note passages followed by sparse ones; a melody followed by no melody at all. Difference is what gives each part meaning.
- **Harmony ranges from simple diatonic to fully dissonant** — solid fundamentals worth knowing: extended diatonic chords, ii-V-I jazz movement, secondary dominants, tritone substitutions, modal interchange (borrowing chords from parallel modes), and **parallel chord-quality movement** (taking one exact chord voicing/quality and sliding it chromatically, unchanged in shape).
- **Worked example — parallel suspended-dominant chords:** the intro moves a 9sus4-type chord (G/A ≈ A9sus4) chromatically upward in exact parallel — A9sus4 → C9sus4 → D9sus4 → E♭9sus4 — before breaking the pattern with an E7/D (the V of the home key, A). This "slide the same chord-quality around chromatically" move is a genre-defining jazz-fusion harmonic device.
- **Worked example — descending chromatic bass under changing chord qualities into a Lydian-dominant landing:** going into the chorus, a descending chromatic bass line (A → G♯ → G → G♭) carries three different chord colors on top — E add9 first inversion → C major 7 second inversion → G♭ Lydian dominant — landing the progression on a Lydian-dominant chord for the genre's characteristic "wide, floating" color, before the first chord of the actual chorus.

**Virtual-instrument realism (~8:30–13:30)**
- **Physically-modeled instruments over pure samples where possible** — Max prefers physically-modeled VSTs (Acoustic Samples' trumpets, saxes, Rhodes, Wurlitzer, guitars, bass) over purely-sampled libraries because they're more flexible/playable, at the cost of occasionally slightly less-perfect articulation switches — the tradeoff favors expressiveness and ease of use.
- **Research the real instrument before writing for it** — range, idiomatic gestures (bends, chords, breath), what real players actually do with it — essential before trying to write realistically for an instrument you don't personally play.
- **Automate every exposed parameter, boldly** — a real instrument's tone/volume/vibrato/frequency balance is never static; expose and automate whatever the virtual instrument gives you control over (velocity/dynamics over time, vibrato speed, vibrato depth, note-pitch accuracy where available) — make *bold* choices, not safe/timid ones, because boldness is what reads as believability, not just "adds fun."

**Mix realism — the three-tier reverb system (~13:30–18:30)**
- **Dry out every instrument's baked-in room sound first.** Every virtual instrument/sample library tends to carry some room/reverb baked into the plugin or the samples themselves — leaving them all on stacks 14 different incompatible "rooms" on top of each other. Turn off/minimize each instrument's own room mic/ambience controls (Max uses Acoustic Samples' mic-placement/band-stand controls to get each instrument as dry and close as possible) so there's exactly one room left to add deliberately.
- **Build ONE primary "sound-stage" room reverb that every instrument sends to in differing amounts** — this single shared reverb is what creates the illusion of a real ensemble in a real space: front-to-back placement is controlled by how much of each instrument is sent to this room (plus pan and volume), creating a virtual stage the listener perceives as one coherent space. Used FabFilter Pro-R2, a modified "Studio B" preset, on this main room. → [[Reverb]]
- **Add ONE larger shared "hall" reverb any instrument can additionally reach into** — a bigger, more spacious secondary reverb (conceptually "outside" the main room) that many instruments can access for a shared sense of scale when a section needs to open up, while still reading as coherent because everyone blurs into the *same* larger space rather than each having their own.
- **Add specific "flavor" reverbs per special case (guitar, a vocal, a particular synth)** — these can be totally unrealistic; their job isn't ensemble cohesion but a specific tonal/textural effect — deliberately about separating a sound out, not blending it in.

## Sound/tone selection

- **Acoustic Samples' physically-modeled instrument line** (V-Horns trumpets, V-Reeds/saxes, Rhodes Mark I via V-Times, Wurlitzer, Sunbird acoustic guitar, Strategy electric guitar, Star Drums, J-bass) as the entire instrument set for a convincing jazz fusion band — no other instrument sources used in the whole track, demonstrating one well-chosen physically-modeled library can cover an entire ensemble. → [[Sound Selection Guide]]
- **FabFilter Pro-R2, modified "Studio B" preset** as the primary sound-stage reverb (owned: [[Pro-R 2]]).

## Routed to

- [[Production/Genres/Jazz Fusion|Jazz Fusion]] — new genre page: composition contrast principle, parallel-sus-chord and chromatic-descending/Lydian-dominant harmony moves, physically-modeled instrument choice, three-tier reverb system
- [[Reverb]] — three-tier reverb-layering-for-realism system, dry-the-baked-in-room-first tip
- [[Melody Writing]] — "silhouette" (contour/rhythm before pitch) added to the rhythm-first-melody section
- [[Rhythm and Groove]] — automate every exposed virtual-instrument parameter, not just drums, for expressiveness
- [[Suspended Chords]] — parallel chromatic sus-chord movement
- [[Chromatic Bass Lines|Chromatic Bass Lines]] — descending chromatic bass under changing chord qualities landing on a Lydian-dominant chord
- [[Borrowed Chords|Borrowed Chords]] — brief note on modal interchange as a jazz-fusion harmonic staple
- [[Sound Selection Guide]] — Acoustic Samples physically-modeled ensemble
- [[Plugin Wishlist]] — Acoustic Samples physically-modeled instrument line (unowned)

## Source

[How to Make Realistic Jazz Fusion in a DAW (100% MIDI)](https://www.youtube.com/watch?v=OffDe0sEXH4) · Mind of Max · 20:27 · captions (high confidence — clean, spoken, well-structured lesson) · transcript: [[How to Make Realistic Jazz Fusion in a DAW (100% MIDI) (transcript)]]

**Cross-DAW note:** made in Studio One; nothing in this breakdown is DAW-specific — composition, virtual-instrument programming, and reverb routing all map directly onto Ableton Live.
