/**
 * CRP Badalona · Sincronització de Google Sheets a GitHub Pages.
 * Vinculeu aquest script al full de càlcul mestre.
 * Script Properties: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN, GITHUB_BRANCH (opcional, main).
 * El token ha de ser fine-grained, limitat al repositori i amb Contents: Read and write.
 * No afegiu mai el token al full, al repositori ni al JSON públic.
 */
const SHEET_NAME = 'Catàleg mestre';
const OUTPUT_PATH = 'data/catalog.json';
const PUBLIC_STATUS = 'Publicat';
const FIELDS = [
 'ID','Tipus','Nom','Finalitat principal','Finalitats secundàries','Etapes',
 'Àrees / contextos','Moment didàctic','Durada orientativa','Descripció breu',
 'Pas 1','Pas 2','Pas 3','Pas 4','Preguntes guia','Exemple Infantil',
 'Exemple Primària','Exemple ESO','Exemple Batxillerat / FP','Suports DUA',
 'Evidències observables','Font / autoria','URL font','URL plantilla editable',
 'URL PDF','URL imatge','Paraules clau','Llicència / drets'
];
function onOpen(){
 SpreadsheetApp.getUi().createMenu('Publicació web')
  .addItem('Comprovar fitxes publicables','previewPublication')
  .addItem('Publicar catàleg a GitHub','publishCatalog')
  .addToUi();
}
function getPublicRecords_(){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 if(!sheet)throw new Error('No existeix el full: '+SHEET_NAME);
 const values=sheet.getDataRange().getDisplayValues();
 if(values.length<2)return [];
 const headers=values[0].map(v=>v.trim());
 ['ID','Nom','Estat'].forEach(h=>{if(!headers.includes(h))throw new Error('Falta la columna '+h)});
 const statusIndex=headers.indexOf('Estat');
 const seen=new Set();
 return values.slice(1).filter(row=>row[statusIndex].trim()===PUBLIC_STATUS).map(row=>{
  const record={};FIELDS.forEach(field=>{const idx=headers.indexOf(field);if(idx>=0)record[field]=row[idx]||''});
  if(!record.ID||!record.Nom)throw new Error('Una fitxa publicada no té ID o nom');
  if(seen.has(record.ID))throw new Error('ID duplicat: '+record.ID);
  seen.add(record.ID);return record;
 });
}
function previewPublication(){
 const rows=getPublicRecords_();
 SpreadsheetApp.getUi().alert('Fitxes preparades per publicar: '+rows.length+'\nNo s’ha modificat GitHub.');
}
function publishCatalog(){
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(30000))throw new Error('Ja hi ha una publicació en curs');
 try{
  const props=PropertiesService.getScriptProperties();
  const owner=props.getProperty('GITHUB_OWNER');
  const repo=props.getProperty('GITHUB_REPO');
  const token=props.getProperty('GITHUB_TOKEN');
  const branch=props.getProperty('GITHUB_BRANCH')||'main';
  if(!owner||!repo||!token)throw new Error('Configura GITHUB_OWNER, GITHUB_REPO i GITHUB_TOKEN a Script Properties');
  if(!/^[\w.-]+$/.test(owner)||!/^[\w.-]+$/.test(repo)||!/^[\w./-]+$/.test(branch))throw new Error('Nom de repositori o branca no vàlid');
  const records=getPublicRecords_();
  const ui=SpreadsheetApp.getUi();
  const confirmation=ui.alert('Publicar catàleg', 'S’actualitzaran '+records.length+' fitxes públiques a GitHub. Continuar?',ui.ButtonSet.YES_NO);
  if(confirmation!==ui.Button.YES)return;
  const payload={schemaVersion:1,mode:'production',generatedAt:new Date().toISOString(),items:records};
  const api='https://api.github.com/repos/'+encodeURIComponent(owner)+'/'+encodeURIComponent(repo)+'/contents/'+OUTPUT_PATH;
  const headers={Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
  const query='?ref='+encodeURIComponent(branch);
  const get=UrlFetchApp.fetch(api+query,{method:'get',headers,muteHttpExceptions:true});
  let sha;
  if(get.getResponseCode()===200)sha=JSON.parse(get.getContentText()).sha;
  else if(get.getResponseCode()!==404)throw new Error('GitHub GET: '+get.getResponseCode()+' '+get.getContentText().slice(0,250));
  const content=Utilities.base64Encode(Utilities.newBlob(JSON.stringify(payload,null,2),'application/json').getBytes());
  const body={message:'Actualitza catàleg públic des de Google Sheets',content,branch};
  if(sha)body.sha=sha;
  const put=UrlFetchApp.fetch(api,{method:'put',headers,contentType:'application/json',payload:JSON.stringify(body),muteHttpExceptions:true});
  if(![200,201].includes(put.getResponseCode()))throw new Error('GitHub PUT: '+put.getResponseCode()+' '+put.getContentText().slice(0,250));
  ui.alert('Publicació completada: '+records.length+' fitxes. GitHub Pages pot trigar uns minuts a actualitzar-se.');
 }finally{lock.releaseLock()}
}
