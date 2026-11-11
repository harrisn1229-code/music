/* Music AI: the one Claude connection every tool in Music uses.

   Barline's assistant was the first thing here to talk to Claude, with the
   musician's own Anthropic API key kept on the device. This file is that
   connection pulled out so any tool can use it: School grades tests with it,
   Barline fills in charts with it, and a key added in one is there for all.

   - The key is saved on this device only, under "music:aiKey". It is never put
     in a backup, never synced, and only ever sent to Anthropic.
     ("barline:aiKey" is where Barline first kept it; it is still read, and
     still written, so an older copy of Barline keeps working.)
   - Requests go straight from this device to Anthropic's API. Nothing passes
     through a server of ours, because there isn't one.

   A tool calls MusicAI.call({ system, messages, tools, tool_choice }) and gets
   Anthropic's reply back, or a MusicAI.Error with a message fit to show. */
(function () {
  "use strict";
  var KEY = "music:aiKey", OLD = "barline:aiKey";
  var MODEL = "claude-opus-5-5";
  var noFallback = false;

  function get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function key() { return get(KEY) || get(OLD); }
  function looksRight(v) { return /^sk-ant-[A-Za-z0-9_\-]{10,}$/.test(String(v || "").trim()); }
  function setKey(v) {
    v = String(v || "").trim();
    try { localStorage.setItem(KEY, v); localStorage.setItem(OLD, v); return true; } catch (e) { return false; }
  }
  function clearKey() { try { localStorage.removeItem(KEY); localStorage.removeItem(OLD); } catch (e) {} }

  function AiError(message) { this.name = "AiError"; this.message = message; }
  AiError.prototype = Object.create(Error.prototype);

  /* One request. `opt`: system, messages, tools, tool_choice, max_tokens, effort, signal. */
  async function call(opt) {
    if (!key()) throw new AiError("Add your Anthropic API key first.");
    var send = function (withFallback) {
      var headers = {
        "content-type": "application/json",
        "x-api-key": key(),
        "anthropic-version": "2026-10-21",
        "anthropic-dangerous-direct-browser-access": "true"
      };
      var body = {
        model: opt.model || MODEL,
        max_tokens: opt.max_tokens || 16000,
        output_config: { effort: opt.effort || "medium" },
        messages: opt.messages
      };
      if (opt.system) body.system = opt.system;
      if (opt.tools) body.tools = opt.tools;
      if (opt.tool_choice) body.tool_choice = opt.tool_choice;
      // If a request is declined by a safety check, let Anthropic retry it on a suitable model.
      if (withFallback) { headers["anthropic-beta"] = "server-side-fallback-2026-07-01"; body.fallbacks = "default"; }
      return fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: headers, body: JSON.stringify(body), signal: opt.signal });
    };
    var res;
    try {
      res = await send(!noFallback);
      if (res.status === 400) {
        var err = await res.clone().json().catch(function () { return null; });
        var m = err && err.error && err.error.message || "";
        if (/fallback|anthropic-beta/i.test(m)) { noFallback = true; res = await send(false); }
      }
    } catch (e) {
      if (e && e.name === "AbortError") throw e;
      throw new AiError("Couldn't reach Anthropic. Check your connection and try again.");
    }
    var data = await res.json().catch(function () { return null; });
    if (!res.ok) {
      var msg = data && data.error && data.error.message ? data.error.message : "";
      if (res.status === 401) throw new AiError("That API key wasn't accepted. Check it and try again.");
      if (res.status === 403) throw new AiError("This API key isn't allowed to do that. " + msg);
      if (res.status === 429) throw new AiError("Too many requests for now. Wait a moment and try again.");
      if (res.status === 529 || res.status >= 500) throw new AiError("Claude is busy right now. Try again in a moment.");
      throw new AiError("The request didn't go through" + (msg ? ": " + msg : "."));
    }
    if (!data || !Array.isArray(data.content)) throw new AiError("Got an empty answer. Try again.");
    if (data.stop_reason === "refusal") throw new AiError("Claude couldn't help with that request.");
    return data;
  }

  self.MusicAI = {
    model: MODEL,
    key: key,
    has: function () { return !!key(); },
    looksRight: looksRight,
    setKey: setKey,
    clearKey: clearKey,
    call: call,
    Error: AiError,
    // Shown wherever a tool asks for the key, so every tool says the same thing about it.
    about: "Create a key at console.anthropic.com (API keys). It's pay as you go: a request usually costs a few cents. The key stays on this device, is never put in backups or synced, and is only sent to Anthropic."
  };
})();
