---
type: plugin
title: "Oxford Inflator"
category: Drive/Color
vendor: "Sonnox"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Oxford Inflator

![[Images/Oxford Inflator.png]]

**Category:** Drive/Color
**Vendor:** Sonnox

## What it is

Sonnox's loudness/harmonic enhancement plugin, adding perceived loudness and harmonic density via a distinctive saturation-like algorithm without a traditional limiter's pumping.

## What it's used for

Adding perceived loudness and glue to a track, bus, or master without the artifacts of hard limiting.

## FX chain notes

Used late in a bus/master chain, often just before or blended alongside the final limiter.

## Techniques

- **As a wave-shaping alternative to more/serial compression on a vocal that still feels weak or lifeless after compressing.** More compression (or stacking a second serial compressor) tends to warp tone unpleasantly past a point — a wave shaper instead amplifies only the quiet-detail amplitude range while keeping peaks untouched, pulling detail forward without more gain reduction. Compared against Melda's free wave shaper in the source video: Melda offers more flexibility/adjustability, the Inflator less flexible but with a distinct, pleasant character of its own. → [[Compression]] — Sage Audio, [Vocal Compression: Save Years of Trial & Error](https://www.youtube.com/watch?v=2RWijLWuW7I)
- **Use this plugin (or upward processing generally) to fight TEMPORAL masking on a snare's ring, not just simultaneous masking.** A loud transient masks quiet content both before it (pre-masking, ~20 ms) and after it (post-masking, up to ~100 ms) — a snare's ring sits right inside its own transient's post-masking window while also competing with everything else playing simultaneously, a double masking problem. Running upward processing on the snare channel/bus (bringing its own quiet detail up relative to its peak) raises the ring's amplitude relative to the transient burying it, cutting through both forms of masking at once — a targeted alternative to trying to carve the masker elsewhere in the mix. → [[Masking and Carving]], [[Snare Design]], [[TRANSIENT Slot]] — Sage Audio, [3 Advanced Audio Concepts You've (Probably) Never Heard Of](https://www.youtube.com/watch?v=cjwBvTtE5-I)
- **The alternative to peak-down compression for an "upfront" vocal, without the overprocessed ADSR/transient artifacts.** Peak-down compression + makeup gain is the classic upfront-vocal recipe but frequently reads overprocessed. Instead, amplify the vocal's QUIET details without touching peaks — this plugin boosts lower-amplitude content while leaving peaks essentially untouched until they near 0 dB, the same job the Omnipressor and plain parallel compression also do (see [[Plugin Wishlist]]). Best result blends BOTH: subtle-to-moderate peak-down compression alongside this plugin's upward processing — peaks controlled a little, quiet detail brought forward a lot — for an upfront vocal that doesn't announce itself as processed. → [[Compression]], [[Parallel Processing]] — Sage Audio, [The 5 MOST IMPORTANT Vocal Mixing Tips](https://www.youtube.com/watch?v=rXk1lvT6AhU)
- **A concrete, named answer to "is Enhance the same as this plugin?" — a question the source says comes up often.** **The Oxford Limiter's Enhance function is the same processing as this plugin with Curve set to 50** — but the two units land differently in the final result: this plugin's harmonics run higher in amplitude in the lows and much subtler in the highs, while Enhance reads more balanced overall, with extra emphasis on high-frequency harmonics that "tie the high range back in to the song's root note." Sharpens this note's existing Oxford-Limiter/Enhance mentions (below, and in the "four upward-compression tools" bullet) with an exact parameter match rather than a general "similar mechanism" note — worth A/B'ing **Curve 50** on this plugin against the unowned Oxford Limiter's Enhance before assuming they're interchangeable. → [[Master Chain]], [[Plugin Wishlist]] — Sage Audio, [My Favorite Mastering Chain - Why Simple is Better](https://www.youtube.com/watch?v=bLVMsAwjRPw)
- **A worked EDM-master gain-staging pair for this plugin's Effect/Input relationship, and its Band Split's Curve control as a genuine tone choice.** After auditioning several upward processors for a specific mix and preferring this one's character, ran an **aggressive Effect %** then **lowered Input slightly to compensate** (standard gain-staging discipline for this stage, restated with a concrete "aggressive" data point); separately, the **Band Split** setting with a **slightly higher Curve value** sounded best on that mix — a reminder that Band Split/Curve is worth auditioning by ear rather than left at default. "Use your ear and find the settings you enjoy" — not a fixed recipe. → [[Master Chain]] — Sage Audio, [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34)
- **The developers' own recommended operating method: Effect to 100, then use Input to dial how aggressive the processing reads — rather than starting from a low fixed Effect amount.** Framed mechanically as prioritizing signal content with a positive value over content with a negative value, which raises the ratio of signal-to-silence (or high-level-to-low-level signal) — the same upward-processing job this plugin always does, just driven from the opposite end of the Effect knob compared to this note's existing ~30–50%-Effect bus setting below. Worth A/B'ing against the existing setting rather than a straight swap. → [[Master Chain]] — Sage Audio, [How to Make a Mastering Chain](https://www.youtube.com/watch?v=WNkkwWh7DJg)
- **Pair this plugin with a frequency-split parallel saturator for a two-tool density move: this stage does overall density, the saturator makes specific elements more prominent.** Increase Effect, adjust Input to compensate for the added gain (standard gain-staging for this stage). Follow it with a parallel valve/tube saturator (a "PSP" unit per captions, exact model unclear — unowned, see [[Plugin Wishlist]]) split so its low section targets a kick's fundamental specifically and its high section targets vocal presence specifically, rather than a generic low/high split. Result: this stage makes the overall mix read fuller, while the saturator's targeted split makes the kick and vocal specifically more prominent. → [[Saturation and Distortion]], [[Master Chain]], [[Plugin Wishlist]] — Sage Audio, [How to Master a Song Start to Finish](https://www.youtube.com/watch?v=aUygMNRx2yE)
- **New York style *upward* compression, isolated to a mid frequency band.** Send + aux; linear-phase EQ high-pass + low-pass to isolate a mid band (worked example: **400 Hz–4 kHz**); this plugin's **Effect at 100%** on that isolated band; blend the processed band back in with the original until balanced. The dynamic range of that band shrinks and previously-masked detail inside it becomes clearly audible — a more surgical version of running Inflator wide-band on the whole master. Same "drive it with EQ first" option as regular parallel compression applies: boost specific frequencies into the aux chain before the Inflator stage to make its effect on those ranges more apparent (worked example: a 2 kHz bell for vocal clarity, a ~500 Hz side-image boost — both by ear, not a fixed rule). → [[Parallel Processing]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **One of four named upward-compression tools for the same mastering job — the other three are unowned.** Waves MV2 measures and lifts quiet sections; the free Melda M Compressor's custom-shape mode does a similar job with a different final character; Xfer OTT (owned) offers frequency-specific maximization but needs very subtle settings by default. This plugin's mechanism — "prioritizing aspects of the signal with more zeros and ones" per its own manual, then amplifying and adding harmonics to those parts — is one flavor among several; the video's own stated favorite for this exact role is the **Sonnox Oxford Limiter's Enhance function** (unowned, a different Sonnox product from this plugin — see [[Plugin Wishlist]]), which increases perceived detail/loudness without attenuating peaks at all. → [[OTT]], [[Clipping and Loudness]], [[Plugin Wishlist]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **How Inflator mechanically differs from a clipper — it pushes quieter signal upward, then gradually/gently reduces amplitude as it approaches 0 dB, rather than squaring the waveform.** Some call it a "soft clipper," but the observed wave-shaping is far more gradual bending than a clipper's flat-topped squaring — the mechanical reason it reads as density/warmth rather than a harder clipped edge; framed as one of the gentler maximization options vs. a straight limiter or a hard clipper. → [[Clipping and Loudness]], [[Master Chain]], [[Limiting]] — Sage Audio, [Stop Limiting Your Masters](https://www.youtube.com/watch?v=s_LDCzWx20g)
- **Upward processing is a mechanically distinct dynamics tool from saturation and limiting — and it's the reason a mastering chain can get loud without heavy limiting.** Three-way distinction: saturation reshapes peaks; a limiter ideally retains peak shape entirely and uses clean gain to attenuate; **upward processing (this plugin's role) reshapes the waveform from its quietest points UP**, which preserves timbre and transient impact while still adding loudness/density. Placed in the chain after RMS/peak compression and before the final tone EQ + limiter — bringing up quiet detail there means the limiter only has to catch a few dB at the very end. Every upward processor "shapes a little differently" (unique harmonics per unit) — the video treats **Oxford Inflator** (owned), **PSP Vintage Warmer 2**'s knee function, and the **Weiss MM-1 Maximizer** (Softube) as three genuinely different-flavored options for this same slot, not interchangeable — the other two aren't owned, see [[Plugin Wishlist]]. → [[Master Chain]], [[Limiting]], [[Saturation and Distortion]] — Sage Audio, [The Only Music Mastering Video You'll Ever Need](https://www.youtube.com/watch?v=M88T8jFL2uU)
- **A/B every instance across the whole session at once to hear it** — Inflator can seem to do nothing on any single track in isolation; toggle bypass on *every* instance simultaneously (drums, bass, vocals, master) and switch back and forth — the cumulative "does this sound better with it on" difference becomes obvious even when no individual instance seems to be doing much — this is how Disclosure's own live sound engineer sold them on running it everywhere — Disclosure, [First Twitch Stream Ever (Production Tutorial)](https://youtu.be/IObzp3OugtY)
- **On a drum bus, push into the red and toggle the Clip button on/off for extra flavor** — the two states (clip on vs off) give two different saturation characters at the same drive level, worth A/B-ing per song — Disclosure, [First Twitch Stream Ever (Production Tutorial)](https://youtu.be/IObzp3OugtY)
- **Up-front loudness/richness on vocals, buses, and master** — subtle; it boosts gain a touch so balance that out to hear the effect; adds a "go time" presence — Disclosure, [You've Got To Let Go](https://youtu.be/1iRPvK1gaOI), [Waterfall](https://youtu.be/sL5CG444qwQ) & [Looking For Love](https://youtu.be/NlJt0pCptGk)
- **Half of the current 2-plugin master chain** (clipper + Inflator, no EQ/comp) — its upward "compression" does the loudness while the clipper catches peaks — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8)

## Used in my chains

My **density / loudness-without-limiting** stage — adds perceived loudness, warmth, and "expensive" density that does almost nothing solo but stacks obviously across the whole mix:

- **[[3 Drums Bus|Drums Bus]]** (slot 3) / **[[3 Vocal Bus|Vocal Bus]]** (slot 4) / **[[3 Guitar Bus|Guitar Bus]]** (slot 3, optional) — *density*: Effect ~30–50%, Curve to taste, Clip off (toggle on/off for extra flavor).
- **A/B every instance at once** — the cumulative effect (drums + bass + vocals + master all inflating together) is obvious even when any single instance seems to do nothing (Disclosure's engineer's trick).

## Key Parameters

```visual-key
image: Images/Oxford Inflator.png
coords: Images/Oxford Inflator.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Input | Level driven into the inflator | Set so the Effect knob works in its sweet spot; watch output | — |
| ② | Effect | Amount of the inflation process (density/loudness) | ~30–50% on a bus — obvious across the mix, subtle per instance | Disclosure stacked-inflator trick |
| ③ | Curve | Bias of the harmonic curve (± shapes even/odd harmonic content) | Positive for warmth/roundness; negative for a more aggressive edge | — |
| ④ | Clip | Hard-clip stage on/off | Toggle off/on for extra flavor; off keeps it transparent-ish | Disclosure — "touching red, clip toggled" |
| ⑤ | Output | Makeup level | Level-match against bypass — inflation adds perceived loudness | — |

## See also

- Effects: [[Saturation and Distortion]]
- Palette: works any slot — commonly [[BASS Slot]], [[TRANSIENT Slot]], [[LEAD Slot]] · [[Sound Palette]]
