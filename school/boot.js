/* Music School — start-up for the app build.

   app.js was written for a single-file page that carries its data in <script type="application/json">
   blocks, and it still reads them that way. The app keeps that data in separate files instead (so
   an update only downloads what changed), and this script is the bridge: fetch the files, put them
   where app.js looks, put this device's saved progress where the page's own used to be, start app.js.

   Progress lives in localStorage under `school:progress` (Music's rule: a tool's saved data
   starts with the tool's name). A device that has never opened the school starts from the empty
   one below. `music-school:progress` is where the short-lived standalone build kept it; it is
   carried over once. */
(function () {
  'use strict';
  var KEY = 'school:progress', OLD = 'music-school:';
  try {
    if (localStorage.getItem(KEY) === null && localStorage.getItem(OLD + 'progress') !== null) {
      localStorage.setItem(KEY, localStorage.getItem(OLD + 'progress'));
      if (localStorage.getItem(OLD + 'savedAt')) localStorage.setItem('school:savedAt', localStorage.getItem(OLD + 'savedAt'));
    }
  } catch (e) {}
  var msg = document.getElementById('bootmsg');
  function island(id, text) {
    var s = document.createElement('script');
    s.type = 'application/json'; s.id = id; s.textContent = text;
    document.body.appendChild(s);
  }
  function get(u) {
    return fetch(u).then(function (r) {
      if (!r.ok) throw new Error(u + ' — ' + r.status);
      return r.text();
    });
  }
  function saved() {
    try {
      var t = localStorage.getItem(KEY);
      if (t && typeof JSON.parse(t) === 'object') return t;
    } catch (e) {}
    return '{"user":"me"}';
  }
  function fail(e) {
    var box = document.querySelector('.boot');
    if (!box) return;
    msg.textContent = 'The school could not be opened' + (navigator.onLine === false
      ? ' — this device is offline and the app has not been saved to it yet.' : '.');
    var d = document.createElement('p');
    d.style.fontSize = '12px'; d.textContent = String(e && e.message || e);
    var b = document.createElement('button');
    b.textContent = 'Try again'; b.onclick = function () { location.reload(); };
    box.appendChild(d); box.appendChild(b);
  }
  function start() {
    Promise.all([get('data/curriculum.json'), get('data/eartrain.json'), get('data/bookpages.json')])
      .then(function (t) {
        island('curriculum', t[0]); island('eartrain', t[1]); island('bookpages', t[2]);
        island('progress', saved());
        // The list of added files has to be known before the first paint, or every sleeve and
        // chart would draw as missing and then pop in. It is a local read; 1.5 s is a ceiling
        // for a browser where storage is unavailable, not a wait anyone should ever see.
        var files = window.MSFiles ? window.MSFiles.ready : Promise.resolve();
        return Promise.race([files, new Promise(function (r) { setTimeout(r, 1500); })]);
      })
      .then(function () {
        return new Promise(function (res, rej) {
          var s = document.createElement('script');
          s.src = 'app.js'; s.onload = res;
          s.onerror = function () { rej(new Error('app.js did not load')); };
          document.body.appendChild(s);
        });
      })
      .catch(fail);
  }
  start();

  /* Offline: School keeps its own service worker (it is far bigger than the other tools, and this
     one updates file by file), registered for this folder only. The rest of Music is looked after
     by ../sw.js. Only on https (or localhost) — that is where browsers allow it. */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' ||
      location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
