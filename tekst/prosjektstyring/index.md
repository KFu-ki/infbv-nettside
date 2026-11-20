---
title: Prosjektstyring for tekst
---

# Prosjektstyring for tekst

Fristane byggjer på dei aktuelle utlysingane. Statusen kan oppdaterast lokalt i nettlesaren.

<div id="project-dashboard" aria-live="polite"></div>

<script>
const projects = [
  {
    priority: 1,
    title: "Totalforsvarsåret 2026",
    slug: "/tekst/totalforsvarsaret-2026/",
    deadline: null,
    deadlineLabel: "Ikkje fastsett",
    status: "yellow",
    review: "/docs/peer-review/totalforsvarsaret-2026/"
  },
  {
    priority: 2,
    title: "Klima og berekraft",
    slug: "/tekst/klima-og-berekraft/",
    deadline: "2026-12-01",
    deadlineLabel: "1. desember 2026",
    status: "yellow",
    review: "/docs/peer-review/klima-og-berekraft/"
  },
  {
    priority: 3,
    title: "Weird Crisis Exercises",
    slug: "/tekst/weird-crisis-exercises/",
    deadline: "2027-03-17",
    deadlineLabel: "Tidlegfrist 17. mars 2027. Endeleg frist 19. april 2027",
    status: "yellow",
    review: "/docs/peer-review/weird-crisis-exercises/"
  }
];

const labels = {
  red: "Forseinka eller kritisk",
  yellow: "Arbeid pågår",
  green: "Klar for neste steg",
  submitted: "Sendt inn",
  white: "Ikkje prioritert no"
};

const key = "infbv-project-status-v1";
const saved = JSON.parse(localStorage.getItem(key) || "{}");

function localDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysRemaining(value) {
  const due = localDate(value);
  if (!due) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((due - today) / 86400000);
}

function deadlineText(project) {
  const days = daysRemaining(project.deadline);
  if (days === null) return project.deadlineLabel;
  if (days < 0) return `${project.deadlineLabel}, ${Math.abs(days)} dagar forseinka`;
  if (days === 0) return `${project.deadlineLabel}, frist i dag`;
  return `${project.deadlineLabel}, ${days} dagar att`;
}

function render() {
  const target = document.querySelector("#project-dashboard");
  const ordered = [...projects].sort((a, b) => {
    if (!a.deadline && !b.deadline) return a.priority - b.priority;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return localDate(a.deadline) - localDate(b.deadline);
  });

  target.innerHTML = ordered.map(project => {
    const status = saved[project.slug] || project.status;
    return `
      <article class="project-card">
        <h2><a href="${project.slug}">${project.title}</a></h2>
        <p><strong>Frist:</strong> ${deadlineText(project)}</p>
        <p><strong>Status:</strong> ${labels[status]}</p>
        <label>
          Oppdater status
          <select data-project="${project.slug}">
            ${Object.entries(labels).map(([value, label]) =>
              `<option value="${value}" ${value === status ? "selected" : ""}>${label}</option>`
            ).join("")}
          </select>
        </label>
        <p><a href="${project.review}">Opne fagfellekontrollen</a></p>
      </article>
    `;
  }).join("");

  target.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", event => {
      saved[event.target.dataset.project] = event.target.value;
      localStorage.setItem(key, JSON.stringify(saved));
      render();
    });
  });
}

render();
</script>
