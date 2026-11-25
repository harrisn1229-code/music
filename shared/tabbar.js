/* The bar along the bottom of Music's main pages: Home, School, Calendar.

   Home and Calendar are two views of the home page (index.html switches between them in place,
   without loading anything); School is its own page (school/), which shows the same bar, so going
   from one to another feels like switching tabs in a phone app. The tools themselves (Metronome,
   Barline...) have no bar: they are opened from Home and go back to it.

   A page shows the bar with
     <script src="../shared/tabbar.js" data-tab="school"></script>
   (at the end of <body>; data-tab is the tab that page is). The home page mounts it itself so it
   can switch its own two views:
     MusicTabbar.mount("home", { inPage: ["home", "calendar"], onTab: showTab });  MusicTabbar.set("calendar");
   Links: Home is Music's root, School is school/, Calendar is the root with #tab=calendar (the home
   page opens its Calendar in whichever view, Schedule or Activity, was used last).
   Nothing is drawn inside a frame (School opened out of sight by the Calendar, for one). */
(function () {
  "use strict";
  var me = document.currentScript;
  var ROOT = new URL("../", (me && me.src) || location.href).href;
  var TABS = [
    { id: "home", name: "Home", href: "", icon: '<path d="M3.5 11 12 3.8l8.5 7.2"/><path d="M5.8 9.3V20h4.4v-5.5h3.6V20h4.4V9.3"/>' },
    { id: "school", name: "School", href: "school/", icon: '<path d="M2.5 9.2 12 4.6l9.5 4.6-9.5 4.6z"/><path d="M6.5 11.3v4.4c1.6 1.5 3.4 2.2 5.5 2.2s3.9-.7 5.5-2.2v-4.4"/><path d="M21.5 9.2v5.3"/>' },
    { id: "calendar", name: "Calendar", href: "#tab=calendar", icon: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/><path d="M7.6 13.5h.01M12 13.5h.01M16.4 13.5h.01M7.6 17h.01M12 17h.01"/>' }
  ];
  // Its own colours (Music's), so it looks the same on every page whatever that page's stylesheet.
  var CSS =
    ":root{--tb-bg:#F2F3F6;--tb-ink:#14171F;--tb-muted:#5F6675;--tb-rule:#E3E6EC}" +
    "@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--tb-bg:#0D0E12;--tb-ink:#ECEEF4;--tb-muted:#9BA1B0;--tb-rule:#292D38}}" +
    ":root[data-theme=dark]{--tb-bg:#0D0E12;--tb-ink:#ECEEF4;--tb-muted:#9BA1B0;--tb-rule:#292D38}" +
    "html.has-tabbar body{padding-bottom:calc(3.5rem + env(safe-area-inset-bottom, 0px))}" +
    ".tabbar{display:block;box-sizing:border-box;position:fixed;left:0;right:0;bottom:0;z-index:15;margin:0;padding-bottom:env(safe-area-inset-bottom, 0px);" +
      "background:var(--tb-bg);background:color-mix(in srgb, var(--tb-bg) 88%, transparent);" +
      "-webkit-backdrop-filter:saturate(180%) blur(18px);backdrop-filter:saturate(180%) blur(18px);" +
      "box-shadow:0 -1px 0 var(--tb-rule);view-transition-name:music-tabbar;" +
      "font:600 .6875rem/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;letter-spacing:.01em}" +
    ".tabbar-in{display:flex;box-sizing:border-box;width:100%;max-width:28rem;margin:0 auto;padding:0 max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px))}" +
    ".tabbar .tab{flex:1;height:3.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;" +
      "color:var(--tb-muted);text-decoration:none;-webkit-tap-highlight-color:transparent;border:0;background:none;font:inherit;cursor:pointer}" +
    ".tabbar .tab svg{width:1.5rem;height:1.5rem;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
    ".tabbar .tab[aria-current=page]{color:var(--tb-ink)}" +
    ".tabbar .tab[aria-current=page] svg{stroke-width:2.1}" +
    ".tabbar .tab:active svg{transform:scale(.9)}" +
    ".tabbar .tab:focus-visible{outline:2px solid #F5A93B;outline-offset:-3px;border-radius:.75rem}" +
    "@media print{.tabbar{display:none}}";

  var nav = null, opts = {};
  function set(id) {
    if (!nav) return;
    Array.prototype.forEach.call(nav.querySelectorAll(".tab"), function (a) {
      if (a.dataset.tab === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  function mount(current, o) {
    var framed = false;
    try { framed = self !== self.top; } catch (e) { framed = true; }
    if (framed || nav) return;
    opts = o || {};
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
    // A plain element with the navigation role, so no page's own styles for <nav> reach it.
    nav = document.createElement("div");
    nav.className = "tabbar";
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "Music");
    nav.innerHTML = '<div class="tabbar-in">' + TABS.map(function (t) {
      return '<a class="tab" href="' + ROOT + t.href + '" data-tab="' + t.id + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + t.icon + "</svg>" + t.name + "</a>";
    }).join("") + "</div>";
    nav.addEventListener("click", function (e) {
      var a = e.target.closest(".tab");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var id = a.dataset.tab;
      // A tab this page draws itself switches here; the tab already open goes back to the top.
      if ((opts.inPage || []).indexOf(id) >= 0 && opts.onTab) { e.preventDefault(); opts.onTab(id); return; }
      if (a.getAttribute("aria-current") === "page") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    });
    document.body.appendChild(nav);
    document.documentElement.classList.add("has-tabbar");
    set(current);
  }

  self.MusicTabbar = { mount: mount, set: set };
  var tab = me && me.getAttribute("data-tab");
  if (tab) {
    if (document.body) mount(tab);
    else document.addEventListener("DOMContentLoaded", function () { mount(tab); });
  }
})();
