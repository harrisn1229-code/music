# School artifact — what was removed, and why it is not coming back

A ledger for the things that used to be in `app.js` and are not any more. Deleting code loses the
reason it was written, and the reason is usually the useful part — without it the same idea gets
re-added by someone (including me) who only sees a gap.

**What this file is NOT.** It is not a replacement for the `PATCH-nnn` comments in `app.js`. The
2026-08-25 audit proposed moving all 215 of them here. They stay. They are load-bearing: they sit at
the exact line where a decision binds, several of them record choices that were *reversed*, and more
than once this session a PATCH comment is the only thing that stopped a fix from re-introducing the
bug it originally described. Narrative that lives away from the code it constrains does not get read
at the moment it matters. This file is for code that no longer exists and therefore has no line to
sit on.

---

## 2026-08-26 — PATCH-145 / PATCH-146

Nothing was removed. This entry records a **claim that was wrong**, because it was made twice in
one session and would otherwise stand as settled.

**I said an upload button on the page was impossible. It is not.** Nate: *"give me an upload button
to upload homework resources. this shit is getting annoying. just make it simple."* He was right to
push.

The reasoning behind the refusal was sound as far as it went. The runtime serves this account four
capabilities — `artifact`, `downloads`, `mcp`, `self` — and **none is file storage**; `downloads`
sends files the other way and un-shareables the page besides; `mcp` un-shareables it too. And the
naive construction (`FileReader` → data: URI → `publish(whole document)`) really does fail three
ways: every `build.py` run regenerates the document and would erase it, the plugin's stubbed
`publish()` keeps only the progress island, and the bundle is 10.4 MB of a 16 MB ceiling.

**What that argument missed is that storage and the button are separable, and the page already has
a persistence channel.** The progress island survives saves, syncs AND rebuilds — that is how every
homework tick in this school survives — and it survives them because `sync.py` carries it home to
the vault and `build.py` reads it back. A file can ride the same channel. It does not need to live
in the page; it needs to live there **until the next sync**:

```
+ add files  ->  P.ext_files, saved by the normal autosave
             ->  sync.py (or the plugin, offline) writes it to Lessons/Resources/ and strips it
             ->  the next build renders it from disk (PATCH-145)
```

Each of the three objections dissolves against that: a rebuild cannot erase a file that is on disk
by then; the plugin does not drop it because the plugin is one of the two things that writes it
out; and `UP_BUDGET` bounds what is in flight at 2 MB rather than forever.

**The lesson worth keeping is the shape of the error, not the fact.** "Capability X is not
available, therefore the feature is impossible" is only valid when the feature genuinely needs X.
This one needed *durable* storage, and the durable store was the vault all along — already wired,
already synced, already rendered. Before refusing on a missing capability again, check what the
page can already persist and where that persistence ends up.

## 2026-08-26 — PATCH-144

**`readingLinks(t)`** and **the `data-openread` click branch** — PATCH-053's answer to a dead
`[[wikilink]]` on a **Read** line. It converted the FIRST `xlink-vault` span on the line into a
button that opened every reading fold beneath it, because the assigned slice was the only thing
this page held and an `obsidian://` URI cannot leave the artifact's sandboxed frame (PATCH-064).

Removed because the page now holds the whole note. Nate, 2026-08-26: *"i want those links to go
to the actual page instead of just expanding the section below. i like how it is now but want the
link to go to the actual page so i can get more info if i want."* The fold was never the problem —
it is the assigned reading and it stays exactly as it was. What was wrong was a name that looks
like a link and does something else.

**Do not re-add either.** The replacement is `sourceLinks()`, and its two differences are the
point. It runs ONCE over the whole rendered body instead of per Read line, because the same dead
span appears in `**The material**` bullets, inside pulled reading, and on a source page pointing
at another one — four places that were never going to stay in sync as four call sites. And it
matches on the note NAME against build.py's `srcindex` rather than on position, so a line whose
first link happens to be a concept or a test note no longer mis-targets. The old function could
not have done either: it keyed off `t.read`, which is a list of slices, and slices do not know
what note they came from.

## 2026-08-25 — PATCH-138

**`pruned()`** — built a trimmed copy of progress for a clipboard preview. Zero callers; the preview
it fed was replaced by copy-everything, because a pruned export silently dropped homework captures
and the semester start, and `sync.py` does its own pruning anyway. Do not re-add a client-side
pruner: there is exactly one place that decides what a progress file contains, and it is `sync.py`.

**The `downloads` branch of the copy handler** — offered `dl.save()` when `data-copy="p"|"h"` was
clicked. Nothing had emitted those attributes for months, and it could not have worked if it did:
**declaring the `downloads` capability makes an artifact un-shareable**, and this page must be
shareable, so the capability is deliberately never granted. Handler code for a capability the page
will never have reads as "downloads are supported here" — it is a trap, not a fallback.

**`drill.all`** — written on four paths, read on none. A leftover from when a session could be
"everything due" rather than a built queue.

**`lesson_pass` / `final_pass`** — pass thresholds shipped into the page that the page never
consulted. Grading lives in `/school test`, in the workflow, where a human is reading the answers.

**`bookShut` was NOT removed.** The audit listed it as write-only. It is not — there are real reads
at the book-viewer collapse. It is the one item on that kill list that was wrong, and it is recorded
here so the next pass does not take the audit's word for it.
