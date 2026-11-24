/* PA.store: where Play Along keeps things on the device (window.PA.store).
   Scores, player settings, clips, history: localStorage "playalong:v1" = { pieces:[...], lists:[...] } (key name kept for compatibility).
   Page photos: IndexedDB "music-playalong", store "pages" ({id, blob, w, h, thumb}).
   Recordings' audio/video: the same database, store "media" ({id, blob, mime}) added in database version 2; "pages" is untouched.

   PA.store.data                 the live object { pieces, lists }       load() / save() / saveSoon()
   pieceById(id)                 find a piece
   pgPut / pgGet / pgDel         page photos           mediaPut / mediaGet / mediaDel   recording blobs (for phase 3)
   Pieces written by older versions open unchanged: every v2 field is optional. */
(function () {
  "use strict";
  var PA = window.PA = window.PA || {};
  var LS_KEY = "playalong:v1", DB_NAME = "music-playalong", PAGES = "pages", MEDIA = "media";
  var NS = PA.store = { data: { pieces: [], lists: [] }, LS_KEY: LS_KEY };

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  NS.load = function () {
    try {
      var d = JSON.parse(lsGet(LS_KEY) || "null");
      if (d && Array.isArray(d.pieces)) { NS.data = d; if (!Array.isArray(d.lists)) d.lists = []; }
    } catch (e) {}
    return NS.data;
  };
  NS.save = function () { return lsSet(LS_KEY, JSON.stringify(NS.data)); };
  var saveTimer = 0;
  NS.saveSoon = function () { clearTimeout(saveTimer); saveTimer = setTimeout(NS.save, 400); };
  NS.pieceById = function (id) { var a = NS.data.pieces; for (var i = 0; i < a.length; i++) if (a[i].id === id) return a[i]; return null; };

  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, 2);
      r.onupgradeneeded = function () {
        var d = r.result;
        if (!d.objectStoreNames.contains(PAGES)) d.createObjectStore(PAGES, { keyPath: "id" });
        if (!d.objectStoreNames.contains(MEDIA)) d.createObjectStore(MEDIA, { keyPath: "id" });
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    dbp.catch(function () { dbp = null; });
    return dbp;
  }
  function tx(store, mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction(store, mode), out = fn(t.objectStore(store));
        t.oncomplete = function () { res(out && out.result); };
        t.onerror = t.onabort = function () { rej(t.error); };
      });
    });
  }
  NS.pgPut = function (rec) { return tx(PAGES, "readwrite", function (s) { return s.put(rec); }); };
  NS.pgGet = function (id) { return tx(PAGES, "readonly", function (s) { return s.get(id); }); };
  NS.pgDel = function (id) { return tx(PAGES, "readwrite", function (s) { return s.delete(id); }); };
  NS.mediaPut = function (rec) { return tx(MEDIA, "readwrite", function (s) { return s.put(rec); }); };
  NS.mediaGet = function (id) { return tx(MEDIA, "readonly", function (s) { return s.get(id); }); };
  NS.mediaDel = function (id) { return tx(MEDIA, "readwrite", function (s) { return s.delete(id); }); };
})();
