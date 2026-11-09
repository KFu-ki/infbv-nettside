import argparse
import hashlib
import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANUAL = Path("docs/manual/development-manual.md")
CATALOG = Path("docs/manual/knowledge-catalog.md")
CODE_MAP = Path("docs/manual/code-map.md")
PDF = Path("docs/manual/development-manual.pdf")
EXCLUDED_DIRS = {".git", "_backup", "__pycache__", ".venv", "node_modules"}
GENERATED_FILES = {MANUAL, CATALOG, CODE_MAP}
CODE_EXTENSIONS = {".py", ".js", ".html", ".css", ".yml", ".yaml"}
LINKED_JSON_FILES = {Path(".vscode/extensions.json")}
MARKDOWN_LIKE_FILES = {Path(".windsurfrules")}
LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def source_markdown_files():
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if path.suffix.lower() not in {".md", ".mdc"} and relative not in MARKDOWN_LIKE_FILES:
            continue
        if relative in GENERATED_FILES or any(part in EXCLUDED_DIRS for part in relative.parts):
            continue
        files.append(relative)
    return sorted(files, key=lambda path: path.as_posix().casefold())


def source_code_files():
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if any(part in EXCLUDED_DIRS for part in relative.parts):
            continue
        if path.suffix in CODE_EXTENSIONS or relative in LINKED_JSON_FILES or path.name == "requirements.txt":
            files.append(relative)
    return sorted(files, key=lambda path: path.as_posix().casefold())


def document_title(content, fallback):
    for line in content.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def document_summary(content):
    in_code = False
    for line in content.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if not stripped or in_code or stripped.startswith(("#", "|", "<", "---")):
            continue
        return stripped
    return "Markdown-kjelde i prosjektet."


def source_symbols(relative, content):
    if relative.suffix == ".py":
        pattern = re.compile(r"^\s*(?:async\s+)?(?:def|class)\s+([A-Za-z_]\w*)", re.MULTILINE)
    elif relative.suffix == ".js":
        pattern = re.compile(
            r"^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)|"
            r"^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=",
            re.MULTILINE,
        )
        return ", ".join(
            dict.fromkeys(match.group(1) or match.group(2) for match in pattern.finditer(content))
        )
    elif relative.suffix == ".html":
        title = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
        return re.sub(r"\s+", " ", title.group(1)).strip() if title else "HTML-side"
    elif relative.suffix == ".css":
        media = re.findall(r"@media\s*([^{]+)", content)
        return ", ".join(f"@media {query.strip()}" for query in dict.fromkeys(media)) or "CSS-reglar"
    elif relative.name == "requirements.txt":
        return ", ".join(
            line.split("#", 1)[0].strip()
            for line in content.splitlines()
            if line.split("#", 1)[0].strip()
        )
    else:
        return "Konfigurasjon"
    return ", ".join(dict.fromkeys(pattern.findall(content)))


def code_map_markdown():
    lines = [
        "# Kodekart (generert)",
        "",
        "Automatisk oversyn over kjelde-/konfigurasjonsfiler. Korte SHA-256-prefiksar gjer at endringar i kjeldefiler utløyser regenerering; dei er ikkje ei kjeldekontrollsum for eksterne data.",
        "",
        "| Fil | Type | SHA-256 | Synlege symbol / metadata |",
        "|---|---|---|---|",
    ]
    for relative in source_code_files():
        content = (ROOT / relative).read_text(encoding="utf-8")
        digest = hashlib.sha256(content.encode("utf-8")).hexdigest()[:12]
        symbols = source_symbols(relative, content).replace("|", r"\|") or "—"
        lines.append(
            f"| `{relative.as_posix()}` | `{relative.suffix or relative.name}` | `{digest}` | {symbols} |"
        )
    return "\n".join(lines) + "\n"


def catalog_markdown(files):
    lines = [
        "# Kunnskapskatalog (generert)",
        "",
        "Automatisk oversyn over Markdown-kjeldene. Innhaldet vert regenerert av `scripts/build_manual.py`.",
        "",
        "| Fil | Tittel | Kort samandrag |",
        "|---|---|---|",
        "| `docs/manual/code-map.md` | Kodekart (generert) | Filoversyn og symboler; hash endrar seg med kjeldekode. |",
    ]
    for relative in files:
        content = (ROOT / relative).read_text(encoding="utf-8")
        title = document_title(content, relative.name.removesuffix(".md"))
        summary = document_summary(content).replace("|", r"\|")
        title = title.replace("|", r"\|")
        lines.append(f"| `{relative.as_posix()}` | {title} | {summary} |")
    return "\n".join(lines) + "\n"


def manual_markdown(files, code_map):
    lines = [
        "# INFBV utviklingsmanual",
        "",
        "Samla, generert frå Markdown-kjelde i repoet. Endre kjeldefilene og regenerer denne fila.",
        "",
        f"Dokumentkjelder: {len(files)}.",
        "",
        "## Innhald",
        "",
        "- [Kodekart](#generated-code-map) — `docs/manual/code-map.md`",
    ]
    for relative in files:
        content = (ROOT / relative).read_text(encoding="utf-8")
        title = document_title(content, relative.name.removesuffix(".md"))
        lines.append(f"- [{title}](#{relative.as_posix().replace('/', '-')}) — `{relative.as_posix()}`")
    lines.extend(
        [
            "",
            "---",
            "",
            '<a id="generated-code-map"></a>',
            "## Generert kodekart: `docs/manual/code-map.md`",
            "",
            code_map.strip(),
        ]
    )
    for relative in files:
        content = (ROOT / relative).read_text(encoding="utf-8").strip()
        title = document_title(content, relative.name.removesuffix(".md"))
        anchor = relative.as_posix().replace("/", "-")
        lines.extend(
            [
                "",
                "---",
                "",
                f'<a id="{anchor}"></a>',
                f"## Kjelde: `{relative.as_posix()}`",
                "",
                content or f"# {title}",
            ]
        )
    return "\n".join(lines) + "\n"


def markdown_lines(content, width=92):
    result = []
    in_code = False
    for original in content.splitlines():
        line = original.rstrip()
        if line.strip().startswith("```"):
            in_code = not in_code
            result.append(" " * 4 + ("[kode]" if in_code else "[slutt kode]"))
            continue
        line = re.sub(r"!\[([^\]]*)\]\([^)]+\)", r"[Bilete: \1]", line)
        line = LINK_PATTERN.sub(lambda match: f"{match.group(1)} <{match.group(2)}>", line)
        line = re.sub(r"[*`_~]", "", line)
        if line.startswith("#"):
            line = line.lstrip("# ").upper()
        if in_code:
            result.extend(textwrap.wrap(line, width=width - 4, subsequent_indent="    ") or [""])
        elif line.startswith("|"):
            result.extend(textwrap.wrap(line, width=width, break_long_words=True) or [""])
        else:
            result.extend(textwrap.wrap(line, width=width, break_long_words=False) or [""])
    return result


def pdf_literal(text):
    encoded = text.encode("cp1252", errors="replace")
    escaped = bytearray()
    for byte in encoded:
        if byte in (ord("("), ord(")"), ord("\\")):
            escaped.extend(b"\\" + bytes((byte,)))
        elif byte < 32 or byte > 126:
            escaped.extend(f"\\{byte:03o}".encode("ascii"))
        else:
            escaped.append(byte)
    return b"(" + bytes(escaped) + b") Tj"


def create_pdf(content):
    lines = markdown_lines(content)
    page_size = 52
    pages = [lines[index : index + page_size] for index in range(0, len(lines), page_size)] or [[]]
    objects = {
        1: b"<< /Type /Catalog /Pages 2 0 R >>",
        3: b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    }
    page_ids = []
    next_id = 4
    for page_number, page_lines in enumerate(pages, start=1):
        stream_id = next_id
        page_id = next_id + 1
        next_id += 2
        page_ids.append(page_id)
        commands = [b"BT", b"/F1 9 Tf", b"48 794 Td", b"13 TL"]
        for line in page_lines:
            commands.extend((pdf_literal(line), b"T*"))
        commands.extend((b"0 -22 Td", pdf_literal(f"Side {page_number} / {len(pages)}"), b"ET"))
        stream = b"\n".join(commands)
        objects[stream_id] = (
            f"<< /Length {len(stream)} >>\nstream\n".encode("ascii")
            + stream
            + b"\nendstream"
        )
        objects[page_id] = (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
            f"/Resources << /Font << /F1 3 0 R >> >> /Contents {stream_id} 0 R >>"
        ).encode("ascii")
    kids = " ".join(f"{page_id} 0 R" for page_id in page_ids)
    objects[2] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>".encode("ascii")

    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for object_id in range(1, next_id):
        offsets.append(len(output))
        output.extend(f"{object_id} 0 obj\n".encode("ascii"))
        output.extend(objects[object_id])
        output.extend(b"\nendobj\n")
    xref_offset = len(output)
    output.extend(f"xref\n0 {next_id}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    output.extend(
        f"trailer\n<< /Size {next_id} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("ascii")
    )
    return bytes(output)


def write_or_check(path, content, check):
    destination = ROOT / path
    current = destination.read_bytes() if destination.is_file() else None
    if check:
        if current != content:
            print(f"STALE: {path.as_posix()} (run python3 scripts/build_manual.py)")
            return False
        print(f"Current: {path.as_posix()}")
        return True
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(content)
    print(f"Updated: {path.as_posix()}")
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Build the Markdown knowledge catalog, consolidated manual, and PDF."
    )
    parser.add_argument("--check", action="store_true", help="Fail if generated files are stale.")
    parser.add_argument("--markdown-only", action="store_true", help="Skip PDF generation.")
    args = parser.parse_args()

    files = source_markdown_files()
    code_map = code_map_markdown()
    catalog = catalog_markdown(files).encode("utf-8")
    manual = manual_markdown(files, code_map).encode("utf-8")
    results = [
        write_or_check(CODE_MAP, code_map.encode("utf-8"), args.check),
        write_or_check(CATALOG, catalog, args.check),
        write_or_check(MANUAL, manual, args.check),
    ]
    if not args.markdown_only:
        results.append(write_or_check(PDF, create_pdf(manual.decode("utf-8")), args.check))
    return 0 if all(results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
