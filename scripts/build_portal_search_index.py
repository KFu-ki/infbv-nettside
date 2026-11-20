#!/usr/bin/env python3

from html.parser import HTMLParser
from pathlib import Path
import argparse
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "mmp311" / "search" / "search-index.json"

EXCLUDED_PARTS = {
    ".git",
    ".github",
    "_backup",
    "docs",
    "node_modules",
    "dist",
}

EXCLUDED_FILES = {
    "404.html",
}

TYPE_RULES = (
    ("/mmp311/learning-path/", "learning-resource"),
    ("/mmp311/skills/", "skill"),
    ("/mmp311/knowledge/", "knowledge"),
    ("/mmp311/glossary/", "glossary"),
    ("/mmp311/cases/", "case"),
    ("/mmp311/full-text/", "full-text"),
    ("/mmp311/prk/", "model"),
    ("/mmp311/soft/", "model"),
    ("/mmp311/fiver/", "model"),
    ("/tekst/", "text"),
    ("/undervisning/", "teaching"),
    ("/modellar/", "model"),
    ("/kunnskap/", "knowledge"),
)

TAG_TERMS = {
    "theory": (
        "theory",
        "theoretical",
        "teori",
        "concept",
        "omgrep",
        "knowledge",
        "kunnskap",
    ),
    "method": (
        "method",
        "metode",
        "analysis",
        "analyse",
        "framework",
        "model",
    ),
    "outcome": (
        "learning outcome",
        "læringsutbytte",
        "skill",
        "ferdigheit",
        "competence",
        "kompetanse",
    ),
    "assessment": (
        "assessment",
        "exam",
        "assignment",
        "vurdering",
        "eksamen",
        "arbeidskrav",
    ),
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.headings = []
        self.text = []
        self.description = ""
        self.language = ""
        self._capture_title = False
        self._capture_heading = False
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        if tag == "html":
            self.language = attrs.get("lang", "")

        if tag in {"script", "style", "noscript", "svg", "dialog"}:
            self._skip_depth += 1
            return

        if self._skip_depth:
            return

        if tag == "title":
            self._capture_title = True
        elif tag in {"h1", "h2", "h3"}:
            self._capture_heading = True
        elif (
            tag == "meta"
            and attrs.get("name", "").lower() == "description"
        ):
            self.description = attrs.get("content", "").strip()

    def handle_endtag(self, tag):
        if tag in {"script", "style", "noscript", "svg", "dialog"}:
            if self._skip_depth:
                self._skip_depth -= 1
            return

        if self._skip_depth:
            return

        if tag == "title":
            self._capture_title = False
        elif tag in {"h1", "h2", "h3"}:
            self._capture_heading = False

    def handle_data(self, data):
        if self._skip_depth:
            return

        value = " ".join(data.split())

        if not value:
            return

        self.text.append(value)

        if self._capture_title:
            self.title.append(value)

        if self._capture_heading:
            self.headings.append(value)


def compact(value):
    return re.sub(r"\s+", " ", value).strip()


def public_html_files():
    for path in sorted(ROOT.rglob("*.html")):
        relative = path.relative_to(ROOT)

        if path.name in EXCLUDED_FILES:
            continue

        if any(part in EXCLUDED_PARTS for part in relative.parts):
            continue

        yield path


def page_url(path):
    relative = path.relative_to(ROOT)

    if relative == Path("index.html"):
        return "/"

    if path.name == "index.html":
        return "/" + relative.parent.as_posix().strip("/") + "/"

    return "/" + relative.as_posix()


def page_type(url):
    for prefix, kind in TYPE_RULES:
        if url.startswith(prefix):
            return kind

    if url == "/":
        return "portal"

    if url == "/mmp311/":
        return "subject"

    return "page"


def derive_tags(text):
    normalised = text.lower()
    tags = []

    for tag, terms in TAG_TERMS.items():
        if any(term in normalised for term in terms):
            tags.append(tag)

    return tags


def build_index():
    entries = []

    for path in public_html_files():
        parser = PageParser()

        try:
            parser.feed(path.read_text(encoding="utf-8"))
        except UnicodeDecodeError as error:
            raise RuntimeError(f"Kan ikkje lese {path}: {error}") from error

        title = compact(" ".join(parser.title))
        headings = compact(" ".join(parser.headings))
        text = compact(" ".join(parser.text))

        if not title:
            title = headings.split("  ", 1)[0] if headings else path.stem

        url = page_url(path)
        combined = compact(
            " ".join(
                value
                for value in (
                    title,
                    parser.description,
                    headings,
                    text,
                )
                if value
            )
        )

        entries.append(
            {
                "title": title,
                "url": url,
                "language": parser.language or "und",
                "type": page_type(url),
                "description": parser.description,
                "headings": headings,
                "text": combined,
                "tags": derive_tags(combined),
            }
        )

    return entries


def serialise(entries):
    return (
        json.dumps(
            entries,
            ensure_ascii=False,
            indent=2,
            sort_keys=False,
        )
        + "\n"
    )


def main():
    parser = argparse.ArgumentParser(
        description="Bygg søkjeindeks for offentlege INFBV-sider."
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Kontroller at den eksisterande indeksen er oppdatert.",
    )
    args = parser.parse_args()

    content = serialise(build_index())

    if args.check:
        if not OUTPUT.is_file():
            print(f"FEIL: Manglar {OUTPUT.relative_to(ROOT)}")
            return 1

        existing = OUTPUT.read_text(encoding="utf-8")

        if existing != content:
            print(
                "FEIL: Søkjeindeksen er utdatert. Køyr "
                "python3 scripts/build_portal_search_index.py"
            )
            return 1

        print("Portalsøkjeindeksen er oppdatert.")
        return 0

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(content, encoding="utf-8")
    print(
        f"Oppdaterte {OUTPUT.relative_to(ROOT)} "
        f"med {len(json.loads(content))} offentlege sider."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
