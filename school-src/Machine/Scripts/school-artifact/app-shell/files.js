/* Music School — the reader's own files.

   The app ships with no book scans that are still in copyright, no chord-chart PDFs, no album
   art and no vendor screenshots. Where the school expects one of those it shows a slot with the
   file's name, and the reader adds their own copy. This file is where those copies live:

     * in IndexedDB, in THIS browser on THIS device. This file never sends anything anywhere,
       and nothing here is part of a backup. (app.js may fill a slot from the reader's account,
       or send an owner's additions up to it; either way the copy the page shows is this one.)
     * keyed by FILE NAME (case and accent-form folded). That is the only join there is: a slot
       names a file, and a file with that name fills it. A file added for one particular song or
       book through its own button is stored under the name that slot expects, or carries a
       `link` ("chart:<song id>", "cover:<song id>") when the slot has no name of its own.

   Loaded before app.js. Everything is on `window.MSFiles`; app.js draws the buttons. */
(function () {
  'use strict';
  var DB = 'music-school', STORE = 'files', VER = 1;
  var THUMB_PX = 480;          // longest edge of the small copy an image is listed and tiled with
  var PAGE_CACHE = 36;         // rendered PDF pages kept in memory at once

  function norm(n) {
    var s = String(n == null ? '' : n);
    try { s = s.normalize('NFC'); } catch (e) {}
    return s.trim().toLowerCase();
  }

  /* ---------------------------------------------------------------- the database */
  var dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var rq;
      try { rq = indexedDB.open(DB, VER); } catch (e) { rej(e); return; }
      rq.onupgradeneeded = function () {
        var d = rq.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, {keyPath: 'key'});
      };
      rq.onsuccess = function () { res(rq.result); };
      rq.onerror = function () { rej(rq.error || new Error('IndexedDB unavailable')); };
      rq.onblocked = function () { rej(new Error('IndexedDB blocked')); };
    });
    dbp.catch(function () { dbp = null; });
    return dbp;
  }
  function withStore(mode, fn) {
    return open().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction(STORE, mode), rq = fn(t.objectStore(STORE));
        t.oncomplete = function () { res(rq ? rq.result : undefined); };
        t.onerror = t.onabort = function () { rej(t.error || new Error('storage error')); };
      });
    });
  }

  /* ---------------------------------------------------------------- the index
     Names, sizes and links for everything stored — held in memory so the page can ask "is this
     file here?" synchronously on every render. The bytes stay in the database until wanted. */
  var index = new Map();       // key -> {key, name, type, size, at, links, thumb:bool}
  var byLink = new Map();      // link -> [key]
  var listeners = [];
  var available = true;
  function meta(r) {
    // `name` is the slot it fills; `file` is what was actually picked (they differ when a photo
    // is added to a slot named "….pdf"), and `file` is what decides how it is shown.
    return {key: r.key, name: r.name, file: r.picked || r.name, type: r.type || '', size: r.size || 0,
            at: r.at || '', links: (r.links || []).slice(), thumb: !!r.thumb};
  }
  function reindex() {
    byLink = new Map();
    index.forEach(function (m) {
      m.links.forEach(function (l) {
        if (!byLink.has(l)) byLink.set(l, []);
        byLink.get(l).push(m.key);
      });
    });
  }
  function changed() { reindex(); listeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  var ready = withStore('readonly', function (s) { return s.getAll(); }).then(function (rows) {
    (rows || []).forEach(function (r) { index.set(r.key, meta(r)); });
    reindex();
  }).catch(function () { available = false; });

  /* ---------------------------------------------------------------- object URLs */
  var urls = new Map(), thumbs = new Map();
  function record(key) { return withStore('readonly', function (s) { return s.get(key); }); }
  function url(key) {
    key = norm(key);
    if (urls.has(key)) return urls.get(key);
    var p = record(key).then(function (r) { return r && r.blob ? URL.createObjectURL(r.blob) : ''; });
    urls.set(key, p);
    return p;
  }
  function thumbUrl(key) {
    key = norm(key);
    if (thumbs.has(key)) return thumbs.get(key);
    var p = record(key).then(function (r) {
      if (!r) return '';
      return URL.createObjectURL(r.thumb || r.blob);
    });
    thumbs.set(key, p);
    return p;
  }
  function forget(key) {
    [urls, thumbs].forEach(function (m) {
      var p = m.get(key);
      if (p) p.then(function (u) { if (u) URL.revokeObjectURL(u); });
      m.delete(key);
    });
    docs.delete('k:' + key);
    Array.from(pages.keys()).forEach(function (k) {
      if (k.indexOf('k:' + key + '|') === 0) { URL.revokeObjectURL(pages.get(k)); pages.delete(k); }
    });
  }

  /* ---------------------------------------------------------------- adding and removing */
  function isImage(f) { return /^image\//i.test(f.type) || /\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name); }
  function makeThumb(f) {
    return new Promise(function (res) {
      if (!isImage(f)) { res(null); return; }
      var u = URL.createObjectURL(f), img = new Image();
      img.onload = function () {
        try {
          var s = Math.min(1, THUMB_PX / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(img.width * s));
          c.height = Math.max(1, Math.round(img.height * s));
          var x = c.getContext('2d');
          x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);   // transparent PNG -> not black
          x.drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) { URL.revokeObjectURL(u); res(b || null); }, 'image/jpeg', 0.82);
        } catch (e) { URL.revokeObjectURL(u); res(null); }
      };
      img.onerror = function () { URL.revokeObjectURL(u); res(null); };
      img.src = u;
    });
  }
  /** Store one file. `opt.as` files it under a slot's own name; `opt.link` ties it to one place. */
  function add(file, opt) {
    opt = opt || {};
    var key = norm(opt.as || file.name);
    if (!key) return Promise.reject(new Error('no name'));
    return makeThumb(file).then(function (thumb) {
      var old = index.get(key);
      var links = old ? old.links.slice() : [];
      if (opt.link && links.indexOf(opt.link) < 0) links.push(opt.link);
      var rec = {key: key, name: opt.as || file.name, picked: file.name, type: file.type || '',
                 size: file.size, at: new Date().toISOString(), links: links,
                 blob: file.slice(0, file.size, file.type), thumb: thumb};
      return withStore('readwrite', function (s) { return s.put(rec); }).then(function () {
        forget(key);
        index.set(key, meta(rec));
        changed();
        if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
        return index.get(key);
      });
    });
  }
  function remove(key) {
    key = norm(key);
    return withStore('readwrite', function (s) { return s.delete(key); }).then(function () {
      forget(key); index.delete(key); changed();
    });
  }
  /** Drop one link; the file itself goes too when that link was the only reason it was here. */
  function unlink(key, link) {
    key = norm(key);
    return record(key).then(function (r) {
      if (!r) return;
      r.links = (r.links || []).filter(function (l) { return l !== link; });
      return withStore('readwrite', function (s) { return s.put(r); }).then(function () {
        index.set(key, meta(r)); changed();
      });
    });
  }

  /* ---------------------------------------------------------------- PDFs
     pdf.js is ~1.4 MB and most visits never open a PDF, so it is loaded the first time one is
     wanted. Pages are rendered one at a time (a phone cannot hold four 1500px canvases at once)
     and the results are kept as image URLs, newest 36. */
  var libp = null;
  function lib() {
    if (libp) return libp;
    libp = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = 'vendor/pdfjs/pdf.min.js';
      s.onload = function () {
        var L = window.pdfjsLib;
        if (!L) { rej(new Error('pdf.js did not load')); return; }
        L.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';
        res(L);
      };
      s.onerror = function () { rej(new Error('pdf.js could not be loaded')); };
      document.head.appendChild(s);
    });
    libp.catch(function () { libp = null; });
    return libp;
  }
  var docs = new Map();        // id -> Promise<PDFDocumentProxy>.  id is "k:<key>" or "u:<url>"
  function srcUrl(id) { return id.slice(0, 2) === 'k:' ? url(id.slice(2)) : Promise.resolve(id.slice(2)); }
  function pdf(id) {
    if (docs.has(id)) return docs.get(id);
    var p = Promise.all([lib(), srcUrl(id)]).then(function (a) {
      if (!a[1]) throw new Error('file not found');
      return a[0].getDocument({url: a[1], disableAutoFetch: true, disableStream: true}).promise;
    });
    docs.set(id, p);
    p.catch(function () { docs.delete(id); });
    return p;
  }
  function pageCount(id) { return pdf(id).then(function (d) { return d.numPages; }); }
  var pages = new Map(), chain = Promise.resolve();
  function pageURL(id, n, px) {
    var k = id + '|' + n + '|' + px;
    if (pages.has(k)) return Promise.resolve(pages.get(k));
    var job = chain.then(function () {
      if (pages.has(k)) return pages.get(k);
      return pdf(id).then(function (d) {
        if (n < 1 || n > d.numPages) throw new Error('no such page');
        return d.getPage(n);
      }).then(function (pg) {
        var base = pg.getViewport({scale: 1});
        var vp = pg.getViewport({scale: px / base.width});
        var c = document.createElement('canvas');
        c.width = Math.round(vp.width); c.height = Math.round(vp.height);
        var x = c.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
        return pg.render({canvasContext: x, viewport: vp}).promise.then(function () {
          return new Promise(function (res) { c.toBlob(res, 'image/jpeg', 0.86); });
        }).then(function (b) {
          c.width = c.height = 0;                       // hand the canvas memory back now (Safari)
          if (!b) throw new Error('page could not be drawn');
          var u = URL.createObjectURL(b);
          pages.set(k, u);
          if (pages.size > PAGE_CACHE) {
            var first = pages.keys().next().value;
            URL.revokeObjectURL(pages.get(first)); pages.delete(first);
          }
          return u;
        });
      });
    });
    chain = job.catch(function () {});
    return job;
  }

  function text(key) {
    return record(norm(key)).then(function (r) {
      if (!r || !r.blob) return '';
      if (r.blob.text) return r.blob.text();
      return new Promise(function (res) {
        var fr = new FileReader();
        fr.onload = function () { res(String(fr.result || '')); };
        fr.onerror = function () { res(''); };
        fr.readAsText(r.blob);
      });
    });
  }
  function usage() {
    if (!(navigator.storage && navigator.storage.estimate)) return Promise.resolve(null);
    return navigator.storage.estimate().catch(function () { return null; });
  }

  window.MSFiles = {
    ready: ready,
    norm: norm,
    ok: function () { return available; },
    has: function (name) { return index.has(norm(name)); },
    get: function (name) { return index.get(norm(name)) || null; },
    all: function () { return Array.from(index.values()); },
    linked: function (link) {
      return (byLink.get(link) || []).map(function (k) { return index.get(k); }).filter(Boolean);
    },
    bytes: function () { var n = 0; index.forEach(function (m) { n += m.size; }); return n; },
    add: add, remove: remove, unlink: unlink,
    url: url, thumbUrl: thumbUrl, text: text,
    pdf: pdf, pageCount: pageCount, pageURL: pageURL,
    usage: usage,
    onchange: function (f) { listeners.push(f); }
  };
})();
