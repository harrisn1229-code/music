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
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "chains.json")
CHAINS_REL = os.path.join("00 Human", "20 Music", "School & Content", "Production", "Chains")
SYSTEM_NOTE = "FX Chain System"
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

    for c in chains:
        c["body"] = clean_body(c.pop("_body"), links)
        del c["_stem"], c["_aliases"]

    data = {"families": FAMILIES, "overview": clean_body(overview, links), "chains": chains}
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(chains)} chains -> {os.path.relpath(OUT)} ({os.path.getsize(OUT) // 1024} KB)")


if __name__ == "__main__":
    main()
