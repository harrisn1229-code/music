/* PAListen: "which note did the player just play?" for wait mode. Microphone pitch/onset detection and Web MIDI input.

   PAListen.mic({ onNote(midi, info), onLevel(rms), minMidi, maxMidi }) -> Promise<session>
        getUserMedia with echoCancellation / noiseSuppression / autoGainControl OFF. Call inside a tap (iOS).
        onNote fires once per note onset (an attack followed by a stable pitch, or a stable pitch change on a sustained note).
        Octave flips on a held note are ignored. midi = integer sounding pitch (E1 = 28 ... default range 28..96).
        info = { cents, clarity (0..1), at: performance.now() estimate of the ATTACK, detectedAt: performance.now() when emitted, latency: ms }
   PAListen.midi({ onNote(midi, info) }) -> Promise<session>   note-on from every input; info = { velocity, channel, at, input }
        rejects with Error("MIDI isn't available in this browser") where Web MIDI doesn't exist (iOS Safari)
   PAListen.hasMidi() -> bool
   session.stop()   (mic sessions also have session.sampleRate)
   PAListen.detector(sampleRate, opts) -> { feed(Float32Array, endTimeMs) }   the same engine on raw samples (used by tests) */
(function () {
  "use strict";

  var now = function () { return (window.performance && performance.now) ? performance.now() : Date.now(); };
  var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };

  /* YIN on a decimated copy of buf[0..len). Returns { midi (float), clarity } or null. */
  function yin(buf, len, sr, fmin, fmax) {
    var i, k, s, mean = 0, sum = 0;
    for (i = 0; i < len; i++) { mean += buf[i]; }
    mean /= len;
    for (i = 0; i < len; i++) { var q = buf[i] - mean; sum += q * q; }
    if (Math.sqrt(sum / len) < 0.003) return null;
    var D = Math.max(1, Math.round(sr / 12000)), m = Math.floor(len / D), x = new Float32Array(m);
    for (i = 0; i < m; i++) { s = 0; for (k = 0; k < D; k++) s += buf[i * D + k] - mean; x[i] = s / D; }
    var fs = sr / D;
    var minTau = Math.max(2, Math.floor(fs / fmax));
    var maxTau = Math.min(Math.ceil(fs / fmin), (m >> 1) - 1);
    var W = m - maxTau - 1;
    if (W < 24 || maxTau <= minTau + 2) return null;
    var d = new Float32Array(maxTau + 2), c = new Float32Array(maxTau + 2), tau, j, diff;
    for (tau = 1; tau <= maxTau; tau++) {
      s = 0;
      for (j = 0; j < W; j++) { diff = x[j] - x[j + tau]; s += diff * diff; }
      d[tau] = s;
    }
    var run = 0; c[0] = 1;
    for (tau = 1; tau <= maxTau; tau++) { run += d[tau]; c[tau] = run > 0 ? d[tau] * tau / run : 1; }
    var found = -1, cmin = 1;
    for (tau = minTau; tau < maxTau; tau++) if (c[tau] < cmin) cmin = c[tau];
    var thr = Math.min(0.3, Math.max(0.15, cmin + 0.08));     // a decaying note can dip lower at 2x the period: prefer the first dip near the best
    for (tau = minTau; tau < maxTau; tau++) {
      if (c[tau] < thr) { while (tau + 1 < maxTau && c[tau + 1] < c[tau]) tau++; found = tau; break; }
    }
    if (found < 0) return null;
    for (var dv = 4; dv >= 2; dv--) {         // a plucked string can show a clean dip only at a multiple of its period: look for the divisor
      var t0 = Math.round(found / dv), bt = -1, bv = 1;
      if (t0 < minTau || Math.abs(t0 * dv - found) > Math.max(2, found * 0.04)) continue;
      for (tau = Math.max(minTau, t0 - 2); tau <= Math.min(maxTau - 1, t0 + 2); tau++) if (c[tau] < bv) { bv = c[tau]; bt = tau; }
      if (bt > 0 && bv < 0.3 && bv < c[found] * 6 + 0.2) { found = bt; break; }
    }
    var a = c[found - 1], b = c[found], g = c[found + 1], den = a - 2 * b + g, shift = den ? (a - g) / (2 * den) : 0;
    if (!isFinite(shift) || Math.abs(shift) > 1) shift = 0;
    var f = fs / (found + shift);
    return { midi: 69 + 12 * Math.log(f / 440) / Math.LN2, clarity: Math.max(0, Math.min(1, 1 - b)) };
  }

  /* ---------- onset + pitch engine on a sample stream ---------- */
  function detector(sr, opt) {
    opt = opt || {};
    var minMidi = opt.minMidi != null ? opt.minMidi : 28, maxMidi = opt.maxMidi != null ? opt.maxMidi : 96;
    var fmin = hz(minMidi - 0.6), fmax = hz(maxMidi + 0.6);
    var BLK = 256, HOP = 512, RING = 8192, MAXWIN = 3072;
    var ring = new Float32Array(RING), total = 0;          // total samples seen; ring holds the last RING
    var env = [], blkSum = 0, blkN = 0, nextHop = HOP, pk = 0, rel = Math.exp(-1 / (0.04 * sr));
    var skip = Math.round(0.012 * sr), refractory = Math.round(0.09 * sr), lastAttack = -1e9;
    var state = "idle", segStart = 0, attackSample = 0;       // idle | track | held
    var cand = -1, cands = [], count = 0, curMidi = -1, chg = -1, chgN = 0, quiet = 0, trackStart = 0, endMs = 0;
    var NEED = 4, NEED_CHG = 5, floor = -1;

    function emit(midiF, clarity, startSample) {
      var mi = Math.round(midiF);
      var at = endMs - (total - startSample) / sr * 1000;
      if (opt.onNote) opt.onNote(mi, { cents: (midiF - mi) * 100, clarity: clarity, at: at, detectedAt: endMs, latency: endMs - at });
      return mi;
    }
    function est(from) {
      var len = Math.min(MAXWIN, total - from);
      if (len < Math.round(0.02 * sr)) return null;
      var buf = new Float32Array(len), i, st = total - len;
      for (i = 0; i < len; i++) buf[i] = ring[(st + i) % RING];
      return yin(buf, len, sr, fmin, fmax);
    }
    function mode(a) { var cnt = {}, best = a[0], bc = 0; a.forEach(function (v) { cnt[v] = (cnt[v] || 0) + 1; if (cnt[v] > bc) { bc = cnt[v]; best = v; } }); return best; }

    function onBlock(rms) {
      env.push(rms); if (env.length > 40) env.shift();
      if (opt.onLevel) opt.onLevel(rms);
      var n = env.length, e = env[n - 1];
      if (floor < 0 || rms < floor) floor = rms; else floor += (rms - floor) * 0.00003;     // noise floor: slow minimum tracker
      if (n < 4) return;
      var prev = env[n - 3], i, mn = 1e9, far = 0, fc = 0;
      var mx = 0;
      for (i = Math.max(0, n - 9); i < n - 1; i++) { if (env[i] < mn) mn = env[i]; if (env[i] > mx) mx = env[i]; }
      for (i = Math.max(0, n - 14); i < n - 6; i++) { far += env[i]; fc++; }
      far = fc ? far / fc : 0;
      var quick = total - lastAttack < 0.16 * sr, rr = quick ? 2.2 : 1.4;     // right after an attack a slow swell is not a new note
      var attack = e > 0.01 && e > 3 * floor + 0.004 && e > 1.3 * mx && ((e > rr * (prev + 0.002)) || (!quick && e > 2.5 * (mn + 0.002) && e > 2 * far));
      if (attack && total - lastAttack > refractory) {
        lastAttack = total;
        attackSample = total - BLK; segStart = Math.max(0, attackSample - (BLK >> 1));
        state = "track"; cand = -1; cands = []; count = 0; trackStart = total; quiet = 0;
      }
      if (e < 0.003) { if (++quiet > 8 && state !== "idle") { state = "idle"; curMidi = -1; } } else quiet = 0;
    }
    function onHop() {
      if (state === "idle") return;
      if (state === "track") {
        if (total - trackStart > 0.5 * sr) { state = "idle"; return; }
        if (env[env.length - 1] < 2.5 * floor + 0.004) return;
        var r = est(segStart + skip);
        if (!r || r.clarity < 0.7) { count = 0; cands = []; cand = -1; return; }
        var m = Math.round(r.midi);
        if (cand >= 0 && (m - cand) % 12 === 0) { count++; cands.push(m); }
        else { cand = m; count = 1; cands = [m]; }
        if (count >= NEED) {
          curMidi = emit(r.midi, r.clarity, attackSample);
          state = "held"; chg = -1; chgN = 0;
        }
        return;
      }
      if (env[env.length - 1] < 2.5 * floor + 0.004) return;       // only noise left
      // held: watch for a stable change of pitch (legato) that is not an octave flip
      var r2 = est(segStart + skip);
      if (!r2 || r2.clarity < 0.8) { chgN = 0; return; }
      var m2 = Math.round(r2.midi);
      if (m2 === curMidi || (m2 - curMidi) % 12 === 0) { chgN = 0; return; }
      if (m2 === chg) chgN++; else { chg = m2; chgN = 1; }
      if (chgN >= NEED_CHG) {
        var st = total - Math.round(NEED_CHG * HOP);
        curMidi = emit(r2.midi, r2.clarity, st);
        segStart = st; chgN = 0; chg = -1;
      }
    }
    return {
      feed: function (x, endTimeMs) {
        endMs = endTimeMs != null ? endTimeMs : now();
        var tailMs = endMs;
        for (var i = 0; i < x.length; i++) {
          var v = x[i];
          ring[total % RING] = v; total++;
          var av = v < 0 ? -v : v; pk = av > pk ? av : pk * rel;       // peak follower: steady even for a 41 Hz note
          blkSum += v * v; if (++blkN === BLK) {
            var rms = pk; blkSum = 0; blkN = 0;
            // time stamp of this block end relative to chunk end
            endMs = tailMs - (x.length - 1 - i) / sr * 1000;
            onBlock(rms);
            if (total >= nextHop) { nextHop = total + HOP; onHop(); }
          }
        }
        endMs = tailMs;
      }
    };
  }

  /* ---------- microphone ---------- */
  function mic(o) {
    o = o || {};
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.reject(new Error("Microphone isn't available here"));
    var ctx = new AC();
    if (ctx.resume) ctx.resume();                    // inside the tap, before the permission prompt
    return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }).then(function (stream) {
      if (ctx.resume) ctx.resume();
      var src = ctx.createMediaStreamSource(stream), proc = ctx.createScriptProcessor(1024, 1, 1), mute = ctx.createGain(), stopped = false;
      mute.gain.value = 0;
      var det = detector(ctx.sampleRate, { minMidi: o.minMidi, maxMidi: o.maxMidi, onNote: o.onNote, onLevel: o.onLevel });
      var lat = (ctx.baseLatency || 0) * 1000;
      proc.onaudioprocess = function (e) {
        if (stopped) return;
        var d = e.inputBuffer.getChannelData(0);
        det.feed(d, now() - lat);
      };
      src.connect(proc); proc.connect(mute); mute.connect(ctx.destination);
      return {
        sampleRate: ctx.sampleRate,
        stop: function () {
          if (stopped) return; stopped = true;
          try { proc.onaudioprocess = null; proc.disconnect(); src.disconnect(); } catch (x) {}
          stream.getTracks().forEach(function (t) { t.stop(); });
          try { ctx.close(); } catch (x) {}
        }
      };
    }, function (e) { try { ctx.close(); } catch (x) {} throw e; });
  }

  /* ---------- Web MIDI ---------- */
  function hasMidi() { return !!(navigator && navigator.requestMIDIAccess); }
  function midi(o) {
    o = o || {};
    if (!hasMidi()) return Promise.reject(new Error("MIDI isn't available in this browser"));
    return navigator.requestMIDIAccess().then(function (acc) {
      var stopped = false;
      function handler(e) {
        if (stopped || !e.data || e.data.length < 3) return;
        var st = e.data[0];
        if ((st & 0xF0) === 0x90 && e.data[2] > 0) {
          if (o.onNote) o.onNote(e.data[1], { velocity: e.data[2], channel: st & 15, at: e.timeStamp || now(), input: e.target && e.target.name });
        }
      }
      function attach() { acc.inputs.forEach(function (inp) { inp.onmidimessage = handler; }); }
      attach();
      acc.onstatechange = attach;
      return {
        stop: function () {
          stopped = true; acc.onstatechange = null;
          acc.inputs.forEach(function (inp) { if (inp.onmidimessage === handler) inp.onmidimessage = null; });
        }
      };
    });
  }

  window.PAListen = { mic: mic, midi: midi, hasMidi: hasMidi, detector: detector };
})();
