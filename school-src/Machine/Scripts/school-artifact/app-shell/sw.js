/* Music School service worker — keeps the whole app on the device so it opens with no connection.

   FILES is written by build.py: every file of the app and a short hash of its contents. Each
   file is cached under "<path>?v=<hash>", so:
     * an update downloads only the files whose contents changed (the 114 book pages
       and the PDF reader are fetched once, ever);
     * a new version is only switched to once ALL of its files are saved — a half-downloaded
       update can never be served.
   The app opens from this cache every time. A new build is picked up in the background and is
   what opens the NEXT time. Only the caches named below are ever touched, so the rest of Music
   keeps its own (Music's worker, ../sw.js, only clears caches named music-app-*).

   The reader's own added files (books, charts, sleeves) are NOT here — they live in IndexedDB,
   which this worker never reads or clears. */
const FILES = /*{{FILES}}*/{};
const BUILD = "{{STAMP}}";
const CACHE = "school-app";
const ROOT = new URL("./", self.location.href);

const hrefFor = (path) => new URL(path.split("/").map(encodeURIComponent).join("/"), ROOT).href;
const keyFor = (path) => hrefFor(path) + "?v=" + FILES[path];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const have = new Set((await cache.keys()).map((r) => r.url));
    const todo = Object.keys(FILES).filter((p) => !have.has(keyFor(p)));
    for (let i = 0; i < todo.length; i += 8) {
      await Promise.all(todo.slice(i, i + 8).map(async (p) => {
        // "reload": GitHub Pages lets the browser keep a file for 10 minutes; an update must not
        // be built out of stale copies.
        const res = await fetch(new Request(hrefFor(p), { cache: "reload" }));
        if (!res.ok) throw new Error(p + " — " + res.status);
        await cache.put(keyFor(p), res);
      }));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const keep = new Set(Object.keys(FILES).map(keyFor));
    for (const r of await cache.keys()) if (!keep.has(r.url)) await cache.delete(r);
    await self.clients.claim();
  })());
});

// Music's own files that School's page uses (../shared/*.js, the manifest, the icon). They belong
// to Music's worker, but a page is only ever served by ONE worker and this page is School's, so
// they are answered here: from whichever cache has them (Music saved them when its home screen
// was opened), else from the network, keeping a copy so they are there offline next time.
const PARENT = new URL("../", ROOT);
const SHARED = "school-shared";
function fromMusic(request) {
  return caches.match(request, { ignoreVary: true, ignoreSearch: true }).then((hit) => {
    const fresh = fetch(request).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(SHARED).then((c) => c.put(request, copy)); }
      return res;
    });
    if (hit) { fresh.catch(() => {}); return hit; }
    return fresh;
  });
}

// Album covers the page looks up (Cover Art Archive, which hands on to archive.org; iTunes artwork
// on mzstatic.com). Each is kept the first time it is seen so the song shelf has its sleeves
// offline. They are asked for in a way the worker may read (CORS), because a copy it cannot read
// is charged against the browser's storage at several megabytes apiece; a host that refuses that
// is simply shown, uncached.
const COVERS = "school-covers";
// YouTube's thumbnails are NOT handled here: its image host does not allow the readable (CORS)
// request this uses, so they are left to the browser, exactly as if there were no worker.
const COVER_HOST = /(^|\.)(coverartarchive\.org|archive\.org|mzstatic\.com)$/;
async function cover(request) {
  const cache = await caches.open(COVERS);
  const hit = await cache.match(request.url);
  if (hit) return hit;
  let res;
  try { res = await fetch(request.url, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer" }); }
  catch (e) { return fetch(request); }
  if (res.ok) cache.put(request.url, res.clone()).catch(() => {});
  return res;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (COVER_HOST.test(url.hostname) && request.destination === "image") {
    event.respondWith(cover(request));
    return;
  }
  if (url.origin === ROOT.origin && !url.pathname.startsWith(ROOT.pathname)
      && url.pathname.startsWith(PARENT.pathname) && request.mode !== "navigate") {
    event.respondWith(fromMusic(request));
    return;
  }
  if (url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return;
  let path;
  try { path = decodeURIComponent(url.pathname.slice(ROOT.pathname.length)); } catch (e) { return; }
  if (path === "" || (request.mode === "navigate" && !FILES[path])) path = "index.html";
  if (!FILES[path]) return;                 // not part of the app: leave it to the network
  event.respondWith(
    caches.open(CACHE)
      .then((cache) => cache.match(keyFor(path)))
      .then((hit) => hit || fetch(request))
  );
});
