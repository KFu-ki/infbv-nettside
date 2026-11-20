#!/usr/bin/env python3

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def run(*arguments):
    print("+", " ".join(arguments), flush=True)
    result = subprocess.run(arguments, cwd=ROOT)

    if result.returncode:
        raise SystemExit(result.returncode)


def main():
    run(
        sys.executable,
        "scripts/update_changed_page_metadata.py",
    )
    run(
        sys.executable,
        "scripts/build_portal_search_index.py",
    )
    run(
        sys.executable,
        "scripts/build_manual.py",
    )
    run(
        sys.executable,
        "scripts/build_portal_search_index.py",
        "--check",
    )
    run(
        sys.executable,
        "scripts/build_manual.py",
        "--check",
    )
    run(
        sys.executable,
        "scripts/check_documentation.py",
    )
    run("git", "diff", "--check")

    print()
    print("Portalen er oppdatert og kontrollert.")
    print("Kontroller diffen før commit og push.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
