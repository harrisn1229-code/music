---
type: plugin
title: "Pro-L 2"
category: Compressor/Limiter
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
---

# Pro-L 2

![[Images/Pro-L 2.png]]

**Category:** Compressor/Limiter
**Vendor:** FabFilter

## What it is

FabFilter's flagship mastering limiter with multiple algorithms (Punchy, Dynamic, Allround, Aggressive, etc.), true-peak limiting, and detailed loudness metering (LUFS).

## What it's used for

Master-bus loudness maximization and true-peak-safe limiting for streaming-loudness targets.

## FX chain notes

The final device on the master chain, after all EQ, multiband compression, and saturation.

## Techniques

- **Final stage of a four-limiter layered mastering chain, Transparent mode, only ~2dB of reduction.** Rather than one limiter pulling several dB, Overmono chain several limiters each catching 1-2dB with a different character — a punchy stage, an EQ+comp stage, a "smeary" stage (Waves L2, used very lightly), then this device last in Transparent mode for the final, cleanest 2dB. Different attack/release per stage is the point — layering characters rather than leaning on one setting. → [[Compression Staging]], [[Master Chain]] — Overmono (Tape Notes), [[TN 187 Overmono - Full Video Episode]]
- **Run on a LEAD VOCAL TRACK directly, not the master bus — Attack deliberately set slow so each phrase's initial transient pokes through before the limiter clamps down.** Illangelo (The Weeknd): "just grabbing peaks, they're all usually at the beginning of the phrase because the compressor attack is a little bit slow because you want that energy to poke through. You don't want to have the vocal come in and it's already clamped down. So I always like to opt for a really slow Attack and then adding layers to it to help the process." Sits downstream of a gate ([[Pro-G]]) and a de-esser (unowned Eiosis E2) and upstream of [[Pro-MB]] in his chain — a genuinely different application from this note's usual master-bus/true-peak role. → [[Pro-G]], [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]
- **A second EDM-specific limiter stage — after a first limiter's already caught peaks, run this one with oversampling on, no look-ahead, quick attack/release, and channels de-linked, targeting a specific EDM LUFS window.** A worked two-limiter EDM master runs a first limiter for peak control (see the Sonnox Oxford Limiter entry on [[Plugin Wishlist]] for that stage's own settings and this device's dedicated dual-limiter techniques below), then a **second limiter — this device fills that role well — set up for dynamic/transient character rather than more peak-catching**: oversampling engaged (anti-aliasing on the more nonlinear second stage), **no look-ahead** (a genuine change of tack vs. this note's own lookahead-forward stance elsewhere), a **quick Attack/Release**, and **Channel Link de-linked** so left/right attenuate independently — described as bringing "a little life and variation back into the track" under heavy limiting, the same de-linked-channel width mechanism already logged on [[Width and Stereo]]/[[Master Chain]] from other sources, same tension against this note's linked-channel research target. Landing level for an EDM master specifically: **≈ −6.5 to −6 LUFS integrated** — louder than this note's/[[Master Chain]]'s existing −9 to −7 LUFS-I pop/trap target, described as "pretty standard for EDM" but explicitly adjustable to taste. → [[Master Chain]], [[Limiting]], [[Width and Stereo]], [[Plugin Wishlist]] — Sage Audio, [Creating an EDM Mastering Chain in 10 Steps](https://www.youtube.com/watch?v=yOJ-EtjFD34)
- **Why the ~50 ms release-time sweet spot elsewhere on this note isn't arbitrary — a worked wavelength/period derivation for this plugin's ④ Release.** A frequency's period (time for one full oscillation) is `1 ÷ frequency`, ×1000 for ms: 20 Hz (the bottom of human hearing) works out to `1/20 = 0.05 s = 50 ms`; a 200 Hz wave completes one oscillation in 5 ms. Set ④ Release *shorter* than the period of a frequency present in the master (e.g. 10 ms against 20 Hz content) and the limiter can alter that wave's amplitude mid-cycle — audible distortion, not a subtle effect. So **50 ms is a floor, not a target**: at or above it, every frequency in the audible range (20 Hz–20 kHz) completes its cycle before the release engages. Don't run it too long either — an overly long release keeps attenuating well past the peak that triggered it, catching unrelated later transients and reading as lost definition/detail. This gives this note's own release-time ladder below (50 ms sweet spot / 250 ms+ smoother / 5–10 ms max-loud) its mechanical "why" for the first time. → [[Limiting]] — Sage Audio, [How to Master Loud and Clear Without Sounding Harsh](https://www.youtube.com/watch?v=cy-S6YmVe2U)
- **Two distinct distortion risks behind pushing this plugin's ceiling hard, and why ⑤ Lookahead + ⑦ Oversampling address both.** Inter-sample peaking: a signal can be so consistently loud it exceeds what the session's bit depth *and* sample rate can accurately represent — even while the channel meters show nothing wrong; a lower sample rate encodes less accurately, worsening it. Raising ⑦ Oversampling improves quantization accuracy (reduces inter-sample-peak distortion); raising ⑤ Lookahead gives the limiter more time to react before the peak arrives (reduces unwanted clipping). If neither is enough, True Peak mode is the fallback (this note's own contrarian stance below is to avoid leaning on it as the default). Separately, **aliasing**: at a low session sample rate (44.1 kHz cited), distortion generated by hard limiting can exceed the frequency ceiling that rate can represent — the excess doesn't vanish, it **reflects back down the frequency spectrum** as aliasing distortion, which reads as harsh and unpleasant almost every time. ⑦ Oversampling fixes this the same way it fixes inter-sample peaking. → [[Limiting]], [[Clipping and Loudness]] — Sage Audio, [How to Master Loud and Clear Without Sounding Harsh](https://www.youtube.com/watch?v=cy-S6YmVe2U)
- **What the Attack control actually does on this plugin — not what a compressor's Attack does.** A limiter's real attack (fully engaging gain reduction on a peak) is effectively instant/zero milliseconds regardless of the knob; on this plugin's ④ Attack/Release stage, the control that reads as "attack" actually sets the time *before the release/recovery envelope begins*. Quicker = less distortion; longer = louder-reading master, at the cost of some cleanliness. Combine with the release-time ladder below for finer timbre control. → [[Limiting]] — Sage Audio, [How to Limit Your Master](https://www.youtube.com/watch?v=SrFwQqDMJQM)
- **A concrete release-time ladder for this plugin's ④ Release, a looser/faster set of numbers than this note's own ">100 ms" tool-agnostic target below.** 50 ms is the sweet spot for a loud master without introducing distortion; anything faster mildly-to-moderately distorts (may or may not be wanted); 250 ms+ for a smoother-sounding master; 5–10 ms if raw loudness matters more than cleanliness and some distortion is acceptable. *Tension flag: sits well below this note's own "release above 100 ms" tool-agnostic target from a different Sage Audio source — worth A/B'ing both on a given master, not a default swap.* → [[Limiting]] — Sage Audio, [How to Limit Your Master](https://www.youtube.com/watch?v=SrFwQqDMJQM)
- **A looser attenuation ceiling than this note's own "max 3 dB" target: typically stay under 5–6 dB of GR at any point, more only if the genre/track calls for it.** If a loud master needs more than that, reach for low-level compression *before* this plugin instead of pushing it harder — compression amplifies the quieter parts of the signal, raising perceived loudness without needing aggressive limiting. → [[Limiting]] — Sage Audio, [How to Limit Your Master](https://www.youtube.com/watch?v=SrFwQqDMJQM)
- **A mid-side limiter, as a distinct stereo-expansion route from this note's own Channel Link ⑥ unlinking below: attenuate the mid image more than the side.** Two named ways to get stereo expansion from a limiter — this one (route into mid/side, limit the mid harder) and channel-unlinking (below). Unlinking channels won't widen every master, but can make L/R read as more unique/distinct as a side effect. → [[Width and Stereo]], [[Limiting]] — Sage Audio, [How to Limit Your Master](https://www.youtube.com/watch?v=SrFwQqDMJQM)
- **Punch and Modern are opposite distortion strategies, by design, not just different "characters."** Modern reduces harmonic distortion significantly — the transparent choice for a clean master. Punch deliberately creates purposeful distortion specifically to increase the volume of transients — a character choice, not a flaw. Pick the algorithm for the distortion behavior you actually want, not just for how loud it reads. → [[Limiting]] — Sage Audio, [Limiter Masterclass](https://www.youtube.com/watch?v=LZxglknf3xA)
- **A concrete non-true-peak recipe for inter-sample peaking, mapped onto this plugin's own controls: Output Ceiling ② −0.5 to −1 dB, Lookahead ⑤ at 0.1 ms, Oversampling ⑦ at 4x or more.** Won't eliminate inter-sample clipping completely, but greatly reduces it while retaining the transient's ADSR — the numeric version of this note's own "avoid True Peak mode, use oversampling with very low lookahead instead" stance below, sourced from a different Sage Audio video. → [[Limiting]] — Sage Audio, [Limiter Masterclass](https://www.youtube.com/watch?v=LZxglknf3xA)
- **Sage Audio's own de-linked default for Channel Link ⑥: only about 30%** — enough for some stereo cohesion, loose enough to keep most of the per-channel independent detection/attenuation that a fully-linked limiter would lose. *Tension flag: this pulls the opposite direction from this note's own "60–80%" tool-agnostic target and [[Master Chain]]'s §8 "keep channels linked, L/R RMS within 0.8 dB" research-backed default (a different Sage Audio video) — worth A/B'ing on Channel Link ⑥, not a default swap.* → [[Limiting]], [[Master Chain]] — Sage Audio, [Limiter Masterclass](https://www.youtube.com/watch?v=LZxglknf3xA)
- **Run this plugin second in a two-limiter series, after the (unowned) Sonnox Oxford Limiter, for a combined character neither delivers alone.** Named pairing: Oxford Limiter first (credited with a "thick and full" sound, mainly from its Enhance function — see [[Plugin Wishlist]]), then this plugin second (reads "modern," its dynamic algorithm helps retain impact) — combined, described as full, aggressive, and upfront. Paired with a stance against this plugin's True Peak mode specifically: run oversampling with very low lookahead instead, avoiding true-peak limiting altogether — a variant of the same contrarian true-peak argument already on this note (below) and on [[Limiting]], from a different Sage Audio video. → [[Limiting]], [[Master Chain]], [[Plugin Wishlist]] — Sage Audio, [How to Master a Song Start to Finish](https://www.youtube.com/watch?v=aUygMNRx2yE)
- **Try Channel Link pulled low/off for a dual-mono loudness push — an experiment to A/B against this plugin's usual linked-channel default, not a swap.** Running effectively two unlinked mono limiters (one per side) means each side only attenuates when *its own* channel crosses threshold, instead of a loud moment on one side forcing gain reduction on the quieter side too — pushes the achievable level noticeably higher before attenuation gets aggressive. Sourced from a technique demoed on the (unowned) Sonnox Oxford Limiter paired with its Enhance function; on this plugin the nearest equivalent is pulling **⑥ Channel Link** down instead of the usual 60–80%. *Tension flag: contradicts this note's own linked-channel target below and the L/R-RMS research on [[Master Chain]]/[[Width and Stereo]] — worth A/B'ing, not a default change.* → [[Limiting]], [[Master Chain]] — Sage Audio, [Mastering Loud But Not Squashed](https://www.youtube.com/watch?v=YJVE4_CQ9Ts)
- **Tool-agnostic mastering-limiter target: release above 100 ms, channel link ~60–80%, max 3 dB of attenuation — and if you need more GR than that to hit an LUFS target, fix it upstream, not at the limiter.** Framed explicitly as "whichever limiter you use is fine" — these are settings to carry into any limiter, not a Pro-L-specific recipe. If 3 dB of GR isn't enough loudness, add more upward processing and/or peak attenuation *before* this stage rather than pushing Attack/Gain harder here. After limiting, judge by re-listening (does it still sound the way you want with quiet detail pushed forward?), not by a number — if not, revisit the tone-shaping EQ upstream, not this device. → [[Master Chain]], [[Oxford Inflator]] — Sage Audio, [The Only Music Mastering Video You'll Ever Need](https://www.youtube.com/watch?v=M88T8jFL2uU)
- **Split master limiting across two chained instances instead of one** — pushing a single limiter hard enough for an "insanely loud" master starts audibly distorting; running two limiter instances in series and distributing the same total gain reduction across both reads noticeably cleaner than asking one instance to do it all. → [[Clipping and Loudness]] — You Suck at Producing, [How to get INSANELY loud mixes (ASMR Tutorial)](https://www.youtube.com/watch?v=lV_lpR2Wgv8)
- **Produce INTO the limiter, Dubstep style** — Pro-L (Dubstep style setting, "pretty punchy") on the master the whole time he beatmakes so he always hears how the drums actually smack; caveat: Pro-L 2 adds noticeable latency, so he keeps it master-only and never stacks limiters on tracks — Lophiile, [Make Your Drums Slap](https://www.youtube.com/watch?v=v4ZhwlhF5yE) & [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)
- **The FL-bump chain: tape into Pro-L** — UAD Ampex ATR-102 on its default setting feeding Pro-L on the master = how he gets beats to "bump and distort cleanly like an FL beat"; kicks distort cleanly, low end noticeably thicker. Owned version: [[Kramer Tape]]/[[Cassette]] → Pro-L 2 (or [[kHs Limiter]]) — Lophiile, [All About Basslines stream](https://www.youtube.com/watch?v=Tnruvmw_OWc)

- **Use 1-for-1 / gain-matched mode to hear the limiting** come in, not just "louder and better" — Disclosure, [Looking For Love](https://youtu.be/NlJt0pCptGk)

## Used in my chains

My **true-peak brickwall limiter** — the transparent, guaranteed-ceiling option (where [[kHs Clipper]] shaves transients for character, Pro-L 2 catches everything cleanly):

- **[[Master Chain]]** — the final ceiling: Style Transparent/Modern, true-peak on, ceiling −1 dBTP, only ~1–2 dB of limiting (the loudness came from clip + glue upstream).
- Fallback for a **guaranteed true-peak ceiling** over the clipper's character on the master, or to pin long 808 sustains on [[1 Digital Bass Track|Digital Bass]] if [[Limiter]] isn't enough.

## Key Parameters

```visual-key
image: Images/Pro-L 2.png
coords: Images/Pro-L 2.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example. ①②③⑦⑧ only — this capture has no audio and the **Advanced** panel closed, so ④ Attack/Release, ⑤ Lookahead and ⑥ Channel Link aren't on screen. ③ points at the Advanced tab where Style lives.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Gain | Input drive into the limiter | Push for loudness; watch the GR meter — past ~3 dB it starts to pump/distort | — |
| ② | Output Ceiling | Maximum true-peak output | −1 dBTP for streaming safety; −0.3 for max loudness | — |
| ③ | Style | 8 algorithms (Transparent, Punchy, Dynamic, Allround, Aggressive, Modern, Bus, Safe) | Transparent/Modern for masters; Punchy to keep transients on a bus | — |
| ④ | Attack / Release | Envelope of the limiting | Faster = louder but grittier; slower = cleaner, less loud | — |
| ⑤ | Lookahead | Advance-look to catch peaks cleanly | Longer for transparent catches on transient-heavy masters | — |
| ⑥ | Channel Link | How linked L/R limiting is | High to hold the stereo image; lower for more per-side loudness | — |
| ⑦ | Oversampling / True Peak | Inter-sample peak detection + anti-alias | On for masters — verify the real ceiling with the TP meter | — |
| ⑧ | Dither | Noise-shaped dither for final bit-depth reduction | Enable only on the final master export stage | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
