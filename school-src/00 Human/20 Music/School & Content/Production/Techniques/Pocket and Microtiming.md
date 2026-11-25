---
type: technique
title: Pocket and Microtiming
tags: [technique, rhythm, groove, pocket, timing, production]
created: 2026-08-03
---

# Pocket and Microtiming

**Where you sit relative to the grid — and why a few milliseconds is the difference between a beat that moves and one that doesn't.**

[[Rhythm and Groove]] covers the *mechanics*: swing settings, groove templates, humanization, quantize amount. This page covers the *judgment* underneath them — what pocket is, which direction to push, and why. Theory side: [[Time Signatures & Note Values]] and [[Syncopation and Metric Displacement]].

## What pocket is

**Pocket is where a part sits relative to the grid, consistently, on purpose.**

Not "tight" — tight is a separate axis. A part can be perfectly consistent and sit 15 ms behind the beat, and that's a deep pocket. A part that's randomly early and late is not in a pocket, it's just loose.

Three positions:

| Position | Feel | Where it lives |
|---|---|---|
| **Behind / laying back** | Relaxed, heavy, dragging in a good way | Hip hop, soul, reggae, most J Dilla-descended production |
| **On the grid** | Machine-tight, urgent-neutral | House, techno, most EDM, trap 808s |
| **Ahead / pushing** | Urgent, driving, anxious | Punk, some rock, drum & bass energy sections |

The amounts are small — **roughly 5–30 ms** is the whole usable range. Past about 40 ms it stops reading as feel and starts reading as a mistake, which is the same threshold [[Rhythm and Groove]]'s track-delay note lands on by ear.

## Laying back vs pushing

**Laying back** = placing notes slightly *late*. The listener's expectation arrives before the note does, and the tiny delay reads as relaxed, weighty, unhurried. It's the backbone of hip hop and soul drumming, and it's why a perfectly quantized hip hop beat sounds stiff.

**Pushing** = placing notes slightly *early*. The note beats the expectation, which reads as urgent and driving. Far less common in your genres, but it's a real tool — pushing a hi-hat or a ride while the kick stays put lifts the energy of a section without changing anything else.

**The key move is that not everything shifts together.** A groove where every element is equally late just sounds slow. Real pocket comes from *elements disagreeing*:

- Kick and snare on the grid, hats slightly late → laid-back but anchored.
- Kick on the grid, snare slightly late → the classic lazy backbeat.
- Bass slightly behind the kick → weight and size (see the ~40 ms track-delay move in [[Rhythm and Groove]]).
- **Kenny Beats' rule: the main sound of the beat — sample, synth, or MIDI, not just bass — sits a touch BEHIND the kick+808 hit, never ahead.** When the kick and 808 land together, a main element landing behind them reads cohesive; the same element landing ahead of the kick/808 reads clashed, even at an identical offset amount. Generalizes the bass-behind-kick line above to any lead/melodic element. → [[Bassline Writing]], [[Melody Writing]] — Kenny Beats (Sol State), [No More BORING Drums](https://www.youtube.com/watch?v=DAUfaggMYzM)
- Percussion pushing while drums lay back → tension.

This is the generalized form of the hip-hop swing rule already in [[Rhythm and Groove]]: **strong beats on the grid, weak beats late.** The offset tracks metric weight rather than applying uniformly, which is exactly why it reads as pocket instead of as lateness.

## Quantize vs humanize

Both are in [[Rhythm and Groove]] as mechanics. The decision underneath them:

**Quantize** snaps notes to the grid. You want it on anything that must be machine-tight — 808s and sub bass (where timing inconsistency reads as pitch instability), anything locking to a sidechain, most electronic percussion.

**Humanize** adds controlled timing and velocity variation so a part sounds played. You want it on anything meant to read as a performance — programmed acoustic drums, keys, guitar parts.

**Neither is usually the right answer at 100%.** The middle ground is the real one: **partial quantize strength**. Set the quantize amount to 50–75% and a sloppy performance gets pulled *toward* the grid while keeping the direction of its original feel. Full quantize deletes the performance; no quantize keeps the mistakes. The setting is already documented in [[Rhythm and Groove]] under Quantize Settings — this is why you'd reach for it.

**Velocity is half of humanization and it's the half that's free.** Uniform velocities read as mechanical faster than uniform timing does. Matching velocity to the strong/weak hierarchy — quieter on the "e" and "a", louder on the beat — does most of the work before any timing offset.

## Groove templates: what they actually are

The [[Rhythm and Groove]] note covers the Groove Pool mechanics thoroughly — MPC folder, swing values, Commit. What that leaves out is the concept:

**A groove template stores timing and velocity offsets extracted from one piece of material, and applies them to another.** It's a feel, decoupled from the notes that carried it.

That decoupling is the point, and it's what makes the practical move possible:

1. Find a break or loop whose feel you like.
2. **Extract its groove** — drag the audio or MIDI into the Groove Pool.
3. Apply that groove to your own programmed drums.

Now your stiff MIDI inherits the microtiming of a real drummer. Everything sharing that groove shares the same microtiming instead of fighting it, which is often the actual fix when a beat "doesn't sit."

**Commit bakes it in permanently.** Do it once the feel is right — after that the notes have genuinely moved and the groove is no longer a live setting.

## Practical starting points

- **Hip hop / lo-fi** — hats 10–20 ms late, kick and snare on the grid. Add velocity variation on the hats. Optionally nudge the whole hat layer late as one block.
- **Trap** — 808 and kick dead on the grid (the sidechain relationship depends on it). Hats can be loose; rolls benefit from velocity ramps more than timing offsets.
- **House** — everything tight. This is a genre where the machine-ness is the aesthetic; save the feel for the swing setting, not for microtiming.
- **Anything with live playing in it** — extract the groove from the live part and apply it to the programmed parts, not the reverse.

## The honest caveat

**Microtiming is the last 5%, not the first.** A beat with a boring pattern doesn't get fixed by nudging it late. Get the pattern, the sounds and the arrangement right first — pocket is what you reach for when the beat is nearly there and feels stiff, not when it feels wrong.

## Related

[[Rhythm and Groove]] — the mechanics and the DAW settings · [[Time Signatures & Note Values]] · [[Syncopation and Metric Displacement]] · [[Genre Drum Patterns]] · [[Bassline Writing]] · [[Automation]] · [[Layering and Stacking]]

## From videos

- **Fully live, deliberately unquantized drums kept on a final commercial record for the timing variation itself — a stated choice for rawness/authenticity, not a limitation.** Paul Epworth re-tracking Adele's "Rolling in the Deep": "the drums were never quantized... it was a completely live performance with timing variation, and I think that was something we really felt was important... without having to get into editing" — "it really did feel like it had a rawness and authenticity to it." A confirmed real-record counterexample to always-quantize/always-groove-template workflows: leaving genuine performance timing untouched is itself a production decision worth making deliberately, not just a default to fix. → [[Drum Mic Technique]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **A syncopated left-hand piano counter-rhythm credited with making a track feel faster than its actual tempo.** Epworth on a re-tracked piano part: the pianist's left-hand counter-rhythm "helps to make the track feel a bit faster than it is" — "these little discrete rhythms" read as a direct contributor to felt energy/groove, separate from the song's actual BPM. Reusable perceived-tempo device: a busy, syncopated counter-part under a slower main part reads as more urgent than the tempo alone suggests. → [[Rhythm and Groove]] — Mix with the Masters (Paul Epworth), [[Paul Epworth opens up the session for Adele's "Rolling In The Deep"]]
- **The exact repeatable keyboard shortcut behind loner's recurring "separate the hi-hat from the kick" nudge, named for the first time — a third confirmed sighting of the same shorten/pitch-down/off-grid hi-hat recipe.** After shortening a hi-hat's tail and pitching it down, the timing nudge itself is done with a specific, named workflow: **Select None → Ctrl+A (select all) → Shift-right arrow twice** — "so it's got like — it's separated from the kick, it's not hitting straight away." The same three-step recipe (shorten, pitch down, nudge off-grid) already appears twice elsewhere on this vault from this channel (the Bryson Tiller bounce recipe and the UK garage 4-tick-right recipe logged below) described only qualitatively or with a different tick count — this is the first sighting to name the actual keyboard shortcut used to do the nudging. → [[Genre Drum Patterns]], [[2 Drums/1 Drums Hat Track|Drums Hat Track]], [[Synthwave]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- **Two studio-take timing quirks on the same riff, both framed as maybe-intentional/maybe-sloppy but genre-appropriate either way — a real-recording case study in when "off the grid" reads as character instead of a mistake.** BassBuzz's breakdown of Nirvana's "Smells Like Teen Spirit" (bass by Krist Novoselic) surfaces two separate microtiming quirks in the Level 5 (closest-to-the-record) pass, both isolated to the bass: **(1) A slide that starts late, on a triplet subdivision.** The song's "monster" intro slide (1st fret up to the 6th, back down) is usually covered starting on a clean, even beat subdivision — but the actual studio bass track starts it noticeably later, as if the beat were divided into a triplet and the slide begins on the triplet's last third rather than an even subdivision. Notably, Novoselic doesn't reproduce this in live footage (the slide comes in earlier there), which points toward a one-take studio artifact rather than a deliberate, repeatable performance choice. **(2) Uneven off-beat 16th notes on beat 3**, the same four 16ths this video's Level 3 rhythm section counts as "three-e-and-a" — on the record they aren't evenly spaced; the off-beat 16ths land audibly late, and neither the guitar nor the drums match that lateness, so it's isolated to the bass alone. **The framing for both, useful as a template for judgment calls like it:** BassBuzz explicitly declines to resolve intentional-vs-sloppy either way, and instead argues it barely matters for the listener — recorded in an era before "everyone was perfectly lining up every single rhythm on the grid," the imprecision reads as part of the genre's identity, compared directly to "the ripped jeans and the greasy hair and the oversized flannel that makes it all grunge." A useful genre-specific data point for this page's own "not everything shifts together" / "past about 40ms it reads as a mistake" framework above: grunge is a case where audible, unmatched-across-instruments lateness reads as authenticity rather than error, the opposite of how the same offset would land in a genre built on tight quantization. → [[Locking In With the Drummer]] (this video's Level 3 rhythm-following content), [[Bass Slide Technique]] (the slide's fingering/mechanics) — BassBuzz, [[The 5 Levels of Smells Like Teen Spirit (For Bass)]]
- **The same push/pull-the-beat move, demonstrated live on a fretted instrument rather than in a DAW — and the explicit prerequisite the production-side framing above tends to skip.** A bass player pushing slightly ahead of the beat gets a "more insistent, driving, falling over the cliff" feeling; pulling slightly behind gets a "laid back, fashionably late to the party" feeling — the same two directions this page's Laying Back vs. Pushing section documents, described in performer rather than production language. **The prerequisite named directly: most players don't do this, and you need a genuinely solid foundation of consistent on-the-beat playing before you can pull it off** — attempted without that foundation, an intentional push/pull just reads as drift/sloppiness rather than a deliberate feel choice. Full context on building that consistency-first foundation (the skill this page's push/pull assumes is already in place): [[Locking In With the Drummer]]. → BassBuzz, [[Why Beginner - Intermediate Bassists Sound “Karaoke-y”]]
- **A named, repeatable off-grid amount for UK garage bounce snares: exactly 4 ticks right, selected as a group and nudged with the right-arrow key.** Rather than dragging each note by ear, extra "bounce" snares placed between the normal on-grid backbeat hits get Select-None'd, group-selected, then nudged right 4 times with the arrow key — a small, specific, repeatable offset (not "a little late," an actual tick count) credited as the source of garage's characteristic bounce and natural feel, especially once claps/hats/kick layer in around it. The second hi-hat in the same build gets the same off-grid shift treatment, plus its tail shortened via the device's Out knob, for "where the bounce really comes in." Full kit-build order on [[Genre Drum Patterns]]. → [[Genre Drum Patterns]] — loner, [i combined r&b melodies with uk garage drums to make an insane beat (crazy bounce!?)](https://www.youtube.com/watch?v=I4-jcoCVdC0)
- **Shift one hi-hat layer noticeably late off the grid — described as "really off the grid" — specifically for a natural, live-feeling swing, as one of three differently-timed/processed hi-hat layers stacked together.** Rather than a subtle nudge, this hi-hat is dragged far enough off-grid that the lateness is audible, layered against an "old-school acoustic" hat (timed normally) and a "modern" hat with rolls — the deliberate off-grid layer is what sells the live/human feel against the other two, more quantized layers. Reconstructing a Tory Lanez-style beat's "boom-bappy swing mixed with modern sounds." → [[Genre Drum Patterns]], [[Rhythm and Groove]], [[Tory Lanez Underwater Synth Chain]] — loner, [how to make melodic r&b beats for tory lanez & chris brown (underwater synth/vocal sample)](https://www.youtube.com/watch?v=7JCup6FVW5o)
- **Nudge every single note back a hair, by hand, at maximum zoom — applied inside a slicer/chop instrument rather than a drum pattern.** Finishing a chopped piano+vocal sample: after pitching the whole chop down a few semitones and raising its attack, each individual slice's note is dragged back very slightly ("you almost can't hear it") for "a little bit of bounce, a little bit of variety" — the same laying-back principle this page documents for drum notes, here applied one slice at a time to a melodic/vocal chop instead. A clean, minimal-viable demonstration that the trick works at ANY note density, not just drum patterns. → [[Simpler]], [[Sound Selection Guide]], [[Kendrick Lamar Soul Sample Chain]] — loner, [how to make the most realistic vintage soul samples for kendrick lamar!?](https://www.youtube.com/watch?v=oMbeATqXOww)
- **Randomly push individual drum notes back off the grid, "here and there," for a natural feel — a manual/random nudge rather than a groove template.** On a from-scratch vintage psych-rock drum build (Ludwig Oyster Black Pearl replica in Addictive Drums 2), a simple pattern (snares hitting normally, kicks spaced well apart) had some notes deliberately pushed back off-grid at random points, described simply as giving "a more natural feel" — a lighter-touch, less systematic move than a full groove-template humanization pass. → [[Sound Selection Guide]], [[Beatles Psych-Rock Sample Chain]] — loner, [these 1960's production secrets will change the way you make samples!?](https://www.youtube.com/watch?v=Ngz_fZraTP4)
- **Play drums in by hand and leave them unquantized when recreating an acoustic-era swing feel — the swing IS the character being recreated.** Rebuilding a Marvin Gaye-style 70s soul drum pattern (kick/hi-hat/perc, Addictive Drums), the part was performed live rather than programmed-then-quantized, because grid-snapping the performance away loses the exact thing the recreation is going for. → [[Rhythm and Groove]], [[Sound Selection Guide]] — loner, [these 1970's soul secrets will change how you make melodies!?](https://www.youtube.com/watch?v=oRLzsshf6yg)

*Seeded 2026-08-03 — consolidated from `YouTube Notes/You Suck at Drums No. 4: Adding Swing & Groove to Hip Hop Drums.md` and the existing [[Rhythm and Groove]] material. Awaiting further `/music-enrich`.*

*(Those source notes carry `#` in their filenames, which Obsidian can't wikilink — see [[Coverage Review 2026-08-09]] §5. Referenced by path deliberately.)*

- **When a live-audio hi-hat take comes out too sloppy/inconsistent to use as recorded, play the pattern back at a slower tempo, record THAT slower take, then speed the resulting audio clip back up afterward.** The same performance lands tighter/more consistent at reduced tempo than played live at full speed — speeding the audio back up in post recovers a usable take a real-time pass couldn't produce. Surfaced under a constraint challenge forcing every element to be recorded as a live audio take with no MIDI (no clicking in notes, no quantize safety net) — the hi-hats were the one element that broke under that constraint, and this was the fix. Applicable any time a live take is rhythmically shaky, not just under a no-MIDI constraint. → [[Latency-Free Tracking]] — loner, [i made beats WITHOUT VSTs for an entire week!?](https://www.youtube.com/watch?v=gZMSr8CjqOc)
- **Manually shift individual hi-hat notes off the quantized grid for extra bounce, classic Metro Boomin-style trap programming** — after programming a hi-hat pattern, nudge specific notes off-grid by hand rather than leaving the whole pattern quantized; the deliberate looseness on select hits is what reads as "bounce" versus a robotic, perfectly-gridded hat. → [[Genre Drum Patterns]] — loner, [the secrets behind mike dean's 'rodeo' production!?](https://www.youtube.com/watch?v=V9FhndW8t74)
- **The "Dilla didn't quantize" story is a myth — it was asymmetric per-element quantization, not an absence of it.** Full step recipe (snare pushed early ~6 steps, hats pushed late "quite a lot" while otherwise fully quantized, kick/open hat left on-grid) is documented on [[Rhythm and Groove]]; the mechanism confirms this page's "elements disagreeing" framing above with a specific, sourced example rather than a general principle. → [[Rhythm and Groove]] — loner, [how Kanye West changed sampling FOREVER!?](https://www.youtube.com/watch?v=AwtJV33IWPA)
