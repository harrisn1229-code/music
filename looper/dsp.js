/* Looper DSP: plain functions on Float32Arrays, no audio context needed (so they can be tested
   anywhere). Finding where notes start, trimming a take to a loop, guessing bars and tempo from a
   length, rendering a layer from its take, and writing WAV files. */
(function (root) {
  "use strict";

  /* ---------- note starts (onsets) ----------
     The take is pre-emphasised (a first-difference high-pass, so pick and strum attacks stand out
     over ringing chords), then its loudness is followed in ~2.5 ms steps. A note starts where the
     loudness jumps well above what it was 10–40 ms before. Each start is then moved back to the
     first sample of the attack, so a loop cut there keeps the whole transient. */
  function envelope(x, hop, win) {
    var n = x.length, K = Math.ceil(n / hop), cs = new Float64Array(n + 1), prev = 0, i;
    for (i = 0; i < n; i++) { var y = x[i] - 0.97 * prev; prev = x[i]; cs[i + 1] = cs[i] + y * y; }
    var env = new Float32Array(K), h = win >> 1;
    for (var k = 0; k < K; k++) {
      var a = Math.max(0, k * hop - h), b = Math.min(n, k * hop + h);
      env[k] = b > a ? Math.sqrt((cs[b] - cs[a]) / (b - a)) : 0;
    }
    return env;
  }

  function onsets(x, sr, o) {
    o = o || {};
    var hop = Math.max(32, Math.round(sr * 0.0025)), win = hop * 4;
    var env = envelope(x, hop, win), K = env.length;
    if (K < 8) return [];
    var sorted = Array.prototype.slice.call(env).sort(function (a, b) { return a - b; });
    var floor = sorted[Math.floor(K * 0.1)], max = sorted[K - 1];
    if (!(max > 1e-5)) return [];
    var gate = Math.max(floor * 3, max * (o.gate || 0.05), 2e-5);
    var db = new Float32Array(K), k, j;
    for (k = 0; k < K; k++) db[k] = 20 * Math.log10(env[k] + 1e-6);
    var floorDb = 20 * Math.log10(floor + 1e-6), rise = new Float32Array(K);
    for (k = 0; k < K; k++) {
      var s = 0, c = 0;
      for (j = 4; j <= 16; j++) if (k - j >= 0) { s += db[k - j]; c++; }
      rise[k] = db[k] - (c ? s / c : floorDb);
    }
    var minRise = o.rise || 7, sep = Math.round(0.06 * sr / hop), out = [];
    for (k = 1; k < K - 1; k++) {
      if (rise[k] < minRise) continue;
      var lm = true;
      for (j = Math.max(0, k - 3); j <= Math.min(K - 1, k + 3); j++) if (rise[j] > rise[k] || (rise[j] === rise[k] && j < k)) { lm = false; break; }
      if (!lm) continue;
      var pk = 0;
      for (j = k; j <= Math.min(K - 1, k + 12); j++) if (env[j] > pk) pk = env[j];
      if (pk < gate) continue;
      // back to the valley before the attack, then forward to where it starts to climb
      var v = k;
      for (j = k; j >= Math.max(0, k - 14); j--) if (env[j] < env[v]) v = j;
      var thr = env[v] + 0.12 * (pk - env[v]), a = v;
      for (j = v; j <= k + 6 && j < K; j++) if (env[j] >= thr) { a = j; break; }
      // to the sample: first pre-emphasised sample that reaches a third of the attack's height
      var i0 = Math.max(1, a * hop - 2 * hop), i1 = Math.min(x.length, a * hop + 4 * hop), ym = 0, yy;
      for (j = i0; j < i1; j++) { yy = Math.abs(x[j] - 0.97 * x[j - 1]); if (yy > ym) ym = yy; }
      var at = a * hop;
      for (j = i0; j < i1; j++) if (Math.abs(x[j] - 0.97 * x[j - 1]) >= ym * 0.3) { at = j; break; }
      var on = { i: at, str: pk / max, rise: rise[k] };
      var last = out[out.length - 1];
      if (last && Math.abs(last.i - on.i) < sep * hop) { if (on.str * on.rise > last.str * last.rise) out[out.length - 1] = on; }
      else out.push(on);
    }
    return out;
  }

  /* ---------- a first loop from a free take ----------
     sHint and eHint are where record and stop were tapped (sample indexes into raw). The loop
     starts on the first clear note after record (a little before the tap is fine too), and ends on
     the note nearest the stop tap: usually the downbeat played again to close the loop. With no
     note there, the end is put where the beat of what was played says the bar line falls. */
  function autoTrim(raw, sr, sHint, eHint, beats) {
    var os = onsets(raw, sr), margin = Math.round(0.003 * sr);
    var s = sHint, sFound = false, e = eHint, eFound = false, i, o;
    for (i = 0; i < os.length; i++) {
      o = os[i];
      if (o.i < sHint - 0.4 * sr) continue;
      if (o.i > Math.min(sHint + 4 * sr, eHint - 0.4 * sr)) break;
      if (o.str >= 0.12) { s = o.i - margin; sFound = true; break; }
    }
    var best = -1;
    for (i = 0; i < os.length; i++) {
      o = os[i];
      if (o.i < s + margin + 0.25 * sr) continue;
      var d = o.i - eHint;
      if (d < -0.4 * sr || d > 0.33 * sr || o.str < 0.06) continue;
      var sc = o.str * (1 - Math.abs(d) / (0.6 * sr));
      if (sc > best) { best = sc; e = o.i - margin; eFound = true; }
    }
    s = Math.max(0, s); e = Math.min(raw.length, e);
    if (e - s < 0.2 * sr) { s = Math.max(0, sHint); e = Math.min(raw.length, eHint); sFound = eFound = false; }
    if (eFound) e = matchEnd(raw, sr, s, e);
    var t = tempoFit(os, s + margin, e - s, sr, beats || 4, eFound);
    if (!eFound && t && t.frac >= 0.6) {
      var e2 = Math.round(s + t.beatsN * t.bp * sr);
      if (e2 > s + 0.2 * sr && e2 <= raw.length) e = e2;
    }
    var bars = t ? t.bars : guessBars((e - s) / sr, beats || 4).bars;
    return { s: s, e: e, sFound: sFound, eFound: eFound, bars: bars, bpm: bars * (beats || 4) * 60 / ((e - s) / sr), fit: t ? t.frac : 0 };
  }

  /* The note that closes a loop is usually the one that opened it, played again, but it starts
     over the ringing of what came before, so its first attack can hide. Lining its shape up with
     the opening note's (attack envelopes, ±25 ms) puts the end exactly one loop after the start. */
  function attackShape(x, a, n, sm) {
    var out = new Float32Array(n), prev = a > 0 && a - 1 < x.length ? x[a - 1] : 0, acc = 0, k = 1 / sm;
    for (var i = 0; i < n; i++) {
      var j = a + i, v = j >= 0 && j < x.length ? x[j] : 0, y = v - 0.97 * prev;
      prev = v; acc += ((y < 0 ? -y : y) - acc) * k; out[i] = acc;
    }
    return out;
  }
  function matchEnd(x, sr, s, e) {
    var pre = Math.round(0.005 * sr), win = Math.round(0.09 * sr), R = Math.round(0.025 * sr), sm = Math.max(1, Math.round(0.001 * sr));
    if (s - pre < 0 || e + win + R > x.length) return e;
    var A = attackShape(x, s - pre, win, sm), B = attackShape(x, e - pre - R, win + 2 * R, sm), i, ma = 0;
    for (i = 0; i < win; i++) ma += A[i];
    ma /= win;
    var va = 0; for (i = 0; i < win; i++) { A[i] -= ma; va += A[i] * A[i]; }
    if (!(va > 0)) return e;
    var c1 = new Float64Array(B.length + 1), c2 = new Float64Array(B.length + 1);
    for (i = 0; i < B.length; i++) { c1[i + 1] = c1[i] + B[i]; c2[i + 1] = c2[i] + B[i] * B[i]; }
    function corr(o) {
      var dot = 0;
      for (var q = 0; q < win; q += 2) dot += A[q] * B[o + q];
      var sb = c1[o + win] - c1[o], vb = c2[o + win] - c2[o] - sb * sb / win;
      return vb > 0 ? 2 * dot / Math.sqrt(va * vb) : -1;
    }
    var best = -2, bo = R;
    for (var o = 0; o <= 2 * R; o += 4) { var c = corr(o); if (c > best) { best = c; bo = o; } }
    for (var o2 = Math.max(0, bo - 4); o2 <= Math.min(2 * R, bo + 4); o2++) { var c3 = corr(o2); if (c3 > best) { best = c3; bo = o2; } }
    return best > 0.6 ? e + (bo - R) : e;
  }

  /* How many bars a loop of L samples (from s) holds, judged from where its notes fall: the
     coarsest beat (55-190 bpm) the notes sit on, preferring 1, 2, 4, 8 or 16 bars and tempos near
     100. Also the beat length that fits the notes best (bp, seconds). Null with too few notes. */
  function tempoFit(os, s, L, sr, beats, exact) {
    var ins = [], w = 0, i;
    for (i = 0; i < os.length; i++) {
      var o = os[i];
      if (o.i > s + 0.03 * sr && o.i < s + L + 0.4 * sr) { ins.push({ t: (o.i - s) / sr, str: o.str }); if (o.i < s + L - 0.05 * sr) w += o.str; }
    }
    if (ins.length < 3 || !(w > 0)) return null;
    var sec = L / sr, best = null;
    function fitOf(bp, upto) {
      var fit = 0;
      for (var j = 0; j < ins.length; j++) {
        if (ins[j].t > upto) break;
        var r = ins[j].t / bp, d = Math.abs(r - Math.round(r));
        if (d < 0.08) fit += ins[j].str * (1 - d / 0.08);
      }
      return fit;
    }
    for (var bars = 1; bars <= 16; bars++) {
      var c = bars * beats, bp0 = sec / c;
      // the stop tap can be a little off, so the beat is looked for within 6% of what it implies
      var lo = exact ? 1 : 0.94, hi = exact ? 1 : 1.06, top = null;
      for (var f = lo; f <= hi + 1e-9; f += 0.002) {
        var bp = bp0 * f, bpm = 60 / bp;
        if (bpm < 55 || bpm > 190) continue;
        var ft = fitOf(bp, c * bp - 0.05);
        if (!top || ft > top.fit + 1e-9 || (Math.abs(ft - top.fit) < 1e-9 && Math.abs(f - 1) < Math.abs(top.f - 1))) top = { fit: ft, bp: bp, f: f };
      }
      if (!top) continue;
      var frac = top.fit / w, p2 = (bars & (bars - 1)) === 0;
      var sc = frac - (p2 ? 0 : 0.1) - 0.15 * Math.abs(Math.log2(60 / top.bp / 100));
      if (!best || sc > best.sc) best = { sc: sc, bars: bars, beatsN: c, bp: top.bp, frac: frac };
    }
    if (!best) return null;
    if (!exact) {
      var num = 0, den = 0;                        // least-squares beat length from the notes on the grid
      for (i = 0; i < ins.length; i++) {
        var k = Math.round(ins[i].t / best.bp), dd = Math.abs(ins[i].t / best.bp - k);
        if (k > 0 && k <= best.beatsN && dd < 0.08) { num += k * ins[i].t; den += k * k; }
      }
      if (den > 0) best.bp = num / den;
    }
    return best;
  }

  /* bars and tempo for a loop of `sec` seconds when there are no notes to go by: the count of
     bars that puts the tempo nearest 100 bpm, preferring 1, 2, 4, 8 or 16 bars */
  function guessBars(sec, beats) {
    var c = [1, 2, 4, 8, 16, 3, 6, 12], best = null;
    for (var i = 0; i < c.length; i++) {
      var bpm = c[i] * beats * 60 / sec;
      if (bpm < 40 || bpm > 240) continue;
      var p2 = (c[i] & (c[i] - 1)) === 0;
      var sc = Math.abs(Math.log2(bpm / 100)) + (p2 ? 0 : 0.6);
      if (!best || sc < best.sc) best = { bars: c[i], bpm: bpm, sc: sc };
    }
    if (!best) { var b = Math.max(1, Math.round(sec * 100 / 60 / beats)); best = { bars: b, bpm: b * beats * 60 / sec }; }
    return { bars: best.bars, bpm: best.bpm };
  }

  /* ---------- rendering a layer ----------
     A layer is one stretch of its take, `len` samples long from raw[s + nudge], laid into the loop
     so that its first sample sits at phase R. Where the end wraps round to the start the two are
     crossfaded over `fade` samples, using the audio recorded just after the end, so the seam is
     as smooth as the playing itself. */
  function renderLayer(raw, s, len, R, nudge, fade) {
    var out = new Float32Array(len), base = s + (nudge || 0), n = raw.length, i, j, k;
    R = ((R % len) + len) % len;
    for (i = 0; i < len; i++) {
      j = base + i; k = i + R; if (k >= len) k -= len;
      out[k] = j >= 0 && j < n ? raw[j] : 0;
    }
    var F = Math.max(0, Math.min(fade | 0, len >> 2));
    if (!F) return out;
    var tail = base + len + F <= n;
    for (i = 0; i < F; i++) {
      var w = (i + 0.5) / F, gi = Math.sin(w * Math.PI / 2), go = Math.cos(w * Math.PI / 2);
      j = base + i; var a = j >= 0 && j < n ? raw[j] : 0;
      var b = tail ? raw[base + len + i] : 0;
      k = R + i; if (k >= len) k -= len;
      out[k] = a * gi + b * go;
    }
    if (!tail) for (i = 0; i < F; i++) { k = R - 1 - i; if (k < 0) k += len; out[k] *= (i + 0.5) / F; }
    return out;
  }

  /* loudest sample in each of `bins` slices, scaled so the loudest is 1 */
  function peaks(x, bins) {
    var out = new Array(bins), max = 0, per = x.length / bins;
    for (var b = 0; b < bins; b++) {
      var a = Math.floor(b * per), e = Math.min(x.length, Math.floor((b + 1) * per)), pk = 0, step = Math.max(1, Math.floor((e - a) / 512));
      for (var i = a; i < e; i += step) { var v = x[i] < 0 ? -x[i] : x[i]; if (v > pk) pk = v; }
      out[b] = pk; if (pk > max) max = pk;
    }
    for (var c = 0; c < bins; c++) out[c] = max > 0 ? Math.round(out[c] / max * 1000) / 1000 : 0;
    return { p: out, max: max };
  }

  /* min and max of every `block` samples, for drawing a waveform at any zoom */
  function minmax(x, block) {
    var n = Math.ceil(x.length / block), mm = new Float32Array(n * 2);
    for (var b = 0; b < n; b++) {
      var lo = 0, hi = 0, a = b * block, e = Math.min(x.length, a + block);
      for (var i = a; i < e; i++) { var v = x[i]; if (v < lo) lo = v; else if (v > hi) hi = v; }
      mm[b * 2] = lo; mm[b * 2 + 1] = hi;
    }
    return mm;
  }

  /* ---------- latency test ----------
     x is the input during a run of loud clicks; at[k] is the sample each click was sent to the
     speaker. Returns the delay of each click heard back, in samples (null if it wasn't heard). */
  function clickDelays(x, at, maxD) {
    var out = [];
    for (var k = 0; k < at.length; k++) {
      var a = Math.max(0, at[k]), b = Math.min(x.length, at[k] + maxD), pre0 = Math.max(0, at[k] - Math.round(maxD / 4)), i;
      var noise = 0, cnt = 0;
      for (i = pre0; i < a; i++) { noise += x[i] * x[i]; cnt++; }
      noise = cnt ? Math.sqrt(noise / cnt) : 0;
      var pk = 0;
      for (i = a; i < b; i++) { var v = Math.abs(x[i]); if (v > pk) pk = v; }
      if (pk < 0.01 || pk < noise * 8) { out.push(null); continue; }
      var thr = Math.max(pk * 0.35, noise * 6), d = null;
      for (i = a; i < b; i++) if (Math.abs(x[i]) >= thr) { d = i - at[k]; break; }
      out.push(d);
    }
    return out;
  }
  function median(a) { var b = a.slice().sort(function (p, q) { return p - q; }); var m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; }

  /* ---------- storage and export ---------- */
  function toI16(x) {
    var o = new Int16Array(x.length);
    for (var i = 0; i < x.length; i++) { var v = x[i]; v = v > 1 ? 1 : v < -1 ? -1 : v; o[i] = v < 0 ? Math.round(v * 32768) : Math.round(v * 32767); }
    return o;
  }
  function fromI16(a) {
    var o = new Float32Array(a.length);
    for (var i = 0; i < a.length; i++) o[i] = a[i] < 0 ? a[i] / 32768 : a[i] / 32767;
    return o;
  }
  /* linear resampling to exactly `len` samples */
  function resample(x, len) {
    if (len === x.length) return x;
    var o = new Float32Array(len), r = (x.length - 1) / Math.max(1, len - 1);
    for (var i = 0; i < len; i++) { var p = i * r, a = Math.floor(p), f = p - a; o[i] = a + 1 < x.length ? x[a] + (x[a + 1] - x[a]) * f : x[x.length - 1] || 0; }
    return o;
  }
  function wav(x, sr) {
    var n = x.length, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf), i;
    function str(o, s) { for (var c = 0; c < s.length; c++) v.setUint8(o + c, s.charCodeAt(c)); }
    str(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); str(8, "WAVE"); str(12, "fmt ");
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, "data"); v.setUint32(40, n * 2, true);
    for (i = 0; i < n; i++) { var s = x[i]; s = s > 1 ? 1 : s < -1 ? -1 : s; v.setInt16(44 + i * 2, s < 0 ? s * 32768 : s * 32767, true); }
    return buf;
  }

  var api = {
    onsets: onsets, autoTrim: autoTrim, tempoFit: tempoFit, guessBars: guessBars, renderLayer: renderLayer,
    peaks: peaks, minmax: minmax, clickDelays: clickDelays, median: median,
    toI16: toI16, fromI16: fromI16, resample: resample, wav: wav
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LoopDSP = api;
})(this);
