---
type: index
title: Visual Key Refresh Progress
tags: [plugin, index, progress]
started: 2026-07-18
---

# Visual Key Refresh Progress

> [!info] PARKED — Nate's call, 2026-08-12
> **284 of 366 plugin notes annotated. Not abandoned, not being worked.**
> The stall is a dependency, not a decision: Phase B is blocked on **spec-137** (Mac lane), which re-captures 15 plugins in the right GUI state. Those captures never came back, and last activity here was 2026-07-22.
> Parked deliberately so spec-141 (shared music system) can finish Phase B and Phase C without opening a Mac-lane dependency mid-stream. **Nothing here is archived — every annotation already done still stands.** Resume by running spec-137 on the Mac, then the detector in [[_Visual Key Reshoot Handoff]].

Deep refresh of plugin pages + chain settings (idea #130 images). **Two phases** — image annotation is deferred to LAST because Nate is upgrading the base images (annotating now = throwaway work).

### Carried from `_Visual Key HANDOFF.md` (archived 2026-08-12, spec-159)

**Logged skips — don't re-attempt without a re-shoot:** ADAPTIVERB (iLok + watermark), Bloom Bass Impulse (bank browser, controls behind Edit), Guitar Rig 7 FX/MFX (modular rack thumbnail, lower third obscured), Keyscape (splash screen), Komplete Kontrol (empty library), Pro-MB (no bands), Reaktor 6 MFX (wrong plugin), UAD Tube-Tech CL 1B mkII (wrong plugin). *(Pro-Q 4 was on this list too but is now DONE — see 2026-07-21 below; the empty-EQ capture was replaced.)*

**Image-format lessons:**
- Several source images are **YouTube-thumbnail scrapes with unusual dimensions** — verify the real pixel size (`PIL Image.open(...).size`) before placing badge coordinates if they render offset; one image was 1200×1800, not the 1600 assumed at a glance.
- When **both a `.jpg` and a `.png` exist** for the same plugin, `plugin-visualkey-apply.py` uses the **`.png`** — read the `.png` (not the `.jpg`) before placing coords. Caught this on ValhallaSupermassive/FreqEcho, where the `.png` was the cleaner capture.

### Phase A — TEXT (do now, image-independent)
1. **Key Parameters table** — every editable control, what it does + a technique, from the interface image + owner's manual + contextual production knowledge. **Correct inaccuracies** (e.g. removed the non-existent "Peak/RMS switch" from Glue Compressor).
2. **"Used in my chains" section** — every chain the plugin appears in, its role, headline settings. Real numbered slots vs. variations/creative moves distinguished.
3. **Specific + fleshed-out chain settings** — in every chain slot, ranges → **specific values** (to the %/decimal) AND the *why* for that chain, equally detailed as the plugin page.
4. Flag `params_enriched: 2026-07-18` = Phase A done for that page (resume via `grep -L`).

### Phase B — ANNOTATION (do last, after better images arrive)
5. Numbered ①–⑪ circles drawn on the final screenshot at each control → `Images/<Name>.annotated.png`, embed `![[…]]` + caption added above the Key Parameters table.
6. Flag `visual_key: <date>` = annotation done. (The 4 pilots already have this against the *current* images — re-run if their base image is upgraded.)

**Badge standard (locked w/ Nate):** hollow badge — translucent white disc (control shows through) + crisp red ring + red bold number, 3× supersampled, radius ≈ 1.8–2.0% of image width. NOT solid red. Helper: `Machine/Scripts/plugin-annotate.py` (fractional coords, JSON spec per plugin). Every annotated image is visually verified before accepting.

**Order:** Phase 1 = the ~90 chain-used plugins (text now, image last). Phase 2 = remaining ~235 pages.

Resume queries: text pass → `grep -L "params_enriched:" <chain plugins>` · annotation pass → `grep -L "visual_key:" <chain plugins>`.

## Phase 1 — chain-used plugins (90) ✅ TEXT DONE 2026-07-18

**All 90 done (text):** Key Parameters tables built/corrected, "Used in my chains" sections, specific fleshed-out chain settings. Corrections made: Glue Compressor (removed non-existent Peak/RMS switch), Gem Dopamine (was mislabeled a fuzz pedal — it's a Dolby-A vocal-air enhancer), Archetype: John Mayer X (owned-not-installed, page built), Auto-Tune/Fresh Air category fixes. Web-verified: Hand Clap Studio, Gem Dopamine, Ramzoid 808 Cooker, Duck_Buddy.

**Still pending: the ANNOTATION pass (Phase B)** — waiting on Nate's upgraded images, then re-run `Machine/Scripts/plugin-annotate.py` per plugin. Only 4 pilots are annotated so far (Decapitator, API-2500, Auto-Tune Pro, Fresh Air — against current images). Resume: `grep -L "visual_key:" <chain plugins>`.

## Phase 2 — non-chain plugin pages (233) ✅ TEXT DONE 2026-07-19

**All 233 done.** Every plugin page in the folder now has a Key Parameters table (0 pages missing) + `params_enriched` flag. Built in vendor-family batches (Kilohearts ×34, Goodhertz, FabFilter, Soundtoys, UA, iZotope Ozone/RX ×28, Ableton stock + Drum Synths, NI, Valhalla, Waves, Sonic Charge, Steinberg, + the Max-for-Live/utility tail). Web-verified the genuinely-unknown ones. Older/mono variants point to their main version; non-audio workflow utilities (Pomodoro, Notepad, Splice bridges, MIDI monitors) get a short functional entry.

**Whole vault status: every plugin page (323) has a Key Parameters table + params_enriched flag.**

## Phase B — annotation ▶ IN PROGRESS · 284 of 310 pages annotated (2026-07-21)

### 2026-07-21 — 7 more annotated, remaining 26 triaged
Annotated today (visual-key fences + coords written, renders verified): **Pro-Q 4** (the high-value re-shoot — the earlier empty-EQ capture is replaced with a one-bell-band shot, so all 10 band controls are badgeable), **SurferEQ**, **Transient Shaper**, **Nexus**, **Synplant**, **Permut8**, **RBass**.

The remaining **26 pages can't be annotated from the images on hand** — the base capture is the wrong view, watermarked, or the page has no fixed controls. Grouped by why:

**A. Empty / wrong-view capture — re-shoot with the plugin actually in use (Mac harness):**
- **Pro-MB** — empty instance (flat line, no band placed); re-shoot with a band added + selected, exactly like the Pro-Q 4 fix. Highest-value re-shoot here.
- **Keyscape** — opened to the splash/about screen; need a loaded patch on the Custom Controls / FX view.
- **Omnisphere** — splash/about screen; need the edit page (Layers / Filter / FX).
- **Kontakt 7** — library browser tiles; need an instrument loaded (only ① is on the browser).
- **Bloom Bass Impulse** — sample-bank grid; need the Edit / macro page.
- **Melodyne** — empty editor (no audio transferred); need a blob loaded so the note tools/algorithm are placeable.
- **VocAlign Ultra AU** — a right-click menu is open over the DUB lane; clean re-shoot (and it hangs Live, per the page note).

**B. Watermarked / marketing image — need a clean capture (not a web scrape):**
- **ADAPTIVERB** — big "Sweetwater SoundCheck" watermark across the UI.
- **Guitar Rig 7 FX** + **Guitar Rig 7 MFX** — both the same "Everything in Guitar Rig 7 Pro" YouTube thumbnail (text banner).
- **Uberloud** — BOOM Library marketing thumbnail (angled/perspective UI + text).
- **Serum 2 FX** — "SERUM FX OVERVIEW" (ADSR) YouTube thumbnail.
- **Splice Bridge / Splice INSTRUMENT / Splice Sounds / Splice Sounds Listener** — marketing thumbnails, not plugin UIs (and these are 1-row workflow-utility pages — low value even with a clean shot).

**C. Not annotatable by nature — host/browser shells, no fixed controls:**
- **Reaktor 6** + **Reaktor 6 MFX** — modular hosts; parameters come from the loaded ensemble.
- **Komplete Kontrol** — NI browser/host (the instrument lives in the loaded plugin).
- **LFO Tool** (spaced) — no circled-row table + it's a duplicate of the already-done **LFOTool** page; this is a dedup, not an annotation.

**D. No base image at all — need a first capture:**
- **Monark**, **Poly6**, **PadShop**, **S1 MS Matrix**, **UAD Precision Mix Rack**.

**E. Special:** **UAD Tube-Tech CL 1B mkII** — its base PNG is byte-identical to the CL 1B capture (the mkII was never actually shot); needs a real mkII capture (its 8-row table has the sidechain-HP + wet/dry-mix rows plain CL 1B lacks).

Bumped the hardcoded stamp date in `Machine/Scripts/plugin-visualkey-apply.py` to 2026-07-21.

The 26 blocked pages are split into two hand-offs: the **capture** side is [[spec-137-plugin-reshoot-annotation-captures|spec-137]] (Mac), and the home-side **annotation** run that fires when those captures land is pre-staged in [[_Visual Key Reshoot Handoff]] (per-plugin badge plan + a detector + run recipe).

### 2026-07-19 — first 23 annotated (23 of 90 chain plugins)

The Mac's Live-capture run (spec-130 harness) delivered **23 real in-Live screenshots** — 10 on 2026-07-17/18 and 13 more synced 2026-07-19 09:19. Every one of those that could be annotated now is: **19 new pages annotated today**, on top of the 4 earlier pilots = **23 pages carrying `visual_key`**.

Annotated 2026-07-19: UAD Neve 1073 · Pultec EQP-1A · Teletronix LA-2A · UA 1176LN · UA 610-A · UA 610-B · Tube-Tech CL 1B · Century Tube Channel Strip · Ampeg SVT-VR Classic · Marshall Plexi Classic · Brigade Chorus · Raw Distortion · RealVerb-Pro · Pure Plate Reverb · Cooper Time Cube Mk II · RC-20 Retro Color · Pro-C 2 · Soothe2 · EchoBoy.

New helper: `Machine/Scripts/plugin-visualkey-embed.py "<Plugin>"` — inserts the embed + caption above the Key Parameters table and stamps `visual_key`. Idempotent, so a re-annotated image can be re-applied without stacking duplicates.

### ⚠️ Two captures are unusable — need a re-shoot on the Mac
1. **Pro-Q 4** — the capture is an *empty* EQ instance: no bands added, so none of the 10 table controls (band, filter shape, freq/gain/Q, slope, dynamic EQ…) exist on screen to badge. Re-shoot with 3–4 bands placed, one selected. This is the highest-value re-shoot — Pro-Q 4 is in ~40 of 41 chains.
2. **UAD Tube-Tech CL 1B mkII** — `UAD Tube-Tech CL 1B mkII.png` is **byte-identical to `UAD Tube-Tech CL 1B.png`** (same md5); the window title in the capture reads "CL 1B". The mkII was never actually shot. Its page has the richer 8-row table (sidechain HP, wet/dry mix) and is left unannotated pending a real mkII capture.

### Panel-vs-table mismatches found while annotating (captions note each)
- **Teletronix LA-2A** — the capture is the **LA-2 (Gray)** panel, which has no Limit/Compress switch (table row ③). Rows ⑤⑥ describe fixed internal behavior, not controls. The panel's two screwdriver trims (−MIX+, +HF−) are missing from the table.
- **UA 610-B** — ⑥ Unison is a Console integration mode, not a panel control.
- **EchoBoy** — ⑤ Wow & Flutter lives inside Style Edit, not the front panel; ⑧ Ping-Pong is a position of the Mode knob already badged by ①.
- **Ampeg SVT-VR Classic** — no separate master; single `volume`. Cabinet/mic is behind the FX Rack menu.
- **Tube-Tech CL 1B** — 4-row table against a 7-control panel (Release, Meter, attack/release Select have no rows).
- **Brigade Chorus** — captured showing a `DISABLED` banner (UAD auth still not current, per the 7/18 build report). Usable as a UI reference; re-shoot after the licence refresh if you want it clean.

**Still pending:** the remaining **~67 chain plugins have no real capture yet** — Phase B can't proceed for them until the Mac harness shoots more. Resume: `grep -L "visual_key:" *.md`.

- [x] Decapitator — full *(annotated)*
- [x] Align Delay — page + 2 guitar phase slots *(text; image deferred)*
- [x] API-2500 — full *(annotated)*
- [x] Archetype- John Mayer X — page BUILT (owned, not installed) + intended Gtr DI slot *(text)*
- [x] Auto-Tune Pro — full *(annotated)*
- [x] Bloom Bass Impulse — page BUILT (web-id) + bass source *(text)*
- [x] Cassette — page (texture option in E-Piano) *(text; image deferred)*
- [x] Chorus-Ensemble — page + E-Piano slot 4 + 4 variations *(text; image deferred)*
- [x] Crystallizer — page (Drums FX texture) *(text; image deferred)*
- [x] Devil-Loc Deluxe — page + 3 chain uses *(text; image deferred)*
- [x] Doubler2 — page + Double Vocal fallback *(text)*
- [x] Doubler4 — page + E-Gtr DI widener *(text)*
- [x] Drift — page + 3 instrument uses *(text)*
- [x] Drum Rack — page (kit container) + Drums Group *(text)*
- [x] Duck_Buddy — page BUILT (web-verified) + bass SC-trigger *(text)*
- [x] DUNE 3 — page + synth source *(text)*
- [x] Echo — page + native-delay uses across chains *(text)*
- [x] Echobode — page BUILT + Drums FX texture *(text)*
- [x] EchoBoy — page + 2 delay sends + throw insert *(text)*
- [x] Envelope Follower — page + bass envelope-filter *(text)*
- [x] FETish — page + kick slot + 2 uses *(text)*
- [x] FF Pro-C — page + E-Gtr DI funk slot *(text)*
- [x] Fresh Air — page text + Main Vocal Track slot 8 *(annotated)*
- [x] Gate — page BUILT + vocal/drum noise-floor *(text)*
- [x] Gem Dopamine — page CORRECTED (fuzz→vocal-air enhancer) + 2 vocal uses *(text)*
- [x] Ghz Tone Control 3 — page + 3 broad-tone slots *(text)*
- [x] Ghz Tupe 3 — page + 4 tube slots *(text)*
- [x] Ghz Vulf Compressor 3 — page + bass character-comp slot *(text)*
- [x] Glue Compressor — page text + 7 chain slots; fixed bogus Peak/RMS row *(text only, image deferred)*
- [x] Gold Clip — page + Drums Bus trap-knock *(text)*
- [x] Guitar Rig 7 FX — page (modular rack) + Jai Paul chain *(text)*
- [x] Hand Clap Studio — page (web-verified) + Snare-Clap layer *(text)*
- [x] Keyscape — page + 2 keys-source uses *(text)*
- [x] kHs Clipper — page + kick & master clip slots *(text)*
- [x] Kickstart 2 — page + bass & synth-bed duck slots *(text)*
- [x] Kontakt 7 — page (sampler host) + piano libs *(text)*
- [x] Kramer Tape — page + 5 tape slots *(text)*
- [x] LALA — page + 4 opto-leveler slots *(text)*
- [x] LFOTool — page + hat/shaker duck *(text)*
- [x] Limiter — page + 808 sustain pin *(text)*
- [x] Little MicroShift — page + silky-bed/stack uses *(text)*
- [x] Massive — page + synth-lead source *(text)*
- [x] Melodyne — page (note-based) + vocal-prep uses *(text)*
- [x] MicroShift — page + Width Send slot *(text)*
- [x] Morgan Amps Suite — page + Gtr DI amp slot *(text)*
- [x] mvMeter2nogpu — page (meter, ref only) *(text)*
- [x] Nexus — page + produced-source uses *(text)*
- [x] Omnisphere — page + pad/lead source *(text)*
- [x] Operator — page + FM sub/e-piano source *(text)*
- [x] OTT — page + 2 synth slots *(text)*
- [x] Oxford Inflator — page BUILT + density uses *(text)*
- [x] Ozone 9 Imager — page BUILT + master imaging *(text)*
- [x] Ozone 9 Maximizer — page BUILT + master+drum limiting *(text)*
- [x] PanMan — page + tremolo/pan uses *(text)*
- [x] Pro-C 2 — page + chain roles (8 slots) + key slots pinned *(text)*
- [x] Pro-DS — page + de-ess roles (7 slots) *(text)*
- [x] Pro-L 2 — page BUILT + master ceiling *(text)*
- [x] Pro-MB — page BUILT + multiband dynamics uses *(text)*
- [x] Pro-Q 3 — page + Vocal Bus tone slot *(text)*
- [x] Pro-Q 4 — page BUILT + EQ-backbone roles (~36 chains) *(text)*
- [x] Pro-R — page BUILT + short-verb uses *(text)*
- [x] Ramzoid 808 Cooker — page BUILT (web-verified) + 808 source *(text)*
- [x] RC-20 Retro Color — page + lo-fi character uses *(text)*
- [x] RX Voice De-noise — page BUILT + guitar noise-floor *(text)*
- [x] S1 Imager — page BUILT + 2 width slots pinned *(text)*
- [x] Saturn 2 — page BUILT + 6 color slots + 808/vocal pinned *(text)*
- [x] Serato Sample — page BUILT + drum chops *(text)*
- [x] Serum 2 — page + synth source *(text)*
- [x] Sie-Q — page BUILT + 2 musical-tone slots *(text)*
- [x] Simpler — page BUILT + drum playback *(text)*
- [x] Soothe2 — page + resonance roles (5 slots) *(text)*
- [x] Stereo Tool — page BUILT + width util *(text)*
- [x] Tonal Balance Control 2 — page BUILT + master reference *(text)*
- [x] Transient Master — page BUILT + 4 drum slots *(text)*
- [x] UAD Neve 1073 — page + preamp roles *(text)*
- [x] UAD Pultec EQP-1A — page BUILT + broad-EQ roles *(text)*
- [x] UAD Teletronix LA-2A — page + opto-leveler roles *(text)*
- [x] UAD Tube-Tech CL 1B mkII — page BUILT + vocal tracking-comp slot *(text)*
- [x] UAD UA 1176LN — page + FET-comp roles *(text)*
- [x] UAD UA 610-B — page BUILT + tube-preamp roles *(text)*
- [x] Utility — page + mono/width uses *(text)*
- [x] ValhallaPlate — page BUILT + long-tail send *(text)*
- [x] ValhallaRoom — page BUILT + room send *(text)*
- [x] ValhallaShimmer — page BUILT + shimmer uses *(text)*
- [x] ValhallaVintageVerb — page + long-verb tier *(text)*
- [x] VocAlign Project 5 AU — page BUILT + ensemble align slot *(text)*
- [x] VocAlign Ultra AU — page BUILT + note (hangs Live) *(text)*
- [x] Wavetable — page + pad source *(text)*
- [x] Wider — page BUILT + synth-lead width *(text)*
- [x] XO — page + drum browser *(text)*
