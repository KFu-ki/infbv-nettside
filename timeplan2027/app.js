const DATA_URL = "/timeplanside/timeplan-2027.json";
const STORAGE_KEY = "infbv-timeplan-2027-edits";
const COURSE_FILTER_KEY = "all";
const state = {
  source: null,
  items: [],
  edits: {},
  course: COURSE_FILTER_KEY,
  search: "",
};

const element = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

function editedItem(item) {
  return { ...item, ...(state.edits[item.id] || {}) };
}

function dateValue(value) {
  const [day, month, year] = String(value || "").split(".");
  if (!day || !month || !year) return new Date(0);
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function displayDate(value) {
  const date = dateValue(value);
  if (date.getTime() === 0) return value || "Dato ikkje sett";
  return new Intl.DateTimeFormat("nn-NO", { weekday: "long", day: "numeric", month: "short", year: "numeric" }).format(date);
}

function displayCourseName(value) {
  return String(value || "").replace(/^(?:(?:INF|JOU|KOM|MEV|MMP)\d{3}\s*)+(?:[-–—:]\s*)?/i, "");
}

function setStatus(message, isError = false) {
  const status = element("#save-status");
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function saveEdits() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.edits));
    const changed = Object.values(state.edits)
      .filter((edit) => edit.description !== undefined || edit.staff !== undefined).length;
    setStatus(changed ? `${changed} rad${changed === 1 ? "" : "er"} endra lokalt` : "Les frå publisert plan");
  } catch (error) {
    setStatus(`Kunne ikkje lagre lokale endringar: ${error.message}`, true);
  }
}

function applyEdit(itemId, key, value) {
  const original = state.items.find((item) => item.id === itemId);
  if (!original) return;
  if (!state.edits[itemId]) state.edits[itemId] = {};
  if (value === original[key]) delete state.edits[itemId][key];
  else state.edits[itemId][key] = value;
  if (Object.keys(state.edits[itemId]).length === 0) delete state.edits[itemId];
  saveEdits();
}

function matchesSearch(item, query) {
  if (!query) return true;
  const text = [
    item.course, item.courseName, item.week, item.weekday, item.startDate, item.activity,
    item.description, item.room, item.otherObjects, item.staff, item.externalComment, item.internalComment,
  ].join(" ").toLocaleLowerCase("nn");
  return text.includes(query);
}

function filteredItems() {
  const query = state.search.trim().toLocaleLowerCase("nn");
  return state.items
    .map(editedItem)
    .filter((item) => state.course === COURSE_FILTER_KEY || item.course.split(" / ").includes(state.course))
    .filter((item) => matchesSearch(item, query))
    .sort((left, right) => dateValue(left.startDate) - dateValue(right.startDate)
      || String(left.startTime).localeCompare(String(right.startTime), "nn"));
}

function renderFilters() {
  const courses = [...new Set(state.items.flatMap((item) => item.course.split(" / ")))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "nn"));
  const filters = [{ value: COURSE_FILTER_KEY, label: "Alle emne" }, ...courses.map((course) => ({ value: course, label: course }))];
  element("#course-filters").innerHTML = filters.map((filter) => `
    <button class="filter-chip${state.course === filter.value ? " active" : ""}" type="button" data-course="${escapeHtml(filter.value)}" aria-pressed="${state.course === filter.value}">
      ${escapeHtml(filter.label)}
    </button>`).join("");
  element("#course-filters").querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => {
      state.course = button.dataset.course;
      renderFilters();
      renderRows();
    });
  });
}

function rowDetails(item) {
  const details = [];
  if (item.otherObjects) details.push(`<p><strong>Andre objekt:</strong> ${escapeHtml(item.otherObjects)}</p>`);
  if (item.externalComment) details.push(`<p><strong>Extern kommentar:</strong> ${escapeHtml(item.externalComment)}</p>`);
  if (item.internalComment) details.push(`<p><strong>Intern kommentar:</strong> ${escapeHtml(item.internalComment)}</p>`);
  if (item.link) details.push(`<p><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">Opne lenkje ↗</a></p>`);
  if (!details.length) return '<span class="room-text">–</span>';
  return `<details class="row-details"><summary>Vis ${details.length} detalj${details.length === 1 ? "" : "ar"}</summary>${details.join("")}</details>`;
}

function renderRows() {
  const items = filteredItems();
  element("#results-count").textContent = `Viser ${items.length} av ${state.items.length} økter`;
  if (!items.length) {
    element("#plan-rows").innerHTML = '<tr><td class="empty-row" colspan="6">Ingen økter passar til søket eller filteret.</td></tr>';
    return;
  }
  element("#plan-rows").innerHTML = items.map((item) => {
    return `<tr data-row="${escapeHtml(item.id)}">
      <td><span class="course-code">${escapeHtml(item.course)}</span><span class="course-title">${escapeHtml(displayCourseName(item.courseName))}</span></td>
      <td><span class="date-line">${escapeHtml(displayDate(item.startDate))}</span><span class="time-line">${escapeHtml(item.startTime)}–${escapeHtml(item.endTime)}</span><span class="week-tag">${escapeHtml(item.week)}</span></td>
      <td><input type="text" data-field="description" value="${escapeHtml(item.description)}" aria-label="Skildring / Innhald, ${escapeHtml(item.course)} ${escapeHtml(item.startDate)}" placeholder="Skildring / Innhald …" /></td>
      <td><span class="room-text">${escapeHtml(item.room || "–")}</span>${item.otherObjects ? `<span class="course-title">${escapeHtml(item.otherObjects)}</span>` : ""}</td>
      <td><input type="text" data-field="staff" value="${escapeHtml(item.staff)}" aria-label="Tilsett, ${escapeHtml(item.course)} ${escapeHtml(item.startDate)}" placeholder="Tilsett …" /></td>
      <td>${rowDetails(item)}</td>
    </tr>`;
  }).join("");

  element("#plan-rows").querySelectorAll("[data-field]").forEach((field) => {
    field.addEventListener("input", () => {
      applyEdit(field.closest("[data-row]").dataset.row, field.dataset.field, field.value);
    });
  });
}

function changedFields() {
  return state.items.flatMap((original) => {
    const current = editedItem(original);
    const changes = Object.entries(state.edits[original.id] || {})
      .filter(([field]) => field === "description" || field === "staff");
    return changes.map(([field, value]) => ({
      item: current,
      field,
      oldValue: original[field] || "",
      newValue: value,
    }));
  });
}

function buildProposalBody(message) {
  const changes = changedFields();
  const lines = [
    "## Endringsforslag til Timeplan 2027",
    "",
    `- Kjelde: ${state.source.sourceFile}`,
    `- Økter i planen: ${state.items.length}`,
    `- Endra rader i forslagsvisinga: ${new Set(changes.map((change) => change.item.id)).size}`,
    "",
    "## Melding",
    message.trim(),
    "",
    "## Endringar frå tabellen",
  ];
  if (!changes.length) lines.push("", "_Ingen feltendringar er gjorde; dette er eit spørsmål eller eit generelt innspel._");
  else {
    for (const change of changes) {
      lines.push(
        `- **${change.item.course} · ${change.item.startDate} ${change.item.startTime} · ${change.field}**`,
        `  - Før: ${change.oldValue || "–"}`,
        `  - Framlegg: ${change.newValue || "–"}`,
      );
    }
  }
  lines.push("", "Endringane er berre forslag. Dei skal vurderast før dei blir lagde inn i den publiserte planen.");
  return lines.join("\n");
}

async function submitProposal(event) {
  event.preventDefault();
  const message = element("#proposal-message").value;
  if (!message.trim()) return;
  const title = "Timeplan 2027 – endringsforslag";
  const body = buildProposalBody(message);
  const issueUrl = new URL("https://github.com/KFu-ki/infbv-nettside/issues/new");
  issueUrl.searchParams.set("template", "timeplan-forslag.md");
  issueUrl.searchParams.set("title", title);
  issueUrl.searchParams.set("body", body);
  const popup = window.open(issueUrl.toString(), "_blank");
  if (!popup) {
    try {
      await navigator.clipboard.writeText(body);
      setStatus("GitHub vart blokkert av nettlesaren; forslaget er kopiert. Opne GitHub-innspelet.", true);
    } catch (error) {
      setStatus(`Klarte ikkje opne GitHub: ${error.message}`, true);
    }
    return;
  }
  popup.opener = null;
  setStatus("Forslaget er klargjort i GitHub. Fullfør innsendinga der.");
}

async function downloadWorkbook() {
  const button = element("#download-workbook");
  button.disabled = true;
  setStatus("Lagar Excel-kopi …");
  try {
    const response = await fetch("/api/timeplan/export.xlsx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: state.items.map(editedItem) }),
    });
    const dateStamp = new Intl.DateTimeFormat("sv-SE").format(new Date()).replaceAll("-", "");
    const timeStamp = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(new Date()).replaceAll(":", "");
    if (!response.ok && ![404, 405, 501].includes(response.status)) {
      throw new Error(`Eksport feila (${response.status}): ${await response.text()}`);
    }
    let workbook;
    let extension;
    if (response.ok) {
      workbook = await response.blob();
      extension = "xlsx";
    } else {
      const currentItems = state.items.map(editedItem);
      const columns = [
        ["Emne", "course"], ["Emnetittel frå kjelda", "courseName"], ["Veke", "week"],
        ["Ukedag", "weekday"], ["Startdato", "startDate"], ["Starttid", "startTime"],
        ["Sluttdato", "endDate"], ["Sluttid", "endTime"], ["Type", "activity"],
        ["Skildring / Innhald", "description"], ["Rom", "room"], ["Andre objekt", "otherObjects"],
        ["Tilsett", "staff"], ["Status", "status"], ["Extern kommentar", "externalComment"],
        ["Intern kommentar", "internalComment"], ["Lenke", "link"],
      ];
      const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [
        columns.map(([label]) => escapeCsv(label)).join(";"),
        ...currentItems.map((item) => columns.map(([, key]) => escapeCsv(item[key])).join(";")),
      ].join("\r\n");
      workbook = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
      extension = "csv";
    }
    const downloadUrl = URL.createObjectURL(workbook);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Timeplan_2027_${dateStamp}_${timeStamp}.${extension}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    setStatus(extension === "xlsx"
      ? "Excel-fila er lasta ned. Flytt henne til den synka SharePoint-mappa for å lagre der."
      : "CSV-fila er lasta ned og kan opnast i Excel. Flytt henne til den synka SharePoint-mappa for å lagre der.");
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function loadPlan() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Klarte ikkje hente timeplanen (${response.status}).`);
    state.source = await response.json();
    if (!Array.isArray(state.source.items)) throw new Error("Timeplan-dataa har eit ugyldig format.");
    state.items = state.source.items;
    try {
      const savedEdits = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!savedEdits || typeof savedEdits !== "object" || Array.isArray(savedEdits)) {
        throw new Error("Lokale endringar har ugyldig format.");
      }
      state.edits = savedEdits;
    } catch (error) {
      setStatus(`Lokale endringar kunne ikkje lesast: ${error.message}`, true);
      state.edits = {};
    }
    const courses = new Set(state.items.flatMap((item) => item.course.split(" / ")));
    element("#event-count").textContent = state.items.length;
    element("#course-count").textContent = courses.size;
    element("#source-period").textContent = state.source.period;
    element("#source-file").textContent = state.source.sourceFile;
    renderFilters();
    renderRows();
    saveEdits();
  } catch (error) {
    element("#load-error").textContent = `${error.message} Last sida på nytt, eller meld frå til administratoren.`;
    element("#load-error").hidden = false;
    element("#results-count").textContent = "Timeplanen kunne ikkje lastast";
    setStatus("Feil ved lasting", true);
  }
}

element("#search-plan").addEventListener("input", (event) => {
  state.search = event.currentTarget.value;
  renderRows();
});
element("#proposal-message").addEventListener("input", (event) => {
  element("#proposal-count").textContent = `${event.currentTarget.value.length.toLocaleString("nb-NO")} / 4 000`;
});
element("#proposal-form").addEventListener("submit", submitProposal);
element("#download-workbook").addEventListener("click", downloadWorkbook);
element("#print-plan").addEventListener("click", () => window.print());
element("#bookmark-page").addEventListener("click", async () => {
  try {
    if (window.external && "AddFavorite" in window.external) {
      window.external.AddFavorite(window.location.href, document.title);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Lenkja er kopiert; lagre ho som bokmerke i nettlesaren.");
    } else {
      setStatus("Bruk nettlesaren si bokmerkefunksjon for å lagre sida.");
    }
  } catch (error) {
    setStatus(`Klarte ikkje bokmerke sida: ${error.message}`, true);
  }
});
element("#reset-edits").addEventListener("click", () => {
  if (!Object.keys(state.edits).length) return;
  if (!window.confirm("Forkaste alle endringane som berre er lagra i denne nettlesaren?")) return;
  state.edits = {};
  localStorage.removeItem(STORAGE_KEY);
  setStatus("Lokale endringar er forkasta");
  renderRows();
});

loadPlan();
