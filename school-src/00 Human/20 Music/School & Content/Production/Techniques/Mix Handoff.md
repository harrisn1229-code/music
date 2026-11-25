---
type: reference
created: 2026-08-03
tags:
  - production
  - mixing
  - mastering
  - handoff
  - delivery
source: authored 2026-08-03 to back the MIX strand
---

# Mix Handoff

**The connective tissue, not a mixing curriculum.** You mix as you go, get it to your own version, then hand off to a mixing engineer. Everything here is about that transfer — what to commit, what to leave alone, what to send, and what makes the next person's job harder.

The nine `Production/Techniques/` component notes already cover the *how* of mixing ([[Gain Staging]], [[Masking and Carving]], [[Phase Alignment]], [[Depth and Space]], [[Width and Stereo]], [[Parallel Processing]], [[Compression Staging]], [[Clipping and Loudness]], [[Referencing and Translation]]). This is what happens after them.

> [!warning] The one that costs the most
> **Take the limiter off the 2-bus before you send.** A brick-wall limiter that pulled 8 dB off your peaks is 8 dB the engineer will never see — it's not headroom you saved, it's information you deleted. If you want them to hear your loudness intent, send both versions clearly labelled. ([Mat Leffler-Schulman](https://matlefflerschulman.com/mastering-articles/do-i-leave-the-limiter-on-the-mix-buss), [Sage Audio](https://www.sageaudio.com/articles/how-to-prepare-your-mix-for-mastering))

## The commit boundary

The single decision that governs everything else. **Commit what defines what a part *is*. Leave open everything about how parts *relate*.**

| Commit it | Leave it open |
|---|---|
| Character distortion — the thing that makes that guitar *that* guitar | Track-to-track balance |
| Synthesis and patch design | Corrective EQ |
| Creative effects that are part of the writing (the stutter, the reverse, the filtered break) | Bus and glue compression |
| Sample choice and chops | Reverb and delay *amounts* |
| Tuning and timing edits on vocals | Stereo width decisions on the mix as a whole |
| Arrangement — what plays when | The 2-bus, entirely |

The test: **if removing it would change what the part is, commit it. If removing it would only change how loud or bright it sits against its neighbours, leave it.**

The failure mode runs in both directions. Over-commit and the engineer works *around* your decisions instead of *through* them — a printed reverb can't be pulled back when the arrangement changes underneath it. Under-commit and you've handed over a pile of raw tracks with none of the intent that made the demo good, and they'll mix somebody else's record.

**Print a safety.** When you commit something destructive, keep the unprocessed version alongside it, muted and named. Costs nothing, and it's the difference between "can you undo that" and "no."

## Multitracks vs stems

Not interchangeable, and the wrong one wastes a round trip.

- **Multitracks** — every individual track, unbundled. Each mic, each synth, each vocal layer. **This is what a mixing engineer wants.**
- **Stems** — grouped submixes bounced to a handful of files: drums, bass, music, vocals. These are for remixers, live playback, and sync licensing. A mixing engineer handed stems can't fix a snare without also touching the kick.

Send multitracks unless they've specifically asked for stems.

## Delivery spec

| | |
|---|---|
| **Format** | WAV or AIFF. Never MP3, never a lossy source anywhere in the chain. |
| **Sample rate** | The session's **native** rate. Do not convert. If you tracked at 48 kHz, deliver 48 kHz. |
| **Bit depth** | 24-bit minimum. 32-bit float is fine if they'll take it. |
| **Headroom** | Peaks around **−6 to −3 dBFS**. Achieve it with a gain move on the 2-bus, not with a limiter. |
| **Dither** | None. Dither is the last step of the last process, and that isn't you. |
| **Start point** | Every file consolidated from the **same** timeline zero, so nothing can drift on import. |
| **Naming** | Descriptive. `Lead Vox Double L`, not `Audio 12`. |

Headroom is the one people get wrong in the harmless direction — there's no prize for −18, and no penalty either. What matters is that nothing is clipping and nothing is limited. ([Sonarworks](https://www.sonarworks.com/blog/learn/how-to-prepare-a-mix-for-a-mastering-engineer))

## Session organization

Do this before the export, not after they ask.

1. **Name every track for what it is.** The engineer shouldn't have to solo anything to find out what it is.
2. **Order and group logically** — drums, bass, music, vocals. Colour-code if the DAW supports it.
3. **Consolidate each track** across the full song length from a common start. No floating regions.
4. **Delete unused tracks.** Twelve muted alternates aren't helpful, they're twelve questions.
5. **Flag anything deliberate that looks like a mistake** — a part that's intentionally out of tune, a sound that's meant to clip, an effect that has to stay.

## What to send alongside

Audio alone is an incomplete handoff. Three things travel with it:

- **Your rough mix**, as a reference. This is the balance you were hearing when you made every arrangement decision. It's the most useful single file in the package and the one most often left out.
- **A reference track** — a finished commercial record in the same lane, for tone and balance target.
- **Written notes on intent.** Short. What the song is doing, what you want louder or darker, what you're unsure about, anything that must not change.

## Using a reference track properly

The step that makes references work and almost everyone skips: **level-match it.**

Anything louder sounds better. An unmatched commercial reference is mastered 6–10 dB hotter than your mix, so A/B-ing against it tells you nothing except that it's louder — and you'll chase that difference with the wrong tools.

Match the loudness first, then use it for **specific questions**, not a general vibe check:

- Is my low end bigger or smaller than theirs?
- Is the vocal further forward or further back?
- Am I duller or brighter above 8k?
- Is my stereo image wider or narrower?

A reference is a measuring stick, not a target to clone. Switch often, on the same system, at matched level.

## Mastering prep

Deliberately light — mastering isn't an interest, and prep is the only part that's yours.

- Everything in the **Delivery spec** above applies.
- **Nothing on the 2-bus.** No limiter, no clipper, no "just a little" glue compression you'd miss.
- **LUFS is context, not a target.** It measures *integrated perceived loudness* over the whole track. Streaming services normalize playback to roughly −14 LUFS, so a master pushed to −7 gets turned down on playback and arrives quieter-sounding *and* flatter than one that wasn't. Chasing loudness past the normalization target costs dynamics and buys nothing.
- **If it's a release rather than a single**, send the running order and the gaps you want between tracks.
- **Turn temporal effects (reverb, delay, modulation) down before sending, not just off the 2-bus.** Reverb/mod content sits lower in amplitude than the dry signal almost always, so the mastering engineer's own compression/limiting will lift those quiet tails more than the reference mix ever showed — leaving them at mix-reference level hands over a track that gets brighter/wetter-sounding than intended once it's processed. ([Sage Audio](https://www.sageaudio.com/articles/how-to-prepare-your-mix-for-mastering))

**What makes their job harder:** an already-limited mix (nothing left to work with), sample-rate conversion, an MP3 anywhere in the lineage, and a problem buried in the mix that mastering can only make louder rather than fix.

## From videos

- **Four things to avoid on the mix bus before handoff, stated as hard limits rather than a general "go easy" — a concrete companion to the Mastering prep checklist above.** Avoid aggressive compression/limiting on the 2-bus (save it for mastering). Avoid EQ changes greater than **2 dB** on the mix bus — address a lacking/excessive range on individual tracks instead. Avoid high-pass filters steeper than **12 dB/octave** on an instrument bus or the mix bus — the phase rotation around the filter emphasizes content just above the cutoff and interferes with transients. Ensure no peaks exceed **0 dB** by the stereo output — individual tracks/buses can go over internally (DAWs run 64-bit), but the final output needs headroom below 0 dB. → [[Clipping and Loudness]] — Sage Audio, [Mix Polishing: Advanced Techniques to Finalize Your Mix](https://www.youtube.com/watch?v=7AfSb6uMJhs)
- **Decorrelated stereo highs cost more once a delivered mix hits lossy encoding (MP3/AAC/streaming) — a delivery-format reason to check width before handoff, not just a mastering-stage concern.** High-frequency content that's identical L/R (correlated) gets masked by other high-energy centered material once encoded; content that only exists in the SIDE image (decorrelated, e.g. after aggressive stereo-expander use) has much less masking it, and its own spatial cues make lossy-encoding artifacts stand out more. Worth A/B'ing a widened mix against its own streaming-service bounce before handing off, not just the WAV. → [[Width and Stereo]] — Sage Audio, [5 Advanced Compression Techniques (Simple to Complex)](https://www.youtube.com/watch?v=V1lZaf8NWd0)
- **The commit-boundary "leave open" column, restated from the client-facing side: mix with built-in revision headroom on purpose, by keeping definition between instruments without prettifying them, rather than a polished balance that can't absorb a change.** Andy Wallace: "if I've done my job properly and gotten things right, hopefully there's a lot of flexibility in that mix where I can bring something up or down a significant amount and not destroy the integrity of what I've established" — achieved by "maintaining definition between instruments without prettifying them, just keep them raw and powerful," so a fader move doesn't suddenly make one part disappear or another seem too loud. The rest of the video (how he sets revision ground rules with clients, draws out shy artists, and decides when a client relationship is unworkable) is process rather than mix craft — routed to the new [[Client Communication and Revisions]] note rather than duplicated here. → [[Masking and Carving]], [[Client Communication and Revisions]] — Mix with the Masters (Andy Wallace), [[When you disagree with the mix revisions - Andy Wallace]]
- **A third independent mix engineer's version of this note's own commit boundary — with the added nuance that "keep what works" applies to a producer's whole plugin choices, not just printed effects, and that it comes with an explicit stated worldview: build off a good mix rather than replace it.** Mixing a Dua Lipa track handed off by a producer ("Mark"), Josh Gudwin states the philosophy outright: "with a song that already sounds good from a producer that if it came out, it wouldn't be a disaster, I like to approach my mix a little differently. I approached it with their mix in mind, I like to build off their mix and just enhance it and complement it. If there are some resonance or vocals are a little uneven, I try to balance those out, just craft the mix to where it feels good from start to finish." Concretely, this meant keeping plugins whose origin he wasn't even certain of, purely because they already worked — RVox on a "screwed hook" vocal ("this was probably on there already... I'm lazy in the sense that if I want to make another change to the sound, I'll just put another plug-in on there"), a "Studio D" stage kept explicitly "not trying to take away the vibe, I'm trying to keep the vibe and build upon that," and BOTH the vocal reverb sends and delay sends from the producer's engineer (kept, and in one case the reverb plugin was good enough that he bought it after mixing on the demo). Also reverted his own creative reverb-drop revision at the producer's request without argument — "Mark wanted the reverb back in, so I put it back in, it ain't no thing." Applies the identical "don't fix what isn't broken" call to instrumental sources too: "I didn't do anything to the kicks. The drums I kind of left how they were because they sounded so good when I got them... I just messed with the blend." → [[RVox]], [[UAD Pure Plate Reverb]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **A second, independent mix engineer confirming this note's own commit boundary from the receiving side, with an explicit "why" beyond the one already logged below: chasing a printed effect wastes time better spent elsewhere, and a rebuilt version always reads as different even when it's technically close.** Neal Pogue, mixing a Kaytranada/Kali Uchis track where the artist had already printed a delay and "a distinct reverb" onto the vocal: *"leave on the track what you're married to... I'll just be chasing what you've been listening to. And if I send you back what I did, you're automatically going to say 'the mix is different.'"* His stated rule to artists generally, given before he even gets stems — keep whatever sound/trick you've been living with for months printed in, rather than handing over a blank slate; his own creative contribution ("I have a lot of room to do me") builds ON TOP of what's kept rather than replacing it, and skipping the reproduction chase frees him to focus on other parts of the mix instead. Same commit-boundary rule as the entry below, corroborated from a second, unrelated session. → [[Committing and Printing]] — Neal Pogue (Mix with the Masters), [[Understanding Kaytranada's vision with Neal Pogue]]
- **The receiving end of this note's own commit boundary, from a mix engineer's chair: a printed/committed reverb on a delivered vocal should be left completely alone, not reverse-engineered and rebuilt.** "This is a reverb channel completely printed... I'm not going to change that stuff. Their reverb, they've chosen that, that's on purpose." Two stated reasons, one technical and one political: replicating a committed effect risks a subtle mismatch the artist can *feel* but not name ("something doesn't feel right... have you listened to the rough?"), and — separately, worth naming honestly — the engineer just liked the printed sound on first listen. Confirms the commit-boundary rule from the sending side actually holds up in practice on the receiving side: a properly committed effect gets respected, not undone. The knock-on cost: any group-level dynamic processing applied later has to be built to explicitly exclude that printed reverb from being affected (see the Mid-only sidechain-duck trick on [[Sidechaining]]/[[James Blake Vocal Chain]]) — a live example of "under-commit and the engineer works around your decisions" running in reverse — over-commit correctly, and the *engineer's own later processing* has to route around it instead. → [[Sidechaining]], [[Depth and Space]], [[James Blake Vocal Chain]] — Mix with the Masters, [[MSM Mixing James Blake's Vocals]]
- **Cap a vocal session at THREE sends total, deliberately, as a courtesy to whoever mixes it next.** "I don't have anything routed, I don't have any of my effects or delays routed through a thousand aux... this session is very simple, I have three effects busses — the reverb, delay, chorus, that's it." Stated reasoning is explicitly about the next person: "my goal is to make sure that I'm handing off an amazing session simplified, so that when the mix engineer gets it he doesn't have to go through clean up, crossfades, turn down S's [or] figure out how I have everything routed... now when I send this to the mix engineer he has room to do his job and create something even more special with what we've given him." Named directly as something some engineers *don't* do, and that over-routing "drives mix engineers crazy" when they don't. Reinforces this note's own commit-boundary framing — over-routing is a form of over-committing that makes the engineer work around decisions rather than through them. → [[1 Main Vocal Track]] — Kuk Harrell, [[Radio-ready vocal effects with Kuk Harrell]]
- **Why dB true peak, not RMS, is the correct measurement type for sizing headroom — and why 0 dBFS itself isn't enough headroom for a mastering send, even with nothing visibly clipping.** Headroom is the distance from a signal's loudest peak up to 0 dB; dBTP is the right way to measure that distance because it accounts for **inter-sample peaks** (the reconstructed waveform's amplitude *between* digital samples, invisible to a plain sample-peak meter) — giving the truest read of actual peak amplitude, including clipping distortion a sample-peak meter won't show. RMS measures something different (average loudness, useful for judging dynamic range against the peak) and reads much lower than dBTP — it isn't a substitute for peak headroom. Separately: landing a mix at exactly 0 dB essentially forces a limiter onto the master output just to hit that ceiling precisely, and once engaged that limiter brick-walls transients — a trait most mastering engineers don't want handed to them, on top of the inter-sample-peak clipping distortion a 0 dBFS mix is very likely already carrying. → [[Clipping and Loudness]], [[Limiting]] — Sage Audio, [What is Headroom for Mastering?](https://www.youtube.com/watch?v=mYtL4V01Unw)
- **Headroom and dynamic range are mechanically the same coin — both are defined relative to the same loudest peak — so this note's own −6 to −3 dBFS target only does its job if dynamic range survives alongside it.** Headroom = the distance from the loudest peak up to 0 dB; dynamic range = the distance from the *quietest* peak to the loudest peak (or RMS-to-peak as a rougher proxy) — the loudest peak anchors both. Worked example: a mix peaking at −4 dB with only 1 dB of headroom (almost no room between its average level and its peak) forces a mastering engineer to work hard just to restore missing dynamics — the headroom number alone can look fine while the dynamics underneath it are already gone, which is the bigger problem of the two. The mirror-image failure also happens: a mix that's too dynamic needs heavy mastering-stage compression just to tame it, and that heavier compression becomes audible as artifacts — so the real goal is headroom *and* intact dynamics together, not headroom in isolation. Also worth knowing: turning a mix down digitally after the fact to manufacture missing headroom doesn't reduce its bit depth, but does reduce the number of bits actually used to represent the signal — a source of mild but real quantization distortion, on top of the inconvenience to the mastering engineer's workflow. → [[Gain Staging]], [[Clipping and Loudness]] — Sage Audio, [What is Headroom for Mastering?](https://www.youtube.com/watch?v=mYtL4V01Unw)
- **A quantified ceiling for "how much processing is too much" on the mix's own 2-bus, plus the mechanism behind this note's −6 to −3 dBFS headroom target.** Light, controlled, subtle compression/EQ on the master output is fine; past this line it's actively working against the mastering engineer: **limiting/compression with attenuation greater than 3 dB**, **EQ changes greater than 3 dB**, **harmonic distortion greater than 1%**, and **any stereo-widening plugin at all**. If in doubt whether to use a given process on the master, don't. Mechanically, the reason the headroom target above is measured in **dB true peak (dBTP)**, not plain 0 dBFS: true peak accounts for **inter-sample peaking** — reconstruction peaks between the samples a normal sample-peak meter reads — which a signal can hit even while reading clean on a sample-peak meter. Peaking at −3 dBTP specifically uses most of the available dynamic range (24-bit ≈ 144 dB, more of it used the closer the peak sits to 0 dB) while still guaranteeing a mastering engineer a full 3 dB of headroom. → [[Clipping and Loudness]] — Sage Audio, [How to Prepare Your Mix for Mastering](https://www.youtube.com/watch?v=vd81zTPvnMQ)
- **Why lowering temporal effects before mastering actually matters — mastering-stage limiting/compression lifts quiet reverb/delay/modulation tails more than the mix engineer heard them.** Reverb reflections and modulation effects sit lower in amplitude than the dry signal almost always (unless gated), so any compression/limiting applied downstream lifts those quiet tails disproportionately along with everything else — this is the mechanism behind the Mastering prep checklist item above, straight from a working mastering studio's own client guidance. → [[Reverb]], [[Compression]] — Sage Audio, [All Processing is Connected - Crucial Knowledge for Pro Mixes & Masters](https://www.youtube.com/watch?v=XV-0rdUrgHs)
- **Decide in advance that you will outsource mastering, so you actually finish mixes (Abstract)** — pre-committing to handing mastering to someone else removes the temptation to endlessly reopen a "finished" mix (switching headphones, tweaking forever); mix down as well as you can, apply a limiter for reference-level loudness, then hand off and don't touch the project again. Reinforces this note's own framing above — mastering prep is deliberately light because it isn't the goal, finishing and handing off is. — Sol State, [I watched 300 hours of music production streams, here are my 17 FAVORITE tips](https://www.youtube.com/watch?v=JQHvtinwQQ8)

## Checklist

- [ ] Limiter and clipper off the 2-bus
- [ ] Peaks −6 to −3 dBFS, achieved with gain
- [ ] Multitracks (not stems), unless asked otherwise
- [ ] Native sample rate, 24-bit, WAV, no dither
- [ ] Every file consolidated from a common start
- [ ] Every track descriptively named
- [ ] Unused tracks deleted, deliberate oddities flagged
- [ ] Rough mix included
- [ ] Reference track included
- [ ] Written notes on intent
- [ ] Safety copies of anything destructively printed

## Related

- [[Gain Staging]] · [[Clipping and Loudness]] · [[Referencing and Translation]] · [[Committing and Printing]]
- [[Sample Clearance]] — the other thing to settle before a release
- [[School]]

## Sources

- [Should I Leave the Limiter on the Mix Buss Before Mastering? — Mat Leffler-Schulman Mastering](https://matlefflerschulman.com/mastering-articles/do-i-leave-the-limiter-on-the-mix-buss)
- [How to Prepare Your Mix for Mastering — Sage Audio](https://www.sageaudio.com/articles/how-to-prepare-your-mix-for-mastering)
- [How to Prepare a Mix for a Mastering Engineer — Sonarworks](https://www.sonarworks.com/blog/learn/how-to-prepare-a-mix-for-a-mastering-engineer)
- [Mix Prep for Mastering: Step-by-Step Checklist — Alexander Wright Mastering](https://alexanderwright.com/blog/how-to-prepare-your-mix-for-mastering)
