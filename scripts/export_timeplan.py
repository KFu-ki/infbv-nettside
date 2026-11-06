import argparse
import importlib.util
import json
import os
import shutil
import sys
import tempfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="wb", dir=path.parent, delete=False) as temporary:
        temporary.write(content)
        temporary.flush()
        os.fsync(temporary.fileno())
        temporary_path = Path(temporary.name)
    os.replace(temporary_path, path)


def main():
    parser = argparse.ArgumentParser(description="Eksporter godkjend Timeplan 2027 som tidsstempla Excel.")
    parser.add_argument("--data", type=Path, default=ROOT / "timeplanside" / "timeplan-2027.json")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "timeplanside")
    parser.add_argument("--sharepoint-folder", type=Path, help="Lokal OneDrive-synka plan27/timeplanside-mappe")
    args = parser.parse_args()
    if not args.data.is_file():
        parser.error(f"Fann ikkje timeplandata: {args.data}")
    try:
        data = json.loads(args.data.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        parser.error(f"Ugyldig JSON i {args.data}: {error}")
    if not isinstance(data, dict) or not isinstance(data.get("items"), list):
        parser.error("JSON-fila må innehalde ei liste i feltet «items».")

    spec = importlib.util.spec_from_file_location("portal_xlsx_export", ROOT / "xlsx_export.py")
    if spec is None or spec.loader is None:
        parser.error("Klarte ikkje laste Excel-eksportfunksjonen.")
    exporter = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = exporter
    spec.loader.exec_module(exporter)
    workbook_bytes = exporter.create_timetable_xlsx(data)
    workbook_name = f"Timeplan_2027_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
    output = args.output_dir / workbook_name
    atomic_write(output, workbook_bytes)
    if args.sharepoint_folder:
        args.sharepoint_folder.mkdir(parents=True, exist_ok=True)
        shutil.copy2(output, args.sharepoint_folder / workbook_name)
    print(f"Excel-versjon lagra: {output}")
    if args.sharepoint_folder:
        print(f"Excel-versjon kopiert til OneDrive-synka mappe: {args.sharepoint_folder / workbook_name}")


if __name__ == "__main__":
    main()
