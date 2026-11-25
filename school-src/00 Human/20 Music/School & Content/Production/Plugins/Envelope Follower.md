---
type: plugin
title: "Envelope Follower"
category: Utility
vendor: "Max for Live"
tags: [plugin]
depth_linked: true
manual_enriched: true
video_enriched: true
owned: true
owned_source: ableton-suite
owned_checked: 2026-07-17
params_enriched: 2026-07-18
visual_key: 2026-07-20
briefed: backlog
---

# Envelope Follower

![[Images/Envelope Follower.jpg]]

**Category:** Utility
**Vendor:** Max for Live

## What it is

A Max for Live device that tracks the amplitude envelope of an incoming audio signal and converts it into a control signal (e.g. for Max mapping).

## What it's used for

Driving other parameters (filter cutoff, effect mix) dynamically from a track's amplitude — classic envelope-follower sound design.

## FX chain notes

Runs inline in the signal/MIDI chain at the point it's inserted; combines with whatever device follows.

## Techniques

- **The unowned "Wave LFO" alternative — bipolar, sample-derived, no live audio needed** — dnksaus's own Max for Live device drops any audio file straight in and generates its modulation curve from that file's waveform (Scale/Zoom/Offset/Smooth/Phase shape it), which differs from Envelope Follower in two ways worth knowing even without owning it: it's **bipolar** (real peaks and troughs around center) where Envelope Follower is unipolar (rises from a floor only), and it can be scrubbed/auditioned by reading the file directly, without routing a live audio track through it first. → [[LFO]], [[Plugin Wishlist]] — dnksaus, [I Dropped a Max for Live Device...](https://www.youtube.com/watch?v=ySEqr3VW8wc)
- **Make a texture layer follow the melody's dynamics** — map an Envelope Follower reading a drum loop or lead line to a volume-raising [[Utility]] on a separate texture track, so the texture swells and recedes with the source's own dynamics instead of sitting at a static level. → [[Ambient Texture and Field Recording]] — dnksaus, [Texturing Your Tracks in Ableton](https://www.youtube.com/watch?v=9Bab-gq4E00)

## See also

- Techniques: [[Gain Staging]] · [[Referencing and Translation]]
- Palette: [[Sound Palette]] · [[Stereo Field]]

## Manual

- 📄 [Official Live 12 manual — Max for Live Devices](https://www.ableton.com/en/manual/max-for-live-devices/)

**High-level points:**
- The device tracks incoming amplitude and turns it into a continuous control curve — it's a signal-to-modulation converter, not an audio effect itself; nothing changes unless a parameter is Mapped to it.
- Two operating modes change how it behaves entirely: **Modulation** (default) modulates *around* whatever value the target parameter is already set to — the base value stays live and automatable, and Polarity (Bipolar/Unipolar) decides whether the modulation swings both directions or only up from the base. **Remote Control** hands full ownership of the parameter to the device — manual tweaking is locked out, and Min/Max sliders define the whole swing range.
- Rise and Fall are the envelope's attack/release — Rise smooths how fast the curve chases a rising signal, Fall smooths how fast it relaxes back down. Slow Fall = classic pumping/ducking sustain; fast Fall = tight, percussive tracking (good for gating a filter to a kick).
- Delay can offset the modulation in absolute time or tempo-synced beat divisions — useful for anticipation effects (modulation arrives slightly before the transient it's tracking, e.g. via negative delay) or deliberately lagging the response.
- Sidechain routing lets the follower track a *different* signal than the one it's inserted on (e.g. a kick track driving a bass filter) — choose Pre FX / Post FX / Post Mixer for the tap point, and Sidechain Mix blends track input vs. the external source rather than being a hard either/or switch.
- Up to 8 parameters can be Mapped simultaneously (Show/Hide Multimap reveals slots beyond the first) — one envelope can drive a whole chain of things at once (filter cutoff + reverb send + saturation drive, for instance) with independent Min/Max ranges per mapped target.

## Used in my chains

A **modulation source** (not an audio FX slot) — it turns a signal's level into a control signal that maps onto any parameter:

- **[[1 Electric Bass DI Track|Electric Bass DI Track]]** — *subtle envelope filter (the Mu-Tron lane)*: Envelope Follower → [[Auto Filter]] cutoff, **low Map amount**, Rise/Fall moderate — the played dynamics open the filter gently ("just about the best on bass"), run way less drastic than a funk quack.

Its Rise (②)/Fall (③) shape how snappy or smooth the follow is; Map (⑧) assigns it to up to 8 destinations at once.

## Key Parameters

```visual-key
image: Images/Envelope Follower.jpg
coords: Images/Envelope Follower.coords.json
```
*Tap a numbered circle for what that control does, the technique, and any artist example.*

| # | Parameter | What it is / does | Technique | Artist / record example |
|---|---|---|---|---|
| ① | Gain | Input trim before envelope detection | Boost gain on quiet sources (fingerpicked guitar, room mics) so the follower actually opens; too hot and it pins at max instantly | — |
| ② | Rise | Attack smoothing of the envelope | Fast Rise for percussive gating (kick-triggered filter snaps open); slow Rise for a swelling volume/filter effect on sustained pads in the [[BED Slot]] | — |
| ③ | Fall | Release smoothing of the envelope | Slow Fall = sidechain-style pumping/ducking feel on a [[BASS Slot]] element; fast Fall = tight per-hit tracking | Classic EDM sidechain-pump filter movement |
| ④ | Delay | Time or tempo-synced offset before modulation responds | Sync to 1/16 for rhythmic anticipation/lag effects distinct from the source transient | — |
| ⑤ | Mod / Remote Control | Modulate-around-value vs. fully-own-the-parameter | Use Remote Control when you want the envelope to be the *only* thing setting a value (e.g. a filter that should never be manually nudged mid-song) | — |
| ⑥ | Polarity (Bipolar/Unipolar) | Direction the modulation swings from the base value | Unipolar for "only opens further, never closes below the set point" behavior — safer for send levels | — |
| ⑦ | Sidechain source + Mix | External audio tap point and blend against track input | Route a kick into a bass-bus filter follower for classic sidechain-filter (not just volume-duck) movement — see [[Sidechaining]] | — |
| ⑧ | Map (×8) | Assigns automatable Live/device parameters as modulation targets | Map filter cutoff + reverb send together for one envelope driving a whole "breathing" chain move | — |
