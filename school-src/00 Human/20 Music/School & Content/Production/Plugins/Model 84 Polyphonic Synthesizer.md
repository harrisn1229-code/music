---
type: plugin
title: "Model 84 Polyphonic Synthesizer"
aliases: ["Model 84"]
category: Instrument
vendor: "Softube"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-19
visual_key: 2026-07-20
briefed: backlog
---

# Model 84 Polyphonic Synthesizer

![[Images/Model 84 Polyphonic Synthesizer.png]]

**Category:** Instrument
**Vendor:** Softube

## What it is

Softube's emulation of the **Roland Juno-106** (1984 — hence the name), faithfully replicating its six-voice structure, DCO-based oscillator section, and the famous onboard chorus.

## What it's used for

Classic analog polysynth sounds — lush pads, brass stabs, and vintage-style leads.

## FX chain notes

Used as the instrument source, often followed by chorus/ensemble and tape saturation for extra vintage character.

## Techniques

- **Owned stand-in for an unnamed "Juno emulation" run as the sole melodic/harmonic instrument across FIVE separate roles in one from-scratch 80s synthwave/pop beat — main pad, bass, a second "chorus-lift" pad, a pluck texture layer, and a bell counter-melody.** Only the term "Juno emulation" is used on-screen — no product name given, so the specific plugin can't be confirmed (a third sighting of this exact unidentified-Juno pattern on this channel, see [[Plugin Wishlist]]). Recipe repeats across the layers: pull attack/envelope (and on the second pad, also frequency) down for a dry starting tone, THEN add effects — chorus → [[Cassette]] → heavy reverb → EQ (cut lows, sometimes mids) → delay on the main pad; EQ (lows + mids) → delay → reverb on the second pad; reverb → delay → EQ → auto-pan on the pluck; and a **tape/ping-pong delay** ([[EchoBoy]] lane) on the bell. Each layer is reserved for a specific song moment (verse pad OUT/chorus pad IN, second pad only for the chorus lift, pluck only for the second half of the hook, bell only at the end of verses) rather than running throughout. → [[Cassette]], [[TAL-Chorus-LX]], [[EchoBoy]], [[BED Slot]], [[Synthwave]], [[5 Inst & Synth/1 Synth Bed Track|Synth Bed Track]], [[Layering and Stacking]] — loner, [how to make an 80's synthwave/pop beat for the weeknd.](https://www.youtube.com/watch?v=dWhh27UFWhY)
- **Owned stand-in for a named FREE Juno emulation, run "quite heavy" as the closing stage of a from-scratch '90s R&B Rhodes chain.** Building a Bryson Tiller-style chord bed with no real sampling involved: a Lounge Lizard Rhodes progression runs [[Cassette]] → chorus ([[TAL-Chorus-LX]]) → heavy reverb → heavy delay → EQ (cut lows + mids) → **"this Juno emulation... quite heavy on that as well. This is actually a free plugin, so definitely go get that"** — the specific product isn't confirmed on-screen (a free, Juno-60-style emulation likely means TAL-U-NO-62, distinct from the paid Arturia Analog Lab "Juno" already tracked elsewhere on this vault — see [[Plugin Wishlist]]); this instrument is the owned stand-in until it's identified/vetted. → [[Cassette]], [[TAL-Chorus-LX]], [[BED Slot]], [[Bryson Tiller Fake-Sample Chord Bed Chain]] — loner, [how to make smooth rnb beats for bryson tiller from scratch (no samples)](https://www.youtube.com/watch?v=ZMB_sqF_Y3Q)
- **Owned stand-in for the "Daft Punk plucky synth" Juno-106 recipe** — Daft Punk's melodic percussive plucky synth on Starboy's title track and "I Feel It Coming" (which The Weeknd's *Starboy*-era bassline draws from) is attributed to the real Juno-106; a beat-recreation used **Arturia's Jun-6 V** to get there — this instrument is the owned equivalent for that same patch, use the **Juno bass** patch recipe below (③ HPF position 0, ⑤ fast attack/short decay for the pluck) as the starting point. → [[Roland Juno-106]], [[Plugin Wishlist]] — loner, [the production secrets behind the weeknd's evolving sound!?](https://www.youtube.com/watch?v=GMeZtNImaT0)

## Manual

- 🌐 [Official web manual](https://www.softube.com/user-manuals/model-84-polyphonic-synthesizer) (Softube publishes web-only)
- 📄 Hardware original: [[Model 84 (hardware - Roland Juno-106).pdf|Roland Juno-106 Owner's Manual]] · [source (Roland CDN)](https://cdn.roland.com/assets/media/pdf/JUNO-106_OM.pdf) — the original manual explains the architecture better than any plugin doc.

**High-level points:**
- Signal path is one page: **DCO (saw + pulse + sub + noise, mixable) → stepped HPF → VCF → VCA → Chorus**. There are no menus; the whole synth is the front panel.
- The **DCO is digitally clocked** — always in tune, which is *why* the chorus is so important: it puts the analog wobble back.
- **Chorus I / II / I+II** is the identity of the instrument: I = subtle, II = wide/wobbly, both = broken-lush. (Softube models the chorus circuit's hiss too — there's a reduced-noise option.)
- The **HPF is stepped (4 positions)** and its lowest setting adds a low-end bump — the classic Juno bass trick.
- One envelope shared for filter and amp (with polarity/gate options) — patches are fast because there's nothing to overthink.
- Poly 1 / Poly 2 / Unison voice-assign modes replicate the 106's note-stealing behavior; Unison = the fat mono lead/bass mode.

## Key Parameters

```visual-key
image: Images/Model 84 Polyphonic Synthesizer.png
coords: Images/Model 84 Polyphonic Synthesizer.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| #   | Parameter                         | What it is / does                                                                     | Technique                                                                                                          | Artist / record example                                                                                |
| --- | --------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| ①   | DCO sliders (saw/pulse/sub/noise) | The only oscillator — mix the four sources                                            | Saw + sub = the entire pad/bass food group; pulse + PWM = strings                                                  | The Juno-106 is all over 80s synth-pop and modern bedroom pop/psych ([[Psych-Pop (Tame Impala)]] lane) |
| ②   | PWM (LFO/manual)                  | Pulse-width movement                                                                  | LFO-PWM pulse, no chorus = classic synth strings; add Chorus I for 80s ballad beds                                 | —                                                                                                      |
| ③   | HPF — the stepped "EQ" control    | 4-position high-pass before the filter (labelled EQ / Freq 0–3 on the Model 84 panel) | Position 0 = low bump (bass patches); position 2–3 thins pads so the mix's low end stays clean                     | The "HPF at 0" bass bump is a documented Juno community trick                                          |
| ④   | VCF Freq + Res                    | The filter — warm, musical, self-oscillates high                                      | Slow manual filter rides beat LFO automation for hooks; res ~30% keeps it creamy                                   | —                                                                                                      |
| ⑤   | Env → VCF amount + polarity       | How much the envelope sweeps the filter                                               | Inverted polarity + slow attack = pads that "bloom" downward                                                       | —                                                                                                      |
| ⑥   | Chorus I / II                     | The famous BBD stereo chorus                                                          | Saw+sub → Chorus II → slow filter = bedroom-pop/synthwave pad in 30 seconds (the [[Instrument Preset Map]] recipe) | The Juno chorus pad is the genre sound from 80s synth-pop through Tame Impala-lane psych               |
| ⑦   | LFO rate/delay                    | One LFO for pitch/PWM/filter                                                          | LFO *delay* = vibrato that fades in on held notes — instant expressive leads                                       | —                                                                                                      |
| ⑧   | Poly/Unison mode                  | Voice allocation (6 voices)                                                           | Unison + slight detune knob = fat mono bass that still sounds like *a Juno*, not a supersaw                        | —                                                                                                      |

*This one you play, not browse — see [[Instrument Preset Map]].*

## Patch Recipes

By **sound role** (slots defined in [[Sound Palette]]). Circled numbers = the matching row in the Key Parameters table above:

### 80s polysynth / Synthwave — [[BED Slot]] (bright + forward variant)
- ① Saw full + sub ~40–60%, pulse off
- ③ HPF position 1 (mud trimmed, body kept)
- ④ VCF ~75% open, res ~20% — **the brightness IS the forwardness**
- ⑤ Env → VCF: small amount, attack ~80–150 ms (played chords, not a swell)
- ⑥ **Chorus II ON** — non-negotiable, this is the sound
- ⑧ Poly 1
- Depth: drier than a normal bed — less send, minimal predelay; bright + dry = up front without extra level ([[Stereo Field]])
- The [[Synthwave]] pad/stab; The Midnight / FM-84 lane

### Juno bass — [[BASS Slot]]
- ① Square + sub full, saw off (or saw+sub for rounder)
- ③ **HPF position 0** — the low-bump trick
- ④ VCF ~40–50%, res low
- ⑤ Env → VCF: medium amount, fast attack, short decay = the pluck
- ⑥ Chorus OFF — bass stays mono ([[Stereo Field]])
- ⑧ Unison for fat mono; sidechain it for the [[Synthwave]] 16ths pulse

### PWM strings — [[BED Slot]]
- ① Pulse only, sub off
- ② PWM from LFO, moderate depth — ⑦ LFO slow
- ③ HPF position 2 (strings sit above the bass)
- ⑤ Attack ~200–400 ms
- ⑥ Chorus I (subtle — PWM already moves)

### Soft bloom pad — [[BED Slot]] (bedroom-pop lane)
- ① Saw + sub
- ④ VCF ~35%, res low
- ⑤ Inverted/slow attack — the downward "bloom"
- ⑥ Chorus II
- The 30-second [[Instrument Preset Map]] recipe; darkest, furthest-back bed flavor

## See also

- Palette: pick by slot — [[Sound Palette]] · [[Instrument Preset Map]]
- Chains: [[2 Inst-Synth Group|Keys & Synths]] / [[2 Bass Group|Bass]] chains per role
