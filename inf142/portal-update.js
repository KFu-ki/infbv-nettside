(function(){
 const schedule=window.INF142_SCHEDULE||[], paths=window.INF142_PROJECT_PATHS||[];
 const main=document.querySelector('main'); if(!main)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const scheduleSection=document.createElement('section'); scheduleSection.className='wrap'; scheduleSection.id='datoar';
 scheduleSection.innerHTML=`<div class="sectionhead"><p class="eyebrow">Datoar og tider</p><h2>Undervisningsplan våren 2027</h2><p>Planen viser stadfesta INF142-aktivitetar. Endringar i TimeEdit går føre denne oversikta.</p></div><div class="schedule-tools"><label for="schedule-filter">Vis aktivitet</label><select id="schedule-filter"><option value="all">Alle</option><option value="prosjekt">Prosjektarbeid</option><option value="intern">Internkommunikasjon</option><option value="student">Studentpresentasjonar</option><option value="tur">Studietur</option><option value="refleksjon">Refleksjon og eksamen</option></select></div><ol id="schedule-list" class="schedule-list"></ol>`;
 const anchor=document.querySelector('#plan'); main.insertBefore(scheduleSection,anchor||null);
 function renderSchedule(filter='all'){document.querySelector('#schedule-list').innerHTML=schedule.filter(x=>filter==='all'||x.type===filter).map(x=>`<li><time datetime="${esc(x.date)}">${new Intl.DateTimeFormat('nn-NO',{day:'numeric',month:'long',year:'numeric'}).format(new Date(x.date+'T12:00:00'))}</time><div><strong>${esc(x.topic)}</strong><span>${esc(x.time)} · ${esc(x.room)}</span></div></li>`).join('')}
 document.querySelector('#schedule-filter').onchange=e=>renderSchedule(e.target.value); renderSchedule();
 const project=document.createElement('section'); project.className='band'; project.id='prosjektarbeid';
 project.innerHTML=`<div class="wrap"><div class="sectionhead"><p class="eyebrow">Prosjektarbeid</p><h2>Frå problem til refleksjon</h2><p>Linda sine økter 6. og 13. januar vert kopla til samarbeid, dokumentasjon og refleksjon gjennom heile semesteret.</p></div><div class="project-paths">${paths.map((p,i)=>`<details ${i===0?'open':''}><summary><span>${esc(p.date)}</span>${esc(p.title)}</summary><div class="detailbody"><ul>${p.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul><p><strong>Aktiv oppgåve:</strong> ${esc(p.task)}</p><p class="source"><strong>Kjelde:</strong> ${esc(p.source)}</p></div></details>`).join('')}</div></div>`;
 main.insertBefore(project,scheduleSection);
})();
