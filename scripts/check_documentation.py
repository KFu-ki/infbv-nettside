import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    "AGENTS.md",
    "README.md",
    "docs/INDEX.md",
    "docs/project/current-state.md",
    "docs/project/next-actions.md",
    "docs/changes/project-journal.md",
    "docs/changes/CHANGELOG.md",
    "docs/introduction/overview.md",
    "docs/architecture/overview.md",
    "docs/architecture/components.md",
    "docs/architecture/backend-api.md",
    "docs/architecture/frontend.md",
    "docs/architecture/data-flows.md",
    "docs/decisions/ADR-000-template.md",
    "docs/decisions/ADR-001-static-json.md",
    "docs/decisions/ADR-002-timetable-review.md",
    "docs/data-sources/source-register.md",
    "docs/data-sources/json-contracts.md",
    "docs/business-rules/budget-calculations.md",
    "docs/design/visual-design.md",
    "docs/development/rebuild-from-zero.md",
    "docs/agents/efficient-context.md",
    "docs/agents/providers.md",
    "docs/history/discussion-log.md",
    "docs/manual/README.md",
    "docs/manual/code-map.md",
    "docs/manual/knowledge-catalog.md",
    "docs/manual/development-manual.md",
    "docs/manual/development-manual.pdf",
    "data/README.md",
    "scripts/README.md",
    "docs/operations/vercel.md",
    "docs/operations/backup-and-recovery.md",
    "docs/user-guides/mobile-use.md",
    "docs/developer-guides/visual-studio-code.md",
    ".github/copilot-instructions.md",
    ".github/prompts/continue-work.prompt.md",
    ".github/prompts/add-feature.prompt.md",
    ".github/prompts/fix-bug.prompt.md",
    ".github/prompts/import-data.prompt.md",
    ".github/prompts/deploy.prompt.md",
    ".github/workflows/ci.yml",
    ".github/workflows/documentation-check.yml",
    ".github/workflows/manual.yml",
    "CLAUDE.md",
    "GEMINI.md",
    ".env.example",
    ".vscode/extensions.json",
    ".cursor/rules/project.mdc",
    ".windsurfrules",
    ".clinerules/project.md",
    ".roo/rules/01-project.md",
    ".continue/rules/project.md",
    ".amazonq/rules/project.md",
)
MARKDOWN_LINK = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
EXCLUDED_DIRS = {".git", ".venv", "__pycache__", "node_modules", "_backup"}
SECRET_FILENAMES = {
    "id_rsa",
    "id_ed25519",
    "credentials.json",
    "service-account.json",
}


def markdown_files():
    return [
        path
        for path in ROOT.rglob("*")
        if path.is_file()
        and (path.suffix.lower() in {".md", ".mdc"} or path.relative_to(ROOT) == Path(".windsurfrules"))
        and path.relative_to(ROOT) not in {
            Path("docs/manual/code-map.md"),
            Path("docs/manual/knowledge-catalog.md"),
            Path("docs/manual/development-manual.md"),
        }
        and not any(part in EXCLUDED_DIRS for part in path.relative_to(ROOT).parts)
    ]


def internal_link_errors(markdown_path):
    errors = []
    content = markdown_path.read_text(encoding="utf-8")
    for match in MARKDOWN_LINK.finditer(content):
        destination = match.group(1).strip()
        if destination.startswith("<") and ">" in destination:
            destination = destination[1 : destination.index(">")]
        elif destination:
            destination = destination.split(maxsplit=1)[0]

        parsed = urlsplit(destination)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue

        target = (markdown_path.parent / unquote(parsed.path)).resolve()
        if target.is_dir():
            target = next(
                (target / name for name in ("index.md", "README.md") if (target / name).is_file()),
                target,
            )
        if not target.is_file():
            relative = markdown_path.relative_to(ROOT)
            errors.append(f"{relative}: broken internal link {destination}")
    return errors


def tracked_secret_errors():
    tracked = subprocess.run(
        ["git", "-C", str(ROOT), "ls-files", "-z"],
        check=True,
        capture_output=True,
    ).stdout.decode("utf-8").split("\0")
    errors = []
    for path in filter(None, tracked):
        name = Path(path).name.lower()
        if name == ".env" or (name.startswith(".env.") and name != ".env.example"):
            errors.append(f"tracked environment file: {path}")
        elif name in SECRET_FILENAMES or name.endswith((".key", ".pem", ".p12", ".pfx")):
            errors.append(f"tracked credential-like file: {path}")
    return errors


def documentation_index_errors():
    index = ROOT / "docs" / "INDEX.md"
    content = index.read_text(encoding="utf-8")
    linked_files = set()
    for match in MARKDOWN_LINK.finditer(content):
        destination = match.group(1).strip().split(maxsplit=1)[0].strip("<>")
        parsed = urlsplit(destination)
        if parsed.scheme or parsed.netloc or not parsed.path.lower().endswith(".md"):
            continue
        linked_files.add((index.parent / unquote(parsed.path)).resolve())
    return [
        f"documentation file is not listed in docs/INDEX.md: {path.relative_to(ROOT)}"
        for path in (ROOT / "docs").rglob("*.md")
        if path.resolve() not in linked_files
        and not any(part in EXCLUDED_DIRS for part in path.relative_to(ROOT).parts)
    ]


def main():
    errors = [
        f"missing required file: {path}"
        for path in REQUIRED_FILES
        if not (ROOT / path).is_file()
    ]
    for markdown_path in markdown_files():
        errors.extend(internal_link_errors(markdown_path))
    errors.extend(tracked_secret_errors())
    errors.extend(documentation_index_errors())

    adapters = (
        ".github/copilot-instructions.md",
        "CLAUDE.md",
        "GEMINI.md",
        ".cursor/rules/project.mdc",
        ".windsurfrules",
        ".clinerules/project.md",
        ".roo/rules/01-project.md",
        ".continue/rules/project.md",
        ".amazonq/rules/project.md",
    )
    errors.extend(
        f"agent adapter does not reference AGENTS.md: {path}"
        for path in adapters
        if "AGENTS.md" not in (ROOT / path).read_text(encoding="utf-8")
    )

    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors), file=sys.stderr)
        return 1
    print("Documentation, internal Markdown links, and tracked secret filenames are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
