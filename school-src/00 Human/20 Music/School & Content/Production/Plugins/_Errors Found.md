---
type: index
title: Plugin Wiki — Errors Found
tags: [plugin, index, errors, action]
updated: 2026-07-20
---

# Plugin Wiki — Errors Found

Everything the visual-key pass has turned up that **needs a decision or an action from Nate**. Anything already fixed in place is listed under "Fixed" for the record; anything still open is a checkbox.

Companion doc: [[_Re-shoot Queue]] (capture problems). This file is about **content and licence** problems.

---

## ⚠️ Open — needs your action

### Licences: marked `owned: true` but the machine says otherwise

The 2026-07-17 ownership scan inferred ownership from *installed*, which can't tell a licensed copy from a trial or an expired one. These all show a demo/activation dialog or banner.

- [ ] **Bitspeek** — capture shows *"3 weeks trial left, click to register"*. Flagged `owned: unknown`.
- [ ] **Clear** — capture shows a **TRIAL** badge. Flagged `owned: unknown`.
- [ ] **Gem Dopamine** — auth/demo dialog (Try it now / Demo / Authorize). ⚠️ **This is now slot 8 of [[1 Main Vocal Track]]** after the Fresh Air swap, so the vocal chain depends on a plugin that may not run.
- [ ] **ADAPTIVERB · Gold Clip · Gold Clip Track · SurferEQ · Uberloud** — iLok activation required
- [ ] **Morgan Amps Suite · VocAlign Ultra AU** — iLok licence **expired**
- [ ] **Serum 2 · DUNE 3 · Decimort 2 · Guitar Rig 7 (FX + MFX) · Hand Clap Studio · API-2500 · Corrosion · RBass** — not authorised / demo mode
- [ ] **MMultiAnalyzer · MTransformer** — demo licence expired
- [ ] **Splice Sounds** — installed beta has expired, needs updating
- [ ] **HALion Sonic** — needs Steinberg Activation Manager sign-in

> Decide per plugin: renew the licence, or correct `owned:` to false. Right now the wiki overstates what you can actually open.

### Ownership genuinely unknown — no image, never resolved

- [ ] **Monark · PadShop · Poly6** — no install match and no image, so the "has an image = owned" rule doesn't reach them.

### Not found in Live's browser — name check needed

Either not installed, or the note's title doesn't match what Live calls it.

- [ ] **Drift (SoundGhost) · Group Humanizer · UAD Precision Mix Rack · S1 MS Matrix**

*(AM-Bird, BIP for L9 and ClipGain were also on this list — the native capture run found all three, so they're resolved and now have visual keys.)*

---

## ✅ Fixed in place — no action needed, listed for the record

### Tables that described the wrong controls

Each was rewritten against the actual panel (researched from the vendor manual where the plugin's behaviour wasn't obvious).

| Plugin | What was wrong |
|---|---|
| **Cassette** | Listed Wow, Flutter, Hiss, Crosstalk, Tone, Mix — none are knobs. Real panel: erasures, spread, stability, static, dynamic, artifacts. Wow/flutter are *sub-parameters of Stability*. |
| **Ghz Vulf Compressor 3** | Listed Drop, Dust, Loud/Normal — none exist. Real: IN/COMP/WOW/LOFI/OUT + dry, and Compression **can't be fully switched off**. |
| **Ghz Tone Control 3** | Listed Tilt and Balance — neither exists. Real: Bass/Treble gain-freq-slope, Master Air, Master Mix, cuts. |
| **Ghz DC19 3** | Table described a **compressor**; it's a **delay**. Also filed under the wrong category. |
| **Ghz Faraday Limiter 3** | Listed Push and Character — neither exists. Ratio is **stepped**, and Warmth is a *detector tilt*, not a tone control. |
| **Ghz Lohi 3** | Listed Gain/Drive and Character — real panel is filter type/freq/slope/resonance + a Lim/Sat stage. |
| **Ghz Panpot 3** | Listed Pan Law and Mono/Width. Its four columns are **panning methods** (level, delay, spectral, phase), each with a different mono-compatibility trade-off. |
| **Ghz Loudness 3** | Listed Bass/Treble. It's a **LUFS meter + trim**, not a tone shaper. |
| **Ghz Wow Control 3** | Listed a Flutter control that doesn't exist — wow and flutter are the same modulator at different speeds. |
| **Ghz Midside 3 / Midside Matrix 3** | Thin or placeholder rows; rebuilt against the panels. |
| **Ghz Trem Control 3** | Listed a Stereo control that isn't there. |
| **Clear** | Table described reduction/detail/mode. It's a **source-separation** tool: Voice / Ambience / Voice-Reverb stems. |
| **Devil-Loc** | Listed Tone and Mix — those are on **Devil-Loc Deluxe**. The original has only Crush and Crunch. |
| **CLA Drums** | Described as drum-bus compression; it's a full **channel strip** (6 voiced faders + drum selector). Gate was missing entirely. |
| **Pusher** | Listed Push/Girth/Character — none exist. It's a Kush magnetics saturator + leveler with four selectable **core materials**. |
| **Lair** | Listed Drive/Tone/Character/Mix. It's a granular/algorithmic reverb — Device wheel, Sparsity, Volatility, Tension. |
| **Little MicroShift** | Listed Amount and a mono-below control. It has **Mix and three Style buttons**, nothing else. |
| **Little Plate** | Listed Predelay and High Cut — neither exists. |
| **Little Radiator** | Listed a Tone control — real panel is Heat/Mix/Noise/Bias. |
| **Kramer Tape** | ⑧ labelled "HP Filter"; the panel reads **LOWPASS** and it's a low-pass. Also **Delay Time and Feedback were missing entirely** (the repro-head tape slap). |
| **Pro-R 2** | 4 rows against a 9-knob panel — expanded to 11. |
| **Wider** | 2 rows; Low Bypass and Mono were undocumented. |

### Wrong plugin captured (confirmed against the capture manifest)

| Note | What actually loaded |
|---|---|
| **FF Pro-C** | **Pro-C 2** — and the badged Style/Range don't exist on the legacy Pro-C. *(Page since archived.)* |
| **UAD Tube-Tech CL 1B mkII** | the **non-mkII CL 1B**, byte-identical to that page's file |
| **Reaktor 6 MFX** | **Reaktor 6** (audio build, not the MIDI-effect one) |
| **UAD Cooper Time Cube Mk II** | **UAD Cooper Time Cube** (probably the same plugin, shorter browser name) |
| **Transient Shaper** (page says Softube) | the **kHs Transient Shaper** (Kilohearts) — wrong plugin captured; left un-badged, re-shoot queued. The kHs one is done separately. |

### Category corrections

- **Ghz DC19 3** — Compressor → **Reverb/Delay**
- **CLA Drums** — described as a compressor → **channel strip**

### Rows with no control on the panel (noted in each page's caption, not badged)

**UAD Teletronix LA-2A** (capture is the LA-2 Gray — no Limit/Compress switch; ⑤⑥ are fixed behaviour) · **UAD UA 610-B** (Unison is a Console mode) · **UAD Ampeg SVT-VR** (no separate master) · **LALA** (Gain *is* the output) · **EchoBoy** (Wow & Flutter is inside Style Edit) · **Tremolator** (no wet/dry) · **DS Cymbal** (no Noise control) · **EQ Eight** (Oversampling is in the right-click menu) · **S1 Imager** (Shuffle is a different plugin) · **Ghz Tupe 3** / **Ghz Vulf Compressor 3** (collapsed sub-panels) · **Saturn 2** (single-band instance) · **Pro-L 2** (Advanced panel closed)

### Broken links / files

- **60 plugin pages** had image embeds pointing at a `.png` when the file was `.jpg` (or vice versa) — all repaired, 0 broken embeds now.
- **`Archetype: John Mayer X.png`** had a **colon** in the filename — illegal on iOS and mismatched the note title. Renamed.
- **13 legacy plugin pages archived** to `z Archive/Plugins/` with banners; 18 files repointed to current versions; Plugin Index cleaned of 12 stale entries.

### Late additions (found after the first pass)

| Plugin | What was wrong |
|---|---|
| **AM-Bird** | Table described a **granular device** (grain/density/spread). It's an **amplitude/ring modulator** with musical interval locking (Oct/P5/P4/M3/m3) and sideband selection. Description also rewritten. |
| **Corrosion** | Table listed Drive, Bands/Crossovers, Algorithm — none exist. It **generates** a filtered noise source; real controls are Source, Amount, Freq/Q/Type, Track Pitch, Analog. |
| **Stereo Tool** | Table listed Mono Frequency, Pan/Balance, Phase invert — none exist. Real panel is Width, Mid/Side Soft, Mid/Side Sat, L/R gain, All Pass, L/R Delay. |
| **kHs Clipper** | Listed **Bias** and **Oversampling**; the plugin is three knobs (In Gain, Knee, Out Gain). Oversampling is a Kilohearts host setting. |
| **Little MicroShift** | Listed Amount and a mono-below control; it has Mix plus three Style buttons. |
| **MTransformer** | Filed as **Compressor/Limiter** and described as a "frequency-dependent transient shaper." It's a **spectral (frequency-domain) transformer** — Spectrum/Level/Amount + pitch/formant/frequency-shift sliders + a modulation XY pad. Category → **Pitch/Vocal**, description and table rewritten against the panel. |
| **MMultiAnalyzer** | Table had an empty "③ — (no processing)" row; rewrote against the real analyzer UI (view tabs, analysis knobs, Tracks list, This Instance, Collisions). |
| **Gem Dopamine** | Table listed a "Frequency/Tone" knob and "Input/Output" that don't exist; real panel is Dry/Wet/Comp/Level + the 361/180 card select + preset/A-B. Rewritten. *(Note: the [[1 Main Vocal Track]] chain note still says "Frequency/Tone on the top octave" — there is no such knob; reword when convenient.)* |
| **Kilohearts snap-ins (34)** | The `params_enriched` tables were generically guessed and mismatched most panels (wrong/missing controls on Bitcrush, Channel Mixer, Chorus, Comb Filter, Compactor, Compressor, Delay, Distortion, Dual Delay, Dynamics, Ensemble, Filter, Flanger, Frequency Shifter, Gain, Gate, Haas, Ladder Filter, Limiter, Nonlinear Filter, Phase Distortion, Phaser, Pitch Shifter, Resonator, Reverb, Ring Mod, Shaper, Stereo, Tape Stop, Trance Gate, Transient Shaper). Each rewritten against its actual snap-in panel during the visual-key pass. |
| **RX modules (17, RX 11)** | The enriched tables described older RX versions — wrong/missing controls on De-hum (Learn/Filter type/Bands/Q, not Base Freq/Harmonics), Breath Control (Gain/Target mode, not Length), De-ess/De-click/De-clip/De-crackle/De-plosive/De-reverb, Dialogue Isolate, Music Rebalance, Spectral De-noise, Guitar De-noise, Repair Assistant. RX Connect's placeholder "no controls" row → the real Reference/Repair buttons. All rewritten against the RX 11 panels. |
| **Envelope MIDI** | Described as an **audio-envelope-follower** ("converts an audio envelope to MIDI CC"). That's [[Envelope Follower]]. Envelope MIDI is a **note-triggered modulation-envelope generator** (Map + drawable ADSR). Description + table + category rewritten. |
| **Drift (SoundGhost)** | Filed as an **analog synth** (oscillators/filter/envelope). It's a **tape / lo-fi effect** (saturate/wow/flutter/tape/noise/mix). Whole page + category (→ Drive/Color) rewritten. |
| **Volume Buddy 2.5.2** | Described as a **"master volume control."** It's a **LUFS loudness-matcher / auto-gain** (Pre/Post LUFS, Difference, Gain Offset). Description + table rewritten. |
| **Tombola** | Guessed as a **"lottery randomizer."** It's a **physics-based generative MIDI sequencer** (balls bounce in a rotating polygon, fire notes on wall hits). Confirmed from panel; description + table rewritten. |
| **Sting 2022 by Iftah** | Guessed as a **"stab transition effect."** It's a **generative MIDI step-sequencer** (scale/root, Length/Density, Rate/Swing/Gate, MIDI/Clip out). Confirmed from panel; description + table rewritten. |
| **Euclidean** | The re-shoot queue wrongly listed it as an un-capturable Live 12 MIDI Tool. The image is a full **euclidean sequencer M4L device** (4 channels, circular display, per-channel Key/Vel, presets). Badged; re-shoot note corrected. |
| **Many M4L tables (generic)** | Granulator II / GranulatorInput II / GranulatorFollow II, Shaper / Shaper MIDI, Simplon, GrainFreeze, Microtonic Multi, ml.circular.doppler, Mix Matcher, Swiss Army Meter, MIDI Monitor (+Sharps), jo.Oscilloscope, Notepad, Pomodoro — thin/placeholder tables rewritten against the real panels during badging. |

### Skip reasons that turned out to be wrong

The capture manifest recorded these as *"not found in Live's browser"*, but the native run captured them successfully. **No action needed** — noting so the "name check" list isn't chased unnecessarily.

- **AM-Bird**, **BIP for L9**, **ClipGain** — all now have real captures and visual keys.
