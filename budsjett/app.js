const programDefinitions = [
  { code: "PR", color: "#3d9b78" },
  { code: "JOU", color: "#477da8" },
  { code: "MPRO", color: "#705fd0" },
  { code: "ANI", color: "#c69034" },
  { code: "MMP", color: "#bd6878" },
];

const numberFormat = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fteFormat = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 1 });
const state = {
  programs: [],
  studentsByYear: {},
  workbookName: "",
  staffing: null,
  proposal: null,
  proposalReference: null,
  proposalEditMode: false,
  flow: 16.5,
  administration: 5,
  flowPercent: 0,
  administrationPercent: 0,
  bubbleSvg: "",
  scenario: "current",
};

const el = (selector) => document.querySelector(selector);
const fmt = (value) => numberFormat.format(Math.round(value));
const fmtOne = (value) => oneDecimal.format(value);
const fmtFte = (value) => fteFormat.format(value);
const fmtKr = (valueInThousands) => `${fmt(valueInThousands * 1000)} kr`;
const fmtPercent = (value) => `${value > 0 ? "+" : ""}${oneDecimal.format(value)} %`;
const fmtStaffDelta = (value) => Math.abs(value) < 0.05 ? "0" : `${value > 0 ? "+" : ""}${fmtFte(value)}`;
const esc = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

function programCalculations() {
  const alternativeStaff = state.scenario === "current" ? null : scenarioStaffAllocations();
  const flowBack = alternativeStaff ? 0 : state.flow * state.flowPercent / 100;
  const adminBack = alternativeStaff ? 0 : state.administration * state.administrationPercent / 100;
  const sharedBack = flowBack + adminBack;
  const baseStaff = state.programs.reduce((sum, program) => sum + program.staff, 0);
  const assignedStaff = state.programs.map((program) => ({
    ...program,
    staffEffective: alternativeStaff
      ? alternativeStaff[program.code]
      : program.staff + sharedBack * (baseStaff ? program.staff / baseStaff : 0),
  }));
  const effectiveStaff = assignedStaff.reduce((sum, program) => sum + program.staffEffective, 0);
  const totalStudents = assignedStaff.reduce((sum, program) => sum + program.students, 0);
  const totalBudget = assignedStaff.reduce((sum, program) => sum + program.budget, 0);
  const totalCredits = assignedStaff.reduce((sum, program) => sum + program.credits, 0);
  const avgCredits = totalCredits / (effectiveStaff || 1);
  const averageStudentsPerStaff = totalStudents / (effectiveStaff || 1);
  const averageBudgetPerStudent =
    assignedStaff.reduce((sum, program) => sum + program.budget / (program.students || 1), 0) /
    (assignedStaff.length || 1);
  return assignedStaff.map((program) => ({
    ...program,
    creditsPerStaff: program.credits / (program.staffEffective || 1),
    studentsPerStaff: program.students / (program.staffEffective || 1),
    budgetPerStaff: program.budget / (program.staffEffective || 1),
    budgetPerStudent: program.budget / (program.students || 1),
    idealStaff: program.credits / (avgCredits || 1),
    deviation: program.credits / (avgCredits || 1) - program.staffEffective,
    aboveAverageStudents: program.students / (program.staffEffective || 1) > averageStudentsPerStaff * 1.05,
  })).map((program) => Object.assign(program, {
    totalStudents,
    totalBudget,
    totalCredits,
    averageCreditsPerStaff: avgCredits,
    averageStudentsPerStaff,
    averageBudgetPerStudent,
    sharedBack,
  }));
}

function scenarioStaffAllocations() {
  const productionPool = alternativeCapacity().programPool;
  const totalCredits = state.programs.reduce((sum, program) => sum + program.credits, 0) || 1;
  const totalStudents = state.programs.reduce((sum, program) => sum + program.students, 0) || 1;
  const weights = state.programs.map((program) => {
    const productionShare = program.credits / totalCredits;
    const studentShare = program.students / totalStudents;
    if (state.scenario === "a") return productionShare;
    if (state.scenario === "b") return studentShare;
    return (productionShare + studentShare) / 2;
  });
  return Object.fromEntries(state.programs.map((program, index) => [
    program.code,
    productionPool * weights[index],
  ]));
}

function alternativeCapacity() {
  const total = Math.max(0, state.staffing.total);
  const nonProduction = Math.min(4.5, total);
  const shared = Math.min(4, nonProduction);
  return {
    total,
    programPool: total - nonProduction,
    shared,
    otherNonProduction: nonProduction - shared,
    nonProduction,
  };
}

let analysisTableCreated = false;
function renderAnalysisTable(programs) {
  if (!analysisTableCreated) {
    el("#analysis-table").innerHTML = programs.map((program) => `
      <tr>
        <td><span class="program-code" style="--program-color:${program.color}">${esc(program.code)}</span><span class="program-name">${esc(program.name)}</span></td>
        <td><input class="editable-input" type="number" min="0" step="1" value="${program.students}" data-code="${program.code}" data-key="students" aria-label="Studentar, ${esc(program.code)}" /></td>
        <td><input class="editable-input" type="number" min="0" step="0.5" value="${program.staff}" data-code="${program.code}" data-key="staff" aria-label="Tilsette, ${esc(program.code)}" /></td>
        <td><input class="editable-input wide-input" type="number" min="0" step="1000" value="${program.credits * 1000}" data-code="${program.code}" data-key="credits" aria-label="Studiepoeng-komponent i kroner, ${esc(program.code)}" /></td>
        <td><input class="editable-input wide-input" type="number" min="0" step="1000" value="${program.budget * 1000}" data-code="${program.code}" data-key="budget" aria-label="Budsjett i kroner, ${esc(program.code)}" /></td>
        <td class="calculated-cell"></td><td class="calculated-cell"></td><td class="calculated-cell"></td><td class="calculated-cell"></td>
      </tr>`).join("");
    analysisTableCreated = true;
    document.querySelectorAll(".editable-input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const field = event.currentTarget;
        const inputValue = field.valueAsNumber;
        const value = ["credits", "budget"].includes(field.dataset.key) ? inputValue / 1000 : inputValue;
        if (!Number.isFinite(value) || value < 0) return;
        const program = state.programs.find((item) => item.code === field.dataset.code);
        if (!program) return;
        program[field.dataset.key] = value;
        if (field.dataset.key === "staff") {
          state.staffing.programStaff = state.programs.reduce((sum, item) => sum + item.staff, 0);
          state.staffing.total = state.staffing.programStaff + state.flow + state.administration;
        }
        renderDashboard();
      });
    });
  }
  programs.forEach((program, index) => {
    const tableRow = el("#analysis-table").rows[index];
    tableRow.querySelectorAll(".editable-input").forEach((input) => {
      const currentValue = program[input.dataset.key];
      input.value = ["credits", "budget"].includes(input.dataset.key)
        ? String(currentValue * 1000)
        : String(currentValue);
    });
    const staffInput = tableRow.querySelector('[data-key="staff"]');
    staffInput.value = String(program.staffEffective);
    staffInput.disabled = state.scenario !== "current";
    const cells = tableRow.querySelectorAll(".calculated-cell");
    cells[0].textContent = fmtOne(program.studentsPerStaff);
    cells[1].textContent = fmtKr(program.creditsPerStaff);
    cells[2].textContent = fmtKr(program.budgetPerStaff);
    cells[3].textContent = fmtKr(program.budgetPerStudent);
  });
  const totalProgramStaff = programs.reduce((sum, item) => sum + item.staffEffective, 0);
  el("#analysis-total").innerHTML = `<tr><th>SUM PROGRAM</th><th>${fmt(programs[0].totalStudents)}</th><th>${fmtFte(totalProgramStaff)}</th><th>${fmtKr(programs[0].totalCredits)}</th><th>${fmtKr(programs[0].totalBudget)}</th><th>${fmtOne(programs[0].totalStudents / totalProgramStaff)}</th><th>${fmtKr(programs[0].totalCredits / totalProgramStaff)}</th><th>${fmtKr(programs[0].totalBudget / totalProgramStaff)}</th><th>${fmtKr(programs[0].totalBudget / programs[0].totalStudents)}</th></tr>`;
}

function renderKpis(programs) {
  const first = programs[0];
  el("#kpi-students").textContent = fmt(first.totalStudents);
  el("#kpi-budget").textContent = fmtKr(first.totalBudget + state.staffing.administrationBudget);
  el("#budget-source").textContent = `Program: ${fmtKr(first.totalBudget)} · utan stipend`;
  el("#kpi-credits").textContent = fmtKr(first.totalCredits);
  el("#kpi-staff").textContent = fmtFte(state.staffing.total);
  el("#student-source").textContent = "DBH · 2026";
  el("#note-workbook-label").textContent = state.staffing.source;
  el("#staff-total").textContent = fmtFte(state.staffing.total);
  const alternativeStaff = state.scenario !== "current";
  const programStaffTotal = programs.reduce((sum, program) => sum + program.staffEffective, 0);
  el("#program-staff").textContent = `${fmtFte(programStaffTotal)} årsverk`;
  el("#flow-staff").textContent = `${fmtFte(alternativeStaff ? 0 : state.staffing.flow)} årsverk`;
  const capacity = alternativeStaff ? alternativeCapacity() : null;
  el("#admin-staff").textContent = `${fmtFte(capacity ? capacity.shared : state.staffing.administration)} årsverk`;
  el("#unassigned-group").hidden = !alternativeStaff;
  el("#unassigned-staff").textContent = `${fmtFte(capacity?.otherNonProduction ?? 0)} årsverk`;
  el("#program-staff-label").textContent = alternativeStaff ? "Scenariofordeling på fem program" : "Tilknytte stillingar, fordelt på fem program";
  el("#flow-staff-label").textContent = alternativeStaff ? "Fordelt inn i programårsverka" : "Instituttstillingar som bidreg på tvers";
  el("#flow-staff-callout").textContent = alternativeStaff ? "Flyt er fordelt mellom programma i alternativet." : "Arbeidsinnsatsen er ikkje fordelt eintydig på studieprogramma.";
  el("#admin-staff-callout").textContent = alternativeStaff ? "Maksgrensa på 4 årsverk er brukt i alternativet." : "Eiga budsjetteining; inga eiga studieprograminntekt.";
  el("#program-staff-chips").innerHTML = programs.map((program) =>
    `<span><i style="background:${program.color}"></i>${esc(program.code)} ${fmtFte(program.staffEffective)}</span>`,
  ).join("");
  el("#reconciliation").innerHTML =
    `Studenttal for dei fem programma: <strong>${fmt(first.totalStudents)}</strong> · DBH 2026.`;
}

function renderAlternativePanel(programs) {
  const alternative = state.scenario !== "current";
  el("#alternative-panel").hidden = !alternative;
  el("#fordeling").hidden = alternative;
  document.querySelectorAll(".scenario-link").forEach((link) => {
    const selected = link.dataset.scenario === state.scenario;
    link.classList.toggle("active", selected);
    link.setAttribute("aria-pressed", String(selected));
  });
  if (!alternative) return;

  const names = {
    a: {
      title: "Alternativt budsjett A · jamn studiepoengskomponent per årsverk",
      description: "Fordeler årsverk etter kvart program sin del av studiepoengskomponenten for 2027.",
      assumption: "Modell A: alle programma får årsverk i same forhold som studiepoengskomponenten i arbeidsnotatet for 2027.",
    },
    b: {
      title: "Alternativt budsjett B · jamn studentbelastning per årsverk",
      description: "Fordeler årsverk etter studenttala frå DBH for 2026.",
      assumption: "Modell B: alle programma får årsverk i same forhold som DBH-studenttala for 2026.",
    },
    c: {
      title: "Alternativt budsjett C · balansert produksjon og studenttal",
      description: "Vektar studiepoengskomponent og studenttal likt, 50/50, før årsverka blir fordelte.",
      assumption: "Modell C: halvparten av fordelingsvekta kjem frå studiepoengskomponenten for 2027 og halvparten frå DBH-studenttala for 2026.",
    },
  }[state.scenario];
  const assignedStaff = programs.reduce((sum, program) => sum + program.staffEffective, 0);
  const capacity = alternativeCapacity();
  el("#alternative-total").textContent = fmtFte(state.staffing.total);
  el("#alternative-title").textContent = names.title;
  el("#alternative-description").textContent = names.description;
  el("#alternative-stats").innerHTML = [
    ["Til årsverk på program", `${fmtFte(assignedStaff)} årsverk`],
    ["Felles AMF", `${fmtFte(capacity.shared)} årsverk`],
    ["Utan direkte studiepoengsproduksjon", `${fmtFte(capacity.nonProduction)} årsverk*`],
    ["Endra budsjett", "0 kr"],
  ].map(([label, value]) => `<article class="alternative-stat"><span>${label}</span><strong>${value}</strong></article>`).join("");
  el("#alternative-assumption").innerHTML = `${esc(names.assumption)} <strong>I denne modellen er 4 årsverk lagde til Felles AMF.</strong> *${fmtFte(capacity.nonProduction)} årsverk utan direkte studiepoengsproduksjon er eit førebels anslag frå brukaren, ikkje ei oppteljing i arbeidsboka. Av desse er ${fmtFte(capacity.shared)} årsverk lagde til Felles AMF; resten er ikkje plasserte nærare i kjelda. Tabellen viser program; koplinga PR→IFK og JOU→IFJ er utleidd frå budsjettbeløpa og må stadfestast før bruk som instituttfordeling.`;

  const proposal = state.proposal;
  const basis = proposal.studyBasis;
  const unitIndex = { JOU: 0, PR: 1, ANI: 2, MPRO: 3, MMP: 4 };
  const productionIndex = Object.fromEntries(basis.programs.map((code, index) => [code, index]));
  const currentProgramStaff = state.programs.reduce((sum, program) => sum + program.staff, 0) || 1;
  const productionPool = capacity.programPool;
  el("#alternative-head").innerHTML = `<tr><th>Program</th><th>Budsjettnivå*</th><th>Studentar 2026<br><small>Δ frå 2025</small></th><th>Produksjonsgrunnlag 2024<br><small>basis 2026</small></th><th>Produksjonsgrunnlag 2025<br><small>basis 2027 · Δ</small></th><th>Tilsette knytte til program<br><small>i dag</small></th><th>Referanse<br><small>dagens programandel + Flyt</small></th><th>Alternativ<br><small>årsverk</small></th><th>Endring<br><small>mot referansen</small></th><th>Budsjett 2026<br><small>kr</small></th><th>Budsjett 2027<br><small>kr · Δ</small></th></tr>`;
  el("#alternative-body").innerHTML = programs.map((program) => {
    const previousStudents = state.studentsByYear[2025]?.[program.code] ?? 0;
    const currentStudents = program.students;
    const studentChange = previousStudents ? (currentStudents / previousStudents - 1) * 100 : 0;
    const index = productionIndex[program.code];
    const production2026 = basis.credits2024[index];
    const production2027 = basis.credits2025[index];
    const productionChange = production2026 ? (production2027 / production2026 - 1) * 100 : 0;
    const budget2026 = proposal.previous.values[unitIndex[program.code]];
    const budgetChange = budget2026 ? (program.budget / budget2026 - 1) * 100 : 0;
    const referenceStaff = productionPool * program.staff / currentProgramStaff;
    const staffChange = program.staffEffective - referenceStaff;
    const unit = { PR: "IFK", JOU: "IFJ", ANI: "ANI", MPRO: "MPRO", MMP: "MMP" }[program.code];
    return `<tr><th><span class="program-code" style="--program-color:${program.color}">${esc(program.code)}</span></th><td>${unit}</td><td>${fmt(currentStudents)}<small>${fmtPercent(studentChange)}</small></td><td>${fmtOne(production2026)}</td><td>${fmtOne(production2027)}<small>${fmtPercent(productionChange)}</small></td><td>${fmtFte(program.staff)}</td><td>${fmtFte(referenceStaff)}</td><td><strong>${fmtFte(program.staffEffective)}</strong></td><td class="${staffChange > 0.05 ? "positive-change" : staffChange < -0.05 ? "negative-change" : ""}">${fmtStaffDelta(staffChange)}</td><td>${fmtKr(budget2026)}</td><td>${fmtKr(program.budget)}<small>${fmtPercent(budgetChange)}</small></td></tr>`;
  }).join("");
}

function renderProposal(proposal) {
  const finalSum = proposal.final.values.reduce((sum, value) => sum + value, 0);
  const noteBudget = proposal.workbookBudgetWithFelles;
  const stipend = proposal.final.values[6];
  const final = proposal.final;
  const units = proposal.units;
  const sumCard = (label, value, note, stateName = "") =>
    `<article class="proposal-stat ${stateName}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
  el("#proposal-summary").innerHTML = [
    sumCard("Program + Felles AMF · arbeidsnotat", fmtKr(noteBudget), "Utan stipendtilsetjingar"),
    sumCard("Stipendtilsetjingar · leiingsutkast", fmtKr(stipend), "Vist som eiga løyvingseining"),
    sumCard(state.proposalEditMode ? "Sluttsum · redigert modell" : "Oppgitt sluttsum · leiingsutkast", fmtKr(final.total), state.proposalEditMode ? "Rekna frå redigerte komponentar" : "Frå den fotograferte sumlinja", "proposal-emphasis"),
    sumCard("Sum av synlege einingsbeløp", fmtKr(finalSum), `Avvik frå oppgitt sum: ${fmtKr(final.total - finalSum)}`, finalSum === final.total ? "" : "proposal-warning"),
  ].join("");
  const fellesSources = [
    { name: "Resultatbaserte løyvingar", amount: proposal.resultTotal.values[5], kind: "production" },
    { name: "Basis / sentral løyving", amount: proposal.basisTotal.values[5], kind: "basis" },
    { name: "Strategisk forsking", amount: proposal.strategic.values[5], kind: "research" },
    { name: "Lønnsopplegg", amount: proposal.salary.values[5], kind: "salary" },
  ];
  const fellesComponentsTotal = fellesSources.reduce((sum, item) => sum + item.amount, 0);
  el("#felles-funding").innerHTML = `
    <div class="felles-funding-heading"><div><strong>Felles AMF · finansiering i leiingsutkastet</strong><small>Ikkje eiga studieprograminntekt · løyvingar frå modellkomponentane</small></div><b>${fmtKr(final.values[5])} <small>${state.proposalEditMode ? "berekna sum" : "oppgitt sluttsum"}</small></b></div>
    <div class="felles-source-list">${fellesSources.map((item) =>
      `<div class="felles-source ${item.kind}"><span>${esc(item.name)}</span><strong>${fmtKr(item.amount)}</strong></div>`,
    ).join("")}</div>
    <div class="felles-sum">Sum av synlege Felles AMF-komponentar <strong>${fmtKr(fellesComponentsTotal)}</strong><span> mot ${fmtKr(final.values[5])} oppgitt (avvik ${fmtKr(fellesComponentsTotal - final.values[5])})</span></div>`;

  const basis = proposal.studyBasis;
  const dbhStudents = Object.fromEntries(state.programs.map((program) => [program.code, program.students]));
  const studentDifference = basis.programs.map((code, index) => dbhStudents[code] - basis.studentBasis[index]);
  const dashboardStudents = state.programs.reduce((sum, program) => sum + program.students, 0);
  const proposalCell = (value, group, rowIndex, unitIndex, step = "1") => {
    const isCurrency = ["resultComponents", "strategic", "basisComponents", "salary"].includes(group);
    if (state.proposalEditMode) {
      const inputValue = isCurrency ? value * 1000 : value;
      const inputStep = isCurrency ? Number(step) * 1000 : step;
      return `<input class="proposal-input" type="number" min="0" step="${inputStep}" value="${inputValue}" data-currency="${isCurrency}" data-group="${group}" data-row-index="${rowIndex}" data-unit-index="${unitIndex}" aria-label="Rediger ${group} verdi ${unitIndex + 1}" />`;
    }
    return isCurrency ? fmtKr(value) : fmt(value);
  };
  el("#proposal-edit").textContent = state.proposalEditMode ? "✓ Ferdig med redigering" : "✎ Rediger løyvingstal";
  el("#proposal-edit").setAttribute("aria-pressed", String(state.proposalEditMode));
  el("#proposal-basis").innerHTML = `
    <div class="basis-table-wrap"><table class="heatmap-table basis-table">
      <thead><tr><th>Fordelingsgrunnlag</th>${basis.programs.map((code) => `<th>${esc(code)}</th>`).join("")}<th>Sum</th></tr></thead>
      <tbody>
        <tr><th>Avlagde studiepoeng 2024<br><small>grunnlag budsjett 2026</small></th>${basis.credits2024.map((value, index) => `<td>${proposalCell(value, "credits2024", 0, index, "0.1")}</td>`).join("")}<td>${fmtOne(basis.totalCredits2024)}</td></tr>
        <tr><th>Avlagde studiepoeng 2025<br><small>grunnlag budsjett 2027</small></th>${basis.credits2025.map((value, index) => `<td>${proposalCell(value, "credits2025", 0, index, "0.1")}</td>`).join("")}<td>${fmtOne(basis.totalCredits2025)}</td></tr>
        <tr><th>Studenttal i løyvingsutkastet</th>${basis.studentBasis.map((value, index) => `<td>${proposalCell(value, "studentBasis", 0, index)}</td>`).join("")}<td>${fmt(basis.totalStudents)}</td></tr>
        <tr><th>Studenttal i dashbordet (DBH 2026)</th>${basis.programs.map((code) => `<td>${fmt(dbhStudents[code])}</td>`).join("")}<td>${fmt(dashboardStudents)}</td></tr>
        <tr><th>DBH minus løyvingsgrunnlag</th>${studentDifference.map((value) => `<td>${fmt(value)}</td>`).join("")}<td>${fmt(studentDifference.reduce((sum, value) => sum + value, 0))}</td></tr>
      </tbody>
    </table></div>
    <p class="basis-note">DBH-studenttal for dei fem programma summerer seg til ${fmt(state.programs.reduce((sum, program) => sum + program.students, 0))}. Leiingsutkastet bruker eit separat fordelingsgrunnlag på ${fmt(basis.totalStudents)} studentar.</p>`;

  const maxAllocation = Math.max(...final.values, 1);
  el("#proposal-chart").innerHTML = units.map((unit, index) => `
    <div class="proposal-bar-row">
      <span>${esc(unit)}</span>
      <div class="proposal-bar-track"><i style="width:${final.values[index] / maxAllocation * 100}%;--unit-color:${index < 5 ? programDefinitions.find((item) => item.code === unit)?.color || "#477da8" : index === 5 ? "#78899c" : "#c69034"}"></i></div>
      <strong>${fmtKr(final.values[index])}</strong>
    </div>`).join("");

  const unitHeader = `<tr><th>Modellkomponent</th><th>Fordeling</th>${units.map((unit) => `<th>${esc(unit)}</th>`).join("")}<th>Sum</th></tr>`;
  el("#proposal-head").innerHTML = unitHeader;
  const componentRows = proposal.resultComponents.map((component, rowIndex) =>
    `<tr><td>${esc(component.name)}</td><td class="proposal-comment">${esc(component.comment || "")}</td>${component.values.map((value, unitIndex) => `<td>${proposalCell(value, "resultComponents", rowIndex, unitIndex)}</td>`).join("")}<td>${fmtKr(component.total)}</td></tr>`,
  ).join("");
  const row = (item, className = "", group = "", rowIndex = 0) =>
    `<tr class="${className}"><th>${esc(item.name)}</th><td></td>${item.values.map((value, unitIndex) => `<td>${group ? proposalCell(value, group, rowIndex, unitIndex) : fmtKr(value)}</td>`).join("")}<td>${fmtKr(item.total)}</td></tr>`;
  const tableBody = [
    componentRows,
    row({ name: "Sum resultatbaserte løyvingar", ...proposal.resultTotal }, "proposal-subtotal"),
    row(proposal.strategic, "proposal-subtotal", "strategic"),
    ...proposal.basisComponents.map((item, index) => row(item, "", "basisComponents", index)),
    row({ name: "Basisløyving etter avsetning", ...proposal.basisTotal }, "proposal-subtotal"),
    row({ name: "Sum neddeling", ...proposal.distributionTotal }, "proposal-total"),
    row(proposal.salary, "proposal-subtotal", "salary"),
    row({ name: "Sluttsum 2027 (som oppgitt)", ...proposal.final }, "proposal-grand"),
    row({ name: `Samanlikning ${proposal.previous.year}`, ...proposal.previous }, "proposal-previous"),
  ].join("");
  el("#proposal-components").innerHTML = tableBody;
  el("#proposal-foot").innerHTML = `<tr><th>Arbeidsnotat · budsjett 2027</th><td colspan="2">Program + Felles AMF · kr</td><td colspan="${units.length - 1}"></td><th>${fmtKr(proposal.workbookBudgetWithFelles)}</th></tr>`;
  const mismatch = proposal.workbookVsProposalDifference;
  const mismatchText = mismatch === 0
    ? "Arbeidsnotatet med stipendløyvingane stemmer med sluttsummen i leiingsutkastet."
    : `Arbeidsnotatet summerer program + Felles AMF til ${fmtKr(noteBudget)}. Med ${fmtKr(stipend)} for stipend blir det ${fmtKr(proposal.workbookTotalWithStipend)}, mot oppgitt sluttsum ${fmtKr(final.total)} i leiingsutkastet (avvik ${fmtKr(mismatch)}).`;
  const componentDifference = proposal.finalUnitDifference;
  const reference = state.proposalReference || proposal;
  const componentSumIssues = [...reference.resultComponents, ...reference.basisComponents]
    .map((item) => ({ name: item.name, delta: item.values.reduce((sum, value) => sum + value, 0) - item.total }))
    .filter((item) => item.delta !== 0);
  const mpro = proposal.programBudgetByCode.MPRO;
  const mproPhoto = reference.final.values[3];
  const referenceFinalSum = reference.final.values.reduce((sum, value) => sum + value, 0);
  const referenceDistributionSum = reference.distributionTotal.values.reduce((sum, value) => sum + value, 0);
  const referenceSalarySum = reference.salary.values.reduce((sum, value) => sum + value, 0);
  el("#proposal-reconciliation").innerHTML = `
    <strong>Avstemming / kjeldeavvik</strong>
    <ul>
      <li>${esc(mismatchText)}</li>
      <li>Sum av dei noverande sju einingsbeløpa er ${fmtKr(finalSum)}; noverande sumfelt er ${fmtKr(final.total)} (avvik ${fmtKr(componentDifference)}).</li>
      <li>MPRO er ${fmtKr(mpro)} i arbeidsnotatet og ${fmtKr(mproPhoto)} i opphavleg bilete; skilnaden er ${fmtKr(mpro - mproPhoto)}.</li>
      ${componentSumIssues.map((item) => `<li>Opphavleg rad «${esc(item.name)}»: einingskolonnane avvik ${fmtKr(item.delta)} frå den trykte radtotalen.</li>`).join("")}
      <li>Opphavleg trykt resultatbasert sum avvik med ${fmtKr(reference.resultUnitDifference)} mellom einingskolonnane og sumfeltet.</li>
      <li>Opphavleg «Sum neddeling» har einingsbeløp på ${fmtKr(referenceDistributionSum)} mot trykt sum ${fmtKr(reference.distributionTotal.total)}; lønnsopplegget har ${fmtKr(referenceSalarySum)} mot trykt ${fmtKr(reference.salary.total)}.</li>
      <li>Opphavleg sum av sluttsumlinja (${fmtKr(referenceFinalSum)}) avvik med ${fmtKr(reference.final.total - referenceFinalSum)} frå den trykte totalsummen ${fmtKr(reference.final.total)}.</li>
      ${state.proposalEditMode ? "<li>Endringar i modellen er mellombelse for denne økta; summer blir rekna om når eit felt mistar fokus.</li>" : ""}
    </ul>
    <small>Beløpa er transkriberte frå leiingsutkastet på biletet, datert 02.11.2026. Reknearket er kjelde for programtal, budsjett og bemanning. Avvika er viste ope; dei er ikkje korrigerte automatisk.</small>`;
}

function recalculateProposal() {
  const proposal = state.proposal;
  for (const row of [proposal.strategic, proposal.salary]) {
    row.total = row.values.reduce((sum, value) => sum + value, 0);
  }
  const sumRows = (rows) => rows.reduce(
    (totals, item) => {
      item.total = item.values.reduce((sum, value) => sum + value, 0);
      item.values.forEach((value, index) => { totals[index] += value; });
      totals[totals.length - 1] += item.total;
      return totals;
    },
    Array(proposal.units.length + 1).fill(0),
  );
  const result = sumRows(proposal.resultComponents);
  proposal.resultTotal.values = result.slice(0, -1);
  proposal.resultTotal.total = result[result.length - 1];
  const basis = sumRows(proposal.basisComponents);
  proposal.basisTotal.values = basis.slice(0, -1);
  proposal.basisTotal.total = basis[basis.length - 1];
  proposal.distributionTotal.values = proposal.units.map((_, index) =>
    proposal.resultTotal.values[index] + proposal.strategic.values[index] + proposal.basisTotal.values[index],
  );
  proposal.distributionTotal.total = proposal.distributionTotal.values.reduce((sum, value) => sum + value, 0);
  proposal.final.values = proposal.units.map((_, index) =>
    proposal.distributionTotal.values[index] + proposal.salary.values[index],
  );
  proposal.final.total = proposal.final.values.reduce((sum, value) => sum + value, 0);
  proposal.lineItemTotal = proposal.final.total;
  proposal.workbookTotalWithStipend =
    proposal.workbookBudgetWithFelles + proposal.final.values[6];
  proposal.finalUnitDifference = 0;
  proposal.resultUnitDifference = 0;
  proposal.workbookVsProposalDifference =
    proposal.final.total - proposal.workbookTotalWithStipend;
  proposal.studyBasis.totalCredits2024 = proposal.studyBasis.credits2024.reduce((sum, value) => sum + value, 0);
  proposal.studyBasis.totalCredits2025 = proposal.studyBasis.credits2025.reduce((sum, value) => sum + value, 0);
  proposal.studyBasis.totalStudents = proposal.studyBasis.studentBasis.reduce((sum, value) => sum + value, 0);
}

function updateProposalValue(event) {
  const field = event.target.closest(".proposal-input");
  if (!field) return;
  const rawValue = field.valueAsNumber;
  const value = field.dataset.currency === "true" ? rawValue / 1000 : rawValue;
  if (!Number.isFinite(value) || value < 0) return;
  const { group, rowIndex, unitIndex } = field.dataset;
  if (group === "credits2024" || group === "credits2025" || group === "studentBasis") {
    state.proposal.studyBasis[group][Number(unitIndex)] = value;
  } else {
    const groupData = state.proposal[group];
    const row = Array.isArray(groupData) ? groupData[Number(rowIndex)] : groupData;
    if (!row || !Array.isArray(row.values)) return;
    row.values[Number(unitIndex)] = value;
  }
  recalculateProposal();
  renderDashboard();
}

function renderOverview(programs) {
  const maxBudget = Math.max(...programs.map((item) => item.budget), 1);
  el("#overview-chart").innerHTML = programs.map((program) => `
    <div class="overview-row">
      <span class="overview-code">${esc(program.code)}</span>
      <div class="overview-track"><div class="overview-fill" style="width:${program.budget / maxBudget * 100}%;--program-color:${program.color}"></div></div>
      <strong>${fmtKr(program.budget)}</strong>
    </div>`).join("");
}

function categoryFor(value, average) {
  if (value >= average * 1.05) return { className: "high", text: "Høg" };
  if (value <= average * 0.95) return { className: "low", text: "Låg" };
  return { className: "balanced", text: "Middels" };
}

function renderBarometer(programs) {
  const average = programs[0].averageCreditsPerStaff;
  const max = Math.max(...programs.map((item) => item.creditsPerStaff), average, 1);
  el("#barometer").innerHTML = programs.map((program) => {
    const category = categoryFor(program.creditsPerStaff, average);
    return `<div class="barometer-row"><span class="barometer-code">${esc(program.code)}</span><div class="barometer-track"><span class="barometer-average" style="left:${average / max * 100}%"></span><span class="barometer-fill ${category.className}" style="width:${program.creditsPerStaff / max * 100}%"></span></div><strong>${fmtKr(program.creditsPerStaff)}</strong><span class="barometer-status ${category.className}">${category.text}</span></div>`;
  }).join("") + `<div class="average-marker"><span>—</span> Programgjennomsnitt ${fmtKr(average)} per programårsverk</div>`;
}

function renderReport(programs) {
  const sortedCredits = [...programs].sort((a, b) => b.creditsPerStaff - a.creditsPerStaff);
  const sortedBudget = [...programs].sort((a, b) => b.budget - a.budget);
  const above = programs.filter((item) => item.creditsPerStaff > programs[0].averageCreditsPerStaff * 1.05);
  const below = programs.filter((item) => item.creditsPerStaff < programs[0].averageCreditsPerStaff * 0.95);
  const workloadText = above.length
    ? `${above.map((item) => item.code).join(" og ")} ligg meir enn 5 % over AMF-snittet.`
    : below.length
      ? `${below.map((item) => item.code).join(" og ")} ligg meir enn 5 % under AMF-snittet; ingen program ligg meir enn 5 % over.`
      : "Alle programma ligg innanfor ±5 % av AMF-snittet.";
  el("#automatic-report").textContent =
    `${sortedCredits[0].code} har høgast studiepoengskomponent per årsverk (${fmtKr(sortedCredits[0].creditsPerStaff)}). ${sortedBudget[0].code} har størst programbudsjett (${fmtKr(sortedBudget[0].budget)}). ${workloadText}`;
}

function renderWorkload(programs) {
  const average = programs[0].averageCreditsPerStaff;
  const programStaffTotal = programs.reduce((sum, program) => sum + program.staffEffective, 0);
  const highest = [...programs].sort((a, b) => b.creditsPerStaff - a.creditsPerStaff)[0];
  const above = programs.filter((item) => item.creditsPerStaff > average * 1.05);
  el("#average-workload").textContent = fmtKr(average);
  el("#whole-amf-workload").textContent = fmtKr(programs[0].totalCredits / (state.staffing.total || 1));
  el("#average-workload").nextElementSibling.textContent = `produksjon ÷ ${fmtFte(programStaffTotal)} programårsverk i valt modell`;
  el("#highest-workload").textContent = `${highest.code} · ${fmtKr(highest.creditsPerStaff)}`;
  el("#above-average").textContent = above.length ? above.map((item) => item.code).join(", ") : "Ingen";

  const max = Math.max(...programs.map((item) => item.creditsPerStaff), average, 1);
  el("#workload-chart").innerHTML = programs.map((program) => {
    const category = categoryFor(program.creditsPerStaff, average);
    return `<div class="workload-row"><span>${esc(program.code)}</span><div class="workload-track"><i class="${category.className}" style="width:${program.creditsPerStaff / max * 100}%"></i><b style="left:${average / max * 100}%"></b></div><strong>${fmtKr(program.creditsPerStaff)}</strong><em class="status-text ${category.className}">${category.text}</em></div>`;
  }).join("");

  const metrics = [
    { key: "studentsPerStaff", label: "Studentar / tilsett" },
    { key: "creditsPerStaff", label: "SP / tilsett" },
    { key: "budgetPerStudent", label: "Budsjett / student" },
    { key: "staffEffective", label: "Tilsette / program" },
  ];
  const means = Object.fromEntries(metrics.map(({ key }) => [
    key,
    programs.reduce((sum, program) => sum + program[key], 0) / programs.length,
  ]));
  el("#heatmap").innerHTML = programs.map((program) => `
    <tr><th><span class="program-code" style="--program-color:${program.color}">${esc(program.code)}</span></th>
      ${metrics.map(({ key }) => {
        const ratio = program[key] / (means[key] || 1);
        const color = ratio > 1.05 ? "hot" : ratio < 0.95 ? "cool" : "neutral";
        const value = ["budgetPerStudent", "budgetPerStaff", "creditsPerStaff"].includes(key)
          ? fmtKr(program[key])
          : key === "staffEffective" ? fmtFte(program[key]) : fmtOne(program[key]);
        return `<td><span class="heat-cell ${color}">${value}</span></td>`;
      }).join("")}
    </tr>`).join("");

  el("#traffic-table").innerHTML = programs.map((program) => {
    const difference = (program.creditsPerStaff / average - 1) * 100;
    const category = categoryFor(program.creditsPerStaff, average);
    const diffText = `${difference > 0 ? "+" : ""}${fmtOne(difference)} %`;
    const traffic = category.className === "high" ? "high" : category.className === "low" ? "low" : "balanced";
    return `<tr><td><span class="program-code" style="--program-color:${program.color}">${esc(program.code)}</span><span class="program-name">${esc(program.name)}</span></td><td>${fmtKr(program.creditsPerStaff)}</td><td>${fmtKr(average)}</td><td>${diffText}</td><td><span class="traffic-pill ${traffic}"><i></i>${category.text}</span></td></tr>`;
  }).join("");
}

function renderRadar(programs) {
  const metrics = [
    { key: "studentsPerStaff", label: "Studentar / tilsett" },
    { key: "creditsPerStaff", label: "SP / tilsett" },
    { key: "budgetPerStudent", label: "Budsjett / student" },
    { key: "staffEffective", label: "Tilsette" },
  ];
  const maxima = metrics.map(({ key }) => Math.max(...programs.map((item) => item[key]), 1));
  const cx = 180, cy = 145, radius = 94;
  const pointsAt = (index, ratio) => {
    const angle = -Math.PI / 2 + index * 2 * Math.PI / metrics.length;
    return `${cx + Math.cos(angle) * radius * ratio},${cy + Math.sin(angle) * radius * ratio}`;
  };
  const grid = [0.25, 0.5, 0.75, 1].map((scale) => {
    const points = metrics.map((_, index) => pointsAt(index, scale)).join(" ");
    return `<polygon points="${points}" class="radar-grid"/>`;
  }).join("");
  const axes = metrics.map((metric, index) => {
    const edge = pointsAt(index, 1);
    const label = pointsAt(index, 1.23).split(",");
    return `<line x1="${cx}" y1="${cy}" x2="${edge.split(",")[0]}" y2="${edge.split(",")[1]}" class="radar-axis"/><text x="${label[0]}" y="${label[1]}" class="radar-label" text-anchor="middle">${esc(metric.label)}</text>`;
  }).join("");
  const shapes = programs.map((program) => {
    const points = metrics.map(({ key }, index) => pointsAt(index, program[key] / maxima[index])).join(" ");
    return `<polygon points="${points}" fill="${program.color}" fill-opacity=".09" stroke="${program.color}" stroke-width="2"/><circle cx="${points.split(" ")[0].split(",")[0]}" cy="${points.split(" ")[0].split(",")[1]}" r="2.5" fill="${program.color}"/>`;
  }).join("");
  const legend = programs.map((program) => `<span><i style="background:${program.color}"></i>${esc(program.code)}</span>`).join("");
  el("#radar-chart").innerHTML = `<svg viewBox="0 0 360 295" role="img" aria-label="Radar chart samanliknar studentar, studiepoeng, budsjett og bemanning">${grid}${axes}${shapes}</svg><div class="radar-legend">${legend}</div>`;
}

function renderTraffic(programs) {
  renderWorkload(programs);
  renderRadar(programs);
}

function renderBubble(programs) {
  const width = 920, height = 430;
  const left = 64, right = 28, top = 25, bottom = 54;
  const plotWidth = width - left - right, plotHeight = height - top - bottom;
  const maxStaff = Math.max(...programs.map((item) => item.staffEffective)) * 1.3;
  const maxCredits = Math.max(...programs.map((item) => item.credits)) * 1.18;
  const maxBudget = Math.max(...programs.map((item) => item.budget), 1);
  const averageStudents = programs[0].averageStudentsPerStaff;
  const x = (value) => left + value / maxStaff * plotWidth;
  const y = (value) => top + plotHeight - value / maxCredits * plotHeight;
  const grid = Array.from({ length: 5 }, (_, index) => {
    const value = maxCredits * index / 4;
    const lineY = y(value);
    return `<line x1="${left}" y1="${lineY}" x2="${width - right}" y2="${lineY}" class="chart-grid"/><text x="${left - 10}" y="${lineY + 4}" class="axis-tick" text-anchor="end">${fmtKr(value)}</text>`;
  }).join("");
  const dots = programs.map((program, index) => {
    const category = categoryFor(program.studentsPerStaff, averageStudents);
    const color = category.className === "high" ? "#3d9b78" : category.className === "low" ? "#477da8" : "#c99b39";
    const radius = 13 + Math.sqrt(program.budget / maxBudget) * 25;
    const cx = x(program.staffEffective);
    const cy = y(program.credits);
    const labelY = cy - radius - 8;
    return `<g class="bubble-node"><title>${esc(program.name)} · ${fmt(program.students)} studentar · ${fmtFte(program.staffEffective)} årsverk · studiepoengskomponent ${fmtKr(program.credits)} · budsjett ${fmtKr(program.budget)} · ${fmtOne(program.studentsPerStaff)} studentar/årsverk · komponent ${fmtKr(program.creditsPerStaff)}/årsverk · budsjett ${fmtKr(program.budgetPerStaff)}/årsverk · budsjett ${fmtKr(program.budgetPerStudent)}/student</title><circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" fill-opacity=".78" stroke="#fff" stroke-width="2"/><text x="${cx}" y="${cy + 4}" class="bubble-code">${esc(program.code)}</text><text x="${cx}" y="${labelY}" class="bubble-label">${fmtKr(program.credits)}</text></g>`;
  }).join("");
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const value = maxStaff * index / 4;
    return `<text x="${x(value)}" y="${height - bottom + 22}" class="axis-tick" text-anchor="middle">${fmtOne(value)}</text>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Boblediagram med tilsette på x-aksen og studiepoengskomponent i kroner på y-aksen"><style>.chart-grid{stroke:#e9edf2;stroke-width:1}.axis-tick{fill:#8993a2;font:11px Arial,sans-serif}.bubble-code{fill:white;font:bold 12px Arial,sans-serif;text-anchor:middle}.bubble-label{fill:#596474;font:10px Arial,sans-serif;text-anchor:middle}.axis-title{fill:#526071;font:12px Arial,sans-serif;font-weight:bold}</style>${grid}<line x1="${left}" y1="${top}" x2="${left}" y2="${height - bottom}" class="chart-grid"/><line x1="${left}" y1="${height - bottom}" x2="${width - right}" y2="${height - bottom}" class="chart-grid"/>${ticks}${dots}<text x="${left + plotWidth / 2}" y="${height - 8}" class="axis-title" text-anchor="middle">Tilsette (årsverk)</text><text x="16" y="${top + plotHeight / 2}" class="axis-title" text-anchor="middle" transform="rotate(-90 16 ${top + plotHeight / 2})">Studiepoengskomponent (kr)</text></svg>`;
  state.bubbleSvg = svg;
  el("#bubble-chart").innerHTML = svg;
}

function renderScenario(programs) {
  const flowBack = state.flow * state.flowPercent / 100;
  const adminBack = state.administration * state.administrationPercent / 100;
  el("#flow-value").textContent = `${state.flowPercent} %`;
  el("#admin-value").textContent = `${state.administrationPercent} %`;
  el("#flow-fte").textContent = fmtOne(flowBack);
  el("#admin-fte").textContent = fmtOne(adminBack);
  el("#flow-total-label").textContent = fmtOne(state.flow);
  el("#admin-total-label").textContent = fmtOne(state.administration);
  el("#flow-total-input").value = state.flow;
  el("#admin-total-input").value = state.administration;
  const avg = programs[0].averageCreditsPerStaff;
  el("#scenario-results").innerHTML = programs.map((program) => {
    const category = categoryFor(program.creditsPerStaff, avg);
    return `<div class="scenario-row"><span class="scenario-program"><i style="background:${program.color}"></i>${esc(program.code)}</span><span>${fmtFte(program.staffEffective)}</span><span class="workbook-ideal">${fmtFte(program.proposedIdealStaff ?? 0)}</span><strong>${fmtFte(program.idealStaff)}</strong><span class="deviation ${category.className}">${program.deviation > 0 ? "+" : ""}${fmtFte(program.deviation)}</span></div>`;
  }).join("");
  const fteTotal = programs.reduce((sum, program) => sum + program.staffEffective, 0);
  const idealTotal = programs.reduce((sum, program) => sum + program.idealStaff, 0);
  el("#scenario-total").textContent = `${fmtFte(fteTotal)} årsverk · ${fmtFte(idealTotal)} ideelt`;
  renderSankey(programs, flowBack, adminBack);
}

function renderSankey(programs, flowBack, adminBack) {
  const width = 900, height = 220;
  const sourceX = 46, targetX = 650, sourceWidth = 115, targetWidth = 154;
  const output = [...programs].sort((a, b) => b.staff - a.staff);
  const available = flowBack + adminBack;
  const staffWeightTotal = programs.reduce((sum, item) => sum + item.staff, 0) || 1;
  const maxThickness = 28;
  const paths = output.map((program, index) => {
    const share = available * (program.staff / staffWeightTotal);
    const thickness = available ? Math.max(2, share / available * maxThickness * 2.4) : 1;
    const sourceY = 84 + index * 11;
    const targetY = 36 + index * 38;
    const d = `M ${sourceX + sourceWidth} ${sourceY} C 330 ${sourceY}, 470 ${targetY}, ${targetX} ${targetY}`;
    return `<path d="${d}" fill="none" stroke="${program.color}" stroke-opacity="${available ? ".42" : ".14"}" stroke-width="${thickness}"/><text x="${targetX + targetWidth + 12}" y="${targetY + 4}" class="sankey-value">${fmtOne(share)} årsverk</text>`;
  }).join("");
  const nodes = output.map((program, index) => {
    const targetY = 36 + index * 38;
    return `<rect x="${targetX}" y="${targetY - 12}" width="${targetWidth}" height="24" rx="5" fill="${program.color}"/><text x="${targetX + 12}" y="${targetY + 4}" class="sankey-name">${esc(program.code)} · ${esc(program.name.split(" - ")[0])}</text>`;
  }).join("");
  el("#sankey-chart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Fordeling av ${fmtOne(available)} årsverk tilbake til programma">${paths}<rect x="${sourceX}" y="57" width="${sourceWidth}" height="52" rx="7" class="sankey-source"/><text x="${sourceX + 12}" y="78" class="sankey-source-title">Fellesressurs</text><text x="${sourceX + 12}" y="96" class="sankey-source-value">${fmtOne(available)} årsverk</text>${nodes}<text x="${sourceX}" y="192" class="sankey-caption">Flyt: ${fmtOne(flowBack)} årsverk · Administrasjon: ${fmtOne(adminBack)} årsverk</text></svg>`;
}

function renderDashboard() {
  if (!state.programs.length || !state.staffing || !state.proposal) return;
  const programs = programCalculations();
  renderKpis(programs);
  renderAlternativePanel(programs);
  renderProposal(state.proposal);
  renderOverview(programs);
  renderAnalysisTable(programs);
  renderBarometer(programs);
  renderReport(programs);
  renderTraffic(programs);
  renderBubble(programs);
  renderScenario(programs);
}

async function loadWorkbookData() {
  el("#source-status").textContent = "Hentar publiserte data …";
  el("#error-message").hidden = true;
  state.proposalEditMode = false;
  el("#proposal-edit-hint").hidden = true;
  try {
    const response = await fetch("/budsjett/data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Klarte ikkje hente data (${response.status}): ${await response.text()}`);
    const source = await response.json();
    const dataByCode = new Map(source.programs.map((program) => [program.code, program]));
    state.studentsByYear = source.students.studentsByYear;
    state.programs = programDefinitions.map((definition) => {
      const program = dataByCode.get(definition.code);
      if (!program) throw new Error(`Arbeidsnotatet manglar ${definition.code}.`);
      return {
        ...program,
        ...definition,
        students: source.students.programs[definition.code],
      };
    });
    state.staffing = source.staffing;
    state.flow = source.staffing.flow;
    state.administration = source.staffing.administration;
    state.proposal = source.proposal;
    state.proposalReference = JSON.parse(JSON.stringify(source.proposal));
    state.workbookName = source.students.source;
    el("#source-name").textContent = source.staffing.source;
    el("#source-status").textContent = `Oppdatert ${new Date(source.staffing.modified).toLocaleDateString("nb-NO")}`;
    el("#student-source").textContent = "DBH · 2026";
    renderDashboard();
  } catch (error) {
    el("#source-status").textContent = "Data ikkje tilgjengeleg";
    el("#source-name").textContent = "Kunne ikkje hente datapakka";
    el("#error-message").textContent = `${error.message} Kontroller at den publiserte datapakka er tilgjengeleg.`;
    el("#error-message").hidden = false;
  }
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

async function exportExcel() {
  const programs = programCalculations();
  const proposal = state.proposal;
  const allocationWeightTotal = state.staffing.programStaff || 1;
  const modelName = {
    current: "Dagens modell",
    a: "Alternativt budsjett A",
    b: "Alternativt budsjett B",
    c: "Alternativt budsjett C",
  }[state.scenario];
  const capacity = alternativeCapacity();
  const currentProgramStaff = state.programs.reduce((sum, item) => sum + item.staff, 0) || 1;
  const overview = [
    ["AMF · Budsjett og ressursoversikt", "2027"],
    ["Vald modell", modelName],
    ["Kjelde studenttal", state.workbookName],
    ["Kjelde budsjett/bemanning", state.staffing.source],
    ["Kjelde løyvingsmodell", proposal.source],
    ["Merknad", "Programtilknyting er ikkje faktisk arbeidsfordeling. Flyt og Felles AMF er eigne bemanningsgrupper."],
    ["Nøkkeltal", "Verdi"],
    ["DBH-studentar i fem program", programs[0].totalStudents],
    ["Studentgrunnlag i leiingsutkastet", proposal.studyBasis.totalStudents],
    ["Programbudsjett frå arbeidsnotatet (kr)", programs[0].totalBudget * 1000],
    ["Budsjett inkludert Felles AMF (kr)", proposal.workbookBudgetWithFelles * 1000],
    ["Oppgitt sluttsum i leiingsutkastet (kr)", proposal.final.total * 1000],
    ["Sluttsum som sum av synlege einingsbeløp (kr)", proposal.lineItemTotal * 1000],
    ["Stipendtilsetjingar i leiingsutkastet (kr)", proposal.final.values[6] * 1000],
    ["Studiepoengsbasert løyving (kr)", programs[0].totalCredits * 1000],
    ["Programtilknytte tilsette (årsverk)", state.staffing.programStaff],
    ["Flyt (årsverk)", state.staffing.flow],
    ["Felles AMF / teknisk stab (årsverk)", state.staffing.administration],
    ["Tilsette totalt (årsverk)", state.staffing.total],
    ["Studiepoengsbasert løyving per årsverk, programgjennomsnitt (kr)", programs[0].averageCreditsPerStaff * 1000],
    [],
    ["Program", "Studentar", "Programtilknytte årsverk", state.scenario === "current" ? "Flyt årsverk · simulert" : "Felles ressursar omfordelte", "Felles AMF årsverk · simulert", "Samla årsverk · simulert", "Studiepoengsbasert løyving (kr)", "Programbudsjett (kr)", "Studentar / årsverk", "Løyving / årsverk (kr)", "Budsjett / årsverk (kr)", "Budsjett / student (kr)", "Ideelle årsverk", "Avvik årsverk"],
    ...programs.map((item) => [
      item.code,
      item.students,
      item.staff,
      state.scenario === "current"
        ? state.flow * state.flowPercent / 100 * item.staff / allocationWeightTotal
        : item.staffEffective - item.staff,
      state.scenario === "current"
        ? state.administration * state.administrationPercent / 100 * item.staff / allocationWeightTotal
        : 0,
      item.staffEffective,
      item.credits * 1000,
      item.budget * 1000,
      item.studentsPerStaff,
      item.creditsPerStaff * 1000,
      item.budgetPerStaff * 1000,
      item.budgetPerStudent * 1000,
      item.idealStaff,
      item.deviation,
    ]),
  ];
  const details = [
    ["Program", "Studieprogram", "Studentar", "Programtilknytte årsverk", "Scenario årsverk", "Studiepoengsbasert løyving (kr)", "Budsjett (kr)", "Studentar / årsverk", "Løyving / årsverk (kr)", "Budsjett / student (kr)", "Ideelle årsverk", "Avvik årsverk"],
    ...programs.map((item) => [item.code, item.name, item.students, item.staff, item.staffEffective, item.credits * 1000, item.budget * 1000, item.studentsPerStaff, item.creditsPerStaff * 1000, item.budgetPerStudent * 1000, item.idealStaff, item.deviation]),
  ];
  const staffing = [
    ["Ressursgruppe", "Tilsette (årsverk)", "Merknad"],
    ["Studieprogram · tilknytte", state.staffing.programStaff, "Programtilknyting er ikkje lik faktisk undervisningsfordeling."],
    ...state.programs.map((item) => [item.code, item.staff, item.name]),
    ["Flyt / fellesemne", state.flow, "Instituttstillingar som bidreg på tvers; ikkje fordelt eintydig på program."],
    ["Felles AMF / teknisk stab", state.administration, "Eiga budsjetteining utan eiga studieprograminntekt."],
    ["Sum AMF", state.staffing.total, "Programtilknytte + Flyt + Felles AMF."],
    [],
    ["Fordeling i valt modell", modelName, "Endring er samanlikna med programandel + Flyt fordelt etter dagens programtilknyting."],
    ["Program", "Tilsette knytte til program i dag", "Årsverk i vald modell", "Endring mot referansen"],
    ...programs.map((item) => {
      const reference = capacity.programPool * item.staff / currentProgramStaff;
      return [item.code, item.staff, item.staffEffective, item.staffEffective - reference];
    }),
    ["Felles AMF i valt modell", capacity.shared],
    ["Utan direkte studiepoengsproduksjon · førebels anslag", capacity.nonProduction],
    [],
    ["Scenario", "Prosent", "Tilbakeført årsverk"],
    ["Flyt", state.flowPercent, state.flow * state.flowPercent / 100],
    ["Felles AMF / administrasjon", state.administrationPercent, state.administration * state.administrationPercent / 100],
    [],
    ["Ideell bemanning · arbeidsnotat", "årsverk", "Avvik mot dagens programtilknyting"],
    ...programs.map((item) => [item.code, item.proposedIdealStaff, item.proposedDeviation]),
    ["Ideell bemanning · dette scenarioet", "årsverk", "Avvik mot scenarioets programbemanning"],
    ...programs.map((item) => [item.code, item.idealStaff, item.deviation]),
  ];
  const units = proposal.units;
  const budget = [
    ["Leiingsutkast · budsjett 2027 · beløp i kr; fordelingsgrunnlag i studiepoeng/studentar", "Fordelingsregel", ...units, "Oppgitt sum", "Sum av einingar"],
    ["Fordelingsgrunnlag · avlagde studiepoeng 2024", "grunnlag budsjett 2026", ...proposal.studyBasis.credits2024, proposal.studyBasis.totalCredits2024, proposal.studyBasis.credits2024.reduce((sum, value) => sum + value, 0)],
    ["Fordelingsgrunnlag · avlagde studiepoeng 2025", "grunnlag budsjett 2027", ...proposal.studyBasis.credits2025, proposal.studyBasis.totalCredits2025, proposal.studyBasis.credits2025.reduce((sum, value) => sum + value, 0)],
    ["Fordelingsgrunnlag · studenttal", "leiingsutkastet", ...proposal.studyBasis.studentBasis, proposal.studyBasis.totalStudents, proposal.studyBasis.studentBasis.reduce((sum, value) => sum + value, 0)],
    ...proposal.resultComponents.map((item) => [item.name, item.comment, ...item.values, item.total, item.values.reduce((sum, value) => sum + value, 0)]),
    ["Sum resultatbaserte løyvingar", "", ...proposal.resultTotal.values, proposal.resultTotal.total, proposal.resultTotal.values.reduce((sum, value) => sum + value, 0)],
    [proposal.strategic.name, "", ...proposal.strategic.values, proposal.strategic.total, proposal.strategic.values.reduce((sum, value) => sum + value, 0)],
    ...proposal.basisComponents.map((item) => [item.name, "", ...item.values, item.total, item.values.reduce((sum, value) => sum + value, 0)]),
    ["Basisløyving etter avsetning", "", ...proposal.basisTotal.values, proposal.basisTotal.total, proposal.basisTotal.values.reduce((sum, value) => sum + value, 0)],
    ["Sum neddeling", "", ...proposal.distributionTotal.values, proposal.distributionTotal.total, proposal.distributionTotal.values.reduce((sum, value) => sum + value, 0)],
    [proposal.salary.name, "", ...proposal.salary.values, proposal.salary.total, proposal.salary.values.reduce((sum, value) => sum + value, 0)],
    ["Sluttsum 2027 (leiingsutkast)", "", ...proposal.final.values, proposal.final.total, proposal.lineItemTotal],
    [`Samanlikning ${proposal.previous.year}`, "", ...proposal.previous.values, proposal.previous.total, proposal.previous.values.reduce((sum, value) => sum + value, 0)],
    [],
    ["Arbeidsnotat · budsjett inkl. Felles AMF", "", "", "", "", "", "", "", "", proposal.workbookBudgetWithFelles],
    ["Avvik sluttsum mot arbeidsnotat + stipend", "", "", "", "", "", "", "", "", proposal.workbookVsProposalDifference],
    ["Kjelde", proposal.source],
    ["Merknad", "Avvik i trykte summer og MPRO-budsjett er ikkje korrigerte automatisk."],
  ];
  const budgetInKroner = budget.map((row, rowIndex) => rowIndex < 4
    ? row
    : row.map((value, columnIndex) => typeof value === "number" && columnIndex >= 2 ? value * 1000 : value));
  const response = await fetch("/api/export.xlsx", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overview, details, staffing, budget: budgetInKroner }),
  });
  if (!response.ok) throw new Error(`Excel-eksport feila: ${await response.text()}`);
  const blob = await response.blob();
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "amf-budsjett-rapport.xlsx";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCsvFallback(error) {
  const programs = programCalculations();
  const rows = [
    ["Program", "Studieprogram", "Studentar", "Programtilknytte årsverk", "Scenario årsverk", "Studiepoengsbasert løyving (kr)", "Programbudsjett (kr)", "Studentar / årsverk", "Løyving / årsverk (kr)", "Budsjett / student (kr)", "Ideelle årsverk", "Avvik årsverk"],
    ...programs.map((item) => [item.code, item.name, item.students, item.staff, item.staffEffective, item.credits * 1000, item.budget * 1000, item.studentsPerStaff, item.creditsPerStaff * 1000, item.budgetPerStudent * 1000, item.idealStaff, item.deviation]),
  ];
  const csv = rows.map((row) => row.map(csvEscape).join(";")).join("\r\n");
  const link = document.createElement("a");
  const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
  link.href = url;
  link.download = "amf-budsjett-rapport.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  el("#error-message").textContent = `Klarte ikkje lage Excel-fil (${error.message}). Lasta ned CSV i staden.`;
  el("#error-message").hidden = false;
}

function exportPng() {
  const image = new Image();
  const svgBlob = new Blob([state.bubbleSvg], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(svgBlob);
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1840;
    canvas.height = 860;
    const context = canvas.getContext("2d");
    if (!context) {
      URL.revokeObjectURL(objectUrl);
      el("#error-message").textContent = "Nettlesaren støttar ikkje bileteksport.";
      el("#error-message").hidden = false;
      return;
    }
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--panel").trim() || "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        URL.revokeObjectURL(objectUrl);
        el("#error-message").textContent = "Klarte ikkje lage PNG-biletet.";
        el("#error-message").hidden = false;
        return;
      }
      const link = document.createElement("a");
      const pngUrl = URL.createObjectURL(blob);
      link.href = pngUrl;
      link.download = "amf-programoversikt.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }, "image/png");
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    el("#error-message").textContent = "Klarte ikkje lese diagrammet for PNG-eksport.";
    el("#error-message").hidden = false;
  };
  image.src = objectUrl;
}

el("#flow-slider").addEventListener("input", (event) => {
  state.flowPercent = Number(event.currentTarget.value);
  renderDashboard();
});
el("#admin-slider").addEventListener("input", (event) => {
  state.administrationPercent = Number(event.currentTarget.value);
  renderDashboard();
});
el("#flow-total-input").addEventListener("input", (event) => {
  const value = event.currentTarget.valueAsNumber;
  if (!Number.isFinite(value) || value < 0) return;
  state.flow = value;
  state.staffing.flow = value;
  state.staffing.total = state.staffing.programStaff + state.flow + state.administration;
  renderDashboard();
});
el("#admin-total-input").addEventListener("input", (event) => {
  const value = event.currentTarget.valueAsNumber;
  if (!Number.isFinite(value) || value < 0) return;
  state.administration = value;
  state.staffing.administration = value;
  state.staffing.total = state.staffing.programStaff + state.flow + state.administration;
  renderDashboard();
});
el("#reload-data").addEventListener("click", loadWorkbookData);
document.querySelectorAll(".scenario-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    state.scenario = link.dataset.scenario;
    renderDashboard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
el("#proposal-edit").addEventListener("click", () => {
  state.proposalEditMode = !state.proposalEditMode;
  el("#proposal-edit-hint").hidden = !state.proposalEditMode;
  renderProposal(state.proposal);
});
el("#proposal-components").addEventListener("change", updateProposalValue);
el("#proposal-basis").addEventListener("change", updateProposalValue);
el("#print-report").addEventListener("click", () => window.print());
el("#excel-report").addEventListener("click", () => exportExcel().catch(exportCsvFallback));
el("#png-export").addEventListener("click", exportPng);
el("#theme-toggle").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-mode");
  el("#theme-toggle").innerHTML = dark ? "◑ <span>Mørk</span>" : "◐ <span>Lys</span>";
  el("#theme-toggle").setAttribute("aria-label", dark ? "Byt til lys modus" : "Byt til mørk modus");
  localStorage.setItem("amf-theme", dark ? "dark" : "light");
});
el("#theme-toggle").classList.toggle("dark-active", localStorage.getItem("amf-theme") === "dark");
if (localStorage.getItem("amf-theme") === "dark") document.body.classList.add("dark-mode");
document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".navigation a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

loadWorkbookData();
