---
type: index
title: Visual Key Re-shoot Hand-off
tags: [plugin, index, progress, annotation]
created: 2026-07-21
pairs_with: "[[spec-137-plugin-reshoot-annotation-captures]]"
---

# Visual Key Re-shoot Hand-off

The home-side annotation task that runs **after [[spec-137-plugin-reshoot-annotation-captures|spec-137]] lands new captures** from the Mac. Pairs with [[_Visual Key Refresh Progress]] (which is at 284/310). Everything here is pre-staged so the live run is just: **look at the new image → place coords for the listed controls → apply → verify the render.**

## When to run
When spec-137's report says captures synced, OR when the detector below finds a re-shot image with no `visual_key` yet.

**Detector — which re-shoots have landed and still need annotating:**
```bash
cd "00 Human/20 Music/School & Content/Production/Plugins"
for p in "Pro-MB" "Keyscape" "Omnisphere" "Kontakt 7" "Bloom Bass Impulse" \
  "Melodyne" "VocAlign Ultra AU" "ADAPTIVERB" "Guitar Rig 7 FX" "Guitar Rig 7 MFX" \
  "Uberloud" "Serum 2 FX" "UAD Tube-Tech CL 1B mkII" "S1 MS Matrix" "UAD Precision Mix Rack"; do
  img=$(ls -1 "Images/$p".{png,jpg,jpeg} 2>/dev/null | head -1)
  [ -z "$img" ] && { printf '%-28s no image yet\n' "$p"; continue; }
  fresh=$([ "$img" -nt "_Visual Key Reshoot Handoff.md" ] && echo RE-SHOT || echo stale)
  vk=$(grep -q "^visual_key:" "$p.md" && echo done || echo PENDING)
  printf '%-28s %-7s %s\n' "$p" "$fresh" "$vk"
done
```
A plugin is ready to annotate when it reads **RE-SHOT / PENDING**.

## Run recipe (per plugin)
1. `Read` the new `Images/<name>.png` — confirm it shows the state spec-137 asked for (band selected / patch loaded / audio transferred / clean GUI). If it's still a splash/browser/empty/watermarked shot, **kick it back to spec-137**, don't annotate.
2. Get exact pixel size: `python3 -c "from PIL import Image; print(Image.open('Images/<name>.png').size)"`.
3. Place a badge for each circled row using the **badge plan** below (control → row). Fractional coords `x=px/width, y=px/height`.
4. Apply: `python3 "Machine/Scripts/plugin-visualkey-apply.py" "<name>" '[[1,x,y],[2,x,y],…]'`
   — writes coords + fence, renders `Images/<name>.annotated.png`, stamps `visual_key: 2026-07-21` (date already bumped in the script; update if run on a later day).
5. `Read` the `.annotated.png` and check every badge sits on its control. Nudge coords + re-apply if off (idempotent).
6. Controls not on screen → leave the badge off and note it in the caption (the apply script preserves a hand-written caption).

## Badge plan (control → row), pre-staged from each page's Key Parameters table

**Pro-MB** (8) — *same UI family as Pro-Q 4; reuse its bottom-bar / band-panel coords as a starting point.*
① bands/crossovers on the spectrum · ② Threshold (per-band panel, band selected) · ③ Ratio/Range knob (band panel) · ④ Attack+Release knobs (band panel) · ⑤ Dynamic Phase (bottom bar) · ⑥ External SC button (band panel) · ⑦ Solo/Bypass (band panel) · ⑧ Output (bottom-right).

**Keyscape** (8) — *badge what the loaded patch's main page shows; caption the rest.*
① Velocity curve (Settings tab) · ② Custom controls page (main knob panel) · ③ Tremolo rate/depth (EP patches) · ④ Mechanical/pedal-noise control · ⑤ Drive/EQ knobs · ⑥ LA Custom C7 lid/mic option · ⑦ MKS-20 patch selector · ⑧ Internal FX (chorus/reverb section).

**Omnisphere** (10) — *badge the Edit page + tab buttons for pages not shown.*
① Layers A–D tabs · ② Soundsource browser (layer source field) · ③ Granular page tab · ④ Harmonia section · ⑤ Orb (circular XY pad) · ⑥ Unison/Width · ⑦ Filter (per-layer) · ⑧ Arp tab · ⑨ Mod-matrix tab · ⑩ FX tab.

**Kontakt 7** (5) — *depends on the loaded library UI.*
① Library/Patch (instrument header/name) · ② Instrument macros (library macro knobs) · ③ Amp/Tune/Voices (Kontakt instrument header) · ④ Insert FX (instrument FX area) · ⑤ Output routing selector.

**Bloom Bass Impulse** (6) — *needs the Edit/macro page, not the bank grid.*
① Preset/Source selector · ② Macros (macro knobs) · ③ Drive/Distortion knob · ④ Filter (cutoff/res) · ⑤ Motion/Mod · ⑥ Amp Envelope.

**Melodyne** (8) — *tools live in the top toolbar cluster + a flyout under the main tool; badge visible toolbar icons, caption flyout-only ones.*
① Pitch tool · ② Pitch-Modulation tool · ③ Pitch-Drift tool · ④ Time tool · ⑤ Formant tool · ⑥ Amplitude tool · ⑦ Note-Separation tool · ⑧ Algorithm menu (menu bar).

**VocAlign Ultra AU** (4) — ⚠ *may never land (hangs Live). If it does, no menu open.*
① Guide/Dub (GUIDE+DUB Capture buttons/lanes) · ② Align (Ready/render button) · ③ Tightness/Flex control · ④ Pitch-align toggle / preset.

**ADAPTIVERB** (4) — *label positions known from the old (watermarked) shot: PRE-DELAY / LOW-CUT / WET GAIN / DRY-WET MIX top, SIMPLIFY/RICHNESS/INTERVAL/PITCH-RANDOMIZE/DIFFUSION left, HARMONIC-FILTER/HCF-WEIGHTING/TRACKING right, REVERB MODEL/SOURCE/SIZE/DAMP + FREEZE bottom.*
① Reflection/Reverb → REVERB MODEL/SOURCE · ② Harmonic Tracking → HARMONIC FILTER/TRACKING · ③ Decay/Size → REVERB SIZE/DAMP · ④ Freeze/Mix → FREEZE + DRY/WET MIX.

**Guitar Rig 7 FX** (6) — *rack layout known from the old thumbnail.*
① Preset/Rack (preset name, top bar) · ② Amp+Cabinet component · ③ a Stompbox/drive component · ④ a Mod/Delay/Reverb component · ⑤ Modular/Control (LFO/env module or the "Modifier" browser category) · ⑥ Output/Master (top-right level).

**Guitar Rig 7 MFX** (4) — *same rack as GR7 FX.*
① Preset/Rack · ② Components (amp/cab/stomp/mod modules) · ③ Modular/Control · ④ Output level.

**Uberloud** (4) — ⚠ **TABLE IS WRONG — rewrite before annotating.** The current rows (Source/Preset, Macros, Filter/Drive, Amp Envelope) are a generic synth template; Uberloud is a **maximizer**. Real controls (from the thumbnail): Input Gain · Denoise · Clipper · Output Gain · Character (Nice/Push/Stress) · 2/3-Band mode · Low/Mid/High **Push** knobs. Rewrite the 4-row table to those, *then* place badges.

**Serum 2 FX** (4) — *effect-rack layout: left column lists effects, right shows the enabled effect's knobs incl. MIX.*
① Effect Slots (the FX list column) · ② Per-effect controls (an enabled effect's knobs) · ③ Order (slot order / drag handles) · ④ Mix (per-effect Mix knob).

**UAD Tube-Tech CL 1B mkII** (8) — *verify the window title reads **mkII** before trusting it (the old file was a CL 1B dupe).*
① Threshold · ② Ratio · ③ Attack · ④ Release · ⑤ Gain · ⑥ **Sidechain HP** (mkII-only) · ⑦ **Wet/Dry Mix** (mkII-only) · ⑧ In/Out (bypass/meter). Rows ⑥⑦ are the proof the shot is really the mkII.

**S1 MS Matrix** (1 real badge) — row ② is a "—" filler (pure routing utility, no second control).
① Mode (Encode L/R→M/S vs. Decode M/S→L/R switch).

**UAD Precision Mix Rack** (4) — *channel-strip of Precision modules.*
① Modules (the strip / module row) · ② Compressor section · ③ EQ section · ④ Gate section.

## On completion
- Update [[_Visual Key Refresh Progress]] with the newly-annotated pages and the running count.
- `/log-build` line for the batch.
- Anything that came back still-unusable → re-flag to spec-137 with the specific reason.
