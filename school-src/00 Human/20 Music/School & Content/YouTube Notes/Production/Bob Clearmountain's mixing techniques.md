---
type: yt-note
date: 2026-08-12
source: youtube
url: https://www.youtube.com/watch?v=CN6cYkvd__8
channel: Mix with the Masters
duration: 00:09:09
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mixing, reverb, delay, parallel-compression, sample-layering]
briefed: backlog
---

# Bob Clearmountain's mixing techniques

![](https://www.youtube.com/watch?v=CN6cYkvd__8)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=CN6cYkvd__8)

## Synopsis

A short Mix with the Masters console demo with Bob Clearmountain (Bruce Springsteen, The Rolling Stones, David Bowie's *Let's Dance*, Roxy Music's *Avalon*), working a studio recording of Squeeze's "The Knowledge" (from the same-titled album) rather than one of his many live mixes — deliberately chosen, per Bob, because a studio track shows off processing more usefully than a live one. Two threads run through the video: a tour of the reverb/delay tool he co-designed with Apogee — a real hardware/software hybrid built from a curated library of both algorithmic spaces and physically-captured real-world rooms — and a hands-on A/B/C demo of parallel compression + EQ on a snare drum, plus quick before/after moves on the kick and overheads. It's short and demo-driven rather than settings-heavy, but every move shown is concrete: named reverb presets and what's actually inside each one, an explicit parallel-compression signal path (1176 + Pultec EQP-1A blended under the dry snare), a sample layered onto a dull kick, and a genuinely reusable aux-send trick (crossing a mono source's send into the opposite side of a stereo effect for a bouncing delay) that Bob states explicitly works identically in the box.

## Techniques

- **Reverb/delay preset tour on a lead vocal, dry-vocal-first A/B: St. Joseph's Church (a very long tail), the Castle de Haar (same family, with a bit of pre-delay added), the Apogee Studio (a plain "ambiance" rather than a discrete verb), and "Clearmountain's Domain" itself — a quarter-note delay preset Bob built deliberately to evoke the sound of Roxy Music's *Avalon*, an album he mixed.** → [[Reverb]] (effect), [[Delay]] (effect), [[Depth and Space]]
- **A dedicated "Rolling Stones — Live" preset, reached for specifically when mixing Rolling Stones concert video, and mixed in surround so the effect lands in the rear speakers rather than the front stereo image** — a reminder that a mix engineer's presets can be tied to a specific recurring client/format (surround video mixes) as much as to a sonic goal. → [[Reverb]] (effect), [[Width and Stereo]]
- **The reverb tool exposes three simultaneous reverb "slots," and the third slot's preset list is a personally-curated library of real, physically-captured rooms rather than only algorithmic models — a direct real-world example of the "record your own space as an IR" convolution technique.** Named captures: a CONCRETE STAIRWELL found in Beverly Hills, a MARBLE BATHROOM sampled inside a theater, a shower in Bob's own shop ("Mix This! SHOWER" — explicitly kept despite being, in his words, "not the greatest sound in the world, but interesting"), and the ROSCOE CHAMBER — a friend's studio chamber that happened to sound great, sampled with permission. All captured personally by Bob and "Roger from Apogee." Confirms this vault's existing convolution-IR advice (record a transient in any real space, load it as an impulse response) with a working mixer's actual habit: build a permanent personal library of odd/interesting captured rooms, not just the "good" ones — a mediocre-sounding shower still earns a place because it's *distinctive*. → [[Hybrid Reverb]], [[Reverb]] (effect), [[Sampling and Sound Selection]]
- **A dedicated GATED PLATE preset — a chamber deliberately gated — built specifically to recreate the "Born in the U.S.A." snare sound, and reused on the horns for David Bowie's "Let's Dance."** Bob frames gated reverb as an '80s-defining move that's fallen out of fashion but "might come back." Same underlying mechanism this vault already documents from the origin-story side (a talkback mic's built-in compressor + noise gate, accidentally left on during a Phil Collins drum take — see [[Zach Scholz - How the 80's Sound Was Built (And How to Recreate it Today)]]) — here confirmed as a still-in-use, named preset on a working mixer's own reverb unit decades later, reused across two completely different sources (snare AND horns), not a one-off drum trick. The real hardware unit behind this era of gated-reverb sound (AMS RMX16) is already queued, unbuilt, on [[Vintage Gear Worklist]]. → [[Reverb]] (effect), [[Compression]] (effect), [[Vintage Gear Worklist]]
- **Parallel compression on a snare, demonstrated as a genuine A/B/C: dry snare → EQ-only pass (a bit of top end, boost ~700 Hz, a bit of low end — "what I usually kind of do") → compressed pass (1176-family FET compressor + Pultec EQP-1A EQ) → the two blended together.** Explicit framing: "you get a little bit of the natural sound but you get that compression" — textbook parallel comp, not a serial insert. A named specific benefit beyond density/punch: on a rolled/rudimented snare passage, the parallel-compressed layer specifically brings up the quieter in-between/ghost notes of the roll along with the main hits, not just the accented ones. → [[UAD UA 1176LN]], [[UAD Pultec EQP-1A]], [[Parallel Processing]], [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]]
- **A second snare-adjacent signal (the "underneath"/bottom mic) described as "pretty nasty-sounding" raw, fixed with a lot of top end plus a scoop-then-restore midrange move — cut midrange out, then add some of it back in, specifically for brightness rather than body.** A concrete example of subtractive-then-additive EQ sequencing on one signal rather than a single static boost/cut pass. → [[EQ]] (effect), [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]]
- **A dull, "cardboard"-sounding raw ("live") kick fixed with a layered sample — adds punch to the overall hit and "a little point" to the low end specifically, described and demoed as a direct before/after A/B.** A plain, concrete confirmation of sample-reinforcement-for-a-weak-kick, from a mixer working someone else's already-tracked recording rather than his own production. → [[Kick Design]], [[Sound Selection Guide]], [[1 Drums Kick Track|Drums Kick Track]], [[Layering and Stacking]]
- **A small "add a little top end to the overhead" move**, mentioned in passing as part of the same drum pass — no further detail given. → [[EQ]] (effect)
- **Instrumentation note for context (song-specific, not a reusable rule): tenor guitar plus two acoustic guitars panned hard left/right, and a pedal steel.** → (no processing detail beyond the reverb/delay trick below)
- **A stereo "bounce" trick on the pedal steel: send the (panned-left) pedal steel into the RIGHT side of "the Domain" reverb/delay, with a bit of "Spin" added — crossing which side of a stereo effect a mono/panned source feeds produces a delay that bounces audibly left-to-right rather than sitting still on one side.** Stated explicitly as workflow-agnostic: "that's the advantage, it makes it easier if you're sending it off an aux send, and including In The Box. If I was mixing In The Box I'd do it the same way" — the same crosswired-send routing works identically whether the reverb/delay is outboard hardware fed by a physical aux send or a plugin fed by an Ableton send, confirming sends vs. inserts doesn't change how this specific stereo trick is built. → [[Delay]] (effect), [[Width and Stereo]], [[Stereo Field]]

## Routed to

- [[UAD UA 1176LN]] — parallel-comp snare technique added to Techniques
- [[UAD Pultec EQP-1A]] — the 700 Hz + low-end EQ move added to Techniques
- [[Parallel Processing]] — the dry/EQ/compressed A/B/C snare demo added to From videos
- [[Reverb]] (effect) — preset tour, the captured-room library, and the gated-plate history added to From videos
- [[Delay]] (effect) — the "Domain" quarter-note *Avalon* reference and the crosswired-send bounce trick added to From videos
- [[Kick Design]] — the dull-kick sample reinforcement added to From videos
- [[Sound Selection Guide]] — the same kick fix added to the Drums/Kick section
- [[1 Drums Snare-Clap Track|Drums Snare-Clap Track]] — inline parallel-comp note added to §3, plus a From videos bullet
- [[1 Drums Kick Track|Drums Kick Track]] — From videos bullet for the sample reinforcement
- [[Production/Plugin Wishlist|Plugin Wishlist]] — Apogee's "Clearmountain's Domain" added (unowned)

## Source

- 📺 [Bob Clearmountain's mixing techniques](https://www.youtube.com/watch?v=CN6cYkvd__8) — Mix with the Masters, 00:09:09
- Transcript: captions, high confidence (spoken narration over silent-in-transcript demo audio, transcribes cleanly) — [[Bob Clearmountain's mixing techniques (transcript)]]
