---
type: index
title: Plugin Capture — Re-shoot Queue
tags: [plugin, index, capture]
updated: 2026-07-20
---

# Plugin Capture — Re-shoot Queue

Plugins whose current screenshot is **wrong, unusable, or a legacy scrape**. Each needs a fresh capture in Live (the spec-130 harness for third-party floating windows, spec-136's region grab for native/inline devices). Once a real capture lands, re-place its badge coordinates with `Machine/Scripts/plugin-visualkey-apply.py` — the interactive `visual-key` block picks the new image up automatically.

## Wrong plugin captured — highest priority

These have a screenshot of a **different plugin**, confirmed against `Machine/State/plugin-screenshots.json` (the manifest records which device the browser search actually resolved to).

- [ ] **UAD Tube-Tech CL 1B mkII** — the search resolved to the **non-mkII CL 1B**; the file is byte-identical to that page's. The mkII's extra controls (sidechain HP, wet/dry mix) aren't in the shot at all. *Note: the CL 1B page itself is now archived, so this page has no valid image until re-shot.*
- [ ] **Reaktor 6 MFX** — resolved to **Reaktor 6** (the audio-effect build, not the MIDI-effect one).
- [ ] **UAD Cooper Time Cube Mk II** — resolved to **UAD Cooper Time Cube**; probably the same plugin under a shorter browser name, but confirm the panel matches before trusting badge positions.
- [ ] **Transient Shaper (Softube)** — the capture is the **kHs (Kilohearts) Transient Shaper** (title bar says so; Attack/Pump/Sustain/Speed/Clip/Sidechain layout), not Softube's plugin. Left un-badged. Re-shoot the actual Softube Transient Shaper. *(The kHs one is already done on its own page [[kHs Transient Shaper]].)*

## Unusable capture

- [ ] **Pro-MB** — captured with **no bands added**, so ①–⑦ (bands, per-band threshold/ratio/attack/sidechain/solo) have nothing on screen. Same failure mode as Pro-Q 4. Re-shoot with 2–3 bands placed and one selected.
- [ ] **Drum Rack** — captured as an **empty pad grid**. Chains, choke groups, returns, sends and macros are all invisible until a kit is loaded and the chain list expanded. Re-shoot with a kit loaded.
- [ ] **Keyscape** — captured the **splash / About screen** (version info, Show Credits, Diagnostics), not the instrument UI. Needs a re-shoot with a patch loaded.
- [ ] **Omnisphere** — same problem: captured the **splash / About screen** ("Power Synth 2", Show Credits, Diagnostics, version list), not the synth UI. Re-shoot with a patch loaded. *(Its 10-row table is already written and good — just needs a real UI capture to badge.)*

- [ ] **Pro-Q 4** — captured as an **empty EQ instance**: no bands placed, so none of its 10 table controls exist on screen to badge. Re-shoot with 3–4 bands added and one selected. **Highest value of any re-shoot** — Pro-Q 4 is in ~40 of 41 chains.

## Still on a legacy scrape (never captured)

Currently badged against an old scraped image — several are YouTube thumbnails where the UI happens to be readable. Works, but should be replaced with a real capture.

- [ ] **API-2500** — thumbnail with a large "THE POWER OF WAVES API 2500" overlay. In the capture queue but never shot.
- [ ] **Gold Clip** — thumbnail with "GETTING STARTED WITH GOLD CLIP" overlay.
- [ ] **Align Delay** — cropped partial screenshot.
- [ ] **Archetype- John Mayer X** — vendor render rather than an in-Live capture.
- [ ] **Duck_Buddy** — small legacy image.
- [ ] **ValhallaRoom** — "IN DEPTH WITH" YouTube thumbnail, older v1.0.2 UI, panel tilted in perspective. Badged approximately (coords survive a re-shoot); replace with a clean straight capture of the current UI when possible.
- [ ] **ValhallaShimmer** — older single-row UI captured inside a Logic session (thumbnail scrape). Badged and readable; re-shoot the current standalone UI when convenient.
- [ ] **ValhallaSpaceModulator** — "INSTALLING FREE VST'S" YouTube thumbnail; panel readable and badged. Re-shoot a clean capture when convenient.
- [ ] **ValhallaUberMod** — captured small inside a Pro Tools session, **Demo version** banner, v1.0.2. Badged but small; re-shoot the current licensed UI.
- [ ] **RX Spectral Editor** — "ARA Integration in Pro Tools" YouTube thumbnail; right half covered by title text, spectrogram + toolbar + Process visible and badged. Re-shoot the standalone/ARA editor cleanly when convenient.

## Collapsed panels — optional re-shoot

Captured correctly, but with sub-panels closed, so some table rows have no visible control. Only worth redoing if you want full badge coverage.

- [ ] **Ghz Vulf Compressor 3** — COMP ADV / LOFI ADV panels collapsed (⑦⑧ unbadged).
- [ ] **Ghz Tupe 3** — FILTER panel collapsed (② Tilt unbadged).
- [ ] **EchoBoy** — Wow & Flutter lives inside Style Edit (⑤ unbadged).
- [ ] **Bloom Bass Impulse** — capture shows the bank browser; the macros/filter/envelope rows live behind **Edit**.

## Not a re-shoot — panel genuinely lacks the control

Recorded here so nobody "fixes" them later. These rows describe fixed behaviour, host integration, or a different model's controls.

- **UAD Teletronix LA-2A** — capture is the **LA-2 (Gray)** panel: no Limit/Compress switch. Rows ⑤⑥ describe fixed internal behaviour, not knobs.
- **UAD UA 610-B** — ⑥ Unison is a Console integration mode, not a panel control.
- **UAD Ampeg SVT-VR Classic** — single `volume`, no separate master; cabinet/mic is behind the FX Rack menu.
- **LALA** — no separate output stage; Gain is the output.

## Never captured — what the Mac actually needs
Pulled from `Machine/State/plugin-screenshots.json`. **Most of these aren't capture failures — they're licence problems.** Re-running the harness won't help until the authorisation is sorted.

### Blocked on authorisation / licence (22) — fix the licence, *then* re-run
- [ ] **ADAPTIVERB** — requires iLok activation ('Try/Quit/Activate' dialog, Zynaptiq) — not actually usable despite owned:true; activate before retry
- [ ] **API-2500** — UAD API 2500 not authorized — shows Start Demo/Buy bar despite owned:true; re-check UAD authorization before retry
- [ ] **Corrosion** — shows DEMO watermark (v1.1.1 DEMO) despite owned:true; authorize via HoRNet before retry
- [ ] **DUNE 3** — not authorized — shows 'To run this plugin you must activate DUNE 3' overlay, only Launch Activation button, despite owned:true; authorize via Synapse Audio before retry
- [ ] **Decimort 2** — not authorized — shows Activate/Evaluate/Purchase chooser despite owned:true; authorize via D16 before retry
- [ ] **Gem Dopamine** — shows authorization/demo dialog (Try it now / Demo / Authorize) — not actually authorized despite owned:true; re-check ownership or authorize before retry
- [ ] **Gold Clip** — requires iLok activation ('Activation is required' dialog) — not actually usable despite owned:true; activate before retry
- [ ] **Gold Clip Track** — requires iLok activation ('Activation is required' dialog, Schwabe Digital) — not actually usable despite owned:true; activate before retry
- [ ] **Guitar Rig 7 FX** — not authorized — shows Demo/Buy/Activate chooser despite owned:true; authorize via Native Access before retry
- [ ] **Guitar Rig 7 MFX** — not authorized — same Guitar Rig 7 shows Demo/Buy/Activate chooser (confirmed via Guitar Rig 7 FX note); authorize via Native Access before retry
- [ ] **HALion Sonic** — requires Steinberg account sign-in via separate Activation Manager app — not actually usable despite owned:true; sign in via Steinberg Activation Manager before retry
- [ ] **Hand Clap Studio** — not authorized — shows Buy/Activate/Demo chooser despite owned:true; authorize via Robotic Bean before retry
- [ ] **MMultiAnalyzer** — shows DEMO watermark and 'Demo licence has expired' banner despite owned:true; authorize via MeldaProduction before retry
- [ ] **MTransformer** — shows DEMO watermark and 'Demo licence has expired' banner despite owned:true; authorize via MeldaProduction before retry (same as MMultiAnalyzer)
- [ ] **Morgan Amps Suite** — iLok license expired ('All visible licenses expired', Neural DSP) — not actually usable despite owned:true; renew license before retry
- [ ] **Permut8** — first-load 'Welcome to Permut8' tour overlay won't dismiss via click-inside-bubble, X button, or Escape — automation limitation, not an auth/license issue; retry manually or disable the tour in-app first
- [ ] **RBass** — Waves plugin in demo mode ('Demo: Get Full Access' banner, periodic audio mutes) despite owned:true; authorize via Waves Central before retry
- [ ] **Serum 2** — machine not authorized for Serum 2 ('not yet authorized' screen, needs online license retrieval) — not actually usable despite owned:true
- [ ] **Splice Sounds** — installed beta version has expired ('This beta version has expired. Please download an updated version') — needs a plugin update via Splice, not an authorization issue
- [ ] **SurferEQ** — requires iLok activation ('Activation is required' dialog, Sound Radix) — not actually usable despite owned:true; activate before retry
- [ ] **Uberloud** — Boom Interactive Loudness Jackhammer - iLok Try/Quit/Activate dialog, not authorized. Declined via Quit.
- [ ] **VocAlign Ultra AU** — iLok license expired ('All visible licenses expired' dialog) — not actually usable despite owned:true; re-check ownership/license or authorize before retry

### Blocked on something technical (0) — worth a retry


> Several of these show a DEMO or not-authorised dialog **despite the note saying `owned: true`** — Serum 2, DUNE 3, Guitar Rig 7, Gem Dopamine, Hand Clap Studio, API-2500, Corrosion, RBass among them. Worth deciding per plugin whether the licence lapsed or the ownership flag is wrong.

### Native / inline-only (69) — **spec-136's job, already underway**
These have no floating window, which is why the spec-130 harness skipped them. Spec-136 captures them by screen region instead. **65 of 69 are already shot.**

Still outstanding (4): Bloom Bass Impulse, Gullfoss, Gullfoss Master, S1 MS Matrix

### Not found in Live's browser (7) — needs a name check, not a re-run
The browser search found nothing under this name. Either the plugin isn't installed, or the note's title doesn't match what Live calls it.
- [ ] **AM-Bird** — not found in browser under this name (re-affirmed from 07-17 session) — name-check/reinstall later
- [ ] **BIP for L9** — not found in browser under this name (re-affirmed from 07-17 session) — name-check/reinstall later
- [ ] **ClipGain** — not found in browser under this name (re-affirmed from 07-17 session) — name-check/reinstall later
- [ ] **Drift (SoundGhost)** — no distinct browser match — only native Ableton 'Drift' found (already skipped separately); possible ownership/naming mismatch, needs manual check
- [ ] **Group Humanizer** — no exact browser match — found 6 related 'group humanizer ...' M4L devices (HUMAN INPUT, MEAN FOLLOWER, PLAYER, SETTINGS variants), unclear which one the note refers to; needs manual identification
- [ ] **High School Crush 1.2** — not found in browser under this name (re-affirmed from 07-17 session) — name-check/reinstall later
- [ ] **UAD Precision Mix Rack** — no browser match (re-affirmed from 07-17 session)

### Live 12 MIDI Tools (2) — RESOLVED 2026-07-20 (both now badged)
The earlier "not capturable" assumption was wrong for both.
- **Euclidean** — the image is actually a full **euclidean sequencer M4L device** (4 channels: Rotation/Events/Steps, circular display, per-channel Key/Vel, playback/rate, presets), not the bare Live 12 MIDI Tool. Badged against the real panel.
- [ ] **Velocity Shaper** — captured small from a vertical YouTube Short (the Live 12 Velocity Shaper clip tool: curve + Loop/Rotate/Division + Transform). Badged but tiny; re-shoot a clean clip-panel capture when convenient.

