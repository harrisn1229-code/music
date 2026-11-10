# Music

One music app with several tools inside it. Open Music, pick a tool.

Live at <https://harrisn1229-code.github.io/music/> (GitHub Pages, deployed from
`main`).

| Tool | Folder | What it does |
| --- | --- | --- |
| Barline | `barline/` | Chord charts with a click track |
| Note Cards | `note-cards/` | Flashcards for modes, arpeggios, triads and 7th chords |
| Library | `library/` | Look up any mode, chord, arpeggio or voicing in any key |

Everything runs in the browser. Charts and ratings are saved on the device
(each tool's optional GitHub sync is the only thing that leaves it).

## What's in here

```
index.html             Home screen: one tile per tool
apps.js                The list of tools (read by the home screen and by sw.js)
sw.js                  Service worker: keeps every file available offline
manifest.webmanifest   Name, icon and shortcuts for the installed app
icon*.png, icon.svg    Music's own icon
fonts/                 Big Shoulders Display, the home screen's headline typeface
shared/theory.js       Music theory used by Note Cards and Library
barline/               Barline, self-contained
note-cards/            Note Cards (reads shared/theory.js)
library/               Library (reads shared/theory.js)
```

Each tool is a single `index.html` in its own folder. The home screen only
links to them and reads their saved data to show a small preview (last chart
edited, how the rated cards split, recent lookups). It never writes to it.

`shared/theory.js` holds the note spelling, modes, chord qualities, inversions,
voicings and guitar shapes. Note Cards drills it and Library looks it up, so a
change there shows up in both. Card keys built there are how Note Cards stores
ratings, so do not change how a key is built.

## Adding a tool

1. Put it in its own folder, e.g. `ear-training/`, with an `index.html`.
2. In that page:
   - link the shared install files:
     `<link rel="manifest" href="../manifest.webmanifest">` and
     `<link rel="apple-touch-icon" href="../apple-touch-icon.png">`;
   - register the shared service worker: `navigator.serviceWorker.register("../sw.js")`
     (do not give the tool a service worker or manifest of its own);
   - add a Home button that links to `../`;
   - save data under keys that start with the tool's name (`ear-training:…`)
     so tools never overwrite each other.
3. Add an entry to `apps.js` (name, one-line description, tile color, icon,
   and every file the tool needs). Files used by more than one tool go in
   `shared/` and are listed under `shared` in `apps.js`.
4. Raise `version` in `apps.js`.
5. Optional: add a shortcut for it in `manifest.webmanifest`, and a preview
   for its tile under `LIVE` in `index.html`.

## Updating

Raise `version` in `apps.js` whenever any file changes. Installed copies open
from their saved files first and fetch the new ones in the background, so a
change shows up the second time the app is opened after it is published.

## Bringing data over from the older separate apps

Barline and Note Cards used to live at `/barline/` and `/shed-deck/`. They use
the same saved-data names here, so in the same browser your charts and ratings
are already there. An app installed to a phone's Home Screen or the Mac Dock
keeps its own storage, so for those either turn on sync inside each tool on
both the old and the new app, or export a backup from the old app and import
it into the new one.
