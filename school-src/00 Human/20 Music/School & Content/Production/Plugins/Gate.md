---
type: plugin
title: "Gate"
category: Dynamics (gate/expander)
vendor: "Ableton (stock)"
video_enriched: true
tags: [plugin, ableton-stock]
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Gate

**Category:** Noise Gate / Expander
**Vendor:** Ableton Live stock device

## What it is

Live's stock gate: anything under the threshold is silenced (or attenuated by the Floor amount); attack/hold/release shape how it opens and closes. Sidechain input lets another signal do the opening.

## What it's used for

Killing room noise between vocal phrases while tracking, tightening amp hiss between guitar parts, and rhythmic gate tricks via sidechain.

## Techniques

- **Gate a distant room mic so the performer's own dynamics decide when reverb "opens" — David Bowie's "Heroes" vocal, Tony Visconti.** Wanting reverb only on the loud parts of the vocal but with just one spare tape track, Visconti set up three mics at increasing distances (close, ~15-20 ft, ~50 ft) and gated the middle and far mics to a threshold that only opened when Bowie sang loud enough — quiet passages stay dry (close mic only), loud passages progressively open the more distant, more reverberant mics, giving a natural in-room reverb swell driven by performance dynamics rather than an automated effect. A concrete recipe for the same idea in the box: send a vocal to a room-verb return, gate that return's input to the vocal's own level, and set the threshold so only louder phrases trigger it. → [[2 Main Vocal Group]] — David Bennett Music Theory, [[15 facts you didn't know about classic songs]]
- **Gate the LOW END of a parallel-distorted layer to control the LENGTH of a tuned note, not for noise-floor cleanup.** A guitar-distortion pedal (SansAmp) driven into a kick's parallel channel produces a sustained, "ridiculous" tuned tone on its own — a gate (Drawmer DS201 in the source) placed after it makes the note's decay adjustable from long to short by ear, turning raw distortion sustain into a controllable, musical element before it's blended back under the clean mic. → [[Saturation and Distortion]], [[TRANSIENT Slot]], [[1 Drums Kick Track|Drums Kick Track]] — Mix with the Masters (Nick Launay), [[Mixing Nick Cave & The bad seeds - Nick Launay]]
- **Use a gate to shape the RELEASE/decay of an already-distorted, heavily-reamped signal — a tone-design choice, not floor cleanup.** On a "crushed"-room drum overdub (mics bussed into an amp, re-mic'd with one distant mic), the gate's job is deliberately shaping how long the distorted tail rings before the next hit: "I'm going to use a gate to shape how the release is because I think it's pretty important to make sure that that's right." → [[TRANSIENT Slot]], [[Ambient Texture and Field Recording]] — Mix with the Masters (Andrew Scheps), [[Overdubs - Andrew Scheps]]
- **On a heavily-processed BUS (not tracking), use the gate purely for noise-floor control, not dynamics — hold + release combined ~1 second so it never chatters between closely-spaced hits.** "I don't take away any of the noise, I just don't want a high noise floor" — a chain of compression + plugins raises the audible noise floor even when there's no real noise left to remove, so the only job here is silence between hits, presence while playing. Settings generously slow relative to the "most people" default so hold/release don't fight rapid hits within a phrase. → [[3 Drums Bus|Drums Bus]], [[Gain Staging]] — Jaycen Joshua (Mix with the Masters), [Jaycen Joshua's drum bus](https://www.youtube.com/watch?v=LY-vU5MwBvs)
- **Placed FIRST in a reverb+distortion send chain, a Gate turns a static effect into a dynamics-triggered one — the reverse-engineered "secret" behind Mk.gee's guitar tone.** His actual pedal (an FX Ranger-style distorted reverb) has a built-in noise gate he never mentioned in his own description of it. To replicate: build a send/return with **Reverb → Distortion → Compressor**, then put the **Gate BEFORE all of it** — first device in the chain — with threshold set so only the loudest notes cross it and trigger the distorted-reverb wash; quieter notes pass through dry. Requires a genuinely wide dynamic range in the source performance or the gate never opens on anything. → [[Reverb]], [[Saturation and Distortion]], [[Mk.gee Baritone Guitar Chain]] — loner, [the secrets behind Mk.gee's HYPNOTIC production!?](https://www.youtube.com/watch?v=969p5Q4JSZU)
- **Cut a bass note's noisy/reverb tail short for a choppier, more electronic character** — after heavy compression/bit-crush (e.g. [[Redux]]) leaves an audible noise or reverb tail ringing out after each note, a Gate set to close quickly after the note reads as a much choppier, more electronic-sounding bass — used on two separate bass layers in the same track to make both read as tighter and more programmed. → [[Redux]], [[Bass Design]] — You Suck at Producing (Underbelly), [How To Make EDM (Emo Dance Music)](https://www.youtube.com/watch?v=skrcNjB4NIc)
- **Also used to clean a perky lead synth's own reverb/noise tail** — a gate on a bright, plucky lead removes trailing reverb/noise at the bottom of each note before layering a distorted sub underneath it, so the low layer doesn't inherit smeared tails from the top layer. — You Suck at Producing (Underbelly), [How To Make EDM (Emo Dance Music)](https://www.youtube.com/watch?v=skrcNjB4NIc)
- **Sidechain-gated rhythmic chop on a sustained synth** — enable Sidechain, key it from the kick (or any other Drum Rack pad), so a held pad/synth is only audible during trigger hits and silent everywhere else — effectively chopping a sustained sound into the trigger's rhythm. Push Floor to −∞ for a fully silent closed state and a harder, more extreme gate. → [[Sidechaining]] — You Suck at Producing, [How to Sidechain Everything in Ableton Live](https://www.youtube.com/watch?v=gej-sIZDTVU)
- **Vocal-room recipe: threshold −40 to −43 dB** — clears AC/fan/rustle/chip-bags while letting every sung/spoken level through; smooth the attack + release so word edges don't clip off. First device on the tracking track — Kenny Beats, [Recording Vocals the Right Way](https://youtu.be/3Nw1d37nluo) + [Vocal Template](https://youtu.be/X_iDENABLmk)
- **A gate is not an eraser** — it only helps *between* phrases; noise under the vocal stays. Pair with dead-space chopping ([[Latency-Free Tracking]] workflow) and [[RX Voice De-noise]] for the floor itself.

## FX chain notes

Tracking-stage tool — in the monitor chain while recording ([[1 Main Vocal Track|Main Vocal Track]] Step 1); by mix time the dead-space chop has usually replaced it.

## Used in my chains

Ableton's **noise gate** — silences the signal below a threshold to clear room noise/bleed between phrases (editing = gain-staging: less floor for downstream comps to raise):

- **Vocal monitor/tracking chain** ([[1 Main Vocal Track|Main Vocal Track]]) — Gate at **−40 to −43 dB** to clear room noise between phrases ("Kenny's number"), lean while tracking.
- **Scratch-kit drums** ([[2 Drums Group|Drums Group]]) — gate the noise between snare hits before Soothe2 + Devil-Loc.

## Key Parameters

```visual-key
image: Images/Gate.png
coords: Images/Gate.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Threshold | Level below which the gate closes | −40 to −43 dB on a vocal so breaths pass but room noise is cut | — |
| ② | Return (Hysteresis) | Gap between open and close thresholds | Wider to stop chatter on a signal hovering near threshold | — |
| ③ | Attack | How fast the gate opens | Fast so word/hit fronts aren't clipped | — |
| ④ | Hold | Keeps the gate open after the signal drops | Enough to not chop the tail of a word/hit | — |
| ⑤ | Release | How fast the gate closes | Slow enough to sound natural, fast enough to actually cut noise | — |
| ⑥ | Floor | How much the closed gate attenuates (vs. full silence) | Partial floor for a natural duck; full for hard silence | — |
| ⑦ | Sidechain / Lookahead | External trigger + advance-look | Lookahead so fast transients aren't clipped by the open time | — |

## See also

- Plugins: [[RX Voice De-noise]] · [[kHs Gate]] · [[Compressor]]
- Techniques: [[Latency-Free Tracking]] · [[Gain Staging]]
