#!/usr/bin/env python3
"""Round-trip test for the page's self-publish path.

Loads the page, makes a real change (enroll a course, tick homework, rate a card),
captures the exact HTML publish() would send, then loads THAT document and checks it
still renders and carries the new state. Guards the one failure that would matter:
a malformed buildDoc() replacing a working artifact with a broken one.
"""
import pathlib, re, subprocess, sys, json
here = pathlib.Path(__file__).resolve().parent
# PATCH-165 (2026-09-23) — takes the bundle to test as an argument, defaulting to school.html.
# It was hardcoded to school.html, so a `--out school-nate.html` build was published while this
# test quietly passed on a DIFFERENT, older file beside it. A guard that reports PASS on a bundle
# nobody is publishing is worse than no guard: it reads as coverage and is not. Pass the same
# --out path you built, and the test follows what actually ships.
target = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here / "school.html"
if not target.is_absolute():
    target = (pathlib.Path.cwd() / target) if target.exists() else (here / target.name)
if not target.exists():
    sys.exit(f"FAIL — no such bundle: {target}")
print(f"  testing {target.name}")
body = target.read_text(encoding="utf-8")

STUB = """<script>
// Boot on a course page rather than the Semester overview. PATCH-002 (spec-171) made the
// overview render NOTHING to enroll when the progress file is empty -- which is exactly the
// state a clean install is in -- so the overview no longer carries a state-changing control
// for this test to click. Course 01's own Enroll button and its lesson-1 homework boxes do,
// and they exercise more of the round trip than the old next-up card did.
sessionStorage.setItem('hms.route', 'course:01');
window.__pub = null;
window.claude = { use: async (n) => n === 'artifact'
  ? { publish: async (h) => { window.__pub = h;
        var s = document.createElement('script'); s.type='text/plain'; s.id='pubout';
        s.textContent = h.replace(/<\\/script>/g,'<\\\\/script>'); document.body.appendChild(s);
        var m = document.createElement('div'); m.id='pubmark'; m.textContent='PUBLISHED '+h.length;
        document.body.appendChild(m); return {version:'t'}; } } : null };
var E=[]; function boom(m){ E.push(m); var d=document.getElementById('errbox')||document.createElement('div');
  d.id='errbox'; d.textContent='ERRORS:: '+E.join(' :: '); document.body.appendChild(d); }
addEventListener('error', e => boom(e.message+' @'+e.lineno));
addEventListener('unhandledrejection', e => boom('reject '+e.reason));
addEventListener('load', () => setTimeout(() => {
  var enroll = document.querySelector('[data-enroll]') || document.querySelector('[data-course-toggle]');
  if (enroll) enroll.click();
  var box = document.querySelector('input[data-task]');
  if (box) { box.checked = true; box.dispatchEvent(new Event('change', {bubbles:true})); }
}, 60));
</script>"""

def chrome(url, out=None, size="1280,900"):
    cmd = ["google-chrome", "--headless", "--disable-gpu", "--no-sandbox",
           "--virtual-time-budget=20000", f"--window-size={size}"]
    cmd += ["--dump-dom", url]
    return subprocess.run(cmd, capture_output=True, text=True).stdout

# 1. load with the change-making stub
(here / "verify.html").write_text(
  '<!doctype html><html lang="en"><head><meta charset="utf-8">' + STUB + '</head><body>' + body + '</body></html>',
  encoding="utf-8")
dom = chrome(f"file://{here}/verify.html")
err = re.search(r'<div id="errbox">(.*?)</div>', dom, re.S)
if err: sys.exit(f"FAIL — JS errors on the live page: {err.group(1)[:300]}")
mark = re.search(r'<div id="pubmark">PUBLISHED (\d+)</div>', dom)
if not mark: sys.exit("FAIL — the page never called publish() after a state change")
print(f"  publish() fired with {int(mark.group(1))/1024:.0f} KB")

# 2. recover exactly what it sent
m = re.search(r'<script type="text/plain" id="pubout">(.*?)</script>', dom, re.S)
pub = m.group(1).replace('<\\/script>', '</script>')
import html as H
pub = H.unescape(pub) if pub.lstrip().startswith('&lt;') else pub
if not pub.lstrip().lower().startswith("<!doctype html>"):
    sys.exit(f"FAIL — published payload is not a full document: {pub[:120]!r}")
(here / "published.html").write_text(pub, encoding="utf-8")

# 3. load the published document and check it stands up on its own
dom2 = chrome(f"file://{here}/published.html")
err2 = re.search(r'<div id="errbox">(.*?)</div>', dom2, re.S)
# PATCH-162 — `[^>]*` is load-bearing: render() sets an inline `--rail` on #app (app.js,
# `app.style.setProperty('--rail', ...)`), so the rendered tag is `<div id="app" style="...">` and
# the literal `<div id="app">` this line used to require stopped matching the moment that shipped.
# The only literal one left in the document is inside buildDoc's own embedded source, which sits
# AFTER the islands — so the search ran off the end and this guard reported FAIL on every bundle,
# good or bad. It was failing on 2026-09-19's known-good build too, which is part of why two
# buildDoc regressions reached the published page: the test that exists to catch exactly that had
# been crying wolf long enough to stop being run.
app = re.search(r'<div id="app"[^>]*>(.*?)</div>\s*<script type="application/json" id="curriculum"', dom2, re.S)
if not app or len(app.group(1)) < 2000:
    sys.exit("FAIL — the republished document does not render its app")
prog = re.search(r'id="progress">(.*?)</script>', dom2, re.S)
P = json.loads(prog.group(1))
enrolled = [k for k, v in (P.get("courses") or {}).items() if v.get("status") == "enrolled"]
ticks = [k for k, v in (P.get("homework") or {}).items() if v]
cur = re.search(r'id="curriculum">(.*?)</script>', dom2, re.S)
C = json.loads(cur.group(1))
print(f"  republished page: {len(C['courses'])} courses, {len(C['concepts'])} concepts intact")
print(f"  state carried:    enrolled={enrolled}  homework ticks={len(ticks)}")
txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', app.group(1))).strip()
print(f"  renders:          {txt[:110]}")
if not enrolled: sys.exit("FAIL — the enrollment did not survive the round trip")
print("  PASS — publish round trip is clean")
