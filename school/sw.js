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
const FILES = {"app.css":"a8d8c87c35","app.js":"f21fb51ec7","audio/ear-01.wav":"707a3fae4c","audio/ear-02.wav":"b21e915cc3","audio/ear-03.wav":"d9ba449928","audio/ear-04.wav":"a1dcb4b5a7","audio/ear-05.wav":"3fd1f274ff","audio/ear-06.wav":"13e6740d9a","audio/ear-07.wav":"0b2fd6786e","audio/ear-08.wav":"f7d212de5a","audio/ear-09.wav":"b9c91a2c9b","audio/ear-10.wav":"9975578a4e","audio/ear-11.wav":"526edafd31","audio/ear-13.wav":"98668c5145","audio/ear-14.wav":"da817d7e7c","audio/ear-15.wav":"edc0e789ac","audio/ear-16.wav":"33631fe79c","audio/ear-17.wav":"4e4df49d6c","audio/ear-18.wav":"1106b90941","audio/ear-19.wav":"94ead1eb8d","audio/ear-20.wav":"bdc44f5078","books/hanon/p001.webp":"45117ab53e","books/hanon/p002.webp":"76e9221abe","books/hanon/p003.webp":"5c066cf701","books/hanon/p004.webp":"93ff529d01","books/hanon/p005.webp":"2857bdcb29","books/hanon/p006.webp":"57cdb5eaeb","books/hanon/p007.webp":"e1a4f67e99","books/hanon/p008.webp":"173a23ab00","books/hanon/p009.webp":"399d88514a","books/hanon/p010.webp":"db358fe473","books/hanon/p011.webp":"ae51345126","books/hanon/p012.webp":"db98dee17d","books/hanon/p013.webp":"94971097d8","books/hanon/p014.webp":"77457adbf5","books/hanon/p015.webp":"02bef18923","books/hanon/p016.webp":"8f770b8382","books/hanon/p017.webp":"c881c7ffed","books/hanon/p018.webp":"ca67b4b8cc","books/hanon/p019.webp":"375af1990d","books/hanon/p020.webp":"66451bccb0","books/hanon/p021.webp":"f7e0007047","books/hanon/p022.webp":"cbae46f919","books/hanon/p023.webp":"f523ddcba9","books/hanon/p024.webp":"8665aa0f87","books/hanon/p025.webp":"4f69563f76","books/hanon/p026.webp":"233b14374a","books/hanon/p027.webp":"962c42dfe8","books/hanon/p028.webp":"396d1e4262","books/hanon/p029.webp":"08c99a540c","books/hanon/p030.webp":"b73b80bd31","books/hanon/p031.webp":"c2cd2c44dd","books/hanon/p032.webp":"54fc6dc5ed","books/hanon/p033.webp":"36001504a6","books/hanon/p034.webp":"f3c16b1ff4","books/hanon/p035.webp":"950d43fb79","books/hanon/p036.webp":"7443d1db72","books/hanon/p037.webp":"754028fec1","books/hanon/p038.webp":"bc93cfbeea","books/hanon/p039.webp":"76f3d2bb75","books/hanon/p040.webp":"094a93b7d4","books/hanon/p041.webp":"3bb9a0a7b5","books/hanon/p042.webp":"a2ca0a6501","books/hanon/p043.webp":"ea493b24a5","books/hanon/p044.webp":"1633410fca","books/hanon/p045.webp":"9850efa6b1","books/hanon/p046.webp":"c4e8edac67","books/hanon/p047.webp":"4eaaee57bb","books/hanon/p048.webp":"1eadf43024","books/hanon/p049.webp":"3ee84b1558","books/hanon/p050.webp":"b620e70246","books/hanon/p051.webp":"1a3a2023c0","books/hanon/p052.webp":"d5ceb8cc8f","books/hanon/p053.webp":"96c2394523","books/hanon/p054.webp":"76d20ff1a0","books/hanon/p055.webp":"cf08cb0f8a","books/hanon/p056.webp":"8ed4d5b0f7","books/hanon/p057.webp":"1bfd5f02ee","books/hanon/p058.webp":"d10984e233","books/hanon/p059.webp":"2b69c47043","books/hanon/p060.webp":"a05999963d","books/hanon/p061.webp":"9002598725","books/hanon/p062.webp":"624978fdf4","books/hanon/p063.webp":"b968c0284c","books/hanon/p064.webp":"0b04eb9c03","books/hanon/p065.webp":"aabb6e4afb","books/hanon/p066.webp":"02dea2844b","books/hanon/p067.webp":"2f9a165447","books/hanon/p068.webp":"9b88dbec2e","books/hanon/p069.webp":"3ffa04caf9","books/hanon/p070.webp":"000cf4e138","books/hanon/p071.webp":"a29900459e","books/hanon/p072.webp":"21ac1bb5a9","books/hanon/p073.webp":"af65a45bd4","books/hanon/p074.webp":"99c8dd879f","books/hanon/p075.webp":"42a8b15ffe","books/hanon/p076.webp":"60a8e04345","books/hanon/p077.webp":"1e2f37b22a","books/hanon/p078.webp":"84da2205b8","books/hanon/p079.webp":"a842e793da","books/hanon/p080.webp":"b88831dcc3","books/hanon/p081.webp":"305b720ce3","books/hanon/p082.webp":"b7681f3a7c","books/hanon/p083.webp":"fcd3c2fb30","books/hanon/p084.webp":"d6390ab22a","books/hanon/p085.webp":"486f02de6d","books/hanon/p086.webp":"f05c0ac88a","books/hanon/p087.webp":"7bfcd3f29f","books/hanon/p088.webp":"452d3c11bc","books/hanon/p089.webp":"b35e5b1c69","books/hanon/p090.webp":"3a6081b7f2","books/hanon/p091.webp":"0585db6dd1","books/hanon/p092.webp":"1d4f9fd1c4","books/hanon/p093.webp":"641d8900c3","books/hanon/p094.webp":"563f886b33","books/hanon/p095.webp":"88c8d143a2","books/hanon/p096.webp":"0d007f344a","books/hanon/p097.webp":"d52017b18e","books/hanon/p100.webp":"cbed4951a5","books/hanon/p101.webp":"d7c85678f6","books/hanon/p102.webp":"c752083aa4","books/hanon/p103.webp":"be52199b77","books/hanon/p104.webp":"afe6957b11","books/hanon/p105.webp":"8a48e79278","books/hanon/p106.webp":"934b855b9f","books/hanon/p107.webp":"ffa82846b6","books/hanon/p108.webp":"7e4f9766cd","books/hanon/p109.webp":"76178a97fa","books/hanon/p110.webp":"6cfd84f9bf","books/hanon/p111.webp":"0a69281de0","books/hanon/p112.webp":"16cc77f6da","books/hanon/p113.webp":"c6c933169a","books/hanon/p114.webp":"3bb16cfeaf","books/hanon/p115.webp":"eb1cffaa38","books/hanon/p116.webp":"0fa71bdbca","boot.js":"82388c2d06","data/bookpages.json":"9f0db0dda4","data/curriculum.json":"485c9417e2","data/eartrain.json":"276f327fda","files/API-2500.png.webp":"5250a3de71","files/Align Delay.png.webp":"97d5a66c3b","files/Analog.png.webp":"c8f6ed0ede","files/AnalogKick.amxd.jpg.webp":"211222295b","files/Auto-Tune Pro.png.webp":"99e12dc08f","files/Bitspeek.png.webp":"026a9a2e25","files/Bloom Bass Impulse.png.webp":"bbdf6317fb","files/Cassette.png.webp":"369b763760","files/Chord Generator.jpg.webp":"d798a999eb","files/Chorus-Ensemble.jpg.webp":"a7c2beede8","files/Clariphonic DSP MKII.png.webp":"a373bf4f51","files/Collision.jpg.webp":"d49f659818","files/Compressor.jpg.webp":"d2a73306c4","files/Crystallizer.png.webp":"96908fb36c","files/DS Kick.png.webp":"cf2a530d31","files/DS Snare.png.webp":"5ebb4f18f4","files/DS Tom.png.webp":"7ec43aa139","files/DUNE 3.jpg.webp":"3650f8176c","files/Decapitator.png.webp":"21a290e07a","files/Decimort 2.jpg.webp":"9f05538a2e","files/Devil-Loc Deluxe.png.webp":"15116ce714","files/Doubler2.png.webp":"835c37ee32","files/Doubler4.png.webp":"c400e03b34","files/Drift.png.webp":"32a68e3283","files/Drum Rack.png.webp":"22fc113989","files/Duck_Buddy.jpg.webp":"d3e2e80403","files/EQ Eight.png.webp":"d835c01152","files/Echo.jpg.webp":"65cc02daa4","files/EchoBoy Jr.png.webp":"4cd20731b8","files/EchoBoy.png.webp":"a099a092e5","files/Echobode.png.webp":"cbb887481d","files/EffectRack.png.webp":"43c51133bb","files/Envelope Follower.jpg.webp":"f694bd9391","files/Erick Satie - 3 Gymnopedies.pdf":"9116069f7d","files/Expression Control.png.webp":"d5ad1eecac","files/FETish.png.webp":"d2b6c953aa","files/FabFilter Micro.png.webp":"8dccad9c25","files/FabFilter One.png.webp":"47589de517","files/Fresh Air.png.webp":"4f2a09419c","files/Ghz Faraday Limiter 3.png.webp":"ec6dc27ba6","files/Ghz Megaverb 3.png.webp":"15d99117df","files/Ghz Tiltshift 3.png.webp":"8ec1dfd618","files/Ghz Tone Control 3.png.webp":"0ec4f915a8","files/Ghz Tupe 3.png.webp":"89254fe5c6","files/Ghz Vulf Compressor 3.png.webp":"4103cb2d93","files/Glue Compressor.png.webp":"b8be5772e6","files/Granulator II.jpeg.webp":"e7b620ed1b","files/GranulatorFollow II.jpg.webp":"ae953feb19","files/GranulatorInput II.jpg.webp":"4346be47da","files/Group Humanizer.jpg.webp":"549beab9a8","files/Gullfoss Master.jpg.webp":"6aed479482","files/Gullfoss.jpg.webp":"6aed479482","files/Hand Clap Studio.jpg.webp":"185c96e760","files/Impulse.png.webp":"2be2b53228","files/Keyscape.png.webp":"415bebd5e5","files/Kick 3.png.webp":"57bdbe98b3","files/Kickstart 2.png.webp":"e9471503c1","files/Kontakt 7.png.webp":"da9553ce52","files/Kramer Tape.png.webp":"f4aa99bbc1","files/LALA.png.webp":"a32e422d34","files/LFO Tool.png.webp":"6a7dfbb175","files/LFO.png.webp":"1e23228ead","files/LFOTool.png.webp":"5c26c689e8","files/Limiter.png.webp":"5e5f3444e3","files/Little AlterBoy.png.webp":"99333d5f4a","files/Little MicroShift.png.webp":"e21dd80f61","files/Little Plate.png.webp":"c8297e33c3","files/Little Radiator.png.webp":"687478f51a","files/Massive.png.webp":"f8a410b82c","files/Melodyne.png.webp":"91754f7a3f","files/MicroShift.png.webp":"cd661ace4d","files/Microtonic.png.webp":"8f8ae5315d","files/Model 84 Polyphonic Synthesizer.png.webp":"4ab16bc88c","files/Modes by Scale Degree (handwritten).jpeg.webp":"4b39b014e4","files/Morgan Amps Suite.png.webp":"1a985c6f21","files/Nexus.png.webp":"ef8cfb3f91","files/Note Echo.png.webp":"b4c068abdf","files/OTT.png.webp":"c1f9311a13","files/Omnisphere.png.webp":"67a9748c53","files/Operator.jpg.webp":"574f7b174b","files/Overdrive.jpg.webp":"86a5050242","files/Oxford Inflator.png.webp":"eb62e89a06","files/Ozone 9 Equalizer.png.webp":"d252897c9e","files/Ozone 9 Exciter.png.webp":"db29b7ddc2","files/Ozone 9 Imager.png.webp":"70ed3209a8","files/Ozone 9 Low End Focus.png.webp":"451c6a8f4d","files/Ozone 9 Master Rebalance.png.webp":"dcb2b38fa4","files/Ozone 9 Match EQ.png.webp":"fa8bc480d3","files/Ozone 9 Maximizer.png.webp":"99fb1b0586","files/Ozone 9 Spectral Shaper.png.webp":"58ef234b9b","files/Ozone 9 Vintage Compressor.png.webp":"cfaeeb5837","files/Ozone 9 Vintage EQ.png.webp":"e55e4d87ad","files/Ozone 9 Vintage Limiter.png.webp":"2d6de435c3","files/Ozone 9 Vintage Tape.png.webp":"5152147392","files/PanMan.png.webp":"7c8cb3a761","files/Pro-C 2.png.webp":"75f8e6e5e7","files/Pro-DS.png.webp":"257e87e7d6","files/Pro-L 2.png.webp":"7fb9ed0c87","files/Pro-MB.png.webp":"a4d45eb20a","files/Pro-Q 4.png.webp":"2ad36a8dea","files/RC-20 Retro Color.png.webp":"29de72fff8","files/RX Guitar De-noise.png.webp":"8a4792f30f","files/RX Music Rebalance.png.webp":"e704fdb7a1","files/Ramzoid 808 Cooker.png.webp":"a05a875665","files/S1 Imager.png.webp":"543960c304","files/S1 Shuffler.png.webp":"a05c1dbe96","files/Sampler.png.webp":"9ebae8dcf5","files/Saturator.jpg.webp":"a2fb755a1d","files/Saturn 2.png.webp":"32f3c988aa","files/Serato Sample.png.webp":"1d38f42a34","files/Serum 2.png.webp":"a5ea2e2050","files/Shaper.jpg.webp":"26405bb7db","files/Sie-Q.png.webp":"dbe1d9a162","files/Simpler.png.webp":"4b4d7e5c23","files/Solid Bus Comp.png.webp":"6eaf908976","files/Soothe2.png.webp":"9d0f5e55b5","files/Stereo Tool.png.webp":"c752d1b657","files/SurferEQ.png.webp":"144d9cdaf8","files/Swiss Army Meter.jpg.webp":"902f92001b","files/TAL-Chorus-LX.png.webp":"cd58a81053","files/TL EasyComp.png.webp":"d7aea3c779","files/Transient Master.png.webp":"f1df042d43","files/Tremolator.png.webp":"1f766795c4","files/UAD Neve 1073.png.webp":"f31d50f894","files/UAD Pultec EQP-1A.png.webp":"3663dcc3b0","files/UAD Pure Plate Reverb.png.webp":"1da962868d","files/UAD RealVerb-Pro.png.webp":"33b8af32fc","files/UAD Teletronix LA-2A.png.webp":"53a6af667b","files/UAD Tube-Tech CL 1B mkII.png.webp":"8f6ebb912f","files/UAD UA 1176LN.png.webp":"c555b70ee9","files/UAD UA 610-B.png.webp":"93e51b9bf6","files/Utility.jpg.webp":"669e8406e6","files/ValhallaDelay.jpg.webp":"b227dc85a2","files/ValhallaPlate.jpg.webp":"7abf370f2c","files/ValhallaSupermassive.png.webp":"6247c14c6e","files/ValhallaVintageVerb.png.webp":"bdd75a83ad","files/VocAlign Project 5 AU.png.webp":"501b125bc7","files/VocAlign Ultra AU.png.webp":"e524089e3a","files/Volcano 3.png.webp":"a6f651515e","files/Wavetable.jpg.webp":"97d38370ad","files/Wider.png.webp":"667b6ccde8","files/XO.png.webp":"1d4eb4f0a7","files/jo.Oscilloscope.jpg.webp":"6e083d23bf","files/kHs 3-Band EQ.png.webp":"66dd876405","files/kHs Bitcrush.png.webp":"ebf8ed4f17","files/kHs Chorus.png.webp":"6af0a788df","files/kHs Clipper.png.webp":"6bf4165f11","files/kHs Comb Filter.png.webp":"a636a233e6","files/kHs Delay.png.webp":"7447f2fb78","files/kHs Filter.png.webp":"f5253f0a37","files/kHs Flanger.png.webp":"5a967b5917","files/kHs Frequency Shifter.png.webp":"123d7fcd8d","files/kHs Haas.png.webp":"2238a93288","files/kHs Ladder Filter.png.webp":"ba6718efcb","files/kHs Nonlinear Filter.png.webp":"c088a5e698","files/kHs Phaser.png.webp":"513b589193","files/kHs Pitch Shifter.png.webp":"952ca2f043","files/kHs Resonator.png.webp":"da6d1f11ba","files/kHs Reverser.png.webp":"f567e83090","files/mvMeter2nogpu.png.webp":"8063d0184d","files.js":"c56558fcfc","icon-192.png":"703f162e96","icon.svg":"fa825c83ff","index.html":"eb4d80ca82","library.html":"0ae59fc31d","music-skin.css":"b8248660a0","vendor/pdfjs/LICENSE":"598f87f072","vendor/pdfjs/pdf.min.js":"a4641a2626","vendor/pdfjs/pdf.worker.min.js":"49162d546a"};
const BUILD = "2026-11-12 17:38";
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
