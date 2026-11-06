import io
import zipfile


def _xml_text(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&apos;")
    )


def _column_name(number):
    name = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        name = chr(65 + remainder) + name
    return name


def _sheet_xml(rows, widths):
    row_xml = []
    for row_index, row in enumerate(rows, start=1):
        cells = []
        for column_index, value in enumerate(row, start=1):
            address = f"{_column_name(column_index)}{row_index}"
            if value is None:
                continue
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                cells.append(f'<c r="{address}"><v>{value}</v></c>')
            else:
                cells.append(f'<c r="{address}" t="inlineStr"><is><t>{_xml_text(value)}</t></is></c>')
        row_xml.append(f'<row r="{row_index}">{"".join(cells)}</row>')
    column_count = max((len(row) for row in rows), default=0)
    widths = widths + [18] * max(0, column_count - len(widths))
    cols_xml = "".join(
        f'<col min="{index}" max="{index}" width="{width}" customWidth="1"/>'
        for index, width in enumerate(widths, start=1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<cols>{cols_xml}</cols><sheetData>{"".join(row_xml)}</sheetData></worksheet>'
    )


def create_xlsx(payload):
    sheets = [
        ("Oversikt", payload.get("overview", []), [37, 24]),
        ("Programdata", payload.get("details", []), [12, 38, 15, 17, 18, 19, 19, 21, 21, 19, 15]),
        ("Tilsette", payload.get("staffing", []), [32, 24, 58]),
        ("Loyvingsmodell", payload.get("budget", []), [43, 22, 18, 18, 18, 18, 18, 18, 18, 18]),
    ]
    output = io.BytesIO()
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
        content_sheets = "".join(
            f'<Override PartName="/xl/worksheets/sheet{index}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
            for index in range(1, len(sheets) + 1)
        )
        archive.writestr(
            "[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            f"{content_sheets}</Types>",
        )
        archive.writestr(
            "_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            "</Relationships>",
        )
        workbook_sheets = "".join(
            f'<sheet name="{name}" sheetId="{index}" r:id="rId{index}"/>'
            for index, (name, _, _) in enumerate(sheets, start=1)
        )
        archive.writestr(
            "xl/workbook.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            f"<sheets>{workbook_sheets}</sheets></workbook>",
        )
        sheet_relationships = "".join(
            f'<Relationship Id="rId{index}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{index}.xml"/>'
            for index in range(1, len(sheets) + 1)
        )
        archive.writestr(
            "xl/_rels/workbook.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f"{sheet_relationships}</Relationships>",
        )
        for index, (_, rows, widths) in enumerate(sheets, start=1):
            archive.writestr(f"xl/worksheets/sheet{index}.xml", _sheet_xml(rows, widths))
    return output.getvalue()
