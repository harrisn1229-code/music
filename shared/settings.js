/* Music settings: the choices that apply to the whole of Music, not one tool.

   For now that is the theme (System, Light or Dark). It is kept on this device under
   "music:settings" and applied to every tool as data-theme="light|dark" on <html>
   (no attribute = follow the device). Each tool's stylesheet reads that attribute.

   Load with a plain <script src="../shared/settings.js"></script> in <head>, after the
   theme-color <meta> tags and before the stylesheet-dependent first paint, so the theme
   is in place before anything is drawn. Every tool loads it, Ear Training included.

   MusicSettings.get()         the settings, {theme}
   MusicSettings.set(patch)    save a change and apply it
   MusicSettings.apply()       put the saved theme on this page
   MusicSettings.onChange(fn)  fn(settings) after any change, here or in another tab */
(function () {
  "use strict";
  var KEY = "music:settings", THEMES = ["system", "light", "dark"];
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function parse(s) { try { var v = JSON.parse(s); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  function clean(v) {
    v = v || {};
    return { theme: THEMES.indexOf(v.theme) >= 0 ? v.theme : "system" };
  }
  var cache = null, listeners = [];

  function load() {
    var saved = parse(read(KEY));
    if (saved) return clean(saved);
    // First run: bring over the theme Barline used to keep for itself.
    var old = parse(read("barline:prefs"));
    var s = clean({ theme: old && old.theme });
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }
  function get() { if (!cache) cache = load(); return { theme: cache.theme }; }

  // Pages that give a colour per scheme for the browser bar: a forced theme shows its own colour.
  function bar(theme) {
    var metas = document.querySelectorAll('meta[name="theme-color"][media]');
    for (var i = 0; i < metas.length; i++) {
      var m = metas[i];
      if (!m.hasAttribute("data-was")) m.setAttribute("data-was", m.getAttribute("content") || "");
    }
    for (var j = 0; j < metas.length; j++) {
      var n = metas[j], dark = /dark/.test(n.getAttribute("media") || "");
      var from = theme === "system" ? n : Array.prototype.filter.call(metas, function (x) { return /dark/.test(x.getAttribute("media") || "") === (theme === "dark"); })[0] || n;
      n.setAttribute("content", from.getAttribute("data-was") || "");
    }
  }
  function apply() {
    var theme = get().theme, root = document.documentElement;
    if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme); else root.removeAttribute("data-theme");
    if (document.head) bar(theme);
  }
  function emit() {
    var s = get();
    for (var i = 0; i < listeners.length; i++) { try { listeners[i](s); } catch (e) {} }
  }
  function set(patch) {
    var s = clean(Object.assign({}, get(), patch));
    cache = s;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    apply(); emit();
    return get();
  }
  function reload() { cache = null; apply(); emit(); }

  window.addEventListener("storage", function (e) { if (e.key === KEY || e.key === null) reload(); });
  window.addEventListener("pageshow", function () { reload(); });

  /* The practice log (shared/log.js) runs on every page that loads this file. Until it has
     loaded, calls to MusicLog wait in a queue, so a tool can call it at any time. */
  var me = document.currentScript && document.currentScript.src;
  function inject(file) {
    if (!me) return;
    var s = document.createElement("script");
    s.src = me.slice(0, me.lastIndexOf("/") + 1) + file;
    (document.head || document.documentElement).appendChild(s);
  }
  if (!self.MusicLog) {
    var q = [];
    self.MusicLog = { _q: q };
    ["playing", "count", "event", "record", "unrecord", "amend"].forEach(function (m) { self.MusicLog[m] = function () { q.push([m, arguments]); }; });
    inject("log.js");
  }
  /* The Timer (shared/timer.js) runs everywhere too: a running pomodoro shows its time in every
     tool's top bar, and finishes (chime, logged) wherever the musician is when it runs out. */
  if (!self.MusicTimer) inject("timer.js");

  self.MusicSettings = {
    KEY: KEY,
    get: get,
    set: set,
    apply: apply,
    onChange: function (fn) { listeners.push(fn); }
  };
  apply();
})();
