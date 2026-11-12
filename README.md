# Music

One music app with several tools inside it. Open Music, pick a tool.

Live at <https://harrisn1229-code.github.io/music/> (GitHub Pages, deployed from
`main`).

| Tool | Folder | What it does |
| --- | --- | --- |
| Barline | `barline/` | Chord charts with a click track |
| Note Cards | `note-cards/` | Flashcards for modes, arpeggios, triads and 7th chords |
| Library | `library/` | Songs, drills and your own ideas, plus every mode, chord, arpeggio and voicing in any key |
| School | `school/` | Classes, lessons, quizzes, tests and a song library |
| Ear Training | `ear/` | Scale degrees over a drone: degrees, melodies, singing and hands-free listening |
| Tuner | `tuner/` | Microphone tuner for guitar, bass and ukulele, with reference tones |

Everything runs in the browser and is saved on the device. Three optional
things reach outside it, each only when you turn it on: a Music account (sync
for every tool), Claude (Barline's assistant, School's test marking), and the
older GitHub sync on devices that have not signed in yet.

## What's in here

```
index.html             Home screen: one app icon per tool, in the order of apps.js
apps.js                The list of tools (read by the home screen and by sw.js)
sw.js                  Service worker: keeps every file available offline
manifest.webmanifest   Name, icon and shortcuts for the installed app
icon*.png, icon.svg    Music's own icon
fonts/                 Big Shoulders Display, the home screen's headline typeface
shared/theory.js       Music theory used by Note Cards and Library
shared/account.js      The one GitHub connection every tool syncs with
shared/ai.js           The one Claude connection (your Anthropic API key) every tool uses
shared/assistant.js    The one AI assistant: a sheet opened from the home screen and every tool's top bar
shared/cloud.js        The one email account: sign-in, saved data, private files
shared/cloud-config.js Which Supabase project the account lives in (empty = no accounts)
shared/vendor/         The Supabase browser library
cloud/setup.sql        One-time database setup for accounts
barline/               Barline, self-contained
note-cards/            Note Cards (reads shared/theory.js)
library/               Library (reads shared/theory.js)
ear/                   Ear Training (index.html, app.js, app.css; synthesizes all its sound)
tuner/                 Tuner (index.html, app.js, app.css; pitch detection in the browser)
school/                School, built from the music-school repo. Do not edit by hand.
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
     so tools never overwrite each other;
   - if it syncs, load `../shared/account.js` and use `MusicAccount` for the
     token instead of keeping its own (see Sync between devices).
3. Add an entry to `apps.js` (name, color, icon, and every file the tool needs). The home screen
   shows the icon and the name, nothing else, in the order of that list. Files used by more than
   one tool go in `shared/` and are listed under `shared` in `apps.js`.
4. Raise `version` in `apps.js`.
5. Optional: add a shortcut for it in `manifest.webmanifest`.

## School

School is built from its own repo, [music-school](https://github.com/harrisn1229-code/music-school)
(the lesson notes and the build), straight into `school/` here:
`python3 Machine/Scripts/school-artifact/build.py --dest ../music/school`. Change it there, never
in `school/`.

It is much bigger than the other tools (the whole curriculum and a book of scans), so it is the
one exception to "no service worker of its own": `school/sw.js` looks after `school/` and updates
file by file. `apps.js` says so with `worker: "sw.js"`; Music's worker then leaves that folder
alone, and the home screen starts School's worker in the background so School is saved for
offline use as well. School does not need `version` raised when only `school/` changes.

### Library's shelves

Songs, Drills, Originals and My files are reached from Library, not from School. They are the
same notes and the same saved progress as School (a drill's tempo log and a song's status are
progress), so they are the same engine opened in a second mode: `school/library.html`, which the
Library tool's front page links to. School's own menu keeps only coursework and Classes.

Library opens on its shelves: Modes and chords (`library/#/theory`, the mode, chord and voicing
lookup), Songs, Drills, Originals and My files. All of them, and School, share one look — School's
is `school/music-skin.css`, written from the `music-school` repo.

## Claude

`shared/ai.js` is the one connection to Claude. The key is the musician's own Anthropic API key,
saved on the device under `music:aiKey` (never in a backup, never synced), and requests go
straight from the device to Anthropic. A key added in any tool works in all of them. A tool calls
`MusicAI.call({ system, messages, tools, tool_choice })`.

`shared/assistant.js` is the one assistant for the whole app (`MusicAssistant`). A page mounts it
with `MusicAssistant.mount({ app, button, context, tools })` and puts the sparkle button in its top
bar (any element with `data-assistant` opens it). `context()` says where the musician is; it is sent
in square brackets at the start of each message. The tools a page owns go in `tools` (Barline: the
chart tools; School: the Originals tools; Ear Training: the feeling tools). From any other page the
assistant opens the owner in a hidden frame (`?bridge=1`, which shows nothing and opens no sheets)
and calls it with `postMessage`. A tool result may carry an `action` with plain-data `undo`
(handed back to the owner's `__undo`) and a `link` (`href` relative to the Music root). The theory,
stats and settings tools are in `assistant.js` itself. The conversation is kept in sessionStorage
so it follows the musician from tool to tool.

## Accounts

A Music account is an email and a password, and it is one sign-in for the whole app: the cloud
button on the home screen opens it (the first time Music is opened on a device it is offered
once), and a tool that needs it links there with `../#account`. Signed in, every tool that syncs
keeps its data in the account: Barline its charts (`barline`), Note Cards its ratings
(`note-cards`), School its progress (`school`). A device that was syncing through GitHub keeps
doing so until someone signs in on it; after that the account is what the tools use, and what was
on the device is merged in. If a different person signs in on a device, Barline and Note Cards
will not hand the first person's charts and ratings to them, and School starts them fresh.

`shared/cloud.js` gives a tool three things: sign-in,
one saved document per tool that follows the account (`MusicCloud.load` / `save`), and private
files for the people on a members list (`member`, `listFiles`, `download`, `upload`). School
keeps its progress there and gets its chord charts, album art and book scans from there: files
that cannot be published with the app, so they live in a private bucket, never in this repo.

Accounts run on a Supabase project. Until one is named in `shared/cloud-config.js`, Music has no
accounts and everything simply stays on the device. To set it up:

1. Create a free project at supabase.com.
2. In the project's SQL Editor, paste and run `cloud/setup.sql`.
3. Run the two `insert into public.members` lines at the bottom of that file with real emails:
   `true` for an owner (may add files), `false` for a member (may see them).
4. Authentication, URL Configuration: set Site URL to `https://harrisn1229-code.github.io/music/`.
5. Project Settings, API: copy the Project URL and the `anon` `public` key into
   `shared/cloud-config.js`, raise `version` in `apps.js`, and publish.

Both values are meant to be public; what each signed-in person can read or write is decided by
the rules `setup.sql` puts on the database. Never put the `service_role` key anywhere in this repo.

An owner fills the files bucket from inside School: sign in, open My files, add a folder. Each
file that matches a slot is kept on the device and sent to the account.

## Updating

Raise `version` in `apps.js` whenever any file changes. Installed copies open
from their saved files first and fetch the new ones in the background, so a
change shows up the second time the app is opened after it is published.

## Sync between devices

Sync is set up once for the whole of Music, with the cloud button on the home
screen (or from inside any tool). A device connects with a GitHub token that
can only read and write gists; the token is saved on that device under
`music:ghToken` (`shared/account.js`).

Each tool that syncs keeps its own secret gist ("Barline sync", "Note Cards
sync") and does its own merging whenever it is open. To sync everything at
once, the home screen opens each of those tools out of sight for a moment and
lets it run its normal sync. A tool takes part by listing `sync` in `apps.js`:
`at` is the saved-data key where it notes the time of its last finished sync,
and `gist` is the key where it remembers its gist. Its sync should run on load
whenever `MusicAccount.token()` is set.

The gists are the same ones the older standalone Barline and Note Cards use,
so a device that connects here picks up everything those apps have synced.

## Bringing data over from the older separate apps

Barline and Note Cards used to live at `/barline/` and `/shed-deck/`. They use
the same saved-data names here, so in the same browser your charts and ratings
are already there. An app installed to a phone's Home Screen or the Mac Dock
keeps its own storage, so for those turn on sync in the old app, then connect
Music with the same token. (Exporting a backup from the old app and importing
it into the new one also works.)
