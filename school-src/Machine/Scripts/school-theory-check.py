#!/usr/bin/env python3
"""
school-theory-check.py — verify the music-theory assertions in the vault
against first principles (spec-147, Phase 0).

Pure Python 3 standard library. No pip installs.

Why this exists
---------------
A single wrong fact in a course note gets memorised through spaced repetition
and then re-tested by its own lesson test: the system teaches the error, then
confirms it. A wrong answer key is worse still — it marks a correct answer
wrong and teaches the error twice.

The fix is not a smarter model. Every frontier model knows the order of sharps
cold; errors like that come from generating without verifying. Music theory is
unusually lucky here — most of what this school asserts is mechanically
checkable. So we check it.

This walks the theory-bearing notes, extracts assertions it recognises, and
regenerates each one from the interval formula / circle / pitch-class
arithmetic. It reports `file:line`, the claim, and what it should be, and it
exits non-zero on any failure so it can gate a build.

What it checks
--------------
    order of sharps and flats           F C G D A E B, and its exact reverse
    "N sharps/flats -> key of X"        derived from the circle, both directions
    key signature contents              generated from the rule, compared
    scale and mode spellings            generated from the interval formula
    interval name <-> semitones         arithmetic, including aug/dim cases
    interval inversion                  numbers sum to 9, quality flips
    chord spellings                     generated from the formula
    enharmonic equivalences             pitch-class arithmetic
    Roman numeral <-> quality in a key   generated from the diatonic set
    relative / parallel major-minor      arithmetic

Deliberately conservative
-------------------------
A false positive is worse than a miss: it trains people to ignore the checker.
Every extractor is anchored to an explicit, unambiguous phrasing. Prose that
merely mentions a chord in passing is not a claim and is not checked. Run with
--list-claims to see exactly what was picked up.

Usage
    python3 school-theory-check.py                 # check the whole vault
    python3 school-theory-check.py --selftest      # verify the engine itself
    python3 school-theory-check.py --list-claims   # show every claim found
    python3 school-theory-check.py --path <dir>    # check one directory
    python3 school-theory-check.py --quiet         # failures only
"""

import argparse
import re
import sys
from pathlib import Path

VAULT = Path(__file__).resolve().parents[2]

SCAN_DIRS = [
    "00 Human/20 Music/School & Content/Theory",
    "00 Human/20 Music/School & Content/Curriculum/Courses",
    "00 Human/20 Music/School & Content/Curriculum/Concepts",
    "00 Human/20 Music/School & Content/Curriculum/Tests",
]

# --------------------------------------------------------------------------
# Pitch spelling core
# --------------------------------------------------------------------------

LETTERS = "CDEFGAB"
BASE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}

SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"]
FLAT_ORDER = list(reversed(SHARP_ORDER))          # B E A D G C F

# Unicode accidentals normalise to ASCII internally.
ACC_MAP = {"♯": "#", "♭": "b", "♮": "", "\U0001d12a": "##", "\U0001d12b": "bb"}


def _norm_acc(s):
    for k, v in ACC_MAP.items():
        s = s.replace(k, v)
    return s


class Note:
    """A spelled pitch: a letter plus an integer alteration (-2..+2)."""

    __slots__ = ("letter", "alter")

    def __init__(self, letter, alter=0):
        self.letter = letter.upper()
        self.alter = alter

    @classmethod
    def parse(cls, text):
        t = _norm_acc(text.strip())
        m = re.fullmatch(r"([A-Ga-g])([#b]{0,2}|x)?", t)
        if not m:
            return None
        letter = m.group(1).upper()
        acc = m.group(2) or ""
        if acc == "x":
            alter = 2
        else:
            alter = acc.count("#") - acc.count("b")
        return cls(letter, alter)

    @property
    def pc(self):
        """Pitch class 0-11."""
        return (BASE[self.letter] + self.alter) % 12

    @property
    def letter_index(self):
        return LETTERS.index(self.letter)

    def transpose_letters(self, steps):
        return LETTERS[(self.letter_index + steps) % 7]

    def __str__(self):
        if self.alter == 0:
            return self.letter
        if self.alter > 0:
            return self.letter + "♯" * self.alter
        return self.letter + "♭" * (-self.alter)

    def ascii(self):
        if self.alter == 0:
            return self.letter
        return self.letter + ("#" * self.alter if self.alter > 0 else "b" * -self.alter)

    def __eq__(self, other):
        return isinstance(other, Note) and self.letter == other.letter and self.alter == other.alter

    def __hash__(self):
        return hash((self.letter, self.alter))


def note_from(root, letter_steps, semitones):
    """Build the note `letter_steps` letters and `semitones` semitones above root."""
    letter = root.transpose_letters(letter_steps)
    target_pc = (root.pc + semitones) % 12
    natural_pc = BASE[letter]
    alter = (target_pc - natural_pc) % 12
    if alter > 6:
        alter -= 12
    return Note(letter, alter)


# --------------------------------------------------------------------------
# Intervals
# --------------------------------------------------------------------------

PERFECT_NUMBERS = {1, 4, 5, 8}
# semitones spanned by a perfect/major interval of each number
NATURAL_SPAN = {1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12}

QUALITY_WORDS = {
    "perfect": "P", "major": "M", "minor": "m",
    "augmented": "A", "diminished": "d",
}
NUMBER_WORDS = {
    "unison": 1, "second": 2, "third": 3, "fourth": 4, "fifth": 5,
    "sixth": 6, "seventh": 7, "octave": 8,
}


def interval_semitones(quality, number):
    """Semitones spanned by e.g. ('M', 3). Returns None if the pair is invalid."""
    if number not in NATURAL_SPAN:
        return None
    base = NATURAL_SPAN[number]
    if number in PERFECT_NUMBERS:
        if quality == "P":
            return base
        if quality == "A":
            return base + 1
        if quality == "d":
            return base - 1
        return None  # major/minor fourths do not exist
    if quality == "M":
        return base
    if quality == "m":
        return base - 1
    if quality == "A":
        return base + 1
    if quality == "d":
        return base - 2
    return None


def invert_interval(quality, number):
    """Interval inversion: numbers sum to 9, quality flips."""
    if number == 8:
        return quality, 1
    if number == 1:
        return quality, 8
    new_number = 9 - number
    flip = {"P": "P", "M": "m", "m": "M", "A": "d", "d": "A"}
    return flip[quality], new_number


# --------------------------------------------------------------------------
# Scales and modes
# --------------------------------------------------------------------------

MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11]

MODE_ROTATION = {
    "ionian": 0, "dorian": 1, "phrygian": 2, "lydian": 3,
    "mixolydian": 4, "aeolian": 5, "locrian": 6,
}

SCALE_FORMULAS = {
    "major": MAJOR_STEPS,
    "natural minor": [0, 2, 3, 5, 7, 8, 10],
    "minor": [0, 2, 3, 5, 7, 8, 10],
    "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
    "melodic minor": [0, 2, 3, 5, 7, 9, 11],
    "whole tone": [0, 2, 4, 6, 8, 10],
    "major pentatonic": [0, 2, 4, 7, 9],
    "minor pentatonic": [0, 3, 5, 7, 10],
    "blues": [0, 3, 5, 6, 7, 10],
}
for _name, _rot in MODE_ROTATION.items():
    SCALE_FORMULAS[_name] = [(MAJOR_STEPS[(i + _rot) % 7] - MAJOR_STEPS[_rot]) % 12
                             for i in range(7)]


def build_scale(root, kind):
    """Spell a scale. Heptatonic scales advance one letter per degree."""
    steps = SCALE_FORMULAS.get(kind)
    if steps is None:
        return None
    if len(steps) == 7:
        return [note_from(root, i, s) for i, s in enumerate(steps)]
    # Non-heptatonic: spell from the parent major/minor where sensible.
    if kind == "major pentatonic":
        idx = [0, 1, 2, 4, 5]
        full = build_scale(root, "major")
        return [full[i] for i in idx]
    if kind == "minor pentatonic":
        idx = [0, 2, 3, 4, 6]
        full = build_scale(root, "natural minor")
        return [full[i] for i in idx]
    if kind == "blues":
        pent = build_scale(root, "minor pentatonic")
        # The blue note is a flattened fifth, so it takes the fifth's letter (E♭, not D♯).
        blue = note_from(root, 4, 6)
        return pent[:3] + [blue] + pent[3:]
    if kind == "whole tone":
        return [note_from(root, i, s) for i, s in enumerate(steps)]
    return None


# --------------------------------------------------------------------------
# Key signatures
# --------------------------------------------------------------------------

SHARP_MAJORS = ["C", "G", "D", "A", "E", "B", "F#", "C#"]
FLAT_MAJORS = ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"]


def key_signature(tonic, mode="major"):
    """Return (count, 'sharps'|'flats'|'none', [accidental letters in order])."""
    n = Note.parse(tonic) if isinstance(tonic, str) else tonic
    if n is None:
        return None
    if mode.startswith("min"):
        n = relative_major(n)
    key = n.ascii()
    if key in SHARP_MAJORS:
        c = SHARP_MAJORS.index(key)
        if c == 0:
            return (0, "none", [])
        return (c, "sharps", SHARP_ORDER[:c])
    if key in FLAT_MAJORS:
        c = FLAT_MAJORS.index(key)
        return (c, "flats", FLAT_ORDER[:c])
    return None


def relative_minor(major_note):
    return note_from(major_note, 5, 9)


def relative_major(minor_note):
    return note_from(minor_note, 2, 3)


# --------------------------------------------------------------------------
# Chords
# --------------------------------------------------------------------------

# name -> (letter steps from root, semitones from root)
CHORD_FORMULAS = {
    "major":            [(0, 0), (2, 4), (4, 7)],
    "minor":            [(0, 0), (2, 3), (4, 7)],
    "diminished":       [(0, 0), (2, 3), (4, 6)],
    "augmented":        [(0, 0), (2, 4), (4, 8)],
    "sus2":             [(0, 0), (1, 2), (4, 7)],
    "sus4":             [(0, 0), (3, 5), (4, 7)],
    "major seventh":    [(0, 0), (2, 4), (4, 7), (6, 11)],
    "dominant seventh": [(0, 0), (2, 4), (4, 7), (6, 10)],
    "minor seventh":    [(0, 0), (2, 3), (4, 7), (6, 10)],
    "half-diminished":  [(0, 0), (2, 3), (4, 6), (6, 10)],
    "diminished seventh": [(0, 0), (2, 3), (4, 6), (6, 9)],
    "minor major seventh": [(0, 0), (2, 3), (4, 7), (6, 11)],
    "augmented seventh": [(0, 0), (2, 4), (4, 8), (6, 10)],
    "sixth":            [(0, 0), (2, 4), (4, 7), (5, 9)],
    "minor sixth":      [(0, 0), (2, 3), (4, 7), (5, 9)],
    "dominant ninth":   [(0, 0), (2, 4), (4, 7), (6, 10), (8, 14)],
    "major ninth":      [(0, 0), (2, 4), (4, 7), (6, 11), (8, 14)],
    "minor ninth":      [(0, 0), (2, 3), (4, 7), (6, 10), (8, 14)],
    "add9":             [(0, 0), (2, 4), (4, 7), (8, 14)],
}

# chord-symbol suffix -> formula key. Longest match wins.
SYMBOL_SUFFIXES = [
    ("maj7", "major seventh"), ("M7", "major seventh"), ("△7", "major seventh"),
    ("maj9", "major ninth"),
    ("m7b5", "half-diminished"), ("m7♭5", "half-diminished"),
    ("ø7", "half-diminished"), ("ø", "half-diminished"),
    ("dim7", "diminished seventh"), ("°7", "diminished seventh"),
    ("dim", "diminished"), ("°", "diminished"),
    ("aug7", "augmented seventh"),
    ("aug", "augmented"), ("+", "augmented"),
    ("mmaj7", "minor major seventh"),
    ("m9", "minor ninth"), ("min9", "minor ninth"),
    ("m7", "minor seventh"), ("min7", "minor seventh"), ("-7", "minor seventh"),
    ("m6", "minor sixth"), ("min6", "minor sixth"),
    ("sus4", "sus4"), ("sus2", "sus2"),
    ("add9", "add9"),
    ("m", "minor"), ("min", "minor"), ("-", "minor"),
    ("9", "dominant ninth"),
    ("7", "dominant seventh"),
    ("6", "sixth"),
    ("", "major"),
]


def build_chord(root, kind):
    formula = CHORD_FORMULAS.get(kind)
    if formula is None:
        return None
    return [note_from(root, ls, st) for ls, st in formula]


def parse_chord_symbol(sym):
    """'Abmaj7' -> (Note(A,-1), 'major seventh'). None if unrecognised."""
    s = _norm_acc(sym.strip())
    m = re.match(r"^([A-G][#b]{0,2})", s)
    if not m:
        return None
    root = Note.parse(m.group(1))
    rest = s[m.end():]
    for suffix, kind in SYMBOL_SUFFIXES:
        if rest == suffix:
            return root, kind
    return None


# --------------------------------------------------------------------------
# Diatonic Roman numerals
# --------------------------------------------------------------------------

MAJOR_TRIAD_QUALITIES = ["major", "minor", "minor", "major", "major", "minor", "diminished"]
MINOR_TRIAD_QUALITIES = ["minor", "diminished", "major", "minor", "minor", "major", "major"]

ROMAN_TO_DEGREE = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7}


def diatonic_triad(tonic, mode, degree):
    """(root Note, quality string) for a scale degree, 1-indexed."""
    scale = build_scale(tonic, "major" if mode == "major" else "natural minor")
    if scale is None or not 1 <= degree <= 7:
        return None
    quals = MAJOR_TRIAD_QUALITIES if mode == "major" else MINOR_TRIAD_QUALITIES
    return scale[degree - 1], quals[degree - 1]


def parse_roman(text):
    """'vii' -> (7, 'diminished-ish lowercase'). Returns (degree, is_upper, suffix)."""
    t = _norm_acc(text.strip())
    m = re.fullmatch(r"([b#♭♯]?)([ivxIVX]+)(.*)", t)
    if not m:
        return None
    numeral = m.group(2)
    upper = numeral.isupper()
    key = numeral.upper()
    if key not in ROMAN_TO_DEGREE:
        return None
    return ROMAN_TO_DEGREE[key], upper, m.group(3), m.group(1)


# --------------------------------------------------------------------------
# Findings
# --------------------------------------------------------------------------

class Finding:
    def __init__(self, path, line, claim, expected, kind):
        self.path, self.line, self.claim, self.expected, self.kind = path, line, claim, expected, kind

    def render(self, root):
        try:
            rel = self.path.relative_to(root)
        except ValueError:
            rel = self.path
        return (f"{rel}:{self.line}\n"
                f"    [{self.kind}] {self.claim}\n"
                f"    expected: {self.expected}")


def notes_str(notes):
    return " ".join(str(n) for n in notes)


def same_notes(claimed, expected):
    """Compare spelled note lists. Spelling matters — that is the point."""
    return [n.ascii() for n in claimed] == [n.ascii() for n in expected]


def parse_note_list(text):
    """'B♭, E♭, A♭' or 'B♭ E♭ A♭' -> [Note]. None if any token fails."""
    raw = re.split(r"[,·–—\-\s]+", _norm_acc(text).strip())
    out = []
    for tok in raw:
        tok = tok.strip("*_`.()")
        if not tok:
            continue
        n = Note.parse(tok)
        if n is None:
            return None
        out.append(n)
    return out or None


# --------------------------------------------------------------------------
# Extractors
# --------------------------------------------------------------------------

NOTE_TOKEN = r"[A-G](?:[#b♯♭]{0,2})"
# `\b` is useless after a note token: ♯ and ♭ are non-word characters, so
# "D♭," has no boundary after the ♭ and the engine backtracks to bare "D".
# Use an explicit "not followed by more note-ish characters" instead.
NOTE_END = r"(?![A-Ga-g#b♯♭])"
CLAIMS_SEEN = []


def _record(kind, text):
    CLAIMS_SEEN.append((kind, text.strip()))


def check_line(path, lineno, line, findings):
    stripped = line.strip()
    if not stripped or stripped.startswith(("http", "![[")):
        return

    _check_accidental_order(path, lineno, line, findings)
    _check_key_signature_contents(path, lineno, line, findings)
    _check_count_to_key(path, lineno, line, findings)
    _check_scale_spelling(path, lineno, line, findings)
    _check_chord_spelling(path, lineno, line, findings)
    _check_interval_semitones(path, lineno, line, findings)
    _check_interval_inversion(path, lineno, line, findings)
    _check_enharmonic(path, lineno, line, findings)
    _check_roman_quality(path, lineno, line, findings)
    _check_relative_keys(path, lineno, line, findings)


def _check_accidental_order(path, lineno, line, findings):
    # Catches both "the order of sharps is F C G D A E B" and
    # "Sharps are always added in the same order: **F C G D A E B**".
    m = re.search(r"\b(sharps|flats)\b[^.\n]{0,70}?\border\b[^.\n]{0,20}?[:—\-]\s*\**\s*"
                  r"((?:[A-G][\s,·–\-]*){5,7})", line, re.I)
    if not m:
        m = re.search(r"\border of (sharps|flats)\b[^.\n]{0,60}?[:—\-]\s*\**\s*"
                      r"((?:[A-G][\s,·–\-]*){5,7})", line, re.I)
    if not m:
        return
    kind = m.group(1).lower().rstrip("s") + "s"
    claimed = [t for t in re.split(r"[^A-G]+", m.group(2)) if t]
    if not claimed:
        return
    _record("accidental-order", m.group(0))
    expected = SHARP_ORDER if kind == "sharps" else FLAT_ORDER
    if claimed != expected[:len(claimed)]:
        findings.append(Finding(path, lineno, f"order of {kind} given as {' '.join(claimed)}",
                                f"{' '.join(expected)}", "accidental-order"))


def _parse_minor_cell(cell):
    """'Am', 'F♯m', 'B♭ minor' -> Note. None if the cell isn't a minor key."""
    c = _norm_acc(cell.strip().strip("*_`"))
    m = re.fullmatch(r"([A-G][#b]{0,2})\s*(?:m|min|minor)", c)
    return Note.parse(m.group(1)) if m else None


def _split_row(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def _is_separator(line):
    cells = _split_row(line)
    return bool(cells) and all(set(c) <= set("-: ") and "-" in c for c in cells)


def _classify_header(cells):
    """Map a table's header cells to roles. Returns None if it isn't a table
    this checker understands — which is the common case, and deliberately so.

    Header-driven, not shape-driven: an earlier version guessed roles from cell
    contents and read a diatonic-chord table's ii column as a relative minor.
    """
    roles = {}
    for i, raw in enumerate(cells):
        c = _norm_acc(raw.strip().strip("*_`")).lower()
        if re.search(r"relative\s+minor", c):
            roles[i] = ("relative-minor", None)
        elif re.search(r"sharps?\s*/\s*flats?|accidentals?|key signature", c):
            roles[i] = ("accidentals", None)
        elif re.fullmatch(r"(major\s*)?key|key\s*(centre|center)?|tonic|major", c):
            roles[i] = ("tonic", None)
        else:
            head = raw.strip().strip("_`")
            # A footnote marker means the column is annotated as an exception —
            # e.g. "V*" for the borrowed major V of harmonic minor, which is
            # deliberately not diatonic. Never check those.
            if re.search(r"[*†‡]|\(", head):
                continue
            r = parse_roman(head)
            if r is not None:
                degree, upper, suffix, prefix = r
                roles[i] = ("degree", (degree, prefix, suffix))

    # Two columns claiming the same degree means one of them is an alternative
    # or a borrowed chord. Ambiguous — drop both rather than guess.
    seen = {}
    for i, v in list(roles.items()):
        if v[0] != "degree":
            continue
        key = v[1][0]
        if key in seen:
            roles.pop(i, None)
            roles.pop(seen[key], None)
        else:
            seen[key] = i

    has_tonic = any(v[0] == "tonic" for v in roles.values())
    useful = any(v[0] in ("accidentals", "relative-minor", "degree") for v in roles.values())
    return roles if (has_tonic and useful) else None


def _check_table(path, header_line_no, header_cells, rows, findings):
    roles = _classify_header(header_cells)
    if roles is None:
        return

    degrees = [(i, v[1]) for i, v in roles.items() if v[0] == "degree"]
    # A minor-key table announces itself with a flattened degree (♭III/♭VI/♭VII)
    # or a lowercase tonic numeral.
    mode = "major"
    for _, (deg, prefix, _suffix) in degrees:
        if prefix in ("b", "#"):
            mode = "minor"
            break

    tonic_idx = next(i for i, v in roles.items() if v[0] == "tonic")

    for offset, row in rows:
        cells = _split_row(row)
        if len(cells) <= tonic_idx:
            continue
        lineno = header_line_no + 2 + offset
        tcell = _norm_acc(cells[tonic_idx].strip().strip("*_`"))
        m = re.fullmatch(r"([A-G][#b]{0,2})\s*(major|minor|m)?", tcell)
        if not m:
            continue
        tonic = Note.parse(m.group(1))
        row_mode = "minor" if (m.group(2) in ("minor", "m")) else mode
        if tonic is None:
            continue

        for idx, (role, meta) in roles.items():
            if idx >= len(cells) or idx == tonic_idx:
                continue
            cell = cells[idx].strip().strip("*_`")
            if not cell:
                continue

            if role == "accidentals":
                sig = key_signature(tonic, row_mode)
                if sig is None:
                    continue
                count, which, letters = sig
                if cell in {"—", "-", "–", "none", "0"}:
                    if count != 0:
                        acc = "♯" if which == "sharps" else "♭"
                        _record("keysig-table", row.strip())
                        findings.append(Finding(
                            path, lineno, f"{tonic} {row_mode} shown with no accidentals",
                            " ".join(l + acc for l in letters), "keysig-table"))
                    continue
                claimed = parse_note_list(cell)
                if claimed is None:
                    continue
                acc = "#" if which == "sharps" else "b"
                expected = [Note.parse(l + acc) for l in letters]
                _record("keysig-table", row.strip())
                if not same_notes(claimed, expected):
                    findings.append(Finding(
                        path, lineno,
                        f"{tonic} {row_mode} signature shown as {notes_str(claimed)}",
                        notes_str(expected) or "no accidentals", "keysig-table"))

            elif role == "relative-minor":
                rel = _parse_minor_cell(cell)
                if rel is None:
                    continue
                expected = relative_minor(tonic)
                _record("relative-table", row.strip())
                if rel.ascii() != expected.ascii():
                    findings.append(Finding(
                        path, lineno,
                        f"relative minor of {tonic} major shown as {rel} minor",
                        f"{expected} minor", "relative-table"))

            elif role == "degree":
                degree, prefix, _suffix = meta
                if prefix:
                    continue  # borrowed/altered degrees are out of scope
                got = diatonic_triad(tonic, row_mode, degree)
                if got is None:
                    continue
                exp_root, exp_qual = got
                parsed = parse_chord_symbol(cell)
                if parsed is None:
                    continue
                root, kind = parsed
                _record("diatonic-table", f"{tonic} {row_mode} deg {degree} = {cell}")
                if root.ascii() != exp_root.ascii():
                    findings.append(Finding(
                        path, lineno,
                        f"degree {degree} of {tonic} {row_mode} shown as {cell}",
                        f"{exp_root} {exp_qual}", "diatonic-table"))
                else:
                    # Sevenths and extensions are legitimate here; only flag a
                    # genuine triad-quality clash.
                    base = {"major": "major", "minor": "minor",
                            "diminished": "diminished", "augmented": "augmented"}.get(kind)
                    if base and base != exp_qual:
                        findings.append(Finding(
                            path, lineno,
                            f"degree {degree} of {tonic} {row_mode} shown as {cell} ({base})",
                            f"{exp_root} {exp_qual}", "diatonic-table"))


def _check_key_signature_contents(path, lineno, line, findings):
    # "A♭ major → B♭ E♭ A♭ D♭"  /  "key of A♭ major: B♭, E♭, A♭, D♭"
    pat = (rf"(?:key of\s+)?({NOTE_TOKEN})\s+(major|minor)\s*"
           r"(?:key\s*)?(?:signature\s*)?[→:—]\s*"
           rf"((?:{NOTE_TOKEN}[\s,·]*){{1,7}})")
    for m in re.finditer(pat, line):
        tonic = Note.parse(m.group(1))
        mode = m.group(2).lower()
        claimed = parse_note_list(m.group(3))
        if tonic is None or claimed is None or len(claimed) < 1:
            continue
        sig = key_signature(tonic, mode)
        if sig is None:
            continue
        count, which, letters = sig
        if count == 0 or len(claimed) != count:
            continue  # not a signature listing; don't guess
        if any(n.alter == 0 for n in claimed):
            # A key signature is all sharps or all flats. A natural in the list
            # means this is prose ("D minor→D major"), not a signature listing.
            continue
        if re.match(r"\s*(major|minor)\b", line[m.end():], re.I):
            # The "list" is followed by its own mode word, so this is a chain of key
            # CENTRES ("F major → E♭ major → D♭ major"), not a signature listing.
            # Without this, the one-flat key F major reads as "signature given as E♭".
            continue
        acc = "#" if which == "sharps" else "b"
        expected = [Note.parse(l + acc) for l in letters]
        _record("key-signature", m.group(0))
        if not same_notes(claimed, expected):
            findings.append(Finding(
                path, lineno,
                f"{tonic} {mode} signature given as {notes_str(claimed)}",
                notes_str(expected), "key-signature"))


def _check_count_to_key(path, lineno, line, findings):
    # "3 sharps = A major", "four flats -> A♭ major"
    words = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7}
    pat = (r"\b(\d|one|two|three|four|five|six|seven)\s+(sharps?|flats?)\b"
           rf"[^.\n]{{0,24}}?[=→:]\s*({NOTE_TOKEN})\s+(major|minor)\b")
    for m in re.finditer(pat, line, re.I):
        raw = m.group(1).lower()
        count = int(raw) if raw.isdigit() else words[raw]
        which = "sharps" if m.group(2).lower().startswith("sharp") else "flats"
        tonic = Note.parse(m.group(3))
        mode = m.group(4).lower()
        if tonic is None:
            continue
        sig = key_signature(tonic, mode)
        if sig is None:
            continue
        _record("count-to-key", m.group(0))
        if sig[0] != count or (sig[1] != which and sig[0] != 0):
            table = SHARP_MAJORS if which == "sharps" else FLAT_MAJORS
            right = table[count] if count < len(table) else "?"
            if mode == "minor":
                right = str(relative_minor(Note.parse(right))) + " minor"
            else:
                right = str(Note.parse(right)) + " major"
            findings.append(Finding(
                path, lineno,
                f"{count} {which} given as {tonic} {mode}",
                f"{count} {which} = {right}; {tonic} {mode} has "
                f"{sig[0]} {sig[1]}", "count-to-key"))


def _check_scale_spelling(path, lineno, line, findings):
    kinds = sorted(SCALE_FORMULAS, key=len, reverse=True)
    kind_alt = "|".join(re.escape(k) for k in kinds)
    pat = (rf"({NOTE_TOKEN})\s+({kind_alt})\s*(?:scale)?\s*[:—→]\s*"
           rf"((?:{NOTE_TOKEN}[\s,·\-]+){{3,}}{NOTE_TOKEN})")
    for m in re.finditer(pat, line, re.I):
        root = Note.parse(m.group(1))
        kind = m.group(2).lower()
        claimed = parse_note_list(m.group(3))
        if root is None or claimed is None:
            continue
        expected = build_scale(root, kind)
        if expected is None:
            continue
        # Allow the octave to be restated at the end.
        trimmed = claimed[:-1] if (len(claimed) == len(expected) + 1
                                   and claimed[-1].ascii() == claimed[0].ascii()) else claimed
        if len(trimmed) != len(expected):
            continue
        _record("scale", m.group(0))
        if not same_notes(trimmed, expected):
            findings.append(Finding(
                path, lineno,
                f"{root} {kind} given as {notes_str(trimmed)}",
                notes_str(expected), "scale"))


def _check_chord_spelling(path, lineno, line, findings):
    # "Cmaj7 = C E G B"  /  "A♭ minor triad: A♭ C♭ E♭"
    pat1 = (rf"\b({NOTE_TOKEN}(?:maj7|maj9|m7b5|m7♭5|dim7|dim|aug7|aug|mmaj7|m9|m7|m6|"
            r"sus4|sus2|add9|M7|△7|ø7|ø|°7|°|\+|min7|min9|min6|min|"
            rf"m|-7|-|9|7|6)?)\s*[=:→]\s*((?:{NOTE_TOKEN}[\s,·\-]+){{2,}}{NOTE_TOKEN})")
    for m in re.finditer(pat1, line):
        parsed = parse_chord_symbol(m.group(1))
        claimed = parse_note_list(m.group(2))
        if parsed is None or claimed is None:
            continue
        root, kind = parsed
        expected = build_chord(root, kind)
        if expected is None or len(claimed) != len(expected):
            continue
        _record("chord", m.group(0))
        if not same_notes(claimed, expected):
            findings.append(Finding(
                path, lineno,
                f"{m.group(1)} given as {notes_str(claimed)}",
                notes_str(expected), "chord"))

    kinds = sorted(CHORD_FORMULAS, key=len, reverse=True)
    kind_alt = "|".join(re.escape(k) for k in kinds)
    pat2 = (rf"({NOTE_TOKEN})\s+({kind_alt})\s*(?:triad|chord)?\s*[:—→]\s*"
            rf"((?:{NOTE_TOKEN}[\s,·\-]+){{2,}}{NOTE_TOKEN})")
    for m in re.finditer(pat2, line, re.I):
        root = Note.parse(m.group(1))
        kind = m.group(2).lower()
        claimed = parse_note_list(m.group(3))
        if root is None or claimed is None:
            continue
        expected = build_chord(root, kind)
        if expected is None or len(claimed) != len(expected):
            continue
        _record("chord", m.group(0))
        if not same_notes(claimed, expected):
            findings.append(Finding(
                path, lineno,
                f"{root} {kind} given as {notes_str(claimed)}",
                notes_str(expected), "chord"))


def _check_interval_semitones(path, lineno, line, findings):
    qual_alt = "|".join(QUALITY_WORDS)
    num_alt = "|".join(NUMBER_WORDS)
    pat = (rf"\b(an?\s+)?({qual_alt})\s+({num_alt})\b[^.\n]{{0,32}}?"
           r"\b(\d{1,2})\s*(?:semitones?|half[- ]steps?|frets?)\b")
    for m in re.finditer(pat, line, re.I):
        q = QUALITY_WORDS[m.group(2).lower()]
        n = NUMBER_WORDS[m.group(3).lower()]
        claimed = int(m.group(4))
        expected = interval_semitones(q, n)
        if expected is None:
            findings.append(Finding(
                path, lineno,
                f"{m.group(2)} {m.group(3)} is not a valid interval",
                f"a {m.group(3)} cannot be {m.group(2)}", "interval"))
            continue
        _record("interval", m.group(0))
        if claimed != expected:
            findings.append(Finding(
                path, lineno,
                f"{m.group(2)} {m.group(3)} given as {claimed} semitones",
                f"{expected} semitones", "interval"))


def _check_interval_inversion(path, lineno, line, findings):
    qual_alt = "|".join(QUALITY_WORDS)
    num_alt = "|".join(NUMBER_WORDS)
    pat = (rf"\b({qual_alt})\s+({num_alt})\b[^.\n]{{0,28}}?\binver(?:ts|sion|ted)\b"
           rf"[^.\n]{{0,28}}?\b({qual_alt})\s+({num_alt})\b")
    for m in re.finditer(pat, line, re.I):
        q1, n1 = QUALITY_WORDS[m.group(1).lower()], NUMBER_WORDS[m.group(2).lower()]
        q2, n2 = QUALITY_WORDS[m.group(3).lower()], NUMBER_WORDS[m.group(4).lower()]
        eq, en = invert_interval(q1, n1)
        _record("inversion", m.group(0))
        if (q2, n2) != (eq, en):
            rq = {v: k for k, v in QUALITY_WORDS.items()}[eq]
            rn = {v: k for k, v in NUMBER_WORDS.items()}[en]
            findings.append(Finding(
                path, lineno,
                f"{m.group(1)} {m.group(2)} inverts to {m.group(3)} {m.group(4)}",
                f"{rq} {rn}", "inversion"))


def _check_enharmonic(path, lineno, line, findings):
    pat = (rf"\b({NOTE_TOKEN})\s*(?:=|≡|is enharmonic(?:ally)? (?:equal|equivalent) to)\s*"
           rf"({NOTE_TOKEN}){NOTE_END}")
    for m in re.finditer(pat, line):
        a, b = Note.parse(m.group(1)), Note.parse(m.group(2))
        if a is None or b is None or a.alter == b.alter == 0:
            continue
        _record("enharmonic", m.group(0))
        if a.pc != b.pc:
            findings.append(Finding(
                path, lineno, f"{a} = {b}",
                f"{a} is pitch class {a.pc}, {b} is {b.pc} — not enharmonic",
                "enharmonic"))


def _check_roman_quality(path, lineno, line, findings):
    # "in C major, vi is A minor"  /  "in the key of D, V = A major"
    pat = (rf"\bin\s+(?:the key of\s+)?({NOTE_TOKEN})\s*(major|minor)?\s*,?\s*"
           r"(?:the\s+)?([b#♭♯]?[ivxIVX]{1,4})\s*(?:chord)?\s*"
           rf"(?:is|=)\s*({NOTE_TOKEN})\s*(major|minor|diminished|augmented)?\b")
    for m in re.finditer(pat, line):
        tonic = Note.parse(m.group(1))
        mode = (m.group(2) or "major").lower()
        roman = parse_roman(m.group(3))
        claimed_root = Note.parse(m.group(4))
        claimed_qual = (m.group(5) or "").lower()
        if tonic is None or roman is None or claimed_root is None:
            continue
        degree, upper, suffix, prefix = roman
        if prefix:
            continue  # borrowed / altered degrees: out of scope for the naive check
        got = diatonic_triad(tonic, mode, degree)
        if got is None:
            continue
        exp_root, exp_qual = got
        _record("roman", m.group(0))
        if exp_root.ascii() != claimed_root.ascii():
            findings.append(Finding(
                path, lineno,
                f"in {tonic} {mode}, {m.group(3)} given as {claimed_root}",
                f"{exp_root} ({exp_qual})", "roman"))
        elif claimed_qual and claimed_qual != exp_qual:
            findings.append(Finding(
                path, lineno,
                f"in {tonic} {mode}, {m.group(3)} given as {claimed_root} {claimed_qual}",
                f"{exp_root} {exp_qual}", "roman"))


def _check_relative_keys(path, lineno, line, findings):
    pat = (rf"\b(?:the\s+)?relative (minor|major) of\s+({NOTE_TOKEN})\s*(major|minor)?\s*"
           rf"(?:is|=)\s*({NOTE_TOKEN})")
    for m in re.finditer(pat, line, re.I):
        want = m.group(1).lower()
        src = Note.parse(m.group(2))
        claimed = Note.parse(m.group(4))
        if src is None or claimed is None:
            continue
        expected = relative_minor(src) if want == "minor" else relative_major(src)
        _record("relative", m.group(0))
        if expected.ascii() != claimed.ascii():
            findings.append(Finding(
                path, lineno,
                f"relative {want} of {src} given as {claimed}",
                str(expected), "relative"))


# --------------------------------------------------------------------------
# Walk
# --------------------------------------------------------------------------

def check_file(path, findings):
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return 0
    lines = text.splitlines()
    in_frontmatter = False
    for i, line in enumerate(lines, 1):
        if i == 1 and line.strip() == "---":
            in_frontmatter = True
            continue
        if in_frontmatter:
            if line.strip() == "---":
                in_frontmatter = False
            continue
        check_line(path, i, line, findings)

    # Tables get a second, header-aware pass — the line-level extractors can't
    # see which column a cell is in.
    i = 0
    while i < len(lines) - 1:
        line = lines[i]
        if line.lstrip().startswith("|") and _is_separator(lines[i + 1]):
            header = _split_row(line)
            rows = []
            j = i + 2
            while j < len(lines) and lines[j].lstrip().startswith("|"):
                rows.append((j - (i + 2), lines[j]))
                j += 1
            _check_table(path, i + 1, header, rows, findings)
            i = j
        else:
            i += 1
    return 1


def run(paths, quiet=False):
    findings = []
    files = 0
    for base in paths:
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            files += check_file(path, findings)
    return files, findings


# --------------------------------------------------------------------------
# Selftest — verify the engine, not the vault
# --------------------------------------------------------------------------

def selftest():
    """The checker is only worth anything if its own arithmetic is right."""
    fails = []

    def eq(got, want, label):
        if got != want:
            fails.append(f"{label}: got {got!r}, want {want!r}")

    eq(SHARP_ORDER, ["F", "C", "G", "D", "A", "E", "B"], "sharp order")
    eq(FLAT_ORDER, ["B", "E", "A", "D", "G", "C", "F"], "flat order")

    eq(notes_str(build_scale(Note.parse("C"), "major")),
       "C D E F G A B", "C major")
    eq(notes_str(build_scale(Note.parse("F#"), "major")),
       "F♯ G♯ A♯ B C♯ D♯ E♯", "F# major")
    eq(notes_str(build_scale(Note.parse("Cb"), "major")),
       "C♭ D♭ E♭ F♭ G♭ A♭ B♭", "Cb major")
    eq(notes_str(build_scale(Note.parse("A"), "natural minor")),
       "A B C D E F G", "A natural minor")
    eq(notes_str(build_scale(Note.parse("A"), "harmonic minor")),
       "A B C D E F G♯", "A harmonic minor")
    eq(notes_str(build_scale(Note.parse("D"), "dorian")),
       "D E F G A B C", "D dorian")
    eq(notes_str(build_scale(Note.parse("Eb"), "lydian")),
       "E♭ F G A B♭ C D", "Eb lydian")
    eq(notes_str(build_scale(Note.parse("B"), "locrian")),
       "B C D E F G A", "B locrian")
    eq(notes_str(build_scale(Note.parse("A"), "minor pentatonic")),
       "A C D E G", "A minor pentatonic")
    eq(notes_str(build_scale(Note.parse("A"), "blues")),
       "A C D E♭ E G", "A blues")

    eq(key_signature("Ab", "major"), (4, "flats", ["B", "E", "A", "D"]), "Ab major sig")
    eq(key_signature("A", "major"), (3, "sharps", ["F", "C", "G"]), "A major sig")
    eq(key_signature("C", "major"), (0, "none", []), "C major sig")
    eq(key_signature("F#", "minor"), (3, "sharps", ["F", "C", "G"]), "F# minor sig")

    eq(str(relative_minor(Note.parse("Eb"))), "C", "relative minor of Eb")
    eq(str(relative_major(Note.parse("C#"))), "E", "relative major of C#")

    eq(interval_semitones("M", 3), 4, "major third")
    eq(interval_semitones("m", 3), 3, "minor third")
    eq(interval_semitones("P", 5), 7, "perfect fifth")
    eq(interval_semitones("d", 5), 6, "diminished fifth")
    eq(interval_semitones("A", 4), 6, "augmented fourth")
    eq(interval_semitones("M", 4), None, "major fourth is invalid")
    eq(invert_interval("M", 3), ("m", 6), "invert M3")
    eq(invert_interval("P", 5), ("P", 4), "invert P5")
    eq(invert_interval("A", 2), ("d", 7), "invert A2")

    eq(notes_str(build_chord(Note.parse("C"), "major seventh")),
       "C E G B", "Cmaj7")
    eq(notes_str(build_chord(Note.parse("Ab"), "minor")),
       "A♭ C♭ E♭", "Ab minor")
    eq(notes_str(build_chord(Note.parse("C#"), "diminished seventh")),
       "C♯ E G B♭", "C#dim7")
    eq(notes_str(build_chord(Note.parse("B"), "half-diminished")),
       "B D F A", "Bm7b5")
    eq(notes_str(build_chord(Note.parse("G"), "dominant seventh")),
       "G B D F", "G7")

    got = diatonic_triad(Note.parse("C"), "major", 6)
    eq((str(got[0]), got[1]), ("A", "minor"), "vi of C major")
    got = diatonic_triad(Note.parse("D"), "major", 7)
    eq((str(got[0]), got[1]), ("C♯", "diminished"), "vii of D major")
    got = diatonic_triad(Note.parse("A"), "minor", 3)
    eq((str(got[0]), got[1]), ("C", "major"), "III of A minor")

    eq(Note.parse("E#").pc, Note.parse("F").pc, "E# = F")
    eq(Note.parse("Cb").pc, Note.parse("B").pc, "Cb = B")

    # The extractors must actually fire, and must actually catch a wrong claim.
    probe = []
    check_line(Path("probe.md"), 1, "The order of sharps: F C G D A E B", probe)
    if probe:
        fails.append("clean accidental-order line produced a finding")
    check_line(Path("probe.md"), 2, "The order of sharps: F C G D E A B", probe)
    if not probe:
        fails.append("wrong accidental order was not caught")
    probe.clear()
    check_line(Path("probe.md"), 3, "A♭ major → B♭ E♭ A♭ D♭", probe)
    if probe:
        fails.append("correct key signature produced a finding")
    check_line(Path("probe.md"), 4, "A♭ major → B♭ E♭ A♭ G♭", probe)
    if not probe:
        fails.append("wrong key signature was not caught")
    probe.clear()
    check_line(Path("probe.md"), 5,
               "five key centers: C melodic minor → F major → E♭ major → D♭ major", probe)
    if probe:
        fails.append("a chain of key centres was read as a key-signature listing")

    if fails:
        print("SELFTEST FAILED")
        for f in fails:
            print("  -", f)
        return 1
    print("selftest ok")
    return 0


# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--selftest", action="store_true", help="verify the engine's own arithmetic")
    ap.add_argument("--list-claims", action="store_true", help="print every claim extracted")
    ap.add_argument("--path", action="append", help="check this directory instead of the defaults")
    ap.add_argument("--quiet", action="store_true", help="print failures only")
    args = ap.parse_args()

    if args.selftest:
        return selftest()

    if args.path:
        paths = [Path(p) if Path(p).is_absolute() else VAULT / p for p in args.path]
    else:
        paths = [VAULT / d for d in SCAN_DIRS]

    files, findings = run(paths, quiet=args.quiet)

    if args.list_claims:
        by_kind = {}
        for kind, text in CLAIMS_SEEN:
            by_kind.setdefault(kind, []).append(text)
        for kind in sorted(by_kind):
            print(f"\n### {kind} ({len(by_kind[kind])})")
            for t in by_kind[kind]:
                print("   ", t[:150])
        print()

    if findings:
        print(f"school-theory-check: {len(findings)} problem(s) "
              f"in {files} file(s)\n")
        for f in findings:
            print(f.render(VAULT))
            print()
        return 1

    if not args.quiet:
        print(f"school-theory-check: {files} file(s) scanned, "
              f"{len(CLAIMS_SEEN)} claim(s) verified, no problems found")
    return 0


if __name__ == "__main__":
    sys.exit(main())
