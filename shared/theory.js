/* Music theory shared by the apps inside Music.

   Note Cards drills this material and Library lets you look it up, so both read
   the same file and can never disagree. It only defines data and pure functions:
   note spelling, modes, chord qualities, inversions, voicings, guitar shapes, and
   buildCards(), which lists every mode, arpeggio and chord voicing in all 12 keys.

   Loaded with a plain <script src="../shared/theory.js"> before the app's own script.
   Card keys (for example "modes-2-dorian") are how Note Cards stores ratings, so
   changing how a key is built would orphan saved ratings. */
// ===== THEORY START =====
const LETTERS = ['C','D','E','F','G','A','B'];
const NAT = [0,2,4,5,7,9,11];
const MAJOR = NAT;
const acc = a => a === 0 ? '' : (a > 0 ? '♯' : '♭').repeat(Math.abs(a));

// Accidental of the note `steps` letters and `semis` semitones above root ({l: letter index, a: accidental}).
function accOf(root, steps, semis) {
  const li = root.l + steps, letter = ((li % 7) + 7) % 7, oct = Math.floor(li / 7);
  return (NAT[root.l] + root.a + semis) - (NAT[letter] + 12 * oct);
}
function spell(root, steps, semis) {
  return LETTERS[(((root.l + steps) % 7) + 7) % 7] + acc(accOf(root, steps, semis));
}
const rootName = root => LETTERS[root.l] + acc(root.a);
const degLabel = (steps, semis) => acc(semis - MAJOR[steps]) + (steps + 1);
// Color family of a degree label: root orange, 3rd blue, 5th green, 7th pink, 6th purple, 4th white, 2nd/9th and the rest neutral.
const degClass = deg => {
  const d = String(deg).replace(/[♭♯]/g, '');
  return (d === 'R' || d === '1' || d === '8') ? 'd-r' : d === '3' ? 'd-3' : d === '5' ? 'd-5' : d === '7' ? 'd-7'
       : (d === '6' || d === '13') ? 'd-6' : (d === '4' || d === '11') ? 'd-4' : 'd-n';
};

function intervalName(steps, semis) {
  const simple = ((steps % 7) + 7) % 7, oct = Math.floor(steps / 7);
  const diff = semis - (MAJOR[simple] + 12 * oct);
  const perfect = simple === 0 || simple === 3 || simple === 4;
  const q = perfect ? ({'-2':'dd','-1':'d','0':'P','1':'A','2':'AA'})[diff]
                    : ({'-3':'dd','-2':'d','-1':'m','0':'M','1':'A','2':'AA'})[diff];
  return (q || '?') + (steps + 1);
}

// Root spellings for each pitch class. The first is preferred when two spellings tie.
const PC_ROOTS = [
  [{l:0,a:0}], [{l:1,a:-1},{l:0,a:1}], [{l:1,a:0}], [{l:2,a:-1},{l:1,a:1}], [{l:2,a:0}], [{l:3,a:0}],
  [{l:3,a:1},{l:4,a:-1}], [{l:4,a:0}], [{l:5,a:-1},{l:4,a:1}], [{l:5,a:0}], [{l:6,a:-1},{l:5,a:1}], [{l:6,a:0}],
];
const KEY_LABELS = ['C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭','A','A♯/B♭','B'];
// Fewest accidentals wins and double sharps/flats cost extra; ties go to the simpler tonic triad, then the preferred name.
const spellCost = (root, ivs) => ivs.reduce((s, [st, se]) => { const a = Math.abs(accOf(root, st, se)); return s + a + (a > 1 ? 10 : 0); }, 0);
function pickRoot(pc, ivs, tieIvs) {
  let best = null;
  PC_ROOTS[pc].forEach((r, i) => {
    const k = [spellCost(r, ivs), spellCost(r, tieIvs), i];
    if (!best || k[0] < best.k[0] || (k[0] === best.k[0] && (k[1] < best.k[1] || (k[1] === best.k[1] && k[2] < best.k[2])))) best = { r, k };
  });
  return best.r;
}

// Chord tones as [letter steps, semitones] above the root.
const T = { R:[0,0], M2:[1,2], m3:[2,3], M3:[2,4], P4:[3,5], d5:[4,6], P5:[4,7], A5:[4,8], d7:[6,9], m7:[6,10], M7:[6,11] };
const TRIADS = [
  { id:'maj',  label:'Major',      word:'major',      tones:[T.R, T.M3, T.P5] },
  { id:'min',  label:'Minor',      word:'minor',      tones:[T.R, T.m3, T.P5] },
  { id:'aug',  label:'Augmented',  word:'augmented',  tones:[T.R, T.M3, T.A5] },
  { id:'dim',  label:'Diminished', word:'diminished', tones:[T.R, T.m3, T.d5] },
  { id:'sus2', label:'sus2',       sym:'sus2',        tones:[T.R, T.M2, T.P5] },
  { id:'sus4', label:'sus4',       sym:'sus4',        tones:[T.R, T.P4, T.P5] },
];
const SEVENTHS = [
  { id:'maj7',   label:'maj7',    sym:'maj7',    word:'major 7',           tones:[T.R, T.M3, T.P5, T.M7] },
  { id:'dom7',   label:'dom7',    sym:'7',       word:'dominant 7',        tones:[T.R, T.M3, T.P5, T.m7] },
  { id:'m7',     label:'m7',      sym:'m7',      word:'minor 7',           tones:[T.R, T.m3, T.P5, T.m7] },
  { id:'m7b5',   label:'m7♭5',    sym:'m7♭5',    word:'half-diminished',   tones:[T.R, T.m3, T.d5, T.m7] },
  { id:'dim7',   label:'dim7',    sym:'dim7',    word:'diminished 7',      tones:[T.R, T.m3, T.d5, T.d7] },
  { id:'mmaj7',  label:'m(maj7)', sym:'m(maj7)', word:'minor-major 7',     tones:[T.R, T.m3, T.P5, T.M7] },
  { id:'maj7s5', label:'maj7♯5',  sym:'maj7♯5',  word:'augmented major 7', tones:[T.R, T.M3, T.A5, T.M7] },
];
const ARP_QUALITIES = [...TRIADS.slice(0, 4), ...SEVENTHS];
const ARP_STARTS = [
  { id:'s1', chip:'Root', label:'From the root', idx:0 },
  { id:'s3', chip:'3rd',  label:'From the 3rd',  idx:1 },
  { id:'s5', chip:'5th',  label:'From the 5th',  idx:2 },
  { id:'s7', chip:'7th',  label:'From the 7th',  idx:3 },
];
// Inversion = which chord tone is in the bass.
const INVERSIONS = [
  { id:'root', label:'Root position', bass:0 },
  { id:'inv1', label:'1st inversion', bass:1 },
  { id:'inv2', label:'2nd inversion', bass:2 },
  { id:'inv3', label:'3rd inversion', bass:3 },
];
// drops: [voice number counted from the top, octaves down]
const VOICINGS = [
  { id:'close', label:'Close',                  drops:[] },
  { id:'d2',    label:'Drop 2',                 drops:[[2,1]] },
  { id:'d3',    label:'Drop 3',                 drops:[[3,1]] },
  { id:'d23',   label:'Drop 2 & 3',             drops:[[2,1],[3,1]] },
  { id:'d24',   label:'Drop 2 & 4',             drops:[[2,1],[4,1]], minVoices:4 },
  { id:'dd23',  label:'Double drop 2 / drop 3', drops:[[2,2],[3,1]] },
];
const MODES = [
  { id:'ionian',     name:'Ionian',     semis:[0,2,4,5,7,9,11], color:null },
  { id:'dorian',     name:'Dorian',     semis:[0,2,3,5,7,9,10], color:5 },
  { id:'phrygian',   name:'Phrygian',   semis:[0,1,3,5,7,8,10], color:1 },
  { id:'lydian',     name:'Lydian',     semis:[0,2,4,6,7,9,11], color:3 },
  { id:'mixolydian', name:'Mixolydian', semis:[0,2,4,5,7,9,10], color:6 },
  { id:'aeolian',    name:'Aeolian',    semis:[0,2,3,5,7,8,10], color:5 },
  { id:'locrian',    name:'Locrian',    semis:[0,1,3,5,6,8,10], color:4 },
];

// Find the close voicing that, after the drops, puts `bass` (tone index) on the bottom.
function buildVoicing(tones, bass, voicing) {
  const n = tones.length;
  let hit = null;
  for (let s = 0; s < n; s++) {
    const vs = [];
    for (let j = 0; j < n; j++) {
      const k = s + j, ti = k % n, o = k >= n ? 1 : 0;
      vs.push({ ti, dia: tones[ti][0] + 7 * o, semi: tones[ti][1] + 12 * o });
    }
    for (const [num, oct] of voicing.drops) {
      const v = vs[n - num];
      if (!v) throw new Error('No voice ' + num + ' in a ' + n + '-note chord');
      v.dia -= 7 * oct; v.semi -= 12 * oct;
    }
    vs.sort((a, b) => a.semi - b.semi);
    if (vs[0].ti === bass) {
      if (hit) throw new Error('Ambiguous voicing');
      hit = { source: s, voices: vs };
    }
  }
  if (!hit) throw new Error('No voicing found');
  return hit;
}

// Guitar: standard tuning, strings 6 → 1. Keeps the voicing's exact spacing, one note per string, low to high.
const TUNING = [40, 45, 50, 55, 59, 64];
const COMBOS = { 3: [], 4: [] };
(function () {
  const rec = (n, start, cur) => {
    if (cur.length === n) { COMBOS[n].push(cur.slice()); return; }
    for (let s = start; s < 6; s++) { cur.push(s); rec(n, s + 1, cur); cur.pop(); }
  };
  rec(3, 0, []); rec(4, 0, []);
})();
function guitarShapes(midis, maxSpan) {
  const n = midis.length, out = [];
  for (let k = -5; k <= 5; k++) {
    const q = midis.map(m => m + 12 * k);
    if (q[0] < TUNING[0] || q[n - 1] > TUNING[5] + 15) continue;
    for (const strs of COMBOS[n]) {
      const frets = q.map((m, i) => m - TUNING[strs[i]]);
      if (frets.some(f => f < 0 || f > 15)) continue;
      const fr = frets.filter(f => f > 0);
      const minF = fr.length ? Math.min(...fr) : 0, maxF = fr.length ? Math.max(...fr) : 0, span = maxF - minF;
      if (span > maxSpan) continue;
      const skips = strs[n - 1] - strs[0] - (n - 1), opens = n - fr.length;
      // Movable shapes first: open strings, skipped strings, wide stretches and very high frets all cost extra.
      const cost = skips * 2 + Math.max(0, span - 2) * 1.5 + opens * 2.5 + Math.max(0, minF - 9) * .4 + (span >= 4 && minF <= 4 ? 1 : 0);
      out.push({ strings: strs, frets, span, minF, maxF, cost });
    }
  }
  return out.sort((a, b) => a.cost - b.cost || a.minF - b.minF);
}
function guitarFor(midis) {
  let shapes = guitarShapes(midis, 4), stretch = false;
  if (!shapes.length) { shapes = guitarShapes(midis, 5); stretch = shapes.length > 0; }
  return { shapes: shapes.slice(0, 8), stretch };
}

function buildCards() {
  const cards = [];
  for (let pc = 0; pc < 12; pc++) {
    MODES.forEach((m, mi) => {
      const ivs = m.semis.map((s, i) => [i, s]);
      const root = pickRoot(pc, ivs, [ivs[0], ivs[2], ivs[4]]);
      const R = rootName(root), base = (pc <= 5 ? 60 : 48) + pc;
      const notes = m.semis.map((s, i) => ({ name: spell(root, i, s), deg: degLabel(i, s), midi: base + s, tone: i === m.color }));
      notes.push({ name: R, deg: '8', midi: base + 12, octave: true });
      const gaps = notes.slice(1).map((n, i) => ({ 1:'H', 2:'W', 3:'W+H' })[n.midi - notes[i].midi]);
      const parent = spell(root, -mi, -MAJOR[mi]);
      cards.push({
        key: 'modes-' + pc + '-' + m.id, deck: 'modes', tags: { key: String(pc), mode: m.id },
        title: R + ' ' + m.name, sub: '', lines: [], notes, gaps,
        parent: 'Mode ' + (mi + 1) + ' of ' + parent + ' major',
        colorTone: m.color == null ? null : notes[m.color],
      });
    });

    ARP_QUALITIES.forEach(q => {
      const n = q.tones.length, root = pickRoot(pc, q.tones, q.tones.slice(0, 3)), R = rootName(root);
      ARP_STARTS.forEach(st => {
        if (st.idx >= n) return;
        const seq = [];
        for (let j = 0; j <= n; j++) {
          const ti = (st.idx + j) % n, o = Math.floor((st.idx + j) / n);
          seq.push({ ti, dia: q.tones[ti][0] + 7 * o, semi: q.tones[ti][1] + 12 * o });
        }
        const k = Math.round((60 - (60 + pc + seq[0].semi)) / 12);
        const notes = seq.map((x, j) => {
          const [s1, s2] = q.tones[x.ti];
          return { name: spell(root, s1, s2), deg: x.ti === 0 ? 'R' : degLabel(s1, s2), midi: 60 + pc + x.semi + 12 * k, octave: j === n };
        });
        const gaps = seq.slice(1).map((x, i) => intervalName(x.dia - seq[i].dia, x.semi - seq[i].semi));
        cards.push({ key: ['arps', pc, q.id, st.id].join('-'), deck: 'arps', tags: { key: String(pc), q: q.id, start: st.id },
          title: n === 3 ? R + ' ' + q.word : R + q.sym, sub: n === 4 ? R + ' ' + q.word : '', lines: ['Arpeggio', st.label], notes, gaps });
      });
    });

    const chord = (deck, q, root, inv, v, title, sub) => {
      const { voices } = buildVoicing(q.tones, inv.bass, v);
      const base = 60 + pc, lo = voices[0].semi, hi = voices[voices.length - 1].semi;
      const k = Math.round((60 - (base + (lo + hi) / 2)) / 12);
      const vs = voices.map(x => ({ ti: x.ti, dia: x.dia + 7 * k, semi: x.semi + 12 * k }));
      const notes = vs.map(x => {
        const [st, se] = q.tones[x.ti];
        return { name: spell(root, st, se), deg: x.ti === 0 ? 'R' : degLabel(st, se), midi: base + x.semi };
      });
      const gaps = vs.slice(1).map((x, i) => intervalName(x.dia - vs[i].dia, x.semi - vs[i].semi));
      cards.push({ key: [deck, pc, q.id, inv.id, v.id].join('-'), deck, tags: { key: String(pc), q: q.id, inv: inv.id, v: v.id },
        title, sub, lines: [inv.label, v.label], notes, gaps });
    };
    TRIADS.forEach(q => {
      const root = pickRoot(pc, q.tones, q.tones), R = rootName(root);
      const title = q.word ? R + ' ' + q.word : R + q.sym;
      INVERSIONS.slice(0, 3).forEach(inv => VOICINGS.forEach(v => { if (!(v.minVoices > 3)) chord('triads', q, root, inv, v, title, ''); }));
    });
    SEVENTHS.forEach(q => {
      const root = pickRoot(pc, q.tones, q.tones.slice(0, 3)), R = rootName(root);
      INVERSIONS.forEach(inv => VOICINGS.forEach(v => chord('sevenths', q, root, inv, v, R + q.sym, R + ' ' + q.word)));
    });
  }
  return cards;
}
// ===== THEORY END =====
