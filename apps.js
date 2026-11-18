/* Music registry: the one list of apps inside Music.

   Two things read this file:
   - the home screen (index.html) draws one icon per app from it, grouped by "section", in this order;
   - the service worker (sw.js) saves every file listed here so the whole
     of Music opens with no connection.

   To add an app:
   1. Put it in its own folder next to barline/, note-cards/ and library/.
   2. Add an entry below, with the home-screen section it belongs in. "files" lists every file in that folder the app
      needs to run (paths are relative to the app's folder).
   3. Raise "version". Do the same whenever any file in Music changes,
      so phones that already have it installed pick up the new copy.

   See README.md for what an app's own page needs (home button, shared
   install and offline files). */
self.MUSIC = {
  version: "1.30.0",
  // Files more than one app uses. Kept available offline like everything else.
  shared: ["shared/theory.js", "shared/icons.js", "shared/feelings.js", "shared/account.js", "shared/ai.js", "shared/assistant.js", "shared/settings.js", "shared/log.js", "shared/cloud-config.js", "shared/cloud.js", "shared/vendor/supabase.js", "shared/vendor/marked.min.js"],
  // Home screen sections, in order. Each app names its section; within a section apps keep the order below.
  sections: [
    { id: "practice", name: "Practice" },
    { id: "learn", name: "Learn" },
    { id: "write", name: "Write" },
    { id: "reference", name: "Reference" }
  ],
  apps: [
    {
      id: "log",
      section: "practice",
      name: "Practice Log",
      about: "Time spent and what you did, recorded on its own",
      color: "#0B7FA6",
      icon: "icon-192.png",
      sync: { at: "log:syncedAt" },
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "scratchpad",
      section: "write",
      name: "Scratchpad",
      about: "A daily brain dump the assistant sorts into song ideas, lyrics and more",
      color: "#A8740F",
      icon: "icon-192.png",
      sync: { at: "scratchpad:syncedAt" },
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "originals",
      name: "Originals",
      about: "Your own songs: ideas, lyrics, notes and Barline charts",
      color: "#B3245B",
      icon: "icon-192.png",
      home: false,                          // opened from Library, not the home screen
      sync: { at: "originals:syncedAt" },
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "library",
      section: "reference",
      name: "Library",
      about: "Songs, drills, production chains, and every mode, chord and voicing in any key",
      color: "#9F2D3F",
      icon: "icon-192.png",
      files: ["index.html", "icon.svg", "icon-192.png", "chains.json"]
    },
    {
      id: "barline",                       // folder name, also the link from the home screen
      section: "write",
      name: "Barline",
      about: "Chord charts with a click track",
      color: "#0F766E",                    // shown behind the icon while it loads
      icon: "icon-192.png",
      // A tool that syncs through GitHub says where it notes the time of its last sync and which gist it
      // uses, so the home screen can show its status and sync it along with everything else.
      sync: { at: "barline:syncedAt", gist: "barline:gistId" },
      files: ["index.html", "icon-192.png", "vendor/abcjs-basic-min.js"]
    },
    {
      id: "note-cards",
      section: "learn",
      name: "Note Cards",
      about: "Flashcards for modes, arpeggios, triads and 7th chords",
      color: "#4D45E3",
      icon: "icon-192.png",
      sync: { at: "shed-deck:syncedAt", gist: "shed-deck:gistId" },
      files: ["index.html", "icon.svg", "icon-192.png"]
    },
    {
      id: "school",
      section: "learn",
      name: "School",
      about: "Classes, lessons, quizzes, tests and a song library",
      color: "#33449E",
      icon: "icon-192.png",
      // School is far bigger than the other tools (the whole curriculum, a book of scans), so it
      // keeps its own service worker, which updates file by file. Music's worker only saves the
      // tile icon and leaves everything else under school/ alone; the home screen starts School's
      // worker in the background so School is ready offline too.
      worker: "sw.js",
      sync: { at: "school:syncedAt" },
      files: ["icon-192.png"]
    },
    {
      id: "ear",
      section: "learn",
      name: "Ear Training",
      about: "Scale degrees over a drone: degrees, melodies, singing and hands-free listening",
      color: "#C2570C",
      icon: "icon-192.png",
      sync: { at: "ear:syncedAt" },
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "tuner",
      section: "practice",
      name: "Tuner",
      about: "Microphone tuner for guitar, bass and ukulele",
      color: "#2F8F4E",
      icon: "icon-192.png",
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "metronome",
      section: "practice",
      name: "Metronome",
      about: "Click with accents, subdivisions, swing and practice tools",
      color: "#3B4252",
      icon: "icon-192.png",
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "memos",
      section: "practice",
      name: "Voice Memos",
      about: "Record yourself playing and listen back",
      color: "#D9483B",
      icon: "icon-192.png",
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    },
    {
      id: "circle",
      section: "reference",
      name: "Circle of Fifths",
      about: "Keys, signatures, scales, diatonic chords and progressions on the circle",
      color: "#5B3FA8",
      icon: "icon-192.png",
      files: ["index.html", "app.js", "app.css", "icon.svg", "icon-192.png"]
    }
  ]
};
