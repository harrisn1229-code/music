---
type: reference
tags: [originals, school, shared]
---

# Originals — the shared idea board

Song ideas Nate and Britt are working on **together**. One note per idea. The school page renders
this folder as its **Originals** tab, and the tab can write back into it.

**This folder is shared.** It sits under `School & Content/`, so `sync-shared.sh` mirrors it into the
repo Britt clones — every note here reaches her, and every note she adds reaches Nate. Nate's own
song projects (`Users/Nate/Originals/`) and his seeds (`Users/Nate/Song Seeds/`) are deliberately
**not** here and are not shared. Moving one in is a decision: it puts the lyrics and the production
notes on a remote for good.

## The note

```
---
type: song-idea          # load-bearing — build.py picks the folder up on this, nothing else
title: Untitled loop idea
by: Nate                 # who started it. Written by the page from whose build it is.
status: spark            # spark | working | parked | done
key:
bpm:
feel:
started: "2026-09-10"
capture_id: idea-20260910-k3f9a2    # set once, never edited — see below
tags: [original, idea]
---

# Untitled loop idea

## The idea

The spark, in whatever shape it arrived.

## Notes

<!-- nid:m1x8ptq -->
### Britt — 2026-09-11

What she said back.

<!-- nid:k9a2z0v -->
### Nate — 2026-09-10

What he said.
```

`## Notes` is **newest-first**, like every other log in this vault. The page adds to the top.

**`## The idea` is a convention, not a limit.** It is the heading the page's own composer writes, and
a one-line spark needs nothing else. But the board renders **the whole body above `## Notes`** — so
an idea that grows sections (structure, a chart, voicings, production notes) shows all of them.
Write it however the song wants. Keep it to **tight lists and tables**: Nate, 2026-09-10, on his own
song page — *"too much content. i like simple to the point lists."* Long-form reasoning goes in the
`## Notes` thread underneath, where it is dated and attributed and out of the way.

## The two ids, and why they exist

Both exist to make a re-sync harmless, because the page keeps a capture in its progress island until
a rebuild replaces the page — and a save in between hands `sync.py` the same capture a second time.

- **`capture_id`** — stamped on the note by `sync.py` the first time it writes it. A capture whose id
  already appears on a note here is skipped, not written again, and the page stops listing it
  separately once it sees the id come back in the build.
- **`<!-- nid:… -->`** — the same trick one level down, for a single comment. Without it a re-sync
  would append the same paragraph again under a second identical heading.

**Do not edit or reuse either.** Delete the note and the id goes with it; that is the only correct
way to get rid of one.

## The log

`_Log.md` is the record of **every input to the board** — one line per event, newest first, across
all the ideas. An idea page is its current state; its `## Notes` thread is its reasoning; the log is
what happened, in order, without opening six notes to find out.

- **`sync.py` writes most of it.** Every idea it files and every comment it appends adds a line, so
  ordinary use logs itself. A capture the dedupe skips writes no note and therefore no line.
- **Anything done by hand is yours to add** — trimming a page, renaming a song, moving one in or
  out. Nothing else knows those happened.
- **One line, and keep it one line.** `- **YYYY-MM-DD** · Who · what happened`. A line that does
  not match that shape is skipped by the build and reported as `!` rather than half-rendered.
- If it needs a paragraph it belongs in that idea's `## Notes`, not here. This page is an index of
  events, not a second copy of the thinking.

The board renders it folded under the cards.

## Writing here by hand

Fine, and expected — this is a vault folder like any other. Give a new note a `type: song-idea` and a
`capture_id` of your own (any unique string) and the next build picks it up. A note with no
`capture_id` still renders; it just can never be matched to a page capture, which only matters if you
also captured it on the page.

## What this folder is not

- **Not a song project.** When an idea turns into something real it graduates to a full
  `type: original` note in the writer's own `Users/<Name>/Originals/`, which is private. Leave a line
  here saying where it went.
- **Not assigned, due, or scored.** Nothing here is coursework. The tab carries no numeral on the
  rail for the same reason Songs and Drills carry none: a numeral in that menu means work owed today.
