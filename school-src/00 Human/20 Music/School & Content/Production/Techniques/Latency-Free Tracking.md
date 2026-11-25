---
type: technique
title: Latency-Free Tracking
tags: [technique, recording, latency, ableton]
created: 2026-07-16
swept: 2026-07-19
---

# Latency-Free Tracking

Getting Ableton to record on the grid while the performer hears a fully-produced monitor mix. Two layers: the settings (fix most of it) and the **ghost latency track** (fix all of it). Source: Kenny Beats' template workflow, used on ~150 released songs. Note: tracking through the Apollo's **UAD Console** (DSP monitoring) sidesteps most of this — this page is for when monitoring runs *through Ableton plugins* instead.

## Layer 1 — The settings (do these once)

1. **Options → Reduced Latency When Monitoring: ON.** The first switch to flip.
2. **Buffer size 128 while tracking (64 if the machine allows), never 1024** — Preferences → Audio. Kenny's demo: ~26 ms → ~6 ms overall latency just from this. Big buffers are for mixing sessions, small for recording. Under ~3 ms is unnoticeable to most performers.
3. **Driver Error Compensation to ~0 ms** — after setting the buffer, trim the compensation field until the overall-latency readout reads as close to zero as possible (6 ms → 0.05 ms in his demo).
4. **Track vocals in a separate session from the beat** — bounce the beat to a 2-track first: CPU stays fast at low buffer, and the bounce commits you ("imperfections you were gonna fix end up making the song").
5. **Simple plugins while tracking** — CPU-heavy chains re-add latency; run [[Pro-Q 4]] in **Zero Latency mode while tracking, Natural Phase when mixing**, and keep zero-latency processors ([[Pro-DS]] wideband) in the monitor chain.

## Layer 2 — The ghost latency track (the game-saver)

Duplicate the tracking track so **both record the same input simultaneously**:

| | Tracking track | Latency (ghost) track |
|---|---|---|
| Monitoring | **In** (performer hears it) | **Off** (critical) |
| Devices | Full monitor chain — gate, EQ, comp, verb, tune, whatever feels good | **None. Zero plugins.** |
| Output | Master (through the mix bus) | **Ext. Out 1/2 (a spare hardware pair) — NOT the master** |

- The FX-track take prints **late** (it wears every plugin + mixbus delay); the ghost take prints **on the grid**.
- Keep the ghost take: drag it into the vocal/guitar **group** — the group carries the same chain ([[2 Main Vocal Group|Main Vocal Group]]), so playback sounds exactly like (or better than) what the performer heard, perfectly in time.
- Hitting record arms both tracks every take — no per-take setup; label the pair `tracking` / `latency` permanently in the template.
- **Multi-mic sources scale it:** 2 mics on a guitar = 4 tracks armed (each mic gets an FX track + a ghost track).
- Bonus psychology: make the group chain slightly nicer than the headphone chain — artists hear the drag-down playback sounding *better* than their take felt, and push harder.

## A full-chain example (not just latency-fixing)

Kuk Harrell builds a complete, finished-sounding effects chain (EQ, comp, RVox, reverb/delay/doubler sends) live in the artist's monitor while they sing, not just a lean gate+EQ — the stated payoff matches this note's Layer 2 psychology directly: "when I'm cutting this, he's actually singing to this... creating it in his headphone to sound like a finished product, like a mix," which "helps me to dictate the right pocket." Full recipe on [[1 Main Vocal Track]]. → Kuk Harrell, [[Radio-ready vocal effects with Kuk Harrell]]

- 🎬 *From video:* a second, independent source describing the same underlying discipline with a distinct mechanism — Andrés Torres and Mauricio Rengifo's **dual-channel "auxiliary input" setup**: the mic feeds two channels at once, one carrying the plain take (what actually gets comped/edited), the other carrying a live-autotuned/processed monitor feed used only so the room can judge in the moment whether more takes are needed — the processed feed is never the keeper. Extended past Kuk Harrell's vocal-only framing to a general production principle stated directly on camera: "if you're going to play a guitar and you're using compression and equalization, the guitar is sounding spectacular, you play differently, you play better" — applied back to vocals as delay + reverb + stereo widening fed live to the singer's monitor so they can perform (their words: "close his eyes... not thinking about anything") rather than self-monitor pitch/timing. A companion move on the same video: keeping the control room quiet and not interrupting the singer mid-take is named as a direct benefit of the auxiliary-input setup, not a separate discipline — see [[Vocal Comping and Takes]] and [[Vocal Mic Technique]]. → [[1 Main Vocal Track]], [[Width and Stereo]] — Mix with the Masters (Andrés Torres and Mauricio Rengifo), [[Vocal production with Andrés Torres and Mauricio Rengifo]]

- 🎬 *From video:* a concrete, product-and-setting-level instance of the UAD-interface-sidesteps-latency path flagged in this note's intro — the artist monitors live through a UAD audio interface with Auto-Tune plus compression/limiting engaged in real time, "so that when Abel, or the artist, is hearing back, it feels very controlled," while nothing is printed to the take itself. Compressor recipe on the way in (maps to owned [[UAD Tube-Tech CL 1B mkII]]): Release Medium/Medium-fast, Attack Medium/Medium-slow, **Threshold left alone — level controlled entirely via Input drive**, targeting only slight needle movement (bumps to ~−1 dB, peaks −3 to −7 dB at most). Reverb monitored live plus a delay on a secondary Aux, so the take is sung against real space/repeats from the start. Stated reasoning for staying interface-direct over hardware/vintage mics (which are rated highly but not reached for): constant travel between studios makes a portable, consistent monitor chain matter more than hardware character that can't travel. Full chain: [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]]. → [[UAD Tube-Tech CL 1B mkII]], [[The Weeknd Vocal Chain]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]

## Chains that apply it

[[1 Main Vocal Track|Main Vocal Track]] · [[1 Acoustic Guitar Track|Acoustic Guitar Track]] · [[1 Electric Guitar Amp Track|Electric Guitar Amp Track]] · [[1 Electric Guitar DI Track|Electric Guitar DI Track]]

## Sources

Kenny Beats — [How to Record Without Any Latency in Ableton](https://youtu.be/Gj4_IvHFn6g) · [New Vocal Chain 2022](https://youtu.be/-SvBNOBWJ_8) · [Recording Vocals the Right Way](https://youtu.be/3Nw1d37nluo) · [Vocal Template](https://youtu.be/X_iDENABLmk) — Mix with the Masters (Kuk Harrell) — [[Radio-ready vocal effects with Kuk Harrell]] — Mix with the Masters (Andrés Torres and Mauricio Rengifo) — [[Vocal production with Andrés Torres and Mauricio Rengifo]] — Mix with the Masters (Illangelo) — [[Producing The Weeknd's vocals with Illangelo]] — pages in `20 Music/YouTube Notes/`
