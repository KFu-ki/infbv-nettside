import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_PARTS = {".git", "_backup", "__pycache__", ".venv", "node_modules"}
GENERATED = {
    Path("docs/manual/development-manual.md"),
    Path("docs/manual/knowledge-catalog.md"),
}
LOW_PRIORITY = {
    Path("docs/changes/CHANGELOG.md"),
    Path("docs/changes/project-journal.md"),
    Path("docs/history/discussion-log.md"),
}


def searchable_files():
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if path.suffix.lower() not in {".md", ".mdc"} and relative != Path(".windsurfrules"):
            continue
        if relative in GENERATED or any(part in EXCLUDED_PARTS for part in relative.parts):
            continue
        files.append(relative)
    return sorted(files, key=lambda path: path.as_posix().casefold())


def score_document(relative, content, terms):
    normalized = content.casefold()
    score = sum(normalized.count(term) for term in terms)
    if relative.as_posix().startswith("docs/"):
        score += 1
    if relative in LOW_PRIORITY:
        score = max(0, score - 2)
    return score


def matching_lines(relative, content, terms):
    matches = []
    for number, line in enumerate(content.splitlines(), start=1):
        normalized = line.casefold()
        score = sum(term in normalized for term in terms)
        if score:
            matches.append((score, number, line.strip()))
    return sorted(matches, key=lambda item: (-item[0], item[1]))[:2]


def main():
    parser = argparse.ArgumentParser(
        description="Search local project Markdown and print a short, evidence-linked context."
    )
    parser.add_argument("query", help="A specific topic or question in a few words.")
    parser.add_argument("--max-results", type=int, default=5)
    parser.add_argument("--max-chars", type=int, default=2200)
    parser.add_argument(
        "--refresh",
        action="store_true",
        help="Regenerate the documentation catalog and manuals before searching.",
    )
    args = parser.parse_args()
    if not 1 <= args.max_results <= 10 or args.max_chars < 300:
        parser.error("--max-results must be 1..10 and --max-chars must be at least 300.")

    if args.refresh:
        subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "build_manual.py")],
            cwd=ROOT,
            check=True,
        )

    terms = list(dict.fromkeys(re.findall(r"[\wæøåÆØÅ-]+", args.query.casefold())))
    if not terms:
        parser.error("Query must contain at least one searchable word.")

    results = []
    for relative in searchable_files():
        content = (ROOT / relative).read_text(encoding="utf-8")
        score = score_document(relative, content, terms)
        if score:
            results.append((score, relative, content))
    results.sort(key=lambda result: (-result[0], result[1].as_posix().casefold()))

    output = (
        f"Local project lookup: {args.query}\n"
        "Read the linked source file before making changes."
    )
    max_output = args.max_chars - 1
    found = 0
    for score, relative, content in results[: args.max_results]:
        remaining = max_output - len(output) - 1
        if remaining <= 0:
            break
        path_text = relative.as_posix()
        section = [f"[{path_text}] (relevance {score})"]
        for _, line_number, text in matching_lines(relative, content, terms):
            section.append(f"L{line_number}: {text}")
        block = "\n".join(section)
        if len(block) > remaining:
            marker = "\n[truncated]"
            if remaining < len(marker) + 1:
                break
            block = block[: remaining - len(marker)] + marker
        output += "\n" + block
        found += 1
    if not found:
        message = "No matching Markdown found. Try fewer or more specific terms."
        remaining = max_output - len(output) - 1
        if remaining > 0:
            output += "\n" + message[:remaining]
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
