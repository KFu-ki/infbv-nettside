// INFBV Data Model: Emne, Trinn og 14 Ferdigheiter

const STAGES = {
    1: {
        title: "Trinn 1: Nybyrjar",
        dreyfus: "Nybyrjar (Benner, 1984)",
        desc: "Klasseromsundervisning med døme, enkle øvingar og introduksjon av teori. Lære faglege omgrep og introdusere modellar.",
        level: "Bachelor (År 1)",
        color: "amber",
        courses: [
            { code: "INF131", name: "PR og kommunikasjon 1: Innføring med praktiske øvingar", stp: 15, sem: "26 H" },
            { code: "SAJ101", name: "Innføring i norsk samfunnsliv", stp: 15, sem: "26 H" },
            { code: "INF142", name: "Arbeidsliv og kommunikasjon i praksis", stp: 10, sem: "27 V" },
            { code: "KOM102", name: "Journalistiske metodar i kommunikasjonsarbeid", stp: 10, sem: "27 V" },
            { code: "MEV131", name: "Medievitskap 1 — Medium, offentlegheit og ytringsfridom", stp: 10, sem: "27 V" }
        ]
    },
    2: {
        title: "Trinn 2: Avansert nybyrjar",
        dreyfus: "Avansert nybyrjar (Benner, 1984)",
        desc: "Situasjonsbestemte døme der studentane kjenner mønster eller modellar. Skriveøvingar, prosjektarbeid, bransjeseminar, ekskursjonar og øvingar med eksterne oppdragsgjevarar.",
        level: "Bachelor (År 2)",
        color: "amber",
        courses: [
            { code: "KOM201", name: "Crisis Communication", stp: 10, sem: "27 H" },
            { code: "KOM202", name: "Kommunikasjonsprosjekt", stp: 10, sem: "27 H" },
            { code: "MEV132", name: "Medievitskap 2 — Media, kommunikasjon og makt", stp: 10, sem: "27 H" }
        ]
    },
    3: {
        title: "Trinn 3: Kompetent",
        dreyfus: "Kompetent (Benner, 1984)",
        desc: "Enkeltoppgåver som inngår i ein heilskap. Studentane vert plasserte i eksterne praksisplassar basert på konkrete oppgåver og reflekterer rundt eigne ferdigheiter.",
        level: "Bachelor (År 3)",
        color: "amber",
        courses: [
            { code: "INF211", name: "PR og kommunikasjon 3: Samfunnskommunikasjon og CSR", stp: 15, sem: "28 V" },
            { code: "MEV221", name: "Medievitskap 3 — Frå fag til forsking: Korleis analysere medium", stp: 15, sem: "28 V" },
            { code: "INF213", name: "Arbeidslivsrelevans gjennom praksis / Internasjonalisering/utveksling", stp: 30, sem: "28 H" }
        ]
    },
    4: {
        title: "Trinn 4: Dyktig",
        dreyfus: "Dyktig (Benner, 1984)",
        desc: "Første studieår i Master in Media Practices (120 studiepoeng over to år) kombinerer avansert kunnskap om mediefag med profesjonell mediepraksis. Studentane arbeider med forteljing, representasjon, retorikk og medieprofesjonar, og vel praktiske eller faglege valemne.",
        level: "Master · år 1 av 2",
        color: "indigo",
        courses: [
            { code: "MMP301", name: "Storytelling, Representation and Rhetoric", stp: 0, sem: "" },
            { code: "MMP302", name: "Media, Professions and Society", stp: 0, sem: "" },
            { code: "MMP303", name: "Undersøkande journalistikk", kind: "Valemne", stp: 0, sem: "" },
            { code: "MMP308", name: "Media Producing", kind: "Valemne", stp: 0, sem: "" },
            { code: "MMP309", name: "Professional Media Practice", kind: "Valemne", stp: 0, sem: "" },
            { code: "MMP310", name: "Web Documentary", kind: "Valemne", stp: 0, sem: "" },
            { code: "MMP311", name: "Risk Communication and Issue Management", kind: "Valemne", stp: 0, sem: "" },
            { code: "MMP317", name: "Design Strategies and Concepts", kind: "Valemne", stp: 0, sem: "" },
            { code: "IPA302", name: "Process Facilitating", kind: "Valemne · anna masterprogram", stp: 0, sem: "" },
            { code: "IPA303", name: "Public Sector Leadership and Communication", kind: "Valemne · anna masterprogram", stp: 0, sem: "" }
        ]
    },
    5: {
        title: "Trinn 5: Ekspert og taus kunnskap",
        dreyfus: "Ekspert / Tacit Knowledge (Benner, 1984)",
        desc: "Andre studieår legg vekt på forskingsdesign, metode og eit sjølvstendig akademisk arbeid om eit sjølvvalt medietema. Masteroppgåva blir rettleidd og skal følgje forskingsetiske normer. Programmet utviklar avansert mediekunnskap, profesjonell produksjon og evne til sjølvstendig analyse og innovasjon.",
        level: "Master · år 2 av 2",
        color: "indigo-amber",
        courses: [
            { code: "MMP312", name: "Research Design and Methods", stp: 0, sem: "" },
            { code: "MMP313", name: "Project Based Master Thesis", kind: "Eitt av to alternativ", stp: 0, sem: "" },
            { code: "MMP314", name: "Written Master Thesis", kind: "Eitt av to alternativ", stp: 0, sem: "" }
        ]
    }
};

const COURSE_CONTENT = {
    MMP301: "Obligatorisk emne i Master in Media Practices. Emneplanen løftar fram forteljing, representasjon og retorikk som sentrale delar av mediefagleg kompetanse.",
    MMP302: "Obligatorisk emne om medieprofesjonar og samfunn. Masterplanen legg vekt på samfunnsrolla til media, profesjonelle tradisjonar og kva som skil ulike medieyrke.",
    MMP303: "Valemne i undersøkande journalistikk.",
    MMP308: "Valemne i medieproduksjon.",
    MMP309: "Valemne i profesjonell mediepraksis.",
    MMP310: "Valemne i webdokumentar.",
    MMP311: "Valemne i risikokommunikasjon og problemhandtering.",
    MMP317: "Valemne i designstrategiar og konseptutvikling.",
    IPA302: "Valemne frå eit anna masterprogram: prosessleiing og fasilitering. Emneval kan vere avgrensa.",
    IPA303: "Valemne frå eit anna masterprogram: leiing og kommunikasjon i offentleg sektor. Emneval kan vere avgrensa.",
    MMP312: "Emne i forskingsdesign og metodar som førebur studenten på eit sjølvstendig akademisk prosjekt om eit sjølvvalt medietema.",
    MMP313: "Prosjektbasert masteroppgåve. Eitt av to oppgåvealternativ; oppgåva blir rettleidd og skal følgje forskingsetiske normer.",
    MMP314: "Skriftleg masteroppgåve. Eitt av to oppgåvealternativ; oppgåva blir rettleidd og skal følgje forskingsetiske normer."
};

const SKILLS = [
    { name: "Sosiale medium", description: "Startar med enkel publisering og innhaldsforståing, og blir vidareutvikla gjennom kommunikasjonsprosjekt og praksis.", courses: ["INF131", "KOM202", "INF211", "INF213"] },
    { name: "Nettside og nettsideutvikling", description: "Grunnleggjande nettinnhald kjem tidleg; webdokumentar og sjølvstendig produksjon gir rom for meir avansert arbeid.", courses: ["INF131", "KOM202", "INF213", "MMP310"] },
    { name: "Tekstproduksjon", description: "Frå korte tekstar og journalistiske metodar til målretta, strategisk og sjølvstendig medietekst.", courses: ["INF131", "KOM102", "KOM202", "INF211", "MMP301", "MMP303"] },
    { name: "Mediekontakt og -handtering", description: "Introduksjon til kontakt med medium blir bygd vidare gjennom journalistiske metodar og krisekommunikasjon.", courses: ["INF131", "KOM102", "KOM201", "INF211", "INF213"] },
    { name: "Strategisk kommunikasjonsplanlegging", description: "Planlegging og målgruppeforståing blir utvikla i prosjekt og krisekommunikasjon, og får fordjuping i risikokommunikasjon og leiing.", courses: ["KOM102", "KOM201", "KOM202", "INF211", "MMP311", "IPA303"] },
    { name: "Rådgjeving i eigen organisasjon", description: "Rådgjeving krev at studentane kan bruke fagleg skjønn i ein verkeleg organisasjon; hovudvekta er difor på bachelorpraksis og arbeidslivsretta emne.", courses: ["INF211", "INF213"] },
    { name: "Intranett / internt nettverk", description: "Arbeid med intern kommunikasjon høyrer særleg heime i organisasjonsretta prosjekt og praksis.", courses: ["KOM202", "INF211", "INF213"] },
    { name: "Foto- og videoproduksjon", description: "Praktisk produksjon blir introdusert gjennom øvingar og får fordjuping i valemna Media Producing og Web Documentary.", courses: ["INF131", "MMP308", "MMP310", "INF213"] },
    { name: "Medieovervaking", description: "Studentane går frå å finne og vurdere kjelder til å følgje mediebilete og analysere risiko og problemstillingar.", courses: ["KOM102", "KOM201", "INF211", "MMP303", "MMP311"] },
    { name: "Visuell profil og grafisk arbeid", description: "Visuell formgiving blir øvd i praktiske emne og vidareutvikla i medieproduksjon og designstrategiar.", courses: ["INF131", "KOM202", "MMP308", "MMP310", "MMP317"] },
    { name: "Kampanjearbeid", description: "Kampanjearbeid byggjer på tekst, målgruppe og planlegging; hovudvekta er på prosjekt- og kommunikasjonsarbeid i bachelorløpet.", courses: ["INF131", "KOM201", "KOM202", "INF211", "INF213"] },
    { name: "Prosjektarbeid", description: "Prosjektarbeid går frå korte øvingar og samarbeid til sjølvstendig profesjonell produksjon og masterprosjekt.", courses: ["INF131", "INF142", "KOM202", "INF213", "MMP308", "MMP309", "MMP310", "MMP313", "MMP314"] },
    { name: "Møteverksemd", description: "Møte og samarbeid blir øvd i prosjekt og praksis, og får ei meir spesialisert kopling til valemnet Process Facilitating.", courses: ["INF142", "KOM201", "KOM202", "INF211", "INF213", "IPA302"] },
    { name: "Generativ og praktisk KI i kommunikasjonsfaget", description: "KI-verktøy kan prøvast tidleg som støtte i praktisk arbeid, med aukande krav til kritisk kjeldebruk, etikk og sjølvstendige faglege val.", courses: ["INF131", "KOM102", "KOM202", "INF211", "INF213"] }
];

let activeStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderStepDetails(1);
    renderSkillsGrid();
    setupEventListeners();
    setupThemeToggle();
    updateStairVisualState(1);
});

function setupEventListeners() {
    const menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    const staircaseWidget = document.getElementById('mini-staircase-widget');
    if (staircaseWidget) {
        staircaseWidget.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMiniStaircasePopover();
            }
        });
    }

    document.querySelectorAll('.stair-step').forEach((step, index) => {
        step.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectStep(index + 1);
            }
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const drawer = document.getElementById('nav-drawer');
            const popover = document.getElementById('mini-staircase-popover');
            if (!drawer.classList.contains('hidden')) closeMenu();
            if (!popover.classList.contains('hidden')) closeMiniStaircasePopover(true);
        }
    });
}

function setupThemeToggle() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const label = document.getElementById('theme-toggle-label');
    const icon = document.getElementById('theme-toggle-icon');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const applyTheme = theme => {
        const isLight = theme === 'light';
        document.documentElement.dataset.theme = theme;
        button.setAttribute('aria-checked', String(isLight));
        button.title = `Slå på ${isLight ? 'mørkt' : 'lyst'} tema`;
        icon.innerHTML = isLight
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42M3 12h2m14 0h2M5.64 18.36l1.42-1.42m9.88-9.88 1.42-1.42M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.9 13.2A8.5 8.5 0 0 1 10.8 3.1 8.5 8.5 0 1 0 20.9 13.2Z"></path>';
        if (themeColor) themeColor.content = isLight ? '#f6f5f1' : '#020617';
    };

    applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        try {
            localStorage.setItem('infbv-theme', nextTheme);
        } catch (error) {
            // Theme changes still work for this visit when browser storage is unavailable.
        }
    });
}

function toggleMenu() {
    const drawer = document.getElementById('nav-drawer');
    const isOpening = drawer.classList.contains('hidden');
    drawer.classList.toggle('hidden', !isOpening);
    drawer.setAttribute('aria-hidden', String(!isOpening));
    document.getElementById('menu-toggle').setAttribute('aria-expanded', String(isOpening));
    if (isOpening) drawer.querySelector('button').focus();
}

function closeMenu() {
    const drawer = document.getElementById('nav-drawer');
    drawer.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    document.getElementById('menu-toggle').focus();
}

function toggleMiniStaircasePopover() {
    const popover = document.getElementById('mini-staircase-popover');
    if (popover.classList.contains('hidden')) {
        popover.classList.remove('hidden');
        popover.setAttribute('aria-hidden', 'false');
        document.getElementById('mini-staircase-widget').setAttribute('aria-expanded', 'true');
        popover.querySelector('button').focus();
    } else {
        closeMiniStaircasePopover(true);
    }
}

function closeMiniStaircasePopover(restoreFocus = false) {
    const popover = document.getElementById('mini-staircase-popover');
    popover.classList.add('hidden');
    popover.setAttribute('aria-hidden', 'true');
    const widget = document.getElementById('mini-staircase-widget');
    widget.setAttribute('aria-expanded', 'false');
    if (restoreFocus && !widget.classList.contains('hidden')) widget.focus();
}

function selectStep(stepNum) {
    const courseViewWasOpen = !document.getElementById('course-view').classList.contains('hidden');
    activeStep = stepNum;
    renderStepDetails(stepNum);
    updateStairVisualState(stepNum);
    if (courseViewWasOpen) {
        showHome();
    } else {
        closeMiniStaircasePopover(true);
    }
}

function updateStairVisualState(stepNum) {
    const steps = document.querySelectorAll('.stair-step');

    steps.forEach((step, index) => {
        const currentStep = index + 1;
        const isActive = currentStep === stepNum;

        step.setAttribute('aria-pressed', String(isActive));
        step.classList.toggle('ring-2', isActive);
        step.classList.toggle('ring-amber-300', isActive && stepNum !== 4 && stepNum !== 5);
        step.classList.toggle('ring-indigo-300', isActive && (stepNum === 4 || stepNum === 5));
        step.classList.toggle('ring-offset-2', isActive);
        step.classList.toggle('ring-offset-slate-950', isActive);
        step.classList.toggle('scale-[1.02]', isActive);
        step.classList.toggle('-translate-y-1', isActive);
        step.classList.toggle('shadow-2xl', isActive);
        step.classList.toggle('border-amber-400/80', isActive && stepNum !== 4 && stepNum !== 5);
        step.classList.toggle('border-indigo-400/80', isActive && (stepNum === 4 || stepNum === 5));
        step.classList.toggle('opacity-100', true);
        step.classList.toggle('opacity-80', !isActive);

        const label = step.querySelector('.current-step-badge');
        if (label) {
            label.classList.toggle('hidden', !isActive);
        }

        const title = step.querySelector('h3');
        if (title) {
            title.classList.toggle('text-amber-200', isActive && stepNum !== 4 && stepNum !== 5);
            title.classList.toggle('text-indigo-200', isActive && (stepNum === 4 || stepNum === 5));
        }
    });
}

function renderStepDetails(stepNum) {
    const stage = STAGES[stepNum];
    const container = document.getElementById('step-details-container');
    
    let isMaster = stage.color.includes('indigo');
    let badgeBg = isMaster ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

    let html = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-2">
            <div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${badgeBg} mb-2">
                    ${stage.level}
                </span>
                <h2 class="text-2xl font-serif font-bold text-slate-100">${stage.title}</h2>
            </div>
            <span class="text-xs text-slate-400 font-mono">Dreyfus: ${stage.dreyfus}</span>
        </div>

        <p class="text-slate-300 text-sm leading-relaxed max-w-4xl">${stage.desc}</p>

        <div class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    stage.courses.forEach(c => {
        const courseSkills = SKILLS.filter(skill => skill.courses.includes(c.code));
        html += `
            <div data-open-course="${c.code}" role="button" tabindex="0"
                 class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/60 cursor-pointer transition-all hover:bg-slate-800 group flex justify-between items-center gap-3">
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="font-mono font-bold text-xs text-amber-400 group-hover:underline">${c.code}</span>
                        ${c.stp > 0 ? `<span class="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">${c.stp} stp</span>` : ''}
                        ${c.kind ? `<span class="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">${c.kind}</span>` : ''}
                    </div>
                    <h4 class="font-medium text-sm text-slate-200 group-hover:text-white mt-1">${c.name}</h4>
                    ${courseSkills.length ? `<div class="mt-2 flex flex-wrap gap-1">${courseSkills.map(skill => `<span class="rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] text-slate-400">${skill.name}</span>`).join("")}</div>` : ""}
                </div>
                <svg class="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
    container.querySelectorAll("[data-open-course]").forEach(card => {
        const open = () => {
            const course = stage.courses.find(item => item.code === card.dataset.openCourse);
            if (course) openCourse(course.code, course.name, course.stp, course.sem);
        };
        card.addEventListener("click", open);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open();
            }
        });
    });
}

function renderSkillsGrid() {
    const container = document.getElementById('skills-grid');
    container.innerHTML = SKILLS.map((skill, index) => {
        const groups = Object.entries(STAGES).map(([step, stage]) => ({
            step,
            courses: stage.courses.filter(course => skill.courses.includes(course.code))
        })).filter(group => group.courses.length);
        const isAI = index === 13;
        const borderClass = isAI ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800 bg-slate-900/40';
        const stages = groups.map(group => `<span class="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">Trinn ${group.step}</span>`).join("");
        const courses = groups.map(group => `
            <div class="mt-2">
                <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Trinn ${group.step}</p>
                <div class="mt-1 flex flex-wrap gap-1">${group.courses.map(course => `<button type="button" data-skill-course="${course.code}" class="rounded border border-slate-700 bg-slate-950/70 px-1.5 py-1 text-[10px] text-amber-200 hover:border-amber-400">${course.code}</button>`).join("")}</div>
            </div>`).join("");

        return `
            <article class="rounded-xl border p-4 ${borderClass}">
                <div class="flex items-start gap-2">
                    <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full ${isAI ? 'bg-amber-400' : 'bg-slate-500'}"></span>
                    <div class="min-w-0">
                        <h3 class="text-sm font-semibold ${isAI ? 'text-amber-300' : 'text-slate-200'}">${index + 1}. ${skill.name}</h3>
                        <p class="mt-2 text-xs leading-relaxed text-slate-400">${skill.description}</p>
                        <div class="mt-3 flex flex-wrap gap-1">${stages}</div>
                        ${courses}
                    </div>
                </div>
            </article>`;
    }).join("");

    container.querySelectorAll("[data-skill-course]").forEach(button => {
        button.addEventListener("click", () => {
            const course = Object.values(STAGES).flatMap(stage => stage.courses)
                .find(item => item.code === button.dataset.skillCourse);
            if (course) openCourse(course.code, course.name, course.stp, course.sem);
        });
    });
}

function openCourse(code, name, stp, sem) {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('course-view').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.add('flex');
    document.getElementById('mini-staircase-widget').setAttribute('aria-hidden', 'false');

    const content = document.getElementById('course-detail-content');
    const courseMeta = [
        stp > 0 ? `${stp} studiepoeng` : "",
        sem ? `Semester: ${sem}` : ""
    ].filter(Boolean).join(" · ");
    const courseContent = COURSE_CONTENT[code];
    const courseSkills = SKILLS.filter(skill => skill.courses.includes(code));
    content.innerHTML = `
        <div class="border-b border-slate-800 pb-6 space-y-2">
            <div class="flex items-center space-x-3">
                <span class="font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">${code}</span>
                ${courseMeta ? `<span class="text-xs text-slate-400 font-mono">${courseMeta}</span>` : ""}
            </div>
            <h1 class="text-3xl font-serif font-bold text-slate-100">${name}</h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-2">Om emnet og læringsutbytte</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">${courseContent || "Emnet inngår i kompetansetrappa ved Høgskulen i Volda og byggjer vidare på fagleg kunnskap og praktiske ferdigheiter."}</p>
                </div>

                ${courseContent ? "" : `
                <div class="space-y-4">
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-amber-400">Læringsressursar</h3>

                    <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-4">
                        <div class="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.1-2.84A1.5 1.5 0 0010 9.5v5a1.5 1.5 0 001.652 1.472l3.1-2.84a1.5 1.5 0 000-2.464z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                        </div>
                        <div>
                            <h4 class="text-sm font-semibold text-slate-200">Forelesingsvideo: Introduksjon til emnet</h4>
                            <p class="text-xs text-slate-400 mt-0.5">Video / 45 min · Høgskulen i Volda Medielab</p>
                            <a href="#" class="text-xs text-amber-400 hover:underline mt-2 inline-block">Spel av forelesing →</a>
                        </div>
                    </div>

                    <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-4">
                        <div class="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V7.5L14.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 3v5h5"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6M9 16h6"></path></svg>
                        </div>
                        <div>
                            <h4 class="text-sm font-semibold text-slate-200">Pensum og artikkelsamling (PDF)</h4>
                            <p class="text-xs text-slate-400 mt-0.5">PDF-dokument · 2.4 MB</p>
                            <a href="#" class="text-xs text-emerald-400 hover:underline mt-2 inline-block">Laste ned kompendium →</a>
                        </div>
                    </div>
                </div>
                `}
            </div>

            <div class="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800 h-fit">
                <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Foreslåtte praksisferdigheiter</h4>
                ${courseSkills.length
                    ? `<div class="flex flex-wrap gap-1.5">${courseSkills.map(skill => `<span class="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">${skill.name}</span>`).join("")}</div>`
                    : '<p class="text-xs leading-relaxed text-slate-400">Ingen praksisferdigheiter er kopla til dette emnet i framlegget enno.</p>'}
            </div>
        </div>
    `;

    const courseHeading = content.querySelector('h1');
    if (courseHeading) {
        courseHeading.tabIndex = -1;
        courseHeading.focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    const courseViewWasOpen = !document.getElementById('course-view').classList.contains('hidden');
    document.getElementById('course-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.add('hidden');
    document.getElementById('mini-staircase-widget').classList.remove('flex');
    document.getElementById('mini-staircase-widget').setAttribute('aria-hidden', 'true');
    closeMiniStaircasePopover(false);
    if (courseViewWasOpen) {
        document.querySelector('.stair-step[aria-pressed="true"]')?.focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
