import argparse
import importlib.util
import json
import os
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(
        description="Oppdater den offentlege datapakka frå dei lokale AMF-arbeidsbøkene."
    )
    parser.add_argument("--dashboard-server", required=True, type=Path)
    parser.add_argument("--students-workbook", required=True, type=Path)
    parser.add_argument("--amf-workbook", required=True, type=Path)
    args = parser.parse_args()
    for path in (args.dashboard_server, args.students_workbook, args.amf_workbook):
        if not path.is_file():
            parser.error(f"Fann ikkje fila: {path}")

    spec = importlib.util.spec_from_file_location("amf_source_server", args.dashboard_server)
    if spec is None or spec.loader is None:
        parser.error(f"Klarte ikkje laste datalesaren: {args.dashboard_server}")
    source = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(source)
    source.WORKBOOK = args.students_workbook
    source.NOTE_WORKBOOK = args.amf_workbook
    data = source.read_dashboard_data()

    destination = ROOT / "budsjett" / "data.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        mode="w", encoding="utf-8", dir=destination.parent, delete=False
    ) as temporary:
        json.dump(data, temporary, ensure_ascii=False, indent=2)
        temporary.write("\n")
        temporary.flush()
        os.fsync(temporary.fileno())
        temporary_path = Path(temporary.name)
    os.replace(temporary_path, destination)
    print(f"Oppdaterte offentlege dashboarddata: {destination.relative_to(ROOT)}")
    print(f"Studenttal-kjelde: {data['students']['source']} (endra {data['students']['modified']})")
    print(f"Budsjett-kjelde: {data['staffing']['source']} (endra {data['staffing']['modified']})")


if __name__ == "__main__":
    main()
