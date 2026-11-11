/* Music Cloud: one email account for the whole of Music.

   What an account gives a tool:
     - sign in with email and password, on any device;
     - one saved document per tool that follows the account (School keeps its
       progress there), protected so that only its owner can read or write it;
     - private files for approved members (School's chord charts, album art,
       book scans): things that can't be published with the app, so they are
       kept in a private bucket and handed only to the people on the list.

   It runs on a Supabase project named in shared/cloud-config.js. With no
   project named, `MusicCloud.configured` is false and nothing here does
   anything. The Supabase library is only loaded when it is needed.

   Tools use `self.MusicCloud`; they never talk to Supabase directly. */
(function () {
  "use strict";
  var cfg = self.MUSIC_CLOUD || {};
  var configured = !!(cfg.url && cfg.anonKey);
  var client = null, user = null, listeners = [], membership = null, recovering = false;

  // This file's own folder, so the library loads from the right place whichever tool asks.
  var here = (document.currentScript && document.currentScript.src) || "";
  var base = here ? here.slice(0, here.lastIndexOf("/") + 1) : "../shared/";

  function emit() { listeners.forEach(function (f) { try { f(user); } catch (e) {} }); }
  function plain(u) { return u ? { id: u.id, email: u.email || "" } : null; }
  function fail(error, fallback) {
    var m = (error && (error.message || error.error_description)) || fallback || "Something went wrong.";
    if (/Failed to fetch|NetworkError|Load failed/i.test(m)) m = "Couldn't reach the account service. Check your connection.";
    if (/Invalid login credentials/i.test(m)) m = "That email and password don't match an account.";
    if (/Email not confirmed/i.test(m)) m = "Confirm your email first: open the link in the message we sent, then sign in.";
    if (/already registered/i.test(m)) m = "There's already an account with that email. Sign in instead.";
    var e = new Error(m); e.status = error && (error.status || error.statusCode); return e;
  }

  var ready = !configured ? Promise.resolve(null) : new Promise(function (resolve) {
    var s = document.createElement("script");
    s.src = base + "vendor/supabase.js";
    s.onload = function () {
      try {
        client = self.supabase.createClient(cfg.url, cfg.anonKey, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
        });
      } catch (e) { resolve(null); return; }
      client.auth.onAuthStateChange(function (event, session) {
        var next = plain(session && session.user);
        var changed = (next && next.id) !== (user && user.id);
        user = next;
        // Arriving from a "reset your password" email: signed in for a moment, to choose a new one.
        if (event === "PASSWORD_RECOVERY") { recovering = true; changed = true; }
        if (changed) { membership = null; emit(); }
      });
      // getSession reads the saved session from this device; it works offline.
      client.auth.getSession().then(function (r) {
        user = plain(r && r.data && r.data.session && r.data.session.user);
        resolve(user);
      }, function () { resolve(null); });
    };
    s.onerror = function () { resolve(null); };
    document.head.appendChild(s);
  });

  function need() {
    if (!client) throw new Error("Accounts aren't set up for this copy of Music.");
    return client;
  }
  function needUser() {
    if (!user) throw new Error("Sign in first.");
    return user;
  }

  async function signIn(email, password) {
    await ready;
    var r = await need().auth.signInWithPassword({ email: String(email || "").trim(), password: password });
    if (r.error) throw fail(r.error, "Couldn't sign in.");
    user = plain(r.data.user); membership = null; emit();
    return user;
  }
  /* Returns { user, confirm }: `confirm` is true when the project wants the
     address confirmed by email before the first sign-in. */
  async function signUp(email, password) {
    await ready;
    var r = await need().auth.signUp({
      email: String(email || "").trim(), password: password,
      options: { emailRedirectTo: new URL("../", base).href }
    });
    if (r.error) throw fail(r.error, "Couldn't create the account.");
    if (r.data.session) { user = plain(r.data.user); membership = null; emit(); }
    return { user: plain(r.data.user), confirm: !r.data.session };
  }
  async function signOut() {
    await ready;
    if (client) await client.auth.signOut().catch(function () {});
    user = null; membership = null; emit();
  }
  async function resetPassword(email) {
    await ready;
    var r = await need().auth.resetPasswordForEmail(String(email || "").trim(), { redirectTo: new URL("../", base).href });
    if (r.error) throw fail(r.error, "Couldn't send the reset email.");
  }
  /* After following a password-reset link the browser is signed in for a
     moment with permission to set a new password. */
  async function setPassword(password) {
    await ready;
    var r = await need().auth.updateUser({ password: password });
    if (r.error) throw fail(r.error, "Couldn't change the password.");
    recovering = false; emit();
  }

  /* ---- one saved document per tool ---- */
  async function load(app) {
    await ready; needUser();
    var r = await need().from("app_data").select("data").eq("user_id", user.id).eq("app", app).maybeSingle();
    if (r.error) throw fail(r.error, "Couldn't read your saved data.");
    return r.data ? r.data.data : null;
  }
  async function save(app, data) {
    await ready; needUser();
    var r = await need().from("app_data").upsert(
      { user_id: user.id, app: app, data: data, saved_at: new Date().toISOString() },
      { onConflict: "user_id,app" });
    if (r.error) throw fail(r.error, "Couldn't save to your account.");
  }

  /* ---- members and their private files ---- */
  async function member() {
    await ready;
    if (!user) return { member: false, owner: false };
    if (membership) return membership;
    var r = await need().from("members").select("owner").maybeSingle();
    if (r.error) throw fail(r.error, "Couldn't check the members list.");
    membership = { member: !!r.data, owner: !!(r.data && r.data.owner) };
    return membership;
  }
  async function listFiles(bucket) {
    await ready; needUser();
    var out = [], offset = 0, page = 1000;
    for (;;) {
      var r = await need().storage.from(bucket).list("", { limit: page, offset: offset, sortBy: { column: "name", order: "asc" } });
      if (r.error) throw fail(r.error, "Couldn't list the files.");
      (r.data || []).forEach(function (f) { if (f && f.name && f.id) out.push({ name: f.name, size: (f.metadata && f.metadata.size) || 0 }); });
      if (!r.data || r.data.length < page) break;
      offset += page;
    }
    return out;
  }
  async function download(bucket, name) {
    await ready; needUser();
    var r = await need().storage.from(bucket).download(name);
    if (r.error) throw fail(r.error, "Couldn't download that file.");
    return r.data;
  }
  async function upload(bucket, name, blob, type) {
    await ready; needUser();
    var r = await need().storage.from(bucket).upload(name, blob, { upsert: true, contentType: type || blob.type || "application/octet-stream" });
    if (r.error) {
      var e = fail(r.error, "Couldn't upload that file.");
      if (/exceeded the maximum allowed size|too large|413/i.test(String(r.error.message || "") + (r.error.statusCode || ""))) e.tooBig = true;
      throw e;
    }
  }

  self.MusicCloud = {
    configured: configured,
    ready: ready,
    user: function () { return user; },
    recovering: function () { return recovering; },
    onChange: function (f) { listeners.push(f); },
    signIn: signIn, signUp: signUp, signOut: signOut,
    resetPassword: resetPassword, setPassword: setPassword,
    load: load, save: save,
    member: member, listFiles: listFiles, download: download, upload: upload
  };
})();
