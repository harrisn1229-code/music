---
type: yt-note
date: 2026-08-10
source: youtube
url: https://www.youtube.com/watch?v=WW4bnNi4DAA
channel: Sage Audio
duration: 00:04:12
video_type: production
music_enriched: true
transcript_source: captions
tags: [yt-note, music, production, mastering, gain-staging, limiting]
briefed: 2026-W33
---

# How to Gain Stage Your Master

![](https://www.youtube.com/watch?v=WW4bnNi4DAA)
📺 [Watch on YouTube](https://www.youtube.com/watch?v=WW4bnNi4DAA)

## Synopsis

A short, entry-level Sage Audio explainer on gain staging specifically at the mastering stage — four concrete points in just over four minutes: how much headroom to keep, how to monitor levels while processing, how to keep a limiter from adding distortion, and why the master's final output level should sit a couple dB below 0 dBFS rather than right up against it. It's the fundamentals-level companion to the much deeper mastering-chain material already in this vault from the same channel ([[Master Chain]], [[Limiting]], [[Gain Staging]], [[Pro-L 2]]) — most of its individual claims (headroom before processing, oversampling/lookahead/true-peak on a limiter, a sub-0-dB output ceiling) are already documented here in more depth from other Sage Audio videos, so this page mainly adds the underlying *arithmetic* (a worked headroom example), a mechanical note on 64-bit internal plugin processing, and one genuinely new framing: that ears perceive frequency balance differently at different loudness levels, so EQ/saturation decisions made earlier in a mastering chain need re-checking once the limiter makes the master louder. Worth flagging: this video's straightforward "use true-peak detection" advice sits in mild tension with several other Sage Audio sources already in this vault that specifically argue *against* trusting a limiter's dedicated true-peak mode — read this one as the beginner framing of the topic, not a contradicting house recommendation.

## Techniques

- **Mastering headroom: keep 3–6 dB, with the max peak somewhere between −3 and −6 dBFS.** The reasoning is arithmetic, not a rule of thumb: start with only 1 dB of headroom and a saturator/EQ stage that adds 2 dB of gain, and the signal clips. Start with 6 dB of headroom and that same 2 dB gain bump still leaves 4 dB in hand — enough to keep processing without introducing clipping distortion. *(00:15–00:50)*
- **Monitor level with plugins that show both input AND output meters when mastering.** Measuring amplitude before and after each processing stage is how you actually catch a stage that's handing the next one too little headroom. *(00:50–01:05)*
- **Most plugins run 64-bit internal processing — the signal can swing above 0 dB *inside* the plugin without clipping, as long as it's reduced below 0 dB before the plugin's output.** That internal cushion doesn't excuse sloppy gain staging: still get in the habit of carefully measuring the signal to avoid going over 0 dB and to leave the next plugin enough headroom, or clipping distortion can sneak in somewhere in the chain without you noticing which stage caused it. *(01:05–01:30)*
- **Avoiding limiter distortion — use a combination of three limiter functions together: oversampling, look-ahead, and true-peak detection.** Oversampling gives more accurate quantization, catching overs/peaks that would otherwise read above 0 dB. Look-ahead measures the incoming signal ahead of time so the limiter has more time to react to an approaching peak. True-peak detection automatically reduces the output by whatever amount is needed to avoid clipping distortion. Framed simply as "use all three," without the nuance some other Sage Audio sources in this vault raise about true-peak mode's transient cost. *(01:30–02:05)*
- **Reduce the master's final output to −1 or −2 dB (true peak), not just to 0 dBFS, before it goes anywhere online.** A master almost always ends up in a lossy file (MP3 and similar) once it's uploaded to YouTube, SoundCloud, Spotify, etc. — lossy encoding reduces the accuracy of the master's amplitude, so content sitting close enough to 0 dB can peak and distort once it's re-encoded, even if the source file measured clean going in. Pulling the output down 1–2 dB keeps the signal from crossing 0 dB when its amplitude shifts during that lossy conversion. *(02:05–02:40)*
- **Processing decisions made earlier in a mastering chain need re-checking once the limiter is engaged, because ears hear frequency balance differently at different loudness levels.** A fair amount of distortion, or an amplified high-frequency bump, might sound fine while the chain is still quiet — but once limiting has made the master louder, that same distortion can read as too aggressive, or the high-frequency bump can start sounding harsh. The takeaway: gain staging isn't just about levels not clipping — earlier tonal/character decisions should be revisited once the master is at (or close to) its final loudness, not judged and locked in while still working quiet. *(02:40–03:50)*

## Routed to

- [[Gain Staging]] — mastering headroom (3–6 dB, worked arithmetic example) + 64-bit internal processing / input-output metering habit
- [[Limiting]] — the oversampling + look-ahead + true-peak-detection recipe (with a tension flag against this vault's existing contrarian true-peak stance), the −1/−2 dBTP lossy-export output target, and the "re-check earlier processing once the limiter's on" insight
- [[Master Chain]] — §8 Ozone 9 Maximizer inline note (limiter recipe + lossy-export ceiling) + a consolidated "From videos" bullet covering the whole gain-staging pass
- [[Clipping and Loudness]] — cross-linked from the Limiting.md entry on the lossy-export output ceiling

## Source

- [Watch on YouTube](https://www.youtube.com/watch?v=WW4bnNi4DAA)
- Channel: Sage Audio
- Duration: 4:12
- Transcript: captions (clean, spoken breakdown — high confidence). See [[How to Gain Stage Your Master (transcript)]].
