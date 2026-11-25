'use strict';
/* Music School — the school, inside Obsidian, offline, on every device.
 *
 * IT IS THE REAL PAGE. This plugin renders nothing of its own. It loads the same self-contained
 * bundle `build.py` produces and that gets published as the web page, into an iframe, so it is
 * pixel-identical to the online school and cannot drift from it: one `build.py` run updates both.
 *
 * HOW SAVING WORKS, and why it writes JSON rather than HTML. The page persists by calling
 * `cap.publish(html)` with the WHOLE document. Online that republishes the artifact. Here, a
 * stubbed `window.claude` catches the same call, and this plugin pulls just the progress island out
 * of it and writes `Machine/School/progress-<user>.json` — about 4 KB — leaving the bundle
 * untouched. Writing the bundle back was the first design and it was wrong twice over: ~9 MB
 * re-synced on EVERY save, and a SECOND copy of progress that silently diverged from the file.
 *
 * The reverse direction matters just as much: the bundle carries whatever progress it was BUILT
 * with, which goes stale the moment anything else writes. So the current progress file is injected
 * before the document is handed to the iframe. Load reads the file, save writes the file; the HTML
 * is only ever a shell.
 *
 * WHAT THE BUNDLE ACTUALLY IS — corrected 2026-08-25. It is an Artifact *fragment*, not a document:
 * it opens on `<title>` and carries no `<html>`, `<head>` or `<body>` tag, because the Artifact host
 * wraps it at publish time. In an iframe the parser inserts those itself, which works, but it means
 * there is no `<head>` to inject into — anything that must run first goes at offset 0.
 *
 * No build step: plain CommonJS, loaded as-is by Obsidian.
 */

const { ItemView, Plugin, Notice, Platform } = require('obsidian');

const VIEW_TYPE = 'music-school-view';
const FULL_PATH = 'Machine/Scripts/school-artifact/school.html';
const USER_PATH = 'Machine/School/local-user.json';
const PROGRESS_DIR = 'Machine/School';
/* PATCH-146 — where a page upload is filed. Per person, like the lesson notes themselves, and the
   capitalisation matches build.py's `USER.capitalize()`. */
const LESSON_RES_DIR = (who) =>
  '00 Human/20 Music/Users/' + (String(who || 'nate').charAt(0).toUpperCase() +
    String(who || 'nate').slice(1)) + '/Lessons/Resources';
const REPORT_PATH = 'Machine/School/offline-pane-report.md';

const DEFAULTS = { build: 'auto', loader: 'srcdoc' };

/* Shown in the bar. It exists so "still the same thing" is a FALSIFIABLE claim: a synced plugin
   update does not hot-reload, and on Android the app stays resident when you leave it, so the most
   common reason a fix appears not to work is that the old main.js is still the one running. If this
   string is not on screen, the code you are looking at is not this code. */
const PLUGIN_VERSION = '2.2';

/* The pane runs inside Obsidian's own webview, which on Android IS the system WebView that will
   render the iframe. So the engine version is readable HERE, without waiting for the page to try
   and fail — which makes it an answer available at open time rather than 16 seconds later. */
function engineVersion() {
  const m = /(?:Chrome|CriOS)\/(\d+)/.exec(navigator.userAgent || '');
  return m ? parseInt(m[1], 10) : 0;
}

/* The floor app.js imposes on the browser engine, surveyed 2026-08-25: `||=` (x2) and `??` (x1)
   are Chrome 85, `catch {}` (x9) is 66, `.flat()` (x9) is 69, `Object.fromEntries` (x2) is 73.
   The first two are SYNTAX, which is what makes this a cliff rather than a slope: below 85 the page
   does not degrade, the whole app-js tag fails to parse and `#app` is never filled. Re-survey
   app.js if it gains anything newer — the probe below must gain a matching tag. */
const NEEDS_CHROME = 85;

/* build.py escapes `<` as \u003c when it embeds JSON so the payload can never terminate its own
   script tag. Anything injected here has to do the same. JSON.parse reads the escape back natively,
   so extraction needs no matching un-escape. */
const escapeJson = (t) => t.replace(/</g, '\\u003c');

/* `id="progress">` is 14 characters; the payload starts immediately after it. */
const MARK = 'id="progress">';

/* The page checks `window.claude && claude.use('artifact')` and treats a null capability as
 * read-only, so defining this is exactly what makes it writable offline. `\/script` is escaped so
 * this string cannot terminate its own tag when inlined. */
const SHIM =
  '<script>window.claude={use:async function(n){return n==="artifact"?{publish:async function(h){' +
  'parent.postMessage({__musicSchoolSave:h},"*");return{version:"offline"};}}:null;}};<\/script>';

/* PATCH-145 — THE PANE DIAGNOSES ITSELF.
 *
 * A blank frame on a device with no console is the worst state this thing has, and the Boox is
 * exactly that device. So the document carries its own instrumentation, injected at offset 0 (see
 * the fragment note above — there is no <head> to hang it off).
 *
 * EVERY FEATURE TEST GETS ITS OWN SCRIPT TAG. That is the whole trick: an unsupported *syntax*
 * feature is a parse error, which kills its entire tag and nothing else. So a flag that never gets
 * set names the exact feature this engine cannot parse — which is the same failure that silently
 * kills app.js. Bundling them into one tag would collapse to a single useless "something failed". */
const PROBE = [
  '<script>window.__ms={base:1,err:[],ua:navigator.userAgent};',
  'window.addEventListener("error",function(e){try{window.__ms.err.push(String(e.message||"?")',
  '+" @line "+(e.lineno||0));}catch(x){}},true);',
  'window.addEventListener("unhandledrejection",function(e){try{window.__ms.err.push("unhandled promise: "',
  '+String((e.reason&&e.reason.message)||e.reason));}catch(x){}});<\/script>',
  '<script>try{}catch{}window.__ms.optCatch=1;<\/script>',             // Chrome 66
  '<script>window.__ms.flatFn=[[1]].flat?1:0;<\/script>',              // Chrome 69 (runtime)
  '<script>window.__ms.fromEntries=Object.fromEntries?1:0;<\/script>', // Chrome 73 (runtime)
  '<script>window.__ms.optChain=((({}).a?.b),1);<\/script>',           // Chrome 80
  '<script>window.__ms.nullish=(void 0??1);<\/script>',                // Chrome 80
  '<script>var __a={v:0};__a.v||=1;window.__ms.logicalAssign=__a.v;<\/script>', // Chrome 85
].join('');

/* Appended last. If `tail` is missing the document did not finish parsing at all, which is a
   different problem from app.js throwing — and they need different answers.
   It also un-defers the web fonts (see PATCH-146): the link is delivered as `media="print"` so it
   cannot block first paint, and flipping it to `all` once the DOM is up applies the fonts if they
   actually arrived. Done from our own script block rather than an inline `onload=` handler, to stay
   consistent with the shim about what this document asks of the CSP. Offline the request simply
   fails and the flip is a no-op — which is the whole point. */
const TAIL = '<script>window.__ms&&(window.__ms.tail=1);'
  + 'document.addEventListener("DOMContentLoaded",function(){'
  + 'var l=document.querySelectorAll("link[data-ms-font]");'
  + 'for(var i=0;i<l.length;i++){l[i].media="all";}});<\/script>';

class SchoolView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.blobUrl = null;
    this.onMessage = null;
    this.frame = null;
    this.bootTimer = null;
    this.loaderOverride = null;   // set by the auto-fallback; deliberately NOT persisted
    this.triedBlob = false;
    this.saving = false;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return 'Music School'; }
  getIcon() { return 'graduation-cap'; }

  async onOpen() { await this.render(); }
  async onClose() { this.teardown(); }

  loader() { return this.loaderOverride || this.plugin.settings.loader; }

  teardown() {
    if (this.bootTimer) { clearTimeout(this.bootTimer); this.bootTimer = null; }
    if (this.blobUrl) { URL.revokeObjectURL(this.blobUrl); this.blobUrl = null; }
    if (this.onMessage) { window.removeEventListener('message', this.onMessage); this.onMessage = null; }
    this.frame = null;
  }

  /* ── Which build ──────────────────────────────────────────────────────────────────────────── */

  async readBuild(path) {
    const ad = this.app.vault.adapter;
    try {
      if (!(await ad.exists(path))) return null;
      const html = await ad.read(path);
      const m = html.match(/<meta name="school-build" content="([^"]*)"/);
      const b = html.match(/<meta name="school-books" content="([^"]*)"/);
      return { path, html, stamp: m ? m[1] : '', books: b ? b[1] : 'full' };
    } catch (err) { return null; }
  }

  /* PATCH-139 — decided by the stamp INSIDE the file, never `stat.mtime`. An mtime describes when
     a copy landed, which on the device with the problem is precisely the thing that did not happen;
     the Boox sat on a build from 8/21 for four days while the pane reported its mtime as an answer.
     The stamp stays for that reason even though there is now only one build to pick.

     2026-09-01 — THE LITE BUILD IS GONE and this collapsed with it. It used to choose between two
     files: newer stamp on desktop, always lite on mobile (PATCH-142 — the stamp compare costs a
     full read of BOTH files, and on a phone that read was the crash). There is one build now, so
     there is nothing to choose. `settings.build` is left in DEFAULTS and ignored; an existing
     install carrying `build: 'lite'` must not break, and it does not — this reads the same file
     whatever the setting says. */
  async pickBuild() {
    return await this.readBuild(FULL_PATH);
  }

  /* ── Render ───────────────────────────────────────────────────────────────────────────────── */

  async render() {
    try {
      await this.renderInner();
    } catch (err) {
      const el = this.contentEl;
      el.empty();
      const d = el.createDiv({ cls: 'ms-empty' });
      d.createEl('b', { text: 'The offline school could not open.' });
      d.createEl('p', { text: (err && err.message) ? err.message : String(err) });
      const again = d.createEl('button', { text: 'Try again' });
      again.onclick = () => this.render();
    }
  }

  async renderInner() {
    this.teardown();
    const el = this.contentEl;
    el.empty();
    el.addClass('ms-wrap');

    const build = await this.pickBuild();
    if (!build) return await this.renderMissing(el);
    this.build = build;

    const bar = el.createDiv({ cls: 'ms-bar' });
    bar.createSpan({ cls: 'ms-title', text: 'Offline copy' });
    bar.createSpan({ cls: 'ms-ver', text: 'v' + PLUGIN_VERSION });
    bar.createSpan({ cls: 'ms-sub', text: build.stamp ? 'built ' + build.stamp : 'built (unstamped)' });

    /* Say it up front, before anything is loaded. If the engine is below the floor the page cannot
       run and no amount of reloading will change that, so the worst outcome is letting someone
       stare at a blank frame believing it is still trying. */
    const eng = engineVersion();
    if (eng && eng < NEEDS_CHROME) {
      const w = bar.createSpan({ cls: 'ms-warn', text: 'Chrome ' + eng + ' — too old, needs ' + NEEDS_CHROME + '+' });
      w.setAttr('title', 'This device\u2019s browser engine cannot parse the school page. Update '
        + 'Android System WebView.');
    } else if (eng) {
      bar.createSpan({ cls: 'ms-sub', text: 'Chrome ' + eng });
    }
    if (build.books === 'none') {
      const n = bar.createSpan({ cls: 'ms-sub', text: 'no book scans — the copy that fits Sync' });
      n.setAttr('title', 'The full build is over Obsidian Sync’s per-file limit, so the book page '
        + 'images are left out of the copy that travels. Everything else is identical.');
    }

    this.loaderToggle(bar);

    const status = bar.createSpan({ cls: 'ms-status' });
    /* Always available, never gated on a verdict. The auto-path can misjudge; a button cannot. */
    const rep = bar.createEl('button', { text: 'Report' });
    rep.setAttr('title', 'Write what this device sees to ' + REPORT_PATH + ', which syncs home.');
    rep.onclick = async () => {
      rep.disabled = true; rep.setText('writing…');
      try {
        await this.writeReport(this.inspect(), 'manual');
        new Notice('Music School: wrote ' + REPORT_PATH + ' — it will sync home.', 8000);
      } catch (err) { new Notice('Music School: could not write the report — ' + err.message, 8000); }
      rep.disabled = false; rep.setText('Report');
    };
    const reload = bar.createEl('button', { text: 'Reload' });
    reload.onclick = () => {
      reload.disabled = true;
      reload.setText('Reloading…');
      setTimeout(() => this.render(), 0);
    };

    let html = build.html;

    /* Inject the vault's CURRENT progress over whatever the bundle was built with, or the pane
       would show a snapshot frozen at build time and then save it back, quietly undoing anything
       done on the published page or by `/school sync` since. */
    const user = await this.currentUser();
    let injected = 0;
    try {
      const progPath = PROGRESS_DIR + '/progress-' + user + '.json';
      if (await this.app.vault.adapter.exists(progPath)) {
        const prog = await this.app.vault.adapter.read(progPath);
        JSON.parse(prog);                       // refuse to inject something unparseable
        const open = html.indexOf(MARK);
        const close = open > -1 ? html.indexOf('<\/script>', open) : -1;
        if (open > -1 && close > -1) {
          html = html.slice(0, open + MARK.length) + escapeJson(prog) + html.slice(close);
          injected = prog.length;
        }
      }
    } catch (err) {
      new Notice('Music School: progress file unreadable, showing the build’s own copy — ' + err.message, 8000);
    }
    bar.createSpan({ cls: 'ms-sub', text: injected ? 'progress: ' + user : 'progress: build default' });

    /* PATCH-146 — DEFER THE REMOTE FONTS, do not delete them. The bundle carries
       `<link rel="stylesheet" href="https://fonts.googleapis.com/...">`, and a stylesheet link is
       RENDER-BLOCKING: with no route to the internet the frame paints nothing until the request
       gives up, which on a slow stack is tens of seconds of blank pane indistinguishable from a
       crash. That is the offline pane's worst failure and it must not be possible here.
       The first version of this patch simply stripped the link, which fixed the blank pane and
       quietly cost the typefaces (Prata/Spectral/Archivo) on every ONLINE desktop — Britt's Mac
       included — to solve a problem only an offline tablet has. `media="print"` is the fix that
       serves both: the browser fetches it at low priority and never blocks on it, and TAIL flips it
       to `all` after DOMContentLoaded so the fonts apply whenever they did arrive. Offline the
       request fails and nothing happens, which is exactly the old behaviour minus the stall.
       Any pre-existing `media` is dropped first so the tag cannot end up with two. */
    let fonts = 0;
    html = html.replace(/<link([^>]*\shref="https?:\/\/[^"]*"[^>]*)>/g, (m, attrs) => {
      fonts++;
      return '<link' + attrs.replace(/\smedia="[^"]*"/g, '') + ' media="print" data-ms-font="1">';
    });
    if (fonts) bar.createSpan({ cls: 'ms-sub', text: fonts + ' web font link deferred' });

    const at = html.indexOf('<script type="application/json"');
    html = at > -1 ? html.slice(0, at) + SHIM + html.slice(at) : SHIM + html;
    html = PROBE + html + TAIL;

    /* PATCH-141 — srcdoc, NOT a blob URL. Blob-URL iframes are unreliable in mobile webviews
     * (blank frame, no error). The blob was chosen for isolation — "origin-null, can only talk back
     * through postMessage" — but a blob document INHERITS the origin of the context that created
     * it, so that isolation was never there to lose.
     *
     * Sandboxing it properly is the obvious next thought and it is a trap. `sandbox="allow-scripts"`
     * without `allow-same-origin` gives an opaque origin, and in an opaque origin `sessionStorage`
     * THROWS. In app.js the route/scroll/drill writes sit inside the same `try` block as
     * `await cap.publish(...)`, so the first throw skips the publish and every save silently does
     * nothing while the page reports success. Same-origin srcdoc, no sandbox attribute — which is
     * also what lets this plugin read `contentWindow.__ms` and diagnose a blank frame at all. */
    const frame = el.createEl('iframe', { cls: 'ms-frame' });
    frame.setAttr('title', 'Music School');
    this.frame = frame;

    if (this.loader() === 'blob') {
      this.blobUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
      frame.setAttr('src', this.blobUrl);
    } else {
      frame.srcdoc = html;
    }

    /* PATCH-143 — a save belongs to the pane that produced it. The listener is on `window`, shared
       by every open pane, so with two tabs open both handlers used to fire on one save and both
       would write. Matching `evt.source` makes the pane the unit of ownership. */
    this.onMessage = async (evt) => {
      if (!this.frame || !evt || evt.source !== this.frame.contentWindow) return;
      const doc = evt.data && evt.data.__musicSchoolSave;
      if (typeof doc !== 'string') return;
      if (this.saving) return;
      this.saving = true;
      status.dataset.s = 'saving';
      status.setText('saving…');
      try {
        const open = doc.indexOf(MARK);
        const close = open > -1 ? doc.indexOf('<\/script>', open) : -1;
        if (open < 0 || close < 0) throw new Error('no progress block in the saved document');
        const parsed = JSON.parse(doc.slice(open + MARK.length, close));
        const who = await this.currentUser();
        /* PATCH-146 — files uploaded on the page. They ride home in the progress island because
           the artifact runtime grants this account no file storage, and this is the OFFLINE half
           of the hand-off that sync.py does online: write each one into the lesson's Resources
           folder as a real file, then drop it from what we persist, so the page stops carrying it.

           Date-prefixed rather than foldered, matching build.py's loose-file rule, so an upload
           made before its lesson note exists still attaches once the note does.

           A file that will not write is KEPT in `ext_files` rather than dropped — it stays on the
           page and gets another chance next save. Losing an upload is the one unacceptable
           outcome, so the write is per-file and never takes the progress write down with it. */
        const kept = [], filed = [];
        for (const u of (parsed.ext_files || [])) {
          try {
            const name = String(u.name || 'file').replace(/[\\/\x00:*?"<>|]/g, '-') || 'file';
            const d = (String(u.lesson || '').match(/^\d{4}-\d{2}-\d{2}/) ||
                       String(u.at || '').match(/^\d{4}-\d{2}-\d{2}/) ||
                       [new Date().toISOString().slice(0, 10)])[0];
            const dir = LESSON_RES_DIR(who);
            let path = dir + '/' + (name.startsWith(d) ? name : d + ' ' + name);
            for (let n = 2; await this.app.vault.adapter.exists(path); n++) {
              const dot = path.lastIndexOf('.');
              path = (dot > path.lastIndexOf('/') ? path.slice(0, dot) : path) +
                     ' (' + n + ')' + (dot > path.lastIndexOf('/') ? path.slice(dot) : '');
            }
            const bin = Uint8Array.from(atob(u.b64 || ''), c => c.charCodeAt(0));
            if (!(await this.app.vault.adapter.exists(dir))) await this.app.vault.adapter.mkdir(dir);
            await this.app.vault.adapter.writeBinary(path, bin.buffer);
            filed.push(path.slice(path.lastIndexOf('/') + 1));
          } catch (e) { kept.push(u); }
        }
        if (parsed.ext_files) {
          if (kept.length) parsed.ext_files = kept; else delete parsed.ext_files;
        }
        await this.app.vault.adapter.write(
          PROGRESS_DIR + '/progress-' + who + '.json',
          JSON.stringify(parsed, null, 2) + '\n');
        status.dataset.s = 'ok';
        status.setText('saved · ' + new Date().toLocaleTimeString());
        if (filed.length) new Notice('Music School: filed ' + filed.length +
          ' resource file(s) into Lessons/Resources/ — rebuild to see them on the lesson.', 7000);
        if (kept.length) new Notice('Music School: ' + kept.length +
          ' upload(s) could not be written and are still on the page.', 8000);
      } catch (err) {
        status.dataset.s = 'err';
        status.setText('SAVE FAILED — ' + (err && err.message ? err.message : 'unknown'));
        new Notice('Music School: could not save your progress. Your work is still on screen — do not close this tab.', 10000);
      }
      this.saving = false;
    };
    window.addEventListener('message', this.onMessage);

    this.watchBoot(status, bar, el);
  }

  /* ── Did it actually come up? ─────────────────────────────────────────────────────────────── */

  /* PATCH-147 — `load` firing is NOT proof of anything, and the previous version's escape hatch was
     wrong because it waited on `load` NOT firing. A document whose app-js failed to parse still
     fires `load` perfectly happily; the timer got cleared and the recovery button never appeared,
     leaving a blank pane and no way out. The real question is whether `#app` ever got filled, and
     that has to be POLLED, because on an e-ink tablet first paint is genuinely slow. */
  inspect() {
    const out = { booted: false, reach: false };
    try {
      const f = this.frame;
      if (!f) return out;
      const d = f.contentDocument, w = f.contentWindow;
      if (!d || !w) return out;
      out.reach = true;
      out.ready = d.readyState;
      const app = d.getElementById('app');
      out.appFound = !!app;
      out.appKids = app ? app.childElementCount : -1;
      out.booted = out.appKids > 0;
      const ms = w.__ms;
      if (ms) {
        out.ua = String(ms.ua || '');
        out.feat = {
          probeRan: 1,
          tail: ms.tail ? 1 : 0,
          optCatch: ms.optCatch ? 1 : 0,
          flatFn: ms.flatFn ? 1 : 0,
          fromEntries: ms.fromEntries ? 1 : 0,
          optChain: ms.optChain ? 1 : 0,
          nullish: ms.nullish ? 1 : 0,
          logicalAssign: ms.logicalAssign ? 1 : 0,
        };
        out.errs = (ms.err || []).slice(0, 10).map(String);
      }
    } catch (e) { out.blocked = String((e && e.message) || e); }
    return out;
  }

  watchBoot(status, bar, el) {
    const at = [500, 1500, 3000, 6000, 10000, 16000];
    let i = 0;
    status.setText('loading…');
    const tick = () => {
      if (!this.frame) return;
      const r = this.inspect();
      if (r.booted) {
        status.dataset.s = ''; status.setText('ready');
        /* Logged on success as well — a green line from a device is how I learn the update
           actually reached it, which is the thing a failure-only report can never tell me. */
        this.writeReport(r, 'ok').catch(() => {});
        return;
      }
      i++;
      if (i < at.length) { this.bootTimer = setTimeout(tick, at[i] - at[i - 1]); return; }
      this.onBlank(r, status, bar, el);
    };
    this.bootTimer = setTimeout(tick, at[0]);
  }

  async onBlank(r, status, bar, el) {
    /* Try the other loader once before giving up — if this is a srcdoc-size problem it is the whole
       fix, and it costs one reload. Not persisted: a device that needs blob should say so in the
       report, not have the setting quietly changed underneath it. */
    if (this.loader() === 'srcdoc' && !this.triedBlob) {
      this.triedBlob = true;
      this.loaderOverride = 'blob';
      new Notice('Music School: the page did not come up — retrying with the blob loader…', 6000);
      return this.render();
    }
    status.dataset.s = 'err';
    status.setText('did not start');
    await this.renderDiagnostic(r, el);
  }

  async renderDiagnostic(r, el) {
    if (this.frame) { this.frame.remove(); this.frame = null; }
    const d = el.createDiv({ cls: 'ms-empty' });

    const ua = r.ua || navigator.userAgent || '';
    const cm = /(?:Chrome|CriOS)\/(\d+)/.exec(ua);
    const ver = cm ? parseInt(cm[1], 10) : 0;
    const feat = r.feat || null;
    const syntaxDead = feat && (!feat.logicalAssign || !feat.nullish || !feat.optCatch);

    d.createEl('b', { text: 'The school page loaded but never started.' });

    if (syntaxDead || (ver && ver < NEEDS_CHROME)) {
      /* The answer, stated plainly, because this one is not fixable from the vault. */
      const p = d.createEl('p');
      p.createEl('b', { text: 'This device’s browser engine is too old to run the page. ' });
      p.appendText('The school needs Chrome/WebView ' + NEEDS_CHROME + ' or newer'
        + (ver ? ', and this one reports ' + ver : '') + '. Obsidian on Android draws the pane with '
        + 'the system component "Android System WebView", which on Boox devices is often years '
        + 'behind and does not update with the OS. Updating that component — from the Play Store if '
        + 'the device has it, or by side-loading a current APK if it does not — is what fixes this; '
        + 'nothing in the vault can work around it.');
      d.createEl('p', { text: 'Until then the published web page in a modern browser, or the '
        + 'phone that already works, are the two surfaces that will run.' });
    } else if (feat && !feat.tail) {
      d.createEl('p', { text: 'The document stopped part-way through parsing — it never reached the '
        + 'end. That usually means the build is truncated on this device (a partial sync) or the '
        + 'engine ran out of memory holding it. Check that the build stamp '
        + 'above matches the machine you built on.' });
    } else if (!feat) {
      d.createEl('p', { text: 'Nothing in the page ran at all — not even the probe injected ahead of '
        + 'it. That points at the frame itself rather than the school: scripts blocked, or the '
        + 'document never reached the iframe. The loader button in the bar switches how it is '
        + 'handed over; both have now been tried.' });
    } else {
      d.createEl('p', { text: 'The engine is new enough and the document parsed, so this is the '
        + 'page failing on its own. The errors below are the useful part.' });
    }

    const ul = d.createEl('ul');
    const fact = (k, v) => { const li = ul.createEl('li'); li.createEl('b', { text: k + ': ' }); li.appendText(String(v)); };
    fact('build', (this.build && this.build.path) || '?');
    fact('stamp', (this.build && this.build.stamp) || 'unstamped');
    fact('loader', this.loader());
    fact('engine', ver ? 'Chrome ' + ver : 'unknown');
    fact('needs', 'Chrome ' + NEEDS_CHROME + '+');
    fact('#app filled', r.appFound ? (r.appKids + ' children') : 'no #app element');
    fact('doc readyState', r.ready || '?');
    fact('probe ran', feat ? 'yes' : 'no');
    if (feat) {
      fact('parsed to end', feat.tail ? 'yes' : 'NO');
      fact('optional catch (C66)', feat.optCatch ? 'ok' : 'UNSUPPORTED');
      fact('Array.flat (C69)', feat.flatFn ? 'ok' : 'UNSUPPORTED');
      fact('Object.fromEntries (C73)', feat.fromEntries ? 'ok' : 'UNSUPPORTED');
      fact('optional chaining (C80)', feat.optChain ? 'ok' : 'UNSUPPORTED');
      fact('nullish ?? (C80)', feat.nullish ? 'ok' : 'UNSUPPORTED');
      fact('logical assign ||= (C85)', feat.logicalAssign ? 'ok' : 'UNSUPPORTED');
    }
    if (r.blocked) fact('frame unreadable', r.blocked);

    if (r.errs && r.errs.length) {
      d.createEl('p').createEl('b', { text: 'Errors from inside the page:' });
      const eu = d.createEl('ul');
      for (const e of r.errs) eu.createEl('li').setText(e);
    }

    const row = d.createEl('p');
    const swap = row.createEl('button', { text: 'Switch loader (' + (this.loader() === 'srcdoc' ? 'blob' : 'srcdoc') + ')' });
    swap.onclick = async () => {
      this.loaderOverride = null;
      await this.plugin.set('loader', this.loader() === 'srcdoc' ? 'blob' : 'srcdoc');
      this.triedBlob = false;
      this.render();
    };
    const again = row.createEl('button', { text: 'Try again' });
    again.onclick = () => { this.loaderOverride = null; this.triedBlob = false; this.render(); };

    /* Written to the vault, not offered as "copy this" — the device that has this problem is the
       one where selecting text is worst, and the vault is already the channel home. */
    try {
      await this.writeReport(r, 'blank');
      d.createEl('p', { cls: 'ms-sub', text: 'A copy of this was written to ' + REPORT_PATH
        + ' — it syncs back, so it can be read from the machine you build on.' });
    } catch (err) {
      d.createEl('p', { cls: 'ms-sub', text: 'Could not write the report: ' + err.message });
    }
  }

  /* PATCH-148 — LOG EVERY OPEN, not just every failure.
   *
   * The 2026-08-25 Boox round trip stalled on a question the pane could not answer: had the new
   * plugin even run there? A report written only on failure cannot distinguish "the fix did not
   * work" from "the fix never loaded", and those need opposite next moves. One line per open, in a
   * file that syncs home, settles it without asking anyone to read anything off an e-ink screen.
   *
   * Newest first, capped — this is a diagnostic tail, not a history. */
  async writeReport(r, outcome) {
    const ad = this.app.vault.adapter;
    const now = new Date();
    const when = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-'
      + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0')
      + ':' + String(now.getMinutes()).padStart(2, '0');
    const eng = engineVersion();
    const f = r.feat || {};
    const bits = [
      '`' + when + '`',
      'v' + PLUGIN_VERSION,
      Platform.isMobile ? 'mobile' : 'desktop',
      eng ? 'Chrome ' + eng : 'engine ?',
      (this.build && this.build.lite ? 'lite' : 'full') + ' `' + ((this.build && this.build.stamp) || '?') + '`',
      this.loader(),
      '**' + String(outcome).toUpperCase() + '**',
    ];
    const detail = [
      '#app ' + (r.appFound ? r.appKids : 'missing'),
      'probe ' + (r.feat ? 'ran' : 'NO'),
      'tail ' + (f.tail || 0),
      'syn oc' + (f.optCatch || 0) + ' fl' + (f.flatFn || 0) + ' fe' + (f.fromEntries || 0)
        + ' oc2' + (f.optChain || 0) + ' nu' + (f.nullish || 0) + ' la' + (f.logicalAssign || 0),
    ];
    let line = '- ' + bits.join(' · ') + ' — ' + detail.join(' · ');
    if (r.blocked) line += ' · frame unreadable: ' + r.blocked;
    const extra = [];
    if (r.errs && r.errs.length) for (const e of r.errs) extra.push('    - `' + String(e).slice(0, 240) + '`');
    if (r.ua) extra.push('    - UA: `' + String(r.ua).slice(0, 240) + '`');
    else extra.push('    - UA: `' + String(navigator.userAgent || '').slice(0, 240) + '`');

    const head = '# Offline pane — device log\n\nOne line per pane open, newest first, written by the '
      + 'Music School plugin. `syn` flags are the per-feature syntax probes: `la0` means this engine '
      + 'cannot parse `||=`, which is what silently kills app.js.\n\n';
    let prev = '';
    try { if (await ad.exists(REPORT_PATH)) prev = await ad.read(REPORT_PATH); } catch (e) { /* new file */ }
    let body = prev;
    const at = prev.indexOf('\n- ');
    body = at > -1 ? prev.slice(at + 1) : '';
    const kept = body.split('\n').filter(Boolean).slice(0, 60).join('\n');
    await ad.write(REPORT_PATH, head + [line].concat(extra).join('\n') + '\n' + kept + '\n');
  }

  /* PATCH-147 — always reachable, not only after a failure. The previous version buried this behind
     a timeout that a blank-but-loaded document never triggered. */
  loaderToggle(bar) {
    const btn = bar.createEl('button', { cls: 'ms-pick', text: this.loader() });
    btn.setAttr('title', 'How the page is handed to the frame. srcdoc is the default and works on '
      + 'desktop and phones; blob is the fallback for engines that will not navigate a srcdoc.');
    btn.onclick = async () => {
      this.loaderOverride = null;
      await this.plugin.set('loader', this.loader() === 'srcdoc' ? 'blob' : 'srcdoc');
      this.triedBlob = false;
      this.render();
    };
  }

  /* Whose vault this is. `local-user.json` is per-machine and never shared, so a missing or broken
     one is normal on a fresh clone — fall back rather than fail. */
  async currentUser() {
    try {
      if (await this.app.vault.adapter.exists(USER_PATH)) {
        const u = JSON.parse(await this.app.vault.adapter.read(USER_PATH));
        if (u && typeof u.user === 'string' && u.user.trim()) return u.user.trim();
      }
    } catch (err) { /* fall through */ }
    return 'nate';
  }

  /* PATCH-135 — say what is actually there. On a second device the build usually exists on the
     machine that made it and simply has not arrived; walking the path and reporting what IS present
     turns that into a fact the reader can act on. This is the primary diagnostic surface on phones
     and tablets, where there is no terminal to check from. */
  async renderMissing(el) {
    const d = el.createDiv({ cls: 'ms-empty' });
    d.createEl('b', { text: 'The school build is not in this vault.' });
    const ad = this.app.vault.adapter;
    const probe = async (p) => { try { return await ad.exists(p); } catch (e) { return false; } };
    const steps = [
      ['Machine', await probe('Machine')],
      ['Machine/Scripts', await probe('Machine/Scripts')],
      ['Machine/Scripts/school-artifact', await probe('Machine/Scripts/school-artifact')],
      ['Machine/Scripts/school-artifact/school.html', await probe(FULL_PATH)],
    ];
    const ul = d.createEl('ul');
    for (const [path, ok] of steps) ul.createEl('li').setText((ok ? '✓ ' : '✗ ') + path + (ok ? '' : ' — missing'));

    const p = d.createEl('p');
    if (steps[2][1]) {
      p.createEl('b', { text: 'The folder synced but the file did not. ' });
      p.appendText('That is Obsidian Sync. It does not carry .html unless "Sync all other file '
        + 'types" is on, and it will not carry a file over the per-file size limit — the build is '
        + 'well over it. Since 2026-09-01 the school is not shipped through Sync at all: build it '
        + 'on this machine, or read the published page.');
    } else {
      p.createEl('b', { text: 'The folder itself has not arrived. ' });
      p.appendText('This device is not syncing Machine/ at all — check Settings → Sync → Selective '
        + 'sync, and that this vault is connected to the same remote vault as the machine you build on.');
    }
    const alt = d.createEl('p');
    alt.appendText('If it will not sync, build it on a desktop instead: ');
    alt.createEl('code', { text: 'python3 Machine/Scripts/school-artifact/build.py' });
    const again = d.createEl('button', { text: 'Check again' });
    again.onclick = () => this.render();
    /* Log it: "the build never arrived" is a different device problem from "the page did not
       start", and from here they are indistinguishable unless the pane says which it was. */
    this.writeReport({ booted: false, reach: false }, 'no-build').catch(() => {});
  }
}

module.exports = class MusicSchoolPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
    this.registerView(VIEW_TYPE, (leaf) => new SchoolView(leaf, this));
    this.addRibbonIcon('graduation-cap', 'Music School', () => this.open());
    this.addCommand({ id: 'open-music-school', name: 'Open Music School', callback: () => this.open() });
  }

  async set(key, value) {
    this.settings[key] = value;
    await this.saveData(this.settings);
  }

  async open() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (existing) { await this.app.workspace.revealLeaf(existing); return; }
    const leaf = this.app.workspace.getLeaf('tab');
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }

  onunload() {
    /* Views clean up their own frame, blob, timer and listener in onClose, which Obsidian calls
     * when the leaf is detached — including on unload. */
  }
};
