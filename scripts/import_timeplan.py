import argparse
import importlib.util
import json
import os
import re
import shutil
import sys
import tempfile
import zipfile
from datetime import datetime
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS = {"main": MAIN_NS, "rel": REL_NS}
SOURCE_COLUMNS = {
    "week": "A",
    "weekday": "B",
    "startDate": "C",
    "startTime": "D",
    "endDate": "E",
    "endTime": "F",
    "courseName": "G",
    "room": "H",
    "otherObjects": "I",
    "activity": "J",
    "externalComment": "K",
    "staff": "L",
    "internalComment": "M",
    "link": "N",
}


def column_number(reference):
    letters = re.match(r"[A-Z]+", reference)
    if not letters:
        raise ValueError(f"Ugyldig celleadresse i arbeidsboka: {reference}")
    result = 0
    for letter in letters.group():
        result = result * 26 + ord(letter) - ord("A") + 1
    return result


def read_rows(workbook_path):
    with zipfile.ZipFile(workbook_path) as workbook:
        workbook_xml = ET.fromstring(workbook.read("xl/workbook.xml"))
        relationships_xml = ET.fromstring(workbook.read("xl/_rels/workbook.xml.rels"))
        targets = {item.attrib["Id"]: item.attrib["Target"] for item in relationships_xml}
        shared_strings = []
        if "xl/sharedStrings.xml" in workbook.namelist():
            strings_xml = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
            shared_strings = [
                "".join(node.text or "" for node in item.iter(f"{{{MAIN_NS}}}t"))
                for item in strings_xml.findall("main:si", NS)
            ]

        sheet = next(
            (item for item in workbook_xml.findall("main:sheets/main:sheet", NS)
             if item.attrib.get("name") == "TimeEdit"),
            None,
        )
        if sheet is None:
            raise ValueError("Fann ikkje reknearket «TimeEdit» i kjeldearbeidsboka.")
        target = targets[sheet.attrib[f"{{{REL_NS}}}id"]].lstrip("/")
        sheet_path = target if target.startswith("xl/") else f"xl/{target}"
        sheet_xml = ET.fromstring(workbook.read(sheet_path))
        rows = []
        for row in sheet_xml.findall(".//main:sheetData/main:row", NS):
            values = {}
            for cell in row.findall("main:c", NS):
                value_node = cell.find("main:v", NS)
                value = value_node.text if value_node is not None else ""
                if cell.attrib.get("t") == "s" and value:
                    value = shared_strings[int(value)]
                elif cell.attrib.get("t") == "inlineStr":
                    inline = cell.find("main:is", NS)
                    value = (
                        "".join(node.text or "" for node in inline.iter(f"{{{MAIN_NS}}}t"))
                        if inline is not None
                        else ""
                    )
                values[column_number(cell.attrib["r"])] = value
            if values:
                rows.append((int(row.attrib["r"]), values))
        return rows


def field(values, column):
    number = column_number(column + "1")
    return str(values.get(number, "") or "").strip()


def build_items(rows):
    headers = next((values for row_number, values in rows if row_number == 6), None)
    if headers is None:
        raise ValueError("Fann ikkje kolonneoverskriftene på rad 6.")
    expected = {"Uke", "Ukedag", "Startdato", "Starttidspunkt", "Sluttdato",
                "Sluttidspunkt", "Emne", "Rom", "Andre objekter", "Aktivitet",
                "Extern kommentar", "Faglærer", "Intern kommentar", "Lenke"}
    actual = {str(value).strip() for value in headers.values()}
    if not expected.issubset(actual):
        raise ValueError("Kjeldearbeidsboka manglar eitt eller fleire venta TimeEdit-felt.")

    items = []
    for row_number, values in rows:
        if row_number <= 6 or not field(values, SOURCE_COLUMNS["courseName"]):
            continue
        course_name = field(values, SOURCE_COLUMNS["courseName"])
        course_codes = re.findall(r"\b(?:INF|JOU|KOM|MEV|MMP)\d{3}\b", course_name)
        activity = field(values, SOURCE_COLUMNS["activity"])
        external_comment = field(values, SOURCE_COLUMNS["externalComment"])
        description = " · ".join(value for value in (external_comment, activity) if value)
        items.append({
            "id": f"r{row_number}",
            "sourceRow": row_number,
            "course": " / ".join(dict.fromkeys(course_codes)) or course_name,
            "courseName": course_name,
            "week": field(values, SOURCE_COLUMNS["week"]),
            "weekday": field(values, SOURCE_COLUMNS["weekday"]),
            "startDate": field(values, SOURCE_COLUMNS["startDate"]),
            "startTime": field(values, SOURCE_COLUMNS["startTime"]),
            "endDate": field(values, SOURCE_COLUMNS["endDate"]),
            "endTime": field(values, SOURCE_COLUMNS["endTime"]),
            "activity": activity,
            "description": description,
            "room": field(values, SOURCE_COLUMNS["room"]),
            "otherObjects": field(values, SOURCE_COLUMNS["otherObjects"]),
            "staff": field(values, SOURCE_COLUMNS["staff"]),
            "status": "Forslag",
            "externalComment": external_comment,
            "internalComment": field(values, SOURCE_COLUMNS["internalComment"]),
            "link": field(values, SOURCE_COLUMNS["link"]),
        })
    if not items:
        raise ValueError("Kjeldearbeidsboka inneheld ingen timeplanrader.")
    return items


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode="wb", dir=path.parent, delete=False) as temporary:
        temporary.write(content)
        temporary.flush()
        os.fsync(temporary.fileno())
        temporary_path = Path(temporary.name)
    os.replace(temporary_path, path)


def main():
    parser = argparse.ArgumentParser(description="Bygg Timeplan 2027-data og Excel-kopi.")
    parser.add_argument("--source", required=True, type=Path, help="TimeEdit .xlsx kjelde")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "timeplanside")
    parser.add_argument("--sharepoint-folder", type=Path, help="Lokal OneDrive-synka plan27/timeplanside-mappe")
    args = parser.parse_args()
    if not args.source.is_file():
        parser.error(f"Fann ikkje kjeldearbeidsboka: {args.source}")

    rows = read_rows(args.source)
    items = build_items(rows)
    source_metadata = {
        "sourceFile": args.source.name,
        "sourcePathHint": "2027/plan27",
        "sheet": "TimeEdit",
        "createdAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "period": "4. januar – 4. juni 2027",
        "items": items,
    }
    data_path = args.output_dir / "timeplan-2027.json"
    if data_path.exists():
        with data_path.open(encoding="utf-8") as existing_file:
            existing_data = json.load(existing_file)
        if not isinstance(existing_data, dict) or not isinstance(existing_data.get("items"), list):
            raise ValueError(f"Ugyldig eksisterande timeplandata: {data_path}")
        source_items = {item["id"] for item in items}
        supplemental_items = [
            item for item in existing_data["items"]
            if isinstance(item, dict)
            and item.get("supplemental") is True
            and item.get("id") not in source_items
        ]
        source_metadata["items"].extend(supplemental_items)
        if supplemental_items and existing_data.get("supplementalSource"):
            source_metadata["supplementalSource"] = existing_data["supplementalSource"]

    spec = importlib.util.spec_from_file_location("portal_xlsx_export", ROOT / "xlsx_export.py")
    if spec is None or spec.loader is None:
        parser.error("Klarte ikkje laste Excel-eksportfunksjonen.")
    exporter = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = exporter
    spec.loader.exec_module(exporter)
    workbook_bytes = exporter.create_timetable_xlsx(source_metadata)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    workbook_name = f"Timeplan_2027_{timestamp}.xlsx"
    data_bytes = (json.dumps(source_metadata, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    atomic_write(data_path, data_bytes)
    atomic_write(args.output_dir / workbook_name, workbook_bytes)
    if args.sharepoint_folder:
        args.sharepoint_folder.mkdir(parents=True, exist_ok=True)
        shutil.copy2(args.source, args.sharepoint_folder / args.source.name)
        atomic_write(args.sharepoint_folder / workbook_name, workbook_bytes)
    print(f"Importerte {len(items)} timeplanrader frå {args.source.name}.")
    print(f"Data: {args.output_dir / 'timeplan-2027.json'}")
    print(f"Excel: {args.output_dir / workbook_name}")
    if args.sharepoint_folder:
        print(f"Excel-kopi lagra i OneDrive-synka mappe: {args.sharepoint_folder / workbook_name}")


if __name__ == "__main__":
    main()
