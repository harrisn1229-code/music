/* The one GitHub connection for the whole of Music.

   Sync works the same way in every tool: each keeps its data in its own secret
   gist on your GitHub account ("Barline sync", "Note Cards sync"), and a device
   joins in by holding a GitHub token that can only read and write gists.

   That token used to be saved once per tool. It is now saved once for Music,
   under the keys below, so connecting anywhere (the home screen or inside any
   tool) turns sync on everywhere on this device, and turning it off does the
   same. Each tool still does its own syncing and merging; this file only holds
   who is connected.

   Loaded with a plain <script src="../shared/account.js"> before a tool's own
   script (and <script src="shared/account.js"> on the home screen). */
(function () {
  "use strict";
  var TOKEN = "music:ghToken", USER = "music:ghUser", MOVED = "music:ghMoved";
  // Where the standalone Barline and Note Cards kept their own tokens.
  var OLD = [["barline:ghToken", "barline:ghUser"], ["shed-deck:ghToken", "shed-deck:ghUser"]];
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }

  // First time only: if this browser already synced Barline or Note Cards, carry that
  // connection over so there is nothing to set up again. Done once, so turning sync
  // off later is not undone by the old token still sitting there.
  if (!get(MOVED)) {
    set(MOVED, "1");
    if (!get(TOKEN)) {
      for (var i = 0; i < OLD.length; i++) {
        var t = get(OLD[i][0]);
        if (t) { set(TOKEN, t); set(USER, get(OLD[i][1]) || ""); break; }
      }
    }
  }

  self.MusicAccount = {
    TOKEN_KEY: TOKEN,
    USER_KEY: USER,
    token: function () { return get(TOKEN) || ""; },
    user: function () { return get(USER) || ""; },
    connect: function (token, user) { set(TOKEN, token); set(USER, user || ""); },
    disconnect: function () { set(TOKEN, null); set(USER, null); }
  };
})();
