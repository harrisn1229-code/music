---
type: reference
tags: [originals, school, shared, log]
---

# Originals — log

Every input to the board, in one place, newest first. Who added an idea, who replied to one, what
got changed and when. The idea pages carry the *current state*; this is the record of how each of
them got there.

**Most of it writes itself.** `sync.py` appends a line here every time it turns a page capture into
a note or a comment into a thread entry, so the ordinary business of using the board is logged
without anybody remembering to. **Anything done by hand — trimming a page, renaming a song, moving
one in or out — is yours to add**, because nothing else knows it happened.

**Format**, one line each, newest at the top:

```
- **YYYY-MM-DD** · Who · what happened
```

Keep the *what* to one line. If it needs a paragraph it belongs in that idea's own `## Notes`
thread, which is where the reasoning lives — this page is an index of events, not a second copy of
the thinking. The board renders it folded at the bottom.

## Log

