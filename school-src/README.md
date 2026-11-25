# Music School

A self-paced music school that runs in the browser and installs like an app: classes, courses and
lessons, homework, spaced-repetition quizzes, ear training, technique drills with a tempo log, a
song library, and the notes behind all of it.

**Open it:** <https://harrisn1229-code.github.io/music/school/>. School is one of the tools inside
the Music app; this folder (`school-src/` in the music repo) is its source (the notes and the
build), and the built app is written into the repo's `school/` folder. Until 2026-11-25 this was
its own repo, `music-school`.

- **Progress** is saved on the device as you go. Signed in to a Music account (email and
  password), it is saved to the account too and follows you to every device. *Activity & backup*
  also exports and imports it as one file.
- **Tests are sat and marked in the app.** You answer on the page; Claude marks it through your own
  Anthropic API key (the same connection the rest of Music uses) and the result goes straight
  into your progress.
- **Nothing licensed is in here.** See below.

## What is not included, and how the app handles it

The music repo is public, so it carries only what can be given away. Wherever the school uses something
that can't be, the app shows a slot with the file's name and you add your own copy. Copies are kept
in the browser on that device (IndexedDB). They are never uploaded, and they are not part of a
backup or of sync.

| Not in the repo | In the app |
| --- | --- |
| *A Modern Method for Guitar, Vol. 1* (Leavitt, Berklee Press) — courses 25–28 | Each lesson draws the pages it cites from a PDF of the book |
| Chord-chart and sheet-music PDFs for the song library | Each song shows the chart it expects |
| Album art | Lettered tile until there is a cover |
| Screenshots and handouts that notes embed (plugin screens, third-party PDFs) | A slot in the note, by file name |
| Video transcripts | Not used; notes link to the video |
| Video thumbnails | Linked from YouTube when online, not copied |

Where those files come from:

- **From the account.** They are kept in a private storage bucket. Anyone on the account's members
  list gets each file automatically the first time it is needed; it is then kept on the device.
  An owner fills the bucket simply by adding files in the app.
- **By hand.** Without an account (or off the members list), add your own copy. It is kept in the
  browser on that device.

**My files** in the app lists every slot. Files are matched by **name**, so *add files* or *add a
folder* takes a whole pile at once and keeps only what the school has a place for.

*The Virtuoso Pianist* (C. L. Hanon, 1873) is in the public domain and ships with the app.

## What is in here

```
00 Human/20 Music/School & Content/
    Curriculum/               Classes, courses, concepts, tests, school config
    Theory/ Guitar/ Bass/ Piano/ Production/ Ensemble/ Song Library/ YouTube Notes/
                              The notes the lessons read from (Markdown, Obsidian-style links)
Machine/Scripts/school-artifact/
    build.py                  Builds the app (../school/) from the notes
    app.js  app.css           The app
    app-shell/                index.html, start-up, offline worker, file store, Music skin, icons, pdf.js
Machine/School/               syllabus.json, eartrain.json
Machine/Workflows/school.md   How the school itself works (enrolment, releases, tests)
```

## Changing it

1. Edit a note, `app.js`, `app.css`, or something in `app-shell/`.
2. Rebuild, from the root of the music repo: `python3 school-src/Machine/Scripts/school-artifact/build.py`
   (needs Python 3 with `markdown`; `poppler` + `imagemagick` only if the Hanon pages in
   `school/books/` are ever deleted).
3. Commit and push the source and the rebuilt `school/` together. Pages updates in a
   minute or two. An installed copy picks the new version up in the background and shows it the
   next time it is opened.

`build.py --artifact --user <name> --new-user --out school-<name>.html` still writes the old
single-file page (the one published as a Claude artifact).

## Licences

The school's own notes, curriculum and code are © their author. The bundled third-party piece keeps
its own licence: pdf.js in `app-shell/vendor/pdfjs/` (Apache 2.0).
