---
type: yt-note
date: 2026-08-12
source: youtube
url: https://www.youtube.com/watch?v=X1YjeRlC0c8
channel: Mix with the Masters
duration: "00:07:34"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, percussion, drums, parallel-compression, transient-design, film-scoring, game-audio]
briefed: backlog
---

# Adding impact to percussions with Alan Meyerson

![](https://www.youtube.com/watch?v=X1YjeRlC0c8)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=X1YjeRlC0c8)

## Synopsis

Alan Meyerson (score mixer, also behind [[Using reverb to create space with Alan Meyerson]]) takes an already-solid percussion stem from the Gears of War cue "Raid Action" and walks through a short, concrete before/after pass to squeeze more impact out of it. The video is compact (under 8 minutes) but structurally dense: it opens with a genuinely useful piece of theory borrowed from Andrew Scheps — pop mixing can get away with compressing the whole mix instead of individual elements, but film/game scoring can't, because the deliverable is separate stems rather than a finished mix, so a single mix-bus compressor would react to material that isn't present in every stem. The workaround is to run parallel compression **per stem** (here, the whole percussion stem treated as one unit) rather than per element or per finished mix — a middle ground between the two extremes. From there it's two concrete processing moves: (1) build a parallel percussion bus using a Chris Lord-Alge-style 1176 plus a Puig Tec-style EQ for top-end snap, with PSP Vintage Warmer 2 auditioned as an alternate/additional color source; (2) revisit an aux bus the percussion was already routed through, which carries a restrained compressor and a Sonnox Oxford Envolution transient designer, nudging the transient designer's attack up and sustain down slightly and blending only a small amount back in. It closes with a quick critical-listening pass across individual elements, catching a specific frequency that's dulling the new snap — flagged as a fix but not executed on screen. No exact numbers are given anywhere in the transcript; every setting is qualitative ("a little bit," "a tiny bit," "over the top then dial back"), consistent with a quick demo video rather than a full walkthrough.

## Techniques

- **Parallel-compress the WHOLE STEM, not individual elements and not the finished mix — the reusable fix for why Andrew Scheps' "compress the overall mix, not individual elements" pop-mixing philosophy doesn't transfer directly to film/game scoring.** Scheps' approach works in pop because you're delivering one finished mix. Film/game/media music delivers **separate stems**, so "you can't really have a general compressor over everything... the threshold is being controlled by, say, a piece of percussion that isn't there in that stem" — a shared mix-bus compressor reacts to content that won't exist in every context the stems get used in. The fix: apply parallel compression to **the entire stem as a unit** (here, the whole percussion stem) rather than gain-riding individual instruments within it or waiting for a final 2-bus — "congeal the whole stem together." Reusable any time you're delivering stems rather than a locked mix (remix stems, game audio, film/TV cues). → [[Parallel Processing]], [[TRANSIENT Slot]], [[3 Drums Bus|Drums Bus]] — Mix with the Masters (Alan Meyerson)
- **Build a dedicated parallel bus for the percussion stem: an 1176-style FET compressor (Chris Lord-Alge signature) blended with a Pultec-style EQ (Jack Joseph Puig signature) pushing top end, mixed back in for snap.** "I'm going to try adding a little bit of the Chris Lord-Alge 1176, in addition to... a little bit of the JJP Puig Tech, some top end from that. Let's see what happens if I blend in a little bit of that — see if we get a little snap out of it." Owned lane: this vault's own [[Parallel Comp Send]] chain already runs exactly this shape (fast FET compressor into EQ, on a send). *(General starting point, no ratios given — start from [[Parallel Comp Send]]'s documented fast-attack/fast-release, heavy-GR 1176 default and back off since it's blended in, not run at 100%; EQ stage: a broad high-shelf/high-boost around 10–12 kHz for "top end," Pultec-style.)* → [[UAD UA 1176LN]], [[UAD Pultec EQP-1A]], [[Parallel Comp Send]], [[Parallel Processing]], [[AIR Slot]] — Mix with the Masters (Alan Meyerson)
- **PSP Vintage Warmer 2 auditioned as an alternate/additional parallel color source specifically for its "snap" character, with an explicit latency caution before committing it to the bus.** "Without creating a latency issue, which we could possibly have... if it doesn't work here we'll use it in a different place, which is the PSP Vintage Warmer 2. I like getting my snap out of this plugin." Worth two things: the plugin choice itself (unowned — see [[Plugin Wishlist]]), and the workflow habit of naming latency as a real risk when stacking another device on a parallel bus rather than assuming Ableton's automatic PDC makes it a non-issue. → [[Plugin Wishlist]], [[Saturation and Distortion]], [[Parallel Comp Send]] — Mix with the Masters (Alan Meyerson)
- **On the percussion's EXISTING aux/insert bus (separate from the new parallel send above): keep the resident compressor restrained ("don't quite want to hit it as hard as that"), then push a transient designer's attack up and trim sustain down before blending only a small amount back in.** The bus already carries a compressor with a fairly fast setting, deliberately not driven hard, and a Sonnox Oxford Envolution — described as having "really, really good sensitivity, a really good threshold" for grabbing internal transients "a little bit better than some of the other ones can," plus sustain control. Pushed "a little bit over the top" it "adds a nice amount of attack" while cutting sustain, but reads "a little bit process sounding" at full strength — the fix is blending in "just a tiny bit" of that processed signal rather than committing to it 100% wet, i.e. treating the transient designer itself as a parallel/blend stage, not a straight insert. Owned best-match: [[Transient Shaper]] (Softube) — its own Key Parameters table already documents a "Mode/Sensitivity" control matching the exact language used here. *(General starting point: Attack pushed noticeably up, Sustain trimmed down slightly, then the device's own mix/blend brought back to roughly 15–25% rather than fully wet.)* → [[Transient Shaper]], [[3 Drums Bus|Drums Bus]], [[TRANSIENT Slot]], [[Compression Staging]] — Mix with the Masters (Alan Meyerson)
- **Close every processing pass with a critical-listening check on individual elements — the goal is catching a specific frequency that's undermining the new snap, not just approving the blend by ear on the full mix.** After building both the parallel bus and the transient-designer blend, a final listen to individual elements turns up "a bit of a frequency in there I don't like... it's taken away a little bit of the snappiness of it." The fix (a targeted EQ cut at that frequency) is named as the next step but not executed on screen — a reminder that a processing chain built for "more snap" can introduce its own masking frequency that only shows up once you solo/isolate elements again. → [[Masking and Carving]], [[EQ]] (effect), [[Critical Listening for Mastering]] — Mix with the Masters (Alan Meyerson)

## Routed to

- [[UAD UA 1176LN]] (plugin — owned equivalent for the Chris Lord-Alge 1176)
- [[UAD Pultec EQP-1A]] (plugin — owned equivalent for the JJP Puig Tech EQ)
- [[Transient Shaper]] (plugin — owned equivalent for Oxford Envolution, new Techniques section added)
- [[Parallel Comp Send]] (chain — inline note + Usage bullet)
- [[3 Drums Bus|Drums Bus]] (chain — From videos bullet)
- [[Parallel Processing]] (technique — From videos bullet on stem-level parallel compression for media delivery)
- [[Plugin Wishlist]] (PSP Vintage Warmer 2 — additional reuse appended to the existing entry)

## Source

- Channel: Mix with the Masters
- Duration: 00:07:34
- URL: https://www.youtube.com/watch?v=X1YjeRlC0c8
- Transcript: captions, high confidence (spoken narration over a mix demo, no music garbling) — see [[Adding impact to percussions with Alan Meyerson (transcript)]]
