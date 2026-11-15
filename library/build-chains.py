#!/usr/bin/env python3
"""
build-chains.py: builds Library's Production chains shelf (library/chains.json) from the vault.

Source of truth: the `type: chain` notes under
  <vault>/00 Human/20 Music/School & Content/Production/Chains/
(family folders 1 Vocals ... 8 Master, artist chains included) plus FX Chain System.md, which
becomes the shelf's "How the chains fit together" page. Nothing is hand-copied: rerun this after
editing a chain note, raise `version` in apps.js, and publish.

Usage (from anywhere):
  python3 library/build-chains.py                       # vault at ~/Documents/hyperion
  python3 library/build-chains.py /path/to/hyperion

Wiki links between chain notes ([[3 Vocal Bus|Vocal Bus]]) become links inside Library; links to
any other vault note become plain text. Vault paths are left out of the output.

Plugin screenshots: a step heading that links a plugin note ("### 1. [[LALA]] - Level ride") gets
that plugin's screenshot from Production/Plugins/Images right under it. The numbered version
(<name>.annotated.png) is used when there is one, so the (1) (2) (3) markers in the chain notes
match the badges, with the badges' names from the plugin note's Key Parameters table as the
caption. Images are shrunk and saved as WebP in library/plugins/ (needs Pillow:
`pip3 install pillow`). A plugin in SKIP below is left out until it is re-shot.
"""
import json
import os
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is needed for the plugin screenshots: pip3 install pillow")

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "chains.json")
CHAINS_REL = os.path.join("00 Human", "20 Music", "School & Content", "Production", "Chains")
PLUGINS_REL = os.path.join("00 Human", "20 Music", "School & Content", "Production", "Plugins")
IMG_DIR = os.path.join(HERE, "plugins")
IMG_MAX_W = 1600
SYSTEM_NOTE = "FX Chain System"
CIRCLED = {chr(0x2460 + i): i + 1 for i in range(20)}   # (1) .. (20)

# Names used in chain notes that aren't a plugin note's name or alias. Name -> plugin note.
PLUGIN_ALIASES = {"UAD 1176LN": "UAD UA 1176LN", "RX 11 Voice De-noise": "RX Voice De-noise"}

# Screenshots that exist but show the wrong thing; left out until re-shot (see the vault's
# Production/Plugins/_Re-shoot Queue.md). Name -> why.
SKIP = {
    "API-2500": "YouTube thumbnail, not a capture (licence also showed a demo bar)",
    "Gem Dopamine": "vendor/tutorial image with overlay text (licence showed a demo dialog)",
    "ValhallaPlate": "tutorial image with an arrow and caption overlay",
    "ValhallaRoom": "'In depth with' YouTube thumbnail, old v1 UI",
    "Drum Rack": "empty pad grid, no kit loaded",
    "Simpler": "no sample loaded",
}
SYSTEM_HREF = "#/chains/system"

FAMILIES = ["Vocals", "Drums", "FX", "Bass", "Inst & Synth", "Guitars", "Effects", "Master"]
KIND_ORDER = ["foundation", "track", "group", "bus", "send", "master", "style"]


def parse_scalar(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    return v


def parse_list(v):
    inner = v.strip()[1:-1]
    items, cur, q = [], "", None
    for ch in inner:
        if q:
            if ch == q:
                q = None
            cur += ch
        elif ch in "\"'":
            q = ch
            cur += ch
        elif ch == ",":
            items.append(cur)
            cur = ""
        else:
            cur += ch
    if cur.strip():
        items.append(cur)
    return [parse_scalar(i) for i in items if i.strip()]


def parse_frontmatter(text):
    m = re.match(r"---\n(.*?)\n---\n?", text, re.S)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if not km:
            continue
        k, v = km.group(1), km.group(2)
        fm[k] = parse_list(v) if v.strip().startswith("[") and v.strip().endswith("]") else parse_scalar(v)
    return fm, text[m.end():]


def wl_parts(s):
    """'Path/Name#Heading|Alias' -> ('Name', 'Alias or Name')."""
    target, _, alias = s.partition("|")
    name = target.split("#", 1)[0].split("/")[-1].strip()
    return name, (alias.strip() or name)


def body_plugins(body):
    """Fallback signal chain from '### 1. [[Plugin]] - role' headings."""
    return [wl_parts(m.group(1))[1] for m in re.finditer(r"^###\s+\d+\.\s+\[\[([^\]]+)\]\]", body, re.M)]


def slug(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


def as_list(v):
    return v if isinstance(v, list) else []


def load_plugins(vault):
    """Plugin notes by lowercase name/alias -> {name, image, coords, keys}."""
    pdir = os.path.join(vault, PLUGINS_REL)
    idir = os.path.join(pdir, "Images")
    found = {}
    if not os.path.isdir(pdir):
        return found
    for f in sorted(os.listdir(pdir)):
        if not f.endswith(".md") or f.startswith("_"):
            continue
        name = f[:-3]
        fm, body = parse_frontmatter(open(os.path.join(pdir, f), encoding="utf-8").read())
        if fm.get("type") not in (None, "", "plugin"):
            continue
        img = coords = None
        for ext in (".annotated.png", ".png", ".jpg", ".jpeg"):
            if os.path.isfile(os.path.join(idir, name + ext)):
                img = os.path.join(idir, name + ext)
                break
        if img and img.endswith(".annotated.png") and os.path.isfile(os.path.join(idir, name + ".coords.json")):
            coords = os.path.join(idir, name + ".coords.json")
        keys = []
        sec = re.search(r"^## Key Parameters\s*\n(.*?)(?=^## |\Z)", body, re.S | re.M)
        for m in re.finditer(r"^\|\s*([\u2460-\u2473])\s*\|\s*([^|]+?)\s*\|", sec.group(1) if sec else "", re.M):
            keys.append([CIRCLED[m.group(1)], re.sub(r"[*_`]", "", m.group(2)).strip()])
        p = {"name": name, "image": img, "coords": coords, "keys": keys}
        for n in [name, *as_list(fm.get("aliases"))]:
            found.setdefault(n.lower(), p)
    return found


def plugin_image(p, used):
    """Shrink one plugin screenshot to WebP in library/plugins/; returns its entry for chains.json."""
    sid = slug(p["name"])
    out = os.path.join(IMG_DIR, sid + ".webp")
    used.add(sid + ".webp")
    if not (os.path.isfile(out) and os.path.getmtime(out) >= os.path.getmtime(p["image"])):
        im = Image.open(p["image"])
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        if im.width > IMG_MAX_W:
            im = im.resize((IMG_MAX_W, round(im.height * IMG_MAX_W / im.width)), Image.LANCZOS)
        im.save(out, "WEBP", quality=82, method=6)
    w, h = Image.open(out).size
    keys = p["keys"]
    if p["coords"]:   # caption only the controls that carry a badge on the image
        badged = {b[0] for b in json.load(open(p["coords"], encoding="utf-8")).get("badges", [])}
        keys = [k for k in keys if k[0] in badged]
    elif not p["image"].endswith(".annotated.png"):
        keys = []
    return sid, {"name": p["name"], "src": "plugins/" + sid + ".webp", "w": w, "h": h, "keys": keys}


def add_screenshots(body, plugins, shots, used):
    """After each heading that links a plugin with a screenshot, a placeholder Library fills in."""
    def heading(m):
        wl = re.search(r"\[\[([^\]]+)\]\]", m.group(0))
        name = wl_parts(wl.group(1))[0] if wl else ""
        p = plugins.get(PLUGIN_ALIASES.get(name, name).lower())
        if not p or not p["image"] or p["name"] in SKIP:
            return m.group(0)
        sid = slug(p["name"])
        if sid not in shots:
            shots[sid] = plugin_image(p, used)[1]
        return m.group(0) + '\n\n<div data-plug="' + sid + '"></div>\n'
    return re.sub(r"^#{2,5}[ \t]+.*$", heading, body, flags=re.M)


def node_shots(c, plugins, shots, used):
    """Signal-chain step name -> screenshot id, for the steps whose plugin has one."""
    out = {}
    for name in c["uad"] + c["plugins"]:
        base = re.sub(r"\s*\(.*?\)\s*$", "", name).strip()
        for cand in (name, base, re.sub(r"\s+(Rev E|Silver)$", "", base)):
            cand = PLUGIN_ALIASES.get(cand, cand)
            p = plugins.get(cand.lower())
            if p:
                if p["image"] and p["name"] not in SKIP:
                    sid = slug(p["name"])
                    if sid not in shots:
                        shots[sid] = plugin_image(p, used)[1]
                    out[name] = sid
                break
    return out


def clean_body(body, links):
    """Obsidian markdown -> plain GitHub-flavoured markdown with Library links."""
    body = re.sub(r"%%.*?%%", "", body, flags=re.S)           # comments
    body = re.sub(r"!\[\[[^\]]*\]\]", "", body)                # embeds
    body = re.sub(r"^(>\s*)\[!(\w+)\][+-]?\s*", lambda m: m.group(1) + "**" + m.group(2).capitalize() + ":** ", body, flags=re.M)

    def link(m):
        name, text = wl_parts(m.group(1))
        href = links.get(name.lower())
        text = text.replace("[", "(").replace("]", ")")
        return "[" + text + "](" + href + ")" if href else text
    return re.sub(r"\[\[([^\]]+)\]\]", link, body).strip()


def main():
    vault = os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~/Documents/hyperion")
    root_dir = os.path.join(vault, CHAINS_REL)
    if not os.path.isdir(root_dir):
        sys.exit("No chain notes at " + root_dir)

    notes, overview = [], ""
    for root, dirs, files in os.walk(root_dir):
        dirs.sort()
        if "_Sheets" in root:
            continue
        for f in sorted(files):
            if not f.endswith(".md"):
                continue
            fm, body = parse_frontmatter(open(os.path.join(root, f), encoding="utf-8").read())
            body = re.sub(r"^\s*# .*\n", "", body, count=1)
            if f[:-3] == SYSTEM_NOTE:
                overview = body
                continue
            if fm.get("type") != "chain":
                continue
            rel = os.path.relpath(root, root_dir).split(os.sep)
            fam = re.sub(r"^\d+\s+", "", rel[0] if rel and rel[0] != "." else "")
            notes.append((f[:-3], rel, fm, body, fam))

    # Ids first, so every chain note can link to every other.
    chains, links = [], {SYSTEM_NOTE.lower(): SYSTEM_HREF}
    for stem, rel, fm, body, fam in notes:
        title = fm.get("title") or stem
        kind = (fm.get("chain_type") or "").strip() or "style"
        c = {
            "id": slug(title), "title": title, "family": fam, "kind": kind,
            "artist": "Artist Chains" in rel,
            "status": fm.get("status") or "", "source": fm.get("source") or "",
            "routing": fm.get("routing") or "", "reference": fm.get("reference") or "",
            "mics": fm.get("mics") or fm.get("mic") or "",
            "uad": as_list(fm.get("uad_console")),
            "plugins": as_list(fm.get("signal_chain")) or body_plugins(body),
            "_stem": stem, "_aliases": as_list(fm.get("aliases")), "_body": body,
        }
        chains.append(c)

    fi = lambda c: FAMILIES.index(c["family"]) if c["family"] in FAMILIES else len(FAMILIES)
    ki = lambda c: KIND_ORDER.index(c["kind"]) if c["kind"] in KIND_ORDER else 99
    chains.sort(key=lambda c: (fi(c), c["artist"], ki(c), c["title"].lower()))
    seen = set()
    for c in chains:
        base, n = c["id"], 2
        while c["id"] in seen:
            c["id"] = base + "-" + str(n)
            n += 1
        seen.add(c["id"])
        for name in [c["_stem"], c["title"], *c["_aliases"]]:
            links.setdefault(name.lower(), "#/chain/" + c["id"])

    plugins, shots, used = load_plugins(vault), {}, set()
    os.makedirs(IMG_DIR, exist_ok=True)
    for c in chains:
        c["body"] = clean_body(add_screenshots(c.pop("_body"), plugins, shots, used), links)
        c["shots"] = node_shots(c, plugins, shots, used)
        del c["_stem"], c["_aliases"]
    for f in os.listdir(IMG_DIR):   # screenshots no chain uses any more
        if f not in used:
            os.remove(os.path.join(IMG_DIR, f))

    data = {"families": FAMILIES, "overview": clean_body(overview, links), "chains": chains,
            "plugins": dict(sorted(shots.items()))}
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    kb = sum(os.path.getsize(os.path.join(IMG_DIR, f)) for f in os.listdir(IMG_DIR)) // 1024
    print(f"{len(chains)} chains -> {os.path.relpath(OUT)} ({os.path.getsize(OUT) // 1024} KB)")
    print(f"{len(shots)} plugin screenshots -> {os.path.relpath(IMG_DIR)}/ ({kb} KB)")


if __name__ == "__main__":
    main()
