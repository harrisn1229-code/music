/* Woodshed registry: the one list of apps inside Woodshed.

   Two things read this file:
   - the home screen (index.html) draws one tile per app from it;
   - the service worker (sw.js) saves every file listed here so the whole
     of Woodshed opens with no connection.

   To add an app:
   1. Put it in its own folder next to barline/ and note-cards/.
   2. Add an entry below. "files" lists every file in that folder the app
      needs to run (paths are relative to the app's folder).
   3. Raise "version". Do the same whenever any file in Woodshed changes,
      so phones that already have it installed pick up the new copy.

   See README.md for what an app's own page needs (home button, shared
   install and offline files). */
self.WOODSHED = {
  version: "1.0.0",
  apps: [
    {
      id: "barline",                       // folder name, also the link from the home screen
      name: "Barline",
      about: "Chord charts with a click track",
      color: "#0F766E",                    // tile colour; white text sits on it
      icon: "icon-192.png",
      files: ["index.html", "icon-192.png", "vendor/abcjs-basic-min.js"]
    },
    {
      id: "note-cards",
      name: "Note Cards",
      about: "Flashcards for modes, arpeggios, triads and 7th chords",
      color: "#4D45E3",
      icon: "icon-192.png",
      files: ["index.html", "icon.svg", "icon-192.png"]
    }
  ]
};
