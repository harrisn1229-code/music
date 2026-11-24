/* PASamples - real instrument sounds for Play Along (window.PASamples). No dependencies.
 *
 * Packs: samples/bass.bin, guitar.bin, acoustic.bin, piano.bin (FluidR3_GM, see README credit). Drums are synthesized in code
 * (the FluidR3 repo has no percussion kit) so "drums" needs no download.
 *
 *   PASamples.names                     ["bass","guitar","acoustic","piano","drums"]
 *   PASamples.load(ctx, name)           Promise (resolves true); fetches + decodes the pack for this AudioContext. Cached, concurrent calls share one promise.
 *   PASamples.ready(name)               true once load() resolved for ANY context
 *   PASamples.play(ctx, dest, name, midi, when, dur, vel) -> { stop(when) } | null
 *        Schedules one note at ctx time `when`, `dur` seconds long, velocity 0..1 (default 0.8), into AudioNode `dest`.
 *        Sounding MIDI pitch (bass E1 = 28). Drums: `midi` = GM percussion note, dur ignored. Returns null if not loaded for ctx.
 *        Release after note end: bass 60 ms, guitar 150, acoustic 250, piano 300.
 *   PASamples.forProgram(gmProgram, isDrum) -> name   (-1 or isDrum -> "drums"; 0-7 piano; 24-25 acoustic; 26-31 guitar; 32-39 bass; else piano)
 *   PASamples.bytes(name) -> number     pack size in bytes (0 for drums)
 *   PASamples.files                     pack file names relative to this script (for the service worker list)
 *
 * Pack format: "PAS1" | u32le headerLen | JSON {v, sr, notes:[{m: midi, o: offset, l: length}]} | concatenated MP3 blobs (mono 32 kHz).
 * Samples sit every 3 semitones; other notes use playbackRate (never more than 1 semitone inside the pack's range).
 */
(function () {
  "use strict";
  var NAMES = ["bass", "guitar", "acoustic", "piano", "drums"];
  var SIZES = { bass: 251564, guitar: 365442, acoustic: 365442, piano: 667560, drums: 0 };
  var RELEASE = { bass: 0.06, guitar: 0.15, acoustic: 0.25, piano: 0.3 };
  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (!s) {
      var all = document.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) if (/samples\.js(\?|$)/.test(all[i].src || "")) { s = all[i].src; break; }
    }
    return s ? s.replace(/[^\/]*$/, "") : "";
  })();

  var raw = {};        // name -> Promise<ArrayBuffer>
  var perCtx = [];     // [{ctx, packs:{name: {notes:[{m,buf}]}}, loading:{name: Promise}}]
  var anyReady = {};

  function state(ctx) {
    for (var i = 0; i < perCtx.length; i++) if (perCtx[i].ctx === ctx) return perCtx[i];
    var st = { ctx: ctx, packs: {}, loading: {} };
    perCtx.push(st);
    return st;
  }

  function fetchPack(name) {
    if (raw[name]) return raw[name];
    raw[name] = fetch(BASE + "samples/" + name + ".bin").then(function (r) {
      if (!r.ok) throw new Error("samples " + name + " " + r.status);
      return r.arrayBuffer();
    }).then(function (ab) { SIZES[name] = ab.byteLength; return ab; });
    raw[name].catch(function () { delete raw[name]; });
    return raw[name];
  }

  function decode(ctx, ab) {
    return new Promise(function (res, rej) {
      var p;
      try { p = ctx.decodeAudioData(ab, res, rej); } catch (e) { rej(e); return; }
      if (p && p.then) p.then(res, rej);   // modern browsers return a promise; old iOS only uses the callbacks
    });
  }

  function utf8(bytes) {
    if (window.TextDecoder) return new TextDecoder("utf-8").decode(bytes);
    var s = "";
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return s;
  }

  function parse(ab) {
    var dv = new DataView(ab);
    if (dv.getUint32(0, false) !== 0x50415331) throw new Error("bad sample pack");
    var hl = dv.getUint32(4, true);
    var hdr = JSON.parse(utf8(new Uint8Array(ab, 8, hl)));
    return { hdr: hdr, start: 8 + hl };
  }

  // ---------------------------------------------------------------- drums (synthesized)
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 2147483648 - 1; }; }
  function hp(x, sr, fc, passes) {   // one-pole high-pass, repeated
    var a = Math.exp(-2 * Math.PI * fc / sr);
    for (var p = 0; p < (passes || 1); p++) {
      var py = 0, px = 0;
      for (var i = 0; i < x.length; i++) { var y = a * (py + x[i] - px); px = x[i]; py = y; x[i] = y; }
    }
    return x;
  }
  function lp(x, sr, fc) {
    var a = 1 - Math.exp(-2 * Math.PI * fc / sr), y = 0;
    for (var i = 0; i < x.length; i++) { y += a * (x[i] - y); x[i] = y; }
    return x;
  }
  function norm(x, peak) {
    var m = 1e-9, i;
    for (i = 0; i < x.length; i++) if (Math.abs(x[i]) > m) m = Math.abs(x[i]);
    var g = peak / m;
    for (i = 0; i < x.length; i++) x[i] *= g;
    return x;
  }
  function noise(n, seed) { var r = rng(seed), x = new Float32Array(n); for (var i = 0; i < n; i++) x[i] = r(); return x; }
  function tone(n, sr, f0, f1, tau) {   // sine sweeping f0 -> f1 (exp, time constant 0.03 s), exp decay tau
    var x = new Float32Array(n), ph = 0;
    for (var i = 0; i < n; i++) {
      var t = i / sr, f = f1 + (f0 - f1) * Math.exp(-t / 0.03);
      ph += 2 * Math.PI * f / sr;
      x[i] = Math.sin(ph) * Math.exp(-t / tau);
    }
    return x;
  }
  var METAL = [205.3, 304.4, 369.6, 522.7, 540.0, 800.0];   // 808-style inharmonic square set, scaled up
  function metal(n, sr, scale, tau, seed) {
    var x = new Float32Array(n), i, k;
    for (k = 0; k < METAL.length; k++) {
      var f = METAL[k] * scale, ph = (seed + k * 0.37) % 1;
      for (i = 0; i < n; i++) { ph += f / sr; if (ph >= 1) ph -= 1; x[i] += ph < 0.5 ? 1 : -1; }
    }
    for (i = 0; i < n; i++) x[i] *= Math.exp(-i / sr / tau);
    return x;
  }
  function mix(n, parts) {
    var x = new Float32Array(n);
    for (var k = 0; k < parts.length; k++) { var p = parts[k][0], g = parts[k][1]; for (var i = 0; i < n && i < p.length; i++) x[i] += p[i] * g; }
    return x;
  }
  function env(x, sr, tau, atk) {
    for (var i = 0; i < x.length; i++) { var t = i / sr; x[i] *= Math.exp(-t / tau) * (atk ? Math.min(1, t / atk) : 1); }
    return x;
  }
  function fadeEnd(x, sr, sec) { var n = Math.min(x.length, Math.round(sr * sec)); for (var i = 0; i < n; i++) x[x.length - 1 - i] *= i / n; return x; }

  var DRUM_ALIAS = { 35: 36, 40: 38, 41: 41, 43: 43, 48: 48, 52: 49, 55: 49, 57: 49, 59: 51, 53: 53, 39: 39, 54: 54, 56: 56 };
  function makeDrum(sr, note) {
    var n, x, i;
    note = DRUM_ALIAS[note] || note;
    switch (note) {
      case 36: n = Math.round(sr * 0.5);
        x = mix(n, [[tone(n, sr, 190, 46, 0.14), 1], [lp(noise(Math.round(sr * 0.006), 3), sr, 4000), 0.5]]);
        for (i = 0; i < Math.min(n, 120); i++) x[i] += (i < 60 ? 0.35 : 0) * Math.sin(i * 0.5);
        return norm(fadeEnd(x, sr, 0.02), 0.95);
      case 37: n = Math.round(sr * 0.12);
        x = mix(n, [[env(tone(n, sr, 1800, 1500, 1), sr, 0.012), 0.8], [env(tone(n, sr, 420, 380, 1), sr, 0.03), 0.6], [env(hp(noise(n, 5), sr, 1500), sr, 0.015), 0.5]]);
        return norm(fadeEnd(x, sr, 0.01), 0.8);
      case 38: n = Math.round(sr * 0.4);
        x = mix(n, [[env(hp(noise(n, 7), sr, 1500), sr, 0.09), 0.8], [env(hp(noise(n, 8), sr, 5000), sr, 0.2), 0.25],
          [env(tone(n, sr, 230, 185, 1), sr, 0.06), 0.7], [env(tone(n, sr, 340, 330, 1), sr, 0.04), 0.35]]);
        return norm(fadeEnd(x, sr, 0.02), 0.95);
      case 39: n = Math.round(sr * 0.3);
        var c = noise(n, 11); hp(c, sr, 900); lp(c, sr, 4500);
        for (i = 0; i < n; i++) { var t = i / sr; c[i] *= (t < 0.01 ? 1 : t < 0.02 ? 0.3 : t < 0.03 ? 0.8 : t < 0.04 ? 0.3 : 0.7 * Math.exp(-(t - 0.04) / 0.07)); }
        return norm(fadeEnd(c, sr, 0.02), 0.85);
      case 41: case 43: case 45: case 47: case 48: case 50:
        var F = { 41: 82, 43: 98, 45: 118, 47: 140, 48: 165, 50: 200 }[note];
        n = Math.round(sr * 0.6);
        x = mix(n, [[env(tone(n, sr, F * 1.7, F, 1), sr, 0.18), 1], [env(tone(n, sr, F * 2.6, F * 2.4, 1), sr, 0.06), 0.25],
          [env(lp(noise(n, 13), sr, 3500), sr, 0.006), 0.4]]);
        return norm(fadeEnd(x, sr, 0.03), 0.9);
      case 42: n = Math.round(sr * 0.12);
        x = mix(n, [[hp(metal(n, sr, 36, 0.02, 0.1), sr, 6500, 2), 1], [hp(noise(n, 17), sr, 7000, 2), 1.2]]);
        env(x, sr, 0.022); return norm(fadeEnd(x, sr, 0.01), 0.7);
      case 44: n = Math.round(sr * 0.16);
        x = mix(n, [[hp(metal(n, sr, 34, 0.03, 0.2), sr, 6000, 2), 1], [hp(noise(n, 19), sr, 6500, 2), 1.2]]);
        env(x, sr, 0.035, 0.002); return norm(fadeEnd(x, sr, 0.015), 0.6);
      case 46: n = Math.round(sr * 0.9);
        x = mix(n, [[hp(metal(n, sr, 36, 0.3, 0.3), sr, 6000, 2), 1], [hp(noise(n, 23), sr, 6500, 2), 1.2]]);
        env(x, sr, 0.25, 0.001); return norm(fadeEnd(x, sr, 0.05), 0.7);
      case 49: n = Math.round(sr * 2.0);
        x = mix(n, [[hp(metal(n, sr, 28, 0.9, 0.4), sr, 3500, 2), 1], [hp(noise(n, 29), sr, 3500, 2), 1.5]]);
        env(x, sr, 0.7, 0.001); return norm(fadeEnd(x, sr, 0.1), 0.75);
      case 51: n = Math.round(sr * 1.4);
        x = mix(n, [[hp(metal(n, sr, 24, 0.5, 0.5), sr, 4000, 2), 1], [hp(noise(n, 31), sr, 6000, 2), 0.5],
          [env(tone(n, sr, 4200, 4200, 1), sr, 0.15), 0.35]]);
        env(x, sr, 0.5, 0.001); return norm(fadeEnd(x, sr, 0.08), 0.65);
      case 53: n = Math.round(sr * 1.0);
        x = mix(n, [[env(tone(n, sr, 3100, 3100, 1), sr, 0.3), 1], [env(tone(n, sr, 4700, 4700, 1), sr, 0.2), 0.5], [hp(metal(n, sr, 22, 0.3, 0.6), sr, 4000, 2), 0.6]]);
        return norm(fadeEnd(x, sr, 0.05), 0.65);
      case 54: n = Math.round(sr * 0.25);
        x = env(hp(noise(n, 37), sr, 6000, 2), sr, 0.05, 0.004); return norm(fadeEnd(x, sr, 0.02), 0.6);
      case 56: n = Math.round(sr * 0.5);
        x = mix(n, [[env(tone(n, sr, 560, 560, 1), sr, 0.12), 1], [env(tone(n, sr, 845, 845, 1), sr, 0.1), 1]]);
        for (i = 0; i < n; i++) x[i] = Math.max(-0.6, Math.min(0.6, x[i] * 1.5));
        return norm(fadeEnd(x, sr, 0.03), 0.7);
    }
    return null;
  }
  var DRUM_NOTES = [36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 53, 54, 56];
  function drumKey(note) {
    note = DRUM_ALIAS[note] || note;
    if (DRUM_NOTES.indexOf(note) >= 0) return note;
    // unknown percussion: nearest by family (low = tom, high = hat)
    if (note < 36) return 36;
    if (note > 56) return 51;
    var best = 38, bd = 99;
    for (var i = 0; i < DRUM_NOTES.length; i++) { var d = Math.abs(DRUM_NOTES[i] - note); if (d < bd) { bd = d; best = DRUM_NOTES[i]; } }
    return best;
  }
  function buildDrums(ctx) {
    var sr = ctx.sampleRate, out = {}, i;
    for (i = 0; i < DRUM_NOTES.length; i++) {
      var d = makeDrum(sr, DRUM_NOTES[i]);
      var b = ctx.createBuffer(1, d.length, sr);
      if (b.copyToChannel) b.copyToChannel(d, 0); else b.getChannelData(0).set(d);
      out[DRUM_NOTES[i]] = b;
    }
    return out;
  }

  // ---------------------------------------------------------------- API
  function load(ctx, name) {
    if (NAMES.indexOf(name) < 0) return Promise.reject(new Error("unknown pack " + name));
    var st = state(ctx);
    if (st.packs[name]) return Promise.resolve(true);
    if (st.loading[name]) return st.loading[name];
    var p;
    if (name === "drums") {
      p = new Promise(function (res) { st.packs.drums = { bufs: buildDrums(ctx) }; res(true); });
    } else {
      p = fetchPack(name).then(function (ab) {
        var info = parse(ab), jobs = [];
        info.hdr.notes.forEach(function (n) {
          var slice = ab.slice(info.start + n.o, info.start + n.o + n.l);   // copy: decodeAudioData detaches its input
          jobs.push(decode(ctx, slice).then(function (buf) { return { m: n.m, buf: buf }; }));
        });
        return Promise.all(jobs);
      }).then(function (notes) {
        notes.sort(function (a, b) { return a.m - b.m; });
        st.packs[name] = { notes: notes };
        return true;
      });
    }
    st.loading[name] = p.then(function (v) { anyReady[name] = true; return v; }, function (e) { delete st.loading[name]; throw e; });
    return st.loading[name];
  }

  function ready(name) { return !!anyReady[name]; }

  function vgain(vel) { vel = vel == null ? 0.8 : Math.max(0, Math.min(1, vel)); return 0.1 + 0.9 * vel; }

  function mkVoice(ctx, dest, buf, rate, when, level, endAt, rel) {
    var src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = buf; src.playbackRate.value = rate;
    g.gain.setValueAtTime(level, when);
    src.connect(g); g.connect(dest);
    var natural = when + buf.duration / rate;
    var stopAt = natural;
    if (endAt != null && endAt < natural) {
      g.gain.setValueAtTime(level, endAt);
      g.gain.linearRampToValueAtTime(0, endAt + rel);
      stopAt = endAt + rel;
    }
    src.start(when); src.stop(stopAt + 0.02);
    var cut = false;
    return {
      stop: function (w) {
        if (cut) return; cut = true;
        w = Math.max(w == null ? ctx.currentTime : w, when);
        if (w >= stopAt) return;
        var r = Math.min(rel, 0.06 + 0.4 * rel);
        try {
          g.gain.cancelScheduledValues(w);
          g.gain.setValueAtTime(level, w);
          g.gain.linearRampToValueAtTime(0, w + r);
          src.stop(w + r + 0.02);
        } catch (e) {}
      }
    };
  }

  var openHat = [];   // [{ctx, dest, voice}]
  function play(ctx, dest, name, midi, when, dur, vel) {
    var st = state(ctx), pack = st.packs[name];
    if (!pack) return null;
    if (when == null || when < ctx.currentTime) when = ctx.currentTime;
    var level = vgain(vel), v, i;
    if (name === "drums") {
      var key = drumKey(midi);
      var gain = key === 36 || key === 38 ? 1 : 0.8;
      v = mkVoice(ctx, dest, pack.bufs[key], 1, when, level * gain, null, 0.02);
      if (key === 46) { for (i = openHat.length - 1; i >= 0; i--) if (openHat[i].ctx === ctx && openHat[i].dest === dest) openHat.splice(i, 1); openHat.push({ ctx: ctx, dest: dest, voice: v }); }
      if (key === 42 || key === 44) {
        for (i = openHat.length - 1; i >= 0; i--) if (openHat[i].ctx === ctx && openHat[i].dest === dest) { openHat[i].voice.stop(when); openHat.splice(i, 1); }
      }
      return v;
    }
    var notes = pack.notes, best = notes[0], bd = 1e9;
    for (i = 0; i < notes.length; i++) { var d = Math.abs(notes[i].m - midi); if (d < bd) { bd = d; best = notes[i]; } }
    var rate = Math.pow(2, (midi - best.m) / 12);
    var rel = RELEASE[name] || 0.15;
    var endAt = when + Math.max(0.03, dur == null ? 1 : dur);
    // loud notes held less than a natural decay still sound; the damp only matters when the note ends before the sample does
    return mkVoice(ctx, dest, best.buf, rate, when, level, endAt, rel);
  }

  function forProgram(p, isDrum) {
    if (isDrum || p == null || p < 0) return "drums";
    if (p <= 7) return "piano";
    if (p === 24 || p === 25) return "acoustic";
    if (p >= 26 && p <= 31) return "guitar";
    if (p >= 32 && p <= 39) return "bass";
    return "piano";
  }

  function bytes(name) { return SIZES[name] || 0; }

  window.PASamples = {
    names: NAMES.slice(),
    files: ["samples.js", "samples/bass.bin", "samples/guitar.bin", "samples/acoustic.bin", "samples/piano.bin"],
    load: load, ready: ready, play: play, forProgram: forProgram, bytes: bytes
  };
})();
