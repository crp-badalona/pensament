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
 'URL PDF','URL PDF secundària','URL imatge','Paraules clau','Llicència / drets'
];
function onOpen(){
 SpreadsheetApp.getUi().createMenu('Publicació web')
  .addItem('Comprovar fitxes publicables','previewPublication')
  .addItem('Publicar catàleg a GitHub','publishCatalog')
  .addToUi();
}
/** Valida tot el lot abans de fer cap petició a GitHub.
 * Els enllaços a materials són opcionals: una fitxa pròpia pot no tenir PDF.
 * «Validada» acredita la revisió editorial, inclosos fonts, etapes i drets.
 * No es modifica automàticament cap estat del full.
 */
function getPublicRecords_(){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 if(!sheet)throw new Error('No existeix el full: '+SHEET_NAME);
 const values=sheet.getDataRange().getDisplayValues();
 if(!values.length)throw new Error('El catàleg no té capçaleres');
 const headers=values[0].map(v=>String(v).trim());
 const requiredHeaders=[...FIELDS.filter(h=>h!=='URL PDF secundària'), 'Estat','Revisió pedagògica','Data revisió'];
 requiredHeaders.forEach(h=>{
  if(!headers.includes(h))throw new Error('Falta la columna '+h);
  if(headers.indexOf(h)!==headers.lastIndexOf(h))throw new Error('Columna duplicada: '+h);
 });
 const records=[];const errors=[];const seen=new Set();
 values.slice(1).forEach((row,index)=>{
  const value=h=>String(row[headers.indexOf(h)]||'').trim();
  if(value('Estat')!==PUBLIC_STATUS)return;
  const label='Fila '+(index+2)+' ('+(value('ID')||'sense ID')+')';
  const fail=msg=>errors.push(label+': '+msg);
  if(value('Revisió pedagògica')!=='Validada')fail('cal Revisió pedagògica = Validada');
  const required=['ID','Tipus','Nom','Finalitat principal','Etapes','Descripció breu',
   'Pas 1','Pas 2','Pas 3','Pas 4','Preguntes guia','Suports DUA',
   'Evidències observables','Font / autoria','Llicència / drets'];
  required.forEach(h=>{if(!value(h))fail('falta '+h)});
  if(value('Tipus')&&!['Rutina','Destresa'].includes(value('Tipus')))fail('Tipus no vàlid');
  if(value('ID')&&seen.has(value('ID')))fail('ID duplicat');
  if(value('ID'))seen.add(value('ID'));
  const examples={'Infantil':'Exemple Infantil','Primària':'Exemple Primària',
   'ESO':'Exemple ESO','Batxillerat':'Exemple Batxillerat / FP','FP':'Exemple Batxillerat / FP'};
  value('Etapes').split(';').map(s=>s.trim()).filter(Boolean).forEach(stage=>{
   if(!examples[stage])fail('etapa no reconeguda: '+stage);
   else if(!value(examples[stage]))fail('falta '+examples[stage]);
  });
  const date=value('Data revisió');
  const iso=date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const local=date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const parts=iso?[+iso[1],+iso[2],+iso[3]]:local?[+local[3],+local[2],+local[1]]:null;
  const parsed=parts?new Date(Date.UTC(parts[0],parts[1]-1,parts[2])):null;
  if(!parts||parsed.getUTCFullYear()!==parts[0]||parsed.getUTCMonth()!==parts[1]-1||parsed.getUTCDate()!==parts[2])
   fail('cal una Data revisió vàlida (AAAA-MM-DD o DD/MM/AAAA)');
  if(/pendent|cal verificar|per confirmar|per verificar|per validar/i.test(value('Llicència / drets')))
   fail('els drets encara indiquen comprovacions pendents');
  ['URL font','URL plantilla editable','URL PDF','URL PDF secundària','URL imatge'].forEach(h=>{
   if(value(h)&&!/^https?:\/\/[^\s/?#]+(?:[/?#][^\s]*)?$/i.test(value(h)))fail(h+' ha de ser un URL http(s) vàlid');
  });
  const record={};FIELDS.forEach(field=>{const idx=headers.indexOf(field);if(idx>=0)record[field]=String(row[idx]||'').trim()});
  records.push(record);
 });
 if(errors.length)throw new Error('Publicació bloquejada. No s’ha enviat cap dada a GitHub.\n'+errors.join('\n'));
 return records;
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
