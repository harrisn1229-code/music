/* PA.notebook: the per-piece Notebook sheet (Soundslice's "Notebook"). Needs app.js (PA.app).
   Free-text notes (piece.notes, autosaved as you type), the practice history of the piece (piece.history: { at, secs, bpm, take?, wait?: {hit, of} }),
   the total time, and the transcription notes (what the AI wasn't sure of, importer warnings).
   Opened from the Notebook chip in More, and with the N key. API: PA.notebook.open(), PA.notebook.fmtTime(secs), PA.notebook.total(piece). */
(function () {
  "use strict";
  var PA = window.PA, ST = PA.store, A = PA.app, S = PA.S;
  var esc = A.esc;
  var N = PA.notebook = {};

  function fmtTime(s) {
    s = Math.max(0, Math.round(s));
    if (s < 60) return s + " s";
    var m = Math.round(s / 60);
    if (m < 60) return m + " min";
    return Math.floor(m / 60) + " h " + (m % 60 ? (m % 60) + " min" : "");
  }
  N.fmtTime = function (s) { return fmtTime(s).trim(); };
  N.total = function (p) { return ((p && p.history) || []).reduce(function (a, h) { return a + (h.secs || 0); }, 0); };
  function dateText(at) {
    var d = new Date(at), now = new Date();
    var day = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: d.getFullYear() === now.getFullYear() ? undefined : "numeric" });
    return day + ", " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  N.open = function () {
    var p = S.piece;
    if (!p) return;
    var hist = (p.history || []).slice().sort(function (a, b) { return b.at - a.at; });
    var written = (p.score && p.score.tempo) || 100;
    var h = '<div class="sh-h"><h2>Notebook</h2><button class="icon-btn" id="nbClose" type="button" aria-label="Close"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg></button></div>';
    h += '<textarea class="field area" id="nbText" rows="5" maxlength="20000" placeholder="Notes" aria-label="Notes"></textarea>';
    h += '<div class="nb-tot"><b id="nbTotal">' + esc(fmtTime(N.total(p)).trim()) + "</b><span>" + hist.length + (hist.length === 1 ? " session" : " sessions") + "</span></div>";
    if (hist.length) {
      h += '<ul class="nb-hist" id="nbHist">';
      hist.slice(0, 60).forEach(function (e) {
        var pct = written ? Math.round((e.bpm || 0) / written * 100) : 0;
        h += '<li><span class="nb-d">' + esc(dateText(e.at)) + '</span><span class="nb-t">' + esc(fmtTime(e.secs)) + '</span><span class="nb-s">' + (e.bpm ? pct + "% · " + e.bpm + " bpm" : "") + "</span>" +
          (e.wait && e.wait.of ? '<span class="nb-w">Wait ' + e.wait.hit + "/" + e.wait.of + "</span>" : "") + (e.take ? '<span class="nb-w">Take</span>' : "") + "</li>";
      });
      h += "</ul>";
    }
    var tn = A.transNotes ? A.transNotes() : [];
    if (tn.length) h += '<details class="nb-tr" open><summary>From the transcription</summary><p id="nbTr">' + esc(tn.join("\n")) + "</p></details>";
    var d = A.dialog(h);
    d.classList.add("nb");
    var ta = d.querySelector("#nbText"), t = 0;
    ta.value = p.notes || "";
    function save() {
      clearTimeout(t);
      if ((p.notes || "") === ta.value) return;
      p.notes = ta.value; p.updated = Date.now(); ST.saveSoon();
      PA.emit("notes", { piece: p });
    }
    ta.oninput = function () { clearTimeout(t); t = setTimeout(save, 450); };
    ta.onblur = save;
    function close() { save(); d.classList.remove("nb"); A.closeDlg(); }
    d.querySelector("#nbClose").onclick = close;
    d.addEventListener("close", function () { save(); d.classList.remove("nb"); }, { once: true });
  };
})();
