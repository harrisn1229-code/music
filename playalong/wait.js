/* PA.wait: wait mode for Play Along. The cursor steps through the MAIN part and stops on each event until the right note(s) are played.
   Needs listen.js (PAListen), rec.js (PA.rec: the driver switch) and app.js (PA.app).

   Input: the microphone (monophonic: a chord is accepted by its lowest note) or Web MIDI (a chord = every note within 300 ms).
   "Auto" takes MIDI when a MIDI input is plugged in, else the microphone. Octave-insensitive matching is on for the microphone by default.
   Rests, tied continuations and dead notes are skipped by themselves after their written length at the current speed.
   A hit counter (first try / events done) is kept per run and saved on the history entry as wait: { hit, of }.
   prefs.wait = { on, src: "auto"|"mic"|"midi", octave: null|true|false (null = auto), backing: bool (play the backing parts when a note is right) }

   PA.wait.on() / setOn(bool) / driver (the PA.app driver while on) / stats() -> { hit, of }. */
(function () {
  "use strict";
  var PA = window.PA, PL = window.PAListen, SC = PA.score, EN = PA.engine, A = PA.app, S = PA.S, R = PA.rec;
  if (!PL || !A || !R) return;
  var clamp = SC.clamp;
  var $ = function (id) { return document.getElementById(id); };
  var el = A.el, IC = R.IC;
  var now = function () { return performance.now(); };
  var W = PA.wait = { run: null };

  function P() { return S.prefs && S.prefs.wait; }
  W.on = function () { return !!(P() && P().on); };

  var st = { running: false, waiting: false, idx: 0, need: [], tries: 0, group: [], timer: 0, hits: 0, done: 0, pos: 0, seg: { speed: 1, auto: false, next: Infinity },
    session: null, source: "mic", flashT: 0, lvl: 0 };
  W.stats = function () { return { hit: st.hits, of: st.done }; };
  W.state = st;

  function octaveOn() { var o = P().octave; return o == null ? st.source !== "midi" : !!o; }
  function spb(pos) { return 60 / (S.tl.writtenAt(pos) * (S.prefs.speed || 1)); }
  function needOf(ev) {
    var out = [];
    ev.notes.forEach(function (n) { if (!n.skip && !n.dead && !n.drum) out.push(n.midi); });
    return out.sort(function (a, b) { return a - b; });
  }
  function evAt(pos) {
    var evs = S.tl.events, lo = 0, hi = evs.length - 1;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (evs[mid].start <= pos + 1e-6) lo = mid; else hi = mid - 1; }
    return lo;
  }
  function firstAtOrAfter(pos) {
    var evs = S.tl.events;
    for (var i = 0; i < evs.length; i++) if (evs[i].start >= pos - 1e-6) return i;
    return evs.length;
  }

  /* ---- feedback ---- */
  function flash(kind) {
    var h = $("vPlayer"), c = kind === "ok" ? "w-ok" : "w-bad";
    h.classList.remove("w-ok", "w-bad");
    void h.offsetWidth;
    h.classList.add(c);
    clearTimeout(st.flashT);
    st.flashT = setTimeout(function () { h.classList.remove("w-ok", "w-bad"); }, kind === "ok" ? 260 : 340);
    var cn = $("wCount"); if (cn) { cn.classList.remove("ok", "bad"); void cn.offsetWidth; cn.classList.add(kind); }
  }
  function updateSlot() {
    var s = $("wSlot");
    if (!s) return;
    if (!W.on()) { s.hidden = true; s.innerHTML = ""; return; }
    s.hidden = false;
    if (!s.firstChild) s.innerHTML = '<span class="wsrc" id="wSrc"></span><span class="rlvl"><i id="wLvl"></i></span><b id="wCount"></b>';
    $("wSrc").innerHTML = (st.source === "midi" ? "MIDI" : IC.mic + "Mic");
    $("wCount").textContent = st.hits + "/" + st.done;
    A.layout();
  }
  function setLevel(v) { var l = $("wLvl"); if (l) l.style.width = Math.round(clamp(v * 6, 0, 1) * 100) + "%"; }

  /* ---- the step machine ---- */
  function enter(i) {
    clearTimeout(st.timer); st.timer = 0;
    if (!st.running) return;
    var evs = S.tl.events, L = EN.loopRange();
    if (L && i < evs.length && evs[i].start >= L.end - 1e-6) { i = firstAtOrAfter(L.start); loopWrapped(); }
    if (i >= evs.length) { finish(); return; }
    var ev = evs[i];
    st.idx = i; st.tries = 0; st.group = []; st.need = needOf(ev); st.pos = ev.start;
    if (!st.need.length) { st.waiting = false; st.timer = setTimeout(function () { enter(i + 1); }, Math.max(20, ev.dur * spb(ev.start) * 1000)); }
    else st.waiting = true;
  }
  function loopWrapped() {
    var Pr = S.prefs, step = (Pr.speedUp || 0) / 100, target = (Pr.speedTarget || 100) / 100, sp = st.seg.speed;
    if (step > 0 && sp < target - 1e-9) {
      sp = Math.min(target, Math.round((sp + step) * 1000) / 1000);
      st.seg = { speed: sp, auto: true, next: Infinity };
    }
  }
  function finish() {
    if (st.driver.finished) return;
    st.driver.finished = true;
    if (st.driver.onEnd) st.driver.onEnd();
  }
  function good() {
    var ev = S.tl.events[st.idx];
    flash("ok");
    st.done++; if (st.tries === 0) st.hits++;
    updateSlot();
    if (P().backing && ev) { try { EN.playRange(ev.start, ev.start + ev.dur, spb(ev.start), (EN.E.ctx ? EN.E.ctx.currentTime : 0) + 0.02); } catch (e) {} }
    st.waiting = false;
    enter(st.idx + 1);
  }
  function bad() { st.tries++; flash("bad"); }
  function onNote(midi, info) {
    if (!st.running || !st.waiting) return;
    var oct = octaveOn(), key = function (m) { return oct ? ((m % 12) + 12) % 12 : m }, need = st.need.map(key), k = key(midi), ok;
    if (st.source === "midi" && need.length > 1) {
      var t = now();
      if (st.group.length && t - st.group[0].at > 300) st.group = [];
      if (need.indexOf(k) < 0) { bad(); return; }
      if (!st.group.some(function (g) { return g.k === k; })) st.group.push({ k: k, at: t });
      ok = need.every(function (n) { return st.group.some(function (g) { return g.k === n; }); });
      if (!ok) return;
    } else ok = k === need[0];
    if (ok) good(); else bad();
  }

  /* ---- input ---- */
  function pickSource() {
    var s = P().src;
    if (s === "mic" || s === "midi") return Promise.resolve(s);
    if (!PL.hasMidi()) return Promise.resolve("mic");
    return navigator.requestMIDIAccess().then(function (acc) { return acc.inputs && acc.inputs.size > 0 ? "midi" : "mic"; }, function () { return "mic"; });
  }
  function openInput(src) {
    if (src === "midi") return PL.midi({ onNote: onNote });
    var lo = 99, hi = 0;
    S.tl.events.forEach(function (ev) { ev.notes.forEach(function (n) { if (!n.skip && !n.dead && !n.drum) { lo = Math.min(lo, n.midi); hi = Math.max(hi, n.midi); } }); });
    return PL.mic({ onNote: onNote, onLevel: setLevel, minMidi: clamp(lo - 2, 16, 28), maxMidi: clamp(hi + 2, 60, 100) });
  }
  function closeInput() {
    if (st.session) { try { st.session.stop(); } catch (e) {} st.session = null; }
  }

  /* ---- the driver ---- */
  function makeDriver() {
    var d = { kind: "wait", finished: false, onEnd: null, alwaysSeek: false };
    st.driver = d;
    d.start = function () {
      var tl = S.tl;
      if (tl.parts[0].drum) return Promise.reject(new Error("Wait needs a part with notes"));
      EN.ensureCtx();
      d.finished = false;
      return pickSource().then(function (src) {
        st.source = src;
        return openInput(src).then(function (sess) { st.session = sess; }, function (e) {
          var denied = e && (e.name === "NotAllowedError" || e.name === "SecurityError" || /denied|permission/i.test(e.message || ""));
          throw new Error(denied ? "Microphone is blocked" : src === "midi" ? ((e && e.message) || "MIDI isn't available") : ((e && e.message) || "Can't listen"));
        });
      }).then(function () {
        var L = EN.loopRange(), sp = S.startPos;
        if (L && (sp < L.start - 1e-6 || sp >= L.end - 1e-6)) sp = L.start;
        if (sp >= tl.total - 1e-6) sp = 0;
        S.startPos = sp;
        st.hits = 0; st.done = 0; st.seg = { speed: S.prefs.speed, auto: false, next: Infinity };
        st.running = true;
        updateSlot();
        enter(evAt(sp));
      });
    };
    function halt() { st.running = false; st.waiting = false; clearTimeout(st.timer); st.timer = 0; closeInput(); setLevel(0); }
    d.stop = halt; d.dispose = halt;
    d.seek = function (pos) { if (st.running) enter(evAt(pos)); };
    d.setSpeed = function (f) { st.seg = { speed: f, auto: false, next: Infinity }; };
    d.pos = function () { return st.running ? { pos: st.pos, counting: false, speed: st.seg.speed, seg: st.seg } : null; };
    return d;
  }

  /* ---- on / off ---- */
  W.setOn = function (v) {
    v = !!v;
    var p = P(); if (!p || p.on === v) return;
    if (v && R.sync.open) R.closeSync();
    if (v && R.take()) { A.showErr("Stop recording first"); return; }
    p.on = v; A.save();
    if (S.playing) A.pausePlay(true);
    R.drivers.wait = v ? makeDriver() : null;
    R.refreshDriver();
    syncRow(); updateSlot();
    if (R.updateBar) R.updateBar();
    PA.emit("wait", { on: v });
  };

  function injectRow() {
    var m = $("more");
    if (!m || !S.piece) return;
    var old = m.querySelector("#wRow"); if (old) old.remove();
    var row = el("div", "row"); row.id = "wRow";
    row.innerHTML = '<span class="lb">Wait</span><div class="chips"><button class="chip rc" id="wOn" type="button" aria-pressed="false">' + IC.mic + 'Wait</button>' +
      '<span class="wopts" id="wOpts"><span class="chips"><button class="chip" type="button" data-ws="auto" aria-pressed="false">Auto</button><button class="chip" type="button" data-ws="mic" aria-pressed="false">Mic</button><button class="chip" type="button" data-ws="midi" aria-pressed="false">MIDI</button>' +
      '<button class="chip" type="button" id="wOct" aria-pressed="false">Any octave</button><button class="chip" type="button" id="wBack" aria-pressed="false">Backing</button></span></span></div>';
    var tools = null;
    Array.prototype.forEach.call(m.querySelectorAll(".row"), function (r) { var lb = r.querySelector(".lb"); if (lb && lb.textContent === "Tools") tools = r; });
    if (tools) m.insertBefore(row, tools); else m.appendChild(row);
    row.querySelector("#wOn").onclick = function () { W.setOn(!W.on()); };
    Array.prototype.forEach.call(row.querySelectorAll("[data-ws]"), function (b) { b.onclick = function () { P().src = b.getAttribute("data-ws"); A.save(); syncRow(); }; });
    row.querySelector("#wOct").onclick = function () { P().octave = !octaveOn(); A.save(); syncRow(); };
    row.querySelector("#wBack").onclick = function () { P().backing = !P().backing; A.save(); syncRow(); };
    syncRow();
  }
  function syncRow() {
    var row = $("wRow"), p = P();
    if (!row || !p) return;
    row.querySelector("#wOn").setAttribute("aria-pressed", String(!!p.on));
    row.querySelector("#wOpts").hidden = !p.on;
    Array.prototype.forEach.call(row.querySelectorAll("[data-ws]"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-ws") === p.src)); });
    row.querySelector("#wOct").setAttribute("aria-pressed", String(octaveOn()));
    row.querySelector("#wBack").setAttribute("aria-pressed", String(!!p.backing));
  }

  /* ---- lifecycle ---- */
  PA.on("open", function () {
    var s = $("wSlot");
    if (!s) { s = el("div", "wslot"); s.id = "wSlot"; s.hidden = true; A.slot().appendChild(s); }
    st.hits = 0; st.done = 0; st.running = false;
    injectRow();
    if (P().on) { R.drivers.wait = makeDriver(); R.refreshDriver(); }
    updateSlot();
    if (R.updateBar) R.updateBar();
  });
  PA.on("main", function () { injectRow(); });
  PA.on("leave", function () {
    st.running = false; clearTimeout(st.timer); closeInput();
    R.drivers.wait = null;
    updateSlot();
  });
  PA.on("session", function (e) { if (st.driver && S.drv === st.driver && st.done > 0) e.entry.wait = { hit: st.hits, of: st.done }; });
  PA.on("speed", function (e) { if (st.running && !e.auto) st.seg = { speed: e.speed, auto: false, next: Infinity }; });

  A.KEYS.splice(A.KEYS.length - 1, 0, ["W", "Wait mode on / off"]);
  window.addEventListener("keydown", function (e) {
    if (S.route !== "player" || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, tag = (t && t.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || $("dlg").open || $("addSheet").open) return;
    if (e.key === "w" || e.key === "W") { e.preventDefault(); W.setOn(!W.on()); }
  });
  W.onNote = onNote;     // test hook
})();
