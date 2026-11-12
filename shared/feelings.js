/* The feel of each scale degree, after Max Konyi's scale-degree ear training.

   Ear Training shows these on its Feelings page, where each one can be rewritten in your own
   words; Note Cards deals them as a deck. This file is the one copy of the starting words and of
   the rule for reading your rewrites, so both tools always agree.

   Each entry: semitone (0-11 above the tonic), label (how it is written), slug (its address in
   Ear Training: ../ear/#/feelings/<slug>), name (how it is spoken), text (the starting feeling),
   confused (semitones of the degrees it gets confused with) and family ("5 world", "3 world"
   or ""). The list is in the order Ear Training shows them.

   Edits live in Ear Training's progress document (localStorage "ear:progress:v1") as
   `feelings: { "<semitone>": "text" }`, only for degrees that were rewritten. */
(function (root) {
  "use strict";
  var PROG_KEY = "ear:progress:v1";
  var LIST = [
    { semitone: 0, label: "1", slug: "1", name: "one", family: "", confused: [],
      text: "Perfect, complete, whole, resolved, stable — the minimum-energy state" },
    { semitone: 7, label: "5", slug: "5", name: "five", family: "5 world", confused: [0, 5],
      text: "Pure, stable, consonant, smooth, but active — open, expansive, outward" },
    { semitone: 5, label: "4", slug: "4", name: "four", family: "5 world", confused: [0, 10],
      text: "Neutral and pure like 5, but contractive, inward-curling, \"square\"" },
    { semitone: 4, label: "3", slug: "3", name: "three", family: "3 world", confused: [9, 11],
      text: "Sweetness, warmth, glow, vitality — a whole extra dimension 5 doesn't have" },
    { semitone: 2, label: "2", slug: "2", name: "two", family: "5 world", confused: [7, 9],
      text: "Clean, crystalline, placid, \"5 multiplied\" — sharper and more amped than 5" },
    { semitone: 9, label: "6", slug: "6", name: "six", family: "3 world", confused: [2, 4],
      text: "3's warmth mixed with 4's neutrality — softer, more pastel and muted than 3" },
    { semitone: 11, label: "7", slug: "7", name: "seven", family: "3 world", confused: [4, 6],
      text: "Melancholy, bittersweet — the 5 feeling and the 3 feeling together, sharpened by the half step against the tonic" },
    { semitone: 6, label: "♯4", slug: "s4", name: "sharp four", family: "", confused: [11, 1],
      text: "One of the strongest, most energized states — bright, strange, \"alien\", spiky; the opposite of 1" },
    { semitone: 10, label: "♭7", slug: "b7", name: "flat seven", family: "", confused: [5, 3],
      text: "Lightest of the minor-leaning degrees — powerful, playful, \"fun minor\", not dark" },
    { semitone: 3, label: "♭3", slug: "b3", name: "flat three", family: "", confused: [10, 8],
      text: "Defines minorness itself — dark, serious, gloomy; a bit of sorrow" },
    { semitone: 8, label: "♭6", slug: "b6", name: "flat six", family: "", confused: [3, 1],
      text: "More intense than ♭3, less than ♭2 — desperate, hopeless, no joy" },
    { semitone: 1, label: "♭2", slug: "b2", name: "flat two", family: "", confused: [8, 6],
      text: "The most extreme and dissonant — in-your-face, bitter, strongest tension" }
  ];
  var BY = {};
  LIST.forEach(function (d) { BY[d.semitone] = d; });

  /* The rewrites saved by Ear Training, read fresh each time: { "<semitone>": "text" }. Same
     tidying as Ear Training applies when it loads them. */
  function edits() {
    var out = {};
    try {
      var p = JSON.parse(localStorage.getItem(PROG_KEY) || "null");
      var f = p && typeof p === "object" ? p.feelings : null;
      if (f && typeof f === "object") Object.keys(f).forEach(function (k) {
        var v = f[k];
        if (/^(\d|1[01])$/.test(k) && typeof v === "string" && v.trim()) out[k] = v.replace(/\s+/g, " ").trim().slice(0, 200);
      });
    } catch (e) {}
    return out;
  }
  function edited(semitone) { return Object.prototype.hasOwnProperty.call(edits(), String(semitone)); }
  function text(semitone) {
    var e = edits()[String(semitone)];
    return e || (BY[semitone] ? BY[semitone].text : "");
  }

  root.MusicFeelings = { PROG_KEY: PROG_KEY, list: LIST, by: BY, text: text, edited: edited, edits: edits };
})(typeof self !== "undefined" ? self : this);
