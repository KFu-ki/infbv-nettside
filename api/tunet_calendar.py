import json
import os
import re
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler
from urllib.request import Request, urlopen


def field(block, name):
    match = re.search(r"^" + name + r"(?:;[^:]*)?:(.*)$", block, re.MULTILINE)
    if not match:
        return ""
    return (
        match.group(1)
        .replace(r"\,", ",")
        .replace(r"\n", " · ")
        .strip()
    )


def parse_datetime(value):
    value = value.strip().rstrip("Z")
    for pattern in ("%Y%m%dT%H%M%S", "%Y%m%dT%H%M", "%Y%m%d"):
        try:
            return datetime.strptime(value, pattern)
        except ValueError:
            pass
    return None


def payload():
    source_url = os.environ.get("TIMEEDIT_ICS_URL", "").strip()
    if not source_url.startswith("https://cloud.timeedit.net/"):
        raise RuntimeError("TimeEdit-kjelda er ikkje konfigurert.")

    request = Request(source_url, headers={"User-Agent": "INFBV-Tunet/1.0"})
    raw = urlopen(request, timeout=15).read().decode("utf-8", "replace")
    text = re.sub(r"\r?\n[ \t]", "", raw)

    now = datetime.now()
    events = []

    for block in re.findall(r"BEGIN:VEVENT(.*?)END:VEVENT", text, re.DOTALL):
        start = parse_datetime(field(block, "DTSTART"))
        end = parse_datetime(field(block, "DTEND")) or start

        if not start or start > now + timedelta(days=45):
            continue
        if end < now - timedelta(hours=1):
            continue

        summary = field(block, "SUMMARY")
        description = field(block, "DESCRIPTION")
        location = field(block, "LOCATION")
        combined = summary + " " + description

        match = re.search(r"\b(?:INF|MMP|MEV|KOM|JOU|SAJ)\d{3}\b", combined)
        course = match.group(0) if match else "Avtale"

        events.append({
            "start": start.isoformat(),
            "time": start.strftime("%H.%M"),
            "course": course,
            "title": course,
            "room": location[:80],
            "mine": True,
            "state": "now" if start <= now <= end else "future",
            "inDays": (start.date() - now.date()).days,
        })

    events.sort(key=lambda event: event["start"])

    days = []
    weekdays = ("må", "ty", "on", "to", "fr", "la", "sø")

    for offset in range(7):
        current = (now + timedelta(days=offset)).date()
        daily = [
            event for event in events
            if datetime.fromisoformat(event["start"]).date() == current
        ]
        days.append({
            "weekday": weekdays[current.weekday()],
            "day": current.day,
            "count": len(daily),
            "load": min(1, len(daily) / 4),
            "today": offset == 0,
        })

    return {
        "updatedLabel": now.strftime("%H.%M"),
        "mine": events[:8],
        "general": events[:8],
        "days": days,
    }


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            result = payload()
            body = json.dumps(result, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
        except Exception:
            body = json.dumps(
                {"detail": "Kalenderen er mellombels utilgjengeleg."},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(503)

        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
