#!/usr/bin/env python3

from datetime import date
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]

MONTHS = (
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
)


def git_paths(*arguments):
    result = subprocess.run(
        ["git", "-C", str(ROOT), *arguments],
        check=True,
        capture_output=True,
        text=True,
    )
    return {
        Path(line.strip())
        for line in result.stdout.splitlines()
        if line.strip()
    }


def changed_html_files():
    paths = set()
    paths.update(git_paths("diff", "--name-only", "--diff-filter=ACMR"))
    paths.update(
        git_paths(
            "diff",
            "--cached",
            "--name-only",
            "--diff-filter=ACMR",
        )
    )
    paths.update(git_paths("ls-files", "--others", "--exclude-standard"))

    return sorted(
        path
        for path in paths
        if path.suffix.lower() == ".html"
        and path.parts
        and path.parts[0] == "mmp311"
        and (ROOT / path).is_file()
    )


def suffix(day):
    if 10 <= day % 100 <= 20:
        return "th"
    return {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")


def update_page(path, today):
    absolute = ROOT / path
    text = absolute.read_text(encoding="utf-8")
    original = text

    month = MONTHS[today.month]
    plain = f"{today.day}{suffix(today.day)} of {month}, {today.year}"
    html = (
        f"{today.day}<sup>{suffix(today.day)}</sup> "
        f"of {month}, {today.year}"
    )
    simple = f"{today.day} {month} {today.year}"

    text = re.sub(
        r"Revised \d{1,2}(?:st|nd|rd|th) "
        r"of [A-Z][a-z]+, \d{4}",
        f"Revised {plain}",
        text,
    )

    text = re.sub(
        r"Volda University College, "
        r"\d{1,2}<sup>(?:st|nd|rd|th)</sup> "
        r"of [A-Z][a-z]+, \d{4}\.",
        f"Volda University College, {html}.",
        text,
    )

    text = re.sub(
        r"Last revised \d{1,2} [A-Z][a-z]+ \d{4}\.",
        f"Last revised {simple}.",
        text,
    )

    if text != original:
        absolute.write_text(text, encoding="utf-8")
        return True

    return False


def main():
    pages = changed_html_files()

    if not pages:
        print("Ingen endra MMP311 HTML-sider.")
        return 0

    today = date.today()
    updated = [
        path
        for path in pages
        if update_page(path, today)
    ]

    if updated:
        print("Oppdaterte revisjonsdato:")
        for path in updated:
            print(path)
    else:
        print("Ingen daterte metadatafelt trong oppdatering.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
