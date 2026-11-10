/* Woodshed service worker: one worker for the home screen and every app inside it.
   Pages open from the cache instantly, with or without a connection; a fresh copy
   is fetched in the background and used the next time the page opens.

   The list of files to keep comes from apps.js, so adding an app there is enough.
   Only caches named woodshed-* are ever cleared, so other apps on the same site
   (the older standalone Barline and Note Cards) keep theirs.
   Fetches skip the browser's HTTP cache (GitHub Pages lets it keep files for
   10 minutes), so an update is picked up on the next launch, not 10 minutes later. */
importScripts("apps.js");

const PREFIX = "woodshed-";
const VERSION = PREFIX + "v" + self.WOODSHED.version;
const ROOT = new URL("./", self.location.href).pathname;   // "/music/" on GitHub Pages
const HOME = ROOT + "index.html";

const SHELL = [
  "index.html",
  "apps.js",
  "manifest.webmanifest",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "apple-touch-icon.png",
  "fonts/big-shoulders-display.woff2"
].concat(...self.WOODSHED.apps.map((app) => app.files.map((file) => app.id + "/" + file)));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL.map((url) => new Request(url, { cache: "reload" }))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// A page address ("/music/barline/") is stored under its file ("/music/barline/index.html").
function pageKey(url) {
  return url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;
}

// Ask the server whether the file changed (a cheap 304 when it hasn't) and keep the answer.
function refresh(request, key) {
  const fresh = request.mode === "navigate"
    ? new Request(request.url, { cache: "no-cache", credentials: "same-origin" })
    : new Request(request, { cache: "no-cache" });
  return fetch(fresh).then((response) => {
    if (response && response.ok && !response.redirected) {
      const copy = response.clone();
      caches.open(VERSION).then((cache) => cache.put(key, copy));
    }
    return response;
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(ROOT)) return;

  const page = request.mode === "navigate";
  // "/music/barline" without the last slash would break that app's links to its own files; send it to "/music/barline/".
  if (page && self.WOODSHED.apps.some((app) => url.pathname === ROOT + app.id)) {
    event.respondWith(Response.redirect(url.pathname + "/" + url.search, 301));
    return;
  }
  const key = page ? pageKey(url) : url.pathname;

  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(key, { ignoreVary: true }).then((cached) => {
        const network = refresh(request, key);
        if (cached) {
          event.waitUntil(network.catch(() => {}));
          return cached;
        }
        // Not saved yet: use the network, and offline fall back to the home screen for pages.
        return network.catch(() => (page ? cache.match(HOME, { ignoreVary: true }) : Response.error()));
      })
    )
  );
});
