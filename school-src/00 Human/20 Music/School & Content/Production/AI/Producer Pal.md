---
type: guide
title: Producer Pal
tags: [ai, ableton, mcp, tool]
---

# Producer Pal

AI-driven Ableton control via Claude Code — lets Claude build effects chains, tracks, and MIDI clips directly in a live Ableton session instead of just writing chain notes to reference and rebuild by hand.

## Why this over AbletonMCP
- Producer Pal is a **Max for Live device** (requires Live Suite, or Standard + the M4L add-on — confirmed available since I run Suite).
- AbletonMCP is a Python MIDI Remote Script instead — no Max for Live needed, but only confirmed for Claude Desktop/Cursor, not Claude Code.
- Producer Pal has a **documented, working Claude Code install path** and is the more actively maintained of the two, so it's the pick here.

## Setup
**Requirements:** Ableton Live 12.3+ (12.4+ recommended), Max for Live, Node.js 20+, Claude Code with a paid plan.

1. Download `Producer_Pal.amxd` from the [latest GitHub release](https://github.com/adamjmurray/producer-pal) and drag it onto a MIDI track in Live. Confirm it shows "Producer Pal Running."
2. In a terminal: `claude mcp add producer-pal npx producer-pal`
   - Alt: direct HTTP transport — `claude mcp add --transport http producer-pal http://localhost:3350/mcp` (Ableton must already be running, no auto-reconnect).
3. Run `claude`, type `/mcp` to confirm Producer Pal's tools loaded.
4. Say "connect to ableton," grant tool permissions when prompted.

## Workflow
Once connected, describe the chain directly instead of writing it out in Obsidian first — e.g. "build a chain on this track: transient shaper → compressor → EQ → reverb send." Claude builds it live in the session.

- Built around Ableton's **stock devices**; third-party plugins (Serum, Kontakt, etc.) aren't guaranteed to behave the same.
- Existing chain reference notes (e.g. [[Gorillaz Vocal Chain]]) stay useful as *documentation* of a chain after the fact, or as a spec to hand Claude to build — not as a manual build checklist anymore.

## Connections
- [[Claude + Ableton Live Integrations]] — full research on official connector vs. AbletonMCP vs. Producer Pal
- [[Plugin Index]]
