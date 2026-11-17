(() => {
    const STORAGE_KEY = 'infbv-language';
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('lang');
    let currentLanguage = requested === 'en' || requested === 'nn'
        ? requested
        : (localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'nn');

    const originals = {
        stages: {
            4: JSON.parse(JSON.stringify(STAGES[4])),
            5: JSON.parse(JSON.stringify(STAGES[5]))
        },
        mmp311: COURSE_CONTENT.MMP311
    };

    const english = {
        4: {
            title: 'Level 4: Proficient',
            dreyfus: 'Proficient (Benner, 1984)',
            desc: 'The first year of the Master in Media Practices combines advanced media knowledge with professional media practice. Students study storytelling, representation, rhetoric and media professions, and choose practical or academic electives.',
            level: "Master's programme · year 1 of 2"
        },
        5: {
            title: 'Level 5: Expertise and tacit knowledge',
            dreyfus: 'Expert / Tacit Knowledge (Benner, 1984)',
            desc: 'The second year focuses on research design, methods and an independent academic project on a self-selected media topic. The supervised master’s thesis follows research ethics standards and develops advanced media knowledge, professional production, independent analysis and innovation.',
            level: "Master's programme · year 2 of 2"
        },
        mmp311: 'Elective course in risk communication and issue management. English learning resources, readings and models will be added to the course page.'
    };

    function setText(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function updateStaticInterface(language) {
        const isEnglish = language === 'en';
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.textContent = isEnglish ? 'NN' : 'EN';
            toggle.lang = isEnglish ? 'nn' : 'en';
            toggle.setAttribute('aria-label', isEnglish ? 'Byt til nynorsk' : 'Switch to English');
            toggle.title = isEnglish ? 'Byt til nynorsk' : 'Switch to English';
        }
        setText('#mini-staircase-widget > span', isEnglish ? 'Competency staircase:' : 'Kompetansetrapp:');
        setText('#mini-staircase-popover h4', isEnglish ? 'Quick navigation in the staircase' : 'Hurtignavigasjon i trappa');
        const level4 = document.querySelector('#mini-staircase-popover button[onclick="selectStep(4)"] span');
        const level5 = document.querySelector('#mini-staircase-popover button[onclick="selectStep(5)"] span');
        if (level4) level4.textContent = isEnglish ? 'Level 4: Proficient' : 'Trinn 4: Dyktig';
        if (level5) level5.textContent = isEnglish ? 'Level 5: Expert' : 'Trinn 5: Ekspert';
    }

    function applyLanguage(language, options = {}) {
        const isEnglish = language === 'en';
        currentLanguage = language;
        document.documentElement.lang = language;
        localStorage.setItem(STORAGE_KEY, language);

        Object.assign(STAGES[4], isEnglish ? english[4] : originals.stages[4]);
        Object.assign(STAGES[5], isEnglish ? english[5] : originals.stages[5]);
        COURSE_CONTENT.MMP311 = isEnglish ? english.mmp311 : originals.mmp311;
        updateStaticInterface(language);

        if (isEnglish && options.moveToMaster && activeStep < 4) activeStep = 4;
        renderStepDetails(activeStep);

        const url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        history.replaceState({}, '', url);
    }

    window.toggleLanguage = () => applyLanguage(currentLanguage === 'en' ? 'nn' : 'en', { moveToMaster: true });

    document.addEventListener('DOMContentLoaded', () => {
        applyLanguage(currentLanguage, { moveToMaster: requested === 'en' });
    });
})();
