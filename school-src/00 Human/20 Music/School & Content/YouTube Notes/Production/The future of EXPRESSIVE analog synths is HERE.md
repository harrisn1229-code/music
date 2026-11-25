---
type: yt-note
date: 2026-08-30
source: youtube
url: https://www.youtube.com/watch?v=qOufgHs9-1s
channel: Anthony Marinelli Music
duration: "00:39:09"
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, synthesis, mpe, expression, vintage]
---

# The future of EXPRESSIVE analog synths is HERE

![](https://www.youtube.com/watch?v=qOufgHs9-1s)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=qOufgHs9-1s)

## Synopsis

Anthony Marinelli and expressive-controller specialist Josh Mattoff drive four vintage ARP 2600s and a Moog Modular 3C — one voice each, genuinely voltage-controlled hardware with no MIDI input — using a Haken Continuum and an Osmose through a MIDI-to-CV converter. The single most technically dense video in this batch: a complete, reusable patch template for bringing per-note continuous expression (pressure, position, pitch) into real analog synthesizer voices.

## Techniques

- **MPE fundamentals**: every new note opens its own MIDI channel (up to 15), carrying continuous independent pressure/aftertouch/pitch-bend tracking per note.
- **CVC (Control Voltage Converter)** converts that per-channel MPE data into actual CV signals a vintage analog synth's inputs can use directly; multiple CVCs can be networked, or a dedicated CVC Expander used, for more independent voices than one converter alone supports.
- **The four-signal patch template (W/X/Y/Z), applied identically across every voice**: W → envelope generator gate, X → oscillator pitch (1V/octave, multed to all oscillators on that voice), Y → filter cutoff, Z → VCA volume (the actual note-on gate).
- **A genuinely reusable soft-attack trick**: route W into a SHORT-decay envelope generator, so a light key touch doesn't generate enough voltage to cross that envelope's trigger threshold at all — soft playing produces a slow, brass-like swell from Z's continuous VCA gate alone, while harder playing crosses the threshold and adds the envelope's transient spike. One physical gesture controls whether a note even has an attack transient, with no separate velocity-to-amount mapping needed. Reads as two independent stages per note: volume-without-brightness first (Z, first half of key travel), then brightness (Y, second half).
- **Declicking a CV gate**: patch the gate signal through the ARP 2600's voltage-processor lag processor before the VCA's linear input — rounds the gate's sharp edges and removes an audible click at note-on.
- **Sustain via MIDI CC**: a continuous 0-127 control mappable to specific CC numbers per voice, grabbable independently and automatable from a DAW.
- **The "violin section" ensemble trick**: assign each note of a chord to a physically different unit of the same synth model (four individually-drifted ARP 2600s, one per note) for natural same-but-different character across a chord, the way a real string section's individually-built instruments differ.
- **Design philosophy**: with this much continuous per-note expression from the hands, deliberately dial back the traditionally elaborate internal modulation/filter-sweep programming — most of the expressive motion should come from touch, not pre-programmed modulation, or the two fight each other.

## Routed to

- [[Expressive Controllers and CV Conversion]] — new technique note created and registered in [[Synthesis Index]], carrying the full patch template and all techniques above.
- [[MPE Piano Roll Tools]] — new `## From videos` bullet cross-referencing the new note.

## Source

- [The future of EXPRESSIVE analog synths is HERE](https://www.youtube.com/watch?v=qOufgHs9-1s) — Anthony Marinelli Music (feat. Josh Mattoff), 39:09. Captions, high confidence.
