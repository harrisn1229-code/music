# Music — instructions for this repo

Everything for the Music app is in this one repo, served by GitHub Pages from `main` at
<https://harrisn1229-code.github.io/music/>. README.md describes every tool, the shared files and
how they fit together; read the section for the tool you are changing.

- **This repo is public.** Never commit licensed or third-party material (book scans, chord charts,
  sheet music, album art, transcripts) or anyone's personal data or progress. If unsure, leave it
  out and say so.
- **School:** change it in `school-src/` and rebuild with
  `python3 school-src/Machine/Scripts/school-artifact/build.py`; never edit `school/` by hand.
  `school-src/CLAUDE.md` has School's own rules.
- Raise `version` in `apps.js` whenever a file outside `school/` changes.
