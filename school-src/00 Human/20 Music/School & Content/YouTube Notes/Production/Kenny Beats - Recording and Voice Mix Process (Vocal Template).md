---
type: yt-note
date: 2026-07-16
source: youtube
url: https://youtu.be/X_iDENABLmk
channel: fliko (Kenny Beats Twitch clips)
duration: "00:37:43"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, vocals, recording, template, mixing]
swept: 2026-07-19
briefed: backlog
---

# Kenny Beats — Recording & Voice Mix Process (the Vocal Template)

![](https://youtu.be/X_iDENABLmk)
📺 [Watch on YouTube](https://youtu.be/X_iDENABLmk)

## Synopsis

The full 2020 walkthrough of Kenny's Ableton vocal template — the one he built by copying Alex Tumay's (Young Thug's engineer) Pro Tools template and has used on ~150 released songs. Covers the whole architecture (beat track → tracking track → verse/hook groups → sends), the tracking chain device-by-device with reasons (Gate → channel EQ → 2A as peak reduction → de-esser), the send bank (2 reverbs + 4 delays + subtle doubler, delays sidechain-ducked to the vocal), Pro-Q phase-mode discipline, the CLA Vocals "sound-good-izer" that stays OFF until the song is done, and the workflow philosophy: record vocals in a separate session from the beat, and learn to engineer because it's the skill that gets your beats cut. The origin story of the exact architecture Nate's vocal chains already use.

## Techniques

### Template architecture
- **Beat = a 2-track bounce on the top track, with NOTHING on it** — and never put a limiter/mastering chain on beats you'll record vocals over (or send out): a smashed beat leaves no room, vocals fight the snare, and artists push their voice or pass on the record. Get loudness from gain-staging into the red *early in the chain*, keep the master empty. → [[Gain Staging]], [[Master Chain]]
- **Record vocals in a separate session from the beat** — bounce the beat and track vocals against the 2-track: CPU stays fast at low buffer, and the bounce is psychologically *final* — "imperfections you were gonna fix end up making the song." → [[Latency-Free Tracking]], [[Referencing and Translation]]
- **One tracking track; keepers get dragged to dry verse/hook tracks; THE GROUP HAS THE CHAIN** — his mantra, repeated until chat chants it: nothing on any vocal track, one chain on the group, so a line punched in 30 minutes apart sounds identical, and all level/reverb changes happen in exactly one place. (This is precisely Nate's [[2 Main Vocal Group|Main Vocal Group]] convention.) → [[2 Main Vocal Group|Main Vocal Group]], [[3 Vocal Bus|Vocal Bus]]
- **Sends shared by ALL vocal tracks** — mains and ad-libs run through the *same* reverb/delay returns so the whole stack sits in one space. → [[FX Chain System]] routing model, [[Reverb Send Room]]

### The tracking chain (Tumay chain, all-Waves for portability)
- **[[Gate]] first** — set low, kills room noise/chip bags between phrases even in an imperfect booth. → [[1 Main Vocal Track|Main Vocal Track]]
- **Channel EQ second** — low cut + small high raise "because people's voices just don't punch enough"; calibrated to his mic/room, adjusted per voice. → [[1 Main Vocal Track|Main Vocal Track]]
- **LA-2A-style third, as PEAK REDUCTION not tone** — brings the loudest word toward the quietest, GR needle "never past 7, 10 is really pushing it" on screams; doesn't color, so screamers still sound like themselves in the cans. Owned: [[UAD Teletronix LA-2A]] at tracking, [[LALA]]/[[Pro-C 2]] in the box. → [[1 Main Vocal Track|Main Vocal Track]], [[Compression Staging]]
- **De-esser last (Waves, "hill" sidechain curve, male preset or Pensado hook setting)** — always the dome/bell sidechain shape, switch male/female presets per voice. Owned: [[Pro-DS]] Male preset. → [[1 Main Vocal Track|Main Vocal Track]]
- **Turn OFF the Analog (and Lo-Fi) button on every Waves plugin** — "it's just noise" pretending to be vintage warmth; audition-off first on any character switch a plugin ships enabled. → [[Gain Staging]]

### Sends & mixing
- **Long reverb recipe: Valhalla Room, 3.0 s decay, 100% wet on the return, ~90% depth, EQ curve on the return channel** — and the dial-in scale (send level in his template): Travis-style washed ad-libs ≈ heavy send, main-vocal wet ≈ moderate, "pretty much dry" ≈ barely cracked. Short reverb = body only, "you don't really hear it." → [[Reverb Send Long]], [[ValhallaRoom]]
- **EQ ON the delay/reverb return, after the effect** — band-limit every return or the tails get hectic (the [[FX Chain System]] 100%-wet + band-limited rule, confirmed from the source that popularized it). → [[Delay Send Slap]], [[Reverb Send Long]]
- **Delays sidechain-duck to the main vocal** — a compressor on the delay returns keyed from the lead: tails tuck while words happen, bloom in the gaps. → [[Sidechaining]], [[Delay Send Other]]
- **Doubler at ~20% on everybody** — not to sound doubled or wide, just "a little bigger"; subtle enough you can't point at it. Owned: [[Doubler2]] low-mix. → [[1 Double Vocal Track|Double Vocal Track]], [[Doubler2]]
- **[[Pro-Q 4]] phase-mode discipline: Zero Latency while tracking → Natural Phase when mixing** — zero-latency = fast for performers; natural phase = better-sounding cuts once the takes are in (linear phase "even crazier but doesn't always work right"). Flip it as the last recording ends. → [[Pro-Q 4]], [[Latency-Free Tracking]]
- **The "sound-good-izer" stays OFF until the song is done** — CLA Vocals at the chain's end (bass module a touch + light compress, treble/verb/delay OFF): it makes the vocal loud *and* lets the beat come up, but it adds latency and too much character while tracking, and artists get used to it. Toggle it on when the record is finished, then re-trim. Owned equivalents: [[Oxford Inflator]]/[[Saturn 2]] as the last-mile lift. → [[1 Main Vocal Track|Main Vocal Track]], [[3 Vocal Bus|Vocal Bus]]

### Philosophy
- **Producers should engineer** — the template exists so "your favorite rapper hits you, no engineer available" is never the reason a song dies; you keep the files, comp the takes, catch the better third take, and control the record. UFC framing: cover your blind spots. → [[Latency-Free Tracking]], workflow
- **Producer tag lives IN the template, warped** — his tag sits time-warped (complex mode) in the vocal template, not in beats — tags mark *songs*, not beats.

## Routed to

- [[1 Main Vocal Track|Main Vocal Track]] — tracking-chain order + peak-reduction 2A + sound-good-izer discipline (inline + From videos)
- [[2 Main Vocal Group|Main Vocal Group]] — "the group has the chain" (From videos)
- [[3 Vocal Bus|Vocal Bus]] — last-mile lift discipline (From videos)
- [[Reverb Send Long]] — Valhalla Room 3s/100/90 recipe (From videos)
- [[Delay Send Slap]] / [[Delay Send Other]] — return EQ + sidechain duck (From videos)
- [[Pro-Q 4]] — zero-latency ↔ natural-phase workflow (Techniques)
- [[Doubler2]] — 20% always-on body double (Techniques)
- [[ValhallaRoom]] — vocal long-verb recipe (Techniques)
- [[Gate]] — tracking-first gate role
- [[Gain Staging]] — no-limiter-on-beats + analog-button-off (From videos)
- [[Plugin Wishlist]] — Waves CLA Vocals (to vet)

## Source

[Kenny Beats — Explaining His Recording / Voice Mix Process (LIVE 03/21/20)](https://youtu.be/X_iDENABLmk) · fliko (Twitch clip) · 37:43 · captions (clean, spoken; some stream chatter trimmed) · transcript: [[Kenny Beats - Recording and Voice Mix Process (Vocal Template) (transcript)]]
