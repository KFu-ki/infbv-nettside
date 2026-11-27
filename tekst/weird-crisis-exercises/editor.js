const SOURCE = "abstract-work.md";
const KEY = "infbv-weird-abstract-work-v1";
const $ = (s) => document.querySelector(s);
let sourceText = "";
let editing = false;

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function inline(s){return esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>");}
function markdown(md){
  const out=[]; let list=null;
  const close=()=>{if(list){out.push(`</${list}>`);list=null;}};
  for(const raw of md.split(/\r?\n/)){
    const line=raw.trimEnd();
    if(!line.trim()){close(); continue;}
    let m;
    if((m=line.match(/^(#{1,3})\s+(.+)$/))){close();const n=m[1].length;out.push(`<h${n}>${inline(m[2])}</h${n}>`);continue;}
    if((m=line.match(/^>\s?(.*)$/))){close();out.push(`<blockquote><p>${inline(m[1])}</p></blockquote>`);continue;}
    if((m=line.match(/^[-*]\s+(.+)$/))){if(list!=="ul"){close();list="ul";out.push("<ul>");}out.push(`<li>${inline(m[1])}</li>`);continue;}
    if((m=line.match(/^\d+\.\s+(.+)$/))){if(list!=="ol"){close();list="ol";out.push("<ol>");}out.push(`<li>${inline(m[1])}</li>`);continue;}
    close();out.push(`<p>${inline(line)}</p>`);
  }
  close();return out.join("\n");
}
function current(){return localStorage.getItem(KEY) ?? sourceText;}
function render(){ $("#preview").innerHTML=markdown(current()); }
function setMode(on){editing=on;$("#preview").hidden=on;$("#editor-wrap").hidden=!on;$("#edit").disabled=on;$("#save").disabled=!on;$("#cancel").disabled=!on;if(on){$("#editor").value=current();$("#editor").focus();}}
function status(s){$("#status").textContent=s;}
function download(name,type,content){const a=document.createElement("a"),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),500);}
function crc32(bytes){let c=-1;for(const b of bytes){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^-1)>>>0;}
function u16(n){return new Uint8Array([n&255,(n>>>8)&255]);} function u32(n){return new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);}
function join(parts){const n=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(n);let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;}
function zip(files){const enc=new TextEncoder(),locals=[],centrals=[];let offset=0;for(const [name,text] of Object.entries(files)){const nb=enc.encode(name),data=enc.encode(text),crc=crc32(data);const local=join([u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(nb.length),u16(0),nb,data]);locals.push(local);centrals.push(join([u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(nb.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),nb]));offset+=local.length;}const central=join(centrals),end=join([u32(0x06054b50),u16(0),u16(0),u16(centrals.length),u16(centrals.length),u32(central.length),u32(offset),u16(0)]);return join([...locals,central,end]);}
function xmlText(s){return esc(s).replace(/\n/g,"</w:t></w:r></w:p><w:p><w:r><w:t xml:space=\"preserve\">");}
function docx(md){
 const plain=md.replace(/^#{1,6}\s+/gm,"").replace(/^>\s?/gm,"").replace(/\*\*|\*/g,"").replace(/`/g,"");
 const document=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="24"/></w:rPr><w:t xml:space="preserve">${xmlText(plain)}</w:t></w:r></w:p><w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1417" w:right="1417" w:bottom="1417" w:left="1417"/></w:sectPr></w:body></w:document>`;
 return zip({"[Content_Types].xml":`<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,"_rels/.rels":`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,"word/document.xml":document});
}
async function load(){try{const r=await fetch(SOURCE,{cache:"no-store"});if(!r.ok)throw new Error();sourceText=await r.text();render();status(localStorage.getItem(KEY)?"Viser lokalt lagra versjon.":"Viser arbeidsmanuset frå repoet.");}catch{status("Kunne ikkje hente arbeidsmanuset.");}}
$("#edit").onclick=()=>setMode(true);
$("#save").onclick=()=>{localStorage.setItem(KEY,$("#editor").value);setMode(false);render();status("Endringane er lagra lokalt i denne nettlesaren.");};
$("#cancel").onclick=()=>{setMode(false);status("Redigeringa vart avbroten.");};
$("#reset").onclick=()=>{if(confirm("Fjerne lokale endringar og vise repo-versjonen?")){localStorage.removeItem(KEY);render();status("Lokale endringar er fjerna.");}};
$("#download-md").onclick=()=>download("weird-crisis-exercises.md","text/markdown;charset=utf-8",current());
$("#download-docx").onclick=()=>download("weird-crisis-exercises.docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",docx(current()));
$("#print-pdf").onclick=()=>window.print();
load();
