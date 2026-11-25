#!/usr/bin/env python3
"""
school-eartrain-render.py — render the ear-training clips for the Music School
placement assessment (spec-142, Phase 1).

Pure Python 3 standard library. No pip installs, no ffmpeg, no soundfont required.

Renders 16-bit / 44.1 kHz / mono WAVs into
    00 Human/20 Music/School & Content/Curriculum/Audio/ear-NN.wav
one per EAR-NN question in the placement test.

Synthesis is additive (fundamental + 3 harmonics) with a fast attack and an
exponential decay — a piano-ish tone that is unambiguous for interval, chord,
scale and progression identification without needing sampled instruments.

If `fluidsynth` and a GM soundfont are both present, they are preferred for a
nicer timbre; otherwise the built-in synth is used. Either path produces the
same pitches, so the answer key is valid regardless of which ran.

Usage
    python3 school-eartrain-render.py              # render missing clips
    python3 school-eartrain-render.py --force      # re-render everything
    python3 school-eartrain-render.py --list       # show clips, write nothing
    python3 school-eartrain-render.py --selftest   # verify rendered pitches

--selftest is the important one: a wrong MIDI number produces a perfectly valid
WAV of the wrong note, which would silently invalidate both the clip and its
answer-key entry. The selftest runs a Goertzel filter at each expected pitch and
asserts it dominates both neighbouring semitones. It exits non-zero on failure.
"""

import argparse
import math
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

SAMPLE_RATE = 44100
AMPLITUDE = 0.22
HARMONICS = ((1, 1.0), (2, 0.42), (3, 0.18), (4, 0.09))
ATTACK_S = 0.010
DECAY_K = 2.2
TAIL_S = 0.45

VAULT_ROOT = Path(__file__).resolve().parents[2]
AUDIO_DIR = VAULT_ROOT / "00 Human" / "20 Music" / "School & Content" / "Curriculum" / "Audio"
SOUNDFONT = Path("/usr/share/sounds/sf2/default-GM.sf2")


# --------------------------------------------------------------------------
# Clip definitions
#
# Each event is {"notes": [midi...], "start": seconds, "dur": seconds}.
# Middle C = MIDI 60. Everything sits in C or A centres so that timbre and
# register never become the confound instead of the interval/quality itself.
# --------------------------------------------------------------------------

def _melodic(a, b, dur=0.85, gap=0.0):
    return [{"notes": [a], "start": 0.0, "dur": dur},
            {"notes": [b], "start": dur + gap, "dur": dur}]


def _harmonic(notes, dur=1.8):
    return [{"notes": list(notes), "start": 0.0, "dur": dur}]


def _sequence(chords, dur=1.05):
    return [{"notes": list(ch), "start": i * dur, "dur": dur}
            for i, ch in enumerate(chords)]


def _scale(notes, dur=0.42):
    return [{"notes": [n], "start": i * dur, "dur": dur}
            for i, n in enumerate(notes)]


CLIPS = [
    # --- Interval identification (6) ---
    {"id": "ear-01", "answer": "Perfect 5th",
     "events": _melodic(60, 67)},                       # C4 -> G4
    {"id": "ear-02", "answer": "Major 3rd",
     "events": _melodic(60, 64)},                       # C4 -> E4
    {"id": "ear-03", "answer": "Minor 3rd",
     "events": _melodic(57, 60)},                       # A3 -> C4
    {"id": "ear-04", "answer": "Tritone",
     "events": _harmonic([60, 66])},                    # C4 + F#4
    {"id": "ear-05", "answer": "Major 6th (descending)",
     "events": _melodic(69, 60)},                       # A4 -> C4
    {"id": "ear-06", "answer": "Minor 7th",
     "events": _melodic(60, 70)},                       # C4 -> Bb4

    # --- Chord quality identification (5) ---
    {"id": "ear-07", "answer": "Major triad",
     "events": _harmonic([60, 64, 67])},                # C  E  G
    {"id": "ear-08", "answer": "Minor triad",
     "events": _harmonic([60, 63, 67])},                # C  Eb G
    {"id": "ear-09", "answer": "Diminished triad",
     "events": _harmonic([60, 63, 66])},                # C  Eb Gb
    {"id": "ear-10", "answer": "Dominant 7th",
     "events": _harmonic([60, 64, 67, 70])},            # C  E  G  Bb
    {"id": "ear-11", "answer": "Half-diminished 7th",
     "events": _harmonic([60, 63, 66, 70])},            # C  Eb Gb Bb

    # --- Scale / mode identification (3) ---
    {"id": "ear-12", "answer": "Major scale",
     "events": _scale([60, 62, 64, 65, 67, 69, 71, 72])},
    {"id": "ear-13", "answer": "Natural minor scale",
     "events": _scale([57, 59, 60, 62, 64, 65, 67, 69])},
    {"id": "ear-14", "answer": "Dorian mode",
     "events": _scale([62, 64, 65, 67, 69, 71, 72, 74])},

    # --- Progression identification (3) ---
    {"id": "ear-15", "answer": "I - V - vi - IV",
     "events": _sequence([[60, 64, 67], [59, 62, 67],
                          [60, 64, 69], [60, 65, 69]])},
    {"id": "ear-16", "answer": "ii7 - V7 - Imaj7",
     "events": _sequence([[62, 65, 69, 72], [55, 59, 62, 65],
                          [60, 64, 67, 71]])},
    {"id": "ear-17", "answer": "I - V/V - V",
     "events": _sequence([[60, 64, 67], [62, 66, 69, 72],
                          [59, 62, 67]])},

    # --- Cadence identification (1) ---
    {"id": "ear-18", "answer": "Deceptive cadence",
     "events": _sequence([[60, 64, 67], [60, 65, 69],
                          [59, 62, 67], [60, 64, 69]])},

    # --- Blues / jazz idiom (2) ---
    # C7 -> F7: the blues habit of making the tonic a dominant 7th too.
    # Both root position. NOTE: F7 needs its E-flat (63/75) — [60,65,69,72] is
    # an F major triad over C, which would not match the "both dominant" answer.
    {"id": "ear-19", "answer": "I7 to IV7 (both dominant 7ths)",
     "events": _sequence([[60, 64, 67, 70], [65, 69, 72, 75]], dur=1.4)},
    # Dm7b5 -> G7 -> Cm: the minor ii-V-i.
    {"id": "ear-20", "answer": "Minor ii-V-i (iiø7 - V7 - i)",
     "events": _sequence([[62, 65, 68, 72], [55, 59, 62, 65],
                          [60, 63, 67]], dur=1.25)},
]


def midi_to_freq(midi):
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))


def clip_duration(clip):
    return max(e["start"] + e["dur"] for e in clip["events"]) + TAIL_S


# --------------------------------------------------------------------------
# Built-in additive synthesis
# --------------------------------------------------------------------------

def render_samples(clip):
    total = clip_duration(clip)
    n = int(SAMPLE_RATE * total)
    buf = [0.0] * n

    for event in clip["events"]:
        start_i = int(event["start"] * SAMPLE_RATE)
        length = int((event["dur"] + TAIL_S) * SAMPLE_RATE)
        voices = max(1, len(event["notes"]))
        freqs = [midi_to_freq(m) for m in event["notes"]]

        for i in range(length):
            idx = start_i + i
            if idx >= n:
                break
            t = i / SAMPLE_RATE
            env = min(t / ATTACK_S, 1.0) * math.exp(-DECAY_K * t)
            # Only bail once the note has actually decayed — during the attack
            # the envelope is legitimately near zero (it starts AT zero), so an
            # unguarded test here silently truncates every note to nothing.
            if t > ATTACK_S and env < 1e-5:
                break
            s = 0.0
            for f in freqs:
                for h, g in HARMONICS:
                    s += g * math.sin(2.0 * math.pi * f * h * t)
            buf[idx] += env * AMPLITUDE * s / voices

    return buf


def write_wav(path, samples):
    path.parent.mkdir(parents=True, exist_ok=True)
    frames = bytearray()
    for v in samples:
        iv = int(max(-1.0, min(1.0, v)) * 32767)
        frames += struct.pack("<h", iv)
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(bytes(frames))


# --------------------------------------------------------------------------
# Optional fluidsynth path (better timbre; identical pitches)
# --------------------------------------------------------------------------

def fluidsynth_available():
    return bool(shutil.which("fluidsynth")) and SOUNDFONT.exists()


def _vlq(n):
    out = [n & 0x7F]
    n >>= 7
    while n:
        out.append((n & 0x7F) | 0x80)
        n >>= 7
    return bytes(reversed(out))


def render_with_fluidsynth(clip, path):
    """Build a tiny type-0 MIDI file, then let fluidsynth render it to WAV."""
    tpqn = 480
    tempo_us = 500000  # 120 bpm -> 1 beat = 0.5 s
    def sec_to_ticks(s):
        return int(round(s / (tempo_us / 1_000_000.0) * tpqn))

    events = []  # (tick, priority, bytes)
    for ev in clip["events"]:
        on = sec_to_ticks(ev["start"])
        off = sec_to_ticks(ev["start"] + ev["dur"])
        for m in ev["notes"]:
            events.append((on, 1, bytes([0x90, m, 96])))
            events.append((off, 0, bytes([0x80, m, 0])))
    events.sort(key=lambda e: (e[0], e[1]))

    track = bytearray()
    track += b"\x00\xff\x51\x03" + tempo_us.to_bytes(3, "big")
    track += b"\x00\xc0\x00"  # program 0 = Acoustic Grand
    prev = 0
    for tick, _, data in events:
        track += _vlq(tick - prev) + data
        prev = tick
    track += _vlq(sec_to_ticks(TAIL_S)) + b"\xff\x2f\x00"

    header = b"MThd" + (6).to_bytes(4, "big") + (0).to_bytes(2, "big") + \
             (1).to_bytes(2, "big") + tpqn.to_bytes(2, "big")
    midi = header + b"MTrk" + len(track).to_bytes(4, "big") + bytes(track)

    with tempfile.NamedTemporaryFile(suffix=".mid", delete=False) as fh:
        fh.write(midi)
        mid_path = fh.name
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            ["fluidsynth", "-ni", "-g", "0.8", "-r", str(SAMPLE_RATE),
             "-F", str(path), str(SOUNDFONT), mid_path],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    finally:
        os.unlink(mid_path)


# --------------------------------------------------------------------------
# Goertzel pitch verification
# --------------------------------------------------------------------------

def goertzel(samples, freq, rate=SAMPLE_RATE):
    """Magnitude of `freq` in `samples`. Standard Goertzel, no FFT needed."""
    n = len(samples)
    if n == 0:
        return 0.0
    k = int(0.5 + (n * freq) / rate)
    omega = (2.0 * math.pi * k) / n
    coeff = 2.0 * math.cos(omega)
    s0 = s1 = s2 = 0.0
    for x in samples:
        s0 = x + coeff * s1 - s2
        s2 = s1
        s1 = s0
    return math.sqrt(s1 * s1 + s2 * s2 - coeff * s1 * s2)


def read_wav(path):
    with wave.open(str(path), "r") as w:
        if w.getsampwidth() != 2:
            raise ValueError(f"{path.name}: expected 16-bit")
        rate = w.getframerate()
        raw = w.readframes(w.getnframes())
    data = struct.unpack("<%dh" % (len(raw) // 2), raw)
    return [v / 32768.0 for v in data], rate


_QUALITIES = {
    (0, 4, 7): "major", (0, 3, 7): "minor", (0, 3, 6): "dim", (0, 4, 8): "aug",
    (0, 2, 7): "sus2", (0, 5, 7): "sus4",
    (0, 4, 7, 10): "dom7", (0, 4, 7, 11): "maj7", (0, 3, 7, 10): "min7",
    (0, 3, 6, 10): "half-dim7", (0, 3, 6, 9): "dim7", (0, 4, 7, 9): "6",
}


def name_chord(midi_notes):
    """Best-effort chord name from pitch classes. Returns None if unrecognized."""
    pcs = sorted(set(m % 12 for m in midi_notes))
    names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    for root in pcs:
        shape = tuple(sorted((p - root) % 12 for p in pcs))
        if shape in _QUALITIES:
            return f"{names[root]} {_QUALITIES[shape]}"
    return None


def theory_report():
    """Print the chord quality of every polyphonic event.

    The Goertzel selftest proves the WAV matches the clip spec — it cannot tell
    you the spec itself encodes the wrong chord. That bug is real: ear-19's IV7
    was first written [60,65,69,72], an F major triad over C with no E-flat,
    which would have contradicted its own answer key. Read this output against
    intent whenever clips are added or changed.
    """
    for clip in CLIPS:
        poly = [e for e in clip["events"] if len(e["notes"]) >= 3]
        if not poly:
            continue
        named = [name_chord(e["notes"]) or "UNRECOGNIZED" for e in poly]
        flag = "  <-- CHECK" if "UNRECOGNIZED" in named else ""
        print(f"  {clip['id']}  {clip['answer']:34s} {' -> '.join(named)}{flag}")


def selftest():
    failures = []
    for clip in CLIPS:
        path = AUDIO_DIR / f"{clip['id']}.wav"
        if not path.exists():
            failures.append(f"{clip['id']}: missing file")
            continue

        samples, rate = read_wav(path)
        dur = len(samples) / rate
        expected = clip_duration(clip)
        if abs(dur - expected) > 0.35:
            failures.append(
                f"{clip['id']}: duration {dur:.2f}s, expected ~{expected:.2f}s")

        rms = math.sqrt(sum(v * v for v in samples) / max(1, len(samples)))
        if not (0.005 < rms < 0.5):
            failures.append(f"{clip['id']}: RMS {rms:.4f} out of range")

        # Pitch check: every note must dominate its semitone neighbours.
        for ev in clip["events"]:
            a = int((ev["start"] + 0.04) * rate)
            b = min(len(samples), int((ev["start"] + min(ev["dur"], 0.35)) * rate))
            window = samples[a:b]
            if len(window) < 512:
                continue
            for m in ev["notes"]:
                f = midi_to_freq(m)
                mag = goertzel(window, f, rate)
                lo = goertzel(window, midi_to_freq(m - 1), rate)
                hi = goertzel(window, midi_to_freq(m + 1), rate)
                if mag < 1.5 * max(lo, hi):
                    failures.append(
                        f"{clip['id']}: MIDI {m} ({f:.1f} Hz) not dominant "
                        f"(mag {mag:.1f} vs neighbours {lo:.1f}/{hi:.1f})")

    if failures:
        print("SELFTEST FAILED")
        for f in failures:
            print("  ✗", f)
        return 1

    print(f"SELFTEST PASSED — {len(CLIPS)} clips, pitch-verified via Goertzel")
    return 0


# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="re-render existing clips")
    ap.add_argument("--list", action="store_true", help="list clips, write nothing")
    ap.add_argument("--selftest", action="store_true", help="verify rendered pitches")
    ap.add_argument("--theory", action="store_true",
                    help="print each polyphonic clip's chord quality for eyeball check")
    ap.add_argument("--stdlib", action="store_true",
                    help="force built-in synth even if fluidsynth is available")
    args = ap.parse_args()

    if args.list:
        for c in CLIPS:
            notes = sum(len(e["notes"]) for e in c["events"])
            print(f"{c['id']}  {clip_duration(c):5.2f}s  "
                  f"{len(c['events']):2d} events / {notes:2d} notes   {c['answer']}")
        return 0

    if args.theory:
        theory_report()
        return 0

    if args.selftest:
        rc = selftest()
        print("\nchord-quality report (verify against intent):")
        theory_report()
        return rc

    use_fs = fluidsynth_available() and not args.stdlib
    print(f"renderer: {'fluidsynth + ' + SOUNDFONT.name if use_fs else 'built-in stdlib synth'}")

    written = skipped = 0
    for clip in CLIPS:
        path = AUDIO_DIR / f"{clip['id']}.wav"
        if path.exists() and not args.force:
            skipped += 1
            continue
        if use_fs:
            render_with_fluidsynth(clip, path)
        else:
            write_wav(path, render_samples(clip))
        written += 1
        print(f"  wrote {path.name}  ({path.stat().st_size:,} bytes)  {clip['answer']}")

    print(f"done — {written} written, {skipped} skipped (use --force to re-render)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
