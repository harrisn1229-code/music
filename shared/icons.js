/* Music app icons: simple line art, one per app, keyed by the app's id in apps.js.

   Drawn on a 24 x 24 grid with strokes only (no fills), so the line colour is the
   app's colour and the tile behind it is plain white (light theme) or black
   (dark theme). The home screen puts these inline; each app's icon.svg is the
   same drawing.

   MusicIcons.svg(id)            the <svg> markup for one app ("" if there is none)
   MusicIcons.svg(id, "shelf")   the same for one of Library's shelves */
(function () {
  "use strict";
  var P = {
    // Practice Log: a stopwatch
    log: '<circle cx="12" cy="13.5" r="7"/><path d="M10 3h4M12 3v3.5M12 13.5V9.5M12 13.5l2.75 2M18.2 6.8l1.3-1.3"/>',
    // Timer: an hourglass
    timer: '<path d="M5.5 3h13M5.5 21h13"/><path d="M7.5 3c0 4.2 4.5 5.6 4.5 9s-4.5 4.8-4.5 9M16.5 3c0 4.2-4.5 5.6-4.5 9s4.5 4.8 4.5 9"/><path d="M9.6 7.6h4.8M8.6 18.4h6.8M12 13.6v2.4"/>',
    // Scratchpad: a notepad and pencil
    scratchpad: '<path d="M14.5 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h10a1.5 1.5 0 0 0 1.5-1.5V12"/><path d="M8 9h4M8 12.5h3M8 16h6"/><path d="M19.6 3.4a1.4 1.4 0 0 1 2 2L14 13l-2.6.6.6-2.6z"/>',
    // Originals: a music note with a spark
    originals: '<path d="M9 18V6l9-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="16" r="2.5"/><path d="M20 7.5v3M18.5 9h3"/>',
    // Library: books on a shelf
    library: '<path d="M3 20.5h18"/><rect x="4.5" y="5" width="3.5" height="15.5" rx=".5"/><rect x="8" y="3.5" width="3.5" height="17" rx=".5"/><path d="M8 7.5h3.5M8 16.5h3.5"/><path d="m13.6 6.4 3.4-.9 3.9 14.6-3.4.9z"/>',
    // Barline: a chord chart, bars with slashes
    barline: '<path d="M2.5 5.5h19M2.5 18.5h19M3 5.5v13M12 5.5v13M21 5.5v13"/><path d="m5.5 14.5 2.5-5M9 14.5l2.5-5M14.5 14.5l2.5-5M18 14.5l2.5-5"/>',
    // Note Cards: a stack of flashcards
    "note-cards": '<rect x="3" y="7" width="14" height="13" rx="2"/><path d="M7 4h12a2 2 0 0 1 2 2v10"/><path d="M7.5 13.5h5"/>',
    // School: a mortarboard
    school: '<path d="m12 4.5 10 4.5-10 4.5L2 9z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11"/><path d="M22 9v5.5"/>',
    // Ear Training: an ear
    ear: '<path d="M7 9.5a5 5 0 0 1 10 0c0 2.8-2 4-3 5.2s-1 2.3-1.6 3.3A2.8 2.8 0 0 1 7.5 17"/><path d="M10 10a2 2 0 0 1 4 0c0 1.2-1.2 1.6-1.6 2.6"/>',
    // Tuner: a gauge with its needle
    tuner: '<path d="M3.5 16.5a8.5 8.5 0 0 1 17 0"/><path d="M12 5.5V8M5.2 9.7l1.6 1.6M18.8 9.7l-1.6 1.6"/><path d="m12 16.5 3.2-5.5"/><circle cx="12" cy="16.5" r="1.5"/><path d="M5 20h14"/>',
    // Metronome: the body and its arm
    metronome: '<path d="M9.5 3h5l4.5 17.5H5z"/><path d="M5.9 16.5h12.2"/><path d="m12 16.5 5-9"/><path d="M15.4 9.6h2.6"/>',
    // Voice Memos: a microphone
    memos: '<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5v4M8.5 21.5h7"/>',
    // Play Along: a page with staff lines and a play triangle in a circle at the lower right
    playalong: '<path d="M13.5 20.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5h8.5L19.5 8.5v2.5"/><path d="M14.5 3.5v5h5"/><path d="M7.5 9.5h8M7.5 12.5h5M7.5 15.5h3"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M16.2 15.6v3.8l3.1-1.9z"/>',
    // Circle of Fifths: the circle with its twelve keys
    circle: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M7.5 4.2l1.25 2.17M15.25 17.63l1.25 2.17M4.2 7.5l2.17 1.25M17.63 15.25l2.17 1.25M4.2 16.5l2.17-1.25M17.63 8.75l2.17-1.25M7.5 19.8l1.25-2.17M15.25 6.37 16.5 4.2"/>'
  };

  // Library's shelves
  var S = {
    // Modes: a scale climbing step by step
    modes: '<path d="M3 20h4v-3.5h4V13h4V9.5h4V6h3"/>',
    // Chords: three notes stacked on one stem
    chords: '<ellipse cx="9" cy="18" rx="2.6" ry="2"/><ellipse cx="9" cy="13" rx="2.6" ry="2"/><ellipse cx="9" cy="8" rx="2.6" ry="2"/><path d="M11.6 18V3"/><path d="M15 6h5M15 11h5M15 16h5"/>',
    // Arpeggios: the same notes, one after another
    arps: '<circle cx="6" cy="18" r="2"/><circle cx="12" cy="14" r="2"/><circle cx="18" cy="10" r="2"/><path d="M8 18V7M14 14V5.5M20 10V4M8 7l12-3"/>',
    // Production chains: plugins wired one into the next
    chains: '<rect x="2.5" y="7" width="5" height="10" rx="1.2"/><rect x="9.5" y="7" width="5" height="10" rx="1.2"/><rect x="16.5" y="7" width="5" height="10" rx="1.2"/><path d="M7.5 12h2M14.5 12h2M5 10v1.5M12 13v1.5M19 10.5v2"/>',
    // Covers: a record
    covers: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 10.5a6 6 0 0 1 4-4M17.5 13.5a6 6 0 0 1-4 4"/>',
    // Drills: a dumbbell
    drills: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    // Originals: same as the Originals app
    originals: P.originals,
    // My files: a folder
    files: '<path d="M3 7.5A2 2 0 0 1 5 5.5h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 11h18"/>'
  };

  function svg(id, set) {
    var d = (set === "shelf" ? S : P)[id];
    if (!d) return "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
  }

  self.MusicIcons = { paths: P, shelves: S, svg: svg };
})();
