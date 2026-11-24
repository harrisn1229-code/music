/* PA.sync: Play Along's sync through the Music account (shared/cloud.js, `MusicCloud`). Needs store.js and app.js; works with no MusicCloud at all.

   What syncs
     - the app document "playalong" (MusicCloud.load / save): { pieces, lists, updated }. A piece in it is the piece without its device-only prefs.
       Merged per piece by `updated` (last writer wins); inside a piece, recordings and clips merge per item by their own `updated`, and
       practice history merges as a union. Deletions are tombstones (`deleted: true`) kept 60 days: pieces, lists, recordings, clips.
       Locally a piece keeps its tombstones for recordings and clips in `piece.gone` ("rec:<id>" / "clip:<id>" -> time), so the rest of the
       app never sees them; they are written into the document as `recordings[]` / `clips[]` entries with `deleted: true`.
     - musical prefs sync (speed, loop, transpose, mix, click, countIn, speedUp, speedTarget, instVol, clickVol); device prefs do not
       (rec, recVol, overlay, overlayVol, vid, wait, view, display, viz).
     - blobs (page photos, recording files, takes) go to the private bucket `school-files` as playalong/<pieceId>/<blobId>.<ext>,
       owners only (members' documents sync, their blobs stay on the device and they are told once). Downloaded on demand: PA.store.pgGet /
       mediaGet fetch a missing blob from the account and cache it in IndexedDB. Takes/videos over 200 MB are not uploaded; over 100 MB
       a one-line note appears first. YouTube recordings are links only.
   How changes are noticed: store.save is wrapped; each save compares every piece, recording, clip and list with what was last seen
   (a small shadow kept in localStorage "playalong:sync"), stamps `updated`, records tombstones, and schedules a sync (3 s debounce).
   Syncs run on open, when the page becomes visible, when the connection returns, and after changes. Nothing blocks the UI.

   API (PA.sync): status() -> "off" | "signedout" | "syncing" | "synced" | "offline" | "error" | "other"; now() -> Promise; merge(localDoc, remoteDoc, now) -> doc;
   docOf(); stamp(); state; note() -> last one-line note. Events: PA.emit("syncstatus", {status, note}). */
(function () {
  "use strict";
  var PA = window.PA, ST = PA.store, S = PA.S, A = PA.app;
  var BUCKET = "school-files", APP = "playalong", SKEY = "playalong:sync", KEEP = 60 * 864e5, DEBOUNCE = 3000;
  var SYNC_PREFS = ["speed", "loop", "transpose", "mix", "click", "countIn", "speedUp", "speedTarget", "instVol", "clickVol"];
  var API = PA.sync = {};

  /* ================================================================ small helpers */
  function clone(o) { return o === undefined ? undefined : JSON.parse(JSON.stringify(o)); }
  function stable(o) {
    if (o === null || typeof o !== "object") return JSON.stringify(o);
    if (Array.isArray(o)) return "[" + o.map(stable).join(",") + "]";
    return "{" + Object.keys(o).sort().filter(function (k) { return o[k] !== undefined; }).map(function (k) { return JSON.stringify(k) + ":" + stable(o[k]); }).join(",") + "}";
  }
  function hash(o) {
    var s = JSON.stringify(o), a = 2166136261, b = 5381, i, c;
    for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); a = Math.imul(a ^ c, 16777619); b = (Math.imul(b, 33) + c) | 0; }
    return (a >>> 0).toString(36) + (b >>> 0).toString(36) + s.length.toString(36);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function noUpd(x) { var o = {}, k; for (k in x) if (k !== "updated") o[k] = x[k]; return o; }
  function cloud() { var C = window.MusicCloud; return C && C.configured ? C : null; }

  var st = { uid: "", sh: {}, lh: {}, up: {}, noted: false, last: 0 };
  try { var saved = JSON.parse(lsGet(SKEY) || "null"); if (saved && typeof saved === "object") for (var k0 in saved) st[k0] = saved[k0]; } catch (e) {}
  ["sh", "lh", "up"].forEach(function (k) { if (!st[k] || typeof st[k] !== "object") st[k] = {}; });
  API.state = st;
  function persist() { lsSet(SKEY, JSON.stringify(st)); }

  /* ================================================================ what a piece is in the document */
  function syncPrefs(pr) {
    var o = {};
    if (pr) SYNC_PREFS.forEach(function (k) { if (pr[k] !== undefined && pr[k] !== null) o[k] = clone(pr[k]); });
    return o;
  }
  /* the part of a piece that one `updated` stamp covers */
  function baseOf(p) {
    var o = {}, k;
    for (k in p) if (k !== "recordings" && k !== "clips" && k !== "history" && k !== "gone" && k !== "updated" && k !== "prefs") o[k] = p[k];
    o.prefs = syncPrefs(p.prefs);
    return o;
  }
  function goneList(p, kind) {
    var out = [], g = p.gone || {};
    Object.keys(g).forEach(function (key) { if (key.indexOf(kind + ":") === 0) out.push({ id: key.slice(kind.length + 1), deleted: true, updated: g[key] }); });
    return out;
  }
  function docPiece(p) {
    if (p.deleted) return { id: p.id, deleted: true, updated: p.updated || 0, title: p.title || "" };
    var o = clone(baseOf(p));
    o.updated = p.updated || 0;
    o.recordings = clone(p.recordings || []).concat(goneList(p, "rec"));
    o.clips = clone(p.clips || []).concat(goneList(p, "clip"));
    o.history = clone(p.history || []);
    return o;
  }
  function docOf() {
    return { pieces: ST.data.pieces.map(docPiece), lists: clone(ST.data.lists || []), updated: Date.now() };
  }
  API.docOf = docOf;

  /* ================================================================ merging (pure) */
  function mergeItems(a, b, now) {
    var by = {}, order = [];
    (a || []).concat(b || []).forEach(function (x) {
      if (!x || x.id == null) return;
      if (!by[x.id]) { by[x.id] = x; order.push(x.id); }
      else if ((x.updated || 0) > (by[x.id].updated || 0)) by[x.id] = x;
    });
    return order.map(function (id) { return by[id]; }).filter(function (x) { return !(x.deleted && now - (x.updated || 0) > KEEP); });
  }
  function mergeHistory(a, b) {
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function (h) {
      if (!h) return;
      var key = h.at + "/" + h.secs;
      if (seen[key]) return;
      seen[key] = 1; out.push(h);
    });
    out.sort(function (x, y) { return x.at - y.at; });
    if (out.length > 300) out.splice(0, out.length - 300);
    return out;
  }
  function mergePiece(a, b, now) {
    if (!a) return b;
    if (!b) return a;
    var win = (b.updated || 0) > (a.updated || 0) ? b : a;
    if (win.deleted) return { id: win.id, deleted: true, updated: win.updated || 0, title: win.title || "" };
    var out = clone(win);
    out.recordings = mergeItems(a.recordings, b.recordings, now);
    out.clips = mergeItems(a.clips, b.clips, now);
    out.history = mergeHistory(a.history, b.history);
    return out;
  }
  function merge(local, remote, now) {
    now = now || Date.now(); local = local || {}; remote = remote || {};
    var pa = {}, pb = {}, ids = [];
    (local.pieces || []).forEach(function (p) { if (p && p.id) { pa[p.id] = p; ids.push(p.id); } });
    (remote.pieces || []).forEach(function (p) { if (p && p.id) { pb[p.id] = p; if (!pa[p.id]) ids.push(p.id); } });
    var pieces = ids.map(function (id) { return mergePiece(pa[id], pb[id], now); }).filter(function (p) { return !(p.deleted && now - (p.updated || 0) > KEEP); });
    var la = {}, lb = {}, lids = [];
    (local.lists || []).forEach(function (l) { if (l && l.id) { la[l.id] = l; lids.push(l.id); } });
    (remote.lists || []).forEach(function (l) { if (l && l.id) { lb[l.id] = l; if (!la[l.id]) lids.push(l.id); } });
    var lists = lids.map(function (id) { var x = la[id], y = lb[id]; return !x ? y : !y ? x : ((y.updated || 0) > (x.updated || 0) ? y : x); })
      .filter(function (l) { return !(l.deleted && now - (l.updated || 0) > KEEP); });
    return { pieces: pieces, lists: clone(lists), updated: now };
  }
  API.merge = merge;
  function core(doc) {
    var d = doc || {};
    function byId(a) { return (a || []).slice().sort(function (x, y) { return x.id < y.id ? -1 : x.id > y.id ? 1 : 0; }); }
    return stable({ pieces: byId(d.pieces).map(function (p) { var q = clone(p); if (q.recordings) q.recordings = byId(q.recordings); if (q.clips) q.clips = byId(q.clips); return q; }), lists: byId(d.lists) });
  }

  /* ================================================================ noticing local changes */
  function shadowOf(p, now) {
    var s = { b: hash(baseOf(p)), u: p.updated || 0, r: {}, c: {} };
    (p.recordings || []).forEach(function (r) { if (!r.updated) r.updated = r.created || p.updated || now; s.r[r.id] = hash(noUpd(r)); });
    (p.clips || []).forEach(function (c) { if (!c.updated) c.updated = p.updated || now; s.c[c.id] = hash(noUpd(c)); });
    return s;
  }
  function stampItems(p, sh, list, key, kind, now) {
    var seen = {}, ch = false;
    p.gone = p.gone || {};
    (p[list] || []).forEach(function (x) {
      seen[x.id] = 1;
      var h = hash(noUpd(x));
      if (sh[key][x.id] === undefined) { if (!x.updated) x.updated = now; sh[key][x.id] = h; ch = true; }
      else if (sh[key][x.id] !== h) { x.updated = now; sh[key][x.id] = h; ch = true; }
      if (p.gone[kind + ":" + x.id]) delete p.gone[kind + ":" + x.id];
    });
    Object.keys(sh[key]).forEach(function (id) {
      if (!seen[id]) { p.gone[kind + ":" + id] = now; delete sh[key][id]; ch = true; }
    });
    Object.keys(p.gone).forEach(function (g) { if (now - p.gone[g] > KEEP) delete p.gone[g]; });
    if (!Object.keys(p.gone).length) delete p.gone;
    return ch;
  }
  function stamp() {
    var now = Date.now(), ch = false, data = ST.data;
    data.pieces = data.pieces.filter(function (p) { return !(p.deleted && now - (p.updated || 0) > KEEP); });
    data.pieces.forEach(function (p) {
      var sh = st.sh[p.id];
      if (p.deleted) { if (!sh || !sh.del) { st.sh[p.id] = { del: 1, u: p.updated || 0 }; ch = true; } return; }
      if (!sh || sh.del) { st.sh[p.id] = shadowOf(p, now); ch = true; return; }
      var b = hash(baseOf(p));
      if (b !== sh.b) { p.updated = now; sh.b = b; sh.u = now; ch = true; }
      else if (p.updated !== sh.u) p.updated = sh.u;
      if (stampItems(p, sh, "recordings", "r", "rec", now)) ch = true;
      if (stampItems(p, sh, "clips", "c", "clip", now)) ch = true;
    });
    Object.keys(st.sh).forEach(function (id) { if (!data.pieces.some(function (p) { return p.id === id; })) { delete st.sh[id]; ch = true; } });
    (data.lists || []).forEach(function (l) {
      var h = hash(noUpd(l));
      if (st.lh[l.id] === undefined) { st.lh[l.id] = h; if (!l.updated) l.updated = now; ch = true; }
      else if (st.lh[l.id] !== h) { l.updated = now; st.lh[l.id] = h; ch = true; }
    });
    data.lists = (data.lists || []).filter(function (l) { return !(l.deleted && now - (l.updated || 0) > KEEP); });
    return ch;
  }
  API.stamp = stamp;

  var origSave = ST.save;
  ST.save = function () {
    try { stamp(); persist(); } catch (e) { if (window.console) console.error(e); }
    var ok = origSave.call(ST);
    schedule(DEBOUNCE);
    return ok;
  };
  var rawPgGet = ST.pgGet, rawMediaGet = ST.mediaGet;

  /* ================================================================ status */
  var status = "off", note = "", dot = null, running = false, again = false, timer = 0, owner = null;
  function setStatus(s, n) {
    status = s; note = n || "";
    if (!dot) dot = document.getElementById("syncDot");
    if (dot) {
      dot.hidden = s === "off";
      dot.setAttribute("data-s", s);
      var label = LABEL[s] + (note ? ": " + note : "");
      dot.setAttribute("aria-label", "Sync: " + label); dot.title = label;
    }
    PA.emit("syncstatus", { status: s, note: note });
  }
  var LABEL = { off: "not available", signedout: "signed out", syncing: "syncing", synced: "synced", offline: "offline", error: "problem", other: "another account" };
  API.status = function () { return status; };
  API.note = function () { return note; };
  function ago(t) {
    if (!t) return "";
    var s = Math.round((Date.now() - t) / 1000);
    return s < 60 ? "just now" : s < 3600 ? Math.round(s / 60) + " min ago" : s < 86400 ? Math.round(s / 3600) + " h ago" : Math.round(s / 86400) + " d ago";
  }
  function openStatus() {
    var C = cloud();
    if (!C) return;
    if (status === "signedout") { location.href = "../#account"; return; }
    var line = status === "synced" ? "Synced" + (st.last ? " · " + ago(st.last) : "") : status === "syncing" ? "Syncing…" : status === "offline" ? "Offline. It will catch up." :
      status === "other" ? "This device belongs to another account." : "Couldn't sync" + (note ? ": " + note : ".");
    if (status === "synced" && note) line += "\n" + note;
    var d = A.dialog('<div class="sh-h"><h2>Sync</h2></div><p class="syncline" id="syLine"></p><div class="btns"><button class="btn" id="syAcc" type="button">Account</button><button class="btn pri" id="syNow" type="button">Sync now</button></div>');
    d.querySelector("#syLine").textContent = line;
    d.querySelector("#syAcc").onclick = function () { location.href = "../#account"; };
    d.querySelector("#syNow").onclick = function () { A.closeDlg(); API.now(); };
  }
  API.openStatus = openStatus;

  /* ================================================================ blobs */
  function extOf(mime, name) {
    var m = String(mime || "").toLowerCase();
    var map = { "audio/mpeg": "mp3", "audio/mp3": "mp3", "audio/mp4": "m4a", "audio/x-m4a": "m4a", "audio/aac": "aac", "audio/wav": "wav", "audio/x-wav": "wav", "audio/wave": "wav", "audio/webm": "webm",
      "audio/ogg": "ogg", "video/mp4": "mp4", "video/quicktime": "mov", "video/webm": "webm", "audio/flac": "flac" };
    return map[m.split(";")[0]] || (m.indexOf("webm") >= 0 ? "webm" : m.indexOf("mp4") >= 0 ? "mp4" : "bin");
  }
  function pathOf(pid, id, ext) { return "playalong/" + pid + "/" + id + "." + ext; }
  function blobInfo(id) {
    var ps = ST.data.pieces, i, j, p, r;
    for (i = 0; i < ps.length; i++) {
      p = ps[i];
      if (p.deleted) continue;
      if ((p.pages || []).indexOf(id) >= 0) return { id: id, kind: "page", pid: p.id, path: pathOf(p.id, id, "jpg"), mime: "image/jpeg" };
      for (j = 0; j < (p.recordings || []).length; j++) {
        r = p.recordings[j];
        if (r.mediaId === id) return { id: id, kind: "media", pid: p.id, path: pathOf(p.id, id, extOf(r.mime)), mime: r.mime || "", rec: r };
      }
    }
    return null;
  }
  var dl = {}, dlFail = {}, dlBusy = 0;
  function canDownload() { var C = cloud(); return !!(C && C.user() && navigator.onLine !== false && (!st.uid || st.uid === C.user().id)); }
  function download(info) {
    if (dl[info.id]) return dl[info.id];
    if (dlFail[info.id] && Date.now() - dlFail[info.id] < 30000) return Promise.resolve(null);
    dlBusy++;
    if (A && A.showHint) A.showHint("Downloading…");
    var C = cloud();
    var pr = C.download(BUCKET, info.path).then(function (blob) {
      if (!blob || !blob.size) throw new Error("empty");
      if (info.kind === "page") {
        return PA.img.decodeBlob(blob).then(function (im) {
          var sz = PA.img.srcSize(im);
          return PA.img.makeThumb(blob).then(function (th) { return { w: sz.w, h: sz.h, thumb: th }; }, function () { return { w: sz.w, h: sz.h }; });
        }, function () { return {}; }).then(function (x) {
          return ST.pgPut({ id: info.id, blob: blob, w: x.w, h: x.h, thumb: x.thumb });
        });
      }
      return ST.mediaPut({ id: info.id, blob: blob, mime: (info.rec && info.rec.mime) || blob.type || "" });
    }).then(function () { st.up[info.id] = 1; persist(); return true; }, function () { dlFail[info.id] = Date.now(); return null; })
      .then(function (v) { delete dl[info.id]; dlBusy--; if (!dlBusy && A && A.showHint) A.showHint(); return v; });
    dl[info.id] = pr;
    return pr;
  }
  ST.pgGet = function (id) {
    return rawPgGet(id).then(function (r) {
      if (r || !canDownload()) return r;
      var info = blobInfo(id);
      if (!info) return r;
      return download(info).then(function (ok) { return ok ? rawPgGet(id) : r; });
    });
  };
  ST.mediaGet = function (id) {
    return rawMediaGet(id).then(function (r) {
      if (r || !canDownload()) return r;
      var info = blobInfo(id);
      if (!info) return r;
      return download(info).then(function (ok) { return ok ? rawMediaGet(id) : r; });
    });
  };
  /* the first page of every piece that has none here yet, so the list has its thumbnails */
  function prefetchThumbs() {
    if (!canDownload()) return;
    var chain = Promise.resolve();
    ST.data.pieces.forEach(function (p) {
      if (p.deleted || !p.pages || !p.pages[0]) return;
      var id = p.pages[0];
      chain = chain.then(function () {
        return rawPgGet(id).then(function (r) {
          if (r) return;
          return ST.pgGet(id).then(function (rr) { if (rr && S.route === "list") A.renderList(); });
        });
      });
    });
  }

  function blobList() {
    var out = [];
    ST.data.pieces.forEach(function (p) {
      if (p.deleted) return;
      (p.pages || []).forEach(function (id) { out.push({ id: id, kind: "page", pid: p.id, path: pathOf(p.id, id, "jpg"), mime: "image/jpeg", name: "page" }); });
      (p.recordings || []).forEach(function (r) {
        if (r.mediaId && (r.kind === "file" || r.kind === "take" || !r.kind)) out.push({ id: r.mediaId, kind: "media", pid: p.id, path: pathOf(p.id, r.mediaId, extOf(r.mime)), mime: r.mime || "", name: r.name || "recording", rec: r });
      });
    });
    return out;
  }
  function mb(n) { return Math.round(n / 1048576) + " MB"; }
  /* what to do with a blob of this size: "ok", "note" (over 100 MB: say so first) or "skip" (takes and videos over 200 MB are not uploaded) */
  API.gate = function (size, kind) { return kind === "media" && size > 200 * 1048576 ? "skip" : size > 100 * 1048576 ? "note" : "ok"; };
  function upNote(msg) { note = msg; setStatus(status, msg); if (A && A.toast) A.toast(msg); }
  function pump() {
    var C = cloud(), items = blobList().filter(function (x) { return !st.up[x.id]; });
    if (!items.length) return Promise.resolve();
    return C.member().then(function (m) { owner = !!(m && m.owner); }, function () { owner = null; }).then(function () {
      if (owner === null) return;
      if (!owner) {
        if (!st.noted) { st.noted = true; persist(); upNote("Photos and recordings stay on this device (only the owner can upload)"); }
        return;
      }
      var failed = false, chain = Promise.resolve();
      items.forEach(function (x) {
        chain = chain.then(function () {
          if (!C.user() || navigator.onLine === false) { failed = true; return; }
          return (x.kind === "page" ? rawPgGet : rawMediaGet)(x.id).then(function (rec) {
            if (!rec || !rec.blob) return;
            var size = rec.blob.size || 0;
            var g = API.gate(size, x.kind);
            if (g === "skip") { st.up[x.id] = "big"; persist(); upNote("“" + x.name + "” is too big to sync (" + mb(size) + ")"); return; }
            if (g === "note") upNote("Uploading " + mb(size) + "…");
            return C.upload(BUCKET, x.path, rec.blob, rec.blob.type || x.mime).then(function () { st.up[x.id] = 1; persist(); }, function (e) {
              if (e && e.tooBig) { st.up[x.id] = "big"; persist(); upNote("“" + x.name + "” is too big to sync"); }
              else failed = true;
            });
          });
        });
      });
      return chain.then(function () { if (failed) schedule(60000); });
    });
  }

  /* ================================================================ applying a merged document */
  function freeBlobs(p) {
    (p.pages || []).forEach(function (id) { ST.pgDel(id).catch(function () {}); });
    (p.recordings || []).forEach(function (r) { if (r.mediaId) ST.mediaDel(r.mediaId).catch(function () {}); });
  }
  function applyInto(lp, dp) {
    var k;
    for (k in lp) if (k !== "prefs" && k !== "id") delete lp[k];
    for (k in dp) if (k !== "recordings" && k !== "clips" && k !== "history" && k !== "prefs") lp[k] = clone(dp[k]);
    var gone = {};
    lp.recordings = []; lp.clips = [];
    (dp.recordings || []).forEach(function (r) { if (r.deleted) gone["rec:" + r.id] = r.updated; else lp.recordings.push(clone(r)); });
    (dp.clips || []).forEach(function (c) { if (c.deleted) gone["clip:" + c.id] = c.updated; else lp.clips.push(clone(c)); });
    if (Object.keys(gone).length) lp.gone = gone;
    lp.history = clone(dp.history || []);
    lp.prefs = lp.prefs || {};
    SYNC_PREFS.forEach(function (key) { if (dp.prefs && dp.prefs[key] !== undefined) lp.prefs[key] = clone(dp.prefs[key]); });
    if (lp.prefs.rec && !lp.recordings.some(function (r) { return r.id === lp.prefs.rec; })) lp.prefs.rec = null;
    return lp;
  }
  function tombstone(lp, dp) {
    freeBlobs(lp);
    var k;
    for (k in lp) delete lp[k];
    lp.id = dp.id; lp.deleted = true; lp.updated = dp.updated || 0; lp.title = dp.title || "";
  }
  function busyNow() { return !!(S.playing || (PA.fix && PA.fix.busy && PA.fix.busy())); }
  var pendingOpen = null;
  function applyMerged(merged, local) {
    var localBy = {}, changed = [], openId = S.route === "player" && S.piece ? S.piece.id : null, deferred = false;
    ST.data.pieces.forEach(function (p) { localBy[p.id] = p; });
    var localDocBy = {};
    local.pieces.forEach(function (p) { localDocBy[p.id] = p; });
    merged.pieces.forEach(function (mp) {
      var lp = localBy[mp.id], ld = localDocBy[mp.id];
      if (ld && stable(ld) === stable(mp)) return;
      if (lp && lp.id === openId && !mp.deleted && busyNow()) { deferred = true; return; }
      if (lp && !ld) return;
      if (!lp) {
        lp = { id: mp.id }; ST.data.pieces.push(lp);
      }
      if (mp.deleted) {
        if (lp.id === openId) { pendingOpen = "leave"; }
        tombstone(lp, mp);
        st.sh[lp.id] = { del: 1, u: lp.updated };
      } else {
        applyInto(lp, mp);
        st.sh[lp.id] = shadowOf(lp, Date.now());
      }
      changed.push(lp.id);
    });
    // lists: the merged ones replace the local ones
    var listsChanged = stable(merged.lists.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; })) !== stable((ST.data.lists || []).slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; }));
    if (listsChanged) {
      ST.data.lists = clone(merged.lists);
      st.lh = {}; ST.data.lists.forEach(function (l) { st.lh[l.id] = hash(noUpd(l)); });
    }
    if (changed.length || listsChanged) {
      origSave.call(ST); persist();
      if (S.route === "list") A.renderList();
      if (A.listsChanged) A.listsChanged();
    }
    if (deferred) setTimeout(function () { schedule(1500); }, 0);
    if (openId && changed.indexOf(openId) >= 0) {
      var cur = ST.pieceById(openId);
      if (cur && cur.deleted) { location.hash = ""; }
      else if (cur) {
        var pos = S.startPos, y = window.scrollY, v = S.view;
        A.openPiece(openId);
        try { if (pos > 0) A.seekTo(Math.min(pos, S.tl.total - 1e-6)); if (v) A.setView(v); window.scrollTo(0, y); } catch (e) {}
      }
    }
    return changed;
  }

  /* ================================================================ the run */
  function offlineish(e) { return /reach|fetch|network|offline|Load failed/i.test(String((e && e.message) || e)); }
  function schedule(ms) {
    clearTimeout(timer);
    if (!cloud()) return;
    timer = setTimeout(function () { timer = 0; API.now(); }, ms == null ? DEBOUNCE : ms);
  }
  /* resolves when no sync is running or waiting to run (for tests and for "wait until it has caught up") */
  API.settle = function (ms) {
    var t0 = Date.now();
    return new Promise(function (res) {
      (function poll() { if ((!running && !again && !timer) || Date.now() - t0 > (ms || 20000)) res(status); else setTimeout(poll, 40); })();
    });
  };
  API.now = function () {
    var C = cloud();
    if (!C) { setStatus("off"); return Promise.resolve(); }
    if (running) { again = true; return Promise.resolve(); }
    if (PA.fix && PA.fix.preview) { schedule(2500); return Promise.resolve(); }
    clearTimeout(timer); timer = 0;
    return C.ready.then(function () {
      var u = C.user();
      if (!u) { setStatus("signedout"); return; }
      if (st.uid && st.uid !== u.id) { setStatus("other"); return; }
      if (navigator.onLine === false) { setStatus("offline"); return; }
      running = true; setStatus("syncing");
      try { stamp(); persist(); } catch (e) {}
      return C.load(APP).then(function (remote) {
        var local = docOf(), merged = merge(local, remote || {}, Date.now());
        applyMerged(merged, local);
        if (!remote || core(merged) !== core(remote)) return C.save(APP, merged);
      }).then(function () {
        st.uid = u.id; st.last = Date.now(); persist();
        return pump();
      }).then(function () {
        setStatus("synced", note && /too big|Uploading|stay on this device/.test(note) ? note : "");
        prefetchThumbs();
      }).catch(function (e) {
        if (offlineish(e) || navigator.onLine === false) setStatus("offline");
        else setStatus("error", (e && e.message) || "");
      }).then(function () { running = false; if (again) { again = false; schedule(300); } });
    });
  };

  function boot() {
    dot = document.getElementById("syncDot");
    if (dot) dot.onclick = openStatus;
    var C = window.MusicCloud;
    if (!C || !C.configured) { setStatus("off"); return; }
    setStatus("signedout");
    C.ready.then(function () {
      if (C.user()) { setStatus("syncing"); API.now(); } else setStatus("signedout");
    });
    if (C.onChange) C.onChange(function () { API.now(); });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") API.now(); });
    window.addEventListener("online", function () { API.now(); });
    window.addEventListener("offline", function () { if (status !== "off" && status !== "signedout") setStatus("offline"); });
    PA.on("pause", function () { if (pendingOpen || status === "synced") schedule(800); });
    PA.on("leave", function () { schedule(800); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(boot, 0); }); else setTimeout(boot, 0);
})();
