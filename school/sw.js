/* Music School service worker — keeps the whole app on the device so it opens with no connection.

   FILES is written by build.py: every file of the app and a short hash of its contents. Each
   file is cached under "<path>?v=<hash>", so:
     * an update downloads only the files whose contents changed (the 114 book pages, the fonts
       and the PDF reader are fetched once, ever);
     * a new version is only switched to once ALL of its files are saved — a half-downloaded
       update can never be served.
   The app opens from this cache every time. A new build is picked up in the background and is
   what opens the NEXT time. Only the caches named below are ever touched, so the rest of Music
   keeps its own (Music's worker, ../sw.js, only clears caches named music-app-*).

   The reader's own added files (books, charts, sleeves) are NOT here — they live in IndexedDB,
   which this worker never reads or clears. */
const FILES = {"app.css":"f04e275d92","app.js":"2c277d3d33","audio/ear-01.wav":"707a3fae4c","audio/ear-02.wav":"b21e915cc3","audio/ear-03.wav":"d9ba449928","audio/ear-04.wav":"a1dcb4b5a7","audio/ear-05.wav":"3fd1f274ff","audio/ear-06.wav":"13e6740d9a","audio/ear-07.wav":"0b2fd6786e","audio/ear-08.wav":"f7d212de5a","audio/ear-09.wav":"b9c91a2c9b","audio/ear-10.wav":"9975578a4e","audio/ear-11.wav":"526edafd31","audio/ear-13.wav":"98668c5145","audio/ear-14.wav":"da817d7e7c","audio/ear-15.wav":"edc0e789ac","audio/ear-16.wav":"33631fe79c","audio/ear-17.wav":"4e4df49d6c","audio/ear-18.wav":"1106b90941","audio/ear-19.wav":"94ead1eb8d","audio/ear-20.wav":"bdc44f5078","books/hanon/p001.webp":"45117ab53e","books/hanon/p002.webp":"76e9221abe","books/hanon/p003.webp":"5c066cf701","books/hanon/p004.webp":"93ff529d01","books/hanon/p005.webp":"2857bdcb29","books/hanon/p006.webp":"57cdb5eaeb","books/hanon/p007.webp":"e1a4f67e99","books/hanon/p008.webp":"173a23ab00","books/hanon/p009.webp":"399d88514a","books/hanon/p010.webp":"db358fe473","books/hanon/p011.webp":"ae51345126","books/hanon/p012.webp":"db98dee17d","books/hanon/p013.webp":"94971097d8","books/hanon/p014.webp":"77457adbf5","books/hanon/p015.webp":"02bef18923","books/hanon/p016.webp":"8f770b8382","books/hanon/p017.webp":"c881c7ffed","books/hanon/p018.webp":"ca67b4b8cc","books/hanon/p019.webp":"375af1990d","books/hanon/p020.webp":"66451bccb0","books/hanon/p021.webp":"f7e0007047","books/hanon/p022.webp":"cbae46f919","books/hanon/p023.webp":"f523ddcba9","books/hanon/p024.webp":"8665aa0f87","books/hanon/p025.webp":"4f69563f76","books/hanon/p026.webp":"233b14374a","books/hanon/p027.webp":"962c42dfe8","books/hanon/p028.webp":"396d1e4262","books/hanon/p029.webp":"08c99a540c","books/hanon/p030.webp":"b73b80bd31","books/hanon/p031.webp":"c2cd2c44dd","books/hanon/p032.webp":"54fc6dc5ed","books/hanon/p033.webp":"36001504a6","books/hanon/p034.webp":"f3c16b1ff4","books/hanon/p035.webp":"950d43fb79","books/hanon/p036.webp":"7443d1db72","books/hanon/p037.webp":"754028fec1","books/hanon/p038.webp":"bc93cfbeea","books/hanon/p039.webp":"76f3d2bb75","books/hanon/p040.webp":"094a93b7d4","books/hanon/p041.webp":"3bb9a0a7b5","books/hanon/p042.webp":"a2ca0a6501","books/hanon/p043.webp":"ea493b24a5","books/hanon/p044.webp":"1633410fca","books/hanon/p045.webp":"9850efa6b1","books/hanon/p046.webp":"c4e8edac67","books/hanon/p047.webp":"4eaaee57bb","books/hanon/p048.webp":"1eadf43024","books/hanon/p049.webp":"3ee84b1558","books/hanon/p050.webp":"b620e70246","books/hanon/p051.webp":"1a3a2023c0","books/hanon/p052.webp":"d5ceb8cc8f","books/hanon/p053.webp":"96c2394523","books/hanon/p054.webp":"76d20ff1a0","books/hanon/p055.webp":"cf08cb0f8a","books/hanon/p056.webp":"8ed4d5b0f7","books/hanon/p057.webp":"1bfd5f02ee","books/hanon/p058.webp":"d10984e233","books/hanon/p059.webp":"2b69c47043","books/hanon/p060.webp":"a05999963d","books/hanon/p061.webp":"9002598725","books/hanon/p062.webp":"624978fdf4","books/hanon/p063.webp":"b968c0284c","books/hanon/p064.webp":"0b04eb9c03","books/hanon/p065.webp":"aabb6e4afb","books/hanon/p066.webp":"02dea2844b","books/hanon/p067.webp":"2f9a165447","books/hanon/p068.webp":"9b88dbec2e","books/hanon/p069.webp":"3ffa04caf9","books/hanon/p070.webp":"000cf4e138","books/hanon/p071.webp":"a29900459e","books/hanon/p072.webp":"21ac1bb5a9","books/hanon/p073.webp":"af65a45bd4","books/hanon/p074.webp":"99c8dd879f","books/hanon/p075.webp":"42a8b15ffe","books/hanon/p076.webp":"60a8e04345","books/hanon/p077.webp":"1e2f37b22a","books/hanon/p078.webp":"84da2205b8","books/hanon/p079.webp":"a842e793da","books/hanon/p080.webp":"b88831dcc3","books/hanon/p081.webp":"305b720ce3","books/hanon/p082.webp":"b7681f3a7c","books/hanon/p083.webp":"fcd3c2fb30","books/hanon/p084.webp":"d6390ab22a","books/hanon/p085.webp":"486f02de6d","books/hanon/p086.webp":"f05c0ac88a","books/hanon/p087.webp":"7bfcd3f29f","books/hanon/p088.webp":"452d3c11bc","books/hanon/p089.webp":"b35e5b1c69","books/hanon/p090.webp":"3a6081b7f2","books/hanon/p091.webp":"0585db6dd1","books/hanon/p092.webp":"1d4f9fd1c4","books/hanon/p093.webp":"641d8900c3","books/hanon/p094.webp":"563f886b33","books/hanon/p095.webp":"88c8d143a2","books/hanon/p096.webp":"0d007f344a","books/hanon/p097.webp":"d52017b18e","books/hanon/p100.webp":"cbed4951a5","books/hanon/p101.webp":"d7c85678f6","books/hanon/p102.webp":"c752083aa4","books/hanon/p103.webp":"be52199b77","books/hanon/p104.webp":"afe6957b11","books/hanon/p105.webp":"8a48e79278","books/hanon/p106.webp":"934b855b9f","books/hanon/p107.webp":"ffa82846b6","books/hanon/p108.webp":"7e4f9766cd","books/hanon/p109.webp":"76178a97fa","books/hanon/p110.webp":"6cfd84f9bf","books/hanon/p111.webp":"0a69281de0","books/hanon/p112.webp":"16cc77f6da","books/hanon/p113.webp":"c6c933169a","books/hanon/p114.webp":"3bb16cfeaf","books/hanon/p115.webp":"eb1cffaa38","books/hanon/p116.webp":"0fa71bdbca","boot.js":"82388c2d06","data/bookpages.json":"9f0db0dda4","data/curriculum.json":"354ed9d52d","data/eartrain.json":"276f327fda","files/Modes by Scale Degree (handwritten).jpeg":"b38f2a76d6","files.js":"c56558fcfc","fonts/archivo-LICENSE.txt":"442cf46f44","fonts/archivo-latin-400-normal.woff2":"455de4a0e7","fonts/archivo-latin-500-normal.woff2":"aae031ec37","fonts/archivo-latin-600-normal.woff2":"f42b865e3d","fonts/archivo-latin-700-normal.woff2":"a4d70ea053","fonts/archivo-latin-ext-400-normal.woff2":"3e34b74122","fonts/archivo-latin-ext-500-normal.woff2":"bfc9be439b","fonts/archivo-latin-ext-600-normal.woff2":"5b71c38bf4","fonts/archivo-latin-ext-700-normal.woff2":"c456431fe9","fonts/courier-prime-LICENSE.txt":"433f62e9fc","fonts/courier-prime-latin-400-normal.woff2":"c5de710dac","fonts/courier-prime-latin-700-normal.woff2":"ce1bcc36ae","fonts/courier-prime-latin-ext-400-normal.woff2":"53b02703c5","fonts/courier-prime-latin-ext-700-normal.woff2":"0280118bed","fonts/fonts.css":"65c749c5ed","fonts/prata-LICENSE.txt":"04db50130c","fonts/prata-latin-400-normal.woff2":"a91597d6c5","fonts/spectral-LICENSE.txt":"4ddffcebc5","fonts/spectral-latin-400-normal.woff2":"d4877aefbc","fonts/spectral-latin-500-normal.woff2":"df84452002","fonts/spectral-latin-600-normal.woff2":"041903c5a5","fonts/spectral-latin-ext-400-normal.woff2":"a4e7b4b529","fonts/spectral-latin-ext-500-normal.woff2":"8cac2ecc6d","fonts/spectral-latin-ext-600-normal.woff2":"d53a766710","icon-192.png":"703f162e96","icon.svg":"fa825c83ff","index.html":"f175b47c86","library.html":"28dbe73ca0","vendor/pdfjs/LICENSE":"598f87f072","vendor/pdfjs/pdf.min.js":"a4641a2626","vendor/pdfjs/pdf.worker.min.js":"49162d546a"};
const BUILD = "2026-11-11 21:38";
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

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
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
