---
type: plugin
title: "Soothe2"
aliases: ["Soothe 2"]
category: Pitch/Vocal
vendor: "oeksound"
tags: [plugin]
depth_linked: true
video_enriched: true
manual_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Soothe2

![[Images/Soothe2.png]]
*Vendor's current UI (Soothe3 shown — oeksound's product page for Soothe2 now redirects to Soothe3).*

**Category:** Pitch/Vocal
**Vendor:** oeksound

## What it is

oeksound's dynamic resonance suppressor, using intelligent detection to tame harsh resonances and sibilance dynamically rather than with static EQ cuts.

## What it's used for

Smoothing harsh vocal resonances, taming brash cymbals/guitars, and reducing sibilance-adjacent harshness dynamically.

## FX chain notes

Used after the main EQ/compression stage, reacting to problem frequencies as they occur rather than statically cutting them.

## Techniques

- **Saved preset called "DS," paired with [[Leapwing DynOne]] (unowned) on the full vocal bus, for de-essing/harshness control without a dedicated de-esser.** Myles Smith / Peter Fenn, on *My Mess*'s intimate vocal chain: DynOne (multiband, subtle transient work) plus this on a "DS" preset "just like keeps some of the harshness away." → [[Multiband Dynamics]] — Myles Smith / Peter Fenn (Tape Notes), [[TN 184 Myles Smith & Peter Fenn - Full Video Episode]]
- **Soft mode + low Depth + higher Rendering/Oversampling for maximum accuracy on a vocal's moving fundamental.** A vocal's resonant frequencies shift note to note (unlike a fixed instrument), which is exactly the case this plugin's dynamic approach suits better than a static resonance cut — not mandatory, but a way to catch subtle issues that specifically arise from a moving fundamental. Higher Rendering/Oversampling targets phase-issue avoidance, at extra CPU cost. → [[1 Main Vocal Track]] — Sage Audio, [Vocal Masterclass](https://www.youtube.com/watch?v=dq-vQAGsd8w)
- **A stated general rule for vocals: never run the Mix knob near 100% on this style of plugin — dial it well down.** Core lead-vocal stage of a real per-track chain (positioned right after the first broad EQ pass, before a second EQ pass): "it's a great, resonant, pretty much like a resonant compressor. The more you push up, the more frequencies get pushed down... I set the mix really low, I got it on 38. These kinds of plug-ins, they're not that cool on 100, you know? Sometimes they are, but for vocals, they don't really do that for me, so I always drop the mix down." **Mix: 38%.** Job-split note from the same chain: this plugin handles the *harsher* frequencies dynamically, while a separate subtractive multiband EQ downstream (mapped to [[Pro-MB]]) handles static problem zones — two tools, two clearly separated jobs. Reused later in the same session run noticeably HARDER (more Mix/Depth) on an outro guitar bus specifically because it's not a vocal — "this isn't a vocal, so I'm hitting it a little harder than I normally would." → [[EQ]], [[Multiband Compression]], [[Pro-MB]], [[Saturation and Distortion]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **Run right after a manual EQ resonance-notch, as the second stage of a two-part resonance chase on a lead vocal — not a replacement for the notch, a mop-up for what it missed.** Chain order: EQ (HPF + one narrow-Q cut on an identified ugly resonance) → this plugin ("softening the aggression and stuff") → onward to a proximity-effect fix and compression. Positioned mid-chain here, not as a final tame — placement follows where the resonance actually surfaces, not a fixed slot. → [[EQ]], [[De-essing]], [[James Blake Vocal Chain]] — Mix with the Masters, [[MSM Mixing James Blake's Vocals]]
- **Kick-triggered catch-all on a manually-ducked bass — the second stage of a two-part low-end duel, not the whole trick by itself.** Duplicate the kick track complete with every plugin already on it (the exact post-processing trigger, not a dry copy, so timing lines up), bring the duplicate down to sit right under the bass, hand-draw a manual "dip" on the bass around each kick hit, then add this plugin on the bass — triggered by the duplicated kick — to catch any transient/resonant energy that still pokes through after the manual dip. Framed as his technique on "pretty much every mix," genre-agnostic — the only variable is how much of it gets used (EDM can push it obvious/pumping, most genres want it invisible). Net result on the demoed mix: **no audible bass-dip, no voltage added even after the bass comes in, and 4 dB of headroom recovered** vs. skipping the move entirely. → [[Sidechaining]], [[1 Digital Bass Track|Digital Bass Track]] — Jaycen Joshua (Mix with the Masters), [Mixing Summits with Jaycen Joshua](https://www.youtube.com/watch?v=L6xx7DWKzng)
- **Run this stage earlier than the usual "after compression" spot, specifically to catch resonances before later processing regenerates new ones — with the kick excluded from triggering it.** On a mastering chain, placed this plugin right after the opening EQ pass rather than deeper in the chain — the stated reasoning: resonances caused by later compression/saturation only need chasing if the earlier processing already regenerated them, so catching the mix's own inherent resonances first is the more efficient order on a master specifically. Used the **external-sidechain/detector exclusion** (⑧) to keep the kick from ever triggering the reducer, so its low-end fundamental doesn't get chased or thinned; the rest of the spectrum got very subtle attenuation, blended in with the **mix dial** rather than run near-100%. → [[Master Chain]] — Sage Audio, [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34)
- **A second mastering resonance-reduction pass, from a "Balance" preset this time — corroborates the "Bounce to the Grammy Awards" entry below with the same underlying mechanism.** Very subtle overall attenuation of resonant/excess frequencies for a clearer, more balanced master: start from the **Balance** preset, then hand-adjust the pre-emphasis EQ bands until the track sounds most balanced, then A/B against a **Delta** solo of what's actually being removed to confirm it's genuinely excess/resonant content rather than tone. Read with high confidence as this plugin despite the source's auto-captions rendering the name as "resonance producer" — the preset-then-pre-emphasis-bands-then-Delta workflow matches this note's own documented mechanism (⑥ Delta monitor) exactly, just a different named preset than the "Bounce to the Grammy Awards" entry below. → [[EQ]], [[Master Chain]] — Sage Audio, [Creating a Hip Hop Mastering Chain](https://www.youtube.com/watch?v=4JXwuR6AUok)
- **Resonance reduction reframed as multiband compression with a preset threshold, not a form of EQ — the "Bounce to the Grammy Awards" preset for mastering.** This preset measures the **mid and side images separately**, so resonance suppression can differ between the center and the sides rather than treating the stereo field as one signal. From there, adjust the pre-emphasis EQ bands to target whatever's too prevalent — commonly the low-mids and the sibilance range, but confirm by ear rather than assuming. Higher-quality/oversampling settings reduce phase cancellation on a mastering pass specifically; dial the final amount with the mix knob rather than depth alone. Free-alternative-tier option for the same job: Baby Audio Smooth Operator (not a full equivalent, but affordable). → [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **A budget threshold-only alternative exists for the narrower "tame harsh highs, keep the body" job** — the unowned free Max for Live "High Frequency Limiter" (GM Audio) is a single-threshold high-frequency limiter with a Solo-to-preview-what's-cut workflow, pitched as a cheap stand-in when you can't afford something like Soothe/Soothe2 but still want the top end mostly intact rather than dynamically resonance-suppressed — Soothe2's dynamic, frequency-aware detection remains the deeper tool for actual problem-resonance work; the M4L device is closer to a safety-net limiter than a real substitute. → [[Plugin Wishlist]] — dnksaus, [10 Devices You Should Know About (Max For Live)](https://www.youtube.com/watch?v=B0i_S4jbhso)
- **The "secret plugin" origin story** — Charlie Puth tipped him years earlier, Alex Tumay re-raised it (used it on an 808, "not what you'd expect"); demo via a **Josh Goodwin setting** on guitar: "it soothes all the harshest things… a catch-all for fixing your mixes, one of the biggest cheat codes I've ever seen" — and it became his first-reach mix plugin — Kenny Beats, [Cook Up From Scratch](https://youtu.be/l7AjRTXex2U)
- **The first plugin off the bench** — in Kenny's mix loop, volume moves come first; when a sound sucks at every level, Soothe2 is what he reaches for ("that's really what I'm using a lot") — the problem is resonance, not level — Kenny Beats, [Beat Mix & Creation Process](https://youtu.be/FC__hbvnETY)
- **Soothe *before* distortion if the source is already bad; *after* if the distortion creates the junk** — no fixed rule, decide by what's causing the harshness. → [[Saturation and Distortion]] — Disclosure, [SSL SIX Mixing Al Green](https://youtu.be/ZCNX8U6oZmE)
- **EQ *before* Soothe when brightening** — put the boost first so Soothe catches any harshness the boost adds (e.g. brightening strings, ~75% mix); works hard on a nasty vocal resonance (~90%) alongside a small EQ notch. — Disclosure, [SSL SIX Mixing Al Green](https://youtu.be/ZCNX8U6oZmE)
- **Vocal-triggered sidechain to make space** — key Soothe off the vocal on the synth bus so instruments give up exactly the frequencies the vocal occupies; the sharpness knob makes it more surgical than a wideband ducker (Trackspacer) — Disclosure, [Looking For Love](https://youtu.be/NlJt0pCptGk)
- **Frequency-specific ducking in place of Pro-MB** — more precise than multiband sidechain for carving one source out of another's way — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck)
- **One instance on the vocal bus** (CPU-heavy) to tame harshness across a stack; also smooths a filter-distorted synth lead — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ) & [NO CAP](https://youtu.be/kz5dmb3QdI8)
- **Catch AI stem-separation artifact peaks on an extracted acapella** — after mono-summing an AI-separated vocal (e.g. from LALAL.AI), a pass of Soothe knocks down resonant peaks introduced by the separation algorithm itself, distinct from normal vocal harshness, as part of a cleanup chain to make the extracted vocal mix-ready. — Sol State, [How To Take An Acapella From ANY Song (And Remix It)](https://www.youtube.com/watch?v=5pBUt5sHjGU)

## Manual

- 📄 [[Soothe2.pdf|Local PDF]] · [Official web manual](https://oeksound.com/manuals/soothe2/)

**High-level points:**
- It is **not an EQ and not a multiband compressor**: it detects narrow resonances relative to the surrounding spectrum and cuts only those, only while they happen.
- The **band curve is a sensitivity map**, not a gain curve — you're telling it *where to listen*, not what to cut.
- **Delta (headphone icon) is the honesty button**: listen to only what's being removed; if the delta contains "tone" instead of "harshness," back off.
- **Depth vs Sharpness vs Selectivity** is the whole engine: how deep cuts go, how narrow they are, and how picky it is about what counts as a resonance.
- Full **Mid/Side and stereo-unlink** processing — sides-only soothing de-harshes width without touching the center.
- **External sidechain mode** flips it into a masking tool: it cuts track A only where track B has energy.

## Used in my chains

My **dynamic resonance suppressor** — tames harsh peaks static EQ can't, placed before saturation (so you don't excite resonances) or as a final tame. Soft mode, default sharpness/selectivity (~3), raise depth until clearly working then back off, delta mode to hear what it removes:

- **[[1 Main Vocal Track|Main Vocal]]** (slot 4) / **[[3 Vocal Bus|Vocal Bus]]** (6) — resonance suppression, focus 1–6 kHz.
- **[[1 Drums Hat Track|Drums Hat]]** (2, de-pierce) / **[[1 Acoustic Guitar Track|Acoustic Guitar]]** (5, pick/string harshness) — targeted harshness control.
- **[[Master Chain]]** (2, dynamic unmasking) — the owned stand-in for Gullfoss's dynamic-unmask half (one CPU-heavy instance across the whole mix).
- **[[2 Guitar Group|Guitar Group]]** — *external sidechain = lead vocal* to duck only the exact frequencies the vocal occupies, moment to moment.

## Key Parameters

```visual-key
image: Images/Soothe2.png
coords: Images/Soothe2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Depth | Max amount of reduction | Vocals: start ~3–6 dB effective; if you *hear it working*, it's too deep | — |
| ② | Sharpness | How narrow the cuts are | Sharper for whistle-y resonances; broader for general harshness | — |
| ③ | Selectivity | How picky resonance detection is | Higher = only true spikes get cut (safer on dense mixes) | — |
| ④ | Band sensitivity curve | Frequency-weighted listening map | Boost sensitivity 2–8 kHz for vocal harshness; roll it to 0 below ~200 Hz so it never touches warmth | — |
| ⑤ | Attack / Release | Reaction speed of the cuts | Fast attack for sibilant spikes; slower release keeps sustained notes from pumping | — |
| ⑥ | Delta monitor | Solo the removed signal | The workflow: set by ear → check delta → halve Depth → A/B | — |
| ⑦ | Stereo link / M/S | Independent side processing | Sides-only on the mix bus tames cymbal wash without dulling the vocal | — |
| ⑧ | External sidechain | Cut this track where another has energy | Classic move: soothe the guitars/keys keyed by the lead vocal = automatic vocal pocket | — |
| ⑨ | Oversampling / quality | Detection resolution vs CPU | Render-quality high, tracking-quality normal | — |

*Standard slots: after vocal EQ/comp; on cymbal-heavy drum buses; on reverb returns to de-harsh tails (see [[FX Chain System]]).*

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
