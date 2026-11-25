---
type: technique
title: Sample Browser and Clips Workflow
tags: [technique, ableton, browser, samples, workflow]
---

# Sample Browser and Clips Workflow

Ableton's browser sidebar has two related but distinct citizens: **Samples** (plain audio/one-shots, filterable by auto-tag) and **Clips** (a MIDI or audio clip that carries its *own* device/effects chain along with it — dragging one in brings the processing, not just the raw audio). Treating both as first-class production tools — building personal reusable libraries, saved searches, and genre/region-filtered clip browsing — speeds up idea capture without giving up the ability to reshape everything afterward. Companion to [[Drum Rack]], [[Drum Sampler]], [[Sampler]], [[Randomized Rack Design]], and [[Sampling and Sound Selection]] (which covers *where* to source samples; this note covers the *browser mechanics* once you have them).

## What a "clip" actually is
- **An editable sample with its chain attached.** Selecting a clip in the sidebar previews it; dragging it into a track brings the MIDI or audio *and* whatever effects chain/device processing it was built with — not a frozen render.
- **Why not just export/bounce instead?** A clip built from several combined slices (e.g. a vocal-echo texture stitched from many vocal grabs) stays *variable* — you can still swap which slice plays, retranspose it into a new key, or otherwise reshape it in the new project. A bounced sample or a saved rack preset loses that flexibility.
- **Build a personal reusable-clips folder** (e.g. a "dank clips" sidebar folder) for atmosphere textures, echo/vocal fragments, and other song-parts worth reusing — drag a keeper clip into the folder from any project, then drag it back out into a future one with its chain intact.

## Saved searches
- **Preset + custom tags, including key/groove/creator/device-type, grouped your own way** — the improved Live 12 browser ships preset tags to filter and organize by (including **key**, **groove**, who made a sample, and what kind of device it is), plus the ability to make your own tags and your own custom **tag groups** on top of the presets — a much deeper organization system than plain folder sorting for a large personal library. — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **The saved-search "+" button — one click to pin a filtered term to the sidebar** — type a search term (e.g. "water"), press the **+** button next to it, and that exact search appears as a standing shortcut in the sidebar — click it any time to instantly re-run the same filtered search rather than retyping it. — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Filter, then save the search itself.** In the Samples tab, filter by tags (e.g. **One-Shot** + **Hi-Hat** + **Closed Hi-Hat** — auto-detected across your whole library if auto-tagging is on) and click the save-search button to keep that filtered view permanently in the sidebar (name it something findable, like "hi-hat one-shot"). Live 12.2 lets you customize the saved search's icon.
- **Sort the saved search differently depending on the moment** — by most-used, by date-modified, or by other available sort fields — rather than always browsing the same order.
- **Grab enough to matter.** For a chain-selector/randomized pad (see [[Randomized Rack Design]]), highlight a large batch (100+) of a saved search's results and drag the whole batch into a Drum Rack pad at once rather than one at a time.

## The Clips tab specifically
- **Filter by "drum clip" and sort by genre** (e.g. trap) for full, ready-made drum *patterns*, not just one-shots — these come with an entire MIDI pattern, and sometimes multiple takes are worth auditioning before one clicks.
- **Filter by "percussion clip" and sort by "Place"** (region/origin, e.g. Latin percussion) when browsing percussion-specific clip patterns rather than plain one-shot hits.
- **Drag onto an existing Drum Rack track vs. a blank track — different result.** Dropping a Clips-tab drum pattern onto a *blank* track brings its own kit along; dropping the same clip onto a track that **already has a Drum Rack loaded** gives you just the MIDI pattern, mapped onto your existing kit — the way to grab a pattern's rhythm without disturbing a kit you've already built.

## Similar Samples (Live 12)
- **Find-similar search, browser-wide and inside racks** — select any sample and press the **Similar Samples** button to surface other files in your whole library the browser judges sonically close to it — not just a sidebar convenience: the same button (with a **rotate arrow**) appears on every pad of a loaded [[Drum Rack]], so a kick/snare/hat pad can be cycled through library-wide similar matches one press at a time, independent of whatever selector/rotation rig is already built into the rack. Works on **any** kit — one you built, or a stock kit dragged in from the Packs tab (filter **drum clip** to preview ready-made drum MIDI patterns; dropping one onto a blank track brings its own kit along, fully rotatable the same way). **Lock** a pad's sample to exclude it from rotation while cycling everything else (e.g. keep a kick you like, roll the rest). A kit-wide version also exists — rotate an entire kit's samples in one action rather than pad by pad. → [[Drum Rack]] — dnksaus, [Generating Drum Kits](https://www.youtube.com/watch?v=Beyps5u4DSg)

## Pad-wide mapping once loaded
- **Pitch device on siblings = MIDI transpose, not audio pitch.** Adding a Pitch device to a hi-hat pad and mapping its Transpose knob to a macro (Map to All Siblings) changes *which* MIDI note (and therefore which loaded sample) plays — it isn't retuning the audio. To actually change the pitch of every hi-hat, map the *Transpose knob itself* (via right-click → Map to Macro → Map to All Siblings) instead.
- **Map Sustain and Decay to all siblings** so the whole kit's envelope shape moves together from one macro.
- **Random Pan to all siblings** — a macro-mapped random-pan amount gives every hit in the kit a slightly different stereo position per trigger, cheap per-hit variation without touching each pad by hand.

## Reusing clips across projects
- **Pull a clip from an old project's session** (e.g. a saved automation pattern with a distinctive rhythmic/random character) into a new one, take just the useful bars, retranspose the part, and bounce (Command+B) — old sessions are a searchable personal sample/pattern library, not just finished songs. → [[Committing and Printing]] (the same graveyard-mining move applied specifically to unblocking a stuck, unfinished song — "harvest a part from an abandoned project")
- **Clips get the idea down; slicing/tweaking makes it fit.** The overall philosophy: use clips to sketch fast, then adjust which slices play (or re-slice) to fit the actual arrangement rather than treating the first drag-in as final.

## See also

- Plugins: [[Drum Rack]] · [[Drum Sampler]] · [[Sampler]] · [[Simpler]] · [[Granulator 3]]
- Techniques: [[Sampling and Sound Selection]] · [[Randomized Rack Design]]
- Palette: [[Sound Palette]]

## From videos

- **The improved Live 12 browser: filters, custom tags (key/groove/creator/device-type), tag groups, and the saved-search "+" button** — full mechanics documented above under Saved searches. → [[Drum Rack]] — dnksaus, [Live 12 has more features than you think...](https://www.youtube.com/watch?v=TwkIhzIqho8)
- **Similar Samples — browser-wide find-similar + the per-pad rotate arrow inside Drum Rack** — full mechanics documented above: rotating a pad through library-wide similar matches, working on any kit (self-built or a Packs-tab drum clip), locking a pad out of rotation, and a kit-wide rotate-everything version. → [[Drum Rack]] — dnksaus, [Generating Drum Kits](https://www.youtube.com/watch?v=Beyps5u4DSg)
- **Clips (browser) vs. plain samples, saved searches, the Clips tab's drum/percussion filters, and pad-wide macro mapping** — the full mechanics documented above: personal reusable-clips folders, saving a filtered search with a custom icon (Live 12.2), drum-clip/percussion-clip filtering sorted by genre or region, the drag-onto-existing-rack-track MIDI-only behavior, Pitch-to-all-siblings as a MIDI (not audio) transpose, and Sustain/Decay/Random Pan macro-mapping across a whole kit. → [[Drum Rack]], [[Drum Sampler]] — dnksaus, [don't sleep on the CLIPS tab](https://www.youtube.com/watch?v=6CI_iC8fyic)
- **Index a huge sample library and use star ratings for instant recall (Cubase MediaBay).** Rather than manually organizing folders, search within selected folders (e.g. "percussion") across the whole indexed library, filter by your own star ratings (e.g. "show me all my rated kicks") to resurface proven favorites fast, and sort by duration to pull the right length on the spot — indexed search + personal ratings beats manual folder-diving at scale (~1.5 TB in his case). → [[Sampling and Sound Selection]] — Ian Kirkpatrick (Sol State), [Music Production Q&A with Dua Lipa producer Ian Kirkpatrick](https://www.youtube.com/watch?v=jELfbaiWEG4)
