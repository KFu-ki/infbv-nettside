import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles

from xlsx_export import create_xlsx

ROOT = Path(__file__).resolve().parent
DASHBOARD = ROOT / "budsjett"
DATA_FILE = DASHBOARD / "data.json"

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
