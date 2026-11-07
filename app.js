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
            { code: "SAL101", name: "Innføring i norsk samfunnsliv", stp: 15, sem: "26 H" },
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
            { code: "INF213", name: "Arbeidslivsrelevans gjennom praksis / Utveksling", stp: 30, sem: "28 H" }
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
    "1. Sosiale medium", "2. Nettside og nettsideutvikling", "3. Tekstproduksjon",
    "4. Mediekontakt og -handtering", "5. Strategisk kommunikasjonsplanlegging",
    "6. Rådgjeving i eigen organisasjon", "7. Intranett / internt nettverk",
    "8. Foto- og videoproduksjon", "9. Medieovervaking", "10. Visuell profil og grafisk arbeid",
    "11. Kampanjearbeid", "12. Prosjektarbeid", "13. Møteverksemd",
    "14. Generativ og praktisk KI i kommunikasjonsfaget"
];

let activeStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderStepDetails(1);
    renderSkillsGrid();
    setupEventListeners();
    updateStairVisualState(1);
});

function setupEventListeners() {
    const menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
}

function toggleMenu() {
    const drawer = document.getElementById('nav-drawer');
    drawer.classList.toggle('hidden');
}

function closeMenu() {
    const drawer = document.getElementById('nav-drawer');
    drawer.classList.add('hidden');
}

function toggleMiniStaircase() {
    const popover = document.getElementById('mini-staircase-popover');
    popover.classList.toggle('hidden');
}

function selectStep(stepNum) {
    activeStep = stepNum;
    renderStepDetails(stepNum);
    updateStairVisualState(stepNum);
    document.getElementById('mini-staircase-popover').classList.add('hidden');
}

function updateStairVisualState(stepNum) {
    const steps = document.querySelectorAll('.stair-step');

    steps.forEach((step, index) => {
        const currentStep = index + 1;
        const isActive = currentStep === stepNum;

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
        html += `
            <div onclick="openCourse('${c.code}', '${c.name.replace(/'/g, "\\'")}', ${c.stp}, '${c.sem}')" 
                 class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/60 cursor-pointer transition-all hover:bg-slate-800 group flex justify-between items-center gap-3">
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="font-mono font-bold text-xs text-amber-400 group-hover:underline">${c.code}</span>
                        ${c.stp > 0 ? `<span class="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">${c.stp} stp</span>` : ''}
                        ${c.kind ? `<span class="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">${c.kind}</span>` : ''}
                    </div>
                    <h4 class="font-medium text-sm text-slate-200 group-hover:text-white mt-1">${c.name}</h4>
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
}

function renderSkillsGrid() {
    const container = document.getElementById('skills-grid');
    let html = '';
    
    SKILLS.forEach((skill, idx) => {
        let isAI = idx === 13;
        let borderClass = isAI ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800 bg-slate-900/40';
        
        html += `
            <div class="p-4 rounded-xl border ${borderClass} hover:border-slate-700 transition-colors">
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 rounded-full ${isAI ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}"></span>
                    <h4 class="text-sm font-medium ${isAI ? 'text-amber-300 font-bold' : 'text-slate-200'}">${skill}</h4>
                </div>
                <p class="text-xs text-slate-400 mt-2">Går att som læringsutbytte og praktiske ferdigheiter i ulike emne oppover trappa.</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

function openCourse(code, name, stp, sem) {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('course-view').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.add('flex');

    const content = document.getElementById('course-detail-content');
    const courseMeta = [
        stp > 0 ? `${stp} studiepoeng` : "",
        sem ? `Semester: ${sem}` : ""
    ].filter(Boolean).join(" · ");
    const courseContent = COURSE_CONTENT[code];
    content.innerHTML = `
        <div class="border-b border-slate-800 pb-6 space-y-2">
            <div class="flex items-center space-x-3">
                <span class="font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">${code}</span>
                ${courseMeta ? `<span class="text-xs text-slate-400 font-mono">${courseMeta}</span>` : ""}
            </div>
            <h1 class="text-3xl font-serif font-bold text-slate-100">${name}</h1>
        </div>

        <div class="${courseContent ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-3"} gap-8">
            <div class="${courseContent ? "" : "lg:col-span-2 "}space-y-6">
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

            ${courseContent ? "" : `
            <div class="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800 h-fit">
                <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Relevante praksisferdigheiter</h4>
                <div class="flex flex-wrap gap-1.5">
                    <span class="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Tekstproduksjon</span>
                    <span class="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">Sosiale medium</span>
                    <span class="text-[11px] bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/20">KI i kommunikasjon</span>
                </div>
            </div>
            `}
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    document.getElementById('course-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('mini-staircase-widget').classList.add('hidden');
    document.getElementById('mini-staircase-widget').classList.remove('flex');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
