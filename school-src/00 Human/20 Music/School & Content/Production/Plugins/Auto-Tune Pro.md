---
type: plugin
title: "Auto-Tune Pro"
category: Pitch/Vocal
vendor: "Antares"
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

# Auto-Tune Pro

![[Images/Auto-Tune Pro.png]]

**Category:** Pitch/Vocal
**Vendor:** Antares

## What it is

The industry-standard real-time and graphical pitch-correction plugin from Antares, offering both Auto Mode (real-time, retune speed/humanize) and Graph Mode (manual note-by-note editing).

## What it's used for

Correcting vocal pitch subtly for natural tuning or aggressively for the modern 'auto-tune' effect heard in pop, hip hop, and trap vocals.

## FX chain notes

Typically the first plugin on a vocal chain post-gain-staging, before EQ, compression, and de-essing.

## Techniques

- **A light touch even on an already-in-tune resampled vocal layer** — used as a final polish stage on a vocal ad-lib/baby layer that "sounded like it was auto-tuned already," i.e. reached for as a texture/consistency pass rather than corrective pitch fixing. Last stage before the layer feeds into the vocal group bus. → [[MicroShift]], [[Little AlterBoy]] — Overmono (Tape Notes), [[TN 187 Overmono - Full Video Episode]]
- **Sing a scratch/demo vocal through Auto-Tune deliberately for its texture, not correction — the "wrong" sound can become the keeper.** Finneas wrote and recorded a chorus hook in his own voice as a scratch vocal, and sang it through Auto-Tune specifically because it sounded "very atypical" of the rest of his output — an intentional identity/texture choice on a demo take, not a fix. He sat on the resulting hook (no verse ideas yet) until Billie Eilish heard it later and wanted to sing it — the atypical Auto-Tuned texture of the scratch vocal is part of what made the idea land as catchy. → [[Vocal Tuning]], [[Melody Writing]], [[Billie Eilish Vocal Chain]] — Mix with the Masters (Finneas), [[Vocal production for Billie Eilish by Finneas]]
- **First stage of a shared base chain across a 3-layer vocal harmony stack, run BEFORE a compressor rather than after.** A different vintage-soul vocal build (center + hard-right + hard-left takes, each a distinct melody/harmony, not doubles): Auto-Tune → a Waves compressor ("really brings the vocal out") → [[Little AlterBoy]] → EQ (cut low, light high boost) is the shared chain all three takes run before each gets its own distinguishing extra stage (see [[Little AlterBoy]] / [[ValhallaVintageVerb]]). Explicitly aimed at a "real song" vocal presence rather than the usual filtered-distant sample-vocal treatment. → [[Little AlterBoy]], [[Vocal Tuning]], [[Vocal Stacks and Ad-libs]], [[Kendrick Lamar Soul Sample Chain]] — loner, [how to make the most realistic vintage soul samples for kendrick lamar!?](https://www.youtube.com/watch?v=oMbeATqXOww)
- **Very light touch across a full three-take vocal stack, for subtle correction/glue rather than an audible pitch effect.** All three takes of a vintage-sample-style vocal layer (dry center + hard-panned left/right) run light Auto-Tune as one stage in a shared chain (with a light formant effect, [[ValhallaVintageVerb|Valhalla Vintage Verb]], [[Decapitator]], and EQ) — used for consistency across takes, not as a stylistic pitch-correction effect. → [[Vocal Stacks and Ad-libs]] — loner, [instantly make your melodies sound like vintage samples with this secret trick!?](https://www.youtube.com/watch?v=amvSl5ACFeo)
- **The "default" processed-vocal chain, used as one half of a two-layer clone treatment: Auto-Tune → Reverb → EQ.** On *UTOPIA*'s "God's Country," the vocal was recorded then cloned into two layers — this plugin's straightforward default chain (auto-tune, reverb, EQ, no exotic settings called out) is Layer 1, the "process it like I would any vocal" baseline; Layer 2 swaps this chain for a guitar amp + EQ specifically to cut through the mix (see [[Saturation and Distortion]]). → [[Reverb]], [[EQ]], [[Travis Scott Vocal Chain]] — loner, [the secrets behind Travis Scott's 'UTOPIA' production!?](https://www.youtube.com/watch?v=9vHZnAAegfw)
- **On an instrument, not a vocal — stage 1 of a guitar-detuning chain** — Mike Dean's *Rodeo* intro trick: run a dry electric guitar (not a voice) through auto-tune first, purely for the detuning artifact, before a tape/cassette stage, EQ, delay, and distortion finish the "woozy Travis Scott" texture. Extends the "as texture, not correction" idea below from vocals to any pitched source. → [[Cassette]], [[EQ Eight]], [[Delay]] — loner, [the secrets behind mike dean's 'rodeo' production!?](https://www.youtube.com/watch?v=V9FhndW8t74)
- **The five-setting workflow: input voice type → key → scale → retune speed → style, done** — and voice type is the most-forgotten one (Low Male for deep voices, Alto/Tenor for mid Omar Apollo-lane voices, Soprano for falsetto tracking; it's a range switch, and wrong = misread pitch everywhere) — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c)
- **The retune map:** ~30–40 = invisible support ("someone spotting you while you bench") · ~7 = deliberately audible tune (Greedo/Travis/Migos bite) · >10–12 = full T-Pain chip. Style completes it: **Legato** = smooth correction that keeps bends/passing notes, **Soft EFX** = the in-between with bite, **Hard EFX** = maximum computer. He skips Humanize entirely — retune + style covers it — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c)
- **Toggle single scale notes for one-off passing tones** — a half-step outside the scale sung once = enable that note on the keyboard, don't loosen the whole retune — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c)
- **Different tune per vocal lane** — ad-libs Legato when mains run Soft EFX (smoother bed), or more retune on reaching stacks; tune amount is *artist identity* — match their records, and never over-tune a natural singer or the performance suffers — Kenny Beats, [Auto-Tune Process](https://youtu.be/dyr6F9DLG7c)
- **As texture, not correction** — a super-low setting's phasey/flangy artifact adds character even on in-tune takes; more tracks left untuned than tuned — Disclosure, [Waterfall](https://youtu.be/sL5CG444qwQ)
- **Tune the lead, not the harmonies/adlibs** — keep human character in the stack — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI)

## Manual

- 📄 [[Auto-Tune Pro.pdf|Local PDF (Pro 11 user guide)]] · [All Antares manuals](https://www.antarestech.com/documentation) — grab the guide matching your installed version (Pro X = v10.x) from the same page; concepts below are version-stable.

**High-level points:**
- Two worlds in one plugin: **Auto Mode** (real-time, the "effect" and everyday correction) and **Graph Mode** (draw/edit pitch curves per note — Melodyne-style surgery).
- **Retune Speed is the sound**: 0 = instant snap (the T-Pain/trap effect), 20–50 = transparent correction on most pop vocals.
- **Flex-Tune** loosens the grip — corrects only near target pitches so scoops/slides survive. The single biggest "natural tuning" control.
- **Classic Mode** switches the algorithm to Auto-Tune 5 — the specific vintage snap on countless 2000s records; it *is* a different sound, not nostalgia.
- Set **Key/Scale first** (from the song page's Chords section) and remove problem notes from the scale — wrong key is 90% of "Auto-Tune sounds bad."
- Formant/Throat modeling keeps hard tuning from going chipmunk — or exaggerates it on purpose.

## Used in my chains

On **individual vocal tracks**, never the group ("the group has the chain" — except Auto-Tune, because parts need different keys/retunes). Retune is pinned tighter as the layer sits further back:

- **[[1 Main Vocal Track|Main Vocal Track]]** — *slot 1*: Retune 45, Humanize 100%, Flex-Tune 0, key/scale = song (natural pop, "invisible" support).
- **[[1 Double Vocal Track|Double Vocal Track]]** — Retune 18 (tighter than the lead so the double fuses instead of chorusing).
- **[[1 Harmony Vocal Track|Harmony]]** / **[[1 Main Vocal High Track|High/falsetto layer]]** — Retune 22 · scale set to the harmony's notes / input voice type = register sung.
- **[[1 Ensemble Stack Track|Ensemble Stack Track]]** — Retune 25, every layer to the same key/scale so separate takes fuse.
- **[[1 Backup Vocal Track|Backup / ad-libs]]** — vary per lane (Legato bed vs. more retune on reaching stacks), never one setting across mains + ad-libs.
- **[[2 Ensemble Stack Group|Ensemble Stack Group]]** — harmonies run slightly *more* tuned than leads to lock the chord (back off to ~40+ for a Beatles/block-harmony blend).

## Key Parameters

```visual-key
image: Images/Auto-Tune Pro.png
coords: Images/Auto-Tune Pro.coords.json
```
*Visual key — numbered circles mark each editable control (①–⑦ on the main Auto page; ⑧ Auto-Motion opens from **Advanced**, ⑨ from the **Graph** tab).*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Retune Speed | How fast pitch snaps to target (0–400 ms) | 0–10 = the hard effect; 20–50 = invisible pop correction; automate per section | T-Pain built a career on 0; Travis Scott/Future run hard-tuned throughout; Cher "Believe" is the origin |
| ② | Flex-Tune | Only corrects near target notes | Raise it to keep bends/scoops human while centers stay tuned | Documented as the "natural" knob since AT8 |
| ③ | Humanize | Relaxes retune on sustained notes | Fixes the "held notes go robotic while runs sound fine" problem | — |
| ④ | Key / Scale (+ remove notes) | Target note set | Pull from the song's [[Chords]] section; drop the 2nd/6th if the melody avoids them — fewer wrong targets | Kanye's *808s & Heartbreak* leaned on scale-locked hard tune as an instrument |
| ⑤ | Classic Mode | The Auto-Tune 5 algorithm | Use for the specific 2000s snap/artifact flavor; modern mode is smoother | The "AT5 sound" is a documented preference among hip hop engineers |
| ⑥ | Formant + Throat | Preserves/reshapes vocal resonance | ON for hard tune (avoids chipmunk); push Throat length for creative thickening | — |
| ⑦ | Natural Vibrato | Scales the singer's own vibrato | Reduce slightly under heavy tune — vibrato fights the snap | — |
| ⑧ | Auto-Motion | Melodic pattern sequencing of pitch | Sparingly: turns held notes into melodic runs (the hyperpop toy) | — |
| ⑨ | Graph Mode tools | Draw/drag note objects and curves | For the one sour note in an otherwise-keeper take — retune 0 the note, not the track | — |

*First on the vocal chain, after gain staging (see [[FX Chain System]] vocal chains).*

## See also

- Effects: [[Pitch and Formant]] · [[De-essing]]
- Palette: [[LEAD Slot]] · [[AIR Slot]]
