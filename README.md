# Music

One music app with several tools inside it. Open Music, pick a tool.

Live at <https://harrisn1229-code.github.io/music/> (GitHub Pages, deployed from
`main`).

| Tool | Folder | What it does |
| --- | --- | --- |
| Practice Log | `log/` | Time spent in each tool and what was done, recorded on its own (no timers to start) |
| Timer | `timer/` | Pomodoro, timer and stopwatch for time outside the other tools (production sessions), and time added by hand; logs to Practice Log by activity |
| Originals | `originals/` | Your own songs: ideas, lyrics, a notes thread, and Barline charts filed in Originals (opened from Library) |
| Scratchpad | `scratchpad/` | A daily brain dump; the assistant sorts it into piles and sends song ideas on to Originals |
| Barline | `barline/` | Chord charts with a click track |
| Note Cards | `note-cards/` | Flashcards for modes, arpeggios, triads and 7th chords, plus scale degrees, intervals and progressions on the neck |
| Library | `library/` | No home tile of its own: its shelves (Modes, Chords, Arpeggios, Chains, Drills, My files) are each a tile in Reference |
| School | `school/` | The curriculum and your progress: classes, lessons, quizzes and tests |
| Ear Training | `ear/` | Scale degrees over a drone: degrees, melodies, singing and hands-free listening |
| Tuner | `tuner/` | Microphone tuner for guitar, bass and ukulele, with reference tones |
| Metronome | `metronome/` | Click with accents, subdivisions, swing, speed trainer, gap click, presets, and Library's drills to practise with it |
| Play Along | `playalong/` | Photograph sheet music or tab; Claude reads it once, then it plays back with a moving cursor, click, count-in, loop and tempo control |
| Voice Memos | `memos/` | Record yourself playing and listen back: waveform, slow-down, loop, share |
| Circle of Fifths | `circle/` | The circle with key signatures, scales, diatonic chords and common progressions in any key |

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
shared/log.js          The practice log: loaded by settings.js on every page, counts time and records what was done
shared/timer.js        The Timer's clock: loaded by settings.js on every page, so a running timer shows and finishes anywhere
shared/cloud.js        The one email account: sign-in, saved data, private files
shared/cloud-config.js Which Supabase project the account lives in (empty = no accounts)
shared/vendor/         The Supabase browser library, and marked (Markdown for Library's chain notes)
cloud/setup.sql        One-time database setup for accounts
barline/               Barline, self-contained
note-cards/            Note Cards (reads shared/theory.js)
library/               Library (reads shared/theory.js; chains.json is built from the vault)
ear/                   Ear Training (index.html, app.js, app.css; synthesizes all its sound)
tuner/                 Tuner (index.html, app.js, app.css; pitch detection in the browser)
metronome/             Metronome (index.html, app.js, app.css; look-ahead Web Audio scheduler; drills.js reads Library's drills)
timer/                 Timer (index.html, app.js, app.css; the timing itself is shared/timer.js)
playalong/             Play Along (index.html, app.css and score/store/engine/transcribe/views/abc/viz/app .js; samples, importer; photos in IndexedDB, scores in localStorage)
memos/                 Voice Memos (index.html, app.js, app.css; recordings kept in IndexedDB on the device)
circle/                Circle of Fifths (index.html, app.js, app.css; reads shared/theory.js)
originals/             Originals (index.html, app.js, app.css; owns the assistant's Originals tools)
scratchpad/            Scratchpad (index.html, app.js, app.css; owns the assistant's Scratchpad tools)
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
   shows the icon and the name, nothing else, in the order of that list. `home: false` keeps a
   tool off the home screen (Originals is opened from Library) while it is still saved offline and synced. Files used by more than
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

School is just the curriculum and your progress. Covers, Drills (and every drill page), Tools,
My files and Ear training are Library's. They are built from the same notes as School, so they
run on the same engine opened in a second mode, `school/library.html`, which the Library tool's
front page links to; nothing is shipped twice. Each page sends the other's routes across: a
lesson's link to a drill opens it in Library, a drill's link to a course opens it in School.

The practice history (drill tempo logs) belongs to Library: `library:practice` on the device and
the `practice` document in the account, merged drill by drill. School's Hanon lessons log into
it too; School's own progress (`school:progress`) no longer holds it, and any copy found there (an
older device, an old backup) is folded in on load.

Library has no front page: each shelf is its own tile in the home screen's Reference section (`shortcuts`
in `apps.js`): Modes, Chords and Arpeggios (`library/#/modes` etc.), Production chains, Drills and My files.
Each page's bar shows that shelf's name and icon, with Home. All of them, and School, share one look — School's
is `school/music-skin.css`, written from the `music-school` repo.

### Production chains

Library's Production chains shelf (`library/#/chains`) is every FX chain note in the vault: the
track, group, bus, send and master chains and the artist chains, searchable and filterable by
family and type, with a picks list kept on the device (`library:chain-picks:v1`). The notes stay in
the vault (`00 Human/20 Music/School & Content/Production/Chains/`); `library/chains.json` is built
from them, never edited by hand:

```
python3 library/build-chains.py ~/Documents/hyperion
```

Links between chain notes become links inside Library and `FX Chain System.md` becomes the shelf's
"How the chains fit together" page; links to any other vault note become plain text, and vault
paths are left out. Rebuild after editing a chain note, raise `version` in `apps.js`, and publish.

Plugin screenshots come from the vault too (`Production/Plugins/Images/`). Each chain step that
links a plugin note gets its screenshot under the heading, and each signal-chain step opens it.
The numbered (`.annotated.png`) version is used where there is one, so the ① ② ③ in the notes
match the badges, and the caption names them from the plugin note's Key Parameters table. The
build shrinks them to WebP in `library/plugins/` (needs Pillow: `pip3 install pillow`). They are
not saved for offline use up front; each is kept once it has been viewed. Screenshots that show
the wrong thing (a YouTube thumbnail, an empty device) are listed in `SKIP` in the build script
until they are re-shot.

## Claude

`shared/ai.js` is the one connection to Claude. The key is the musician's own Anthropic API key,
saved on the device under `music:aiKey` (never in a backup, never synced), and requests go
straight from the device to Anthropic. A key added in any tool works in all of them. A tool calls
`MusicAI.call({ system, messages, tools, tool_choice })`. For long answers, `stream: true` reads the reply as it is
written (with `onDelta` as it grows), so a request is never silent for minutes; the result has the same shape.

`shared/assistant.js` is the one assistant for the whole app (`MusicAssistant`). A page mounts it
with `MusicAssistant.mount({ app, button, context, tools })` and puts the sparkle button in its top
bar (any element with `data-assistant` opens it). `context()` says where the musician is; it is sent
in square brackets at the start of each message. The tools a page owns go in `tools` (Barline: the
chart tools; Originals and Scratchpad: their own tools; Ear Training: the feeling tools). From any other page the
assistant opens the owner in a hidden frame (`?bridge=1`, which shows nothing and opens no sheets)
and calls it with `postMessage`. A tool result may carry an `action` with plain-data `undo`
(handed back to the owner's `__undo`) and a `link` (`href` relative to the Music root). The theory,
stats and settings tools are in `assistant.js` itself. The conversation is kept in sessionStorage
so it follows the musician from tool to tool.

## Originals

Originals is the musician's own songs, a tool of its own (it used to be a shelf inside School). An
idea has a title, a status (spark, working, parked, done), key, tempo and feel, the idea, its
lyrics and a thread of notes. Any Barline chart in a folder called "Originals" is listed too, read
live from Barline's storage and opened in Barline. Saved under `originals:v1`; with an account it
syncs idea by idea. On first open it brings over the ideas from School's old board
(`school:progress` → `originals`, on the device and in the account), keeping their ids. The
assistant's tools: `list_originals`, `get_original`, `add_original_idea`, `update_original`
(`add_lyrics` and `add_note` append, so nothing written is lost).

## Scratchpad

Scratchpad is a brain dump: type or dictate a note, save it, move on. A note is kept exactly as
written. Sorting splits it into pieces filed in piles (Song ideas, Lyrics, Chords & riffs, Practice,
Production, Gear, To do, Other). The Sort button asks the assistant to do it (`MusicAssistant.ask`):
it reads the unsorted notes (`list_scratch`), sends a new song idea to Originals (lyrics for a song already
there are added to it) and kept chords to a Barline chart in Originals, and files every piece with `sort_scratch`, noting where each
went. A note can also be filed by hand from its sheet. `add_scratch` lets the assistant jot a note
from anywhere in Music. Notes are saved under `scratchpad:v1`; with an account they sync note by
note (newest change wins, deletions kept as tombstones for 120 days).

## Practice Log

`shared/log.js` runs on every page in Music, because `shared/settings.js` (which every tool loads,
School included) loads it. Nothing has to be started:

- A tool's time counts while it is on screen and was touched in the last 8 minutes, or while it
  is making sound. A chart left open on the stand keeps counting while you play; a locked phone
  stops the clock. Hidden frames (the assistant's bridges, the home screen's sync) never count,
  and neither does Practice Log itself.
- Time goes into sessions; moving between tools stays in one session, a 15-minute gap starts a
  new one.
- What was done comes from small calls in each tool: `MusicLog.playing(key, on, {text})` for
  sound (the metronome and Barline's click with their tempos, the tuner, Ear Training's drone and
  hands-free), `MusicLog.count(key, text, {unit, ok})` for cards rated and questions answered, and
  `MusicLog.event(key, text)` for charts opened, keys and lookups that stayed on screen. Drill
  tempos (`library:practice`) and the School page open for 30 seconds are picked up without
  School being changed.

Saved under `log:v1`; with an account Practice Log merges it with the `log` document (sessions by
id, deletions kept). The assistant reads it with `practice_log`.

## Timer

For time the other tools can't see: a production session in the DAW, practice away from the
phone, or a pomodoro around work in other tools. Three modes: Pomodoro (focus, break, a long break
every few rounds), Timer (a countdown) and Stopwatch. Each block is for an activity (Production,
Mixing, Songwriting, Guitar, Bass, Piano, or your own), picked from a row of chips.

- `shared/timer.js` does the timing, and `settings.js` loads it on every page. The run is saved as
  timestamps under `timer:run`, so it keeps time with the phone locked or the page closed. A running
  timer shows as a pill in every tool's top bar (on the home screen, on the Timer tile), and
  whichever page is open when a block runs out finishes it: a chime, a notification if turned on, the
  block logged, the pomodoro on to its break. A worker ticks once a second so a background tab on a
  computer finishes on time.
- Focus time is logged, breaks are not. A block goes into the log with `MusicLog.record` as one line
  ("Production · Pomodoro", 25m) with its activity in `tag`. Time other tools counted while it ran is
  left out of the Timer's share of the session (`covered`), so nothing is counted twice; the Practice
  Log's "Timed" card shows whole blocks by activity. Stretches under a minute are not logged.
- A block that ran out while nobody was looking is logged with the time it really ended, without a
  late chime, and a pomodoro never starts its next focus block on its own unless someone is there.
- After logging: Undo or Edit (length, when, activity, a note). Today's blocks are listed under the dial
  and can be edited or deleted. A stopwatch stopped after more than 3 hours asks how much to log.
- Add time (+ in the Timer's bar, or in Practice Log's): time spent away from the phone, entered by
  hand with its length, day, start time, activity and note (`MusicTimer.add`). It goes into the session
  it falls in, or one of its own on that day, so it counts toward that day's total and streak. Tapping a
  Timer line in Practice Log opens it in the Timer to change or delete (`timer/#edit=<id>&back=log`).
- Settings (`timer:prefs:v1`): pomodoro lengths and rounds, starting breaks / focus on their own,
  sound, keep the screen on (on by default, so a phone on the stand chimes), notifications, and the
  activity list. Tapping the time when stopped types its minutes.

## Metronome drills

The Metronome's Practice section has a Drill row: choose any technique drill or practice routine
from Library's Drills shelf and the metronome is set up for it (its tempo ladder on the speed
trainer, its length on the timer). Whatever is changed while a drill is in use is remembered as
that drill's setup (`drillSetups` in `metronome:prefs:v1`), so it comes back as it was left.

- The list is read from School's curriculum (`school/data/curriculum.json`, School's saved copy
  first), so a drill added to School shows up here with nothing to do; only the drills are kept,
  under `metronome:drills:v1`, and re-read when School's copy changes.
- Every run of 30 seconds or more (count-in not included) is logged into Library's practice history
  (`library:practice`, the same record the drill's page shows): its time, and the fastest bar played
  right through as the tempo. Runs of one drill on one day add up into one entry (`by: "metronome"`).
  Signed in, it is merged into the account's `practice` document the way School does it.
- `metronome/#drill=<id>` opens the Metronome with that drill loaded. Every drill's page in Library
  has a "Practise with metronome" button that links there (built from `music-school`).

## Play Along

Photograph (or pick) pages of sheet music, tab or a PDF; Claude reads them once and the piece then plays
back from the app itself, as a practice player. Views: Score (notation and tab stacked, one staff per part),
Notation, Tab, Chords (lead-sheet grid) and Page (the photos, with the current bar boxed). Every bar can carry its own
time signature, key and tempo, a section name, lyrics, dead notes and a box on the photo; extra staves (drums, piano...)
are parts. The dock has speed as a percent of the written tempo (25-200%, shown with the bpm), loop, play and a More
panel (speed presets, click, count-in, speed trainer +2/+5/+10 up to a target, save loop, full screen, keys). Four sheets:
Mixer (volume, mute, solo, show/hide and sound per part, "Your part", click and master), Display (notation, tab, chord
names, pitch names, counts, bar numbers, lyrics, expand repeats, wrapped or horizontal layout, zoom 60-200 with pinch,
focus loop, transpose -12..+12 saved per piece), Sections and a fretboard or keyboard panel that lights the current notes.
Loops are chosen by dragging over bars (handles to adjust) and can be saved as clips; Space, arrows, L, [ ], M, C, F and ? are shortcuts.
Sound comes from `samples.js` (the sampled instruments) with the synthesized models as fallback, so playback works offline.

Files: `score.js` (score v2 helpers: per-bar meta, parts, normalisers, checks, transpose), `store.js` (localStorage + IndexedDB),
`engine.js` (timeline and audio, per-part buses), `transcribe.js` (request and image prep), `views.js` (tab, chords, page, loop
selection), `abc.js` (notation and Score view), `viz.js` (fretboard/keyboard), `app.js` (UI), plus `samples.js`, `import.js`,
`media.js`, `listen.js` from earlier phases (the last two are not loaded yet). Other tools can hook in with `PA.on` /
`PA.emit` (open, leave, play, pause, seek, speed, frame, view, loop, clips, main, rebuild) and `PA.app`.

Data stays on the device: scores and player settings in `playalong:v1` (localStorage), the page photos (JPEG,
long edge 2400) in IndexedDB `music-playalong`. Nothing is synced. Only the transcription request leaves the
device, through `shared/ai.js` (the musician's own key). PDFs are drawn with School's pdf.js, loaded only when one is picked.

Transcription is one streamed request per page (the dialog shows the bar being read): the whole page and close-ups of its top and bottom halves, with
`save_transcription` forced as the tool. Answers are normalized (fractions to numbers, bad pitches dropped),
tab and staff are made to agree (the staff pitch is what sounds), and every bar is checked against the time
signature. A second request per page, `fix_bars`, re-reads only the bars that don't add up; any still wrong
get an amber dot and play as written.

## Voice Memos

Records with the microphone's raw sound (echo cancelling, noise suppression and auto gain off, so
an instrument sounds like itself), as `audio/mp4` on iPhone and WebM elsewhere. Recordings stay on
the device in IndexedDB (`music-memos`), never in the account. While recording, the screen is kept
awake and the take is saved to a draft every few seconds; leaving the page saves it, and a draft
left behind becomes a memo the next time Voice Memos opens. Playback slows to 0.5× or 0.75×
without changing pitch, loops, and shares the file. Recording and listening back count in the
Practice Log.

## Accounts

A Music account is an email and a password, and it is one sign-in for the whole app: the cloud
button on the home screen opens it (the first time Music is opened on a device it is offered
once), and a tool that needs it links there with `../#account`. Signed in, every tool that syncs
keeps its data in the account: Barline its charts (`barline`), Note Cards its ratings
(`note-cards`), School its progress (`school`), Library's shelves their practice history
(`practice`), Scratchpad its notes (`scratchpad`), Originals its songs (`originals`). A device that was syncing through GitHub keeps
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
