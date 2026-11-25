---
type: plugin
title: "Pro-MB"
category: Compressor/Limiter
vendor: "FabFilter"
tags: [plugin]
depth_linked: true
video_enriched: true
owned: true
owned_source: installed-no-demo
owned_checked: 2026-07-17
params_enriched: 2026-07-18
---

# Pro-MB

![[Images/Pro-MB.png]]

**Category:** Compressor/Limiter
**Vendor:** FabFilter

## What it is

FabFilter's multiband dynamics processor, combining up to six bands of independent compression/expansion with FabFilter's visual band-editing interface.

## What it's used for

Frequency-specific dynamics control — taming boomy low end, harsh mids, or sibilant highs independently on a mix bus or individual track.

## FX chain notes

Used on a mix or master bus after broad-strokes EQ, before the final limiter.

## Techniques

- **Owned best-match for McDSP C6-style ALL-subtractive multiband vocal shaping (no boosts), the final stage of a real lead-vocal chain after the compressor: problem-frequency notches in the lows and highs, a built-in de-essing pass, and low/mid shelving.** "So after the LA-2A I like using the C6 to shape my vocal EQ-wise, and I use it very lightly, hitting problem areas in my low frequencies and my high frequencies... I'll do some light de-essing work with this right here... if there's too much low end, I'll shelve it down and same thing for the mid... I'm not doing any boosting with this multiband, I'm doing all subtractive work getting rid of what I don't like at this point." Sits downstream of [[Soothe2]] (which handles the dynamic *harshness*) and an SSL-style EQ (the chain's only boosting stage) — three tools with three deliberately separated jobs: dynamic tame / static subtractive shape / broad boost. McDSP C6 itself is unowned — see [[Plugin Wishlist]]. → [[UAD Teletronix LA-2A]], [[Soothe2]], [[De-essing]], [[Multiband Compression]], [[Plugin Wishlist]], [[Dua Lipa Vocal Chain]] — Mix with the Masters (Josh Gudwin), [[Mixing Dua Lipa's vocals with Josh Gudwin]]
- **On a lead vocal: most reduction on the low end, top end mostly let through except at specific triggering moments — dynamically balancing the vocal's spectral range in a way static EQ can't.** Illangelo (The Weeknd), late in his lead-vocal chain (after [[Pro-L 2]], before a cleanup de-esser): "the most of the reduction is happening on the low end. In the top end, it's allowing almost all of it in except for some moments of the audio will trigger it and that's good, we want that... if you were to do this just with a standard EQ, it's not going to sound as alive as when you're doing it with something that reacts instantly in the moment as needed." Frames the whole move as a technique he developed himself years ago "out of necessity" for faster, better-sounding sessions, not a one-off setting. → [[The Weeknd Vocal Chain]], [[1 Main Vocal Track]] — Illangelo (Mix with the Masters), [[Producing The Weeknd's vocals with Illangelo]]
- **Dynamic EQ vs. multiband compression: this plugin's actual tradeoff against Pro-Q's dynamic bands.** This plugin offers 6 bands, each with a full compressor's toolkit — **attack, release, look-ahead, knee** — versus [[Pro-Q 4]]'s dynamic bands, which run up to 26 (on Pro-Q 3) but only expose a manual/automatic threshold, not real dynamics controls. Decision rule: reach for this plugin when the job needs control over *how the dynamics themselves behave* (fast/slow response, lookahead-smoothed reaction, knee shape); reach for [[Pro-Q 4]] when the job needs pinpoint control over *which frequency* and *how narrowly*. → [[Pro-Q 4]], [[EQ]], [[Multiband Compression]] — Sage Audio, [EQ Masterclass](https://www.youtube.com/watch?v=iPBnL6mx9c0)
- **Mid-image compression's applicability is broader than a mastering-only move — drums, vocals, and full mixes/masters (subtly on the latter two).** Same mechanism as the entry below (compress the mid image more than the side to read wider, since attenuating the usually-louder center makes the side read louder by comparison), stated here explicitly as usable on individual drum busses and vocals, not just a whole master. On this plugin: Stereo Placement = Mid on a band still gets the frequency-specific version. → [[Width and Stereo]], [[Compression]] — Sage Audio, [Mid Side Masterclass](https://www.youtube.com/watch?v=SHxih1xc5yM)
- **Multiband compression as dynamic EQ — duck a problem band only when it's actually loud, not statically.** Two worked mastering examples: on a muddy mix with buried vocals, center a band on **250 Hz, attenuate 1–2 dB**; when reverb masks the vocal, dynamically attenuate **2–5 kHz on the side image only** so the mid-image vocal cuts through whenever it's present without a static EQ cut dulling the reverb tail the rest of the time. Same BPM-timed-release discipline as regular mastering compression applies, except the highest band can run fast attack/release (the harmonic-distortion risk from quick settings is mainly a low-frequency artifact). → [[Multiband Compression]], [[Masking and Carving]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **Ear-mimicking multiband compression — tune the settings to how the human ear itself compresses loud sound.** The ear attenuates frequencies **below 1 kHz** by 1–20 dB depending on loudness, and the physical structures responsible can't react instantly: ~**40 ms** to contract, staying contracted ~**150 ms**. Recipe: a band below 1 kHz, a couple dB of attenuation, **Attack 40 ms, Release 150 ms**, a softer knee for gradual (not abrupt) compression, no lookahead. Reads as more naturally "compressed" than an arbitrary setting because it reproduces the ear's own response curve. → [[Multiband Compression]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **Mid-image-only compression for stereo expansion, frequency-specific via this plugin's M/S routing.** With Stereo Placement set to Mid on a band, compress only the mid (center) image by **0.5–1.5 dB** and skip makeup gain (makeup gain cancels the relative-loudness shift the trick depends on) — attenuating the center makes the sides sound louder *relative* to it, reading as width without ever boosting the sides directly. → [[Width and Stereo]], [[Master Chain]] — Sage Audio, [Mastering Compression Settings](https://www.youtube.com/watch?v=YUn31aE9X_8)
- **Frequency-specific sidechain: duck only the sub** of a bassline off the kick, leaving the detail above untouched — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck)
- **Dip one problem band on a bus** (e.g. low-mids on a drum bus) — dynamic, so it only acts when they get loud — Disclosure, [Higher Than Ever Before](https://youtu.be/9XkHSronZck)
- **Multiband on the lows so the kick pumps a sub loop** — compress the low band keyed off the kick — Disclosure, [NO CAP](https://youtu.be/kz5dmb3QdI8)

## Used in my chains

My **multiband dynamics** tool — compress/expand a single frequency band without touching the rest (surgical, transparent, up- or downward):

- **[[1 Digital Bass Track|Digital Bass Track]]** — dynamic control of a specific band (e.g. tame only the mid "honk" when it spikes, leaving the sub and click alone).
- **[[3 Inst-Synth Bus|Inst-Synth Bus]]** — band-specific dynamic control across the summed instruments (rein in a resonant mid buildup only when it happens).

## Key Parameters

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Bands / Crossovers | Up to 6 dynamic bands placed on the spectrum | Add a band exactly over the problem frequency, narrow it | — |
| ② | Threshold (per band) | Level at which that band's processing engages | Set so it only acts on the spikes, not the whole part | — |
| ③ | Ratio / Range (per band) | Amount + direction (downward comp or upward expand) | Downward to tame a resonance; upward to lift a shy band dynamically | — |
| ④ | Attack / Release (per band) | Envelope of the band's dynamics | Fast to catch transient honk; slow for smooth level control | — |
| ⑤ | Dynamic Phase / Mode | Minimum vs. linear/dynamic phase processing | Dynamic Phase for transparent crossovers with minimal smearing | — |
| ⑥ | External Sidechain (per band) | Trigger a band from another track | Duck a bass band off the kick only in that frequency range | — |
| ⑦ | Solo / Bypass (per band) | Audition a single band's action | Solo to confirm you're grabbing the right frequency before committing | — |
| ⑧ | Output | Makeup level | Level-match so the dynamic move isn't just "louder" | — |

## See also

- Effects: [[Compression]] · [[Limiting]] · [[Multiband Compression]]
- Techniques: [[Compression Staging]] · [[Gain Staging]] · [[Sidechaining]]
- Palette: [[Sound Palette]]
