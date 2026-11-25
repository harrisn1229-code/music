---
type: yt-note
date: 2026-08-11
source: youtube
url: https://www.youtube.com/watch?v=Ngz_fZraTP4
channel: loner
duration: "00:08:04"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, vintage, 60s, beatles, guitar, bass, sampling]
briefed: backlog
---

# these 1960’s production secrets will change the way you make samples!?

![](https://www.youtube.com/watch?v=Ngz_fZraTP4)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=Ngz_fZraTP4)

## Synopsis

A from-scratch recreation of a 1960s/70s psychedelic-rock "sample" built to sound like a genuine period recording — loner's stated hook is that psych rock keeps getting sampled 50+ years later (Travis Scott used it twice on *Rodeo*, Kanye sampled it on one of his most iconic songs, Rihanna covered a Tame Impala song directly influenced by it), so the video reverse-engineers *why* the era's records sound the way they do and rebuilds one part-by-part: guitar (Fender Stratocaster, amp-sim + pedals + ADT + Abbey Road chamber reverb + vintage-mic emulation + hard panning), bass (Höfner 500/1 violin-bass replica, finger-picked and muted, Fender Bassman replica + heavy compression), flute (Jethro Tull-inspired, an Orange Tree Samples Kontakt bank), vocals (double-tracked, pushed back in the mix, plus a direct recreation of the Beatles' backwards-through-a-Leslie "Blue Jay Way" trick), and drums (a Ludwig Oyster Black Pearl kit replica in Addictive Drums 2, deliberately humanized/de-gridded). The closing synthesis is three general lessons: **dramatic hard-panning fills both sides of the stereo field and makes a mix feel full**, **do the historical research on what the actual period gear could and couldn't do** (the video's own example: many vintage mics rolled off around 100 Hz, and applying that roll-off — especially to the bass — made the whole sample read more natural/vintage), and **be willing to experiment** (the reverse-vocal trick was avant-garde/"unheard of" when the Beatles did it in 1967 — there are no real rules). Nate owns the *exact* two lead instruments demonstrated — a Fender Stratocaster and a Höfner B-Bass H-Series (the same "violin bass" silhouette) — so this video maps unusually directly onto real gear already in the studio, not just plugin equivalents.

## Techniques

### Guitar (Fender Stratocaster)
- **Research the actual period gear before building the tone, then use the real instrument if you own it** — confirmed the Fender Stratocaster was commonly used by the Beatles, Pink Floyd, etc. on psych-rock records, and used a real Stratocaster for the guitar part rather than a sampled/VST guitar. Nate owns the exact instrument: [[Fender Stratocaster]].
- **Amp-sim recipe: "British guitar A1" amp model, Drive-voiced, "Wide Large" cabinet preset, room reverb turned OFF (added separately later in the chain)** — built with Stark (Klevgrand, unowned — see [[Plugin Wishlist]]); the reverb-off choice is deliberate so a dedicated reverb stage (Abbey Road Chambers, below) does that job instead of the amp sim's own room model.
- **The pedal matters more than the amp for the psychedelic character** — explicitly stated: "more important than the amps in achieving this psychedelic sound is the guitar pedals used." The one pedal added (inside Stark's own pedalboard) was a **vibrato**.
- **Artificial Double Tracking (Waves Real ADT) used to widen a GUITAR, not a vocal** — a use case outside ADT's usual vocal-doubling role; see [[Artificial Double Tracking (ADT)]] for the general technique and owned equivalents ([[Doubler2]] / [[MicroShift]]).
- **Abbey Road Chambers (Waves) reverb, chosen specifically because the reference records were tracked at Abbey Road Studios** — a historically-motivated reverb pick, not just "a nice-sounding plate/chamber."
- **Tape delay (Arturia) added after the reverb**, then **a compressor "just to tighten the sound up"** — general starting point, no exact time/feedback/ratio given.
- **Vintage-mic emulation to compensate for period mic quality: Waves King's Microphones, "King George V" model, 3rd preset** — explicit reasoning: "the microphones weren't of the quality that they are today, so the King's Microphone helps emulate that."
- **Finishing EQ: cut the low end, boost some of the highs.**
- **Hard-pan the guitar to one side and collapse it almost fully to mono** — panned right, made "almost fully mono." Ties into the video's closing lesson (below) that dramatic hard-panning of individual instruments — not stereo-widening them — is what fills out a psych-rock mix.
- New chain note built from this + the bass recipe below: [[Beatles Psych-Rock Sample Chain]].

### Bass (Höfner 500/1 violin bass)
- **Real instrument again where owned: the Höfner 500/1 "violin bass" (McCartney's bass) — recreated here with a plugin replica ("Moto Bass," near-certainly IK Multimedia MODO Bass) since a hardware Höfner wasn't on hand for this build.** Nate owns the actual instrument: [[Hofner B-Bass H-Series]].
- **Play-style setting: finger-picking, muted 100%** — the muted/damped setting specifically was judged to sound best for the period tone (the short, thumpy McCartney decay rather than a ringing sustain).
- **Amp: a Fender Bassman replica (AmpliTube), because the Beatles used real Fender Bassman amps on their bass parts.**
- **Heavy compression via Waves CLA-76**, described as needed "to heavily compress it" alongside the guitar.
- New chain note: [[Beatles Psych-Rock Sample Chain]].

### Flute (Jethro Tull-inspired)
- **Genre research led to a specific reference band, not a generic "flute sound"** — Jethro Tull (British, formed in the 60s) is the named influence for using a flute as a lead voice in a rock context; the specific instrument targeted was "the long silver concert flute."
- **Source: the "Passion Flutes" Kontakt bank by Orange Tree Samples** — loaded in owned [[Kontakt 7]] as the playback engine (the library itself is unowned, see [[Plugin Wishlist]]).
- **Processing: heavy compression, a very short reverb, and an EQ cutting some low end and a little high end** — mirrors the guitar's EQ move (cut lows, though here also trimming a touch of top rather than boosting it).
- **Hard-pan opposite the guitar (panned left, guitar panned right) and made almost completely mono** — the L/R split between guitar and flute is the concrete example of the video's "fill both sides" panning lesson.

### Vocals
- **Double takes: record the vocal twice, aiming to match the second take to the first as closely as possible** — sourced from "looking on Reddit, doing some research" into what people say defines the 60s vocal sound; this is a **real double**, not an ADT/doubler fake, distinct from the guitar's ADT-widening move above. → [[Artificial Double Tracking (ADT)]] (the width hierarchy: a real double still beats a fake one).
- **EQ cutting both low end and high end on the vocal**, plus **pushing the vocal back in the mix** — a level/space move noticed as common across period vocal recordings, not just an EQ choice.
- **Reverb: Abbey Road Chambers again** (same plugin as the guitar) **+ compression + a plugin called "Speakers"** (AudioThing Speakers, a mic/speaker-simulation plugin — unowned, see [[Plugin Wishlist]]) for extra vintage/telephone-adjacent color.
- **The Beatles' "Blue Jay Way" trick, recreated directly: bounce the vocal, reverse it, then chop two short reversed sections back into the arrangement to lead into the main vocal, finished with a phaser and a vintage-style reverb.** The original Beatles technique (per the video) was to record the entire song backwards through a Leslie speaker, then chop parts of that reversed pass to lead into sections of the forward song — loner's version keeps the same "reverse, chop, splice back in as a lead-in" structure but applies it just to the vocal rather than the whole mix, using **[[Phaser-Flanger]]** and **[[ValhallaVintageVerb]]** on the reversed sections. Framed in the video's closing thoughts as proof the era was genuinely experimental — "unheard of" when the Beatles did it. → [[Reverb]], [[60s - Beatles]].

### Drums (Ludwig Oyster Black Pearl)
- **Real-kit research again: the Beatles famously used the Ludwig Oyster Black Pearl kit — recreated via a replica of that kit inside Addictive Drums 2** (unowned, see [[Plugin Wishlist]]).
- **Deliberately simple pattern: snares hitting normally, kicks spaced out.**
- **Humanization: notes pushed back off the grid randomly, "here and there," for a more natural feel** — a manual/randomized timing nudge rather than a fixed groove template. → [[Pocket and Microtiming]].
- **Two EQ passes named: "this EQ from Waves"** (unidentified specific Waves EQ, not confidently named on screen) **and a second EQ cutting high end and cutting low end.**

### Arrangement
- **Structural edit as a final step, not a mixing move: highlight/select the vocal region and move it later so there's an instrumental section before the vocal enters** — a simple arrangement edit (create a vocal-free intro passage, then let the vocal come in) done as the last stage of the build. → [[Arrangement and Song Form]].

### Closing lessons (stated directly in the video's outro)
1. **Dramatic hard-panning, not stereo-widening, is what makes a psych-rock mix feel full** — "as long as you fill both sides with different things it creates a full mix." Demonstrated concretely by the guitar (hard right) vs. flute (hard left) placement above. → [[Width and Stereo]], [[60s - Beatles]].
2. **Research the actual period gear's real limitations, not just its "vibe"** — the concrete payoff example given: many vintage microphones had a natural roll-off around 100 Hz, and applying that roll-off to the sample (especially the bass) gave it "so much more of a natural feel." → [[EQ]], [[Vintage Gear Worklist]].
3. **Be willing to experiment — the era's most memorable tricks (the reverse-vocal/Leslie move) were genuinely avant-garde when they were first done**, not safe, proven techniques; there's no fixed rulebook.

## Routed to

- [[Fender Stratocaster]] — Techniques section added (real-gear match: the exact guitar demonstrated)
- [[Hofner B-Bass H-Series]] — Techniques section added (real-gear match: the exact bass demonstrated)
- [[Kontakt 7]] — Passion Flutes Kontakt-bank source
- [[ValhallaVintageVerb]] — reversed-vocal Blue Jay Way trick
- [[Phaser-Flanger]] — reversed-vocal Blue Jay Way trick
- [[Artificial Double Tracking (ADT)]] — ADT applied to guitar (new use case) + real vocal doubles
- [[Width and Stereo]] — hard-pan/mono "fill both sides" lesson
- [[Pocket and Microtiming]] — humanized/randomly-pushed drum timing
- [[EQ]] — vintage-mic 100 Hz roll-off lesson
- [[Reverb]] — Blue Jay Way reverse-vocal recreation
- [[Arrangement and Song Form]] — vocal-in arrangement edit
- [[60s - Beatles]] — genre playbook, new "From videos" section
- [[Sound Selection Guide]] — guitar/bass/flute/vocal/drum sound picks
- [[Plugin Wishlist]] — Stark (new use case), AmpliTube (new use case), Addictive Drums 2 (new use case), Waves Real ADT, Waves Abbey Road Chambers, Arturia Tape Delay, Waves King's Microphones, Waves CLA-76, IK Multimedia MODO Bass, Orange Tree Samples Passion Flutes, AudioThing Speakers
- [[Beatles Psych-Rock Sample Chain]] — new chain note

## Source

- **Video:** [these 1960's production secrets will change the way you make samples!?](https://www.youtube.com/watch?v=Ngz_fZraTP4) — loner, 00:08:04, published 2022-06-12
- **Transcript:** captions, good confidence (a spoken breakdown, not a music-heavy passage — transcribes cleanly; a handful of plugin/product names are garbled by auto-caption, e.g. "Stark by Cleve Grand" → Stark by **Klevgrand**, "moto bass" → likely **MODO Bass**, "defender baseman" → **Fender Bassman**, "jetro tol" → **Jethro Tull**, "abbiro chambers" → **Abbey Road Chambers**, "orangetree samples" → **Orange Tree Samples**). Full transcript: [[loner - these 1960’s production secrets will change the way you make samples!? (transcript)]]
