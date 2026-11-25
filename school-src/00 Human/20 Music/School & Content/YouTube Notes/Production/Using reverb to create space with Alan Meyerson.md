---
type: yt-note
date: 2026-08-12
source: youtube
url: https://www.youtube.com/watch?v=aX8W5gc4t6o
channel: Mix with the Masters
duration: "00:05:54"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, reverb, convolution, film-scoring]
briefed: backlog
---

# Using reverb to create space with Alan Meyerson

![](https://www.youtube.com/watch?v=aX8W5gc4t6o)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=aX8W5gc4t6o)

## Synopsis

Alan Meyerson (score mixer — the video references pitching a scoring approach directly to Trent Reznor, Atticus Ross, and David Fincher, i.e. this is a *Mank*-era session) walks through the exact problem every dry-tracked orchestral score has: every section was recorded separately, close-miked, "in someone's bedroom" — no shared room, no shared acoustic identity. His fix is Vienna Symphonic Library's **MIR Pro** convolution-acoustics software, used not as a normal reverb send but as a full **virtual scoring stage** that every instrument group is placed INTO together, so the whole orchestra reads as one consistent room instead of a pile of dry, individually-mic'd parts glued only by shared mic type (ribbons). The most valuable idea here isn't "add reverb" — it's that MIR repurposes each instrument's own pan control into a **position-in-the-room** control (narrow/wide, off-center, and even *rotation*, which changes the mic's implied distance and therefore its high-frequency content), and that a shared convolution engine with per-instrument EQ/reverb-time feeding into it is what makes disparate dry recordings sound like one performance in one hall. Short video (under 6 minutes) but dense — a genuinely different mental model for "space" than a normal reverb-send workflow, even though the specific tool (MIR Pro) is unowned and specific to large-ensemble/film scoring rather than Nate's usual production context.

## Techniques

- **The core problem MIR solves: dry, separately-tracked instruments recorded with the same mic type (ribbons) read as "continuity" but NOT as a shared space.** With the convolution engine bypassed entirely, Meyerson notes the raw mix "sounds nice too, but the problem is that's just a bunch of instruments in a room — in different rooms — but they all kind of... since they're all ribbon mics and recorded in a similar way, there's some continuity with it." Consistent mic choice is not the same thing as consistent room — a distinction worth remembering any time multiple close-mic'd/DI'd sources need to read as one performance space. → [[Depth and Space]], [[Reverb]] (effect)
- **A convolution engine used as a literal virtual room, auditioned and picked from real, physically-modeled halls before scoring even started — not dialed in after the fact.** MIR Pro ships modeled spaces including the **Vienna Concert House** and the **Synchron Stage Vienna** (a real scoring stage); Meyerson demoed both to the composers/director as room *choices*, the same way you'd scout a physical studio — "I gave them a couple of choices of rooms." The final choice (Concert House) was settled on with a rough demo mix, which then "got orchestrated out" into the final cue — the room decision happened early, upstream of the arrangement, not as a mix-stage afterthought. → [[Depth and Space]], [[Reverb]] (effect), [[Hybrid Reverb]]
- **Every instrument group is its own separate "shell"/insert feeding the SAME shared convolution engine — the mechanism that actually makes a multi-mic'd ensemble sound like one room.** "All these now are different inserts and different shells into the same convolution." Rather than one global reverb send everyone shares equally, each section (violins, violas, harp, cello, bass, french horns) gets its own instance/insert into the identical convolution IR — same room, individually placed and shaped. Owned-lane equivalent for a scaled-down version of this: route each source into its own [[Hybrid Reverb]] instance loaded with the same impulse response (rather than one shared send), so each source keeps independent EQ/level/position control while still sharing one acoustic identity. → [[Hybrid Reverb]], [[Depth and Space]]
- **Per-instrument EQ feeds INTO the convolution, not after it — shaping the reverb's tonal color per source rather than just the dry signal.** "I can control each of them, can have their own EQ... and that's the EQ feeding into the convolution — the violas have a different one, the harp has a different one." This is pre-convolution EQ (shaping what goes into the room simulation), distinct from the far more common post-reverb-return EQ already logged on [[Reverb]] — worth trying on [[Hybrid Reverb]] by EQ'ing the dry signal before it hits the device rather than only shaping the wet return afterward. → [[Reverb]] (effect), [[EQ]], [[Hybrid Reverb]]
- **Minimal, source-specific extra processing layered on top of the space itself — never more than "a little."** Cello: "a little bit of low end" added before the convolution. Bass: "a little bit of low end." French horns: "a tiny bit of compression, very tiny bit of compression, and a little extra low end — but really minimal, minimal stuff." The explicit framing is that almost all of the perceived quality comes from the shared-space convolution itself, not from processing stacked on top of it — a light low-end lift into the [[SUB Slot]]/[[BASS Slot]] range and only the faintest touch of glue compression, restated three times as "minimal." *(general starting point — no exact Hz/dB/ratio values given in the transcript)* → [[SUB Slot]], [[BASS Slot]], [[Compression]] (effect)
- **The panner is repurposed inside the convolution: it no longer sets raw stereo balance, it sets the instrument's POSITION inside the virtual room's image.** "Your panner is not a panner for your left and right image — your panner is now a panner for the left and right of the image that's in this particular shell." Demonstrated on the violin section: concert master panned to the center of his own shell's image, second violinist panned mostly right within that same shell — different desks placed at different positions inside one shared room, rather than one wide stereo violin bus. → [[Width and Stereo]], [[Depth and Space]]
- **Width AND rotation are both controllable per source inside the shared space — and rotation changes distance/brightness, not just stereo image.** Each instrument's placement inside its shell can be made "very narrow" or "as wide as I want," put off-center, and separately **rotated** — rotating "changes sort of the frequency construction of it, so the mics that are farther away don't have quite as much high end." Rotation is effectively a distance-and-brightness control disguised as an orientation control — the same physical cue [[Depth and Space]] already documents (high-frequency content = distance cue) but produced by turning a virtual mic rather than filtering. → [[Width and Stereo]], [[Depth and Space]]
- **Per-instrument reverb TIME is independently adjustable within the same shared convolution space — sections don't have to share one decay length even though they share one room.** "I can even change the reverb time of all of it." Combined with the per-instrument EQ-into-convolution point above, this means each section effectively gets its own tuned corner of the same room rather than one-size-fits-all decay. → [[Reverb]] (effect), [[Hybrid Reverb]]
- **Main mic distance is a live, steppable depth control — from fully dry to pushed all the way back in the room.** "I could decide where to put the main microphones — if I want everything to sound a little bit farther away, well, let me move the mic off the instruments a little bit... I can push it all the way back in the room, or I can make it completely dry." A direct, literal version of [[Depth and Space]]'s wet/dry-ratio depth cue — here it's framed as physically relocating a virtual mic rather than turning a send knob, which is a clarifying way to think about any reverb's dry/wet control. → [[Depth and Space]], [[Reverb]] (effect)

## Routed to

- [[Reverb]] (effect page)
- [[Depth and Space]] (technique)
- [[Width and Stereo]] (technique)
- [[Hybrid Reverb]] (plugin — closest owned convolution reverb)
- [[Plugin Wishlist]] (Vienna Symphonic Library MIR Pro, added to "From videos (to vet)")

No chain candidate created — this is a full-ensemble film-scoring space-building workflow (a virtual scoring stage for an entire orchestra), not a track-level device chain in the sense [[FX Chain System]] tracks; the individual ideas (shared-IR sends, pre-convolution EQ, panner-as-position) are general enough to route to the effect/technique pages above instead.

## Source

- Channel: Mix with the Masters
- Duration: 00:05:54
- URL: https://www.youtube.com/watch?v=aX8W5gc4t6o
- Transcript: captions, high confidence (spoken narration over a plugin demo, no music garbling) — see [[Using reverb to create space with Alan Meyerson (transcript)]]
