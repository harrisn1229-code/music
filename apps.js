/* Music registry: the one list of apps inside Music.

   Two things read this file:
   - the home screen (index.html) draws one icon per app from it, in this order;
   - the service worker (sw.js) saves every file listed here so the whole
     of Music opens with no connection.

   To add an app:
   1. Put it in its own folder next to barline/, note-cards/ and library/.
   2. Add an entry below. "files" lists every file in that folder the app
      needs to run (paths are relative to the app's folder).
   3. Raise "version". Do the same whenever any file in Music changes,
      so phones that already have it installed pick up the new copy.

   See README.md for what an app's own page needs (home button, shared
   install and offline files). */
self.MUSIC = {
  version: "1.7.0",
  // Files more than one app uses. Kept available offline like everything else.
  shared: ["shared/theory.js", "shared/account.js", "shared/ai.js", "shared/cloud-config.js", "shared/cloud.js", "shared/vendor/supabase.js"],
  apps: [
    {
      id: "library",
      name: "Library",
      about: "Songs, drills, and every mode, chord and voicing in any key",
      color: "#9F2D3F",
      icon: "icon-192.png",
      files: ["index.html", "icon.svg", "icon-192.png"]
    },
    {
      id: "barline",                       // folder name, also the link from the home screen
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
      name: "Note Cards",
      about: "Flashcards for modes, arpeggios, triads and 7th chords",
      color: "#4D45E3",
      icon: "icon-192.png",
      sync: { at: "shed-deck:syncedAt", gist: "shed-deck:gistId" },
      files: ["index.html", "icon.svg", "icon-192.png"]
    },
    {
      id: "school",
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
    }
  ]
};
