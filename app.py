import json
import os
import re
from datetime import datetime, timedelta
from pathlib import Path
from urllib.request import Request, urlopen

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles

from xlsx_export import create_timetable_xlsx, create_xlsx

ROOT = Path(__file__).resolve().parent
DASHBOARD = ROOT / "budsjett"
DATA_FILE = DASHBOARD / "data.json"
TIMETABLE_FILE = ROOT / "timeplanside" / "timeplan-2027.json"

app = FastAPI(title="INFBV fagportal")


@app.get("/api/data")
def dashboard_data():
    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=500, detail="Kunne ikkje lese det publiserte datagrunnlaget.") from error
    return Response(
        content=json.dumps(data, ensure_ascii=False),
        media_type="application/json",
        headers={"Cache-Control": "no-store"},
    )


@app.post("/api/export.xlsx")
def export_dashboard(payload: dict):
    try:
        workbook = create_xlsx(payload)
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(status_code=400, detail="Ugyldige data for Excel-eksport.") from error
    return Response(
        content=workbook,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="amf-budsjett-rapport.xlsx"'},
    )


@app.get("/api/timeplan")
def timetable_data():
    try:
        data = json.loads(TIMETABLE_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=500, detail="Kunne ikkje lese Timeplan 2027-data.") from error
    return Response(
        content=json.dumps(data, ensure_ascii=False),
        media_type="application/json",
        headers={"Cache-Control": "no-store"},
    )


def _ical_field(block: str, name: str) -> str:
    match = re.search(r"^" + name + r"(?:;[^:]*)?:(.*)$", block, re.MULTILINE)
    if not match:
        return ""
    return (
        match.group(1)
        .replace(r"\,", ",")
        .replace(r"\n", " · ")
        .strip()
    )


def _ical_datetime(value: str):
    value = value.strip().rstrip("Z")
    for pattern in ("%Y%m%dT%H%M%S", "%Y%m%dT%H%M", "%Y%m%d"):
        try:
            return datetime.strptime(value, pattern)
        except ValueError:
            pass
    return None


@app.get("/api/tunet-calendar")
def tunet_calendar():
    source_url = os.environ.get("TIMEEDIT_ICS_URL", "").strip()
    if not source_url.startswith("https://cloud.timeedit.net/"):
        raise HTTPException(status_code=503, detail="TimeEdit-kjelda er ikkje konfigurert.")

    try:
        request = Request(source_url, headers={"User-Agent": "INFBV-Tunet/1.0"})
        raw = urlopen(request, timeout=15).read().decode("utf-8", "replace")
    except Exception as error:
        raise HTTPException(status_code=502, detail="Kunne ikkje hente TimeEdit-kalenderen.") from error

    unfolded = re.sub(r"\r?\n[ \t]", "", raw)
    now = datetime.now()
    events = []

    for block in re.findall(r"BEGIN:VEVENT(.*?)END:VEVENT", unfolded, re.DOTALL):
        start = _ical_datetime(_ical_field(block, "DTSTART"))
        end = _ical_datetime(_ical_field(block, "DTEND")) or start

        if not start or start > now + timedelta(days=45) or end < now - timedelta(hours=1):
            continue

        summary = _ical_field(block, "SUMMARY")
        description = _ical_field(block, "DESCRIPTION")
        location = _ical_field(block, "LOCATION")
        combined = f"{summary} {description}"

        course_match = re.search(r"\b(?:INF|MMP|MEV|KOM|JOU|SAJ)\d{3}\b", combined)
        course = course_match.group(0) if course_match else "Avtale"
        state = "now" if start <= now <= end else "future"

        events.append(
            {
                "start": start.isoformat(),
                "time": start.strftime("%H.%M"),
                "course": course,
                "title": course,
                "room": location[:80],
                "mine": True,
                "state": state,
                "inDays": (start.date() - now.date()).days,
            }
        )

    events.sort(key=lambda event: event["start"])
    days = []

    for offset in range(7):
        current = (now + timedelta(days=offset)).date()
        daily = [
            event for event in events
            if datetime.fromisoformat(event["start"]).date() == current
        ]
        days.append(
            {
                "weekday": ("må", "ty", "on", "to", "fr", "la", "sø")[current.weekday()],
                "day": current.day,
                "count": len(daily),
                "load": min(1, len(daily) / 4),
                "today": offset == 0,
            }
        )

    payload = {
        "updatedLabel": now.strftime("%H.%M"),
        "mine": events[:8],
        "general": events[:8],
        "days": days,
    }
    return Response(
        content=json.dumps(payload, ensure_ascii=False),
        media_type="application/json",
        headers={"Cache-Control": "no-store"},
    )


@app.post("/api/timeplan/export.xlsx")
def export_timetable(payload: dict):
    try:
        workbook = create_timetable_xlsx(payload)
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(status_code=400, detail="Ugyldige data for timeplaneksport.") from error
    return Response(
        content=workbook,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="Timeplan_2027.xlsx"'},
    )


@app.get("/")
def home():
    return FileResponse(ROOT / "index.html")


@app.get("/app.js")
def main_script():
    return FileResponse(ROOT / "app.js", media_type="text/javascript")


@app.get("/styles.css")
def main_styles():
    return FileResponse(ROOT / "styles.css", media_type="text/css")


@app.get("/version.txt")
def version():
    return FileResponse(ROOT / "version.txt", media_type="text/plain")


app.mount("/budsjett", StaticFiles(directory=DASHBOARD, html=True), name="budsjett")
app.mount("/timeplan2027", StaticFiles(directory=ROOT / "timeplan2027", html=True), name="timeplan2027")
app.mount("/mmp311", StaticFiles(directory=ROOT / "mmp311", html=True), name="mmp311")
